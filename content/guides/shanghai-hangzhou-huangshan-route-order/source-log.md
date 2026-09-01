# Source log — Shanghai, Hangzhou and Huangshan route order

Status: `COPY READY — CENTRAL COLLECTION ASSIGNMENT AND DOCUMENTARY ASSETS NEEDED`

Checked at: 2026-09-01 (Asia/Shanghai)

## Search and demand evidence

- Google queries reviewed: `Shanghai Hangzhou Huangshan itinerary order`, `Can Huangshan be a day trip from Hangzhou`, `Should I stay on Huangshan mountain or in Tangkou itinerary`, and related route-order searches.
- The current result set is dominated by fixed four-, six-, seven- and nine-day tours, copied ride durations and day-by-day templates. It rarely distinguishes Huangshan North, a road transfer, the booked gate, internal scenic transport and the mountain base before declaring the route easy.
- Current traveller questions include a [one-week Shanghai/Hangzhou plan that treats Huangshan as a day trip](https://www.reddit.com/r/chinatravel/comments/1pst4k1/itinerary_check_for_march_trip_shhzbj_too_rushed/), an [East China route asking whether three Huangshan nights and the rail order work](https://www.reddit.com/r/travelchina/comments/1s3o212/itinerary_check_eastern_china_nanjing_hangzhou/), and a [two-day Huangshan realism question](https://www.reddit.com/r/travelchina/comments/1vfhm28/title_is_this_2day_huangshan_itinerary_realistic/). Forums establish the decision task only; they do not support transport, access or weather facts.

## Claim ledger

| Claim | Layer | Source | Checked | Boundary |
|---|---|---|---|---|
| Rail options and stations must be searched for the actual date and ticket | current transport | https://www.12306.cn/en/ and https://www.12306.cn/en/faq.html | 2026-09-01 | No direct train, duration, fare, inventory or permanent station is copied |
| Shanghai's airports and multiple railway stations are different gateway nodes | current gateway | https://www.shairport.com/flights/index.html and https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html | 2026-09-01 | No flight, terminal transfer time or operating hour is promised |
| Hangzhou airport is a separately verifiable gateway | current gateway | https://www.hzairport.com/En/flight/index.html | 2026-09-01 | Does not prove a useful international flight exists for a reader's dates |
| West Lake is a cultural landscape of lake, hills, causeways, islands, temples, pagodas and gardens | heritage geography | https://whc.unesco.org/en/list/1334/ | 2026-09-01 | Significance does not prescribe a number of nights |
| Mount Huangshan is a large mixed World Heritage mountain landscape | heritage geography | https://whc.unesco.org/en/list/547/ | 2026-09-01 | UNESCO status does not guarantee weather, views, access or route fit |
| Huangshan North and the scenic gates require an additional road-transport decision | current destination transport | https://hsgwh.huangshan.gov.cn/xwzx/tzgg/9308852.html | 2026-09-01 | Published route/price details are not stored as evergreen values |
| Scenic transfer continues beyond a gateway and is updated by official channels | current scenic transport | https://hsgwh.huangshan.gov.cn/lyfw/lyfw/jqhc/9197913.html | 2026-09-01 | No shuttle, cableway or walking alternative is guaranteed |
| East Gate and East Sea cableway opened in June 2026, making old three-gate copy stale | current access | https://www.huangshan.gov.cn/zwgk/public/6615714/12097855.html | 2026-09-01 | Evergreen copy says multiple gates and requires the current booking direction |
| Weather, maintenance and safety notices can close or alter parts of the chain | current operations | https://hsgwh.huangshan.gov.cn/xwzx/tzgg/index.html and https://hsgwh.huangshan.gov.cn/xwzx/qxxx/index.html | 2026-09-01 | No forecast, sunrise, cloud sea or availability promise |

## Editorial synthesis

- The gateway ticket and the Huangshan access/exit block are fixed before route direction.
- Huangshan North arrival is not mountain arrival; the named rail station, road handoff, current gate, scenic transfer and cableway/footpath are separate dependencies.
- Hangzhou earns hinge status only with a protected local purpose. If it is merely a rail break, it is the first candidate for removal or a no-hotel-change pass-through.
- A Shanghai round trip needs a visible return and a city buffer before the international departure; mountain descent is not an airport connection.

## Prohibited claims

- No universal direction, night count, day trip, exact train, road duration, fare or service frequency.
- No guaranteed gate, cableway, path, summit room, sunrise, cloud sea or mountain access.
- No full Shanghai, Hangzhou or Huangshan itinerary.
- No duplication of the Shanghai–Hangzhou station-pair owner or Huangshan-base owner.

## Update triggers

- Airline or airport gateway change.
- 12306 service/station or passport-process change.
- Huangshan gate, reservation, road-transfer, scenic shuttle, cableway, path, weather or lodging notice.
- Official annual holiday calendar.

## QA record

- Trilingual structure: PASS — 31 blocks, 9 H2 headings, 14 visible source items and 5 internal links per locale; block IDs/types/order and table/list/comparison shapes are identical.
- Locale links: PASS — all Chinese and Korean internal links retain `/zh/` and `/ko/`; all five guide/destination targets exist.
- Metadata JSON, guide generation/check, content manifest check, TypeScript, font coverage, planning-scope lines and `git diff --check`: PASS on 2026-09-01.
- Image checks: PASS — original hero and two licensed explanatory figures are 1600 × 1000; all three SHA-256 values match this image plan; source-file and direct-licence links are visible in all locales.
- Blind traveller review: PASS after adding a concrete reverse-route traveller trace and clarifying the Korean turn-back/descent criterion; P1 0, P2 0.
- SEO/technical adversarial review: PASS after correcting the November 2025 transport-notice date and adding direct CC BY 3.0 / CC BY-SA 4.0 links; P1 0, P2 0, P3 0.
- Full `npm run build`: prebuild, compilation and type validation PASS; page-data collection stops at the existing central integration gate because `beijing-datong-pingyao-xian-route-order` has no reviewed search collection assignment. This article does not modify the shared assignment map.
