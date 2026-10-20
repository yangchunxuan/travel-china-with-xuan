import type { Metadata } from "next";
import { SightsHubPage } from "../../../../components/SightsPages";
import { buildSightsEditionMetadata } from "../../../../lib/sightsMetadata";

export const metadata: Metadata = buildSightsEditionMetadata("es");
export default function SpanishSightsRoute() { return <SightsHubPage editionLocale="es" />; }
