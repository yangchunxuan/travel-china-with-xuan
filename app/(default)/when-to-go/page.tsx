import type { Metadata } from "next";
import { SearchPlatformHubPage } from "../../../components/SearchPlatformHubPage";
import { getSearchHubMetadata } from "../../../lib/searchPlatformManifest";

export const metadata: Metadata = getSearchHubMetadata("when-to-go", "en");

export default function WhenToGoHubPage() {
  return <SearchPlatformHubPage locale="en" section="when-to-go" />;
}
