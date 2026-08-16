# Homeground 禁止重复与应合并清单

生效快照：2026-08-11

本文件是员工 1–6、中央编辑与任何后续 SEO 代理的开题前检查表。三种语言只算一个内容身份；换语言、换标题、换问法、换人群修饰词或加年份，不会自动产生新页面资格。

## 硬规则

1. 同一用户任务只有一个 canonical owner。
2. 近义词、问题式标题与陈述式标题不得各建一页。
3. 不生产城市×月份×人群、城市×天数×团体、城市×星级×月份的排列组合。
4. `primaryCollectionId` 是内部 provisional taxonomy；它存在不等于可以创建公开或可索引 collection URL。
5. FAQ、旧文新增章节、tool、collection 或 Hub 能更好解决任务时，不得默认选择 `new-page`。
6. 任何新 nationality entry 页必须同时满足：不同法律任务、官方一手来源、真实需求证据、明确监控 owner；不得模板复制。
7. Search Console 在 2026-08-11 **可用但样本很小**：2026-07-09 至 2026-08-09 共 11 clicks、804 impressions、CTR 1.4%、average position 18.7；94 个可见 query 行只有 153 impressions 且 0 clicks，11 次点击无法归到可见 query。它只用于基线、CTR、排名与后续蚕食验证，不作为全市场选题发现器。
8. 关键词体量、CPC、难度与购买概率工具 **不可用**。Google Trends 只表示同一图表内的相对方向；自动补全、结果数、论坛重复提问和主观感觉都不等于搜索量。
9. 本轮 ticket set 冻结为六项，不增加第七个文章、页面或票据；某票延迟、退回或拒绝时也不自动递补。
10. Route Reality Checker 的内部规格与员工 8 技术/测试审查不算新增文章；`SPEC REVIEW READY` 不是实现、建页、公开、索引或发布授权。
11. 城市介绍必须拥有独立的旅客决策、路线或知识网络角色；不得以通用城市百科、换标题或拼接景点列表占位。
12. 历史、文学、后世纪念、地方口述/传说与现代旅游包装必须分别标注；不得把传说写成史实，也不得按每个朝代、人物或传说批量建薄页。
13. 旅行新闻先路由到现有城市、景点、交通、实用 owner 或维护数据行；只有具有持续旅行效用且有维护 owner 时才可重新评估独立页。政治、意识形态、地缘评论、八卦与宏观流量新闻一律拒绝。
14. 所有准备新建并让 Google 收录的 SEO 页面原则上必须先经过 Search Map；员工 7 只有提案权。中央批准后才创建正式 GitHub Issue，之后才能交给员工 1–6 执行。

## 本轮六项执行身份：禁止换 slug、branch 或 artifact 类型后重复计数

- `transport-20260811-01` ↔ `which-beijing-railway-station`：同一 Beijing station-choice 身份。
- `destination-20260811-01` ↔ `forbidden-city-for-foreign-visitors`：同一 foreign-visitor Forbidden City 执行身份。
- `culture-20260811-01` ↔ `first-shared-meal-in-china`：同一首次共享用餐身份。
- `planning-20260811-01` ↔ Route Reality Checker 内部规格：仍是同一 tool 候选，不是文章身份。
- `stay-20260811-01` ↔ 员工 5 foreign-hotel worktree：仍是同一 booking/registration/refusal owner。
- `essentials-20260811-01` ↔ `china-esim-vs-local-sim.md`：即使从独立 repo 迁入 canonical worktree、补 metadata 或扩展 locale，也仍是同一 eSIM/local SIM/local-number 选择树。

| 票据 | candidateStatus | centralDecision | executionStatus | publicationStatus | 锁题证据 |
|---|---|---|---|---|---|
| `transport-20260811-01` | selected | approved | release-completed | published | PR #24；`which-beijing-railway-station` 三语 live |
| `destination-20260811-01` | selected | approved | release-completed | published | PR #24；`forbidden-city-for-foreign-visitors` 三语 live |
| `culture-20260811-01` | selected | pending-review | draft-submitted | not-published | durable draft `72dc3ea`；草稿不等于批准 |
| `planning-20260811-01` | selected | pending-review | specification-submitted | not-published | `SPEC REVIEW READY` 规格 `1e131ff`；不得公开实现 |
| `stay-20260811-01` | selected | pending-review | draft-submitted | not-published | durable draft `a5be2b6`；草稿不等于批准 |
| `essentials-20260811-01` | selected | pending-review | local-undurable-draft | not-published | `durableArtifact: false`；独立本地 repo，无 remote/commit/push |

六票均无正式 SEO GitHub Issue，`executionIssueUrl` 为 `null`；不补写或虚构 Issue。Ticket 1、2 的批准与发布证据为 [PR #24](https://github.com/yangchunxuan/travel-china-with-xuan/pull/24) 和 2026-08-11 17:03 的六个 live URL 验收。上述状态只强化锁题，不新增候选或第七篇。

## 本轮锁定的 14 个身份：绝对不得再选

开工时这 14 个身份均未上线。至最新 `origin/main@8769b2f` 与 2026-08-11 17:03 线上复核，14/14 仍已发布：四个 Batch A、五个 PR #22 Batch B，以及五个 PR #23 Batch C 身份。旧 14 稿制作中为 0。状态改变不解除锁题，本表也不把同一身份、视觉整合分支或原始员工分支重复计数。

| Canonical owner | 已占用主题与近义问法 | 应合并内容 |
|---|---|---|
| `china-high-speed-train-first-time-guide` | China HSR first time、12306、tickets、passport booking、station process、seat class、luggage、security、boarding | How early to arrive、boarding cutoff、large-station buffer |
| `guangzhou-baiyun-airport-t2-t3` | Baiyun T2/T3、T1 closed、wrong terminal、metro/intercity access | 每个 terminal 单页、走错航站楼恢复 |
| `pudong-airport-to-shanghai-disneyland` | PVG→Disney、Airport Link vs taxi、kids/luggage、late arrival | 按交通方式或家庭人群拆页 |
| `lijiang-old-town-or-shuhe-where-to-stay` | Lijiang stay、Dayan vs Shuhe、大研/束河住宿 | 大研页、束河页、行李 access 独立页 |
| `chengdu-panda-base-or-dujiangyan-panda-valley` | Chengdu Panda Base vs Panda Valley、best panda base | gate、best arrival time、half-day route、crowd/heat 模块 |
| `how-guangzhou-morning-tea-works` | Guangzhou morning tea、yum cha、dim sum、teahouse etiquette、ordering | 点单、分享、付款、礼仪、历史的所有同义题 |
| `how-to-read-a-suzhou-garden` | Suzhou garden meaning、rocks/water/borrowed scenery、四园比较 | “best/which Suzhou garden”在没有新任务前并入 |
| `china-last-night-before-international-flight` | last night in departure city、day-before buffer、same-day rail/flight、airport hotel | Airport hotel vs city hotel、departure buffer 同义题 |
| `china-night-train-or-daytime-high-speed-rail` | night train vs daytime HSR、overnight train、hotel saving | hard/soft sleeper 与酒店节省角度 |
| `china-open-jaw-flights-route-planning` | China open-jaw、arrive one city leave another、multi-city flight route | 按进/出城市组合拆页 |
| `china-in-october-golden-week-or-later` | China in October、Golden Week or later、October crowds/weather/booking | 城市×October、城市×Golden Week、人群×Golden Week |
| `beijing-where-to-stay-first-trip` | where to stay Beijing first trip、best Beijing area、四区比较 | 每个 area 单页；全国地铁距离规则另归 metro owner |
| `china-hotel-near-metro` | hotel near metro China、how close to subway、luggage/family/accessibility rubric | 城市版同一距离判断、家庭版/老人版拆页 |
| `how-to-pay-in-china-as-a-tourist` | how to pay、Alipay、WeChat、cash、cards、failure recovery | Alipay vs WeChat、单一支付方式、支付失败页 |

## 目的地 Hub（2026-08-16 发布）：城市级 canonical owner

三个 city hub 已上线，`X travel guide` 这一类宽泛城市意图由它们独占。不得再建同城的通用城市介绍、`X 旅游攻略` 或换标题的城市百科；具体执行仍归各自更窄的 owner。

| Canonical owner | 占用的意图 | 应合并内容 |
|---|---|---|
| `/destinations/beijing/`（`destination-beijing`） | Beijing travel guide、北京旅行指南、住几晚、住哪个区域、机场与车站选择、下一站 | 通用“北京攻略”、城市百科、按天数或人群拆的北京总览 |
| `/destinations/shanghai/`（`destination-shanghai`） | Shanghai travel guide、上海旅行指南、完整游览日、浦西浦东取舍、机场门户、长三角当日往返还是换城 | 通用“上海攻略”、按天数或人群拆的上海总览 |
| `/destinations/xian/`（`destination-xian`） | Xi'an travel guide、西安旅行指南、住几晚、城内与城南基地、三座铁路站、华山要不要加一天 | 通用“西安攻略”、按天数或人群拆的西安总览 |

三语只算一个内容身份。Hub 只做城市级取舍，不复述 `beijing-where-to-stay-first-trip`、`which-beijing-railway-station`、`terracotta-warriors-without-tour`、`shanghai-pudong-or-hongqiao-airport` 等既有 owner 的执行细节。

**待补**：`docs/organic-growth/search-map.json` 尚未登记这三个身份。它的 `coverage` 与轮次计数字段含义不明确，本批不擅自改写；请员工 7 在下一次同步时按现有 schema 回填。

## 其余已发布 canonical owners：不可撞题

### 张家界

- `zhangjiajie-itinerary`：2/3/4 天属于同页；不得拆日数页。
- `zhangjiajie-from-malaysia`：马来西亚到张家界；不得扩成 KL/Penang × 日数矩阵。
- `zhangjiajie-glass-bridge-vs-skywalk`：glass bridge 与 skywalk 的比较任务。
- `zhangjiajie-older-travellers`：张家界特定的年长旅客适配。
- `best-zhangjiajie-night-show`：三个夜秀选择；不得一秀一页。

### 行程与交通

- `which-beijing-railway-station`：北京、北京西、北京南、北京北、清河、北京朝阳、北京丰台、北京通州八站是一个选择矩阵；不得一站一页。
- `beijing-zhangjiajie-shanghai-10-days`：精确三城十天的行程可行性。
- `beijing-zhangjiajie-shanghai-transport`：同走廊 train/flight 执行；不得按方式拆。
- `is-your-china-itinerary-too-rushed`：全国通用 pace、城市数量、how-many-days 头部任务。
- `china-itinerary-with-older-parents`：全国 12–14 天父母同行；张家界细节链接专页。
- `how-much-does-a-china-trip-cost`：全国总成本；不得生成城市×天数×人数报价页。

### 北京景点

- `forbidden-city-for-foreign-visitors`：外籍游客预约、证件、午门入口、三小时路线、神武门离场和离场后衔接是一个连续任务；不得拆成 ticket、entrance、route、exit 四页。

### 入境

- `system-entry-requirements`：passport/purpose/route 的总路由 collection。
- `do-us-citizens-need-visa-china-2026`：美国护照。
- `china-visa-free-uk-citizens-2026`：英国护照。
- `china-visa-free-canadian-citizens-2026`：加拿大护照。
- `china-visa-free-new-zealand-citizens-2026`：新西兰护照。
- `china-240-hour-visa-free-transit-route-check`：240 小时过境的线路规则；不得按城市/机场复制。
- `do-singaporeans-need-visa-china`：新加坡护照。
- 旧 `/china-visa-free-uk-canada/` 是 noindex canonical shell；不得恢复为独立内容。

### 住宿与服务

- `why-are-hotels-in-china-so-cheap`：住宿价值/类型，不做动态价格排列组合。
- `do-you-need-a-tour-guide-in-china`：是否需要 guide/support 的服务选择。
- `kevin-before-the-hotel-pickup`：导游在接客前如何准备；与服务选择分工而非重复。

## 本轮候选的合并与更新指令

| 不得新建的题目 | Action | Canonical owner | 处理方式 |
|---|---|---|---|
| How Early Should You Arrive for a China High-Speed Train? | `update-existing` | `china-high-speed-train-first-time-guide` | 加 scenario table |
| Chengdu Panda Base: Best Gate, Time and Half-Day Route | `merge` | `chengdu-panda-base-or-dujiangyan-panda-valley` | 作为选择后的执行模块 |
| How Do Chinese Tea Houses Work? | `update-existing` | `hub-culture` | 先做有范围的 FAQ 模块；暂不独立 |
| Guangzhou Dim Sum Etiquette | `merge` | `how-guangzhou-morning-tea-works` | 与早茶/yum cha 同一身份 |
| How Many Days in China: 7 vs 10 vs 14 | `update-existing` | `is-your-china-itinerary-too-rushed` | 加决策表，链接精确路线 |
| Airport Hotel or City Hotel for Your Last Night? | `merge` | `china-last-night-before-international-flight` | 加住宿位置决策模块 |
| Best Hotel Booking Apps for Foreigners | `update-existing` | `stay-20260811-01`（若中央批准） | 非排名平台检查；未批准则 hold |
| Alipay or WeChat Pay? | `merge` | `how-to-pay-in-china-as-a-tourist` | 完整支付栈中的比较模块 |

## 本轮明确拒绝或暂缓

- `destination-20260811-02` Mutianyu vs Badaling：**reject**。当前 exact SERP 同质覆盖强，仓库没有足以区别的自有 field dataset。只有新增可验证的交通、行动能力、拥挤摩擦实测后才可重开。
- `transport-20260811-03` airport→rail connection checker：**hold**。没有 versioned airport/station 数据、保守规则、fail-safe 输出和维护人，不得建。
- `planning-20260811-03` First China Trip Routes collection：**hold/noindex**。未满足 Phase 1 coverage/eligibility gate，不得创建公开 collection。
- `essentials-20260811-02` entry eligibility checker：**hold**。没有法律数据 owner、监控 SLA、规则版本、测试与 fail-closed，不得建。

## 未来研究占位：不是本轮候选或票据

以下方向只保留为 `research-watch`。它们不产生 `candidateId`、票据、branch reservation 或写手指令，本轮仍严格只有六票，不增加或递补第七票。

- 第一次访华路线现实性归 Route Reality Checker 与 `is-your-china-itinerary-too-rushed`；不再建 7/10/14/21 天或城市组合页。
- 数字生存栈优先更新已发布 payment、高铁与本轮 eSIM owners；不得另写一篇泛“中国必备 App”汇总抢占所有任务。
- Amap→中文地址→Didi 只研究实测 workflow/tool 或地址卡；没有地点数据和失败恢复时，不建普通 App 指南。
- 素食、清真与严重过敏应由一个全国饮食限制 owner 加双语卡承接；必须区分偏好、宗教限制与危及生命的过敏，不按城市复制。
- 景点预约优先做维护型矩阵，字段包括预约窗口、外籍证件、官方渠道、语言、支付与现场备选；不得把同一预约模板复制到每个景点。
- 成都–重庆–张家界与上海–苏州–杭州–水乡只研究区域 Hub/selector；不做每个城市对、日数或人群组合。
- 老人、轮椅、推车与婴幼儿可达性并入既有 older-parents owners 和结构化字段；不生成城市×人群页面。
- 朝代、古都、佛教与经典文学优先由解释型 collection 承接；大同、泉州、平遥、景德镇、洛阳只处于 city-Hub 研究序列，尚无可声称的搜索量证据。
- 全国假期与拥挤问题只允许一个年度 calendar/data owner；不得按城市×月份铺页。
- 非政治旅行新闻只收可能改变旅行决策的 UNESCO/地质公园、铁路接入、场馆开放、预约/支付、关闭/重开；先更新 evergreen owner，不发热点票。

## 六个已选中项自身也不得被拆分

Ticket 1、2 已由中央批准并发布；Ticket 3–6 仍待中央审核。无论状态如何，锁定的 canonical 边界都不得通过换 slug、分支、语言或 artifact 类型规避。

- `transport-20260811-01`：Beijing、Beijing West、Beijing South、Beijing North、Qinghe、Beijing Chaoyang、Beijing Fengtai、Beijing Tongzhou 是一个站点选择矩阵，不是一站一页。
- `destination-20260811-01`：Forbidden City ticket/entrance/3-hour route/north exit 是一个连续执行任务。
- `culture-20260811-01`：shared meal 的 ordering/seating/sharing/paying 是一餐的顺序，不拆礼仪页。
- `planning-20260811-01`：route reality checker 不生成城市×日数×人群可索引结果页。
- `stay-20260811-01`：foreign-hotel booking/registration/refusal recovery 是一个任务，不按城市复制。
- `essentials-20260811-01`：eSIM/local SIM/local number/both 是一个选择树，不按 provider 建页。

## 新提案提交前的冲突测试

任何员工提交新题前必须回答：

1. 是否与上表 owner 解决同一个最终任务？若是，默认 `update-existing` 或 `merge`。
2. 差异是否只来自语言、年份、把城市/景点/人群/天数替换进同一模板，或同义词？若是，拒绝新页；真正不同的实体仍须证明不同用户任务、信息增量和 canonical owner。
3. 真实 SERP 缺口是否来自内容能力，而不是标题没完全匹配？
4. Homeground 是否有可验证、其他结果没有的信息增量？
5. 动态事实是否有一手来源、负责人、复核频率和失效处理？
6. Hub、collection、tool、FAQ 或 data page 是否比文章更适合？
7. 是否已经在 live sitemap、最新 `origin/main`、任一 `origin/article/*`、`origin/codex/*` 或同仓 worktree 中发布、制作或 reservation？若是，禁止再选。
8. 若是历史或传说，是否清楚标明史实、文学/口述、后世纪念与现代包装，并有可核验来源？否则拒绝或暂缓。
9. 若是新闻，是否属于非政治旅行操作变化，且无法由既有 evergreen owner 更新解决？否则拒绝新页。
10. 是否只是外部 `research-watch`，尚未经过六维评分与中央批准？若是，不得交给写手。

任一答案不清楚时，题目回到 Search Map 候选池，不得先写后判。
