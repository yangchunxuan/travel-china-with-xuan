import type { Metadata } from "next";
import { SearchPlatformHubPage } from "../../../components/SearchPlatformHubPage";
import { getSearchHubMetadata } from "../../../lib/searchPlatformManifest";

export const metadata: Metadata = getSearchHubMetadata("services", "en");

export default function ServicesHubPage() {
  return <SearchPlatformHubPage locale="en" section="services" />;
}
