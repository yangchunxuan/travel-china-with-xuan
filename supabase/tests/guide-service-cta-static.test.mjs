import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const source = (relativePath) => readFile(new URL(relativePath, root), "utf8");

test("guide service CTAs point at a covered city, at that city's live rate", async () => {
  const { privateGuideServiceCtaTargets, getGuideServiceCta } = await import("../../lib/privateGuideServiceCta.ts");
  const { privateGuideCities, privateGuideRates, privateGuideServicePath, formatPrivateGuidePrice } = await import("../../lib/privateGuideServices.ts");
  for (const [guideId, target] of Object.entries(privateGuideServiceCtaTargets)) {
    const hasGuide = existsSync(new URL(`content/guides/${guideId}/`, root)) || guideId === "do-you-need-a-tour-guide-in-china";
    assert.ok(hasGuide, `${guideId} is a published guide`);
    assert.ok(target === "all" || privateGuideCities.includes(target), `${guideId} → ${target} is a covered city`);
    for (const locale of ["en", "zh", "ko"]) {
      const cta = getGuideServiceCta(guideId, locale);
      assert.equal(cta.href, target === "all" ? privateGuideServicePath[locale] : `${privateGuideServicePath[locale]}#${target}`);
      if (target !== "all") assert.ok(cta.body.includes(formatPrivateGuidePrice(privateGuideRates[target].standardCny, locale)), `${guideId} ${locale} quotes the live rate`);
      assert.doesNotMatch(`${cta.title} ${cta.body}`, /\{[a-z]+\}/u, "no unfilled placeholder");
    }
  }
  // The all-cities copy names Xi'an and Zhangjiajie as the lower rate and Beijing and Shanghai as the higher one.
  assert.equal(privateGuideRates.xian.standardCny, privateGuideRates.zhangjiajie.standardCny);
  assert.equal(privateGuideRates.beijing.standardCny, privateGuideRates.shanghai.standardCny);
  assert.ok(privateGuideRates.xian.standardCny < privateGuideRates.beijing.standardCny);
});

test("attraction guides show the booking offer after their first section, and clicks on services are counted as services", async () => {
  const [page, renderer, location, analytics] = await Promise.all([
    source("components/content/EditorialGuidePage.tsx"),
    source("components/content/PageFamilyRenderer.tsx"),
    source("lib/analyticsLocation.ts"),
    source("lib/analytics.ts"),
  ]);
  assert.match(page, /afterIndex: guideFirstSectionEndIndex\(body\),\s*node: <GuideReservationCta[^>]*position="inline"/u);
  assert.match(page, /afterIndex: guideContentEndIndex\(body\),\s*node: <GuideServiceCta[^>]*position="inline"/u);
  assert.match(renderer, /interstitials\?: readonly \{ afterIndex: number; node: ReactNode \}\[\]/u);
  assert.match(location, /export type GuideCtaTarget = "private_tour" \| "service" \| "planner" \| "other";/u);
  assert.match(location, /services\\\/\(\?:private-english-speaking-guides\|china-attraction-reservations\|private-car-and-driver\)\\\/\$\/u\.test\(url\.pathname\)\) return "service"/u);
  assert.match(analytics, /value === "service"/u);
});
