import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("UK visa-free guide gives a direct, bounded answer from official sources", async () => {
  const page = await source("components/UkVisaFreeGuidePage.tsx");
  const copy = await source("lib/ukVisaFreeGuide.ts");

  assert.equal(page.match(/<h1>/g)?.length, 1);
  assert.match(page, /17 February and 31 December 2026/);
  assert.match(page, /no more than 30 days/);
  assert.match(page, /Arrival day is day zero—not day one/);
  assert.match(page, /full “British\s+citizen” passport/);
  assert.match(copy, /British National \(Overseas\) passport/);
  assert.match(copy, /Emergency Travel Document/);
  assert.match(copy, /work, formal study, journalism/i);
  assert.match(copy, /A new mainland entry/);
  assert.match(copy, /Arrival in January 2027/);
  assert.match(copy, /240-hour visa-free transit policy/);
  assert.doesNotMatch(page, /guaranteed entry|visa approval/i);
});

test("guide visibly separates source facts, planning interpretation and final authority", async () => {
  const page = await source("components/UkVisaFreeGuidePage.tsx");
  const copy = await source("lib/ukVisaFreeGuide.ts");

  assert.match(page, /Independent travel guidance, not a visa service/);
  assert.match(
    page,
    /Chinese border\s+authorities make the final entry decision/,
  );
  assert.match(page, /Official pages checked for this guide/);
  assert.match(page, /sourceReviewedDate/);
  assert.match(page, /These examples are planning interpretations/);
  assert.match(copy, /gb\.china-embassy\.gov\.cn/);
  assert.match(copy, /gov\.uk\/foreign-travel-advice\/china\/entry-requirements/);
  assert.doesNotMatch(page, /FAQPage|HowTo|AggregateRating/);
});

test("English-only guide publishes truthful locale metadata and sitemap entries", async () => {
  const registry = await source("lib/guideRegistry.ts");
  const route = await source(
    "app/(default)/guides/china-visa-free-uk-citizens-2026/page.tsx",
  );
  const sitemap = await source("app/sitemap.ts");

  assert.match(
    registry,
    /id: "china-visa-free-uk-citizens-2026"[\s\S]*?locales: \{\s+en:/,
  );
  assert.match(registry, /locales: Partial<Record<HomegroundLocale/);
  assert.match(registry, /getGuideAvailableLocales/);
  assert.match(registry, /\.filter\(\(entry\) => Boolean\(entry\.locales\[locale\]\)\)/);
  assert.match(route, /languages: getGuideLanguagePaths\(guide\.id\)/);
  assert.doesNotMatch(route, /alternateLocale/);
  assert.match(sitemap, /getGuideAvailableLocales\(guideId\)\.map/);
});

test("guide route, article schema, CTA and responsive visual assets are wired", async () => {
  const page = await source("components/UkVisaFreeGuidePage.tsx");
  const styles = await source("components/UkVisaFreeGuidePage.module.css");

  assert.match(page, /"@type": "Article"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(page, /China entry guides/);
  assert.match(page, /\/guides\/china-entry-requirements\//);
  assert.match(page, /citation: UK_VISA_GUIDE_SOURCES\.map/);
  assert.match(page, /Start my China trip brief/);
  assert.match(page, /utm_campaign=trip-conversation/);
  assert.match(page, /showLanguageNav=\{false\}/);
  assert.match(styles, /@media \(max-width: 36rem\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /:focus-visible/);

  for (const file of [
    "public/images/guides/china-visa-free-uk-citizens-2026/great-wall-hero-1200.jpg",
    "public/images/guides/china-visa-free-uk-citizens-2026/great-wall-hero-720.jpg",
    "public/images/guides/china-visa-free-uk-citizens-2026/great-wall-card-1200.jpg",
    "public/images/guides/china-visa-free-uk-citizens-2026/great-wall-og-1200.jpg",
  ]) {
    await access(new URL(`../../${file}`, import.meta.url));
  }
});

test("Zhangjiajie remains the durable Guides hub lead when the policy guide is newer", async () => {
  const registry = await source("lib/guideRegistry.ts");

  assert.match(
    registry,
    /id: "zhangjiajie-itinerary"[\s\S]*?hubLead: true/,
  );
  assert.match(
    registry,
    /"hubLead" in b\.entry[\s\S]*?dateModified/,
  );
});
