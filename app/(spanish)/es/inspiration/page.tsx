import type { Metadata } from "next";
import { TravelInspirationHubPage } from "../../../../components/TravelInspirationPages";
import { buildTravelInspirationEditionMetadata } from "../../../../lib/travelInspirationMetadata";

export const metadata: Metadata = buildTravelInspirationEditionMetadata("es");
export default function SpanishTravelInspirationRoute() { return <TravelInspirationHubPage editionLocale="es" />; }
