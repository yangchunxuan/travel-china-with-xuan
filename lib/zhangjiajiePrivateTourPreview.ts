import product from "../content/product-previews/zhangjiajie-4-day-private-tour/product.json";
import pricing from "../content/product-previews/zhangjiajie-4-day-private-tour/pricing.json";
import { formatPrivateTourPrice } from "./privateTourProducts";

export type ProductPreviewLocale = "en" | "zh" | "ko";

export const zhangjiajiePrivateTourDaySummaries = {
  en: product.route.map((day) => day.summary_en),
  zh: product.route.map((day) => day.summary_zh),
  ko: product.route.map((day) => day.summary_ko),
} satisfies Readonly<Record<ProductPreviewLocale, readonly string[]>>;

export { product as zhangjiajiePrivateTourProduct };
export { pricing as zhangjiajiePrivateTourPricing };

export const zhangjiajiePrivateTourPreviewPaths = {
  en: "/preview/zhangjiajie-4-day-private-tour/",
  zh: "/zh/preview/zhangjiajie-4-day-private-tour/",
  ko: "/ko/preview/zhangjiajie-4-day-private-tour/",
} as const;

export const zhangjiajiePrivateTourPaths = {
  en: "/tours/zhangjiajie-4-day-private-tour/",
  zh: "/zh/tours/zhangjiajie-4-day-private-tour/",
  ko: "/ko/tours/zhangjiajie-4-day-private-tour/",
} as const;

export const productPreviewCopy = {
  en: {
    htmlLang: "en",
    metadataTitle: "Zhangjiajie 4-Day Private Tour: Price & Inclusions",
    metadataDescription:
      "A private 4-day Zhangjiajie route through Wulingyuan, the Glass Bridge and Tianmen Mountain, with flexible stay choices and a date-checked written quote.",
    previewLabel: "Local editorial preview · not open for booking",
    skipLink: "Skip to the article",
    breadcrumbLabel: "Breadcrumb",
    homeLabel: "Home",
    previewBreadcrumb: "4-day Zhangjiajie itinerary",
    eyebrow: "4 days · 3 nights · private Zhangjiajie route",
    heroTitle:
      "Zhangjiajie in 4 Days: Stone Peaks, Glass Bridge and Tianmen Mountain",
    heroLede:
      "A private four-day trip through Zhangjiajie National Forest Park, the Grand Canyon Glass Bridge and Tianmen Mountain. Day 1 is simply for arriving; Days 2–4 are for sightseeing. Before you book, we check your last-day Tianmen time against your departure.",
    secondaryCta: "Start with the four-day route",
    validThrough: "Price window: 6–30 September 2026",
    checkingPrice: "Published reference prices",
    expiredPrice:
      "The published price window does not apply today. Ask for a fresh quote for your travel dates.",
    fromLabel: "From",
    regularLabel: "Regular",
    perPerson: "per person",
    featured: "Starting option",
    exactStayNote:
      "Before you pay, you get the exact hotel, room, breakfast, number of rooms and availability in writing.",
    heroImageCaption:
      "Morning light across Zhangjiajie's sandstone pillars—the scale this four-day route is built around.",
    whyEyebrow: "Why this route works",
    whyTitle: "Four days, without turning Zhangjiajie into a race",
    whyIntro:
      "Zhangjiajie is not one viewpoint. It is a journey through sandstone pillars, a canyon crossing, cave or lake scenery, and the high slopes of Tianmen Mountain. This route gives the National Forest Park its own full day, keeps the Grand Canyon separate and lets the final mountain feel like a finale—not one more stop forced into a crowded list.",
    benefits: [
      [
        "A gentle arrival",
        "Our driver meets you at the airport or railway station and takes you to your hotel. The rest of Day 1 stays free—an arrival day is not a sightseeing day.",
      ],
      [
        "Three landscapes, three days",
        "The Forest Park, Grand Canyon and Tianmen Mountain each receive their own rhythm instead of being compressed into one generic highlights list.",
      ],
      [
        "A stay that changes the mood",
        "Keep the route and choose between city convenience, a more spacious premium stay or a more distinctive mountain setting.",
      ],
      [
        "Details that follow your dates",
        "Rooms, vehicle, tickets and guide are matched to your group and your dates before anything becomes a booking.",
      ],
    ],
    routeEyebrow: "The 4-day Zhangjiajie itinerary",
    routeTitle: "One arrival day, then three completely different landscapes",
    guideLabel: "Guided sightseeing planned",
    arrivalLabel: "Arrival and private transfer",
    daySummaries: zhangjiajiePrivateTourDaySummaries.en,
    staysEyebrow: "A sample of possible stays",
    staysTitle: "Choose how the journey feels after the mountains",
    staysIntro:
      "The sightseeing stays the same; what changes is how your evenings feel. These three stay styles run from convenient city hotels to roomier or more distinctive places—tell us which one sounds like you. Each set of photos comes from one candidate property; we never mix photos from different hotels into one set.",
    otherStaysTitle: "Not limited to the stays shown here",
    otherStaysBody:
      "These photos show only part of the hotel selection we can arrange. If none of them feels right, tell us the style, location or room setup you want. We can look at other Zhangjiajie hotels for your dates, so you keep the route you like and settle on the right hotel before you pay.",
    accommodationOptions: [
      {
        id: "city-candidate-01",
        label: "City",
        name: "Modern City Stay",
        price: "City-stay tier",
        summary:
          "A bright, contemporary city candidate shown through both available twin-room photographs. The window outlook and exact room remain subject to the date-specific assignment.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-window.jpg",
            alt: "Bright twin room with two beds and a window outlook",
            caption: "City stay · a bright twin room",
            width: 1016,
            height: 782,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-entry.jpg",
            alt: "Twin room with its entrance and vanity area visible",
            caption:
              "City candidate 01 · twin room, entrance and vanity reference",
            width: 830,
            height: 775,
          },
        ],
      },
      {
        id: "city-candidate-02",
        label: "City candidate 02",
        name: "Comfortable City Stay",
        price: "City-stay tier",
        summary:
          "Four candidate views show twin and double rooms, a specially decorated twin room and a bathroom. Balloons, floral styling and the window outlook are photographed examples, not standard guarantees.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-twin.jpg",
            alt: "Twin room and window outlook in the second city-stay set",
            caption: "City candidate 02 · twin-room and window reference",
            width: 1206,
            height: 746,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-double.jpg",
            alt: "Double room in the second city-stay set",
            caption: "City candidate 02 · double-room reference",
            width: 1206,
            height: 788,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-twin-decorated.jpg",
            alt: "Twin room with a special balloon and towel setup",
            caption:
              "City candidate 02 · special twin-room setup, not a standard inclusion",
            width: 1206,
            height: 785,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-bathroom.jpg",
            alt: "Bathroom with shower and wall-mounted hair dryer",
            caption: "City candidate 02 · bathroom and shower reference",
            width: 1206,
            height: 788,
          },
        ],
      },
      {
        id: "premium-villa",
        label: "Premium",
        name: "Spacious Premium Stay",
        price: "Spacious premium tier",
        summary:
          "For travellers who want the evening to feel spacious rather than merely functional. This candidate set shows the living room, twin room, double room and terrace; the exact accommodation and room allocation are confirmed for the dates.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-living.jpg",
            alt: "Sunlit living room with full-height windows in the premium-stay set",
            caption: "Premium stay · the living room",
            width: 1400,
            height: 1050,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-twin.jpg",
            alt: "Twin bedroom opening toward a garden in the premium-stay set",
            caption: "Premium-stay material set · twin-bedroom reference",
            width: 1050,
            height: 1400,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-double.jpg",
            alt: "Double bedroom with a large window in the premium-stay set",
            caption: "Premium-stay material set · double-bedroom reference",
            width: 1400,
            height: 1050,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-terrace.jpg",
            alt: "Outdoor deck and lawn in the premium-stay set",
            caption: "Premium-stay material set · deck and lawn reference",
            width: 1400,
            height: 1050,
          },
        ],
      },
      {
        id: "signature-villa",
        label: "Signature",
        name: "Distinctive Mountain Stay",
        price: "Distinctive mountain tier",
        summary:
          "Eleven candidate views show the dining terrace, several room styles, bathrooms and quiet lounge spaces. Together they convey the character of this more distinctive stay; they do not promise that every feature, view or layout belongs to one bookable room.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-terrace.jpg",
            alt: "Glass-enclosed dining area with trees and distant mountains in the signature-stay candidate set",
            caption:
              "Glass dining terrace · seating and view can vary",
            width: 1400,
            height: 1016,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-suite.jpg",
            alt: "Spacious open-plan guest room with one bed and several lounge chairs",
            caption:
              "Large open-plan room · room type, size and view vary",
            width: 1600,
            height: 1133,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-four-poster.jpg",
            alt: "Guest room with a draped four-poster bed and a window-side seating area",
            caption:
              "Four-poster room reference · exact room and bed category remain unconfirmed",
            width: 1600,
            height: 1102,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-fireplace-room.jpg",
            alt: "Guest room with a bed, an inset fireplace and greenery outside the windows",
            caption:
              "Fireplace room · room type, view and fireplace use confirmed for your dates",
            width: 1600,
            height: 1158,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-garden-lounge.jpg",
            alt: "Indoor lounge chair facing a tree-lined outdoor seating area",
            caption:
              "Indoor-outdoor lounge · private or exclusive use not included",
            width: 1600,
            height: 1182,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-bathtub.jpg",
            alt: "Bathroom with a freestanding bathtub, shower and toilet",
            caption:
              "Bathroom with bathtub · in some rooms, not all",
            width: 1600,
            height: 1113,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-red-room.jpg",
            alt: "Guest room with a four-poster bed, deep-red drapes and patterned textiles",
            caption:
              "Red-themed room · room type and availability confirmed for your dates",
            width: 1600,
            height: 1199,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-colour-room.jpg",
            alt: "Colourful guest room with one bed, lounge seating and mountains visible through the window",
            caption:
              "Colourful room · view, balcony and room type may differ",
            width: 1600,
            height: 1159,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-vanity.jpg",
            alt: "Open vanity area beside a bed, with greenery visible through the window",
            caption:
              "Bedroom and vanity area · layout and room type confirmed for your dates",
            width: 1600,
            height: 1099,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-shower.jpg",
            alt: "Bathroom with a double vanity, open shower and toilet",
            caption:
              "Shower-bathroom reference · exact room-specific configuration remains unconfirmed",
            width: 1600,
            height: 1199,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-lounge-detail.jpg",
            alt: "Lounge detail with a patterned chair, ceramic vessels and a lit arched wall niche",
            caption:
              "Interior-detail reference · likely photographed in the same unit as the large room",
            width: 1600,
            height: 1168,
          },
        ],
      },
    ],
    pricesEyebrow: "4-day private tour price",
    pricesTitle: "One route, three ways to stay",
    pricesIntro:
      "Same four-day route, three ways to stay—pick the one that suits your group. Reference prices are valid for the period shown; you get room availability, guide arrangements and your final total in writing before you book.",
    tierDescriptions: {
      "selected-city-stay":
        "A practical city base, chosen from the hotels and rooms available on your dates.",
      "spacious-premium-stay":
        "More room to spread out, both together and in your own rooms. The exact accommodation and rooms are confirmed for your dates.",
      "distinctive-mountain-stay":
        "Stronger design and scenery, with the exact property and room matched before you pay.",
    },
    faqEyebrow: "Before you choose four days",
    faqTitle: "The questions that change the itinerary",
    faqItems: [
      [
        "Is four days enough for Zhangjiajie?",
        "Yes, for a focused first visit: Day 1 for arriving, then the Forest Park, the Grand Canyon area and Tianmen Mountain get a day each. Seeing every nearby sight without rushing takes more days.",
      ],
      [
        "Are the Grand Canyon Glass Bridge and Tianmen glass walkway the same?",
        "No. They are two different places, visited on different days: the Glass Bridge is in the Zhangjiajie Grand Canyon area, and the glass walkways are on Tianmen Mountain.",
      ],
      [
        "Should I stay in the city or choose a more spacious setting?",
        "A city stay usually suits you if easy arrivals and departures matter most; a roomier stay suits relaxed evenings and space to be together. The best fit also depends on the exact hotel, the route order and where you leave from, so tell us how you arrive and leave.",
      ],
      [
        "Can Tianmen Mountain fit before my flight or train?",
        "Sometimes, if the timing works. We look at the Tianmen route and entry time available to book together with your train or flight, and only put both on the same day when there is a safe margin. With a late ticket or an early departure, the same plan may not work.",
      ],
      [
        "What is the value of a private plan here?",
        "We cannot control the weather or the queues. What we do is make each day hold together: the right entrances, private transport, your luggage, ticket routes and your group's pace—and we re-order the day when operations change.",
      ],
    ],
    scopeEyebrow: "What the private-tour price covers",
    scopeTitle:
      "Clear about what is in and what is out",
    plannedTitle: "Included in the quote",
    plannedItems: [
      "Private local transport and agreed arrival and departure transfers",
      "Two days of private English-speaking guide service",
      "Three nights in the selected accommodation tier",
      "Adult admission and standard scenic transport named in the confirmation",
      "No shopping stops; optional upgrades or added services require your agreement before they are charged",
    ],
    excludedTitle: "Not in the base price",
    excludedItems: [
      "Travel to and from Zhangjiajie",
      "Lunches, dinners and personal spending; breakfast is confirmed with your stay",
      "VIP access, bungee jumping, zip lines, shows and other optional activities",
      "Single-room, child and vehicle-upgrade differences",
      "Comprehensive travel insurance bought in the traveller's home country",
    ],
    confirmationNote:
      "Before you pay, your written confirmation lists exactly what is included, who operates each part and anything that differs on your dates.",
    paymentEyebrow: "How booking works",
    paymentTitle: "Three steps, and you see the full plan before you pay",
    paymentSteps: [
      [
        "01",
        "Tell us about your trip",
        "Send your dates, where you arrive, how many adults and children, the stay you like and how you leave.",
      ],
      [
        "02",
        "We check it for your dates",
        "We check the exact room, breakfast, vehicle, tickets and guide arrangements against your actual dates.",
      ],
      [
        "03",
        "You review one clear plan",
        "You get the total price, exactly what is included, who operates it and the booking conditions for your dates in writing. Then you decide.",
      ],
    ],
    sourcesTitle: "Official route and destination sources",
    sources: [
      {
        label: "Wulingyuan Scenic and Historic Interest Area",
        publisher: "UNESCO World Heritage Centre",
        url: "https://whc.unesco.org/en/list/640/",
      },
      {
        label: "Two-day Zhangjiajie Global Geopark route",
        publisher: "Zhangjiajie UNESCO Global Geopark",
        url: "https://zhangjiajieuggp.org.cn/html/2026/2026032620135033852.html",
      },
      {
        label: "Three-day Zhangjiajie Global Geopark route",
        publisher: "Zhangjiajie UNESCO Global Geopark",
        url: "https://zhangjiajieuggp.org.cn/html/2026/2026032620161311924.html",
      },
      {
        label: "Tianmen Mountain visitor-transport reference",
        publisher: "Hunan Provincial Department of Culture and Tourism",
        url: "https://whhlyt.hunan.gov.cn/whhlyt/wldh2022jt/202208/t20220823_27716284.html",
      },
    ],
    finalEyebrow: "Plan this route around you",
    finalTitle: "What would these four days look like on your dates?",
    finalBody:
      "Tell us the month, where you will arrive, how many are travelling, children's ages and the kind of stay you like. We can turn this route into a plan for your dates before payment is ever discussed.",
    finalCtaLabel: "Plan my Zhangjiajie trip",
  },
  zh: {
    htmlLang: "zh-Hans",
    metadataTitle: "张家界4天3晚私家游：森林公园、玻璃桥与天门山",
    metadataDescription:
      "4天3晚私家路线串联张家界国家森林公园、大峡谷玻璃桥与天门山，住宿可选，按真实日期核价。",
    previewLabel: "本地文章预览 · 尚未开放预订",
    skipLink: "跳到文章正文",
    breadcrumbLabel: "面包屑导航",
    homeLabel: "首页",
    previewBreadcrumb: "张家界四日行程",
    eyebrow: "4天 · 3晚 · 张家界私家路线",
    heroTitle: "张家界4天3晚：走进峰林、玻璃桥与天门山",
    heroLede:
      "4天3晚私家行程，游张家界国家森林公园、大峡谷玻璃桥和天门山。第1天只管抵达，第2–4天专心游览；预订前，我们会先核对最后一天的入场时段和你的返程时间。",
    secondaryCta: "先看四天怎么走",
    validThrough: "价格期：2026年9月6日至9月30日",
    checkingPrice: "已公布的参考价格",
    expiredPrice: "今天不在已公布的价格有效期内，请按实际出行日期重新询价。",
    fromLabel: "起价",
    regularLabel: "常规价",
    perPerson: "每人",
    featured: "起步选择",
    exactStayNote: "付款前，具体酒店、房型、早餐、房间数和能否预订，都会书面发给你确认。",
    heroImageCaption: "晨光越过张家界砂岩峰林，也是这套四日路线展开的尺度。",
    whyEyebrow: "为什么这样安排",
    whyTitle: "四天看见张家界，不把它赶成一张打卡表",
    whyIntro:
      "张家界不是一个观景台，而是峰林、峡谷、洞穴或湖面，再到天门山高处的一段连续变化。这个安排把森林公园留出完整一天，把大峡谷单独展开，也让抵达日不必匆忙；最后以天门山收尾，而不是把离开前一天塞成另一张景点清单。",
    benefits: [
      [
        "抵达日，先慢下来",
        "司机在机场或车站接你，送到酒店入住。第1天剩下的时间留给你休息，不把半天抵达日硬凑成游览日。",
      ],
      [
        "三天，三种山水层次",
        "森林公园、大峡谷与天门山各有自己的节奏，不压成一张含糊的‘精华景点’清单。",
      ],
      [
        "住宿决定旅途的质感",
        "路线不变，在市区便利、更宽敞的高级住宿与更有辨识度的山景住宿之间选择。",
      ],
      [
        "细节跟着真实日期走",
        "房型、车辆、门票和导游，都先按你们实际出行的人和日期匹配好，再正式预订。",
      ],
    ],
    routeEyebrow: "张家界4天3晚行程",
    routeTitle: "一天抵达，三天进入完全不同的山水",
    guideLabel: "计划安排导游",
    arrivalLabel: "抵达与私人接送",
    daySummaries: zhangjiajiePrivateTourDaySummaries.zh,
    staysEyebrow: "部分住宿选择",
    staysTitle: "山水之后，选择更适合你们的停留方式",
    staysIntro:
      "游览路线不变，变的是每天回到住处的感觉。下面三种住宿，从方便的市区酒店到更宽敞、更有特色的住处，挑一种最合心意的告诉我们。每组照片只来自同一家候选酒店，不会把不同酒店的房间照片拼在一起。",
    otherStaysTitle: "不只限于页面里的酒店",
    otherStaysBody:
      "页面仅展示部分住宿。如果都不合适，告诉我们你在意的风格、位置或房型，我们按你的日期再看看其他张家界酒店；路线不变，满意了再付款。",
    accommodationOptions: [
      {
        id: "city-candidate-01",
        label: "市区",
        name: "现代市区住宿",
        price: "市区住宿档",
        summary:
          "一组明亮、现代的市区住宿候选，现有两张双床房照片全部展示。窗外景观与准确房型仍按实际日期分配。",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-window.jpg",
            alt: "明亮的双床房与窗外景观",
            caption: "市区住宿 · 明亮的双床房",
            width: 1016,
            height: 782,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-entry.jpg",
            alt: "双床房、入口与洗漱区",
            caption: "市区候选01 · 双床房、入口与洗漱区参考",
            width: 830,
            height: 775,
          },
        ],
      },
      {
        id: "city-candidate-02",
        label: "市区候选02",
        name: "舒适市区住宿",
        price: "市区住宿档",
        summary:
          "4张候选照片展示双床房、大床房、特殊布置双床房与卫生间。气球、花饰及窗外景观属于拍摄示例，不是标准保证。",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-twin.jpg",
            alt: "第二组市区住宿中的双床房与窗外景观",
            caption: "市区候选02 · 双床房与窗景参考",
            width: 1206,
            height: 746,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-double.jpg",
            alt: "第二组市区住宿中的大床房",
            caption: "市区候选02 · 大床房参考",
            width: 1206,
            height: 788,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-twin-decorated.jpg",
            alt: "带特殊气球与毛巾布置的双床房",
            caption: "市区候选02 · 特殊双床房布置，并非标准包含",
            width: 1206,
            height: 785,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-bathroom.jpg",
            alt: "带淋浴与壁挂吹风机的卫生间",
            caption: "市区候选02 · 卫生间与淋浴设施参考",
            width: 1206,
            height: 788,
          },
        ],
      },
      {
        id: "premium-villa",
        label: "高级",
        name: "宽敞高级住宿",
        price: "宽敞高级住宿档",
        summary:
          "适合希望一天游览后仍能舒展下来、而不是只回房睡觉的旅客。候选素材展示客厅、双床房、大床房与露台；具体住宿和房间分配按日期确认。",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-living.jpg",
            alt: "高级住宿候选中的落地窗客厅",
            caption: "高级住宿 · 客厅",
            width: 1400,
            height: 1050,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-twin.jpg",
            alt: "高级住宿候选中通向花园一侧的双床房",
            caption: "高级住宿素材组 · 双床房参考",
            width: 1050,
            height: 1400,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-double.jpg",
            alt: "高级住宿候选中的大窗大床房",
            caption: "高级住宿素材组 · 大床房参考",
            width: 1400,
            height: 1050,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-terrace.jpg",
            alt: "高级住宿候选中的户外露台与草坪",
            caption: "高级住宿素材组 · 露台与草坪参考",
            width: 1400,
            height: 1050,
          },
        ],
      },
      {
        id: "signature-villa",
        label: "特色",
        name: "精品山景住宿",
        price: "精品山景住宿档",
        summary:
          "11张候选照片呈现景观餐厅、不同客房、卫浴与休息空间，让这一档住宿的气质更具体；但不代表所有设施、景观与布局都同时属于同一间可订客房。",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-terrace.jpg",
            alt: "玻璃围合的用餐区，桌椅旁可见绿树与远处山体",
            caption: "玻璃景观餐厅 · 座位和景色以当天为准",
            width: 1400,
            height: 1016,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-suite.jpg",
            alt: "宽敞的开放式客房内设一张床与多个休息座椅",
            caption: "大空间客房 · 面积和窗景因房而异",
            width: 1600,
            height: 1133,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-four-poster.jpg",
            alt: "带垂帘四柱床与窗边休息区的客房",
            caption: "四柱床客房参考 · 准确房型与床型待确认",
            width: 1600,
            height: 1102,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-fireplace-room.jpg",
            alt: "石材墙旁设嵌入式壁炉与床的客房，窗外可见绿植",
            caption: "壁炉客房 · 房型、窗景和壁炉能否使用，按你的日期确认",
            width: 1600,
            height: 1158,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-garden-lounge.jpg",
            alt: "室内休息椅朝向带树木与户外座椅的平台",
            caption: "室内外休息区 · 不含私人庭院或独享露台",
            width: 1600,
            height: 1182,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-bathtub.jpg",
            alt: "带独立浴缸、淋浴与坐便器的卫生间",
            caption: "浴缸卫生间 · 部分客房才有",
            width: 1600,
            height: 1113,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-red-room.jpg",
            alt: "以深红色床帘与织物装饰的四柱床客房",
            caption: "红色主题客房 · 具体房型和能否订到，按你的日期确认",
            width: 1600,
            height: 1199,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-colour-room.jpg",
            alt: "色彩丰富的客房内设一张床与休息椅，窗边可见山体",
            caption: "彩色主题客房 · 窗景、阳台和房型不一定与照片相同",
            width: 1600,
            height: 1159,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-vanity.jpg",
            alt: "客房内的开放式洗漱台，旁边可见床与窗外绿植",
            caption: "卧室与洗漱区 · 是否有隔断、对应哪种房型，按你的日期确认",
            width: 1600,
            height: 1099,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-shower.jpg",
            alt: "卫生间内设双盆洗漱台、开放式淋浴与坐便器",
            caption: "淋浴卫生间参考 · 具体房型配置仍待确认",
            width: 1600,
            height: 1199,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-lounge-detail.jpg",
            alt: "带花纹休息椅、陶罐与拱形灯带壁龛的休息区细节",
            caption: "室内陈设细节 · 可能与大空间客房来自同一单元",
            width: 1600,
            height: 1168,
          },
        ],
      },
    ],
    pricesEyebrow: "张家界4天3晚私家游价格",
    pricesTitle: "同一条路线，三种住宿质感",
    pricesIntro:
      "同一条四天路线，三种住法，选最适合你们的一种。参考价在标明的有效期内适用；房间能否预订、导游安排和最终总价，都会在预订前书面发给你确认。",
    tierDescriptions: {
      "selected-city-stay":
        "实用的市区住处，按你出行日期的可订情况，从两家市区候选酒店中匹配具体酒店和房型。",
      "spacious-premium-stay":
        "大家一起待的空间更多，独立房间的选择也更多；具体住处和分房按你的日期确认。",
      "distinctive-mountain-stay":
        "更有设计感和景观氛围，付款前为你匹配具体酒店和房型。",
    },
    faqEyebrow: "决定四天之前",
    faqTitle: "真正会改变行程的几个问题",
    faqItems: [
      [
        "四天够不够玩张家界？",
        "第一次来、只看重点的话，够了：第1天抵达，之后森林公园、大峡谷一带和天门山各留一天。想不赶路地把周边景点都看完，就得多留几天。",
      ],
      [
        "大峡谷玻璃桥和天门山玻璃栈道是同一个地方吗？",
        "不是。这是两个地方，分在不同的日子去：大峡谷玻璃桥在张家界大峡谷景区，玻璃栈道在天门山上。",
      ],
      [
        "住市区，还是选择更宽敞的住宿？",
        "最在意抵离方便，通常住市区更合适；想要晚上更放松、大家有地方一起待着，就选更宽敞的档位。最终还要看具体住处、游览顺序和离开地点，把你怎么来、怎么走告诉我们。",
      ],
      [
        "天门山能不能放在飞机或火车前？",
        "有时可以，要看时间。我们会把能订到的天门山线路、入场时段和你的航班或火车放在一起看，只有留得出安全余量时才安排在同一天。如果只订到较晚的票，或返程较早，同样的安排就不一定可行。",
      ],
      [
        "这里安排私家行程的价值是什么？",
        "天气和排队我们控制不了。我们做的是把每一天串顺：正确的入口、专车、行李、门票线路和你们的节奏；景区运营有变化时，我们会重新调整顺序。",
      ],
    ],
    scopeEyebrow: "私家游价格覆盖什么",
    scopeTitle: "包含什么、不包含什么，一目了然",
    plannedTitle: "报价包含",
    plannedItems: [
      "当地私人车辆与约定范围内的抵达、离开接送",
      "两天私人英语导游服务",
      "所选住宿档位的3晚住宿",
      "确认单中逐项列明的成人门票与标准景交",
      "不安排购物店；任何升级或新增服务都须在收费前由你确认",
    ],
    excludedTitle: "基础价不含",
    excludedItems: [
      "往返张家界的大交通",
      "午晚餐与个人消费；早餐随住宿方案确认",
      "VIP通道、高空弹跳、滑索、演出等自选项目",
      "单房、儿童与车型升级差价",
      "客人在本国购买的综合旅行保险",
    ],
    confirmationNote:
      "付款前，书面确认单会写清楚包含哪些项目、每一部分由谁提供，以及因你的出行日期而不同的地方。",
    paymentEyebrow: "预订流程",
    paymentTitle: "三步走，付款前先看到完整方案",
    paymentSteps: [
      [
        "01",
        "说说你的旅行计划",
        "发来日期、抵达地点、成人和儿童人数、喜欢的住宿，以及怎么离开。",
      ],
      [
        "02",
        "我们按日期核对",
        "按你的实际日期，核对具体房型、早餐、车辆、门票和导游安排。",
      ],
      [
        "03",
        "查看一份清楚的方案",
        "总价、具体包含内容、由谁提供，以及你的日期对应的预订条件，都会书面发给你，看完再决定。",
      ],
    ],
    sourcesTitle: "官方路线与目的地资料",
    sources: [
      {
        label: "武陵源风景名胜区世界遗产资料",
        publisher: "联合国教科文组织世界遗产中心",
        url: "https://whc.unesco.org/en/list/640/",
      },
      {
        label: "张家界世界地质公园二日游路线",
        publisher: "张家界世界地质公园",
        url: "https://zhangjiajieuggp.org.cn/html/2026/2026032620135033852.html",
      },
      {
        label: "张家界世界地质公园三日游路线",
        publisher: "张家界世界地质公园",
        url: "https://zhangjiajieuggp.org.cn/html/2026/2026032620161311924.html",
      },
      {
        label: "天门山景区交通参考",
        publisher: "湖南省文化和旅游厅",
        url: "https://whhlyt.hunan.gov.cn/whhlyt/wldh2022jt/202208/t20220823_27716284.html",
      },
    ],
    finalEyebrow: "把路线放进真实日期",
    finalTitle: "这四天，放进你的行程会是什么样？",
    finalBody:
      "告诉我们出行月份、在哪里抵达、几个人、孩子年龄，以及喜欢什么样的住处。我们先把这条路线做成适合你日期的方案，再谈付款。",
    finalCtaLabel: "规划我的张家界之行",
  },
  ko: {
    htmlLang: "ko",
    metadataTitle: "장가계(장자제) 3박 4일 프라이빗 투어: 가격·포함 사항",
    metadataDescription:
      "장가계 국가삼림공원, 대협곡 유리다리와 천문산을 잇는 3박 4일 프라이빗 일정입니다. 숙소 선택과 실제 날짜를 확인한 서면 견적을 안내합니다.",
    previewLabel: "로컬 편집 미리보기 · 현재 예약 불가",
    skipLink: "본문으로 바로가기",
    breadcrumbLabel: "현재 위치",
    homeLabel: "홈",
    previewBreadcrumb: "장가계 4일 일정",
    eyebrow: "4일 · 3박 · 장가계 프라이빗 일정",
    heroTitle: "장가계 4일 3박: 사암 봉우리와 유리다리, 천문산",
    heroLede:
      "장가계 국가삼림공원, 대협곡 유리다리, 천문산을 둘러보는 3박 4일 프라이빗 투어입니다. 1일 차는 도착하는 날, 2~4일 차는 관광에 집중하는 날입니다. 예약 전에 마지막 날 입장 시간과 출발 시각을 함께 확인해 드립니다.",
    secondaryCta: "4일 일정부터 보기",
    validThrough: "가격 적용 기간: 2026년 9월 6일–9월 30일",
    checkingPrice: "공개된 참고 가격",
    expiredPrice:
      "오늘은 공개된 가격의 적용 기간에 해당하지 않습니다. 여행 날짜에 맞는 새 견적을 요청해 주세요.",
    fromLabel: "최저",
    regularLabel: "일반가",
    perPerson: "1인 기준",
    featured: "기본 옵션",
    exactStayNote:
      "결제 전에 정확한 숙소, 객실 유형, 조식, 객실 수와 예약 가능 여부를 서면으로 보내 드립니다.",
    heroImageCaption:
      "아침 햇살이 비치는 장가계의 사암 봉우리. 이 4일 일정이 다루는 풍경의 규모를 보여 줍니다.",
    whyEyebrow: "이렇게 구성한 이유",
    whyTitle: "장가계를 체크리스트처럼 쫓아다니지 않는 4일",
    whyIntro:
      "장가계는 전망대 하나로 끝나는 곳이 아닙니다. 사암 봉우리와 협곡을 건너는 유리다리, 동굴 또는 호수 풍경, 그리고 천문산 고지대가 차례로 이어집니다. 국가삼림공원에는 하루를 온전히 쓰고, 대협곡은 별도의 날로 두며, 천문산으로 여행을 마무리합니다.",
    benefits: [
      [
        "서두르지 않는 도착일",
        "기사가 공항이나 기차역에서 맞이해 숙소까지 모셔다 드립니다. 반나절뿐인 도착일을 관광으로 채우지 않고, 남은 시간은 편히 쉬시도록 비워 둡니다.",
      ],
      [
        "세 날에 나누어 만나는 세 풍경",
        "국가삼림공원, 대협곡과 천문산을 하나의 막연한 명소 목록에 몰아넣지 않고 각각의 흐름으로 둘러봅니다.",
      ],
      [
        "저녁의 분위기를 바꾸는 숙소",
        "관광 동선은 유지하면서 시내의 편리함, 더 넉넉한 공간 또는 개성 있는 산악 분위기 중에서 고릅니다.",
      ],
      [
        "실제 날짜에 맞추는 세부사항",
        "객실, 차량, 입장권과 가이드를 실제 인원과 날짜에 맞춘 뒤에 예약을 진행합니다.",
      ],
    ],
    routeEyebrow: "장가계 4일 3박 일정",
    routeTitle: "도착하는 하루, 서로 다른 풍경으로 이어지는 사흘",
    guideLabel: "가이드 동행 관광",
    arrivalLabel: "도착 및 전용 차량 이동",
    daySummaries: zhangjiajiePrivateTourDaySummaries.ko,
    staysEyebrow: "숙소 선택 예시",
    staysTitle: "산을 내려온 뒤의 분위기까지 고르세요",
    staysIntro:
      "관광 동선은 같고, 달라지는 건 하루를 마친 뒤 머무는 분위기입니다. 편리한 시내 숙소부터 더 넓거나 개성 있는 숙소까지, 세 가지 중 마음에 드는 쪽을 알려 주세요. 각 사진 묶음은 후보 숙소 한 곳의 사진이며, 다른 숙소의 객실을 섞어 보여 드리지 않습니다.",
    otherStaysTitle: "화면에 보이는 숙소만 선택할 필요는 없습니다",
    otherStaysBody:
      "사진 속 숙소는 마련할 수 있는 곳 중 일부입니다. 마음에 드는 곳이 없다면 원하는 스타일, 위치, 객실 구성을 알려 주세요. 여행 날짜에 맞는 다른 장가계 숙소도 알아봐 드리니, 일정은 그대로 두고 결제 전에 숙소를 정하시면 됩니다.",
    accommodationOptions: [
      {
        id: "city-candidate-01",
        label: "시내 숙소",
        name: "모던한 시내 숙소",
        price: "시내 숙소 등급",
        summary:
          "밝고 현대적인 분위기의 시내 후보 숙소입니다. 현재 확보한 두 장의 트윈룸 사진을 모두 보여 줍니다. 창밖 전망과 정확한 객실은 실제 날짜의 배정 결과에 따릅니다.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-window.jpg",
            alt: "침대 두 개와 창밖 전망이 보이는 밝은 트윈룸",
            caption: "시내 숙소 · 밝은 트윈룸",
            width: 1016,
            height: 782,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-entry.jpg",
            alt: "입구와 세면 공간이 함께 보이는 트윈룸",
            caption: "시내 후보 01 · 트윈룸, 입구와 세면 공간 참고",
            width: 830,
            height: 775,
          },
        ],
      },
      {
        id: "city-candidate-02",
        label: "시내 후보 02",
        name: "편안한 시내 숙소",
        price: "시내 숙소 등급",
        summary:
          "후보 사진 4장으로 트윈룸과 더블룸, 특별히 꾸민 트윈룸과 욕실을 보여 줍니다. 풍선, 꽃 장식과 창밖 전망은 촬영 당시의 예시이며 기본 제공을 보장하지 않습니다.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-twin.jpg",
            alt: "두 번째 시내 후보 숙소의 트윈룸과 창밖 전망",
            caption: "시내 후보 02 · 트윈룸과 창밖 전망 참고",
            width: 1206,
            height: 746,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-double.jpg",
            alt: "두 번째 시내 후보 숙소의 더블룸",
            caption: "시내 후보 02 · 더블룸 참고",
            width: 1206,
            height: 788,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-twin-decorated.jpg",
            alt: "풍선과 수건으로 특별히 꾸민 트윈룸",
            caption: "시내 후보 02 · 특별 연출 예시, 기본 포함 아님",
            width: 1206,
            height: 785,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-bathroom.jpg",
            alt: "샤워 공간과 벽걸이형 헤어드라이어가 있는 욕실",
            caption: "시내 후보 02 · 욕실과 샤워 시설 참고",
            width: 1206,
            height: 788,
          },
        ],
      },
      {
        id: "premium-villa",
        label: "프리미엄 숙소",
        name: "넉넉한 프리미엄 숙소",
        price: "넉넉한 프리미엄 등급",
        summary:
          "하루 관광을 마친 뒤 단순히 잠만 자는 곳보다 넉넉한 공간을 원하는 여행자에게 맞는 후보입니다. 거실, 트윈룸, 더블룸과 테라스를 보여 주며, 정확한 숙소와 객실 배정은 날짜별로 확인합니다.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-living.jpg",
            alt: "통창으로 햇빛이 드는 프리미엄 숙소 거실",
            caption: "프리미엄 숙소 · 거실",
            width: 1400,
            height: 1050,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-twin.jpg",
            alt: "정원 쪽으로 열린 프리미엄 숙소의 트윈 침실",
            caption: "프리미엄 숙소 자료 · 트윈 침실 참고",
            width: 1050,
            height: 1400,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-double.jpg",
            alt: "큰 창이 있는 프리미엄 숙소의 더블 침실",
            caption: "프리미엄 숙소 자료 · 더블 침실 참고",
            width: 1400,
            height: 1050,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-terrace.jpg",
            alt: "프리미엄 숙소의 야외 데크와 잔디 공간",
            caption: "프리미엄 숙소 자료 · 데크와 잔디 공간 참고",
            width: 1400,
            height: 1050,
          },
        ],
      },
      {
        id: "signature-villa",
        label: "개성 있는 숙소",
        name: "특색 있는 산악 숙소",
        price: "특색 있는 산악 숙소 등급",
        summary:
          "다이닝 테라스, 여러 객실 유형, 욕실과 조용한 라운지 공간을 후보 사진 11장으로 보여 줍니다. 이 사진들은 숙소의 전체 분위기를 전달하지만, 모든 시설과 전망, 구조가 한 객실에 함께 제공된다는 뜻은 아닙니다.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-terrace.jpg",
            alt: "유리로 둘러싸인 식사 공간 너머로 나무와 먼 산이 보이는 모습",
            caption: "유리 다이닝 테라스 · 자리와 풍경은 당일 상황에 따라 다름",
            width: 1400,
            height: 1016,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-suite.jpg",
            alt: "침대 하나와 여러 라운지 의자가 놓인 넓은 오픈형 객실",
            caption: "넓은 객실 · 객실 등급, 면적과 전망은 방마다 다름",
            width: 1600,
            height: 1133,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-four-poster.jpg",
            alt: "캐노피 침대와 창가 휴식 공간이 있는 객실",
            caption: "캐노피 객실 참고 · 정확한 객실과 침대 유형은 미확정",
            width: 1600,
            height: 1102,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-fireplace-room.jpg",
            alt: "침대와 벽난로, 창밖의 녹지가 보이는 객실",
            caption:
              "벽난로 객실 · 객실 유형, 전망, 벽난로 사용 여부는 여행 날짜에 맞춰 확인",
            width: 1600,
            height: 1158,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-garden-lounge.jpg",
            alt: "나무가 있는 야외 좌석 쪽을 바라보는 실내 라운지 의자",
            caption:
              "실내외 라운지 · 전용 정원이나 단독 사용은 포함되지 않음",
            width: 1600,
            height: 1182,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-bathtub.jpg",
            alt: "독립형 욕조, 샤워 공간과 변기가 있는 욕실",
            caption:
              "욕조가 있는 욕실 · 일부 객실에만 있음",
            width: 1600,
            height: 1113,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-red-room.jpg",
            alt: "짙은 붉은색 커튼과 패턴 직물로 꾸민 캐노피 객실",
            caption:
              "붉은색 테마 객실 · 객실 등급과 예약 가능 여부는 여행 날짜에 맞춰 확인",
            width: 1600,
            height: 1199,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-colour-room.jpg",
            alt: "침대와 라운지 의자, 창밖 산이 보이는 색감 있는 객실",
            caption:
              "색감 있는 객실 · 전망, 발코니, 객실 유형은 사진과 다를 수 있음",
            width: 1600,
            height: 1159,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-vanity.jpg",
            alt: "침대 옆 개방형 세면 공간과 창밖 녹지가 보이는 객실",
            caption:
              "침실과 세면 공간 · 칸막이 여부와 해당 객실 유형은 여행 날짜에 맞춰 확인",
            width: 1600,
            height: 1099,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-shower.jpg",
            alt: "두 개의 세면대, 개방형 샤워 공간과 변기가 있는 욕실",
            caption: "샤워 욕실 참고 · 객실별 정확한 구성은 미확정",
            width: 1600,
            height: 1199,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-lounge-detail.jpg",
            alt: "패턴 의자, 도자기 장식과 조명이 켜진 아치형 벽감",
            caption:
              "실내 장식 참고 · 넓은 객실과 같은 공간에서 촬영된 것으로 보임",
            width: 1600,
            height: 1168,
          },
        ],
      },
    ],
    pricesEyebrow: "장가계 4일 3박 프라이빗 여행 가격",
    pricesTitle: "같은 일정, 세 가지 숙소 선택",
    pricesIntro:
      "4일 일정은 같고 숙소만 세 가지로 나뉩니다. 일행에게 맞는 쪽을 고르세요. 참고 요금은 표시된 기간에 적용되며, 객실 예약 가능 여부와 가이드 일정, 최종 총액은 예약 전에 서면으로 보내 드립니다.",
    tierDescriptions: {
      "selected-city-stay":
        "여행 날짜에 예약 가능한 숙소와 객실 중에서 고르는 실용적인 시내 숙소입니다.",
      "spacious-premium-stay":
        "함께 쓰는 공간도, 각자의 객실도 더 넉넉합니다. 정확한 숙소와 객실 배정은 여행 날짜에 맞춰 확인해 드립니다.",
      "distinctive-mountain-stay":
        "디자인과 산속 분위기가 더 돋보이는 숙소입니다. 정확한 숙소와 객실은 결제 전에 맞춰 드립니다.",
    },
    faqEyebrow: "4일을 선택하기 전에",
    faqTitle: "실제로 일정을 바꾸는 질문",
    faqItems: [
      [
        "장가계 여행에 4일이면 충분한가요?",
        "첫 방문으로 핵심을 보기에는 충분합니다. 1일 차는 도착, 2·3일 차는 국가삼림공원과 대협곡 일대, 4일 차는 출발 시간이 허락하는 범위에서 천문산을 둘러봅니다. 주변 명소까지 여유 있게 보려면 일정이 더 필요합니다.",
      ],
      [
        "장가계 대협곡 유리다리와 천문산 유리잔도는 같은 곳인가요?",
        "아닙니다. 서로 다른 날 가는 별개의 장소입니다. 대협곡 유리다리는 장가계 대협곡에, 유리잔도는 천문산에 있습니다.",
      ],
      [
        "시내 숙소와 더 넉넉한 숙소 중 무엇을 고를까요?",
        "도착과 출발이 편한 게 가장 중요하다면 대체로 시내 숙소가, 저녁을 여유롭게 함께 보내고 싶다면 더 넉넉한 등급이 잘 맞습니다. 다만 가장 좋은 선택은 실제 숙소, 관광 순서, 출발 지점에 따라 달라지니 도착·출발 계획을 알려 주세요.",
      ],
      [
        "비행기나 기차를 타기 전에 천문산을 둘러볼 수 있나요?",
        "시간이 맞으면 가능한 경우도 있습니다. 예약 가능한 천문산 코스와 입장 시간, 항공편·열차 시간을 함께 보고, 충분한 여유가 있을 때만 같은 날로 잡습니다. 입장 시간이 늦거나 출발편이 이르면 같은 계획이 어려울 수 있습니다.",
      ],
      [
        "장가계에서 프라이빗 일정의 가치는 무엇인가요?",
        "날씨와 대기 줄은 저희도 어떻게 할 수 없습니다. 대신 알맞은 입구, 전용 차량, 짐, 입장권 코스, 일행의 속도를 하루 흐름에 맞게 이어 드리고, 운영 상황이 바뀌면 순서를 다시 조정합니다.",
      ],
    ],
    scopeEyebrow: "프라이빗 여행 가격의 범위",
    scopeTitle:
      "포함과 불포함을 한눈에",
    plannedTitle: "견적에 포함",
    plannedItems: [
      "현지 전용 차량과 합의된 범위의 도착·출발 이동",
      "이틀간의 전담 영어 가이드 서비스",
      "선택한 숙소 등급의 3박",
      "확인서에 명시한 성인 입장권과 기본 관광지 내 교통",
      "쇼핑 일정 없음; 선택 업그레이드나 추가 서비스는 비용 청구 전에 동의를 받음",
    ],
    excludedTitle: "기본 요금 불포함",
    excludedItems: [
      "장가계까지 오고 가는 교통편",
      "중식·석식과 개인 경비; 조식은 숙소와 함께 확인",
      "VIP 통로, 번지점프, 집라인, 공연 등 선택 활동",
      "1인실, 어린이 요금과 차량 업그레이드에 따른 차액",
      "여행자가 거주국에서 구입하는 종합 여행자보험",
    ],
    confirmationNote:
      "결제 전 서면 확인서에 정확한 포함 항목, 각 서비스를 제공하는 곳, 날짜에 따라 달라지는 점을 적어 드립니다.",
    paymentEyebrow: "예약은 이렇게 진행됩니다",
    paymentTitle: "세 단계, 결제 전에 전체 계획을 먼저 확인하세요",
    paymentSteps: [
      [
        "01",
        "여행 조건 알려 주기",
        "날짜, 도착 장소, 성인과 어린이 수, 원하는 숙소, 출발 계획을 알려 주세요.",
      ],
      [
        "02",
        "날짜에 맞춰 확인",
        "실제 날짜 기준으로 객실 유형, 조식, 차량, 입장권, 가이드를 확인합니다.",
      ],
      [
        "03",
        "한눈에 보이는 계획 받기",
        "총액, 정확한 포함 범위, 서비스 제공자, 해당 날짜의 예약 조건을 서면으로 받아 보시고 진행 여부를 정하세요.",
      ],
    ],
    sourcesTitle: "공식 동선 및 목적지 자료",
    sources: [
      {
        label: "무릉원 풍경명승구",
        publisher: "유네스코 세계유산센터",
        url: "https://whc.unesco.org/en/list/640/",
      },
      {
        label: "장가계 세계지질공원 2일 코스",
        publisher: "장가계 유네스코 세계지질공원",
        url: "https://zhangjiajieuggp.org.cn/html/2026/2026032620135033852.html",
      },
      {
        label: "장가계 세계지질공원 3일 코스",
        publisher: "장가계 유네스코 세계지질공원",
        url: "https://zhangjiajieuggp.org.cn/html/2026/2026032620161311924.html",
      },
      {
        label: "천문산 방문객 교통 자료",
        publisher: "후난성 문화관광청",
        url: "https://whhlyt.hunan.gov.cn/whhlyt/wldh2022jt/202208/t20220823_27716284.html",
      },
    ],
    finalEyebrow: "실제 일정에 맞춰 조정하기",
    finalTitle: "내 여행 날짜에 이 4일을 넣으면 어떻게 될까요?",
    finalBody:
      "여행하실 달, 도착 장소, 인원, 어린이 나이, 원하는 숙소 분위기를 알려 주세요. 결제 이야기에 앞서, 이 일정을 고객님의 여행 날짜에 맞춘 계획으로 먼저 만들어 드립니다.",
    finalCtaLabel: "내 장가계 여행 계획하기",
  },
} as const;

export function getZhangjiajiePrivateTourPublicPricing(
  locale: ProductPreviewLocale,
) {
  const copy = productPreviewCopy[locale];
  const dateFormatter = new Intl.DateTimeFormat(
    { en: "en-GB", zh: "zh-CN", ko: "ko-KR" }[locale],
    { year: "numeric", month: "short", day: "numeric", timeZone: "Asia/Shanghai" },
  );
  const basis = pricing.basis;

  return {
    validFrom: pricing.valid_from,
    validUntil: pricing.valid_until,
    validFromLabel: dateFormatter.format(new Date(`${pricing.valid_from}T00:00:00+08:00`)),
    validUntilLabel: dateFormatter.format(new Date(pricing.valid_until)),
    timeZoneLabel: { en: "China time (UTC+8)", zh: "中国时间（UTC+8）", ko: "중국 시간 (UTC+8)" }[locale],
    referenceNote: {
      en: "Published prices for the dates shown, provided as a reference. Current availability and your final quote must be confirmed.",
      zh: "以下为所示有效期内已公布的参考价格，不代表当前可订。可订状态与最终报价需另行确认。",
      ko: "표시된 적용 기간의 공개 가격이며 참고용입니다. 현재 예약 가능 여부와 최종 견적은 별도로 확인해야 합니다.",
    }[locale],
    basisLabel: {
      en: `Per person · minimum ${basis.minimum_adults} adults · ${basis.duration_days} days / ${basis.nights} nights · two adults sharing one room`,
      zh: `每人价格 · 至少${basis.minimum_adults}位成人 · ${basis.duration_days}天${basis.nights}晚 · 两位成人同住一间房`,
      ko: `1인 기준 · 성인 ${basis.minimum_adults}명 이상 · ${basis.nights}박 ${basis.duration_days}일 · 성인 2명 1실 기준`,
    }[locale],
    guideLanguageNote: {
      en: "The price includes two days of English-speaking guide service.",
      zh: "价格已含两天英文导游服务。",
      ko: "요금에 이틀간의 영어 가이드 서비스가 포함되어 있습니다.",
    }[locale],
    publicNote: {
      en: pricing.public_notes.en,
      zh: pricing.public_notes["zh-CN"],
      ko: pricing.public_notes.ko,
    }[locale],
    tiers: pricing.tiers.map((tier) => ({
      id: tier.tier_id,
      name: {
        en: tier.name_en,
        zh: tier.name_zh,
        ko: tier.name_ko,
      }[locale],
      description:
        copy.tierDescriptions[
          tier.tier_id as keyof typeof copy.tierDescriptions
        ],
      ...(tier.featured ? { featured: true } : { featured: false }),
      formattedPrice: formatPrivateTourPrice(
        "from_price_per_person" in tier ? tier.from_price_per_person : tier.price_per_person,
        locale,
      ).formatted,
      ...("from_price_per_person" in tier
        ? { fromPrice: tier.from_price_per_person }
        : {}),
      ...("price_per_person" in tier ? { price: tier.price_per_person } : {}),
      ...("regular_price_per_person" in tier
        ? {
            regularPrice: tier.regular_price_per_person,
            formattedRegularPrice: formatPrivateTourPrice(tier.regular_price_per_person, locale).formatted,
          }
        : {}),
    })),
  };
}
