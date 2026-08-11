# Homeground Search Map 快照 — 2026-08-11

状态：`SEARCH MAP READY — CENTRAL APPROVAL REQUIRED`

本快照是团队唯一的选题与搜索任务主账本的人类可读版本。机器可读权威文件是 `docs/organic-growth/search-map.json`。员工 7 本次维护没有写文章、创建公开页面或修改 registry/sitemap/indexability；并发 worktree 只作为执行观察入账，不自行构成中央批准。

## 1. 口径与输入审计

- 内容身份：英文、中文、韩文最多是同一内容身份的三个 locale，不按三篇计算。
- 仓库基线：最新 `origin/main`，提交 `073e019478bd81166eea2e4e48fc6f040167f393`。相对 `6df1f55` 的两次提交仅涉及 editorial UI 与中文语言导航，没有新增指南身份或改变 indexability。
- 仓库规范：已完整读取 `docs/article-production-lite.md` 与 `docs/homeground-search-platform-phase-1-spec.md`。
- 线上：2026-08-11 检查了 [sitemap](https://homegroundchina.com/sitemap.xml)、[guides 目录](https://homegroundchina.com/guides/) 与全部指南详情页的 HTTP、canonical、robots、hreflang。审计期间 sitemap 从 94 增至 106 个 URL，四个三语稿同步上线。
- 远端：已检查全部 32 个 `origin/article/*` 与 `origin/codex/*` ref；修复分支只算相同稿件的新版本；current-round draft/spec ref 仍按既有六张票据计数，不增加内容身份。
- 现有 Search Map：**不可用**。`origin/main` 没有既有 `docs/organic-growth` 主账本或等价的 canonical candidate ledger。
- Search Console：**不可用**。没有已安装的 Search Console connector；可用浏览器会话未登录，只能到公开登录/about 页面。Clicks、impressions、queries、position 均未使用。
- 关键词工具：**不可用**。没有已认证的关键词体量工具；搜索量与购买概率均未估算。
- 当前 SERP 与真实问题：可用但只作定性证据。没有把 Google 自动补全、结果数量或 Reddit 帖子数当搜索量。

## 2. 总览

| 状态 | 内容身份数 | 说明 |
|---|---:|---|
| 已发布指南身份 | 24 | 23 篇文章 + 1 个 entry requirements 系统 collection；共 64 个详情 URL |
| Guides 目录 | 1 | `/guides/` 的 en/zh/ko 三个 locale URL |
| Section Hub | 9 | 6 个 published/indexable；when-to-go、culture、tools 为 review/noindex |
| 本轮开工时锁定稿 | 14 | 14 个身份全部已纳入且仍禁止重选 |
| 当前制作中 | 10 | 审计期间 4 个身份转为 published/indexable；其余 10 个仍在远端分支 |
| 本轮候选 | 18 | 六个内容池各 3 个 |
| 池内批准 | 6 | 每池恰好 1 个；仍须 Mac 中央编辑批准 |
| 本轮执行锁 | 6 | 票据集合冻结；4 个 durable draft、1 个 `SPEC REVIEW READY`、1 个尚无 branch/worktree；不追加第七篇 |
| 合并/更新路由 | 9 | 8 个候选路由 + 1 个已合并 legacy shell；不创建第二 canonical URL |
| 明确拒绝模式 | 12 | 包含近义页和排列组合页 |
| 动态事实复核组 | 10 | 法规、机场、铁路、支付、门票等 |

最终线上 sitemap 共 106 个 URL；指南范围为 64 个详情 URL + 3 个 guides 目录 locale URL。本次主题盘点聚焦指南、目录与 section hubs。除已单列的 `system-guides` 与 `system-entry-requirements` 外，另有 7 个运营/法律/转化系统身份，不作为搜索编辑选题身份。

### 审计期间状态变化

本轮启动时，`beijing-where-to-stay-first-trip`、`china-high-speed-train-first-time-guide`、`china-in-october-golden-week-or-later`、`how-to-pay-in-china-as-a-tourist` 均不在当时的 `origin/main`/live sitemap。08:18（Asia/Shanghai）复核时，`origin/main` 已推进到 `6df1f55`，四项的 en/zh/ko URL 均为 200、自 canonical、`index, follow` 且进入 sitemap。Search Map 因而把它们从制作中转为已发布，但仍保留在“本轮 14 个锁题身份”审计表中；没有任何一个被重新提名。

08:52 最终远端复核时，`origin/codex/pending-visual-batch-b-20260810` 前进到 `e5325b7`，变更为五篇稿的授权摄影、图片元数据与正文图片引用；五个内容身份及 canonical 边界不变。08:55 再次读取线上 sitemap，仍为 106 / 67 / 64（全站 URL / guides 范围 / guide 详情）。

11:30 维护复核时，`origin/main` 已前进到 `073e019`，但只含 UI 与语言导航修复；已发布仍为 24 个身份。远端文章与 codex 审计 ref 从 25 增至 32：Beijing-station、Forbidden City、shared-meal 与 foreign-hotel 已形成 durable drafts `32504fc` / `949c06d` / `72dc3ea` / `a5be2b6`，两条为非内容修复分支，Route Reality Checker 是内部规格提交 `1e131ff`；员工 6 尚无 worktree。六项全部对应既有票据，没有第七个主题。11:31 再查线上 sitemap 仍为 106 / 67 / 64，已观察到的 current-round content ID 命中为 0；员工 6 尚无 slug，不作猜测。

重复风险提示：员工 1 的 Beijing-station durable draft 仍是同一锁定主题，但 metadata 写为 `primaryIntent: plan` / `family: comparison`，与 Search Map 的 `execute` / `combined-decision` 不一致；在中央接受、合并或发布前必须对齐，不能靠改字段把同一主题伪装成第二个 identity。

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
| `system-entry-requirements` | [China Entry Guides: Visa-Free Rules by Passport & Route](https://homegroundchina.com/guides/china-entry-requirements/) | en | essentials / `essentials-entry-transit` | 六个法律 owner 的系统路由 collection | critical / source change |

补充：旧路径 `/china-visa-free-uk-canada/` 是 noindex/follow canonical shell，canonical 指向 `system-entry-requirements`；不得复活成第二个入口页。

## 4. 本轮 14 个锁题身份：4 个审计期间上线，10 个仍制作中

分支 metadata 的 `datePublished` 本身不算上线证据；最终状态以最新 `origin/main` 与 live sitemap 为准。下表完整保留开工时的 14 个未上线身份，确保没有任何一个被再次选题。

| Pool | Canonical owner | 当前状态 | 当前权威版本 | 已锁定任务；禁止另起近义页 |
|---:|---|---|---|---|
| 1 | `china-high-speed-train-first-time-guide` | **published during audit** | `origin/main@6df1f55` | 全国首次乘高铁：票、12306、车站流程、席别、行李、乘车；arrival buffer 也并入 |
| 1 | `guangzhou-baiyun-airport-t2-t3` | in production | `origin/codex/pending-visual-batch-b-20260810@e5325b7` | T2/T3、关闭航站楼、地铁/城际、走错航站楼 |
| 1 | `pudong-airport-to-shanghai-disneyland` | in production | `origin/codex/pending-visual-batch-b-20260810@e5325b7` | PVG 到迪士尼；Airport Link/taxi、儿童、行李、晚到 |
| 2 | `lijiang-old-town-or-shuhe-where-to-stay` | in production | `origin/codex/pending-visual-batch-b-20260810@e5325b7` | 丽江住宿 + 大研/束河选择 |
| 2 | `chengdu-panda-base-or-dujiangyan-panda-valley` | in production | `origin/codex/worker-2-panda-base-vs-panda-valley@ce893ed` | 场馆选择；时间、入口、半日路线并入同页 |
| 3 | `how-guangzhou-morning-tea-works` | in production | `origin/codex/pending-visual-batch-b-20260810@e5325b7` | 早茶/yum cha/dim sum/点单/礼仪/历史是一个身份 |
| 3 | `how-to-read-a-suzhou-garden` | in production | `origin/codex/pending-visual-batch-b-20260810@e5325b7` | 园林构成、借景与四园比较；“最好/选哪座园林”先并入 |
| 4 | `china-last-night-before-international-flight` | in production | `origin/article/worker-4-china-last-night-buffer@0aaab9a` | 最后一晚、起飞前缓冲、同日转乘、机场酒店同义任务 |
| 4 | `china-night-train-or-daytime-high-speed-rail` | in production | `origin/article/worker-4-china-night-train-decision@819b37b` | 夜车/日间高铁、硬卧/软卧、节省酒店同一决策 |
| 4 | `china-open-jaw-flights-route-planning` | in production | `origin/article/worker-4-china-open-jaw@94b40d3` | 一城进、另一城出及线路设计；不拆城市组合 |
| 4 | `china-in-october-golden-week-or-later` | **published during audit** | `origin/main@6df1f55` | 全国十月/黄金周决策；不做城市×十月 |
| 5 | `beijing-where-to-stay-first-trip` | **published during audit** | `origin/main@6df1f55` | 北京首次住宿四区比较；不拆四个 area 页面 |
| 5 | `china-hotel-near-metro` | in production | `origin/article/worker-5-china-hotel-near-metro@1c02bef` | 全国酒店位置判断：行李、步行、家庭、无障碍 |
| 6 | `how-to-pay-in-china-as-a-tourist` | **published during audit** | `origin/main@6df1f55` | Alipay、WeChat、现金、卡、失败恢复的完整栈 |

### 4A. 本轮六张票据的执行锁（维护观察，不是开工授权）

| 票据 | 当前观察状态 | 锁题与审查要求 |
|---|---|---|
| `transport-20260811-01` | `origin/article/worker-1-beijing-railway-stations@32504fc` 已提交并推送 durable draft | 仍是五站一个选择矩阵；不得按车站拆页。metadata intent/family 必须在中央接受前与主账本对齐 |
| `destination-20260811-01` | `origin/article/worker-2-forbidden-city-foreign-visitors@949c06d` 已提交并推送 durable draft | 护照预约、午门入口、三小时路线、神武门离场是一个任务；不得拆票务/入口页 |
| `culture-20260811-01` | `origin/article/worker-3-first-shared-meal@72dc3ea` 已提交并推送 `first-shared-meal-in-china` durable draft | ordering/seating/sharing/paying 不拆；广州早茶与 dim sum 仍归广州 owner |
| `planning-20260811-01` | `origin/article/worker-4-route-reality-checker-spec@1e131ff` 已提交内部规格并标记 `SPEC REVIEW READY` | 员工 8 现在只可做技术可行性与测试审查；仍不得实现或创建公开工具 |
| `stay-20260811-01` | `origin/article/worker-5-foreigners-china-hotel@a5be2b6` 已提交并推送 `foreigners-china-hotel` durable draft | metadata 与主账本一致；booking/registration/refusal recovery 仍是一个 owner，不得城市复制 |
| `essentials-20260811-01` | 尚未观察到 branch/worktree | eSIM/local SIM/local number/both 保持一个供应商中立的选择树 |

本轮票据集合冻结为以上六项，不增加第七个文章、页面或票据，也不因某票延迟或退回而自动递补第二名。Route Reality Checker 的内部规格与员工 8 审查不计作新增文章。未提交 worktree、branch reservation 或 `SPEC REVIEW READY` 均不会自行把 `writerStartAuthorized` 改为 `true`；该 signal 只解除员工 8 的等待状态并开放限定审查。

## 5. 候选评分与决策

评分列顺序：用户任务与需求证据 / 真实覆盖缺口 / 来源可用性 / Homeground 信息增量 / 内链网络价值 / 维护成本与风险（高分代表更可控）。满分分别为 25/20/15/15/15/10。

形态审查结果：5 个 `new-page`、4 个 `update-existing`、4 个 `merge`、3 个 `tool`、1 个 `collection`、1 个 `reject`。Tea-house 候选被路由为 culture Hub 内 FAQ 模块；没有候选具备独立 data page 或新 Hub 的证据门槛。

| Pool | candidateId | workingTitle | 最佳形态 | 分项 = 总分 | 决策 |
|---:|---|---|---|---:|---|
| 1 交通 | `transport-20260811-01` | Which Beijing Railway Station? | new-page | 22/15/15/13/14/9 = **88** | **池内批准；待中央批准** |
| 1 交通 | `transport-20260811-02` | How Early for a China High-Speed Train? | update-existing | 23/10/15/8/14/9 = 79 | 更新 HSR owner，不建页 |
| 1 交通 | `transport-20260811-03` | International Flight → China Train Connection | tool | 18/17/10/14/14/5 = 78 | 暂缓；先有数据模型和维护人 |
| 2 目的地 | `destination-20260811-01` | Forbidden City for Foreign Visitors | new-page | 23/13/15/14/14/6 = **85** | **池内批准；待中央批准** |
| 2 目的地 | `destination-20260811-02` | Mutianyu or Badaling? | reject | 23/7/15/11/13/7 = 76 | 拒绝通用新页；SERP 同质化 |
| 2 目的地 | `destination-20260811-03` | Panda Base Gate, Time and Route | merge | 20/8/15/5/12/6 = 66 | 并入熊猫场馆比较稿 |
| 3 文化 | `culture-20260811-01` | Your First Shared Meal in China | new-page | 18/14/11/15/13/9 = **80** | **池内批准；待中央批准** |
| 3 文化 | `culture-20260811-02` | How Do Chinese Tea Houses Work? | update-existing | 17/13/11/11/11/9 = 72 | 先做 culture hub/FAQ 模块，暂不独立 |
| 3 文化 | `culture-20260811-03` | Guangzhou Dim Sum Etiquette | merge | 20/9/13/4/10/9 = 65 | 并入广州早茶稿 |
| 4 规划 | `planning-20260811-01` | China Route Reality Checker | tool | 24/16/12/15/15/8 = **90** | **池内批准；待中央批准** |
| 4 规划 | `planning-20260811-02` | How Many Days: 7 vs 10 vs 14 | update-existing | 24/8/14/7/14/9 = 76 | 更新 rushed-itinerary owner |
| 4 规划 | `planning-20260811-03` | First China Trip Routes by Pace | collection | 22/11/12/10/15/8 = 78 | 暂缓；Phase 1 gate 未满足，不公开/索引 |
| 5 住宿 | `stay-20260811-01` | Can Foreigners Stay in Any Hotel? | new-page | 23/14/15/15/15/6 = **88** | **池内批准；待中央批准** |
| 5 住宿 | `stay-20260811-02` | Airport Hotel or City Hotel Last Night? | merge | 17/7/12/5/13/8 = 62 | 并入 last-night 稿 |
| 5 住宿 | `stay-20260811-03` | Best Hotel Booking Apps | update-existing | 20/10/9/7/13/5 = 64 | 做 owner 内模块，不做易过时榜单 |
| 6 入境/实用 | `essentials-20260811-01` | China eSIM or Local SIM? | new-page | 24/15/13/15/15/6 = **88** | **池内批准；待中央批准** |
| 6 入境/实用 | `essentials-20260811-02` | China Entry Eligibility Checker | tool | 25/12/15/12/15/3 = 82 | 暂缓；法律数据 owner/SLA 未建立 |
| 6 入境/实用 | `essentials-20260811-03` | Alipay or WeChat Pay? | merge | 25/9/15/4/14/5 = 72 | 并入支付稿 |

### 六个池内批准项为何值得送中央编辑

1. `transport-20260811-01`：真实问题是“票面车站是哪一个、住处和线路应该对应哪个站”，不是再写全国高铁流程。北京市官方交通资料可用；一个五站矩阵比五个薄页更有信息增量。Canonical 边界：全国高铁流程仍归 `china-high-speed-train-first-time-guide`。
2. `destination-20260811-01`：近期问题集中在外籍游客预约、入口、单向南进北出和离场后衔接。故宫官方资料可用，但运营事实必须同周复核。题目把四个子任务留在同一页。
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
- **P0/P1 动态复核**：已上线的支付、高铁、十月 owner 立即进入变更监控；机场、熊猫等剩余稿上线前复核并吸收对应合并模块。
- **P2**：只有 route checker 被中央批准后，才更新 rushed-itinerary 的 7/10/14 日表格与工具链接。

## 7. 动态事实复核队列

| 优先级 | Owner/组 | 必查事实 | 触发条件 |
|---|---|---|---|
| P0 critical | entry collection + US/UK/CA/NZ/240h/SG 六 owner | 资格、目的、停留期、口岸/区域、第三国路线、材料 | NIA/使馆/国务院变化；任何发布前 |
| P0 | Guangzhou airport + PVG→Disney drafts | 航站楼、关闭状态、Airport Link、地铁/城际、晚到备选 | 机场/运营方变化；上线前 |
| P0 | live HSR + night-train draft | 售票、护照、行李、进站、车次产品 | 12306/国铁变化；live owner 立即更新、draft 上线前复核 |
| P0 | live October owner | 节假日日期、放票、关闭、拥挤/天气表述 | 年度日历或重大假期/关闭变化 |
| P0 | live payment owner + eSIM candidate | 外卡、实名、限额、备用支付；运营商、设备、号码用途 | 监管/平台/运营商/设备变化 |
| P1 | panda draft | 预约、开放、入口、交通与观看时段 | 场馆公告；上线前 |
| P1 | cost + hotel value | 价格示例、币种、平台、价值判断 | 季度或明显价格变化 |
| P1 | night show + Malaysia access + 3-city transport | 演出、航班/铁路、时刻示例 | 运营/时刻变化 |
| P0 if approved | Forbidden City candidate | 预约、护照、入口/出口、闭馆、天安门关联 | 写作同周 + 上线前 |
| P0 if approved | foreign-hotel candidate | 法规、登记、平台标签、拒绝恢复 | 写作同周 + 政策/平台变化 |

## 8. 架构约束

- 27 个 `primaryCollectionId` 仍是 Phase 1 provisional taxonomy，不因本 Search Map 自动创建 URL。
- `collection`、Hub 或 tool 只有在 eligibility、coverage、source、maintenance gate 均满足后，才可由中央编辑另行批准公开或索引。
- 每页仅有一个 section、一个 primary collection 和一个 canonical owner；entity 是正交标注，不等于新 URL。
- `targetIntent` 与 `pageFamily` 使用仓库受控词表；更细的候选形态放在 `taskMode` 与 `artifactShape`，避免机器字段混义。
- 机器账本分别保存 origin/main 的 7 个真实 entity ID/已发布 runtime assignments 与编辑提议。候选的 `primaryEntityId`/`secondaryEntityIds` 是未落地提案，不会自动创建 entity record。
- `freshnessClass` 是 Search Map 对编辑复核风险的治理 override，不声称等于仓库当前 `updatePolicy`。
- 六个池内批准项只进入中央审批队列。员工 1–6 当前均不得据此开始写作、建页或改站点。
- 本轮 ticket set 硬冻结为六项；不得追加第七篇，也不得把 held/rejected/runner-up 自动递补进本轮。
- Route Reality Checker 规格 owner 是员工 4；`SPEC REVIEW READY` 已在 `1e131ff` 观察到，员工 8 现在仅可审查技术可行性与测试。未经 Mac 中央编辑明确批准，员工 8 无实现、建页、公开、索引或发布权限。
