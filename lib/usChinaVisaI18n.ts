import type { HomegroundLocale } from "./homegroundI18n";

interface ArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  /** Optional emphasised lead rendered before the first paragraph. */
  lead?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface SourceLink {
  label: string;
  url: string;
}

export interface UsChinaVisaCopy {
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
  scopeNote: string;
  updatedLabel: string;
  updatedDate: string;
  heroAlt: string;
  heroCaption: string;
  sectionOne: ArticleSection;
  sectionTwo: ArticleSection;
  sectionThree: ArticleSection;
  reviewTitle: string;
  reviewBody: string;
  sourcesLabel: string;
  sources: SourceLink[];
  faqTitle: string;
  faq: FaqItem[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaBoundary: string;
  ctaAction: string;
  relatedTitle: string;
  relatedLinkLabel: string;
  relatedLinkDescription: string;
  schemaAbout: string[];
}

const sharedSources: SourceLink[] = [
  {
    label:
      "State Council — 240-hour visa-free transit expanded to 65 ports",
    url: "https://english.www.gov.cn/news/202511/04/content_WS69094ae0c6d00ca5f9a07472.html",
  },
  {
    label: "National Immigration Administration — 240-hour visa-free transit",
    url: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
  },
  {
    label: "Chinese Embassy in the United States — tourist (L) visa",
    url: "https://us.china-embassy.gov.cn/eng./lsfw/zj/qz2021/202509/t20250920_11712385.htm",
  },
];

const copies: Record<HomegroundLocale, UsChinaVisaCopy> = {
  en: {
    htmlLang: "en",
    homePath: "/",
    guidesPath: "/guides/",
    skipLink: "Skip to the guide",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbGuides: "Guides",
    breadcrumbCurrent: "Do US citizens need a visa for China?",
    eyebrow: "Entry guide · United States",
    title: "Do US Citizens Need a Visa for China in 2026?",
    directAnswer:
      "Yes, for an ordinary holiday — a US passport still needs an L visa to fly into China and home again. But one exemption lets Americans in with no visa at all, and it is wide enough for ten days in Beijing or Shanghai. Which one you fall under is not decided by your paperwork. It is decided by where your plane goes after China.",
    directAnswerTail:
      "That is the part most people get backwards. They book the flights, then ask about the visa. By then the answer has already been chosen for them.",
    scopeNote:
      "This page covers ordinary US passports travelling to mainland China for tourism. It is not immigration advice, and we do not process visa applications.",
    updatedLabel: "Updated",
    updatedDate: "24 July 2026",
    heroAlt:
      "Arrivals concourse at Shanghai Pudong International Airport, with bilingual wayfinding signs overhead.",
    heroCaption:
      "Whether you needed a visa was settled long before you reached this hall.",
    sectionOne: {
      id: "round-trip",
      title: "The round trip is the one with no exemption",
      paragraphs: [
        "Fly New York to Beijing and back to New York, and you need a tourist visa. Nothing in the last two years of visa-free announcements changes that. Those waves covered European, Australian, Korean and Japanese passports; the lists ran to dozens of countries, and the American one was never among them for ordinary tourism.",
        "What did change is the burden. Since 1 January 2024 the embassy stopped asking L visa applicants for round-trip air tickets, hotel reservations, a day-by-day itinerary, or an invitation letter. The visa is still required. It is simply no longer a research project.",
      ],
    },
    sectionTwo: {
      id: "transit",
      title: "Then there is the exemption almost no American uses",
      lead: "US citizens sit on the list of 55 nationalities eligible for China's 240-hour visa-free transit. Ten days, no visa, no application, no fee.",
      paragraphs: [
        "Since 5 November 2025 the policy covers 65 ports across 24 provincial-level regions — Beijing, Shanghai, Guangzhou, Xi'an and Chengdu among them.",
        "One condition carries the whole thing: your onward ticket has to leave for a third country or region, with a confirmed seat and date.",
        "New York → Beijing → New York is not transit. It is a round trip wearing a transit costume, and it does not qualify. New York → Beijing → Seoul qualifies. So does New York → Shanghai → Hong Kong, because Hong Kong counts as a separate region here — which means a trip that was never going to leave Asia can still be built to fit.",
        "The November 2025 expansion added something most English guides have not caught up with. The new ports include the Hong Kong-Zhuhai-Macao Bridge and West Kowloon Station on the Guangzhou-Shenzhen-Hong Kong express rail link. You no longer have to fly in. A route that reaches the mainland overland or by high-speed rail from Hong Kong can sit inside the same exemption.",
        "Your passport needs at least three months of remaining validity.",
      ],
    },
    sectionThree: {
      id: "where-it-fails",
      title: "Where it actually goes wrong",
      lead: "Not in China. At the departure gate in the United States.",
      paragraphs: [
        "The airline is the one that checks. An agent runs your passport against your onward ticket, sees a routing that does not satisfy the exemption, and you are not flying — hours before any Chinese official would have seen your documents. The refusal happens on your side of the ocean, and there is nothing to appeal.",
        "Which is why the errors that matter all happen weeks earlier, at the booking stage. Reserving the return leg to the US before checking whether the trip needed to end somewhere else. Reading “visa-free” as “unrestricted,” when the exemption is tied to designated ports and permitted areas. Assuming a policy you read about last year still describes this year's ports.",
        "Each of those is cheap to fix in the planning and expensive to discover at the airport.",
      ],
    },
    reviewTitle: "Written and checked",
    reviewBody:
      "Homeground is an independent China trip-planning studio with our own ground team. This page follows the published rules of the State Council, the National Immigration Administration and the Chinese Embassy in the United States. Entry policy moves faster than any other part of a China trip; we re-check this page at least every 90 days and date any change. Confirm your own routing against the sources below before you book.",
    sourcesLabel: "Official sources",
    sources: sharedSources,
    faqTitle: "Common questions",
    faq: [
      {
        question: "Is China visa-free for Americans now?",
        answer:
          "Not for a round trip. A US passport enters mainland China without a visa in one situation: transiting to a third country or region within 240 hours, through one of the designated ports.",
      },
      {
        question: "Does Hong Kong count as leaving China?",
        answer:
          "For the transit exemption, yes. An onward ticket from the mainland to Hong Kong satisfies the third-country-or-region requirement.",
      },
      {
        question: "Can I use the 240 hours twice in one trip?",
        answer:
          "Every entry is judged on its own onward ticket. Leave the mainland and come back, and the second entry has to qualify all over again. Multi-country itineraries fall apart here more often than anywhere else.",
      },
      {
        question: "How long does the L visa take?",
        answer:
          "It varies by consulate and season. Apply before you commit to anything non-refundable.",
      },
    ],
    ctaEyebrow: "If the routing is what decides it",
    ctaTitle: "Then the question was never really about visas.",
    ctaBody:
      "Whether you need one comes down to the order of your flights, the port you arrive at, and where you go next — the same three decisions that determine whether the trip itself is any good. Send us the route you are weighing up: the cities, roughly when, and where you were thinking of flying home from. We will tell you which entry path it falls under, and what would have to change for it to qualify.",
    ctaBoundary:
      "We plan trips; we are not a visa agency. We do not file applications and we never ask for passports or documents.",
    ctaAction: "Start a trip conversation",
    relatedTitle: "Related guide",
    relatedLinkLabel: "Is your China itinerary too rushed?",
    relatedLinkDescription:
      "Once the entry path is settled, the next question is whether the days actually fit.",
    schemaAbout: [
      "China visa",
      "240-hour visa-free transit",
      "United States passport",
      "China travel planning",
    ],
  },
  zh: {
    htmlLang: "zh-Hans",
    homePath: "/zh/",
    guidesPath: "/zh/guides/",
    skipLink: "跳到正文",
    breadcrumbLabel: "面包屑导航",
    breadcrumbHome: "首页",
    breadcrumbGuides: "指南",
    breadcrumbCurrent: "美国护照去中国需要签证吗",
    eyebrow: "入境指南 · 美国",
    title: "2026 年,美国护照去中国还需要签证吗?",
    directAnswer:
      "普通旅游需要 —— 飞进中国再飞回美国,美国护照仍要办 L 签。但有一条免签通道对美国人是开的,而且宽到足够在北京或上海待满十天。你适用哪一条,不取决于你准备了什么材料,取决于你离开中国之后飞往哪里。",
    directAnswerTail:
      "多数人把顺序搞反了:先订机票,再问签证。等问的时候,答案早已经被机票定死了。",
    scopeNote:
      "本页针对持普通美国护照、以旅游目的前往中国大陆的情况。这不是移民建议,我们也不代办签证。",
    updatedLabel: "最近更新",
    updatedDate: "2026 年 7 月 24 日",
    heroAlt: "上海浦东国际机场到达层,头顶是中英双语指示牌。",
    heroCaption: "你需不需要签证,在走到这个大厅之前就已经定了。",
    sectionOne: {
      id: "round-trip",
      title: "往返行程,是没有例外的那一种",
      paragraphs: [
        "纽约飞北京、再从北京飞回纽约,就需要旅游签证。过去两年那一波波免签公告都改变不了这一点 —— 那些名单覆盖的是欧洲、澳大利亚、韩国、日本等护照,数十个国家,普通旅游这一项里从来没有美国。",
        "真正变了的是材料。自 2024 年 1 月 1 日起,使馆办 L 签不再要求往返机票、酒店订单、逐日行程或邀请函。签证还是要办,只是不再像做课题。",
      ],
    },
    sectionTwo: {
      id: "transit",
      title: "而那条几乎没有美国人用起来的免签通道",
      lead: "美国在中国 240 小时过境免签的 55 个适用国家名单里。十天,免签,不用申请,不用交费。",
      paragraphs: [
        "自 2025 年 11 月 5 日起,这项政策覆盖 24 个省级地区的 65 个口岸 —— 北京、上海、广州、西安、成都都在内。",
        "全靠一个条件撑着:你的续程票必须飞往第三国或地区,且座位与日期已确认。",
        "纽约 → 北京 → 纽约不是过境。那是一趟往返穿了件过境的外衣,不符合条件。纽约 → 北京 → 首尔符合。纽约 → 上海 → 香港也符合,因为香港在这里算作单独的地区 —— 也就是说,一趟本来就没打算离开亚洲的旅行,仍然可以搭得进去。",
        "2025 年 11 月这次扩容里有一条,多数英文攻略还没跟上:新增口岸包含港珠澳大桥,以及广深港高铁西九龙站。你不再必须飞进来。从香港经陆路或高铁进入内地的路线,同样可以放进这条免签里。",
        "护照剩余有效期需在三个月以上。",
      ],
    },
    sectionThree: {
      id: "where-it-fails",
      title: "真正出问题的地方",
      lead: "不在中国,在美国的登机口。",
      paragraphs: [
        "查的是航空公司。地勤把你的护照和续程票对一遍,发现这个航线结构不满足免签条件,你就飞不了 —— 而这一切发生在任何中国边检见到你的证件之前好几个小时。拒绝发生在大洋的这一侧,而且无处申诉。",
        "所以真正致命的错误,都发生在几周之前的订票环节:先把回美国的那一程订好,再去想这趟旅行是不是本该结束在别的地方;把“免签”读成“不受限”,而这项免签是绑定指定口岸和允许停留区域的;或者拿去年读到的政策,当成今年的口岸清单。",
        "这些在规划阶段改起来都很便宜,到机场才发现就很贵。",
      ],
    },
    reviewTitle: "撰写与核实",
    reviewBody:
      "Homeground 是一家独立的中国旅行规划工作室,有自己的地接团队。本页依据国务院、国家移民管理局与中国驻美国大使馆公布的规则撰写。入境政策是一趟中国行里变动最快的部分;我们至少每 90 天复核本页,并为改动标注日期。订票前,请对照下列来源确认你自己的航线。",
    sourcesLabel: "官方来源",
    sources: sharedSources,
    faqTitle: "常见问题",
    faq: [
      {
        question: "现在美国人去中国免签了吗?",
        answer:
          "往返行程不免。美国护照免签进入中国大陆只有一种情形:在 240 小时内经指定口岸过境前往第三国或地区。",
      },
      {
        question: "香港算离开中国吗?",
        answer:
          "就过境免签而言,算。从内地飞往香港的续程票满足“第三国或地区”的要求。",
      },
      {
        question: "一趟旅行能用两次 240 小时吗?",
        answer:
          "每一次入境都按它自己的续程票单独判定。离开内地再回来,第二次入境要重新满足条件。多国行程最常在这里散架。",
      },
      {
        question: "L 签要办多久?",
        answer: "因领区和季节而异。在你付掉任何不可退的费用之前先去办。",
      },
    ],
    ctaEyebrow: "如果决定权在航线",
    ctaTitle: "那这件事从来就不是签证问题。",
    ctaBody:
      "你要不要签证,取决于航班顺序、从哪个口岸入境、以及下一程去哪 —— 而这三件事,同时也决定了这趟旅行本身好不好。把你正在考虑的路线发给我们:城市、大概什么时候、原本打算从哪里飞回去。我们会告诉你它属于哪条入境路径,以及要符合条件需要改什么。",
    ctaBoundary:
      "我们做旅行规划,不是签证代办。我们不递交申请,也从不索取护照或证件材料。",
    ctaAction: "开始一次行程沟通",
    relatedTitle: "相关指南",
    relatedLinkLabel: "你的中国行程是不是太赶了?",
    relatedLinkDescription: "入境路径定下来之后,下一个问题是这些天数到底够不够。",
    schemaAbout: ["中国签证", "240 小时过境免签", "美国护照", "中国旅行规划"],
  },
  ko: {
    htmlLang: "ko",
    homePath: "/ko/",
    guidesPath: "/ko/guides/",
    skipLink: "본문으로 건너뛰기",
    breadcrumbLabel: "탐색 경로",
    breadcrumbHome: "홈",
    breadcrumbGuides: "가이드",
    breadcrumbCurrent: "미국 여권, 중국 비자가 필요한가",
    eyebrow: "입국 가이드 · 미국",
    title: "2026년, 미국 여권으로 중국에 가려면 비자가 필요할까요?",
    directAnswer:
      "일반적인 여행이라면 필요합니다. 중국에 들어갔다가 미국으로 돌아오는 일정이라면 미국 여권도 L 비자를 받아야 합니다. 다만 미국인에게 열려 있는 면제 통로가 하나 있고, 베이징이나 상하이에서 열흘을 보내기에 충분할 만큼 넓습니다. 어느 쪽에 해당하는지는 준비한 서류가 아니라, 중국을 떠난 뒤 어디로 가느냐가 정합니다.",
    directAnswerTail:
      "많은 분이 순서를 거꾸로 밟습니다. 항공권부터 끊고 나서 비자를 묻습니다. 그때는 이미 항공권이 답을 정해 버린 뒤입니다.",
    scopeNote:
      "이 페이지는 일반 미국 여권으로 관광 목적의 중국 본토 방문을 다룹니다. 이민 관련 조언이 아니며, 저희는 비자를 대행하지 않습니다.",
    updatedLabel: "최종 업데이트",
    updatedDate: "2026년 7월 24일",
    heroAlt: "상하이 푸둥 국제공항 도착층, 머리 위로 중국어·영어 안내 표지판이 보인다.",
    heroCaption: "비자가 필요한지 여부는 이 홀에 닿기 훨씬 전에 이미 정해집니다.",
    sectionOne: {
      id: "round-trip",
      title: "왕복 일정에는 예외가 없습니다",
      paragraphs: [
        "뉴욕에서 베이징으로 갔다가 다시 뉴욕으로 돌아온다면 관광 비자가 필요합니다. 지난 2년간 이어진 무비자 발표들도 이 점은 바꾸지 못했습니다. 그 명단은 유럽·호주·한국·일본 여권을 다뤘고 수십 개국에 이르렀지만, 일반 관광 항목에 미국이 들어간 적은 없습니다.",
        "정말로 달라진 것은 서류 부담입니다. 2024년 1월 1일부터 대사관은 L 비자 신청 시 왕복 항공권, 호텔 예약, 일자별 일정표, 초청장을 요구하지 않습니다. 비자는 여전히 필요하지만, 더 이상 과제처럼 준비할 일은 아닙니다.",
      ],
    },
    sectionTwo: {
      id: "transit",
      title: "그리고 미국인이 거의 쓰지 않는 면제 통로",
      lead: "미국은 중국 240시간 무비자 환승이 적용되는 55개국 명단에 있습니다. 열흘, 무비자, 신청도 수수료도 없습니다.",
      paragraphs: [
        "2025년 11월 5일부터 이 정책은 24개 성급 지역의 65개 항구·공항에 적용됩니다. 베이징, 상하이, 광저우, 시안, 청두가 모두 포함됩니다.",
        "모든 것을 지탱하는 조건은 하나입니다. 다음 구간 항공권이 제3국 또는 제3지역으로 향해야 하고, 좌석과 날짜가 확정되어 있어야 합니다.",
        "뉴욕 → 베이징 → 뉴욕은 환승이 아닙니다. 환승 옷을 걸친 왕복일 뿐이며 조건을 만족하지 못합니다. 뉴욕 → 베이징 → 서울은 됩니다. 뉴욕 → 상하이 → 홍콩도 됩니다. 여기서 홍콩은 별개 지역으로 취급되기 때문입니다. 즉 애초에 아시아를 벗어날 생각이 없던 일정도 조건에 맞게 짤 수 있다는 뜻입니다.",
        "2025년 11월 확대에는 대부분의 영어 가이드가 아직 따라잡지 못한 내용이 있습니다. 새로 추가된 항구에 강주아오 대교와 광선강 고속철도 시주룽역이 포함되었습니다. 이제 반드시 비행기로 들어올 필요가 없습니다. 홍콩에서 육로나 고속철도로 본토에 닿는 경로도 같은 면제 안에 들어갈 수 있습니다.",
        "여권 잔여 유효기간은 3개월 이상이어야 합니다.",
      ],
    },
    sectionThree: {
      id: "where-it-fails",
      title: "실제로 문제가 터지는 지점",
      lead: "중국이 아니라, 미국의 탑승 게이트입니다.",
      paragraphs: [
        "확인하는 주체는 항공사입니다. 직원이 여권과 다음 구간 항공권을 대조해 면제 조건을 만족하지 못하는 경로임을 확인하면 탑승할 수 없습니다. 중국 당국이 서류를 보기 몇 시간 전, 바다 이쪽 편에서 벌어지는 일이고, 이의를 제기할 곳도 없습니다.",
        "그래서 정말 중요한 실수는 모두 몇 주 전 예약 단계에서 일어납니다. 미국으로 돌아오는 구간을 먼저 확정한 뒤에야 이 여행이 다른 곳에서 끝났어야 했는지를 따져 보는 것. 지정된 항구와 허용 지역에 묶인 면제를 “무비자 = 제한 없음”으로 읽는 것. 작년에 읽은 정책을 올해의 항구 목록이라고 여기는 것.",
        "모두 계획 단계에서는 고치기 싼 문제이고, 공항에서 발견하면 비싼 문제입니다.",
      ],
    },
    reviewTitle: "작성과 확인",
    reviewBody:
      "Homeground는 자체 현지 팀을 둔 독립 중국 여행 설계 스튜디오입니다. 이 페이지는 국무원, 국가이민관리국, 주미 중국대사관이 공개한 규정을 따릅니다. 입국 정책은 중국 여행에서 가장 빠르게 바뀌는 부분입니다. 저희는 최소 90일마다 이 페이지를 다시 확인하고 변경 사항에 날짜를 표기합니다. 예약 전에 아래 출처로 본인의 경로를 확인하세요.",
    sourcesLabel: "공식 출처",
    sources: sharedSources,
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        question: "이제 미국인은 중국에 무비자로 갈 수 있나요?",
        answer:
          "왕복 일정은 아닙니다. 미국 여권이 무비자로 중국 본토에 들어가는 경우는 하나입니다. 지정된 항구를 통해 240시간 안에 제3국 또는 제3지역으로 환승하는 경우입니다.",
      },
      {
        question: "홍콩은 중국을 떠난 것으로 치나요?",
        answer:
          "환승 면제에 한해서는 그렇습니다. 본토에서 홍콩으로 가는 다음 구간 항공권은 제3국·제3지역 요건을 충족합니다.",
      },
      {
        question: "한 여행에서 240시간을 두 번 쓸 수 있나요?",
        answer:
          "입국할 때마다 그 입국의 다음 구간 항공권으로 따로 판단합니다. 본토를 떠났다가 다시 들어오면 두 번째 입국도 조건을 처음부터 다시 만족해야 합니다. 여러 나라를 도는 일정이 가장 자주 무너지는 지점입니다.",
      },
      {
        question: "L 비자는 얼마나 걸리나요?",
        answer:
          "영사관과 시기에 따라 다릅니다. 환불되지 않는 비용을 지불하기 전에 신청하세요.",
      },
    ],
    ctaEyebrow: "경로가 결정한다면",
    ctaTitle: "그렇다면 이것은 애초에 비자 문제가 아니었습니다.",
    ctaBody:
      "비자가 필요한지는 항공편의 순서, 어느 항구로 들어가는지, 그다음에 어디로 가는지가 정합니다. 그리고 이 세 가지는 여행 자체가 좋은지를 결정하는 요소이기도 합니다. 고민 중인 경로를 보내 주세요. 도시, 대략의 시기, 그리고 원래 어디에서 돌아올 생각이었는지를요. 어느 입국 경로에 해당하는지, 조건을 맞추려면 무엇을 바꿔야 하는지 알려 드리겠습니다.",
    ctaBoundary:
      "저희는 여행을 설계하며, 비자 대행사가 아닙니다. 신청을 접수하지 않고 여권이나 서류를 요구하지도 않습니다.",
    ctaAction: "여행 상담 시작하기",
    relatedTitle: "관련 가이드",
    relatedLinkLabel: "중국 여행 일정이 너무 빠듯한가요?",
    relatedLinkDescription:
      "입국 경로가 정해진 다음의 질문은, 그 일수가 실제로 충분한가입니다.",
    schemaAbout: ["중국 비자", "240시간 무비자 환승", "미국 여권", "중국 여행 설계"],
  },
};

export function getUsChinaVisaCopy(
  locale: HomegroundLocale,
): UsChinaVisaCopy {
  return copies[locale];
}
