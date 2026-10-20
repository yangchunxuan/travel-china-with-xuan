import type { DestinationEditionLocale } from "../lib/destinationEditions";
import { getJapanesePublishedTourCatalog } from "../lib/japanesePublishedTourCatalog";
import type { PublishedPrivateTourCatalogItem } from "../lib/publishedPrivateTourCatalog";
import { getArabicPublishedTourCatalog } from "./ArabicToursHubPage";
import { getFrenchPublishedTourCatalog } from "./FrenchToursHubPage";
import { getGermanPublishedTourCatalog } from "./GermanToursHubPage";
import { getSpanishPublishedTourCatalog } from "./SpanishToursHubPage";

/**
 * Each edition's published tour catalogue, as its tours hub shows it: the
 * edition's tour names, routes and links (/xx/tours/<slug>/), with the source
 * prices, currencies and group sizes. A tour card in an edition takes its tour
 * from here, never from the English catalogue, and computes nothing.
 */
const catalogs: Readonly<Record<DestinationEditionLocale, () => readonly PublishedPrivateTourCatalogItem[]>> = {
  fr: getFrenchPublishedTourCatalog,
  de: getGermanPublishedTourCatalog,
  es: getSpanishPublishedTourCatalog,
  ar: getArabicPublishedTourCatalog,
  ja: getJapanesePublishedTourCatalog,
};

export function getEditionPublishedTourCatalog(language: DestinationEditionLocale) {
  return catalogs[language]();
}
