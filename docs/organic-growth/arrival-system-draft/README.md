# China arrival system — central-review draft package

Status: **CHINA ARRIVAL SYSTEM READY — CENTRAL REVIEW REQUIRED**

This package is the only proposed Homeground collection for the traveller task
“what must I do before departure, at the Chinese port, and before the end of my
first day?” It is a router across narrower owners, not a second copy of their
visa, Customs, connectivity, payment, accommodation or transfer instructions.

## Control record

- Baseline fetched and audited: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`
- Baseline check date: `2026-08-20` (Asia/Shanghai)
- Delivery branch: `article/worker-6-china-arrival-system-20260820`
- Candidate ID retained from the Search Map: `planning-20260820-first-24-hours`
- Proposed content owner: `first-24-hours-in-china`
- Proposed canonical path, subject to central approval: `/guides/first-24-hours-in-china/`
- Artifact shape: routed task Hub / collection
- Publication status: **draft only; no route, registry entry, sitemap entry or live URL**
- Merge, deployment and publication authorization: none

## PR #74 dependency audit

[PR #74](https://github.com/yangchunxuan/travel-china-with-xuan/pull/74) was
rechecked after the latest fetch on 2026-08-20. It has now been merged into
`origin/main` at `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`, so the
`china-online-arrival-card` code package exists on the baseline. That is not
live-publication evidence: the merged Search Map still records
`publicationStatus: not-published` with no live URLs, and central explicitly
states that the Homeground page is not online. The NIA service itself is
official and active; the Homeground article is not published. A merged file or
`datePublished` metadata value does not override that release state.

The earlier Search Map instruction said not to write the First 24 Hours page
until the arrival-card owner and collection gate existed. The present central
assignment authorizes this review package, but not a public route. Therefore the
Hub drafts refer to the arrival-card owner as **code-integrated but not live**
and contain no internal link to it. Central must re-run the collection gate only after live
deployment and all three locale URLs are independently verified (or the owner
is superseded).

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
7. A draft file, branch, PR, metadata date or generated registry entry is not
   proof of publication. Publication requires the item on merged `main` and the
   central release record.
