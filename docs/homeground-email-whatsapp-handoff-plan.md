# Homeground Email + WhatsApp 人工接力实施计划

- 版本：2026-07-19
- 状态：方案已确认，等待实施
- 适用市场：英文长线游客为主，同时支持中文、韩文
- 与旧规格的关系：保留 `homeground-v1-inquiry-handoff-spec.md` 作为研究记录；本计划替代其中“客户填写自己的 WhatsApp 号码、等待工作室主动联系”的前端方案。

## 1. 这次只解决什么

建立一条简单、真实、不会漏掉上下文的客户路径：

```text
主流程：
广告 / 内容
  → Homeground 四问
  → 初步路线
  → 选择一种人工沟通方式
      ├─ Email：网站保存咨询 → Gmail → 人工回复
      └─ WhatsApp：客户打开预填消息 → 点击发送 → WhatsApp Business 人工回复

备用快速通道：
Facebook Page WhatsApp button → 直接聊天
```

网站是理解需求和建立信任的中枢；Email 与 WhatsApp 是人工接手的两种方式，不是两个互相竞争的网站功能。

这次不增加：

- AI 聊天、Codex SDK 或聊天机器人；
- CRM、客服后台、自动分配或复杂状态系统；
- 价格计算、付款、合同、自动报价或 PDF；
- 城市多选题、路线规则修改或新增城市；
- 首页悬浮 WhatsApp 气泡、独立 Contact 页面或第二套联系模块。

## 2. 已有基础与需要纠正的地方

### 已经可用

- 英、中、韩三语四问与路线结果；
- Email 咨询的 Supabase 保存、幂等、限流和通知 outbox；
- Gmail 收件与 `Reply-To` 客户邮箱；
- UTM 来源保存；
- Email 成功、失败和不确定状态；
- 数据库和 Gmail 内部使用的 `HG-XXXX-XXXX-XXXX` 咨询参考号。

### 不能直接打开的旧 WhatsApp 预留

当前隐藏代码的含义是：

```text
客户填写自己的 WhatsApp 号码
  → 网站保存咨询
  → Gmail 通知工作室
  → 工作室主动添加并联系客户
```

这不是本计划采用的模式。直接打开旧开关会增加号码输入、国际区号错误、等待回拨和主动联系同意等摩擦。

### 本计划采用的新 WhatsApp 模式

```text
客户点击 Continue in WhatsApp
  → 打开工作室 WhatsApp Business
  → 路线摘要已经填好
  → 客户自己点击 Send
  → 对话才真正开始
```

因此：

- 不收集客户的 WhatsApp 号码；
- 不把 WhatsApp 点击提交给 Inquiry API；
- 不因打开 WhatsApp 创建数据库咨询或发送 Gmail 通知；
- 不把“打开 WhatsApp”显示为“已提交”或“已收到”；
- 客户发送后，号码和路线自然出现在 WhatsApp Business 对话中。

## 3. 网站上的唯一联系模块

WhatsApp 只接入现有路线结果后的 `PlannerHandoff`。不在旧版 `HomePage / TripBrief`、实验组件或另一套页尾表单中接入。

### 3.1 模块位置

保持现有顺序：

1. 路线标题与城市晚数；
2. 选择理由与主要取舍；
3. “这是初步路线，不是预订”的边界；
4. 一个 `PlannerHandoff`；
5. 假设、修改答案和重新开始。

### 3.2 模块结构

```text
Human planning
How would you like to continue?

你的初步路线和四项选择已经整理好。
选择一种联系方式，不需要重新说明。

[ Email ] [ WhatsApp ]

选择 Email：
  邮箱
  选填说明
  [ Send my route ]

选择 WhatsApp：
  无输入框
  打开后仍需在 WhatsApp 点击发送
  [ Continue in WhatsApp ]
```

- Email 与 WhatsApp 位于同一模块，不新增第三块 CTA。
- 联系方式默认不替客户做决定；选择后只展开对应内容。
- 切换方式时，未发送的 Email 内容暂存在当前页面内，刷新后不保存。
- 所有按钮和选项使用原生 `<button>`、`<a>`、`<input>`，键盘可操作并有清晰焦点。

### 3.3 Email 分支

保留现有可靠链路：

```text
客户自己的 Email + 一项选填说明
  → API
  → Supabase 保存
  → Gmail 通知
  → 人工从 Gmail 回复
```

只有服务端确认保存成功，页面才显示：

> Your route has been saved.
>
> We’ll reply to `m***@example.com` within {replySla}. Nothing has been booked.

参考号降为小字：

> Support reference: HG-XXXX-XXXX-XXXX

参考号继续保留在 API、数据库和 Gmail 中，但不再成为客户成功页的视觉重点。

### 3.4 WhatsApp 分支

目标号码：

```text
+86 131 7421 5999
https://wa.me/8613174215999
```

选择 WhatsApp 后不显示号码输入框，只显示说明和可点击按钮：

> WhatsApp will open with your route summary. Tap Send there to start the conversation.

点击后可以显示中性状态，但只能说明网站已经尝试打开外部链接：

> We tried to open WhatsApp. We can’t confirm whether it opened or whether your message was sent.

可用操作：

- `Open WhatsApp again`
- `Use email instead`

这里不能出现绿色成功勾、`received`、`submitted` 或“Homeground 已收到”。

### 3.5 网站快速通道

第一版不在首页首屏、导航和页面侧边增加常驻 WhatsApp 气泡。这样可以避免客户绕过已经打通的四问与路线，也避免出现第二套不带上下文的联系模块。

快速通道先放在 Facebook Page 的 WhatsApp action button。网站数据证明大量高意向客户确实不愿做四问后，再单独评估一个低调、且能读取当前路线状态的页尾入口。

## 4. 三语核心文案

| 用途 | English | 中文 | 한국어 |
|---|---|---|---|
| 眉题 | Human planning | 人工旅行规划 | 1:1 여행 플래닝 |
| 标题 | How would you like to continue? | 你想通过哪种方式继续？ | 어떤 방법으로 이어갈까요? |
| 说明 | Your starting route and four answers are ready. Choose one way to contact us—you won’t need to explain them again. | 你的初步路线和四项选择已经整理好。选择一种方式联系工作室，不需要重新说明。 | 초기 여행 동선과 네 가지 답변이 정리되었습니다. 한 가지 연락 방법을 선택하면 처음부터 다시 설명하지 않아도 됩니다. |
| 边界 | This is an enquiry, not a booking. | 这只是咨询，不是预订。 | 문의 단계이며 예약이 아닙니다. |
| Email 按钮 | Send my route | 发送我的路线 | 내 여행 동선 보내기 |
| WhatsApp 按钮 | Continue in WhatsApp | 在 WhatsApp 中继续 | WhatsApp에서 계속하기 |
| Email 提示 | Only for replying to this enquiry. | 仅用于回复本次咨询。 | 이 문의에 답변하는 용도로만 사용합니다. |
| WhatsApp 提示 | Open WhatsApp with your route summary ready to send. | 打开 WhatsApp，路线摘要会自动填入。 | 여행 동선 요약이 미리 입력된 WhatsApp 채팅창이 열립니다. |

Email 的选填说明继续用于已订航班、固定日期、行动需求或必去地点。WhatsApp 不再提供网站说明框；客户可以在打开的对话中补充。

### Email 成功状态

| 用途 | English | 中文 | 한국어 |
|---|---|---|---|
| 状态 | Your route has been saved. We’ll reply to {maskedEmail} within {replySla}. Nothing has been booked. | 你的路线已保存。我们会在 {replySla} 内回复至 {maskedEmail}。目前没有任何预订。 | 여행 동선이 저장되었습니다. {replySla} 이내에 {maskedEmail}로 답변드리겠습니다. 아직 예약된 항목은 없습니다. |
| 次要参考号 | Support reference: {reference} | 查询参考号：{reference} | 문의 확인 번호: {reference} |

### WhatsApp 点击后的未确认状态

| 用途 | English | 中文 | 한국어 |
|---|---|---|---|
| 状态 | We tried to open WhatsApp. We can’t confirm whether it opened or whether your message was sent. | 我们已尝试打开 WhatsApp，但网站无法确认它是否成功打开，也无法确认消息是否已经发送。 | WhatsApp 열기를 요청했지만, 실제로 열렸는지 또는 메시지가 전송되었는지는 웹사이트에서 확인할 수 없습니다. |
| 主按钮 | Open WhatsApp again | 再次打开 WhatsApp | WhatsApp 다시 열기 |
| 次按钮 | Use email instead | 改用电子邮件 | 이메일로 보내기 |

## 5. WhatsApp 预填消息

WhatsApp 消息带路线内容，不带客户 Email、姓名、电话或自由文本等直接身份信息。
点击链接时，城市晚数、同行者类别、偏好和节奏会通过 `wa.me?...text=...`
传给 WhatsApp，用于准备消息；工作室只有在客户点击发送后才能看到对话。
完整城市、晚数和四项答案已经足够让人工继续沟通；不添加 `HG-...`、确定性
`routeId` 或内部机器标记，以免让客户误以为这是一条已经保存、可以查询的咨询。

### English

```text
Hi Homeground, I’d like help planning this China trip.

Starting route: {cities_and_nights}
Travellers: {party}
Travel style: {travel_style}
Length: {total_nights} nights
Pace: {pace}

What information do you need next?
```

### 中文

```text
你好，Homeground。我想继续规划这趟中国旅行。

初步路线：{cities_and_nights}
同行者：{party}
旅行偏好：{travel_style}
时长：{total_nights}晚
节奏：{pace}

接下来需要我提供哪些信息？
```

### 한국어

```text
Homeground와 함께 이번 중국 여행을 더 구체적으로 계획하고 싶습니다.

초기 여행 동선: {cities_and_nights}
일행: {party}
여행 취향: {travel_style}
기간: {total_nights}박
여행 페이스: {pace}

다음으로 어떤 정보를 드리면 될까요?
```

网站生成的 WhatsApp 消息不附带 UTM、广告来源或内部追踪代码。渠道效果只在
客户实际发送消息后，通过对话或聚合统计另行判断。

在 Facebook About、帖子或广告中使用工作室可控制的 `wa.me?...text=`
链接时，尚未生成路线的客户使用更短的模板：

```text
Hi Homeground, I’d like help planning a China trip.

Travel month:
Number of travellers:
Approximate number of nights:
```

Facebook Page 原生 WhatsApp action button 是否支持自定义预填文字取决于
Meta 当前提供的设置；不假设它一定能带入这段模板。实际 Page 界面允许自定义
链接时才使用；否则使用 WhatsApp Business 问候语。没有自然来源说明时，人工
只问一次 `Where did you find us?`。

## 6. 技术实施方式

### 6.1 前端

主要修改范围：

- `components/PlannerHandoff.tsx`
- `components/PlannerHandoff.module.css`
- `lib/homegroundI18n.ts`
- `lib/homegroundPrivacyI18n.ts`
- `lib/inquiryVersions.ts`
- `.env.example`
- `.github/workflows/deploy.yml`
- `docs/inquiry-deployment.md`
- `docs/studio-inquiry-runbook.md`
- 相关 Inquiry 与可访问性测试

改动原则：

1. 删除前端 WhatsApp 号码输入、校验和 API payload 分支。
2. Email 继续走现有 `submitCurrentValues` 和成功确认。
3. WhatsApp 使用纯函数从当前 `RouteMatch` 与语言生成消息和 `wa.me` URL。
4. 新增明确的公开配置：

   ```text
   NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED
   NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER
   ```

5. 不复用旧的 `NEXT_PUBLIC_HOMEGROUND_WHATSAPP_ENABLED` 含义，避免把“号码回拨模式”和“客户主动聊天模式”混在一起。
   删除它在正式前端与 GitHub Pages 构建中的读取；服务端同名开关继续保持关闭。
6. Direct WhatsApp 只有在新开关为真、隐私 gate 为真，并且工作室号码通过
   `^[1-9][0-9]{7,14}$` 校验时才显示；任何配置错误都失败关闭，只保留 Email。
7. 使用独立 UI 值 `direct-whatsapp`，不复用 API contract 中的 `whatsapp`：
   - 它是普通外链，永不调用 `<form>` submit 或 `submitCurrentValues`；
   - `whatsappLaunchAttempted` 只属于组件内部中性状态，不新增全局成功状态；
   - 未选择渠道或只选择 Direct WhatsApp 不算未保存草稿；
   - 只有尚未发送的 Email 地址或说明才触发离开及切换语言警告。
8. 外部链接使用安全属性，并保证桌面 WhatsApp Web 与移动端 WhatsApp 均可打开。
9. URL 中允许经过本地化的路线与四项结构化答案作为 WhatsApp 预填内容，但不得
   放入姓名、Email、客户电话或自由文本。上述直接身份信息也不得进入 UTM、
   日志或 `localStorage/sessionStorage` 等持久化前端存储；当前页面内未提交
   的临时 Email 表单状态除外。

### 6.2 后端与数据库

- Email API、Supabase 表、outbox、Resend 和 Gmail 通知保持不变。
- 不需要数据库迁移。
- Supabase 的旧 `WHATSAPP_ENABLED` 保持 `false`；直接 WhatsApp 不经过该 API。
- 旧数据库字段可以暂时保留以兼容历史代码，但生产前端不再生成 WhatsApp Inquiry。
- Email API 仍需要返回非空 `publicReference`，否则现有前端不能确认保存成功。

### 6.3 隐私版本

现有隐私页写明 WhatsApp 未启用，因此正式加入外链前必须更新三语隐私说明：

- Homeground 网站不会收集客户的 WhatsApp 号码；
- 点击链接时，路线摘要会传送给 WhatsApp，用于准备预填消息；
- Homeground 工作室只有在客户于 WhatsApp 点击发送后才收到该消息；
- 后续对话受 WhatsApp / Meta 相应规则影响。

隐私文案更新会提升 `currentPrivacyNoticeVersion`。部署时必须先把新版本加入 Supabase 允许列表，再发布前端，避免 Email 表单被版本校验拒绝。

隐私版本采用重叠发布：

1. 服务端先同时允许“旧版本,新版本”；
2. 验证仍在访问旧静态页面的客户可以提交 Email；
3. 发布带新隐私版本、但 Direct WhatsApp 仍关闭的前端；
4. 完成生产 Email QA 后才配置号码并打开 Direct WhatsApp；
5. 等旧静态页面的合理提交窗口结束后，再移除旧隐私版本。

本计划不修改回复承诺。前端继续显示现有 `{replySla}`，后端继续使用现有
`REPLY_SLA_HOURS`；当前生产基线为 48 小时。若以后改为“一个工作日”，必须把
三语构建变量、后端截止时间、通知邮件和工作室运行手册作为另一项同步变更。

## 7. 工作室人工流程

工作室只维护两个真实收件箱：

```text
Email 客户 → Gmail
WhatsApp 客户 → WhatsApp Business
```

不把每轮 WhatsApp 对话复制到 Gmail，也不建立第三套聊天后台。

一至两人阶段使用以下规则：

- 每天明确一名值班人；
- 上午、傍晚各检查一次 Gmail 与 WhatsApp Business；
- 未读表示尚未首次回复；
- Gmail 星标 / WhatsApp `Follow up` 标签表示下一步轮到 Homeground；
- 等客户回复时不加额外状态；
- 收到定金后才标记 `Won`；
- 两个人同时在线时，只在团队聊天说一句“我在处理 Anna / WhatsApp”，避免重复回复。

第一条人工回复不重复询问网站已经给出的同行者、晚数、偏好和节奏，只补齐：

1. 日期与可否浮动；
2. 抵达、离开城市及已订交通；
3. 儿童年龄或行动需求；
4. 必去 / 不想去的地点；
5. 住宿倾向与大致预算范围；
6. 希望使用的沟通语言。

补齐后才进入地接核验、报价和后续服务，不在网站上提前自动完成。

## 8. 渠道使用方法

| 渠道 | 默认路径 | 例外 |
|---|---|---|
| Facebook 冷广告 | 网站四问 | 单独建立一组 Click-to-WhatsApp 小额测试，并用自然语言注明广告来源 |
| Facebook Page | 同时放网站链接和 WhatsApp action button | 已准备沟通的人可直接聊天 |
| YouTube | 频道第一链接、长视频描述指向网站 | 暂不把陌生观众直接送 WhatsApp |
| Reddit | 先到网站 | 只有版规允许且内容确实相关时才放网站，否则只做有用回答、使用个人资料链接或正式广告 |

UTM 使用固定映射，不把 source 与 medium 任意组合：

```text
Facebook 付费：utm_source=facebook&utm_medium=paid_social
Facebook Page：utm_source=facebook&utm_medium=organic
YouTube 自然：utm_source=youtube&utm_medium=organic_video
Reddit 自然：utm_source=reddit&utm_medium=organic
YouTube 付费（以后启用时）：utm_source=youtube&utm_medium=paid_video
```

每条链接再加入一个简短、稳定的 `utm_campaign`。Click-to-WhatsApp 不经过
网站、没有 UTM，因此只在该广告的消息模板里使用一句可见的自然语言来源，
例如 `I found Homeground through a Facebook ad.`，不再建立第二套归因方式。

Facebook 的“网站路线”和“直接 WhatsApp”必须分成不同广告组，不能把两种点击混成一个结果。

## 9. 验证与最少记录

“打开 WhatsApp”不算线索，“客户真正发送消息”才算有效联系；Email 只有服务端保存成功才算。

开始投放后只保留一张轻量线索表，每条真实咨询一行：

```text
日期 | 来源 | Email/WA | 有效咨询 | Qualified | Proposal | Won
```

不用复制路线和客户隐私，也不把广告费虚构分摊到每位客户。Email 使用
`HG-...`，WhatsApp 可使用日期加对话简称。广告费按“周 + 渠道”单独汇总。

当前 Gmail 通知不显示 Inquiry 保存的 UTM。第一版每周从 Supabase 汇总一次
Email 来源；实施时如果能在不暴露多余数据的前提下把清洗后的来源码加入 Gmail
通知，则可直接填入线索表，但不能同时维护两套来源记录。

只看四个核心数：

1. 实际发送的 WhatsApp 与保存成功的 Email；
2. 有效咨询；
3. Qualified：日期、人数基本明确且愿意继续人工讨论；
4. 每个 Qualified 的获客成本。

平台展示的点击、landing-page view 或播放量只用于同一平台内部诊断，不把不同
平台口径混成同一个分母。每条付费路径开跑前设定相同量级的小额预算上限。

第一轮判断规则：

- 至少运行 7 天，并达到预先设定的小额预算上限后再判断；
- 第一轮仍为 0 个 Qualified：只修改一次素材或表达；
- 第二轮仍为 0 个 Qualified：暂停该路径；
- 出现真实付费客户，并且人工回复仍能按承诺完成后，才小幅增加预算。

最终判断依据是愿意继续规划、进入报价和支付定金的人数，不是按钮点击量。

## 10. 实施顺序

### 阶段 A：代码改造

1. 在 `PlannerHandoff` 中替换旧 WhatsApp 号码分支。
2. 加入三语预填消息生成和直接链接。
3. 弱化 Email 成功页参考号。
4. 压缩重复的边界与“下一步”说明，不新增页面。
5. 更新三语隐私文案、版本和部署变量。
6. 补齐单元、契约与可访问性测试。

### 阶段 B：本地与设备验收

1. 英、中、韩分别生成路线并检查预填内容。
2. 320px 手机、平板、桌面检查无横向滚动。
3. 键盘完成联系方式选择、Email 提交和 WhatsApp 打开。
4. 检查按钮触控区域至少 44×44 CSS 像素、焦点可见、状态可读屏。
5. iPhone / Android 实机打开 WhatsApp；桌面 Chrome / Edge 打开 WhatsApp Web。
6. 用另一个 WhatsApp 账号向 `+86 131 7421 5999` 真正发送，并确认 WhatsApp Business 收到。
7. 再跑一次真实 Email 端到端 QA，确认原链路没有回归。

### 阶段 C：生产发布

1. Supabase 先同时允许旧版和新版隐私声明，并验证旧页面仍能提交。
2. 发布前端，但先保持直接 WhatsApp 开关关闭。
3. 生产环境做一次 Email QA。
4. 配置工作室号码并打开前端直接 WhatsApp 开关；GitHub 构建变量变更后必须
   重新触发部署，不能把“修改变量”当作现网已经改变。
5. 用外部账号做一次标明 `QA` 的真实 WhatsApp 测试。
6. 确认三语生产页面后，再连接 Facebook Page action button。
7. 等旧静态页面的合理提交窗口结束后，再从服务端允许列表移除旧隐私版本。

### 阶段 D：渠道验证

1. YouTube 和 Reddit 默认送到网站。
2. Facebook 同时保留网站入口与一组独立 WhatsApp 测试。
3. 每周固定 15 分钟查看有效咨询、Qualified 和成本。
4. 在有真实数据前不增加 AI、CRM 或新联系渠道。

## 11. 发布验收标准

必须同时满足：

- 网站上不再要求客户填写 WhatsApp 号码；
- WhatsApp 按钮打开的工作室号码正确；
- 路线城市、晚数、四项回答和语言正确进入预填消息；
- WhatsApp 点击不创建数据库 Inquiry、不触发 Gmail 通知、不显示已收到；
- Email 保存、通知、Reply-To、失败重试和幂等行为保持正常；
- Email 成功页参考号仍可查询，但只是次要信息；
- 三语含义一致，不承诺已经预订、报价或确认服务；
- 不在 URL 中加入客户 Email、姓名、电话或自由文本；
- 320px、平板、桌面和键盘交互通过；
- 前端关闭直接 WhatsApp 后，Email 路径完全可用；
- Gmail 与 WhatsApp Business 各有明确值班人，测试消息能够在配置的回复时限内处理。

## 12. 回滚

如果 WhatsApp 号码、设备、人员或跨境收发出现问题：

1. 关闭 `NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED`；
2. 重新部署静态前端；
3. Email 路径继续运行；
4. 不回滚数据库，不删除 Email Inquiry；
5. Facebook Page 暂时移除 WhatsApp action button。

这次回滚不会影响现有路线生成、Email 咨询和 Gmail 通知。
