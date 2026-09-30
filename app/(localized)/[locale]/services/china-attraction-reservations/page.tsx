import type { Metadata } from "next";
import { AttractionReservationsPage } from "../../../../../components/AttractionReservationsPage";
import { buildAttractionReservationMetadata } from "../../../../../lib/attractionReservationMetadata";
import { localizedRouteLocale } from "../../../../../lib/localizedRouteLocale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  return buildAttractionReservationMetadata(localizedRouteLocale(routeLocale));
}

export default async function LocalizedAttractionReservationsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  return <AttractionReservationsPage locale={localizedRouteLocale(routeLocale)} />;
}
