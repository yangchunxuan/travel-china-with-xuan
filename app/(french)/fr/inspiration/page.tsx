import type { Metadata } from "next";
import { TravelInspirationHubPage } from "../../../../components/TravelInspirationPages";
import { buildTravelInspirationEditionMetadata } from "../../../../lib/travelInspirationMetadata";

export const metadata: Metadata = buildTravelInspirationEditionMetadata("fr");
export default function FrenchTravelInspirationRoute() { return <TravelInspirationHubPage editionLocale="fr" />; }
