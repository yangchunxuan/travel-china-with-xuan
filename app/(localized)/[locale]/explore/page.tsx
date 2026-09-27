import type { Metadata } from "next";
import { DestinationsHubPage } from "../../../../components/DestinationsHubPage";
import { localizedRouteLocale } from "../../../../lib/localizedRouteLocale";
import { withJapaneseAlternate } from "../../../../lib/japaneseSite";
import { getSearchHubMetadata } from "../../../../lib/searchPlatformManifest";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = localizedRouteLocale(routeLocale);
  return withJapaneseAlternate(getSearchHubMetadata("explore", locale), "/ja/explore/");
}

export default async function LocalizedExploreHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedRouteLocale(routeLocale);
  return <DestinationsHubPage locale={locale} />;
}
