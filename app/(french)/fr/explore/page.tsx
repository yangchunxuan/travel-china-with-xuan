import type { Metadata } from "next";
import { DestinationsHubPage } from "../../../../components/DestinationsHubPage";
import { buildDestinationsHubEditionMetadata } from "../../../../lib/destinationEditionMetadata";

export const metadata: Metadata = buildDestinationsHubEditionMetadata("fr");
export default function DestinationsHubEditionRoute() { return <DestinationsHubPage editionLocale="fr" />; }
