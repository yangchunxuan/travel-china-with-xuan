import type { Metadata } from "next";
import { SightsHubPage } from "../../../components/SightsPages";
import { buildSightsMetadata } from "../../../lib/sightsMetadata";

export const metadata: Metadata = buildSightsMetadata("en");
export default function SightsRoute() { return <SightsHubPage locale="en" />; }
