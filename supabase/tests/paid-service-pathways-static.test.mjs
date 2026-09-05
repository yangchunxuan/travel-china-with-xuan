import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("Home planning desk leads with quick contacts and keeps the private-tour shortcut", async () => {
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
  assert.doesNotMatch(planningCopy, /id: "itinerary-review"/);
  assert.doesNotMatch(planningCopy, /id: "route-build"/);
  assert.match(planningCopy, /id: "full-trip-support"/);
  assert.match(planningCopy, /planningIntent: "conversation"/);
  assert.match(planningCopy, /label: "Trip conversation"/);
  assert.match(
    planningCopy,
    /A Homeground planner reviews the brief and confirms the appropriate next step\./,
  );
  assert.doesNotMatch(services, /label: "Review My Route"/);
  assert.doesNotMatch(services, /label: "Build My Route"/);
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

test("retired service page retains a clear route to enquiries and private tours", async () => {
  const page = await source("components/ChinaItineraryReviewPage.tsx");
  assert.match(page, /#planner-contact/);
  assert.match(page, /tours\//);
  assert.doesNotMatch(page, /review-my-route|build-my-route|price: "69"|price: "129"/);
});

test("English Studio keeps its service comparison and uses the unified planner contact", async () => {
  const page = await source("components/HomegroundStudioPage.tsx");

  assert.match(page, /const planningServicesHref\s*=/);
  assert.match(page, /\/services\//);
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

test("global navigation keeps services behind the planning state and CTA", async () => {
  const [header, footer, servicePage] = await Promise.all([
    source("components/HomegroundHeader.tsx"),
    source("components/HomegroundFooter.tsx"),
    source("components/ChinaItineraryReviewPage.tsx"),
  ]);

  assert.match(header, /export type HomegroundPageContext =[\s\S]*\| "services"/);
  assert.match(header, /pageContext\?: HomegroundPageContext/);
  assert.match(header, /getChinaItineraryReviewCopy\(targetLocale\)\.path/);
  assert.match(header, /pageContext === "studio" \|\| pageContext === "services"/);
  assert.doesNotMatch(header, /services: "Trip planning services"/);
  assert.match(header, /className=\{styles\.headerCta\}/);
  assert.match(header, /allowedServiceHashes/);
  assert.doesNotMatch(header, /"#review-my-route"/);
  assert.doesNotMatch(header, /"#build-my-route"/);
  assert.match(header, /"#full-trip-support"/);

  assert.match(footer, /planningServicesPath = `\$\{copy.path\}services\//);
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
  assert.match(serviceCopy, /initial enquiry is free/i);
  assert.match(serviceCopy, /初次询价免费/);
  assert.match(serviceCopy, /첫 문의는 무료/);
});
