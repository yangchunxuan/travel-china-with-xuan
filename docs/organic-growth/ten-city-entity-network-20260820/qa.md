# Ten-city entity network QA

Checked: **2026-08-20 (Asia/Shanghai)**

Branch base: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`

PR #74 final head: `b66fc6cbca6f040a65db0d7e3727e3b2dac24580`, merged in the branch base above

This log distinguishes checks run on this branch from dated production observations and from checks reported by PR #74. A green PR check, a loader in main, or a published entity record is not treated as proof that a City Hub has formal release approval.

## Branch checks

| Check | Result | Evidence and boundary |
|---|---|---|
| `node --test supabase/tests/destination-discovery-static.test.mjs supabase/tests/destination-hub-static.test.mjs` | PASS — 12/12 | Confirms seven authored definitions, five `published`, two `release-candidate`, public routes/discovery use only the published selector, and Gate B does not promote a candidate. |
| `node --test supabase/tests/ten-city-entity-network-static.test.mjs` | PASS — 3/3 | Confirms unique ten-city IDs, correct municipality/province parents, explicit Hub state, all ten destination-token mappings and the required scoped planning-node fields. |
| `npm run guide:generate` | PASS | Verified 157 independent guide folders and regenerated only temporary registry output. |
| `npm run content:check` | PASS | Verified the current generated content manifest. |
| `npm run typecheck` | PASS | Ran after `guide:generate`; the worktree used a temporary `node_modules` junction to the repository's existing dependency install. The junction is not a tracked deliverable and must be removed before handoff. |
| `npm run build` | PASS | Prebuild verified 157 independent guide folders, content manifest, source-font coverage and planning-scope lines. Next compiled, type-checked and exported 688 static pages. Postbuild pruning, production font coverage and `check:search-platform-export` passed. |
| Public-route export gate | PASS | Build output generated five default-language destination paths and ten localized paths: Beijing, Shanghai, Xi'an, Chengdu and Guangzhou only. A separate filesystem assertion found all 15 expected routes present and all 15 withheld-city routes absent. |
| Sitemap lifecycle gate | PASS | A postbuild assertion found every formally published city in `out/sitemap.xml` and none of the five withheld cities. |
| `git diff --check` | PASS | Returned exit code 0 after the final documentation edits. Line-ending conversion notices are Git warnings, not whitespace errors. |

The full `npm run test:inquiry` suite was also attempted. It did not pass: 3 tests failed and the remaining tests passed. The failing files were not modified by this branch:

- `china-itinerary-with-older-parents-static.test.mjs` expects an older hand-written registry shape that the current generated registry no longer uses;
- two `inquiry-intake-canary.test.mjs` assertions depend on the local `jq`/line-ending environment and failed under this Windows worktree.

These failures are reported, not silently reclassified as passing. The branch-specific lifecycle and entity tests above pass, and the production build passes.

## Dated live-site and PR observations

- A production probe during the audit returned `200` for EN/ZH/KO pages of the five formally published cities, 15/15 total. The returned HTML contained the expected locale copy and city Hero, so these were not soft fallbacks.
- The same probe returned `404` for Hangzhou, Zhangjiajie, Chongqing, Guilin and Shenzhen, 15/15 total.
- The 15 images used by the five published Hubs returned `200`; the reused Hangzhou and Zhangjiajie candidate Hero URLs also returned `200`.
- PR #74's Quality checks passed at its reviewed heads. PR #74 then merged while this audit was running, creating the reason for the explicit lifecycle gate in this branch.
- These are dated observations. No deployment or post-deployment probe was performed by this branch.

## Entity and canonical QA

- Beijing, Shanghai and Chongqing are modelled as direct-administered municipalities under China; no duplicate province node is invented.
- Xi'an, Chengdu, Guangzhou, Shenzhen, Zhangjiajie and Hangzhou now resolve through Shaanxi, Sichuan, Guangdong, Hunan and Zhejiang respectively.
- Guilin resolves through Guangxi Zhuang Autonomous Region, represented by the validator-supported `province` type plus `administrativeKind: autonomous-region`.
- Entity status remains separate from destination-page lifecycle. A `published` entity record means the knowledge-graph entity is usable; it does not create a route.
- The core entity records still have empty structured `sourceIds`. Official evidence is logged in `source-log.md`, but source snapshots have not yet been retrieved, hashed and attached. This is an explicit central-review debt; this branch does not claim that structured administrative-source materialisation is complete.
- The internal graph supplies attraction clusters, normalized gateway handles, stay areas, route pairs, FAQs and planning entrypoints for all ten cities. These arrays define planning-only handles rather than dangling runtime entity references. `outerBranches` records the real administrative host and the visitor-planning relation where a place could otherwise be misattached to the central city.
- No second `place-*` canonical alias was added. The legacy Search Map overlay still contains stale `place-shanghai` / `place-shenzhen` references and country-only rows for some owners; the remediation is documented for central follow-up rather than mixed into this scoped patch.

## Link QA

- Hub → owner links are inventoried for all ten cities in `hub-gaps.md`.
- Literal owner → Hub backlinks currently exist only for part of the published set: Beijing 4/11, Shanghai 3/8, Xi'an 3/6, Chengdu 3/7 and Guangzhou 3/6; Hangzhou and Zhangjiajie have 0 at audit time.
- This branch records the backlink contract but does not edit 41 support articles. Candidate or blocked Hub URLs must not be inserted as live links.
- No browser click-through or 320 px visual regression was run on this branch. Central should perform those checks when promoting a candidate or applying the backlink batch.

## Image QA

- The five published Hubs retain real Heroes permitted for Homeground-project use or covered by an open licence, plus two body images each. No AI documentary image or cross-city substitute was added. Exact sub-location proof remains incomplete for the two cases below, so this is not a blanket location-accuracy clearance.
- Beijing's Great Wall image remains deliberately generic because the exact wall section is not proved; it cannot evidence Mutianyu or Badaling.
- Chengdu's Jinjiang image remains labelled as central river environment because the exact bridge identity is not proved; it cannot evidence a named bridge.
- Hangzhou and Zhangjiajie remain asset-thin release candidates. Their reused Heroes cannot prove entrances, station choices, ticket systems or neighbourhood geography.
- Chongqing, Guilin and Shenzhen image files remain candidates or gaps, not production assets. The precise author/licence/crop/hash work listed in `image-plan.md` remains mandatory before release.

## Release decision

- Maintain public status: Beijing, Shanghai, Xi'an, Chengdu and Guangzhou.
- Keep as release candidates: Hangzhou and Zhangjiajie.
- Keep docs-only and release-blocked: Chongqing.
- Keep blocked: Guilin and Shenzhen.

No PR was created, no branch was merged and nothing was deployed.
