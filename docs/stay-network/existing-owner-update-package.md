# Existing-owner update package

Reviewed: 2026-08-20

Baseline for collision decisions: `origin/main` `ef189874`

The package follows the required order: strengthen Hubs and canonical owners,
then hold/reject duplicate page ideas. It creates no new indexable stay page.

## Changes implemented in this branch

### Five established destination Hubs

Beijing, Shanghai, Xi'an, Chengdu and Guangzhou receive aligned EN/ZH/KO
changes:

- contextual links to `china-hotel-near-metro`,
  `china-accessible-hotel-room-verification`, `foreigners-china-hotel` and
  `china-last-night-before-international-flight`;
- one `stay-quote-handoff` callout asking for dates, party/room/bed needs, exact
  gateways, priority days, budget/currency, luggage and child/older/mobility
  requirements;
- a city-specific final-night FAQ that starts from the exact airport/terminal
  and the real fallback chain;
- a free human planning link to `/#planner-contact`, with no paid product
  preselected;
- explicit caveats that a human check or written quote does not guarantee live
  availability, final price or foreign-guest registration execution.

Only `dateModified` changes to 2026-08-20. Existing `sourceReviewedDate` values
remain untouched because the branch does not claim to have reopened every Hub
source.

### Canonical owner integration

After replaying onto the latest main, this branch implements the following:

- aligns `foreigners-china-hotel` metadata factual-review date with its own
  PR-#74 source log after verifying that every referenced official URL was in
  fact reopened on 2026-08-20;
- adds a source audit for `china-last-night-before-international-flight` without
  moving its page-level review date, because the Shanghai Airport source did
  not successfully reopen in this check;
- adds supplier-neutral, trilingual stay-fit handoffs to the Shanghai, Xi'an,
  Chongqing and Shenzhen city owners and extend Zhangjiajie's existing handoff;
- links those owners to the national near-metro, accessible-room,
  foreign-guest-recovery and final-night tasks without copying their full
  workflows;
- updates `dateModified` only for pages whose copy changes; updates
  `sourceReviewedDate` only when the full factual source set has been reopened.

## PR #74 content to consume, not recreate

PR #74 merged during this project. Its changes are already canonical on the
audited main branch:

- `beijing-where-to-stay-first-trip` gained a contextual foreign-guest link;
- `china-hotel-near-metro` gained a contextual foreign-guest link;
- `foreigners-china-hotel` gained platform-label, confirmed-booking refusal,
  hotel/non-hotel registration, self-cancellation and 12367/12345/12315/110
  recovery detail;
- Hangzhou and Zhangjiajie Hub runtimes entered main;
- the Chongqing railway-station selector entered main.

This branch must preserve those changes during rebase. It must not publish a
second Beijing/near-metro/foreigners owner or overwrite the newly registered
Hub entries.

## Page-by-page disposition

| Page or city | Action | What is intentionally not added |
| --- | --- | --- |
| Beijing Hub | implemented update | no second first-trip guide, no airport-hotel list |
| Shanghai Hub + owner | implemented update | no “best Shanghai hotels” page |
| Xi'an Hub + owner | implemented update | no duplicate wall-versus-Dayanta owner |
| Chengdu Hub | implemented update | no `hg-topic-0494` generic owner |
| Guangzhou Hub | implemented update | no `hg-topic-0502` generic owner or frozen terminal instructions |
| Zhangjiajie owner + integrated Hub | implemented update; central verifies Hub release state | no second city-versus-Wulingyuan comparison |
| Hangzhou integrated Hub | implemented stay-network/FAQ update; central verifies public release | no `hg-topic-0498` broad owner |
| Chongqing owner + Hub draft | owner update implemented; Hub remains central-gated | no second area owner and no branch-side Hub registration |
| Guilin Hub draft | central reviews/releases draft first | no copied Hub and no city-versus-Yangshuo owner yet |
| Shenzhen owner + Hub draft | owner update implemented; Hub remains central-gated | no second area owner and no branch-side Hub registration |
| Foreign-guest owner | retained PR #74 and aligned metadata to the documented full official recheck | no platform-label-as-law or “all hotels” promise |
| Accessible-room owner | completed official-source recheck and date alignment; image-credit date retained | no district/property accessibility guarantee |
| Final-night owner | implemented partial source audit and copy/consult refinement | no ten-city airport-hotel pages |

## Consultation copy contract

The safe minimum request is:

- stay dates and flexibility;
- exact city/cities, arrival/departure node and time band;
- adults, child ages at travel, rooms and bed/connecting-room needs;
- luggage and any street-to-room/bathroom route requirements;
- approximate accommodation budget, currency and whether it is per room/night
  or total;
- flexibility on area/property type and a fallback area;
- for recovery, the reason stated by the property/platform and which records
  the traveller already holds.

The first contact must not request passport or order numbers, document images,
payment/card/QR data, room/key-card identifiers or a medical diagnosis. It must
not promise price, availability, room assignment, foreign-guest handling,
accessibility, refund or supplier response.

## Image state

The five changed Hubs and the selected city owners already use real repository
photographs with project provenance records. A real scene still proves only
the visible area/context, not a current room, route, inventory or acceptance
fact. The four support owners currently using diagram-only hero treatment —
`beijing-courtyard-hotel-or-modern-hotel`,
`commercial-aparthotel-or-residential-rental-china`,
`minsu-homestay-or-hotel-china` and
`serviced-apartment-or-hotel-china` — remain an asset-acquisition gap. Central
must commission/license documentary replacements; no AI hotel or room image is
permitted.

## Central review checks

1. Verify Hangzhou/Zhangjiajie public-route state; runtime integration is not
   evidence of deployment.
2. Retain PR #74 content during rebase.
3. Confirm all EN/ZH/KO block IDs/types and localized internal-link paths.
4. Confirm each changed page's `dateModified` and factual `sourceReviewedDate`
   mean different things and are accurate.
5. Reconcile Search Map rows whose status still predates PR #74.
6. Complete image rights chains where project possession is recorded but the
   original creator/licence evidence remains incomplete.
