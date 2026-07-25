import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  allowedInquiryEntryPaths,
} from "../../lib/inquiryEntryPaths.ts";

const edgePath = "supabase/functions/v1-inquiries/index.ts";
const adminContractsPath =
  "supabase/functions/_shared/admin-contracts.ts";
const analyticsPath = "lib/analytics.ts";
const adminClientPath = "lib/adminClient.ts";
const versionsPath = "lib/inquiryVersions.ts";
const v4MigrationPath =
  "supabase/migrations/202607210001_homeground_destination_intake_v4.sql";
const attributionMigrationPath =
  "supabase/migrations/202607250001_homeground_guide_attribution.sql";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

function quotedListBetween(contents, startMarker, endMarker = "];") {
  const start = contents.indexOf(startMarker);
  assert.ok(start >= 0, `missing list marker: ${startMarker}`);
  const end = contents.indexOf(endMarker, start);
  assert.ok(end > start, `missing list terminator after: ${startMarker}`);
  return [
    ...contents
      .slice(start, end)
      .matchAll(/["']([a-z0-9]+(?:-[a-z0-9]+)*)["']/gu),
  ].map((match) => match[1]);
}

function allQuotedListsBetween(
  contents,
  startMarker,
  endMarker = "];",
) {
  const lists = [];
  let cursor = 0;
  while (true) {
    const relativeStart = contents.indexOf(startMarker, cursor);
    if (relativeStart < 0) return lists;
    const end = contents.indexOf(endMarker, relativeStart);
    assert.ok(end > relativeStart, `missing list terminator after: ${startMarker}`);
    lists.push([
      ...contents
        .slice(relativeStart, end)
        .matchAll(/["']([a-z0-9]+(?:-[a-z0-9]+)*)["']/gu),
    ].map((match) => match[1]));
    cursor = end + endMarker.length;
  }
}

function quotedPathListBetween(
  contents,
  startMarker,
  endMarker = "];",
) {
  const start = contents.indexOf(startMarker);
  assert.ok(start >= 0, `missing path list marker: ${startMarker}`);
  const end = contents.indexOf(endMarker, start);
  assert.ok(end > start, `missing path list terminator after: ${startMarker}`);
  return [
    ...contents
      .slice(start, end)
      .matchAll(/["'](\/[^"']*)["']/gu),
  ].map((match) => match[1]);
}

test("Edge persistence uses a capability RPC while preserving the submit-surface generation", async () => {
  const edge = await source(edgePath);
  const versions = await source(versionsPath);

  assert.match(
    versions,
    /submitSurfaceDestinationInquiryFormVersion = "2026-07-21\.1"/,
  );
  assert.match(
    versions,
    /currentDestinationInquiryFormVersion = "2026-07-25\.1"/,
  );
  assert.match(edge, /submitSurfaceDestinationInquiryFormVersion/);
  assert.match(
    edge,
    /isCurrentDestinationInquiry[\s\S]*create_homeground_destination_inquiry_v5_attribution/,
  );
  assert.match(
    edge,
    /isSubmitSurfaceDestinationInquiry[\s\S]*create_homeground_destination_inquiry_v4/,
  );
  assert.match(
    edge,
    /Object\.prototype\.hasOwnProperty\.call\(attribution, "entryPath"\)/,
  );
  assert.match(
    edge,
    /candidate\.entryPath === undefined \|\| candidate\.entryPath === null[\s\S]*candidate\.landingPath/,
  );
});

test("Edge rebuilds a bounded allowlisted attribution object", async () => {
  const edge = await source(edgePath);

  for (const key of [
    "entryPath",
    "sourceGuide",
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "utmContent",
  ]) {
    assert.match(edge, new RegExp(`"${key}"`));
  }
  assert.match(edge, /unicodeLength\(value\) <= maximumLength/);
  assert.match(edge, /guideSlugPattern\.test\(sourceGuide\)/);
  assert.match(edge, /allowedSourceGuides\.has\(sourceGuide\)/);
  assert.match(edge, /allowedInquiryEntryPathSet\.has\(entryPath\)/);
  assert.match(edge, /entryPath\.startsWith\("\/"\)/);
  assert.match(edge, /entryPath\.startsWith\("\/\/"\)/);
  assert.match(edge, /entryPath\.includes\(":\/\/"\)/);
  assert.match(edge, /entryPath\.includes\("\?"\)/);
  assert.match(edge, /entryPath\.includes\("#"\)/);
  assert.match(
    edge,
    /p_attribution: isCurrentDestinationInquiry[\s\S]*attributionForPersistence/,
  );
  assert.doesNotMatch(edge, /p_attribution:\s*payload\.attribution/);
});

test("V5 stages attribution without changing the deployed V4 RPC", async () => {
  const v4 = await source(v4MigrationPath);
  const migration = await source(attributionMigrationPath);

  assert.match(
    v4,
    /create or replace function public\.create_homeground_destination_inquiry_v4/,
  );
  assert.match(v4, /attribution_json = '\{\}'::jsonb/);
  assert.doesNotMatch(
    migration,
    /create or replace function\s+public\.create_homeground_destination_inquiry_v4/,
  );
  assert.match(
    migration,
    /create or replace function\s+public\.create_homeground_destination_inquiry_v5_attribution/,
  );
  assert.match(migration, /p_form_version <> '2026-07-25\.1'/);
  assert.match(
    migration,
    /p_privacy_notice_version <> '2026-07-25\.1'/,
  );
  assert.match(
    migration,
    /not \(normalized_attribution \? 'entryPath'\)/,
  );
  assert.match(
    migration,
    /normalized_attribution ->> 'sourceGuide'[\s\S]*= any\(allowed_source_guides\)/,
  );
  assert.match(
    migration,
    /normalized_attribution ->> 'entryPath'[\s\S]*= any\(allowed_entry_paths\)/,
  );
  assert.match(
    migration,
    /position\(\s*'\?' in normalized_attribution ->> 'entryPath'\s*\) > 0/,
  );
  assert.match(
    migration,
    /position\(\s*'#' in normalized_attribution ->> 'entryPath'\s*\) > 0/,
  );
  assert.match(
    migration,
    /public\.create_homeground_destination_inquiry_v4\([\s\S]*'2026-07-21\.1'/,
  );
  assert.match(
    migration,
    /form_version = p_form_version,[\s\S]*privacy_notice_version = p_privacy_notice_version,[\s\S]*attribution_json = normalized_attribution/,
  );
  assert.match(
    migration,
    /grant execute on function[\s\S]*create_homeground_destination_inquiry_v5_attribution[\s\S]*to service_role/,
  );
  assert.doesNotMatch(
    migration,
    /grant execute on function[\s\S]*create_homeground_destination_inquiry_v5_attribution[\s\S]*\bto anon\b/,
  );
});

test("browser, shared contract, Edge and database use one exact public entry-path allowlist", async () => {
  const [analytics, contract, edge, migration] = await Promise.all([
    source(analyticsPath),
    source("lib/inquiryContract.ts"),
    source(edgePath),
    source(attributionMigrationPath),
  ]);

  assert.match(analytics, /allowedInquiryEntryPathSet\.has\(canonical\)/);
  assert.match(
    contract,
    /allowedInquiryEntryPathSet\.has\(entryPath\)/,
  );
  assert.match(edge, /allowedInquiryEntryPathSet\.has\(entryPath\)/);
  assert.deepEqual(
    quotedPathListBetween(
      migration,
      "allowed_entry_paths constant text[] := array[",
    ),
    [...allowedInquiryEntryPaths],
  );
  assert.equal(allowedInquiryEntryPaths.at(-1), "/other/");
  assert.equal(new Set(allowedInquiryEntryPaths).size, allowedInquiryEntryPaths.length);
});

test("the 07-25 migration keeps the admin health producer and consumer versions aligned", async () => {
  const migration = await source(attributionMigrationPath);
  const adminContracts = await source(adminContractsPath);

  assert.match(
    migration,
    /alter function public\.get_homeground_admin_health\(\)[\s\S]*set schema homeground_private/,
  );
  assert.match(
    migration,
    /create or replace function public\.get_homeground_admin_health\(\)/,
  );
  assert.match(
    migration,
    /\{versions,currentForm\}'[\s\S]*to_jsonb\('2026-07-25\.1'::text\)/,
  );
  assert.match(
    migration,
    /\{versions,currentPrivacy\}'[\s\S]*to_jsonb\('2026-07-25\.1'::text\)/,
  );
  assert.match(adminContracts, /currentFormVersion === "2026-07-21\.1"/);
  assert.match(adminContracts, /currentPrivacyVersion === "2026-07-21\.1"/);
  assert.match(adminContracts, /currentFormVersion === "2026-07-25\.1"/);
  assert.match(adminContracts, /currentPrivacyVersion === "2026-07-25\.1"/);
  assert.match(adminContracts, /!supportedHealthVersionPair/);
});

test("browser, Edge, database and Admin use one exact source-guide allowlist", async () => {
  const [
    analytics,
    edge,
    migration,
    adminContracts,
    adminClient,
  ] = await Promise.all([
    source(analyticsPath),
    source(edgePath),
    source(attributionMigrationPath),
    source(adminContractsPath),
    source(adminClientPath),
  ]);

  const expected = quotedListBetween(
    adminClient,
    "export const adminGuideSourceSlugs = [",
    "] as const;",
  );
  assert.deepEqual(
    quotedListBetween(
      adminContracts,
      "const guideSourceSlugs = [",
      "] as const;",
    ),
    expected,
  );
  assert.deepEqual(
    quotedListBetween(
      analytics,
      "const allowedSourceGuides = new Set([",
      "]);",
    ),
    expected,
  );
  assert.deepEqual(
    quotedListBetween(
      edge,
      "const allowedSourceGuides = new Set([",
      "]);",
    ),
    expected,
  );
  const migrationLists = allQuotedListsBetween(
    migration,
    "allowed_source_guides constant text[] := array[",
  );
  assert.equal(migrationLists.length, 2);
  migrationLists.forEach((list) => assert.deepEqual(list, expected));
});

test("guide-to-inquiry read model is fixed-window, allowlisted, and k-suppressed", async () => {
  const migration = await source(attributionMigrationPath);
  const aggregateStart = migration.indexOf(
    "create or replace function\n  public.get_homeground_admin_guide_inquiry_counts",
  );
  const aggregateEnd = migration.indexOf(
    "comment on function\n  public.get_homeground_admin_guide_inquiry_counts",
    aggregateStart,
  );
  assert.ok(aggregateStart >= 0);
  assert.ok(aggregateEnd > aggregateStart);
  const aggregate = migration.slice(aggregateStart, aggregateEnd);

  assert.match(aggregate, /interval '90 days'/);
  assert.match(aggregate, /having count\(\*\) >= 5/);
  assert.match(aggregate, /minimumVisibleCount', 5/);
  assert.match(aggregate, /allowed_source_guides constant text\[\]/);
  assert.match(aggregate, /form_version = '2026-07-25\.1'/);
  assert.match(aggregate, /'sourceGuide', grouped\.source_guide/);
  assert.match(aggregate, /'inquiryCount', grouped\.inquiry_count/);
  assert.doesNotMatch(
    aggregate,
    /contact_email|contact_phone|public_reference|\bnote\b|answers_json|route_snapshot_json|departure_country|rough_budget/,
  );
  assert.doesNotMatch(
    aggregate,
    /'total'|'denominator'|'suppressedCount'|'customerRecords'/,
  );
  assert.match(
    migration,
    /grant execute on function\s+public\.get_homeground_admin_guide_inquiry_counts\(\)[\s\S]*to service_role/,
  );
  assert.doesNotMatch(
    migration,
    /grant execute on function\s+public\.get_homeground_admin_guide_inquiry_counts\(\)[\s\S]*\bto authenticated\b/,
  );
});

test("guide-to-inquiry read model withholds qualifying buckets during a data-quality hold", async () => {
  const migration = await source(attributionMigrationPath);
  const aggregateStart = migration.indexOf(
    "create or replace function\n  public.get_homeground_admin_guide_inquiry_counts",
  );
  const aggregateEnd = migration.indexOf(
    "comment on function\n  public.get_homeground_admin_guide_inquiry_counts",
    aggregateStart,
  );
  assert.ok(aggregateStart >= 0);
  assert.ok(aggregateEnd > aggregateStart);
  const aggregate = migration.slice(aggregateStart, aggregateEnd);

  const qualifyingBucket = aggregate.indexOf("having count(*) >= 5");
  const holdSuppression = aggregate.indexOf(
    "if data_quality_hold_active then\n    visible_guides := '[]'::jsonb;\n  end if;",
  );
  const response = aggregate.indexOf("return query");

  assert.ok(qualifyingBucket >= 0);
  assert.ok(holdSuppression > qualifyingBucket);
  assert.ok(response > holdSuppression);
  assert.match(
    aggregate,
    /'dataQualityHold', jsonb_build_object\([\s\S]*'active', data_quality_hold_active/,
  );
  assert.match(aggregate, /'guides', visible_guides/);
});

test("new form remains compatible with the existing aggregate metrics", async () => {
  const migration = await source(attributionMigrationPath);
  for (const metric of [
    "destination_selections",
    "trip_duration",
    "party",
    "pace",
    "stay_time_reference_match",
    "must_see_selections",
    "reply_channel_choice",
    "form_locale",
  ]) {
    assert.match(migration, new RegExp(`'${metric}'`));
  }
  assert.match(
    migration,
    /admin_metric_compatibility[\s\S]*'2026-07-25\.1'[\s\S]*'2026-07-19\.1'/,
  );
});
