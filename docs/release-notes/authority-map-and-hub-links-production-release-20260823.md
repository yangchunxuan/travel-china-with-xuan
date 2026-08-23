# Authority-map and Hub-link production release — 2026-08-23

Status: **DEPLOYED AND LIVE-VERIFIED**

Production read-back date: **2026-08-23 (Asia/Shanghai)**

This record covers the authority-link and ten-city reusable-map release. The
earlier [homepage city-discovery release](./homepage-city-discovery-production-release-20260823.md)
remains the historical record for the eight direct homepage destination-Hub
links.

## Release identity

| Field | Verified value |
|---|---|
| Pull request | [#96 — Link authority hubs and publish the ten-city map pack](https://github.com/yangchunxuan/travel-china-with-xuan/pull/96) |
| Runtime merge SHA | `0031b17b7f2ecbf4d4a192a2d8422cc6dff538df` |
| Merged | `2026-08-23 13:10:25 +08:00` |
| Pages deployment | [Run 32619692635](https://github.com/yangchunxuan/travel-china-with-xuan/actions/runs/32619692635) — success |
| Deployment completed | `2026-08-23 13:13:18 +08:00` |
| New canonical identities | `0` |

## What shipped

- Locale-correct links from the reviewed Zhangjiajie and transport guide cohort
  to the existing Zhangjiajie destination and transport Hubs.
- Locale-correct links from the reviewed visa guide cohort to the existing
  entry-and-transit owner, without reviving the retired combined UK/Canada URL.
- A ten-city arrival, stay and departure map feature on `/`, `/zh/`, `/ko/`
  and the indexed Beijing–Zhangjiajie–Shanghai transport guide.
- Ten numbered city cards plus the national schematic in SVG, PNG and WebP,
  with CSV/JSON data, source index, attribution guidance, CC BY 4.0 terms,
  SHA-256 checksums and a deterministic 30-file ZIP.
- Asset-level `ImageObject`, `Dataset` and `DataDownload` licence metadata. The
  article itself and third-party facts, names and trademarks are not relicensed.
- A public-safe 25-target manual outreach queue and operating runbook. The
  release itself sent no email and submitted no external contact form.

## Verification

| Check | Result |
|---|---|
| Full repository tests | 574 total; 573 passed; 1 existing skip; 0 failed |
| TypeScript | Passed |
| Production build | 725 static pages |
| Production export audit | 712 public HTML files; every indexable internal `href` and `src` resolved |
| `/`, `/zh/`, `/ko/` | HTTP 200; map-page and ZIP links present in all three live HTML documents |
| Transport guide | HTTP 200; map-page and transport-Hub links present |
| Representative Zhangjiajie and visa guides | HTTP 200; destination/entry Hub links present |
| Map guide, ZIP and licence file | HTTP 200; ZIP size 1,350,782 bytes; deed and legal-code URLs present |
| Complete ZIP SHA-256 | `ffeb9b0aa82bc101266ee280a7c388a4bf60b8fccf6d89e411f45eb5e8eed028` |
| Live sitemap | HTTP 200; 671 `<loc>` values; 671 unique; 0 duplicates |

## Outreach state and boundaries

- Production verification for the canonical page, ZIP and licence passed.
- The queue contains 25 targets: 4 `monitor`, 9 `ready-after-live`, 3
  `needs-one-item` and 9 `hold`.
- `ready-after-live` now means the shared production gate has passed; every
  individual target still requires a current recipient-page review and Gmail
  Sent duplicate check before a first-touch message.
- No bulk send, mail merge, paid placement, reciprocal-link request or
  `dofollow` request is authorized. One manual message and at most one later
  same-thread follow-up are permitted under the runbook.

## Interpretation boundaries

- This release added no article identity, route, Registry entry or sitemap URL.
- A successful deployment and stronger internal linking do not prove Google
  crawling, indexation, ranking, traffic, citations or enquiries.
- No Search Console indexing request was submitted by this release.
- Route Reality remains internal-only and unpublished.
