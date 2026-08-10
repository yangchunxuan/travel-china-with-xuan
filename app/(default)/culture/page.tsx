import type { Metadata } from "next";
import { SearchPlatformHubPage } from "../../../components/SearchPlatformHubPage";
import { getSearchHubMetadata } from "../../../lib/searchPlatformManifest";

export const metadata: Metadata = getSearchHubMetadata("culture", "en");

export default function CultureHubPage() {
  return <SearchPlatformHubPage locale="en" section="culture" />;
}
