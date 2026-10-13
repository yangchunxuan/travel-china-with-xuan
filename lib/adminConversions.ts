export const conversionCurrencies = ["USD", "AUD", "CAD", "CNY", "KRW", "JPY", "EUR", "GBP", "HKD", "SGD"] as const;
export const inquiryReferencePattern = /^HG-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{4}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{4}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{4}$/u;
export interface AdminConversionEvent {
  id: string; kind: "inquiry_received" | "payment_received"; occurredAt: string;
  amount: number | null; currency: string | null;
  status: "pending" | "processing" | "submitted" | "accepted" | "failed" | "blocked";
  errorCode: string | null; submittedAt: string | null; acceptedAt: string | null;
}
export interface AdminConversionSnapshot {
  contractVersion: "homeground-admin-conversions.v1";
  inquiry: { publicReference: string; receivedAt: string;
    attribution: { clickIdType: "gclid" | "gbraid" | "wbraid"; capturedAt: string } | null;
    events: AdminConversionEvent[] };
  uploadEnabled?: boolean;
}
const object = (input: unknown): input is Record<string, unknown> => !!input && typeof input === "object" && !Array.isArray(input);
const timestamp = (input: unknown) => typeof input === "string" && Number.isFinite(Date.parse(input));
/** Rebuild the safe response instead of forwarding any extra RPC fields. */
export function parseAdminConversionSnapshot(input: unknown): AdminConversionSnapshot | null {
  if (!object(input) || input.contractVersion !== "homeground-admin-conversions.v1" || !object(input.inquiry)) return null;
  const i = input.inquiry;
  if (typeof i.publicReference !== "string" || !inquiryReferencePattern.test(i.publicReference) || !timestamp(i.receivedAt) ||
      !Array.isArray(i.events) || i.events.length > 2) return null;
  let attribution: AdminConversionSnapshot["inquiry"]["attribution"] = null;
  if (i.attribution !== null) {
    if (!object(i.attribution) || !["gclid", "gbraid", "wbraid"].includes(String(i.attribution.clickIdType)) || !timestamp(i.attribution.capturedAt)) return null;
    attribution = { clickIdType: i.attribution.clickIdType as "gclid" | "gbraid" | "wbraid", capturedAt: i.attribution.capturedAt as string };
  }
  const events: AdminConversionEvent[] = [];
  for (const e of i.events) {
    if (!object(e) || typeof e.id !== "string" || !/^[a-f0-9-]{36}$/iu.test(e.id) ||
        !["inquiry_received", "payment_received"].includes(String(e.kind)) || !timestamp(e.occurredAt) ||
        !["pending", "processing", "submitted", "accepted", "failed", "blocked"].includes(String(e.status)) ||
        (e.errorCode !== null && (typeof e.errorCode !== "string" || !/^[a-z0-9_]{1,80}$/u.test(e.errorCode))) ||
        [e.submittedAt, e.acceptedAt].some((date) => date !== null && !timestamp(date)) ||
        (e.kind === "inquiry_received" ? e.amount !== null || e.currency !== null :
          typeof e.amount !== "number" || !Number.isFinite(e.amount) || e.amount <= 0 || !conversionCurrencies.includes(e.currency as typeof conversionCurrencies[number])) ||
        events.some((previous) => previous.kind === e.kind)) return null;
    events.push({ id: e.id, kind: e.kind as AdminConversionEvent["kind"], occurredAt: e.occurredAt as string,
      amount: e.amount as number | null, currency: e.currency as string | null, status: e.status as AdminConversionEvent["status"],
      errorCode: e.errorCode as string | null, submittedAt: e.submittedAt as string | null, acceptedAt: e.acceptedAt as string | null });
  }
  return { contractVersion: "homeground-admin-conversions.v1", inquiry: { publicReference: i.publicReference,
    receivedAt: i.receivedAt as string, attribution, events }, ...(typeof input.uploadEnabled === "boolean" ? { uploadEnabled: input.uploadEnabled } : {}) };
}
