# Southwest route cluster — central release review (2026-09-01)

## Decision

- `clusterBoundaryApproved: true`
- `reservedOverlapResolved: true`
- `searchMapApproved: true`
- `indexablePagesAuthorized: true`
- `mergeOrder: validate the three content identities and the Search Map rebinding together on one current-main central branch`
- `blockingRevisions: []`
- `deploymentAuthorized: false`

This record authorizes the three canonical identities to enter final owner review. It does not record a merge, deployment, live URL or Google indexing result.

## Base and source integrity

- Central base: `origin/main@c13d83e1abc8f5f25ee2250de11eed8c424a0196`.
- The reported source branch `article/chengdu-chongqing-zhangjiajie-cluster-20260901` and reported commit `bd1c02994d85deeb2ba6f1c3e69f4310c85ade38` were absent from fetched remote refs, local refs and recoverable repository objects. This release candidate is not represented as a recovery of that missing commit.
- `chengdu-chongqing-station-pair` was recovered from `origin/article/worker-1-transport-scale-20260822@1a841869ffaa5c2babf94e82ae8517c90e6cd795` and centrally rewritten.
- `chongqing-zhangjiajie-transport-route` was recovered from `origin/article/ox-alpha-chongqing-zhangjiajie-transport-route-20260822@19ce51ca0504870a9d71d1f1e9b09029896ed6d4` and centrally rewritten.
- `chengdu-chongqing-zhangjiajie-route-order` was rebuilt on the central branch against the approved N=3 boundary.

## Canonical identities and boundaries

1. `chengdu-chongqing-zhangjiajie-route-order` owns only the three-city inclusion, direction, useful-day/night allocation and cut-one-city decision.
2. `chengdu-chongqing-station-pair` owns the dated, bidirectional Chengdu–Chongqing ticketed station pair and hotel-to-hotel execution. It does not freeze station-service lists or duplicate generic Chongqing wrong-station recovery.
3. `chongqing-zhangjiajie-transport-route` owns the dated ticketed Chongqing node to Zhangjiajie West and already-chosen hotel address in either direction, without assuming operational symmetry.

The former proposal alias `chengdu-chongqing-transport-route` is retired. No fourth Chengdu–Zhangjiajie direct page was created. Generic Chongqing station choice, wrong-station recovery, Zhangjiajie hotel-base choice and national rail procedure remain with their existing owners.

## Dynamic facts reviewed

Review date for all three guides: `2026-09-01`.

- Live rail searches and the final dated endpoint pair remain subject to China Railway 12306.
- The Chongqing Municipal Government notice dated 2026-01-22 is used only as dated evidence that the Zhangjiajie West–Chongqing East service was added in that timetable adjustment; it is not presented as today's timetable.
- The China Railway notice dated 2026-07-10 is used only as dated evidence that temporary service patterns can change.
- The China Railway notice posted 2026-08-25 covered temporary additions from 2026-08-26 to 2026-09-30 overall; the cited Chengdu East–Chongqing North additions were limited to 2026-08-28 through 2026-08-30. All three locale labels state that distinction.
- No fixed fare, departure time, duration, platform, station entrance, taxi availability, bus schedule or hotel reception promise is published.

## Images and provenance

All three heroes are real photographs. AI-generated and AI-assisted images: `0 / 3`.

| Guide                           | Website asset                                                                                                                                        | Original source                                                                                                                                                        | Rights basis                                                                           | Use boundary                                                                                                                                                 |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Three-city route order          | `public/images/guides/chengdu-chongqing-zhangjiajie-route-order/hero-1600.webp` (`4fcdbce160c72c08bc12f40cd8f246f787b4009729d8e12674a6dd2e203601a7`) | `/Users/yangchunxuan/Desktop/Facebook图片素材/重庆优选素材/05_重庆桥梁与城市交通/重庆北站_01.jpg` (`725fef9706cd8e6e19ef4466da2f75058e1072a056b740ee7db2defe2db0920a`) | Project-owner-authorized Homeground local library use; not independent copyright proof | Shows Chongqing North North Square only; not the whole three-city route. Re-clear before ads, print, resale or partner use.                                  |
| Chengdu–Chongqing station pair  | `public/images/guides/chengdu-chongqing-station-pair/hero-1600.webp` (`b1fefabfea85de835cffb6888d899dbe517600ba620e065a01678d09379268dd`)            | Wikimedia Commons, _Chengdu East Railway Station.JPG_, Fxqf (`bd7ab439dfcdca357f01e4928c0febc06ac381f2997f8ff99700faf5483375e9`)                                       | CC BY-SA 3.0                                                                           | Identifies Chengdu East only; does not prove current service.                                                                                                |
| Chongqing–Zhangjiajie transport | `public/images/guides/chongqing-zhangjiajie-transport-route/hero-1600.webp` (`5e22b15fe7c289f5383b25a0a9ac1760e06b13f54302d341ff7c378623d43a05`)     | Wikimedia Commons, _Wulingyuan, Zhangjiajie, Hunan 20230702.jpg_, 颐园居 (`8cec249aad0695295a7130506b01c8eca5f3ec8abb960b36013e5db62e603f83`)                          | CC BY-SA 4.0                                                                           | Destination context only; does not prove any transport operation. The website derivative is a source-only 16:10 crop with no generated fill or letterboxing. |

The three source hashes appear once each in `docs/homeground-photo-provenance.md`; no already-recorded primary image was reused for this cluster.

## Verification results

- Guide structure: PASS — 176 independent guide folders.
- Content manifest check: PASS — 0 generated manifest entries, as expected for this repository path.
- Trilingual structure and internal-link parity: PASS — station pair 27 blocks / 7 links per locale; route order 26 / 8; Chongqing–Zhangjiajie 23 / 5.
- TypeScript: PASS.
- Full inquiry tests: PASS — 663 passed, 0 failed, 0 skipped.
- Production build: PASS — 813 static pages generated and 800 final HTML files retained after pruning.
- Font source/export coverage: PASS for Chinese and Korean interface/editorial subsets.
- Indexable export: PASS — 12 priority targets.
- Search-platform export: PASS — 27 section hubs, 81 collection hubs, 3 guide search routes, 3 homepage search indexes and 3 Evan profiles; all indexable internal href/src targets resolved.
- High-intent CTA ownership: PASS — 67 unique identities; 16 existing-service mappings, 2 generic-conversation mappings, 49 blocked pending authorization. No public service or CTA was added.
- `npm audit --omit=dev`: PASS — 0 vulnerabilities.
- Prettier and `git diff --check`: PASS.
- Index-cohort freshness gate: NOT RUNNABLE AS CURRENT EVIDENCE — the checked-in GSC snapshot is more than seven days old at the explicit 2026-09-01 as-of date. The checker failed closed with `STALE_GSC_SNAPSHOT`; no assertion was weakened and no indexing state was fabricated.

## Sitemap and browser acceptance

- `origin/main` production baseline: 749 unique sitemap URLs.
- Candidate build: 759 unique sitemap URLs, 0 duplicates.
- Content addition: 9 locale guide URLs for 3 canonical identities.
- Derived addition: `/guides/page/9/`, created automatically when the guide listing crosses its pagination threshold. It is not a fourth content identity.

Browser acceptance: PASS for all 9 locale pages at desktop 1440×1000 and mobile 390×844 (`18 / 18` page states).

- Correct `en`, `zh-Hans`, `ko` and `x-default` alternates and self-canonicals.
- EN / 中文 / 한국어 entry links present.
- All heroes loaded at natural size 1600×1000.
- Sources present and closed by default.
- No page-level horizontal overflow at either viewport; mobile tables remain contained in their scroll wrappers.
- H1 fonts match the current editorial system: Georgia/Times for English, Homeground Serif SC for Chinese and Homeground MaruBuri for Korean.
- Browser console errors: 0.

## Scope confirmation

- Homepage changed: no.
- Route Reality changed or restored: no.
- Fourth Southwest route page created: no.
- Public service, service ID or booking promise created: no.
- Main merged or deployed: no.

Final state: `SOUTHWEST ROUTE CLUSTER — CENTRAL DECISION RECORDED`.
