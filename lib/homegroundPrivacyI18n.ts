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
        "How Homeground handles route, contact and travel enquiry information.",
    },
    skipLink: "Skip to privacy notice",
    navigation: {
      homeLabel: "Homeground China home",
      languageLabel: "Choose privacy notice language",
      privacyLabel: "Privacy",
      homeCta: "Back to route finder",
    },
    status: {
      eyebrow: "Enquiry privacy at a glance",
      title: "Your details are used for a human reply",
      body:
        "Homeground uses the route and email details you submit to review and answer your travel request. If you choose WhatsApp, the website prepares a route summary but does not ask for or store your WhatsApp number. An enquiry is not consent to unrelated marketing, and it is not handled by an AI chat service.",
      blockersTitle: "Key points",
      blockers: [
        "Enquiries are stored in Supabase’s Seoul region and notifications are sent through Resend’s Tokyo region to Homeground’s monitored Gmail inbox.",
        "Homeground-controlled enquiry, notification and conversation records are kept for no more than 12 months after the last substantive contact, unless a client relationship or legal duty requires longer.",
        "Hashed identifiers are used for 24-hour rate-limit windows and are scheduled for deletion after 24 hours, normally at the next one-minute cleanup run.",
        "When the website offers a direct WhatsApp handoff, it does not collect a traveller’s WhatsApp number; non-essential analytics and AI chat remain disabled.",
      ],
    },
    hero: {
      eyebrow: "Homeground · privacy",
      title: "How an enquiry is handled",
      intro:
        "After seeing a starting route, a traveller can send an email enquiry or open a prepared WhatsApp message. The email form is for replying to that active request, not for automatic booking or unrelated marketing.",
      reviewedLabel: "Last reviewed",
      reviewedValue: "19 July 2026",
    },
    currentFlow: {
      title: "From the website to a human reply",
      paragraphs: [
        "The route finder may keep the four route answers in this browser’s session storage so progress can be restored. It does not store the traveller’s email address or optional note there.",
        "When a traveller submits the email form, Supabase validates and saves the route context, email address and optional trip note. The page shows a saved state only after that save succeeds.",
        "If the landing URL contains utm_source, utm_medium or utm_campaign labels, they are stored with the submitted email enquiry to show how that request reached Homeground. They are not added to the WhatsApp message and are not used for cross-site tracking.",
        "Resend then sends a notification to Homeground’s monitored Gmail inbox. For email enquiries, Reply-To is the traveller’s address, so a person can answer directly from the Gmail thread.",
        "If a traveller chooses WhatsApp, clicking the direct link passes the structured route summary and page language to WhatsApp to prepare a message. The link does not contain the traveller’s email, name, phone number or optional note, and it does not create a website enquiry.",
        "Homeground receives the WhatsApp message and the traveller’s WhatsApp number only after the traveller taps Send in WhatsApp. The website cannot confirm whether WhatsApp opened or whether the message was sent.",
        "A prepared email link is only an emergency fallback after the service confirms that an enquiry was not saved. It is not the normal contact path and opening it is never described as a successful submission.",
      ],
    },
    collection: {
      eyebrow: "Purpose and fields",
      title: "Only what is needed for the active request",
      intro:
        "A traveller can use the route finder without contacting Homeground. These are the information groups used if they later send an email enquiry or open the direct WhatsApp handoff.",
      items: [
        {
          name: "Route context",
          stage: "Browser session, submitted email enquiry or WhatsApp prefill",
          purpose:
            "Party, travel style, total nights, pace, proposed cities and page language describe the starting route. An email enquiry also keeps the internal route version; the WhatsApp prefill does not.",
        },
        {
          name: "Traveller email",
          stage: "Submitted enquiry and Gmail notification",
          purpose:
            "The address entered by the traveller is used to reply to this enquiry. It is not consent for unrelated marketing.",
        },
        {
          name: "Optional trip note",
          stage: "Submitted with an email enquiry only when entered",
          purpose:
            "Fixed dates, flights, cities, walking needs and other priorities help a person review the route. Medical records should not be entered.",
        },
        {
          name: "Direct WhatsApp handoff",
          stage: "Outbound link after the traveller chooses WhatsApp",
          purpose:
            "The structured route summary and page language are passed to WhatsApp to prepare a message. The website does not ask for a WhatsApp number; Homeground receives the message and number only after the traveller taps Send.",
        },
        {
          name: "Technical request record",
          stage: "Email enquiry service",
          purpose:
            "A public reference, time, form version, route revision, landing path, optional URL campaign labels and limited anti-abuse data support reliable submission, source understanding and duplicate prevention.",
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
          value: "GitHub Pages · static public site",
          detail:
            "Serves the website and may process ordinary web-request metadata under GitHub’s terms.",
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
          label: "WhatsApp",
          value: "Direct handoff · no website number field",
          detail:
            "Receives the structured route summary when the traveller opens the direct link. The studio receives the message and traveller number only after the traveller taps Send. WhatsApp and Meta may process the handoff and later conversation under their own terms and infrastructure.",
        },
        {
          label: "Analytics and AI chat",
          value: "Disabled",
          detail:
            "The current site does not use non-essential analytics, third-party marketing tracking or an AI chat widget. Simple campaign labels already present in the landing URL may be attached to a submitted email enquiry.",
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
          label: "Data controller",
          value: "Homeground China studio",
          detail:
            "The studio decides how enquiry information is used to answer and plan the traveller’s request.",
        },
        {
          label: "Processing and storage region",
          value:
            "Supabase Seoul · Resend Tokyo · Gmail and WhatsApp global infrastructure",
          detail:
            "These are the configured primary regions; email delivery, WhatsApp conversations, security and support may involve provider infrastructure in other countries.",
        },
        {
          label: "Inquiry retention",
          value: "Up to 12 months after the last substantive contact",
          detail:
            "If the enquiry becomes a client or contractual relationship, relevant records may be kept longer to provide the service, maintain business records and meet legal obligations.",
        },
        {
          label: "Rate-limit retention",
          value: "24-hour window · scheduled deletion after expiry",
          detail:
            "The service stores a secret-keyed hash rather than a raw IP address. A one-minute recurring task removes buckets after they pass 24 hours, so deletion normally occurs on the next cleanup run.",
        },
        {
          label: "Access, correction and deletion",
          value: "Verified requests are normally handled within 30 days",
          detail:
            "Homeground may ask for reasonable identity verification. Deletion does not apply where records must be kept for a contract, legal obligation, dispute or security purpose.",
        },
      ],
    },
    choices: {
      eyebrow: "Traveller choices",
      title: "Contact remains optional",
      paragraphs: [
        "The route finder can be used without giving Homeground an email address or opening WhatsApp. Sending the email form and opening WhatsApp are separate, deliberate actions.",
        "Enquiry processing is separate from marketing consent. Homeground will not use an enquiry address for unrelated marketing without separate permission.",
      ],
      items: [
        "Do not submit the email form or open the WhatsApp handoff.",
        "Ask what personal information is held and request access, correction or deletion after reasonable identity verification.",
        "Continue using the route finder without contacting Homeground.",
        "Receive a human reply by email, or choose to leave the site and start a WhatsApp conversation.",
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
      addressPlaceholder: "Available when legally required",
    },
    footer:
      "This notice covers Homeground’s current route finder, email enquiry service and direct WhatsApp handoff. It does not provide marketing consent or enable AI chat or non-essential analytics.",
  },
  zh: {
    htmlLang: "zh-Hans",
    pagePath: "/zh/privacy/",
    homePath: "/zh/",
    languageShort: "中文",
    metadata: {
      title: "隐私说明 | Homeground China",
      description: "Homeground 如何处理路线、联系方式和旅行咨询信息。",
    },
    skipLink: "跳到隐私说明正文",
    navigation: {
      homeLabel: "Homeground China 首页",
      languageLabel: "选择隐私说明语言",
      privacyLabel: "隐私",
      homeCta: "返回路线工具",
    },
    status: {
      eyebrow: "咨询隐私摘要",
      title: "你的信息只用于人工回复",
      body:
        "Homeground 使用你主动提交的路线与邮箱信息来人工复核和回复本次旅行需求。选择 WhatsApp 时，网站只准备路线摘要，不会要求或保存你的 WhatsApp 号码。提交咨询不代表同意无关营销，也不会交给 AI 聊天服务处理。",
      blockersTitle: "关键规则",
      blockers: [
        "咨询存储在 Supabase 首尔地区，并由 Resend 东京地区发送通知到 Homeground 持续查看的 Gmail。",
        "Homeground 控制的咨询、通知与后续对话记录，最多保留到最后一次实质联系后的 12 个月；形成客户或合同关系、或法律另有要求时除外。",
        "经过密钥哈希的标识只用于 24 小时限流窗口；超过 24 小时后，通常会在下一次每分钟清理任务运行时删除。",
        "当网站显示 WhatsApp 直接入口时，网站不会收集访客的 WhatsApp 号码；非必要统计和 AI 聊天仍处于关闭状态。",
      ],
    },
    hero: {
      eyebrow: "Homeground · 隐私",
      title: "一次咨询会如何被处理",
      intro:
        "看到初步路线后，访客可以发送邮件咨询，或打开已经填入路线摘要的 WhatsApp 消息。邮件表单只用于回复当前咨询，不代表自动预订，也不等于同意无关营销。",
      reviewedLabel: "最近复核",
      reviewedValue: "2026 年 7 月 19 日",
    },
    currentFlow: {
      title: "从网站到人工回复",
      paragraphs: [
        "路线工具可能把四项路线答案保存在当前浏览器会话中，以便恢复进度；访客的邮箱和选填说明不会存入这里。",
        "访客提交邮件表单时，Supabase 会验证并保存路线背景、邮箱和选填旅行说明。只有保存成功后，网页才会显示已保存。",
        "如果落地页网址包含 utm_source、utm_medium 或 utm_campaign 标签，这些标签会随已提交的邮件咨询保存，用于了解该咨询如何到达 Homeground；它们不会写入 WhatsApp 消息，也不会用于跨网站追踪。",
        "随后，Resend 会把通知送到 Homeground 持续查看的 Gmail。对于邮件咨询，Reply-To 会设置为访客填写的邮箱，因此工作人员可以在 Gmail 会话中直接回复。",
        "如果访客选择 WhatsApp，打开直接入口时，结构化路线摘要和页面语言会交给 WhatsApp，用于准备一条尚未发送的消息。入口中不包含访客邮箱、名字、电话号码或选填说明，也不会生成网站咨询记录。",
        "只有访客在 WhatsApp 中选择“发送”后，Homeground 才会收到消息和访客的 WhatsApp 号码。网站无法确认 WhatsApp 是否成功打开，也无法确认消息是否已经发送。",
        "只有当系统明确确认咨询没有保存时，页面才可提供预填邮件作为应急方式。它不是正常入口，打开邮件应用也绝不能被描述成提交成功。",
      ],
    },
    collection: {
      eyebrow: "目的和字段",
      title: "只收集当前咨询需要的信息",
      intro:
        "访客可以只使用路线工具而不联系 Homeground。之后发送邮件咨询或打开 WhatsApp 直接入口时，会使用以下几类信息。",
      items: [
        {
          name: "路线背景",
          stage: "浏览器会话、已提交邮件咨询或 WhatsApp 预填消息",
          purpose:
            "同行者、旅行偏好、总晚数、节奏、建议城市和页面语言用于描述初步路线。邮件咨询还会保存内部路线版本；WhatsApp 预填消息不会包含该版本。",
        },
        {
          name: "访客邮箱",
          stage: "已提交咨询与 Gmail 通知",
          purpose:
            "访客自己填写的邮箱只用于回复本次咨询，不代表同意接收无关营销。",
        },
        {
          name: "选填旅行说明",
          stage: "仅随邮件咨询，访客填写后才提交",
          purpose:
            "固定日期、航班、城市、步行需求和其他重点用于人工复核路线。请不要填写病历等医疗记录。",
        },
        {
          name: "WhatsApp 直接接力",
          stage: "访客选择 WhatsApp 后打开的外部入口",
          purpose:
            "结构化路线摘要和页面语言会交给 WhatsApp 准备消息。网站不会要求 WhatsApp 号码；只有访客选择“发送”后，Homeground 才会收到消息和号码。",
        },
        {
          name: "技术请求记录",
          stage: "邮件咨询服务",
          purpose:
            "公开咨询编号、时间、表单版本、路线修订、落地页路径、可选的网址活动标签和有限的防滥用信息，用于可靠提交、了解来源与避免重复。",
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
          value: "GitHub Pages · 静态公开网站",
          detail: "提供网页，并可能依据 GitHub 条款处理普通访问请求信息。",
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
          label: "WhatsApp",
          value: "直接接力 · 网站不填写号码",
          detail:
            "访客打开直接入口时，WhatsApp 会收到结构化路线摘要用于准备消息；只有访客选择“发送”后，工作室才会收到消息和号码。WhatsApp 与 Meta 可能依据其自身条款和基础设施处理这次接力及后续对话。",
        },
        {
          label: "统计与 AI 聊天",
          value: "关闭",
          detail:
            "当前网站不使用非必要统计、第三方营销追踪或 AI 聊天组件。落地页网址中已有的简单活动标签可能随已提交的邮件咨询保存。",
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
          label: "数据控制者",
          value: "Homeground China 工作室",
          detail: "工作室决定如何使用咨询信息来回复并规划访客的请求。",
        },
        {
          label: "处理与存储地区",
          value: "Supabase 首尔 · Resend 东京 · Gmail 与 WhatsApp 全球基础设施",
          detail:
            "首尔和东京是当前配置的主要地区；邮件投递、WhatsApp 对话、安全和技术支持可能使用服务商在其他国家或地区的基础设施。",
        },
        {
          label: "咨询信息保留",
          value: "最后一次实质联系后最多 12 个月",
          detail:
            "如果咨询形成客户或合同关系，相关记录可为履行服务、保存业务记录和遵守法律义务而保留更长时间。",
        },
        {
          label: "限流数据保留",
          value: "24 小时限流窗口 · 过期后定时删除",
          detail:
            "系统不保存原始 IP，只保存使用秘密密钥生成的哈希。每分钟运行的任务会删除超过 24 小时的限流桶，通常在下一次清理时完成。",
        },
        {
          label: "查询、更正与删除",
          value: "身份核验后的申请原则上 30 天内处理",
          detail:
            "如合同履行、法律义务、争议处理或安全需要必须继续保留，删除权不适用于相应记录。",
        },
      ],
    },
    choices: {
      eyebrow: "访客的选择",
      title: "是否联系始终由访客决定",
      paragraphs: [
        "访客无需提供邮箱或打开 WhatsApp，也可以使用路线工具。提交邮件表单和打开 WhatsApp 都是单独、主动的操作。",
        "处理当前咨询与营销许可相互独立。未经单独同意，Homeground 不会把咨询邮箱用于无关营销。",
      ],
      items: [
        "选择不提交邮件表单，也不打开 WhatsApp。",
        "在合理核验身份后，查询已保存的信息并申请访问、更正或删除。",
        "不联系 Homeground，继续使用路线工具。",
        "通过邮箱接收人工回复，或主动离开网站并在 WhatsApp 中发起对话。",
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
      addressPlaceholder: "法律要求时提供",
    },
    footer:
      "本说明适用于 Homeground 当前的路线工具、邮件咨询服务和 WhatsApp 直接接力，不构成营销许可，也不启用 AI 聊天或非必要统计。",
  },
  ko: {
    htmlLang: "ko",
    pagePath: "/ko/privacy/",
    homePath: "/ko/",
    languageShort: "한국어",
    metadata: {
      title: "개인정보 안내 | Homeground China",
      description:
        "Homeground가 여행 동선, 연락처 및 문의 정보를 처리하는 방식입니다.",
    },
    skipLink: "개인정보 안내 본문으로 바로가기",
    navigation: {
      homeLabel: "Homeground China 홈",
      languageLabel: "개인정보 안내 언어 선택",
      privacyLabel: "개인정보",
      homeCta: "여행 동선 찾기로 돌아가기",
    },
    status: {
      eyebrow: "문의 개인정보 요약",
      title: "제출한 정보는 사람의 답변에만 사용합니다",
      body:
        "Homeground는 여행자가 직접 제출한 여행 동선과 이메일 정보를 이번 여행 요청을 검토하고 답변하는 데 사용합니다. WhatsApp을 선택하면 웹사이트는 여행 동선 요약만 준비하며 WhatsApp 번호를 요청하거나 저장하지 않습니다. 문의 제출은 관련 없는 마케팅 동의가 아니며 AI 채팅 서비스가 처리하지 않습니다.",
      blockersTitle: "핵심 원칙",
      blockers: [
        "문의는 Supabase 서울 리전에 저장되고 Resend 도쿄 리전에서 Homeground가 확인하는 Gmail로 알림을 보냅니다.",
        "Homeground가 관리하는 문의·알림·후속 대화 기록은 마지막 실질적인 연락 후 최대 12개월 동안 보관합니다. 고객 또는 계약 관계가 형성되었거나 법적 의무가 있는 경우는 예외입니다.",
        "비밀 키로 해시한 식별자는 24시간 속도 제한 창에만 사용하며 24시간이 지나면 일반적으로 다음 1분 주기 정리 작업에서 삭제합니다.",
        "웹사이트에 WhatsApp 직접 연결 선택지가 표시되는 경우에도 여행자의 WhatsApp 번호를 수집하지 않습니다. 필수적이지 않은 분석과 AI 채팅은 계속 사용하지 않습니다.",
      ],
    },
    hero: {
      eyebrow: "Homeground · 개인정보",
      title: "여행 문의는 이렇게 처리됩니다",
      intro:
        "초기 여행 동선을 확인한 뒤 이메일 문의를 보내거나 여행 동선 요약이 미리 입력된 WhatsApp 메시지를 열 수 있습니다. 이메일 양식은 현재 요청에 답하기 위한 것이며 자동 예약이나 관련 없는 마케팅 동의를 의미하지 않습니다.",
      reviewedLabel: "최근 검토일",
      reviewedValue: "2026년 7월 19일",
    },
    currentFlow: {
      title: "웹사이트에서 사람의 답장까지",
      paragraphs: [
        "여행 동선 찾기는 진행 상태를 복원하기 위해 네 가지 답변을 현재 브라우저 세션에 보관할 수 있습니다. 이메일과 선택 메모는 여기에 저장하지 않습니다.",
        "여행자가 이메일 양식을 제출하면 Supabase가 여행 동선 정보, 이메일 주소와 선택 여행 메모를 검증하고 저장합니다. 저장에 성공한 뒤에만 화면에 저장 완료가 표시됩니다.",
        "방문 주소에 utm_source, utm_medium 또는 utm_campaign 표지가 있으면 Homeground에 문의가 유입된 경로를 확인하기 위해 제출된 이메일 문의와 함께 저장합니다. 이 표지는 WhatsApp 메시지에 넣지 않으며 사이트 간 추적에 사용하지 않습니다.",
        "이후 Resend가 Homeground가 확인하는 Gmail로 알림을 보냅니다. 이메일 문의의 Reply-To는 여행자가 입력한 주소이므로 담당자가 Gmail 대화에서 직접 답장할 수 있습니다.",
        "WhatsApp 직접 연결을 선택하는 시점에 구조화된 여행 동선 요약과 페이지 언어가 WhatsApp으로 전달되어 아직 보내지 않은 메시지로 준비됩니다. 이 주소에는 여행자의 이메일, 이름, 전화번호 또는 선택 메모가 포함되지 않으며 웹사이트 문의 기록도 생성되지 않습니다.",
        "여행자가 WhatsApp에서 ‘보내기’를 선택한 뒤에만 Homeground가 메시지와 여행자의 WhatsApp 번호를 받습니다. 웹사이트에서는 WhatsApp이 실제로 열리는지 또는 메시지가 전송되었는지 확인할 수 없습니다.",
        "서비스가 문의를 저장하지 않았다고 명확히 확인한 경우에만 작성된 이메일을 비상 대안으로 제공합니다. 이는 일반 문의 경로가 아니며 이메일 앱을 여는 것을 접수 완료라고 표시하지 않습니다.",
      ],
    },
    collection: {
      eyebrow: "목적과 항목",
      title: "현재 문의에 필요한 정보만",
      intro:
        "Homeground에 연락하지 않고 여행 동선 찾기만 이용할 수 있습니다. 이후 이메일 문의를 보내거나 WhatsApp 직접 연결을 열 때 다음 정보가 사용됩니다.",
      items: [
        {
          name: "여행 동선 정보",
          stage: "브라우저 세션, 제출된 이메일 문의 또는 WhatsApp 미리 입력 메시지",
          purpose:
            "일행, 여행 취향, 총 숙박일수, 속도, 추천 도시와 페이지 언어로 첫 동선을 설명합니다. 이메일 문의에는 내부 동선 버전도 저장하지만 WhatsApp 미리 입력 메시지에는 넣지 않습니다.",
        },
        {
          name: "여행자 이메일",
          stage: "제출된 문의와 Gmail 알림",
          purpose:
            "여행자가 직접 입력한 주소는 이 문의에 답하는 데만 사용하며 관련 없는 마케팅 동의로 보지 않습니다.",
        },
        {
          name: "선택 여행 메모",
          stage: "이메일 문의에서 여행자가 입력한 경우에만 제출",
          purpose:
            "확정 날짜, 항공편, 도시, 도보 조건과 우선순위는 사람의 검토에 사용합니다. 진료 기록은 입력하지 마세요.",
        },
        {
          name: "WhatsApp 직접 연결",
          stage: "여행자가 WhatsApp을 선택한 뒤 여는 외부 주소",
          purpose:
            "구조화된 여행 동선 요약과 페이지 언어가 WhatsApp으로 전달되어 메시지를 준비합니다. 웹사이트는 WhatsApp 번호를 요청하지 않으며 여행자가 ‘보내기’를 선택한 뒤에만 Homeground가 메시지와 번호를 받습니다.",
        },
        {
          name: "기술 요청 기록",
          stage: "이메일 문의 서비스",
          purpose:
            "공개 문의 번호, 시간, 양식 버전, 동선 수정 정보, 방문 경로, 선택 URL 캠페인 표지와 제한된 악용 방지 데이터로 안정적인 제출, 유입 경로 확인과 중복 방지를 지원합니다.",
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
          value: "GitHub Pages · 정적 공개 사이트",
          detail:
            "웹사이트를 제공하며 GitHub 약관에 따라 일반 웹 요청 정보를 처리할 수 있습니다.",
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
          label: "WhatsApp",
          value: "직접 연결 · 웹사이트 번호 입력 없음",
          detail:
            "여행자가 직접 연결을 선택하면 구조화된 여행 동선 요약을 받아 메시지를 준비합니다. 여행자가 ‘보내기’를 선택한 뒤에만 스튜디오가 메시지와 번호를 받습니다. WhatsApp과 Meta는 자체 약관과 인프라에 따라 이 연결 과정과 이후 대화를 처리할 수 있습니다.",
        },
        {
          label: "분석 및 AI 채팅",
          value: "사용 안 함",
          detail:
            "현재 사이트는 필수적이지 않은 분석, 제3자 마케팅 추적 또는 AI 채팅 위젯을 사용하지 않습니다. 방문 주소에 이미 있는 단순 캠페인 표지는 제출된 이메일 문의와 함께 저장될 수 있습니다.",
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
          label: "개인정보 처리 책임 주체",
          value: "Homeground China 스튜디오",
          detail:
            "스튜디오는 여행자의 문의에 답하고 계획하기 위해 정보를 사용하는 방식을 결정합니다.",
        },
        {
          label: "처리 및 저장 지역",
          value:
            "Supabase 서울 · Resend 도쿄 · Gmail 및 WhatsApp 글로벌 인프라",
          detail:
            "서울과 도쿄는 현재 설정된 주요 리전이며 이메일 전송, WhatsApp 대화, 보안 및 기술 지원에는 다른 국가의 제공업체 인프라가 사용될 수 있습니다.",
        },
        {
          label: "문의 정보 보관",
          value: "마지막 실질적인 연락 후 최대 12개월",
          detail:
            "문의가 고객 또는 계약 관계로 이어지면 서비스 제공, 업무 기록 및 법적 의무를 위해 관련 기록을 더 오래 보관할 수 있습니다.",
        },
        {
          label: "속도 제한 정보 보관",
          value: "24시간 제한 창 · 만료 후 예약 삭제",
          detail:
            "원본 IP 주소는 저장하지 않고 비밀 키로 생성한 해시만 저장합니다. 1분마다 실행되는 작업이 24시간이 지난 버킷을 삭제하므로 일반적으로 다음 정리 때 삭제됩니다.",
        },
        {
          label: "열람·수정·삭제",
          value: "본인 확인 후 원칙적으로 30일 이내 처리",
          detail:
            "계약 이행, 법적 의무, 분쟁 처리 또는 보안을 위해 기록을 보관해야 하는 경우에는 해당 정보의 삭제가 제한될 수 있습니다.",
        },
      ],
    },
    choices: {
      eyebrow: "여행자의 선택",
      title: "연락 여부는 여행자가 정합니다",
      paragraphs: [
        "이메일을 제공하거나 WhatsApp을 열지 않고 여행 동선 찾기만 사용할 수 있습니다. 이메일 양식 제출과 WhatsApp 열기는 각각 별도의 명시적인 행동입니다.",
        "현재 문의 처리와 마케팅 동의는 별개입니다. 별도 동의 없이 문의 이메일을 관련 없는 마케팅에 사용하지 않습니다.",
      ],
      items: [
        "이메일 양식을 제출하지 않고 WhatsApp도 열지 않을 수 있습니다.",
        "합리적인 본인 확인 후 보관 정보의 열람, 수정 또는 삭제를 요청할 수 있습니다.",
        "Homeground에 연락하지 않고 여행 동선 찾기를 계속 이용할 수 있습니다.",
        "이메일로 사람의 답장을 받거나, 웹사이트를 나가 WhatsApp 대화를 직접 시작할 수 있습니다.",
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
      addressPlaceholder: "법적으로 필요한 경우 제공",
    },
    footer:
      "이 안내는 Homeground의 현재 여행 동선 찾기, 이메일 문의 서비스와 WhatsApp 직접 연결에 적용되며 마케팅 동의가 아니고 AI 채팅이나 필수적이지 않은 분석을 사용하지 않습니다.",
  },
};

export function getHomegroundPrivacyCopy(
  locale: HomegroundPrivacyLocale,
): HomegroundPrivacyCopy {
  return homegroundPrivacyCopy[locale];
}
