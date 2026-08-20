# Food, plants and animal products into China — durable inventory audit

Audit date: **2026-08-20 (Asia/Shanghai)**
Repository snapshot: `origin/main` / `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`
Canonical slug: `food-plants-and-animal-products-into-china`
Scope: traveller baggage and pre-packing quarantine screen; not a commercial-import guide, pet guide, medicine guide, wildlife-permit guide or customs-channel duplicate.

Live-sync note (2026-08-21): this inventory's official-source and live-page
evidence remains dated 2026-08-20. It is one day old and not age-expired under
the stated weekly/high-risk cadence, but it was not reopened in this status-only
repair. Do not silently advance its fact-review date. Employee 6 maintains the
source handoff; any First 24 Hours implementation remains with employee 4 /
planning after central approval.

## Hard status conclusion

**Actual state: PUBLISHED, INDEXABLE, TRILINGUAL CANONICAL — not unpublished inventory.** Do not create a second page, re-publish it as a new release, or describe it as awaiting its first publication.

Evidence checked on 2026-08-20:

| Surface | Result |
| --- | --- |
| Repository | Complete guide folder on latest `origin/main`; the source log says `READY`; metadata says `datePublished: 2026-08-12`, `dateModified: 2026-08-13`, `sourceReviewedDate: 2026-08-12`. |
| English live page | `https://homegroundchina.com/guides/food-plants-and-animal-products-into-china/` returned HTTP 200; expected title; no `noindex` string detected. |
| Chinese live page | `https://homegroundchina.com/zh/guides/food-plants-and-animal-products-into-china/` returned HTTP 200; expected title; no `noindex` string detected. |
| Korean live page | `https://homegroundchina.com/ko/guides/food-plants-and-animal-products-into-china/` returned HTTP 200; expected title; no `noindex` string detected. |
| Discovery | Slug is present in the live sitemap, the all-guides page, `/essentials/`, and all three `/essentials/entry-transit/` collection pages. |
| Runtime | Every guide in the generated registry is adapted as `status: "published"` and `indexability: { index: true, follow: true }`; this guide's metadata is therefore public, not a dormant folder. |
| Search governance | PR #74 added the slug to Search Map's published-guide baseline, confirming its inventory state. It is still absent from `docs/organic-growth/do-not-repeat.md` and has no dedicated canonical-boundary/dynamic-risk record. This is partial governance, not proof that the page is unpublished. |

Central action: preserve the existing URL as the sole canonical owner. Any source refresh or content correction should be an **update to this page**, subject to central confirmation. This audit does not alter or publish the page.

## Repository inventory

| Object | State | Audit note |
| --- | --- | --- |
| `metadata.json` | Present | Three locale paths, unique title/description/H1 data, 1600 x 1000 hero metadata, public dates. |
| `body.en.ts` | Present | 21 blocks; pre-packing screen, ingredient checks, exceptions, declaration boundary, arrival actions, failure recovery, links and sources. |
| `body.zh.ts` | Present | Same 21 block IDs and same block-type order as English. |
| `body.ko.ts` | Present | Same 21 block IDs and same block-type order as English. |
| `source-log.md` | Present | `READY`; four listed official links, but the active 2025 baggage regulation is missing and one FAQ link is weak evidence. See gaps below. |
| `image-plan.md` | Present | Claims original editorial illustration; privacy boundary is appropriate. |
| Hero asset | Present | `hero-1600.webp`, 1600 x 1000; SHA-256 `34D9C4E6D49B2515DD13D46CA809A73858685321210D4910ADF441BC398DDA1D`, matching `docs/homeground-photo-provenance.md`. |
| Search collection assignment | Present | `lib/searchCollectionI18n.ts` assigns the guide to `essentials-entry-transit`. |
| Search Map / do-not-repeat | Partial | Search Map now lists the slug in the published baseline; add the missing canonical boundary, dynamic-risk treatment and do-not-repeat record without creating another page. |

Git history shows the guide was introduced in `43bf373` and deepened in `35d73f8`; both are ancestors of current `origin/main`. The PR #74 merge did not change this guide folder or its hero asset, so the live/canonical conclusion above is unchanged.

## Canonical boundary and anti-duplication rule

This page owns:

- the **pre-departure item screen** for food, fresh produce, meat, dairy, eggs, plants, seed/propagation material, soil, animal products and other biological/quarantine-risk baggage;
- the decision to remove an item, verify an exact exception and documents, or carry it accessibly for declaration;
- the warning that sealed, cooked, vacuum-packed, gifted or personal-use status is not itself permission;
- the boundary that declaration is a handling route, not permission to import.

`china-customs-red-green-channels` owns:

- the complete arrival declaration-category check;
- red-versus-green channel selection;
- paper/electronic declaration handling and wrong-channel recovery.

The two pages already link to one another. Do not reproduce the full food/product screen in the customs-channel owner, and do not turn this page into a second customs-lane guide. The broader `china-entry-requirements` owner must keep immigration permission separate from customs and quarantine.

Prohibited future duplicates include pages framed only as near-synonyms, for example “Can I bring snacks into China?”, “Can I bring fruit into China?”, “Can I bring meat into China?”, “China food customs rules”, “China plant quarantine for tourists” or nationality-specific versions. They should route to this canonical and, where needed, use an FAQ/example inside it.

## Official fact model: durable core versus dynamic edge

### Durable traveller-facing core, subject to source replacement

The following statements remain supported by the official sources accessed on 2026-08-20:

1. Announcement No. 470 applies to travellers' carried and separately checked baggage and also to mail, express delivery and direct-purchase cross-border e-commerce. It replaced the former No. 1712 list.
2. The authorities expressly state that the No. 470 list may be adjusted dynamically after risk assessment.
3. A product on the prohibited list does not become admissible merely because it is sealed, cooked, a gift, a small quantity or declared.
4. The No. 470 note describes a narrow route for listed goods that have both approval from the competent Chinese authority and an official quarantine certificate from the exporting country or region. The exact item and documents must match.
5. Under the active baggage regime, travellers carrying animals, plants, their products or other quarantine objects must make the required declaration and accept Customs inspection.
6. Paper or electronic declaration is available under the 2025 rules. At a red/green-channel location, a traveller who must declare, does not understand the rule, or does not know which channel to use should choose the red channel.
7. Customs may inspect and sample baggage. Travellers must answer accurately, cooperate with opening/repacking as directed, and must not open or damage a Customs seal.
8. Release still depends on satisfying applicable documentation and quarantine requirements. Customs may retain an item and issue a record, require treatment, allow a return under the applicable conditions, or dispose of an item when the governing rule requires it.
9. Commercial stock or quantities beyond reasonable personal use can move outside the ordinary baggage route and be treated as goods.
10. The port Customs decision controls the actual inspection and disposition. A commercial label, retailer statement or Homeground article is not a clearance certificate.

### Current No. 470 categories

The existing article correctly covers the highest-frequency traveller items and the principal narrow exceptions. For audit completeness, the current official list contains these 17 categories:

| Group | Current listed categories | Narrow wording that must not be broadened |
| --- | --- | --- |
| Animals and animal products | Live animals; raw or cooked meat/offal and products; aquatic-animal products; animal-origin milk/dairy; eggs and egg products; bird's nest; fats/oils, hides, raw wool, hoof/claw, bone, tooth, horn and their products; animal-origin feed, traditional-medicine ingredients and fertiliser | Dogs/cats follow a separate regulated exception; aquatic animal products have a specifically worded exception for dried/cooked/fermented edible sauce products; commercially sterile canned bird's nest is excluded; only specified processed craft items free of blood, muscle and fat fit the craft exception. |
| Plants and plant products | Fresh fruit and vegetables; fresh cut flowers; tobacco leaves; seeds, seedlings and other propagation-capable plants/products/materials | A packaged or decorative presentation does not itself remove the material from quarantine scope. |
| Other quarantine objects | Plant/animal pathogens, pests and other harmful organisms, certain veterinary biological and biological materials/high-risk biological factors; animal carcasses, specimens and waste; soil and organic growing media; genetically modified biological material; other prohibited animals/plants/products/quarantine objects | Medicine, research, biological, wildlife and pet cases may invoke other owners and advance approvals; no traveller-facing exception should be inferred. |

The article's examples are not an exhaustive legal list. The current copy should not be read as allowing a category merely because that category is not in the first screen table.

### Dynamic / critical facts

| Fact | Risk | Review rule | Invalidation action |
| --- | --- | --- | --- |
| No. 470 remains the operative list and has not been superseded or amended | Critical | Weekly while this arrival system is active; again immediately before publication and after any MOA/GACC notice | Freeze claims; compare the new instrument category by category; update all three locales together. |
| Country/region-, disease-, pest- or product-specific temporary restrictions | Critical | Event-driven plus final pre-publication check; traveller should recheck near departure | Remove any general “allowed” implication; send the exact product, origin and route to Customs/arrival-port confirmation. |
| Required approval/certificate for a claimed exception | Critical | Per source change and per unusual traveller case | Do not infer eligibility; remove item or use the competent approval route before travel. |
| Paper/electronic declaration channels and app/mini-program availability | High | Monthly and pre-publication | Keep paper declaration and an in-person Customs desk as fallback; do not promise one app or interface. |
| Port layout, red/green-channel implementation and inspection handling | High | Per port and date of travel | Ask staff to locate Customs before leaving the controlled area; the article must not promise identical signage at every port. |
| Retention, treatment, return, disposal and deadline for one item | High | At event; item-specific | Follow the written Customs record/direction. Do not publish a universal processing or refund timeline. |
| Future legal instruments | Medium until effective | Track effective dates | GACC Announcement No. 111 takes effect 2026-09-01 and concerns quarantine-treatment supervision; Order No. 283 changes several detailed animal/plant rules on 2026-11-01. Current article does not describe treatment methods or commercial fruit import, so no conclusion changes now, but recheck if scope expands. |

## Content and source gaps for central correction

### P1 — active baggage regulation missing from source basis

The source log and in-body source block omit **GACC Order No. 276, the current `中华人民共和国海关进出境行李物品监管办法`, effective 2025-04-01**. It consolidates and repeals six older rules, including the former `出入境人员携带物检疫管理办法`. It directly supports current red-channel uncertainty handling, inspection, Customs seals, retention records, treatment, return/disposal and reasonable-personal-use boundaries.

Correction: add Order No. 276 as a primary source in all three bodies and the source log. Do not use the Customs service-guide page's embedded old No. 1712 list or the repealed carried-item measure as the current legal basis. If that service-guide page remains linked, label it only as a contact/service surface and record the conflict.

### P1 — canonical governance only partly reflects live reality

The guide is live and indexable. PR #74 added its ID to Search Map's published-guide baseline, but did not add the dedicated canonical-boundary/dynamic-risk treatment or a do-not-repeat entry. Add those records with:

- owner: `food-plants-and-animal-products-into-china`;
- boundary: pre-packing product/form/ingredient screen;
- merge aliases: snack, fruit, meat, dairy, egg, seed, plant, soil and animal-product baggage questions;
- sibling owner: `china-customs-red-green-channels` for arrival declaration/channel choice;
- risk: critical/high, not evergreen-low;
- refresh: weekly/pre-publication/on-source-change.

### P1 — runtime volatility is understated

`buildLegacyGuideContentNodes()` marks only guides with `pillar === "entry-rules"` as critical; this guide's pillar is `entry-practicalities`, so runtime metadata assigns **low / quarterly** even though No. 470 expressly allows dynamic adjustment and the article itself says to recheck before travel.

Correction: give this guide an explicit critical/high override or broaden the volatility mapping for customs/quarantine owners. Quarterly alone is not acceptable for the arrival-system ledger.

### P2 — uncommon high-risk categories are easy to miss

The copy is strong on food, fresh produce, seeds, plants and soil, but its quick screen does not plainly surface tobacco leaves, live animals other than the pet handoff, animal-origin feed/fertiliser, animal specimens/waste, pathogens/biological materials or GM biological material.

Correction: add one compact “not a snack, still quarantine-controlled” group or a clear route to the official full list. Do not turn the article into a legal-list transcription and do not imply that unmentioned categories are allowed.

### P2 — in-body evidence count and review dates

The body has only three official source objects; all show `reviewedAt: 2026-08-12`. The source log lists four, but the Customs FAQ URL does not expose useful passenger-list evidence in the static response.

Correction: use at least four independently useful official objects: No. 470 landing/list, current ChinaPort list, Order No. 276, and Announcement No. 43. Update review dates across all three locales together to the actual central review date. The 2026-08-20 recheck in this audit does not silently rewrite public metadata.

### P2 — hero alt text over-describes the asset

The image itself is a privacy-safe abstract leaf/cross-line illustration. The metadata alt says it depicts “a suitcase screening tray with fruit, leaf, meat and quarantine symbols,” which is not visually supported.

Correction: use exact neutral alt text, for example: “Abstract editorial illustration of a green leaf crossed by an amber line.” Keep it documentary-neutral. No people, passport/card/order data, QR code, real inspection scene, logo or location is present.

## Failure actions for the First 24 Hours system

Every task card or Hub link that points here should retain these failure routes:

| Failure point | Traveller action | Boundary |
| --- | --- | --- |
| Cannot identify ingredients, species, origin or processing | Remove the item before travel. If the item matters, save photos of all labels and ask Customs/arrival-port authority with exact details. | A seller, friend, airline or Homeground cannot issue clearance. |
| Official pages conflict or an old list appears | Use No. 470/current ChinaPort for the prohibited categories and the current Order No. 276/Announcement No. 43 for baggage procedure; save the conflicting URLs and ask 12360 or the arrival-port Customs office. | Do not guess which exception applies. |
| Electronic declaration will not load | Use the paper declaration/in-person Customs route and choose red at a red/green-channel port. | Do not choose green merely because the interface failed. |
| Uncertainty appears after landing but before a channel | Keep the item accessible, complete the required declaration, choose red and show the original label and any genuine approval/certificate. | Declaration does not guarantee release. |
| Traveller notices the problem after entering green | Stop and approach Customs before leaving the controlled area or before inspection action; explain the omission accurately. | Do not hide, transfer, discard or split the item. The customs-channel canonical owns the detailed recovery wording. |
| Customs retains the item | Ask for and preserve the official record; do not break a seal; follow the item-specific instruction and deadline on that record. | Do not publish one universal retention or return timeline. |
| Entry is refused or disposal/return is directed | Follow the official route; do not put the item in an ordinary bin, give it to another traveller or take it out of the controlled area. Preserve the record for sender/insurance evidence. | Customs controls disposition. |
| Language prevents a clear explanation | Show the original packaging plus a reliable translation of ingredients, product form and origin; ask airport staff to locate Customs if needed. | Translation helps identification but does not decide admissibility. |

Official contact fallback: the Customs online service guide identifies the relevant authority as the directly responsible/port Customs office and lists the **12360 Customs Service Hotline**. Availability from an overseas phone or a specific port must be checked; do not promise an English-language service level.

## Trilingual, links, image and QA result

### Trilingual parity

- English, Chinese and Korean have the same 21 block IDs and identical block-type order.
- Core categories, narrow exceptions, red-channel warning, failure action, dynamic-rule boundary, source URLs and review dates are aligned.
- No missing failure block or locale-specific legal promise was found in a structural check.
- Central should still do a human language pass when adding Order No. 276 and the uncommon-category line; all three locales must change in the same commit.

### Internal links

All seven unique live link targets used across the locale bodies returned HTTP 200 on 2026-08-20:

- English customs-channel, China-entry-requirements and power-bank owners;
- Chinese customs-channel and power-bank owners;
- Korean customs-channel and power-bank owners.

Chinese and Korean deliberately label the English-only `china-entry-requirements` Hub as English. No broken route was found.

### Image/privacy

- Actual dimensions and SHA match metadata/provenance ledger.
- No identifiable person, passport/card/order number, QR code, logo or real checkpoint/location appears.
- The illustration is suitable only as a neutral decision symbol; it is not proof of a real lane, sign, screen, product or enforcement outcome.
- Required correction: make alt text match the actual abstract leaf image.

### QA verdict

**Durable article baseline: usable and already live. Central update required before treating its source governance as current.** The core traveller advice remains conservative and is consistent with the current No. 470 list, Order No. 276 and Announcement No. 43. No claim promises admission, release, processing time or enforcement outcome. The blocking editorial defects are source/governance defects rather than a reason to create a replacement page.

Recommended central sequence:

1. Record the real `published/indexable` status and canonical/do-not-repeat owner.
2. Add active Order No. 276 and the current ChinaPort list; demote or remove the weak/stale service FAQ as factual evidence.
3. Raise volatility from low/quarterly to critical/high with weekly, pre-publication and source-change checks.
4. Add a compact uncommon-category warning without duplicating the entire official list.
5. Refresh all locale source dates together and correct hero alt text.
6. Run source, structure, parity, internal-link, image and live-route QA; central decides whether/when to publish the update.

## Official sources checked 2026-08-20

1. [MOA/GACC Announcement No. 470 landing page](https://xmsyj.moa.gov.cn/gjjlhz/202111/t20211102_6381054.htm) — scope, replacement of No. 1712, dynamic-adjustment statement and official attachments.
2. [China International Trade Single Window — controlled/prohibited lists and current No. 470 text](https://npc.chinaport.gov.cn/npcdeclhome/home/pages/notice/%E7%AE%A1%E9%99%90%E7%9B%AE%E5%BD%95.html) — complete 17-category list and notes; official operational cross-check.
3. [MOA official-gazette PDF containing Announcement No. 470](https://www.moa.gov.cn/nybgb/2022/202202/202204/P020220401365957599038.pdf) — official archival copy; cite the relevant announcement pages rather than the 128-page file generally.
4. [GACC Announcement No. 43 of 2025 via the State Council government-data service](https://app.www.gov.cn/govdata/gov/202504/05/526129/article.html) — paper/electronic declaration, declaration categories, red/green-channel procedure; effective 2025-04-01.
5. [China International Trade Single Window — GACC Order No. 276](https://npc.chinaport.gov.cn/npcdeclhome/home/pages/notice/276%E5%8F%B7.html) — current baggage-supervision regulation; inspection and disposition process; effective 2025-04-01.
6. [MOFCOM official regulation database — Order No. 276, marked current and effective](https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=102126) — official current-status cross-check and text.
7. [GACC online service guide for carried-item quarantine](https://online.customs.gov.cn/static/pages/guides/000629014001/000629014001.html) — authority/contact and service surface only. Its embedded old No. 1712 list/repealed carried-item measure must not override No. 470/Order No. 276.

Monitor only, not a present conclusion change:

- GACC Announcement No. 111 of 2026, effective 2026-09-01, if treatment-method/process copy is added.
- GACC Order No. 283, effective 2026-11-01, if the article expands into commercial plant/animal import rules; its traveller-facing fresh-fruit prohibition remains consistent with the present conservative screen.
