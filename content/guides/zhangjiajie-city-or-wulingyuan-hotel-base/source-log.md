# Source and editorial audit — zhangjiajie-city-or-wulingyuan-hotel-base

Status: `COPY READY — ASSETS NEEDED — CENTRAL WILL EDIT`

- Topic ID: `hg-topic-0530`
- Content pool: `stay-location-trip-fit`
- Base: `origin/main@530c1510e07ee649559be21b500b6f1967bf882c`
- Research and dynamic-fact review: `2026-08-13` (Asia/Shanghai)
- Primary intent: place nights after the traveller has fixed the Zhangjiajie sight order.
- Excludes: itinerary-day design, real-time hotel prices, hotel rankings and permanent bus timetables.

## Canonical audit

The exact slug was absent from `origin/main`, current `origin/article/*`, `origin/codex/*` heads and open article PR content on 2026-08-13. There is meaningful overlap with the live `zhangjiajie-itinerary` FAQ, which already gives a short Wulingyuan-versus-city answer. This page is therefore narrowed to the detailed **confirmed sight order → each night's base → one-move cost → disruption recovery** task. It delegates day-count and sight-order design back to the itinerary owner. Central should later shorten that FAQ to a summary and link if this owner is approved.

Adjacent owners retained:

- `zhangjiajie-itinerary`: how to order the sights and days.
- `beijing-zhangjiajie-shanghai-transport`: intercity mode and arrival-point planning.
- `zhangjiajie-older-travellers`: walking, rest and mobility fit.
- `china-hotel-near-metro`: nationwide last-mile evaluation; no Zhangjiajie copy is created here.

## Search and traveller-question gap

Google result pages and current forum discussions were checked to learn the task, not to support operations. Many results stop at “Wulingyuan for the park; downtown for Tianmen Mountain.” The missing decision layer is when one hotel move replaces repeated cross-area journeys, how the first and last nights change the answer, why an exact ticket gate and exact railway station matter, and how to recover when a train or scenic operation changes. No search-volume, CPC or difficulty claim is made.

## Official and first-party ledger

1. Hunan Provincial Department of Culture and Tourism, Tianmen Mountain transport reference: <https://whhlyt.hunan.gov.cn/whhlyt/wldh2022jt/202208/t20220823_27716284.html>
   - Establishes the city cableway lower-station node and city-side orientation.
   - Limit: published 2022; route and shuttle details require a travel-date check.
2. Hunan Provincial Department of Transport, city–scenic passenger routes: <https://jtt.hunan.gov.cn/xxgk/gzdt/szdt1/202506/t20250610_33706126.html>
   - Establishes an official city-to-scenic transport network covering the forest park, Wulingyuan and major arrival hubs.
   - Limit: existence of a route is not a schedule promise.
3. Hunan Provincial Department of Transport, East Gate–South Gate ring bus: <https://jtt.hunan.gov.cn/jtt/xxgk/gzdt/szdt1/202506/t20250610_33706127.html>
   - Supports the distinction and connection between the Wulingyuan East Gate and Forest Park South Gate.
   - Limit: current frequency, fare and stop must be checked.
4. China Railway 12306: <https://www.12306.cn/>
   - First-party dated ticket and exact station check.
   - Limit: no sample train is turned into a permanent timetable.

The two Zhangjiajie UNESCO Global Geopark sample-route URLs previously shown here and on the public page were removed on 2026-08-23 because normal Chrome connections failed with `ERR_SSL_VERSION_OR_CIPHER_MISMATCH`. No unverified mirror was substituted. The visible copy now states that the base recommendations are Homeground planning judgments; the remaining official sources support only the named geography and transport relationships.

## Dynamic review before central publication

Recheck the official scenic notice, ticket entrance, roads/cableways, any required reservation, the exact railway station on the issued ticket, current transport for the required time, and each property's Chinese name, reception, baggage and cancellation response. Do not convert the 2022 Tianmen reference or 2025 bus reports into a current timetable.

## Independent information-object audit

The three locale bodies carry the same 23 block IDs/types. The editorial audit identifies 42 useful objects: six input steps, five base-matrix decisions, the multiple-gate warning, four edge-night decisions, three Scenario A comparisons, Scenario B, seven move-cost items, a move threshold, four disruption recoveries, eight booking checks and the dynamic-fact boundary. This exceeds the 22-object baseline without counting headings, links or sources.

## Locale and link audit

English, Chinese and Korean are complete, natural editions with exact block-ID/type parity. Each links to the localized `/stay/` parent plus three live guide owners: `zhangjiajie-itinerary`, `beijing-zhangjiajie-shanghai-transport` and `zhangjiajie-older-travellers`.

## Editorial distinctions

Official facts identify route nodes and transport systems. “Move only if it buys a meaningful morning, removes at least two likely cross-area journeys or protects a departure” is explicitly Homeground planning judgment. No specific property, fare, room availability or travel-time promise is made.

## Live-source remediation re-review — 2026-08-23

- Removed the two TLS-incompatible geopark route pages from all three visible source lists and structured-data citations. Reopened the Hunan transport references and retained their narrow boundary: they support named gateways and documented transport links, not an official lodging recommendation, permanent timetable, fare or transfer duration.
- Reconfirmed the canonical boundary: this page selects a lodging base from an already chosen attraction order. It does not replace the itinerary, ticketing, live transport or older-traveller guides.
- EN/ZH/KO structure and source counts remain aligned. The visible dynamic-review paragraph and surviving source review dates now record 2026-08-23.
