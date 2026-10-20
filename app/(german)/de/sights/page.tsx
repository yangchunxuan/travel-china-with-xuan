import type { Metadata } from "next";
import { SightsHubPage } from "../../../../components/SightsPages";
import { buildSightsEditionMetadata } from "../../../../lib/sightsMetadata";

export const metadata: Metadata = buildSightsEditionMetadata("de");
export default function GermanSightsRoute() { return <SightsHubPage editionLocale="de" />; }
