export const routeServiceQueryKey = "service";

export const routeServiceIds = [
  "itinerary-review",
  "route-build",
  "full-trip-support",
] as const;

export type RouteServiceId = (typeof routeServiceIds)[number];

export interface RouteServiceInterest {
  id: RouteServiceId;
  label: string;
  priceLabel: string;
  finderSummary: string;
  handoffSummary: string;
  note: string;
}

const routeServiceInterestById: Record<
  RouteServiceId,
  RouteServiceInterest
> = {
  "itinerary-review": {
    id: "itinerary-review",
    label: "Review My Route",
    priceLabel: "US$69",
    finderSummary:
      "Complete the short route questions. We will keep this choice with your enquiry and ask for the working itinerary after the fit check.",
    handoffSummary:
      "Your route-review choice will be sent with this enquiry. We ask for the working itinerary only after confirming that the standard scope fits.",
    note: "Requested service: Review My Route (US$69).",
  },
  "route-build": {
    id: "route-build",
    label: "Build My Route",
    priceLabel: "US$129",
    finderSummary:
      "Complete the short route questions. We will keep this choice with your enquiry and confirm the scope and delivery date before payment.",
    handoffSummary:
      "Your route-build choice will be sent with this enquiry. We confirm the standard scope and delivery date before asking for payment.",
    note: "Requested service: Build My Route (US$129).",
  },
  "full-trip-support": {
    id: "full-trip-support",
    label: "Full Trip Planning & Ground Support",
    priceLabel: "Custom quote",
    finderSummary:
      "Complete the short route questions so we can understand the journey and prepare the right written scope. No payment is taken here.",
    handoffSummary:
      "Your full-trip-support request will be sent with this enquiry. The written scope and quote depend on the actual journey and support required.",
    note: "Requested service: Full Trip Planning & Ground Support (custom quote).",
  },
};

export function getRouteServiceInterest(
  value: string | null | undefined,
): RouteServiceInterest | null {
  if (!value || !routeServiceIds.includes(value as RouteServiceId)) {
    return null;
  }

  return routeServiceInterestById[value as RouteServiceId];
}
