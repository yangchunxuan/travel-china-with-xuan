import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { zhangjiajieOffers } from "../../lib/zhangjiajieOffers.ts";
import { formatPrivateTourPrice } from "../../lib/privateTourProducts.ts";

const source = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");
const pricing = { validFrom: "2026-09-06", validUntil: "2026-12-30T23:59:59+08:00", tiers: [{ name: "City Stay", fromPrice: 3700, sixPersonPrice: 3500 }, { name: "Forest Lodge", price: 4500, sixPersonPrice: 4300 }] };

test("one per-person offer per stay tier and party size, in the page's currency", () => {
  const usd = zhangjiajieOffers(pricing, "en", "https://homegroundchina.com/tours/zhangjiajie-4-day-private-tour/", { baseGroup: "2–4 adults", sixPerson: "6 adults" });
  assert.equal(usd.offerCount, 4);
  assert.deepEqual(usd.offers.map((offer) => offer.name), ["City Stay · 2–4 adults", "City Stay · 6 adults", "Forest Lodge · 2–4 adults", "Forest Lodge · 6 adults"]);
  assert.deepEqual(usd.offers.map((offer) => offer.price), [3700, 3500, 4500, 4300].map((cny) => formatPrivateTourPrice(cny, "en").amount));
  assert.equal(usd.priceCurrency, "USD");
  assert.equal(usd.lowPrice, Math.min(...usd.offers.map((offer) => offer.price)));
  for (const offer of usd.offers) {
    assert.equal(offer.priceSpecification.referenceQuantity.value, 1, "priced per person, as the other tour pages");
    assert.equal(offer.priceValidUntil, "2026-12-30");
  }
  assert.deepEqual(usd.offers[0].eligibleQuantity, { "@type": "QuantitativeValue", minValue: 2, maxValue: 4, unitText: "adults" });
  assert.equal(zhangjiajieOffers(pricing, "zh", "u", { baseGroup: "a", sixPerson: "b" }).priceCurrency, formatPrivateTourPrice(3700, "zh").currency);
});

test("every language's Zhangjiajie page publishes the same offers from the prices it shows", async () => {
  const page = await source("components/ZhangjiajiePrivateTourPreviewPage.tsx");
  assert.match(page, /offers: zhangjiajieOffers\(publishedPricing, locale, pageUrl, \{ baseGroup: copy\.baseGroupLabel, sixPerson: copy\.sixPersonLabel \}\)/u);
  assert.doesNotMatch(await source("components/SpanishLegacyTours.tsx"), /offers:/u, "no edition keeps its own offers");
});
