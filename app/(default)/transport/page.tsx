import type { Metadata } from "next";
import { SearchPlatformHubPage } from "../../../components/SearchPlatformHubPage";
import { getSearchHubMetadata } from "../../../lib/searchPlatformManifest";

export const metadata: Metadata = getSearchHubMetadata("transport", "en");

export default function TransportHubPage() {
  return <SearchPlatformHubPage locale="en" section="transport" />;
}
