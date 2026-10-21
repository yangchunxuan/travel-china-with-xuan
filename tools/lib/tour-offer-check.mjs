// What a tour page's structured data must say about price: a tour with a
// published price carries an Offer (or AggregateOffer) with the price, the
// currency and the page's own URL; a quote-only tour carries none, so no price
// is ever stated that the page does not publish.

/** Every Offer and AggregateOffer in the page's JSON-LD blocks. */
export function jsonLdOffers(html) {
  const offers = [];
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    const types = [].concat(node["@type"] ?? []);
    if (types.includes("Offer") || types.includes("AggregateOffer")) offers.push(node);
    Object.values(node).forEach(walk);
  };
  for (const match of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gu)) {
    walk(JSON.parse(match[1]));
  }
  return offers;
}

/** Problems with one tour page's offers; empty when the page is right. */
export function tourOfferProblems(html, { priced, url }) {
  const offers = jsonLdOffers(html);
  if (!priced) return offers.length ? [`${url} is quote-only but its structured data states a price`] : [];
  if (!offers.length) return [`${url} publishes a price but has no Offer structured data`];
  const problems = [];
  for (const offer of offers) {
    const amount = offer.price ?? offer.lowPrice;
    if (typeof amount !== "number" || !(amount > 0)) problems.push(`${url}: an offer has no positive price`);
    if (!/^[A-Z]{3}$/u.test(offer.priceCurrency ?? "")) problems.push(`${url}: an offer has no ISO currency`);
    if (offer.url !== url) problems.push(`${url}: an offer points to ${offer.url ?? "no URL"}`);
    if (offer.priceValidUntil !== undefined && !/^\d{4}-\d{2}-\d{2}$/u.test(offer.priceValidUntil)) {
      problems.push(`${url}: priceValidUntil ${offer.priceValidUntil} is not a date`);
    }
  }
  return problems;
}
