import {
  adminSuccessResponse,
  adminUnavailableResponse,
  authorizeAdminRequest,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../_shared/admin-auth.ts";
import {
  buildAdminInsightsResponse,
  sanitizeAdminGuideInquiryCountsRpc,
  sanitizeAdminInsightsRpc,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../_shared/admin-contracts.ts";
import {
  recordAdminAccess,
  type AdminAuditResult,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../_shared/admin-audit.ts";
import {
  callSupabaseRpc,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../_shared/runtime.ts";

declare const Deno: {
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

async function handleRequest(request: Request): Promise<Response> {
  const authorization = await authorizeAdminRequest(request);
  if (authorization.response) return authorization.response;

  const finish = async (
    result: AdminAuditResult,
    response: Response,
  ): Promise<Response> => {
    const auditRecorded = await recordAdminAccess(
      authorization.admin.userId,
      "admin-insights",
      result,
    );
    if (result === "success" && !auditRecorded) {
      return adminUnavailableResponse(
        "admin_audit_unavailable",
        authorization.requestId,
        authorization.headers,
      );
    }
    return response;
  };

  let insightsRpcResult;
  let guideInquiriesRpcResult;
  try {
    [insightsRpcResult, guideInquiriesRpcResult] = await Promise.all([
      callSupabaseRpc<unknown>("get_homeground_admin_insights", {}),
      callSupabaseRpc<unknown>(
        "get_homeground_admin_guide_inquiry_counts",
        {},
      ),
    ]);
  } catch {
    return finish(
      "summary_unavailable",
      adminUnavailableResponse(
        "insights_unavailable",
        authorization.requestId,
        authorization.headers,
      ),
    );
  }

  if (!insightsRpcResult.ok || !guideInquiriesRpcResult.ok) {
    return finish(
      "summary_unavailable",
      adminUnavailableResponse(
        "insights_unavailable",
        authorization.requestId,
        authorization.headers,
      ),
    );
  }

  const insights = sanitizeAdminInsightsRpc(insightsRpcResult.data);
  const guideInquiries = sanitizeAdminGuideInquiryCountsRpc(
    guideInquiriesRpcResult.data,
  );
  const response =
    insights && guideInquiries
      ? buildAdminInsightsResponse(insights, guideInquiries)
      : null;
  if (!response) {
    return finish(
      "contract_rejected",
      adminUnavailableResponse(
        "invalid_insights_contract",
        authorization.requestId,
        authorization.headers,
      ),
    );
  }

  return finish(
    "success",
    adminSuccessResponse(response, authorization.headers),
  );
}

Deno.serve(handleRequest);
