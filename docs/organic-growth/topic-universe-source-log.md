# Topic Universe source log

Checked: 2026-08-11T23:52:38+08:00

## Availability declaration

| Dataset / tool | Availability | Use rule |
| --- | --- | --- |
| Latest origin/main and remote refs | available | Canonical implementation and inventory evidence |
| Live sitemap and published guides | available | Live URL/locale verification |
| Search Console live/API access | unavailable | No live query or page analysis claimed |
| Search Console local export | available-with-quality-warning | Directional only; chart and page totals conflict |
| Keyword volume / CPC / KD | unavailable | No numbers guessed |
| Semrush or another authenticated keyword-tool feed | unavailable | No plugin/tool estimates imported |
| Purchase probability | unavailable | Business role is qualitative, never a probability |
| Sampled Google SERP/autocomplete | available-qualitative | Task discovery only; autocomplete is not volume |
| Sampled Google PAA block | unavailable-in-sample | No PAA evidence claimed |
| Google Trends | available-relative-only | Broad relative context, not demand volume |
| Competitor and community pages | available-qualitative | Gap/task language, never factual authority |
| Homeground Messenger, WhatsApp, Naver and customer-question exports | unavailable | No customer-demand claim made from inaccessible account data |
| Private Facebook groups and authenticated social analytics | unavailable | No private-group or platform-volume claim made |
| Official and operator sources | available-topic-dependent | Draft and release facts must be rechecked by maintenance class |

## Audited source catalog

| ID | Type | Source | URL / location | Use | Limitation |
| --- | --- | --- | --- | --- | --- |
| repo-main | repository | Canonical repository baseline | git:origin/main@0d66aebaee9f0a0253833a55c37a3ca584484853 | Published identities, taxonomy, production rules and canonical boundaries. | A Git branch records implementation state, not external demand. |
| repo-pr30 | repository | Central Search Map decisions draft PR #30 | https://github.com/yangchunxuan/travel-china-with-xuan/pull/30 | Approved, deferred, research-only, merge and update routing decisions not yet merged to main. | Draft PR state is not production state. |
| github-issue-26 | repository-workflow | GitHub Issue #26: Shanghai Pudong or Hongqiao Airport | https://github.com/yangchunxuan/travel-china-with-xuan/issues/26 | approved-writing issue and durable draft state | Issue state records workflow authority, not publication or search demand. |
| github-issue-27 | repository-workflow | GitHub Issue #27: Terracotta Warriors Without a Tour | https://github.com/yangchunxuan/travel-china-with-xuan/issues/27 | approved-writing issue and durable draft state | Issue state records workflow authority, not publication or search demand. |
| github-issue-28 | repository-workflow | GitHub Issue #28: China Public Holidays and Travel Crowds | https://github.com/yangchunxuan/travel-china-with-xuan/issues/28 | approved-writing issue and durable draft state | Issue state records workflow authority, not publication or search demand. |
| github-issue-29 | repository-workflow | GitHub Issue #29: Ancient-site restoration | https://github.com/yangchunxuan/travel-china-with-xuan/issues/29 | research-only issue; no public canonical authorization | Issue state records workflow authority, not publication or search demand. |
| repo-remote-article-codex-refs | repository-inventory | All fetched origin/article/* and origin/codex/* refs | git:refs/remotes/origin/article/* + refs/remotes/origin/codex/* | Deduplication of released, pending-visual, durable-draft, specification and historical branch artifacts by canonical slug. | Branches may contain superseded or non-editorial work; branch existence is not publication or demand evidence. |
| live-sitemap | first-party-live | Homeground sitemap | https://homegroundchina.com/sitemap.xml | Live URL and locale verification. | A sitemap confirms discoverable URLs, not demand or content quality. |
| gsc-local-export | first-party-search-performance | Search Console performance export | local-file:C:/Users/User/Downloads/homegroundchina.com-Performance-on-Search-2026-08-11.zip | Directional first-party query and page evidence: chart total 11 clicks and 804 impressions for 2026-07-09 through 2026-08-09; query table contains 94 visible rows. | Live Search Console API unavailable. Page-table totals (12 clicks, 1,322 impressions) do not reconcile with chart totals, anonymized queries hide demand, and the sample is too small for topic-level volume claims. |
| google-serp-sample | search-result-sample | Google SERP and autocomplete qualitative sample | https://www.google.com/search?q=China+travel+planning+questions+foreign+tourists | Qualitative task language and result-shape review only. | No numeric volume, stable ranking or purchase probability is inferred. No PAA block appeared in the sampled result. Autocomplete is not search volume. The sampled AI overview contained stale or unsafe entry/hotel claims and was excluded as a factual source. |
| google-trends | relative-interest | Google Trends: China travel | https://trends.google.com/trends/explore?q=China%20travel | Broad directional seasonality context. | Worldwide 12-month relative index only; not search volume and not candidate-level evidence. Partial current weeks are not interpreted as a decline. |
| competitor-china-highlights | competitor | China Highlights | https://www.chinahighlights.com/travelguide/ | Coverage-shape and information-architecture comparison. | URL quantity is not independent demand and is not copied as Homeground taxonomy. |
| competitor-travelchinaguide | competitor | TravelChinaGuide | https://www.travelchinaguide.com/ | Broad practical and destination coverage comparison. | Page-level update labels did not reliably prevent stale modules; one sampled Beijing page still referenced closed Nanyuan Airport. |
| competitor-china-discovery | competitor | China Discovery | https://www.chinadiscovery.com/ | Destination and itinerary cluster comparison. | Commercial-tour inventory and editorial identities are not equivalent. |
| competitor-trip | competitor | Trip.com China Travel | https://www.trip.com/guide/destination/china.html | Booking-adjacent task and destination coverage comparison. | Marketplace incentives and inventory can shape coverage. |
| competitor-lonely-planet | competitor | Lonely Planet China | https://www.lonelyplanet.com/china | General destination coverage comparison. | Broad editorial coverage is not proof that a specific task deserves a standalone page. |
| competitor-rough-guides | competitor | Rough Guides China | https://www.roughguides.com/china/ | General planning coverage and freshness-risk comparison. | A current page sample retained stale COVID/check/cash modules, so source-reviewed modules are required. |
| community-reddit-chinatravel | community | r/chinatravel recurring questions | https://www.reddit.com/r/chinatravel/ | Observed traveller language, failure modes and decision friction around routes, booking, payments, apps and feasibility. | Self-selected anecdotes; not representative volume and not authoritative for dynamic facts. |
| official-nia | official | National Immigration Administration | https://en.nia.gov.cn/n147413/c178106/content.html | Entry and transit policy feasibility. | Must be rechecked on policy change; secondary summaries cannot replace it. |
| official-12306 | official | China Railway 12306 English | https://www.12306.cn/en/index.html | Rail booking, identity and station process feasibility. | Timetables and operational access can change. |
| official-government-visit | official | State Council Visit China services | https://english.www.gov.cn/services/visitchina | Cross-agency traveller service and practical-policy routing. | Article topics still require the responsible agency or local operator where available. |
| official-pboc-payment | official | People's Bank of China payment guide | https://www.pbc.gov.cn/en/3688110/3688172/5188125/index.html | Foreign-visitor payment feasibility and governed dynamic facts. | App screens and provider workflows can change faster than policy pages. |
| official-caac | official | Civil Aviation Administration of China | https://www.caac.gov.cn/English/ | Aviation rules and airport-source routing. | Airport-specific operations require the relevant airport operator source. |
| official-mct | official | Ministry of Culture and Tourism / Visit China | https://www.travelchina.org.cn/en | Destination, heritage, festival and tourism-source feasibility. | Local opening, ticketing and preservation facts require venue or local-government confirmation. |
| official-unesco | official | UNESCO China World Heritage list | https://whc.unesco.org/en/statesparties/cn | Heritage identity and designation feasibility. | Visitor operations require site-specific official sources. |
| official-cma | official | China Meteorological Administration | https://www.cma.gov.cn/en/ | Weather and climate-source feasibility. | Long-range planning content must distinguish climate normals from forecasts and exceptional events. |

## Most reused topic-level sources

| Source | Identity references |
| --- | --- |
| https://www.reddit.com/r/chinatravel/comments/1ugaqcs/what_does_everyone_actually_use_to_plan_their/ | 994 |
| https://www.reddit.com/r/travelchina/comments/1tto8t7/common_mistakes_i_keep_seeing_in_china_travel/ | 994 |
| https://www.reddit.com/r/travelchina/comments/1vk6qqe/planning_a_trip_to_china_you_can_ask_me_questions/ | 994 |
| https://www.chinadiscovery.com/ | 958 |
| https://www.chinahighlights.com/travelguide/ | 958 |
| https://www.lonelyplanet.com/destinations/china | 958 |
| https://www.roughguides.com/china/ | 958 |
| https://www.travelchinaguide.com/ | 958 |
| https://www.trip.com/china-travel | 958 |
| https://www.travelchina.org.cn/en | 427 |
| https://www.mct.gov.cn/ | 413 |
| https://www.12306.cn/en/index.html | 376 |
| https://www.mct.gov.cn/?language=en | 362 |
| local-file:C:/Users/User/Downloads/homegroundchina.com-Performance-on-Search-2026-08-11.zip | 347 |
| https://www.tripadvisor.com/ShowForum-g294211-i642-China.html | 334 |
| https://english.www.gov.cn/2025special/bizexpatsinchina2025 | 254 |
| https://www.samr.gov.cn/ | 180 |
| https://en.nia.gov.cn/ | 164 |
| https://www.cma.gov.cn/en/ | 150 |
| https://english.www.gov.cn/services/visitchina | 140 |
| https://whc.unesco.org/en/statesparties/cn | 139 |
| https://www.caac.gov.cn/English/ | 127 |
| https://www.trip.com/hotels/ | 115 |
| https://trends.google.com/trends/explore?q=China%20travel | 110 |
| https://www.caac.gov.cn/en/ | 94 |
| https://www.chinahighlights.com/festivals/ | 89 |
| https://en.nia.gov.cn/n147418/n147463/c183412/content.html | 79 |
| https://en.nhc.gov.cn/ | 76 |
| https://www.travelchinaguide.com/cityguides/ | 74 |
| https://www.travelchinaguide.com/intro/ | 74 |
| https://www.amap.com/ | 67 |
| https://www.cma.gov.cn/en2014/ | 60 |
| http://www.caac.gov.cn/en/ | 59 |
| https://map.baidu.com/ | 58 |
| https://map.qq.com/ | 58 |
| https://www.travelchinaguide.com/essential/holidays/ | 53 |
| https://ich.unesco.org/en/state/china-CN | 46 |
| https://www.nia.gov.cn/ | 41 |
| https://www.chinahighlights.com/travelguide/culture/ | 38 |
| https://www.chnmuseum.cn/ | 38 |
| https://www.gov.cn/zhengce/zhengceku/202511/content_7047091.htm | 38 |
| https://english.www.gov.cn/services/ | 37 |
| https://www.chinahighlights.com/travelguide/chinese-food/ | 37 |
| https://www.travelchinaguide.com/attraction/ | 37 |
| https://www.travelchinaguide.com/intro/cuisine_drink/ | 37 |
| https://www.mfa.gov.cn/eng/ | 36 |
| https://www.travelchinaguide.com/climate/ | 34 |
| https://www.sac.gov.cn/ | 22 |
| https://www.visaforchina.cn/ | 22 |
| http://english.customs.gov.cn/ | 20 |
| http://www.pbc.gov.cn/en/3688006/index.html | 20 |
| https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html | 20 |
| https://www.booking.com/country/cn.html | 20 |
| https://www.cac.gov.cn/ | 20 |
| https://www.pbc.gov.cn/en/ | 20 |
| https://english.www.gov.cn/ | 19 |
| https://std.samr.gov.cn/ | 19 |
| https://www.cdpf.org.cn/ | 13 |
| https://www.unionpayintl.com/en/ | 12 |
| https://www.miit.gov.cn/ | 11 |
| https://www.airchina.com.cn/en-US/ | 8 |
| https://us.ceair.com/en/ | 7 |
| https://weather.cma.cn/ | 7 |
| https://www.csair.com/en/ | 7 |
| https://www.gzmtr.com/ | 7 |
| https://www.mtr.com.hk/en/customer/main/index.html | 6 |
| https://english.beijing.gov.cn/ | 5 |
| https://global.alipay.com/ | 5 |
| https://www.marriott.com/ | 5 |
| https://www.shmetro.com/ | 5 |
| https://zwfw.mct.gov.cn/ | 5 |
| https://pay.weixin.qq.com/index.php/public/wechatpay_en | 4 |
| https://www.redcross.org.cn/ | 4 |
| https://www.szmc.net/ | 4 |
| https://english.shanghai.gov.cn/ | 3 |
| https://support.apple.com/en-us/HT212780 | 3 |
| https://www.bcia.com.cn/ | 3 |
| https://whc.unesco.org/en/list/779 | 2 |
| https://www.bdia.com.cn/ | 2 |
| https://www.cea.gov.cn/ | 2 |
| https://www.chinatax.gov.cn/eng/ | 2 |
| https://www.hilton.com/ | 2 |
| https://www.hongkongairport.com/ | 2 |
| https://www.mee.gov.cn/ | 2 |
| https://www.sxd.cn/ | 2 |
| https://amr.yn.gov.cn/info/1030/39259.htm | 1 |
| https://big5.www.gov.cn/gate/big5/www.gov.cn/zhengce/zhengceku/202511/content_7047091.htm | 1 |
| https://bwg.hongxingxuanpaper.com.cn/ | 1 |
| https://cave17.e-dunhuang.com/ | 1 |
| https://cbtb.quanzhou.gov.cn/xwdt/bjdt/202502/t20250226_3143384.htm | 1 |
| https://ccam.hzxcw.gov.cn/m/about.html | 1 |
| https://e.cflac.org.cn/Associations/Acrobatics/ | 1 |
| https://ehangzhou.gov.cn/2026-06/15/c_298010.htm | 1 |
| https://en.chinajoy.net/ | 1 |
| https://en.chnmuseum.cn/collections_577/collection_highlights_608/ancient_currencies_613/ | 1 |
| https://en.chnmuseum.cn/collections_577/collection_highlights_608/artifacts_handed___down_from_ancient_times_612/202109/t20210918_251257.html | 1 |
| https://en.chnmuseum.cn/exhibition/exhibition_series/special_exhibitions/202102/t20210210_248989.html | 1 |
| https://en.chnmuseum.cn/exhibition/exhibition_series/temporary_exhibitions/archaeological_discovery_exhibition/202602/t20260203_278447.html | 1 |
| https://en.chnmuseum.cn/exhibition/exhibition_series/temporary_exhibitions/historical_and_cultural_exhibition/201911/t20191126_174557.html | 1 |
| https://en.chnmuseum.cn/exhibition/exhibition_series/temporary_exhibitions/selected_historical_artifacts_exhibitions/202008/t20200821_247096.html | 1 |

## Fetched article/codex remote refs audited (39)

- `origin/article/beijing-where-to-stay-first-trip`
- `origin/article/worker-1-beijing-railway-stations`
- `origin/article/worker-1-guangzhou-baiyun-airport-t2-t3`
- `origin/article/worker-1-pudong-airport-to-shanghai-disneyland`
- `origin/article/worker-1-shanghai-pudong-vs-hongqiao`
- `origin/article/worker-2-forbidden-city-foreign-visitors`
- `origin/article/worker-2-terracotta-warriors-without-tour`
- `origin/article/worker-3-first-shared-meal`
- `origin/article/worker-3-guangzhou-morning-tea`
- `origin/article/worker-3-how-to-read-suzhou-garden`
- `origin/article/worker-4-china-last-night-buffer`
- `origin/article/worker-4-china-night-train-decision`
- `origin/article/worker-4-china-open-jaw`
- `origin/article/worker-4-china-public-holidays`
- `origin/article/worker-4-route-reality-checker-spec`
- `origin/article/worker-5-china-hotel-near-metro`
- `origin/article/worker-5-foreigners-china-hotel`
- `origin/codex/batch-c-five-guide-release-20260811`
- `origin/codex/classify-test-inquiries-20260726`
- `origin/codex/editorial-ui-alignment-20260811`
- `origin/codex/fix-utm-intake-20260726`
- `origin/codex/homeground-article-02`
- `origin/codex/homeground-article-03`
- `origin/codex/homeground-article-04`
- `origin/codex/itinerary-rush-guide-release-20260722`
- `origin/codex/itinerary-trilingual-redesign-20260722`
- `origin/codex/language-nav-zh-fix-20260811`
- `origin/codex/logo-home-reset-20260722`
- `origin/codex/new-brand-mark-20260730`
- `origin/codex/pending-visual-batch-b-20260810`
- `origin/codex/pending-visual-batch-c-20260811`
- `origin/codex/phase0-search-platform-20260809`
- `origin/codex/restore-ga4-20260725`
- `origin/codex/seo-search-map-central-decisions-20260811`
- `origin/codex/ten-day-guide`
- `origin/codex/transport-guide-release-20260722`
- `origin/codex/worker-2-lijiang-dayan-vs-shuhe`
- `origin/codex/worker-2-panda-base-vs-panda-valley`
- `origin/codex/worker-3-4-release-20260811`

Search volume, CPC, keyword difficulty, traffic forecasts and purchase probability are intentionally absent because no trustworthy tool feed was available.

## Automated primary-source reachability QA

The 1,000 identities reference 256 unique `likelyPrimarySources` URLs. A post-generation QA request used a 2 KB ranged GET, a 12-second timeout and 14 concurrent requests. This checks only whether an endpoint answered the automated client; it does not validate the page's facts, authority, reuse rights or suitability for a future draft.

| Result | Unique URLs | Interpretation |
| --- | --- | --- |
| HTTP 2xx/3xx reachable | 186 | Endpoint answered; content still requires human source review |
| HTTP 401/403/405/406/412/429 | 18 | Automated access restricted; do not label the source unavailable without browser/manual review |
| Network, TLS or timeout failure | 50 | Unverified from this environment; recheck manually before selecting the topic |
| HTTP 404 | 1 | Dead endpoint recorded below; do not cite it until replaced |
| HTTP 504 | 1 | Upstream timeout recorded below; recheck rather than treating it as a stable failure |

- `https://www.gov.cn/hudong/202405/content_6952770.htm?show_loading=0&webview_progress_bar=1` returned 404. It is one of six planned sources on the locked `foreigners-china-hotel` identity; the other official sources remain, but this URL must be replaced before the page's next source refresh.
- `https://www.mot.gov.cn/xinwen/jiaotongyaowen/202602/t20260206_4199877.html` returned 504 during automation. The `qiongzhou-strait-fog-and-ferry-buffer` candidate remains research-gated and must be rechecked with its other MOT/CMA sources before approval.

Restricted and network-failed endpoints are recorded as **not verified by automation**, not as proof that the source is unavailable. A reachable response is likewise not a claim that a future article fact has been verified.
