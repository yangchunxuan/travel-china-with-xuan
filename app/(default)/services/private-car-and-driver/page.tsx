import type { Metadata } from "next";
import { PrivateCarServicesPage } from "../../../../components/PrivateCarServicesPage";
import { buildPrivateCarServiceMetadata } from "../../../../lib/privateCarServiceMetadata";

export const metadata: Metadata = buildPrivateCarServiceMetadata("en");
export default function PrivateCarServicesRoute() { return <PrivateCarServicesPage locale="en" />; }
