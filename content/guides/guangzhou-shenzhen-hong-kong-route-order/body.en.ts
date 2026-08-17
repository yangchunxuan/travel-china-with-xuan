import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "For most first trips, arrange Guangzhou, Shenzhen and Hong Kong as a one-way chain that follows the international gateways: Guangzhou → Shenzhen → Hong Kong, or the reverse. Do not give Shenzhen an overnight merely because it sits between the other two. It earns a base only when you have a specific Shenzhen priority that justifies another hotel and border-sensitive move." },
  { id: "quick-choice", type: "comparison", title: "Choose the route shape", columns: [
    { heading: "Three bases", body: "Use when each city has at least one full local priority and both border-side hotels support the chosen crossing." },
    { heading: "Guangzhou + Hong Kong", body: "Use when Shenzhen has no protected anchor; pass through or make a focused visit rather than adding a hotel." },
    { heading: "Shenzhen + Hong Kong", body: "Use when Guangzhou is not central to the trip and Shenzhen priorities are geographically coherent." }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "The border is a process, not a line on the rail map" },
  { id: "official", type: "paragraph", text: "Hong Kong Security Bureau lists multiple land control points, including railway and road-based crossings, each with its own transport and operating information. MTR High Speed Rail provides official cross-boundary planning for Hong Kong West Kowloon. These sources establish options, not one universally best crossing. Your passport, immigration eligibility, hotels, baggage and onward plan determine the useful one; verify current official requirements before travel." },
  { id: "gateway-heading", type: "heading", level: 2, text: "Let the real gateways set the direction" },
  { id: "gateway", type: "table", caption: "Start with arrival and departure, then fit the cities", columns: ["Gateway pattern", "Likely order", "Question that can reverse it"], rows: [
    ["Arrive Guangzhou area; depart Hong Kong", "Guangzhou → Shenzhen → Hong Kong", "Does Shenzhen have enough value for a night?"],
    ["Arrive Hong Kong; depart Guangzhou area", "Hong Kong → Shenzhen → Guangzhou", "Which crossing works from the Hong Kong hotel?"],
    ["Both long-haul flights use Hong Kong", "Hong Kong at one or both ends; avoid unnecessary repeated crossing", "Would one Mainland block plus final Hong Kong night reduce risk?"],
    ["Both flights use a Mainland gateway", "Keep Hong Kong as a deliberate extension, not a transit assumption", "Are entry and re-entry permissions confirmed for this passport?" ]
  ] },
  { id: "shenzhen-test-heading", type: "heading", level: 2, text: "The Shenzhen overnight test" },
  { id: "shenzhen-test", type: "list", ordered: false, items: [
    "Name the Shenzhen experience that would survive cuts. “It is on the way” is not an experience.",
    "Check whether that priority lies near the chosen hotel and the next crossing. A famous district far from both can create two extra local transfers.",
    "Ask whether a focused stop without changing hotels can deliver the same value, with luggage storage confirmed in advance.",
    "Count the checkout, luggage, border process and new check-in. A night must create enough usable local time to repay them.",
    "If the Shenzhen night forces a second border crossing or weakens the final international departure, remove it first."
  ] },
  { id: "crossing-heading", type: "heading", level: 2, text: "Choose the crossing from both hotel doors" },
  { id: "crossing", type: "table", caption: "Mode and route execution belong after city order", columns: ["Factor", "What to compare", "Do not assume"], rows: [
    ["Hong Kong side", "Hotel to West Kowloon or the relevant control point", "Every Hong Kong district is equally close"],
    ["Mainland side", "Arrival point to the Shenzhen or Guangzhou hotel", "The geographically nearest border is quickest door to door"],
    ["Documents", "Current eligibility, required original documents and ticket details", "Past entry means current eligibility"],
    ["Baggage", "Stairs, walking, security and who carries each piece", "Fast rail removes handling"],
    ["Operating information", "Current official opening, train and service notices", "Old hours or a blog screenshot remain valid"]
  ] },
  { id: "workflow-heading", type: "heading", level: 2, text: "Build the route in seven decisions" },
  { id: "workflow", type: "list", ordered: true, items: [
    "Fix the international arrival and departure airports before assigning nights.",
    "Confirm each traveller's Mainland China and Hong Kong entry requirements from the responsible authorities; do not rely on route logic for eligibility.",
    "Give Guangzhou, Shenzhen and Hong Kong one non-substitutable purpose each, then remove any city with no protected purpose.",
    "Choose a one-way order that avoids repeating the same cross-boundary leg.",
    "Select the crossing by both hotel locations, baggage and the day's onward plan—not rail minutes alone.",
    "Keep the border move free of an immediate, irreplaceable timed activity and retain a late-arrival hotel plan.",
    "Only then search current tickets and operating notices through the named official sources."
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "Planning example: Shenzhen without a hotel" },
  { id: "example", type: "callout", tone: "neutral", title: "An example, not a prescribed itinerary", body: "A traveller has strong food and heritage priorities in Guangzhou and several full days of Hong Kong priorities, but only one Shenzhen architecture stop. A separate Shenzhen hotel adds two check-ins and moves the luggage through another stage. If current transport and storage make a focused visit workable, keeping Guangzhou and Hong Kong as the two bases may deliver the Shenzhen priority with less friction. If the Shenzhen activity needs an evening or a second district, the overnight can earn its place." },
  { id: "failure-heading", type: "heading", level: 2, text: "Border-day failures and recovery" },
  { id: "failure", type: "table", caption: "Protect the onward plan", columns: ["Failure", "Immediate response", "Design lesson"], rows: [
    ["Wrong control point for the hotel", "Recalculate using current official transport; do not race an unrealistic route", "Choose from both doors before booking"],
    ["Train or crossing delay", "Notify the hotel and release optional evening plans", "No timed highlight immediately after the border"],
    ["Document problem", "Follow official immigration or carrier instructions; do not improvise eligibility advice", "Verify every traveller before non-refundable booking"],
    ["Shenzhen night creates only a few usable hours", "Keep the strongest activity and drop the rest", "Remove the overnight on the next revision"],
    ["Final Hong Kong departure becomes fragile", "Move to Hong Kong earlier and protect the flight", "Keep the final cross-boundary move away from the flight day"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "When to choose the shorter route" },
  { id: "switch-rule", type: "paragraph", text: "Use all three bases only when each has a durable purpose and the border day remains recoverable. Drop Shenzhen as an overnight when it exists mainly to complete the city list. Drop Guangzhou when its priorities are weak relative to the extra Mainland movement. Drop Hong Kong only when it is not an intended destination or gateway—never because the map makes border formalities look invisible." },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "Entry and re-entry eligibility is confirmed for every passport.",
    "The direction follows actual flight gateways and avoids repeated crossing.",
    "Shenzhen has a named priority that justifies its hotel, or no hotel is added.",
    "The chosen control point works from both hotels with the real baggage.",
    "Current operating information is rechecked and the border day has recovery space."
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "Border information changes", body: "Control-point hours, transport, ticketing and immigration requirements are dynamic. Check Hong Kong and Mainland authorities plus the named operator close to travel. This route guide does not determine visa or entry eligibility." },
  { id: "scope", type: "callout", tone: "neutral", title: "What this guide covers", body: "This guide covers the three-city order and whether Shenzhen deserves an overnight. Use the Guangzhou–Hong Kong and Shenzhen–Hong Kong guides for exact modes, stations and control-point procedures." },
  { id: "help-cta", type: "callout", tone: "decision", title: "Want the border-sensitive route checked?", body: "Send flight gateways, passport nationalities, hotel areas, baggage and one priority per city. Do not send passport numbers or document images." },
  { id: "more-planning", type: "internal-links", title: "Continue planning", items: [ { label: "Guangzhou destination hub", href: "/destinations/guangzhou/", description: "Decide whether the city gets nights, then choose the terminal, the station and the base together." },
    { label: "Compare Guangzhou–Hong Kong transport", href: "/guides/guangzhou-hong-kong-transport-route/", description: "Choose stations and mode after the route order is fixed." },
    { label: "Choose a Shenzhen–Hong Kong crossing", href: "/guides/shenzhen-hong-kong-transport-route/", description: "Match the control point to your hotels and onward plan." },
    { label: "Test an open-jaw flight", href: "/guides/china-open-jaw-flights-route-planning/", description: "See whether different arrival and departure cities remove backtracking." },
    { label: "Compare Shenzhen stay areas", href: "/guides/shenzhen-where-to-stay-futian-luohu-nanshan/", description: "Compare Futian, Luohu and Nanshan by arrival hub, Hong Kong crossing, business addresses, attractions, evenings and luggage." },
  ] },
  { id: "sources", type: "sources", title: "Official sources reviewed", items: [
    { label: "Cross-boundary high-speed rail trip planning", url: "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html", publisher: "MTR High Speed Rail", reviewedAt: "2026-08-12" },
    { label: "Hong Kong land control-point information", url: "https://www.sb.gov.hk/eng/special/bound/control.html", publisher: "Hong Kong Security Bureau", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
