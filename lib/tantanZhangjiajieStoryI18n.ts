import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { bodyGuidePeakRate, bodyGuideRate, bodyTourPrice } from "./guideBodyPrices.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { bodyZhangjiajieFourDayPrice, bodyZhangjiajieFourDayValidUntil } from "./guideBodyZhangjiajiePrice.ts";

interface StorySection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
  routeChoices?: {
    title: string;
    options: {
      tourSlug:
        | "zhangjiajie-4-day-private-tour"
        | "zhangjiajie-forest-4-day-private-tour"
        | "zhangjiajie-furong-fenghuang-7-day-private-tour";
      title: string;
      description: string;
    }[];
    comparisonLabel: string;
  };
}

export interface TantanZhangjiajieStoryCopy {
  htmlLang: string;
  homePath: string;
  skipLink: string;
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbStudio: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  title: string;
  metadataTitle: string;
  dek: string;
  authorLabel: string;
  authorName: string;
  authorRole: string;
  readTime: string;
  updatedLabel: string;
  updatedDate: string;
  heroAlt: string;
  heroCaption: string;
  intro: string[];
  pullQuote: string;
  contentsLabel: string;
  contentsTitle: string;
  sections: StorySection[];
  mountainAlt: string;
  mountainCaption: string;
  restAlt: string;
  restCaption: string;
  closingTitle: string;
  closing: string[];
  closingQuote: string;
  checklistLabel: string;
  checklistTitle: string;
  checklistItems: string[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaAction: string;
  relatedEyebrow: string;
  relatedTitle: string;
  routeLinkLabel: string;
  routeLinkDescription: string;
  studioLinkLabel: string;
  studioLinkDescription: string;
  schemaRole: string;
  schemaAbout: string[];
}

export const ZHANGJIAJIE_GLASS_BRIDGE_HERO = {
  path: "/product-previews/zhangjiajie-4-day-private-tour/hero/grand-canyon-glass-bridge.jpg",
  url: "https://homegroundchina.com/product-previews/zhangjiajie-4-day-private-tour/hero/grand-canyon-glass-bridge.jpg",
  width: 1280,
  height: 1600,
} as const;

const copies: Record<HomegroundLocale, TantanZhangjiajieStoryCopy> = {
  en: {
    htmlLang: "en",
    homePath: "/",
    skipLink: "Skip to the article",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbStudio: "Studio",
    breadcrumbCurrent: "Glass Bridge, skywalk or national park",
    eyebrow: "Attraction decision · Zhangjiajie",
    title:
      "Zhangjiajie Glass Bridge, Tianmen Skywalk or National Forest Park?",
    metadataTitle:
      "Zhangjiajie Glass Bridge vs Tianmen Skywalk vs Forest Park",
    dek:
      "They are three different places: the Glass Bridge is at Zhangjiajie Grand Canyon, the glass skywalks are on Tianmen Mountain, and the pillar landscape is in Zhangjiajie National Forest Park.",
    authorLabel: "On-the-ground notes by",
    authorName: "Tantan",
    authorRole: "Trip planner · Hunan local coordination",
    readTime: "9 min read",
    updatedLabel: "Published",
    updatedDate: "23 July 2026",
    heroAlt:
      "The Zhangjiajie Grand Canyon Glass Bridge spanning the forested canyon.",
    heroCaption:
      "This is the Grand Canyon Glass Bridge—not a Tianmen Mountain glass skywalk or Zhangjiajie National Forest Park.",
    intro: [
      "In Zhangjiajie, “Glass Bridge”, “glass skywalk” and “National Forest Park” are three different places with three different tickets. The Glass Bridge spans Zhangjiajie Grand Canyon, in Cili County, about an hour's drive from the city, with Wulingyuan on the way. The cliff-edge glass skywalks are on Tianmen Mountain, right next to the city. The sandstone pillars people know from Avatar are in Zhangjiajie National Forest Park at Wulingyuan.",
      "To walk the Glass Bridge you need the Grand Canyon's route B ticket: CNY 175 per adult on the scenic area's official online shop when we checked on 11 October 2026. A Forest Park ticket does not get you onto the bridge, and a Tianmen ticket does not either.",
      "Tantan has spent the past few years looking after English-speaking guests and coordinating trips across Zhangjiajie, Fenghuang and Changsha, for travellers from Europe, North America, Southeast Asia and beyond. The mix-up below is the one she sees most.",
    ],
    pullQuote:
      "“National Forest Park” on an itinerary does not mean the Glass Bridge is included.",
    contentsLabel: "In this field note",
    contentsTitle: "Seven things to know before the Glass Bridge day",
    sections: [
      {
        title: "Three places, three tickets",
        paragraphs: [
          "A traveller once asked Tantan to look over an itinerary they had already received. Their priority was the Grand Canyon Glass Bridge. They saw “National Forest Park” on the itinerary and assumed the bridge was included. It was not: the itinerary meant Zhangjiajie National Forest Park, with Yuanjiajie and Tianzi Mountain, an hour away from the canyon.",
          "Before you pay for any Zhangjiajie trip, find the exact name of each place on each day. The Forest Park ticket is not valid at the Grand Canyon, and Tianmen's skywalks are a third visit on a third ticket. Here is which of our private routes includes what.",
        ],
        routeChoices: {
          title: "Which private route includes the places you want?",
          options: [
            {
              tourSlug: "zhangjiajie-4-day-private-tour",
              title: "Zhangjiajie in 4 days: Forest Park, Glass Bridge and Tianmen",
              description:
                `All three. Forest Park on Day 2; on Day 3 the Grand Canyon Glass Bridge, then Huanglong (Yellow Dragon) Cave or Baofeng Lake, one of the two as named in your confirmation, with an English-speaking guide, a private car and the tickets booked; Tianmen Mountain on Day 4. Three hotel nights and airport or station transfers. From ${bodyZhangjiajieFourDayPrice("two-to-four", "en")} per person for two to four adults, or ${bodyZhangjiajieFourDayPrice("six", "en")} for six, for travel until ${bodyZhangjiajieFourDayValidUntil("en")}.`,
            },
            {
              tourSlug: "zhangjiajie-forest-4-day-private-tour",
              title: "Zhangjiajie Forest 4-day fixed-route private tour",
              description:
                `Forest Park and Tianmen Mountain, with Baofeng Lake instead of Tianmen in bad weather; no Grand Canyon Glass Bridge. Three nights in Wulingyuan. From ${bodyTourPrice("zhangjiajie-forest-4-day-private-tour", 2, "en")} per person for two, or ${bodyTourPrice("zhangjiajie-forest-4-day-private-tour", 6, "en")} for six.`,
            },
            {
              tourSlug: "zhangjiajie-furong-fenghuang-7-day-private-tour",
              title: "Zhangjiajie, Furong Town & Fenghuang 7-day private tour",
              description:
                `Two Forest Park days, then Furong Town and Fenghuang; neither the Glass Bridge nor Tianmen Mountain. From ${bodyTourPrice("zhangjiajie-furong-fenghuang-7-day-private-tour", 2, "en")} per person for two, or ${bodyTourPrice("zhangjiajie-furong-fenghuang-7-day-private-tour", 6, "en")} for six.`,
            },
          ],
          comparisonLabel: "Compare the three routes, prices and inclusions",
        },
      },
      {
        title: "Glass Bridge tickets: price and route",
        paragraphs: [
          "The Grand Canyon sells two routes on its official online shop, prices checked on 11 October 2026. Route B is the one with the bridge. Each ticket is sold with or without accident insurance, which adds CNY 3 a person.",
          "If another website shows CNY 219, 216 or 91, those are old list prices. There was no bridge-only ticket on the official shop when we checked; some sites and old guides mention a “route C”, but if the official shop is not selling it for your date, ignore it.",
        ],
        bullets: [
          "Route B, Glass Bridge and canyon: adults CNY 175; ages 14–18, 60–65 and students CNY 88; over 65 CNY 63; under 14 free.",
          "Route A, canyon only, no bridge: adults CNY 50; ages 14–18, 60–65 and students CNY 25; over 65 and under 14 free; about 2 hours.",
          "Route B runs visitor centre → Glass Bridge → glass walkway → down into the canyon → boat on Shenquan Lake → canyon exit; about 3 hours by the shop's description, 3.5 km and 3.5 hours by the scenic area's own guide.",
          "Going down, you can choose the paid zip-line and slide or a run of three lifts. Each extra is paid by QR code on site, or as a CNY 120 per person bundle.",
        ],
      },
      {
        title: "Hours, passport booking and where the walk ends",
        paragraphs: [
          "Both routes open at 8:00 and the last ticket check is 16:00. Route B needs about three hours, more with the extras or a queue, and the canyon is an hour's drive from the city, so do not plan Tianmen Mountain on the same day.",
          "The official shop's form accepts a passport: it asks each visitor's name, sex, document type and number, and nationality. Tickets are real-name, so carry the same passport you booked with. We looked at the form without placing an order, so we have not tested which foreign cards or phone numbers it accepts. The shop's refund rule: cancel before opening time on your visit date for a full refund; after that, 10% of the order is deducted. On our 4-day private tour we book the route B tickets in each traveller's passport name for you, so none of this lands on you.",
          "The trap almost nobody sees coming: route B starts at the visitor centre at the top and finishes at the canyon exit at the bottom, a different place. A taxi or hired driver who waits where they dropped you is waiting at the wrong end. Ask us for a car with one of our own drivers instead: it drops you at the visitor centre and meets you at the canyon exit. Send the date, your hotel and group size on WhatsApp or by email; we reply within 12 hours, and the car, the route and the price are confirmed in writing before you pay.",
        ],
      },
      {
        title: "Tianmen Mountain's glass skywalks",
        paragraphs: [
          "The cliff-edge glass skywalks are at the top of Tianmen Mountain and are walked on a Tianmen ticket; the glass-walkway service charge and the summit chairlift are paid separately. From 13 October 2026 Tianmen sells route C only: from the mountain gate, the fast cableway up to Tianmen Cave and the escalators to the summit, and the same way down. The adult route C package is CNY 285 in the published notice we read on 11 October 2026, and each ticket is for a set date and time slot. Tianmen opens at 8:00 with its last ticket check at 16:00, the same hours as the Grand Canyon, which is one more reason the two cannot share a day. The city cableway is closed with no reopening date published.",
          "If you searched for “skywalk Zhangjiajie National Forest Park”, here is why the names blur: Tianmen Mountain is officially a national forest park too, 天门山国家森林公园, and that is the name on its tickets and at its mountain gate. So “National Forest Park” on an itinerary can mean either place; ask which one. The cliff-edge skywalks are on Tianmen. Zhangjiajie National Forest Park, 张家界国家森林公园 at Wulingyuan, is the pillar landscape: Yuanjiajie, Tianzi Mountain, Golden Whip Stream. The bridge people photograph there, the First Bridge Under Heaven at Yuanjiajie, is a natural stone arch, not glass. And if you searched for a “Tianmen glass bridge”: Tianmen has glass skywalks along the cliff; the suspended Glass Bridge is at the Grand Canyon.",
          "Tianmen queues on holiday peaks too. On 2 May 2025 one visitor queued about 2.5 hours to get in and about 1.5 hours for the cableway down (36Kr, 6 May 2025); on 5 October 2025, during the National Day holiday, visitors queued more than an hour for the cableway and then hit a breakdown (Ziniu News, 6 October 2025). Those were the old routes; on route C every visitor now goes up and comes down by the same fast cableway. On our 4-day private tour Tianmen is Day 4: we book the route C ticket for your date, take you to the mountain gate by private car and drive you on to the airport or station afterwards.",
        ],
      },
      {
        title: "The Forest Park day is where holiday crowds hit",
        paragraphs: [
          "On 2 May 2025, a May Day holiday peak, the park's lifts, cableways and shuttle buses ran such long queues that Wulingyuan district apologised publicly; traffic jammed from the South Gate towards town between 19:20 and 20:30, and the last visitors were not shuttled out until 21:53 (Guangming Online, reprinting the district media centre, 4 May 2025). One visitor there on 2–3 May walked into the park at about 6 a.m. without queuing, and still queued later in the day: more than nine hours over the two days, including about two hours for the Bailong Elevator and about 1.5 hours for the Tianzi Mountain cableway down (36Kr, 6 May 2025).",
          `If your dates touch a Chinese holiday, the order of the day matters more than the ticket. On our 4-day tour your guide plans the park entry time and the direction of the visit so you go in early, ahead of the busiest hours. Running your own trip? Book one of our guides for the Forest Park day: ${bodyGuideRate("zhangjiajie", "en")} per guide for a full day of up to 8 hours in Zhangjiajie (${bodyGuidePeakRate("zhangjiajie", "en")} on peak dates). Your guide plans the entry time and the direction of the visit with you; the price is for the guide only, and transport, tickets and meals are separate.`,
        ],
      },
      {
        title: "Being there is not the same as experiencing it",
        paragraphs: [
          "A place on an itinerary only proves its name is on the page. Zhangjiajie days are long: on our Forest tour a full Forest Park day runs roughly 10–11 hours door to door; the Glass Bridge day is an hour's drive each way plus about three hours on route B, more with the extras; Tianmen is a separate day on route C. Add jet lag, hotel pickups, ticket checks, queues and luggage, and a day with four big names on it usually means a short stop at each. Tantan prefers to make the pace clear before you pay: a shorter day can be the better trip when it gives you time for what you came for.",
        ],
        bullets: [
          "How much time is actually available?",
          "Which entrance or section will you visit?",
          "What route will you follow, and where does it end?",
          "Is there enough time for the experience you care about most?",
        ],
        quote: "Travelling this far should leave time for more than a hurried look.",
      },
      {
        title: "The main ticket may not cover every experience",
        paragraphs: [
          "The main ticket rarely covers the rides. Zhangjiajie National Forest Park's official page, checked on 20 August 2026, sold admission at CNY 165, or CNY 236 with the eco-bus, each valid for four consecutive days, and neither included the cableways or the Bailong Elevator. At the Grand Canyon the zip-line, slides and lifts are extra; on Tianmen the glass-walkway service charge and the summit chairlift are extra. Where you sleep changes the day as well: Wulingyuan suits consecutive Forest Park days, the city suits Tianmen and evenings out. Optional extras are easier to enjoy when they are informed choices, not surprises at the gate. On our tours, everything included is listed in your written confirmation, there are no shopping stops, and anything added is agreed before it is charged.",
        ],
        bullets: [
          "What is already included?",
          "What is not included?",
          "Which experiences are optional upgrades?",
          "What might need to be paid on site?",
          "How would each choice change the route or the day?",
        ],
      },
    ],
    mountainAlt:
      "Tantan with guests against the forested mountain landscape of Zhangjiajie; guest faces are blurred for privacy.",
    mountainCaption:
      "In Zhangjiajie, small differences in attraction names, routes and timing can change the shape of an entire day.",
    restAlt:
      "Tantan accompanying two international guests during a local visit; guest faces are blurred for privacy.",
    restCaption:
      "Good local coordination comes down to details: travel time, route order, luggage and what each ticket includes.",
    closingTitle: "Leave the Glass Bridge day to us",
    closing: [
      "Done alone, the Glass Bridge day is a chain: the right route-B ticket in each traveller's passport name, an hour's drive, arriving well before the 16:00 last check, and a ride waiting at an exit that is not where you went in. On our Zhangjiajie 4-day private tour that chain is already solved: Day 3 is the Glass Bridge with your English-speaking guide, a private car and the tickets booked, and we pick you up at the canyon exit.",
      `Send your dates and group size on WhatsApp or by email and we reply within 12 hours with the full price in writing. One planner looks after you from that first reply to the last day, our guides and drivers are our own, and we are a licensed travel agency (L-BJ10587). You pay a 30% deposit by card through a secure VBill link and the rest on arrival. The published tour prices cover travel until ${bodyZhangjiajieFourDayValidUntil("en")}; for later dates we quote again in writing.`,
    ],
    closingQuote:
      "The best itinerary is not the one with the longest list. It is the one the guest understands and can genuinely experience.",
    checklistLabel: "Tantan’s final pass",
    checklistTitle: "Seven things to read again before paying",
    checklistItems: [
      "Exact attraction names: Grand Canyon Glass Bridge, Tianmen Mountain National Forest Park or Zhangjiajie National Forest Park",
      "The ticket route: route B for the bridge",
      "Realistic visiting time for each day, before the 16:00 last check",
      "Where the walk ends and who meets you there",
      "Hotel names, room types and locations",
      "Included, optional and on-site paid items",
      "Driver, guide and vehicle arrangements",
    ],
    ctaEyebrow: "Planning Zhangjiajie",
    ctaTitle: "Tell us which of the three places you want, and your dates.",
    ctaBody:
      "Use WhatsApp or leave your email, and we reply within 12 hours. Tell us your days, priorities and preferred pace. The service, scope, price or quote and delivery timing are confirmed before any paid work begins.",
    ctaAction: "Talk to a China trip planner",
    relatedEyebrow: "Keep planning",
    relatedTitle: "Plan the rest of your Zhangjiajie days",
    routeLinkLabel: "Zhangjiajie in 2, 3 or 4 days",
    routeLinkDescription:
      "See what actually fits, which scenic areas belong together and when Fenghuang makes sense as the next stop.",
    studioLinkLabel: "Meet Tantan and the Homeground team",
    studioLinkDescription:
      "See how trip planners and local experience come together around one journey.",
    schemaRole: "Trip planner and Hunan local coordinator",
    schemaAbout: [
      "Zhangjiajie Grand Canyon Glass Bridge",
      "Tianmen Mountain Glass Skywalk",
      "Zhangjiajie trip planning",
    ],
  },
  zh: {
    htmlLang: "zh-CN",
    homePath: "/zh/",
    skipLink: "跳到正文",
    breadcrumbLabel: "面包屑导航",
    breadcrumbHome: "首页",
    breadcrumbStudio: "工作室",
    breadcrumbCurrent: "玻璃桥、玻璃栈道还是森林公园",
    eyebrow: "景点判断 · 张家界",
    title: "张家界大峡谷玻璃桥、天门山玻璃栈道和森林公园怎么区分？",
    metadataTitle: "张家界大峡谷玻璃桥、天门山玻璃栈道和森林公园怎么区分？",
    dek:
      "这是三个不同地点：玻璃桥在张家界大峡谷，玻璃栈道在天门山，石英砂岩峰林主景区则是张家界国家森林公园。",
    authorLabel: "笔记作者",
    authorName: "Tantan",
    authorRole: "行程规划 · 湖南在地协调",
    readTime: "阅读约 9 分钟",
    updatedLabel: "发布于",
    updatedDate: "2026 年 7 月 23 日",
    heroAlt: "张家界大峡谷玻璃桥横跨林木覆盖的峡谷。",
    heroCaption:
      "画面是张家界大峡谷玻璃桥，不是天门山玻璃栈道，也不属于张家界国家森林公园。",
    intro: [
      "在张家界，「玻璃桥」「玻璃栈道」和「森林公园」是三个不同的地方，门票也各买各的。玻璃桥横跨张家界大峡谷，在慈利县，离市区开车约一小时，武陵源在半路上；贴着悬崖的玻璃栈道在天门山，就在市区旁边；电影《阿凡达》里那种砂岩石柱，在武陵源的张家界国家森林公园。",
      "想走玻璃桥，要买大峡谷的 B 线：2026 年 10 月 11 日我们查景区官方商城，成人每人 ¥175。森林公园的门票上不了玻璃桥，天门山的门票也不行。",
      "这几年，Tantan 一直在张家界、凤凰、长沙一带接待英语客人、协调在地行程，客人来自欧美、东南亚等地。下面这个误会，是她遇到最多的一种。",
    ],
    pullQuote: "行程单上写着「国家森林公园」，不代表玻璃桥也在里面。",
    contentsLabel: "这篇现场笔记",
    contentsTitle: "去玻璃桥之前要知道的 7 件事",
    sections: [
      {
        title: "三个地方，三张门票",
        paragraphs: [
          "一位客人曾请 Tantan 帮忙看已经拿到的行程。客人最想去大峡谷玻璃桥，看到行程里写着「国家森林公园」，就以为玻璃桥也包含在内。其实不包含：行程指的是有袁家界、天子山的张家界国家森林公园，离大峡谷还有一小时车程。",
          "付钱订任何张家界行程之前，先在每一天里找到每个地方的准确名称。森林公园的门票在大峡谷用不了，天门山的玻璃栈道又是第三个地方、第三张票。下面是我们几条私家团各自包含什么。",
        ],
        routeChoices: {
          title: "哪条私家团路线包含你想去的地方？",
          options: [
            {
              tourSlug: "zhangjiajie-4-day-private-tour",
              title: "张家界 4 天私家团：森林公园、玻璃桥和天门山",
              description:
                `三个都去。第 2 天森林公园；第 3 天大峡谷玻璃桥，之后去黄龙洞或宝峰湖（二选一，以书面确认单为准），英文导游、专车，门票代订好；第 4 天天门山；含三晚酒店和机场或车站接送。2 至 4 位成人每人 ${bodyZhangjiajieFourDayPrice("two-to-four", "zh")} 起，6 位成人每人 ${bodyZhangjiajieFourDayPrice("six", "zh")}，适用于 ${bodyZhangjiajieFourDayValidUntil("zh")}前出行。`,
            },
            {
              tourSlug: "zhangjiajie-forest-4-day-private-tour",
              title: "张家界森林公园 4 天固定路线私家团",
              description:
                `森林公园加天门山，天气不好时天门山换成宝峰湖；不去大峡谷玻璃桥。三晚住武陵源。2 人出行每人 ${bodyTourPrice("zhangjiajie-forest-4-day-private-tour", 2, "zh")} 起，6 人每人 ${bodyTourPrice("zhangjiajie-forest-4-day-private-tour", 6, "zh")}。`,
            },
            {
              tourSlug: "zhangjiajie-furong-fenghuang-7-day-private-tour",
              title: "张家界、芙蓉镇与凤凰 7 天私家团",
              description:
                `两天森林公园，再去芙蓉镇和凤凰；不含玻璃桥，也不含天门山。2 人出行每人 ${bodyTourPrice("zhangjiajie-furong-fenghuang-7-day-private-tour", 2, "zh")} 起，6 人每人 ${bodyTourPrice("zhangjiajie-furong-fenghuang-7-day-private-tour", 6, "zh")}。`,
            },
          ],
          comparisonLabel: "比较三条路线、价格与包含项目",
        },
      },
      {
        title: "玻璃桥门票：价格和线路",
        paragraphs: [
          "大峡谷在官方商城卖两条线路，以下价格为 2026 年 10 月 11 日查询。带玻璃桥的是 B 线。每种门票都分含意外险和不含意外险两种，意外险每人 ¥3。",
          "在别的网站看到 ¥219、¥216 或 ¥91，那是旧的挂牌价。我们查的时候，官方商城没有只含玻璃桥的门票；有些网站和旧攻略提到「C 线」，如果官方商城在你那天不卖，就别当真。",
        ],
        bullets: [
          "B 线（玻璃桥 + 峡谷）：成人 ¥175；14 至 18 岁、60 至 65 岁和学生 ¥88；65 岁以上 ¥63；14 岁以下免费。",
          "A 线（只有峡谷，不过玻璃桥）：成人 ¥50；14 至 18 岁、60 至 65 岁和学生 ¥25；65 岁以上和 14 岁以下免费；约 2 小时。",
          "B 线路线：游客中心 → 玻璃桥 → 玻璃栈道 → 下到峡谷 → 神泉湖坐船 → 峡谷出口；商城说明约 3 小时，景区官网写的是 3.5 公里、3.5 小时。",
          "下山时可以选付费的滑索和滑道，或者连坐三段电梯。每个项目都能现场扫码买，也可以买每人 ¥120 的套票。",
        ],
      },
      {
        title: "开放时间、用护照订票，以及在哪里走出来",
        paragraphs: [
          "两条线路都是 8:00 开门，16:00 最后检票。B 线要留约三小时，加项目或排队就更久；大峡谷离市区开车约一小时，所以别把天门山排在同一天。",
          "官方商城的表单接受护照：每位游客要填姓名、性别、证件类型和号码、国籍。门票实名，入园带上订票用的那本护照。我们只看了表单、没有下单，所以没试过它接受哪些境外银行卡和手机号。商城的退款规则是：游玩当天开园前取消可全额退款，开园后取消扣订单金额的 10%。参加我们的 4 天私家团，B 线门票由我们按每个人的护照代订，这些都不用你操心。",
          "几乎没人想到的坑：B 线从山上的游客中心进去，在山下的峡谷出口出来，两处不是同一个地方。打车或包车的司机如果在你下车的地方等，就等错了一头。可以找我们订车，司机是我们自己的：送你到游客中心，在峡谷出口接你。把日期、酒店和人数通过 WhatsApp 或邮件发给我们，12 小时内回复；用车、路线和价格都在付款前书面确认。",
        ],
      },
      {
        title: "天门山的玻璃栈道",
        paragraphs: [
          "贴着悬崖的玻璃栈道在天门山山顶，用天门山门票就能走；玻璃栈道服务费和山顶观光小缆车另外付费。2026 年 10 月 13 日起天门山只卖 C 线：从山门坐快线索道到天门洞，再坐穿山扶梯上山顶，原路下山。我们 2026 年 10 月 11 日看到的公告里，C 线成人套票 ¥285，每张票都要选定日期和时段。天门山 8:00 开门、16:00 最后检票，和大峡谷一样，所以两处不能排在同一天。市区出发的索道停运，没有公布恢复时间。",
          "如果你搜的是「张家界国家森林公园玻璃栈道」，名字容易混是有原因的：天门山的正式名称也叫国家森林公园——「天门山国家森林公园」，门票和山门上写的就是这个名字。所以行程单上只写「国家森林公园」，两个地方都有可能，一定要问清是哪一个。贴着绝壁的玻璃栈道在天门山；武陵源的「张家界国家森林公园」是石柱峰林：袁家界、天子山、金鞭溪。那里大家拍的「天下第一桥」在袁家界，是天然石桥，不是玻璃桥。如果你搜的是「天门山玻璃桥」：天门山有的是悬崖上的玻璃栈道，悬空的那座玻璃桥在大峡谷。",
          "天门山在节假日高峰也排队。2025 年 5 月 2 日，一位游客进山排了约 2.5 小时，坐索道下山又排了约 1.5 小时（36氪，2025 年 5 月 6 日）；2025 年 10 月 5 日国庆假期，游客排了一个多小时索道，又遇上故障（紫牛新闻，2025 年 10 月 6 日）。那时还是旧线路；现在只开 C 线，所有游客上下山都坐同一条快线索道。参加我们的 4 天私家团，天门山是第 4 天：我们按你的日期代订 C 线门票，专车送你到山门，玩完直接送去机场或车站。",
        ],
      },
      {
        title: "节假日最挤的是森林公园那一天",
        paragraphs: [
          "2025 年 5 月 2 日是五一假期高峰，森林公园的电梯、索道和环保车排起长队，武陵源区事后公开致歉；当晚 19:20 至 20:30，南门到城区一带堵车，到 21:53 才把游客全部送完（光明网转武陵源区融媒体中心，2025 年 5 月 4 日）。一位 5 月 2 日至 3 日在那里的游客，早上 6 点左右进园时没排队，但当天后面还是要排：两天累计排队超过 9 小时，其中百龙天梯上山约 2 小时，天子山索道下山约 1.5 小时（36氪，2025 年 5 月 6 日）。",
          `日期碰上中国节假日，一天怎么排比门票更重要。在我们的 4 天私家团里，导游会排好进园时间和游览方向，让你赶在人最多之前早早进园。想自己安排行程？森林公园那一天也可以只请我们的导游：张家界每位导游每天${bodyGuideRate("zhangjiajie", "zh")}，按整天算、最多 8 小时（高峰日${bodyGuidePeakRate("zhangjiajie", "zh")}），导游和你一起排好进园时间和游览方向；只含导游，交通、门票和餐费另算。中文客人也可以安排中文导游。`,
        ],
      },
      {
        title: "「去过」不等于真正游览过",
        paragraphs: [
          "景点名字出现在行程单里，只能说明这一行字被写进去了。张家界的每一天都很长：在我们的森林公园团里，森林公园一整天从出门到回酒店约 10 到 11 小时；玻璃桥那天单程开车约一小时，B 线本身约三小时，加项目更久；天门山要单独排一天走 C 线。再加上倒时差、酒店接送、验票、排队和行李，一天塞四个大景点，往往每个都只能匆匆一停。Tantan 更愿意付款前就把节奏说清楚：少排一个景点，有时反而让你真正想看的地方有足够时间。",
        ],
        bullets: [
          "现场究竟有多少可用时间？",
          "从哪个入口进、到哪个区域？",
          "按什么顺序走、在哪里出来？",
          "最在意的体验是否真的有时间完成？",
        ],
        quote: "远赴千里，不应该只换来匆匆一瞥。",
      },
      {
        title: "基础门票不一定涵盖所有体验",
        paragraphs: [
          "基础门票很少包含景区交通。张家界国家森林公园官方页面 2026 年 8 月 20 日查询：门票 ¥165，含环保车 ¥236，都是连续 4 天有效，都不含索道和百龙天梯。大峡谷的滑索、滑道和电梯另付；天门山的玻璃栈道服务费和山顶观光小缆车另付。住在哪也会改变一天的安排：连续逛森林公园住武陵源方便，去天门山、晚上想出门就住市区。自选项目提前了解，才不会变成门口的意外开销。在我们的团里，包含什么都写在书面确认单上，不进购物店，任何新增项目都先确认再收费。",
        ],
        bullets: [
          "现在的价格已经包含什么？",
          "哪些不包含？",
          "哪些是可以自选的升级？",
          "哪些可能要现场付款？",
          "每个选择会怎样改变路线和时间？",
        ],
      },
    ],
    mountainAlt:
      "Tantan 与同行客人在张家界山景前合影，客人面部已做隐私模糊处理。",
    mountainCaption:
      "在张家界，景点名称、路线与时间上的细小差异，可能改变一整天的体验。",
    restAlt:
      "Tantan 在当地行程中陪同两位国际客人，客人面部已做隐私模糊处理。",
    restCaption:
      "在地协调拼的是细节：路上要多久、先去哪后去哪、行李怎么办、门票到底含什么。",
    closingTitle: "玻璃桥这一天，交给我们",
    closing: [
      "自己去，玻璃桥这一天是一连串的事：按每个人的护照买对 B 线，开车一小时，赶在 16:00 最后检票前到，再在一个不是入口的出口找到车。在我们的张家界 4 天私家团里，这些都已经解决：第 3 天去玻璃桥，有英文导游、专车，门票代订好，我们在峡谷出口接你。",
      `通过 WhatsApp 或邮件把日期和人数发给我们，12 小时内回复完整的书面报价。从第一次回复到旅程最后一天都是同一位规划师跟进，导游和司机都是我们自己的，我们是持证旅行社（许可证 L-BJ10587）。先付 30% 定金，用 VBill 刷卡链接支付，尾款到了当地再付。公布的团价适用于 ${bodyZhangjiajieFourDayValidUntil("zh")}前出行，之后的日期重新书面报价。`,
    ],
    closingQuote:
      "最好的行程不是景点排得最多，而是客人看得懂、每一站都真的玩得到。",
    checklistLabel: "Tantan 的最后一遍复核",
    checklistTitle: "付款前，再读一次这 7 项",
    checklistItems: [
      "准确的景点名称：大峡谷玻璃桥、天门山国家森林公园，还是张家界国家森林公园",
      "门票线路：去玻璃桥要买 B 线",
      "每天真正可用的游览时间，赶在 16:00 最后检票前",
      "在哪里走出来、谁在那里接你",
      "酒店名称、房型与位置",
      "已包含、自选与现场付款的项目",
      "司机、导游与车辆安排",
    ],
    ctaEyebrow: "正在规划张家界",
    ctaTitle: "告诉我们三个地方想去哪几个、哪几天去。",
    ctaBody:
      "可以通过 WhatsApp 直接聊，或只留下一个邮箱，12 小时内回复。告诉我们天数、最想去的地方和喜欢的节奏；任何付费工作开始前都会先确认服务、范围、价格或报价与交付时间。",
    ctaAction: "联系旅行规划师",
    relatedEyebrow: "继续规划",
    relatedTitle: "接着排张家界的其他几天",
    routeLinkLabel: "张家界 2、3、4 天分别能安排什么",
    routeLinkDescription:
      "查看哪些景区适合放在一起、时间到底够不够，以及什么时候适合把凤凰作为下一站。",
    studioLinkLabel: "认识 Tantan 和 Homeground 团队",
    studioLinkDescription: "看看规划师和在地团队怎样一起把一段行程落到实处。",
    schemaRole: "行程规划师与湖南在地协调成员",
    schemaAbout: ["张家界大峡谷玻璃桥", "天门山玻璃栈道", "张家界行程规划"],
  },
  ko: {
    htmlLang: "ko",
    homePath: "/ko/",
    skipLink: "본문으로 이동",
    breadcrumbLabel: "현재 위치",
    breadcrumbHome: "홈",
    breadcrumbStudio: "스튜디오",
    breadcrumbCurrent: "유리다리·유리잔도·국가삼림공원",
    eyebrow: "관광지 선택 · 장가계",
    title: "장가계 대협곡 유리다리·천문산 유리잔도·국가삼림공원 구분하기",
    metadataTitle: "장가계 유리다리 vs 천문산 잔도 vs 삼림공원",
    dek:
      "서로 다른 세 곳입니다. 유리다리는 장가계 대협곡, 유리잔도는 천문산, 사암 봉우리 풍경은 장가계 국가삼림공원에 있습니다.",
    authorLabel: "현장 경험",
    authorName: "Tantan",
    authorRole: "여행 플래너 · 후난 현지 일정 조율",
    readTime: "약 8분",
    updatedLabel: "게시일",
    updatedDate: "2026년 7월 23일",
    heroAlt: "숲이 우거진 협곡을 가로지르는 장가계 대협곡 유리다리.",
    heroCaption:
      "사진은 장가계 대협곡 유리다리입니다. 천문산 유리잔도나 장가계 국가삼림공원과는 다른 곳입니다.",
    intro: [
      "장가계에서 ‘유리다리’와 ‘유리잔도’는 이름만 들으면 비슷해 보이지만, 서로 다른 장소에서 만나는 별개의 여행 코스입니다.",
      "장가계 대협곡 유리다리는 대협곡 관광지에 있습니다. 반면 천문산 유리잔도는 천문산 코스 안에 있습니다. 원가계와 천자산 등이 있는 장가계 국가삼림공원은 또 다른 관광지입니다.",
      "중국을 처음 찾는 여행자가 영문 일정표에서 Glass Bridge, Glass Skywalk, National Forest Park 같은 표현만 본다면 모두 한 관광지 안에 있다고 생각하기 쉽습니다. 화면에서 작아 보인 오해가 현장에서는 하루 전체를 바꿀 수도 있습니다.",
      "탄탄은 지난 2~3년 동안 장가계와 봉황고성, 창사 등 후난성 여러 지역에서 영어로 여행객을 응대하고 현지 일정을 조율해 왔습니다. 그가 아름다운 풍경을 소개하는 일만큼 중요하게 여기는 질문이 있습니다.",
    ],
    pullQuote:
      "여행자가 예약했다고 생각한 일정과 현장에서 실제로 경험할 일정이 같은지, 그걸 먼저 확인해요.",
    contentsLabel: "이 현장 노트에서",
    contentsTitle: "여행이 현장에 닿기 전 확인하는 7가지",
    sections: [
      {
        title: "관광지 이름이 원하는 경험과 정확히 연결되는지",
        paragraphs: [
          "탄탄은 한 여행자가 미리 준비한 일정을 함께 살펴본 적이 있습니다. 그 여행자가 가장 기대한 곳은 대협곡 유리다리였습니다. 일정표에 ‘국가삼림공원’이 적혀 있어 유리다리도 포함된 것으로 이해했지만, 실제로는 원가계와 천자산 등을 둘러보는 장가계 국가삼림공원을 뜻했습니다.",
          "현지 도착 전에 차이를 확인했기 때문에, 탄탄은 두 관광지의 위치와 경험을 설명하고 확보된 시간에 맞춰 동선을 다시 조율할 수 있었습니다. 그에게 이 과정은 종이 위의 이름을 현장에서 실제로 만날 경험으로 풀어 주는 일에 가깝습니다.",
        ],
        routeChoices: {
          title: "가고 싶은 관광지가 포함된 프라이빗 코스는?",
          options: [
            {
              tourSlug: "zhangjiajie-4-day-private-tour",
              title: "클래식 4일 프라이빗 투어",
              description:
                "국가삼림공원, 대협곡 유리다리, 천문산을 한 여행에서 둘러보고 싶다면 이 코스를 선택하세요.",
            },
            {
              tourSlug: "zhangjiajie-forest-4-day-private-tour",
              title: "삼림 4일 프라이빗 투어",
              description:
                "국가삼림공원과 천문산이 포함되며 대협곡 유리다리는 방문하지 않습니다. 천문산 유리잔도는 대협곡 유리다리와 다른 관광지입니다.",
            },
            {
              tourSlug: "zhangjiajie-furong-fenghuang-7-day-private-tour",
              title: "장가계·부용진·봉황고성 7일 프라이빗 투어",
              description:
                "국가삼림공원 이틀과 부용진·봉황고성을 함께 둘러봅니다. 대협곡 유리다리와 천문산은 모두 포함되지 않습니다.",
            },
          ],
          comparisonLabel: "세 코스의 일정·가격·포함 항목 비교하기",
        },
      },
      {
        title: "일정표에 있다는 것과 제대로 둘러보는 것은 다릅니다",
        paragraphs: [
          "일정에 관광지 이름이 한 줄 들어갔다고 해서 그곳을 충분히 둘러볼 수 있다고 단정하기는 어렵습니다. 방문지가 많아 보여도 각 장소에서 쓸 수 있는 시간이 지나치게 짧을 수 있습니다.",
          "탄탄은 방문지 개수보다 여행자가 기대한 경험을 여유 있게 할 수 있는지를 더 중요하게 봅니다.",
        ],
        bullets: [
          "실제로 머물 수 있는 시간은 얼마나 되는지",
          "관광지 안에서 어느 구역까지 들어가는지",
          "어떤 순서와 동선으로 둘러보는지",
          "가장 기대한 체험을 실제로 할 수 있는지",
        ],
      },
      {
        title: "관광지 운영 시간만으로 하루를 계산하지 않습니다",
        paragraphs: [
          "해외에서 중국에 도착한 여행자는 시차에 적응할 시간이 필요할 수 있습니다. 관광지 사이 이동, 대기, 예약과 입장 절차, 내부 교통, 짐 보관과 이동도 함께 고려해야 합니다.",
          "종이 위에서는 하루 안에 가능해 보여도 현장에서는 체력 부담이 클 수 있습니다. 때로는 한 곳을 덜 넣는 편이 가장 기대한 장소를 제대로 경험하는 더 좋은 여행이 됩니다.",
        ],
        quote: "멀리까지 온 여행인데, 잠깐 보고 서둘러 나오는 일정으로 끝나면 아쉽잖아요.",
      },
      {
        title: "호텔은 별점보다 위치가 더 중요할 때가 있습니다",
        paragraphs: [
          "무릉원은 장가계 국가삼림공원을 여러 날 둘러보기에 편리한 편입니다. 장가계 시내는 천문산으로 이동하기 좋고, 저녁에 산책하거나 식사와 쇼핑을 즐기고 싶은 여행자에게 더 잘 맞을 수 있습니다.",
          "어느 지역이 무조건 더 좋은 것은 아닙니다. 탄탄은 정확한 호텔명과 객실 유형, 실제 위치, 시설, 저녁 이동의 편의성까지 일정과 함께 확인합니다.",
        ],
      },
      {
        title: "기본 입장권이 모든 체험을 포함하는 것은 아닙니다",
        paragraphs: [
          "관광지 안에는 케이블카, 엘리베이터, 유람선, 짚라인, 공연처럼 별도로 선택할 수 있는 체험이 있을 수 있습니다. 관심사와 예산, 연령, 몸 상태에 따라 선택이 달라지므로 처음부터 모두 포함하는 것이 꼭 적합한 것은 아닙니다.",
          "중요한 것은 현장에서 처음 듣는 추가 비용이 아니라, 미리 이해한 뒤 스스로 선택할 수 있는 항목이 되는 것입니다.",
        ],
        bullets: [
          "기본 일정과 가격에 무엇이 포함되는지",
          "포함되지 않은 항목은 무엇인지",
          "자유롭게 선택할 추가 체험은 무엇인지",
          "현장에서 별도로 결제할 가능성이 있는지",
          "각 선택이 동선과 시간에 어떤 영향을 주는지",
        ],
      },
      {
        title: "서비스 이름은 구체적인 내용으로 확인합니다",
        paragraphs: [
          "‘영어 응대’, ‘전용 차량’, ‘4성급 호텔’은 명확해 보이지만 실제 범위를 이해하려면 더 구체적인 확인이 필요합니다. 신뢰는 화려한 표현보다, 결제 전에 자신이 받게 될 서비스를 이해할 수 있을 때 생깁니다.",
        ],
        bullets: [
          "여행 중 주로 소통할 담당자는 누구인지",
          "기사와 영어 응대 담당자가 같은 사람인지",
          "차량이 인원수와 짐의 양에 적합한지",
          "정확히 어느 호텔의 어떤 객실인지",
          "쇼핑 일정이 포함되어 있는지",
          "일정이 바뀔 때 누구에게 연락하면 되는지",
        ],
      },
      {
        title: "결제 전에 전체 일정을 처음부터 다시 읽습니다",
        paragraphs: [
          "마지막 확인은 더 많은 장소를 넣기 위한 단계가 아닙니다. 일정표의 약속이 하나의 자연스럽고 실행 가능한 여정을 설명하는지, 여행자가 중요한 선택을 이해했는지 다시 보는 과정입니다.",
        ],
      },
    ],
    mountainAlt:
      "장가계의 산악 풍경을 배경으로 서 있는 탄탄과 여행객들. 여행객 얼굴은 개인정보 보호를 위해 흐림 처리했다.",
    mountainCaption:
      "장가계에서는 관광지 이름과 동선, 시간의 작은 차이가 하루 전체의 경험을 바꿀 수 있습니다.",
    restAlt:
      "현지 일정 중 두 명의 여행객과 함께한 탄탄. 여행객 얼굴은 개인정보 보호를 위해 흐림 처리했다.",
    restCaption:
      "좋은 현지 조율은 이동 시간, 방문 순서, 짐과 입장권 포함 항목 같은 디테일에서 드러납니다.",
    closingTitle: "가장 기대한 경험을 일정에 남겨 두는 일",
    closing: [
      "탄탄은 자신이 ‘여행자를 조금 많이 챙기는 편’이라고 웃으며 말합니다. 현장 조건과 관계없이 모든 요청을 받아들인다는 뜻은 아닙니다. 안전과 시간, 현지 상황이 허락하는 범위에서 가장 기대한 경험을 지키고, 조정이 필요할 때 이유와 선택지를 솔직히 설명한다는 뜻입니다.",
      "중국을 처음 찾는 사람에게 모든 관광지 이름과 현지 운영 방식을 미리 이해하라고 하기는 어렵습니다. 가장 유용한 일정은 항목이 가장 많은 일정이 아니라, 여행자가 이해할 수 있고 현장에서 실제로 경험할 수 있는 일정입니다.",
    ],
    closingQuote:
      "좋은 일정은 장소가 가장 많은 일정이 아니라, 여행자가 이해하고 실제로 경험할 수 있는 일정입니다.",
    checklistLabel: "탄탄의 마지막 확인",
    checklistTitle: "결제 전 다시 읽어 볼 7가지",
    checklistItems: [
      "정확한 관광지 이름과 핵심 체험",
      "하루에 실제로 사용할 수 있는 관광 시간",
      "관광지 사이 이동과 짐 처리 방식",
      "호텔명, 객실 유형과 위치",
      "포함 항목, 선택 항목과 현장 결제 항목",
      "기사, 영어 응대 담당자와 차량 배정",
      "보험, 일행 규모와 일정 변경 조건",
    ],
    ctaEyebrow: "검토 중인 일정을 보여 주세요",
    ctaTitle: "검토 중인 여행을 플래너와 이야기해 보세요.",
    ctaBody:
      "WhatsApp으로 바로 문의하거나 이메일을 남겨 주세요. 여행 기간, 가장 가고 싶은 장소와 편안한 속도는 플래너와 이어서 확인할 수 있습니다. 유료 작업 전에는 서비스, 범위, 가격 또는 견적과 납기를 먼저 확인합니다.",
    ctaAction: "중국 여행 플래너와 상담하기",
    relatedEyebrow: "계속 계획하기",
    relatedTitle: "현장 노트를 전체 여정에 연결해 보세요",
    routeLinkLabel: "장가계 2·3·4일에 실제로 가능한 일정",
    routeLinkDescription:
      "어떤 관광지를 함께 묶을지, 시간이 충분한지, 봉황고성을 다음 목적지로 넣을 조건을 확인하세요.",
    studioLinkLabel: "탄탄과 Homeground 팀 소개",
    studioLinkDescription:
      "여행 설계와 실제 현지 경험이 하나의 여정을 중심으로 어떻게 연결되는지 만나 보세요.",
    schemaRole: "여행 플래너 및 후난 현지 일정 조율 담당",
    schemaAbout: ["장가계 대협곡 유리다리", "천문산 유리잔도", "장가계 여행 계획"],
  },
};

export function getTantanZhangjiajieStoryCopy(
  locale: HomegroundLocale = "en",
) {
  return copies[locale];
}
