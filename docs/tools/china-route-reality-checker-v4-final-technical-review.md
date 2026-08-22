# China Route Reality Checker v4 final technical review

Status: **TECHNICAL SPEC REVIEW PASSED — PUBLIC PRODUCT SUBSEQUENTLY REJECTED / CLOSED**

Current decision overlay (2026-08-23): this document records the successful
2026-08-21 technical review of an internal, non-numeric contract. Central later
rejected the public Route Reality product and authorized no further work. The
internal specification remains evidence only; the older conditional approval
language below is historical and is not an open implementation gate.

Review ticket: `ROUTE-REALITY-V4-FINAL-REVIEW-03`

Reviewer: Homeground worker 8 (technical feasibility and test review)

Review date: 2026-08-21

Reviewed source: `article/worker-4-route-reality-v4-test-closure-20260821@9f88336e2ea8de8da28b7ffa0dc4f3628039b909`

Reviewed parent: `ae493871f2baaff9e14dde1bddd2aab0f7795e17`

Prior review: `codex/route-reality-v3-technical-review-20260821@20d24eecb95ed0c802976f1a8bff4bfaf53dde9c`

The reviewed commit is the direct child of the stated v3 parent. This review
checked the exact v4 files and reran the attacks independently; it does not use
worker 4's closure claims as acceptance evidence.

## 1. Decision

All five blocker classes from the prior review are mechanically closed for the
current **non-numeric internal contract**. Both real JSON Schemas are compiled
and exercised by the permanent test, the golden ownership contracts are
independent of the artifacts under test, canonical output semantics are frozen,
and every required external mutation replay failed the suite.

| Decision | Result |
|---|---|
| bounded non-numeric specification technically feasible | **yes** |
| five prior blocker classes mechanically closed | **yes** |
| non-numeric contract test model sufficient | **yes** |
| surviving required mutation | **none found** |
| numeric `PolicyPack` approved | **no** |
| golden numeric outputs available | **no** |
| performance/oracle equivalence proved | **no** |
| EN/ZH/KO localization dictionaries ready | **no** |
| `publicImplementationAuthorized` | **false** |
| `indexablePageAuthorized` | **false** |

Passing this review does not authorize a calculator, engine, API, page,
component, telemetry, registry, sitemap entry, metadata, structured-data markup
or deployment.

## 2. Exact scope and public-boundary audit

The parent-to-target diff contains exactly ten files:

1. seven internal Route Reality specification files under
   `docs/organic-growth/china-planning-hub-system/route-reality/`;
2. one internal contract test,
   `supabase/tests/route-reality-v3-spec.test.mjs`;
3. `package.json`, adding exact development dependency `ajv:8.17.1`; and
4. `package-lock.json`, adding the matching Ajv development dependency and its
   transitive lock records.

There are zero changed files under `app`, `pages`, `api`, `components`, `lib` or
`public`, and zero runtime route, Registry, sitemap, metadata, telemetry,
persistence or public-schema changes. The lockfile's `hasInstallScript` metadata
reflects the already-existing repository `postinstall`; v4 did not add a new
install script.

## 3. Five-gate reassessment

| Gate | Mechanical evidence | Decision |
|---|---|---|
| 1. real strict schemas plus JS-only preflight | The permanent suite imports Ajv's Draft 2020-12 entry point, compiles both files with `strict:true`, `strictTuples:true`, `allErrors:true`, and executes shared positive/negative fixtures. Class and symbol cases remain preflight-owned; null-prototype input is accepted. | **Closed** |
| 2. independent full inventory and ownership golden | Test-owned constants are not generated from the catalog or fixtures. Catalog, schema extraction, builders and fixtures are compared independently. Extras and duplicates fail. | **Closed** |
| 3. canonical errors, ownership and trigger signatures | Full error records and priority are frozen; reversed output is schema-valid but semantic-invalid. Trigger signatures preserve vector length and ordered bits, including asymmetric witnesses. | **Closed** |
| 4. full monotonic negative contracts | All ten negatives freeze `{id,axis,metric,direction,mutation,expectedViolation}`; every negative requires one nonempty violation and the validator must return exactly that singleton. | **Closed** |
| 5. adversarial mutation resistance | Every required source-artifact mutation was replayed in an isolated worktree. Every run exited nonzero; no required mutant survived. | **Closed** |

## 4. Schema, preflight and shared-fixture evidence

The permanent test loads `request.schema.json` and
`draft-outcome.schema.json` from disk and compiles fresh validators with:

```js
new Ajv2020({ strict: true, strictTuples: true, allErrors: true })
```

The reviewed baseline passes strict compilation for both roots. A separate
one-off strict harness independently produced:

```text
JSON parse: 4/4
Ajv strict compile: 2/2
known valid request: true
output-shaped request: false
```

JSON-domain scenarios and matrices execute against the actual schemas and the
semantic/preflight layer. Relationally invalid but structurally valid requests
are deliberately `schema=true, semantic=false`, and their canonical invalid
outcomes validate against the outcome schema.

The JavaScript-only boundary is also explicit:

- exact-seven-field class instance: schema accepts, preflight rejects;
- exact-seven-field `Object.create(null)`: schema and preflight accept;
- symbol extra: schema cannot observe it, preflight rejects; and
- Date, Map, Set, arrays, boxed primitives, class instances and null are covered
  by the non-plain-root matrix.

## 5. Inventory, ownership and trigger evidence

The independent golden audit reconciles:

- 8 catalog assumptions with 8 schema assumption records;
- 4 uncertainty catalog entries, 4 schema definitions, 4 enum values and 4
  terminal uncertainty contracts;
- 10 catalog validation-error ownership records with 9 schema arms, where one
  arm intentionally expands the two count-scalar error families;
- 42 scenarios, 5 matrix groups, 6 trigger witnesses and 11 monotonic fixtures;
  and
- 56 local schema references across 22 referenced definitions with no dangling
  `$ref`.

All non-policy uncertainty sources are nonempty and limited to the seven
request fields. `TRIGGER_EVALUATION_BLOCKED_BY_POLICY` is the sole intentional
empty source record.

Canonical errors freeze code, field, rule ID, related fields, offending-key
mode and phase priority. Builder outputs are compared with independent expected
records. Trigger state signatures use `<length>:<ordered bits>`; they do not
collapse to `some/every`. The asymmetric matrix
`[[false,true],[true,false]]` is mechanically distinguished and golden-frozen.

## 6. Monotonic contract evidence

The test owns a complete independent record for the valid baseline and all ten
negative contracts. It freezes:

- arrival capacity;
- departure capacity;
- pace capacity and burden;
- cross-city capacity and burden;
- interchange capacity and burden; and
- hotel-change capacity and burden.

Every negative fixture must own `expectedViolation`, must be unique by
axis/metric/direction, and must produce exactly
`[fixture.expectedViolation]`. Rebinding the arrival ID to a duplicate departure
case no longer preserves nominal coverage.

## 7. Independently replayed mutation ledger

These were real one-change source/artifact mutations in detached temporary
worktrees, followed by the same target command. The baseline was restored and
rerun after each batch.

| Mutation | Target-suite result | Gate |
|---|---:|---|
| widen pace enum with `Balanced` | exit 1; 68 pass / 4 fail | killed |
| widen `PolicyPendingOutcome.result` | exit 1; 66 pass / 6 fail | killed |
| widen `InvalidOutcome.result` | exit 1; 68 pass / 4 fail | killed |
| drift catalog uncertainty rule ID | exit 1; 63 pass / 9 fail | killed |
| drift catalog uncertainty source mode | exit 1; 70 pass / 2 fail | killed |
| relax schema uncertainty source minimum | exit 1; 68 pass / 4 fail | killed |
| drift scalar error owner rule | exit 1; 70 pass / 2 fail | killed |
| drift scalar canonical priority | exit 1; 70 pass / 2 fail | killed |
| reverse builder scalar emission order | exit 1; 70 pass / 2 fail | killed |
| reduce trigger signature to a summary bit | exit 1; 67 pass / 5 fail | killed |
| rebind arrival negative to departure | exit 1; 68 pass / 4 fail | killed |
| delete required `expectedViolation` | exit 1; 68 pass / 4 fail | killed |
| add undeclared error enum and schema arm | exit 1; 70 pass / 2 fail | killed |
| add undeclared uncertainty definition and terminal arm | exit 1; 70 pass / 2 fail | killed |

No mutation was accepted merely because an ID remained present. No required
mutant stayed green.

## 8. Executed checks

Only checks actually run are reported as run.

| Check | Command / method | Result |
|---|---|---|
| Commit identity | `git rev-parse`; parent inspection | PASS — target `9f88336e2ea8de8da28b7ffa0dc4f3628039b909`, direct parent `ae493871f2baaff9e14dde1bddd2aab0f7795e17` |
| Exact dependency install | `npm.cmd ci --ignore-scripts --no-audit` | PASS — 51 packages installed from the target lockfile |
| Ajv lock consistency | `npm.cmd ls ajv --depth=0` | PASS — exact `ajv@8.17.1` |
| Target contract suite | `node --test supabase/tests/route-reality-v3-spec.test.mjs` | PASS — 72/72, 0 failed/skipped |
| Adjacent static suites | rushed-guide, paid-pathways and search-platform tests | PASS — 17/17 |
| Target plus adjacent | combined four-file command | PASS — 89/89 |
| Node syntax | `node --check supabase/tests/route-reality-v3-spec.test.mjs` | PASS |
| TypeScript | `npm.cmd run typecheck` | PASS — generator verified 157 guide folders; `tsc --noEmit` exited 0 |
| JSON parsing | request, outcome, catalog and fixtures | PASS — 4/4 |
| Ajv strict compile | independent Draft 2020-12 harness | PASS — 2/2 roots |
| Production dependency audit | `npm.cmd audit --omit=dev --json` | PASS — 0 vulnerabilities, exit 0 |
| Full dependency audit | `npm.cmd audit --json` | **NOT ZERO** — 1 moderate direct dev-dependency advisory for Ajv 8.17.1, exit 1 |
| Full repository suite | `npm.cmd run test:inquiry` | **NOT A PASS** — 389 total, 386 passed, 3 failed |
| Parent reproduction | run the two failing test files at parent v3 | same 3 failures reproduced; they are not introduced by v4 |
| Target patch whitespace | `git diff --check <parent> <target>` | PASS |
| Review patch whitespace | `git diff --cached --check` | PASS |
| Scope allowlist | exact changed-path audit | PASS — 10/10 allowed, 0 public/runtime matches |

The three full-suite failures are:

1. `older-parents guide is registered as a localized planning guide`;
2. `the intake canary jq filter returns contract field names`; and
3. `the intake canary distinguishes a broken site from broken intake`.

The first is an existing registry expectation; the latter two are existing
Windows CRLF-sensitive canary assertions. The same three failures reproduce on
the v3 parent. They do not invalidate the isolated v4 result, but this review
does **not** claim a full repository pass.

## 9. Ajv advisory triage

Input: `GHSA-2g4f-4pwh-qvx6` / `CVE-2025-69873`, ReDoS when Ajv's `$data`
option is enabled.

Verdict for the reviewed exact commit: **not actionable as a current product
security path; high static confidence; non-blocking dependency-hygiene note**.

Exploitability stack rank: none (`not_actionable`).

Evidence and boundary assessment:

- Ajv 8.17.1 is affected and is a direct development dependency;
- the only repository import is the internal Route Reality test;
- Ajv is constructed with `strict`, `strictTuples` and `allErrors`, without
  `$data:true`;
- repository-wide static search outside `node_modules` finds no `$data` use;
- no app, API, page, deployment or other runtime imports Ajv; and
- the reviewed surface is a local test/fixture with trusted developer inputs,
  so no supported product security boundary is crossed.

No applicable repository `SECURITY.md` was found; that policy absence is a
recorded proof gap, not evidence of runtime exposure. The advisory's required
condition is nevertheless statically absent from every shipped path in this
exact diff.

`npm audit --omit=dev` is correctly zero, but full `npm audit` is not zero. The
[GitHub advisory](https://github.com/advisories/GHSA-2g4f-4pwh-qvx6) lists
versions below 8.18.0 as affected; npm currently proposes 8.20.0 as the available
non-major update. Upgrading to 8.20.0 is recommended before the next dependency
refresh or merge for clean full-audit hygiene. It is not a blocker for this
non-runtime specification decision because the vulnerable option is disabled
and unreachable from a public or runtime input.

## 10. Still-unapproved gates

The following remain outside this review and are not inferred from the passing
non-numeric contract:

| Gate | Current state | Evidence required later |
|---|---|---|
| Numeric `PolicyPack` | absent and unapproved | immutable schema, values, rationale, version and change control |
| Golden numeric outputs | absent | exact output bodies under one approved pack |
| Performance/oracle | unproved | bounded exhaustive oracle, optimized equivalence and time/memory ceiling |
| Localization | absent | EN/ZH/KO dictionaries, fallback and parity tests |
| Privacy/runtime | written boundary only | network, persistence, log, analytics, URL-state and crash-payload traps for any future engine |
| Product/search approval | withheld | separate central value and product-boundary review |
| Public implementation | false | explicit later central authorization |
| Indexable page | false | explicit later central authorization |

## 11. Final disposition

The v4 test-closure package meets the requested technical-specification bar.
There is no remaining required fake-green path in the supplied mutation set.
The Ajv full-audit advisory and the three pre-existing full-suite failures are
recorded without being misrepresented as passes.

`publicImplementationAuthorized=false`

`indexablePageAuthorized=false`

No PR, merge, deployment or production change is authorized by this review.

**TECHNICAL SPEC REVIEW PASSED — PUBLIC PRODUCT SUBSEQUENTLY REJECTED / CLOSED**
