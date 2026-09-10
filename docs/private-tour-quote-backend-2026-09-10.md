# 产品原页询价：后端交付记录

2026-09-10。本地实现已完成；未提交、推送、部署或读取生产凭据。

## 请求与保存

新增 `schemaVersion: 4`、`formVersion: "2026-09-10.1"`、`entryPath: "private_tour_quote"`。公开版本常量为 `privateTourQuoteSchemaVersion` 和 `currentPrivateTourQuoteFormVersion`。

请求包含 `locale`、email contact、按语言和产品校验的 `productInterest`、`travelDate`、`note`、旧的 `homepageEmailPrivacyNoticeVersion`、`attribution: { landingPath }`、`experiment: null`、`antiAbuse: { companyWebsite: "" }`。

- `travelDate` 必须是实际日历日期 `YYYY-MM-DD` 或 `null`，没有额外限制为未来日期。
- `note` 必须提供字符串或 `null`；规范化换行、NFC 和首尾空白后最多 1000 个 Unicode 字符，拒绝非法控制字符。空白内容规范化为 `null`。
- `productInterest.selection` 若存在，必须是该产品允许的 `packageId` 与数字 `2 | 4`；不丢弃已有选择，也不为经典张家界制造人数。
- `landingPath` 必须完全匹配该语言下的该产品 `/tours/{slug}/`，不接收查询参数、片段或 UTM 字段。
- `trafficSessionToken` 继续位于既有传输包层；浏览器同意管理继续由现有代码负责。该 token 不参与询价语义哈希，匿名归因待办不保存邮件地址、日期或备注。

新 RPC 为 `create_homeground_private_tour_quote_v1` 与 `create_homeground_private_tour_quote_with_traffic_v1`，均仅授予 `service_role` 执行权限。它们复用原有事务内的幂等锁、限流、公开编号和通知 outbox，不修改旧 RPC 签名。

私有 `homeground_private.inquiries.answers_json` 保存 `productInterest`、`travelDate`、`landingPath`；`note` 保存到既有真实 `note` 列。日期与备注进入现有 v3 通知领取结果，新的通知分支展示产品、服务人数、日期待定状态和经过 HTML 转义的备注，并说明它们是游客请求，尚非确认预订。

网站 `/admin` 保持匿名汇总边界，只增加 schema 4 的语言和联系方式兼容元组。日期和自由备注可在私有数据库记录与规划师通知中查看；没有新增网站端逐条客户详情或 PII API。

## 向后兼容与发布顺序

schema 1/2/3、旧首页无日期备注的严格形状、旧通知队列均保持兼容。新后台读取代码接受迁移前和迁移后的兼容元组。

1. 先发布兼容新版元组的前端 `adminClient`，保持产品询价开关关闭；同时部署 `admin-insights`、`admin-health` 与支持新通知形状的 `notify-inquiries`。旧数据库和旧任务仍可正常读取。
2. 执行增量迁移 `202609100001_homeground_private_tour_quote.sql`。需要现有 inquiries、后台指标注册表及匿名归因基础迁移已经存在。先发布兼容读取代码，可避免旧的严格前端 reader 在看到新增元组时拒绝整个后台响应。
3. 部署新 `v1-inquiries`，在 `ALLOWED_FORM_VERSIONS` 保留原有版本并追加 `2026-09-10.1`；隐私版本继续需要 `2026-07-26.1`，无新密钥。
4. 确认数据库、通知和 intake 就绪后，才启用主任务管理的产品询价 UI。对“保存状态未知”的失败只使用原幂等键重试，不另走旧 RPC。

若只撤下 UI/allowlist，应保留新版通知 worker 处理可能已入队的新询盘。不要把已有 schema 4 任务交回仅支持旧形状的 worker。

## 本地验证

14 个相关后端测试文件共 **186 项通过，0 失败、0 跳过**。包含新合同、实际 Edge/通知 handler、开发 mock、旧首页/路线/目的地合同、后台、归因及 RPC 兼容回归。

新增数据库集成测试实际启动独立、仅 Unix socket 的临时 PostgreSQL，加载历史基础迁移与未修改的新迁移，验证：

- 三语言产品与经典张家界的真实保存和领取通知。
- 非法日期、伪造产品、超长备注、跨语言路径拒绝。
- 四个同时到达的相同请求只生成一条询盘和一个通知任务。
- 更新失败时询盘、队列与限流一并回滚；重复提交不再次消耗限流。
- 匿名 session 尚未到达时询盘仍保留，归因仅存哈希，匿名后台可读。
- 旧首页 RPC/记录兼容，新 RPC 的角色权限受限。

数据库测试只省略历史迁移中的托管 cron 扩展与调度块；新迁移、实际询盘、通知队列和归因 SQL 原样执行。没有测试生产 cron 调度或真实 Resend 投递。临时数据库在测试结束后关闭并清理。

重点重跑命令：

```sh
node --experimental-strip-types --test supabase/tests/private-tour-quote.test.mjs supabase/tests/private-tour-quote-sql.test.mjs supabase/tests/mock-inquiry-api.test.mjs
```

完整后端回归日志在本机 `/tmp/homeground-quote-final-backend-tests.log`。第一次全项目 TypeScript 检查仅报主任务正在修改的 `ShanghaiJiangnanImagineInteractive.tsx` 类型错误；后端没有 TypeScript 报错，最终全项目检查由主任务汇总。

## 本子任务文件

- `lib/inquiryVersions.ts`
- `lib/inquiryContract.ts`
- `lib/adminClient.ts`
- `supabase/functions/v1-inquiries/index.ts`
- `supabase/functions/notify-inquiries/index.ts`
- `supabase/functions/_shared/admin-contracts.ts`
- `supabase/functions/admin-health/index.ts`
- `supabase/migrations/202609100001_homeground_private_tour_quote.sql`
- `tools/mock-inquiry-api.mjs`
- `supabase/tests/private-tour-quote.test.mjs`
- `supabase/tests/private-tour-quote-sql.test.mjs`
- `supabase/tests/mock-inquiry-api.test.mjs`
- `docs/private-tour-quote-backend-2026-09-10.md`
