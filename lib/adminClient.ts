import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const adminInsightsContractVersion =
  "homeground-admin-insights.v1" as const;
export const adminHealthContractVersion = "homeground-admin-health.v1" as const;
export const adminTrafficContractVersion =
  "homeground-admin-traffic.v1" as const;

export type AdminHealthStatus =
  | "ok"
  | "attention"
  | "action_required"
  | "unknown"
  | "not_verified";

export type AdminHealthCheckId =
  | "admin_api_reachable"
  | "database_summary_readable"
  | "production_intake_configuration"
  | "production_write_path"
  | "notification_outbox"
  | "retained_submission_activity"
  | "retention_cleanup"
  | "backup_restore"
  | "isolated_e2e_canary"
  | "data_quality_hold";

export type AdminEnvironment =
  | "production"
  | "staging"
  | "development"
  | "unconfigured";

export interface AdminConfig {
  supabaseUrl: string;
  publishableKey: string;
  insightsUrl: string;
  healthUrl: string;
  trafficUrl: string;
}

export interface AdminConfigResult {
  config: AdminConfig | null;
  missing: string[];
  invalid: string[];
}

export interface AdminConfigValues {
  NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_URL: string;
  NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_PUBLISHABLE_KEY: string;
  NEXT_PUBLIC_HOMEGROUND_ADMIN_INSIGHTS_URL: string;
  NEXT_PUBLIC_HOMEGROUND_ADMIN_HEALTH_URL: string;
}

export interface AdminMetricOption {
  id: string;
  count: number | null;
  percentage: number | null;
  suppressed: boolean;
}

export interface AdminMetricCompatibilitySet {
  schemaVersion: string;
  entryPath: string;
  formVersion: string;
  ruleVersion: string;
}

export interface AdminMetric {
  id: string;
  multiSelect: boolean;
  denominator: number | null;
  unknown: number | null;
  notApplicable: number | null;
  compatibilitySets: AdminMetricCompatibilitySet[];
  insufficientSample: boolean;
  percentagesVisible: boolean;
  buckets: AdminMetricOption[];
}

export interface AdminInsightsResponse {
  contractVersion: string;
  generatedAt: string;
  timezone: "Asia/Shanghai";
  window: {
    days: 90;
    startsAt: string;
    endsAt: string;
    collectingBaseline: boolean;
  };
  retainedCounts: {
    today: number;
    past7Days: number;
    past30Days: number;
  };
  dataQualityHold: {
    active: boolean;
    message: string | null;
  };
  metrics: AdminMetric[];
}

export interface AdminHealthCheck {
  id: AdminHealthCheckId;
  label: string;
  status: AdminHealthStatus;
  authority: string;
  checkedAt: string;
  summary: string;
}

export interface AdminHealthResponse {
  contractVersion: string;
  checkedAt: string;
  environment: AdminEnvironment;
  actionRequired: boolean;
  headline: string;
  checks: AdminHealthCheck[];
  outbox: {
    queued: number;
    processing: number;
    providerAccepted: number;
    failed: number;
    overdue: number;
    expired: number;
    oldestQueuedAgeSeconds: number | null;
  };
  retainedCounts: {
    past10Minutes: number;
    past1Hour: number;
    past24Hours: number;
  };
  dataQualityHold: {
    active: boolean;
    message: string | null;
  };
}

export interface AdminTrafficCount {
  count: number | null;
  suppressed: boolean;
}

export type AdminTrafficBucketType =
  | "value"
  | "unknown"
  | "suppressed";

export interface AdminTrafficLabelBucket {
  bucketType: AdminTrafficBucketType;
  label: string | null;
}

export interface AdminTrafficDimensionBucket extends AdminTrafficCount {
  bucketType: AdminTrafficBucketType;
  label: string | null;
}

export interface AdminTrafficSession {
  sessionLabel: string;
  startedAt: string;
  lastSeenAt: string;
  locale: "en" | "zh" | "ko";
  source: AdminTrafficLabelBucket;
  campaign: AdminTrafficLabelBucket;
  entryPage: AdminTrafficLabelBucket;
}

export interface AdminTrafficResponse {
  contractVersion: typeof adminTrafficContractVersion;
  generatedAt: string;
  timezone: "Asia/Shanghai";
  window: {
    days: 30;
    startsAt: string;
    endsAt: string;
  };
  totals: {
    sessions: AdminTrafficCount;
    pageViews: AdminTrafficCount;
    contactClickAttempts: AdminTrafficCount;
    emailFormStarts: AdminTrafficCount;
    attributedEnquiries: AdminTrafficCount;
    unknownSourceSessions: AdminTrafficCount;
  };
  dimensions: {
    sources: AdminTrafficDimensionBucket[];
    campaigns: AdminTrafficDimensionBucket[];
    pages: AdminTrafficDimensionBucket[];
  };
  recentSessions: AdminTrafficSession[];
  limits: {
    minimumVisibleCount: 5;
    maximumRecentSessions: 12;
    recentSessionsMinimumEligibleCount: 5;
    perSessionEventsIncluded: false;
    timeResolution: "day";
    linkedInquirySessionsExcluded: true;
    sessionLabelScope: "current_30_day_window";
  };
  notice: {
    scope:
      "Consented anonymous sessions; not people, customers, or market share.";
    clickMeaning:
      "A contact-channel click does not prove that a message was sent.";
  };
}

export class AdminApiError extends Error {
  readonly kind:
    | "unauthorized"
    | "forbidden"
    | "rate_limited"
    | "unavailable"
    | "contract";

  constructor(
    kind: AdminApiError["kind"],
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "AdminApiError";
    this.kind = kind;
  }
}

const forbiddenResponseKeys = new Set(
  [
    "contact",
    "email",
    "phone",
    "phonee164",
    "budget",
    "roughbudgetperperson",
    "country",
    "departurecountry",
    "otherplace",
    "publicreference",
    "inquiryid",
    "journeyid",
    "note",
    "utmsource",
    "utmmedium",
    "utmcampaign",
    "utmcontent",
    "referrer",
    "useragent",
    "ip",
    "sessionhash",
    "eventid",
    "payloadhash",
  ].map((key) => key.toLowerCase()),
);

const knownMetricIds = new Set([
  "destination_selections",
  "trip_duration",
  "party",
  "pace",
  "stay_time_reference_match",
  "must_see_selections",
  "reply_channel_choice",
  "form_locale",
]);

const knownHealthCheckIds = [
  "admin_api_reachable",
  "database_summary_readable",
  "production_intake_configuration",
  "production_write_path",
  "notification_outbox",
  "retained_submission_activity",
  "retention_cleanup",
  "backup_restore",
  "isolated_e2e_canary",
  "data_quality_hold",
] as const satisfies readonly AdminHealthCheckId[];

const controlledHoldMessage =
  "Do not use this window for content or product decisions.";

const knownBucketIdsByMetric: Record<string, ReadonlySet<string>> = {
  destination_selections: new Set([
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
  ]),
  trip_duration: new Set([
    "1-7",
    "8-10",
    "11-14",
    "15-21",
    "22-plus",
  ]),
  party: new Set([
    "solo",
    "two-adults",
    "family-with-children",
    "older-relatives",
    "multigenerational-family",
    "friends-private-group",
  ]),
  pace: new Set(["essentials", "classic", "unhurried"]),
  stay_time_reference_match: new Set([
    "needs_prioritization",
    "tighter_than_selected_pace",
    "within_reference_range",
    "room_to_shape",
    "partial_manual_check",
    "manual_only",
  ]),
  must_see_selections: new Set([
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
  ]),
  reply_channel_choice: new Set(["email", "whatsapp"]),
  form_locale: new Set(["en", "zh", "ko"]),
};

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
] as const satisfies readonly AdminMetricCompatibilitySet[];

const bothSchemaCompatibilitySets = [
  {
    schemaVersion: "1",
    entryPath: "generated_route",
    formVersion: "2026-07-18.1",
    ruleVersion: "2026-07-17.1",
  },
  ...schema2CompatibilitySets,
] as const satisfies readonly AdminMetricCompatibilitySet[];

const contactSchemaCompatibilitySets = [
  ...bothSchemaCompatibilitySets,
  {
    schemaVersion: "3",
    entryPath: "homepage_email",
    formVersion: "2026-07-26.1",
    ruleVersion: "2026-07-26.1",
  },
] as const satisfies readonly AdminMetricCompatibilitySet[];

const knownCompatibilitySetsByMetric: Record<
  string,
  readonly AdminMetricCompatibilitySet[]
> = {
  destination_selections: schema2CompatibilitySets,
  trip_duration: bothSchemaCompatibilitySets,
  party: schema2CompatibilitySets,
  pace: schema2CompatibilitySets,
  stay_time_reference_match: schema2CompatibilitySets,
  must_see_selections: schema2CompatibilitySets,
  reply_channel_choice: contactSchemaCompatibilitySets,
  form_locale: contactSchemaCompatibilitySets,
};

const trafficLocales = new Set(["en", "zh", "ko"]);
const controlledTrafficLabelPattern =
  /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/;
const controlledTrafficPathPattern = /^\/[A-Za-z0-9/_-]*$/;
const trafficSessionLabelPattern = /^HG-[A-F0-9]{8}$/;
const trafficScopeNotice =
  "Consented anonymous sessions; not people, customers, or market share.";
const trafficClickNotice =
  "A contact-channel click does not prove that a message was sent.";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function hasExactKeys(
  value: Record<string, unknown>,
  expectedKeys: readonly string[],
): boolean {
  const keys = Object.keys(value);
  return (
    keys.length === expectedKeys.length &&
    expectedKeys.every((key) => Object.hasOwn(value, key))
  );
}

function assertExactKeys(
  value: Record<string, unknown>,
  expectedKeys: readonly string[],
  path: string,
): void {
  if (!hasExactKeys(value, expectedKeys)) {
    throw new AdminApiError(
      "contract",
      `${path} does not match the approved contract fields.`,
    );
  }
}

function normalizedKey(value: string): string {
  return value.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function assertNoForbiddenResponseFields(
  value: unknown,
  depth = 0,
): void {
  if (depth > 8) {
    throw new AdminApiError(
      "contract",
      "The admin response is nested more deeply than the approved contract.",
    );
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      assertNoForbiddenResponseFields(item, depth + 1);
    }
    return;
  }
  if (!isPlainObject(value)) return;
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenResponseKeys.has(normalizedKey(key))) {
      throw new AdminApiError(
        "contract",
        "The admin response included a field outside the approved data boundary.",
      );
    }
    assertNoForbiddenResponseFields(child, depth + 1);
  }
}

function objectAt(
  value: unknown,
  path: string,
): Record<string, unknown> {
  if (!isPlainObject(value)) {
    throw new AdminApiError(
      "contract",
      `${path} is not an object in the approved contract.`,
    );
  }
  return value;
}

function arrayAt(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new AdminApiError(
      "contract",
      `${path} is not an array in the approved contract.`,
    );
  }
  return value;
}

function stringAt(
  value: unknown,
  path: string,
  options: { maxLength?: number; nullable?: boolean } = {},
): string | null {
  if (value === null && options.nullable) return null;
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.length > (options.maxLength ?? 240)
  ) {
    throw new AdminApiError(
      "contract",
      `${path} is not a valid string in the approved contract.`,
    );
  }
  return value;
}

function booleanAt(value: unknown, path: string): boolean {
  if (typeof value !== "boolean") {
    throw new AdminApiError(
      "contract",
      `${path} is not a boolean in the approved contract.`,
    );
  }
  return value;
}

function countAt(value: unknown, path: string): number {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < 0 ||
    value > 1_000_000
  ) {
    throw new AdminApiError(
      "contract",
      `${path} is not a valid count in the approved contract.`,
    );
  }
  return value;
}

function nullableCountAt(value: unknown, path: string): number | null {
  if (value === null) return null;
  return countAt(value, path);
}

function nullableDurationAt(value: unknown, path: string): number | null {
  if (value === null) return null;
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < 0 ||
    value > 31_536_000
  ) {
    throw new AdminApiError(
      "contract",
      `${path} is not a valid duration in the approved contract.`,
    );
  }
  return value;
}

function percentageAt(value: unknown, path: string): number | null {
  if (value === null) return null;
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0 ||
    value > 100
  ) {
    throw new AdminApiError(
      "contract",
      `${path} is not a valid percentage in the approved contract.`,
    );
  }
  return value;
}

function isVisibleKSafeCount(value: number | null): boolean {
  return value === null || value === 0 || value >= 5;
}

function roundedPercentage(count: number, denominator: number): number {
  return Math.round((count / denominator) * 1_000) / 10;
}

function isoDateAt(
  value: unknown,
  path: string,
  nullable = false,
): string | null {
  if (value === null && nullable) return null;
  const result = stringAt(value, path, { maxLength: 64 });
  if (result === null || Number.isNaN(Date.parse(result))) {
    throw new AdminApiError(
      "contract",
      `${path} is not a valid date in the approved contract.`,
    );
  }
  return result;
}

function compatibilitySetsAt(
  value: unknown,
  path: string,
  expected: readonly AdminMetricCompatibilitySet[],
): AdminMetricCompatibilitySet[] {
  const values = arrayAt(value, path);
  if (
    values.length < 1 ||
    values.length > 8 ||
    values.length !== expected.length
  ) {
    throw new AdminApiError(
      "contract",
      `${path} does not contain the approved compatibility tuples.`,
    );
  }
  return values.map((item, index) => {
    const itemPath = `${path}[${index}]`;
    const tuple = objectAt(item, itemPath);
    const approved = expected[index];
    if (
      Object.keys(tuple).length !== 4 ||
      tuple.schemaVersion !== approved.schemaVersion ||
      tuple.entryPath !== approved.entryPath ||
      tuple.formVersion !== approved.formVersion ||
      tuple.ruleVersion !== approved.ruleVersion
    ) {
      throw new AdminApiError(
        "contract",
        `${itemPath} is not an approved compatibility tuple.`,
      );
    }
    return { ...approved };
  });
}

function parseDataQualityHold(
  value: unknown,
  path: string,
): AdminInsightsResponse["dataQualityHold"] {
  const record = objectAt(value, path);
  const active = booleanAt(record.active, `${path}.active`);
  const message = stringAt(record.message, `${path}.message`, {
    nullable: true,
    maxLength: 400,
  });
  if (
    (active && message !== controlledHoldMessage) ||
    (!active && message !== null)
  ) {
    throw new AdminApiError(
      "contract",
      `${path} does not use the approved data-quality hold message.`,
    );
  }
  return {
    active,
    message,
  };
}

export function parseAdminInsights(
  value: unknown,
): AdminInsightsResponse {
  assertNoForbiddenResponseFields(value);
  const root = objectAt(value, "response");
  const window = objectAt(root.window, "response.window");
  const retained = objectAt(
    root.retainedCounts,
    "response.retainedCounts",
  );
  const days = countAt(window.days, "response.window.days");
  if (days !== 90) {
    throw new AdminApiError(
      "contract",
      "The insight window is not the approved rolling 90 days.",
    );
  }

  const rawMetrics = arrayAt(root.metrics, "response.metrics");
  if (rawMetrics.length !== knownMetricIds.size) {
    throw new AdminApiError(
      "contract",
      "The response does not contain exactly the eight approved metrics.",
    );
  }
  const seenMetricIds = new Set<string>();
  const metrics = rawMetrics.map<AdminMetric>((rawMetric, metricIndex) => {
    const path = `response.metrics[${metricIndex}]`;
    const metric = objectAt(rawMetric, path);
    const id = stringAt(metric.id, `${path}.id`, { maxLength: 80 });
    if (
      id === null ||
      !knownMetricIds.has(id) ||
      seenMetricIds.has(id)
    ) {
      throw new AdminApiError(
        "contract",
        "The response contains an unknown or duplicate metric.",
      );
    }
    seenMetricIds.add(id);
    const compatibilitySets = compatibilitySetsAt(
      metric.compatibilitySets,
      `${path}.compatibilitySets`,
      knownCompatibilitySetsByMetric[id],
    );
    const multiSelect = booleanAt(
      metric.multiSelect,
      `${path}.multiSelect`,
    );
    const expectedMultiSelect =
      id === "destination_selections" || id === "must_see_selections";
    if (multiSelect !== expectedMultiSelect) {
      throw new AdminApiError(
        "contract",
        `${path}.multiSelect does not match the approved metric definition.`,
      );
    }
    const denominator = nullableCountAt(
      metric.denominator,
      `${path}.denominator`,
    );
    const unknown = nullableCountAt(metric.unknown, `${path}.unknown`);
    const notApplicable = nullableCountAt(
      metric.notApplicable,
      `${path}.notApplicable`,
    );
    const insufficientSample = booleanAt(
      metric.insufficientSample,
      `${path}.insufficientSample`,
    );
    const percentagesVisible = booleanAt(
      metric.percentagesVisible,
      `${path}.percentagesVisible`,
    );
    if (
      insufficientSample !== (denominator === null) ||
      (insufficientSample &&
        (unknown !== null ||
          notApplicable !== null ||
          percentagesVisible)) ||
      (!insufficientSample &&
        percentagesVisible !== (denominator !== null && denominator >= 20))
    ) {
      throw new AdminApiError(
        "contract",
        `${path} exposes exact classification values for an insufficient sample.`,
      );
    }
    if (
      !insufficientSample &&
      (denominator === null ||
        denominator < 5 ||
        !isVisibleKSafeCount(unknown) ||
        (unknown !== null && unknown > denominator) ||
        notApplicable === null ||
        !isVisibleKSafeCount(notApplicable))
    ) {
      throw new AdminApiError(
        "contract",
        `${path} violates the approved visible-count boundaries.`,
      );
    }
    const rawBuckets = arrayAt(metric.buckets, `${path}.buckets`);
    const allowedBucketIds = knownBucketIdsByMetric[id];
    if (rawBuckets.length !== allowedBucketIds.size) {
      throw new AdminApiError(
        "contract",
        `${path}.buckets does not contain the complete approved bucket set.`,
      );
    }
    const seenBucketIds = new Set<string>();
    const buckets = rawBuckets.map<AdminMetricOption>((rawBucket, bucketIndex) => {
      const bucketPath = `${path}.buckets[${bucketIndex}]`;
      const bucket = objectAt(rawBucket, bucketPath);
      const bucketId = stringAt(bucket.id, `${bucketPath}.id`, {
        maxLength: 80,
      });
      if (
        bucketId === null ||
        !allowedBucketIds.has(bucketId) ||
        seenBucketIds.has(bucketId)
      ) {
        throw new AdminApiError(
          "contract",
          `${bucketPath}.id is unknown or duplicated.`,
        );
      }
      seenBucketIds.add(bucketId);
      const count = nullableCountAt(bucket.count, `${bucketPath}.count`);
      const percentage = percentageAt(
        bucket.percentage,
        `${bucketPath}.percentage`,
      );
      const suppressed = booleanAt(
        bucket.suppressed,
        `${bucketPath}.suppressed`,
      );
      if (
        (suppressed && (count !== null || percentage !== null)) ||
        (!suppressed && count === null) ||
        !isVisibleKSafeCount(count) ||
        (!percentagesVisible && percentage !== null) ||
        (count !== null &&
          denominator !== null &&
          count > denominator) ||
        (count !== null &&
          denominator !== null &&
          percentagesVisible &&
          (percentage === null ||
            Math.abs(
              percentage - roundedPercentage(count, denominator),
            ) > 0.000_001))
      ) {
        throw new AdminApiError(
          "contract",
          `${bucketPath} violates the approved suppression rules.`,
        );
      }
      return {
        id: bucketId,
        count,
        percentage,
        suppressed,
      };
    });
    if (insufficientSample && buckets.some((bucket) => !bucket.suppressed)) {
      throw new AdminApiError(
        "contract",
        `${path} exposes bucket values for an insufficient sample.`,
      );
    }
    if (!multiSelect && !insufficientSample) {
      if (denominator === null) {
        throw new AdminApiError(
          "contract",
          `${path} has no denominator for an exclusive metric.`,
        );
      }
      const suppressedCategoryCount =
        buckets.filter((bucket) => bucket.suppressed).length +
        (unknown === null ? 1 : 0);
      const visibleTotal =
        buckets.reduce(
          (total, bucket) => total + (bucket.count ?? 0),
          0,
        ) + (unknown ?? 0);
      if (
        !Number.isSafeInteger(visibleTotal) ||
        visibleTotal > denominator ||
        (suppressedCategoryCount === 0 &&
          visibleTotal !== denominator) ||
        (suppressedCategoryCount > 0 &&
          (suppressedCategoryCount < 2 ||
            denominator - visibleTotal < 6))
      ) {
        throw new AdminApiError(
          "contract",
          `${path} violates the complementary suppression required for an exclusive metric.`,
        );
      }
    }
    return {
      id,
      multiSelect,
      denominator,
      unknown,
      notApplicable,
      compatibilitySets,
      insufficientSample,
      percentagesVisible,
      buckets,
    };
  });

  const contractVersion = stringAt(
    root.contractVersion,
    "response.contractVersion",
    { maxLength: 80 },
  );
  const generatedAt = isoDateAt(
    root.generatedAt,
    "response.generatedAt",
  );
  const startsAt = isoDateAt(window.startsAt, "response.window.startsAt");
  const endsAt = isoDateAt(window.endsAt, "response.window.endsAt");
  if (
    contractVersion !== adminInsightsContractVersion ||
    generatedAt === null ||
    startsAt === null ||
    endsAt === null
  ) {
    throw new AdminApiError("contract", "The insight response is incomplete.");
  }

  return {
    contractVersion,
    generatedAt,
    timezone:
      root.timezone === "Asia/Shanghai"
        ? "Asia/Shanghai"
        : (() => {
            throw new AdminApiError(
              "contract",
              "The insight timezone is not the approved Asia/Shanghai.",
            );
          })(),
    window: {
      days: 90,
      startsAt,
      endsAt,
      collectingBaseline: booleanAt(
        window.collectingBaseline,
        "response.window.collectingBaseline",
      ),
    },
    retainedCounts: {
      today: countAt(retained.today, "response.retainedCounts.today"),
      past7Days: countAt(
        retained.past7Days,
        "response.retainedCounts.past7Days",
      ),
      past30Days: countAt(
        retained.past30Days,
        "response.retainedCounts.past30Days",
      ),
    },
    dataQualityHold: parseDataQualityHold(
      root.dataQualityHold,
      "response.dataQualityHold",
    ),
    metrics,
  };
}

function trafficCountAt(
  value: unknown,
  path: string,
): AdminTrafficCount {
  const record = objectAt(value, path);
  assertExactKeys(record, ["count", "suppressed"], path);
  const suppressed = booleanAt(record.suppressed, `${path}.suppressed`);
  const count = nullableCountAt(record.count, `${path}.count`);
  if (
    (suppressed && count !== null) ||
    (!suppressed && count === null) ||
    (!suppressed && count !== 0 && count < 5)
  ) {
    throw new AdminApiError(
      "contract",
      `${path} violates the traffic suppression boundary.`,
    );
  }
  return { count, suppressed };
}

function controlledTrafficValueAt(
  value: unknown,
  path: string,
  kind: "source" | "campaign" | "page",
): string {
  const label = stringAt(value, path, {
    maxLength: kind === "source" ? 64 : kind === "campaign" ? 96 : 180,
  });
  if (label === null) {
    throw new AdminApiError(
      "contract",
      `${path} is not an approved traffic label.`,
    );
  }
  if (kind === "page") {
    if (
      (!controlledTrafficPathPattern.test(label) ||
        label.includes("//") ||
        label.includes(".."))
    ) {
      throw new AdminApiError(
        "contract",
        `${path} is not an approved page label.`,
      );
    }
    return label;
  }
  if (
    !controlledTrafficLabelPattern.test(label)
  ) {
    throw new AdminApiError(
      "contract",
      `${path} is not an approved attribution label.`,
    );
  }
  return label;
}

function trafficDimensionAt(
  value: unknown,
  path: string,
  kind: "source" | "campaign" | "page",
): AdminTrafficDimensionBucket[] {
  const values = arrayAt(value, path);
  if (values.length > 30) {
    throw new AdminApiError(
      "contract",
      `${path} exceeds the approved traffic dimension limit.`,
    );
  }
  const seen = new Set<string>();
  return values.map((value, index) => {
    const bucketPath = `${path}[${index}]`;
    const bucket = objectAt(value, bucketPath);
    assertExactKeys(
      bucket,
      ["bucketType", "label", "count", "suppressed"],
      bucketPath,
    );
    const bucketType = stringAt(
      bucket.bucketType,
      `${bucketPath}.bucketType`,
      { maxLength: 10 },
    ) as AdminTrafficBucketType | null;
    if (
      bucketType === null ||
      !["value", "unknown", "suppressed"].includes(bucketType) ||
      (kind === "page" && bucketType === "unknown")
    ) {
      throw new AdminApiError(
        "contract",
        `${bucketPath}.bucketType is not approved.`,
      );
    }
    const label =
      bucketType === "value"
        ? controlledTrafficValueAt(
            bucket.label,
            `${bucketPath}.label`,
            kind,
          )
        : bucket.label === null
          ? null
          : (() => {
              throw new AdminApiError(
                "contract",
                `${bucketPath}.label must be null for a synthetic bucket.`,
              );
            })();
    const uniqueKey =
      bucketType === "value" ? `value:${label}` : bucketType;
    if (seen.has(uniqueKey)) {
      throw new AdminApiError(
        "contract",
        `${bucketPath} duplicates a traffic bucket.`,
      );
    }
    seen.add(uniqueKey);
    const parsedCount = trafficCountAt(
      {
        count: bucket.count,
        suppressed: bucket.suppressed,
      },
      bucketPath,
    );
    if (
      (bucketType === "value" && parsedCount.suppressed) ||
      (bucketType === "suppressed" && !parsedCount.suppressed)
    ) {
      throw new AdminApiError(
        "contract",
        `${bucketPath} exposes an unapproved low-volume label.`,
      );
    }
    return { bucketType, label, ...parsedCount };
  });
}

function dayDateAt(value: unknown, path: string): string {
  const result = isoDateAt(value, path);
  if (result === null) {
    throw new AdminApiError(
      "contract",
      `${path} is not an approved day timestamp.`,
    );
  }
  const date = new Date(result);
  if (
    date.getUTCHours() !== 0 ||
    date.getUTCMinutes() !== 0 ||
    date.getUTCSeconds() !== 0 ||
    date.getUTCMilliseconds() !== 0
  ) {
    throw new AdminApiError(
      "contract",
      `${path} is more precise than the approved day resolution.`,
    );
  }
  return result;
}

function trafficSessionBucketAt(
  value: unknown,
  path: string,
  kind: "source" | "campaign" | "page",
): AdminTrafficLabelBucket {
  const bucket = objectAt(value, path);
  assertExactKeys(bucket, ["bucketType", "label"], path);
  const bucketType = stringAt(
    bucket.bucketType,
    `${path}.bucketType`,
    { maxLength: 10 },
  ) as AdminTrafficBucketType | null;
  if (
    bucketType === null ||
    !["value", "unknown", "suppressed"].includes(bucketType) ||
    (kind === "page" && bucketType === "unknown")
  ) {
    throw new AdminApiError(
      "contract",
      `${path}.bucketType is not approved.`,
    );
  }
  if (bucketType !== "value") {
    if (bucket.label !== null) {
      throw new AdminApiError(
        "contract",
        `${path}.label must be null for a synthetic bucket.`,
      );
    }
    return { bucketType, label: null };
  }
  return {
    bucketType,
    label: controlledTrafficValueAt(
      bucket.label,
      `${path}.label`,
      kind,
    ),
  };
}

export function parseAdminTraffic(
  value: unknown,
): AdminTrafficResponse {
  assertNoForbiddenResponseFields(value);
  const root = objectAt(value, "response");
  assertExactKeys(
    root,
    [
      "contractVersion",
      "generatedAt",
      "timezone",
      "window",
      "totals",
      "dimensions",
      "recentSessions",
      "limits",
      "notice",
    ],
    "response",
  );
  if (
    root.contractVersion !== adminTrafficContractVersion ||
    root.timezone !== "Asia/Shanghai"
  ) {
    throw new AdminApiError(
      "contract",
      "The traffic response does not use the approved contract.",
    );
  }

  const generatedAt = isoDateAt(
    root.generatedAt,
    "response.generatedAt",
  );
  const window = objectAt(root.window, "response.window");
  assertExactKeys(
    window,
    ["days", "startsAt", "endsAt"],
    "response.window",
  );
  if (countAt(window.days, "response.window.days") !== 30) {
    throw new AdminApiError(
      "contract",
      "The traffic response is not the approved rolling 30 days.",
    );
  }
  const startsAt = isoDateAt(
    window.startsAt,
    "response.window.startsAt",
  );
  const endsAt = isoDateAt(window.endsAt, "response.window.endsAt");
  if (
    generatedAt === null ||
    startsAt === null ||
    endsAt === null ||
    Date.parse(startsAt) > Date.parse(endsAt) ||
    Math.abs(Date.parse(generatedAt) - Date.parse(endsAt)) > 1_000
  ) {
    throw new AdminApiError(
      "contract",
      "The traffic response window is inconsistent.",
    );
  }

  const totals = objectAt(root.totals, "response.totals");
  assertExactKeys(
    totals,
    [
      "sessions",
      "pageViews",
      "contactClickAttempts",
      "emailFormStarts",
      "attributedEnquiries",
      "unknownSourceSessions",
    ],
    "response.totals",
  );
  const parsedTotals = {
    sessions: trafficCountAt(
      totals.sessions,
      "response.totals.sessions",
    ),
    pageViews: trafficCountAt(
      totals.pageViews,
      "response.totals.pageViews",
    ),
    contactClickAttempts: trafficCountAt(
      totals.contactClickAttempts,
      "response.totals.contactClickAttempts",
    ),
    emailFormStarts: trafficCountAt(
      totals.emailFormStarts,
      "response.totals.emailFormStarts",
    ),
    attributedEnquiries: trafficCountAt(
      totals.attributedEnquiries,
      "response.totals.attributedEnquiries",
    ),
    unknownSourceSessions: trafficCountAt(
      totals.unknownSourceSessions,
      "response.totals.unknownSourceSessions",
    ),
  };

  const dimensions = objectAt(
    root.dimensions,
    "response.dimensions",
  );
  assertExactKeys(
    dimensions,
    ["sources", "campaigns", "pages"],
    "response.dimensions",
  );
  const sources = trafficDimensionAt(
    dimensions.sources,
    "response.dimensions.sources",
    "source",
  );
  const campaigns = trafficDimensionAt(
    dimensions.campaigns,
    "response.dimensions.campaigns",
    "campaign",
  );
  const pages = trafficDimensionAt(
    dimensions.pages,
    "response.dimensions.pages",
    "page",
  );
  const visibleSources = new Set(
    sources
      .filter(
        (bucket) =>
          bucket.bucketType === "value" && !bucket.suppressed,
      )
      .map((bucket) => bucket.label),
  );
  const visibleCampaigns = new Set(
    campaigns
      .filter(
        (bucket) =>
          bucket.bucketType === "value" && !bucket.suppressed,
      )
      .map((bucket) => bucket.label),
  );

  const rawSessions = arrayAt(
    root.recentSessions,
    "response.recentSessions",
  );
  if (rawSessions.length > 12) {
    throw new AdminApiError(
      "contract",
      "The traffic response exceeds the recent-session limit.",
    );
  }
  const seenSessionLabels = new Set<string>();
  let previousLastSeen = Infinity;
  const recentSessions = rawSessions.map<AdminTrafficSession>(
    (value, index) => {
      const sessionPath = `response.recentSessions[${index}]`;
      const session = objectAt(value, sessionPath);
      assertExactKeys(
        session,
        [
          "sessionLabel",
          "startedAt",
          "lastSeenAt",
          "locale",
          "source",
          "campaign",
          "entryPage",
        ],
        sessionPath,
      );
      const sessionLabel = stringAt(
        session.sessionLabel,
        `${sessionPath}.sessionLabel`,
        { maxLength: 11 },
      );
      const startedAt = dayDateAt(
        session.startedAt,
        `${sessionPath}.startedAt`,
      );
      const lastSeenAt = dayDateAt(
        session.lastSeenAt,
        `${sessionPath}.lastSeenAt`,
      );
      const locale = stringAt(
        session.locale,
        `${sessionPath}.locale`,
        { maxLength: 2 },
      );
      const source = trafficSessionBucketAt(
        session.source,
        `${sessionPath}.source`,
        "source",
      );
      const campaign = trafficSessionBucketAt(
        session.campaign,
        `${sessionPath}.campaign`,
        "campaign",
      );
      const entryPage = trafficSessionBucketAt(
        session.entryPage,
        `${sessionPath}.entryPage`,
        "page",
      );
      if (
        sessionLabel === null ||
        !trafficSessionLabelPattern.test(sessionLabel) ||
        seenSessionLabels.has(sessionLabel) ||
        locale === null ||
        !trafficLocales.has(locale) ||
        Date.parse(startedAt) > Date.parse(lastSeenAt) ||
        Date.parse(lastSeenAt) > previousLastSeen ||
        (source.bucketType === "value" &&
          !visibleSources.has(source.label)) ||
        (campaign.bucketType === "value" &&
          !visibleCampaigns.has(campaign.label))
      ) {
        throw new AdminApiError(
          "contract",
          `${sessionPath} violates the anonymous-session boundary.`,
        );
      }
      seenSessionLabels.add(sessionLabel);
      previousLastSeen = Date.parse(lastSeenAt);
      return {
        sessionLabel,
        startedAt,
        lastSeenAt,
        locale: locale as AdminTrafficSession["locale"],
        source,
        campaign,
        entryPage,
      };
    },
  );
  if (
    (
      parsedTotals.sessions.suppressed ||
      parsedTotals.sessions.count === 0
    ) &&
    recentSessions.length > 0
  ) {
    throw new AdminApiError(
      "contract",
      "Recent sessions must stay empty below the minimum visible window count.",
    );
  }

  const limits = objectAt(root.limits, "response.limits");
  assertExactKeys(
    limits,
    [
      "minimumVisibleCount",
      "maximumRecentSessions",
      "recentSessionsMinimumEligibleCount",
      "perSessionEventsIncluded",
      "timeResolution",
      "linkedInquirySessionsExcluded",
      "sessionLabelScope",
    ],
    "response.limits",
  );
  if (
    limits.minimumVisibleCount !== 5 ||
    limits.maximumRecentSessions !== 12 ||
    limits.recentSessionsMinimumEligibleCount !== 5 ||
    limits.perSessionEventsIncluded !== false ||
    limits.timeResolution !== "day" ||
    limits.linkedInquirySessionsExcluded !== true ||
    limits.sessionLabelScope !== "current_30_day_window"
  ) {
    throw new AdminApiError(
      "contract",
      "The traffic response limits are not approved.",
    );
  }

  const notice = objectAt(root.notice, "response.notice");
  assertExactKeys(
    notice,
    ["scope", "clickMeaning"],
    "response.notice",
  );
  if (
    notice.scope !== trafficScopeNotice ||
    notice.clickMeaning !== trafficClickNotice
  ) {
    throw new AdminApiError(
      "contract",
      "The traffic response notice is not approved.",
    );
  }

  return {
    contractVersion: adminTrafficContractVersion,
    generatedAt,
    timezone: "Asia/Shanghai",
    window: { days: 30, startsAt, endsAt },
    totals: parsedTotals,
    dimensions: { sources, campaigns, pages },
    recentSessions,
    limits: {
      minimumVisibleCount: 5,
      maximumRecentSessions: 12,
      recentSessionsMinimumEligibleCount: 5,
      perSessionEventsIncluded: false,
      timeResolution: "day",
      linkedInquirySessionsExcluded: true,
      sessionLabelScope: "current_30_day_window",
    },
    notice: {
      scope: trafficScopeNotice,
      clickMeaning: trafficClickNotice,
    },
  };
}

export function parseAdminHealth(value: unknown): AdminHealthResponse {
  assertNoForbiddenResponseFields(value);
  const root = objectAt(value, "response");
  const outbox = objectAt(root.outbox, "response.outbox");
  const retained = objectAt(
    root.retainedCounts,
    "response.retainedCounts",
  );
  const rawChecks = arrayAt(root.checks, "response.checks");
  if (rawChecks.length !== knownHealthCheckIds.length) {
    throw new AdminApiError(
      "contract",
      "The health response does not contain the complete approved check set.",
    );
  }
  const checks = rawChecks.map<AdminHealthCheck>((rawCheck, index) => {
    const path = `response.checks[${index}]`;
    const check = objectAt(rawCheck, path);
    const id = stringAt(check.id, `${path}.id`, { maxLength: 80 });
    const label = stringAt(check.label, `${path}.label`, {
      maxLength: 120,
    });
    const status = stringAt(check.status, `${path}.status`, {
      maxLength: 40,
    });
    const checkedAt = isoDateAt(check.checkedAt, `${path}.checkedAt`);
    const authority = stringAt(check.authority, `${path}.authority`, {
      maxLength: 180,
    });
    const summary = stringAt(check.summary, `${path}.summary`, {
      maxLength: 400,
    });
    if (
      id === null ||
      label === null ||
      checkedAt === null ||
      authority === null ||
      summary === null ||
      id !== knownHealthCheckIds[index] ||
      ![
        "ok",
        "attention",
        "action_required",
        "unknown",
        "not_verified",
      ].includes(status ?? "")
    ) {
      throw new AdminApiError(
        "contract",
        "A health check is outside the approved contract.",
      );
    }
    return {
      id: id as AdminHealthCheckId,
      label,
      status: status as AdminHealthStatus,
      authority,
      checkedAt,
      summary,
    };
  });
  const oldestQueuedAgeSeconds = nullableDurationAt(
    outbox.oldestQueuedAgeSeconds,
    "response.outbox.oldestQueuedAgeSeconds",
  );
  const contractVersion = stringAt(
    root.contractVersion,
    "response.contractVersion",
    { maxLength: 80 },
  );
  const checkedAt = isoDateAt(root.checkedAt, "response.checkedAt");
  const environment = stringAt(root.environment, "response.environment", {
    maxLength: 40,
  });
  const headline = stringAt(root.headline, "response.headline", {
    maxLength: 240,
  });
  const knownEnvironments: readonly string[] = [
    "production",
    "staging",
    "development",
    "unconfigured",
  ];
  if (
    contractVersion !== adminHealthContractVersion ||
    checkedAt === null ||
    environment === null ||
    !knownEnvironments.includes(environment) ||
    headline === null
  ) {
    throw new AdminApiError("contract", "The health response is incomplete.");
  }
  const actionRequired = booleanAt(
    root.actionRequired,
    "response.actionRequired",
  );
  const hasActionRequiredCheck = checks.some(
    (check) => check.status === "action_required",
  );
  const hasAttentionCheck = checks.some(
    (check) =>
      check.status === "attention" ||
      check.status === "not_verified" ||
      check.status === "unknown",
  );
  const expectedHeadline = hasActionRequiredCheck
    ? "Action required"
    : hasAttentionCheck
      ? "Review unverified or informational checks"
      : "No current action required";
  if (
    actionRequired !== hasActionRequiredCheck ||
    headline !== expectedHeadline ||
    checks[0].status !== "ok" ||
    checks[1].status !== "ok" ||
    checks[3].status !== "not_verified" ||
    checks[5].status !== "unknown"
  ) {
    throw new AdminApiError(
      "contract",
      "The health summary is inconsistent with its approved checks.",
    );
  }
  const dataQualityHold = parseDataQualityHold(
    root.dataQualityHold,
    "response.dataQualityHold",
  );
  if (
    checks[9].status !==
    (dataQualityHold.active ? "action_required" : "ok")
  ) {
    throw new AdminApiError(
      "contract",
      "The data-quality hold does not match its approved health check.",
    );
  }
  return {
    contractVersion,
    checkedAt,
    environment: environment as AdminEnvironment,
    actionRequired,
    headline,
    checks,
    outbox: {
      queued: countAt(outbox.queued, "response.outbox.queued"),
      processing: countAt(
        outbox.processing,
        "response.outbox.processing",
      ),
      providerAccepted: countAt(
        outbox.providerAccepted,
        "response.outbox.providerAccepted",
      ),
      failed: countAt(outbox.failed, "response.outbox.failed"),
      overdue: countAt(outbox.overdue, "response.outbox.overdue"),
      expired: countAt(outbox.expired, "response.outbox.expired"),
      oldestQueuedAgeSeconds,
    },
    retainedCounts: {
      past10Minutes: countAt(
        retained.past10Minutes,
        "response.retainedCounts.past10Minutes",
      ),
      past1Hour: countAt(
        retained.past1Hour,
        "response.retainedCounts.past1Hour",
      ),
      past24Hours: countAt(
        retained.past24Hours,
        "response.retainedCounts.past24Hours",
      ),
    },
    dataQualityHold,
  };
}

function isLocalHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]"
  );
}

function validatedUrl(
  rawValue: string,
  options: { originOnly?: boolean },
): string | null {
  try {
    const value = new URL(rawValue);
    const secure =
      value.protocol === "https:" ||
      (process.env.NODE_ENV !== "production" &&
        value.protocol === "http:" &&
        isLocalHost(value.hostname));
    if (
      !secure ||
      value.username ||
      value.password ||
      value.search ||
      value.hash
    ) {
      return null;
    }
    if (
      options.originOnly &&
      (value.pathname !== "/" || value.origin !== rawValue.replace(/\/$/, ""))
    ) {
      return null;
    }
    return options.originOnly ? value.origin : value.toString();
  } catch {
    return null;
  }
}

function validatedAdminEndpoint(
  rawValue: string,
  supabaseOrigin: string,
  expectedPath: string,
): string | null {
  const validated = validatedUrl(rawValue, {});
  if (!validated) return null;
  const value = new URL(validated);
  const normalizedPath =
    value.pathname.length > 1 && value.pathname.endsWith("/")
      ? value.pathname.slice(0, -1)
      : value.pathname;
  if (value.origin !== supabaseOrigin || normalizedPath !== expectedPath) {
    return null;
  }
  value.pathname = expectedPath;
  return value.toString();
}

export function validateAdminConfigValues(
  rawValues: AdminConfigValues,
): AdminConfigResult {
  const values = Object.fromEntries(
    Object.entries(rawValues).map(([name, value]) => [name, value.trim()]),
  ) as unknown as AdminConfigValues;
  const missing = Object.entries(values)
    .filter(([, value]) => value.length === 0)
    .map(([name]) => name);
  if (missing.length > 0) return { config: null, missing, invalid: [] };

  const supabaseUrl = validatedUrl(
    values.NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_URL,
    { originOnly: true },
  );
  const insightsUrl = supabaseUrl
    ? validatedAdminEndpoint(
        values.NEXT_PUBLIC_HOMEGROUND_ADMIN_INSIGHTS_URL,
        supabaseUrl,
        "/functions/v1/admin-insights",
      )
    : null;
  const healthUrl = supabaseUrl
    ? validatedAdminEndpoint(
        values.NEXT_PUBLIC_HOMEGROUND_ADMIN_HEALTH_URL,
        supabaseUrl,
        "/functions/v1/admin-health",
      )
    : null;
  const publishableKeyIsValid =
    values.NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_PUBLISHABLE_KEY.startsWith(
      "sb_publishable_",
    ) &&
    values.NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_PUBLISHABLE_KEY.length <=
      2_048 &&
    /^[\x21-\x7e]+$/.test(
      values.NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_PUBLISHABLE_KEY,
    );
  const invalid = [
    supabaseUrl
      ? null
      : "NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_URL",
    insightsUrl
      ? null
      : "NEXT_PUBLIC_HOMEGROUND_ADMIN_INSIGHTS_URL",
    healthUrl ? null : "NEXT_PUBLIC_HOMEGROUND_ADMIN_HEALTH_URL",
    publishableKeyIsValid
      ? null
      : "NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_PUBLISHABLE_KEY",
  ].filter((name): name is string => name !== null);

  if (invalid.length > 0 || !supabaseUrl || !insightsUrl || !healthUrl) {
    return { config: null, missing: [], invalid };
  }

  const trafficEndpoint = new URL(insightsUrl);
  trafficEndpoint.pathname = "/functions/v1/admin-traffic";
  const trafficUrl = trafficEndpoint.toString();

  return {
    config: {
      supabaseUrl,
      publishableKey:
        values.NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_PUBLISHABLE_KEY,
      insightsUrl,
      healthUrl,
      trafficUrl,
    },
    missing: [],
    invalid: [],
  };
}

export function getAdminConfig(): AdminConfigResult {
  return validateAdminConfigValues({
    NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_URL:
      process.env.NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_URL ?? "",
    NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_PUBLISHABLE_KEY ?? "",
    NEXT_PUBLIC_HOMEGROUND_ADMIN_INSIGHTS_URL:
      process.env.NEXT_PUBLIC_HOMEGROUND_ADMIN_INSIGHTS_URL ?? "",
    NEXT_PUBLIC_HOMEGROUND_ADMIN_HEALTH_URL:
      process.env.NEXT_PUBLIC_HOMEGROUND_ADMIN_HEALTH_URL ?? "",
  });
}

export function createAdminAuthClient(config: AdminConfig): SupabaseClient {
  return createClient(config.supabaseUrl, config.publishableKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: false,
      flowType: "pkce",
      persistSession: true,
      storage: window.sessionStorage,
      storageKey: "homeground-admin-auth",
    },
    global: {
      headers: {
        "X-Client-Info": "homeground-private-admin/1",
      },
    },
  });
}

async function fetchAdminJson<T>(
  url: string,
  accessToken: string,
  publishableKey: string,
  parser: (value: unknown) => T,
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        apikey: publishableKey,
      },
      cache: "no-store",
      credentials: "omit",
      redirect: "error",
      referrerPolicy: "no-referrer",
      signal: controller.signal,
    });
    if (response.status === 401) {
      throw new AdminApiError(
        "unauthorized",
        "The admin session is no longer valid.",
      );
    }
    if (response.status === 403) {
      throw new AdminApiError(
        "forbidden",
        "This account is not authorized for the private admin page.",
      );
    }
    if (response.status === 429) {
      throw new AdminApiError(
        "rate_limited",
        "The admin API is temporarily rate limited.",
      );
    }
    if (!response.ok) {
      throw new AdminApiError(
        "unavailable",
        "The admin API is temporarily unavailable.",
      );
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      throw new AdminApiError(
        "contract",
        "The admin API did not return the approved JSON contract.",
      );
    }
    const contentLength = Number(response.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > 256_000) {
      throw new AdminApiError(
        "contract",
        "The admin response exceeded the approved size.",
      );
    }
    const responseText = await response.text();
    if (new TextEncoder().encode(responseText).byteLength > 256_000) {
      throw new AdminApiError(
        "contract",
        "The admin response exceeded the approved size.",
      );
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(responseText) as unknown;
    } catch (error) {
      throw new AdminApiError(
        "contract",
        "The admin API returned invalid JSON.",
        { cause: error },
      );
    }
    return parser(parsed);
  } catch (error) {
    if (error instanceof AdminApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new AdminApiError(
        "unavailable",
        "The admin API did not respond in time.",
        { cause: error },
      );
    }
    throw new AdminApiError(
      "unavailable",
      "The admin API could not be reached.",
      { cause: error },
    );
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function fetchAdminInsights(
  config: AdminConfig,
  accessToken: string,
): Promise<AdminInsightsResponse> {
  return fetchAdminJson(
    config.insightsUrl,
    accessToken,
    config.publishableKey,
    parseAdminInsights,
  );
}

export function fetchAdminHealth(
  config: AdminConfig,
  accessToken: string,
): Promise<AdminHealthResponse> {
  return fetchAdminJson(
    config.healthUrl,
    accessToken,
    config.publishableKey,
    parseAdminHealth,
  );
}

export function fetchAdminTraffic(
  config: AdminConfig,
  accessToken: string,
): Promise<AdminTrafficResponse> {
  return fetchAdminJson(
    config.trafficUrl,
    accessToken,
    config.publishableKey,
    parseAdminTraffic,
  );
}
