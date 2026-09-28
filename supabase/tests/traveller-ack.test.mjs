import assert from "node:assert/strict";
import { createHmac, randomUUID } from "node:crypto";
import test from "node:test";
import { renderTravellerAcknowledgement } from "../functions/_shared/traveller-ack.ts";
import { normalizeTravellerAckEvent, verifyTravellerAckWebhook } from "../functions/_shared/traveller-ack-events.ts";
import { processTravellerAcknowledgements } from "../functions/_shared/traveller-ack-worker.ts";

const reference = "HG-1234-5678-ABCD";
function job(overrides = {}) {
  return { job_id: "1290615f-9efb-4e46-b55d-722bf849a10d", inquiry_id: randomUUID(), public_reference: reference,
    locale: "en", entry_path: "private_tour_quote", contact_email: "guest@example.test",
    answers: { productInterest: { slug: "shanghai-suzhou-5-day-private-tour", name: '<script>Untrusted</script>', selection: { packageId: "standard-guided", travelers: 6 } }, travelDate: "2026-12-03", note: "private complaint <script>NOT FOR MAIL</script>" },
    inquiry_created_at: "2026-09-28T00:00:00Z", first_response_due_at: "2026-09-30T00:00:00Z",
    lease_token: randomUUID(), row_version: 1, attempt_count: 1, first_attempt_at: new Date().toISOString(), ...overrides };
}
test("four receipt languages echo only canonical context and use the saved SLA", () => {
  for (const locale of ["en", "zh", "ko", "ja"]) {
    const message = renderTravellerAcknowledgement(job({ locale }));
    assert.ok(message.text.includes(reference));
    assert.ok(message.text.includes({ en: "3 Dec 2026", zh: "2026年12月3日", ko: "2026년 12월 3일", ja: "2026年12月3日" }[locale]), "the arrival date is shown in the traveller's language");
    assert.ok(message.text.includes("48"));
    assert.ok(message.text.includes("hello@homegroundchina.com"));
    assert.ok(message.text.includes({ en: "not me", zh: "不是我", ko: "본인 아님", ja: "心当たりなし" }[locale]), "the stop phrase is written in the traveller's language");
    assert.doesNotMatch(message.text + message.html, /NOT FOR MAIL|Untrusted|<script>|data:image|<img|track|https?:/);
    assert.match(message.html, new RegExp(`<html lang="${locale}">`));
  }
  const english = renderTravellerAcknowledgement(job()).text;
  assert.match(english, /confirm your actual number of travellers/);
  assert.match(english, /not a confirmed booking/);
  assert.doesNotMatch(english, /we will delete|within 2 minutes|Evan.*personally/i);
});
test("receipt never invents actual party size from a selected price tier", () => {
  assert.doesNotMatch(renderTravellerAcknowledgement(job()).text, /Requested number of travellers/);
  assert.match(renderTravellerAcknowledgement(job({ requested_travelers: 15 })).text, /Requested number of travellers: 15/);
  const simple = renderTravellerAcknowledgement(job({ entry_path: "homepage_email", answers: {} })).text;
  assert.match(simple, /Reference: HG-1234-5678-ABCD/);
  assert.doesNotMatch(simple, /Homepage enquiry|Your enquiry:/, "an internal entry-point name is not echoed to the traveller");
  assert.doesNotMatch(simple, /Arrival date|Price option/);
  assert.throws(() => renderTravellerAcknowledgement(job({ first_response_due_at: "bad" })), /deadline/);
});
test("Svix official signature fixture, raw-body changes and replay window", async () => {
  const body = '{"event_type":"ping","data":{"success":true}}';
  const headers = new Headers({ "svix-id": "msg_loFOjxBNrRLzqYUf", "svix-timestamp": "1731705121", "svix-signature": "v1,rAvfW3dJ/X/qxhsaXPOyyCGmRKsaKWcsNccKXlIktD0=" });
  const secret = "whsec_plJ3nmyCDGBKInavdOK15jsl";
  assert.equal(await verifyTravellerAckWebhook(body, headers, secret, 1731705121), true);
  assert.equal(await verifyTravellerAckWebhook(body + " ", headers, secret, 1731705121), false);
  assert.equal(await verifyTravellerAckWebhook(body, headers, secret, 1731705422), false);
  assert.equal(await verifyTravellerAckWebhook(body, headers, secret, 1731704820), false);
  headers.set("svix-signature", `v2,unsupported ${headers.get("svix-signature")}`);
  assert.equal(await verifyTravellerAckWebhook(body, headers, secret, 1731705121), true);
});
test("events retain actionable codes without treating quota failure as a bad email", () => {
  const base = { email_id: "56761188-7520-42d8-8898-ff6fc54ce618", tags: { homeground_ack_id: job().job_id }, to: ["guest@example.test"] };
  assert.deepEqual(normalizeTravellerAckEvent({ type: "email.failed", data: { ...base, failed: { reason: "reached_daily_quota" } } }), {
    providerId: base.email_id, jobId: base.tags.homeground_ack_id, type: "failed", reason: "reached_daily_quota",
  });
  assert.equal(normalizeTravellerAckEvent({ type: "email.bounced", data: { ...base, bounce: { message: "PII guest@example.test", subType: "Suppressed" } } }).reason, "bounce_suppressed");
  assert.equal(normalizeTravellerAckEvent({ type: "email.opened", data: base }), null);
  assert.equal(normalizeTravellerAckEvent({ type: "email.received", data: base }), null);
});

test("receipt pipeline is off by default; frozen retry payload and lease completion are respected", async (t) => {
  const originalDeno = globalThis.Deno; const originalFetch = globalThis.fetch;
  const env = new Map([
    ["SUPABASE_URL", "https://project.supabase.co"], ["SUPABASE_SECRET_KEYS", '{"default":"local-only-test"}'],
    ["RESEND_API_KEY", "test-no-real-mail"], ["RESEND_TRAVELLER_ACK_WEBHOOK_SECRET", "whsec_plJ3nmyCDGBKInavdOK15jsl"],
  ]);
  const calls = []; const oneJob = job(); let providerStatus = 200; let frozenMessage;
  globalThis.Deno = { env: { get: (name) => env.get(name) } };
  globalThis.fetch = async (url, init) => {
    const body = JSON.parse(init.body); const name = new URL(String(url)).pathname.split("/").at(-1);
    calls.push({ name, body, headers: init.headers });
    let responseBody;
    if (name === "claim_homeground_traveller_ack_v1") responseBody = [oneJob];
    else if (name === "freeze_homeground_traveller_ack_message_v1") { frozenMessage ??= body.p_message; responseBody = frozenMessage; }
    else if (name === "finish_homeground_traveller_ack_v1") responseBody = true;
    else if (url === "https://api.resend.com/emails") responseBody = { id: "accepted-test-message" };
    else throw new Error(`Unexpected external call: ${url}`);
    return new Response(JSON.stringify(responseBody), { status: name === "emails" ? providerStatus : 200 });
  };
  try {
    assert.equal((await processTravellerAcknowledgements("test-off")).status, "disabled");
    assert.equal(calls.length, 0);
    env.set("TRAVELLER_ACK_ENABLED", "true");
    await t.test("accepted is recorded, not labelled delivered; fixed brand Reply-To", async () => {
      const result = await processTravellerAcknowledgements("test-accepted");
      assert.equal(result.accepted, 1);
      const request = calls.find((call) => call.name === "emails");
      assert.equal(request.body.reply_to, "hello@homegroundchina.com");
      assert.equal(request.headers["Idempotency-Key"], `homeground-traveller-ack/v1/${oneJob.job_id}`);
      assert.equal(request.body.from, "Homeground China <hello@homegroundchina.com>");
      assert.equal(calls.at(-1).body.p_accepted, true);
    });
    await t.test("later sender config cannot change a frozen provider retry", async () => {
      env.set("TRAVELLER_ACK_FROM_EMAIL", "Homeground China <receipt@send.homegroundchina.com>");
      providerStatus = 429; calls.length = 0;
      const result = await processTravellerAcknowledgements("test-retry");
      assert.equal(result.retryScheduled, 1);
      assert.equal(calls.find((call) => call.name === "emails").body.from, frozenMessage.from);
      assert.equal(calls.at(-1).body.p_error_code, "provider_http_429");
      assert.equal(calls.at(-1).body.p_terminal, false);
    });
    await t.test("webhook missing prevents sending before claiming jobs", async () => {
      env.delete("RESEND_TRAVELLER_ACK_WEBHOOK_SECRET"); calls.length = 0;
      assert.equal((await processTravellerAcknowledgements("test-no-webhook")).status, "unavailable");
      assert.equal(calls.length, 0);
    });
  } finally { globalThis.Deno = originalDeno; globalThis.fetch = originalFetch; }
});

test("saved intake stays successful on optional receipt failures and exposes only durable state", async () => {
  const originalDeno = globalThis.Deno; const originalFetch = globalThis.fetch; let handler;
  const env = new Map([
    ["ALLOWED_ORIGINS", "https://homegroundchina.com"], ["ALLOWED_FORM_VERSIONS", "2026-07-26.1"], ["ALLOWED_PRIVACY_NOTICE_VERSIONS", "2026-09-28.1"],
    ["SUPABASE_URL", "https://project.supabase.co"], ["SUPABASE_SECRET_KEYS", '{"default":"local-only-test"}'],
    ["IDEMPOTENCY_HASH_SECRET", "local-idempotency-secret"], ["RATE_LIMIT_HASH_SECRET", "local-rate-limit-secret"], ["TRAVELLER_ACK_ENABLED", "true"],
  ]);
  const calls = []; let failAuxiliary = false;
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve: (value) => { handler = value; } };
  globalThis.fetch = async (url, init) => {
    const name = new URL(String(url)).pathname.split("/").at(-1); const args = JSON.parse(init.body); calls.push({ name, args });
    let data;
    if (name === "prepare_homeground_traveller_ack_v1") { if (failAuxiliary) throw new Error("optional prepare failed"); data = true; }
    else if (name === "create_homeground_homepage_email_v1") data = { outcome: "created", inquiryId: "66c78072-5792-4573-9668-93c8e2e88c89", publicReference: reference, receivedAt: "2026-09-28T00:00:00Z" };
    else if (name === "get_homeground_traveller_ack_receipt_v1") { if (failAuxiliary) return new Response("", { status: 503 }); data = { ackStatus: "suppressed", firstResponseDueAt: "2026-09-30T00:00:00Z" }; }
    else throw new Error(`Unexpected call ${url}`);
    return new Response(JSON.stringify(data), { status: 200 });
  };
  const payload = { schemaVersion: 3, formVersion: "2026-07-26.1", privacyNoticeVersion: "2026-09-28.1", entryPath: "homepage_email", locale: "en", contact: { channel: "email", email: "guest@example.test" }, attribution: { landingPath: "/" }, experiment: null, antiAbuse: { companyWebsite: "" } };
  const send = () => handler(new Request("https://project.supabase.co/functions/v1/v1-inquiries", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://homegroundchina.com", "Idempotency-Key": randomUUID() }, body: JSON.stringify(payload) }));
  try {
    await import(new URL(`../functions/v1-inquiries/index.ts?ack-tests=${Date.now()}`, import.meta.url));
    const response = await send(); assert.equal(response.status, 201);
    const body = await response.json(); assert.equal(body.ackQueued, false); assert.equal(body.ackStatus, "suppressed"); assert.equal(body.firstResponseDueAt, "2026-09-30T00:00:00Z");
    assert.equal(calls[0].name, "prepare_homeground_traveller_ack_v1");
    assert.equal(calls[0].args.p_recipient_hash, createHmac("sha256", "local-idempotency-secret").update("traveller-ack:guest@example.test").digest("hex"));
    failAuxiliary = true;
    const failed = await send(); assert.equal(failed.status, 201);
    const fallback = await failed.json(); assert.equal(fallback.state, "submitted"); assert.equal(fallback.publicReference, reference); assert.equal(fallback.ackStatus, "unavailable");
  } finally { globalThis.Deno = originalDeno; globalThis.fetch = originalFetch; }
});

test("webhook authenticates before storing and failure records never send another email", async () => {
  const originalDeno = globalThis.Deno; const originalFetch = globalThis.fetch;
  const secret = "whsec_plJ3nmyCDGBKInavdOK15jsl";
  const env = new Map([["RESEND_TRAVELLER_ACK_WEBHOOK_SECRET", secret], ["SUPABASE_URL", "https://project.supabase.co"], ["SUPABASE_SECRET_KEYS", '{"default":"local-only-test"}']]);
  const calls = []; let handler;
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve: (value) => { handler = value; } };
  globalThis.fetch = async (url, init) => {
    assert.match(String(url), /\/rpc\/record_homeground_traveller_ack_event_v1$/);
    calls.push(JSON.parse(init.body));
    return new Response("true", { status: 200 });
  };
  const raw = JSON.stringify({ type: "email.bounced", data: { email_id: "56761188-7520-42d8-8898-ff6fc54ce618", tags: { homeground_ack_id: job().job_id }, bounce: { message: "sensitive guest@example.test", subType: "NoEmail" } } });
  const timestamp = String(Math.floor(Date.now() / 1000)); const eventId = "msg_local_test";
  const signature = createHmac("sha256", Buffer.from(secret.slice(6), "base64")).update(`${eventId}.${timestamp}.${raw}`).digest("base64");
  const request = (valid = true) => new Request("https://project.supabase.co/functions/v1/traveller-ack-events", {
    method: "POST", headers: { "svix-id": eventId, "svix-timestamp": timestamp, "svix-signature": `v1,${valid ? signature : "wrong"}` }, body: raw,
  });
  try {
    await import(new URL(`../functions/traveller-ack-events/index.ts?ack-events-test=${Date.now()}`, import.meta.url));
    assert.equal((await handler(request(false))).status, 401); assert.equal(calls.length, 0);
    assert.equal((await handler(request())).status, 200); assert.equal(calls.length, 1);
    assert.equal(calls[0].p_event_id, eventId); assert.equal(calls[0].p_reason, "bounce_noemail");
    assert.doesNotMatch(JSON.stringify(calls[0]), /guest@example|sensitive/);
    assert.equal((await handler(request())).status, 200); assert.equal(calls[1].p_event_id, eventId, "DB deduplicates the immutable signed event ID");
    const tooLarge = new Request("https://project.supabase.co/functions/v1/traveller-ack-events", { method: "POST", body: "a".repeat(32769) });
    assert.equal((await handler(tooLarge)).status, 413);
  } finally { globalThis.Deno = originalDeno; globalThis.fetch = originalFetch; }
});
