# Shanghai Destination Hub source log

- Artifact status: central review required
- Research and fact review completed: 2026-08-15
- Repository base reviewed: `origin/main@cc6be75e59155935f321df0334588b52769eb6e4`
- Primary entity: `city-shanghai` (existing in `content/entities/core-places.json`)
- Proposed canonical paths: `/destinations/shanghai/`, `/zh/destinations/shanghai/`, `/ko/destinations/shanghai/`
- Administrative boundary: Shanghai is a direct-administered municipality under `country-china`; no `province-shanghai` node is proposed.

## Repository and production sources reviewed

| Source | What was checked | Editorial use |
| --- | --- | --- |
| `docs/article-production-lite.md` | Evidence, source, multilingual and release requirements | Draft structure, source discipline and QA |
| `docs/homeground-search-platform-phase-1-spec.md`, especially 4.4, 4.5 and 7.3 | Destination Hub ownership, entity relationships, locale and indexability boundaries | Hub owns broad destination decisions without creating a duplicate guide owner |
| `docs/organic-growth/search-map.json` | Existing canonical owners and task routing | Prevented a `/guides/shanghai-travel-guide/` duplicate |
| `docs/organic-growth/do-not-repeat.md` | One-task-one-owner and merge/update rules | Airport, stay, Disney and route execution remain with existing owners |
| `content/entities/core-places.json` | Existing entity IDs and parents | Confirmed `city-shanghai` and direct parent `country-china` |
| `app/sitemap.ts` and search-platform manifest/guide route implementation | Current publication route mechanics | No sitemap, registry, template or indexability edit is included |
| Remote `article/*` and `codex/*` branch inventory | Shanghai work already in progress or released | Avoided duplicate article and hub drafts |
| Current Shanghai guide metadata, bodies and source logs | Content boundaries, localized paths and source dates | Hub links to owners but does not repeat their execution detail |
| Production Homeground guide index and directly surfaced production pages | Public route patterns and current planning entry | Only current production-style internal paths are used in body copy |

## Existing Homeground owners: connection and non-duplication boundary

| Canonical owner | Hub may say | Hub must not copy |
| --- | --- | --- |
| `shanghai-pudong-or-hongqiao-airport` | Airport code changes hotel and onward-transfer logic | Full airport-choice execution matrix, live service details and terminal recovery instructions |
| `shanghai-where-to-stay-first-trip` | Bund/East Nanjing Road, People's Square and Jing'an/Former French Concession have different jobs | Full hotel-area comparison and booking rubric |
| `pudong-airport-to-shanghai-disneyland` | Disney is a separate eastern task; Airport Link resort station is not the park gate | Step-by-step PVG-to-Disney route, bus leg and luggage execution |
| `shanghai-24-hour-parks-reality-check` | Late-public-space claims are dynamic and need verification | Individual park access claims and maintenance table |
| `shanghai-hangzhou-transport-route` | Exact station pair matters for the Shanghai–Hangzhou leg | Train-by-train station selector and transfer execution |
| `shanghai-suzhou-hangzhou-nanjing-route-order` | Choose a chain, Shanghai hub or two-base structure | Full regional route comparison and city-specific itinerary |
| `yangshan-automated-port-explained` | Yangshan is a controlled industrial site, not a default walk-in attraction | Automation explainer, engineering detail and access evidence |
| `beijing-zhangjiajie-shanghai-transport` | Door-to-door arrival time matters more than headline ticket time | Dated train sample and full Beijing–Zhangjiajie–Shanghai calculation |

## Public internal-link gate

The draft body uses the following current production paths. At the reviewed base, each required guide has published metadata and a localized content implementation under the production guide route. The planning entry and the older Beijing–Zhangjiajie–Shanghai transport page were also directly surfaced from the public site during the 2026-08-15 review. Because the browsing environment did not return every newly released direct URL to an external crawler, central implementation review should repeat an HTTP `200` smoke test immediately before merging the Hub into a runtime page; no unpublished or proposed destination URL is linked from the body.

| English path | Chinese path | Korean path | Repository publication evidence |
| --- | --- | --- | --- |
| `/guides/shanghai-pudong-or-hongqiao-airport/` | `/zh/guides/shanghai-pudong-or-hongqiao-airport/` | `/ko/guides/shanghai-pudong-or-hongqiao-airport/` | Published metadata and three locale bodies on reviewed main |
| `/guides/shanghai-where-to-stay-first-trip/` | `/zh/guides/shanghai-where-to-stay-first-trip/` | `/ko/guides/shanghai-where-to-stay-first-trip/` | Published metadata and three locale bodies on reviewed main |
| `/guides/pudong-airport-to-shanghai-disneyland/` | `/zh/guides/pudong-airport-to-shanghai-disneyland/` | `/ko/guides/pudong-airport-to-shanghai-disneyland/` | Published metadata and three locale bodies on reviewed main |
| `/guides/shanghai-24-hour-parks-reality-check/` | `/zh/guides/shanghai-24-hour-parks-reality-check/` | `/ko/guides/shanghai-24-hour-parks-reality-check/` | Published metadata and three locale bodies on reviewed main |
| `/guides/shanghai-hangzhou-transport-route/` | `/zh/guides/shanghai-hangzhou-transport-route/` | `/ko/guides/shanghai-hangzhou-transport-route/` | Published metadata and three locale bodies on reviewed main |
| `/guides/shanghai-suzhou-hangzhou-nanjing-route-order/` | `/zh/guides/shanghai-suzhou-hangzhou-nanjing-route-order/` | `/ko/guides/shanghai-suzhou-hangzhou-nanjing-route-order/` | Published metadata and three locale bodies on reviewed main |
| `/guides/yangshan-automated-port-explained/` | `/zh/guides/yangshan-automated-port-explained/` | `/ko/guides/yangshan-automated-port-explained/` | Published metadata and three locale bodies on reviewed main |
| `/guides/beijing-zhangjiajie-shanghai-transport/` | `/zh/guides/beijing-zhangjiajie-shanghai-transport/` | `/ko/guides/beijing-zhangjiajie-shanghai-transport/` | Existing localized production page; English URL directly surfaced publicly on review date |
| `/china-itinerary-review/` | `/zh/china-itinerary-review/` | `/ko/china-itinerary-review/` | Current public planning-service entry directly surfaced on review date |

The proposed destination paths are recorded in frontmatter and planning files only. The body does not link to `/destinations/shanghai/` before central implementation, and it never creates or links `/guides/shanghai-travel-guide/`.

## Official external sources and claim ledger

### Shanghai municipal travel and spatial context

1. Shanghai Municipal Government, Scenic Spots index
   https://english.shanghai.gov.cn/en-ScenicSpots/index.html
   Reviewed 2026-08-15. Used to verify the official destination framing and named visitor areas. No ranking language was copied.

2. Shanghai Municipal Government / Huangpu District, The Bund
   https://english.shanghai.gov.cn/en-ScenicSpots/20231205/584672cc6d044eabb5f7f6fc9049a19f.html
   Page updated 2025-08-13; reviewed 2026-08-15. Supports the west-bank waterfront, protected historical district and Huangpu River relationship.

3. Shanghai Municipal Government / Huangpu District, Yuyuan Garden
   https://english.shanghai.gov.cn/en-ScenicSpots/20231205/dc76893b94c248d195eaf7f4d44c6597.html
   Page updated 2025-08-13; reviewed 2026-08-15. Supports the garden's location beside the City God Temple and its role in the Old City cluster.

4. Shanghai Municipal Government, Oriental Pearl Tower and Lujiazui location
   https://english.shanghai.gov.cn/en-ScenicSpots/20231205/19a5f5184eca45728fd57a4d4c8efc61.html
   Page updated 2025-08-13; reviewed 2026-08-15. Used only for the Lujiazui/Bund two-bank relationship, not a recommendation to visit a specific tower.

5. Shanghai Municipal Government, People's Square destination entry
   https://english.shanghai.gov.cn/en-ScenicSpots/index.html
   Reviewed 2026-08-15. Supports the civic/visitor-area label. Detailed museum operations are sourced separately.

### Museums and venue dynamics

6. Shanghai Museum, People's Square visitor information
   https://www.shanghaimuseum.net/mu/frontend/pg/m/en/service/visit-west
   Reviewed 2026-08-15. Confirms location and that opening/admission arrangements can vary by peak period and exhibition.

7. Shanghai Museum, East Museum visitor information
   https://www.shanghaimuseum.net/mu/frontend/pg/en/service/visit-east
   Reviewed 2026-08-15. Confirms that the East Museum is a separate Pudong venue with a different closure day and entry process.

8. Shanghai Museum reservation/visiting notice
   https://reservation.shanghaimuseum.net/
   Reviewed 2026-08-15. Current notice showed exhibition-specific changes at the People's Square site and reinforced the decision not to freeze a permanent reservation rule in the Hub.

### Airports, Airport Link, Metro and late arrival

9. Shanghai Municipal Government / Shanghai Airport Authority, Transportation at Shanghai airports
   https://english.shanghai.gov.cn/en-Transportation/20231214/649e06ea38f74aaeb573fa2debbe97d3.html
   Updated 2026-06-04; reviewed 2026-08-15. Supports PVG/SHA distinction, terminal metro relationships and the Airport Link role.

10. Shanghai Airport Authority, Pudong passenger site
    https://www.shairport.com/enpd/
    Reviewed 2026-08-15. Primary operator source for PVG facilities and Airport Link access.

11. Shanghai Airport Authority, Hongqiao passenger site
    https://www.shairport.com/enhq/
    Reviewed 2026-08-15. Primary operator source for SHA and Terminal 2 transport access.

12. Shanghai Airport Authority, rail transit pages
    https://www.shairport.com/ensh/gdjt/index.html
    Reviewed 2026-08-15. Supports Line 2 at PVG, Line 10 at SHA T1, and Lines 2/10 at SHA T2. Exact first/last trains are not reproduced in the Hub.

13. Shanghai Municipal Government / Shanghai Metro, How to take Airport Link Line
    https://english.shanghai.gov.cn/en-Transportation/20241231/f66f14bbd4b549ab88e6f3aec375790c.html
    Reviewed 2026-08-15. Supports the seven-station line, approximate airport-to-airport relationship and International Resort intermediate station.

14. Shanghai Municipal Government, Airport Link timetable adjustment from 2026-04-01
    https://www.shanghai.gov.cn/nw17239/20260401/5131b375c3d44c22a2222266ede0a326.html
    Reviewed 2026-08-15. Dynamic timetable source; retained in the source log rather than hard-coded into evergreen body copy.

15. Shanghai Metro official service portal
    http://service.shmetro.com/en/
    Reviewed as the operator endpoint referenced by Shanghai government and airport sources. Travellers are sent to the live operator rather than given a frozen last-train promise.

16. Shanghai Municipal Government, How to take metro in Shanghai
    https://english.shanghai.gov.cn/en-Transportation/20231214/c727f5e15eff4b8c9340651dd95f3f7c.html
    Reviewed 2026-08-15. Supports general network and payment context; the Hub uses only the spatial role of Line 2.

### Railway stations and regional routing

17. China Railway 12306 English service
    https://www.12306.cn/en/left-ticket.html?linktypeid=dc
    Reviewed 2026-08-15. Source of truth for the exact train, date and station pair. No sample train number or duration is frozen in the Hub.

18. Shanghai Municipal Government, Shanghai railway station guide
    https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html
    Reviewed through the existing Shanghai–Hangzhou owner on the same base. Supports station-specific planning rather than a generic “Shanghai station” label.

19. Shanghai Municipal Government, four major railway stations during the 2026 Spring Festival rush
    https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260210/8006a8a6babc4cb2829b8026aab17953.html
    Reviewed 2026-08-15. Confirms current operational relevance of Shanghai Hongqiao, Shanghai, Shanghai South and Shanghai Songjiang. The temporary 24-hour holiday operation is not generalized.

20. Shanghai Municipal Government, Yangtze Delta timetable update
    https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260120/4fefd5c7bcfd4ec0a45f6c882cfbbd9e.html
    Reviewed 2026-08-15. Demonstrates that station assignments and schedules change; supports the live-12306 instruction.

21. Shanghai Municipal Government, future Shanghai East and Baoshan station construction
    https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260503/fd2ece2ed5df4557b2048f3d8acdc03d.html
    Reviewed 2026-08-15. Used only to exclude future facilities from current trip planning until officially open and bookable.

### Disney and controlled outer-city tasks

22. Shanghai Disney Resort, rail transport
    https://www.shanghaidisneyresort.com/en/experience/guest-service/rail
    Reviewed through the existing Disney owner at the same base. Supports Line 11/Disney Resort execution boundary.

23. Shanghai Disney Resort, official travel information
    https://www.shanghaidisneyresort.com/en/experience/guest-service/travel-information
    Reviewed through the existing Disney owner. Used to keep park transport dynamic and separate from the city-day count.

24. Existing Homeground Yangshan source ledger, based on official port and government channels
    Repository owner: `content/guides/yangshan-automated-port-explained/source-log.md`
    Reviewed 2026-08-15. Supports the controlled-working-port boundary; the Hub does not restate the technical explainer.

## Dynamic-fact treatment

- No exact last metro, fixed Airport Link interval, current ticket price, current museum exhibition or permanent reservation rule is presented as timeless.
- Shanghai Museum People's Square and East Museum are treated as separate venues; the traveller must select the site and current exhibition before fixing a day.
- Railway station choice is delegated to the exact 12306 result for the travel date.
- Future stations under construction are excluded from current routing.
- Festival crowd controls around East Nanjing Road, the Bund and Yuyuan are acknowledged as variable rather than copied from one event notice.
- Disneyland, parks and Yangshan remain separate execution owners.

## Excluded source types

- No competitor prose was used as a drafting source.
- No user-generated timetable, social-media “must-see” list or search-result snippet is treated as operational authority.
- No invented first-person observation appears in the draft.
- No annual title or unsupported “latest” language is used; the visible fact-review date is 2026-08-15.
