export type Lang = "en" | "ko" | "zh";

export const langPrefix: Record<Lang, string> = { en: "", ko: "/ko", zh: "/zh" };

export const langLabels: Record<Lang, string> = {
  en: "EN",
  ko: "한국어",
  zh: "中文",
};

const en = {
  meta: {
    title: "Homeground China — Private, Fully-Handled China Trips · China, handled.",
    description:
      "Private, tailor-made China trips planned by a Zhangjiajie-born local. No shopping stops, no hidden fees — payments, transport, tickets and an English-speaking guide, all handled.",
  },
  header: {
    navJourneys: "Journeys",
    navHandled: "What's handled",
    navWhy: "Why Xuan",
    navGuide: "2026 entry guide",
    cta: "Start planning",
    backHome: "Back to home",
    mobileJourneys: "Sample journeys",
  },
  visa: {
    strong: "2026 entry update:",
    rest: "UK, Canadian and Australian passport holders can visit China visa-free for up to 30 days.",
    link: "Check the practical guide",
  },
  hero: {
    kicker: "Born in Zhangjiajie · planning all of China",
    h1a: "Private China journeys,",
    h1b: "personally handled.",
    lead: "A tailor-made trip shaped by someone who understands China from the inside and the questions international travellers ask before they arrive.",
    ctaPrimary: "Plan my China trip",
    ctaSecondary: "Explore sample journeys",
    assurances: ["No shopping stops", "Final scope in writing", "Licensed local partners"],
  },
  slides: [
    { kicker: "Home ground", place: "Zhangjiajie, Hunan" },
    { kicker: "Skyline finale", place: "Shanghai" },
    { kicker: "The grand capital", place: "Beijing" },
    { kicker: "Mountain old town", place: "Lijiang, Yunnan" },
    { kicker: "Spring in the city", place: "Chongqing" },
    { kicker: "Misty lakeside", place: "Hangzhou, Zhejiang" },
    { kicker: "Lanterns & food", place: "Chaoshan, Guangdong" },
  ],
  proof: [
    { strong: "Locally designed", sub: "Not copied from a package brochure" },
    { strong: "Clear money rules", sub: "Inclusions agreed before booking" },
    { strong: "Paced for humans", sub: "Especially parents and families" },
    { strong: "One accountable contact", sub: "Xuan stays personally involved" },
  ],
  journeys: {
    kicker: "Start with a shape, not a package",
    h2: "Which China journey sounds like yours?",
    lead: "These are starting points, not fixed departures. Switch between them to see how the pace, route and priorities change.",
    adapt: "Adapt this journey for me",
    items: [
      {
        tab: "Zhangjiajie & Hunan",
        kicker: "The Peach Blossom Spring Route · Xuan's home turf",
        title: "Stone peaks, river towns, and the shortcuts only a local knows",
        summary:
          "A slower, more personal route through Zhangjiajie, Tianmen Mountain and Fenghuang. We choose cable cars, entrances and hotel locations around your knees, your pace and the weather.",
        duration: "5–7 days",
        bestFor: "Couples, parents, first-time China visitors",
        highlights: [
          "Quiet-entry timing for the national park",
          "Tianmen Mountain without a punishing day",
          "Fenghuang after the day-trip crowds leave",
        ],
        route: ["Arrive Zhangjiajie", "Wulingyuan", "Tianmen Mountain", "Fenghuang"],
      },
      {
        tab: "First China trip",
        kicker: "The essential route",
        title: "Beijing, Xi'an and Shanghai without racing through them",
        summary:
          "China's great first journey, connected by high-speed rail and paced with breathing room. We balance landmarks with neighbourhoods, food and genuinely free evenings.",
        duration: "9–12 days",
        bestFor: "First visits, couples, private family groups",
        highlights: [
          "A quieter Great Wall section matched to mobility",
          "Terracotta Army with a private local guide",
          "Shanghai food, lanes and skyline at your pace",
        ],
        route: ["Beijing", "Xi'an", "Shanghai", "Optional water town"],
      },
      {
        tab: "Family & parents",
        kicker: "Comfort-first planning",
        title: "A multi-generation trip where nobody has to keep up",
        summary:
          "Shorter walking blocks, sensible hotel locations, private transfers and flexible mornings. The itinerary works for grandparents, adult children and younger travellers together.",
        duration: "7–14 days",
        bestFor: "Parents, grandparents, multi-generation families",
        highlights: [
          "Step and walking-load review before booking",
          "Private vehicle where it genuinely saves energy",
          "Meal, rest and bathroom stops built into the day",
        ],
        route: ["Your gateway city", "Two main bases", "Rest-flex day", "Easy departure"],
      },
      {
        tab: "Food & culture",
        kicker: "Built around what you love",
        title: "Eat your way through China, beyond tourist dining rooms",
        summary:
          "Markets, regional dishes, tea houses and neighbourhood walks become the backbone of the route. Every stop is chosen around your tastes and dietary needs.",
        duration: "6–12 days",
        bestFor: "Food lovers, repeat visitors, curious couples",
        highlights: [
          "Regional food route, not a generic tasting list",
          "Dietary notes translated and shared in advance",
          "Markets and kitchens balanced with major sights",
        ],
        route: ["Choose a region", "Market morning", "Local table", "Culture and craft"],
      },
    ],
  },
  included: {
    kicker: "The difficult parts are the product",
    h2: "What “fully handled” actually means",
    lead: "China is easy to love and unusually hard to improvise. The work happens before small frictions become lost hours.",
    groups: [
      {
        label: "Before you fly",
        title: "A route that already works on paper",
        items: [
          "Day-by-day plan built around your pace",
          "Hotels, trains, guides and tickets coordinated",
          "Alipay, connectivity and arrival preparation",
        ],
      },
      {
        label: "From arrival",
        title: "No figuring China out while jet-lagged",
        items: [
          "Private arrival transfer when included",
          "English-speaking local support and guides",
          "Clear daily meeting points and timings",
        ],
      },
      {
        label: "While travelling",
        title: "A real person when plans need to move",
        items: [
          "Xuan stays involved throughout the journey",
          "Local partners handle on-ground changes",
          "No shopping detours or surprise add-ons",
        ],
      },
    ],
    handled: [
      "Mobile payments",
      "Rail bookings",
      "Attraction tickets",
      "Sensible hotels",
      "English support",
      "Real local food",
    ],
  },
  process: {
    kicker: "Simple on your side",
    h2: "From first message to arrival",
    lead: "You do not need to know which train, entrance or app to choose. Start with the people and the kind of days you want.",
    steps: [
      {
        title: "Tell me about your people",
        body: "Who is travelling, when you might come, what you love and what would make the trip tiring.",
      },
      {
        title: "Receive a sample route",
        body: "I shape the cities, pacing and logistics into a first itinerary with an honest sample quote.",
      },
      {
        title: "Refine it together",
        body: "We change the route until it feels like your trip, then put inclusions and exclusions in writing.",
      },
      {
        title: "Travel with support",
        body: "Licensed local partners deliver the on-ground services while I remain personally involved.",
      },
    ],
  },
  about: {
    kicker: "Why Xuan",
    h2: "Born in Zhangjiajie. Living in Korea. Working across both perspectives.",
    lead: "I'm Xuan. Zhangjiajie is not a destination I learned from a supplier sheet; it is where I grew up. Living in Korea also taught me what China looks like from the outside: exciting, but full of questions about language, payments, cleanliness, distances and whether anyone will take responsibility.",
    body: "I personally shape each route and remain your point of contact. Licensed local partners deliver guides, vehicles and booked services on the ground across China.",
    caption: "Good planning is often the route you do not have to walk.",
    imageAlt: "An older couple enjoying the mountain view in Zhangjiajie",
    resp: [
      { strong: "Xuan personally", sub: "Designs the route, quote and trip preparation" },
      { strong: "Local partners", sub: "Deliver licensed guides, vehicles and local support" },
    ],
  },
  promise: {
    kicker: "The written promise",
    h2: "No forced shopping. No optional-extra ambush.",
    points: [
      {
        strong: "The quote defines the price.",
        rest: "What is included and excluded is stated before you approve it.",
      },
      {
        strong: "No commission detours.",
        rest: "Your day is for the places you came to see, not compulsory shops.",
      },
    ],
  },
  faq: {
    kicker: "Straight answers",
    h2: "Questions worth asking before a China trip",
    lead: "Prefer to ask directly? Message Xuan and describe the part that feels uncertain.",
    ask: "Ask on Messenger",
    items: [
      {
        q: "Is this a private tour or a group package?",
        a: "It is a private, tailor-made journey for your own party. There is no tour bus to keep up with and no fixed shopping itinerary. Your route, pace and inclusions are agreed before booking.",
      },
      {
        q: "Are there shopping stops or optional-extra surprises?",
        a: "No forced shopping stops. The itinerary and quote state what is included and excluded, and the price you approve is the agreed price for that scope. If you ask to add something later, the cost is discussed before it is booked.",
      },
      {
        q: "Can you plan for parents or travellers with limited mobility?",
        a: "Yes. Tell me about stairs, walking tolerance and health considerations before the route is designed. I will flag difficult days honestly and use cable cars, closer hotels, private vehicles and rest time where they help.",
      },
      {
        q: "Who actually runs the trip in China?",
        a: "I personally design and coordinate the journey. Licensed local partners provide the booked guides, vehicles and on-ground services in each destination. I stay involved from the first message through the trip.",
      },
      {
        q: "Do I need Alipay, WeChat Pay or a VPN?",
        a: "Most visitors benefit from setting up mobile payment and connectivity before arrival. The exact recommendation depends on your phone, bank cards and destinations, so these are checked during trip preparation rather than left until you land.",
      },
      {
        q: "How do we start, and is the first itinerary free?",
        a: "Send a short trip brief below. I will reply with initial route thinking and a sample quote without an obligation to book. Nothing is confirmed until you approve the written itinerary and terms.",
      },
    ],
  },
  plan: {
    kicker: "A useful first message",
    h2: "Build your trip brief in under a minute",
    lead: "Choose the basics and we'll turn them into a clear message for Xuan. No account, no booking pressure, and nothing is submitted until you decide to send it.",
    note: "You'll receive a suggested route and sample quote, then refine it together before anything is booked.",
    whoLegend: "Who is travelling?",
    partyOptions: ["2 people", "3–5 people", "6+ people"],
    timingLabel: "Rough timing",
    timingOptions: [
      "Not sure yet",
      "Within 3 months",
      "3–6 months away",
      "6–12 months away",
      "More than a year away",
    ],
    paceLegend: "Daily pace",
    paceOptions: ["Gentle", "Balanced", "Full days"],
    interestsLegend: "What matters most?",
    interestOptions: ["Landscapes", "History", "Food", "Local life", "Photography", "Family comfort"],
    previewLabel: "Your message",
    briefIntro: "Hello Xuan, I'd like help planning a private China trip.",
    briefParty: "Travel party",
    briefTiming: "Timing",
    briefPace: "Preferred pace",
    briefInterests: "Main interests",
    briefOpen: "Open to suggestions",
    briefOutro: "Could you suggest a route and a sample quote?",
    copyOpen: "Copy & open Messenger",
    copyOnly: "Copy only",
    copied: "Copied",
    emailBtn: "Send by email",
    emailSubject: "Private China trip enquiry",
    copiedStatus: "Trip brief copied. Paste it into Messenger when it opens.",
  },
  footer: {
    brandLine:
      "Private China journeys planned by a Zhangjiajie local and delivered with licensed partners across China.",
    exploreH: "Explore",
    linkJourneys: "Sample journeys",
    linkHandled: "What we handle",
    linkAbout: "About Xuan",
    linkGuide: "2026 entry guide",
    talkH: "Talk to Xuan",
    messenger: "Facebook Messenger",
    langsSpoken: "English · 中文 · 한국어",
    legalLeft: "© 2026 Homeground China",
    legalRight:
      "Visa and entry policies change. Confirm current rules with your airline or embassy before travel.",
  },
  floating: "Ask Xuan",
};

export type Dict = typeof en;

const ko: Dict = {
  meta: {
    title: "장가계 출신이 직접 챙기는 중국 맞춤여행",
    description:
      "장가계 출신 현지인이 직접 기획하는 프라이빗 중국 맞춤여행. 노쇼핑·숨은 비용 없이 결제·이동·티켓·가이드까지 전부 준비해 드립니다.",
  },
  header: {
    navJourneys: "여행 코스",
    navHandled: "무엇을 해결해 주나요",
    navWhy: "왜 쉬안인가",
    navGuide: "2026 입국 가이드",
    cta: "상담 시작하기",
    backHome: "홈으로 돌아가기",
    mobileJourneys: "샘플 여행 코스",
  },
  visa: {
    strong: "2026 입국 업데이트:",
    rest: "영국·캐나다·호주 여권 소지자는 최대 30일 무비자로 중국 여행이 가능합니다. (한국 여권도 30일 무비자!)",
    link: "실전 가이드 보기",
  },
  hero: {
    kicker: "장가계 출신 · 중국 전역 맞춤 기획",
    h1a: "프라이빗 중국 여행,",
    h1b: "제가 직접 챙깁니다.",
    lead: "중국을 안에서부터 아는 사람이, 여행자들이 출발 전 가장 걱정하는 것들까지 헤아려 설계하는 맞춤 여행입니다.",
    ctaPrimary: "내 중국 여행 계획하기",
    ctaSecondary: "샘플 코스 둘러보기",
    assurances: ["노쇼핑", "확정 내역 서면 안내", "현지 정식 파트너"],
  },
  slides: [
    { kicker: "쉬안의 고향", place: "장가계 · 후난" },
    { kicker: "스카이라인의 피날레", place: "상하이" },
    { kicker: "대륙의 수도", place: "베이징" },
    { kicker: "설산 아래 옛 마을", place: "리장 · 윈난" },
    { kicker: "도시의 봄", place: "충칭" },
    { kicker: "안개 낀 호반", place: "항저우 · 저장" },
    { kicker: "홍등과 미식의 거리", place: "차오산 · 광둥" },
  ],
  proof: [
    { strong: "현지인의 설계", sub: "패키지 브로슈어 복사본이 아닙니다" },
    { strong: "투명한 비용 원칙", sub: "포함 내역을 예약 전에 확정" },
    { strong: "사람에 맞춘 일정", sub: "특히 부모님·가족 여행에" },
    { strong: "책임지는 한 사람", sub: "쉬안이 처음부터 끝까지 직접" },
  ],
  journeys: {
    kicker: "패키지가 아니라 밑그림에서 시작",
    h2: "어떤 중국 여행이 당신과 닮았나요?",
    lead: "고정된 출발 일정이 아니라 출발점입니다. 탭을 바꿔가며 속도·동선·우선순위가 어떻게 달라지는지 보세요.",
    adapt: "이 코스를 내게 맞게 조정받기",
    items: [
      {
        tab: "장가계 & 후난",
        kicker: "도화원(桃花源) 루트 · 쉬안의 홈그라운드",
        title: "돌기둥 봉우리, 강가 옛 마을, 그리고 현지인만 아는 지름길",
        summary:
          "장가계·천문산·펑황을 여유 있게 도는 코스입니다. 케이블카·입구·호텔 위치를 무릎 상태, 걷는 속도, 날씨에 맞춰 고릅니다.",
        duration: "5–7일",
        bestFor: "부부, 부모님, 첫 중국 여행자",
        highlights: [
          "국립공원 한산한 시간대 입장",
          "무리 없는 하루로 짜는 천문산",
          "당일 관광객이 빠진 뒤의 펑황",
        ],
        route: ["장가계 도착", "우링위안", "천문산", "펑황"],
      },
      {
        tab: "첫 중국 여행",
        kicker: "정석 코스",
        title: "베이징·시안·상하이, 쫓기지 않고 제대로",
        summary:
          "고속철도로 잇는 중국의 대표 첫 여정. 랜드마크와 골목·미식, 그리고 진짜 자유로운 저녁 시간의 균형을 잡습니다.",
        duration: "9–12일",
        bestFor: "첫 방문, 부부, 프라이빗 가족 그룹",
        highlights: [
          "체력에 맞춘 한산한 만리장성 구간",
          "전담 현지 가이드와 함께하는 병마용",
          "내 속도로 즐기는 상하이 미식과 스카이라인",
        ],
        route: ["베이징", "시안", "상하이", "수향마을(선택)"],
      },
      {
        tab: "가족 & 부모님",
        kicker: "편안함 우선 설계",
        title: "누구도 무리해서 따라가지 않는 3대 가족 여행",
        summary:
          "짧은 도보 구간, 합리적인 호텔 위치, 전용 차량 이동, 여유로운 아침. 조부모님부터 자녀까지 모두에게 맞는 일정입니다.",
        duration: "7–14일",
        bestFor: "부모님, 조부모님, 3대 가족",
        highlights: [
          "예약 전 계단·도보량 사전 점검",
          "체력을 아껴주는 구간엔 전용 차량",
          "식사·휴식·화장실까지 일정에 반영",
        ],
        route: ["도착 도시", "핵심 거점 2곳", "휴식 유연일", "여유로운 출국"],
      },
      {
        tab: "미식 & 문화",
        kicker: "좋아하는 것 중심 설계",
        title: "관광객 식당 밖에서, 먹으며 여행하는 중국",
        summary:
          "시장, 지역 요리, 찻집, 동네 산책이 여정의 뼈대가 됩니다. 모든 목적지를 입맛과 식이 조건에 맞춰 고릅니다.",
        duration: "6–12일",
        bestFor: "미식가, 재방문자, 호기심 많은 커플",
        highlights: [
          "뻔한 시식 리스트가 아닌 지역 미식 동선",
          "식이 제한 사항은 미리 번역·전달",
          "시장·주방과 대표 명소의 균형",
        ],
        route: ["지역 선택", "아침 시장", "현지인의 식탁", "문화와 공예"],
      },
    ],
  },
  included: {
    kicker: "어려운 부분이 곧 저희의 서비스입니다",
    h2: "“전부 챙겨드린다”의 실제 의미",
    lead: "중국은 사랑하기 쉽지만 즉흥으로 다니기는 유난히 어려운 곳입니다. 작은 마찰이 잃어버린 시간이 되기 전에, 미리 움직입니다.",
    groups: [
      {
        label: "출발 전",
        title: "종이 위에서 이미 완성된 동선",
        items: [
          "걷는 속도에 맞춘 일자별 일정",
          "호텔·기차·가이드·티켓 일괄 조율",
          "알리페이·인터넷·입국 준비까지",
        ],
      },
      {
        label: "도착부터",
        title: "시차에 시달리며 중국을 파악할 필요 없음",
        items: [
          "포함 시 전용 공항 픽업",
          "언어가 통하는 현지 서포트와 가이드",
          "매일 명확한 집합 장소와 시간",
        ],
      },
      {
        label: "여행 중",
        title: "일정이 흔들릴 때 움직여 주는 진짜 사람",
        items: [
          "쉬안이 여정 내내 직접 관여",
          "현지 파트너가 즉시 대응",
          "쇼핑 우회·기습 추가금 없음",
        ],
      },
    ],
    handled: ["모바일 결제", "기차표 예매", "입장권", "합리적인 호텔", "언어 지원", "진짜 현지 음식"],
  },
  process: {
    kicker: "당신 쪽은 간단합니다",
    h2: "첫 메시지부터 도착까지",
    lead: "어떤 기차·입구·앱을 골라야 할지 몰라도 됩니다. 함께 갈 사람과 원하는 하루의 모습에서 시작하세요.",
    steps: [
      {
        title: "동행을 알려주세요",
        body: "누가, 언제쯤, 무엇을 좋아하고 무엇이 힘든지만 알려주시면 됩니다.",
      },
      {
        title: "샘플 일정 받기",
        body: "도시·속도·동선을 첫 일정표로 만들어 정직한 예상 견적과 함께 보내드립니다.",
      },
      {
        title: "함께 다듬기",
        body: "내 여행처럼 느껴질 때까지 고친 뒤, 포함·불포함 내역을 서면으로 확정합니다.",
      },
      {
        title: "든든하게 여행하기",
        body: "현지 정식 파트너가 현장을 맡고, 저는 끝까지 직접 챙깁니다.",
      },
    ],
  },
  about: {
    kicker: "왜 쉬안인가",
    h2: "장가계에서 태어나, 한국에서 살며, 양쪽의 시선으로 일합니다.",
    lead: "저는 쉬안입니다. 장가계는 공급사 자료로 배운 목적지가 아니라 제가 자란 곳입니다. 한국에서 살아보니 밖에서 본 중국이 어떤 모습인지도 알게 됐습니다 — 설레지만, 언어·결제·위생·거리, 그리고 ‘누가 책임져 주나’에 대한 물음표가 가득한 곳이라는 걸요.",
    body: "모든 동선은 제가 직접 설계하고, 연락 창구도 저 하나입니다. 현장의 가이드·차량·예약 서비스는 중국 전역의 정식 파트너가 수행합니다.",
    caption: "좋은 설계란, 걷지 않아도 되는 길을 미리 알아두는 것.",
    imageAlt: "장가계에서 산 풍경을 즐기는 노부부",
    resp: [
      { strong: "쉬안이 직접", sub: "동선 설계·견적·출발 준비" },
      { strong: "현지 파트너", sub: "정식 가이드·차량·현장 서포트" },
    ],
  },
  promise: {
    kicker: "서면 약속",
    h2: "강제 쇼핑 없음. 기습 옵션 없음.",
    points: [
      {
        strong: "견적서가 곧 가격입니다.",
        rest: "포함·불포함 내역을 승인 전에 명시합니다.",
      },
      {
        strong: "커미션을 위한 우회는 없습니다.",
        rest: "당신의 하루는 보러 온 곳을 위한 것이지, 의무 쇼핑을 위한 것이 아닙니다.",
      },
    ],
  },
  faq: {
    kicker: "정직한 답변",
    h2: "중국 여행 전에 물어볼 만한 질문들",
    lead: "직접 물어보고 싶으신가요? 마음에 걸리는 부분을 그대로 쉬안에게 보내주세요.",
    ask: "메신저로 물어보기",
    items: [
      {
        q: "프라이빗 여행인가요, 단체 패키지인가요?",
        a: "일행만을 위한 프라이빗 맞춤 여행입니다. 따라가야 할 관광버스도, 정해진 쇼핑 일정도 없습니다. 동선·속도·포함 내역을 예약 전에 함께 확정합니다.",
      },
      {
        q: "쇼핑센터나 기습 추가 옵션이 있나요?",
        a: "강제 쇼핑은 없습니다. 일정표와 견적서에 포함·불포함이 명시되며, 승인하신 금액이 그 범위의 확정 금액입니다. 나중에 추가를 원하시면 비용을 먼저 상의한 뒤 예약합니다.",
      },
      {
        q: "부모님이나 거동이 불편한 분도 갈 수 있나요?",
        a: "네. 계단, 도보 가능 정도, 건강상 고려사항을 설계 전에 알려주세요. 힘든 날은 솔직하게 표시하고 케이블카·가까운 호텔·전용 차량·휴식 시간을 적절히 씁니다.",
      },
      {
        q: "중국 현지에서는 실제로 누가 진행하나요?",
        a: "여정의 설계와 조율은 제가 직접 합니다. 각 목적지의 가이드·차량·현장 서비스는 정식 라이선스를 가진 현지 파트너가 제공합니다. 첫 메시지부터 여행이 끝날 때까지 제가 함께합니다.",
      },
      {
        q: "알리페이, 위챗페이, VPN이 필요한가요?",
        a: "대부분의 여행자는 출발 전에 모바일 결제와 인터넷을 준비해 두는 편이 좋습니다. 휴대폰·카드·목적지에 따라 답이 달라지므로, 착륙 후로 미루지 않고 출발 준비 단계에서 함께 점검합니다.",
      },
      {
        q: "어떻게 시작하나요? 첫 일정표는 무료인가요?",
        a: "아래에서 간단한 여행 브리프를 보내주세요. 예약 의무 없이 초기 동선과 예상 견적으로 답장드립니다. 서면 일정표와 조건을 승인하시기 전에는 아무것도 확정되지 않습니다.",
      },
    ],
  },
  plan: {
    kicker: "쓸모 있는 첫 메시지",
    h2: "1분 안에 여행 브리프 만들기",
    lead: "기본 사항만 고르시면 쉬안에게 보낼 명확한 메시지로 만들어 드립니다. 계정도, 예약 압박도 없고, 보내기로 결정하기 전에는 아무것도 전송되지 않습니다.",
    note: "제안 동선과 예상 견적을 받아보신 뒤, 예약 전에 함께 다듬게 됩니다.",
    whoLegend: "누가 가시나요?",
    partyOptions: ["2명", "3–5명", "6명 이상"],
    timingLabel: "대략적인 시기",
    timingOptions: ["아직 미정", "3개월 이내", "3–6개월 뒤", "6–12개월 뒤", "1년 이상 뒤"],
    paceLegend: "하루 일정 강도",
    paceOptions: ["여유롭게", "균형 있게", "알차게"],
    interestsLegend: "무엇이 가장 중요한가요?",
    interestOptions: ["풍경", "역사", "미식", "현지 생활", "사진", "가족의 편안함"],
    previewLabel: "보낼 메시지",
    briefIntro: "안녕하세요 쉬안님, 프라이빗 중국 여행 계획을 도와주세요.",
    briefParty: "여행 인원",
    briefTiming: "시기",
    briefPace: "선호 일정 강도",
    briefInterests: "주요 관심사",
    briefOpen: "추천에 맡길게요",
    briefOutro: "동선과 예상 견적을 제안해 주실 수 있나요?",
    copyOpen: "복사하고 메신저 열기",
    copyOnly: "복사만",
    copied: "복사됨",
    emailBtn: "이메일로 보내기",
    emailSubject: "프라이빗 중국 여행 문의",
    copiedStatus: "브리프가 복사되었습니다. 메신저가 열리면 붙여넣어 주세요.",
  },
  footer: {
    brandLine:
      "장가계 출신 현지인이 설계하고, 중국 전역의 정식 파트너가 함께 수행하는 프라이빗 중국 여행.",
    exploreH: "둘러보기",
    linkJourneys: "샘플 여행 코스",
    linkHandled: "무엇을 해결해 주나요",
    linkAbout: "쉬안 소개",
    linkGuide: "2026 입국 가이드",
    talkH: "쉬안에게 문의",
    messenger: "페이스북 메신저",
    langsSpoken: "English · 中文 · 한국어",
    legalLeft: "© 2026 Homeground China",
    legalRight: "비자·입국 정책은 변경될 수 있습니다. 출발 전 항공사나 대사관에서 최신 규정을 확인하세요.",
  },
  floating: "쉬안에게 묻기",
};

const zh: Dict = {
  meta: {
    title: "张家界人亲自操办的中国定制游",
    description:
      "张家界出身的本地人亲自规划的私人定制中国之旅。无购物、无隐藏费用——支付、交通、门票、向导,全部替你安排好。",
  },
  header: {
    navJourneys: "行程灵感",
    navHandled: "我们管什么",
    navWhy: "为什么选쉬안",
    navGuide: "2026 入境指南",
    cta: "开始规划",
    backHome: "返回首页",
    mobileJourneys: "示例行程",
  },
  visa: {
    strong: "2026 入境更新:",
    rest: "英国、加拿大、澳大利亚护照持有者可免签入境中国,最长停留 30 天。",
    link: "查看实用指南",
  },
  hero: {
    kicker: "生于张家界 · 规划全中国",
    h1a: "私人定制中国之旅,",
    h1b: "由我亲自操办。",
    lead: "由一个真正从内部了解中国、也懂海外旅行者出发前所有顾虑的人,为你量身设计这趟旅程。",
    ctaPrimary: "规划我的中国行",
    ctaSecondary: "浏览示例行程",
    assurances: ["无购物点", "费用范围白纸黑字", "持牌本地合作方"],
  },
  slides: [
    { kicker: "쉬안的家乡", place: "张家界 · 湖南" },
    { kicker: "天际线的压轴", place: "上海" },
    { kicker: "大国之都", place: "北京" },
    { kicker: "雪山下的古城", place: "丽江 · 云南" },
    { kicker: "山城之春", place: "重庆" },
    { kicker: "烟雨湖畔", place: "杭州 · 浙江" },
    { kicker: "灯笼与美食之街", place: "潮汕 · 广东" },
  ],
  proof: [
    { strong: "本地人设计", sub: "不是照抄旅行社手册" },
    { strong: "费用规则透明", sub: "包含项预订前全部确认" },
    { strong: "节奏为人设计", sub: "尤其照顾父母与家庭" },
    { strong: "一个人负责到底", sub: "쉬안全程亲自跟进" },
  ],
  journeys: {
    kicker: "从一个雏形开始,而不是一个套餐",
    h2: "哪一种中国之旅更像你的?",
    lead: "这些是起点,不是固定发团。切换看看节奏、路线和侧重点有什么不同。",
    adapt: "按我的情况调整这条线",
    items: [
      {
        tab: "张家界 & 湖南",
        kicker: "桃花源线 · 쉬안的主场",
        title: "石峰、江边古镇,和只有本地人知道的捷径",
        summary:
          "更慢、更私人的张家界·天门山·凤凰线。缆车、入口、酒店位置,都按你的膝盖、步速和天气来选。",
        duration: "5–7 天",
        bestFor: "夫妻、父母、第一次来中国的旅行者",
        highlights: ["避开人流的国家公园入园时段", "不累垮人的天门山一日", "等一日游人潮散去后的凤凰"],
        route: ["抵达张家界", "武陵源", "天门山", "凤凰古城"],
      },
      {
        tab: "第一次中国行",
        kicker: "经典必走线",
        title: "北京、西安、上海,不用赶场也能走透",
        summary:
          "高铁串联的中国经典首航线。在地标与街巷、美食和真正自由的夜晚之间找好平衡。",
        duration: "9–12 天",
        bestFor: "首次到访、夫妻、私人家庭团",
        highlights: ["按体力匹配的清静长城段", "私人向导陪同的兵马俑", "按自己节奏逛的上海美食与天际线"],
        route: ["北京", "西安", "上海", "水乡古镇(可选)"],
      },
      {
        tab: "家庭 & 父母",
        kicker: "舒适优先的设计",
        title: "一趟谁都不用勉强跟队的三代同游",
        summary:
          "更短的步行段、位置合理的酒店、专车接送、灵活的早晨。这份行程让祖辈、子女和年轻人都走得舒服。",
        duration: "7–14 天",
        bestFor: "父母、祖父母、三代家庭",
        highlights: ["预订前先核台阶与步行量", "真正省体力的路段用专车", "用餐、休息、洗手间都排进行程"],
        route: ["门户城市", "两个主要落脚点", "弹性休整日", "从容返程"],
      },
      {
        tab: "美食 & 文化",
        kicker: "围绕你所爱来设计",
        title: "避开游客餐厅,一路吃着走中国",
        summary:
          "市场、地方菜、茶馆和街区漫步构成行程的骨架。每一站都按你的口味和饮食禁忌来挑。",
        duration: "6–12 天",
        bestFor: "美食爱好者、回头客、好奇的两人行",
        highlights: ["地方美食动线,不是千篇一律的试吃单", "饮食禁忌提前翻译并交接", "市场与后厨和大景点的平衡"],
        route: ["选一个地区", "早市", "本地人的餐桌", "文化与手艺"],
      },
    ],
  },
  included: {
    kicker: "难办的部分,正是我们的产品",
    h2: "“全包操办”到底是什么意思",
    lead: "中国很容易让人喜欢,却格外难以随性应付。我们的工作,发生在小摩擦变成浪费的几小时之前。",
    groups: [
      {
        label: "出发前",
        title: "纸面上就已经成立的路线",
        items: ["按你的节奏排的逐日计划", "酒店、火车、向导、门票统一协调", "支付宝、上网、落地准备一并搞定"],
      },
      {
        label: "落地起",
        title: "不用倒着时差摸索中国",
        items: ["含接机时专车接送", "语言无障碍的当地支持与向导", "每天清晰的集合地点与时间"],
      },
      {
        label: "旅途中",
        title: "计划有变时,有个真人在动",
        items: ["쉬안全程亲自跟进", "本地合作方即时处理现场变化", "没有购物绕路和临时加价"],
      },
    ],
    handled: ["移动支付", "火车票", "景点门票", "位置合理的酒店", "语言支持", "真正的本地菜"],
  },
  process: {
    kicker: "你这边很简单",
    h2: "从第一条消息到落地",
    lead: "你不需要知道该选哪趟车、哪个入口、哪个 App。从同行的人和你想要的一天开始就好。",
    steps: [
      { title: "告诉我你们是谁", body: "谁出行、大概什么时候、喜欢什么、什么会让旅途疲惫。" },
      { title: "收到示例路线", body: "我把城市、节奏和交通排成第一版行程,并附上实在的预估报价。" },
      { title: "一起打磨", body: "改到像你自己的旅程为止,然后把包含与不包含白纸黑字写清。" },
      { title: "安心出行", body: "持牌本地合作方负责落地服务,我全程亲自跟进。" },
    ],
  },
  about: {
    kicker: "为什么选쉬안",
    h2: "生于张家界,生活在韩国,用两种视角做这件事。",
    lead: "我是쉬안(Xuan)。张家界不是我从供应商资料里学来的目的地,而是我长大的地方。在韩国生活也让我明白了中国在外面看起来的样子:令人兴奋,但充满关于语言、支付、卫生、距离,以及“有没有人负责”的问号。",
    body: "每条路线由我亲自设计,联络人也始终是我。落地的向导、车辆和预订服务,由中国各地的持牌合作方执行。",
    caption: "好的规划,常常是那条你不必走的路。",
    imageAlt: "在张家界欣赏山景的老夫妇",
    resp: [
      { strong: "쉬안亲自", sub: "设计路线、报价与行前准备" },
      { strong: "本地合作方", sub: "提供持牌向导、车辆与现场支持" },
    ],
  },
  promise: {
    kicker: "白纸黑字的承诺",
    h2: "不强制购物。不搞临时加项。",
    points: [
      { strong: "报价单就是价格。", rest: "包含与不包含,在你确认前全部写明。" },
      { strong: "没有为佣金绕的路。", rest: "你的一天属于你想看的地方,不属于必进的商店。" },
    ],
  },
  faq: {
    kicker: "直接的回答",
    h2: "去中国之前,值得先问清的问题",
    lead: "想直接问?把你最拿不准的那部分,原样发给쉬안就行。",
    ask: "在 Messenger 上提问",
    items: [
      {
        q: "这是私人行程还是拼团套餐?",
        a: "是只属于你们一行人的私人定制旅程。没有要追赶的大巴,也没有固定的购物安排。路线、节奏和包含项,都在预订前商定。",
      },
      {
        q: "有购物点或临时加价吗?",
        a: "没有强制购物。行程单和报价单写明包含与不包含,你确认的价格就是该范围的最终价格。之后想增加项目,会先谈好费用再预订。",
      },
      {
        q: "父母或行动不便的人也能安排吗?",
        a: "可以。设计路线前告诉我台阶、步行耐受度和健康考量。吃力的日子我会如实标注,并善用缆车、更近的酒店、专车和休息时间。",
      },
      {
        q: "在中国落地后,实际由谁执行?",
        a: "行程由我亲自设计和统筹。各目的地的向导、车辆和落地服务,由持牌本地合作方提供。从第一条消息到旅程结束,我都在。",
      },
      {
        q: "需要支付宝、微信支付或 VPN 吗?",
        a: "大多数旅行者最好在出发前配好移动支付和上网。具体方案取决于你的手机、银行卡和目的地,所以我们在行前准备阶段一起核对,而不是留到落地再说。",
      },
      {
        q: "怎么开始?第一版行程免费吗?",
        a: "在下方发来一份简短的旅行需求即可。我会回复初步路线思路和示例报价,没有任何预订义务。在你确认书面行程和条款之前,一切都不会被确定。",
      },
    ],
  },
  plan: {
    kicker: "一条有用的第一句话",
    h2: "一分钟内生成你的旅行需求",
    lead: "选好基本项,我们就把它变成一条发给쉬안的清晰消息。不用注册账号、没有预订压力,在你决定发送之前,什么都不会提交。",
    note: "你会先收到建议路线和示例报价,预订之前一起把它打磨到满意。",
    whoLegend: "谁出行?",
    partyOptions: ["2 人", "3–5 人", "6 人以上"],
    timingLabel: "大致时间",
    timingOptions: ["还没想好", "3 个月内", "3–6 个月后", "6–12 个月后", "一年以后"],
    paceLegend: "每日节奏",
    paceOptions: ["轻松", "均衡", "充实"],
    interestsLegend: "你最在意什么?",
    interestOptions: ["风景", "历史", "美食", "当地生活", "摄影", "全家舒适"],
    previewLabel: "你的消息",
    briefIntro: "쉬안你好,想请你帮忙规划一趟私人中国行。",
    briefParty: "出行人数",
    briefTiming: "时间",
    briefPace: "偏好节奏",
    briefInterests: "主要兴趣",
    briefOpen: "听你的建议",
    briefOutro: "能给我一条路线建议和示例报价吗?",
    copyOpen: "复制并打开 Messenger",
    copyOnly: "仅复制",
    copied: "已复制",
    emailBtn: "用邮件发送",
    emailSubject: "私人中国行咨询",
    copiedStatus: "需求已复制。Messenger 打开后粘贴发送即可。",
  },
  footer: {
    brandLine: "由张家界本地人设计、中国各地持牌合作方共同执行的私人中国之旅。",
    exploreH: "浏览",
    linkJourneys: "示例行程",
    linkHandled: "我们管什么",
    linkAbout: "关于쉬안",
    linkGuide: "2026 入境指南",
    talkH: "联系쉬안",
    messenger: "Facebook Messenger",
    langsSpoken: "English · 中文 · 한국어",
    legalLeft: "© 2026 Homeground China",
    legalRight: "签证与入境政策随时可能调整,出发前请向航空公司或使领馆核实最新规定。",
  },
  floating: "问问쉬안",
};

export const translations: Record<Lang, Dict> = { en, ko, zh };

// Static per-slide data shared by all languages (file, crop, coordinates).
export const slideStatics = [
  { file: "hero-zhangjiajie.jpg", position: "center 48%", coords: "29.1° N · 110.5° E" },
  { file: "shanghai-bund-sunset.jpg", position: "center 42%", coords: "31.2° N · 121.5° E" },
  { file: "beijing-forbidden-city.jpg", position: "center 55%", coords: "39.9° N · 116.4° E" },
  { file: "lijiang-old-town.jpg", position: "center 45%", coords: "26.9° N · 100.2° E" },
  { file: "chongqing-monorail.jpg", position: "center 55%", coords: "29.6° N · 106.6° E" },
  { file: "hangzhou-west-lake.jpg", position: "center 60%", coords: "30.3° N · 120.2° E" },
  { file: "chaoshan-lantern-street.jpg", position: "center 45%", coords: "23.4° N · 116.7° E" },
];
