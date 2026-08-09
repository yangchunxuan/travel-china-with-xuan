import type { Metadata } from "next";
import { SearchPlatformHubPage } from "../../../components/SearchPlatformHubPage";
import { getSearchHubMetadata } from "../../../lib/searchPlatformManifest";

export const metadata: Metadata = getSearchHubMetadata("explore", "en");

export default function ExploreHubPage() {
  return <SearchPlatformHubPage locale="en" section="explore" />;
}
