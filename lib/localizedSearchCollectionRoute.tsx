import type { Metadata } from "next";
import { SearchCollectionHubPage } from "../components/SearchCollectionHubPage";
import type { SearchSectionId } from "./searchPlatformI18n";
import { buildSearchCollectionMetadataForRoute, getPublicSearchCollection, getSearchCollectionParams } from "./searchCollectionRuntime";
import { localizedRouteLocale } from "./localizedRouteLocale";

export function localizedSearchCollectionParams(section: SearchSectionId) {
  return (["zh", "ko"] as const).flatMap((locale) =>
    getSearchCollectionParams(section).map(({ collection }) => ({ locale, collection })),
  );
}

export async function localizedSearchCollectionMetadata(
  section: SearchSectionId,
  params: Promise<{ locale: string; collection: string }>,
): Promise<Metadata> {
  const { locale: routeLocale, collection } = await params;
  const locale = localizedRouteLocale(routeLocale);
  return buildSearchCollectionMetadataForRoute(section, collection, locale);
}

export async function LocalizedSearchCollectionPage({
  section,
  params,
}: {
  section: SearchSectionId;
  params: Promise<{ locale: string; collection: string }>;
}) {
  const { locale: routeLocale, collection: slug } = await params;
  const locale = localizedRouteLocale(routeLocale);
  const collection = getPublicSearchCollection(section, slug);
  return <SearchCollectionHubPage collectionId={collection.id} locale={locale} />;
}
