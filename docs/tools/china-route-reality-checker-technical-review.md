# China Route Reality Checker Technical Review

Status: **TECHNICAL REVIEW READY — BLOCKING SPEC REVISIONS REQUIRED**

Reviewer: Homeground worker 8 (technical feasibility and test review)

Review dates: 2026-08-14; revalidated 2026-08-20 and 2026-08-21

Specification source: `origin/article/worker-4-route-reality-checker-spec@1e131ff990b88c3759fb3d102f23e55aa8bbd0b0`

Original review base: `origin/main@6e49cf962453c4d8e2997ac0fda28d23fe6c5039`

Current integration base: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`

## 0. 2026-08-20 revalidation

The source specification commit is unchanged and B01–B10 remain blocking.
The three internal review artifacts were brought onto the current integration
base without importing worker 4's branch or creating a public route. The
counterexample witness was rerun on 2026-08-20: **11/11 tests passed**. Those
tests prove that the contradictions and safety invariants are reproducible;
they do not convert the witness into a compliant engine and do not authorize a
public implementation.

## 1. Decision

| Decision | Result |
|---|---|
| specification technically feasible | **no — not as currently written; the underlying bounded model is feasible after the blocking revisions below** |
| test model sufficient | **no** |
| blocking defects | **yes — B01 through B10** |
| required spec revisions | **R01 through R12** |
| public implementation authorized | **false** |
| indexable page authorized | **false** |

This review does not approve a public tool, page, API, route, data store,
registry entry, sitemap entry, metadata, schema markup, deployment or commercial
journey. It does not modify worker 4's source branch.

The seven-input capacity-model direction is implementable. The current text is
not yet an implementable contract because multiple valid implementations would
produce materially different results, and several named expected results
contradict the formulas that are meant to generate them.

## 2. Review method and evidence boundary

The specification was read with:

```text
git show origin/article/worker-4-route-reality-checker-spec:docs/tools/china-route-reality-checker-spec.md
```

The source branch was not checked out, merged or copied over `origin/main`.
Repository product-boundary evidence was checked against:

- `docs/paid-service-pathways-spec.md`;
- `docs/organic-growth/do-not-repeat.md`;
- `docs/organic-growth/search-map.json`;
- `docs/organic-growth/weekly-brief-2026-08-11.md`;
- the published `is-your-china-itinerary-too-rushed` implementation and tests.

An internal review witness was added at
`tools/internal/route-reality-checker-spec-audit.mjs`. It is deliberately not a
product implementation. It reproduces safe arithmetic and counterexamples only.
It has no browser, network, storage, route generation or public import surface.

## 3. Seven-input contract review

| Input | Finite and mechanically verifiable? | Current problem | Required disposition |
|---|---|---|---|
| `totalNights` | Partly | Section 3 says 1–30, but section 4.1 says all known counts are 0–30. | Make this an integer-only 1–30 field. Zero must be invalid. |
| `arrivalWindow` | Yes | The five values and `unknown` are bounded. Missing, null, case changes, whitespace and extra enum values are not specified. | Reject every value outside the exact closed enum. Do not fuzzy-normalize. |
| `departureWindow` | Yes | Same validation gap as arrival. | Same exact-enum rule. |
| `crossCityMoves` | No, semantically | It alternates between a movement, an overnight-base change and a possible day trip. Yet every event is put on a distinct day and is said to include checkout/check-in. | Choose one V1 meaning. Recommended: count cross-city **move days**, not legs, and remove the claim that every event necessarily includes checkout/check-in; otherwise use overnight-base relocations and reject incompatible hotel counts. |
| `airportStationTransfers` | Partly | `complex` is subjective; known 0–30 is accepted while unknown may expand only to 0–2. Thirty events may be stacked on one day. | Add a decision table with positive/negative examples and a relational upper bound or event-topology rule. |
| `hotelChanges` | No, relationally | It includes cross-city changes, but subtracting all cross-city moves is wrong when some moves are day trips. Known 0–30 conflicts with unknown `0..nights-1`. | Prefer renaming to `additionalHotelChanges` (already excluding cross-city/base moves), or add a field that identifies which moves cause a hotel change. Do not infer the overlap from two totals. |
| `travellerPace` | Yes as an enum | The enum is finite, but the description lists children, age, mobility and recovery. The engine must not infer any of those traits from `slow`. | Keep only the pace enum in calculation and prohibit sensitive-trait inference, logging and enrichment. |

The request must be a plain object with exactly these seven keys. The revised
specification must explicitly reject missing or extra keys, `null`, booleans,
arrays, objects, numeric strings, `NaN`, `Infinity`, `-Infinity`, decimals and
out-of-range integers. If more than one field is invalid, return all errors in a
fixed field order or one stable first error; the choice must be specified and
tested.

## 4. Blocking defects

### B01 — Known domains, unknown domains and cross-field validity disagree

Examples:

- Known `airportStationTransfers = 30` passes section 4.1, but when
  `crossCityMoves = 0`, unknown transfers expand only to `0..2`.
- Known `hotelChanges = 30` passes section 4.1, but with three nights, unknown
  hotel changes expand only to `0..2`.
- A known cross-city count can reach the number of calendar slots before
  topology overflow, while unknown cross-city moves stop at `totalNights`.

Therefore the `unknown containment` property cannot pass. Relational validity
must be part of validation, or unknown must contain every validation-valid known
value.

### B02 — Unknown interval arithmetic combines mutually impossible states

The current endpoint formula can combine:

```text
crossCityMoves.max = 30
airportStationTransfers.max = 30
additionalHotelChanges.max = hotelChanges.max - crossCityMoves.min = 29
```

That produces `283.5` gross tax hours. No single allowed `(nights, moves,
transfers, hotels, pace)` tuple has both 30 cross-city moves and 29 additional
hotel changes. Nested, correlated enumeration under the intended domains has a
240-hour upper witness instead.

Unknown domains must be expanded as joint feasible tuples. Independent interval
endpoints must never be multiplied across correlated fields.

### B03 — Cross-city and hotel-change semantics cannot support the subtraction

The spec permits `hotelChanges < crossCityMoves` as a possible day-trip signal,
but also assumes every cross-city move includes one checkout/check-in burden.
If three cross-city events are day trips and the traveller makes three unrelated
hotel changes, `max(0, H - C)` incorrectly erases all hotel tax.

The input model must choose a stable overlap representation before formulas or
tests can be frozen.

### B04 — Full, fragment and unavailable output ranges do not reconcile

T14 is the smallest counterexample:

```text
calendarDays = [2, 2]
fullSightseeingDays = [0, 2]
fragmentDays = [0, 2]
unavailableDays = [0, 0]
```

The minimum endpoints sum to zero and the maximum endpoints sum to four, not
two. Each `[4, 6]` edge day is simultaneously `possibly full` and `possibly
fragment`. This contradicts the claim that unavailable days are returned for
reconciliation.

Every concrete state and placement must yield exactly one class per day and
must satisfy:

```text
full + fragment + unavailable = calendarDays
```

If marginal ranges remain in the public contract, they must be labelled as
non-additive. If reconciliation is required, return the feasible joint tuples
or a small set of correlated scenarios.

### B05 — Gross transfer burden is incorrectly treated as consumed capacity

T04 has four interior eight-hour days and two zero-hour edge days. A balanced
cross-city event has a four-to-five-hour burden.

- Put the event on an interior day: placement net is `3.375..3.5` days.
- Put the same event on a zero-hour arrival day, which section 7.4 permits:
  placement net remains `4..4` days.
- The current global formula always returns `3.375..3.5` days.

The fixed `baseline - gross tax` formula therefore disagrees with the placement
model and double-deducts a burden placed where no sightseeing capacity existed.
Raw burden may also exceed baseline, so it cannot be labelled capacity consumed.

The revised model needs separate values:

```text
grossTransferBurdenEquivalentDays  // may exceed baseline; pressure metric
netSightseeingEquivalentDays       // sum of clamped remaining hours per placement
appliedTransferTaxEquivalentDays   // baseline - placement net; never above baseline
```

### B06 — Unlimited same-day stacking creates misleading best cases

Complex interchanges and additional hotel changes may all share one day. With
three nights, late arrival, early departure and 30 balanced interchanges, the
spec allows every interchange to be stacked on the zero-hour arrival day. The
headline still has two full days even though gross burden is `3.75..5.625`
equivalent days against a two-day baseline.

Define per-day event capacity, sharing limits and overflow/carry behaviour, or
return a stable `EVENT_TOPOLOGY_OVERFLOW` diagnostic. `Clamp at zero` is not a
definition of physical feasibility.

### B07 — Invalid output cannot be represented by the output contract

The current interface requires every numeric field. T19 and T20 require
`invalid`, no scored result and a validation code, but no validation-error field
exists. T13 also uses `invalid` while still returning selected ranges and tax.

Use a discriminated union. For example:

```ts
type ValidationCode =
  | "MISSING_FIELD"
  | "EXTRA_FIELD"
  | "COUNT_NOT_INTEGER"
  | "COUNT_OUT_OF_RANGE"
  | "UNSUPPORTED_TIME_WINDOW"
  | "UNSUPPORTED_PACE"
  | "RELATIONAL_COUNT_CONFLICT"
  | "TOPOLOGY_OVERFLOW";

type RouteRealityResult =
  | {
      status: "invalid";
      modelVersion: string;
      errors: Array<{ field: RouteRealityField; code: ValidationCode }>;
      result: null;
    }
  | {
      status: "ok" | "insufficient_input";
      modelVersion: string;
      decisionUseful: boolean;
      result: ScoredRouteRealityResult;
    };
```

The spec must say that validation errors take precedence over insufficient
input and must define how ranged states that mix valid and invalid combinations
are handled.

### B08 — Unknown extremes can be presented as confirmed overloads

Overload rules use the highest feasible numerator and lowest positive
denominator. An all-unknown request can therefore receive high or critical
codes caused only by an extreme hypothetical state. A sentence saying clients
"may" call this possible is not a machine-safe contract.

Return alert basis explicitly:

```ts
type AlertBasis = "confirmed" | "possible_unknown_extreme";
type Alert = { code: OverloadCode; severity: OverloadSeverity; basis: AlertBasis };
```

Alternatively return separate confirmed and possible severities. A
possible-only critical alert must never be rendered as a confirmed critical
trip verdict.

### B09 — Reason codes, assumptions and output order are not stable enough

`codes: string[]` is open-ended. Validation codes are mentioned only in tests.
Assumptions are localized prose strings. Code order, deduplication, unknown-field
order, negative zero handling and canonical serialization are unspecified.

Define closed literal unions, one canonical code order, fixed field order,
stable assumption IDs and a separate EN/ZH/KO localization dictionary. The
calculation core must return codes, not translated prose. Determinism applies to
the entire normalized output, not only numeric and alert fields.

### B10 — The all-unknown buffer is not an executable suggestion

Under a correlated interpretation, the internal witness obtains a 240-hour
gross-tax upper bound and a 32-day buffer. That is still larger than the maximum
31-calendar-day envelope. The current independent endpoint method is wider
again.

For `totalNights = unknown`, return `decisionUseful: false`; either set
`suggestedBufferDays` to `null` or label it as a non-actionable uncertainty
diagnostic. A buffer larger than the trip cannot be presented as a suggested
allocation.

This is separate from connection safety. The existing statement that buffer
and per-move slack do not prove a connection is correct and must remain.

## 5. Required specification revisions

R01. Replace the generic count rule with strict field-by-field validation and
define missing, extra, wrong-type and multi-error behaviour.

R02. Choose one unambiguous cross-city unit and one unambiguous hotel-overlap
model. Add at least six positive/negative counting examples.

R03. Make every relational upper bound a true validation constraint, or expand
unknown across every otherwise valid known value. Do not mix the two models.

R04. Expand unknowns in nested correlated order:

```text
for each nights n
  for each cross-city state c valid for n
    for each interchange state t valid for (n, c)
      for each hotel state h valid for (n, c)
        extraHotels = overlapRule(h, c) in this same tuple
        for each pace and edge-window enum
          evaluate this concrete state
```

R05. Define feasible event placement, per-day sharing limits and event overflow.

R06. Aggregate concrete, mutually exclusive `(full, fragment, unavailable)`
tuples. Keep marginal ranges only with a prominent non-additivity rule.

R07. Calculate net from clamped placement remaining hours; split gross burden,
applied tax and net capacity.

R08. Replace the output interface with a discriminated valid/invalid union and
closed validation codes.

R09. Add alert basis (`confirmed` versus `possible_unknown_extreme`), exact
severity precedence, fixed code order and deduplication.

R10. Return stable assumption IDs and unknown field keys from the core; localize
outside the engine. Add `modelVersion` and canonical numeric serialization.

R11. Make all-unknown output explicitly non-actionable and prevent buffer from
being mistaken for an executable allocation or connection guarantee.

R12. Correct the named tests. At minimum:

- T12 also triggers `NO_GUARANTEED_FULL_DAY` under the current trigger wording,
  unless the trigger is revised to require a guaranteed two-night minimum.
- T13 either short-circuits all derived alerts by an explicit invalid rule, or
  also triggers `TRANSFER_TAX_EXHAUSTS_CAPACITY`,
  `NO_GUARANTEED_FULL_DAY`, `TRANSFER_TAX_HIGH`,
  `CROSS_CITY_DENSITY_HIGH` and `OUTPUT_RANGE_WIDE`.
- T14 confidence is `medium`, not high, because both headline ranges span two.
- T19/T20 require the new invalid-result union.
- `TRANSFER_TAX_EXHAUSTS_CAPACITY` must require positive burden; `0 >= 0`
  cannot trigger it.

## 6. Test matrix and expected results

`EXECUTED-WITNESS` means the internal audit fixture ran the stated arithmetic
or counterexample. `BLOCKED-ACCEPTANCE` means no compliant engine exists and the
specification does not yet determine one exact result. No blocked row is claimed
as passed.

| ID | Required group | Input / property | Expected result after revision | Current review status |
|---|---|---|---|---|
| M01 | 1 night, 0 moves | 1 night; A18/B09; C0 T0 H0; balanced | calendar `[2,2]`; full `[0,0]`; fragment `[0,0]`; unavailable `[2,2]`; baseline/net/tax `[0,0]`; buffer `0`; no tax-exhaustion alert | EXECUTED-WITNESS |
| M02 | 30-night boundary | 30 nights; A18/B09; C0 T0 H0; balanced | calendar `[31,31]`; full `[29,29]`; fragment `[0,0]`; unavailable `[2,2]`; baseline/net `[29,29]`; tax `[0,0]` | EXECUTED-WITNESS |
| M03 | all unknown | Every field is `unknown` | `insufficient_input`, low confidence, `decisionUseful:false`; finite correlated envelope; no possible-only alert rendered as confirmed; buffer null/non-actionable | BLOCKED-ACCEPTANCE |
| M04 | late arrival + early departure | 3 nights; A18/B09; C0 T0 H0; balanced | calendar `[4,4]`; full `[2,2]`; fragment `[0,0]`; unavailable `[2,2]`; baseline/net `[2,2]`; tax `[0,0]` | EXECUTED-WITNESS |
| M05 | 0/1 cross-city move | T04 placement on interior versus zero-hour edge | gross tax identical `[0.50,0.625]`; interior net `[3.375,3.5]`; edge net `[4,4]`; aggregate net must contain both | EXECUTED-WITNESS; current formula fails |
| M06 | high cross-city count | Last legal count and first illegal count | Last legal count must be defined by chosen move semantics; first count above legal calendar topology returns only stable invalid/topology diagnostics | BLOCKED-ACCEPTANCE |
| M07 | slow traveller | Same known route at fast, balanced, slow | gross tax endpoints nondecreasing; net and full endpoints nonincreasing; equality is allowed | Partly EXECUTED-WITNESS; full engine blocked |
| M08 | multiple hotel changes | Fixed nights/C/T/pace; increase H one at a time | gross/applied tax never falls; net/full never rises; overlap is calculated from actual joint state | Partly EXECUTED-WITNESS; overlap semantics blocked |
| M09 | moves exceed calendar capacity | C greater than legal distinct move-day capacity | `invalid`; ordered topology validation code; no scored sightseeing promise | BLOCKED-ACCEPTANCE |
| M10 | extreme counts | Legal maximum T/H and high burden | raw burden may exceed baseline; applied tax never exceeds baseline; net never below zero; event overflow cannot be hidden by stacking | EXECUTED-WITNESS for stacking defect; exact engine blocked |
| M11 | invalid numeric forms | 0/31 nights; -1/31 counts; decimal, NaN, infinities, numeric string, null, missing, array, object | deterministic invalid result with field and closed validation code; no silent clamping | BLOCKED-ACCEPTANCE |
| M12 | invalid enums | Misspelling, wrong case, whitespace, null/object for each window and pace | deterministic invalid result; no fuzzy interpretation | BLOCKED-ACCEPTANCE |
| M13 | non-negative numbers | All valid concrete states | remaining/net/applied tax/buffer never negative; no `-0`; gross tax nonnegative | Partly EXECUTED-WITNESS |
| M14 | day reconciliation | Every concrete state and placement | exactly one class per day and `F + G + U = calendar`; marginal endpoints never presented as additive | EXECUTED-WITNESS exposes current T14 failure |
| M15 | cross-city monotonicity | Increase C with all other known inputs fixed | gross/applied tax endpoints do not fall; net/full endpoints do not rise | BLOCKED-ACCEPTANCE pending count semantics |
| M16 | arrival monotonicity | B09 → 09-12 → 12-15 → 15-18 → A18 | baseline/net/full endpoints do not rise as arrival gets later | Base capacity EXECUTED-WITNESS; full engine blocked |
| M17 | departure monotonicity | A18 → 15-18 → 12-15 → 09-12 → B09 | baseline/net/full endpoints do not rise as departure gets earlier | Base capacity EXECUTED-WITNESS; full engine blocked |
| M18 | pace monotonicity | fast → balanced → slow | gross/applied tax endpoints do not fall; net/full endpoints do not rise | Gross tax EXECUTED-WITNESS; full engine blocked |
| M19 | hotel-change monotonicity | Increase additional H with fixed route state | gross/applied tax endpoints do not fall; net/full endpoints do not rise | Gross tax EXECUTED-WITNESS; full engine blocked |
| M20 | unknown containment | Replace each field individually with unknown | result contains every valid known result in the same relational domain | BLOCKED-ACCEPTANCE; current domains fail by construction |
| M21 | determinism | Same normalized input repeated and cloned | complete canonical output byte-equivalent, including ordered alerts, unknowns and assumption IDs | Audit snapshot EXECUTED-WITNESS; output contract blocked |
| M22 | reason thresholds | Ratios just below, exactly at and just above 0.20/0.35/0.50/0.60 | exact ordered unique codes and specified inclusive/exclusive behaviour; confirmed/possible basis stable | BLOCKED-ACCEPTANCE |
| M23 | no network | Run with fetch/XHR/WebSocket/http/net disabled | identical result and zero attempted calls | Audit witness static check EXECUTED; future engine blocked |
| M24 | no route or personal payload | Snapshot every result shape | no city, attraction, hotel, train, flight, date, contact, free text, service recommendation or day-by-day fields | Audit witness EXECUTED; future engine blocked |
| M25 | no public/index surface | Static repository boundary | no import from app/API/public/registry/sitemap/metadata/schema; no crawlable state URLs | PASS for this three-file review branch; public authorization remains false |

Do not assert that `fragmentDays` is monotonic. A full day can legitimately
degrade into a fragment before becoming unavailable, so fragment count may rise
and later fall. The monotonic requirements apply to tax, net capacity and full
capacity; unavailable capacity should move in the opposite direction when a
joint classification is used.

## 7. Named-case review

The headline arithmetic in T01–T11 and T14–T18 is mostly reproducible under the
current marginal-range algorithm. This does not prove the model is correct:
T14 and T16 are direct demonstrations that marginal categories overlap and do
not reconcile.

The following named cases are not internally consistent:

| Case | Problem |
|---|---|
| T12 | Current section 8 wording also triggers `NO_GUARANTEED_FULL_DAY`; the table omits it. Unknown/valid-state aggregation is undefined. |
| T13 | `evaluate all applicable codes` conflicts with the short alert list. Invalid short-circuit behaviour is unspecified. Gross burden exceeds baseline but is still called consumed capacity. |
| T14 | Classification endpoints cannot reconcile; confidence should be medium under the current confidence rule. |
| T19 | No output field can carry `COUNT_OUT_OF_RANGE` while omitting scored fields. |
| T20 | No output field can carry `UNSUPPORTED_TIME_WINDOW` while omitting scored fields. |

## 8. Three-tier issue list

### Must modify before any implementation

1. Strict per-field and cross-field validation.
2. Stable cross-city/hotel overlap semantics.
3. Correlated unknown expansion and mixed valid/invalid-state rules.
4. Joint day classification reconciliation.
5. Placement-derived net plus separate gross/applied tax.
6. Same-day event capacity and event-topology overflow.
7. Discriminated invalid output and closed validation codes.
8. Confirmed versus possible-unknown alert basis.
9. Stable code/assumption ordering, model version and localization boundary.
10. Correct T12/T13/T14/T19/T20 and add the full matrix above.
11. Make all-unknown output and buffer non-actionable.
12. Add privacy, storage, inference and URL-state prohibitions as hard invariants.

### Should modify before a later product review

1. Rename `ceilToNextHalfDay` to `ceilUpToHalfDay` and define it as
   `Math.ceil(value * 2) / 2`; `0.5` must remain `0.5`.
2. Define exactly which fields are included in "headline range" for confidence.
3. Version coefficients and thresholds with a stable `modelVersion`.
4. Specify a performance ceiling for the all-unknown DP/oracle state space.
5. Give every named test exact status, confidence, departure protection and
   ordered alert expectations rather than non-exhaustive notes.
6. Keep the existing guide as the public educational/canonical owner. A future
   checker must not target or generate 7/10/14/21-day or city-combination pages.
7. Do not use the result to recommend Review My Route, Build My Route or Full
   Trip support, preselect a paid path, qualify a lead or imply human approval.

### Acceptable in the current specification

1. The high-level seven-input/five-output-group concept is finite and can be
   implemented after the domain corrections.
2. The 1–30-night product boundary is reasonable once zero is explicitly
   invalid.
3. The edge-window tables, two/six-hour classification thresholds and pace
   coefficient ordering are deterministic inputs to review; central owners may
   still change their policy values.
4. `max(0, ...)` prevents negative additional-hotel tax for known values.
5. Buffer and per-move slack are explicitly separated from connection safety.
6. The model has no required live train, flight, map, traffic, weather, hotel or
   ticket data.
7. The specification prohibits city ordering, day-by-day itineraries and route
   recommendations.
8. The no-public, no-index and no-programmatic-page boundary is explicit.

## 9. Privacy and data minimization decision

The seven conceptual inputs do not require personal data. A compliant engine
must add these non-negotiable rules:

- accept only the seven enum/integer values;
- accept no city, date, name, email, phone, account ID, IP-derived location,
  free text, passport information, health information or exact transport data;
- do not infer age, disability, family status or health from `travellerPace`;
- run as a pure deterministic calculation with no persistence, log payload,
  analytics payload, session restoration or URL serialization;
- require a separate privacy review for any telemetry or storage proposal.

## 10. Network, indexing and product boundaries

### No real-time dependency

The calculation can be fully deterministic and offline. The existing no-live
transport boundary is sufficient in intent. Future acceptance tests must make
`fetch`, XHR, WebSocket and network modules fail and assert zero attempted calls.

### No indexable combinations

No state may be serialized into crawlable paths or query parameters. No city x
nights x traveller-type pages, canonical variants, generated metadata, schema
or sitemap entries are authorized. A future public proposal requires a new
central value, privacy, product, commercial and indexing review.

### Existing guide and paid services

`is-your-china-itinerary-too-rushed` remains the public educational and search
owner for pace/how-many-days intent. The checker may eventually calculate an
internal capacity envelope; it must not call a route good/bad, select cities,
remove a stop or replace that guide.

The US$69 Review My Route and US$129 Build My Route services are human paid
deliverables. The checker must not recommend a service, advertise price,
preselect a paid path, create a free automatic route review or imply that a
human has approved a connection. The free consultation cannot be renamed or
presented as a Route Finder, timing checker or instant result.

## 11. Executed checks

This section must reflect commands actually run on the review branch. It must
not be treated as evidence that blocked acceptance rows passed.

| Check | Command | Result |
|---|---|---|
| Internal arithmetic/counterexample witness | `node --test supabase/tests/route-reality-checker-spec-audit.test.mjs` | PASS — 11 tests, 11 passed, 0 failed |
| Related product-boundary regression | `node --test supabase/tests/route-reality-checker-spec-audit.test.mjs supabase/tests/china-itinerary-too-rushed-static.test.mjs supabase/tests/paid-service-pathways-static.test.mjs` | PASS — 22 tests, 22 passed, 0 failed |
| Original repository suite, 2026-08-14 | `npm.cmd run test:inquiry` | FAIL — 304 tests, 301 passed, 3 environment/line-ending failures; all 11 audit tests passed |
| Current repository suite, 2026-08-21 | `npm.cmd run test:inquiry` | PASS — 371 tests, 370 passed, 0 failed, 1 explicitly skipped because local Windows has no `jq` |
| TypeScript, 2026-08-21 | `npm.cmd run typecheck` | PASS — exit 0; 157 guide folders verified before `tsc --noEmit` |
| No public import or surface | `rg -n "route-reality-checker-spec-audit\|china-route-reality-checker-technical-review" app components lib public content -S` | PASS — exit 1 with no matches, as expected |
| Patch whitespace | `git diff --check` and `git diff --cached --check` | PASS — both exit 0 with no whitespace errors |

The original three repository-suite failures were reproducible without the new
audit test file:

1. `china-itinerary-with-older-parents-static.test.mjs` — the registry-entry
   regex assumes LF between structural lines and does not match the CRLF
   checkout, although the entry is present.
2. `inquiry-intake-canary.test.mjs` — the jq execution assertion receives
   `status: null` because `jq` is not installed in this Windows environment.
3. `inquiry-intake-canary.test.mjs` — a multiline regex assumes LF and does not
   match the CRLF workflow checkout.

The 2026-08-20 integration makes the two text assertions line-ending agnostic.
The jq assertion is explicitly skipped when the executable is unavailable and
remains mandatory in CI; it is not counted as passed. None of these
infrastructure changes weakens a Route Checker assertion or changes B01–B10.

No public build or deployment is needed for this internal documentation/test
review, and none is authorized.

## 12. Final authorization state

- specification technically feasible: **no — current text; yes only after the required revisions are approved**
- test model sufficient: **no**
- blocking defects: **B01–B10**
- required spec revisions: **R01–R12**
- public implementation authorized: **false**
- indexable page authorized: **false**

**ROUTE REALITY CHECKER TECHNICAL REVIEW READY — NO PUBLIC IMPLEMENTATION AUTHORIZED**
