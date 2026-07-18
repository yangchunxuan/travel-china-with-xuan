import {
  callSupabaseRpc,
  constantTimeEqual,
  jsonResponse,
  optionalEnv,
  safeRequestId,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../_shared/runtime.ts";

declare const Deno: {
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

interface OutboxHealthCounts {
  pending: number;
  processing: number;
  failed: number;
  overduePending: number;
  expiredProcessing: number;
}

interface OutboxHealthRpcRow {
  pending_count: unknown;
  processing_count: unknown;
  failed_count: unknown;
  overdue_pending_count: unknown;
  expired_processing_count: unknown;
}

function monitorSecret(): string {
  const secret = optionalEnv("OUTBOX_MONITOR_SECRET");
  if (
    !secret ||
    secret.length < 32 ||
    secret.length > 512 ||
    /[\r\n]/u.test(secret)
  ) {
    throw new Error("invalid_env:OUTBOX_MONITOR_SECRET");
  }
  return secret;
}

function nonNegativeSafeInteger(value: unknown): number | null {
  if (
    typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value >= 0
  ) {
    return value;
  }
  if (typeof value === "string" && /^(?:0|[1-9][0-9]*)$/u.test(value)) {
    const parsed = Number(value);
    if (Number.isSafeInteger(parsed)) return parsed;
  }
  return null;
}

function parseCounts(data: unknown): OutboxHealthCounts | null {
  if (!Array.isArray(data) || data.length !== 1) return null;
  const row = data[0] as OutboxHealthRpcRow | null;
  if (!row || typeof row !== "object") return null;

  const pending = nonNegativeSafeInteger(row.pending_count);
  const processing = nonNegativeSafeInteger(row.processing_count);
  const failed = nonNegativeSafeInteger(row.failed_count);
  const overduePending = nonNegativeSafeInteger(row.overdue_pending_count);
  const expiredProcessing = nonNegativeSafeInteger(
    row.expired_processing_count,
  );
  if (
    pending === null ||
    processing === null ||
    failed === null ||
    overduePending === null ||
    expiredProcessing === null
  ) {
    return null;
  }

  return {
    pending,
    processing,
    failed,
    overduePending,
    expiredProcessing,
  };
}

async function handleRequest(request: Request): Promise<Response> {
  const requestId = safeRequestId();
  if (request.method !== "GET") {
    return jsonResponse(
      405,
      { error: { code: "method_not_allowed", requestId } },
      { Allow: "GET" },
    );
  }

  let expectedSecret: string;
  try {
    expectedSecret = monitorSecret();
  } catch {
    return jsonResponse(503, {
      error: { code: "monitor_not_configured", requestId },
    });
  }

  const suppliedSecret = request.headers.get("x-monitor-secret") ?? "";
  if (!constantTimeEqual(suppliedSecret, expectedSecret)) {
    return jsonResponse(401, {
      error: { code: "unauthorized", requestId },
    });
  }

  let rpcResult;
  try {
    rpcResult = await callSupabaseRpc<unknown>(
      "get_homeground_outbox_health",
      {},
    );
  } catch {
    return jsonResponse(503, {
      error: { code: "health_unavailable", requestId },
    });
  }

  if (!rpcResult.ok) {
    return jsonResponse(503, {
      error: { code: "health_unavailable", requestId },
    });
  }

  const counts = parseCounts(rpcResult.data);
  if (!counts) {
    return jsonResponse(503, {
      error: { code: "invalid_health_response", requestId },
    });
  }

  const healthy =
    counts.failed === 0 &&
    counts.overduePending === 0 &&
    counts.expiredProcessing === 0;
  return jsonResponse(healthy ? 200 : 503, {
    ok: healthy,
    status: healthy ? "healthy" : "unhealthy",
    checkedAt: new Date().toISOString(),
    counts,
    requestId,
  });
}

Deno.serve(handleRequest);
