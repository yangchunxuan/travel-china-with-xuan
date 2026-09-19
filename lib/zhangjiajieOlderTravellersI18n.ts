import type { HomegroundLocale } from "./homegroundI18n";

interface ArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  /** Optional emphasised leads rendered before the first paragraph. */
  leads?: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

export interface ZhangjiajieOlderTravellersCopy {
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
  scopeNote: string;
  updatedLabel: string;
  updatedDate: string;
  heroAlt: string;
  heroCaption: string;
  sectionOne: ArticleSection;
  bridgeAlt: string;
  bridgeCaption: string;
  sectionTwo: ArticleSection;
  shuttleAlt: string;
  shuttleCaption: string;
  sectionThree: ArticleSection;
  pillarsAlt: string;
  pillarsCaption: string;
  reviewTitle: string;
  reviewBody: string;
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

const copies: Record<HomegroundLocale, ZhangjiajieOlderTravellersCopy> = {
  en: {
    htmlLang: "en",
    homePath: "/",
    guidesPath: "/guides/",
    skipLink: "Skip to the guide",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbGuides: "Guides",
    breadcrumbCurrent: "Zhangjiajie with older travellers",
    eyebrow: "Planning guide · Zhangjiajie",
    title:
      "Zhangjiajie with Older Travellers: The Mountain Carries You, but the Questions Need Answering",
    directAnswer:
      "Zhangjiajie can work for older travellers who can manage short walks, some steps, queues and boarding transport, but it is not step-free. In the National Forest Park, shuttle buses, cableways and Bailong Elevator connect major viewpoints; the remaining walking, stair count, standing time and weather exposure depend on the exact route and that day's operations. Judge each day by the traveller's real mobility, with fewer viewpoints and a return buffer.",
    scopeNote:
      "This page is about one decision: how to plan a Zhangjiajie trip with an older traveller.",
    updatedLabel: "Updated",
    updatedDate: "2026-09-20",
    heroAlt:
      "The Bailong Elevator rising against a sandstone cliff under a blue sky in Zhangjiajie.",
    heroCaption: "Bailong Elevator removes one major climb, but not every walk or stair.",
    sectionOne: {
      id: "the-mountain-carries-you",
      title: "Transport removes some of the biggest climbs",
      paragraphs: [
        "You arrive at a gate, not a trailhead.",
        "Inside the National Forest Park, shuttle buses, Bailong Elevator and cableways can replace some of the largest climbs on a carefully selected route. They do not remove every transfer, queue, viewpoint loop, uneven surface or stair. The remaining effort depends on the exact entrances, viewpoints and transport operating that day.",
        "At the Tianzi Mountain cableway, the cabins never stop. They come round slowly with the doors open, and someone stands there, a hand on the frame, holding the pace down until you are seated before letting go.",
        "A day that is planned well looks like this: the morning bus, the morning lift, reaching the furthest viewpoint before the crowds arrive; a few hundred metres of level path, a place to sit, one view that genuinely justifies the flight; then working back and leaving the park before dark. Two or three viewpoints is a full, satisfying day at this pace. The fourth is where it starts to feel like work.",
        "A well-selected day can be manageable. The hard part is matching the route, timing and operating conditions to the traveller's real mobility.",
      ],
    },
    bridgeAlt:
      "A natural stone arch spanning a forested gorge in Zhangjiajie, red prayer ribbons tied along its rail.",
    bridgeCaption:
      "Some major viewpoints can be reached with short walks from transport, but each segment still needs checking.",
    sectionTwo: {
      id: "beside-every-machine",
      title: "But beside every machine, there is a person",
      leads: [
        "Three things break a day for an older traveller. What they share is not that they are hard — it is that you cannot look them up.",
      ],
      paragraphs: [
        "The upper section of the Tianmen Mountain cable car has been closed since 6 November 2025, dismantled and being rebuilt. The lower section still runs; reaching the summit now means the lower cable car, road transport up the switchbacks, then escalators. Most English itineraries still describe riding the cable car straight to the top — including some updated only months ago. Anyone arriving with one of those learns the truth at the foot of the mountain. Until then, the plan in their hand looks entirely reasonable.",
        "The Zhangjiajie Grand Canyon glass bridge does not admit wheelchairs, walking frames or similar mobility aids. The English pages disagree with each other on this, and it is not something you want to discover at the entrance.",
        "The shuttle buses inside the park have no published last departure. Services move with the day's crowds. You ask staff, or your guide, on the day — you ask the person standing beside the bus. Every itinerary you will read assumes a timetable exists. It does not.",
      ],
    },
    shuttleAlt:
      "The view forward from inside a Zhangjiajie park shuttle bus, a mountain road curving ahead behind the guardrail.",
    shuttleCaption:
      "There is no published last bus. You ask the person standing beside it.",
    sectionThree: {
      id: "whether-the-day-holds",
      title: "Whether the day holds depends on having someone to ask",
      paragraphs: [
        "For a fast walker, none of this matters. A wrong plan is fixed on the spot, a missed bus becomes a walk down, half an hour lost in a day is nothing.",
        "For a slower traveller, any one of them can end a day. And none of them is solved by reading more — the information is not online. It is held by the people on the mountain, and it changes week to week.",
        "That is why the itinerary someone sent you looks reasonable and does not match the ground. It was built for someone who can walk, on the assumption that every machine is running and nothing has changed.",
        "What we do is plain: we re-check the day's conditions before you set out, put the furthest viewpoint at the quietest hour, and lift the most tiring half-day off the older traveller. And on the day, there is someone on the mountain who can ask the question for you.",
      ],
    },
    pillarsAlt:
      "Sandstone pillars layered into a deep green valley in Zhangjiajie National Forest Park.",
    pillarsCaption: "",
    reviewTitle: "Written and checked",
    reviewBody:
      "Homeground is from Zhangjiajie and draws on our planning team’s first-hand local experience. Route conditions on this page were checked with a local operator on 23 July 2026. Ticketing, transport and access rules here change without much notice; we re-check this page at least every 90 days and date any change. The photographs are our own.",
    faqTitle: "Common questions",
    faq: [
      {
        question: "Is it too strenuous for someone in their seventies?",
        answer:
          "It depends on the traveller's mobility, balance, stamina and health, and medical suitability belongs with them and their doctor. Buses, cableways and lifts can remove major climbs on a selected route, but walking, steps, queues, boarding and weather exposure remain. Plan fewer viewpoints and keep a return buffer.",
      },
      {
        question: "Can we do Zhangjiajie and Tianmen Mountain in one day?",
        answer:
          "We would not. They are separate places with separate tickets and separate ways up, with a transfer between them — and the Tianmen ascent changed in November 2025. Plan them as two days.",
      },
      {
        question: "Is the glass bridge accessible?",
        answer:
          "No. It does not admit wheelchairs, walking frames or similar aids.",
      },
      {
        question: "How many days do we need?",
        answer:
          "For a slower pace, add margin to the usual count — for mist, for queues, for the person walking slowest. Our guide to how many days Zhangjiajie takes works through the base timing.",
      },
    ],
    ctaEyebrow: "Talk it through",
    ctaTitle: "Send us the itinerary you are holding.",
    ctaBody:
      "Tell us who is travelling, roughly when, and who walks slowest. We will tell you which parts do not work in the current conditions, what to drop, and which day to leave open.",
    ctaBoundary: "Before there is any question of payment.",
    ctaAction: "Start a trip conversation",
    relatedTitle: "Continue planning",
    relatedLinkLabel: "How many days does Zhangjiajie take?",
    relatedLinkDescription:
      "The base timing behind a Zhangjiajie trip, before you add margin for a slower pace.",
    schemaAbout: [
      "Zhangjiajie",
      "Zhangjiajie National Forest Park",
      "Accessible travel",
      "Older travellers",
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
    breadcrumbCurrent: "带长辈游张家界",
    eyebrow: "规划指南 · 张家界",
    title: "带长辈游张家界:山替你爬,话得有人替你问",
    directAnswer:
      "能完成短距离步行、少量台阶、排队和上下交通工具的长者可以考虑张家界,但它并不是全程无障碍。国家森林公园内,环保车、索道和百龙天梯能串联主要观景点;剩余步行、台阶、站立时间和天气暴露,取决于具体路线与当天运营。按长者真实行动能力安排每一天,少排几个观景点,并保留返程缓冲。",
    scopeNote: "本页只解决一个决定:带长辈的张家界行程该怎么排。",
    updatedLabel: "最近更新",
    updatedDate: "2026-09-20",
    heroAlt: "蓝天下,百龙天梯沿张家界砂岩崖壁升起。",
    heroCaption: "百龙天梯能省掉一段大爬升,但不会消除所有步行和台阶。",
    sectionOne: {
      id: "the-mountain-carries-you",
      title: "交通工具能省掉几段最大的爬升",
      paragraphs: [
        "你到的是一道大门,不是登山口。",
        "在国家森林公园内,经过筛选的路线可以用环保车、百龙天梯和索道省掉几段最大的爬升。但换乘、排队、观景台环线、不平路面和台阶不会全部消失;实际体力负担取决于当天使用的入口、观景点和交通运行情况。",
        "在天子山索道的上客口,轿厢是不停的——它绕着弯缓缓过来,门开着。有人站在那儿,伸手扶住门框,把速度压住,等你坐稳了才松手。",
        "排得对的一天是这样的:上午的车、上午的电梯,人群还没上来的时候先到最远那个观景台;走两三百米平路,坐下,看一眼确实值得这趟飞行的东西;下午往回收,天黑前从容出园。两三个观景台,就是充实的一天。第四个开始,就像在赶工了。",
        "路线选得合适,一天可以比较从容。难的是让路线、时间和当天运行情况真正符合长者的行动能力。",
      ],
    },
    bridgeAlt: "张家界一座天然石桥横跨林谷,栏杆上系满红色祈福带。",
    bridgeCaption: "部分主要观景点下车后步行较短,但每一段仍要按实际路线核对。",
    sectionTwo: {
      id: "beside-every-machine",
      title: "但每台机器旁边,都站着一个人",
      leads: [
        "有三件事会毁掉长辈的一天。它们的共同点不是“难”,是你查不到。",
      ],
      paragraphs: [
        "天门山的索道上段,自 2025 年 11 月 6 日起停运,正在拆除重建。下段还在跑,登顶改成索道下段、换车走盘山路、再坐扶梯。市面上大多数英文行程仍在写“坐索道直上山顶”——包括几个月前刚更新过的那些。拿着那种行程来的人,到山脚才知道。而在那之前,那份东西看起来完全合理。",
        "大峡谷玻璃桥不允许轮椅、助行架或类似器具。网上说法不一,而这不是你想在检票口才知道的事。",
        "公园里的摆渡车没有公开的末班时间。车次随当天客流走。你得当天问,问站在车边的那个人。你读到的每一份行程都默认存在一张时刻表——它不存在。",
      ],
    },
    shuttleAlt: "张家界景区环保车内向前望,护栏外是一条盘山公路。",
    shuttleCaption: "没有公开的末班车。你问站在车边的那个人。",
    sectionThree: {
      id: "whether-the-day-holds",
      title: "这一天成不成立,取决于你有没有人可问",
      paragraphs: [
        "对走得快的人,上面这些都不算事。行程错了就临时改,车没了就走下来,一天里挤掉半小时无所谓。",
        "对走得慢的人,每一件都足以毁掉一天。而且它们都不是靠多查资料能解决的——那些信息不在网上,它在山上那些人手里,而且每周都在变。",
        "这就是为什么别人发给你的那份行程看起来很合理,到了现场却对不上。它是按能走的人、按机器都正常、按信息不会变排的。",
        "我们会做的事很朴素:出发前把当天的状况重新核一遍,把最远的观景台放在人最少的时候,把最累的半天从长辈身上挪开;以及,当天山上有人能替你问那句话。",
      ],
    },
    pillarsAlt: "张家界国家森林公园层叠的砂岩石柱与深绿山谷。",
    pillarsCaption: "",
    reviewTitle: "撰写与核实",
    reviewBody:
      "Homeground 出身张家界本地,有自己的地接团队。本页路线情况于 2026 年 7 月 23 日与地接确认。这里的票务、交通与准入规则变动往往没有预告,我们至少每 90 天复核一次,并为改动标注日期。照片均为我们自摄。",
    faqTitle: "常见问题",
    faq: [
      {
        question: "七十多岁的人来会不会太吃力?",
        answer:
          "要看长者的行动能力、平衡、体力和健康状况;医学上的适合程度应由本人和医生判断。经过筛选的路线可用环保车、索道和电梯省掉主要爬升,但仍有步行、台阶、排队、上下交通工具和天气暴露。少排观景点,并保留返程缓冲。",
      },
      {
        question: "张家界和天门山能同一天去吗?",
        answer:
          "不建议。两个地方、两张票、两套上山方式,中间要转场;而且天门山的登顶方式 2025 年 11 月还变过。按两天排。",
      },
      {
        question: "玻璃桥无障碍吗?",
        answer: "不。不允许轮椅、助行架或类似器具。",
      },
      {
        question: "到底需要几天?",
        answer:
          "带长辈的版本要在常规天数上再留余量——留给雾天、留给排队、留给走得慢的那个人。基础的时间账,可以看我们那篇“张家界到底需要几天”。",
      },
    ],
    ctaEyebrow: "一起理一理",
    ctaTitle: "把你手上那份行程发给我们。",
    ctaBody:
      "告诉我们谁去、大概哪几天、谁走得最慢。我们会告诉你哪几段在现在的状况下走不通、该舍掉什么、哪一天该留空。",
    ctaBoundary: "在谈到付款之前。",
    ctaAction: "开始一次行程沟通",
    relatedTitle: "继续规划",
    relatedLinkLabel: "张家界到底需要几天?",
    relatedLinkDescription: "在为慢节奏留出余量之前,先看一趟张家界的基础时间账。",
    schemaAbout: ["张家界", "张家界国家森林公园", "无障碍旅行", "年长旅客"],
  },
  ko: {
    htmlLang: "ko",
    homePath: "/ko/",
    guidesPath: "/ko/guides/",
    skipLink: "본문으로 건너뛰기",
    breadcrumbLabel: "탐색 경로",
    breadcrumbHome: "홈",
    breadcrumbGuides: "가이드",
    breadcrumbCurrent: "부모님과 함께 가는 장자제",
    eyebrow: "플래닝 가이드 · 장자제",
    title: "부모님과 함께 가는 장자제: 산은 태워 주지만, 물어볼 사람은 있어야 합니다",
    directAnswer:
      "장자제는 짧은 도보, 일부 계단, 줄 서기와 교통수단 승하차가 가능한 고령 여행자에게 맞을 수 있지만 전 구간 무장애 여행지는 아닙니다. 국가삼림공원에서는 셔틀버스·케이블카·바이룽 엘리베이터가 주요 전망대를 잇지만, 남는 보행·계단·서 있는 시간·날씨 노출은 실제 동선과 당일 운영에 따라 달라집니다. 여행자의 실제 이동 능력을 기준으로 전망대를 줄이고 귀환 여유를 남기세요.",
    scopeNote:
      "이 페이지는 한 가지 결정을 다룹니다: 연세 있는 분과 함께하는 장자제 일정을 어떻게 짤 것인가.",
    updatedLabel: "최종 업데이트",
    updatedDate: "2026-09-20",
    heroAlt: "파란 하늘 아래 장자제 사암 절벽을 따라 솟아오른 바이룽 엘리베이터.",
    heroCaption: "바이룽 엘리베이터는 큰 오르막 하나를 줄여 주지만 모든 도보와 계단을 없애 주지는 않습니다.",
    sectionOne: {
      id: "the-mountain-carries-you",
      title: "교통수단이 큰 오르막 일부를 줄여 줍니다",
      paragraphs: [
        "당신이 도착하는 곳은 등산로 입구가 아니라 정문입니다.",
        "국가삼림공원에서는 신중하게 고른 동선의 큰 오르막 일부를 셔틀버스·바이룽 엘리베이터·케이블카로 줄일 수 있습니다. 하지만 환승, 대기 줄, 전망대 순환로, 고르지 않은 노면과 계단이 모두 사라지는 것은 아닙니다. 실제 부담은 당일 이용하는 입구·전망대·교통 운행에 따라 달라집니다.",
        "톈쯔산 케이블카 승강장에서 캐빈은 멈추지 않습니다. 문을 연 채 천천히 돌아 들어오고, 누군가 문틀에 손을 얹고 속도를 눌러 당신이 앉을 때까지 붙잡아 줍니다.",
        "잘 짜인 하루는 이렇습니다. 아침 버스, 아침 엘리베이터, 사람이 몰리기 전에 가장 먼 전망대에 닿기. 몇백 미터 평지 길, 앉을 자리, 이 비행을 정당화해 주는 풍경 하나. 그리고 되돌아 나와 어두워지기 전에 공원을 벗어나기. 이 속도라면 전망대 두세 곳이 충분히 알찬 하루입니다. 네 번째부터는 일처럼 느껴집니다.",
        "동선을 잘 고르면 하루를 비교적 여유롭게 보낼 수 있습니다. 어려운 점은 동선·시간·당일 운행 조건을 여행자의 실제 이동 능력에 맞추는 것입니다.",
      ],
    },
    bridgeAlt: "붉은 기원 리본이 난간을 따라 묶인, 숲 협곡을 가로지르는 장자제의 천연 돌다리.",
    bridgeCaption: "일부 주요 전망대는 교통수단에서 내려 짧게 걸어 갈 수 있지만 구간별 확인은 여전히 필요합니다.",
    sectionTwo: {
      id: "beside-every-machine",
      title: "그러나 모든 기계 옆에는 사람이 있습니다",
      leads: [
        "연세 있는 분의 하루를 무너뜨리는 것은 세 가지입니다. 공통점은 어렵다는 게 아니라, 미리 찾아볼 수 없다는 것입니다.",
      ],
      paragraphs: [
        "톈먼산 케이블카 상부 구간은 2025년 11월 6일부터 운행이 중단되어 철거·재건 중입니다. 하부 구간은 여전히 운행하며, 정상까지는 하부 케이블카, 굽잇길 차량 이동, 그다음 에스컬레이터를 거칩니다. 대부분의 영문 일정은 아직도 케이블카로 정상까지 곧장 오른다고 적어 두었습니다 — 불과 몇 달 전에 갱신된 것들까지도요. 그런 일정을 들고 온 사람은 산 아래에서야 사실을 알게 됩니다. 그 전까지 손에 든 일정은 완전히 그럴듯해 보입니다.",
        "장자제 대협곡 유리다리는 휠체어, 보행 보조기 등 이동 보조기구의 진입을 허용하지 않습니다. 영문 페이지들은 이 점에서 서로 어긋나며, 이는 입구에서 알게 되고 싶은 일이 아닙니다.",
        "공원 안 셔틀버스에는 공개된 막차 시간이 없습니다. 운행은 그날의 인파에 따라 움직입니다. 당일에 직원이나 가이드에게 — 버스 옆에 서 있는 사람에게 물어야 합니다. 당신이 읽는 모든 일정은 시간표가 있다고 전제합니다. 시간표는 없습니다.",
      ],
    },
    shuttleAlt: "장자제 공원 셔틀버스 안에서 앞을 바라본 모습, 가드레일 너머로 굽이진 산길.",
    shuttleCaption: "공개된 막차는 없습니다. 버스 옆에 서 있는 사람에게 물어보세요.",
    sectionThree: {
      id: "whether-the-day-holds",
      title: "하루가 지켜지느냐는, 물어볼 사람이 있느냐에 달려 있습니다",
      paragraphs: [
        "걸음이 빠른 사람에게는 이 가운데 어느 것도 문제가 되지 않습니다. 틀린 일정은 그 자리에서 고치고, 놓친 버스는 걸어 내려가면 되고, 하루에 30분 잃는 것쯤은 아무것도 아닙니다.",
        "걸음이 느린 분에게는 이 중 하나만으로도 하루가 끝날 수 있습니다. 그리고 그중 어느 것도 더 찾아본다고 해결되지 않습니다 — 그 정보는 온라인에 없습니다. 산에 있는 사람들이 쥐고 있고, 매주 바뀝니다.",
        "누군가 보내 준 일정이 그럴듯해 보이는데 현장과 맞지 않는 이유가 이것입니다. 그 일정은 걸을 수 있는 사람을 기준으로, 모든 기계가 돌아가고 아무것도 변하지 않는다는 가정 위에 짜였습니다.",
        "우리가 하는 일은 단순합니다. 출발 전에 그날의 상황을 다시 확인하고, 가장 먼 전망대를 가장 한산한 시간에 두고, 가장 힘든 반나절을 연세 있는 분에게서 덜어 냅니다. 그리고 당일, 산에는 당신을 대신해 물어봐 줄 사람이 있습니다.",
      ],
    },
    pillarsAlt: "장자제 국가삼림공원의 겹겹이 늘어선 사암 봉우리와 짙은 초록 협곡.",
    pillarsCaption: "",
    reviewTitle: "작성과 확인",
    reviewBody:
      "Homeground는 장자제 현지 출신으로, 자체 현지 팀을 두고 있습니다. 이 페이지의 경로 상황은 2026년 7월 23일 현지 파트너와 확인했습니다. 이곳의 매표·교통·입장 규칙은 예고 없이 바뀌는 일이 많아, 최소 90일마다 이 페이지를 다시 확인하고 변경 사항에 날짜를 표기합니다. 사진은 모두 저희가 직접 찍은 것입니다.",
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        question: "70대 어르신께 너무 무리일까요?",
        answer:
          "여행자의 이동 능력, 균형, 체력과 건강 상태에 따라 다르며 의학적 적합성은 본인과 의사가 판단해야 합니다. 신중하게 고른 동선에서는 셔틀버스·케이블카·엘리베이터로 큰 오르막을 줄일 수 있지만 도보, 계단, 대기, 승하차와 날씨 노출은 남습니다. 전망대를 줄이고 귀환 여유를 두세요.",
      },
      {
        question: "장자제와 톈먼산을 하루에 볼 수 있나요?",
        answer:
          "권하지 않습니다. 서로 다른 장소에 표도 오르는 길도 따로이고 이동도 있습니다 — 게다가 톈먼산 등정 방식은 2025년 11월에 바뀌었습니다. 이틀로 잡으세요.",
      },
      {
        question: "유리다리는 무장애인가요?",
        answer: "아닙니다. 휠체어, 보행 보조기 등 보조기구는 허용되지 않습니다.",
      },
      {
        question: "며칠이 필요한가요?",
        answer:
          "느린 속도라면 통상 일수에 여유를 더하세요 — 안개, 대기 줄, 가장 느리게 걷는 분을 위해서요. 기본 일정 계산은 “장자제는 며칠이 필요한가” 가이드에서 다룹니다.",
      },
    ],
    ctaEyebrow: "함께 정리해요",
    ctaTitle: "지금 들고 계신 일정을 보내 주세요.",
    ctaBody:
      "누가 가는지, 대략 언제인지, 누가 가장 느리게 걷는지 알려 주세요. 지금 상황에서 어느 구간이 안 되는지, 무엇을 빼야 하는지, 어느 날을 비워 둬야 하는지 알려 드리겠습니다.",
    ctaBoundary: "결제 이야기가 나오기 전에요.",
    ctaAction: "여행 상담 시작하기",
    relatedTitle: "계속 준비하기",
    relatedLinkLabel: "장자제는 며칠이 필요한가요?",
    relatedLinkDescription:
      "느린 속도를 위한 여유를 더하기 전, 장자제 여행의 기본 일정 계산.",
    schemaAbout: ["장자제", "장자제 국가삼림공원", "무장애 여행", "연장자 여행"],
  },
};

export function getZhangjiajieOlderTravellersCopy(
  locale: HomegroundLocale,
): ZhangjiajieOlderTravellersCopy {
  return copies[locale];
}
