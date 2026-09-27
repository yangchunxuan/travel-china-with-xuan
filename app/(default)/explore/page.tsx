import type { Metadata } from "next";
import { DestinationsHubPage } from "../../../components/DestinationsHubPage";
import { withJapaneseAlternate } from "../../../lib/japaneseSite";
import { getSearchHubMetadata } from "../../../lib/searchPlatformManifest";

export const metadata: Metadata = withJapaneseAlternate(getSearchHubMetadata("explore", "en"), "/ja/explore/");

export default function ExploreHubPage() {
  return <DestinationsHubPage locale="en" />;
}
