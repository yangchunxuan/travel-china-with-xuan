# 员工1严格十篇任务 — 交通

你是 Homeground 员工1，负责交通内容。用户/中央已批准本批进行草稿生产，但你没有建 PR、合并或发布权限。

## Git

- 先 fetch 最新远端；基线必须是最新 origin/main，不得低于 72e5d161ed8af853fbf262e7c875f8fd748645e3。
- worktree：C:/Users/User/Documents/homeground-worker1-transport-scale-20260822
- branch：article/worker-1-transport-scale-20260822
- 一个身份一个原子 commit，共10个；完成后只 push，不建 PR、不合并、不部署。
- 不改主页、公开 Registry、sitemap、共享硬编码计数、字体或 indexability。

## 十个 owner

1. transport-20260822-01 — Which Xi’an Railway Station? Xi’an, Xi’an North or the New Xi’an East；slug=xian-railway-station-selector；评分=94；复杂度=2。
2. transport-20260822-02 — Chengdu CTU or TFU? Choose the Airport for the Whole Trip；slug=chengdu-shuangliu-or-tianfu-airport；评分=95；复杂度=2。
3. transport-20260822-03 — Which Guangzhou Railway Station? South, East, Central, Baiyun or North；slug=guangzhou-railway-station-selector；评分=95；复杂度=2。
4. transport-20260822-04 — Which Shanghai Railway Station? Shanghai, Hongqiao, South or Songjiang；slug=shanghai-railway-station-selector；评分=95；复杂度=2。
5. transport-20260822-05 — Zhangjiajie Airport, Central Station or West Station? Match the Arrival to Your Base；slug=zhangjiajie-airport-or-railway-station-arrival；评分=93；复杂度=2。
6. transport-20260822-06 — Beijing PEK or PKX? Choose Capital or Daxing by the Complete Trip；slug=beijing-capital-or-daxing-airport；评分=94；复杂度=2。
7. transport-20260822-07 — Chengdu to Chongqing by Train: Choose the Right Station Pair, Not Just the Fastest Train；slug=chengdu-chongqing-station-pair；评分=91；复杂度=2。
8. transport-20260822-08 — Changsha to Zhangjiajie: Train, Arrival Base and Park-Side Handoff；slug=changsha-zhangjiajie-transport-route；评分=89；复杂度=2。
9. transport-20260822-09 — Guilin to Longji Rice Terraces: Choose Ping’an or Dazhai Before the Transfer；slug=guilin-longji-rice-terraces-transfer；评分=91；复杂度=2。
10. transport-20260822-10 — Kunming to Stone Forest: Train, Bus or Car to the Correct Visitor Centre；slug=kunming-stone-forest-transport；评分=89；复杂度=2。

## 本池 canonical 锁

- 所有城市对线路只保留一个双向 canonical，禁止正反向各建页。
- 车站/机场页负责节点选择、门到门取舍和误站恢复；全国购票、住宿区域、城市路线顺序仍归现有 owner。
- 班次、停靠、航司分配、接驳和开放为动态事实；发布周必须复核，正文不得冻结时刻表或票价。
- 图片必须证明正确车站、机场、站牌或交接点，天际线不能作为交通证据。

## 每篇交付标准

- EN / 简中 / 韩文必须自然且结构对应；不是直译腔，也不能靠重复段落凑长度。
- 先给明确短答案，再给决策矩阵、执行步骤、失败恢复、不能承诺的边界与下一步。
- 交付 metadata、三语 body、source-log、image-plan、canonical-boundary；动态页再交 dynamic-facts。
- 官方/政府/运营方/博物馆/UNESCO等一手来源支撑动态和核心事实；论坛只作定性旅客问题，不作事实或搜索量。
- 使用真实非AI地点/流程图；记录作者、许可、原URL、准确地点、裁切处理、原图和成品SHA-256。不得把宣传图、泛城市图或别处照片冒充证据。
- 每篇自然链接5–8个现有 owner；不强推US$69/US$129、不新增销售型CTA、不提高付费服务权重。
- 运行 guide/content生成与检查、TypeScript、定向与全量测试、production build、git diff --check；真实记录所有结果，不删有效内容求绿。
- 浏览器验收10篇×3语共30页：桌面和390px、图片、语言入口、canonical/hreflang、来源默认折叠、无页面级横向溢出。
- 全量测试若只因中央共享计数尚未更新失败，记录精确断言；不要在员工分支修改共享总数。

## 完成状态

BATCH DRAFT READY — CENTRAL CONTENT REVIEW REQUIRED
