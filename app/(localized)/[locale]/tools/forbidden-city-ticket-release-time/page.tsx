import type { Metadata } from "next";
import { TicketReleaseTimePage } from "../../../../../components/TicketReleaseTimePage";
import { buildTicketReleaseMetadata } from "../../../../../lib/ticketReleaseTimeMetadata";
import { localizedRouteLocale } from "../../../../../lib/localizedRouteLocale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildTicketReleaseMetadata(localizedRouteLocale(locale));
}
export default async function LocalizedTicketReleaseTimeRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TicketReleaseTimePage locale={localizedRouteLocale(locale)} />;
}
