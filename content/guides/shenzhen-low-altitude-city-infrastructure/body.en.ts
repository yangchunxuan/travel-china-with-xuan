import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Shenzhen's low-altitude city is a ground-and-air system, not simply a sky full of drones. Dispatch hubs, landing points and collection lockers connect to managed routes, communications, navigation, weather sensing, monitoring and human handoffs. Cargo and selected public-service uses are visible; many passenger and coverage claims remain plans or targets. Check the operating state before putting one in a trip."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "The short answer: the drone is only the moving part",
      body: "A drone becomes city infrastructure when repeatable ground nodes, a managed route and a service chain connect before takeoff and after landing. A park delivery locker is one visible endpoint; dispatch, charging, weather, monitoring, permissions and collection are less visible. This neither authorizes personal-drone flight nor makes a planned passenger eVTOL bookable.",
      tone: "decision"
    },
    {
      id: "layers-heading",
      type: "heading",
      level: 2,
      text: "Read five layers, not one aircraft"
    },
    {
      id: "layers-table",
      type: "table",
      caption: "What turns repeated flights into an urban system",
      columns: ["Layer", "What it contains", "What a traveller might notice", "What remains hidden"],
      rows: [
        ["Ground nodes", "Dispatch hubs, landing or alternate sites, lockers, loading, charging and maintenance", "A marked cabinet or fenced area in a park, campus or commercial complex", "Property access, power, maintenance and emergency procedures"],
        ["Route network", "Repeated links between hubs or from merchants to collection points", "Aircraft arriving at the same endpoint rather than choosing an address freely", "Airspace coordination, obstacle surveys and route changes"],
        ["Connectivity and sensing", "Communications, navigation, surveillance and local weather observations", "Nearby antennas or weather equipment may be unobtrusive", "Coverage quality, data links, wind limits and alerts"],
        ["Digital service layer", "Flight-plan processing, aircraft status, route monitoring, warnings and coordination", "A delivery-status message or a controlled release at the locker", "Regulator and operator systems, control-room decisions and audit records"],
        ["Human service chain", "Merchant preparation, loading, ground supervision, collection and last metres", "Staff, riders or the customer still handle the parcel on the ground", "Who holds responsibility at each handoff and what happens after cancellation"]
      ]
    },
    {
      id: "two-networks-heading",
      type: "heading",
      level: 2,
      text: "Two cargo networks can share the sky but solve different jobs"
    },
    {
      id: "two-networks",
      type: "comparison",
      title: "Hub movement and last-mile response",
      columns: [
        {
          "heading": "Hub to hub",
          "body": "A logistics operator moves items between distribution points, industrial areas or cities. The aircraft covers a middle segment; sorting, road vehicles and couriers still connect sender and recipient. Most of this network is not a tourist experience."
        },
        {
          "heading": "Merchant to collection point",
          "body": "An immediate-delivery network links merchants to a fixed locker or landing point in a park, office district, library or community. A visitor may encounter this version. It is collection-point delivery, not flight to any bench or hotel room."
        },
        {
          "heading": "Medical and city service",
          "body": "Sample transfer, inspection, fire observation and emergency support use controlled institutional workflows. A traveller may see an aircraft or nest, but access and priority belong to the responsible agency or operator, not to a public booking marketplace."
        }
      ]
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two traveller scenarios make the system easier to see"
    },
    {
      id: "scenarios",
      type: "comparison",
      title: "Observe the service without overstating it",
      columns: [
        {
          "heading": "You find a delivery locker in a park",
          "body": "Identify the current operator notice and exact collection point. Merchants, app access, delivery windows and weather status can change. If an order is accepted, follow merchant preparation, dispatch, flight, controlled arrival and collection. If the drone leg is cancelled, use ordinary food or courier delivery."
        },
        {
          "heading": "You see a drone nest near a public facility",
          "body": "Treat it as managed equipment, not an attraction. It may support medical transfers, inspection or emergency response and may be inactive. Keep clear, do not photograph sensitive screens or labels, and use the agency's public explanation—not appearance—to identify its purpose."
        }
      ]
    },
    {
      id: "evidence-heading",
      type: "heading",
      level: 2,
      text: "A landing pad is evidence of a node, not proof of a service"
    },
    {
      id: "evidence-states",
      type: "table",
      caption: "Four operating states that headlines often blur",
      columns: ["State", "Evidence needed", "Safe traveller conclusion"],
      rows: [
        ["Plan or target", "An official plan, construction target or future-tense announcement", "The city intends to build or expand it; completion and public access are unverified"],
        ["Test or demonstration", "A dated test, invited flight or one-off route trial", "The equipment flew under that event's conditions; no repeat service is implied"],
        ["Institutional operation", "A named operator, task, node and repeated service for logistics or an agency", "A real operating workflow exists, but it may be closed to the general public"],
        ["Public consumer service", "A current booking or ordering channel, terms, identity/payment rules, operating notice and recovery path", "A traveller may try to use it, subject to date, coverage, weather and account access"]
      ]
    },
    {
      id: "chain-heading",
      type: "heading",
      level: 2,
      text: "Follow one parcel through the complete chain"
    },
    {
      id: "chain",
      type: "list",
      ordered: true,
      items: [
        "A platform confirms that the merchant and fixed collection point belong to the same active service area.",
        "The merchant prepares and seals an item that fits the operator's weight, size and safety rules.",
        "Ground staff or an automated process transfers it to the dispatch node; the drone does not begin at the restaurant table.",
        "The operator checks aircraft, route, airspace, communications and weather under its own approved process.",
        "The aircraft follows a managed link to a receiving node rather than improvising a destination.",
        "The receiving system secures the item and sends a collection notice or hands it to another ground worker.",
        "If the aircraft, route, weather or node is unavailable, the operator cancels, delays or substitutes a ground leg according to its current service terms."
      ]
    },
    {
      id: "flight-boundary",
      type: "callout",
      title: "This is not a personal-drone flying guide",
      body: "China's CAAC identifies UOM as the official platform for registration, airspace information and flight processes; Shenzhen remains within national aviation and public-safety rules. A map colour, city slogan or delivery drone is not permission to copy an operator's route. This article gives no takeoff location, altitude, filing shortcut or tourist-flight recommendation.",
      tone: "warning"
    },
    {
      id: "targets-heading",
      type: "heading",
      level: 2,
      text: "Why Shenzhen's 2026 construction numbers need careful verbs"
    },
    {
      id: "targets",
      type: "paragraph",
      text: "The 2024–2026 infrastructure plan set end-2026 targets for landing facilities, commercial routes, coverage, monitoring and a Smart Integrated Low-Altitude System. It specified nodes for passenger aircraft, logistics, community delivery and city governance, plus communications, navigation, surveillance and weather networks. These figures show intended architecture—not a completion audit, proof of a working pad at every listed location or evidence that passenger tickets are sold. Later official reports call cargo delivery the most mature segment; keep it separate from passenger ambition."
    },
    {
      id: "tradeoffs-heading",
      type: "heading",
      level: 2,
      text: "Infrastructure moves costs and risks; it does not erase them"
    },
    {
      id: "tradeoffs",
      type: "table",
      caption: "Questions behind the spectacle",
      columns: ["Issue", "Potential value", "Question the city still has to manage"],
      rows: [
        ["Speed and reach", "Aerial segments can bypass a difficult ground leg", "Does sorting, waiting and final collection preserve the claimed time saving?"],
        ["Noise", "Routes can be concentrated and scheduled", "Who experiences repeated tonal noise, especially in quiet parks or homes?"],
        ["Privacy", "Managed corridors can limit arbitrary movement", "What sensors and data are used, retained and shared along the route?"],
        ["Safety and resilience", "Monitoring, weather sensing and alternate sites add safeguards", "What closes a route, who responds to a failure and how is the public protected below?"],
        ["Land and access", "Shared nodes can serve several workflows", "Who provides roof, park or street space, power and secure public access?"],
        ["Equity", "A new network can improve access to hard-to-serve places", "Do less-served neighbourhoods receive benefits or mainly experience overflight and noise?"]
      ]
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "Recover when the futuristic promise does not match the street"
    },
    {
      id: "recovery",
      type: "list",
      items: [
        "No locker or route at the published place: check the venue's current notice and the operator's live service area; use normal ground delivery if the node is absent or inactive.",
        "Order accepted but drone leg suspended: keep the order reference, read the substitution or cancellation message and choose pickup or ground delivery rather than placing duplicates.",
        "A demonstration is advertised as a regular route: ask for a dated public booking channel and operating terms. Without them, treat it as a viewing event only.",
        "A passenger aircraft is displayed at an operation site: do not travel for a ride until the named operator publishes public ticketing, passenger eligibility, insurance disclosure and cancellation rules for that location.",
        "Conflicting route totals: record publisher, reporting date, geography and whether a 'route' means an approved link, a currently active service or a cumulative opening. Do not combine unlike totals."
      ]
    },
    {
      id: "final-check-heading",
      type: "heading",
      level: 2,
      text: "Final verification before you describe what you saw"
    },
    {
      id: "final-check",
      type: "list",
      items: [
        "Name the operator or public agency and the exact ground node, not only the aircraft maker.",
        "Attach a date and one of four states: plan, test, institutional operation or public consumer service.",
        "Separate cargo, medical/public service and passenger transport; one does not prove another.",
        "Confirm the ground handoff and fallback, because infrastructure continues after landing.",
        "Recheck live venue and operator notices on the visit date; this article's operating facts were reviewed on 13 August 2026."
      ]
    },
    {
      id: "links",
      type: "internal-links",
      title: "Continue planning Shenzhen and city movement",
      items: [
        {"label": "Choose where to stay in Shenzhen", "href": "/guides/shenzhen-where-to-stay-futian-luohu-nanshan/", "description": "Compare Futian, Luohu and Nanshan by the ground-level trip you actually need."},
        {"label": "Order Guangzhou, Shenzhen and Hong Kong", "href": "/guides/guangzhou-shenzhen-hong-kong-route-order/", "description": "Build a reliable regional route without assuming a future aerial link."},
        {"label": "Confirm shifted map pins in China", "href": "/guides/china-map-coordinate-offset-explained/", "description": "Cross-check the Chinese address and landmark for a delivery or meeting point."},
        {"label": "Private transfer or public transport?", "href": "/guides/china-private-transfer-or-public-transport/", "description": "Choose the working ground fallback when a novel service is not available."}
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources reviewed on 13 August 2026",
      items: [
        {"label": "Shenzhen low-altitude economy promotion regulations", "url": "https://www.sz.gov.cn/zfgb/2024/gb1319/content/post_11127288.html", "publisher": "Shenzhen Municipal People's Government", "reviewedAt": "2026-08-13"},
        {"label": "Shenzhen low-altitude infrastructure construction plan (2024–2026)", "url": "https://www.sz.gov.cn/szzt2010/wgkzl/jcgk/jcygk/zdzcjc/content/mpost_12305127.html", "publisher": "Shenzhen Development and Reform Commission", "reviewedAt": "2026-08-13"},
        {"label": "Shenzhen comprehensive three-dimensional transport network plan", "url": "https://www.sz.gov.cn/zfgb/2024/1348/content/post_11673966.html", "publisher": "Shenzhen Municipal People's Government", "reviewedAt": "2026-08-13"},
        {"label": "CAAC civil unmanned-aircraft regulatory service notice", "url": "https://www.caac.gov.cn/XXGK/XXGK/TZTG/202312/t20231231_222550.html", "publisher": "Civil Aviation Administration of China", "reviewedAt": "2026-08-13"},
        {"label": "Shenzhen 2025 plan execution report: 310 cumulative low-altitude logistics routes", "url": "https://fgw.sz.gov.cn/fzgggz/jjxs/content/post_12846529.html", "publisher": "Shenzhen Development and Reform Commission", "reviewedAt": "2026-08-13"},
        {"label": "Longhua low-altitude logistics and public-service account", "url": "https://www.sz.gov.cn/cn/xxgk/zfxxgj/gqdt/content/post_12800063.html", "publisher": "Longhua District Government", "reviewedAt": "2026-08-13"},
        {"label": "Drone delivery and management in Shenzhen parks", "url": "https://www.sz.gov.cn/ztfw/gysy/wyk_183958/content/post_11908288.html", "publisher": "Shenzhen Municipal Urban Management and Comprehensive Law Enforcement Bureau", "reviewedAt": "2026-08-13"},
        {"label": "Air-ground coordination in Shenzhen drone delivery", "url": "https://www.resci.cn/EN/abstract/article/1007-7588/73573", "publisher": "Resources Science", "reviewedAt": "2026-08-13"},
        {"label": "Societal acceptance of urban drones: literature review", "url": "https://www.sciencedirect.com/science/article/pii/S0160791X23001823", "publisher": "Technology in Society", "reviewedAt": "2026-08-13"},
        {"label": "Independent report on Shenzhen delivery drones and passenger-eVTOL limits", "url": "https://apnews.com/article/china-flying-cars-drones-evtol-airspace-72e7eb6883bd0b865a05cbb041d505fb", "publisher": "Associated Press", "reviewedAt": "2026-08-13"}
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
