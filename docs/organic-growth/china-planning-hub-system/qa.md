# China planning Hub system — package QA

**State:** central review required

**Public implementation in this branch:** none

## Canonical and delivery checks

- [x] `system-guides` is the only China Travel Guide owner.
- [x] `hub-plan` is the only China Itinerary / First Trip to China owner.
- [x] Both packages say “update existing Hub — no new canonical URL.”
- [x] The three plan collections remain children rather than head-term competitors.
- [x] Route Review, Route Build and Full Trip intent remains with `/china-itinerary-review/`.
- [x] No homepage, Registry, Search Map, sitemap, manifest, indexability or live Hub code is edited by this package.
- [x] PR #74 is treated as merged-main evidence; no PR branch is cherry-picked.
- [x] Search Map post-merge inventory drift is recorded for central governance cleanup.

## Content checks

- [x] Two complete English, Simplified Chinese and Korean Hub drafts are present.
- [x] Each locale preserves the same decisions, warnings, user path and CTA boundary.
- [x] Hubs route to narrow owners instead of copying their detailed bodies.
- [x] Entry, destinations, trip length/order, transport, accommodation, pace, holidays, tickets and human support are connected.
- [x] No city × month × duration × traveller-type URL is proposed.
- [x] No universal itinerary, live inventory, unsupported time saving or crowd index is invented.

## Route Reality checks

- [x] Schema parses and enforces an exact seven-field request.
- [x] Cross-city moves, extra hotel changes and complex interchanges have non-overlapping semantics and relational validation.
- [x] Unknown inputs are enumerated as correlated valid scenarios rather than independent endpoint arithmetic.
- [x] Joint day classifications reconcile with calendar days.
- [x] Gross burden, applied tax and net sightseeing are separate outputs.
- [x] Valid and invalid outputs form a discriminated union with stable codes, model version and a required null policy-pack gate.
- [x] All-unknown input is non-actionable and returns no numeric buffer recommendation.
- [x] Forty-one internal examples cover boundaries, invalid input, unknowns, topology, determinism and non-calculable handoff questions.
- [x] No public UI, API, route, index URL, persistence, analytics or network dependency is authorized.

These checks describe the documentation contract, not an approved numerical engine. The policy pack, golden numerical outputs and public-product authorization remain open gates.

## Final commands

Run from the latest-main worktree and report exact results:

```text
node --test supabase/tests/china-planning-hub-system-static.test.mjs
node --test supabase/tests/china-itinerary-too-rushed-static.test.mjs supabase/tests/paid-service-pathways-static.test.mjs supabase/tests/search-platform-static.test.mjs
npm run guide:generate
npm run content:check
npm run typecheck
npm run build
git diff --check
```

If `guide:generate` changes shared generated files, use the latest-main version for verification but do not include those generated changes in this branch. Shared font subsets likewise belong to central integration if rendered Hub copy adds glyphs.

## Recorded final verification — 2026-08-20

| Check | Result |
|---|---|
| Package static tests | PASS — 6/6 |
| Adjacent planning, service-pathway and Search Platform regressions | PASS — 17/17 |
| `npm run guide:generate` | PASS — 157 independent guide folders verified; two temporary files generated |
| `npm run content:check` | PASS — zero manifest entries verified after a temporary local regeneration; the generated manifest is excluded from this branch |
| `npm run typecheck` | PASS |
| `npm run build` | PASS — 694 static pages generated; export contract and internal-link checks passed |
| Chinese and Korean font coverage during build | PASS — no shared font file is included in this documentation branch |
| Package link resolution | PASS — 144 Markdown links, 78 unique internal paths, zero unresolved paths |
| JSON and schema integrity | PASS — five JSON documents parsed; all 31 local schema references resolved |
| Markdown structure | PASS — no malformed table, replacement character or trailing-space finding |

The final staged diff must still pass `git diff --cached --check` after only the package and its static test are staged. The existing `MODULE_TYPELESS_PACKAGE_JSON` Node warning is non-fatal and outside this documentation-only scope.
