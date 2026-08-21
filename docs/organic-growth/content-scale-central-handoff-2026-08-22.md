# Homeground 60篇内容中央整合指令 — 2026-08-22

状态：`COMBINED SIMULATION PASSED — CENTRAL SHARED PATCH AND RELEASE REVIEW REQUIRED — NOT PUBLISHED`

你是 Homeground 中央整合员，不是新文章作者。本批只整合已完成的60个三语 durable drafts、中央共享登记和发布门；不得新增第61题、Route Reality、销售页或公开工具。

## 基线与来源

开始时 fetch 全部远端，并从**届时最新 `origin/main`**创建全新干净 worktree和分支，建议：`codex/central-content-scale-60-20260822`。不得在main、旧分支或脏目录直接工作。

先核对以下精确远端tip存在、worktree clean、共同历史可解释，再整合：

1. `article/worker-1-transport-scale-20260822@1a841869ffaa5c2babf94e82ae8517c90e6cd795`
2. `article/worker-2-destination-scale-20260822@5fc1afea67664d58a79196a263cb6c4248725439`
3. `article/worker-3-culture-scale-20260822@0607a0e976edfd2fc7c2c200ea4a404afc751246`
4. `article/worker-4-planning-scale-20260822@c76d9b34d9b0ea8e270afdfbc6b7473a10eece5c`
5. `article/worker-5-stay-scale-20260822@a027899dabfd76ba76c1ba30c574834985c717c1`
6. `article/worker-6-essentials-scale-20260822@1d40d650ac6b252a57d35a89f2f39b5f3a327c27`

另从员工7最新 `ops/seo-content-scale-20260822` 整合 Search Map 情报文件；只取该分支相对main的 `docs/organic-growth/` 范围，不带其他工作区内容。

六个内容分支合计必须恰好60个唯一content ID、60个唯一slug、180个locale path；三语只算一个身份。来源分支互相不应覆盖同一内容路径。

员工7已在临时组合环境完成只读式整合模拟：六分支路径交集为0；486项测试为485通过、0失败、1项Windows平台jq跳过；production build生成895个静态页面，导出885个HTML，sitemap为844个唯一URL且0重复；60个身份/180个locale URL全部进入本地sitemap，TypeScript、字体、站内链接、搜索导出、production audit和diff check均通过。该结果证明内容可整合，不代表已经发布；中央仍须在最新main重做下列共享修复与发布日复核。

## 中央必须完成的共享修复

### 1. Reviewed collection

在 `lib/searchCollectionI18n.ts` 增加以下26条显式reviewed override。员工1–3最终metadata已经直接使用正确collection，不要再加多余override。

```ts
// Employee 4
"chengdu-jiuzhaigou-huanglong-route-order": "plan-trip-length-city-order",
"guilin-yangshuo-longji-route-order": "plan-trip-length-city-order",
"mainland-china-hong-kong-macao-route-order": "plan-trip-length-city-order",
"north-or-south-china-first-trip": "plan-trip-length-city-order",
"xiamen-quanzhou-fujian-tulou-route-order": "plan-trip-length-city-order",
"first-solo-trip-china-recoverable-route": "plan-traveller-theme-itineraries",
"china-archaeology-ancient-capitals-route": "plan-traveller-theme-itineraries",
"china-buddhist-heritage-route": "plan-traveller-theme-itineraries",
"chinese-gardens-water-towns-complementary-stops": "plan-traveller-theme-itineraries",
"remote-china-attraction-group-tour-private-car-or-diy": "plan-budget-pace-decisions",

// Employee 5
"chengdu-where-to-stay-chunxi-wenshu-kuanzhai": "stay-city-areas",
"guangzhou-where-to-stay-beijing-road-liwan-tianhe": "stay-city-areas",
"hangzhou-where-to-stay-hubin-wulin-east-station": "stay-city-areas",
"dali-where-to-stay-old-town-xiaguan-erhai-village": "stay-city-areas",
"suzhou-where-to-stay-old-city-shantang-jinji-lake": "stay-city-areas",
"sanya-where-to-stay-four-bays": "stay-city-areas",
"pingyao-stay-inside-or-outside-old-city": "stay-city-areas",
"fujian-tulou-stay-inside-or-nearby-hotel": "stay-hotel-types-scenic-bases",
"china-hotel-room-does-not-match-booking": "stay-access-foreign-guests",
"china-hotel-left-item-recovery": "stay-access-foreign-guests",

// Employee 6: four payments/connectivity pages resolve directly from metadata
"china-airport-layover-immigration-bags-airside-overnight": "essentials-entry-transit",
"china-tourist-tax-refund-workflow": "essentials-entry-transit",
"china-passport-as-ticket-booking-to-gate": "essentials-booking-registration-recovery",
"china-attraction-sold-out-recovery": "essentials-booking-registration-recovery",
"china-public-toilets-first-time-guide": "essentials-entry-transit",
"china-airport-checked-bag-missing-damaged": "essentials-booking-registration-recovery",
```

### 2. CTA只做中性治理登记

更新内部 CTA ownership registry、Markdown镜像和fail-closed测试：

- 员工1十篇：`ownerClass: high-intent-transport`、`intentCode: route_shape`、`targetServiceId: null`、`authorizationStatus: blocked-pending-central-authorization`、`ctaPlacement: specialized-cta-blocked-generic-footer-only`。
- 员工4十篇：`ownerClass: plan`、`intentCode: route_shape`、`targetServiceId: null`、`authorizationStatus: authorized-generic-conversation`、`ctaPlacement: existing-guide-footer`。
- 员工5十篇：`ownerClass: stay`、`intentCode: hotel_fit`、`targetServiceId: null`、`authorizationStatus: blocked-pending-central-authorization`、`ctaPlacement: specialized-cta-blocked-generic-footer-only`。

最终账本必须为 stay 28、high-intent transport 34、plan 26、purchase-ticket 2、uniqueContentIds 90；existing-service mapped仍15、generic conversation 11、blocked/null 64。新增付费service mapping必须是 **0**，不得把任何新页接到US$69/US$129或其他强销售入口。

### 3. Freshness、entity与内容网络

- 在 `guideFreshnessMinimums` 显式把员工2十篇全部设为high；另把 `chengdu-jiuzhaigou-huanglong-route-order`、`mainland-china-hong-kong-macao-route-order`、`sanya-where-to-stay-four-bays`、`fujian-tulou-stay-inside-or-nearby-hotel`、`china-hotel-left-item-recovery` 设为high。员工6入境类继续critical/on-source-change。
- 在 `lib/searchPlatformGuidePolicy.ts` 的 `destinationEntityIds` 接通六个已存在的实体：`shaanxi→province-shaanxi`、`sichuan→province-sichuan`、`guangdong→province-guangdong`、`hunan→province-hunan`、`zhejiang→province-zhejiang`、`guangxi→province-guangxi`。不得新造entity或用`country-china`回退伪装完成。
- 将 `pingyao-stay-inside-or-outside-old-city` 加入 `how-to-read-heritage-sites-in-china/seo-brief.md` 的真实inbound owner账本，并同步对应测试。
- 实体严格覆盖仍有后续债务；本PR只如实输出审计数字，不得删除地点token求绿。

### 4. 共享计数、字体与生成物

- 组合目标：221 independent generated guides + 19 protected legacy = 240 guide identities；714 guide locale URLs。
- 再计8个城市Hub与1个entry collection：249个编辑型详情身份 / 739个详情URL。
- 若60题全部进入indexable export，sitemap必须恰好844个唯一URL；不能通过删旧URL或静默noindex凑数。
- 更新所有真实依赖guide/freshness/CTA总数的测试；不要放宽成不校验。
- 依 `public/fonts/README.md` 重建共享字体，覆盖组合实际新增的中文字形和韩文字形；预检口径为中文52、韩文16，最终以最新组合扫描为准。不得删专名、改拼音或提交临时字体绕过。
- 统一运行生成器并提交仓库惯例要求的受跟踪manifest；不得手改生成文件。

## 发布日事实与日期

60篇都仍是 `not-published`。员工3的 `2026-08-20` 三项metadata日期已明确标为draft placeholder；其余 `2026-08-22` 也不能自动充当发布证据。

在Draft PR转Ready或合并前：

1. 逐篇执行 `dynamic-facts.md` / `PUBLICATION GATE`；官方来源打不开或关键事实无法确认即HOLD该身份。
2. 对入境、TWOV、退税、机场/车站、景区票务/开放/园内交通、App行为、住宿接待与快递/行李规则做发布日复核。
3. `datePublished`/`dateModified` 使用真实准备发布日；`sourceReviewedDate` 只有确实重开并核完来源后才推进。
4. 将60张真实图片写入中央photo provenance，保留作者、许可、原URL、地点、处理及原/成品SHA；不得使用AI纪实图或把别处冒充文章地点。

## 必跑门禁

串行运行仓库标准的 guide/content generate与check、TypeScript、完整inquiry tests、production build、indexable/search-platform/collection/ten-day导出、字体覆盖、guide entity审计、`npm audit --omit=dev`、完整audit说明、`git diff --check`。不得声称未运行的检查通过。

用真实浏览器验收60篇×三语共180个页面，桌面与390px手机都检查：HTTP 200、EN/中文/한국어入口、self canonical、hreflang、图片加载、来源默认折叠、locale内链不跳回英文、标题字体、表格局部滚动和页面级无横向溢出。确认所有站内href/src均指向真实导出目标。

## Git与停止条件

- 不修改主页；不重启Route Reality；不新增第61题；不创建新的付费服务；不删旧页面通过门禁。
- 修复完成后提交并推送中央分支，创建 **Draft PR**，标题建议：`Integrate 60 China travel decision guides`。
- 等全部CI结束并如实汇报；不要转Ready、不要合并、不要部署。
- 最终报告六池各10篇、中央修复、日期/动态HOLD、图片、所有门禁、预期/实际身份与sitemap数、分支、commit、Draft PR链接和仍需中央决定的身份。

最终状态：`60-GUIDE CENTRAL INTEGRATION REVIEW READY — MERGE/PUBLISH REQUIRES CENTRAL DECISION`
