import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "answer", type: "lead", text: "Add a three-night Yangtze cruise if seeing the Three Gorges from the river is a priority and a one-way Chongqing-to-Yichang leg fits the rest of your trip. Count four calendar days, not just three cabin nights. If those days would remove places you value more, keep the land route and leave the cruise out." },
  { id: "fit", type: "comparison", title: "A quick decision", columns: [
    { heading: "The cruise fits", body: "You want time on the river itself, can enter the ship in Chongqing and continue from Yichang, and can place the surrounding transfers around a confirmed sailing." },
    { heading: "Keep the land days", body: "Your trip is short, the river is a minor interest, or a fixed sailing would force hurried visits and fragile flight or train connections." }
  ] },
  { id: "four-days-heading", type: "heading", level: 2, text: "Three nights still occupy four dates" },
  { id: "four-days", type: "table", caption: "Budget the whole cruise block", columns: ["Calendar date", "What to protect"], rows: [
    ["Boarding date", "Reach Chongqing and the confirmed pier with enough margin; do not count on a full city day."],
    ["Two days on the ship", "Follow the confirmed sailing and shore programme; neither day is a free day in another city."],
    ["Disembarkation date", "Allow for the ship's finish, any included visit, the transfer from the actual end point and onward travel."]
  ] },
  { id: "geometry-heading", type: "heading", level: 2, text: "Build the route around the sailing" },
  { id: "geometry", type: "list", ordered: true, items: [
    "Check a real Chongqing-to-Yichang sailing for your travel dates before fixing the land route. Ship, direction and operating pier belong to that booking.",
    "Work backward to Chongqing. A previous city night gives more room for disruption; a same-day flight needs a checked arrival, transfer and boarding margin.",
    "Work forward from Yichang. Choose an onward train or flight only after the operator's disembarkation and any included shore visit are confirmed.",
    "Compare the four-date block with the destinations or rest days it replaces. A beautiful river segment is not a good fit if it leaves the rest of the trip rushed."
  ] },
  { id: "route-options-heading", type: "heading", level: 2, text: "See how the block fits three existing routes" },
  { id: "route-options", type: "table", caption: "These are route shapes, not interchangeable bookings", columns: ["Homeground route", "How it reaches the ship"], rows: [
    ["Chongqing & Three Gorges, 6 days", "Two Chongqing hotel nights come before the three ship nights; the route ends in Yichang."],
    ["Beijing–Xi'an–Yangtze–Shanghai, 12 days", "It reaches Chongqing by flight from Xi'an on boarding day, so that day's connection needs particular care."],
    ["Beijing–Xi'an–Chengdu–Yangtze–Shanghai, 17 days", "It places a Chongqing hotel night before boarding, then continues from Yichang to Shanghai after the cruise."]
  ] },
  { id: "service-heading", type: "heading", level: 2, text: "Private land touring does not mean a private ship" },
  { id: "service", type: "callout", tone: "warning", title: "Read the two service scopes separately", body: "On the linked Homeground tours, the stated private guide and vehicle serve your party on the listed land days. The cruise is a shared ship with its own staff and programme. Do not assume your land guide stays aboard or that ship commentary is in your preferred language. The written confirmation must name the ship, cabin, pier, included meals and shore visits, optional charges and service fees for your date." },
  { id: "booking-heading", type: "heading", level: 2, text: "Check these before you commit" },
  { id: "booking", type: "list", items: [
    "Sailing date, direction, ship, boarding pier and final drop-off point.",
    "Cabin type and balcony arrangement, including any single-cabin supplement.",
    "Included meals and shore visits versus optional visits or onboard charges.",
    "Onboard language and the exact handover between private land services and ship services.",
    "Time and transfer margin at both ends, plus the operator's change and cancellation terms."
  ] },
  { id: "dynamic", type: "callout", tone: "neutral", title: "The sailing controls the details", body: "This page gives a route decision, not a live timetable. Weather, waterway operations and the selected ship can change the pier, stops or finish. Confirm the current operator programme and written tour scope before payment, then recheck near travel." },
  { id: "faq", type: "faq", title: "Questions before adding the cruise", items: [
    { question: "Does a three-night Yangtze cruise use only three days?", answer: "No. A Chongqing-to-Yichang cruise with three nights occupies four calendar dates: boarding, two intervening dates and disembarkation. Those dates cannot also be full sightseeing days elsewhere." },
    { question: "Is the cruise private when I book a private China tour?", answer: "No. The private guide and vehicle apply to the listed land services. You join a shared cruise ship and its programme; the ship's staff, commentary language, cabin and shore visits must be checked for the actual sailing." },
    { question: "Can I travel onward from Yichang on disembarkation day?", answer: "It may work, but book the onward leg only after the selected ship's finish point and time, any included shore visit and the transfer to the correct station or airport are confirmed. Keep a margin rather than assuming the ship arrives at a city-centre terminal." },
    { question: "What if the cruise would make my itinerary too rushed?", answer: "Leave it out or give the trip more days. The river is worth four dates only when it matters more to you than the land time it replaces. A fixed sailing should not force fragile connections or strip the stops you most want to see." }
  ] },
  { id: "links", type: "internal-links", title: "Compare the route shapes", items: [
    { label: "Chongqing & Yangtze: 6-day private tour", href: "/tours/chongqing-yangtze-cruise-6-day-private-tour/", description: "Two Chongqing hotel nights, then three nights on the shared cruise." },
    { label: "Beijing, Xi'an, Yangtze & Shanghai: 12 days", href: "/tours/beijing-xian-yangtze-cruise-shanghai-12-day-private-tour/", description: "A shorter multi-city route with a flight into Chongqing on boarding day." },
    { label: "Beijing, Xi'an, Chengdu, Yangtze & Shanghai: 17 days", href: "/tours/beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour/", description: "A longer route with a Chongqing hotel night before the ship." },
    { label: "Check whether the whole itinerary is too rushed", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Count complete travel blocks before adding another region." },
    { label: "Plan an open-jaw China flight route", href: "/guides/china-open-jaw-flights-route-planning/", description: "Avoid unnecessary backtracking at the trip's outer gateways." }
  ] },
  { id: "sources", type: "sources", title: "Operator and image sources", items: [
    { label: "Gold Cruises classic Three Gorges product and operator overview", url: "https://www.ccqctg.com/col1916449.html", publisher: "Chongqing Culture and Tourism Group", reviewedAt: "2026-09-26" },
    { label: "Example of a four-day, three-night downstream sailing; a different operator", url: "https://centurycruise.com/tours/yangtze-signature-downstream-cruise-3-night", publisher: "Century Cruises", reviewedAt: "2026-09-26" },
    { label: "Hero photograph: Qutang Gorge by Tan Wei Liang Byorn, CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:Qutang_Gorge_on_Changjiang.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-26" }
  ] }
] } satisfies StructuredPageBody;

export default body;
