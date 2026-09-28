import { constantTimeEqual } from "./runtime.ts";

/** Svix manual protocol, including the official published test vector.
 * https://docs.svix.com/receiving/verifying-payloads/how-manual
 * The raw body is authenticated before JSON parsing. */
export async function verifyTravellerAckWebhook(raw: string, headers: Headers, secret: string, nowSeconds = Math.floor(Date.now() / 1_000)): Promise<boolean> {
  const id = headers.get("svix-id") ?? "";
  const timestamp = headers.get("svix-timestamp") ?? "";
  const signatures = headers.get("svix-signature") ?? "";
  if (!/^[\w-]{1,200}$/.test(id) || !/^\d{10}$/.test(timestamp) || Math.abs(nowSeconds - Number(timestamp)) > 300
    || signatures.length > 2048 || !/^whsec_[A-Za-z0-9+/=]{16,}$/.test(secret)) return false;
  let secretBytes: Uint8Array;
  try { secretBytes = Uint8Array.from(atob(secret.slice(6)), (character) => character.charCodeAt(0)); }
  catch { return false; }
  const key = await crypto.subtle.importKey("raw", secretBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${id}.${timestamp}.${raw}`)));
  const expected = btoa(String.fromCharCode(...signature));
  return signatures.split(/\s+/).some((candidate) => candidate.startsWith("v1,") && constantTimeEqual(candidate.slice(3), expected));
}

export interface TravellerAckEvent {
  providerId: string;
  jobId: string | null;
  type: "sent" | "delivered" | "delayed" | "bounced" | "complained" | "failed" | "suppressed";
  reason: string | null;
}
function record(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
function reasonCode(value: unknown): string | null {
  return typeof value === "string" && /^[a-z0-9_]{1,80}$/i.test(value) ? value.toLowerCase() : null;
}
export function normalizeTravellerAckEvent(payload: unknown): TravellerAckEvent | null {
  if (!record(payload) || !record(payload.data)) return null;
  const mapping = { "email.sent": "sent", "email.delivered": "delivered", "email.delivery_delayed": "delayed", "email.bounced": "bounced", "email.complained": "complained", "email.failed": "failed", "email.suppressed": "suppressed" } as const;
  if (typeof payload.type !== "string" || !Object.hasOwn(mapping, payload.type)) return null;
  const type = mapping[payload.type as keyof typeof mapping];
  const data = payload.data;
  if (typeof data.email_id !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(data.email_id)) return null;
  const tag = record(data.tags) ? data.tags.homeground_ack_id
    : Array.isArray(data.tags) ? data.tags.find((value) => record(value) && value.name === "homeground_ack_id")?.value : null;
  const jobId = typeof tag === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(tag) ? tag : null;
  let reason: string | null = null;
  if (type === "bounced") {
    // Never persist provider bounce messages: they can contain recipient PII.
    const subtype = record(data.bounce) ? reasonCode(data.bounce.subType) : null;
    reason = subtype ? `bounce_${subtype}` : "hard_bounce";
  } else if (type === "failed") {
    reason = (record(data.failed) ? reasonCode(data.failed.reason) : null) ?? "provider_send_failed";
  } else if (type === "complained" || type === "suppressed") reason = type;
  return { providerId: data.email_id, jobId, type, reason };
}
