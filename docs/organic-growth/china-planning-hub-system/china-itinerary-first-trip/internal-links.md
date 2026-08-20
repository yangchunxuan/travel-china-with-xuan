# China Itinerary / First Trip Hub — internal-link plan

## Required Hub links

| Decision moment | English | Simplified Chinese | Korean | Link purpose |
|---|---|---|---|---|
| Entry unresolved | `/essentials/` | `/zh/essentials/` | `/ko/essentials/` | Route to the locale practical-information owner without making an eligibility decision |
| Named durations and orders | `/plan/trip-length-city-order/` | `/zh/plan/trip-length-city-order/` | `/ko/plan/trip-length-city-order/` | Browse approved narrow route decisions |
| Whole-route validation | `/guides/is-your-china-itinerary-too-rushed/` | `/zh/guides/is-your-china-itinerary-too-rushed/` | `/ko/guides/is-your-china-itinerary-too-rushed/` | Diagnose overload without exposing the internal Checker |
| Open-jaw geometry | `/guides/china-open-jaw-flights-route-planning/` | `/zh/guides/china-open-jaw-flights-route-planning/` | `/ko/guides/china-open-jaw-flights-route-planning/` | Compare gateways and backtracking |
| Base architecture | `/guides/china-hub-and-spoke-or-multi-base-route/` | `/zh/guides/china-hub-and-spoke-or-multi-base-route/` | `/ko/guides/china-hub-and-spoke-or-multi-base-route/` | Decide stable base versus advancing hotels |
| Arrival-day risk | `/guides/china-arrival-day-booked-anchor-or-flexible-block/` | `/zh/guides/china-arrival-day-booked-anchor-or-flexible-block/` | `/ko/guides/china-arrival-day-booked-anchor-or-flexible-block/` | Place or reject a scarce timed arrival-day booking |
| Final-night protection | `/guides/china-last-night-before-international-flight/` | `/zh/guides/china-last-night-before-international-flight/` | `/ko/guides/china-last-night-before-international-flight/` | Protect the international departure chain |
| Rail mode | `/guides/china-night-train-or-daytime-high-speed-rail/` | `/zh/guides/china-night-train-or-daytime-high-speed-rail/` | `/ko/guides/china-night-train-or-daytime-high-speed-rail/` | Compare sleep and usable-day effects |
| Rail execution | `/guides/china-high-speed-train-first-time-guide/` | `/zh/guides/china-high-speed-train-first-time-guide/` | `/ko/guides/china-high-speed-train-first-time-guide/` | Carry out the first rail journey |
| Accommodation | `/stay/` | `/zh/stay/` | `/ko/stay/` | Choose a base and then a property |
| Transport | `/transport/` | `/zh/transport/` | `/ko/transport/` | Reach station, airport and city-pair owners |
| Children | `/guides/china-itinerary-with-young-children/` | `/zh/guides/china-itinerary-with-young-children/` | `/ko/guides/china-itinerary-with-young-children/` | Apply child-specific pace and recovery constraints |
| Wheelchair access | `/guides/wheelchair-accessible-china-route-planning/` | `/zh/guides/wheelchair-accessible-china-route-planning/` | `/ko/guides/wheelchair-accessible-china-route-planning/` | Verify the complete access chain |
| Holidays | `/guides/china-public-holidays-travel-calendar/` | `/zh/guides/china-public-holidays-travel-calendar/` | `/ko/guides/china-public-holidays-travel-calendar/` | Check official annual dates and adjusted workdays |
| Ticket channel | `/guides/official-or-reseller-china-tickets/` | `/zh/guides/official-or-reseller-china-tickets/` | `/ko/guides/official-or-reseller-china-tickets/` | Choose evidence and fallback for a booking channel |
| Budget | `/guides/how-much-does-a-china-trip-cost/` | `/zh/guides/how-much-does-a-china-trip-cost/` | `/ko/guides/how-much-does-a-china-trip-cost/` | Include route-dependent cost categories |
| Human help | `/china-itinerary-review/` | `/zh/china-itinerary-review/` | `/ko/china-itinerary-review/` | Compare current human service scopes after the editorial answer |

## Optional contextual links

The rendered Hub should select, not dump, contextual cards from:

- the three existing plan collections;
- published destination Hubs for cities the reader is considering;
- one or two current named route owners as examples of a fully scoped decision;
- `china-private-transfer-or-public-transport` when a high-friction arrival or departure is the issue;
- `china-separate-flight-tickets-self-transfer-risk` when separate tickets create a high-consequence dependency.

No locale should link to a translation that is not published at integration time. In particular, the broad entry collection has historically had different locale coverage; the body therefore uses each locale’s `/essentials/` Hub as its stable entry.

## Links into this Hub

Central should add links to `/plan/` from:

- `/guides/` after a reader identifies an itinerary question;
- destination Hubs where the reader has selected a city but not the wider route;
- `is-your-china-itinerary-too-rushed` as the parent route-design return path;
- transport and stay Hubs when the user needs to reconsider the whole route rather than execute one task.

These are implementation recommendations only. This branch does not edit any live owner.
