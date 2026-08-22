# Homeground 本轮 SEO 票据状态同步 — 2026-08-11

> **历史快照，不是当前开工或发布状态。** 2026-08-23 的生产库存、PR #74 发布回填、PR #89 技术上线和 Search Console 状态见 [`weekly-brief-2026-08-23.md`](./weekly-brief-2026-08-23.md)。下文数字与 `not-published` 字段只保留当时证据，不得覆盖新简报。

状态：`SEARCH MAP SYNCHRONIZED — CENTRAL-APPROVED BATCH NOT YET PUBLISHED`

以下六张票据是 2026-08-11 的历史冻结集合，不是新的开工命令。北京站、故宫、首次共享用餐、外国游客酒店与 eSIM owner 均已发布；Route Reality Checker 仍只有内部规格。历史票不得换 slug 或换分支重开。

本轮硬上限：票据集合冻结为以下六项，不增加第七个文章、页面或票据，也不自动递补。Route Reality Checker 的内部规格和员工 8 审查不计作新增文章。

没有发现正式 SEO GitHub Issue，六票 `executionIssueUrl` 均为 `null`，本同步没有虚构或创建 Issue。发布证据分别为 Ticket 1、2 的 [PR #24](https://github.com/yangchunxuan/travel-china-with-xuan/pull/24)、Ticket 3 的 PR #31、Ticket 5 的 PR #50、Ticket 6 的 PR #41。Ticket 4 的规格仍不等于公开工具授权。

数据限制：Search Console **可用但样本很小**。2026-07-09 至 2026-08-18 共 17 clicks、1,060 impressions、CTR 1.6%、average position 20.5；隐私过滤隐藏大量 query。它只用于基线、CTR、排名与后续蚕食监测，不作为全市场选题发现器。关键词搜索量、CPC、难度与购买概率工具 **不可用**；Google Trends 只表示同一图表内的相对方向，不是搜索量。

当前库存：`origin/main@cbbfddabe2513874cc4e55981e08244db7338ff9` 有 173 个 guide identity、513 个 locale URL；另有五个已发布城市 Hub、15 个 locale URL，以及 1 个英文系统 entry collection。公开编辑型详情合计 179 个身份、529 个 URL。2026-08-11 的 142-URL sitemap 数只保留为历史快照，不再当当前库存。

| 票据 | candidateStatus | centralDecision | executionStatus | publicationStatus |
|---|---|---|---|---|
| `transport-20260811-01` | selected | approved | release-completed | published |
| `destination-20260811-01` | selected | approved | release-completed | published |
| `culture-20260811-01` | selected | approved | release-completed | published |
| `planning-20260811-01` | selected | pending-review | specification-submitted | not-published |
| `stay-20260811-01` | selected | approved | release-completed | published |
| `essentials-20260811-01` | selected | approved | release-completed | published |

## 2026-08-20 中央批次

| candidateId | 页面 owner / 形态 | centralDecision | executionStatus | publicationStatus |
|---|---|---|---|---|
| `destination-20260820-zhangjiajie-city-hub` | `/destinations/zhangjiajie/` / Destination Hub | approved | draft-submitted ([PR #74](https://github.com/yangchunxuan/travel-china-with-xuan/pull/74)) | not-published |
| `essentials-20260820-china-online-arrival-card` | `/guides/china-online-arrival-card/` / task guide | approved | draft-submitted ([PR #74](https://github.com/yangchunxuan/travel-china-with-xuan/pull/74)) | not-published |
| `destination-20260820-zhangjiajie-forest-park-workflow` | `/guides/zhangjiajie-national-forest-park-tickets-and-entrances/` / task guide | approved | draft-submitted ([PR #74](https://github.com/yangchunxuan/travel-china-with-xuan/pull/74)) | not-published |
| `planning-20260820-first-24-hours` | routed collection only | defer | not-started | not-published |

库存完成项另行锁定：`chongqing-railway-station-selector` 已完成日期、重庆东站官方证据和动态事实复核；Hangzhou Hub 已完成 runtime 转换、三语结构与真实素材记录。两项均已随 Draft PR #74 提交中央审核，但都尚未发布。

## Ticket 1 — 员工 1 / 交通

- `candidateId`: `transport-20260811-01`
- `workingTitle`: **Which Beijing Railway Station? All 8 Compared**
- `action`: `new-page`
- `section`: `transport`
- `primaryCollectionId`: `transport-airports-rail-hubs`
- `targetIntent`: `plan`
- `pageFamily`: `comparison`
- `taskMode` / `artifactShape`: `choose-and-execute` / `decision-guide`
- `primaryEntityId`: `city-beijing`
- 分数：**88/100**（22/15/15/13/14/9）
- 状态：`candidateStatus: selected` / `centralDecision: approved` / `executionStatus: release-completed` / `publicationStatus: published`
- 发布证据：Issue `null`；PR [#24](https://github.com/yangchunxuan/travel-china-with-xuan/pull/24)；发布日期 `2026-08-11`；[EN](https://homegroundchina.com/guides/which-beijing-railway-station/) / [ZH](https://homegroundchina.com/zh/guides/which-beijing-railway-station/) / [KO](https://homegroundchina.com/ko/guides/which-beijing-railway-station/)

用户任务：旅客已拿到或准备购买火车票，需要判断票面车站、路线方向、酒店位置与进站交通是否匹配，并避免去错站。

必须守住的 canonical 边界：

- 只做一页八站决策矩阵：Beijing、Beijing West、Beijing South、Beijing North、Qinghe、Beijing Chaoyang、Beijing Fengtai、Beijing Tongzhou；不做八个 station 页面。
- 全国购票、12306、护照、席别、行李、安检与乘车流程仍归已上线的 `china-high-speed-train-first-time-guide`。
- 北京–张家界–上海的 train-or-flight 决策仍归 `beijing-zhangjiajie-shanghai-transport`。

发布证据与后续动态维护 source pack：

- [Beijing railway transportation](https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202412/t20241217_3967615.html)
- [Beijing subway access](https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202412/t20241216_3966828.html)
- [Beijing transport update](https://english.beijing.gov.cn/latest/news/202412/t20241225_3973421.html)
- 同周核对各站接驳与代表车次；车次只能作例子，不能作永久承诺。

发布验收已通过：正式稿以八站矩阵完成票面名称、适用方向、市内位置、地铁/车程摩擦、行李/早晚班与走错站恢复；后续只做动态维护，不另建近义页。

禁止重复：How early to arrive、train tickets、boarding、luggage、seat classes 均不得另建页。

## Ticket 2 — 员工 2 / 目的地

- `candidateId`: `destination-20260811-01`
- `workingTitle`: **How to Visit the Forbidden City: Tickets and a 3-Hour Route**
- `action`: `new-page`
- `section`: `explore`
- `primaryCollectionId`: `explore-attractions-nature-heritage`
- `targetIntent`: `execute`
- `pageFamily`: `task`
- `taskMode` / `artifactShape`: `execute` / `task-guide`
- `primaryEntityId`: `attraction-forbidden-city`
- 分数：**85/100**（23/13/15/14/14/6）
- 状态：`candidateStatus: selected` / `centralDecision: approved` / `executionStatus: release-completed` / `publicationStatus: published`
- 发布证据：Issue `null`；PR [#24](https://github.com/yangchunxuan/travel-china-with-xuan/pull/24)；发布日期 `2026-08-11`；[EN](https://homegroundchina.com/guides/forbidden-city-for-foreign-visitors/) / [ZH](https://homegroundchina.com/zh/guides/forbidden-city-for-foreign-visitors/) / [KO](https://homegroundchina.com/ko/guides/forbidden-city-for-foreign-visitors/)

用户任务：外籍旅客需要一次解决预约/护照、正确入口、三小时内取舍、单向南进北出以及离场后的交通。

必须守住的 canonical 边界：

- ticket、entrance、3-hour route、north-gate exit 是一个连续任务，不拆四页。
- 不写通用故宫历史百科；历史只服务现场路线理解。
- 不把天安门预约混写成同一票，但必须明确两者的衔接与当前规则边界。

发布证据与后续关键动态维护 source pack：

- [故宫博物院参观信息](https://www.dpm.org.cn/Visit.html?isappinstalled=0)
- [Visit Beijing 单向参观说明](https://english.visitbeijing.com.cn/article/4KD1c04OUDA)
- [Beijing city tour reference](https://english.beijing.gov.cn/travellinginbeijing/citytours/202006/t20200607_1918914.html)
- 预约、闭馆、外籍证件、入口/出口与天安门关联已按 `sourceReviewedDate: 2026-08-11` 完成发布复核；后续在官方规则变化时立即复核。

发布验收已通过：正式稿给出从预约到北门离场的单一执行流，并与已发布的 `which-beijing-railway-station`、`beijing-where-to-stay-first-trip`、`china-itinerary-with-older-parents` 建立内容边界。

禁止重复：Mutianyu vs Badaling 本轮拒绝；Panda Base gate/time/route 必须并入已发布熊猫比较 owner。

## Ticket 3 — 员工 3 / 文化

- `candidateId`: `culture-20260811-01`
- `workingTitle`: **Your First Shared Meal in China: Ordering, Seating, Sharing and Paying**
- `action`: `new-page`
- `section`: `culture`
- `primaryCollectionId`: `culture-regional-food`
- `targetIntent`: `execute`
- `pageFamily`: `task`
- `taskMode` / `artifactShape`: `understand-and-execute` / `task-explainer`
- `primaryEntityId`: `practice-chinese-shared-meal`
- 分数：**80/100**（18/14/11/15/13/9）
- 状态：`candidateStatus: selected` / `centralDecision: approved` / `executionStatus: release-completed` / `publicationStatus: published`
- 执行证据：Issue `null`；PR #31；`first-shared-meal-in-china` 三语 owner 已进入 canonical repository。

用户任务：第一次参加普通共享餐的旅客，要知道怎样跟着主人/同伴完成落座、点菜、用茶、夹取共享菜、付款和礼貌收尾。

必须守住的 canonical 边界：

- 这是“第一顿共享餐的实际顺序”，不是抽象的中国礼仪大全，也不是商务宴请礼仪。
- 地区、家庭、朋友、商务场景有差异；不得把单一做法写成全国硬规则。
- 广州早茶、yum cha、dim sum 点单和礼仪仍归 `how-guangzhou-morning-tea-works`。

中央内容审核仍需核对的 source pack：

- [China tourism dining-etiquette reference](https://www.travelchina.org.cn/en/article/ZZhlUxxOkUhb)
- 至少一名具名 Homeground 本地审稿人；对每条行为注明“常见提示”“看主人示意”或地区/场景限制。

交付验收：用一顿饭的时间顺序组织信息；把“最少需要知道什么”和“避免尴尬的恢复动作”放在核心；链接 `how-guangzhou-morning-tea-works`、`do-you-need-a-tour-guide-in-china`、`kevin-before-the-hotel-pickup`。

禁止重复：中国茶馆只保留 FAQ/Hub 观察项；广州 dim sum etiquette 必须合并，不建页。

## Ticket 4 — 员工 4 / 规划

- `candidateId`: `planning-20260811-01`
- `workingTitle`: **China Route Reality Checker: Turn Nights Into Sightseeing Days**
- `action`: `tool`
- `section`: `plan`
- `primaryCollectionId`: `plan-budget-pace-decisions`
- `targetIntent`: `plan`
- `pageFamily`: `tool`
- `taskMode` / `artifactShape`: `calculate-and-plan` / `route-reality-checker`
- `primaryEntityId`: `country-china`
- 分数：**90/100**（24/16/12/15/15/8）
- 状态：`candidateStatus: selected` / `centralDecision: pending-review` / `executionStatus: specification-submitted` / `publicationStatus: not-published`
- 规格门禁：Issue `null`；`specificationStatus: review-ready`；`publicImplementationAuthorized: false`；`indexablePageAuthorized: false`；没有 release PR 或 live URL。

用户任务：旅客输入夜数、抵离时间、跨城次数、换酒店次数和节奏偏好，看到真正可用于游览的天数与风险，而不是收到另一条自动生成路线。

必须守住的 canonical 边界：

- `is-your-china-itinerary-too-rushed` 仍是编辑解释 owner；工具只做透明计算并回链。
- 不调用实时车次或航班，就不承诺实时可行性。
- 不输出城市×天数×人群的独立 URL，不生成可索引排列组合。
- 本票先交工具逻辑/测试规格；未获中央产品批准前不得建公开工具。

审查门禁：规格 owner 是员工 4。精确 handoff signal `SPEC REVIEW READY` 已在 `1e131ff` 的规格中观察到，因此员工 8 现在只可审查技术可行性与测试，不实现、不建页、不公开、不索引、不发布。只有 Mac 中央编辑的明确批准可以改变 `publicToolCreationAuthorized: false`。

员工 4 规格应定义、仅供审查的数据与规则（不构成公开实现授权）：

- 输入：总夜数、抵达时段、离境时段、跨城段、机场/车站换乘、换酒店、旅客节奏。
- 输出：完整游览日、碎片日、transfer tax、建议缓冲、过载提示、对应 owner 链接。
- 模型必须显式展示假设；未知输入返回保守范围，不假装精确。

交付验收：中央可审阅的公式、状态表、边界条件和至少 12 个测试场景；链接 `is-your-china-itinerary-too-rushed`、三城十日、older parents、open-jaw、last-night、night-train owners。

禁止重复：不另建 How many days in China 页面；First China Trip Routes collection 继续 noindex/held，未过 coverage gate 不创建。

## Ticket 5 — 员工 5 / 住宿

- `candidateId`: `stay-20260811-01`
- `workingTitle`: **Can Foreigners Stay in Any Hotel in China? Booking, Registration and Refusal Recovery**
- `action`: `new-page`
- `section`: `stay`
- `primaryCollectionId`: `stay-access-foreign-guests`
- `targetIntent`: `execute`
- `pageFamily`: `task`
- `taskMode` / `artifactShape`: `choose-and-recover` / `task-recovery-guide`
- `primaryEntityId`: `country-china`
- 分数：**88/100**（23/14/15/15/15/6）
- 状态：`candidateStatus: selected` / `centralDecision: approved` / `executionStatus: release-completed` / `publicationStatus: published`
- 执行证据：Issue `null`；PR #50；`foreigners-china-hotel` 三语 owner 已进入 canonical repository。

用户任务：外国旅客要确认能否入住、如何登记；若预订后被拒，怎样向前台说明、联系平台、找替代住宿并保留必要记录。

必须守住的 canonical 边界：

- 法律规则、平台显示、酒店实际执行要分开写，不能把平台标签当法律。
- “哪家 App 最好”只做非排名检查模块；不建易过时榜单。
- 价格/价值仍归 `why-are-hotels-in-china-so-cheap`；酒店距地铁仍归 `china-hotel-near-metro`。

中央内容审核仍需核对的 source pack：

- [中国政府网：住宿业不得以涉外资质为由拒绝境外人员](https://www.gov.cn/hudong/202405/content_6952770.htm?show_loading=0&webview_progress_bar=1)
- [State Council English update](https://english.www.gov.cn/news/202407/26/content_WS66a2d827c6d0868f4e8e975c.html)
- [National Immigration Administration accommodation registration](https://en.nia.gov.cn/n147423/n147478/n147715/c158241/content.html)
- [Shanghai official implementation reference](https://english.shanghai.gov.cn/en-Latest-WhatsNew/20240529/6ff842313deb45e1b14cf5fd2a01d065.html)
- 政策表述、登记要求与恢复渠道必须同周复核。

交付验收：预订前检查→入住材料→前台沟通→平台升级→替代住宿→登记收尾的恢复流程；链接 hotel value、Beijing areas、metro rubric、last-night owners。

禁止重复：Airport hotel vs city hotel 并入已发布 last-night owner；不得按城市复制 foreign-friendly hotel 页面。

## Ticket 6 — 员工 6 / 入境与实用

- `candidateId`: `essentials-20260811-01`
- `workingTitle`: **China eSIM or Local SIM? Choose Data, a Local Number or Both**
- `action`: `new-page`
- `section`: `essentials`
- `primaryCollectionId`: `essentials-payments-connectivity`
- `targetIntent`: `compare`
- `pageFamily`: `comparison`
- `taskMode` / `artifactShape`: `choose-and-execute` / `decision-guide`
- `primaryEntityId`: `country-china`
- 分数：**88/100**（24/15/13/15/15/6）
- 状态：`candidateStatus: selected` / `centralDecision: approved` / `executionStatus: release-completed` / `publicationStatus: published`
- `durableArtifact`: `true`；Issue `null`；PR #41；`china-esim-vs-local-sim` 三语 owner 已进入 canonical repository

用户任务：旅客依据手机兼容、移动数据、是否需要中国号码/SMS、支付/叫车/酒店联系与备份需求，在 eSIM、当地 SIM 或双卡之间做决定。

必须守住的 canonical 边界：

- 保持供应商中立，不做“最佳 eSIM provider”榜单或每个 provider 单页。
- 支付 App 的设置与失败恢复归已上线的 `how-to-pay-in-china-as-a-tourist`；本文只解释连接方式如何影响这些任务。
- 不对被屏蔽服务、漫游路由或设备兼容作无来源的统一承诺。

中央内容审核仍需核对的 source pack：

- [China Mobile service guide for foreign visitors](https://www.10086.cn/support/service/foreign/)
- 当前设备 eSIM/双卡能力、主要运营商实名与套餐规则、漫游与本地号码差异均需上线前复核。

交付结果：以“只要数据 / 还要本地号码 / 两者都要 / 手机不兼容”四条路径给出选择与失败备选，并已迁入 canonical repo。后续只能做来源和产品行为更新，不得重建近义 owner。

禁止重复：Alipay vs WeChat 必须并入支付稿；Entry Eligibility Checker 暂缓，未有法律数据 owner、监控 SLA、版本规则和 fail-closed 测试前不得建。

## 外部市场观察：不发票

以下仅为 `research-watch`，`ticketIssued: false`、`writerStartAuthorized: false`；不改变本轮六张冻结票据，也不自动递补。

| 观察面 | 更合适的未来形态 | 锁题边界 |
|---|---|---|
| 第一次访华与数字生存 | 既有 owner 更新 + route tool | 路线现实性归员工 4 规格与 rushed-itinerary；payment、HSR、eSIM 分别保留 owner，不写泛“中国必备 App”或日数排列页。 |
| Amap、饮食限制、景点预约 | 地址卡/tool、指南+双语卡、维护型矩阵 | 只有实测地址/失败恢复才做 Amap；素食、清真、严重过敏分栏但全国一个 owner；景点预约不得每处复制同一模板。 |
| 城市与区域 | city-Hub / regional Hub / selector | 可研究大同、泉州、平遥、景德镇、洛阳，以及成都–重庆–张家界、上海–苏州–杭州–水乡网络；只有明确路线、取舍、到达或现场任务才值得存在，不写通用城市百科，不做城市×月份×人群组合，也不声称已证实高搜索量。 |
| 景点与可达性 | 旧文模块、城市 Hub、结构化数据 | 故宫是本轮已经发布的景点任务；老人、轮椅、推车与婴幼儿字段优先并入既有 owner，不按景点或人群批量建页。 |
| 地点型历史与传说 | 解释型 collection / 既有地点页章节 | 必须区分可证史实、文学设定、地方传说、后世纪念与现代旅游包装；传说不得写成事实，也不按朝代、人物或传说批量建薄页。 |
| 假期与非政治旅行新闻 | calendar/data owner；`update-existing` 与 freshness queue 优先 | 新闻只跟踪 UNESCO/地质公园、铁路接入、场馆开放、预约/支付变化、关闭与重开；先更新 evergreen owner。政治、意识形态、地缘评论、八卦和纯流量热点全部拒绝，本轮不发新闻票。 |

这些观察项的搜索量、CPC、难度与购买概率均不可用；只有在补齐 SERP 缺口、来源、Homeground 信息增量和维护责任后，才可进入下一轮正式评分。

## 中央编辑剩余审核清单

Ticket 1、2、3、5、6 已批准并发布。中央对 Ticket 4 仍只可做：批准技术实现、退回补证、继续内部审查或拒绝。任何公开工具决定仍需另行明确记录：

1. canonical owner 与禁止重复边界不变；
2. source pack 有具名负责人和上线前复核日期；
3. 三个 locale 仍是一项工作身份；
4. 不创建未过 Phase 1 gate 的 collection/Hub/indexable URL；
5. tool 票据先批准逻辑与维护责任，再批准公开实现。
6. 本轮不增加第七篇；退回、延迟或拒绝的票据不触发自动递补。
7. Route Reality Checker 的 `SPEC REVIEW READY` 只启动员工 8 的技术可行性与测试审查，不授权公开工具。
8. 只有批准后才创建 GitHub Issue 正式工单；当前没有正式 SEO Issue，不得补写或虚构历史 Issue URL。

Ticket 4 不得因已有规格获得公开实现、建页、索引或发布授权。其他五张历史文章票已 release-completed，不产生追加任务；2026-08-20 新批次按上表执行，但仍不等于合并、部署或上线。
