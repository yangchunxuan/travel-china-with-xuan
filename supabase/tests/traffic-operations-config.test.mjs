import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const repositoryRoot = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, repositoryRoot), "utf8").then((contents) =>
    contents.replace(/\r\n?/gu, "\n"),
  );
}

function envEntries(contents) {
  const entries = new Map();
  for (const line of contents.split(/\r?\n/u)) {
    if (!line || /^\s*#/u.test(line)) continue;
    const separator = line.indexOf("=");
    if (separator < 1) continue;
    entries.set(line.slice(0, separator), line.slice(separator + 1));
  }
  return entries;
}

function workflowValue(contents, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const match = new RegExp(`^\\s+${escapedName}:\\s*(.+)$`, "mu").exec(
    contents,
  );
  assert.ok(match, `${name} must be present in the workflow build environment`);
  return match[1].trim();
}

test("checked-in analytics examples are inert and traffic secrets are role-distinct", async () => {
  const entries = envEntries(await source(".env.example"));

  assert.equal(entries.get("NEXT_PUBLIC_HOMEGROUND_ANALYTICS_ENABLED"), "false");
  assert.equal(entries.get("NEXT_PUBLIC_HOMEGROUND_GA4_MEASUREMENT_ID"), "");
  assert.equal(entries.get("NEXT_PUBLIC_HOMEGROUND_META_PIXEL_ID"), "");
  assert.equal(entries.get("NEXT_PUBLIC_HOMEGROUND_WEB_EVENTS_URL"), "");
  assert.equal(entries.get("TRAFFIC_EVENTS_ENABLED"), "false");
  assert.deepEqual(
    Object.fromEntries(
      [
        "TRAFFIC_SESSION_START_IP_RATE_LIMIT_10_MINUTES",
        "TRAFFIC_SESSION_START_IP_RATE_LIMIT_24_HOURS",
        "TRAFFIC_SESSION_START_GLOBAL_RATE_LIMIT_10_MINUTES",
        "TRAFFIC_SESSION_START_GLOBAL_RATE_LIMIT_24_HOURS",
      ].map((name) => [name, entries.get(name)]),
    ),
    {
      TRAFFIC_SESSION_START_IP_RATE_LIMIT_10_MINUTES: "30",
      TRAFFIC_SESSION_START_IP_RATE_LIMIT_24_HOURS: "120",
      TRAFFIC_SESSION_START_GLOBAL_RATE_LIMIT_10_MINUTES: "200",
      TRAFFIC_SESSION_START_GLOBAL_RATE_LIMIT_24_HOURS: "2000",
    },
  );
  assert.equal(entries.get("ADMIN_API_ENABLED"), "false");
  assert.equal(entries.get("ADMIN_TRAFFIC_API_ENABLED"), "false");

  const secretNames = [
    "TRAFFIC_SESSION_HASH_SECRET",
    "TRAFFIC_RATE_LIMIT_HASH_SECRET",
    "TRAFFIC_SESSION_CREDENTIAL_SECRET",
    "TRAFFIC_ATTRIBUTION_LINK_SIGNING_SECRET",
  ];
  const exampleValues = secretNames.map((name) => entries.get(name));
  assert.ok(exampleValues.every(Boolean));
  assert.equal(new Set(exampleValues).size, secretNames.length);
  for (const value of exampleValues) {
    assert.match(value, /^<traffic-[a-z0-9-]+-secret-min-32-chars>$/u);
  }
});

test("CI and deploy default the shared gate off and never inject destinations", async () => {
  for (const path of [
    ".github/workflows/ci.yml",
    ".github/workflows/deploy.yml",
  ]) {
    const workflow = await source(path);
    assert.equal(
      workflowValue(workflow, "NEXT_PUBLIC_HOMEGROUND_ANALYTICS_ENABLED"),
      "${{ vars.NEXT_PUBLIC_HOMEGROUND_ANALYTICS_ENABLED || 'false' }}",
      `${path} must fail closed when the repository switch is absent`,
    );
    for (const name of [
      "NEXT_PUBLIC_HOMEGROUND_GA4_MEASUREMENT_ID",
      "NEXT_PUBLIC_HOMEGROUND_META_PIXEL_ID",
      "NEXT_PUBLIC_HOMEGROUND_WEB_EVENTS_URL",
    ]) {
      assert.equal(
        workflowValue(workflow, name),
        `\${{ vars.${name} }}`,
        `${path} must not supply a destination fallback for ${name}`,
      );
    }
    assert.doesNotMatch(
      workflow,
      /NEXT_PUBLIC_HOMEGROUND_(?:GA4_MEASUREMENT_ID|META_PIXEL_ID|WEB_EVENTS_URL):[^\n]*\|\|/u,
    );
    assert.match(
      workflow,
      /- name: Test first-party traffic operations\s+run: npm run test:traffic-ops/u,
    );
  }
});

test("operations runbook matches the migration-owned cron contract", async () => {
  const [runbook, trafficMigration, attributionMigration] = await Promise.all([
    source("docs/first-party-traffic-operations.md"),
    source(
      "supabase/migrations/202607310001_homeground_traffic_attribution.sql",
    ),
    source(
      "supabase/migrations/202607310003_homeground_atomic_inquiry_attribution.sql",
    ),
  ]);

  const expectedJobs = [
    {
      name: "homeground-purge-traffic-rate-limit-buckets",
      schedule: "* * * * *",
      command:
        "select homeground_private.purge_expired_traffic_rate_limit_buckets_v1();",
      migration: trafficMigration,
    },
    {
      name: "homeground-purge-traffic-hourly",
      schedule: "17 * * * *",
      command:
        "select homeground_private.purge_expired_homeground_traffic_v1();",
      migration: trafficMigration,
    },
    {
      name: "homeground-resolve-inquiry-traffic-attribution",
      schedule: "* * * * *",
      command:
        "select homeground_private.process_pending_inquiry_traffic_attribution_v1(100);",
      migration: attributionMigration,
    },
    {
      name: "homeground-purge-inquiry-traffic-attribution-outbox",
      schedule: "10 19 * * *",
      command:
        "select homeground_private.purge_expired_inquiry_traffic_outbox_v1();",
      migration: attributionMigration,
    },
  ];

  for (const job of expectedJobs) {
    const normalizedMigration = job.migration.replace(/\s+/gu, " ");
    assert.ok(
      normalizedMigration.includes(
        `'${job.name}', '${job.schedule}', '${job.command}'`,
      ),
      `${job.name} migration schedule changed without an operations update`,
    );
    assert.ok(runbook.includes(`\`${job.name}\``));
    assert.ok(runbook.includes(`\`${job.schedule}\``));
    assert.ok(runbook.includes(job.command));
  }

  assert.match(
    runbook,
    /select public\.get_homeground_traffic_attribution_health_v1\(\);/u,
  );
  assert.match(runbook, /cron\.job_run_details/u);
  assert.match(runbook, /Do not assume the scheduler uses an operator's local timezone/u);
});

test("runbook fixes bootstrap units and keeps Admin traffic independently dark", async () => {
  const [runbook, config, packageJsonSource] = await Promise.all([
    source("docs/first-party-traffic-operations.md"),
    source("supabase/config.toml"),
    source("package.json"),
  ]);
  const expectedBootstrapLimits = new Map([
    ["TRAFFIC_SESSION_START_IP_RATE_LIMIT_10_MINUTES", "30"],
    ["TRAFFIC_SESSION_START_IP_RATE_LIMIT_24_HOURS", "120"],
    ["TRAFFIC_SESSION_START_GLOBAL_RATE_LIMIT_10_MINUTES", "200"],
    ["TRAFFIC_SESSION_START_GLOBAL_RATE_LIMIT_24_HOURS", "2000"],
  ]);
  for (const [name, value] of expectedBootstrapLimits) {
    assert.match(
      runbook,
      new RegExp("\\| `" + name + "` \\| " + value + " format-valid", "u"),
    );
  }
  assert.match(
    runbook,
    /this counts bootstrap requests, not traffic events/u,
  );

  assert.match(
    config,
    /\[functions\.admin-traffic\][\s\S]{0,260}verify_jwt = true/u,
  );
  assert.match(
    runbook,
    /\| `ADMIN_TRAFFIC_API_ENABLED` \| Independent[\s\S]{0,260}`ADMIN_API_ENABLED`/u,
  );
  assert.match(runbook, /allow-listed aal2 administrator[\s\S]{0,100}`503 traffic_disabled`/u);
  assert.match(
    runbook,
    /This release does not authorize[\s\S]{0,100}independent switch to true/u,
  );
  assert.match(
    runbook,
    /Exact Origin supplies a browser CORS boundary only;[\s\S]{0,120}not authentication/u,
  );

  const adminDeployBlocks = [...runbook.matchAll(/```bash\s+([\s\S]*?)```/gu)]
    .map((match) => match[1])
    .filter((block) => block.includes("functions deploy admin-traffic"));
  assert.equal(adminDeployBlocks.length, 2);
  for (const block of adminDeployBlocks) {
    assert.doesNotMatch(block, /--no-verify-jwt/u);
    assert.match(block, /--project-ref <(?:staging|production)-project-ref>/u);
  }

  const rollbackSection = runbook.slice(
    runbook.indexOf("## Rollback and emergency pause"),
    runbook.indexOf("## Secret rotation"),
  );
  const disableIndex = rollbackSection.indexOf(
    "`ADMIN_TRAFFIC_API_ENABLED=false`",
  );
  const rollbackIndex = rollbackSection.indexOf(
    "Redeploy the last known-good\n   `admin-traffic` revision",
  );
  assert.ok(disableIndex >= 0 && rollbackIndex > disableIndex);

  const packageJson = JSON.parse(packageJsonSource);
  assert.equal(
    packageJson.scripts["test:traffic-ops"],
    "node --experimental-strip-types --test supabase/tests/traffic-edge-runtime.test.mjs supabase/tests/traffic-operations-config.test.mjs supabase/tests/traffic-operations-hardening.test.mjs",
  );

  const staging = runbook.slice(
    runbook.indexOf("## Staging deployment"),
    runbook.indexOf("## Cron inventory and verification"),
  );
  const migrationIndex = staging.indexOf("supabase db push");
  const rpcReadbackIndex = staging.indexOf(
    "consume_homeground_traffic_session_start_rate_limit_v1",
  );
  const collectorDeployIndex = staging.indexOf(
    "supabase functions deploy v1-traffic-events",
  );
  const collectorEnableIndex = staging.indexOf(
    "Set only the server switch to exact `true`",
  );
  assert.ok(
    migrationIndex >= 0 &&
      rpcReadbackIndex > migrationIndex &&
      collectorDeployIndex > rpcReadbackIndex &&
      collectorEnableIndex > collectorDeployIndex,
  );
  assert.match(
    runbook,
    /`202608230001_homeground_traffic_operations_hardening\.sql`[\s\S]+`503 persistence_unavailable`/u,
  );
});

test("runbook makes pause, rollback and key rotation fail closed", async () => {
  const runbook = await source("docs/first-party-traffic-operations.md");

  assert.match(
    runbook,
    /Set `TRAFFIC_EVENTS_ENABLED=false` before any collector Edge rollback[\s\S]+`503 collection_paused`/u,
  );
  assert.match(
    runbook,
    /do not run `db reset`, delete tables, truncate[\s\S]+preserve the database/u,
  );
  assert.match(
    runbook,
    /There is no dual-key overlap or hash-key-version migration/u,
  );
  assert.match(
    runbook,
    /`TRAFFIC_SESSION_HASH_SECRET` must be the same new value for[\s\S]+`v1-traffic-events` and `v1-inquiries`/u,
  );
  for (const consequence of [
    "association continuity",
    "resetting counters",
    "outstanding credentials",
    "Previously signed campaign links",
  ]) {
    assert.ok(runbook.includes(consequence));
  }
});
