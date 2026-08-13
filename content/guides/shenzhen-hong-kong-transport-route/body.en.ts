import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "decision-lead", type: "lead", text: "The fastest border crossing on a map is not always the fastest Shenzhen–Hong Kong trip. Choose by the actual district on each side, the control point's operating window, immigration steps, luggage and what happens after you clear the border." },
    { id: "quick-answer", type: "callout", title: "Start with the two doors", tone: "decision", body: "High-speed rail is often the cleanest comparison for Shenzhen North or Futian to Kowloon and central Hong Kong. Lo Wu usually deserves the first check for Luohu and Hong Kong's East Rail corridor; Lok Ma Chau Spur Line for Futian-side metro connections; Shenzhen Bay for Nanshan, the airport side of western Shenzhen or a road-based Hong Kong endpoint. The flight, hotel and travel hour can reverse any of those starting points." },
    { id: "matrix-heading", type: "heading", level: 2, text: "One city pair, several different border journeys" },
    { id: "decision-matrix", type: "table", caption: "Compare the complete journey, not only the cross-border segment", columns: ["Crossing", "Usually worth checking first when", "Practical difficulty people miss", "Do not assume"], rows: [
      ["High-speed rail: Hong Kong West Kowloon ↔ Shenzhen North or Futian", "A timed train fits and the endpoints favour Kowloon, central Hong Kong, Futian or Shenzhen North", "Station access, advance train choice, security, immigration and the large West Kowloon/rail-hub walks", "Every train stops at both Shenzhen stations or a short ride equals a short door-to-door trip"],
      ["Lo Wu ↔ Luohu", "Luohu or the East Rail Line is naturally on the route", "Two metro/rail networks, border queues and carrying bags through the control point", "Lo Wu and Lok Ma Chau are the same station"],
      ["Lok Ma Chau Spur Line ↔ Futian Checkpoint", "Futian-side metro access and the East Rail Line make a continuous route", "The rail crossing is not Huanggang/Lok Ma Chau road control point", "The word Futian alone identifies the correct station"],
      ["Shenzhen Bay", "Nanshan, western Shenzhen or a road transfer works better than crossing by rail", "Bus or vehicle access on both sides and a full immigration stop", "A taxi can simply drive through without the correct cross-boundary arrangement"],
      ["Huanggang or another road crossing", "A specific coach, vehicle route or late-hour plan is verified for the date", "Similar English/Chinese names and changing public-transport connections", "An old 24-hour claim or holiday extension remains valid"],
    ]},
    { id: "names-warning", type: "callout", title: "Lok Ma Chau has two meanings travellers regularly mix up", tone: "warning", body: "Lok Ma Chau Spur Line is the rail passenger crossing connected to Futian Checkpoint. Lok Ma Chau road control point connects with Huanggang. Save the full English and Chinese endpoint, not only 'Lok Ma Chau' or 'Futian'." },
    { id: "door-heading", type: "heading", level: 2, text: "Build the trip from hotel door to hotel door" },
    { id: "door-steps", type: "list", ordered: true, items: [
      "Save the exact hotel entrance, airport terminal or railway station on the Shenzhen side.",
      "Save the exact Hong Kong endpoint and identify its nearest useful MTR station or road drop-off.",
      "List the approach mode, the named control point, immigration and customs, and the onward mode as separate legs.",
      "Check the crossing's current operating window and the last usable onward service in both directions.",
      "Allow time for station walking, queues, toilets and ticket collection where applicable.",
    ]},
    { id: "rail-heading", type: "heading", level: 2, text: "High-speed rail wins only when the booked station pair wins" },
    { id: "rail-copy", type: "paragraph", text: "West Kowloon high-speed rail combines rail and boundary processing in one station complex, but it is still a reserved intercity journey rather than a turn-up-and-ride metro. Search the exact date and Shenzhen station. Futian can be more convenient for central Shenzhen; Shenzhen North can offer a different train pattern and onward network. Compare the hotel-to-platform and arrival-hall-to-hotel legs before choosing the shorter scheduled ride." },
    { id: "people-heading", type: "heading", level: 2, text: "Luggage and the group change the best crossing" },
    { id: "people-comparison", type: "comparison", title: "How common constraints change the answer", columns: [
      { heading: "Light luggage, flexible time", items: ["Rail crossings can be easy to compare", "A metro interchange may be acceptable", "Keep a second open crossing as a backup"] },
      { heading: "Family or older parents", items: ["Prefer fewer lifts, queues and network changes", "Do not split the group at immigration", "Keep documents with the traveller who needs assistance"] },
      { heading: "Several large cases", items: ["Count every corridor and security check", "A direct cross-boundary coach may beat multiple trains", "Confirm that the vehicle serves the exact endpoint"] },
    ]},
    { id: "late-heading", type: "heading", level: 2, text: "Late travel is a border-hours problem before it is a route problem" },
    { id: "late-table", type: "table", caption: "What to verify when the journey is early, late or disrupted", columns: ["Situation", "Check first", "Fallback"], rows: [
      ["Flight lands late in Shenzhen", "Realistic airport exit time, crossing hours and Hong Kong onward service", "Airport-area night or a verified road crossing; do not race to a closed rail point"],
      ["Last Hong Kong train is at risk", "Whether the control point and the local connection both remain open", "Stop before the border if the onward connection no longer works"],
      ["Holiday or major event", "Official temporary hours and transport notices", "Use a less convenient but confirmed crossing only if transport on both sides still works"],
      ["Rail disruption", "MTR/HSR and control-point notices, not social reposts", "Recalculate from the current location; changing crossings can add more time than waiting"],
    ]},
    { id: "recovery-heading", type: "heading", level: 2, text: "If you reach the wrong crossing" },
    { id: "recovery-list", type: "list", ordered: true, items: [
      "Stop before entering a restricted or immigration queue and confirm the full control-point name.",
      "Check whether this crossing can legally and operationally serve the traveller and luggage now.",
      "Compare completing the crossing with returning to the nearest interchange; do not switch on the name alone.",
      "Recheck the onward Hong Kong or Shenzhen service after border clearance.",
      "If the rest of the journey no longer works, deal with the hotel, flight or train booking before attempting another crossing.",
    ]},
    { id: "fact-check", type: "callout", title: "Dynamic transport facts checked August 13, 2026", tone: "neutral", body: "Hong Kong's official system currently identifies West Kowloon high-speed rail, Lo Wu and Lok Ma Chau Spur Line as rail passenger crossings and several separate road-based crossings, including Shenzhen Bay and Lok Ma Chau/Huanggang. Schedules, fares, control-point hours, holiday extensions, coach stops and entry requirements remain date-specific. Verify those fields through the responsible operator before departure." },
    { id: "help-callout", type: "callout", title: "Need a human check of the complete crossing?", tone: "decision", body: "Send your travel date, exact Shenzhen and Hong Kong endpoints, group size, luggage and any fixed flight or train. Homeground can identify the transfers and border assumptions that need checking; live services and entry permission still require date-specific confirmation." },
    { id: "internal-links", type: "internal-links", title: "Continue the parts this page does not own", items: [
      { label: "Use China's high-speed trains for the first time", href: "/guides/china-high-speed-train-first-time-guide/", description: "Continue with tickets, passports, security, seats and boarding after choosing rail." },
      { label: "Check whether the itinerary is too rushed", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Treat border queues and station handoffs as real travel time." },
      { label: "Plan the last night before an international flight", href: "/guides/china-last-night-before-international-flight/", description: "Leave enough time between the border crossing and departure." },
      { label: "Prepare a backup way to pay in mainland China", href: "/guides/how-to-pay-in-china-as-a-tourist/", description: "Prepare more than one way to pay for the mainland legs." },
    ]},
    { id: "sources", type: "sources", title: "Official sources and image credit", items: [
      { label: "Boundary control and crossing identities", url: "https://www.sb.gov.hk/eng/special/bound/control.html", publisher: "Hong Kong Security Bureau", reviewedAt: "2026-08-12" },
      { label: "Land-based cross-boundary transport", url: "https://www.td.gov.hk/en/transport_in_hong_kong/land_based_cross_boundary_transport/index_t.html", publisher: "Hong Kong Transport Department", reviewedAt: "2026-08-12" },
      { label: "High Speed Rail journey-planner workflow", url: "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html", publisher: "MTR Corporation", reviewedAt: "2026-08-12" },
      { label: "Hero: Hong Kong West Kowloon Station west exterior by Qwer132477, CC BY-SA 4.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Hong_Kong_West_Kowloon_Station_exterior%EF%BC%88West%EF%BC%892021_08_part2.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
      { label: "Hero derivative licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
    ]},
  ],
} as const satisfies StructuredPageBody;

export default body;
