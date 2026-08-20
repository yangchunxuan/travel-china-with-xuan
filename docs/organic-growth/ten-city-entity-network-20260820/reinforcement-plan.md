# Ten-city reinforcement plan

The plan is sequenced by release risk. It does not author the missing support pages, activate blocked links, merge this branch or deploy a Hub.

## P0 — keep formal release status separate from code presence

PR #74 merged during this audit. Its Hangzhou and Zhangjiajie definitions entered main, even though central's formal live baseline still contains only five cities. Without a gate, static params, discovery, the search manifest and sitemap would treat all seven definitions as published.

Implemented in this branch:

- every reviewed Hub entry has an explicit `published` or `release-candidate` lifecycle;
- the five published IDs and registry entries are derived from that lifecycle rather than maintained as another hand-written city list;
- public static routes and their guards use only published IDs;
- the discovery component uses only the published registry;
- the content adapter retains release candidates as `review`/`noindex` manifest nodes with an explicit block reason;
- the public body and metadata loaders accept only published Hub IDs;
- release candidates have `datePublished: null` until a real release date exists.

Promotion is one editorial event: central changes lifecycle, supplies the real publication date, closes assets and links, and runs the full release QA. Passing Gate B alone can never promote a Hub.

## P1 — administrative and destination mapping integrity

Implemented in this branch:

- added Shaanxi, Sichuan, Guangdong, Hunan, Zhejiang and Guangxi parent entities;
- moved Xi'an, Chengdu, Guangzhou, Shenzhen, Zhangjiajie, Hangzhou and Guilin under the correct parent;
- kept Beijing, Shanghai and Chongqing directly under China and labelled them direct-administered municipalities;
- labelled Guangxi as an autonomous region while retaining the validator-supported `province` entity type;
- preserved the ten-city destination-token mapping delivered by PR #74;
- stored Hub lifecycle as an entity attribute without using entity status to create routes.

Next central schema work:

- materialise official administrative source snapshots and connect them through `sourceIds`;
- standardise all draft city graphs on repository `EntityV1`/`RelationV1` envelopes;
- reject duplicate `place-shanghai`, `place-shenzhen` and `municipality-beijing` identities;
- make unknown destination tokens fail QA rather than silently falling back to China.

## P2 — maintain the five published Hubs

### Beijing

- Add missing specialist-to-Hub return links in EN/ZH/KO.
- Preserve dynamic reservation checks and the generic Great Wall image boundary.

### Shanghai

- Add missing return links.
- Add a genuine visit/ticket handoff if a bounded owner exists; do not relabel the PVG–Disney transfer guide as a ticket owner.
- Attach Shanghai/South/Songjiang station nodes to their correct administrative hosts and service relationships.
- Migrate legacy `place-shanghai` overlay IDs to `city-shanghai`; keep Yangshan's physical location separate from Shanghai's operating context.

### Xi'an

- Add missing return links.
- Create a bounded gateway selector only if it can own a distinct XIY/station task.
- Locate the Qinhan Museum through its actual Xixian/Qinhan host before relating it to the Xi'an visitor task.

### Chengdu

- Add missing return links.
- Add a bounded stay-area specialist; the Hub already contains an explicit shorten condition, but its hotel handoff remains partial.
- Verify or replace the Jinjiang bridge image.
- Keep TFU's physical host separate from its “serves Chengdu” relationship.

### Guangzhou

- Add missing return links.
- Commission a stay-area owner, a genuine visit/ticket handoff and a railway-station selector; the Hub is only one owner above the gate. The Baiyun terminal guide remains a gateway owner.
- Regenerate Search Map entity assignments from runtime truth so Guangzhou owners cannot remain country-only in the overlay.

## P3 — close the two release-candidate gaps

### Hangzhou

1. Add a bounded Hangzhou stay-area owner or keep the hotel handoff explicitly partial.
2. Ingest the five explanatory images listed in `image-plan.md`.
3. Strengthen or replace the Hero rights record.
4. Prepare all seven trilingual owner-to-Hub return links.
5. Recheck official airport, station, West Lake, Lingyin and Liangzhu facts.
6. Promote lifecycle and set the real `datePublished` only after the above pass.

### Zhangjiajie

1. Build an independent Hub source log, image plan and asset ledger.
2. Add at least four explanatory images covering gates, base geography, city/Tianmen and a gateway or separate Grand Canyon system.
3. Recheck the ticket-and-entrance owner's trilingual production routes; its merge into current main does not by itself release the City Hub.
4. Prepare all ten return links.
5. Encode the four-system boundary in the entity graph: city/Tianmen, Wulingyuan/Forest Park, Tianzi/Yuanjiajie upper clusters, Grand Canyon/Cili.
6. Promote lifecycle and set the real publication date only after central approval.

## P4 — move Chongqing from docs-only to a future candidate

1. Rebase the internal Hub package onto current main.
2. Add `chongqing-railway-station-selector` as the fifth owner and re-run section/entity eligibility.
3. Verify all five owners in EN/ZH/KO and add planned return links.
4. Produce the licensed Hero, three or more explanatory place images and both non-scale diagrams.
5. Correct graph relations: a Shapingba station service must point through a route/service relation, not make Chengdu its location.
6. Recheck CKG, current stations, Wulong/Dazu access and cruise handoffs with official sources.
7. Only then create a separate runtime implementation branch from that day's latest main.

## P5 — close support-owner gates for Guilin and Shenzhen

### Guilin

Required before runtime work:

- gateway selector for KWL and the named railway stations;
- Yangshuo town versus Yulong countryside stay owner;
- Longji day trip versus overnight owner;
- preferably a Li River cruise versus Yulong rafting boundary owner;
- a correctly located Li River Hero and complete multi-place image set.

The graph must preserve three distinctions: Guilin city versus the wider prefecture, Yangshuo county/town versus a city neighbourhood, and large Li River cruising versus Yulong River rafting.

### Shenzhen

Required before runtime work:

- a fifth airport-and-railway-station selector owner;
- production-200 and return-link checks for the existing four owners;
- ingestion and crop QA for the planned five real images and two diagrams;
- migration from `place-shenzhen` to `city-shenzhen` in the Search Map overlay.

The station owner must explicitly separate Futian Railway Station from Futian Port, Shenzhen Railway Station from Luohu Port, and Airport Station from Airport North.

## P6 — runtime relation layer

The per-city draft graphs currently use incompatible shapes and are not loaded by the search manifest. Central should introduce the relation layer incrementally:

1. define a small allowed relation vocabulary using the existing `RelationV1` schema;
2. materialise province→city first;
3. add accurately hosted airport/station nodes with separate `located-in` and `serves` relations;
4. add stay areas and attraction clusters only after canonical ID review;
5. model city-pair routes as route entities rather than changing geographic parentage;
6. keep FAQ and CTA as content relationships, not place entities;
7. reject orphan nodes, unresolved endpoints and unsupported custom entity types in CI.

## Completion order

| Order | Work | Why first |
|---:|---|---|
| 1 | Lifecycle gate | Prevents candidate leakage into routes, discovery and sitemap |
| 2 | Administrative parents and token mappings | Stops country-only and wrong-parent relations |
| 3 | Published-Hub backlink maintenance | Repairs the live network without adding new pages |
| 4 | Hangzhou/Zhangjiajie assets and candidate QA | Allows deliberate promotion rather than accidental release |
| 5 | Chongqing fifth-owner reconciliation | Closest internal package to candidate readiness |
| 6 | Shenzhen fifth owner | One owner short, with usable image candidates |
| 7 | Guilin owner build-out | Largest support and asset deficit |
| 8 | Full relation materialisation | Requires stable canonical IDs from all prior steps |
