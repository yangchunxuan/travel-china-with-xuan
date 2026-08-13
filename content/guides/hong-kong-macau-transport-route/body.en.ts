import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "The ferry and the bridge do not start or finish at the same doors. Compare your Hong Kong hotel to the correct terminal or Hong Kong Port, the boundary process, the crossing and the Macao Port or ferry-terminal last mile." },
  { id: "answer", type: "callout", title: "Let the two hotel locations choose the shortlist", tone: "decision", body: "A ferry deserves the first check when a current sailing links useful terminals. The HZMB shuttle bus is a port-to-port service, so add local transport on both sides. A licensed cross-boundary coach can remove a transfer only when its exact dated stops match the trip." },
  { id: "matrix-heading", type: "heading", level: 2, text: "Three different border products" },
  { id: "matrix", type: "table", caption: "Crossing time is not door-to-door time", columns: ["Option", "Strong fit", "Hidden work", "Verify"], rows: [
    ["Cross-boundary ferry", "Hong Kong and Macao terminals fit the hotels", "Terminal check-in, sea conditions, luggage and onward transport", "Operator, exact terminals, sailing, baggage and disruption policy"],
    ["HZMB shuttle bus", "Hong Kong Port and Macao Port connect cleanly", "Local trip to each port plus clearance at both ends", "Port access, live shuttle operation, payment and Macao last mile"],
    ["Licensed cross-boundary coach", "Confirmed stops reduce local transfers", "Operator route, intermediate procedures and road delay", "Licensed operator, pickup, drop-off, crossing and change terms"],
  ]},
  { id: "warning", type: "callout", title: "The bridge shuttle does not pick up at your hotel", tone: "warning", body: "Official HZMB guidance describes local transport to Hong Kong Port, shuttle bus to Macao Port, then local transport to the destination. A bridge journey with three vehicles should not be compared with a ferry using only the middle segment." },
  { id: "clock-heading", type: "heading", level: 2, text: "Count the journey in six parts" },
  { id: "clock", type: "list", ordered: true, items: ["Hotel to terminal or Hong Kong Port.", "Check-in, waiting and departure clearance.", "Ferry, shuttle or coach crossing.", "Arrival clearance and baggage collection.", "Macao terminal or port to the exact hotel.", "Return inventory and a weather/road fallback."] },
  { id: "groups", type: "comparison", title: "What changes the choice", columns: [
    { heading: "Hong Kong Island stay", items: ["Check Sheung Wan ferry inventory", "Still compare hotel-to-port road time", "Keep a bridge fallback"] },
    { heading: "Airport or Lantau side", items: ["HZMB Hong Kong Port may fit better", "Do not assume airside transfer", "Allow immigration and luggage"] },
    { heading: "Family or many cases", items: ["Fewer handoffs can win", "Confirm bag rules on every service", "Keep the group together at clearance"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "If the sailing or road plan fails" },
  { id: "recovery", type: "table", caption: "Recalculate from the current terminal", columns: ["Failure", "Response"], rows: [
    ["Ferry cancelled", "Use the operator notice, then compare the price and timing of the complete HZMB route"],
    ["At the wrong ferry terminal", "Check live departures from that terminal before crossing Hong Kong"],
    ["Late at a bridge port", "Confirm Macao onward transport and hotel reception before boarding"],
    ["Cross-boundary coach stop changed", "Contact the licensed operator; do not follow an unofficial replacement vehicle"],
  ]},
  { id: "facts", type: "callout", title: "Dynamic transport facts checked August 13, 2026", tone: "neutral", body: "Hong Kong Marine Department currently lists the Hong Kong–Macao Ferry Terminal and cross-boundary ferry operators. HZMB official guidance separately lists the shuttle bus, cross-boundary coaches and authorised cross-boundary hire cars. Sailings, bridge transport, fares, terminal hours, baggage and entry requirements can change; verify the date." },
  { id: "help", type: "callout", title: "Need the complete crossing compared?", tone: "decision", body: "Send the date, both hotels, people, luggage and any fixed flight or show. Homeground can compare the transfers and backup choices without guaranteeing live border or carrier operations." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "Choose a Shenzhen-Hong Kong crossing", href: "/guides/shenzhen-hong-kong-transport-route/", description: "Use for a different mainland border decision." },
    { label: "Plan the last night before a flight", href: "/guides/china-last-night-before-international-flight/", description: "Leave enough time between the return crossing and the flight." },
    { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Count clearance and terminal access." },
    { label: "How to pay in China", href: "/guides/how-to-pay-in-china-as-a-tourist/", description: "Prepare payment options for mainland legs if the route expands." },
  ]},
  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Hong Kong marine ferry terminals", url: "https://www.mardep.gov.hk/en/public-services/port-services/terminal/index.html", publisher: "Hong Kong Marine Department", reviewedAt: "2026-08-12" },
    { label: "Cross-boundary ferry service data", url: "https://crossboundaryferryservices.mardep.gov.hk/en/", publisher: "Hong Kong Marine Department", reviewedAt: "2026-08-12" },
    { label: "HZMB public transport", url: "https://www.hzmb.gov.hk/en/transport.html", publisher: "HZMB Hong Kong Project Management Office", reviewedAt: "2026-08-12" },
    { label: "HZMB cross-boundary transport categories", url: "https://www.hzmb.gov.hk/en/cross-boundary.html", publisher: "HZMB Hong Kong Project Management Office", reviewedAt: "2026-08-13" },
    { label: "Hero: HZMB by N509FZ, CC BY-SA 4.0; cropped", url: "https://commons.wikimedia.org/wiki/File:Hong_Kong-Zhuhai-Macau_Bridge_at_Sha_Lo_Wan_(20180918131126).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "Hero derivative licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
