# Coverage audit

Checked: `2026-08-21` (Asia/Shanghai) against `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`, plus live HTTP/sitemap readback.

## Evidence and method

The audit used four evidence layers, in this order:

1. current `origin/main`: guide metadata/body files, destination Hubs, Registry-generated surfaces, `search-map.json`, and `do-not-repeat.md`;
2. GitHub state: merged PR #74; exact-slug/topic-ID searches across open PRs and Issues; and the remote-branch inventory captured in the 2026-08-20 canonical audit;
3. `origin/ops/seo-topic-universe-1000-20260811@a8749e0`: discovery inventory only, never automatic implementation authority;
4. current official transport, railway, airport, attraction, border, and local-government sources, with scope and caveats in [source-ledger.md](./source-ledger.md).

An item is a genuine gap only when it has a distinct decision, a defined recovery, enough first-party evidence, and a clean boundary from every live/main-integrated/remote-inventory owner. A city name plus “transport guide” is not a gap.

## Network coverage at a glance

| City | Hub | Airport decision | Railway decision | Stay/base node | Attraction last mile | Next-city owner | Central action |
|---|---|---|---|---|---|---|---|
| Beijing | `LIVE-MAIN` | PEK/PKX remains `HOLD / DEFER` research | Eight-station owner is live | First-trip stay owner is live | Mutianyu and Badaling transfers are live | BJS–ZJJ–SHA and BJS–Xi'an–Chengdu owners are live | Maintain; do not split or activate new work |
| Shanghai | `LIVE-MAIN` | PVG/SHA whole-trip owner is live | Four-station specification is `PROPOSED / DEFER` | First-trip stay owner is live | PVG→Disney is live | Shanghai–Hangzhou, delta route order, BJS corridor are live | Maintain; no rail-selector writing authorization |
| Xi'an | `LIVE-MAIN` | Airport→hotel/rail is `HOLD / DEFER` research | Station-selector specification is `PROPOSED / DEFER`; seed title needs current roster research | City Wall/Dayanta stay owner is live | Terracotta Warriors execution owner is live | BJS–Xi'an–Chengdu route order is live | Preserve the specification; do not write |
| Chengdu | `LIVE-MAIN` | CTU/TFU specification is `PROPOSED / DEFER` | Railway selector is `HOLD / DEFER` | Hub provides broad orientation | Panda-base and Jiuzhaigou owners are live | Chengdu–Chongqing is `HOLD / DEFER` | Preserve research boundaries; do not write |
| Guangzhou | `LIVE-MAIN` | Baiyun owner is current; publication-day recheck only | Five-hub specification is `PROPOSED / DEFER` | Hub provides broad orientation | No thin attraction-transfer gap proven | Hong Kong, Macau and regional route-order owners are live | Keep airport owner; no rail-selector writing authorization |
| Zhangjiajie | `PUBLISHED` | Airport/central/West specification is `PROPOSED / DEFER` | Same proposed specification | City/Wulingyuan base owner is live | Park workflow is published; West→Wulingyuan is `HOLD / DEFER` | BJS corridor is live | Preserve published owners and defer new work |
| Hangzhou | `PUBLISHED` | Airport→confirmed base is `HOLD / DEFER` research | Broad selector and East→West Lake are `HOLD / DEFER` | Hub is published; no live dedicated stay owner | No new last-mile owner authorized | Shanghai–Hangzhou is live | Preserve Hub; do not activate new work |
| Chongqing | Hub remains held | CKG execution is `HOLD / DEFER` research | Four-station owner is published | Stay and upper/lower orientation owners are live | No new thin attraction page | Chengdu–Chongqing is `HOLD / DEFER` | Keep selector; Hub still follows its independent central gate |
| Guilin | `REMOTE-INVENTORY / NOT-PUBLISHED` | KWL→Guilin/Yangshuo/base is research-first | Broad station selector overlaps current route owner | No live dedicated stay owner | Longji village/entrance transfer remains held research | Guilin–Yangshuo is live | Resolve Hub; keep new transport work deferred |
| Shenzhen | `REMOTE-INVENTORY / NOT-PUBLISHED` | SZX→stay/rail is research-first | Mainland rail-hub selector needs boundary rewrite | Futian/Luohu/Nanshan stay owner is live | No thin attraction-transfer gap proven | Shenzhen–Hong Kong and regional route order are live | Resolve Hub; keep ports in HK route owner |

## Beijing

### Keep and strengthen

- `destination-beijing` owns broad city orientation.
- `which-beijing-railway-station` owns Beijing, Beijing West, Beijing South, Beijing North, Qinghe, Beijing Chaoyang, Beijing Fengtai, and Beijing Tongzhou in one matrix. A ticket's exact station name wins.
- `beijing-south-station-to-capital-or-daxing-airport` owns that specific rail-to-air transfer decision.
- `beijing-where-to-stay-first-trip` connects the station/airport choice to Wangfujing, Qianmen, Sanlitun, and hutong-area stays.
- `beijing-to-mutianyu-great-wall-transfer` and `beijing-to-badaling-great-wall-transfer` own their respective usable last miles.
- `beijing-zhangjiajie-shanghai-transport` remains the single owner for both corridor legs and train/flight comparison. Registry and Search Map use the same title at the 2026-08-21 check. Any future same-owner work is limited to dated source freshness, recovery and page-level measurement.
- `beijing-xian-chengdu-route-order` owns sequence and pacing, not live city-pair mode execution.

### Most common wrong decisions

1. choosing PEK or PKX by a map pin before checking the actual flight and hotel-side transfer;
2. reading “Beijing” on a ticket but ignoring the full station name;
3. treating a direct train as a short door-to-door day;
4. assuming Zhangjiajie West is at a park entrance;
5. booking a Great Wall departure without checking the actual gate/pick-up point and return constraint.

### Gap and recovery

`hg-topic-0856` remains `HOLD / DEFER` research. Its previously recorded boundary is pre-purchase whole-trip choice using actual flight availability, hotel area, rail connection, hour, luggage and first/last-night risk; this sync does not activate or expand it.

### Merge/hold/do not create

- Hold Beijing–Xi'an and other city-pair seeds until they prove a door-to-door decision beyond the existing three-city route-order owner.
- Merge early-arrival, passport, security, boarding, seat, and luggage questions into the national high-speed-rail guide.
- Do not create one page per Beijing station, one page per airport, PEK-versus-PKX “distance to downtown,” Great Wall mode splits, or corridor leg/mode mirrors.

## Shanghai

### Keep and strengthen

- `destination-shanghai` and `shanghai-where-to-stay-first-trip` own broad orientation and accommodation-area choice.
- `shanghai-pudong-or-hongqiao-airport` owns the whole-trip PVG/SHA decision, including Hongqiao railway-hub interaction, Disney, international/domestic network, late/early flights, and wrong-airport recovery.
- `pudong-airport-to-shanghai-disneyland` owns that airport-to-attraction last mile.
- `shanghai-hangzhou-transport-route` owns the bidirectional Shanghai–Hangzhou door-to-door decision.
- `shanghai-suzhou-hangzhou-nanjing-route-order` owns delta sequencing.
- The BJS–ZJJ–SHA corridor owner owns the Zhangjiajie connection; no leg split is needed.

### Most common wrong decisions

1. optimizing “distance to the centre” instead of the full trip to a named hotel, Hongqiao rail departure, Disney stay, or next flight;
2. confusing Shanghai Hongqiao railway station with Hongqiao Airport terminals;
3. choosing a train that reaches the wrong Shanghai station for the hotel/next transfer;
4. assuming a cross-airport connection is protected;
5. ignoring late-arrival access and the last usable hotel check-in chain.

### Gap and recovery

`hg-topic-0875` remains `PROPOSED / DEFER` for Shanghai, Shanghai South, Shanghai Hongqiao and Shanghai Songjiang stations. The recorded scope and recovery logic are retained for review, but no article work is authorized.

### Merge/hold/do not create

- No reassignment, article branch or writing is authorized by this sync.
- Hold Shanghai–Suzhou/Nanjing/Ningbo and water-town seeds pending the approved regional-Hub strategy and independent-intent proof.
- Do not create single-airport, single-terminal, mode-only, cross-airport-recovery-only, or “which airport is closest?” pages.

## Xi'an

### Keep

- `destination-xian`, `xian-where-to-stay-city-wall-or-dayanta`, `terracotta-warriors-without-tour`, and `beijing-xian-chengdu-route-order` already form Hub → stay → attraction → next-city routing.
- The Terracotta Warriors owner keeps the complete city-to-site execution chain; gate/time fragments stay inside it.

### Most common wrong decisions

1. using an obsolete station list or the stale Topic Universe title;
2. choosing a hotel inside/near the wall without pricing the final transfer from the ticketed station;
3. treating “Xi'an” and “Xi'an North” as interchangeable;
4. adding Terracotta Warriors on an arrival/departure day without protecting luggage and the rail/flight deadline;
5. relying on a planned metro/rail project as current service.

### Gap and recovery

`hg-topic-0881` remains `PROPOSED / DEFER`. Its seed title must not retain “Xi'an West”; Xi'an East opened on 30 June 2026, so any later authorized implementation would need a release-day 12306 roster and current official evidence. This sync does not authorize writing.

An airport-to-hotel/rail chain is a research-first gap, not an authorized article. It must first show whether terminal and rail-hub friction forms one stable canonical decision.

### Hold/do not create

- Hold Beijing–Xi'an, Xi'an–Chengdu, and Xi'an–Luoyang until they add independent door-to-door information beyond route-order and current rail owners.
- Do not create one page per station, a generic Xi'an transport guide, or a station page that repeats 12306/boarding procedures.

## Chengdu

### Keep

- `destination-chengdu` owns broad orientation.
- `chengdu-jiuzhaigou-transport-route` owns the complete Chengdu–Jiuzhaigou route decision.
- `chengdu-panda-base-or-dujiangyan-panda-valley` owns base/gate/half-day choice for its attraction cluster.
- `beijing-xian-chengdu-route-order` owns multi-city sequence.

### Most common wrong decisions

1. assuming all international or regional flights use TFU;
2. choosing CTU/TFU by straight-line distance rather than actual flight, hotel, railway connection and hour;
3. selecting the wrong Chengdu station from a dated city guide;
4. assuming central Chengdu Station currently handles passengers without current official evidence;
5. using a same-day rail/flight chain without a recovery buffer.

### Gaps and recovery

`hg-topic-0858` remains `PROPOSED / DEFER` as a whole-trip CTU/TFU specification. The actual ticket and terminal remain controlling evidence; no article writing is authorized.

`hg-topic-0859` remains `HOLD / DEFER`; its station roster must not be asserted without release-day railway or municipal passenger-service evidence.

Historical state: `hg-topic-0305` Chengdu–Chongqing was `HOLD / DEFER` on 2026-08-20. The 2026-09-01 central override activates only its later durable slug `chengdu-chongqing-station-pair` inside the Southwest N=3 release candidate. The old proposed slug is retired; this statement does not activate another city pair.

### Hold/do not create

- Hold Xi'an–Chengdu and additional western city pairs while regional-Hub research is active.
- Do not create CTU-only/TFU-only pages, permanent airline-terminal lists, one page per railway station, or a live timetable/price comparison.

## Guangzhou

### Keep; release-day dynamic recheck

- `destination-guangzhou` owns broad city orientation.
- `guangzhou-baiyun-airport-t2-t3` already covers T1 passenger service stopping on 7 May 2026, T2/T3 identification, Metro Airport South and intercity Baiyun Airport South not stopping, and wrong-terminal recovery. Keep the owner and perform only publication-day dynamic rechecks.
- `guangzhou-hong-kong-transport-route`, `guangzhou-macau-transport-route`, and `guangzhou-shenzhen-hong-kong-route-order` own their cross-border/corridor decisions.

### Most common wrong decisions

1. relying on an external or saved pre-May-2026 T1/T2/T3 guide instead of the current Homeground owner and official notice;
2. treating Guangzhou South, East, Guangzhou, Guangzhou Baiyun, and North as interchangeable;
3. confusing airport terminals, railway stations, and Baiyun place names;
4. picking Zhuhai/Hengqin merely by train availability without the Macau-side destination and luggage chain;
5. splitting Guangzhou–Shenzhen out of a route-order/port decision without new information gain.

### Gap and recovery

`hg-topic-0864` remains a `PROPOSED / DEFER` five-hub matrix specification. Its recorded exact-ticket and wrong-station-recovery boundary is preserved; no article writing is authorized.

### Hold/do not create

- Hold Guangzhou–Shenzhen unless an independent door-to-door station/base decision survives the existing regional route-order owner.
- Hold Guangzhou–Guilin pending destination-Hub coverage and demand evidence.
- Do not create one terminal/station per page, wrong-terminal-only pages, reverse Hong Kong/Macau mirrors, or pages that decide border eligibility.

## Zhangjiajie

### Keep — published

- `destination-zhangjiajie` and `zhangjiajie-national-forest-park-tickets-and-entrances` are `PUBLISHED`: EN/ZH/KO returned HTTP 200 and all locale URLs appeared in the live sitemap on 2026-08-21.
- `zhangjiajie-city-or-wulingyuan-hotel-base` owns the overnight-base decision.
- `beijing-zhangjiajie-shanghai-transport` owns both corridor legs.
- The park workflow owns ticket/gate/slot/passport fallback and in-park transport relationships. It does not own every external last mile.

### Most common wrong decisions

1. confusing Hehua Airport, Zhangjiajie central railway/coach area, and Zhangjiajie West;
2. treating Zhangjiajie West as a park gate;
3. staying downtown for a Wulingyuan-first plan, or Wulingyuan for a very early airport/rail departure, without pricing the transfer;
4. confusing Tianmen Mountain's city-side access with Zhangjiajie National Forest Park entrances;
5. relying on an old airport bus/coach snapshot as a current timetable.

### Gaps and recovery

- `hg-topic-0265` remains `PROPOSED / DEFER`; its airport/central/West identity and wrong-hub-recovery specification is retained, with no writing authorization.
- `hg-topic-0342` and `hg-topic-0354` remain `HOLD / DEFER` research inventory; this sync neither activates nor expands them.

Recovery must separate three questions: “Which node am I at?”, “Which hotel/gate is actually booked?”, and “Is today's attraction/transport product still usable?” If not, protect the hotel and next hard departure instead of forcing the original sightseeing plan.

### Merge/hold/do not create

- Merge old `hg-topic-0123` park-gates intent into the published park workflow.
- Keep all new hub/last-mile work deferred; PR #74 publication is verified but does not activate another owner.
- Do not create one page per station, gate, shuttle, cableway, traveller type, or corridor direction.

## Hangzhou

### Keep — published

- `destination-hangzhou` is `PUBLISHED`: EN/ZH/KO returned HTTP 200 and all locale URLs appeared in the live sitemap on 2026-08-21.
- `shanghai-hangzhou-transport-route` owns the intercity station-pair/door-to-door choice.
- `shanghai-suzhou-hangzhou-nanjing-route-order` owns regional sequence.

### Most common wrong decisions

1. entering only “West Lake” rather than the confirmed hotel, gate, pier or road-access point;
2. selecting Hangzhou East/West/Hangzhou station without matching the actual train and lake-side destination;
3. trusting a map walk that ignores luggage, underpasses, road controls or a lake-side detour;
4. using policy/planning material as proof of current passenger service;
5. duplicating the Shanghai–Hangzhou owner with a station-selector summary.

### Gap and recovery

`hg-topic-0360` remains `HOLD / DEFER`; its previously recorded confirmed-destination last-mile boundary is preserved without writing authorization.

`hg-topic-0867` remains `HOLD / DEFER`; its independent-intent test is retained for later central review. Airport→confirmed lake/hotel/rail remains unregistered research, not a page or new candidate in this sync.

### Hold/do not create

- Hold Hangzhou–Huangshan and Hangzhou–Shaoxing until regional-Hub priorities and source/image readiness are stronger.
- Do not create generic West Lake transport, one page per gate, or a rail selector that freezes service directions.

## Chongqing

### Keep — published selector

- `chongqing-railway-station-selector` is `PUBLISHED`: EN/ZH/KO returned HTTP 200 and all locale URLs appeared in the live sitemap on 2026-08-21. It reserves the four-principal-station decision and recovery boundary.
- `chongqing-upper-lower-city-orientation` owns vertical-city language and street-level navigation.
- `chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba` owns accommodation areas.
- `destination-chongqing` remains a held Hub package; it does not bypass Gate B merely because the selector entered main.

### Most common wrong decisions

1. reading only “Chongqing” and missing North/West/East/Shapingba;
2. treating a map's horizontal distance as the full luggage/vertical-transfer cost;
3. using a construction line or planned railway as current access;
4. assuming “up/down” means only north/south rather than street/building level;
5. racing between stations instead of changing the ticket after a wrong-station error.

### Gap and recovery

The current selector already owns generic wrong-station recovery; no recovery spin-off is needed. Under the 2026-09-01 central override, `chengdu-chongqing-station-pair` owns only the bidirectional ticketed station pair and hotel-to-hotel execution between the two cities. It may refer corridor-specific failures back to the selector, but may not reteach the generic recovery workflow. CKG airport execution remains a separate research gap and must not be added to the railway selector.

### Hold/do not create

- The selector deployment is verified. The existing Chongqing Hub gate remains independent; this package cannot publish the Hub.
- Historical hold replaced on 2026-09-01 only for the N=3 central candidate: the Chengdu–Chongqing and Chongqing–Zhangjiajie corridor owners may proceed together with the three-city order owner. All other nearby pairs remain held.
- Do not create one page per Chongqing station, airport content inside the rail owner, or a second upper/lower-city explainer.

## Guilin

### Keep

- `guilin-yangshuo-transport-route` already owns train/road/river mode choice and both directions.
- `destination-guilin` exists only on `origin/codex/city-hub-guilin-draft-20260815`; it is remote inventory and cannot be used as a live link.

### Most common wrong decisions

1. treating Guilin, Guilin North and Guilin West as stable directional categories without checking the actual train;
2. booking to “Guilin” when the real first base is Yangshuo;
3. treating Yangshuo station as the town centre;
4. choosing “Longji” without choosing Ping'an, Dazhai/Jinkeng, or another confirmed village/entrance;
5. carrying large luggage into a village transfer/walking chain without hotel coordination.

### Gap and recovery

`hg-topic-0347` and `hg-topic-0865` remain `HOLD / DEFER` research inventory. Their previously recorded boundaries are retained without activation or expansion.

KWL airport → Guilin/Yangshuo/confirmed base is a research-first gap. It needs a clean relationship with the live Yangshuo owner rather than a generic airport-to-centre page.

### Hold/do not create

- Hold Guangzhou–Guilin, Guilin–Zhangjiajie, and a three-place route-order owner until Hub coverage and distinct intent are proven.
- Do not split Guilin–Yangshuo by direction, mode, station, traveller type or baggage.

## Shenzhen

### Keep

- `shenzhen-hong-kong-transport-route` owns port/crossing choice, border execution, and both directions.
- `guangzhou-shenzhen-hong-kong-route-order` owns regional sequence.
- `shenzhen-where-to-stay-futian-luohu-nanshan` owns hotel-base choice.
- `destination-shenzhen` exists only on `origin/codex/city-hub-shenzhen-draft-20260815`; it is not a live Hub.

### Most common wrong decisions

1. choosing Futian, Shenzhen North, Shenzhen, or Shenzhen East from the district name alone;
2. mixing a mainland railway-station decision with Hong Kong port eligibility and crossing hours;
3. assuming every Shenzhen–Hong Kong chain uses high-speed rail;
4. using a temporary construction walking path as a permanent airport connection;
5. creating a Guangzhou–Shenzhen page that adds nothing beyond the regional route-order owner.

### Gap and recovery

`hg-topic-0876` remains `HOLD / DEFER`. Any later boundary review must keep ports, border eligibility, immigration documents, crossing hours and the Hong Kong-side chain in `shenzhen-hong-kong-transport-route`; this sync does not activate it.

SZX airport → confirmed hotel/rail node is a research-first gap, not an authorized page.

### Hold/do not create

- Hold Guangzhou–Shenzhen unless independent station-pair and base evidence survives overlap review.
- Do not create one page per port/station, direction mirrors, or a border-hour/eligibility database.

## Shared national boundaries

The ten-city network must link to, not repeat, these owners:

| Existing owner | Reserved scope |
|---|---|
| `china-high-speed-train-first-time-guide` | 12306, passport booking, seat class, luggage, security, station process and boarding |
| `china-private-transfer-or-public-transport` | National public-transport/private-transfer suitability and service handoff |
| `china-last-night-before-international-flight` | Last-night airport risk, same-day rail/flight connection and airport-hotel decision |
| `china-open-jaw-flights-route-planning` | International arrival/departure city architecture |
| `china-night-train-or-daytime-high-speed-rail` | Generic sleeper/daytime-rail trade-off |
| `china-hotel-near-metro` | Generic luggage/family/walking decision around metro proximity |
| `foreigners-china-hotel` | Foreign-guest acceptance, registration and refusal recovery |

## Governance defects to fix before expansion

1. **PR #74 live state resolved:** the four transport-network identities are published and passed 2026-08-21 EN/ZH/KO HTTP 200 plus sitemap readback. The older Search Map status needs central housekeeping only.
2. **Topic Universe lag:** multiple current main owners still appear as mapped/new candidates. Production status must be reconciled before batch selection.
3. **Deferred tool/editorial seeds:** only `hg-topic-0881`, `0858`, `0864`, `0875`, and `0265` remain `PROPOSED / DEFER` specifications in this package. None is centrally approved or authorized for writing; all other future inventory stays `HOLD / DEFER`.
4. **BJS source freshness, not a title conflict:** Registry and Search Map titles matched on 2026-08-21. Any future change stays in the same owner and is limited to current-source refresh, recovery and page-level measurement.
5. **Remaining Hub gaps:** Guilin and Shenzhen Hubs are remote-only and Chongqing is gate-held. Hangzhou and Zhangjiajie Hubs are published.
