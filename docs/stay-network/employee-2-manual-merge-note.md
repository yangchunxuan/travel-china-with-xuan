# Employee 2 destination-Hub manual merge note

Prepared: 2026-08-21 (Asia/Shanghai)

Stay-network baseline: `origin/main` `ef189874`

Observed Employee 2 ref: `origin/codex/employee-2-ten-city-entity-network-20260820`
at `6e7dde45149e7ee33b4570df9f2fd899c2742ef0`

The observed Employee 2 branch adds a lifecycle layer to
`lib/destinationHubs.ts`, but its snapshot predates the completed PR #74
release. It marks Hangzhou and Zhangjiajie as `release-candidate` with null
`datePublished` values. That state is no longer true and must not be restored.

## Seven-Hub invariant

After any manual merge, the published registry must contain exactly these seven
IDs, once each:

`beijing`, `shanghai`, `xian`, `chengdu`, `guangzhou`, `hangzhou`,
`zhangjiajie`.

Hangzhou and Zhangjiajie must remain published with their existing non-null
`datePublished: "2026-08-20"`, trilingual runtime bodies and public paths.
Their factual `sourceReviewedDate` remains `2026-08-20` unless a later complete
source review is documented.

## Manual integration procedure

1. Start from the then-current main, not from Employee 2's older registry file.
2. Keep this split branch's seven Hub entries and 2026-08-21 `dateModified`
   changes for edited public copy.
3. If central wants Employee 2's lifecycle types/helpers, port the type and
   helper hunks manually. Set the lifecycle of all seven existing entries to
   `published`; do not copy the two stale `release-candidate` values or null
   publication dates.
4. Reconcile `destinationHubRuntime.ts`, destination route guards and discovery
   tests as one unit. A helper that filters “published” Hubs must return all
   seven IDs.
5. Preserve PR #74 content and this branch's Hub/owner text; do not take a
   wholesale version of `lib/destinationHubs.ts` from either historical branch.
6. Regenerate guide/content indexes and rerun the destination-Hub, indexable,
   search-export, typecheck, build and 320px browser checks after the merge.

## Minimum merge assertions

- seven unique registered Hub IDs and seven published IDs;
- 21 public Hub paths (seven cities × EN/ZH/KO);
- no `release-candidate`, `not-published` or null `datePublished` state for
  Hangzhou or Zhangjiajie;
- no grouped destination ID substituted for an exact city;
- no dropped support-owner links or trilingual runtime body;
- no change to factual review dates caused only by lifecycle or copy edits.

The Employee 2 ref may advance. Central should re-diff its final repair commit
against the integration base and apply the same invariants rather than relying
on the observed hash above.
