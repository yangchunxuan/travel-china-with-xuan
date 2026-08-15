# Guilin destination hub — source log

Status: **INTERNAL DRAFT — CENTRAL REVIEW REQUIRED**
Source review date: **2026-08-15**
Primary entity: `city-guilin`
Parent proposal: `autonomous-region-guangxi`
Canonical proposal: `/destinations/guilin/`
Publication mode: `internal` only; a future `public-noindex` prototype may be considered after review.

## 1. Source and claim policy

This hub explains a regional topology rather than promising a fixed product. Stable geographic relationships may be stated directly. Schedules, fares, water operations, flood-control measures, sailing, bamboo-raft eligibility and local transfer arrangements are high-dynamic facts and must be checked again for the travel date.

Source priority used here:

1. repository production and Search Platform rules;
2. current Homeground owner articles on `origin/main`;
3. Guilin airport, China Railway 12306 and Guilin Li River Scenic Area official channels;
4. Guilin, Yangshuo, Guangxi culture/tourism and natural-resources government sources;
5. no commercial reseller or user-generated source for an operational claim.

The body intentionally avoids fixed airport-bus timetables, current fares, guaranteed train pairs, guaranteed sailing, permanent bamboo-raft age/height limits and a fixed Longji agricultural calendar.

## 2. Repository baseline reviewed read-only

| ID | Repository source | What it controls | Review result |
|---|---|---|---|
| R01 | `docs/article-production-lite.md` | Independent content folders, validation and generated-registry restrictions | Draft output stays outside public guide folders and does not edit generated files. |
| R02 | `docs/homeground-search-platform-phase-1-spec.md`, especially 4.4, 4.5 and 7.3 | Destination ownership, hub publication gates, one canonical, no automatic indexing | Guilin remains internal because supporting coverage is sparse. The hub owns broad Guilin intent; no competing `/guides/guilin-travel-guide/` is created. |
| R03 | `docs/organic-growth/search-map.json` | Canonical owner and inventory controls | `city-guilin` exists. No Search Map mutation is included. |
| R04 | `content/entities/core-places.json` | Central entity registry | `city-guilin` exists. Guangxi, Yangshuo, Xingping, Longsheng/Longji and transport nodes remain graph-local proposals; the central file is not edited. |
| R05 | `content/guides/guilin-yangshuo-transport-route/` | Current detailed transport owner | Preserved as the owner of rail/road/large-cruise endpoint comparison. The hub summarizes relationships and links out rather than duplicating the full execution guide. |
| R06 | `content/guides/china-in-october-golden-week-or-later/` | Current October/Golden Week owner | Preserved as the timing owner. The hub does not absorb its national holiday rules. |
| R07 | `app/sitemap.ts`, `lib/searchPlatformManifest.ts` and protected baselines | Public sitemap and indexability | No file is changed. This patch cannot publish or index the hub. |
| R08 | read-only remote branch inventory | Duplicate/unpublished-content check | `article/worker-4-liu-sanjie-completion-20260814` contains a research/completion audit, not a published guide. It is excluded from current-article modules. No competing Guilin city-hub branch was observed in the reviewed branch inventory. |

Observed `origin/main` head during the read-only review: `cc6be75e59155935f321df0334588b52769eb6e4`.

## 3. Current owner inventory and exclusions

### Eligible current owners in the body

| Content ID | Proposed live paths | Scope retained |
|---|---|---|
| `guilin-yangshuo-transport-route` | `/guides/guilin-yangshuo-transport-route/` plus `/zh/` and `/ko/` variants | Exact endpoints, rail/road/large-cruise comparison, Yangshuo Station last mile, cruise pier/luggage problem. |
| `china-in-october-golden-week-or-later` | `/guides/china-in-october-golden-week-or-later/` plus `/zh/` and `/ko/` variants | Golden Week versus later October, national booking pressure and Guilin’s October context. |

The repository metadata marks both as published owners and the task specification identifies both as current owner articles. A direct independent HTTP-status fetch of every locale URL could not be completed through the current restricted web client. **Before any renderer uses this draft, central review must make a fresh request and remove any link that does not return HTTP 200.** No other article is presented as current Guilin support.

### Explicitly excluded

- Liu Sanjie research/completion pack: unpublished research evidence, not a current article.
- Anshun Dixi material: unrelated destination and not Guilin support.
- Any local-only or unmerged branch: not public content.
- Commercial booking pages: not evidence of current official operating rules.

## 4. Official external source register

| ID | Publisher and URL | Claim use | Volatility | Reviewed |
|---|---|---|---|---|
| O01 | Guilin Liangjiang International Airport — company profile: https://gl.airport.gx.cn/html/guanyuwomen/ | KWL identity; T1/T2 context belongs to airport operations, not a generic city promise | High | 2026-08-15 |
| O02 | Guilin Airport — city airport buses: https://gl.airport.gx.cn/html/jiaotongxinxi/jiaotonggongju/snjcdb/73.html | Officially published connections involving the city and Guilin North/West; body uses only the existence of current channels | Very high | 2026-08-15 |
| O03 | Guilin Airport — intercity buses: https://gl.airport.gx.cn/html/jiaotongxinxi/jiaotonggongju/chengjidaba/ | Officially published direct Yangshuo service and explicit instruction to use the official sales system for actual daily departures | Very high | 2026-08-15 |
| O04 | China Railway 12306 English channel: https://www.12306.cn/en/index.html | Exact train, station pair and travel-date verification | Very high | 2026-08-15 |
| O05 | Guilin Li River Scenic Area — transport and piers: https://www.liriver.com.cn/page/article/lyfw.jtcx | Large cruise is one way; reviewed official description is about 60 km/about four hours; Mopanshan for three-star and Zhujiang for four-star boats; Longtoushan arrival | Very high | 2026-08-15 |
| O06 | Guilin Li River Scenic Area — official ticket channel: https://en.liriver.com.cn/page/article/lyfw.pwxx | Official purchase route; sale window and inventory remain date-specific | Very high | 2026-08-15 |
| O07 | Guilin Li River Scenic Area — visitor notice: https://www.liriver.com.cn/page/article/zxlj.jqdt/126 | Existing owner’s evidence for separate pier access/onward transport and no luggage-storage assumption | Very high | 2026-08-15 |
| O08 | Guilin Li River Scenic Area — self-service collection guide: https://www.liriver.com.cn/page/article/zxlj.jqdt/128 | Official-channel ticket collection; not used to promise that every third-party ticket is compatible | High | 2026-08-15 |
| O09 | Guilin Li River Scenic Area — scenic-area identity: https://www.liriver.com.cn/page/article/zjlj.ljjj | Li River as a corridor with multiple visitor modes; promotional language is not copied into the hub | Medium | 2026-08-15 |
| O10 | Guangxi Department of Natural Resources — official land/location notice used by the current owner: https://dnr.gxzf.gov.cn/villageNews/show/450321?id=1240 | Yangshuo railway connection is associated with Xingping rather than central Yangshuo town | Medium | 2026-08-15 |
| O11 | Guangxi Department of Natural Resources — Yangshuo rural planning: https://dnr.gxzf.gov.cn/xwzx/sxdt/t21178594.shtml | Yangshuo is a county with its own rural spatial system; not a Guilin-city neighbourhood | Low | 2026-08-15 |
| O12 | Guangxi Department of Natural Resources — Yulong resort-area village context: https://dnr.gxzf.gov.cn/xwzx/sxdt/t26746962.shtml | Yulong countryside is a distributed rural area, not one compact hotel district | Medium | 2026-08-15 |
| O13 | Guangxi Department of Natural Resources — Longji terrace protection/use case: https://dnr.gxzf.gov.cn/xwzx/sxdt/t19279622.shtml | Longji core village context including Dazhai, Ping’an and Longji villages; supports village-level separation | Medium | 2026-08-15 |
| O14 | Guangxi Department of Natural Resources — Guilin-wide rural planning, Dazhai image/context: https://dnr.gxzf.gov.cn/xwzx/sxdt/t27132449.shtml | Dazhai is in Longji Town, Longsheng County; reinforces separate northern mountain geography | Medium | 2026-08-15 |
| O15 | Guangxi Culture and Tourism Department: https://wlt.gxzf.gov.cn/ | Authority-level destination and tourism notices; use only when a specific current notice supports a claim | High for notices | 2026-08-15 |

## 5. Claim ledger

| Claim in hub | Source basis | Editorial treatment |
|---|---|---|
| Guilin city is the air/rail/large-cruise gateway while Yangshuo and Xingping are different bases | R04, R05, O01–O05, O10–O12 | Stable topology, stated directly. |
| Yangshuo Station is near Xingping, not central Yangshuo town | R05, O10 | Stable location warning; no fixed transfer time or fare. |
| Large Li River cruise is a one-way sightseeing product from separate Guilin-side ports to Yangshuo-side arrival | R05, O05, O07 | Route structure stated with review date; sailing and sales must be rechecked. |
| Three-star and four-star boats use different reviewed departure ports | O05 | Used only as “reviewed official guidance”; not promised as immutable. |
| Airport currently publishes city and direct-Yangshuo ground services | O02, O03 | Body avoids times/fares and requires official sales-system confirmation. |
| Other Li River water products must be currently authorised | O09 plus regulatory principle | No operator, route, pier or legality is inferred from a generic product name. |
| Yulong uses a different river and manually propelled raft experience | O12 and current official/government descriptions reviewed in research | Experience distinction stated; no permanent passenger restrictions published. |
| Longji is in Longsheng and comprises separate village access tasks | O13, O14 | Stable geography; road/access/luggage details remain live checks. |
| Guangzhou/Hong Kong/Chongqing are onward-route relationships | R05, O04, airport/rail logic | Expressed as sequencing logic only. No direct train, duration or fare is guaranteed. |

## 6. High-dynamic fact register

| Fact class | Recheck channel | Recheck point | Fallback if unverified |
|---|---|---|---|
| KWL flight terminal and arrival status | airline + Guilin airport | Day of travel | Keep a named road transfer and late-reception plan. |
| Airport bus/coach times, fares and stops | Guilin airport official sales system | Booking day and arrival day | Private authorised transfer or Guilin-city buffer night. |
| Guilin/Guilin North/Guilin West/Yangshuo train services | 12306 | Ticket release and again before departure | Alternative station/road plan with realistic door-to-door time. |
| Large Li River cruise sales, port, sailing and luggage rule | Li River official ticket/notice channel | Before payment and 24–48 hours before travel | Road transfer plus a land-based Yangshuo day. |
| Li River water level, flood control and navigation orders | Li River scenic-area/local authority notice | Close to travel and same day when weather is unstable | Do not substitute an unnamed water product; use road movement. |
| Yulong raft section, passenger eligibility and suspension | exact official operating section | Before promising and on the activity day | Countryside road/cycle/walk plan when safe. |
| Longji village road, local shuttle, steps and luggage handling | exact hotel + current local official/operator notice | Before booking and before arrival | Guilin-city day trip or a more accessible village/base. |
| Cross-border rail to Hong Kong | 12306 and border/rail operator | Travel date | Route via Guangzhou/Shenzhen or add an intermediate night. |

## 7. Publication and maintenance decision

- Current result: `internal` draft.
- Earliest possible next state: centrally reviewed `public-noindex` prototype.
- `public-index` is not authorised by commercial value or draft quality.
- Supporting-guide count and section diversity must be recalculated from the runtime manifest, not from mentions in this draft.
- Every locale must pass the same gate before locale-level indexability exists.
- No public route, registry, sitemap, homepage, Search Map or indexability file is changed by this patch.
- A reviewer must refresh all high-dynamic facts and the two live-owner HTTP 200 checks before any public use.
