# Canonical boundary — chengdu-chongqing-station-pair

Candidate: `transport-20260822-07`

## Owns

- Bidirectional Chengdu–Chongqing station-pair choice.
- Hotel-to-hotel chain, luggage and corridor-specific late-arrival fallback.
- Referral to current node, hotel-area and national ticket owners.

## Does not own

- Permanent station roles or train tables.
- National ticket buying and boarding mechanics.
- Choice of Chengdu or Chongqing hotel district.
- Generic Chongqing station selection or wrong-station recovery, which remain with `chongqing-railway-station-selector`.
- Three-city order, night allocation or which city to drop, which remain with `chengdu-chongqing-zhangjiajie-route-order`.
- Chongqing–Zhangjiajie corridor execution, which remains with `chongqing-zhangjiajie-transport-route`.
- Reverse-direction or per-pair spin-off pages.

## Merge rule

Chengdu-to-Chongqing and Chongqing-to-Chengdu station-pair queries merge here. Generic station identity and recovery, hotel-area choice, regional route order, the Chongqing–Zhangjiajie corridor and national rail procedure remain with their owners.

Do not create reverse-direction mirrors, per-station/per-airport fragments, nationality variants, month variants, late-arrival spin-offs or wrong-node recovery spin-offs.
