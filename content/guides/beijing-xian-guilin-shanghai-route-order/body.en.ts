import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer", type: "lead",
      text: "Add Guilin and Yangshuo only if the regional landscape module passes three tests: its karst-and-river role is a real trip priority, a complete experience block remains after both long handoffs, and a delayed or cancelled water activity cannot endanger the international flight. With a Beijing arrival and Shanghai departure, test Beijing → Xi'an → Guilin/Yangshuo → Shanghai; reverse the whole line when the international gateways reverse. If the module survives only by calling arrival and departure fragments sightseeing days, leave it out.",
    },
    {
      id: "three-gate-answer", type: "table", caption: "The fourth stop earns its place only when every gate passes", columns: ["Gate", "Pass", "Fail"],
      rows: [
        ["Distinct value", "The Guilin karst/river landscape changes what the trip is for", "It is an optional photograph between stronger Beijing, Xi'an and Shanghai priorities"],
        ["Usable block", "A protected local experience remains after entry, base and exit handoffs", "Only a late arrival, one fragile activity and an early departure remain"],
        ["Recoverable exit", "An operation change removes a flexible block, not the international flight", "The route depends on water activity, road transfer and a separate flight all working the same day"],
      ],
    },
    {
      id: "scope-boundary", type: "callout", tone: "neutral", title: "One macro decision, not a four-city itinerary",
      body: "This page decides whether the Guilin/Yangshuo module belongs beside the already chosen Beijing–Xi'an–Shanghai spine and where it sits. It does not arrange Guilin, Yangshuo and Longji internally, select a river product, choose a Yangshuo hotel, or publish live flights, trains, prices, durations or a day-by-day schedule.",
    },
    { id: "module-heading", type: "heading", level: 2, text: "Treat Guilin and Yangshuo as one regional module, not a fourth station label" },
    {
      id: "module-value", type: "paragraph",
      text: "The addition can be meaningful because it changes the experience mix. UNESCO describes Guilin Karst as part of the South China Karst serial property, with tower and cone karst and a riverine landscape. Beijing and Xi'an can carry imperial, national and archaeological priorities; Shanghai can carry a contemporary urban, architecture or gateway role. Guilin/Yangshuo earns the extra handoffs when the traveller actively wants that landscape contrast. UNESCO status proves a distinct landscape, not that every first trip needs it.",
    },
    {
      id: "role-comparison", type: "comparison", title: "Ask what disappears when one component is removed", columns: [
        { heading: "Keep the three-city spine", items: ["The strongest priorities are history, urban life and the confirmed international gateways.", "Removing Guilin releases two long handoffs and a regional base chain.", "The trip still has a coherent purpose without a nature module."] },
        { heading: "Add the landscape module", items: ["Tower-karst, river landscape and slower rural observation are among the trip's top priorities.", "Removing it would leave the journey heavily urban or monument-led.", "The traveller accepts that weather and water operations can change the selected experience."] },
        { heading: "Replace, do not merely append", items: ["The total trip cannot protect the extra module and all three original city roles.", "Consider replacing only a city whose theme is weakest and which carries neither a fixed gateway nor a fixed booking.", "The honest choice is a different three-part trip, not four compressed names."] },
      ],
    },
    { id: "tax-heading", type: "heading", level: 2, text: "Count the regional transfer tax before counting scenery" },
    {
      id: "tax-ledger", type: "table", caption: "The module is a chain of dependencies", columns: ["Layer", "What must be named", "Conservative treatment while unknown"],
      rows: [
        ["Enter the region", "Actual flight or train, exact Guilin-area gateway, baggage and first staffed bed", "Transfer block; no fixed visit"],
        ["Reach the experience", "Hotel, pier, station or legal road pickup and the current product direction", "Do not call a station arrival a river or countryside visit"],
        ["Move or retain the base", "Whether Guilin city, Yangshuo town, Xingping or another verified bed owns the night", "Delegate the internal order and avoid an assumed hotel change"],
        ["Operate the landscape block", "Named Li River, Yulong River or land-based priority plus current restrictions", "Keep an alternative that still justifies the region"],
        ["Leave the region", "Exact station or airport, luggage chain, next city bed and fixed commitment", "Protect a staffed urban buffer before the international flight"],
      ],
    },
    {
      id: "guilin-station-figure", type: "figure", src: "/images/guides/guilin-airport-or-railway-station-arrival-guide/hero-1600.webp", width: 1600, height: 1000,
      alt: "Exterior and forecourt of Guilin Railway Station.",
      caption: "Guilin Railway Station is one named gateway. This licensed photograph does not identify the reader's train, hotel transfer or the correct station for a future date.",
    },
    {
      id: "zero-visit-rule", type: "callout", tone: "warning", title: "Every edge starts with zero sightseeing credit",
      body: "Start the Xi'an–Guilin-region edge and the Guilin-region–Shanghai edge at zero usable visits. Upgrade an edge only after the dated ticket, exact terminals, baggage, road handoff, check-in and a replaceable local block leave a genuinely uninterrupted window. A fast vehicle in a search result does not turn a hotel-change day into a full landscape day.",
    },
    { id: "gates-heading", type: "heading", level: 2, text: "Apply the three gates in order; do not average them into a score" },
    {
      id: "gate-method", type: "list", ordered: true,
      items: [
        "Write one sentence explaining the landscape purpose. ‘See Guilin’ fails; ‘observe the tower-karst river landscape that is missing from the three-city spine’ is a testable purpose.",
        "Draw the complete entry and exit chains without times. Include the ticketed airport or station, road handoff, luggage, first and last bed, and the next fixed commitment.",
        "Place the named landscape purpose only inside a protected block. Do not borrow time from an arrival, departure or hotel move that has not been verified.",
        "Remove the preferred water activity in a failure simulation. If the region no longer has enough value to justify both edges, the module is weather-fragile and should be cut or redesigned before booking.",
        "Delay the regional exit in a second simulation. If the international flight becomes the recovery plan, move the module earlier or remove it.",
      ],
    },
    {
      id: "gate-outcomes", type: "table", caption: "A gate has a decision, not points", columns: ["Result", "Meaning", "Next action"],
      rows: [
        ["All three pass", "The landscape module changes the trip, owns real time and has a safe exit", "Proceed to the regional gateway and internal-sequence guides"],
        ["Value passes; usable block fails", "The interest is real but this trip cannot protect it", "Replace a weaker city, add genuine time or save Guilin for another trip"],
        ["Value and time pass; recovery fails", "The route works only when every operation is punctual", "Move the module away from departure or cut it"],
        ["Value fails", "The fourth stop is collection rather than purpose", "Keep the three-city spine"],
      ],
    },
    { id: "placement-heading", type: "heading", level: 2, text: "Place the module from the fixed gateways, not from a universal best route" },
    {
      id: "placement-table", type: "table", caption: "Macro placement after the international tickets are real", columns: ["Confirmed gateway pattern", "First macro order to test", "Condition that can overturn it"],
      rows: [
        ["Arrive Beijing; depart Shanghai", "Beijing → Xi'an → Guilin/Yangshuo → Shanghai", "A dated module edge is unacceptable or the Shanghai buffer disappears"],
        ["Arrive Shanghai; depart Beijing", "Shanghai → Guilin/Yangshuo → Xi'an → Beijing", "The reverse dated edges or Beijing departure chain are weaker"],
        ["Round trip through Shanghai", "Keep Guilin away from the outbound flight and show the return to Shanghai", "Backtracking removes the module's only complete block"],
        ["Round trip through Beijing", "Show both the southbound module and the return to Beijing before allocating visits", "The return consumes a protected Beijing, Xi'an or landscape priority"],
        ["Flights not ticketed", "Compare both open-jaw directions and honest same-city returns", "Baggage, ticket conditions, separate-ticket risk or airport access changes the answer"],
      ],
    },
    {
      id: "last-water-warning", type: "callout", tone: "decision", title: "Do not let the last water activity own the international departure",
      body: "Official 2026 notices show that Li River sections can suspend and reopen at different times when conditions change. That is evidence for a recovery rule, not a prediction. The final water-dependent block should be followed by a verified exit and an urban flight buffer; a cruise, raft, road handoff and separate international ticket should never form one mandatory chain.",
    },
    { id: "nodes-heading", type: "heading", level: 2, text: "Keep the macro module while naming every real regional node" },
    {
      id: "node-identities", type: "paragraph",
      text: "Current official scenic transport information distinguishes Guilin Railway Station, Guilin North, Guilin West and Yangshuo Station. It also lists a separate high-speed-station-to-Xingping Pier shuttle and separate road links to Yangshuo town, so the station name does not mean arrival at a Yangshuo hotel. Guilin Liangjiang International Airport is another separate node. These identities matter to the transfer ledger, but selecting among them belongs to the current gateway and transport guides after the module passes. This page never converts the shared word ‘Guilin’ into an interchangeable terminal.",
    },
    {
      id: "yangshuo-station-figure", type: "figure", src: "/images/guides/guilin-yangshuo-transport-route/hero-1600.webp", width: 1600, height: 1000,
      alt: "Exterior of Yangshuo Railway Station.",
      caption: "The name Yangshuo Station can hide another road handoff. This licensed image identifies the station on its capture date; it proves no current train, shuttle, hotel route or county-town arrival.",
    },
    {
      id: "regional-owner-handoff", type: "callout", tone: "neutral", title: "Stop the macro article at the regional boundary",
      body: "Once Guilin/Yangshuo earns a place, use the separate Guilin gateway guide and Guilin–Yangshuo transport guide. Decide the region's internal sequence only after the exact endpoints, base and current operations are known. Those execution choices sit outside this macro decision.",
    },
    { id: "travellers-heading", type: "heading", level: 2, text: "Three travellers reveal when the same fourth stop changes status" },
    {
      id: "traveller-landscape", type: "callout", tone: "neutral", title: "Traveller A: landscape is a top-two reason for coming",
      body: "The traveller arrives in Beijing, departs from Shanghai and would regret an all-city route. The module passes the value gate. It stays only after both dated intercity edges, the exact regional base chain and a complete karst/river block are protected. If a water product changes, a preselected land-based landscape priority still makes the region worthwhile; Shanghai retains the departure buffer.",
    },
    {
      id: "traveller-history", type: "callout", tone: "warning", title: "Traveller B: three cities already consume every protected block",
      body: "The traveller's non-negotiables are dispersed Beijing visits, Xi'an archaeology and a Shanghai commitment. Guilin would have one late arrival, one operation-dependent block and an early exit. The scenery is attractive, but the usable-block gate fails. The answer is to keep the three-city route or replace one city, not count four transfer fragments as four destinations.",
    },
    {
      id: "traveller-constraints", type: "callout", tone: "neutral", title: "Traveller C: the preferred raft has unresolved access and passport rules",
      body: "The group includes a traveller whose age, height, health or mobility may conflict with a named Yulong River product, and the current official page does not close the foreign-passport booking flow. The group does not assume access. It keeps the module only if an independently verified, suitable land or river alternative preserves the landscape purpose; otherwise the usable-block gate fails for this party even though the landscape value remains real.",
    },
    { id: "recovery-heading", type: "heading", level: 2, text: "Recover by sacrificing the flexible layer, not the route's fixed ends" },
    {
      id: "recovery-table", type: "table", caption: "Module-specific failure recovery", columns: ["Failure", "First safe response", "Macro-route consequence"],
      rows: [
        ["A direct-looking flight or train is unavailable", "Search the real date and exact terminals with 12306 or the operating airline", "Keep Guilin only if both door-to-door edges remain acceptable; otherwise cut it"],
        ["Arrival is assigned to another Guilin station", "Rebuild station-to-bed and baggage handoffs", "Delete the arrival activity before changing the whole route"],
        ["Li River section or selected water product suspends", "Follow the specific operator notice and use the verified non-water alternative", "If the module loses its distinct purpose, release the hotel and remove it"],
        ["Yulong product restrictions exclude a traveller", "Do not split the party or improvise around the rule", "Use a separately verified alternative suitable for every member or cut the module"],
        ["Regional exit is delayed", "Protect the next staffed bed and discard the flexible city activity", "Use the Shanghai/Beijing buffer; never compress the international flight chain"],
      ],
    },
    { id: "booking-heading", type: "heading", level: 2, text: "Book the module in dependency order" },
    {
      id: "booking-order", type: "list", ordered: true,
      items: [
        "Confirm the international gateway cities, actual airports, baggage arrangement and ticket-change conditions.",
        "Write the three-city priorities that Guilin must not silently erase.",
        "Define the regional purpose and a fallback that still satisfies it without assuming a particular water operation.",
        "When searchable, verify both intercity edges using the exact date, airport or station and real accommodation endpoints.",
        "Use the existing gateway, transport, stay and Longji guides for the regional sequence; keep bookings reversible while one node is unknown.",
        "At the first cancellation deadline and shortly before travel, recheck the named river section/product, participant rules, weather and operating notices.",
      ],
    },
    { id: "final-heading", type: "heading", level: 2, text: "The fourth module is ready only when its evidence fits in one ledger" },
    {
      id: "final-ledger", type: "table", caption: "Final evidence before the keep decision", columns: ["Decision", "Required evidence", "If absent"],
      rows: [
        ["Macro direction", "Ticketed or genuinely comparable international gateways", "Keep forward and reverse provisional"],
        ["Module entry", "Dated ticket, exact gateway, baggage and first bed", "No arrival-day landscape credit"],
        ["Distinct experience", "Named landscape purpose plus a suitable current product or land alternative", "Do not add the module"],
        ["Module exit", "Exact terminal, last bed, luggage and next fixed commitment", "Add recovery or remove Guilin"],
        ["Failure state", "One removable activity, a verified regional exit and an urban buffer protect the international flight", "The route is not ready"],
      ],
    },
    {
      id: "editorial-judgment", type: "callout", tone: "warning", title: "Homeground editorial judgment",
      body: "The three-gate test, zero sightseeing credit on unverified edges and the rule against a water-to-international-flight chain are conservative planning judgments. Official sources establish node identities, heritage value, product distinctions and real suspension events; they do not guarantee that this module fits a particular traveller or date.",
    },
    {
      id: "help-cta", type: "callout", tone: "decision", title: "Want a human to test the fourth-stop decision?",
      body: "Leave the travel dates, party size, approximate budget, actual arrival and departure airports, luggage and whether the Guilin landscape is a top priority. Homeground can identify the weak edge and the first thing to cut without inventing a live timetable or publishing a full private itinerary.",
    },
    {
      id: "internal-links", type: "internal-links", title: "Continue planning", items: [
        { label: "Plan your first China trip", href: "/plan/", description: "Return to the parent planning path after deciding whether the fourth module survives." },
        { label: "Order Beijing, Xi'an and Shanghai", href: "/guides/beijing-xian-shanghai-route-order/", description: "Establish the three-city spine and international gateways before testing Guilin." },
        { label: "Choose the real Guilin arrival gateway", href: "/guides/guilin-airport-or-railway-station-arrival-guide/", description: "Compare KWL, Guilin, Guilin North and Guilin West after the module earns its place." },
        { label: "Compare Guilin and Yangshuo transport", href: "/guides/guilin-yangshuo-transport-route/", description: "Delegate the regional train, road and river endpoint decision." },
        { label: "Compare open-jaw and round-trip flights", href: "/guides/china-open-jaw-flights-route-planning/", description: "Test the international gateway structure before fixing the macro direction." },
        { label: "Check whether the whole trip is too rushed", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Audit the complete route only after this named module decision." },
      ],
    },
    {
      id: "sources", type: "sources", title: "Reviewed official, primary and image sources", items: [
        { label: "Foreign-passport rail passenger FAQ", url: "https://www.12306.cn/en/faq.html", publisher: "China Railway 12306", reviewedAt: "2026-09-01" },
        { label: "Civil aviation airport directory", url: "https://www.caac.gov.cn/GYMH/MHGK/MYJC/index_6.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-09-01" },
        { label: "Guilin Liangjiang International Airport", url: "https://gl.airport.gx.cn/", publisher: "Guangxi Airport Management Group", reviewedAt: "2026-09-01" },
        { label: "Guilin airport ground-transport channels", url: "https://gl.airport.gx.cn/html/jiaotongxinxi/jiaotonggongju/snjcdb/73.html", publisher: "Guilin Liangjiang International Airport", reviewedAt: "2026-09-01" },
        { label: "Current Guilin-region station and ground-transport nodes", url: "https://www.lijiangriver.com.cn/page/article/lyfw.jtcx", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "South China Karst World Heritage record", url: "https://whc.unesco.org/en/list/1248", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-09-01" },
        { label: "Dated Li River raft-section reopening notice", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/246", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "Li River essence-cruise route", url: "https://www.lijiangriver.cn/page/article/ylxl.ljjhy", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "Li River raft-route inventory", url: "https://www.lijiangriver.cn/page/article/ylxl.ljpfy", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "Li River official ticket channel", url: "https://www.lijiangriver.cn/page/article/lyfw.pwxx", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "Dated Li River suspension notice", url: "https://www.liriver.com.cn/mobile/article/zxlj.tzgg/191", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "Dated section reopening notice", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/252", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "Yulong River operating company", url: "https://www.ysylh.cn/about/", publisher: "Yangshuo Yulong River Scenic Area Tourism Development Co.", reviewedAt: "2026-09-01" },
        { label: "Yulong River product restrictions", url: "https://www.ysylh.cn/matou/2024/6a7d914728304f999d023243c40b8680.shtml", publisher: "Yangshuo Yulong River Scenic Area Tourism Development Co.", reviewedAt: "2026-09-01" },
        { label: "Guilin and Yangshuo weather portal", url: "https://gx.weather.com.cn/guilin/index.shtml", publisher: "China Weather", reviewedAt: "2026-09-01" },
        { label: "Guilin Railway Station by Rat2, CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Guilin_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-01" },
        { label: "Yangshuo Railway Station by Rat2, CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-01" },
        { label: "Creative Commons Attribution-ShareAlike 4.0 licence", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-09-01" },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
