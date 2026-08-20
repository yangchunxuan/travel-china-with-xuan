# Route Reality v3 normative rules

Keywords **MUST**, **MUST NOT**, **SHOULD** and **MAY** are normative. The only
current executable artifact is a test-only contract harness. These rules do not
authorize production code.

## 1. Contract entry points

`urn:homeground:route-reality:v3:request` is the only request schema ID. Its
root directly references `RouteRealityRequest`; it MUST NOT contain, reference
or accept any output arm.

`urn:homeground:route-reality:v3:draft-outcome` is a separate outcome schema.
It MUST NOT be used as a request validator. A valid object under either outcome
arm MUST fail request validation.

The request validator consists of two mechanical layers:

1. JavaScript preflight for plain-object/prototype and complete own-key checks;
2. the Draft 2020-12 request schema for exact keys and scalar domains.

An ordinary object and an `Object.create(null)` object MAY pass. Null, arrays,
Date, Map, Set, class instances, boxed primitives and any other prototype MUST
fail with `REQUEST_NOT_PLAIN_OBJECT`. A symbol own key or an unapproved string
own key MUST fail with `EXTRA_FIELD`.

## 2. Exact fields and scalar domains

The request MUST have all and only these own keys in the canonical field order:

1. `totalNights`
2. `arrivalWindow`
3. `departureWindow`
4. `crossCityMoves`
5. `airportStationTransfers`
6. `hotelChanges`
7. `travellerPace`

`totalNights` is an integer from 1 through 30 or the exact string `unknown`.
The three count fields are integers from 0 through 30 or `unknown`.

The only known time-window values are `before_09`, `09_12`, `12_15`, `15_18`
and `after_18`. The only known pace values are `fast`, `balanced` and `slow`.
Each enum also accepts the exact string `unknown`.

There is no coercion, trimming or case folding. Numeric strings, decimals,
booleans, null, containers, NaN and infinities are invalid.

## 3. Field meanings

- `totalNights` counts accommodation nights inside the route. A concrete `N`
  supplies `N + 1` calendar slots and `N - 1` transition slots.
- `crossCityMoves` counts days that change the overnight base. Day trips do not
  count.
- `hotelChanges` counts extra accommodation-change events that are not already
  represented by a cross-city overnight-base change.
- `airportStationTransfers` counts complex interchanges beyond ordinary access
  at the arrival and departure edges. It is not a live journey-time count.
- `arrivalWindow` and `departureWindow` are broad ordinal bands, not a flight or
  train time.
- `travellerPace` is a planning pace, not an inference about age, disability,
  health, family status or any other sensitive attribute.

## 4. Validation phases and canonical errors

Errors MUST be emitted in these phases:

1. request shape, which short-circuits every later phase;
2. missing fields in canonical field order;
3. scalar errors in canonical field order;
4. extra string keys in Unicode code-point order, then symbol keys by
   description, with an undefined description before strings and original
   symbol insertion order breaking equal-description ties;
5. cross-city relation;
6. hotel relation; and
7. interchange topology.

If any missing, scalar or extra-key error exists, relational checks MUST NOT
run. Each error MUST include its `code`, owning `field`, exact `ruleId`, ordered
`relatedFields` and nullable `offendingKey`.

Extra-key attribution MUST be lossless and type-distinct. A string key is
encoded as `string:` followed by its JSON string serialization. A symbol key is
encoded as `symbol:` followed by the JSON serialization of its description
(`null` when undefined), `#`, and its zero-based insertion index among the
request's symbol own keys. Thus a string named `@@symbol:secret`, two different
`Symbol("secret")` keys, `Symbol()` and `Symbol("")` cannot collide. The encoded
value is diagnostic provenance only; it is never accepted as a request field.

Relational ownership is complete and fixed:

| Predicate | Code | Owner | Rule |
|---|---|---|---|
| `C > N - 1` | `RELATIONAL_COUNT_CONFLICT` | `crossCityMoves` | `RR3-RELATION-001` |
| `H > 0` and `C + H > N - 1` | `RELATIONAL_COUNT_CONFLICT` | `hotelChanges` | `RR3-RELATION-002` |
| `T > N + 1` | `EVENT_TOPOLOGY_OVERFLOW` | `airportStationTransfers` | `RR3-TOPOLOGY-003` |

For unknown counts, use the minimum known burden and maximum feasible `N` to
detect an empty domain. A request remains valid if at least one concrete tuple
is feasible.

Therefore:

- `N=1,C=1,H=0` emits only the cross-city error;
- `N=1,T=3` emits only the interchange error; and
- `N=3,C=3,T=5,H=1` emits cross-city, hotel, then interchange errors.

No implementation may choose a different owner, omit one of the latter three
errors, or reorder them.

## 5. Correlated feasible domains

An unknown value expands only within its declared scalar domain. Concrete count
tuples MUST remain correlated and MUST satisfy all three predicates together:

```text
C <= N - 1
C + H <= N - 1
T <= N + 1
```

Independent marginal endpoints MUST NOT be recombined into a tuple that never
exists. A production evaluator would need a proved equivalent optimization;
v3 uses only a bounded test-only scan sufficient to classify whether a feasible
tuple exists, whether pruning occurred and whether placement ambiguity exists.

## 6. Placement ambiguity

For a concrete feasible tuple, accommodation events occupy distinct transition
slots and complex interchanges occupy distinct calendar slots. Interchange and
accommodation events MAY share a calendar day.

With `P = N - 1`, the count of canonical placement patterns is:

```text
accommodation placements = choose(P, C + H) × choose(C + H, C)
interchange placements   = choose(N + 1, T)
all placements           = accommodation placements × interchange placements
```

Events of the same kind are indistinguishable. Placement is ambiguous exactly
when at least one feasible concrete tuple has more than one canonical pattern.

The exact uncertainty-state table is:

| Unknown input exists | Placement ambiguous | `uncertaintyState` |
|---|---|---|
| no | no | `none` |
| no | yes | `placement_unresolved` |
| yes | no | `input_unresolved` |
| yes | yes | `input_and_placement_unresolved` |

Every row maps to one terminal state in `contract-catalog.json`. Fully known
input MUST NOT be treated as confirmed when placement remains unresolved.

## 7. Assumptions are fixed and bound

An assumption is a stable semantic convention, not a report of uncertainty.
Every relationally valid request emits the same eight records in catalog order.
Each record MUST exactly match its catalog `id`, `sourceFields`, `ruleId` and
`targetContracts`. The output schema freezes the eight records with
`prefixItems`, `items:false` and an exact item count.

There are no conditional assumptions in v3. This removes the v2 ambiguity over
whether an ID was applicable. Conditional facts belong to `uncertainties`.

No assumption may be emitted without a catalog entry, point to another field,
use another rule, target an undeclared contract or appear twice.

## 8. Uncertainty emission

Uncertainties use this exact order and these exact predicates:

1. `INPUT_VALUE_UNKNOWN` — emit when at least one field equals `unknown`; bind
   every unknown field in canonical request order.
2. `RELATIONAL_DOMAIN_FILTERED` — emit only when at least one count is unknown,
   at least one raw count tuple is rejected by a relation/topology predicate,
   and at least one tuple remains feasible. Bind the unknown count fields.
3. `EVENT_PLACEMENT_UNSPECIFIED` — emit when at least one feasible concrete
   tuple has more than one placement. Bind `totalNights` plus each event-count
   field that is unknown or positive.
4. `TRIGGER_EVALUATION_BLOCKED_BY_POLICY` — always emit for a valid v3 draft
   request. It has no source field and records that numeric trigger evaluation
   cannot begin.

Arrival-only unknown with zero event counts MUST NOT emit
`RELATIONAL_DOMAIN_FILTERED`. Zero events and a single feasible placement MUST
NOT emit `EVENT_PLACEMENT_UNSPECIFIED`.

## 9. Trigger witness quantifiers

This section governs a future approved numeric contract. It does not authorize
alerts in v3.

A complete witness is `(feasible concrete state, feasible placement)`. For
every trigger:

- false for all witnesses: do not emit;
- true for all witnesses: emit with `basis: confirmed`;
- true for some but not all: emit with
  `basis: possible_feasible_extreme`.

For the possible basis, emit sources in this order:

1. `input_domain` when trigger signatures differ across concrete states;
2. `event_placement` when truth differs between placements inside one state.

The fully known `N=2,C=1,T=1,H=0` fixture has a false/true placement witness
matrix under employee 8's permitted synthetic counterexample. Its basis is
`possible_feasible_extreme` with source `event_placement`, never `confirmed`.

## 10. PolicyPack gate and terminal outcomes

No numeric PolicyPack is approved. The v3 draft output MUST contain:

```text
status = policy_pending
policyPackVersion = null
terminalReason = NUMERIC_POLICY_PACK_NOT_APPROVED
decisionUseful = false
result = null
```

The draft schema contains no numeric result definition. It MUST reject
`status:ok`, `status:insufficient_input`, non-null policy versions, numeric or
object results, v2 range bodies, buffers, confidence and numeric alerts.

An invalid request terminates as `validation_failed` with `status:invalid` and
`result:null`. It emits no assumptions or uncertainties because derivation does
not begin after validation failure.

A future numeric result requires all of the following together:

1. an exact immutable non-null PolicyPack version;
2. a new request/output model-contract version and separate numeric schema ID;
3. approved coefficient rationale and rounding;
4. golden numeric fixtures;
5. exhaustive-oracle equivalence and performance ceilings; and
6. a new technical review.

Changing `null` to a string inside this schema is forbidden.

## 11. Monotonicity contract for a future PolicyPack

The following invariants are normative even though values are not yet approved:

- later arrival MUST NOT increase either sightseeing-capacity endpoint;
- earlier departure MUST NOT increase either capacity endpoint;
- fast → balanced → slow MUST NOT increase capacity or reduce burden; and
- increasing `C`, `T` or `H` MUST NOT increase capacity or reduce burden.

The executable fixtures use ordinal ranks marked `notPolicyPack:true`. They
verify that the invariant checker accepts a monotone witness and rejects a
reversed adjacent pair. The ranks are not hours, days, tax or an approved pack.

## 12. Fixture execution

Every fixture has a unique ID and a closed `assertionKind`. The test dispatcher
MUST execute every declared ID and compare the executed and declared sets.
Unknown handlers, skips, `eval`, `inputExpression` and prose-only
`expectedProperty` fixtures are forbidden.

The count invalid matrix covers four fields by twelve value classes: `-1`,
`31`, decimal, numeric string, true, false, null, array, object, NaN, positive
infinity and negative infinity. Time-window and pace matrices cover both token
and type failures. JavaScript-only values are produced by a closed factory map.

## 13. Non-product boundaries

The contract harness MUST NOT compute or return transfer tax, sightseeing days,
fragment days, buffer days, fatigue scores, route order, prices, inventory or a
service recommendation. It MUST NOT perform network access, storage, logging,
analytics, URL serialization or sensitive inference.

There is no public implementation authority. The existing rushed-itinerary
editorial guide remains the public owner until central explicitly approves a
different product after all open gates close.
