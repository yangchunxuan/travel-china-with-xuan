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

/** Offered attractions whose booking rule no guide records yet. */
const unverifiedRuleIds = [
  "great-wall-badaling",
  "great-wall-mutianyu",
  "shanghai-museum-peoples-square",
  "shanghai-tower",
  "huaqing-palace",
  "jinsha-site-museum",
  "west-lake-boat",
];

/**
 * Source guides that are not about one attraction. The Jiangnan route
 * comparison records the Lingyin rule, but its footer belongs to the private
 * tours it compares, so it carries no reservation CTA.
 */
const routeSourceGuides = new Set(["first-china-trip-jiangnan-6-or-beijing-11-days"]);

/** Operators whose own statements say they have not authorised third-party agents. */
const operatorStatementRuleIds = ["forbidden-city", "shaanxi-history-museum"];

const hasRuleFacts = (rule) =>
  rule.channels !== null ||
  rule.passportAccepted !== null ||
  rule.realName !== null ||
  rule.release !== null ||
  rule.price !== null;

test("every reservation rule is dated and traced to an existing guide", async () => {
  const ids = new Set();
  for (const rule of reservations.attractionReservationRules) {
    assert.ok(!ids.has(rule.id), `${rule.id}: duplicate id`);
    ids.add(rule.id);
    assert.ok(reservations.attractionReservationCityIds.includes(rule.city), `${rule.id}: city`);
    if (rule.source) {
      assert.match(rule.verifiedAt, isoDate, `${rule.id}: verifiedAt`);
      assert.ok(rule.verifiedAt <= "2026-09-30", `${rule.id}: verifiedAt is not in the future`);
    } else {
      assert.equal(rule.verifiedAt, null, `${rule.id}: a row without a source guide has no check date`);
    }
    for (const locale of locales) {
      assert.ok(rule.name[locale]?.trim(), `${rule.id}: ${locale} name`);
      assert.ok(rule.notes[locale]?.trim(), `${rule.id}: ${locale} notes`);
      if (rule.release) assert.ok(rule.release[locale]?.trim(), `${rule.id}: ${locale} release`);
    }
    assert.ok(["offered", "not-needed"].includes(rule.status), `${rule.id}: status ${rule.status}`);
    if (hasRuleFacts(rule) || rule.status === "not-needed") {
      assert.ok(rule.source, `${rule.id}: a rule that states facts needs a source guide`);
    }
    if (rule.disclosure) {
      for (const locale of locales) assert.ok(rule.disclosure[locale]?.trim(), `${rule.id}: ${locale} disclosure`);
    }
    if (rule.source) {
      const metadata = JSON.parse(await source(`content/guides/${rule.source}/metadata.json`));
      assert.equal(metadata.id, rule.source);
    }
  }
});

test("a rule without a verified booking rule stays empty instead of inventing facts", () => {
  const unverified = reservations.attractionReservationRules.filter(
    (rule) => unverifiedRuleIds.includes(rule.id) || rule.source === null,
  );
  assert.deepEqual(unverified.map((rule) => rule.id).sort(), [...unverifiedRuleIds].sort());
  for (const rule of unverified) {
    assert.equal(rule.status, "offered", `${rule.id}: status`);
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
    "lingyin-feilai-peak": [/free admission but requires a real-name timed reservation/u, /reviewedAt: "2026-09-26"/u],
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

test("every attraction is bookable except free walk-in entry, and nothing is excluded", () => {
  const rules = reservations.attractionReservationRules;
  const notNeeded = rules.filter((rule) => rule.status === "not-needed").map((rule) => rule.id);
  assert.deepEqual(notNeeded, ["shanghai-museum-east"]);
  assert.equal(reservations.getAttractionReservationRule("shanghai-museum-east").price.kind, "free-walk-in");
  const bookable = reservations.getBookableAttractionReservationRules().map((rule) => rule.id).sort();
  assert.deepEqual(bookable, rules.filter((rule) => rule.id !== "shanghai-museum-east").map((rule) => rule.id).sort());
  for (const id of ["forbidden-city", "shaanxi-history-museum", "xian-city-wall", "national-museum-of-china", "sanxingdui-museum", "tiananmen-square", ...unverifiedRuleIds]) {
    assert.ok(bookable.includes(id), `${id} is bookable`);
  }
  const cityWall = reservations.getAttractionReservationRule("xian-city-wall");
  assert.match(cityWall.notes.en, /Walk-up windows also sell tickets/u);
  assert.match(cityWall.disclosure.en, /Walk-up windows also sell tickets/u);
});

test("operators' third-party statements stay disclosed and the guides warn against resellers, not against us", async () => {
  const statement = { en: /has not authorised/u, zh: /未授权第三方/u, ko: /승인하지 않았다/u };
  // A plain "no authorisation" statement, never "not its agent", which reads
  // as if the operator's statement covered only agents it appointed itself.
  const noAuthorisation = { en: /We have no authorisation from the museum/u, zh: /我们未获得(?:故宫|博物馆)授权/u, ko: /승인을 받지 않았으며/u };
  const carveOut = /not its agent|its ticket or reservation agents|不是(?:故宫|博物馆)的代理|대리점이 아니|do not sell its tickets|不销售故宫门票|입장권을 판매하지 않습니다/u;
  const refusal = /do not book|don't book|不代订|예약하지 않습니다/u;
  for (const id of operatorStatementRuleIds) {
    const rule = reservations.getAttractionReservationRule(id);
    assert.equal(rule.status, "offered", id);
    for (const locale of locales) {
      for (const text of [rule.notes[locale], rule.disclosure[locale]]) {
        assert.match(text, statement[locale], `${id}: ${locale} keeps the operator statement`);
        assert.match(text, noAuthorisation[locale], `${id}: ${locale} says we have no authorisation from the operator`);
        assert.doesNotMatch(text, carveOut, `${id}: ${locale} does not narrow the operator statement`);
        assert.doesNotMatch(text, refusal, `${id}: ${locale} no longer says we do not book it`);
      }
    }
    if (id === "forbidden-city") {
      // Quote the museum exactly, as the source guides do.
      assert.match(rule.notes.en, /has not authorised third parties to act as ticket or exhibition-reservation agents/u);
      assert.match(rule.disclosure.en, /has not authorised third parties to act as ticket or exhibition-reservation agents/u);
      for (const locale of locales) {
        assert.match(rule.notes[locale], /(?:do not resell tickets or add a mark-up|不转售、不加价|되팔거나 금액을 더하지 않으며)/u, `${locale}: no resale, no mark-up`);
      }
    }
    const guideId = rule.source;
    assert.equal(reservations.getGuideAttractionReservationTarget(guideId)?.id, id);
    const bodies = Object.fromEntries(await Promise.all(locales.map(async (locale) => [locale, await source(`content/guides/${guideId}/body.${locale}.ts`)])));
    assert.match(bodies.en, /has not authorised third-party/u, `${guideId}: authorisation fact kept`);
    assert.match(bodies.en, /reseller or scalper as unverified/u, `${guideId}: warning is about sellers`);
    assert.match(bodies.zh, /未授权第三方/u);
    assert.match(bodies.zh, /经销商或黄牛/u);
    assert.match(bodies.ko, /승인하지 않았/u);
    assert.match(bodies.ko, /재판매처나 암표상/u);
  }
  for (const locale of locales) {
    const copy = copyModule.getAttractionReservationCopy(locale);
    const text = JSON.stringify(copy);
    assert.doesNotMatch(text, refusal, `${locale}: hub copy`);
    assert.doesNotMatch(text, carveOut, `${locale}: hub copy does not narrow the operator statements`);
    assert.equal(Object.keys(copy.status).sort().join(","), "not-needed,offered");
  }
  assert.match(copyModule.getAttractionReservationCopy("en").compliance.join(" "), /not an authorised ticket seller or agent of any attraction/u);
  assert.match(copyModule.getAttractionReservationCopy("zh").compliance.join(" "), /不是任何景点授权的售票方或代理/u);
  assert.match(copyModule.getAttractionReservationCopy("ko").compliance.join(" "), /공식 판매처나 대리점도 아니/u);
  // The guide linked from the Forbidden City guide warns against resold tickets, not against a reservation in the visitor's name.
  const resellerGuide = Object.fromEntries(await Promise.all(locales.map(async (locale) => [locale, await source(`content/guides/official-or-reseller-china-tickets/body.${locale}.ts`)])));
  assert.doesNotMatch(resellerGuide.en, /standalone third-party Forbidden City ticket|No, not a standalone third-party ticket/u);
  assert.doesNotMatch(resellerGuide.zh, /第三方单独故宫门票/u);
  assert.doesNotMatch(resellerGuide.ko, /제3자 단독/u);
  assert.match(resellerGuide.en, /has not authorised third parties to act as ticket or exhibition-reservation agents/u);
  assert.match(resellerGuide.en, /resold Forbidden City ticket/u);
  assert.match(resellerGuide.zh, /转售的故宫门票/u);
  assert.match(resellerGuide.ko, /재판매된 자금성 입장권/u);
  const legal = await source("lib/homegroundLegalI18n.ts");
  assert.doesNotMatch(legal, /do not book attractions whose operator|不代订运营方|허가하지 않았다고 밝힌 관광지는 예약하지 않습니다/u);
  assert.match(legal, /Homeground is not an authorised ticket seller or agent of any attraction/u);
});

test("guide CTAs cover every guided attraction the ownership registry allows", async () => {
  const registry = JSON.parse(await source("docs/organic-growth/high-intent-cta-ownership-registry.json"));
  const blocked = new Set(
    registry.entries
      .filter((entry) => entry.ctaPlacement === "specialized-cta-blocked-generic-footer-only")
      .map((entry) => entry.contentId),
  );
  for (const [guideId, attractionId] of Object.entries(reservations.attractionReservationGuideTargets)) {
    const rule = reservations.getAttractionReservationRule(attractionId);
    assert.equal(rule?.status, "offered", `${guideId} → ${attractionId}`);
    assert.equal(reservations.getGuideAttractionReservationTarget(guideId)?.id, attractionId);
    assert.ok(!blocked.has(guideId), `${guideId}: specialised CTAs are blocked by the ownership registry`);
  }
  assert.equal(reservations.getGuideAttractionReservationTarget("forbidden-city-for-foreign-visitors")?.id, "forbidden-city");
  assert.equal(reservations.getGuideAttractionReservationTarget("shaanxi-history-museum-booking-and-collection-plan")?.id, "shaanxi-history-museum");
  assert.equal(reservations.getGuideAttractionReservationTarget("xian-city-wall-tickets-gates-walk-or-bike")?.id, "xian-city-wall");
  // Registry-blocked transfer guides keep only their generic footer CTA.
  assert.equal(reservations.getGuideAttractionReservationTarget("beijing-to-badaling-great-wall-transfer"), null);
  assert.equal(reservations.getGuideAttractionReservationTarget("beijing-to-mutianyu-great-wall-transfer"), null);
  // Every offered rule whose source guide is free to carry it has a CTA there.
  for (const rule of reservations.attractionReservationRules) {
    if (rule.status !== "offered" || !rule.source || blocked.has(rule.source) || routeSourceGuides.has(rule.source)) continue;
    const target = reservations.getGuideAttractionReservationTarget(rule.source);
    assert.ok(target, `${rule.source}: guide for ${rule.id} carries a reservation CTA`);
  }
  const cta = await source("components/content/GuideReservationCta.tsx");
  assert.match(cta, /rule\.disclosure/u);
  // The "own passport name" body is only for attractions whose guide confirms passports.
  assert.match(cta, /rule\.passportAccepted === true \? copy\.body : copy\.bodyPassportUnchecked/u);
  for (const locale of locales) {
    const copy = copyModule.getAttractionReservationCopy(locale).guideCta;
    assert.doesNotMatch(copy.bodyPassportUnchecked, /own passport name|本人护照实名|여권 실명/u, `${locale}: unchecked-passport CTA body`);
  }
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
    "/services/china-attraction-reservations/?attraction=forbidden-city#reservation-enquiry",
  );
  assert.equal(
    reservations.attractionReservationHref("en", "shanghai-museum-east"),
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
  // Only the Korean page shows a KakaoTalk button, so only Korean copy names it.
  for (const locale of ["en", "zh"]) {
    assert.doesNotMatch(JSON.stringify(copyModule.getAttractionReservationCopy(locale)), /KakaoTalk|카카오/u, `${locale}: no KakaoTalk channel`);
  }
  const component = await source("components/AttractionReservationEnquiry.tsx");
  assert.match(component, /locale === "ko" \? <KakaoTalkContact/u);
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

test("search copy leads with the Forbidden City and the owner's refund and privacy clauses stay", async () => {
  const lead = { en: /Forbidden City/u, zh: /故宫/u, ko: /자금성/u };
  const yes = { en: /^Yes\./u, zh: /^可以。/u, ko: /^네\./u };
  for (const locale of locales) {
    const copy = copyModule.getAttractionReservationCopy(locale);
    assert.match(copy.metadata.title, lead[locale], `${locale}: title`);
    if (locale === "en") {
      assert.ok(copy.metadata.title.length <= 60, "en: title fits a search result");
      assert.ok(copy.metadata.description.replace("{fee}", "USD 7").length <= 155, "en: description fits a search result");
    }
    assert.match(copy.metadata.description, lead[locale], `${locale}: description`);
    assert.match(copy.h1, lead[locale], `${locale}: h1`);
    const forbiddenCityFaq = copy.faqs.find((item) => lead[locale].test(item.question));
    assert.ok(forbiddenCityFaq, `${locale}: Forbidden City FAQ`);
    assert.match(forbiddenCityFaq.answer, yes[locale], `${locale}: Forbidden City FAQ answers yes`);
    assert.doesNotMatch(copy.enquiry.attractionsHint, /ask us|可询问|‘문의’로/u);
  }
  const [legal, privacy] = await Promise.all([source("lib/homegroundLegalI18n.ts"), source("lib/homegroundPrivacyI18n.ts")]);
  assert.match(legal, /You may cancel by email before we complete the reservation; the service fee and ticket money received are refunded in full\./u);
  assert.match(legal, /在我们完成预约前，你可以通过邮件取消，已收取的服务费和门票款全额退还。/u);
  assert.match(legal, /예약을 완료하기 전이라면 이메일로 취소할 수 있으며, 받은 수수료와 입장료를 전액 환불합니다\./u);
  assert.match(privacy, /Full name as printed, passport number, nationality and, where the booking form asks, date of birth or passport expiry/u);
  const page = await source("components/AttractionReservationsPage.tsx");
  assert.equal((page.match(/<h1>/gu) ?? []).length, 1);
  // A free walk-in row says "not applicable", and an unchecked row shows no date.
  assert.match(page, /rule\.status === "not-needed" \? copy\.notApplicable : copy\.unknown/u);
  assert.match(page, /copy\.notChecked/u);
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
