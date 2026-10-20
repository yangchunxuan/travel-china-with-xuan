// @ts-ignore Source-TypeScript tests require the explicit extension.
import { localizeSpanishPrivateTourProduct } from "./localizeSpanishPrivateTourProduct.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { getPrivateTourProduct, PRIVATE_TOUR_PRICE_CONVERSION } from "./privateTourProducts.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { attractionReservationServiceFeeCny } from "./attractionReservations.ts";

/** The booking fee with its rough dollar value at the site's conversion rate, e.g. "45 yuanes (unos 7 USD)". */
export function spanishReservationFee(): string {
  const usd = Math.round(attractionReservationServiceFeeCny / PRIVATE_TOUR_PRICE_CONVERSION.cnyPerUsd);
  return `${attractionReservationServiceFeeCny} yuanes (unos ${usd} USD)`;
}

/**
 * Prices a Spanish guide quotes in its text, read from the tour's own price
 * table when the page is built, so the text cannot drift from the tour page.
 */
function spanishTour(slug: string) {
  const product = getPrivateTourProduct(slug);
  if (!product) throw new Error(`Spanish guide quotes a tour that does not exist: ${slug}`);
  return localizeSpanishPrivateTourProduct(product);
}

/** The published price per person for a party size, e.g. "1840 USD". */
export function spanishTourPrice(slug: string, travelers: number, packageId?: string): string {
  const tour = spanishTour(slug);
  const packages = packageId ? tour.packages.filter((pkg) => pkg.id === packageId) : tour.packages;
  if (packages.length !== 1) throw new Error(`${slug}: name one priced option (${tour.packages.map((pkg) => pkg.id).join(", ")})`);
  const row = packages[0].rows.find((candidate) => candidate.travelers === travelers);
  if (!row) throw new Error(`${slug}: no published price for ${travelers} travellers`);
  return row.formatted;
}

/** The tour's Spanish title and path, for a table row or a link. */
export function spanishTourName(slug: string): { readonly title: string; readonly path: string; readonly days: number } {
  const tour = spanishTour(slug);
  return { title: tour.title, path: tour.path, days: tour.days };
}
