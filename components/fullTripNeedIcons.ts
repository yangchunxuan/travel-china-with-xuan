import { BedDouble, Car, Handshake, Map as MapIcon, Ticket, UserRound } from "lucide-react";
import type { FullTripSupportNeed } from "../lib/fullTripSupport";

/** One mark per thing we can take on, shared by the page's panel and the trip-brief chips. */
export const fullTripNeedIcons = {
  route: MapIcon,
  hotels: BedDouble,
  tickets: Ticket,
  guides: UserRound,
  transfers: Car,
  ground: Handshake,
} satisfies Record<FullTripSupportNeed, typeof MapIcon>;
