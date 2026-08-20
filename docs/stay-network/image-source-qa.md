# Stay network image, source, and QA requirements

Status: production checklist and evidence ledger specification. It does not grant rights to an image, validate a source, or mark any page ready by itself.

Review baseline: 2026-08-20. Reconcile repository paths and checks against PR 74 / `origin/main` `ef189874` during central integration.

## Image evidence standard

Images must help a traveller judge a real stay decision. A generic skyline can orient a city Hub, but it cannot prove a street-to-hotel route, station access, room feature, or front-desk procedure.

Preferred real scenes:

- an area's actual street and evening environment;
- the route from a named station exit or drop-off point to the lodging block;
- gradients, stairs, overpasses, tunnels, pedestrian-only lanes, kerbs, and crossings that change last-mile effort;
- a railway station/airport/scenic gateway exterior and the relevant public arrival context;
- a real property entrance or public lobby when the article needs a property-specific verification example;
- for accessibility verification, consented and accurately measured entrance, lift, door, bed-clearance, and bathroom features;
- for fire-safety guidance, non-sensitive examples of posted exit signs and traveller-level checks, never a complete floor plan or room number;
- the same area after dark when evening access/noise/activity is a material trade-off.

## Asset ledger

Each planned or supplied asset needs a record with:

| Field | Required evidence |
| --- | --- |
| `assetId` | Stable internal ID referenced by the public area record |
| `cityId` / `areaId` | Exact city and area; no grouped destination |
| `sceneType` | Street, gateway, station exit, entrance, lobby, lift, room feature, bathroom feature, night context, or orientation |
| `locationEvidence` | Photographer note, map context, recognizable sign, or other evidence sufficient to verify the claimed place without exposing a guest |
| `capturedAt` | Capture date; material construction/access changes trigger replacement |
| `creator` | Photographer/owner identity in the rights ledger, not necessarily public credit |
| `rightsBasis` | Owned commission, employee-created, supplier-provided with written permission, or compatible licence with saved terms |
| `usageScope` | Web/editorial/translation/social-crop permissions and expiry if any |
| `releaseStatus` | Property permission and recognizable-person release status where required |
| `privacyReview` | Reviewer/date and confirmation of redaction or exclusion |
| `claimSupported` | The single observable fact the image supports; avoid conclusions it cannot prove |
| `altText` | English, Simplified Chinese, and Korean descriptions based on the visible scene |
| `cropPlan` | Hero/card/body ratios and safe focal area |
| `recheckTrigger` | Construction, entrance relocation, station-exit change, signage change, property renovation, or rights expiry |

A plan is not a licence. “Found on Google,” platform screenshots, traveller review photos, and a supplier email attachment without explicit usage rights are not publishable assets.

## Privacy exclusions

Do not publish or retain in an editorial image:

- passport/ID number, document image, visa, face page, nationality tied to identity, or signature;
- booking/order/reference number, QR/barcode, payment/card detail, receipt, or platform account;
- room number, key-card number, Wi-Fi credential, safe code, or an identifiable occupied-room detail;
- front-desk computer screens, registration forms, CCTV screens, staff rosters, guest lists, or phone numbers;
- recognizable guests, children, or staff without the required release;
- a complete non-public floor plan, back-of-house route, security-control location, or other sensitive building detail;
- EXIF GPS or hidden metadata when it creates a privacy/security risk.

Prefer a clean restaging with dummy materials over editing a real guest's document. If redaction is necessary, flatten and inspect the exported asset so hidden layers/text cannot be recovered.

## No synthetic documentary scenes

Do not use generative AI to create or alter a purportedly real hotel, room, street, station, airport, scenic entrance, accessibility feature, fire exit, traveller experience, or check-in interaction. Do not composite a ramp, lift, sign, room feature, staff member, or guest into documentary photography.

Illustrative diagrams may explain a generic decision framework only when clearly labelled as illustrations and when they do not resemble or claim to map a real property. They cannot replace required photographic evidence.

If a cleared real asset is unavailable, keep the page status at assets needed and write a precise shot request. Never fill the slot with a deceptive synthetic scene.

## Ten-city shot planning minimum

For each city owner/Hub update, plan at least:

1. one area-orientation scene showing the actual public realm;
2. one gateway or transit-to-area relationship scene;
3. one last-mile friction or convenience scene;
4. one family/older/mobility-relevant scene when that need changes the decision;
5. one evening or early-departure scene when time-of-day changes the recommendation.

The set can use fewer files only when one image truthfully supports more than one observable fact. Do not reuse the same generic skyline across unrelated decision owners.

For Zhangjiajie, distinguish Zhangjiajie city, the confirmed station/airport context, Wulingyuan/scenic gateways, and the actual sight order. For Guilin and Guangzhou, do not use Yangshuo or Shenzhen images as if they represented the city record. For Hangzhou and Shenzhen, create exact-city assets rather than inheriting grouped planner imagery.

## Source ledger

Every factual claim that can change the decision needs a ledger row:

| Field | Rule |
| --- | --- |
| `sourceId` | Stable ID referenced by records and copy notes |
| `claimId` | One atomic claim; split compound claims |
| `claimType` | Law/policy, transport/gateway, attraction/access, property verification, platform display, or editorial inference |
| `jurisdictionOrScope` | National, municipality/city, operator, scenic area, or request-specific property |
| `publisher` | Official authority/operator or named first-party property/platform for its own displayed fact |
| `urlOrInternalRef` | Canonical official URL or restricted evidence reference |
| `publishedOrEffectiveAt` | If provided by the source |
| `reviewedAt` | Actual check date, not drafting date |
| `language` | Source language; keep original place/agency names |
| `evidenceSummary` | Tight paraphrase of what the source proves |
| `doesNotProve` | Explicit boundary, such as “does not confirm this property's front-desk execution” |
| `volatility` | Low/medium/high plus why |
| `recheckTrigger` | Calendar interval and event-based triggers |
| `localesApplied` | EN/ZH/KO claims checked against the same evidence |
| `reviewer` | Human/editor responsible for verification |

### Source hierarchy

- Laws, registration, government lodging guidance, immigration, accessibility standards, fire-safety rules, and current official escalation routes: current competent Chinese government/authority source.
- Airport, railway, metro, bus, scenic-gateway, construction, closure, entrance, and operating changes: current official operator/authority source.
- A property's room dimensions, foreign-document procedure, payment methods, or access route: current written first-party property confirmation plus dated evidence; a platform may corroborate but cannot replace it.
- A platform label or booking term: the platform's own current display, recorded only as platform evidence.
- Forums, Reddit, Tripadvisor, and reviews: discovery of traveller questions only, never the final authority for policy, operations, or a specific property's current capability.

Do not cite a search-result snippet as evidence. Archive or note enough context to re-find the official page without republishing copyrighted material.

## Three-layer foreign-guest QA

For every statement about foreign guests, reviewers must be able to answer all three independently:

1. What does the current official legal/administrative source say, and on what review date?
2. What did the booking platform display, if checked, and when?
3. What did the specific property's front desk/reservations team confirm, decline, or fail to confirm, and when does that confirmation expire?

Fail the page if copy treats a platform label as law, turns one property's response into a brand/city rule, or promises that all foreigners can stay/check in.

## Accessibility QA

An “accessible room” label does not pass QA. For the traveller's functional needs, verify the chain:

1. street/drop-off to entrance;
2. entrance threshold/door to front desk;
3. front desk to lift;
4. lift door/cabin and route to assigned room;
5. room-door clear width and internal turning/bed route;
6. bathroom entrance, toilet/grab bars, shower threshold/seat, and transfer space;
7. evacuation discussion and alternative room/property when the route fails.

Measurements must state units and how/where measured. Photos must show scale without personal data. A failed or unverified segment changes the conclusion and triggers a backup, not optimistic copy.

## Public owner / Hub QA

Before an area decision can publish:

- canonical audit shows one owner for the search task;
- exact city/area IDs are correct and grouped planner IDs are not used;
- the page starts with a direct conditional answer, not a hotel list;
- first-time, family, older, mobility, airport/station, and sight-order conclusions state who fits, who does not, and the trade-off;
- “near metro” is explained through the actual station entrance, transfer/vertical route, luggage, operating-time, and last-mile conditions, with no universal distance threshold;
- no named property, supplier, live price, inventory, availability, acceptance, or guarantee is serialized into public decision data;
- source review date is visible in the editorial/source record;
- dynamic claims have official current sources and recheck triggers;
- English, Simplified Chinese, and Korean contain the same decision objects, conditions, recovery steps, source scope, and limitations;
- parent collection plus two to four relevant live internal links are valid and reciprocal where appropriate;
- consultation wording is light, accurately describes human review, and makes no booking/refund/outcome promise;
- image ledger proves location, rights, privacy review, and observable claim;
- page status remains assets/review needed when a required real scene or source is missing.

## Contract and privacy QA

Run the contract test and fail the integration if any of these occur:

- the ten-city list differs or accepts a grouped destination ID;
- a public area record contains a property/hotel/supplier, price/quote, inventory/availability, foreign-guest acceptance flag, PII, or guarantee;
- legal rule, platform display, and property confirmation are collapsed into one boolean;
- supplier sharing defaults to true or carries recipients/fields before consent;
- a quote or verification record becomes public content, client UI state, or analytics;
- an expiry precedes verification/quote receipt;
- an unknown field silently passes validation.

Suggested command at this baseline:

```powershell
node --experimental-strip-types --test supabase/tests/stay-network-contract.test.mjs
```

Also run the repository's existing content, link, schema, privacy, and locale-parity checks. Passing this narrow test is not evidence that a full production build passed.

## Release blockers

Keep the affected item in central review when any of the following remains:

- official source cannot be verified or review date is missing;
- current transport/gateway/access condition conflicts across official sources;
- property confirmation is expired, verbal-only when written proof is necessary, or contradicts the platform;
- a needed access-chain segment is unverified;
- an image lacks location evidence, rights, release, privacy review, or current relevance;
- EN/ZH/KO decision conditions or recovery steps differ materially;
- canonical ownership is ambiguous;
- the public/private boundary or supplier-sharing consent is not implemented end to end;
- PR 74 / `origin/main` `ef189874` changes the audited inquiry, privacy, or content assumptions and has not been reconciled.
