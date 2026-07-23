import {
  adminSuccessResponse,
  adminUnavailableResponse,
  authorizeAdminRequest,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../_shared/admin-auth.ts";
import {
  healthContractVersionValue,
  parseAdminHealthRpc,
  type AdminCheckStatus,
  type ParsedAdminHealth,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../_shared/admin-contracts.ts";
import {
  recordAdminAccess,
  type AdminAuditResult,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../_shared/admin-audit.ts";
import {
  callSupabaseRpc,
  commaSeparatedEnv,
  optionalEnv,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../_shared/runtime.ts";

declare const Deno: {
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

interface HealthCheck {
  id: string;
  label: string;
  status: AdminCheckStatus;
  authority: string;
  checkedAt: string;
  summary: string;
}

function configuredEnvironment(): string {
  const value = optionalEnv("ADMIN_ENVIRONMENT");
  return value === "production" ||
      value === "staging" ||
      value === "development"
    ? value
    : "unconfigured";
}

function ageInHours(timestamp: string | null, now: string): number | null {
  if (!timestamp) return null;
  return Math.max(
    0,
    (Date.parse(now) - Date.parse(timestamp)) / 3_600_000,
  );
}

function productionConfigurationCheck(checkedAt: string): HealthCheck {
  const accepting = optionalEnv("INQUIRY_ACCEPTING_SUBMISSIONS");
  const forms = commaSeparatedEnv("ALLOWED_FORM_VERSIONS");
  const privacyVersions = commaSeparatedEnv(
    "ALLOWED_PRIVACY_NOTICE_VERSIONS",
  );
  const currentVersionsPresent =
    forms.includes("2026-07-21.1") &&
    privacyVersions.includes("2026-07-21.1");
  const transitionalVersionsEnabled =
    forms.some((version) => version !== "2026-07-21.1") ||
    privacyVersions.some((version) => version !== "2026-07-21.1");

  if (
    (accepting !== "true" && accepting !== "false") ||
    forms.length === 0 ||
    privacyVersions.length === 0
  ) {
    return {
      id: "production_intake_configuration",
      label: "Production intake configuration",
      status: "unknown",
      authority: "Server-side Edge Function configuration snapshot",
      checkedAt,
      summary: "The intake configuration snapshot is incomplete.",
    };
  }
  if (!currentVersionsPresent) {
    return {
      id: "production_intake_configuration",
      label: "Production intake configuration",
      status: "action_required",
      authority: "Server-side Edge Function configuration snapshot",
      checkedAt,
      summary: "The current form or privacy version is not allowed.",
    };
  }
  if (transitionalVersionsEnabled) {
    return {
      id: "production_intake_configuration",
      label: "Production intake configuration",
      status: "attention",
      authority: "Server-side Edge Function configuration snapshot",
      checkedAt,
      summary:
        "A legacy form or privacy version remains enabled for a short " +
        "cutover overlap. Remove it from the allowlist after the overlap.",
    };
  }
  return {
    id: "production_intake_configuration",
    label: "Production intake configuration",
    status: accepting === "true" ? "ok" : "attention",
    authority: "Server-side Edge Function configuration snapshot",
    checkedAt,
    summary: accepting === "true"
      ? "Configured to accept the current supported form version."
      : "Intake is deliberately paused by the server-side kill switch.",
  };
}

function outboxCheck(health: ParsedAdminHealth): HealthCheck {
  let status: AdminCheckStatus = "ok";
  if (health.outbox.failed > 0 || health.outbox.expired > 0) {
    status = "action_required";
  } else if (health.outbox.overdue > 0) {
    status = "attention";
  }
  return {
    id: "notification_outbox",
    label: "Internal notification outbox",
    status,
    authority: "homeground_private.notification_outbox aggregate RPC",
    checkedAt: health.checkedAt,
    summary:
      `${health.outbox.queued} queued, ` +
      `${health.outbox.processing} processing, ` +
      `${health.outbox.providerAccepted} provider accepted, ` +
      `${health.outbox.failed} failed, ` +
      `${health.outbox.overdue} overdue, ` +
      `${health.outbox.expired} beyond retry deadline. ` +
      "Provider accepted does not prove delivery, reading, or reply.",
  };
}

function cleanupCheck(health: ParsedAdminHealth): HealthCheck {
  const cleanup = health.cleanup;
  const age = ageInHours(cleanup.finishedAt, health.checkedAt);
  let status: AdminCheckStatus;
  let summary: string;

  if (cleanup.expiredAdminAccessLogCount > 0) {
    status = "action_required";
    summary =
      `${cleanup.expiredAdminAccessLogCount} administrator access-log ` +
      "rows are older than the fixed 30-day retention period.";
  } else if (cleanup.status === "failed") {
    status = "action_required";
    summary = `The latest cleanup failed with controlled code ${
      cleanup.errorCode ?? "cleanup_failed"
    }.`;
  } else if (cleanup.status === "running") {
    status = "attention";
    summary = "Retention cleanup is currently running.";
  } else if (cleanup.status === "never_run") {
    status = "not_verified";
    summary = "No retention cleanup run has been recorded.";
  } else if (age === null || age > 26) {
    status = "action_required";
    summary = "The latest successful cleanup is more than 26 hours old.";
  } else if (cleanup.pendingTombstoneReplication > 0) {
    status = "action_required";
    summary =
      `${cleanup.pendingTombstoneReplication} deletion tombstone records ` +
      "still require independent replication.";
  } else {
    status = "ok";
    summary =
      `Latest cleanup deleted ${cleanup.inquiriesDeleted} expired ` +
      `inquiries and ${cleanup.outboxDeleted} expired outbox rows; ` +
      `${cleanup.retriesExpired} retries crossed the absolute deadline; ` +
      "no administrator access-log row is beyond its 30-day TTL.";
  }

  return {
    id: "retention_cleanup",
    label: "Retention cleanup",
    status,
    authority:
      "retention_cleanup_runs + admin_access_log TTL query + " +
      "deletion_tombstones replication count",
    checkedAt: health.checkedAt,
    summary,
  };
}

function operationalCheck(
  id: "backup_restore" | "isolated_e2e_canary",
  health: ParsedAdminHealth,
): HealthCheck {
  const record = id === "backup_restore"
    ? health.backupRestore
    : health.isolatedCanary;
  const label = id === "backup_restore"
    ? "Backup restore exercise"
    : "Latest isolated E2E canary";
  const authority = "homeground_private.operational_check_runs";
  if (record.status === "never_run") {
    return {
      id,
      label,
      status: "not_verified",
      authority,
      checkedAt: health.checkedAt,
      summary: id === "backup_restore"
        ? "No isolated backup restore exercise has been recorded."
        : "No isolated end-to-end canary has been recorded.",
    };
  }
  if (record.status === "failed") {
    return {
      id,
      label,
      status: "action_required",
      authority,
      checkedAt: record.checkedAt ?? health.checkedAt,
      summary: `The latest ${label.toLowerCase()} failed.`,
    };
  }

  const environmentIsIsolated =
    id === "backup_restore"
      ? record.environment === "isolated"
      : record.environment === "isolated" ||
        record.environment === "staging";
  if (!environmentIsIsolated) {
    return {
      id,
      label,
      status: "not_verified",
      authority,
      checkedAt: record.checkedAt ?? health.checkedAt,
      summary:
        `The latest ${label.toLowerCase()} was not recorded in an ` +
        "approved isolated environment.",
    };
  }

  const maximumAgeHours = id === "backup_restore" ? 24 * 90 : 24 * 30;
  const age = ageInHours(record.checkedAt, health.checkedAt);
  return {
    id,
    label,
    status: age !== null && age <= maximumAgeHours ? "ok" : "attention",
    authority,
    checkedAt: record.checkedAt ?? health.checkedAt,
    summary:
      `The latest ${record.environment ?? "isolated"} check succeeded ` +
      `for artifact ${record.artifactVersion ?? "unknown"}. ` +
      (id === "backup_restore"
        ? "This does not prove that every backup is restorable."
        : "This does not directly verify the production write path."),
  };
}

function dataQualityCheck(health: ParsedAdminHealth): HealthCheck {
  return {
    id: "data_quality_hold",
    label: "Data quality hold",
    status: health.dataQualityHold.active ? "action_required" : "ok",
    authority: "homeground_private.data_quality_incidents",
    checkedAt: health.checkedAt,
    summary: health.dataQualityHold.active
      ? "Do not use this window for content or product decisions."
      : "No open controlled data-quality incident is recorded.",
  };
}

function buildResponse(health: ParsedAdminHealth): Record<string, unknown> {
  const checks: HealthCheck[] = [
    {
      id: "admin_api_reachable",
      label: "Admin Health API reachable",
      status: "ok",
      authority: "This authenticated Admin Health response",
      checkedAt: health.checkedAt,
      summary:
        "The Admin Health API is reachable and this request was authorized.",
    },
    {
      id: "database_summary_readable",
      label: "Database summary readable",
      status: "ok",
      authority: "get_homeground_admin_health contract RPC",
      checkedAt: health.checkedAt,
      summary:
        "The restricted database health summary matches the expected contract.",
    },
    productionConfigurationCheck(health.checkedAt),
    {
      id: "production_write_path",
      label: "Production write path",
      status: "not_verified",
      authority: "No non-persistent production write probe exists",
      checkedAt: health.checkedAt,
      summary: "Production write path: not directly verified.",
    },
    outboxCheck(health),
    {
      id: "retained_submission_activity",
      label: "Currently retained submission activity",
      status: "unknown",
      authority: "homeground_private.inquiries retained-count RPC",
      checkedAt: health.checkedAt,
      summary:
        `${health.retainedCounts.past10Minutes} in 10 minutes, ` +
        `${health.retainedCounts.past1Hour} in 1 hour, ` +
        `${health.retainedCounts.past24Hours} in 24 hours. ` +
        `Last retained submission: ${
          health.lastRetainedSubmissionAt ?? "none"
        }. Activity is informational and is not a health verdict.`,
    },
    cleanupCheck(health),
    operationalCheck("backup_restore", health),
    operationalCheck("isolated_e2e_canary", health),
    dataQualityCheck(health),
  ];

  const actionRequired = checks.some(
    (check) => check.status === "action_required",
  );
  const attention = checks.some(
    (check) =>
      check.status === "attention" ||
      check.status === "not_verified" ||
      check.status === "unknown",
  );
  return {
    contractVersion: healthContractVersionValue(),
    checkedAt: health.checkedAt,
    environment: configuredEnvironment(),
    actionRequired,
    headline: actionRequired
      ? "Action required"
      : attention
      ? "Review unverified or informational checks"
      : "No current action required",
    checks,
    outbox: {
      queued: health.outbox.queued,
      processing: health.outbox.processing,
      providerAccepted: health.outbox.providerAccepted,
      failed: health.outbox.failed,
      overdue: health.outbox.overdue,
      expired: health.outbox.expired,
      oldestQueuedAgeSeconds: health.outbox.oldestQueuedAgeSeconds,
    },
    retainedCounts: health.retainedCounts,
    dataQualityHold: {
      active: health.dataQualityHold.active,
      message: health.dataQualityHold.message,
    },
  };
}

async function handleRequest(request: Request): Promise<Response> {
  const authorization = await authorizeAdminRequest(request);
  if (authorization.response) return authorization.response;

  const finish = async (
    result: AdminAuditResult,
    response: Response,
  ): Promise<Response> => {
    const auditRecorded = await recordAdminAccess(
      authorization.admin.userId,
      "admin-health",
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

  let rpcResult;
  try {
    rpcResult = await callSupabaseRpc<unknown>(
      "get_homeground_admin_health",
      {},
    );
  } catch {
    return finish(
      "summary_unavailable",
      adminUnavailableResponse(
        "health_unavailable",
        authorization.requestId,
        authorization.headers,
      ),
    );
  }

  if (!rpcResult.ok) {
    return finish(
      "summary_unavailable",
      adminUnavailableResponse(
        "health_unavailable",
        authorization.requestId,
        authorization.headers,
      ),
    );
  }
  const health = parseAdminHealthRpc(rpcResult.data);
  if (!health) {
    return finish(
      "contract_rejected",
      adminUnavailableResponse(
        "invalid_health_contract",
        authorization.requestId,
        authorization.headers,
      ),
    );
  }

  return finish(
    "success",
    adminSuccessResponse(
      buildResponse(health),
      authorization.headers,
    ),
  );
}

Deno.serve(handleRequest);
