# Ten-city entity lifecycle repair

Status: **central review required**

Checked: **2026-08-21 (Asia/Shanghai)**

Repository baseline: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`

This package replaces the unsafe lifecycle conclusion in employee 2 commit
`6e7dde45149e7ee33b4570df9f2fd899c2742ef0`. That commit must not be used as
a release candidate because it would withdraw two destination Hubs that are
already live. No commit from the old branch was cherry-picked.

## PR #74 is now part of the live baseline

[PR #74](https://github.com/yangchunxuan/travel-china-with-xuan/pull/74)
merged as the repository baseline above. Its five trilingual public identities
are now online:

1. Hangzhou City Hub;
2. Zhangjiajie City Hub;
3. `china-online-arrival-card`;
4. `chongqing-railway-station-selector`;
5. `zhangjiajie-national-forest-park-tickets-and-entrances`.

The resulting production sitemap baseline is **649 `<loc>` entries**. The
two City Hubs contribute six of those URLs: English, Simplified Chinese and
Korean routes for Hangzhou and Zhangjiajie.

## Lifecycle rule

The live destination registry is the publication authority for City Hubs.
The canonical entity registry answers a different question: whether a place
may be referenced in the knowledge graph. A city entity marked `published`
does not create a Hub, route, discovery card or sitemap entry.

- **Published Hubs:** Beijing, Shanghai, Xi'an, Chengdu, Guangzhou, Hangzhou
  and Zhangjiajie.
- **Docs-only / blocked:** Chongqing. It has five support owners in current
  main, but its older Hub package, images and reciprocal links have not been
  reconciled and no destination runtime entry exists.
- **Blocked:** Guilin and Shenzhen. Neither has a destination runtime entry;
  each still has open owner and asset gates.

杭州 and 张家界 keep their real `datePublished: "2026-08-20"`, all 21
seven-city locale routes, published manifest nodes, discovery cards and
sitemap entries. This repair adds no candidate state and no nullable release
date to those Hubs.

## Fixed Hub contract

Every city is audited against the same nine decisions:

1. `W` — who the city suits, including a shorten or skip condition;
2. `N` — first-trip nights as an editorial judgement;
3. `S` — stay areas matched to traveller tasks;
4. `G` — airports and railway gateways kept distinct;
5. `A` — attraction clusters expressed as relationships, not a list;
6. `R` — nearby cities and outer branches treated as route decisions;
7. `O` — qualified, non-duplicate canonical support owners;
8. `F` — real FAQs that resolve recurring decisions;
9. `E` — hotel, ticket, gateway and human-planning handoffs.

`✓` means the Hub supplies the decision. `△` records a real specialist,
asset or handoff debt; it does not retroactively unpublish an established Hub.

## Ten-city status matrix

| City | Administrative chain | Hub state | Support owners | W/N/S/G/A/R/O/F/E | Immediate action |
|---|---|---|---:|---|---|
| Beijing | China → Beijing municipality | published | 11 | ✓/✓/✓/✓/✓/✓/✓/✓/✓ | Maintain dynamic reservation boundaries |
| Shanghai | China → Shanghai municipality | published | 8 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | Add a real ticket/visit handoff later |
| Xi'an | China → Shaanxi → Xi'an | published | 6 | ✓/✓/✓/✓/✓/✓/✓/✓/✓ | Add a gateway child when independently useful |
| Chengdu | China → Sichuan → Chengdu | published | 7 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | Add stay/gateway depth; preserve image limit |
| Guangzhou | China → Guangdong → Guangzhou | published | 6 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | Add stay and rail-selector owners |
| Hangzhou | China → Zhejiang → Hangzhou | published | 7 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | Keep live; strengthen stay and body-image depth |
| Zhangjiajie | China → Hunan → Zhangjiajie | published | 10 | ✓/✓/✓/✓/✓/✓/✓/✓/✓ | Keep live; add an independent asset/source ledger |
| Chongqing | China → Chongqing municipality | docs-only / blocked | 5 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | Reconcile the fifth owner, links and assets before runtime work |
| Guilin | China → Guangxi Zhuang Autonomous Region → Guilin | blocked | 2 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | Add at least three bounded owners and production assets |
| Shenzhen | China → Guangdong → Shenzhen | blocked | 4 | ✓/✓/✓/✓/✓/✓/✓/✓/△ | Add the gateway selector, verify links and ingest assets |

## Administrative parent correction

`content/entities/core-places.json` now materialises Shaanxi, Sichuan,
Guangdong, Hunan, Zhejiang and Guangxi above the applicable cities. Beijing,
Shanghai and Chongqing remain directly under China because they are
direct-administered municipalities. Guangxi is recorded as an autonomous
region rather than treated as an ordinary province in traveller-facing names.

The new entity records intentionally retain empty `sourceIds`. The selected
official URLs are recorded in `source-log.md`, but no immutable
`source-snapshot` records exist yet. Central must not describe that evidence
debt as closed until the sources are retrieved, hashed and attached.

## Employee 8 integration dependency

Employee 8's unmerged branch
`origin/codex/seo-technical-foundation-20260820@a22beed2440be800513a0f9db588364b6eda3d91`
moves destination-token resolution from
`lib/searchPlatformContentAdapter.ts` to
`lib/searchPlatformGuidePolicy.ts`. GitHub showed no PR for that exact head
on 2026-08-21.

This repair therefore does not copy or guess the new policy. Its tests validate
administrative parentage and the seven-Hub public contract without reading the
old adapter as a mapping authority. After employee 8 is integrated, central
should run `resolveGuideEntities()`, `destinationEntityIds` or
`npm run check:guide-entities` as the mapping-level regression.

## Deliverables

- `entity-network.json` — ten-city administrative and planning graph;
- `hub-gaps.md` — owner inventory and the real remaining gap per city;
- `bidirectional-links.md` — canonical ownership and reciprocal-link plan;
- `reinforcement-plan.md` — safe sequencing without accidental publication;
- `image-plan.md` — location, rights and explanatory-image gaps;
- `source-log.md` — repository, PR and official-source evidence;
- `qa.md` — commands, export assertions and unresolved checks.

## Non-goals

- No destination copy, homepage, commercial logic or deployment is changed.
- No Hub is added for Chongqing, Guilin or Shenzhen.
- No correct Hangzhou or Zhangjiajie publication metadata is reset.
- No candidate image is promoted to a production asset.
- No employee 8 technical commit is copied before central integration.

**TEN-CITY LIFECYCLE REPAIR READY — CENTRAL REVIEW REQUIRED**
