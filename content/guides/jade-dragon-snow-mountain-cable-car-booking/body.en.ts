import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "A Jade Dragon Snow Mountain visit has two ticket decisions: scenic-area entry and a cable car. The official 2026 list shows RMB 100 entry plus a RMB 20 eco-bus, then RMB 120 for the Glacier Park cable car or RMB 40 for Spruce Meadow. Entry is sold through 玉龙雪山服务; individual cable-car tickets are sold through 丽江旅游集团. Check the current dated product before paying because packages and operating conditions can change." },
    { id: "tickets-heading", type: "heading", level: 2, text: "Which ticket are you actually trying to buy?" },
    { id: "tickets-table", type: "table", caption: "Published 2026 list prices per person, checked 26 September 2026", columns: ["Item", "Listed price", "Official individual channel"], rows: [
      ["Scenic-area entry", "RMB 100", "玉龙雪山服务 WeChat mini-program"],
      ["Eco-bus", "RMB 20", "Check with the dated entry product"],
      ["Glacier Park cable car", "RMB 120", "丽江旅游集团 WeChat mini-program"],
      ["Spruce Meadow cable car", "RMB 40", "丽江旅游集团 WeChat mini-program"]
    ] },
    { id: "release-heading", type: "heading", level: 2, text: "The two cable cars do not release at the same hour" },
    { id: "release", type: "paragraph", text: "The cable-car operator's published system opens Glacier Park tickets for the next seven days daily at 20:00 and Spruce Meadow tickets for the next seven days at 21:00. The scenic-area entry channel separately offers entry up to seven days ahead. These are different products in different mini-programs; securing entry alone does not secure a cable-car seat. Recheck the operators' notices for your date." },
    { id: "mistakes", type: "callout", tone: "warning", title: "Do not plan around Yak Meadow", body: "The Yak Meadow cable car closed for rebuilding on 4 March 2026. An operator forecast points to about 2028, not a confirmed reopening date. Older itineraries and social posts that still offer it as a current alternative are out of date." },
    { id: "choice-heading", type: "heading", level: 2, text: "Glacier Park or Spruce Meadow?" },
    { id: "choice", type: "comparison", title: "Choose the day you want, then book the matching cable car", columns: [
      { heading: "Glacier Park", body: "This is the upper cable-car route with the tighter quota. It is weather-sensitive. Do not treat the RMB 120 cable-car fare as the complete mountain-day cost; check entry, eco-bus and the terms of your dated ticket too." },
      { heading: "Spruce Meadow", body: "A separate lower-area cable car with a listed RMB 40 fare and a 21:00 booking release. It is a different visit, not a substitute ticket that grants Glacier Park access. Our published eight-day Yunnan tour plans Spruce Meadow and Blue Moon Valley, subject to the written confirmation." }
    ] },
    { id: "workflow-heading", type: "heading", level: 2, text: "A safer order for your booking" },
    { id: "workflow", type: "list", ordered: true, items: [
      "Choose Glacier Park or Spruce Meadow before building your Lijiang day around the mountain. Check that the cable car is operating for your proposed date.",
      "Read the current entry terms in 玉龙雪山服务 and the cable-car terms in 丽江旅游集团. The latter uses real-name and face-recognition checks for individual bookings.",
      "Book the dated products, check each successful order and keep the original identity document used. Do not assume a payment screenshot or a tour quote is a confirmed cable-car seat.",
      "Leave your itinerary flexible: wind or weather can suspend the cable car. Follow the operator's change or refund instruction for the affected order instead of assuming another cable car is automatically included."
    ] },
    { id: "passport", type: "callout", tone: "neutral", title: "Using a foreign passport?", body: "An older operator notice says visitors with foreign passports make separate cable-car bookings from ID-card holders. It does not give a current screen-by-screen passport flow. Ask the official seller how to book and verify your passport before paying, and bring the original document used in your confirmed order." },
    { id: "faq", type: "faq", title: "Jade Dragon Snow Mountain booking questions", items: [
      { question: "When do Glacier Park cable-car tickets open?", answer: "The operator's published rule opens the next seven days daily at 20:00 through 丽江旅游集团. Check the live notice and availability for your date; weather can still change operations." },
      { question: "When do Spruce Meadow cable-car tickets open?", answer: "The published release is 21:00 daily for the next seven days in the same official cable-car mini-program. Spruce Meadow and Glacier Park have separate ticket products." },
      { question: "Does a mountain-entry ticket include the cable car?", answer: "Do not assume it does. The official 2026 price list shows RMB 100 entry, RMB 20 eco-bus and separate cable-car list prices. Combo products may exist, so check the exact items and date on your order." },
      { question: "Can I use the Yak Meadow cable car in 2026?", answer: "No. The operator closed it for rebuilding from 4 March 2026. About 2028 is a forecast, not a confirmed reopening date." },
      { question: "What if weather stops my cable car?", answer: "The operator publishes rules for changing an affected Glacier Park order and a weather-priority rebooking route. The applicable notice and your successful order control the remedy; ask the official channel before buying a replacement ticket." },
      { question: "Is Glacier Park included in Homeground's eight-day Kunming–Dali–Lijiang tour?", answer: "The published route names Spruce Meadow and Blue Moon Valley, not a Glacier Park cable-car booking. Ask for a separate availability check and quote if Glacier Park is the priority; no ticket is guaranteed before confirmation." }
    ] },
    { id: "internal-links", type: "internal-links", title: "Put the mountain day into a Lijiang journey", items: [
      { label: "Kunming, Dali & Lijiang eight-day private tour", href: "/tours/kunming-dali-lijiang-8-day-private-tour/", description: "See the published Spruce Meadow and Blue Moon Valley plan; Glacier Park needs a separate check." },
      { label: "Lijiang or Shangri-La route order", href: "/guides/lijiang-shangri-la-transport-route/", description: "Check the wider journey before fixing your mountain date." }
    ] },
    { id: "sources", type: "sources", title: "Official and operator references", items: [
      { label: "2026 ticket prices", url: "https://www.lijiang.cn/article/175988.html", publisher: "Jade Dragon Snow Mountain management notice / Lijiang city media", reviewedAt: "2026-09-26" },
      { label: "Current entry mini-program and seven-day window", url: "https://www.lijiang.cn/article/181225.html", publisher: "Jade Dragon Snow Mountain management statement / Lijiang city media", reviewedAt: "2026-09-26" },
      { label: "Baisha service centre notice", url: "https://www.lijiang.cn/article/164510.html", publisher: "Jade Dragon Snow Mountain management notice / Lijiang city media", reviewedAt: "2026-09-26" },
      { label: "Cable-car reservation and weather rules", url: "https://www.ctnews.com.cn/dongtai/content/2025-06/25/content_175505.html", publisher: "China Tourism News, quoting the operator", reviewedAt: "2026-09-26" },
      { label: "Older operator advice for foreign-passport bookings", url: "https://www.lijiang.cn/article/133126.html", publisher: "Lijiang cable-car operator / Lijiang city media", reviewedAt: "2026-09-26" },
      { label: "Yak Meadow cable-car suspension", url: "https://static.cninfo.com.cn/finalpage/2026-03-03/1224991096.PDF", publisher: "Lijiang tourism operator stock-exchange filing", reviewedAt: "2026-09-26" },
      { label: "Mountain photograph and CC BY-SA 4.0 licence", url: "https://commons.wikimedia.org/wiki/File:Jade_Dragon_Snow_Mountain,_Yunnan.jpg", publisher: "Wikimedia Commons / 钉钉", reviewedAt: "2026-09-26" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
