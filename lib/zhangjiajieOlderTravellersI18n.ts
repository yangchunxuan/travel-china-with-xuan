import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { bodyGuidePeakRate, bodyGuideRate } from "./guideBodyPrices.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { bodyZhangjiajieFourDayPrice, bodyZhangjiajieFourDayValidUntil } from "./guideBodyZhangjiajiePrice.ts";

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
      "Zhangjiajie can work for older travellers who can manage short walks, some steps, queues and getting on and off transport, but it is not step-free. In the National Forest Park, shuttle buses, cableways and the Bailong Elevator link the major viewpoints; the walking, stairs, standing time and weather exposure that remain depend on the exact route and that day's operations. Plan around the slowest walker: two or three viewpoints a day, the Forest Park and Tianmen Mountain on separate days, a spare day for weather, and no Chinese public holidays if anyone cannot stand for long.",
    scopeNote:
      "This page is about one decision: how to plan a Zhangjiajie trip with an older traveller.",
    updatedLabel: "Updated",
    updatedDate: "2026-10-20",
    heroAlt:
      "The Bailong Elevator rising against a sandstone cliff under a blue sky in Zhangjiajie.",
    heroCaption: "Bailong Elevator removes one major climb, but not every walk or stair.",
    sectionOne: {
      id: "the-mountain-carries-you",
      title: "Transport removes some of the biggest climbs",
      paragraphs: [
        "You arrive at a gate, not a trailhead.",
        "Inside the National Forest Park, shuttle buses, the Bailong Elevator and cableways can replace some of the biggest climbs on a carefully chosen route. They do not remove every transfer, queue, viewpoint loop, uneven path or stair, and the lift and cableways are ticketed separately from admission. What is left depends on the entrance, the viewpoints and the transport running that day, and the entrance is fixed in advance: under the Hunan government's notice of 23 June 2025 tickets must be reserved ahead, and the order names your first gate and entry time. Turning up at a different gate does not rewrite it.",
        "At the Tianzi Mountain cableway the cabins never stop. They come round slowly with the doors open, and a member of staff stands by with a hand on the frame, steadying it until you are seated. For anyone unsteady on their feet, that step into a moving cabin is the moment to plan for.",
        "A day that is planned well looks like this: the morning bus and the morning lift, then the furthest viewpoint, reached on most days before the crowds arrive; a few hundred metres of level path, a place to sit, one view that genuinely justifies the flight; then working back and leaving the park before dark. Two or three viewpoints is a full, satisfying day at this pace. The fourth is where it starts to feel like work.",
        "A well-chosen day can be comfortable. The hard part is matching the route, timing and conditions to the traveller's real mobility.",
      ],
    },
    bridgeAlt:
      "A natural stone arch spanning a forested gorge in Zhangjiajie, red prayer ribbons tied along its rail.",
    bridgeCaption:
      "Some major viewpoints are a short walk from transport, but each stretch still needs checking.",
    sectionTwo: {
      id: "beside-every-machine",
      title: "But beside every machine, there is a person",
      leads: [
        "Five things break a day for an older traveller. None is hard in itself; they hide in Chinese-language notices, or only show on the day.",
      ],
      paragraphs: [
        "The queue is the climb. On 2 May 2025, a May Day holiday peak, Wulingyuan district publicly apologised for long waits at the lifts, cableways and shuttle buses, and the last visitors were not shuttled out until 21:53 (Guangming Online, 4 May 2025); the next day one visitor walked into the park at about 6 a.m. without a queue, then later queued about two hours for the Bailong Elevator and about 1.5 hours for the Tianzi Mountain cableway down (36Kr, 6 May 2025). Going in early spared that visitor the gate queue, not the ones after it. For someone who cannot stand for long, a holiday date is a different trip.",
        "The upper half of the Tianmen Mountain city cableway has been closed for rebuilding since 6 November 2025, and from 13 October 2026 the lower half has stopped too, with no reopening date published. Reaching the summit now means route C only: from the mountain gate, a shorter fast cableway up to Tianmen Cave, escalators to the summit, and the same way back down. Older guides, map pins and hotel directions still point to the city cableway station in town; the scenic area's notice says a shuttle runs from there to the gate, but for an older traveller that is one more transfer before the mountain even begins. And on a holiday the cableway is where the hours go: on 5 October 2025 visitors at Tianmen queued more than an hour for the cableway and then met a breakdown (Ziniu News, 6 October 2025). Now one cableway carries everyone, up and down.",
        "At Tianmen, the escalators beside the 999-step approach to the cave are not included going up in the route C package: you climb the steps or pay for the ride. For anyone who should not take on 999 steps, that ride belongs in the plan before the day, not at the bottom of the stairs.",
        "The Zhangjiajie Grand Canyon glass bridge does not admit wheelchairs, walking frames or similar mobility aids. The English pages disagree with each other on this, and it is not something you want to discover at the entrance. The bridge ticket, route B, is also one way: about 3.5 km and 3.5 hours on the scenic area's route page, from the rim across the bridge and down to the canyon floor, finishing at a different exit. The chain of three lifts down is a paid extra. Whoever skips the bridge cannot simply wait at the far end.",
        "The shuttle buses inside the park have no published last departure. Services move with the day's crowds. You ask staff, or your guide, on the day: you ask the person standing beside the bus. The park has five gates on different sides. Finish far from your hotel or your car, and a last bus you could not look up decides your evening.",
      ],
    },
    shuttleAlt:
      "The view forward from inside a Zhangjiajie park shuttle bus, a mountain road curving ahead behind the guardrail.",
    shuttleCaption:
      "There is no published last bus. You ask the person standing beside it.",
    sectionThree: {
      id: "whether-the-day-holds",
      title: "Whether the day works depends on having someone to ask",
      paragraphs: [
        "For a fast walker, most of this is an inconvenience. A wrong plan is fixed on the spot, a missed bus becomes a walk down, half an hour lost in a day is nothing.",
        "For a slower traveller, any one of them can end a day. Reading more does not fix them: the rules sit in Chinese notices that can change at short notice, and the rest, which lift is backing up and when the last bus leaves, is known only on the mountain, that day.",
        "What we do is plain: we re-check the day's conditions before you set out, choose the gate that suits the route, put the furthest viewpoint early in the day, keep the queue-heavy lifts away from holiday crowds where we can, and plan a seat or a way round for the most tiring stretch where the route allows. On every guided day, our own guide stays beside the slowest walker and asks that question for you.",
        `Our Zhangjiajie 4-day private tour is built at this pace. Day 1 is only the airport or station pickup and the hotel, with no sightseeing. On Day 2 our own English-speaking guide and a private vehicle take you into the Forest Park for the Bailong Elevator, Yuanjiajie and Tianzi Mountain, in the order that day's operations allow. Day 3 is the Grand Canyon Glass Bridge, then Huanglong Cave or Baofeng Lake; if someone sits the bridge out, we plan before you book where they wait and where the car meets the group. Day 4 is Tianmen Mountain with your bags in the car, then the airport or station, and we check the Tianmen entry time against your flight or train before you book. Three nights in a city hotel, adult admission and standard scenic transport as named in your confirmation, no shopping stops. From ${bodyZhangjiajieFourDayPrice("two-to-four", "en")} per person for two to four adults, or ${bodyZhangjiajieFourDayPrice("six", "en")} each for six, for travel until ${bodyZhangjiajieFourDayValidUntil("en")}; the total and exactly what is included come in writing before you pay.`,
        `Day 4 has no guide in the base price. With an older traveller, it is the day we would add one: on route C everyone goes up and down on the same fast cableway, the cave is reached by 999 steps or a paid escalator, and a flight or train is waiting at the end of the day. A guide for Tianmen is ${bodyGuideRate("zhangjiajie", "en")} for a full day of up to 8 hours (${bodyGuidePeakRate("zhangjiajie", "en")} on peak dates). If you would rather not climb and fly on the same day, ask us to quote an extra night.`,
        `Planning it yourselves? Two things carry most of the weight for an older traveller. Our own drivers can take you from your hotel to the gate on your booking and collect you at the exit you finish at, with the price confirmed in writing before you pay; we can send a car in any city in mainland China. A guide alone in Zhangjiajie is ${bodyGuideRate("zhangjiajie", "en")} for a full day of up to 8 hours (${bodyGuidePeakRate("zhangjiajie", "en")} on peak dates), per guide, not per person; transport, tickets and meals are separate. And if Zhangjiajie is one stop on a longer China trip, we can plan the whole route around the same slowest walker.`,
      ],
    },
    pillarsAlt:
      "Sandstone pillars layered into a deep green valley in Zhangjiajie National Forest Park.",
    pillarsCaption: "",
    reviewTitle: "Written and checked",
    reviewBody:
      "Homeground is from Zhangjiajie and draws on our own planning team's first-hand local experience. Route conditions on this page were checked on the ground on 23 July 2026; the queue figures and the Tianmen route C change were added on 20 October 2026 from the sources named in the text. Ticketing, transport and access rules here change without much notice; we re-check this page at least every 90 days and date any change. The photographs are our own.",
    faqTitle: "Common questions",
    faq: [
      {
        question: "Is it too strenuous for someone in their seventies?",
        answer:
          "It depends on the traveller's mobility, balance, stamina and health, and medical suitability belongs with them and their doctor. Buses, cableways and lifts can remove major climbs on a chosen route, but walking, steps, queues, boarding and weather exposure remain. Plan fewer viewpoints and keep time in hand for the way back.",
      },
      {
        question: "Can we do Zhangjiajie and Tianmen Mountain in one day?",
        answer:
          "We would not. They are separate places with separate tickets and separate ways up, with a transfer between them, and from 13 October 2026 Tianmen runs route C only, from the mountain gate. Plan them as two days.",
      },
      {
        question: "Is the glass bridge accessible?",
        answer:
          "No. It does not admit wheelchairs, walking frames or similar aids, and the bridge route is one way, about 3.5 km and 3.5 hours, ending at a different exit.",
      },
      {
        question: "When should we avoid going?",
        answer:
          "Chinese public holidays, if anyone in the group cannot stand for long. On 3 May 2025, during the May Day holiday, one visitor queued about two hours for the Bailong Elevator and about 1.5 hours for the Tianzi Mountain cableway down (36Kr, 6 May 2025). At Tianmen Mountain the day before, the same visitor queued about 2.5 hours to get in. If your dates are fixed, plan the order of the day around the lifts and keep the evening free.",
      },
      {
        question: "Can a guide come with us and help?",
        answer:
          `Yes. Our own guides work in Zhangjiajie by the full day: ${bodyGuideRate("zhangjiajie", "en")} per guide for up to 8 hours (${bodyGuidePeakRate("zhangjiajie", "en")} on peak dates), guide only. They plan the order of the day with you, ask staff about the last bus and queues, and set a pace for the slowest walker. Chinese-speaking guides can be arranged too.`,
      },
      {
        question: "How many days do we need?",
        answer:
          "Add a spare day to the usual count. Weather closes the park, not just the view: heavy rain shut Zhangjiajie National Forest Park for three days from 20 June 2025 (Hunan government, 23 June 2025). With a slower walker, a spare day gives a lost one somewhere to go, and leaves room for queues and mist. Our guide to how many days Zhangjiajie takes works through the base timing.",
      },
      {
        question: "Do older travellers pay less for tickets?",
        answer:
          "Sometimes, but do not count on it with a foreign passport. On the glass-bridge route the Grand Canyon's own ticket shop showed RMB 88 for ages 60 to 65 and RMB 63 over 65, against RMB 175 for an adult (read 11 October 2026); the Forest Park's concessions need documented proof, and lifts and cableways are still paid. Whether a foreign passport qualifies is set by each product, so budget at the adult price and ask before booking.",
      },
    ],
    ctaEyebrow: "Talk it through",
    ctaTitle: "Send us the itinerary you are holding.",
    ctaBody:
      "Tell us who is travelling, roughly when, and who walks slowest, on WhatsApp or by email. Send it before you book flights: on the tour, the Tianmen entry time and your departure have to fit the same day, and we check them together. We reply within 12 hours and tell you which parts do not work in the current conditions, what to drop, which day to leave open, and whether the 4-day tour, a guide for the day or a car on its own fits you best. If you book with us, you pay a 30% deposit by card through a secure VBill link and the balance on arrival; we are a licensed travel agency (L-BJ10587), and one planner looks after you from the first reply to the last day.",
    ctaBoundary: "Nothing is booked or paid until you have the plan and the total in writing.",
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
    title: "带长辈游张家界：山替你爬，话得有人替你问",
    directAnswer:
      "能走一小段路、上几级台阶、排一会儿队、自己上下车的长辈，可以考虑张家界，但它不是全程无障碍。国家森林公园里，环保车、索道和百龙天梯能把主要观景点串起来；剩下要走多少路、爬多少台阶、站多久、淋不淋雨，取决于具体路线和当天运营。按走得最慢的那个人排：一天两三个观景台，森林公园和天门山分两天，留一天给天气；同行有人站不久，就避开中国的节假日。",
    scopeNote: "本页只解决一个决定：带长辈的张家界行程该怎么排。",
    updatedLabel: "最近更新",
    updatedDate: "2026-10-20",
    heroAlt: "蓝天下，百龙天梯沿张家界砂岩崖壁升起。",
    heroCaption: "百龙天梯能省掉一段大爬升，但不会消除所有步行和台阶。",
    sectionOne: {
      id: "the-mountain-carries-you",
      title: "交通工具能省掉几段最大的爬升",
      paragraphs: [
        "你到的是一道大门，不是登山口。",
        "在国家森林公园内，选对路线，环保车、百龙天梯和索道能省掉几段最大的爬升。但换乘、排队、观景台环线、不平的路和台阶不会全部消失，电梯和索道还要在门票之外另买。剩下多少，取决于从哪个门进、看哪些观景点、当天哪些交通在运行；而进哪个门是提前定死的：按湖南省政府 2025 年 6 月 23 日的通知，门票须提前预约，订单上写明首次检票的大门和时段，换个门去，订单不会跟着改。",
        "天子山索道的轿厢是不停的：它开着门缓缓转过来，工作人员站在一旁扶住门框，等你坐稳才松手。对脚下不稳的长辈，迈进一个还在动的轿厢，正是要提前想好的那一步。",
        "排得对的一天是这样的：上午的车、上午的电梯，多数日子里，趁人群还没上来先到最远那个观景台；走两三百米平路，坐下，看一眼值得专程飞来的风景；下午往回收，天黑前从容出园。两三个观景台，就是充实的一天。第四个开始，就像在赶工了。",
        "路线选得合适，一天可以很从容。难的是让路线、时间和当天的情况，跟长辈的实际脚力对得上。",
      ],
    },
    bridgeAlt: "张家界一座天然石桥横跨林谷，栏杆上系满红色祈福带。",
    bridgeCaption: "部分主要观景点下车后走不远，但每一段仍要按实际路线核对。",
    sectionTwo: {
      id: "beside-every-machine",
      title: "但每台机器旁边，都站着一个人",
      leads: [
        "有五件事会毁掉长辈的一天。单看哪件都不难，难在它们要么藏在中文公告里，要么当天才见分晓。",
      ],
      paragraphs: [
        "排队本身就是爬山。2025 年 5 月 2 日是五一高峰，武陵源区事后就当天电梯、索道和环保车排长队公开致歉，到 21:53 才把游客全部送完（光明网，2025 年 5 月 4 日）；第二天，一位游客早上 6 点左右进森林公园时没排队，之后等百龙天梯约 2 小时，坐天子山索道下山又排了约 1.5 小时（36氪，2025 年 5 月 6 日）。早进园让这位游客躲开了进门的队，没躲开后面的队。对站不久的人来说，节假日去就是另一回事了。",
        "天门山市区索道的上半段自 2025 年 11 月 6 日起停运改造，2026 年 10 月 13 日起下半段也停了，恢复时间没有公布。现在上山只有 C 线：从山门坐一条较短的快线索道到天门洞，换扶梯上山顶，再原路下山。不少旧攻略、地图定位和酒店给的路线，仍指向市区的索道站；景区公告说那里有接驳车通往山门，但对长辈来说，还没上山就多了一次换乘。节假日的时间都耗在索道上：2025 年 10 月 5 日，游客排了一个多小时索道，又碰上故障（紫牛新闻，2025 年 10 月 6 日）。如今上山下山都挤这一条索道。",
        "天门山 999 级台阶旁的登天门扶梯，C 线套票不含上行：要么爬台阶，要么另付扶梯钱。对爬不动 999 级台阶的长辈，这段扶梯钱是当天必花的，要提前算进计划，别到台阶底下才知道。",
        "大峡谷玻璃桥不允许轮椅、助行架或类似器具。网上说法不一，而这不是你想在检票口才知道的事。过桥的票（B 线）还是单程：按景区线路页，从崖顶过桥、下到谷底，全程约 3.5 公里、3.5 小时，出口不在入口；下谷底的三段电梯要另付钱。不过桥的人，没法在桥那头等着。",
        "公园里的环保车没有公开的末班时间。车次随当天客流走。你得当天问，问站在车边的那个人。公园五个大门分在不同方向。收尾的地方离酒店或接你的车太远，这一晚就由那班查不到的末班车说了算。",
      ],
    },
    shuttleAlt: "张家界景区环保车内向前望，护栏外是一条盘山公路。",
    shuttleCaption: "没有公开的末班车。你问站在车边的那个人。",
    sectionThree: {
      id: "whether-the-day-holds",
      title: "这一天顺不顺，看身边有没有人可问",
      paragraphs: [
        "对走得快的人，这些多半只是添点麻烦。行程错了就临时改，车没了就走下来，一天里挤掉半小时无所谓。",
        "对走得慢的人，每一件都足以毁掉一天。多查资料也解决不了：规则写在随时会改的中文公告里，剩下的，比如哪部电梯在排长队、末班车几点走，只有当天山上的人知道。",
        "我们会做的事很朴素：出发前把当天的状况重新核一遍，按路线选对入园的大门，把最远的观景台放在一天里早的时候，能避开节假日人潮的电梯和索道就避开；路线允许的话，给最累的那一段提前找好歇脚的地方或绕行的办法。有导游的每一天，我们自己的导游都跟在走得最慢的那个人身边，替你去问那句话。",
        `我们的「张家界 4 天私家团」就是按这个节奏排的。第 1 天只有机场或车站接站和入住，不排景点。第 2 天，我们自己的英文导游和专车带你进森林公园：乘百龙天梯、走袁家界、看天子山，顺序按当天景区运营安排。第 3 天去大峡谷玻璃桥，再游黄龙洞或宝峰湖其中一处；有人不过桥，我们预订前就定好他在哪儿等、车在哪儿接全组。第 4 天行李放在车上游天门山，之后送机或送站；预订前，我们先把天门山入场时段和你的航班或火车对一遍。三晚市区酒店，含确认单上列明的成人门票和标准景交，不进购物店。2 至 4 位成人每人 ${bodyZhangjiajieFourDayPrice("two-to-four", "zh")} 起，6 位成人每人 ${bodyZhangjiajieFourDayPrice("six", "zh")}，适用于 ${bodyZhangjiajieFourDayValidUntil("zh")}前出行；付款前，总价和全部包含项目都会书面写清楚。`,
        `第 4 天基础价不含导游。带长辈的话，这正是我们建议加导游的一天：C 线所有人上下山都挤同一条快线索道，进天门洞要爬 999 级台阶或自费坐扶梯，一天结束还要赶飞机或火车。天门山这天加一位导游，每天${bodyGuideRate("zhangjiajie", "zh")}，按整天算、最多 8 小时（高峰日${bodyGuidePeakRate("zhangjiajie", "zh")}）。中文客人也可以安排中文导游。不想同一天上山又赶车，可以让我们报一个多住一晚的价格。`,
        `想自己安排？对长辈来说，最吃重的是两样。我们自己的司机可以从酒店送你到订单上的那个大门，再到你出园的那个口接你，价格在付款前书面确认；中国大陆任何城市都能派车。在张家界只请导游，每位导游每天${bodyGuideRate("zhangjiajie", "zh")}，按整天算、最多 8 小时（高峰日${bodyGuidePeakRate("zhangjiajie", "zh")}），按导游算、不按人头，交通、门票和餐费另算。如果张家界只是整趟中国行的一站，我们也可以围着同一位走得最慢的人，把全程一起排好。`,
      ],
    },
    pillarsAlt: "张家界国家森林公园层叠的砂岩石柱与深绿山谷。",
    pillarsCaption: "",
    reviewTitle: "撰写与核实",
    reviewBody:
      "Homeground 的根在张家界，导游和司机都是我们自己的。本页路线情况于 2026 年 7 月 23 日实地核实；排队数据和天门山 C 线的变化于 2026 年 10 月 20 日按文中注明的来源补充。这里的票务、交通与准入规则变动往往没有预告，我们至少每 90 天复核一次，并为改动标注日期。照片均为我们自摄。",
    faqTitle: "常见问题",
    faq: [
      {
        question: "七十多岁的人来会不会太吃力？",
        answer:
          "要看长者的行动能力、平衡、体力和健康状况；医学上适不适合，应由本人和医生判断。选对路线，环保车、索道和电梯能省掉主要爬升，但仍有步行、台阶、排队、上下车和日晒雨淋。少排观景点，给回程留时间。",
      },
      {
        question: "张家界和天门山能同一天去吗？",
        answer:
          "不建议。两个地方、两张票、两套上山方式，中间要转场；而且 2026 年 10 月 13 日起天门山只开 C 线，要从山门上山。按两天排。",
      },
      {
        question: "玻璃桥无障碍吗？",
        answer: "不。不允许轮椅、助行架或类似器具；过桥的路线还是单程，约 3.5 公里、3.5 小时，出口不在入口。",
      },
      {
        question: "什么时候最好别去？",
        answer:
          "同行有站不久的人，就避开中国的节假日。2025 年 5 月 3 日五一假期，一位游客等百龙天梯约 2 小时，坐天子山索道下山又排了约 1.5 小时（36氪，2025 年 5 月 6 日）。前一天在天门山，这位游客排了约 2.5 小时才进景区。日期定了改不了，就围着电梯和索道排好一天的顺序，晚上别再安排活动。",
      },
      {
        question: "能请导游陪着、帮着照应吗？",
        answer:
          `可以。我们自己的导游在张家界按整天服务：每位导游每天${bodyGuideRate("zhangjiajie", "zh")}，最多 8 小时（高峰日${bodyGuidePeakRate("zhangjiajie", "zh")}），只含导游。导游会和你一起排一天的顺序，替你向工作人员问末班车和排队情况，按走得最慢的人定节奏。也可以安排中文导游。`,
      },
      {
        question: "到底需要几天？",
        answer:
          "在常规天数上多留一天。天气关的是公园，不只是风景：2025 年 6 月 20 日起，一场暴雨让张家界国家森林公园关了三天（湖南省政府，2025 年 6 月 23 日）。带着走得慢的人，多一天，泡汤的那天才有地方补，排队和大雾也有了余地。基础的时间账，可以看我们那篇「张家界到底需要几天」。",
      },
      {
        question: "老人买门票有优惠吗？",
        answer:
          "有时有，但持外国护照别先指望。玻璃桥这条线，大峡谷官方票务页显示 60 至 65 岁 88 元、65 岁以上 63 元，成人 175 元（2026 年 10 月 11 日读取）；森林公园的优惠要凭有效证件，电梯和索道照样收费。外国护照算不算，由每个产品自己定，预算先按成人价，订之前问清楚。",
      },
    ],
    ctaEyebrow: "一起理一理",
    ctaTitle: "把你手上那份行程发给我们。",
    ctaBody:
      "通过 WhatsApp 或邮件告诉我们谁去、大概哪几天、谁走得最慢。订机票之前就发给我们：4 天团里，天门山入场时段和你的航班或火车要排在同一天，我们会一起对好。我们 12 小时内回复，告诉你哪几段在现在的状况下走不通、该舍掉什么、哪一天该留空，以及 4 天团、按天请导游、单独包车，哪种最合适。如果交给我们安排，先付 30% 定金，用 VBill 刷卡链接支付，尾款到了当地再付；我们是持证旅行社（许可证 L-BJ10587），从第一次回复到旅程最后一天都是同一位规划师跟进。",
    ctaBoundary: "拿到书面方案和总价之前，不预订、不付款。",
    ctaAction: "把行程发给我们",
    relatedTitle: "继续规划",
    relatedLinkLabel: "张家界到底需要几天？",
    relatedLinkDescription: "在为慢节奏留出余量之前，先看一趟张家界的基础时间账。",
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
    breadcrumbCurrent: "부모님과 함께 가는 장가계",
    eyebrow: "플래닝 가이드 · 장가계",
    title: "부모님과 함께 가는 장가계: 산은 태워 주지만, 물어볼 사람은 있어야 합니다",
    directAnswer:
      "장가계는 짧은 도보, 일부 계단, 줄 서기와 교통수단 승하차가 가능한 고령 여행자에게 맞을 수 있지만 전 구간 무장애 여행지는 아닙니다. 국가삼림공원에서는 셔틀버스·케이블카·백룡엘리베이터가 주요 전망대를 잇지만, 남는 보행·계단·서 있는 시간·날씨 노출은 실제 동선과 당일 운영에 따라 달라집니다. 여행자의 실제 이동 능력을 기준으로 전망대를 줄이고 귀환 여유를 남기세요.",
    scopeNote:
      "이 페이지는 한 가지 결정을 다룹니다: 연세 있는 분과 함께하는 장가계 일정을 어떻게 짤 것인가.",
    updatedLabel: "최종 업데이트",
    updatedDate: "2026-09-20",
    heroAlt: "파란 하늘 아래 장가계 사암 절벽을 따라 솟아오른 백룡엘리베이터.",
    heroCaption: "백룡엘리베이터는 큰 오르막 하나를 줄여 주지만 모든 도보와 계단을 없애 주지는 않습니다.",
    sectionOne: {
      id: "the-mountain-carries-you",
      title: "교통수단이 큰 오르막 일부를 줄여 줍니다",
      paragraphs: [
        "당신이 도착하는 곳은 등산로 입구가 아니라 정문입니다.",
        "국가삼림공원에서는 신중하게 고른 동선의 큰 오르막 일부를 셔틀버스·백룡엘리베이터·케이블카로 줄일 수 있습니다. 하지만 환승, 대기 줄, 전망대 순환로, 고르지 않은 노면과 계단이 모두 사라지는 것은 아닙니다. 실제 부담은 당일 이용하는 입구·전망대·교통 운행에 따라 달라집니다.",
        "천자산 케이블카 승강장에서 캐빈은 멈추지 않습니다. 문을 연 채 천천히 돌아 들어오고, 누군가 문틀에 손을 얹고 속도를 눌러 당신이 앉을 때까지 붙잡아 줍니다.",
        "잘 짜인 하루는 이렇습니다. 아침 버스, 아침 엘리베이터, 사람이 몰리기 전에 가장 먼 전망대에 닿기. 몇백 미터 평지 길, 앉을 자리, 이 비행을 정당화해 주는 풍경 하나. 그리고 되돌아 나와 어두워지기 전에 공원을 벗어나기. 이 속도라면 전망대 두세 곳이 충분히 알찬 하루입니다. 네 번째부터는 일처럼 느껴집니다.",
        "동선을 잘 고르면 하루를 비교적 여유롭게 보낼 수 있습니다. 어려운 점은 동선·시간·당일 운행 조건을 여행자의 실제 이동 능력에 맞추는 것입니다.",
      ],
    },
    bridgeAlt: "붉은 기원 리본이 난간을 따라 묶인, 숲 협곡을 가로지르는 장가계의 천연 돌다리.",
    bridgeCaption: "일부 주요 전망대는 교통수단에서 내려 짧게 걸어 갈 수 있지만 구간별 확인은 여전히 필요합니다.",
    sectionTwo: {
      id: "beside-every-machine",
      title: "그러나 모든 기계 옆에는 사람이 있습니다",
      leads: [
        "연세 있는 분의 하루를 무너뜨리는 것은 세 가지입니다. 공통점은 어렵다는 게 아니라, 미리 찾아볼 수 없다는 것입니다.",
      ],
      paragraphs: [
        "천문산 케이블카 상부 구간은 2025년 11월 6일부터 운행이 중단되어 철거·재건 중입니다. 하부 구간도 2026년 10월 13일부터 운행을 멈춥니다. 이제 정상까지는 산문에서 천문동까지 가는 별도의 짧은 케이블카, 그다음 에스컬레이터를 거칩니다. 대부분의 영문 일정은 아직도 케이블카로 정상까지 곧장 오른다고 적어 두었습니다 — 불과 몇 달 전에 갱신된 것들까지도요. 그런 일정을 들고 온 사람은 산 아래에서야 사실을 알게 됩니다. 그 전까지 손에 든 일정은 완전히 그럴듯해 보입니다.",
        "장가계 대협곡 유리다리는 휠체어, 보행 보조기 등 이동 보조기구의 진입을 허용하지 않습니다. 영문 페이지들은 이 점에서 서로 어긋나며, 이는 입구에서 알게 되고 싶은 일이 아닙니다.",
        "공원 안 셔틀버스에는 공개된 막차 시간이 없습니다. 운행은 그날의 인파에 따라 움직입니다. 당일에 직원이나 가이드에게 — 버스 옆에 서 있는 사람에게 물어야 합니다. 당신이 읽는 모든 일정은 시간표가 있다고 전제합니다. 시간표는 없습니다.",
      ],
    },
    shuttleAlt: "장가계 공원 셔틀버스 안에서 앞을 바라본 모습, 가드레일 너머로 굽이진 산길.",
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
    pillarsAlt: "장가계 국가삼림공원의 겹겹이 늘어선 사암 봉우리와 짙은 초록 협곡.",
    pillarsCaption: "",
    reviewTitle: "작성과 확인",
    reviewBody:
      "Homeground는 장가계 현지 출신으로, 자체 현지 팀을 두고 있습니다. 이 페이지의 경로 상황은 2026년 7월 23일 현지 파트너와 확인했습니다. 이곳의 매표·교통·입장 규칙은 예고 없이 바뀌는 일이 많아, 최소 90일마다 이 페이지를 다시 확인하고 변경 사항에 날짜를 표기합니다. 사진은 모두 저희가 직접 찍은 것입니다.",
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        question: "70대 어르신께 너무 무리일까요?",
        answer:
          "여행자의 이동 능력, 균형, 체력과 건강 상태에 따라 다르며 의학적 적합성은 본인과 의사가 판단해야 합니다. 신중하게 고른 동선에서는 셔틀버스·케이블카·엘리베이터로 큰 오르막을 줄일 수 있지만 도보, 계단, 대기, 승하차와 날씨 노출은 남습니다. 전망대를 줄이고 귀환 여유를 두세요.",
      },
      {
        question: "장가계와 천문산을 하루에 볼 수 있나요?",
        answer:
          "권하지 않습니다. 서로 다른 장소에 표도 오르는 길도 따로이고 이동도 있습니다 — 게다가 천문산 등정 방식은 2025년 11월에 바뀌었습니다. 이틀로 잡으세요.",
      },
      {
        question: "유리다리는 무장애인가요?",
        answer: "아닙니다. 휠체어, 보행 보조기 등 보조기구는 허용되지 않습니다.",
      },
      {
        question: "며칠이 필요한가요?",
        answer:
          "느린 속도라면 통상 일수에 여유를 더하세요 — 안개, 대기 줄, 가장 느리게 걷는 분을 위해서요. 기본 일정 계산은 “장가계는 며칠이 필요한가” 가이드에서 다룹니다.",
      },
    ],
    ctaEyebrow: "함께 정리해요",
    ctaTitle: "지금 들고 계신 일정을 보내 주세요.",
    ctaBody:
      "누가 가는지, 대략 언제인지, 누가 가장 느리게 걷는지 알려 주세요. 지금 상황에서 어느 구간이 안 되는지, 무엇을 빼야 하는지, 어느 날을 비워 둬야 하는지 알려 드리겠습니다.",
    ctaBoundary: "결제 이야기가 나오기 전에요.",
    ctaAction: "여행 상담 시작하기",
    relatedTitle: "계속 준비하기",
    relatedLinkLabel: "장가계는 며칠이 필요한가요?",
    relatedLinkDescription:
      "느린 속도를 위한 여유를 더하기 전, 장가계 여행의 기본 일정 계산.",
    schemaAbout: ["장가계", "장가계 국가삼림공원", "무장애 여행", "연장자 여행"],
  },
};

export function getZhangjiajieOlderTravellersCopy(
  locale: HomegroundLocale,
): ZhangjiajieOlderTravellersCopy {
  return copies[locale];
}
