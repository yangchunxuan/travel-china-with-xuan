# Canonical boundary — xian-railway-station-selector

Candidate: `transport-20260822-01`

## Owns

- Choice among Xi'an, Xi'an North and Xi'an East when they are relevant to the real dated search.
- Exact Chinese station-name checks, hotel-side transfer friction, luggage/late-arrival handling and wrong-station recovery.
- A release-week fact gate for Xi'an East and current station access.

## Does not own

- National 12306 booking, passport, security and boarding workflow (`china-high-speed-train-first-time-guide`).
- City Wall versus Dayanta stay choice (`xian-where-to-stay-city-wall-or-dayanta`).
- Terracotta Warriors gate, ticket and attraction-side transfer (`terracotta-warriors-without-tour`).
- Permanent timetables, fares, route-direction tables or per-station pages.

## Merge rule

Queries whose controlling task is ‘which Xi'an passenger station is on my real ticket or best completes my hotel/next-leg chain?’ merge here. Attraction execution, stay choice and national rail process remain with their current owners.

Do not create reverse-direction mirrors, per-station/per-airport fragments, nationality variants, month variants, late-arrival spin-offs or wrong-node recovery spin-offs.
