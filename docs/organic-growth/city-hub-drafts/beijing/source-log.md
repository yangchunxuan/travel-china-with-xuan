# Beijing Destination Hub — source log

**Draft:** `city-hub-beijing`
**Primary entity:** `city-beijing`
**Verified latest main:** `refs/heads/main` → `cc6be75e59155935f321df0334588b52769eb6e4`
**Research and live-page review date:** 2026-08-15
**Dynamic-fact boundary:** reservation rules, opening hours, closures, fares, service allocation, train schedules, airport transport and attraction operating conditions must be checked again for the traveller’s actual date. The Hub uses them only to explain planning structure.

## Repository and editorial sources

| ID | Source | Purpose | Review result |
|---|---|---|---|
| R01 | `docs/article-production-lite.md` | Active content-production convention and independent-folder rule | Read at the requested baseline before drafting |
| R02 | `docs/homeground-search-platform-phase-1-spec.md`, especially §§4.4, 4.5 and 7.3 | Destination-directory state, broad-intent ownership, eligibility, entity support and publication authority | Beijing Hub owns broad city decisions; detailed execution remains with child owners; this draft does not publish or index the route |
| R03 | `docs/organic-growth/search-map.json` | Canonical owner, publication state and anti-cannibalisation audit | No second generic Beijing travel-guide owner created |
| R04 | `content/entities/core-places.json` | Canonical entity IDs | Reused existing `country-china` and `city-beijing`; central entity file unchanged |
| R05 | `app/sitemap.ts` and `lib/searchPlatformManifest.ts` | Formal sitemap and manifest implementation | Sitemap is generated from indexable manifest entries; this draft does not change the manifest, sitemap or indexability |
| R06 | Beijing guide folders, metadata, three-language bodies and source logs in `content/guides/` | Scope and publication audit for existing owners | Hub copy avoids duplicating reservation, gate, station, transfer and detailed route procedures |
| R07 | Remote `main`, `article/*` and `codex/*` refs available through the repository connection | Baseline and duplicate-work check | `main` resolved to `cc6be75e59155935f321df0334588b52769eb6e4`; no competing Beijing Destination Hub owner was identified on 2026-08-15 |
| R08 | Live Homeground guide indexes and directly discoverable public pages | Body-link gate | Only links independently verified as public in the relevant locale were inserted into traveller-facing copy |

## Official factual sources

| ID | Authority and URL | What it supports | Volatility and use boundary | Reviewed |
|---|---|---|---|---|
| S01 | Beijing Municipal Government — Demographic Geography: https://english.beijing.gov.cn/beijinginfo/facts/202006/t20200601_1912281.html | Beijing’s municipal status and broad geography | Stable administrative context. The Hub models Beijing directly under China and does not add a separate provincial parent. | 2026-08-15 |
| S02 | Palace Museum — reservation notice: https://intl.dpm.org.cn/news/detail/97857.html | The Palace Museum uses timed, identity-linked reservation and entry controls | Dynamic mechanics. The Hub states only that the visit is reservation-sensitive; exact release, document and entrance rules remain with the official venue and child owner. | 2026-08-15 |
| S03 | Palace Museum — current ticket channel: https://ticket.dpm.org.cn/ | Current official booking channel | Highly dynamic. No release time, availability or guaranteed entry is copied into the Hub. | 2026-08-15 |
| S04 | National Museum of China — Visit: https://en.chnmuseum.cn/visit_692/ | The National Museum has its own reservation and visitor process | Dynamic. Supports the decision that it is not an automatic fallback when another reservation fails. | 2026-08-15 |
| S05 | National Museum of China — temporary notice: https://en.chnmuseum.cn/home_527/news/202607/t20260723_280196.html | Venue notices can alter normal visitor arrangements | Highly dynamic. Exact temporary arrangements are excluded from evergreen body copy. | 2026-08-15 |
| S06 | Beijing Municipal Government — Tian’anmen Square reservation tips: https://english.beijing.gov.cn/latest/news/202409/t20240923_3903395.html | Tian’anmen is a controlled, reservation-sensitive part of the central cluster | Dynamic. The Hub does not reproduce booking release times or access promises. | 2026-08-15 |
| S07 | Beijing Municipal Government — Jingshan Park: https://english.beijing.gov.cn/specials/ticketing/parks/202407/t20240719_3753324.html | Jingshan lies immediately north of the Forbidden City and completes the south-to-north spatial sequence | Opening and ticket rules remain dynamic; only spatial relationship is used. | 2026-08-15 |
| S08 | Beijing Municipal Government — Temple of Heaven visitor guide: https://english.beijing.gov.cn/specials/parktours/guidevisitors/templeofheaven/ | Large internal scale, multiple gates and southern-centre relationship | Exact gates, opening hours and ritual sequence stay with the official source and child owner. | 2026-08-15 |
| S09 | Beijing Municipal Government — Summer Palace visitor guide: https://english.beijing.gov.cn/specials/parktours/guidevisitors/summerpalace/ | Summer Palace is a substantial northwest-Beijing landscape task | Gate, boat and seasonal-operation details are excluded from the Hub and require recheck. | 2026-08-15 |
| S10 | Mutianyu Great Wall official site — Notice to Visitors: https://en.mutianyugreatwall.com/article/4DlCYuBZ75h | Mutianyu has separate approach, shuttle and ascent systems and several possible walking lengths | Highly dynamic. Current transfer, weather, closures and cable-car operation remain with the child owner and official notice. | 2026-08-15 |
| S11 | Beijing Municipal Government — Mutianyu Great Wall: https://english.beijing.gov.cn/travellinginbeijing/attractions/202603/t20260325_4566115.html | Municipal location in Huairou and the existence of assisted-ascent facilities | Current public-transport instructions are not copied into the Hub. | 2026-08-15 |
| S12 | Beijing Municipal Government — Yanqing Great Wall scenic-area overview: https://english.beijing.gov.cn/latest/news/202405/t20240521_3690533.html | Badaling is a major officially open Yanqing section with extensive managed visitor infrastructure | Not used as a live timetable or crowd prediction. Section choice remains conditional on the traveller and current operations. | 2026-08-15 |
| S13 | China Railway 12306 English: https://www.12306.cn/en/ | The dated ticket and station field are the source of truth for the actual rail departure | Timetables, station allocation and inventory are highly dynamic. The Hub uses the rule “follow the station printed on the ticket.” | 2026-08-15 |
| S14 | Beijing Municipal Government — seven rail stations and two airports connected by subway: https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202412/t20241216_3966828.html | Beijing, North, West, Qinghe, South, Fengtai and Chaoyang as major visitor-facing rail hubs before Tongzhou’s opening | Historical network baseline; reconciled with the later Tongzhou opening source. | 2026-08-15 |
| S15 | Beijing Municipal Government — Beijing Tongzhou Railway Station and Beijing–Tangshan Intercity operation: https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202512/t20251231_4381235.html | Beijing Tongzhou became an operating passenger station serving selected eastbound intercity services | Service allocation remains dynamic. The Hub includes it as the eighth major station, not as a default for central tourists. | 2026-08-15 |
| S16 | Beijing Municipal Government — 2026 summer subway operations: https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202607/t20260707_4750977.html | Current official use of the “eight railway stations and two airports” transport frame | Highly dynamic operational notice; only the network frame is retained. | 2026-08-15 |
| S17 | Beijing Municipal Government — BEIJING PASS at seven stations and two airports: https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202408/t20240801_3764756.html | Corroborates the seven pre-Tongzhou rail hubs and both airports as foreign-visitor gateways | Visitor-service details may change; no card availability promise is made. | 2026-08-15 |
| S18 | Beijing Municipal Government — Beijing Daxing International Airport public-transport update: https://english.beijing.gov.cn/livinginbeijing/transportation/airport/202603/t20260306_4551020.html | PKX’s south-side relationship and connection through the Daxing Airport Express/Caoqiao corridor | Fares, first/last trains and airport-bus services are dynamic and excluded from body copy. | 2026-08-15 |
| S19 | Beijing Capital International Airport / Beijing Service — airport transport: https://english.beijing.gov.cn/specials/beijingservice/pek/trafficone/ | PEK’s northeast-side airport-city transport context | Exact schedules and fares are excluded; recheck on the travel date. | 2026-08-15 |
| S20 | Beijing Municipal Government — weather-related attraction closure example: https://english.beijing.gov.cn/latest/news/202607/t20260710_4756458.html | Weather and safety notices can alter attraction access | Used only to support resilience and rechecking, not as a prediction for future dates. | 2026-08-15 |

## Homeground public-page checks

The Hub body links only content that was independently discoverable as a public page in the corresponding locale during the 2026-08-15 review. A repository owner, metadata record or intended route alone did not qualify.

| ID | Page set | English | Chinese | Korean | Body decision |
|---|---|---|---|---|---|
| H01 | Public guide library | `https://homegroundchina.com/guides/` | `https://homegroundchina.com/zh/guides/` | `https://homegroundchina.com/ko/guides/` | Used to establish locale-level public visibility |
| H02 | Beijing–Zhangjiajie–Shanghai transport | `/guides/beijing-zhangjiajie-shanghai-transport/` | `/zh/guides/beijing-zhangjiajie-shanghai-transport/` | `/ko/guides/beijing-zhangjiajie-shanghai-transport/` | Linked in all three Hub bodies |
| H03 | Beijing–Zhangjiajie–Shanghai in 10 days | `/guides/beijing-zhangjiajie-shanghai-10-days/` | `/zh/guides/beijing-zhangjiajie-shanghai-10-days/` | `/ko/guides/beijing-zhangjiajie-shanghai-10-days/` | Linked in all three Hub bodies |
| H04 | Is your China itinerary too rushed? | `/guides/is-your-china-itinerary-too-rushed/` | `/zh/guides/is-your-china-itinerary-too-rushed/` | `/ko/guides/is-your-china-itinerary-too-rushed/` | Linked in all three Hub bodies |
| H05 | Route Finder | `/#route-finder` | `/zh/#route-finder` | `/ko/#route-finder` | Linked naturally for an unformed route |
| H06 | China itinerary review | `/china-itinerary-review/` | `/zh/china-itinerary-review/` | `/ko/china-itinerary-review/` | Linked naturally for an existing route |

The remaining required Beijing owners were retained in `entity-graph.json` and `internal-links.md` as pending links because a complete live locale set was not independently verified during this review. Their repository status is not treated as proof of a public traveller-facing URL.

## Required child-owner boundary audit

- `beijing-where-to-stay-first-trip`: detailed district and property-access comparison.
- `beijing-courtyard-hotel-or-modern-hotel`: building type, room trade-offs and courtyard/modern fit.
- `which-beijing-railway-station`: exact station identification and station-side execution.
- `beijing-south-station-to-capital-or-daxing-airport`: South Station–PEK/PKX transfer mechanics.
- `beijing-to-mutianyu-great-wall-transfer`: current Mutianyu transfer choices and return recovery.
- `beijing-to-badaling-great-wall-transfer`: current Badaling rail/transfer choices and return recovery.
- `forbidden-city-for-foreign-visitors`: current reservation, identity and entry procedure.
- `national-museum-of-china-booking-and-route`: current reservation and internal visit structure.
- `temple-of-heaven-gates-and-ritual-sequence`: gate choice and ritual sequence.
- `summer-palace-gates-route-and-boat-plan`: gates, internal route and seasonal boat plan.
- `beijing-xian-chengdu-route-order`: detailed three-city sequence and gateway logic.
- `beijing-zhangjiajie-shanghai-10-days`: whole-route duration and transfer-day calculation.

## Evidence exclusions

- No competitor wording was copied from Japan-guide, TravelChinaGuide or another tour operator.
- Forums, Reddit, autocomplete and People Also Ask were not used as factual proof or as a substitute for search-volume data.
- No personal visit, first-hand inspection or client experience is claimed.
- Exact opening hours, booking-release times, fares, train numbers and operating schedules are deliberately absent from the Hub body because they are volatile and belong to official sources or child owners.
