import type { Metadata } from "next";
import { SearchPlatformHubPage } from "../../../components/SearchPlatformHubPage";
import { getSearchHubMetadata } from "../../../lib/searchPlatformManifest";

export const metadata: Metadata = getSearchHubMetadata("plan", "en");

export default function PlanHubPage() {
  return <SearchPlatformHubPage locale="en" section="plan" />;
}
