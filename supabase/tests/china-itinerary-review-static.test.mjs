import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("route planning keeps the three commercial paths and fixed-scope boundaries", async () => {
  const [page, copy] = await Promise.all([
    source("components/ChinaItineraryReviewPage.tsx"),
    source("lib/chinaItineraryReviewI18n.ts"),
  ]);
  const commercialSurface = `${page}\n${copy}`;

  assert.equal(page.match(/<h1>/g)?.length, 1);
  assert.match(copy, /Review My Route/);
  assert.match(copy, /Build My Route/);
  assert.match(copy, /Full Trip Planning & Ground Support/);
  assert.match(copy, /price: "69"/);
  assert.match(copy, /price: "129"/);
  assert.match(copy, /Up to 10 travel days/);
  assert.match(copy, /up to 4 overnight bases/);
  assert.match(copy, /one shared route for 1–4 travellers/);
  assert.match(page, /service=itinerary-review/);
  assert.match(page, /service=route-build/);
  assert.match(page, /service=full-trip-support/);
  assert.match(copy, /No online payment is taken/);
  assert.match(copy, /does not take payment or accept file uploads/);
  assert.match(copy, /It is not a booking or payment/);
  assert.doesNotMatch(commercialSurface, /Buy now|Checkout|Add to cart/);
  assert.doesNotMatch(commercialSurface, /consolidated clarification|structural revision/);
});

test("Chinese and Korean service pages are complete localized products", async () => {
  const [copy, component, route] = await Promise.all([
    source("lib/chinaItineraryReviewI18n.ts"),
    source("components/ChinaItineraryReviewPage.tsx"),
    source("app/(localized)/[locale]/china-itinerary-review/page.tsx"),
  ]);

  assert.match(copy, /path: "\/zh\/china-itinerary-review\/"/);
  assert.match(copy, /path: "\/ko\/china-itinerary-review\/"/);
  assert.match(copy, /title: "中国旅行路线审核与规划"/);
  assert.match(copy, /title: "중국 여행 일정 검토 및 동선 설계"/);
  assert.match(copy, /审核我的路线/);
  assert.match(copy, /为我规划路线/);
  assert.match(copy, /내 일정 검토/);
  assert.match(copy, /내 동선 설계/);
  assert.match(copy, /这里不会收取在线付款/);
  assert.match(copy, /온라인 결제는 받지 않습니다/);
  assert.match(component, /locale\?: HomegroundLocale/);
  assert.match(component, /getChinaItineraryReviewCopy\(locale\)/);
  assert.match(component, /data-homeground-locale=\{locale\}/);
  assert.match(component, /lang=\{homeCopy\.htmlLang\}/);
  assert.match(route, /value === "zh" \|\| value === "ko"/);
  assert.match(route, /getChinaItineraryReviewLanguagePaths/);
  assert.match(route, /<ChinaItineraryReviewPage locale=\{locale\}/);
});

test("localized metadata, canonical paths, hreflang and structured data agree", async () => {
  const [page, defaultRoute, localizedRoute, copy, sitemap] = await Promise.all([
    source("components/ChinaItineraryReviewPage.tsx"),
    source("app/(default)/china-itinerary-review/page.tsx"),
    source("app/(localized)/[locale]/china-itinerary-review/page.tsx"),
    source("lib/chinaItineraryReviewI18n.ts"),
    source("app/sitemap.ts"),
  ]);

  assert.match(page, /<main id="itinerary-review-content" tabIndex=\{-1\}>/);
  assert.match(page, /aria-label=\{copy\.hero\.pricesAriaLabel\}/);
  assert.match(page, /<details key=\{item\.question\}>/);
  assert.match(page, /"@type": "Service"/);
  assert.match(page, /"@type": "FAQPage"/);
  assert.match(page, /price: "69"/);
  assert.match(page, /price: "129"/);
  assert.match(page, /inLanguage: homeCopy\.htmlLang/);
  assert.doesNotMatch(page, /AggregateRating|ReviewCount/);
  assert.match(defaultRoute, /languages: getChinaItineraryReviewLanguagePaths\(\)/);
  assert.match(localizedRoute, /canonical: copy\.path/);
  assert.match(localizedRoute, /locale === "zh" \? "zh_CN" : "ko_KR"/);
  assert.match(copy, /"zh-Hans": zh\.path/);
  assert.match(copy, /"x-default": en\.path/);
  assert.match(sitemap, /itineraryReviewLanguages/);
  assert.match(sitemap, /\/zh\/china-itinerary-review\//);
  assert.match(sitemap, /\/ko\/china-itinerary-review\//);
});

test("localized service intent reaches the existing enquiry mechanism", async () => {
  const [home, services, finder, handoff] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("lib/routeServiceInterest.ts"),
    source("components/RouteFinder.tsx"),
    source("components/PlannerHandoff.tsx"),
  ]);

  assert.match(home, /getRouteServiceInterest\(serviceId, locale\)/);
  assert.match(
    home,
    /const activeRouteServiceInterest: RouteServiceInterest \| null =\s*planningIntent && planningIntent !== "explore"\s*\? getRouteServiceInterest\(planningIntent, locale\)\s*: null/,
  );
  assert.doesNotMatch(home, /locale === "en" \? routeServiceInterest : null/);
  assert.match(home, /serviceInterest=\{activeRouteServiceInterest\}/);
  assert.match(home, /planningIntent=\{planningIntent\}/);
  assert.match(
    home,
    /onPlanningIntentChange=\{handlePlanningIntentChange\}/,
  );
  assert.match(services, /routeServiceInterestByLocale/);
  assert.match(services, /审核我的路线/);
  assert.match(services, /내 일정 검토/);
  assert.match(services, /selectedServiceAriaLabel/);
  assert.match(services, /tripContextHint/);
  assert.match(finder, /<HomepagePlanningIntentSelector/);
  assert.match(
    finder,
    /<HomepageSelectedIntent[\s\S]*value=\{planningIntent\}/,
  );
  assert.match(
    finder,
    /planningCopy\.paidBriefs\[serviceInterest\.id\]/,
  );
  assert.match(handoff, /serviceInterest\.handoffLabel/);
  assert.match(handoff, /serviceInterest\.tripContextLabel/);
  assert.match(handoff, /serviceInterest\.tripContextHint/);
  assert.match(handoff, /note: inquiryNote/);
  assert.match(handoff, /name="tripContext"/);
  assert.match(handoff, /maximumTripContextLength/);
  assert.match(handoff, /serviceInterest\.note/);
  assert.doesNotMatch(handoff, /\["service",\s*"[^"]+"\]/);
});

test("localized navigation switches between matching service pages", async () => {
  const [header, footer] = await Promise.all([
    source("components/HomegroundHeader.tsx"),
    source("components/HomegroundFooter.tsx"),
  ]);

  assert.match(header, /getChinaItineraryReviewCopy\(locale\)/);
  assert.match(header, /pageContext === "services"[\s\S]*getChinaItineraryReviewCopy\(targetLocale\)\.path[\s\S]*languageHash/);
  assert.match(header, /planningServicesCopy\.navigationLabel/);
  assert.match(footer, /planningServicesCopy\.navigationLabel/);
  assert.match(footer, /pageContext === "services"/);
  assert.match(footer, /aria-current="page"/);
});
