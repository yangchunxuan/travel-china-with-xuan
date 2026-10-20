import type { Metadata } from "next";
import { buildArabicMetadata } from "./arabicSite";
import { buildFrenchMetadata } from "./frenchSite";
import { buildGermanMetadata } from "./germanSite";
import { getHomegroundCompanyEditionCopy, type HomegroundCompanyEditionLocale } from "./homegroundCompanyEditions";
import { getCompanyLanguagePaths } from "./homegroundCompanyI18n";
import { buildJapaneseMetadata } from "./japaneseSite";
import { buildSpanishMetadata } from "./spanishSite";
import {
  tourCollectionEditionPath,
  tourCollectionLanguagePaths,
  type TourCollectionEditionLocale,
  type TourCollectionId,
} from "./tourCollections";
import { getTourCollectionEditionCopy } from "./tourCollectionsEditions";

type EditionLocale = TourCollectionEditionLocale & HomegroundCompanyEditionLocale;

const builders: Record<EditionLocale, (title: string, description: string, path: string, languages?: Record<string, string>) => Metadata> = {
  fr: buildFrenchMetadata,
  es: buildSpanishMetadata,
  de: buildGermanMetadata,
  ar: buildArabicMetadata,
};

/** /xx/tours/<collection>/: the edition's title, description and social card, with every language's copy as an alternate. */
export function buildTourCollectionEditionMetadata(id: TourCollectionId, edition: TourCollectionEditionLocale): Metadata {
  const { title, description } = getTourCollectionEditionCopy(edition).collections[id].metadata;
  return builders[edition](title, description, tourCollectionEditionPath(id, edition), tourCollectionLanguagePaths(id));
}

/**
 * /xx/company/: as the English page, kept out of search (noindex, follow)
 * until the owner approves the copy. The title already names Homeground China.
 */
export function buildCompanyEditionMetadata(edition: HomegroundCompanyEditionLocale): Metadata {
  const copy = getHomegroundCompanyEditionCopy(edition);
  const build = edition === "ja" ? buildJapaneseMetadata : builders[edition];
  const base = build(copy.metadata.title, copy.metadata.description, copy.path, getCompanyLanguagePaths());
  return {
    ...base,
    title: { absolute: copy.metadata.title },
    robots: { index: false, follow: true },
    openGraph: { ...base.openGraph, title: copy.metadata.openGraphTitle },
    twitter: { ...base.twitter, title: copy.metadata.openGraphTitle },
  };
}
