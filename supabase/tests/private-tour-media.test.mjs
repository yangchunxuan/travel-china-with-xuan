import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

import {
  collectPrivateTourPhotos,
  mergePrivateTourRouteMedia,
  pickVisibleRouteDay,
} from "../../lib/privateTourMedia.ts";
import {
  localizePrivateTourProduct,
  privateTourProducts,
  privateTourPreviewProducts,
} from "../../lib/privateTourProducts.ts";
import { privateTourAdditionalMediaBySlug } from "../../lib/privateTourPhotoAdditions.ts";

const publicRoot = path.resolve(import.meta.dirname, "../../public");
const locales = ["en", "zh", "ko", "ja"];
const photo = (src, caption = src) => ({ src, caption, alt: caption, width: 1600, height: 1000 });
const variant = (src, label = src) => ({ label, image: photo(src, label) });

// Japanese modules use the application's extensionless TS imports.
const japaneseFixtures = new Map(JSON.parse(execFileSync(process.execPath, [
  "--experimental-strip-types", "--no-warnings", "--loader",
  pathToFileURL(path.resolve(import.meta.dirname, "../../tools/ts-extension-loader.mjs")).href,
  "--input-type=module", "-e", `
    import { privateTourProducts } from ${JSON.stringify(pathToFileURL(path.resolve(import.meta.dirname, "../../lib/privateTourProducts.ts")).href)};
    import { localizeJapanesePrivateTourProduct } from ${JSON.stringify(pathToFileURL(path.resolve(import.meta.dirname, "../../lib/localizeJapanesePrivateTourProduct.ts")).href)};
    console.log(JSON.stringify(privateTourProducts.map(product => {
      const { heroImage, gallery, routeMedia } = localizeJapanesePrivateTourProduct(product);
      return [product.slug, { heroImage, gallery, routeMedia }];
    })));
  `,
], { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 })));

test("route-media merging preserves the original scene and additions on the same day", () => {
  const primary = variant("/day-2-primary.webp", "Primary scene");
  const additional = variant("/day-2-extra.webp", "Additional scene");
  const input = [
    { day: 4, variants: [variant("/day-4.webp")] },
    { day: 2, variants: [primary] },
    { day: 2, variants: [additional, variant(primary.image.src, "Duplicate metadata")] },
    { day: 1, variants: [variant("/day-1.webp")] },
  ];
  const original = JSON.stringify(input);
  const result = mergePrivateTourRouteMedia(input);

  assert.deepEqual(result.map(({ day }) => day), [1, 2, 4]);
  assert.deepEqual(result[1].variants, [primary, additional]);
  assert.equal(JSON.stringify(input), original, "merging must not modify shared product data");
  assert.deepEqual(mergePrivateTourRouteMedia([]), []);
});

test("the hero photo collection includes all day scenes and keeps one copy of each source", () => {
  const heroImage = photo("/hero.webp", "Hero caption");
  const galleryImage = photo("/gallery.webp", "Gallery caption");
  const routeImage = photo("/route.webp", "Route caption");
  const product = {
    heroImage,
    gallery: [galleryImage, photo(heroImage.src, "Repeated hero")],
    routeMedia: [
      { day: 1, variants: [{ image: routeImage }] },
      { day: 2, variants: [{ image: photo(galleryImage.src, "Repeated gallery") }] },
    ],
  };

  assert.deepEqual(collectPrivateTourPhotos(product), [heroImage, galleryImage, routeImage]);
  assert.deepEqual(collectPrivateTourPhotos({ heroImage, gallery: [], routeMedia: [] }), [heroImage]);
});

test("a tall itinerary row stays selected while the reading anchor lies within it", () => {
  const rects = [
    { index: 0, top: -120, bottom: 260 },
    { index: 1, top: 260, bottom: 1200 },
    { index: 2, top: 1200, bottom: 1560 },
  ];
  assert.equal(pickVisibleRouteDay(rects, 100), 0);
  assert.equal(pickVisibleRouteDay(rects, 500), 1);
  assert.equal(pickVisibleRouteDay(rects, 1180), 1);
  assert.equal(pickVisibleRouteDay(rects, 1320), 2);
  assert.equal(pickVisibleRouteDay([...rects].reverse(), 500), 1, "selection must depend on position, not callback order");
});

test("route selection uses the nearest edge in gaps and retains the first and last day", () => {
  const rects = [
    { index: 4, top: 100, bottom: 300 },
    { index: 5, top: 400, bottom: 700 },
  ];
  assert.equal(pickVisibleRouteDay(rects, -100), 4);
  assert.equal(pickVisibleRouteDay(rects, 320), 4);
  assert.equal(pickVisibleRouteDay(rects, 380), 5);
  assert.equal(pickVisibleRouteDay(rects, 900), 5);
  assert.equal(pickVisibleRouteDay([], 300), null);
});

test("every published photo addition survives product assembly on its assigned day", () => {
  for (const product of privateTourProducts) {
    const additions = privateTourAdditionalMediaBySlug[product.slug] ?? [];
    for (const addition of additions) {
      const assembled = product.routeMedia.find(({ day }) => day === addition.day);
      assert.ok(assembled, `${product.slug}: addition day ${addition.day} was dropped`);
      const sources = new Set(assembled.variants.map(({ image }) => image.src));
      for (const { image } of addition.variants) {
        assert.ok(sources.has(image.src), `${product.slug}: ${image.src} was hidden by another group for day ${addition.day}`);
      }
    }
  }
});

test("long-route hero collections expose route photos rather than stopping at the small gallery", () => {
  const longRoutes = privateTourProducts.filter(({ days }) => days >= 10);
  assert.ok(longRoutes.length > 0);
  for (const product of longRoutes) {
    const collection = collectPrivateTourPhotos(product);
    const sources = new Set(collection.map(({ src }) => src));
    assert.equal(sources.size, collection.length, `${product.slug}: hero collection repeats a source`);
    assert.equal(collection[0].src, product.heroImage.src);
    const routeSources = product.routeMedia.flatMap(({ variants }) => variants.map(({ image }) => image.src));
    assert.ok(routeSources.some((src) => ![product.heroImage, ...product.gallery].some((image) => image.src === src)), `${product.slug}: fixture has no independent itinerary photograph`);
    for (const src of routeSources) {
      assert.ok(sources.has(src), `${product.slug}: route photo ${src} is missing from the hero collection`);
    }
  }
});

test("day photo assignments and image sources stay consistent in every product language", () => {
  for (const product of [...privateTourProducts, ...privateTourPreviewProducts]) {
    const expectedSources = collectPrivateTourPhotos(product).map(({ src }) => src);
    const expectedGroups = (product.routeMedia ?? []).map(({ day, variants }) => ({ day, sources: variants.map(({ image }) => image.src) }));
    for (const locale of locales.filter(value => value !== "ja" || privateTourProducts.includes(product))) {
      const localized = locale === "ja" ? japaneseFixtures.get(product.slug) : localizePrivateTourProduct(product, locale);
      assert.deepEqual(collectPrivateTourPhotos(localized).map(({ src }) => src), expectedSources, `${product.slug}/${locale}: hero source drift`);
      assert.deepEqual(localized.routeMedia.map(({ day, variants }) => ({ day, sources: variants.map(({ image }) => image.src) })), expectedGroups, `${product.slug}/${locale}: day source drift`);
      for (const { day, variants } of localized.routeMedia) {
        assert.ok(product.itinerary.some((item) => item.day === day), `${product.slug}/${locale}: photograph assigned to nonexistent day ${day}`);
        assert.equal(new Set(variants.map(({ image }) => image.src)).size, variants.length, `${product.slug}/${locale}/day-${day}: duplicate scene source`);
        for (const { image, label } of variants) {
          assert.ok(label.trim(), `${product.slug}/${locale}/day-${day}: scene has no label`);
          assert.ok(image.alt.trim(), `${product.slug}/${locale}/day-${day}: scene has no alt text`);
          assert.ok(image.caption.trim(), `${product.slug}/${locale}/day-${day}: scene has no caption`);
        }
      }
    }
  }
});

test("all product photos resolve to real, nonempty public assets with dimensions", async () => {
  const bySource = new Map();
  for (const product of [...privateTourProducts, ...privateTourPreviewProducts]) {
    for (const image of collectPrivateTourPhotos(product)) {
      assert.ok(image.src.startsWith("/"), `${product.slug}: external image bypasses local photo review`);
      assert.ok(image.width > 0 && image.height > 0, `${product.slug}/${image.src}: dimensions are missing`);
      bySource.set(image.src, product.slug);
    }
  }
  await Promise.all([...bySource].map(async ([src, slug]) => {
    const file = path.resolve(publicRoot, `.${src}`);
    assert.ok(file.startsWith(`${publicRoot}${path.sep}`), `${slug}: image path escapes public assets`);
    const metadata = await stat(file);
    assert.ok(metadata.isFile() && metadata.size > 0, `${slug}: ${src} is not a usable asset file`);
  }));
});
