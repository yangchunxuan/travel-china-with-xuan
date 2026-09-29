import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) => readFile(path.join(projectRoot, relativePath), "utf8");

const reservations = await import("../../lib/attractionReservations.ts");
const copyModule = await import("../../lib/attractionReservationsI18n.ts");
const messageModule = await import("../../lib/attractionReservationMessage.ts");

const locales = ["en", "zh", "ko"];
const isoDate = /^\d{4}-\d{2}-\d{2}$/u;

test("every reservation rule is dated and traced to an existing guide", async () => {
  const ids = new Set();
  for (const rule of reservations.attractionReservationRules) {
    assert.ok(!ids.has(rule.id), `${rule.id}: duplicate id`);
    ids.add(rule.id);
    assert.ok(reservations.attractionReservationCityIds.includes(rule.city), `${rule.id}: city`);
    assert.match(rule.verifiedAt, isoDate, `${rule.id}: verifiedAt`);
    for (const locale of locales) {
      assert.ok(rule.name[locale]?.trim(), `${rule.id}: ${locale} name`);
      assert.ok(rule.notes[locale]?.trim(), `${rule.id}: ${locale} notes`);
      if (rule.release) assert.ok(rule.release[locale]?.trim(), `${rule.id}: ${locale} release`);
    }
    if (rule.status === "offered" || rule.status === "excluded" || rule.status === "not-needed") {
      assert.ok(rule.source, `${rule.id}: a ${rule.status} rule needs a source guide`);
    }
    if (rule.source) {
      const metadata = JSON.parse(await source(`content/guides/${rule.source}/metadata.json`));
      assert.equal(metadata.id, rule.source);
    }
  }
});

test("a rule without a verified booking rule stays empty instead of inventing facts", () => {
  for (const rule of reservations.attractionReservationRules.filter((candidate) => candidate.status === "ask")) {
    assert.equal(rule.channels, null, `${rule.id}: channels`);
    assert.equal(rule.passportAccepted, null, `${rule.id}: passport`);
    assert.equal(rule.realName, null, `${rule.id}: real name`);
    assert.equal(rule.release, null, `${rule.id}: release`);
    assert.equal(rule.price, null, `${rule.id}: price`);
  }
});

test("published face values and release rules are copied from the source guide", async () => {
  const expectedEvidence = {
    "terracotta-warriors": [/120 yuan/u],
    "chengdu-panda-base": [/CNY 55/u, /up to 14 days ahead/u],
    "xian-city-wall": [/CNY 54/u, /staffed window/u],
    "national-museum-of-china": [/within seven days/u, /17:00 Beijing time/u, /three time windows/u],
    "shaanxi-history-museum": [/five days ahead at 17:00/u, /has not authorised third-party platforms/u],
    "forbidden-city": [/has not authorised third-party ticket agents/u, /20:00/u],
    "shanghai-museum-east": [/without an advance reservation/u],
  };
  for (const [id, patterns] of Object.entries(expectedEvidence)) {
    const rule = reservations.getAttractionReservationRule(id);
    assert.ok(rule, id);
    const body = await source(`content/guides/${rule.source}/body.en.ts`);
    for (const pattern of patterns) assert.match(body, pattern, `${id}: ${pattern}`);
  }
  for (const rule of reservations.attractionReservationRules) {
    if (rule.price?.kind !== "cny") continue;
    assert.ok(expectedEvidence[rule.id], `${rule.id}: a CNY price needs checked guide evidence`);
  }
});

test("operators that refuse third parties are excluded and never carry a booking CTA", () => {
  const excluded = reservations.attractionReservationRules.filter((rule) => rule.status === "excluded").map((rule) => rule.id).sort();
  assert.deepEqual(excluded, ["forbidden-city", "shaanxi-history-museum"]);
  for (const [guideId, attractionId] of Object.entries(reservations.attractionReservationGuideTargets)) {
    const rule = reservations.getAttractionReservationRule(attractionId);
    assert.equal(rule?.status, "offered", `${guideId} → ${attractionId}`);
    assert.equal(reservations.getGuideAttractionReservationTarget(guideId)?.id, attractionId);
  }
  assert.equal(reservations.getGuideAttractionReservationTarget("forbidden-city-for-foreign-visitors"), null);
  assert.equal(reservations.getGuideAttractionReservationTarget("shaanxi-history-museum-booking-and-collection-plan"), null);
  assert.equal(reservations.getGuideAttractionReservationTarget("xian-city-wall-tickets-gates-walk-or-bike"), null);
});

test("the service fee shows one currency per language and never less than CNY 45", () => {
  assert.equal(reservations.attractionReservationServiceFeeCny, 45);
  assert.match(reservations.formatAttractionReservationFee(45, "en"), /^USD\s7$/u);
  assert.equal(reservations.formatAttractionReservationFee(45, "zh"), "¥45");
  assert.equal(reservations.formatAttractionReservationFee(45, "ko"), "₩10,000");
  assert.ok(7 * 6.5 >= 45);
  assert.ok(10_000 / 215 >= 45);
  assert.equal(
    reservations.attractionReservationHref("zh", "terracotta-warriors"),
    "/zh/services/china-attraction-reservations/?attraction=terracotta-warriors#reservation-enquiry",
  );
  assert.equal(
    reservations.attractionReservationHref("en", "forbidden-city"),
    "/services/china-attraction-reservations/#reservation-enquiry",
  );
});

test("the prepared request carries the service context and no passport field", async () => {
  for (const locale of locales) {
    const copy = copyModule.getAttractionReservationCopy(locale);
    const text = messageModule.attractionReservationMessageText(copy.enquiry.message, {
      cities: ["Beijing"],
      attractions: ["National Museum of China", "Temple of Heaven"],
      from: "2026-10-12",
      to: "2026-10-14",
      travellers: 3,
      note: "Morning\u0007 please",
      pageUrl: `https://homegroundchina.com${reservations.attractionReservationPath[locale]}`,
    });
    assert.match(text, new RegExp(copy.enquiry.message.serviceValue, "u"));
    assert.match(text, /National Museum of China; Temple of Heaven/u);
    assert.match(text, /2026-10-12 – 2026-10-14/u);
    assert.match(text, /: 3$/mu);
    assert.doesNotMatch(text, /\u0007/u);
    assert.match(text, /homegroundchina\.com\/(?:zh\/|ko\/)?services\/china-attraction-reservations\//u);
    const mailto = messageModule.attractionReservationMailtoHref("hello@homegroundchina.com", copy.enquiry.message, {
      cities: [], attractions: [], from: null, to: null, travellers: null, note: "", pageUrl: "https://homegroundchina.com/",
    });
    assert.ok(mailto.startsWith("mailto:hello@homegroundchina.com?subject="));
  }
  const component = await source("components/AttractionReservationEnquiry.tsx");
  assert.doesNotMatch(component, /name="passport|passportNumber/iu);
  assert.match(component, /KakaoTalkContact/u);
  assert.match(component, /homegroundWhatsAppHref/u);
});

test("public copy avoids checkout language and promises of availability", async () => {
  const files = [
    "lib/attractionReservationsI18n.ts",
    "lib/attractionReservations.ts",
    "components/AttractionReservationsPage.tsx",
    "components/content/GuideReservationCta.tsx",
  ];
  for (const file of files) {
    const text = await source(file);
    assert.doesNotMatch(text, /\bguaranteed\b|Book now|Buy now|Checkout/u, file);
  }
  for (const locale of locales) {
    const copy = copyModule.getAttractionReservationCopy(locale);
    assert.ok(copy.passportBody.length > 60);
    assert.equal(copy.faqs.length >= 5, true);
  }
});

test("the page is a public, indexable system identity with reciprocal alternates", async () => {
  const [metadata, route, localizedRoute, adapter, sitemap] = await Promise.all([
    source("lib/attractionReservationMetadata.ts"),
    source("app/(default)/services/china-attraction-reservations/page.tsx"),
    source("app/(localized)/[locale]/services/china-attraction-reservations/page.tsx"),
    source("lib/legacySystemContentAdapter.ts"),
    source("app/sitemap.ts"),
  ]);
  assert.match(metadata, /"zh-Hans": attractionReservationPath\.zh/u);
  assert.match(metadata, /robots: \{ index: true, follow: true \}/u);
  assert.match(metadata, /resolvePageTitle/u);
  assert.match(route, /AttractionReservationsPage locale="en"/u);
  assert.match(localizedRoute, /localizedRouteLocale/u);
  assert.match(adapter, /id: "attraction-reservations"/u);
  assert.match(sitemap, /system-attraction-reservations/u);
});
