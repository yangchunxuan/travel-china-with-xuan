// @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
import { isTrafficProductSelection, isTrafficProductSlug } from "./traffic-contracts.ts";

type JsonRecord = Record<string, unknown>;

export const adminTrafficContractVersion =
  "homeground-admin-traffic.v1" as const;
export const adminTrafficContractVersionV2 = "homeground-admin-traffic.v2" as const;

const minimumVisibleCount = 5;
const maximumRecentSessions = 12;
const locales = ["en", "zh", "ko"] as const;
const controlledSourcePattern =
  /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/;
const controlledPathPattern = /^\/[A-Za-z0-9/_-]*$/;
const sessionLabelPattern = /^HG-[A-F0-9]{8}$/;
const approvedScopeNotice =
  "Consented anonymous sessions; not people, customers, or market share.";
const approvedClickNotice =
  "A contact-channel click does not prove that a message was sent.";

const forbiddenKeys = new Set([
  "email",
  "phone",
  "contact",
  "ip",
  "ipaddress",
  "useragent",
  "referrer",
  "sessionhash",
  "eventid",
  "inquiryid",
  "payloadhash",
  "utmsource",
  "utmmedium",
  "utmcampaign",
  "utmcontent",
]);

function isRecord(value: unknown): value is JsonRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizedKey(value: string): string {
  return value.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function hasForbiddenKey(value: unknown, depth = 0): boolean {
  if (depth > 8) return true;
  if (Array.isArray(value)) {
    return value.some((item) => hasForbiddenKey(item, depth + 1));
  }
  if (!isRecord(value)) return false;
  return Object.entries(value).some(
    ([key, child]) =>
      forbiddenKeys.has(normalizedKey(key)) ||
      hasForbiddenKey(child, depth + 1),
  );
}

function hasOnlyKeys(
  value: JsonRecord,
  allowedKeys: readonly string[],
): boolean {
  const allowed = new Set(allowedKeys);
  return Object.keys(value).every((key) => allowed.has(key));
}

function rpcPayload(data: unknown): JsonRecord | null {
  if (!Array.isArray(data) || data.length !== 1) return null;
  const row = data[0];
  if (
    !isRecord(row) ||
    !hasOnlyKeys(row, ["payload"]) ||
    !isRecord(row.payload)
  ) {
    return null;
  }
  return row.payload;
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

function dayTimestamp(value: unknown): string | null {
  const parsed = isoTimestamp(value);
  if (!parsed) return null;
  const date = new Date(parsed);
  if (
    date.getUTCHours() !== 0 ||
    date.getUTCMinutes() !== 0 ||
    date.getUTCSeconds() !== 0 ||
    date.getUTCMilliseconds() !== 0
  ) {
    return null;
  }
  return parsed;
}

function safeCount(value: unknown): number | null {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < 0 ||
    value > 10_000_000
  ) {
    return null;
  }
  return value;
}

function parseCountCell(value: unknown): JsonRecord | null {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, ["count", "suppressed"]) ||
    typeof value.suppressed !== "boolean"
  ) {
    return null;
  }
  if (value.suppressed) {
    if (value.count !== null) return null;
    return { count: null, suppressed: true };
  }
  const count = safeCount(value.count);
  if (count === null || (count > 0 && count < minimumVisibleCount)) {
    return null;
  }
  return { count, suppressed: false };
}

function controlledSourceLabel(
  value: unknown,
  maximumLength: number,
): string | null {
  if (
    typeof value !== "string" ||
    value.length < 1 ||
    value.length > maximumLength ||
    !controlledSourcePattern.test(value)
  ) {
    return null;
  }
  return value;
}

function controlledPageLabel(value: unknown): string | null {
  if (
    typeof value !== "string" ||
    value.length < 1 ||
    value.length > 180 ||
    !controlledPathPattern.test(value) ||
    value.includes("//") ||
    value.includes("..")
  ) {
    return null;
  }
  return value;
}

function parseDimension(
  value: unknown,
  kind: "source" | "campaign" | "page",
): JsonRecord[] | null {
  if (!Array.isArray(value) || value.length > 30) return null;
  const seen = new Set<string>();
  const parsed: JsonRecord[] = [];
  for (const item of value) {
    if (
      !isRecord(item) ||
      !hasOnlyKeys(
        item,
        ["bucketType", "label", "count", "suppressed"],
      ) ||
      !["value", "unknown", "suppressed"].includes(
        item.bucketType as string,
      ) ||
      typeof item.suppressed !== "boolean"
    ) {
      return null;
    }
    const bucketType = item.bucketType as
      | "value"
      | "unknown"
      | "suppressed";
    const label =
      bucketType === "value"
        ? kind === "page"
          ? controlledPageLabel(item.label)
          : controlledSourceLabel(
              item.label,
              kind === "source" ? 64 : 96,
            )
        : item.label === null
          ? null
          : undefined;
    const uniqueKey =
      bucketType === "value" ? `value:${label}` : bucketType;
    if (
      label === undefined ||
      (bucketType === "value" && !label) ||
      seen.has(uniqueKey) ||
      (bucketType === "unknown" && kind === "page")
    ) {
      return null;
    }
    seen.add(uniqueKey);

    const count = parseCountCell({
      count: item.count,
      suppressed: item.suppressed,
    });
    if (
      !count ||
      (bucketType === "value" && count.suppressed) ||
      (bucketType === "suppressed" &&
        (!count.suppressed || count.count !== null)) ||
      (bucketType === "unknown" &&
        count.suppressed !== item.suppressed)
    ) {
      return null;
    }

    parsed.push({
      bucketType,
      label,
      count: count.count,
      suppressed: count.suppressed,
    });
  }
  return parsed;
}

function parseSessionBucket(
  value: unknown,
  kind: "source" | "campaign" | "page",
): JsonRecord | null {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, ["bucketType", "label"]) ||
    !["value", "unknown", "suppressed"].includes(
      value.bucketType as string,
    )
  ) {
    return null;
  }
  const bucketType = value.bucketType as
    | "value"
    | "unknown"
    | "suppressed";
  if (bucketType === "unknown") {
    return kind !== "page" && value.label === null
      ? { bucketType, label: null }
      : null;
  }
  if (bucketType === "suppressed") {
    return value.label === null
      ? { bucketType, label: null }
      : null;
  }
  const label =
    kind === "page"
      ? controlledPageLabel(value.label)
      : controlledSourceLabel(
          value.label,
          kind === "source" ? 64 : 96,
        );
  return label ? { bucketType, label } : null;
}

function parseRecentSessions(value: unknown): JsonRecord[] | null {
  if (!Array.isArray(value) || value.length > maximumRecentSessions) {
    return null;
  }
  const seenLabels = new Set<string>();
  const parsed: JsonRecord[] = [];
  let previousLastSeen = Infinity;
  for (const item of value) {
    if (
      !isRecord(item) ||
      !hasOnlyKeys(item, [
        "sessionLabel",
        "startedAt",
        "lastSeenAt",
        "locale",
        "source",
        "campaign",
        "entryPage",
      ]) ||
      typeof item.sessionLabel !== "string" ||
      !sessionLabelPattern.test(item.sessionLabel) ||
      seenLabels.has(item.sessionLabel) ||
      !locales.includes(item.locale as (typeof locales)[number])
    ) {
      return null;
    }
    const startedAt = dayTimestamp(item.startedAt);
    const lastSeenAt = dayTimestamp(item.lastSeenAt);
    const source = parseSessionBucket(item.source, "source");
    const campaign = parseSessionBucket(item.campaign, "campaign");
    const entryPage = parseSessionBucket(item.entryPage, "page");
    if (
      !startedAt ||
      !lastSeenAt ||
      !source ||
      !campaign ||
      !entryPage ||
      Date.parse(startedAt) > Date.parse(lastSeenAt) ||
      Date.parse(lastSeenAt) > previousLastSeen
    ) {
      return null;
    }
    previousLastSeen = Date.parse(lastSeenAt);
    seenLabels.add(item.sessionLabel);
    parsed.push({
      sessionLabel: item.sessionLabel,
      startedAt,
      lastSeenAt,
      locale: item.locale,
      source,
      campaign,
      entryPage,
    });
  }
  return parsed;
}

function sanitizeAdminTrafficV1Rpc(
  data: unknown,
): JsonRecord | null {
  if (hasForbiddenKey(data)) return null;
  const payload = rpcPayload(data);
  if (
    !payload ||
    !hasOnlyKeys(payload, [
      "contractVersion",
      "generatedAt",
      "timezone",
      "window",
      "totals",
      "dimensions",
      "recentSessions",
      "limits",
      "notice",
    ]) ||
    payload.contractVersion !== adminTrafficContractVersion ||
    payload.timezone !== "Asia/Shanghai" ||
    !isRecord(payload.window) ||
    !hasOnlyKeys(payload.window, [
      "days",
      "startsAt",
      "endsAt",
    ]) ||
    payload.window.days !== 30 ||
    !isRecord(payload.totals) ||
    !hasOnlyKeys(payload.totals, [
      "sessions",
      "pageViews",
      "contactClickAttempts",
      "emailFormStarts",
      "attributedEnquiries",
      "unknownSourceSessions",
    ]) ||
    !isRecord(payload.dimensions) ||
    !hasOnlyKeys(payload.dimensions, [
      "sources",
      "campaigns",
      "pages",
    ]) ||
    !isRecord(payload.limits) ||
    !hasOnlyKeys(payload.limits, [
      "minimumVisibleCount",
      "maximumRecentSessions",
      "recentSessionsMinimumEligibleCount",
      "perSessionEventsIncluded",
      "timeResolution",
      "linkedInquirySessionsExcluded",
      "sessionLabelScope",
    ]) ||
    payload.limits.minimumVisibleCount !== minimumVisibleCount ||
    payload.limits.maximumRecentSessions !== maximumRecentSessions ||
    payload.limits.recentSessionsMinimumEligibleCount !==
      minimumVisibleCount ||
    payload.limits.perSessionEventsIncluded !== false ||
    payload.limits.timeResolution !== "day" ||
    payload.limits.linkedInquirySessionsExcluded !== true ||
    payload.limits.sessionLabelScope !== "current_30_day_window" ||
    !isRecord(payload.notice) ||
    !hasOnlyKeys(payload.notice, ["scope", "clickMeaning"]) ||
    payload.notice.scope !== approvedScopeNotice ||
    payload.notice.clickMeaning !== approvedClickNotice
  ) {
    return null;
  }

  const generatedAt = isoTimestamp(payload.generatedAt);
  const startsAt = isoTimestamp(payload.window.startsAt);
  const endsAt = isoTimestamp(payload.window.endsAt);
  const totalKeys = [
    "sessions",
    "pageViews",
    "contactClickAttempts",
    "emailFormStarts",
    "attributedEnquiries",
    "unknownSourceSessions",
  ] as const;
  const totals = Object.fromEntries(
    totalKeys.map((key) => [
      key,
      parseCountCell(payload.totals[key]),
    ]),
  );
  const sources = parseDimension(
    payload.dimensions.sources,
    "source",
  );
  const campaigns = parseDimension(
    payload.dimensions.campaigns,
    "campaign",
  );
  const pages = parseDimension(payload.dimensions.pages, "page");
  const recentSessions = parseRecentSessions(payload.recentSessions);
  const sessionTotal = totals.sessions;
  const recentSessionsAllowed =
    isRecord(sessionTotal) &&
    sessionTotal.suppressed === false &&
    typeof sessionTotal.count === "number" &&
    sessionTotal.count >= minimumVisibleCount;
  if (
    !generatedAt ||
    !startsAt ||
    !endsAt ||
    Date.parse(startsAt) > Date.parse(endsAt) ||
    Math.abs(Date.parse(generatedAt) - Date.parse(endsAt)) > 1_000 ||
    Object.values(totals).some((value) => value === null) ||
    !sources ||
    !campaigns ||
    !pages ||
    !recentSessions ||
    (!recentSessionsAllowed && recentSessions.length !== 0)
  ) {
    return null;
  }

  return {
    contractVersion: adminTrafficContractVersion,
    generatedAt,
    timezone: "Asia/Shanghai",
    window: {
      days: 30,
      startsAt,
      endsAt,
    },
    totals,
    dimensions: { sources, campaigns, pages },
    recentSessions,
    limits: {
      minimumVisibleCount,
      maximumRecentSessions,
      recentSessionsMinimumEligibleCount: minimumVisibleCount,
      perSessionEventsIncluded: false,
      timeResolution: "day",
      linkedInquirySessionsExcluded: true,
      sessionLabelScope: "current_30_day_window",
    },
    notice: {
      scope: approvedScopeNotice,
      clickMeaning: approvedClickNotice,
    },
  };
}

function parseProductDimension(value: unknown, selection: boolean): JsonRecord[] | null {
  if (!Array.isArray(value) || value.length > 30) return null;
  const seen = new Set<string>();
  const result: JsonRecord[] = [];
  for (const candidate of value) {
    if (!isRecord(candidate) ||
      !hasOnlyKeys(candidate, ["bucketType", "label", "count", "suppressed"])) return null;
    const cell = parseCountCell({ count: candidate.count, suppressed: candidate.suppressed });
    if (!cell) return null;
    if (candidate.bucketType === "suppressed") {
      if (candidate.label !== null || !cell.suppressed || seen.has("suppressed")) return null;
      seen.add("suppressed");
    } else if (candidate.bucketType === "value") {
      if (typeof candidate.label !== "string" || cell.suppressed || seen.has(candidate.label)) return null;
      const parts = candidate.label.split("|");
      if (selection ? !(parts.length === 3 && (parts[2] === "2" || parts[2] === "4") &&
        isTrafficProductSelection(parts[0], parts[1], Number(parts[2]))) : !isTrafficProductSlug(candidate.label)) return null;
      seen.add(candidate.label);
    } else return null;
    result.push({ bucketType: candidate.bucketType, label: candidate.label, ...cell });
  }
  return result;
}

export function sanitizeAdminTrafficRpc(data: unknown): JsonRecord | null {
  const payload = rpcPayload(data);
  if (payload?.contractVersion !== adminTrafficContractVersionV2) {
    return sanitizeAdminTrafficV1Rpc(data);
  }
  if (hasForbiddenKey(data) || !isRecord(payload.totals) || !isRecord(payload.dimensions)) return null;
  const extraTotalKeys = ["productViews", "productSelections", "formSubmitAttempts",
    "formSubmitFailures", "formSubmitUncertain"] as const;
  const totals = { ...payload.totals };
  const extraTotals: JsonRecord = {};
  for (const key of extraTotalKeys) {
    const cell = parseCountCell(totals[key]);
    if (!cell) return null;
    extraTotals[key] = cell;
    delete totals[key];
  }
  const dimensions = { ...payload.dimensions };
  const products = parseProductDimension(dimensions.products, false);
  const productSelections = parseProductDimension(dimensions.productSelections, true);
  if (!products || !productSelections) return null;
  delete dimensions.products;
  delete dimensions.productSelections;
  const base = sanitizeAdminTrafficV1Rpc([{ payload: {
    ...payload, contractVersion: adminTrafficContractVersion, totals, dimensions,
  } }]);
  if (!base) return null;
  return { ...base, contractVersion: adminTrafficContractVersionV2,
    totals: { ...(base.totals as JsonRecord), ...extraTotals },
    dimensions: { ...(base.dimensions as JsonRecord), products, productSelections } };
}
