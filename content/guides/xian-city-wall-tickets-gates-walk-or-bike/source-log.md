# Source log — Xi'an City Wall tickets, gates, walk or bike

**Draft content complete; integration and rendered review pending.** Researched 2026-09-26. This log documents web evidence and editorial inferences; no ticket was purchased, no mini-program checkout was completed and no phone call was made.

## Official evidence used

| Page | Publisher / publication | Claim used | Boundary |
|---|---|---|---|
| [Scenic-area homepage](http://www.chinaxiancitywall.com/) | Xi'an City Wall operator; page header undated; directly fetched 2026-09-26 | “南门 8:00—22:00”; service telephone +86-29-87272792 | Only South Gate is named. The linked [detailed-hours page](http://www.chinaxiancitywall.com/detail.php?id=61) returned HTTP 200 with zero bytes on 2026-09-26; no other gate or last-entry time can be recovered from it. The site currently works over HTTP; HTTPS failed in this check. |
| [Entry-method notice](https://www.sxdaily.com.cn/2026-07/01/content_20049276.html) | Scenic-area statement issued 2026-06-30, reproduced by Shaanxi Daily 2026-07-01 with explicit “来源：西安城墙” credit | Operator-listed “西安城墙景区” Douyin mini-program, Meituan and staffed windows; foreign visitors may purchase at window; online purchasers exchange the document entered at booking for a paper pass; purchase QR entry stopped; face-verification alternative may be requested at ticket office | The host is a provincial newspaper, not the operator's own domain. The text is presented as the operator's notice, but its first-party URL was not located. It gives neither a universal booking-release window nor refund rules, and does not certify foreign-passport input for every online channel. |
| [Standard ticket price reply](https://qjxq.xa.gov.cn/zwgk/ndzdxxgk/jytabl/1958091978013503489.html) | Qujiang New District Management Committee, signed 2025-08-14, published 2025-08-16 | Government-set standard full fare CNY 54 and half fare CNY 27 | The reply does not specify all concession eligibility or special-event products. Recheck actual selected ticket before travel. |
| [Access-point report](https://qjxq.xa.gov.cn/xwzx/xwdt/1949774484239577090.html) | Qujiang New District Management Committee, published 2025-07-28 | Seventeen listed ascent/descent points; choosing by route is appropriate | A [2026-07-20 official reply](https://qjxq.xa.gov.cn/zwgk/ndzdxxgk/jytabl/2079470382543396866.html) still says 17. Neither source supplies a current gate-by-gate timetable. The list is used for route choice, not proof of ticket-window or cycling-rental availability at each gate. |
| [2026 scenic-area response](https://qjxq.xa.gov.cn/zwgk/ndzdxxgk/jytabl/2079470382543396866.html) | Qujiang New District Management Committee, dated 2026-07-20 | Bicycle riding is a scenic-area experience; cycling AR glasses and a cycling service-system trial are mentioned | Does not verify bicycle rent, price, deposit, rental hours, return points, suitable ages or visitor rules. |
| [Wall-length report](https://qjxq.xa.gov.cn/xwzx/xwdt/2032394805232328706.html) | Qujiang New District Management Committee, published 2026-03-13 | Wall circumference 13.74 km | This is route scale, not a promised walking or cycling duration. |
| [Overseas-card report](https://qjxq.xa.gov.cn/xwzx/xwdt/2097259847898689538.html) | Qujiang New District Management Committee, published 2026-09-08 | Nine scenic-area ticket windows support overseas bank cards | Windows and networks are unnamed; do not promise card acceptance at a specific gate. An August government article used broader wording, so the September count is treated as the more precise dated statement. |

## Editorial judgments, kept distinct from official rules

- “Start at Yongning” is a first-visit planning anchor because South Gate hours are listed by the operator, not an official best-gate ranking. Pick the gate based on the next stop and its actual opening hours.
- A flexible 60–90-minute block for a short walk is Homeground's scheduling allowance, not an official route duration. The article avoids promising how long a full circuit takes.
- Separating a short walk from a full-circuit ambition follows the government's 13.74 km scale. A named gate pair, rental location, night lighting or show is not promised.
- The published five-day Xi'an product page identifies City Wall on Day 2 and Terracotta Warriors on Day 3. It includes basic admissions for listed adult stops but does not establish that bicycle rental is included. The page therefore links the route without changing product inclusion language.

## Claims deliberately withheld

- Current hours and last entry for the other 16 access points, seasonal tables, festival exceptions and 24-hour exits.
- Mandatory advance reservation, a seven-day ticket-release window, the official WeChat mini-program as the sole sales channel, and “all ticket windows are closed.” The 2026 notice directly supports window sales; older holiday material is not current general policy.
- Which online platforms accept a foreign passport; passport-specific field behavior; direct QR entry for foreign visitors; exact alternative to face verification.
- Bike rental price (including the widely repeated CNY 45), deposit, duration, locations, last rental, one-way return, tandem/child bike rules; cart/buggy availability and price.
- Free-entry group eligibility, monthly free-day conditions, night performance/light timing and refunds.

## Source and image QA before release

1. Integrating owner should confirm the current South Gate header and live selected ticket for the intended travel-date framing, and test whether the operator notice has a new first-party URL. Check all dynamic entry details in EN/ZH/KO together.
2. Local check on 2026-09-26: all three bodies passed `assertStructuredPageBody`, matched the same 17-block order and passed a targeted TypeScript check; JSON parsed; the reused hero measured 1600 × 1000 and matched the provenance SHA-256. Destination and tour targets were found in the repository. The integrating owner still needs to generate the shared registry, validate its output, and inspect rendered desktop/mobile tables and image loading.
3. A whole-repository TypeScript check did not pass because four existing registry references to `xiamen-tulou-quanzhou-six-day-route` and `yangtze-cruise-fit-china-itinerary` are not in the current generated `GuideId` union. No error pointed to this new guide. The integrating owner should rerun that check after the shared registry is synchronized.
4. If a time-specific ride, late entry or specific gate becomes part of a sold itinerary, verify it directly with the scenic area for that date and record the result before changing the public copy.

Image identity and reuse evidence are in [image-plan.md](image-plan.md) and the repository's `docs/homeground-photo-provenance.md`.
