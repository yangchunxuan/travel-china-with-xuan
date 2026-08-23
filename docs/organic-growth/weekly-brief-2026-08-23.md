# Homeground SEO 与生产状态简报 — 2026-08-23

状态：`PRODUCTION LIVE — SEARCH MAP AND RELEASE STATE SYNCHRONIZED`

## 当前唯一 production / live 基线

- 已审计公开运行时基线：PR #96 release SHA `0031b17b7f2ecbf4d4a192a2d8422cc6dff538df`；后续仅文档提交不会改变本行的运行时库存口径。
- 生产部署：PR #96 已合并，GitHub Pages run 32619692635 成功并完成公网读回。
- 内容库存：183 个 guide identity、541 个 guide locale URL；新增的第 183 个身份来自已发布 PR #91 的英文十城地图，PR #96 新增身份为 0。
- 目的地 Hub：8 个 identity、24 个 locale URL。
- 编辑型详情（含 8 个城市 Hub 和 1 个英文 entry collection）：192 个 identity、566 个 URL。
- Live sitemap：671 个唯一 URL、0 重复。
- Search Console 的最近已记录证据仍是：首页已收录、670-URL sitemap 已提交、英文首页一次重新索引请求已接受；PR #91、#93 或 #96 的部署不得被误写成新的 Search Console 提交。

671 是当前 sitemap 发现人口，不是 Google 已收录页数。Search Console 显示旧 649 或 670 时属于不同时间的处理快照，不得计算 `indexed / 671`，也不得重复请求英文首页索引。

最新发布证据见 [`docs/release-notes/authority-map-and-hub-links-production-release-20260823.md`](../release-notes/authority-map-and-hub-links-production-release-20260823.md)；统计、隐私与 Search Console 证据边界仍见 [`docs/release-notes/search-analytics-privacy-production-release-20260823.md`](../release-notes/search-analytics-privacy-production-release-20260823.md)。

## 已完成的状态回填

- PR #74 的 Zhangjiajie Hub、Online Arrival Card、Forest Park workflow、Chongqing station selector 和 Hangzhou Hub 已从 `draft-submitted / not-published` 改为 `release-completed / published`。
- Chongqing Hub（PR #80）、4 个三语指南（PR #83）、Great Wall selector（PR #86）和 domestic-flight disruption guide（PR #87）已纳入完整 Search Map 库存。
- PR #89 新增 canonical identity 为 0；它只修复品牌搜索信号、sitemap 生命周期、统计隐私与流量治理。
- PR #91 新增 1 个英文十城地图 identity；PR #93 只增加首页到 8 个既有城市 Hub 的发现链接；PR #96 只补 Hub 反链、地图分发位与完整下载/许可包，新增 canonical identity 为 0。
- 8 个曾停留在“准备发布”措辞的已上线 owner 已补回真实 PR / merge / HTTP 200 证据；Forbidden City 与春节 owner 的 PR #86 更新也已登记。

## 已完成但尚未发布的 60 稿

- Draft PR [#84](https://github.com/yangchunxuan/travel-china-with-xuan/pull/84) 保存员工 1–6 各 10 篇，共 **60 个 durable draft identity、180 个 locale path**。
- 60 个 slug 全部是防撞预留，不得重新分配，也不得增加第 61 题；它们不计入 183 个线上 guide identity。
- PR #84 仍为 `OPEN / Draft / not-published`，且相对当前 `main` 为 conflicting；旧 CI 绿灯只对应旧基线，不能直接合并。
- 员工 3 的 10 篇仍为 `HOLD — CENTRAL PUBLICATION REVIEW REQUIRED`，三个 2026-08-20 日期均是 draft placeholder，必须逐篇重开来源并换成真实发布日。
- 旧组合模拟的 844 sitemap 只属于 2026-08-22 旧基线；解决冲突后必须重算，不能当当前目标。

## 继续保持关闭

- Route Reality：PR #75 已合并内部规格，v4 技术审查通过；随后公开产品被中央否决。继续保持 `internal-only / not-published`，没有公开页、API、计算器、索引或继续开发授权。
- First 24 Hours collection：已有三语 durable internal draft，`pending-review / draft-submitted / not-published`；Arrival Card 上线不会自动授权 route、Registry 或 sitemap。
- 第一方 traffic collector：公开 endpoint 缺失，生产未启用。
- `admin-traffic`：生产未启用，必须同时通过 Admin master gate 和独立 traffic gate。
- 韩国办公内部流量规则：GA4 `Testing`，不是 Active。

## 所有员工开工前必须读取

1. [`search-map.json`](./search-map.json) — 机器权威库存和状态。
2. [`do-not-repeat.md`](./do-not-repeat.md) — canonical owner 与禁止拆页清单。
3. [`docs/README.md`](../README.md) — 当前品牌、发布、流量和内部产品入口。

不得从旧 weekly brief、旧 649 sitemap 快照、已合并分支名称或源代码中的 migration/function 推断当前生产状态。
