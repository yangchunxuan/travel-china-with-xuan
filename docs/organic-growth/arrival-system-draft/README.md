# China arrival system — central-review draft package

Status: **ARRIVAL SYSTEM LIVE SYNC READY — CENTRAL REVIEW REQUIRED**

Current-state overlay (2026-08-23): the Search Map now records all five PR #74
identities as published. References below to a stale pre-release Search Map
describe only this package's 2026-08-21 audit baseline. First 24 Hours itself
remains a durable `pending-review / draft-submitted / not-published` collection
draft with no public route or publication authorization.

This package is the only proposed Homeground collection for the traveller task
“what must I do before departure, at the Chinese port, and before the end of my
first day?” It is a router across narrower owners, not a second copy of their
visa, Customs, connectivity, payment, accommodation or transfer instructions.

## Control record

- Baseline fetched and audited: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`
- Baseline and production sync check date: `2026-08-21` (Asia/Shanghai)
- Delivery branch: `article/worker-6-arrival-system-live-sync-20260821`
- Candidate ID retained from the Search Map: `planning-20260820-first-24-hours`
- Canonical content identity: `first-24-hours-in-china`
- Canonical/page execution owner: **employee 4 / planning**
- Dynamic-source maintenance and trilingual-draft handoff: **employee 6 /
  entry-practical**
- Proposed canonical path, subject to central approval: `/guides/first-24-hours-in-china/`
- Artifact shape: routed task Hub / collection
- Central decision: **pending-review**
- Publication status: **durable draft / not-published; no route, Registry entry,
  sitemap entry or live URL**
- Merge, deployment and publication authorization: none

## PR #74 production-state synchronization

[PR #74](https://github.com/yangchunxuan/travel-china-with-xuan/pull/74) was
rechecked on 2026-08-21. It is merged into
`origin/main` at `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`, so the
five integrated identities are `destination-zhangjiajie`,
`china-online-arrival-card`,
`zhangjiajie-national-forest-park-tickets-and-entrances`,
`chongqing-railway-station-selector` and `destination-hangzhou`.

The live sitemap returned HTTP 200 with exactly **649 unique URL records**;
all five identities × EN/ZH/KO were present once, and all 15 production pages
returned HTTP 200 with self-referencing canonicals. The China Online Arrival
Card also returned `robots: index, follow` in all three locales. These
production facts were checked at `2026-08-21`; sitemap presence proves
discovery inclusion, not external search-engine indexation.

At this package's 2026-08-21 baseline, the merged Search Map still preserved the
five identities' pre-release `draft-submitted / not-published` snapshot. This
package recorded the verified production state without editing that inventory.
The Search Map was corrected on 2026-08-23. The bounded arrival system had
**30 live owners** at the package baseline, and the Hub drafts link the three
correct arrival-card locale URLs.

This live-state sync did not silently advance the 2026-08-20 policy/product
source dates. Those rows are one day old and within their stated maximum ages;
the arrival-card A-01/A-02 publication-day source recheck is explicitly pending.
No form time window, entry result or search volume is inferred from deployment
or sitemap evidence.

None of that changes the First 24 Hours ownership or authorization. Employee 4
remains its canonical/page execution owner. Employee 6 hands off maintained
sources and parity-aligned drafts; employee 6 does not become a second page
owner. The current central decision remains `pending-review`, so this repair
must not add the Hub to a route, Registry or sitemap.

## Package contents

- `hub.en.md`, `hub.zh.md`, `hub.ko.md`: full, parity-aligned traveller-facing
  Hub drafts.
- `owner-audit.md`: published, legacy and unpublished owner inventory, with
  canonical / merge / update / dynamic-risk / do-not-duplicate decisions.
- `dynamic-ledger-research.md`: official channel, fact, risk, review frequency,
  invalidation action, pre-publication check and traveller fallback.
- `food-inventory.md`: durable inventory and release
  status for the biosecurity packing owner.
- `gap-spec.md`: bounded changes that improve the system without creating
  nationality or synonym sprawl.
- `internal-links.md`: locale-aware owner graph and broken-link gate.
- `source-log.md`: source hierarchy, official URLs and access dates.
- `image-plan.md`: privacy-safe original workflow visual specification.
- `qa.md`: repository, status, parity, link, source, privacy and Git checks.

## System rules

1. One traveller task has one owner. A nationality, city, airport, app, carrier
   or near-synonym does not create a new page by itself.
2. The Hub gives a sequence and routes to owners. It does not reproduce their
   forms, thresholds, lists, setup screens or policy tables.
3. Every routed task includes a failure action.
4. Visa and visa-free conclusions are passport-, purpose-, document- and
   route-specific. Admission remains an official border decision.
5. No eSIM, carrier, payment app, visa agent, hotel platform or transfer vendor
   is ranked or guaranteed.
6. Dynamic claims fail closed: remove or soften the claim, keep the official
   channel and fallback, and do not leave stale certainty visible.
7. A draft file, branch, PR or metadata date alone is not proof of publication.
   Record repository state, central authorization and production readback as
   separate evidence. Sitemap inclusion does not prove external indexing.
