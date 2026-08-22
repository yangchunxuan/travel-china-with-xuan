import type { HomegroundLocale } from "./homegroundI18n";

interface Section {
  id: string;
  title: string;
  lead?: string;
  paragraphs: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

interface SourceLink {
  label: string;
  url: string;
}

export interface SingaporeChinaVisaCopy {
  htmlLang: string;
  homePath: string;
  guidesPath: string;
  skipLink: string;
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbGuides: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  title: string;
  metadataDescription: string;
  directAnswer: string;
  directAnswerTail: string;
  heroAlt: string;
  heroCaption: string;
  sections: Section[];
  reviewTitle: string;
  reviewBody: string;
  reviewBoundary: string;
  sourcesLabel: string;
  sources: SourceLink[];
  faqTitle: string;
  faq: FaqItem[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaAction: string;
  relatedTitle: string;
  relatedLinks: { id: string; label: string; description: string }[];
  updatedLabel: string;
  updatedDate: string;
  sourceReviewedAt: string;
  schemaAbout: string[];
}

const sources: SourceLink[] = [
  {
    label:
      "Singapore ICA — Mutual 30-day visa-exemption arrangement between Singapore and China",
    url: "https://www.ica.gov.sg/news-and-publications/newsroom/media-release/mutual-30-day-visa-exemption-arrangement-between-singapore-and-the-people-s-republic-of-china",
  },
  {
    label:
      "China National Immigration Administration — mutual visa-exemption agreements (Singapore ordinary passports)",
    url: "https://en.nia.gov.cn/n147418/n147463/c181470/content.html",
  },
  {
    label:
      "China National Immigration Administration — FAQ for mutual visa-exemption agreements",
    url: "https://en.nia.gov.cn/n147418/n147463/c156110/content.html",
  },
  {
    label:
      "China National Immigration Administration — online and port arrival-card options",
    url: "https://en.nia.gov.cn/n147418/n147468/c187308/content.html",
  },
];

const englishCopy: Omit<SingaporeChinaVisaCopy, "htmlLang" | "homePath" | "guidesPath"> = {
  skipLink: "Skip to the guide",
  breadcrumbLabel: "Breadcrumb",
  breadcrumbHome: "Home",
  breadcrumbGuides: "Guides",
  breadcrumbCurrent: "Singapore passport: China visa",
  eyebrow: "Entry guide · Singapore",
  title: "Do Singaporeans Need a Visa for China? The 30-Day Rule",
  metadataDescription:
    "Singapore ordinary-passport holders can visit China visa-free for up to 30 days. Check the passport scope, arrival card, stay boundary and when a visa is still needed.",
  directAnswer:
    "Usually no. A holder of an ordinary Singapore passport may enter China visa-free for a stay of up to 30 days under the reciprocal arrangement effective since 9 February 2024. This guide covers a short tourist visit; a different passport, work, study, journalism or a stay beyond 30 days needs separate official checking.",
  directAnswerTail:
    "The entry rule is only the first check. The next question is how to use those days without turning the trip into a chain of transfers.",
  heroAlt:
    "Sandstone pillars layered into a deep green valley in Zhangjiajie National Forest Park.",
  heroCaption:
    "Thirty days, no visa. The real planning starts here — not at the consulate.",
  sections: [
    {
      id: "the-visa-part",
      title: "The visa part, in full",
      lead: "There is genuinely not much to it.",
      paragraphs: [
        "Under the mutual arrangement in force since 9 February 2024, a Singapore ordinary-passport holder may enter China visa-free for a stay of up to 30 days. The official summaries do not turn a different travel document, a longer stay or another regulated purpose into the same tourist exemption, so check the exact passport and purpose before departure.",
        "Work, study, journalism and a stay beyond 30 days require the appropriate official route. Since November 2025, a traveller who needs an Arrival Card may submit it through the National Immigration Administration's official online channels before travel; otherwise the port provides QR, on-site-device and paper options. The service is free, and listed exempt categories follow the NIA notice.",
        "That is why this page spends one section on the visa and the rest on the part that actually goes wrong.",
      ],
    },
    {
      id: "thirty-days",
      title: "Thirty days is not as much as it sounds",
      lead: "It is the ceiling, not the plan.",
      paragraphs: [
        "A Singapore traveller used to weekend cities reads “30 days” as room to spare. Then the trip meets the size of China. Beijing to Zhangjiajie is a flight, not a train hop. Adding Xi'an or Chengdu means another internal sector and another hotel. A single well-chosen region can fill a week at an unhurried pace before you have repeated a single view.",
        "The travellers who run out of trip are usually the ones who treated the visa as the hard part and the itinerary as an afterthought — booking the flights first, then discovering that three cities and a set of elderly parents do not fit the days the way the map suggested.",
        "The 30 days remove the barrier. They do not design the route.",
      ],
    },
    {
      id: "who-this-suits",
      title: "The trips this policy quietly favours",
      paragraphs: [
        "The visa waiver is most useful to the Singapore trips that were always going to be a little complex. A multi-generational family where the pace has to suit both a grandparent and a teenager. A return to an ancestral region that pairs a big city with somewhere smaller and harder to reach. A first proper China trip for a couple who have done the short-haul cities and want one unhurried fortnight instead of three rushed days.",
        "None of those is decided by the entry stamp. They are decided by the order of the cities, how the internal flights and rail connect, where you base yourself, and how much you leave out so the days still feel like a holiday.",
      ],
    },
  ],
  reviewTitle: "Written and checked",
  reviewBody:
    "Homeground China is a China travel agency with our own ground team. The entry facts on this page come from Singapore's ICA and China's National Immigration Administration, checked 20 August 2026. Entry rules change; recheck the official sources before departure.",
  reviewBoundary:
    "We plan the China trip inside the time the policy gives you. We are not a visa agency and do not file applications.",
  sourcesLabel: "Official sources",
  sources,
  faqTitle: "Questions",
  faq: [
    {
      question: "Do Singaporeans need a visa for China in 2026?",
      answer:
        "A holder of an ordinary Singapore passport may make a short tourist visit for up to 30 days without a visa under the mutual arrangement. Other travel documents, work, study, journalism and stays beyond 30 days need separate official checking.",
    },
    {
      question: "Can I simply remain after the 30 visa-free days?",
      answer:
        "No. NIA guidance says travellers using a mutual visa-exemption agreement must leave before the visa-free stay expires. An emergency or force-majeure extension must be requested from the local exit-entry administration before expiry.",
    },
    {
      question: "Does it cover all of mainland China?",
      answer:
        "Yes. Unlike the transit policy, the mutual exemption is a normal visa-free entry — you are not tied to designated ports or permitted areas, and you can travel the mainland as any visa holder would.",
    },
    {
      question: "Do I still need to do anything before flying?",
      answer:
        "Carry an ordinary passport valid for your stay. You may submit the foreigner Arrival Card online before travel, but if you do not, official guidance says you can complete it at the port by QR code, on-site device or paper card. Some traveller categories are exempt.",
    },
  ],
  ctaEyebrow: "The visa was the easy part",
  ctaTitle: "Now for the thirty days.",
  ctaBody:
    "Tell us who is travelling, roughly when, and the places on your list. We will tell you what genuinely fits at an unhurried pace, which city order makes the internal flights work, and what to leave for next time. Especially if you are travelling with parents or across generations, the route is where a China trip is won or lost.",
  ctaAction: "Start a trip conversation",
  relatedTitle: "Where to start planning",
  relatedLinks: [
    {
      id: "beijing-zhangjiajie-shanghai-10-days",
      label: "Beijing, Zhangjiajie and Shanghai in 10 days",
      description: "Whether three signature places really fit into one trip.",
    },
    {
      id: "is-your-china-itinerary-too-rushed",
      label: "Is your China itinerary too rushed?",
      description: "The test that matters once the visa is off the table.",
    },
    {
      id: "zhangjiajie-older-travellers",
      label: "Zhangjiajie with older travellers",
      description: "If the trip includes parents, start here.",
    },
  ],
  updatedLabel: "Updated",
  updatedDate: "20 August 2026",
  sourceReviewedAt: "2026-08-20",
  schemaAbout: [
    "China visa policy",
    "Singapore passport",
    "China travel planning",
    "Visa-free entry",
  ],
};

const chineseCopy: Omit<SingaporeChinaVisaCopy, "htmlLang" | "homePath" | "guidesPath"> = {
  skipLink: "跳转至指南",
  breadcrumbLabel: "面包屑导航",
  breadcrumbHome: "首页",
  breadcrumbGuides: "指南",
  breadcrumbCurrent: "新加坡护照：中国签证",
  eyebrow: "入境指南 · 新加坡",
  title: "新加坡护照去中国需要签证吗？30 天互免签证规则",
  metadataDescription:
    "持新加坡普通护照可免签访问中国，单次停留不超过 30 天。核对护照范围、入境卡、停留边界，以及哪些情况仍需申请签证。",
  directAnswer:
    "通常不需要。根据 2024 年 2 月 9 日起生效的中新互免签证安排，持新加坡普通护照可免签进入中国，单次停留不超过 30 天。本页讨论短期旅游；其他旅行证件、工作、学习、新闻报道或超过 30 天的停留，需要按官方要求另行核对。",
  directAnswerTail:
    "入境规则只是第一步。接下来要解决的是怎样使用这些天数，而不是把旅程排成连续转场。",
  heroAlt: "张家界国家森林公园内，层层砂岩石柱耸立于深绿色山谷之中。",
  heroCaption: "免签30天。真正的行程规划从这里开始，而不是从领事馆开始。",
  sections: [
    {
      id: "the-visa-part",
      title: "签证规定，一次说清",
      lead: "确实没有太多复杂之处。",
      paragraphs: [
        "根据 2024 年 2 月 9 日起生效的互免签证安排，持新加坡普通护照可免签进入中国，单次停留不超过 30 天。官方摘要并未把其他旅行证件、更长停留或其他受监管目的自动纳入同一旅游免签范围，因此出发前要核对准确护照与出行目的。",
        "工作、学习、新闻报道和超过 30 天的停留，需要使用相应官方途径。自 2025 年 11 月起，需要填写入境卡的旅客可提前通过国家移民管理局官方渠道在线填报；若未提前填写，也可在口岸使用二维码、智能设备或纸质入境卡。官方服务免费，免填类别以国家移民管理局公告为准。",
        "因此，本页只用一个章节讲签证，其余篇幅留给真正容易出问题的部分。",
      ],
    },
    {
      id: "thirty-days",
      title: "30天并没有听起来那么充裕",
      lead: "它是上限，不是行程。",
      paragraphs: [
        "习惯周末去一座城市的新加坡旅客，看到“30天”往往觉得绰绰有余。可一旦真正面对中国的幅员，情况就不同了。从北京到张家界要搭飞机，不是坐一小段火车就到。再加上西安或成都，就意味着多一段境内交通和一家酒店。只选一个合适的地区，不赶行程地游玩，也足以充实一周，而且每天都不会看到重复的风景。",
        "最后发现时间不够的旅客，通常都把签证当成难题，却把行程留到最后再想——先订机票，之后才发现三座城市加上几位年长的父母，实际需要的天数并不像地图上看起来那样好安排。",
        "30天免签消除了门槛，却不会替你设计路线。",
      ],
    },
    {
      id: "who-this-suits",
      title: "这项政策悄然偏爱的旅行方式",
      paragraphs: [
        "免签政策最能帮到的，恰恰是那些原本就稍显复杂的新加坡出发旅行：既要照顾祖辈，也要顾及青少年的多代同游；回到祖籍地，把大城市和更小、更难抵达的地方连在一起；或是一对已经去过周边短途城市的伴侣，第一次认真游中国，宁愿从容旅行两周，也不想匆忙赶完三天。",
        "这些旅行都不是由入境章决定的。真正起作用的是城市先后顺序、境内航班与铁路如何衔接、在哪里设定落脚点，以及舍弃多少地方，才能让每一天仍然像在度假。",
      ],
    },
  ],
  reviewTitle: "撰写与核查",
  reviewBody:
    "Homeground China 是一家拥有当地团队的中国旅行社。本页入境信息来自新加坡移民与关卡局（ICA）和中国国家移民管理局，并于 2026 年 8 月 20 日核查。入境规定可能变化，出发前请重新查看官方来源。",
  reviewBoundary:
    "我们会在政策允许的停留时间内为你规划中国行程。我们不是签证代办机构，也不代为递交申请。",
  sourcesLabel: "官方来源",
  sources: [
    {
      label: "新加坡移民与关卡局（ICA）— 新加坡与中国互免30天签证安排",
      url: "https://www.ica.gov.sg/news-and-publications/newsroom/media-release/mutual-30-day-visa-exemption-arrangement-between-singapore-and-the-people-s-republic-of-china",
    },
    {
      label: "中国国家移民管理局 — 互免签证协议清单（新加坡普通护照）",
      url: "https://en.nia.gov.cn/n147418/n147463/c181470/content.html",
    },
    {
      label: "中国国家移民管理局 — 互免签证协议入境常见问题",
      url: "https://en.nia.gov.cn/n147418/n147463/c156110/content.html",
    },
    {
      label: "中国国家移民管理局 — 入境卡线上与口岸填报方式",
      url: "https://en.nia.gov.cn/n147418/n147468/c187308/content.html",
    },
  ],
  faqTitle: "常见问题",
  faq: [
    {
      question: "2026 年，新加坡公民去中国需要签证吗？",
      answer:
        "持新加坡普通护照短期旅游，单次停留不超过 30 天，可按互免签证安排免签入境。其他旅行证件、工作、学习、新闻报道或超过 30 天的停留，需要另行按官方要求核对。",
    },
    {
      question: "免签 30 天到期后可以直接继续停留吗？",
      answer:
        "不可以。国家移民管理局说明，使用互免签证协议入境的旅客必须在免签停留期届满前离境；因紧急情况或不可抗力需要延长，应在到期前向当地公安机关出入境管理部门申请。",
    },
    {
      question: "免签范围包括整个中国大陆吗？",
      answer:
        "包括。与过境免签政策不同，互免签证安排属于常规免签入境；你不受指定口岸或允许停留区域限制，可像持签证旅客一样在中国大陆旅行。",
    },
    {
      question: "起飞前还需要做什么吗？",
      answer:
        "请携带在停留期间有效的护照。自2025年11月起，可提前在线填写外国人入境卡，也可抵达口岸后通过二维码、智能设备或纸质表格填写；部分旅客可免填。",
    },
  ],
  ctaEyebrow: "签证是最简单的部分",
  ctaTitle: "接下来，规划这30天。",
  ctaBody:
    "告诉我们有哪些人同行、大致何时出发，以及你想去哪些地方。我们会告诉你，按从容的节奏真正能安排多少内容，怎样排列城市才能让境内航班顺畅衔接，又有哪些地方适合留到下次。尤其是与父母同行或多代同游时，路线往往决定一趟中国之旅的成败。",
  ctaAction: "开始聊聊你的旅程",
  relatedTitle: "从哪里开始规划",
  relatedLinks: [
    {
      id: "beijing-zhangjiajie-shanghai-10-days",
      label: "10天游北京、张家界和上海",
      description: "三处代表性目的地是否真的能放进一次旅行。",
    },
    {
      id: "is-your-china-itinerary-too-rushed",
      label: "你的中国行程是不是太赶了？",
      description: "签证不再是问题后，真正重要的检验。",
    },
    {
      id: "zhangjiajie-older-travellers",
      label: "带年长旅客游张家界",
      description: "如果同行者包括父母，请从这里开始。",
    },
  ],
  updatedLabel: "更新日期",
  updatedDate: "2026年8月20日",
  sourceReviewedAt: "2026-08-20",
  schemaAbout: ["中国签证政策", "新加坡护照", "中国旅行规划", "免签入境"],
};

const koreanCopy: Omit<SingaporeChinaVisaCopy, "htmlLang" | "homePath" | "guidesPath"> = {
  skipLink: "가이드로 바로가기",
  breadcrumbLabel: "이동 경로",
  breadcrumbHome: "홈",
  breadcrumbGuides: "가이드",
  breadcrumbCurrent: "싱가포르 여권: 중국 비자",
  eyebrow: "입국 가이드 · 싱가포르",
  title: "싱가포르 여권으로 중국 비자가 필요할까? 30일 무비자 규정",
  metadataDescription:
    "싱가포르 일반 여권 소지자는 중국을 최대 30일까지 무비자로 방문할 수 있습니다. 여권 범위, 입국카드, 체류 한도와 비자가 필요한 경우를 확인하세요.",
  directAnswer:
    "대체로 필요하지 않습니다. 2024년 2월 9일부터 시행된 상호 비자 면제에 따라 싱가포르 일반 여권 소지자는 중국에 최대 30일까지 무비자로 체류할 수 있습니다. 이 글은 단기 관광을 다루며, 다른 여행증명서·취업·유학·취재·30일 초과 체류는 공식 요건을 별도로 확인해야 합니다.",
  directAnswerTail:
    "입국 규정은 첫 번째 확인일 뿐입니다. 다음 단계는 이 기간을 연속 이동일로 소모하지 않도록 여행을 설계하는 일입니다.",
  heroAlt: "장자제 국가삼림공원의 짙푸른 계곡 위로 겹겹이 솟은 사암 기둥.",
  heroCaption: "30일 무비자. 진짜 여행 계획은 영사관이 아니라 여기서 시작됩니다.",
  sections: [
    {
      id: "the-visa-part",
      title: "비자 규정의 전부",
      lead: "정말 복잡할 것이 거의 없습니다.",
      paragraphs: [
        "2024년 2월 9일부터 시행된 상호 협정에 따라 싱가포르 일반 여권 소지자는 중국에 최대 30일까지 무비자로 체류할 수 있습니다. 공식 요약은 다른 여행증명서, 더 긴 체류 또는 별도 규제가 있는 목적을 같은 관광 면제에 자동 포함하지 않으므로 출발 전에 정확한 여권과 목적을 확인하세요.",
        "취업, 유학, 취재와 30일 초과 체류는 해당 공식 절차를 따라야 합니다. 2025년 11월부터 입국카드 작성 대상자는 국가이민관리국 공식 채널에서 미리 온라인으로 제출할 수 있습니다. 미리 제출하지 못하면 입국장에서 QR 코드, 현장 기기 또는 종이 카드로 작성할 수 있습니다. 공식 서비스는 무료이며 면제 대상은 NIA 공지를 따릅니다.",
        "그래서 이 페이지는 비자에 한 섹션만 할애하고, 나머지는 실제로 문제가 생기기 쉬운 부분을 다룹니다.",
      ],
    },
    {
      id: "thirty-days",
      title: "30일은 생각만큼 길지 않습니다",
      lead: "30일은 상한이지, 여행 계획이 아닙니다.",
      paragraphs: [
        "주말마다 도시 여행을 다니는 데 익숙한 싱가포르 여행자라면 ‘30일’이라는 말에 시간이 넉넉하다고 느낄 수 있습니다. 하지만 중국의 크기를 마주하면 이야기가 달라집니다. 베이징에서 장자제까지는 짧은 기차 이동이 아니라 비행기를 타야 하는 거리입니다. 시안이나 청두를 더하면 국내선 구간과 호텔도 하나씩 더 필요합니다. 잘 고른 한 지역만 천천히 둘러봐도 같은 풍경을 반복하지 않고 일주일을 알차게 보낼 수 있습니다.",
        "여행 시간이 부족해지는 이들은 대개 비자를 어려운 부분으로 여기고 일정은 나중 문제로 미뤘던 사람들입니다. 항공편부터 예약한 뒤에야 세 도시와 연로한 부모님을 함께 모시는 일정이 지도에서 보였던 것처럼 날짜 안에 들어맞지 않는다는 사실을 알게 됩니다.",
        "30일 무비자는 장벽을 없애 줄 뿐, 동선을 설계해 주지는 않습니다.",
      ],
    },
    {
      id: "who-this-suits",
      title: "이 정책이 특히 잘 맞는 여행",
      paragraphs: [
        "무비자 정책은 애초에 조금 복잡할 수밖에 없었던 싱가포르발 여행에 가장 유용합니다. 조부모와 청소년 모두에게 속도를 맞춰야 하는 다세대 가족여행, 대도시와 더 작고 찾아가기 어려운 곳을 함께 돌아보는 뿌리 찾기 여행, 가까운 단거리 도시들은 이미 다녀온 커플이 서두르는 사흘 대신 여유로운 2주를 택하는 첫 본격 중국 여행이 그런 예입니다.",
        "그 어떤 여행도 입국 도장 하나로 결정되지는 않습니다. 도시를 어떤 순서로 방문할지, 국내선과 철도를 어떻게 연결할지, 어디를 거점으로 삼을지, 그리고 휴가다운 여유를 지키기 위해 무엇을 뺄지가 여행을 결정합니다.",
      ],
    },
  ],
  reviewTitle: "작성 및 검토",
  reviewBody:
    "Homeground China는 자체 현지 팀을 둔 중국 전문 여행사입니다. 이 페이지의 입국 정보는 싱가포르 이민국(ICA)과 중국 국가이민관리국 자료를 바탕으로 하며, 2026년 8월 20일에 확인했습니다. 입국 규정은 바뀔 수 있으므로 출발 전에 공식 출처를 다시 확인하세요.",
  reviewBoundary:
    "저희는 정책이 허용하는 기간 안에서 중국 여행을 계획합니다. 비자 대행사가 아니며 신청서를 대신 제출하지 않습니다.",
  sourcesLabel: "공식 출처",
  sources: [
    {
      label: "싱가포르 이민국(ICA) — 싱가포르·중국 상호 30일 비자 면제 협정",
      url: "https://www.ica.gov.sg/news-and-publications/newsroom/media-release/mutual-30-day-visa-exemption-arrangement-between-singapore-and-the-people-s-republic-of-china",
    },
    {
      label: "중국 국가이민관리국 — 상호 비자 면제 협정 목록(싱가포르 일반 여권)",
      url: "https://en.nia.gov.cn/n147418/n147463/c181470/content.html",
    },
    {
      label: "중국 국가이민관리국 — 상호 비자 면제 입국 FAQ",
      url: "https://en.nia.gov.cn/n147418/n147463/c156110/content.html",
    },
    {
      label: "중국 국가이민관리국 — 온라인 및 입국장 입국카드 작성 방법",
      url: "https://en.nia.gov.cn/n147418/n147468/c187308/content.html",
    },
  ],
  faqTitle: "자주 묻는 질문",
  faq: [
    {
      question: "2026년에 싱가포르 국민이 중국에 가려면 비자가 필요한가요?",
      answer:
        "싱가포르 일반 여권으로 단기 관광을 하며 최대 30일까지 체류한다면 상호 비자 면제에 따라 비자가 필요하지 않습니다. 다른 여행증명서, 취업, 유학, 취재 또는 30일 초과 체류는 공식 요건을 별도로 확인해야 합니다.",
    },
    {
      question: "무비자 30일이 지나도 바로 계속 체류할 수 있나요?",
      answer:
        "아니요. 국가이민관리국은 상호 비자 면제로 입국한 여행자가 무비자 체류기간이 끝나기 전에 출국해야 한다고 안내합니다. 긴급 상황이나 불가항력으로 연장이 필요하면 만료 전에 현지 공안기관 출입경관리부서에 신청해야 합니다.",
    },
    {
      question: "중국 본토 전역에 적용되나요?",
      answer:
        "네. 환승 무비자 정책과 달리 상호 비자 면제는 일반적인 무비자 입국입니다. 지정된 입국장이나 허용 지역에만 머물 필요가 없으며, 비자 소지자와 마찬가지로 중국 본토를 여행할 수 있습니다.",
    },
    {
      question: "출국 전에 별도로 준비할 것이 있나요?",
      answer:
        "체류 기간 동안 유효한 여권을 지참하세요. 2025년 11월부터 외국인 입국카드는 미리 온라인으로 작성하거나 입국장에서 QR 코드, 기기 또는 종이 양식으로 작성할 수 있으며, 일부 여행자는 작성이 면제됩니다.",
    },
  ],
  ctaEyebrow: "비자는 쉬운 부분이었습니다",
  ctaTitle: "이제 30일을 계획할 차례입니다.",
  ctaBody:
    "누가 함께 여행하는지, 대략 언제 떠나는지, 가고 싶은 곳은 어디인지 알려 주세요. 여유로운 속도로 실제 어디까지 가능한지, 국내선이 잘 이어지도록 도시 순서를 어떻게 짜야 하는지, 다음 여행으로 남겨 둘 곳은 어디인지 말씀드리겠습니다. 특히 부모님과 함께하거나 여러 세대가 동행한다면 동선이 중국 여행의 성패를 가릅니다.",
  ctaAction: "여행 상담 시작하기",
  relatedTitle: "여행 계획, 여기서 시작하세요",
  relatedLinks: [
    {
      id: "beijing-zhangjiajie-shanghai-10-days",
      label: "10일 동안 베이징·장자제·상하이 여행하기",
      description: "대표 여행지 세 곳을 한 번의 여행에 정말 담을 수 있는지 살펴봅니다.",
    },
    {
      id: "is-your-china-itinerary-too-rushed",
      label: "중국 여행 일정이 너무 빡빡하지 않나요?",
      description: "비자가 더 이상 문제가 아닐 때 꼭 확인해야 할 기준입니다.",
    },
    {
      id: "zhangjiajie-older-travellers",
      label: "연로한 여행자와 함께하는 장자제",
      description: "부모님이 함께하는 여행이라면 여기서 시작하세요.",
    },
  ],
  updatedLabel: "업데이트",
  updatedDate: "2026년 8월 20일",
  sourceReviewedAt: "2026-08-20",
  schemaAbout: ["중국 비자 정책", "싱가포르 여권", "중국 여행 계획", "무비자 입국"],
};

const copies: Record<HomegroundLocale, SingaporeChinaVisaCopy> = {
  en: { htmlLang: "en", homePath: "/", guidesPath: "/guides/", ...englishCopy },
  zh: {
    htmlLang: "zh-Hans",
    homePath: "/zh/",
    guidesPath: "/zh/guides/",
    ...chineseCopy,
  },
  ko: {
    htmlLang: "ko",
    homePath: "/ko/",
    guidesPath: "/ko/guides/",
    ...koreanCopy,
  },
};

export function getSingaporeChinaVisaCopy(
  locale: HomegroundLocale,
): SingaporeChinaVisaCopy {
  return copies[locale];
}
