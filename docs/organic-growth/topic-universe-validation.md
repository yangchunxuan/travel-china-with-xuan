# Topic Universe validation

Checked: 2026-08-11T23:52:38+08:00
Topic digest (SHA-256): `f0b53a0da8ce6875daa1c48b97c76252432ad609eb503d82e6316fe442cf1166`

## Result

| Test | Result | Evidence |
| --- | --- | --- |
| Exact canonical identity count | PASS | 1000 |
| Unique topicId | PASS | 1000 |
| Unique canonicalSlug | PASS | 1000 |
| All governed fields present | PASS | 46 fields checked per identity; nullable issue/merge targets retained explicitly |
| Applicable key fields non-null | PASS | 42 required-value fields checked per identity; child arrays may be empty by design |
| Three locales count once | PASS | localePlan is nested inside one canonical identity |
| Valid counting statuses only | PASS | published, completed-not-published, in-production, mapped-validated |
| Raw bank count | PASS | 1077 |
| 27 collection quotas | PASS | 1000 |
| Below-cut and non-counting decisions excluded | PASS | 196 |
| High title-token similarity review | PASS | 3 boundary-distinct pair(s); 0 identical-boundary pair(s) |
| Month/nationality/day-count matrix review | PASS | 0 |
| Reverse-route review | PASS | 0 |
| City-name substitution skeleton review | REVIEW | 5 |

## Raw bank control totals

| Collection | Raw seeds | Final quota |
| --- | --- | --- |
| explore-regions-provinces | 47 | 47 |
| explore-cities-neighborhoods | 42 | 43 |
| explore-attractions-nature-heritage | 42 | 47 |
| plan-trip-length-city-order | 37 | 40 |
| plan-traveller-theme-itineraries | 38 | 41 |
| plan-budget-pace-decisions | 37 | 41 |
| transport-airports-rail-hubs | 37 | 41 |
| transport-city-pair-routes | 37 | 38 |
| transport-last-mile-transfers | 37 | 38 |
| timing-months-seasons | 40 | 37 |
| timing-holidays-crowds | 51 | 38 |
| timing-events-natural-calendar | 43 | 37 |
| stay-city-areas | 37 | 39 |
| stay-hotel-types-scenic-bases | 37 | 38 |
| stay-access-foreign-guests | 37 | 38 |
| essentials-entry-transit | 37 | 44 |
| essentials-payments-connectivity | 37 | 20 |
| essentials-booking-registration-recovery | 37 | 34 |
| culture-history-people-ideas | 53 | 53 |
| culture-regional-food | 45 | 47 |
| culture-festivals-arts-contemporary | 46 | 46 |
| tools-route-time | 37 | 8 |
| tools-area-option-selectors | 37 | 28 |
| tools-maps-calculators-reference | 38 | 35 |
| services-guides-experiences | 37 | 31 |
| services-transfers-hotels-bookings | 37 | 26 |
| services-route-whole-trip | 37 | 25 |

## State and retention

| Counting state | Identities |
| --- | --- |
| mapped-validated | 958 |
| published | 38 |
| completed-not-published | 3 |
| in-production | 1 |

All 38 live guide-scope identities, three durable completed-not-published drafts and the one local-undurable in-production eSIM identity are retained. The two identities released by PR #31 are counted once as published, not again as drafts. Research-only specifications, updates, merges, rejects and deferred proposals remain outside the 1,000 count.

## Primary and secondary category distribution

| Primary category | Identities | Share |
| --- | --- | --- |
| culture | 146 | 14.6% |
| explore | 137 | 13.7% |
| plan | 122 | 12.2% |
| transport | 117 | 11.7% |
| stay | 115 | 11.5% |
| when-to-go | 112 | 11.2% |
| essentials | 98 | 9.8% |
| services | 82 | 8.2% |
| tools | 71 | 7.1% |

| Secondary category | Identities |
| --- | --- |
| explore-regions-provinces | 47 |
| explore-cities-neighborhoods | 43 |
| explore-attractions-nature-heritage | 47 |
| plan-trip-length-city-order | 40 |
| plan-traveller-theme-itineraries | 41 |
| plan-budget-pace-decisions | 41 |
| transport-airports-rail-hubs | 41 |
| transport-city-pair-routes | 38 |
| transport-last-mile-transfers | 38 |
| timing-months-seasons | 37 |
| timing-holidays-crowds | 38 |
| timing-events-natural-calendar | 37 |
| stay-city-areas | 39 |
| stay-hotel-types-scenic-bases | 38 |
| stay-access-foreign-guests | 38 |
| essentials-entry-transit | 44 |
| essentials-payments-connectivity | 20 |
| essentials-booking-registration-recovery | 34 |
| culture-history-people-ideas | 53 |
| culture-regional-food | 47 |
| culture-festivals-arts-contemporary | 46 |
| tools-route-time | 8 |
| tools-area-option-selectors | 28 |
| tools-maps-calculators-reference | 35 |
| services-guides-experiences | 31 |
| services-transfers-hotels-bookings | 26 |
| services-route-whole-trip | 25 |

## Geographic concentration review

| Geographic scope (excluding China-wide) | Identities | Share of universe |
| --- | --- | --- |
| Beijing | 24 | 2.4% |
| Shanghai | 18 | 1.8% |
| Yunnan | 12 | 1.2% |
| Fujian | 11 | 1.1% |
| Hangzhou, Zhejiang | 10 | 1.0% |
| Guangxi | 9 | 0.9% |
| Inner Mongolia | 8 | 0.8% |
| Luoyang, Henan | 7 | 0.7% |
| Quanzhou, Fujian | 7 | 0.7% |
| Chongqing | 6 | 0.6% |
| Dali, Yunnan | 6 | 0.6% |
| Hainan | 6 | 0.6% |
| Suzhou, Jiangsu | 6 | 0.6% |
| Xi'an, Shaanxi | 6 | 0.6% |
| Xinjiang | 6 | 0.6% |
| Guangzhou, Guangdong | 5 | 0.5% |
| Guizhou | 5 | 0.5% |
| Harbin, Heilongjiang | 5 | 0.5% |
| Hunan | 5 | 0.5% |
| Nanjing, Jiangsu | 5 | 0.5% |
| Qingdao, Shandong | 5 | 0.5% |
| Shanxi | 5 | 0.5% |
| zhangjiajie | 5 | 0.5% |
| Chengdu, Sichuan | 4 | 0.4% |
| Datong, Shanxi | 4 | 0.4% |
| Heilongjiang | 4 | 0.4% |
| Huangshan, Anhui | 4 | 0.4% |
| Jiangxi | 4 | 0.4% |
| Jilin | 4 | 0.4% |
| Kaifeng, Henan | 4 | 0.4% |

Largest named geographic scope share: 2.4%. PASS: no named geographic scope exceeds 10% of the universe.

## Content-type distribution

| Content type | Identities |
| --- | --- |
| interpretive-guide | 38 |
| traveller-theme-planning-guide | 38 |
| bidirectional-route-guide | 37 |
| city-area-comparison | 37 |
| cultural-participation-guide | 37 |
| decision-guide | 37 |
| event-timing-guide | 37 |
| food-decision-guide | 37 |
| hotel-operation-and-recovery-guide | 37 |
| hub-orientation-guide | 37 |
| last-mile-execution-guide | 37 |
| lodging-type-decision-guide | 37 |
| orientation-guide | 37 |
| planning-tradeoff-guide | 37 |
| route-planning-guide | 37 |
| source-backed task guide | 37 |
| visitor-decision-guide | 37 |
| timing-guide | 36 |
| crowd-decision-guide | 35 |
| reference data product | 35 |
| execution and recovery guide | 33 |
| service-selection guide | 30 |
| comparison selector | 28 |
| service-procurement guide | 26 |
| whole-trip service decision guide | 25 |
| practical troubleshooting guide | 18 |
| evidence-led-cultural-interpretation-guide | 17 |
| task | 14 |
| comparison | 13 |
| regional-decision-guide | 10 |
| combined-decision | 9 |
| decision tool or auditable worksheet | 8 |
| regional-food-decision-guide | 8 |
| living-art-execution-guide | 6 |
| attraction-execution-guide | 5 |
| urban-orientation-guide | 5 |
| entity | 2 |
| subproblem | 2 |
| collection | 1 |
| data-reference-specification | 1 |
| relationship | 1 |
| tool-data-specification | 1 |

## Business-role distribution

| Business role | Identities | Share |
| --- | --- | --- |
| in-trip-utility | 332 | 33.2% |
| trip-planning | 285 | 28.5% |
| discovery | 126 | 12.6% |
| commercial-intent | 104 | 10.4% |
| authority | 101 | 10.1% |
| conversion-support | 52 | 5.2% |

## Freshness, asset and programmatic feasibility

| Freshness class | Identities |
| --- | --- |
| high/dynamic | 527 |
| medium/periodic | 372 |
| low/stable | 101 |

| Asset feasibility | Identities |
| --- | --- |
| feasible-with-governed-acquisition | 619 |
| conditional | 380 |
| blocked | 1 |

| Programmatic status | Identities |
| --- | --- |
| conditional candidate for Employee 8 review | 150 |
| manual/non-programmatic | 850 |

Evidence-gated READY NOW: 1. RESEARCH NEXT: 679. Employee 8 feasibility candidates: 158. High-dynamic/high-risk identities: 530.

## Non-counting outcomes

| Disposition | Records |
| --- | --- |
| merge | 81 |
| duplicate-resolved-selector-retained-competing-transport-seed-replaced | 22 |
| merge-into-existing-candidate | 20 |
| deferred-not-validated | 12 |
| rejected-pattern | 11 |
| duplicate-transport-seed-replaced-before-final-selection | 9 |
| rejected-faq-sized-module | 7 |
| update-existing-owner | 6 |
| merge-into-existing | 5 |
| reject | 5 |
| held-not-authorized | 4 |
| rejected-no-data-contract | 4 |
| resolved-into-published-owner | 2 |
| merge-as-reusable-module-not-standalone-identity | 1 |
| protected-published-cluster-no-expansion | 1 |
| rejected | 1 |
| rejected-insufficient-official-event-source | 1 |
| rejected-source-boundary-too-broad | 1 |
| repository-and-live-state-override-stale-ledger-state | 1 |
| research-only-not-canonical | 1 |
| superseded-do-not-revive | 1 |

## Similarity review

| Left | Right | Score | Outcome |
| --- | --- | --- | --- |
| china-visa-free-canadian-citizens-2026 | china-visa-free-uk-citizens-2026 | 0.889 | manual-boundary-review-recorded |
| china-visa-free-new-zealand-citizens-2026 | china-visa-free-uk-citizens-2026 | 0.8 | manual-boundary-review-recorded |
| china-visa-free-canadian-citizens-2026 | china-visa-free-new-zealand-citizens-2026 | 0.727 | manual-boundary-review-recorded |

## Template-risk review

No repeated month, nationality or day-count skeleton was retained.

No obvious mirrored route slug pair was retained.

| Skeleton | Records | Outcome |
| --- | --- | --- |
| route-planning-guide\|and-order | changsha-fenghuang-zhangjiajie-route-order (Hunan); datong-pingyao-taiyuan-route-order (Shanxi); zhengzhou-luoyang-kaifeng-route-order (Henan); guiyang-kaili-zhaoxing-route-order (Guizhou); qingdao-jinan-qufu-shandong-route (Shandong); nanchang-jingdezhen-wuyuan-lushan-route (Jiangxi); hangzhou-shaoxing-ningbo-route-order (Zhejiang) | manual-independent-task-review |
| hub-orientation-guide\|east-station-or-central-station | nanning-airport-and-rail-hubs (Nanning, Guangxi); xuzhou-airport-and-rail-hubs (Xuzhou, Jiangsu); hohhot-airport-and-rail-hubs (Hohhot, Inner Mongolia); yangzhou-airport-and-rail-hubs (Yangzhou, Jiangsu) | manual-independent-task-review |
| hub-orientation-guide\|west-station-or-central-station | lanzhou-airport-and-rail-hubs (Lanzhou, Gansu); nanchang-airport-and-rail-hubs (Nanchang, Jiangxi); zhangye-airport-and-rail-hubs (Zhangye, Gansu); nantong-airport-and-rail-hubs (Nantong, Jiangsu) | manual-independent-task-review |
| city-area-comparison\|where-to-in-or | chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba (Chongqing); shenzhen-where-to-stay-futian-luohu-nanshan (Shenzhen, Guangdong); sanya-where-to-stay-sanya-bay-yalong-haitang (Sanya, Hainan); wuhan-where-to-stay-hankou-wuchang-hanyang (Wuhan, Hubei); guangzhou-where-to-stay-yuexiu-tianhe-liwan (Guangzhou, Guangdong); lhasa-where-to-stay-barkhor-or-west-lhasa (Lhasa, Tibet Autonomous Region); nanjing-where-to-stay-xinjiekou-fuzimiao-xuanwu (Nanjing, Jiangsu); qingdao-where-to-stay-shinan-taidong-laoshan (Qingdao, Shandong); luoyang-where-to-stay-old-city-longmen-or-station (Luoyang, Henan); zhuhai-where-to-stay-gongbei-jida-hengqin (Zhuhai, Guangdong); quanzhou-where-to-stay-old-city-or-east-lake (Quanzhou, Fujian); kashgar-where-to-stay-old-city-or-new-city (Kashgar, Xinjiang); foshan-where-to-stay-zumiao-or-shunde (Foshan, Guangdong); chengde-where-to-stay-resort-edge-or-station-side (Chengde, Hebei); ningbo-where-to-stay-tianyi-old-bund-dongqian-lake (Ningbo, Zhejiang) | manual-independent-task-review |
| city-area-comparison\|where-to-in-or-station | harbin-where-to-stay-central-street-or-west-station (Harbin, Heilongjiang); kunming-where-to-stay-green-lake-nanping-south-station (Kunming, Yunnan); changsha-where-to-stay-wuyi-square-or-south-station (Changsha, Hunan); fuzhou-where-to-stay-sanfang-qixiang-or-south-station (Fuzhou, Fujian); nanning-where-to-stay-chaoyang-qingxiu-east-station (Nanning, Guangxi) | manual-independent-task-review |

## Evidence quality limitations

- Search Console live API, keyword volume, CPC, keyword difficulty and purchase probability are unavailable.
- The local Search Console chart and page tables do not reconcile, so no topic score uses those totals as a quantitative demand estimate.
- Competitor and community observations support task discovery only. Dynamic facts require the listed official/primary sources before drafting and again before publication.
- Programmatic eligibility is a governance flag, not authorization to build or index a tool/data page.
- Query-level numeric demand is unavailable for the mapped candidates. Reproducible query URLs and observed task-family evidence establish research relevance, but a central writing decision still requires a live source/SERP pack for the selected item.
- Asset feasibility means a lawful acquisition or no-image design is plausible; it does not mean the final licensed asset has already been acquired.

## Remaining uncertainty

- Search Console totals remain unreconciled between export tables.
- Some official English endpoints or operator pages may change before production; each selected topic must be rechecked at draft and release gates.
- No keyword-tool feed was available to calibrate relative demand, so the map should be reprioritized as Homeground accumulates query and conversion evidence.
- Tool/data candidates lack public implementation authority until Employee 8 completes a separate data-contract and QA review and the central editor approves it.

## Delivery checks

| Check | Result | Notes |
| --- | --- | --- |
| Final JSON parser and schema assertions | PASS | Exactly 1,000 identities; 1,000 unique IDs, slugs, normalized titles and priority ranks; graph references resolve |
| JSON / CSV / Markdown identity sets | PASS | All three contain the same 1,000 topic IDs and canonical slugs |
| CSV independent import | PASS | PowerShell `Import-Csv` returned 1,000 rows and 1,000 unique IDs |
| CSV workbook round-trip | PASS | `@oai/artifact-tool` loaded one `A1:AT1001` table: 1,001 rows including the header and 46 columns; head and tail identities were inspected |
| Status and locale rules | PASS | 38 published, 3 completed-not-published, 1 in-production and 958 mapped-validated; every identity plans EN/ZH/KO as one canonical identity |
| Demand-metric guard | PASS | Search volume, CPC, keyword difficulty, CTR, conversion rate and purchase probability are null for all 1,000 identities |
| Independent duplicate/owner audit | PASS | Exact slug/title/query collision 0; needs-fix 0; unresolved disposition owner 0; new month/nationality/audience/day/year/reverse-route matrix 0 |
| Existing cannibalization risk | OPEN — CENTRAL DECISION | The five published nationality-entry pages overlap the structured entry owner. They stay protected, receive no new variants and need a separately approved migration/redirect decision |
| Template-production risk | REVIEW BEFORE PRODUCTION | Five repeated title frames remain only where the named city/route task changes: where-to-stay, route order, stay-plus-station and two airport/station frames. Each needs page-specific evidence and assets before approval |
| Live sitemap and PR #31 locale URLs | PASS | Sitemap HTTP 200 with 148 URLs: 3 guide directories and 106 unique guide-detail URLs; all six newly released locale URLs returned 200 |
| Search Console export reconciliation | WARNING | Chart: 11 clicks / 804 impressions; visible query table: 0 / 153; page table: 12 / 1,322. No quantitative candidate demand was inferred |
| Topic-level primary-source URL reachability | WARNING | 256 unique URLs tested: 186 reachable, 18 automation-restricted, 50 network/TLS failures, one 404 and one 504. This is reachability QA, not factual validation |
| Guide registry generation/check | PASS | 18 content-guide folders verified; two ignored local generated files created for checking only |
| TypeScript typecheck | PASS | `tsc --noEmit` completed successfully |
| Planning-scope and font coverage checks | PASS | Three-language scope copy passed; all required Chinese/Korean characters passed coverage checks |
| Content manifest check on Windows | ENVIRONMENT WARNING | Semantic normalized output matches the tracked zero-entry manifest; raw check fails only because the tracked file is CRLF and the generator emits LF |
| Inquiry tests on Windows | BASELINE WARNING | 284/287 passed; three tests use LF-sensitive regexes against unmodified CRLF checkout files. No inquiry code changed in this branch |
| Production build | NOT RUN LOCALLY | The docs-only branch relies on Draft PR CI's clean Linux checkout; no local build is claimed |
| `git diff --check` / Draft PR CI | PENDING AT SNAPSHOT | Must pass after final file staging and push; the final handoff records the actual results |

The independent audit reviewed 119 explicit merge/reject exclusions: 96 resolve to a counted canonical owner, 10 are deliberately descriptive modules, eight are rejects and five consolidate into the non-counting internal Route Reality Checker specification. No public tool authority is implied.
