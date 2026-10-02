import type { Metadata } from "next";
import { FullTripSupportPage } from "../../../../components/FullTripSupportPage";
import { buildFullTripSupportMetadata } from "../../../../lib/fullTripSupportMetadata";

export const metadata: Metadata = buildFullTripSupportMetadata("en");
export default function FullTripSupportRoute() { return <FullTripSupportPage locale="en" />; }
