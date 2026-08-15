# Source log — Hangzhou Destination Hub draft

**Status:** `CITY HUB DRAFT READY — CENTRAL REVIEW REQUIRED`
**Source review completed:** `2026-08-15` (Asia/Shanghai)
**Draft base:** `origin/main` at `cc6be75e59155935f321df0334588b52769eb6e4`
**Proposed canonical owner:** `city-hangzhou`
**Proposed parent entity:** `province-zhejiang`
**Proposed public path:** `/destinations/hangzhou/` with `/zh/` and `/ko/` locale variants

This package is editorial draft material only. It does not create a public route, change indexability, edit the destination registry, modify the Search Map, add a sitemap entry or alter `content/entities/core-places.json`.

## Canonical boundary

The future Hangzhou Destination Hub owns the broad decision task: whether Hangzhou should be a Shanghai day trip or an overnight base, how many nights create a materially different visit, where to stay, which airport or railway station fits, how the main spatial clusters relate, and where Hangzhou sits in a wider Jiangnan route.

It does **not** own the execution detail already covered by these published pages:

| Existing canonical owner | What remains with that page | What the Hub may do |
| --- | --- | --- |
| `shanghai-hangzhou-transport-route` | Exact Shanghai–Hangzhou station-pair comparison, door-to-door rail logic and wrong-station recovery | Explain why station choice affects the day-trip-versus-overnight decision and link out |
| `shanghai-suzhou-hangzhou-nanjing-route-order` | One-way chain, Shanghai base and two-base Yangtze Delta architecture | Assign Hangzhou a route role and link to the larger multi-city decision |
| `liangzhu-ruins-park-and-museum-sequence` | Museum-versus-park sequence, separate visitor arrangements and current operational checks | State that Liangzhu is a distant, independent day rather than a central-city add-on |
| `white-snake-legend-hangzhou-zhenjiang` | Folklore, Broken Bridge, Leifeng archaeology, the modern tower and Zhenjiang comparison | Locate the north and south West Lake sectors without retelling the legend |
| `grand-canal-everyday-urban-history` | Evidence method for protected heritage, working waterway and present neighbourhood life | Allocate a separate northern canal block and link out |
| `tea-landscape-regions-of-china` | Longjing in the wider comparison of tea landscapes, craft and provenance | Explain the western-hill geography and time cost without rewriting the tea-region guide |

The prohibited near-duplicate `/guides/hangzhou-travel-guide/` is not created or proposed.

## Repository and publication audit

- `content/entities/core-places.json` at the draft base contains no Hangzhou or Zhejiang entity. Both are therefore marked `proposed` in `entity-graph.json`; no central entity file is edited.
- The active sitemap is generated from the production manifest. This package does not edit `app/sitemap.ts`, a registry or any generated file.
- The Search Map was read for ownership and collision control only. No Search Map field is changed in this draft.
- The deployed static export for base commit `cc6be75e59155935f321df0334588b52769eb6e4` was checked for all proposed internal links. Only paths present in that export are used in the three Hub drafts and `internal-links.md`.
- Open Hangzhou-named pull requests were checked before the remote-write stop instruction; no competing open Hangzhou city-hub PR was found. No further remote writes or PR actions were attempted after the instruction.

## Official and primary source register

### S1 — Hangzhou Municipal Bureau of Culture, Radio, TV and Tourism: 2025 inbound-tourism address

- URL: https://wgly.hangzhou.gov.cn/art/2025/6/6/art_1692916_58963128.html
- Reviewed: `2026-08-15`
- Supports: Hangzhou's city-level cultural chronology and its broad combination of Liangzhu, Wuyue/Southern Song history, landscape and contemporary city life.
- Safe boundary: a promotional address supports city identity, not exact visitor operations or the Hub's night recommendation.

### S2 — UNESCO World Heritage Centre: West Lake Cultural Landscape of Hangzhou

- URL: https://whc.unesco.org/en/list/1334/
- Reviewed: `2026-08-15`
- Supports: West Lake as a cultural landscape made up of lake, surrounding hills, causeways, islands, bridges, temples, pagodas, gardens and planting; the city lies on the fourth side of the lake.
- Safe boundary: UNESCO status does not turn the ten poetic views into a required sightseeing checklist, authenticate folklore or provide current crowd and transport information.

### S3 — Hangzhou West Lake Scenic Area Management Committee

- URL: https://westlake.hangzhou.gov.cn/
- Reviewed: `2026-08-15`
- Supports: the first-party management authority for West Lake scenic-area notices, management and current local information.
- Safe boundary: no fixed opening hour, traffic control or event is frozen in the Hub. The newest dated notice must govern the travel date.

### S4 — Hangzhou Xiaoshan International Airport: metro access

- URL: https://www.hzairport.com/en/guide/metro.html
- Reviewed: `2026-08-15`
- Supports: the airport currently lists Hangzhou Metro Lines 1, 7 and 19 at Xiaoshan International Airport.
- Safe boundary: first/last trains, station access, construction and operating patterns are dynamic. The Hub records the three-line identity only and explicitly requires a dated recheck.

### S5 — China Railway 12306

- URL: https://www.12306.cn/en/index.html
- Reviewed: `2026-08-15`
- Supports: the official date-specific channel for train, station, fare and inventory verification.
- Safe boundary: the Hub promises no train, duration, fare, frequency or seat. A sensible geographical direction still requires an actual dated service.

### S6 — Railway Hangzhou Station / Hangzhou public information: separate passenger stations

- URL: https://hznews.hangzhou.com.cn/chengshi/content/2026-04/29/content_9214782.htm
- Reviewed: `2026-08-15`
- Supports: Hangzhou Station, Hangzhou East, Hangzhou South and Hangzhou West are separate passenger stations; travellers are told to confirm the ticketed station and use 12306 for actual train operations.
- Safe boundary: the article is a dated holiday-operations notice, not a permanent timetable. Temporary overnight operations and extended metro service are not carried into evergreen copy.

### S7 — Hangzhou Lingyin Temple official site

- URL: https://www.lingyinsi.org/
- Reviewed: `2026-08-15`
- Supports: first-party institutional identity, official notices and the temple's location at Lingyin Road, Hangzhou.
- Safe boundary: Lingyin Temple and the wider Lingyin–Feilai Peak visitor area can have separate access, ticketing and reservation arrangements. The Hub freezes no quota, hour, price or passport procedure; the current scenic-area/official service channel must be checked.

### S8 — Hangzhou tourism authority: Lingyin overview

- URL: https://wgly.hangzhou.gov.cn/art/2023/12/1/art_1229734028_58951314.html
- Reviewed: `2026-08-15`
- Supports: Lingyin as a named western-hill cultural site within Hangzhou.
- Safe boundary: older destination copy is not treated as a current operations notice.

### S9 — Hangzhou Liangzhu heritage management authority

- URL: https://www.lzsite.cn/
- Reviewed: `2026-08-15`
- Supports: the official source of Liangzhu venue notices and the distinction among Liangzhu Museum, the City Site park, Yaoshan and Laohuling.
- Safe boundary: one venue confirmation must not be assumed to cover another venue or the entire World Heritage property.

### S10 — Liangzhu reopening announcement dated 12 July 2026

- URL: https://www.lzsite.cn/ZiXunDongTai/2026643812645.html
- Reviewed: `2026-08-15`
- Supports: Liangzhu Museum, the Archaeological Ruins Park, Yaoshan and Laohuling were announced to reopen from 13 July 2026 after a typhoon-related closure; the same notice warned that Liangzhu Museum is closed on Mondays.
- Safe boundary: this proves that weather can override standing operations. It is not a guarantee for another date, and every venue must be rechecked separately.

### S11 — UNESCO World Heritage Centre: Archaeological Ruins of Liangzhu City

- URL: https://whc.unesco.org/en/list/1592/
- Reviewed: `2026-08-15`
- Supports: the serial property contains four areas—Yaoshan, the high-dam area, the low-dam/causeway area and the City Site—and represents early urbanism, water management, rice agriculture and social hierarchy.
- Safe boundary: neither Liangzhu Museum nor the visitor park equals the complete World Heritage property.

### S12 — Hangzhou Municipal Government: Grand Canal core-zone spatial controls

- URL: https://www.hangzhou.gov.cn/art/2023/2/6/art_1229063387_1829308.html
- Reviewed through the published `grand-canal-everyday-urban-history` source pack at base commit `cc6be75`
- Supports: Hangzhou has officially defined Grand Canal protection and planning geography.
- Safe boundary: the Hub does not infer current museum, boat or waterfront access and delegates canal interpretation to the published canonical guide.

### S13 — Ministry of Agriculture: West Lake Longjing Tea Culture System designation record

- URL: https://www.moa.gov.cn/nybgb/2014/dliuq/201712/P020220424745802769272.pdf
- Reviewed through the published `tea-landscape-regions-of-china` source pack at base commit `cc6be75`
- Supports: official recognition of the West Lake Longjing Tea Culture System.
- Safe boundary: a designation record does not authenticate every product, guarantee a harvest, define a visitor programme or establish that any green hillside is a legal-origin Longjing plot.

### S14 — China Intangible Cultural Heritage Network: West Lake Longjing processing technique

- URL: https://www.ihchina.cn/project_details/14605.html
- Reviewed through the published `tea-landscape-regions-of-china` source pack at base commit `cc6be75`
- Supports: named Longjing processing knowledge and manual pan-firing context.
- Safe boundary: the Hub promises no live production or demonstration. Season, weather, producer and access must be checked for the travel date.

## Dynamic-fact ledger

| Dynamic fact | Evidence state on 2026-08-15 | Evergreen rule | Fallback when unconfirmed |
| --- | --- | --- | --- |
| HGH metro lines | Airport page lists Lines 1, 7 and 19 | Keep line identity; recheck first/last service and access | Legal taxi queue or a separately verified transfer |
| Hangzhou rail stations and trains | Four major station names confirmed; actual trains remain date-specific | Print the full station name and search 12306 | Choose another time/station pair or change the trip shape |
| Lingyin / Feilai Peak entry | Official institutional source exists; live visitor controls may sit on a separate scenic-area service | Freeze no quota, price, hour or passport workflow | Use another western-hill or West Lake cluster only after checking current access |
| Liangzhu venues | Official reopening notice is current historical evidence; operations remain weather- and venue-specific | Check museum and parks separately, including Monday and weather notices | Museum-only, shortened park visit or omit Liangzhu |
| Longjing harvest and processing | Inherently seasonal, weather- and producer-dependent | Promise landscape context, not harvest or performance | A non-sales landscape walk or indoor tea interpretation with current confirmation |
| West Lake boats, events and traffic controls | Date-, weather- and holiday-dependent | No fixed event, boat or vehicle-access promise | A shore-based cluster with a museum or city fallback |
| Public-holiday crowd and transit changes | Authorities may extend or restrict services temporarily | Treat holiday measures as dated exceptions | Reduce cross-city movements and protect a larger return margin |

## Homeground editorial judgments

The following are editorial recommendations derived from the spatial and operational evidence; they are not official rules:

- A selective West Lake visit can justify a Shanghai day trip, but two nights are the stronger default when Lingyin, Longjing or local morning/evening time matters.
- Three nights become useful when the Grand Canal or Liangzhu is an independent purpose.
- Hubin/east shore, Beishan/Wulin, the western hills and Hangzhou East Station area solve different accommodation problems.
- Hangzhou West must be explicitly disambiguated from West Lake.
- West Lake, Lingyin and Longjing share a broad western direction but do not form one frictionless entrance or a guaranteed one-day package.
- Liangzhu is a dedicated suburban heritage day, not an extra stop on a central West Lake circuit.
- Wuzhen belongs to Tongxiang, Jiaxing, and must not be described as a Hangzhou urban attraction.

## Explicit exclusions

- No West Lake “ten views” checklist.
- No White Snake plot retelling.
- No day-by-day itinerary presented as the Hub's main shape.
- No fixed train timetable, fare, metro last service, attraction price, reservation quota or event calendar.
- No claim that Wuzhen, Shaoxing or Huangshan is inside Hangzhou's urban visitor core.
- No direct modification of public pages, homepage, registry, sitemap, Search Map, entity library or indexability.
- No AI-generated documentary travel image.

## Update triggers

Re-review all three language files together when any of the following changes:

1. a Hangzhou destination entity or Zhejiang parent is added centrally;
2. the destination-hub renderer or canonical path policy changes;
3. HGH rail/metro access changes materially;
4. a Hangzhou passenger station opens, closes or changes its public role;
5. Lingyin or Liangzhu introduces a new foreign-passport reservation workflow;
6. West Lake scenic-area traffic or access policy changes materially;
7. one of the six required handoff articles changes canonical path or scope;
8. Wuzhen, Shaoxing or Huangshan route guidance gains a more specific published owner.

`CITY HUB DRAFT READY — CENTRAL REVIEW REQUIRED`
