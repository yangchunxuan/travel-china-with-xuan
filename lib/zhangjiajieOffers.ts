import { formatPrivateTourPrice, type PrivateTourLocale } from "./privateTourProducts.ts";

interface ZhangjiajieOfferTier {
  name: string;
  fromPrice?: number;
  price?: number;
  sixPersonPrice: number;
}

/**
 * The Zhangjiajie 4-day tour's offers: one per stay tier and party size, priced
 * per person in the amount and currency the page shows, in the same shape as
 * the other tour pages' offers. Every language's page uses this, so the
 * structured prices are the same wherever the page publishes them.
 */
export function zhangjiajieOffers(
  pricing: { validFrom: string; validUntil: string; tiers: readonly ZhangjiajieOfferTier[] },
  locale: PrivateTourLocale,
  pageUrl: string,
  labels: { baseGroup: string; sixPerson: string },
) {
  const priceValidUntil = pricing.validUntil.slice(0, 10);
  const offers = pricing.tiers.flatMap((tier) => [
    { name: `${tier.name} · ${labels.baseGroup}`, cny: tier.fromPrice ?? tier.price ?? 0, quantity: { minValue: 2, maxValue: 4 } },
    { name: `${tier.name} · ${labels.sixPerson}`, cny: tier.sixPersonPrice, quantity: { value: 6 } },
  ]).map(({ name, cny, quantity }) => {
    const { amount, currency } = formatPrivateTourPrice(cny, locale);
    return {
      "@type": "Offer",
      name,
      price: amount,
      priceCurrency: currency,
      validFrom: pricing.validFrom,
      priceValidUntil,
      url: pageUrl,
      eligibleQuantity: { "@type": "QuantitativeValue", ...quantity, unitText: "adults" },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: amount,
        priceCurrency: currency,
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "IE", unitText: "person" },
      },
    };
  });
  const prices = offers.map((offer) => offer.price);
  return {
    "@type": "AggregateOffer",
    priceCurrency: offers[0]?.priceCurrency,
    lowPrice: Math.min(...prices),
    highPrice: Math.max(...prices),
    offerCount: offers.length,
    url: pageUrl,
    offers,
  };
}
