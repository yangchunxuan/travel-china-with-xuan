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
    /**
     * The page's indicative price for a larger group. The published two-, four- and
     * six-traveller prices follow "per-person part + shared part ÷ travellers" (the
     * four-traveller price sits on the line through the other two), so the same line
     * is read at twelve travellers and rounded up to CNY 10.
     */
    indicative: (travelers, locale) => {
      const two = tier(2).cnyPerPerson;
      const six = tier(6).cnyPerPerson;
      const shared = (two - six) * 3;
      const perPerson = two - shared / 2;
      return plain(formatPrivateTourPrice(Math.ceil((perPerson + shared / travelers) / 10) * 10, locale).formatted);
    },
  };
}

test("the family tours page shows each route's current prices in every language", async () => {
  for (const locale of ["en", "zh", "ko"]) {
    const text = await body(locale);
    for (const slug of routes) {
      const route = tiers(slug, "standard-guided");
      assert.ok(text.includes(route.published(6, locale)), `${locale} ${slug}: six travellers ${route.published(6, locale)}`);
      assert.ok(text.includes(route.indicative(12, locale)), `${locale} ${slug}: twelve travellers ${route.indicative(12, locale)}`);
      assert.ok(text.includes(`/tours/${slug}/`), `${locale}: links to ${slug}`);
    }
    // A family of four is quoted in the text for the shortest route and the panda route.
    for (const slug of [routes[0], routes[3]]) {
      const route = tiers(slug, "standard-guided");
      assert.ok(text.includes(route.published(4, locale)), `${locale} ${slug}: four travellers`);
    }
    const smallGroup = tiers("beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour", "small-group-departure");
    assert.ok(text.includes(smallGroup.published(2, locale)), `${locale}: small-group from-price`);
  }
});
