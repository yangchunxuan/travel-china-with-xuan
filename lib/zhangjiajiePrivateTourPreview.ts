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
    previewLabel: "Local product preview · not open for booking",
    skipLink: "Skip to tour details",
    eyebrow: "4 days · 3 nights · private itinerary",
    priceBasis: "Per person · minimum 2 adults",
    validThrough: "Approved price window through 31 August 2026",
    checkingPrice: "Checking the approved price window…",
    expiredPrice: "The fixed-price window has ended. Request a fresh quote for your dates.",
    fromLabel: "From",
    regularLabel: "Regular",
    perPerson: "per person",
    featured: "Starting option",
    exactStayNote:
      "The exact property, room type, breakfast, room count and availability are confirmed in writing before payment.",
    heroNote:
      "This review page does not take payment. Final inclusions, the operating partner and the booking terms must be confirmed in writing first.",
    primaryCta: "Check dates and room availability",
    secondaryCta: "See the four-day plan",
    whyEyebrow: "Built around the actual trip",
    whyTitle: "Private enough to adapt, specific enough to price",
    whyIntro:
      "The structure is fixed where it matters—four days, three nights and a clear sightseeing sequence—while the room, vehicle and daily pace are confirmed for the people travelling.",
    benefits: [
      ["Private movement", "The plan is built around private transfers and a private vehicle. The exact vehicle and operating scope are confirmed before payment."],
      ["Three guided sightseeing days", "Day 1 is arrival and transfer. Guiding is planned for Days 2–4, subject to the final written confirmation."],
      ["A real accommodation choice", "Choose the city-stay, family-villa or signature-villa price tier, then confirm the exact property and room."],
      ["One written trip record", "Dates, travellers, rooms, transport, tickets, inclusions and payment terms are brought together before the booking is accepted."],
    ],
    routeEyebrow: "The four-day shape",
    routeTitle: "A route that keeps arrival, the park and Tianmen Mountain distinct",
    guideLabel: "Guided sightseeing planned",
    arrivalLabel: "Arrival and private transfer",
    daySummaries: [
      "Meet at Zhangjiajie airport or railway station, transfer to the finally confirmed stay, then keep the rest of the day free.",
      "Use a full day for the National Forest Park, with the Bailong Elevator, Yuanjiajie, Tianzi Mountain and the cableway shaped around current operation.",
      "Visit the Grand Canyon Glass Bridge, then choose either Huanglong Cave or Baofeng Lake in the final written itinerary.",
      "Visit Tianmen Mountain on the available A, B or C route, then continue to the airport or railway station for departure.",
    ],
    pricesEyebrow: "Three approved August price tiers",
    pricesTitle: "Change the stay—not the core four-day structure",
    pricesIntro:
      "The listed price stays the same per person for 2–4 adults. A four-adult booking still needs a vehicle and luggage-capacity check. Five or more adults start from the same rate, with both room and vehicle capacity confirmed before payment.",
    tierDescriptions: {
      "selected-city-stay": "A practical city base chosen from the properties and rooms actually available for your dates.",
      "country-garden-family-villa": "More shared space and a family-oriented stay, subject to the exact villa and occupancy confirmation.",
      "country-garden-signature-villa": "A more distinctive design-and-view stay, with the exact property and room matched before payment.",
    },
    scopeEyebrow: "What the quote must settle",
    scopeTitle: "No vague ‘all included’ promise",
    plannedTitle: "Planned scope",
    plannedItems: [
      "Private local transport and agreed arrival/departure transfers",
      "Private guide on sightseeing Days 2–4",
      "Three nights in the selected accommodation tier",
      "Adult admission and standard scenic transport named in the confirmation",
    ],
    excludedTitle: "Quoted separately or excluded",
    excludedItems: [
      "Travel to and from Zhangjiajie",
      "Meals and personal spending",
      "VIP access, bungee jumping, zip lines, shows and other optional activities",
      "Single-room, child, foreign-language guide and vehicle-upgrade differences",
      "Comprehensive travel insurance bought in the traveller’s home country",
    ],
    confirmationNote:
      "Every planned item above remains subject to the final written confirmation; this preview deliberately does not turn an unverified supplier detail into a promise.",
    paymentEyebrow: "Before any payment",
    paymentTitle: "Dates and real inventory come first",
    paymentSteps: [
      ["01", "Send dates and party details", "Tell us the arrival point, adults and children, preferred stay and departure plan."],
      ["02", "We verify the actual booking", "The precise hotel or villa, room, breakfast, vehicle, tickets and guide language are checked for those dates."],
      ["03", "Receive one written confirmation", "It states the operator, total price, scope, payment schedule, cancellation terms and any disclosed non-refundable resources."],
      ["04", "Decide before paying", "No payment is collected by this preview page. You accept only after the written details are clear."],
    ],
    finalTitle: "Want this four-day structure checked for your dates?",
    finalBody:
      "Send the month, number of travellers, children’s ages and your preferred accommodation tier. A planner will verify the pieces that can change before discussing payment.",
  },
  zh: {
    htmlLang: "zh-Hans",
    previewLabel: "本地产品预览 · 尚未开放预订",
    skipLink: "跳到产品详情",
    eyebrow: "4天 · 3晚 · 私家行程",
    priceBasis: "每人价格 · 2位成人起订",
    validThrough: "已批准价格有效至2026年8月31日",
    checkingPrice: "正在核对价格有效期…",
    expiredPrice: "固定价格有效期已结束，请按实际日期重新询价。",
    fromLabel: "起价",
    regularLabel: "常规价",
    perPerson: "每人",
    featured: "起步选择",
    exactStayNote: "具体酒店或别墅、房型、早餐、房间数与库存，付款前以书面确认单为准。",
    heroNote: "本预览页不收款。包含项目、实际履约方和预订条款必须先书面确认。",
    primaryCta: "查询日期与可订房型",
    secondaryCta: "先看四日路线",
    whyEyebrow: "从真实行程出发",
    whyTitle: "能按人调整，也能把价格说清",
    whyIntro: "四天三晚和核心游览顺序保持清楚；住宿、车辆与每天节奏，再根据真正出行的人书面确认。",
    benefits: [
      ["私人交通思路", "行程以私人接送和私人车辆为基础；具体车型与服务范围在付款前确认。"],
      ["三天游览导游", "第1天以抵达接送为主；第2至第4天计划安排导游，最终以书面确认单为准。"],
      ["住宿是真正的选择", "先选择市区酒店、家庭别墅或精品别墅价格档，再确认具体物业与房型。"],
      ["一份完整确认单", "日期、人数、房间、交通、门票、包含项目与付款条款，在接受订单前放进同一份记录。"],
    ],
    routeEyebrow: "四天如何展开",
    routeTitle: "把抵达、森林公园和天门山分开安排",
    guideLabel: "计划安排导游",
    arrivalLabel: "抵达与私人接送",
    daySummaries: [
      "机场或高铁站接客，送往最终确认的住宿；剩余时间自由安排。",
      "完整游览张家界国家森林公园，根据当日运营安排百龙天梯、袁家界、天子山与索道。",
      "游览大峡谷玻璃桥，再在最终确认单中选择黄龙洞或宝峰湖。",
      "按可订票源采用天门山A、B或C线，游览结束后送机场或车站。",
    ],
    pricesEyebrow: "三个已批准的8月价格档",
    pricesTitle: "更换住宿选择，不改变四天核心结构",
    pricesIntro: "2至4位成人保持同档同人均价；4位成人仍须单独核对车型与行李容量。5人以上继续从同一人均价起算，但收款前必须同时确认房间数和车辆容量。",
    tierDescriptions: {
      "selected-city-stay": "按实际日期可订情况选择合适的市区酒店与房型。",
      "country-garden-family-villa": "更大的共享空间与家庭氛围，具体别墅和入住规则须确认。",
      "country-garden-signature-villa": "更强调设计与景观体验，付款前匹配准确物业和房型。",
    },
    scopeEyebrow: "报价必须说清的事",
    scopeTitle: "不使用模糊的“全部包含”承诺",
    plannedTitle: "计划包含范围",
    plannedItems: [
      "当地私人车辆与约定范围内的抵达、离开接送",
      "第2至第4天私人导游",
      "所选档位的3晚住宿",
      "确认单中逐项列明的成人门票与标准景交",
    ],
    excludedTitle: "不含或需单独核价",
    excludedItems: [
      "往返张家界的大交通",
      "正餐与个人消费",
      "VIP通道、蹦极、滑索、演出等自选项目",
      "单房、儿童、外语导游与车型升级差价",
      "客人在本国购买的综合旅行保险",
    ],
    confirmationNote: "以上计划项目仍须进入最终书面确认单；本页不会把尚未核实的供应商细节提前写成承诺。",
    paymentEyebrow: "付款之前",
    paymentTitle: "先核日期和真实库存，再谈收款",
    paymentSteps: [
      ["01", "提交日期与同行信息", "告诉我们抵达地点、成人和儿童人数、住宿偏好与离开计划。"],
      ["02", "核对真实可订资源", "逐项确认具体酒店或别墅、房型、早餐、车辆、门票与导游语种。"],
      ["03", "收到一份书面确认单", "写明履约方、总价、服务范围、付款节点、取消条款与已披露的不可退资源。"],
      ["04", "看清后再决定付款", "本预览页不收款；只有书面内容清楚并接受后，才进入付款。"],
    ],
    finalTitle: "想把这套四日结构放进你的实际日期吗？",
    finalBody: "发来月份、人数、儿童年龄与住宿档位偏好。规划师会先核对会变化的环节，再与你讨论付款。",
  },
} as const;
