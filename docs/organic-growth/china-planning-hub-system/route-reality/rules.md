# Route Reality v2 rules

Status: **INTERNAL CONTRACT — NUMERIC POLICY PACK NOT APPROVED**

Model contract: `route-reality-v2.0.0-internal-draft`

## 1. Separation of contract and policy

This document freezes structural behaviour. It does not approve the numerical
values that turn a time band or event into usable hours. A later implementation
requires one separately reviewed, immutable `PolicyPack` containing:

- arrival and departure base-capacity intervals for every time window;
- interior-day base capacity;
- event-burden intervals for every event kind and pace;
- the equivalent-sightseeing-day divisor;
- full/fragment/unavailable hour thresholds;
- alert thresholds and severity mapping;
- buffer formula and rounding rule; and
- confidence thresholds.

The pack must have its own stable version. A calculation result must identify
both the model contract version and the approved policy-pack version. Until
that pack exists, this knowledge base supports validation, topology and
property tests only; no numeric output is authoritative. Values or coefficients
from the earlier draft are historical inputs to review, not defaults.

The current internal-draft schema therefore requires `policyPackVersion:null`
on both output arms. This is a deliberate implementation gate, not a valid
numeric policy identity. Approving a pack requires a schema/model-contract
version bump that replaces `null` with one exact, non-empty approved version;
an engine may not populate authoritative numeric outputs while retaining the
internal-draft contract.

## 2. Exact request contract

The request must be a non-null plain object whose prototype is `Object.prototype`
or `null`. Arrays, dates, maps, sets, class instances and boxed primitives fail
with `REQUEST_NOT_PLAIN_OBJECT`.

It must contain exactly these seven own enumerable keys:

1. `totalNights`
2. `arrivalWindow`
3. `departureWindow`
4. `crossCityMoves`
5. `airportStationTransfers`
6. `hotelChanges`
7. `travellerPace`

No key is trimmed, case-folded, aliased or inferred. Missing keys produce
`MISSING_FIELD`. Unknown keys produce one `EXTRA_FIELD` error each, represented
with field `$request`; the unexpected key may be attached only to an internal
test diagnostic and must not expand the public result shape.

### 2.1 Scalar domains

| Field | Accepted known domain | Unknown literal |
|---|---|---|
| `totalNights` | integer `1..30` | exact string `unknown` |
| `arrivalWindow` | `before_09`, `09_12`, `12_15`, `15_18`, `after_18` | exact string `unknown` |
| `departureWindow` | same five values | exact string `unknown` |
| `crossCityMoves` | integer `0..30`, subject to relational validation | exact string `unknown` |
| `airportStationTransfers` | integer `0..30`, subject to relational validation | exact string `unknown` |
| `hotelChanges` | integer `0..30`, subject to relational validation | exact string `unknown` |
| `travellerPace` | `fast`, `balanced`, `slow` | exact string `unknown` |

For count fields, booleans, numeric strings, decimals, `NaN`, positive or
negative infinity, arrays, objects and `null` produce `COUNT_NOT_INTEGER`.
Integers outside the scalar domain produce `COUNT_OUT_OF_RANGE`. Enum values
outside their exact closed set, including whitespace or case variants, produce
`UNSUPPORTED_TIME_WINDOW` or `UNSUPPORTED_PACE`.

### 2.2 Multi-error behaviour and stable order

Validation returns every independently detectable structural/scalar error. It
does not stop at the first field. Errors use this order:

1. `$request` container error;
2. field errors in the seven-key order above;
3. extra-key errors sorted by Unicode code-point order;
4. `RELATIONAL_COUNT_CONFLICT` in field order;
5. `EVENT_TOPOLOGY_OVERFLOW` in field order.

For one field, use only the most specific first applicable scalar error:
missing, then wrong type, then out of range/unsupported enum. Relational and
topology checks run only if every involved value is either valid-known or the
literal `unknown`. Invalid output has `result: null`, no alerts and no partial
score.

## 3. Count semantics

### 3.1 `totalNights`

`N` nights create `N + 1` calendar-day slots indexed `0..N`. The model does not
interpret nights as 24-hour periods.

### 3.2 `crossCityMoves`

`crossCityMoves` (`C`) counts **distinct transition days that change an already
established overnight base from one city/base to another**. It counts days, not
individual train or flight legs.

Count it when all are true:

- the traveller begins with an established overnight base;
- the destination is a different city or distant overnight base;
- the overnight base after that day differs from the one before it; and
- the day has not already been counted as another cross-city move day.

Do not count:

- an out-and-back day trip that returns to the same overnight base;
- an ordinary ride between a hotel and its airport or station;
- an international arrival or departure merely because it crosses a boundary;
- multiple legs on one relocation day as multiple moves; or
- a same-base hotel switch.

The v2 model represents at most one cross-city base-change event on a
transition day. A route with two overnight-base changes on one calendar day is
outside the model and must not be silently compressed.

### 3.3 `hotelChanges`

`hotelChanges` (`H`) counts **additional accommodation-change days not already
represented by `crossCityMoves`**. It covers a same-city hotel switch or another
extra switch while the overnight city/base remains the same.

The ordinary checkout and check-in involved in a counted cross-city move are
already part of that move's burden and must not be entered again as a hotel
change. Therefore no subtraction such as `max(0, H - C)` is permitted: `H` is
already the non-overlapping count.

The v2 model represents at most one additional hotel-change event on a
transition day. If a raw itinerary changes accommodation twice on one day, the
seven-field model cannot represent it faithfully and must be escalated outside
this model.

### 3.4 `airportStationTransfers`

`airportStationTransfers` (`T`) counts distinct calendar days containing one
complex hub-to-hub interchange beyond ordinary first/last-mile access. Positive
examples include airport-to-airport, airport-to-rail-station, or a transfer
between non-colocated rail terminals when the traveller must make the
connection independently. Negative examples include a routine airport-to-hotel
ride, hotel-to-station ride, a platform change within one station, or every taxi
segment in a longer chain.

It counts affected days, not vehicles or legs. At most one complex-interchange
event is representable per calendar day. It may share a day with one
accommodation-change event, because those burdens are separate, but it may not
be stacked with another complex interchange in v2.

### 3.5 Six counting examples

| Route fact | `C` | `T` | `H` | Why |
|---|---:|---:|---:|---|
| Sleep in Base A, take a day trip to B, return to A | 0 | 0 unless there is a qualifying hub interchange | 0 | No overnight-base change. |
| Sleep in A, relocate by one direct train, sleep in B | 1 | 0 | 0 | One base-change day; its normal checkout/check-in is included. |
| Sleep in A, change trains inside one station, sleep in B | 1 | 0 | 0 | The platform change is not a separate complex hub transfer. |
| Sleep in A, go airport → separate rail station → B, sleep in B | 1 | 1 | 0 | One base-change day plus one qualifying interchange on that day. |
| Stay in the same city but move from Hotel X to Hotel Y | 0 | 0 | 1 | Extra accommodation change without a cross-city base change. |
| Relocate A → B and later switch hotels within B | 1 | 0 | 1 | Two distinct transition days; no overlap or subtraction. |
| Sleep in A, check into B, then check out and change accommodation again before sleeping in C on the same day | unsupported | count only if one qualifying interchange also occurred | unsupported | More than one accommodation-change event on one day exceeds v2 event capacity. |
| Arrive at an international gateway and take a routine car to the first hotel | 0 | 0 | 0 | Broad arrival capacity covers ordinary edge access. |

## 4. Relational domains and topology

For one concrete state with known `N`, `C`, `T` and `H`:

```text
calendarDays = N + 1
transitionDays = max(0, N - 1)
0 <= C <= transitionDays
0 <= H <= transitionDays - C
0 <= T <= min(30, calendarDays)
```

Accommodation-change events (`C + H`) occupy distinct transition-day slots
`1..N-1`. A slot may contain either one cross-city event or one additional
hotel-change event, never both. Complex-interchange events occupy distinct
calendar-day slots `0..N`; one may share a slot with one accommodation event.

These rules are the v2 topology. They remove unlimited same-day stacking and
make every validation-valid concrete count tuple placeable. A known tuple that
violates `C + H <= N - 1` returns `RELATIONAL_COUNT_CONFLICT`; a known `T` above
the available calendar-day slots returns `EVENT_TOPOLOGY_OVERFLOW`. A future
richer input representation that supplies an explicit event layout could find
other layout overflows, but the current seven-field request has no layout field
and must not invent one.

The model intentionally does not represent a cross-city gateway-to-first-base
leg before the first overnight base is established, a last-base-to-gateway leg
after the final night, two same-kind events on one day, or a day-trip journey.
Those are coverage limitations, not permission to reinterpret the inputs.

## 5. Correlated unknown expansion

Unknown values are never turned into independent min/max endpoints. Expand
joint feasible concrete tuples in this order:

```text
for each N in domain(totalNights):
  for each C in domain(crossCityMoves) where C <= N - 1:
    for each H in domain(hotelChanges) where C + H <= N - 1:
      for each T in domain(airportStationTransfers)
          where T <= min(30, N + 1):
        for each arrival in concreteDomain(arrivalWindow):
          for each departure in concreteDomain(departureWindow):
            for each pace in concreteDomain(travellerPace):
              evaluate concrete state and all feasible placements
```

An exact known value has a one-member domain. `unknown` expands to the full
scalar domain, then the relational predicates filter it inside the same tuple.
Endpoint arithmetic across independently expanded ranges is prohibited.

If known fields plus unknown fields yield no feasible concrete tuple, return
`invalid` with the applicable relational/topology error. If at least one tuple
is feasible, keep only feasible tuples, add
`UNKNOWN_DOMAIN_RELATIONALLY_FILTERED`, and return `insufficient_input`. This
rule allows a known `C=29` with unknown nights to mean only the feasible
30-night state; it does not pretend that `C=29` is valid for a shorter trip.

An implementation may use dynamic programming, symmetry reduction or another
equivalent method. It must have an exhaustive reference oracle for bounded
test domains and prove output equivalence. It must not truncate an unknown
domain, sample placements or silently discard a feasible extreme for speed.

## 6. Placement and capacity calculation

The following rules apply only after central approves a complete `PolicyPack`.

### 6.1 Build base slots

Create `N + 1` slots. Slot `0` takes the selected arrival-capacity interval;
slot `N` takes the selected departure-capacity interval; interior slots take
the policy's interior capacity. The pack must define how a one-night trip
combines arrival and departure constraints without double-counting the shared
calendar structure.

### 6.2 Place events

Enumerate every placement consistent with section 4. Each concrete placement
has a deterministic tie-break/canonical order for serialization, but output
aggregation must not depend on that order. When two permitted event kinds share
a day, sum their concrete burdens before clamping against that day's remaining
capacity.

### 6.3 Keep three quantities separate

For one concrete state and placement, using hours internally:

```text
grossBurdenHours = sum(all event burden hours)
remainingHours[d] = max(0, baseHours[d] - eventBurdenHours[d])
appliedTaxHours = sum(baseHours[d] - remainingHours[d])
baselineHours = sum(baseHours[d])
netHours = sum(remainingHours[d])
```

Required identities:

```text
grossBurdenHours >= appliedTaxHours >= 0
baselineHours >= appliedTaxHours
netHours = baselineHours - appliedTaxHours
netHours >= 0
```

Gross burden is a pressure metric and may exceed baseline. Applied transfer tax
is the capacity actually removed after placement and clamping. Net capacity is
placement-derived; it must never be calculated as baseline minus gross burden.
Equivalent-day values divide the hour quantities by the approved policy's
single divisor and use its approved canonical rounding. Negative zero must be
normalized to zero.

Arrival/departure capacity already includes broad ordinary edge formalities and
normal first/last-mile access. Those burdens are not added again as transfer
events. None of these estimates is a live journey duration or connection
guarantee.

## 7. Joint day classification

For each concrete day in each concrete placement, apply the policy pack's
approved thresholds once and assign exactly one class:

- full sightseeing day;
- fragment day; or
- unavailable day.

For every joint tuple:

```text
fullSightseeingDays + fragmentDays + unavailableDays = calendarDays
```

Deduplicate identical joint tuples, sort by `calendarDays`, then full ascending,
fragment ascending and unavailable ascending, and return the complete feasible
set or a formally lossless compressed representation approved in technical
review.

Marginal min/max ranges may be derived for display, but they must carry
`nonAdditive: true`. Clients must not add their endpoints. The joint tuples are
the reconciliation source of truth. `fragmentDays` is not monotonic: a full day
can become a fragment and later unavailable.

## 8. Result union, unknowns and decision usefulness

Invalid input returns only:

```text
status = invalid
decisionUseful = false
errors = ordered closed-code errors
result = null
```

A fully known valid input returns `status: ok`. A valid request containing any
`unknown` returns `status: insufficient_input` and lists unknown fields in the
seven-field input order.

`decisionUseful` is always `false` when `totalNights` is unknown. It may be true
for a partially unknown request only after a product decision defines the
minimum required known fields and is backed by golden tests. Until then the
conservative default for every `insufficient_input` result is `false`.

For all-unknown input:

- status is `insufficient_input`;
- confidence is `low`;
- `decisionUseful` is `false`;
- the numeric envelope, if an approved implementation later returns one, comes
  only from correlated feasible tuples;
- `suggestedBufferDays` is `null`; and
- `bufferActionable` is `false`.

## 9. Alerts

The closed alert-code order is:

1. `NO_GUARANTEED_FULL_DAY`
2. `TRANSFER_TAX_EXHAUSTS_CAPACITY`
3. `TRANSFER_TAX_HIGH`
4. `TRANSFER_TAX_VISIBLE`
5. `CROSS_CITY_DENSITY_HIGH`
6. `HOTEL_CHURN_HIGH`
7. `COMPLEX_INTERCHANGE_HIGH`
8. `OUTPUT_RANGE_WIDE`

Central must approve exact triggers and severity mapping in the policy pack.
Until that happens, examples may assert alert-basis properties but not numeric
threshold outcomes.

For an input with unknowns, evaluate a code over the complete feasible concrete
state and placement set:

- `confirmed` only if its trigger holds in every relevant feasible state;
- `possible_unknown_extreme` if it holds in at least one but not every relevant
  feasible state; and
- omit it if it holds in none.

For fully known input, every emitted alert has `basis: confirmed`. Deduplicate by
code. If multiple witnesses imply different severities for one code, keep the
highest severity under the approved precedence `critical > high > notice`, then
serialize in the closed code order. Rendering must explicitly label possible
unknown extremes; it must never convert them into confirmed verdicts.

Invalid input short-circuits scoring and returns no alerts. This resolves the
old invalid-case ambiguity: validation errors never coexist with selected tax,
classification or overload outputs.

## 10. Assumptions, localization and canonical output

The core returns stable assumption IDs, never localized prose. IDs appear in
the schema's enumeration and in this canonical order:

1. `NIGHTS_CREATE_N_PLUS_ONE_CALENDAR_DAYS`
2. `EDGE_WINDOWS_ARE_BROAD_CAPACITY_BANDS`
3. `ORDINARY_EDGE_ACCESS_NOT_SEPARATE_TRANSFER`
4. `CROSS_CITY_COUNTS_OVERNIGHT_BASE_CHANGE_DAYS`
5. `DAY_TRIPS_EXCLUDED_FROM_CROSS_CITY_MOVES`
6. `HOTEL_CHANGES_EXCLUDE_CROSS_CITY_BASE_CHANGES`
7. `ONE_ACCOMMODATION_CHANGE_EVENT_PER_TRANSITION_DAY`
8. `ONE_COMPLEX_INTERCHANGE_PER_CALENDAR_DAY`
9. `EVENT_PLACEMENT_UNKNOWN`
10. `MARGINAL_CLASSIFICATION_RANGES_ARE_NON_ADDITIVE`
11. `TRANSFER_BURDEN_IS_NOT_LIVE_JOURNEY_TIME`
12. `BUFFER_IS_NOT_CONNECTION_PROTECTION`
13. `UNKNOWN_DOMAIN_RELATIONALLY_FILTERED` when applicable
14. `NUMERIC_POLICY_PACK_PENDING_APPROVAL` while this draft status remains

EN/ZH/KO strings live outside the calculation core and require separate
translation QA. Unknown fields follow the seven-field input order. Alerts and
errors follow their closed orders. Object keys follow the schema order.

Canonical numbers must be finite JSON numbers, normalized to positive zero,
rounded exactly once at the approved display boundary and serialized without
locale formatting. Equivalent normalized input and model/policy versions must
produce byte-equivalent canonical output.

## 11. Buffer boundary

The buffer is unallocated sightseeing capacity, not minutes around a train or
flight. It cannot certify a connection, compensate for an invalid topology or
replace current transport verification.

No buffer formula is approved in this package. A later policy must return
`suggestedBufferDays: null` and `bufferActionable: false` whenever
`totalNights` is unknown. It must also prevent a suggested allocation larger
than the known trip envelope. Any larger uncertainty measure must be labelled a
non-actionable diagnostic and must not occupy the suggestion field.

## 12. Privacy, network, storage and indexing invariants

The core accepts only the seven scalar enum/integer fields. It rejects and must
not solicit city, date, name, email, phone, account ID, IP-derived location,
passport data, health data, free text or exact flight/train/hotel details.

`travellerPace` is a self-selected arithmetic setting. The system must not infer
age, disability, health, family status, pregnancy or any other sensitive trait
from it, and must not enrich it with external data.

The calculation is a pure offline function. Acceptance harnesses must disable
and trap `fetch`, XHR, WebSocket, HTTP clients, DNS and network modules and
assert zero attempts. Inputs and outputs must not be persisted or copied into
logs, analytics, telemetry, sessions, cookies, local storage, crash payloads or
URL parameters.

No input state may become a path, query string, canonical variant, metadata
variant, schema item, sitemap entry or generated page. No public component,
endpoint or indexable combination is authorized. A later public proposal needs
new central product, search, privacy, accessibility, security and commercial
review.

## 13. Explicit non-outputs

The result must contain no:

- city name or city order;
- attraction, hotel, station, airport, train or flight recommendation;
- day-by-day schedule;
- timetable, inventory, fare, price or connection claim;
- statement that a route is approved, safe, good or bad;
- recommendation, preselection or qualification for any paid service; or
- personal or inferred traveller attribute.
