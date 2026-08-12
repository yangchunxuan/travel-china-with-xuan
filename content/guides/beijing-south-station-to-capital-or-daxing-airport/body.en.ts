import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Beijing has two major airports in different directions. A connection from Beijing South begins by reading the flight's airport code and terminal, then subtracting railway exit, city transfer, airport walking and airline check-in from the flight deadline." },
  { id: "answer", type: "callout", title: "PEK and PKX are not substitute terminals", tone: "decision", body: "For PKX, compare a subway connection to the Daxing Airport Express at Caoqiao with a road vehicle. For PEK, compare the current Beijing South airport-bus route, subway/Airport Express and a road vehicle. The best answer changes with the exact hour, luggage, group and disruption margin." },
  { id: "matrix-heading", type: "heading", level: 2, text: "Choose the airport first, then the mode" },
  { id: "matrix", type: "table", caption: "Every option starts after the train is actually exited", columns: ["Chain", "Good fit", "Friction", "Verify"], rows: [
    ["Beijing South → subway → Daxing Airport Express → PKX", "Daytime, manageable luggage and live rail service", "Station corridors, transfers, separate airport express and terminal walk", "Current subway route, last train and flight terminal"],
    ["Beijing South → current airport bus → PEK", "A dated departure fits and its station stop is clear", "Waiting, road traffic, intermediate stops and terminal order", "Official platform, boarding point, departure and served terminal"],
    ["Beijing South → subway/Airport Express → PEK", "Rail is running and transfers suit the group", "Cross-city interchange and luggage through stations", "Live route, operating window and terminal"],
    ["Authorised taxi/ride-hail → either airport", "Several people, large bags or rail is closed", "Road variability, pickup-zone confusion and toll/traffic", "Airport code, terminal, legal pickup and realistic buffer"],
  ]},
  { id: "warning", type: "callout", title: "Do not follow the word 'Beijing Airport'", tone: "warning", body: "Show the driver PEK or PKX plus the terminal. Daxing is not a new terminal at Capital Airport, and Capital is not a terminal at Daxing. Protecting the wrong airport creates a cross-airport recovery problem, not a small detour." },
  { id: "clock-heading", type: "heading", level: 2, text: "Work backward from the airline cutoff" },
  { id: "clock", type: "list", ordered: true, items: ["Airline check-in/bag-drop and boarding deadline.", "Correct airport terminal walk and security/exit procedures.", "Road or rail journey plus disruption margin.", "Beijing South platform-to-exit walk and pickup/transfer.", "Train-delay allowance and a decision point for abandoning the connection."] },
  { id: "groups", type: "comparison", title: "What the traveller changes", columns: [
    { heading: "Light, daytime", items: ["Rail gives a predictable structure", "Keep every transfer name", "Check last service anyway"] },
    { heading: "Family or many bags", items: ["Count lifts and corridors", "A direct road vehicle may simplify", "Keep child-seat needs explicit"] },
    { heading: "Late arrival or international flight", items: ["Use a much larger buffer", "Know the live bus/rail cutoff", "A near-airport night can be the safer itinerary"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "Wrong airport or failing connection" },
  { id: "recovery", type: "table", caption: "Protect the flight before protecting the original plan", columns: ["Problem", "Response"], rows: [
    ["Train arrives late", "Recalculate against airline cutoff and switch only to a verified faster chain"],
    ["At the wrong airport", "Contact the airline immediately, then use the current official inter-airport or road option"],
    ["Direct Daxing bus appears in an old guide", "Do not rely on it: the Beijing South Daxing Night Line 2 was suspended from April 7, 2026"],
    ["Last rail service missed", "Use the official airport-bus platform or legal taxi queue; do not accept hall solicitors"],
  ]},
  { id: "facts", type: "callout", title: "Dynamic transport facts checked August 12, 2026", tone: "neutral", body: "Beijing's April 2026 notice retained/adjusted the Capital Airport–Beijing South bus and suspended Daxing Airport–Beijing South Night Line 2. A July 2026 notice extended the Capital Airport line's downtown-bound late service. Subway, airport express, buses, stops and hours remain date-specific." },
  { id: "help", type: "callout", title: "Need the rail-to-flight connection stress-tested?", tone: "decision", body: "Send the date, train number/arrival, airport code and terminal, flight time, people and bags. Homeground can identify the decision cutoff and backup; airlines and operators control live service." },
  { id: "links", type: "internal-links", title: "Protect the complete itinerary", items: [
    { label: "Which Beijing railway station?", href: "/guides/which-beijing-railway-station/", description: "Confirm the train really arrives at Beijing South." },
    { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Prepare the rail segment before the airport handoff." },
    { label: "China's last night before an international flight", href: "/guides/china-last-night-before-international-flight/", description: "Decide when not to attempt a same-day link." },
    { label: "Where to stay in Beijing", href: "/guides/beijing-where-to-stay-first-trip/", description: "Use a hotel night if the transfer is not defensible." },
  ]},
  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "April 2026 airport-bus route changes", url: "https://english.beijing.gov.cn/latest/news/202603/t20260330_4569792.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "July 2026 airport-bus update", url: "https://english.beijing.gov.cn/livinginbeijing/transportation/bus/202607/t20260727_4792045.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Rail links to seven stations and two airports", url: "https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202412/t20241216_3966828.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Hero: Beijing South by N509FZ, CC BY-SA 4.0; cropped", url: "https://commons.wikimedia.org/wiki/File:North_square_of_Beijing_South_Railway_Station_(20180722170459).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
