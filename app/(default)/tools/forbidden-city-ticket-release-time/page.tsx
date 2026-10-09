import type { Metadata } from "next";
import { TicketReleaseTimePage } from "../../../../components/TicketReleaseTimePage";
import { buildTicketReleaseMetadata } from "../../../../lib/ticketReleaseTimeMetadata";

export const metadata: Metadata = buildTicketReleaseMetadata("en");
export default function TicketReleaseTimeRoute() { return <TicketReleaseTimePage locale="en" />; }
