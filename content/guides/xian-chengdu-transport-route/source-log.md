# Source log — xian-chengdu-transport-route

All retrieval timestamps are 2026-08-22, Asia/Taipei (UTC+8), unless stated otherwise. The two
Live QA correction sources below were retrieved 2026-08-31, Asia/Shanghai.
Claim-to-source table written before the body was drafted; reverse verification performed after.

---

## 1. China Railway 12306 — station dictionary

- **Institution:** China Railway 12306 (China Academy of Railway Sciences Corporation Limited)
- **Page title:** `station_name.js` — the station dictionary the official booking site loads
- **URL:** https://kyfw.12306.cn/otn/resources/js/framework/station_name.js
- **Published / updated:** not dated by the publisher; served live and versioned by the site
- **Retrieved:** 2026-08-22, Asia/Taipei
- **Supports:** that the dictionary contains four separately named Xi'an station identities (西安北 EAY,
  西安东 XDY, 西安 XAY, 西安西 EGY) and four separately named Chengdu station identities (成都东 ICW,
  成都南 CNW, 成都 CDW, 成都西 CMW); that all four Xi'an entries carry city `西安` and all four
  Chengdu entries carry city `成都`, which is what makes the same-city endorsement exception
  relevant here; the exact Chinese names and telegraph codes reproduced in the station table.
- **Cannot support:** that any given station sells any given train on any given date; opening
  status of a station; platform, exit or transfer arrangements; anything about journey time.
- **Dynamic:** yes — station lists change when lines open. Logged in `dynamic-facts.md`.

## 2. China Railway 12306 — English passenger FAQ

- **Institution:** China Railway 12306
- **Page title:** Ticketing / Endorsement and refund / Miscellaneous FAQ (English)
- **URL:** https://www.12306.cn/en/faq.html
- **Published / updated:** undated page; content includes rules dated to 1 January 2023 and a
  refund provision referencing travel dates from 2 February 2026
- **Retrieved:** 2026-08-22, Asia/Taipei
- **Supports:** real-name ticketing and that foreign passengers buy with valid passports; that the
  English site accepts only valid foreign passports; ticket sales and endorsement hours 05:00 to
  01:00 the next day, and to 23:30 on Tuesdays, with queries and refunds 24 hours; that endorsement
  may change date, train number or seat but **not** departure and arrival station except for
  stations in the same city; that change of destination must be requested at least 48 hours before
  the original departure; the refund service fee tiers (no fee at 8 days or more, 5% inside 8 days
  but over 48 hours, 10% between 24 and 48 hours, 20% inside 24 hours, minimum RMB 2); free cabin
  luggage limits (20 kg adult, 10 kg child, 35 kg diplomat; 160 cm total per item on conventional
  trains, 200 cm for rod-shaped items, 130 cm on EMU trains; 20 kg maximum per item; folding
  wheelchairs excluded); that security check applies to all passengers and their belongings; that
  ticket sales and checks stop before departure and the exact margin is a station announcement;
  that station refunds must be processed before departure and post-departure handling needs station
  approval; the lost-identity-document procedure.
- **Cannot support:** anything about specific trains, stations, fares or times; airline rules;
  airport procedure; the length of any queue.
- **Dynamic:** partly — 12306 states it may adjust refund rules temporarily. Logged.

## 2A. China Railway 12306 — mistaken-purchase free-refund conditions

- **Institution:** China Railway 12306
- **Page title:** 购票信息单 — 误购免费退票服务
- **URL:** https://mobile.12306.cn/otsmobile/h5/otsbussiness/info/orderWarmTips.html?hiddenNav=true&tabIndex=6
- **Published / updated:** undated live service explanation
- **Retrieved:** 2026-08-31, Asia/Shanghai
- **Supports:** registered users may request the service for a ticket paid electronically or with
  points through the 12306 website, app or Alipay mini-program, with a travel date of 2 February
  2026 or later, on a domestic passenger train or a cross-border train starting or ending at Hong
  Kong West Kowloon. Purchase must have succeeded within the previous 30 minutes and scheduled
  departure must remain at least four hours away; one qualifying order is allowed per calendar
  day. Changed tickets, period or ride-count passes, reservation and waitlist purchases, air–rail
  or water–rail products, group tickets and Railway e-Pass tickets are excluded.
- **Cannot support:** a general cooling-off right, a free refund after either time boundary, or
  eligibility for every ticket or sales channel.
- **Dynamic:** yes; recheck before relying on the exception.

## 3. China Railway 12306 — official ticket channel

- **Institution:** China Railway 12306
- **Page title:** 12306 China Railway (English home)
- **URL:** https://www.12306.cn/en/index.html
- **Published / updated:** live service page
- **Retrieved:** 2026-08-22, Asia/Taipei
- **Supports:** that 12306.cn is the official channel and the place to confirm a station pair for a
  specific date; the published service-hours statement.
- **Cannot support:** any specific train, fare or availability.
- **Dynamic:** yes.

## 4. Xixian New Area Development and Construction Administrative Committee — T5 travel guide

- **Institution:** Shaanxi Province Xixian New Area Development and Construction Administrative
  Committee (陕西省西咸新区开发建设管理委员会); source credited on the page as the Xixian New Area
  media centre
- **Page title:** 西安咸阳国际机场T5航站楼超详细出行指南来了
- **URL:** http://www.xixianxinqu.gov.cn/xwzx/tzgg/1892481399452139521.html
- **Published:** 2025-02-20 15:07
- **Retrieved:** 2026-08-22, Asia/Taipei (fetched over HTTP; the HTTPS endpoint presents a
  self-signed certificate chain, noted so a reviewer can reproduce the retrieval)
- **Supports:** T5 entered service 20 February 2025; total floor area 705,500 m²; main terminal plus
  six piers; level three check-in and international departures, level two mixed domestic
  arrivals/departures, level one baggage handling and arrivals, B1 reserved; north-three and
  south-three piers convertible between domestic and international, other piers domestic in this
  phase; China Eastern (MU), Shanghai Airlines (FM) and China United (KN) domestic flights stop
  check-in and baggage drop 40 minutes before scheduled departure; misdirected-passenger assembly
  points with a free walk-up shuttle at the information counters inside door 533 (T5), door 323 (T3)
  and door 222 (T2); Metro Line 14 station 机场(T5) opened 18 February 2025, east of T5 between the
  airport overnight building and the parking garage, concourse on the GTC ground floor and platform
  at B1; first and last trains at that station in both directions; free travel on Line 14 between
  机场西(T1、T2、T3) and 机场(T5) within Line 14 operating hours for transferring passengers and for
  passengers who alighted at the wrong terminal station, on showing flight information at the
  station ticket service centre; airport bus pickup points, routes and operating windows.
- **Cannot support:** any current flight, terminal assignment or airline schedule; anything about
  Chengdu; any journey time between the airport and a city address.
- **Dynamic:** yes — first/last trains, bus routes and the free-transfer arrangement are all
  operational and revisable. Logged.

## 5. Shaanxi Provincial People's Government — T5 enters service

- **Institution:** Shaanxi Provincial People's Government (陕西省人民政府)
- **Page title:** 西安咸阳国际机场T5航站楼投运
- **URL:** https://www.shaanxi.gov.cn/xw/tpxw/202502/t20250220_3445381_wap.html
- **Published:** 2025-02-20
- **Retrieved:** 2026-08-22, Asia/Taipei (via provincial-government search index; the host refused
  a direct connection from this network, so the page was read through the government search
  surface — flagged here rather than presented as a clean direct fetch)
- **Supports:** the opening date and provincial confirmation of T5 entering service.
- **Cannot support:** operational detail; that is taken from source 4.
- **Dynamic:** no — this is a dated historical event.

## 6. Shaanxi Provincial People's Government — Metro Line 14 opening

- **Institution:** Shaanxi Provincial People's Government
- **Page title:** 【西安】地铁14号线今日开通运营
- **URL:** http://www.shaanxi.gov.cn/xw/ldx/ds/202106/t20210629_2181120.html
- **Published:** 2021-06-29
- **Retrieved:** 2026-08-22, Asia/Taipei
- **Supports:** that Line 14 opened on 29 June 2021 and was operated through with the existing
  Xianyang International Airport intercity railway as a single Line 14, connecting the airport and
  Xi'an North Railway Station.
- **Cannot support:** current first/last train times, fares, or the T5 extension (source 4 covers
  the 2025 station).
- **Dynamic:** no for the opening fact; yes for anything about current operation.

## 7. CAAC Southwest Regional Administration — Tianfu becomes the international gateway

- **Institution:** Civil Aviation Administration of China, Southwest Regional Administration
  (中国民用航空西南地区管理局)
- **Page title:** 成都天府国际机场"新国门"正式开启
- **URL:** http://xn.caac.gov.cn/XN_XXGK/XN_YSSC/202303/t20230328_217747.html
- **Published:** 2023-03-28
- **Retrieved:** 2026-08-22, Asia/Taipei
- **Supports:** that from 26 March 2023 international passenger flights previously operating from
  Shuangliu operate from Tianfu, and that Hong Kong, Macao and Taiwan regional passenger flights
  were transferred to Tianfu at that time; that the two airports are run as one system.
- **Cannot support:** the airport or terminal assignment of any individual flight today; the
  Hong Kong/Macao/Taiwan arrangement has since been adjusted, which is why the body tells the
  reader to read their own booking rather than repeating a 2023 allocation as current.
- **Dynamic:** yes for current allocations; no for the dated 2023 consolidation event.

## 8. Chengdu Airport (Sichuan Province Airport Group) — inter-airport guide

- **Institution:** Chengdu Shuangliu / Tianfu International Airport operator
- **Page title:** 双流机场-天府机场互通指南
- **URL:** https://www.cdairport.com/news_detail.aspx?t=60&cid=2507
- **Published:** 2024-03-30
- **Retrieved:** 2026-08-22, Asia/Taipei
- **Supports:** that one operator runs both Chengdu airports; that Metro Line 19 and Airport Shuttle
  Line 5 connect them; the boarding locations named by the operator for each direction.
- **Cannot support:** journey times between the airports; connection guarantees; anything about
  Xi'an.
- **Dynamic:** yes.

## 9. Sichuan Provincial People's Government — Metro Line 18 direct services

- **Institution:** Sichuan Provincial People's Government (四川省人民政府)
- **Page title:** 6月1日起成都地铁18号线新增直达列车 33分钟直达天府机场
- **URL:** https://www.sc.gov.cn/10462/10464/10465/10595/2023/5/30/58a406950eef4ab58e425282275b50ee.shtml
- **Published:** 2023-05-30
- **Retrieved:** 2026-08-22, Asia/Taipei
- **Supports:** that Metro Line 18 links Chengdu South Railway Station (火车南站) with Tianfu
  Airport, and that a direct service pattern stopping only at 火车南站, 天府机场1号2号航站楼 and
  天府机场北 was introduced from 1 June 2023.
- **Cannot support:** the current running time or fare. The body deliberately does **not** publish
  the 33-minute figure or the fare as current facts; it states only that the link exists.
- **Dynamic:** yes.

## 10. Sichuan Provincial People's Government — Xi'an–Chengdu high-speed railway

- **Institution:** Sichuan Provincial People's Government
- **Page title:** 西成高铁开通初期最短旅行时间4小时7分 年底将压缩至3小时27分
- **URL:** https://www.sc.gov.cn/10462/12771/2017/12/4/10439830.shtml
- **Published:** 2017-12-04
- **Retrieved:** 2026-08-22, Asia/Taipei
- **Supports:** that the Xi'an–Chengdu high-speed railway opened over its full length on
  6 December 2017 running between Xi'an North and Chengdu East.
- **Cannot support:** any current journey time. The 2017 timings in the headline are historical and
  are **not** reproduced in the body.
- **Dynamic:** no for the opening; the timings quoted in the source are obsolete by design.

## 11. Chengdu Municipal Government Service Network — Chengdu Station passenger closure

- **Institution:** Chengdu Municipal Government Service Network (成都市政府服务网)
- **Page title:** notice recording the suspension of passenger service at Chengdu Station and
  redistribution of its existing trains
- **URL:** https://cds.sczwfw.gov.cn/art/2022/10/11/art_15395_191149.html
- **Published:** 2022-10-11
- **Retrieved:** 2026-08-23, Asia/Shanghai; cross-checked against the already published Chengdu
  destination Hub and the current 12306 verification rule
- **Supports:** that the old central Chengdu Station stopped handling passengers in 2022 for
  reconstruction and that travellers must not infer current operation from the continued presence
  of `成都 / CDW` in the station dictionary.
- **Cannot support:** a reopening date, a future timetable, or that any train is bookable today.
- **Dynamic:** yes. The body requires a current 12306 date search before the station can re-enter a
  live itinerary.

## 12. Chengdu Airport — partial Hong Kong, Macao and Taiwan flight move

- **Institution:** Sichuan Province Airport Group / Chengdu Shuangliu and Tianfu International Airport operator
- **Page title:** 7月30日起，成都双流国际机场和天府国际机场部分港澳台地区航班有调整
- **URL:** https://www.cdairport.com/news_detail.aspx?cid=6393&page=1&t=60
- **Published:** 2026-07-15
- **Retrieved:** 2026-08-31, Asia/Shanghai
- **Supports:** from 06:00 on 30 July 2026, some Hong Kong, Macao and Taiwan flights moved from
  Tianfu T1 to Shuangliu T1; after the adjustment both Chengdu airports operate those regional
  flights; travellers must confirm the airport and terminal on their booking.
- **Cannot support:** that every regional flight moved, any individual flight assignment, or a
  permanent allocation that overrides a current booking.
- **Dynamic:** yes; recheck on every content review and before a traveller relies on an airport.

---

## Claim-to-source table (reverse verification, run after drafting)

| Claim in the body | Source | Verified |
| --- | --- | --- |
| Four Xi'an and four Chengdu station identities in the dictionary, with those Chinese names and codes; dictionary presence is not proof of operation | 1 | yes |
| All four Xi'an stations share one city, and likewise Chengdu | 1 | yes |
| Xi'an–Chengdu HSR opened 6 December 2017, Xi'an North to Chengdu East | 10 | yes |
| Security applies to all passengers and everything carried | 2 | yes |
| Endorsement cannot change departure/arrival station except same-city stations | 2 | yes |
| Change of destination needs at least 48 hours | 2 | yes |
| Refund fee tiers 0 / 5% / 10% / 20%, minimum RMB 2 | 2 | yes |
| Mistaken-purchase free refund: registered user; electronic/points payment; travel date from 2 February 2026; domestic or Hong Kong West Kowloon start/end train; within 30 minutes of purchase; at least four hours before departure; one order/day; no changed, period/ride-count, reservation, waitlist, air–rail/water–rail, group or Railway e-Pass tickets | 2A | yes |
| Free cabin luggage 20 / 10 / 35 kg; 160 cm, 200 cm rod, 130 cm EMU; 20 kg per item; folding wheelchairs excluded | 2 | yes |
| Sales and endorsement 05:00–01:00, Tuesday to 23:30; queries and refunds 24 h | 2 | yes |
| Lost booking passport has a published station procedure | 2 | yes |
| T5 opened 20 February 2025; four levels with the stated functions; six piers; two convertible | 4 | yes |
| MU, FM, KN domestic check-in and baggage close 40 minutes before scheduled departure | 4 | yes |
| Misdirected-passenger assembly points at doors 533, 323, 222 with free shuttle | 4 | yes |
| Line 14 serves T1/T2/T3 at 机场西 and T5 at 机场; free travel between them on showing flight info | 4 | yes |
| Line 14 机场(T5) station opened 18 February 2025 | 4 | yes |
| Line 14 opened 2021 and was through-linked with the airport intercity railway, connecting airport and Xi'an North | 6 | yes |
| One operator runs both Chengdu airports | 7, 8 | yes |
| International passenger flights consolidated at Tianfu from 26 March 2023 | 7 | yes |
| From 30 July 2026 some Hong Kong, Macao and Taiwan flights moved to Shuangliu T1 and both Chengdu airports operate regional flights | 12 | yes |
| Metro Line 19 and Airport Shuttle Line 5 connect the two Chengdu airports | 8 | yes |
| Metro Line 18 links Chengdu South Railway Station with Tianfu Airport | 9 | yes |
| Old central Chengdu Station stopped passenger service in 2022 and is not a current itinerary assumption | 11 | yes |
| Hero image licence and authorship | image-plan.md | yes |

## Absolute expressions audited after drafting

Every "always", "never", "must" and "guaranteed" was re-read. The body contains no promised journey
time, no fare, no seat availability, no claim that a station sells a given train, and no statement
that a rule cannot change. The one categorical statement retained — that all passengers and their
belongings are subject to security check — is a direct paraphrase of source 2.

## Sources deliberately not used

Third-party timetable aggregators, OTA pages, `bendibao`-type city portals and travel-media guides
appeared in searching and were **not** used for any operational fact. They are not cited anywhere in
the body.
