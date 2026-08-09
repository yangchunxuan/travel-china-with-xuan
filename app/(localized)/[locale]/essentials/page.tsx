import type { Metadata } from "next";
import { SearchPlatformHubPage } from "../../../../components/SearchPlatformHubPage";
import { localizedRouteLocale } from "../../../../lib/localizedRouteLocale";
import { getSearchHubMetadata } from "../../../../lib/searchPlatformManifest";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = localizedRouteLocale(routeLocale);
  return getSearchHubMetadata("essentials", locale);
}

export default async function LocalizedEssentialsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedRouteLocale(routeLocale);
  return <SearchPlatformHubPage locale={locale} section="essentials" />;
}
