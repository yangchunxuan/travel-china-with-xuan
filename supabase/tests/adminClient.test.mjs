import assert from "node:assert/strict";
import test from "node:test";
import {
  parseAdminHealth,
  parseAdminInsights,
  validateAdminConfigValues,
} from "../../lib/adminClient.ts";

const metricBuckets = {
  destination_selections: [
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
  ],
  trip_duration: ["1-7", "8-10", "11-14", "15-21", "22-plus"],
  party: [
    "solo",
    "two-adults",
    "family-with-children",
    "older-relatives",
    "multigenerational-family",
    "friends-private-group",
  ],
  pace: ["essentials", "classic", "unhurried"],
  stay_time_reference_match: [
    "needs_prioritization",
    "tighter_than_selected_pace",
    "within_reference_range",
    "room_to_shape",
    "partial_manual_check",
    "manual_only",
  ],
  must_see_selections: [
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
  ],
  reply_channel_choice: ["email", "whatsapp"],
  form_locale: ["en", "zh", "ko"],
};

function configValues(overrides = {}) {
  return {
    NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_URL:
      "https://project.supabase.co",
    NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_PUBLISHABLE_KEY:
      "sb_publishable_test",
    NEXT_PUBLIC_HOMEGROUND_ADMIN_INSIGHTS_URL:
      "https://project.supabase.co/functions/v1/admin-insights",
    NEXT_PUBLIC_HOMEGROUND_ADMIN_HEALTH_URL:
      "https://project.supabase.co/functions/v1/admin-health",
    ...overrides,
  };
}

function suppressedMetric(id, bucketIds) {
  const schema2CompatibilitySets = [
    "2026-07-19.1",
    "2026-07-20.1",
    "2026-07-20.2",
    "2026-07-21.1",
  ].map((formVersion) => ({
    schemaVersion: "2",
    entryPath: "destination_timing",
    formVersion,
    ruleVersion: "2026-07-19.1",
  }));
  const compatibilitySets = [
    "trip_duration",
    "reply_channel_choice",
    "form_locale",
  ].includes(id)
    ? [
        {
          schemaVersion: "1",
          entryPath: "generated_route",
          formVersion: "2026-07-18.1",
          ruleVersion: "2026-07-17.1",
        },
        ...schema2CompatibilitySets,
      ]
    : schema2CompatibilitySets;
  return {
    id,
    multiSelect:
      id === "destination_selections" || id === "must_see_selections",
    denominator: null,
    unknown: null,
    notApplicable: null,
    insufficientSample: true,
    percentagesVisible: false,
    compatibilitySets,
    buckets: bucketIds.map((bucketId) => ({
      id: bucketId,
      count: null,
      percentage: null,
      suppressed: true,
    })),
  };
}

function validInsights() {
  return {
    contractVersion: "homeground-admin-insights.v1",
    generatedAt: "2026-07-21T08:00:00.000Z",
    timezone: "Asia/Shanghai",
    window: {
      days: 90,
      startsAt: "2026-04-23T00:00:00.000+08:00",
      endsAt: "2026-07-21T23:59:59.999+08:00",
      collectingBaseline: true,
    },
    retainedCounts: {
      today: 0,
      past7Days: 0,
      past30Days: 0,
    },
    dataQualityHold: { active: false, message: null },
    metrics: Object.entries(metricBuckets).map(([id, buckets]) =>
      suppressedMetric(id, buckets),
    ),
  };
}

function validHealth() {
  const checkedAt = "2026-07-21T08:00:00.000Z";
  const checks = [
    ["admin_api_reachable", "ok"],
    ["database_summary_readable", "ok"],
    ["production_intake_configuration", "ok"],
    ["production_write_path", "not_verified"],
    ["notification_outbox", "ok"],
    ["retained_submission_activity", "unknown"],
    ["retention_cleanup", "ok"],
    ["backup_restore", "ok"],
    ["isolated_e2e_canary", "ok"],
    ["data_quality_hold", "ok"],
  ].map(([id, status]) => ({
    id,
    label: `Backend label for ${id}`,
    status,
    authority: `Controlled authority for ${id}`,
    checkedAt,
    summary: `Backend summary for ${id}`,
  }));

  return {
    contractVersion: "homeground-admin-health.v1",
    checkedAt,
    environment: "production",
    actionRequired: false,
    headline: "Review unverified or informational checks",
    checks,
    outbox: {
      queued: 0,
      processing: 0,
      providerAccepted: 0,
      failed: 0,
      overdue: 0,
      expired: 0,
      oldestQueuedAgeSeconds: null,
    },
    retainedCounts: {
      past10Minutes: 0,
      past1Hour: 0,
      past24Hours: 0,
    },
    dataQualityHold: { active: false, message: null },
  };
}

test("admin config accepts only exact same-origin function URLs", () => {
  const valid = validateAdminConfigValues(configValues());
  assert.ok(valid.config);
  assert.deepEqual(valid.invalid, []);

  const trailingSlash = validateAdminConfigValues(
    configValues({
      NEXT_PUBLIC_HOMEGROUND_ADMIN_INSIGHTS_URL:
        "https://project.supabase.co/functions/v1/admin-insights/",
    }),
  );
  assert.ok(trailingSlash.config);

  for (const unsafeUrl of [
    "https://attacker.example/functions/v1/admin-insights",
    "https://project.supabase.co/functions/v1/admin-insight",
    "https://project.supabase.co/functions/v1/admin-insights?copy=1",
    "https://project.supabase.co/functions/v1/admin-insights#copy",
  ]) {
    const result = validateAdminConfigValues(
      configValues({
        NEXT_PUBLIC_HOMEGROUND_ADMIN_INSIGHTS_URL: unsafeUrl,
      }),
    );
    assert.equal(result.config, null);
    assert.ok(
      result.invalid.includes(
        "NEXT_PUBLIC_HOMEGROUND_ADMIN_INSIGHTS_URL",
      ),
    );
  }

  for (const unsafeKey of [
    "sb_secret_do-not-publish",
    "service-role-jwt",
    "eyJhbGciOiJIUzI1NiJ9.legacy-service-role",
  ]) {
    const result = validateAdminConfigValues(
      configValues({
        NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_PUBLISHABLE_KEY: unsafeKey,
      }),
    );
    assert.equal(result.config, null);
    assert.ok(
      result.invalid.includes(
        "NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_PUBLISHABLE_KEY",
      ),
    );
  }
});

test("insights parser requires all fixed metrics and suppressed buckets", () => {
  const valid = validInsights();
  assert.equal(parseAdminInsights(valid).timezone, "Asia/Shanghai");

  const missingBucket = structuredClone(valid);
  missingBucket.metrics[0].buckets.pop();
  assert.throws(() => parseAdminInsights(missingBucket));

  const wrongMultiSelect = structuredClone(valid);
  wrongMultiSelect.metrics[1].multiSelect = true;
  assert.throws(() => parseAdminInsights(wrongMultiSelect));

  const cartesianCompatibility = structuredClone(valid);
  cartesianCompatibility.metrics[1].compatibilitySets[0] = {
    schemaVersion: "1",
    entryPath: "generated_route",
    formVersion: "2026-07-18.1",
    ruleVersion: "2026-07-19.1",
  };
  assert.throws(() => parseAdminInsights(cartesianCompatibility));

  const leakedSmallCount = structuredClone(valid);
  leakedSmallCount.metrics[0].buckets[0] = {
    id: "beijing-great-wall",
    count: 1,
    percentage: null,
    suppressed: false,
  };
  assert.throws(() => parseAdminInsights(leakedSmallCount));

  const leakedSmallUnknown = structuredClone(valid);
  leakedSmallUnknown.metrics[0] = {
    ...leakedSmallUnknown.metrics[0],
    denominator: 20,
    unknown: 2,
    notApplicable: 0,
    insufficientSample: false,
    percentagesVisible: true,
    buckets: leakedSmallUnknown.metrics[0].buckets.map((bucket) => ({
      ...bucket,
      count: 0,
      percentage: 0,
      suppressed: false,
    })),
  };
  assert.throws(() => parseAdminInsights(leakedSmallUnknown));

  const visibleExclusive = structuredClone(valid);
  visibleExclusive.metrics[1] = {
    ...visibleExclusive.metrics[1],
    denominator: 20,
    unknown: 0,
    notApplicable: 0,
    insufficientSample: false,
    percentagesVisible: true,
    buckets: visibleExclusive.metrics[1].buckets.map((bucket, index) => ({
      ...bucket,
      count: index === 0 ? 20 : 0,
      percentage: index === 0 ? 100 : 0,
      suppressed: false,
    })),
  };
  assert.doesNotThrow(() => parseAdminInsights(visibleExclusive));

  const missingComplementResidual = structuredClone(visibleExclusive);
  missingComplementResidual.metrics[1].unknown = null;
  missingComplementResidual.metrics[1].buckets[0] = {
    id: "1-7",
    count: null,
    percentage: null,
    suppressed: true,
  };
  missingComplementResidual.metrics[1].buckets[1] = {
    id: "8-10",
    count: 19,
    percentage: 95,
    suppressed: false,
  };
  assert.throws(() => parseAdminInsights(missingComplementResidual));

  const sparseNotApplicable = structuredClone(visibleExclusive);
  sparseNotApplicable.metrics[1].notApplicable = 2;
  assert.throws(() => parseAdminInsights(sparseNotApplicable));

  const countAboveDenominator = structuredClone(visibleExclusive);
  countAboveDenominator.metrics[1].buckets[0].count = 21;
  assert.throws(() => parseAdminInsights(countAboveDenominator));

  const incorrectPercentage = structuredClone(visibleExclusive);
  incorrectPercentage.metrics[1].buckets[0].percentage = 99.9;
  assert.throws(() => parseAdminInsights(incorrectPercentage));

  const wrongContract = structuredClone(valid);
  wrongContract.contractVersion = "homeground-admin-insights.v2";
  assert.throws(() => parseAdminInsights(wrongContract));
});

test("health parser requires the fixed check set and consistent verdict", () => {
  const valid = validHealth();
  const parsed = parseAdminHealth(valid);
  assert.equal(parsed.environment, "production");
  assert.equal(parsed.checks.length, 10);

  const reordered = structuredClone(valid);
  [reordered.checks[0], reordered.checks[1]] = [
    reordered.checks[1],
    reordered.checks[0],
  ];
  assert.throws(() => parseAdminHealth(reordered));

  const inconsistentAction = structuredClone(valid);
  inconsistentAction.actionRequired = true;
  inconsistentAction.headline = "Action required";
  assert.throws(() => parseAdminHealth(inconsistentAction));

  const unapprovedEnvironment = structuredClone(valid);
  unapprovedEnvironment.environment = "preview";
  assert.throws(() => parseAdminHealth(unapprovedEnvironment));
});

test("data-quality hold uses one controlled message and matching status", () => {
  const active = validHealth();
  active.checks[9].status = "action_required";
  active.actionRequired = true;
  active.headline = "Action required";
  active.dataQualityHold = {
    active: true,
    message: "Do not use this window for content or product decisions.",
  };
  assert.equal(parseAdminHealth(active).dataQualityHold.active, true);

  const arbitraryMessage = structuredClone(active);
  arbitraryMessage.dataQualityHold.message = "Something else";
  assert.throws(() => parseAdminHealth(arbitraryMessage));

  const mismatchedCheck = structuredClone(active);
  mismatchedCheck.checks[9].status = "ok";
  assert.throws(() => parseAdminHealth(mismatchedCheck));
});
