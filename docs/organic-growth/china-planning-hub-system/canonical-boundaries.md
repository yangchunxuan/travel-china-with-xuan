# Canonical boundaries: the two national planning Hubs

**Decision date:** 2026-08-20

**Evidence baseline:** latest `origin/main` at merge commit `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`, including PR #74

**Implementation action in this branch:** none

## Decision

| Head term / intent | Canonical owner | Why this owner wins | Pages that must not be created |
|---|---|---|---|
| China Travel Guide; travel guide to China; China trip guide | `system-guides` at `/guides/` with `/zh/guides/` and `/ko/guides/` | It is already published and indexable, uses the H1 “China Travel Guides” in English, and is the parent discovery library for all guide sections. | `/china-travel-guide/`, `/guides/china-travel-guide/`, `/travel-guide-to-china/` or locale equivalents |
| China itinerary; first trip to China; how to plan a China trip; China route planning | `hub-plan` at `/plan/` with `/zh/plan/` and `/ko/plan/` | It is already published and indexable and already owns trip length, city order, traveller fit, pace and budget. PR #74 continues to assign generic first-trip collection intent to this owner. | `/china-itinerary/`, `/first-trip-to-china/`, `/plan/china-itinerary/`, `/guides/first-china-trip-routes/` or locale equivalents |

The draft therefore strengthens two existing pages. A title or H1 test may be proposed during implementation, but the canonical path and identity do not move.

## Relationship between the owners

`system-guides` is the **national discovery owner**. It helps a reader identify the kind of China question they have: entry, destinations, itinerary, transport, timing, accommodation, tickets and practical setup. It should expose a short path into each narrower section rather than trying to answer every question.

`hub-plan` is the **national itinerary decision owner**. It starts when the reader has dates, nights, candidate places or a first-trip wish list. It owns the method for converting those inputs into a coherent route, then sends execution questions to narrower owners.

Neither Hub owns:

- passport-specific entry eligibility or transit qualification;
- detailed city itineraries or exact city-order comparisons;
- live flight, rail, ticket or hotel inventory;
- attraction booking steps or current admission rules;
- a personalized, executable itinerary;
- service prices, contracts, payment or ground-operation details.

## Narrow owners that remain independent

| Owner | Retained task | Boundary against the two Hubs |
|---|---|---|
| `plan-trip-length-city-order` | Browse approved pages about duration, order and route combinations | A narrow collection, not a third generic itinerary owner |
| `is-your-china-itinerary-too-rushed` | Diagnose city changes, door-to-door transfers, hotel moves, fixed bookings and recovery time | Public editorial validation owner; the Hubs summarize the checkpoint and link out |
| `china-open-jaw-flights-route-planning` | Decide whether different arrival and departure gateways reduce backtracking | Owns the full open-jaw method and examples |
| `china-hub-and-spoke-or-multi-base-route` | Choose a stable base, advancing bases or a hybrid | Owns base architecture, not the entire first-trip query |
| `china-arrival-day-booked-anchor-or-flexible-block` | Decide whether an arrival day can carry a scarce timed booking | Owns arrival-chain risk, not the whole itinerary |
| `china-last-night-before-international-flight` | Protect the final night and departure chain | Owns departure protection and airport-hotel synonyms |
| traveller-fit owners | Adapt a route for children, older travellers or wheelchair access | Own their stated traveller constraint, not generic first-trip advice |
| route-order and city-pair owners | Resolve a named route or transfer | Keep their precise combinations; do not copy their detailed answer into a Hub |
| `china-itinerary-review` | Explain and accept enquiries for human route review, route build and custom support | Commercial/service-intent owner; it must not replace the editorial Hub |

## PR #74 constraints preserved after merge

PR #74 merged on 2026-08-20 while this package was being prepared. Its merged Search Map work does not authorize a competing head-term page and preserves these decisions:

- “How Many Days in China: 7 vs 10 vs 14 Days” updates the existing rushed-itinerary owner; it does not create a duration-template page.
- “First China Trip Routes by Pace” remains held/noindex and points to `hub-plan` as the cannibalization owner.
- the first-24-hours candidate remains deferred and must route readers to existing arrival, transfer, hotel, payment and booking owners if later used;
- generic itinerary pace and duration remain with `is-your-china-itinerary-too-rushed` below `hub-plan`;
- the Route Reality Checker remains an internal specification with no public implementation or indexability authorization.

This branch is rebased onto the merge commit rather than cherry-picking the former PR branch. Repository publication state is used as ownership evidence; production deployment was not independently asserted.

The merged Search Map retains pre-merge summary counts and “not published” wording in its narrative. Those inventory notes are post-merge drift for central governance to correct; they do not reverse the owner records or authorize duplicate pages.

## Query routing rules

1. Route a broad “tell me how to travel in China” query to `/guides/`.
2. Route a broad “help me build my first China itinerary” query to `/plan/`.
3. Route an already formed itinerary that needs stress-testing to `is-your-china-itinerary-too-rushed`.
4. Route a named city sequence, traveller constraint or execution task to its narrower owner.
5. Route paid-service comparison or a request for a human deliverable to `/china-itinerary-review/`.
6. Never generate a city × month × number-of-days × traveller-type URL. A combination earns a page only when it has a distinct, evidenced decision that the existing owner cannot answer.

## Redirect/merge policy for future collisions

If an unpublished draft uses a synonym listed above, absorb its unique module into the relevant existing Hub or child owner and retire the proposed URL. If a competing URL is already public, central must review traffic, backlinks and locale parity before choosing a redirect. This draft does not prescribe or implement redirects.
