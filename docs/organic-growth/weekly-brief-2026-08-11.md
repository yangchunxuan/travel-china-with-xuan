# Homeground 下一轮 SEO 选题票据 — 2026-08-11

状态：`CENTRAL APPROVAL REQUIRED`

以下六张票据是 Search Map 的池内唯一推荐，不是开工命令。Mac 中央编辑逐张批准前，员工 1–6 不得写正文、建页、改 registry/sitemap/indexability 或发布。若中央编辑不批准，票据回到候选状态，不自动递补第二名。

本轮硬上限：票据集合冻结为以下六项，不增加第七个文章、页面或票据，也不自动递补。Route Reality Checker 的内部规格和员工 8 审查不计作新增文章。

维护观察不是授权记录：11:46 检查到员工 1、2、3、5 的既有票据已形成并推送 canonical-repo durable drafts `32504fc` / `949c06d` / `72dc3ea` / `a5be2b6`；员工 4 已在 `origin/article/worker-4-route-reality-checker-spec@1e131ff` 提交内部规格；员工 6 提供了独立 unborn repo 中未跟踪、未暂存、未提交、未推送且无 remote 的英文稿 `china-esim-vs-local-sim.md`。这些状态没有改变本 brief 的 `writerStartAuthorized: false`；中央编辑若已在别处批准，必须把可审计的批准记录同步回 Search Map。

数据限制：Search Console **不可用**；关键词体量工具 **不可用**。评分依据是线上/仓库真实覆盖、当前定性 SERP 样本、近期旅客问题、官方来源可用性与 Homeground 信息增量；没有搜索量、购买概率或流量预测。

状态变化：本轮开工时锁定的 14 个未上线身份中，Beijing stay、national HSR、October 与 tourist payments 在审计期间进入最新 `origin/main` 并完成三语上线。它们现在是 published canonical owners；其余 10 个仍制作中。六张新票据的边界已按最终线上状态重算。

## Ticket 1 — 员工 1 / 交通

- `candidateId`: `transport-20260811-01`
- `workingTitle`: **Which Beijing Railway Station? South, West, Chaoyang, Fengtai and Qinghe Explained**
- `action`: `new-page`
- `section`: `transport`
- `primaryCollectionId`: `transport-airports-rail-hubs`
- `targetIntent`: `execute`
- `pageFamily`: `combined-decision`
- `taskMode` / `artifactShape`: `choose-and-execute` / `decision-guide`
- `primaryEntityId`: `city-beijing`
- 分数：**88/100**（22/15/15/13/14/9）
- 状态：`pool-approved-pending-central`

用户任务：旅客已拿到或准备购买火车票，需要判断票面车站、路线方向、酒店位置与进站交通是否匹配，并避免去错站。

必须守住的 canonical 边界：

- 只做一页五站决策矩阵，不做五个 station 页面。
- 全国购票、12306、护照、席别、行李、安检与乘车流程仍归已上线的 `china-high-speed-train-first-time-guide`。
- 北京–张家界–上海的 train-or-flight 决策仍归 `beijing-zhangjiajie-shanghai-transport`。

中央批准后才可执行的 source pack：

- [Beijing railway transportation](https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202412/t20241217_3967615.html)
- [Beijing subway access](https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202412/t20241216_3966828.html)
- [Beijing transport update](https://english.beijing.gov.cn/latest/news/202412/t20241225_3973421.html)
- 同周核对各站接驳与代表车次；车次只能作例子，不能作永久承诺。

交付验收：票面名称→适用方向→市内位置→地铁/车程摩擦→行李/早晚班→走错站恢复，形成一个可扫描矩阵；至少链接 `china-high-speed-train-first-time-guide`、`beijing-zhangjiajie-shanghai-transport`、`beijing-where-to-stay-first-trip`。

禁止重复：How early to arrive、train tickets、boarding、luggage、seat classes 均不得另建页。

## Ticket 2 — 员工 2 / 目的地

- `candidateId`: `destination-20260811-01`
- `workingTitle`: **Forbidden City for Foreign Visitors: Correct Entrance, a 3-Hour Route and the North-Gate Exit**
- `action`: `new-page`
- `section`: `explore`
- `primaryCollectionId`: `explore-attractions-nature-heritage`
- `targetIntent`: `execute`
- `pageFamily`: `task`
- `taskMode` / `artifactShape`: `execute` / `task-guide`
- `primaryEntityId`: `attraction-forbidden-city`
- 分数：**85/100**（23/13/15/14/14/6）
- 状态：`pool-approved-pending-central`

用户任务：外籍旅客需要一次解决预约/护照、正确入口、三小时内取舍、单向南进北出以及离场后的交通。

必须守住的 canonical 边界：

- ticket、entrance、3-hour route、north-gate exit 是一个连续任务，不拆四页。
- 不写通用故宫历史百科；历史只服务现场路线理解。
- 不把天安门预约混写成同一票，但必须明确两者的衔接与当前规则边界。

中央批准后才可执行的 source pack：

- [故宫博物院参观信息](https://www.dpm.org.cn/Visit.html?isappinstalled=0)
- [Visit Beijing 单向参观说明](https://english.visitbeijing.com.cn/article/4KD1c04OUDA)
- [Beijing city tour reference](https://english.beijing.gov.cn/travellinginbeijing/citytours/202006/t20200607_1918914.html)
- 预约、闭馆、外籍证件、入口/出口与天安门关联必须在写作同周、上线前各复核一次。

交付验收：给出从预约到北门离场的单一执行流；路线取舍按旅客可用时间和体力解释；离场后链接 `transport-20260811-01`（如获批）、`beijing-where-to-stay-first-trip`、`china-itinerary-with-older-parents`。

禁止重复：Mutianyu vs Badaling 本轮拒绝；Panda Base gate/time/route 必须并入制作中熊猫比较稿。

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
- 状态：`pool-approved-pending-central`

用户任务：第一次参加普通共享餐的旅客，要知道怎样跟着主人/同伴完成落座、点菜、用茶、夹取共享菜、付款和礼貌收尾。

必须守住的 canonical 边界：

- 这是“第一顿共享餐的实际顺序”，不是抽象的中国礼仪大全，也不是商务宴请礼仪。
- 地区、家庭、朋友、商务场景有差异；不得把单一做法写成全国硬规则。
- 广州早茶、yum cha、dim sum 点单和礼仪仍归 `how-guangzhou-morning-tea-works`。

中央批准后才可执行的 source pack：

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
- 状态：`pool-approved-pending-central`

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
- 状态：`pool-approved-pending-central`

用户任务：外国旅客要确认能否入住、如何登记；若预订后被拒，怎样向前台说明、联系平台、找替代住宿并保留必要记录。

必须守住的 canonical 边界：

- 法律规则、平台显示、酒店实际执行要分开写，不能把平台标签当法律。
- “哪家 App 最好”只做非排名检查模块；不建易过时榜单。
- 价格/价值仍归 `why-are-hotels-in-china-so-cheap`；酒店距地铁仍归 `china-hotel-near-metro`。

中央批准后才可执行的 source pack：

- [中国政府网：住宿业不得以涉外资质为由拒绝境外人员](https://www.gov.cn/hudong/202405/content_6952770.htm?show_loading=0&webview_progress_bar=1)
- [State Council English update](https://english.www.gov.cn/news/202407/26/content_WS66a2d827c6d0868f4e8e975c.html)
- [National Immigration Administration accommodation registration](https://en.nia.gov.cn/n147423/n147478/n147715/c158241/content.html)
- [Shanghai official implementation reference](https://english.shanghai.gov.cn/en-Latest-WhatsNew/20240529/6ff842313deb45e1b14cf5fd2a01d065.html)
- 政策表述、登记要求与恢复渠道必须同周复核。

交付验收：预订前检查→入住材料→前台沟通→平台升级→替代住宿→登记收尾的恢复流程；链接 hotel value、Beijing areas、metro rubric、last-night owners。

禁止重复：Airport hotel vs city hotel 并入 last-night 稿；不得按城市复制 foreign-friendly hotel 页面。

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
- 状态：`pool-approved-pending-central`
- `executionObservation`: `local-untracked-draft-observed-not-durable`
- 本地 artifact：`C:/Users/User/Documents/宝格丽的agent/articles/china-esim-vs-local-sim.md`；独立 unborn repo，未跟踪、未暂存、未提交、未推送且无 remote

用户任务：旅客依据手机兼容、移动数据、是否需要中国号码/SMS、支付/叫车/酒店联系与备份需求，在 eSIM、当地 SIM 或双卡之间做决定。

必须守住的 canonical 边界：

- 保持供应商中立，不做“最佳 eSIM provider”榜单或每个 provider 单页。
- 支付 App 的设置与失败恢复归已上线的 `how-to-pay-in-china-as-a-tourist`；本文只解释连接方式如何影响这些任务。
- 不对被屏蔽服务、漫游路由或设备兼容作无来源的统一承诺。

中央批准后才可执行的 source pack：

- [China Mobile service guide for foreign visitors](https://www.10086.cn/support/service/foreign/)
- 当前设备 eSIM/双卡能力、主要运营商实名与套餐规则、漫游与本地号码差异均需上线前复核。

交付验收：以“只要数据 / 还要本地号码 / 两者都要 / 手机不兼容”四条路径给出选择与失败备选；链接 payment、foreign-hotel（如获批）、entry collection、HSR owners。当前英文稿四路径与来源边界通过，但 9 个链接均为外部来源、内部链接为 0；进入中央验收前必须迁入 canonical repo、补 metadata/locale plan 与上述真实内链。

禁止重复：Alipay vs WeChat 必须并入支付稿；Entry Eligibility Checker 暂缓，未有法律数据 owner、监控 SLA、版本规则和 fail-closed 测试前不得建。

## 中央编辑审批清单

中央编辑对每张票只可做：批准、退回补证、合并到 owner、拒绝。批准时还需确认：

1. canonical owner 与禁止重复边界不变；
2. source pack 有具名负责人和上线前复核日期；
3. 三个 locale 仍是一项工作身份；
4. 不创建未过 Phase 1 gate 的 collection/Hub/indexable URL；
5. tool 票据先批准逻辑与维护责任，再批准公开实现。
6. 本轮不增加第七篇；退回、延迟或拒绝的票据不触发自动递补。
7. Route Reality Checker 的 `SPEC REVIEW READY` 只启动员工 8 的技术可行性与测试审查，不授权公开工具。

在中央编辑留下明确批准记录前，六张票据全部保持 `writerStartAuthorized: false`。
