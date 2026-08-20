import { notFound } from "next/navigation";
import { DestinationHubPage } from "../../../../../components/content/DestinationHubPage";
import {
  isPublishedDestinationHubId,
  publishedDestinationHubIds,
} from "../../../../../lib/destinationHubs";
import { loadPublishedDestinationHubBody } from "../../../../../lib/destinationHubRuntime";
import { localizedRouteLocale } from "../../../../../lib/localizedRouteLocale";
import { getPublishedDestinationHubMetadata } from "../../../../../lib/searchPlatformManifest";

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return (["zh", "ko"] as const).flatMap((locale) =>
    publishedDestinationHubIds.map((city) => ({ locale, city })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale: routeLocale, city } = await params;
  const locale = localizedRouteLocale(routeLocale);
  if (!isPublishedDestinationHubId(city)) notFound();
  return getPublishedDestinationHubMetadata(city, locale);
}

export default async function LocalizedDestinationHubRoute({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale: routeLocale, city } = await params;
  const locale = localizedRouteLocale(routeLocale);
  if (!isPublishedDestinationHubId(city)) notFound();
  const body = await loadPublishedDestinationHubBody(city, locale);
  return <DestinationHubPage body={body} hubId={city} locale={locale} />;
}
