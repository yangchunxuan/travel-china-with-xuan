import { booleanEnv, callSupabaseRpc, optionalEnv, requiredEnv } from "./runtime.ts";
import { renderTravellerAcknowledgement, travellerAckReplyTo, type TravellerAckContext } from "./traveller-ack.ts";

export interface TravellerAckJob extends TravellerAckContext {
  job_id: string;
  inquiry_id: string;
  contact_email: string;
  lease_token: string;
  row_version: number;
  attempt_count: number;
  first_attempt_at: string;
}
interface AckResult { accepted: boolean; retryable: boolean; providerId: string | null; errorCode: string | null }
interface AckConfig { apiKey: string; from: string }
export interface TravellerAckSummary {
  status: "disabled" | "processed" | "unavailable";
  claimed: number;
  accepted: number;
  retryScheduled: number;
  failed: number;
  staleLease: number;
}
const delays = [1, 5, 30, 120] as const;
function config(): AckConfig {
  // Sending cannot be enabled without the independently signed failure receiver.
  const webhookSecret = requiredEnv("RESEND_TRAVELLER_ACK_WEBHOOK_SECRET");
  if (!/^whsec_[A-Za-z0-9+/=]{16,}$/.test(webhookSecret)) throw new Error("invalid_ack_webhook_secret");
  const from = optionalEnv("TRAVELLER_ACK_FROM_EMAIL") ?? "Homeground China <hello@homegroundchina.com>";
  if (/[\r\n]/.test(from)) throw new Error("invalid_ack_from");
  const address = from.match(/<([^<>]+)>$/)?.[1] ?? from;
  if (!/^[^\s@,<>]+@(?:send\.)?homegroundchina\.com$/.test(address)) throw new Error("invalid_ack_from");
  return { apiKey: requiredEnv("RESEND_API_KEY"), from };
}

export async function sendTravellerAcknowledgement(job: TravellerAckJob, sending: AckConfig): Promise<AckResult> {
  if (!/^[^\s@,<>]+@[^\s@,<>]+\.[^\s@,<>]+$/.test(job.contact_email)) {
    return { accepted: false, retryable: false, providerId: null, errorCode: "invalid_ack_recipient" };
  }
  const content = renderTravellerAcknowledgement(job);
  const message = {
    from: sending.from, to: [job.contact_email], reply_to: travellerAckReplyTo,
    ...content, tags: [{ name: "homeground_ack_id", value: job.job_id }],
  };
  // Freeze the exact provider payload, including From and template, before the
  // first network send. A deploy during retries cannot change the idempotent body.
  let frozen;
  try {
    frozen = await callSupabaseRpc<Record<string, unknown>>("freeze_homeground_traveller_ack_message_v1", {
      p_job_id: job.job_id, p_lease_token: job.lease_token, p_row_version: job.row_version, p_message: message,
    });
  } catch { return { accepted: false, retryable: true, providerId: null, errorCode: "message_freeze_unavailable" }; }
  if (!frozen.ok || !frozen.data) return { accepted: false, retryable: true, providerId: null, errorCode: "message_freeze_unavailable" };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${sending.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `homeground-traveller-ack/v1/${job.job_id}` },
      body: JSON.stringify(frozen.data), signal: controller.signal,
    });
  } catch {
    return { accepted: false, retryable: true, providerId: null, errorCode: controller.signal.aborted ? "provider_timeout" : "provider_network_error" };
  } finally { clearTimeout(timeout); }
  if (!response.ok) {
    await response.body?.cancel();
    return { accepted: false, retryable: [408, 409, 429].includes(response.status) || response.status >= 500, providerId: null, errorCode: `provider_http_${response.status}` };
  }
  let providerId: string | null = null;
  try {
    const body = await response.json();
    if (typeof body?.id === "string" && body.id.length <= 100) providerId = body.id;
  } catch { /* Acceptance still stands; signed event tags correlate the job. */ }
  return { accepted: true, retryable: false, providerId, errorCode: null };
}

/** Called by the authenticated existing one-minute notification worker. */
export async function processTravellerAcknowledgements(requestId: string): Promise<TravellerAckSummary> {
  const summary: TravellerAckSummary = { status: "disabled", claimed: 0, accepted: 0, retryScheduled: 0, failed: 0, staleLease: 0 };
  let sending: AckConfig;
  try {
    if (!booleanEnv("TRAVELLER_ACK_ENABLED", false)) return summary;
    sending = config();
  } catch { return { ...summary, status: "unavailable" }; }
  let claim;
  try {
    claim = await callSupabaseRpc<TravellerAckJob[]>("claim_homeground_traveller_ack_v1", {
      p_worker_id: `edge:${requestId}`, p_job_limit: 1, p_lease_seconds: 90,
    });
  } catch { return { ...summary, status: "unavailable" }; }
  if (!claim.ok || !Array.isArray(claim.data)) return { ...summary, status: "unavailable" };
  summary.status = "processed";
  summary.claimed = claim.data.length;
  for (const job of claim.data) {
    let result: AckResult;
    try { result = await sendTravellerAcknowledgement(job, sending); }
    catch { result = { accepted: false, retryable: false, providerId: null, errorCode: "receipt_context_or_config_invalid" }; }
    const index = Math.max(0, job.attempt_count - 1);
    const terminal = !result.accepted && (!result.retryable || index >= delays.length);
    const next = result.accepted || terminal ? null : new Date(Date.now() + delays[index] * 60_000).toISOString();
    try {
      const finish = await callSupabaseRpc<boolean>("finish_homeground_traveller_ack_v1", {
        p_job_id: job.job_id, p_lease_token: job.lease_token, p_row_version: job.row_version,
        p_accepted: result.accepted, p_terminal: terminal, p_provider_message_id: result.providerId,
        p_error_code: result.errorCode, p_next_attempt_at: next,
      });
      if (!finish.ok || finish.data !== true) summary.staleLease++;
      else if (result.accepted) summary.accepted++;
      else if (terminal) summary.failed++;
      else summary.retryScheduled++;
    } catch { summary.staleLease++; }
  }
  return summary;
}
