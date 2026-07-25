import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("New Zealand visa-free guide gives a direct, bounded answer from official sources", async () => {
  const page = await source("components/NzVisaFreeGuidePage.tsx");
  const copy = await source("lib/nzVisaFreeGuide.ts");

  assert.equal(page.match(/<h1>/g)?.length, 1);
  assert.match(page, /30 November 2024 and 31\s+December 2026/);
  assert.match(page, /no more than 30\s+days/);
  assert.match(page, /Arrival day is day zero—not day one/);
  assert.match(page, /ordinary\s+New\s+Zealand passports?/);
  assert.match(copy, /Official passport/);
  assert.match(copy, /New Zealand permanent resident card/);
  assert.match(copy, /work, formal study, journalism/i);
  assert.match(copy, /A new mainland entry/);
  assert.match(copy, /Arrival in January 2027/);
  assert.match(copy, /240-hour transit/);
  assert.match(copy, /Hainan/);
  assert.match(copy, /Chinese Travel Document/);
  assert.doesNotMatch(page, /guaranteed entry|visa approval/i);
});

test("guide visibly separates source facts, planning interpretation and final authority", async () => {
  const page = await source("components/NzVisaFreeGuidePage.tsx");
  const copy = await source("lib/nzVisaFreeGuide.ts");

  assert.match(page, /Independent travel guidance, not a visa service/);
  assert.match(
    page,
    /Chinese\s+border authorities make the final entry decision/,
  );
  assert.match(page, /Official pages checked for this guide/);
  assert.match(page, /sourceReviewedDate/);
  assert.match(page, /These examples are planning interpretations/);
  assert.match(copy, /nz\.china-embassy\.gov\.cn/);
  assert.match(copy, /auckland\.china-consulate\.gov\.cn/);
  assert.match(copy, /safetravel\.govt\.nz/);
  assert.match(copy, /immd\.gov\.hk/);
  assert.match(copy, /gov\.mo/);
  assert.doesNotMatch(page, /FAQPage|HowTo|AggregateRating/);
});

test("English-only guide publishes truthful locale metadata and sitemap entries", async () => {
  const registry = await source("lib/guideRegistry.ts");
  const route = await source(
    "app/(default)/guides/china-visa-free-new-zealand-citizens-2026/page.tsx",
  );
  const sitemap = await source("app/sitemap.ts");

  assert.match(
    registry,
    /id: "china-visa-free-new-zealand-citizens-2026"[\s\S]*?locales: \{\s+en:/,
  );
  assert.match(route, /languages: getGuideLanguagePaths\(guide\.id\)/);
  assert.doesNotMatch(route, /alternateLocale/);
  assert.match(sitemap, /getGuideAvailableLocales\(guideId\)\.map/);
});

test("guide route, article schema, CTA and responsive visual assets are wired", async () => {
  const page = await source("components/NzVisaFreeGuidePage.tsx");
  const styles = await source("components/NzVisaFreeGuidePage.module.css");

  assert.match(page, /"@type": "Article"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(page, /China entry guides/);
  assert.match(page, /\/guides\/china-entry-requirements\//);
  assert.match(page, /citation: NZ_VISA_GUIDE_SOURCES\.map/);
  assert.match(page, /Start my China trip brief/);
  assert.match(
    page,
    /source_guide=china-visa-free-new-zealand-citizens-2026&planner=destinations/,
  );
  assert.doesNotMatch(page, /[?&]utm_(?:source|medium|campaign|content)=/);
  assert.match(page, /showLanguageNav=\{false\}/);
  assert.match(styles, /@media \(max-width: 36rem\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /:focus-visible/);

  for (const file of [
    "public/images/guides/china-visa-free-new-zealand-citizens-2026/timeline-hero-1200.jpg",
    "public/images/guides/china-visa-free-new-zealand-citizens-2026/timeline-hero-720.jpg",
    "public/images/guides/china-visa-free-new-zealand-citizens-2026/timeline-card-1200.jpg",
    "public/images/guides/china-visa-free-new-zealand-citizens-2026/timeline-og-1200.jpg",
  ]) {
    await access(new URL(`../../${file}`, import.meta.url));
  }
});

test("entry-guides hub labels every passport-market guide correctly", async () => {
  const hub = await source("components/ChinaEntryGuidesPage.tsx");

  assert.match(hub, /"New Zealand passport guide"/);
  assert.match(hub, /"Canada passport guide"/);
  assert.match(hub, /"Singapore passport guide"/);
});
