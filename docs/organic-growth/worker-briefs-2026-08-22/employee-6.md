# 员工6严格十篇任务 — 入境与实用

你是 Homeground 员工6，负责入境与实用内容。用户/中央已批准本批进行草稿生产，但你没有建 PR、合并或发布权限。

## Git

- 先 fetch 最新远端；基线必须是最新 origin/main，不得低于 72e5d161ed8af853fbf262e7c875f8fd748645e3。
- worktree：C:/Users/User/Documents/homeground-worker6-essentials-scale-20260822
- branch：article/worker-6-essentials-scale-20260822
- 一个身份一个原子 commit，共10个；完成后只 push，不建 PR、不合并、不部署。
- 不改主页、公开 Registry、sitemap、共享硬编码计数、字体或 indexability。

## 十个 owner

1. essentials-20260822-scale-01 — Amap, Apple Maps or Baidu Maps in China? Build a Verified Address and Navigation Backup；slug=china-navigation-verified-address-backup；评分=90；复杂度=2。
2. essentials-20260822-scale-02 — Translate China Without Chinese: Menus, Screenshots, Signs and Offline Backups；slug=translate-china-without-chinese-offline-backups；评分=85；复杂度=1。
3. essentials-20260822-scale-03 — China Airport Layover: Immigration, Bags, Airside and Overnight Decisions；slug=china-airport-layover-immigration-bags-airside-overnight；评分=92；复杂度=2。
4. essentials-20260822-scale-04 — China Tourist Tax Refund in 2026: Instant Refund, Customs and Departure；slug=china-tourist-tax-refund-workflow；评分=87；复杂度=2。
5. essentials-20260822-scale-05 — When Your Passport Is the Ticket in China: Booking-to-Gate Workflow；slug=china-passport-as-ticket-booking-to-gate；评分=91；复杂度=2。
6. essentials-20260822-scale-06 — China Attraction Sold Out: Legitimate Recovery Options；slug=china-attraction-sold-out-recovery；评分=89；复杂度=2。
7. essentials-20260822-scale-07 — How to Order Food in China Without Chinese: Counter, Paper Menu, QR and Delivery Fallbacks；slug=order-food-china-without-chinese；评分=90；复杂度=2。
8. essentials-20260822-scale-08 — China Public Toilets: Find One, Use Squat or Seated Toilets and Carry the Right Kit；slug=china-public-toilets-first-time-guide；评分=85；复杂度=1。
9. essentials-20260822-scale-09 — China Ride-Hailing Pickup Failure: Find the Car, Fix the Pin or Use a Safe Fallback；slug=china-ride-hailing-pickup-failure-recovery；评分=88；复杂度=2。
10. essentials-20260822-scale-10 — Checked Bag Missing or Damaged at a China Airport: Report, Trace and Continue the Trip；slug=china-airport-checked-bag-missing-damaged；评分=91；复杂度=2。

## 本池 canonical 锁

- 导航页只做验证中文地址与备份，不做App榜单；叫车页只管已下单后的接人失败。
- 护照作票页从合法预约后开始；姓名录入和购票渠道归现有 owner。
- 售罄恢复不得教黄牛、绕过实名或非官方入口。
- 行李页不承诺赔偿、责任或时限；税退页不保证金额；转机页不判断TWOV资格。

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
