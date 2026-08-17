# Chengdu Destination Hub — QA report

- **QA date:** 2026-08-15
- **Review baseline:** `cc6be75e59155935f321df0334588b52769eb6e4`
- **Target branch:** `codex/city-hub-chengdu-draft-20260815`
- **Proposed canonical:** `/destinations/chengdu/`
- **Primary entity:** `city-chengdu`
- **Review state:** central editorial and platform review required
- **Remote state:** no branch was pushed and no pull request was created

## 1. Deliverable inventory

The patch adds exactly these eight files and no other path:

| Required file | Present | Purpose |
|---|---:|---|
| `hub.en.md` | Yes | Complete English destination-hub draft |
| `hub.zh.md` | Yes | Complete Simplified Chinese destination-hub draft |
| `hub.ko.md` | Yes | Complete Korean destination-hub draft |
| `entity-graph.json` | Yes | City, transport, stay-zone, branch and onward-route graph |
| `source-log.md` | Yes | Repository, official-source and dynamic-fact audit trail |
| `image-plan.md` | Yes | Real-photo candidates, rights boundaries and relationship-diagram brief |
| `internal-links.md` | Yes | Locale-matched public-link inventory and owner boundaries |
| `qa.md` | Yes | This verification record |

No public page, route, registry, sitemap, homepage, Search Map, entity registry or indexability file is modified.

## 2. Language and structural completeness

Counts were generated from the final files. English volume uses Latin word-like tokens. Chinese and Korean completeness is measured by script-specific character volume and structural parity rather than applying an English token formula to another language.

| Check | English | Simplified Chinese | Korean | Result |
|---|---:|---:|---:|---|
| File size | 24,253 bytes | 20,733 bytes | 25,310 bytes | Comparable full articles |
| Primary volume measure | 3,518 English words | 5,638 CJK characters | 6,792 Hangul syllables | English is within 2,600–3,600; ZH/KO are not summaries |
| H2 modules | 12 | 12 | 12 | Pass |
| Decision tables | 6 | 6 | 6 | Pass; requirement ≥3 |
| Traveller scenarios | 2 | 2 | 2 | Pass; requirement ≥2 |
| FAQ entries | 9 | 9 | 9 | Pass; requirement 8–10 |
| Unique traveller-facing link roles | 8 | 8 | 8 | Pass; locale-matched |

The three versions follow the same decision architecture while using natural prose appropriate to each language. They are not line-by-line compressed translations.

## 3. Required editorial modules

| Requirement | Verification | Result |
|---|---|---:|
| Chengdu’s role in a first China route | Slow-paced city, first panda gateway and wider Sichuan portal are separated | Pass |
| Traveller fit | Families, food, culture, nature extensions and very short routes receive explicit trade-offs | Pass |
| Two to three city nights versus four to six regional nights | Uses actual usable sightseeing days and distinguishes where the luggage sleeps | Pass |
| Stay-area tasks | Chunxi Road/Taikoo Li, Tianfu Square, Kuanzhai/People’s Park and Chengdu East each have one primary job | Pass |
| TFU versus CTU | Both active airports are separated; every sector must be confirmed by airport code | Pass |
| Railway stations | Chengdu East, South, West and the changing central Chengdu Station identity are separated | Pass |
| City versus regional branches | Dujiangyan, Guanghan/Sanxingdui, Leshan and Jiuzhaigou are not presented as downtown sights | Pass |
| Onward edges | Chongqing, Xi’an, Dujiangyan, Leshan and Jiuzhaigou route roles are explained | Pass |
| FAQ coverage | All nine assigned questions are answered | Pass |
| Current articles | Seven existing owners are linked without duplicating their execution detail | Pass |
| Natural planning entry | Final handoff goes to the public itinerary review and route-planning service | Pass |

## 4. City-versus-region boundary

The copy preserves the central editorial distinction:

- **Chengdu city:** People’s Park tea-house time, central historical and neighbourhood context, Wuhou/Jinli-side cultural context, contemporary east-centre life, greenway choice and Chengdu Panda Base as a city-edge task.
- **Separate places reached through Chengdu:** Dujiangyan and Panda Valley, Guanghan and Sanxingdui Museum, Leshan and Mount Emei, and Jiuzhaigou.
- **Independent multi-day route:** Jiuzhaigou is never called a Chengdu day trip and receives its own transport handoff and nights.
- **No false geography:** Sanxingdui is located in Guanghan; Leshan is a separate city; Dujiangyan is a separate city west of Chengdu.

No personal visit or first-hand experience is invented.

## 5. Canonical-owner boundary

The Hub owns broad Chengdu choice, duration, stay-area logic, gateway orientation and regional-route classification. It does not absorb the detailed tasks of these current owners:

| Existing owner | Preserved responsibility |
|---|---|
| `chengdu-panda-base-or-dujiangyan-panda-valley` | Venue identity, booking, gate, visitor rules and exact panda-site comparison |
| `sanxingdui-museum-booking-and-gallery-order` | Passport booking, official channel, Guanghan arrival and gallery sequence |
| `chengdu-jiuzhaigou-transport-route` | Exact rail/flight/road handoff, return and disruption planning |
| `chengdu-greenway-city-ring` | Segment, entry, surface, exit and practical route execution |
| `sichuan-opera-face-changing-with-context` | Performance selection and interpretation beyond a mask photograph |
| `beijing-xian-chengdu-route-order` | Three-city direction, gateways and transfer-day calculation |
| `leshan-giant-buddha-land-or-boat-visit` | Land-versus-boat execution and operating-risk recovery |

No duplicate generic Chengdu guide path is created.

## 6. Entity-graph validation

`entity-graph.json` parses as JSON and contains:

- **59 nodes**;
- **67 edges**;
- explicit `existing` or `proposed` status on every node and edge;
- `city-chengdu` as the existing primary entity;
- `province-sichuan` as a proposed central parent relationship without editing the registry;
- both airports, the principal railway stations and all four required stay zones;
- Dujiangyan, Guanghan, Leshan, Mount Emei and Jiuzhaigou as separate place identities;
- Chongqing and Xi’an intercity edges;
- explicit current-owner and FAQ-intent nodes;
- `centralEntityMutation: false` and `publicPageMutation: false`.

Real-world places can be marked `existing` while their central-registry node is still proposed. That distinction is recorded explicitly rather than treating registry absence as geographic non-existence.

## 7. Source and volatility validation

The source log prioritises official or primary channels for:

- Chengdu’s airport system and airport-change notices;
- Chengdu Metro and airport connections;
- China Railway 12306 station and service verification;
- Chengdu Panda Base and Panda Valley;
- Dujiangyan, Guanghan/Sanxingdui, Leshan and Jiuzhaigou;
- Sichuan cultural and tourism context.

High-volatility facts are not frozen into evergreen copy. Before publication or travel, central review must recheck:

- the airport code and terminal for every flight sector;
- airport transfers and terminal operating details;
- the ticketed railway station and current station name;
- live train or flight inventory and transfer connections;
- venue booking, hours, closures and passport procedures;
- performance schedules and attraction operating notices.

The Hub makes no permanent airline-to-airport assignment and publishes no current fare, train number, precise transfer duration or guaranteed crowd level.

## 8. Image-plan validation

The plan requires documentary photography rather than generated city or panda scenes.

- Hero: real People’s Park tea-house photograph with creator, capture date, source and CC0 record.
- Required original graphic: a schematic showing central Chengdu, TFU, CTU, principal stations, stay areas and regional branches.
- Supporting images: three to five real, rights-audited place photographs, including contemporary central Chengdu, greenway, Sanxingdui and Sichuan opera options.
- Panda rule: no generated panda photograph and no venue label without provenance.
- Rights checklist: source, creator, licence, capture date, processing, final dimensions and checksum must enter the central provenance ledger before implementation.
- The relationship graphic is labelled as planning context, not live navigation, and may not contain fixed times or fares.

No image binary is part of this content-only patch.

## 9. Internal-link validation

The successful GitHub Pages artifact built from the review baseline was inspected. Each linked EN, ZH and KO route has:

- exported HTML;
- a self-canonical URL;
- no `noindex` directive;
- an entry in `sitemap.xml`.

The three Hub files use the same eight link roles. Chinese links stay under `/zh/`; Korean links stay under `/ko/`; English links remain unprefixed. No proposed destination path is self-linked. External official sources remain in `source-log.md` rather than competing with the page’s internal navigation.

All draft-file references use `hub.en.md`, `hub.zh.md` and `hub.ko.md`.

## 10. Prohibited-change audit

| Prohibited action | Result |
|---|---:|
| Modify a public destination page | Not done |
| Create a second generic Chengdu guide | Not done |
| Modify central entity records | Not done |
| Modify registry or generated registry | Not done |
| Modify sitemap | Not done |
| Modify homepage | Not done |
| Modify Search Map | Not done |
| Modify indexability | Not done |
| Add an image binary | Not done |
| Push a remote branch | Not done |
| Create a pull request | Not done |

## 11. Automated and Git checks

The final package was validated with local scripted checks and Git plumbing:

```text
python validate_chengdu_hub.py
git diff --check
git format-patch --stdout -1 <local-commit>
git am <patch>   # independent clean verification repository
```

Final checks confirm:

- exactly eight files are changed;
- every changed path is under `docs/organic-growth/city-hub-drafts/chengdu/`;
- all three required filenames use the `hub.<locale>.md` convention;
- English length is inside the specified range;
- all three languages meet table, scenario and FAQ requirements;
- the JSON graph parses and all node/edge references resolve;
- no merge marker, placeholder or disallowed file reference remains;
- all files end with a newline;
- `git diff --check` passes;
- the standard format-patch applies successfully with `git am` in an independent repository;
- the applied files are byte-identical to the reviewed source files.

## 12. Central reviewer checklist

- [ ] Apply the patch from the stated baseline or rebase it carefully onto a later `origin/main`.
- [ ] Recheck that no intervening Chengdu Hub draft has taken the canonical owner.
- [ ] Review the proposed Sichuan parent and all proposed transport/stay-area nodes against the current central entity graph.
- [ ] Reopen dynamic airport, station and venue sources if implementation occurs after the review date.
- [ ] Acquire and rights-clear the hero and supporting photographs.
- [ ] Build and accessibility-test the original city/airport/station/branch relationship diagram.
- [ ] Repeat the public-route HTTP and export checks at implementation time.
- [ ] Run repository-native content, JSON, link, type and build checks after integration.
- [ ] Decide destination-hub publication mode and indexability separately; this draft makes no publication decision.

## QA verdict

The complete three-language Chengdu Destination Hub package satisfies the requested content, ownership, source, entity, image, link and structural constraints. It is suitable for central editorial review as a content artifact. Publication, registry integration, image production and indexability remain separate reviewed decisions.

**CITY HUB DRAFT READY — CENTRAL REVIEW REQUIRED**
