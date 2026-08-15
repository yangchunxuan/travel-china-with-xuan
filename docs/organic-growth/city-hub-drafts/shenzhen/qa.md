# Shenzhen Destination Hub — QA report

- **QA date:** 2026-08-15
- **Target branch:** `codex/city-hub-shenzhen-draft-20260815`
- **Base commit verified:** `cc6be75e59155935f321df0334588b52769eb6e4`
- **Proposed canonical:** `/destinations/shenzhen/`
- **Review state:** central editorial and platform review required

## 1. Deliverable inventory

| Required file | Present | Purpose |
|---|---:|---|
| `hub.en.md` | Yes | Complete English destination-hub draft |
| `hub.zh.md` | Yes | Complete Simplified Chinese destination-hub draft |
| `hub.ko.md` | Yes | Complete Korean destination-hub draft |
| `entity-graph.json` | Yes | Proposed city, district, station, checkpoint, stay-zone and regional-route graph |
| `source-log.md` | Yes | Repository, official-source, dynamic-fact and public-edge audit trail |
| `image-plan.md` | Yes | Real-photo candidates, rights notes and two original diagram specifications |
| `internal-links.md` | Yes | Live-200 link inventory, withheld-owner links and activation procedure |
| `qa.md` | Yes | This verification record |

No public page implementation, homepage, registry, sitemap, Search Map or indexability file is part of the draft path.

## 2. Language and structural completeness

Automated counts use headings and Markdown table delimiters. English word count uses Latin word-like tokens; Chinese and Korean completeness is assessed through character volume and structural parity rather than forcing an invalid one-language word-count formula.

| Check | English | Simplified Chinese | Korean | Result |
|---|---:|---:|---:|---|
| Body size | 24,246 bytes | 20,051 bytes | 24,839 bytes | Comparable full articles |
| Primary volume measure | 3,449 English word-like tokens | 5,532 CJK characters | 6,700 Hangul syllables | English inside required 2,600–3,600 range; Chinese/Korean not summaries |
| H2 modules | 11 | 11 | 11 | Pass |
| H3 modules | 18 | 18 | 18 | Pass |
| Decision tables | 7 | 7 | 7 | Pass; requirement ≥3 |
| Arrival/cross-border scenarios | 3 | 3 | 3 | Pass; requirement ≥2 |
| FAQ entries | 10 | 10 | 10 | Pass; requirement 8–10 |

All three versions follow the same decision architecture while using natural language rather than sentence-by-sentence machine-style mirroring.

## 3. Required editorial modules

| Requirement | Verification | Result |
|---|---|---:|
| Shenzhen as Hong Kong border gateway, modern-city experience and Pearl River Delta node | Opening and regional relationship sections in all languages | Pass |
| Honest fit by traveller type | First decision table distinguishes modern-city/design/technology/short-stop users from history-led first visitors | Pass |
| One, two and three nights | Dedicated night-allocation table and explanatory paragraphs | Pass |
| Luohu, Futian, Nanshan and Shekou stay tasks | City-level summary present; exact comparison retained by accommodation owner | Pass |
| SZX and actual railway stations | SZX, Shenzhen North, Futian, Shenzhen, Shenzhen East, Pingshan, Guangmingcheng and airport-area intercity stations distinguished | Pass |
| Futian Railway Station vs Futian Port | Separate prose, table rows, FAQ and graph nodes | Pass |
| Luohu Port vs Shenzhen Railway Station | Separate prose, table rows, FAQ and graph nodes; adjacency is not identity | Pass |
| Shenzhen Bay, Huanggang, Liantang, Wenjindu and Shekou | Separate checkpoint/port rows and graph nodes | Pass |
| Luohu / Futian / Nanshan / Shekou / Dapeng experience clusters | Five distinct subsections; Dapeng described as a separate distant outing | Pass |
| Hong Kong, Guangzhou, Macao and Pearl River Delta route role | Dedicated decision table and one-way route analysis | Pass |
| Day-trip vs overnight border/luggage cost | Two-clearance, luggage, last-service and hotel-move costs stated | Pass |
| Current owners and planning entry | Four owner slugs named without rewriting; verified itinerary-pace page linked | Pass |

## 4. Editorial prohibitions and truthfulness checks

| Check | Method | Result |
|---|---|---:|
| No “China Silicon Valley” slogan in the body | Case-sensitive and translated-phrase scan | Pass |
| Shenzhen not framed as a traditional ancient capital | Manual review of opening, Luohu and Guangzhou comparison | Pass |
| Page is not a technology-company or shopping list | Experience clusters include public space, border systems, port history, adaptive reuse and coastal structure | Pass |
| No private company campus presented as a default attraction | Manual review of Nanshan section | Pass |
| No `/guides/shenzhen-travel-guide/` page or link | Path scan; the string occurs only as an explicit forbidden field in `entity-graph.json` | Pass |
| No universal Hong Kong re-entry assumption | All three scenarios/FAQs say the return is a separate entry event and defer eligibility to immigration authorities | Pass |
| No tourist-flight promise | Low-altitude handoff explicitly refuses to infer bookable sightseeing flights | Pass |
| No Dapeng-as-central-add-on claim | Dapeng requires a full day or overnight and replaces other city time | Pass |

## 5. Entity-graph validation

Automated JSON parse and reference-integrity checks were run against `entity-graph.json`.

| Check | Result |
|---|---:|
| Valid JSON | Pass |
| Graph status is `proposed` | Pass |
| `primaryEntityId` proposal is `city-shenzhen` | Pass |
| `parentEntityId` proposal is `province-guangdong` | Pass |
| Central registry mutation flag is `false` | Pass |
| Total nodes | 43 |
| Total edges | 54 |
| Duplicate node IDs | None |
| Edges with missing node references | None |
| Guangdong, Shenzhen, Luohu, Futian, Nanshan and Shekou nodes | Present |
| SZX and railway-station nodes | Present |
| Futian, Luohu, Huanggang, Shenzhen Bay, Liantang, Wenjindu and Shekou checkpoint/port nodes | Present |
| Hong Kong counterpart nodes | Present |
| Luohu/Futian/Nanshan/Shekou stay-zone nodes | Present |
| Hong Kong, Guangzhou and Macao route relationships | Present |
| Futian station/checkpoint `notSameAs` edge | Present |
| Shenzhen Railway Station/Luohu adjacency-with-distinction edge | Present |
| Lok Ma Chau Spur Line/road control-point distinction | Present |
| Legacy `place-shenzhen` migration note | Present; no central rewrite performed |
| Volatile hours and visa rules excluded as canonical graph properties | Pass |

## 6. Dynamic-source verification

| Dynamic issue | Sources checked on 2026-08-15 | Result in draft |
|---|---|---|
| Shenzhen-side port hours | Shenzhen Municipal Government Port Office, page updated 2026-07-26 | Audit snapshot in `source-log.md`; evergreen body tells users to recheck |
| Hong Kong control-point hours | Hong Kong Immigration Department, page dated 2026-06-26 | Cross-checked with Shenzhen-side table |
| Luohu and Futian East Rail relationships | MTR official East Rail information | Correct counterpart relationships used |
| Hong Kong re-entry condition | Hong Kong Immigration Department entry guidelines and re-entry page | Conditional rule stated; no personal eligibility decision |
| Huanggang redevelopment | Shenzhen Port Office + Hong Kong Transport and Logistics Bureau | Temporary-facility operation retained; no unsupported new-port opening claim |
| SZX metro relationship | Shenzhen Airport official transport page | Line 11 relationship used; volatile last-service time not hard-coded |
| Railway-station identities | Shenzhen Government Online + 12306 authority handoff | Full station names used; no permanent timetable promise |

Dynamic port, rail, ferry, construction and entry facts must be checked again on the actual publication day.

## 7. Image QA

| Check | Result |
|---|---:|
| Real Shenzhen hero candidate | Present — Talent Park / Shenzhen Bay photograph |
| Real location photographs | Four — Civic Center, Huaqiangbei, Shekou Sea World and Shenzhen Railway Station |
| Creator, source page, date, dimensions and licence recorded | Present for all primary candidates |
| Original east–west city-structure diagram specification | Present |
| Original station/checkpoint relationship diagram specification | Present |
| Diagram states “illustrative, not to scale” | Required in specification |
| Map tiles or copied transit map proposed | No |
| AI-generated city documentary image proposed | No |
| Station/checkpoint image substitution risk addressed | Yes |
| Final pre-ingestion licence recheck required | Yes |

## 8. Internal-link QA

The public guide index and live pages were checked on 2026-08-15.

| Check | Result |
|---|---:|
| English itinerary-pace link retrievable | Pass |
| Simplified Chinese itinerary-pace link retrievable through language switcher | Pass |
| Korean itinerary-pace link retrievable through language switcher | Pass |
| Root-relative Markdown links in English body | 1 — verified itinerary-pace route |
| Root-relative Markdown links in Chinese body | 1 — verified localized itinerary-pace route |
| Root-relative Markdown links in Korean body | 1 — verified localized itinerary-pace route |
| Four required Shenzhen owners named in every body | Pass |
| Four required Shenzhen owner links activated | No — intentionally withheld because production HTTP 200 could not be independently established |
| Missing owner routes misrepresented as live | No |

**Central integration gate:** deploy or expose the four current owners, run the direct edge checks in `internal-links.md`, and activate each link only after its exact locale route returns a real 200 rather than a generic fallback or soft 404.

## 9. Git and protected-surface checks

A temporary Git staging index containing only `docs/organic-growth/city-hub-drafts/shenzhen/` was used for whitespace validation.

| Check | Result |
|---|---:|
| `git diff --cached --check` equivalent for the draft path | Pass, exit code 0 |
| Trailing whitespace | None after cleanup |
| JSON syntax | Pass |
| Files outside draft directory in local deliverable | None |
| Homepage modified | No |
| Entity registry modified | No |
| Sitemap modified | No |
| Search Map modified | No |
| Indexability configuration modified | No |
| Public `/destinations/shenzhen/` implementation created | No |

### Remote publication result

- Requested branch: `codex/city-hub-shenzhen-draft-20260815`
- Required base: `cc6be75e59155935f321df0334588b52769eb6e4` (verified as the current `origin/main` during research)
- GitHub App branch creation attempt: blocked with `403 Resource not accessible by integration`
- GitHub App ref-update attempt: blocked with the same `403`
- Draft PR creation attempt, using the required title and head branch: blocked with the same `403`
- Remote push and Draft PR: not created; reporting otherwise would be inaccurate
- Recovery artifact: the final handoff includes an addition-only patch, a ZIP preserving repository-relative paths and a SHA-256 manifest

This is an operational permission blocker, not a content-QA failure. The content package itself is ready for central review and is not approved for public indexing.

## 10. Central reviewer checklist

- [ ] Confirm the entity proposal and whether `province-guangdong` should be added before `city-shenzhen`.
- [ ] Resolve the published `place-shenzhen` legacy identifier without changing specialist ownership.
- [ ] Recheck every checkpoint’s current passenger hours on publication day.
- [ ] Confirm whether the redeveloped Huanggang Port has a joint official public-opening notice.
- [ ] Verify all four required owner routes return real HTTP 200 in English, Chinese and Korean, then activate the withheld links.
- [ ] Verify the formal production sitemap independently; do not expose the destination path while it remains a draft.
- [ ] Review Chinese and Korean naturalness with a native editor.
- [ ] Re-open Commons file pages and record final attribution/derivative metadata.
- [ ] Build the two original SVG diagrams without copied map assets.
- [ ] Keep accommodation execution, border steps, three-city order and low-altitude evidence with their current owners.
- [ ] Run the repository’s final full validation and `git diff --check` after integration.

## QA conclusion

The requested trilingual city-hub draft, entity proposal, source audit, visual plan and owner handoffs are complete. The only intentional publication blocker is the production-200 verification and activation of the four required owner links, plus normal central entity/path review. No protected public surface has been modified.
