import type { Metadata } from "next";
import { SightsHubPage } from "../../../../components/SightsPages";
import { buildSightsEditionMetadata } from "../../../../lib/sightsMetadata";

export const metadata: Metadata = buildSightsEditionMetadata("fr");
export default function FrenchSightsRoute() { return <SightsHubPage editionLocale="fr" />; }
