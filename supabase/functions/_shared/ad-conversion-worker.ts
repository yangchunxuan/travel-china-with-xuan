import { booleanEnv, callSupabaseRpc, optionalEnv, requiredEnv } from "./runtime.ts";

// Google Data Manager, verified 2026-10-13:
// https://developers.google.com/data-manager/api/devguides/events/google-ads/offline/send-events
// https://developers.google.com/data-manager/api/reference/rest/v1/requestStatus/retrieve
export interface AdConversionJob {
  eventId: string; kind: "inquiry_received" | "payment_received"; occurredAt: string;
  amount: number | null; currency: string | null; leaseToken: string;
  clickIdType: "gclid" | "gbraid" | "wbraid"; clickId: string; consent: "granted";
  accountId: string; actionId: string;
}
export interface AdConversionConfiguration {
  accountId: string; loginAccountId: string; inquiryActionId: string; paymentActionId: string;
  clientId: string; clientSecret: string; refreshToken: string; validateOnly: boolean;
}
const object = (input: unknown): input is Record<string, unknown> => !!input && typeof input === "object" && !Array.isArray(input);
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/iu;
export function adConversionConfiguration(): AdConversionConfiguration {
  const accountId = requiredEnv("GOOGLE_ADS_CUSTOMER_ID"), loginAccountId = optionalEnv("GOOGLE_ADS_LOGIN_CUSTOMER_ID") || accountId;
  const inquiryActionId = requiredEnv("GOOGLE_ADS_INQUIRY_ACTION_ID"), paymentActionId = requiredEnv("GOOGLE_ADS_PAYMENT_ACTION_ID");
  if (![accountId, loginAccountId].every((id) => /^\d{10}$/u.test(id)) || ![inquiryActionId, paymentActionId].every((id) => /^\d{1,20}$/u.test(id)) || inquiryActionId === paymentActionId) throw new Error("conversion_configuration_invalid");
  return { accountId, loginAccountId, inquiryActionId, paymentActionId, clientId: requiredEnv("GOOGLE_ADS_OAUTH_CLIENT_ID"),
    clientSecret: requiredEnv("GOOGLE_ADS_OAUTH_CLIENT_SECRET"), refreshToken: requiredEnv("GOOGLE_ADS_OAUTH_REFRESH_TOKEN"),
    validateOnly: booleanEnv("GOOGLE_ADS_VALIDATE_ONLY", true) };
}
export function validAdConversionJob(job: unknown): job is AdConversionJob {
  if (!object(job) || typeof job.eventId !== "string" || !uuid.test(job.eventId) || typeof job.leaseToken !== "string" || !uuid.test(job.leaseToken) ||
    !["inquiry_received", "payment_received"].includes(String(job.kind)) || typeof job.occurredAt !== "string" || !Number.isFinite(Date.parse(job.occurredAt)) ||
    !["gclid", "gbraid", "wbraid"].includes(String(job.clickIdType)) || typeof job.clickId !== "string" || !/^[A-Za-z0-9_-]{1,512}$/u.test(job.clickId) ||
    job.consent !== "granted" || typeof job.accountId !== "string" || !/^\d{10}$/u.test(job.accountId) || typeof job.actionId !== "string" || !/^\d{1,20}$/u.test(job.actionId)) return false;
  return job.kind === "inquiry_received" ? job.amount === null && job.currency === null :
    typeof job.amount === "number" && Number.isFinite(job.amount) && job.amount > 0 && typeof job.currency === "string" && /^[A-Z]{3}$/u.test(job.currency);
}
export function dataManagerRequest(job: AdConversionJob, config: Pick<AdConversionConfiguration, "loginAccountId" | "validateOnly">) {
  if (!validAdConversionJob(job)) throw new Error("invalid_conversion_job");
  return {
    destinations: [{ operatingAccount: { accountType: "GOOGLE_ADS", accountId: job.accountId },
      loginAccount: { accountType: "GOOGLE_ADS", accountId: config.loginAccountId }, productDestinationId: job.actionId }],
    encoding: "HEX", consent: { adUserData: "CONSENT_GRANTED", adPersonalization: "CONSENT_DENIED" },
    events: [{ transactionId: job.eventId, eventTimestamp: new Date(job.occurredAt).toISOString(), eventSource: "WEB",
      adIdentifiers: { [job.clickIdType]: job.clickId },
      ...(job.kind === "payment_received" ? { conversionValue: job.amount, currency: job.currency } : {}) }],
    validateOnly: config.validateOnly,
  };
}
async function jsonFetch(url: string, init: RequestInit): Promise<{ ok: boolean; status: number; data: unknown }> {
  const response = await fetch(url, { ...init, redirect: "error", signal: AbortSignal.timeout(12_000) });
  const text = await response.text();
  if (text.length > 128_000) throw new Error("provider_response_invalid");
  let data: unknown = null; try { data = JSON.parse(text); } catch { /* No provider payload is logged or returned. */ }
  return { ok: response.ok, status: response.status, data };
}
async function accessToken(config: AdConversionConfiguration): Promise<string> {
  const result = await jsonFetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: config.clientId, client_secret: config.clientSecret, refresh_token: config.refreshToken, grant_type: "refresh_token" }).toString() });
  if (!result.ok || !object(result.data) || typeof result.data.access_token !== "string" || result.data.access_token.length < 1 || result.data.access_token.length > 4096) throw new Error("oauth_unavailable");
  return result.data.access_token;
}
async function rpc<T>(name: string, args: Record<string, unknown>): Promise<T> {
  const result = await callSupabaseRpc<T>(name, args); if (!result.ok) throw new Error("conversion_queue_unavailable"); return result.data as T;
}
export function dataManagerProcessingStatus(input: unknown, accountId: string, actionId: string): "accepted" | "failed" | "processing" {
  if (!object(input) || !Array.isArray(input.requestStatusPerDestination) || input.requestStatusPerDestination.length !== 1) return "processing";
  const status = input.requestStatusPerDestination[0];
  if (!object(status) || !object(status.destination) || !object(status.destination.operatingAccount) ||
    status.destination.operatingAccount.accountType !== "GOOGLE_ADS" || status.destination.operatingAccount.accountId !== accountId || status.destination.productDestinationId !== actionId) return "processing";
  if (status.requestStatus === "SUCCESS") return "accepted";
  return ["FAILED", "PARTIAL_SUCCESS"].includes(String(status.requestStatus)) ? "failed" : "processing";
}
export async function runAdConversionWorker(config: AdConversionConfiguration) {
  // Obtain usable authorization before leasing records; auth failures retain pending jobs.
  const token = await accessToken(config), headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  const counters = { validated: 0, submitted: 0, accepted: 0, failed: 0, pending: 0, cancelled: 0 };
  const outstanding = await rpc<unknown>("get_homeground_submitted_ad_conversions_v1", {});
  if (!Array.isArray(outstanding) || outstanding.length > 25) throw new Error("invalid_conversion_queue");
  for (const item of outstanding) {
    if (!object(item) || typeof item.eventId !== "string" || !uuid.test(item.eventId) || typeof item.requestId !== "string" || item.requestId.length > 255 ||
      typeof item.accountId !== "string" || typeof item.actionId !== "string") throw new Error("invalid_conversion_status");
    try {
      const url = new URL("https://datamanager.googleapis.com/v1/requestStatus:retrieve"); url.searchParams.set("requestId", item.requestId);
      const result = await jsonFetch(url.toString(), { method: "GET", headers });
      if (!result.ok) { counters.pending += 1; continue; }
      const status = dataManagerProcessingStatus(result.data, item.accountId, item.actionId);
      if (status === "processing") { counters.pending += 1; continue; }
      const updated = await rpc<boolean>("resolve_homeground_ad_conversion_v1", { p_event_id: item.eventId, p_request_id: item.requestId,
        p_accepted: status === "accepted", p_error_code: status === "failed" ? "google_processing_failed" : null });
      if (updated) counters[status] += 1;
    } catch { counters.pending += 1; }
  }
  const claimed = await rpc<unknown>("claim_homeground_ad_conversions_v1", { p_account_id: config.accountId,
    p_inquiry_action_id: config.inquiryActionId, p_payment_action_id: config.paymentActionId, p_limit: 10 });
  if (!Array.isArray(claimed) || claimed.length > 10 || !claimed.every(validAdConversionJob)) throw new Error("invalid_conversion_queue");
  for (const job of claimed) {
    let status = "pending", requestId: string | null = null, errorCode: string | null = "provider_request_uncertain";
    try {
      // Recheck immediately before dispatch so a withdrawn or expired lease cannot send.
      if (!await rpc<boolean>("can_send_homeground_ad_conversion_v1", { p_event_id: job.eventId, p_lease_token: job.leaseToken })) { counters.cancelled += 1; continue; }
      const result = await jsonFetch("https://datamanager.googleapis.com/v1/events:ingest", { method: "POST", headers, body: JSON.stringify(dataManagerRequest(job, config)) });
      if (!result.ok) {
        status = result.status === 429 || result.status >= 500 ? "pending" : "failed"; errorCode = `google_http_${result.status}`;
      } else if (config.validateOnly) {
        status = "pending"; errorCode = "validation_only";
      } else if (object(result.data) && typeof result.data.requestId === "string" && result.data.requestId.length > 0 && result.data.requestId.length <= 255) {
        status = "submitted"; requestId = result.data.requestId; errorCode = null;
      }
    } catch { /* A retry uses the same frozen event and transaction ID. */ }
    const updated = await rpc<boolean>("finish_homeground_ad_conversion_v1", { p_event_id: job.eventId, p_lease_token: job.leaseToken,
      p_status: status, p_request_id: requestId, p_error_code: errorCode });
    if (updated) {
      if (errorCode === "validation_only") counters.validated += 1;
      else if (status === "submitted") counters.submitted += 1;
      else if (status === "failed") counters.failed += 1;
      else counters.pending += 1;
    }
  }
  return { ...counters, validateOnly: config.validateOnly };
}
