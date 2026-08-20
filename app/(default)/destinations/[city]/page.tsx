import { notFound } from "next/navigation";
import { DestinationHubPage } from "../../../../components/content/DestinationHubPage";
import {
  isPublishedDestinationHubId,
  publishedDestinationHubIds,
} from "../../../../lib/destinationHubs";
import { loadPublishedDestinationHubBody } from "../../../../lib/destinationHubRuntime";
import { getPublishedDestinationHubMetadata } from "../../../../lib/searchPlatformManifest";

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return publishedDestinationHubIds.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  if (!isPublishedDestinationHubId(city)) notFound();
  return getPublishedDestinationHubMetadata(city, "en");
}

export default async function DestinationHubRoute({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  if (!isPublishedDestinationHubId(city)) notFound();
  const body = await loadPublishedDestinationHubBody(city, "en");
  return <DestinationHubPage body={body} hubId={city} locale="en" />;
}
