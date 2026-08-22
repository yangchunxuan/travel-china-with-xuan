# Canonical boundary — shanghai-suzhou-transport-route

topicId: hg-topic-0313 · contentId/slug: `shanghai-suzhou-transport-route`

## 1. Solely owned search task

Choosing the Shanghai–Suzhou **station pairing** (either direction) and running the full door-to-door chain — hotel-side station, security/gate budgeting, onboard segment, arrival station and last mile — matched to the traveller's Shanghai base, Suzhou goal (Old City gardens vs Jinji Lake vs onward north), luggage and time of day.

## 2. Merged query intents

- shanghai to suzhou train / 上海到苏州高铁 / 상하이 쑤저우 기차
- suzhou day trip from shanghai / 苏州一日游交通 / 쑤저우 당일치기 교통
- shanghai hongqiao to suzhou
- which suzhou station / 苏州站还是苏州北站 / 쑤저우역 고르기
- shanghai suzhou high speed rail

Both directions are owned by this one canonical; no reverse-direction page may be created.

## 3. Explicitly NOT owned here

| Excluded task | Owner |
|---|---|
| Ranking Shanghai's stations in isolation (hotel/airport/late-arrival choice) | `shanghai-railway-station-selector` (unpublished worker branch — future interlink) |
| Choosing a Suzhou stay area | `suzhou-where-to-stay-old-city-shantang-jinji-lake` (unpublished worker branch — future interlink) |
| Sequencing Shanghai–Suzhou–Hangzhou–Nanjing | `shanghai-suzhou-hangzhou-nanjing-route-order` |
| General first-time high-speed rail mechanics | `china-high-speed-train-first-time-guide` |
| Full Suzhou gardens guide / garden tickets | future Suzhou sightseeing owners |

## 4. Division of labour with neighbours

This page treats the neighbouring owners' domains as inputs (your hotel area → your station) and hands off: "which Shanghai station suits MY hotel in depth" → selector owner; "where to sleep in Suzhou" → stay owner. Only published pages are linked from the body.

## 5. Short explanations delegated back

Garden ticketing, Pingjiang Road walking plans, Jinji Lake attractions and delta multi-city ordering each get at most one sentence here before returning to their owners.

## 6. Why a new canonical instead of updating an old page

The existing delta route-order page owns multi-city sequencing, not bidirectional door-to-door execution for this pair. The unpublished selectors own single-city choices. No current page owns the pairing + last-mile chain as its primary task, so a new canonical is required rather than an update.

## Collection mapping needed from central

Suggested: `transport-city-pair-routes`. Temporary local overlay used for QA only, reverted before commit.
