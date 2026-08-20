# Route Reality v3 review handoff

## Review target

- Ticket: `ROUTE-REALITY-V3-SPEC-01`
- Source repaired: `article/worker-4-china-planning-hub-system-20260820@c8ce1b2`
- Blocking review: `codex/route-reality-v2-technical-review-20260821@d48f39a8`
- Baseline: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`
- Delivery: internal specification plus executable contract tests only

Employee 8 should review the five closure rows in `closure-matrix.md`, then
inspect the schemas, catalog, fixture dispatcher and actual test output. File
presence alone is not acceptance evidence.

## Review sequence

1. Compile `request.schema.json` as the request root and
   `draft-outcome.schema.json` as a separate root. Confirm their `$id` values
   differ and no output validates as a request.
2. Run the Node test and verify every nested fixture ID executes.
3. Inspect the fully known placement case and trigger-witness case together.
4. Attempt to add any numeric result or non-null PolicyPack version to a valid
   draft outcome; it must fail.
5. Compare every emitted assumption with `contract-catalog.json` and inspect
   the exact multi-error snapshots.
6. Reverse each monotonic axis in the ordinal fixtures and confirm the named
   violation is returned.

## Commands

```text
node --test supabase/tests/route-reality-v3-spec.test.mjs
node --test supabase/tests/china-itinerary-too-rushed-static.test.mjs supabase/tests/paid-service-pathways-static.test.mjs supabase/tests/search-platform-static.test.mjs
npm run typecheck
git diff --check
```

The dedicated test does not need network access or a numeric dependency. The
TypeScript command is a repository regression check; v3 adds no TypeScript.

## Contract decisions frozen in v3

- one strict seven-field request root;
- a separate outcome root;
- ordinary and null-prototype request objects accepted by preflight;
- non-plain roots and symbol/extra keys rejected;
- exact scalar domains without coercion;
- `C <= N-1`, `C+H <= N-1`, `T <= N+1`;
- fixed relational owners and array order;
- correlated feasible count domains;
- placement ambiguity independent of input completeness;
- eight always-emitted, fully bound assumptions;
- four conditionally deterministic uncertainties;
- witness quantification across state × placement;
- draft outcomes restricted to `invalid` or non-numeric `policy_pending`; and
- arrival, departure, pace, C, T and H monotonic directions.

## Explicitly not frozen

No values in the ordinal monotonicity fixtures are a PolicyPack. v3 provides no
coefficient, capacity band, burden amount, transfer tax, classification
threshold, buffer formula, rounding rule, alert severity or service rule.

The following remain blocking for any numeric engine:

| Gate | Evidence required |
|---|---|
| Numeric policy | Immutable exact version, rationale, source owner and change process |
| Numeric schema | New stable `$id`, non-null exact policy version and model-contract bump |
| Golden results | Exact output snapshots for every numeric-capable fixture |
| Correctness | Bounded exhaustive oracle and optimized-evaluator equivalence |
| Performance | Approved time/memory ceiling, including all-unknown input |
| Localization | EN/ZH/KO dictionaries and stable-code parity |
| Runtime privacy | Traps for network, storage, logs, analytics, crash payloads and URL state |
| Product readiness | Security, accessibility, value, search and commercial review |
| Publication | Separate explicit central authorization |

## Future numeric schema rule

If central later approves a PolicyPack, do not edit
`draft-outcome.schema.json` to accept it. Create a new numeric outcome schema
with a new `$id` and a bumped model version. The new schema must require one
exact non-null PolicyPack version. It must also encode or semantically enforce:

- every range `min <= max`;
- every joint classification is unique, canonical and reconciles to calendar
  days;
- gross burden, applied tax, baseline and net accounting identities;
- negative-zero normalization;
- all-unknown non-actionability;
- stable alert deduplication and precedence; and
- the state × placement trigger basis in `rules.md`.

## Fixture inventory

`internal-examples.json` contains four executed collections:

- named request/outcome/uncertainty scenarios;
- invalid input matrices, including JavaScript-only factories;
- trigger witness matrices; and
- ordinal monotonicity fixtures.

The test asserts exact ordered equality among a hard-coded required inventory,
the declared IDs and the executed IDs. It separately deep-compares each matrix's
fields, value factories and case count. It rejects unknown handler kinds and
contains no `eval`, dynamic expression or skip path.

## Privacy and surface boundary

This branch must contain no change under public page, component, API, Registry,
sitemap, metadata, schema-markup or product runtime paths. The test-only
qualitative harness does not retain inputs or results and has no network,
storage, log, analytics or URL-state operation.

Passing review means only that v3 is a reviewable internal contract. It does
not mean a Route Reality Checker may be implemented or published.

**Requested outcome:** employee 8 technical re-review.
