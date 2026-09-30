import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { privateTourInquiryIndex } from "../../lib/privateTourInquiryIndex.ts";
import {
  getPrivateTourInquiryContext,
  getPrivateTourInquirySelection,
  privateTourInquirySlugs,
} from "../../lib/privateTourInquiryContext.ts";
import { privateTourPreviewProducts, privateTourProducts } from "../../lib/privateTourProducts.ts";
import { getJapaneseTourCopy } from "../../lib/japaneseTourCopy.ts";
import { japaneseCruiseOverrides } from "../../lib/japaneseCruiseOverrides.ts";
import { japaneseExpansionOverrides } from "../../lib/japaneseExpansionOverrides.ts";
import { japaneseSmallGroupOverrides } from "../../lib/japaneseSmallGroupOverrides.ts";
import { jaPilotCopy } from "../../lib/jaPilotCopy.ts";
import { jaPilot } from "../../lib/jaPilot.ts";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

function project(products) {
  return products.map((product) => product.visibility === "preview" ? {
    slug: product.slug,
    visibility: "preview",
    title: { en: product.title.en, zh: product.title.zh, ko: product.title.ko },
    packages: product.packages.map((tourPackage) => ({
      id: tourPackage.id,
      prices: tourPackage.prices.map((row) => ({ travelers: row.travelers })),
    })),
  } : ({
    slug: product.slug,
    title: {
      en: product.title.en,
      zh: product.title.zh,
      ko: product.title.ko,
      ja: product.slug === jaPilot.tourSlug
        ? jaPilotCopy.tour.title
        : {
            ...getJapaneseTourCopy(product.slug),
            ...japaneseCruiseOverrides[product.slug],
            ...japaneseExpansionOverrides[product.slug],
            ...japaneseSmallGroupOverrides[product.slug],
          }.title,
    },
    packages: product.packages.map((tourPackage) => ({
      id: tourPackage.id,
      prices: tourPackage.prices.map((row) => ({ travelers: row.travelers })),
    })),
  }));
}

test("the slim inquiry index is an exact projection of the tour catalogue", () => {
  assert.deepEqual(
    JSON.parse(JSON.stringify(privateTourInquiryIndex)),
    project([...privateTourProducts, ...privateTourPreviewProducts]),
    "regenerate with: node --experimental-strip-types tools/generate-private-tour-inquiry-index.mjs",
  );
});

test("every inquiry slug resolves through the index to the catalogue title and prices", () => {
  for (const slug of privateTourInquirySlugs) {
    const product = [...privateTourProducts, ...privateTourPreviewProducts]
      .find((candidate) => candidate.slug === slug);
    if (!product) continue;
    for (const locale of ["en", "zh", "ko", "ja"]) {
      // A preview has no Japanese page, so no Japanese inquiry names it.
      assert.equal(getPrivateTourInquiryContext(slug, locale)?.name, locale === "ja"
        ? project([product])[0].title.ja
        : product.title[locale]);
    }
    if (slug === "zhangjiajie-4-day-private-tour") continue;
    for (const tourPackage of product.packages) {
      for (const row of tourPackage.prices) {
        assert.deepEqual(
          getPrivateTourInquirySelection(slug, tourPackage.id, String(row.travelers)),
          { packageId: tourPackage.id, travelers: row.travelers },
        );
      }
      assert.equal(getPrivateTourInquirySelection(slug, tourPackage.id, "10"), null);
    }
    assert.equal(getPrivateTourInquirySelection(slug, "not-a-package", "2"), null);
  }
});

test("the Japanese-only legacy Zhangjiajie tour retains its published title", () => {
  assert.equal(
    getPrivateTourInquiryContext("zhangjiajie-4-day-private-tour", "ja")?.name,
    "張家界4日間｜奇岩の峰林・ガラス橋・天門山",
  );
});

test("client inquiry validation never imports the full tour catalogue", async () => {
  const [context, prebuild] = await Promise.all([
    source("lib/privateTourInquiryContext.ts"),
    source("package.json").then((text) => JSON.parse(text).scripts.prebuild),
  ]);

  // The header and tour contact panel ship this module on every page; a value
  // import of privateTourProducts put ~125 KB gzip of tour copy in all of them.
  assert.doesNotMatch(context, /import\s*\{[^}]*\bprivateTourProducts\b/);
  assert.match(context, /import type \{ PrivateTourPriceTier \} from "\.\/privateTourProducts\.ts";/);
  assert.match(context, /import \{ privateTourInquiryIndex \} from "\.\/privateTourInquiryIndex\.ts";/);
  // Builds regenerate the index, so a branch that adds a tour never fails to
  // build; the comparison test above still catches a stale committed index.
  assert.match(prebuild, /npm run generate:private-tour-inquiry-index/);
});
