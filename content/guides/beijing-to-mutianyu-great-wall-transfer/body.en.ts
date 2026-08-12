import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "decision-lead", type: "lead", text: "Mutianyu is not one ride from every Beijing hotel. The useful comparison includes the trip to the departure point, the Huairou-area handoff, the attraction entrance and a return that still works after you finish on the wall." },
    { id: "quick-answer", type: "callout", title: "Choose the return before leaving Beijing", tone: "decision", body: "Independent travellers with time and light bags can use the official public-transport chain. A dated direct tourist bus can remove a transfer when its pickup and return fit. Families, older parents, tight schedules or an airport/train connection often justify a pre-arranged vehicle because the recovery value is larger than the advertised time saving." },
    { id: "matrix-heading", type: "heading", level: 2, text: "Three ways to reach one wall section" },
    { id: "decision-matrix", type: "table", caption: "Compare the complete transfer and the last safe return", columns: ["Option", "Usually fits", "Friction", "Must verify"], rows: [
      ["Public bus chain", "Flexible adults, light bags and a daylight return", "City departure point, Huairou transfer, waiting and stop-name confusion", "Current route numbers, operating window and last usable return"],
      ["Direct tourist bus", "Its dated pickup and return fit the hotel and visit length", "One fixed departure point and a fixed return", "Official operator, exact stop, inclusions and the travel date"],
      ["Pre-arranged vehicle", "Family, older parents, limited time or fixed onward travel", "Higher cost and vehicle meeting logistics", "Licensed arrangement, pickup pin, waiting terms and child-seat needs"],
    ]},
    { id: "public-heading", type: "heading", level: 2, text: "The official public route is a chain, not a single promise" },
    { id: "public-copy", type: "paragraph", text: "Beijing's official visitor information currently describes Express Bus 916 from Dongzhimen to Huairou Beidajie, then a local H-line bus toward Mutianyu. Route numbers, stops and hours are dynamic. Save the Chinese stop names, check the same-day return and treat a long wait at the Huairou handoff as possible rather than exceptional." },
    { id: "entrance-warning", type: "callout", title: "Arrival in the scenic area is not arrival on the wall", tone: "warning", body: "The transport drop-off, visitor service area, ticket checks and any internal shuttle or uphill system are separate parts of the day. Tickets and cable-car arrangements sit outside this transport page; confirm them with the attraction before deciding how much return margin remains." },
    { id: "clock-heading", type: "heading", level: 2, text: "Put five clocks on the day" },
    { id: "clock-list", type: "list", ordered: true, items: [
      "Hotel to the correct Beijing departure point.",
      "Outbound vehicle and every planned transfer.",
      "Drop-off to the actual wall-access point.",
      "Time on the wall plus descent and regrouping.",
      "The last safe return chain, not merely the final bus departure.",
    ]},
    { id: "people-heading", type: "heading", level: 2, text: "Mobility changes the transport answer" },
    { id: "people-comparison", type: "comparison", title: "Match the chain to the group", columns: [
      { heading: "Independent adult", items: ["Public transport can be reasonable", "Carry a charged phone and Chinese stops", "Leave recovery time"] },
      { heading: "Children or parents", items: ["Reduce standing and uncertain waits", "Keep the group together at handoffs", "Plan toilets and weather shelter"] },
      { heading: "Luggage or onward train", items: ["Do not take cases onto a sightseeing chain", "Store luggage lawfully before departure", "Avoid a same-evening fragile connection"] },
    ]},
    { id: "late-heading", type: "heading", level: 2, text: "A late start can remove options faster than it shortens the visit" },
    { id: "late-table", type: "table", caption: "Recovery decisions", columns: ["Problem", "First move", "Do not"], rows: [
      ["Missed direct bus", "Check its official change policy and the current public chain", "Follow an unofficial caller offering an unnamed vehicle"],
      ["Wrong Huairou stop", "Show the saved Chinese destination to uniformed staff", "Board by route number alone without confirming direction"],
      ["Return service at risk", "Leave the attraction and secure the next verified link", "Wait for the last possible bus with no fallback"],
      ["Severe weather or closure", "Use attraction and Beijing official notices", "Treat a transport ticket as proof the wall is open"],
    ]},
    { id: "fact-check", type: "callout", title: "Dynamic transport facts checked August 12, 2026", tone: "neutral", body: "Beijing's official visitor page currently describes the Dongzhimen–Huairou–Mutianyu public chain. Bus numbers, stops, operating hours, tourist-bus products, attraction hours and night-tour dates can change. Recheck all dated fields before departure." },
    { id: "help-callout", type: "callout", title: "Need the transfer matched to your Beijing day?", tone: "decision", body: "Send the date, hotel, group size, mobility needs, bags and any fixed evening train or flight. Homeground can identify a workable chain and its recheck points without promising live traffic or attraction access." },
    { id: "internal-links", type: "internal-links", title: "Keep the Beijing plan connected", items: [
      { label: "Where to stay in Beijing for a first trip", href: "/guides/beijing-where-to-stay-first-trip/", description: "Your district changes the first and last transfer." },
      { label: "Which Beijing railway station?", href: "/guides/which-beijing-railway-station/", description: "Protect an onward train by using the correct terminal." },
      { label: "Forbidden City for foreign visitors", href: "/guides/forbidden-city-for-foreign-visitors/", description: "Plan the other high-friction Beijing day separately." },
      { label: "Is your China itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Avoid placing two hard days into one fragile schedule." },
    ]},
    { id: "sources", type: "sources", title: "Official sources and image credit", items: [
      { label: "Mutianyu visitor and public-transport information", url: "https://english.beijing.gov.cn/travellinginbeijing/attractions/202603/t20260325_4566115.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
      { label: "2026 Mutianyu night-tour notice", url: "https://english.beijing.gov.cn/latest/news/202606/t20260630_4738683.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
      { label: "Hero: Mutianyu by Lloyd Tudor, CC BY-SA 4.0; cropped", url: "https://commons.wikimedia.org/wiki/File:The_Mutianyu_section_of_the_Great_Wall_of_China.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    ]},
  ],
} as const satisfies StructuredPageBody;

export default body;
