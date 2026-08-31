import product from "../content/product-previews/zhangjiajie-4-day-private-tour/product.json";
import pricing from "../content/product-previews/zhangjiajie-4-day-private-tour/pricing.json";

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
      "Four carefully paced days through Zhangjiajie's sandstone peaks, the Grand Canyon Glass Bridge and Tianmen Mountain—with an unhurried arrival, three distinct sightseeing days and a stay that can change the mood of the journey.",
    secondaryCta: "Start with the four-day route",
    validThrough: "Price window: 15 August–30 September 2026",
    checkingPrice: "Checking the current price window…",
    expiredPrice:
      "The fixed-price window has ended. Ask for a fresh quote before relying on these figures.",
    fromLabel: "From",
    regularLabel: "Regular",
    perPerson: "per person",
    featured: "Starting option",
    exactStayNote:
      "The exact property, room, breakfast, room count and availability are confirmed in writing before payment.",
    heroImageCaption:
      "Morning light across Zhangjiajie's sandstone pillars—the scale this four-day route is built around.",
    whyEyebrow: "Why this route works",
    whyTitle: "Four days, without turning Zhangjiajie into a race",
    whyIntro:
      "Zhangjiajie is not one viewpoint. It is a journey through sandstone pillars, a canyon crossing, cave or lake scenery, and the high slopes of Tianmen Mountain. This route gives the National Forest Park its own full day, keeps the Grand Canyon separate and lets the final mountain feel like a finale—not one more stop forced into a crowded list.",
    benefits: [
      [
        "A gentle arrival",
        "Meet at the airport or railway station, settle into the confirmed stay and keep the rest of Day 1 open rather than pretending it is a full sightseeing day.",
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
        "Rooms, vehicle, tickets and guide language are matched to the people travelling before the plan becomes a booking.",
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
      "The sightseeing route stays the same while the atmosphere after each day can change. These three stay selections show a range from city convenience to more spacious or distinctive stays, so you can tell us what feels right. Every photograph remains with its own candidate property; rooms from different hotels are never blended into one promise.",
    otherStaysTitle: "Not limited to the stays shown here",
    otherStaysBody:
      "These photographs show only part of the hotel selection we can arrange. If none fits your preferred style, location or room setup, tell us what matters most. We can screen other Zhangjiajie hotels for your dates, so you can keep the four-day route you like and confirm a better fit before payment.",
    accommodationOptions: [
      {
        id: "city-candidate-01",
        label: "City candidate 01",
        name: "Modern City Stay",
        price: "City-stay tier",
        summary:
          "A bright, contemporary city candidate shown through both available twin-room photographs. The window outlook and exact room remain subject to the date-specific assignment.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-window.jpg",
            alt: "Bright twin room with two beds and a window outlook",
            caption: "City candidate 01 · twin room and window reference",
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
        label: "Premium stay option",
        name: "Spacious Premium Stay",
        price: "Spacious premium tier",
        summary:
          "For travellers who want the evening to feel spacious rather than merely functional. This candidate set shows the living room, twin room, double room and terrace; the exact accommodation and room allocation are confirmed for the dates.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-living.jpg",
            alt: "Sunlit living room with full-height windows in the premium-stay set",
            caption: "Premium-stay material set · living-room reference",
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
        label: "Signature stay reference",
        name: "Distinctive Mountain Stay",
        price: "Distinctive mountain tier",
        summary:
          "Eleven candidate views show the dining terrace, several room styles, bathrooms and quiet lounge spaces. Together they convey the character of this more distinctive stay; they do not promise that every feature, view or layout belongs to one bookable room.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-terrace.jpg",
            alt: "Glass-enclosed dining area with trees and distant mountains in the signature-stay candidate set",
            caption:
              "Dining-terrace reference · the view and space assignment are not guaranteed",
            width: 1400,
            height: 1016,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-suite.jpg",
            alt: "Spacious open-plan guest room with one bed and several lounge chairs",
            caption:
              "Large-room reference · exact category, size and outlook remain unconfirmed",
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
              "Fireplace-room reference · operation, room category and outlook require confirmation",
            width: 1600,
            height: 1158,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-garden-lounge.jpg",
            alt: "Indoor lounge chair facing a tree-lined outdoor seating area",
            caption:
              "Indoor-outdoor lounge reference · private or exclusive use is not promised",
            width: 1600,
            height: 1182,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-bathtub.jpg",
            alt: "Bathroom with a freestanding bathtub, shower and toilet",
            caption:
              "Bathtub-bathroom reference · shown configuration is not available in every room",
            width: 1600,
            height: 1113,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-red-room.jpg",
            alt: "Guest room with a four-poster bed, deep-red drapes and patterned textiles",
            caption:
              "Red-themed room reference · exact category and availability remain unconfirmed",
            width: 1600,
            height: 1199,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-colour-room.jpg",
            alt: "Colourful guest room with one bed, lounge seating and mountains visible through the window",
            caption:
              "Colourful-room reference · outlook, balcony and room category are not guaranteed",
            width: 1600,
            height: 1159,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-vanity.jpg",
            alt: "Open vanity area beside a bed, with greenery visible through the window",
            caption:
              "Bedroom-and-vanity layout reference · partition and room mapping need confirmation",
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
      "The current price cards below are checked against their dated validity window. When that window ends, the page will ask you to request a fresh quote; the core sightseeing structure remains the same.",
    tierDescriptions: {
      "selected-city-stay":
        "A practical city base matched from the properties and rooms available for the actual dates.",
      "spacious-premium-stay":
        "More shared and private-room space in the premium stay, subject to exact accommodation and room allocation.",
      "distinctive-mountain-stay":
        "A more distinctive design-and-view setting, with the exact property and room matched before payment.",
    },
    faqEyebrow: "Before you choose four days",
    faqTitle: "The questions that change the itinerary",
    faqItems: [
      [
        "Is four days enough for Zhangjiajie?",
        "It is enough for a focused first trip when Day 1 is arrival and Days 2–4 are protected for the Forest Park, Grand Canyon area and Tianmen Mountain. It is not enough to see every nearby attraction without rushing.",
      ],
      [
        "Are the Grand Canyon Glass Bridge and Tianmen glass walkway the same?",
        "No. The Grand Canyon Glass Bridge is in the Zhangjiajie Grand Canyon area; Tianmen Mountain's glass walkways belong to a separate mountain visit on a different day.",
      ],
      [
        "Should I stay in the city or choose a more spacious setting?",
        "A city stay usually prioritizes practical arrivals and departures. A more spacious tier changes the evening atmosphere and shared space. The best choice still depends on the confirmed accommodation, route order and departure point.",
      ],
      [
        "Can Tianmen Mountain fit before my flight or train?",
        "Sometimes, but only when the available ticket route, entry time and departure leave a safe buffer. A late ticket or early departure can make the same plan unrealistic.",
      ],
      [
        "What is the value of a private plan here?",
        "Not a promise to control weather or queues. Its value is joining the correct entrances, private transport, luggage, ticket routes and traveller pace into one workable day, then adjusting the order when operations change.",
      ],
    ],
    scopeEyebrow: "What the private-tour price covers",
    scopeTitle:
      "The route should feel effortless because the hard parts are visible",
    plannedTitle: "Designed into the quote",
    plannedItems: [
      "Private local transport and agreed arrival and departure transfers",
      "Private guide on sightseeing Days 2–4",
      "Three nights in the selected accommodation tier",
      "Adult admission and standard scenic transport named in the confirmation",
      "No shopping stops; optional upgrades or added services require your agreement before they are charged",
    ],
    excludedTitle: "Kept outside the base price",
    excludedItems: [
      "Travel to and from Zhangjiajie",
      "Meals and personal spending",
      "VIP access, bungee jumping, zip lines, shows and other optional activities",
      "Single-room, child, guide-language and vehicle-upgrade differences",
      "Comprehensive travel insurance bought in the traveller's home country",
    ],
    confirmationNote:
      "Exact inclusions, operators and any date-specific differences are listed in the written confirmation before payment.",
    paymentEyebrow: "From a beautiful idea to a bookable journey",
    paymentTitle: "The details should become clearer—not more complicated",
    paymentSteps: [
      [
        "01",
        "Share the shape of the trip",
        "Send the dates, arrival point, adults and children, preferred stay and departure plan.",
      ],
      [
        "02",
        "Match the moving pieces",
        "Check the exact room, breakfast, vehicle, tickets and guide language against the real dates.",
      ],
      [
        "03",
        "Review one clear plan",
        "Receive the total price, exact scope, operator and date-specific booking conditions in writing before deciding whether to continue.",
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
      "Share the month, arrival point, number of travellers, children's ages and the kind of stay you want. Homeground can turn the route into one date-specific plan before payment is ever discussed.",
    finalCtaLabel: "Plan Zhangjiajie with Homeground",
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
      "用四天走进张家界最有层次的三种风景：砂岩峰林、大峡谷玻璃桥与天门山；抵达日不赶路，三天游览各有自己的高潮，住宿也成为旅程气质的一部分。",
    secondaryCta: "先看四天怎么走",
    validThrough: "价格期：2026年8月15日至9月30日",
    checkingPrice: "正在核对当前价格有效期…",
    expiredPrice: "固定价格有效期已结束，请在参考这些数字前重新询价。",
    fromLabel: "起价",
    regularLabel: "常规价",
    perPerson: "每人",
    featured: "起步选择",
    exactStayNote: "具体物业、房型、早餐、房间数与库存，付款前以书面确认为准。",
    heroImageCaption: "晨光越过张家界砂岩峰林，也是这套四日路线展开的尺度。",
    whyEyebrow: "为什么这样安排",
    whyTitle: "四天看见张家界，不把它赶成一张打卡表",
    whyIntro:
      "张家界不是一个观景台，而是峰林、峡谷、洞穴或湖面，再到天门山高处的一段连续变化。这个安排把森林公园留出完整一天，把大峡谷单独展开，也让抵达日不必匆忙；最后以天门山收尾，而不是把离开前一天塞成另一张景点清单。",
    benefits: [
      [
        "抵达日，先慢下来",
        "机场或车站接站后入住已确认住宿，不把半个抵达日包装成完整游览日。",
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
        "房型、车辆、门票与导游语种按真正出行的人和日期匹配，再把计划变成订单。",
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
      "核心路线不变，每天回到住宿后的感受可以不同。下面三组住宿选择展示从市区便利到更宽敞、更有辨识度的方向，方便你告诉我们更喜欢哪一种；每组照片只属于对应候选酒店，不把不同酒店和房型拼在一起。",
    otherStaysTitle: "不只限于页面里的酒店",
    otherStaysBody:
      "页面仅展示部分住宿。如果这些酒店不合适，我们可按你的风格、位置和房型偏好继续匹配，确认满意后再付款。",
    accommodationOptions: [
      {
        id: "city-candidate-01",
        label: "市区候选01",
        name: "现代市区住宿",
        price: "市区住宿档",
        summary:
          "一组明亮、现代的市区住宿候选，现有两张双床房照片全部展示。窗外景观与准确房型仍按实际日期分配。",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-window.jpg",
            alt: "明亮的双床房与窗外景观",
            caption: "市区候选01 · 双床房与窗景参考",
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
        label: "高级住宿选择",
        name: "宽敞高级住宿",
        price: "宽敞高级住宿档",
        summary:
          "适合希望一天游览后仍能舒展下来、而不是只回房睡觉的旅客。候选素材展示客厅、双床房、大床房与露台；具体住宿和房间分配按日期确认。",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-living.jpg",
            alt: "高级住宿候选中的落地窗客厅",
            caption: "高级住宿素材组 · 客厅参考",
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
        label: "精品住宿参考",
        name: "精品山景住宿",
        price: "精品山景住宿档",
        summary:
          "11张候选照片呈现景观餐厅、不同客房、卫浴与休息空间，让这一档住宿的气质更具体；但不代表所有设施、景观与布局都同时属于同一间可订客房。",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-terrace.jpg",
            alt: "玻璃围合的用餐区，桌椅旁可见绿树与远处山体",
            caption: "景观餐厅参考 · 实际景观与空间归属不作保证",
            width: 1400,
            height: 1016,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-suite.jpg",
            alt: "宽敞的开放式客房内设一张床与多个休息座椅",
            caption: "大空间客房参考 · 准确房型、面积与窗景待确认",
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
            caption: "壁炉客房参考 · 壁炉可用性、房型与窗景待确认",
            width: 1600,
            height: 1158,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-garden-lounge.jpg",
            alt: "室内休息椅朝向带树木与户外座椅的平台",
            caption: "室内外休息空间参考 · 不承诺私人庭院或独享露台",
            width: 1600,
            height: 1182,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-bathtub.jpg",
            alt: "带独立浴缸、淋浴与坐便器的卫生间",
            caption: "浴缸卫生间参考 · 并非每种客房都拥有这一配置",
            width: 1600,
            height: 1113,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-red-room.jpg",
            alt: "以深红色床帘与织物装饰的四柱床客房",
            caption: "红色主题客房参考 · 准确房型与可订情况待确认",
            width: 1600,
            height: 1199,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-colour-room.jpg",
            alt: "色彩丰富的客房内设一张床与休息椅，窗边可见山体",
            caption: "彩色主题客房参考 · 窗景、阳台与房型不作保证",
            width: 1600,
            height: 1159,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-vanity.jpg",
            alt: "客房内的开放式洗漱台，旁边可见床与窗外绿植",
            caption: "卧室与洗漱区布局参考 · 隔断与对应房型待确认",
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
      "下方当期价格卡会按有效期自动核对；价格窗口结束后，页面会提示重新询价。住宿档位会改变停留体验，但不改变四日核心游览结构。",
    tierDescriptions: {
      "selected-city-stay":
        "按真实日期可订情况，从两家市区候选中匹配准确酒店与房型。",
      "spacious-premium-stay":
        "高级住宿提供更多公共空间与独立房间选择，具体住宿和分房按日期确认。",
      "distinctive-mountain-stay":
        "更强调设计与景观氛围，付款前匹配准确物业和房型。",
    },
    faqEyebrow: "决定四天之前",
    faqTitle: "真正会改变行程的几个问题",
    faqItems: [
      [
        "四天够不够玩张家界？",
        "如果第1天用于抵达，第2至第4天完整留给森林公园、大峡谷区域与天门山，足够完成一次有重点的初访；但不适合在不赶路的前提下把所有周边景点都塞进去。",
      ],
      [
        "大峡谷玻璃桥和天门山玻璃栈道是同一个地方吗？",
        "不是。大峡谷玻璃桥位于张家界大峡谷区域；天门山玻璃栈道属于另一天的天门山游览，两者不能在地图和门票上混为一谈。",
      ],
      [
        "住市区，还是选择更宽敞的住宿？",
        "市区住宿通常更强调抵离便利；更宽敞的档位改变的是夜晚氛围与相聚空间。最终仍要结合准确住宿、景点顺序和离开站点判断。",
      ],
      [
        "天门山能不能放在飞机或火车前？",
        "有时可以，但必须让可订线路、入场时段和离开时间之间保留安全余量。票源较晚或离开较早时，同一方案就可能不成立。",
      ],
      [
        "这里安排私家行程的价值是什么？",
        "不是承诺控制天气和排队，而是把正确入口、私人交通、行李、门票线路与同行人的节奏连成可执行的一天，并在运营变化时重新排序。",
      ],
    ],
    scopeEyebrow: "私家游价格覆盖什么",
    scopeTitle: "旅途看起来轻松，是因为困难的部分没有被藏起来",
    plannedTitle: "计划写入报价",
    plannedItems: [
      "当地私人车辆与约定范围内的抵达、离开接送",
      "第2至第4天私人导游",
      "所选住宿档位的3晚住宿",
      "确认单中逐项列明的成人门票与标准景交",
      "不安排购物店；任何升级或新增服务都须在收费前由你确认",
    ],
    excludedTitle: "不放进基础价格",
    excludedItems: [
      "往返张家界的大交通",
      "正餐与个人消费",
      "VIP通道、高空弹跳、滑索、演出等自选项目",
      "单房、儿童、导游语种与车型升级差价",
      "客人在本国购买的综合旅行保险",
    ],
    confirmationNote:
      "准确包含项目、实际履约方及日期差异，会在付款前写入书面确认单。",
    paymentEyebrow: "从漂亮想法，到可以确认的旅程",
    paymentTitle: "细节应该越来越清楚，而不是越来越复杂",
    paymentSteps: [
      [
        "01",
        "先说清旅行轮廓",
        "发来日期、抵达地点、成人和儿童人数、住宿偏好与离开计划。",
      ],
      [
        "02",
        "匹配会变化的环节",
        "按真实日期核对准确房型、早餐、车辆、门票与导游语种。",
      ],
      [
        "03",
        "查看一份清楚方案",
        "在决定是否继续之前，书面看到总价、准确范围、履约方与当前日期对应的预订条件。",
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
      "发来出行月份、抵达地点、同行人数、儿童年龄与想要的住宿感受。Homeground 会先把这条路线变成一份真正适配日期的方案，再讨论付款。",
    finalCtaLabel: "让 Homeground 帮你规划张家界",
  },
  ko: {
    htmlLang: "ko",
    metadataTitle: "장자제(장가계) 4일 3박 프라이빗 여행: 일정·2026년 가격",
    metadataDescription:
      "장자제 국가삼림공원, 대협곡 유리다리와 톈먼산을 잇는 4일 3박 프라이빗 일정입니다. 숙소 선택과 실제 날짜를 확인한 서면 견적을 안내합니다.",
    previewLabel: "로컬 편집 미리보기 · 현재 예약 불가",
    skipLink: "본문으로 바로가기",
    breadcrumbLabel: "현재 위치",
    homeLabel: "홈",
    previewBreadcrumb: "장자제 4일 일정",
    eyebrow: "4일 · 3박 · 장자제 프라이빗 일정",
    heroTitle: "장자제 4일 3박: 사암 봉우리와 유리다리, 톈먼산",
    heroLede:
      "나흘 동안 장자제의 사암 봉우리와 대협곡 유리다리, 톈먼산을 차례로 만납니다. 첫날은 서두르지 않고 도착하며, 이후 사흘은 서로 다른 풍경에 집중합니다. 같은 일정도 숙소 선택에 따라 여행의 분위기가 달라집니다.",
    secondaryCta: "4일 일정부터 보기",
    validThrough: "가격 적용 기간: 2026년 8월 15일–9월 30일",
    checkingPrice: "현재 가격 적용 기간을 확인하고 있습니다…",
    expiredPrice:
      "고정 가격의 유효기간이 지났습니다. 이 금액을 참고하기 전에 새 견적을 요청해 주세요.",
    fromLabel: "최저",
    regularLabel: "일반가",
    perPerson: "1인 기준",
    featured: "기본 옵션",
    exactStayNote:
      "정확한 숙소, 객실 유형, 조식, 객실 수와 예약 가능 여부는 결제 전 서면 확인 내용을 기준으로 합니다.",
    heroImageCaption:
      "아침 햇살이 비치는 장자제의 사암 봉우리. 이 4일 일정이 다루는 풍경의 규모를 보여 줍니다.",
    whyEyebrow: "이렇게 구성한 이유",
    whyTitle: "장자제를 체크리스트처럼 쫓아다니지 않는 4일",
    whyIntro:
      "장자제는 전망대 하나로 끝나는 곳이 아닙니다. 사암 봉우리와 협곡을 건너는 유리다리, 동굴 또는 호수 풍경, 그리고 톈먼산 고지대가 차례로 이어집니다. 국가삼림공원에는 하루를 온전히 쓰고, 대협곡은 별도의 날로 두며, 톈먼산으로 여행을 마무리합니다.",
    benefits: [
      [
        "서두르지 않는 도착일",
        "공항이나 기차역에서 만나 확정된 숙소로 이동합니다. 반나절뿐인 도착일을 온전한 관광일처럼 포장하지 않습니다.",
      ],
      [
        "세 날에 나누어 만나는 세 풍경",
        "국가삼림공원, 대협곡과 톈먼산을 하나의 막연한 명소 목록에 몰아넣지 않고 각각의 흐름으로 둘러봅니다.",
      ],
      [
        "저녁의 분위기를 바꾸는 숙소",
        "관광 동선은 유지하면서 시내의 편리함, 더 넉넉한 공간 또는 개성 있는 산악 분위기 중에서 고릅니다.",
      ],
      [
        "실제 날짜에 맞추는 세부사항",
        "객실, 차량, 입장권과 가이드 언어를 실제 여행 인원과 날짜에 맞춘 뒤 예약 단계로 넘어갑니다.",
      ],
    ],
    routeEyebrow: "장자제 4일 3박 일정",
    routeTitle: "도착하는 하루, 서로 다른 풍경으로 이어지는 사흘",
    guideLabel: "가이드 동행 관광",
    arrivalLabel: "도착 및 전용 차량 이동",
    daySummaries: zhangjiajiePrivateTourDaySummaries.ko,
    staysEyebrow: "숙소 선택 예시",
    staysTitle: "산을 내려온 뒤의 분위기까지 고르세요",
    staysIntro:
      "관광 동선은 같지만 하루를 마치고 머무는 분위기는 달라질 수 있습니다. 아래 세 가지 숙소 선택은 시내의 편리함부터 더 넉넉하거나 개성 있는 숙소까지 선택의 폭을 보여 줍니다. 각 사진은 해당 후보 숙소에만 속하며, 서로 다른 숙소의 객실을 하나의 약속처럼 섞어 보여 주지 않습니다.",
    otherStaysTitle: "화면에 보이는 숙소만 선택할 필요는 없습니다",
    otherStaysBody:
      "사진은 마련 가능한 숙소 중 일부입니다. 선호하는 스타일, 위치 또는 객실 구성이 맞지 않으면 중요한 조건을 알려 주세요. 실제 날짜에 다른 장자제 숙소도 확인하고, 결제 전에 일정에 맞는 숙소를 확정할 수 있습니다.",
    accommodationOptions: [
      {
        id: "city-candidate-01",
        label: "시내 후보 01",
        name: "모던한 시내 숙소",
        price: "시내 숙소 등급",
        summary:
          "밝고 현대적인 분위기의 시내 후보 숙소입니다. 현재 확보한 두 장의 트윈룸 사진을 모두 보여 줍니다. 창밖 전망과 정확한 객실은 실제 날짜의 배정 결과에 따릅니다.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-window.jpg",
            alt: "침대 두 개와 창밖 전망이 보이는 밝은 트윈룸",
            caption: "시내 후보 01 · 트윈룸과 창밖 전망 참고",
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
        label: "프리미엄 숙소 옵션",
        name: "넉넉한 프리미엄 숙소",
        price: "넉넉한 프리미엄 등급",
        summary:
          "하루 관광을 마친 뒤 단순히 잠만 자는 곳보다 넉넉한 공간을 원하는 여행자에게 맞는 후보입니다. 거실, 트윈룸, 더블룸과 테라스를 보여 주며, 정확한 숙소와 객실 배정은 날짜별로 확인합니다.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-living.jpg",
            alt: "통창으로 햇빛이 드는 프리미엄 숙소 거실",
            caption: "프리미엄 숙소 자료 · 거실 참고",
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
        label: "개성 있는 숙소 참고",
        name: "특색 있는 산악 숙소",
        price: "특색 있는 산악 숙소 등급",
        summary:
          "다이닝 테라스, 여러 객실 유형, 욕실과 조용한 라운지 공간을 후보 사진 11장으로 보여 줍니다. 이 사진들은 숙소의 전체 분위기를 전달하지만, 모든 시설과 전망, 구조가 한 객실에 함께 제공된다는 뜻은 아닙니다.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-terrace.jpg",
            alt: "유리로 둘러싸인 식사 공간 너머로 나무와 먼 산이 보이는 모습",
            caption: "다이닝 테라스 참고 · 전망과 공간 배정은 보장하지 않음",
            width: 1400,
            height: 1016,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-suite.jpg",
            alt: "침대 하나와 여러 라운지 의자가 놓인 넓은 오픈형 객실",
            caption: "넓은 객실 참고 · 정확한 등급, 면적과 전망은 미확정",
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
              "벽난로 객실 참고 · 작동 여부, 객실 유형과 전망은 확인 필요",
            width: 1600,
            height: 1158,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-garden-lounge.jpg",
            alt: "나무가 있는 야외 좌석 쪽을 바라보는 실내 라운지 의자",
            caption:
              "실내외 라운지 참고 · 전용 정원이나 독점 사용은 보장하지 않음",
            width: 1600,
            height: 1182,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-bathtub.jpg",
            alt: "독립형 욕조, 샤워 공간과 변기가 있는 욕실",
            caption:
              "욕조가 있는 욕실 참고 · 모든 객실에 같은 구성이 있는 것은 아님",
            width: 1600,
            height: 1113,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-red-room.jpg",
            alt: "짙은 붉은색 커튼과 패턴 직물로 꾸민 캐노피 객실",
            caption:
              "붉은색 테마 객실 참고 · 정확한 등급과 예약 가능 여부는 미확정",
            width: 1600,
            height: 1199,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-colour-room.jpg",
            alt: "침대와 라운지 의자, 창밖 산이 보이는 색감 있는 객실",
            caption:
              "색감 있는 객실 참고 · 전망, 발코니와 객실 유형은 보장하지 않음",
            width: 1600,
            height: 1159,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-vanity.jpg",
            alt: "침대 옆 개방형 세면 공간과 창밖 녹지가 보이는 객실",
            caption:
              "침실과 세면 공간 배치 참고 · 칸막이와 객실 연결 관계는 확인 필요",
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
    pricesEyebrow: "장자제 4일 3박 프라이빗 여행 가격",
    pricesTitle: "같은 일정, 세 가지 숙소 선택",
    pricesIntro:
      "아래 가격 카드는 표시된 유효기간과 현재 날짜를 대조합니다. 유효기간이 지나면 새 견적을 요청하도록 안내하며, 숙소 등급이 달라져도 4일 핵심 관광 동선은 유지됩니다.",
    tierDescriptions: {
      "selected-city-stay":
        "실제 날짜에 예약 가능한 숙소와 객실 가운데 실용적인 시내 숙소를 맞춥니다.",
      "spacious-premium-stay":
        "공용 공간과 개별 객실에 더 여유가 있는 프리미엄 숙소입니다. 정확한 숙소와 객실 배정은 날짜별로 확인합니다.",
      "distinctive-mountain-stay":
        "디자인과 산악 분위기가 더 뚜렷한 숙소입니다. 정확한 숙소와 객실은 결제 전에 확인합니다.",
    },
    faqEyebrow: "4일을 선택하기 전에",
    faqTitle: "실제로 일정을 바꾸는 질문",
    faqItems: [
      [
        "장자제 여행에 4일이면 충분한가요?",
        "1일 차를 도착일로 쓰고 2·3일 차에는 국가삼림공원과 대협곡 일대를 주요 일정으로 두며, 4일 차는 출발 시간이 허락하는 범위에서 천문산을 둘러보는 구성이라면 첫 방문의 핵심을 볼 수 있습니다. 다만 주변 명소를 모두 보는 일정은 아닙니다.",
      ],
      [
        "장자제 대협곡 유리다리와 톈먼산 유리잔도는 같은 곳인가요?",
        "아닙니다. 대협곡 유리다리는 장자제 대협곡에 있고, 톈먼산 유리잔도는 별도의 톈먼산 일정 안에 있습니다. 서로 다른 날 방문하는 별개의 장소입니다.",
      ],
      [
        "시내 숙소와 더 넉넉한 숙소 중 무엇을 고를까요?",
        "시내 숙소는 대체로 도착과 출발의 편리함을 우선합니다. 더 넉넉한 등급은 저녁 분위기와 함께 머무는 공간을 바꿉니다. 최종 선택은 정확한 숙소, 관광 순서와 출발 지점을 함께 보고 정해야 합니다.",
      ],
      [
        "비행기나 기차를 타기 전에 톈먼산을 둘러볼 수 있나요?",
        "가능한 경우도 있지만, 예약 가능한 코스와 입장 시간, 출발 시간 사이에 충분한 여유가 있어야 합니다. 늦은 입장권이나 이른 출발편이라면 같은 계획이 성립하지 않을 수 있습니다.",
      ],
      [
        "장자제에서 프라이빗 일정의 가치는 무엇인가요?",
        "날씨나 대기 시간을 통제한다는 약속이 아닙니다. 올바른 입구, 전용 차량, 수하물, 입장권 코스와 일행의 속도를 실행 가능한 하루로 연결하고, 운영 상황이 바뀌면 순서를 다시 맞추는 데 가치가 있습니다.",
      ],
    ],
    scopeEyebrow: "프라이빗 여행 가격의 범위",
    scopeTitle:
      "여행이 수월해 보이는 이유는 어려운 부분을 숨기지 않았기 때문입니다",
    plannedTitle: "견적에 포함해 설계하는 항목",
    plannedItems: [
      "현지 전용 차량과 합의된 범위의 도착·출발 이동",
      "관광일인 2–4일 차 전담 가이드",
      "선택한 숙소 등급의 3박",
      "확인서에 명시한 성인 입장권과 기본 관광지 내 교통",
      "쇼핑 일정 없음; 선택 업그레이드나 추가 서비스는 비용 청구 전에 동의를 받음",
    ],
    excludedTitle: "기본 가격에 포함하지 않는 항목",
    excludedItems: [
      "장자제까지 오고 가는 교통편",
      "식사와 개인 경비",
      "VIP 통로, 번지점프, 집라인, 공연 등 선택 활동",
      "1인실, 어린이 요금, 가이드 언어와 차량 업그레이드에 따른 차액",
      "여행자가 거주국에서 구입하는 종합 여행자보험",
    ],
    confirmationNote:
      "정확한 포함 항목, 실제 서비스 제공자와 날짜별 차이는 결제 전 서면 확인서에 명시합니다.",
    paymentEyebrow: "여행 구상에서 예약 가능한 일정까지",
    paymentTitle: "단계가 갈수록 복잡해지기보다 분명해져야 합니다",
    paymentSteps: [
      [
        "01",
        "여행의 기본 조건 알려 주기",
        "날짜, 도착 장소, 성인과 어린이 수, 선호 숙소와 출발 계획을 알려 주세요.",
      ],
      [
        "02",
        "날짜별 예약 조건 확인하기",
        "실제 날짜에 맞춰 객실 유형, 조식, 차량, 입장권과 가이드 언어를 확인합니다.",
      ],
      [
        "03",
        "한눈에 이해되는 일정 검토하기",
        "진행 여부를 정하기 전에 총액, 정확한 포함 범위, 실제 서비스 제공자와 해당 날짜의 예약 조건을 서면으로 확인합니다.",
      ],
    ],
    sourcesTitle: "공식 동선 및 목적지 자료",
    sources: [
      {
        label: "우링위안 풍경명승구",
        publisher: "유네스코 세계유산센터",
        url: "https://whc.unesco.org/en/list/640/",
      },
      {
        label: "장자제 세계지질공원 2일 코스",
        publisher: "장자제 유네스코 세계지질공원",
        url: "https://zhangjiajieuggp.org.cn/html/2026/2026032620135033852.html",
      },
      {
        label: "장자제 세계지질공원 3일 코스",
        publisher: "장자제 유네스코 세계지질공원",
        url: "https://zhangjiajieuggp.org.cn/html/2026/2026032620161311924.html",
      },
      {
        label: "톈먼산 방문객 교통 자료",
        publisher: "후난성 문화관광청",
        url: "https://whhlyt.hunan.gov.cn/whhlyt/wldh2022jt/202208/t20220823_27716284.html",
      },
    ],
    finalEyebrow: "실제 일정에 맞춰 조정하기",
    finalTitle: "내 여행 날짜에 이 4일을 넣으면 어떻게 될까요?",
    finalBody:
      "여행 월, 도착 장소, 인원, 어린이 나이와 원하는 숙소 분위기를 알려 주세요. Homeground가 결제 단계를 논의하기 전에 이 동선을 실제 날짜에 맞는 하나의 일정으로 구체화합니다.",
    finalCtaLabel: "Homeground와 장자제 여행 계획하기",
  },
} as const;

export function getZhangjiajiePrivateTourPublicPricing(
  locale: ProductPreviewLocale,
) {
  const copy = productPreviewCopy[locale];

  return {
    validFrom: pricing.valid_from,
    validUntil: pricing.valid_until,
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
      ...("from_price_per_person" in tier
        ? { fromPrice: tier.from_price_per_person }
        : {}),
      ...("price_per_person" in tier ? { price: tier.price_per_person } : {}),
      ...("regular_price_per_person" in tier
        ? { regularPrice: tier.regular_price_per_person }
        : {}),
    })),
  };
}
