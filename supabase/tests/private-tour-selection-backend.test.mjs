import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import test from "node:test";
import {
  canonicalizeJson,
  currentHomepageEmailFormVersion,
  homepageEmailInquirySchemaVersion,
  homepageEmailPrivacyNoticeVersion,
  semanticInquiryPayload,
  validateAndNormalizeInquiry,
} from "../../lib/inquiryContract.ts";
import {
  getPrivateTourInquiryContext,
  getPrivateTourInquirySubmissionContext,
  getPrivateTourInquirySelection,
  privateTourInquirySelectionLabel,
  privateTourInquirySlugs,
} from "../../lib/privateTourInquiryContext.ts";
import {
  trafficProductTravelerCounts,
} from "../functions/_shared/traffic-contracts.ts";

const config = {
  allowedFormVersions: [currentHomepageEmailFormVersion],
  allowedPrivacyNoticeVersions: [homepageEmailPrivacyNoticeVersion],
  whatsappEnabled: false,
};
const beijing = "beijing-highlights-5-day-private-tour";
const packages = ["standard-guided", "standard-guided-winter", "english-guided", "no-guide", "fixed-route-english-guided"];
function payload(context = getPrivateTourInquiryContext(beijing, "en"), locale = "en") {
  return {
    schemaVersion: homepageEmailInquirySchemaVersion,
    formVersion: currentHomepageEmailFormVersion,
    entryPath: "homepage_email",
    locale,
    contact: { channel: "email", email: "traveller@example.com" },
    ...(context ? { productInterest: context } : {}),
    privacyNoticeVersion: homepageEmailPrivacyNoticeVersion,
    attribution: { landingPath: locale === "en" ? "/" : `/${locale}/` },
    experiment: null,
    antiAbuse: { companyWebsite: "" },
  };
}

test("intake preserves every allowed tour selection in every locale and its semantic hash", () => {
  for (const locale of ["en", "zh", "ko"]) {
    for (const slug of privateTourInquirySlugs) {
      for (const packageId of packages) {
        for (const travelers of [2, 3, 4, 5, 6, 7, 8, 9]) {
          const selection = getPrivateTourInquirySelection(slug, packageId, travelers);
          const context = { ...getPrivateTourInquiryContext(slug, locale), selection: { packageId, travelers } };
          const result = validateAndNormalizeInquiry(payload(context, locale), config);
          assert.equal(result.ok, Boolean(selection), `${locale}:${slug}:${packageId}:${travelers}`);
          if (result.ok) {
            const submitted = getPrivateTourInquirySubmissionContext(context, locale);
            assert.deepEqual(result.value.productInterest, submitted);
            assert.deepEqual(semanticInquiryPayload(result.value).productInterest, submitted);
          }
        }
      }
    }
  }
});

test("selection rejects partial, forged and freely supplied values", () => {
  for (const selection of [
    null, [], {}, { packageId: "no-guide" }, { travelers: 2 },
    { packageId: "no-guide", travelers: "2" },
    { packageId: "no-guide", travelers: true },
    { packageId: "no-guide", travelers: 3 },
    { packageId: "standard-guided", travelers: 2 },
    { packageId: "no-guide", travelers: 2, price: 1 },
    { packageId: "no-guide", travelers: 2, name: "Customer name" },
    { packageId: "no-guide", travelers: 2, note: "Free text" },
    { packageId: "<script>alert(1)</script>", travelers: 2 },
  ]) {
    const input = payload({ ...getPrivateTourInquiryContext(beijing, "en"), selection });
    assert.equal(validateAndNormalizeInquiry(input, config).ok, false, JSON.stringify(selection));
  }
});

test("traffic selection metadata matches every published inquiry price row", () => {
  for (const slug of privateTourInquirySlugs) {
    const expectedTravelers = [2, 3, 4, 5, 6, 7, 8, 9].filter((travelers) =>
      packages.some((packageId) =>
        getPrivateTourInquirySelection(slug, packageId, travelers),
      ),
    );
    assert.deepEqual(trafficProductTravelerCounts[slug], expectedTravelers, `travelers:${slug}`);
  }
});

test("six-traveller database whitelist includes the newly published choices", async () => {
  const sql = await readFile(new URL("../migrations/202609230001_add_six_traveller_private_tour_prices.sql", import.meta.url), "utf8");
  assert.match(sql, /create or replace function homeground_private\.is_valid_private_tour_selection_v1/u);
  const selectionCase = sql.match(/select case p_slug([\s\S]*?)else false\s+end is true;/u)?.[1];
  assert.ok(selectionCase);
  const newSixPersonSlugs = [
    "shanghai-suzhou-hangzhou-6-day-private-tour",
    "chengdu-pandas-sanxingdui-5-day-private-tour",
    "xian-terracotta-warriors-5-day-private-tour",
    "chongqing-wulong-5-day-private-tour",
    "guilin-yangshuo-5-day-private-tour",
    "harbin-winter-5-day-private-tour",
    "shanghai-suzhou-5-day-private-tour",
    "beijing-highlights-5-day-private-tour",
    "zhangjiajie-forest-4-day-private-tour",
    "zhangjiajie-furong-fenghuang-7-day-private-tour",
    "huangshan-hongcun-huizhou-5-day-private-tour",
  ];
  for (const slug of newSixPersonSlugs) {
    const condition = selectionCase.match(new RegExp(`when '${slug}' then\\s+([^\\n]+)`, "u"))?.[1];
    assert.ok(condition?.includes("p_travelers in"), `missing six-person SQL branch: ${slug}`);
    assert.match(condition, /\(\d+(?:, \d+)*, 6\)/u, `missing six-person SQL choice: ${slug}`);
  }
  for (const slug of ["chengdu-jiuzhaigou-huanglong-6-day-private-tour", "guizhou-huangguoshu-libo-miao-7-day-private-tour", "xiamen-tulou-quanzhou-6-day-private-tour", "chengdu-chongqing-8-day-private-tour"]) {
    const condition = selectionCase.match(new RegExp(`when '${slug}' then\\s+([^\\n]+)`, "u"))?.[1];
    assert.match(condition, /p_travelers = 2/u, `unpriced six-person choice must remain unavailable: ${slug}`);
  }
  assert.doesNotMatch(selectionCase, /jingdezhen-wuyuan-wangxian|changbaishan-yanji-winter/u);
});

test("legacy email-only and identity-only payloads retain their original semantic representation", () => {
  for (const context of [null, getPrivateTourInquiryContext(beijing, "en")]) {
    const input = payload(context);
    const result = validateAndNormalizeInquiry(input, config);
    assert.equal(result.ok, true);
    const expectedLegacySemantic = {
      schemaVersion: input.schemaVersion,
      formVersion: input.formVersion,
      entryPath: input.entryPath,
      locale: input.locale,
      contact: input.contact,
      ...(context ? { productInterest: context } : {}),
      privacyNoticeVersion: input.privacyNoticeVersion,
      attribution: { landingPath: "/", utmSource: null, utmMedium: null, utmCampaign: null },
      experiment: null,
    };
    assert.equal(canonicalizeJson(semanticInquiryPayload(result.value)), canonicalizeJson(expectedLegacySemantic));
  }
});

test("deployed migration keeps wire names, narrow JSON, atomic persistence and service-role grants", async () => {
  const sql = await readFile(new URL("../migrations/202609210001_add_homeground_private_tour_expansion.sql", import.meta.url), "utf8");
  for (const slug of privateTourInquirySlugs) {
    assert.ok(sql.includes(`when '${slug}'`), slug);
    for (const locale of ["en", "zh", "ko"]) {
      const context = getPrivateTourInquiryContext(slug, locale);
      const name = getPrivateTourInquirySubmissionContext(context, locale).name.replaceAll("'", "''");
      assert.ok(sql.includes(`then '${name}'`), `${locale}:${slug}`);
    }
  }
  const selectionCase = sql.match(
    /create or replace function homeground_private\.is_valid_private_tour_selection_v1[\s\S]*?select case p_slug([\s\S]*?)else false\s+end is true;/u,
  )?.[1];
  assert.ok(selectionCase);
  const expansionRows = {
    "chengdu-jiuzhaigou-huanglong-6-day-private-tour": /p_package_id = 'standard-guided' and p_travelers = 2/u,
    "kunming-dali-lijiang-8-day-private-tour": /p_package_id = 'standard-guided' and p_travelers = 6/u,
    "guizhou-huangguoshu-libo-miao-7-day-private-tour": /p_package_id = 'standard-guided' and p_travelers = 2/u,
    "xiamen-tulou-quanzhou-6-day-private-tour": /p_package_id = 'standard-guided' and p_travelers = 2/u,
    "chaozhou-shantou-nanao-5-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "chengdu-chongqing-8-day-private-tour": /p_package_id = 'standard-guided' and p_travelers = 2/u,
    "guangzhou-shunde-foshan-5-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "huangshan-hongcun-huizhou-5-day-private-tour": /p_package_id = 'standard-guided' and p_travelers = 4/u,
  };
  for (const [slug, condition] of Object.entries(expansionRows)) {
    const branch = selectionCase.match(
      new RegExp(`when '${slug}' then\\s+([^\\n]+)`, "u"),
    )?.[1];
    assert.ok(branch && condition.test(branch), `SQL selection drift: ${slug}`);
  }
  assert.doesNotMatch(selectionCase, /jingdezhen-wuyuan-wangxian|changbaishan-yanji-winter/u);
  assert.match(sql, /jsonb_typeof\(product_selection -> 'travelers'\) is distinct from 'number'/);
  assert.match(sql, /when '2'::jsonb then 2/);
  assert.match(sql, /when '4'::jsonb then 4/);
  assert.match(sql, /when '6'::jsonb then 6/);
  const trafficEventValidator = sql.match(
    /create or replace function homeground_private\.is_valid_traffic_event_v2[\s\S]*?return true;\s+end;\s+\$\$;/u,
  )?.[0];
  assert.ok(trafficEventValidator);
  assert.match(trafficEventValidator, /'6'::jsonb/);
  assert.match(trafficEventValidator, /is_valid_traffic_product_v2/);
  assert.match(sql, /product_selection is distinct from expected_selection/);
  assert.match(sql, /p_attribution is distinct from expected_attribution/);
  assert.match(sql, /homepage_answers :=[\s\S]+\|\| expected_attribution/);
  assert.match(sql, /create_homeground_inquiry\(\s*1::smallint/);
  assert.match(sql, /answers_json = homepage_answers/);
  assert.match(sql, /from public, anon, authenticated/);
  assert.match(sql, /to service_role/);
});

test("Edge intake forwards selections, preserves retry identity, and notification renders only validated selections", async () => {
  const originalDeno = globalThis.Deno;
  const originalFetch = globalThis.fetch;
  const env = new Map([
    ["ALLOWED_ORIGINS", "https://homegroundchina.com"],
    ["ALLOWED_FORM_VERSIONS", currentHomepageEmailFormVersion],
    ["ALLOWED_PRIVACY_NOTICE_VERSIONS", homepageEmailPrivacyNoticeVersion],
    ["SUPABASE_URL", "https://project.supabase.co"],
    ["SUPABASE_SECRET_KEYS", JSON.stringify({ default: "test-server-key" })],
    ["IDEMPOTENCY_HASH_SECRET", "idempotency-test-secret"],
    ["RATE_LIMIT_HASH_SECRET", "rate-limit-test-secret"],
    ["NOTIFICATION_WORKER_SECRET", "test-worker-secret-000000000000000000"],
    ["RESEND_API_KEY", "test-resend-key"],
    ["RESEND_FROM_EMAIL", "Homeground <sender@example.com>"],
    ["BRAND_NOTIFICATION_EMAIL", "planner@example.com"],
  ]);
  let handler;
  let attribution;
  let currentJob;
  const saved = new Map();
  const messages = [];
  let persistenceCalls = 0;
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve: (value) => { handler = value; } };
  const response = (body) => new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
  globalThis.fetch = async (url, init) => {
    const body = JSON.parse(init.body);
    const path = new URL(String(url)).pathname;
    if (String(url) === "https://api.resend.com/emails") {
      messages.push(body);
      return response({ id: "test-message" });
    }
    if (path.endsWith("/create_homeground_homepage_email_v1")) {
      persistenceCalls += 1;
      assert.equal(Object.hasOwn(body, "p_traffic_session_hash"), false);
      attribution = body.p_attribution;
      const previous = saved.get(body.p_idempotency_key_hash);
      if (previous && previous !== body.p_payload_hash) return response({ outcome: "idempotency_conflict" });
      saved.set(body.p_idempotency_key_hash, body.p_payload_hash);
      return response({ outcome: previous ? "replay" : "created", inquiryId: "66c78072-5792-4573-9668-93c8e2e88c89", publicReference: "HG-TEST", receivedAt: "2026-09-05T00:00:00Z" });
    }
    if (path.endsWith("/claim_homeground_notification_jobs_v3")) return response([currentJob]);
    if (path.endsWith("/finish_homeground_notification_job")) return response(true);
    throw new Error(`Unexpected network request: ${url}`);
  };
  try {
    await import(new URL(`../functions/v1-inquiries/index.ts?selection=${Date.now()}`, import.meta.url));
    const intake = handler;
    const request = (input, key) => new Request("https://project.supabase.co/functions/v1/v1-inquiries", {
      method: "POST", headers: { "Content-Type": "application/json", Origin: "https://homegroundchina.com", "Idempotency-Key": key, "X-Forwarded-For": "203.0.113.42" }, body: JSON.stringify(input),
    });
    const selected = getPrivateTourInquiryContext(beijing, "en", { packageId: "no-guide", travelers: 4 });
    const key = randomUUID();
    assert.equal((await intake(request(payload(selected), key))).status, 201);
    assert.deepEqual(attribution, { productInterest: selected });
    assert.equal((await intake(request(payload(selected), key))).status, 200);
    assert.equal((await intake(request(payload({ ...selected, selection: { ...selected.selection, travelers: 2 } }), key))).status, 409);
    const beforeInvalid = persistenceCalls;
    assert.equal((await intake(request(payload({ ...selected, selection: { ...selected.selection, price: 1 } }), randomUUID()))).status, 422);
    assert.equal(persistenceCalls, beforeInvalid);

    for (const slug of [
      "zhangjiajie-forest-4-day-private-tour",
      "zhangjiajie-furong-fenghuang-7-day-private-tour",
      "zhangjiajie-4-day-private-tour",
    ]) {
      const displayed = getPrivateTourInquiryContext(slug, "ko");
      const submitted = getPrivateTourInquirySubmissionContext(displayed, "ko");
      const sameKey = randomUUID();
      assert.equal((await intake(request(payload(submitted, "ko"), sameKey))).status, 201);
      assert.deepEqual(attribution, { productInterest: submitted });
      assert.equal((await intake(request(payload(displayed, "ko"), sameKey))).status, 200);
      assert.deepEqual(attribution, { productInterest: submitted });
    }

    await import(new URL(`../functions/notify-inquiries/index.ts?selection=${Date.now()}`, import.meta.url));
    const worker = handler;
    const baseJob = {
      job_id: randomUUID(), inquiry_id: randomUUID(), public_reference: "HG-TEST", locale: "en", route_id: "homepage-email",
      route_snapshot: { kind: "homepage-email", informationStatus: "not_provided", ruleVersion: currentHomepageEmailFormVersion },
      reply_channel: "email", contact_email: "traveller@example.com", contact_phone_e164: null,
      departure_country: null, rough_budget_per_person: null, note: null,
      inquiry_created_at: "2026-09-05T00:00:00Z", first_response_due_at: "2026-09-06T00:00:00Z",
      lease_token: randomUUID(), row_version: 1, attempt_count: 1,
    };
    const runWorker = () => worker(new Request("https://project.supabase.co/functions/v1/notify-inquiries", { method: "POST", headers: { "x-worker-secret": env.get("NOTIFICATION_WORKER_SECRET") } }));
    for (const locale of ["en", "zh", "ko"]) {
      for (const packageId of ["english-guided", "no-guide"]) {
      const context = getPrivateTourInquiryContext(beijing, locale, { packageId, travelers: 4 });
      currentJob = { ...baseJob, locale, answers: { informationStatus: "not_provided", productInterest: context } };
      assert.equal((await (await runWorker()).json()).accepted, 1);
      const message = messages.at(-1);
      const label = privateTourInquirySelectionLabel(context, locale);
      assert.ok(message.text.includes(label));
      assert.ok(message.html.includes(label));
      assert.doesNotMatch(message.text, /No itinerary, traveller/);
      assert.equal(message.reply_to, "traveller@example.com");
      }
    }
    for (const context of [null, getPrivateTourInquiryContext(beijing, "en")]) {
      currentJob = { ...baseJob, answers: { informationStatus: "not_provided", ...(context ? { productInterest: context } : {}) } };
      assert.equal((await (await runWorker()).json()).accepted, 1);
      assert.doesNotMatch(messages.at(-1).text, /Tour selection/);
    }
    for (const slug of [
      "zhangjiajie-forest-4-day-private-tour",
      "zhangjiajie-furong-fenghuang-7-day-private-tour",
      "zhangjiajie-4-day-private-tour",
    ]) {
      const displayed = getPrivateTourInquiryContext(slug, "ko");
      for (const context of [getPrivateTourInquirySubmissionContext(displayed, "ko"), displayed]) {
        currentJob = { ...baseJob, locale: "ko", answers: { informationStatus: "not_provided", productInterest: context } };
        assert.equal((await (await runWorker()).json()).accepted, 1, `${slug}:${context.name}`);
      }
    }
    const beforeInvalidJob = messages.length;
    currentJob = { ...baseJob, answers: { informationStatus: "not_provided", productInterest: { ...selected, selection: { ...selected.selection, price: 1 } } } };
    assert.equal((await (await runWorker()).json()).terminalFailed, 1);
    assert.equal(messages.length, beforeInvalidJob);
  } finally {
    globalThis.Deno = originalDeno;
    globalThis.fetch = originalFetch;
  }
});
