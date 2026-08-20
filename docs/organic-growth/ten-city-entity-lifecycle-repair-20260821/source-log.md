# Ten-city source log

Reviewed: **2026-08-21 (Asia/Shanghai)**.

This is a network audit log, not a frozen timetable. Stable administrative and spatial relationships may support the graph; opening times, terminal assignments, train services, ticket inclusion, reservations, port operating conditions and access rules remain dynamic and require rechecking on the actual release branch.

## Repository and release evidence

| Evidence | Observation | Use |
|---|---|---|
| `origin/main@cbbfddabe2513874cc4e55981e08244db7338ff9` | Historical pre-merge baseline | Explains why the superseded audit initially saw only five runtime Hubs; not current lifecycle evidence |
| PR #74 initial reviewed head `90e4117f30b8b012eb562c4468434b8d3403c170` | Historical draft head | Superseded by the final merged head |
| PR #74 final head `b66fc6cbca6f040a65db0d7e3727e3b2dac24580` | Merged on 2026-08-20 | Final PR code supplied to main |
| `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01` | Merge commit for PR #74 | Implementation baseline used by this branch |
| `lib/destinationHubs.ts` | Seven published definitions after the merge, including Hangzhou and Zhangjiajie with `datePublished: 2026-08-20` | Public City Hub inventory and metadata authority |
| `lib/destinationHubRuntime.ts` | Seven trilingual body loaders | Runtime coverage for all seven published Hubs |
| `content/entities/core-places.json` | Canonical country/city records | Administrative parent correction target |
| `lib/searchPlatformContentAdapter.ts` | Current-main location of ten destination-token mappings | Transitional evidence only; employee 8 moves this authority to `lib/searchPlatformGuidePolicy.ts` |
| `docs/organic-growth/city-hub-drafts/` | Main contains packages for the five original published cities, Hangzhou and Chongqing | Detailed source, image, link and QA evidence |
| `origin/codex/city-hub-guilin-draft-20260815@7b53265` and `origin/codex/city-hub-shenzhen-draft-20260815@ceefc4b` | Remote internal packages for Guilin and Shenzhen | Reproducible docs-only evidence; not public runtime state |

## Build and route evidence

The publication contract at the reviewed commit is:

- seven destination registry entries and 21 locale routes;
- Hangzhou and Zhangjiajie contribute six published routes with non-null 2026-08-20 publication dates;
- Chongqing, Guilin and Shenzhen have entity records but no Hub registry entries, loaders, discovery cards or destination routes;
- the merged PR #74 baseline is expected to produce 649 sitemap `<loc>` entries.

This section does not pre-claim a build result. The commands, output counts and filesystem/sitemap assertions actually run on the repair branch are recorded in `qa.md` after verification.

## Official source pools by city

### Beijing

- [Beijing municipal overview](https://english.beijing.gov.cn/beijinginfo/facts/202006/t20200601_1912281.html) — city context.
- [Palace Museum international visitor notice](https://intl.dpm.org.cn/news/detail/97857.html) and [official ticket platform](https://ticket.dpm.org.cn/) — Forbidden City execution; dynamic.
- [National Museum visit information](https://en.chnmuseum.cn/visit_692/) — reservation/visit evidence; dynamic.
- [Beijing parks visitor material](https://english.beijing.gov.cn/specials/parktours/guidevisitors/templeofheaven/) and [Summer Palace guide](https://english.beijing.gov.cn/specials/parktours/guidevisitors/summerpalace/) — attraction relationship and visitor task.
- Full package: `docs/organic-growth/city-hub-drafts/beijing/source-log.md`.

### Shanghai

- [Shanghai government scenic-place index](https://english.shanghai.gov.cn/en-ScenicSpots/index.html) — city attraction context.
- [Shanghai Museum People's Square visit page](https://www.shanghaimuseum.net/mu/frontend/pg/m/en/service/visit-west) and [East Museum visit page](https://www.shanghaimuseum.net/mu/frontend/pg/en/service/visit-east) — separate museum sites and dynamic visit rules.
- [Shanghai transport guidance](https://english.shanghai.gov.cn/en-Transportation/20231214/649e06ea38f74aaeb573fa2debbe97d3.html), [Pudong Airport](https://www.shairport.com/enpd/) and [Hongqiao Airport](https://www.shairport.com/enhq/) — gateway topology; dynamic.
- Full package: `docs/organic-growth/city-hub-drafts/shanghai/source-log.md`.

### Xi'an

- [Xi'an government city-wall attraction page](https://en.xa.gov.cn/CultureTravel/Attractions/1691691501245550594.html) and [Giant Wild Goose Pagoda page](https://en.xa.gov.cn/CultureTravel/Attractions/1691691504798126082.html) — cluster context.
- [Xi'an Xianyang Airport transport page](https://www.xxia.com/jcjt/czc.htm) — gateway evidence; dynamic.
- [Railway 12306](https://www.12306.cn/en/index.html) — current rail query authority; dynamic.
- [Emperor Qinshihuang's Mausoleum Site Museum visitor guide](https://www.bmy.com.cn/guide/) — Lintong execution and ticket/visit evidence; dynamic.
- Full package: `docs/organic-growth/city-hub-drafts/xian/source-log.md`.

### Chengdu

- [Chengdu airport group](https://www.cdairport.com/index.aspx/en/) and [Sichuan Airports Group](https://www.sctfia.com/) — TFU/CTU distinction; dynamic.
- [Chengdu Metro](https://www.chengdurail.com/info/1151/33052.htm) — urban gateway/access evidence; dynamic.
- [Chengdu Museum](https://www.cdmuseum.com/jianjie.html) — central culture cluster.
- [Chengdu Research Base introduction](https://www.panda.org.cn/en/about/introduction/) and [official ticket information](https://www.panda.org.cn/en/service/ticket/) — panda-site task; dynamic.
- Full package: `docs/organic-growth/city-hub-drafts/chengdu/source-log.md`.

### Guangzhou

- [Guangzhou government city material](https://www.eguangzhou.gov.cn/gzlatest/content/post_42957.html) — city context.
- [Baiyun Airport terminal guide](https://www.baiyunairport.com/byairport-web/guide/terminals?urlKey=terminals) and [ground transport](https://www.baiyunairport.com/byairport-web/traffic/index?urlKey=to-from-airport) — terminal/gateway facts; dynamic.
- [Guangzhou government transport notice](https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10648700.html) — station operating context; dynamic.
- Full package: `docs/organic-growth/city-hub-drafts/guangzhou/source-log.md`.

### Hangzhou

- [UNESCO West Lake Cultural Landscape](https://whc.unesco.org/en/list/1334/) and [West Lake official site](https://westlake.hangzhou.gov.cn/) — lake/city cultural-landscape relationship.
- [Hangzhou Xiaoshan Airport metro guide](https://www.hzairport.com/en/guide/metro.html) and [Railway 12306](https://www.12306.cn/en/index.html) — gateway facts; dynamic.
- [Liangzhu official site](https://www.lzsite.cn/) and [UNESCO Archaeological Ruins of Liangzhu City](https://whc.unesco.org/en/list/1592/) — separate suburban heritage day.
- Published source package: `docs/organic-growth/city-hub-drafts/hangzhou/source-log.md` in the reviewed main baseline.

### Zhangjiajie

- [UNESCO Wulingyuan](https://whc.unesco.org/en/list/640/) — protected landscape identity.
- [Zhangjiajie municipal government](https://www.zjj.gov.cn/) — official city context.
- [Railway 12306](https://www.12306.cn/en/index.html) — current trains; dynamic.
- [Civil Aviation Administration airport directory material](https://www.caac.gov.cn/GYMH/MHGK/JCJSDT/201511/t20151130_11065.html) — DYG gateway identity.
- Limitation: the live Hub still lacks an independent source/asset ledger. The sources above are embedded in the merged body and should be expanded as live-page maintenance, not treated as a reason to withdraw the route.

### Chongqing

- [Chongqing municipal overview](https://english.cq.gov.cn/aboutchongqing/overview/) and [official geography overview](https://english.cq.gov.cn/aboutchongqing/overview/Geography/) — municipality and regional scale.
- [Chongqing transport commission](https://jtysw.cq.gov.cn/sy_240/bmdt/202602/t20260224_15449936.html) and [municipal rail update](https://www.cq.gov.cn/ywdt/jrcq/202606/t20260626_15778151.html) — station role; dynamic.
- [Official Wulong natural-heritage material](https://english.cq.gov.cn/aboutchongqing/culture/NaturalHeritage/202606/t20260612_15751145.html) — outer municipality branch.
- [Official Dazu cultural-heritage material](https://english.cq.gov.cn/aboutchongqing/culture/CulturalHeritage/) — separate outer branch.
- Full package: `docs/organic-growth/city-hub-drafts/chongqing/source-log.md` and the current `chongqing-railway-station-selector/source-log.md`.

### Guilin

- [Guilin Liangjiang Airport overview](https://gl.airport.gx.cn/html/guanyuwomen/) and [airport ground transport](https://gl.airport.gx.cn/html/jiaotongxinxi/jiaotonggongju/snjcdb/73.html) — gateway facts; dynamic.
- [Railway 12306](https://www.12306.cn/en/index.html) — station/service queries; dynamic.
- [Li River scenic-area transport information](https://www.liriver.com.cn/page/article/lyfw.jtcx) and [official ticket information](https://en.liriver.com.cn/page/article/lyfw.pwxx) — water-product workflow; dynamic.
- [Guangxi natural-resources material](https://dnr.gxzf.gov.cn/villageNews/show/450321?id=1240) — regional settlement/landscape context.
- Internal package: `docs/organic-growth/city-hub-drafts/guilin/source-log.md` on `origin/codex/city-hub-guilin-draft-20260815@7b53265`.

### Shenzhen

- [Shenzhen Port Office checkpoint services](https://ka.sz.gov.cn/bmfw/katgfw/index.html), [Hong Kong Immigration control points](https://www.immd.gov.hk/eng/contactus/control_points.html) and [MTR cross-boundary guidance](https://www.mtr.com.hk/en/customer/services/to_from_lw_lmc.html) — checkpoint distinctions; dynamic.
- [Shenzhen Airport transport](https://www.szairport.com/szairporten/lwszsq/tiaoz.shtml) — SZX/rail naming; dynamic.
- [Shenzhen government train guide](https://www.sz.gov.cn/en_szgov/life/transport/trains/content/post_11538776.html), [metro guide](https://www.sz.gov.cn/en_szgov/life/transport/metro/) and [Railway 12306](https://www.12306.cn/en/index.html) — separate rail/metro systems; dynamic.
- [Shenzhen municipal profile](https://www.sz.gov.cn/en_szgov/aboutsz/profile/) — city context.
- Internal package: `docs/organic-growth/city-hub-drafts/shenzhen/source-log.md` on `origin/codex/city-hub-shenzhen-draft-20260815@ceefc4b`.

## Administrative source materialisation gap

The repository's initial core place records used empty `sourceIds`, and no structured `content/sources/` administrative snapshot set exists yet. This branch does not invent hashes or pretend that a URL is an archived snapshot. Official sources are recorded here; a later schema pass should retrieve and hash the selected pages, create `source-snapshot` envelopes, and then attach their IDs to the province and city entities.

## Evidence rules

- UNESCO proves listed-property scope and significance, not current ticketing or local transport.
- A government tourism page can prove how a destination currently presents a place; it does not automatically prove every historical claim.
- Railway 12306, airport operators, port authorities and attraction operators are dynamic operational sources and need rechecking near release and travel.
- A source in a docs package supports review, not runtime publication.
- PR #74 is both merged into this baseline and designated by central as the live seven-Hub release; future PR merges must still not be assumed live without the corresponding central decision.
- A `200` response proves route availability at the check time, not Google index inclusion.


## Employee 8 mapping-policy dependency

- Branch: `origin/codex/seo-technical-foundation-20260820`
- Commit: `a22beed2440be800513a0f9db588364b6eda3d91`
- State checked 2026-08-21: unmerged; no GitHub PR found for the exact head.
- Proposed authority: `lib/searchPlatformGuidePolicy.ts`, with `resolveGuideEntities()` and `check-guide-entity-coverage.mjs`.
- Repair boundary: no test in this branch treats `lib/searchPlatformContentAdapter.ts` as the permanent mapping owner. Parent corrections remain in the current canonical entity registry; central must rerun employee 8's behavior-level coverage tests after integration.
