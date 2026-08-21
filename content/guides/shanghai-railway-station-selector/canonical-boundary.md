# Canonical boundary — shanghai-railway-station-selector

Candidate: `transport-20260822-04`

## Owns

- Choice among Shanghai, Hongqiao, South and Songjiang for the real journey.
- Rail–airport handoff at Hongqiao only as part of station choice.
- Hotel-side friction, late arrival and wrong-station recovery.

## Does not own

- PVG versus SHA airport choice (`shanghai-pudong-or-hongqiao-airport`).
- Shanghai–Hangzhou corridor execution (`shanghai-hangzhou-transport-route`).
- Hotel-area choice, per-station pages or permanent timetables.

## Merge rule

Four-station choice, wrong-Shanghai-station and Hongqiao rail-handoff queries merge here. Airport choice and specific city-pair travel stay with their current owners.

Do not create reverse-direction mirrors, per-station/per-airport fragments, nationality variants, month variants, late-arrival spin-offs or wrong-node recovery spin-offs.
