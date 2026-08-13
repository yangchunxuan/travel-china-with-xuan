import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "decision-lead", type: "lead", text: "Guangzhou and Hong Kong are close enough for a fast train to look obvious. The real decision is whether your Guangzhou door fits the departure station and your Hong Kong door fits West Kowloon after the rail and border procedures are counted." },
    { id: "quick-answer", type: "callout", title: "The default is a comparison, not a verdict", tone: "decision", body: "Check a direct high-speed train first when Guangzhou South and Hong Kong West Kowloon fit the itinerary. Search Guangzhou East separately on the exact date; 12306 currently recognises both Guangzhou South and Guangzhou East in cross-boundary products, but not every station pair has inventory on every date. Compare a licensed cross-boundary coach only when its confirmed pickup and drop-off remove enough transfers to offset road and border uncertainty." },
    { id: "matrix-heading", type: "heading", level: 2, text: "Choose the route that connects the right doors" },
    { id: "decision-matrix", type: "table", caption: "A short scheduled ride can still create a long travel day", columns: ["Option", "Strongest fit", "Practical drawback", "Verify before buying"], rows: [
      ["High-speed rail from Guangzhou South", "Panyu, south Guangzhou, a through rail connection, or a Hong Kong endpoint convenient to West Kowloon", "Reaching a very large station, security, exit/entry processing and the Hong Kong last mile", "The exact train, departure station and arrival time"],
      ["Direct rail from Guangzhou East", "A current direct train exists and saves a long cross-city transfer", "Different inventory or a timetable that does not match your date", "The exact dated train and the full ticketed station name"],
      ["Cross-boundary coach", "A dated, licensed service has useful hotel or district endpoints", "Traffic, an intermediate control point, baggage handling and operator-specific stops", "Operator, control point, both stops and change/refund rules"],
      ["Guangzhou to Shenzhen, then cross", "Direct inventory fails or Shenzhen is genuinely part of the itinerary", "A second ticket, a station or border transfer and more ways to miss a connection", "That the full journey still beats waiting for a direct option"],
    ]},
    { id: "station-warning", type: "callout", title: "Guangzhou South is not a generic label for Guangzhou", tone: "warning", body: "The city has several passenger stations. A search result that says only Guangzhou can hide a major first-leg transfer. Match the full ticketed station name to the hotel before comparing train duration." },
    { id: "time-heading", type: "heading", level: 2, text: "Count the complete door-to-door journey" },
    { id: "time-steps", type: "list", ordered: true, items: [
      "Hotel checkout to the correct Guangzhou station entrance or coach stop.",
      "Walking, security and the operator's required pre-departure margin.",
      "Scheduled rail or road time, without treating it as the whole journey.",
      "Exit and entry formalities at the named rail station or road control point.",
      "Arrival-hall walk and the final MTR, taxi or bus leg in Hong Kong.",
      "A disruption margin that protects the next fixed booking.",
    ]},
    { id: "west-kowloon-heading", type: "heading", level: 2, text: "West Kowloon works differently for different Hong Kong stays" },
    { id: "west-kowloon-copy", type: "paragraph", text: "West Kowloon is useful for Kowloon and connects into Hong Kong's wider urban network, but the station complex and onward walk are not zero. A Central, Causeway Bay, airport-side or New Territories address needs its own last-mile calculation. Do not convert the train's arrival time directly into a hotel check-in time." },
    { id: "people-heading", type: "heading", level: 2, text: "The group changes the cost of every transfer" },
    { id: "people-comparison", type: "comparison", title: "When convenience outweighs the shortest ride", columns: [
      { heading: "Solo, light luggage", items: ["More station choices remain practical", "Metro transfers may be acceptable", "Keep a direct-train fallback"] },
      { heading: "Family or older parents", items: ["Favour one clear station and fewer level changes", "Allow time for toilets and regrouping", "Do not split documents across bags"] },
      { heading: "Large luggage or fixed event", items: ["Count station corridors and border handling", "Allow enough time for the fixed check-in or flight", "Prefer an easy-to-change plan over a small time saving"] },
    ]},
    { id: "late-heading", type: "heading", level: 2, text: "Late trains and coaches need an after-arrival plan" },
    { id: "late-table", type: "table", caption: "Check the service after the service", columns: ["Risk", "Question", "Safer response"], rows: [
      ["Late arrival at West Kowloon", "Will the final urban connection still run after border processing?", "Price and locate a legal taxi pickup before departure"],
      ["Coach delay", "Does the booking protect a missed onward service?", "Do not attach a tight flight or non-refundable event"],
      ["Wrong Guangzhou station", "Can the ticket be changed before departure?", "Stop travelling toward the wrong terminal and use the official ticket channel"],
      ["Direct trains sold out", "Is another departure station truly faster door to door?", "Compare a later direct train with the Shenzhen split, including all transfer risk"],
    ]},
    { id: "recovery-heading", type: "heading", level: 2, text: "If the connection fails" },
    { id: "recovery-list", type: "list", ordered: true, items: [
      "Read the full station or coach-stop name from the booking, not from memory.",
      "Deal first with the time-sensitive item: flight, hotel cutoff or event.",
      "Use the rail or coach operator's official channel for live inventory and changes.",
      "If routing through Shenzhen, choose one named border and verify both sides before moving.",
      "Tell the accommodation when a late arrival becomes likely.",
    ]},
    { id: "fact-check", type: "callout", title: "Dynamic transport facts checked August 13, 2026", tone: "neutral", body: "MTR's High Speed Rail planner currently treats Hong Kong West Kowloon as the Hong Kong endpoint and date-specific mainland stations as separate searches. Direct services, fares, station calls, coach stops, border hours and entry requirements can change. This page publishes no permanent timetable or fare." },
    { id: "help-callout", type: "callout", title: "Want the two doors checked by a person?", tone: "decision", body: "Send the travel date, exact Guangzhou and Hong Kong addresses, group size, luggage and the next fixed booking. Homeground can compare the full transfer and identify facts to recheck without selling a ticket or guaranteeing live operations." },
    { id: "internal-links", type: "internal-links", title: "Continue with the part you actually need", items: [
      { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Tickets, passports, security and boarding after the route is chosen." },
      { label: "Choose a Shenzhen-Hong Kong crossing", href: "/guides/shenzhen-hong-kong-transport-route/", description: "Use this only if Shenzhen becomes a real transfer point." },
      { label: "Is your China itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Give borders and large stations their real time cost." },
      { label: "China's last night before an international flight", href: "/guides/china-last-night-before-international-flight/", description: "Protect the final departure from a cross-border delay." },
      { label: "Compare Zhuhai and Hengqin for Macau", href: "/guides/guangzhou-macau-transport-route/", description: "Choose Guangzhou South to Zhuhai/Gongbei or Hengqin by your Guangzhou starting point, Macau hotel, luggage, border hours and required spare time." },
    ]},
    { id: "sources", type: "sources", title: "Official sources and image credit", items: [
      { label: "High Speed Rail trip-planner workflow", url: "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html", publisher: "MTR Corporation", reviewedAt: "2026-08-12" },
      { label: "12306 cross-boundary product station list", url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/newTicketRule/newTicketRule-GuangShenGangThirtyDay.html", publisher: "China Railway 12306", reviewedAt: "2026-08-12" },
      { label: "Boundary-control identities", url: "https://www.sb.gov.hk/eng/special/bound/control.html", publisher: "Hong Kong Security Bureau", reviewedAt: "2026-08-12" },
      { label: "Licensed cross-boundary coach enquiries", url: "https://www.td.gov.hk/en/transport_in_hong_kong/land_based_cross_boundary_transport/enquiries/index.html", publisher: "Hong Kong Transport Department", reviewedAt: "2026-08-12" },
      { label: "Hero: Guangzhou South waiting hall by Rc1959, CC BY-SA 4.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Guangzhou_South_railway_station_(85213).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
      { label: "Hero derivative licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
    ]},
  ],
} as const satisfies StructuredPageBody;

export default body;
