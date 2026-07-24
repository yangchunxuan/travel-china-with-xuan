import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("Canada visa-free guide gives a direct, bounded answer from official sources", async () => {
  const page = await source("components/CanadaVisaFreeGuidePage.tsx");
  const copy = await source("lib/canadaVisaFreeGuide.ts");

  assert.equal(page.match(/<h1>/g)?.length, 1);
  assert.match(page, /17 February and 31 December\s+2026/);
  assert.match(page, /no more than 30 days/);
  assert.match(page, /Arrival day is day zero—not day one/);
  assert.match(page, /ordinary\s+Canadian passports?/);
  assert.match(copy, /Emergency travel document/);
  assert.match(copy, /“X” gender marker/);
  assert.match(copy, /work, formal study, journalism/i);
  assert.match(copy, /A new mainland entry/);
  assert.match(copy, /Arrival in January 2027/);
  assert.match(copy, /240-hour visa-free transit policy/);
  assert.match(copy, /Hainan/);
  assert.doesNotMatch(page, /guaranteed entry|visa approval/i);
});

test("guide visibly separates source facts, planning interpretation and final authority", async () => {
  const page = await source("components/CanadaVisaFreeGuidePage.tsx");
  const copy = await source("lib/canadaVisaFreeGuide.ts");

  assert.match(page, /Independent travel guidance, not a visa service/);
  assert.match(
    page,
    /Chinese\s+border authorities make the final entry decision/,
  );
  assert.match(page, /Official pages checked for this guide/);
  assert.match(page, /sourceReviewedDate/);
  assert.match(page, /These examples are planning interpretations/);
  assert.match(copy, /ca\.china-embassy\.gov\.cn/);
  assert.match(copy, /travel\.gc\.ca\/destinations\/china/);
  assert.doesNotMatch(page, /FAQPage|HowTo|AggregateRating/);
});

test("English-only guide publishes truthful locale metadata and sitemap entries", async () => {
  const registry = await source("lib/guideRegistry.ts");
  const route = await source(
    "app/(default)/guides/china-visa-free-canadian-citizens-2026/page.tsx",
  );
  const sitemap = await source("app/sitemap.ts");

  assert.match(
    registry,
    /id: "china-visa-free-canadian-citizens-2026"[\s\S]*?locales: \{\s+en:/,
  );
  assert.match(route, /languages: getGuideLanguagePaths\(guide\.id\)/);
  assert.doesNotMatch(route, /alternateLocale/);
  assert.match(sitemap, /getGuideAvailableLocales\(guideId\)\.map/);
});

test("guide route, article schema, CTA and responsive visual assets are wired", async () => {
  const page = await source("components/CanadaVisaFreeGuidePage.tsx");
  const styles = await source("components/CanadaVisaFreeGuidePage.module.css");

  assert.match(page, /"@type": "Article"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(page, /China entry guides/);
  assert.match(page, /\/guides\/china-entry-requirements\//);
  assert.match(page, /citation: CANADA_VISA_GUIDE_SOURCES\.map/);
  assert.match(page, /Start my China trip brief/);
  assert.match(page, /utm_campaign=trip-conversation/);
  assert.match(page, /showLanguageNav=\{false\}/);
  assert.match(styles, /@media \(max-width: 36rem\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /:focus-visible/);

  for (const file of [
    "public/images/guides/china-visa-free-canadian-citizens-2026/skyline-hero-1200.jpg",
    "public/images/guides/china-visa-free-canadian-citizens-2026/skyline-hero-720.jpg",
    "public/images/guides/china-visa-free-canadian-citizens-2026/skyline-card-1200.jpg",
    "public/images/guides/china-visa-free-canadian-citizens-2026/skyline-og-1200.jpg",
  ]) {
    await access(new URL(`../../${file}`, import.meta.url));
  }
});

test("Canada guide does not resurrect the deprecated combined UK+Canada URL", async () => {
  const page = await source("components/CanadaVisaFreeGuidePage.tsx");
  const copy = await source("lib/canadaVisaFreeGuide.ts");

  assert.doesNotMatch(page, /china-visa-free-uk-canada/);
  assert.doesNotMatch(copy, /china-visa-free-uk-canada/);
});
