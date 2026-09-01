# Canonical boundary — China itinerary booking dependency order

Status: `NEW CHILD OWNER — UNAVAILABLE-RAIL STATE ONLY`

## Primary job to be done

The traveller already has travel dates and a candidate city skeleton, but the exact domestic railway inventory is not yet bookable. This page helps them build a reversible provisional route, record what is genuinely confirmed, and define the evidence required before that route becomes executable.

## This page owns

- the planning state between a candidate city skeleton and available dated domestic rail inventory;
- a provisional-route ledger that separates constraints, assumptions, cancellable placeholders and confirmations;
- the state transition `provisional → conditionally committed → executable`;
- dependency checks before a traveller makes a non-refundable downstream commitment;
- recovery when an assumed rail date, station or usable transfer block does not validate.

## This page does not own

- the generic question of what to book first for a first China trip;
- 12306 account setup, sale windows, reservation requests, waitlisting, purchase, changes, refunds, station use or boarding;
- direct-versus-reseller or direct-versus-OTA selection;
- whether a refundable hotel-rate premium is worth paying;
- attraction ticket channels, release-window instructions or city-specific booking procedures;
- passport-name field handling across bookings;
- live schedules, fares, inventory, success rates or universal booking timelines;
- route pace diagnosis, city selection, city-specific route order or public Route Reality tooling.

## Adjacent owners

| Query | Canonical owner | Handoff |
|---|---|---|
| First-trip constraints, cities, route, transport, stays, tickets and buffers in the right order | `/plan/` | Parent decision path; this child begins only after dates and a candidate city skeleton exist |
| 12306 preparation, current ticket states, sale timing and rail execution | `china-high-speed-train-first-time-guide` | Verify and buy the actual rail segment there |
| Official attraction channel versus reseller | `official-or-reseller-china-tickets` | Verify the seller and admission state there |
| Passport identity consistency | `passport-name-across-china-bookings` | Prepare one identity record there |
| Arrival-day timed booking | `china-arrival-day-booked-anchor-or-flexible-block` | Protect the arrival edge there |
| Open-jaw versus same-city return | `china-open-jaw-flights-route-planning` | Decide international gateway structure there |
| Whole-trip overload | `is-your-china-itinerary-too-rushed` | Audit the completed route there |
| Current public-holiday dates and travel effects | `china-public-holidays-travel-calendar` | Verify the official annual calendar there |
| Direct versus OTA across travel products | Remote approved `book-china-travel-direct-or-ota` | Do not reproduce its channel comparison before publication |
| Refundable versus non-refundable hotel rate | Remote approved `refundable-or-nonrefundable-china-hotel-rate` | This page only labels whether a placeholder must remain cancellable |

No generic booking-order, city-by-date, city-by-trip-length, rail-sale countdown or channel-ranking derivative URL is authorised.
