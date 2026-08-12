import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "A rail-only China route works when the cities form a continuous corridor, each segment has a useful station-to-station option, and the longest transfer does not consume the trip's core experience. Do not make “no domestic flights” a rule before checking the weakest link. A single flight at the edge can protect an otherwise coherent rail spine without turning the trip into an airport chain." },
  { id: "quick-choice", type: "comparison", title: "Choose the transport architecture", columns: [
    { heading: "Rail only", body: "Best for a dense corridor, central stations, manageable luggage and travellers who value continuity over maximum range." },
    { heading: "Rail spine plus one flight", body: "Best when one remote endpoint creates an outsized rail day but the central sequence remains strong." },
    { heading: "More flights", body: "Consider when the route jumps between distant clusters and rail days repeatedly replace the experiences you came for." }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "Use 12306 to test a route, not a slogan" },
  { id: "official", type: "paragraph", text: "China Railway 12306 is the official place to search current station pairs, trains and passenger rules. Its current rules define a through journey ticket as separately purchased segments that can connect through the same or same-city passenger stations; that definition does not make every connection comfortable. Search the exact date and exact station, then add urban access, security, boarding, transfer and arrival time." },
  { id: "weak-link-heading", type: "heading", level: 2, text: "Find the weakest rail link first" },
  { id: "weak-link", type: "table", caption: "A rail route fails at its worst segment, not its average", columns: ["Test", "Rail-friendly result", "Warning result"], rows: [
    ["Geometry", "Cities form a forward corridor", "One stop requires a long out-and-back or diagonal jump"],
    ["Station access", "Hotel and next activity are practical from the used stations", "Fast train uses distant terminals at both ends"],
    ["Segment burden", "Travel block fits naturally into a move day", "It removes most of a scarce sightseeing day"],
    ["Luggage", "The group can board, store and move bags without losing control", "Every transfer depends on escalators, tight timing or more bags than hands"],
    ["Recovery", "A later option or flexible evening exists", "One missed segment breaks a chain of fixed bookings"],
    ["Night travel", "Sleep quality and arrival logistics are acceptable", "A sleeper saves a hotel night on paper but destroys the next day"]
  ] },
  { id: "workflow-heading", type: "heading", level: 2, text: "Build a reliable rail spine" },
  { id: "workflow", type: "list", ordered: true, items: [
    "Place the international arrival and departure gateways first. A rail-only promise should not force a return to the same city if an open-jaw flight removes it.",
    "Order candidate stops geographically and mark the segment that looks longest or least direct. Test that segment before refining easy ones.",
    "Search exact stations in 12306 for the intended date. Record departure, arrival and whether a transfer changes stations within a city.",
    "Convert each train into a door-to-door block: checkout, local transport, station margin, rail, arrival transport and check-in gap.",
    "Protect the arrival evening. Do not attach an irreplaceable timed activity to a scheduled train arrival.",
    "For a multi-train day, use a connection shown as workable by the current official service and still add a personal buffer appropriate to the group.",
    "Compare the weakest link against flying or deleting the endpoint. Keep rail only when continuity still beats the full alternative.",
    "After booking, save each passenger's exact document details and recheck operational notices near travel."
  ] },
  { id: "day-night-heading", type: "heading", level: 2, text: "Day train or sleeper is a separate decision" },
  { id: "day-night", type: "table", caption: "Do not value only the hotel night", columns: ["Option", "Potential gain", "Cost to test"], rows: [
    ["Daytime high-speed rail", "Predictable seated travel and easier arrival orientation", "Consumes daylight and may require an additional hotel night"],
    ["Overnight sleeper", "Moves while you would otherwise sleep", "Bed type, actual sleep, late boarding, early arrival and luggage before check-in"],
    ["Break the journey", "Turns one exhausting link into two manageable moves", "Adds a base and should serve a real experience, not merely a bed"]
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "Planning example: one remote endpoint" },
  { id: "example", type: "callout", tone: "neutral", title: "An architecture example, not a timetable", body: "Suppose four cities form a clean rail corridor, but a fifth requires a long detour and a return over the same track. Keeping the fifth because the trip is called rail-only makes the label more important than the traveller's time. Compare a flight into or out of that endpoint, or remove it. Either choice can preserve rail for the four-city spine while eliminating the weakest link." },
  { id: "disruption-heading", type: "heading", level: 2, text: "If a rail segment is disrupted" },
  { id: "disruption", type: "list", ordered: true, items: [
    "Use 12306 or station staff to confirm the service status; keep the ticket and document used for purchase available.",
    "Protect the next fixed departure first. Optional sightseeing should not compete with the final viable connection.",
    "If the same day still works, select an official later option and notify the accommodation of late arrival.",
    "If the chain no longer works, stop the cascade: retain the current room or arrange one night, then rebuild the next day from confirmed services.",
    "Handle changes and refunds under the current 12306 rules. Do not infer remedies from a different transport contract or an old blog post."
  ] },
  { id: "failure-heading", type: "heading", level: 2, text: "Signs the rail-only rule is hurting the trip" },
  { id: "failure", type: "list", ordered: false, items: [
    "Two or more rail days each remove most of a usable sightseeing day.",
    "The route repeatedly returns along the same corridor only to protect one international gateway.",
    "A same-city station change is treated as a platform transfer.",
    "The plan requires a sleeper even though the group knows it cannot sleep well on one.",
    "Every connection has a fixed hotel, attraction or onward ticket with no recovery margin."
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "When to add a flight or cut a stop" },
  { id: "switch-rule", type: "paragraph", text: "Add one flight when it removes a geographically isolated endpoint, a repeated corridor or a rail block the group cannot comfortably absorb. Cut the stop when neither rail nor air creates enough local time to justify it. Keep rail-only when the entire door-to-door chain remains coherent—not because trains are always better, but because this particular route works as a spine." },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "Every segment has exact station names and a current 12306 search result.",
    "Same-city station changes and local transfers are visible in the schedule.",
    "The longest segment has been compared with a flight and with deleting the stop.",
    "No move day depends on immediate, irreplaceable arrival activity.",
    "The group can handle the luggage and chosen night/day travel pattern."
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "Timetables and rules are dynamic", body: "This guide does not publish live trains, journey times, ticket inventory or a guaranteed connection. Verify exact dates, stations and passenger rules in 12306, and recheck notices before travel." },
  { id: "scope", type: "callout", tone: "neutral", title: "What this guide covers", body: "This guide helps decide whether to build an intercity trip around a rail spine. Use the first-time rail guide for station procedure, the night-train guide for sleeper versus daytime rail, and route-order guides for named city sequences." },
  { id: "help-cta", type: "callout", tone: "decision", title: "Want the weak link identified?", body: "Send cities, dates, arrival and departure gateways, luggage and any fixed event. A useful review should test the longest full travel block before optimising the easy segments." },
  { id: "more-planning", type: "internal-links", title: "Continue planning", items: [
    { label: "Take high-speed rail for the first time", href: "/guides/china-high-speed-train-first-time-guide/", description: "Use this after the route passes the rail test." },
    { label: "Compare a night train with daytime rail", href: "/guides/china-night-train-or-daytime-high-speed-rail/", description: "Protect either sleep quality or a sightseeing day deliberately." },
    { label: "Use flights only at the route ends", href: "/guides/china-open-jaw-flights-route-planning/", description: "An open-jaw gateway can preserve a rail spine without backtracking." }
  ] },
  { id: "sources", type: "sources", title: "Official sources reviewed", items: [
    { label: "China Railway passenger service", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-12" },
    { label: "China Railway passenger transport rules effective 1 June 2026", url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/info/transportationRules.html", publisher: "China Railway 12306", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
