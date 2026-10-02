/**
 * The service fee as the page shows it, small enough for the enquiry form's
 * client bundle (lib/attractionReservations.ts pulls in the tour catalogue
 * for its conversion rates, so the page resolves the display amount there
 * and passes this down).
 */
export interface AttractionReservationFeeDisplay {
  /** The fee per person per attraction in the display currency. */
  amount: number;
  currency: "USD" | "KRW" | "CNY";
  numberLocale: string;
  currencyDisplay: "code" | "symbol";
}

/** A total is the displayed unit fee times the units, so it matches "fee × people × attractions" as shown. */
export function formatAttractionReservationFeeDisplay(fee: AttractionReservationFeeDisplay, units = 1) {
  if (!Number.isSafeInteger(units) || units <= 0) throw new RangeError("The fee is counted for a positive whole number of units.");
  return new Intl.NumberFormat(fee.numberLocale, {
    style: "currency",
    currency: fee.currency,
    currencyDisplay: fee.currencyDisplay,
    maximumFractionDigits: 0,
  }).format(fee.amount * units);
}
