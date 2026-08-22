# 员工5严格十篇任务 — 住宿

你是 Homeground 员工5，负责住宿内容。用户/中央已批准本批进行草稿生产，但你没有建 PR、合并或发布权限。

## Git

- 先 fetch 最新远端；基线必须是最新 origin/main，不得低于 72e5d161ed8af853fbf262e7c875f8fd748645e3。
- worktree：C:/Users/User/Documents/homeground-worker5-stay-scale-20260822
- branch：article/worker-5-stay-scale-20260822
- 一个身份一个原子 commit，共10个；完成后只 push，不建 PR、不合并、不部署。
- 不改主页、公开 Registry、sitemap、共享硬编码计数、字体或 indexability。

## 十个 owner

1. stay-20260822-scale-01 — Where to Stay in Chengdu: Chunxi Road, Wenshu or Kuanzhai Alley?；slug=chengdu-where-to-stay-chunxi-wenshu-kuanzhai；评分=92；复杂度=1。
2. stay-20260822-scale-02 — Where to Stay in Guangzhou: Beijing Road, Liwan or Tianhe?；slug=guangzhou-where-to-stay-beijing-road-liwan-tianhe；评分=93；复杂度=1。
3. stay-20260822-scale-03 — Where to Stay in Hangzhou: Hubin, Wulin or East Station?；slug=hangzhou-where-to-stay-hubin-wulin-east-station；评分=91；复杂度=1。
4. stay-20260822-scale-04 — Where to Stay in Dali: Old Town, Xiaguan or an Erhai Village?；slug=dali-where-to-stay-old-town-xiaguan-erhai-village；评分=88；复杂度=1。
5. stay-20260822-scale-05 — Where to Stay in Suzhou: Old City, Shantang or Jinji Lake?；slug=suzhou-where-to-stay-old-city-shantang-jinji-lake；评分=89；复杂度=1。
6. stay-20260822-scale-06 — Where to Stay in Sanya: Sanya Bay, Dadonghai, Yalong Bay or Haitang Bay?；slug=sanya-where-to-stay-four-bays；评分=86；复杂度=2。
7. stay-20260822-scale-07 — Stay Inside or Outside Pingyao Old City?；slug=pingyao-stay-inside-or-outside-old-city；评分=87；复杂度=1。
8. stay-20260822-scale-08 — Stay in a Fujian Tulou or at a Nearby Hotel?；slug=fujian-tulou-stay-inside-or-nearby-hotel；评分=90；复杂度=2。
9. stay-20260822-scale-09 — China Hotel Room Doesn’t Match the Booking: Verify, Change Rooms or Relocate；slug=china-hotel-room-does-not-match-booking；评分=91；复杂度=1。
10. stay-20260822-scale-10 — Left Something at a China Hotel: Verify, Collect or Ship It；slug=china-hotel-left-item-recovery；评分=87；复杂度=2。

## 本池 canonical 锁

- 城市页只比较住宿区域/基地，不列酒店、不声称实时价格、房态或外宾接待。
- 土楼页只选住楼内还是附近；fujian-tulou-cluster-selection 继续选聚落。
- 房间不符页只管现场核对与恢复；拒住、预订前选择和后续争议归现有 owner。
- 酒店遗失物只管保管/取回/寄送确认，不保证跨境寄送、费用或时效。

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
