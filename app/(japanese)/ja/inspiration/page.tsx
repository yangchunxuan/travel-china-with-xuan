import type { Metadata } from "next";
import { TravelInspirationHubPage } from "../../../../components/TravelInspirationPages";
import { buildTravelInspirationEditionMetadata } from "../../../../lib/travelInspirationMetadata";

export const metadata: Metadata = buildTravelInspirationEditionMetadata("ja");
export default function JapaneseTravelInspirationRoute() { return <TravelInspirationHubPage editionLocale="ja" />; }
