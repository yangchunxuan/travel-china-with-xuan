# Route Reality v3 internal contract

**Ticket:** `ROUTE-REALITY-V3-SPEC-01`

**Status:** `ROUTE REALITY V3 SPEC REVIEW READY — EMPLOYEE 8 RE-REVIEW REQUIRED`

**Model:** `route-reality-v3.0.0-internal-draft`

**PolicyPack:** not approved; `policyPackVersion` is mechanically `null`

**Authorization:** internal specification and tests only. No public tool, page,
component, API, Registry entry, sitemap entry, schema markup, telemetry,
persistence, generated URL or deployment is authorized.

## What v3 does

v3 closes the five contract blockers recorded by employee 8 in
`codex/route-reality-v2-technical-review-20260821@d48f39a8`. It is deliberately
smaller than a calculation engine:

1. it validates the exact seven-field request;
2. it validates count relationships and owns every error deterministically;
3. it classifies input-domain and event-placement uncertainty without using a
   numeric policy;
4. it stops every valid request at the non-numeric `policy_pending` terminal;
5. it executes every fixture, including invalid-type matrices, trigger-witness
   coverage and future PolicyPack monotonicity invariants.

It does **not** calculate full sightseeing days, fragment days, transfer tax,
buffer days, fatigue, prices, schedules, route order or alerts. Those results
remain impossible until an exact non-null PolicyPack, golden outputs and a new
numeric schema/model version are separately approved.

## Files

| File | Review purpose |
|---|---|
| `request.schema.json` | The only request root. It accepts exactly seven fields and contains no output arm. |
| `draft-outcome.schema.json` | A separate non-numeric root with only `policy_pending` and `invalid` arms. |
| `contract-catalog.json` | Canonical fields, rule ownership, assumptions, uncertainties, terminal states, trigger basis and monotonic axes. |
| `rules.md` | Normative validation, uncertainty, placement and output rules. |
| `internal-examples.json` | Closed executable fixtures and matrices; no prose-only property cases. |
| `closure-matrix.md` | One-to-one closure evidence for employee 8's five blockers. |
| `handoff.md` | Gates for a later numeric contract or any implementation review. |
| `supabase/tests/route-reality-v3-spec.test.mjs` | Test-only preflight, qualitative contract harness and fixture dispatcher. |

## Exact request

The request has exactly these seven keys:

1. `totalNights`
2. `arrivalWindow`
3. `departureWindow`
4. `crossCityMoves`
5. `airportStationTransfers`
6. `hotelChanges`
7. `travellerPace`

Known domains and the literal `unknown` are frozen in `request.schema.json`.
The schema root has its own stable ID and cannot validate an output object.

JSON Schema cannot see JavaScript prototypes or symbol keys. The permanent
test-only preflight therefore accepts only an ordinary object or
`Object.create(null)`, reads keys with `Reflect.ownKeys` semantics, and rejects
Date, Map, Set, arrays, class instances, boxed primitives and symbol extras.
This preflight is a contract test, not runtime authorization.

## Draft terminal contract

There is no `ok` or `insufficient_input` numeric arm in v3. A relationally valid
request returns the following shape:

```json
{
  "status": "policy_pending",
  "modelVersion": "route-reality-v3.0.0-internal-draft",
  "policyPackVersion": null,
  "terminalReason": "NUMERIC_POLICY_PACK_NOT_APPROVED",
  "decisionUseful": false,
  "result": null,
  "publicImplementationAuthorized": false,
  "indexablePageAuthorized": false
}
```

The full object also contains deterministic assumptions and uncertainties.
Every invalid request returns `status: invalid`, a canonical ordered error list
and `result: null`. Both arms are non-numeric.

## Uncertainty is not confirmation

A complete witness is one feasible concrete input state paired with one
feasible event placement. Knowing all seven scalar fields does not necessarily
identify the placement.

The fully known request `N=2, C=1, T=1, H=0` has multiple placements because
the interchange can share the accommodation-change day or occupy another
calendar day. Its terminal state is
`policy_pending_fully_known_placement_unresolved`; it is never treated as
confirmed merely because all scalar fields are known.

A future trigger may be:

- omitted when false for every complete witness;
- `confirmed` only when true for every complete witness; or
- `possible_feasible_extreme` when true for some but not all witnesses, with
  `input_domain`, `event_placement`, or both recorded in that order.

No alert is produced in v3 because the numeric PolicyPack is absent. The
trigger-witness fixtures only verify the future quantifier contract.

## What remains open

- exact numeric PolicyPack and rationale;
- separately versioned numeric output schema and model version;
- golden numeric outputs and rounding rules;
- bounded exhaustive oracle, optimized-equivalence proof and performance cap;
- EN/ZH/KO code-to-copy dictionaries;
- runtime privacy, network, logging, storage and URL-state traps;
- security, accessibility, product, search and commercial review; and
- explicit public implementation authorization.

Passing v3 contract tests closes specification ambiguity only. It does not
close any of these implementation or product gates.
