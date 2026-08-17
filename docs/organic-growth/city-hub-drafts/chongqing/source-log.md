# Source log — Chongqing Destination Hub draft

Status: **DRAFT COMPLETE — CENTRAL REVIEW REQUIRED**
Task: Homeground webpage task 08
Checked at: **2026-08-15**
Proposed canonical: `city-chongqing`
Proposed path: `/destinations/chongqing/` with Chinese and Korean locale variants

## 1. Canonical and administrative decision

- Chongqing is treated as a **provincial-level municipality directly under `country-china`**.
- It is not placed under Sichuan, and no “Chongqing Province” node is proposed.
- `content/entities/core-places.json` was checked on the required baseline. `city-chongqing` is not currently a central entity, so this package marks it `proposed` only in `entity-graph.json` and does not edit the central registry.
- Broad intents such as “Chongqing travel guide,” first-trip choice, how many nights, city-versus-municipality scope, station selection and onward-route role belong to this proposed Destination Hub.
- The draft does not create `/guides/chongqing-travel-guide/` or any locale equivalent.

## 2. Repository inputs reviewed

The draft was prepared against the required `origin/main` baseline commit:

`cc6be75e59155935f321df0334588b52769eb6e4`

The following repository inputs were read before drafting:

- `docs/article-production-lite.md`
- `docs/homeground-search-platform-phase-1-spec.md`, including entity ownership, locale parity and public-link requirements
- `docs/organic-growth/search-map.json`
- `content/entities/core-places.json`
- `app/sitemap.ts`
- generated content inventory and the existing Chongqing guide directories
- metadata, body files and source logs for the four mandatory specialist owners

No registry, Search Map, sitemap, homepage, public route, indexability or generated manifest is modified by this package.

## 3. Existing owner collision review

### `chongqing-upper-lower-city-orientation`

Owns the detailed bank–level–entrance–connection method, vertical public transport, individual connectors and closure-sensitive street navigation. The Hub uses only a four-question orientation framework and sends detailed route logic to this owner.

Repository source log reviewed:

- `content/guides/chongqing-upper-lower-city-orientation/source-log.md`

### `chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba`

Owns the complete comparison among Jiefangbei, Guanyinqiao and Shapingba, including property-level last-mile checks. The Hub assigns broad accommodation tasks, adds Nan’an as a route-dependent family of bases and does not reproduce the owner’s full scorecard.

Repository source log reviewed:

- `content/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/source-log.md`

### `china-tiankeng-sinkholes-explained`

Owns tiankeng terminology, geological distinctions and the managed-access boundary. The Hub decides whether Wulong deserves a day or overnight and does not rewrite the geological article.

Repository source log reviewed:

- `content/guides/china-tiankeng-sinkholes-explained/source-log.md`

### `sichuan-opera-face-changing-with-context`

Owns first-audience choice, repertoire context and the distinction between a named programme and a generic “face-changing show.” The Hub positions a performance within a Chongqing stay but freezes no venue schedule, cast or running order.

Repository source log reviewed:

- `content/guides/sichuan-opera-face-changing-with-context/source-log.md`

No separate three-day Chongqing owner was present on the checked baseline. The Hub therefore owns the broad two-night, three-night and extension decision, but it remains a decision page rather than a day-by-day itinerary.

## 4. Primary official sources

### A. Municipality status, route role and geography

1. Chongqing Municipal Government, English homepage and municipality overview
   https://english.cq.gov.cn/index.html
   https://english.cq.gov.cn/aboutchongqing/overview/
   https://english.cq.gov.cn/aboutchongqing/overview/Geography/

   Used for Chongqing’s status as a municipality directly under the central government, its southwest-China role and the Yangtze–Jialing confluence context. The Hub does not convert municipality-level facts into central-city distances.

### B. Airport and terminal system

2. Chongqing Municipal Commission of Transport, T3B opening, 2025-04-09
   https://jtj.cq.gov.cn/sy_240/bmdt/202504/t20250409_14506497.html

3. Chongqing Municipal Commission of Transport, T3B satellite-operation process, 2025-03-31
   https://jtj.cq.gov.cn/sy_240/bmdt/202503/t20250331_14467078.html

4. Chongqing Municipal Government, passenger-flight move to the T3 system, 2025-11-25
   https://www.cq.gov.cn/ywdt/bmts/202511/t20251125_15186851.html

   Used to correct older guides that still assign routine passenger departures to T2 or treat T3B as an independent landside terminal. Terminal assignment remains dynamic, so the body tells readers to confirm the airline booking record rather than promising a terminal.

### C. Railway stations and current timetable role

5. Chongqing Municipal Commission of Transport, Chongqing East opening and Chongqing East–Qianjiang section, 2025-06-26
   https://jtj.cq.gov.cn/ztzl/cydqscjjq/202506/t20250626_14748304.html

6. Chongqing Municipal Commission of Transport, Line 6 Chongqing East section opening, 2025-06-27
   https://jtj.cq.gov.cn/sy_240/jdtp/202506/t20250627_14753977.html

7. Chongqing Municipal Government, 2026 third-quarter national timetable information
   https://www.cq.gov.cn/ywdt/bmts/202606/t20260630_15788034.html

8. Chongqing Municipal Government, 2026-01-26 timetable adjustment including selected Zhangjiajie West–Chongqing East service
   https://www.cq.gov.cn/ywdt/jrcq/202601/t20260122_15343341_app.html

9. Chongqing Municipal Commission of Transport, current major-station traffic and roles, 2025-08-01
   https://jtj.cq.gov.cn/sy_240/bmdt/202508/t20250801_14869156.html

10. Chongqing Municipal Commission of Transport, Chongqing North, West and Shapingba timetable roles, 2025-04-09
    https://jtj.cq.gov.cn/sy_240/bmdt/202504/t20250409_14506515.html

11. Chongqing Municipal Commission of Transport, Chongqing Station/Caiyuanba reconstruction progress, 2026-03-31
    https://jtj.cq.gov.cn/sy_240/jdtp/202603/t20260331_15580188.html

12. China Railway 12306
    https://www.12306.cn/

   Used to distinguish Chongqing North, Chongqing West, Shapingba and Chongqing East and to identify Chongqing Station at Caiyuanba as a construction project rather than a current passenger alternative. The article does not freeze a train number or promise that a route always uses the same station. Exact-date searches belong to Railway 12306.

### D. Vertical city and current access conditions

13. Chongqing Municipal Government, Chongqing terrain and rail engineering
    https://www.cq.gov.cn/ywdt/jrcq/202111/t20211125_10030692.html

14. Chongqing Municipal Government, Liziba station and integrated building context
    https://www.cq.gov.cn/zjcq/cycq/jplyxl/dsy/dsjp/202409/t20240905_13599583.html

15. Chongqing Municipal Government, phased Liziba works and station-exit closures, 2026-06-13
    https://wap.cq.gov.cn/ywdt/jrcq/202606/t20260613_15751500.html

16. Chongqing Rail Transit service information
    https://www.cqmetro.cn/smbsj.html

   Used only to support the need to check levels, entrances and current connectors. The Hub does not publish exact walking times, permanent lift availability or a universal step-free promise.

### E. Wulong

17. Chongqing Municipal Government, English natural-heritage description of Wulong
    https://english.cq.gov.cn/aboutchongqing/culture/NaturalHeritage/202606/t20260612_15751145.html

18. Chongqing Municipal Government, Wulong official tourism description
    https://admin.cq.gov.cn/zjcq/cycq/zmjd/zqaaaaajjq/202606/t20260604_15729062.html

19. Chongqing Municipal Commission of Transport, Wulong South and the Chongqing East–Qianjiang station set
    https://jtj.cq.gov.cn/sy_240/bmdt/202506/t20250611_14704973.html

20. Chongqing Municipal Government, 2026 Wulong operational-restoration notice
    https://www.cq.gov.cn/ywdt/bmts/202606/t20260608_15737519.html

   Used to establish Wulong as a distant municipality destination, distinguish Wulong South station from a scenic-area gate and demonstrate that weather, shuttles and operating status are dynamic. No fixed ticket, opening hour, shuttle or walking-time claim is made.

### F. Dazu

21. Chongqing Municipal Government, English cultural-heritage overview
    https://english.cq.gov.cn/aboutchongqing/culture/CulturalHeritage/

22. Chongqing Municipal Government, Dazu museum and heritage context
    https://english.cq.gov.cn/aboutchongqing/culture/Museums/202606/t20260613_15751577.html

23. Chongqing Municipal Government, Dazu Rock Carvings visitor context
    https://english.cq.gov.cn/aboutchongqing/travel/5ALevelTouristAttraction/202606/t20260611_15745500.html

24. Chongqing Municipal Commission of Transport, future Dazu Shike station construction and expected 2027 completion
    https://jtj.cq.gov.cn/sy_240/bmdt/202605/t20260511_15667251.html

   Used to distinguish Baodingshan, Beishan and the broader Dazu heritage destination and to prevent the future station from being described as an operating 2026 shortcut. Site opening, conservation work and event arrangements require a fresh official check.

### G. Yangtze cruise and onward routes

25. Chongqing Municipal Government, 2026 Three Gorges cruise market context
    https://admin.cq.gov.cn/ywdt/jrcq/202607/t20260712_15816815.html

26. Chongqing Municipal Government, Yuzhong cruise home-port context, 2026-05-07
    https://www.cq.gov.cn/ywdt/zwhd/qxdt/202605/t20260507_15655466.html

27. Chongqing Municipal Commission of Transport, approved future Qianjiang–Jishou railway, 2026-03-25
    https://jtj.cq.gov.cn/ztzl/cydqscjjq/202603/t20260325_15565995.html

   Used to frame Chongqing as an upper-Yangtze embarkation region and a southwest-to-western-Hunan connector. The Hub deliberately does not promise a fixed Chaotianmen pier and does not present the future Qianjiang–Jishou railway as current infrastructure.

## 5. Dynamic fact controls

The following fact classes are deliberately written as recheck instructions rather than permanent promises:

- airport terminal assignment and airline check-in process;
- railway station role, train number, route and national timetable;
- station entrance, lift, escalator, construction and temporary closure;
- Wulong and Dazu tickets, opening, conservation work, internal transport and weather closure;
- sightseeing-boat and ferry pier, schedule and boarding steps;
- Yangtze cruise operator, vessel, route, assigned pier and boarding time;
- performance venue, cast, programme, surtitles, photography and refund terms.

The body contains no precise urban walking-time estimate. Straight-line map distance is never treated as route distance. A working lift or escalator is never used to infer an end-to-end step-free route.

## 6. Production internal-link audit

Checked on 2026-08-15. The only active internal links in the three body files are the six production pages below, each confirmed as a live HTTP 200 destination for its locale:

| Locale | Guide library | Planning service comparison |
|---|---|---|
| English | `/guides/` | `/china-itinerary-review/` |
| Simplified Chinese | `/zh/guides/` | `/zh/china-itinerary-review/` |
| Korean | `/ko/guides/` | `/ko/china-itinerary-review/` |

The four mandatory owner titles are present in all three bodies but remain plain text with their repository owner IDs. Their exact production deep links were not admitted into the body because a current locale-specific HTTP 200 result was not established during this task. See `internal-links.md` for activation rules.

The proposed `/destinations/chongqing/` paths are not self-linked and are not made public by this draft.

## 7. Locale and editorial review

- English, Simplified Chinese and Korean carry the same decision architecture, tables, physical-demand scenarios, FAQ set and owner handoffs.
- Chinese and Korean are full localized drafts rather than summaries of the English page.
- “8D magic city” appears only as a label the article rejects as insufficient for real orientation.
- Wulong and Dazu are consistently described as distant destinations within Chongqing Municipality, not central-city attractions.
- Chongqing’s municipality data is not mixed with Sichuan provincial data.
- No claim relies on a viral viewpoint list, generic night-view ranking or straight-line map estimate.

## 8. Central review items before publication

1. Confirm or assign the central canonical ID for `city-chongqing` and all proposed child nodes.
2. Re-run exact live checks for the four specialist owner URLs in all three locales and activate only those returning the intended HTTP 200 page.
3. Recheck CKG terminal assignments, the latest Railway 12306 timetable, Chongqing Station construction, Liziba works, Wulong/Dazu openings and the selected cruise product.
4. Select and process licensed real photography according to `image-plan.md`; do not substitute generated documentary or night photography.
5. Integrate the Hub through the central destination-page system without editing the registry, Search Map, sitemap or indexability from this draft branch.
