import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const { formatPrivateTourPrice, privateTourProducts } = await import("../../lib/privateTourProducts.ts");

const body = (locale) =>
  readFile(path.join(projectRoot, `content/guides/china-family-private-tours/body.${locale}.ts`), "utf8");

const routes = [
  "beijing-xian-shanghai-8-day-private-tour",
  "beijing-xian-guilin-shanghai-10-day-private-tour",
  "beijing-hangzhou-suzhou-shanghai-11-day-private-tour",
  "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
];

function prices(slug, packageId) {
  const product = privateTourProducts.find((entry) => entry.slug === slug);
  assert.ok(product, slug);
  const guided = product.packages.find((entry) => entry.id === packageId);
  assert.ok(guided, `${slug}: ${packageId}`);
  return (travelers, locale) => {
    const price = guided.prices.find((entry) => entry.travelers === travelers);
    assert.ok(price, `${slug}: ${travelers} travellers`);
    // Intl puts a no-break space between the currency code and the amount; the page uses a plain one.
    return formatPrivateTourPrice(price.cnyPerPerson, locale, price.usdPerPerson, price.publishedPrice)
      .formatted.replaceAll(" ", " ");
  };
}

test("the family tours page shows each route's current published prices in every language", async () => {
  for (const locale of ["en", "zh", "ko"]) {
    const text = await body(locale);
    for (const slug of routes) {
      const price = prices(slug, "standard-guided");
      assert.ok(text.includes(price(4, locale)), `${locale} ${slug}: four travellers ${price(4, locale)}`);
      assert.ok(text.includes(price(2, locale)), `${locale} ${slug}: two travellers ${price(2, locale)}`);
      assert.ok(text.includes(`/tours/${slug}/`), `${locale}: links to ${slug}`);
    }
    const eightDay = prices(routes[0], "standard-guided");
    assert.ok(text.includes(eightDay(6, locale)), `${locale}: six travellers on the 8-day route`);
    const smallGroup = prices("beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour", "small-group-departure");
    assert.ok(text.includes(smallGroup(2, locale)), `${locale}: small-group from-price`);
  }
});
