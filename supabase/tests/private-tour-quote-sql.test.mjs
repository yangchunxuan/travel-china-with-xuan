import assert from "node:assert/strict";
import { execFile, execFileSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { getPrivateTourInquiryContext } from "../../lib/privateTourInquiryContext.ts";
import { sanitizeAdminInsightsRpc } from "../functions/_shared/admin-contracts.ts";

const digest = (value) => createHash("sha256").update(value).digest("hex");

test("quote migration persists real fields with atomic outbox, attribution, compatibility and least privilege in isolated PostgreSQL", async (t) => {
  // Disposable Unix-socket-only PostgreSQL; never reads project credentials or
  // connects to an existing database. Reuses the newsletter test relocation approach.
  const directory = mkdtempSync("/tmp/homeground-quote-test-");
  const database = `${directory}/data`;
  let started = false;
  let initCommand = "initdb";
  let controlCommand = "pg_ctl";
  const run = (command, args, options = {}) => execFileSync(command, args, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"], maxBuffer: 2 * 1024 * 1024, ...options });
  t.after(() => {
    if (started) run(controlCommand, ["-D", database, "-m", "immediate", "-w", "stop"]);
    rmSync(directory, { recursive: true, force: true });
  });
  const initExecutable = (process.env.PATH ?? "").split(":").map((path) => join(path, "initdb")).find(existsSync);
  const installRoot = initExecutable ? dirname(dirname(realpathSync(initExecutable))) : null;
  const relocatedShare = installRoot && join(installRoot, "share", "postgresql");
  const relocatedLibrary = installRoot && join(installRoot, "lib", "postgresql");
  // Some Homebrew relocations leave compiled-in share/lib paths unresolved.
  // Repair only this disposable test runtime, never the shared installation.
  if (relocatedShare && existsSync(join(relocatedShare, "postgres.bki"))) {
    const compiledShare = run("pg_config", ["--sharedir"]).trim();
    const compiledLibrary = run("pg_config", ["--pkglibdir"]).trim();
    if (!existsSync(join(compiledShare, "postgres.bki"))) {
      const runtime = join(directory, "runtime");
      const compiledBin = run("pg_config", ["--bindir"]).trim();
      let commonRoot = dirname(compiledBin);
      while (!compiledShare.startsWith(`${commonRoot}/`) || !compiledLibrary.startsWith(`${commonRoot}/`)) commonRoot = dirname(commonRoot);
      const runtimeBin = join(runtime, relative(commonRoot, compiledBin));
      const runtimeShare = join(runtime, relative(commonRoot, compiledShare));
      const runtimeLibrary = join(runtime, relative(commonRoot, compiledLibrary));
      for (const path of [runtimeBin, dirname(runtimeShare), dirname(runtimeLibrary)]) mkdirSync(path, { recursive: true });
      for (const command of ["initdb", "pg_ctl", "postgres"]) copyFileSync(join(installRoot, "bin", command), join(runtimeBin, command));
      symlinkSync(relocatedShare, runtimeShare); symlinkSync(relocatedLibrary, runtimeLibrary);
      initCommand = join(runtimeBin, "initdb"); controlCommand = join(runtimeBin, "pg_ctl");
    }
  }
  const relocationArgs = relocatedShare && existsSync(join(relocatedShare, "postgres.bki"))
    ? ["-L", relocatedShare, ...(relocatedLibrary && existsSync(relocatedLibrary) ? ["-c", `dynamic_library_path=${relocatedLibrary}`] : [])] : [];
  try { run(initCommand, ["-D", database, "--no-locale", "-E", "UTF8", "-A", "trust", "-U", "postgres", "-c", "timezone=GMT0", "-c", "log_timezone=GMT0", ...relocationArgs]); }
  catch (error) {
    if (error.code === "ENOENT") { t.skip("initdb/pg_ctl/psql are needed for isolated database integration tests"); return; }
    throw error;
  }
  run(controlCommand, ["-D", database, "-l", `${directory}/server.log`, "-o", `-h '' -k ${directory} -p 55489`, "-w", "start"]);
  started = true;
  const sql = (input) => run("psql", ["-h", directory, "-p", "55489", "-U", "postgres", "-d", "postgres", "-XAt", "-v", "ON_ERROR_STOP=1"], { input }).trim();

  sql("create role anon; create role authenticated; create role service_role; create schema extensions;");
  const migrations = new URL("../migrations/", import.meta.url);
  for (const filename of readdirSync(migrations).sort()) {
    if (filename > "202609050999" || filename === "202607180002_homeground_notification_schedule.sql") continue;
    // Hosted scheduler extensions are unavailable in plain local PostgreSQL.
    // Omit only their baseline scheduling blocks; intake/outbox/attribution SQL
    // and the new migration execute unchanged. Hosted cron is not under test.
    const migration = readFileSync(new URL(filename, migrations), "utf8")
      .replace(/^create extension if not exists pg_cron[^;]*;\s*$/gm, "")
      .replace(/do\s+(\$\w*\$)[\s\S]*?\1;/gi, (block) => block.includes("cron.") ? "-- Hosted scheduling omitted in isolated test." : block);
    try { sql(migration); } catch (error) { throw new Error(`Migration ${filename}: ${String(error.stderr).slice(-1600)}`); }
  }
  sql(readFileSync(new URL("202609100001_homeground_private_tour_quote.sql", migrations), "utf8"));
  const quoted = (value) => value === null ? "null" : `'${String(typeof value === "object" ? JSON.stringify(value) : value).replaceAll("'", "''")}'`;
  const rpc = (name, args) => JSON.parse(sql(`select coalesce(to_jsonb(public.${name}(${Object.entries(args).map(([key, value]) => `${key} => ${quoted(value)}`).join(",")})), 'null'::jsonb);`));
  const makeArgs = (locale = "en", classic = false) => {
    const slug = classic ? "zhangjiajie-4-day-private-tour" : "beijing-highlights-5-day-private-tour";
    return { p_schema_version: 4, p_form_version: "2026-09-10.1", p_locale: locale,
      p_contact_email: "traveller@example.invalid", p_product_interest: getPrivateTourInquiryContext(slug, locale, classic ? undefined : { packageId: "no-guide", travelers: 4 }),
      p_travel_date: classic ? null : "2026-12-15", p_note: classic ? null : "Two rooms.\nQuiet pace <please>.",
      p_privacy_notice_version: "2026-07-26.1", p_landing_path: `${locale === "en" ? "" : `/${locale}`}/tours/${slug}/`,
      p_idempotency_key_hash: digest(randomUUID()), p_payload_hash: digest(randomUUID()), p_rate_limit_subject_hash: digest(randomUUID()),
      p_short_rate_limit: 5, p_daily_rate_limit: 20, p_first_response_due_at: "2026-12-16T00:00:00Z" };
  };
  const submit = (args) => rpc("create_homeground_private_tour_quote_v1", args);
  const count = (table) => Number(sql(`select count(*) from homeground_private.${table};`));
  const reset = () => sql("truncate homeground_private.inquiries, homeground_private.inquiry_rate_limit_buckets cascade;");

  await t.test("real records retain date, multiline notes, page, language and service/group; replay does not duplicate or mutate", () => {
    reset();
    for (const locale of ["en", "zh", "ko"]) {
      for (const classic of [false, true]) {
        const args = makeArgs(locale, classic); const first = submit(args);
        assert.equal(first.outcome, "created");
        const row = JSON.parse(sql(`select to_jsonb(i) from homeground_private.inquiries i where inquiry_id = ${quoted(first.inquiryId)};`));
        assert.equal(row.schema_version, 4); assert.equal(row.entry_path, "private_tour_quote");
        assert.deepEqual(row.answers_json, { productInterest: args.p_product_interest, travelDate: args.p_travel_date, landingPath: args.p_landing_path });
        assert.equal(row.note, args.p_note); assert.equal(row.locale, locale);
        assert.deepEqual(row.attribution_json, {});
        assert.equal(submit(args).outcome, "replay");
        assert.equal(submit({ ...args, p_travel_date: "2027-01-01", p_payload_hash: digest("different-date") }).outcome, "idempotency_conflict");
        assert.equal(sql(`select answers_json->>'travelDate' from homeground_private.inquiries where inquiry_id=${quoted(first.inquiryId)}`), args.p_travel_date ?? "");
      }
    }
    assert.equal(count("inquiries"), 6); assert.equal(count("notification_outbox"), 6);
    const jobs = JSON.parse(sql("select jsonb_agg(to_jsonb(job)) from public.claim_homeground_notification_jobs_v3('local-test', 10, 120) job;"));
    assert.equal(jobs.length, 6);
    for (const job of jobs) {
      assert.equal(job.route_id, "private-tour-quote");
      assert.deepEqual(Object.keys(job.answers).sort(), ["landingPath", "productInterest", "travelDate"]);
      if (job.answers.productInterest.selection) { assert.equal(job.answers.productInterest.selection.travelers, 4); assert.equal(job.note, "Two rooms.\nQuiet pace <please>."); }
      else { assert.equal(job.answers.travelDate, null); assert.equal(job.note, null); }
    }
  });

  await t.test("SQL validation rejects forged fields and impossible dates before any row or outbox job", () => {
    reset(); const args = makeArgs();
    for (const changes of [
      { p_product_interest: { ...args.p_product_interest, selection: { packageId: "no-guide", travelers: 3 } } },
      { p_product_interest: { ...args.p_product_interest, extra: "wrong" } },
      { p_product_interest: { ...args.p_product_interest, name: "wrong" } }, { p_product_interest: null },
      { p_travel_date: "2026-02-30" }, { p_travel_date: "2026-02-29" }, { p_travel_date: "2026-2-01" },
      { p_note: "x".repeat(1001) }, { p_note: "bad\u202evalue" },
      { p_schema_version: 3 }, { p_landing_path: "/" }, { p_landing_path: `/zh${args.p_landing_path}` },
    ]) assert.throws(() => submit({ ...args, ...changes }), JSON.stringify(changes));
    assert.equal(count("inquiries"), 0); assert.equal(count("notification_outbox"), 0);
    assert.equal(submit({ ...args, p_travel_date: "2028-02-29", p_note: "中".repeat(1000) }).outcome, "created");
  });

  await t.test("simultaneous identical submissions share one saved inquiry and notification job", async () => {
    reset(); const args = makeArgs();
    const statement = `select public.create_homeground_private_tour_quote_v1(${Object.entries(args).map(([key, value]) => `${key} => ${quoted(value)}`).join(",")});`;
    const runAsync = promisify(execFile);
    const results = await Promise.all(Array.from({ length: 4 }, async () => {
      const { stdout } = await runAsync("psql", ["-h", directory, "-p", "55489", "-U", "postgres", "-d", "postgres", "-XAt", "-v", "ON_ERROR_STOP=1", "-c", statement], { encoding: "utf8" });
      return JSON.parse(stdout.trim());
    }));
    assert.equal(results.filter((result) => result.outcome === "created").length, 1);
    assert.equal(results.filter((result) => result.outcome === "replay").length, 3);
    assert.equal(new Set(results.map((result) => result.publicReference)).size, 1);
    assert.equal(count("inquiries"), 1); assert.equal(count("notification_outbox"), 1);
  });

  await t.test("new version update is atomic with the inherited insert, rate limit and outbox", () => {
    reset();
    sql("create function homeground_private.fail_test_quote_update() returns trigger language plpgsql as $$ begin if new.entry_path='private_tour_quote' then raise exception 'synthetic update failure'; end if; return new; end; $$; create trigger fail_test_quote before update on homeground_private.inquiries for each row execute function homeground_private.fail_test_quote_update();");
    assert.throws(() => submit(makeArgs()));
    assert.equal(count("inquiries"), 0); assert.equal(count("notification_outbox"), 0); assert.equal(count("inquiry_rate_limit_buckets"), 0);
    sql("drop trigger fail_test_quote on homeground_private.inquiries; drop function homeground_private.fail_test_quote_update();");
    const args = { ...makeArgs(), p_short_rate_limit: 1 };
    assert.equal(submit(args).outcome, "created"); assert.equal(submit(args).outcome, "replay");
    assert.equal(submit({ ...args, p_idempotency_key_hash: digest(randomUUID()) }).outcome, "rate_limited");
    assert.equal(count("inquiries"), 1); assert.equal(count("notification_outbox"), 1);
  });

  await t.test("attribution retry stores only hashes, missing analytics session does not lose quote, anonymous admin stays readable", () => {
    reset(); const args = { ...makeArgs(), p_traffic_session_hash: digest("not-yet-collected-session") };
    const first = rpc("create_homeground_private_tour_quote_with_traffic_v1", args);
    assert.equal(first.outcome, "created"); assert.equal(first.attributionOutcome, "pending");
    const replay = rpc("create_homeground_private_tour_quote_with_traffic_v1", args);
    assert.equal(replay.outcome, "replay");
    assert.equal(count("inquiry_traffic_attribution_outbox"), 1); assert.equal(count("notification_outbox"), 1);
    const jobText = sql("select to_jsonb(t) from homeground_private.inquiry_traffic_attribution_outbox t");
    assert.doesNotMatch(jobText, /traveller@example|Quiet pace|Two rooms/);
    const insights = JSON.parse(sql("select jsonb_agg(jsonb_build_object('payload', row.payload)) from public.get_homeground_admin_insights() row;"));
    const sanitized = sanitizeAdminInsightsRpc(insights);
    assert.ok(sanitized, "schema 4 must be accepted by the anonymous admin reader");
    assert.doesNotMatch(JSON.stringify(sanitized), /traveller@example|Quiet pace|Two rooms/);
    for (const metric of sanitized.metrics.filter((m) => ["form_locale", "reply_channel_choice"].includes(m.id))) {
      assert.ok(JSON.stringify(metric).includes("private_tour_quote"));
    }
  });

  await t.test("old homepage RPC and jobs remain valid and quote RPC execute is service-role-only", () => {
    reset(); const args = makeArgs();
    const old = rpc("create_homeground_homepage_email_v1", { p_schema_version: 3, p_form_version: "2026-07-26.1", p_locale: "en", p_contact_email: "legacy@example.invalid", p_privacy_notice_version: "2026-07-26.1", p_landing_path: "/", p_attribution: { productInterest: args.p_product_interest }, p_idempotency_key_hash: args.p_idempotency_key_hash, p_payload_hash: args.p_payload_hash, p_rate_limit_subject_hash: args.p_rate_limit_subject_hash, p_short_rate_limit: 5, p_daily_rate_limit: 20, p_first_response_due_at: args.p_first_response_due_at });
    assert.equal(old.outcome, "created");
    const row = JSON.parse(sql("select to_jsonb(i) from homeground_private.inquiries i"));
    assert.equal(row.schema_version, 3); assert.equal(row.note, null); assert.equal(Object.hasOwn(row.answers_json, "travelDate"), false);
    for (const name of ["create_homeground_private_tour_quote_v1", "create_homeground_private_tour_quote_with_traffic_v1"]) {
      const access = JSON.parse(sql(`select jsonb_build_object('anon', has_function_privilege('anon', oid, 'EXECUTE'), 'authenticated', has_function_privilege('authenticated', oid, 'EXECUTE'), 'service', has_function_privilege('service_role', oid, 'EXECUTE')) from pg_proc where proname=${quoted(name)}`));
      assert.deepEqual(access, { anon: false, authenticated: false, service: true });
    }
  });
});
