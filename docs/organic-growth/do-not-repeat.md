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
7. Search Console 和关键词工具在 2026-08-11 **不可用**。不得用自动补全、结果数或主观感觉补写搜索量、购买概率、点击或流量。

## 本轮锁定的 14 个身份：绝对不得再选

开工时这 14 个身份均未上线。审计期间，`china-high-speed-train-first-time-guide`、`china-in-october-golden-week-or-later`、`beijing-where-to-stay-first-trip`、`how-to-pay-in-china-as-a-tourist` 已进入最新 `origin/main` 并完成三语上线；其余 10 个仍制作中。状态改变不解除锁题，本表也不把同一身份重复计数。

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

## 已发布 canonical owners：不可撞题

### 张家界

- `zhangjiajie-itinerary`：2/3/4 天属于同页；不得拆日数页。
- `zhangjiajie-from-malaysia`：马来西亚到张家界；不得扩成 KL/Penang × 日数矩阵。
- `zhangjiajie-glass-bridge-vs-skywalk`：glass bridge 与 skywalk 的比较任务。
- `zhangjiajie-older-travellers`：张家界特定的年长旅客适配。
- `best-zhangjiajie-night-show`：三个夜秀选择；不得一秀一页。

### 行程与交通

- `beijing-zhangjiajie-shanghai-10-days`：精确三城十天的行程可行性。
- `beijing-zhangjiajie-shanghai-transport`：同走廊 train/flight 执行；不得按方式拆。
- `is-your-china-itinerary-too-rushed`：全国通用 pace、城市数量、how-many-days 头部任务。
- `china-itinerary-with-older-parents`：全国 12–14 天父母同行；张家界细节链接专页。
- `how-much-does-a-china-trip-cost`：全国总成本；不得生成城市×天数×人数报价页。

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

## 六个池内批准项自身也不得被拆分

这些项目仍需中央批准；此处只锁定其潜在 canonical 边界。

- `transport-20260811-01`：Beijing South/West/Chaoyang/Fengtai/Qinghe 是一个站点选择矩阵，不是一站一页。
- `destination-20260811-01`：Forbidden City ticket/entrance/3-hour route/north exit 是一个连续执行任务。
- `culture-20260811-01`：shared meal 的 ordering/seating/sharing/paying 是一餐的顺序，不拆礼仪页。
- `planning-20260811-01`：route reality checker 不生成城市×日数×人群可索引结果页。
- `stay-20260811-01`：foreign-hotel booking/registration/refusal recovery 是一个任务，不按城市复制。
- `essentials-20260811-01`：eSIM/local SIM/local number/both 是一个选择树，不按 provider 建页。

## 新提案提交前的冲突测试

任何员工提交新题前必须回答：

1. 是否与上表 owner 解决同一个最终任务？若是，默认 `update-existing` 或 `merge`。
2. 差异是否只来自语言、年份、城市修饰、人群修饰、天数或同义词？若是，拒绝新页。
3. 真实 SERP 缺口是否来自内容能力，而不是标题没完全匹配？
4. Homeground 是否有可验证、其他结果没有的信息增量？
5. 动态事实是否有一手来源、负责人、复核频率和失效处理？
6. Hub、collection、tool、FAQ 或 data page 是否比文章更适合？
7. 是否已经在 live sitemap、最新 `origin/main`、任一 `origin/article/*` 或 `origin/codex/*` 中发布/制作？若是，禁止再选。

任一答案不清楚时，题目回到 Search Map 候选池，不得先写后判。
