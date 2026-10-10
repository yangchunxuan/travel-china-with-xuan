import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) => readFile(path.join(projectRoot, relativePath), "utf8");

const paths = await import("../../lib/fullTripSupport.ts");
const message = await import("../../lib/fullTripSupportMessage.ts");
const locales = ["en", "zh", "ko"];

async function copyFor(locale) {
  // The copy module imports types only, so read it through its exported getter.
  const module = await import("../../lib/fullTripSupportI18n.ts");
  return module.getFullTripSupportCopy(locale);
}

test("full-trip support has its own page in three languages, wired into nav, hub, sitemap and registry", async () => {
  assert.deepEqual(paths.fullTripSupportPath, {
    en: "/services/full-trip-support/",
    zh: "/zh/services/full-trip-support/",
    ko: "/ko/services/full-trip-support/",
  });
  const [enRoute, localizedRoute, nav, hub, sitemap, registry, exportCheck] = await Promise.all([
    source("app/(default)/services/full-trip-support/page.tsx"),
    source("app/(localized)/[locale]/services/full-trip-support/page.tsx"),
    source("lib/homegroundNavigationModel.ts"),
    source("components/TravelServicesHubPage.tsx"),
    source("app/sitemap.ts"),
    source("lib/legacySystemContentAdapter.ts"),
    source("tools/check-search-platform-export.mjs"),
  ]);
  assert.match(enRoute, /<FullTripSupportPage locale="en" \/>/);
  assert.match(localizedRoute, /<FullTripSupportPage locale=\{localizedRouteLocale\(locale\)\} \/>/);
  assert.match(nav, /pathSegment: "services\/full-trip-support\/"/);
  assert.doesNotMatch(nav, /\?service=full-trip-support/);
  assert.match(hub, /return fullTripSupportPath\[locale\];/);
  assert.match(sitemap, /entry\.contentId === "full-trip-support"/);
  assert.match(registry, /id: "full-trip-support",/);
  assert.match(exportCheck, /a custom-quote service must not publish a price/);
});

test("the copy keeps to the service's facts: free brief, written scope, pay after confirmation, no checkout", async () => {
  for (const locale of locales) {
    const copy = await copyFor(locale);
    const all = JSON.stringify(copy);
    // No checkout language, no prices, no train tickets (12306 has no authorised resellers).
    assert.doesNotMatch(all, /Book now|Buy now|Checkout|立即预订|立即购买|바로 구매/u, locale);
    assert.doesNotMatch(all, /\d+\s*(?:USD|CNY|元|위안)|[¥$₩]\s?\d/u, `${locale}: no price is published`);
    assert.doesNotMatch(all, /train|rail|高铁|火车|12306|기차|고속철/iu, `${locale}: no train tickets`);
    // The written proposal and payment order.
    // The full-trip proposal's own points (services, providers, contracting party, scope, price, payee, refunds).
    assert.equal(copy.written.length, 7, locale);
    assert.doesNotMatch(copy.written.join(" "), /Delivery date|交付日期|제공 예정일|revisions|更正|보완/u, `${locale}: not the document-service list`);
    assert.equal(copy.steps.length, 4, locale);
    assert.match(copy.steps[3].body, { en: /only after you confirm the proposal and pay/u, zh: /确认方案并付款后/u, ko: /결제하신 뒤에만/u }[locale]);
    assert.match(copy.faq[1].answer, { en: /free/u, zh: /不收费/u, ko: /무료/u }[locale]);
    assert.match(copy.noOnlinePayment, { en: /no online checkout/u, zh: /不提供在线付款/u, ko: /온라인 결제가 없습니다/u }[locale]);
    assert.match(copy.faq.at(-1).answer, /\{operator\}/u, `${locale}: the operator is named from business data`);
  }
});

test("the trip brief writes only what the traveller typed, in the page language", async () => {
  const copy = await copyFor("zh");
  const pageUrl = "https://homegroundchina.com/zh/services/full-trip-support/";
  const draft = { budget: "9000", currency: "CNY", basis: "person", travellers: "3", days: "8", month: "10", cities: " 北京、西安 ", note: " 带父母\u0007不吃辣\n", pageUrl };
  // The first line names the service and carries the party, length, month, cities and budget,
  // so the phone-scan code keeps them when it has to drop the rest.
  assert.equal(message.fullTripSupportMessage(copy, draft), [
    "你好，我想咨询全程规划与落地支持：3 人，大约 8 天，10 月出发，想去北京、西安，每人 CNY 9,000。",
    "预算只算中国境内的花费，不含国际机票。",
    "还想说：带父母 不吃辣",
    pageUrl,
  ].join("\n"));

  // Nothing is pre-filled: what the traveller has not said is simply absent.
  const blank = { ...draft, budget: "", travellers: "", days: "", month: "", cities: "", note: "" };
  assert.equal(message.fullTripSupportMessage(copy, blank), `你好，我想咨询全程规划与落地支持。\n${pageUrl}`);
  assert.equal(message.fullTripSupportMessage(copy, { ...blank, travellers: "12" }), `你好，我想咨询全程规划与落地支持：12 人，预算待定。\n${pageUrl}`);
  assert.equal(message.fullTripSupportMessage(copy, { ...blank, days: "14" }), `你好，我想咨询全程规划与落地支持：大约 14 天，预算待定。\n${pageUrl}`);
  // Only a few words of their own are still passed on.
  assert.equal(message.fullTripSupportMessage(copy, { ...blank, note: "想看熊猫" }), `你好，我想咨询全程规划与落地支持。\n还想说：想看熊猫\n${pageUrl}`);

  const english = await copyFor("en");
  // A total for the group, in another currency, for one traveller, with the month in words.
  assert.equal(message.fullTripSupportMessage(english, { ...blank, budget: "1500000", currency: "KRW", basis: "group", travellers: "1", days: "8", month: "next April", cities: "Beijing, Xi'an" }).split("\n")[0],
    "Hi, I'd like Homeground's full-trip planning and ground support: 1 traveller, about 8 days, leaving in next April, to see Beijing, Xi'an, KRW 1,500,000 in total.");
  // Any number is passed on exactly as typed: there is no floor or ceiling.
  assert.equal(message.fullTripBudgetText({ budget: "300", currency: "USD" }), "USD 300");
  assert.equal(message.fullTripBudgetText({ budget: "0012000000", currency: "JPY" }), "JPY 12,000,000");
  assert.equal(message.fullTripBudgetText({ budget: "0", currency: "USD" }), "");
  // Typed counts keep digits only; a large party is passed on as typed.
  assert.equal(message.fullTripDigits("0 12a", message.fullTripCountMaxDigits), "12");
  assert.match(message.fullTripSupportMessage(english, { ...blank, travellers: "120", days: "0" }), /: 120 travellers, budget open\.\n/u);
  // A month number stays between 1 and 12; words are trimmed and cut, never rewritten.
  assert.deepEqual(["7", "012", "13", "99"].map(message.fullTripMonthDigits), ["7", "12", "1", "9"]);
  assert.equal(message.fullTripWords("  a\tb\n\nc  ", 10), "a b c");
  assert.equal(message.fullTripWords("x".repeat(500), message.fullTripNoteMaxLength).length, message.fullTripNoteMaxLength);
});

test("the brief is one sentence with blanks: an entry, not a filter, and never a checklist", async () => {
  const sources = await Promise.all([
    source("lib/fullTripSupportMessage.ts"),
    source("components/FullTripSupportEnquiry.tsx"),
    source("components/FullTripSupportPage.tsx"),
  ]);
  for (const text of sources) {
    // No catalogue and no tour price reaches this page.
    assert.doesNotMatch(text, /publishedPrivateTourCatalog|privateTourProducts|formatPrivateTourPrice|privateTourStartingPrice/u);
  }
  const enquiry = sources[1];
  // Full-trip planning: the traveller is never asked to tick hotels, tickets or guides.
  assert.doesNotMatch(enquiry, /fullTripSupportNeeds|fullTripNeedIcons|type="checkbox"|type="radio"/u);
  // Budget, party size and days are typed, start empty, and nothing is stepped or picked from presets.
  assert.doesNotMatch(enquiry, /Stepper|<Minus|<Plus|NumberPicker|Choices|type="range"|required|<datalist/u);
  // The two changeable words unfold their choices in place: no system drop-down.
  assert.doesNotMatch(enquiry, /<select|<option/u);
  assert.equal((enquiry.match(/<Tray<\w+>/gu) ?? []).length, 2, "per person or in total, currency");
  for (const field of ["budget", "travellers", "days", "month", "cities", "note"]) assert.match(enquiry, new RegExp(`const \\[${field}, set[A-Z][a-z]+\\] = useState\\(""\\);`, "u"), field);
  // The whole brief: six clauses, short typed blanks, two open blanks for words, two words to switch, one way to send.
  assert.equal((enquiry.match(/<Clause\b/gu) ?? []).length, 6);
  assert.equal((enquiry.match(/<Blank (?:label|hint)=/gu) ?? []).length, 5, "travellers, days, amount, and the month as a number or in words");
  assert.equal((enquiry.match(/<Lines hint=/gu) ?? []).length, 2, "the cities, and anything else they want to say");
  assert.equal((enquiry.match(/<Pick buttonRef=/gu) ?? []).length, 2, "per person or in total, currency");
  assert.equal((enquiry.match(/styles\.send\b/gu) ?? []).length, 2, "one way to send: KakaoTalk on Korean pages, WhatsApp elsewhere");
  assert.doesNotMatch(enquiry, /primaryButton|secondaryButton|lucide-react/u, "no pill button and no icon");
  // The hero has one order: the headline and one sentence, then the brief. Nothing else.
  const page = sources[2];
  const hero = page.slice(page.indexOf("</nav>", page.indexOf("<header")), page.indexOf("</header>"));
  assert.match(hero, /<h1>[\s\S]*styles\.lede[\s\S]*<FullTripSupportEnquiry locale=\{locale\} \/>\s*$/u);
  assert.doesNotMatch(hero, /heroFacts|eyebrow|<dl|<ul|<ol(?! )/u);
  // The whole trip is ours to arrange: the page never offers to take only parts of it at the top,
  // and carries no icons, cards or spotlight.
  assert.doesNotMatch(page, /pickTitle|pickBody|compareLink|fullTripNeedIcons|lucide-react|PointerSpotlight|data-spotlight|compareCard/u);
  assert.match(page, /<details key=\{item\.question\} name="full-trip-faq">/u, "questions open one at a time");
  for (const locale of locales) {
    const copy = await copyFor(locale);
    assert.ok(!("pickTitle" in copy) && !("compareLink" in copy) && !("heroFacts" in copy), `${locale}: the pick-your-parts copy is gone`);
    assert.doesNotMatch(copy.handlesTitle, /can take on|能帮你|맡을 수 있는/u, `${locale}: what the trip covers, not what may be picked`);
    const all = JSON.stringify([copy.h1Lines, copy.lede, copy.brief, copy.enquiry, copy.faq]);
    assert.doesNotMatch(all, /starts? at|from \{|minimum|at least|not enough|too low|too small|does not reach|起价|最低|不够|够不着|太低|최저|최소|부족/iu, `${locale}: no threshold`);
    assert.doesNotMatch(all, /cheap|lowest price|best price|guarantee|便宜|最低价|保证|저렴|최저가|보장/iu, `${locale}: no price promise`);
    assert.doesNotMatch(all, /定制/u, `${locale}: tailor-made is not the selling point`);
    // One sentence under the headline.
    assert.ok(copy.lede.length <= { en: 90, zh: 30, ko: 50 }[locale], `${locale}: the lede is one short sentence (${copy.lede.length})`);
    // The sentence carries every blank exactly once.
    const sentence = Object.entries(copy.brief.clauses).filter(([key]) => key !== "lengthOne").map(([, clause]) => clause).join(" ");
    for (const token of ["travellers", "days", "basis", "currency", "amount", "month", "cities", "note"]) {
      assert.equal(sentence.split(`{${token}}`).length, 2, `${locale}: {${token}} appears once`);
    }
    assert.match(copy.brief.note, { en: /Leave blank[\s\S]*international flights/u, zh: /可以空着[\s\S]*不含国际机票/u, ko: /비워 두세요[\s\S]*국제선 항공권 제외/u }[locale], `${locale}: anything may stay blank, and flights are out`);
    // The open blanks end their clause, and their grey guidance says they may stay empty or take anything.
    assert.match(copy.brief.clauses.cities, /\{cities\}$/u, locale);
    assert.match(copy.brief.clauses.note, /\{note\}$/u, locale);
    assert.match(copy.brief.citiesHint, { en: /not sure yet/u, zh: /没想好可以空着/u, ko: /미정/u }[locale], locale);
    assert.equal(copy.brief.monthIsNumber, locale !== "en", `${locale}: a month number where the sentence supplies the word`);
    // A budget below the tour pages is still welcome, and so is no budget at all.
    assert.match(copy.faq[2].answer, { en: /leave the budget blank/u, zh: /预算留空/u, ko: /예산은 비워 두세요/u }[locale]);
    assert.match(copy.faq[3].answer, { en: /^Yes\./u, zh: /^可以。/u, ko: /^네\./u }[locale], `${locale}: a lower budget should still ask`);
    assert.match(copy.enquiry.message.budgetPart, /\{budget\}/u, locale);
    assert.match(copy.enquiry.message.length, /\{days\}/u, locale);
    assert.doesNotMatch(copy.enquiry.message.opening, /\{/u, locale);
  }
});

test("the page keeps its form out of the generic contact card and reveals once", async () => {
  const [page, enquiry, reveal, css] = await Promise.all([
    source("components/FullTripSupportPage.tsx"),
    source("components/FullTripSupportEnquiry.tsx"),
    source("components/motion/RevealOnce.tsx"),
    source("components/FullTripSupportPage.module.css"),
  ]);
  // WhatsApp opens the site's scan-to-phone card (code only); the email draft opens directly.
  const whatsapp = enquiry.match(/<a[^>]*href=\{whatsappHref\}[^>]*>/u)?.[0] ?? "";
  assert.match(whatsapp, /data-contact-card-scan-only=""/);
  assert.doesNotMatch(whatsapp, /data-contact-card-direct/);
  assert.match(enquiry.match(/<a[^>]*href=\{emailHref\}[^>]*>/u)?.[0] ?? "", /data-contact-card-direct=""/);
  assert.match(enquiry, /locale === "ko"\s*\? <KakaoTalkContact/);
  assert.match(page, /pageContext="services"/);
  assert.match(page, /<RevealOnce \/>/);
  assert.match(reveal, /prefers-reduced-motion: reduce/);
  assert.match(reveal, /observer\.unobserve\(entry\.target\)/);
  assert.match(css, /\.page \[data-reveal="pending"\] \{/);
  // The JSON-LD Service never carries a price.
  assert.doesNotMatch(page, /priceSpecification|priceCurrency/);
});
