import { homegroundBusiness } from "./homegroundBusiness";

export const homegroundPrivacyLocales = ["en", "zh", "ko"] as const;

export type HomegroundPrivacyLocale =
  (typeof homegroundPrivacyLocales)[number];

interface PrivacyItem {
  name: string;
  stage: string;
  purpose: string;
}

interface PrivacyConfigurationRow {
  label: string;
  value: string;
  detail: string;
}

export interface HomegroundPrivacyCopy {
  htmlLang: string;
  pagePath: string;
  homePath: string;
  languageShort: string;
  metadata: {
    title: string;
    description: string;
  };
  skipLink: string;
  navigation: {
    homeLabel: string;
    languageLabel: string;
    privacyLabel: string;
    homeCta: string;
  };
  status: {
    eyebrow: string;
    title: string;
    body: string;
    blockersTitle: string;
    blockers: readonly string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    reviewedLabel: string;
    reviewedValue: string;
  };
  currentFlow: {
    title: string;
    paragraphs: readonly string[];
  };
  collection: {
    eyebrow: string;
    title: string;
    intro: string;
    items: readonly PrivacyItem[];
  };
  providers: {
    eyebrow: string;
    title: string;
    intro: string;
    rows: readonly PrivacyConfigurationRow[];
  };
  configuration: {
    eyebrow: string;
    title: string;
    intro: string;
    rows: readonly PrivacyConfigurationRow[];
  };
  choices: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    items: readonly string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    emailLabel: string;
    emailPlaceholder: string;
    addressLabel: string;
    addressPlaceholder: string;
  };
  footer: string;
}

const privacyEmail = "yangchunxuan1@gmail.com";

export const homegroundPrivacyCopy: Record<
  HomegroundPrivacyLocale,
  HomegroundPrivacyCopy
> = {
  en: {
    htmlLang: "en",
    pagePath: "/privacy/",
    homePath: "/",
    languageShort: "EN",
    metadata: {
      title: "Privacy notice | Homeground China",
      description:
        "How Homeground handles trip-wishlist, contact and travel enquiry information.",
    },
    skipLink: "Skip to privacy notice",
    navigation: {
      homeLabel: "Homeground China home",
      languageLabel: "Choose privacy notice language",
      privacyLabel: "Privacy",
      homeCta: "Back to the trip brief",
    },
    status: {
      eyebrow: "Enquiry privacy at a glance",
      title: "Your details support the reply and limited service improvement",
      body:
        "Homeground uses the trip brief, the one contact method you choose and any optional planning-service choice, route note, departure country, region or rough per-person budget to review and answer this travel request. Structured trip choices may also be counted in restricted summaries to improve the planner and travel information. Contact details, free text and individual records are not shown in those summaries. An enquiry is not consent to unrelated marketing, and it is not handled by an AI chat service.",
      blockersTitle: "Key points",
      blockers: [
        "Enquiries are stored in Supabase’s Seoul region and notifications are sent through Resend’s Tokyo region to Homeground’s monitored Gmail inbox.",
        "Homeground-controlled website enquiry records are deleted no later than 12 months after they are saved. If a client relationship or legal duty requires a record, only the necessary record is retained separately under that system’s rules; it does not extend the website copy. Later email or WhatsApp conversations follow their own service and business-record rules.",
        "Secret-keyed hashed identifiers are used for 10-minute and 24-hour rate-limit windows. Each bucket is scheduled for deletion 24 hours after its last update, normally at the next one-minute cleanup run.",
        "The full trip-brief form saves either an email address or a WhatsApp number. The homepage quick-email option saves the email entered there and, when opened from a published private-tour page, the allowlisted product identity shown above the contact choices. Optional analytics and marketing measurement remain off unless the visitor grants the relevant choice; AI chat remains disabled.",
      ],
    },
    hero: {
      eyebrow: "Homeground · privacy",
      title: "How an enquiry is handled",
      intro:
        "A traveller can answer the trip-brief questions and submit one enquiry with either an email address or a WhatsApp number. It is for a human reply to that active request, not for automatic booking or unrelated marketing.",
      reviewedLabel: "Last reviewed",
      reviewedValue: "24 August 2026",
    },
    currentFlow: {
      title: "From the website to a human reply",
      paragraphs: [
        "After the traveller first interacts with the trip brief, the form may keep selected structured answers in this browser’s session storage so progress can be restored. It never stores the free-text “other place”, route note, contact details, optional departure country or rough budget there. This browser copy is cleared after 30 minutes without planner activity, on restart and after a successful enquiry.",
        "When a traveller submits the form, Supabase validates and saves the trip brief, the selected email address or WhatsApp number, and any optional planning-service choice, route note, departure country, region or rough per-person budget. The page shows a saved state only after that save succeeds.",
        "The homepage quick-email option sends the entered email address, page language, fixed language-specific submit-surface code and the limited technical record needed for reliable submission and rate limiting. When the contact area was opened from a published private-tour page, it also sends that tour’s allowlisted slug, canonical localised name and any valid service option and 2- or 4-traveller selection shown above the contact choices; a name supplied in the URL is never accepted. It does not collect an itinerary, traveller profile, date, destination, budget or free-text message, and it shows success only after Supabase confirms the save.",
        "The homepage WhatsApp and Messenger options are direct outbound links. Opening either link does not save the visitor’s phone number or message on Homeground’s website and is not treated as a submitted enquiry. If the visitor then sends a message, WhatsApp or Facebook and Meta process that conversation under their own terms and infrastructure.",
        "If the visitor allows analytics, Homeground creates a temporary anonymous browser-session token. The event service first issues a short-lived signed credential; bare or expired event requests are rejected. A limited first-touch source is recorded only when the landing link contains Homeground-signed UTM source, medium, campaign and content codes. Unsigned, altered or unrecognised UTM values remain Unknown. The website-event record does not store a full referrer URL, raw IP address, user-agent string, click identifier, contact detail or free-text answer.",
        "With analytics permission, Homeground records page views and fixed actions: viewing contact options, choosing a channel, opening a contact link, starting the email form, changing a published tour option, and attempting to submit an enquiry. The first-party service may also receive the published product code, service option and displayed group-size choice of 2 or 4 travellers. These product-choice fields are not sent to Google Analytics or Meta Pixel. A click means only that an option was opened; it does not prove that a message was sent or a booking was made. Definite submission failures and results the browser cannot confirm are recorded separately; saved enquiries are counted from server records. Temporary retries keep the same event identifier and are cleared when analytics permission is withdrawn.",
        "When the same browser later submits an enquiry, the saved first-touch labels may be attached to that enquiry so Homeground can understand which page or post led to it. The enquiry still succeeds when no session or source is available, and an unknown source is never guessed.",
        "Authorised staff may view restricted aggregate counts and, only after the 30-day window contains at least five eligible anonymous sessions that are not linked to enquiries, a day-level recent-session summary without per-session click or event timelines. Contact details, trip-questionnaire answers and message text are kept out of analytics and are not sent to Google Analytics or Meta Pixel.",
        "Resend then sends a notification to Homeground’s monitored Gmail inbox. For an email enquiry, Reply-To is the traveller’s address. For a WhatsApp enquiry, the notification gives authorised staff a link to start the requested conversation from the studio’s account.",
        "Homeground currently connects that Gmail inbox and the studio WhatsApp account to SaleSmartly for shared handling. The notification, submitted trip details and later messages may therefore also be synchronised into the studio’s SaleSmartly team inbox for authorised staff.",
        "Choosing WhatsApp and submitting asks Homeground to contact that number about this trip request. The later conversation is processed by WhatsApp and Meta under their own terms and infrastructure.",
        "Online checkout is not enabled. If a US$69 or US$129 written consultation is accepted, the scope and delivery date are confirmed first and payment instructions are sent separately. Do not submit card, bank or payment QR information through the enquiry form.",
        "When the quick-email form is unavailable, the contact card offers a prepared mailto link to the same monitored inbox. Opening an email app is never described as a saved or successful website submission.",
      ],
    },
    collection: {
      eyebrow: "Purpose and fields",
      title: "Only what is needed for the active request",
      intro:
        "A traveller can prepare structured trip answers before submitting. Enquiry fields are sent only when the traveller deliberately submits; the separate website-measurement fields below are used only after the relevant optional permission.",
      items: [
        {
          name: "Trip brief",
          stage:
            "Browser session, submitted enquiry, notification and connected team inbox",
          purpose:
            "Selected destinations, another place entered, total nights, party, pace, must-see priorities, timing status, page language and internal rules version describe the request. Restricted summaries count compatible structured choices to improve the planner and travel information; the free-text other place is excluded from those summaries.",
        },
        {
          name: "Optional planning-service choice and route context",
          stage:
            "Submitted enquiry, notification and connected team inbox when supplied",
          purpose:
            "A traveller arriving from the route-service page can carry a Review, Build or full-trip-support choice into the enquiry and add a short route outline, fixed constraints or shareable route link. This free text is used for the human reply and is excluded from restricted summaries. Full files can be requested later by reply.",
        },
        {
          name: "Optional published-tour interest",
          stage:
            "Homepage contact surface, submitted quick-email enquiry or prepared WhatsApp/email message",
          purpose:
            "A traveller arriving from a published private-tour page may carry that product’s allowlisted slug and canonical localised name into the contact handoff. URL-provided product names and free text are rejected; this context is used only to identify the tour being asked about.",
        },
        {
          name: "Chosen reply contact",
          stage:
            "Submitted enquiry, Gmail notification and connected team inbox",
          purpose:
            "The full trip-brief form accepts either an email address or a WhatsApp number. The homepage quick-email option accepts only an email address. These details are used to reply to the active request and are not consent for unrelated marketing; the direct homepage WhatsApp and Messenger links do not save a contact detail on Homeground’s website.",
        },
        {
          name: "Optional departure country or region",
          stage:
            "Submitted enquiry, notification and connected team inbox when entered",
          purpose:
            "This optional context helps the studio understand the traveller’s likely departure point. It can be provided later instead.",
        },
        {
          name: "Optional rough budget per person",
          stage:
            "Submitted enquiry, notification and connected team inbox when entered",
          purpose:
            "This traveller-stated range helps the studio prepare realistic options. It excludes international flights, is not a Homeground quote and can be left blank.",
        },
        {
          name: "Technical request record",
          stage: "Enquiry service",
          purpose:
            "A public reference, time, form version, brief revision, fixed language-specific submit-surface code and limited anti-abuse data support reliable submission and duplicate prevention. The submit-surface code is not treated as a traffic source.",
        },
        {
          name: "Optional anonymous website measurement",
          stage:
            "Browser, Homeground first-party event service and optional Google Analytics or Meta Pixel",
          purpose:
            "After permission, a temporary session token, short-lived signed event credential, page path, language, Homeground-signed first-touch campaign codes and fixed event/action codes help Homeground understand useful pages and contact attempts. Published product, service and group-size choices are sent only to the first-party service. Unsigned campaign labels stay Unknown. The event service excludes names, email addresses, phone numbers, trip-questionnaire answers, messages, raw IP addresses, user-agent strings and full referrer URLs.",
        },
      ],
    },
    providers: {
      eyebrow: "Service providers",
      title: "The services in this enquiry path",
      intro:
        "The locations below identify the configured primary service regions. These providers may also use global infrastructure for delivery, security, support and legal compliance, so processing may occur outside the traveller’s country.",
      rows: [
        {
          label: "Website hosting",
          value: "GitHub Pages · Cloudflare edge delivery and security",
          detail:
            "GitHub Pages hosts the static site. Cloudflare provides DNS, content delivery and security at the edge. Both may process ordinary request metadata, such as IP address, request time and path, under their terms. Cloudflare Web Analytics and browser RUM are disabled.",
        },
        {
          label: "Studio inbox",
          value: "Google Gmail · monitored Homeground inbox",
          detail:
            "Receives the notification and holds the later email conversation. Google may process data through its global infrastructure; Homeground does not claim a precise physical Gmail location. The website never uses the Gmail password.",
        },
        {
          label: "Enquiry storage",
          value: "Supabase · Seoul (ap-northeast-2)",
          detail:
            "Validates and stores the enquiry before the page can show a received state.",
        },
        {
          label: "Email notification",
          value: "Resend · Tokyo (ap-northeast-1)",
          detail:
            "Sends the saved enquiry to Gmail with the traveller address in Reply-To.",
        },
        {
          label: "WhatsApp and Messenger",
          value: "Direct homepage links; optional saved-number trip brief",
          detail:
            "The homepage links open WhatsApp or Messenger without saving the visitor’s number or message on Homeground’s website. The fuller trip-brief form separately allows a traveller to submit a WhatsApp number so authorised staff can start the requested conversation. WhatsApp, Facebook and Meta may process later messages under their own terms and infrastructure.",
        },
        {
          label: "Shared team inbox",
          value: "SaleSmartly · connected Gmail and WhatsApp channels",
          detail:
            "Synchronises selected Gmail folders and WhatsApp conversations so authorised studio members can handle the enquiry together. SaleSmartly and its service providers may process this information under their own terms and infrastructure.",
        },
        {
          label: "Website measurement",
          value:
            "Supabase first-party events · Google Analytics · Meta Pixel (optional)",
          detail:
            "None of these optional destinations receives a website event before the visitor grants the relevant choice. Analytics permission enables limited first-party events and Google Analytics; marketing permission separately enables Meta Pixel. Homeground does not send contact details, trip answers or message text to those tools. AI chat is not used.",
        },
      ],
    },
    configuration: {
      eyebrow: "Retention and control",
      title: "How long information is kept",
      intro:
        "Homeground applies the following rules to the enquiry records and service copies it controls. Providers may retain limited security, billing or legal records under their own obligations.",
      rows: [
        {
          label: "Data controller and website operator",
          value: `${homegroundBusiness.registeredName} (trading as ${homegroundBusiness.brand})`,
          detail:
            "The registered operator is responsible for this website and the Homeground China enquiry records it receives. Homeground China is the public-facing brand used by this registered operator.",
        },
        {
          label: "Processing and storage region",
          value:
            "Supabase Seoul · Resend Tokyo · Gmail, WhatsApp and SaleSmartly provider infrastructure",
          detail:
            "Seoul and Tokyo are the configured primary regions. Email delivery, team-inbox synchronisation, WhatsApp conversations, security and support may involve provider infrastructure in other countries.",
        },
        {
          label: "Inquiry retention",
          value: "Up to 12 months from the website enquiry’s saved time",
          detail:
            "The website period is not reset by later email or WhatsApp activity. If the enquiry becomes a client or contractual relationship, relevant records may be kept separately for service, business-record and legal obligations.",
        },
        {
          label: "Transaction and service records",
          value: "Kept under the applicable business-record period",
          detail:
            "If a written consultation is accepted, Homeground may keep the service confirmation, agreed scope, price and currency, payment confirmation, delivery correspondence and correction or refund record for service, accounting, dispute and legal obligations. These records do not use the website enquiry’s 12-month deletion period.",
        },
        {
          label: "Rate-limit retention",
          value:
            "10-minute and 24-hour windows · deletion 24 hours after last update",
          detail:
            "Valid credential-bootstrap requests are counted as requests against separate client-IP and whole-site limits before a credential is issued. Event batches are counted separately by newly accepted events—not by event-batch HTTP requests or idempotent replays—against browser-session, client-IP and whole-site limits. The service stores secret-keyed hashes rather than raw IP addresses or browser tokens. A one-minute recurring task removes a bucket after its last updated_at value is 24 hours old, normally on the next cleanup run.",
        },
        {
          label: "Anonymous website-event retention",
          value: "Raw events and anonymous sessions · 30-day rolling window",
          detail:
            "The browser token is stored only in session storage after analytics permission. The server stores only a secret-keyed session hash. Raw events, anonymous sessions and reversible session links expire at the 30-day point and are removed by an hourly cleanup, normally within the following hour. A first-touch source snapshot attached to a submitted enquiry follows that enquiry’s retention period.",
        },
        {
          label: "Access, correction and deletion",
          value: "Verified requests are normally handled within 30 days",
          detail:
            "Homeground may ask for reasonable identity verification. A separate contract, legal, dispute or security record may have lawful deletion limits; that does not extend the website enquiry row beyond its fixed period.",
        },
      ],
    },
    choices: {
      eyebrow: "Traveller choices",
      title: "You decide whether to submit",
      paragraphs: [
        "Trip-brief answers remain in the browser until the traveller deliberately submits the form with one reply contact. Leaving or restarting before submission sends no enquiry to Homeground.",
        "Enquiry processing is separate from marketing consent. Homeground will not use the submitted contact for unrelated marketing without separate permission.",
        "The visitor can allow or reject analytics and marketing measurement independently and can reopen Privacy choices from the footer. Rejecting optional measurement does not block the planner or enquiry form. Revoking a choice stops future events and clears the related Homeground browser choice where technically possible.",
      ],
      items: [
        "Do not submit the enquiry form.",
        "Ask what personal information is held and request access, correction or deletion after reasonable identity verification.",
        "Restart or leave the trip brief before submission.",
        "Choose either email or WhatsApp for the human reply, and leave the optional departure country or rough budget blank.",
        "Use necessary functions only, allow analytics without marketing, or later change both optional choices.",
      ],
    },
    contact: {
      eyebrow: "Privacy contact",
      title: "Contact Homeground about your information",
      body:
        "Use the monitored email below for an access, correction or deletion request. Send it from the same address used for the enquiry when possible. After reasonable identity verification, Homeground normally responds within 30 days.",
      emailLabel: "Privacy email",
      emailPlaceholder: privacyEmail,
      addressLabel: "Postal contact",
      addressPlaceholder: homegroundBusiness.registeredAddress,
    },
    footer:
      "This notice covers Homeground’s trip brief, enquiry service and optional consent-based website measurement. Submitting an enquiry does not provide unrelated marketing consent, and AI chat is not enabled.",
  },
  zh: {
    htmlLang: "zh-Hans",
    pagePath: "/zh/privacy/",
    homePath: "/zh/",
    languageShort: "中文",
    metadata: {
      title: "隐私说明 | Homeground China",
      description: "Homeground 如何处理旅行愿望、联系方式和旅行咨询信息。",
    },
    skipLink: "跳到隐私说明正文",
    navigation: {
      homeLabel: "Homeground China 首页",
      languageLabel: "选择隐私说明语言",
      privacyLabel: "隐私",
      homeCta: "返回旅行简报",
    },
    status: {
      eyebrow: "咨询隐私摘要",
      title: "你的信息用于本次回复和有限的服务改进",
      body:
        "Homeground 使用你主动提交的旅行需求、所选的一种联系方式，以及选填的出发国家、地区或每人大致预算，来人工复核并回复本次咨询。结构化的旅行选择也可能进入受限统计，用于改进旅行简报流程和旅行信息；这些统计不展示联系方式、自由文本或单条咨询。提交咨询不代表同意无关营销，也不会交给 AI 聊天服务处理。",
      blockersTitle: "关键规则",
      blockers: [
        "咨询存储在 Supabase 首尔地区，并由 Resend 东京地区发送通知到 Homeground 持续查看的 Gmail。",
        "Homeground 控制的网站咨询记录会在保存满 12 个月时删除。如果客户关系或法律义务确实要求保留记录，只把必要记录另行放在相应记录体系并按其规则保留；网站副本不会因此保存更久。之后的邮件或 WhatsApp 对话适用各自服务与业务记录规则。",
        "经过秘密密钥哈希的标识只用于 10 分钟和 24 小时限流窗口。每个限流桶会在最后一次更新满 24 小时后安排删除，通常在下一次每分钟清理任务运行时完成。",
        "完整旅行简报表单会保存邮箱或 WhatsApp 号码中的一种；首页快速留邮箱会保存所填邮箱；如果从已发布私家团页面进入，还会保存联系选项上方明确显示的白名单产品身份。访客未主动允许相应选项时，可选分析统计与营销衡量保持关闭；AI 聊天仍未启用。",
      ],
    },
    hero: {
      eyebrow: "Homeground · 隐私",
      title: "一次咨询会如何被处理",
      intro:
        "访客可以先回答旅行简报问题，再用邮箱或 WhatsApp 号码中的一种提交咨询。该表单只用于人工回复当前请求，不代表自动预订，也不等于同意无关营销。",
      reviewedLabel: "最近复核",
      reviewedValue: "2026 年 8 月 24 日",
    },
    currentFlow: {
      title: "从网站到人工回复",
      paragraphs: [
        "访客首次操作旅行简报后，表单可能把选定的结构化答案保存在当前浏览器会话中，以便恢复进度；“其他地点”自由文本、路线说明、联系方式、选填出发国家或地区和大致预算永远不会存入这里。连续 30 分钟没有操作、重新开始或咨询保存成功后，这份浏览器副本会被清除。",
        "访客提交表单时，Supabase 会验证并保存旅行需求、所选邮箱或 WhatsApp 号码，以及选填的出发国家、地区或每人大致预算。只有保存成功后，网页才会显示已保存。",
        "首页“只留邮箱”会发送所填邮箱、页面语言、固定的语言版提交页面代码，以及可靠提交和限流所需的有限技术记录；如果联系区域由已发布私家团页面打开，还会发送该产品经白名单确认的 slug、正式中文名，以及联系选项上方显示的有效服务版本和 2 人或 4 人选择，网址里自行填写的产品名称不会被接受。该入口不会收集路线、同行者资料、日期、目的地、预算或自由文本。只有 Supabase 确认保存后，页面才会显示成功。",
        "首页 WhatsApp 与 Messenger 是直接跳转到外部服务的链接。打开链接不会在 Homeground 网站保存访客电话号码或消息，也不会被记作已提交咨询；访客随后主动发送消息时，该对话由 WhatsApp 或 Facebook 与 Meta 依据其自身条款和基础设施处理。",
        "访客允许分析统计后，Homeground 会创建临时匿名浏览器会话令牌；事件服务会先签发短时有效的签名凭据，没有凭据或凭据过期的事件请求会被拒绝。只有进入链接带有 Homeground 签名的 UTM 来源、媒介、活动和内容代码时，才会记录有限的首次来源；未签名、被修改或无法识别的 UTM 一律保留为“未知”。网站事件记录不保存完整来源网址、原始 IP、User-Agent、广告点击标识、联系方式或旅行自由文本。",
        "获得分析许可后，Homeground 可记录页面浏览及固定动作：看到联系选项、选择联系方式、打开联系链接、开始填写邮箱、主动更改公开产品选项，以及尝试提交咨询。第一方事件服务还可接收公开产品编号、服务版本和页面显示的 2 人或 4 人选项；这些产品选择字段不会发送给 Google Analytics 或 Meta Pixel。点击只说明相应入口被打开，不证明消息已经发出，也不代表已经预订。明确提交失败和浏览器无法确认的提交结果分别记录；已保存咨询以服务器记录为准。临时重试使用同一事件编号，撤回分析许可后会清空待发送记录。",
        "同一浏览器随后提交咨询时，已保存的首次来源标签可附在该咨询上，以判断哪一页或哪条外部内容带来咨询。没有会话或来源时，咨询仍会正常保存；未知来源不会被猜测或分摊。",
        "获授权的工作人员可查看受限汇总计数；只有当 30 天窗口至少包含 5 个符合展示边界且未关联询盘的匿名会话时，后台才会显示精确到天、且不含逐会话点击或事件时间线的近期会话摘要。联系方式、旅行问卷答案与消息内容不会进入分析事件，也不会发送给 Google Analytics 或 Meta Pixel。",
        "随后，Resend 会把通知送到 Homeground 持续查看的 Gmail。邮件咨询会把 Reply-To 设为访客邮箱；WhatsApp 咨询会为获授权的工作人员提供从工作室账号发起本次对话的入口。",
        "Homeground 目前把该 Gmail 和工作室 WhatsApp 连接到 SaleSmartly 供团队共同处理，因此通知、已提交的旅行信息和后续消息也可能同步到仅供获授权工作人员使用的 SaleSmartly 团队收件箱。",
        "选择 WhatsApp 并提交，即表示访客请求 Homeground 就本次旅行需求联系该号码。后续对话由 WhatsApp 与 Meta 依据其条款和基础设施处理。",
        "本网站目前没有在线收银台。如 69 美元或 129 美元书面咨询被接受，会先确认范围和交付日期，再另行发送付款方式。请勿通过咨询表单提交银行卡、银行账户或付款二维码信息。",
        "快速邮箱表单不可用时，联系卡会提供一封发往同一持续查看邮箱的预填邮件。打开邮件应用绝不能被描述成网站已保存或提交成功。",
      ],
    },
    collection: {
      eyebrow: "目的和字段",
      title: "只收集当前咨询需要的信息",
      intro:
        "访客可以先在浏览器中准备结构化旅行答案。咨询字段只在主动提交时发送；下列网站衡量字段仅在访客允许相应可选功能后使用。",
      items: [
        {
          name: "旅行需求",
          stage: "浏览器会话、已提交咨询、通知与已连接的团队收件箱",
          purpose:
            "所选目的地、其他地点、总晚数、同行者、节奏、必去优先项、时间状态、页面语言和内部规则版本用于描述本次需求。可按同一规则读取的结构化选择会进入受限统计，用于改进旅行简报流程和旅行信息；“其他地点”自由文本不会进入统计。",
        },
        {
          name: "选填的已发布私家团意向",
          stage: "首页联系区域、已提交的快速邮箱咨询或预填 WhatsApp／邮件",
          purpose:
            "从已发布私家团页面进入的访客，可以把该产品经白名单确认的 slug 与正式本地化名称带入联系流程。网址里提供的产品名称与自由文本会被拒绝；这项信息只用于识别访客正在咨询哪条产品。",
        },
        {
          name: "所选回复联系方式",
          stage: "已提交咨询、Gmail 通知与已连接的团队收件箱",
          purpose:
            "完整旅行简报表单接受邮箱或 WhatsApp 号码中的一种；首页快速联系只接受邮箱。联系方式只用于回复当前请求，不代表同意接收无关营销；首页 WhatsApp 与 Messenger 直达链接不会在 Homeground 网站保存联系方式。",
        },
        {
          name: "选填的出发国家或地区",
          stage: "填写后进入已提交咨询、通知与已连接的团队收件箱",
          purpose:
            "这项选填信息帮助工作室理解访客可能从哪里出发，也可以稍后再提供。",
        },
        {
          name: "选填的每人大致预算",
          stage: "填写后进入已提交咨询、通知与已连接的团队收件箱",
          purpose:
            "访客填写的金额或范围仅帮助工作室准备更现实的选项，不含国际机票，不是 Homeground 的正式报价，也可以留空。",
        },
        {
          name: "技术请求记录",
          stage: "咨询服务",
          purpose:
            "公开咨询编号、时间、表单版本、需求修订、固定的语言版提交页面代码和有限的防滥用信息，用于可靠提交与避免重复；提交页面代码不会被当作流量来源。",
        },
        {
          name: "可选的匿名网站衡量",
          stage:
            "浏览器、Homeground 第一方事件服务，以及可选的 Google Analytics 或 Meta Pixel",
          purpose:
            "获得许可后，临时会话令牌、短时签名事件凭据、页面路径、语言、由 Homeground 签名的首次活动代码和固定事件代码，以及仅进入第一方服务的公开产品、服务版本和人数选项，可帮助判断哪些页面和联系入口有用；未签名的活动标签保持为“未知”。事件服务不保存姓名、邮箱、电话、旅行问卷答案、消息、原始 IP、User-Agent 或完整来源网址。",
        },
      ],
    },
    providers: {
      eyebrow: "服务商",
      title: "咨询流程会使用的服务",
      intro:
        "下列地区是当前配置的主要服务地区。服务商也可能使用全球基础设施完成投递、安全、技术支持和法律合规，因此信息可能在访客所在国家或地区以外被处理。",
      rows: [
        {
          label: "网站托管",
          value: "GitHub Pages · Cloudflare 边缘分发与安全防护",
          detail:
            "GitHub Pages 托管静态网站；Cloudflare 在边缘提供 DNS、内容分发和安全防护。两者可能依据各自条款处理 IP 地址、请求时间、访问路径等普通请求信息。Cloudflare Web Analytics 和浏览器 RUM 已关闭。",
        },
        {
          label: "工作室收件箱",
          value: "Google Gmail · Homeground 持续查看",
          detail:
            "接收通知并保存后续邮件对话。Google 可能通过全球基础设施处理信息；Homeground 不承诺 Gmail 的精确物理存储地区。网站永远不会使用 Gmail 密码。",
        },
        {
          label: "咨询信息存储",
          value: "Supabase · 首尔（ap-northeast-2）",
          detail: "在网页显示已收到前，验证并保存咨询。",
        },
        {
          label: "邮件通知",
          value: "Resend · 东京（ap-northeast-1）",
          detail: "把已保存咨询送入 Gmail，并将访客邮箱写入 Reply-To。",
        },
        {
          label: "WhatsApp 与 Messenger",
          value: "首页直接跳转；完整简报可选保存 WhatsApp 号码",
          detail:
            "首页链接会直接打开 WhatsApp 或 Messenger，不会在 Homeground 网站保存访客号码或消息。完整旅行简报表单另行允许访客提交 WhatsApp 号码，以便获授权的工作人员发起所请求的对话。WhatsApp、Facebook 与 Meta 可能依据其自身条款和基础设施处理后续消息。",
        },
        {
          label: "团队共享收件箱",
          value: "SaleSmartly · 已连接 Gmail 与 WhatsApp 渠道",
          detail:
            "同步选定的 Gmail 文件夹和 WhatsApp 对话，让获授权的工作室成员共同处理咨询。SaleSmartly 及其服务商可能依据自身条款和基础设施处理这些信息。",
        },
        {
          label: "网站衡量",
          value:
            "Supabase 第一方事件 · Google Analytics · Meta Pixel（均为可选）",
          detail:
            "访客允许相应选项前，任何可选平台都不会收到网站事件。分析许可启用有限的第一方事件和 Google Analytics；营销许可另行启用 Meta Pixel。联系方式、旅行答案与消息不会发送给这些工具。网站不使用 AI 聊天。",
        },
      ],
    },
    configuration: {
      eyebrow: "保留与责任",
      title: "信息会保留多久",
      intro:
        "以下规则适用于 Homeground 能控制的咨询记录和服务副本。服务商可能依据自身的安全、计费或法律义务保留有限记录。",
      rows: [
        {
          label: "个人信息处理者与网站经营主体",
          value: `${homegroundBusiness.registeredName}（以 ${homegroundBusiness.brand} 品牌开展业务）`,
          detail:
            "该登记主体负责本网站及其收到的 Homeground China 咨询记录。Homeground China 是该登记主体使用的对外品牌名称。",
        },
        {
          label: "处理与存储地区",
          value:
            "Supabase 首尔 · Resend 东京 · Gmail、WhatsApp 与 SaleSmartly 服务商基础设施",
          detail:
            "首尔和东京是当前配置的主要地区；邮件投递、团队收件箱同步、WhatsApp 对话、安全和技术支持可能使用服务商在其他国家或地区的基础设施。",
        },
        {
          label: "咨询信息保留",
          value: "从网站咨询保存时间起最多 12 个月",
          detail:
            "后续邮件或 WhatsApp 活动不会重置网站期限。如果咨询形成客户或合同关系，相关记录可依据服务、业务记录和法律义务另行保留。",
        },
        {
          label: "交易与服务记录",
          value: "按适用的业务记录期限保留",
          detail:
            "如书面咨询被接受，可能保存服务确认、约定范围、价格与币种、付款确认、交付往来及更正或退款记录，用于履行服务、财务记录、争议处理和法律义务。这类记录不适用网站咨询记录的 12 个月删除期限。",
        },
        {
          label: "限流数据保留",
          value: "10 分钟和 24 小时窗口 · 最后更新满 24 小时后删除",
          detail:
            "系统会在签发凭据前，把通过格式验证的凭据启动请求按请求数计入客户端 IP 与全站两类限流；事件批次则另按新接受的事件数计费，而不是按事件批次 HTTP 请求数或重复重放次数计费，并同时执行浏览器会话、客户端 IP 和全站限流。系统不保存原始 IP 或浏览器令牌，只保存使用秘密密钥生成的哈希。每分钟运行的任务会在限流桶的 updated_at 最后更新时间满 24 小时后将其删除，通常在下一次清理时完成。",
        },
        {
          label: "匿名网站事件保留",
          value: "原始事件与匿名会话 · 30 天滚动窗口",
          detail:
            "浏览器令牌只会在访客允许分析后保存在会话存储中；服务器只保存使用秘密密钥生成的会话哈希。原始事件、匿名会话和可还原的会话关联会在满 30 天时过期，并由每小时清理任务删除，通常在随后一小时内完成。随已提交咨询保存的首次来源快照适用该咨询的保留期。",
        },
        {
          label: "查询、更正与删除",
          value: "身份核验后的申请原则上 30 天内处理",
          detail:
            "另行保存的合同、法律、争议或安全记录可能依法受到删除限制；网站咨询记录仍会在固定期限内删除。",
        },
      ],
    },
    choices: {
      eyebrow: "访客的选择",
      title: "是否提交始终由访客决定",
      paragraphs: [
        "旅行简报答案会留在浏览器中，直到访客主动填写一种回复联系方式并提交。提交前离开或重新开始，不会向 Homeground 发送咨询。",
        "处理当前咨询与营销许可相互独立。未经单独同意，Homeground 不会把提交的联系方式用于无关营销。",
        "访客可以分别允许或拒绝分析统计和营销衡量，并可随时从页脚重新打开“隐私选择”。拒绝可选衡量不会阻止使用规划器或提交咨询；撤回后会停止未来事件，并在技术允许范围内清理相关浏览器数据。",
      ],
      items: [
        "选择不提交咨询表单。",
        "在合理核验身份后，查询已保存的信息并申请访问、更正或删除。",
        "提交前重新开始或离开旅行简报。",
        "选择邮箱或 WhatsApp 接收人工回复，并可不填写出发国家、地区或大致预算。",
        "只使用必要功能、只允许分析而不允许营销，或稍后修改两个可选设置。",
      ],
    },
    contact: {
      eyebrow: "隐私联系方式",
      title: "联系 Homeground 处理你的信息",
      body:
        "如需访问、更正或删除，请使用下方有人查看的邮箱；可行时请用提交咨询时的同一邮箱发送。合理核验身份后，Homeground 原则上会在 30 天内处理。",
      emailLabel: "隐私邮箱",
      emailPlaceholder: privacyEmail,
      addressLabel: "通信地址",
      addressPlaceholder: homegroundBusiness.registeredAddress,
    },
    footer:
      "本说明适用于 Homeground 的旅行简报、咨询服务和基于选择的可选网站衡量。提交咨询不代表同意无关营销，网站也未启用 AI 聊天。",
  },
  ko: {
    htmlLang: "ko",
    pagePath: "/ko/privacy/",
    homePath: "/ko/",
    languageShort: "한국어",
    metadata: {
      title: "개인정보 안내 | Homeground China",
      description:
        "Homeground가 여행 희망 목록, 연락처 및 문의 정보를 처리하는 방식입니다.",
    },
    skipLink: "개인정보 안내 본문으로 바로가기",
    navigation: {
      homeLabel: "Homeground China 홈",
      languageLabel: "개인정보 안내 언어 선택",
      privacyLabel: "개인정보",
      homeCta: "여행 브리프로 돌아가기",
    },
    status: {
      eyebrow: "문의 개인정보 요약",
      title: "제출한 정보는 답변과 제한적인 서비스 개선에 사용합니다",
      body:
        "Homeground는 여행자가 직접 제출한 여행 요청서, 선택한 한 가지 연락 방법과 선택 입력한 출발 국가, 지역 또는 1인당 대략적인 예산을 이번 문의를 검토하고 답변하는 데 사용합니다. 구조화된 여행 선택은 여행 브리프 흐름과 여행 정보를 개선하기 위한 제한된 요약 집계에도 포함될 수 있습니다. 이 요약에는 연락처, 자유 입력 문구 또는 개별 문의가 표시되지 않습니다. 문의 제출은 관련 없는 마케팅 동의가 아니며 AI 채팅 서비스가 처리하지 않습니다.",
      blockersTitle: "핵심 원칙",
      blockers: [
        "문의는 Supabase 서울 리전에 저장되고 Resend 도쿄 리전에서 Homeground가 확인하는 Gmail로 알림을 보냅니다.",
        "Homeground가 관리하는 웹사이트 문의 기록은 저장 후 12개월 안에 삭제합니다. 고객 관계나 법적 의무 때문에 기록이 필요한 경우에는 필요한 기록만 별도 보관 기준에 따라 보관하며 웹사이트 사본을 더 오래 두지 않습니다. 이후 이메일 또는 WhatsApp 대화에는 각 서비스와 업무 기록 기준이 적용됩니다.",
        "비밀 키로 해시한 식별자는 10분 및 24시간 속도 제한 창에만 사용합니다. 각 버킷은 마지막 갱신 후 24시간이 지나면 삭제 대상으로 예약되며 일반적으로 다음 1분 주기 정리 작업에서 삭제됩니다.",
        "전체 여행 브리프 양식은 이메일 주소 또는 WhatsApp 번호 중 하나를 저장합니다. 홈페이지의 간단 이메일 옵션은 입력한 이메일을 저장하며, 공개된 프라이빗 투어 페이지에서 이동한 경우 연락 선택지 위에 표시된 허용 목록의 상품 식별 정보도 함께 저장합니다. 방문자가 해당 선택을 허용하지 않으면 선택적 분석 및 마케팅 측정은 꺼진 상태로 유지되며 AI 채팅은 사용하지 않습니다.",
      ],
    },
    hero: {
      eyebrow: "Homeground · 개인정보",
      title: "여행 문의는 이렇게 처리됩니다",
      intro:
        "여행 브리프 질문에 답한 뒤 이메일 주소 또는 WhatsApp 번호 중 하나로 문의를 제출할 수 있습니다. 이 양식은 현재 요청에 사람이 답하기 위한 것이며 자동 예약이나 관련 없는 마케팅 동의를 의미하지 않습니다.",
      reviewedLabel: "최근 검토일",
      reviewedValue: "2026년 8월 24일",
    },
    currentFlow: {
      title: "웹사이트에서 사람의 답장까지",
      paragraphs: [
        "여행자가 여행 브리프를 처음 조작한 뒤 양식은 진행 상태를 복원하기 위해 선택한 구조화 답변을 현재 브라우저 세션에 보관할 수 있습니다. ‘그 밖의 장소’ 자유 입력 문구, 동선 메모, 연락처, 선택 입력한 출발 국가 또는 지역과 대략적인 예산은 여기에 저장하지 않습니다. 30분 동안 조작하지 않거나 다시 시작하거나 문의 저장에 성공하면 이 브라우저 사본을 삭제합니다.",
        "여행자가 양식을 제출하면 Supabase가 여행 요청서, 선택한 이메일 주소 또는 WhatsApp 번호와 선택 입력한 출발 국가, 지역 또는 1인당 대략적인 예산을 검증하고 저장합니다. 저장에 성공한 뒤에만 화면에 저장 완료가 표시됩니다.",
        "홈페이지의 간단 이메일 옵션은 입력한 이메일 주소, 페이지 언어, 고정된 언어별 제출 화면 번호와 안정적인 제출 및 속도 제한에 필요한 최소한의 기술 기록을 전송합니다. 연락 영역이 공개된 프라이빗 투어 페이지에서 열렸다면 허용 목록으로 확인한 상품 slug, 공식 한국어 이름, 연락 옵션 위에 표시된 유효한 서비스 유형과 2명 또는 4명 선택도 전송하며, URL에서 임의로 제공한 상품 이름은 받지 않습니다. 동선, 여행자 정보, 날짜, 목적지, 예산 또는 자유 입력 문구는 수집하지 않으며 Supabase가 저장을 확인한 뒤에만 성공을 표시합니다.",
        "홈페이지의 WhatsApp 및 Messenger 옵션은 외부 서비스로 바로 이동하는 링크입니다. 링크를 여는 것만으로는 Homeground 웹사이트가 방문자의 전화번호나 메시지를 저장하지 않으며 제출된 문의로 처리하지 않습니다. 이후 방문자가 메시지를 보내면 WhatsApp 또는 Facebook과 Meta가 자체 약관과 인프라에 따라 대화를 처리합니다.",
        "방문자가 분석을 허용하면 Homeground는 임시 익명 브라우저 세션 토큰을 만듭니다. 이벤트 서비스는 먼저 짧은 유효기간의 서명된 자격 증명을 발급하며 자격 증명이 없거나 만료된 이벤트 요청은 거부합니다. 첫 유입 링크에 Homeground가 서명한 UTM 소스·매체·캠페인·콘텐츠 코드가 있을 때만 제한된 유입 정보를 기록하고, 서명이 없거나 변경되었거나 인식되지 않는 UTM 값은 ‘알 수 없음’으로 둡니다. 웹사이트 이벤트에는 전체 리퍼러 URL, 원본 IP, User-Agent, 광고 클릭 식별자, 연락처 또는 자유 입력 여행 답변을 저장하지 않습니다.",
        "분석을 허용하면 페이지 조회와 연락 옵션 보기, 연락 수단 선택, 연락 링크 열기, 이메일 입력 시작, 공개 상품 옵션 변경, 문의 제출 시도 등 정해진 동작을 기록할 수 있습니다. 자체 이벤트 서비스에는 공개 상품 코드, 서비스 유형, 화면에서 선택한 2명 또는 4명 옵션도 전송할 수 있으며, 이 상품 선택 항목은 Google Analytics나 Meta Pixel로 보내지 않습니다. 클릭은 해당 옵션을 열었다는 뜻일 뿐 메시지 전송이나 예약 완료를 증명하지 않습니다. 명확한 제출 실패와 브라우저가 결과를 확인하지 못한 경우는 구분하며, 저장된 문의는 서버 기록을 기준으로 집계합니다. 임시 재시도는 같은 이벤트 식별자를 사용하고 분석 동의를 철회하면 전송 대기 기록을 지웁니다.",
        "같은 브라우저에서 나중에 문의를 제출하면 저장된 첫 유입 표지를 문의에 연결해 어떤 페이지나 외부 게시물이 문의로 이어졌는지 확인할 수 있습니다. 세션이나 유입 정보가 없어도 문의는 정상 저장되며 알 수 없는 유입은 추정하거나 배분하지 않습니다.",
        "권한 있는 담당자는 제한된 집계 수치를 볼 수 있습니다. 최근 30일 창에 표시 기준을 충족하고 문의와 연결되지 않은 익명 세션이 5개 이상 있을 때만 날짜 단위의 최근 세션 요약이 표시되며 세션별 클릭 또는 이벤트 타임라인은 포함하지 않습니다. 연락처, 여행 설문 답변 및 메시지 내용은 분석 이벤트에 포함하지 않고 Google Analytics 또는 Meta Pixel로 보내지 않습니다.",
        "이후 Resend가 Homeground가 확인하는 Gmail로 알림을 보냅니다. 이메일 문의에는 여행자 주소를 Reply-To로 사용합니다. WhatsApp 문의에는 권한이 있는 담당자가 스튜디오 계정으로 요청된 대화를 시작할 수 있는 링크를 제공합니다.",
        "Homeground는 현재 공동 처리를 위해 해당 Gmail과 스튜디오 WhatsApp 계정을 SaleSmartly에 연결합니다. 따라서 알림, 제출한 여행 정보와 이후 메시지가 권한 있는 담당자만 사용하는 SaleSmartly 팀 받은편지함에도 동기화될 수 있습니다.",
        "WhatsApp을 선택하고 제출하면 Homeground가 이 여행 요청과 관련해 해당 번호로 연락해 달라고 요청하는 것입니다. 이후 대화는 WhatsApp과 Meta가 자체 약관과 인프라에 따라 처리합니다.",
        "현재 웹사이트에는 온라인 결제가 없습니다. US$69 또는 US$129 서면 컨설팅이 수락되면 범위와 제공 예정일을 먼저 확인하고 결제 방법을 별도로 안내합니다. 문의 양식에 카드, 계좌 또는 결제 QR 정보를 제출하지 마세요.",
        "간단 이메일 양식을 사용할 수 없을 때 연락 카드가 같은 모니터링 메일함으로 보내는 미리 작성된 이메일 링크를 제공합니다. 이메일 앱을 여는 것을 웹사이트 저장 또는 제출 성공으로 표시하지 않습니다.",
      ],
    },
    collection: {
      eyebrow: "목적과 항목",
      title: "현재 문의에 필요한 정보만",
      intro:
        "구조화된 여행 답변은 제출 전에 브라우저에서 준비할 수 있습니다. 문의 항목은 직접 제출할 때만 전송되며 아래 웹사이트 측정 항목은 해당 선택 기능을 허용한 뒤에만 사용합니다.",
      items: [
        {
          name: "여행 요청서",
          stage:
            "브라우저 세션, 제출된 문의, 알림 및 연결된 팀 받은편지함",
          purpose:
            "선택한 목적지, 추가 장소, 총 숙박일수, 일행, 속도, 꼭 가야 할 우선순위, 시간 상태, 페이지 언어와 내부 규칙 버전으로 요청을 설명합니다. 같은 기준으로 처리할 수 있는 구조화 선택은 여행 브리프 흐름과 여행 정보를 개선하기 위한 제한된 집계에 포함될 수 있으며 ‘그 밖의 장소’ 자유 입력 문구는 집계에서 제외합니다.",
        },
        {
          name: "선택 입력한 공개 프라이빗 투어 관심 상품",
          stage:
            "홈페이지 연락 영역, 제출된 간단 이메일 문의 또는 미리 작성된 WhatsApp·이메일 메시지",
          purpose:
            "공개된 프라이빗 투어 페이지에서 이동한 여행자는 허용 목록으로 확인한 상품 slug와 공식 현지화 이름을 연락 과정에 유지할 수 있습니다. URL에서 제공한 상품 이름과 자유 입력 문구는 거부하며, 이 정보는 문의 대상 투어를 식별하는 데만 사용합니다.",
        },
        {
          name: "선택한 답변 연락처",
          stage:
            "제출된 문의, Gmail 알림 및 연결된 팀 받은편지함",
          purpose:
            "전체 여행 브리프 양식은 이메일 주소 또는 WhatsApp 번호 중 하나를 받으며 홈페이지의 간단 연락 옵션은 이메일만 받습니다. 연락처는 현재 요청에 답하는 데만 사용하고 관련 없는 마케팅 동의로 보지 않습니다. 홈페이지의 WhatsApp 및 Messenger 바로가기 링크는 Homeground 웹사이트에 연락처를 저장하지 않습니다.",
        },
        {
          name: "선택 입력한 출발 국가 또는 지역",
          stage:
            "입력한 경우 제출된 문의, 알림 및 연결된 팀 받은편지함",
          purpose:
            "이 선택 정보는 여행자가 어디에서 출발할 가능성이 있는지 이해하는 데 도움이 되며 나중에 알려 줘도 됩니다.",
        },
        {
          name: "선택 입력한 1인당 대략적인 예산",
          stage:
            "입력한 경우 제출된 문의, 알림 및 연결된 팀 받은편지함",
          purpose:
            "여행자가 입력한 금액 또는 범위는 현실적인 선택지를 준비하는 데만 사용합니다. 국제선 항공권은 제외하며 Homeground의 정식 견적이 아니고 비워 둘 수 있습니다.",
        },
        {
          name: "기술 요청 기록",
          stage: "문의 서비스",
          purpose:
            "공개 문의 번호, 시간, 양식 버전, 요청서 수정 정보, 고정된 언어별 제출 화면 번호와 제한된 악용 방지 데이터로 안정적인 제출과 중복 방지를 지원합니다. 제출 화면 번호는 유입 출처로 취급하지 않습니다.",
        },
        {
          name: "선택적 익명 웹사이트 측정",
          stage:
            "브라우저, Homeground 퍼스트파티 이벤트 서비스 및 선택적 Google Analytics 또는 Meta Pixel",
          purpose:
            "허용 후 임시 세션 토큰, 짧은 유효기간의 서명된 이벤트 자격 증명, 페이지 경로, 언어, Homeground가 서명한 첫 캠페인 코드와 고정 이벤트 코드, 자체 서비스에만 전달하는 공개 상품·서비스 유형·인원 옵션은 유용한 페이지와 연락 시도를 이해하는 데 사용됩니다. 서명되지 않은 캠페인 표지는 ‘알 수 없음’으로 둡니다. 이벤트 서비스는 이름, 이메일, 전화번호, 여행 설문 답변, 메시지, 원본 IP, User-Agent 또는 전체 리퍼러 URL을 저장하지 않습니다.",
        },
      ],
    },
    providers: {
      eyebrow: "서비스 제공업체",
      title: "문의 과정에서 사용하는 서비스",
      intro:
        "아래 지역은 현재 설정된 주요 서비스 리전입니다. 각 제공업체는 전송, 보안, 기술 지원 및 법적 의무를 위해 글로벌 인프라를 사용할 수 있으므로 여행자의 국가 밖에서 정보가 처리될 수 있습니다.",
      rows: [
        {
          label: "웹사이트 호스팅",
          value: "GitHub Pages · Cloudflare 엣지 전송 및 보안",
          detail:
            "GitHub Pages가 정적 사이트를 호스팅하고 Cloudflare가 엣지에서 DNS, 콘텐츠 전송 및 보안을 제공합니다. 두 서비스는 각 약관에 따라 IP 주소, 요청 시각, 요청 경로와 같은 일반 요청 메타데이터를 처리할 수 있습니다. Cloudflare Web Analytics와 브라우저 RUM은 비활성화되어 있습니다.",
        },
        {
          label: "스튜디오 메일함",
          value: "Google Gmail · Homeground가 확인하는 메일함",
          detail:
            "알림과 이후 이메일 대화를 보관합니다. Google은 글로벌 인프라에서 정보를 처리할 수 있으며 Homeground는 Gmail의 정확한 물리적 저장 지역을 약속하지 않습니다. 웹사이트는 Gmail 비밀번호를 사용하지 않습니다.",
        },
        {
          label: "문의 저장",
          value: "Supabase · 서울(ap-northeast-2)",
          detail: "접수 완료를 표시하기 전에 문의를 검증하고 저장합니다.",
        },
        {
          label: "메일 알림",
          value: "Resend · 도쿄(ap-northeast-1)",
          detail:
            "저장된 문의를 Gmail로 보내고 Reply-To에 여행자 이메일을 넣습니다.",
        },
        {
          label: "WhatsApp 및 Messenger",
          value: "홈페이지 바로가기; 전체 브리프의 선택적 WhatsApp 번호 저장",
          detail:
            "홈페이지 링크는 방문자의 번호나 메시지를 Homeground 웹사이트에 저장하지 않고 WhatsApp 또는 Messenger로 바로 이동합니다. 전체 여행 브리프 양식에서는 별도로 WhatsApp 번호를 제출할 수 있어 권한 있는 담당자가 요청된 대화를 시작할 수 있습니다. WhatsApp, Facebook 및 Meta는 자체 약관과 인프라에 따라 이후 메시지를 처리할 수 있습니다.",
        },
        {
          label: "공유 팀 받은편지함",
          value: "SaleSmartly · 연결된 Gmail 및 WhatsApp 채널",
          detail:
            "선택한 Gmail 폴더와 WhatsApp 대화를 동기화하여 권한 있는 스튜디오 구성원이 함께 문의를 처리할 수 있게 합니다. SaleSmartly와 그 서비스 제공업체는 자체 약관과 인프라에 따라 이 정보를 처리할 수 있습니다.",
        },
        {
          label: "웹사이트 측정",
          value:
            "Supabase 퍼스트파티 이벤트 · Google Analytics · Meta Pixel(선택)",
          detail:
            "방문자가 해당 선택을 허용하기 전에는 어떤 선택적 서비스에도 웹사이트 이벤트를 보내지 않습니다. 분석 허용은 제한된 퍼스트파티 이벤트와 Google Analytics를, 마케팅 허용은 별도로 Meta Pixel을 사용합니다. 연락처, 여행 답변 및 메시지는 이 도구들로 보내지 않으며 AI 채팅도 사용하지 않습니다.",
        },
      ],
    },
    configuration: {
      eyebrow: "보관과 책임",
      title: "정보 보관 기간",
      intro:
        "다음 기준은 Homeground가 관리하는 문의 기록과 서비스 사본에 적용됩니다. 제공업체는 보안, 결제 또는 법적 의무에 필요한 제한된 기록을 별도로 보관할 수 있습니다.",
      rows: [
        {
          label: "개인정보처리자 및 웹사이트 운영 사업자",
          value: `${homegroundBusiness.registeredName}(${homegroundBusiness.brand} 브랜드 운영)`,
          detail:
            "등록 사업자가 이 웹사이트와 접수된 Homeground China 문의 기록을 책임집니다. Homeground China는 이 등록 사업자가 사용하는 대외 브랜드입니다.",
        },
        {
          label: "처리 및 저장 지역",
          value:
            "Supabase 서울 · Resend 도쿄 · Gmail, WhatsApp 및 SaleSmartly 제공업체 인프라",
          detail:
            "서울과 도쿄는 현재 설정된 주요 리전이며 이메일 전송, 팀 받은편지함 동기화, WhatsApp 대화, 보안 및 기술 지원에는 다른 국가의 제공업체 인프라가 사용될 수 있습니다.",
        },
        {
          label: "문의 정보 보관",
          value: "웹사이트 문의가 저장된 시점부터 최대 12개월",
          detail:
            "이후 이메일 또는 WhatsApp 활동은 웹사이트 기간을 다시 시작하지 않습니다. 문의가 고객 또는 계약 관계로 이어지면 서비스, 업무 기록 및 법적 의무에 따라 관련 기록을 별도로 보관할 수 있습니다.",
        },
        {
          label: "거래 및 서비스 기록",
          value: "적용되는 업무 기록 보관 기준에 따라 보관",
          detail:
            "서면 컨설팅이 수락되면 서비스 확인, 합의 범위, 가격과 통화, 결제 확인, 제공 관련 대화, 수정 또는 환불 기록을 서비스 이행, 회계, 분쟁 및 법적 의무를 위해 보관할 수 있습니다. 해당 기록에는 웹사이트 문의의 12개월 삭제 기간이 적용되지 않습니다.",
        },
        {
          label: "속도 제한 정보 보관",
          value: "10분 및 24시간 창 · 마지막 갱신 24시간 후 삭제",
          detail:
            "형식 검증을 통과한 자격 증명 시작 요청은 자격 증명을 발급하기 전에 요청 수를 기준으로 클라이언트 IP 및 사이트 전체 제한에 계산합니다. 이벤트 배치는 별도로 새로 수락된 이벤트 수를 기준으로 계산하며 이벤트 배치 HTTP 요청 수나 중복 재전송 횟수를 세지 않고 브라우저 세션, 클라이언트 IP 및 사이트 전체 제한을 적용합니다. 원본 IP나 브라우저 토큰은 저장하지 않고 비밀 키로 생성한 해시만 저장합니다. 1분마다 실행되는 작업은 버킷의 updated_at 마지막 갱신 시점에서 24시간이 지나면 일반적으로 다음 정리 때 삭제합니다.",
        },
        {
          label: "익명 웹사이트 이벤트 보관",
          value: "원본 이벤트와 익명 세션 · 30일 이동식 보관 기간",
          detail:
            "브라우저 토큰은 분석을 허용한 뒤 세션 저장소에만 보관하며 서버에는 비밀 키로 만든 세션 해시만 저장합니다. 원본 이벤트, 익명 세션 및 되돌릴 수 있는 세션 연결은 30일 시점에 만료되며 매시간 실행되는 정리 작업으로 일반적으로 그다음 한 시간 안에 삭제됩니다. 제출된 문의에 붙은 첫 유입 스냅샷은 문의 보관 기간을 따릅니다.",
        },
        {
          label: "열람·수정·삭제",
          value: "본인 확인 후 원칙적으로 30일 이내 처리",
          detail:
            "별도로 보관하는 계약, 법적 의무, 분쟁 또는 보안 기록에는 합법적인 삭제 제한이 있을 수 있으나 웹사이트 문의 기록은 정해진 기간 안에 삭제합니다.",
        },
      ],
    },
    choices: {
      eyebrow: "여행자의 선택",
      title: "제출 여부는 여행자가 정합니다",
      paragraphs: [
        "여행 브리프 답변은 여행자가 한 가지 답변 연락처를 입력하고 직접 제출할 때까지 브라우저에만 남습니다. 제출 전에 나가거나 다시 시작하면 Homeground에 문의가 전송되지 않습니다.",
        "현재 문의 처리와 마케팅 동의는 별개입니다. 별도 동의 없이 제출한 연락처를 관련 없는 마케팅에 사용하지 않습니다.",
        "방문자는 분석과 마케팅 측정을 각각 허용하거나 거부할 수 있으며 바닥글의 개인정보 선택에서 언제든 다시 변경할 수 있습니다. 선택적 측정을 거부해도 플래너와 문의 양식을 사용할 수 있고, 동의를 철회하면 이후 이벤트를 중단하고 기술적으로 가능한 관련 브라우저 데이터를 정리합니다.",
      ],
      items: [
        "문의 양식을 제출하지 않을 수 있습니다.",
        "합리적인 본인 확인 후 보관 정보의 열람, 수정 또는 삭제를 요청할 수 있습니다.",
        "제출 전에 여행 브리프를 다시 시작하거나 페이지를 나갈 수 있습니다.",
        "이메일 또는 WhatsApp으로 사람의 답장을 받도록 선택하고 출발 국가, 지역 또는 대략적인 예산은 비워 둘 수 있습니다.",
        "필수 기능만 사용하거나 마케팅 없이 분석만 허용하거나 나중에 두 선택을 변경할 수 있습니다.",
      ],
    },
    contact: {
      eyebrow: "개인정보 문의",
      title: "정보 처리와 관련해 Homeground에 문의하기",
      body:
        "열람, 수정 또는 삭제 요청은 아래 이메일로 보내 주세요. 가능하면 문의에 사용한 같은 주소에서 보내 주세요. 합리적인 본인 확인 후 Homeground는 원칙적으로 30일 이내에 처리합니다.",
      emailLabel: "개인정보 문의 이메일",
      emailPlaceholder: privacyEmail,
      addressLabel: "우편 연락처",
      addressPlaceholder: homegroundBusiness.registeredAddress,
    },
    footer:
      "이 안내는 Homeground 여행 브리프, 문의 서비스 및 선택 동의 기반 웹사이트 측정에 적용됩니다. 문의 제출은 관련 없는 마케팅 동의가 아니며 AI 채팅은 사용하지 않습니다.",
  },
};

export function getHomegroundPrivacyCopy(
  locale: HomegroundPrivacyLocale,
): HomegroundPrivacyCopy {
  return homegroundPrivacyCopy[locale];
}
