# User journey and CTA map

## The intended path

```text
INSPIRATION
  /guides/ or /explore/
      ↓ reader identifies a place, theme or practical concern
CHOICE
  /plan/
      ↓ reader chooses city roles, usable days, gateways, bases and pace
VALIDATION
  published editorial owner: is-your-china-itinerary-too-rushed
  plus the relevant transport, stay, holiday, ticket and arrival/departure owners
      ↓ reader either self-plans or asks for human help
HUMAN HANDOFF
  /china-itinerary-review/ or the shared trip brief
      ↓ planner confirms the suitable service, scope, price/quote and delivery timing
PURCHASE
  payment instructions are sent separately; paid work begins after payment is confirmed
```

The site currently has no online checkout. “Purchase” therefore means the post-enquiry, human-confirmed service step—not a Buy button, instant booking or automated paid result.

## CTA by reader state

| Reader state | Primary CTA | Secondary CTA | Must not imply |
|---|---|---|---|
| “I do not know where to start.” | Browse the national guide library and place sections | Open the first-trip planning Hub | That a questionnaire instantly creates a route |
| “I have places in mind but no route.” | Build a route skeleton in `/plan/` | Read the relevant city-order, open-jaw, base or traveller-fit owner | A free personalized itinerary |
| “I already have a day-by-day route.” | Run the public editorial pace check | Compare the human Route Review service | That the internal Checker is available |
| “I know my dates and priorities but cannot build the route.” | Open the service comparison / shared brief | Ask a planner to identify the right scope | That the first contact commits the traveller or guarantees the fixed-price scope |
| “I need bookings or local delivery too.” | Discuss custom Full Trip Planning & Ground Support | Use the shared brief with dates, party size and rough budget | That a generic Hub promises bookings, availability or ground delivery |

## Hub CTA copy constraints

Both Hubs should solve their editorial question before introducing help. The final module may invite the reader to share:

- travel dates or total nights;
- number of travellers and relevant pace/mobility needs;
- candidate cities or priorities;
- approximate budget;
- whether a usable route already exists.

Do not request passport scans, payment credentials, QR codes or unredacted booking references in a Hub CTA.

The Hub may name three service shapes in a neutral comparison:

- **Route Review** — the traveller already has a usable day-by-day route;
- **Route Build** — the traveller has dates and priorities but no usable route;
- **Full Trip Planning & Ground Support** — the traveller needs a broader, separately scoped service.

The Hub should not lead with US$69 or US$129. Current service names, prices, scope limits and terms belong to `/china-itinerary-review/` and must be read from the live service owner at integration time.

## Handoff state machine

| Stage | What Homeground has | What Homeground may say | What happens next |
|---|---|---|---|
| Editorial browsing | Anonymous reading state | Which owner can answer the next decision | Reader keeps self-planning or opens help |
| Initial brief | Dates, party size, rough budget and planning state | A planner will review the request | Human triage; no paid work has begun |
| Scope confirmation | Sufficient route/context information | Suitable service, included scope, price or quote and delivery timing | Traveller accepts or declines |
| Payment instruction | Accepted written scope | How to pay and who receives payment | Payment occurs outside site checkout |
| Confirmed work | Payment confirmation and required materials | Work has started under the written scope | Human delivery and agreed support |

## Measurement without a public Checker

Allowed Hub measurements are navigation events such as section link clicks, child-owner clicks, service-page visits and shared-brief starts, subject to the site’s approved analytics and consent system. Do not store Route Reality inputs, serialize them into URLs, or infer health, age or disability from a pace selection. No hidden scoring or public “crowding/overload index” is proposed.
