import { authorizeAdminRequest, adminSuccessResponse, adminUnavailableResponse } from "../_shared/admin-auth.ts";
import { booleanEnv, callSupabaseRpc, jsonResponse } from "../_shared/runtime.ts";
import { conversionCurrencies, inquiryReferencePattern, parseAdminConversionSnapshot } from "../../../lib/adminConversions.ts";

declare const Deno: { serve(handler: (request: Request) => Promise<Response>): void };
export async function handleAdminConversions(request: Request): Promise<Response> {
  const auth = await authorizeAdminRequest(request, { allowPost: true });
  if (auth.response) return auth.response;
  const fail = (code: string, status = 400) => jsonResponse(status, { error: { code, requestId: auth.requestId } }, auth.headers);
  try {
    if (!booleanEnv("ADMIN_CONVERSIONS_ENABLED", false)) return fail("conversions_disabled", 503);
    if (request.method !== "POST") return fail("method_not_allowed", 405);
    if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return fail("invalid_request");
    const reader = request.body?.getReader(); if (!reader) return fail("invalid_request");
    const chunks: Uint8Array[] = []; let size = 0;
    for (;;) { const { value, done } = await reader.read(); if (done) break; size += value.byteLength;
      if (size > 2048) { await reader.cancel(); return fail("request_too_large", 413); } chunks.push(value); }
    const bytes = new Uint8Array(size); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    const input = JSON.parse(new TextDecoder().decode(bytes));
    if (!input || typeof input !== "object" || Array.isArray(input) || !["lookup", "record_payment"].includes(input.action) ||
      typeof input.publicReference !== "string" || !inquiryReferencePattern.test(input.publicReference)) return fail("invalid_request");
    const keys = input.action === "lookup" ? ["action", "publicReference"] : ["action", "publicReference", "amount", "currency", "occurredAt", "paymentReceivedConfirmed"];
    if (Object.keys(input).some((key) => !keys.includes(key))) return fail("invalid_request");
    if (input.action === "record_payment" && (input.paymentReceivedConfirmed !== true || typeof input.amount !== "number" ||
      !Number.isFinite(input.amount) || input.amount <= 0 || input.amount >= 1e12 || Math.abs(input.amount * 100 - Math.round(input.amount * 100)) > 0.001 ||
      !conversionCurrencies.includes(input.currency) || (input.currency === "JPY" || input.currency === "KRW") && !Number.isInteger(input.amount) ||
      typeof input.occurredAt !== "string" || !/^\d{4}-\d{2}-\d{2}T/u.test(input.occurredAt) || !Number.isFinite(Date.parse(input.occurredAt)))) return fail("invalid_payment");
    const result = await callSupabaseRpc<Record<string, unknown>>("manage_homeground_inquiry_conversion_v1", {
      p_admin_user_id: auth.admin.userId, p_action: input.action, p_public_reference: input.publicReference,
      p_amount: input.action === "record_payment" ? input.amount : null,
      p_currency: input.action === "record_payment" ? input.currency : null,
      p_occurred_at: input.action === "record_payment" ? input.occurredAt : null,
    });
    if (!result.ok) return fail("conversions_unavailable", 503);
    const code = result.data?.error;
    if (["not_found", "invalid_payment", "payment_already_recorded"].includes(String(code))) return fail(String(code), code === "not_found" ? 404 : code === "payment_already_recorded" ? 409 : 400);
    const safe = parseAdminConversionSnapshot(result.data);
    if (!safe) return fail("invalid_conversion_response", 503);
    return adminSuccessResponse({ ...safe, uploadEnabled: booleanEnv("GOOGLE_ADS_UPLOAD_ENABLED", false) }, auth.headers);
  } catch { return adminUnavailableResponse("conversions_unavailable", auth.requestId, auth.headers); }
}
Deno.serve(handleAdminConversions);
