# Ten-city stay decision and hotel conversion network

Status: **STAY NETWORK SPLIT READY — CENTRAL REVIEW REQUIRED**

Snapshot date: 2026-08-21 (Asia/Shanghai)

Baseline: `origin/main` at `ef189874` after PR #74 merged

Scope: Beijing, Shanghai, Xi'an, Chengdu, Guangzhou, Zhangjiajie, Hangzhou,
Chongqing, Guilin and Shenzhen

The audited main branch contains seven published city Hubs. PR #74 is merged
and live, so Hangzhou and Zhangjiajie are recorded as published alongside
Beijing, Shanghai, Xi'an, Chengdu and Guangzhou.

This package turns accommodation content into a decision network rather than a
hotel list. It records which page owns each search task, strengthens existing
city Hubs and stay owners before proposing anything new, and defines a
supplier-neutral data boundary for a later human hotel/DMC quote workflow.

The four Search Map main-ledger files are deliberately out of scope because
Employee 7 is synchronizing them independently. Published-state corrections in
this branch are limited to stay-owned docs, the Hub draft README/static test
and the affected public content.

## Delivered in this branch

- `ten-city-stay-matrix.md`: area, gateway, first-trip, metro, family/mobility,
  last-night and recovery decisions for all ten cities.
- `canonical-audit.md`: current owners, Hub status, remote-branch exclusions and
  the route for every content task: update existing, Hub section, FAQ, new-owner
  condition or reject.
- `existing-owner-update-package.md`: changes made in this branch plus a
  collision-safe queue for owners already updated by PR #74.
- `executable-gaps.md`: work that central must implement atomically, especially
  a structured stay inquiry and restricted property/quote store.
- `stay-data-dictionary.md` and `inquiry-and-supplier-boundary.md`: public,
  private and restricted data contracts without exposing inventory.
- `source-audit-2026-08-20.md`: official policy and safety rechecks, volatility
  limits and page-level review-date rules.
- `image-source-qa.md`: documentary image ledger, rights/privacy rules, source
  ledger and release checks.
- `employee-2-manual-merge-note.md`: the seven-Hub invariant and a manual merge
  procedure for Employee 2 lifecycle work without reverting published routes.
- `qa-report-2026-08-21.md`: generation, tests, build/export and browser checks
  executed for this split branch; it is not a deployment certificate.
- `lib/stayNetworkContract.ts` plus its targeted test: executable safeguards for
  the exact ten-city model and public/private boundary.

## Editorial operating rules

1. A released broad city Hub owns city orientation, area clusters and gateway context.
   A guide exists only when the reader has a narrower, repeatable choice that
   cannot be answered cleanly inside that Hub.
2. “Near metro” is never a boolean promise. Check the exact station entrance,
   walking route, crossings, lift/step chain, operating fit and final walk to
   the actual property.
3. Legal accommodation rules, a booking platform's display and the property's
   current written confirmation are three separate evidence layers.
4. No page promises live price, room availability, a specific room assignment,
   foreign-guest handling or an accessible route. Human verification is dated,
   scoped and allowed to expire.
5. Hotel/DMC enquiry copy asks for requirements, not passport numbers, booking
   references, payment data, medical diagnoses or uploaded identity documents.
6. Images must be real and rights-recorded. A property photograph proves only
   what is visible in that frame; it does not prove current inventory,
   acceptance, service hours or a complete accessible route.
7. This branch creates no public inventory system, PR, merge or deployment.

## Release boundary

The current site can route a traveller to the free planner contact, but it does
not yet have a safe structured stay-intake contract. Page copy may tell the
traveller what information to prepare; it must not claim that an inventory
search, booking, property confirmation or supplier handoff has already
occurred. The atomic runtime work required to change that is listed in
`executable-gaps.md`.
