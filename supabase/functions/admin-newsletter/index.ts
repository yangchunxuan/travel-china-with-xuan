import {
  authorizeAdminRequest, adminSuccessResponse, adminUnavailableResponse,
  // @ts-ignore Deno resolves explicit TypeScript extensions.
} from "../_shared/admin-auth.ts";
import {
  booleanEnv, callSupabaseRpc,
  // @ts-ignore Deno resolves explicit TypeScript extensions.
} from "../_shared/runtime.ts";

declare const Deno: { serve(handler: (request: Request) => Promise<Response>): void };
const states = ["pending", "active", "unsubscribed", "suppressed"];
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function validResponse(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const result = value as Record<string, unknown>;
  if (Object.keys(result).some((key) => !["contractVersion", "counts", "subscribers", "nextCursor"].includes(key))) return false;
  if (result.contractVersion !== "homeground-newsletter-admin.v1" ||
      !result.counts || typeof result.counts !== "object" || !Array.isArray(result.subscribers) || result.subscribers.length > 25 ||
      (result.nextCursor !== null && (typeof result.nextCursor !== "string" || !uuid.test(result.nextCursor)))) return false;
  const counts = result.counts as Record<string, unknown>;
  if (Object.keys(counts).length !== 4 || states.some((key) => !Number.isSafeInteger(counts[key]) || Number(counts[key]) < 0)) return false;
  return result.subscribers.every((item: Record<string, unknown>) => item && typeof item === "object" &&
    typeof item.id === "string" && uuid.test(item.id) && states.includes(String(item.status)) &&
    (item.email === null || (typeof item.email === "string" && item.email.length <= 254)) &&
    typeof item.firstName === "string" && item.firstName.length <= 80 && ["en", "zh", "ko"].includes(String(item.locale)) &&
    typeof item.sourcePath === "string" && /^\/[a-z0-9/_-]*$/i.test(item.sourcePath) && item.consentVersion === "2026-09-06.1" &&
    typeof item.requestedAt === "string" && Number.isFinite(Date.parse(item.requestedAt)) &&
    [item.confirmedAt, item.unsubscribedAt].every((date) => date === null || (typeof date === "string" && Number.isFinite(Date.parse(date)))) &&
    Object.keys(item).every((key) => ["id", "email", "firstName", "locale", "sourcePath", "status", "consentVersion", "requestedAt", "confirmedAt", "unsubscribedAt"].includes(key)));
}

export async function handleAdminNewsletter(request: Request): Promise<Response> {
  // Shared dashboard authentication disallows all query strings. This endpoint
  // owns a narrow pagination/filter contract after that same authentication.
  const authorizationUrl = new URL(request.url);
  authorizationUrl.search = "";
  const authorization = await authorizeAdminRequest(new Request(authorizationUrl, request));
  if (authorization.response) return authorization.response;
  const fail = () => adminUnavailableResponse("newsletter_unavailable", authorization.requestId, authorization.headers);
  try {
    if (!booleanEnv("NEWSLETTER_ADMIN_ENABLED", false)) return fail();
    const params = new URL(request.url).searchParams;
    if ([...params.keys()].some((key) => !["status", "cursor"].includes(key)) || params.getAll("status").length > 1 || params.getAll("cursor").length > 1) return fail();
    const status = params.get("status");
    const cursor = params.get("cursor");
    if ((status !== null && !states.includes(status)) || (cursor !== null && !uuid.test(cursor))) return fail();
    const result = await callSupabaseRpc<unknown>("get_homeground_newsletter_admin_v1", {
      p_admin_user_id: authorization.admin.userId, p_status: status, p_cursor: cursor,
    });
    if (!result.ok || !validResponse(result.data)) return fail();
    return adminSuccessResponse(result.data, authorization.headers);
  } catch { return fail(); }
}

Deno.serve(handleAdminNewsletter);
