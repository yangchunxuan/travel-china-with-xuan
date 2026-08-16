# Source log — Xi’an Destination Hub draft

Status: `CITY HUB DRAFT — CENTRAL REVIEW REQUIRED`

Research and operational review date: **2026-08-15**

Target branch: `codex/city-hub-xian-draft-20260815`

Verified source baseline: `origin/main` at `cc6be75e59155935f321df0334588b52769eb6e4`

Proposed canonical owner: `/destinations/xian/`

Primary entity: `city-xian` (existing; English alias `Xian` retained)

Proposed parent: `province-shaanxi` (proposal only; no province-wide data is inherited into the city page)

## 1. Editorial ownership and exclusions

This destination hub owns the broad first-visit decision:

- whether Xi’an belongs in a first China route;
- one-, two-, three- and four-night trade-offs, counted through protected sightseeing days;
- the city-level choice among Bell Tower/inside the wall, Yongningmen and Dayanta/Xiaozhai;
- the relationship among central Xi’an, south-side Xi’an, Lintong and the external Mount Hua extension;
- the practical role of XIY, Xi’an North, Xi’an Railway Station and Xi’an East;
- Xi’an’s route role before Beijing, Chengdu, Luoyang, Pingyao or another gateway.

It does **not** own the following execution tasks:

| Existing owner | Task retained by that owner | Hub boundary |
|---|---|---|
| `terracotta-warriors-without-tour` | Passport reservation, official booking channels, entry, transport, pit order, Lishan Garden shuttle and return | The hub protects Lintong as a substantial day and explains where it sits |
| `shaanxi-history-museum-booking-and-collection-plan` | Main Building versus Qin-Han Gallery, passport reservation, release timing, current hours and collection route | The hub decides whether the south-side museum cluster fits the available days |
| `xian-where-to-stay-city-wall-or-dayanta` | Detailed lodging comparison, exact gate, metro exit, curb access, room and last-mile checks | The hub gives the city-level base decision |
| `beijing-xian-chengdu-route-order` | Direction, international gateways and usable-half-day accounting across the three-city route | The hub describes Xi’an’s role without rebuilding the route article |
| `chinese-city-walls-gates-and-urban-order` | Material-status and urban-reading method for walls and gates | The hub treats the City Wall as one city cluster and avoids appearance-based authenticity claims |
| `ritual-bronze-vessels-and-inscriptions` | Evidence-led museum object reading | The hub points museum-focused readers to that method rather than becoming a bronze-history article |

No `/guides/xian-travel-guide/` page is proposed. Broad “Xi’an travel guide,” “first trip,” “how many days,” “where to stay” and onward-route intent belongs to the destination hub.

## 2. Repository governance reviewed

| Repository source | What was checked | Result |
|---|---|---|
| `docs/article-production-lite.md` | Branch hygiene, source hierarchy, image rules, online-200 internal-link rule, no public-system edits and `git diff --check` | Applied to this draft |
| `docs/homeground-search-platform-phase-1-spec.md` | Destination-hub page family, canonical ownership, entity and transport graph separation, especially sections 4.4, 4.5 and 7.3 | Applied; transport nodes are not treated as city attractions merely because they serve Xi’an |
| `docs/organic-growth/search-map.json` | Existing query owners and collision risk | No Search Map edit; existing owners retain their tasks |
| `content/entities/core-places.json` | `city-xian`, English spelling and alias | Existing entity preserved: `Xi'an`, alias `Xian` |
| `app/sitemap.ts` | Formal sitemap generation | Sitemap is manifest-generated; no sitemap edit made |
| `lib/searchPlatformManifest.ts` | Protected manifest and indexability guards | No manifest, registry, baseline or indexability edit made |
| all six owner folders, metadata and source logs | Scope, current facts, links and update triggers | The hub delegates detailed execution to those owners |
| remote branches | Duplicate Xi’an/Terracotta work | Existing article work was identified; no duplicate guide was created |

## 3. Official and primary sources

The bodies deliberately avoid live fares, fixed journey durations, static metro timetables and promises of ticket availability. Every dynamic field below has a recheck trigger.

### Xi’an Municipal Culture and Tourism / Xi’an Municipal Government

1. **Xi’an A-level scenic-area information table**
   URL: https://www.xa.gov.cn/ztzl/ztzl/lzledc/ywdc/1824366329290301442.html
   Checked: 2026-08-15
   Used for: municipal location relationships showing the Qin mausoleum museum and Huaqing Palace in Lintong, the Giant Wild Goose Pagoda and Shaanxi History Museum in Yanta, and the City Wall as a central attraction.
   Boundary: the list is not used as an opening-hours, quality or visit-duration source.
   Update trigger: annual list or address/classification change.

2. **Bell and Drum Towers visitor information**
   URL: https://en.xa.gov.cn/CultureTravel/Attractions/1691691501245550594.html
   Checked: 2026-08-15
   Used for: the Bell Tower’s old-city position and Zhonglou as a navigation node.
   Boundary: no permanent hours, ticket price or performance schedule is copied.
   Update trigger: access, station, entrance or operating change.

3. **Giant Wild Goose Pagoda visitor information**
   URL: https://en.xa.gov.cn/CultureTravel/Attractions/1691691504798126082.html
   Checked: 2026-08-15
   Used for: the pagoda’s south-side location and Dayanta relationship.
   Boundary: the contemporary themed district around it is not represented as surviving Tang urban fabric.
   Update trigger: access or visitor-operation change.

4. **Xi’an City Wall dated event/access notice**
   URL: https://www.xa.gov.cn/index/tttp/2001482948069105666.html
   Checked: 2026-08-15
   Used for: evidence that named gates, including Yongningmen, operate as distinct access/event nodes and that visitor operations can be date-specific.
   Boundary: the dated event plan is not reused as a permanent entrance list.
   Update trigger: every event, maintenance or access notice.

### Xi’an Xianyang International Airport and airport access

5. **Xi’an Xianyang International Airport ground-transport page**
   URL: https://www.xxia.com/jcjt/czc.htm
   Checked: 2026-08-15
   Used for: terminal-specific ground-transport points and the need to use the actual terminal.
   Boundary: no queue, fare, journey time or vehicle-availability guarantee is published.
   Update trigger: terminal allocation, pickup-zone or ground-transport change.

6. **Official public-service guidance for Terminal 5 and Metro Line 14**
   URL: https://www.xixianxinqu.gov.cn/zwgk/zcwd/jycy/1892481399452139521.html
   Checked: 2026-08-15
   Used for: T5 has its own airport metro relationship and is distinct from the station serving other terminals.
   Boundary: no first/last-train times are frozen in the hub.
   Update trigger: terminal, station naming or Line 14 operation change.

### Rail and metro

7. **China Railway 12306**
   URL: https://www.12306.cn/en/index.html
   Checked: 2026-08-15
   Used for: the exact travel date and complete station pair are the source of truth for a selected train.
   Boundary: no train number, fare, duration, inventory or universal station assignment is copied.
   Update trigger: every journey search and ticket purchase.

8. **Xi’an East opening — Xi’an Municipal Government**
   URL: https://en.xa.gov.cn/MediaCenter/News/2072253459180654594.html
   Checked: 2026-08-15
   Used for: Xi’an East began operation on 30 June 2026 and has a Metro Line 5 relationship; old station assumptions can therefore be stale.
   Boundary: this does not mean every Beijing, Chengdu, Luoyang or other service uses Xi’an East. The ticket controls.
   Update trigger: material station-use, access or metro change.

9. **Existing Homeground rail and lodging owner research**
   Repository sources: `beijing-xian-chengdu-route-order/source-log.md` and `xian-where-to-stay-city-wall-or-dayanta/source-log.md`.
   Checked for this hub: 2026-08-15
   Used for: Xi’an North, Xi’an Railway Station and Xi’an East must remain separate fields.
   Boundary: current entrances, transfer corridors and operating times require a live check.

### Emperor Qinshihuang’s Mausoleum Site Museum

10. **Official visitor guide**
    URL: https://www.bmy.com.cn/guide/
    Checked: 2026-08-15; detailed owner last fully reviewed 2026-08-11
    Used for: real-name reservation, original passport, official channels and the linked relationship between the Terracotta Warriors visitor area and Lishan Garden.
    Boundary: ticket inventory, temporary capacity, entry periods, holiday hours and closures remain dynamic.

11. **Official transport page**
    URL: https://www.bmy.com.cn/guide/368.html?_isa=1
    Checked: 2026-08-15; detailed owner review 2026-08-11
    Used for: Lintong is a real transfer from central Xi’an rather than a central hotel-area attraction.
    Boundary: no unofficial bus interval or last-return time is copied.

12. **One-ticket and Lishan shuttle notice**
    URL: https://www.bmy.com.cn/news/news/980.html
    Checked: 2026-08-15 against the live-guide relationship; detailed owner review 2026-08-11
    Used for: the two visitor areas and official shuttle relationship.
    Boundary: boarding points and operation must be rechecked before publication and travel.

### Shaanxi History Museum

13. **Main Building visitor guide**
    URL: https://www.sxhm.com/guide.h
    Checked: 2026-08-15; detailed owner review 2026-08-12
    Used for: passport reservation, the Main Building venue and the need to distinguish a successful order from traveller-data prefill.
    Boundary: release timing, seasonal hours, no-show rules and paid-exhibition relationships remain in the detailed owner.

14. **Official English visit page**
    URL: https://www.sxhm.com/en/visit.html
    Checked: 2026-08-15
    Used for: separate addresses and operating identities of the Main Building and Qin-Han Gallery.
    Boundary: one venue’s rules are not generalized to the other.

15. **Current prohibited-items notice**
    URL: https://www.sxhm.com/guide/visit/detail/16043.html
    Checked: 2026-08-15; detailed owner review 2026-08-12
    Used for: luggage and security can make a transfer-day museum plan fail.
    Boundary: detailed handling stays in the museum owner.

### Mount Hua / Huayin / Weinan direction

16. **Shaanxi culture-and-tourism risk notices**
    URLs:
    - https://whhlyt.shaanxi.gov.cn/sy/wlyw/202601/t20260118_3605787.html
    - https://whhlyt.shaanxi.gov.cn/sy/wlyw/202602/t20260221_3614312.html
    Checked: 2026-08-15
    Used for: mountain and Huayin-area conditions can be materially affected by wind, snow, temperature and official risk notices.
    Boundary: dated warnings are examples of operational variability, not forecasts for another date.

No permanent Mount Hua ticket price, opening time, ropeway schedule or capacity is copied. Central publication review must reopen the official scenic-area booking and notice channel for the exact season and travel date.

## 4. Stable facts, dynamic facts and editorial judgments

### Stable geographic and structural facts used

- `city-xian` is the primary city entity; English alias `Xian` remains available.
- Lintong District is within Xi’an’s municipal structure but outside the central hotel field used by most first visitors.
- XIY is geographically on the Xianyang side and serves Xi’an; it is not represented as a central-city attraction.
- Xi’an North, Xi’an Railway Station and Xi’an East are separate rail nodes.
- Mount Hua is an external Huayin/Weinan-direction extension, not a fourth central Xi’an cluster.
- Shaanxi is proposed as the city’s province parent, but province-wide data is not inherited into the city page.

### Dynamic facts deliberately not frozen

- attraction opening times, reservation release times, inventory and temporary capacities;
- airport terminal assignments and station operating times;
- train numbers, station pairs, fares, durations and availability;
- metro first/last trains, exits, lift operation and disruption notices;
- City Wall entrances, cycling, performances, night access and maintenance;
- Mount Hua weather, route status, ropeways, ticket controls and crowd limits.

### Homeground editorial judgments

- Three nights is the balanced first-visit default because it normally yields two protected full days.
- One night is triage; two nights normally protects one full day; Mount Hua normally requires another day and often a fourth night.
- The hotel should be chosen by where ordinary nights end and by the complete entrance/last-mile chain, not by a one-off pickup.
- The four planning clusters are a traveller-facing model, not an official administrative taxonomy.
- Arrival, departure and hotel-change days start at zero sightseeing credit until the full door-to-door chain proves otherwise.

These are conservative planning judgments, not operator guarantees.

## 5. Production-site and internal-link review

The formal repository owner records confirm that all six required articles exist in the reviewed main commit with English, Simplified Chinese and Korean content resources. That establishes content ownership and intended localized paths.

The production guide index retrieved during review showed 13 deployed public guides and did not expose the six recent Xi’an owner articles. Search-engine discovery is not an HTTP-status test, and direct final HTTP status for all 18 localized owner URLs could not be independently established from the available execution environment.

To enforce the user’s **online-200-only** rule:

- the three language bodies contain no active Markdown internal links;
- they identify the six owners by title and slug;
- `entity-graph.json` records the delegation relationships;
- `internal-links.md` records the exact conditional URLs and a release test;
- the links may be activated only after every final localized URL returns direct HTTP 200, renders the intended article, uses the correct locale and is not a soft 404, preview shell or noindex placeholder.

No claim is made that an unverified owner URL is currently live.

## 6. Pre-publication recheck

Immediately before central approval or publication:

1. fetch current `origin/main` and resolve owner-page changes;
2. run the direct HTTP status matrix in `internal-links.md` for all EN/ZH/KO owner URLs;
3. activate only confirmed final-200 links in all three bodies together;
4. reopen XIY terminal and ground-transport information;
5. search the actual date and complete station pair in 12306;
6. reopen the Qin museum guide, transport page and dated notices;
7. reopen the Shaanxi History Museum Main Building reservation flow and venue guide;
8. reopen Xi’an City Wall’s current entrance/maintenance notice;
9. reopen the official Mount Hua booking and operating notice for the relevant date;
10. update all three bodies together if any operational relationship changes;
11. keep the hub unpublished until central review separately approves route, registry and indexability implementation.
