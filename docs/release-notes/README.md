# Homeground production release records

This directory holds dated production read-back records. Use the newest record
for current deployment state; keep older records unchanged as historical
evidence.

## Current production record

- [2026-09-05 private-tour selection backend checkpoint](./private-tour-selection-backend-release-20260905.md) — backend deployed; frontend pending at this recorded checkpoint. For subsequent frontend status, check [PR #125](https://github.com/yangchunxuan/travel-china-with-xuan/pull/125), its [Pages deployment](https://github.com/yangchunxuan/travel-china-with-xuan/actions/workflows/deploy.yml), and any later dated final release record.

## Earlier production records

- [2026-08-23 authority-map and Hub-link production release](./authority-map-and-hub-links-production-release-20260823.md)
- [2026-08-23 homepage city-discovery production release](./homepage-city-discovery-production-release-20260823.md)
- [2026-08-23 search, analytics and privacy production release](./search-analytics-privacy-production-release-20260823.md)

## Interpretation rules

- A dated sitemap count is a snapshot, not a permanent invariant.
- A Search Console discovered-URL count is not an indexation rate.
- Source code for a migration or Edge Function is not deployment evidence.
- A merged internal specification is not a published page or tool.
- Content identity remains owned by the Search Map. A technical release with
  zero new canonical identities must not change that inventory.
- External console settings are observations at a stated date and must be read
  back again before a later release relies on them.
