import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import { createIsolatedInquiryDatabase } from "../../tools/run-inquiry-recovery-drill.mjs";
import { validateAndNormalizeInquiry } from "../../lib/inquiryContract.ts";
import {
  getPrivateTourInquiryContext,
  getPrivateTourInquirySelection,
  getPrivateTourInquirySubmissionContext,
} from "../../lib/privateTourInquiryContext.ts";
import {
  isTrafficProductSelection,
  isTrafficProductSlug,
  trafficProductPackages,
  trafficProductTravelerCounts,
  validateAndNormalizeTrafficEventBatch,
} from "../functions/_shared/traffic-contracts.ts";

const slug = "guilin-li-river-yangshuo-4-day-private-tour";
const names = {
  en: "Guilin, Li River & Yangshuo: 4-Day Private Tour",
  zh: "桂林·漓江·阳朔 4 天 3 晚私家团",
  ko: "계림·이강·양삭 3박 4일 프라이빗 투어",
  ja: "桂林・漓江・陽朔 4日間（3泊）プライベートツアー",
};
const filename = "202610130001_add_guilin_four_day_private_tour.sql";
const migrations = new URL("../migrations/", import.meta.url);
const source = (name) => readFileSync(new URL(name, migrations), "utf8").replace(/\r\n?/gu, "\n");
const migration = source(filename);
const functionDefinition = (text, name) => {
  const definition = text.match(new RegExp(`create or replace function homeground_private\\.${name}\\([\\s\\S]*?\\n\\$\\$;`, "u"))?.[0];
  assert.ok(definition, name);
  return definition;
};
const nameDefinition = functionDefinition(source("202610100002_add_five_city_quote_route.sql"), "private_tour_product_name_v1");
const selectionDefinition = functionDefinition(source("202610110001_publish_five_city_route_prices.sql"), "is_valid_private_tour_selection_v1");
const digest = (value) => createHash("sha256").update(value).digest("hex");

test("Guilin increment carries all previous identities and selections unchanged, with no public RPC or privilege changes", () => {
  assert.deepEqual(readdirSync(migrations).filter((name) => name.startsWith("202610130001_")), [filename]);
  const currentNames = functionDefinition(migration, "private_tour_product_name_v1");
  const currentSelection = functionDefinition(migration, "is_valid_private_tour_selection_v1");
  const addedName = currentNames.match(new RegExp(`    when '${slug}' then case p_locale\\n[\\s\\S]*?      else null end\\n`, "u"))?.[0];
  const addedSelection = `    when '${slug}' then\n      p_package_id = 'standard-guided' and p_travelers = 6\n`;
  assert.ok(addedName);
  assert.equal(currentNames.replace(addedName, ""), nameDefinition);
  assert.equal(currentSelection.replace(addedSelection, ""), selectionDefinition);
  for (const [locale, name] of Object.entries(names)) assert.ok(addedName.includes(`when '${locale}' then '${name}'`));
  assert.match(migration, /begin;[\s\S]*to_regprocedure[\s\S]*commit;/u);
  assert.equal((migration.match(/create or replace function/gu) ?? []).length, 2);
  assert.doesNotMatch(migration, /\b(?:grant|revoke|alter|drop|insert|update|delete|truncate)\b\s/u);
  assert.doesNotMatch(migration, /create or replace function public\./u);
});

function trafficBatch(locale = "en", selection = { packageId: "standard-guided", travelers: 6 }) {
  const path = `${locale === "en" ? "" : `/${locale}`}/tours/${slug}/`;
  return {
    requestType: "events", contractVersion: "homeground-traffic-events.v2", noticeVersion: "2026-09-05.1",
    sessionToken: randomUUID(), sessionCredential: `v1.9999999999.${"a".repeat(64)}`,
    locale, entryPath: path, attribution: {}, attributionSignature: null,
    events: [{ eventId: randomUUID(), type: "product_selection_changed", pagePath: path, actionCode: null,
      clientSequence: 1, productSlug: slug, ...selection, surface: "product", errorCode: null }],
  };
}

test("traffic accepts only the new six-person standard selection and refuses forged product, package or group", () => {
  assert.equal(isTrafficProductSlug(slug), true);
  assert.deepEqual(trafficProductPackages[slug], ["standard-guided"]);
  assert.deepEqual(trafficProductTravelerCounts[slug], [6]);
  for (const locale of ["en", "zh", "ko"]) assert.equal(validateAndNormalizeTrafficEventBatch(trafficBatch(locale)).ok, true, locale);
  // The existing traffic collector supports EN/ZH/KO only. Japanese inquiries
  // are supported independently; adding a route must not widen analytics scope.
  assert.equal(validateAndNormalizeTrafficEventBatch(trafficBatch("ja")).ok, false);
  for (const travelers of [null, undefined, 0, 1, 2, 3, 4, 5, 7, 8, 9, 12, "6", 6.1, NaN]) {
    assert.equal(isTrafficProductSelection(slug, "standard-guided", travelers), false, String(travelers));
    assert.equal(validateAndNormalizeTrafficEventBatch(trafficBatch("en", { packageId: "standard-guided", travelers })).ok, false);
  }
  for (const packageId of [null, "private-guided", "no-guide", "standard-guided "]) {
    assert.equal(isTrafficProductSelection(slug, packageId, 6), false);
    assert.equal(validateAndNormalizeTrafficEventBatch(trafficBatch("en", { packageId, travelers: 6 })).ok, false);
  }
  assert.equal(isTrafficProductSelection("guilin-li-river-yangshuo-3-day-private-tour", "standard-guided", 6), false);
  assert.equal(isTrafficProductSelection("guilin-yangshuo-5-day-private-tour", "standard-guided", 2), true);
  assert.equal(isTrafficProductSelection("beijing-xian-chengdu-guilin-shanghai-13-day-private-tour", "standard-guided", 8), true);
});

test("generated frontend identities reach the inquiry contract in all four languages with only the approved selection", () => {
  for (const locale of Object.keys(names)) {
    const context = getPrivateTourInquiryContext(slug, locale, { packageId: "standard-guided", travelers: 6 });
    assert.ok(context, locale);
    assert.deepEqual(getPrivateTourInquirySubmissionContext(context, locale), {
      slug, name: names[locale], selection: { packageId: "standard-guided", travelers: 6 },
    });
    const validated = validateAndNormalizeInquiry({
      schemaVersion: 4, formVersion: "2026-09-10.1", entryPath: "private_tour_quote", locale,
      contact: { channel: "email", email: "fixture@example.invalid" }, productInterest: context,
      travelDate: "2027-04-15", note: null, privacyNoticeVersion: "2026-09-28.1",
      attribution: { landingPath: `${locale === "en" ? "" : `/${locale}`}/tours/${slug}/` },
      experiment: null, antiAbuse: { companyWebsite: "" },
    }, { allowedFormVersions: ["2026-09-10.1"], allowedPrivacyNoticeVersions: ["2026-09-28.1"] });
    assert.equal(validated.ok, true, JSON.stringify(validated));
    assert.deepEqual(validated.value.productInterest, getPrivateTourInquirySubmissionContext(context, locale));
  }
  for (const travelers of [2, 4, 8, 12]) assert.equal(getPrivateTourInquirySelection(slug, "standard-guided", travelers), null);
});

test("Guilin identity and six-person inquiry work through existing real RPCs in disposable socket-only PostgreSQL", { timeout: 120_000 }, async (t) => {
  let db;
  try { db = createIsolatedInquiryDatabase(); }
  catch (error) {
    if (error.code === "ENOENT" && process.env.CI !== "true" && !["1", "true"].includes(process.env.REQUIRE_ISOLATED_POSTGRES)) {
      t.skip("PostgreSQL tools required for isolated product registration test"); return;
    }
    throw error;
  }
  t.after(() => db.close());
  const json = (statement) => JSON.parse(db.sql(statement));
  const count = (table) => Number(db.sql(`select count(*) from homeground_private.${table};`));
  const reset = () => db.sql("truncate homeground_private.inquiries, homeground_private.inquiry_rate_limit_buckets cascade;");
  const oldSlugs = [...nameDefinition.matchAll(/    when '([^']+)' then case p_locale/gu)].map((match) => match[1]);
  const metadata = () => json(`select jsonb_agg(jsonb_build_object('signature',p.oid::regprocedure::text,'owner',p.proowner,
    'acl',p.proacl::text,'settings',p.proconfig,'securityDefiner',p.prosecdef,'volatility',p.provolatile) order by p.oid)
    from pg_proc p where p.oid in (
      'homeground_private.private_tour_product_name_v1(text,text)'::regprocedure,
      'homeground_private.is_valid_private_tour_selection_v1(text,text,integer)'::regprocedure,
      'homeground_private.is_valid_traffic_product_v2(text,text,integer)'::regprocedure)
      or p.proname in ('create_homeground_private_tour_quote_v1','create_homeground_private_tour_quote_with_traffic_v1','create_homeground_inquiry_with_receipt_v1');`);
  const legacySnapshot = () => json(`with slugs as (select jsonb_array_elements_text(${db.quote(oldSlugs)}::jsonb) slug),
    names as (select slug,locale,homeground_private.private_tour_product_name_v1(slug,locale) name
      from slugs cross join unnest(array['en','zh','ko','ja','es',null]) locale),
    selections as (select slug,package_id,travelers,
      homeground_private.is_valid_private_tour_selection_v1(slug,package_id,travelers) valid,
      homeground_private.is_valid_traffic_product_v2(slug,package_id,travelers) traffic_valid
      from slugs cross join unnest(array['standard-guided','english-guided','no-guide','fixed-route-english-guided',
        'standard-guided-winter','low-season','peak-season','small-group-departure','selected-city-stay',
        'spacious-premium-stay','distinctive-mountain-stay','private-guided','invalid',null]) package_id
      cross join unnest(array[0,1,2,3,4,5,6,7,8,9,10,12,null]) travelers)
    select jsonb_build_object('names',(select jsonb_agg(to_jsonb(names) order by slug,locale) from names),
      'selectionDigest',(select md5(string_agg(to_jsonb(selections)::text,'|' order by slug,package_id,travelers)) from selections));`);
  const args = (locale = "en", selected = true) => ({
    p_schema_version: 4, p_form_version: "2026-09-10.1", p_locale: locale,
    p_contact_email: `fixture-${randomUUID()}@example.invalid`,
    p_product_interest: getPrivateTourInquirySubmissionContext(getPrivateTourInquiryContext(
      slug, locale, selected ? { packageId: "standard-guided", travelers: 6 } : undefined,
    ), locale),
    p_travel_date: "2027-04-15", p_note: "Synthetic isolated product test; dates and services remain a quote request.",
    p_privacy_notice_version: "2026-09-28.1",
    p_landing_path: `${locale === "en" ? "" : `/${locale}`}/tours/${slug}/`,
    p_idempotency_key_hash: digest(randomUUID()), p_payload_hash: digest(randomUUID()),
    p_rate_limit_subject_hash: digest(randomUUID()), p_short_rate_limit: 5, p_daily_rate_limit: 20,
    p_first_response_due_at: "2027-04-01T00:00:00Z",
  });
  const submit = (body) => db.rpc("create_homeground_private_tour_quote_v1", body);

  await t.test("migration changes only the new branch and leaves prior helper behavior, owner, ACL, search_path and public RPCs intact", () => {
    db.sql(`${nameDefinition}\n${selectionDefinition}`);
    const before = metadata(), legacyBefore = legacySnapshot();
    assert.equal(db.sql(`select homeground_private.private_tour_product_name_v1(${db.quote(slug)},'en') is null;`), "t");
    db.sql(migration);
    assert.deepEqual(metadata(), before);
    assert.deepEqual(legacySnapshot(), legacyBefore);
    assert.equal(oldSlugs.length, 55);
    for (const [locale, name] of Object.entries(names)) {
      assert.equal(db.sql(`select homeground_private.private_tour_product_name_v1(${db.quote(slug)},${db.quote(locale)});`), name);
    }
    for (const helper of ["is_valid_private_tour_selection_v1", "is_valid_traffic_product_v2"]) {
      assert.equal(db.sql(`select homeground_private.${helper}(${db.quote(slug)},'standard-guided',6);`), "t");
      for (const travelers of [2, 4, 8, 12, null]) {
        assert.equal(db.sql(`select homeground_private.${helper}(${db.quote(slug)},'standard-guided',${travelers ?? "null"});`), "f");
      }
      assert.equal(db.sql(`select homeground_private.${helper}(${db.quote(slug)},'no-guide',6);`), "f");
    }
    assert.equal(db.sql(`select homeground_private.is_valid_traffic_product_v2(${db.quote(slug)},null,null);`), "t");
    assert.equal(db.sql(`select homeground_private.is_valid_private_tour_selection_v1('unpublished-tour','standard-guided',6);`), "f");
  });

  await t.test("four localized six-person requests save one inquiry and notification each; same-key replay does not duplicate", () => {
    reset();
    for (const locale of Object.keys(names)) {
      const body = args(locale), result = submit(body);
      assert.equal(result.outcome, "created", locale);
      const saved = json(`select answers_json from homeground_private.inquiries where inquiry_id=${db.quote(result.inquiryId)};`);
      assert.deepEqual(saved.productInterest, body.p_product_interest);
      assert.equal(saved.travelDate, body.p_travel_date);
      assert.equal(saved.landingPath, body.p_landing_path);
      assert.equal(submit(body).outcome, "replay");
    }
    assert.equal(count("inquiries"), 4); assert.equal(count("notification_outbox"), 4);
    const jobs = db.rpc("claim_homeground_notification_jobs_v4", { p_worker_id: "isolated-guilin", p_job_limit: 4, p_lease_seconds: 90 });
    assert.equal(jobs.length, 4);
    for (const job of jobs) {
      assert.equal(job.route_id, "private-tour-quote");
      assert.equal(job.answers.productInterest.slug, slug);
      assert.equal(job.answers.productInterest.name, names[job.locale]);
      assert.deepEqual(job.answers.productInterest.selection, { packageId: "standard-guided", travelers: 6 });
    }
  });

  await t.test("custom quotes omit priced selection while forged group, package, identity, locale and landing path create no records", () => {
    reset();
    for (const locale of Object.keys(names)) assert.equal(submit(args(locale, false)).outcome, "created");
    assert.equal(count("inquiries"), 4);
    for (const travelers of [2, 4, 8, 12, "6", 6.1]) {
      const body = args(); body.p_product_interest.selection.travelers = travelers;
      assert.throws(() => submit(body), /invalid quote product selection/u);
    }
    for (const overrides of [
      { p_product_interest: { slug, name: names.en, selection: { packageId: "no-guide", travelers: 6 } } },
      { p_product_interest: { slug, name: "A different product" } },
      { p_product_interest: { slug: "guilin-li-river-yangshuo-3-day-private-tour", name: names.en } },
      { p_product_interest: { slug, name: names.en, price: 450 } },
      { p_product_interest: { slug, name: names.en, selection: { packageId: "standard-guided", travelers: 6, confirmed: true } } },
      { p_landing_path: "/tours/guilin-yangshuo-5-day-private-tour/" },
      { p_locale: "es" },
    ]) assert.throws(() => submit({ ...args(), ...overrides }));
    assert.equal(count("inquiries"), 4); assert.equal(count("notification_outbox"), 4);
  });

  await t.test("service-only public RPC and private-helper privileges remain closed to anonymous and authenticated users", () => {
    const privileges = json(`select jsonb_agg(jsonb_build_object('schema',n.nspname,'name',p.proname,
      'anon',has_function_privilege('anon',p.oid,'EXECUTE'),'authenticated',has_function_privilege('authenticated',p.oid,'EXECUTE'),
      'service',has_function_privilege('service_role',p.oid,'EXECUTE')) order by n.nspname,p.proname)
      from pg_proc p join pg_namespace n on n.oid=p.pronamespace
      where p.proname in ('private_tour_product_name_v1','is_valid_private_tour_selection_v1',
      'create_homeground_private_tour_quote_v1','create_homeground_private_tour_quote_with_traffic_v1');`);
    for (const privilege of privileges) {
      assert.equal(privilege.anon, false); assert.equal(privilege.authenticated, false);
      assert.equal(privilege.service, privilege.schema === "public");
    }
  });

  await t.test("missing required helper aborts the increment without partially replacing the other definition", () => {
    const earlierName = db.sql("select prosrc from pg_proc where oid='homeground_private.private_tour_product_name_v1(text,text)'::regprocedure;");
    db.sql("alter function homeground_private.is_valid_private_tour_selection_v1(text,text,integer) rename to fixture_hidden_selection_v1;");
    try {
      assert.throws(() => db.sql(migration), /required private tour helpers are missing/u);
      assert.equal(db.sql("select prosrc from pg_proc where oid='homeground_private.private_tour_product_name_v1(text,text)'::regprocedure;"), earlierName);
    } finally {
      db.sql("alter function homeground_private.fixture_hidden_selection_v1(text,text,integer) rename to is_valid_private_tour_selection_v1;");
    }
  });
});
