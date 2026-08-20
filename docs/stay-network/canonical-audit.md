# Canonical audit and routing record

Audit date: 2026-08-20

Remote baseline: `origin/main` `ef189874` (PR #74 merged)

Decision vocabulary: **update-existing**, **Hub section**, **FAQ**, **new owner
candidate**, **reject**

## What was audited

- production destination-Hub registry and runtime body loaders;
- every guide directory matching stay/hotel/accommodation intent plus the
  international-flight last-night owner;
- the Search Map and do-not-repeat rules;
- all remote branches whose name contains stay, hotel, Employee 5 or city Hub;
- the city-Hub drafts for Chongqing, Guilin and Shenzhen;
- PR #74 after merge, including the new Hangzhou and Zhangjiajie Hubs and the
  strengthened Beijing, near-metro and foreign-guest owners.

The canonical baseline is `origin/main`, not whether an old remote branch is an
ancestor. Some older article branches were squash/cherry-pick sources and still
exist even where the resulting page is already on main.

## Hub registry and release inventory

| City | State on audited main | Stay scope already owned | Route |
| --- | --- | --- | --- |
| Beijing | Yes | central area clusters, airport/station orientation, first-trip context | **Hub section + FAQ**, with narrow execution in existing owner |
| Shanghai | Yes | central/west/Pudong/Hongqiao bases and gateway trade-offs | **Hub section + FAQ**, with narrow execution in existing owner |
| Xi'an | Yes | wall/south/gateway bases and sight-order context | **Hub section + FAQ**, with narrow execution in existing owner |
| Chengdu | Yes | central/neighbourhood/East-station bases, CTU/TFU context | **Hub section + FAQ**; no generic new owner |
| Guangzhou | Yes | heritage/business/event/south-side bases and gateway context | **Hub section + FAQ**; no generic new owner |
| Zhangjiajie | Runtime registered by PR #74; public deployment not verified in this audit | city/Wulingyuan/sight-order orientation | **Hub section + FAQ**, with execution in existing base owner; central verifies release state |
| Hangzhou | Runtime registered by PR #74; public deployment not verified in this audit | West Lake sides, Lingyin/Longjing and East-station buffer | **Hub section + FAQ**; broad stay task already owned; central verifies release state |
| Chongqing | No | production stay owner exists; draft Hub remains separately gated | **update-existing + FAQ**; central Hub release is an executable gap |
| Guilin | No | draft Hub already contains Guilin/Yangshuo/Yulong/Xingping/Longji base logic | **Hub section first**; new owner only after central canonical review |
| Shenzhen | No | production Futian/Luohu/Nanshan owner exists | **update-existing + FAQ**; production Hub is a separate gap |

## Existing city stay owners

| Canonical owner | City | Task it owns | This network's route | Duplicate to reject |
| --- | --- | --- | --- | --- |
| `beijing-where-to-stay-first-trip` | Beijing | first-trip district choice | **update-existing** already strengthened by merged PR #74; consume it, do not overwrite it | another “best area in Beijing” or airport-hotel list |
| `shanghai-where-to-stay-first-trip` | Shanghai | first-trip central/west/Pudong/Hongqiao choice | **update-existing** | another city-wide Shanghai area guide |
| `xian-where-to-stay-city-wall-or-dayanta` | Xi'an | wall versus Dayanta/south and gateway trade-off | **update-existing** | another “where to stay Xi'an” page |
| `zhangjiajie-city-or-wulingyuan-hotel-base` | Zhangjiajie | city versus Wulingyuan from confirmed sight order | **update-existing** | second city-versus-Wulingyuan comparison |
| `chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba` | Chongqing | three-base comparison under vertical geography/gateway constraints | **update-existing** | another generic Chongqing district guide |
| `shenzhen-where-to-stay-futian-luohu-nanshan` | Shenzhen | three-base comparison by gateway and trip pattern | **update-existing** | another generic Shenzhen district guide |

Chengdu and Guangzhou do not need a generic first-trip owner now: their released
Hubs answer the broad task without splitting authority. Hangzhou's integrated
Hub body already owns the same scope, subject to central verifying its public
release state. Guilin's draft
Hub should be reviewed and released before central considers whether “Guilin
city or Yangshuo?” has enough independent execution depth to become a narrower
owner.

## Existing nationwide stay owners

| Canonical owner | Exclusive task | Route in the ten-city network |
| --- | --- | --- |
| `china-hotel-near-metro` | tests whether an actual property route is usable, beyond a platform distance/label | **update-existing** already strengthened by PR #74; every city page links to it rather than recreating the checklist |
| `foreigners-china-hotel` | booking, passport registration, refusal recovery and evidence preservation | **update-existing** already strengthened by PR #74; city FAQs give local context but do not restate law |
| `china-accessible-hotel-room-verification` | street-to-room-to-bathroom verification and fallback | **update-existing**; city pages state terrain/last-metre conditions without claiming an accessible property |
| `china-last-night-before-international-flight` | city hotel versus airport-side final night from the actual flight risk | **update-existing**; each city contributes an airport-specific FAQ without creating ten airport-hotel pages |
| `international-chain-or-local-hotel-china` | property-level verification rather than brand assumptions | **update-existing/internal-link support**; no brand ranking |
| `china-hotel-emergency-exit-fire-safety-check` | assigned-room five-minute safety check and unusable-route recovery | **internal-link support** when relevant; no hotel compliance ratings |
| `commercial-aparthotel-or-residential-rental-china`, `serviced-apartment-or-hotel-china`, `minsu-homestay-or-hotel-china` | accommodation-form decisions | **internal-link support** only when trip length/group needs make the format decision material |

## Query-to-owner routing

| Search or traveller task | Canonical treatment | Reason |
| --- | --- | --- |
| “Where should I stay on my first trip to [city]?” | City owner where one exists; otherwise live Hub | One broad owner per city prevents Hub/guide cannibalisation. |
| “Which area connects my booked station, airport and first sights?” | City owner/Hub matrix | It is the same area decision, not a transport-page clone. |
| “Is this hotel really close to the metro?” | `china-hotel-near-metro` | Reusable property-route test; city page supplies terrain/entrance context. |
| “I have children, older parents or mobility needs” | `china-accessible-hotel-room-verification` plus city owner/Hub context | Exact-property evidence changes the answer; city-level “accessible” labels cannot. |
| “Should I sleep near the airport on my final night?” | `china-last-night-before-international-flight` plus one city FAQ | One national decision framework; ten airport-hotel pages would repeat it. |
| “Can a foreign traveller stay here, and what if check-in fails?” | `foreigners-china-hotel` | The legal/platform/property evidence split and recovery chain are national. |
| “International chain or local hotel?” | `international-chain-or-local-hotel-china` | Verify current property facts rather than repeating brand assumptions by city. |
| “Please obtain a real hotel/DMC quote” | Free human stay-support handoff now; structured intake only after atomic runtime/privacy work | This is a service workflow, not an indexable inventory page. |
| “Guilin city or Yangshuo base?” | Guilin Hub first; **hold/reject as new owner** unless central later proves a separate execution task after Hub release | Draft Hub already covers the broad comparison; avoid premature duplication. |

## FAQ allocation

Each city should have only the local conditional answer. The national owner
keeps the reusable workflow.

| City FAQ job | Local answer must name | Handoff owner |
| --- | --- | --- |
| Final night | exact airport code/terminal, departure time band, party/luggage/mobility, loss of final city evening | `china-last-night-before-international-flight` |
| Near metro | exact entrance, direction, surface route, interchange, lift/step chain and final property access | `china-hotel-near-metro` |
| Foreign-guest check-in failure | keep calm, ask reason as stated, preserve booking/property/time/platform records, contact platform and official channels as appropriate, move to fallback | `foreigners-china-hotel` |
| Family/older/mobility fit | room/bed configuration, vehicle set-down, street-to-room-to-bathroom chain, fallback property/area | `china-accessible-hotel-room-verification` |

The FAQ must not turn a single hotel's practice into a city rule or freeze a
temporary transport arrangement into evergreen copy.

## New-owner threshold

A new indexable stay page is allowed only when all are true:

1. a specific comparison/recovery task remains unanswered after the Hub and
   existing owners are updated;
2. Search Map records one primary intent and no competing canonical;
3. official maps/transport sources and property-level written evidence can
   support the decision;
4. it has a distinct action chain, conditions that change the answer and a
   failure-recovery path;
5. all three locales and a real, rights-recorded documentary image can ship;
6. the page avoids live price, availability and acceptance guarantees.

No new indexable owner was created in this branch. That is intentional:
updating the current network closes the present gap without manufacturing ten
near-duplicate city pages.

## Explicit rejects

- “Top 10 hotels”, “best hotel” and brand-ranking pages;
- pages that claim current price, value, availability or room assignment;
- “foreigners accepted” lists or platform labels presented as law;
- “accessible hotels” lists without an exact end-to-end evidence chain;
- ten near-identical airport-hotel or near-metro city pages;
- public supplier/property databases, affiliate-weighted recommendations or an
  indexable live inventory endpoint;
- a second canonical for any owner listed above;
- copying public product-preview pricing/property semantics into this network.

## Remote branch exclusion ledger

The following refs were explicitly checked. They are evidence/history, not
permission to create parallel canonicals:

- `origin/article/beijing-where-to-stay-first-trip`
- `origin/article/worker-5-china-hotel-near-metro`
- `origin/article/worker-5-foreigners-china-hotel`
- `origin/article/worker-5-batch-20260812-1`
- `origin/batch/employee-5/20260813-b02`
- `origin/codex/city-hub-{beijing,shanghai,xian,chengdu,guangzhou,hangzhou,zhangjiajie,chongqing,guilin,shenzhen}-draft-20260815`

PR #74 is merged into the audited baseline. Its Beijing, foreign-guest,
near-metro, Hangzhou-Hub and Zhangjiajie-Hub work must be retained rather than
recreated on this branch.
