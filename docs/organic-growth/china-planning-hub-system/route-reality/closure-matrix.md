# Route Reality v4 test-closure matrix

Reviewed v3 contract:
`article/worker-4-route-reality-v3-spec-20260821@ae493871f2baaff9e14dde1bddd2aab0f7795e17`

Blocking v3 review:
`codex/route-reality-v3-technical-review-20260821@20d24eecb95ed0c802976f1a8bff4bfaf53dde9c`

## V4 summary

| V3 review blocker | V4 repair | Mechanical evidence | State |
|---|---|---|---|
| Standard validator absent | Ajv Draft 2020-12 compiles both roots with `strict:true`, `strictTuples:true`, `allErrors:true` | Every JSON-domain scenario and matrix invokes a compiled validator | **CLOSED FOR FINAL RE-REVIEW** |
| Schema and JS preflight coverage separate | Shared dispatcher runs schema plus semantic/preflight validation | Exact-seven-field class and symbol requests prove schema-blind properties remain preflight-owned | **CLOSED FOR FINAL RE-REVIEW** |
| Enum and both `result:null` arms mutable | Independent schema guards plus active disposable-clone attacks | `Balanced` and both relaxed result arms each produce exact non-zero drift | **CLOSED FOR FINAL RE-REVIEW** |
| Ownership checks self-derived | Test-only golden is independent of catalog and fixtures | Catalog, schema extraction, builder records and fixture semantics each compare to the golden | **CLOSED FOR FINAL RE-REVIEW** |
| Error order and trigger state signature incomplete | Canonical semantic order plus `<length>:<bits>` raw signature | Reversed errors are schema-valid/semantic-invalid; `[F] != [F,F]`; asymmetric states retain both axes | **CLOSED FOR FINAL RE-REVIEW** |
| Monotonic IDs could hide semantic rebound | Full negative-fixture records are frozen | Ten fixtures require own `expectedViolation`, exact singleton violations and unique axis × metric × direction | **CLOSED FOR FINAL RE-REVIEW** |
| Ajv strict portability warnings | Explicit object types and seven closed placement-source arrays | Both schemas compile strictly without tuple/type relaxation | **CLOSED FOR FINAL RE-REVIEW** |

### Independent ownership oracle

The permanent test, not `contract-catalog.json` or `internal-examples.json`,
owns the immutable expected contracts for request/count field order, validation
phases, assumptions, uncertainties, validation errors, relational rules,
trigger signatures, monotonic catalog entries and all monotonic fixture
semantics. Error ownership includes code, rule, fields, related fields,
offending-key mode and canonical priority. Uncertainty ownership includes rule,
targets, source-field mode and source-field order.

### Mutation attacks

The unmodified artifact bundle must return zero drift. Isolated structured
clones then reproduce every review attack and must return exact non-zero drift:

1. add `Balanced` to the request pace enum;
2. relax policy-pending `result:null`;
3. relax invalid-outcome `result:null`;
4. alter uncertainty rule ownership or source-field mode;
5. alter the emitted scalar error rule or its schema owner;
6. reverse validation or error canonical priority;
7. retain the arrival fixture ID while rebinding it to departure; and
8. remove every negative fixture's `expectedViolation`.
9. add an undeclared error code and schema owner arm;
10. add an undeclared uncertainty code, definition and terminal combination;
11. replace the asymmetric trigger matrix while retaining its ID.

Every schema mutant is compiled by a fresh Ajv instance, avoiding schema-ID
cache reuse. The active witness also proves the attacked behavior changed.

### Shared validator boundary

JSON-domain fixtures go through both the real schema and the semantic layer.
Relationally invalid requests intentionally return `schema=true` and
`semantic=false`; their generated invalid outcomes must pass both outcome
validators. Prototype, symbol, NaN and infinity cases remain explicit
JavaScript-only checks because Draft 2020-12 cannot observe those runtime
properties.

## V3 foundation retained below

Review source:
`codex/route-reality-v2-technical-review-20260821@d48f39a81fe323eabc855b9f4f68188ec1729f8f`

Reviewed v2 source:
`article/worker-4-china-planning-hub-system-20260820@c8ce1b259fcaa03dc018eb1483436bb8d543fd59`

The original v3 closure evidence is retained for traceability. Both revisions
claim closure at the **internal contract and executable-test level** only. They
do not claim numeric-engine, performance, runtime, product or publication
readiness.

## Summary

| Employee 8 blocker | v3 disposition | Mechanical evidence | Contract state |
|---|---|---|---|
| V2-BLK-01 — root accepts output | Separate request and draft-outcome roots with distinct stable IDs | Schema structure test plus plain/null-prototype/output/non-plain/symbol fixtures | **CLOSED FOR RE-REVIEW** |
| V2-BLK-02 — fully-known placement mislabeled confirmed | State × placement witnesses and explicit unresolved terminal states | `UNC-FULLY-KNOWN-PLACEMENT-UNRESOLVED` and `WITNESS-FULLY-KNOWN-PLACEMENT-POSSIBLE` | **CLOSED FOR RE-REVIEW** |
| V2-BLK-03 — null PolicyPack permits numeric result | Draft outcome has only `invalid`/`policy_pending`, always `result:null` | Five negative draft-gate fixtures plus schema numeric-definition guard | **CLOSED FOR RE-REVIEW** |
| V2-BLK-04 — assumption/error emission ambiguous | Fixed eight-record assumption catalog; conditional uncertainty predicates; owned ordered errors | Exact binding, arrival-only, filtered-domain, symbol, scalar and relational snapshots | **CLOSED FOR RE-REVIEW** |
| V2-BLK-05 — incomplete R12 matrix | Every fixture executes; invalid cross-products and six monotonic axes are tested | 48 count cases, 27 enum cases, 7 missing, 8 non-plain, high-H boundary and reversed ordinal fixtures | **CLOSED FOR RE-REVIEW** |

## V2-BLK-01 — strict request root

### Change

- Removed v2 `data-model.schema.json`, whose root `oneOf` accepted request or
  output.
- Added `request.schema.json` with `$id`
  `urn:homeground:route-reality:v3:request`.
- Its root only references `RouteRealityRequest`; that definition requires
  exactly seven properties and sets `additionalProperties:false`.
- Added separate `draft-outcome.schema.json` with `$id`
  `urn:homeground:route-reality:v3:draft-outcome`.

### Executed acceptance evidence

- `REQ-PLAIN-VALID`
- `REQ-NULL-PROTOTYPE-VALID`
- `REQ-OUTPUT-SHAPED-REJECTED`
- `REQ-INVALID-OUTPUT-SHAPED-REJECTED`
- `REQ-SYMBOL-KEY-REJECTED`
- `REQ-COLLIDING-EXTRA-KEYS-CANONICAL`
- `MATRIX-MISSING-FIELDS`
- `MATRIX-NONPLAIN-ROOTS`

The preflight explicitly covers the JavaScript properties JSON Schema cannot
observe: prototype and symbol own keys. There is no implementer-selected JSON
Pointer.

## V2-BLK-02 — placement uncertainty

### Change

- A complete witness is a feasible concrete state plus a feasible placement.
- Placement ambiguity is derived before any numeric policy from canonical
  placement counts.
- Four uncertainty states and four policy-pending terminals distinguish input
  unknowns from placement ambiguity.
- Future triggers use `confirmed` only for all witnesses and
  `possible_feasible_extreme` for some witnesses, with deterministic source
  axes.

### Executed acceptance evidence

`UNC-FULLY-KNOWN-PLACEMENT-UNRESOLVED` uses the exact known count tuple
`N=2,C=1,T=1,H=0`. It terminates as
`policy_pending_fully_known_placement_unresolved` and emits
`EVENT_PLACEMENT_UNSPECIFIED`.

`WITNESS-FULLY-KNOWN-PLACEMENT-POSSIBLE` executes the permitted false/true
same-day-versus-different-day witness matrix. It returns
`possible_feasible_extreme` with source `event_placement`; the test explicitly
asserts it is not `confirmed`.

No numeric alert is emitted because the PolicyPack remains absent.

## V2-BLK-03 — non-numeric draft gate

### Change

The draft output schema contains no `ValidResultBody`, numeric range, day
classification, buffer, confidence or numeric alert. Both allowed arms require:

```text
policyPackVersion = null
decisionUseful = false
result = null
publicImplementationAuthorized = false
indexablePageAuthorized = false
```

### Executed acceptance evidence

- `DRAFT-POLICY-PENDING-VALID`
- `DRAFT-INVALID-OUTCOME-VALID`
- `DRAFT-NUMERIC-RESULT-REJECTED`
- `DRAFT-OBJECT-RESULT-REJECTED`
- `DRAFT-NONNULL-POLICY-REJECTED`
- `DRAFT-OK-STATUS-REJECTED`
- `DRAFT-V2-NUMERIC-BODY-REJECTED`

The test also recursively asserts that a valid draft outcome contains no JSON
number. A future numeric schema must use a new ID and model version.

## V2-BLK-04 — deterministic binding and ownership

### Change

The eight assumptions are unconditional semantic conventions. The catalog and
output schema freeze each record's:

- ID;
- emission predicate;
- source fields;
- rule ID;
- target contracts; and
- output order.

Former conditional assumption IDs are now uncertainty or terminal concepts:

- placement unknown → `EVENT_PLACEMENT_UNSPECIFIED`;
- relational pruning → `RELATIONAL_DOMAIN_FILTERED`;
- policy missing → terminal reason `NUMERIC_POLICY_PACK_NOT_APPROVED`.

Errors have deterministic phase order, owner, rule ID, related fields and
offending key. Extra string keys sort by code point; symbols sort by description
and insertion-order tie-break. Type-prefixed JSON encodings prevent string and
symbol keys, duplicate symbol descriptions, undefined descriptions and empty
descriptions from colliding.

### Executed acceptance evidence

- `ASSUMPTION-BINDINGS-EXACT`
- `DETERMINISM-DEEP-CLONE`
- `UNC-ARRIVAL-ONLY-NO-RELATIONAL-FILTER`
- `UNC-NIGHTS-FILTERED`
- `UNC-ZERO-EVENT-UNIQUE`
- `UNC-SINGLE-PLACEMENT-UNIQUE`
- `REQ-SYMBOL-KEY-REJECTED`
- `REQ-COLLIDING-EXTRA-KEYS-CANONICAL`
- `REL-CROSS-CITY-OWNER`
- `REL-TRANSFER-OWNER`
- `REL-MULTI-ERROR-CANONICAL`
- `REL-SCALAR-MISSING-EXTRA-CANONICAL`

For `N=3,C=3,T=5,H=1`, the exact output is cross-city relation, hotel relation,
then interchange topology. No assumption, uncertainty or error may be dangling,
duplicated, rebound or reordered.

## V2-BLK-05 — R12 executable coverage

### Change

Every fixture has a closed `assertionKind`. The dispatcher fails on an unknown
kind and asserts exact ordered equality among the hard-coded required inventory,
the declared inventory and the executed inventory. Each required matrix also
has a separate deep-equal contract for fields, value factories and case count. The fixture
file has no `expectedProperty`, `inputExpression`, `eval` or skip handler.

The count matrix executes four fields × twelve value classes = 48 cases. NaN,
positive infinity and negative infinity are created by named factories. The
time-window matrix executes arrival and departure symmetrically; the pace
matrix uses the same token/type classes. Missing and non-plain root matrices are
also fully executed.

`BND-HIGH-HOTEL-VALID` freezes `N=30,C=0,T=0,H=29` as legal.

The ordinal monotonicity validator freezes:

- arrival later → capacity non-increasing;
- departure later → capacity non-decreasing;
- fast → balanced → slow → capacity non-increasing and burden non-decreasing;
- increasing C, T or H → capacity non-increasing and burden non-decreasing.

The ranks are marked `notPolicyPack:true`; they are test witnesses, not approved
hours, days, burdens or coefficients.

## Gates intentionally still open

This ticket does not close:

- numeric PolicyPack approval;
- golden numeric outputs;
- exhaustive-oracle equivalence and performance ceilings;
- localization dictionaries;
- runtime privacy/network/storage/log/analytics traps;
- security or accessibility review;
- product, search or commercial authorization; or
- any public/indexable implementation.

Those items require later evidence and cannot be inferred from a v3 contract
test pass.
