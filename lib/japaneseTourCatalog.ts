import { japaneseLegacyZhangjiajieCopy, japaneseLegacyZhangjiajieProduct } from "./japaneseLegacyZhangjiajieProduct";
import { localizeJapanesePrivateTourProduct } from "./localizeJapanesePrivateTourProduct";
import { privateTourProducts } from "./privateTourProducts";
import { buildPrivateTourDetailHref, getPrivateTourInquirySelection } from "./privateTourInquiryContext";
import { getPrivateTourEntrySelection } from "./privateTourStartingPrice";

export type JapaneseCatalogTour = ReturnType<typeof localizeJapanesePrivateTourProduct>;

/**
 * Card link for a Japanese tour: its smallest published party, not the cheaper
 * large-group tier. Tours whose selection the URL cannot carry open plain.
 */
export function japaneseTourEntryHref(tour: JapaneseCatalogTour): string {
  const entry = getPrivateTourEntrySelection(tour);
  return entry && getPrivateTourInquirySelection(tour.slug, entry.packageId, entry.travelers)
    ? buildPrivateTourDetailHref(tour.path, tour.slug, entry)
    : tour.path;
}

/** Every tour with a Japanese page, in the order the Japanese tours hub lists them. */
export function getJapaneseTourCatalog(): JapaneseCatalogTour[] {
  return [
    ...privateTourProducts.map((product) => localizeJapanesePrivateTourProduct(product)),
    localizeJapanesePrivateTourProduct(japaneseLegacyZhangjiajieProduct, japaneseLegacyZhangjiajieCopy),
  ];
}
