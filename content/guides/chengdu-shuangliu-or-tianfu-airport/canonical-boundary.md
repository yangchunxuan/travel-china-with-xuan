# Canonical boundary — chengdu-shuangliu-or-tianfu-airport

Candidate: `transport-20260822-02`

## Owns

- Pre-book choice between CTU and TFU by the complete traveller chain.
- Post-book code and terminal confirmation, first/last-night interaction and wrong-airport recovery.
- Airport-to-hotel or airport-to-rail handoff with luggage and late-arrival constraints.

## Does not own

- Permanent airline, terminal, route, fare or coach lists.
- Chengdu–Jiuzhaigou mode/base decision (`chengdu-jiuzhaigou-transport-route`).
- Panda-site choice (`chengdu-panda-base-or-dujiangyan-panda-valley`).
- China-wide last-night policy (`china-last-night-before-international-flight`).

## Merge rule

Queries asking ‘CTU or TFU for my real flight, hotel and next connection?’ or ‘I am at the wrong Chengdu airport’ merge here. Specific onward corridors and attraction decisions remain with their current owners.

Do not create reverse-direction mirrors, per-station/per-airport fragments, nationality variants, month variants, late-arrival spin-offs or wrong-node recovery spin-offs.
