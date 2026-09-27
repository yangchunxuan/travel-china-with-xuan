import { japaneseLegacyZhangjiajieCopy, japaneseLegacyZhangjiajieProduct } from "./japaneseLegacyZhangjiajieProduct";
import { localizeJapanesePrivateTourProduct } from "./localizeJapanesePrivateTourProduct";
import { privateTourProducts } from "./privateTourProducts";

export type JapaneseCatalogTour = ReturnType<typeof localizeJapanesePrivateTourProduct>;

/** Every tour with a Japanese page, in the order the Japanese tours hub lists them. */
export function getJapaneseTourCatalog(): JapaneseCatalogTour[] {
  return [
    ...privateTourProducts.map((product) => localizeJapanesePrivateTourProduct(product)),
    localizeJapanesePrivateTourProduct(japaneseLegacyZhangjiajieProduct, japaneseLegacyZhangjiajieCopy),
  ];
}
