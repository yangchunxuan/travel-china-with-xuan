import assert from "node:assert/strict";
import { createHash, createHmac } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  trafficEventTypesV2, trafficProductPackages,
  validateAndNormalizeTrafficEventBatch, validateAndNormalizeTrafficSessionStart,
} from "../functions/_shared/traffic-contracts.ts";
import { sanitizeAdminTrafficRpc } from "../functions/_shared/admin-traffic-contracts.ts";

const sessionToken = "00fe38bc-91a2-4e5e-8c13-32a49abfa095";
const eventId = "286f3e1f-b988-4d20-b4aa-af47dde79708";
const slug = "beijing-highlights-5-day-private-tour";
function start(version = 2) {
  return {
    requestType: "start_session", contractVersion: `homeground-traffic-events.v${version}`,
    noticeVersion: version === 2 ? "2026-09-05.1" : "2026-07-31.1", sessionToken,
    locale: "en", entryPath: "/en/tours/",
    attribution: { utmSource: null, utmMedium: null, utmCampaign: null, utmContent: null },
    attributionSignature: null,
  };
}
function event(type = "page_view") {
  return {
    eventId, type, pagePath: "/en/tours/", actionCode: null, clientSequence: 1,
    productSlug: slug, packageId: null, travelers: null, surface: "product", errorCode: null,
    ...(["contact_channel_clicked", "contact_channel_selected"].includes(type) ? { actionCode: "email" } : {}),
    ...(type === "product_selection_changed" ? { packageId: "no-guide", travelers: 4 } : {}),
    ...(["enquiry_submit_failed", "enquiry_submit_uncertain"].includes(type) ? { errorCode: "network" } : {}),
  };
}
function batch(candidate = event(), version = 2, credential = `v1.9999999999.${"a".repeat(64)}`) {
  return { ...start(version), requestType: "events", sessionCredential: credential, events: [candidate] };
}

test("v2 accepts exact version/notice pairs and bounded journey types without changing v1 shape", () => {
  for (const version of [1, 2]) {
    const input = start(version);
    assert.equal(validateAndNormalizeTrafficSessionStart(input).ok, true);
    input.noticeVersion = version === 1 ? "2026-09-05.1" : "2026-07-31.1";
    assert.equal(validateAndNormalizeTrafficSessionStart(input).ok, false);
  }
  for (const type of trafficEventTypesV2) {
    assert.equal(validateAndNormalizeTrafficEventBatch(batch(event(type))).ok, true, type);
  }
  const v1 = { eventId, type: "page_view", pagePath: "/en/tours/", actionCode: null };
  assert.deepEqual(validateAndNormalizeTrafficEventBatch(batch(v1, 1)).value.events, [v1]);
  assert.equal(validateAndNormalizeTrafficEventBatch(batch(event(), 1)).ok, false);
  assert.equal(validateAndNormalizeTrafficEventBatch(batch(event("enquiry_submitted"))).ok, false);
});

test("v2 product selections use published products and exact package/numeric party combinations", () => {
  assert.equal(Object.keys(trafficProductPackages).length, 10);
  for (const [productSlug, packages] of Object.entries(trafficProductPackages)) {
    assert.equal(validateAndNormalizeTrafficEventBatch(batch({ ...event(), productSlug })).ok, true);
    for (const packageId of packages) for (const travelers of [2, 4]) {
      assert.equal(validateAndNormalizeTrafficEventBatch(batch({
        ...event("product_selection_changed"), productSlug, packageId, travelers,
      })).ok, true);
    }
  }
  for (const change of [
    { productSlug: "private-person-name" }, { productSlug: "__proto__" },
    { packageId: "standard-guided", travelers: 4 }, { packageId: "no-guide", travelers: "4" },
    { packageId: "no-guide", travelers: 3 }, { packageId: null, travelers: 4 },
    { packageId: "no-guide", travelers: null }, { productSlug: null, packageId: "no-guide", travelers: 2 },
  ]) assert.equal(validateAndNormalizeTrafficEventBatch(batch({ ...event(), ...change })).ok, false, JSON.stringify(change));
  assert.equal(validateAndNormalizeTrafficEventBatch(batch({ ...event("product_selection_changed"), packageId: null, travelers: null })).ok, false);
});

test("v2 rejects raw fields, impossible action/error combinations and unsafe sequences", () => {
  for (const change of [
    { clientSequence: 0 }, { clientSequence: 1000001 }, { clientSequence: 1.5 }, { clientSequence: "1" },
    { pagePath: "/en/?email=person" }, { contact: "person@example.com" },
    { surface: "arbitrary" }, { errorCode: "network" }, { actionCode: "email" },
  ]) assert.equal(validateAndNormalizeTrafficEventBatch(batch({ ...event(), ...change })).ok, false);
  for (const type of ["enquiry_submit_failed", "enquiry_submit_uncertain"]) {
    assert.equal(validateAndNormalizeTrafficEventBatch(batch({ ...event(type), errorCode: "raw exception" })).ok, false);
    assert.equal(validateAndNormalizeTrafficEventBatch(batch({ ...event(type), actionCode: "email" })).ok, false);
  }
  const withoutOptional = { eventId, type: "page_view", pagePath: "/", clientSequence: 1000000 };
  const normalized = validateAndNormalizeTrafficEventBatch(batch(withoutOptional));
  assert.equal(normalized.ok, true);
  assert.equal(normalized.value.events[0].surface, null);
});

const cell = (count = 5) => ({ count, suppressed: false });
function adminPayload() {
  return {
    contractVersion: "homeground-admin-traffic.v2", generatedAt: "2026-09-05T08:00:00.000Z", timezone: "Asia/Shanghai",
    window: { days: 30, startsAt: "2026-08-06T08:00:00.000Z", endsAt: "2026-09-05T08:00:00.000Z" },
    totals: Object.fromEntries(["sessions", "pageViews", "contactClickAttempts", "emailFormStarts",
      "attributedEnquiries", "unknownSourceSessions", "productViews", "productSelections",
      "formSubmitAttempts", "formSubmitFailures", "formSubmitUncertain"].map((key) => [key, cell()])),
    dimensions: { sources: [], campaigns: [], pages: [],
      products: [{ bucketType: "value", label: slug, ...cell() }],
      productSelections: [{ bucketType: "value", label: `${slug}|no-guide|4`, ...cell() }] },
    recentSessions: [],
    limits: { minimumVisibleCount: 5, maximumRecentSessions: 12, recentSessionsMinimumEligibleCount: 5,
      perSessionEventsIncluded: false, timeResolution: "day", linkedInquirySessionsExcluded: true,
      sessionLabelScope: "current_30_day_window" },
    notice: { scope: "Consented anonymous sessions; not people, customers, or market share.",
      clickMeaning: "A contact-channel click does not prove that a message was sent." },
  };
}

test("admin v2 validates product dimensions while preserving suppression and no-timeline boundaries", () => {
  const input = adminPayload();
  assert.deepEqual(sanitizeAdminTrafficRpc([{ payload: input }]), input);
  for (const mutate of [
    (p) => { p.totals.productSelections = cell(1); },
    (p) => { p.dimensions.products[0].label = "person@example.com"; },
    (p) => { p.dimensions.productSelections[0].label = `${slug}|standard-guided|4`; },
    (p) => { p.dimensions.productSelections[0].label = `${slug}|no-guide|04`; },
    (p) => { p.dimensions.products.push(p.dimensions.products[0]); },
    (p) => { p.dimensions.products[0].sessionHash = "a".repeat(64); },
    (p) => { p.limits.perSessionEventsIncluded = true; },
    (p) => { p.totals.clientSuccess = cell(); },
    (p) => { p.dimensions.sources = Array.from({ length: 31 }, (_, i) => ({
      bucketType: "value", label: `source-${i}`, ...cell(),
    })); },
  ]) {
    const invalid = structuredClone(input); mutate(invalid);
    assert.equal(sanitizeAdminTrafficRpc([{ payload: invalid }]), null);
  }
  input.dimensions.products = [{ bucketType: "suppressed", label: null, count: null, suppressed: true }];
  assert.ok(sanitizeAdminTrafficRpc([{ payload: input }]));
});

test("v2 collector binds credentials to version, preserves legacy hashes and forwards only normalized fields", async () => {
  const originalDeno = globalThis.Deno;
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  const env = new Map(Object.entries({
    ALLOWED_ORIGINS: "https://homegroundchina.com", TRAFFIC_EVENTS_ENABLED: "true",
    SUPABASE_URL: "https://project.supabase.co", SUPABASE_SECRET_KEYS: JSON.stringify({ default: "server-test-key" }),
    TRAFFIC_SESSION_HASH_SECRET: "session-hash-secret-000000000000000001",
    TRAFFIC_RATE_LIMIT_HASH_SECRET: "rate-limit-secret-000000000000000002",
    TRAFFIC_SESSION_CREDENTIAL_SECRET: "credential-secret-000000000000000003",
    TRAFFIC_ATTRIBUTION_LINK_SIGNING_SECRET: "attribution-secret-00000000000000004",
  }));
  let handler;
  const calls = [];
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve: (value) => { handler = value; } };
  globalThis.fetch = async (input, init) => {
    const rpc = String(input).split("/").at(-1);
    const args = JSON.parse(init.body); calls.push({ rpc, args });
    return new Response(JSON.stringify(rpc === "consume_homeground_traffic_session_start_rate_limit_v1"
      ? { outcome: "allowed" } : { outcome: "created", acceptedCount: 1, replayedCount: 0 }), { status: 200 });
  };
  console.warn = () => {};
  const send = (body) => handler(new Request("https://project.supabase.co/functions/v1/v1-traffic-events", {
    method: "POST", headers: { Origin: "https://homegroundchina.com", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }));
  try {
    await import(`../functions/v1-traffic-events/index.ts?journey=${Date.now()}`);
    const v1Ready = await (await send(start(1))).json();
    const expiresAt = v1Ready.sessionCredential.split(".")[1];
    const oldMessage = ["homeground-traffic-session.v1", "homeground-traffic-events.v1", "2026-07-31.1",
      expiresAt, sessionToken, "en", "/en/tours/", "", "", "", ""].join("\n");
    assert.equal(v1Ready.sessionCredential, `v1.${expiresAt}.${createHmac("sha256", env.get("TRAFFIC_SESSION_CREDENTIAL_SECRET")).update(oldMessage).digest("hex")}`);
    const legacy = { eventId, type: "page_view", pagePath: "/en/tours/", actionCode: null };
    assert.equal((await send(batch(legacy, 1, v1Ready.sessionCredential))).status, 202);
    const oldWrite = calls.at(-1);
    assert.equal(oldWrite.rpc, "record_homeground_traffic_events_v1");
    assert.deepEqual(oldWrite.args.p_events, [{ ...legacy, payloadHash: createHash("sha256").update(JSON.stringify(legacy)).digest("hex") }]);
    const v2Ready = await (await send(start())).json();
    assert.equal(v2Ready.contractVersion, "homeground-traffic-events.v2");
    const before = calls.length;
    assert.equal((await send(batch(event(), 2, v1Ready.sessionCredential))).status, 401);
    assert.equal(calls.length, before);
    const response = await send(batch(event("product_selection_changed"), 2, v2Ready.sessionCredential));
    assert.equal(response.status, 202);
    assert.equal((await response.json()).contractVersion, "homeground-traffic-events.v2");
    const write = calls.at(-1);
    assert.equal(write.rpc, "record_homeground_traffic_events_v2");
    assert.equal(write.args.p_events[0].travelers, 4);
    assert.equal(write.args.p_events[0].clientSequence, 1);
    assert.equal(write.args.p_session_hash, oldWrite.args.p_session_hash);
    const beforeInvalid = calls.length;
    assert.equal((await send(batch({ ...event(), email: "person@example.com" }, 2, v2Ready.sessionCredential))).status, 422);
    assert.equal(calls.length, beforeInvalid);
  } finally {
    globalThis.Deno = originalDeno; globalThis.fetch = originalFetch; console.warn = originalWarn;
  }
});

test("migration keeps legacy RPCs, separates real inquiries and restricts synthetic markers to service-only access", async () => {
  const sql = await readFile(new URL("../migrations/202609050002_homeground_customer_journey.sql", import.meta.url), "utf8");
  assert.doesNotMatch(sql, /create or replace function public\.(?:record_homeground_traffic_events_v1|get_homeground_admin_traffic)\(/);
  assert.match(sql, /join homeground_private\.non_test_inquiries inquiry using \(inquiry_id\)/);
  assert.match(sql, /not exists \(select 1 from homeground_private\.traffic_test_markers marker/);
  assert.match(sql, /references homeground_private\.traffic_sessions\(session_hash\) on delete cascade/);
  assert.match(sql, /traffic_test_markers force row level security/);
  assert.match(sql, /revoke all on table homeground_private\.traffic_test_markers from public, anon, authenticated, service_role/);
  assert.match(sql, /grant execute on function public\.mark_homeground_traffic_test_session_v1\(uuid\) to service_role/);
  assert.doesNotMatch(sql, /to (?:anon|authenticated);/);
  assert.doesNotMatch(sql, /'enquiry_submitted'|'enquiry_submit_succeeded'/);
  assert.match(sql, /'perSessionEventsIncluded', false/);
  assert.match(sql, /'linkedInquirySessionsExcluded', true/);
  assert.match(sql, /limit greatest\(0, 30 - \(select bucket_count from reserved\)\)/);
});
