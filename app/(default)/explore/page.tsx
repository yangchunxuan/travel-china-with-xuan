import type { Metadata } from "next";
import { DestinationsHubPage } from "../../../components/DestinationsHubPage";
import { getSearchHubMetadata } from "../../../lib/searchPlatformManifest";

export const metadata: Metadata = getSearchHubMetadata("explore", "en");

export default function ExploreHubPage() {
  return <DestinationsHubPage locale="en" />;
}
