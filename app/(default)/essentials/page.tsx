import type { Metadata } from "next";
import { SearchPlatformHubPage } from "../../../components/SearchPlatformHubPage";
import { getSearchHubMetadata } from "../../../lib/searchPlatformManifest";

export const metadata: Metadata = getSearchHubMetadata("essentials", "en");

export default function EssentialsHubPage() {
  return <SearchPlatformHubPage locale="en" section="essentials" />;
}
