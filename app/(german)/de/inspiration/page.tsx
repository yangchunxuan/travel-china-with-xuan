import type { Metadata } from "next";
import { TravelInspirationHubPage } from "../../../../components/TravelInspirationPages";
import { buildTravelInspirationEditionMetadata } from "../../../../lib/travelInspirationMetadata";

export const metadata: Metadata = buildTravelInspirationEditionMetadata("de");
export default function GermanTravelInspirationRoute() { return <TravelInspirationHubPage editionLocale="de" />; }
