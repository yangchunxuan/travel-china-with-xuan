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

// Intl puts a no-break space between the currency code and the amount; the page uses a plain one.
const plain = (formatted) => formatted.replaceAll(" ", " ");

function tiers(slug, packageId) {
  const product = privateTourProducts.find((entry) => entry.slug === slug);
  assert.ok(product, slug);
  const guided = product.packages.find((entry) => entry.id === packageId);
  assert.ok(guided, `${slug}: ${packageId}`);
  const tier = (travelers) => {
    const price = guided.prices.find((entry) => entry.travelers === travelers);
    assert.ok(price, `${slug}: ${travelers} travellers`);
    return price;
  };
  return {
    published: (travelers, locale) => {
      const price = tier(travelers);
      return plain(formatPrivateTourPrice(price.cnyPerPerson, locale, price.usdPerPerson, price.publishedPrice).formatted);
    },
  };
}

test("the family tours page shows each route's current prices in every language", async () => {
  for (const locale of ["en", "zh", "ko"]) {
    const text = await body(locale);
    for (const slug of routes) {
      const route = tiers(slug, "standard-guided");
      assert.ok(text.includes(route.published(6, locale)), `${locale} ${slug}: six travellers ${route.published(6, locale)}`);
      assert.ok(text.includes(`/tours/${slug}/`), `${locale}: links to ${slug}`);
    }
    // A family of four is quoted in the text for the shortest route and the panda route.
    for (const slug of [routes[0], routes[3]]) {
      const route = tiers(slug, "standard-guided");
      assert.ok(text.includes(route.published(4, locale)), `${locale} ${slug}: four travellers`);
    }
    // The page gives the lower of the two 14-day small-group prices as the "from" price.
    const smallGroups = ["beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour", "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour"]
      .map((slug) => tiers(slug, "small-group-departure"))
      .sort((left, right) => Number(left.published(2, "en").replace(/\D/g, "")) - Number(right.published(2, "en").replace(/\D/g, "")));
    assert.ok(text.includes(smallGroups[0].published(2, locale)), `${locale}: small-group from-price`);
  }
});
