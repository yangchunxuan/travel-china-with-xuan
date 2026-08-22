# Source log — xian-lanzhou-dunhuang-silk-road-route

All retrieval timestamps are 2026-08-22, Asia/Taipei (UTC+8). Claim-to-source table written before
drafting; reverse verification run afterwards against every number, date and absolute expression.

---

## 1. China Railway 12306 — station dictionary

- **Institution:** China Railway 12306
- **Page title:** `station_name.js`, the station dictionary the official booking site loads
- **URL:** https://kyfw.12306.cn/otn/resources/js/framework/station_name.js
- **Published / updated:** undated; served live and versioned by the site
- **Retrieved:** 2026-08-22
- **Supports:** the exact Chinese names, telegraph codes and registered cities of 西安北 (EAY, Xi'an),
  兰州西 (LAJ), 兰州 (LZJ), 中川机场东 (ZRJ) — all registered under Lanzhou — 敦煌 (DHJ),
  柳园南 (LNR) and 柳园 (DHR) — all three registered under **Jiuquan**, not Dunhuang — and
  嘉峪关南 (JBJ, Jiayuguan). The Jiuquan registration is what makes a city-name search fail to
  separate Dunhuang from Liuyuan, which the body states explicitly.
- **Cannot support:** which station sells which train on which date; frequencies; journey times;
  whether a station is currently served at all.
- **Dynamic:** yes.

## 2. China Railway 12306 — official ticket channel

- **URL:** https://www.12306.cn/en/index.html · **Retrieved:** 2026-08-22
- **Supports:** that 12306 is the official channel for confirming any of these legs on a date.
- **Cannot support:** any specific service.
- **Dynamic:** yes.

## 3. Dunhuang Academy — Mogao Grottoes visitor page

- **Institution:** 敦煌研究院 (Dunhuang Academy), the body that administers the Mogao Grottoes
- **Page title:** 莫高窟 (Mogao Grottoes), within 石窟行旅
- **URL:** https://www.dha.ac.cn/skxl/mgk.htm
- **Published / updated:** undated live page; content is current, and the same site's announcement
  index carries items dated to August 2026
- **Retrieved:** 2026-08-22
- **Supports:** that the site is open all year; that the peak season runs 1 April – 30 November and
  the off season 1 December – 31 March; that **ticket sales close several hours before the site
  does** in both seasons; that the Digital Exhibition Centre is the first stop of a visit; that
  there is **no ticket office in the cave area** and visitors are told not to drive straight there;
  that the ticket record is verified separately at the Digital Exhibition Centre and again at the
  cave area; that the Centre is some kilometres out of the city; that when heavy rain or severe
  dust occurs an emergency plan is activated, caves stop opening, and affected visitors receive
  **full refunds**; that large luggage may be left at the Centre.
- **Cannot support:** the reservation workflow, identity fields, cave counts or prices — all of
  which belong to the Mogao canonical owner and are deliberately absent from this body. Also
  cannot support anything about Lanzhou or Xi'an.
- **Dynamic:** yes for hours, seasons and any operational arrangement.

## 4. Dunhuang Academy — announcements index

- **Page title:** 通知公告 (Notices and announcements)
- **URL:** https://www.dha.ac.cn/xwzx/tzgg.htm
- **Retrieved:** 2026-08-22
- **Supports:** the specific 2026 closure sequence used in the body — a delayed-opening advisory
  issued 28 July for 29 July; a full suspension on 29 July with sales and checks stopped and free
  refunds; reopening on 30 July; a suspension from 11:00 on 24 June with reopening on 25 June; and
  an advance advisory issued 9 July for a multi-day rain event.
- **Cannot support:** any prediction about future closures. The body presents these as historical
  examples of a recurring risk and says so.
- **Dynamic:** yes, by definition.

## 5. China State Railway Group — Golmud–Dunhuang passenger service

- **Institution:** 中国国家铁路集团有限公司 (China State Railway Group)
- **Page title:** 格尔木至敦煌间首开旅客列车
- **URL:** http://www.china-railway.com.cn/xwzx/zhxw/202307/t20230711_128960.html
- **Published:** 2023-07-11 · **Retrieved:** 2026-08-22
- **Supports:** that the Dunhuang railway runs from Liugou on the Lanzhou–Xinjiang railway through
  Dunhuang, Aksai and Subei, over the Qilian Mountains into Qinghai via Mahai and Da Qaidam,
  joining the Qinghai–Tibet railway at Yinmaxia; total length 671 km; opened December 2019.
- **Cannot support:** current services on that line. The specific 2023 train numbers were **not**
  carried into the body, because they are exactly the sort of dynamic detail this guide avoids.
- **Dynamic:** no for the line's route and length; yes for services.

## 6. Belt and Road Portal — Dunhuang railway opening

- **Institution:** 中国一带一路网 (Belt and Road Portal, gov.cn)
- **Page title:** 敦煌铁路全线开通运营 "一带一路"添金桥
- **URL:** https://www.yidaiyilu.gov.cn/p/113261.html
- **Published:** 2019-12-19 · **Retrieved:** 2026-08-22
- **Supports:** that the line opened over its full length on 18 December 2019 and is a
  **single-track electrified Class I line designed for 120 km/h** — the fact that establishes that
  a train into Dunhuang station is not a high-speed service.
- **Cannot support:** current timetable or service pattern.
- **Dynamic:** no.

## 7. SASAC — Lanzhou Zhongchuan airport loop railway

- **Institution:** 国务院国有资产监督管理委员会 (SASAC), carrying an item sourced to the Gansu
  provincial state-asset commission
- **Page title:** 空铁联运开启"零换乘"新时代 兰州中川机场环线铁路投运
- **URL:** http://www.sasac.gov.cn/n2588025/n2588129/c33097533/content.html
- **Published:** 2025-03-24 · **Retrieved:** 2026-08-22 (fetched over HTTP; the fetch tool's HTTPS
  path returned `ECONNREFUSED` from this network, noted so a reviewer can reproduce)
- **Supports:** that the loop railway and the Phase 3 expansion entered service together; that
  **T1 and T2 were suspended and passenger operations moved wholly to Zhongchuan Airport East
  station (T3)**; that the station handles 20 arriving and departing trains and 18 calling trains
  daily; that the fastest run from Lanzhou West is 38 minutes with "zero transfer" into T3; that
  the station is a two-level underground side-platform station beneath the ground transportation
  centre on T3's south side, linked to the terminal by an underground passage; line length
  14.152 km, airport line designed 120 km/h, connecting line 80 km/h.
- **Cannot support:** current train counts or running times — the body attributes the 38-minute
  figure and the counts to this source and to that date, and flags both as changeable.
- **Dynamic:** yes for counts and times; no for the T1/T2 suspension event.

## 8. NDRC — Lanzhou Zhongchuan Phase 3

- **Institution:** 国家发展和改革委员会 (National Development and Reform Commission)
- **Page title:** 【甘肃兰州中川国际机场三期建成投运】
- **URL:** https://www.ndrc.gov.cn/xwdt/ztzl/dtfzgz/202504/t20250403_1397004.html
- **Published:** 2025-04-03 · **Retrieved:** 2026-08-22
- **Supports:** that **T3 entered service on 20 March 2025**; that Phase 3 comprises two new
  runways, a 400,000 m² T3 and a 270,000 m² ground transportation centre; projected annual capacity
  38 million passengers.
- **Cannot support:** current operations. Only the T3 opening date and the fact of the expansion
  were carried into the body.
- **Dynamic:** no.

## 9. CAAC — Dunhuang Mogao International Airport

- **Institution:** 中国民用航空局 (Civil Aviation Administration of China)
- **Page title:** 敦煌莫高国际机场, under 关于民航 → 民航概况 → 国际（口岸）运输机场 → 西北地区 → 甘肃
- **URL:** http://www.caac.gov.cn/GYMH/MHGK/GJKAYSJC/XBDQ/GS/202404/t20240417_223898.html
- **Published:** 2024-04-17 · **Retrieved:** 2026-08-22
- **Supports:** that CAAC lists Dunhuang Mogao International Airport among Gansu's international
  (port) transport airports — which is all the body claims: that flying this leg is a real option.
- **Cannot support:** routes, frequencies, terminal detail or throughput. The page carries no such
  detail, and none was inferred.
- **Dynamic:** no for the classification.

## 10. Qinghai Provincial People's Government — Lanzhou–Xinjiang high-speed railway

- **URL:** http://www.qinghai.gov.cn/dmqh/system/2024/12/27/030061694.shtml
- **Published:** 2024-12-27 · **Retrieved:** 2026-08-22
- **Supports:** that the Lanzhou–Xinjiang high-speed railway opened over its full length on
  26 December 2014 and runs from Lanzhou through Xining to Urumqi, 1,786 km.
- **Cannot support:** its current stopping pattern. That it does not stop in Dunhuang is
  established from source 1 and source 6 together — Dunhuang station sits on the conventional
  Dunhuang line, and the high-speed line's nearest station is Liuyuan South.
- **Dynamic:** no.

---

## Claim-to-source table (reverse verification)

| Claim in the body | Source | Verified |
| --- | --- | --- |
| Dunhuang, Liuyuan South and Liuyuan are all registered under Jiuquan | 1 | yes |
| Exact Chinese names and telegraph codes in the station table | 1 | yes |
| Dunhuang line: Liugou to Yinmaxia, 671 km, opened December 2019 | 5, 6 | yes |
| Dunhuang line is single-track electrified, designed for 120 km/h | 6 | yes |
| Lanzhou–Xinjiang HSR opened 26 December 2014, Lanzhou–Xining–Urumqi | 10 | yes |
| The high-speed line's nearest stop to Dunhuang is Liuyuan South | 1 + 6 | yes |
| Dunhuang Mogao International Airport exists and is a CAAC-listed international transport airport | 9 | yes |
| T3 opened 20 March 2025 | 8 | yes |
| T1 and T2 suspended; passenger operations moved to Zhongchuan Airport East / T3 | 7 | yes |
| 20 arriving/departing and 18 calling trains daily; fastest 38 minutes from Lanzhou West | 7 | yes |
| Station is underground, two-level side-platform, under the GTC on T3's south side, linked by an underground passage | 7 | yes |
| Mogao open all year; peak 1 Apr – 30 Nov; off season 1 Dec – 31 Mar | 3 | yes |
| Ticket sales close hours before the site closes | 3 | yes |
| Digital Exhibition Centre is the first stop; no ticket office in the cave area; do not drive there | 3 | yes |
| Heavy rain or severe dust triggers the emergency plan, caves stop opening, full refunds | 3 | yes |
| The 2026 closure and reopening dates (24/25 June, 28/29/30 July, 9 July advisory) | 4 | yes |
| Roughly 1,100 km of Hexi Corridor between Lanzhou and Dunhuang | Stated as "roughly", consistent with sources 5 and 10 | approximate, flagged as such |

## Absolute expressions audited after drafting

The single unqualified instruction retained is "put the fixed international-departure end last,
without exception" — an editorial recommendation, explicitly framed as Homeground's judgement
rather than as a rule from any authority. Every other categorical statement traces to a named
source above. The body contains no fare, no seat availability, no journey time other than the
attributed and dated 38-minute figure, and no frequency claim.

## Sources deliberately not used

Travel-media Silk Road itineraries, OTA route pages, tour-operator night-count templates and
aggregated map timings all appeared in searching. None was used. The night-allocation table is
Homeground editorial judgement built on the sourced structural facts above, and is labelled as
editorial guidance rather than as an authority's recommendation.
