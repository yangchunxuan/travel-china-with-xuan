# Guangzhou destination hub source log

**Draft:** `city-hub-guangzhou-draft-20260815`
**Base commit:** `cc6be75e59155935f321df0334588b52769eb6e4`
**Source review date:** 2026-08-15
**Scope:** Draft content only. No public route, registry, sitemap, Search Map or indexability change is included.

## 1. Editorial and repository authorities

### R-01 — Article production workflow

- Repository path: `docs/article-production-lite.md`
- Use: Confirmed the repository preference for independent content folders, deterministic validation and no manual central-registry edit.
- Application to this task: The Guangzhou work remains a review package under `docs/organic-growth/city-hub-drafts/guangzhou/`, not a published guide folder. No generated registry file is included.

### R-02 — Search Platform Phase 1 specification

- Repository path: `docs/homeground-search-platform-phase-1-spec.md`
- Relevant sections: 4.4, 4.5 and 7.3.
- Use:
  - the destination hub owns the broad “Guangzhou travel guide” intent;
  - a second generic `/guides/guangzhou-travel-guide/` must not be created;
  - a destination prototype does not become indexable automatically;
  - supporting articles qualify only through reviewed entity service relationships;
  - the destination registry remains the single future state authority.
- Application: This patch proposes `/destinations/guangzhou/` and locale variants only inside the draft. It does not create those routes.

### R-03 — Search Map

- Repository path: `docs/organic-growth/search-map.json`
- Snapshot used: 2026-08-15.
- Use:
  - preserved one canonical owner per task;
  - identified the existing Guangzhou airport, morning-tea, Hong Kong, Macao, three-city-order and archaeology owners;
  - treated airline allocation, airport access, railway service allocation and cross-boundary transport as high-volatility facts;
  - checked that a city hub draft does not silently authorise publication or central entity creation.
- Existing owner boundaries retained:
  - `guangzhou-baiyun-airport-t2-t3`
  - `guangzhou-hong-kong-transport-route`
  - `guangzhou-macau-transport-route`
  - `guangzhou-shenzhen-hong-kong-route-order`
  - `how-guangzhou-morning-tea-works`
  - `when-metro-construction-meets-archaeology`

### R-04 — Core places

- Repository path: `content/entities/core-places.json`
- Use: Confirmed that `country-china` and `city-zhangjiajie` exist in the central file at the base commit. No Guangzhou or Guangdong node exists there.
- Application:
  - `city-guangzhou` and `province-guangdong` are marked `proposed` in `entity-graph.json`;
  - the central entity file is not changed;
  - Hong Kong and Macao are not placed under Guangdong.

### R-05 — Existing Guangzhou guide folders and metadata

Reviewed at the base commit:

- `content/guides/guangzhou-baiyun-airport-t2-t3/`
- `content/guides/guangzhou-hong-kong-transport-route/`
- `content/guides/guangzhou-macau-transport-route/`
- `content/guides/guangzhou-shenzhen-hong-kong-route-order/`
- `content/guides/how-guangzhou-morning-tea-works/`
- `content/guides/when-metro-construction-meets-archaeology/`

Related planning support reviewed:

- `content/guides/china-high-speed-train-first-time-guide/`
- `content/guides/china-hotel-near-metro/`
- `content/guides/china-last-night-before-international-flight/`

Use: Preserved published titles, locale paths and subject boundaries. The hub summarises the decision and sends the reader to the owner for execution details.

## 2. Dynamic fact ledger

The following facts can alter a traveller’s terminal, station or border decision. They are deliberately stated as dated snapshots and paired with a recheck rule.

### D-01 — Baiyun Airport T1 passenger suspension

- Claim used: From 7 May 2026, Terminal 1 ceased passenger operations during upgrading; Metro Airport South and intercity Baiyun Airport South became non-stopping stations.
- Primary source:
  - Foreign Affairs Office of Guangzhou Municipal Government, “Guangzhou Baiyun Int'l Airport to relocate all Terminal 1 airlines to Terminal 3 from May 7”
  - https://www.eguangzhou.gov.cn/gzlatest/content/post_42957.html
- Follow-up source:
  - “A temporary goodbye to T1: Guangzhou Baiyun Int'l Airport completes airlines' shift to T3 and issues travel guide”
  - https://www.eguangzhou.gov.cn/gzlatest/content/post_43024.html
- Volatility: Critical.
- Hub treatment: The body gives the dated status but does not promise a reopening date.
- Recheck trigger: Any Baiyun Airport notice about T1 reopening, partial reuse or a change to Airport South stopping patterns.

### D-02 — T2 and T3 access

- Claims used:
  - T2 has direct Metro Line 3 access at Airport North and direct Guangdong Intercity access at Baiyun Airport North.
  - T3 has direct Guangdong Intercity access at Baiyun Airport East.
  - At the 15 August 2026 review, T3 did not have a direct metro station; the public metro alternative involved Gaozeng and an airport feeder.
- Primary sources:
  - Baiyun Airport terminal guide: https://www.baiyunairport.com/byairport-web/guide/terminals?urlKey=terminals
  - Baiyun Airport ground transport: https://www.baiyunairport.com/byairport-web/traffic/index?urlKey=to-from-airport
  - Guangzhou T3 feeder update: https://www.eguangzhou.gov.cn/gzservice/content/post_42999.html
  - Guangzhou East Ring/Pazhou–Lianhuashan intercity opening: https://www.gz.gov.cn/zt/qltjygadwqjsxsdzgzlfzdf/mtjj/content/post_10464347.html
- Volatility: Critical.
- Hub treatment: No permanent timetable or fare is published. Readers are routed to the airport owner.
- Recheck trigger: New metro opening, feeder-hour change, terminal transfer change or station stopping-pattern change.

### D-03 — T3 flight role

- Claim used: T3 is an active domestic, international and regional terminal.
- Primary sources:
  - T3 opening: https://www.eguangzhou.gov.cn/gzlatest/content/post_39622.html
  - International operations transition: https://www.eguangzhou.gov.cn/gzlatest/content/post_40760.html
  - May 2026 completion of the T1-to-T3 move: https://www.eguangzhou.gov.cn/gzlatest/content/post_43024.html
- Volatility: Critical at airline level.
- Hub treatment: The draft does not freeze an airline list. Exact flight, date and operating carrier are the authority.
- Recheck trigger: Airline relocation, codeshare change or airport-wide operating adjustment.

### D-04 — Guangzhou Railway Station role from 26 January 2026

- Claim used: Guangzhou Railway Station shifted its primary role to high-speed operations and no longer handles conventional passenger trains as origins or termini after the 26 January 2026 timetable change.
- Primary source:
  - Guangzhou Municipal Government, “广铁1月26日实施新列车运行图 广州站不再办理普速列车始发终到业务”
  - https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10648700.html
- English government summary:
  - https://www.gz.gov.cn/guangzhouinternational/home/citynews/content/post_10663571.html
- Volatility: High.
- Hub treatment: The station is not described by its older conventional-train role.
- Recheck trigger: National timetable change or Guangzhou hub service redistribution.

### D-05 — Guangzhou Baiyun Station and Guangzhou East allocation

- Claims used:
  - Guangzhou Baiyun is a major conventional long-distance hub with selected high-speed and Guangzhou–Shenzhen services.
  - Guangzhou East has substantial high-speed/intercity service and useful city access.
- Government source for the 2025 redistribution baseline:
  - https://www.gz.gov.cn/guangzhouinternational/home/citynews/content/post_10326038.html
- 2026 overriding source for Guangzhou Station:
  - https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10648700.html
- Volatility: High.
- Hub treatment: Directional tendencies are stated, but every train to Hong Kong, Shenzhen, Changsha or Zhangjiajie remains a date-specific 12306 search.
- Recheck trigger: Every national railway timetable adjustment.

### D-06 — Official rail inventory

- Source: China Railway 12306
- English entry: https://www.12306.cn/en/index.html
- Use: Final authority for exact train, date, ticketed station name and live inventory.
- Hub treatment: The page instructs travellers to search full Chinese station names. It publishes no timetable or fare.
- Volatility: Continuous.

### D-07 — Guangzhou–Hong Kong route

- Sources:
  - China Railway 12306 cross-boundary products: https://mobile.12306.cn/otsmobile/h5/otsbussiness/newTicketRule/newTicketRule-GuangShenGangThirtyDay.html
  - MTR High Speed Rail trip planner: https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html
  - Hong Kong control-point information: https://www.sb.gov.hk/eng/special/bound/control.html
- Use: Supports the distinction among Guangzhou origin station, West Kowloon border process and Hong Kong final address.
- Volatility: Critical.
- Hub treatment: Guangzhou South is the first search, not an exclusive answer; Guangzhou East is date-specific. Full execution remains with `guangzhou-hong-kong-transport-route`.

### D-08 — Guangzhou–Macao route

- Sources inherited from the existing owner:
  - China Railway 12306: https://www.12306.cn/en/index.html
  - Macao Customs passenger-port information: https://www.customs.gov.mo/cn/notice_passengers_item4.html
  - Hengqin current transport guidance: https://www.hengqin.gov.cn/macao_zh_hans/ztjh/qyh/mlhq/content/post_3825001.html
- Use: Supports the hub’s high-level distinction between a day extension and an overnight.
- Volatility: Critical.
- Hub treatment: No port hours, immigration eligibility or step-by-step border chain is repeated.

### D-09 — Canton Fair calendar effect

- Official source: China Import and Export Fair
- English: https://cief.cantonfair.org.cn/en/cfintro/cfintro.html
- Chinese: https://cief.cantonfair.org.cn/cn/cfintro/cfintro.html
- Use: Establishes the Pazhou venue and phased event structure.
- Volatility: Event-calendar.
- Hub treatment: The draft gives ordinary leisure travellers a hotel and crowd adjustment rule, not a business manual and not a permanent session calendar.
- Recheck trigger: Every fair session.

## 3. Destination and spatial sources

### S-01 — Guangzhou international visitor framing

- Source: Guangzhou International, Foreign Affairs Office of Guangzhou Municipal Government
- Root: https://www.eguangzhou.gov.cn/
- Use: International-gateway language, official English place names and traveller-facing city context.

### S-02 — Shamian

- Official international-neighbourhood page:
  - https://www.eguangzhou.gov.cn/gzspecialreports/intlblocks/details/shamian/content/post_31831.html
- Use: Supports Shamian as a compact Liwan island with a distinct historic urban landscape.
- Boundary: The draft does not present Shamian as the whole of Liwan.

### S-03 — Canton Tower and the new central axis

- Official Guangzhou page:
  - https://www.eguangzhou.gov.cn/gzspecialreports/intlblocks/details/cantontower/content/post_31829.html
- General official city photo feature:
  - https://www.eguangzhou.gov.cn/gznewsphotos/content/post_30437.html
- Use: Supports the north-bank/south-bank relation between Zhujiang New Town and Canton Tower.
- Boundary: The draft does not become a night-view list or a tower ticket guide.

### S-04 — Morning tea

- Canonical Homeground owner: `how-guangzhou-morning-tea-works`
- Official and evidence sources are retained in that owner.
- Use in this hub: Morning tea is named as a reason to stay and a time-allocation factor.
- Boundary: No restaurant ranking, full dish glossary, tea-fee explanation or etiquette guide is repeated.

### S-05 — Urban archaeology

- Canonical Homeground owner: `when-metro-construction-meets-archaeology`
- Use in this hub: Beijing Road is described as a place where older road layers help explain Guangzhou’s repeated urban construction.
- Boundary: The national survey–excavation–protection–construction decision chain remains in the existing owner.

## 4. Internal-link status record

All selected internal links have:

1. a guide folder at the base commit;
2. a locale path in the guide metadata;
3. a published/indexable or published owner record in the Search Map snapshot used for this draft;
4. an exact path listed in `internal-links.md`.

The draft contains no link to the proposed destination URL because it does not yet exist publicly. It also contains no link to `/guides/guangzhou-travel-guide/`.

Selected owners:

- `/guides/guangzhou-baiyun-airport-t2-t3/`
- `/guides/guangzhou-hong-kong-transport-route/`
- `/guides/guangzhou-macau-transport-route/`
- `/guides/guangzhou-shenzhen-hong-kong-route-order/`
- `/guides/how-guangzhou-morning-tea-works/`
- `/guides/when-metro-construction-meets-archaeology/`
- `/guides/china-high-speed-train-first-time-guide/`
- `/guides/china-hotel-near-metro/`
- `/guides/china-last-night-before-international-flight/`

**Release recheck:** Before a central implementation links the future destination page, run an HTTP 200 check for all locale paths against the deployed site. This draft package itself does not change deployment state.

## 5. Evidence and wording rules applied

- Airport and railway claims carry an explicit review date or a travel-date recheck instruction.
- No static airline list is treated as durable.
- No permanent train timetable, fare, port hours or border-eligibility claim is published.
- “Usually,” “first search,” “date-specific” and “compare” are used where service allocation can change.
- Hong Kong and Macao are Special Administrative Regions under China, not Guangdong city children.
- Shunde is a district of Foshan, not a Guangzhou district.
- Chimelong is a separate Panyu zone, not a central-city attraction.
- The broad Guangzhou travel-guide query belongs to the destination hub; the draft does not create a competing guide URL.

## 6. Central review triggers

Central review should return this draft for source refresh if any of the following changes before implementation:

- T1 resumes passenger service;
- T3 gains a direct metro station;
- Airport South or Baiyun Airport South resumes passenger stops;
- Guangzhou Railway Station, Guangzhou Baiyun or Guangzhou East receives another major service reallocation;
- direct Hong Kong station inventory materially changes;
- a new Guangzhou stay-area or station-choice owner is approved;
- a Canton Fair session materially changes the event-area planning note;
- the central entity library adds Guangzhou or Guangdong with IDs different from this proposal.
