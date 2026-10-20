import type { Metadata } from "next";
import { DestinationsHubPage } from "../../../../components/DestinationsHubPage";
import { buildDestinationsHubEditionMetadata } from "../../../../lib/destinationEditionMetadata";

export const metadata: Metadata = buildDestinationsHubEditionMetadata("de");
export default function DestinationsHubEditionRoute() { return <DestinationsHubPage editionLocale="de" />; }
