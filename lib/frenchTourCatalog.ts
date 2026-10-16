import { privateTourProducts } from './privateTourProducts.ts';
import { localizeFrenchPrivateTourProduct } from './localizeFrenchPrivateTourProduct.ts';
export function getFrenchTourCatalog() { return privateTourProducts.map(localizeFrenchPrivateTourProduct); }
