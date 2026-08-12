import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "Keep an international arrival day flexible by default. Add a scarce timed reservation only when every link—entry formalities, baggage, ground transport, hotel handling and venue admission—is known well enough, and when missing it would be acceptable. If one critical input is unknown, choose a replaceable block instead of pretending the scheduled landing or train arrival is sightseeing time."
    },
    {
      id: "two-blocks",
      type: "comparison",
      title: "Know what you are placing on the first day",
      columns: [
        { heading: "Timed anchor", body: "A scarce reservation with a named person, date or entry window, plus a late-arrival, cancellation or no-show consequence. It cannot simply slide two hours." },
        { heading: "Flexible block", body: "A nearby meal, rest, neighbourhood walk or ordinary shop visit that can start late, shorten or disappear without damaging the trip." }
      ]
    },
    { id: "risk-heading", type: "heading", level: 2, text: "A landing time is only the first node in the risk tree" },
    {
      id: "risk-tree",
      type: "table",
      caption: "Each gate must open before the timed visit becomes usable",
      columns: ["Node", "What can remain uncertain", "Evidence to obtain"],
      rows: [
        ["Arrival", "Actual gate or platform time can differ from the schedule", "Official flight or 12306 status on the day"],
        ["Entry", "Foreign travellers still present documents and undergo frontier inspection", "Correct entry eligibility, documents and current arrival-card process"],
        ["Baggage", "Delivery can take time or checked bags can be delayed", "Bag status and the carrier's incident or delivery procedure"],
        ["Terminal exit", "A remote gate, terminal change or long indoor walk can move the starting point", "Actual terminal, exit and meeting point"],
        ["Ground transport", "Queues, operating windows and the last walk vary by named route", "Current official airport, station and operator information"],
        ["Hotel", "The room may not be ready and luggage storage is not automatic", "Written confirmation of reception and storage for that hour"],
        ["Venue", "Security, document matching and a last-entry rule sit after the city journey", "The venue's current notice for the exact ticket and date"]
      ]
    },
    {
      id: "assumptions",
      type: "callout",
      tone: "warning",
      title: "Assumptions are visible, not hidden",
      body: "This method assumes the traveller is legally eligible to enter, carries the booking document, and has no guaranteed processing time. It does not use a fabricated immigration allowance, punctuality rate or universal airport-to-city duration. Unknown arrival, bag, hotel or admission inputs are treated conservatively as a range that can consume the proposed visit."
    },
    { id: "gate-heading", type: "heading", level: 2, text: "A timed anchor must pass all four admission gates" },
    {
      id: "anchor-gates",
      type: "list",
      ordered: true,
      items: [
        "The arrival chain is identifiable: correct airport or station, terminal, entry process if applicable, bag plan and current ground route.",
        "The hotel chain is explicit: where bags go, whether reception is staffed and how the traveller reaches the venue without waiting for a room.",
        "The venue offers a genuinely late-enough official window after all those steps; the plan does not work only by making every link run perfectly.",
        "The loss is acceptable: cancellation, late-entry and no-show rules are understood, and a replacement activity is already selected."
      ]
    },
    { id: "ledger-heading", type: "heading", level: 2, text: "Build the first-day ledger without invented minutes" },
    {
      id: "arrival-ledger",
      type: "table",
      caption: "Use confirmed values or conservative ranges; never write zero for an unknown",
      columns: ["Ledger field", "Record", "If unknown"],
      rows: [
        ["Transport arrival", "Scheduled service plus live status", "Keep a delay range and do not anchor tightly"],
        ["Entry and collection", "Required checks and whether bags are checked", "Treat the whole terminal-release block as variable"],
        ["City transfer", "Named mode, operating window, transfers and final walk", "Retain at least two viable modes"],
        ["Hotel handoff", "Reception, storage, room readiness and vehicle or walking entrance", "Go directly to a flexible nearby block"],
        ["Venue handoff", "Security, ticket document, entry, latest scan and cancellation", "Do not reserve a scarce slot"],
        ["Recovery capacity", "Alternative activity, meal and rest option", "The first day is not ready for an anchor"]
      ]
    },
    { id: "branches-heading", type: "heading", level: 2, text: "Three arrival branches produce different answers" },
    {
      id: "arrival-branches",
      type: "comparison",
      title: "Test the chain you actually have",
      columns: [
        { heading: "International flight", items: ["Includes entry formalities and usually a longer terminal-release chain", "Checked bags add a separate failure branch", "Default to flexibility even with an early scheduled arrival"] },
        { heading: "Domestic flight", items: ["No frontier inspection, but gate, bag and ground transport remain variable", "A disrupted flight can change both arrival and driver-waiting terms", "A replaceable evening is normally safer than a scarce ticket"] },
        { heading: "Domestic railway", items: ["The station, identification flow and exit still matter", "A carry-on-only passenger may remove the baggage branch", "A later anchor is conditional on live 12306 options, hotel storage and venue rules"] }
      ]
    },
    {
      id: "venue-proof",
      type: "paragraph",
      text: "Real venues show why the final gate matters. The Palace Museum publishes real-name, date and session rules; the National Museum of China states that visitors are checked against the reserved document and entry period, with cancellation and no-show conditions. These are examples of fragile anchors, not a claim that every museum uses the same rule. Re-read the named venue's notice immediately before booking and again on the day."
    },
    { id: "scenarios-heading", type: "heading", level: 2, text: "Two travellers, two defensible decisions" },
    {
      id: "traveller-scenarios",
      type: "table",
      caption: "The conclusion follows the chain, not enthusiasm",
      columns: ["Traveller", "Chain test", "Decision"],
      rows: [
        ["Long-haul international arrival in the afternoon, checked bag, Palace Museum ticket proposed", "Flight, frontier inspection, baggage, transfer, hotel and museum security form one serial chain; the ticket cannot absorb an unknown delay", "Do not use the museum as the arrival-day anchor. Keep a nearby meal, walk or rest block and visit on a full local day"],
        ["Morning domestic high-speed rail, carry-on bag, station-adjacent hotel confirms storage, later museum period", "The bag branch is short and the hotel handoff is confirmed; the remaining risks are live train status, station exit and the venue's late-entry rule", "A timed visit can be considered only after same-day checks, with a cancellable or acceptable-loss ticket and a nearby fallback"]
      ]
    },
    { id: "modules-heading", type: "heading", level: 2, text: "Design a flexible module, not an empty day" },
    {
      id: "flexible-modules",
      type: "list",
      ordered: false,
      items: [
        "Choose one small area near the hotel rather than crossing the city for a famous district.",
        "Keep one ordinary meal option that accepts a late start and one simple backup if the traveller is exhausted.",
        "Use an unticketed street, riverside or neighbourhood circuit with several exit points; verify any local access restrictions.",
        "Protect time for connectivity, payment setup, water, medication and sleep instead of treating them as failures to sightsee.",
        "Write the deletion rule in advance: if hotel handoff is later than expected, remove the walk before removing rest."
      ]
    },
    { id: "failure-heading", type: "heading", level: 2, text: "Recover at the first failed node" },
    {
      id: "failure-recovery",
      type: "table",
      caption: "Stop the cascade instead of racing the clock",
      columns: ["Failure", "Immediate action", "First-day repair"],
      rows: [
        ["Flight delay is clear before departure", "Use the venue's official cancellation channel before its deadline", "Activate the flexible hotel-area module"],
        ["Checked bag does not arrive", "Request the carrier's baggage incident record and agree collection or delivery under the applicable terms", "Do not drag the unresolved bag case to a timed venue"],
        ["Railway arrival is disrupted", "Use current 12306 rules and actual availability; a change is not guaranteed", "Cancel the anchor if no comfortable later chain exists"],
        ["Hotel cannot store bags", "Ask for a documented alternative or use a staffed storage option you have independently verified", "Drop the cross-city visit"],
        ["Venue closes or admission rule changes", "Save the official notice and follow its refund or rebooking process", "Use the preselected non-ticketed module"]
      ]
    },
    { id: "switch-heading", type: "heading", level: 2, text: "What changes the conclusion" },
    {
      id: "switch-conditions",
      type: "comparison",
      columns: [
        { heading: "Move toward an anchor", body: "A domestic arrival replaces an international one; bags become carry-on only; the hotel confirms immediate storage; the venue offers a substantially later period; or the booking is easy to cancel with low loss." },
        { heading: "Move toward flexibility", body: "The service changes terminal or station; checked or special baggage is added; arrival shifts later; ground transport nears its operating boundary; hotel storage is uncertain; or the venue tightens late-entry and no-show rules." }
      ]
    },
    { id: "verify-heading", type: "heading", level: 2, text: "Final verification: booking day and arrival day" },
    {
      id: "final-verification",
      type: "list",
      ordered: false,
      items: [
        "Confirm entry eligibility separately; an online arrival card does not waive frontier inspection.",
        "Check the operating flight or train, actual terminal or station and baggage status in official channels.",
        "Recheck the complete ground route, its operating window and a second viable mode.",
        "Obtain the hotel's current reception and luggage-storage answer in writing.",
        "Read the exact venue notice for identity document, security, entry period, last admission, cancellation and no-show consequences.",
        "Keep the flexible module available until the traveller is out of the terminal and the hotel handoff is working."
      ]
    },
    {
      id: "scope-boundary",
      type: "callout",
      tone: "neutral",
      title: "This page owns one first-day decision",
      body: "It decides whether an arrival day can carry a scarce timed anchor. The rushed-itinerary guide owns whole-trip pace and transfer-day overload; airport and station guides own exact routes; the last-night guide owns departure protection. This page does not calculate a complete itinerary or promise entry, transport or admission times."
    },
    {
      id: "human-help",
      type: "callout",
      tone: "decision",
      title: "Want a human to test the arrival chain?",
      body: "Leave your travel date, party size, arrival service and time, hotel area and approximate budget. We can identify the weak node and decide whether the first-day booking should stay or move."
    },
    {
      id: "links",
      type: "internal-links",
      title: "Continue planning",
      items: [
        { label: "Plan your China trip", href: "/plan/", description: "Return to the planning collection." },
        { label: "Check whether the whole itinerary is too rushed", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Count usable days and transfer load across the full trip." },
        { label: "Choose useful entry and exit cities", href: "/guides/china-open-jaw-flights-route-planning/", description: "Test gateway geometry before fixing the first night." },
        { label: "Choose a hotel that is genuinely near the metro", href: "/guides/china-hotel-near-metro/", description: "Verify the entrance and final walk, not the map label." },
        { label: "Prepare for a Forbidden City visit", href: "/guides/forbidden-city-for-foreign-visitors/", description: "Handle the venue-specific booking and entry task on a suitable day." }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        { label: "Online arrival-card options for foreign travellers", url: "https://en.nia.gov.cn/n147418/n147468/c187308/content.html", publisher: "National Immigration Administration", reviewedAt: "2026-08-13" },
        { label: "Exit and Entry Administration Law", url: "https://www.nia.gov.cn/n741440/n741547/c757592/content.html", publisher: "National Immigration Administration", reviewedAt: "2026-08-13" },
        { label: "Public air transport passenger service rules", url: "https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-08-13" },
        { label: "Rail ticket, change and refund FAQ", url: "https://www.12306.cn/en/faq.html?item=2", publisher: "China Railway 12306", reviewedAt: "2026-08-13" },
        { label: "Palace Museum online booking rules", url: "https://www.dpm.org.cn/subject_booking/", publisher: "The Palace Museum", reviewedAt: "2026-08-13" },
        { label: "Visitor reservation guidelines", url: "https://en.chnmuseum.cn/visit_692/", publisher: "National Museum of China", reviewedAt: "2026-08-13" }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
