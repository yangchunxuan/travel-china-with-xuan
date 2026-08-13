import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "The last night of a China trip is not automatically a sightseeing night or an airport-hotel night. It is a risk decision. A train shown as arriving five hours before an international flight may leave no usable margin after station exit, luggage, cross-city travel, check-in, security and exit formalities. An expensive airport hotel may be unnecessary when the journey is genuinely protected by one airline ticket. Start with responsibility and fallback options, not a fixed rule about how many hours are enough.",
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
      text: "Return to the international departure city the day before when the positioning journey is on a separate ticket, the outbound flight is early, the train or domestic flight has no useful fallback, the arrival point is not the departure airport, or one disruption would be hard for your party to absorb. Same-day positioning can be reasonable when the inbound and international sectors form a carrier-protected connection, or when a late outbound flight follows an early arrival with several workable alternatives and a generous door-to-gate margin. A timetable gap alone does not prove the connection works.",
    },
    {
      id: "decision-rule",
      type: "callout",
      title: "Decision rule",
      body: "If the international airline will not rebook the onward flight when the positioning journey fails, treat that journey as self-protected. Keep the last night in the departure city unless you can show both a complete backward timeline and a credible second way to reach the correct airport before its deadlines.",
      tone: "decision",
    },
    {
      id: "protection-gate",
      type: "heading",
      level: 2,
      text: "Gate 1: find out who protects the connection",
    },
    {
      id: "journey-types",
      type: "table",
      caption: "Three journeys that can look similar in a booking app carry different risk",
      columns: ["Journey structure", "If the first leg is disrupted", "Planning default"],
      rows: [
        ["Carrier-confirmed connecting ticket", "The ticketing carrier's conditions may provide rebooking when a preceding flight leaves less than the minimum connection time", "Verify the exact ticket, baggage handling, airport and minimum connection rules with the carrier"],
        ["Separate domestic and international air tickets", "The first airline may deliver only to the destination on its own ticket; the long-haul airline may treat a late arrival as your no-show", "Assume self-protected unless the carriers confirm otherwise in writing"],
        ["Rail or road positioning plus international flight", "The railway or road operator does not control the flight booking", "Treat the flight as self-protected and build a second workable positioning option"],
      ],
    },
    {
      id: "protection-explanation",
      type: "paragraph",
      text: "Air China's current conditions state that a later connecting flight may be changed without a change fee when a preceding flight delay reduces the connection below the applicable minimum. That wording applies to connecting flights under the carrier's ticket conditions, not automatically to any two flights a traveller happens to place next to each other. Cathay Pacific states the distinction directly: it can assist with a connection ticketed in the same itinerary, but cannot rebook a missed onward flight held on a separate ticket. Ask the ticketing carrier about your exact ticket rather than relying on a shared airline alliance, one booking email or through-tagged luggage.",
    },
    {
      id: "protection-checks",
      type: "list",
      items: [
        "Ask whether the domestic and international sectors are issued as one protected connecting ticket, not merely shown under one trip in an app.",
        "Confirm who will rebook the international sector if the first flight is late or cancelled for weather or air-traffic reasons.",
        "Confirm whether checked baggage goes to the final destination and whether you must collect and recheck it in China.",
        "If different airports are involved, ask whether the transfer is part of the airline's protected connection or entirely your responsibility.",
        "Save the carrier's written answer and the applicable fare conditions before committing to same-day positioning.",
      ],
    },
    {
      id: "same-booking-warning",
      type: "callout",
      title: "One screen is not proof of protection",
      body: "A travel agency can display separate tickets together, and an airline may through-check a bag as a courtesy without accepting responsibility for the next flight. The decisive evidence is the ticketing carrier's treatment of a missed connection on your exact booking.",
      tone: "warning",
    },
    {
      id: "location-gate",
      type: "heading",
      level: 2,
      text: "Gate 2: match the exact station, airport and terminal",
    },
    {
      id: "location-intro",
      type: "paragraph",
      text: "Arriving in the departure city is not the same as arriving at the departure airport. Beijing Capital (PEK) and Beijing Daxing (PKX) are separate airports. Shanghai Pudong (PVG) and Shanghai Hongqiao (SHA) are separate airports, while high-speed trains may arrive at Hongqiao Railway Station rather than either flight terminal you need. Shanghai's official Airport Link Line connects Hongqiao Airport Terminal 2 and Pudong Airport, but the published service has operating hours; it is transport to schedule, not an always-available airside connection.",
    },
    {
      id: "location-table",
      type: "table",
      caption: "Translate every city name into a physical transfer",
      columns: ["What to verify", "Why it changes the answer"],
      rows: [
        ["Arrival station or domestic airport", "Station exit, baggage collection and terminal walking begin only after the scheduled arrival"],
        ["International airport code and terminal", "A second airport or distant terminal can add a separate ground journey"],
        ["Transport operating window", "The fastest public option may not run at the hour shown in your plan"],
        ["Traffic-sensitive road time", "A taxi estimate is not a guaranteed arrival time, especially at commuter peaks or in bad weather"],
        ["Baggage path", "Collecting and rechecking bags removes time and adds another queue"],
      ],
    },
    {
      id: "backward-gate",
      type: "heading",
      level: 2,
      text: "Gate 3: build the day backward from the airline's deadline",
    },
    {
      id: "backward-intro",
      type: "paragraph",
      text: "Do not start with the train's advertised arrival and subtract it from the flight departure. Air China says check-in and boarding-gate closing times differ by airport and that a reservation may be cancelled when the passenger misses the specified deadline. Use the operating airline's current deadline for your airport, terminal, route and baggage situation. Then work backward through every step that must be complete before it.",
    },
    {
      id: "backward-steps",
      type: "list",
      ordered: true,
      items: [
        "Write the scheduled international departure, airport code and terminal.",
        "Insert the operating airline's current check-in or bag-drop deadline and boarding-gate closing time.",
        "Allow for terminal entry, security, exit formalities and the walk to the gate according to the airport and traveller needs.",
        "Add the verified journey from the railway station or domestic-arrival terminal to the international terminal.",
        "Add station exit, baggage collection, navigation, toilets and any recheck procedure.",
        "Place a disruption margin before that chain rather than hiding it inside optimistic walking times.",
        "Mark the latest fallback train, flight or ground option that can still complete the whole chain.",
      ],
    },
    {
      id: "no-universal-buffer",
      type: "callout",
      title: "There is no universal safe number of hours",
      body: "A four-hour gap can be comfortable inside one protected terminal transfer and unusable between an arriving train, a distant airport and a separate international ticket. Publish the inputs and the owner of each deadline; do not turn one airport's cutoff into a China-wide rule.",
      tone: "warning",
    },
    {
      id: "fallback-gate",
      type: "heading",
      level: 2,
      text: "Gate 4: test the fallback, not only the preferred service",
    },
    {
      id: "fallback-table",
      type: "table",
      caption: "A real fallback must still get you through the airport process",
      columns: ["Fallback question", "A strong answer", "A weak answer"],
      rows: [
        ["Is there another departure?", "A later train or flight still reaches the correct terminal before all verified deadlines", "There is another service, but it arrives after check-in closes"],
        ["Can you obtain a seat?", "Inventory is available or the alternative does not require scarce reserved capacity", "The backup is a popular train that may sell out"],
        ["Can you switch in time?", "Your fare can be changed and you will know early enough to act", "The disruption becomes clear only after the fallback has departed"],
        ["Is the route independent?", "A different line, airport or road avoids the same failure", "Both options depend on the same weather, airport or last train"],
        ["Can the party execute it?", "Every traveller and bag can make the transfer without splitting up", "It works only for a fast solo traveller with no checked luggage"],
      ],
    },
    {
      id: "rail-change-reality",
      type: "paragraph",
      text: "China Railway's official rules allow ticket changes only when there is available capacity, and a ticket can normally be changed once. Some after-departure changes are limited to trains on the same day. That makes 'we will just take the next train' an inventory claim, not a fallback plan. Check the exact date in 12306, and judge the next workable service rather than the next line in a timetable.",
    },
    {
      id: "cost-gate",
      type: "heading",
      level: 2,
      text: "Gate 5: compare the cost of protection with the cost of failure",
    },
    {
      id: "cost-table",
      type: "table",
      caption: "Price the last-night decision as a risk ledger",
      columns: ["Cost", "Position the night before", "Position on departure day"],
      rows: [
        ["Room", "One hotel night in or near the departure city", "Potentially avoided"],
        ["Extra transfer", "Earlier station-to-hotel and hotel-to-airport journeys", "One compressed station- or airport-to-terminal journey"],
        ["Fare flexibility", "May allow a cheaper fixed train because the flight is next day", "A flexible or replaceable positioning fare may be worth more"],
        ["Disruption", "Usually loses leisure time or a room night", "May require a new long-haul ticket, hotel, meals and visa or entry arrangements"],
        ["Group effect", "One extra room decision for the party", "Every additional traveller multiplies rebooking and care costs"],
        ["Energy", "Earlier finish and a predictable departure morning", "Early start, luggage handling and a high-stakes connection on the same day"],
      ],
    },
    {
      id: "same-day-comparison",
      type: "comparison",
      title: "Same-day positioning is not equally risky in every plan",
      columns: [
        {
          heading: "Stronger same-day case",
          items: [
            "The carrier confirms a protected connecting ticket and through journey.",
            "Arrival and departure use the same airport, with no baggage reclaim or self-transfer.",
            "The international flight leaves late and the positioning journey arrives early.",
            "More than one later fallback can still meet every verified deadline.",
            "The party can handle the transfer and the remaining financial exposure is acceptable.",
          ],
        },
        {
          heading: "Stronger night-before case",
          items: [
            "Rail, road or a separate domestic ticket feeds the international flight.",
            "The plan crosses airports, terminals or a large city with checked luggage.",
            "The outbound flight is early or the positioning service is the first practical one.",
            "The proposed service is also the last service that could work.",
            "A missed flight would be expensive or hard to recover during a busy travel period.",
          ],
        },
      ],
    },
    {
      id: "traveller-gate",
      type: "heading",
      level: 2,
      text: "Gate 6: let the least-flexible traveller set the margin",
    },
    {
      id: "traveller-comparison",
      type: "comparison",
      columns: [
        {
          heading: "More margin is usually justified",
          items: [
            "Older travellers, young children or anyone who needs wheelchair or assisted service are in the party.",
            "Medication, meals, toileting or rest cannot be compressed when transport is late.",
            "The group has several large bags, sports equipment or items that require special check-in.",
            "One person cannot navigate a replacement route alone if the group is separated.",
          ],
        },
        {
          heading: "A same-day plan may remain manageable",
          items: [
            "The party is small, mobile and familiar with the transfer.",
            "Luggage is light and there is no special check-in requirement.",
            "The fallback is simple enough to execute without local-language negotiation.",
            "The traveller can absorb the financial loss without jeopardising the rest of the journey home.",
          ],
        },
      ],
    },
    {
      id: "where-to-sleep",
      type: "heading",
      level: 2,
      text: "Returning early does not always mean sleeping at the airport",
    },
    {
      id: "where-to-sleep-text",
      type: "paragraph",
      text: "Once you decide to protect the departure, choose the last-night location from the flight time and verified airport access. A central hotel can preserve a final dinner and work for a later flight. An airport or airport-rail hotel can reduce the first transfer for an early flight. The right trade-off depends on check-in time, terminal, luggage and the first operating transport; this article does not turn that choice into a generic hotel list.",
    },
    {
      id: "comparison-method",
      type: "heading",
      level: 2,
      text: "Run one clean decision test",
    },
    {
      id: "comparison-steps",
      type: "list",
      ordered: true,
      items: [
        "Record the preceding city, planned positioning service, international airport, terminal, flight and traveller constraints.",
        "Ask the ticketing carrier in writing whether the journey is protected and what happens after a missed connection.",
        "Build the full backward timeline using the operating airline's current deadlines.",
        "Add the first service's plausible disruption margin and one genuinely executable fallback.",
        "Price a night-before option and the maximum self-protected failure, including every traveller.",
        "Choose same-day positioning only if the timeline, fallback and loss are all acceptable.",
      ],
    },
    {
      id: "stop-rule",
      type: "heading",
      level: 2,
      text: "A practical stop rule",
    },
    {
      id: "stop-comparison",
      type: "comparison",
      columns: [
        {
          heading: "Move the last night to the departure city",
          items: [
            "Protection cannot be confirmed.",
            "The exact airports or terminals differ.",
            "Only the preferred service can make the flight.",
            "The calculation needs every step to run on time.",
            "The loss would exceed what the party is willing or able to absorb.",
          ],
        },
        {
          heading: "Keep the last night elsewhere",
          items: [
            "Connection protection is confirmed or the self-transfer remains robust.",
            "The airport and baggage path are unambiguous.",
            "At least one independent fallback still clears all deadlines.",
            "The margin survives realistic station, traffic and terminal delays.",
            "The remaining exposure fits the budget and traveller limits.",
          ],
        },
      ],
    },
    {
      id: "before-booking",
      type: "heading",
      level: 2,
      text: "Before booking, answer these nine questions",
    },
    {
      id: "booking-checklist",
      type: "list",
      items: [
        "What exact airport code and terminal does the international flight use?",
        "What exact station or airport does the positioning journey reach?",
        "Are the sectors a protected connecting ticket or separate transport contracts?",
        "Who rebooks the international flight if the first journey is late?",
        "Must you collect and recheck baggage?",
        "What check-in, bag-drop and boarding deadlines apply to this flight?",
        "What is the last fallback that can still complete every airport step?",
        "Can every traveller execute that fallback with their luggage?",
        "Is the hotel cost larger or smaller than the financial and physical exposure you keep?",
      ],
    },
    {
      id: "human-help",
      type: "heading",
      level: 2,
      text: "If the decision is still close",
    },
    {
      id: "human-help-text",
      type: "paragraph",
      text: "Leave your travel dates, number of travellers, rough total budget, the city you will be in before departure, and the exact international flight time and airport. A Homeground trip planner can help test the workable risk windows without publishing a private, copy-ready itinerary.",
    },
    {
      id: "related-guides",
      type: "internal-links",
      title: "Continue planning",
      items: [
        {
          label: "Check whether your China itinerary is too rushed",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description: "Measure transfer load and recovery time before fixing the final city order.",
        },
        {
          label: "Estimate the full cost of a China trip",
          href: "/guides/how-much-does-a-china-trip-cost/",
          description: "Compare one protective hotel night with the rest of the trip budget.",
        },
        {
          label: "Plan China with older parents",
          href: "/guides/china-itinerary-with-older-parents/",
          description: "Adjust connection margins for a multigenerational party.",
        },
        { label: "Match the hub to the correct slope", href: "/guides/changbai-mountain-hubs-to-park-gates/", description: "Use a confirmed North or West Scenic Area booking to choose Changbaishan Station, Changbaishanxi Station or Changbaishan Airport and plan the road transfer." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources reviewed",
      items: [
        {
          label: "General Conditions of Carriage: connecting-flight changes and check-in deadlines",
          url: "https://webresource.airchina.com.cn/en-US/content/trans_conditions/dcpb/",
          publisher: "Air China",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Missed connections on separate tickets",
          url: "https://www.cathaypacific.com/cx/en_BE/faqs/check-in/through-check-to-final-destination-on-separate-tickets/if-my-flight-is-delayed-or-cancelled-how-will-through-checked-baggage-and-check-in-be-handled-by-cathay-pacific.html",
          publisher: "Cathay Pacific",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Ticket change, refund and capacity rules",
          url: "https://www.12306.cn/en/faq.html?item=1",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Official China Railway route and ticket query",
          url: "https://www.12306.cn/en/left-ticket.html?linktypeid=dc",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Shanghai Airport Link Line locations and operating hours",
          url: "https://www.shairport.com/enpd/sy/index.html",
          publisher: "Shanghai Airport Authority",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Beijing Capital Airport bus links, including Daxing Airport",
          url: "https://www.bcia.com.cn/jcbs.html",
          publisher: "Beijing Capital International Airport",
          reviewedAt: "2026-08-11",
        },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
