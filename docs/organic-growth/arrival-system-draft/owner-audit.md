# Homeground China arrival-system owner audit

Owner-audit and live-sync date: **2026-08-21 (Asia/Shanghai)**
Repository baseline: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`
PR integration checked: [PR #74](https://github.com/yangchunxuan/travel-china-with-xuan/pull/74), **MERGED** at `2026-08-20T15:17:58Z` (`2026-08-20 23:17:58` Asia/Shanghai), final head `b66fc6c`, merge commit `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`. Production readback checked at `2026-08-21`: five identities × three locales live; sitemap 649 unique URL records.
Audit scope: the complete passport/entry, Customs, connectivity, payment, accommodation-registration, airport-arrival and failure-recovery owner set needed by a `First 24 Hours in China` routing Hub. Dynamic statements below describe repository claims and maintenance risk; they are **not** a fresh legal-policy validation.

## Executive result

- The bounded system now has **30 canonical owner identities represented in `origin/main` code**: 23 trilingual generated guides, six protected legacy entry guides, and one English system entry collection.
- Production readback now supports **30 published/live owners** in this bounded system. `china-online-arrival-card` is live in EN/ZH/KO, self-canonical, indexable and present once per locale in the sitemap.
- There is **one noindex canonical shell**, `/china-visa-free-uk-canada/`; it is not an owner and must never be revived.
- PR #74 integrated five production identities: `destination-zhangjiajie`, `china-online-arrival-card`, `zhangjiajie-national-forest-park-tickets-and-entrances`, `chongqing-railway-station-selector` and `destination-hangzhou`. All five × EN/ZH/KO returned HTTP 200 with self-canonicals and appeared once in the 649-record live sitemap when checked on 2026-08-21. The merged Search Map's `draft-submitted / not-published` values are now a stale pre-release snapshot, not the production state.
- PR #74 also integrated **in-place updates**, not new identities, for `do-singaporeans-need-visa-china` and `foreigners-china-hotel`.
- `planning-20260820-first-24-hours` remains a **durable draft / `centralDecision: pending-review` / `publicationStatus: not-published`**. Employee 4 / planning is the sole canonical/page execution owner; employee 6 supplies dynamic-source maintenance and the trilingual draft handoff only. No runtime route, Registry record, sitemap URL, merge or publication is authorized.
- `food-plants-and-animal-products-into-china` is not unpublished inventory. It is a durable, trilingual published owner on main, introduced by `43bf373` and deepened by `35d73f8`. Recheck and update that owner; do not republish or create a synonym.
- The current public entry cluster is overdue for the assignment's same-week check: most legacy repository review dates are 2026-07-24 through 2026-07-28. Merged PR #74 refreshes Singapore copy to 2026-08-20, but UK, Canada, US, New Zealand, 240-hour transit and the system collection still require a coordinated P0 review before the Hub can be cleared.
- Failure recovery is strong across most generated practical guides. It is weak or only partial in the system entry collection and the six legacy passport/transit owners. The Hub should add a short **routing-level** fallback for a failed document/boarding check and send the traveller to the controlling authority; it must not invent a legal remedy or duplicate each visa page.

## Status and action vocabulary

- **Canonical**: retain the existing owner and link to it; do not rewrite its task in the Hub.
- **Update existing**: correct the existing owner after source review; no new page.
- **Merge**: absorb a proposed module or PR change into the named owner; no new identity.
- **Critical / high / medium dynamic risk**: maintenance priority, not a statement that the current copy is wrong.
- **Recovery strong**: an explicit failure branch identifies an immediate action and fallback.
- **Recovery partial**: caveats or official escalation exist, but no complete traveller-facing failed-node sequence.

## A. Entry, passport and re-entry owners

| Owner and exact path | Main status / locales / review evidence | Canonical boundary | Action and overlap control | Dynamic risk | Failure recovery |
|---|---|---|---|---|---|
| `system-entry-requirements` — `/guides/china-entry-requirements/` — `app/(default)/guides/china-entry-requirements/page.tsx` | Published/indexable system collection; **EN only**; Search Map `lastReviewedAt: 2026-07-28`; known metadata-source discrepancy | Top router by exact passport, purpose and route. It does not decide an individual case and must not absorb arrival-card, Customs or accommodation-registration steps. | **Canonical + P0 update.** The First-24-Hours Hub links here once, then lets this collection route to passport owners. Resolve the documented metadata discrepancy. | **Critical** — membership, eligibility and child-owner freshness | **Partial.** Advises official sources/competent authority but lacks a failed boarding/document-check sequence. |
| `do-us-citizens-need-visa-china-2026` — `/guides/do-us-citizens-need-visa-china-2026/` — `lib/usChinaVisaI18n.ts` | Published; EN/ZH/KO; registry reviewed **2026-07-24** | Ordinary US-passport tourism: normal visa route versus narrow route-specific exceptions. Not a visa-filing or approval service. | **Update existing P0.** Keep US-specific task; route all generic questions to the system collection and all 240-hour mechanics to the transit owner. | **Critical** — passport, visa, regional and transit policy | **Partial.** Booking-stage caveats and carrier/border boundary exist; add an explicit “stop, contact carrier/mission, do not improvise at the gate” path during owner refresh. |
| `china-visa-free-uk-citizens-2026` — `/guides/china-visa-free-uk-citizens-2026/` — `lib/ukVisaFreeGuide.ts` | Published; **EN only**; registry reviewed **2026-07-24** | Qualifying ordinary/full British citizen passport within the named policy window; other British nationality categories and documents require official confirmation. | **Update existing P0.** Do not fold into the former UK/Canada shell; do not clone for BN(O), emergency documents or 2027. | **Critical** — passport category, purposes, duration and dated policy end | **Partial.** Has non-qualifying scenarios and embassy/carrier confirmation, but no complete failed boarding or denied-entry recovery. |
| `china-visa-free-canadian-citizens-2026` — `/guides/china-visa-free-canadian-citizens-2026/` — `lib/canadaVisaFreeGuide.ts` | Published; **EN only**; registry reviewed **2026-07-24** | Qualifying ordinary Canadian passport within the named window; unusual document/nationality cases remain official-confirmation tasks. | **Update existing P0.** Do not revive the combined shell or split by passport marker, birthplace, Hainan or Hong Kong/Macao. | **Critical** — passport category, purposes, duration and dated policy end | **Partial.** Strong pre-booking cautions; incomplete failed boarding/admission sequence. |
| `china-visa-free-new-zealand-citizens-2026` — `/guides/china-visa-free-new-zealand-citizens-2026/` — `lib/nzVisaFreeGuide.ts` | Published; **EN only**; registry reviewed **2026-07-24** | New Zealand ordinary-passport waiver task, including narrow child/nationality boundaries. | **Update existing P0.** Include in the full audit even though not a priority nationality; no new nationality-template pages. | **Critical** | **Partial.** Official confirmation boundaries exist; no full failed-node recovery. |
| `do-singaporeans-need-visa-china` — `/guides/do-singaporeans-need-visa-china/` — `lib/singaporeChinaVisaI18n.ts` | Published; EN/ZH/KO. PR #74's narrower source/copy refresh is now in main and the locale copy says reviewed **2026-08-20**; `guideRegistry.ts` still says `dateModified/sourceReviewedDate: 2026-07-28`. | Ordinary Singapore-passport short-stay rule only; arrival-card completion belongs to the separate arrival-card owner; route planning is not an entry-policy substitute. | **Canonical + metadata update; no new page.** Reconcile copy dates with `guideRegistry.ts`/manifest. | **Critical** | **Partial.** Merged copy narrows overbroad duration language and improves official boundaries, but still needs a concise failure route for document mismatch or carrier refusal. |
| `china-240-hour-visa-free-transit-route-check` — `/guides/china-240-hour-visa-free-transit-route-check/` — `lib/transitRouteCheckI18n.ts` | Published; EN/ZH/KO; registry reviewed **2026-07-24** | Route, eligible nationality, named port, permitted area, onward destination and live temporary-entry conditions. Not general visa-free tourism. | **Update existing P0.** All city/airport examples merge here; never create “240 hours in Beijing/Shanghai/airport” pages. | **Critical** — country list, ports, areas, route interpretation and documents | **Partial.** Airline questions and 12367 escalation are present, but the copy needs a clear fail-closed sequence if the carrier or port will not accept the planned route. |
| `china-passport-validity-and-blank-pages` — `/guides/china-passport-validity-and-blank-pages/` — `content/guides/...` | Published; EN/ZH/KO; reviewed **2026-08-13** | Separates visa application, visa-free, transit, existing-visa and carrier/transit-country checks; rejects a universal validity/blank-page shortcut. | **Canonical + P0 recheck.** Do not copy one mission's page requirement into the Hub or a nationality page. | **Critical/high** — mission instructions, carrier checks and transit rules | **Strong.** Explicit unresolved-check table routes renewal, authority and carrier confirmation. |
| `hong-kong-macau-mainland-reentry-count` — `/guides/hong-kong-macau-mainland-reentry-count/` | Published; EN/ZH/KO; reviewed **2026-08-13** | Counts mainland exits/re-entries and separates mainland, Hong Kong and Macao admission systems. | **Canonical when a first-day route crosses an SAR; otherwise omit from the Hub's default path.** Do not duplicate it in nationality or 240-hour pages. | **Critical/high** | **Strong.** Includes route repair before approaching the border and official escalation. |
| `lost-passport-in-china-exit-recovery` — `/guides/lost-passport-in-china-exit-recovery/` | Published; EN/ZH/KO; reviewed **2026-08-13** | Loss report, mission replacement document, China-side status/exit document, transport and insurance handoff. | **Canonical recovery owner.** First-24-Hours Hub links it only from “passport lost/unusable”; do not repeat the jurisdiction-specific sequence. | **High** — local intake order and mission process | **Strong.** Multi-agency failure and escalation table. |

### Entry inventory that is not another published owner

| Artifact | Verified status | Required handling |
|---|---|---|
| `/china-visa-free-uk-canada/` — `app/(default)/china-visa-free-uk-canada/page.tsx` | Existing compatibility shell; `noindex, follow`; canonical is `/guides/china-entry-requirements/`; absent as an independent sitemap identity by Search Map policy | **Already merged.** Preserve for inbound links only; never restore its old combined copy or count it as a page. |
| `china-online-arrival-card` — `content/guides/china-online-arrival-card/*` | **Published/indexable trilingual canonical.** [EN](https://homegroundchina.com/guides/china-online-arrival-card/), [ZH](https://homegroundchina.com/zh/guides/china-online-arrival-card/) and [KO](https://homegroundchina.com/ko/guides/china-online-arrival-card/) each returned HTTP 200, `index, follow`, self-canonical and one sitemap entry on 2026-08-21. | **Canonical + dynamic-source maintenance.** Link the locale-correct owner. Keep the NIA form/host, fee, current eight-category interface versus seven-category 2025 notice and port fallback under release/source-change review; never infer form timing or entry eligibility. |
| `planning-20260820-first-24-hours` | Durable routed-task draft; `centralDecision: pending-review`; `publicationStatus: not-published`; no route/Registry/sitemap entry | **Employee 4 / planning is the sole canonical/page execution owner. Employee 6 maintains sources and hands off EN/ZH/KO drafts only.** This sync must not create a public implementation or second owner. |
| `essentials-20260811-02` entry eligibility checker | Search Map: held, no legal data owner, no versioned complete dataset, no fail-closed test regime | **Do not build.** Keep routing through `system-entry-requirements`. |

## B. Customs and biosecurity owners

| Owner and exact path | Main status / review | Boundary | Action | Dynamic risk | Recovery |
|---|---|---|---|---|---|
| `china-customs-red-green-channels` — `/guides/china-customs-red-green-channels/` | Published; EN/ZH/KO; reviewed **2026-08-13** | Passenger baggage declaration and red/green-channel decision after immigration/bag collection. It does not own every item limit or pre-packing eligibility. | **Canonical + same-week update check.** The Hub provides only the branch question and link. | **High/critical** — declaration form, categories and official channel | **Strong.** Electronic-to-paper fallback and mistaken-green-lane recovery. |
| `food-plants-and-animal-products-into-china` — `/guides/food-plants-and-animal-products-into-china/` | **Published durable main owner**; EN/ZH/KO; metadata reviewed **2026-08-12**; main history `43bf373` then `35d73f8` | Pre-packing screen for food, plants, seeds, soil, animals and derived products; Customs guide owns the arrival lane. | **Update existing; never publish again.** Reopen the official prohibited-list/FAQ/Announcement 43 sources, record current-or-changed state and await central confirmation before any content release. | **Critical/high** — list may be adjusted and exemptions require approvals/certificates | **Strong.** Remove before travel; declare at arrival; preserve return/treatment/disposal record. |

## C. Connectivity, payment and practical recovery owners

| Owner and exact path | Main status / review | Boundary | Action | Dynamic risk | Recovery |
|---|---|---|---|---|---|
| `china-esim-vs-local-sim` — `/guides/china-esim-vs-local-sim/` | Published; EN/ZH/KO; reviewed **2026-08-12** | Provider-neutral choice among travel eSIM/roaming, mainland SIM/local number and dual-line setup; exact-device and real-name process. | **Canonical + P0 update.** No provider rankings, no separate “need a Chinese number?” page and no blocked-service guarantee. | **Critical** — carrier process, device model capability, plan routing and service-hall handling | **Strong.** Symptom/layer failure map and independent arrival connectivity fallback. |
| `china-public-wifi-passport-login` — `/guides/china-public-wifi-passport-login/` | Published; EN/ZH/KO; reviewed **2026-08-12** | Venue-specific public Wi-Fi identity/login paths; not a promise that all airports/venues accept passports. | **Supporting owner.** Link only when airport Wi-Fi is the failed first connection; do not generalize its venue examples. | **High** | **Strong.** Stop repeated identity uploads; use official desk or independent data route. |
| `how-to-pay-in-china-as-a-tourist` — `/guides/how-to-pay-in-china-as-a-tourist/` | Published; EN/ZH/KO; reviewed **2026-08-10** | Complete tourist payment stack: wallets, physical cards, RMB cash and failure recovery. | **Canonical + P0 update.** Merge every Alipay-vs-WeChat question here; no wallet ranking or separate setup article in the Hub. | **Critical** — app, foreign-card, fee/limit and verification behaviour | **Strong.** Binding, offline, merchant and duplicate-charge recovery with independent backups. |
| `china-atm-cash-not-dispensed` — `/guides/china-atm-cash-not-dispensed/` | Published; EN/ZH/KO; reviewed **2026-08-13** | Debit/no-cash evidence, ATM-bank plus issuer escalation and interim payment fallback. | **Canonical failure owner.** Do not promise refund timing or split by bank/network. | **High** | **Strong.** Avoids repeat withdrawal, preserves evidence and uses two-bank cases. |
| `lost-phone-in-china-digital-recovery` — `/guides/lost-phone-in-china-digital-recovery/` | Published; EN/ZH/KO; reviewed **2026-08-13** | Device, account, SIM, payment and booking containment; safe return/erase decision. | **Canonical failure owner.** Hub uses a one-line emergency link, not the recovery steps. | **High** — Apple/Google/carrier/account processes | **Strong.** Explicit offline, no-2FA, carrier and same-day-departure fallbacks. |
| `china-booking-dispute-evidence-pack` — `/guides/china-booking-dispute-evidence-pack/` | Published; EN/ZH/KO; reviewed **2026-08-13** | Evidence pack, timeline and controlled seller/payment-channel escalation; no legal conclusion or public exposure. | **Canonical supporting recovery owner.** Do not make separate dispute pages by platform or service. | **High** — platform/payment dispute rules | **Strong.** Dual-channel case control and mitigation. |
| `china-map-coordinate-offset-explained` — `/guides/china-map-coordinate-offset-explained/` | Published; EN/ZH/KO; reviewed **2026-08-13** | Traveller-visible wrong-pin diagnosis using Chinese address, venue identity, landmark and same-app confirmation; no technical circumvention. | **Canonical location recovery owner.** Hub can link after a driver/walking pin mismatch. | **Medium/high** — POIs, entrances and provider tools change | **Strong.** Taxi and walking recovery branches. |

## D. Hotel and non-hotel registration owners

| Owner and exact path | Main / PR status | Boundary | Action and overlap control | Dynamic risk | Recovery |
|---|---|---|---|---|---|
| `foreigners-china-hotel` — `/guides/foreigners-china-hotel/` | Published; EN/ZH/KO. PR #74's matching FAQ/date update is now in main: `dateModified: 2026-08-20`, while `sourceReviewedDate` remains **2026-08-13**. | Nationwide foreign-passport hotel check-in, hotel registration, hotel-vs-non-hotel boundary, platform/front-desk distinction and refusal recovery. | **Primary First-24-Hours accommodation owner. Keep the merged update in this owner; no new hotel-registration page.** Source log says sources reopened 2026-08-20, so align the review date if the review was substantive. | **Critical/high** — NIA/local registration route and platform execution | **Strong.** Refusal, no-show protection, replacement and correct escalation channels. |
| `commercial-aparthotel-or-residential-rental-china` — `/guides/commercial-aparthotel-or-residential-rental-china/` | Published; EN/ZH/KO; reviewed **2026-08-13** | Chooses commercial versus residential operating model and applies the non-hotel registration branch. | **Supporting comparison owner.** Link after a traveller says “private apartment/residential rental”; do not let it displace the nationwide hotel owner. | **High** | **Strong.** Host/guard/unit/registration failure table. |
| `minsu-homestay-or-hotel-china` — `/guides/minsu-homestay-or-hotel-china/` | Published; EN/ZH/KO; reviewed **2026-08-13** | Decodes accommodation labels and operating model; does not make `minsu` a legal registration category. | **Supporting comparison owner.** Hub should not link it by default or restate its registration copy. | **High** | **Strong.** Late-arrival and unsafe/unclear-stay switch rules. |
| `serviced-apartment-or-hotel-china` — `/guides/serviced-apartment-or-hotel-china/` | Published; EN/ZH/KO; reviewed **2026-08-13** | Longer-stay daily-routine/property-type decision after confirming a commercial operator. | **Supporting only.** Not the non-hotel registration canonical. | **High** | **Strong.** Change property when access, registration or service chain fails. |

The registration cluster already repeats the national hotel/non-hotel distinction across comparison guides. For the Hub, use `foreigners-china-hotel` as the single default owner. Send a traveller to the apartment/minsu/serviced comparison only after the lodging type creates that separate choice. Do not create `china-non-hotel-registration`, city registration pages or an “online registration pilot” news page without a new central decision.

## E. Arrival-day, airport and transfer owners

| Owner and exact path | Main status / review | Boundary | Action | Dynamic risk | Recovery |
|---|---|---|---|---|---|
| `china-arrival-day-booked-anchor-or-flexible-block` — `/guides/china-arrival-day-booked-anchor-or-flexible-block/` | Published; EN/ZH/KO; reviewed **2026-08-13**. Its source log still says asset QA pending even though main carries published metadata/asset path. | Decides whether an arrival day can carry a timed booking; not a complete arrival checklist and not an arrival-card page. | **Canonical planning owner; repair inventory label.** Hub links it after essential tasks, without copying its serial-chain analysis. | **High** — arrival-card, transport, baggage and venue examples | **Strong.** Recovers at first failed node and deletes the fragile booking. |
| `china-private-transfer-or-public-transport` — `/guides/china-private-transfer-or-public-transport/` | Published; EN/ZH/KO; reviewed **2026-08-13** | Chooses ground-transfer mode by verified weak link; no provider ranking or guaranteed driver outcome. | **Canonical general airport-to-stay mode owner.** | **High** | **Strong.** Flight/bag/driver/network failure table beginning from an official node. |
| `shanghai-pudong-or-hongqiao-airport` — `/guides/shanghai-pudong-or-hongqiao-airport/` | Published; EN/ZH/KO; reviewed **2026-08-11** | Whole-trip PVG/SHA selection and wrong-airport recovery; not generic China arrival. | **City-specific owner only.** Link contextually for Shanghai; never absorb into national Hub body. | **Critical/high** — flights, transfers and operating windows | **Strong.** Wrong-airport and missed-flight decision threshold. |
| `guangzhou-baiyun-airport-t2-t3` — `/guides/guangzhou-baiyun-airport-t2-t3/` | Published; EN/ZH/KO; reviewed **2026-08-11** | T2/T3, current access and wrong-terminal recovery; not one page per terminal. | **City-specific owner; P0 airport recheck.** | **Critical/high** — terminal assignments and transport | **Strong.** Wrong-terminal and late-arrival fallback. |
| `pudong-airport-to-shanghai-disneyland` — `/guides/pudong-airport-to-shanghai-disneyland/` | Published; EN/ZH/KO; reviewed **2026-08-11** | Exact PVG-to-Disney-area transfer, including last mile, luggage and late arrival. | **Narrow supporting owner.** Use only when the first stay is Disney-area; do not split by train/taxi/family. | **Critical/high** — timetables, stops and last mile | **Strong.** Late-flight road fallback. |
| `china-separate-flight-tickets-self-transfer-risk` — `/guides/china-separate-flight-tickets-self-transfer-risk/` | Published; EN/ZH/KO; reviewed **2026-08-12** | Contract and recoverability of self-transfers; not a generic immigration or airport guide. | **Supporting only** when the arrival is a self-transfer. | **High** | **Strong.** First-flight disruption sequence and overnight redesign. |

There is no need for a new national “how to get through a China airport” article. The unique Hub owns only the task order: entry basis → arrival card when applicable → border inspection → baggage → Customs/biosecurity → official transfer node → connectivity/payment → check-in/registration. Exact airport/terminal/transfer execution remains with the contextual owners above.

## PR #74 audit and production readback

### Five identities live; merged Search Map snapshot is stale

- `git cat-file -e origin/main:content/guides/china-online-arrival-card/metadata.json` now returns exit **0**. Main contains seven content files plus the hero image, and `git merge-base --is-ancestor b66fc6c origin/main` also returns **0**.
- GitHub records PR #74 as **MERGED** at `2026-08-20T15:17:58Z`, with final head `b66fc6c` and merge commit `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`.
- The Search Map version merged in that PR is a pre-release ledger snapshot: its top-level `mergeAuthorized: false` and five item-level `draft-submitted / not-published` states are historical and now stale relative to production. This docs-only sync records the discrepancy but does not edit the Search Map.
- Production readback at `2026-08-21` found exactly 649 unique sitemap URL records. All five PR #74 identities × EN/ZH/KO appeared once; all 15 pages returned HTTP 200 and self-referencing canonicals. The three arrival-card pages also returned `robots: index, follow` and complete locale hreflang.
- The merged `source-log.md` says `CENTRAL FACT REVIEW FIXED — RELEASE REVIEW REQUIRED`. It records that the live form reviewed on 2026-08-20 shows eight exemption categories while the dated 2025 announcement lists seven; this distinction needs a release-day check.

Main-branch presence alone did not prove release; the explicit production HTTP, canonical, robots and sitemap readback does. The Hub may now link the three locale-correct arrival-card owners. Sitemap presence proves discovery inclusion, not external search-engine indexation. Arrival-card publication does not authorize the separate First 24 Hours Hub, which remains employee 4's pending-review implementation.

### Existing-owner updates integrated by PR #74

1. **Singapore**: Main now contains the narrower ordinary-Singapore-passport title/copy, added NIA sources and locale-level `sourceReviewedAt: 2026-08-20`; this is an update to the existing owner, not a new identity. `guideRegistry.ts` still says `dateModified/sourceReviewedDate: 2026-07-28`, so route/structured-data freshness and registry/manifest freshness can disagree. Reconcile the metadata before the next release.
2. **Foreign hotel**: Main now contains matching EN/ZH/KO FAQ modules and `dateModified: 2026-08-20`. Its source log says controlling sources were reopened on 2026-08-20, while metadata keeps `sourceReviewedDate: 2026-08-13`. Confirm whether the review was substantive and then either advance the review date consistently or document that only editorial content changed.

## Mandatory merge/update queue

| Priority | Owner | Required work | Stop condition / invalidation handling |
|---|---|---|---|
| P0 | Whole entry cluster | Reopen NIA/MFA/mission sources for system, US, UK, Canada, NZ, Singapore and 240-hour owners in one review window. Record exact passport, purpose, duration, dates, ports/areas and onward-route conditions. | If an owner cannot be reconciled with a current primary source, remove its positive shortcut from the Hub and route to the competent authority until corrected. |
| P0 | `system-entry-requirements` | Resolve collection metadata discrepancy and confirm its child list after the owner review. | If a child is stale or unavailable, do not present the collection as a current answer; keep it a cautious router. |
| P0 | `china-online-arrival-card` | **Live-state resolved; dynamic-source review remains.** Keep the three locale links active, but reopen the official host, form, free-service language, current eight-category interface versus seven-category 2025 notice, port/paper fallback and fraud warning on source change and before any copy release. | Broken host or changed channel/exemption/fallback invalidates the affected copy; retain the NIA/port fallback and do not guess an advance-submission window or entry outcome. |
| P0 | `foreigners-china-hotel` | Keep the merged FAQ in the existing owner only; align review dates and recheck hotel/non-hotel registration routes. | A material NIA/local-process change removes the affected Hub shortcut until the owner is corrected. |
| P0 | `how-to-pay-in-china-as-a-tourist` | Refresh current official wallet/foreign-card/support behaviour while retaining physical card and cash backup. | If a wallet feature cannot be confirmed, describe it as conditional or remove it; do not choose a universal winner. |
| P0 | `china-esim-vs-local-sim` | Recheck operator foreign-passport service process and exact-device eSIM/dual-SIM manufacturer support. | If compatibility or plan routing is uncertain, preserve the decision question and require exact model/provider confirmation. |
| P0 | `food-plants-and-animal-products-into-china` + Customs owner | Reopen the current prohibited list, Customs declaration categories and official FAQ. Update the existing owners only. | If list/status conflicts, use the conservative leave-out/declare-and-ask route; do not guess an exception. |
| P0 | Airport owners | Recheck terminal/access/timetable facts before using a contextual shortcut. | Broken or contradictory official transport data removes the shortcut, not the whole Hub. |
| P1 | Legacy failure coverage | Add concise failed-document/failed-route recovery to the system and passport/transit owners. | Never promise boarding, admission, visa issuance, extension or a same-day solution. |
| P1 | Inventory labels | Align `source-log.md` statuses with main state, especially the arrival-day asset-pending line. | Documentation must not contradict the actual main/export state. |

## Do-not-duplicate register for this system

1. Do not create a second generic `First day in China`, `China arrival checklist`, `what to do after landing` or “first 24 hours” article. The only permitted artifact is the unique route-only Hub draft.
2. Do not reproduce visa eligibility, duration, purpose or 240-hour tables in the Hub. Link `system-entry-requirements` and its specialized owners.
3. Do not expand the nationality template beyond existing US, UK, Canada, New Zealand and Singapore owners without a distinct legal task, primary sources and named monitoring owner.
4. Do not revive `/china-visa-free-uk-canada/`; preserve it only as a noindex canonical shell.
5. Do not create 240-hour pages by city, province, airport, nationality or route example. Merge examples into `china-240-hour-visa-free-transit-route-check`.
6. Do not create arrival-card pages by port, airline, language, device, exemption or “paid fast track”. `china-online-arrival-card` is the one live trilingual canonical and must remain vendor-neutral and free-government-channel-first.
7. Do not create eSIM/provider rankings, plan roundups, a separate local-number article or a “blocked apps” promise. Merge into `china-esim-vs-local-sim`.
8. Do not create Alipay-vs-WeChat, cash-only, card-only or payment-failed sibling pages. `how-to-pay-in-china-as-a-tourist` owns the stack; ATM no-cash remains the distinct banking dispute owner.
9. Do not create hotel-acceptance, hotel-registration or refusal pages by city/platform. `foreigners-china-hotel` is the national owner. Apartment/minsu/serviced pages are decision-support children, not parallel registration canonicals.
10. Do not turn the 2026 non-hotel online pilot into a standalone news page or present pilot regions as a national universal workflow.
11. Do not split Customs red/green, food, plant, seed, meat, dairy or animal-product synonyms into item pages. The two existing owners divide arrival-channel choice from pre-packing biosecurity.
12. Do not create airport pages per terminal, transport mode, late-arrival group or traveller type. Keep city-specific terminal/airport/transfer owners and route them contextually.
13. Do not split recovery pages by bank, phone brand, booking platform, map provider or hotel chain. Current recovery owners already route to the responsible entity.
14. Do not rank visa agents, eSIM vendors, wallets, booking apps or transfer providers, and do not infer policy, approval, purchase probability or success rate.

## Failure-recovery gap specification for the Hub

The Hub must give every routed task a small “if this fails” edge, but should not reproduce owner instructions. Recommended routing-level text contract:

| Hub task | One routing-level failure action | Destination owner |
|---|---|---|
| Entry basis is unclear or documents conflict | Stop before non-refundable travel; compare the exact passport/purpose/route with the competent Chinese mission/NIA source and operating carrier. Do not select a more convenient policy by analogy. | `system-entry-requirements`, then the specialized passport/240-hour owner |
| Online arrival card fails | Stay on the official NIA channel; preserve accurate source records; use the current official port/device/paper fallback rather than a paid search result. | Live locale-correct `china-online-arrival-card` owner |
| Item/declaration status is unclear | Stop before the green channel and ask Customs; declare uncertainty rather than concealing or casually discarding the item. | `china-customs-red-green-channels` + `food-plants-and-animal-products-into-china` |
| Data/SIM setup fails | Use the independent arrival fallback and diagnose device, line, network and task separately. | `china-esim-vs-local-sim`; airport Wi-Fi owner only when relevant |
| Payment fails | Switch method without repeating an uncertain charge; preserve evidence and keep the physical-card/cash route. | `how-to-pay-in-china-as-a-tourist`; ATM owner for debit/no cash |
| Transfer fails | Return to a staffed official transport node, show an offline Chinese address and remove any fragile timed activity. | `china-private-transfer-or-public-transport` + contextual airport owner |
| Check-in/registration fails | Identify booking, document and registration cause; protect the no-show record; move to a staffed alternative when needed. | `foreigners-china-hotel` |
| Phone, passport, pin or booking is lost/wrong | Route to the dedicated recovery owner; never expose identity/payment data in public. | Lost-phone, lost-passport, map-pin or dispute-evidence owner |

## Evidence commands and reproducible counts

Read-only commands used from `C:/Users/User/Documents/homeground-worker-6-arrival-system-live-sync-20260821`:

```powershell
git -c safe.directory=$repo -C $repo rev-parse HEAD
git -c safe.directory=$repo -C $repo rev-parse origin/main
git -c safe.directory=$repo -C $repo log -3 --oneline origin/main
git -c safe.directory=$repo -C $repo show --summary --format=fuller ef1898745a3c7a6e7cd308aa341c352f24fe9d01
git -c safe.directory=$repo -C $repo merge-base --is-ancestor b66fc6c origin/main
git -c safe.directory=$repo -C $repo cat-file -e 'origin/main:content/guides/china-online-arrival-card/metadata.json'
git -c safe.directory=$repo -C $repo ls-tree -r --name-only origin/main content/guides/china-online-arrival-card public/images/guides/china-online-arrival-card
rg -n 'essentials-20260820-china-online-arrival-card|approved-owner-not-published|planning-20260820-first-24-hours|publicationStatus|liveUrls' docs/organic-growth/search-map.json
gh pr view 74 --json number,state,isDraft,mergedAt,mergeCommit,headRefName,baseRefName,url
git -c safe.directory=$repo -C $repo log --format='%h %cs %s' origin/main -- content/guides/food-plants-and-animal-products-into-china
git -c safe.directory=$repo -C $repo ls-tree -d --name-only origin/main content/guides/food-plants-and-animal-products-into-china
```

Inventory checks:

- `content/guides`: **157** directories, **157** metadata files, all **157 trilingual**.
- Protected legacy guide IDs in `lib/guideRegistry.ts`: **19** site-wide.
- Selected generated arrival/practical owners in this audit: **23/23 represented in main code and live**, including the trilingual arrival-card owner.
- Selected legacy entry owners: **6/6 present** in the registry; US/Singapore/240-hour are trilingual, UK/Canada/New Zealand are English-only.
- System entry collection: **1**, English-only.
- Code-represented owner count in this bounded system: `23 + 6 + 1 = 30`.
- Publication/release ledger count: **30 published/live owners**.

## Central decision summary

- **Canonical/link**: link all 30 published/live owners, including the locale-correct `china-online-arrival-card` URLs.
- **Integrated update, never new page**: PR #74 is merged; retain its Singapore and foreign-hotel changes in their existing owners, reconcile their metadata, and execute the dynamic-review queue.
- **Unpublished**: only the separate First-24-Hours Hub in this system package remains a durable pending-review draft. Employee 4 / planning owns canonical execution; employee 6 owns source maintenance and trilingual draft handoff, not a second page identity.
- **Held**: entry eligibility checker.
- **Retired as an owner**: combined UK/Canada shell.
- **Highest cannibalization controls**: one system entry router; existing nationality owners only; one 240-hour owner; one live trilingual arrival-card owner; one eSIM owner; one payment-stack owner; one national hotel/registration owner; one Customs-channel owner plus one food/biosecurity owner; one route-only First-24-Hours durable draft under employee 4.
