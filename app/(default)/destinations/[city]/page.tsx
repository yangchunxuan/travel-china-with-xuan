import { notFound } from "next/navigation";
import { DestinationHubPage } from "../../../../components/content/DestinationHubPage";
import {
  destinationHubIds,
  isDestinationHubId,
} from "../../../../lib/destinationHubs";
import { loadDestinationHubBody } from "../../../../lib/destinationHubRuntime";
import { getDestinationHubMetadata } from "../../../../lib/searchPlatformManifest";

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return destinationHubIds.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  if (!isDestinationHubId(city)) notFound();
  return getDestinationHubMetadata(city, "en");
}

export default async function DestinationHubRoute({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  if (!isDestinationHubId(city)) notFound();
  const body = await loadDestinationHubBody(city, "en");
  return <DestinationHubPage body={body} hubId={city} locale="en" />;
}
