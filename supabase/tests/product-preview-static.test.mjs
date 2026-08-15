import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) =>
  readFile(path.join(projectRoot, relativePath), "utf8");

const productPath =
  "content/product-previews/zhangjiajie-4-day-private-tour/product.json";
const pricingPath =
  "content/product-previews/zhangjiajie-4-day-private-tour/pricing.json";

test("published product has indexable EN/ZH routes while local previews stay closed", async () => {
  const [
    product,
    pricing,
    defaultPreviewRoute,
    localizedPreviewRoute,
    defaultPublicRoute,
    localizedPublicRoute,
    productHelper,
  ] = await Promise.all([
    source(productPath).then(JSON.parse),
    source(pricingPath).then(JSON.parse),
    source(
      "app/(default)/preview/zhangjiajie-4-day-private-tour/page.tsx",
    ),
    source(
      "app/(localized)/[locale]/preview/zhangjiajie-4-day-private-tour/page.tsx",
    ),
    source("app/(default)/tours/zhangjiajie-4-day-private-tour/page.tsx"),
    source(
      "app/(localized)/[locale]/tours/zhangjiajie-4-day-private-tour/page.tsx",
    ),
    source("lib/zhangjiajiePrivateTourPreview.ts"),
  ]);

  assert.equal(product.status, "published");
  assert.equal(product.public_eligible, true);
  assert.equal(product.seo.indexable, true);
  assert.equal(pricing.status, "approved_price_decision");
  assert.equal(pricing.public_eligible, true);
  assert.equal(pricing.approved_decision_id, product.price_display.approved_decision_id);

  assert.match(defaultPreviewRoute, /process\.env\.NODE_ENV === "production"/);
  assert.match(defaultPreviewRoute, /notFound\(\)/);
  assert.match(defaultPreviewRoute, /index: false, follow: false/);
  assert.match(localizedPreviewRoute, /process\.env\.NODE_ENV === "production"/);
  assert.match(localizedPreviewRoute, /locale !== "zh"/);
  assert.match(localizedPreviewRoute, /index: false, follow: false/);

  assert.match(defaultPublicRoute, /zhangjiajiePrivateTourPaths\.en/);
  assert.match(defaultPublicRoute, /index: true/);
  assert.match(defaultPublicRoute, /follow: true/);
  assert.match(defaultPublicRoute, /locale="en" published/);
  assert.match(localizedPublicRoute, /requireChinese\(routeLocale\)/);
  assert.match(localizedPublicRoute, /dynamicParams = false/);
  assert.match(localizedPublicRoute, /return \[\{ locale: "zh" \}\]/);
  assert.match(localizedPublicRoute, /zhangjiajiePrivateTourPaths\.zh/);
  assert.match(localizedPublicRoute, /index: true/);
  assert.match(localizedPublicRoute, /follow: true/);
  assert.match(localizedPublicRoute, /locale=\{locale\} published/);
  assert.match(
    productHelper,
    /en: "\/tours\/zhangjiajie-4-day-private-tour\/"/,
  );
  assert.match(
    productHelper,
    /zh: "\/zh\/tours\/zhangjiajie-4-day-private-tour\/"/,
  );
});

test("manifest, sitemap and homepage expose the product independently of the guide", async () => {
  const [adapter, manifest, sitemap, homepage, homeCard] = await Promise.all([
    source("lib/legacySystemContentAdapter.ts"),
    source("lib/searchPlatformManifest.ts"),
    source("app/sitemap.ts"),
    source("components/HomegroundHomePage.tsx"),
    source("lib/zhangjiajiePrivateTourHomeCard.ts"),
  ]);

  assert.match(adapter, /id: "zhangjiajie-4-day-private-tour"/);
  assert.match(adapter, /definitions: zhangjiajiePrivateTour/);
  assert.match(adapter, /family: "service"/);
  assert.match(adapter, /primaryIntent: "purchase"/);
  assert.match(adapter, /schemaTypes: \["WebPage", "TouristTrip"\]/);
  assert.match(manifest, /\.\.\.buildLegacySystemContentNodes\(\)\.map\(contentNodeRecord\)/);
  assert.match(sitemap, /getIndexableManifestEntries\(searchPlatformManifest\)/);
  assert.match(sitemap, /system-zhangjiajie-4-day-private-tour/);

  assert.match(homepage, /getZhangjiajiePrivateTourHomeCard/);
  assert.match(homepage, /guide\.id === "zhangjiajie-itinerary"/);
  assert.match(homepage, /\{ \.\.\.guide, \.\.\.featuredTourCard \}/);
  assert.match(
    homeCard,
    /canonicalPath: "\/tours\/zhangjiajie-4-day-private-tour\/"/,
  );
  assert.match(
    homeCard,
    /canonicalPath: "\/zh\/tours\/zhangjiajie-4-day-private-tour\/"/,
  );
  assert.match(homeCard, /locale === "ko" \? null : cards\[locale\]/);
});

test("production pruning removes previews but retains published routes and product assets", async () => {
  const exportPruner = await source("tools/prune-production-export.mjs");
  const sourceOnlyAssetBlock = exportPruner.match(
    /const sourceOnlyAssetRoots = \[(.*?)\];/s,
  )?.[1];

  assert.ok(sourceOnlyAssetBlock);
  assert.match(exportPruner, /privatePreviewExportRoots/);
  assert.match(exportPruner, /"preview"/);
  assert.match(exportPruner, /"zh\/preview"/);
  assert.match(exportPruner, /"ko\/preview"/);
  assert.match(exportPruner, /\(default\)\/preview/);
  assert.match(exportPruner, /\(localized\)\/\[locale\]\/preview/);
  assert.match(
    exportPruner,
    /"ko\/tours\/zhangjiajie-4-day-private-tour"/,
  );
  assert.doesNotMatch(
    sourceOnlyAssetBlock,
    /product-previews\/zhangjiajie-4-day-private-tour/,
  );

  for (const requiredOutput of [
    "tours/zhangjiajie-4-day-private-tour/index.html",
    "zh/tours/zhangjiajie-4-day-private-tour/index.html",
    "product-previews/zhangjiajie-4-day-private-tour/hero/forest-pillars-og-1200.jpg",
    "product-previews/zhangjiajie-4-day-private-tour/hero/sunlit-forest-pillars-174.jpg",
    "product-previews/zhangjiajie-4-day-private-tour/route/day-2-bailong-elevator.jpg",
    "product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-shower.jpg",
  ]) {
    assert.match(
      exportPruner,
      new RegExp(requiredOutput.replaceAll(".", "\\.")),
    );
  }
});

test("preview uses the established editorial design and complete, distinct stay-photo sets", async () => {
  const [page, copy, css, imagePlan] = await Promise.all([
    source("components/ZhangjiajiePrivateTourPreviewPage.tsx"),
    source("lib/zhangjiajiePrivateTourPreview.ts"),
    source("components/ZhangjiajiePrivateTourPreviewPage.module.css"),
    source(
      "content/product-previews/zhangjiajie-4-day-private-tour/image-preview-plan.md",
    ),
  ]);

  assert.match(page, /EditorialGuidePage\.module\.css/);
  assert.match(page, /editorialStyles\.hero/);
  assert.match(page, /editorialStyles\.article/);
  assert.match(page, /editorialStyles\.cta/);
  assert.match(page, /GuideCtaLink/);
  assert.match(page, /className=\{styles\.articleJump\}/);
  assert.doesNotMatch(page, /mode="hero"|heroPricePanel/);
  assert.match(copy, /city-nihao-twin\.jpg/);
  assert.match(copy, /city-nihao-twin-entry\.jpg/);
  assert.match(copy, /city-west-exterior\.jpg/);
  assert.match(copy, /city-west-twin\.jpg/);
  assert.match(copy, /city-west-double\.jpg/);
  assert.match(copy, /city-west-twin-decorated\.jpg/);
  assert.match(copy, /city-west-bathroom\.jpg/);
  assert.match(copy, /family-villa-living\.jpg/);
  assert.match(copy, /family-villa-twin\.jpg/);
  assert.match(copy, /family-villa-double\.jpg/);
  assert.match(copy, /family-villa-bathroom\.jpg/);
  assert.match(copy, /family-villa-terrace\.jpg/);
  assert.match(copy, /family-villa-recreation\.jpg/);
  assert.match(copy, /signature-villa-terrace\.jpg/);
  assert.match(copy, /signature-villa-suite\.jpg/);
  assert.match(copy, /signature-villa-exterior\.jpg/);
  assert.match(copy, /signature-villa-four-poster\.jpg/);
  assert.match(copy, /signature-villa-fireplace-room\.jpg/);
  assert.match(copy, /signature-villa-garden-lounge\.jpg/);
  assert.match(copy, /signature-villa-bathtub\.jpg/);
  assert.match(copy, /signature-villa-red-room\.jpg/);
  assert.match(copy, /signature-villa-colour-room\.jpg/);
  assert.match(copy, /signature-villa-vanity\.jpg/);
  assert.match(copy, /signature-villa-shower\.jpg/);
  assert.match(copy, /signature-villa-lounge-detail\.jpg/);
  assert.match(page, /hero\/sunlit-forest-pillars-174\.jpg/);
  assert.doesNotMatch(page, /images\/hero-zhangjiajie\.jpg/);
  assert.match(imagePlan, /国家森林公园峰林_174\.jpg/);
  assert.match(imagePlan, /hero\/tianmen-cave-and-stairs\.jpg/);
  assert.match(imagePlan, /hero\/grand-canyon-glass-bridge\.jpg/);
  assert.match(imagePlan, /route\/day-1-hehua-airport\.jpg/);
  assert.match(imagePlan, /route\/day-2-bailong-elevator\.jpg/);
  assert.match(page, /hero\/tianmen-cave-and-stairs\.jpg/);
  assert.match(page, /hero\/grand-canyon-glass-bridge\.jpg/);
  assert.match(page, /route\/day-1-hehua-airport\.jpg/);
  assert.match(page, /route\/day-2-bailong-elevator\.jpg/);
  assert.match(page, /Martin Lewison/);
  assert.match(page, /creativecommons\.org\/licenses\/by-sa\/2\.0/);
  assert.match(copy, /Spacious Premium Stay/);
  assert.match(copy, /宽敞高级住宿/);
  assert.match(copy, /Not limited to the stays shown here/);
  assert.match(copy, /only part of the hotel selection we can arrange/);
  assert.match(copy, /不只限于页面里的酒店/);
  assert.match(copy, /页面仅展示部分住宿/);
  assert.match(page, /className=\{styles\.stayChoiceNote\}/);
  assert.doesNotMatch(
    copy,
    /Ni Hao|你好酒店|Ziwu|子午路|Western Grand|韦斯特|Country Garden|碧桂园|Jianai|简爱/,
  );
  assert.doesNotMatch(copy, /previewAssetNote|Internal preview photographs|内部预览照片/);
  assert.doesNotMatch(page, /styles\.previewAssetNote|copy\.previewAssetNote/);
  assert.doesNotMatch(copy, /Check dates and room availability|查询日期与可订房型/);
  assert.doesNotMatch(css, /tour-forest|tour-moss|#173b32|#0c241f|7 25 21/i);
});

test("visible product scope contains no deposit amount or percentage promise", async () => {
  const visibleProductSources = await Promise.all([
    source(productPath),
    source(pricingPath),
    source("lib/zhangjiajiePrivateTourPreview.ts"),
    source("lib/zhangjiajiePrivateTourHomeCard.ts"),
    source("components/ZhangjiajiePrivateTourPreviewPage.tsx"),
    source("components/ZhangjiajiePrivateTourPriceWindow.tsx"),
    source("app/(default)/tours/zhangjiajie-4-day-private-tour/page.tsx"),
    source(
      "app/(localized)/[locale]/tours/zhangjiajie-4-day-private-tour/page.tsx",
    ),
  ]);

  assert.doesNotMatch(
    visibleProductSources.join("\n"),
    /\bdeposit\b|定金|订金|(?:30|35)\s*(?:%|％)/iu,
  );
});

test("approved prices cross the client boundary as a public projection only", async () => {
  const [pricing, helper, priceWindow, page] = await Promise.all([
    source(pricingPath).then(JSON.parse),
    source("lib/zhangjiajiePrivateTourPreview.ts"),
    source("components/ZhangjiajiePrivateTourPriceWindow.tsx"),
    source("components/ZhangjiajiePrivateTourPreviewPage.tsx"),
  ]);

  assert.deepEqual(
    pricing.tiers.map((tier) =>
      tier.from_price_per_person ?? tier.price_per_person,
    ),
    [5390, 6090, 7090],
  );
  assert.equal(pricing.tiers[0].regular_price_per_person, 5590);
  assert.doesNotMatch(
    JSON.stringify(pricing),
    /Ni Hao|你好酒店|Ziwu|子午路|Western Grand|韦斯特|Country Garden|碧桂园|Jianai|简爱/,
  );
  assert.match(helper, /getZhangjiajiePrivateTourPublicPricing/);
  assert.match(helper, /validFrom: pricing\.valid_from/);
  assert.match(helper, /validUntil: pricing\.valid_until/);
  assert.match(page, /getZhangjiajiePrivateTourPublicPricing\(locale\)/);
  assert.match(priceWindow, /pricing: PublicPricing/);
  assert.match(priceWindow, /Date\.now\(\)/);
  assert.match(
    priceWindow,
    /useState<PriceWindowStatus>\("checking"\)/,
  );
  assert.match(priceWindow, /copy\.expiredPrice/);
  assert.doesNotMatch(
    [helper, page].join("\n"),
    /AggregateOffer|lowPrice|highPrice/,
  );
  assert.doesNotMatch(
    helper,
    /CNY 5,390|CNY 6,090|CNY 7,090|¥5,390|¥6,090|¥7,090/,
  );
  assert.doesNotMatch(page, /^"use client";/m);
  assert.doesNotMatch(
    priceWindow,
    /product\.json|pricing\.json|approved_decision_id|approved-public-pricing-20260815|zhangjiajiePrivateTourProduct|zhangjiajiePrivateTourPricing/,
  );
  assert.doesNotMatch(page, /data\/internal|source\/private|gross_margin|supplier_cost|CAC|negotiation_floor/);
});

test("post-prune scan rejects preview labels and internal product markers across all of out", async () => {
  const exportPruner = await source("tools/prune-production-export.mjs");

  for (const marker of [
    "zjj-4d3n-private-2026",
    "approved-public-pricing-20260815",
    "Local editorial preview",
    "本地文章预览",
    "public_eligible",
    "approved_decision_id",
    "pricing_source",
    "draft_inclusions",
    "draft_exclusions",
    "claim_status",
    "approved_price_decision",
    "needs_confirmation",
    "working_standard",
  ]) {
    assert.match(exportPruner, new RegExp(marker));
  }

  assert.match(exportPruner, /async function scanExportDirectory\(directory\)/);
  assert.match(exportPruner, /readdir\(directory, \{ withFileTypes: true \}\)/);
  assert.match(exportPruner, /await scanExportDirectory\(entryPath\)/);
  assert.match(exportPruner, /await readFile\(entryPath\)/);
  assert.match(exportPruner, /await scanExportDirectory\(outputRoot\)/);
  assert.match(exportPruner, /Server-side source and build caches/);
  assert.doesNotMatch(exportPruner, /\.next[\\/]server/);
});
