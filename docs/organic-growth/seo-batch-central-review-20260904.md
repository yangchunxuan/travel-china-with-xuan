# SEO batch central review — 2026-09-04

Status: **CENTRAL CONTENT REVIEW PASSED — RELEASE GATE HELD**

## Decision

- Reviewed scope: 30 candidate tickets, comprising 29 new guide identities and one material update to `china-hub-and-spoke-or-multi-base-route`.
- Content decision: 30/30 pass editorial, human-usefulness, trilingual-structure and source review. No candidate is held for a P1 or P2 content defect.
- High-risk decision: 7/7 pass deep review; no dynamic policy, medical, driving, medicine, pet-entry or food-safety statement was accepted as an unconditional guarantee.
- Standard-guide decision: 23/23 pass direct-answer, decision-path, recovery-path, internal-link, source and CTA review.
- Public release decision: held. All 30 registry decisions remain `pending`, all candidate metadata remains `provisional`, and all candidate `indexApproved` values remain `false` until the actual deployment batch can write a truthful release date and change all four release fields atomically.
- Current public effect: zero new candidate URLs are exposed by dynamic routes, search, Hubs or sitemap. The pending replacement version is not served; the 3 locale URLs of the frozen baseline version remain represented in coverage.
- This review creates no PR, merge or deployment.

The central authority delegated for this review is used to approve content readiness and to reject unsafe release shortcuts. It is not used to invent an unknown deployment date.

## Reconciliation

| Measure | Result |
| --- | ---: |
| Frozen independent guides | 173 |
| Frozen legacy guides | 19 |
| Frozen baseline identities | 192 |
| New candidate identities | 29 |
| Material-update tickets | 1 |
| Total guide identities in coverage | 221 |
| Total locale URL rows | 655 |
| New candidate locale URL rows | 87 |
| Locale URL rows currently passing the sitemap gate | 568 |

The 568 count is not a claim about Google crawling or indexing. It is the repository's approved canonical/sitemap state. Search Console crawling, indexing and performance remain separate observations.

## Candidate dispositions

Every row below is **content ready / release pending**.

| Candidate | Guide ID | Review class |
| --- | --- | --- |
| e6-20260901-01 | `animal-bite-rabies-exposure-china` | high-risk fact |
| w4-seo-20260901-02 | `beijing-datong-pingyao-xian-route-order` | standard |
| w3-seo-20260901-03 | `beijing-peking-opera-first-performance` | standard |
| w4-seo-20260901-04 | `beijing-xian-guilin-shanghai-route-order` | standard |
| w4-seo-20260901-01 | `beijing-xian-shanghai-route-order` | standard |
| e6-20260901-06 | `bringing-dog-or-cat-into-china` | high-risk fact |
| e6-20260901-05 | `bringing-prescription-medicine-into-china` | high-risk fact |
| stay-seo-20260901-01 | `canton-fair-pazhou-tianhe-yuexiu-hotel-base` | standard |
| w3-seo-20260901-05 | `chengdu-wuhou-shrine-reading-route` | standard |
| w4-seo-20260901-05 | `china-itinerary-booking-dependency-order` | standard |
| w4-seo-20260901-06 | `china-hub-and-spoke-or-multi-base-route` | standard / update-existing |
| w3-seo-20260901-06 | `china-national-silk-museum-cocoon-to-conservation-route` | standard |
| e6-20260901-02 | `china-severe-weather-warning-trip-recovery` | high-risk fact |
| e6-20260901-03 | `china-tourist-temporary-driving-permit` | high-risk fact |
| w3-seo-20260901-01 | `chongqing-hotpot-first-order` | standard |
| stay-seo-20260901-02 | `daocheng-yading-village-or-shangri-la-town-hotel-base` | standard |
| dest-seo-20260901-04 | `dapeng-fortress-jiaochangwei-day-trip-decision` | standard |
| stay-seo-20260901-06 | `downtown-dunhuang-or-mingsha-mountain-hotel-base` | standard |
| dest-seo-20260901-06 | `dujiangyan-qingcheng-mountain-same-day-or-separate` | standard |
| dest-seo-20260901-09 | `hangzhou-tea-villages-and-museum-selector` | standard |
| stay-seo-20260901-03 | `jiuzhaigou-entrance-or-huanglongjiuzhai-station-hotel-base` | standard |
| dest-seo-20260901-08 | `li-river-cruise-or-yulong-river-raft` | standard |
| e6-20260901-04 | `medical-emergency-in-china-for-travellers` | high-risk fact |
| dest-seo-20260901-10 | `nanjing-purple-mountain-route` | standard |
| dest-seo-20260901-11 | `quanzhou-old-city-maritime-heritage-walk` | standard |
| w4-seo-20260901-03 | `shanghai-hangzhou-huangshan-route-order` | standard |
| stay-seo-20260901-05 | `wuzhen-west-scenic-area-inside-or-outside-hotel-base` | standard |
| stay-seo-20260901-04 | `xian-or-huayin-mount-hua-hotel-base` | standard |
| w3-seo-20260901-02 | `xian-yangrou-paomo-first-bowl` | standard |
| w3-seo-20260901-04 | `yunnan-wild-mushroom-hotpot-safe-ordering` | high-risk fact |

## Content and presentation fixes completed

- Removed internal SEO/editorial wording such as public-facing `owner`/`owns` language from 14 English guide families and replaced it with traveler-facing next-step or responsibility language.
- Removed literal Markdown punctuation that could render visibly in six guide families; an automated hygiene test now covers all 30 candidates and all 90 locale body modules.
- Preserved exact EN/ZH/KO ordered block `{id,type}` parity across all candidates.
- Split pet-entry governance into a publication-time source review and a traveler-specific pre-departure port confirmation, avoiding both an unsafe promise and an impossible universal publication prerequisite.
- Replaced or corrected route and destination imagery for the Beijing–Xi'an–Guilin–Shanghai route, Shanghai–Hangzhou–Huangshan route, Dapeng Fortress and Peking Opera content; corrected the Huangshan CTA across all locales.
- Rebuilt Chinese and Korean font subsets to include the four previously missing Han characters `孜`, `渭`, `漳` and `羌`.

## Structured SEO and production controls

- Added controlled candidate, editorial status, collection, entity, freshness, verification and explicit index-approval fields.
- Added a controlled collection registry and a 96-entity registry (79 net new entities, no removed entities), with parent-cycle and trilingual-label checks.
- Kept the frozen published destination-token resolver unchanged so candidate taxonomy cannot silently rewrite existing production entity assignments.
- Added one shared fail-closed index gate used by public discovery consumers. A new guide needs central approval, editorial approval, explicit index approval and a matching truthful release date.
- Added a hard deployment stop for a partial update to an existing URL. The old deployed page remains the effective version until the replacement is released atomically.
- Added ordered trilingual block-ID/type parity validation.
- Added rejection for unknown collection/entity/status/action values, incomplete governance bundles, invalid dates, future publication/modification dates, modification before publication, and source-verification date drift.
- Froze the 192-identity baseline and update publication-date map to `origin/main@c13d83e1abc8f5f25ee2250de11eed8c424a0196` with offline SHA-256 contract `2e15579df247b17eaf7cdd1a3370a2c60f246dc194e316564608ab4c0de0c4e7`.
- For `update-existing`, the candidate mirror and metadata `datePublished` must both equal the SHA-protected original date. A three-field synchronized forgery is rejected by test.
- The coverage generator reuses the production generator's repository validator; it cannot report a healthier sitemap state from malformed or future-dated data.
- Generator validation is two-stage: it validates all guides and output drift before surfacing the pending-update deployment block, so one expected block cannot hide a later defect.
- Hub discovery and sitemap inclusion require explicit approval. Locale presence alone never approves a Hub or guide.

## Independent blind-review closure

The first governance blind review found five bypass classes: future content dates, invalid `candidateAction`, mutable baseline identity sets, an early pending-update error masking later invalid guides, and coverage using a weaker validation path. All were fixed and mutation-tested.

The second blind review then found that an update could rewrite its original `datePublished`. A first fix was rejected because the candidate and metadata dates could be changed together. The final design binds the ID-to-date map into the hard-coded baseline SHA contract. The reviewer reran the three-field synchronized mutation and returned **PASS**.

Accepted non-blocking architecture note: raw registry/getter exports still exist for legacy/internal consumers. Current route, search, Hub and sitemap consumers are mechanically checked and do not leak candidates; future new consumers should use an approved-only getter or gain an equivalent static assertion.

## Verification results

| Check | Result |
| --- | --- |
| Governance/generator focused tests | PASS — 44/44 |
| Full `supabase/tests/*.test.mjs` | PASS — 742 total; 741 passed, 0 failed, 1 existing skip |
| Direct TypeScript `tsc --noEmit --incremental false` | PASS |
| Coverage generation/check | PASS — 221 identities / 655 locale URLs / 568 sitemap URLs |
| Candidate copy hygiene and trilingual parity | PASS — 30 candidates / 90 bodies; 0 leaks or parity failures |
| Content manifest drift check | PASS; current manifest source contains 0 entries, so this is a drift check rather than candidate coverage evidence |
| Font coverage | PASS — Chinese 2711 required characters; Korean interface/editorial 1198 each |
| Planning-scope line reproduction | PASS — 3 locales |
| High-intent CTA ownership | PASS — 75 unique content IDs; unauthorized paths remain blocked |
| `git diff --check` | PASS; line-ending warnings only |
| `npm ls` | Ajv 8.20.0; fast-uri upgraded from vulnerable 3.1.5 to fixed compatible 3.1.7 |
| Full `npm audit` after lock update | PASS — 0 vulnerabilities |

Expected non-zero release checks:

- `npm run guide:check` reports both the intentionally stale generated registry and the pending material update.
- `npm run typecheck` and `npm run build` stop in the generator before TypeScript/build execution for the same release gate.
- The independent `tsc` run passes. These wrapper failures are the intended proof that this branch cannot be deployed in a half-approved state.

## Atomic release checklist

Run this only in the real deployment batch, using that batch's real date.

1. For each new guide, set `centralDecision=approved`, `editorialStatus=approved`, `indexApproved=true`, and `approvedReleaseDate=datePublished=<actual deployment date>`. Set `dateModified` consistently with the real visible change.
2. For the update ticket, keep `datePublished=baselinePublishedDate=2026-08-12`; set `dateModified=approvedReleaseDate=<actual deployment date>` and set the same three approval states.
3. Do not change `lastVerified` or `sourceReviewedDate` unless sources are genuinely rechecked that day.
4. Regenerate guide registry and coverage inventory.
5. Rerun focused tests, full tests, TypeScript, font/content/planning/CTA checks, complete build and dependency audit.
6. Confirm the approved candidates appear in the correct EN/ZH/KO routes, relevant Hubs and sitemap exactly once, with canonical and hreflang parity.
7. After deployment, perform live production QA; repository results are not evidence that the URLs are live or indexed by Google.

**CENTRAL CONTENT REVIEW PASSED — ATOMIC RELEASE DATE REQUIRED**
