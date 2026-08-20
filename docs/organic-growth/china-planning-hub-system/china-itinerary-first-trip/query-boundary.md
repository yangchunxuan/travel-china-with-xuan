# China Itinerary / First Trip Hub — query boundary

**Owner:** `hub-plan`

**Action:** update the existing locale Hubs; do not create a new canonical URL

## Queries this Hub should satisfy

- china itinerary
- plan a trip to china
- first trip to china
- how to plan a china itinerary
- china route planning
- where to start with a china trip
- how many cities should I visit in China, when the query is still broad
- Chinese equivalents around 中国行程规划、第一次来中国怎么安排、中国旅游路线怎么规划
- Korean equivalents around 중국 여행 일정、첫 중국 여행 코스、중국 여행 동선 짜기

The Hub answers these with a decision method: nights → usable days → city roles → route geometry → fixed constraints → traveller fit → validation → recovery.

## Queries routed to narrower owners

| Query shape | Owner |
|---|---|
| Is this itinerary too rushed? How many cities are too many? | `is-your-china-itinerary-too-rushed` |
| 7 vs 10 vs 14 days in China | Same rushed-itinerary owner; no separate templates |
| Should I fly into one city and out of another? | `china-open-jaw-flights-route-planning` |
| One base or several hotels? | `china-hub-and-spoke-or-multi-base-route` |
| Can I book a timed attraction on arrival day? | `china-arrival-day-booked-anchor-or-flexible-block` |
| Where should I sleep before my international flight? | `china-last-night-before-international-flight` |
| Named city sequence or named regional route | The exact route-order owner |
| Child, older-parent or wheelchair constraints | The corresponding traveller-fit owner |
| Train/flight, station/airport or last-mile execution | `/transport/` and its task owner |
| Hotel area, property access or hotel type | `/stay/` and its task owner |
| Holiday, season or weather decision | `/when-to-go/` and its task owner |
| Attraction inventory, ticket channel or identity rule | The official/reseller and venue owner |
| Human review, route build, price, scope or ground support | `/china-itinerary-review/` |

## Content this Hub must not absorb

- a complete day-by-day itinerary for a specific traveller;
- a universal 7-, 10-, 14- or 21-day route;
- a table for every city count, month, passport or traveller type;
- live flight, train, hotel or ticket availability;
- attraction booking steps copied from venue owners;
- the five-part diagnostic body of the rushed-itinerary owner;
- the terms, prices and transaction workflow of the service owner;
- public Route Reality calculations or result URLs.

## Cannibalization decisions

- Absorb the navigation value of the held “First China Trip Routes by Pace” collection into this Hub.
- Send generic duration diagnosis to the rushed-itinerary owner instead of publishing “How Many Days in China” as a second page.
- Keep the three existing plan collections as browsing layers, not competing head-term pages.
- Treat “China itinerary review” as service intent only when the query asks for a human evaluation or paid deliverable.
