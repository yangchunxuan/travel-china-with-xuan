# Shenzhen Destination Hub — source log

- **Research and dynamic-fact review completed:** 2026-08-15 (Asia/Seoul)
- **Repository base reviewed:** `origin/main` at `cc6be75e59155935f321df0334588b52769eb6e4`
- **Working branch requested:** `codex/city-hub-shenzhen-draft-20260815`
- **Proposed canonical:** `/destinations/shenzhen/`
- **Entity proposal:** `city-shenzhen` → `province-guangdong`
- **Status:** draft evidence pack for central review; no public route, registry, Search Map, sitemap or indexability mutation

## 1. Editorial question this source set had to answer

This hub is not a conventional list of attractions. The evidence was selected to answer six planning questions:

1. Which travellers receive genuine value from Shenzhen, and which history-led first visitors may prefer Guangzhou?
2. What can one, two or three hotel nights actually produce after arrival, luggage and departure costs?
3. How should Luohu, Futian, Nanshan, Shekou, Bao’an Airport and distant Dapeng be understood as separate parts of a long city?
4. Which airport, railway station and boundary checkpoint is the traveller really using?
5. When does Shenzhen improve a Hong Kong–Guangzhou–Pearl River Delta route, and when does it merely add a hotel move?
6. Which detailed decisions remain owned by existing articles rather than this destination hub?

The draft deliberately avoids using a technology slogan as a substitute for travel value. Recent urban development is explained through public space, border infrastructure, trade systems, port history and the relationship between work districts and the waterfront.

## 2. Repository sources reviewed

| Repository source | Role in this draft | Result |
|---|---|---|
| `docs/article-production-lite.md` | Production, sourcing, language, visual and QA rules | Applied to all six deliverables and QA evidence |
| `docs/homeground-search-platform-phase-1-spec.md` — especially 4.4, 4.5 and 7.3 | Canonical ownership, entity/path discipline and search-platform boundaries | Hub kept at the destination-decision level; no duplicate guide path created |
| `docs/organic-growth/search-map.json` | Existing search-task ownership and overlap check | No Search Map edit; current owner boundaries preserved |
| `docs/organic-growth/do-not-repeat.md` | Duplicate and cannibalisation check | No `/guides/shenzhen-travel-guide/` draft created |
| `content/entities/core-places.json` | Current central entity registry | `city-shenzhen` and `province-guangdong` are absent; both remain `proposed` only in `entity-graph.json` |
| Current `origin/main` tree and remote `article/*` / `codex/*` branch and PR searches | Duplicate-work check | Existing Shenzhen owners found; no existing Shenzhen destination-hub branch found at review time |
| Repository tree search for `sitemap` | Locate formal sitemap implementation | No static sitemap file or clearly named sitemap route surfaced in the reviewed tree; no sitemap file was modified |

### Existing owners reviewed and retained

| Existing owner | Repository path | What it continues to own |
|---|---|---|
| `shenzhen-where-to-stay-futian-luohu-nanshan` | `content/guides/shenzhen-where-to-stay-futian-luohu-nanshan/` | Exact accommodation-area comparison; station/checkpoint-to-hotel execution |
| `shenzhen-hong-kong-transport-route` | `content/guides/shenzhen-hong-kong-transport-route/` | Door-to-door Shenzhen–Hong Kong crossing choice, named checkpoint execution and last-mile comparison |
| `guangzhou-shenzhen-hong-kong-route-order` | `content/guides/guangzhou-shenzhen-hong-kong-route-order/` | Three-city order and whether Shenzhen earns an overnight base |
| `shenzhen-low-altitude-city-infrastructure` | `content/guides/shenzhen-low-altitude-city-infrastructure/` | Evidence-based explanation of operating low-altitude services, trials and policy targets |

### Legacy entity discrepancy

The low-altitude owner currently uses the legacy identifier `place-shenzhen`. This hub proposes `city-shenzhen`, as requested. The discrepancy is recorded in `entity-graph.json` for central migration review. The draft does **not** silently rewrite the published owner, central entity registry or Search Map.

## 3. Official sources: ports, immigration and cross-boundary transport

The following sources were rechecked on 2026-08-15 because opening hours, construction status, holiday extensions and entry rules are volatile.

| Source | URL | Fact used | Volatility treatment |
|---|---|---|---|
| Shenzhen Municipal Government Port Office — Port Clearance Services | https://ka.sz.gov.cn/bmfw/katgfw/index.html | Official Shenzhen-side names, modes and current operating hours for Liantang, Futian, Luohu, Huanggang, Shenzhen Bay, Wenjindu, Shekou and other ports; page dated 2026-07-26 | Exact hours are logged below but omitted from evergreen body tables; body tells travellers to recheck |
| Hong Kong Immigration Department — Control Point Locations | https://www.immd.gov.hk/eng/contactus/control_points.html | Hong Kong-side control-point names and current hours; page dated 2026-06-26 | Cross-checked against Shenzhen Port Office; recheck before travel |
| MTR — East Rail Line to/from Lo Wu and Lok Ma Chau | https://www.mtr.com.hk/en/customer/services/to_from_lw_lmc.html | Lo Wu connects to Luohu; Lok Ma Chau Spur Line connects to Futian; these are not Huanggang/Lok Ma Chau road | Used for relationship, not a permanent timetable promise |
| Hong Kong Immigration Department — Immigration Guidelines for Entry | https://www.immd.gov.hk/eng/services/visas/immigration-entry-guideline.html | Non-permanent residents do not need a re-entry visa only when they return within the valid limit of stay and the circumstances underlying status remain unchanged; page dated 2026-06-02 | Draft refuses to generalise this into universal Hong Kong re-entry eligibility |
| Hong Kong Immigration Department — Re-entry into Hong Kong | https://www.immd.gov.hk/eng/services/visas/re_entry_into_HK.html | Same conditional re-entry rule in a dedicated official page | Travellers are referred to the competent immigration authorities for their own passport/status |
| Hong Kong Transport and Logistics Bureau — LegCo reply on Huanggang redevelopment | https://www.tlb.gov.hk/eng/legislative/transport/replies/2025/20250625b.html | Building completion target and explicit statement that commissioning arrangements/timetable require further Shenzhen–Hong Kong discussion | A construction target is not treated as public opening |

### Port operating snapshot checked on 2026-08-15

These values are an audit snapshot, not evergreen copy. They must be rechecked immediately before publication and again before travel.

| Shenzhen-side checkpoint / port | Current passenger operating window in Shenzhen Port Office source | Hong Kong counterpart / relationship | Draft treatment |
|---|---:|---|---|
| **Luohu Port** | 06:30–24:00 | Lo Wu Control Point / East Rail | Kept separate from Shenzhen Railway Station despite adjacency |
| **Futian Port** | 06:30–22:30 | Lok Ma Chau Spur Line Control Point / East Rail | Kept separate from Futian Railway Station and Huanggang |
| **Huanggang Port** | 24 hours at the temporary passenger facility on review date | Lok Ma Chau road control point | Body states temporary-facility status; no claim that the redeveloped port has publicly opened |
| **Shenzhen Bay Port** | Passenger 06:30–24:00; cargo 24 hours | Shenzhen Bay Control Point | Treated as a western road crossing, not a ferry terminal |
| **Liantang Port** | 07:00–22:00 | Heung Yuen Wai Control Point | Treated as a distinct eastern crossing |
| **Wenjindu Port** | 07:00–22:00 | Man Kam To Control Point | Kept separate from Luohu pedestrian crossing |
| **Shekou Cruise Homeport passenger port** | Port Office lists 07:00–22:30; usable journeys still depend on sailing inventory | Sea routes to Hong Kong/Macao where scheduled | Body does not turn the port window into a guaranteed ferry departure |
| **Hong Kong West Kowloon boundary facilities** | 06:30–23:30 | Cross-boundary high-speed rail | Kept separate from all Shenzhen land checkpoints |
| **Liantang/Heung Yuen Wai** | Shenzhen 07:00–22:00; Hong Kong official table agrees | Eastern road/pedestrian system | Current correspondence confirmed |

### Huanggang status decision

The reviewed sources support three separate statements:

1. Huanggang/Lok Ma Chau road control remains a 24-hour crossing in the current Shenzhen and Hong Kong official tables.
2. Shenzhen Port Office still describes passenger operation through the temporary facility on the review date.
3. The redeveloped Huanggang Port’s commissioning timetable remains subject to agreement and official announcement.

The draft therefore does **not** infer “new Huanggang Port open” from a building milestone, local legislative step, trial, media forecast or planned date. This point must be checked again on the actual publication day.

### Immigration and re-entry boundary

A trip from a Shenzhen hotel to Hong Kong and back contains two separate legal questions: admissibility to Hong Kong and a valid basis to enter Mainland China again. A Hong Kong visitor permission, Mainland single-entry visa, passport-based waiver or route-based transit arrangement can each behave differently. This hub does not determine eligibility. It directs the traveller to the responsible immigration authority and the existing entry-policy owner.

## 4. Official sources: airport, metro and railway stations

| Source | URL | Fact used | Draft treatment |
|---|---|---|---|
| Shenzhen Bao’an International Airport — Airport–Metro Connections | https://www.szairport.com/szairporten/lwszsq/tiaoz.shtml | SZX Terminal 3 connection to Metro Line 11; airport-side ground transport context | Body identifies SZX and the western/central connection but avoids hard-coding last-train promises |
| Shenzhen Government Online — Train Stations | https://www.sz.gov.cn/en_szgov/life/transport/trains/content/post_11538776.html | Official distinction and locations of Futian Railway Station, Shenzhen North and other passenger hubs | Full station names used throughout |
| Shenzhen Government Online — Shenzhen Metro & MTR | https://www.sz.gov.cn/en_szgov/life/transport/metro/ | Current line relationships, including Futian Checkpoint, Huanggang Checkpoint, Shenzhen North, SZX and Shenzhen Bay Checkpoint | Used to check structural relationships; live journey planning still belongs to current metro data |
| China Railway 12306 | https://www.12306.cn/en/index.html | Date-specific train, station and inventory authority | Body instructs users to search the exact date and full station name; no stable frequency claim |
| MTR High Speed Rail | https://www.highspeed.mtr.com.hk/en/main/index.html | Hong Kong West Kowloon cross-boundary rail context | Kept distinct from Shenzhen pedestrian/road checkpoints |

### Station naming rule applied

The source review confirmed that these are different nodes and must never be collapsed:

- Futian Railway Station — Mainland high-speed-rail station in central Futian.
- Futian Port / Futian Checkpoint — pedestrian boundary facility linked to Lok Ma Chau Spur Line after clearance.
- Shenzhen Railway Station — Mainland railway station in Luohu.
- Luohu Port / Luohu Checkpoint — pedestrian boundary facility linked to Lo Wu after clearance.
- Shenzhen North Railway Station — major high-speed-rail hub in Longhua.
- Shenzhen East Railway Station — separate passenger station in Buji/Longgang.
- Shenzhen Airport Station and Shenzhen Airport North Station — separate intercity rail stops in the airport area.

Adjacency is represented as adjacency, not identity, in `entity-graph.json`.

## 5. Official sources: city structure and visitor experience

| Source family | Representative official source | Editorial use |
|---|---|---|
| Shenzhen Government Online — city and district profiles | https://www.sz.gov.cn/en_szgov/aboutsz/profile/ | Shenzhen as a recent, polycentric city rather than a traditional capital |
| Luohu District and Shenzhen Government material on railway/border/commercial development | https://www.sz.gov.cn/en_szgov/ | Luohu’s reform-era rail–border–commercial role; no “ancient old town” claim |
| Futian District / Civic Center / Lianhua Hill official information | https://www.sz.gov.cn/en_szgov/ | Civic-scale, cultural and public-space cluster |
| Nanshan District, Shenzhen Bay Park and Talent Park official information | https://www.sz.gov.cn/en_szgov/ | Relationship between employment districts, waterfront parks and public space without using private campuses as attractions |
| Design Society / Sea World Culture and Arts Center | https://www.designsociety.cn/ | Shekou design and adaptive-reuse context |
| Dapeng New District and official cultural-tourism information | https://www.dpxq.gov.cn/ | Dapeng as a distant eastern peninsula requiring a separate full-day or overnight plan |

These sources support stable spatial/editorial judgments, not precise door-to-door travel times. The draft uses relative geography—east, central, west, north, distant peninsula—and avoids presenting an illustrative structure diagram as a measured map.

## 6. Public-site and sitemap checks

### Online page review

The public Homeground homepage and guide index were reviewed on 2026-08-15. The English, Simplified Chinese and Korean versions of the itinerary-pace guide were independently retrieved through the public language switcher and are recorded as confirmed public pages: `/guides/is-your-china-itinerary-too-rushed/`, `/zh/guides/is-your-china-itinerary-too-rushed/` and `/ko/guides/is-your-china-itinerary-too-rushed/`.

Exact public-edge retrieval for the four required Shenzhen owner routes could not be independently established in the available execution environment:

- search-engine exact-slug queries did not surface the pages;
- the visible public guide index did not expose them in the retrieved snapshot;
- direct HTTP checks from the container failed because DNS resolution was unavailable;
- the web fetcher would not open unreturned raw URLs;
- repository evidence confirms the owners exist in `origin/main`, but repository existence is not proof of a production HTTP 200.

Consequently, `internal-links.md` records these links as **required owner targets with an unresolved production-200 gate**. Central review must run an actual edge request after deployment and before publication. This draft does not mislabel a source file as a live 200 page.

### Formal sitemap

The current repository tree was searched recursively for a static sitemap file or clearly named sitemap route; none surfaced in the reviewed tree. The public `/sitemap.xml` could not be fetched from the execution environment for the same live-edge limitation above. No sitemap file, route or indexability configuration was changed. Central review should verify the formal production sitemap independently; the proposed destination path must remain absent until the hub moves out of draft review.

## 7. Sources intentionally not used as authorities

- Search snippets, travel blogs, OTA route summaries and social posts were not used to establish port hours, immigration eligibility, railway identity or airport operation.
- News forecasts were not used to declare the redeveloped Huanggang Port open.
- Wikimedia Commons is used only for image licensing candidates, not as a transport or immigration authority.
- Company marketing language was not used to define Shenzhen’s value.
- No AI-generated city documentary image is proposed.

## 8. Recheck schedule before central approval

| Item | Required recheck |
|---|---|
| Port hours and holiday extensions | Shenzhen Port Office + Hong Kong Immigration Department on publication day |
| Huanggang temporary/new-facility status | Shenzhen Port Office + Hong Kong Transport and Logistics Bureau / official joint announcement |
| Rail services and exact departure station | China Railway 12306 for the actual date |
| SZX last metro / night transport | Shenzhen Airport + Shenzhen Metro for the actual arrival date |
| Shekou ferry services | Operator inventory and terminal notice for the actual date |
| Hong Kong and Mainland re-entry eligibility | Relevant immigration authorities for the traveller’s passport, permission and exact route |
| Four required internal owner URLs | Direct production-edge HTTP status and canonical response after deployment |
| Formal sitemap | Production sitemap output; do not add the draft destination route before central approval |
| Commons image licences and original files | Re-open each file page immediately before asset ingestion |
