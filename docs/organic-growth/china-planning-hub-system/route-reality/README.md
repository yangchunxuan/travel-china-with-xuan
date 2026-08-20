# Route Reality v2 internal knowledge base

Status: **INTERNAL SPECIFICATION ONLY — PUBLIC IMPLEMENTATION NOT AUTHORIZED**

Owner: Homeground planning systems / employee 4

Prepared: 2026-08-20

Model contract: `route-reality-v2.0.0-internal-draft`

## What this package is

This directory replaces the ambiguous parts of the first Route Reality Checker
draft with a reviewable internal contract. It defines:

- one strict seven-field input object;
- count semantics that do not double-count hotel changes;
- relational domains and feasible event placement;
- correlated expansion of unknown values;
- mutually exclusive day classifications that always reconcile;
- separate gross burden, applied transfer tax and remaining sightseeing
  capacity;
- a discriminated valid/invalid result contract;
- stable validation, alert, assumption and unknown-field ordering;
- privacy, network, storage and indexing prohibitions; and
- an internal fixture matrix for later implementation review.

This package does **not** contain a calculator, executable engine, API, public
page, component, route generator, service recommendation or approved scoring
policy. Nothing here authorizes implementation, indexing or deployment.

## Canonical and product boundary

The published `is-your-china-itinerary-too-rushed` guide remains the public
editorial and search owner for itinerary pace and duration diagnosis. Route
Reality v2 is an internal capacity-model handoff only. It must not create a
second editorial owner, serialize combinations into URLs, or generate
city × nights × traveller-type pages.

It may eventually estimate route-shape capacity after a separate approval. It
must never choose cities, produce a day-by-day itinerary, call a route good or
bad, promise a connection, or recommend/preselect a paid service.

## Files

- `data-model.schema.json` — strict input and target output JSON Schema.
- `rules.md` — validation, topology, enumeration and calculation semantics.
- `internal-examples.json` — non-public validation and property fixtures.
- `technical-review-disposition.md` — disposition of B01–B10 and R01–R12.
- `handoff.md` — prerequisites and acceptance gates for any later engine work.

## Seven inputs, no more and no fewer

| Field | v2 meaning |
|---|---|
| `totalNights` | Number of trip overnight stays, `1..30`, or exact literal `unknown`. |
| `arrivalWindow` | One exact closed time-band enum, or `unknown`. |
| `departureWindow` | One exact closed time-band enum, or `unknown`. |
| `crossCityMoves` | Number of distinct days that change the established overnight base from one city/base to another; day trips do not count. |
| `airportStationTransfers` | Number of distinct days containing one complex hub-to-hub interchange beyond ordinary first/last-mile access; not the number of individual ride segments. |
| `hotelChanges` | Number of additional accommodation-change days not already represented by `crossCityMoves`; ordinary checkout/check-in on a cross-city base-change day is excluded. |
| `travellerPace` | Self-selected calculation pace (`fast`, `balanced`, `slow`), never a proxy for age, disability, health or family status. |

The request is a plain object with exactly these keys. No city, date, name,
contact detail, passport data, health data, free text or exact transport record
is accepted.

## Coverage crosswalk for the Route Reality knowledge base

The knowledge base is wider than the seven-field calculator contract. Some
planning questions can be represented structurally; others must remain an
upstream editorial or human check because adding them would require new data,
personal context or live operations.

| Planning question | What v2 can represent | What v2 must not claim | Handoff owner |
|---|---|---|---|
| Door-to-door time | A cross-city base-change day or a distinct complex airport/station interchange can consume capacity under an approved policy pack | It has no live schedule, address, terminal or exact travel time and cannot promise a connection | Transport/city-pair owner verifies the actual chain |
| Hotel-change cost | `crossCityMoves` includes the ordinary base-change checkout/check-in; `hotelChanges` counts only extra accommodation-change days | It does not calculate money, check-in availability or a universal number of lost hours | Stay owner and exact property evidence |
| Fixed-booking conflict | The Hub can warn that fixed commitments must be placed before route scoring | The seven inputs contain no booking date, value, refund rule or event sequence, so the model cannot detect a real conflict | `/plan/`, arrival-day, ticket and venue owners |
| Fatigue chain | `travellerPace` changes only an approved capacity policy; move/interchange/hotel-change counts expose possible density | Pace is not health data, and aggregate counts do not prove consecutive fatigue or fitness | Traveller-fit owner or human route review |
| Buffer day | The output contract has a nullable buffer field and makes it non-actionable when nights are unknown | It is not minutes of connection protection, a delay guarantee or an approved formula in this draft | Rushed-itinerary and final-night owners |
| Open-jaw versus return airport | Two independently prepared route skeletons may later be compared using the same seven-field contract | The model has no airport/city identity and cannot choose gateways, find flights or infer which skeleton is open-jaw | `china-open-jaw-flights-route-planning` |
| “Too rushed” or overload | Stable internal alerts may describe confirmed versus possible capacity pressure after policy approval | It cannot label a traveller, certify feasibility or replace the published editorial diagnosis | `is-your-china-itinerary-too-rushed` |

No excluded question is silently inferred from `travellerPace`. Fixed bookings,
fatigue sequencing and gateway geometry stay outside the input object; passing
them as extra fields must fail validation.

## Policy values remain unapproved

The old draft contained usable-hour bands, event-burden coefficients,
full/fragment thresholds, alert ratios and buffer arithmetic. Technical review
found contract defects around those values. This v2 package therefore treats
all such numbers as a versioned `PolicyPack` that central product and editorial
owners must approve separately. The old numbers are not copied forward as
normative rules.

The structural identities are fixed; the numerical policy is not:

```text
gross burden = sum of all event burdens before slot clamping
applied transfer tax = capacity actually removed after slot clamping
net capacity = baseline capacity - applied transfer tax
```

The implementation gate remains closed until one complete policy pack and its
golden outputs are approved.

For that reason, both output arms in the internal-draft schema require
`policyPackVersion:null`. A later approved pack must trigger a schema and model
contract version bump and replace `null` with the exact immutable pack ID.
Publishing numeric output under the internal-draft model would be a contract
violation.

## Non-negotiable invariants

1. The calculation core is pure and deterministic.
2. It attempts zero network calls.
3. It persists, logs and emits zero input payloads.
4. It does not store state in URLs, sessions, analytics or browser storage.
5. It accepts no free text or personal data.
6. It performs no inference about protected or sensitive traits.
7. Every concrete day has exactly one class: full, fragment or unavailable.
8. Gross burden may exceed baseline; applied tax may not.
9. Net capacity never becomes negative and never serializes negative zero.
10. Possible unknown extremes are never presented as confirmed conditions.
11. When `totalNights` is unknown, the result is not decision-useful and its
    suggested buffer is `null`.
12. No output contains city order, transport selection, attraction choice,
    route pricing, service recommendation or executable itinerary text.
