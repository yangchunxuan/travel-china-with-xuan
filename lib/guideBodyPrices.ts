// @ts-ignore Source-TypeScript tests require the explicit extension.
import { getLocalizedPrivateTourProduct } from "./privateTourProducts.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { formatPrivateGuidePrice, getPrivateGuideRates, privateGuidePeakPrice, type PrivateGuideCity } from "./privateGuideServices.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS, attractionReservationServiceFeeCny, formatAttractionReservationFee } from "./attractionReservations.ts";

/**
 * Prices that English and Chinese guide bodies quote in running text, read
 * from the same tables the tour, guide and reservation pages use, so a guide
 * cannot drift from the page it sends the reader to. English shows USD for
 * tours (as the tour pages do) and CNY for guides; Chinese shows CNY.
 */
type BodyLocale = "en" | "zh";

function tour(slug: string, locale: BodyLocale) {
  const product = getLocalizedPrivateTourProduct(slug, locale);
  if (!product) throw new Error(`Guide body quotes a tour that does not exist: ${slug}`);
  return product;
}

/** The published per-person price for one party size, e.g. "USD 1,840" or "¥11,960". */
export function bodyTourPrice(slug: string, travelers: number, locale: BodyLocale, packageId?: string): string {
  const product = tour(slug, locale);
  const packages = packageId ? product.packages.filter((item) => item.id === packageId) : product.packages;
  if (packages.length !== 1) throw new Error(`${slug}: name one priced option (${product.packages.map((item) => item.id).join(", ")})`);
  const row = packages[0].rows.find((candidate) => candidate.travelers === travelers);
  if (!row) throw new Error(`${slug}: no published price for ${travelers} travellers`);
  return row.formatted;
}

/** The tour's title, path and length in this language. */
export function bodyTour(slug: string, locale: BodyLocale) {
  const product = tour(slug, locale);
  return { title: product.title, path: product.path, days: product.days };
}

/** A private guide's standard day rate (up to 8 hours), e.g. "CNY 1,200" or "人民币 1,200". */
export function bodyGuideRate(city: PrivateGuideCity, locale: BodyLocale): string {
  return formatPrivateGuidePrice(getPrivateGuideRates(locale)[city].standardCny, locale);
}

/** The peak-date day rate, e.g. "CNY 1,400" or "CNY 1,400–1,600". */
export function bodyGuidePeakRate(city: PrivateGuideCity, locale: BodyLocale): string {
  return privateGuidePeakPrice(city, locale);
}

/** The attraction-booking fee per person per attraction: "CNY 45 (about USD 7)" or "¥45". */
export function bodyReservationFee(locale: BodyLocale): string {
  if (locale === "zh") return formatAttractionReservationFee(attractionReservationServiceFeeCny, "zh");
  return `CNY ${attractionReservationServiceFeeCny} (about ${formatAttractionReservationFee(attractionReservationServiceFeeCny, "en")})`;
}

/** Days ahead a request must be made and paid for the booking guarantee. */
export const bodyReservationLeadDays: number = ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS;
