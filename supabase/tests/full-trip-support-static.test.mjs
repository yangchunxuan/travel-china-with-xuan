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

test("the trip brief writes only what the traveller chose, in the page language", async () => {
  const copy = await copyFor("zh");
  const text = message.fullTripSupportMessage(copy, {
    cities: "北京、西安\u0007",
    from: "2026-11-02",
    to: "2026-11-09",
    travellers: "3",
    needs: ["guides", "hotels"],
    note: "带父母",
    pageUrl: "https://homegroundchina.com/zh/services/full-trip-support/",
  });
  assert.match(text, /^你好，我想咨询全程规划与落地支持。/u);
  assert.match(text, /想去的地方：北京、西安$/mu);
  assert.doesNotMatch(text, /\u0007/u);
  assert.match(text, /日期：2026-11-02 – 2026-11-09/u);
  assert.match(text, /人数：3/u);
  // Needs follow the page's order, joined the Chinese way.
  assert.match(text, /需要协助：酒店、私人英文导游/u);
  assert.doesNotMatch(text, /passport|护照号码/u);
  const empty = message.fullTripSupportMessage(copy, { cities: "", from: null, to: null, travellers: "", needs: [], note: "", pageUrl: "x" });
  assert.match(empty, /日期：未定/u);
  // The opening names the service once; no repeated "服务：" line.
  assert.doesNotMatch(text, /^服务：/mu);
  // A range typed end-first is put in order.
  const reversed = message.fullTripSupportMessage(copy, { cities: "", from: "2026-11-09", to: "2026-11-02", travellers: "2", needs: [], note: "", pageUrl: "x" });
  assert.match(reversed, /日期：2026-11-02 – 2026-11-09/u);
});

test("the page keeps its form out of the generic contact card and reveals once", async () => {
  const [page, enquiry, reveal, css] = await Promise.all([
    source("components/FullTripSupportPage.tsx"),
    source("components/FullTripSupportEnquiry.tsx"),
    source("components/motion/RevealOnce.tsx"),
    source("components/FullTripSupportPage.module.css"),
  ]);
  assert.match(enquiry, /data-contact-card-direct=""/);
  assert.match(enquiry, /locale === "ko"\s*\? <KakaoTalkContact/);
  assert.match(page, /pageContext="services"/);
  assert.match(page, /<RevealOnce \/>/);
  assert.match(reveal, /prefers-reduced-motion: reduce/);
  assert.match(reveal, /observer\.unobserve\(entry\.target\)/);
  assert.match(css, /\.page \[data-reveal="pending"\] \{/);
  // The JSON-LD Service never carries a price.
  assert.doesNotMatch(page, /priceSpecification|priceCurrency/);
});
