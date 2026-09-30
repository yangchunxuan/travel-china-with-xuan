import type { Metadata } from "next";
import { AttractionReservationsPage } from "../../../../components/AttractionReservationsPage";
import { buildAttractionReservationMetadata } from "../../../../lib/attractionReservationMetadata";

export const metadata: Metadata = buildAttractionReservationMetadata("en");

export default function AttractionReservationsRoute() {
  return <AttractionReservationsPage locale="en" />;
}
