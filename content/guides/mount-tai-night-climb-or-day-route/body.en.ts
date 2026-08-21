import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Mount Tai's sunrise has turned the night climb into a bucket-list image, but darkness removes much of the cultural landscape that made the mountain important. The historic Red Gate path, the vehicle route from Tianwai Village and the summit cableway are different experiences. Choose by what you want to understand and how you will descend—not by the most dramatic social post." },
    { id: "answer", type: "callout", title: "The direct answer", tone: "decision", body: "Choose the Red Gate day hike if inscriptions, gates, temples and the historic ascent matter and your knees can manage thousands of steps. Choose the official bus-and-cableway chain if summit access matters more than the full path or walking capacity is limited. Choose a night climb only with a current open route, suitable weather, light, layers, companions and a safe descent plan—and accept that sunrise is never guaranteed." },
    { id: "routes-heading", type: "heading", level: 2, text: "Three routes, three different Mount Tais" },
    { id: "routes", type: "table", caption: "Route identity", columns: ["Route", "Core experience", "Main risk"], rows: [
      ["Red Gate day hike", "The traditional cultural ascent through gates, steles and changing views", "Large stair load and a demanding descent"],
      ["Tianwai Village bus + optional cableway", "Faster access to Zhongtian Gate and the summit zone", "Queues, vehicle/cableway suspension and less of the historic path"],
      ["Red Gate night climb", "Night ascent and possible sunrise from the summit", "Darkness, cold, crowd pressure, fatigue and no sunrise guarantee"],
    ] },
    { id: "heritage-heading", type: "heading", level: 2, text: "The day hike reveals why the mountain matters" },
    { id: "heritage", type: "paragraph", text: "The Mount Tai administration describes the Dai Temple–Red Gate–summit route as the traditional imperial ascent, with temples, gates, steles and cliff inscriptions along the stone stairway. UNESCO treats Mount Taishan as a mixed cultural and natural property shaped by millennia of worship, imperial ritual, art and landscape. In daylight, the route is not merely exercise: each gate changes the mountain's symbolic and physical order." },
    { id: "day-hike", type: "list", ordered: true, items: [
      "Confirm the Red Gate route is open and identify the current entrance and last acceptable summit/descent choices.",
      "Start early enough to read the lower and middle mountain rather than racing it.",
      "At Zhongtian Gate, reassess knees, weather and daylight before the steep final ascent.",
      "Use the cableway only if currently operating and if its queue helps rather than harms the plan.",
      "Choose a descent before fatigue makes the decision for you; down stairs can be harder than up."
    ] },
    { id: "bus-heading", type: "heading", level: 2, text: "The vehicle route is a valid summit route, not a shortcut to every heritage stop" },
    { id: "bus", type: "paragraph", text: "The official scenic information describes a Tianwai Village vehicle route to Zhongtian Gate followed by an optional cableway toward the summit. Scenic vehicles, not private cars, control the mountain road. This is the better choice when summit access, limited time or reduced stair capacity dominates, but it does not recreate the Red Gate cultural sequence." },
    { id: "night-heading", type: "heading", level: 2, text: "Night climbing: decide with five vetoes" },
    { id: "night", type: "table", caption: "Any one can cancel the night plan", columns: ["Veto", "Why"], rows: [
      ["Route not officially open", "An old 24-hour listing cannot override a current closure or restricted entry"],
      ["Storm, ice, strong wind or dangerous cold", "Summit exposure and wet/icy stairs make the plan unsafe"],
      ["No reliable light or warm layer", "A phone torch and rented coat of uncertain availability are not a safety system"],
      ["Solo traveller without a clear contact/meeting plan", "Fatigue, falls and phone failure become harder to recover from"],
      ["No descent plan", "Reaching sunrise exhausted is only half the mountain task"],
    ] },
    { id: "sunrise", type: "callout", title: "Sunrise is a weather possibility, not a ticket benefit", tone: "warning", body: "Cloud, fog, rain and seasonal conditions can remove the view. Do not push through a closure, leave the marked route or wait beyond the safe descent window for a photograph. The night climb should still make sense if the sky stays grey." },
    { id: "descent-heading", type: "heading", level: 2, text: "Plan the descent before the ascent" },
    { id: "descent", type: "comparison", title: "Three descent choices", columns: [
      { heading: "Walk down", body: "Keeps the path experience but multiplies knee load and fatigue. Best only when fitness, daylight and weather remain strong." },
      { heading: "Cableway + scenic bus", body: "Reduces stair load when operating, but queues and suspension can occur. Confirm the current route and final vehicle connection." },
      { heading: "Mixed descent", body: "Walk one meaningful section and use official transport for the rest. Choose the handoff in advance rather than improvising when exhausted." }
    ] },
    { id: "failure", type: "table", caption: "Failure and recovery", columns: ["Problem", "Response"], rows: [
      ["Cableway suspended", "Follow staff instructions; shorten the summit stay and use the safe open route"],
      ["Weather deteriorates", "Turn around or descend through the official system before the route becomes harder"],
      ["Knee pain at Zhongtian Gate", "Stop the stair objective; use official transport if available or descend safely"],
      ["Night group separates", "Regroup at the pre-agreed staffed landmark; do not leave the marked path to search"],
      ["Sunrise is hidden", "Begin the planned descent; do not wait indefinitely in cold or crowd pressure"],
    ] },
    { id: "what-to-pack", type: "list", items: [
      "Current official route and weather information saved offline.",
      "Grippy footwear, layers, rain protection, water and food appropriate to the route.",
      "A real headlamp for darkness plus backup power; hands remain free.",
      "Chinese names for the entrance, Zhongtian Gate, summit and intended descent.",
      "A latest turnaround time and a hotel/onward plan that survives delay."
    ] },
    { id: "boundary", type: "callout", title: "This page does not promise opening hours or rent gear", tone: "neutral", body: "Route hours, ticketing, scenic vehicles, cableways, weather controls and summit facilities are dynamic. Reopen the Mount Tai administration's notice on the day. The page owns the route decision and risk logic, not a frozen operating table." },
    { id: "links", type: "internal-links", title: "Connect Mount Tai", items: [
      { label: "Shandong coastal rail arc", href: "/guides/shandong-peninsula-coastal-city-rail-arc/", description: "Keep Tai'an's mountain stop separate from the peninsula rail route." },
      { label: "China high-speed train guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Handle the rail arrival and passport boarding process." },
      { label: "China with older parents", href: "/guides/china-itinerary-with-older-parents/", description: "Choose a mountain alternative and recovery day." },
      { label: "China public holidays", href: "/guides/china-public-holidays-travel-calendar/", description: "Avoid combining summit crowd pressure with a fragile route." },
      { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Count ascent, descent and next-day recovery." }
    ] },
    { id: "sources", type: "sources", title: "Primary sources and image credit", items: [
      { label: "Official Mount Tai routes and scenic information", url: "https://tsgw.taian.gov.cn/col/col204913/index.html", publisher: "Mount Tai Scenic Area Management Committee", reviewedAt: "2026-08-22" },
      { label: "Mount Taishan World Heritage description", url: "https://whc.unesco.org/en/list/437", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-22" },
      { label: "Hero: Jade Emperor Peak, CC0", url: "https://commons.wikimedia.org/wiki/File:Jade_Emperor_Peak_of_Mount_Tai_%E6%B3%B0%E5%B1%B1%E7%8E%89%E7%9A%87%E9%A1%B6_2007_075.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
