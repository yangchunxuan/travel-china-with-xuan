import { privateTourProducts } from './privateTourProducts.ts';
import { localizeArabicPrivateTourProduct } from './localizeArabicPrivateTourProduct.ts';
export function getArabicTourCatalog() { return privateTourProducts.map(localizeArabicPrivateTourProduct); }
