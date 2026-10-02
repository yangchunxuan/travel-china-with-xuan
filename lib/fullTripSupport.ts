import type { HomegroundLocale } from "./homegroundI18n";

/**
 * Full Trip Planning & Ground Support: the standalone page for the custom-
 * quote service (docs/paid-service-pathways-spec.md). Facts only from the
 * spec and the legal terms: the first brief is free, scope and price are
 * written per trip, nothing is paid before written confirmation, and the
 * website takes no payment. It never lists train tickets.
 */
export const fullTripSupportPath: Record<HomegroundLocale, string> = {
  en: "/services/full-trip-support/",
  zh: "/zh/services/full-trip-support/",
  ko: "/ko/services/full-trip-support/",
};

export const fullTripSupportEnquiryAnchor = "trip-enquiry";

/** What a traveller can hand over; each may be chosen on its own. */
export const fullTripSupportNeeds = ["route", "hotels", "tickets", "guides", "transfers", "ground"] as const;
export type FullTripSupportNeed = (typeof fullTripSupportNeeds)[number];
