import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const schemaMigrationPath =
  "supabase/migrations/202607260001_homeground_test_markers.sql";
const adminMigrationPath =
  "supabase/migrations/202607260002_homeground_admin_exclude_test_inquiries.sql";
const maintenancePath =
  "supabase/maintenance/20260726_mark_known_test_inquiries.sql";
const rollbackPath =
  "supabase/maintenance/20260726_unmark_known_test_inquiries.sql";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

const knownTestReferences = [
  "HG-RRRS-MAYF-E33W",
  "HG-CTM2-3YE5-CW3Q",
  "HG-WPZG-U4XK-KT8N",
  "HG-R2HQ-WRPA-PB3R",
  "HG-DVJS-XWYQ-Z64P",
  "HG-CPZ5-JQ4M-XAHA",
  "HG-4LUJ-YNE2-9JSU",
  "HG-WLTK-KELU-QUWD",
  "HG-GJ24-65MQ-MT9M",
  "HG-JSLN-MQ2L-NDEY",
  "HG-RAKP-AD42-43KV",
];

test("test markers preserve inquiries and remain private", async () => {
  const sql = await source(schemaMigrationPath);
  assert.match(
    sql,
    /create table if not exists homeground_private\.inquiry_test_markers/,
  );
  assert.match(
    sql,
    /references homeground_private\.inquiries\(inquiry_id\)[\s\S]*on delete cascade/,
  );
  assert.match(
    sql,
    /alter table homeground_private\.inquiry_test_markers[\s\S]*enable row level security/,
  );
  assert.match(
    sql,
    /revoke all on table homeground_private\.inquiry_test_markers[\s\S]*from public, anon, authenticated, service_role/,
  );
  assert.doesNotMatch(sql, /delete from homeground_private\.inquiries/i);
  assert.doesNotMatch(sql, /contact_(?:email|phone)/i);
});

test("all business summaries share one non-test source", async () => {
  const schemaSql = await source(schemaMigrationPath);
  const adminSql = await source(adminMigrationPath);

  assert.match(
    schemaSql,
    /create or replace view homeground_private\.non_test_inquiries/,
  );
  assert.match(
    schemaSql,
    /not exists[\s\S]*homeground_private\.inquiry_test_markers/,
  );
  assert.match(
    schemaSql,
    /from homeground_private\.non_test_inquiries/,
  );
  assert.match(
    schemaSql,
    /get_homeground_inquiry_classification_summary/,
  );
  assert.match(
    adminSql,
    /get_homeground_admin_insights/,
  );
  assert.match(
    adminSql,
    /homeground_private\.non_test_inquiries/,
  );
  assert.match(
    adminSql,
    /Admin health is intentionally not rewritten[\s\S]*continue to see every physical row/,
  );
  assert.match(
    adminSql,
    /admin read model must be installed before test exclusion/,
  );
  assert.match(
    adminSql,
    /Repeat-safe for environments where this SQL was applied manually/,
  );
  assert.match(
    adminSql,
    /position\([\s\S]*homeground_private\.non_test_inquiries[\s\S]*> 0 then[\s\S]*null;/,
  );
});

test("production maintenance marks only the exact verified references", async () => {
  const sql = await source(maintenancePath);
  const references = [...sql.matchAll(/'((?:HG-)[A-Z0-9-]+)'/g)]
    .map((match) => match[1]);

  assert.deepEqual(
    [...new Set(references)].sort(),
    [...knownTestReferences].sort(),
  );
  assert.match(sql, /cardinality\(expected_references\) <> 11/);
  assert.match(sql, /count\(distinct reference\)/);
  assert.match(sql, /found_sorted is distinct from expected_sorted/);
  assert.match(sql, /marked_sorted is distinct from expected_sorted/);
  assert.match(sql, /on conflict \(inquiry_id\) do nothing/);
  assert.doesNotMatch(sql, /contact_(?:email|phone)/i);
  assert.doesNotMatch(sql, /delete from homeground_private\.inquiries/i);
  assert.doesNotMatch(sql, /(?:note|locale)\s*(?:=|like|ilike)/i);
});

test("rollback removes only the exact marker batch", async () => {
  const sql = await source(rollbackPath);
  const references = [...sql.matchAll(/'((?:HG-)[A-Z0-9-]+)'/g)]
    .map((match) => match[1]);

  assert.deepEqual(
    [...new Set(references)].sort(),
    [...knownTestReferences].sort(),
  );
  assert.match(sql, /deleted_markers <> 11/);
  assert.match(sql, /marked_sorted is distinct from expected_sorted/);
  assert.match(
    sql,
    /delete from homeground_private\.inquiry_test_markers/,
  );
  assert.doesNotMatch(sql, /delete from homeground_private\.inquiries/i);
  assert.doesNotMatch(sql, /delete from homeground_private\.notification_outbox/i);
});

test("classification counts cannot be mistaken for customers or sales", async () => {
  const sql = await source(schemaMigrationPath);
  assert.match(sql, /total_saved_submissions/);
  assert.match(sql, /verified_test_submissions/);
  assert.match(sql, /non_test_saved_submissions/);
  assert.match(
    sql,
    /Non-test does not mean unique person, qualified lead, customer, or sale/,
  );
  assert.doesNotMatch(sql, /\breal_customers?\b/i);
});
