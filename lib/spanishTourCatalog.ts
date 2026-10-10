import { localizeSpanishPrivateTourProduct } from "./localizeSpanishPrivateTourProduct";
import { getPrivateTourProduct } from "./privateTourProducts";
import { spanishTourSlugs } from "./spanishTourCopy";

export type SpanishCatalogTour = ReturnType<typeof localizeSpanishPrivateTourProduct>;

/** Every tour with a Spanish page, in the order the Spanish tours page lists them. */
export function getSpanishTourCatalog(): SpanishCatalogTour[] {
  return spanishTourSlugs.map((slug) => {
    const product = getPrivateTourProduct(slug);
    if (!product) throw new Error(`Spanish tour has no source product: ${slug}`);
    return localizeSpanishPrivateTourProduct(product);
  });
}
