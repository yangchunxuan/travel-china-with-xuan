import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import test from "node:test";
import {
  currentPrivateTourQuoteFormVersion, privateTourQuoteSchemaVersion,
  currentHomepageEmailFormVersion, homepageEmailPrivacyNoticeVersion,
  validateAndNormalizeInquiry, semanticInquiryPayload, canonicalizeJson,
} from "../../lib/inquiryContract.ts";
import { getPrivateTourInquiryContext, getPrivateTourInquirySelection, privateTourInquirySlugs } from "../../lib/privateTourInquiryContext.ts";

const config = { allowedFormVersions: [currentPrivateTourQuoteFormVersion, currentHomepageEmailFormVersion], allowedPrivacyNoticeVersions: [homepageEmailPrivacyNoticeVersion] };
export const quotePayload = (locale = "en", slug = "beijing-highlights-5-day-private-tour", selection = { packageId: "no-guide", travelers: 4 }) => ({
  schemaVersion: privateTourQuoteSchemaVersion, formVersion: currentPrivateTourQuoteFormVersion,
  entryPath: "private_tour_quote", locale,
  contact: { channel: "email", email: "Traveller@Example.invalid" },
  productInterest: getPrivateTourInquiryContext(slug, locale, selection ?? undefined),
  travelDate: "2026-12-15", note: "A quieter pace, please.\nTwo rooms.",
  privacyNoticeVersion: homepageEmailPrivacyNoticeVersion,
  attribution: { landingPath: `${locale === "en" ? "" : `/${locale}`}/tours/${slug}/` },
  experiment: null, antiAbuse: { companyWebsite: "" },
});
const normalized = (input) => { const result = validateAndNormalizeInquiry(input, config); assert.equal(result.ok, true, JSON.stringify(result)); return result.value; };
const semantic = (input) => canonicalizeJson(semanticInquiryPayload(normalized(input)));

test("quote contract retains every valid localized product selection and classic identity-only tour", () => {
  for (const locale of ["en", "zh", "ko"]) {
    for (const slug of privateTourInquirySlugs) {
      if (slug === "zhangjiajie-4-day-private-tour") {
        const value = normalized(quotePayload(locale, slug, null));
        assert.equal(Object.hasOwn(value.productInterest, "selection"), false);
      }
      for (const packageId of ["standard-guided", "standard-guided-winter", "english-guided", "no-guide", "fixed-route-english-guided"]) {
        for (const travelers of [2, 4]) {
          const selection = getPrivateTourInquirySelection(slug, packageId, travelers);
          if (!selection) continue;
          const input = quotePayload(locale, slug, selection);
          const result = normalized(input);
          assert.deepEqual(result.productInterest, input.productInterest);
          assert.equal(result.travelDate, input.travelDate);
          assert.equal(result.note, input.note);
          assert.equal(result.attribution.landingPath, input.attribution.landingPath);
        }
      }
    }
  }
});

test("quote rejects impossible dates, forged context, cross-locale paths and excess/free-form fields", () => {
  const base = quotePayload();
  for (const value of ["2026-02-29", "2026-02-30", "2026-04-31", "0000-01-01", "2026-13-01", "2026-1-01", "2026-01-01T00:00:00Z", "", undefined, 123]) {
    assert.equal(validateAndNormalizeInquiry({ ...base, travelDate: value }, config).ok, false, String(value));
  }
  assert.equal(normalized({ ...base, travelDate: "2028-02-29" }).travelDate, "2028-02-29");
  assert.equal(normalized({ ...base, travelDate: null, note: null }).travelDate, null);
  assert.equal(normalized({ ...base, note: " x\r\ny " }).note, "x\ny");
  assert.equal(normalized({ ...base, note: "中".repeat(1000) }).note.length, 1000);
  for (const change of [
    { note: "中".repeat(1001) }, { note: undefined }, { note: "bad\u202evalue" },
    { productInterest: null }, { productInterest: { ...base.productInterest, name: "Forged tour" } },
    { productInterest: { ...base.productInterest, selection: { packageId: "no-guide", travelers: "4" } } },
    { productInterest: { ...base.productInterest, selection: { packageId: "no-guide", travelers: 3 } } },
    { productInterest: { ...base.productInterest, selection: { travelers: 4 } } },
    { productInterest: { ...base.productInterest, selection: { packageId: "no-guide", travelers: 4, price: 1 } } },
    { formVersion: currentHomepageEmailFormVersion }, { entryPath: "homepage_email" },
    { attribution: { landingPath: "/" } }, { attribution: { landingPath: `/zh${base.attribution.landingPath}` } },
    { attribution: { landingPath: `${base.attribution.landingPath}?email=leak` } },
    { attribution: { landingPath: base.attribution.landingPath, utmSource: "ad" } },
    { contact: { channel: "whatsapp", phoneE164: "+12025550123" } },
    { antiAbuse: { companyWebsite: "robot" } }, { travelers: 6 },
  ]) assert.equal(validateAndNormalizeInquiry({ ...base, ...change }, config).ok, false, JSON.stringify(change));
});

test("date, notes, product and group participate in retry identity while homepage shape remains unchanged", () => {
  const base = quotePayload(); const hash = semantic(base);
  for (const change of [{ travelDate: null }, { note: "Different needs" }, { productInterest: { ...base.productInterest, selection: { packageId: "no-guide", travelers: 2 } } }]) {
    assert.notEqual(semantic({ ...base, ...change }), hash);
  }
  const { travelDate, note, ...legacy } = base;
  const homepage = { ...legacy, schemaVersion: 3, formVersion: currentHomepageEmailFormVersion, entryPath: "homepage_email", attribution: { landingPath: "/" } };
  assert.equal(validateAndNormalizeInquiry(homepage, config).ok, true);
  assert.equal(validateAndNormalizeInquiry({ ...homepage, travelDate, note }, config).ok, false);
  assert.equal(Object.hasOwn(semanticInquiryPayload(normalized(homepage)), "note"), false);
});

test("actual intake and notification handlers preserve quote fields, replay identity and uncertainty without data leakage", async () => {
  const originalDeno = globalThis.Deno; const originalFetch = globalThis.fetch;
  const env = new Map([
    ["ALLOWED_ORIGINS", "https://homegroundchina.com"], ["ALLOWED_FORM_VERSIONS", config.allowedFormVersions.join(",")],
    ["ALLOWED_PRIVACY_NOTICE_VERSIONS", homepageEmailPrivacyNoticeVersion], ["SUPABASE_URL", "https://project.supabase.co"],
    ["SUPABASE_SECRET_KEYS", JSON.stringify({ default: "test-server-key" })],
    ["IDEMPOTENCY_HASH_SECRET", "test-idempotency"], ["RATE_LIMIT_HASH_SECRET", "test-rate"], ["TRAFFIC_SESSION_HASH_SECRET", "test-traffic"],
    ["NOTIFICATION_WORKER_SECRET", "test-worker-secret-000000000000000000"], ["RESEND_API_KEY", "test-resend-key"],
    ["RESEND_FROM_EMAIL", "Homeground <sender@example.invalid>"], ["BRAND_NOTIFICATION_EMAIL", "planner@example.invalid"],
  ]);
  let handler, currentJob; let failWrite = false; const writes = [], messages = [], saved = new Map();
  const response = (body) => new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve: (fn) => { handler = fn; } };
  globalThis.fetch = async (url, init) => {
    const path = new URL(String(url)).pathname; const body = JSON.parse(init.body);
    if (String(url) === "https://api.resend.com/emails") { messages.push(body); return response({ id: randomUUID() }); }
    if (/\/create_homeground_private_tour_quote(?:_with_traffic)?_v1$/.test(path)) {
      writes.push({ path, body });
      if (failWrite) throw new Error("Synthetic transport interrupted after write may have committed");
      const previous = saved.get(body.p_idempotency_key_hash);
      if (previous && previous !== body.p_payload_hash) return response({ outcome: "idempotency_conflict" });
      saved.set(body.p_idempotency_key_hash, body.p_payload_hash);
      return response({ outcome: previous ? "replay" : "created", inquiryId: randomUUID(), publicReference: "HG-TEST", receivedAt: new Date().toISOString() });
    }
    if (path.endsWith("/claim_homeground_notification_jobs_v3")) return response([currentJob]);
    if (path.endsWith("/finish_homeground_notification_job")) return response(true);
    throw new Error(`Unexpected network request ${url}`);
  };
  try {
    await import(`../functions/v1-inquiries/index.ts?quote=${Date.now()}`); const intake = handler;
    const request = (input, key) => new Request("https://project.supabase.co/functions/v1/v1-inquiries", { method: "POST", headers: { Origin: "https://homegroundchina.com", "Content-Type": "application/json", "Idempotency-Key": key, "X-Forwarded-For": "203.0.113.42" }, body: JSON.stringify(input) });
    const base = quotePayload(); const key = randomUUID();
    assert.equal((await intake(request(base, key))).status, 201);
    assert.deepEqual(writes.at(-1).body.p_product_interest, base.productInterest);
    assert.equal(writes.at(-1).body.p_travel_date, base.travelDate); assert.equal(writes.at(-1).body.p_note, base.note);
    assert.equal((await intake(request({ ...base, trafficSessionToken: randomUUID() }, key))).status, 200);
    assert.equal(writes[0].body.p_payload_hash, writes[1].body.p_payload_hash);
    assert.match(writes[1].path, /_with_traffic_v1$/); assert.match(writes[1].body.p_traffic_session_hash, /^[a-f0-9]{64}$/);
    assert.equal((await intake(request({ ...base, note: "changed" }, key))).status, 409);
    const before = writes.length; failWrite = true;
    const uncertain = await intake(request(base, randomUUID()));
    assert.equal(uncertain.status, 503); assert.equal((await uncertain.json()).error.persistenceState, "unknown");
    assert.equal(writes.length, before + 1, "no second persistence RPC after an uncertain result"); failWrite = false;
    const invalidBefore = writes.length;
    assert.equal((await intake(request({ ...base, travelDate: "2026-02-30" }, randomUUID()))).status, 422);
    assert.equal(writes.length, invalidBefore);

    await import(`../functions/notify-inquiries/index.ts?quote=${Date.now()}`); const worker = handler;
    const runWorker = () => worker(new Request("https://project.supabase.co/functions/v1/notify-inquiries", { method: "POST", headers: { "x-worker-secret": env.get("NOTIFICATION_WORKER_SECRET") } }));
    for (const locale of ["en", "zh", "ko"]) {
      for (const isClassic of [false, true]) {
        const input = isClassic ? quotePayload(locale, "zhangjiajie-4-day-private-tour", null) : quotePayload(locale);
        currentJob = { job_id: randomUUID(), inquiry_id: randomUUID(), public_reference: "HG-TEST", locale, route_id: "private-tour-quote",
          answers: { productInterest: input.productInterest, travelDate: isClassic ? null : input.travelDate, landingPath: input.attribution.landingPath },
          route_snapshot: { kind: "private-tour-quote", ruleVersion: currentPrivateTourQuoteFormVersion },
          reply_channel: "email", contact_email: "traveller@example.invalid", contact_phone_e164: null,
          departure_country: null, rough_budget_per_person: null, note: isClassic ? null : "Pace <slow> & steady\nTwo rooms.",
          inquiry_created_at: new Date().toISOString(), first_response_due_at: new Date().toISOString(), lease_token: randomUUID(), row_version: 1, attempt_count: 1 };
        assert.equal((await (await runWorker()).json()).accepted, 1);
        const mail = messages.at(-1); assert.equal(mail.reply_to, currentJob.contact_email);
        assert.ok(mail.text.includes(input.productInterest.name)); assert.ok(mail.text.includes(input.attribution.landingPath));
        if (isClassic) { assert.match(mail.text, /Date undecided/); assert.doesNotMatch(mail.text, /Tour selection:/); }
        else { assert.ok(mail.text.includes(input.travelDate)); assert.match(mail.html, /Pace &lt;slow&gt; &amp; steady/); assert.doesNotMatch(mail.html, /Pace <slow>/); }
      }
    }
    const beforeInvalid = messages.length;
    currentJob.answers.extra = "not allowed";
    assert.equal((await (await runWorker()).json()).terminalFailed, 1); assert.equal(messages.length, beforeInvalid);
  } finally { globalThis.Deno = originalDeno; globalThis.fetch = originalFetch; }
});
