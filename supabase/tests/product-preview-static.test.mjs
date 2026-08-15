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

test("Zhangjiajie product preview preserves the closed release gate", async () => {
  const [product, pricing, defaultRoute, localizedRoute, sitemap, exportPruner] =
    await Promise.all([
      source(productPath).then(JSON.parse),
      source(pricingPath).then(JSON.parse),
      source(
        "app/(default)/preview/zhangjiajie-4-day-private-tour/page.tsx",
      ),
      source(
        "app/(localized)/[locale]/preview/zhangjiajie-4-day-private-tour/page.tsx",
      ),
      source("app/sitemap.ts"),
      source("tools/prune-production-export.mjs"),
    ]);

  assert.equal(product.status, "draft");
  assert.equal(product.public_eligible, false);
  assert.equal(product.seo.indexable, false);
  assert.equal(pricing.status, "approved_price_decision");
  assert.equal(pricing.public_eligible, true);
  assert.equal(pricing.approved_decision_id, product.price_display.approved_decision_id);
  assert.match(defaultRoute, /process\.env\.NODE_ENV === "production"/);
  assert.match(defaultRoute, /notFound\(\)/);
  assert.match(defaultRoute, /index: false, follow: false/);
  assert.match(localizedRoute, /process\.env\.NODE_ENV === "production"/);
  assert.match(localizedRoute, /locale !== "zh"/);
  assert.doesNotMatch(sitemap, /zhangjiajie-4-day-private-tour/);
  assert.match(exportPruner, /privatePreviewExportRoots/);
  assert.match(exportPruner, /"preview"/);
  assert.match(exportPruner, /"zh\/preview"/);
  assert.match(exportPruner, /"ko\/preview"/);
  assert.match(exportPruner, /\(default\)\/preview/);
  assert.match(exportPruner, /\(localized\)\/\[locale\]\/preview/);
  assert.match(
    exportPruner,
    /product-previews\/zhangjiajie-4-day-private-tour/,
  );
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

test("approved prices have one runtime expiry path and no internal data leak", async () => {
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
  assert.match(helper, /isProductPriceCurrent/);
  assert.match(priceWindow, /isProductPriceCurrent\(pricing\.valid_from, pricing\.valid_until\)/);
  assert.match(priceWindow, /copy\.expiredPrice/);
  assert.doesNotMatch(page, /data\/internal|source\/private|gross_margin|supplier_cost|CAC|negotiation_floor/);
});
