# Homepage city-discovery production release — 2026-08-23

Status: **DEPLOYED AND LIVE-VERIFIED**

Production read-back date: **2026-08-23 (Asia/Shanghai)**

This record covers the homepage destination-Hub discovery release. The earlier
[search, analytics and privacy release](./search-analytics-privacy-production-release-20260823.md)
remains authoritative for analytics, privacy, Search Console and optional
first-party traffic state unless a later dated record explicitly changes it.

## Release identity

| Field | Verified value |
|---|---|
| Pull request | [#93 — Add homepage links to published city hubs](https://github.com/yangchunxuan/travel-china-with-xuan/pull/93) |
| Runtime merge SHA | `1e66811216fedb4bbea521bd894c5aba9518a434` |
| Merged | `2026-08-23 12:05:12 +08:00` |
| Pages deployment | [Run 32616980439](https://github.com/yangchunxuan/travel-china-with-xuan/actions/runs/32616980439) — success |
| Deployment completed | `2026-08-23 12:07:10 +08:00` |
| New canonical identities | `0` |

## What shipped

- A visible destination section on `/`, `/zh/` and `/ko/`.
- Direct, server-rendered links to the eight existing Beijing, Shanghai,
  Xi'an, Chengdu, Guangzhou, Hangzhou, Zhangjiajie and Chongqing Hubs.
- Labels and paths derived from the existing destination Registry rather than
  a second homepage URL list.
- Responsive two-column mobile cards, visible keyboard focus and semantic
  navigation markup.
- Source and production-export regression checks for all 24 localized links.

## Public production read-back

| Check | Result |
|---|---|
| `/`, `/zh/`, `/ko/` | HTTP 200 |
| Localized section headings | Present in all three live HTML documents |
| Expected destination links | 8 per homepage; 24/24 present |
| Language-path agreement | English, `/zh/` and `/ko/` paths match their homepage |
| Unpublished Hub leakage | No Guilin or Shenzhen destination link |
| Live sitemap | HTTP 200; 671 `<loc>` values; 671 unique; 0 duplicates |

## Boundaries

- This release added no article, route, canonical identity, Registry entry or
  sitemap URL.
- It changed neither paid-service weighting nor inquiry behavior and added no
  analytics event.
- Route Reality remains internal-only and not published.
- A successful deployment and direct homepage link are discovery signals, not
  evidence of Google crawling, indexation, ranking, clicks or enquiries.
- No Search Console indexing request was submitted as part of this release.
