import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  sanitizeAdminTrafficRpc,
} from "../functions/_shared/admin-traffic-contracts.ts";
import {
  parseAdminTraffic,
  validateAdminConfigValues,
} from "../../lib/adminClient.ts";

const trafficMigrationPath =
  "supabase/migrations/202607310002_homeground_admin_traffic_read_model.sql";
const trafficWriteMigrationPath =
  "supabase/migrations/202607310001_homeground_traffic_attribution.sql";
const trafficFunctionPath =
  "supabase/functions/admin-traffic/index.ts";
const adminPagePath =
  "components/admin/AdminInsightsPage.tsx";
const privacyCopyPath = "lib/homegroundPrivacyI18n.ts";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

function visibleCount(count = 5) {
  return { count, suppressed: false };
}

function validTraffic() {
  return {
    contractVersion: "homeground-admin-traffic.v1",
    generatedAt: "2026-07-31T08:00:00.000Z",
    timezone: "Asia/Shanghai",
    window: {
      days: 30,
      startsAt: "2026-07-01T08:00:00.000Z",
      endsAt: "2026-07-31T08:00:00.000Z",
    },
    totals: {
      sessions: visibleCount(10),
      pageViews: visibleCount(20),
      contactClickAttempts: visibleCount(5),
      emailFormStarts: visibleCount(5),
      attributedEnquiries: visibleCount(5),
      unknownSourceSessions: visibleCount(5),
    },
    dimensions: {
      sources: [
        {
          bucketType: "unknown",
          label: null,
          ...visibleCount(5),
        },
        {
          bucketType: "value",
          label: "facebook",
          ...visibleCount(5),
        },
      ],
      campaigns: [
        {
          bucketType: "unknown",
          label: null,
          ...visibleCount(5),
        },
      ],
      pages: [
        {
          bucketType: "value",
          label: "/",
          ...visibleCount(10),
        },
        {
          bucketType: "value",
          label: "/guides/",
          ...visibleCount(10),
        },
      ],
    },
    recentSessions: [
      {
        sessionLabel: "HG-A1B2C3D4",
        startedAt: "2026-07-31T00:00:00.000Z",
        lastSeenAt: "2026-07-31T00:00:00.000Z",
        locale: "en",
        source: { bucketType: "value", label: "facebook" },
        campaign: { bucketType: "unknown", label: null },
        entryPage: { bucketType: "value", label: "/" },
      },
    ],
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
      scope:
        "Consented anonymous sessions; not people, customers, or market share.",
      clickMeaning:
        "A contact-channel click does not prove that a message was sent.",
    },
  };
}

test("traffic sanitizer returns only the bounded anonymous read model", () => {
  const sanitized = sanitizeAdminTrafficRpc([
    { payload: validTraffic() },
  ]);
  assert.ok(sanitized);
  assert.equal(sanitized.recentSessions.length, 1);
  assert.equal(
    sanitized.notice.clickMeaning,
    "A contact-channel click does not prove that a message was sent.",
  );

  const reservedWordsAsRealValues = validTraffic();
  reservedWordsAsRealValues.dimensions.sources.push(
    {
      bucketType: "value",
      label: "unknown",
      ...visibleCount(5),
    },
    {
      bucketType: "value",
      label: "low_volume",
      ...visibleCount(5),
    },
  );
  assert.ok(
    sanitizeAdminTrafficRpc([
      { payload: reservedWordsAsRealValues },
    ]),
  );
  assert.doesNotThrow(() =>
    parseAdminTraffic(reservedWordsAsRealValues),
  );

  const leakedHash = validTraffic();
  leakedHash.recentSessions[0].sessionHash = "a".repeat(64);
  assert.equal(
    sanitizeAdminTrafficRpc([{ payload: leakedHash }]),
    null,
  );

  const leakedSparseLabel = validTraffic();
  leakedSparseLabel.dimensions.sources.push({
    bucketType: "value",
    label: "private-person-name",
    count: null,
    suppressed: true,
  });
  assert.equal(
    sanitizeAdminTrafficRpc([{ payload: leakedSparseLabel }]),
    null,
  );

  const overPreciseTime = validTraffic();
  overPreciseTime.recentSessions[0].lastSeenAt =
    "2026-07-31T07:00:00.000Z";
  assert.equal(
    sanitizeAdminTrafficRpc([{ payload: overPreciseTime }]),
    null,
  );
});

test("Admin client rejects identifiers, small exact counts and cross-bucket labels", () => {
  const valid = validTraffic();
  assert.equal(parseAdminTraffic(valid).totals.sessions.count, 10);

  const smallExactCount = structuredClone(valid);
  smallExactCount.totals.contactClickAttempts = visibleCount(1);
  assert.throws(() => parseAdminTraffic(smallExactCount));

  const missingVisibleSource = structuredClone(valid);
  missingVisibleSource.recentSessions[0].source = {
    bucketType: "value",
    label: "reddit",
  };
  assert.throws(() => parseAdminTraffic(missingVisibleSource));

  const sparseWindowWithTimeline = structuredClone(valid);
  sparseWindowWithTimeline.totals.sessions = {
    count: null,
    suppressed: true,
  };
  assert.equal(
    sanitizeAdminTrafficRpc([
      { payload: sparseWindowWithTimeline },
    ]),
    null,
  );
  assert.throws(() => parseAdminTraffic(sparseWindowWithTimeline));

  const leakedIdentifier = structuredClone(valid);
  leakedIdentifier.sessionHash = "a".repeat(64);
  assert.throws(() => parseAdminTraffic(leakedIdentifier));
});

test("Admin traffic URL is derived from the already approved Supabase origin", () => {
  const result = validateAdminConfigValues({
    NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_URL:
      "https://project.supabase.co",
    NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_PUBLISHABLE_KEY:
      "sb_publishable_test",
    NEXT_PUBLIC_HOMEGROUND_ADMIN_INSIGHTS_URL:
      "https://project.supabase.co/functions/v1/admin-insights",
    NEXT_PUBLIC_HOMEGROUND_ADMIN_HEALTH_URL:
      "https://project.supabase.co/functions/v1/admin-health",
  });
  assert.equal(
    result.config?.trafficUrl,
    "https://project.supabase.co/functions/v1/admin-traffic",
  );
});

test("traffic RPC is read-only, k-suppressed and excludes linked inquiry sessions", async () => {
  const sql = await source(trafficMigrationPath);
  const edge = await source(trafficFunctionPath);

  assert.match(sql, /get_homeground_admin_traffic/);
  assert.match(sql, /interval '30 days'/);
  assert.match(sql, /observed_count >= 5/);
  assert.match(sql, /date_trunc\([\s\S]*?'day'/);
  assert.match(sql, /select sessions from total_counts\) >= 5/);
  assert.match(
    sql,
    /select count\(\*\)[\s\S]*eligible_session[\s\S]*>= 5/,
  );
  assert.match(sql, /limit 12/);
  assert.match(sql, /extensions\.digest/);
  assert.match(sql, /window_started_at::date::text/);
  assert.match(
    sql,
    /not exists[\s\S]*inquiry_traffic_attribution/,
  );
  assert.match(sql, /'linkedInquirySessionsExcluded', true/);
  assert.match(sql, /'perSessionEventsIncluded', false/);
  assert.match(sql, /'timeResolution', 'day'/);
  assert.doesNotMatch(sql, /'timeline'|'actionCode'/);
  assert.match(sql, /'sessionLabelScope', 'current_30_day_window'/);
  assert.match(sql, /'attributedEnquiries'/);
  assert.match(sql, /'unknownSourceSessions'/);
  assert.doesNotMatch(sql, /'sessionHash'|'eventId'|'inquiryId'/);
  assert.match(
    sql,
    /grant execute on function public\.get_homeground_admin_traffic\(\)[\s\S]*to service_role/,
  );
  assert.doesNotMatch(
    sql,
    /grant execute on function public\.get_homeground_admin_traffic\(\)[\s\S]*to authenticated/,
  );

  assert.match(edge, /"get_homeground_admin_traffic"/);
  assert.match(edge, /"admin-traffic"/);
  assert.match(edge, /invalid_traffic_contract/);
  assert.match(edge, /admin_audit_unavailable/);
});

test("raw traffic expires on the documented 30-day window with hourly cleanup", async () => {
  const sql = await source(trafficWriteMigrationPath);
  const privacy = await source(privacyCopyPath);

  assert.match(sql, /interval '30 days'/);
  assert.match(sql, /'homeground-purge-traffic-hourly'/);
  assert.match(sql, /'17 \* \* \* \*'/);
  assert.match(privacy, /30-day rolling window/);
  assert.match(privacy, /30 天滚动窗口/);
  assert.match(privacy, /매시간 실행되는 정리 작업/);
});

test("traffic UI states the non-identity and click-attempt semantics", async () => {
  const page = await source(adminPagePath);
  for (const copy of [
    "网站行为 · 过去 30 天",
    "这里显示会话，不是“某个人”的身份",
    "点击联系按钮只表示打开了联系入口，不代表消息已经发出",
    "联系入口点击尝试",
    "已关联询盘",
    "Unknown 来源会话",
    "不能跨窗口或与其他数据源拼接",
    "未关联询盘",
    "日期只精确到天，不展示逐会话点击或事件时间线",
  ]) {
    assert.match(page, new RegExp(copy));
  }
  assert.doesNotMatch(page, /导出网站行为|下载匿名会话/);
});
