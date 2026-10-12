import type { Metadata } from "next";
import { TerracottaHalfDayPage } from "../../../../components/TerracottaHalfDayPage";
import { terracottaHalfDayMetadata } from "../../../../lib/terracottaHalfDayTour";

export const metadata: Metadata = terracottaHalfDayMetadata("en");

export default function TerracottaHalfDayRoute() {
  return <TerracottaHalfDayPage locale="en" />;
}
