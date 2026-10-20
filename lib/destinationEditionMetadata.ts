import type { Metadata } from "next";
import { buildArabicMetadata } from "./arabicSite";
import type { DestinationEditionCityContent } from "./destinationEditionContent";
import {
  destinationCityLanguagePaths,
  destinationEditionCityPath,
  destinationsHubEditionPath,
  type DestinationEditionLocale,
  type DestinationsHubEditionLocale,
} from "./destinationEditions";
import { getDestinationHub, type DestinationHubId } from "./destinationHubs";
import { getDestinationsHubEditionCopy } from "./destinationsHubEditions";
import { buildFrenchMetadata } from "./frenchSite";
import { buildGermanMetadata } from "./germanSite";
import { buildJapaneseSocialMetadata, japaneseAlternates } from "./japaneseSite";
import { buildSpanishMetadata } from "./spanishSite";

type Builder = (title: string, description: string, path: string, languages?: Record<string, string>) => Metadata;

/** Each edition's own title format ("<title> | Homeground China"), canonical, robots and social card. */
const builders: Readonly<Record<DestinationEditionLocale, Builder>> = {
  fr: buildFrenchMetadata,
  de: buildGermanMetadata,
  es: buildSpanishMetadata,
  ar: buildArabicMetadata,
  ja: (title, description, path, languages) => ({
    title: { absolute: `${title} | Homeground China` },
    description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    robots: { index: true, follow: true },
    ...buildJapaneseSocialMetadata({ title, description, url: path }),
  }),
};

/**
 * A city page in an edition: the edition's metadata with the city's hreflang
 * set (English, Chinese, Korean and every edition with the city) and, as on
 * the English page, the city's hero photo as the social image.
 */
export function buildDestinationEditionCityMetadata(
  language: DestinationEditionLocale,
  city: DestinationHubId,
  content: DestinationEditionCityContent,
): Metadata {
  const hub = getDestinationHub(city);
  const metadata = builders[language](content.title, content.description, destinationEditionCityPath(language, city), {
    ...destinationCityLanguagePaths(city),
  });
  const image = { url: hub.heroImageUrl, width: hub.imageWidth, height: hub.imageHeight, alt: content.heroAlt };
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, title: content.h1, images: [image] },
    twitter: { ...metadata.twitter, images: [{ url: image.url, alt: image.alt }] },
  };
}

/** The destinations hub's hreflang set: the English hub's languages, Japanese's own hub and the four editions. */
export function destinationsHubLanguagePaths() {
  return japaneseAlternates("/explore/", destinationsHubEditionPath.ja) as Readonly<Record<string, string>>;
}

/** The French, German, Spanish, Arabic or Japanese destinations hub. */
export function buildDestinationsHubEditionMetadata(language: DestinationsHubEditionLocale): Metadata {
  const copy = getDestinationsHubEditionCopy(language);
  return builders[language](copy.metadata.title, copy.section.description, destinationsHubEditionPath[language], {
    ...destinationsHubLanguagePaths(),
  });
}
