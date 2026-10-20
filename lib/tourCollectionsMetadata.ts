import type { Metadata } from "next";
import type { HomegroundLocale } from "./homegroundI18n";
import { buildHomegroundSocialMetadata } from "./homegroundSocialMetadata";
import { resolvePageTitle } from "./pageTitle";
import { tourCollectionLanguagePaths, tourCollectionPaths, type TourCollectionId } from "./tourCollections";
import { getTourCollectionsCopy } from "./tourCollectionsI18n";

export function buildTourCollectionMetadata(id: TourCollectionId, locale: HomegroundLocale): Metadata {
  const meta = getTourCollectionsCopy(locale).collections[id].metadata;
  const paths = tourCollectionPaths(id);
  return {
    title: resolvePageTitle(meta.title, locale),
    description: meta.description,
    ...buildHomegroundSocialMetadata({ locale, ...meta, url: paths[locale] }),
    alternates: {
      canonical: paths[locale],
      languages: tourCollectionLanguagePaths(id),
    },
    robots: { index: true, follow: true },
  };
}
