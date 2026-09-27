import type { Metadata } from "next";
import { SearchPlatformHubPage } from "../../../components/SearchPlatformHubPage";
import { withJapaneseAlternate } from "../../../lib/japaneseSite";
import { getSearchHubMetadata } from "../../../lib/searchPlatformManifest";

export const metadata: Metadata = withJapaneseAlternate(getSearchHubMetadata("services", "en"), "/ja/services/");

export default function ServicesHubPage() {
  return <SearchPlatformHubPage locale="en" section="services" />;
}
