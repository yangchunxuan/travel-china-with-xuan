import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("tour-guide decision guide is available in English, Chinese and Korean", async () => {
  const registry = await source("lib/guideRegistry.ts");
  const route = await source(
    "app/(default)/guides/do-you-need-a-tour-guide-in-china/page.tsx",
  );
  const localizedRoute = await source(
    "app/(localized)/[locale]/guides/do-you-need-a-tour-guide-in-china/page.tsx",
  );

  assert.match(
    registry,
    /id: "do-you-need-a-tour-guide-in-china"[\s\S]*?locales: \{[\s\S]*?en: \{[\s\S]*?zh: \{[\s\S]*?ko: \{/,
  );
  assert.match(route, /getGuideLanguagePaths\(guide\.id\)/);
  assert.match(route, /<ChinaTourGuideDecisionPage locale="en" \/>/);
  assert.match(localizedRoute, /value === "zh" \|\| value === "ko"/);
  assert.match(
    localizedRoute,
    /<ChinaTourGuideDecisionPage locale=\{locale\} \/>/,
  );
});

test("guide answers the support decision and routes readers to consultation", async () => {
  const page = await source("components/ChinaTourGuideDecisionPage.tsx");
  const copy = await source("lib/tourGuideDecisionI18n.ts");

  assert.match(page, /copy\.supportTypes\.items\.map/);
  assert.match(page, /copy\.dayDecision\.items\.map/);
  assert.match(page, /copy\.fullTrip\.paragraphs\.map/);
  assert.match(page, /copy\.checklist\.items\.map/);
  assert.match(page, /GuideCtaLink/);
  assert.match(page, /position="inline"/);
  assert.match(page, /position="footer"/);
  assert.match(copy, /#planner-contact/);
  assert.doesNotMatch(copy, /\$69|US\$69|69 美元|69달러/);
  assert.doesNotMatch(copy, /\$129|US\$129|129 美元|129달러/);
});

test("guide publishes visible FAQ, citations and matching structured data", async () => {
  const page = await source("components/ChinaTourGuideDecisionPage.tsx");

  assert.match(page, /"@type": "Article"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(page, /"@type": "FAQPage"/);
  assert.match(page, /copy\.faq\.items\.map/);
  assert.match(page, /copy\.sources\.map/);
  assert.match(page, /type="application\/ld\+json"/);
  assert.doesNotMatch(page, /"@type": "Offer"|aggregateRating/);
});

test("guide layout is responsive, accessible and motion-safe", async () => {
  const page = await source("components/ChinaTourGuideDecisionPage.tsx");
  const css = await source("components/ChinaTourGuideDecisionPage.module.css");

  assert.match(page, /href="#tour-guide-decision-main"/);
  assert.match(page, /<main[\s\S]*?tabIndex=\{-1\}/);
  assert.match(page, /<h1 className=\{styles\.heroTitle\}/);
  assert.match(page, /<details className=\{styles\.faqItem\}/);
  assert.match(page, /alt=\{copy\.hero\.imageAlt\}/);
  assert.match(css, /@media \(max-width: 46rem\)/);
  assert.match(css, /@media \(max-width: 22rem\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /:focus-visible/);
});
