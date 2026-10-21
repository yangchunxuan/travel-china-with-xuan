import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import test from "node:test";
import { createIsolatedInquiryDatabase } from "../../tools/run-inquiry-recovery-drill.mjs";
import { getPrivateTourInquiryContext, getPrivateTourInquirySubmissionContext } from "../../lib/privateTourInquiryContext.ts";
import { currentPrivateTourQuoteFormVersion, privateTourQuoteSchemaVersion } from "../../lib/inquiryVersions.ts";

const digest = (value) => createHash("sha256").update(value).digest("hex");
const slug = "beijing-highlights-5-day-private-tour";
const editionHomes = ["/fr/", "/de/", "/es/", "/ar/"];
const ownSurface = { en: "/", zh: "/zh/", ko: "/ko/", ja: "/ja/" };

test("edition landing paths are saved for English enquiries only, after every migration, in isolated PostgreSQL", { timeout: 180_000 }, async (t) => {
  let db;
  try { db = createIsolatedInquiryDatabase(); }
  catch (error) {
    if (error.code === "ENOENT" && process.env.CI !== "true" && !["1", "true"].includes(process.env.REQUIRE_ISOLATED_POSTGRES)) {
      t.skip("PostgreSQL required for the edition landing-path regression"); return;
    }
    throw error;
  }
  t.after(() => db.close());
  assert.equal(db.replayed.at(-1) >= "202610220001_record_edition_inquiry_landing_path.sql", true);
  assert.ok(db.replayed.includes("202610220001_record_edition_inquiry_landing_path.sql"));

  const count = () => Number(db.sql("select count(*) from homeground_private.inquiries;"));
  const reset = () => db.sql("truncate homeground_private.inquiries, homeground_private.inquiry_rate_limit_buckets, homeground_private.traveller_ack_intents cascade;");
  const hashes = () => ({
    p_idempotency_key_hash: digest(randomUUID()), p_payload_hash: digest(randomUUID()), p_rate_limit_subject_hash: digest(randomUUID()),
    p_short_rate_limit: 50, p_daily_rate_limit: 50, p_first_response_due_at: new Date(Date.now() + 12 * 3_600_000).toISOString(),
  });
  const homepage = (locale, path) => ({
    p_schema_version: 3, p_form_version: "2026-07-26.1", p_locale: locale, p_contact_email: `guest-${randomUUID()}@example.invalid`,
    p_privacy_notice_version: "2026-09-28.1", p_landing_path: path, p_attribution: {}, ...hashes(),
  });
  const quote = (locale, path, productSlug = slug) => ({
    p_schema_version: 4, p_form_version: currentPrivateTourQuoteFormVersion, p_locale: locale, p_contact_email: `guest-${randomUUID()}@example.invalid`,
    p_product_interest: getPrivateTourInquirySubmissionContext(getPrivateTourInquiryContext(productSlug, locale, { packageId: "no-guide", travelers: 4 }), locale),
    p_travel_date: "2027-04-03", p_note: "Two rooms.", p_privacy_notice_version: "2026-09-28.1", p_landing_path: path, ...hashes(),
  });
  const row = (id) => JSON.parse(db.sql(`select jsonb_build_object('locale',locale,'landing_path',landing_path,'answers',answers_json,'entry_path',entry_path) from homeground_private.inquiries where inquiry_id='${id}';`));

  await t.test("homepage email: old surfaces still save, edition homes save for en only, everything else is rejected", () => {
    reset();
    for (const locale of ["en", "zh", "ko", "ja"]) {
      const saved = db.rpc("create_homeground_homepage_email_v1", homepage(locale, ownSurface[locale]));
      assert.equal(saved.outcome, "created", `${locale} old surface`);
      assert.deepEqual([row(saved.inquiryId).locale, row(saved.inquiryId).landing_path], [locale, ownSurface[locale]]);
    }
    for (const home of editionHomes) {
      const saved = db.rpc("create_homeground_homepage_email_v1", homepage("en", home));
      assert.equal(saved.outcome, "created", home);
      const stored = row(saved.inquiryId);
      assert.equal(stored.locale, "en", "locale is unchanged"); assert.equal(stored.landing_path, home); assert.equal(stored.entry_path, "homepage_email");
      assert.deepEqual(stored.answers, { informationStatus: "not_provided" }, "answers keep the old shape");
    }
    assert.equal(count(), 8);
    const rejected = [
      ...["zh", "ko", "ja"].flatMap((locale) => editionHomes.map((home) => [locale, home])),
      ["zh", "/"], ["ja", "/zh/"],
      ...["/it/", "/fr", "fr/", "/FR/", "/fr/tours/", `/fr/tours/${slug}/`, "/fr/guides/", "/zh/", "/ko/", "/ja/", "//fr/", "/fr/?x=1", ""].map((path) => ["en", path]),
      ["en", null],
    ];
    for (const [locale, path] of rejected) {
      assert.throws(() => db.rpc("create_homeground_homepage_email_v1", homepage(locale, path)), /invalid homepage email input/u, `${locale} ${JSON.stringify(path)}`);
    }
    assert.equal(count(), 8, "a rejected path writes no row");
  });

  await t.test("private-tour quote: old tour paths still save, edition tour pages save for en only, everything else is rejected", () => {
    reset();
    for (const locale of ["en", "zh", "ko", "ja"]) {
      const path = `${ownSurface[locale]}tours/${slug}/`;
      const saved = db.rpc("create_homeground_private_tour_quote_v1", quote(locale, path));
      assert.equal(saved.outcome, "created", `${locale} old path`);
      assert.equal(row(saved.inquiryId).answers.landingPath, path);
    }
    for (const home of editionHomes) {
      const path = `${home}tours/${slug}/`;
      const saved = db.rpc("create_homeground_private_tour_quote_v1", quote("en", path));
      assert.equal(saved.outcome, "created", path);
      const stored = row(saved.inquiryId);
      assert.equal(stored.locale, "en"); assert.equal(stored.landing_path, path); assert.equal(stored.answers.landingPath, path);
      assert.equal(stored.entry_path, "private_tour_quote");
    }
    assert.equal(count(), 8);
    const rejected = [
      ...["zh", "ko", "ja"].flatMap((locale) => editionHomes.map((home) => [locale, `${home}tours/${slug}/`])),
      ...editionHomes.flatMap((home) => [["en", home], ["en", `${home}tours/${slug}`], ["en", `${home}tours/great-wall-2-day-private-tour/`], ["en", `${home}tours/`]]),
      ["en", `/it/tours/${slug}/`], ["en", `/fr/zh/tours/${slug}/`], ["en", `/zh/tours/${slug}/`], ["en", `/es/guias/${slug}/`], ["en", "/"], ["en", null],
    ];
    for (const [locale, path] of rejected) {
      assert.throws(() => db.rpc("create_homeground_private_tour_quote_v1", quote(locale, path)), /invalid private tour quote input/u, `${locale} ${JSON.stringify(path)}`);
    }
    assert.equal(count(), 8, "a rejected path writes no row");
  });

  await t.test("traffic wrappers and the receipt dispatcher accept the same edition paths", () => {
    reset();
    const viaReceipt = (name, body) => db.rpc("create_homeground_inquiry_with_receipt_v1", {
      p_rpc_name: name, p_arguments: body, p_ack_enabled: true, p_ack_recipient_hash: digest(body.p_contact_email),
    });
    for (const [name, body] of [
      ["create_homeground_homepage_email_v1", homepage("en", "/de/")],
      ["create_homeground_homepage_email_with_traffic_v1", { ...homepage("en", "/ar/"), p_traffic_session_hash: digest(randomUUID()) }],
      ["create_homeground_private_tour_quote_v1", quote("en", `/fr/tours/${slug}/`)],
      ["create_homeground_private_tour_quote_with_traffic_v1", { ...quote("en", `/es/tours/${slug}/`), p_traffic_session_hash: digest(randomUUID()) }],
    ]) {
      const saved = viaReceipt(name, body);
      assert.equal(saved.outcome, "created", name);
      assert.equal(row(saved.inquiryId).landing_path, body.p_landing_path);
    }
    assert.throws(() => viaReceipt("create_homeground_homepage_email_with_traffic_v1", { ...homepage("ko", "/de/"), p_traffic_session_hash: digest(randomUUID()) }));
    assert.equal(count(), 4);
  });

  await t.test("claim v5 returns v4's jobs plus the landing path, for the service role only", () => {
    reset();
    const saved = [
      db.rpc("create_homeground_homepage_email_v1", homepage("en", "/fr/")),
      db.rpc("create_homeground_homepage_email_v1", homepage("zh", "/zh/")),
      db.rpc("create_homeground_private_tour_quote_v1", quote("en", `/de/tours/${slug}/`)),
    ];
    const jobs = db.rpc("claim_homeground_notification_jobs_v5", { p_worker_id: "isolated-edition", p_job_limit: 10, p_lease_seconds: 90 });
    assert.equal(jobs.length, 3);
    const byInquiry = new Map(jobs.map((job) => [job.inquiry_id, job]));
    assert.deepEqual(saved.map((item) => byInquiry.get(item.inquiryId)?.landing_path), ["/fr/", "/zh/", `/de/tours/${slug}/`]);
    for (const job of jobs) {
      assert.deepEqual(Object.keys(job).sort(), ["job_id", "inquiry_id", "public_reference", "locale", "route_id", "answers", "route_snapshot",
        "reply_channel", "contact_email", "contact_phone_e164", "departure_country", "rough_budget_per_person", "note",
        "inquiry_created_at", "first_response_due_at", "lease_token", "row_version", "attempt_count",
        "contact_revision", "current_contact_revision", "previous_contact_email", "landing_path"].sort());
      assert.equal(job.attempt_count, 1, "claimed through v4's lease");
    }
    assert.deepEqual(db.rpc("claim_homeground_notification_jobs_v4", { p_worker_id: "isolated-edition", p_job_limit: 10, p_lease_seconds: 90 }), [], "v4 and v5 share one lease");
    assert.throws(() => db.sql("set role anon; select * from public.claim_homeground_notification_jobs_v5('anon', 1, 90);"));
    assert.throws(() => db.sql("set role authenticated; select * from public.claim_homeground_notification_jobs_v5('authenticated', 1, 90);"));
  });

  await t.test("real Edge intake and notification worker record and show the visitor's page language", async () => {
    reset();
    const originalDeno = globalThis.Deno, originalFetch = globalThis.fetch; let handler;
    const env = new Map([
      ["ALLOWED_ORIGINS", "https://homegroundchina.com"], ["ALLOWED_FORM_VERSIONS", `2026-07-26.1,${currentPrivateTourQuoteFormVersion}`],
      ["ALLOWED_PRIVACY_NOTICE_VERSIONS", "2026-09-28.1"], ["SUPABASE_URL", "https://isolated.example.invalid"],
      ["SUPABASE_SECRET_KEYS", '{"default":"isolated-only-key"}'], ["IDEMPOTENCY_HASH_SECRET", "isolated-idempotency"],
      ["RATE_LIMIT_HASH_SECRET", "isolated-rate"], ["TRAFFIC_SESSION_HASH_SECRET", "isolated-traffic"], ["TRAVELLER_ACK_ENABLED", "true"],
      ["NOTIFICATION_WORKER_SECRET", "isolated-worker-secret-000000000000000000"], ["RESEND_API_KEY", "isolated-provider-key"],
      ["RESEND_FROM_EMAIL", "Studio <sender@example.invalid>"], ["BRAND_NOTIFICATION_EMAIL", "planner@example.invalid"],
    ]);
    globalThis.Deno = { env: { get: (name) => env.get(name) }, serve: (value) => { handler = value; } };
    const calls = [], mails = [];
    globalThis.fetch = async (url, init) => {
      if (String(url) === "https://api.resend.com/emails") { mails.push(JSON.parse(init.body)); return new Response(JSON.stringify({ id: randomUUID() }), { status: 200 }); }
      const parsed = new URL(String(url)); assert.equal(parsed.origin, "https://isolated.example.invalid");
      const name = parsed.pathname.split("/").at(-1), body = JSON.parse(init.body); calls.push(name);
      return new Response(JSON.stringify(db.rpc(name, body)), { status: 200 });
    };
    try {
      await import(`../functions/v1-inquiries/index.ts?edition-sql=${randomUUID()}`); const intake = handler;
      const common = { privacyNoticeVersion: "2026-09-28.1", experiment: null, antiAbuse: { companyWebsite: "" } };
      const email = (locale, landingPath) => ({ ...common, locale, schemaVersion: 3, formVersion: "2026-07-26.1", entryPath: "homepage_email", attribution: { landingPath } });
      const quotePayload = (locale, landingPath) => ({ ...common, locale, schemaVersion: privateTourQuoteSchemaVersion, formVersion: currentPrivateTourQuoteFormVersion,
        entryPath: "private_tour_quote", productInterest: getPrivateTourInquiryContext(slug, locale, { packageId: "no-guide", travelers: 4 }), travelDate: null, note: null, attribution: { landingPath } });
      let client = 1;
      const submit = async (payload) => {
        const response = await intake(new Request("https://isolated.example.invalid/functions/v1/v1-inquiries", {
          method: "POST", headers: { Origin: "https://homegroundchina.com", "Content-Type": "application/json", "Idempotency-Key": randomUUID(), "X-Forwarded-For": `203.0.113.${client++}` },
          body: JSON.stringify({ ...payload, contact: { channel: "email", email: `guest-${randomUUID()}@example.invalid` } }),
        }));
        return { status: response.status, body: await response.json() };
      };
      const accepted = [
        [email("en", "/fr/"), "French (/fr/)", "French page"],
        [{ ...email("en", "/de/"), trafficSessionToken: randomUUID() }, "German (/de/)", "German page"],
        [{ ...quotePayload("en", `/es/tours/${slug}/`), trafficSessionToken: randomUUID() }, "Spanish (/es/)", "Spanish page"],
        [quotePayload("en", `/ar/tours/${slug}/`), "Arabic (/ar/)", "Arabic page"],
        [email("en", "/"), "English (/)", null],
        [quotePayload("zh", `/zh/tours/${slug}/`), "Chinese (/zh/)", null],
      ];
      for (const [payload] of accepted) assert.equal((await submit(payload)).status, 201, payload.attribution.landingPath);
      const rpcBefore = calls.length;
      for (const payload of [email("zh", "/fr/"), email("en", "/it/"), quotePayload("ko", `/de/tours/${slug}/`), quotePayload("en", `/fr/tours/great-wall-2-day-private-tour/`)]) {
        const result = await submit(payload);
        assert.equal(result.status, 422, payload.attribution.landingPath); assert.equal(result.body.error.fieldErrors["attribution.landingPath"], "invalid");
      }
      assert.equal(calls.length, rpcBefore, "the Edge contract rejects before any database call");
      assert.deepEqual(JSON.parse(db.sql("select jsonb_agg(jsonb_build_array(locale, landing_path) order by created_at, landing_path) from homeground_private.inquiries;")).map(([locale, path]) => `${locale} ${path}`).sort(),
        accepted.map(([payload]) => `${payload.locale} ${payload.attribution.landingPath}`).sort());

      env.set("TRAVELLER_ACK_ENABLED", "false");
      await import(`../functions/notify-inquiries/index.ts?edition-sql=${randomUUID()}`); const worker = handler;
      let sent = 0;
      for (let run = 0; run < accepted.length + 2; run += 1) {
        const result = await (await worker(new Request("https://isolated.example.invalid/functions/v1/notify-inquiries", { method: "POST", headers: { "x-worker-secret": env.get("NOTIFICATION_WORKER_SECRET") } }))).json();
        assert.equal(result.terminalFailed + result.retryScheduled, 0, JSON.stringify(result));
        sent += result.accepted;
        if (result.claimed === 0) break;
      }
      assert.equal(sent, accepted.length); assert.equal(mails.length, accepted.length);
      assert.ok(calls.includes("claim_homeground_notification_jobs_v5"));
      for (const [payload, label, subjectTag] of accepted) {
        const mail = mails.find((item) => item.text.includes(`Page language: ${label}`) && (payload.entryPath === "private_tour_quote") === item.subject.includes("quote"));
        assert.ok(mail, `${payload.attribution.landingPath}: ${mails.map((item) => item.subject).join(" | ")}`);
        if (subjectTag) assert.ok(mail.subject.includes(` · EN · ${subjectTag}`), mail.subject);
        else assert.doesNotMatch(mail.subject, / page/u);
        if (payload.entryPath === "private_tour_quote") assert.ok(mail.text.includes(`Product page: https://homegroundchina.com${payload.attribution.landingPath}`));
      }
    } finally { globalThis.Deno = originalDeno; globalThis.fetch = originalFetch; }
  });
});
