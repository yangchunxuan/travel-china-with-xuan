# Chengdu Destination Hub — source log

**Draft:** `city-hub-chengdu`
**Primary entity:** `city-chengdu`
**Proposed parent:** `province-sichuan`
**Review baseline:** `cc6be75e59155935f321df0334588b52769eb6e4`
**Research and live-page review date:** 2026-08-15
**Dynamic-fact boundary:** airport allocation, terminals, train stations, timetables, fares, attraction hours, reservation windows, temporary closures, shuttle operation and performance schedules must be rechecked for the traveller’s exact date. The Hub uses durable spatial and decision logic rather than freezing a current schedule.

## Baseline and repository audit

The requested baseline was read through the connected GitHub repository. Commit `cc6be75e59155935f321df0334588b52769eb6e4` resolves to root tree `9aec27154eaf82755a38639de4b2d464d3051073`. The draft is designed as an additive child of that commit and does not rely on a later public-page change.

The following production and governance files were reviewed before writing:

| ID | Repository source | Purpose | Draft decision |
|---|---|---|---|
| R01 | `docs/article-production-lite.md` | Current independent-content workflow and no-manual-registry convention | This task remains a review draft under `docs/`; it does not create a runtime guide folder or generated registry entry |
| R02 | `docs/homeground-search-platform-phase-1-spec.md`, especially §§4.4, 4.5 and 7.3 | Destination ownership, eligibility, entity relationships and publication authority | The Chengdu Hub owns broad `Chengdu travel guide` intent but remains central-review material; eligibility never changes indexability automatically |
| R03 | `docs/organic-growth/search-map.json` | Canonical-owner and duplication audit | No `/guides/chengdu-travel-guide/` identity is created; this Hub is the proposed broad city owner |
| R04 | `docs/organic-growth/do-not-repeat.md` | Anti-cannibalisation rules | Panda venue choice remains with its existing owner; city tea-house context is handled in the Hub rather than spun into another thin page |
| R05 | `content/entities/core-places.json` | Existing entity IDs | Reuses `country-china`, `city-chengdu` and `city-xian`; proposes `province-sichuan` only inside the draft graph; central entities remain unchanged |
| R06 | `app/sitemap.ts`, `lib/searchPlatformManifest.ts` and `lib/searchPlatformContentAdapter.ts` | Formal sitemap and indexability implementation | No sitemap, registry, manifest, homepage or indexability file is modified |
| R07 | All Chengdu/Sichuan guide metadata, bodies, source logs and image plans listed below | Child-owner scope and publication audit | The Hub describes when to open a child page and does not copy the child’s execution procedure |
| R08 | GitHub Pages deployment run `31870273435`, artifact `9243242244`, built from the baseline commit | Static production-route verification | All traveller-facing EN/ZH/KO links in the Hub files exist in the successful deployed artifact; no unpublished or speculative path is linked |

## Existing canonical owners reviewed

| Owner | Existing responsibility | What the Hub may say | What the Hub must not copy |
|---|---|---|---|
| `chengdu-panda-base-or-dujiangyan-panda-valley` | Venue identity, institutional distinction, ticket relationship, transport comparison and realistic visit shape | Which venue fits a city stay or Dujiangyan route; a panda visit needs a substantial morning | Current ticket price, booking window, gate procedure, animal count, crowd promise or detailed half-day route |
| `sanxingdui-museum-booking-and-gallery-order` | Passport booking, official channel, Chengdu–Guanghan chain and museum sequence | Sanxingdui is in Guanghan and is a substantial museum day | Live ticket release, gallery closure, current direct service or a copied object-by-object route |
| `chengdu-jiuzhaigou-transport-route` | Exact rail/flight option, named station, road handoff, arrival night and return protection | Jiuzhaigou is an independent multi-day route; rail does not end at the valley entrance | Current timetable, shuttle departure, fare, airline allocation or guaranteed transfer duration |
| `chengdu-greenway-city-ring` | Segment choice, entry/exit logic, walking/cycling range and failure recovery | The greenway is urban infrastructure and one verified segment can add a different city view | A full-loop tourism promise, live rental availability or exact route line |
| `sichuan-opera-face-changing-with-context` | First-audience performance selection and cultural reading | A performance can anchor an evening; face-changing is not the entire art form | Current show schedule, cast, programme, price, photography rule or protected technique explanation |
| `beijing-xian-chengdu-route-order` | Three-city direction, gateway and transfer-day ledger | Xi’an–Chengdu is a strong first-trip edge and airport/station labels must be checked | A universal night allocation, current train or flight schedule, or copied three-city itinerary |
| `leshan-giant-buddha-land-or-boat-visit` | Land/boat choice, separate operating risks and Leshan return | Leshan is a separate city and can be a day or overnight branch | Current ticket, boat operation, pier, gate, water level or exact product availability |

## Official and primary factual sources

| ID | Authority and URL | Supports | Volatility and use boundary | Reviewed |
|---|---|---|---|---|
| S01 | Chengdu Airport official site and live notices: https://www.cdairport.com/index.aspx/en/ | CTU remains active; official flight display, terminals, airport transport and the 2026-07-15 dual-airport transfer notice | Highly dynamic. The Hub freezes no airline-to-airport rule and tells readers to use the airport code on each sector | 2026-08-15 |
| S02 | Chengdu Tianfu International Airport official site: https://www.sctfia.com/ | TFU is a separate operating airport with its own terminal and transport information | Highly dynamic. Terminal, airline, bus and flight assignments require travel-date recheck | 2026-08-15 |
| S03 | Chengdu Rail Transit — Line 18 airport connection: https://www.chengdurail.com/info/1151/33052.htm | Line 18 connects the city rail system with Tianfu Airport | Historical operating source. Current first/last trains and express pattern are not copied |
| S04 | Chengdu Rail Transit — Line 18 operating optimisation: https://www.chengdurail.com/info/1151/47102.htm | Airport-rail services can use different stopping patterns and are adjusted operationally | Dynamic. No 2023 travel time or timetable is presented as a 2026 guarantee |
| S05 | Chengdu Rail Transit — Line 18 phase-three construction: https://www.chengdurail.com/info/1261/55632.htm | The future project is intended to connect Chengdu Station, Chengdu South and Tianfu Airport | Construction status only. The Hub does not imply the phase-three extension is already open |
| S06 | Chengdu Rail Transit — network-hub passenger reporting: https://www.chengdurail.com/info/1161/53292.htm | Chengdu East and Chengdu West are distinct high-volume transport hubs in the metro network | Passenger figures are dated and not copied; used only to support separate-hub identity |
| S07 | China Railway 12306 English: https://www.12306.cn/en/index.html | Official dated train, station and ticket information | Timetables, station allocation and inventory are highly dynamic. The station printed on the ticket controls |
| S08 | Chengdu Museum — museum introduction: https://www.cdmuseum.com/jianjie.html | Tianfu Square has a major city-history museum and Chengdu has a substantial non-panda cultural layer | Exhibition and facility facts may change; Hub uses only the museum’s city-context role |
| S09 | Chengdu Museum — current notices: https://www.cdmuseum.com/gonggao/ | Opening and reservation arrangements can change by holiday, season or exhibition work | Highly dynamic. No opening hour or ticket rule is copied into evergreen Hub copy |
| S10 | Chengdu Research Base of Giant Panda Breeding — institutional introduction: https://www.panda.org.cn/en/about/introduction/ | Chengdu Panda Base and Panda Valley are operated within the same institutional system but have different locations and functions | Stable identity; current visitor operation remains in the child owner and live venue pages |
| S11 | Chengdu Panda Base — visitor information: https://www.panda.org.cn/en/service/ticket/ | Real-name booking, passport use and separate venue ticket logic | Highly dynamic. Prices, windows and hours are excluded from this Hub |
| S12 | Panda Valley — official introduction: https://www.panda.org.cn/en/pandavalley/tour/ | Panda Valley is in Yutang, Dujiangyan and has a field-research/conservation role | Open areas and visitor operations are dynamic; the Hub uses only location and route role |
| S13 | Dujiangyan official tourism/government context: https://www.djy.gov.cn/ | Dujiangyan is an independent city and heritage destination west of Chengdu | City and heritage identity are durable; live ticket, transport and site access require recheck |
| S14 | Sanxingdui Museum official site: https://www.sxd.cn/index.asp | Museum identity, live notice and official booking origin | Highly dynamic. Ticket release, hours and gallery access stay with the child owner |
| S15 | Guanghan Municipal Government — inbound-visitor service: https://www.guanghan.gov.cn/gk/mbjj/gjjmb/1681915.htm | Passport and inbound-document booking support and Guanghan location context | Service mechanics require a live pre-visit check; the Hub does not reproduce them |
| S16 | Jiuzhaigou Valley — July 2026 rail-transfer notice: https://www.jiuzhai.com/news/notice/11241-2026-07-08-03-30-49 | Huanglongjiuzhai Station requires an onward road transfer to the valley | Dated operational notice. No current departure or guaranteed duration is frozen in the Hub |
| S17 | Jiuzhaigou Valley — official arrival guide: https://www.jiuzhai.com/intelligent-service/arrival-mode | Jiuzhaigou access involves a separate airport/rail/road chain | Transport options and operating services are dynamic; used only to establish independent-route status |
| S18 | Leshan Giant Buddha official portal identified by its management authority: https://www.lsdf517.com/ | Leshan Giant Buddha has separate land and river visitor products and live notices | Highly dynamic. Current product, pier, hours and water/weather operation stay with the child owner |
| S19 | Sichuan Provincial Department of Culture and Tourism: https://wlt.sc.gov.cn/ | Provincial cultural-tourism context and the relationship between Chengdu and wider Sichuan | News and campaigns are dated; no popularity statistic or temporary programme is used as evergreen fact |
| S20 | China Intangible Cultural Heritage Network — Sichuan opera: https://www.ihchina.cn/Article/Index/detail?id=13161 | Sichuan opera is a broader performance tradition than face-changing alone | Stable cultural context; performance execution remains date- and venue-specific |

## Homeground production-page verification

The Hub files link only pages present in all three locales in the successful GitHub Pages artifact built from the review baseline. Each route below had an exported `index.html`; the deployment completed successfully before the artifact was inspected.

| Page set | English | Chinese | Korean | Result |
|---|---|---|---|---|
| Panda Base or Panda Valley | `/guides/chengdu-panda-base-or-dujiangyan-panda-valley/` | `/zh/guides/chengdu-panda-base-or-dujiangyan-panda-valley/` | `/ko/guides/chengdu-panda-base-or-dujiangyan-panda-valley/` | linked |
| Sanxingdui booking and route | `/guides/sanxingdui-museum-booking-and-gallery-order/` | `/zh/guides/sanxingdui-museum-booking-and-gallery-order/` | `/ko/guides/sanxingdui-museum-booking-and-gallery-order/` | linked |
| Chengdu–Jiuzhaigou transport | `/guides/chengdu-jiuzhaigou-transport-route/` | `/zh/guides/chengdu-jiuzhaigou-transport-route/` | `/ko/guides/chengdu-jiuzhaigou-transport-route/` | linked |
| Chengdu city-ring greenway | `/guides/chengdu-greenway-city-ring/` | `/zh/guides/chengdu-greenway-city-ring/` | `/ko/guides/chengdu-greenway-city-ring/` | linked |
| Sichuan opera context | `/guides/sichuan-opera-face-changing-with-context/` | `/zh/guides/sichuan-opera-face-changing-with-context/` | `/ko/guides/sichuan-opera-face-changing-with-context/` | linked |
| Beijing–Xi’an–Chengdu route order | `/guides/beijing-xian-chengdu-route-order/` | `/zh/guides/beijing-xian-chengdu-route-order/` | `/ko/guides/beijing-xian-chengdu-route-order/` | linked |
| Leshan land or boat | `/guides/leshan-giant-buddha-land-or-boat-visit/` | `/zh/guides/leshan-giant-buddha-land-or-boat-visit/` | `/ko/guides/leshan-giant-buddha-land-or-boat-visit/` | linked |
| Itinerary review and route planning | `/china-itinerary-review/` | `/zh/china-itinerary-review/` | `/ko/china-itinerary-review/` | linked |

The proposed Destination Hub paths are not included in the current public manifest, deployed artifact or Hub-link list. This draft therefore does not imply that `/destinations/chengdu/` is already public.

## Dynamic-fact handling

### Dual airports

The airport decision is deliberately written as a verification method, not an airline table. A 2026 official notice documented another transfer of selected services between Shuangliu and Tianfu. Therefore:

- every sector must retain its own `TFU` or `CTU` code;
- one airline may not be assigned permanently to one airport;
- a flight into one Chengdu airport and out of the other requires two separate transfers;
- old hotel-transfer notes must not be reused without reading the new ticket;
- first/last metro, terminal, check-in and road-transfer details require travel-date verification.

### Railway stations

The Hub uses Chengdu East, South and West as separate operational identities and treats the rebuilt central Chengdu Station as a high-volatility project. It makes no permanent route-to-station assignment. The current 12306 ticket, including the full Chinese station name, is the source of truth.

### Regional branches

Dujiangyan, Guanghan, Leshan and Jiuzhaigou are not collapsed into Chengdu. Travel times are not fixed because the answer changes with exact station, service, road conditions, hotel and operating date. The durable classification is:

- Dujiangyan: full-day or overnight western branch;
- Guanghan/Sanxingdui: substantial museum day;
- Leshan: full-day or overnight southern branch;
- Jiuzhaigou: independent multi-day route with a road handoff after rail or flight.

## Editorial judgments disclosed

The following are Homeground planning judgments rather than operator guarantees:

- two to three nights are the useful city-only range for most first visits;
- four nights should normally contain one regional branch, not three;
- Chengdu East is a transfer-first stay area, not the best default for a multi-night city visit;
- a panda morning can share a day with one flexible city block but not several fixed long-distance tasks;
- Leshan and Mount Emei are usually a poor first-plan same-day combination;
- five shared Chengdu/Chongqing nights often support a 3/2 split, while six support 3/3;
- Jiuzhaigou must receive its own nights even when the rail portion is faster than older routes.

## Explicit exclusions

The draft does not claim personal experience. It does not publish current fares, exact trip durations, current train numbers, airline assignments, animal counts, guaranteed panda activity, guaranteed crowd levels, restaurant rankings, ticket inventory, performance schedules or temporary venue conditions. It does not create a second generic Chengdu guide, edit a central entity, change indexability or imply that a proposed relationship has already been approved.
