import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { buildPrivateTourContentNodes } from "../../lib/privateTourContentAdapter.ts";
import {
  convertCnyToKrw, convertCnyToUsd, getPrivateTourPreviewProduct,
  getPrivateTourProduct, getPrivateTourRouteProduct, localizePrivateTourProduct,
  privateTourPreviewProducts, privateTourProducts,
} from "../../lib/privateTourProducts.ts";
import { buildPrivateTourMetadata, getPrivateTourRouteParams } from "../../lib/privateTourMetadata.ts";
import { getPublishedPrivateTourCatalog } from "../../lib/publishedPrivateTourCatalog.ts";
import { privateTourNortheastWinterPreviewPhotoCreditsBySlug } from "../../lib/privateTourNortheastWinterPreviewProducts.ts";
import {
  buildPrivateTourDetailHref, getPrivateTourInquiryContext, getPrivateTourInquirySelection,
} from "../../lib/privateTourInquiryContext.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const locales = ["en", "zh", "ko"];
// Customer-facing CNY per person for 2, 4, 6 and 8 travellers, off-peak then peak.
const publishedPrices = {
  "harbin-yabuli-snow-town-6-day-private-tour": [[5600, 4900, 4600, 4300], [7200, 6300, 6000, 5700]],
  "harbin-snow-town-changbaishan-yanji-8-day-private-tour": [[7700, 6600, 6200, 5700], [10200, 8900, 8400, 8000]],
  "harbin-mohe-arctic-village-7-day-private-tour": [[5900, 4900, 4600, 4400], [7000, 5900, 5400, 5200]],
  "harbin-snow-town-mohe-9-day-private-tour": [[8000, 6600, 6200, 5700], [9000, 7400, 6900, 6400]],
  "yanji-changbaishan-wanda-6-day-private-tour": [[5400, 4900, 4600, 4300], [7200, 6300, 6000, 5700]],
};
const winterSlugs = Object.keys(publishedPrices);

test("five winter routes are public, indexable and present in each catalogue", () => {
  const publishedSlugs = new Set(privateTourProducts.map((product) => product.slug));
  const previewSlugs = new Set(privateTourPreviewProducts.map((product) => product.slug));
  const manifest = JSON.stringify(buildPrivateTourContentNodes());
  for (const slug of winterSlugs) {
    const product = getPrivateTourProduct(slug);
    assert.ok(product, slug);
    assert.equal(product.visibility, undefined, slug);
    assert.equal(getPrivateTourPreviewProduct(slug), undefined, slug);
    assert.equal(getPrivateTourRouteProduct(slug), product, slug);
    assert.equal(publishedSlugs.has(slug), true, slug);
    assert.equal(previewSlugs.has(slug), false, slug);
    assert.match(manifest, new RegExp(slug, "u"), slug);
    assert.equal(product.itinerary.length, product.days, slug);
  }
  for (const locale of locales) {
    const params = new Set(getPrivateTourRouteParams(locale).map(({ slug }) => slug));
    const catalog = new Set(getPublishedPrivateTourCatalog(locale).map((item) => item.slug));
    for (const slug of winterSlugs) {
      assert.equal(params.has(slug), true, `${locale}:${slug} route`);
      assert.equal(catalog.has(slug), true, `${locale}:${slug} catalog`);
      const metadata = buildPrivateTourMetadata(getPrivateTourProduct(slug), locale);
      assert.equal(metadata.robots.index, true, `${locale}:${slug} index`);
      assert.equal(metadata.alternates.languages.ja, `/ja/tours/${slug}/`);
    }
  }
});

test("forty seasonal prices and party-size selections match publication", () => {
  for (const [slug, [offPeak, peak]] of Object.entries(publishedPrices)) {
    const product = getPrivateTourProduct(slug);
    assert.deepEqual(product.packages.map((tourPackage) => tourPackage.id), ["low-season", "peak-season"], slug);
    for (const [tourPackage, expected] of [[product.packages[0], offPeak], [product.packages[1], peak]]) {
      assert.deepEqual(tourPackage.prices.map((row) => row.travelers), [2, 4, 6, 8], slug);
      assert.deepEqual(tourPackage.prices.map((row) => row.cnyPerPerson), expected, slug);
      for (const row of tourPackage.prices) {
        assert.equal(row.cnyPerPerson % 100, 0, slug);
        assert.deepEqual(getPrivateTourInquirySelection(slug, tourPackage.id, row.travelers), {
          packageId: tourPackage.id, travelers: row.travelers,
        });
        assert.equal(
          buildPrivateTourDetailHref(`/tours/${slug}/`, slug, { packageId: tourPackage.id, travelers: row.travelers }),
          `/tours/${slug}/?package=${tourPackage.id}&travelers=${row.travelers}`,
        );
      }
    }
    for (const locale of locales) {
      const localized = localizePrivateTourProduct(product, locale);
      for (const [index, tourPackage] of localized.packages.entries()) {
        for (const [rowIndex, row] of tourPackage.rows.entries()) {
          const cny = product.packages[index].prices[rowIndex].cnyPerPerson;
          assert.equal(row.amount, locale === "en" ? convertCnyToUsd(cny) : locale === "ko" ? convertCnyToKrw(cny) : cny);
        }
      }
      assert.ok(getPrivateTourInquiryContext(slug, locale), `${locale}:${slug}`);
    }
    assert.ok(getPrivateTourInquiryContext(slug, "ja"), `ja:${slug}`);
  }
});

test("winter copy avoids an aurora guarantee and records overnight train limits", () => {
  for (const slug of winterSlugs) {
    const product = getPrivateTourProduct(slug);
    for (const locale of locales) {
      const localized = localizePrivateTourProduct(product, locale);
      assert.equal(localized.facts?.length, 4, `${locale}:${slug} facts`);
      assert.ok(localized.metadataDescription.length <= 160, `${locale}:${slug} description`);
      assert.doesNotMatch(localized.title, /aurora|极光|오로라/iu);
    }
  }
  for (const slug of ["harbin-mohe-arctic-village-7-day-private-tour", "harbin-snow-town-mohe-9-day-private-tour"]) {
    assert.match(getPrivateTourProduct(slug).lede.en, /hard-sleeper train berths, allocated at random/u);
  }
});

test("winter photos resolve to licensed and credited route assets", async () => {
  for (const slug of winterSlugs) {
    const product = getPrivateTourProduct(slug);
    assert.equal(product.routePhotoFallback, false, slug);
    const images = [product.heroImage, ...product.gallery,
      ...(product.routeMedia ?? []).flatMap((group) => group.variants.map((variant) => variant.image))];
    const credits = privateTourNortheastWinterPreviewPhotoCreditsBySlug[slug];
    assert.ok(credits?.length, slug);
    assert.equal(credits.length, new Set(images.map((image) => image.src)).size, slug);
    assert.equal(new Set(credits.map((credit) => credit.sourceUrl)).size, credits.length, slug);
    for (const image of images) {
      assert.match(image.src, /^\/images\/tours\/(harbin-winter-5-day-private-tour|changbaishan-yanji-winter-6-day-private-tour|northeast-winter-2026-27)\//u);
      const fileStats = await stat(path.join(projectRoot, "public", image.src.slice(1))).catch(() => undefined);
      assert.ok(fileStats?.isFile(), image.src);
    }
  }
});
