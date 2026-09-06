import {
  booleanEnv, callSupabaseRpc, commaSeparatedEnv, constantTimeEqual, hmacSha256Hex,
  jsonResponse, requestIp, requiredEnv, sha256Hex,
  // @ts-ignore Deno resolves explicit TypeScript extensions.
} from "../_shared/runtime.ts";
import {
  newsletterConfirmationMessage, newsletterPageUrl, validateNewsletterRequest,
  type NewsletterLocale,
  // @ts-ignore Deno resolves explicit TypeScript extensions.
} from "../_shared/newsletter-contract.ts";

declare const Deno: { serve(handler: (request: Request) => Promise<Response>): void };
declare const EdgeRuntime: { waitUntil(promise: Promise<unknown>): void } | undefined;
const maximumBytes = 4096;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const hash = /^[0-9a-f]{64}$/;
const securityHeaders = {
  "Cache-Control": "no-store", "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff", "X-Frame-Options": "DENY",
};

function failure(status: number, headers: HeadersInit = {}) {
  return jsonResponse(status, { error: { code: "request_failed" } }, { ...securityHeaders, ...headers });
}

function secret(name: string): string {
  const value = requiredEnv(name);
  if (value.length < 32 || value.length > 512 || /[\r\n]/.test(value)) throw new Error("invalid_configuration");
  return value;
}

function originValue(value: string): string {
  const parsed = new URL(value);
  if (parsed.origin !== value || (parsed.protocol !== "https:" &&
      !(parsed.protocol === "http:" && parsed.hostname === "localhost"))) throw new Error("invalid_configuration");
  return value;
}

function allowedOrigins(): Set<string> {
  const values = commaSeparatedEnv("ALLOWED_ORIGINS");
  if (!values.length) throw new Error("invalid_configuration");
  return new Set(values.map(originValue));
}

function senderConfiguration() {
  const from = requiredEnv("RESEND_FROM_EMAIL");
  const address = from.match(/<([^<>]+)>$/u)?.[1] ?? from;
  if (/[\r\n]/.test(from) || from.length > 320 || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(address)) throw new Error("invalid_configuration");
  const tokenSecret = secret("NEWSLETTER_TOKEN_SECRET");
  const rateSecret = secret("RATE_LIMIT_HASH_SECRET");
  const workerSecret = secret("NEWSLETTER_WORKER_SECRET");
  if (new Set([tokenSecret, rateSecret, workerSecret]).size !== 3) throw new Error("invalid_configuration");
  const siteOrigin = originValue(requiredEnv("NEWSLETTER_SITE_ORIGIN"));
  if (!allowedOrigins().has(siteOrigin)) throw new Error("invalid_configuration");
  return { from, apiKey: requiredEnv("RESEND_API_KEY"), tokenSecret, rateSecret, siteOrigin };
}

async function limitedJson(request: Request): Promise<unknown> {
  if (!/^application\/json(?:\s*;\s*charset=utf-8)?$/i.test(request.headers.get("content-type") ?? "")) throw new Error("invalid_request");
  const declaredLength = request.headers.get("content-length");
  if (declaredLength && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > maximumBytes)) throw new Error("invalid_request");
  if (!request.body) throw new Error("invalid_request");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const result = await reader.read();
      if (result.done) break;
      total += result.value.length;
      if (total > maximumBytes) { await reader.cancel(); throw new Error("invalid_request"); }
      chunks.push(result.value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

interface NewsletterResult { status?: string; error?: string; jobId?: string }
interface EmailJob {
  jobId: string; leaseToken: string; email: string; locale: NewsletterLocale;
  confirmationHash: string; unsubscribeHash: string;
}

function isEmailJob(value: unknown): value is EmailJob {
  if (!value || typeof value !== "object") return false;
  const job = value as EmailJob;
  return typeof job.jobId === "string" && uuid.test(job.jobId) && typeof job.leaseToken === "string" && uuid.test(job.leaseToken) &&
    typeof job.email === "string" && job.email.length <= 254 && !/[\r\n]/.test(job.email) &&
    ["en", "zh", "ko"].includes(job.locale) && hash.test(job.confirmationHash) && hash.test(job.unsubscribeHash);
}

async function sendOne(config: ReturnType<typeof senderConfiguration>, jobId: string | null): Promise<boolean> {
  const claimed = await callSupabaseRpc<unknown>("claim_homeground_newsletter_email_v1", { p_job_id: jobId });
  if (!claimed.ok) throw new Error("queue_unavailable");
  if (claimed.data === null) return false;
  if (!isEmailJob(claimed.data)) throw new Error("queue_unavailable");
  const job = claimed.data;
  const confirmToken = await hmacSha256Hex(config.tokenSecret, `newsletter-confirm:${job.jobId}`);
  const unsubscribeToken = await hmacSha256Hex(config.tokenSecret, `newsletter-unsubscribe:${job.jobId}`);
  let accepted = false;
  let retryable = false;
  let providerId: string | null = null;
  let errorCode: string | null = "token_configuration";
  if (constantTimeEqual(await sha256Hex(confirmToken), job.confirmationHash) &&
      constantTimeEqual(await sha256Hex(unsubscribeToken), job.unsubscribeHash)) {
    const message = newsletterConfirmationMessage(job.locale,
      newsletterPageUrl(config.siteOrigin, job.locale, "confirm", confirmToken),
      newsletterPageUrl(config.siteOrigin, job.locale, "unsubscribe", unsubscribeToken));
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST", signal: controller.signal,
        headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `newsletter-${job.jobId}` },
        body: JSON.stringify({ from: config.from, to: [job.email], ...message }),
      });
      if (response.ok) {
        const body: unknown = await response.json();
        const candidate = body && typeof body === "object" ? (body as { id?: unknown }).id : null;
        if (typeof candidate === "string" && /^[a-z0-9-]{1,200}$/i.test(candidate)) { accepted = true; providerId = candidate; errorCode = null; }
        else { retryable = true; errorCode = "provider_retry"; }
      } else {
        await response.body?.cancel();
        retryable = [408, 409, 425, 429].includes(response.status) || response.status >= 500;
        errorCode = retryable ? "provider_retry" : "provider_rejected";
      }
    } catch { retryable = true; errorCode = "provider_retry"; }
    finally { clearTimeout(timer); }
  }
  const finished = await callSupabaseRpc<boolean>("finish_homeground_newsletter_email_v1", {
    p_job_id: job.jobId, p_lease_token: job.leaseToken, p_accepted: accepted, p_retryable: retryable,
    p_provider_message_id: providerId, p_error_code: errorCode,
  });
  if (!finished.ok || finished.data !== true) throw new Error("queue_unavailable");
  return true;
}

export async function handleNewsletterRequest(request: Request): Promise<Response> {
  const workerHeader = request.headers.get("x-newsletter-worker-secret");
  if (workerHeader !== null) {
    // The retry branch is server-only and accepts no browser Origin or user data.
    if (request.method !== "POST" || request.headers.has("origin")) return failure(403);
    try {
      if (!constantTimeEqual(workerHeader, secret("NEWSLETTER_WORKER_SECRET"))) return failure(403);
      const body = await limitedJson(request);
      if (!body || typeof body !== "object" || Object.keys(body).length !== 1 || (body as { action?: unknown }).action !== "retry") return failure(422);
      const maintained = await callSupabaseRpc<unknown>("maintain_homeground_newsletter_v1", {});
      if (!maintained.ok) return failure(503);
      const processed = booleanEnv("NEWSLETTER_ENABLED", false) ? await sendOne(senderConfiguration(), null) : false;
      return jsonResponse(200, { processed, outbox: maintained.data }, securityHeaders);
    } catch { return failure(503); }
  }

  let origins: Set<string>;
  try { origins = allowedOrigins(); } catch { return failure(503); }
  const origin = request.headers.get("origin") ?? "";
  if (!origins.has(origin)) return failure(403);
  const headers = { ...securityHeaders, "Access-Control-Allow-Origin": origin, "Vary": "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "content-type", "Access-Control-Max-Age": "600" };
  if (request.method === "OPTIONS") {
    const requestedHeaders = (request.headers.get("access-control-request-headers") ?? "").toLowerCase().split(",").map((x) => x.trim()).filter(Boolean);
    if (request.headers.get("access-control-request-method") !== "POST" || requestedHeaders.some((name) => name !== "content-type")) return failure(403, headers);
    return new Response(null, { status: 204, headers });
  }
  if (request.method !== "POST" || new URL(request.url).search) return failure(405, headers);
  let payload;
  try { payload = validateNewsletterRequest(await limitedJson(request)); } catch { return failure(422, headers); }
  if (!payload) return failure(422, headers);
  try {
    const rateSecret = secret("RATE_LIMIT_HASH_SECRET");
    const requestHash = await hmacSha256Hex(rateSecret, `newsletter-request:${payload.requestId}`);
    const fingerprint = await hmacSha256Hex(rateSecret, `newsletter-payload:${JSON.stringify(payload)}`);
    const ipHash = await hmacSha256Hex(rateSecret, `newsletter-ip:${requestIp(request)}`);
    let result: Awaited<ReturnType<typeof callSupabaseRpc<NewsletterResult>>>;
    if (payload.action === "subscribe") {
      if (!booleanEnv("NEWSLETTER_ENABLED", false)) return failure(503, headers);
      // Validate every sending secret before creating a pending record.
      const config = senderConfiguration();
      const jobId = crypto.randomUUID();
      const confirmToken = await hmacSha256Hex(config.tokenSecret, `newsletter-confirm:${jobId}`);
      const unsubscribeToken = await hmacSha256Hex(config.tokenSecret, `newsletter-unsubscribe:${jobId}`);
      result = await callSupabaseRpc<NewsletterResult>("subscribe_homeground_newsletter_v1", {
        p_request_hash: requestHash, p_fingerprint: fingerprint, p_email: payload.email,
        p_email_hash: await hmacSha256Hex(rateSecret, `newsletter-email:${payload.email}`), p_ip_hash: ipHash,
        p_first_name: payload.firstName, p_locale: payload.locale, p_source_path: payload.sourcePath,
        p_consent: payload.consent, p_consent_version: payload.consentVersion, p_job_id: jobId,
        p_confirmation_hash: await sha256Hex(confirmToken), p_unsubscribe_hash: await sha256Hex(unsubscribeToken),
      });
      if (result.ok && result.data?.status === "pending") {
        // Persistence is authoritative. A failed/ambiguous provider call remains
        // leased or pending and the authenticated retry worker recovers it.
        if (typeof result.data.jobId === "string" && uuid.test(result.data.jobId)) {
          if (typeof EdgeRuntime !== "undefined") {
            EdgeRuntime.waitUntil(sendOne(config, result.data.jobId).catch(() => undefined));
          }
        }
        return jsonResponse(202, { status: "pending" }, headers);
      }
    } else {
      // Confirmation and withdrawal remain available if intake/sending is off,
      // or Resend/token-generation secrets are unavailable.
      result = await callSupabaseRpc<NewsletterResult>("change_homeground_newsletter_v1", {
        p_action: payload.action, p_request_hash: requestHash, p_fingerprint: fingerprint,
        p_token_hash: await sha256Hex(payload.token), p_ip_hash: ipHash,
      });
      const expected = payload.action === "confirm" ? "active" : "unsubscribed";
      if (result.ok && result.data?.status === expected) return jsonResponse(200, { status: expected }, headers);
    }
    return failure(!result.ok ? 503 : result.data?.error === "rate_limited" ? 429 : 422, headers);
  } catch { return failure(503, headers); }
}

Deno.serve(handleNewsletterRequest);
