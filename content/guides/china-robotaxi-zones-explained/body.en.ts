import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "A robotaxi sign in China does not mean that an autonomous taxi can collect any traveller anywhere in the city. What you are seeing is a locally approved combination of city, operator, operating zone, time window, vehicle, automation level and pilot stage. Some vehicles carry an in-car safety operator; some use remote supervision. A road opened for testing may have no public passenger service at all."},
  {id: "six-part-check", type: "table", caption: "Six facts define the service in front of you", columns: ["Question", "Why it matters"], rows: [
    ["Which city and district?", "Permissions are local and may stop at a district or zone boundary."],
    ["Which operator?", "Two operators in one city can have different coverage and passenger rules."],
    ["What legal and service status?", "Labels differ by city. A road-test permit never establishes a passenger service; another pilot label still does not prove you can book it now."],
    ["Which roads and hours?", "Approval can be limited to named areas, routes and time periods."],
    ["Who supervises?", "The safety function may be inside the vehicle or remote, depending on the approved setup."],
    ["Can you complete the booking?", "Public access may still require operator-specific registration, identity or phone verification, eligibility and payment."]
  ]},
  {id: "zone-not-city", type: "heading", level: 2, text: "The operating zone is not the whole city"},
  {id: "zone-explanation", type: "paragraph", text: "China's transport ministry requires autonomous-vehicle passenger operations to stay within approved service areas. Local authorities then publish or approve more specific routes, zones and operating conditions. That is why a vehicle can be legal on one side of an urban boundary yet unavailable beyond it. Airport, railway-station or theme-park roads mentioned in a testing notice should be read as test geography unless the same official material explicitly confirms passenger operation."},
  {id: "stages", type: "comparison", title: "Separate road status from passenger access", columns: [
    {heading: "Road testing or demonstration application", items: ["National rules define these as testing or trial activity on designated roads.", "A demonstration may carry people, but the label alone does not make it a normal public taxi.", "Local rules and the operator's live channel still decide access."]},
    {heading: "A locally approved passenger operation", items: ["The city may use its own demonstration, pilot or commercial terminology.", "Charging can be permitted under a local operating stage.", "Your account, endpoints, time and payment still all need to be accepted."]}
  ]},
  {id: "shanghai-example", type: "callout", title: "A dated example of the boundary", body: "On 5 August 2025, Shanghai's official English portal reported public, paid driverless ride-hailing by Pony.ai and Jinjiang in designated parts of Jinqiao and Huamu, bookable through Pony.ai's WeChat mini-program. The same report distinguished this from earlier demonstration permits that could not charge. It is a dated local example—not evidence of citywide Shanghai access or a current 2026 booking promise.", tone: "neutral"},
  {id: "safety-operator", type: "heading", level: 2, text: "Driverless does not mean unsupervised"},
  {id: "safety-details", type: "paragraph", text: "Under the national transport safety guide, a robotaxi classified as conditional or highly automated must carry one safety operator. A fully automated robotaxi may instead use remote safety operators only with the relevant city government's approval for a designated area, at no more than three vehicles per remote operator. An empty driver's seat therefore does not mean that the vehicle is unsupervised—or that it is approved to collect you."},
  {id: "scenario-one", type: "callout", title: "When it can be a real transport option", body: "Treat it as usable only when the operator's current passenger channel accepts your exact pickup and destination for the required date and time, you can complete its account, contact and payment steps, and a normal taxi or metro remains available if the ride is cancelled or ends at the zone boundary. A logo on the street proves none of those things.", tone: "decision"},
  {id: "scenario-two", type: "callout", title: "When it should remain a curiosity", body: "Do not make a pilot service the critical link to an airport, last train, timed ticket or late-night hotel arrival. The same caution applies when children, a wheelchair, several suitcases or a language barrier make a failed pickup difficult to recover from. A social-media airport ride may be a road test, media demonstration or limited route rather than normal passenger operation.", tone: "warning"},
  {id: "if-you-ride", type: "heading", level: 2, text: "If you join an officially available ride"},
  {id: "ride-checks", type: "list", ordered: true, items: [
    "Confirm the operator, pickup point, destination, quoted service window and zone endpoint in the operator's current passenger channel.",
    "Read the safety notice and locate the in-vehicle help or emergency contact before departure.",
    "Keep your destination in Chinese and retain a conventional taxi or metro fallback.",
    "Follow the operator's seating, seat-belt and boarding instructions; do not distract equipment or attempt to take control.",
    "If the car stops or the route ends unexpectedly, use the support channel and follow the vehicle's safety notice. In a fire or immediate danger, follow its marked emergency-exit guidance and move to a safe place."
  ]},
  {id: "dynamic-boundary", type: "callout", title: "Checked 13 August 2026", body: "This guide explains the policy structure, not live availability. Zones, hours, operators, vehicle staffing and passenger access can change. Recheck the relevant city authority and operator on the travel day. A planning document, test-road list or old promotional post is not a current booking promise.", tone: "warning"},
  {id: "help", type: "callout", title: "Need to decide whether the pilot belongs in a real itinerary?", body: "Send Homeground the city, travel date, exact two endpoints, required arrival time, group size, luggage and mobility needs. We can separate a documented public service from a test-zone headline and mark the fallback that still needs confirming; the city and operator control live access.", tone: "neutral"},
  {id: "internal-links", type: "internal-links", title: "Keep the rest of the transfer practical", items: [
    {label: "Private transfer or public transport in China", href: "/guides/china-private-transfer-or-public-transport/", description: "Choose a dependable transfer when a pilot service cannot be the critical link."},
    {label: "China map pin and entrance checks", href: "/guides/china-map-coordinate-offset-explained/", description: "Confirm the correct pickup entrance rather than relying on a bare pin."},
    {label: "Lost phone recovery in China", href: "/guides/lost-phone-in-china-digital-recovery/", description: "Protect access to transport and payment tools."},
    {label: "Read Shenzhen's low-altitude infrastructure", href: "/guides/shenzhen-low-altitude-city-infrastructure/", description: "Compare a bounded road pilot with drone routes and ground nodes without treating either as guaranteed passenger transport."}
  ]},
  {id: "sources", type: "sources", title: "Official and independent sources", items: [
    {label: "Safety guide for autonomous-vehicle transport services", url: "https://xxgk.mot.gov.cn/jigou/ysfws/202312/t20231205_3962490.html", publisher: "Ministry of Transport", reviewedAt: "2026-08-13"},
    {label: "National road-testing and demonstration-application rules", url: "https://www.miit.gov.cn/jgsj/zbys/qcgy/art/2021/art_a24398849c6a4dd290328ab5d1d8af0f.html", publisher: "Ministry of Industry and Information Technology", reviewedAt: "2026-08-13"},
    {label: "Shanghai Jinqiao and Huamu paid public-operation example", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20250805/99c935aed09f41e5bb4a6dd6fa095c96.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-08-13"},
    {label: "Shanghai autonomous-driving update", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260215/e00a579f253d4903a3bdaf6840babc9f.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-08-13"},
    {label: "Beijing Yizhuang autonomous-driving zone update", url: "https://kfqgw.beijing.gov.cn/ywdt/dwkfgd/kfyz/202505/t20250521_4246493.html", publisher: "Beijing Economic-Technological Development Area", reviewedAt: "2026-08-13"},
    {label: "Wuhan intelligent connected vehicle plan", url: "https://www.wuhan.gov.cn/ztzl/25zt/ltwhfjzx/zcwj/202511/t20251125_2682890.shtml", publisher: "Wuhan Municipal Government", reviewedAt: "2026-08-13"},
    {label: "Operational design condition survey", url: "https://www.sciencedirect.com/science/article/pii/S0001457525004543", publisher: "Accident Analysis & Prevention", reviewedAt: "2026-08-13"},
    {label: "Hero photograph: Apollo Go RT6 with a test plate in Wuhan — S5A-0043, 17 December 2025 (cropped)", url: "https://commons.wikimedia.org/wiki/File:(CHN-Hubei)_Apollo_Go_Apollo_RT6_Temporary-%E9%84%82A1395%E8%AF%95_2025-12-17.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13"},
    {label: "CC BY 4.0 licence for the cropped hero photograph", url: "https://creativecommons.org/licenses/by/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
