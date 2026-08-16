import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "decision-lead", type: "lead", text: "Mutianyu is not one ride from every Beijing hotel. The useful comparison includes the trip to the departure point, the Huairou-area handoff, the attraction entrance and a return that still works after you finish on the wall." },
    { id: "quick-answer", type: "callout", title: "Choose the return before leaving Beijing", tone: "decision", body: "Independent travellers with time and light bags can use the official public-transport route. A dated direct tourist bus can remove a transfer when its pickup and return fit. Families, older parents, tight schedules or an airport/train connection often justify a pre-arranged vehicle because the extra certainty matters more than the advertised time saving." },
    { id: "matrix-heading", type: "heading", level: 2, text: "Three ways to reach one wall section" },
    { id: "decision-matrix", type: "table", caption: "Compare the complete transfer and the last safe return", columns: ["Option", "Usually fits", "Practical drawback", "Must verify"], rows: [
      ["Public buses", "Flexible adults, light bags and a daylight return", "City departure point, Huairou transfer, waiting and stop-name confusion", "Current route numbers, operating window and last usable return"],
      ["Direct tourist bus", "Its dated pickup and return fit the hotel and visit length", "One fixed departure point and a fixed return", "Official operator, exact stop, inclusions and the travel date"],
      ["Pre-arranged vehicle", "Family, older parents, limited time or fixed onward travel", "Higher cost and vehicle meeting logistics", "Licensed arrangement, exact pickup point, waiting terms and child-seat needs"],
    ]},
    { id: "public-heading", type: "heading", level: 2, text: "The official public route requires a transfer" },
    { id: "public-copy", type: "paragraph", text: "Beijing's official visitor information currently describes Express Bus 916 from Dongzhimen to Huairou Beidajie, then a local H-line bus toward Mutianyu. Route numbers, stops and hours are dynamic. Save the Chinese stop names, check the same-day return and treat a long wait at the Huairou handoff as possible rather than exceptional." },
    { id: "entrance-warning", type: "callout", title: "Arrival in the scenic area is not arrival on the wall", tone: "warning", body: "The transport drop-off, visitor service area, ticket checks and any internal shuttle or uphill system are separate parts of the day. Tickets and cable-car arrangements sit outside this transport page; confirm them with the attraction before deciding how much return margin remains." },
    { id: "clock-heading", type: "heading", level: 2, text: "Break the day into five time blocks" },
    { id: "clock-list", type: "list", ordered: true, items: [
      "Hotel to the correct Beijing departure point.",
      "Outbound vehicle and every planned transfer.",
      "Drop-off to the actual wall-access point.",
      "Time on the wall plus descent and regrouping.",
      "The last safe complete return, not merely the final bus departure.",
    ]},
    { id: "people-heading", type: "heading", level: 2, text: "Mobility changes the transport answer" },
    { id: "people-comparison", type: "comparison", title: "Match the route to the group", columns: [
      { heading: "Independent adult", items: ["Public transport can be reasonable", "Carry a charged phone and Chinese stops", "Leave time for delays"] },
      { heading: "Children or parents", items: ["Reduce standing and uncertain waits", "Keep the group together at handoffs", "Plan toilets and weather shelter"] },
      { heading: "Luggage or onward train", items: ["Do not take cases through several sightseeing transfers", "Store luggage lawfully before departure", "Avoid a tight same-evening connection"] },
    ]},
    { id: "first-leg-heading", type: "heading", level: 2, text: "The hotel-to-departure leg can decide the mode" },
    { id: "first-leg-copy", type: "paragraph", text: "Put the hotel entrance into the route at the actual departure hour. Dongzhimen may be a simple first leg from one district and an early cross-city transfer from another. A direct tourist bus is only direct after the group reaches its named pickup. For a private vehicle, confirm which hotel door or legal roadside point the driver can use. Add breakfast, lifts, metro opening, walking with children and time to find the correct stop before comparing advertised journey times." },
    { id: "layers", type: "callout", title: "Transport, scenic entry and uphill access are separate purchases", tone: "warning", body: "A bus or vehicle normally solves only the road journey. Scenic-area admission, any internal shuttle and the chosen cable-car, chairlift or walking access can have separate rules and queues. Read the current attraction order and decide the ascent and descent before fixing a pickup time. Never assume that a transport seller includes every ticket merely because its photo shows the wall." },
    { id: "day-shape-heading", type: "heading", level: 2, text: "Match the day shape to the transport" },
    { id: "day-shape", type: "table", caption: "The same wall visit can require a different return", columns: ["Day shape", "More defensible structure", "Main failure"], rows: [
      ["Mutianyu only", "Public or direct bus can work when the return is current and the group is flexible", "Spending the return buffer on an unplanned long wall route"],
      ["Mutianyu plus central Beijing dinner", "Use an earlier leave-the-wall time and keep the city last leg visible", "Treating the bus arrival as restaurant arrival"],
      ["Mutianyu before an evening train", "Prefer a controlled vehicle or remove the same-day connection", "Traffic, station mismatch and security consume the margin"],
      ["Children, parents or winter conditions", "Reduce handoffs and preserve shelter/toilet time", "Designing from the fastest able-bodied summer example"],
    ]},
    { id: "return-heading", type: "heading", level: 2, text: "Write a complete return instruction" },
    { id: "return-list", type: "list", ordered: true, items: ["Name the point where the group must finish descending and regroup.", "Add the internal trip from wall access back to the road pickup or public stop.", "Confirm the destination and direction of every Huairou or Beijing connection, not only its route number.", "Set a leave-attraction deadline that still leaves one verified fallback.", "If the fallback disappears, stop extending the visit and secure the return rather than waiting for the theoretical last service."] },
    { id: "late-heading", type: "heading", level: 2, text: "A late start can remove options faster than it shortens the visit" },
    { id: "late-table", type: "table", caption: "What to do when plans change", columns: ["Problem", "First move", "Do not"], rows: [
      ["Missed direct bus", "Check its official change policy and the current public route", "Follow an unofficial caller offering an unnamed vehicle"],
      ["Wrong Huairou stop", "Show the saved Chinese destination to uniformed staff", "Board by route number alone without confirming direction"],
      ["Return service at risk", "Leave the attraction and secure the next verified link", "Wait for the last possible bus with no fallback"],
      ["Severe weather or closure", "Use attraction and Beijing official notices", "Treat a transport ticket as proof the wall is open"],
    ]},
    { id: "fact-check", type: "callout", title: "Dynamic transport facts checked August 13, 2026", tone: "neutral", body: "Beijing's official visitor page currently describes the Dongzhimen–Huairou–Mutianyu public route. Bus numbers, stops, operating hours, tourist-bus products, attraction hours and night-tour dates can change. Recheck all dated fields before departure." },
    { id: "help-callout", type: "callout", title: "Need the transfer matched to your Beijing day?", tone: "decision", body: "Send the date, hotel, group size, mobility needs, bags and any fixed evening train or flight. Homeground can identify a workable route and its recheck points without promising live traffic or attraction access." },
    { id: "internal-links", type: "internal-links", title: "Keep the Beijing plan connected", items: [ { label: "Beijing destination hub", href: "/destinations/beijing/", description: "Decide nights, base area, gateway and the next city before fixing this detail." },
      { label: "Where to stay in Beijing for a first trip", href: "/guides/beijing-where-to-stay-first-trip/", description: "Your district changes the first and last transfer." },
      { label: "Which Beijing railway station?", href: "/guides/which-beijing-railway-station/", description: "Protect an onward train by using the correct terminal." },
      { label: "Forbidden City for foreign visitors", href: "/guides/forbidden-city-for-foreign-visitors/", description: "Plan another logistically demanding Beijing day separately." },
      { label: "Is your China itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Avoid placing two hard days into one fragile schedule." },
      { label: "Choose a Badaling route", href: "/guides/beijing-to-badaling-great-wall-transfer/", description: "Compare high-speed rail, S2 suburban rail, Bus 877 and current airport links to Badaling by departure hub, arrival point, return and backup plan." },
    ]},
    { id: "sources", type: "sources", title: "Official sources and image credit", items: [
      { label: "Mutianyu visitor and public-transport information", url: "https://english.beijing.gov.cn/travellinginbeijing/attractions/202603/t20260325_4566115.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
      { label: "2026 Mutianyu night-tour notice", url: "https://english.beijing.gov.cn/latest/news/202606/t20260630_4738683.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
      { label: "Hero: Mutianyu by Lloyd Tudor, CC BY-SA 4.0; cropped", url: "https://commons.wikimedia.org/wiki/File:The_Mutianyu_section_of_the_Great_Wall_of_China.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
      { label: "Hero derivative licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
    ]},
  ],
} as const satisfies StructuredPageBody;

export default body;
