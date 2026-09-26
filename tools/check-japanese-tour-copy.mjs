import assert from "node:assert/strict";

import { localizeJapanesePrivateTourProduct } from "../lib/localizeJapanesePrivateTourProduct.ts";
import { privateTourProducts } from "../lib/privateTourProducts.ts";

const pilot = "shanghai-suzhou-hangzhou-6-day-private-tour";
const strings = (value) => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
};

let checked = 0;
for (const product of privateTourProducts) {
  // This is the localization entry point that the Japanese page renders.
  // It applies the authored pilot and all editorial override files.
  const page = localizeJapanesePrivateTourProduct(product);
  assert.equal(page.path, `/ja/tours/${product.slug}/`);

  if (product.slug !== pilot) {
    assert.equal(page.highlights.length, product.highlights.zh.length, `${product.slug}: highlights`);
    assert.equal(page.itinerary.length, product.itinerary.length, `${product.slug}: itinerary`);
    assert.equal(page.exclusions.length, product.exclusions.zh.length, `${product.slug}: exclusions`);
    assert.equal(page.faq?.length ?? 0, product.faq?.length ?? 0, `${product.slug}: FAQ`);
    assert.equal(page.gallery.length, product.gallery.length, `${product.slug}: gallery`);
    assert.equal(page.routeMedia.length, product.routeMedia?.length ?? 0, `${product.slug}: route media`);
    assert.deepEqual(page.packages.map((item) => item.id), product.packages.map((item) => item.id), `${product.slug}: package IDs`);
  }

  assert.deepEqual(page.itinerary.map((item) => item.day), product.itinerary.map((item) => item.day), `${product.slug}: itinerary days`);
  for (let index = 0; index < (product.routeMedia?.length ?? 0); index += 1) {
    assert.equal(page.routeMedia[index].day, product.routeMedia[index].day, `${product.slug}: media day ${index}`);
    assert.equal(page.routeMedia[index].variants.length, product.routeMedia[index].variants.length, `${product.slug}: media variants ${index}`);
  }
  for (const [index, sourcePackage] of product.packages.entries()) {
    const renderedPackage = page.packages[index];
    assert.equal(renderedPackage.id, sourcePackage.id, `${product.slug}: package ${index} ID`);
    assert.equal(renderedPackage.quoteOnly, sourcePackage.quoteOnly === true, `${product.slug}: quote-only ${index}`);
    assert.equal(renderedPackage.rows.length, sourcePackage.prices.length, `${product.slug}: price rows ${index}`);
    for (const [rowIndex, sourceRow] of sourcePackage.prices.entries()) {
      const renderedRow = renderedPackage.rows[rowIndex];
      assert.equal(renderedRow.travelers, sourceRow.travelers, `${product.slug}: travelers ${index}/${rowIndex}`);
      assert.equal(renderedRow.cny, sourceRow.cnyPerPerson, `${product.slug}: CNY price ${index}/${rowIndex}`);
      assert.equal(renderedRow.amount, sourceRow.publishedPrice?.amountPerPerson ?? sourceRow.cnyPerPerson, `${product.slug}: published price ${index}/${rowIndex}`);
      assert.equal(renderedRow.currency, sourceRow.publishedPrice?.currency ?? "CNY", `${product.slug}: currency ${index}/${rowIndex}`);
    }
  }

  for (const value of strings(page)) {
    assert.ok(value.trim(), `${product.slug}: empty copy field`);
    // A Japanese-speaking guide can be requested separately; only a promise
    // that one is included by default (or at no surcharge) is unsupported.
    if (product.slug !== pilot) {
      assert.ok(
        !/日本語(?:対応)?ガイド.{0,24}(?:含まれます|含む|同料金|追加料金なし|無料|標準で付きます)/u.test(value),
        `${product.slug}: unsupported included Japanese guide claim`,
      );
    }
  }
  checked += 1;
}

assert.equal(checked, privateTourProducts.length);
console.log(`Rendered Japanese copy structure and source pricing passed for ${checked} tours; the authored pilot and all overrides were included.`);
