# Homeground Search Map 快照 — 2026-08-11

状态：`SEARCH MAP SYNCHRONIZED — CENTRAL-APPROVED BATCH NOT YET PUBLISHED`

本快照是团队唯一的选题与搜索任务主账本的人类可读版本。机器可读权威文件是 `docs/organic-growth/search-map.json`。2026-08-20 的同步段落取代下文保留的 2026-08-11 历史审计口径；历史段落用于追踪当时的决定，不得再用来判断当前发布状态。

## 2026-08-20 同步结论

- 最新基线：`origin/main@cbbfddabe2513874cc4e55981e08244db7338ff9`。
- 当前指南库存：**173 个内容身份、513 个 locale URL**；其中 154 个独立 guide 目录均三语，另有 19 个受保护 legacy guide 身份（16 个三语、3 个仅英文）。三语始终只算一个身份。
- 当前已发布城市 Hub：**5 个身份、15 个 locale URL**，分别为 Beijing、Shanghai、Xi'an、Chengdu、Guangzhou。再计 1 个英文系统 entry collection，当前公开编辑型详情总数为 **179 个身份、529 个 URL**。
- `first-shared-meal-in-china` 已随 PR #31 发布；`foreigners-china-hotel` 已随 PR #50 发布；`china-esim-vs-local-sim` 已随 PR #41 发布。三项都不能继续标作等待审核或本地不耐久稿。
- 中央本批批准但尚未发布：Zhangjiajie City Hub、China Online Arrival Card、Zhangjiajie National Forest Park tickets/entrances/in-park transport workflow。
- `First 24 Hours in China`：`defer / not-started / not-published`；arrival-card canonical owner 形成且 collection gate 重新审核前，不写正文、不建公开页。
- 待完成库存：`chongqing-railway-station-selector` 是 durable draft，仍需日期和重庆东站来源复核；Hangzhou Hub 是 durable draft package，仍需转为 runtime、补真实素材和最终 Gate B/三语 QA。二者均未发布。
- Search Console 最新可用小样本为 2026-07-09 至 2026-08-18：17 clicks、1,060 impressions、CTR 1.6%、average position 20.5。隐私过滤隐藏大量 query；关键词量、CPC、难度、购买概率仍为**不可用**。
- 本同步不虚构 GitHub Issue URL；三个新批准项的 `executionIssueUrl` 都是 `null`。中央批准只授权有边界的实现与审核，不等于合并、部署或上线。

## 1. 口径与输入审计

- 内容身份：英文、中文、韩文最多是同一内容身份的三个 locale，不按三篇计算。
- 仓库基线：最新 `origin/main`，提交 `cbbfddabe2513874cc4e55981e08244db7338ff9`。本次平台同步工作在独立 worktree `C:/Users/User/Documents/宝格丽的agent/homeground-seo-platform-20260820` 和分支 `codex/seo-gap-platform-20260820` 完成。
- 仓库规范：已完整读取 `docs/article-production-lite.md` 与 `docs/homeground-search-platform-phase-1-spec.md`。
- 线上：2026-08-11 17:03（Asia/Shanghai）复核了 [sitemap](https://homegroundchina.com/sitemap.xml)、[guides 目录](https://homegroundchina.com/guides/) 与 PR #24 的六个 locale URL。6/6 均为 200、自 canonical、`index, follow`，并有对应的 en、zh-Hans、ko、x-default hreflang；技术可索引不等于 Google 已实际收录。
- 远端：已检查全部 34 个 `origin/article/*` 与 `origin/codex/*` ref，包括新增的 `origin/codex/batch-c-five-guide-release-20260811`；修复或视觉整合分支只算相同稿件的新版本；current-round draft/spec 仍按既有六张票据计数。
- 现有 Search Map：**可用（旧分支）**。来源为 `ops/seo-intelligence-20260811@a30caec2d53ba5e2cea21167d2ea541ce547b885`；本轮复制到 PR #24 基线后修订，没有修改旧分支。
- Search Console：**可用但样本很小**。`sc-domain:homegroundchina.com` 在 2026-07-09 至 2026-08-18 有 17 clicks、1,060 impressions、CTR 1.6%、average position 20.5。隐私过滤隐藏大量 query；该样本只作基线、CTR/排名和蚕食验证，不承担市场发现。
- 关键词工具：**不可用**。没有已认证的 Keyword Planner、Semrush 等体量工具；搜索量、CPC、关键词难度、购买概率与流量预测均未估算。
- Google Trends：**可用但仅为相对趋势**。使用全球、过去五年、Travel 类别、Google 网页搜索；不同图不能横比，0 可能只是低于显示阈值，不能当月搜索量。
- 当前 SERP 与真实问题：可用但只作定性任务证据。没有把 Google 自动补全、结果数量、论坛帖数或 Trends 指数当搜索量。
- 内容疆域：允许规划、城市、景点、地点型历史/传说与非政治旅行新闻；新闻必须影响去哪、何时去、怎么去或值不值得，优先更新常青 owner。政治、意识形态和地缘评论为硬拒绝。

## 2. 总览

| 状态 | 内容身份数 | 说明 |
|---|---:|---|
| 已发布指南身份 | 173 | 154 个独立 guide + 19 个 legacy guide；共 513 个 locale URL |
| 已发布城市 Hub | 5 | Beijing、Shanghai、Xi'an、Chengdu、Guangzhou；共 15 个 locale URL |
| Guides 目录 | 1 | `/guides/` 的 en/zh/ko 三个 locale URL |
| Section Hub | 9 | 6 个 published/indexable；when-to-go、culture、tools 为 review/noindex |
| 本轮开工时锁定稿 | 14 | 14 个身份全部已纳入且仍禁止重选 |
| 旧 14 稿的当前制作中 | 0 | PR #23 已将 Batch C 五个身份全部转为 published/indexable；本轮六票另按四层状态记录 |
| 本轮候选 | 18 | 六个内容池各 3 个 |
| 2026-08-11 六张历史票 | 6 | 除 Route Reality Checker 仍是内部规格外，五篇文章 owner 均已发布；历史票不重开 |
| 2026-08-20 批准项 | 3 | Zhangjiajie Hub、Online Arrival Card、Forest Park workflow；均为 not-published |
| 外部市场观察簇 | 12 | 只进入下一轮研究池，不是 candidateId、票据或开工授权 |
| 合并/更新路由 | 9 | 8 个候选路由 + 1 个已合并 legacy shell；不创建第二 canonical URL |
| 明确拒绝模式 | 12 | 包含近义页和排列组合页 |
| 动态事实复核组 | 12 | 法规、机场、铁路、支付、门票、非政治旅行新闻等 |

2026-08-11 的线上 sitemap 142 URL 仅保留为历史快照，不再代表当前库存。最新 `origin/main` 的指南源库存为 173 个身份、513 个 locale URL；另有 5 个已发布城市 Hub、15 个 locale URL。技术可索引不等于 Google 已实际收录。

### 审计期间状态变化

本轮启动时 14 个未上线身份全部进入锁题账本。08:18 复核时，Beijing stay、national HSR、October timing 与 tourist payments 四项已随 `origin/main@6df1f55` 三语上线。

12:33，PR #22 合并为 `origin/main@60bc288`；12:50 线上核验确认 Guangzhou airport、Pudong→Disney、Lijiang Dayan vs Shuhe、Guangzhou morning tea 与 Suzhou garden interpretation 五项三语上线。

13:03，PR #23 合并为 `origin/main@f521ef7`；13:23 线上核验确认 panda venue、last-night buffer、night train vs HSR、open-jaw 与 hotel-near-metro 的 15 个 locale URL 全部上线。至此 14 个开工锁题 **14/14 均已发布**，旧 14 稿制作中为 0。状态迁移不会解除锁题，也不会把 Batch C 的整合分支或原始员工分支重复计数。

14:11，PR #24 合并为 `origin/main@8769b2f`。17:03 线上核验确认 `which-beijing-railway-station` 与 `forbidden-city-for-foreign-visitors` 的六个 locale URL 全部上线。两页 `datePublished`、`dateModified` 与 `sourceReviewedDate` 均为 2026-08-11；release PR 为 [#24](https://github.com/yangchunxuan/travel-china-with-xuan/pull/24)。

2026-08-11 六张票仍作为历史锁题记录：北京站、故宫、shared-meal、foreign-hotel 与 eSIM 均为 `selected / approved / release-completed / published`；Route Reality Checker 仍为 `selected / pending-review / specification-submitted / not-published`，且不授权公开工具。

重复风险提示：北京站点正式 owner 已扩展为北京、北京西、北京南、北京北、清河、北京朝阳、北京丰台、北京通州八站，并以 `primaryIntent: plan` / `family: comparison` 发布。旧的五站标题和 `execute / combined-decision` 提案边界已被正式页面取代；八站仍是一个 canonical identity，不能拆成八页。

历史交付风险已关闭：eSIM owner 已进入 canonical repository，并通过 PR #41 发布三语版本；旧本地英文稿路径不再是当前执行状态。

## 3. 已发布清单

| Canonical owner | 已发布题目 | Locale | Section / primary collection | 任务边界 | 新鲜度 |
|---|---|---|---|---|---|
| `zhangjiajie-itinerary` | [Zhangjiajie Itinerary: What Fits in 2, 3 or 4 Days](https://homegroundchina.com/guides/zhangjiajie-itinerary/) | en/zh/ko | plan / `plan-trip-length-city-order` | 2、3、4 天同页，不拆日数页 | low / quarterly |
| `zhangjiajie-from-malaysia` | [Zhangjiajie From Malaysia: Private Trip Guide (2026)](https://homegroundchina.com/guides/zhangjiajie-from-malaysia/) | en/zh/ko | plan / `plan-traveller-theme-itineraries` | 马来西亚出发到张家界；不拆 KL/Penang × 日数 | high / source change |
| `zhangjiajie-glass-bridge-vs-skywalk` | [Zhangjiajie Glass Bridge vs Skywalk](https://homegroundchina.com/guides/zhangjiajie-glass-bridge-vs-skywalk/) | en/zh/ko | explore / `explore-attractions-nature-heritage` | 两种体验的选择任务 | medium / quarterly |
| `kevin-before-the-hotel-pickup` | [Before the Hotel Pickup](https://homegroundchina.com/guides/kevin-before-the-hotel-pickup/) | en/zh/ko | essentials / `essentials-booking-registration-recovery` | 导游日开始前的执行过程，不回答“是否需要导游” | low / quarterly |
| `zhangjiajie-older-travellers` | [Zhangjiajie with Older Travellers](https://homegroundchina.com/guides/zhangjiajie-older-travellers/) | en/zh/ko | plan / `plan-traveller-theme-itineraries` | 张家界场景下的体力、步行与设施适配 | medium / quarterly |
| `best-zhangjiajie-night-show` | [Best Zhangjiajie Night Show? Compare 3 Major Shows](https://homegroundchina.com/guides/best-zhangjiajie-night-show/) | en/zh/ko | explore / `explore-attractions-nature-heritage` | 三个演出的同一选择任务，不拆薄页 | high / source change |
| `beijing-zhangjiajie-shanghai-10-days` | [Beijing–Zhangjiajie–Shanghai in 10 Days](https://homegroundchina.com/guides/beijing-zhangjiajie-shanghai-10-days/) | en/zh/ko | plan / `plan-trip-length-city-order` | 精确三城十天可行性 | medium / quarterly |
| `beijing-zhangjiajie-shanghai-transport` | [Beijing–Zhangjiajie–Shanghai: Train or Flight?](https://homegroundchina.com/guides/beijing-zhangjiajie-shanghai-transport/) | en/zh/ko | transport / `transport-city-pair-routes` | 同一走廊的交通执行，不重写十天行程 | high / source change |
| `is-your-china-itinerary-too-rushed` | [China Itinerary Too Rushed?](https://homegroundchina.com/guides/is-your-china-itinerary-too-rushed/) | en/zh/ko | plan / `plan-budget-pace-decisions` | 全国通用的节奏与城市数量判断 | low / quarterly |
| `china-itinerary-with-older-parents` | [China With Older Parents: 12–14 Days](https://homegroundchina.com/guides/china-itinerary-with-older-parents/) | en/zh/ko | plan / `plan-traveller-theme-itineraries` | 全国多城、父母同行；与张家界专页分工 | medium / quarterly |
| `do-us-citizens-need-visa-china-2026` | [US passport China visa guide](https://homegroundchina.com/guides/do-us-citizens-need-visa-china-2026/) | en/zh/ko | essentials / `essentials-entry-transit` | 美国护照特定任务 | critical / source change |
| `china-visa-free-uk-citizens-2026` | [UK citizens 30-day visa-free rules](https://homegroundchina.com/guides/china-visa-free-uk-citizens-2026/) | en | essentials / `essentials-entry-transit` | 英国护照特定法律任务 | critical / source change |
| `china-visa-free-canadian-citizens-2026` | [Canadian citizens 30-day visa-free rules](https://homegroundchina.com/guides/china-visa-free-canadian-citizens-2026/) | en | essentials / `essentials-entry-transit` | 加拿大护照特定法律任务 | critical / source change |
| `china-visa-free-new-zealand-citizens-2026` | [New Zealand citizens 30-day visa-free rules](https://homegroundchina.com/guides/china-visa-free-new-zealand-citizens-2026/) | en | essentials / `essentials-entry-transit` | 新西兰护照特定法律任务 | critical / source change |
| `china-240-hour-visa-free-transit-route-check` | [China 240-Hour Visa-Free Transit: Does Your Route Qualify?](https://homegroundchina.com/guides/china-240-hour-visa-free-transit-route-check/) | en/zh/ko | essentials / `essentials-entry-transit` | 线路、第三国与口岸规则；不拆城市页 | critical / source change |
| `do-singaporeans-need-visa-china` | [Singapore passport China entry](https://homegroundchina.com/guides/do-singaporeans-need-visa-china/) | en/zh/ko | essentials / `essentials-entry-transit` | 新加坡护照特定任务 | critical / source change |
| `why-are-hotels-in-china-so-cheap` | [Why Are Hotels in China So Cheap?](https://homegroundchina.com/guides/why-are-hotels-in-china-so-cheap/) | en/zh/ko | stay / `stay-hotel-types-scenic-bases` | 住宿价值与类型选择，不做城市×星级×月份价格页 | high / source change |
| `do-you-need-a-tour-guide-in-china` | [Do You Need a Tour Guide in China?](https://homegroundchina.com/guides/do-you-need-a-tour-guide-in-china/) | en/zh/ko | services / `services-guides-experiences` | 是否需要支持的决策 | medium / quarterly |
| `how-much-does-a-china-trip-cost` | [How Much Does a Trip to China Cost?](https://homegroundchina.com/guides/how-much-does-a-china-trip-cost/) | en/zh/ko | plan / `plan-budget-pace-decisions` | 全国总成本；不做价格排列组合 | high / source change |
| `beijing-where-to-stay-first-trip` | [Where to Stay in Beijing on a First Trip](https://homegroundchina.com/guides/beijing-where-to-stay-first-trip/) | en/zh/ko | stay / `stay-city-areas` | 北京首次住宿四区比较；不拆四个 area 页面 | medium / quarterly |
| `china-high-speed-train-first-time-guide` | [China High-Speed Train Guide](https://homegroundchina.com/guides/china-high-speed-train-first-time-guide/) | en/zh/ko | transport / `transport-airports-rail-hubs` | 全国票务、车站流程、行李、席别与乘车；arrival buffer 也归本页 | high / source change |
| `china-in-october-golden-week-or-later` | [China in October: Golden Week or Later?](https://homegroundchina.com/guides/china-in-october-golden-week-or-later/) | en/zh/ko | when-to-go / `timing-holidays-crowds` | 全国十月/黄金周决策；不做城市×十月 | critical / annual + source change |
| `how-to-pay-in-china-as-a-tourist` | [How to Pay in China in 2026](https://homegroundchina.com/guides/how-to-pay-in-china-as-a-tourist/) | en/zh/ko | essentials / `essentials-payments-connectivity` | Alipay、WeChat、现金、卡与失败恢复完整栈 | critical / source change |
| `guangzhou-baiyun-airport-t2-t3` | [Guangzhou Baiyun Airport T2 or T3?](https://homegroundchina.com/guides/guangzhou-baiyun-airport-t2-t3/) | en/zh/ko | transport / `transport-airports-rail-hubs` | T2/T3、关闭航站楼、地铁/城际与走错航站楼恢复 | critical / source change |
| `pudong-airport-to-shanghai-disneyland` | [Pudong Airport to Shanghai Disneyland](https://homegroundchina.com/guides/pudong-airport-to-shanghai-disneyland/) | en/zh/ko | transport / `transport-last-mile-transfers` | Airport Link/taxi、儿童、行李、晚到是一个接驳任务 | high / source change |
| `lijiang-old-town-or-shuhe-where-to-stay` | [Dayan Old Town or Shuhe](https://homegroundchina.com/guides/lijiang-old-town-or-shuhe-where-to-stay/) | en/zh/ko | explore / `explore-cities-neighborhoods` | 丽江住哪里与大研/束河选择同属一个 owner | medium / quarterly |
| `how-guangzhou-morning-tea-works` | [How Guangzhou Morning Tea Works](https://homegroundchina.com/guides/how-guangzhou-morning-tea-works/) | en/zh/ko | culture / `culture-regional-food` | yum cha、dim sum、点单、礼仪与历史同页 | medium / quarterly |
| `how-to-read-a-suzhou-garden` | [How to Read a Suzhou Garden](https://homegroundchina.com/guides/how-to-read-a-suzhou-garden/) | en/zh/ko | culture / `culture-festivals-arts-contemporary` | 园林构成、借景与选择解释同一 owner | medium / quarterly |
| `chengdu-panda-base-or-dujiangyan-panda-valley` | [Chengdu Panda Base or Panda Valley?](https://homegroundchina.com/guides/chengdu-panda-base-or-dujiangyan-panda-valley/) | en/zh/ko | explore / `explore-attractions-nature-heritage` | 两处熊猫场馆的选择；入口、时间和半日路线并入 owner | high / source change |
| `china-last-night-before-international-flight` | [Should Your Last Night Be in Your Departure City?](https://homegroundchina.com/guides/china-last-night-before-international-flight/) | en/zh/ko | plan / `plan-budget-pace-decisions` | 离境前夜、同日转乘、机场/市区住宿属于一个缓冲决策 | medium / quarterly |
| `china-night-train-or-daytime-high-speed-rail` | [China Night Train or Daytime High-Speed Rail?](https://homegroundchina.com/guides/china-night-train-or-daytime-high-speed-rail/) | en/zh/ko | plan / `plan-budget-pace-decisions` | 夜间卧铺与白天高铁的方式选择；高铁执行流程归 HSR owner | high / source change |
| `china-open-jaw-flights-route-planning` | [China Open-Jaw Flights](https://homegroundchina.com/guides/china-open-jaw-flights-route-planning/) | en/zh/ko | plan / `plan-trip-length-city-order` | 一城进、另一城出与回头路成本；不拆进出城市组合 | medium / quarterly |
| `china-hotel-near-metro` | [How Close Should Your Hotel Be to the Metro?](https://homegroundchina.com/guides/china-hotel-near-metro/) | en/zh/ko | stay / `stay-city-areas` | 全国酒店地铁位置判断；不按城市或人群复制 | medium / quarterly |
| `which-beijing-railway-station` | [Which Beijing Railway Station? All 8 Compared](https://homegroundchina.com/guides/which-beijing-railway-station/) | en/zh/ko | transport / `transport-airports-rail-hubs` | 北京、北京西、北京南、北京北、清河、北京朝阳、北京丰台、北京通州八站同属一个选择 owner | high / source change |
| `forbidden-city-for-foreign-visitors` | [How to Visit the Forbidden City: Tickets and a 3-Hour Route](https://homegroundchina.com/guides/forbidden-city-for-foreign-visitors/) | en/zh/ko | explore / `explore-attractions-nature-heritage` | 预约、外籍证件、午门入口、三小时路线与神武门离场是一个执行任务 | critical / source change |
| `system-entry-requirements` | [China Entry Guides: Visa-Free Rules by Passport & Route](https://homegroundchina.com/guides/china-entry-requirements/) | en | essentials / `essentials-entry-transit` | 六个法律 owner 的系统路由 collection | critical / source change |

补充：旧路径 `/china-visa-free-uk-canada/` 是 noindex/follow canonical shell，canonical 指向 `system-entry-requirements`；不得复活成第二个入口页。

## 4. 本轮 14 个锁题身份：14 个均已上线，制作中为 0

分支 metadata 的 `datePublished` 本身不算上线证据；最终状态以最新 `origin/main` 与 live sitemap 为准。下表完整保留开工时的 14 个未上线身份，确保没有任何一个被再次选题。

| Pool | Canonical owner | 当前状态 | 当前权威版本 | 已锁定任务；禁止另起近义页 |
|---:|---|---|---|---|
| 1 | `china-high-speed-train-first-time-guide` | **published during audit** | `origin/main@6df1f55` | 全国首次乘高铁：票、12306、车站流程、席别、行李、乘车；arrival buffer 也并入 |
| 1 | `guangzhou-baiyun-airport-t2-t3` | **published via PR #22** | `origin/main@60bc288` | T2/T3、关闭航站楼、地铁/城际、走错航站楼 |
| 1 | `pudong-airport-to-shanghai-disneyland` | **published via PR #22** | `origin/main@60bc288` | PVG 到迪士尼；Airport Link/taxi、儿童、行李、晚到 |
| 2 | `lijiang-old-town-or-shuhe-where-to-stay` | **published via PR #22** | `origin/main@60bc288` | 丽江住宿 + 大研/束河选择 |
| 2 | `chengdu-panda-base-or-dujiangyan-panda-valley` | **published via PR #23** | `origin/main@f521ef7` | 场馆选择；时间、入口、半日路线并入同页 |
| 3 | `how-guangzhou-morning-tea-works` | **published via PR #22** | `origin/main@60bc288` | 早茶/yum cha/dim sum/点单/礼仪/历史是一个身份 |
| 3 | `how-to-read-a-suzhou-garden` | **published via PR #22** | `origin/main@60bc288` | 园林构成、借景与四园比较；“最好/选哪座园林”并入 |
| 4 | `china-last-night-before-international-flight` | **published via PR #23** | `origin/main@f521ef7` | 最后一晚、起飞前缓冲、同日转乘、机场酒店同义任务 |
| 4 | `china-night-train-or-daytime-high-speed-rail` | **published via PR #23** | `origin/main@f521ef7` | 夜车/日间高铁、硬卧/软卧、节省酒店同一决策 |
| 4 | `china-open-jaw-flights-route-planning` | **published via PR #23** | `origin/main@f521ef7` | 一城进、另一城出及线路设计；不拆城市组合 |
| 4 | `china-in-october-golden-week-or-later` | **published during audit** | `origin/main@6df1f55` | 全国十月/黄金周决策；不做城市×十月 |
| 5 | `beijing-where-to-stay-first-trip` | **published during audit** | `origin/main@6df1f55` | 北京首次住宿四区比较；不拆四个 area 页面 |
| 5 | `china-hotel-near-metro` | **published via PR #23** | `origin/main@f521ef7` | 全国酒店位置判断：行李、步行、家庭、无障碍 |
| 6 | `how-to-pay-in-china-as-a-tourist` | **published during audit** | `origin/main@6df1f55` | Alipay、WeChat、现金、卡、失败恢复的完整栈 |

### 4A. 本轮六张票据的分层状态与执行锁

| 票据 | candidateStatus | centralDecision | executionStatus | publicationStatus | Issue / release / live |
|---|---|---|---|---|---|
| `transport-20260811-01` | selected | approved | release-completed | published | Issue：`null`；PR [#24](https://github.com/yangchunxuan/travel-china-with-xuan/pull/24)；[EN](https://homegroundchina.com/guides/which-beijing-railway-station/) / [ZH](https://homegroundchina.com/zh/guides/which-beijing-railway-station/) / [KO](https://homegroundchina.com/ko/guides/which-beijing-railway-station/) |
| `destination-20260811-01` | selected | approved | release-completed | published | Issue：`null`；PR [#24](https://github.com/yangchunxuan/travel-china-with-xuan/pull/24)；[EN](https://homegroundchina.com/guides/forbidden-city-for-foreign-visitors/) / [ZH](https://homegroundchina.com/zh/guides/forbidden-city-for-foreign-visitors/) / [KO](https://homegroundchina.com/ko/guides/forbidden-city-for-foreign-visitors/) |
| `culture-20260811-01` | selected | approved | release-completed | published | Issue：`null`；PR #31；`first-shared-meal-in-china` 三语 owner |
| `planning-20260811-01` | selected | pending-review | specification-submitted | not-published | Issue：`null`；`specificationStatus: review-ready`；`publicImplementationAuthorized: false`；`indexablePageAuthorized: false` |
| `stay-20260811-01` | selected | approved | release-completed | published | Issue：`null`；PR #50；`foreigners-china-hotel` 三语 owner |
| `essentials-20260811-01` | selected | approved | release-completed | published | Issue：`null`；PR #41；`china-esim-vs-local-sim` 三语 owner；`durableArtifact: true` |

六张历史票均未发现正式 SEO GitHub Issue，因此 `executionIssueUrl` 明确为 `null`，没有虚构或补写 Issue。Ticket 1、2 的批准证据是 PR #24；Ticket 3 是 PR #31；Ticket 5 是 PR #50；Ticket 6 是 PR #41。Ticket 4 只有内部规格，仍不构成公开实现授权。

本轮票据集合冻结为以上六项，不增加第七个文章、页面或票据，也不因 Ticket 1、2 已上线或其他票延迟、退回、拒绝而自动递补。Route Reality Checker 的内部规格与员工 8 审查不计作新增文章；`SPEC REVIEW READY` 只开放员工 8 的技术可行性与测试审查，不开放实现、建页、索引或发布。

## 4B. 外部中国需求与未来占位方向

现有 GSC 的 1,060 impressions 仍然很小，适合验证已发布 owner 是否开始获得排名、CTR 是否异常、同一 query 是否出现多个页面，不适合决定整个市场下一步。选题发现因此以外部需求为主，GSC 作为后验验证层保留。

市场盘子正在扩大：[国家统计局](https://www.stats.gov.cn/english/PressRelease/202602/t20260228_1962661.html)记录 2025 年 1.545 亿入境访问（+17.1%），其中外国人 3517 万（+30.6%）、免签入境外国人 3008 万（+49.5%）；“访问”不是独立游客，且总入境口径包含港澳台。[国家移民管理局](https://www.nia.gov.cn/n741440/n741567/c1789835/content.html)记录 2026 上半年外国人入境 2291.4 万（+20.4%），其中免签 1781.5 万，占 77.7%。[2026–2030 旅游规划](https://english.www.gov.cn/policies/latestreleases/202607/08/content_WS6a4dc693c6d00ca5f9a0c10b.html)把签证、支付、交通、通信、住宿和多语服务列为持续改进对象。

Google Trends 设置为全球、过去五年、Travel 类别、Google 网页搜索。下表是同一图内的年度周指数均值，只证明相对方向，不是搜索量：

| 同图词群 | 2024 → 2026 YTD | 解释 |
|---|---|---|
| [核心需求](https://trends.google.com/trends/explore?date=today%205-y&cat=67&q=China%20travel,China%20visa,China%20tour,China%20itinerary,China%20trip) | China travel 16.2→36.7；visa 11.4→19.6；tour 8.7→17.0；itinerary 1.2→3.8；trip 4.9→13.8 | 第一次访华与路线需求整体抬升 |
| [实用任务](https://trends.google.com/trends/explore?date=today%205-y&cat=67&q=China%20visa%20free,China%20eSIM,China%20payment,China%20high%20speed%20train,China%20VPN) | visa free 10.8→30.8；eSIM 2.4→37.3；payment 0.8→46.3；HSR 13.8→29.8；VPN 3.4→34.3 | 方向强，但窄词低基数、`China payment` 有歧义，必须再用官方来源和真实问题核验 |
| [目的地](https://trends.google.com/trends/explore?date=today%205-y&cat=67&q=Beijing%20travel,Shanghai%20travel,Chongqing%20travel,Zhangjiajie%20travel,Chengdu%20travel) | Beijing 15.5→45.6；Shanghai 24.7→71.6；Chongqing 0.6→6.3；Zhangjiajie 0.5→2.3；Chengdu 0.3→8.2 | 支持做更深目的地研究；后三项从极低基数起步，不能宣称绝对市场大小 |

未来占位采用四层网络：全国第一次访华/实用入口 → 城市与区域 Hub → 景点决策与现场解释 → 地点型历史/传说。非政治旅行新闻只作为更新管道，不单独追热点。

| 研究观察簇 | 更合适形态 | 当前结论与重复边界 |
|---|---|---|
| 第一次访华路线现实性 | tool + Hub | 已由 Route Reality Checker 与 rushed-itinerary owner 承接；不加新票，不做 7/10/14/21 天页 |
| 支付、eSIM/SIM、VPN、Apps、12306 数字生存栈 | collection + update-existing | 大部分已有 owner；禁止再写一篇通用 China apps 清单 |
| Amap→中文地址→Didi 工作流 | tool / 可下载地址卡 | 三个近期真实问题支持；SERP 已有 App 指南，必须有实测地址数据和失败恢复才进入下一轮评分 |
| 素食、清真与严重过敏 | new-page + 双语卡 tool | 真实问题重复且覆盖较薄；偏好、宗教限制、危及生命的过敏必须分栏，不能承诺零交叉污染 |
| 全国景点预约矩阵 | maintained data tool | 一张含预约窗口、护照支持、官方渠道、语言、支付与现场备选的日期化矩阵；不得每景点一页 |
| 成都–重庆–张家界增长链 | regional Hub | 研究城市取舍与顺序，不做所有城市对、日数排列；既有熊猫和张家界 owner 保持边界 |
| 上海–苏州–杭州–水乡选择 | comparison Hub / selector | SERP 拥挤；只有真实换乘税与体验重复度信息足够时才值得存在 |
| 老人、轮椅与婴幼儿可达性 | update-existing + 数据模块 | 并入 older-parents 与 Zhangjiajie older-travellers；禁止城市×老人/婴儿页 |
| 朝代、古都、佛教与经典文学旅行 | collection | 需求规模不可用；先做史实地点/文学设定/后世纪念/旅游包装四分法，不按朝代或传说批量建页 |
| Datong、Quanzhou、Pingyao、Jingdezhen、Luoyang | city-Hub 研究序列 | 仅有相关查询和文化旅游方向信号，精确长尾 Trends 数据不足；不得称为已证实高量热词 |
| 全国假期与拥挤日历 | tool / data page | 一个年度 owner；Golden Week、春节、暑期与季节关闭不做城市×月份组合 |
| 非政治旅行新闻 | update evergreen owner first | 只收 UNESCO/地质公园、铁路接入、场馆开放、预约支付变化、关闭/重开；政治、意识形态、地缘与八卦拒绝 |

以上 12 项均为既有 `research-watch`，本次没有继续研究、补证或升级为候选。它们不是 candidateId、票据或员工任务。本轮正式候选仍为下列 18 项，选中票据仍只有六项。

## 5. 候选评分与决策

评分列顺序：用户任务与需求证据 / 真实覆盖缺口 / 来源可用性 / Homeground 信息增量 / 内链网络价值 / 维护成本与风险（高分代表更可控）。满分分别为 25/20/15/15/15/10。

形态审查结果：5 个 `new-page`、4 个 `update-existing`、4 个 `merge`、3 个 `tool`、1 个 `collection`、1 个 `reject`。Tea-house 候选被路由为 culture Hub 内 FAQ 模块；没有候选具备独立 data page 或新 Hub 的证据门槛。

| Pool | candidateId | workingTitle | 最佳形态 | 分项 = 总分 | 决策 |
|---:|---|---|---|---:|---|
| 1 交通 | `transport-20260811-01` | Which Beijing Railway Station? All 8 Compared | new-page | 22/15/15/13/14/9 = **88** | **已由中央批准；PR #24 已发布** |
| 1 交通 | `transport-20260811-02` | How Early for a China High-Speed Train? | update-existing | 23/10/15/8/14/9 = 79 | 更新 HSR owner，不建页 |
| 1 交通 | `transport-20260811-03` | International Flight → China Train Connection | tool | 18/17/10/14/14/5 = 78 | 暂缓；先有数据模型和维护人 |
| 2 目的地 | `destination-20260811-01` | How to Visit the Forbidden City: Tickets and a 3-Hour Route | new-page | 23/13/15/14/14/6 = **85** | **已由中央批准；PR #24 已发布** |
| 2 目的地 | `destination-20260811-02` | Mutianyu or Badaling? | reject | 23/7/15/11/13/7 = 76 | 拒绝通用新页；SERP 同质化 |
| 2 目的地 | `destination-20260811-03` | Panda Base Gate, Time and Route | merge | 20/8/15/5/12/6 = 66 | 并入熊猫场馆比较稿 |
| 3 文化 | `culture-20260811-01` | Your First Shared Meal in China | new-page | 18/14/11/15/13/9 = **80** | **已发布；PR #31** |
| 3 文化 | `culture-20260811-02` | How Do Chinese Tea Houses Work? | update-existing | 17/13/11/11/11/9 = 72 | 先做 culture hub/FAQ 模块，暂不独立 |
| 3 文化 | `culture-20260811-03` | Guangzhou Dim Sum Etiquette | merge | 20/9/13/4/10/9 = 65 | 并入广州早茶稿 |
| 4 规划 | `planning-20260811-01` | China Route Reality Checker | tool | 24/16/12/15/15/8 = **90** | **已选中；spec review-ready；待中央审核** |
| 4 规划 | `planning-20260811-02` | How Many Days: 7 vs 10 vs 14 | update-existing | 24/8/14/7/14/9 = 76 | 更新 rushed-itinerary owner |
| 4 规划 | `planning-20260811-03` | First China Trip Routes by Pace | collection | 22/11/12/10/15/8 = 78 | 暂缓；Phase 1 gate 未满足，不公开/索引 |
| 5 住宿 | `stay-20260811-01` | Can Foreigners Stay in Any Hotel? | new-page | 23/14/15/15/15/6 = **88** | **已发布；PR #50** |
| 5 住宿 | `stay-20260811-02` | Airport Hotel or City Hotel Last Night? | merge | 17/7/12/5/13/8 = 62 | 并入已发布 last-night owner |
| 5 住宿 | `stay-20260811-03` | Best Hotel Booking Apps | update-existing | 20/10/9/7/13/5 = 64 | 做 owner 内模块，不做易过时榜单 |
| 6 入境/实用 | `essentials-20260811-01` | China eSIM or Local SIM? | new-page | 24/15/13/15/15/6 = **88** | **已发布；PR #41** |
| 6 入境/实用 | `essentials-20260811-02` | China Entry Eligibility Checker | tool | 25/12/15/12/15/3 = 82 | 暂缓；法律数据 owner/SLA 未建立 |
| 6 入境/实用 | `essentials-20260811-03` | Alipay or WeChat Pay? | merge | 25/9/15/4/14/5 = 72 | 并入支付稿 |

### 六个已选中项的原始证据与当前状态

1. `transport-20260811-01`：真实问题是“票面车站是哪一个、住处和线路应该对应哪个站”，不是再写全国高铁流程。正式页面已扩为八站矩阵并通过 PR #24 发布；全国高铁流程仍归 `china-high-speed-train-first-time-guide`。
2. `destination-20260811-01`：近期问题集中在外籍游客预约、入口、单向南进北出和离场后衔接。正式页面已把四个子任务保留在同一 owner，并通过 PR #24 发布；运营事实继续按关键动态类监控。
3. `culture-20260811-01`：SERP 多为抽象礼仪清单；Homeground 的机会是解释普通旅客第一顿共享餐的实际顺序，并用地方/场景限定避免文化定型。需要本地审稿人。
4. `planning-20260811-01`：真实旅客不断请求行程 sanity check。透明显示“夜数如何被抵达、离境、跨城、换酒店吃掉”的工具能把已有 route/transport/stay owner 连接起来，不生成路线排列组合。
5. `stay-20260811-01`：旅客既担心酒店是否接待外宾，也报告已订后拒绝。中央与国家移民管理局来源可用；Homeground 可把法律规则、平台标签、登记和拒绝恢复串成一个任务。
6. `essentials-20260811-01`：近期问题不是“哪家 eSIM 最好”，而是 eSIM、当地 SIM、中国号码或双卡怎样对应支付、叫车、酒店联系和 SMS。应保持供应商中立。

## 6. 合并、拒绝与待更新

### 必须合并/更新，不得另建 canonical

- 高铁提前多久到站 → `china-high-speed-train-first-time-guide`。
- 熊猫基地入口/时间/半日路线 → `chengdu-panda-base-or-dujiangyan-panda-valley`。
- 中国茶馆初访 → 先做 `hub-culture` 的受限 FAQ 模块；没有足够证据前不独立。
- 广州 dim sum/yum cha 点单与礼仪 → `how-guangzhou-morning-tea-works`。
- 7/10/14 天中国行 → `is-your-china-itinerary-too-rushed`，并链接精确路线 owner。
- 最后一晚机场酒店还是市区 → `china-last-night-before-international-flight`。
- 酒店预订 App → 若新住宿候选获中央批准，则归 `stay-20260811-01`；否则 hold，不回退到酒店价值页。
- Alipay vs WeChat → `how-to-pay-in-china-as-a-tourist`。

### 明确拒绝

- 通用 Mutianyu vs Badaling 新页：目前 exact SERP 同质内容很多，仓库没有足以区别的自有实测数据。
- 按更多国籍复制签证模板；按城市复制 240 小时过境页。
- 城市×月份×人群、城市×天数×团体、城市×星级×月份等排列组合。
- 张家界 2/3/4 天拆页、三个夜秀拆页、交通方式拆页。
- 早茶/yum cha/dim sum 礼仪拆成多个同义页。
- October/Golden Week 按城市铺页。

### 待更新优先级

- **P0** `system-entry-requirements`：warehouse/sitemap 节点日期为 2026-07-24，live JSON-LD `dateModified` 为 2026-07-28 且缺 `datePublished`。需要中央排期修正数据源一致性；本轮未改页面。
- **P0/P1 动态复核**：已上线的支付、高铁、夜车、十月、两篇机场与熊猫 owner 全部进入按来源变化监控；后续缺口只更新 canonical owner，不另建同义页。
- **P0/P1 中央验收前**：foreign-hotel 核验 2026 非酒店住所网上登记；HSR owner 核验 12306 护照验证、候补与邮件失败恢复；不得另建新闻或故障排查页。
- **P2 结构化更新**：older-parents 与 Zhangjiajie older-travellers 增加坡度、台阶、休息点、缆车、轮椅与推车字段，不生成城市×人群页。
- **P2**：只有 route checker 被中央批准后，才更新 rushed-itinerary 的 7/10/14 日表格与工具链接。

## 7. 动态事实复核队列

| 优先级 | Owner/组 | 必查事实 | 触发条件 |
|---|---|---|---|
| P0 critical | entry collection + US/UK/CA/NZ/240h/SG 六 owner | 资格、目的、停留期、口岸/区域、第三国路线、材料 | NIA/使馆/国务院变化；任何发布前 |
| P0 | live Guangzhou airport + PVG→Disney owners | 航站楼、关闭状态、Airport Link、地铁/城际、晚到备选 | 机场/运营方变化；立即复核重大变更 |
| P0 | live HSR + night-train owners | 售票、护照、行李、进站、车次产品 | 12306/国铁变化；受影响 owner 立即复核 |
| P0 | live October owner | 节假日日期、放票、关闭、拥挤/天气表述 | 年度日历或重大假期/关闭变化 |
| P0 | live payment owner + eSIM candidate | 外卡、实名、限额、备用支付；运营商、设备、号码用途 | 监管/平台/运营商/设备变化 |
| P1 | live panda owner | 预约、开放、入口、交通与观看时段 | 场馆公告或运营变化 |
| P1 | cost + hotel value | 价格示例、币种、平台、价值判断 | 季度或明显价格变化 |
| P1 | night show + Malaysia access + 3-city transport | 演出、航班/铁路、时刻示例 | 运营/时刻变化 |
| critical live monitor | `forbidden-city-for-foreign-visitors` | 预约、护照、入口/出口、闭馆、天安门关联 | 官方预约、准入、证件或闭馆规则变化 |
| P0 before central acceptance | foreign-hotel durable draft | 法规、酒店/非酒店住所登记、平台标签、拒绝恢复 | 中央验收同周 + 政策/平台变化 |
| P1 research | attraction-booking matrix | 预约窗口、护照支持、官方渠道、语言、支付、现场备选 | 官方公告或可靠实测；只研究、不发票 |
| ongoing | 非政治旅行新闻 intake | UNESCO/地质公园、铁路接入、场馆开放、预约支付、关闭/重开 | 先路由到常青 owner；政治/意识形态/地缘拒绝 |

## 8. 固定工作流与权限

员工 7 发现或登记候选 → 中央编辑批准、合并到旧 owner、退回补证或拒绝 → **只有批准后**才创建 GitHub Issue 正式工单 → 员工 1–6 开始写作 → 副整合员审核素材和三语 → 中央编辑合并上线 → 员工 7 回写发布状态、表现数据和防重复记录。

- 所有准备新建并让 Google 收录的 SEO 页面，原则上都必须先经过 Search Map。
- 业务所有者可以直接提出题目，但员工 7 仍须先检查重复、canonical owner 和页面形态。
- 紧急动态更新和旧文修正可以由中央编辑直接发起，但员工 7 事后必须登记。
- 员工 7 只有提案权，没有开工、合并或发布权。
- 每轮不固定必须六张；数量由证据、写手产能和中央审核能力决定。没有合格选题时可以少于六张。
- 当前没有正式 SEO GitHub Issue。本轮同步不虚构、不创建 Issue；Ticket 1、2 作为新流程写入前已完成发布的历史例外登记。
- 本轮不得补充新票，也不得因为 Ticket 1、2 已上线而自动递补。

## 9. 架构约束

- 27 个 `primaryCollectionId` 仍是 Phase 1 provisional taxonomy，不因本 Search Map 自动创建 URL。
- `collection`、Hub 或 tool 只有在 eligibility、coverage、source、maintenance gate 均满足后，才可由中央编辑另行批准公开或索引。
- 每页仅有一个 section、一个 primary collection 和一个 canonical owner；entity 是正交标注，不等于新 URL。
- `targetIntent` 与 `pageFamily` 使用仓库受控词表；更细的候选形态放在 `taskMode` 与 `artifactShape`，避免机器字段混义。
- 机器账本保存 origin/main 的 11 个受控 entity ID、已发布 runtime assignments 与编辑提议。2026-08-20 只补齐广州、杭州、重庆、深圳四个有现成 Hub、已发布指南或可定位 durable artifact 的城市；张家界沿用原受控实体。每个新增城市的仓库证据路径记录在 `repositoryEntityEvidence`，没有按候选池批量造实体。候选的 `primaryEntityId`/`secondaryEntityIds` 仍只是未落地提案，不会自动创建 entity record。
- `freshnessClass` 是 Search Map 对编辑复核风险的治理 override，不声称等于仓库当前 `updatePolicy`。
- 六个历史已选中项分别读取四层状态：Ticket 1、2、3、5、6 已批准并发布；Ticket 4 仍为内部 specification，不构成公开实现、建页、索引或发布授权。
- 本轮 ticket set 硬冻结为六项；不得追加第七篇，也不得把 held/rejected/runner-up 自动递补进本轮。
- 城市、景点、历史与传说可以进入未来研究池，但必须有地点/旅客任务、可验证来源或 Homeground 信息增量；传说与史实必须分栏。
- 旅行新闻不得绕过 Search Map。优先更新现有城市、景点、交通或实用 owner；政治、意识形态、地缘与泛流量新闻拒绝。
- Route Reality Checker 规格 owner 是员工 4；`SPEC REVIEW READY` 已在 `1e131ff` 观察到，员工 8 现在仅可审查技术可行性与测试。未经 Mac 中央编辑明确批准，员工 8 无实现、建页、公开、索引或发布权限。
