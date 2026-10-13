import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createIsolatedInquiryDatabase } from "../../tools/run-inquiry-recovery-drill.mjs";
import { normalizeAdAttribution, adAttributionVersion, adAttributionConsentVersion } from "../../lib/adAttributionContract.ts";
import { dataManagerRequest, dataManagerProcessingStatus, runAdConversionWorker } from "../functions/_shared/ad-conversion-worker.ts";

const ad = (overrides = {}) => ({ version: adAttributionVersion, clickIdType: "gclid", clickId: "Fixture_CaseSensitive-Click_123",
  capturedAt: new Date(Date.now() - 5000).toISOString(), landingPath: "/tours/",
  consent: "granted", consentVersion: adAttributionConsentVersion, consentUpdatedAt: new Date(Date.now() - 10000).toISOString(),
  revocationToken: randomUUID(), ...overrides });
test("ad transport rejects excess fields, revoked/old consent, unsafe IDs, URLs, timestamps and stale clicks", () => {
  const valid = ad(); assert.equal(normalizeAdAttribution(valid)?.clickId, valid.clickId);
  for (const value of [null, [], { ...valid, email: "private@example.invalid" }, { ...valid, consent: "denied" },
    { ...valid, consentVersion: "2026-09-05.1" }, { ...valid, clickId: "has space" }, { ...valid, clickId: "x".repeat(513) },
    { ...valid, landingPath: "/?email=private" }, { ...valid, capturedAt: "yesterday" }, { ...valid, revocationToken: "guessable" },
    { ...valid, capturedAt: new Date(Date.now() - 91 * 86400000).toISOString() }, { ...valid, consentUpdatedAt: new Date().toISOString() }]) assert.equal(normalizeAdAttribution(value), null);
});
test("Data Manager status requires the exact destination and never equates processing or partial success with acceptance", () => {
  const response = (requestStatus) => ({ requestStatusPerDestination: [{ destination: { operatingAccount: { accountType: "GOOGLE_ADS", accountId: "1234567890" }, productDestinationId: "123" }, requestStatus }] });
  assert.equal(dataManagerProcessingStatus(response("SUCCESS"), "1234567890", "123"), "accepted");
  assert.equal(dataManagerProcessingStatus(response("SUCCESS"), "1234567890", "456"), "processing");
  assert.equal(dataManagerProcessingStatus(response("PROCESSING"), "1234567890", "123"), "processing");
  assert.equal(dataManagerProcessingStatus(response("PARTIAL_SUCCESS"), "1234567890", "123"), "failed");
});

test("click → real intake → admin first payment → Data Manager queue, isolated DB and blocked external network", { timeout: 120000 }, async (t) => {
  let db;
  try { db = createIsolatedInquiryDatabase(); }
  catch (error) { if (error.code === "ENOENT" && process.env.CI !== "true" && process.env.REQUIRE_ISOLATED_POSTGRES !== "true") { t.skip("disposable PostgreSQL unavailable"); return; } throw error; }
  t.after(() => db.close());
  await t.test("production rollback acceptance script leaves no inquiry, outbox, payment, click, or audit fixture behind", () => {
    db.sql(readFileSync(new URL("./ad-conversions-rollback.sql", import.meta.url), "utf8"));
    for (const table of ["inquiries", "notification_outbox", "inquiry_ad_attribution", "inquiry_ad_conversion_events", "ad_attribution_withdrawals", "inquiry_conversion_admin_audit"]) {
      assert.equal(db.sql(`select count(*) from homeground_private.${table};`), "0");
    }
  });
  const originalFetch = globalThis.fetch, originalDeno = globalThis.Deno;
  const origin = "https://conversion-fixture.invalid", base = "https://project.supabase.co", adminId = randomUUID(); let handler, remoteStatus = "PROCESSING";
  const requests = [], rpcCalls = [];
  const env = new Map(Object.entries({ ALLOWED_ORIGINS: origin, ALLOWED_FORM_VERSIONS: "2026-07-26.1", ALLOWED_PRIVACY_NOTICE_VERSIONS: "2026-07-26.1",
    SUPABASE_URL: base, SUPABASE_SECRET_KEYS: JSON.stringify({ default: "isolated-server-key" }), SUPABASE_PUBLISHABLE_KEY: "sb_publishable_fixture",
    IDEMPOTENCY_HASH_SECRET: "fixture-hash-secret", RATE_LIMIT_HASH_SECRET: "fixture-rate-secret", TRAVELLER_ACK_ENABLED: "false",
    RATE_LIMIT_10_MINUTES: "50", RATE_LIMIT_24_HOURS: "100",
    ADMIN_ALLOWED_ORIGIN: origin, ADMIN_API_ENABLED: "true", ADMIN_CONVERSIONS_ENABLED: "true", ADMIN_ALLOWED_USER_IDS: adminId,
    GOOGLE_ADS_WORKER_SECRET: "isolated-worker-secret-000000000000000000" }));
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve: (value) => { handler = value; } };
  globalThis.fetch = async (input, init = {}) => {
    const url = new URL(String(input));
    if (url.origin === base && url.pathname.startsWith("/rest/v1/rpc/")) {
      const name = url.pathname.split("/").at(-1), args = JSON.parse(init.body); rpcCalls.push(name);
      return Response.json(db.rpc(name, args));
    }
    if (url.href === `${base}/auth/v1/user`) return Response.json({ id: adminId });
    if (url.href === "https://oauth2.googleapis.com/token") { assert.match(init.body, /grant_type=refresh_token/u); return Response.json({ access_token: "isolated-google-token" }); }
    if (url.href === "https://datamanager.googleapis.com/v1/events:ingest") {
      const body = JSON.parse(init.body); assert.equal(init.headers.Authorization, "Bearer isolated-google-token");
      assert.equal(body.events.length, 1); assert.equal(body.events[0].eventSource, "WEB"); assert.equal(body.events[0].userData, undefined);
      assert.deepEqual(body.consent, { adUserData: "CONSENT_GRANTED", adPersonalization: "CONSENT_DENIED" });
      requests.push(body); return Response.json({ requestId: `request-${body.events[0].transactionId}` });
    }
    if (url.origin === "https://datamanager.googleapis.com" && url.pathname === "/v1/requestStatus:retrieve") {
      const prior = requests.find((item) => `request-${item.events[0].transactionId}` === url.searchParams.get("requestId")); assert.ok(prior);
      return Response.json({ requestStatusPerDestination: [{ destination: prior.destinations[0], requestStatus: remoteStatus }] });
    }
    throw new Error("external_network_forbidden_in_conversion_test");
  };
  t.after(() => { globalThis.fetch = originalFetch; globalThis.Deno = originalDeno; });
  await import(`../functions/v1-inquiries/index.ts?ads=${randomUUID()}`); const intake = handler;
  await import(`../functions/admin-conversions/index.ts?ads=${randomUUID()}`); const admin = handler;
  await import(`../functions/v1-ad-attribution-consent/index.ts?ads=${randomUUID()}`); const withdraw = handler;
  await import(`../functions/upload-ad-conversions/index.ts?ads=${randomUUID()}`); const upload = handler;
  const payload = (attribution) => ({ schemaVersion: 3, formVersion: "2026-07-26.1", entryPath: "homepage_email", locale: "en",
    contact: { channel: "email", email: "fixture@example.invalid" }, privacyNoticeVersion: "2026-07-26.1", attribution: { landingPath: "/" },
    experiment: null, antiAbuse: { companyWebsite: "" }, ...(attribution ? { adAttribution: attribution } : {}) });
  const submit = (attribution, key = randomUUID()) => intake(new Request(`${base}/functions/v1/v1-inquiries`, { method: "POST", headers: {
    Origin: origin, "Content-Type": "application/json", "Idempotency-Key": key, "X-Forwarded-For": "203.0.113.71" }, body: JSON.stringify(payload(attribution)) }));
  const jwt = (aal = "aal2") => { const now = Math.floor(Date.now() / 1000), encode = (v) => Buffer.from(JSON.stringify(v)).toString("base64url");
    return [encode({ alg: "ES256", typ: "JWT" }), encode({ sub: adminId, iss: `${base}/auth/v1`, aud: "authenticated", iat: now - 10, exp: now + 900, aal }), "fixture-signature"].join("."); };
  const adminRequest = (body, aal = "aal2") => admin(new Request(`${base}/functions/v1/admin-conversions`, { method: "POST", headers: {
    Origin: origin, "Content-Type": "application/json", apikey: "sb_publishable_fixture", Authorization: `Bearer ${jwt(aal)}` }, body: JSON.stringify(body) }));
  const count = (table) => Number(db.sql(`select count(*) from homeground_private.${table};`));
  const fixture = ad(), key = randomUUID(); let reference, paymentBody;
  const config = { accountId: "1234567890", loginAccountId: "1234567890", inquiryActionId: "123", paymentActionId: "456",
    clientId: "fixture-client", clientSecret: "fixture-client-secret", refreshToken: "fixture-refresh", validateOnly: true };

  await t.test("actual intake stores one private click and one inquiry event; replay cannot replace attribution", async () => {
    const response = await submit(fixture, key); assert.equal(response.status, 201, await response.clone().text()); reference = (await response.json()).publicReference;
    assert.equal(count("inquiry_ad_attribution"), 1); assert.equal(count("inquiry_ad_conversion_events"), 1);
    assert.equal((await submit(ad({ clickId: "Different_Fixture_Click" }), key)).status, 200);
    assert.equal(count("inquiry_ad_conversion_events"), 1); assert.equal(db.sql("select click_id from homeground_private.inquiry_ad_attribution;"), fixture.clickId);
    assert.equal((await submit(ad({ consent: "denied" }))).status, 201); assert.equal(count("inquiry_ad_attribution"), 1);
  });
  await t.test("admin requires MFA and explicit receipt of funds, stores once, and keeps raw identifiers private", async () => {
    assert.equal((await adminRequest({ action: "lookup", publicReference: reference }, "aal1")).status, 403);
    const lookup = await adminRequest({ action: "lookup", publicReference: reference }); assert.equal(lookup.status, 200);
    assert.doesNotMatch(await lookup.text(), /Fixture_CaseSensitive|fixture@example|revocationToken/u);
    paymentBody = { action: "record_payment", publicReference: reference, amount: 123.45, currency: "USD", occurredAt: new Date().toISOString(), paymentReceivedConfirmed: true };
    assert.equal((await adminRequest({ ...paymentBody, paymentReceivedConfirmed: false })).status, 400);
    const response = await adminRequest(paymentBody); assert.equal(response.status, 200, await response.clone().text());
    assert.equal((await response.json()).inquiry.events.find((e) => e.kind === "payment_received").amount, 123.45);
    assert.equal((await adminRequest(paymentBody)).status, 200);
    assert.equal((await adminRequest({ ...paymentBody, amount: 200 })).status, 409); assert.equal(count("inquiry_ad_conversion_events"), 2);
  });
  await t.test("worker is disabled by default and validateOnly never marks events submitted or accepted", async () => {
    const before = requests.length;
    const response = await upload(new Request(`${base}/functions/v1/upload-ad-conversions`, { method: "POST", headers: { "x-worker-secret": env.get("GOOGLE_ADS_WORKER_SECRET") } }));
    assert.equal((await response.json()).status, "disabled"); assert.equal(requests.length, before);
    const result = await runAdConversionWorker(config); assert.equal(result.validated, 2); assert.equal(result.submitted, 0);
    assert.equal(db.sql("select count(*) from homeground_private.inquiry_ad_conversion_events where status='pending' and attempt_count=0;"), "2");
    assert.ok(requests.every((r) => r.validateOnly === true));
    assert.equal(requests.find((r) => r.destinations[0].productDestinationId === "123").events[0].conversionValue, undefined);
    assert.equal(requests.find((r) => r.destinations[0].productDestinationId === "456").events[0].conversionValue, 123.45);
  });
  await t.test("submission and Google processing acceptance are distinct; accepted events do not resend", async () => {
    db.sql("update homeground_private.inquiry_ad_conversion_events set next_attempt_at=now()-interval '1 second';");
    const result = await runAdConversionWorker({ ...config, validateOnly: false }); assert.equal(result.submitted, 2); assert.equal(result.accepted, 0);
    assert.equal(db.sql("select count(*) from homeground_private.inquiry_ad_conversion_events where status='submitted';"), "2");
    const dispatched = requests.length; assert.equal((await runAdConversionWorker({ ...config, validateOnly: false })).accepted, 0);
    remoteStatus = "SUCCESS"; assert.equal((await runAdConversionWorker({ ...config, validateOnly: false })).accepted, 2); assert.equal(requests.length, dispatched);
    assert.equal((await runAdConversionWorker({ ...config, validateOnly: false })).submitted, 0);
  });
  await t.test("withdrawal removes every matching click, cancels leased work, and blocks late intake with the old token", async () => {
    assert.equal((await submit(fixture)).status, 201);
    const leased = db.rpc("claim_homeground_ad_conversions_v1", { p_account_id: config.accountId, p_inquiry_action_id: config.inquiryActionId, p_payment_action_id: config.paymentActionId }); assert.equal(leased.length, 1);
    const response = await withdraw(new Request(`${base}/functions/v1/v1-ad-attribution-consent`, { method: "POST", headers: { Origin: origin, "Content-Type": "application/json", "X-Forwarded-For": "203.0.113.71" }, body: JSON.stringify({ revocationToken: fixture.revocationToken }) }));
    assert.equal(response.status, 204); assert.equal(count("inquiry_ad_attribution"), 0);
    assert.equal(db.rpc("can_send_homeground_ad_conversion_v1", { p_event_id: leased[0].eventId, p_lease_token: leased[0].leaseToken }), false);
    assert.equal((await submit(fixture)).status, 201); assert.equal(count("inquiry_ad_attribution"), 0);
    assert.equal(db.sql("select count(*) from homeground_private.inquiry_ad_conversion_events where last_error_code='consent_withdrawn';"), "1");
  });
  await t.test("expired identifiers are deleted and anonymous roles cannot read private data", async () => {
    const newer = ad(); assert.equal((await submit(newer)).status, 201);
    db.sql("update homeground_private.inquiry_ad_attribution set captured_at=now()-interval '91 days',consent_updated_at=now()-interval '92 days';");
    assert.equal(db.rpc("prune_homeground_ad_attribution_v1", {}), 1); assert.equal(count("inquiry_ad_attribution"), 0);
    assert.equal(db.sql("select count(*) from homeground_private.inquiry_ad_conversion_events where last_error_code='click_expired';"), "1");
    assert.throws(() => db.sql("set role anon; select * from homeground_private.inquiry_ad_conversion_events;"));
    assert.throws(() => db.sql("set role authenticated; select * from homeground_private.inquiry_ad_attribution;"));
  });
  await t.test("verified test markers exclude claim and also stop a record marked after leasing", async () => {
    assert.equal((await submit(ad())).status, 201);
    db.sql("insert into homeground_private.inquiry_test_markers(inquiry_id,reason_code,marker_batch) select inquiry_id,'verified_test_submission','ads-isolated-fixture' from homeground_private.inquiry_ad_attribution;");
    assert.deepEqual(db.rpc("claim_homeground_ad_conversions_v1", { p_account_id: config.accountId, p_inquiry_action_id: config.inquiryActionId, p_payment_action_id: config.paymentActionId }), []);
    assert.equal((await submit(ad())).status, 201);
    const claimed = db.rpc("claim_homeground_ad_conversions_v1", { p_account_id: config.accountId, p_inquiry_action_id: config.inquiryActionId, p_payment_action_id: config.paymentActionId }); assert.equal(claimed.length, 1);
    db.sql(`insert into homeground_private.inquiry_test_markers(inquiry_id,reason_code,marker_batch) select inquiry_id,'verified_test_submission','ads-isolated-fixture' from homeground_private.inquiry_ad_conversion_events where event_id=${db.quote(claimed[0].eventId)};`);
    assert.equal(db.rpc("can_send_homeground_ad_conversion_v1", { p_event_id: claimed[0].eventId, p_lease_token: claimed[0].leaseToken }), false);
  });
});
