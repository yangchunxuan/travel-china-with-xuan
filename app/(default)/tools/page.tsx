import type { Metadata } from "next";
import { SearchPlatformHubPage } from "../../../components/SearchPlatformHubPage";
import { getSearchHubMetadata } from "../../../lib/searchPlatformManifest";

export const metadata: Metadata = getSearchHubMetadata("tools", "en");

export default function ToolsHubPage() {
  return <SearchPlatformHubPage locale="en" section="tools" />;
}
