import { notFound } from "next/navigation";
import { DestinationHubPage } from "../../../../../components/content/DestinationHubPage";
import {
  destinationHubIds,
  isDestinationHubId,
} from "../../../../../lib/destinationHubs";
import { loadDestinationHubBody } from "../../../../../lib/destinationHubRuntime";
import { localizedRouteLocale } from "../../../../../lib/localizedRouteLocale";
import { getDestinationHubMetadata } from "../../../../../lib/searchPlatformManifest";

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return (["zh", "ko"] as const).flatMap((locale) =>
    destinationHubIds.map((city) => ({ locale, city })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale: routeLocale, city } = await params;
  const locale = localizedRouteLocale(routeLocale);
  if (!isDestinationHubId(city)) notFound();
  return getDestinationHubMetadata(city, locale);
}

export default async function LocalizedDestinationHubRoute({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale: routeLocale, city } = await params;
  const locale = localizedRouteLocale(routeLocale);
  if (!isDestinationHubId(city)) notFound();
  const body = await loadDestinationHubBody(city, locale);
  return <DestinationHubPage body={body} hubId={city} locale={locale} />;
}
