# Canonical boundary — chongqing-zhangjiajie-transport-route

topicId: hg-topic-0322 · slug: `chongqing-zhangjiajie-transport-route`

## 1. Solely owned task
The bidirectional Chongqing–Zhangjiajie corridor execution chain: use the exact Chongqing node printed on the live ticket, travel through Zhangjiajie West, and complete the final leg to an exact hotel address that was selected before travel. It includes luggage constraints, late arrival, missed handoffs and interruption recovery.

For Zhangjiajie→Chongqing, this same page owns the reverse query, but it rebuilds the live train and ground legs independently. Canonical ownership is bidirectional; operations are not claimed to be symmetric.

## 2. Merged intents
- chongqing to zhangjiajie train / 重庆到张家界高铁 / 충칭 장자제 기차
- zhangjiajie to chongqing train / 张家界到重庆高铁 / 장자제 충칭 기차
- chongqing zhangjiajie transport / 重庆张家界交通 / 충칭 장자제 이동
- zhangjiajie west station hotel transfer / 张家界西站酒店接驳 / 장자제서역 호텔 이동

## 3. NOT owned
| Task | Owner |
|---|---|
| Comparing or choosing among Chongqing railway stations | `chongqing-railway-station-selector` |
| Choosing Zhangjiajie city versus Wulingyuan as the overnight base | `zhangjiajie-city-or-wulingyuan-hotel-base` |
| Passport booking, station entry, security, gates, boarding and nationwide railway rules | `china-high-speed-train-first-time-guide` |
| Park tickets, entrances or sightseeing order | `zhangjiajie-national-forest-park-tickets-and-entrances` and other park owners |
| Changsha, Fenghuang or other onward route design | their city-pair and route-order owners |

## 4. Division of labour
The base owner chooses the district and property. The station selector explains Chongqing station geography. The nationwide rail owner explains the common passenger process. This page starts only after those decisions, verifies the ticketed node for the actual date and direction, and ends at the exact booked address.

## 5. Dynamic evidence boundary
Current trains, stations served, departure times, fares and railway handling come from the live 12306 query. Hotel check-in and the final road leg require property-specific and on-the-day confirmation. Dated government or railway notices may demonstrate that service patterns change, but never stand in for the current booking result.

## 6. Why one canonical owner
Both travel directions share the same failure-recovery task and should not become mirror pages. The page forbids reverse-operation assumptions, fixed timetable fragments and base-selection arguments, preventing overlap with the three linked owners.

## 7. Collection mapping
`transport-city-pair-routes`
