import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "Use one hub when the spokes are genuinely short door to door and hotel stability saves more effort than repeated returns cost. Use multiple bases when the route moves forward and each hotel change unlocks several priorities. For many China trips, the strongest answer is a hybrid: one stable regional hub, then one deliberate move to the next cluster." },
  { id: "quick-choice", type: "comparison", title: "The fast first decision", columns: [
    { heading: "One hub", body: "Choose it for compact excursions, an easy station approach, heavy luggage or travellers who benefit from one familiar room." },
    { heading: "Multiple bases", body: "Choose it for a linear corridor when each move removes a return and supports more than one important activity." },
    { heading: "Hybrid", body: "Choose it when one cluster works as day trips but the next is too far to commute to repeatedly." }
  ] },
  { id: "boundary-heading", type: "heading", level: 2, text: "A train time is not a day-trip time" },
  { id: "boundary", type: "paragraph", text: "China Railway 12306 is the place to verify the current station pair and available service once dates are known. The timetable cannot decide the architecture by itself. Add hotel checkout, transport to the correct station, security and boarding margin, the train, arrival transport, luggage handling and—on a spoke—the fixed return. A short rail segment can still consume both ends of a day." },
  { id: "ledger-heading", type: "heading", level: 2, text: "Compare complete travel blocks" },
  { id: "ledger", type: "table", caption: "Count these for every proposed spoke and hotel move", columns: ["Block", "Hub-and-spoke", "Multi-base"], rows: [
    ["Morning access", "Hotel to station plus departure margin, repeated on every excursion", "Checkout, station access and luggage on move day"],
    ["Rail or road", "Outbound and return both consume fixed time", "Usually one forward segment"],
    ["Arrival side", "Station to activity, then back again before return", "Station to new hotel; later days start locally"],
    ["Hotel friction", "Low: room and unpacking remain stable", "Check-out gap, storage, check-in and repacking"],
    ["Disruption exposure", "A missed return can create a late night but the room remains", "A delay can cascade into hotel, transfer and later reservations"],
    ["Energy cost", "Repeated early departures and commuting", "More handling of bags and unfamiliar rooms"]
  ] },
  { id: "variables-heading", type: "heading", level: 2, text: "Five variables that matter more than kilometres" },
  { id: "variables", type: "list", ordered: false, items: [
    "Station geography: write the exact station, not only the city. A service at a distant terminal can reverse the decision.",
    "Activity geography: attractions scattered across a region do not automatically make one city a useful hub.",
    "Luggage and hands: count who can move each bag while handling passports, children or mobility needs.",
    "Check-in gap: a move day may leave hours between checkout and room access; decide where bags and tired travellers go.",
    "Recovery tolerance: one fixed room helps during illness, bad weather or a disrupted day, while a forward chain may reduce daily commuting."
  ] },
  { id: "workflow-heading", type: "heading", level: 2, text: "Build the route architecture before assigning nights" },
  { id: "workflow", type: "list", ordered: true, items: [
    "Put every priority on a map and group places that share a practical station or local transport network.",
    "For each possible spoke, write a conservative door-to-door outbound block and a fixed latest return. Do not use the fastest advertised train alone.",
    "For each possible base, list which two or more priorities become easier after sleeping there. A base with only one weak item has not earned a checkout.",
    "Count all repeated approaches in a hub plan and all packing, storage and check-in gaps in a multi-base plan.",
    "Test a hybrid: retain the strongest hub and make only the move that removes the largest repeated return.",
    "Check current station pairs in 12306 and hotel luggage policies before purchasing. If the live transport invalidates the structure, revise the structure—not the maths."
  ] },
  { id: "examples-heading", type: "heading", level: 2, text: "Three planning examples" },
  { id: "examples", type: "table", caption: "Examples illustrate the method; they are not prescribed itineraries", columns: ["Situation", "Likely structure", "Reason"], rows: [
    ["Two adults, light bags, three compact excursions from a station-adjacent hotel", "One hub", "The same room removes friction and the spokes do not dominate the days"],
    ["A corridor where each city has multiple priorities and the departure gateway lies at the far end", "Multiple bases", "Forward moves remove returns and serve real local time"],
    ["Family with luggage, two nearby excursions, then a distant cluster", "Hybrid", "Stability is preserved where useful, and one move avoids repeated long commutes"]
  ] },
  { id: "failure-heading", type: "heading", level: 2, text: "Failure signs and recovery" },
  { id: "failure", type: "table", caption: "Repair the structure before booking more", columns: ["Sign", "What went wrong", "Recovery"], rows: [
    ["Every day trip starts before breakfast and ends late", "The hub is geographically convenient only on a rail map", "Add a second base or drop the weakest spoke"],
    ["One-night hotels appear between every attraction", "The route is using hotels as punctuation", "Merge neighbouring priorities into fewer bases"],
    ["A base serves one optional sight", "The checkout cost exceeds the gain", "Visit it as a focused stop or remove it"],
    ["Move day also contains a timed highlight", "Delay and luggage have no recovery space", "Protect the highlight on a full local day"],
    ["The route returns to the same gateway after moving forward", "Flight geometry reintroduced the backtrack", "Compare an open-jaw gateway before finalising hotels"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "When to choose the other structure" },
  { id: "switch-rule", type: "paragraph", text: "Switch from a hub when two or more spokes each consume a large door-to-door block, or when the next international gateway lies naturally ahead. Switch from multiple bases when several moves unlock only one minor item each, luggage handling is a genuine constraint, or check-in gaps consume the supposed saving. If both extremes fail, keep one hub and one strategic move." },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "Exact origin and destination stations are written beside every rail segment.",
    "Every spoke includes local transport and the return, not only train minutes.",
    "Every base unlocks at least two priorities or removes a major return.",
    "Move days have a bag plan, check-in-gap plan and no irreplaceable immediate booking.",
    "Current 12306 service and each hotel's luggage policy have been rechecked."
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "Verify live transport after the architecture test", body: "Train patterns, stations, tickets and local transfers change. Use current 12306 results and named operators for your dates. This framework does not promise a universal day-trip radius or a specific connection." },
  { id: "scope", type: "callout", tone: "neutral", title: "What this guide covers", body: "This guide compares one returning base, multiple forward bases and a hybrid. Use the rushed-itinerary guide to test overall overload, city transport guides for exact stations and modes, and accommodation guides for neighbourhood choice." },
  { id: "help-cta", type: "callout", tone: "decision", title: "Need the returns counted?", body: "Send candidate bases, hotel areas, important activities, luggage and arrival/departure gateways. A useful review should expose the full travel blocks before assigning nights." },
  { id: "more-planning", type: "internal-links", title: "Continue planning", items: [
    { label: "Check whether the route is too rushed", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Test the final architecture against usable days." },
    { label: "Choose a useful transport hotel", href: "/guides/china-hotel-near-metro/", description: "A hub works only if daily departures are easy." },
    { label: "Test different entry and exit cities", href: "/guides/china-open-jaw-flights-route-planning/", description: "Open-jaw gateways can turn spokes into a forward chain." }
  ] },
  { id: "sources", type: "sources", title: "Official source reviewed", items: [
    { label: "China Railway passenger service and live journey search", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
