import { booleanEnv, callSupabaseRpc, commaSeparatedEnv, hmacSha256Hex, jsonResponse, requiredEnv, safeRequestId, sha256Hex } from "../_shared/runtime.ts";

declare const Deno: { serve(handler: (request: Request) => Promise<Response>): void };
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const allowedHeaders = ["content-type", "idempotency-key", "inquiry-access-key"];
interface CorrectionResult {
  outcome: string;
  publicReference?: string;
  contactEmail?: string;
  contactRevision?: number;
  firstResponseDueAt?: string;
  ackQueued?: boolean;
  ackStatus?: string;
  duplicate?: boolean;
  changed?: boolean;
}
export function normalizeCorrectionEmail(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const email = input.normalize("NFC").trim();
  if (email.length > 254 || /[\s\u0000-\u001f\u007f-\u009f]/u.test(email)) return null;
  const at = email.lastIndexOf("@");
  if (at < 1) return null;
  const local = email.slice(0, at), domain = email.slice(at + 1).toLowerCase();
  if (local.length > 64 || !/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+$/i.test(local) || local.startsWith(".") || local.endsWith(".") || local.includes("..") || !domain.includes(".")) return null;
  if (!domain.split(".").every(label => label.length > 0 && label.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label))) return null;
  return `${local}@${domain}`;
}

export async function handleEmailCorrection(request: Request): Promise<Response> {
  const requestId = safeRequestId();
  let headers: HeadersInit = {};
  const failure = (status: number, code: string, retryable = false, persistenceState = "not_persisted") => jsonResponse(status, {
    error: { code, retryable, persistenceState, requestId, ...(code === "correction_busy" ? { retryAfter: 5 } : {}) },
  }, { ...headers, ...(code === "correction_busy" ? { "Retry-After": "5" } : {}) });
  let origins: string[];
  try {
    origins = commaSeparatedEnv("ALLOWED_ORIGINS");
    if (!origins.length || origins.some(origin => { const url = new URL(origin); return url.origin !== origin || (url.protocol !== "https:" && !(url.protocol === "http:" && url.hostname === "localhost")); })) throw new Error("invalid_origins");
  } catch { return failure(503, "service_not_configured"); }
  const origin = request.headers.get("origin") ?? "";
  if (!origins.includes(origin)) return failure(403, "origin_not_allowed");
  headers = { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Headers": allowedHeaders.join(", "), "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Max-Age": "600", Vary: "Origin" };
  if (request.method === "OPTIONS") {
    const method = request.headers.get("access-control-request-method");
    const requested = (request.headers.get("access-control-request-headers") ?? "").toLowerCase().split(",").map(value => value.trim()).filter(Boolean);
    if (method !== "POST" || requested.some(value => !allowedHeaders.includes(value))) return failure(403, "preflight_not_allowed");
    return new Response(null, { status: 204, headers });
  }
  if (request.method !== "POST") return failure(405, "method_not_allowed");
  try { if (!booleanEnv("INQUIRY_EMAIL_CORRECTION_ENABLED", false)) return failure(403, "correction_unavailable"); }
  catch { return failure(503, "service_not_configured"); }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return failure(415, "unsupported_media_type");
  const accessKey = request.headers.get("inquiry-access-key")?.trim() ?? "";
  const requestKey = request.headers.get("idempotency-key")?.trim() ?? "";
  if (!uuid.test(accessKey)) return failure(403, "correction_unavailable");
  if (!uuid.test(requestKey)) return failure(400, "invalid_idempotency_key");
  if (Number(request.headers.get("content-length")) > 2048) return failure(413, "request_too_large");
  let payload: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return failure(400, "malformed_json");
    const decoder = new TextDecoder("utf-8", { fatal: true }); let body = "", bytes = 0;
    while (true) {
      const item = await reader.read(); if (item.done) break;
      bytes += item.value.byteLength;
      if (bytes > 2048) { await reader.cancel(); return failure(413, "request_too_large"); }
      body += decoder.decode(item.value, { stream: true });
    }
    payload = JSON.parse(body + decoder.decode());
  } catch { return failure(400, "malformed_json"); }
  if (typeof payload !== "object" || payload === null || Array.isArray(payload) || Object.keys(payload).some(key => !["email", "expectedRevision"].includes(key))) return failure(422, "invalid_correction");
  const value = payload as Record<string, unknown>;
  const email = normalizeCorrectionEmail(value.email);
  if (!email) return failure(422, "invalid_email");
  if (!Number.isInteger(value.expectedRevision) || Number(value.expectedRevision) < 0 || Number(value.expectedRevision) > 3) return failure(422, "invalid_correction");
  let args: Record<string, unknown>;
  try {
    const secret = requiredEnv("IDEMPOTENCY_HASH_SECRET");
    args = {
      p_inquiry_key_hash: await hmacSha256Hex(secret, accessKey.toLowerCase()),
      p_request_key_hash: await hmacSha256Hex(secret, `email-correction:${requestKey.toLowerCase()}`),
      p_payload_hash: await sha256Hex(JSON.stringify({ email, expectedRevision: value.expectedRevision })),
      p_contact_email: email, p_expected_revision: value.expectedRevision,
      p_recipient_hash: await hmacSha256Hex(secret, `traveller-ack:${email.toLowerCase()}`),
      p_ack_enabled: booleanEnv("TRAVELLER_ACK_ENABLED", false),
    };
  } catch { return failure(503, "service_not_configured"); }
  let result;
  try { result = await callSupabaseRpc<CorrectionResult>("correct_homeground_inquiry_email_v1", args); }
  catch { return failure(503, "correction_unavailable", true, "unknown"); }
  if (!result.ok || !result.data) return failure(503, "correction_unavailable", true, "unknown");
  const data = result.data;
  if (data.outcome === "correction_unavailable") return failure(403, data.outcome);
  if (data.outcome === "correction_busy") return failure(409, data.outcome, true);
  if (["correction_conflict", "correction_limit", "idempotency_conflict"].includes(data.outcome)) return failure(409, data.outcome);
  if (data.outcome !== "corrected" || typeof data.contactEmail !== "string" || !Number.isInteger(data.contactRevision) || typeof data.publicReference !== "string" || typeof data.firstResponseDueAt !== "string" || !["queued", "suppressed", "disabled", "unavailable"].includes(data.ackStatus ?? "")) return failure(503, "correction_unavailable", true, "unknown");
  return jsonResponse(200, { state: "corrected", publicReference: data.publicReference, contactEmail: data.contactEmail, contactRevision: data.contactRevision, firstResponseDueAt: data.firstResponseDueAt, ackQueued: data.ackStatus === "queued", ackStatus: data.ackStatus, duplicate: data.duplicate === true, changed: data.changed === true, requestId }, headers);
}
Deno.serve(handleEmailCorrection);
