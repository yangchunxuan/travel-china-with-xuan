import type { Metadata } from "next";
import { SightsHubPage } from "../../../../components/SightsPages";
import { buildSightsEditionMetadata } from "../../../../lib/sightsMetadata";

export const metadata: Metadata = buildSightsEditionMetadata("ar");
export default function ArabicSightsRoute() { return <SightsHubPage editionLocale="ar" />; }
