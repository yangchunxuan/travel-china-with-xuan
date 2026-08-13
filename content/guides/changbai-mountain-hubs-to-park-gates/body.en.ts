import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Choose the park entrance before the transport hub. For a North Scenic Area booking, Changbaishan Railway Station and an Erdaobaihe/Chibei hotel are usually the most direct combination. For a West Scenic Area booking, Changbaishanxi Railway Station or Changbaishan Airport and a Songjianghe/Chixi hotel normally avoid crossing the mountain region. The two areas operate separately; they are not two doors of one visitor centre." },
  { id: "direct-answer", type: "callout", title: "The name on the park booking controls the route", tone: "decision", body: "Match 北景区 (North Scenic Area) with 长白山站 and the Chibei/Erdaobaihe side; match 西景区 (West Scenic Area) with 长白山西站 or 长白山机场 and the Chixi/Songjianghe side. Recheck the exact operating visitor centre on the official scenic-area notice before departure. Do not book a hub from the generic map label ‘Changbai Mountain’." },
  { id: "tree-heading", type: "heading", level: 2, text: "Gate-first decision tree" },
  { id: "decision-tree", type: "list", ordered: true, items: [
    "Open the dated scenic-area order and copy either 北景区 or 西景区; a Tianchi photo does not identify the slope.",
    "If it says 北景区, search rail tickets to 长白山站 and lodging in 二道白河镇 or 池北区.",
    "If it says 西景区, compare 长白山西站 with 长白山机场 and lodging around 松江河镇 or 池西区.",
    "If the entrance is not yet confirmed, do not buy non-refundable rail, flight and hotel bookings yet.",
    "On the travel date, recheck scenic-area operations, the railway or airline record, road weather and the final authorised transfer pickup."
  ]},
  { id: "identity-matrix", type: "table", caption: "Hub identity, not a promise of a particular service", columns: ["Hub on the ticket", "Useful default", "Main complication", "Confirm before paying"], rows: [
    ["长白山站 · Changbaishan", "North Slope; Chibei/Erdaobaihe base", "Wrong for a West Slope early start unless a long cross-region road transfer is accepted", "Confirm the train actually calls here and the North Scenic Area visitor-centre pickup"],
    ["长白山西站 · Changbaishanxi", "West Slope; Songjianghe/Chixi base", "A different station from Changbaishan despite the similar English name", "Copy the full Chinese station name and confirm the hotel-side pickup"],
    ["长白山机场 · Changbaishan Airport", "West-side resort or West Scenic Area", "Flight delay and baggage claim can miss a pre-arranged vehicle", "Confirm terminal pickup, late-arrival handling and whether the driver serves the exact hotel"],
    ["An external hub such as Yanji or Changchun", "Alternative when local rail or flight times do not fit", "Adds a long road or rail leg and more exposure to bad weather", "Compare the complete door-to-door journey and keep an overnight option rather than comparing only the fare"]
  ]},
  { id: "chains-heading", type: "heading", level: 2, text: "Build the route to the operating visitor centre" },
  { id: "chains", type: "comparison", title: "Three practical routes", columns: [
    { heading: "North Scenic Area by rail", items: ["Train ticket: 长白山站", "First night: 池北区 / 二道白河镇", "Confirm the current North Scenic Area visitor centre", "Use the scenic-area shuttle system from the announced point"] },
    { heading: "West Scenic Area by rail", items: ["Train ticket: 长白山西站", "First night: 池西区 / 松江河镇", "Confirm hotel or licensed pickup at the correct station area", "Continue to the current West Scenic Area transfer centre"] },
    { heading: "West Scenic Area by air", items: ["Flight: 长白山机场", "Collect baggage before the driver's waiting period ends", "Confirm whether the first stop is the hotel or West visitor centre", "Go to the hotel first after a late landing"] }
  ]},
  { id: "scenario-heading", type: "heading", level: 2, text: "Two trips that look similar but need different hubs" },
  { id: "scenarios", type: "table", caption: "Keep the first mountain day realistic", columns: ["Traveller situation", "Better working plan", "What would change it"], rows: [
    ["Family arriving by rail with a North Slope reservation next morning", "Changbaishan Station, then one night on the Chibei/Erdaobaihe side", "A changed park order, a train that does not call at Changbaishan, or no confirmed late pickup"],
    ["Couple landing in the evening with a West Slope reservation", "Airport pickup to a West-side hotel; visit only after rest and an operations recheck", "A major flight delay, road warning, or scenic-area suspension makes the hotel night the endpoint"],
    ["Ski resort stay plus one North Slope day", "Keep the west-side resort arrival, but treat the North Slope day as a separate cross-region road operation", "Bad weather or an early park entry may justify moving one night to Chibei instead"],
    ["One traveller has large luggage and another walks slowly", "Choose the same-side hub and hotel, and request an exact vehicle meeting point", "Do not accept an unverified ‘near the gate’ drop-off that still requires snow or stair walking"]
  ]},
  { id: "winter-heading", type: "heading", level: 2, text: "Winter weather changes the operating plan" },
  { id: "winter", type: "callout", title: "A valid ticket does not guarantee the mountain road or summit segment", tone: "warning", body: "The scenic area may adjust internal transport or suspend sections because of wind, snow, ice or visibility. Official winter arrangements change by season. Check the Changbai Mountain scenic-area notice and China Meteorological Administration forecast and alerts the evening before, then check again before leaving the hotel. Stay on the correct side of the mountain on the first night; do not combine arrival, a summit visit and a long onward journey in one day." },
  { id: "recovery-heading", type: "heading", level: 2, text: "What to do after a wrong hub or road disruption" },
  { id: "recovery", type: "table", caption: "Do not force the original plan into the same day", columns: ["Problem", "Immediate action", "Safer alternative"], rows: [
    ["You arrive at Changbaishan Station for a West Slope booking", "Stay on the Chibei side long enough to verify a licensed cross-region transfer and park status", "Move the West visit to another day or rebook a same-side night; do not take an unverified car under time pressure"],
    ["You arrive at Changbaishanxi or the airport for a North Slope booking", "Ask the hotel/official transport desk for a current same-day road option and realistic arrival time", "Sleep west-side, shift the North booking if allowed, then transfer in daylight"],
    ["Train or flight arrives after the pickup window", "Contact the booked driver or hotel before leaving the terminal and use the official taxi/ride-hailing zone", "Make the hotel the final stop; do not chase a closed visitor centre"],
    ["Road warning or scenic-area suspension appears", "Follow the official notice and cancel the unnecessary vehicle booking", "Keep the same-side hotel and reschedule the mountain visit only after operations resume"]
  ]},
  { id: "names", type: "callout", title: "Copy these names into the driver message", tone: "neutral", body: "North: 长白山北景区 / 长白山站 / 二道白河镇 / 池北区. West: 长白山西景区 / 长白山西站 / 长白山机场 / 松江河镇 / 池西区. Add the hotel’s full Chinese name and phone number. Similar English translations are not enough for a winter pickup." },
  { id: "checklist-heading", type: "heading", level: 2, text: "Final verification before departure" },
  { id: "checklist", type: "list", items: [
    "Scenic-area order shows the exact slope and date.",
    "Rail or flight ticket shows the full hub name; Changbaishan and Changbaishanxi are not interchangeable.",
    "Hotel confirms the side of the mountain, late check-in and the precise pickup point.",
    "Transfer provider confirms vehicle, luggage capacity, contact method and weather cancellation handling.",
    "Official scenic-area operations and CMA weather alerts have been checked on the travel date.",
    "A same-side hotel is available if the last road or park segment cannot operate."
  ]},
  { id: "help", type: "callout", title: "Need the ticket, entrance and hotel checked together?", tone: "decision", body: "Send Homeground the travel date, confirmed scenic area, rail or flight record, hotel, group size, luggage and walking needs. We can flag a mismatched hub or an unrealistic connection; live inventory and park operations remain with the official operators." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "Homeground transport and planning guides", href: "/guides/", description: "Return to the parent guide collection." },
    { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Prepare for the rail segment without repeating the station process here." },
    { label: "China's last night before an international flight", href: "/guides/china-last-night-before-international-flight/", description: "Plan the final departure after a weather-sensitive mountain trip." },
    { label: "Is your China itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Check whether the cross-mountain transfer has enough spare time." }
  ]},
  { id: "sources", type: "sources", title: "Official sources", items: [
    { label: "Changbai Mountain official North/West transport guide", url: "https://www.changbaishan.gov.cn/zbsly/lyzn/bpgl/202106/t20210625_210152.html", publisher: "Changbai Mountain Protection and Development Zone", reviewedAt: "2026-08-13" },
    { label: "Shenyang–Changbaishan HSR station transport arrangements", url: "https://jtyst.jl.gov.cn/ygj/jtyw_5912/202509/t20250925_9327476.html", publisher: "Jilin Transport Administration", reviewedAt: "2026-08-13" },
    { label: "Changbaishan West Station and HSR opening", url: "https://www.jl.gov.cn/szf/zwhd/202509/t20250928_3502171.html", publisher: "Jilin Provincial Government", reviewedAt: "2026-08-13" },
    { label: "2025–2026 winter public-transport notice", url: "https://jtyst.jl.gov.cn/ygj/jtyw_5912/202601/t20260105_9388408.html", publisher: "Jilin Transport Administration", reviewedAt: "2026-08-13" },
    { label: "Changbai Mountain official portal and operating notices", url: "https://www.changbaishan.gov.cn/index.html", publisher: "Changbai Mountain Protection and Development Zone", reviewedAt: "2026-08-13" },
    { label: "China Meteorological Administration forecasts and warnings", url: "https://www.cma.gov.cn/", publisher: "China Meteorological Administration", reviewedAt: "2026-08-13" },
    { label: "Hero photograph: Changbaishan Railway Station exterior — A Chinese user (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:Exterior_of_Changbaishan_Railway_Station,_Aug_13_2022.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13" },
    { label: "Hero photograph licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0", publisher: "Creative Commons", reviewedAt: "2026-08-13" }
  ]}
] } as const satisfies StructuredPageBody;

export default body;
