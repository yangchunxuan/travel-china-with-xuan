# Source log — Beijing, Xi'an and Shanghai route order

Status: `COPY READY — ASSETS NEED CENTRAL REVIEW`

Checked at: 2026-09-01 (Asia/Shanghai)

Canonical owner: `/guides/beijing-xian-shanghai-route-order/`

## Search and demand evidence

- Google query reviewed: `Beijing Xi'an Shanghai route order itinerary`.
- Roughly twelve first-page result blocks were inspected. The visible set was dominated by tour operators and fixed seven- to ten-day itineraries; the recurring answer pattern was a schedule, not a gateway/usable-day decision.
- Current traveller discussions reviewed:
  - https://www.reddit.com/r/travelchina/comments/1vt3vyq/itinerary_for_a_first_trip_to_china_in_14_nights/
  - https://www.reddit.com/r/chinatravel/comments/1vpbgiw/how_is_my_china_14_days_itinerary_is_it_doable/
  - https://www.reddit.com/r/travelchina/comments/1qrz0g9/3week_itinerary_china_2026_shanghai_beijing/
- Forum evidence is used only to establish the planning questions. It is not a source for transport, entry, opening or booking facts.

## Claim ledger

| Claim | Layer | Source | Checked at | Boundary |
|---|---|---|---|---|
| Dated rail options and exact stations must be queried by date | current operating data | https://www.12306.cn/en/left-ticket.html | 2026-09-01 | No train number, duration, fare, seat or inventory is stored |
| Valid foreign passports are accepted railway identity documents under the current English FAQ | current passenger process | https://www.12306.cn/en/faq.html | 2026-09-01 | Does not guarantee account verification, payment, availability or boarding |
| Beijing has multiple major rail stations | transport infrastructure | https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202005/t20200518_1900945.html | 2026-09-01 | The page does not assume which station a future train uses |
| Beijing's two major airport gateways are Capital and Daxing | transport infrastructure | https://english.beijing.gov.cn/consuminginbeijing/wheretobuy/airports/ | 2026-09-01 | Airline, route and terminal remain dated fields |
| Shanghai has multiple major and smaller rail stations and tells passengers to double-check the station | transport infrastructure | https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html | 2026-09-01 | “Shanghai” never means Hongqiao by default |
| Shanghai uses Pudong and Hongqiao airports with different operating roles | transport infrastructure/current guidance | https://english.shanghai.gov.cn/en-Individuals-Transportation-Airplane/20260813/7366238930024ac8b22e5adf82217bd8.html | 2026-09-01 | No airline, route, terminal, time or fare is promised |
| Xi'andong began operating on 30 June 2026 | dated infrastructure fact | https://en.xa.gov.cn/MediaCenter/News/2072253459180654594.html | 2026-09-01 | Does not mean the traveller's service uses Xi'andong |
| Palace Museum normally closes Monday except national holidays, uses advance booking and can issue temporary notices | current venue rule | https://intl.dpm.org.cn/visit.html | 2026-09-01 | No future date or inventory is guaranteed |
| The mausoleum-site museum uses real-name advance purchase, passport ID and time-slot entry | current venue rule | https://www.bmy.com.cn/jingtai/bmyweb/ticketing.html?pubDate=20260324 | 2026-09-01 | No same-day availability, opening time or reservation window is promised |
| Shanghai Museum branches can have different closure and reservation rules | current venue rule | https://www.shanghaimuseum.net/mu/frontend/pg/m/en/open-info and https://www.shanghaimuseum.cn/mu/frontend/pg/en/service/visit-east | 2026-09-01 | The traveller must name the branch and date |

## Homeground editorial judgments

- The two coherent directions are Beijing → Xi'an → Shanghai and its reverse when the international gateways sit at opposite ends.
- Every arrival, departure and hotel-to-hotel move starts at zero sightseeing blocks; a flexible block is earned only after the dated door-to-door chain is verified.
- A city earns protected time through a distinct priority, not equal allocation.
- A same-gateway return, lower-energy pace or fixed-booking conflict can make one city the responsible cut.

These are planning methods, not operator promises, punctuality claims or a public Route Reality calculation.

## Prohibited claims

- No fastest train, average delay, guaranteed door-to-door duration, fare or inventory.
- No statement that a particular station, airport or terminal serves every traveller.
- No universal night allocation or complete itinerary.
- No claim that open-jaw is always cheaper or always better.
- No future venue ticket availability.

## Update triggers

- 12306 identity, station-search or passenger-process change.
- Major Beijing, Xi'an or Shanghai hub opening, closure or reassignment.
- Palace Museum, mausoleum-site museum or named Shanghai branch reservation/closure change.
- Published public-holiday calendar or temporary operating notice that materially alters the route-decision example.

## Draft QA — 2026-09-01

- Traveller blind review: PASS; no P1, P2 or P3 finding.
- SEO/technical adversarial review: initial P2 found unlocalized Chinese and Korean internal-link targets; corrected to `/zh/` and `/ko/`, then focused re-review PASS.
- Reviewer P3 retained for central awareness: the decision architecture is intentionally related to other route-order guides, although the named-city evidence and answer are independent. Future sibling pages in this batch use different primary structures.
- EN/ZH/KO structured-block parity: 29 blocks; IDs, types, table shapes, comparison columns and list counts match.
- `npm run guide:generate`: PASS.
- `npm run typecheck`: PASS before the localized-link-only correction; the final check is recorded in the article commit workflow.
- `npm run build`: genuinely attempted. Font coverage and planning-scope checks passed after replacing one unsupported Chinese glyph. The build then stopped because the new guide has no reviewed entry in the central search-collection assignment file. This branch deliberately does not edit that shared registry; central integration must assign `plan-trip-length-city-order` before claiming a full build PASS.
