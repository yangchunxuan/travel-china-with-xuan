import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer", type: "lead",
      text: "Choose the direction only after locking two things: the international gateway you can actually ticket and the complete Huangshan access block. Use Shanghai → Hangzhou → Huangshan when the trip continues safely beyond the mountain. Use Huangshan → Hangzhou → Shanghai when Shanghai is the departure gateway. For a Shanghai round trip, put Huangshan in the middle and return to Shanghai before the flight; never treat a mountain descent as an airport connection. Hangzhou stays only when it has a protected local purpose, not merely because the rail line passes through it.",
    },
    {
      id: "three-lock-answer", type: "callout", tone: "decision", title: "The three-lock method",
      body: "Lock the flight gateway. Lock the Huangshan visit shape and the base choice through the existing Huangshan guide. Then decide whether Hangzhou is a genuine hinge, a pass-through or the first stop to remove. Search dated transport only after those decisions survive.",
    },
    {
      id: "scope-boundary", type: "callout", tone: "neutral", title: "A route-order guide, not three destination guides",
      body: "This page decides the sequence and recovery space among the three named places. It does not choose a Shanghai or Hangzhou hotel area, prescribe a Yellow Mountain hike, compare summit and Tangkou rooms, or publish live trains, flights, prices or opening times.",
    },
    { id: "nodes-heading", type: "heading", level: 2, text: "First replace the three city names with the places the journey actually touches" },
    {
      id: "node-chain", type: "table", caption: "The labels on a wish list hide different operating nodes", columns: ["Wish-list label", "Node that must be named", "Why the distinction changes the order"],
      rows: [
        ["Shanghai", "Actual airport, terminal, hotel and ticketed railway station", "Pudong, Hongqiao and the city's passenger stations are not one interchangeable gateway"],
        ["Hangzhou", "Actual railway station or airport plus the local place that earns the stay", "A transfer through a station is not a West Lake visit or a reason to move hotels"],
        ["Huangshan", "Ticketed station, road handoff, current booked gate, scenic transfer and below- or on-mountain base", "Arriving at Huangshan North is still several decisions away from mountain time"],
        ["Onward journey", "Named airport, station, hotel and fixed commitment", "The cost of a delayed mountain exit depends on what cannot move next"],
      ],
    },
    {
      id: "mountain-figure", type: "figure", src: "/images/guides/huangshan-summit-or-gateway-base/hero-1600.webp", width: 1600, height: 1000,
      alt: "Granite peaks of Mount Huangshan at sunrise.",
      caption: "A summit night can create a distinct early or late observation window, but this licensed photograph does not promise sunrise, cloud sea, weather or access on a future date.",
    },
    { id: "gateway-heading", type: "heading", level: 2, text: "Lock the international gateway before drawing the route line" },
    {
      id: "gateway-workbook", type: "list", ordered: true,
      items: [
        "Record the operating airline, arrival airport and terminal, departure airport and terminal, baggage arrangement and change conditions. A search result is not a ticketed gateway.",
        "If the flights use different cities, test whether those cities are genuinely at opposite ends of the land route. An open jaw that forces a return across the route has not removed backtracking.",
        "If both flights use Shanghai, write the return to Shanghai and the final city night into the route before allocating sightseeing. Do not leave them implied after Huangshan.",
        "If Hangzhou airport appears useful, verify the actual flight, terminal and ground chain with the operating airline and airport. Its existence does not guarantee a suitable international service for the date.",
      ],
    },
    {
      id: "round-trip-rule", type: "callout", tone: "warning", title: "A Shanghai round trip contains Shanghai twice for two different jobs",
      body: "The arrival stay handles jet lag and the start of the trip. The final stay absorbs a delayed road transfer, a changed mountain operation or a rail disruption before the international flight. They may share one city name, but the final buffer is not a bonus sightseeing day and should not disappear into the Huangshan block.",
    },
    { id: "mountain-lock-heading", type: "heading", level: 2, text: "Build the mountain block before deciding where Hangzhou goes" },
    {
      id: "mountain-contract", type: "list", ordered: true,
      items: [
        "Choose the purpose: one complete mountain day, a two-part visit with a summit night, or a lower-mountain stay with a separate Huizhou priority. Do not combine these labels into one generic ‘Huangshan day.’",
        "Use the Huangshan base guide to choose summit, Tangkou, hot-spring area or Tunxi/Huangshan city. This article accepts that result; it does not repeat the accommodation decision.",
        "Name the ticketed railway station and the verified road handoff. The November 2025 official transport notice proves that Huangshan North and several scenic gates are separate nodes, not that a particular departure will run for every date.",
        "Use the current booking direction and official notice to name the gate. A June 2026 government notice opened the East Gate and East Sea cableway, so old three-entrance summaries are already stale.",
        "Add the internal scenic transfer and the currently usable cableway or footpath. If any part is unknown, the arrival remains a transfer block and the route remains conditional.",
        "Protect the exit: allow the traveller to descend, collect luggage and reach the next staffed base without connecting directly to an international flight or another irreplaceable booking.",
      ],
    },
    {
      id: "base-handoff", type: "callout", tone: "neutral", title: "The summit-versus-gateway choice is covered in a separate guide",
      body: "A summit room can support divided mountain segments and early or late observation; Tangkou can protect the south-gate handoff; Tunxi can protect rail and urban time. Those are accommodation decisions. Here they matter only because each result changes the first and last safe transfer in the three-place route.",
    },
    {
      id: "station-figure", type: "figure", src: "/images/guides/shanghai-hangzhou-transport-route/hero-1600.webp", width: 1600, height: 1000,
      alt: "Interior of Hangzhou East railway station.",
      caption: "This licensed image identifies Hangzhou East on its capture date. It does not prove that a Shanghai or Huangshan train uses this station on the reader's date.",
    },
    { id: "hangzhou-heading", type: "heading", level: 2, text: "Make Hangzhou prove that it is a hinge, not a convenient label between trains" },
    {
      id: "hangzhou-test", type: "table", caption: "Three legitimate Hangzhou roles", columns: ["Role", "Evidence that it is real", "Route consequence"],
      rows: [
        ["Protected stay", "A complete local block exists for the named West Lake landscape, hills, canal or another distinct priority", "Keep a Hangzhou base between Shanghai and Huangshan"],
        ["Pass-through", "A dated station connection works but no local priority earns a hotel change", "Use the station only if the connection is robust; do not market it as a city visit"],
        ["First cut", "The only Hangzhou activity depends on a late arrival, early departure or unverified luggage solution", "Remove Hangzhou before shrinking the Huangshan safety chain or Shanghai flight buffer"],
      ],
    },
    { id: "route-traces-heading", type: "heading", level: 2, text: "Choose one of three route traces after the locks are visible" },
    {
      id: "route-traces", type: "comparison", title: "The order follows the fixed end, not a universal best direction", columns: [
        { heading: "Forward line", items: ["Shanghai is the confirmed arrival gateway.", "Hangzhou has a protected local role.", "The journey continues from Huangshan to a verified next node without a fragile same-day connection.", "Trace: Shanghai → Hangzhou → Huangshan → onward."] },
        { heading: "Reverse line", items: ["The journey approaches Huangshan from another verified node.", "Hangzhou remains a real stay after the mountain.", "Shanghai is the confirmed international departure gateway with a protected final buffer.", "Trace: Huangshan → Hangzhou → Shanghai."] },
        { heading: "Shanghai round trip", items: ["Both long-haul tickets use Shanghai.", "The mountain block sits away from the departure flight.", "Hangzhou stays only if its purpose survives the extra hotel and rail chain.", "Trace: Shanghai arrival → mountain/hinge sequence → Shanghai flight buffer."] },
      ],
    },
    { id: "traveller-traces-heading", type: "heading", level: 2, text: "Three travellers can use the same three names and need different orders" },
    {
      id: "trace-onward", type: "callout", tone: "neutral", title: "Trace A: Shanghai arrival, then a verified onward node after Huangshan",
      body: "The traveller has a ticketed Shanghai arrival, a distinct West Lake interest and a verified onward node after Huangshan. Shanghai → Hangzhou → Huangshan can work. The Huangshan arrival is still a transfer block, and the onward commitment must sit after the protected descent and road/rail handoff. If that final chain cannot be verified, the traveller reverses the broader trip or removes a lower-priority stop rather than calling the mountain day complete at the station.",
    },
    {
      id: "trace-reverse", type: "callout", tone: "neutral", title: "Trace B: verified approach to Huangshan, then Shanghai departure",
      body: "The traveller reaches Huangshan from a confirmed earlier node, has one named Hangzhou priority and flies internationally from Shanghai. Huangshan → Hangzhou → Shanghai is the safer direction because the departure buffer stays in the final city, not on the mountain. If descent or the road handoff slips, the traveller drops the flexible Hangzhou activity or shortens that stay; the Shanghai buffer and international flight are not compressed. If Hangzhou's only purpose cannot survive that recovery rule, it becomes a pass-through or is removed.",
    },
    {
      id: "trace-roundtrip", type: "callout", tone: "warning", title: "Trace C: Shanghai round trip with a fixed international departure",
      body: "The traveller wants a summit night and Hangzhou but flies home from Shanghai. A route that ends on Huangshan and rushes to the airport is rejected. The traveller can place Huangshan earlier, use Hangzhou as a lower-risk urban hinge if its dated links work, and finish in Shanghai; or travel Shanghai → Hangzhou → Huangshan and return to Shanghai for a separate final night. The winning version is the one with the stronger dated chain and recovery, not the prettier line on a map.",
    },
    { id: "failure-heading", type: "heading", level: 2, text: "Repair the dependency that failed instead of compressing the whole trip" },
    {
      id: "failure-recovery", type: "table", caption: "Recovery order when one assumption changes", columns: ["Failure", "First safe response", "Route-level decision"],
      rows: [
        ["Preferred train or station pair is unavailable", "Search the actual date and nearby usable station pairs in 12306", "Keep the order only if the whole hotel-to-hotel chain still works; otherwise reverse or remove the hinge"],
        ["Booked gate, cableway or path changes", "Follow the current scenic-area notice and redraw only within the traveller's ability", "Protect the exit buffer; do not invent an unverified walking replacement"],
        ["Mountain weather removes the expected view", "Keep the visit only if the landscape experience still has value without that view", "Use the flexible urban block rather than moving an international flight"],
        ["Descent or road handoff runs late", "Contact the next staffed hotel and discard the flexible activity", "Use the city buffer; never race a separate international ticket"],
        ["Hangzhou loses its protected purpose", "Convert it to a verified connection or remove it", "Return the saved time to Huangshan recovery or the departure gateway"],
      ],
    },
    { id: "dynamic-heading", type: "heading", level: 2, text: "Treat current mountain operations as a final verification layer" },
    {
      id: "dynamic-checks", type: "list",
      items: [
        "At the first cancellable-booking deadline: recheck the selected gate, base, road handoff and every dated rail leg.",
        "About one week before the mountain visit: read the scenic-area notice inventory for maintenance, seasonal closures and special controls.",
        "The day before: recheck the official weather and operations notice, then retain the pre-agreed turn-back or below-mountain alternative.",
        "On the day: the operating authority's instructions override this evergreen framework. A forecast never guarantees sunrise or cloud sea.",
      ],
    },
    { id: "final-heading", type: "heading", level: 2, text: "The route is ready only when every handoff has a named check and fallback" },
    {
      id: "final-verification", type: "table", caption: "Final dated handoff", columns: ["Decision", "Primary verifier", "If still unknown"],
      rows: [
        ["International start and finish", "Operating airline and named airport", "Keep both directions provisional"],
        ["Shanghai and Hangzhou station pairs", "China Railway 12306 plus the exact hotel address", "Do not promise the order or a move-day visit"],
        ["Huangshan station-to-gate chain", "Scenic-area and passenger-transport official channels", "Count a transfer night and no mountain block"],
        ["Base, luggage and mountain route", "Named property plus current scenic authority", "Use the below-mountain fallback from the base guide"],
        ["Weather, maintenance and exit buffer", "Current scenic-area notices and traveller constraints", "Keep the fixed departure separate and remove the flexible activity"],
      ],
    },
    {
      id: "editorial-judgment", type: "callout", tone: "warning", title: "Homeground editorial judgment",
      body: "Putting the mountain block before the timetable, treating Hangzhou as a hinge and refusing a same-day mountain-to-international-flight connection are conservative planning judgments. Official sources establish airports, heritage geography, transport nodes and current operating changes; they do not certify this route for a particular traveller.",
    },
    {
      id: "help-cta", type: "callout", tone: "decision", title: "Need a human to test the three locks?",
      body: "Leave the travel dates, party size, approximate budget, actual arrival and departure airports, luggage and whether sunrise or a complete West Lake block matters more. Homeground can identify the weak handoff and explain what still needs dated verification before you commit.",
    },
    {
      id: "internal-links", type: "internal-links", title: "Continue planning", items: [
        { label: "Shanghai destination planner", href: "/destinations/shanghai/", description: "Choose Shanghai nights and districts after fixing the gateway role." },
        { label: "Hangzhou destination planner", href: "/destinations/hangzhou/", description: "Decide whether Hangzhou has enough local purpose to remain a base." },
        { label: "Choose the Shanghai–Hangzhou station pair", href: "/guides/shanghai-hangzhou-transport-route/", description: "Execute the dated door-to-door rail decision after the route order is set." },
        { label: "Choose a Huangshan base", href: "/guides/huangshan-summit-or-gateway-base/", description: "Select summit, Tangkou, hot-spring or urban rail base without repeating that decision here." },
        { label: "Compare open-jaw and round-trip gateways", href: "/guides/china-open-jaw-flights-route-planning/", description: "Test the international airfare structure before committing to one direction." },
      ],
    },
    {
      id: "sources", type: "sources", title: "Reviewed official and primary sources", items: [
        { label: "Dated rail search and passenger rules", url: "https://www.12306.cn/en/faq.html", publisher: "China Railway 12306", reviewedAt: "2026-09-01" },
        { label: "Shanghai flight gateway query", url: "https://www.shairport.com/flights/index.html", publisher: "Shanghai Airport Group", reviewedAt: "2026-09-01" },
        { label: "Guide to Shanghai railway stations", url: "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-09-01" },
        { label: "Hangzhou airport flight query", url: "https://www.hzairport.com/En/flight/index.html", publisher: "Hangzhou Xiaoshan International Airport", reviewedAt: "2026-09-01" },
        { label: "West Lake Cultural Landscape", url: "https://whc.unesco.org/en/list/1334/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-09-01" },
        { label: "Mount Huangshan World Heritage record", url: "https://whc.unesco.org/en/list/547/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-09-01" },
        { label: "Huangshan North to scenic gates transport notice", url: "https://hsgwh.huangshan.gov.cn/xwzx/tzgg/9308852.html", publisher: "Huangshan Scenic Area Administrative Committee", reviewedAt: "2026-09-01" },
        { label: "Official scenic-area transfer information", url: "https://hsgwh.huangshan.gov.cn/lyfw/lyfw/jqhc/9197913.html", publisher: "Huangshan Scenic Area Administrative Committee", reviewedAt: "2026-09-01" },
        { label: "East Gate and East Sea cableway opening", url: "https://www.huangshan.gov.cn/zwgk/public/6615714/12097855.html", publisher: "Huangshan Municipal People's Government", reviewedAt: "2026-09-01" },
        { label: "Current Huangshan operations notices", url: "https://hsgwh.huangshan.gov.cn/xwzx/tzgg/index.html", publisher: "Huangshan Scenic Area Administrative Committee", reviewedAt: "2026-09-01" },
        { label: "Mount Huangshan sunrise by Politizer, CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:Huangshan_sunrise.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-01" },
        { label: "Creative Commons Attribution 3.0 licence", url: "https://creativecommons.org/licenses/by/3.0/", publisher: "Creative Commons", reviewedAt: "2026-09-01" },
        { label: "Hangzhou East station by Staeiou, CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Hangzhou_East_railway_station_interior.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-01" },
        { label: "Creative Commons Attribution-ShareAlike 4.0 licence", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-09-01" },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
