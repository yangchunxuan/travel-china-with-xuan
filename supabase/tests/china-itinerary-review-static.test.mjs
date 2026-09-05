import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getChinaItineraryReviewCopy, getChinaItineraryReviewLanguagePaths } from "../../lib/chinaItineraryReviewI18n.ts";
import { getRouteServiceInterest, routeServiceIds } from "../../lib/routeServiceInterest.ts";
import { getHomepagePlanningDeskCopy } from "../../lib/homepagePlanningDesk.ts";

const source = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");

test("retired services cannot be selected from old URLs in any locale", () => {
  assert.deepEqual(routeServiceIds, ["full-trip-support"]);
  for (const locale of ["en", "zh", "ko"]) {
    assert.equal(getRouteServiceInterest("itinerary-review", locale), null);
    assert.equal(getRouteServiceInterest("route-build", locale), null);
    assert.ok(getRouteServiceInterest("full-trip-support", locale));
    assert.deepEqual(getHomepagePlanningDeskCopy(locale).options.map((option) => option.id), ["conversation", "full-trip-support"]);
  }
});

test("old service URLs explain withdrawal and preserve existing agreements", async () => {
  const expected = {
    en: ["no longer offers", "Existing accepted services"],
    zh: ["不再提供", "已经接受的服务"],
    ko: ["더 이상 제공하지 않습니다", "이미 수락된 서비스"],
  };
  for (const locale of ["en", "zh", "ko"]) {
    const copy = getChinaItineraryReviewCopy(locale);
    assert.equal(copy.path, locale === "en" ? "/china-itinerary-review/" : `/${locale}/china-itinerary-review/`);
    assert.ok(copy.hero.lead.includes(expected[locale][0]));
    assert.ok(copy.hero.boundary.includes(expected[locale][1]));
    assert.doesNotMatch(JSON.stringify(copy), /US\$(69|129)|69 美元|129 美元/);
  }
  const page = await source("components/ChinaItineraryReviewPage.tsx");
  assert.equal(page.match(/<h1>/g)?.length, 1);
  assert.match(page, /#planner-contact/);
  assert.match(page, /\$\{home.path\}tours\//);
  assert.doesNotMatch(page, /"@type": "(?:Offer|Service|FAQPage)"|review-my-route|build-my-route/);
  assert.deepEqual(Object.keys(getChinaItineraryReviewLanguagePaths()), ["en", "zh-Hans", "ko", "x-default"]);
});

test("public entry points and legal descriptions no longer sell retired products", async () => {
  const paths = [
    "lib/homepagePlanningDesk.ts", "lib/routeServiceInterest.ts", "lib/homegroundLegalI18n.ts",
    "lib/homegroundPrivacyI18n.ts", "lib/homegroundStudioI18n.ts", "lib/travelServicesHubI18n.ts",
    "lib/chinaItineraryTooRushedI18n.ts", "components/FirstTripTenCityMapPage.tsx",
    ...["tenDay", "nightShow"].flatMap((guide) => ["en", "zh", "ko"].map((locale) => `lib/${guide}GuideCopy.${locale}.ts`)),
  ];
  for (const path of paths) {
    assert.doesNotMatch(await source(path), /US\$(69|129)|69 美元|129 美元|Review My Route|Build My Route/, path);
  }
});
