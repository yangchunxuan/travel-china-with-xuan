import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = async (relativePath) => (await readFile(path.join(projectRoot, relativePath), "utf8")).replaceAll("\r\n", "\n");

const reservations = await import("../../lib/attractionReservations.ts");
const copyModule = await import("../../lib/attractionReservationsI18n.ts");
const messageModule = await import("../../lib/attractionReservationMessage.ts");
const feeFormat = await import("../../lib/attractionReservationFeeFormat.ts");

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

/** Operators whose own statements (kept in their guides) say they have not authorised third-party agents. */
const operatorStatementRuleIds = ["forbidden-city", "shaanxi-history-museum"];

/** Absolute terms China's Advertising Law bans from the service copy. */
const bannedAbsolute = /100\s*%|绝对|absolutely|零风险|保证\s*100/iu;

/**
 * Sales copy says only what we do. It never quotes an operator's statement
 * about third parties, never says whether we hold any authorisation, and
 * never claims to be an attraction's seller, agent or partner or to have a
 * relationship with its staff.
 */
const authorisationWords = /authori[sz]|授权|승인/iu;
const authorisationClaims = /(?:authori[sz]ed|official|appointed) (?:ticket )?(?:seller|agent|partner|reseller)|partner of|in partnership with|合作伙伴|官方代理|指定代理|官方合作|内部(?:票|渠道|关系)|공식 판매처|공식 대리점|제휴사|staff|工作人员|직원|inside contact|connections? (?:at|with) the/iu;

/** Every mention of the booking guarantee, per language: the lead time and the full refund. */
const guaranteeLead = { en: /at least 8 days before (?:your|the) visit/u, zh: /至少 8 天/u, ko: /최소 8일 전/u };
const guaranteeRefund = { en: /full refund|refunded in full/u, zh: /全额退还/u, ko: /전액 환불/u };
const retiredNoGuarantee =
  /cannot promise (?:availability|a slot)|Availability is never certain|What we cannot promise|cannot guarantee availability|不保证有余量|无法保证有余量|余量永远无法保证|无法承诺一定约到|我们无法承诺的事|잔여분은 (?:보장되지|확실하지)|약속할 수 (?:는 )?없|보장하지 않습니다\. 인기/u;

/** The attraction reservation sections of the legal copy (terms and refund & delivery, every language). */
function legalReservationSections(legal) {
  const sections = [...legal.matchAll(/id: "attraction-reservations",[\s\S]*?(?=\n {8}\{\n {10}id: "|\n {6}\],\n)/gu)].map((match) => match[0]);
  const constants = legal.match(/const reservationGuarantee = \{[\s\S]*?\n\} as const;\n\nconst reservationLate = \{[\s\S]*?\n\} as const;/u);
  assert.ok(constants, "legal copy states the guarantee as shared constants");
  return { sections, constants: constants[0] };
}

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
      assert.ok(rule.verifiedAt <= "2026-10-10", `${rule.id}: verifiedAt is not in the future`);
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
    "lingyin-feilai-peak": [/free admission but requires a real-name timed reservation/u, /passports are accepted/u, /reviewedAt: "2026-09-26"/u],
    "humble-administrators-garden": [/¥80 in April, May and July–October/u, /1–7 days before visiting/u],
    "li-river-cruise": [/RMB 215/u, /RMB 360/u, /15 days ahead/u],
    "jade-dragon-snow-mountain": [/RMB 100 entry plus a RMB 20 eco-bus/u, /RMB 120/u, /RMB 40/u, /daily at 20:00/u, /21:00/u, /4 March 2026/u],
    "hanging-temple": [/"Climbing", "RMB 100"/u, /"RMB 15"/u, /up to 7 days ahead between 07:20 and 21:00/u, /half an hour before opening/u, /afternoon batch at 12:00/u, /2,475/u],
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

test("sales copy says what we do and neither quotes operator statements nor claims authorisation", async () => {
  const noResale = { en: /do not resell tickets/u, zh: /不转售/u, ko: /되팔(?:지 않|거나 금액을 더하지 않)/u };
  const carveOut = /not its agent|its ticket or reservation agents|不是(?:故宫|博物馆)的代理|대리점이 아니|do not sell its tickets|不销售故宫门票|입장권을 판매하지 않습니다/u;
  const refusal = /do not book|don't book|不代订|예약하지 않습니다/u;
  for (const id of operatorStatementRuleIds) {
    const rule = reservations.getAttractionReservationRule(id);
    assert.equal(rule.status, "offered", id);
    for (const locale of locales) {
      for (const text of [rule.notes[locale], rule.disclosure[locale]]) {
        assert.doesNotMatch(text, authorisationWords, `${id}: ${locale} no operator statement or authorisation wording`);
        assert.doesNotMatch(text, /We have no authorisation|未获得(?:故宫|博物馆)?授权|승인을 받지 않았/u, `${id}: ${locale}`);
        assert.match(text, noResale[locale], `${id}: ${locale} says we do not resell`);
        assert.doesNotMatch(text, carveOut, `${id}: ${locale}`);
        assert.doesNotMatch(text, refusal, `${id}: ${locale} no longer says we do not book it`);
      }
    }
    if (id === "forbidden-city") {
      for (const locale of locales) {
        assert.match(rule.notes[locale], /(?:do not resell tickets or add a mark-up|不转售、不加价|되팔거나 금액을 더하지 않으며)/u, `${locale}: no resale, no mark-up`);
        assert.match(rule.notes[locale], /(?:official channel in the visitor's own passport name|官方渠道以每位游客本人的护照实名|공식 채널에서 방문자 본인의 여권 실명)/u, `${locale}: official system, own name`);
        assert.match(rule.disclosure[locale], /(?:face value|票面价|공식 가격 그대로)/u, `${locale}: tickets at face value`);
      }
    }
    // The guides keep the operator's own statement as a fact and warn against resellers.
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
  // No rule note or CTA disclosure on the hub or a guide CTA quotes an operator or mentions authorisation.
  for (const rule of reservations.attractionReservationRules) {
    for (const locale of locales) {
      assert.doesNotMatch(rule.notes[locale], authorisationWords, `${rule.id}: ${locale} note`);
      if (rule.disclosure) assert.doesNotMatch(rule.disclosure[locale], authorisationWords, `${rule.id}: ${locale} disclosure`);
    }
  }
  for (const locale of locales) {
    const copy = copyModule.getAttractionReservationCopy(locale);
    const text = JSON.stringify(copy);
    assert.doesNotMatch(text, authorisationWords, `${locale}: hub, FAQ and CTA copy say nothing about authorisation`);
    assert.doesNotMatch(text, authorisationClaims, `${locale}: no seller, agent, partner or staff claim`);
    assert.doesNotMatch(text, refusal, `${locale}: hub copy`);
    assert.doesNotMatch(text, carveOut, `${locale}: hub copy`);
    assert.equal(Object.keys(copy.status).sort().join(","), "not-needed,offered");
  }
  assert.match(copyModule.getAttractionReservationCopy("en").compliance.join(" "), /No resale and no mark-up on tickets.*face value/u);
  assert.match(copyModule.getAttractionReservationCopy("zh").compliance.join(" "), /不转售门票，门票不加价.*票面价/u);
  assert.match(copyModule.getAttractionReservationCopy("ko").compliance.join(" "), /되팔지 않으며.*공식 가격 그대로/u);
  // The guide linked from the Forbidden City guide warns against resold tickets, not against a reservation in the visitor's name.
  const resellerGuide = Object.fromEntries(await Promise.all(locales.map(async (locale) => [locale, await source(`content/guides/official-or-reseller-china-tickets/body.${locale}.ts`)])));
  assert.doesNotMatch(resellerGuide.en, /standalone third-party Forbidden City ticket|No, not a standalone third-party ticket/u);
  assert.doesNotMatch(resellerGuide.zh, /第三方单独故宫门票/u);
  assert.doesNotMatch(resellerGuide.ko, /제3자 단독/u);
  assert.match(resellerGuide.en, /has not authorised third parties to act as ticket or exhibition-reservation agents/u);
  assert.match(resellerGuide.en, /resold Forbidden City ticket/u);
  assert.match(resellerGuide.zh, /转售的故宫门票/u);
  assert.match(resellerGuide.ko, /재판매된 자금성 입장권/u);
  // Terms and refund & delivery sections of the service.
  const legal = await source("lib/homegroundLegalI18n.ts");
  const { sections, constants } = legalReservationSections(legal);
  assert.equal(sections.length, 6, "terms and refund & delivery sections in en, zh and ko");
  for (const text of [...sections, constants]) {
    assert.doesNotMatch(text, authorisationWords, "legal reservation sections say nothing about authorisation");
    assert.doesNotMatch(text, authorisationClaims, "legal reservation sections make no seller, agent or partner claim");
  }
  assert.doesNotMatch(legal, /do not book attractions whose operator|不代订运营方|허가하지 않았다고 밝힌 관광지는 예약하지 않습니다/u);
  assert.doesNotMatch(legal, /not an authorised ticket seller|不是任何景点授权|공식 판매처나 대리점도 아니/u);
  assert.match(legal, /do not resell tickets or add a mark-up, and charge admission at the attraction's official face value/u);
  assert.match(legal, /不转售门票、不加价，门票按景点官方票面价收取/u);
  assert.match(legal, /티켓을 되팔거나 금액을 더하지 않으며, 입장료는 관광지 공식 가격 그대로 받습니다/u);
});

test("the 8-day booking guarantee is stated once as data and repeated everywhere the service is sold", async () => {
  assert.equal(reservations.ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS, 8);
  const guaranteeModule = await import("../../lib/attractionReservationGuarantee.ts");
  assert.equal(guaranteeModule.ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS, 8);
  const fee = { en: "USD 7", zh: "¥45", ko: "₩10,000" };
  for (const locale of locales) {
    const copy = copyModule.getAttractionReservationCopy(locale);
    const check = (text, where) => {
      assert.match(text, guaranteeLead[locale], `${locale} ${where}: 8-day lead time`);
    };
    check(copy.guarantee, "guarantee");
    assert.match(copy.guarantee, guaranteeRefund[locale], `${locale}: full refund of fee and ticket`);
    assert.match(copy.guarantee, { en: /service fee and ticket money/u, zh: /服务费和门票款/u, ko: /수수료와 입장료/u }[locale]);
    assert.match(copy.guarantee, { en: /^Guaranteed booking: /u, zh: /^预约保证：/u, ko: /^예약 보장: /u }[locale]);
    // Later requests are still tried, not guaranteed, and keep the existing refund rule.
    assert.match(copy.guaranteeLate, { en: /later than 8 days/u, zh: /不足 8 天/u, ko: /8일 전보다 늦게/u }[locale]);
    assert.match(copy.guaranteeLate, { en: /not guaranteed, but we still try/u, zh: /仍会尽力预约，但不作保证/u, ko: /시도하되 보장하지는 않습니다/u }[locale]);
    assert.match(copy.guaranteeLate, { en: /refunded in full, together with any ticket money not spent/u, zh: /全额退还该景点的服务费及未使用的门票款/u, ko: /수수료 전액과 사용하지 않은 입장료를 환불/u }[locale]);
    assert.ok(copy.limits.includes(copy.guarantee) && copy.limits.includes(copy.guaranteeLate), `${locale}: refund list`);
    check(copy.pricingLead, "pricing");
    check(copy.enquiry.intro.replace("first visit", "visit").replace("첫 방문일", "방문일").replace("第一个参观日", "参观日"), "enquiry");
    check(copy.rulesIntro.replace(/The 8-day booking guarantee/u, "at least 8 days before your visit").replace(/提前 8 天/u, "至少 8 天").replace(/8일 전 예약 보장/u, "최소 8일 전"), "rules intro");
    // The hero shows the fee and ticket facts; the guarantee banner under them carries the lead time.
    assert.equal(copy.heroFacts.length, 2, `${locale}: hero facts`);
    assert.match(copy.guarantee, /8/u, `${locale}: hero guarantee`);
    const guaranteeFaq = copy.faqs.find((item) => guaranteeLead[locale].test(item.answer) && /guaranteed\?|有保证吗|보장되나요/u.test(item.question));
    assert.ok(guaranteeFaq, `${locale}: guarantee FAQ`);
    assert.match(guaranteeFaq.answer, guaranteeRefund[locale]);
    const forbiddenCityFaq = copy.faqs.find((item) => /Forbidden City|故宫|자금성/u.test(item.question));
    check(forbiddenCityFaq.answer, "Forbidden City FAQ");
    for (const body of [copy.guideCta.body, copy.guideCta.bodyPassportUnchecked]) {
      check(body.replace("{fee}", fee[locale]), "guide CTA");
    }
    const text = JSON.stringify(copy);
    assert.doesNotMatch(text, retiredNoGuarantee, `${locale}: blanket "not guaranteed" statements are gone`);
    assert.doesNotMatch(text, bannedAbsolute, `${locale}: no banned absolute terms`);
  }
  for (const rule of reservations.attractionReservationRules) {
    for (const locale of locales) {
      for (const text of [rule.notes[locale], rule.disclosure?.[locale] ?? ""]) {
        assert.doesNotMatch(text, bannedAbsolute, `${rule.id}: ${locale}`);
        assert.doesNotMatch(text, retiredNoGuarantee, `${rule.id}: ${locale}`);
      }
    }
  }
  // The page shows the guarantee in the hero and in the Offer JSON-LD.
  const page = await source("components/AttractionReservationsPage.tsx");
  assert.match(page, /data-reservation-guarantee>\{copy\.guarantee\}/u);
  assert.match(page, /description: `\$\{unitText\}.*\$\{copy\.guarantee\}`/u);
  assert.match(page, /description: `\$\{copy\.lede\}.*\$\{copy\.guarantee\}`/u, "Service JSON-LD description");
  // The copy takes the lead time from the constant, never a typed-in 8.
  const [i18nSource, legal] = await Promise.all([source("lib/attractionReservationsI18n.ts"), source("lib/homegroundLegalI18n.ts")]);
  assert.match(i18nSource, /const days = ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS;/u);
  assert.doesNotMatch(i18nSource, /\b8 days|8 天|8일/u);
  assert.match(legal, /import \{ ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS \} from "\.\/attractionReservationGuarantee";/u);
  assert.doesNotMatch(legal, /\b8 days|8 天|8일/u);
  // Terms and refund & delivery: the guarantee and the later-request rule in every language.
  const { sections, constants } = legalReservationSections(legal);
  assert.match(constants, /at least \$\{guaranteeDays\} days before the visit date, Homeground guarantees the reservation, except at an attraction marked “best effort” on the service page\. If we fail to secure it, the service fee and the ticket money for that attraction are refunded in full\./u);
  assert.match(constants, /在参观日前至少 \$\{guaranteeDays\} 天提交需求并完成付款的，我们保证约到（服务页标注“尽力预约”的景点除外）；万一没约到，全额退还该景点的服务费和门票款。/u);
  assert.match(constants, /방문일 최소 \$\{guaranteeDays\}일 전까지 요청과 결제를 마치시면 예약을 보장합니다\(서비스 페이지에 ‘최선 시도’로 표시된 관광지는 제외\)\. 만약 예약하지 못하면 해당 관광지의 수수료와 입장료를 전액 환불합니다\./u);
  assert.match(constants, /later than \$\{guaranteeDays\} days before the visit is attempted but not guaranteed/u);
  assert.doesNotMatch(constants, bannedAbsolute);
  for (const locale of locales) {
    const inLocale = sections.filter((text) => text.includes(`reservationGuarantee.${locale}`) && text.includes(`reservationLate.${locale}`));
    assert.equal(inLocale.length, 2, `${locale}: terms and refund & delivery state the guarantee`);
  }
  for (const text of sections) {
    assert.doesNotMatch(text, retiredNoGuarantee, "legal reservation sections");
    assert.doesNotMatch(text, bannedAbsolute, "legal reservation sections");
  }
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

test("each chosen attraction gets one visit date in the site's locale-fixed date field", async () => {
  const enquiry = await source("components/AttractionReservationEnquiry.tsx");
  assert.doesNotMatch(enquiry, /type="date"/u);
  // A ticket is for one day: one field per chosen attraction, no from/to range.
  assert.equal((enquiry.match(/<TourDateField /gu) ?? []).length, 1);
  assert.match(enquiry, /chosen\.map\(\(attraction\) => \(\s*<TourDateField [^>]*label=\{attraction\.label\}/u);
  assert.doesNotMatch(enquiry, /setFrom|setTo|copy\.from|copy\.to\b/u);
  assert.match(enquiry, /\{!undecided \? \(/u);
  for (const locale of locales) {
    const copy = copyModule.getAttractionReservationCopy(locale).enquiry;
    assert.equal("from" in copy || "to" in copy || "dates" in copy.message, false, `${locale}: no range labels`);
    assert.match(copy.visitDatesHint, { en: /one day/u, zh: /按天/u, ko: /하루 단위/u }[locale], locale);
  }
});

test("the prepared request carries the service context and no passport field", async () => {
  for (const locale of locales) {
    const copy = copyModule.getAttractionReservationCopy(locale);
    const text = messageModule.attractionReservationMessageText(copy.enquiry.message, {
      cities: ["Beijing"],
      visits: [
        { label: "National Museum of China", date: "2026-10-12" },
        { label: "Temple of Heaven", date: null },
      ],
      travellers: 3,
      note: "Morning\u0007 please",
      pageUrl: `https://homegroundchina.com${reservations.attractionReservationPath[locale]}`,
    });
    assert.match(text, new RegExp(copy.enquiry.message.serviceValue, "u"));
    assert.match(text, /^· National Museum of China: 2026-10-12$/mu);
    assert.match(text, new RegExp(`^· Temple of Heaven: ${copy.enquiry.message.datesUndecided}$`, "mu"));
    assert.doesNotMatch(text, / – /u, "no date range");
    assert.match(text, /: 3$/mu);
    assert.doesNotMatch(text, /\u0007/u);
    assert.match(text, /homegroundchina\.com\/(?:zh\/|ko\/)?services\/china-attraction-reservations\//u);
    const mailto = messageModule.attractionReservationMailtoHref("hello@homegroundchina.com", copy.enquiry.message, {
      cities: [], visits: [], travellers: null, note: "", pageUrl: "https://homegroundchina.com/",
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

test("public copy avoids checkout language", async () => {
  const files = [
    "lib/attractionReservationsI18n.ts",
    "lib/attractionReservations.ts",
    "components/AttractionReservationsPage.tsx",
    "components/content/GuideReservationCta.tsx",
  ];
  for (const file of files) {
    const text = await source(file);
    assert.doesNotMatch(text, /Book now|Buy now|Checkout/u, file);
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

test("the request form comes right after the steps, with a summary and folded city rules", async () => {
  const [page, enquiry, opener] = await Promise.all([
    source("components/AttractionReservationsPage.tsx"),
    source("components/AttractionReservationEnquiry.tsx"),
    source("components/OpenDetailsForHash.tsx"),
  ]);
  // Order: steps → form → price → guarantee → what we do → passport → rules → FAQ.
  const order = ["reservation-steps-title", "reservation-enquiry-title", "reservation-price-title", "reservation-limits-title", "reservation-what-title", "reservation-passport-title", "reservation-rules-title", "reservation-faq-title"]
    .map((id) => page.indexOf(`aria-labelledby="${id}"`));
  assert.ok(order.every((index) => index > 0), "every section is present");
  assert.deepEqual([...order].sort((a, b) => a - b), order, "sections are in the new order");
  // The hero shows the Forbidden City (the headline's subject), not a panda.
  assert.match(page, /\/images\/guides\/forbidden-city-for-foreign-visitors\/hero-1600\.webp/u);
  assert.doesNotMatch(page, /hero-panda/u);

  // Rules: one closed disclosure per city, keeping the #city-<id> anchors destination pages link to.
  assert.match(page, /<details className=\{styles\.ruleCity\} data-keep-in-view="" id=\{`city-\$\{cityId\}`\}/u);
  assert.match(page, /<OpenDetailsForHash \/>/u);
  assert.match(opener, /closest\("details"\)/u);
  assert.match(opener, /addEventListener\("hashchange", open\)/u);
  // An unconfirmed field shows a dash with the words kept for screen readers.
  assert.match(page, /<span aria-hidden="true">—<\/span><span className=\{styles\.visuallyHidden\}>\{unknownText\}<\/span>/u);
  for (const locale of locales) {
    const copy = copyModule.getAttractionReservationCopy(locale);
    assert.match(copy.unknownLegend, /—/u, `${locale}: legend explains the dash`);
    assert.match(copy.attractionCount.other, /\{count\}/u);
  }

  // Form: attractions grouped under their city, no separate city choice.
  assert.doesNotMatch(enquiry, /name="city"/u);
  assert.match(enquiry, /role="group"/u);
  // Summary: attractions with dates, travellers, fee × people × attractions, tickets, then the send buttons.
  assert.match(enquiry, /<aside aria-labelledby=\{`\$\{id\}-summary`\} className=\{styles\.enquiryAside\}>/u);
  // The client form never imports the reservations library, which pulls in the tour catalogue.
  assert.doesNotMatch(enquiry, /from "\.\.\/lib\/attractionReservations"/u);
  // Units in the fee formula, a date button per attraction without a date, KakaoTalk first on Korean pages.
  assert.match(enquiry, /\{countText\(copy\.summaryPeople, draft\.travellers\)\}<\/span>\s*\{" × "\}<span className=\{styles\.nowrap\}>\{countText\(copy\.summaryAttractions, chosen\.length\)\}/u);
  assert.match(enquiry, /onClick=\{\(\) => focusDateField\(attractionId\)\}/u);
  assert.match(enquiry, /\{kakao\}\s*<a aria-label=\{kakao && copy\.whatsappShort \? copy\.whatsapp : undefined\} className=\{kakao \? styles\.secondaryButton : styles\.primaryButton\}/u);

  // Each bookable rule links back to the picker with that attraction ticked, and names it for screen readers.
  assert.match(page, /data-reserve-attraction=\{rule\.id\} href=\{`#\$\{reservationFormAnchor\}`\}>\{copy\.reserveThis\}<span className=\{styles\.visuallyHidden\}>/u);
  assert.match(enquiry, /<div className=\{styles\.enquiryLayout\} id=\{formId\}>/u);
  assert.match(enquiry, /closest\("\[data-reserve-attraction\]"\)/u);
  // Phones hide dash cells but name them in the card footer, with the checked date.
  assert.match(page, /<td className=\{styles\.cardFooter\}>[\s\S]{0,240}<span className=\{styles\.pendingFields\}>\{copy\.unknown\}\{colon\}\{pending\.join\(listSeparator\)\}<\/span>/u);
  // A rule's link shows its result: the new date field (or chip) scrolls into view and a status line names it.
  assert.match(enquiry, /setAddedMessage\(copy\.added\.replace\("\{name\}", match\.label\)\)/u);
  assert.match(enquiry, /<p className=\{styles\.visuallyHidden\} role="status">\{addedMessage\}<\/p>/u);
  // "Choose a date" opens that field's calendar rather than raising a phone keypad.
  assert.match(enquiry, /querySelector<HTMLButtonElement>\('button\[aria-haspopup="dialog"\]'\)/u);
  // A city closed from its sticky row scrolls back into view.
  assert.match(page, /data-keep-in-view=""/u);
  for (const locale of locales) {
    const copy = copyModule.getAttractionReservationCopy(locale);
    assert.match(copy.enquiry.added, /\{name\}/u, `${locale}: the added status names the attraction`);
    assert.ok(copy.enquiry.summaryPeople.one.includes("{n}") && copy.enquiry.summaryAttractions.other.includes("{n}"));
  }
});

test("the summary total is the displayed unit fee times people and attractions", () => {
  for (const locale of locales) {
    const display = reservations.attractionReservationFeeDisplay(reservations.attractionReservationServiceFeeCny, locale);
    const unit = feeFormat.formatAttractionReservationFeeDisplay(display);
    assert.equal(unit, reservations.formatAttractionReservationFee(reservations.attractionReservationServiceFeeCny, locale), locale);
    const total = feeFormat.formatAttractionReservationFeeDisplay(display, 6);
    assert.equal(total.replace(/\D/gu, ""), String(display.amount * 6), `${locale}: ${total}`);
    assert.throws(() => feeFormat.formatAttractionReservationFeeDisplay(display, 0));
  }
});

test("a best-effort attraction is tagged everywhere it is sold and promises a refund, not a booking", async () => {
  const bestEffort = reservations.attractionReservationRules.filter((rule) => rule.bestEffort);
  assert.deepEqual(bestEffort.map((rule) => rule.id), ["hanging-temple"]);
  for (const rule of bestEffort) {
    assert.equal(rule.status, "offered");
    for (const locale of locales) {
      assert.match(rule.disclosure[locale], { en: /^Best effort, not guaranteed/u, zh: /^尽力预约，不作保证/u, ko: /^최선 시도, 보장하지 않음/u }[locale]);
      assert.match(rule.disclosure[locale], guaranteeRefund[locale]);
      assert.match(rule.disclosure[locale], { en: /service fee and ticket money are refunded in full/u, zh: /全额退还服务费和门票款/u, ko: /수수료와 입장료를 전액 환불/u }[locale]);
      assert.doesNotMatch(rule.disclosure[locale], /not spent|未使用|사용하지 않은/u, `${locale}: best-effort failure refunds all ticket money`);
    }
  }
  for (const locale of locales) {
    const copy = copyModule.getAttractionReservationCopy(locale);
    assert.match(copy.guarantee, { en: /except at an attraction marked “best effort”/u, zh: /标注“尽力预约”的景点除外/u, ko: /‘최선 시도’로 표시된 관광지는 제외/u }[locale]);
    assert.ok(copy.bestEffortTag.trim(), `${locale}: tag`);
    assert.match(copy.guideCta.bodyBestEffort, guaranteeRefund[locale]);
    assert.match(copy.guideCta.bodyBestEffort, { en: /both are refunded in full/u, zh: /两者全额退还/u, ko: /둘 다 전액 환불/u }[locale]);
    assert.doesNotMatch(copy.guideCta.bodyBestEffort, guaranteeLead[locale], `${locale}: no lead-time guarantee on a best-effort CTA`);
    const label = `${bestEffort[0].name[locale]} · ${copy.bestEffortTag}`;
    const message = messageModule.attractionReservationMessageText(copy.enquiry.message, {
      cities: [copy.cities.datong],
      visits: [{ label, date: "2026-11-01" }],
      travellers: 2,
      note: "",
      pageUrl: "https://example.invalid/",
    });
    assert.ok(message.includes(label), `${locale}: prepared contact message retains the best-effort label`);
  }
  const [page, cta] = await Promise.all([source("components/AttractionReservationsPage.tsx"), source("components/content/GuideReservationCta.tsx")]);
  assert.match(page, /rule\.bestEffort \? <span className=\{styles\.status\} data-status="best-effort">\{copy\.bestEffortTag\}<\/span>/u);
  assert.match(page, /label: rule\.bestEffort \? `\$\{rule\.name\[locale\]\} · \$\{copy\.bestEffortTag\}`/u);
  assert.match(cta, /rule\.bestEffort \? copy\.bodyBestEffort/u);
});

test("every generic guarantee entry point explicitly excludes best-effort attractions", () => {
  const exceptions = {
    en: /except at an attraction marked “best effort”/u,
    zh: /标注“尽力预约”的景点除外/u,
    ko: /‘최선 시도’로 표시된 관광지는 제외/u,
  };
  for (const locale of locales) {
    const copy = copyModule.getAttractionReservationCopy(locale);
    const faq = copy.faqs.find(({ question }) => /guaranteed\?|有保证吗|보장되나요/u.test(question));
    assert.ok(faq, `${locale}: generic guarantee FAQ`);
    for (const [entry, text] of [
      ["hero", copy.guarantee],
      ["request step", copy.steps[0].body],
      ["pricing lead", copy.pricingLead],
      ["rules intro", copy.rulesIntro],
      ["guarantee FAQ", faq.answer],
      ["enquiry intro", copy.enquiry.intro],
    ]) {
      assert.match(text, exceptions[locale], `${locale} ${entry}: exception cannot be omitted`);
      assert.match(text, /8/u, `${locale} ${entry}: existing lead time is preserved`);
    }
    const forbiddenCityFaq = copy.faqs.find(({ question }) => /Forbidden City|故宫|자금성/u.test(question));
    for (const unchanged of [forbiddenCityFaq.answer, copy.guideCta.body, copy.guideCta.bodyPassportUnchecked]) {
      assert.match(unchanged, guaranteeLead[locale], `${locale}: normal attraction guarantees remain`);
      assert.doesNotMatch(unchanged, exceptions[locale], `${locale}: no best-effort exception added to an ordinary attraction CTA`);
    }
  }
});

test("Hanging Temple lists climbing and distant-view prices without requiring a combined purchase", () => {
  const rule = reservations.getAttractionReservationRule("hanging-temple");
  assert.equal(rule.price.kind, "cny");
  assert.equal(rule.price.amount, 100);
  assert.equal(reservations.attractionReservationServiceFeeCny, 45);
  for (const locale of locales) {
    const basis = rule.price.basis[locale];
    assert.match(basis, { en: /climbing ticket; distant-view entry ticket CNY 15/u, zh: /登临票；远观入园票 ¥15/u, ko: /등반 티켓; 원경 관람 입장권 15위안/u }[locale]);
    assert.match(basis, /2026/u, `${locale}: historical news-report date retained`);
    assert.doesNotMatch(basis, /plus|must|both|另加|必须|合买|별도|필수|함께 구매/iu, `${locale}: no unsupported mandatory combination`);
  }
});

test("terms and refund city lists include Datong without replacing the existing cities", async () => {
  const legal = await source("lib/homegroundLegalI18n.ts");
  const lists = {
    en: { prefix: "Beijing, Shanghai, Suzhou, Hangzhou, Xi'an, Chengdu, Guilin", complete: "Beijing, Shanghai, Suzhou, Hangzhou, Xi'an, Chengdu, Guilin, Lijiang and Datong" },
    zh: { prefix: "北京、上海、苏州、杭州、西安、成都、桂林", complete: "北京、上海、苏州、杭州、西安、成都、桂林、丽江、大同" },
    ko: { prefix: "베이징·상하이·쑤저우·항저우·시안·청두·계림", complete: "베이징·상하이·쑤저우·항저우·시안·청두·계림·리장·다퉁" },
  };
  for (const locale of locales) {
    const paragraphs = legal.split("\n").filter((line) => line.includes(lists[locale].prefix));
    assert.equal(paragraphs.length, 3, `${locale}: terms intro, terms scope and refund intro`);
    for (const paragraph of paragraphs) {
      assert.ok(paragraph.includes(lists[locale].complete), `${locale}: policy city list matches the service scope`);
    }
  }
});
