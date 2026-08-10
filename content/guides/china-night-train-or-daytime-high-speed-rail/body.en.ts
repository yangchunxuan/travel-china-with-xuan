import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "An overnight sleeper can replace both a daytime transfer and a hotel night. It can also leave you awake, unwashed and waiting hours for the next hotel room at 06:00. The useful comparison is not “one train ticket versus another”; it is the cost and usable time of one complete night-to-morning sequence.",
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
      text: "Choose the night train when an actual berth is available on your date, the departure covers a normal sleep window, the arrival connects cleanly to the next hotel or activity, and your party can function after a shared night onboard. Choose daytime high-speed rail plus a hotel when the night option is only a seat, arrives at an awkward hour, requires a major detour, or saves money only by pretending that sleep and recovery have no value.",
    },
    {
      id: "decision-rule",
      type: "callout",
      title: "Decision rule",
      body: "A night train wins only if it protects both the budget and the following day. If the fare saves one hotel night but costs most of the next day in fatigue, waiting or recovery, it has shifted the cost rather than removed it.",
      tone: "decision",
    },
    {
      id: "verify-product",
      type: "heading",
      level: 2,
      text: "Gate 1: verify what the train actually sells",
    },
    {
      id: "product-table",
      type: "table",
      caption: "Three different products are often described loosely as a “night train”",
      columns: ["Product", "What you are buying", "Planning implication"],
      rows: [
        ["Conventional overnight sleeper", "A berth on a slower conventional service, with the privacy and layout determined by the booked sleeper class and rolling stock", "May create a useful overnight window, but compare the exact station pair and total duration"],
        ["High-speed sleeper", "A berth on an overnight EMU service where that train and date offer sleeper inventory", "Faster does not mean widely available; confirm the exact service in 12306"],
        ["Late-night or overnight seat", "A seat on a train that happens to operate during the night", "This is not a hotel replacement for most travellers, even when the train number begins with D or G"],
      ],
    },
    {
      id: "product-reality",
      type: "paragraph",
      text: "China Railway’s booking interface distinguishes hard sleeper, soft sleeper, moving sleeper and other berth categories from seats. The official train-layout page also shows that sleeper EMU designs are not identical. A train mentioned in a blog, video or old timetable may run only on selected dates, may change rolling stock, or may offer seats rather than berths on the date you need. Search the exact origin, destination and travel date in official 12306 before building the route around it.",
    },
    {
      id: "schedule-checks",
      type: "list",
      items: [
        "Use the exact station names, not only the city names; a slower train may use a different station from the daytime high-speed service.",
        "Confirm that the inventory label says sleeper or berth, not second-class seat, hard seat or standing/no-seat.",
        "Read the departure date carefully when the clock is after midnight. A 00:30 train belongs to the new calendar day even if you leave the hotel the previous evening.",
        "Recheck the train number and berth type before payment and again if the schedule changes.",
      ],
    },
    {
      id: "not-every-night-train",
      type: "callout",
      title: "Night service does not guarantee a bed",
      body: "Railways may add late-night high-speed trains during peak travel periods. Those extra trains can be seat-only services. Do not infer “sleeper” from the departure hour or the D/G prefix; the booked seat or berth category is what matters.",
      tone: "warning",
    },
    {
      id: "true-cost",
      type: "heading",
      level: 2,
      text: "Gate 2: calculate the whole night, not one missing hotel bill",
    },
    {
      id: "true-cost-intro",
      type: "paragraph",
      text: "Quote both options on the same date and for the same travellers. Then add the costs created by their different clocks. The sleeper may remove a room night, but it can add luggage storage, a private waiting space, an early room, extra meals, or a taxi when metro service has stopped. Daytime rail may cost a hotel night but preserve sleep and a predictable morning.",
    },
    {
      id: "cost-ledger",
      type: "table",
      caption: "A complete cost ledger for sleeper versus daytime rail",
      columns: ["Cost or value", "Overnight sleeper", "Daytime high-speed rail + hotel"],
      rows: [
        ["Rail fare", "Exact berth fare for every traveller", "Exact seat fare for every traveller"],
        ["Hotel", "Subtract only the room night truly avoided", "Room night at the departure or arrival city"],
        ["Station transfers", "Evening departure and early-arrival transport at the hours you will use it", "Transfers during normal service hours"],
        ["Luggage", "Storage before boarding or after early arrival if the hotel cannot hold it", "Normal hotel storage or room access"],
        ["Food and washing", "Late meal, breakfast and any paid place needed to wash or change", "Normal evening and morning hotel access"],
        ["Usable time", "Daylight protected only if you sleep and can start after arrival", "Daytime spent travelling, balanced against a rested next morning"],
        ["Recovery risk", "Value of a lighter next day if sleep fails", "Usually lower, but the daytime transfer still consumes scheduled hours"],
      ],
    },
    {
      id: "hotel-saving-trap",
      type: "callout",
      title: "The hotel-saving trap",
      body: "A hotel night buys more than a bed: a private bathroom, control of the lights, secure luggage, a predictable wake-up and somewhere to wait until morning. Subtract the room price only after checking which of those functions the night train and arrival plan still provide.",
      tone: "neutral",
    },
    {
      id: "sleep-gate",
      type: "heading",
      level: 2,
      text: "Gate 3: decide whether your party can really sleep",
    },
    {
      id: "sleep-comparison",
      type: "comparison",
      title: "The same berth can be efficient for one traveller and expensive for another",
      columns: [
        {
          heading: "A sleeper is more likely to work",
          items: [
            "You normally sleep reasonably well with motion, low light and other people nearby.",
            "The journey covers most of your normal sleeping hours rather than only part of the night.",
            "You have no demanding fixed booking immediately after arrival.",
            "Your luggage is compact enough to manage around the berth and station transfers.",
          ],
        },
        {
          heading: "Daytime rail is safer for the pace",
          items: [
            "You are a light sleeper or need predictable privacy, temperature or bathroom access.",
            "Boarding or arrival interrupts the middle of the night.",
            "A poor night would undermine the most important day of the trip.",
            "Someone in the party cannot climb, lift luggage or settle into the assigned berth safely.",
          ],
        },
      ],
    },
    {
      id: "berth-labels",
      type: "heading",
      level: 2,
      text: "Do not choose by the words “hard” and “soft” alone",
    },
    {
      id: "berth-table",
      type: "table",
      caption: "What each label should trigger you to verify",
      columns: ["Inventory label", "Typical trade-off", "Verify before booking"],
      rows: [
        ["Hard sleeper", "Usually the lowest-cost proper berth and the least privacy", "Open or enclosed layout, upper/middle/lower position, luggage space and exact carriage type"],
        ["Soft sleeper", "Usually fewer berths per compartment and more privacy at a higher fare", "Door and compartment layout, berth assignment, facilities and whether the premium still beats the hotel option"],
        ["Moving/high-speed sleeper", "Purpose-built overnight EMU berth with layouts that vary by trainset", "Exact train number, official layout when available, berth direction, service dates and current inventory"],
        ["Seat or no-seat", "Cheaper access to the train but no proper sleeping surface", "Treat as night transport, not as equivalent to a sleeper or hotel"],
      ],
    },
    {
      id: "facilities-warning",
      type: "paragraph",
      text: "Do not assume there will be a shower, private toilet, large suitcase compartment, charging point at every berth or hotel-style soundproofing. Facilities depend on the trainset and class. Use official layout information when available, then pack as if the overnight wash will be basic unless the operator confirms more.",
    },
    {
      id: "arrival-gate",
      type: "heading",
      level: 2,
      text: "Gate 4: test the arrival morning door to door",
    },
    {
      id: "arrival-table",
      type: "table",
      caption: "An early arrival is useful only when the city is ready for you",
      columns: ["Check", "Question to answer"],
      rows: [
        ["Arrival station", "Is it the station you expected, and how far is it from the next hotel or activity?"],
        ["Local transport", "Will metro, bus or a practical taxi option be operating at that hour?"],
        ["Hotel access", "Will the hotel store bags, provide a wash option or offer paid early check-in?"],
        ["Breakfast and waiting", "Is there a realistic place for the whole party to eat and wait if the room is unavailable?"],
        ["First commitment", "What happens if the train is late or nobody slept well?"],
      ],
    },
    {
      id: "arrival-warning",
      type: "callout",
      title: "Check both sides of midnight",
      body: "Transport authorities specifically warn night-train passengers to read after-midnight departure dates correctly and to check whether onward public transport runs at a night arrival. Put the hotel checkout, station arrival, train departure, destination arrival and first usable indoor stop on one timeline.",
      tone: "warning",
    },
    {
      id: "traveller-limits",
      type: "heading",
      level: 2,
      text: "Gate 5: let the least-flexible traveller decide",
    },
    {
      id: "traveller-comparison",
      type: "comparison",
      columns: [
        {
          heading: "Night travel may help",
          items: [
            "A family avoids a separate daytime transfer and another hotel change.",
            "A group can book suitable berths and keep the next morning deliberately light.",
            "A traveller values experience and protected daylight more than private-room comfort.",
          ],
        },
        {
          heading: "Night travel may fail",
          items: [
            "An older traveller or child cannot use an upper berth comfortably.",
            "The party needs adjacent berths but the available inventory does not provide them.",
            "Mobility equipment, large luggage, medication routines or privacy needs require a more controlled night.",
          ],
        },
      ],
    },
    {
      id: "children-rule",
      type: "paragraph",
      text: "For children, do not assume “free child” means a separate bed. China Railway’s rules distinguish travel without a separately occupied place from purchasing a child ticket or berth, and current EMU child discounts vary by class. Enter every child with the correct age and document in 12306, price the berth actually needed, and avoid asking an adult and child to share unless that is a deliberate, workable choice for the whole night.",
    },
    {
      id: "comparison-method",
      type: "heading",
      level: 2,
      text: "Run one clean comparison",
    },
    {
      id: "comparison-steps",
      type: "list",
      ordered: true,
      items: [
        "Fix the exact station pair, date, passenger ages and luggage needs.",
        "Search official 12306 and record only the berth inventory actually offered on that date.",
        "Quote a practical daytime high-speed train, not an artificially expensive or inconvenient one.",
        "Add the real hotel night, transfers, storage, early check-in and meals to each side.",
        "Draw the timeline from the first hotel checkout to the next hotel room or first commitment.",
        "Ask the least-flexible traveller what a failed night would do to the following day.",
        "Reject the sleeper if the answer depends on an unconfirmed berth, facility or transport connection.",
      ],
    },
    {
      id: "when-to-choose",
      type: "heading",
      level: 2,
      text: "A practical stop rule",
    },
    {
      id: "choose-comparison",
      type: "comparison",
      columns: [
        {
          heading: "Keep the sleeper in the plan",
          items: [
            "A suitable berth is bookable now.",
            "The clock covers a useful sleep window and the arrival morning works.",
            "The complete saving remains meaningful after all night logistics are added.",
            "The following day can absorb a slower start if needed.",
          ],
        },
        {
          heading: "Switch to daytime rail",
          items: [
            "Only seats or unsuitable berths remain.",
            "The journey is too short, too long or badly timed for a useful night.",
            "Early arrival creates hours of paid waiting or an extra room anyway.",
            "One poor night would damage a fixed, expensive or physically demanding day.",
          ],
        },
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
        "Is the ticket a berth, and what exact berth category is it?",
        "Are the station names, calendar date and after-midnight time correct?",
        "Can every traveller use the assigned berth and manage their luggage?",
        "Which hotel night is genuinely removed?",
        "Where will you wash, store bags, eat and wait after arrival?",
        "What local transport operates at the departure and arrival hours?",
        "Are change and refund conditions acceptable if the plan changes?",
        "What is the fallback for the next day if sleep fails?",
      ],
    },
    {
      id: "human-help",
      type: "heading",
      level: 2,
      text: "If the numbers are close",
    },
    {
      id: "human-help-text",
      type: "paragraph",
      text: "Leave your travel dates, number and ages of travellers, the two cities or regions you need to connect, and a rough total budget. A Homeground trip planner can help compare the workable travel windows without turning a changing rail timetable into a fixed private itinerary online.",
    },
    {
      id: "related-guides",
      type: "internal-links",
      title: "Continue planning",
      items: [
        {
          label: "Check whether your China itinerary is too rushed",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description: "Measure transfer load and recovery time before protecting another sightseeing day.",
        },
        {
          label: "Estimate the full cost of a China trip",
          href: "/guides/how-much-does-a-china-trip-cost/",
          description: "Put the rail-and-hotel decision inside the total trip budget.",
        },
        {
          label: "Plan China with older parents",
          href: "/guides/china-itinerary-with-older-parents/",
          description: "Adjust transport and recovery assumptions for a multigenerational party.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources reviewed",
      items: [
        {
          label: "Official China Railway route and ticket query",
          url: "https://www.12306.cn/en/left-ticket.html?linktypeid=dc",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Ticket change, berth and child-travel FAQs",
          url: "https://www.12306.cn/en/faq.html?item=1",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Official ticket channels, child tickets, accessibility and luggage FAQs",
          url: "https://www.12306.cn/en/faq.html?item=2",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Official train and sleeper-EMU layout reference",
          url: "https://www.12306.cn/index/view/station/train_intro.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Current EMU child-ticket discount update",
          url: "https://www.ln.gov.cn/web/ywdt/rdgz/2025090608541837883/index.shtml",
          publisher: "Liaoning Provincial Government / Xinhua",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Night-train timing, transfers and onward-transport guidance",
          url: "https://www.mot.gov.cn/zhuanti/2025chunyun/chunyunbaodao/202502/t20250207_4163813.html",
          publisher: "Ministry of Transport of the People’s Republic of China",
          reviewedAt: "2026-08-10",
        },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
