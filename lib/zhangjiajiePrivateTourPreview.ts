import product from "../content/product-previews/zhangjiajie-4-day-private-tour/product.json";
import pricing from "../content/product-previews/zhangjiajie-4-day-private-tour/pricing.json";

export type ProductPreviewLocale = "en" | "zh";

export { product as zhangjiajiePrivateTourProduct };
export { pricing as zhangjiajiePrivateTourPricing };

export const zhangjiajiePrivateTourPreviewPaths = {
  en: "/preview/zhangjiajie-4-day-private-tour/",
  zh: "/zh/preview/zhangjiajie-4-day-private-tour/",
} as const;

export function isProductPriceCurrent(
  validFrom: string,
  validUntil: string,
  now = new Date(),
) {
  const time = now.getTime();
  return (
    Number.isFinite(time) &&
    time >= new Date(`${validFrom}T00:00:00+08:00`).getTime() &&
    time <= new Date(validUntil).getTime()
  );
}

export const productPreviewCopy = {
  en: {
    htmlLang: "en",
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
    validThrough: "Price window: 15–31 August 2026",
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
        "Keep the route and choose between city convenience, a spacious premium villa setting or a more distinctive signature stay.",
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
    daySummaries: [
      "Meet at Zhangjiajie airport or railway station and transfer to the confirmed stay. With no guided sightseeing planned, the rest of the day is yours to settle in and begin at an easy pace.",
      "Give Zhangjiajie National Forest Park a full day. The planned route brings together the Bailong Elevator, Yuanjiajie, Tianzi Mountain and the cableway, with the exact order shaped around current operation.",
      "Begin at the Grand Canyon Glass Bridge, then take the day in one of two directions: the enclosed formations of Huanglong Cave or the open water and mountain setting of Baofeng Lake. The final choice is written into the itinerary.",
      "Take the available A, B or C route on Tianmen Mountain, then continue to the airport or railway station. Ticket availability determines the line; the mountain remains the final major chapter of the trip.",
    ],
    staysEyebrow: "A sample of possible stays",
    staysTitle: "Choose how the journey feels after the mountains",
    staysIntro:
      "The sightseeing route stays the same while the atmosphere after each day can change. These four galleries show a range from city convenience to more spacious or distinctive stays, so you can tell us what feels right. Every photograph remains with its own candidate property; rooms from different hotels are never blended into one promise.",
    otherStaysTitle: "Not limited to the stays shown here",
    otherStaysBody:
      "These photographs are only part of the hotel selection we can arrange. If the style, location or room setup is not right for you, tell us what matters most and we will screen other Zhangjiajie hotels for your actual dates. You can keep the four-day route you like while we match a better-fitting hotel, room and price for written confirmation before payment.",
    previewAssetNote:
      "Internal preview photographs only. They show the candidate material sets in full, but publication rights, exact property, room assignment, availability and foreign-guest acceptance must be confirmed before release or booking.",
    accommodationOptions: [
      {
        id: "city-nihao",
        label: "City candidate 01",
        name: "Ni Hao Hotel · Ziwu Road",
        price: "City-stay tier · CNY 5,390 from",
        summary:
          "A bright, contemporary city candidate shown through both available twin-room photographs. The window outlook and exact room remain subject to the date-specific assignment.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-nihao-twin.jpg",
            alt: "Twin room and window outlook in the Ni Hao Hotel candidate set",
            caption: "City candidate 01 · twin room and window reference",
            width: 1206,
            height: 782,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-nihao-twin-entry.jpg",
            alt: "Twin room, entrance and vanity area in the Ni Hao Hotel candidate set",
            caption: "City candidate 01 · twin room, entrance and vanity reference",
            width: 1206,
            height: 775,
          },
        ],
      },
      {
        id: "city-west",
        label: "City candidate 02",
        name: "Zhangjiajie Western Grand Hotel",
        price: "City-stay tier · CNY 5,390 from",
        summary:
          "The complete candidate set shows the hotel exterior, twin and double rooms, a specially decorated twin room and a bathroom. Balloons, floral styling and the window outlook are photographed examples, not standard guarantees.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-west-exterior.jpg",
            alt: "Exterior of the Zhangjiajie Western Grand Hotel candidate",
            caption: "City candidate 02 · hotel exterior and identity reference",
            width: 1206,
            height: 763,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-west-twin.jpg",
            alt: "Twin room and window outlook in the Western Grand Hotel candidate set",
            caption: "City candidate 02 · twin-room and window reference",
            width: 1206,
            height: 746,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-west-double.jpg",
            alt: "Double room in the Western Grand Hotel candidate set",
            caption: "City candidate 02 · double-room reference",
            width: 1206,
            height: 788,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-west-twin-decorated.jpg",
            alt: "Twin room with a special balloon and towel setup in the Western Grand Hotel candidate set",
            caption: "City candidate 02 · special twin-room setup, not a standard inclusion",
            width: 1206,
            height: 785,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-west-bathroom.jpg",
            alt: "Bathroom with shower and wall-mounted hair dryer in the Western Grand Hotel candidate set",
            caption: "City candidate 02 · bathroom and shower reference",
            width: 1206,
            height: 788,
          },
        ],
      },
      {
        id: "premium-villa",
        label: "Elevated villa option",
        name: "Country Garden Premium Villa Stay",
        price: "CNY 6,090 per person",
        summary:
          "For travellers who want the evening to feel spacious rather than merely functional. This candidate set shows the living room, twin room, double room, bathroom, terrace and recreation area; exact villa and room allocation are confirmed for the dates.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-living.jpg",
            alt: "Sunlit living room with full-height windows in the premium villa candidate set",
            caption: "Premium villa material set · living-room reference",
            width: 1400,
            height: 1050,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-twin.jpg",
            alt: "Twin bedroom opening toward a garden in the premium villa candidate set",
            caption: "Premium villa material set · twin-bedroom reference",
            width: 1050,
            height: 1400,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-double.jpg",
            alt: "Double bedroom with a large window in the premium villa candidate set",
            caption: "Premium villa material set · double-bedroom reference",
            width: 1400,
            height: 1050,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-bathroom.jpg",
            alt: "Bathroom with an enclosed shower in the premium villa candidate set",
            caption: "Premium villa material set · bathroom and enclosed-shower reference",
            width: 1050,
            height: 1400,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-terrace.jpg",
            alt: "Outdoor deck and lawn in the premium villa candidate set",
            caption: "Premium villa material set · deck and lawn reference",
            width: 1400,
            height: 1050,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-recreation.jpg",
            alt: "Bright recreation area with a mahjong table in the premium villa candidate set",
            caption: "Premium villa material set · recreation-area reference",
            width: 980,
            height: 1400,
          },
        ],
      },
      {
        id: "signature-villa",
        label: "Signature stay reference",
        name: "Signature Mountain Villa",
        price: "CNY 7,090 per person",
        summary:
          "Twelve candidate views show the exterior, dining terrace, several room styles, bathrooms and quiet lounge spaces. Together they convey the character of this more distinctive stay; they do not promise that every feature, view or layout belongs to one bookable room.",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-exterior.jpg",
            alt: "Exterior of the unconfirmed signature-villa candidate with Jianai Shanye signage",
            caption: "Candidate exterior · exact property identity and address remain to be confirmed",
            width: 1600,
            height: 1091,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-terrace.jpg",
            alt: "Glass-enclosed dining area with trees and distant mountains in the signature-stay candidate set",
            caption: "Dining-terrace reference · the view and space assignment are not guaranteed",
            width: 1400,
            height: 1016,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-suite.jpg",
            alt: "Spacious open-plan guest room with one bed and several lounge chairs",
            caption: "Large-room reference · exact category, size and outlook remain unconfirmed",
            width: 1600,
            height: 1133,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-four-poster.jpg",
            alt: "Guest room with a draped four-poster bed and a window-side seating area",
            caption: "Four-poster room reference · exact room and bed category remain unconfirmed",
            width: 1600,
            height: 1102,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-fireplace-room.jpg",
            alt: "Guest room with a bed, an inset fireplace and greenery outside the windows",
            caption: "Fireplace-room reference · operation, room category and outlook require confirmation",
            width: 1600,
            height: 1158,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-garden-lounge.jpg",
            alt: "Indoor lounge chair facing a tree-lined outdoor seating area",
            caption: "Indoor-outdoor lounge reference · private or exclusive use is not promised",
            width: 1600,
            height: 1182,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-bathtub.jpg",
            alt: "Bathroom with a freestanding bathtub, shower and toilet",
            caption: "Bathtub-bathroom reference · shown configuration is not available in every room",
            width: 1600,
            height: 1113,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-red-room.jpg",
            alt: "Guest room with a four-poster bed, deep-red drapes and patterned textiles",
            caption: "Red-themed room reference · exact category and availability remain unconfirmed",
            width: 1600,
            height: 1199,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-colour-room.jpg",
            alt: "Colourful guest room with one bed, lounge seating and mountains visible through the window",
            caption: "Colourful-room reference · outlook, balcony and room category are not guaranteed",
            width: 1600,
            height: 1159,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-vanity.jpg",
            alt: "Open vanity area beside a bed, with greenery visible through the window",
            caption: "Bedroom-and-vanity layout reference · partition and room mapping need confirmation",
            width: 1600,
            height: 1099,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-shower.jpg",
            alt: "Bathroom with a double vanity, open shower and toilet",
            caption: "Shower-bathroom reference · exact room-specific configuration remains unconfirmed",
            width: 1600,
            height: 1199,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-lounge-detail.jpg",
            alt: "Lounge detail with a patterned chair, ceramic vessels and a lit arched wall niche",
            caption: "Interior-detail reference · likely photographed in the same unit as the large room",
            width: 1600,
            height: 1168,
          },
        ],
      },
    ],
    pricesEyebrow: "4-day private tour price",
    pricesTitle: "One route, three ways to stay",
    pricesIntro:
      "For the approved 15–31 August 2026 window, the 4-day, 3-night route starts at CNY 5,390 per person with a selected city stay. The Premium Villa Stay is CNY 6,090 per person and the Signature Mountain Villa is CNY 7,090 per person. The accommodation changes; the core sightseeing structure does not.",
    tierDescriptions: {
      "selected-city-stay":
        "A practical city base matched from the properties and rooms available for the actual dates.",
      "country-garden-family-villa":
        "More shared and private-room space in the Premium Villa Stay, subject to exact villa and room allocation.",
      "country-garden-signature-villa":
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
        "Should I stay in the city or choose a villa setting?",
        "A city stay usually prioritizes practical arrivals and departures. A villa tier changes the evening atmosphere and shared space. The best choice still depends on the confirmed property, route order and departure point.",
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
    scopeTitle: "The route should feel effortless because the hard parts are visible",
    plannedTitle: "Designed into the quote",
    plannedItems: [
      "Private local transport and agreed arrival and departure transfers",
      "Private guide on sightseeing Days 2–4",
      "Three nights in the selected accommodation tier",
      "Adult admission and standard scenic transport named in the confirmation",
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
        "Receive the total price, scope, operator, payment schedule, cancellation terms and any disclosed non-refundable resources in writing before deciding.",
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
    validThrough: "价格期：2026年8月15日至31日",
    checkingPrice: "正在核对当前价格有效期…",
    expiredPrice: "固定价格有效期已结束，请在参考这些数字前重新询价。",
    fromLabel: "起价",
    regularLabel: "常规价",
    perPerson: "每人",
    featured: "起步选择",
    exactStayNote:
      "具体物业、房型、早餐、房间数与库存，付款前以书面确认为准。",
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
        "路线不变，在市区便利、高级别墅空间与更有辨识度的精品住宿之间选择。",
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
    daySummaries: [
      "机场或高铁站接站后前往已确认住宿。当天不安排导游游览，余下时间用来安顿、休息，让旅行从容开始。",
      "用完整一天进入张家界国家森林公园。计划串联百龙天梯、袁家界、天子山与索道，实际顺序按当天运营情况调整。",
      "先走进张家界大峡谷玻璃桥；之后二选一：进入黄龙洞的地下空间，或转向宝峰湖的水面与群山。最终选择写入确认行程。",
      "按可订票源采用天门山A、B或C线，游览后前往机场或车站。线路由票源决定，但天门山始终是这趟旅程最后一个完整篇章。",
    ],
    staysEyebrow: "部分住宿选择",
    staysTitle: "山水之后，选择更适合你们的停留方式",
    staysIntro:
      "核心路线不变，每天回到住宿后的感受可以不同。下面四组照片展示从市区便利到更宽敞、更有辨识度的住宿方向，方便你告诉我们更喜欢哪一种；每组照片只属于对应候选酒店，不把不同酒店和房型拼在一起。",
    otherStaysTitle: "不只限于页面里的酒店",
    otherStaysBody:
      "这些照片只是我们能够安排的部分住宿选择。如果这里展示的风格、位置或房型不合适，直接告诉我们你最看重什么，我们会按真实日期继续筛选其他张家界酒店。你不需要为了喜欢这条四日路线而勉强接受页面中的一家酒店；我们会把更合适的酒店、房型和价格，在付款前写入确认方案。",
    previewAssetNote:
      "以下仅为内部预览照片。这里完整展示候选素材，但图片公开使用权、具体物业、房型分配、库存与外宾接待，仍须在正式发布或接受订单前逐项确认。",
    accommodationOptions: [
      {
        id: "city-nihao",
        label: "市区候选01",
        name: "你好酒店 · 子午路店",
        price: "市区住宿档 · 每人¥5,390起",
        summary:
          "一组明亮、现代的市区住宿候选，现有两张双床房照片全部展示。窗外景观与准确房型仍按实际日期分配。",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-nihao-twin.jpg",
            alt: "你好酒店候选素材中的双床房与窗外景观",
            caption: "市区候选01 · 双床房与窗景参考",
            width: 1206,
            height: 782,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-nihao-twin-entry.jpg",
            alt: "你好酒店候选素材中的双床房、入口与洗漱区",
            caption: "市区候选01 · 双床房、入口与洗漱区参考",
            width: 1206,
            height: 775,
          },
        ],
      },
      {
        id: "city-west",
        label: "市区候选02",
        name: "张家界韦斯特大酒店",
        price: "市区住宿档 · 每人¥5,390起",
        summary:
          "现有候选素材全部展示：酒店外观、双床房、大床房、特殊布置双床房与卫生间。气球、花饰及窗外景观属于拍摄示例，不是标准保证。",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-west-exterior.jpg",
            alt: "张家界韦斯特大酒店候选物业外观",
            caption: "市区候选02 · 酒店外观与实体识别参考",
            width: 1206,
            height: 763,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-west-twin.jpg",
            alt: "张家界韦斯特大酒店候选素材中的双床房与窗外景观",
            caption: "市区候选02 · 双床房与窗景参考",
            width: 1206,
            height: 746,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-west-double.jpg",
            alt: "张家界韦斯特大酒店候选素材中的大床房",
            caption: "市区候选02 · 大床房参考",
            width: 1206,
            height: 788,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-west-twin-decorated.jpg",
            alt: "张家界韦斯特大酒店候选素材中特殊气球与毛巾布置的双床房",
            caption: "市区候选02 · 特殊双床房布置，并非标准包含",
            width: 1206,
            height: 785,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-west-bathroom.jpg",
            alt: "张家界韦斯特大酒店候选素材中的淋浴卫生间与壁挂吹风机",
            caption: "市区候选02 · 卫生间与淋浴设施参考",
            width: 1206,
            height: 788,
          },
        ],
      },
      {
        id: "premium-villa",
        label: "高级别墅选择",
        name: "碧桂园高级度假别墅",
        price: "每人¥6,090",
        summary:
          "适合希望一天游览后仍能舒展下来、而不是只回房睡觉的旅客。候选素材完整展示客厅、双床房、大床房、卫生间、露台与休闲区；具体别墅和房间分配按日期确认。",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-living.jpg",
            alt: "碧桂园高级度假别墅候选素材中的落地窗客厅",
            caption: "高级别墅素材组 · 客厅参考",
            width: 1400,
            height: 1050,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-twin.jpg",
            alt: "碧桂园高级度假别墅候选素材中通向花园一侧的双床房",
            caption: "高级别墅素材组 · 双床房参考",
            width: 1050,
            height: 1400,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-double.jpg",
            alt: "碧桂园高级度假别墅候选素材中的大窗大床房",
            caption: "高级别墅素材组 · 大床房参考",
            width: 1400,
            height: 1050,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-bathroom.jpg",
            alt: "碧桂园高级度假别墅候选素材中带独立淋浴间的卫生间",
            caption: "高级别墅素材组 · 卫生间与独立淋浴参考",
            width: 1050,
            height: 1400,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-terrace.jpg",
            alt: "碧桂园高级度假别墅候选素材中的户外露台与草坪",
            caption: "高级别墅素材组 · 露台与草坪参考",
            width: 1400,
            height: 1050,
          },
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-recreation.jpg",
            alt: "碧桂园高级度假别墅候选素材中带麻将桌的明亮休闲区",
            caption: "高级别墅素材组 · 休闲区参考",
            width: 980,
            height: 1400,
          },
        ],
      },
      {
        id: "signature-villa",
        label: "精品住宿参考",
        name: "精品山景别墅",
        price: "每人¥7,090",
        summary:
          "12张候选照片完整呈现建筑外观、景观餐厅、不同客房、卫浴与休息空间，让这一档住宿的气质更具体；但不代表所有设施、景观与布局都同时属于同一间可订客房。",
        images: [
          {
            src: "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-exterior.jpg",
            alt: "候选精品别墅建筑外观，入口可见简爱山野招牌",
            caption: "候选住宿外观 · 具体物业名称与地址仍待确认",
            width: 1600,
            height: 1091,
          },
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
      "在2026年8月15日至31日的已批准价格期内，这套4天3晚行程选择市区住宿每人¥5,390起；高级度假别墅每人¥6,090，精品山景别墅每人¥7,090。三档改变住宿体验，不改变四日核心游览结构。",
    tierDescriptions: {
      "selected-city-stay": "按真实日期可订情况，从两家市区候选中匹配准确酒店与房型。",
      "country-garden-family-villa":
        "高级度假别墅提供更多公共空间与独立房间选择，具体别墅和分房按日期确认。",
      "country-garden-signature-villa":
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
        "住市区，还是选择别墅住宿？",
        "市区住宿通常更强调抵离便利；别墅档位改变的是夜晚氛围与相聚空间。最终仍要结合准确物业、景点顺序和离开站点判断。",
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
    ],
    excludedTitle: "不放进基础价格",
    excludedItems: [
      "往返张家界的大交通",
      "正餐与个人消费",
      "VIP通道、蹦极、滑索、演出等自选项目",
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
        "在决定之前，书面看到总价、范围、履约方、付款节点、取消条款与已披露的不可退资源。",
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
} as const;
