# Homeground 网站稳定与恢复手册

## 监测覆盖

| 检查 | 执行位置 / 周期 | 故障通知与边界 |
| --- | --- | --- |
| 首页、中韩首页、私家团、预约服务、预约清单、张家界产品 | Better Stack 免费监测，每 3 分钟；欧洲、北美、亚洲、澳洲 | HTTPS、HTTP 和正文关键词；邮箱通知。免费方案不包含电话/SMS，手机是否提醒取决于邮箱客户端设置。 |
| Cloudflare 边缘与 GitHub Pages 源站证书 | `site-stability.yml`，每 12 小时 | 对两个主机名和四个源站地址验证证书链、域名、有效期；30 / 14 / 7 天分别告警。检查超过 24 小时没有回报也告警。 |
| 询盘接收合约、邮件通知队列 | 原有 canary / outbox 工作流 + `stability-workflow-alerts.yml` | 失败由独立监测通知；超过 105 分钟未回报告警。GitHub 定时任务可能延迟，因此此类告警也可能表示检查迟到，不能直接认定网站故障。 |
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

## 每日备份的实际范围

`pg_dump` 对 public、homeground_private、auth、storage、extensions 五个 schema 做一致的只读快照，显式包含询盘需要的 pgcrypto 扩展定义；直接流入 age 公钥加密。工作目录中不产生明文数据库档案。TLS 验证失败、命令失败、超时、超过大小上限或上传失败均报失败。

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

备用选择为 Cloudflare Pages 静态站：完整导出目前 6676 个文件、约 670 MiB，无单文件超过 25 MiB，符合 Wrangler 20,000 文件 / 25 MiB 单文件限制；浏览器拖放只有 1000 文件，不能上传完整站点。

完成备用环境必须取得 Pages 部署权限并发布实际导出。仅准备目录或创建项目不算可用备用站。备用 URL 应设置 noindex、保留正式 canonical，并验证语言路径、图片、脚本、404 与询价入口；未经另行核对不要改变正式域名或 DNS。Cloudflare Pages Free 没有付费 SLA，仍需要独立监测和恢复流程。

正式切换前记录五条原 DNS，准备可逆回退方案，核对 HTTPS、URL/重定向、CORS 与询盘配置。任何付费升级先给业主具体价格和限制，取得同意再执行。

参考：[Cloudflare Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)、[Pages limits](https://developers.cloudflare.com/pages/platform/limits/)、[Supabase backups](https://supabase.com/docs/guides/platform/backups)、[PostgreSQL pg_dump](https://www.postgresql.org/docs/17/app-pgdump.html)、[GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)。
