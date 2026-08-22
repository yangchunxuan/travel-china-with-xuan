# Worker 3 culture scale batch — publication QA gate

Status: `HOLD — CENTRAL PUBLICATION REVIEW REQUIRED`

Branch: `article/worker-3-culture-scale-20260822`

This record covers the ten culture-guide identities in this batch. They are durable drafts, not published pages, and this document does not authorise release.

## Metadata date gate

`DATE_GATE_STATUS: HOLD`

All ten `metadata.json` files currently contain the same three draft placeholders:

- `datePublished: 2026-08-20`
- `dateModified: 2026-08-20`
- `sourceReviewedDate: 2026-08-20`

Central must not publish any of the ten identities with those three placeholders unchanged. On the real release workflow:

1. set `datePublished` to the actual first-publication date;
2. set `dateModified` to the actual release revision date;
3. advance `sourceReviewedDate` only after the page's official sources have actually been reopened and every required dynamic fact has passed its publication gate.

Changing a date without completing the source review does not pass this gate. A failed or inaccessible official source leaves the affected guide `HOLD`.

## Per-guide publication gates

The following eight guides now carry the mechanically recognisable markers `PUBLICATION_GATE_STATUS`, `PUBLICATION_GATE_TIMING` and `PUBLICATION_GATE_ACTION` in their own `dynamic-facts.md` files:

- `guangzhou-chen-clan-academy-craft-reading`
- `jingdezhen-imperial-kiln-museum-archaeology`
- `nanjing-jiangnan-gongyuan-examination-museum`
- `ningbo-tianyi-pavilion-private-library`
- `pingyao-rishengchang-draft-bank-network`
- `qufu-three-confucian-sites-route`
- `shenyang-imperial-palace-three-route-reading`
- `turpan-karez-museum-water-system`

The existing publication-gate language for `du-fu-thatched-cottage-literary-memorial` and `xian-stele-forest-text-calligraphy-rubbings` is retained unchanged in this patch.

## Central pass condition

For each guide, central must reopen the named official/operator sources before publication or on the actual publication day, verify opening and reservation arrangements, ticket or ID rules, exhibitions, conservation or restoration status, and relevant visitor restrictions, then record the real check date. Any unverified required item means `HOLD`, not assumed approval.

This QA gate changes no body copy, canonical slug, image, Registry, sitemap, shared generated file or public page.
