# Homeground 网站稳定与恢复手册

## 监测覆盖

| 检查 | 执行位置 / 周期 | 故障通知与边界 |
| --- | --- | --- |
| 首页、中韩首页、私家团、预约服务、预约清单、张家界产品、备用站 | Better Stack 免费监测，每 3 分钟；欧洲、北美、亚洲、澳洲 | HTTPS、HTTP 和正文关键词；邮箱通知。免费方案不包含电话/SMS，手机是否提醒取决于邮箱客户端设置。 |
| Cloudflare 边缘与 GitHub Pages 源站证书 | `site-stability.yml`，每 12 小时 | 对两个主机名和四个源站地址验证证书链、域名、有效期；30 / 14 / 7 天分别告警。检查超过 24 小时没有回报也告警。 |
| 询盘接收合约 | Cloudflare Cron Worker `homeground-intake-monitor`，每 15 分钟；原 GitHub canary 保留备用诊断 | 六项检查全部通过才报告成功；明确失败立即告警。Better Stack 预期 15 分钟、宽限 15 分钟，连续 30 分钟无回报告警。只有 Worker 可向此心跳上报，GitHub 不再重置其时钟。配置与实际定时记录都验收后才算完成切换。 |
| 邮件通知队列 | 原 outbox 工作流 + `stability-workflow-alerts.yml` | 失败由独立监测通知；超过 105 分钟未回报告警。此项仍依赖 GitHub 调度，迟到不能直接认定网站故障。 |
| 每次发布 | `deploy.yml` | 发布后清缓存，再核对真实线上提交标识、六个关键页面、canonical 和 JavaScript。失败告警。部署是事件检查，没有部署时不要求频繁心跳。 |
| 隔离询盘与备份恢复 | `inquiry-recovery-drill.yml`，每周 | 临时数据库、无外发网络接收器；真实 Edge handler/RPC/SQL 入库、后台读取、通知队列、重试与恢复。八天无完成记录告警。 |
| 加密数据库备份 | `inquiry-backup.yml`，每日 | 需要业主批准并填写数据库连接 Secret；成功上传档案后才报告成功。36 小时没有成功备份告警。未配置连接不能视为已启用。 |

这些措施降低发现与恢复故障的时间，并不能保证永不故障。源站证书仍由 GitHub Pages 签发及续期，预警必须有人处理。

## 当前基础设施与配置备份

2026-10-09 核对：Cloudflare 为 Full (strict)，主域名四条 A 与 www CNAME 均代理，GitHub Pages 强制 HTTPS。主域名源站为 `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`；www 指向 `yangchunxuan.github.io`。

代码、图片、仓库配置保存在 Git 历史中，并已独立归档到本机的 `~/.homeground-stability/source-ac4533a7.tar.gz`；已在临时目录恢复全部 3692 个跟踪条目。云平台控制台设置、账号凭证和生产数据库不在这份源码归档中。控制台配置的导出另外保存在私有本地目录。

Supabase 免费计划没有自动平台备份；本手册的每日备份是单独实现的加密导出。2026-10-09 Storage 控制台无 bucket；若以后添加 Storage 文件，必须补做文件对象备份，数据库的 storage 表只包含元数据。

## Secret 与解密钥匙

- GitHub Secret `SUPABASE_BACKUP_DB_URL`：仅在业主明确同意后填写；使用核对过的项目 direct 或 session pooler 5432 连接，要求 verify-full TLS。不要用 transaction pooler 6543。
- GitHub variable `BACKUP_AGE_RECIPIENT`：公开加密收件者，可以上传。
- 本机 `~/.homeground-stability/keys/backup-age.key`：私钥，目录 700、文件 600。不得提交到仓库、日志、聊天或上传 GitHub；离线另存一份后才能承担本机损坏时的恢复。
- `*_HEARTBEAT_URL`：仅用于向独立监测报告状态，保存在 GitHub Secrets。发送内容只有成功或失败，没有客户数据。
- 询盘主检查的 `INTAKE_HEARTBEAT_URL` 单独保存在 Cloudflare Worker 的 Secret 绑定中；不得写入源代码、明文配置、日志或公开接口。原 GitHub `INQUIRY_INTAKE_HEARTBEAT_URL` 不再被工作流读取；不能恢复两处同时上报。

## 独立询盘定时检查

实现及可复现配置：`ops/inquiry-canary/worker.mjs`、`ops/inquiry-canary/wrangler.jsonc`。Cron 为 UTC 每小时第 7、22、37、52 分钟。Cloudflare 免费档有 CPU 和请求限额；不得通过升级付费方案绕过失败，必须先报告实际用量和具体价格。

构建完成后，生成器检查正式首页实际引用的同源 JavaScript，并从最终产物验证表单版本、隐私版本与固定 Supabase 接口，再生成小型公开的 `inquiry-contract.json`。Worker 每轮只下载首页和这份清单，要求脚本集合完全相等，再按顺序检查两类表单 × 中英韩；不再每轮下载所有脚本。清单缺失、格式不支持、版本或脚本集合不符均失败关闭。正常运行共 9 次请求，保留单次请求、响应大小和总下载量上限。原 GitHub 备用诊断继续扫描脚本。请求始终不包含 contact、antiAbuse、journey 或真实邮箱；响应必须为 422、validation_failed、not_persisted，并准确指出缺少的必要字段。遇到首个不符合条件的响应即停止。该检查证明接口合约可用，不能证明真实询盘入库、邮件收件或客户成交；原隔离演练和通知队列检查继续保留。

Worker 不绑定正式域名、不修改 DNS，关闭 workers.dev 和预览 URL；即使误开 HTTP 入口也只返回 404，不能从外部触发探针。定时日志仅保留固定错误代号、时间和检查计数，不记录上报地址、请求体或响应内容。首页、清单、接口和心跳均不跟随重定向，下载有大小和请求数上限。

切换顺序：先通过离线夹具与独立代码复核，发布 Worker 代码但暂不启用 Cron；移除 GitHub 对询盘主心跳的上报，再绑定 Worker Secret、启用 Cron、将原心跳改名并设置 15 + 15 分钟。至少核对实际 Scheduled 事件及 Better Stack 收报时间，并确认新版首轮和后续轮次的 CPU 有余量低于免费档每次 10ms；`outcome=ok` 可能仅是平台偶发超额容忍，不代表符合额度。不能将本机模拟、手动执行或配置已保存称为定时运行成功。Cron 变更可能需要最多 15 分钟传播。

首页和清单均使用要求重新验证缓存的请求头；脚本集合比较可以发现混合版本，但不能证明两个同时缓存的旧文件就是最新发布。是否最新仍由原有发布标记验收负责。此监控也不逐项检查全部静态资源的可下载性；相关完整检查保留在构建和 GitHub 诊断中。

如果主检查停止：先查 Worker Scheduled 事件的状态、CPU 用量和固定错误代号，再对照 Better Stack 最近心跳。GitHub 手动 canary 可以提供诊断证据，但不能清除 Worker 漏跑事件。需要回退时恢复旧 GitHub 上报前，先停用 Worker 定时上报，并按旧流程重新核对告警阈值；始终保持同一个主心跳只有一个报告来源。

## 每日备份的实际范围

`pg_dump` 对 public、homeground_private、auth、storage、extensions 五个 schema 做一致的只读快照，显式包含询盘需要的 pgcrypto 扩展定义；直接流入 age 公钥加密。工作目录中不产生明文数据库档案。TLS 验证失败、命令失败、超时、超过大小上限或上传失败均报失败。

Session pooler 的证书链使用 Supabase Root 2021 CA。仓库中的 `tools/certificates/supabase-root-2021.crt` 是从已登录 Supabase Database Settings 的 Download certificate 获取并核对指纹的公开根证书，[官方公开下载地址](https://supabase-downloads.s3-ap-southeast-1.amazonaws.com/prod/ssl/prod-ca-2021.crt)与该证书一致，不含私钥。备份工作流先检查 DER SHA-256 指纹、CA 属性和有效期，再将单个 `.crt` 安装到该次 Ubuntu runner 的系统信任；继续使用 `PGSSLMODE=verify-full` 和 `PGSSLROOTCERT=system`，同时验证证书链及真实主机名。安装或检查失败会阻止导出并报告失败。

该 CA 有效至 2031-04-26；Supabase 轮换 CA 或证书检查接近到期时，按[官方 SSL 文档](https://supabase.com/docs/guides/platform/ssl-enforcement)重新取得公开证书、核对来源并更新固定指纹，不改为 `require`、`verify-ca` 或关闭验证。

档案与不含凭证的 manifest 保留 30 天。manifest 记录范围、时间、文件大小与 SHA-256。它不包含全局角色、Supabase 平台完整配置、Storage 对象文件、pg_cron/pg_net 扩展定义；恢复目标需要相应的平台角色及扩展。不能把该档案称为整个 Supabase 平台的自包含备份。

备份档案涉及客户数据，即使已加密，也应按账户权限保护。GitHub 只使用标准 Ubuntu runner；不启用付费 runner 或提高付费配额。新增 artifact 存储的额度需要在账户账单页面核对，不能仅凭公开仓库就断言存储无限免费。额度不足时停止并向业主报告。

## 接到告警后

1. 先看告警名称：网站打不开、证书问题、询盘检查失败、任务迟到、备份失败是不同的问题。
2. 用独立网络打开首页和相关页面；保存时间、HTTP 状态、证书与检查报告。
3. 如果是 526，分别验证 Cloudflare 边缘和源站证书。核对有效期、两个域名、证书链、代理 DNS 与 GitHub Pages 签发状态。
4. 保持 Full (strict)。如需再次临时降低证书验证或改 DNS，向业主说明具体风险并取得明确授权；修复后恢复原设置并重新验证。
5. 如果是询盘故障，先看接收 API 和 outbox 健康报告；不在生产提交假客户询盘，不发送客户邮件来试运行。
6. 如果工作流没有回报，查任务是否开始、延迟、失败或通知投递失败。独立心跳用于发现“检查本身没运行”。

## 发布与回退

每次正式部署会写入 `/release.json`。验收需要未命中旧缓存的提交标识与本次 run/attempt 一致；六个关键页面和脚本必须返回正确内容。部署成功还会保留 `verified-release-<完整 SHA>` 验收记录 90 天。

回退时，从曾经成功的 Deploy to GitHub Pages run 找到未过期的 verified-release 记录，在 main 上手动运行相同工作流，将 `deploy_ref` 填为完整 40 位提交 SHA。系统只接受 main 祖先且有成功验收记录的提交；重建后重新验收。main 在构建期间前进时拒绝覆盖新版本。

回退经过完整构建，耗时取决于 GitHub 排队和构建速度，不承诺秒级恢复。此操作不回退数据库、DNS 或客户数据，也不自动递归回退。第一份成功验收记录生成以前，历史版本没有这条快捷恢复路径。

## 隔离恢复演练

每周演练使用 disposable PostgreSQL、临时 TLS CA 和一次性 age 钥匙，运行真实 `pg_dump → age → 解密 → pg_restore`。比较全部 26 个 private 表的数据哈希、函数定义、函数/ schema 权限、forced RLS 与后台 RPC；验证错误 CA、域名和损坏档案会失败。

恢复只针对新建的隔离目标数据库。保留其 PostgreSQL 标准 public schema 和默认权限，从 `pg_restore --list` 的 TOC 中仅排除重复的 `CREATE SCHEMA public` 条目；其他权限与注释照常恢复。不要删除生产 public，不要直接向有业务数据的库恢复，不要扩大 PUBLIC 权限来掩盖恢复错误。相关可执行示例见 `supabase/tests/backup-recovery-integration.test.mjs`。

邮件提供商在演练中为测试接收器：能够验证通知任务、请求格式、接受记录和幂等重试，不能证明真实客户收到或阅读邮件。独立告警邮件另用明确标记的 TEST 心跳实测收件及恢复。

## 备用托管验收与费用

2026-10-09 已发布 [Cloudflare Pages 免费备用站](https://homeground-standby.pages.dev/)，代码快照为 `011f87aab89511a1824314432bc17ee52ad986cd`。在本机按该版本和正式部署工作流的 33 项公开配置重新构建，所有 postbuild 导出检查通过。导出包含 6678 个文件、约 671 MiB（6677 个上传资产及 `_headers` 规则），无单文件超过 25 MiB，符合 Wrangler 20,000 文件 / 25 MiB 单文件限制。

备用站已实测 18 个中英韩页面、23 个图片/脚本/样式/字体资源、404、robots 和版本记录，共 44 项通过。资源内容与导出哈希一致；响应带 noindex、robots 禁止抓取、canonical 保留正式网址。正式域名和 DNS 没有改变。

备用域名不在生产询盘与统计的 Origin 允许清单中。该域名的安全不完整询盘探测返回 `403 origin_not_allowed/not_persisted`，正式 Origin 返回 `422 validation_failed/not_persisted`；没有创建客户询盘或发送邮件。正式域名切换时 Origin 保持不变，但仍须重新验证表单与后台接收；若需让备用域名直接接收客户询盘，必须另行明确授权允许该 Origin。

这是经过验收的静态快照，目前不自动同步后续发布，也不自动切换 DNS。部署钥匙仅有 Pages Write 权限，在本机私有目录保管，七天到期；到期不影响已有备用站浏览，但后续上传需重新取得部署权限。正式发布后应更新备用快照并核对版本。Cloudflare Pages Free 没有付费 SLA，仍需要独立监测和恢复流程。

正式切换前记录五条原 DNS，准备可逆回退方案，核对 HTTPS、URL/重定向、CORS 与询盘配置，并将源站证书检查的目标调整为实际托管源站。GitHub Actions 已核对账户预算为 0 美元、Stop usage 为 Yes；不提高额度或启用付费服务。任何付费升级先给业主具体价格和限制，取得同意再执行。

参考：[Cloudflare Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)、[Pages limits](https://developers.cloudflare.com/pages/platform/limits/)、[Supabase backups](https://supabase.com/docs/guides/platform/backups)、[PostgreSQL pg_dump](https://www.postgresql.org/docs/17/app-pgdump.html)、[GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)。
