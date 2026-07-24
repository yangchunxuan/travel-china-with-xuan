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
      "Most of Zhangjiajie is ridden, not walked. Shuttle buses, cableways and a lift bored up the side of a cliff carry a slower traveller to the places worth seeing. What decides whether the day goes well is usually not the itinerary in your hand — it is the people on the mountain, and whether you can ask the right question at the right moment. Because the things that matter most here are not written on any sign.",
    scopeNote:
      "This page is about one decision: how to plan a Zhangjiajie trip with an older traveller.",
    updatedLabel: "Updated",
    updatedDate: "2026-07-24",
    heroAlt:
      "The Bailong Elevator rising against a sandstone cliff under a blue sky in Zhangjiajie.",
    heroCaption: "The Bailong Elevator does the climbing so you don't have to.",
    sectionOne: {
      id: "the-mountain-carries-you",
      title: "The mountain does most of the climbing",
      paragraphs: [
        "You arrive at a gate, not a trailhead.",
        "Inside the National Forest Park, almost nothing is reached the way the photographs suggest. A shuttle bus carries you from the gate into the valley. The Bailong Elevator lifts you up more than three hundred metres of cliff in a glass box. Cableways cross the gorges at Tianzi Mountain and Huangshi Village. The walking that remains between them is mostly level, and mostly short.",
        "At the Tianzi Mountain cableway, the cabins never stop. They come round slowly with the doors open, and someone stands there, a hand on the frame, holding the pace down until you are seated before letting go.",
        "A day that is planned well looks like this: the morning bus, the morning lift, reaching the furthest viewpoint before the crowds arrive; a few hundred metres of level path, a place to sit, one view that genuinely justifies the flight; then working back and leaving the park before dark. Two or three viewpoints is a full, satisfying day at this pace. The fourth is where it starts to feel like work.",
        "The day is not hard. The hard part is knowing what time to be where.",
      ],
    },
    bridgeAlt:
      "A natural stone arch spanning a forested gorge in Zhangjiajie, red prayer ribbons tied along its rail.",
    bridgeCaption:
      "Most viewpoints are a short, level walk from where the bus or the lift leaves you.",
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
      "Homeground is from Zhangjiajie, with our own ground team. Route conditions on this page were confirmed with our operator on 23 July 2026. Ticketing, transport and access rules here change without much notice; we re-check this page at least every 90 days and date any change. The photographs are our own.",
    faqTitle: "Common questions",
    faq: [
      {
        question: "Is it too strenuous for someone in their seventies?",
        answer:
          "That depends on the person, not the mountain, and it is a question for them and their doctor. What we can say is that most of the National Forest Park is reached by bus, cable car and lift, and the walking between them is mostly short and mostly level. The tiring part is an over-packed itinerary, not the mountain itself.",
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
    relatedTitle: "Related guide",
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
      "张家界大部分地方是坐上去的,不是走上去的。摆渡车、索道,和一部凿在崖壁里的电梯,能把走得慢的人也送到该看的地方。真正决定这一天好不好的,往往不是你手上那份行程表,而是山上那些人——以及你能不能在对的时候,问对一句话。因为这里最要紧的几件事,没有一件写在告示牌上。",
    scopeNote: "本页只解决一个决定:带长辈的张家界行程该怎么排。",
    updatedLabel: "最近更新",
    updatedDate: "2026-07-24",
    heroAlt: "蓝天下,百龙天梯沿张家界砂岩崖壁升起。",
    heroCaption: "百龙天梯替你把崖壁爬了,你不用自己爬。",
    sectionOne: {
      id: "the-mountain-carries-you",
      title: "山替你爬了大半",
      paragraphs: [
        "你到的是一道大门,不是登山口。",
        "进了国家森林公园,几乎没有一处是照片里那种走法。摆渡车把你从大门送进谷里。百龙天梯用一个玻璃箱子把你抬上三百多米崖壁。天子山和黄石寨的索道横跨峡谷。这中间剩下的路,大多是平的,也大多不长。",
        "在天子山索道的上客口,轿厢是不停的——它绕着弯缓缓过来,门开着。有人站在那儿,伸手扶住门框,把速度压住,等你坐稳了才松手。",
        "排得对的一天是这样的:上午的车、上午的电梯,人群还没上来的时候先到最远那个观景台;走两三百米平路,坐下,看一眼确实值得这趟飞行的东西;下午往回收,天黑前从容出园。两三个观景台,就是充实的一天。第四个开始,就像在赶工了。",
        "这一天不难。难的是你怎么知道该几点到哪儿。",
      ],
    },
    bridgeAlt: "张家界一座天然石桥横跨林谷,栏杆上系满红色祈福带。",
    bridgeCaption: "多数观景台,离摆渡车或电梯放你下来的地方,只有几百米平路。",
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
          "取决于人,不取决于山,而且是他和他医生该讨论的事。我们能说的是:森林公园绝大部分靠车、索道和电梯就能到,之间的步行大多不长、也大多是平路。真正吃力的是排得太满的行程,不是山本身。",
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
    relatedTitle: "相关指南",
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
      "장자제는 대부분 걷는 것이 아니라 타고 오릅니다. 셔틀버스와 케이블카, 그리고 절벽을 뚫고 세운 엘리베이터가 걸음이 느린 분도 볼 만한 곳까지 데려다줍니다. 하루가 잘 풀리느냐를 정하는 것은 대개 손에 든 일정표가 아니라, 산에 있는 사람들, 그리고 알맞은 순간에 알맞은 질문을 할 수 있느냐입니다. 여기서 가장 중요한 것들은 어느 안내판에도 적혀 있지 않기 때문입니다.",
    scopeNote:
      "이 페이지는 한 가지 결정을 다룹니다: 연세 있는 분과 함께하는 장자제 일정을 어떻게 짤 것인가.",
    updatedLabel: "최종 업데이트",
    updatedDate: "2026-07-24",
    heroAlt: "파란 하늘 아래 장자제 사암 절벽을 따라 솟아오른 바이룽 엘리베이터.",
    heroCaption: "바이룽 엘리베이터가 절벽을 대신 올라 줍니다.",
    sectionOne: {
      id: "the-mountain-carries-you",
      title: "산이 오르막의 대부분을 대신합니다",
      paragraphs: [
        "당신이 도착하는 곳은 등산로 입구가 아니라 정문입니다.",
        "국가삼림공원 안에서는 사진 속 그 방식으로 닿는 곳이 거의 없습니다. 셔틀버스가 정문에서 계곡 안까지 데려다주고, 바이룽 엘리베이터가 유리 상자에 태워 300여 미터 절벽을 올려 줍니다. 톈쯔산과 황스자이에서는 케이블카가 협곡을 건넙니다. 그 사이에 남는 걸음은 대체로 평지이고, 대체로 짧습니다.",
        "톈쯔산 케이블카 승강장에서 캐빈은 멈추지 않습니다. 문을 연 채 천천히 돌아 들어오고, 누군가 문틀에 손을 얹고 속도를 눌러 당신이 앉을 때까지 붙잡아 줍니다.",
        "잘 짜인 하루는 이렇습니다. 아침 버스, 아침 엘리베이터, 사람이 몰리기 전에 가장 먼 전망대에 닿기. 몇백 미터 평지 길, 앉을 자리, 이 비행을 정당화해 주는 풍경 하나. 그리고 되돌아 나와 어두워지기 전에 공원을 벗어나기. 이 속도라면 전망대 두세 곳이 충분히 알찬 하루입니다. 네 번째부터는 일처럼 느껴집니다.",
        "하루 자체는 어렵지 않습니다. 어려운 것은 몇 시에 어디에 있어야 하는지를 아는 일입니다.",
      ],
    },
    bridgeAlt: "붉은 기원 리본이 난간을 따라 묶인, 숲 협곡을 가로지르는 장자제의 천연 돌다리.",
    bridgeCaption: "대부분의 전망대는 버스나 엘리베이터가 내려 주는 곳에서 짧은 평지 거리입니다.",
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
          "그것은 산이 아니라 사람에 달렸고, 본인과 의사가 상의할 문제입니다. 저희가 말씀드릴 수 있는 것은, 국가삼림공원 대부분은 버스·케이블카·엘리베이터로 닿고 그 사이 걸음은 대체로 짧고 평탄하다는 점입니다. 힘든 것은 산이 아니라 너무 빡빡한 일정입니다.",
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
    relatedTitle: "관련 가이드",
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
