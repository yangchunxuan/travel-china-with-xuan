import { privateTourProducts } from './privateTourProducts.ts';
import { localizeGermanPrivateTourProduct } from './localizeGermanPrivateTourProduct.ts';
export function getGermanTourCatalog() { return privateTourProducts.map(localizeGermanPrivateTourProduct); }
