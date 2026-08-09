import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("China trip cost guide is available in English, Chinese and Korean", async () => {
  const registry = await source("lib/guideRegistry.ts");
  const route = await source(
    "app/(default)/guides/how-much-does-a-china-trip-cost/page.tsx",
  );
  const localizedRoute = await source(
    "app/(localized)/[locale]/guides/how-much-does-a-china-trip-cost/page.tsx",
  );

  assert.match(
    registry,
    /id: "how-much-does-a-china-trip-cost"[\s\S]*?locales: \{[\s\S]*?en: \{[\s\S]*?zh: \{[\s\S]*?ko: \{/,
  );
  assert.match(route, /<ChinaTripCostGuidePage locale="en" \/>/);
  assert.match(localizedRoute, /value === "zh" \|\| value === "ko"/);
  assert.match(localizedRoute, /<ChinaTripCostGuidePage locale=\{locale\} \/>/);
});

test("published-price comparison keeps conditions and original currencies", async () => {
  const copy = await source("lib/chinaTripCostI18n.ts");

  for (const verifiedPrice of ["US$1,462.71", "A$2,470", "A$5,130"]) {
    assert.match(copy, new RegExp(verifiedPrice.replace("$", "\\$")));
  }

  assert.match(copy, /wendywutours\.com\.au\/china\/tours\/beijing-shanghai-short-stay\.htm/);
  assert.match(copy, /wendywutours\.com\.au\/china\/tours\/in-pursuit-of-pandas\.htm/);
  assert.match(copy, /checked on 9 August 2026/);
  assert.match(copy, /original currencies/);

  for (const unsupportedClaim of [
    "¥4,000 – ¥8,000",
    "¥10,000 – ¥18,000",
    "¥17,900",
    "¥2,300 – ¥3,600",
    "Zhangjiajie National Forest Park admission",
    "Bank of China — published exchange rates",
  ]) {
    assert.doesNotMatch(copy, new RegExp(unsupportedClaim));
  }
});

test("guide routes readers to consultation without exposing paid DIY products", async () => {
  const page = await source("components/ChinaTripCostGuidePage.tsx");
  const copy = await source("lib/chinaTripCostI18n.ts");

  assert.match(page, /PlannerButton/);
  assert.match(copy, /#planner-contact/);
  assert.doesNotMatch(copy, /\$69|US\$69|69 美元|69달러/);
  assert.doesNotMatch(copy, /\$129|US\$129|129 美元|129달러/);
  assert.doesNotMatch(copy, /profit|利润|마진/i);
});

test("guide publishes visible citations, FAQ and matching structured data", async () => {
  const page = await source("components/ChinaTripCostGuidePage.tsx");

  assert.match(page, /"@type": "Article"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(page, /"@type": "FAQPage"/);
  assert.match(page, /copy\.faq\.items\.map/);
  assert.match(page, /copy\.sources\.map/);
  assert.match(page, /type="application\/ld\+json"/);
  assert.doesNotMatch(page, /"@type": "Offer"|aggregateRating/);
});
