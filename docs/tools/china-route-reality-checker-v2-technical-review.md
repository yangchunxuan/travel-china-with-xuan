# China Route Reality Checker v2 technical review

Status: **BLOCKING SPEC REVISIONS REQUIRED**

Review ticket: `ROUTE-REALITY-V2-REVIEW-01`

Reviewer: Homeground worker 8 (technical feasibility and test review)

Review date: 2026-08-21

Review base: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`

Reviewed source: `article/worker-4-china-planning-hub-system-20260820@c8ce1b259fcaa03dc018eb1483436bb8d543fd59`

The reviewed commit is a direct child of the review base. This review reads the
v2 artifacts at that commit. It does not reuse the result for the earlier
`1e131ff` specification as a substitute for a v2 decision.

## 1. Decision

| Decision | Result |
|---|---|
| bounded model direction technically feasible | **yes, in principle** |
| v2 specification ready for an engine | **no** |
| contract ambiguity resolved | **partly: most B01-B10 defects are resolved, but the blockers in section 4 remain** |
| test model sufficient | **no** |
| numeric `PolicyPack` approved | **no** |
| golden numeric outputs available | **no** |
| performance ceiling and oracle equivalence proved | **no** |
| EN/ZH/KO localization parity ready | **no** |
| privacy/runtime controls verified | **no** |
| `publicImplementationAuthorized` | **false** |
| `indexablePageAuthorized` | **false** |

This is not a rejection of the seven-field direction. The v2 documents remove
most of the old semantic contradictions and are substantially more reviewable.
They still permit materially different compliant implementations in several
places, and the current test file proves document presence rather than model
behaviour. No calculator, engine, API, route, component, telemetry, registry,
sitemap entry, metadata variant, schema markup or public page is authorized.

## 2. Scope and evidence boundary

The following files were read from the reviewed commit with `git show`:

- `docs/organic-growth/china-planning-hub-system/route-reality/data-model.schema.json`;
- `docs/organic-growth/china-planning-hub-system/route-reality/rules.md`;
- `docs/organic-growth/china-planning-hub-system/route-reality/internal-examples.json`;
- `docs/organic-growth/china-planning-hub-system/route-reality/handoff.md`; and
- `docs/organic-growth/china-planning-hub-system/route-reality/technical-review-disposition.md`.

The original B01-B10 and R01-R12 definitions were read from worker 8's
2026-08-14 technical review. Each item below was then reassessed against
`c8ce1b2`, not against the old source commit.

The target commit changes 30 documentation files and one non-runtime static
test under `supabase/tests`. It changes zero files under `app`, `pages`, `public`, `api`,
`components` or `lib`, and adds no runtime sitemap, registry, metadata or schema
markup wiring. No true-valued public or indexable authorization was found.

## 3. B01-B10 reassessment

| Item | v2 decision | Evidence and remaining boundary |
|---|---|---|
| B01 — known, unknown and relational domains disagree | **Resolved in the written contract** | `rules.md` sections 2, 4 and 5 use the same scalar domains and concrete relational predicates for known and unknown states. The request-schema entry point remains a separate blocker under R01. |
| B02 — independent unknown endpoints create impossible combinations | **Resolved in the written contract; unverified** | Section 5 requires correlated tuple expansion and prohibits independent endpoint arithmetic. There is no executable reference oracle or equivalence test. |
| B03 — cross-city/hotel subtraction lacks stable overlap | **Resolved in the written contract** | Sections 3.2-3.3 define `C` as overnight-base-change days and `H` as additional non-overlapping accommodation-change days; subtraction is prohibited. `SEM-01` through `SEM-04` illustrate the distinction. |
| B04 — marginal day ranges do not reconcile | **Resolved normatively; unverified** | Section 7 requires one class per day, `F + G + U = calendarDays`, complete joint tuples and non-additive marginals. The JSON Schema does not encode the sum, uniqueness or cross-field relation, and `PROP-01` is descriptive text rather than an executed assertion. |
| B05 — gross burden treated as capacity consumed | **Resolved structurally; numeric policy open** | Section 6.3 separates gross burden, applied tax and placement-derived net and states the accounting identities. Coefficients, thresholds and rounding remain absent. |
| B06 — unlimited same-day stacking | **Resolved in the written contract; performance open** | Sections 4 and 6 allow one accommodation event per transition slot and one complex interchange per calendar slot, with defined sharing. The complete placement workload has no approved compression or ceiling. |
| B07 — invalid result cannot be represented | **Resolved for the output arm** | `InvalidOutput` requires `status:invalid`, `decisionUseful:false`, at least one closed error and `result:null`. Root request/output schema mixing remains a separate entry-point defect. |
| B08 — unknown extreme shown as confirmed | **Partly resolved — blocking** | Unknown-input state witnesses now use all/some quantification. However, a fully known seven-field input can still have multiple feasible event placements, while section 9 says every emitted alert for fully known input is `confirmed`. A some-placement-only trigger cannot be represented honestly. |
| B09 — unstable codes, assumptions and ordering | **Partly resolved — blocking** | Closed enums and canonical orders are written. Conditional emission is not fully determined: the applicability of `EVENT_PLACEMENT_UNKNOWN` and `UNKNOWN_DOMAIN_RELATIONALLY_FILTERED` is not frozen for every input, and relational multi-error ownership is ambiguous. This can still produce byte-different outputs for the same input. |
| B10 — the all-unknown buffer is not an executable suggestion | **Resolved normatively; unverified** | Sections 8 and 11 plus `UNK-01` require `insufficient_input`, low confidence, `decisionUseful:false`, a null suggested buffer and `bufferActionable:false`. The schema alone accepts contradictory combinations, so an executable semantic assertion is still required. |

## 4. Current specification blockers

### V2-BLK-01 — the root schema is not a strict request schema

`data-model.schema.json` has a root `oneOf` containing both
`RouteRealityInput` and `RouteRealityOutput`. The seven-field restriction exists
only at `#/$defs/RouteRealityInput`.

The following output-shaped object validates against the schema root while it
does not contain any of the seven request fields:

```json
{
  "status": "invalid",
  "modelVersion": "route-reality-v2.0.0-internal-draft",
  "policyPackVersion": null,
  "decisionUseful": false,
  "errors": [
    {"code": "MISSING_FIELD", "field": "totalNights"}
  ],
  "result": null
}
```

Ajv 8.20 returned:

```text
root schema: true
RouteRealityInput: false
RouteRealityOutput: true
```

An implementation that compiles the published `$id` as its request validator
therefore violates the exact-seven-field boundary while appearing schema-valid.

Minimum revision: publish separate request and output root schemas with distinct
stable IDs, or publish one mandatory request-validator entry point that targets
`#/$defs/RouteRealityInput`. Add an executable negative assertion that every
valid output object fails request validation. Do not rely on an implementer to
guess the intended JSON Pointer.

### V2-BLK-02 — placement uncertainty is mislabeled for fully known input

Sections 4 and 6 require all feasible placements to be considered. Knowing all
seven scalar fields does not reveal which day contains a complex interchange.
Applied tax and classification can therefore vary by placement because burden
is clamped against the capacity of each selected day.

Minimum counterexample under a permitted synthetic future policy:

```text
input: N=2, C=1, T=1, H=0, all other fields known
base capacity: 1 hour on each of the three calendar slots
C burden: 1 hour
T burden: 1 hour
TRANSFER_TAX_HIGH trigger: applied tax > 1.5 hours

C and T on the same slot: applied tax = 1 hour -> trigger false
C and T on different slots: applied tax = 2 hours -> trigger true
```

The current union has only `confirmed` and `possible_unknown_extreme`, and
section 9 requires emitted alerts for fully known input to be `confirmed`.
Emitting the alert overstates a possible placement as confirmed; omitting it
loses a feasible extreme.

Minimum revision: quantify every trigger over the full set of feasible concrete
states **and placements**, for all valid inputs. Use a general
`possible_feasible_extreme`, add a separate `possible_placement_extreme`, or
otherwise define a closed basis that can represent simultaneous input and
placement uncertainty. `confirmed` must mean the trigger holds for every
relevant witness.

### V2-BLK-03 — the internal-draft numeric gate is not mechanically closed

The rules state that `policyPackVersion:null` is a deliberate implementation
gate and that no authoritative numeric output may be populated under the
internal-draft model. The schema nevertheless defines such an object as
`ValidOutput`: it requires a complete numeric result while fixing the model to
the draft version and the policy pack to null.

The review harness constructed an `insufficient_input` output with inverted
ranges, an unreconciled joint tuple, `confidence:high`,
`suggestedBufferDays:5`, `bufferActionable:true` and `unknownFields:[]`. The
root and output schemas both accepted it. Some of those
violations require a semantic validator rather than JSON Schema, but the more
basic contradiction remains: a draft/no-policy contract can still carry a
schema-valid numeric result. `policyPackVersion:null` is machine-readable
evidence that no approved policy exists, but the schema does not prohibit or
segregate numeric payloads in that state.

Minimum revision: make the internal draft output a mechanically non-numeric
`policy_pending`/null-result arm, or move numeric output into a separately
versioned schema that cannot exist until an exact non-null `PolicyPack` version
is approved. A prose warning is not an executable gate.

### V2-BLK-04 — deterministic emission and relational error ownership are incomplete

The contract fixes array order after the set of emitted items is known, but it
does not always fix that set.

- With only `arrivalWindow:unknown` and all counts zero, no relational domain is
  narrowed. Section 5 says to add `UNKNOWN_DOMAIN_RELATIONALLY_FILTERED` after a
  feasible unknown expansion, while its name and section 10's "when applicable"
  wording can be read as requiring actual relational filtering. This should be
  made explicit rather than inferred.
- `EVENT_PLACEMENT_UNKNOWN` has no exact emission predicate for zero-event,
  single-placement and multi-placement cases.
- For `N=3, C=3, H=1`, both `C > N-1` and `C + H > N-1` are observable. The
  rules do not state whether the result contains only the `crossCityMoves`
  conflict or both cross-city and hotel relational errors.

Minimum revision: define a MUST/WHEN/NEVER predicate for every `AssumptionId`;
define the complete relational/topology error set and field ownership for each
invalid tuple; then snapshot the exact canonical output for multi-error cases.

### V2-BLK-05 — R12 does not yet contain the full required property matrix

`PROP-06` covers monotonicity for increasing `C`, `T` and `H`. The package does
not freeze these equally important policy invariants:

- a later arrival window must not increase sightseeing capacity;
- an earlier departure window must not increase sightseeing capacity; and
- moving from fast to balanced to slow pace must not increase sightseeing
  capacity or reduce burden.

A reversed future `PolicyPack` would not violate the current written property
set. There is also no legal high-`H` boundary fixture. The strict invalid matrix
is incomplete across all count fields: it does not exercise every field with
`-1`, `31`, decimals, numeric strings, booleans, null, arrays/objects and
`NaN`/infinities; departure-window and pace invalid variants and a complete
multi-field error sequence are also absent. `handoff.md` says there are two
JavaScript-expression fixtures, while `internal-examples.json` contains one
(`INV-10`, for `NaN`); Date, Map, class instance and boxed primitive
plain-object rejection are not exercised.

Minimum revision: add the three normative monotonic orders to the PolicyPack
contract, add property fixtures that fail a reversed pack, add a legal
`N=30,C=0,H=29` boundary, complete the per-field invalid and multi-error matrix,
and either add the promised non-plain-object fixture or correct the fixture-count
statement.

## 5. R01-R12 reassessment

| Revision | v2 decision | Required next step |
|---|---|---|
| R01 strict field validation and multi-error behaviour | **Partial — blocking** | Exact prose and the input `$def` exist. Separate the request schema entry point and freeze relational multi-error ownership. |
| R02 unambiguous cross-city/hotel semantics and examples | **Complete in contract** | Preserve the non-overlap model. |
| R03 consistent relational bounds | **Complete in contract** | Execute known/unknown boundary assertions in a reference harness. |
| R04 correlated nested expansion | **Complete in contract; performance unproved** | Build a bounded oracle, optimized equivalent evaluator and ceiling before implementation approval. |
| R05 event placement, sharing and overflow | **Complete in contract** | Add executable placement and overflow tests. |
| R06 mutually exclusive joint classifications | **Complete in contract; unverified** | Enforce sum, uniqueness and canonical sorting in semantic assertions. |
| R07 placement-derived net and split gross/applied burden | **Structurally complete; policy pending** | Approve one versioned pack, rounding rule and golden outputs separately. |
| R08 discriminated union and closed validation codes | **Complete for output** | Keep invalid `result:null`; separate request/output schema roots. |
| R09 alert basis, precedence, order and deduplication | **Partial — blocking** | Extend witness basis to placement uncertainty and add executable code-level dedup/order tests. |
| R10 stable IDs, version, localization and serialization | **Partial — blocking for determinism/readiness** | Freeze every assumption emission predicate; later add EN/ZH/KO dictionaries and parity tests. |
| R11 non-actionable all-unknown state | **Complete in contract; unverified** | Add a cross-field executable assertion; keep buffer and connection safety separate. |
| R12 corrected named cases and full matrix | **Partial — blocking** | Existing named corrections are descriptive fixtures. Add the omitted arrival/departure/pace properties, legal high-hotel boundary, strict invalid variants for every field, fixed multi-error sequences and actual fixture execution. Golden numerics remain pending. |

## 6. Contract resolved versus still-open implementation gates

The following contract work is materially resolved and should not be sent back
as if v2 had made no progress:

- seven named scalar inputs with closed known/unknown domains;
- cross-city, complex-interchange and hotel-change meanings;
- correlated unknown expansion and relational filtering;
- accommodation and interchange slot topology;
- joint day-classification reconciliation;
- gross/applied/net accounting identities;
- invalid output union and closed codes;
- non-actionable all-unknown buffer rule;
- no-live-data, no-PII, no-storage and no-indexing intent; and
- the existing rushed-itinerary guide as the public canonical owner.

The following remain deliberately or demonstrably unresolved. Their absence is
not treated as a hidden pass:

| Gate | Current state | Evidence needed later |
|---|---|---|
| Numeric `PolicyPack` | No schema, values or approved version | Immutable pack, rationale, exact version and contract/model bump |
| Golden outputs | None | Exact expected output for every numeric-capable fixture under one pack |
| Performance | No time/memory ceiling or equivalence proof | Bounded exhaustive oracle, optimized evaluator equivalence, all-unknown benchmark and timeout budget |
| Localization | Stable IDs only | EN/ZH/KO dictionaries, fallback rules, code-to-copy parity and translation QA |
| Privacy/network/storage | Written prohibitions only | Network-denial, persistence, logging, analytics, URL-state and crash-payload runtime/static traps |
| Security/accessibility | Not reviewed for a surface | Separate review after any future implementation authorization |
| Product/search/commercial | Authorization withheld | Central value review; existing editorial owner retained; no service recommendation or lead qualification |
| Public/indexable surface | Explicitly false | New explicit central authorization; never inferred from contract acceptance |

### Performance note

The all-unknown correlated domain is bounded, but naive execution is not a
practical implementation plan. A read-only combinatorial audit found:

```text
feasible concrete count/window/pace states: 9,172,125
feasible placement evaluations including five arrival bands,
five departure bands and three pace values: 13,264,435,178,096,723,171,620,275
```

This count already treats same-kind events as indistinguishable. The documents
permit dynamic programming or symmetry reduction, but provide no formal
compression, benchmark, time ceiling or memory ceiling. Boundedness proves
theoretical finiteness, not production feasibility.

## 7. Executed checks

Only tests actually run are reported as run.

| Check | Command / method | Result |
|---|---|---|
| Fetch and identity | `git fetch origin main article/worker-4-china-planning-hub-system-20260820`; `git rev-parse`; `git show -s` | PASS — base `ef18987`, target `c8ce1b2`, target parent is the base |
| Target static test | `node --test supabase/tests/china-planning-hub-system-static.test.mjs` in the target worktree | PASS — 6 tests, 6 passed, 0 failed |
| JSON parsing | Worker 4 static test plus direct `JSON.parse` review harness | PASS — schema and fixture JSON parse |
| Fixture inventory | Direct read-only fixture audit | PASS — 41 scenarios, 41 unique IDs, one JavaScript-expression fixture |
| JSON-native validation descriptors | One-off read-only contract harness over 40 JSON-native inputs | OBSERVED — all 40 parsed/classified; the 27 inputs with explicit validation/status expectations matched; 13 property-only cases were not executed |
| Root schema arm isolation | Ajv 8.20, schema root versus explicit input/output `$defs` | **FAIL — output-shaped object passes the root while failing the input `$def`** |
| Semantic output enforcement | Ajv 8.20 with a range/day/status/buffer counterexample | **NOT ENFORCED — schema accepts it; a semantic validator is required** |
| Fully known placement alert basis | Synthetic policy counterexample in section 4 | **FAIL — current union has no truthful some-placement-only basis** |
| Target runtime surface | Exact base-to-target changed-path audit | PASS — 30 docs, one static test, zero runtime/public/index wiring files |
| Authorization guard | Exact commit grep for true-valued public/index authorization | PASS — zero matches |
| Full repository suite attempt | `npm.cmd run test:inquiry` in dependency-free target worktree | NOT USABLE — exited 1 because dependencies such as `@supabase/supabase-js` are absent and unrelated Windows CRLF assertions fail; the six target tests still passed and no full-suite pass is claimed |
| TypeScript | Not run | NOT CLAIMED — target changes no TypeScript and the clean target worktree has no installed dependencies |
| Patch whitespace | `git diff --cached --check` | PASS — exit 0 |

The six worker 4 tests are useful package guards, but they only inspect files,
keys, strings, fixture-group presence and selected `UNK-01` fields. They do not
execute 41 scenarios, compile a request-specific schema, calculate placements,
verify properties, run an oracle, enforce ordering, trap networks or prove
privacy and storage behaviour.

The two review-only inline harnesses were not committed as product code. The
schema harness used `Ajv2020({allErrors:true, strict:true})`, registered the
draft-2020 schema by `$id`, and compiled the root,
`#/$defs/RouteRealityInput` and `#/$defs/RouteRealityOutput` separately. The
fixture harness parsed all 40 JSON-native inputs and compared only the 27 cases
that carry explicit `expected.validation`, `expected.status` or ordered
`expected.errors`; it did not execute the 13 `expectedProperty` strings. These
observations identify required permanent tests and are not presented as a
reusable acceptance harness.

## 8. Minimum failing tests required by the revision

These tests may be implemented in a completely internal contract harness. They
do not authorize a product engine.

1. **Request arm:** every valid output object fails `validateRequest`; an exact
   seven-field ordinary object and a seven-field `Object.create(null)` object
   pass; missing/extra/symbol keys and Date, Map, class and boxed primitive
   values fail with the frozen error set.
2. **Placement basis:** the fully known `N=2,C=1,T=1,H=0` counterexample emits a
   possible placement basis, never `confirmed`.
3. **Draft gate:** draft model plus null policy cannot validate a numeric result.
4. **Relations:** `N=1,C=1` and `N=1,T=3` return the exact ordered relational or
   topology error set; `N=3,C=3,H=1` has one canonical multi-error result.
5. **Joint classification:** every tuple is unique, canonically sorted and
   satisfies `F + G + U = calendarDays`.
6. **Ranges/accounting:** every range satisfies `min <= max`; gross, applied,
   baseline and net obey all cross-field identities and normalize negative zero.
7. **Status/unknown:** known input implies `ok` and no unknown fields; any
   unknown implies `insufficient_input`; all unknown is always
   low/false/null/false.
8. **Codes and assumptions:** duplicate alerts collapse by code and highest
   severity, all arrays follow their closed order, and every assumption's
   emission predicate is snapshot-tested.
9. **Monotonicity:** later arrival, earlier departure and slower pace cannot
   increase capacity; increasing `C`, `T` or `H` cannot improve capacity.
10. **Fixture execution:** all 41 descriptors map to named executable assertions;
    JavaScript-only values are constructed by fixture ID without `eval`.
11. **Oracle/performance:** optimized results equal a bounded exhaustive oracle,
    and all-unknown completes inside an approved time and memory ceiling.
12. **Privacy boundaries:** zero network attempts, zero persistence/log/analytics
    copies, zero URL state and zero extra/personal/result fields.

## 9. Central decision list

Before another technical acceptance review, central should require worker 4 to:

1. separate or unambiguously bind request/output schema entry points;
2. make the internal-draft/no-policy state mechanically non-numeric;
3. quantify alert basis over both state and placement uncertainty;
4. freeze relational error ownership and every assumption emission predicate;
5. add the omitted monotonic and boundary contract cases; and
6. replace presence-only fixture checks with an executable internal contract
   harness for the non-numeric rules.

Central should **not** request arbitrary coefficients merely to make tests green.
The numeric `PolicyPack`, golden outputs, performance proof, localization,
privacy/security/accessibility review and product/search authorization remain
separate gates after the contract revisions.

No public implementation, indexable page, API, telemetry or deployment is
authorized by this review.

**BLOCKING SPEC REVISIONS REQUIRED**
