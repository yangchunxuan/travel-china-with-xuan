# 联系卡第二步：留 WhatsApp 号码，我们先联系你（交给 Codex）

日期：2026-09-24。用户已同意做这一步。

第一步（本 PR）已经做了电脑端联系卡：左边 WhatsApp 二维码、复制号码、在这台电脑上用 WhatsApp；右边留邮箱，走现有的 `homepage_email` 通道。第二步要在右边加「邮箱 / WhatsApp」切换：客人留下 WhatsApp 号码，规划师用 +86 131 7421 5999 主动发消息。

后台现在不能直接收这个号码：`homepage_email` 这条路只接受邮箱。改动涉及合约、数据库函数、Edge Function、隐私说明和前台，要一次协调上线。

## 必须满足的「不丢客人」要求

- 先写进数据库，再发通知；通知失败沿用现有 outbox 的重试（1、5、30、120 分钟）。
- 同一次提交用同一个 `Idempotency-Key` 安全重试，不重复建线索；出错时客人填的号码原样留着。
- 成功后告诉客人会用哪个号码联系他，并请他先存下这个号码。
- 不用验证码：沿用隐藏栏位 `companyWebsite` 和现有频率限制。
- 号码不进 GA、Meta 和第一方统计参数，不出现在网址里。

## 后台

1. **版本**（`lib/inquiryVersions.ts`）：为快速联系新增一个表单版本和一个隐私说明版本，例如 `2026-10-xx.1`。上线期间旧的 `currentHomepageEmailFormVersion` 和 `homepageEmailPrivacyNoticeVersion` 继续接受，因为已经打开的页面还会按旧版本提交。
2. **合约**（`lib/inquiryContract.ts`，快速邮箱那段校验现在是 `hasOnlyKeys(contact, ["channel", "email"], ...)`）：只有在「新表单版本 + 新隐私版本 + `config.whatsappEnabled`」同时满足时，才接受 `{ channel: "whatsapp", phoneRaw }`。号码用现有的 `normalizePhone` 转成 E.164。邮箱分支不变，`attribution.landingPath` 规则不变。
3. **数据库**（新 migration）：新增一个 RPC，例如 `create_homeground_homepage_contact_v2` 和 `..._with_traffic_v2`，内部调用 `create_homeground_inquiry`。这个核心函数从 `202607200001_homeground_contact_intake.sql` 起就接收 `p_contact_channel` 和 `p_contact_phone_e164`。
   - 产品信息的写法照 `202608240001_homeground_private_tour_email_context.sql`。
   - 权限、`security definer`、`search_path` 照 `202607270002_homeground_homepage_email_rpc_fix.sql`。
   - 旧的 v1 RPC 保留到旧表单版本停用为止。
4. **Edge Function**（`supabase/functions/v1-inquiries/index.ts`，`homepageEmailInquirySchemaVersion` 分支）：WhatsApp 渠道走新 RPC。服务器变量 `WHATSAPP_ENABLED` 请确认已经是 `true`：公开变量 `NEXT_PUBLIC_HOMEGROUND_WHATSAPP_INTAKE_ENABLED` 自 2026-07-19 起是 `true`，按 `docs/inquiry-deployment.md` 服务器端应该已开，但要实际查。
5. **通知**（`supabase/functions/notify-inquiries/index.ts`）：已经支持 WhatsApp 线索，会给员工一个 wa.me 链接，只需确认新类型也能正常显示。
6. **隐私说明**（`lib/homegroundPrivacyI18n.ts`，三种语言）：现在有几句写着快速邮箱「只收邮箱地址」，主页 WhatsApp 链接「不会保存号码」。
   - 英文例如 “The homepage quick-email option accepts only an email address.”，以及 WhatsApp and Messenger 那一段。
   - 改成：主页和电脑端联系卡的快速联系，可以保存一个邮箱或一个 WhatsApp 号码，用于回复这次咨询。
   - 已有的限制和说明一句都不能删，版本号跟上第 1 条。
7. **测试**：`inquiry-contract`、`homepage-email-backend`、`inquiry-rpc-compatibility`、`mock-inquiry-api`（`tools/mock-inquiry-api.mjs` 也要能返回 WhatsApp 成功）、`inquiry-intake-canary`、`contact-card-static`。

## 前台（`components/ContactCardDialog.tsx`）

- 新增公开开关，例如 `NEXT_PUBLIC_HOMEGROUND_QUICK_WHATSAPP_ENABLED`，默认 `false`。开关打开时，右栏标题下出现「邮箱 / WhatsApp」切换。样式照卡片现有规范：#f2f1ef 底、14px/500、44px 高、滑块过渡，并在 `prefers-reduced-motion: no-preference` 里才动。
- WhatsApp 这一栏是一行两个输入：
  - 左边是国家区号下拉，按访客时区预选。例如 `Asia/Singapore` 选 +65，`Asia/Kuala_Lumpur` 选 +60，`Asia/Seoul` 选 +82；没有匹配时按语言选（ko 选 +82）。列表：SG、MY、KR、CN、HK、TW、US/CA、GB、AU、ID、TH、PH、OM、AE、SA、DE、FR。
  - 右边是号码框，允许空格和横线，6 到 13 位数字。
- 提交沿用卡片现有的邮箱逻辑：快照 + 幂等键、超时 20 秒、失败和不确定两种状态、`contact_variant: "desktop_card"`。`reply_channel` 设为 `"whatsapp"`。
- 新增中文、韩文字要跑 `npm run check:font-coverage`；韩文不用「출경」「검문소」。

### 文案（来自用户看过的样稿，三语）

| 用途 | en | zh | ko |
|---|---|---|---|
| 切换 | WhatsApp / Email | WhatsApp / 邮箱 | WhatsApp / 이메일 |
| 号码框提示 | Your WhatsApp number | 你的 WhatsApp 号码 | WhatsApp 번호 |
| 区号标签（读屏） | Country code | 国家区号 | 국가 번호 |
| 框下说明 | We’ll message you from +86 131 7421 5999. | 我们会用 +86 131 7421 5999 给你发消息。 | +86 131 7421 5999 번호로 메시지를 보내드립니다. |
| 没填 | Enter your WhatsApp number. | 请填写你的 WhatsApp 号码。 | WhatsApp 번호를 입력해 주세요. |
| 太短 | That number looks too short. Check it, e.g. 9123 4567. | 号码好像太短了，请检查一下，例如 9123 4567。 | 번호가 너무 짧은 것 같습니다. 예: 10 1234 5678 형식으로 확인해 주세요. |
| 成功标题 | Got it. We’ll message you on WhatsApp. | 收到了，我们会通过 WhatsApp 联系你。 | 접수되었습니다. WhatsApp으로 연락드릴게요. |
| 成功说明 | It will come from +86 131 7421 5999. Save the number so our message doesn’t get lost. | 消息会从 +86 131 7421 5999 发出，请先存下这个号码，免得错过。 | +86 131 7421 5999 번호로 메시지를 보내드립니다. 놓치지 않도록 번호를 저장해 두세요. |

## 上线顺序

1. 合并代码，此时前台开关还是关着的。
2. 跑新 migration，部署 `v1-inquiries`，确认 `WHATSAPP_ENABLED`。
3. 带新版本号的隐私页随站点一起上线。
4. 打开 `NEXT_PUBLIC_HOMEGROUND_QUICK_WHATSAPP_ENABLED` 并重新部署。
5. 各提交一条测试线索（邮箱一条、WhatsApp 一条），按 `supabase/maintenance` 里的方法标成测试数据。确认 Gmail 收到通知，canary 正常。

## 另一项（可选，独立做）：每天一封汇总邮件

每天北京时间早上，给 hello@homegroundchina.com 发一封汇总：过去 24 小时的新线索（编号、渠道、语言、线路、首次回复截止时间），以及通知发送失败的线索。

注意：数据库不知道规划师有没有回复，回复发生在 Gmail、WhatsApp 和 SaleSmartly 里。所以汇总没法自动列出「还没联系的」；要这一项，需要在管理后台加一个「已联系」标记。定时方式可以参照 `202607180002_homeground_notification_schedule.sql` 里用 `cron.schedule` 的写法。
