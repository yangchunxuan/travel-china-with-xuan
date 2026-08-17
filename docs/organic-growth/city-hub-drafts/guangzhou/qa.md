# Guangzhou destination hub QA

**Draft:** `city-hub-guangzhou-draft-20260815`
**Base target:** `origin/main` at or after `cc6be75e59155935f321df0334588b52769eb6e4`
**QA date:** 2026-08-15
**Expected final state:** `CITY HUB DRAFT READY — CENTRAL REVIEW REQUIRED`

## 1. Artifact scope

| Check | Result | Evidence |
|---|---|---|
| Exact target directory only | PASS — exactly eight target files | Patch file list must contain only `docs/organic-growth/city-hub-drafts/guangzhou/` |
| Exact file count | PASS | Eight files: `hub.en.md`, `hub.zh.md`, `hub.ko.md`, `entity-graph.json`, `source-log.md`, `image-plan.md`, `internal-links.md`, `qa.md` |
| No public implementation files | PASS | No `app/`, `components/`, `content/entities/`, registry, sitemap, Search Map, homepage or indexability file is included |
| No forbidden generic guide | PASS | `/guides/guangzhou-travel-guide/` and locale variants are absent |
| Proposed destination route not treated as live | PASS | Proposed paths appear as draft metadata only and are not used as internal links |

## 2. Three-language completeness

| Check | English | 简体中文 | 한국어 |
|---|---:|---:|---:|
| Complete destination-hub body | PASS | PASS | PASS |
| Size | 3,479 English words | 9,003 non-whitespace characters | 10,150 non-whitespace characters |
| Decision tables | 6 | 6 | 6 |
| Planning situations | 2 | 2 | 2 |
| FAQ count | 10 | 10 | 10 |
| LF line endings | PASS | PASS | PASS |
| Trailing whitespace | PASS | PASS | PASS |

The English body is inside the required 2,600–3,600-word range. Chinese and Korean are complete editorial versions, not summaries of the English page.

## 3. Required editorial modules

| Required module | Result | Notes |
|---|---|---|
| International gateway, Lingnan destination and Greater Bay Area node | PASS | Established in the lead and route-role sections |
| Food, family, business extension and first-China-trip fit | PASS | Covered by the traveller-fit table without becoming a restaurant list |
| One–two nights, three nights, Chimelong/Foshan additions | PASS | Covered by the night-allocation table and scenarios |
| Liwan/Shamian, Beijing Road/Yuexiu, Tianhe/Zhujiang New Town, Haizhu/Pazhou, Panyu stay tasks | PASS | Each area has a purpose and a trade-off |
| 2026 T1/T2/T3 division | PASS | Dated status, flight-specific rule and owner handoff included |
| Guangzhou South, East, Baiyun, Guangzhou and North stations | PASS | Five-station decision table; no station is presented as interchangeable |
| Hong Kong, Shenzhen, Changsha and Zhangjiajie direction impact | PASS | Directional tendencies are date-specific and routed to 12306 or the existing owner |
| Chen Clan–Yongqingfang–Shamian | PASS | Explained as a western old-city cluster, not one attraction |
| Beijing Road–Yuexiu | PASS | Historic-commercial and civic relationship explained |
| Zhujiang New Town–Canton Tower | PASS | North-bank/south-bank relationship explained |
| Pazhou exhibition zone | PASS | Calendar and stay-task effect explained |
| Chimelong as a separate zone | PASS | Treated as a Panyu full-day decision |
| Foshan, Shunde, Shenzhen, Hong Kong and Macao | PASS | Day extension versus next-stop table included |
| Current articles and planned entry points | PASS | Existing owners listed; future pages are proposals only |

## 4. Scope and cannibalisation boundaries

| Boundary | Result |
|---|---|
| No restaurant ranking | PASS |
| No complete morning-tea article duplication | PASS |
| No Canton Fair business manual | PASS |
| No complete Chimelong guide | PASS |
| No Greater Bay Area border encyclopedia | PASS |
| No airport timetable or permanent airline allocation | PASS |
| No full cross-boundary procedure duplication | PASS |
| No permanent railway timetable or fare | PASS |
| Hong Kong not described as an ordinary Guangdong city | PASS |
| Macao not described as an ordinary Guangdong city | PASS |
| Shunde represented under Foshan, not Guangzhou | PASS |

## 5. Internal-link validation

The required six owner slugs occur in all three language files:

- `guangzhou-baiyun-airport-t2-t3`
- `guangzhou-hong-kong-transport-route`
- `guangzhou-macau-transport-route`
- `guangzhou-shenzhen-hong-kong-route-order`
- `how-guangzhou-morning-tea-works`
- `when-metro-construction-meets-archaeology`

Supporting published owners used:

- `china-high-speed-train-first-time-guide`
- `china-last-night-before-international-flight`

`china-hotel-near-metro` is retained in `internal-links.md` as an optional future contextual link but is not forced into the body.

| Check | Result | Evidence |
|---|---|---|
| Required six owners in EN | PASS | All six slugs present |
| Required six owners in ZH | PASS | All six slugs present with `/zh/` paths |
| Required six owners in KO | PASS | All six slugs present with `/ko/` paths |
| Links limited to existing guide identities | PASS | Every selected identity has a base-commit folder and locale metadata |
| No link to unimplemented destination route | PASS | Proposed destination paths are not used as Markdown links |
| Deployment recheck gate documented | PASS | `internal-links.md` requires a final 27-URL HTTP 200 sweep before implementation |

The Search Map and base metadata are the evidence used for owner availability in this draft. A central implementation must repeat the deployed HTTP check immediately before release and replace any owner only through a recorded migration.

## 6. Dynamic fact validation

| Dynamic fact | Result | Safeguard |
|---|---|---|
| T1 passenger operations suspended from 7 May 2026 | PASS | Dated claim and official Guangzhou source |
| Airport South and Baiyun Airport South non-stopping | PASS | Dated claim; recheck trigger recorded |
| T2 direct metro and intercity access | PASS | No timetable or fare frozen |
| T3 direct intercity, no direct metro at review | PASS | Gaozeng feeder and road are comparisons, not permanent schedules |
| Flight terminal determined by exact flight/operating carrier | PASS | Static airline lists rejected |
| Guangzhou Station function changed 26 January 2026 | PASS | Government timetable source recorded |
| Five-station service allocation can change | PASS | Exact 12306 date search required |
| Cross-boundary operation can change | PASS | Hong Kong/Macao owners remain execution authorities |
| Canton Fair calendar can change | PASS | Official session check required |

## 7. Entity graph validation

| Check | Result |
|---|---|
| JSON parses | PASS |
| Node count | 63 |
| Edge count | 67 |
| Both `existing` and `proposed` states present | PASS |
| `city-guangzhou` marked proposed | PASS |
| `province-guangdong` marked proposed | PASS |
| Central registry mutation disabled | PASS |
| Districts and five stay areas included | PASS |
| Airport, T1/T2/T3 and access stations included | PASS |
| Five major railway stations included | PASS |
| Core attraction clusters included | PASS |
| Hong Kong/Macao route edges included | PASS |
| Hong Kong and Macao explicitly not children of Guangdong | PASS |
| Existing content owners connected to their task entities | PASS |

## 8. Image-plan validation

| Check | Result |
|---|---|
| Real Guangzhou hero proposed | PASS |
| Old city–Tianhe–Pazhou–Panyu relationship map specified | PASS |
| Airport shown north of the main city chain | PASS |
| Three to five supporting real photographs | PASS — four supporting photographs plus the hero |
| Source page, author and licence recorded | PASS |
| Three-language alt text supplied | PASS |
| AI documentary photography prohibited | PASS |
| Generative fill and sign replacement prohibited | PASS |
| Hong Kong/Macao not placed inside Guangdong on the diagram | PASS |

## 9. Text and format checks

| Check | Result |
|---|---|
| UTF-8 files | PASS |
| LF line endings | PASS |
| Trailing whitespace | PASS |
| JSON indentation and terminal newline | PASS |
| Markdown tables have header separators | PASS |
| `git diff --check` | PASS |
| Single `git format-patch` | PASS — one patch / one commit |
| Patch applies in clean simulation | PASS — clean `git am` simulation |

## 10. Central-review items

The draft is complete, but central review must still decide or confirm:

1. whether `city-guangzhou` and `province-guangdong` are accepted with the proposed IDs;
2. whether the future destination route launches as noindex prototype or waits for a wider destination-hub release;
3. which image candidates are downloaded and processed;
4. whether a dedicated Guangzhou stay-area or five-station owner is approved later;
5. whether all selected guide URLs still return HTTP 200 immediately before implementation;
6. whether any airport or railway update after 15 August 2026 requires a source refresh.

**Final editorial state:** complete draft, not publication authority.
