import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("Home planning desk presents three paid paths and one free path before the shared questions", async () => {
  const [home, planningDesk, planningCopy, services] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomepagePlanningDesk.tsx"),
    source("lib/homepagePlanningDesk.ts"),
    source("lib/routeServiceInterest.ts"),
  ]);

  assert.equal(home.match(/<RouteFinder\b/g)?.length, 1);
  assert.match(home, /planningIntent=\{planningIntent\}/);
  assert.match(
    home,
    /onPlanningIntentChange=\{handlePlanningIntentChange\}/,
  );
  assert.match(
    planningDesk,
    /copy\.options\.filter\(\(option\) => option\.kind === "paid"\)/,
  );
  assert.match(
    planningDesk,
    /copy\.options\.find\(\(option\) => option\.kind === "free"\)/,
  );
  assert.match(planningDesk, /name="homeground-planning-intent"/);
  assert.match(planningDesk, /onContinue\(draft\)/);
  assert.match(planningCopy, /id: "itinerary-review"/);
  assert.match(planningCopy, /id: "route-build"/);
  assert.match(planningCopy, /id: "full-trip-support"/);
  assert.match(planningCopy, /id: "explore"/);
  assert.match(planningCopy, /label: "Free route timing check"/);
  assert.match(services, /label: "Review My Route"/);
  assert.match(services, /label: "Build My Route"/);
  assert.match(services, /label: "Full Trip Planning & Ground Support"/);
  assert.doesNotMatch(planningCopy, /id: "explore"[\s\S]{0,500}US\$/);
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
  assert.match(copy, /Review My Route/);
  assert.match(copy, /Build My Route/);
  assert.match(copy, /Full Trip Planning & Ground Support/);
  assert.match(copy, /A small planning studio, with one clear planning thread\./);
  assert.match(copy, /小型规划工作室/);
  assert.match(copy, /작은 여행 설계 스튜디오/);
});

test("English Studio keeps a service comparison and separate free-tool exit", async () => {
  const page = await source("components/HomegroundStudioPage.tsx");

  assert.match(page, /const planningServicesHref\s*=/);
  assert.match(page, /\/china-itinerary-review\/[\s\S]*#choose-service/);
  assert.match(page, /const isEnglish = locale === "en"/);
  assert.match(page, /Compare planning services/);
  assert.match(page, /Start with the free wishlist check/);
  assert.doesNotMatch(page, /service=(?:itinerary-review|route-build|full-trip-support)/);
});

test("global navigation exposes localized Planning Services and current-page state", async () => {
  const [header, footer, servicePage] = await Promise.all([
    source("components/HomegroundHeader.tsx"),
    source("components/HomegroundFooter.tsx"),
    source("components/ChinaItineraryReviewPage.tsx"),
  ]);

  assert.match(header, /pageContext\?:[^;]*"services"/);
  assert.match(header, /getChinaItineraryReviewCopy\(locale\)/);
  assert.match(header, /planningServicesCopy\.navigationLabel/);
  assert.match(header, /getChinaItineraryReviewCopy\(targetLocale\)\.path/);
  assert.match(header, /pageContext\s*===\s*"services"\s*\?\s*"page"/);
  assert.match(header, /allowedServiceHashes/);
  assert.match(header, /"#review-my-route"/);
  assert.match(header, /"#build-my-route"/);
  assert.match(header, /"#full-trip-support"/);

  assert.match(footer, /getChinaItineraryReviewCopy\(locale\)/);
  assert.match(footer, /planningServicesCopy\.navigationLabel/);
  assert.match(footer, /pageContext === "services"/);
  assert.match(footer, /aria-current="page"/);
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

  assert.doesNotMatch(commercialSurface, />\s*(?:Buy now|Book now|Checkout|Add to cart|Pay now)\s*</i);
  assert.doesNotMatch(commercialSurface, /(?:href|action)=["'][^"']*(?:checkout|payment|cart)[^"']*["']/i);
  assert.doesNotMatch(commercialSurface, /type=["']file["']/i);
  assert.doesNotMatch(packageJson, /"(?:@stripe\/[^"\s]+|stripe|@paypal\/[^"\s]+|paypal)"\s*:/i);
  assert.match(serviceCopy, /does not take payment/i);
  assert.match(serviceCopy, /不收取在线付款/);
  assert.match(serviceCopy, /결제나 파일 업로드를 받지 않습니다/);
});
