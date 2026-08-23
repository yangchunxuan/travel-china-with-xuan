# Homepage destination-Hub discovery handoff — 2026-08-23

Status: **DEPLOYED AND LIVE-VERIFIED**

Branch: `codex/homepage-city-hub-links-20260823`

Release evidence: PR [#93](https://github.com/yangchunxuan/travel-china-with-xuan/pull/93),
runtime merge SHA `1e66811216fedb4bbea521bd894c5aba9518a434` and
[Pages run 32616980439](https://github.com/yangchunxuan/travel-china-with-xuan/actions/runs/32616980439).

## Outcome

The English, Simplified Chinese and Korean homepages now contain a visible
destination section linking directly to the eight already-published city Hubs:

- Beijing;
- Shanghai;
- Xi'an;
- Chengdu;
- Guangzhou;
- Hangzhou;
- Zhangjiajie;
- Chongqing.

The section sits after homepage guide search and before the broader guide rail.
It helps travellers choose a city starting point and gives crawlers a direct
homepage path to each Hub. It does not guarantee crawling, indexation or
ranking.

## Ownership and implementation boundary

- `lib/destinationHubs.ts` remains the only city and localized-path authority.
- The server reduces the Registry to `{ id, label, href }`; the client homepage
  does not import the full destination Registry or maintain a second city list.
- Every destination is an ordinary server-rendered anchor with an English,
  `/zh/` or `/ko/` path matching the current homepage language.
- The UI is an editorial discovery surface, not a paid-service promotion.
- No new analytics event was introduced.

This change creates **zero** canonical identities, routes, Registry entries or
sitemap URLs. It does not alter guide ownership, Route Reality status, pricing,
inquiry weighting or existing destination content.

## Regression contract

The new homepage test requires the complete reviewed destination-Hub Registry,
semantic list markup, real anchors, keyboard-visible focus and responsive link
cards. The production-export audit separately requires all eight localized
links in each of the three exported homepages and rejects unpublished Guilin or
Shenzhen Hub links.

## Release validation

- TypeScript: pass.
- Homepage and related destination/accessibility tests: 28/28 pass.
- Full inquiry suite: 564 pass, 0 fail, 1 platform-specific skip.
- Source and production-export Chinese/Korean font coverage: pass.
- Production build: 725 static pages generated; export and every internal
  href/src check pass.
- Browser QA: English desktop at 1440px and all three languages at 390px;
  eight links visible, correct two-column mobile layout and no horizontal
  overflow.
- Live sitemap after deployment: 671 locations, 671 unique and 0 duplicates;
  this release did not modify its source or add a URL.

## Production read-back

- `/`, `/zh/` and `/ko/` each returned HTTP 200 after Pages completed.
- All 24 expected locale-matched Hub links were present in live HTML.
- All three localized headings were present.
- No unpublished Guilin or Shenzhen destination-Hub link was present.
- Successful deployment and link discovery do not prove that Google has
  crawled, indexed or ranked any Hub.

The durable release record is
[`homepage-city-discovery-production-release-20260823.md`](../release-notes/homepage-city-discovery-production-release-20260823.md).
