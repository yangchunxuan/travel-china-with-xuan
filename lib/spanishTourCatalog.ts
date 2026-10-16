import { privateTourProducts } from './privateTourProducts.ts';
import { localizeSpanishPrivateTourProduct } from './localizeSpanishPrivateTourProduct.ts';
export type SpanishCatalogTour = ReturnType<typeof localizeSpanishPrivateTourProduct>;
export function getSpanishTourCatalog() { return privateTourProducts.map(localizeSpanishPrivateTourProduct); }
