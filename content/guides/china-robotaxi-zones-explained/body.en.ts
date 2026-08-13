import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "A robotaxi sign in China does not mean that an autonomous taxi can collect any traveller anywhere in the city. What you are seeing is a locally approved combination of city, operator, operating zone, time window, vehicle, automation level and pilot stage. Some vehicles carry an in-car safety operator; some use remote supervision. A road opened for testing may have no public passenger service at all."},
  {id: "six-part-check", type: "table", caption: "Six facts define the service in front of you", columns: ["Question", "Why it matters"], rows: [
    ["Which city and district?", "Permissions are local and may stop at a district or zone boundary."],
    ["Which operator?", "Two operators in one city can have different coverage and passenger rules."],
    ["What stage?", "Road testing, demonstration use, demonstration operation and commercial operation are not interchangeable."],
    ["Which roads and hours?", "Approval can be limited to named areas, routes and time periods."],
    ["Who supervises?", "The safety function may be inside the vehicle or remote, depending on the approved setup."],
    ["Is public ordering enabled?", "A visible vehicle or an open test road does not prove that a visitor can request a ride."]
  ]},
  {id: "zone-not-city", type: "heading", level: 2, text: "The operating zone is not the whole city"},
  {id: "zone-explanation", type: "paragraph", text: "China's transport ministry requires autonomous-vehicle passenger operations to stay within approved service areas. Local authorities then publish or approve more specific routes, zones and operating conditions. That is why a vehicle can be legal on one side of an urban boundary yet unavailable beyond it. Airport, railway-station or theme-park roads mentioned in a testing notice should be read as test geography unless the same official material explicitly confirms passenger operation."},
  {id: "stages", type: "comparison", title: "Read the stage before reading the marketing", columns: [
    {heading: "Testing or demonstration application", items: ["Primarily validates the vehicle and operating system.", "May be visible on public roads.", "Does not by itself establish a bookable passenger service."]},
    {heading: "Demonstration or commercial operation", items: ["May carry members of the public under local approval.", "Charging can be permitted at an approved stage.", "Coverage, hours, eligibility and ordering still remain operator- and zone-specific."]}
  ]},
  {id: "safety-operator", type: "heading", level: 2, text: "Driverless does not mean unsupervised"},
  {id: "safety-details", type: "paragraph", text: "National guidance distinguishes conditional, highly automated and fully automated vehicles. A conditional or highly automated taxi normally has an in-vehicle safety operator. For a fully automated taxi, a local government may approve remote safety operators within a designated area; national guidance sets a maximum of three vehicles per remote operator. The absence of a person in the driver's seat therefore says nothing, by itself, about the vehicle's approved level or supervision chain."},
  {id: "traveller-scenes", type: "table", caption: "What common traveller sightings do—and do not—prove", columns: ["What you see", "Safe interpretation", "What remains unproven"], rows: [
    ["A branded car with sensors", "It is equipped for an autonomous-driving programme.", "That it is currently carrying public passengers."],
    ["An empty driver's seat", "The approved setup may use remote supervision.", "That there is no safety operator or intervention system."],
    ["An airport or Disney road in a notice", "That road may be part of an authorised test network.", "That a passenger can order an airport or Disney ride."],
    ["A promotional ride route", "A limited visitor experience may exist for that operator and period.", "Citywide access or permanent availability."]
  ]},
  {id: "scenario-one", type: "callout", title: "Scenario: you spot one near a convention district", body: "Treat the sighting as evidence of a programme, not of a transport option. If your hotel or airport transfer depends on it, use a normal confirmed transfer unless the operator's current passenger channel accepts both your pickup and destination for that date and time.", tone: "decision"},
  {id: "scenario-two", type: "callout", title: "Scenario: social media shows an airport robotaxi", body: "Check whether the post refers to a test road, a demonstration route, a media ride or normal passenger operation. The correct conclusion changes with that status. A route announcement from another district or operator cannot be carried over to your trip.", tone: "warning"},
  {id: "if-you-ride", type: "heading", level: 2, text: "If you join an officially available ride"},
  {id: "ride-checks", type: "list", ordered: true, items: [
    "Confirm the operator, pickup point, destination and operating hours in the operator's current passenger channel.",
    "Read the safety notice and locate the in-vehicle help or emergency contact before departure.",
    "Keep your destination in Chinese and retain a conventional taxi or metro fallback.",
    "Follow the operator's seating, seat-belt and boarding instructions; do not distract equipment or attempt to take control.",
    "If the car stops or the route ends unexpectedly, use the provided support channel and wait for instructions rather than leaving in an unsafe road position."
  ]},
  {id: "dynamic-boundary", type: "callout", title: "Checked 13 August 2026", body: "This guide explains the policy structure, not live availability. Zones, hours, operators, vehicle staffing and passenger access can change. Recheck the relevant city authority and operator on the travel day. A planning document, test-road list or old promotional post is not a current booking promise.", tone: "warning"},
  {id: "internal-links", type: "internal-links", title: "Keep the rest of the transfer practical", items: [
    {label: "Private transfer or public transport in China", href: "/guides/china-private-transfer-or-public-transport/", description: "Choose a dependable transfer when a pilot service cannot be the critical link."},
    {label: "China map pin and entrance checks", href: "/guides/china-map-coordinate-offset-explained/", description: "Confirm the correct pickup entrance rather than relying on a bare pin."},
    {label: "Lost phone recovery in China", href: "/guides/lost-phone-in-china-digital-recovery/", description: "Protect access to transport and payment tools."}
  ]},
  {id: "sources", type: "sources", title: "Official and independent sources", items: [
    {label: "Safety guide for autonomous-vehicle transport services", url: "https://xxgk.mot.gov.cn/jigou/ysfws/202312/t20231205_3962490.html", publisher: "Ministry of Transport", reviewedAt: "2026-08-13"},
    {label: "Commercial pilots in specific areas and times", url: "https://big5.mot.gov.cn/gate/big5/www.mot.gov.cn/gongkai/zcjd/202512/t20251226_4191175.html", publisher: "Ministry of Transport", reviewedAt: "2026-08-13"},
    {label: "Shanghai autonomous-driving update", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260215/e00a579f253d4903a3bdaf6840babc9f.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-08-13"},
    {label: "Beijing Yizhuang autonomous-driving zone update", url: "https://kfqgw.beijing.gov.cn/ywdt/dwkfgd/kfyz/202505/t20250521_4246493.html", publisher: "Beijing Economic-Technological Development Area", reviewedAt: "2026-08-13"},
    {label: "Wuhan intelligent connected vehicle plan", url: "https://www.wuhan.gov.cn/ztzl/25zt/ltwhfjzx/zcwj/202511/t20251125_2682890.shtml", publisher: "Wuhan Municipal Government", reviewedAt: "2026-08-13"},
    {label: "Operational design condition survey", url: "https://www.sciencedirect.com/science/article/pii/S0001457525004543", publisher: "Accident Analysis & Prevention", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
