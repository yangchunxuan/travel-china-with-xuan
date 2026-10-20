import type { Metadata } from "next";
import { TravelInspirationHubPage } from "../../../../components/TravelInspirationPages";
import { buildTravelInspirationEditionMetadata } from "../../../../lib/travelInspirationMetadata";

export const metadata: Metadata = buildTravelInspirationEditionMetadata("ar");
export default function ArabicTravelInspirationRoute() { return <TravelInspirationHubPage editionLocale="ar" />; }
