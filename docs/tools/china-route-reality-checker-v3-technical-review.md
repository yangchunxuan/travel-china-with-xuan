# China Route Reality Checker v3 technical review

Status: **BLOCKING SPEC REVISIONS REQUIRED**

Review ticket: `ROUTE-REALITY-V3-REVIEW-02`

Reviewer: Homeground worker 8 (technical feasibility and test review)

Review date: 2026-08-21

Review base: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`

Reviewed source: `article/worker-4-route-reality-v3-spec-20260821@ae493871f2baaff9e14dde1bddd2aab0f7795e17`

Prior v2 review: `codex/route-reality-v2-technical-review-20260821@d48f39a81fe323eabc855b9f4f68188ec1729f8f`

The reviewed commit is a direct child of the stated main baseline. This review
uses the v3 files at the exact commit above. It does not carry forward the v2
decision as a substitute for testing v3.

## 1. Decision

The v3 documents materially improve the contract. The exact request contract
(JavaScript preflight plus request schema) and draft-outcome schema now express
the intended non-public, non-numeric boundary, and the fully-known placement
case has a truthful `placement_unresolved` state. Those are real fixes.

The package does not pass this ticket because the committed test can still go
green after material schema, ownership and monotonic-coverage regressions. The
ticket explicitly requires mechanical closure and adversarial checks proving
that the tests are not only testing a duplicate implementation. That bar is not
met for gates 1, 3, 4 and 5.

| Decision | Result |
|---|---|
| bounded non-numeric contract technically feasible | **yes** |
| exact v3 request contract semantically correct today | **yes: specified JavaScript preflight plus request schema** |
| exact v3 non-numeric terminal gate correct today | **yes; canonical error ordering remains open under gate 4** |
| all five prior blocker classes mechanically closed | **no** |
| test model sufficient | **no** |
| numeric `PolicyPack` approved | **no** |
| golden numeric outputs available | **no** |
| performance/oracle equivalence proved | **no** |
| EN/ZH/KO localization dictionaries ready | **no** |
| `publicImplementationAuthorized` | **false** |
| `indexablePageAuthorized` | **false** |

No calculator, engine, API, page, component, telemetry, registry, sitemap entry,
metadata, structured-data markup or public implementation is authorized.

## 2. Scope and public-boundary audit

The exact base-to-target diff contains nine files:

1. eight internal documentation/specification files under
   `docs/organic-growth/china-planning-hub-system/route-reality/`; and
2. one non-runtime contract test,
   `supabase/tests/route-reality-v3-spec.test.mjs`.

There are zero changed files under `app`, `pages`, `api`, `components`, `lib` or
`public`, and zero sitemap, registry, metadata or runtime schema-markup changes.
No public route, API, telemetry, persistence, inventory integration or user-data
collection was found. Worker 4's source branch was not modified by this review.

## 3. Five-gate reassessment

| Gate | Exact v3 contract | Mechanical test closure | Decision |
|---|---|---|---|
| 1. strict seven-field request root; reject output arms, extra/symbol keys and non-plain roots | Separate request root, exact seven fields and two-layer JavaScript preflight are correct. Ajv and PowerShell cross-checks accept/reject the reviewed examples as intended. | The committed test never compiles the request schema. A schema enum mutation survives because the test executes its own `validateRequest` instead. | **Contract closed; test gate open — blocking** |
| 2. fully-known placement uncertainty must not become `confirmed` | `rules.md`, catalog, schema and fixtures map the case to `placement_unresolved`; some-placement-only trigger evidence uses `possible_feasible_extreme` with `event_placement`. | The baseline case passes. Mutating placement ambiguity to false is killed with seven failures, including the terminal-state assertion. | **Closed** |
| 3. `policyPackVersion:null` permits only non-numeric `policy_pending`/`invalid` output | The exact draft schema fixes the policy to null and the result to null. Standard validators reject numeric, object, v2-style and pseudo-execution bodies. | The committed test does not execute the schema. Replacing both `result` constraints with `{}` can make the schema accept numeric results while the duplicate `validateDraftOutcome` test remains green. | **Contract closed; test gate open — blocking** |
| 4. complete deterministic ownership, sources, priority and encoding | Catalog/schema/fixture values are internally consistent in the reviewed baseline cases, and several direct mutations are killed. | Four binding mutations survive 65/65; reversed validation-error priority is accepted by the draft schema; trigger `state signature` is not normatively defined. | **Open — blocking** |
| 5. executable R12 monotonicity, invalid matrices and required inventory | The target executes all six qualitative axes, a legal high-hotel boundary and 90 invalid-matrix cases. | Keeping an arrival fixture ID while rebinding it to a duplicate departure case survives 65/65. Removing every negative fixture's `expectedViolation` also survives. | **Open — blocking** |

The distinction between “contract correct at this commit” and “mechanically
protected against regression” is deliberate. Gates 1 and 3 are not being sent
back for their current data shape; they are being sent back because the
committed acceptance test does not test the actual schemas.

## 4. Blocking defects

### V3-BLK-01 — the committed test does not execute either JSON Schema

The exact schemas behave correctly under independent validators:

- PowerShell 7.6.4 `Test-Json`: 13 of 13 positive/negative cases matched;
- Ajv 8.17.1 Draft 2020-12: 35 of 35 cases matched; and
- a second Ajv 8.20 read-only harness in non-strict mode: 15 of 15 cases
  matched.

The request cases include valid known and all-unknown requests, missing and
extra fields, both output arms as request roots, arrays/null, bad enums and
out-of-range counts. The draft-outcome cases include both valid terminal arms
and numeric, object, non-null-policy, `ok`, mismatched-terminal, rebound-source,
empty-source and v2-numeric negative bodies.

However, `route-reality-v3-spec.test.mjs` defines and executes its own
`validateRequest` and `validateDraftOutcome`. It performs structural assertions
against the parsed schema but never compiles that schema with Ajv, Test-Json or
another Draft 2020-12 validator.

Two adversarial schema mutations expose the gap:

1. add `Balanced` to `requestSchema.$defs.KnownPace.enum`; Ajv then accepts a
   request the contract prohibits, while the hand-written validator continues
   to reject it and the existing assertions remain green;
2. replace both outcome-arm `result` constraints with `{}`; Ajv then accepts
   `result:1`, while the hand-written validator still rejects it and the
   existing assertions remain green.

Minimum revision: compile both committed schemas with a standard Draft 2020-12
validator inside the permanent test suite and run the shared positive/negative
fixture bodies through the schemas themselves. Add mutation guards for at least
the pace enum and both `result:null` arms. JavaScript-only root checks remain a
separate preflight because JSON Schema cannot observe symbols or prototypes.

### V3-BLK-02 — ownership and canonical error output are not fully frozen

The baseline package kills useful mutations:

- force placement ambiguity to false: seven failures;
- rebind the first assumption source: three failures;
- swap uncertainty order in the catalog: five failures; and
- reverse the hand validator's relational error insertion order: two failures.

Four material mutations nevertheless survive with 65 of 65 tests passing:

1. catalog `INPUT_VALUE_UNKNOWN.ruleId` from `RR3-UNCERTAINTY-001` to
   `RR3-UNCERTAINTY-009`;
2. draft schema `INPUT_VALUE_UNKNOWN.ruleId` from `RR3-UNCERTAINTY-001` to
   `RR3-UNCERTAINTY-009`;
3. catalog `INPUT_VALUE_UNKNOWN.sourceFieldMode` from
   `all unknown request fields in request-field order` to the string `empty`;
   and
4. the `crossCityMoves` scalar error rule from `RR3-SCALAR-001` to
   `RR3-SCALAR-999` in the test harness.

The catalog, schema and test can therefore drift without an independent
expected contract detecting the rebind. Separately, Ajv Draft 2020-12 accepts
an otherwise valid `InvalidOutcome` whose three validation errors are in reverse
priority order. The hand-written validator currently rejects the reverse order,
and reversing its insertion order is caught. The missing protection is that the
schema and an independent committed negative/canonicalizer case do not freeze
the same ordering contract.

There is one remaining written ambiguity: `rules.md` emits `input_domain` when
“trigger signatures differ across concrete states,” but does not define a
signature. The test reduces each state row to `${some}:${every}`. Raw witness
rows `[false,true]` and `[true,false]` are different signatures but collapse to
the same reduction, permitting different compliant source attribution.

Minimum revision:

1. independently hard-code and deep-compare the full uncertainty inventory:
   code, rule ID, target contracts, source-field mode and order across catalog,
   schema and fixtures;
2. run every invalid matrix through the outcome builder and assert the complete
   error record, ownership, related fields, offending key and canonical order;
3. make wrong-order output fail at the normative semantic/canonicalization
   layer; and
4. define trigger state signature and add a `[false,true]` versus
   `[true,false]` fixture.

### V3-BLK-03 — R12 fixture names are frozen, but their meanings are not

The target suite executes:

- 40 named scenarios;
- five invalid-matrix groups containing 90 generated invalid inputs;
- five trigger-witness fixtures;
- eleven monotonic fixtures, including one valid witness and ten reversed
  cases; and
- the legal `N=30,C=0,T=0,H=29` boundary.

It covers arrival capacity, departure capacity, pace capacity/burden and
cross-city/transfer/hotel capacity/burden. Deleting a required arrival fixture,
reversing valid witnesses, deleting an invalid matrix, changing catalog
direction, neutralizing a hotel witness and changing a comparator were all
killed in the first mutation batch.

The required inventory comparison freezes fixture IDs, not the full semantic
mapping. This mutation survives with 65 of 65 tests passing:

```text
retain ID: MONO-ARRIVAL-REVERSED
replace mutation: duplicate the departureWindow reversal [1,2,0,4,5]
replace expectedViolation: departure
```

Arrival-reversal coverage has then disappeared, yet the required ID and executed
ID lists still match. A second mutation deleting all ten negative fixtures'
`expectedViolation` properties also survives because the assertion only checks
the field when present.

Minimum revision: deep-compare the complete monotonic fixture contract, or
derive and assert a one-to-one `{axis, metric, direction}` coverage map. Pin the
exact mutation and require the correct `expectedViolation` for every negative
fixture. A name alone is not executable coverage.

## 5. Passed contract work

The following v3 work is accepted and should not be reopened without new
evidence:

- request and outcome are separate schema roots;
- the request has exactly seven named fields and closed known/unknown enums;
- JavaScript preflight covers symbol keys, ordinary/null prototypes, Date, Map,
  Set, class instances, boxed primitives, arrays and null;
- output-shaped objects are rejected as requests;
- fully-known placement ambiguity maps to `placement_unresolved`;
- some-placement-only trigger evidence cannot be called `confirmed`;
- `policyPackVersion:null` and `result:null` form the current non-numeric gate;
- all-unknown remains non-actionable;
- high hotel-change and strict invalid input boundaries are present; and
- the package remains internal-only with no public implementation wiring.

Ajv `strict:true` compiles the request schema but rejects the draft-outcome
schema because several `allOf` branches use `properties` without an explicit
`type:"object"`; `strict:false` and PowerShell `Test-Json` validate the intended
semantics. This is not a standards-validity counterexample, but it is a
portability warning. Adding explicit object types and closing the tuple warning
would make validator behaviour less configuration-dependent.

## 6. Executed checks

Only checks actually run are reported as run.

| Check | Command / method | Result |
|---|---|---|
| Fetch and identity | `git fetch`; `git rev-parse`; parent check | PASS — base `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`, target `ae493871f2baaff9e14dde1bddd2aab0f7795e17`, target parent equals base |
| Exact changed-path audit | `git diff --name-only <base> <target>` | PASS — exactly 9 files: 8 internal docs/spec files and 1 non-runtime test; 0 public/runtime matches |
| Target contract test | `node --test supabase/tests/route-reality-v3-spec.test.mjs` | PASS — 65/65, 0 skipped, 0 failed |
| Target plus adjacent static tests | target test plus `china-itinerary-too-rushed-static`, `paid-service-pathways-static`, `search-platform-static` | PASS — 82/82 |
| Node syntax | `node --check supabase/tests/route-reality-v3-spec.test.mjs` | PASS |
| JSON parsing | direct parse of request schema, draft outcome schema, catalog and examples | PASS — 4/4 |
| PowerShell schema cross-check | PowerShell 7.6.4 `Test-Json` positive/negative instances | PASS — 13/13 |
| Ajv schema cross-check | Ajv 8.17.1 Draft 2020-12 one-off read-only harness | PASS — 35/35 expected results |
| Ajv strict portability | compile both schemas with `strict:true` | PARTIAL — request passes; draft outcome fails on missing explicit object type in an `allOf` properties branch |
| Ownership/order mutation batch | detached temporary copies; run target test after each mutation | FAIL GATE — 4 material mutations survived 65/65 |
| R12 mutation batch | detached temporary copies; run target test after each mutation | FAIL GATE — semantic axis rebind and expected-violation deletion survived 65/65 |
| TypeScript | exact detached target, existing local dependency runtime; `npm.cmd run typecheck` | PASS — guide generator verified 157 folders; `tsc --noEmit` exited 0 |
| Full repository suite attempt | `npm.cmd run test:inquiry` | NOT A PASS — 369 total, 363 passed, 6 failed outside the target diff: 3 missing local Supabase dependency failures, 1 older-parents registry expectation and 2 Windows CRLF canary assertions |
| Target patch whitespace | `git diff --check <base> <target>` | PASS |
| Review patch whitespace | `git diff --cached --check` | PASS |

The standard-validator and mutation checks were one-off, read-only review
harnesses and were not committed as product code. The target source worktree
remained clean. The review does not claim that the six unrelated full-suite
failures were caused by v3, and it does not claim a full-suite pass.

## 7. Required revisions before another review

Worker 4 should make the minimum test/spec changes below. Worker 8 should then
rerun the same adversarial mutations rather than merely checking that the new
tests are present.

1. Compile and execute both real JSON Schemas in the committed test suite with a
   standard Draft 2020-12 validator.
2. Add schema mutation guards for request enums and both non-numeric output arms.
3. Freeze the full assumption/uncertainty/error ownership record independently
   of the catalog used by the implementation under test.
4. Make canonical error priority an executable semantic contract and add a
   wrong-order negative case.
5. Define trigger state signature and test asymmetric placement witness rows.
6. Freeze every monotonic fixture's axis, metric, direction, mutation and exact
   violation, not only its ID.
7. Make every negative monotonic fixture require an `expectedViolation`.

These are test and contract revisions. They do not require a public engine or a
numeric policy.

## 8. Still-unapproved gates

The following remain explicitly outside this review and are not inferred from
acceptance of the non-numeric contract:

| Gate | Current state | Evidence required later |
|---|---|---|
| Numeric `PolicyPack` | absent and unapproved | immutable schema, exact values, rationale, version and change control |
| Golden outputs | absent | exact expected numeric bodies under one approved pack |
| Performance/oracle | unproved | bounded exhaustive oracle, optimized-equivalence proof and time/memory ceiling |
| Localization | absent | EN/ZH/KO code dictionaries, fallback and parity tests |
| Privacy/runtime | written boundary only | network, persistence, log, analytics, URL-state and crash-payload traps for any future engine |
| Product/search approval | withheld | separate central value and product-boundary review |
| Public implementation | false | explicit later central authorization |
| Indexable page | false | explicit later central authorization |

## 9. Central decision

Central should return only the seven minimum test/spec revisions in section 7.
It should not ask worker 4 to invent numeric coefficients merely to make the
review green. The current non-numeric contract direction is feasible, but its
acceptance harness is not yet strong enough to prove it remains correct after a
material regression.

`publicImplementationAuthorized=false`

`indexablePageAuthorized=false`

No PR, merge, deployment or production change is authorized by this review.

**BLOCKING SPEC REVISIONS REQUIRED**
