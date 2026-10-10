# Source log: china-private-tour-prices

Reviewed 2026-10-11.

- Every price, trip length, option name and the count of routes with domestic flights is read from `lib/privateTourProducts.ts` through the same localisation the tour pages use. Regenerate the guide after any price change: `node --experimental-strip-types --no-warnings tools/generate-private-tour-price-guide.mjs --write`.
- The per-day figures, ranges, middle values and group-size percentages are arithmetic on those published prices.
- The price note is the sentence shown under the price on every tour page (`lib/privateTourCurrencyNote.ts`).
- No external sources: the page states only Homeground's own published prices.
