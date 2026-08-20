# Official source and image ledger

Research check date: `2026-08-20` (Asia/Shanghai). This is a design-stage source pack. Every article still needs a release-day readback and its own `source-log.md`; a URL's presence here does not authorize an evergreen claim.

## Source-use rules

- Use the operating railway, airport, attraction, transport or border authority first. Local-government releases may confirm an opening or dated operating change.
- Use 12306 for the traveller's exact date and ticketed station. A search result or railway-diagram announcement is a dated sample, never a permanent direction/frequency table.
- Treat holiday, Spring Festival and temporary-construction notices as date-bound evidence only.
- Treat planning, construction and policy documents as future/context evidence, never proof that a passenger service currently runs.
- Record discrepancies instead of silently blending them. The actual ticket/airline/operator result wins for the traveller's departure.
- Dynamic facts require `checked_at`, scope, exception and recheck trigger in the article source log.

## Shared railway and border sources

| ID | Official source | Supports | Does not prove / release trigger |
|---|---|---|---|
| `COMMON-RAIL-1` | [China Railway 12306 English service](https://www.12306.cn/en/index.html) | Live train/date/station search and official passenger service | One sample cannot become a permanent route, station-role, fare or frequency claim; recheck the traveller's date and release day |
| `COMMON-RAIL-2` | [12306 order warning and limited wrong-purchase handling](https://mobile.12306.cn/otsmobile/h5/otsbussiness/info/orderWarmTips.html) | Conditions for a limited order recovery path | Not every ticket/account/payment/timing qualifies; never promise free cancellation |
| `HK-1` | [Hong Kong Immigration Department control points](https://www.immd.gov.hk/eng/contactus/control_points.html) | Hong Kong-side official control-point identity/contact | Must be paired with Shenzhen-side current status; not a visa/eligibility ruling for a specific traveller |
| `HK-2` | [MTR High Speed Rail trip planner](https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html) | Current Hong Kong high-speed-rail trip lookup | Do not store a result as a fixed timetable or imply every cross-border trip should use HSR |

## Beijing

| ID | Official source | Supports | Limitation / trigger |
|---|---|---|---|
| `BJ-1` | [Beijing Government: railway transportation](https://english.beijing.gov.cn/travellinginbeijing/transportation/railway/) | Municipal orientation to Beijing railway nodes | Verify every currently relevant station and train through 12306; city overview may lag a diagram change |
| `BJ-2` | [Beijing Government: current subway information](https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202607/t20260707_4750977.html) | Dated airport/city rail access context | Dated network information does not guarantee a release-day first/last train or construction-free transfer |
| `BJ-3` | [Beijing Government: PEK ground transport](https://english.beijing.gov.cn/specials/beijingservice/pek/trafficsix/) | Capital Airport access options and official routing entry point | Recheck terminal, operating hour and construction; not a whole-trip PEK/PKX verdict |
| `BJ-4` | [Beijing Daxing International Airport official service](https://wechat.bdia.com.cn/fastTrack) | Official PKX service/airport evidence | Product-specific page; pair with current airport/municipal ground-transport notices and actual flight ticket |
| `BJ-5` | [Beijing Government: dated airport bus information](https://english.beijing.gov.cn/livinginbeijing/transportation/bus/202607/t20260727_4792045.html) | A dated official bus-access example | Never freeze route, stop, fare or operating hours; recheck on release/travel day |

Dynamic claims to log: PEK/PKX flight and terminal, airport rail/bus operation, exact Beijing station, 12306 sample, construction/entrance, and same-day connection deadline.

## Shanghai

| ID | Official source | Supports | Limitation / trigger |
|---|---|---|---|
| `SH-1` | [Shanghai Government: transport and gateway orientation](https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html) | Official municipal airport/rail transport context | Broad overview is not a live station roster or route promise |
| `SH-2` | [Shanghai Airport Authority: Hongqiao Airport](https://www.shanghaiairport.com/enhq/index.html) | Current airport/terminal/ground-service entry point | Confirm actual flight and terminal; does not cover every railway-station choice |
| `SH-3` | [Shanghai Government: Airport Link Line update](https://www.shanghai.gov.cn/nw17239/20260401/5131b375c3d44c22a2222266ede0a326.html) | Dated current cross-airport/rail-link context | Recheck service state, access and hours; no guaranteed cross-airport connection time |
| `SH-4` | [Shanghai Disney Resort: rail arrival guidance](https://www.shanghaidisneyresort.com/en/experience/guest-service/rail) | Disney-side official access context | Attraction access can change; not a general PVG/SHA or Shanghai-station verdict |
| `SH-5` | [Shanghai Government: 2026 medical-service evidence at four major railway hubs](https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260214/9d1620c5ff0841b881409229fd1ec219.html) | Current evidence for Shanghai, Shanghai South, Shanghai Hongqiao and Shanghai Songjiang as major passenger hubs | Medical provision proves hub activity, not a route-direction or frequency promise; pair with 12306 |
| `SH-6` | [Shanghai Transport Commission: 2026 operational inspection at Shanghai South and Songjiang](https://www.shanghai.gov.cn/nw31406/20260224/bf18a9f6bfa9420f89b83b44c4a3b043.html) | Dated official station-area, taxi, ride-hailing, access and step-free context | Spring Festival inspection is date-bound; recheck ordinary operations and the traveller's exact train |

Dynamic claims to log: airport/terminal, Airport Link/metro service, four-station roster, the ticket's operating station, hotel-side access, construction and late/early availability.

## Xi'an

| ID | Official source | Supports | Limitation / trigger |
|---|---|---|---|
| `XA-1` | [Xi'an Government: Xi'an East Railway Station opening](https://en.xa.gov.cn/MediaCenter/News/2072253459180654594.html) | Xi'an East opened on 30 June 2026 and changed the mental model | Opening does not prove every route/direction or a permanent service roster; query 12306 |
| `XA-2` | [Xi'an Transport Bureau: railway-station information](https://jtj.xa.gov.cn/zmhd/xxcx/hczxx/6502b33ff8fd1c1a7038fae1.html) | Municipal station identity/orientation | Check page freshness and current passenger operation before use |
| `XA-3` | [Xi'an Government: dated transport-network update](https://en.xa.gov.cn/MediaCenter/News/2065007651985031170.html) | Current municipal transport change context | Announcement scope/date only; not a permanent station-direction table |
| `XA-4` | [Xi'an Transport Bureau](https://jtj.xa.gov.cn/) | Current municipal transport notices and release-day recheck entry point | Search/find the exact notice used; homepage alone cannot support a claim |

Dynamic claims to log: exact principal-station roster, 12306 routes, Xi'an East access, metro/road construction, terminal/entrance and hotel-side transfer. The Topic Universe phrase “Xi'an West” is not evidence.

## Chengdu

| ID | Official source | Supports | Limitation / trigger |
|---|---|---|---|
| `CD-1` | [Chengdu Airports: 30 July 2026 regional-flight adjustment](https://www.cdairport.com/news_detail.aspx?cid=6393&page=1&t=60) | Dated CTU/TFU change affecting selected Hong Kong/Macau/Taiwan flights | Does not create an airport-by-flight-type rule; actual ticket and airport lookup win |
| `CD-2` | [Chengdu Airports: current ground transport](https://www.cdairport.com/traffic3.aspx?t=36) | Official access entry point for airport-side chain | Recheck airport, terminal, mode and hours; no cross-airport guarantee |
| `CD-3` | [Chengdu Airports: official airport notice archive](https://www.cdairport.com/news_detail.aspx?cid=2507&page=4&t=60) | Dated airport-service context and source trail | Use the exact current notice rather than inferring from an archive page |
| `CD-4` | [Jiuzhaigou Scenic Area: official arrival modes](https://www.jiuzhai.com/intelligent-service/arrival-mode) | Onward Jiuzhaigou arrival/base relationship | Not a Chengdu airport/station timetable; recheck seasonal access |
| `CD-5` | [12306: June 2026 Chengdu Bureau passenger-train notice](https://www.12306.cn/mormhweb/zxdt_news/202606/t20260615_45967.html) | Dated operating evidence for Chengdu East, Chengdu South and Chengdu West | Added trains and named directions apply only to the notice dates; live 12306 and station notice control the final roster |
| `CD-6` | [Sichuan Government: Chengdu East, West and South transport-hub handling](https://www.sc.gov.cn/10462/10464/10465/10595/2025/1/15/ca1e3502e04f4e3d9f072d46e471a05b.shtml) | Official local-transfer evidence for the three passenger hubs | 2025 Spring Festival handling is not 2026 timetable proof; use only as static/access context and recheck current notices |

Dynamic claims to log: CTU/TFU flight/terminal, cross-airport access, current Chengdu passenger-station roster, station access, Jiuzhaigou transport and weather/closure where relevant.

## Guangzhou

| ID | Official source | Supports | Limitation / trigger |
|---|---|---|---|
| `GZ-1` | [Guangzhou Government: Baiyun Airport passenger-terminal change](https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10648700.html) | Current municipal baseline for T1 passenger-service cessation and T2/T3 use | Recheck actual flight/terminal and any later airport notice |
| `GZ-2` | [Guangzhou official English portal: 2026 rail-hub change](https://www.eguangzhou.gov.cn/gzlatest/content/post_42957.html) | Dated Guangzhou/Guangzhou Baiyun railway role adjustment | Not a permanent direction/frequency table; use 12306 for the ticket date |
| `GZ-3` | [Guangzhou Government transport services](https://www.gz.gov.cn/zwfw/zxfw/jtfw/) | Current official transport-service directory | Individual claims need their exact current subpage/notice |
| `GZ-4` | [Guangzhou Transport Bureau: current railway/transport notice](https://jtj.gz.gov.cn/gkmlpt/content/10/10947/post_10947514.html) | Dated official evidence for the current hub/transport change | Scope/date only; never turn planning or a holiday service into regular operation |

Dynamic claims to log: current passenger terminal, flight/terminal assignment, inter-terminal route, metro/intercity access, five-station roster/roles, 12306 examples, border/port handoff and construction.

## Zhangjiajie

| ID | Official source | Supports | Limitation / trigger |
|---|---|---|---|
| `ZJJ-1` | [Hunan Airport Group: Zhangjiajie Hehua International Airport](https://www.hunanairport.cn/content/zjjAirPort.html) | Airport identity and official service entry point | Flight destinations, schedules and carriers are dynamic; verify the actual date |
| `ZJJ-2` | [Hunan Department of Transportation: city/scenic-area passenger links](https://jtt.hunan.gov.cn/xxgk/gzdt/szdt1/202506/t20250610_33706126.html) | Dated official evidence that hub-to-scenic-area road links exist | Do not freeze departure times/stops; recheck operator, season and weather |
| `ZJJ-3` | [Hunan Department of Transportation: East Gate–South Gate loop](https://jtt.hunan.gov.cn/jtt/xxgk/gzdt/szdt1/202506/t20250610_33706127.html) | Dated official gate-to-gate road relationship | Operation can change with weather/crowds; not a permanent timetable |
| `ZJJ-4` | [Zhangjiajie scenic-area official ticket page](https://www.hnzjj.com/index.php/Ticket/show/2.html) | Current park ticket/gate/workflow recheck entry point | Price, slot, real-name and route conditions are dynamic |
| `ZJJ-5` | [Zhangjiajie UNESCO Global Geopark: two-day route](https://zhangjiajieuggp.org.cn/html/2026/2026032620135033852.html) | Official route/base relationship context | Not a transport timetable or guarantee that every attraction element operates |
| `ZJJ-6` | [12306: dated Zhangjiajie West network example](https://www.12306.cn/mormhweb/zxdt_news/202607/t20260710_46062.html) | Confirms Zhangjiajie West appears in the current passenger network | The named train/diagram is dated; query live 12306 before publication/travel |

Dynamic claims to log: DYG flight, central/West station, road/coach product, hotel base, gate/ticket/slot, weather/closure, late arrival and luggage acceptance.

## Hangzhou

| ID | Official source | Supports | Limitation / trigger |
|---|---|---|---|
| `HZ-1` | [Hangzhou Xiaoshan Airport: metro access](https://www.hzairport.com/emobile/guide/metro.html) | Official current airport metro lines/access entry point | First/last train, entrance and construction must be rechecked |
| `HZ-2` | [Hangzhou Government: railway-station arrival and metro/luggage access](https://www.hangzhou.gov.cn/art/2025/5/27/art_812269_59113356.html) | Dated municipal station/access evidence | Dated service does not prove a permanent station-direction table |
| `HZ-3` | [Hangzhou Government: West Lake traffic and transit measures](https://eng.hangzhou.gov.cn/art/2025/3/12/art_811217_58876491.html) | Official lake-area access/traffic context | Road controls and dates change; recheck the confirmed hotel/gate |
| `HZ-4` | [Hangzhou Government bulletin: transport policy/context](https://zfgb.hangzhou.gov.cn/10/105220253/t116220253054/518294.shtml) | Hub identity and policy context | Planning/policy is not proof that a route currently operates |
| `HZ-5` | [Huangshan Government: Huangshan North to mountain-gate transfer notice](https://hsgwh.huangshan.gov.cn/xwzx/tzgg/9308852.html) | Official destination-side evidence for a future Hangzhou–Huangshan owner | Fare, stop and schedule require current recheck; not needed for local Hangzhou owner |
| `HZ-6` | [Hangzhou Metro: Longxiangqiao Station exits](https://wx.hzmetro.com/index/index/details.html?id=18) | Exact official exit/road/West Lake-side wayfinding for one common lake-east node | Does not make Longxiangqiao correct for every hotel or lake side; live operating hours and accessibility need recheck |
| `HZ-7` | [West Lake Scenic Area official portal](https://westlake.hangzhou.gov.cn/) | Current scenic-area management and location recheck entry point | Homepage alone does not prove a metro/bus/road service; cite the exact current notice used |
| `HZ-8` | [Hangzhou city news: 2026 railway-station and local-transport notice](https://hznews.hangzhou.com.cn/chengshi/content/2026-04/29/content_9214782.htm) | Dated city-source evidence distinguishing Hangzhou, East, South and West passenger stations | Holiday operation is not a permanent roster or direction table; pair with 12306 and current operator notices |

Dynamic claims to log: airport metro, exact railway station/12306 result, road/West Lake controls, hotel/gate destination, luggage storage/transfer and temporary overnight service.

## Chongqing

| ID | Official source | Supports | Limitation / trigger |
|---|---|---|---|
| `CQ-1` | [Chongqing Government: 2026 Q3 railway-diagram adjustment](https://www.cq.gov.cn/ywdt/jrcq/202606/t20260626_15778151.html) | Current North/West/East operation and “one day, one diagram” volatility | Named trains are dated examples, not permanent directions/frequencies |
| `CQ-2` | [Chongqing Transport Commission: four principal passenger hubs](https://jtysw.cq.gov.cn/sy_240/bmdt/202602/t20260224_15449936.html) | 2026 evidence for North, West, East and Shapingba relevance | Not an exhaustive eternal roster; release-day 12306 still controls |
| `CQ-3` | [Chongqing Government: East Station and current Line 6 extension access](https://www.cq.gov.cn/ywdt/bmts/202507/t20250728_14853868.html) | Current East Station last-mile baseline | Does not prove Lines 24/27 are open; recheck construction/metro access |
| `CQ-4` | [Chongqing Government: Jiangbei Airport terminal adjustment](https://www.cq.gov.cn/ywdt/bmts/202512/t20251222_15262188.html) | Dated current baseline that passenger flights concentrated at T3 from 23 Dec 2025 | Actual airline/terminal and later notice win; airport remains outside rail selector |
| `CQ-5` | [Chongqing Government: temporary airport access construction](https://admin.cq.gov.cn/ywdt/bmts/202608/t20260810_15914183.html) | Demonstrates date-bound entrance/ground-access friction | Applies only during the announced works; recheck before use |
| `CQ-6` | [Chongqing Government: Chongqing Station passenger-service suspension](https://www.cq.gov.cn/ywdt/bmts/202206/t20220615_10817239.html) and [Chongqing Transport Commission: July 2026 Caiyuanba construction update](https://jtysw.cq.gov.cn/sy_240/jdtp/202607/t20260715_15825144.html) | Official basis for treating the old Chongqing Station/Caiyuanba label as unavailable for passenger departure at this review | The 2022 suspension plus 2026 construction status must be rechecked before every future release; do not state a permanent closure |
| `CQ-7` | [Chongqing Development Zone: Line 24 construction update](https://jkq.cq.gov.cn/zwxx/jkdt/202601/t20260108_15301324_wap.html) and [Chongqing Government: Line 27 construction update](https://www.cq.gov.cn/zwgk/zfxxgkzl/fdzdgknr/zdxm/dtxx/202607/t20260703_15798127.html) | Official basis for saying Lines 24 and 27 were not passenger connections at final review | Construction status is date-bound; once an opening notice appears, replace this negative claim with current passenger evidence |

Dynamic claims to log: four-station roster, ticketed station, current metro/road access, Chongqing Station construction status, Lines 24/27 non-operation, airport terminal (only in an airport owner), vertical/step-free chain and railway diagram.

## Guilin

| ID | Official source | Supports | Limitation / trigger |
|---|---|---|---|
| `GL-1` | [Guilin Liangjiang Airport: ground transport](https://gl.airport.gx.cn/html/jiaotongxinxi/jiaotonggongju/) | Current airport bus/taxi/intercity recheck entry point | Stops, schedules and fares are dynamic; not a generic airport-to-centre answer |
| `GL-2` | [Guangxi Transport Department: 2026 railway-service evidence](https://jtt.gxzf.gov.cn/xwdt/zwxmtxx/t27181214.shtml) | Dated current activity at Guilin-area passenger stations | Spring Festival/dated service is not a permanent direction taxonomy |
| `GL-3` | [Li River Scenic Area: official transport](https://en.liriver.com.cn/page/article/lyfw.jtcx) | Official current Guilin–Yangshuo river/ground relationship | Weather, water level and departures change; not an unrestricted commuter service |
| `GL-4` | [Li River Scenic Area: official ticket/product information](https://en.liriver.com.cn/page/article/lyfw.pwxx) | Official product verification path | Do not freeze price, departure or baggage policy |
| `GL-5` | [Longji Scenic Area: official area structure](https://wp.longjitour.com/index.php/about/) | Ping'an, Jinkeng/Dazhai and ancient Zhuang village are different destination areas | Does not by itself prove current road service or a hotel's luggage handoff |
| `GL-6` | [Longji Scenic Area: current management notice](https://wp.longjitour.com/index.php/2025/07/04/%E9%BE%99%E8%84%8A%E6%A2%AF%E7%94%B0%E6%99%AF%E5%8C%BA%E5%BC%80%E6%94%BE%E7%AE%A1%E7%90%86%E6%83%85%E5%86%B5/) | Official opening/management context | Recheck weather, road, gate and operator before travel |

Dynamic claims to log: KWL ground transport, exact Guilin/West/North/Yangshuo ticket, river product, road/weather/park state, named Longji village/entrance and luggage handoff.

## Shenzhen

| ID | Official source | Supports | Limitation / trigger |
|---|---|---|---|
| `SZ-1` | [Shenzhen Government: current railway-station distribution](https://jtys.sz.gov.cn/jtzx/wycx/hccx/hczfb/) | Official station identity/transport entry point | Verify each live station and route against current 12306/diagram |
| `SZ-2` | [Shenzhen Government: Futian railway station](https://jtys.sz.gov.cn/jtzx/wycx/hccx/hczfb/content/post_11457302.html) | Exact Futian railway-station identity | Not Futian Checkpoint; not proof of border eligibility or crossing hours |
| `SZ-3` | [Shenzhen Government: 1 July 2026 railway diagram](https://www.sz.gov.cn/cn/xxgk/bmtx/content/post_12863893.html) | Dated evidence that North, Futian, Shenzhen and East are active passenger nodes | Train counts/routes are diagram-specific, not permanent |
| `SZ-4` | [Shenzhen Government English: railway stations](https://www.sz.gov.cn/en_szgov/life/transport/trains/content/post_11538776.html) | English municipal station orientation | May include future facilities; cross-check current operation |
| `SZ-5` | [Shenzhen Airport: current ground-transport entry point](https://www.szairport.com/szairporten/lwszsq/tiaoz.shtml) | Official SZX transport context | Recheck station naming, terminal, construction and hours |
| `SZ-6` | [Shenzhen Port Office: current checkpoints](https://ka.sz.gov.cn/bmfw/katgfw/index.html) | Shenzhen-side port identity/status | Must be paired with Hong Kong official status; no individual eligibility promise |
| `SZ-7` | [Shenzhen Government: port transport guidance](https://www.sz.gov.cn/en_szgov/news/infocus/modern/news/content/post_12638271.html) | Dated access context for major checkpoints | Resident-document examples cannot be generalized to foreign passports |
| `SZ-8` | [Shenzhen Port Office: Airport North temporary works](https://ka.sz.gov.cn/szsrmzfkabgswzgkml/szsrmzfkabgswzgkml/qt/gzdt/content/post_12740054.html) | Date-bound construction/walking friction | Must be removed or updated when works end; not a permanent transfer feature |

Dynamic claims to log: active railway nodes, exact ticket, airport/rail naming, temporary construction, port status/hours, Hong Kong-side status and document-specific exceptions. A mainland rail owner must hand all port/eligibility decisions to the Shenzhen–Hong Kong owner.

## Real-image leads and gaps

These are research leads, not downloaded assets. The implementing editor must reopen the file page, verify licence/location/reuse, download the original, hash before editing, then hash the derivative.

| Decision owner | Candidate or requirement | Known rights/location evidence | Use / prohibition |
|---|---|---|---|
| Chongqing railway selector | [September 2025 at Chongqing East Railway Station 02](https://commons.wikimedia.org/wiki/File:September_2025_at_Chongqing_East_Railway_Station_02.jpg) | Renek78; CC0 1.0; 2025-09-06; coordinates 29.488573, 106.665398; exact East Station exterior | Already recorded in the merged article source log with SHA/crop; do not duplicate as another article's primary image without review |
| Guangzhou rail selector | [Guangzhou South railway station](https://commons.wikimedia.org/wiki/File:Guangzhou_South_railway_station.jpg) | Rc1959; CC BY-SA 4.0; 2025-12-25; station exterior/identity | Candidate for one row/hero only; cannot represent all five hubs |
| Chengdu rail selector | [Chengdu East Railway Station Concourse](https://commons.wikimedia.org/wiki/File:Chengdu_East_Railway_Station_Concourse.jpg) | Baycrest; CC BY-SA 2.5; 2016; exact concourse | Candidate body image after currency/reuse review; do not infer current trains from displays |
| Zhangjiajie hub selector | [Zhangjiajie railway station](https://commons.wikimedia.org/wiki/File:Zhangjiajie_railway_station.jpg) | Ludger Heide/Windmemories; CC BY-SA 2.0; 2016-10-04; old/central station | Can illustrate the central station only; prohibited as Zhangjiajie West substitute. Commission/secure a current West Station hero |
| Guilin–Yangshuo | [Yangshuo Railway Station 202102](https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg) | File page reports CC BY-SA 4.0; reopen for author/date/location | Existing owner candidate/record only; do not assume “Yangshuo station equals town centre” |
| Guilin→Longji | [Longsheng rice terraces](https://commons.wikimedia.org/wiki/File:Longsheng_rice_terraces_87810-Longsheng_(49040262503).jpg) | Xiquinho Silva; photographed 2018-06-15; exact coordinates on file page; licence must be reopened | Context body image only, not an entrance/transfer hero. Exact village/gate signage still needed |
| Shenzhen rail selector | [Shenzhen North Railway Station outside view](https://commons.wikimedia.org/wiki/File:Shenzhen_North_Railway_Station_Outside_view_201809.jpg) | Wpcpey; 2018-09-23; file page/licence text needs reconciliation before use | Candidate exact station image only; cannot represent Futian station/checkpoint |
| Shenzhen–Hong Kong | [Hong Kong West Kowloon Station exterior](https://commons.wikimedia.org/wiki/File:Hong_Kong_West_Kowloon_Station_exterior%EF%BC%88West%EF%BC%892021_08_part2.jpg) | File page reports CC BY-SA 4.0; reopen for author/date/location | Existing cross-border owner only; add a Shenzhen-side exact asset rather than reusing everywhere |
| Hangzhou station owner | [Hangzhou East Railway Station concourse](https://commons.wikimedia.org/wiki/File:Hangzhou_East_Railway_Station_concourse_(54002476316).jpg) | Exact East Station candidate; author/licence/date must be reopened | Candidate body/hero only after full rights record; exact West Lake arrival node still needed |
| Xi'an rail selector | Commission/local-rights search for Xi'an East station name and transfer area | No approved exact Xi'an East candidate in this audit | `ASSETS NEEDED`; do not use Xi'an North as an unlabeled substitute |
| Beijing PEK/PKX | Homeground/local or explicitly official-licensed exact airport ground-transport images | No approved pair in this audit; exterior architecture rights require review | `ASSETS NEEDED`; no generic aircraft/skyline |
| Shanghai rail selector | Rights-clear current images for Hongqiao railway station and at least one contrasting station | No approved complete set in this audit | `ASSETS NEEDED`; airport terminal cannot stand in for rail station |
| Chengdu CTU/TFU | Exact current terminal/ground-transport signs at both airports | No approved complete set in this audit | `ASSETS NEEDED`; do not infer airport from generic Chengdu/aircraft image |
| Zhangjiajie West→Wulingyuan | Exact West Station transfer area plus booked Wulingyuan hotel/entrance sign | No approved complete set in this audit | `ASSETS NEEDED`; no mountain landscape substitute |
| Hangzhou East→West Lake | East Station wayfinding plus exact hotel/gate/pier/road node | Partial station candidate only | Lake scenery alone is prohibited as decision proof |
| Guilin→Longji | Exact Ping'an/Dazhai/Jinkeng/ancient Zhuang entrance and luggage/road environment | Context landscape candidate only | `ASSETS NEEDED`; never label one village as generic Longji |

## Image provenance fields

Each article's `image-plan.md` and `source-log.md` must record, per asset:

```text
asset_id:
article_owner:
entity_shown:
exact_location:
original_path_or_file_page:
direct_original_url:
author:
licence:
licence_url:
capture_date:
downloaded_at:
original_sha256:
crop_box:
derivative_dimensions:
derivative_sha256:
reuse_search:
caption_en / caption_zh / caption_ko:
alt_en / alt_zh / alt_ko:
ai_generated: false
ai_assisted: false
```

No candidate becomes an article asset until every required field is verified. If the file page and licence block conflict, hold the image rather than selecting the most permissive interpretation.
