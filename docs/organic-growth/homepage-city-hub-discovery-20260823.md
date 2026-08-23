# Homepage destination-Hub discovery handoff — 2026-08-23

Status: **READY FOR CENTRAL INTEGRATION — NOT MERGED OR DEPLOYED**

Branch: `codex/homepage-city-hub-links-20260823`

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

## Validation on the branch

- TypeScript: pass.
- Homepage and related destination/accessibility tests: 28/28 pass.
- Full inquiry suite: 564 pass, 0 fail, 1 platform-specific skip.
- Source and production-export Chinese/Korean font coverage: pass.
- Production build: 725 static pages generated; export and every internal
  href/src check pass.
- Browser QA: English desktop at 1440px and all three languages at 390px;
  eight links visible, correct two-column mobile layout and no horizontal
  overflow.
- Current-base sitemap export: 671 unique locations; this branch does not
  modify its source or add a URL.

## Central integration steps

1. Rebase or update the branch against the latest `main` without replacing the
   destination Registry authority.
2. Rerun `npm run test:inquiry`, `npm run typecheck` and `npm run build`.
3. After merge and deployment, read back `/`, `/zh/` and `/ko/` and verify the
   eight language-matched destination links in live HTML.
4. Record deployment evidence separately. Only then may this handoff be marked
   deployed; do not infer indexation from a successful release.
