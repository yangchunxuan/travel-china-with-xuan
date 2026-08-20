# Gap specification — China arrival system

- Baseline: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`
- Audit date: `2026-08-20`
- Decision rule: update or merge into the current owner before proposing a new
  identity. No item below authorizes a public route.

## P0 — release blockers

### G0.1 Arrival-card dependency is not published

- **Evidence:** PR #74 is now merged and `china-online-arrival-card` exists in
  `origin/main`, but the merged Search Map still records
  `publicationStatus: not-published` with no live URLs. Central also explicitly
  states that it is not online. Code presence and draft `datePublished`
  metadata do not prove deployment.
- **Required action:** central completes or supersedes the release, verifies the
  NIA host and all three Homeground live URLs independently, records the live
  state, then re-runs the First 24 Hours collection gate.
- **Fail closed:** Hub stays a docs-only draft with no internal arrival-card
  link. Do not infer publication from draft `datePublished` metadata.

### G0.2 Entry owners need a current coordinated review

- **Owners:** `system-entry-requirements`, US, UK, Canada, New Zealand,
  Singapore and the 240-hour route owner.
- **Why:** these are `critical-on-source-change`; their repository review dates
  are 2026-07-24 to 2026-07-28. The current NIA record has 55 eligible
  nationalities and 65 ports for 240-hour transit, while older government
  summaries still expose the former 54/60 counts.
- **Required action:** update existing owners together from the current NIA,
  MFA and responsible embassy sources. Verify passport type, purpose, end date,
  duration, day-counting, ports/areas and third-country route separately.
- **Fail closed:** remove stale counts or dates; route to the official owner.
  Do not write a new nationality page.

### G0.3 Non-hotel online registration must retain its pilot boundary

- **Owner:** `foreigners-china-hotel`; its PR #74 update is now in `main`, but
  deployment of that revision is not inferred.
- **Current official boundary:** the 24-hour non-hotel registration duty is
  nationwide, but the NIA online service was still a seven-region pilot when
  checked on 2026-08-20.
- **Required action:** keep the merged update in the existing owner; before
  treating that revision as deployed, check the pilot list and fallback again.
  Keep local service windows/police stations and 12367 in the recovery path.
- **Fail closed:** never display “register online anywhere in China.” Do not
  create seven provincial pages.

## P1 — update existing owners, no new pages

### G1.1 Payment owner freshness

- Refresh foreign-card binding, identity prompts, limits/fees, supported scenes
  and official support paths from the payment products and PBOC/government
  guidance immediately before an update.
- Preserve cash and physical-card fallbacks. Do not rank Alipay, WeChat Pay,
  UnionPay or any other payment channel and do not promise acceptance.

### G1.2 Connectivity owner freshness

- Recheck MIIT real-name requirements, official operator office processes,
  exact-device eSIM/dual-SIM capability and live product terms in the same week.
- Keep data, mainland number, SMS/voice, hotspot and home-number continuity as
  separate capabilities. Do not generalize one iPhone rule to Android, one
  carrier to all carriers or roaming behavior to every eSIM.

### G1.3 Customs and quarantine owners

- Keep the channel decision in `china-customs-red-green-channels` and the
  packing screen in `food-plants-and-animal-products-into-china`.
- The food/plants/animal-products owner is already a live, indexable,
  trilingual canonical and PR #74 added its slug to the Search Map's published
  baseline. Complete its canonical-boundary/dynamic-risk record and add it to
  the do-not-repeat register; do not republish it as inventory.
- Add active GACC Order No. 276 (effective 2025-04-01) to that owner's body and
  source log. It repealed the older carried-item quarantine measure, so the
  current low/quarterly runtime mapping is unsafe: treat the legal/quarantine
  owner as high risk, with weekly monitoring and a mandatory release-day check.
- Recheck Order No. 276, Announcement No. 43 of 2025 and the current MARA/GACC
  prohibited quarantine-object catalogue before changing either page.
- Refresh the current guide's reviewed dates, replace weak FAQ evidence, and
  add only a compact screen for uncommon high-risk categories; do not turn the
  page into an exhaustive or country-by-country import catalogue.
- Correct the live hero alternative text: the asset is an abstract crossed-leaf
  symbol, not a suitcase/meat/tray scene. Preserve its privacy-safe, non-
  documentary status.
- When an item, origin or preparation method is uncertain, instruct the
  traveller to keep it closed and declare/ask. Do not predict confiscation,
  release or penalty.

### G1.4 Hotel owner and the merged PR #74 update

- The baseline page already owns official rule versus platform record versus
  front-desk execution and refusal recovery. The PR #74 changes now in `main`
  add FAQ and clarify the registration split; this remains an update, not a new
  owner. Do not describe the revision as live until deployment is verified.
- Recheck the exact property, operating category, staffed arrival, cancellation
  and platform support at booking time. No hotel or refund outcome is promised.

### G1.5 Airport arrival routing

- Use `china-private-transfer-or-public-transport` for the general mode choice,
  `china-arrival-day-booked-anchor-or-flexible-block` for day loading and exact
  airport/transport-operator owners for terminals and service status.
- The Hub may request terminal, Chinese address and fallback, but must not freeze
  schedules, fares, pickup zones or app availability.
- Do not create a generic airport-to-hotel clone for each airport.

## P2 — structural quality

### G2.1 System-entry metadata discrepancy

The Search Map marks `system-entry-requirements` as
`published-indexable-metadata-discrepancy`: repository metadata/source review
records do not share one date model. Resolve this within the existing system
collection before connecting a public First 24 Hours Hub.

### G2.2 Locale coverage without identity sprawl

UK, Canada and the entry system collection are English-only; US, Singapore and
240-hour have EN/ZH/KO routes. A future translation is an update to the same
owner, not a new localized identity. Until then, localized Hubs must label the
English target and must not invent a localized URL.

### G2.3 Failure-recovery parity

Every core owner must answer “what if the expected channel fails?” at the same
decision point in EN/ZH/KO. Minimum recovery objects are:

1. official-channel substitution;
2. offline/privacy-safe evidence;
3. a staffed or in-person route;
4. a money/connectivity/accommodation fallback;
5. an escalation owner without promised time or outcome.

### G2.4 Machine-readable dynamic queue

The ledger in this package is the editorial baseline. Before publication,
central should assign a named maintenance owner and record review completion in
the Search Map or another canonical machine-readable store. A calendar reminder
alone is not a fail-closed publishing control.

## Explicitly rejected expansions

- a page for every nationality, passport synonym or year;
- a 240-hour page for every city, province, airport or sample itinerary;
- “best eSIM”, carrier, payment app, visa agent, hotel app or airport transfer
  rankings;
- a second arrival-card form, Customs declaration or accommodation-registration
  explainer;
- province-by-province non-hotel registration pages;
- a generic “apps you need in China” page that absorbs payment, SIM, maps and
  booking owners;
- airport-by-airport first-day clones or fixed schedule/fare tables;
- purchase-probability, approval-probability, admission or refund predictions.
