import { callSupabaseRpc, jsonResponse, requiredEnv, safeRequestId } from "../_shared/runtime.ts";
import { normalizeTravellerAckEvent, verifyTravellerAckWebhook } from "../_shared/traveller-ack-events.ts";

declare const Deno: { serve(handler: (request: Request) => Response | Promise<Response>): void };
const maximumBytes = 32 * 1024;

export async function handleTravellerAckEvent(request: Request): Promise<Response> {
  const requestId = safeRequestId();
  if (request.method !== "POST") return jsonResponse(405, { error: "method_not_allowed", requestId }, { Allow: "POST" });
  let secret: string;
  try { secret = requiredEnv("RESEND_TRAVELLER_ACK_WEBHOOK_SECRET"); }
  catch { return jsonResponse(503, { error: "webhook_not_configured", requestId }); }
  if (Number(request.headers.get("content-length") ?? "0") > maximumBytes) return jsonResponse(413, { error: "payload_too_large", requestId });
  let raw: string;
  try {
    const reader = request.body?.getReader();
    if (!reader) return jsonResponse(400, { error: "invalid_body", requestId });
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      bytes += part.value.byteLength;
      if (bytes > maximumBytes) { await reader.cancel(); return jsonResponse(413, { error: "payload_too_large", requestId }); }
      chunks.push(part.value);
    }
    const buffer = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.byteLength; }
    raw = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  } catch { return jsonResponse(400, { error: "invalid_body", requestId }); }
  if (!(await verifyTravellerAckWebhook(raw, request.headers, secret))) return jsonResponse(401, { error: "invalid_signature", requestId });
  let payload: unknown;
  try { payload = JSON.parse(raw); } catch { return jsonResponse(400, { error: "invalid_payload", requestId }); }
  const event = normalizeTravellerAckEvent(payload);
  if (!event) return jsonResponse(200, { ok: true, status: "ignored", requestId });
  try {
    const result = await callSupabaseRpc<boolean>("record_homeground_traveller_ack_event_v1", {
      p_event_id: request.headers.get("svix-id"), p_provider_message_id: event.providerId,
      p_job_id: event.jobId, p_event_type: event.type, p_reason: event.reason,
    });
    if (!result.ok) return jsonResponse(503, { error: "event_storage_unavailable", requestId });
    return jsonResponse(200, { ok: true, status: result.data ? "recorded" : "unrelated", requestId });
  } catch { return jsonResponse(503, { error: "event_storage_unavailable", requestId }); }
}
Deno.serve(handleTravellerAckEvent);
