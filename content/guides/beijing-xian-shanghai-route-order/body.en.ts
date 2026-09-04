import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "For most first trips that include only these three cities, use Beijing → Xi'an → Shanghai or the exact reverse, with different international arrival and departure cities. The stronger direction is the one supported by the actual long-haul tickets and the fixed visits you care about. Xi'an works as the middle base. A round trip through one gateway can still work, but the return sector and final-flight buffer are real itinerary costs, not invisible travel time.",
    },
    {
      id: "direction-summary",
      type: "comparison",
      title: "Three route shapes, only two of them naturally linear",
      columns: [
        {
          heading: "Beijing → Xi'an → Shanghai",
          body: "Use this when the international ticket works into Beijing and out of Shanghai. It protects a forward chain and can finish in a large outbound gateway without returning north.",
        },
        {
          heading: "Shanghai → Xi'an → Beijing",
          body: "Use the reverse when the flights, first-day recovery or a dated reservation make Shanghai the better arrival and Beijing the safer departure end.",
        },
        {
          heading: "One gateway for both flights",
          body: "Add an explicit return sector and a final-city buffer, then compare the remaining protected days with a two-gateway ticket. If the weakest city becomes a token stop, shorten the route.",
        },
      ],
    },
    {
      id: "scope-boundary",
      type: "callout",
      tone: "neutral",
      title: "What this guide decides",
      body: "This is a named three-city order decision. It does not provide a day-by-day itinerary, live trains or flights, a universal number of nights, or a second version of Homeground's general rushed-itinerary test.",
    },
    {
      id: "gateway-heading",
      type: "heading",
      level: 2,
      text: "Choose the gateways before you choose the direction",
    },
    {
      id: "gateway-context",
      type: "paragraph",
      text: "A city name is not enough to calculate an arrival or departure. Beijing uses both Capital and Daxing airports, while Shanghai uses Pudong and Hongqiao. The cities also have multiple railway stations. Official Beijing and Shanghai guidance tells passengers to distinguish the actual airport, terminal and station; Xi'an's station network changed again when Xi'andong began operating in 2026. Therefore the stable decision is the city order. The operational plan stays provisional until every ticket shows an exact terminal or station.",
    },
    {
      id: "gateway-table",
      type: "table",
      caption: "Gateway conditions that change the route",
      columns: ["Known condition", "Best starting assumption", "What must remain open"],
      rows: [
        ["Arrive Beijing and depart Shanghai", "Build Beijing → Xi'an → Shanghai", "Exact Beijing airport, Shanghai airport and both rail stations"],
        ["Arrive Shanghai and depart Beijing", "Build Shanghai → Xi'an → Beijing", "First-day recovery, final-night location and dated venue closures"],
        ["Round trip through Beijing", "End back in Beijing before the outbound-flight buffer", "Whether Shanghai still earns the added return sector"],
        ["Round trip through Shanghai", "End back in Shanghai before the outbound-flight buffer", "Whether Beijing still earns the added return sector"],
        ["Long-haul tickets not yet purchased", "Price and compare both open-jaw directions and the true round trip", "Ticket conditions, baggage, separate-ticket risk and airport transfers"],
      ],
    },
    {
      id: "direction-heading",
      type: "heading",
      level: 2,
      text: "Do not choose the direction from a map alone",
    },
    {
      id: "direction-method",
      type: "list",
      ordered: true,
      items: [
        "Put the confirmed international arrival at one end and the outbound flight at the other. If both flights use one city, write the return sector on the calendar before counting sightseeing time.",
        "Mark trip-defining reservations and regular closure days. The Palace Museum normally closes on Mondays except national holidays and does not sell same-day tickets; this can change which Beijing days are usable, but it does not automatically reverse the whole trip.",
        "Reserve one protected Xi'an block for a priority that cannot be attached safely to a rail move. The Terracotta Army museum uses real-name advance booking and time-slot entry, so its dated rule matters more than a generic itinerary template.",
        "Check the named Shanghai venue rather than writing 'museum day.' Shanghai Museum branches have different regular closure days, so the branch belongs in the dependency ledger.",
        "Only then query official transport for the actual dates. A search result proves a dated option, not a permanent journey time or a promise that the same station will be used later.",
      ],
    },
    {
      id: "usable-days-heading",
      type: "heading",
      level: 2,
      text: "Count protected days, not the number printed on a tour title",
    },
    {
      id: "zero-baseline",
      type: "callout",
      tone: "decision",
      title: "Start every transfer at zero sightseeing blocks",
      body: "An international arrival, an international departure and each hotel-to-hotel city move begin as transfer time. Award one flexible morning or afternoon only after the dated door-to-door chain leaves an unbroken block. Never place a scarce timed reservation inside a block that has not yet been earned.",
    },
    {
      id: "usable-day-ledger",
      type: "table",
      caption: "What can and cannot earn a usable block",
      columns: ["Calendar event", "Conservative credit", "Evidence needed before upgrading it"],
      rows: [
        ["International arrival", "0", "Scheduled arrival, entry and baggage margin, actual airport transfer, luggage solution and a replaceable nearby activity"],
        ["Beijing–Xi'an or Xi'an–Shanghai move", "0", "Exact train or flight, both terminal approaches, checkout, baggage, arrival transfer and hotel access"],
        ["International departure", "0", "Actual airport and terminal, check-in requirement, baggage, ground transfer and disruption margin"],
        ["Day without a city or hotel move", "2 flexible half-day blocks", "Venue rules, geographic fit and enough recovery for the traveller's real pace"],
      ],
    },
    {
      id: "city-role-heading",
      type: "heading",
      level: 2,
      text: "Give each city a distinct job before giving it nights",
    },
    {
      id: "city-role-table",
      type: "table",
      caption: "A city earns time by protecting a distinct priority",
      columns: ["Base", "A defensible route role", "Warning that the role is too thin"],
      rows: [
        ["Beijing", "Imperial and national-history priorities, a separate Great Wall day, or several fixed visits spread across the city", "Its only priority is attached to arrival, departure or the Xi'an move"],
        ["Xi'an", "The mausoleum-site museum plus a distinct city-history or neighbourhood priority", "It is treated as a station stop between two larger cities"],
        ["Shanghai", "The urban end of the trip, a distinct museum or architecture interest, and a practical international gateway", "It exists only because the flight departs there, with no protected local priority"],
      ],
    },
    {
      id: "city-role-note",
      type: "paragraph",
      text: "Equal nights are not a sign of fairness. A Beijing plan with several geographically separate priorities may need more protected blocks than a Shanghai gateway stay; another traveller may reverse that balance for design, art, food or meetings. The useful question is whether each city still contains something non-substitutable after transfer time and recovery are removed.",
    },
    {
      id: "switch-heading",
      type: "heading",
      level: 2,
      text: "Know what would keep, reverse or shorten the chain",
    },
    {
      id: "switch-conditions",
      type: "comparison",
      title: "Decision conditions",
      columns: [
        {
          heading: "Keep the direction",
          items: [
            "The international gateways remove a return journey.",
            "Every city retains at least one protected, distinct priority.",
            "No scarce reservation depends on an unverified transfer block.",
          ],
        },
        {
          heading: "Reverse it",
          items: [
            "The opposite long-haul ticket is materially more workable after baggage and airport access are included.",
            "A true trip-defining reservation or closure fits safely only in the reverse sequence.",
            "Ending at the other gateway creates a stronger outbound-flight buffer.",
          ],
        },
        {
          heading: "Shorten it",
          items: [
            "A same-gateway return removes the only protected block in one city.",
            "One city offers no distinct priority beyond the gateway function.",
            "Mobility, jet lag, children or consecutive early starts require recovery the ledger does not contain.",
          ],
        },
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two route tests show why the same three dots give different answers",
    },
    {
      id: "scenario-open-jaw",
      type: "callout",
      tone: "neutral",
      title: "Test A: different arrival and departure cities",
      body: "A traveller arrives in Shanghai, has a fixed Shanghai museum interest, wants the Terracotta Army and several Beijing priorities, then flies home from Beijing. Shanghai → Xi'an → Beijing is coherent. The two moves still start at zero, but no domestic return is needed. The route remains valid only if the fixed visits sit on protected blocks rather than on the arrival or move days.",
    },
    {
      id: "scenario-roundtrip",
      type: "callout",
      tone: "warning",
      title: "Test B: Beijing round trip with the same wish list",
      body: "The same traveller now flies in and out of Beijing. A Shanghai → Beijing return and a final-flight buffer must be visible. If that consumes Shanghai's only local block or forces the Terracotta Army onto a move day, the route has not become efficient merely because a fast service exists. The repairs are a different international ticket, more nights, or removing the weakest city—not optimistic arithmetic.",
    },
    {
      id: "booking-heading",
      type: "heading",
      level: 2,
      text: "Book the route in dependency order",
    },
    {
      id: "booking-order",
      type: "list",
      ordered: true,
      items: [
        "Confirm entry eligibility, the international ticket structure, actual airports and change conditions.",
        "Record trip-defining venue rules and closure patterns, but do not assume future inventory is available.",
        "Place protected city days and transfer blocks; keep move-day activities replaceable.",
        "Use 12306 or the operating airline for dated transport and copy the exact station, airport and terminal into the trip record.",
        "Choose or recheck hotels against those terminals, especially when an early departure or late arrival would expose the plan.",
        "Recheck every dynamic field before the free-cancellation deadline and shortly before travel.",
      ],
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "Recover the route without rebuilding everything",
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "Small failures and proportionate repairs",
      columns: ["What changed", "Immediate response", "Route-level repair"],
      rows: [
        ["The dated service uses another station", "Recalculate both hotel-to-station chains", "Delete the move-day activity; keep the city order unless the connection itself fails"],
        ["A fixed attraction is unavailable", "Use a replaceable local module", "Change the city order only if that attraction is genuinely trip-defining and another date is confirmed"],
        ["The international arrival is delayed", "Go to the hotel and drop the optional first block", "Protect the first major visit on a later full day"],
        ["Energy is lower than assumed", "Keep the hotel and cancel the optional evening", "Return a block to recovery or remove the weakest stop before moving reservations"],
        ["The outbound airport or terminal changes", "Protect the flight and follow the operating carrier's notice", "Move the final overnight or reduce the last day's commitments"],
      ],
    },
    {
      id: "verification-heading",
      type: "heading",
      level: 2,
      text: "The final route is a list of verified fields, not a slogan",
    },
    {
      id: "verification-table",
      type: "table",
      caption: "Minimum final checks",
      columns: ["Checkpoint", "Verify", "Primary authority"],
      rows: [
        ["Before international purchase", "Arrival/departure city, airport, ticket structure, baggage and change conditions", "Operating airline and airport"],
        ["When domestic transport is bookable", "Date, exact station or airport, terminal, passenger record and ticket conditions", "China Railway 12306 or operating airline"],
        ["Before fixed visits", "Named branch, closure, reservation, passport entry and temporary notice", "Named museum or attraction"],
        ["Before cancellation deadlines", "Hotel location, luggage plan and the entire door-to-door transfer", "Hotel plus the relevant transport operators"],
      ],
    },
    {
      id: "editorial-judgment",
      type: "callout",
      tone: "warning",
      title: "What is assumption and what is evidence",
      body: "Official sources identify stations, airports and venue rules. Homeground's zero-block transfer baseline and protected-day method are conservative editorial judgments. They help prevent a fragile booking; they do not predict delays or create an official journey-time score.",
    },
    {
      id: "help-cta",
      type: "callout",
      tone: "decision",
      title: "Want a human route check?",
      body: "Leave your dates, number of travellers, rough budget and actual arrival and departure airports. Homeground can help identify the fragile transfer or fixed booking without pretending that an unverified timetable is confirmed.",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning",
      items: [
        { "label": "First Trip to China Planner", "href": "/plan/", "description": "Return to the parent planning path and choose the next decision." },
        { "label": "Choose open-jaw flights", "href": "/guides/china-open-jaw-flights-route-planning/", "description": "Compare different gateways with the true cost of returning to one city." },
        { "label": "Check whether the itinerary is too rushed", "href": "/guides/is-your-china-itinerary-too-rushed/", "description": "Audit the whole trip after this named three-city order is drafted." },
        { "label": "Prepare for a first high-speed train", "href": "/guides/china-high-speed-train-first-time-guide/", "description": "Handle passenger records and station procedure after the route is fixed." },
        { "label": "Protect the last night before an international flight", "href": "/guides/china-last-night-before-international-flight/", "description": "Strengthen the outbound end without turning it into another sightseeing day." }
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        { "label": "Date-specific railway search", "url": "https://www.12306.cn/en/left-ticket.html", "publisher": "China Railway 12306", "reviewedAt": "2026-09-01" },
        { "label": "Foreign-passport railway FAQ", "url": "https://www.12306.cn/en/faq.html", "publisher": "China Railway 12306", "reviewedAt": "2026-09-01" },
        { "label": "Beijing airport gateways", "url": "https://english.beijing.gov.cn/consuminginbeijing/wheretobuy/airports/", "publisher": "Beijing Municipal Government", "reviewedAt": "2026-09-01" },
        { "label": "Shanghai railway station guide", "url": "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html", "publisher": "Shanghai Municipal Government", "reviewedAt": "2026-09-01" },
        { "label": "Shanghai airport guide", "url": "https://english.shanghai.gov.cn/en-Individuals-Transportation-Airplane/20260813/7366238930024ac8b22e5adf82217bd8.html", "publisher": "Shanghai Municipal Government", "reviewedAt": "2026-09-01" },
        { "label": "Xi'andong railway station opening", "url": "https://en.xa.gov.cn/MediaCenter/News/2072253459180654594.html", "publisher": "Xi'an Municipal Government", "reviewedAt": "2026-09-01" },
        { "label": "Palace Museum visit rules", "url": "https://intl.dpm.org.cn/visit.html", "publisher": "Palace Museum", "reviewedAt": "2026-09-01" },
        { "label": "Terracotta Army official ticketing instructions", "url": "https://www.bmy.com.cn/jingtai/bmyweb/ticketing.html?pubDate=20260324", "publisher": "Emperor Qinshihuang's Mausoleum Site Museum", "reviewedAt": "2026-09-01" },
        { "label": "Shanghai Museum East visitor information", "url": "https://www.shanghaimuseum.cn/mu/frontend/pg/en/service/visit-east", "publisher": "Shanghai Museum", "reviewedAt": "2026-09-01" }
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
