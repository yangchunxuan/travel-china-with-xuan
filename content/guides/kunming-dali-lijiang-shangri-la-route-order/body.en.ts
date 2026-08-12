import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "The clean default is a one-way Yunnan corridor: Kunming → Dali → Lijiang → Shangri-La, or the reverse when flights and traveller readiness support it. That order reduces geographical backtracking; it does not mean all four cities belong in one trip. Give every stop a distinct job, test the higher-elevation extension separately, and cut a whole stop before reducing every place to a rushed check-in." },
  { id: "quick-choice", type: "comparison", title: "Choose the route shape", columns: [
    { heading: "Northbound corridor", body: "Useful when Kunming is the arrival gateway and the trip can leave from the north or continue onward without returning." },
    { heading: "Southbound corridor", body: "Useful when arrival into Shangri-La is already practical and the group can give the first high-elevation stage enough margin." },
    { heading: "Shorter three-stop route", body: "Usually stronger when the same gateway is required at both ends or one stop lacks a non-substitutable purpose." }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "The railway changes continuity, not human recovery" },
  { id: "official", type: "paragraph", text: "The National Railway Administration records the Lijiang–Shangri-La railway opening in November 2023, creating a direct rail link and a continuous Kunming–Dali–Lijiang–Shangri-La chain. Yunnan's transport authority describes the line climbing from Lijiang Station at about 2,400 metres to Shangri-La Station at about 3,274 metres. Those facts make the corridor easier to connect; they do not predict an individual's response to higher elevation or guarantee a current timetable." },
  { id: "roles-heading", type: "heading", level: 2, text: "Give each stop a job before assigning nights" },
  { id: "roles", type: "table", caption: "Keep a stop for what it uniquely contributes", columns: ["Stop", "Possible role", "Reason to cut"], rows: [
    ["Kunming", "Air and rail gateway plus its own city or excursion priorities", "It is only a compulsory airport name and the connection can be made without a rushed hotel"],
    ["Dali", "A slower base for lake, town and surrounding-area priorities", "The planned experience duplicates Lijiang and no distinct activity survives cuts"],
    ["Lijiang", "Old-town area choice, regional base and bridge to the northern corridor", "It is retained only as a transfer while the actual priorities lie elsewhere"],
    ["Shangri-La", "A deliberate higher-elevation landscape and cultural extension", "It is only a famous fourth name without recovery time, suitable activities or a robust exit"]
  ] },
  { id: "direction-heading", type: "heading", level: 2, text: "Direction is a gateway and recovery decision" },
  { id: "direction", type: "table", caption: "Compare the whole route, not only the order of names", columns: ["Direction", "Potential strength", "Planning cost"], rows: [
    ["Kunming → north", "Simple gateway start and gradual progress along the corridor", "Every stop can be added merely because it lies ahead"],
    ["Shangri-La → south", "The route descends after the northern start", "First arrival places the highest-elevation stage before the group knows how it will feel"],
    ["Return to Kunming", "May fit a materially better same-city international flight", "Repeats part of the corridor and needs enough time to justify the return"],
    ["Open-jaw endpoints", "Can remove the return over the same ground", "Flight price, baggage and reliability must be compared as a complete basket"]
  ] },
  { id: "altitude-heading", type: "heading", level: 2, text: "Plan the higher-elevation extension without making medical promises" },
  { id: "altitude", type: "list", ordered: false, items: [
    "Keep the first Shangri-La day flexible and avoid attaching an irreplaceable activity to arrival.",
    "Do not use one traveller's past response to predict another person's experience.",
    "Identify a lower-elevation fallback and a credible exit before committing non-refundable northern bookings.",
    "Travellers with health concerns should seek appropriate professional advice; route order is not medical clearance.",
    "Cold, weather and transport disruption are separate from altitude and still need current official checks."
  ] },
  { id: "workflow-heading", type: "heading", level: 2, text: "Build the corridor in eight decisions" },
  { id: "workflow", type: "list", ordered: true, items: [
    "Fix the actual arrival and departure airports, including the cost of returning to the same gateway.",
    "Write one non-substitutable purpose for each of the four stops. Delete any stop whose reason is only fame or proximity.",
    "Compare Dali and Lijiang by the activities you will actually do, not by treating both as generic old-town stays.",
    "Test Shangri-La as a separate extension: recovery, weather, luggage and exit plan must all work.",
    "Choose northbound, southbound or a shorter route according to gateways and group readiness.",
    "Turn every rail or road segment into a door-to-door travel block and keep move-day evenings flexible.",
    "Check current 12306 service, flight conditions and named attraction notices only after the architecture passes.",
    "When the route is full, remove the weakest stop instead of shortening all four."
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "Planning example: Kunming as a gateway, not a compulsory stay" },
  { id: "example", type: "callout", tone: "neutral", title: "An example, not a night allocation", body: "A traveller arrives in Kunming but has no Kunming priority; Dali and Lijiang each have distinct activities, while Shangri-La is the core landscape extension. If current transport permits a calm onward connection, Kunming can remain a gateway rather than becoming a rushed one-night sightseeing stop. If the international arrival is late or the group needs recovery, the Kunming night earns a practical role even without a full city programme." },
  { id: "failure-heading", type: "heading", level: 2, text: "Common failures and recovery" },
  { id: "failure", type: "table", caption: "Repair the corridor instead of forcing all four names", columns: ["Failure", "Immediate response", "Next design change"], rows: [
    ["Late arrival removes the first stop's purpose", "Use the night for recovery and drop optional sightseeing", "Do not count arrival evening as a full destination day"],
    ["Dali and Lijiang plans duplicate each other", "Keep the stronger local priorities", "Remove one base or give each a distinct role"],
    ["Group does not tolerate the northern stage well", "Stop adding activities and follow appropriate local and medical guidance", "Use the lower-elevation fallback and shorten the route"],
    ["Weather or transport blocks the northern exit", "Protect accommodation and the next confirmed service", "Keep a recovery night before the international flight"],
    ["Return to Kunming consumes a full final day", "Prioritise the flight and remove the weakest earlier stop", "Compare open-jaw gateways before booking"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "Which stop should be cut first?" },
  { id: "switch-rule", type: "paragraph", text: "Cut the stop with no distinct purpose, not automatically the smallest or least famous city. Kunming can be transit-only; Dali or Lijiang can be removed if their planned experiences overlap; Shangri-La should go when the higher-elevation extension lacks margin or a robust exit. Keep all four only when each contributes something irreplaceable and the route still has recovery space." },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "Arrival and departure gateways are fixed before city nights.",
    "Every stop has a non-substitutable purpose.",
    "Dali and Lijiang are differentiated by real activities.",
    "Shangri-La has a flexible first day, lower-elevation fallback and exit plan.",
    "Current transport and weather information are rechecked near travel."
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "Verify the current railway and conditions", body: "The railway connection is established, but timetables, tickets, weather and local operations change. Search exact dates in 12306 and check named authorities. This guide is not medical advice and does not promise how any traveller will respond to elevation." },
  { id: "scope", type: "callout", tone: "neutral", title: "What this guide covers", body: "This guide covers order and cut logic for Kunming, Dali, Lijiang and Shangri-La. It does not assign nights, prescribe attractions, choose Lijiang accommodation areas or replace live transport and professional health advice." },
  { id: "help-cta", type: "callout", tone: "decision", title: "Need the Yunnan corridor checked?", body: "Send gateways, dates, priorities, luggage and any health-related constraints you are comfortable disclosing. A planner can test the weak link but cannot provide medical clearance." },
  { id: "more-planning", type: "internal-links", title: "Continue planning", items: [
    { label: "Choose Lijiang Old Town or Shuhe", href: "/guides/lijiang-old-town-or-shuhe-where-to-stay/", description: "Place the hotel after deciding Lijiang's role." },
    { label: "Prepare for China rail", href: "/guides/china-high-speed-train-first-time-guide/", description: "Check the passenger process separately from route design." },
    { label: "Test whether the route is too rushed", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Count usable days after transfers and recovery." }
  ] },
  { id: "sources", type: "sources", title: "Official sources reviewed", items: [
    { label: "Lijiang–Shangri-La railway opening", url: "https://www.nra.gov.cn/xwzx/xwxx/xwlb/202311/t20231127_343786.shtml", publisher: "National Railway Administration", reviewedAt: "2026-08-12" },
    { label: "Yunnan transport authority overview of the Lijiang–Shangri-La railway", url: "https://jtyst.yn.gov.cn/html/2023/xingyexinwen_1127/130663.html", publisher: "Yunnan Department of Transport", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
