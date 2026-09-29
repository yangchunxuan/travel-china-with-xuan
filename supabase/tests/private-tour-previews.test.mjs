import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { buildPrivateTourContentNodes } from "../../lib/privateTourContentAdapter.ts";
import {
  convertCnyToKrw,
  convertCnyToUsd,
  getPrivateTourPreviewProduct,
  getPrivateTourProduct,
  getPrivateTourRouteProduct,
  localizePrivateTourProduct,
  privateTourPreviewProducts,
  privateTourProducts,
} from "../../lib/privateTourProducts.ts";
import {
  buildPrivateTourMetadata,
  getPrivateTourPreviewRouteParams,
  getPrivateTourRouteParams,
} from "../../lib/privateTourMetadata.ts";
import { getPublishedPrivateTourCatalog } from "../../lib/publishedPrivateTourCatalog.ts";
import { getPrivateTourGuideLanguageLabel } from "../../lib/privateTourGuideLanguage.ts";
import { privateTourNortheastWinterPreviewPhotoCreditsBySlug } from "../../lib/privateTourNortheastWinterPreviewProducts.ts";
import {
  buildPrivateTourDetailHref,
  getPrivateTourInquiryContext,
  getPrivateTourInquirySelection,
} from "../../lib/privateTourInquiryContext.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) => readFile(path.join(projectRoot, relativePath), "utf8");
const locales = ["en", "zh", "ko"];

// Owner-approved CNY per person: [2, 4, 6, 8] travellers, low then peak season.
const approvedPrices = {
  "harbin-yabuli-snow-town-6-day-private-tour": [[5100, 4400, 4200, 3900], [6500, 5700, 5500, 5200]],
  "harbin-snow-town-changbaishan-yanji-8-day-private-tour": [[7000, 6000, 5600, 5200], [9300, 8100, 7700, 7300]],
  "harbin-mohe-arctic-village-7-day-private-tour": [[5400, 4400, 4200, 4100], [6400, 5400, 5000, 4700]],
  "harbin-snow-town-mohe-9-day-private-tour": [[7300, 6000, 5600, 5200], [8200, 6800, 6300, 5900]],
};

test("preview tours stay out of every published list, catalogue and manifest", () => {
  const previewSlugs = privateTourPreviewProducts.map((product) => product.slug);
  assert.deepEqual(previewSlugs, Object.keys(approvedPrices));
  const publishedSlugs = new Set(privateTourProducts.map((product) => product.slug));
  for (const product of privateTourPreviewProducts) {
    assert.equal(product.visibility, "preview");
    assert.equal(publishedSlugs.has(product.slug), false, product.slug);
    assert.equal(getPrivateTourProduct(product.slug), undefined);
    assert.equal(getPrivateTourPreviewProduct(product.slug), product);
    assert.equal(getPrivateTourRouteProduct(product.slug), product);
  }
  for (const locale of locales) {
    assert.ok(getPrivateTourRouteParams(locale).every(({ slug }) => !previewSlugs.includes(slug)));
    assert.deepEqual(getPrivateTourPreviewRouteParams(locale).map(({ slug }) => slug), previewSlugs);
    const catalog = getPublishedPrivateTourCatalog(locale);
    assert.ok(catalog.every((item) => !previewSlugs.includes(item.slug)), locale);
  }
  // The sitemap, search platform and content manifest are built from these nodes.
  const manifest = JSON.stringify(buildPrivateTourContentNodes());
  for (const slug of previewSlugs) assert.doesNotMatch(manifest, new RegExp(slug, "u"));
});

test("preview routes render noindex en/zh/ko pages and never a Japanese page", async () => {
  for (const product of privateTourPreviewProducts) {
    for (const locale of locales) {
      const metadata = buildPrivateTourMetadata(product, locale);
      const localized = localizePrivateTourProduct(product, locale);
      assert.equal(metadata.robots.index, false);
      assert.equal(metadata.robots.follow, false);
      assert.equal(metadata.robots.googleBot.index, false);
      assert.equal(metadata.alternates.canonical, localized.path);
      assert.deepEqual(metadata.alternates.languages, {
        en: `/tours/${product.slug}/`,
        "zh-Hans": `/zh/tours/${product.slug}/`,
        ko: `/ko/tours/${product.slug}/`,
        "x-default": `/tours/${product.slug}/`,
      });
      assert.ok(localized.metadataDescription.length <= 160, `${locale}:${product.slug}`);
      assert.equal(localized.itinerary.length, product.days);
    }
  }
  const [defaultRoute, localizedRoute, japaneseRoute, page, sitemap] = await Promise.all([
    source("app/(default)/tours/[slug]/page.tsx"),
    source("app/(localized)/[locale]/tours/[slug]/page.tsx"),
    source("app/(japanese)/ja/tours/[slug]/page.tsx"),
    source("components/ShanghaiJiangnanImaginePage.tsx"),
    source("app/sitemap.ts"),
  ]);
  for (const route of [defaultRoute, localizedRoute]) {
    assert.match(route, /getPrivateTourPreviewRouteParams\(/u);
    assert.match(route, /getPrivateTourRouteProduct\(slug\)/u);
  }
  assert.doesNotMatch(japaneseRoute, /Preview|getPrivateTourRouteProduct/u);
  assert.doesNotMatch(sitemap, /privateTourPreviewProducts|getPrivateTourRouteProduct/u);
  // The language switch offers no Japanese link on a preview.
  assert.match(page, /localized\.visibility === "preview"\s*\/\/[^\n]*\n\s*\? localized\.paths/u);
});

test("preview prices are the approved seasonal 2/4/6/8 rows with rounded-up conversions", () => {
  for (const product of privateTourPreviewProducts) {
    const [low, peak] = approvedPrices[product.slug];
    assert.deepEqual(product.packages.map((tourPackage) => tourPackage.id), ["low-season", "peak-season"]);
    for (const [tourPackage, expected] of [[product.packages[0], low], [product.packages[1], peak]]) {
      assert.deepEqual(tourPackage.prices.map((row) => row.travelers), [2, 4, 6, 8]);
      assert.deepEqual(tourPackage.prices.map((row) => row.cnyPerPerson), expected);
      assert.ok(tourPackage.prices.every((row) => row.usdPerPerson === undefined && row.publishedPrice === undefined));
      for (const row of tourPackage.prices) {
        assert.equal(row.cnyPerPerson % 100, 0);
        const selection = getPrivateTourInquirySelection(product.slug, tourPackage.id, row.travelers);
        assert.deepEqual(selection, { packageId: tourPackage.id, travelers: row.travelers });
        assert.equal(
          buildPrivateTourDetailHref(`/tours/${product.slug}/`, product.slug, selection),
          `/tours/${product.slug}/?package=${tourPackage.id}&travelers=${row.travelers}`,
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
      assert.ok(getPrivateTourInquiryContext(product.slug, locale), `${locale}:${product.slug}`);
    }
    assert.equal(getPrivateTourInquiryContext(product.slug, "ja"), null);
  }
});

test("preview copy keeps to the supplier facts: driver-guide, written confirmation, no aurora promise", () => {
  for (const product of privateTourPreviewProducts) {
    for (const locale of locales) {
      const localized = localizePrivateTourProduct(product, locale);
      const text = JSON.stringify(localized);
      assert.doesNotMatch(localized.title, /aurora|极光|오로라/iu);
      assert.doesNotMatch(text, /English-speaking guide|英语导游|영어 가이드|한국어 가이드|No shopping|无购物|쇼핑 일정은 없습니다/u);
      assert.ok(localized.facts?.length === 4, `${locale}:${product.slug} facts`);
      assert.match(localized.serviceNote, locale === "en" ? /not a licensed tour guide/u : locale === "zh" ? /不是持证导游/u : /자격증이 있는 관광 가이드가 아니며/u);
      assert.match(getPrivateTourGuideLanguageLabel(product.slug, locale), locale === "en" ? /Driver-guide; language confirmed before payment/u : locale === "zh" ? /司机兼向导/u : /운전기사 겸 안내인/u);
      assert.ok(product.packages.every((tourPackage) => !tourPackage.label.ko.includes("한국어 가이드")));
      const auroraMentions = text.match(/aurora|极光|오로라/giu) ?? [];
      if (auroraMentions.length) {
        assert.equal(product.slug, "harbin-snow-town-mohe-9-day-private-tour");
        assert.match(text, locale === "en" ? /not scheduled or guaranteed/u : locale === "zh" ? /不安排、也不保证/u : /보장하지 않습니다/u);
      }
    }
  }
  const sleeperRoutes = ["harbin-mohe-arctic-village-7-day-private-tour", "harbin-snow-town-mohe-9-day-private-tour"];
  for (const slug of sleeperRoutes) {
    const product = getPrivateTourPreviewProduct(slug);
    assert.match(product.lede.en, /two nights in hard-sleeper train berths, allocated at random/u);
    assert.match(product.facts.en[1].value, /\+ 2 hard-sleeper train nights/u);
    assert.match(product.faq[0].question.en, /sleeper-train nights/u);
  }
  const changbai = getPrivateTourPreviewProduct("harbin-snow-town-changbaishan-yanji-8-day-private-tour");
  assert.match(changbai.itinerary[4].title.en, /Long transfer/u);
  assert.match(changbai.itinerary[4].description.en, /Jingpo Lake is a stop on the way, not a paid visit; its admission is not included/u);
});

test("preview photos reuse only matching licensed Harbin and Changbaishan files, each credited", async () => {
  for (const product of privateTourPreviewProducts) {
    assert.equal(product.routePhotoFallback, false);
    const images = [
      product.heroImage,
      ...product.gallery,
      ...(product.routeMedia ?? []).flatMap((group) => group.variants.map((variant) => variant.image)),
    ];
    // One credit per distinct external photograph (merged into the page's
    // photo credits by lib/privateTourPhotoCredits.ts).
    const credits = privateTourNortheastWinterPreviewPhotoCreditsBySlug[product.slug];
    assert.equal(credits.length, new Set(images.map((image) => image.src)).size, product.slug);
    assert.equal(new Set(credits.map((credit) => credit.sourceUrl)).size, credits.length, product.slug);
    for (const image of images) {
      assert.match(
        image.src,
        /^\/images\/tours\/(harbin-winter-5-day-private-tour|changbaishan-yanji-winter-6-day-private-tour)\//u,
      );
      const fileStats = await stat(path.join(projectRoot, "public", image.src.slice(1))).catch(() => undefined);
      assert.ok(fileStats?.isFile(), image.src);
    }
    // Only days that actually visit Harbin, Changbai Mountain or Yanji carry a photo.
    for (const group of product.routeMedia ?? []) {
      const day = product.itinerary.find((candidate) => candidate.day === group.day);
      assert.match(day.title.en + day.description.en, /Harbin|Changbai|Yanji|Central Street|Ice and Snow World|Saint Sophia/u, `${product.slug}:${group.day}`);
    }
  }
});
