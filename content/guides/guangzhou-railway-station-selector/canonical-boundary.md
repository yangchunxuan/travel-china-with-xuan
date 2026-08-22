# Canonical boundary — guangzhou-railway-station-selector

Candidate: `transport-20260822-03`

## Owns

- Choice among Guangzhou South, East, Guangzhou, Baiyun and North for the actual dated journey.
- Full-name disambiguation, hotel/onward-chain friction and wrong-station recovery.
- Release-day five-node role and access check.

## Does not own

- Baiyun Airport terminal choice (`guangzhou-baiyun-airport-t2-t3`).
- Guangzhou–Hong Kong or Guangzhou–Macau cross-border execution.
- National boarding workflow or permanent station-direction tables.
- Per-station pages and reverse-direction mirrors.

## Merge rule

All five-station comparison, wrong-Guangzhou-station and hotel-side node questions merge here. Airport and cross-border execution remain with their existing owners.

Do not create reverse-direction mirrors, per-station/per-airport fragments, nationality variants, month variants, late-arrival spin-offs or wrong-node recovery spin-offs.
