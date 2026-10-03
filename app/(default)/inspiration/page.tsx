import type { Metadata } from "next";
import { TravelInspirationHubPage } from "../../../components/TravelInspirationPages";
import { buildTravelInspirationMetadata } from "../../../lib/travelInspirationMetadata";

export const metadata: Metadata = buildTravelInspirationMetadata("en");
export default function TravelInspirationRoute() { return <TravelInspirationHubPage locale="en" />; }
