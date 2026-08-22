# Canonical boundary — beijing-xian-transport-route

topicId: hg-topic-0314 · slug: `beijing-xian-transport-route`

## 1. Solely owned task
Choosing high-speed rail versus flight for Beijing–Xi'an **door to door in both directions**: which Beijing gateway matches the hotel, what Xi'an North and Xianyang airport really cost as last miles, and how luggage, security and disruption recovery tilt a near-tie.

## 2. Merged intents
- beijing to xian train or flight / 北京到西安高铁还是飞机 / 베이징 시안 기차 비행기
- beijing xian high speed rail / 北京西站西安北站 / 베이징서역 고속철도
- xian north station vs airport / 西安北站到市区 / 시안베이역 시내 이동
- 咸阳机场到市区 / 시엔양공항 시내

## 3. NOT owned
| Task | Owner |
|---|---|
| Sequencing Beijing–Xi'an–Chengdu | `beijing-xian-chengdu-route-order` (published) |
| Choosing among Beijing rail stations in depth | `which-beijing-railway-station` (unpublished worker branch — future interlink only) |
| Xi'an station selection deep-dive | `xian-railway-station-selector` (unpublished — future interlink only) |
| Capital vs Daxing airport choice | `beijing-capital-or-daxing-airport` (unpublished — future interlink only) |
| General rail mechanics | `china-high-speed-train-first-time-guide` |
| Flight fare bundles | `china-domestic-flight-fare-bundle-baggage` |

## 4. Division of labour
Route-order owner decides WHETHER/WHEN this leg happens; this page owns HOW (mode + gateways + edges). Unpublished neighbours are never linked from bodies; handoff records future interlinks.

## 5. Delegated back after one sentence
Fare-bundle mechanics, passport-as-ticket mechanics, Chengdu continuation beyond the junction example.

## 6. Why new canonical
No existing page owns the mode decision for this pair; the route-order page explicitly does not.

## Collection mapping for central
Suggested: `transport-city-pair-routes`. Local QA overlay used and reverted.
