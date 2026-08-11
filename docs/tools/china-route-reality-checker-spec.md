# China Route Reality Checker: Turn Nights Into Sightseeing Days

Status: **SPEC REVIEW READY**

Owner: Homeground content systems / Aesop (worker 4)

Last reviewed: 2026-08-11

## 1. Purpose

The China Route Reality Checker is a deterministic capacity model. It turns a small set of route-shape inputs into a conservative range for:

- full sightseeing days;
- fragment days;
- transfer tax, expressed as eight-hour sightseeing-day equivalents;
- suggested unallocated buffer; and
- overload alerts with machine-readable reasons.

It answers **“How much usable trip capacity might this route shape leave?”** It does not answer which cities to visit, what to do each day, which train or flight to book, or whether a personalised route is good.

This document specifies calculation and test behaviour only. It does not authorise a public page or production implementation.

## 2. Hard boundaries

### 2.1 No live transport dependency

The checker must not call or scrape live train, flight, map, traffic, weather, hotel or ticket-inventory services. It must not claim that a same-day connection is safe. Its coefficients are planning envelopes, not observed journey durations.

An eventual implementation may show a reminder to verify actual transport separately, but live verification is outside this model.

### 2.2 No route generation

The output must not contain:

- a city sequence;
- a day-by-day itinerary;
- attraction recommendations;
- a recommended train, flight, airport or station;
- route-specific prices; or
- language suggesting that the result replaces human route design or review.

### 2.3 No public or indexable surface in this task

This specification creates no file under `app/`, `pages/` or `public/`, no metadata entry, no sitemap entry and no schema markup. It must not create city × nights × traveller-type URLs, query-string landing pages, canonical variants or programmatically generated search pages.

If an interface is proposed later, its route, indexing, storage and commercial positioning require a separate review. State must not be encoded into crawlable URLs by default.

### 2.4 Commercial-language boundary

The repository's current commercial specification forbids presenting the free consultation as a Route Finder, timing checker or instant automatic planning result. This capacity model therefore remains an internal or explicitly pre-release diagnostic until product owners approve a compatible user journey. It must not be inserted into consultation copy by implication.

## 3. Core definitions

### 3.1 Calendar day

For `N` nights, the model creates `N + 1` calendar-day slots. Version 1 supports 1–30 nights. A value of `unknown` expands to the full supported range, 1–30 nights.

### 3.2 Full sightseeing day

A calendar day with at least six usable sightseeing hours after the model's applicable travel burdens.

### 3.3 Fragment day

A calendar day with at least two but fewer than six usable sightseeing hours. A fragment day may be useful for one bounded activity, but it must not be described as a full day.

### 3.4 Unavailable day

A calendar day with fewer than two usable sightseeing hours. This count is returned for reconciliation even though it is not a headline output.

### 3.5 Transfer tax

The estimated sightseeing capacity consumed by cross-city moves, complex airport/station interchanges and hotel churn. It is calculated in hours and divided by eight for display as sightseeing-day equivalents.

Arrival- and departure-day limitations are represented in the edge-day capacity table and are not added again to transfer tax.

### 3.6 Suggested buffer

Unallocated trip capacity kept outside promised sightseeing. It is not extra connection time and does not certify a flight or train connection.

## 4. Input contract

The engine accepts exactly seven conceptual inputs. An API may use the following TypeScript-shaped contract:

```ts
type KnownOrUnknown<T> = T | "unknown";

type TimeWindow =
  | "before_09"
  | "09_12"
  | "12_15"
  | "15_18"
  | "after_18";

type TravellerPace = "fast" | "balanced" | "slow";

interface RouteRealityInput {
  totalNights: KnownOrUnknown<number>;
  arrivalWindow: KnownOrUnknown<TimeWindow>;
  departureWindow: KnownOrUnknown<TimeWindow>;
  crossCityMoves: KnownOrUnknown<number>;
  airportStationTransfers: KnownOrUnknown<number>;
  hotelChanges: KnownOrUnknown<number>;
  travellerPace: KnownOrUnknown<TravellerPace>;
}
```

### 4.1 Count semantics

- `totalNights` is the number of overnight stays, not the number of 24-hour periods.
- `crossCityMoves` counts movements between distinct cities or distant overnight bases during the trip. International arrival and departure are not counted again.
- `airportStationTransfers` counts **complex interchanges beyond normal first/last-mile access**, such as airport-to-airport, station-to-airport or station-to-station transfers. A normal airport-to-first-hotel ride is already reflected in the arrival window and must not be counted here.
- `hotelChanges` counts every change from one accommodation to another. It includes changes caused by cross-city moves.
- All known counts must be integers from 0 to 30. Negative values, decimals, `NaN`, numeric strings and values above 30 are validation errors.

### 4.2 Time-window semantics

Arrival and departure windows use scheduled local time at the international or trip-boundary hub. They are deliberately broad. They do not encode punctuality, immigration eligibility, terminal distance or a specific service.

### 4.3 Pace semantics

- `fast`: the party can navigate and recover quickly, travel light and tolerate compressed transitions.
- `balanced`: ordinary first-time leisure pace with normal luggage and meal/rest needs.
- `slow`: the party needs more time for navigation, luggage, rest, mobility, children, older travellers or low-stress travel.

Pace is a capacity coefficient, not a judgement about the traveller.

## 5. Output contract

```ts
interface NumericRange {
  min: number;
  max: number;
}

type OverloadSeverity = "none" | "medium" | "high" | "critical";

interface RouteRealityOutput {
  status: "ok" | "insufficient_input" | "invalid";
  calendarDays: NumericRange;
  fullSightseeingDays: NumericRange;
  fragmentDays: NumericRange;
  unavailableDays: NumericRange;
  baselineSightseeingEquivalentDays: NumericRange;
  transferTaxEquivalentDays: NumericRange;
  netSightseeingEquivalentDays: NumericRange;
  suggestedBufferDays: number;
  perMoveSlackHours: NumericRange;
  departureProtection:
    | "position_previous_night"
    | "previous_night_if_final_major_move_is_same_day"
    | "same_day_not_proven_verify_separately"
    | "assume_previous_night_until_departure_known";
  overload: {
    severity: OverloadSeverity;
    codes: string[];
  };
  assumptions: string[];
  unknowns: string[];
  confidence: "low" | "medium" | "high";
}
```

All ranges are inclusive. The minimum and maximum of different outputs may come from different feasible event placements; clients must not add range endpoints together as if they describe one itinerary.

## 6. Assumptions that must always be displayed

Every result must expose, in plain language, at least these assumptions:

1. `N` nights create `N + 1` calendar days.
2. Six usable hours count as a full sightseeing day; two to under six count as a fragment day.
3. Arrival/departure bands already include ordinary formalities and normal first/last-mile access as a broad envelope.
4. Complex airport/station interchanges are extra events and must not duplicate normal first/last-mile access.
5. One cross-city move already includes the normal checkout/check-in burden for one base change.
6. Hotel changes beyond cross-city moves create additional hotel-churn tax.
7. Event placement is unknown, so the model returns the best and worst feasible classifications rather than inventing a daily schedule.
8. No live timetable, inventory, traffic, weather or operational disruption has been checked.
9. A suggested buffer is spare trip capacity, not proof that a transport connection is valid.
10. The result estimates route pressure; it does not recommend cities, order them or produce an itinerary.

## 7. Calculation model

### 7.1 Expand unknown inputs

Unknown values use these finite conservative domains:

| Input | Conservative domain |
|---|---:|
| `totalNights` | 1–30 |
| `arrivalWindow` | usable hours 0–8 |
| `departureWindow` | usable hours 0–8 |
| `crossCityMoves` | 0–`totalNights` |
| `airportStationTransfers` | 0–min(30, `2 + 2 × crossCityMoves.max`) |
| `hotelChanges` | 0–max(0, `totalNights.max - 1`) |
| `travellerPace` | union of fast, balanced and slow coefficients |

If `totalNights` is unknown, the result status is `insufficient_input`, confidence is `low`, and numeric ranges are still returned across the 1–30-night domain. The client must ask for nights before treating the result as decision-useful.

### 7.2 Build base day slots

Each interior day begins with `[8, 8]` usable hours. Arrival and departure slots use these intervals:

| Window | Arrival-day usable hours | Departure-day usable hours |
|---|---:|---:|
| `before_09` | 6–8 | 0–0 |
| `09_12` | 4–6 | 0–2 |
| `12_15` | 2–4 | 2–4 |
| `15_18` | 0–2 | 4–6 |
| `after_18` | 0–0 | 6–8 |
| `unknown` | 0–8 | 0–8 |

These are classification envelopes, not promises that an attraction is open during those hours.

### 7.3 Calculate event tax

Tax coefficients are hours consumed per event:

| Pace | Cross-city move | Complex airport/station interchange | Additional hotel change |
|---|---:|---:|---:|
| `fast` | 3–4 h | 0.75–1.25 h | 0.50–0.75 h |
| `balanced` | 4–5 h | 1.00–1.50 h | 0.75–1.00 h |
| `slow` | 5–6 h | 1.25–2.00 h | 1.00–1.50 h |
| `unknown` | 3–6 h | 0.75–2.00 h | 0.50–1.50 h |

Avoid double-counting hotel changes:

```text
additionalHotelChanges.min = max(0, hotelChanges.min - crossCityMoves.max)
additionalHotelChanges.max = max(0, hotelChanges.max - crossCityMoves.min)
```

For fully known values this reduces to:

```text
additionalHotelChanges = max(0, hotelChanges - crossCityMoves)
```

Total transfer-tax hours are:

```text
crossCityMoves × crossCityCoefficient
+ airportStationTransfers × interchangeCoefficient
+ additionalHotelChanges × hotelChangeCoefficient
```

Divide both interval endpoints by eight to produce `transferTaxEquivalentDays`.

### 7.4 Place burdens without inventing an itinerary

The engine must evaluate feasible placements of event-tax intervals across the day slots:

- each known cross-city move occupies a distinct calendar day;
- complex interchanges may share a day with arrival, departure, a cross-city move or another interchange;
- additional hotel changes may share a day with other burdens;
- remaining usable hours for a day are clamped at zero;
- when counts or pace are unknown, evaluate the whole allowed domain;
- a dynamic-programming implementation is preferred, but exhaustive enumeration is acceptable in tests.

For a given placement:

```text
remainingHours.min = max(0, baseHours.min - eventTax.max)
remainingHours.max = max(0, baseHours.max - eventTax.min)
```

A day is:

- guaranteed full when `remainingHours.min >= 6`;
- possibly full when `remainingHours.max >= 6`;
- guaranteed fragment when `remainingHours.min >= 2` and `remainingHours.max < 6`;
- possibly fragment when `remainingHours.max >= 2` and `remainingHours.min < 6`;
- guaranteed unavailable when `remainingHours.max < 2`;
- possibly unavailable when `remainingHours.min < 2`.

The headline ranges are the minimum guaranteed count and maximum possible count across all feasible placements:

```text
fullSightseeingDays.min = min(guaranteedFullCount)
fullSightseeingDays.max = max(possibleFullCount)
fragmentDays.min = min(guaranteedFragmentCount)
fragmentDays.max = max(possibleFragmentCount)
unavailableDays.min = min(guaranteedUnavailableCount)
unavailableDays.max = max(possibleUnavailableCount)
```

This deliberately exposes placement uncertainty. For example, one transfer may consume an interior sightseeing day or overlap an already-fragmented arrival day.

### 7.5 Topology overflow

If `crossCityMoves > calendarDays`, distinct placement is impossible under the model. Return:

- status `invalid`;
- full sightseeing days `[0, 0]`;
- fragment days `[0, calendarDays.max]`;
- transfer tax calculated from all supplied events;
- critical code `TOPOLOGY_OVERFLOW`.

Do not silently stack excess cross-city moves or normalise the input down.

### 7.6 Baseline and net sightseeing equivalents

```text
baselineSightseeingEquivalentDays = sum(base day-slot hours) / 8

net.min = max(0, baseline.min - transferTax.max)
net.max = max(0, baseline.max - transferTax.min)
```

Equivalent-day values explain total capacity; full and fragment ranges explain how that capacity may be distributed. They are related outputs, not interchangeable ones.

### 7.7 Suggested buffer

First calculate:

```text
baseMoveBuffer = 0.5 days if any event count could be greater than zero, otherwise 0
taxSpan = transferTax.max - transferTax.min
unknownTimePenalty = 0.5 days if arrival or departure is unknown, otherwise 0
unknownCountPenalty = 0.5 days if any count is unknown, otherwise 0
unknownPacePenalty = 0.5 days if pace is unknown, otherwise 0
```

Then:

```text
suggestedBufferDays = ceilToNextHalfDay(
  baseMoveBuffer
  + taxSpan
  + unknownTimePenalty
  + unknownCountPenalty
  + unknownPacePenalty
)
```

No arbitrary cap is applied. A very wide unknown-input range should produce an obviously large buffer and a request for better inputs rather than false precision.

Per-move schedule slack is reported separately:

| Pace | `perMoveSlackHours` |
|---|---:|
| fast | 1–2 h |
| balanced | 2–3 h |
| slow | 3–4 h |
| unknown | 1–4 h |

This slack is a planning reminder only. It cannot be used to validate a specific connection without external operational checks.

### 7.8 Departure-protection message

| Departure window | Output |
|---|---|
| `before_09` or `09_12` | `position_previous_night` |
| `12_15` | `previous_night_if_final_major_move_is_same_day` |
| `15_18` or `after_18` | `same_day_not_proven_verify_separately` |
| `unknown` | `assume_previous_night_until_departure_known` |

The message is intentionally cautious and does not examine actual trains or flights.

## 8. Overload rules

Evaluate all applicable codes; do not stop after the first.

When a trigger uses a ranged input or ratio, evaluate it conservatively with the highest feasible numerator and lowest feasible positive denominator. A code triggered only by an unknown-field extreme must remain accompanied by `UNKNOWN_INPUTS`; clients may describe it as a possible rather than confirmed overload.

| Code | Trigger | Minimum severity |
|---|---|---|
| `TOPOLOGY_OVERFLOW` | cross-city moves exceed calendar-day slots | critical |
| `NO_POSSIBLE_FULL_DAY` | `fullSightseeingDays.max === 0` | critical |
| `TRANSFER_TAX_EXHAUSTS_CAPACITY` | transfer-tax high bound is at least baseline-equivalent high bound | critical |
| `NO_GUARANTEED_FULL_DAY` | `fullSightseeingDays.min === 0` and at least two nights are possible | high |
| `TRANSFER_TAX_HIGH` | transfer-tax high / max(1, baseline high) is at least 0.35 | high |
| `CROSS_CITY_DENSITY_HIGH` | cross-city moves / max(1, nights) is greater than 0.50 | high |
| `TRANSFER_TAX_VISIBLE` | the same ratio is at least 0.20 but below 0.35 | medium |
| `HOTEL_CHURN` | additional hotel changes are at least 2, or hotel changes / max(1, nights) exceeds 0.60 | medium |
| `OUTPUT_RANGE_WIDE` | either headline range spans at least 2 days | medium |
| `UNKNOWN_INPUTS` | any input is `unknown` | medium |
| `HOTEL_CHANGE_COUNT_BELOW_CROSS_CITY` | known hotel changes are fewer than known cross-city moves | medium; asks whether moves are day trips or the count is incomplete |

Overall severity is the highest triggered severity. With no code, return `none`.

## 9. Confidence

- `high`: all inputs are known and neither headline range spans more than one day.
- `medium`: all inputs are known but placement produces a wider range, or only one non-count input is unknown.
- `low`: total nights or any count is unknown, pace is unknown, both edge windows are unknown, or output is invalid.

Confidence describes model precision, not trip quality.

## 10. Rounding and presentation

- Keep hour calculations at full precision internally.
- Full, fragment, unavailable and calendar-day ranges are integers.
- Display equivalent-day lower bounds rounded down to two decimals and upper bounds rounded up to two decimals.
- `suggestedBufferDays` uses 0.5-day increments.
- Never collapse a non-zero range to a single midpoint in primary output.
- Always show assumptions and unknown fields adjacent to the result.
- Label transfer tax as **estimated sightseeing capacity consumed**, not as literal train time.

## 11. Reference pseudocode

```text
validate(input)
domains = expandUnknowns(input)

if totalNights is unknown:
  status = insufficient_input

for each feasible nights, time-window, count and pace state:
  days = createDaySlots(nights + 1, arrivalWindow, departureWindow)
  extraHotels = max(0, hotelChanges - crossCityMoves)
  tax = buildEventTaxIntervals(crossCityMoves, transfers, extraHotels, pace)

  if crossCityMoves > days.length:
    recordTopologyOverflow()
    continue

  for each legal event placement (or equivalent DP state):
    remaining = subtractIntervals(days, tax)
    recordGuaranteedAndPossibleClassCounts(remaining)

aggregateMinAndMaxAcrossStates()
calculateEquivalentDayRanges()
calculateSuggestedBuffer()
calculateDepartureProtectionMessage()
evaluateAllOverloadCodes()
attachAssumptionsUnknownsAndConfidence()
roundForDisplay()
return output
```

## 12. Test specification

### 12.1 Test conventions

The table uses these abbreviations:

- arrival/departure: `B09`, `09-12`, `12-15`, `15-18`, `A18`, `U`;
- counts: `C` cross-city moves, `T` complex airport/station transfers, `H` hotel changes;
- pace: `F` fast, `B` balanced, `S` slow, `U` unknown;
- `full`, `frag` and `tax` are inclusive ranges;
- displayed tax uses conservative two-decimal outward rounding;
- buffer is in sightseeing-day equivalents.

Tests must also assert the standard assumption list, correct departure-protection message, status and confidence even when the compact table highlights only the differentiating fields.

| ID | Input | Expected headline output | Required alerts / notes |
|---|---|---|---|
| T01 | 3 nights; arrival B09; departure A18; C0 T0 H0; pace B | calendar `[4,4]`; full `[4,4]`; frag `[0,0]`; tax `[0,0]`; buffer `0` | severity none; high confidence |
| T02 | 3 nights; arrival A18; departure B09; C0 T0 H0; pace B | calendar `[4,4]`; full `[2,2]`; frag `[0,0]`; unavailable `[2,2]`; tax `[0,0]`; buffer `0` | departure `position_previous_night`; severity none |
| T03 | 5 nights; arrival 12-15; departure 15-18; C0 T0 H0; pace B | full `[4,5]`; frag `[1,2]`; tax `[0,0]`; buffer `0` | no overload; high confidence because each headline span is at most 1 |
| T04 | 5 nights; arrival A18; departure B09; C1 T0 H1; pace B | full `[3,4]`; frag `[0,1]`; tax `[0.50,0.63]`; buffer `1.0` | no hotel double-count; departure previous night |
| T05 | 5 nights; arrival A18; departure B09; C2 T0 H2; pace B | full `[2,4]`; frag `[0,2]`; tax `[1.00,1.25]`; buffer `1.0` | `TRANSFER_TAX_VISIBLE`, `OUTPUT_RANGE_WIDE`; medium confidence |
| T06 | 4 nights; arrival A18; departure B09; C1 T2 H1; pace B | full `[1,3]`; frag `[0,2]`; tax `[0.75,1.00]`; buffer `1.0` | `TRANSFER_TAX_VISIBLE`, `OUTPUT_RANGE_WIDE`; interchanges may overlap a move or consume another day |
| T07 | 4 nights; arrival A18; departure B09; C0 T0 H3; pace B | full `[2,3]`; frag `[0,1]`; tax `[0.28,0.38]`; buffer `1.0` | `HOTEL_CHURN`; all 3 changes are additional |
| T08 | 6 nights; arrival A18; departure B09; C3 T0 H3; pace S | full `[2,4]`; frag `[1,3]`; tax `[1.87,2.25]`; buffer `1.0` | `TRANSFER_TAX_HIGH`, `OUTPUT_RANGE_WIDE`; high overload severity and medium confidence |
| T09 | Same as T08 but pace F | full `[2,4]`; frag `[1,3]`; tax `[1.12,1.50]`; buffer `1.0` | `TRANSFER_TAX_VISIBLE`, `OUTPUT_RANGE_WIDE`; same placement range as T08 but lower tax |
| T10 | 3 nights; arrival U; departure U; C0 T0 H0; pace B | full `[2,4]`; frag `[0,2]`; tax `[0,0]`; buffer `0.5` | `UNKNOWN_INPUTS`, `OUTPUT_RANGE_WIDE`; low confidence because both edge windows are unknown |
| T11 | 3 nights; arrival A18; departure B09; C unknown; T0 H0; pace B | full `[0,2]`; frag `[0,2]`; tax `[0,1.88]`; buffer `3.0` | `UNKNOWN_INPUTS`, `NO_GUARANTEED_FULL_DAY`, `TRANSFER_TAX_HIGH`, `CROSS_CITY_DENSITY_HIGH`, `OUTPUT_RANGE_WIDE`; low confidence |
| T12 | nights unknown; arrival A18; departure B09; C0 T0 H0; pace B | status insufficient input; calendar `[2,31]`; full `[0,29]`; frag `[0,0]`; tax `[0,0]`; buffer `0.5` | `UNKNOWN_INPUTS`, `OUTPUT_RANGE_WIDE`; low confidence; client must request nights |
| T13 | 2 nights; arrival A18; departure B09; C4 T0 H4; pace B | status invalid; calendar `[3,3]`; full `[0,0]`; frag `[0,3]`; tax `[2.00,2.50]`; buffer `1.0` | `TOPOLOGY_OVERFLOW`, `NO_POSSIBLE_FULL_DAY`; critical |
| T14 | 1 night; arrival 09-12; departure 15-18; C0 T0 H0; pace B | calendar `[2,2]`; full `[0,2]`; frag `[0,2]`; tax `[0,0]`; buffer `0` | `OUTPUT_RANGE_WIDE`; shows why two edge-day intervals are not two promised sightseeing days |
| T15 | 10 nights; arrival A18; departure B09; C0 T0 H0; pace B | calendar `[11,11]`; full `[9,9]`; frag `[0,0]`; tax `[0,0]`; buffer `0` | no overload; verifies nights + 1 and nine interior days |
| T16 | 2 nights; arrival 12-15; departure 15-18; C0 T2 H0; pace B | full `[0,2]`; frag `[0,3]`; tax `[0.25,0.38]`; buffer `1.0` | `NO_GUARANTEED_FULL_DAY`, `OUTPUT_RANGE_WIDE`; high severity |
| T17 | 4 nights; arrival A18; departure B09; C2 T0 H1; pace B | full `[1,3]`; frag `[0,2]`; tax `[1.00,1.25]`; buffer `1.0` | `HOTEL_CHANGE_COUNT_BELOW_CROSS_CITY`, `TRANSFER_TAX_HIGH`, `OUTPUT_RANGE_WIDE`; do not create negative extra-hotel tax |
| T18 | 4 nights; arrival A18; departure B09; C3 T2 H3; pace S | full `[0,2]`; frag `[0,3]`; tax `[2.18,2.75]`; buffer `1.5` | `NO_GUARANTEED_FULL_DAY`, `TRANSFER_TAX_HIGH`, `CROSS_CITY_DENSITY_HIGH`, `OUTPUT_RANGE_WIDE`; high severity |
| T19 | `totalNights = -1`; all other values valid | status invalid; no scored result | validation code `COUNT_OUT_OF_RANGE`; no silent clamping |
| T20 | arrival value `late_morning`; all other values valid | status invalid; no scored result | validation code `UNSUPPORTED_TIME_WINDOW`; no fuzzy interpretation |

### 12.2 Property tests

In addition to the named scenarios, implementation tests must assert:

1. **Monotonic tax:** holding all other known inputs constant, adding an event cannot reduce either transfer-tax endpoint.
2. **Pace ordering:** for the same known event counts, fast tax ≤ balanced tax ≤ slow tax at both endpoints.
3. **No hotel double-count:** when `hotelChanges === crossCityMoves`, additional hotel-change tax is zero.
4. **Non-negative capacity:** usable hours and equivalent-day outputs never fall below zero.
5. **Calendar bound:** every full, fragment or unavailable endpoint is between zero and calendar-days high.
6. **Unknown containment:** the result for an unknown field must contain the result for every valid known value in that field's domain.
7. **No fake precision:** a non-zero raw interval must not be displayed as one midpoint.
8. **Determinism:** identical normalized inputs always produce byte-equivalent numeric and alert outputs.
9. **No network:** the calculation test must pass with network access disabled and no mocked transport response.
10. **No route payload:** output snapshots contain no city, attraction, hotel, train, flight or day-by-day recommendation fields.

## 13. Review questions before implementation

Reviewers should explicitly approve or change:

1. the six-hour full-day and two-hour fragment thresholds;
2. the five arrival/departure bands;
3. the three pace coefficient sets;
4. whether `airportStationTransfers` means only complex interchanges, as defined here;
5. the hotel-change double-count rule;
6. the uncapped buffer formula;
7. overload thresholds and wording; and
8. the requirement for separate product, commercial and indexing approval before any interface becomes public.

## 14. Acceptance criteria for this specification

- The seven requested inputs and five requested output groups are defined.
- Assumptions are explicit and mandatory in every result.
- Unknown inputs expand to conservative, finite ranges.
- No calculation depends on real-time transport data.
- No calculation produces a city order or executable itinerary.
- No public page, indexable URL pattern or city × nights × traveller taxonomy is created.
- At least 12 named scenarios are testable; this specification provides 20 plus 10 properties.
- The final document status is `SPEC REVIEW READY`, never `COPY READY` or `COPY DRAFT`.
