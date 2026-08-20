# China ten-city entity and City Hub network

Status: **central review required**

Audit date: **2026-08-20 (Asia/Shanghai)**

Repository baseline: `origin/main` at `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`

Compared release batch: PR #74, head `b66fc6cbca6f040a65db0d7e3727e3b2dac24580`, merged as the baseline commit above

This is an internal release-control package. It does not create a public destination route, add a city to the destination registry, merge PR #74, or deploy anything.

## Lifecycle vocabulary

- `published`: central has formally authorised the trilingual Hub for public routes. This branch exposes only this lifecycle through routes, discovery and indexable manifest nodes.
- `release-candidate`: the Hub code arrived through PR #74, but central's formal live baseline still withholds release status. A merge or green check is not evidence that the production page is live.
- `docs-only`: a reviewed internal Hub package exists, but there is no runtime Hub in current main.
- `blocked`: an internal package exists but one or more minimum gates remain open. It must not enter the runtime registry.

Entity-record status and Hub lifecycle are deliberately separate. A canonical city may be an active knowledge-graph entity while its destination page is blocked. `core-places.json` therefore stores the Hub state in `attributes.destinationHubLifecycle`, while public routes, discovery cards, manifest status and indexability consume the explicit lifecycle in `destinationHubs.ts`. The existence of a city entity never creates a URL.

## Fixed Hub contract

Every city was checked for the same nine decisions:

1. `W` — who the city suits, including a credible skip/shorten condition;
2. `N` — a first-trip night range stated as an editorial planning judgement;
3. `S` — accommodation areas matched to traveller tasks;
4. `G` — airport and railway gateways kept distinct;
5. `A` — attraction clusters expressed as spatial relationships, not a list;
6. `R` — nearby cities or outer districts treated as route decisions;
7. `O` — qualified canonical support owners;
8. `F` — real FAQs that resolve a recurring decision;
9. `E` — hotel, ticket and human-planning handoffs without turning the Hub into a product page.

`✓` means the Hub contains the decision. `△` means the decision exists but its specialist owner or production handoff is incomplete. A content-complete docs package can still be blocked by support-owner, source, image or runtime gates.

## Ten-city status matrix

| City | Administrative chain | Hub lifecycle | Qualified support owners | W/N/S/G/A/R/O/F/E | Runtime observation | Release decision |
|---|---|---|---:|---|---|---|
| Beijing | China → Beijing municipality | `published` | 11 | ✓/✓/✓/✓/✓/✓/✓/✓/✓ | Current main has EN/ZH/KO loaders | Maintain |
| Shanghai | China → Shanghai municipality | `published` | 8 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | Current main has EN/ZH/KO loaders | Maintain; no dedicated ticket owner |
| Xi'an | China → Shaanxi → Xi'an | `published` | 6 | ✓/✓/✓/✓/✓/✓/✓/✓/✓ | Current main has EN/ZH/KO loaders | Maintain; add a gateway child later |
| Chengdu | China → Sichuan → Chengdu | `published` | 7 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | Current main has EN/ZH/KO loaders | Maintain; add a stay-area specialist |
| Guangzhou | China → Guangdong → Guangzhou | `published` | 6 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | Current main has EN/ZH/KO loaders | Maintain; stay/ticket handoffs are incomplete |
| Hangzhou | China → Zhejiang → Hangzhou | `release-candidate` | 7 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | Loader is now in main; production route remained 404 at audit time | Do not call live; strengthen stay and image handoffs |
| Zhangjiajie | China → Hunan → Zhangjiajie | `release-candidate` | 10 total: 9 earlier owners + 1 delivered by PR #74 | ✓/✓/✓/✓/✓/✓/✓/✓/✓ | Loader is now in main; production route remained 404 at audit time | Do not call live; add an independent Hub asset/source ledger |
| Chongqing | China → Chongqing municipality | `docs-only` | 5 in current code after PR #74, but the docs Hub still connects only the earlier 4 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | No destination loader; internal package only | Re-audit the fifth owner, links and assets before runtime work |
| Guilin | China → Guangxi Zhuang Autonomous Region → Guilin | `blocked` | 2 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | No destination loader; internal package only | Keep internal; at least three more owners and assets needed |
| Shenzhen | China → Guangdong → Shenzhen | `blocked` | 4 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | No destination loader; internal package only | Keep internal; fifth owner, link checks and assets needed |

The live-site probe made during this audit returned `200` for all 15 locale routes of the five formally published cities and `404` for all 15 locale routes of the other five cities. PR #74 merged while the audit was in progress, so code presence and production release status now differ for Hangzhou and Zhangjiajie. Those observations are dated evidence, not permission to deploy or a substitute for a post-deployment check.

## Release gates

A city can enter the public Hub registry only when all of the following are true:

- at least five qualified, non-duplicate support owners are present in current main and have all three locale routes;
- the Hub has current official sources for gateway, ticket, opening or reservation claims that it actually makes;
- one real, correctly located Hero and enough explanatory images have a recorded reuse basis;
- every required decision in the fixed Hub contract is complete;
- Hub-to-owner and owner-to-Hub links resolve in the same locale;
- trilingual route, type, build, indexability and image checks pass on the actual release branch;
- `sourceReviewedDate` and `datePublished` reflect the real release, not the date a candidate file was drafted.

## Deliverables

- [`entity-network.json`](./entity-network.json) — canonical administrative parents and the complete city contract graph.
- [`hub-gaps.md`](./hub-gaps.md) — support owners and the exact decision or release gap for every city.
- [`bidirectional-links.md`](./bidirectional-links.md) — canonical owner boundaries and the two-way link contract.
- [`reinforcement-plan.md`](./reinforcement-plan.md) — sequenced work that does not prematurely publish a city.
- [`image-plan.md`](./image-plan.md) — real-place image status, rejection rules and remaining asset work.
- [`source-log.md`](./source-log.md) — repository, PR, official-source and evidence boundaries.
- [`qa.md`](./qa.md) — automated and manual checks for this branch.

## Non-goals

- No new destination copy was written.
- No homepage, sitemap, city copy, support-owner copy or public CTA was changed. The existing seven-definition destination registry and loader were lifecycle-narrowed so only the five formally published Hubs reach public surfaces.
- No generic city page was created for Chongqing, Guilin or Shenzhen.
- No image candidate is treated as production-ready until its exact source, author, licence, crop and derivative record are stored with the final asset.
- No `place-*` alias is introduced as a second canonical owner for a city.

**TEN-CITY ENTITY NETWORK READY — CENTRAL REVIEW REQUIRED**
