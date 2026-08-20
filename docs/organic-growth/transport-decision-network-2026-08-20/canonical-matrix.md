# Canonical matrix

This matrix assigns one owner to each executable decision. A row is not an instruction to publish; only `LIVE-MAIN` owners are assumed published, and every candidate still needs the stated central gate.

## Current owners to preserve

| City/network node | Canonical owner | Status | Reserved decision | Update or handoff |
|---|---|---|---|---|
| Beijing Hub | `destination-beijing` | `LIVE-MAIN` | Broad first-trip city orientation | Route to airport, rail, stay, Great Wall and next-city owners |
| Beijing railway | `which-beijing-railway-station` | `LIVE-MAIN` | One eight-station matrix and wrong-station recovery | Maintain live station roles; never split by station |
| Beijing South→airports | `beijing-south-station-to-capital-or-daxing-airport` | `LIVE-MAIN` | Ticketed Beijing South to PEK/PKX transfer | Keep narrow; link to rail and future airport owner |
| Beijing stay | `beijing-where-to-stay-first-trip` | `LIVE-MAIN` | First-trip hotel-area choice | Supply hotel-side friction to airport/rail pages |
| Beijing Great Wall | `beijing-to-mutianyu-great-wall-transfer`; `beijing-to-badaling-great-wall-transfer` | `LIVE-MAIN` | Each named Wall section's usable last mile | No generic comparison or mode split |
| BJS–ZJJ–SHA | `beijing-zhangjiajie-shanghai-transport` | `LIVE-MAIN / UPDATE-OWNER` | Both corridor legs, both directions and train/flight decision | Refresh official samples, titles and recovery; measure same URL |
| Shanghai Hub | `destination-shanghai` | `LIVE-MAIN` | Broad city orientation | Route to airport, rail, stay, Disney and regional owners |
| Shanghai airports | `shanghai-pudong-or-hongqiao-airport` | `LIVE-MAIN` | Pre-book whole-trip PVG/SHA choice and wrong-airport recovery | Maintain Airport Link/Hongqiao rail/late-early facts |
| Shanghai stay | `shanghai-where-to-stay-first-trip` | `LIVE-MAIN` | First-trip hotel-area choice | Provide hotel-side node, not transport duplication |
| PVG→Disney | `pudong-airport-to-shanghai-disneyland` | `LIVE-MAIN` | PVG to confirmed Disney-side stay/visit | No mode/audience splits |
| Shanghai–Hangzhou | `shanghai-hangzhou-transport-route` | `LIVE-MAIN` | One bidirectional station-pair and door-to-door owner | Link to both Hubs after Hangzhou publication verification |
| Delta sequence | `shanghai-suzhou-hangzhou-nanjing-route-order` | `LIVE-MAIN` | Regional order/pacing | Does not absorb station or transfer execution |
| Xi'an Hub | `destination-xian` | `LIVE-MAIN` | Broad city orientation | Route to stay, rail, Terracotta and next-city owners |
| Xi'an stay | `xian-where-to-stay-city-wall-or-dayanta` | `LIVE-MAIN` | City Wall versus Dayanta stay | Supplies hotel-side transfer cost |
| Terracotta Warriors | `terracotta-warriors-without-tour` | `LIVE-MAIN` | Full city-to-site execution, gate and recovery | No gate/time/transport spin-off |
| Beijing–Xi'an–Chengdu | `beijing-xian-chengdu-route-order` | `LIVE-MAIN` | Multi-city sequence and pace | Does not own live city-pair station selection |
| Chengdu Hub | `destination-chengdu` | `LIVE-MAIN` | Broad city orientation | Route to airports, rail, panda/Jiuzhaigou and next-city owners |
| Chengdu–Jiuzhaigou | `chengdu-jiuzhaigou-transport-route` | `LIVE-MAIN` | One bidirectional mode/base decision | No rail/road/airport fragments |
| Chengdu panda sites | `chengdu-panda-base-or-dujiangyan-panda-valley` | `LIVE-MAIN` | Site/base choice plus gate/time implications | No separate gate or half-day page |
| Guangzhou Hub | `destination-guangzhou` | `LIVE-MAIN` | Broad city orientation | Route to airport, rail, Hong Kong/Macau and next-city owners |
| Guangzhou airport | `guangzhou-baiyun-airport-t2-t3` | `LIVE-MAIN / UPDATE-OWNER` | Current terminal choice, access and wrong-terminal recovery | Replace stale T1 assumptions inside same owner |
| Guangzhou–Hong Kong | `guangzhou-hong-kong-transport-route` | `LIVE-MAIN` | Bidirectional door-to-door rail/transfer decision | Border sources stay dynamic; no reverse page |
| Guangzhou–Macau | `guangzhou-macau-transport-route` | `LIVE-MAIN` | Guangzhou origin → Zhuhai/Hengqin border chain, luggage and Macau landing | No Hong Kong/re-entry or eligibility duplication |
| GZ–SZ–HK sequence | `guangzhou-shenzhen-hong-kong-route-order` | `LIVE-MAIN` | Regional order and base changes | Does not absorb detailed station/port execution |
| Zhangjiajie Hub | `destination-zhangjiajie` | `MAIN-INTEGRATED / PUBLICATION-UNVERIFIED` | Broad city/base/gateway orientation | Deployed readback before any live internal link |
| Zhangjiajie stay | `zhangjiajie-city-or-wulingyuan-hotel-base` | `LIVE-MAIN` | Downtown versus Wulingyuan base | Hub/last-mile pages reference, not repeat |
| Zhangjiajie park | `zhangjiajie-national-forest-park-tickets-and-entrances` | `MAIN-INTEGRATED / PUBLICATION-UNVERIFIED` | Ticket, gate, slot, passport fallback and in-park transport relation | Absorbs old park-gates seed; excludes external last mile |
| Hangzhou Hub | `destination-hangzhou` | `MAIN-INTEGRATED / PUBLICATION-UNVERIFIED` | Broad city orientation | Deployed readback before live linking |
| Chongqing railway | `chongqing-railway-station-selector` | `MAIN-INTEGRATED / PUBLICATION-UNVERIFIED` | North/West/East/Shapingba identity, hotel-side friction and wrong-station recovery | One owner; live readback and ledger sync required |
| Chongqing orientation | `chongqing-upper-lower-city-orientation` | `LIVE-MAIN` | Vertical-city language and map-level friction | Rail/city-pair pages link rather than reteach |
| Chongqing stay | `chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba` | `LIVE-MAIN` | Accommodation-area choice | Supplies hotel-side node |
| Guilin–Yangshuo | `guilin-yangshuo-transport-route` | `LIVE-MAIN` | Train/road/river decision in both directions | No mode, station, luggage or reverse split |
| Shenzhen–Hong Kong | `shenzhen-hong-kong-transport-route` | `LIVE-MAIN` | Port/crossing choice, border execution and recovery in both directions | Owns port facts; no per-port pages |
| Shenzhen stay | `shenzhen-where-to-stay-futian-luohu-nanshan` | `LIVE-MAIN` | Futian/Luohu/Nanshan base choice | Supplies hotel/port/rail interaction |

## Candidate and hold matrix

Priority means research/architecture priority, not publication authorization.

| Priority | Topic / proposed owner | Decision it alone owns | Explicit exclusions | Recovery it must own | Central gate | Status |
|---|---|---|---|---|---|---|
| P0 | Existing `beijing-zhangjiajie-shanghai-transport` | Actual BJS→ZJJ and ZJJ→SHA door-to-door mode decision | New leg, direction, flight-only or train-only pages | Missed/changed flight or train; wrong BJS/SHA/ZJJ node; protect next hotel/park booking | Source refresh + title/Registry/Search Map alignment + page-level measurement | `UPDATE-OWNER` |
| P0 | Existing `guangzhou-baiyun-airport-t2-t3` | Current T2/T3 confirmation, city/rail access and wrong-terminal action | T1/T2/T3 single pages; permanent airline lists | Stop at actual terminal, verify flight, use current inter-terminal/road option or rebook | Release-day airport/municipal recheck | `UPDATE-OWNER` |
| P0 | `hg-topic-0881` / `xian-railway-station-selector` | Ticketed station + hotel/base + next-leg match across current principal Xi'an stations | “Xi'an West” stale title; per-station pages; national rail process | Exact-name check, ticket change versus cross-city transfer, boarding deadline | Tool→editorial reassignment; 12306 roster; title correction; image rights | `NEW-EDITORIAL-CANDIDATE` |
| P0 | `hg-topic-0858` / `chengdu-ctu-or-tfu-airport` | Pre-book CTU/TFU whole-trip choice and post-book confirmation | “Which is closer?”; airport/terminal single pages; permanent airline assignments | Wrong-airport/terminal decision against check-in deadline; overnight/rebook branch | Tool→editorial reassignment; current airport notice; two-airport photo pack | `NEW-EDITORIAL-CANDIDATE` |
| P0 | `hg-topic-0864` / `guangzhou-railway-hub-selector` | Actual ticket + hotel/base across South/East/Guangzhou/Baiyun/North | Per-station pages; frozen direction table; airport content | Change ticket versus verified city transfer before cutoff | Tool→editorial reassignment; current 12306 roster; official 2026 role evidence | `NEW-EDITORIAL-CANDIDATE` |
| P0 | `hg-topic-0875` / `shanghai-railway-station-selector` | Ticket/hotel/next-leg choice across Shanghai/Hongqiao/South/Songjiang | Airport comparison; per-station pages; Shanghai–Hangzhou duplication | Wrong-station change/transfer decision and missed-connection branch | Tool→editorial reassignment; current four-station relevance; image rights | `NEW-EDITORIAL-CANDIDATE` |
| P0 | `hg-topic-0265` / `zhangjiajie-airport-and-rail-hubs` | Hehua Airport vs central rail/coach area vs Zhangjiajie West, linked to booked base | Park gate workflow; city-vs-Wulingyuan stay decision; live timetable | Identify current node and booked base; protect hotel/park/next departure; change plan if late | PR #74 deployed readback; current ground access; West Station image | `NEW-EDITORIAL-CANDIDATE` |
| P1 | `hg-topic-0305` / `chengdu-chongqing-transport-route` | One bidirectional station-pair and hotel-to-hotel decision | Route-order page; per-direction mirror; city station selectors | Wrong terminal station, vertical Chongqing last mile, missed train/rebook | Chongqing selector live verification + Chongqing Hub routing decision | `NEW-EDITORIAL-CANDIDATE / CONDITIONAL` |
| P1 | `hg-topic-0856` / `beijing-pek-or-pkx-airport` | Pre-book airport choice by real flight, stay, rail and first/last night | “Distance to downtown”; single-airport pages; Beijing South transfer duplication | Wrong airport/terminal versus hard flight deadline | Tool→editorial reassignment; current PEK/PKX evidence; rights-clear images | `NEW-EDITORIAL-CANDIDATE` |
| P1 | `hg-topic-0859` / `chengdu-railway-station-selector` | Current principal station identities matched to ticket/stay/onward base | Unverified central Chengdu Station; per-station pages; timetable DB | Ticket change versus verified transfer; wrong-side late arrival | Tool→editorial reassignment; current roster; station-role sources | `NEW-EDITORIAL-CANDIDATE` |
| P1 | `hg-topic-0360` / `hangzhou-east-station-to-west-lake` | East Station to a confirmed hotel/gate/pier/road node | Generic West Lake transport; broad station selector; fixed bus timetable | Wrong lake side/drop-off; luggage-first hotel/storage branch | Hangzhou Hub live verification; destination-node taxonomy; current access | `NEW-EDITORIAL-CANDIDATE` |
| P1 | `hg-topic-0347` / `guilin-to-longji-rice-terraces-transfer` | Guilin node to confirmed Ping'an, Dazhai/Jinkeng or ancient Zhuang village | Generic Longji guide; “Longji” as one drop-off; fixed departures | Wrong village/entrance, weather/road disruption, luggage/hotel coordination | Guilin Hub decision; current official access; entrance photos/rights | `NEW-EDITORIAL-CANDIDATE` |
| P1 | `hg-topic-0342` / `zhangjiajie-west-station-to-wulingyuan` | Station→confirmed Wulingyuan hotel/park entrance with luggage/late arrival | Hub selector; stay choice; park gate/ticket workflow | Missed local link, late arrival, wrong hotel/entrance, storage/overnight branch | PR #74 live verification; current road link; West Station imagery | `NEW-EDITORIAL-CANDIDATE / CONDITIONAL` |
| P1 | `hg-topic-0876` / revised `shenzhen-railway-hub-selector` | Mainland railway station identity by ticket, hotel and mainland/onward rail task | Port choice, border eligibility, Hong Kong-side chain, crossing hours | Wrong railway station only; hand border cases to Shenzhen–HK owner | Canonical rename/rewrite; tool→editorial reassignment; Shenzhen Hub decision | `HOLD-RESEARCH` |
| P2 | `hg-topic-0867` / `hangzhou-railway-station-selector` | Only a proven city-wide station choice beyond Hub and Shanghai–Hangzhou | East→West Lake detail; city-pair station choice; frozen directions | Ticket change versus verified transfer | Query/user evidence of independent gain after Hub readback | `HOLD-RESEARCH` |
| P2 | `hg-topic-0865` / `guilin-railway-station-selector` | Only a proven Guilin-city/base station decision beyond Yangshuo owner | Guilin–Yangshuo mode choice; generic station encyclopedia | Ticket change plus confirmed next base | Stable official station-role evidence + Hub + overlap test | `HOLD / MERGE REVIEW` |
| P2 | `hg-topic-0354` / `zhangjiajie-city-to-tianmen-mountain-gate` | Confirmed A/B/C route to the correct city-side entrance | General Tianmen guide; Forest Park; ticket/route comparison outside its owner | Wrong entrance/route, late slot, downgrade sightseeing | Current attraction rules and a rights-clear exact entrance image | `HOLD-RESEARCH` |
| P2 | `hg-topic-0323` / `hangzhou-huangshan-transport-route` | Hangzhou station→Huangshan rail node→confirmed mountain gate/base | Huangshan attraction guide; station selector; fixed shuttle table | Wrong Huangshan station/gate, last-link failure, overnight base | Official current two-end evidence + Hub priorities | `HOLD-RESEARCH` |
| P2 | `hg-topic-0312` / `guangzhou-shenzhen-transport-route` | Only a proven two-city station/base choice unrelated to HK crossing | GZ–SZ–HK route order; Shenzhen–HK; mirror pages | Wrong station/base within two-city trip | Independent-intent proof and no route-order cannibalization | `HOLD-RESEARCH` |
| P3 | `hg-topic-0314`, `0315`, `0322`, `0325`, `0326` and other city pairs | Only if each produces a distinct door-to-door decision | Route-order repeats, direction mirrors and city-name substitutions | Must be route-specific, not generic | New demand evidence, primary sources, images, Hub coverage | `HOLD-RESEARCH` |

## Canonical boundary tests

Apply all tests before an Issue or branch is created.

### 1. Controlling evidence test

Name the evidence that changes the answer. Good examples are an exact airport code, terminal, full station name, booked hotel, booked park gate, border point, or next hard departure. If the same evidence and answer are already used by another owner, merge.

### 2. Recovery test

Describe the failure in one sentence and provide a unique recovery. “Check current information” is not enough. The owner should tell the traveller what to identify first, which official source to use, which deadline controls the decision, and when to abandon the original plan. If recovery is identical to a current owner, merge.

### 3. Door-to-door information-gain test

The page must change a real choice after accounting for:

- airport/station/port access;
- security, immigration or boarding allowance where relevant;
- actual arrival-side transfer;
- hotel/base and luggage friction;
- attraction gate or next booking;
- late/early and mobility constraints.

A route that differs only by city names, mode heading, direction, month, nationality or traveller type fails.

### 4. Source durability test

At least one current official source must prove each material node is active/relevant. A planning document may explain future intent but cannot prove current service. A dated holiday train/bus notice proves only that date's operation, not a permanent timetable or direction.

### 5. Image truth test

The proposed hero must show the actual decision node: station sign, airport/terminal, port, attraction entrance, or transfer environment. A skyline, generic train, mountain landscape or another city's station does not prove the place. If rights/location are uncertain, hold or ship with fewer images.

### 6. Hub link test

The city Hub must be live before it is presented as a live reciprocal link. A main-integrated or remote-only Hub may reserve the relationship in the implementation brief, but the article must not link to a future URL as though published.

## Rejected page patterns

The following are `DO-NOT-CREATE` across all ten cities:

- one page per airport, terminal, station, gate, platform, port or transport mode;
- A→B and B→A mirrors where one owner can handle both;
- “which airport/station is closest to downtown?” detached from the full trip;
- fixed fare, frequency, timetable, terminal-airline or station-direction databases;
- an airport→rail “connection checker” without versioned data, fail-closed behavior, monitoring and an authorized owner;
- city transport guides that duplicate a Hub;
- local pages that repeat 12306/passport/seat/luggage/security/boarding guidance;
- wrong-node recovery spin-offs when the canonical comparison owner already owns recovery;
- attraction transfer pages that do not distinguish a real gate/base/road-chain decision;
- pages that decide immigration or border eligibility without an authorized legal/policy owner.
