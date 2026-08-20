# Canonical owners and bidirectional internal-link plan

Checked: **2026-08-21** against the seven-Hub published baseline.

## Link contract

A City Hub owns city-level decisions: traveller fit, first-trip nights, base geography, gateway topology, attraction relationships, nearby branches and the next-city decision. It must not absorb the execution task already owned by a support guide.

Each qualified relationship needs two contextual links in every available locale:

1. Hub → specialist owner at the point where the reader needs execution detail.
2. Specialist owner → Hub where the reader needs the city-wide decision before or after that detail.

The locale rule is strict:

| Locale | Hub path | Guide path |
|---|---|---|
| English | `/destinations/<city>/` | `/guides/<slug>/` |
| Simplified Chinese | `/zh/destinations/<city>/` | `/zh/guides/<slug>/` |
| Korean | `/ko/destinations/<city>/` | `/ko/guides/<slug>/` |

No locale may link through the English URL as a fallback. The Hub should use descriptive task anchors, not repeated exact-match “travel guide” anchors. A link is activated only when the destination and guide both return production `200`, self-canonicalise, and preserve reciprocal hreflang.

## Canonical boundaries by owner type

| Owner type | Hub may answer | Specialist keeps |
|---|---|---|
| Stay area | Which area matches the route at summary level | full area comparison, hotel type, late arrival and trade-offs |
| Airport/station | Which gateway changes the plan | terminal/station identification, transfer chain, recovery |
| Attraction | Which cluster/day it belongs to | booking, entrance, visit order, accessibility and exit |
| City-pair route | Whether the next city belongs in the route | train/flight/port choice, exact nodes, recovery |
| Cultural context | Why it may deserve time | evidence layers, viewing method and cultural boundaries |
| FAQ | concise city-wide answer | any complex workflow that already has a canonical owner |
| Planning entry | when several constraints collide | human review of the actual dates, travellers and bookings |

## Current backlink audit

The current Hub registries have outbound support lists. Literal trilingual owner-to-Hub backlinks are incomplete:

| City | Support owners | Owners with an observed trilingual Hub backlink | Required action |
|---|---:|---:|---|
| Beijing | 11 | 4 | Add seven contextual return links during owner maintenance |
| Shanghai | 8 | 3 | Add five contextual return links |
| Xi'an | 6 | 3 | Add three contextual return links |
| Chengdu | 7 | 3 | Add four contextual return links |
| Guangzhou | 6 | 3 | Add three contextual return links |
| Hangzhou | 7 | 0 | Add seven contextual return links to the already-live Hub in one trilingual batch |
| Zhangjiajie | 10 | 0 | Add ten contextual return links to the already-live Hub in one trilingual batch |
| Chongqing | 5 in current main; 4 in the older docs graph | 0 active Hub links | Reconcile the docs graph to the station owner before any runtime branch |
| Guilin | 2 | Not applicable | Do not create links to a blocked destination URL |
| Shenzhen | 4 | Not applicable | Do not create links to a blocked destination URL |

This branch records the plan and does not modify dozens of independently owned guide bodies. Those changes should be batched by the central editor to avoid link churn and partial locale release.

## Per-city handoff map

### Beijing

- Stay: Hub ↔ `beijing-where-to-stay-first-trip`; hotel form factor ↔ `beijing-courtyard-hotel-or-modern-hotel`.
- Gateways: Hub ↔ `which-beijing-railway-station`; South Station airport handoff ↔ `beijing-south-station-to-capital-or-daxing-airport`.
- Attractions: Hub ↔ Forbidden City, Temple of Heaven, Summer Palace, National Museum and the selected Great Wall transfer owner.
- Route: Hub ↔ `beijing-xian-chengdu-route-order`.

### Shanghai

- Stay: Hub ↔ `shanghai-where-to-stay-first-trip`.
- Gateways: Hub ↔ `shanghai-pudong-or-hongqiao-airport`; Disneyland arrival ↔ its dedicated transfer owner.
- Route: Hub ↔ Hangzhou route and Yangtze Delta order owners.
- Urban interpretation: sponge-city, park-access and Yangshan pages link back only for city context; the Yangshan owner remains the port, not Shanghai as a physical location.

### Xi'an

- Stay: Hub ↔ `xian-where-to-stay-city-wall-or-dayanta`.
- Attractions: Hub ↔ Terracotta Warriors and Shaanxi History Museum owners.
- Route: Hub ↔ `beijing-xian-chengdu-route-order`.
- Future gateway owner: add only after it has a distinct airport/station selection task.

### Chengdu

- Attractions: Hub ↔ panda-site, Sanxingdui and greenway owners.
- Culture: Hub ↔ Sichuan opera context without freezing a performance calendar.
- Route: Hub ↔ Jiuzhaigou and Beijing–Xi'an–Chengdu owners.
- Gaps: create separate stay-area and airport/station owners only if research supports non-duplicative tasks.

### Guangzhou

- Gateway: Hub ↔ Baiyun terminal owner.
- Routes: Hub ↔ Hong Kong, Macao and Guangzhou–Shenzhen–Hong Kong order owners.
- Culture: Hub ↔ morning-tea and metro-archaeology owners.
- Gaps: add a stay owner and rail selector before relying on the Hub to carry both workflows indefinitely.

### Hangzhou

- Route: Hub ↔ Shanghai–Hangzhou and four-city delta-order owners.
- Heritage: Hub ↔ Liangzhu, Grand Canal and White Snake comparison owners.
- Landscape: Hub ↔ tea-landscape owner for context only, not current Longjing operations.
- Handoff gap: no stay specialist. Do not invent one as a link target; keep the published Hub live.

### Zhangjiajie

- Stay: Hub ↔ city-versus-Wulingyuan owner.
- Tickets/gates: Hub ↔ National Forest Park ticket-and-entrance owner.
- Attraction choice: Hub ↔ Glass Bridge versus skywalk and park itinerary owners.
- Audience: Hub ↔ older-traveller owner.
- Route: Hub ↔ Beijing/Shanghai transport and itinerary owners.
- Link boundary: the Hub is already public; add return links only as a complete EN/ZH/KO maintenance batch.

### Chongqing

- Stay: docs Hub ↔ Jiefangbei/Guanyinqiao/Shapingba owner.
- Orientation: docs Hub ↔ upper/lower-city owner.
- Outer branch: docs Hub ↔ tiankeng owner.
- Culture: docs Hub ↔ Sichuan opera context.
- Gateway: add `chongqing-railway-station-selector` to the docs owner graph, re-run trilingual production checks, then reconsider the five-owner gate.

### Guilin

- Existing route owner: `guilin-yangshuo-transport-route`.
- Existing timing context: `china-in-october-golden-week-or-later` is supporting context, not a substitute for three missing city-specific owners.
- Do not expose the planned Hub path until the gateway, stay and Longji/river-product tasks have canonical owners.

### Shenzhen

- Stay: planned Hub ↔ `shenzhen-where-to-stay-futian-luohu-nanshan`.
- Route: planned Hub ↔ Shenzhen–Hong Kong and Guangzhou–Shenzhen–Hong Kong owners.
- City interpretation: planned Hub ↔ low-altitude infrastructure owner.
- Fifth owner: airport/rail selector must distinguish railway stations from border checkpoints before it can close the release gate.

## Route-edge rules

- A city-pair guide links to both City Hubs only when both Hubs are formally published. Until then, it links to the published side and retains the unpublished side as text.
- An outer place inside a municipality may still be a separate full-day or overnight route. Administrative containment does not imply short travel time.
- A route edge never changes administrative parentage: Chongqing is not in Sichuan, Wuzhen is not a Hangzhou attraction, and Yangshuo is not a Guilin neighbourhood.
- Consultation is a light final handoff to the existing planner contact. No Hub introduces a new $69/$129 product CTA.

## Atomic link-maintenance checklist

1. Confirm the destination is one of the seven published registry entries.
2. Verify Hub and every support owner in EN/ZH/KO.
3. Add matching-locale return links to all support owners.
4. Run broken-link, canonical and hreflang checks.
5. Confirm all route-pair links obey the two-published-Hubs rule.
6. Re-run owner qualification using current-main content, then verify that no blocked-city URL was introduced.
