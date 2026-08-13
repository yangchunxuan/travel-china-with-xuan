import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Do not tell a driver only ‘Dali Old Town.’ Before the train arrives, ask the accommodation for the closest vehicle-accessible gate or roadside meeting point. South Gate, Erhai Gate on the east side, Cangshan/West Gate and North Gate lead to different final walks. The useful route is Dali Railway Station → confirmed gate → reachable hotel entrance, not station → a generic old-town pin." },
  { id: "answer", type: "callout", title: "The hotel owns the drop-off decision", tone: "decision", body: "Send the hotel your arrival time and luggage, then ask in writing: ‘Which gate or road point can a taxi reach?’ Save its Chinese reply. At Dali Station, compare the current official bus/direct-service information with a taxi or licensed pickup to that exact point. A historic route number can identify a corridor, but only today’s official page or stop display can confirm operation." },
  { id: "before-heading", type: "heading", level: 2, text: "Before the train reaches Dali" },
  { id: "before", type: "list", ordered: true, items: [
    "Save the full Chinese hotel name, phone number and map pin offline.",
    "Ask for the nearest vehicle-accessible gate—not merely the nearest landmark on foot.",
    "Ask whether the last section has stone paving, stairs, pedestrian restrictions or a hotel luggage cart.",
    "Tell the hotel the number and size of cases, children, older travellers and slower walkers.",
    "Screenshot the agreed meeting point and a second roadside option outside streets with vehicle restrictions."
  ]},
  { id: "card-heading", type: "heading", level: 2, text: "Chinese destination card" },
  { id: "card", type: "callout", title: "Show this structure to the driver", tone: "neutral", body: "目的地：〔酒店完整中文名〕 / 下车点：〔大理古城南门游客中心、洱海门、苍山门/大理古城西门，或大理古城北门〕 / 联系电话：〔酒店电话〕 / 备注：我们有〔行李数量〕件行李，请送到车辆可以到达、离酒店最近的位置。 Keep the hotel’s own wording; do not choose a gate from this list without confirmation." },
  { id: "gate-heading", type: "heading", level: 2, text: "Use the gate as a last-mile corridor" },
  { id: "gate-matrix", type: "table", caption: "Directional guide; current access still needs a hotel check", columns: ["Drop-off corridor", "Often useful when the lodging is near", "Known official transport context", "Last-mile risk"], rows: [
    ["大理古城南门游客中心 · South Gate Visitor Centre", "South Fuxing Road/Wenxian Road side", "Dali official guidance has directed station visitor services to the South Gate area", "The visitor centre is not every south-side hotel; a pedestrian segment may remain"],
    ["洱海门 · Erhai Gate / east side", "East Renmin Road or east Yuer Road side", "Official Dali guidance has identified the Route 8 corridor near Erhai Gate", "An old route reference is not a live timetable; east-side lanes vary in vehicle access"],
    ["苍山门 / 大理古城西门 · Cangshan/West Gate", "West old-town or Cangshan side", "A transport-authority route description has included the West Gate corridor", "Wrong-side drop-off can leave a long cross-town stone-street walk"],
    ["大理古城北门 · North Gate", "North old-town addresses", "Official destination guidance has identified city buses toward the North Gate area", "The exact bus terminus and hotel entrance can differ; recheck today"]
  ]},
  { id: "station-heading", type: "heading", level: 2, text: "From platform to the correct vehicle" },
  { id: "station-steps", type: "list", ordered: true, items: [
    "Follow station exit signs and keep the group together until all luggage is collected.",
    "Ignore unsolicited ‘old town’ offers until the Chinese destination card and vehicle identity are clear.",
    "For public transport, read the current stop board or official operator channel for the named gate; do not board only because a bus says 古城.",
    "For taxi/ride-hailing, select the official pickup area and send the destination card before loading.",
    "Share the vehicle details with the hotel and ask it to track the agreed arrival point.",
    "At the gate, contact the hotel before unloading if the street, sign or remaining walk does not match the screenshot."
  ]},
  { id: "travellers-heading", type: "heading", level: 2, text: "Two travellers need different last miles" },
  { id: "travellers", type: "comparison", title: "Luggage and walking tolerance change the mode", columns: [
    { heading: "Light bag, daytime", items: ["Current public transport can be efficient", "Verify the gate stop today", "Accept only a known final walk"] },
    { heading: "Family or large cases", items: ["Use a vehicle with confirmed capacity", "Ask for the most reachable hotel-side point", "Arrange hotel help before arrival"] },
    { heading: "Late arrival or slower walker", items: ["Prefer the fewest uncertain transfers", "Confirm check-in and phone coverage", "Do not experiment with a distant gate"] }
  ]},
  { id: "dynamic", type: "callout", title: "Route numbers are dynamic operating facts", tone: "warning", body: "Dali and Yunnan transport authorities have described station-to-old-town services and the South, West and Erhai Gate corridors, and authorities add capacity in peaks. That evidence does not guarantee a future departure, fare, stop or operating hour. Check the current station display, official public-transport channel or staffed desk on the travel date." },
  { id: "recovery-heading", type: "heading", level: 2, text: "What to do after a wrong drop-off" },
  { id: "recovery", type: "table", caption: "Do not start a long cross-town walk by default", columns: ["Problem", "Immediate response", "Next step"], rows: [
    ["Driver names a different gate before departure", "Keep luggage unloaded and show the hotel message", "Ask the hotel to speak with the driver or change the destination in the app"],
    ["You are dropped at the wrong gate", "Stay at a lit, identifiable roadside point and contact the hotel", "Use a marked taxi/ride-hailing pickup for the corrected gate; save the new vehicle record"],
    ["Vehicle cannot enter the lane", "Confirm that this is the agreed reachable point before unloading", "Request the hotel cart, porter or a precise walking escort; otherwise use the second agreed meeting point"],
    ["Public service has ended or changed", "Use the staffed station area or official taxi zone", "Take a verified vehicle to the saved gate instead of following an unofficial tout"],
    ["Phone/data fails", "Use the offline Chinese card and hotel phone at a staffed desk", "Keep the group together; do not split across different gates"]
  ]},
  { id: "verify-heading", type: "heading", level: 2, text: "Final check before leaving the station" },
  { id: "verify", type: "list", items: [
    "Hotel, gate and vehicle-accessible meeting point are three separate saved fields.",
    "The Chinese destination card and hotel phone work offline.",
    "Today’s official service or the taxi pickup zone is identified.",
    "Vehicle luggage capacity and any step-free need are confirmed.",
    "The hotel knows the arrival vehicle and remaining walk.",
    "A second gate or roadside meeting point is saved in case access changes."
  ]},
  { id: "help", type: "callout", title: "Need the station arrival matched to the hotel gate?", tone: "decision", body: "Send Homeground the date, train, hotel, group size, luggage and walking limits. We can organise the address and meeting-point details and flag an implausible drop-off; live buses, road access and vehicle availability remain with the operators." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "Homeground transport and planning guides", href: "/guides/", description: "Return to the parent guide collection." },
    { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Prepare the rail arrival before this last mile." },
    { label: "Kunming, Dali, Lijiang and Shangri-La route order", href: "/guides/kunming-dali-lijiang-shangri-la-route-order/", description: "Place Dali correctly in the wider Yunnan route." },
    { label: "China hub-and-spoke or multi-base route", href: "/guides/china-hub-and-spoke-or-multi-base-route/", description: "Decide whether moving the luggage base is worthwhile." },
    { label: "Is your China itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Leave enough time between the station and old-town hotel." }
  ]},
  { id: "sources", type: "sources", title: "Official sources", items: [
    { label: "Dali Old Town official transport guidance", url: "https://www.dali.gov.cn/dlzrmzf/c101724/pc/content/1968887474976559104/content_1968887474976559104.html", publisher: "Dali Prefecture Government", reviewedAt: "2026-08-13" },
    { label: "Dali station–old town route description", url: "https://jtyst.yn.gov.cn/html/2024/12328hyb_0924/3132885.html", publisher: "Yunnan Department of Transport", reviewedAt: "2026-08-13" },
    { label: "2025 Dali peak transport capacity measures", url: "https://jtyst.yn.gov.cn/html/2025/xingyexinwen_0910/3134849.html", publisher: "Yunnan Department of Transport", reviewedAt: "2026-08-13" },
    { label: "2026 Dali Railway Station passenger guidance", url: "https://www.dali.gov.cn/dlzrmzf/c101532/pc/content/2015703305571897344/content_2015703305571897344.html", publisher: "Dali Prefecture Government", reviewedAt: "2026-08-13" },
    { label: "China Railway live journey search", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-13" },
    { label: "Hero photograph: Dali Old Town South Gate — Kcx36 (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:%E5%A4%A7%E7%90%86%E5%8F%A4%E5%9F%8E%E5%8D%97%E9%97%A8_01.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13" },
    { label: "Hero photograph licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0", publisher: "Creative Commons", reviewedAt: "2026-08-13" }
  ]}
] } as const satisfies StructuredPageBody;

export default body;
