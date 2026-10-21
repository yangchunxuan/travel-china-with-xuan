import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import {
  currentHomepageEmailFormVersion,
  currentPrivateTourQuoteFormVersion,
  emailInquiryLandingPaths,
  englishInquiryEditionLanguages,
  homepageEmailInquirySchemaVersion,
  homepageEmailPrivacyNoticeVersion,
  inquiryPageLanguage,
  privateTourQuoteSchemaVersion,
  travellerAckPrivacyNoticeVersion,
  validateAndNormalizeInquiry,
} from "../../lib/inquiryContract.ts";
import { getPrivateTourInquiryContext, getPrivateTourInquirySubmissionContext, isPrivateTourInquirySlug } from "../../lib/privateTourInquiryContext.ts";
import { privateTourProducts } from "../../lib/privateTourProducts.ts";
import { frenchContactEdition } from "../../lib/frenchContactEdition.ts";
import { germanContactEdition } from "../../lib/germanContactEdition.ts";
import { spanishContactEdition } from "../../lib/spanishContactEdition.ts";
import { arabicContactEdition } from "../../lib/arabicContactEdition.ts";
import { localizeFrenchPrivateTourProduct } from "../../lib/localizeFrenchPrivateTourProduct.ts";
import { localizeGermanPrivateTourProduct } from "../../lib/localizeGermanPrivateTourProduct.ts";
import { localizeSpanishPrivateTourProduct } from "../../lib/localizeSpanishPrivateTourProduct.ts";
import { localizeArabicPrivateTourProduct } from "../../lib/localizeArabicPrivateTourProduct.ts";

const config = {
  allowedFormVersions: [currentHomepageEmailFormVersion, currentPrivateTourQuoteFormVersion],
  allowedPrivacyNoticeVersions: [homepageEmailPrivacyNoticeVersion, travellerAckPrivacyNoticeVersion],
};
const slug = "beijing-highlights-5-day-private-tour";
const editions = [
  [frenchContactEdition, localizeFrenchPrivateTourProduct],
  [germanContactEdition, localizeGermanPrivateTourProduct],
  [spanishContactEdition, localizeSpanishPrivateTourProduct],
  [arabicContactEdition, localizeArabicPrivateTourProduct],
];
const ownSurface = { en: "/", zh: "/zh/", ko: "/ko/", ja: "/ja/" };
const editionHomes = ["/fr/", "/de/", "/es/", "/ar/"];

const homepageEmail = (locale, landingPath, productSlug = null) => ({
  schemaVersion: homepageEmailInquirySchemaVersion, formVersion: currentHomepageEmailFormVersion,
  entryPath: "homepage_email", locale, contact: { channel: "email", email: "traveller@example.invalid" },
  privacyNoticeVersion: travellerAckPrivacyNoticeVersion,
  productInterest: productSlug ? getPrivateTourInquirySubmissionContext(getPrivateTourInquiryContext(productSlug, locale), locale) : null,
  attribution: { landingPath }, experiment: null, antiAbuse: { companyWebsite: "" },
});
const quote = (locale, landingPath, productSlug = slug) => ({
  schemaVersion: privateTourQuoteSchemaVersion, formVersion: currentPrivateTourQuoteFormVersion,
  entryPath: "private_tour_quote", locale, contact: { channel: "email", email: "traveller@example.invalid" },
  productInterest: getPrivateTourInquirySubmissionContext(getPrivateTourInquiryContext(productSlug, locale, { packageId: "no-guide", travelers: 4 }), locale),
  travelDate: "2027-04-03", note: "Two rooms.", privacyNoticeVersion: travellerAckPrivacyNoticeVersion,
  attribution: { landingPath }, experiment: null, antiAbuse: { companyWebsite: "" },
});
const accepts = (payload, message) => {
  const result = validateAndNormalizeInquiry(payload, config);
  assert.equal(result.ok, true, `${message}: ${JSON.stringify(result.fieldErrors ?? {})}`);
  return result.value;
};
const rejectsPath = (payload, message) => {
  const result = validateAndNormalizeInquiry(payload, config);
  assert.equal(result.ok, false, message);
  assert.equal(result.fieldErrors["attribution.landingPath"], "invalid", message);
};

test("the edition list is the four English-filed editions, and each surface is derived from it", () => {
  assert.deepEqual([...englishInquiryEditionLanguages], ["fr", "de", "es", "ar"]);
  assert.deepEqual(emailInquiryLandingPaths("en"), ["/", ...editionHomes]);
  assert.deepEqual(emailInquiryLandingPaths("en", slug), [`/tours/${slug}/`, ...editionHomes.map((home) => `${home}tours/${slug}/`)]);
  for (const locale of ["zh", "ko", "ja"]) {
    assert.deepEqual(emailInquiryLandingPaths(locale), [ownSurface[locale]]);
    assert.deepEqual(emailInquiryLandingPaths(locale, slug), [`${ownSurface[locale]}tours/${slug}/`]);
  }
});

test("homepage email keeps every old surface and accepts the edition homes for English only", () => {
  for (const locale of ["en", "zh", "ko", "ja"]) {
    const value = accepts(homepageEmail(locale, ownSurface[locale]), `${locale} old surface`);
    assert.equal(value.locale, locale);
    assert.equal(value.attribution.landingPath, ownSurface[locale]);
  }
  for (const home of editionHomes) {
    const value = accepts(homepageEmail("en", home), `en ${home}`);
    assert.equal(value.locale, "en", "the locale stays English for emails, analytics and stored rows");
    assert.equal(value.attribution.landingPath, home);
    accepts(homepageEmail("en", home, slug), `en ${home} with a tour`);
    for (const locale of ["zh", "ko", "ja"]) rejectsPath(homepageEmail(locale, home), `${locale} cannot borrow ${home}`);
  }
  for (const path of ["/it/", "/fr", "fr/", "//fr/", "/FR/", "/fr/?lang=fr", "/fr/#x", "/fr/tours/", `/fr/tours/${slug}/`, "/fr/guides/", "/es/guias/", "/zh/", "/ko/", "/ja/", "/tours/", ""]) {
    rejectsPath(homepageEmail("en", path), `en ${JSON.stringify(path)}`);
  }
  rejectsPath(homepageEmail("zh", "/"), "zh keeps exactly its own surface");
});

test("private-tour quote keeps every old tour path and accepts the edition tour pages for English only", () => {
  for (const locale of ["en", "zh", "ko", "ja"]) {
    const path = `${ownSurface[locale]}tours/${slug}/`;
    assert.equal(accepts(quote(locale, path), `${locale} old path`).attribution.landingPath, path);
  }
  for (const home of editionHomes) {
    const path = `${home}tours/${slug}/`;
    const value = accepts(quote("en", path), `en ${path}`);
    assert.equal(value.locale, "en");
    assert.equal(value.attribution.landingPath, path);
    for (const locale of ["zh", "ko", "ja"]) rejectsPath(quote(locale, path), `${locale} cannot borrow ${path}`);
    rejectsPath(quote("en", `${home}tours/great-wall-2-day-private-tour/`), `en ${home} with another tour's page`);
    rejectsPath(quote("en", home), `en ${home} without the tour`);
    rejectsPath(quote("en", `${home}tours/${slug}`), `en ${home} without the trailing slash`);
  }
  for (const path of [`/it/tours/${slug}/`, `/fr/zh/tours/${slug}/`, `/zh/tours/${slug}/`, `/es/guias/${slug}/`, `//fr/tours/${slug}/`]) {
    rejectsPath(quote("en", path), `en ${path}`);
  }
});

test("every edition's home and tour pages are exactly the paths the contract accepts", () => {
  let checked = 0;
  for (const [edition, localize] of editions) {
    assert.ok(editionHomes.includes(edition.homePath), edition.language);
    assert.equal(edition.homePath, `/${edition.language}/`);
    accepts(homepageEmail("en", edition.homePath), `${edition.language} home`);
    rejectsPath(homepageEmail("zh", edition.homePath), `${edition.language} home under zh`);
    for (const product of privateTourProducts) {
      if (!isPrivateTourInquirySlug(product.slug)) continue;
      const page = localize(product);
      // The quote dialog only opens on edition.tourPath(slug); it must be the published page.
      assert.equal(edition.tourPath(product.slug), page.path, `${edition.language} ${product.slug}`);
      assert.equal(edition.tourSlugFromPath(page.path), product.slug);
      const context = getPrivateTourInquiryContext(product.slug, "en");
      const value = accepts({ ...quote("en", page.path), productInterest: getPrivateTourInquirySubmissionContext(context, "en") }, `${edition.language} ${product.slug}`);
      assert.equal(value.attribution.landingPath, page.path);
      checked += 1;
    }
  }
  assert.ok(checked >= 4 * 10, `checked ${checked} edition tour pages`);
});

test("the page language is read from the landing path", () => {
  const cases = [
    ["/", "en", "English (/)", false], [`/tours/${slug}/`, "en", "English (/)", false], ["/destinations/", "en", "English (/)", false],
    ["/zh/", "zh", "Chinese (/zh/)", false], ["/ko/tours/x/", "ko", "Korean (/ko/)", false], ["/ja/", "ja", "Japanese (/ja/)", false],
    ["/fr/", "fr", "French (/fr/)", true], [`/de/tours/${slug}/`, "de", "German (/de/)", true],
    ["/es/", "es", "Spanish (/es/)", true], ["/ar/", "ar", "Arabic (/ar/)", true],
  ];
  for (const [path, code, label, edition] of cases) {
    const page = inquiryPageLanguage(path);
    assert.equal(page?.code, code, path); assert.equal(page?.label, label, path); assert.equal(page?.edition, edition, path);
  }
  for (const path of [null, undefined, "", "fr/", "//fr/", "https://homegroundchina.com/fr/", 7]) assert.equal(inquiryPageLanguage(path), null, String(path));
});

test("edition forms send their own page; English-page forms and analytics are unchanged", () => {
  const source = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
  assert.match(source("components/HomepageQuickContact.tsx"), /landingPath: edition\?\.homePath \?\? inquirySubmitSurfaceByLocale\[locale\],/u);
  assert.match(source("components/ContactCardDialog.tsx"), /attribution: \{ landingPath: edition\?\.homePath \?\? inquirySubmitSurfaceByLocale\[locale\] \}/u);
  const panel = source("components/TourContactPanel.tsx");
  assert.match(panel, /const tourPagePath = \(slug: string\) => edition \? edition\.tourPath\(slug\) : `\$\{locale === "en" \? "" : `\/\$\{locale\}`\}\/tours\/\$\{slug\}\/`;/u);
  assert.match(panel, /attribution: \{ landingPath: tourPagePath\(context\.slug\) \}/u);
  // Edition quotes never emitted these events (their old path was the English page); keep it so.
  assert.match(panel, /const stillOnSource = \(\) => !edition && window\.location\.pathname === submitted\.attribution\.landingPath;/u);
  for (const file of ["components/FrenchHomeContact.tsx", "components/GermanHomeContact.tsx", "components/SpanishHomeContact.tsx", "components/ArabicHomeContact.tsx"]) {
    assert.match(source(file), /<HomepageQuickContact locale="en" [^>]*edition=\{(?:french|german|spanish|arabic)ContactEdition\}/u, file);
  }
});

const migrations = new URL("../migrations/", import.meta.url);
const migrationSource = (name) => readFileSync(new URL(name, migrations), "utf8").replace(/\r\n?/gu, "\n");
const definition = (text, name) => {
  const start = text.indexOf(`create or replace function public.${name}(`);
  assert.ok(start >= 0, name);
  return text.slice(start, text.indexOf("\n$$;\n", start) + 5);
};

test("the migration copies both submit functions exactly and changes only the landing-path condition", () => {
  const previous = migrationSource("202609300001_add_northeast_winter_preview_tours.sql");
  const next = migrationSource("202610220001_record_edition_inquiry_landing_path.sql");
  const homeOld = `    or p_landing_path is distinct from (
      case p_locale
        when 'en' then '/'
        when 'zh' then '/zh/'
        when 'ko' then '/ko/'
        when 'ja' then '/ja/'
        else null
      end
    )
`;
  const homeNew = `    or (
      p_landing_path is distinct from (
        case p_locale
          when 'en' then '/'
          when 'zh' then '/zh/'
          when 'ko' then '/ko/'
          when 'ja' then '/ja/'
          else null
        end
      )
      and (
        p_locale is distinct from 'en'
        or coalesce(p_landing_path not in ('/fr/', '/de/', '/es/', '/ar/'), true)
      )
    )
`;
  const quoteOld = `    or p_landing_path is distinct from (
      case p_locale when 'en' then '/' when 'zh' then '/zh/' when 'ko' then '/ko/' when 'ja' then '/ja/' end
      || 'tours/' || product_slug || '/'
    )
`;
  const quoteNew = `    or (
      p_landing_path is distinct from (
        case p_locale when 'en' then '/' when 'zh' then '/zh/' when 'ko' then '/ko/' when 'ja' then '/ja/' end
        || 'tours/' || product_slug || '/'
      )
      and (
        p_locale is distinct from 'en'
        or coalesce(p_landing_path not in (
          '/fr/tours/' || product_slug || '/',
          '/de/tours/' || product_slug || '/',
          '/es/tours/' || product_slug || '/',
          '/ar/tours/' || product_slug || '/'
        ), true)
      )
    )
`;
  for (const [name, before, after] of [
    ["create_homeground_homepage_email_v1", homeOld, homeNew],
    ["create_homeground_private_tour_quote_v1", quoteOld, quoteNew],
  ]) {
    const old = definition(previous, name);
    assert.equal(old.split(before).length, 2, `${name}: old condition present once`);
    assert.equal(definition(next, name), old.replace(before, after), `${name}: everything else is identical`);
  }
  // 202609300001 held the latest definitions; no migration in between redefined either function.
  for (const file of readdirSyncSorted().filter((name) => name.slice(0, 12) > "202609300001" && name.slice(0, 12) < "202610220001")) {
    assert.doesNotMatch(migrationSource(file), /function\s+public\.create_homeground_(?:homepage_email|private_tour_quote)_v1\s*\(/iu, file);
  }
  // A later redefinition must carry the edition paths forward.
  for (const file of readdirSyncSorted().filter((name) => name.slice(0, 12) > "202610220001")) {
    for (const name of ["create_homeground_homepage_email_v1", "create_homeground_private_tour_quote_v1"]) {
      const text = migrationSource(file);
      if (!text.includes(`function public.${name}(`)) continue;
      for (const language of englishInquiryEditionLanguages) assert.ok(definition(text, name).includes(`'/${language}/`), `${file}: ${name} keeps /${language}/`);
    }
  }
  // The edition list in SQL matches the contract.
  for (const language of englishInquiryEditionLanguages) {
    assert.ok(homeNew.includes(`'/${language}/'`)); assert.ok(quoteNew.includes(`'/${language}/tours/'`));
  }
  assert.match(next, /^begin;$/mu); assert.match(next, /\ncommit;\n$/u);
});

function readdirSyncSorted() {
  return readdirSync(migrations).filter((name) => name.endsWith(".sql")).sort();
}

test("claim v5 is v4 plus the landing path, for the service role only", () => {
  const next = migrationSource("202610220001_record_edition_inquiry_landing_path.sql");
  const claim = next.slice(next.indexOf("create function public.claim_homeground_notification_jobs_v5("));
  assert.match(claim, /from public\.claim_homeground_notification_jobs_v4\(p_worker_id, p_job_limit, p_lease_seconds\) claimed/u);
  assert.match(claim, /left join homeground_private\.inquiries inquiry on inquiry\.inquiry_id = claimed\.inquiry_id;/u);
  assert.match(claim, /previous_contact_email text,landing_path text\)/u);
  assert.match(claim, /revoke all on function public\.claim_homeground_notification_jobs_v5\(text, integer, integer\)\n  from public, anon, authenticated;/u);
  assert.match(claim, /grant execute on function public\.claim_homeground_notification_jobs_v5\(text, integer, integer\)\n  to service_role;/u);
  // v5 returns every v4 column in v4's order, then landing_path.
  const v4 = migrationSource("202610110002_inquiry_receipt_and_retry_hardening.sql");
  const columns = (text, name) => text.slice(text.indexOf(`function public.${name}(`)).match(/returns table\(([\s\S]*?)\)\nlanguage/u)[1]
    .split(",").map((column) => column.trim().split(/\s+/u)[0]);
  assert.deepEqual(columns(claim, "claim_homeground_notification_jobs_v5"), [...columns(v4, "claim_homeground_notification_jobs_v4"), "landing_path"]);
  const worker = readFileSync(new URL("../functions/notify-inquiries/index.ts", import.meta.url), "utf8");
  assert.match(worker, /"claim_homeground_notification_jobs_v5"/u);
  assert.doesNotMatch(worker, /"claim_homeground_notification_jobs_v4"/u);
});

test("the planner's notification shows the page language for edition and English-page enquiries", async () => {
  const originalDeno = globalThis.Deno; const originalFetch = globalThis.fetch;
  const env = new Map([
    ["SUPABASE_URL", "https://project.supabase.co"], ["SUPABASE_SECRET_KEYS", JSON.stringify({ default: "test-server-key" })],
    ["NOTIFICATION_WORKER_SECRET", "test-worker-secret-000000000000000000"], ["RESEND_API_KEY", "test-resend-key"],
    ["RESEND_FROM_EMAIL", "Homeground <sender@example.invalid>"], ["BRAND_NOTIFICATION_EMAIL", "planner@example.invalid"],
  ]);
  let handler, currentJob; const messages = [], claims = [];
  const response = (body) => new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve: (fn) => { handler = fn; } };
  globalThis.fetch = async (url, init) => {
    const path = new URL(String(url)).pathname; const body = JSON.parse(init.body);
    if (String(url) === "https://api.resend.com/emails") { messages.push(body); return response({ id: randomUUID() }); }
    if (path.endsWith("/claim_homeground_notification_jobs_v5")) { claims.push(path); return response([currentJob]); }
    if (path.endsWith("/freeze_homeground_notification_message_v1")) return response(body.p_message);
    if (path.endsWith("/finish_homeground_notification_job")) return response(true);
    throw new Error(`Unexpected network request ${url}`);
  };
  const common = () => ({ job_id: randomUUID(), inquiry_id: randomUUID(), public_reference: "HG-TEST", reply_channel: "email",
    contact_email: "traveller@example.invalid", contact_phone_e164: null, departure_country: null, rough_budget_per_person: null,
    inquiry_created_at: new Date().toISOString(), first_response_due_at: new Date().toISOString(), lease_token: randomUUID(), row_version: 1, attempt_count: 1 });
  const homepageJob = (locale, landingPath) => ({ ...common(), locale, route_id: "homepage-email", note: null,
    answers: { informationStatus: "not_provided" }, route_snapshot: { kind: "homepage-email", informationStatus: "not_provided", ruleVersion: "2026-07-26.1" },
    ...(landingPath === undefined ? {} : { landing_path: landingPath }) });
  const quoteJob = (locale, landingPath) => {
    const input = quote(locale, landingPath);
    return { ...common(), locale, route_id: "private-tour-quote", note: input.note, landing_path: landingPath,
      answers: { productInterest: input.productInterest, travelDate: input.travelDate, landingPath },
      route_snapshot: { kind: "private-tour-quote", ruleVersion: currentPrivateTourQuoteFormVersion } };
  };
  try {
    await import(`../functions/notify-inquiries/index.ts?edition=${Date.now()}`); const worker = handler;
    const run = async (job) => {
      currentJob = job;
      return (await worker(new Request("https://project.supabase.co/functions/v1/notify-inquiries", { method: "POST", headers: { "x-worker-secret": env.get("NOTIFICATION_WORKER_SECRET") } }))).json();
    };
    for (const [home, name] of [["/fr/", "French"], ["/de/", "German"], ["/es/", "Spanish"], ["/ar/", "Arabic"]]) {
      assert.equal((await run(homepageJob("en", home))).accepted, 1, home);
      const mail = messages.at(-1);
      assert.equal(mail.subject, `[Homeground][Homepage email] HG-TEST · EN · ${name} page`);
      assert.ok(mail.text.includes(`Language: EN\nPage language: ${name} (${home})`), mail.text);
      assert.ok(mail.html.includes(`<dt>Page language</dt><dd>${name} (${home})</dd>`));
    }
    for (const [locale, home, label] of [["en", "/", "English (/)"], ["zh", "/zh/", "Chinese (/zh/)"], ["ko", "/ko/", "Korean (/ko/)"], ["ja", "/ja/", "Japanese (/ja/)"]]) {
      assert.equal((await run(homepageJob(locale, home))).accepted, 1, home);
      const mail = messages.at(-1);
      assert.equal(mail.subject, `[Homeground][Homepage email] HG-TEST · ${locale.toUpperCase()}`, "English-page subjects are unchanged");
      assert.ok(mail.text.includes(`Page language: ${label}`));
    }
    assert.equal((await run(homepageJob("en", undefined))).accepted, 1, "a job without the field still sends");
    assert.ok(messages.at(-1).text.includes("Page language: (Not recorded)"));

    const germanPage = `/de/tours/${slug}/`;
    assert.equal((await run(quoteJob("en", germanPage))).accepted, 1);
    let mail = messages.at(-1);
    assert.match(mail.subject, /^\[Homeground\]\[Private tour quote\] HG-TEST · EN · German page · /u);
    assert.ok(mail.text.includes("Page language: German (/de/)"));
    assert.ok(mail.text.includes(`Product page: https://homegroundchina.com${germanPage}`));
    assert.ok(mail.html.includes("<dt>Page language</dt><dd>German (/de/)</dd>"));
    assert.equal((await run(quoteJob("en", `/tours/${slug}/`))).accepted, 1);
    mail = messages.at(-1);
    assert.match(mail.subject, /^\[Homeground\]\[Private tour quote\] HG-TEST · EN · Beijing/u);
    assert.ok(mail.text.includes("Page language: English (/)"));
    const before = messages.length;
    assert.equal((await run(quoteJob("zh", `/fr/tours/${slug}/`))).terminalFailed, 1, "a zh quote cannot carry an edition page");
    assert.equal(messages.length, before);
    assert.ok(claims.length > 0);
  } finally { globalThis.Deno = originalDeno; globalThis.fetch = originalFetch; }
});
