import type { Metadata } from "next";
import { buildArabicMetadata } from "./arabicSite";
import { buildFrenchMetadata } from "./frenchSite";
import { buildGermanMetadata } from "./germanSite";
import { getHomegroundCompanyEditionCopy, type HomegroundCompanyEditionLocale } from "./homegroundCompanyEditions";
import { getCompanyLanguagePaths } from "./homegroundCompanyI18n";
import { buildJapaneseSocialMetadata } from "./japaneseSite";
import { buildSpanishMetadata } from "./spanishSite";
import {
  tourCollectionEditionPath,
  tourCollectionLanguagePaths,
  type TourCollectionEditionLocale,
  type TourCollectionId,
} from "./tourCollections";
import { getTourCollectionEditionCopy } from "./tourCollectionsEditions";

type EditionLocale = TourCollectionEditionLocale & HomegroundCompanyEditionLocale;
type Builder = (title: string, description: string, path: string, languages?: Record<string, string>) => Metadata;

const builders: Record<EditionLocale, Builder> = {
  fr: buildFrenchMetadata,
  es: buildSpanishMetadata,
  de: buildGermanMetadata,
  ar: buildArabicMetadata,
};

/** The collections' builders: the four editions above, and Japanese with its own social card (as lib/destinationEditionMetadata.ts). */
const collectionBuilders: Record<TourCollectionEditionLocale, Builder> = {
  ...builders,
  ja: (title, description, path, languages) => ({
    title: { absolute: `${title} | Homeground China` },
    description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    robots: { index: true, follow: true },
    ...buildJapaneseSocialMetadata({ title, description, url: path }),
  }),
};

/** /xx/tours/<collection>/: the edition's title, description and social card, with every language's copy as an alternate. */
export function buildTourCollectionEditionMetadata(id: TourCollectionId, edition: TourCollectionEditionLocale): Metadata {
  const { title, description } = getTourCollectionEditionCopy(edition).collections[id].metadata;
  return collectionBuilders[edition](title, description, tourCollectionEditionPath(id, edition), tourCollectionLanguagePaths(id));
}

/**
 * /xx/company/: as the English page, kept out of search (noindex, follow)
 * until the owner approves the copy. The title already names Homeground China.
 */
export function buildCompanyEditionMetadata(edition: HomegroundCompanyEditionLocale): Metadata {
  const copy = getHomegroundCompanyEditionCopy(edition);
  const base = builders[edition](copy.metadata.title, copy.metadata.description, copy.path, getCompanyLanguagePaths());
  return {
    ...base,
    title: { absolute: copy.metadata.title },
    robots: { index: false, follow: true },
    openGraph: { ...base.openGraph, title: copy.metadata.openGraphTitle },
    twitter: { ...base.twitter, title: copy.metadata.openGraphTitle },
  };
}
