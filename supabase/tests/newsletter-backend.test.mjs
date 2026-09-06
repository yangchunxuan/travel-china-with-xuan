import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash, createHmac, randomUUID } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import test from "node:test";
import {
  newsletterConfirmationMessage, newsletterConsentVersion, newsletterPageUrl, validateNewsletterRequest,
} from "../functions/_shared/newsletter-contract.ts";

const digest = (text) => createHash("sha256").update(text).digest("hex");
const payload = () => ({ action: "subscribe", requestId: randomUUID(), email: "Traveller@Example.invalid", firstName: " Xuan ",
  locale: "en", sourcePath: "/guides/", consent: true, consentVersion: newsletterConsentVersion, website: "" });

test("newsletter requires explicit current-purpose opt-in, clean contact and bounded pathname", () => {
  const valid = validateNewsletterRequest(payload());
  assert.equal(valid.email, "traveller@example.invalid");
  assert.equal(valid.firstName, "Xuan");
  for (const changes of [{ consent: false }, { consent: undefined }, { consent: "true" }, { consentVersion: "2026-07-31.1" },
    { website: "robot" }, { marketing: true }, { locale: "fr" }, { firstName: "x".repeat(81) }, { email: "x".repeat(255) },
    { email: "a..b@example.invalid" }, { email: "a@example.invalid\r\nBcc: x@bad.invalid" },
    { sourcePath: "//evil.invalid/" }, { sourcePath: "/guides/?email=x" }, { sourcePath: "/#token=x" },
    { sourcePath: "/../" }, { sourcePath: "/%40traveller/" }, { sourcePath: "https://homegroundchina.com/" }]) {
    assert.equal(validateNewsletterRequest({ ...payload(), ...changes }), null, JSON.stringify(changes));
  }
  assert.equal(validateNewsletterRequest({ ...payload(), firstName: undefined }).firstName, "");
  for (const action of ["confirm", "unsubscribe"]) {
    assert.equal(validateNewsletterRequest({ action, requestId: randomUUID(), token: "a".repeat(64) }).action, action);
    assert.equal(validateNewsletterRequest({ action, requestId: randomUUID(), token: "a".repeat(63) }), null);
  }
});

test("every locale has fragment-only confirmation and cancellation links", () => {
  for (const locale of ["en", "zh", "ko"]) {
    const confirm = newsletterPageUrl("https://homegroundchina.com", locale, "confirm", "a".repeat(64));
    const unsubscribe = newsletterPageUrl("https://homegroundchina.com", locale, "unsubscribe", "b".repeat(64));
    assert.equal(new URL(confirm).search, "");
    assert.equal(new URL(confirm).hash, `#token=${"a".repeat(64)}`);
    assert.equal(new URL(confirm).pathname, `${locale === "en" ? "" : `/${locale}`}/newsletter/confirm/`);
    const mail = newsletterConfirmationMessage(locale, confirm, unsubscribe);
    assert.ok(mail.text.includes(confirm) && mail.text.includes(unsubscribe));
    assert.ok(!/[\r\n]/.test(mail.subject));
  }
});

test("newsletter SQL exercises lifecycle on an isolated local PostgreSQL database", async (t) => {
  // This suite never reads project credentials or connects to an existing server.
  // It creates its own Unix-socket-only cluster, runs the migration, then removes it.
  const directory = mkdtempSync("/tmp/homeground-newsletter-test-");
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
  run(controlCommand, ["-D", database, "-l", `${directory}/server.log`, "-o", `-h '' -k ${directory} -p 55487`, "-w", "start"]);
  started = true;
  const sql = (input) => run("psql", ["-h", directory, "-p", "55487", "-U", "postgres", "-d", "postgres", "-XAt", "-v", "ON_ERROR_STOP=1"], { input }).trim();
  sql("create role anon; create role authenticated; create role service_role;");
  sql(readFileSync(new URL("../migrations/202609060001_homeground_newsletter.sql", import.meta.url), "utf8"));
  const quote = (value) => value === null ? "null" : typeof value === "boolean" ? String(value) : `'${String(value).replaceAll("'", "''")}'`;
  const rpc = (name, args) => JSON.parse(sql(`select coalesce(to_jsonb(public.${name}(${Object.entries(args).map(([key, value]) => `${key} => ${quote(value)}`).join(",")})), 'null'::jsonb);`));
  const reset = () => sql("truncate homeground_private.newsletter_subscribers, homeground_private.newsletter_requests, homeground_private.newsletter_rate_buckets, homeground_private.newsletter_admin_access cascade;");
  const createArgs = (label = randomUUID()) => ({
    p_request_hash: digest(`request:${label}`), p_fingerprint: digest(`fingerprint:${label}`),
    p_email: `${label}@example.invalid`, p_email_hash: digest(`email:${label}`), p_ip_hash: digest(`ip:${label}`),
    p_first_name: "Test", p_locale: "en", p_source_path: "/guides/", p_consent: true,
    p_consent_version: newsletterConsentVersion, p_job_id: randomUUID(),
    p_confirmation_hash: digest(`confirm:${label}`), p_unsubscribe_hash: digest(`unsubscribe:${label}`),
  });
  const subscribe = (args) => rpc("subscribe_homeground_newsletter_v1", args);
  const changeArgs = (action, tokenHash, request = randomUUID()) => ({ p_action: action,
    p_request_hash: digest(request), p_fingerprint: digest(`${action}:${tokenHash}:${request}`),
    p_token_hash: tokenHash, p_ip_hash: digest("change-ip") });
  const change = (args) => rpc("change_homeground_newsletter_v1", args);
  const count = (table) => Number(sql(`select count(*) from homeground_private.${table};`));

  await t.test("database refuses missing/false or unrelated consent before any persistence", () => {
    reset();
    for (const consent of [false, null]) assert.equal(subscribe({ ...createArgs(), p_consent: consent }).error, "invalid");
    assert.equal(subscribe({ ...createArgs(), p_consent_version: "cookie-marketing" }).error, "invalid");
    assert.equal(count("newsletter_subscribers"), 0);
  });

  await t.test("same request has one row/job/event, conflicting payload is rejected and existing addresses stay private", () => {
    reset(); const args = createArgs("idempotency");
    const first = subscribe(args);
    assert.equal(first.status, "pending");
    assert.deepEqual(subscribe({ ...args, p_job_id: randomUUID() }), first);
    assert.equal(subscribe({ ...args, p_fingerprint: digest("changed") }).error, "invalid");
    assert.deepEqual(subscribe({ ...args, p_request_hash: digest("second"), p_job_id: randomUUID() }), { status: "pending" });
    assert.deepEqual(subscribe({ ...args, p_request_hash: digest("rotated-hash-request"), p_email_hash: digest("rotated-email-hash"), p_job_id: randomUUID() }), { status: "pending" });
    for (const table of ["newsletter_subscribers", "newsletter_outbox", "newsletter_consent_events"]) assert.equal(count(table), 1);
    assert.equal(sql("select status from homeground_private.newsletter_subscribers"), "pending");
  });

  await t.test("confirmation replay is safe, unsubscribe invalidates old confirmation, fresh consent creates a new generation", () => {
    reset(); const args = createArgs("lifecycle"); subscribe(args);
    const confirm = changeArgs("confirm", args.p_confirmation_hash);
    assert.equal(change(confirm).status, "active");
    assert.equal(change(confirm).status, "active");
    assert.equal(count("newsletter_consent_events"), 2);
    assert.deepEqual(subscribe({ ...args, p_request_hash: digest("existing-active"), p_job_id: randomUUID() }), { status: "pending" });
    const unsubscribe = changeArgs("unsubscribe", args.p_unsubscribe_hash);
    assert.equal(change(unsubscribe).status, "unsubscribed");
    assert.equal(change(unsubscribe).status, "unsubscribed");
    assert.equal(change(confirm).error, "invalid");
    const again = { ...args, p_request_hash: digest("resubscribe"), p_fingerprint: digest("resubscribe"),
      p_job_id: randomUUID(), p_confirmation_hash: digest("newconfirm"), p_unsubscribe_hash: digest("newunsubscribe") };
    assert.equal(subscribe(again).status, "pending");
    assert.equal(change(confirm).error, "invalid");
    assert.equal(change(unsubscribe).error, "invalid");
    assert.equal(change(changeArgs("confirm", again.p_confirmation_hash)).status, "active");
  });

  await t.test("expired/unknown tokens cannot activate; unsubscribe also cancels unconfirmed requests", () => {
    reset(); const args = createArgs("expired"); subscribe(args);
    sql("update homeground_private.newsletter_subscribers set confirmation_expires_at = now() - interval '1 second'");
    assert.equal(change(changeArgs("confirm", args.p_confirmation_hash)).error, "invalid");
    assert.equal(change(changeArgs("confirm", digest("unknown"))).error, "invalid");
    assert.equal(change(changeArgs("unsubscribe", args.p_unsubscribe_hash)).status, "unsubscribed");
    assert.equal(sql("select status from homeground_private.newsletter_outbox"), "cancelled");
  });

  await t.test("outbox leases recover an interrupted send and reject stale worker completion", () => {
    reset(); const args = createArgs("lease"); subscribe(args);
    const first = rpc("claim_homeground_newsletter_email_v1", { p_job_id: args.p_job_id });
    assert.equal(first.jobId, args.p_job_id);
    assert.equal(rpc("claim_homeground_newsletter_email_v1", { p_job_id: args.p_job_id }), null);
    sql("update homeground_private.newsletter_outbox set lease_until = now() - interval '1 second'");
    const second = rpc("claim_homeground_newsletter_email_v1", { p_job_id: args.p_job_id });
    assert.notEqual(first.leaseToken, second.leaseToken);
    const finish = { p_job_id: args.p_job_id, p_lease_token: first.leaseToken, p_accepted: true,
      p_retryable: false, p_provider_message_id: "provider-test-id", p_error_code: null };
    assert.equal(rpc("finish_homeground_newsletter_email_v1", finish), false);
    assert.equal(rpc("finish_homeground_newsletter_email_v1", { ...finish, p_lease_token: second.leaseToken }), true);
    assert.equal(sql("select status from homeground_private.newsletter_outbox"), "sent");
    assert.equal(rpc("claim_homeground_newsletter_email_v1", {}), null);
  });

  await t.test("email retries are bounded and never run beyond the provider idempotency horizon", () => {
    reset(); const args = createArgs("retry"); subscribe(args);
    for (let index = 0; index < 5; index++) {
      const job = rpc("claim_homeground_newsletter_email_v1", {});
      assert.ok(job);
      assert.equal(rpc("finish_homeground_newsletter_email_v1", { p_job_id: job.jobId, p_lease_token: job.leaseToken,
        p_accepted: false, p_retryable: true, p_provider_message_id: null, p_error_code: "provider_retry" }), true);
      sql("update homeground_private.newsletter_outbox set next_attempt_at = now() - interval '1 second'");
    }
    assert.equal(sql("select status from homeground_private.newsletter_outbox"), "failed");
    assert.equal(rpc("claim_homeground_newsletter_email_v1", {}), null);
    reset(); subscribe(createArgs("too-old"));
    sql("update homeground_private.newsletter_outbox set created_at = now() - interval '21 hours'");
    assert.equal(rpc("claim_homeground_newsletter_email_v1", {}), null);
    assert.equal(sql("select status from homeground_private.newsletter_outbox"), "failed");
  });

  await t.test("email/IP limits apply before creating records and public roles have no access", () => {
    reset(); const original = createArgs("email-limit");
    for (let index = 0; index < 4; index++) {
      const args = { ...original, p_request_hash: digest(`email-request:${index}`), p_job_id: randomUUID(),
        p_confirmation_hash: digest(`confirm-limit:${index}`), p_unsubscribe_hash: digest(`unsub-limit:${index}`) };
      assert.equal(subscribe(args).status, "pending");
      sql("update homeground_private.newsletter_subscribers set requested_at = now() - interval '11 minutes'");
    }
    assert.equal(count("newsletter_outbox"), 3);
    reset();
    for (let index = 0; index < 6; index++) {
      const result = subscribe({ ...createArgs(`ip-${index}`), p_ip_hash: digest("same-ip") });
      assert.equal(index < 5 ? result.status : result.error, index < 5 ? "pending" : "rate_limited");
    }
    assert.equal(count("newsletter_subscribers"), 5);
    assert.equal(sql("select has_table_privilege('anon','homeground_private.newsletter_subscribers','SELECT')"), "f");
    assert.equal(sql("select has_function_privilege('authenticated','public.change_homeground_newsletter_v1(text,text,text,text,text)','EXECUTE')"), "f");
    assert.equal(sql("select has_function_privilege('service_role','public.change_homeground_newsletter_v1(text,text,text,text,text)','EXECUTE')"), "t");
    assert.equal(Number(sql("select count(*) from information_schema.columns where table_schema='homeground_private' and table_name like 'newsletter_%' and column_name in ('ip','ip_address','raw_token','confirmation_token','unsubscribe_token')")), 0);
  });

  await t.test("retention clears unconfirmed data and redacts old withdrawals without deleting active subscriptions", () => {
    reset(); const active = createArgs("retained-active"); const pending = createArgs("retained-pending"); const removed = createArgs("retained-unsub");
    for (const args of [active, pending, removed]) subscribe(args);
    change(changeArgs("confirm", active.p_confirmation_hash));
    change(changeArgs("unsubscribe", removed.p_unsubscribe_hash));
    sql("update homeground_private.newsletter_subscribers set requested_at = now() - interval '8 days' where status='pending'; update homeground_private.newsletter_subscribers set unsubscribed_at = now() - interval '31 days' where status='unsubscribed'");
    rpc("maintain_homeground_newsletter_v1", {});
    assert.equal(count("newsletter_subscribers"), 2);
    assert.equal(sql("select email is null from homeground_private.newsletter_subscribers where status='unsubscribed'"), "t");
    assert.equal(sql("select email from homeground_private.newsletter_subscribers where status='active'"), active.p_email);
  });

  await t.test("withdrawal during an in-flight lease prevents stale completion and all later activation", () => {
    reset(); const args = createArgs("withdraw-in-flight"); subscribe(args);
    const job = rpc("claim_homeground_newsletter_email_v1", {});
    assert.equal(change(changeArgs("unsubscribe", args.p_unsubscribe_hash)).status, "unsubscribed");
    assert.equal(rpc("finish_homeground_newsletter_email_v1", { p_job_id: job.jobId, p_lease_token: job.leaseToken,
      p_accepted: true, p_retryable: false, p_provider_message_id: "already-in-flight", p_error_code: null }), false);
    assert.equal(change(changeArgs("confirm", args.p_confirmation_hash)).error, "invalid");
    assert.equal(rpc("claim_homeground_newsletter_email_v1", {}), null);
    sql("update homeground_private.newsletter_subscribers set status='suppressed'");
    assert.equal(change(changeArgs("unsubscribe", args.p_unsubscribe_hash)).status, "unsubscribed");
    assert.equal(sql("select status from homeground_private.newsletter_subscribers"), "suppressed");
  });

  await t.test("administrator read model is paginated and audited without exposing hashes or tokens", () => {
    reset(); for (let index = 0; index < 28; index++) subscribe(createArgs(`admin-${index}`));
    const params = { p_admin_user_id: randomUUID(), p_status: null, p_cursor: null };
    const first = rpc("get_homeground_newsletter_admin_v1", params);
    assert.equal(first.contractVersion, "homeground-newsletter-admin.v1");
    assert.equal(first.counts.pending, 28);
    assert.equal(first.subscribers.length, 25);
    assert.ok(first.nextCursor);
    const second = rpc("get_homeground_newsletter_admin_v1", { ...params, p_cursor: first.nextCursor });
    assert.equal(second.subscribers.length, 3);
    assert.equal(new Set([...first.subscribers, ...second.subscribers].map((row) => row.id)).size, 28);
    assert.ok(!/token|hash|generation/i.test(JSON.stringify(first)));
    assert.equal(count("newsletter_admin_access"), 2);
  });
});

test("newsletter Edge handler fails closed, prevents GET mutations and never treats cookie permission as subscription", async (t) => {
  const previousDeno = globalThis.Deno; const previousFetch = globalThis.fetch;
  const env = new Map([
    ["ALLOWED_ORIGINS", "https://homegroundchina.com"], ["NEWSLETTER_SITE_ORIGIN", "https://homegroundchina.com"],
    ["NEWSLETTER_ENABLED", "true"], ["NEWSLETTER_TOKEN_SECRET", "token-secret-test-".repeat(3)],
    ["NEWSLETTER_WORKER_SECRET", "worker-secret-test-".repeat(3)], ["RATE_LIMIT_HASH_SECRET", "rate-secret-test-".repeat(3)],
    ["RESEND_API_KEY", "test-provider-key"], ["RESEND_FROM_EMAIL", "Homeground <newsletter@example.invalid>"],
    ["SUPABASE_URL", "https://project.supabase.co"], ["SUPABASE_SERVICE_ROLE_KEY", "test-service-role"],
  ]);
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve() {} };
  t.after(() => { globalThis.Deno = previousDeno; globalThis.fetch = previousFetch; });
  const { handleNewsletterRequest } = await import("../functions/v1-newsletter/index.ts");
  const endpoint = "https://project.supabase.co/functions/v1/v1-newsletter";
  const calls = [];
  globalThis.fetch = async (input, options) => {
    calls.push({ url: String(input), body: JSON.parse(options.body) });
    if (String(input).includes("api.resend.com")) throw new Error("test forbids real email provider calls");
    const action = calls.at(-1).body.p_action;
    return new Response(JSON.stringify({ status: action === "confirm" ? "active" : action === "unsubscribe" ? "unsubscribed" : "pending" }), { status: 200 });
  };
  const request = (body, options = {}) => new Request(endpoint, { method: "POST", headers: { Origin: "https://homegroundchina.com", "Content-Type": "application/json" }, body: JSON.stringify(body), ...options });
  const read = async (response) => ({ status: response.status, body: await response.json() });
  assert.equal((await handleNewsletterRequest(new Request(endpoint, { headers: { Origin: "https://homegroundchina.com" } }))).status, 405);
  assert.equal((await handleNewsletterRequest(request(payload(), { headers: { Origin: "https://evil.invalid", "Content-Type": "application/json" } }))).status, 403);
  assert.equal((await handleNewsletterRequest(request({ ...payload(), consent: false }))).status, 422);
  assert.equal((await handleNewsletterRequest(request({ ...payload(), marketing: true }))).status, 422);
  assert.equal(calls.length, 0);
  assert.deepEqual(await read(await handleNewsletterRequest(request(payload()))), { status: 202, body: { status: "pending" } });
  assert.ok(calls[0].body.p_ip_hash.match(/^[0-9a-f]{64}$/));
  assert.ok(!Object.keys(calls[0].body).includes("p_token"));
  env.delete("RESEND_API_KEY");
  assert.equal((await handleNewsletterRequest(request(payload()))).status, 503);
  env.set("NEWSLETTER_ENABLED", "false");
  for (const action of ["confirm", "unsubscribe"]) {
    assert.equal((await handleNewsletterRequest(request({ action, requestId: randomUUID(), token: "a".repeat(64) }))).status, 200);
  }
  assert.equal((await handleNewsletterRequest(request({ action: "retry" }))).status, 422);
  const rejectedWorker = await handleNewsletterRequest(new Request(endpoint, { method: "POST", headers: { "x-newsletter-worker-secret": "invalid", "Content-Type": "application/json" }, body: '{"action":"retry"}' }));
  assert.equal(rejectedWorker.status, 403);
});

test("authenticated email retry keeps identical provider payload/key and derives tokens only in worker memory", async (t) => {
  const previousDeno = globalThis.Deno; const previousFetch = globalThis.fetch;
  const tokenSecret = "token-secret-test-".repeat(3); const workerSecret = "worker-secret-test-".repeat(3);
  const env = new Map([["ALLOWED_ORIGINS", "https://homegroundchina.com"], ["NEWSLETTER_SITE_ORIGIN", "https://homegroundchina.com"],
    ["NEWSLETTER_ENABLED", "true"], ["NEWSLETTER_TOKEN_SECRET", tokenSecret], ["NEWSLETTER_WORKER_SECRET", workerSecret],
    ["RATE_LIMIT_HASH_SECRET", "rate-secret-test-".repeat(3)], ["RESEND_API_KEY", "test-key"],
    ["RESEND_FROM_EMAIL", "Homeground <newsletter@example.invalid>"], ["SUPABASE_URL", "https://project.supabase.co"],
    ["SUPABASE_SERVICE_ROLE_KEY", "test-service-key"]]);
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve() {} };
  t.after(() => { globalThis.Deno = previousDeno; globalThis.fetch = previousFetch; });
  const { handleNewsletterRequest } = await import("../functions/v1-newsletter/index.ts");
  const jobId = randomUUID(); const providers = []; const finishes = []; let providerStatus = 409;
  const token = (purpose) => createHmac("sha256", tokenSecret).update(`newsletter-${purpose}:${jobId}`).digest("hex");
  globalThis.fetch = async (input, options) => {
    const url = String(input); const body = JSON.parse(options.body);
    let result;
    if (url.includes("maintain_homeground_newsletter")) result = { pending: 1, processing: 0, failed: 0 };
    else if (url.includes("claim_homeground_newsletter")) result = { jobId, leaseToken: randomUUID(), email: "worker-test@example.invalid", locale: "zh",
      confirmationHash: digest(token("confirm")), unsubscribeHash: digest(token("unsubscribe")) };
    else if (url.includes("finish_homeground_newsletter")) { finishes.push(body); result = true; }
    else if (url === "https://api.resend.com/emails") {
      providers.push({ headers: options.headers, body });
      return new Response(JSON.stringify(providerStatus === 200 ? { id: "test-provider-id" } : { message: "private provider detail" }), { status: providerStatus });
    } else throw new Error("unexpected network request");
    return new Response(JSON.stringify(result), { status: 200 });
  };
  const request = () => new Request("https://project.supabase.co/functions/v1/v1-newsletter", { method: "POST",
    headers: { "Content-Type": "application/json", "x-newsletter-worker-secret": workerSecret }, body: '{"action":"retry"}' });
  assert.equal((await handleNewsletterRequest(request())).status, 200);
  assert.equal(finishes[0].p_retryable, true); assert.equal(finishes[0].p_accepted, false);
  assert.equal(finishes[0].p_error_code, "provider_retry");
  providerStatus = 200;
  assert.equal((await handleNewsletterRequest(request())).status, 200);
  assert.equal(finishes[1].p_accepted, true);
  assert.deepEqual(providers[0], providers[1]);
  assert.equal(providers[0].headers["Idempotency-Key"], `newsletter-${jobId}`);
  assert.ok(providers[0].body.text.includes(`/zh/newsletter/confirm/#token=${token("confirm")}`));
  assert.ok(providers[0].body.text.includes(`/zh/newsletter/unsubscribe/#token=${token("unsubscribe")}`));
  assert.ok(!JSON.stringify(finishes).includes(token("confirm")));
  env.set("NEWSLETTER_TOKEN_SECRET", "rotated-token-secret-".repeat(3));
  assert.equal((await handleNewsletterRequest(request())).status, 200);
  assert.equal(providers.length, 2); assert.equal(finishes.at(-1).p_error_code, "token_configuration");
});

test("newsletter administrator route requires existing MFA, validates pagination, and rejects unexpected PII fields", async (t) => {
  const previousDeno = globalThis.Deno; const previousFetch = globalThis.fetch;
  const userId = randomUUID(); const cursor = randomUUID();
  const env = new Map([["ADMIN_API_ENABLED", "true"], ["ADMIN_ALLOWED_ORIGIN", "https://homegroundchina.com"],
    ["ADMIN_ALLOWED_USER_IDS", userId], ["NEWSLETTER_ADMIN_ENABLED", "true"],
    ["SUPABASE_PUBLISHABLE_KEY", "test-publishable-key"], ["SUPABASE_URL", "https://project.supabase.co"],
    ["SUPABASE_SERVICE_ROLE_KEY", "test-service-key"]]);
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve() {} };
  t.after(() => { globalThis.Deno = previousDeno; globalThis.fetch = previousFetch; });
  const { handleAdminNewsletter } = await import("../functions/admin-newsletter/index.ts");
  const rpcCalls = []; let unexpectedField = false;
  globalThis.fetch = async (input, options) => {
    const url = String(input);
    if (url.endsWith("/auth/v1/user")) return new Response(JSON.stringify({ id: userId }), { status: 200 });
    if (!url.includes("get_homeground_newsletter_admin_v1")) throw new Error("unexpected request");
    rpcCalls.push(JSON.parse(options.body));
    return new Response(JSON.stringify({ contractVersion: "homeground-newsletter-admin.v1", counts: { pending: 0, active: 0, unsubscribed: 0, suppressed: 0 },
      subscribers: [], nextCursor: null, ...(unexpectedField ? { rawToken: "should-never-be-returned" } : {}) }), { status: 200 });
  };
  const token = (aal) => { const now = Math.floor(Date.now() / 1000); return [
    { alg: "none" }, { sub: userId, iss: "https://project.supabase.co/auth/v1", aud: "authenticated", iat: now - 10, exp: now + 600, aal },
  ].map((item) => Buffer.from(JSON.stringify(item)).toString("base64url")).join(".") + ".test-only"; };
  const request = (aal = "aal2", suffix = "") => new Request(`https://project.supabase.co/functions/v1/admin-newsletter${suffix}`, {
    headers: { Origin: "https://homegroundchina.com", apikey: "test-publishable-key", Authorization: `Bearer ${token(aal)}` },
  });
  assert.equal((await handleAdminNewsletter(request("aal1"))).status, 403);
  assert.equal(rpcCalls.length, 0);
  assert.equal((await handleAdminNewsletter(request("aal2", `?status=pending&cursor=${cursor}`))).status, 200);
  assert.deepEqual(rpcCalls[0], { p_admin_user_id: userId, p_status: "pending", p_cursor: cursor });
  assert.equal((await handleAdminNewsletter(request("aal2", "?export=true"))).status, 503);
  assert.equal(rpcCalls.length, 1);
  unexpectedField = true;
  const rejected = await handleAdminNewsletter(request());
  assert.equal(rejected.status, 503); assert.ok(!(await rejected.text()).includes("should-never-be-returned"));
});
