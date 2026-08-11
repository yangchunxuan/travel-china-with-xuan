import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "An open-jaw trip arrives in one Chinese city and leaves from another, while you cover the gap between them yourself. It is often the cleaner shape for a linear China trip—but only after the entry rules, exact airports, fare conditions and cost of the avoided backtrack all survive the same comparison.",
    },
    {
      id: "quick-answer",
      type: "heading",
      level: 2,
      text: "The short answer",
    },
    {
      id: "quick-answer-text",
      type: "paragraph",
      text: "Start with an open-jaw quote when your proposed stops form a line and returning to the first city would add a substantial transfer or a defensive final-night hotel. Keep the same-city round trip in the comparison when it has much better nonstop schedules, materially better ticket conditions, or a saving larger than the full cost of getting back—not merely larger than the train or domestic-flight fare.",
    },
    {
      id: "decision-rule",
      type: "callout",
      title: "Decision rule",
      body: "Choose the open jaw only when its extra international-ticket cost is lower than the return-to-start transport, transfers, possible hotel, lost usable time and added disruption risk that it removes. Entry eligibility is a gate, not a price item.",
      tone: "decision",
    },
    {
      id: "what-to-compare",
      type: "heading",
      level: 2,
      text: "First, compare the right three bookings",
    },
    {
      id: "booking-types",
      type: "table",
      caption: "Three booking shapes that can look similar on a search screen",
      columns: ["Booking shape", "What it contains", "What to check"],
      rows: [
        ["Open jaw through a multi-city search", "Home to China city A, then China city B to home; you arrange the surface journey from A to B", "Whether the flights price as one ticket or order, plus change, refund, baggage and missed-connection terms"],
        ["Two separate international one-ways", "One booking into A and a separate booking out of B", "Total fare and bags, but also the lack of automatic protection between unrelated tickets and the rules of each booking"],
        ["Same-city round trip", "Home to A and A to home, plus a domestic return from the end of the trip", "The domestic leg, local transfers, buffer, possible last-night hotel and the usable day it may consume"],
      ],
    },
    {
      id: "open-jaw-term",
      type: "paragraph",
      text: "Airlines and sellers often expose this through a “multi-city” search. IATA treats open-jaw itineraries as a recognised fare structure, but a search label does not tell you whether two offers have the same ticketing carrier or protections. Read the final itinerary and fare conditions before payment.",
    },
    {
      id: "entry-gate",
      type: "heading",
      level: 2,
      text: "Gate 1: can your entry basis support the route?",
    },
    {
      id: "entry-general",
      type: "paragraph",
      text: "China’s general exit-entry law requires travellers to use ports open to foreign traffic and complete border inspection. It does not itself state a general requirement that an ordinary visitor must leave through the airport used for arrival. That is not permission to ignore the conditions of a particular visa, visa-free arrangement or port-issued document: the specific entry basis always controls.",
    },
    {
      id: "entry-checks",
      type: "list",
      items: [
        "Ordinary visa or broad visa-free entry: verify validity, permitted entries, stay duration and any annotation or regional limit on the document or official policy.",
        "240-hour visa-free transit: this is a transit policy, not a substitute for an ordinary round trip. The official rule requires an eligible traveller, an eligible port, a confirmed onward arrangement to a third country or region, and travel within the permitted area.",
        "Port visa or special regional permission: restrictions may specify the entry port, stay area or exit port. A port visa holder normally enters through the issuing port.",
        "Any uncertainty: confirm against the National Immigration Administration or the competent Chinese mission before buying a non-refundable ticket.",
      ],
    },
    {
      id: "transit-warning",
      type: "callout",
      title: "A common transit mistake",
      body: "Home country → China → home country does not meet the third-country logic of the 240-hour visa-free transit policy. Changing the Chinese arrival and departure cities does not fix that. Hong Kong and Macao can count as separate regions in transit routing, but every port, ticket and permitted-stay condition still needs its own check.",
      tone: "warning",
    },
    {
      id: "route-shape",
      type: "heading",
      level: 2,
      text: "Gate 2: is the route actually linear?",
    },
    {
      id: "route-shape-comparison",
      type: "comparison",
      title: "Open jaw is strongest for a line, not automatically for every multi-city trip",
      columns: [
        {
          heading: "Strong open-jaw signal",
          items: [
            "The trip keeps moving in one broad direction.",
            "The last planned stop has a workable international gateway or a simple link to one.",
            "Returning to the first city duplicates a long segment.",
            "The avoided return would otherwise force an extra transfer or final hotel night.",
          ],
        },
        {
          heading: "Same-city return may be stronger",
          items: [
            "The route naturally loops back near the starting gateway.",
            "Only one gateway has a sensible nonstop or low-risk schedule for your home market.",
            "The second gateway requires a fragile self-connection or airport change.",
            "The open-jaw premium remains higher after every backtrack cost is counted.",
          ],
        },
      ],
    },
    {
      id: "route-shape-text",
      type: "paragraph",
      text: "Draw only nodes and arrows before choosing cities: arrival gateway → intended regions → departure gateway. If the last arrow points all the way back across the route solely because of the international ticket, price the open jaw. If the geography already returns you close to the first gateway, a round trip is not automatically wasted motion.",
    },
    {
      id: "true-cost",
      type: "heading",
      level: 2,
      text: "Gate 3: compare the true backtrack cost",
    },
    {
      id: "true-cost-intro",
      type: "paragraph",
      text: "A cheap return train or domestic flight can still create an expensive day. Build the comparison with current live quotes on the same dates, passenger mix, cabin and baggage allowance. Use the official 12306 query for rail options and the actual airline or airport information for flights and terminals; do not rely on an old blog timetable.",
    },
    {
      id: "cost-table",
      type: "table",
      caption: "Put these items on both sides of the comparison",
      columns: ["Cost or constraint", "Open jaw", "Same-city round trip"],
      rows: [
        ["International flights", "Multi-city total, including taxes and bags", "Round-trip total on the same dates and conditions"],
        ["Domestic return", "Usually removed", "Train or flight back to the original gateway"],
        ["Local transfers", "Transfer to the final gateway airport", "End-city transfer, domestic arrival transfer, then another transfer to the international airport"],
        ["Hotel", "Only if the outbound timing needs it", "Add a final-night hotel if a same-day return is too fragile"],
        ["Usable time", "Time required to reach the departure gateway", "Door-to-door backtrack, check-in, waiting, luggage and recovery time"],
        ["Risk", "Fare-change rules and reliability at the second gateway", "Domestic disruption feeding a separate international departure"],
      ],
    },
    {
      id: "time-value",
      type: "callout",
      title: "Do not invent a universal hourly value",
      body: "Mark the backtrack as a quarter day, half day or full usable day for your party, then decide what that lost time is worth to you. A family carrying luggage and an unhurried solo traveller may price the same transfer very differently.",
      tone: "neutral",
    },
    {
      id: "airport-codes",
      type: "heading",
      level: 2,
      text: "Gate 4: compare airports, not just city names",
    },
    {
      id: "airport-codes-text",
      type: "paragraph",
      text: "Several Chinese gateways have more than one airport. Beijing may appear as PEK or PKX, Shanghai as PVG or SHA, and Chengdu as CTU or TFU. The cheaper fare can be attached to the airport that adds the harder hotel transfer, an inter-airport move or a less useful departure time. Shanghai Airport’s own passenger information, for example, treats Pudong and Hongqiao as distinct airports connected by ground transport. Read every code and terminal in the final booking.",
    },
    {
      id: "airport-code-checks",
      type: "list",
      items: [
        "Search the exact airport code shown on the ticket, not the city name alone.",
        "Measure hotel-to-terminal time at the actual hour of travel and include the check-in deadline.",
        "If the itinerary changes airports, assume baggage collection and re-check are required unless the airline confirms otherwise for that exact itinerary.",
        "Treat a self-transfer between separate tickets as your responsibility unless written ticket conditions say otherwise.",
      ],
    },
    {
      id: "city-order",
      type: "heading",
      level: 2,
      text: "Use the flights to choose direction—not a slogan about which city comes first",
    },
    {
      id: "city-order-text",
      type: "paragraph",
      text: "There is no universal rule that a particular Chinese city should always be the beginning or end. Test both directions. A route can be geographically neat yet operationally poor if the arrival lands late before a fixed early start, or if the final gateway offers only a tight self-connection to the long-haul flight.",
    },
    {
      id: "direction-table",
      type: "table",
      caption: "What makes a gateway better at the start or the end",
      columns: ["At the start", "At the end"],
      rows: [
        ["A manageable arrival time and simple transfer to the first hotel", "A reliable path from the final hotel to the exact departure airport"],
        ["A forgiving first day after immigration, baggage and possible jet lag", "Enough buffer before a separate positioning flight or train"],
        ["No hard-to-replace booking immediately after a late arrival", "A long-haul schedule and fare conditions that work for the whole party"],
        ["A practical onward connection when it is time to leave the first region", "No unnecessary airport change created by the cheapest headline fare"],
      ],
    },
    {
      id: "traveller-limits",
      type: "heading",
      level: 2,
      text: "Traveller limits can reverse the answer",
    },
    {
      id: "traveller-comparison",
      type: "comparison",
      columns: [
        {
          heading: "Open jaw often helps",
          items: [
            "Older travellers or families avoid repeating a long transfer with luggage.",
            "A shorter final travel day leaves more recovery margin before the flight home.",
            "Fewer duplicate kilometres can protect a slower overall pace.",
          ],
        },
        {
          heading: "Open jaw can add friction",
          items: [
            "The second airport has a harder transfer or weaker accessibility support.",
            "Separate one-way tickets split the party’s change and baggage conditions.",
            "A wheelchair, infant, large group or special-service request is easier to manage on one carrier and booking.",
          ],
        },
      ],
    },
    {
      id: "quote-method",
      type: "heading",
      level: 2,
      text: "Run one clean quote comparison",
    },
    {
      id: "quote-steps",
      type: "list",
      ordered: true,
      items: [
        "Fix the international travel dates, passenger ages, cabin and checked-bag requirement.",
        "Quote a same-city round trip and save the exact flight times and fare conditions.",
        "Quote both open-jaw directions through the multi-city search: arrive A/leave B, then arrive B/leave A.",
        "If relevant, quote two one-ways separately—but label them as separate-ticket risk, not as an equivalent product.",
        "Add every return-to-start transport, transfer, hotel and buffer to the same-city option.",
        "Reject any option that fails the entry-rule or traveller-limit gate before comparing the remaining totals.",
      ],
    },
    {
      id: "before-paying",
      type: "heading",
      level: 2,
      text: "Before paying, answer these eight questions",
    },
    {
      id: "paying-checklist",
      type: "list",
      items: [
        "What exact visa or visa-free basis will each traveller use?",
        "Does the route satisfy every port, third-country and permitted-area condition that applies?",
        "Are the arrival and departure airport codes the ones you intended?",
        "Is the route a line, a loop, or a line forced into a loop by the ticket?",
        "What does the backtrack cost door to door, including a safe buffer?",
        "Are baggage, seat, change and refund conditions comparable?",
        "Who carries luggage, needs mobility help, travels with a child, or cannot absorb a broken self-connection?",
        "Would reversing the direction produce a better arrival day or safer departure day?",
      ],
    },
    {
      id: "human-help",
      type: "heading",
      level: 2,
      text: "If the two totals are close",
    },
    {
      id: "human-help-text",
      type: "paragraph",
      text: "Leave your travel dates, number of travellers, the cities you are considering and a rough total budget. A Homeground trip planner can help compare the workable route shapes without pretending that one airport pattern fits every China trip.",
    },
    {
      id: "related-guides",
      type: "internal-links",
      title: "Continue planning",
      items: [
        {
          label: "Check whether your China itinerary is too rushed",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description: "Test transfer load and usable time before adding another stop.",
        },
        {
          label: "Estimate the full cost of a China trip",
          href: "/guides/how-much-does-a-china-trip-cost/",
          description: "Place transport choices inside the whole-trip budget.",
        },
        {
          label: "Check whether a 240-hour visa-free transit route qualifies",
          href: "/guides/china-240-hour-visa-free-transit-route-check/",
          description: "Test the third-country, port and permitted-area conditions separately from route convenience.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources reviewed",
      items: [
        {
          label: "Exit and Entry Administration Law of the People’s Republic of China",
          url: "https://en.nia.gov.cn/n147418/n147458/c155978/content.html",
          publisher: "National Immigration Administration",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Conditions and ports for the 240-hour visa-free transit policy",
          url: "https://en.nia.gov.cn/n147418/n147468/c187308/content.html",
          publisher: "National Immigration Administration",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Port visa application and issuance rules",
          url: "https://en.nia.gov.cn/n147423/n147478/n147715/c158232/content.html",
          publisher: "National Immigration Administration",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Normal Fare Open Jaw business definition",
          url: "https://airtechzone.iata.org/aidm_model/21.3/EARoot/EA4/EA1/EA2/EA6310.htm",
          publisher: "International Air Transport Association",
          reviewedAt: "2026-08-10",
        },
        {
          label: "NDC@Scale multi-city and open-jaw shopping capability",
          url: "https://www.iata.org/contentassets/a00d606cc0614ffb81f3ddf5c547cb2e/ndcscale-capabilities-definitions.pdf",
          publisher: "International Air Transport Association",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Air China multi-city booking search",
          url: "https://m.airchina.com.cn/ac/c/invoke/qryFlights%40pg?transfer=flight%7CPEK%7C%7C1%7C0%7C0%7CEconomy%7C",
          publisher: "Air China",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Official China Railway route query",
          url: "https://www.12306.cn/en/left-ticket.html?linktypeid=dc",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Pudong and Hongqiao airport passenger information",
          url: "https://www.shairport.com/enpd/",
          publisher: "Shanghai Airport Authority",
          reviewedAt: "2026-08-10",
        },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
