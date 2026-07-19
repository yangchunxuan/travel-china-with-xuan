import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migrationPath =
  "supabase/migrations/202607190002_homeground_destination_inquiries.sql";
const contactMigrationPath =
  "supabase/migrations/202607200001_homeground_contact_intake.sql";
const publicFunctionPath = "supabase/functions/v1-inquiries/index.ts";
const workerPath = "supabase/functions/notify-inquiries/index.ts";
const contractPath = "lib/inquiryContract.ts";
const versionsPath = "lib/inquiryVersions.ts";
const mockPath = "tools/mock-inquiry-api.mjs";
const envExamplePath = ".env.example";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("V3 has a separate schema and form version without changing V1 constants", async () => {
  const versions = await source(versionsPath);
  assert.match(versions, /inquirySchemaVersion = 1 as const/);
  assert.match(
    versions,
    /currentInquiryFormVersion = "2026-07-18\.1"/,
  );
  assert.match(versions, /destinationInquirySchemaVersion = 2 as const/);
  assert.match(
    versions,
    /previousDestinationInquiryFormVersion = "2026-07-19\.1"/,
  );
  assert.match(
    versions,
    /currentDestinationInquiryFormVersion = "2026-07-20\.1"/,
  );
});

test("V3 contract is server-authoritative and does not accept a client snapshot", async () => {
  const contract = await source(contractPath);
  assert.match(contract, /computeDestinationTiming\(/);
  assert.match(contract, /clientRuleVersion !== destinationTimingRuleVersion/);
  assert.match(contract, /routeFeasibility: "unverified"/);
  assert.match(contract, /destinationMode: "wishlist" \| "classic-start"/);
  assert.match(contract, /mustSeeIds: readonly DestinationId\[\]/);
  assert.doesNotMatch(
    contract,
    /hasOnlyKeys\([\s\S]{0,450}"timingSnapshot"/,
  );
});

test("V3 migration extends entry paths and leaves V1 RPC in place", async () => {
  const migration = await source(migrationPath);
  assert.match(
    migration,
    /entry_path in \('generated_route', 'destination_timing'\)/,
  );
  assert.match(
    migration,
    /create or replace function public\.create_homeground_destination_inquiry/,
  );
  assert.doesNotMatch(
    migration,
    /create or replace function public\.create_homeground_inquiry\(/,
  );
  assert.match(migration, /p_schema_version <> 2/);
  assert.match(migration, /p_form_version <> '2026-07-19\.1'/);
  assert.match(migration, /p_route_id <> 'destination-timing'/);
  assert.match(migration, /p_rule_version <> '2026-07-19\.1'/);
  assert.match(migration, /'destination_timing'/);
});

test("V3 persistence preserves idempotency and creates the outbox atomically", async () => {
  const migration = await source(migrationPath);
  const replay = migration.indexOf("if found then");
  const rateLimit = migration.indexOf(
    "homeground_private.consume_inquiry_rate_limit",
  );
  assert.ok(replay >= 0);
  assert.ok(rateLimit > replay);
  assert.match(migration, /pg_advisory_xact_lock/);
  assert.match(migration, /idempotency_conflict/);
  assert.match(migration, /insert into homeground_private\.inquiries/);
  assert.match(
    migration,
    /insert into homeground_private\.notification_outbox/,
  );
  assert.match(
    migration,
    /grant execute on function public\.create_homeground_destination_inquiry[\s\S]*to service_role/,
  );
  assert.doesNotMatch(migration, /grant execute[\s\S]*\bto anon\b/);
});

test("current contact intake versions the RPC and stores optional departure country", async () => {
  const migration = await source(contactMigrationPath);
  assert.match(
    migration,
    /add column if not exists departure_country text/,
  );
  assert.match(
    migration,
    /create or replace function public\.create_homeground_destination_inquiry_v2/,
  );
  assert.match(migration, /p_form_version <> '2026-07-20\.1'/);
  assert.match(migration, /p_privacy_notice_version <> '2026-07-20\.1'/);
  assert.match(migration, /public\.create_homeground_destination_inquiry\(/);
  assert.match(migration, /departure_country = nullif\(trim\(p_departure_country\), ''\)/);
  assert.match(
    migration,
    /create or replace function public\.claim_homeground_notification_jobs_v2/,
  );
  assert.match(migration, /inquiry\.departure_country/);
  assert.doesNotMatch(migration, /grant execute[\s\S]*\bto anon\b/);
});

test("Edge function selects the V3 RPC but keeps the V1 path", async () => {
  const edge = await source(publicFunctionPath);
  assert.match(edge, /create_homeground_destination_inquiry_v2/);
  assert.match(edge, /create_homeground_destination_inquiry/);
  assert.match(edge, /create_homeground_inquiry/);
  assert.match(
    edge,
    /payload\.schemaVersion === destinationInquirySchemaVersion/,
  );
  assert.match(edge, /p_route_id: payload\.journey\.routeId/);
  assert.match(edge, /p_route_snapshot: payload\.routeSnapshot/);
});

test("notification handoff includes V3 wishes, priorities, and canonical timing", async () => {
  const worker = await source(workerPath);
  for (const field of [
    "destinationMode",
    "destinationIds",
    "otherPlace",
    "totalNights",
    "party",
    "pace",
    "mustSeeIds",
    "essentialsMinimumNights",
    "essentialsShortfallNights",
    "selectedPaceShortfallNights",
    "nightsAboveSelectedPaceMax",
    "selectedPaceRange",
    "knownDestinationsStatus",
    "routeFeasibility",
  ]) {
    assert.match(worker, new RegExp(field));
  }
  assert.match(worker, /job\.route_id === "destination-timing"/);
  assert.match(worker, /Array\.from\(value\)\.length > maximumLength/);
  assert.match(worker, /Planning brief/);
  assert.match(worker, /Traveller answers/);
  assert.match(worker, /departure_country/);
  assert.match(worker, /claim_homeground_notification_jobs_v2/);
  assert.match(worker, /Idempotency-Key": job\.inquiry_id/);
  assert.doesNotMatch(worker, /(?:\+?86)?1[3-9][0-9]{9}/);
  assert.doesNotMatch(worker, /@gmail\.com/i);
});

test("development mock accepts both form generations", async () => {
  const mock = await source(mockPath);
  const example = await source(envExamplePath);
  assert.match(mock, /currentInquiryFormVersion/);
  assert.match(mock, /supportedDestinationInquiryFormVersions/);
  assert.match(
    mock,
    /allowedFormVersions:\s*\[[\s\S]*currentInquiryFormVersion[\s\S]*\.\.\.supportedDestinationInquiryFormVersions/,
  );
  assert.match(
    example,
    /^ALLOWED_FORM_VERSIONS=2026-07-18\.1,2026-07-19\.1,2026-07-20\.1$/m,
  );
});
