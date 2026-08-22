import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("Home planning desk leads with quick contacts and keeps three paid shortcuts", async () => {
  const [home, homeCopy, planningDesk, quickContact, planningCopy, services] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("lib/homegroundI18n.ts"),
    source("components/HomepagePlanningDesk.tsx"),
    source("components/HomepageQuickContact.tsx"),
    source("lib/homepagePlanningDesk.ts"),
    source("lib/routeServiceInterest.ts"),
  ]);

  assert.equal(home.match(/<RouteFinder\b/g)?.length, 1);
  assert.match(home, /planningIntent=\{planningIntent\}/);
  assert.match(
    home,
    /onPlanningIntentChange=\{handlePlanningIntentChange\}/,
  );
  assert.match(home, /trackEvent\("planning_intent_selected"/);
  assert.match(home, /homegroundBusiness\.registeredName/);
  assert.match(home, /editorialOrganizationSchema\(\)/);
  assert.match(
    planningDesk,
    /copy\.options\.filter\([\s\S]{0,80}\(option\) => option\.kind === "paid"/,
  );
  assert.match(planningDesk, /<HomepageQuickContact/);
  assert.match(quickContact, /https:\/\/wa\.me\//);
  assert.match(quickContact, /https:\/\/m\.me\/61591910731724/);
  assert.match(quickContact, /entryPath: "homepage_email"/);
  assert.match(
    quickContact,
    /privacyNoticeVersion:\s*homepageEmailPrivacyNoticeVersion/,
  );
  assert.match(
    quickContact,
    /attribution:\s*\{\s*landingPath: inquirySubmitSurfaceByLocale\[locale\],\s*\}/,
  );
  assert.doesNotMatch(
    quickContact,
    /\butm(?:Source|Medium|Campaign)\b|sessionStorage|localStorage|dataLayer/,
  );
  assert.match(homeCopy, /new: "Talk to a China trip planner"/);
  assert.match(homeCopy, /new: "联系旅行规划师"/);
  assert.match(homeCopy, /new: "중국 여행 플래너와 상담하기"/);
  assert.doesNotMatch(planningDesk, /name="homeground-planning-start"/);
  assert.match(planningDesk, /onContinue\(option\.id\)/);
  assert.doesNotMatch(planningDesk, /onContinue\(freeOption\.id\)/);
  assert.doesNotMatch(planningCopy, /freeTool(?:Label|Meta)/);
  assert.match(planningCopy, /id: "conversation"/);
  assert.match(planningCopy, /kind: "conversation"/);
  assert.match(planningCopy, /id: "itinerary-review"/);
  assert.match(planningCopy, /id: "route-build"/);
  assert.match(planningCopy, /id: "full-trip-support"/);
  assert.match(planningCopy, /planningIntent: "conversation"/);
  assert.match(planningCopy, /label: "Trip conversation"/);
  assert.match(
    planningCopy,
    /A Homeground planner reviews the brief and confirms the appropriate next step\./,
  );
  assert.match(services, /label: "Review My Route"/);
  assert.match(services, /label: "Build My Route"/);
  assert.match(services, /label: "Full Trip Planning & Ground Support"/);
  assert.doesNotMatch(planningCopy, /id: "explore"/);
  assert.doesNotMatch(planningCopy, /Free route timing check/);
  assert.doesNotMatch(planningCopy, /automated starting point/i);
  assert.doesNotMatch(planningCopy, /No human review is included/i);
  assert.doesNotMatch(planningCopy, /免费路线(?:查找器|检查)/);
  assert.doesNotMatch(planningCopy, /不包含人工审核/);
  assert.doesNotMatch(planningCopy, /무료 Route Finder/i);
  assert.doesNotMatch(planningCopy, /사람이 직접 검토.*포함되지/);
});

test("Planning Services presents all three paths before education and links to localized Studio", async () => {
  const [page, copy] = await Promise.all([
    source("components/ChinaItineraryReviewPage.tsx"),
    source("lib/chinaItineraryReviewI18n.ts"),
  ]);

  assert.match(page, /id="choose-service"/);
  assert.match(page, /id: "review-my-route"/);
  assert.match(page, /id: "build-my-route"/);
  assert.match(page, /href="#full-trip-support"/);
  assert.match(page, /const studioHref = `\$\{homeCopy\.path\}studio\/`/);
  assert.match(page, /href=\{studioHref\}/);
  assert.match(
    page,
    /const plannerContactHref = `\$\{(?:homeCopy|copy)\.path\}#planner-contact`/,
  );
  assert.match(copy, /Review My Route/);
  assert.match(copy, /Build My Route/);
  assert.match(copy, /Full Trip Planning & Ground Support/);
  assert.match(copy, /A China travel agency, with one clear planning thread\./);
  assert.match(copy, /一家中国旅行社/);
  assert.match(copy, /중국 전문 여행사/);
});

test("English Studio keeps its service comparison and uses the unified planner contact", async () => {
  const page = await source("components/HomegroundStudioPage.tsx");

  assert.match(page, /const planningServicesHref\s*=/);
  assert.match(page, /\/china-itinerary-review\/[\s\S]*#choose-service/);
  assert.match(
    page,
    /const plannerHref = `\$\{(?:homeCopy|copy)\.path\}#planner-contact`/,
  );
  assert.match(page, /const isEnglish = locale === "en"/);
  assert.match(page, /Compare planning services/);
  assert.match(page, /Talk to a China trip planner/);
  assert.doesNotMatch(page, /free wishlist check/i);
  assert.doesNotMatch(page, /(?:\?|&)utm_[a-z_]+=/i);
  assert.doesNotMatch(page, /(?:\?|&)planner=/i);
  assert.doesNotMatch(
    page,
    /(?:\?|&)service=(?:itinerary-review|route-build|full-trip-support)/,
  );
});

test("global navigation exposes localized Planning Services and current-page state", async () => {
  const [header, footer, servicePage] = await Promise.all([
    source("components/HomegroundHeader.tsx"),
    source("components/HomegroundFooter.tsx"),
    source("components/ChinaItineraryReviewPage.tsx"),
  ]);

  assert.match(header, /export type HomegroundPageContext =[\s\S]*\| "services"/);
  assert.match(header, /pageContext\?: HomegroundPageContext/);
  assert.match(header, /getChinaItineraryReviewCopy\(locale\)/);
  assert.match(header, /services: "Trip planning services"/);
  assert.match(header, /services: "旅行规划服务"/);
  assert.match(header, /services: "여행 설계 서비스"/);
  assert.match(header, /getChinaItineraryReviewCopy\(targetLocale\)\.path/);
  assert.match(header, /pageContext\s*===\s*"services"\s*\?\s*"page"/);
  assert.match(header, /allowedServiceHashes/);
  assert.match(header, /"#review-my-route"/);
  assert.match(header, /"#build-my-route"/);
  assert.match(header, /"#full-trip-support"/);

  assert.match(footer, /getChinaItineraryReviewCopy\(locale\)/);
  assert.match(footer, /services: "Trip planning services"/);
  assert.match(footer, /services: "旅行规划服务"/);
  assert.match(footer, /services: "여행 설계 서비스"/);
  assert.match(footer, /pageContext === "services"/);
  assert.match(footer, /aria-current="page"/);
  assert.match(footer, /homegroundBusiness\.publicName/);
  assert.match(footer, /homegroundBusiness\.unifiedSocialCreditCode/);
  assert.match(footer, /const privacyPath\s*=/);
  assert.match(footer, /href=\{privacyPath\}/);
  assert.match(
    footer,
    /mailto:\$\{homegroundBusiness\.serviceEmail\}/,
  );
  assert.equal(servicePage.match(/pageContext="services"/g)?.length, 2);
});

test("commercial surfaces do not introduce checkout or file upload", async () => {
  const [home, servicePage, serviceCopy, studioPage, packageJson] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/ChinaItineraryReviewPage.tsx"),
    source("lib/chinaItineraryReviewI18n.ts"),
    source("components/HomegroundStudioPage.tsx"),
    source("package.json"),
  ]);
  const commercialSurface = `${home}\n${servicePage}\n${serviceCopy}\n${studioPage}`;

  assert.match(commercialSurface, /#planner-contact/);
  assert.doesNotMatch(commercialSurface, />\s*(?:Buy now|Book now|Checkout|Add to cart|Pay now)\s*</i);
  assert.doesNotMatch(commercialSurface, /(?:href|action)=["'][^"']*(?:checkout|payment|cart)[^"']*["']/i);
  assert.doesNotMatch(commercialSurface, /type=["']file["']/i);
  assert.doesNotMatch(commercialSurface, /(?:\?|&)utm_[a-z_]+=/i);
  assert.doesNotMatch(commercialSurface, /(?:\?|&)planner=/i);
  assert.doesNotMatch(
    commercialSurface,
    /(?:\?|&)service=(?:itinerary-review|route-build|full-trip-support)/,
  );
  assert.doesNotMatch(packageJson, /"(?:@stripe\/[^"\s]+|stripe|@paypal\/[^"\s]+|paypal)"\s*:/i);
  assert.match(serviceCopy, /does not take payment/i);
  assert.match(serviceCopy, /本网站不直接收款/);
  assert.match(serviceCopy, /이 웹사이트에서는 직접 결제하지 않습니다/);
});
