import type { Metadata } from "next";
import { SearchPlatformHubPage } from "../../../components/SearchPlatformHubPage";
import { getSearchHubMetadata } from "../../../lib/searchPlatformManifest";

export const metadata: Metadata = getSearchHubMetadata("stay", "en");

export default function StayHubPage() {
  return <SearchPlatformHubPage locale="en" section="stay" />;
}
