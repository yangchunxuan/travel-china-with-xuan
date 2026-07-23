import {
  callSupabaseRpc,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "./runtime.ts";

export type AdminAuditEndpoint = "admin-insights" | "admin-health";
export type AdminAuditResult =
  | "success"
  | "summary_unavailable"
  | "contract_rejected";

const auditTimeoutMilliseconds = 1_500;

/**
 * The database accepts only fixed enums and a UUID and supplies the timestamp
 * itself. Callers must fail closed before returning a successful Admin data
 * response when this function returns false. Error responses may remain
 * available because they disclose no aggregate data.
 */
export async function recordAdminAccess(
  adminUserId: string,
  endpoint: AdminAuditEndpoint,
  result: AdminAuditResult,
): Promise<boolean> {
  try {
    const auditResult = await callSupabaseRpc<unknown>(
      "record_homeground_admin_access",
      {
        p_admin_user_id: adminUserId,
        p_endpoint: endpoint,
        p_result: result,
      },
      auditTimeoutMilliseconds,
    );
    return auditResult.ok && auditResult.data === true;
  } catch {
    // Do not log request, response, token, user, RPC error body, or
    // customer-derived data here.
    return false;
  }
}
