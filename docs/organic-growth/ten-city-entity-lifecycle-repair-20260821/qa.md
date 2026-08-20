# Lifecycle-repair QA

Baseline: `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`

Branch: `codex/employee-2-ten-city-entity-lifecycle-repair-20260821`

This file records only commands actually run in the repair worktree. It does
not inherit pass claims from commit `6e7dde45`.

## Static scope audit

| Assertion | State |
|---|---|
| Worktree started clean at the exact merged PR #74 baseline | PASS |
| Seven published registry IDs remain exact | PENDING test |
| Hangzhou/Zhangjiajie keep non-null 2026-08-20 publication dates | PENDING test |
| Chongqing/Guilin/Shenzhen remain outside runtime/discovery | PENDING test |
| Ten city entities have one valid administrative chain | PENDING test |
| Tests do not inspect the old adapter as mapping authority | PENDING review |

## Commands

| Command | Result |
|---|---|
| Targeted lifecycle/entity tests | PENDING |
| `npm run test:inquiry` | PENDING |
| `npm run typecheck` | PENDING |
| `npm run build` | PENDING |
| `npm run check:search-platform-export` | PENDING |
| Sitemap count and route-presence assertion | PENDING |
| `git diff --check` | PENDING |

## Required build assertions

The export audit must prove:

- 21 seven-city destination `index.html` files exist;
- Hangzhou and Zhangjiajie account for six of those files;
- all 21 are self-canonical, indexable and present in `sitemap.xml`;
- none of the nine possible Chongqing/Guilin/Shenzhen destination files exists;
- none of those nine blocked URLs appears in the sitemap;
- the PR #74 release snapshot contains 649 sitemap `<loc>` entries.

The 649 count is a dated baseline, not a permanent invariant after later
content releases.

## Manual work still outside this branch

- browser click-through and 320 px visual regression;
- live HTTP checks after central deploy;
- employee 8 mapping-policy integration tests;
- source-snapshot creation for the new administrative records;
- full reciprocal-link rollout;
- Hangzhou/Zhangjiajie visual-depth production.
