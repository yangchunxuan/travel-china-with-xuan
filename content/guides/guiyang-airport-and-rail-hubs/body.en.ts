import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "In Guiyang, the exact name on the ticket matters more than the map direction. Guiyang North is the city's main high-speed rail hub and connects with Metro Line 1; central Guiyang Railway Station is also on Line 1 and serves conventional trains plus some high-speed services; Guiyang East is a separate east-side station and usually needs more road travel; Longdongbao is an airport complex with Metro Line 2, coaches and a railway station below the terminal. These hubs are not interchangeable." },
  { id: "answer", type: "callout", title: "If the ticket is already bought, go to the printed hub", tone: "decision", body: "Copy 贵阳北, 贵阳东, 贵阳 or 龙洞堡 exactly from 12306; for a flight copy the terminal at 贵阳龙洞堡国际机场. Then work backwards from departure time and forwards to the hotel or rural connection. Do not change hubs merely because a different one looks closer. First confirm whether the ticket can be changed and whether the replacement service actually calls at the preferred hub." },
  { id: "identity-heading", type: "heading", level: 2, text: "Four hub identities" },
  { id: "identity", type: "table", caption: "Identity first; live calls and hours remain dynamic", columns: ["Record/name", "What it is", "City connection", "Typical planning use"], rows: [
    ["贵阳龙洞堡国际机场 · KWE", "Airport with T2/T3; integrated metro, coach and the separate 龙洞堡 railway station", "Metro Line 2 plus authorised road transport; not all-night by assumption", "Flight arrival/departure; a rail transfer only when 12306 shows a workable call at 龙洞堡"],
    ["贵阳北 · Guiyang North", "Largest Guiyang high-speed rail passenger hub", "Metro Line 1; organised taxi/ride-hailing/bus zones with substantial station walking", "Many intercity HSR choices and useful road-passenger extension services"],
    ["贵阳东 · Guiyang East", "Separate railway station on the east side", "Plan a current bus, taxi or ride-hailing trip; do not assume the North/Central metro convenience", "A train that specifically calls here, or a verified east-side or rural onward journey"],
    ["贵阳 · Guiyang Railway Station", "Central/Nanming railway station, not a generic city label", "Metro Line 1 and central-city road transport", "Central hotel base; conventional trains and dated high-speed services that explicitly call here"]
  ]},
  { id: "name-warning", type: "callout", title: "贵阳东站 is not 贵阳东客站", tone: "warning", body: "贵阳东站 means Guiyang East Railway Station. 贵阳东客站 has been used for the Longdongbao road coach terminal near Zhongxing Road. They are different transport records. Also, 龙洞堡 railway station and the airport terminals share a complex but use different tickets, checks and boarding processes." },
  { id: "decision-heading", type: "heading", level: 2, text: "Decision order when planning or holding a ticket" },
  { id: "decision", type: "list", ordered: true, items: [
    "Open the live booking and copy the full Chinese origin/destination, date and departure time.",
    "Identify whether the record is a flight, railway ticket or road-passenger booking; similar place names do not merge them.",
    "Pin the actual Guiyang hotel entrance and estimate the dated city transfer using current metro/road information.",
    "For a rural onward trip, write the exact town, scenic area or coach pickup—not merely ‘Guizhou countryside.’",
    "Allow enough time for terminal or station entry, luggage and early or late operating limits.",
    "Before leaving for the hub, know whether the ticket can be changed and where you can stay if the connection is missed."
  ]},
  { id: "hotel-heading", type: "heading", level: 2, text: "Hotel location changes the transfer, not the ticket" },
  { id: "hotel-scenarios", type: "comparison", title: "Match the city side", columns: [
    { heading: "Guanshanhu / north-west", items: ["Guiyang North often has the simplest city transfer", "Still follow the exact ticket", "Allow large-hub walking and correct pickup zone"] },
    { heading: "Nanming / central city", items: ["Guiyang Station can be convenient when the booked train calls", "Line 1 also reaches Guiyang North", "Do not book ‘Guiyang’ without reading the suffix"] },
    { heading: "Airport / east-side overnight", items: ["Longdongbao simplifies a flight night", "Use the railway station only for a confirmed calling train", "Guiyang East remains a separate road transfer"] }
  ]},
  { id: "rural-heading", type: "heading", level: 2, text: "Rural onward travel needs a second identity check" },
  { id: "rural", type: "table", caption: "Do not choose by compass direction alone", columns: ["Onward journey", "Check", "Useful hub choice", "If it does not work"], rows: [
    ["Train to a Guizhou county/city", "Exact dated 12306 call and arrival station", "Use whichever Guiyang station the workable train actually serves", "Do not transfer to East/North/Longdongbao on a route-level assumption"],
    ["Official coach/custom line", "Current operator, boarding point, cutoff and luggage rule", "North and East have had passenger extension services; airport and central station have date-specific tourist/coach links", "Historical route announcements are discovery only; reconfirm today"],
    ["Private transfer to a village/property", "Licensed provider, exact Chinese destination, vehicle and road conditions", "Start from the booked arrival hub and avoid unnecessary travel back across Guiyang", "Stay in Guiyang if the driver, weather or final road prevents the onward trip"],
    ["Flight followed by rail", "Baggage claim, terminal, 龙洞堡 rail calls and transfer time", "Airport rail is useful only when the exact train fits", "Take a later service from the station printed on the ticket or stay near the airport"]
  ]},
  { id: "scenarios-heading", type: "heading", level: 2, text: "Four traveller scenarios" },
  { id: "scenarios", type: "table", caption: "A hub makes sense only as part of the whole journey", columns: ["Situation", "Working plan", "Trap"], rows: [
    ["Flight lands, then a train ticket says 贵阳北", "Collect bags, use current airport-to-North transport and leave enough time to enter the railway station", "Going to 龙洞堡 railway station because it is under the airport"],
    ["Central hotel, train ticket says 贵阳", "Use the central station and verify the exact entrance/time", "A driver or traveller silently changing it to Guiyang North"],
    ["Family with cases, ticket says 贵阳东", "Arrange a direct authorised pickup to East and save the Chinese station name", "Following signs for the East Coach Station near the airport"],
    ["International flight next morning", "Stay near Longdongbao, or use a city hotel only after confirming a reliable airport transfer", "Choosing a rail hub for sightseeing convenience and leaving no spare time before the flight"]
  ]},
  { id: "early-late", type: "callout", title: "Early and late trips need a road option", tone: "warning", body: "Metro, buses, airport coaches and custom tourist lines change by date and do not all run through the night. Check the official Guiyang transport channel and flight or train record on the travel date. For a very early departure or late arrival, confirm a legal taxi or ride-hailing pickup, hotel desk coverage and enough luggage capacity instead of assuming a daytime connection also works at night." },
  { id: "recovery-heading", type: "heading", level: 2, text: "What to do at the wrong hub" },
  { id: "recovery", type: "table", caption: "Check the ticket before moving across the city", columns: ["Mistake", "First action", "Next step"], rows: [
    ["At Guiyang North, ticket says Guiyang East", "Check departure status and change rules in 12306; tell staff you are at the wrong station", "Only take a cross-city vehicle if the verified margin works; otherwise change the ticket legally"],
    ["At central Guiyang Station, ticket says Guiyang North", "Use current Line 1 or road time from an official map and include station entry", "Do not board a random train assuming all services link the stations"],
    ["At airport/Longdongbao, ticket says another station", "Calculate terminal exit, baggage, city travel and railway-station entry separately", "Change to a later valid train or stay near the airport/in the city if there is no longer enough time"],
    ["Driver takes you toward 贵阳东客站 instead of 贵阳东站", "Stop the trip before unloading and show 贵阳东站 on the ticket", "Correct the app destination to the railway station and share the record with the hotel/operator"],
    ["Rural pickup cannot be found", "Stay at the staffed hub, contact the licensed operator and share a numbered exit or pickup zone", "Stay in a Guiyang hotel rather than accepting an unsolicited long-distance ride"]
  ]},
  { id: "verify-heading", type: "heading", level: 2, text: "Final pre-departure check" },
  { id: "verify", type: "list", items: [
    "The full Chinese hub name and transport type match the booking.",
    "Flight terminal or railway entrance/pickup zone is current.",
    "Hotel-to-hub transfer is checked for the real departure time, not midday.",
    "Rural onward destination and operator are named precisely.",
    "Luggage capacity, walking and station-entry margin fit the group.",
    "Official metro/bus/road information and 12306/airline status were checked today.",
    "The ticket can be changed, or a Guiyang hotel is available if the cross-city transfer cannot be completed."
  ]},
  { id: "help", type: "callout", title: "Need the ticket, hotel and onward journey matched?", tone: "decision", body: "Send Homeground the date, exact ticket record, Guiyang hotel, onward destination, group size and luggage. We can identify the correct hub and likely transfer difficulties; official operators control live inventory, terminals, station calls and road services." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "Homeground transport and planning guides", href: "/guides/", description: "Return to the parent guide collection." },
    { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Prepare the rail process after identifying the station." },
    { label: "China's last night before an international flight", href: "/guides/china-last-night-before-international-flight/", description: "Plan a Longdongbao departure after a Guizhou trip." },
    { label: "China separate flight tickets and self-transfer risk", href: "/guides/china-separate-flight-tickets-self-transfer-risk/", description: "Test a flight-to-rail or separate-air connection." },
    { label: "China hub-and-spoke or multi-base route", href: "/guides/china-hub-and-spoke-or-multi-base-route/", description: "Decide whether Guiyang should remain the base for rural excursions." },
    { label: "Build the last-mile plan for a Guizhou Village BA event", href: "/guides/guizhou-village-basketball-culture/", description: "Connect Guiyang transport to Taipan only after checking the named event, local transfer, crowd controls and return cut-off." }
  ]},
  { id: "sources", type: "sources", title: "Official sources", items: [
    { label: "Guiyang airport integrated transport identity", url: "https://english.guiyang.gov.cn/2023-12/15/c_956327.htm", publisher: "Guiyang Municipal Government", reviewedAt: "2026-08-13" },
    { label: "2025 rail–metro hub transfer guidance", url: "https://jt.guizhou.gov.cn/cxfw_0/zhjt/gdjt/202509/t20250926_88653260.html", publisher: "Guizhou Department of Transport / Guiyang Transport Committee", reviewedAt: "2026-08-13" },
    { label: "Guiyang North transport organisation", url: "https://jt.guizhou.gov.cn/xwzx1/hydt/202304/t20230416_82484664.html", publisher: "Guizhou Department of Transport", reviewedAt: "2026-08-13" },
    { label: "Guiyang railway station identities", url: "https://english.guiyang.gov.cn/2019-04/17/c_1056567.htm", publisher: "Guiyang Municipal Government", reviewedAt: "2026-08-13" },
    { label: "Longdongbao rail–air integration", url: "https://shuanglong.english.guiyang.gov.cn/2025-02/27/c_1043962.htm", publisher: "Guiyang Shuanglong Airport Economic Zone", reviewedAt: "2026-08-13" },
    { label: "China Railway live journey search", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-13" },
    { label: "Hero photograph: Guiyang North station forecourt — Gmbsfd (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:North_Guiyang_Railway_Station_2015.10.7.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13" },
    { label: "Hero photograph licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0", publisher: "Creative Commons", reviewedAt: "2026-08-13" }
  ]}
] } as const satisfies StructuredPageBody;

export default body;
