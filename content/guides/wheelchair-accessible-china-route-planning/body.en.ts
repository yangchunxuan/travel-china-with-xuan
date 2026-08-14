import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "A wheelchair-accessible China route works only when every link fits the traveller and chair. One attraction's ramp does not make a city accessible. Verify arrival, assistance handoffs, transport, hotel, toilets, venue routes and recovery as one chain. Redesign any essential link that remains unconfirmed without a booked alternative."
    },
    {
      id: "no-guarantee",
      type: "callout",
      tone: "warning",
      title: "Accessible is not a universal specification",
      body: "Chinese law, standards and service policies establish duties; they do not prove that today's lift works or a room fits every chair and transfer method. This is a verification method, not a facility certification."
    },
    {
      id: "chain-heading",
      type: "heading",
      level: 2,
      text: "Build the route as an end-to-end access chain"
    },
    {
      id: "chain-map",
      type: "table",
      caption: "A route passes only when its essential links connect",
      columns: ["Link", "Evidence to obtain", "Typical hidden break"],
      rows: [
        ["Arrival", "Terminal, assistance meeting point and chair-return point", "Help ends before baggage, immigration or pickup"],
        ["Intercity transport", "Boarding, chair storage, seat transfer and toilet", "The station works but the booked vehicle does not"],
        ["Station or airport exit", "Step-free exit and working lift route", "The exit reaches the wrong side of a divided road"],
        ["Last mile", "Vehicle, loading method, chair dimensions and luggage capacity", "The passenger fits but the chair does not"],
        ["Hotel", "Entrance-to-room route plus measured room details", "The labelled room lacks usable transfer space"],
        ["Daily toilet chain", "Usable toilets on the actual route", "The toilet is beyond a gate or on another floor"],
        ["Venue", "Entrance, internal route, lifts and exit", "A ramp reaches the gate, not the highlights"],
        ["Recovery", "Named alternative transport, room or activity", "A failed lift otherwise forces unsafe carrying"]
      ]
    },
    {
      id: "pass-rule",
      type: "paragraph",
      text: "Homeground editorial rule: grade each essential link confirmed, conditional or failed. A conditional link needs a named fallback. A failed link is not solved by optimism or by asking a companion to perform an unsafe lift."
    },
    {
      id: "profile-heading",
      type: "heading",
      level: 2,
      text: "Define the traveller before choosing the route"
    },
    {
      id: "profile-questions",
      type: "list",
      ordered: false,
      items: [
        "Is the chair manual, power-assisted or powered? Record dimensions, weight, folded size and battery type.",
        "Can the traveller transfer alone, use a board, stand briefly, or not transfer?",
        "Are an aircraft aisle chair and a fixed train seat acceptable?",
        "Which toilet features are essential: side transfer, rails, adult changing, companion access or catheter routine?",
        "How much uneven paving, slope, crowding or continuous pushing is manageable?",
        "Which failure is inconvenient, and which makes the segment unsafe?"
      ]
    },
    {
      id: "verification-heading",
      type: "heading",
      level: 2,
      text: "Ask operational questions, not ‘Is it accessible?’"
    },
    {
      id: "verification-matrix",
      type: "table",
      caption: "Questions that produce usable answers",
      columns: ["Provider", "Ask directly", "Request as proof"],
      rows: [
        ["Rail or airline", "Where is the chair taken and returned? Is transfer required?", "Confirmation tied to the exact segment"],
        ["Station or airport", "Which entrance, lift and meeting point? Who owns the handoff?", "Current map or written reply"],
        ["Driver or transfer company", "Can the passenger remain seated in the chair?", "Vehicle, loading method and clear dimensions"],
        ["Hotel", "Is curb-to-bed-and-shower step-free?", "Current room photos and measurements"],
        ["Venue", "Which highlights does the route reach, and where does it exit?", "Current route map or written reply"],
        ["Any provider", "What if the lift, vehicle or room fails?", "Named alternative and contact"]
      ]
    },
    {
      id: "evidence-heading",
      type: "heading",
      level: 2,
      text: "Use an evidence ladder"
    },
    {
      id: "evidence-ladder",
      type: "list",
      ordered: true,
      items: [
        "Start with the current policy, station inventory, venue map or hotel accessibility page.",
        "Obtain written operator confirmation for the date, terminal, service, room and chair.",
        "Request measurements and current photos for dimension-critical links; an icon is not a measurement.",
        "Reconfirm lift outages, gate changes, room assignment and handoffs shortly before use."
      ]
    },
    {
      id: "rail-heading",
      type: "heading",
      level: 2,
      text: "Rail: reserve assistance for every segment"
    },
    {
      id: "rail-rule",
      type: "paragraph",
      text: "China Railway 12306 says approved special key-passenger requests can include guided entry, priority processing, boarding help and station wheelchairs. Apply online at least 6 hours before departure; with less than 6 hours, station requests must be no later than 60 minutes before departure. Apply separately for every connecting train. Still confirm the carriage toilet, seat transfer, station lift route and platform gap."
    },
    {
      id: "air-heading",
      type: "heading",
      level: 2,
      text: "Air: verify the chair, aircraft and handoff"
    },
    {
      id: "air-rule",
      type: "paragraph",
      text: "For the services listed in the current CAAC rules—including checking a powered wheelchair, using an onboard aisle chair, medical oxygen or travelling with a service dog—notify the carrier when booking and no later than 48 hours before departure. A passenger needing boarding or disembarkation help should currently complete check-in no later than 2 hours before the ordinary check-in deadline. Confirm battery handling, door-side chair return, aisle chair, seat, toilet and remote-stand plan. CAAC's 2026 chain measures do not replace operator and aircraft confirmation."
    },
    {
      id: "hotel-heading",
      type: "heading",
      level: 2,
      text: "Hotel: verify the room, not the label"
    },
    {
      id: "hotel-checks",
      type: "list",
      ordered: false,
      items: [
        "Curb to lobby: kerbs, ramps, doors and staff-operated lifts.",
        "Lobby to room: lift size, corridor, thresholds and evacuation procedure.",
        "Door and turning space: clear width with the door open.",
        "Bed: height, hoist clearance, approach side and movable furniture.",
        "Bathroom: shower or tub, seat, rail position and side-transfer clearance.",
        "Toilet and basin: height, approach, knee space and door swing.",
        "Room assignment: obtain written confirmation of the exact measured room requested; do not assume it is protected from reassignment.",
        "Fallback: document what the property will do if that room is reassigned, including another measured room or a nearby property."
      ]
    },
    {
      id: "venue-heading",
      type: "heading",
      level: 2,
      text: "Venue: distinguish entry access from experience access"
    },
    {
      id: "venue-matrix",
      type: "table",
      caption: "Why a facility list is only the beginning",
      columns: ["Public information", "What it supports", "What remains unknown"],
      rows: [
        ["The Palace Museum publishes an accessible route and one-way visitor flow", "A planned path exists and exit direction matters", "Which halls and lifts work that day"],
        ["Shanghai Museum lists an accessible lane, lifts and loan wheelchairs", "Some equipment is publicly identified", "Availability, chair fit and the chosen gallery route"],
        ["A hotel lists a roll-in shower and grab rails", "Specific features are identified", "Measurements, room assignment and transfer fit"]
      ]
    },
    {
      id: "toilets-heading",
      type: "heading",
      level: 2,
      text: "Treat toilets as route infrastructure"
    },
    {
      id: "toilets-rule",
      type: "paragraph",
      text: "Mark the last confirmed usable toilet before each long transfer or outdoor block. Check hours, transfer side, door, clear space and companion access. ‘Accessible toilet’ does not prove adult changing, hoist space or universal chair fit. Shorten the block or place a verified indoor fallback nearby."
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "Design recovery before a link fails"
    },
    {
      id: "failure-recovery",
      type: "table",
      caption: "Failure recovery should not depend on unsafe manual carrying",
      columns: ["Failure", "Immediate recovery", "Route-level response"],
      rows: [
        ["Station lift unavailable", "Contact station assistance and use an operator-confirmed alternative route only if it fits the traveller", "Change station or use surface transport"],
        ["Vehicle cannot load the chair", "Wait safely and call the verified backup", "Replace that last-mile mode"],
        ["Accessible room reassigned", "Request the measured backup in writing", "Move once, then protect hotel stability"],
        ["Venue route partly closed", "Use accessible highlights or an indoor substitute", "Remove it if the core is unreachable"],
        ["Chair delayed or damaged", "Use assistance and document it immediately", "Carry permitted controls, tools and specifications"],
        ["Traveller reaches the physical limit", "Stop before the return becomes unsafe", "Add rest, shorten days or cut a city"]
      ]
    },
    {
      id: "scenario-one-heading",
      type: "heading",
      level: 2,
      text: "Scenario 1: manual chair, assisted transfers"
    },
    {
      id: "scenario-one",
      type: "callout",
      tone: "neutral",
      title: "Rail can work, but only after the last mile passes",
      body: "A traveller can transfer with one companion and takes a direct train. Separate 12306 assistance requests make rail plausible, not proven. Confirm the exit lift, a vehicle for the unfolded chair and luggage, hotel bathroom geometry and the first usable toilet. If the vehicle fails verification, use a pre-verified transfer; do not rely on the companion lifting harder."
    },
    {
      id: "scenario-two-heading",
      type: "heading",
      level: 2,
      text: "Scenario 2: powered chair, no independent transfer"
    },
    {
      id: "scenario-two",
      type: "callout",
      tone: "neutral",
      title: "A shorter route with stronger confirmations wins",
      body: "A solo powered-chair traveller cannot transfer independently. A connecting flight, an unmeasured room and a heritage site with only a ramp icon create three essential links that fail verification. Prefer a direct flight with written chair handling; a measured room confirmed in writing, with a documented fallback if it is reassigned; and a venue whose route and toilet have been checked against the traveller's requirements. Remove any city whose essential link lacks a fallback that the traveller has checked against those requirements."
    },
    {
      id: "decision-heading",
      type: "heading",
      level: 2,
      text: "Use a go, conditional or redesign decision"
    },
    {
      id: "decision-table",
      type: "comparison",
      title: "The weakest essential link decides",
      columns: [
        { "heading": "Go", "body": "Every essential link matches the traveller and chair, confirmations are attached to bookings, and dynamic items have a recheck date." },
        { "heading": "Conditional", "body": "A non-critical link is uncertain, but a named, bookable alternative has been checked against the traveller's requirements." },
        { "heading": "Redesign", "body": "A transfer, toilet, room, boarding method or recovery path is incompatible or unverified without a suitable substitute." }
      ]
    },
    {
      id: "switch-heading",
      type: "heading",
      level: 2,
      text: "Conditions that change the conclusion"
    },
    {
      id: "switch-list",
      type: "list",
      ordered: false,
      items: [
        "Powered chairs, unusual dimensions and battery type can change air and vehicle choices.",
        "No independent transfer makes aisle-chair, seat, toilet and emergency planning decisive.",
        "A companion does not make unsafe carrying, a narrow bathroom or a missing lift acceptable.",
        "Construction, maintenance or crowd controls can change a venue's route.",
        "Direct travel may beat a connection because each handoff adds a failure point.",
        "Fewer cities may add usable time by removing hotel moves and transfer checks."
      ]
    },
    {
      id: "final-check-heading",
      type: "heading",
      level: 2,
      text: "Final verification schedule"
    },
    {
      id: "final-check",
      type: "list",
      ordered: true,
      items: [
        "Before paying: obtain measurements, operating policies, accessible-room inventory and cancellation options.",
        "After booking: attach assistance requests to every transport segment and save written confirmations offline.",
        "Several days before use: reconfirm the terminal or station, room assignment, lift route, vehicle and venue access notice.",
        "On the day: contact the handoff point before leaving a safe location and activate the fallback at the first broken essential link."
      ]
    },
    {
      id: "scope",
      type: "callout",
      tone: "warning",
      title: "No individual facility guarantee",
      body: "Facilities, policies and staffing can change. Wheelchair fit and transfer safety are individual. Confirm directly with each operator and make medical or personal-care decisions with the appropriate professional; never treat a website icon, law or construction standard as proof of day-of suitability."
    },
    {
      id: "help-cta",
      type: "callout",
      tone: "decision",
      title: "Need a human access-chain review?",
      body: "Send your dates, travellers, wheelchair dimensions and transfer limits, plus the cities you are considering and an approximate budget. A useful review identifies the weakest link and a fallback to verify against the traveller's requirements; it does not promise universal accessibility."
    },
    {
      id: "more-planning",
      type: "internal-links",
      title: "Continue planning",
      items: [
        { label: "Audit a community canteen as one complete accessible meal stop", href: "/guides/china-community-canteens-explained/", description: "Verify the entrance, queue, seating, toilet, food texture, payment and exit; admission alone does not make the meal workable." },
        { "label": "Choose a hotel near the right metro access", "href": "/guides/china-hotel-near-metro/", "description": "Use station exits and the complete last mile, not a straight-line distance." },
        { "label": "Verify an accessible hotel room", "href": "/guides/china-accessible-hotel-room-verification/", "description": "Check room measurements, assignment and fallback with the property." },
        { "label": "Choose a private transfer or public transport", "href": "/guides/china-private-transfer-or-public-transport/", "description": "Compare the exact vehicle and public-transport chains for one ground segment." },
        { "label": "Prepare for a first China high-speed train", "href": "/guides/china-high-speed-train-first-time-guide/", "description": "Understand the normal station sequence before adding assistance handoffs." },
        { "label": "Reduce backtracking with open-jaw flights", "href": "/guides/china-open-jaw-flights-route-planning/", "description": "Remove repeat transfers when the accessible chain supports different gateways." },
        { "label": "Audit China's 15-minute neighbourhoods", "href": "/guides/china-15-minute-neighbourhoods/", "description": "Test whether nearby daily services form a usable door-to-door chain instead of assuming proximity equals accessibility." }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and primary sources reviewed",
      items: [
        { "label": "Joint notice on age-friendly and accessible transport services", "url": "https://www.cdpf.org.cn/zwgk/zcwj/wjfb/e08521a0f1e741c6a2e77e4b43500796.htm", "publisher": "China Disabled Persons' Federation and transport authorities", "reviewedAt": "2026-08-13" },
        { "label": "GB 55019-2021 official announcement and text", "url": "https://www.beijing.gov.cn/zhengce/zhengcefagui/qtwj/202204/t20220412_2674451.html", "publisher": "Beijing Municipal Government republishing MOHURD standard", "reviewedAt": "2026-08-13" },
        { "label": "Special key-passenger reservation instructions", "url": "https://kyfw.12306.cn/otn/view/icentre_qxyyInfo.html", "publisher": "China Railway 12306", "reviewedAt": "2026-08-13" },
        { "label": "Measures for air transport of persons with disabilities", "url": "https://www.caac.gov.cn/XXGK/XXGK/ZFGW/201601/t20160122_27671.html", "publisher": "Civil Aviation Administration of China", "reviewedAt": "2026-08-13" },
        { "label": "2026 measures strengthening disability air-transport support", "url": "https://www.caac.gov.cn/XXGK/XXGK/GFXWJ/202607/t20260709_231243.html", "publisher": "Civil Aviation Administration of China", "reviewedAt": "2026-08-13" },
        { "label": "Beijing Subway accessibility facilities by station", "url": "https://www.bjsubway.com/station/wzass/", "publisher": "Beijing Subway", "reviewedAt": "2026-08-13" },
        { "label": "Palace Museum visitor routes and accessibility information", "url": "https://www.dpm.org.cn/Visit.html", "publisher": "The Palace Museum", "reviewedAt": "2026-08-13" },
        { "label": "Shanghai Museum visitor services", "url": "https://www.shanghaimuseum.net/mu/frontend/pg/service/services", "publisher": "Shanghai Museum", "reviewedAt": "2026-08-13" },
        { label: "Hero photograph: Beiyuan Station Exit A ramp, N509FZ (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:Exit_A_ramp_of_Beiyuan_Station_(20210709114327).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13" }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
