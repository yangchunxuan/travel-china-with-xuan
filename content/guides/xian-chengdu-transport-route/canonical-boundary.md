# Canonical boundary — xian-chengdu-transport-route

- **topicId:** hg-topic-0315
- **Collection (pillar):** transport-city-pair-routes
- **Base commit:** origin/main@e99e42c71e4e9be8853afdc406dc89caeebda334
- **Boundary written before drafting:** yes, 2026-08-22

## The one search task this page owns

A traveller who already knows they are going between Xi'an and Chengdu, in **either** direction,
needs to choose rail or air using their real accommodation, the exact station or airport terminal,
their luggage, security and check-in cutoffs, the city last mile at both ends, and what happens
next in the itinerary. One canonical owns both directions.

## Slug and task occupancy check

Checked on 2026-08-22 against `origin/main`, every remote ref under `refs/remotes` and every local
branch: no ref contains `content/guides/xian-chengdu-transport-route/`, and no ref contains a
near-synonym directory (`chengdu-xian-*`, `xian-chengdu-*`). **No canonical conflict.**

## Adjacent owners and how the border is drawn

| Adjacent owner | Status | What it keeps | What this page must not take |
| --- | --- | --- | --- |
| `beijing-xian-chengdu-route-order` | published on origin/main | City order and pace across three cities | Any three-city itinerary, night counts or pace advice |
| `beijing-xian-transport-route` | assigned to Ox Alpha | The Beijing–Xi'an leg | Any Beijing-side hub reasoning; not linked because it is unmerged |
| `xian-railway-station-selector` | exists on another worker's branch, not on main | Which Xi'an station for any destination | The general Xi'an station-selection task; this page only names the stations that matter for the Chengdu leg, and does not link the unmerged page |
| `chengdu-shuangliu-or-tianfu-airport` | exists on another worker's branch, not on main | Choosing between the two Chengdu airports as its own decision | The full airport-versus-airport comparison; this page states the consolidation fact only where it changes the rail/air choice, and does not link the unmerged page |
| `china-high-speed-train-first-time-guide` | published on origin/main | Generic high-speed rail procedure | Any generic "how to ride a Chinese train" tutorial |
| `xian-where-to-stay-city-wall-or-dayanta` | published on origin/main | Xi'an accommodation areas | Any recommendation of where to sleep in Xi'an |
| `chengdu-where-to-stay-chunxi-wenshu-kuanzhai` | on another worker's branch, not on main | Chengdu accommodation areas | Any Chengdu area recommendation; not linked |
| `china-separate-flight-tickets-self-transfer-risk` | published on origin/main | Self-transfer risk in general | The general self-transfer explainer; this page warns and links out |
| `china-domestic-flight-fare-bundle-baggage` | published on origin/main | Airline fare bundles and baggage allowances | Airline baggage allowances, fare classes or compensation |

## Explicit exclusions honoured in the draft

- No live fares, seat inventory or timetables. No journey time is presented as current.
- No A→B / B→A duplicate. Every recommendation is written to read correctly in both directions.
- No generic mode-comparison content ("train vs plane in China").
- No Xi'an or Chengdu sightseeing, accommodation or city guide material.
- No airline compensation, delay or refund rules. Rail refund and endorsement rules appear only
  because they change what a traveller should do at the moment a hub decision fails.

## Internal links used

Only same-language pages already merged into `origin/main` are linked, each with `en`, `zh` and
`ko` bodies present: `beijing-xian-chengdu-route-order`, `xian-where-to-stay-city-wall-or-dayanta`,
`china-high-speed-train-first-time-guide`, `why-china-high-speed-stations-are-far-away`,
`chengdu-jiuzhaigou-transport-route`, `china-separate-flight-tickets-self-transfer-risk`,
`china-power-bank-rules-flights-trains`.
