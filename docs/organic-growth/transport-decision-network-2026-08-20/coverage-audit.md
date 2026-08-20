# Coverage audit

Checked: `2026-08-20` against `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`.

## Evidence and method

The audit used four evidence layers, in this order:

1. current `origin/main`: guide metadata/body files, destination Hubs, Registry-generated surfaces, `search-map.json`, and `do-not-repeat.md`;
2. GitHub state: PR #74; exact-slug/topic-ID searches across open PRs and Issues; and all 38 `origin/article/*` and 53 `origin/codex/*` branches;
3. `origin/ops/seo-topic-universe-1000-20260811@a8749e0`: discovery inventory only, never automatic implementation authority;
4. current official transport, railway, airport, attraction, border, and local-government sources, with scope and caveats in [source-ledger.md](./source-ledger.md).

An item is a genuine gap only when it has a distinct decision, a defined recovery, enough first-party evidence, and a clean boundary from every live/main-integrated/remote-inventory owner. A city name plus “transport guide” is not a gap.

## Network coverage at a glance

| City | Hub | Airport decision | Railway decision | Stay/base node | Attraction last mile | Next-city owner | Central action |
|---|---|---|---|---|---|---|---|
| Beijing | `LIVE-MAIN` | PEK/PKX is a strong editorial candidate | Eight-station owner is live | First-trip stay owner is live | Mutianyu and Badaling transfers are live | BJS–ZJJ–SHA and BJS–Xi'an–Chengdu owners are live | Maintain; research PEK/PKX; do not split |
| Shanghai | `LIVE-MAIN` | PVG/SHA whole-trip owner is live | Four-station editorial candidate is distinct | First-trip stay owner is live | PVG→Disney is live | Shanghai–Hangzhou, delta route order, BJS corridor are live | Maintain; authorize rail selector after reassignment |
| Xi'an | `LIVE-MAIN` | Airport→hotel/rail is research-first only | Strong candidate; seed title is stale after Xi'an East opening | City Wall/Dayanta stay owner is live | Terracotta Warriors execution owner is live | BJS–Xi'an–Chengdu route order is live | Correct roster/title before authorization |
| Chengdu | `LIVE-MAIN` | CTU/TFU is urgent and independent | East/South/West selector candidate | Hub provides broad orientation | Panda-base and Jiuzhaigou owners are live | Chengdu–Chongqing candidate is conditional | Prioritize airport; do not include Chengdu Station without current passenger-service evidence |
| Guangzhou | `LIVE-MAIN` | Baiyun T2/T3 owner needs an urgent 2026 refresh | Five-hub selector candidate | Hub provides broad orientation | No thin attraction-transfer gap proven | Hong Kong, Macau and regional route-order owners are live | Update airport; research rail selector |
| Zhangjiajie | `MAIN-INTEGRATED / PUBLICATION-UNVERIFIED` | Airport/central/West hub selector is distinct | Same hub selector | City/Wulingyuan base owner is live | Park workflow is main-integrated; West→Wulingyuan remains distinct | BJS corridor is live | Verify deployment, then consider hubs/last mile |
| Hangzhou | `MAIN-INTEGRATED / PUBLICATION-UNVERIFIED` | Airport→confirmed base is research-first | Broad selector overlaps; East→West Lake is clearer | Hub summary; no live dedicated stay owner | East→specific lake gate/hotel is distinct | Shanghai–Hangzhou is live | Verify Hub; prefer narrow last-mile owner |
| Chongqing | Hub remains held | CKG execution is research-first and separate from rail | Four-station owner is main-integrated | Stay and upper/lower orientation owners are live | No new thin attraction page | Chengdu–Chongqing is conditional | Verify selector, unlock Hub through central gate only |
| Guilin | `REMOTE-INVENTORY / NOT-PUBLISHED` | KWL→Guilin/Yangshuo/base is research-first | Broad station selector overlaps current route owner | No live dedicated stay owner | Longji village/entrance transfer is distinct | Guilin–Yangshuo is live | Resolve Hub; prioritize Longji over generic rail page |
| Shenzhen | `REMOTE-INVENTORY / NOT-PUBLISHED` | SZX→stay/rail is research-first | Mainland rail-hub selector needs boundary rewrite | Futian/Luohu/Nanshan stay owner is live | No thin attraction-transfer gap proven | Shenzhen–Hong Kong and regional route order are live | Resolve Hub; keep ports in HK route owner |

## Beijing

### Keep and strengthen

- `destination-beijing` owns broad city orientation.
- `which-beijing-railway-station` owns Beijing, Beijing West, Beijing South, Beijing North, Qinghe, Beijing Chaoyang, Beijing Fengtai, and Beijing Tongzhou in one matrix. A ticket's exact station name wins.
- `beijing-south-station-to-capital-or-daxing-airport` owns that specific rail-to-air transfer decision.
- `beijing-where-to-stay-first-trip` connects the station/airport choice to Wangfujing, Qianmen, Sanlitun, and hutong-area stays.
- `beijing-to-mutianyu-great-wall-transfer` and `beijing-to-badaling-great-wall-transfer` own their respective usable last miles.
- `beijing-zhangjiajie-shanghai-transport` remains the single owner for both corridor legs and train/flight comparison. PR #74 improved its search-facing answer, but title surfaces and dynamic samples still need a same-owner refresh.
- `beijing-xian-chengdu-route-order` owns sequence and pacing, not live city-pair mode execution.

### Most common wrong decisions

1. choosing PEK or PKX by a map pin before checking the actual flight and hotel-side transfer;
2. reading “Beijing” on a ticket but ignoring the full station name;
3. treating a direct train as a short door-to-door day;
4. assuming Zhangjiajie West is at a park entrance;
5. booking a Great Wall departure without checking the actual gate/pick-up point and return constraint.

### Gap and recovery

`hg-topic-0856` can become one editorial PEK/PKX owner. It should decide before flight purchase using actual flight availability, hotel area, rail connection, arrival/departure hour, luggage, and first/last-night risk. If a flight is already ticketed, there is no airport “choice”; the page switches to confirmation and wrong-airport recovery. Recovery must compare current official cross-airport options and the flight's hard check-in deadline, never promise a fixed transfer time.

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

`hg-topic-0875` is a distinct editorial candidate for Shanghai, Shanghai South, Shanghai Hongqiao, and Shanghai Songjiang stations. Smaller stations enter the matrix only if live 12306 evidence shows meaningful first-trip relevance. Recovery begins with the exact Chinese/English station name, ticket change rules and departure deadline; it does not assume that “another Shanghai station” is a quick metro transfer.

### Merge/hold/do not create

- Central must reassign the current tool seed to an editorial owner before implementation.
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

`hg-topic-0881` is high priority, but the title must not retain “Xi'an West.” Xi'an East opened on 30 June 2026. The final comparison roster must be derived from a release-day 12306 check plus current municipal/rail evidence; likely principal identities are Xi'an North, Xi'an, and Xi'an East, but the article must not freeze a direction table beyond the reviewed date. Wrong-station recovery compares the current ticket/change path and the fastest verified cross-city connection against the boarding deadline.

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

`hg-topic-0858` should be a whole-trip CTU/TFU editorial owner. Since 30 July 2026, selected Hong Kong/Macau/Taiwan operations were adjusted between airports, making “international equals TFU” unsafe. The actual ticket and terminal are controlling evidence. Wrong-airport recovery must compare current official airport transport against the flight deadline and offer a rebook/overnight branch when the connection is no longer defensible.

`hg-topic-0859` can own the current principal passenger stations, likely East/South/West after live validation. It must omit central Chengdu Station unless release-day railway or municipal evidence confirms current passenger service; construction or planning material alone is not sufficient.

`hg-topic-0305` Chengdu–Chongqing is independently useful because the station pair, hotel bases, Chongqing vertical last mile, and wrong-station recovery change the door-to-door answer. It should wait until the Chongqing selector and Hub routing are release-stable.

### Hold/do not create

- Hold Xi'an–Chengdu and additional western city pairs while regional-Hub research is active.
- Do not create CTU-only/TFU-only pages, permanent airline-terminal lists, one page per railway station, or a live timetable/price comparison.

## Guangzhou

### Keep and urgently update

- `destination-guangzhou` owns broad city orientation.
- `guangzhou-baiyun-airport-t2-t3` remains the airport owner. Passenger service at T1 ceased on 7 May 2026; the page needs current T2/T3 identification, transfer and recovery rather than a new page.
- `guangzhou-hong-kong-transport-route`, `guangzhou-macau-transport-route`, and `guangzhou-shenzhen-hong-kong-route-order` own their cross-border/corridor decisions.

### Most common wrong decisions

1. relying on a pre-May-2026 T1/T2/T3 guide;
2. treating Guangzhou South, East, Guangzhou, Guangzhou Baiyun, and North as interchangeable;
3. confusing airport terminals, railway stations, and Baiyun place names;
4. picking Zhuhai/Hengqin merely by train availability without the Macau-side destination and luggage chain;
5. splitting Guangzhou–Shenzhen out of a route-order/port decision without new information gain.

### Gap and recovery

`hg-topic-0864` is a strong editorial five-hub matrix candidate. The 26 January 2026 role adjustment between Guangzhou and Guangzhou Baiyun makes old summaries unsafe. The page must tell readers to follow the exact ticketed station and validate directions with live 12306 results, not a permanent route taxonomy. Wrong-station recovery begins by checking whether the ticket is changeable and whether a current metro/road transfer can beat the boarding cutoff; it must be willing to advise changing the train rather than racing across Guangzhou.

### Hold/do not create

- Hold Guangzhou–Shenzhen unless an independent door-to-door station/base decision survives the existing regional route-order owner.
- Hold Guangzhou–Guilin pending destination-Hub coverage and demand evidence.
- Do not create one terminal/station per page, wrong-terminal-only pages, reverse Hong Kong/Macau mirrors, or pages that decide border eligibility.

## Zhangjiajie

### Keep and verify

- `destination-zhangjiajie` and `zhangjiajie-national-forest-park-tickets-and-entrances` are in main via PR #74 but require deployed readback before live claims.
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

- `hg-topic-0265` should own airport/central/West hub identity, actual ticket matching, hotel-base interaction, late arrival, luggage, and wrong-hub recovery.
- `hg-topic-0342` can own Zhangjiajie West → confirmed Wulingyuan hotel/entrance once official current ground-transport evidence and a rights-clear West Station image are secured.
- `hg-topic-0354` city → Tianmen Mountain gate is distinct only if it resolves the bookable route/gate and city-side recovery without repeating the attraction owner.

Recovery must separate three questions: “Which node am I at?”, “Which hotel/gate is actually booked?”, and “Is today's attraction/transport product still usable?” If not, protect the hotel and next hard departure instead of forcing the original sightseeing plan.

### Merge/hold/do not create

- Merge old `hg-topic-0123` park-gates intent into the main-integrated park workflow.
- Hold the hubs/last-mile candidates until PR #74 deployment and internal-link targets are confirmed.
- Do not create one page per station, gate, shuttle, cableway, traveller type, or corridor direction.

## Hangzhou

### Keep and verify

- `destination-hangzhou` is in main via PR #74 but not yet deployment-verified.
- `shanghai-hangzhou-transport-route` owns the intercity station-pair/door-to-door choice.
- `shanghai-suzhou-hangzhou-nanjing-route-order` owns regional sequence.

### Most common wrong decisions

1. entering only “West Lake” rather than the confirmed hotel, gate, pier or road-access point;
2. selecting Hangzhou East/West/Hangzhou station without matching the actual train and lake-side destination;
3. trusting a map walk that ignores luggage, underpasses, road controls or a lake-side detour;
4. using policy/planning material as proof of current passenger service;
5. duplicating the Shanghai–Hangzhou owner with a station-selector summary.

### Gap and recovery

`hg-topic-0360` is currently clearer than a broad station selector: from Hangzhou East, convert a confirmed West Lake hotel/gate into a usable last-mile chain, including a Chinese destination card and wrong-drop recovery. It should not promise a fixed bus/metro timetable.

`hg-topic-0867` remains research-first. It proceeds only if SERP/user evidence shows a city-wide station decision not already solved by the Hub and Shanghai–Hangzhou page. Airport→confirmed lake/hotel/rail node is another unregistered research gap; it should not become a generic “airport to city centre” page.

### Hold/do not create

- Hold Hangzhou–Huangshan and Hangzhou–Shaoxing until regional-Hub priorities and source/image readiness are stronger.
- Do not create generic West Lake transport, one page per gate, or a rail selector that freezes service directions.

## Chongqing

### Keep and verify

- `chongqing-railway-station-selector` is in main via PR #74 and reserves the four-principal-station decision. It distinguishes Chongqing North, West, East, and Shapingba; Chongqing Station/Caiyuanba remains unavailable while under construction based on reviewed evidence.
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

The current selector already owns wrong-station recovery; no recovery spin-off is needed. `hg-topic-0305` Chengdu–Chongqing becomes useful only as the door-to-door station-pair and hotel-base decision between two cities. CKG airport execution remains a separate research gap and must not be added to the railway selector.

### Hold/do not create

- Central must verify the selector deployment and then run the existing Hub gate; this package cannot publish the Hub.
- Hold Chengdu–Chongqing and Chongqing–Zhangjiajie until Hub/canonical routing is stable.
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

`hg-topic-0347` is the strongest independent next owner: Guilin → a confirmed Longji village/entrance, with luggage handoff, road/walking nodes, weather/closure recheck, and wrong-village recovery. A generic `hg-topic-0865` rail selector overlaps the live Guilin–Yangshuo owner and lacks stable official English station-role evidence; keep it on hold unless a city-base decision remains after the Hub launches.

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

`hg-topic-0876` is viable only after a boundary rewrite. It may own mainland railway hub identity, ticket matching, hotel-area friction, and wrong-station recovery. It may **not** decide ports, border eligibility, immigration documents, crossing hours, or the Hong Kong-side chain; those remain in `shenzhen-hong-kong-transport-route` and official border sources.

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

1. **PR #74 state mismatch:** four transport-network identities are in main but still described as not published. Central needs deployed readback, then a Search Map and Hub-readme correction.
2. **Topic Universe lag:** multiple current main owners still appear as mapped/new candidates. Production status must be reconciled before batch selection.
3. **Tool/editorial mismatch:** `hg-topic-0856`, `0858`, `0859`, `0864`, `0875`, `0881`, and related selector seeds are mapped to a tools workflow. They cannot be implemented as public selectors under this brief. Strong items need explicit reassignment to trilingual editorial guides.
4. **Title/status surface drift:** the BJS–ZJJ–SHA article's new title/lead does not yet match all Registry/Search Map surfaces, and its dynamic examples date mainly from July 2026. Fix the same owner; do not create a new one.
5. **Hub gaps:** Guilin and Shenzhen Hubs are remote-only; Chongqing is gate-held; Hangzhou/Zhangjiajie are main-integrated but publication-unverified. New execution pages must not pretend these are live bidirectional targets.
