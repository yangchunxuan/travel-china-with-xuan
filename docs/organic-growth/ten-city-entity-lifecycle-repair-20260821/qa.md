# Lifecycle-repair QA

Baseline: `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`

Branch: `codex/employee-2-ten-city-entity-lifecycle-repair-20260821`

This file records only commands actually run in the repair worktree. It does
not inherit pass claims from commit `6e7dde45`.

## Static scope audit

| Assertion | State |
|---|---|
| Worktree started clean at the exact merged PR #74 baseline | PASS |
| Seven published registry IDs remain exact | PASS |
| Hangzhou/Zhangjiajie keep non-null 2026-08-20 publication dates | PASS |
| Chongqing/Guilin/Shenzhen remain outside runtime/discovery | PASS |
| Ten city entities have one valid administrative chain | PASS |
| Tests do not inspect the old adapter as mapping authority | PASS |

## Commands

| Command | Result |
|---|---|
| `node --test supabase/tests/destination-discovery-static.test.mjs supabase/tests/destination-hub-static.test.mjs supabase/tests/ten-city-entity-lifecycle-repair-static.test.mjs` | PASS — 14/14 |
| `npm run test:inquiry` | FAIL — 3 Windows portability assertions still fixed only on employee 8's unmerged branch; all lifecycle-repair tests passed |
| `npm run typecheck` | PASS |
| `npm run build` | PASS after the repository generator refreshed the content-manifest check state |
| `npm run check:search-platform-export` | PASS, both in postbuild and as a separate command |
| `npm run check:indexable-export` | PASS — 12 priority targets |
| Sitemap count and route-presence assertion | PASS — 649 locs, 21 published exports, 6 Hangzhou/Zhangjiajie exports, 9 blocked-route absence checks |
| `git diff --check` | PASS |

## Full inquiry exceptions

The full suite was run; it was not reported as green:

1. `china-itinerary-with-older-parents-static.test.mjs` — one test parses the
   generated registry with a stale source-layout assumption and cannot find the
   existing entry.
2. `inquiry-intake-canary.test.mjs` — one jq-spawn assertion receives `null`
   on this Windows environment.
3. The same canary file has one LF-only regex that does not accept CRLF.

The three failures arise from LF-only parsing and missing-jq handling in the
current-main tests on this Windows worktree. Employee 8's unmerged
technical-foundation commit contains the corresponding portability changes.
They are outside this entity-lifecycle repair, so this branch records the
integration dependency rather than copying overlapping test fixes.

## Build recovery record

The first build stopped at `content:check` because changing the entity registry
made the generated-manifest check state stale. The repository's official
`npm run content:generate` command was run, followed by a successful
`npm run content:check` and a complete production build. The generated file has
no semantic Git diff after normalisation.

## Required build assertions

The export audit must prove:

- [x] 21 seven-city destination `index.html` files exist;
- [x] Hangzhou and Zhangjiajie account for six of those files;
- [x] all 21 are self-canonical, indexable and present in `sitemap.xml`;
- [x] none of the nine possible Chongqing/Guilin/Shenzhen destination files exists;
- [x] none of those nine blocked URLs appears in the sitemap;
- [x] the PR #74 release snapshot contains 649 sitemap `<loc>` entries.

The 649 count is a dated baseline, not a permanent invariant after later
content releases.

## Manual work still outside this branch

- browser click-through and 320 px visual regression;
- live HTTP checks after central deploy;
- employee 8 mapping-policy integration tests;
- source-snapshot creation for the new administrative records;
- full reciprocal-link rollout;
- Hangzhou/Zhangjiajie visual-depth production.
