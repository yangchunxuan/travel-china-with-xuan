import { notFound } from "next/navigation";
import {
  getSearchCollectionBySegments,
  searchCollections,
  type SearchCollectionDefinition,
} from "./searchCollectionI18n";
import type { HomegroundLocale } from "./homegroundI18n";
import { getSearchCollectionMetadata } from "./searchPlatformManifest";

export function getPublicSearchCollection(section: string, slug: string) {
  const collection = getSearchCollectionBySegments(section, slug);
  if (!collection) notFound();
  return collection;
}

export function getSearchCollectionParams(section: SearchCollectionDefinition["section"]) {
  return searchCollections
    .filter((collection) => collection.section === section)
    .map((collection) => ({ collection: collection.slug }));
}

export function buildSearchCollectionMetadataForRoute(
  section: string,
  slug: string,
  locale: HomegroundLocale,
) {
  const collection = getPublicSearchCollection(section, slug);
  return getSearchCollectionMetadata(collection.id, locale);
}
