import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Jiuzhaigou is not one lakeside path. Its visitor route branches like a Y: Shuzheng Valley forms the stem, while Rize and Zechawa form the two arms. In one day, the sightseeing bus is the skeleton and walking is the detail. The winning plan is not to tick every named lake; it is to protect one long scenic sequence, one short high-valley sequence and enough time to descend the stem without racing the closing system." },
    { id: "answer", type: "callout", title: "The direct answer", tone: "decision", body: "Start at the entrance early, follow the live dispatch to one upper branch, use the bus for long altitude-changing transfers and walk only between stops that staff confirm are connected that day. Give Rize Valley the largest share if Five Flower Lake, Pearl Shoal and forest-water scenery are your priority. Treat Zechawa as a focused Long Lake–Five-Color Pond branch, not a second full hike. Finish through selected Shuzheng stops. If the day slips, cut duplicated lakes and distant walks before cutting the safe return buffer." },
    { id: "shape-heading", type: "heading", level: 2, text: "Read the Y before choosing attractions" },
    { id: "shape", type: "table", caption: "Three valleys, three different jobs", columns: ["Valley", "Role in a first day", "What not to assume"], rows: [
      ["Rize Valley (right arm)", "The richest sequence for many first visits: forest, coloured lakes, shoals and waterfalls", "That every upper stop, boardwalk or one-way link is open"],
      ["Zechawa Valley (left arm)", "A high, focused branch led by Long Lake and Five-Color Pond", "That seasonal lakes deserve a long walk; the official route notes buses do not stop there"],
      ["Shuzheng Valley (stem)", "The descent corridor and final selection of waterfalls, lakes, villages and boardwalks", "That you can postpone the whole stem until the last minutes and still see it well"],
    ] },
    { id: "bus-heading", type: "heading", level: 2, text: "Use the sightseeing bus as a routing system, not a hop-on guarantee" },
    { id: "bus-copy", type: "paragraph", text: "Jiuzhaigou's official visitor material describes the buses as part of the site's unified management, and its current route page explains the three-valley structure. On the ground, dispatch, stop patterns, crowd controls, weather and maintenance can change which branch is served first and where passengers may get off. A map from another season cannot overrule the driver, display or staff instruction in front of you." },
    { id: "boarding", type: "list", ordered: true, items: [
      "Photograph the current map after entry and mark the operating stops, not every attraction printed on a souvenir map.",
      "At the first boarding point, ask which branch the vehicle is serving before committing to a walking plan.",
      "When leaving a bus, confirm the next legal boarding point and whether the boardwalk continues in the intended direction.",
      "Keep the entrance name and a screenshot of the final descent plan available offline.",
      "Recalculate after lunch; do not wait for the last valley to discover that the return system is closing."
    ] },
    { id: "three-plans-heading", type: "heading", level: 2, text: "Choose one of three honest day shapes" },
    { id: "plans", type: "comparison", title: "Your priority determines the cuts", columns: [
      { heading: "Water-and-forest first", body: "Give Rize the longest continuous block, make Zechawa a concise high-valley visit, then keep two or three Shuzheng stops. Best for a first visit when the coloured lakes and waterfalls are the reason to come." },
      { heading: "Low-walking day", body: "Use buses between confirmed stops, choose short viewpoints and keep only one modest boardwalk. Long Lake and selected bus-accessible lake views can work, but altitude, stairs and queue standing still count." },
      { heading: "Photography with patience", body: "Protect fewer places for longer, accept that clouds and reflections change, and avoid chasing the same composition at several lakes. Never block a boardwalk or leave the permitted route for an empty frame." }
    ] },
    { id: "rize-heading", type: "heading", level: 2, text: "Rize Valley: protect one connected sequence" },
    { id: "rize", type: "paragraph", text: "Five Flower Lake is an obvious anchor, but the value of Rize comes from how water, forest, tufa and falling elevation change between stops. If the live boardwalk network permits, choose one connected walk around a lake-and-waterfall group rather than repeatedly boarding for adjacent pins. Panda Lake, Five Flower Lake, Pearl Shoal and Mirror Lake may not all fit with equal depth. Decide which landscape process you want to see, then let current access decide the exact pair or sequence." },
    { id: "zechawa-heading", type: "heading", level: 2, text: "Zechawa Valley: make the altitude change count" },
    { id: "zechawa", type: "paragraph", text: "Long Lake and Five-Color Pond create a compact contrast: the long, high mountain lake and a much smaller mineral-colour pool. The official route page explicitly says the upper and lower Seasonal Lakes are seasonal, buses do not stop there and the walking distance is too long for the standard visit. That is a useful official permission to skip—not a failure to complete Jiuzhaigou." },
    { id: "shuzheng-heading", type: "heading", level: 2, text: "Shuzheng Valley: spend the remaining time deliberately" },
    { id: "shuzheng", type: "table", caption: "A late-day selection rule", columns: ["If you still have…", "Choose", "Cut"], rows: [
      ["A comfortable block", "One waterfall or shoal, one lake cluster and a confirmed boardwalk section", "Repeated photo-only bus stops"],
      ["A short block", "The clearest operating stop with a direct return connection", "A long village detour or uncertain downstream walk"],
      ["Very little time", "Stay on the return system and enjoy views from legal stops or the vehicle", "Any plan that depends on catching a final unverified bus"],
    ] },
    { id: "cuts", type: "callout", title: "What to cut first", tone: "warning", body: "Cut a second lake with a similar viewing task, a long walk to a stop the bus does not serve, shopping that can wait until outside, and any upper branch that current staff say cannot be completed safely. Do not cut the return margin, food and water, weather layers, or the time needed to follow a changed boarding instruction." },
    { id: "failure-heading", type: "heading", level: 2, text: "Recover when the park does not follow your screenshot" },
    { id: "failure", type: "table", caption: "Common failure and recovery", columns: ["Failure", "Recovery"], rows: [
      ["Bus serves the other branch first", "Reverse the branch order; keep the same priority and cut list"],
      ["A boardwalk or stop is closed", "Stay with the operating bus network and choose the nearest non-duplicative view"],
      ["Cloud, rain or snow reduces visibility", "Prioritise close water-and-forest scenes, reduce slippery walking and obey weather controls"],
      ["Crowds consume the morning", "Drop one branch depth target; do not try to recover time by running or skipping food"],
      ["Someone struggles with altitude or exertion", "Stop ascending, seek staff or medical help and shorten the route immediately"],
    ] },
    { id: "not-transport", type: "callout", title: "This page begins after the park gate", tone: "neutral", body: "It does not own Chengdu-to-Jiuzhaigou trains, buses, flights, hotels or road transfers. Those decisions belong to the dedicated transport guide. A late arrival at the valley is not solved by compressing this full park day." },
    { id: "checklist", type: "list", items: [
      "Reopen the official Jiuzhaigou notice and ticket channel for the travel date.",
      "Check weather, elevation-appropriate clothing and any temporary closure.",
      "Carry water, a simple lunch plan and offline Chinese place names.",
      "Set a midday decision time and a latest acceptable departure from the upper branches.",
      "Use only open boardwalks and the current sightseeing-bus instructions."
    ] },
    { id: "links", type: "internal-links", title: "Connect the park day", items: [
      { label: "Chengdu to Jiuzhaigou transport", href: "/guides/chengdu-jiuzhaigou-transport-route/", description: "Choose the city-to-valley route and protect the arrival night." },
      { label: "Hub-and-spoke or multi-base route", href: "/guides/china-hub-and-spoke-or-multi-base-route/", description: "Decide whether northern Sichuan deserves its own overnight base." },
      { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Count transfers and recovery, not only attraction names." },
      { label: "China with older parents", href: "/guides/china-itinerary-with-older-parents/", description: "Adjust altitude, walking and recovery across the whole trip." },
      { label: "China public holidays", href: "/guides/china-public-holidays-travel-calendar/", description: "Check crowd-pressure dates before fixing the park day." }
    ] },
    { id: "sources", type: "sources", title: "Sources reviewed", items: [
      { label: "Official Jiuzhaigou route structure and ways to visit", url: "https://www.jiuzhai.com/intelligent-service/way-of-play", publisher: "Jiuzhaigou Scenic Area Administration", reviewedAt: "2026-08-22" },
      { label: "Jiuzhaigou World Heritage description and management", url: "https://whc.unesco.org/en/list/637", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-22" },
      { label: "Sightseeing-bus management as conservation practice", url: "https://whc.unesco.org/en/list/637/bestpractice", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-22" },
      { label: "Hero: Five Flower Lake by Chensiyuan, CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:1_jiuzhaigou_valley_wu_hua_hai_2011b.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
