import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "West Lake is a landscape to read in sections, not a fitness test around a blue shape on a map. The shore, causeways, islands, hills and city edge create different experiences. For a first visit, choose one main mode—walking, boat or bicycle—and use a second only as a connector. The goal is a coherent half day with an exit, not a complete circumference." },
    { id: "answer", type: "callout", title: "The direct answer", tone: "decision", body: "Walk when stories, gardens and changing shore detail matter most. Take a currently operating official boat when the water perspective or an island is the priority. Use a legal shared bicycle only for a practical connector on permitted roads and paths, not for a continuous lakeside loop. Most first visitors should combine a focused walk with one boat or transit exit rather than attempt all three at full length." },
    { id: "mode-heading", type: "heading", level: 2, text: "Each mode solves a different problem" },
    { id: "mode", type: "table", caption: "Choose the main mode", columns: ["Mode", "What it reveals", "Hidden cost"], rows: [
      ["Walk", "Causeway scale, gardens, bridges, inscriptions and the changing relationship between lake and hills", "Distance accumulates; a map line ignores heat, crowds and detours"],
      ["Boat", "Water-level perspective, island access and a clean break between shore sections", "Route, pier, weather, queues and last service are dynamic"],
      ["Bicycle", "A faster connector between selected land areas", "Parking zones, no-riding areas, traffic and account/payment access can interrupt the plan"],
    ] },
    { id: "anchor-heading", type: "heading", level: 2, text: "Choose one shore story" },
    { id: "anchors", type: "comparison", title: "Three useful first-visit anchors", columns: [
      { heading: "City edge and Broken Bridge", body: "Best for an immediate relationship between central Hangzhou, the lake and the Bai Causeway/Gushan direction. Easy to shorten, but often crowded." },
      { heading: "Su Causeway and the western shore", body: "Best for long water-and-hill views, garden stops and a slower landscape day. Distances are larger than the postcard suggests." },
      { heading: "Southern shore and Leifeng area", body: "Best when Leifeng Pagoda, evening light or a south-lake route is the anchor. A ticketed attraction can consume the time reserved for the shore." }
    ] },
    { id: "walk-heading", type: "heading", level: 2, text: "Walking works when the route has a stop rule" },
    { id: "walk", type: "paragraph", text: "Build a one-direction walk between two strong exit points. For example, move from the city edge toward Gushan and exit, or take a bounded section of the Su Causeway and leave by bus or car. Do not promise yourself the entire lake before learning the temperature, footpath pressure and how long each garden or museum actually holds your attention." },
    { id: "boat-heading", type: "heading", level: 2, text: "A boat should change the route, not decorate it" },
    { id: "boat", type: "paragraph", text: "Use a boat when it creates a meaningful water view, reaches a named island or transfers you to a shore that supports the next task. Confirm the operator, exact pier, route, ticket conditions and last service in the official channel on the day. A small boat, sightseeing boat and island route may have different boarding and return logic; never assume every boat completes a circle or accepts the same ticket." },
    { id: "bike-heading", type: "heading", level: 2, text: "Cycling is a connector with legal gaps" },
    { id: "bike", type: "callout", title: "Do not draw a bicycle line directly around the water", tone: "warning", body: "Pedestrian sections, scenic-area controls, crowded causeways, docking rules and city traffic make a continuous shore-hugging ride unrealistic. Use a bicycle only where current signs permit it, dismount in crowded or prohibited areas, park in an authorised zone and keep a public-transport fallback if the app or return zone fails." },
    { id: "plans-heading", type: "heading", level: 2, text: "Three practical half-day plans" },
    { id: "plans", type: "table", caption: "Pick one; do not merge all three", columns: ["Plan", "Sequence", "Who it suits"], rows: [
      ["Classic first look", "City-edge lake view → Bai Causeway/Gushan walk → transit exit", "First visitors wanting shore detail without a full loop"],
      ["Water-and-garden", "Western/southern garden anchor → official boat if operating → short opposite-shore walk", "Travellers who value landscape composition and seated recovery"],
      ["Fast connector", "One focused walk → legal bicycle or metro/bus transfer → one final viewpoint", "Repeat visitors or people with a separate timed attraction"],
    ] },
    { id: "exit-heading", type: "heading", level: 2, text: "Design the exit before starting" },
    { id: "exit", type: "list", items: [
      "Save two transit or legal pickup exits in Chinese, not just one final hotel pin.",
      "Set a weather and fatigue checkpoint after the first causeway or attraction.",
      "If taking a boat, confirm which shore or pier it actually delivers you to.",
      "If cycling, confirm where the bicycle can be legally returned before entering a no-riding section.",
      "Keep food, toilets and one seated stop inside the route rather than treating them as delays."
    ] },
    { id: "weather", type: "table", caption: "Weather changes the best mode", columns: ["Condition", "Better response"], rows: [
      ["Hot and humid", "Short shaded walks, early/late hours and a seated transfer; avoid a proud full loop"],
      ["Rain", "Use non-slip footwear, shorten exposed causeways and verify boat operation"],
      ["Strong wind or storm warning", "Follow scenic-area and operator closures; use an indoor Hangzhou plan"],
      ["Peak crowds", "Choose one less compressed shore section and transit around the bottleneck"],
    ] },
    { id: "recovery", type: "callout", title: "If the day is already going wrong, stop adding modes", tone: "decision", body: "When a boat is suspended, a shared-bike account fails or feet are sore, do not replace the lost segment with another ambitious loop. Keep the strongest nearby shore story, use public transport or a legal pickup and protect the next meal, train or hotel check-in." },
    { id: "boundary", type: "callout", title: "This page does not own every West Lake attraction", tone: "neutral", body: "It owns the walk/boat/bicycle choice and exit logic. Individual museums, pagodas, temples, performances and seasonal events retain their own live rules. The White Snake guide owns the legend and its Hangzhou–Zhenjiang cultural context." },
    { id: "links", type: "internal-links", title: "Continue planning Hangzhou", items: [
      { label: "Hangzhou destination hub", href: "/destinations/hangzhou/", description: "Choose nights, areas and the rest of the city." },
      { label: "White Snake legend", href: "/guides/white-snake-legend-hangzhou-zhenjiang/", description: "Understand why several lake places carry more than scenic value." },
      { label: "Shanghai to Hangzhou transport", href: "/guides/shanghai-hangzhou-transport-route/", description: "Keep the lake visit separate from the intercity transfer." },
      { label: "Shanghai–Suzhou–Hangzhou–Nanjing order", href: "/guides/shanghai-suzhou-hangzhou-nanjing-route-order/", description: "Place Hangzhou correctly in a Jiangnan route." },
      { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Count walking, exits and attraction depth honestly." }
    ] },
    { id: "sources", type: "sources", title: "Primary sources and image credit", items: [
      { label: "West Lake Scenic Area official information portal", url: "https://westlake.hangzhou.gov.cn/", publisher: "Hangzhou West Lake Scenic Area Management Committee", reviewedAt: "2026-08-22" },
      { label: "West Lake Cultural Landscape", url: "https://whc.unesco.org/en/list/1334", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-22" },
      { label: "Hero: West Lake and Hangzhou skyline by Windmemories, CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:20260424_West_Lake_and_Hangzhou_Skyline.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
