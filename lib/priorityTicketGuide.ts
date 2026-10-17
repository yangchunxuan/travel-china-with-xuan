import type { HomegroundLocale } from "./homegroundI18n";

// An English-only pilot: keep the existing entry and placement on other guides.
// This small map is also used by the client banner; do not import the tour catalog here.
const ticketGuides: Record<string, { attractionId: string; attraction: string }> = {
  "forbidden-city-for-foreign-visitors": { attractionId: "forbidden-city", attraction: "Forbidden City" },
  "terracotta-warriors-without-tour": { attractionId: "terracotta-warriors", attraction: "Terracotta Warriors" },
  "humble-administrators-garden-tickets-entry": { attractionId: "humble-administrators-garden", attraction: "Humble Administrator's Garden" },
};

export function getPriorityTicketGuideEntry(guideId: string, locale: HomegroundLocale) {
  const target = locale === "en" ? ticketGuides[guideId] : undefined;
  if (!target) return null;
  return {
    ...target,
    title: `${target.attraction} tickets, booked for you`,
    detail: "Send your dates as soon as they are set. We prepare your booking before tickets open and confirm the price in writing before you pay.",
    action: "Send your dates for booking",
    label: `${target.attraction} booking assistance`,
    close: "Close booking suggestion",
    href: `/services/china-attraction-reservations/?attraction=${target.attractionId}#reservation-enquiry`,
  };
}
