type JsonRecord = Record<string, unknown>;

const insightContractVersion = "homeground-admin-insights.v1";
const healthContractVersion = "homeground-admin-health.v1";
const controlledHoldMessage =
  "Do not use this window for content or product decisions.";
const insightNotice =
  "Saved submissions, not unique people, customers, or market share.";

const destinationIds = [
  "beijing-great-wall",
  "shanghai",
  "xian",
  "chengdu",
  "chongqing",
  "zhangjiajie",
  "guilin-yangshuo",
  "hangzhou-suzhou",
  "yunnan-dali-lijiang",
  "guangzhou-shenzhen",
] as const;

const schema2CompatibilitySets = [
  {
    schemaVersion: "2",
    entryPath: "destination_timing",
    formVersion: "2026-07-19.1",
    ruleVersion: "2026-07-19.1",
  },
  {
    schemaVersion: "2",
    entryPath: "destination_timing",
    formVersion: "2026-07-20.1",
    ruleVersion: "2026-07-19.1",
  },
  {
    schemaVersion: "2",
    entryPath: "destination_timing",
    formVersion: "2026-07-20.2",
    ruleVersion: "2026-07-19.1",
  },
  {
    schemaVersion: "2",
    entryPath: "destination_timing",
    formVersion: "2026-07-21.1",
    ruleVersion: "2026-07-19.1",
  },
] as const;

const bothSchemaCompatibilitySets = [
  {
    schemaVersion: "1",
    entryPath: "generated_route",
    formVersion: "2026-07-18.1",
    ruleVersion: "2026-07-17.1",
  },
  ...schema2CompatibilitySets,
] as const;

const metricContracts = {
  destination_selections: {
    label: "Destination selections",
    multiSelect: true,
    bucketIds: destinationIds,
    compatibilitySets: schema2CompatibilitySets,
  },
  trip_duration: {
    label: "Trip duration",
    multiSelect: false,
    bucketIds: ["1-7", "8-10", "11-14", "15-21", "22-plus"],
    compatibilitySets: bothSchemaCompatibilitySets,
  },
  party: {
    label: "Party",
    multiSelect: false,
    bucketIds: [
      "solo",
      "two-adults",
      "family-with-children",
      "older-relatives",
      "multigenerational-family",
      "friends-private-group",
    ],
    compatibilitySets: schema2CompatibilitySets,
  },
  pace: {
    label: "Pace",
    multiSelect: false,
    bucketIds: ["essentials", "classic", "unhurried"],
    compatibilitySets: schema2CompatibilitySets,
  },
  stay_time_reference_match: {
    label: "Destination stay-time reference match",
    multiSelect: false,
    bucketIds: [
      "needs_prioritization",
      "tighter_than_selected_pace",
      "within_reference_range",
      "room_to_shape",
      "partial_manual_check",
      "manual_only",
    ],
    compatibilitySets: schema2CompatibilitySets,
  },
  must_see_selections: {
    label: "Must-see selections",
    multiSelect: true,
    bucketIds: destinationIds,
    compatibilitySets: schema2CompatibilitySets,
  },
  reply_channel_choice: {
    label: "Reply-channel choice",
    multiSelect: false,
    bucketIds: ["email", "whatsapp"],
    compatibilitySets: bothSchemaCompatibilitySets,
  },
  form_locale: {
    label: "Form locale",
    multiSelect: false,
    bucketIds: ["en", "zh", "ko"],
    compatibilitySets: bothSchemaCompatibilitySets,
  },
} as const;

export type AdminCheckStatus =
  | "ok"
  | "attention"
  | "action_required"
  | "unknown"
  | "not_verified";

export interface ParsedAdminHealth {
  checkedAt: string;
  outbox: {
    queued: number;
    processing: number;
    providerAccepted: number;
    failed: number;
    overdue: number;
    expired: number;
    oldestQueuedAgeSeconds: number | null;
    retryDeadlineHours: 72;
  };
  retainedCounts: {
    past10Minutes: number;
    past1Hour: number;
    past24Hours: number;
  };
  lastRetainedSubmissionAt: string | null;
  cleanup: {
    status: "never_run" | "running" | "succeeded" | "failed";
    startedAt: string | null;
    finishedAt: string | null;
    errorCode: string | null;
    inquiriesDeleted: number;
    outboxDeleted: number;
    retriesExpired: number;
    expiredAdminAccessLogCount: number;
    pendingTombstoneReplication: number;
  };
  backupRestore: OperationalCheck;
  isolatedCanary: OperationalCheck;
  dataQualityHold: {
    active: boolean;
    incidentTypes: string[];
    message: string | null;
  };
}

interface OperationalCheck {
  status: "never_run" | "succeeded" | "failed";
  checkedAt: string | null;
  environment: "isolated" | "staging" | "production" | null;
  artifactVersion: string | null;
}

function isRecord(value: unknown): value is JsonRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function rpcPayload(data: unknown): JsonRecord | null {
  if (!Array.isArray(data) || data.length !== 1) return null;
  const row = data[0];
  if (!isRecord(row) || !isRecord(row.payload)) return null;
  return row.payload;
}

function nonNegativeInteger(value: unknown): number | null {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < 0
  ) {
    return null;
  }
  return value;
}

function nullableNonNegativeInteger(
  value: unknown,
): number | null | undefined {
  if (value === null) return null;
  const parsed = nonNegativeInteger(value);
  return parsed === null ? undefined : parsed;
}

function isoTimestamp(value: unknown): string | null {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T/u.test(value) ||
    !Number.isFinite(Date.parse(value))
  ) {
    return null;
  }
  return value;
}

function nullableIsoTimestamp(
  value: unknown,
): string | null | undefined {
  if (value === null) return null;
  return isoTimestamp(value) ?? undefined;
}

function safePercentage(value: unknown): number | null | undefined {
  if (value === null) return null;
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0 ||
    value > 100
  ) {
    return undefined;
  }
  return value;
}

function visibleKSafeCount(value: number | null): boolean {
  return value === null || value === 0 || value >= 5;
}

function roundedPercentage(count: number, denominator: number): number {
  return Math.round((count / denominator) * 1_000) / 10;
}

function parseCompatibilitySets(
  value: unknown,
  expected: readonly {
    schemaVersion: string;
    entryPath: string;
    formVersion: string;
    ruleVersion: string;
  }[],
): JsonRecord[] | null {
  if (
    !Array.isArray(value) ||
    value.length !== expected.length ||
    value.length < 1 ||
    value.length > 8
  ) {
    return null;
  }

  const parsed: JsonRecord[] = [];
  for (let index = 0; index < expected.length; index += 1) {
    const candidate = value[index];
    const approved = expected[index];
    if (
      !isRecord(candidate) ||
      Object.keys(candidate).length !== 4 ||
      candidate.schemaVersion !== approved.schemaVersion ||
      candidate.entryPath !== approved.entryPath ||
      candidate.formVersion !== approved.formVersion ||
      candidate.ruleVersion !== approved.ruleVersion
    ) {
      return null;
    }
    parsed.push({
      schemaVersion: approved.schemaVersion,
      entryPath: approved.entryPath,
      formVersion: approved.formVersion,
      ruleVersion: approved.ruleVersion,
    });
  }
  return parsed;
}

function parseMetric(
  value: unknown,
): JsonRecord | null {
  if (!isRecord(value) || typeof value.id !== "string") return null;
  const metricId = value.id as keyof typeof metricContracts;
  const contract = metricContracts[metricId];
  if (!contract || value.multiSelect !== contract.multiSelect) return null;

  const denominator = nullableNonNegativeInteger(value.denominator);
  const unknown = nullableNonNegativeInteger(value.unknown);
  const notApplicable = nullableNonNegativeInteger(value.notApplicable);
  if (
    denominator === undefined ||
    unknown === undefined ||
    notApplicable === undefined ||
    typeof value.insufficientSample !== "boolean" ||
    typeof value.percentagesVisible !== "boolean"
  ) {
    return null;
  }
  if (
    value.insufficientSample !== (denominator === null) ||
    (
      value.insufficientSample &&
      (
        unknown !== null ||
        notApplicable !== null ||
        value.percentagesVisible
      )
    ) ||
    (
      !value.insufficientSample &&
      value.percentagesVisible !==
        (denominator !== null && denominator >= 20)
    )
  ) {
    return null;
  }
  if (
    !value.insufficientSample &&
    (
      denominator === null ||
      denominator < 5 ||
      unknown === undefined ||
      !visibleKSafeCount(unknown) ||
      unknown !== null && unknown > denominator ||
      notApplicable === undefined ||
      !visibleKSafeCount(notApplicable)
    )
  ) {
    return null;
  }

  const compatibilitySets = parseCompatibilitySets(
    value.compatibilitySets,
    contract.compatibilitySets,
  );
  if (!compatibilitySets || !Array.isArray(value.buckets)) return null;

  const rawBuckets = new Map<string, JsonRecord>();
  for (const bucket of value.buckets) {
    if (
      !isRecord(bucket) ||
      typeof bucket.id !== "string" ||
      rawBuckets.has(bucket.id)
    ) {
      return null;
    }
    rawBuckets.set(bucket.id, bucket);
  }
  if (rawBuckets.size !== contract.bucketIds.length) return null;

  const buckets: JsonRecord[] = [];
  for (const bucketId of contract.bucketIds) {
    const bucket = rawBuckets.get(bucketId);
    if (!bucket || typeof bucket.suppressed !== "boolean") return null;
    const count = nullableNonNegativeInteger(bucket.count);
    const percentage = safePercentage(bucket.percentage);
    if (
      count === undefined ||
      percentage === undefined ||
      bucket.suppressed !== (count === null) ||
      (bucket.suppressed && percentage !== null) ||
      (!value.percentagesVisible && percentage !== null) ||
      !visibleKSafeCount(count) ||
      (
        count !== null &&
        denominator !== null &&
        count > denominator
      ) ||
      (
        count !== null &&
        denominator !== null &&
        value.percentagesVisible &&
        (
          percentage === null ||
          Math.abs(
            percentage - roundedPercentage(count, denominator)
          ) > 0.000_001
        )
      )
    ) {
      return null;
    }
    buckets.push({
      id: bucketId,
      count,
      percentage,
      suppressed: bucket.suppressed,
    });
  }

  if (
    value.insufficientSample &&
    buckets.some((bucket) => bucket.suppressed !== true)
  ) {
    return null;
  }
  if (
    value.insufficientSample &&
    (unknown !== null || notApplicable !== null)
  ) {
    return null;
  }
  if (!value.insufficientSample && notApplicable === null) {
    return null;
  }
  if (!contract.multiSelect && !value.insufficientSample) {
    if (denominator === null) return null;
    const suppressedCategoryCount =
      buckets.filter((bucket) => bucket.suppressed === true).length +
      (unknown === null ? 1 : 0);
    const visibleCounts = buckets
      .map((bucket) => bucket.count)
      .filter((count): count is number => count !== null);
    if (unknown !== null) visibleCounts.push(unknown);
    const visibleTotal = visibleCounts.reduce(
      (total, count) => total + count,
      0,
    );
    if (
      !Number.isSafeInteger(visibleTotal) ||
      visibleTotal > denominator ||
      (
        suppressedCategoryCount === 0 &&
        visibleTotal !== denominator
      ) ||
      (
        suppressedCategoryCount > 0 &&
        (
          suppressedCategoryCount < 2 ||
          denominator - visibleTotal < 6
        )
      )
    ) {
      return null;
    }
  }

  return {
    id: metricId,
    label: contract.label,
    multiSelect: contract.multiSelect,
    denominator,
    unknown,
    notApplicable,
    compatibilitySets,
    insufficientSample: value.insufficientSample,
    percentagesVisible: value.percentagesVisible,
    buckets,
  };
}

export function sanitizeAdminInsightsRpc(data: unknown): JsonRecord | null {
  const payload = rpcPayload(data);
  if (
    !payload ||
    payload.contractVersion !== insightContractVersion ||
    payload.timezone !== "Asia/Shanghai" ||
    !isRecord(payload.window) ||
    payload.window.days !== 90 ||
    typeof payload.window.collectingBaseline !== "boolean" ||
    !isRecord(payload.retainedCounts) ||
    !isRecord(payload.dataQualityHold) ||
    typeof payload.dataQualityHold.active !== "boolean" ||
    !Array.isArray(payload.metrics)
  ) {
    return null;
  }

  const generatedAt = isoTimestamp(payload.generatedAt);
  const startsAt = isoTimestamp(payload.window.startsAt);
  const endsAt = isoTimestamp(payload.window.endsAt);
  const today = nonNegativeInteger(payload.retainedCounts.today);
  const past7Days = nonNegativeInteger(
    payload.retainedCounts.past7Days,
  );
  const past30Days = nonNegativeInteger(
    payload.retainedCounts.past30Days,
  );
  if (
    !generatedAt ||
    !startsAt ||
    !endsAt ||
    Date.parse(startsAt) >= Date.parse(endsAt) ||
    today === null ||
    past7Days === null ||
    past30Days === null ||
    today > past7Days ||
    past7Days > past30Days ||
    payload.metrics.length !== Object.keys(metricContracts).length
  ) {
    return null;
  }

  const metrics: JsonRecord[] = [];
  const seenMetricIds = new Set<string>();
  for (const rawMetric of payload.metrics) {
    const metric = parseMetric(rawMetric);
    if (!metric || seenMetricIds.has(String(metric.id))) return null;
    seenMetricIds.add(String(metric.id));
    metrics.push(metric);
  }
  if (
    Object.keys(metricContracts).some((id) => !seenMetricIds.has(id))
  ) {
    return null;
  }

  const holdActive = payload.dataQualityHold.active;
  return {
    contractVersion: insightContractVersion,
    generatedAt,
    timezone: "Asia/Shanghai",
    window: {
      days: 90,
      startsAt,
      endsAt,
      collectingBaseline: payload.window.collectingBaseline,
    },
    retainedCounts: { today, past7Days, past30Days },
    dataQualityHold: {
      active: holdActive,
      message: holdActive ? controlledHoldMessage : null,
    },
    metrics,
    notice: insightNotice,
  };
}

function parseOperationalCheck(value: unknown): OperationalCheck | null {
  if (!isRecord(value)) return null;
  if (
    value.status !== "never_run" &&
    value.status !== "succeeded" &&
    value.status !== "failed"
  ) {
    return null;
  }
  const checkedAt = nullableIsoTimestamp(value.checkedAt);
  const artifactVersion =
    value.artifactVersion === null
      ? null
      : typeof value.artifactVersion === "string" &&
          /^[A-Za-z0-9._:-]{1,64}$/u.test(value.artifactVersion)
      ? value.artifactVersion
      : undefined;
  const environment =
    value.environment === null
      ? null
      : value.environment === "isolated" ||
          value.environment === "staging" ||
          value.environment === "production"
      ? value.environment
      : undefined;
  if (
    checkedAt === undefined ||
    artifactVersion === undefined ||
    environment === undefined ||
    (
      value.status === "never_run" &&
      (checkedAt !== null ||
        artifactVersion !== null ||
        environment !== null)
    ) ||
    (
      value.status !== "never_run" &&
      (checkedAt === null ||
        artifactVersion === null ||
        environment === null)
    )
  ) {
    return null;
  }
  return {
    status: value.status,
    checkedAt,
    environment,
    artifactVersion,
  };
}

export function parseAdminHealthRpc(data: unknown): ParsedAdminHealth | null {
  const payload = rpcPayload(data);
  if (
    !payload ||
    payload.contractVersion !== healthContractVersion ||
    !isRecord(payload.database) ||
    payload.database.summaryReadable !== true ||
    payload.database.contractVersion !== healthContractVersion ||
    !isRecord(payload.outbox) ||
    !isRecord(payload.retainedCounts) ||
    !isRecord(payload.cleanup) ||
    !isRecord(payload.dataQualityHold) ||
    !isRecord(payload.versions)
  ) {
    return null;
  }

  const checkedAt = isoTimestamp(payload.checkedAt);
  const outboxValues = [
    "queued",
    "processing",
    "providerAccepted",
    "failed",
    "overdue",
    "expired",
  ].map((key) => nonNegativeInteger(payload.outbox[key]));
  const oldestQueuedAgeSeconds = nullableNonNegativeInteger(
    payload.outbox.oldestQueuedAgeSeconds,
  );
  const retainedValues = [
    "past10Minutes",
    "past1Hour",
    "past24Hours",
  ].map((key) => nonNegativeInteger(payload.retainedCounts[key]));
  const lastRetainedSubmissionAt = nullableIsoTimestamp(
    payload.lastRetainedSubmissionAt,
  );
  if (
    !checkedAt ||
    outboxValues.some((value) => value === null) ||
    oldestQueuedAgeSeconds === undefined ||
    payload.outbox.retryDeadlineHours !== 72 ||
    retainedValues.some((value) => value === null) ||
    retainedValues[0]! > retainedValues[1]! ||
    retainedValues[1]! > retainedValues[2]! ||
    lastRetainedSubmissionAt === undefined
  ) {
    return null;
  }

  if (
    payload.cleanup.status !== "never_run" &&
    payload.cleanup.status !== "running" &&
    payload.cleanup.status !== "succeeded" &&
    payload.cleanup.status !== "failed"
  ) {
    return null;
  }
  const cleanupStartedAt = nullableIsoTimestamp(
    payload.cleanup.startedAt,
  );
  const cleanupFinishedAt = nullableIsoTimestamp(
    payload.cleanup.finishedAt,
  );
  const cleanupCounts = [
    "inquiriesDeleted",
    "outboxDeleted",
    "retriesExpired",
    "expiredAdminAccessLogCount",
    "pendingTombstoneReplication",
  ].map((key) => nonNegativeInteger(payload.cleanup[key]));
  const cleanupErrorCode =
    payload.cleanup.errorCode === null
      ? null
      : typeof payload.cleanup.errorCode === "string" &&
          [
            "cleanup_failed",
            "integrity_violation",
            "lock_timeout",
            "statement_timeout",
          ].includes(payload.cleanup.errorCode)
      ? payload.cleanup.errorCode
      : undefined;
  if (
    cleanupStartedAt === undefined ||
    cleanupFinishedAt === undefined ||
    cleanupCounts.some((value) => value === null) ||
    cleanupErrorCode === undefined
  ) {
    return null;
  }

  const backupRestore = parseOperationalCheck(payload.backupRestore);
  const isolatedCanary = parseOperationalCheck(payload.isolatedCanary);
  const allowedIncidentTypes = [
    "abuse_spike",
    "rate_limit_alert",
    "idempotency_anomaly",
    "production_test_pollution",
    "schema_contract_mismatch",
    "confirmed_data_corruption",
  ];
  if (
    !backupRestore ||
    !isolatedCanary ||
    typeof payload.dataQualityHold.active !== "boolean" ||
    !Array.isArray(payload.dataQualityHold.incidentTypes) ||
    payload.dataQualityHold.incidentTypes.some((value) =>
      typeof value !== "string" ||
      !allowedIncidentTypes.includes(value)
    ) ||
    payload.versions.currentForm !== "2026-07-21.1" ||
    payload.versions.currentPrivacy !== "2026-07-21.1" ||
    payload.versions.destinationRule !== "2026-07-19.1" ||
    payload.versions.legacyRouteRule !== "2026-07-17.1"
  ) {
    return null;
  }

  const holdActive = payload.dataQualityHold.active;
  if (
    holdActive !== (payload.dataQualityHold.incidentTypes.length > 0)
  ) {
    return null;
  }

  return {
    checkedAt,
    outbox: {
      queued: outboxValues[0]!,
      processing: outboxValues[1]!,
      providerAccepted: outboxValues[2]!,
      failed: outboxValues[3]!,
      overdue: outboxValues[4]!,
      expired: outboxValues[5]!,
      oldestQueuedAgeSeconds,
      retryDeadlineHours: 72,
    },
    retainedCounts: {
      past10Minutes: retainedValues[0]!,
      past1Hour: retainedValues[1]!,
      past24Hours: retainedValues[2]!,
    },
    lastRetainedSubmissionAt,
    cleanup: {
      status: payload.cleanup.status,
      startedAt: cleanupStartedAt,
      finishedAt: cleanupFinishedAt,
      errorCode: cleanupErrorCode,
      inquiriesDeleted: cleanupCounts[0]!,
      outboxDeleted: cleanupCounts[1]!,
      retriesExpired: cleanupCounts[2]!,
      expiredAdminAccessLogCount: cleanupCounts[3]!,
      pendingTombstoneReplication: cleanupCounts[4]!,
    },
    backupRestore,
    isolatedCanary,
    dataQualityHold: {
      active: holdActive,
      incidentTypes: [...payload.dataQualityHold.incidentTypes] as string[],
      message: holdActive ? controlledHoldMessage : null,
    },
  };
}

export function healthContractVersionValue(): string {
  return healthContractVersion;
}
