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
      "Chinese Embassy in Singapore — visa-free entry FAQ and entry-document rules",
    url: "https://sg.china-embassy.gov.cn/eng/lsfwx/zytz/202511/t20251112_11751424.htm",
  },
  {
    label:
      "China National Immigration Administration — online and port arrival-card options",
    url: "https://en.nia.gov.cn/n147413/c187308/content.html",
  },
];

const englishCopy: Omit<SingaporeChinaVisaCopy, "htmlLang" | "homePath" | "guidesPath"> = {
  skipLink: "Skip to the guide",
  breadcrumbLabel: "Breadcrumb",
  breadcrumbHome: "Home",
  breadcrumbGuides: "Guides",
  breadcrumbCurrent: "Singapore passport: China visa",
  eyebrow: "Entry guide · Singapore",
  title: "You Don't Need a China Visa. Here's the Harder Question.",
  directAnswer:
    "A Singapore passport enters China visa-free for up to 30 days — tourism, business or visiting family, no application, no fee. The two governments waived it for each other in February 2024, and it covers ordinary passports across mainland China.",
  directAnswerTail:
    "So the visa is settled in one paragraph. The question that actually decides your trip is the one no embassy page will answer: what do you do with up to 30 days?",
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
        "Under the mutual arrangement in force since 9 February 2024, a Singapore ordinary passport enters mainland China visa-free for up to 30 days. It covers tourism, business, visiting family or friends, exchanges and transit. The clock is counted from 00:00 on the day after you enter — so the day you land is effectively free — and each entry gets its own 30 days, with no cumulative cap on multiple visits.",
        "What it does not cover: work, study and journalism still need the matching visa, and so does any single stay beyond 30 days. Carry an ordinary passport valid for your stay. Since November 2025, you may submit the foreigner Arrival Card online before travel; if you do not, you can scan the port QR code, use an on-site device or complete a paper card after arrival. Some traveller categories are exempt.",
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
    "Homeground is an independent China trip-planning studio with our own ground team. The entry facts on this page come from Singapore's ICA, the Chinese Embassy in Singapore and China's National Immigration Administration, checked 28 July 2026. Entry rules change; we re-check at least every 90 days.",
  reviewBoundary:
    "We plan the China trip inside the time the policy gives you. We are not a visa agency and do not file applications.",
  sourcesLabel: "Official sources",
  sources,
  faqTitle: "Questions",
  faq: [
    {
      question: "Do Singaporeans need a visa for China in 2026?",
      answer:
        "No, for stays up to 30 days for tourism, business, visiting family or friends, exchanges or transit. Work, study, journalism or a stay beyond 30 days still need the appropriate visa.",
    },
    {
      question: "How are the 30 days counted?",
      answer:
        "From 00:00 on the day after you enter, for 30 calendar days. The arrival day itself does not count against the limit, and each entry gets a fresh 30 days.",
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
  updatedDate: "28 July 2026",
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
  title: "去中国不需要签证。更难的问题在这里。",
  directAnswer:
    "持新加坡护照可免签进入中国大陆，单次停留不超过30天，适用于旅游、商务或探亲访友，无需申请，也不收费。中新两国于2024年2月开始互免签证，适用范围为中国大陆全境，面向普通护照持有人。",
  directAnswerTail:
    "所以，签证问题一段话就说清楚了。真正决定这趟旅行的问题，是任何使领馆网页都不会替你回答的：最多30天，你要怎样安排？",
  heroAlt: "张家界国家森林公园内，层层砂岩石柱耸立于深绿色山谷之中。",
  heroCaption: "免签30天。真正的行程规划从这里开始，而不是从领事馆开始。",
  sections: [
    {
      id: "the-visa-part",
      title: "签证规定，一次说清",
      lead: "确实没有太多复杂之处。",
      paragraphs: [
        "根据2024年2月9日起生效的互免签证安排，持新加坡普通护照可免签进入中国大陆，单次停留不超过30天。适用事由包括旅游、商务、探亲访友、交流和过境。停留期限从入境次日00:00起计算，因此抵达当天实际上不计入30天；每次入境都会重新获得30天免签停留期，多次入境没有累计天数上限。",
        "不适用的情况是：工作、学习和新闻报道仍须申请相应签证，单次停留超过30天也同样需要签证。请携带在停留期间有效的护照。自2025年11月起，可在抵达前在线填写外国人入境卡，也可在口岸通过二维码、智能设备或纸质表格填写；部分旅客可免填。",
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
    "Homeground 是一家独立的中国旅行规划工作室，拥有自己的当地团队。本页入境信息来自新加坡移民与关卡局（ICA）、中国驻新加坡大使馆和中国国家移民管理局，并于2026年7月28日完成核查。入境规定可能变化；我们至少每90天重新核查一次。",
  reviewBoundary:
    "我们会在政策允许的停留时间内为你规划中国行程。我们不是签证代办机构，也不代为递交申请。",
  sourcesLabel: "官方来源",
  sources: [
    {
      label: "新加坡移民与关卡局（ICA）— 新加坡与中国互免30天签证安排",
      url: "https://www.ica.gov.sg/news-and-publications/newsroom/media-release/mutual-30-day-visa-exemption-arrangement-between-singapore-and-the-people-s-republic-of-china",
    },
    {
      label: "中国驻新加坡大使馆 — 免签入境常见问题与入境证件规则",
      url: "https://sg.china-embassy.gov.cn/eng/lsfwx/zytz/202511/t20251112_11751424.htm",
    },
    {
      label: "中国国家移民管理局 — 入境卡线上与口岸填报方式",
      url: "https://en.nia.gov.cn/n147413/c187308/content.html",
    },
  ],
  faqTitle: "常见问题",
  faq: [
    {
      question: "2026年，新加坡公民去中国需要签证吗？",
      answer:
        "不需要。以旅游、商务、探亲访友、交流或过境为目的，单次停留不超过30天可免签。工作、学习、新闻报道或停留超过30天，仍须申请相应签证。",
    },
    {
      question: "30天如何计算？",
      answer:
        "从入境次日00:00起，按30个自然日计算。抵达当天不计入期限，每次入境都会重新获得30天免签停留期。",
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
  updatedDate: "2026年7月28日",
  schemaAbout: ["中国签证政策", "新加坡护照", "中国旅行规划", "免签入境"],
};

const koreanCopy: Omit<SingaporeChinaVisaCopy, "htmlLang" | "homePath" | "guidesPath"> = {
  skipLink: "가이드로 바로가기",
  breadcrumbLabel: "이동 경로",
  breadcrumbHome: "홈",
  breadcrumbGuides: "가이드",
  breadcrumbCurrent: "싱가포르 여권: 중국 비자",
  eyebrow: "입국 가이드 · 싱가포르",
  title: "중국 비자는 필요 없습니다. 더 어려운 질문은 따로 있습니다.",
  directAnswer:
    "싱가포르 여권 소지자는 관광, 비즈니스 또는 가족 방문 목적으로 중국 본토에 최대 30일까지 무비자로 입국할 수 있습니다. 신청도, 수수료도 없습니다. 양국은 2024년 2월부터 상호 비자를 면제했으며, 일반 여권 소지자는 중국 본토 전역에서 이 제도를 적용받습니다.",
  directAnswerTail:
    "그러니 비자 문제는 한 문단이면 끝납니다. 실제 여행을 좌우하는 것은 어느 대사관 웹페이지도 대신 답해 주지 않는 질문입니다. 최대 30일 동안 무엇을 할 것인가?",
  heroAlt: "장자제 국가삼림공원의 짙푸른 계곡 위로 겹겹이 솟은 사암 기둥.",
  heroCaption: "30일 무비자. 진짜 여행 계획은 영사관이 아니라 여기서 시작됩니다.",
  sections: [
    {
      id: "the-visa-part",
      title: "비자 규정의 전부",
      lead: "정말 복잡할 것이 거의 없습니다.",
      paragraphs: [
        "2024년 2월 9일부터 시행된 상호 협정에 따라 싱가포르 일반 여권 소지자는 중국 본토에 최대 30일까지 무비자로 입국할 수 있습니다. 관광, 비즈니스, 가족·친구 방문, 교류 및 환승이 대상입니다. 체류 기간은 입국 다음 날 00:00부터 계산하므로 도착일은 사실상 기간에 포함되지 않습니다. 입국할 때마다 새로운 30일이 주어지며, 여러 차례 방문하더라도 누적 체류일수 상한은 없습니다.",
        "해당되지 않는 경우도 있습니다. 취업, 유학, 취재에는 여전히 목적에 맞는 비자가 필요하며, 한 번에 30일을 초과해 체류할 때도 마찬가지입니다. 체류 기간 동안 유효한 여권을 지참하세요. 2025년 11월부터 외국인 입국카드는 도착 전에 온라인으로 작성하거나 입국장에서 QR 코드, 기기 또는 종이 양식으로 작성할 수 있으며, 일부 여행자는 작성이 면제됩니다.",
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
    "Homeground는 자체 현지 팀을 둔 독립 중국 여행 기획 스튜디오입니다. 이 페이지의 입국 정보는 싱가포르 이민국(ICA), 주싱가포르 중국대사관, 중국 국가이민관리국 자료를 바탕으로 하며, 2026년 7월 28일에 확인했습니다. 입국 규정은 변경될 수 있어 최소 90일마다 다시 확인합니다.",
  reviewBoundary:
    "저희는 정책이 허용하는 기간 안에서 중국 여행을 계획합니다. 비자 대행사가 아니며 신청서를 대신 제출하지 않습니다.",
  sourcesLabel: "공식 출처",
  sources: [
    {
      label: "싱가포르 이민국(ICA) — 싱가포르·중국 상호 30일 비자 면제 협정",
      url: "https://www.ica.gov.sg/news-and-publications/newsroom/media-release/mutual-30-day-visa-exemption-arrangement-between-singapore-and-the-people-s-republic-of-china",
    },
    {
      label: "주싱가포르 중국대사관 — 무비자 입국 FAQ 및 입국 서류 규정",
      url: "https://sg.china-embassy.gov.cn/eng/lsfwx/zytz/202511/t20251112_11751424.htm",
    },
    {
      label: "중국 국가이민관리국 — 온라인 및 입국장 입국카드 작성 방법",
      url: "https://en.nia.gov.cn/n147413/c187308/content.html",
    },
  ],
  faqTitle: "자주 묻는 질문",
  faq: [
    {
      question: "2026년에 싱가포르 국민이 중국에 가려면 비자가 필요한가요?",
      answer:
        "아니요. 관광, 비즈니스, 가족·친구 방문, 교류 또는 환승 목적으로 최대 30일까지 체류할 때는 필요하지 않습니다. 취업, 유학, 취재 또는 30일을 초과하는 체류에는 여전히 목적에 맞는 비자가 필요합니다.",
    },
    {
      question: "30일은 어떻게 계산하나요?",
      answer:
        "입국 다음 날 00:00부터 30일간 역일 기준으로 계산합니다. 도착일 자체는 체류 한도에 포함되지 않으며, 입국할 때마다 새로운 30일이 주어집니다.",
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
  updatedDate: "2026년 7월 28일",
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
