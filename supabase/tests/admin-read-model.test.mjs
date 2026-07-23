import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  parseAdminHealthRpc,
  sanitizeAdminInsightsRpc,
} from "../functions/_shared/admin-contracts.ts";

const v4MigrationPath =
  "supabase/migrations/202607210001_homeground_destination_intake_v4.sql";
const operationsMigrationPath =
  "supabase/migrations/202607210002_homeground_retention_operations.sql";
const readModelMigrationPath =
  "supabase/migrations/202607210003_homeground_admin_read_models.sql";
const adminAuthPath =
  "supabase/functions/_shared/admin-auth.ts";
const adminContractsPath =
  "supabase/functions/_shared/admin-contracts.ts";
const adminAuditPath =
  "supabase/functions/_shared/admin-audit.ts";
const insightsFunctionPath =
  "supabase/functions/admin-insights/index.ts";
const healthFunctionPath =
  "supabase/functions/admin-health/index.ts";
const inquiryFunctionPath =
  "supabase/functions/v1-inquiries/index.ts";
const configPath = "supabase/config.toml";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

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
];
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
];
const bothCompatibilitySets = [
  {
    schemaVersion: "1",
    entryPath: "generated_route",
    formVersion: "2026-07-18.1",
    ruleVersion: "2026-07-17.1",
  },
  ...schema2CompatibilitySets,
];

function suppressedMetric(
  id,
  multiSelect,
  bucketIds,
  compatibilitySets,
) {
  return {
    id,
    label: id,
    multiSelect,
    denominator: null,
    unknown: null,
    notApplicable: null,
    compatibilitySets,
    insufficientSample: true,
    percentagesVisible: false,
    buckets: bucketIds.map((bucketId) => ({
      id: bucketId,
      count: null,
      percentage: null,
      suppressed: true,
    })),
  };
}

function validInsightsRpc() {
  return [{
    payload: {
      contractVersion: "homeground-admin-insights.v1",
      generatedAt: "2026-07-21T08:00:00.000Z",
      timezone: "Asia/Shanghai",
      window: {
        days: 90,
        startsAt: "2026-04-22T08:00:00.000Z",
        endsAt: "2026-07-21T08:00:00.000Z",
        collectingBaseline: true,
      },
      retainedCounts: {
        today: 0,
        past7Days: 0,
        past30Days: 0,
      },
      dataQualityHold: { active: false, message: null },
      metrics: [
        suppressedMetric(
          "destination_selections",
          true,
          destinationIds,
          schema2CompatibilitySets,
        ),
        suppressedMetric(
          "trip_duration",
          false,
          ["1-7", "8-10", "11-14", "15-21", "22-plus"],
          bothCompatibilitySets,
        ),
        suppressedMetric(
          "party",
          false,
          [
            "solo",
            "two-adults",
            "family-with-children",
            "older-relatives",
            "multigenerational-family",
            "friends-private-group",
          ],
          schema2CompatibilitySets,
        ),
        suppressedMetric(
          "pace",
          false,
          ["essentials", "classic", "unhurried"],
          schema2CompatibilitySets,
        ),
        suppressedMetric(
          "stay_time_reference_match",
          false,
          [
            "needs_prioritization",
            "tighter_than_selected_pace",
            "within_reference_range",
            "room_to_shape",
            "partial_manual_check",
            "manual_only",
          ],
          schema2CompatibilitySets,
        ),
        suppressedMetric(
          "must_see_selections",
          true,
          destinationIds,
          schema2CompatibilitySets,
        ),
        suppressedMetric(
          "reply_channel_choice",
          false,
          ["email", "whatsapp"],
          bothCompatibilitySets,
        ),
        suppressedMetric(
          "form_locale",
          false,
          ["en", "zh", "ko"],
          bothCompatibilitySets,
        ),
      ],
      customerRecords: [{
        id: "must-never-cross-the-contract-boundary",
      }],
    },
  }];
}

function validHealthRpc() {
  return [{
    payload: {
      contractVersion: "homeground-admin-health.v1",
      checkedAt: "2026-07-21T08:00:00.000Z",
      database: {
        summaryReadable: true,
        contractVersion: "homeground-admin-health.v1",
      },
      outbox: {
        queued: 0,
        processing: 0,
        providerAccepted: 0,
        failed: 0,
        overdue: 0,
        expired: 0,
        oldestQueuedAgeSeconds: null,
        retryDeadlineHours: 72,
      },
      retainedCounts: {
        past10Minutes: 0,
        past1Hour: 0,
        past24Hours: 0,
      },
      lastRetainedSubmissionAt: null,
      cleanup: {
        status: "never_run",
        startedAt: null,
        finishedAt: null,
        errorCode: null,
        inquiriesDeleted: 0,
        outboxDeleted: 0,
        retriesExpired: 0,
        expiredAdminAccessLogCount: 0,
        pendingTombstoneReplication: 0,
      },
      backupRestore: {
        status: "never_run",
        checkedAt: null,
        environment: null,
        artifactVersion: null,
      },
      isolatedCanary: {
        status: "never_run",
        checkedAt: null,
        environment: null,
        artifactVersion: null,
      },
      dataQualityHold: {
        active: false,
        incidentTypes: [],
        message: null,
      },
      versions: {
        currentForm: "2026-07-21.1",
        currentPrivacy: "2026-07-21.1",
        destinationRule: "2026-07-19.1",
        legacyRouteRule: "2026-07-17.1",
      },
      unexpectedInternalDetails: {
        rows: ["must-never-cross-the-contract-boundary"],
      },
    },
  }];
}

test("current V4 persistence fixes submit surfaces and stores no attribution", async () => {
  const sql = await source(v4MigrationPath);
  assert.match(
    sql,
    /create or replace function public\.create_homeground_destination_inquiry_v4/,
  );
  assert.match(sql, /p_form_version <> '2026-07-21\.1'/);
  assert.match(sql, /p_privacy_notice_version <> '2026-07-21\.1'/);
  assert.match(
    sql,
    /p_landing_path is distinct from\s*\(\s*case p_locale[\s\S]*when 'en' then '\/'[\s\S]*when 'zh' then '\/zh\/'[\s\S]*when 'ko' then '\/ko\/'/,
  );
  assert.match(
    sql,
    /public\.create_homeground_destination_inquiry_v3\(/,
  );
  assert.match(sql, /attribution_json = '\{\}'::jsonb/);
  assert.match(
    sql,
    /grant execute on function public\.create_homeground_destination_inquiry_v4[\s\S]*to service_role/,
  );
  assert.doesNotMatch(sql, /grant execute[\s\S]*\bto anon\b/);
});

test("public intake dispatches four destination generations and omits internal ID", async () => {
  const code = await source(inquiryFunctionPath);
  for (const token of [
    "budgetDestinationInquiryFormVersion",
    "currentDestinationInquiryFormVersion",
    "previousDestinationInquiryFormVersion",
    "legacyDestinationInquiryFormVersion",
    "create_homeground_destination_inquiry_v4",
    "create_homeground_destination_inquiry_v3",
    "create_homeground_destination_inquiry_v2",
    "create_homeground_destination_inquiry",
  ]) {
    assert.match(code, new RegExp(token));
  }
  const publicSuccess = code.slice(
    code.lastIndexOf("return jsonResponse("),
    code.lastIndexOf("Deno.serve"),
  );
  assert.match(publicSuccess, /publicReference/);
  assert.match(publicSuccess, /duplicate/);
  assert.doesNotMatch(publicSuccess, /\binquiryId\b/);
});

test("retention operations have fixed TTLs, deadline enforcement, and replay ledgers", async () => {
  const sql = await source(operationsMigrationPath);
  for (const table of [
    "retention_cleanup_runs",
    "operational_check_runs",
    "data_quality_incidents",
  ]) {
    assert.match(
      sql,
      new RegExp(`homeground_private\\.${table}`),
    );
  }
  assert.match(sql, /homeground_recovery\.deletion_tombstones/);
  assert.match(sql, /retry_deadline_at = created_at \+ interval '72 hours'/);
  assert.match(sql, /retry_deadline_exceeded/);
  assert.match(
    sql,
    /when query_canceled then[\s\S]*error_code = 'statement_timeout'/,
  );
  assert.doesNotMatch(
    sql,
    /when others then[\s\S]*when '57014' then 'statement_timeout'/,
  );
  assert.match(sql, /interval '12 months'/);
  assert.match(sql, /interval '60 days'/);
  assert.match(sql, /interval '24 hours'/);
  assert.match(sql, /homeground-retention-cleanup-daily/);
  assert.match(sql, /'0 19 \* \* \*'/);
  assert.match(
    sql,
    /replay_homeground_deletion_tombstones/,
  );
  assert.match(sql, /replicated_at is not null/);
  assert.doesNotMatch(sql, /tombstones_created_count/);
});

test("aggregate RPC uses an explicit compatibility registry and server suppression", async () => {
  const sql = await source(readModelMigrationPath);
  assert.match(sql, /admin_metric_compatibility/);
  assert.match(sql, /'compatibilitySets'/);
  assert.doesNotMatch(sql, /'schemaVersions'|'entryPaths'|'formVersions'|'ruleVersions'/);
  for (const version of [
    "2026-07-18.1",
    "2026-07-19.1",
    "2026-07-20.1",
    "2026-07-20.2",
    "2026-07-21.1",
  ]) {
    assert.match(sql, new RegExp(version.replaceAll(".", "\\.")));
  }
  assert.match(sql, /p_denominator < 5/);
  assert.match(sql, /p_denominator >= 20/);
  assert.match(sql, /sparse_count >= 1/);
  assert.match(sql, /p_not_applicable between 1 and 4/);
  assert.match(
    sql,
    /if p_value is null or jsonb_typeof\(p_value\) <> 'array' then[\s\S]*return false/,
  );
  assert.match(
    sql,
    /jsonb_typeof\(answers_json -> 'totalNights'\) = 'number'/,
  );
  assert.match(
    sql,
    /is_homeground_controlled_string_array_subset\([\s\S]*answers_json -> 'mustSeeIds',[\s\S]*answers_json -> 'destinationIds'/,
  );
  assert.match(
    sql,
    /route_snapshot_json ->> 'totalNights'[\s\S]*= answers_json ->> 'totalNights'/,
  );
  assert.match(sql, /'startsAt', coverage_started_at/);
  assert.equal(
    (sql.match(
      /where inquiry\.created_at >= window_started_at\s+and inquiry\.created_at <= generated_at/g,
    ) ?? []).length,
    10,
  );
  assert.match(
    sql,
    /future_inquiry\.created_at > generated_at/,
  );
  assert.match(
    sql,
    /future_inquiry\.created_at > checked_at/,
  );
  assert.match(sql, /there is no safe[\s\S]*Suppress the entire metric/);
  assert.match(sql, /bucket_suppressed\[complement_index\] := true/);
  assert.match(sql, /when insufficient_sample then null/);
  assert.match(sql, /interval '90 days'/);
  assert.match(sql, /at time zone 'Asia\/Shanghai'/);
  assert.match(
    sql,
    /grant execute on function public\.get_homeground_admin_insights\(\)[\s\S]*to service_role/,
  );
  assert.doesNotMatch(
    sql,
    /grant execute on function public\.get_homeground_admin_insights\(\)[\s\S]*\bto authenticated\b/,
  );
});

test("Admin access outcomes use a fixed 30-day body-free audit ledger", async () => {
  const sql = await source(readModelMigrationPath);
  const audit = await source(adminAuditPath);
  const insights = await source(insightsFunctionPath);
  const health = await source(healthFunctionPath);

  assert.match(sql, /homeground_private\.admin_access_log/);
  assert.match(sql, /admin_user_id uuid not null/);
  assert.match(
    sql,
    /endpoint in \('admin-insights', 'admin-health'\)/,
  );
  assert.match(
    sql,
    /result in \('success', 'summary_unavailable', 'contract_rejected'\)/,
  );
  assert.match(sql, /interval '30 days'/);
  assert.match(sql, /expiredAdminAccessLogCount/);
  assert.match(sql, /homeground-admin-access-log-prune-daily/);
  assert.match(
    sql,
    /grant execute on function public\.record_homeground_admin_access[\s\S]*to service_role/,
  );
  assert.match(
    sql,
    /grant execute on function public\.prune_homeground_admin_access_log\(\)[\s\S]*to service_role/,
  );
  assert.doesNotMatch(
    sql,
    /grant execute on function public\.record_homeground_admin_access[\s\S]*\bto authenticated\b/,
  );
  assert.match(audit, /record_homeground_admin_access/);
  assert.match(
    audit,
    /auditResult\.ok && auditResult\.data === true/,
  );
  assert.match(audit, /Promise<boolean>/);
  assert.match(audit, /return auditResult\.ok/);
  for (const code of [insights, health]) {
    for (const result of [
      '"success"',
      '"summary_unavailable"',
      '"contract_rejected"',
    ]) {
      assert.match(code, new RegExp(result));
    }
    assert.match(code, /admin_audit_unavailable/);
    assert.match(
      code,
      /result === "success" && !auditRecorded/,
    );
  }
  assert.doesNotMatch(
    `${sql}\n${audit}`,
    /request_body|response_body|contact_email|contact_phone|user_agent|ip_address/,
  );
});

test("Admin authorization is exact-Origin, MFA, UUID-allowlist, and Auth-user verified", async () => {
  const auth = await source(adminAuthPath);
  const config = await source(configPath);
  for (const value of [
    "ADMIN_API_ENABLED",
    "ADMIN_ALLOWED_ORIGIN",
    "ADMIN_ALLOWED_USER_IDS",
    "SUPABASE_PUBLISHABLE_KEYS",
    "SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_ANON_KEY",
    "/auth/v1/user",
    "claims.sub",
    "claims.iss",
    "claims.aud",
    "claims.exp",
    "claims.aal",
    '"aal2"',
  ]) {
    assert.match(auth, new RegExp(value.replaceAll("/", "\\/")));
  }
  assert.match(auth, /origin !== allowedOrigin/);
  assert.doesNotMatch(auth, /Access-Control-Allow-Origin["']?\s*:\s*["']\*/);
  assert.match(auth, /authorization, apikey, x-client-info/);
  assert.match(auth, /request\.method === "OPTIONS"/);
  assert.ok(
    auth.indexOf('request.method === "OPTIONS"') <
      auth.indexOf('booleanEnv("ADMIN_API_ENABLED"'),
  );
  assert.ok(
    auth.indexOf('booleanEnv("ADMIN_API_ENABLED"') <
      auth.indexOf("verifyAdmin(request)"),
  );
  assert.match(auth, /Cache-Control": "no-store"/);
  assert.match(auth, /Pragma: "no-cache"/);
  assert.match(
    config,
    /\[functions\.admin-insights\][\s\S]*verify_jwt = true/,
  );
  assert.match(
    config,
    /\[functions\.admin-health\][\s\S]*verify_jwt = true/,
  );
});

test("Admin Edge functions expose only two fixed read RPCs", async () => {
  const insights = await source(insightsFunctionPath);
  const health = await source(healthFunctionPath);
  const contracts = await source(adminContractsPath);
  assert.match(insights, /"get_homeground_admin_insights"/);
  assert.match(health, /"get_homeground_admin_health"/);
  assert.doesNotMatch(
    `${insights}\n${health}`,
    /create_|update_|delete_|list_|detail_|search_|export_/,
  );
  assert.doesNotMatch(
    `${insights}\n${health}\n${contracts}`,
    /console\.(?:log|info|warn|error)/,
  );
});

test("insight sanitizer rebuilds the allowlisted contract and rejects suppression leaks", () => {
  const raw = validInsightsRpc();
  const sanitized = sanitizeAdminInsightsRpc(raw);
  assert.ok(sanitized);
  assert.equal("customerRecords" in sanitized, false);
  assert.equal(sanitized.metrics.length, 8);
  assert.deepEqual(sanitized.retainedCounts, {
    today: 0,
    past7Days: 0,
    past30Days: 0,
  });

  const inventedCompatibilityPair = structuredClone(raw);
  inventedCompatibilityPair[0].payload.metrics[1]
    .compatibilitySets[0] = {
      schemaVersion: "1",
      entryPath: "destination_timing",
      formVersion: "2026-07-21.1",
      ruleVersion: "2026-07-17.1",
    };
  assert.equal(
    sanitizeAdminInsightsRpc(inventedCompatibilityPair),
    null,
  );

  const hiddenWithPercentages = structuredClone(raw);
  hiddenWithPercentages[0].payload.metrics[0].percentagesVisible = true;
  assert.equal(sanitizeAdminInsightsRpc(hiddenWithPercentages), null);

  const leaking = structuredClone(raw);
  leaking[0].payload.metrics[0].buckets[0] = {
    id: "beijing-great-wall",
    count: 1,
    percentage: null,
    suppressed: true,
  };
  assert.equal(sanitizeAdminInsightsRpc(leaking), null);

  const visibleSparseBucket = structuredClone(raw);
  visibleSparseBucket[0].payload.metrics[2] = {
    ...visibleSparseBucket[0].payload.metrics[2],
    denominator: 20,
    unknown: 0,
    notApplicable: 0,
    insufficientSample: false,
    percentagesVisible: true,
    buckets: [
      {
        id: "solo",
        count: 1,
        percentage: 5,
        suppressed: false,
      },
      {
        id: "two-adults",
        count: 19,
        percentage: 95,
        suppressed: false,
      },
      ...[
        "family-with-children",
        "older-relatives",
        "multigenerational-family",
        "friends-private-group",
      ].map((id) => ({
        id,
        count: 0,
        percentage: 0,
        suppressed: false,
      })),
    ],
  };
  assert.equal(sanitizeAdminInsightsRpc(visibleSparseBucket), null);

  const visibleSparseUnknown = structuredClone(raw);
  visibleSparseUnknown[0].payload.metrics[2] = {
    ...visibleSparseUnknown[0].payload.metrics[2],
    denominator: 20,
    unknown: 4,
    notApplicable: 0,
    insufficientSample: false,
    percentagesVisible: true,
    buckets: [
      {
        id: "solo",
        count: 16,
        percentage: 80,
        suppressed: false,
      },
      ...[
        "two-adults",
        "family-with-children",
        "older-relatives",
        "multigenerational-family",
        "friends-private-group",
      ].map((id) => ({
        id,
        count: 0,
        percentage: 0,
        suppressed: false,
      })),
    ],
  };
  assert.equal(sanitizeAdminInsightsRpc(visibleSparseUnknown), null);

  const missingComplement = validInsightsRpc();
  missingComplement[0].payload.metrics[1] = {
    ...missingComplement[0].payload.metrics[1],
    denominator: 10,
    unknown: 0,
    notApplicable: 0,
    insufficientSample: false,
    percentagesVisible: false,
    buckets: [
      {
        id: "1-7",
        count: null,
        percentage: null,
        suppressed: true,
      },
      {
        id: "8-10",
        count: 10,
        percentage: null,
        suppressed: false,
      },
      ...["11-14", "15-21", "22-plus"].map((id) => ({
        id,
        count: 0,
        percentage: null,
        suppressed: false,
      })),
    ],
  };
  assert.equal(sanitizeAdminInsightsRpc(missingComplement), null);

  const safeComplement = validInsightsRpc();
  safeComplement[0].payload.metrics[2] = {
    ...safeComplement[0].payload.metrics[2],
    denominator: 20,
    unknown: 0,
    notApplicable: 0,
    insufficientSample: false,
    percentagesVisible: true,
    buckets: [
      {
        id: "solo",
        count: null,
        percentage: null,
        suppressed: true,
      },
      {
        id: "two-adults",
        count: 5,
        percentage: 25,
        suppressed: false,
      },
      {
        id: "family-with-children",
        count: null,
        percentage: null,
        suppressed: true,
      },
      ...[
        "older-relatives",
        "multigenerational-family",
        "friends-private-group",
      ].map((id) => ({
        id,
        count: 0,
        percentage: 0,
        suppressed: false,
      })),
    ],
  };
  assert.ok(sanitizeAdminInsightsRpc(safeComplement));
});

test("health parser ignores non-contract data and preserves provider-accepted semantics", () => {
  const sanitized = parseAdminHealthRpc(validHealthRpc());
  assert.ok(sanitized);
  assert.equal(sanitized.outbox.providerAccepted, 0);
  assert.equal("unexpectedInternalDetails" in sanitized, false);
  assert.equal(sanitized.cleanup.status, "never_run");
  assert.equal(sanitized.cleanup.expiredAdminAccessLogCount, 0);
  assert.equal(sanitized.dataQualityHold.active, false);
});
