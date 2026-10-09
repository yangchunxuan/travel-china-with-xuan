import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { writeFileSync } from "node:fs";
import { createServer } from "node:http";
import test from "node:test";
import { createIsolatedInquiryDatabase } from "../../tools/run-inquiry-recovery-drill.mjs";
import { sanitizeAdminInsightsRpc } from "../functions/_shared/admin-contracts.ts";

test("actual inquiry handlers persist, notify, replay and recover using isolated PostgreSQL only", { timeout: 120_000 }, async (t) => {
  let database;
  try { database = createIsolatedInquiryDatabase(); }
  catch (error) {
    const required = process.env.CI === "true" || ["1", "true"].includes(process.env.REQUIRE_ISOLATED_POSTGRES);
    if (error.code === "ENOENT" && !required) { t.skip("PostgreSQL tools required for disposable integration drill"); return; }
    throw error;
  }
  t.after(() => database.close());
  const originalFetch = globalThis.fetch, originalDeno = globalThis.Deno;
  const rpcCalls = [], providerCalls = [];
  let providerFails = false, handler;
  const server = createServer(async (request, response) => {
    try {
      assert.equal(request.method, "POST");
      assert.equal(request.headers.apikey, "isolated-server-key");
      const name = request.url.match(/^\/rest\/v1\/rpc\/([a-z][a-z0-9_]+)$/u)?.[1];
      assert.ok(name, "the bridge only permits RPC endpoints");
      let input = "";
      for await (const chunk of request) { input += chunk; assert.ok(input.length < 32_000); }
      const args = JSON.parse(input); rpcCalls.push(name);
      const result = database.rpc(name, args);
      response.writeHead(200, { "Content-Type": "application/json" }); response.end(JSON.stringify(result));
    } catch {
      response.writeHead(500, { "Content-Type": "application/json" }); response.end('{"error":"isolated_rpc_failure"}');
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const bridge = `http://127.0.0.1:${server.address().port}`;
  const env = new Map([
    ["ALLOWED_ORIGINS", "https://enquiry-fixture.invalid"], ["ALLOWED_FORM_VERSIONS", "2026-07-26.1"],
    ["ALLOWED_PRIVACY_NOTICE_VERSIONS", "2026-07-26.1"], ["SUPABASE_URL", bridge],
    ["SUPABASE_SECRET_KEYS", JSON.stringify({ default: "isolated-server-key" })],
    ["IDEMPOTENCY_HASH_SECRET", "isolated-idempotency-secret"], ["RATE_LIMIT_HASH_SECRET", "isolated-rate-secret"],
    ["NOTIFICATION_WORKER_SECRET", "isolated-worker-secret-000000000000000000"],
    ["RESEND_API_KEY", "isolated-provider-key"], ["RESEND_FROM_EMAIL", "Studio <sender@example.invalid>"],
    ["BRAND_NOTIFICATION_EMAIL", "planner@example.invalid"], ["TRAVELLER_ACK_ENABLED", "false"],
  ]);
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve: (value) => { handler = value; } };
  globalThis.fetch = async (input, options = {}) => {
    const url = new URL(String(input));
    if (url.origin === bridge && /^\/rest\/v1\/rpc\/[a-z][a-z0-9_]+$/u.test(url.pathname)) {
      return originalFetch(input, { ...options, redirect: "error" });
    }
    if (url.href === "https://api.resend.com/emails") {
      const body = JSON.parse(options.body);
      assert.match(body.from, /@example\.invalid/u);
      assert.ok(body.to.every((email) => email.endsWith("@example.invalid")));
      providerCalls.push({ body, key: options.headers["Idempotency-Key"] });
      return new Response(JSON.stringify(providerFails ? { error: "fixture_failure" } : { id: "fixture-provider-accepted" }), { status: providerFails ? 500 : 200, headers: { "Content-Type": "application/json" } });
    }
    throw new Error("outgoing_network_forbidden_in_isolated_drill");
  };
  t.after(() => { globalThis.fetch = originalFetch; globalThis.Deno = originalDeno; });
  await import(`../functions/v1-inquiries/index.ts?end-to-end=${randomUUID()}`); const intake = handler;
  await import(`../functions/notify-inquiries/index.ts?end-to-end=${randomUUID()}`); const worker = handler;
  const payload = (email = "traveller@example.invalid") => ({
    schemaVersion: 3, formVersion: "2026-07-26.1", entryPath: "homepage_email", locale: "en",
    contact: { channel: "email", email }, privacyNoticeVersion: "2026-07-26.1",
    attribution: { landingPath: "/" }, experiment: null, antiAbuse: { companyWebsite: "" },
  });
  const submit = (body, key = randomUUID()) => intake(new Request(bridge + "/functions/v1/v1-inquiries", {
    method: "POST", headers: { Origin: "https://enquiry-fixture.invalid", "Content-Type": "application/json", "Idempotency-Key": key, "X-Forwarded-For": "203.0.113.42" }, body: JSON.stringify(body),
  }));
  const notify = (secret = env.get("NOTIFICATION_WORKER_SECRET")) => worker(new Request(bridge + "/functions/v1/notify-inquiries", { method: "POST", headers: { "x-worker-secret": secret } }));
  const count = (table, restored = "postgres") => Number(database.sql(`select count(*) from homeground_private.${table};`, restored));
  const key = randomUUID(); let reference;

  await t.test("real Edge intake commits exactly one inquiry/outbox and the real admin read model sees it", async () => {
    const response = await submit(payload(), key);
    assert.equal(response.status, 201, JSON.stringify(await response.clone().json()));
    reference = (await response.json()).publicReference;
    assert.equal(count("inquiries"), 1); assert.equal(count("notification_outbox"), 1);
    assert.equal(database.sql("select contact_email from homeground_private.inquiries;"), "traveller@example.invalid");
    const admin = sanitizeAdminInsightsRpc(database.rpc("get_homeground_admin_insights", {}));
    assert.ok(admin); assert.doesNotMatch(JSON.stringify(admin), /traveller@example\.invalid/u);
  });
  await t.test("actual worker records provider acceptance, never treats it as confirmed inbox delivery", async () => {
    const response = await notify(); assert.equal(response.status, 200);
    assert.equal((await response.json()).accepted, 1); assert.equal(providerCalls.length, 1);
    const saved = JSON.parse(database.sql("select to_jsonb(o) from homeground_private.notification_outbox o;"));
    assert.equal(saved.status, "accepted"); assert.equal(saved.provider_message_id, "fixture-provider-accepted");
    assert.ok(providerCalls[0].body.text.includes(reference));
  });
  await t.test("same-key Edge replay preserves reference and sends no second notification", async () => {
    const response = await submit(payload(), key); assert.equal(response.status, 200);
    const result = await response.json(); assert.equal(result.publicReference, reference); assert.equal(result.duplicate, true);
    assert.equal(count("inquiries"), 1); assert.equal(count("notification_outbox"), 1);
    assert.equal((await (await notify()).json()).accepted, 0); assert.equal(providerCalls.length, 1);
    assert.equal((await submit(payload("different@example.invalid"), key)).status, 409);
  });
  await t.test("invalid input, unauthorized worker and atomic SQL write failure preserve saved rows", async () => {
    assert.equal((await submit({ ...payload(), contact: undefined })).status, 422);
    assert.equal((await notify("incorrect-fixture-secret")).status, 401);
    database.sql("create function homeground_private.fail_drill_outbox() returns trigger language plpgsql as $$ begin raise exception 'isolated atomic failure'; end; $$; create trigger fail_drill before insert on homeground_private.notification_outbox for each row execute function homeground_private.fail_drill_outbox();");
    assert.equal((await submit(payload("atomic@example.invalid"))).status, 503);
    assert.equal(count("inquiries"), 1); assert.equal(count("notification_outbox"), 1);
    database.sql("drop trigger fail_drill on homeground_private.notification_outbox; drop function homeground_private.fail_drill_outbox();");
  });
  await t.test("provider failure retains inquiry, schedules retry and reuses its exact idempotent envelope", async () => {
    assert.equal((await submit(payload("retry@example.invalid"))).status, 201);
    providerFails = true; const failed = await (await notify()).json(); assert.equal(failed.retryScheduled, 1);
    assert.equal(count("inquiries"), 2);
    assert.equal(database.sql("select status from homeground_private.notification_outbox where status='pending';"), "pending");
    providerFails = false;
    database.sql("update homeground_private.notification_outbox set next_attempt_at=now()-interval '1 second' where status='pending';");
    const retried = await (await notify()).json(); assert.equal(retried.accepted, 1);
    assert.equal(providerCalls[1].key, providerCalls[2].key); assert.deepEqual(providerCalls[1].body, providerCalls[2].body);
    assert.equal(Number(database.sql("select count(*) from homeground_private.notification_outbox where status='accepted';")), 2);
  });
  await t.test("actual custom pg_dump/pg_restore preserves data, functions, forced RLS and privileges", () => {
    const tableData = (databaseName) => {
      const names = JSON.parse(database.sql("select jsonb_agg(tablename order by tablename) from pg_tables where schemaname='homeground_private';", databaseName));
      return names.map((name) => {
        assert.match(name, /^[a-z][a-z0-9_]+$/u);
        return { name, ...JSON.parse(database.sql(`select jsonb_build_object('count',count(*),'hash',md5(coalesce(jsonb_agg(to_jsonb(t) order by to_jsonb(t)::text)::text,'[]'))) from homeground_private.${name} t;`, databaseName)) };
      });
    };
    const inventory = (databaseName) => JSON.parse(database.sql(`select jsonb_build_object(
      'inquiries',(select count(*) from homeground_private.inquiries),
      'outbox',(select count(*) from homeground_private.notification_outbox),
      'rows',(select jsonb_agg(to_jsonb(i) order by inquiry_id) from homeground_private.inquiries i),
      'tables',(select jsonb_agg(jsonb_build_object('name',relname,'rls',relrowsecurity,'forced',relforcerowsecurity,'acl',coalesce(relacl,acldefault('r',relowner))::text) order by relname) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='homeground_private' and relkind='r'),
      'functions',(select jsonb_agg(jsonb_build_object('signature',pg_get_function_identity_arguments(p.oid),'name',proname,'definition',md5(pg_get_functiondef(p.oid)),'acl',proacl::text) order by proname,pg_get_function_identity_arguments(p.oid)) from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname in ('public','homeground_private') and prokind='f'))`, databaseName));
    const before = inventory("postgres"), beforeData = tableData("postgres"); database.backupAndRestore();
    assert.deepEqual(inventory("restored"), before);
    assert.deepEqual(tableData("restored"), beforeData, "every private table keeps its row count and complete data hash");
    assert.equal(count("inquiries", "restored"), 2); assert.equal(count("notification_outbox", "restored"), 2);
    assert.ok(sanitizeAdminInsightsRpc(database.rpc("get_homeground_admin_insights", {}, "restored")));
    for (const databaseName of ["postgres", "restored"]) assert.throws(() => database.sql("set role anon; select * from homeground_private.inquiries;", databaseName));
  });
  await t.test("corrupt backups fail closed and cannot damage the source or verified restored database", () => {
    const archive = database.directory + "/corrupt.dump"; writeFileSync(archive, "not a PostgreSQL archive");
    assert.throws(() => database.restoreCorruptArchive(archive));
    assert.equal(count("inquiries"), 2); assert.equal(count("inquiries", "restored"), 2);
    assert.throws(() => database.restoreCorruptArchive("/outside-drill.dump"), /disposable_drill/u);
    assert.throws(() => database.restoreCorruptArchive(database.directory + "/../outside.dump"), /disposable_drill/u);
  });
  assert.ok(database.replayed.includes("202610090001_publish_northeast_winter_products.sql"));
  assert.ok(rpcCalls.includes("create_homeground_homepage_email_v1"));
  assert.ok(rpcCalls.includes("finish_homeground_notification_job"));
});
