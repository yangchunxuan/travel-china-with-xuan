import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import {
  trafficEventsContractVersion,
  trafficEventsContractVersionV2,
  trafficEventsNoticeVersion,
  trafficEventsNoticeVersionV2,
  trafficReferrerAttribution,
  validateAndNormalizeTrafficEventBatch,
  validateAndNormalizeTrafficSessionStart,
} from "../functions/_shared/traffic-contracts.ts";

const sessionToken = "6b0f7a4e-3c1d-4f2e-9a8b-7c6d5e4f3a21";
const entryPath = "/ko/";
const unknown = { utmSource: null, utmMedium: null, utmCampaign: null, utmContent: null };
const env = new Map(Object.entries({
  ALLOWED_ORIGINS: "https://homegroundchina.com", TRAFFIC_EVENTS_ENABLED: "true",
  SUPABASE_URL: "https://project.supabase.co", SUPABASE_SECRET_KEYS: JSON.stringify({ default: "server-test-key" }),
  TRAFFIC_SESSION_HASH_SECRET: "session-hash-secret-000000000000000001",
  TRAFFIC_RATE_LIMIT_HASH_SECRET: "rate-limit-secret-000000000000000002",
  TRAFFIC_SESSION_CREDENTIAL_SECRET: "credential-secret-000000000000000003",
  TRAFFIC_ATTRIBUTION_LINK_SIGNING_SECRET: "attribution-secret-00000000000000004",
}));
const hmac = (secret, message) => createHmac("sha256", env.get(secret)).update(message).digest("hex");

function start(overrides = {}, version = 2) {
  return {
    requestType: "start_session",
    contractVersion: version === 2 ? trafficEventsContractVersionV2 : trafficEventsContractVersion,
    noticeVersion: version === 2 ? trafficEventsNoticeVersionV2 : trafficEventsNoticeVersion,
    sessionToken, locale: "ko", entryPath, attribution: unknown, attributionSignature: null, ...overrides,
  };
}
function batch(sessionCredential, overrides = {}, event = {}) {
  const { requestType: _ignored, ...shared } = start(overrides);
  return {
    ...shared, requestType: "events", sessionCredential,
    events: [{ eventId: "0d7c6b5a-4e3f-4a1b-8c2d-9e8f7a6b5c4d", type: "contact_channel_clicked", pagePath: entryPath, actionCode: "kakao",
      clientSequence: 1, productSlug: null, packageId: null, travelers: null, surface: "contact_options", errorCode: null, ...event }],
  };
}
function legacyCredentialMessage(expiresAt, attribution = unknown) {
  return ["homeground-traffic-session.v1", trafficEventsContractVersionV2, trafficEventsNoticeVersionV2, expiresAt, sessionToken, "ko", entryPath,
    attribution.utmSource ?? "", attribution.utmMedium ?? "", attribution.utmCampaign ?? "", attribution.utmContent ?? ""].join("\n");
}

test("the contract keeps only the fixed Naver class and ignores unknown or spoofed values without failing", () => {
  assert.equal(validateAndNormalizeTrafficSessionStart(start()).value.referrerClass, null);
  assert.equal(validateAndNormalizeTrafficSessionStart(start({ referrerClass: "naver" })).value.referrerClass, "naver");
  for (const spoofed of ["evilnaver.com", "naver.com.evil.io", "https://search.naver.com/", "NAVER", "kakao", "", null, 1, {}, ["naver"]]) {
    const result = validateAndNormalizeTrafficSessionStart(start({ referrerClass: spoofed }));
    assert.equal(result.ok, true, JSON.stringify(spoofed));
    assert.equal(result.value.referrerClass, null);
    const events = validateAndNormalizeTrafficEventBatch(batch(`v1.1999999999.${"a".repeat(64)}`, { referrerClass: spoofed }));
    assert.equal(events.ok, true, JSON.stringify(events));
    assert.equal(events.value.referrerClass, null);
  }
  assert.deepEqual(trafficReferrerAttribution.naver, { utmSource: "naver", utmMedium: "referral", utmCampaign: null, utmContent: "referrer" });
});

test("KakaoTalk is a v2 contact action; v1 keeps its original three channels", () => {
  const v2 = validateAndNormalizeTrafficEventBatch(batch(`v1.1999999999.${"a".repeat(64)}`));
  assert.equal(v2.ok, true, JSON.stringify(v2));
  assert.equal(v2.value.events[0].actionCode, "kakao");
  const v1 = validateAndNormalizeTrafficEventBatch({ ...batch(`v1.1999999999.${"a".repeat(64)}`), contractVersion: trafficEventsContractVersion, noticeVersion: trafficEventsNoticeVersion,
    events: [{ eventId: "0d7c6b5a-4e3f-4a1b-8c2d-9e8f7a6b5c4d", type: "contact_channel_clicked", pagePath: entryPath, actionCode: "kakao" }] });
  assert.equal(v1.ok, false);
  assert.equal(v1.fieldErrors["events.0.actionCode"], "invalid");
  const line = validateAndNormalizeTrafficEventBatch(batch(`v1.1999999999.${"a".repeat(64)}`, {}, { actionCode: "line" }));
  assert.equal(line.ok, false);
});

test("Edge attribution: signed links win, Naver referrer falls back, others stay Unknown and credentials stay bound", async () => {
  const originalDeno = globalThis.Deno; const originalFetch = globalThis.fetch; const originalWarn = console.warn;
  let handler; const calls = [];
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve: (value) => { handler = value; } };
  globalThis.fetch = async (input, init) => {
    const rpc = String(input).split("/").at(-1); const args = JSON.parse(init.body); calls.push({ rpc, args });
    return new Response(JSON.stringify(rpc === "consume_homeground_traffic_session_start_rate_limit_v1"
      ? { outcome: "allowed" } : { outcome: "created", acceptedCount: 1, replayedCount: 0 }), { status: 200 });
  };
  console.warn = () => {};
  const send = async (body) => handler(new Request("https://project.supabase.co/functions/v1/v1-traffic-events", {
    method: "POST", headers: { Origin: "https://homegroundchina.com", "Content-Type": "application/json" }, body: JSON.stringify(body),
  }));
  const written = () => { const args = calls.at(-1).args; return { utmSource: args.p_utm_source, utmMedium: args.p_utm_medium, utmCampaign: args.p_utm_campaign, utmContent: args.p_utm_content }; };
  try {
    await import(`../functions/v1-traffic-events/index.ts?referrer=${Date.now()}`);

    // Missing field: unchanged behaviour and the original credential message.
    let ready = await (await send(start())).json();
    let expiresAt = ready.sessionCredential.split(".")[1];
    assert.equal(ready.attributionState, "unknown");
    assert.equal(ready.sessionCredential, `v1.${expiresAt}.${hmac("TRAFFIC_SESSION_CREDENTIAL_SECRET", legacyCredentialMessage(expiresAt))}`);
    assert.equal((await send(batch(ready.sessionCredential))).status, 202);
    assert.deepEqual(written(), unknown);

    // Naver referrer without a signed link: fixed fallback labels.
    const naver = { referrerClass: "naver" };
    ready = await (await send(start(naver))).json();
    expiresAt = ready.sessionCredential.split(".")[1];
    assert.equal(ready.attributionState, "referrer");
    assert.equal(ready.sessionCredential, `v1.${expiresAt}.${hmac("TRAFFIC_SESSION_CREDENTIAL_SECRET", `${legacyCredentialMessage(expiresAt, trafficReferrerAttribution.naver)}\nreferrer:naver`)}`);
    const response = await send(batch(ready.sessionCredential, naver));
    assert.equal(response.status, 202);
    assert.equal(calls.at(-1).rpc, "record_homeground_traffic_events_v2");
    assert.deepEqual(written(), { utmSource: "naver", utmMedium: "referral", utmCampaign: null, utmContent: "referrer" });
    assert.equal(calls.at(-1).args.p_events[0].actionCode, "kakao");
    // The credential is bound to the referrer basis: dropping or spoofing the class is refused.
    let before = calls.length;
    assert.equal((await send(batch(ready.sessionCredential))).status, 401);
    assert.equal((await send(batch(ready.sessionCredential, { referrerClass: "evilnaver.com" }))).status, 401);
    assert.equal(calls.length, before);

    // A valid signed link always wins over a Naver referrer.
    const signed = { utmSource: "newsletter", utmMedium: "email", utmCampaign: "autumn-2026", utmContent: null };
    const attributionSignature = hmac("TRAFFIC_ATTRIBUTION_LINK_SIGNING_SECRET", ["homeground-attribution-link.v1", entryPath, "newsletter", "email", "autumn-2026", ""].join("\n"));
    const signedFields = { attribution: signed, attributionSignature, referrerClass: "naver" };
    ready = await (await send(start(signedFields))).json();
    expiresAt = ready.sessionCredential.split(".")[1];
    assert.equal(ready.attributionState, "verified");
    assert.equal(ready.sessionCredential, `v1.${expiresAt}.${hmac("TRAFFIC_SESSION_CREDENTIAL_SECRET", legacyCredentialMessage(expiresAt, signed))}`);
    assert.equal((await send(batch(ready.sessionCredential, signedFields))).status, 202);
    assert.deepEqual(written(), signed);

    // An altered signed link with a Naver referrer falls back to Naver, never to the forged labels.
    const forged = { attribution: { ...signed, utmCampaign: "forged" }, attributionSignature, referrerClass: "naver" };
    ready = await (await send(start(forged))).json();
    assert.equal(ready.attributionState, "referrer");
    assert.equal((await send(batch(ready.sessionCredential, forged))).status, 202);
    assert.deepEqual(written(), trafficReferrerAttribution.naver);

    // Spoofed classes are ignored and the session stays Unknown.
    for (const referrerClass of ["evilnaver.com", "naver.com.evil.io", "Naver"]) {
      ready = await (await send(start({ referrerClass }))).json();
      assert.equal(ready.attributionState, "unknown");
      assert.equal((await send(batch(ready.sessionCredential, { referrerClass }))).status, 202);
      assert.deepEqual(written(), unknown);
    }
    assert.equal(JSON.stringify(calls).includes("search.naver"), false);
  } finally {
    globalThis.Deno = originalDeno; globalThis.fetch = originalFetch; console.warn = originalWarn;
  }
});
