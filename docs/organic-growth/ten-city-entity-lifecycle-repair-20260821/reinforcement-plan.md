# Ten-city reinforcement plan

Checked: **2026-08-21**

This plan starts from seven published Hubs. It does not use quality debt to
reclassify Hangzhou or Zhangjiajie, and it does not use a city entity or a
five-owner count to publish Chongqing, Guilin or Shenzhen.

## P0 — lock the seven-city public contract

1. Keep the exact runtime set: Beijing, Shanghai, Xi'an, Chengdu, Guangzhou,
   Hangzhou and Zhangjiajie.
2. Keep Hangzhou and Zhangjiajie publication dates at 2026-08-20.
3. Require 21 destination exports, including the six Hangzhou/Zhangjiajie
   locale routes, and require all 21 in the sitemap without `noindex`.
4. Require the nine possible Chongqing/Guilin/Shenzhen destination exports to
   be absent and outside the sitemap.
5. Treat the 649-loc sitemap as the PR #74 release snapshot. Do not freeze 649
   as a permanent product invariant after future legitimate releases.

## P1 — integrate the new entity mapping policy deliberately

Employee 8's branch is not merged. Central should integrate
`a22beed2440be800513a0f9db588364b6eda3d91` independently, resolve conflicts
against this branch, and then:

1. import or call `resolveGuideEntities()` rather than grepping an adapter;
2. run the non-strict destination coverage ledger;
3. review every `usedCountryFallback` and `unmappedTokens` result;
4. confirm all ten city tokens resolve to canonical `city-*` entities;
5. keep blocked City Hubs outside runtime even though their guide mappings
   exist.

The strict coverage mode should not become a gate until central has reviewed
and assigned all remaining non-city token debt.

## P2 — strengthen live Hubs without withdrawing them

### Hangzhou

- create a bounded stay-area owner;
- add location-accurate West Lake, western-hills, Grand Canal, Liangzhu and
  railway-gateway figures with complete rights records;
- add contextual return links from its seven support owners;
- preserve the broad day-trip-versus-stay canonical boundary.

### Zhangjiajie

- create the missing independent Hub source and asset ledger;
- add figures for city/Wulingyuan base geography, park entrances, the separate
  Tianmen system, a gateway and the Grand Canyon;
- add return links from its ten support owners;
- keep the generic peak-forest Hero from making gate, plateau or route claims.

### Existing five

- Beijing: preserve the unidentified Great Wall section limitation.
- Shanghai: add a real ticket/visit owner when the task is distinct.
- Xi'an: add a gateway selector only when it does not repeat the Hub.
- Chengdu: add stay and gateway depth; identify or replace the Jinjiang bridge
  image.
- Guangzhou: add a stay-area owner and railway-station selector before owner
  consolidation reduces its six-owner margin.

## P3 — reconcile Chongqing before any runtime branch

Chongqing now has five current-main support owners, including the railway
station selector from PR #74. It still remains docs-only / blocked because the
older Hub package connects only four, has no production Hub asset set and has
not completed reciprocal link or runtime QA.

Required sequence:

1. update the internal graph to include the station owner;
2. confirm all five owners in EN/ZH/KO and assign exact canonical boundaries;
3. ingest a real Hero and explanatory vertical-city, outer-branch and gateway
   images;
4. prepare reciprocal links without activating a nonexistent Hub URL;
5. complete current official source review;
6. request a separate central publication decision and runtime branch.

Do not attach Chongqing to Sichuan. It remains a direct-administered
municipality under China.

## P4 — close Guilin and Shenzhen owner gates

### Guilin

Current qualified owners: two. Prioritise at least three independent pages:

1. airport and railway gateway selector;
2. Yangshuo town versus Yulong countryside stay-base decision;
3. Longji day trip versus overnight;
4. Li River cruise versus Yulong rafting product boundary.

Then obtain a precisely located Li River Hero and distinct city, Yangshuo,
Xingping, water-product and Longji evidence. Never present Yangshuo or Longji
as a downtown Guilin neighbourhood.

### Shenzhen

Current qualified owners: four. Prioritise the airport-and-railway-station
selector, explicitly separating stations from checkpoints. Then verify all
four existing owners in three locales, migrate legacy `place-shenzhen`
references through employee 8's policy, and ingest the planned real asset set.

## P5 — close the administrative source-snapshot debt

The province and city records now have correct parent IDs, but their
`sourceIds` remain empty. A later content-system change should:

1. choose current official administrative sources;
2. retrieve and hash immutable snapshots;
3. create validated `source-snapshot` envelopes;
4. attach those IDs to the country, province and city entities;
5. run manifest reference validation.

Until then, the parent graph is a reviewed correction with an explicit evidence
debt, not a fully source-materialised knowledge graph.

## Sequence

| Order | Work | Why |
|---:|---|---|
| 1 | Seven-Hub export regression | Prevents another accidental withdrawal |
| 2 | Employee 8 mapping-policy integration | Establishes the durable mapping owner |
| 3 | Hangzhou/Zhangjiajie links and assets | Improves live pages without lifecycle churn |
| 4 | Chongqing reconciliation | Closest blocked Hub to a future release review |
| 5 | Shenzhen fifth owner | Closes the owner-count gap |
| 6 | Guilin owner cluster | Builds a real regional decision network |
| 7 | Source snapshots | Closes the structured evidence debt |
