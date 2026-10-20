import type { Metadata } from "next";
import { SightsHubPage } from "../../../../components/SightsPages";
import { buildSightsEditionMetadata } from "../../../../lib/sightsMetadata";

export const metadata: Metadata = buildSightsEditionMetadata("ja");
export default function JapaneseSightsRoute() { return <SightsHubPage editionLocale="ja" />; }
