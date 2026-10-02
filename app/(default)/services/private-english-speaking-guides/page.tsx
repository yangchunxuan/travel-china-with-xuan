import type { Metadata } from "next";
import { PrivateGuideServicesPage } from "../../../../components/PrivateGuideServicesPage";
import { buildPrivateGuideServiceMetadata } from "../../../../lib/privateGuideServiceMetadata";

export const metadata: Metadata = buildPrivateGuideServiceMetadata("en");
export default function PrivateGuideServicesRoute() { return <PrivateGuideServicesPage locale="en" />; }
