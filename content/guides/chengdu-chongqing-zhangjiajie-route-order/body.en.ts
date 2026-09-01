import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "Use Chengdu → Chongqing → Zhangjiajie, or the exact reverse, only when all three cities keep a distinct protected visit. Chongqing is the natural middle stop, but it is not compulsory: if it has no priority of its own, compare a dated Chengdu–Zhangjiajie through journey with a connection and remove the Chongqing stay. Count usable sightseeing days before assigning nights.",
    },
    {
      id: "direction-comparison",
      type: "comparison",
      title: "Two coherent directions and one costly pattern",
      columns: [
        {
          heading: "Chengdu → Chongqing → Zhangjiajie",
          body: "Strong when the trip enters through Chengdu and continues east or south after Zhangjiajie. It protects a forward-moving chain without returning west.",
        },
        {
          heading: "Zhangjiajie → Chongqing → Chengdu",
          body: "Equally sound when the arrival works better near Zhangjiajie and the international or onward departure is stronger from Chengdu.",
        },
        {
          heading: "Start in Chongqing and visit both outer cities",
          body: "Usually repeats part of the corridor. Use it only when Chongqing is the real gateway or a fixed booking outweighs the extra move and final buffer.",
        },
      ],
    },
    {
      id: "scope-boundary",
      type: "callout",
      tone: "neutral",
      title: "What to decide first",
      body: "First decide whether all three cities belong, their direction, protected sightseeing days, night priorities and which city to remove. Check exact stations, train times, fares, ticket buying and wrong-station recovery only after that route decision, using the corridor and station guidance below.",
    },
    {
      id: "city-test-heading",
      type: "heading",
      level: 2,
      text: "Make every city earn its place",
    },
    {
      id: "city-test-table",
      type: "table",
      caption: "A city name is not a reason to add a hotel move",
      columns: ["City", "Keep it when", "Remove or shorten it when"],
      rows: [
        [
          "Chengdu",
          "It is a real gateway or has a protected priority that is not replaced by Chongqing or Zhangjiajie.",
          "It creates a westward detour and the traveller has no Chengdu-specific priority.",
        ],
        [
          "Chongqing",
          "The traveller wants a protected city day or a deliberate overnight pause between the outer cities.",
          "It is only a transfer label; pass through or connect without pretending that a late arrival is a city visit.",
        ],
        [
          "Zhangjiajie",
          "The trip can protect full outdoor days and a sensible recovery margin after arrival.",
          "The plan offers only a rushed arrival block or would sacrifice the rest of the China trip for one compressed mountain day.",
        ],
      ],
    },
    {
      id: "time-language-heading",
      type: "heading",
      level: 2,
      text: "Separate nights, calendar days and usable sightseeing days",
    },
    {
      id: "time-language",
      type: "paragraph",
      text: "Nine nights create ten calendar days, but they do not create ten sightseeing days. International arrival, international departure and the two hotel-changing moves each start at zero usable half-days. A transfer earns one half-day only after checkout, luggage, the complete city-to-city move, arrival and hotel access still leave a stable local block.",
    },
    {
      id: "usable-day-ledger",
      type: "table",
      caption: "Conservative credits before attractions are assigned",
      columns: [
        "Calendar block",
        "Baseline",
        "What must be true before upgrading it",
      ],
      rows: [
        [
          "International arrival",
          "0 usable half-days",
          "Entry, baggage and hotel access finish early enough for a nearby, replaceable activity.",
        ],
        [
          "Chengdu–Chongqing move",
          "0 usable half-days",
          "The dated door-to-door check for this leg leaves one uninterrupted morning or afternoon.",
        ],
        [
          "Chongqing–Zhangjiajie move",
          "0 usable half-days",
          "The dated journey and booked Zhangjiajie base leave a stable local block after arrival.",
        ],
        [
          "One full day in one base",
          "2 usable half-days",
          "No hotel change, intercity deadline or departure buffer cuts through it.",
        ],
        [
          "International departure",
          "0 usable half-days",
          "Only a genuinely late departure may leave one protected local block after all margins.",
        ],
      ],
    },
    {
      id: "allocation-workflow",
      type: "list",
      ordered: true,
      items: [
        "Fix the actual arrival and departure gateways before choosing a direction.",
        "Write one or two non-substitutable priorities for each city; delete generic wishes that could happen elsewhere.",
        "Place arrival, departure and both intercity moves in the ledger at zero before allocating nights.",
        "Protect full days for fixed or weather-sensitive priorities, then award a transfer half-day only after the dated door-to-door check for that leg.",
        "Add recovery for children, slower walkers, heavy luggage, jet lag, outdoor weather or consecutive early starts.",
        "If the ledger is negative, remove a city or add nights; do not hide missing time inside transfer days.",
      ],
    },
    {
      id: "night-range-heading",
      type: "heading",
      level: 2,
      text: "Use night ranges as a warning, not a package promise",
    },
    {
      id: "night-range-comparison",
      type: "comparison",
      title: "What the available nights usually imply",
      columns: [
        {
          heading: "5–6 nights",
          items: [
            "Usually a two-city decision, not a balanced three-city trip.",
            "Keep three only if priorities are unusually narrow and the dated transfers earn real half-days.",
            "A token Chongqing overnight does not count as seeing Chongqing.",
          ],
        },
        {
          heading: "7–9 nights",
          items: [
            "Three cities can work with different entry and exit gateways.",
            "Each city still needs a distinct protected reason to remain.",
            "Families and slower travellers may need to cut one stop or add recovery.",
          ],
        },
        {
          heading: "10+ nights",
          items: [
            "There is more room for full days and disruption recovery.",
            "Extra nights do not fix a poor gateway or duplicated priorities.",
            "Allocate by protected visits, not an automatic equal split.",
          ],
        },
      ],
    },
    {
      id: "worked-examples-heading",
      type: "heading",
      level: 2,
      text: "Two examples show why the trip label is misleading",
    },
    {
      id: "worked-example-open-jaw",
      type: "callout",
      tone: "neutral",
      title: "Example 1: two travellers, 9 nights, different gateways",
      body: "Two travellers arrive in Chengdu and continue onward after Zhangjiajie. Ten calendar days minus arrival, departure and two transfer blocks leave six protected full-day equivalents in the conservative baseline. Three cities are plausible, but only if those six days cover the actual priorities and both dated door-to-door checks pass.",
    },
    {
      id: "worked-example-round-trip",
      type: "callout",
      tone: "warning",
      title: "Example 2: family, 7 nights, Chengdu round trip",
      body: "Eight calendar days contain arrival, departure, two forward moves and a return to Chengdu. Starting all five blocks at zero leaves only three protected full-day equivalents before any half-day is earned. A child, outdoor weather and the final-flight buffer make a three-city promise fragile; cutting Chongqing or Zhangjiajie is more honest than borrowing time from transfers.",
    },
    {
      id: "chongqing-choice-heading",
      type: "heading",
      level: 2,
      text: "Decide whether Chongqing is a visit or only part of the route",
    },
    {
      id: "chongqing-choice",
      type: "comparison",
      title: "Stop in Chongqing or continue between the outer cities",
      columns: [
        {
          heading: "Keep a Chongqing stay",
          items: [
            "At least one Chongqing priority deserves a protected block.",
            "The overnight reduces pressure rather than manufacturing a late-night checklist.",
            "The entry and exit gateways still preserve a forward-moving route.",
          ],
        },
        {
          heading: "Bypass the Chongqing stay",
          items: [
            "Chongqing has no priority beyond changing trains or passing through.",
            "A dated through journey or connection can be verified after the route decision.",
            "The saved night produces more value in Chengdu, Zhangjiajie or the final-flight buffer.",
          ],
        },
      ],
    },
    {
      id: "no-direct-page",
      type: "callout",
      tone: "decision",
      title: "Use Chongqing as a transfer when it has no visit of its own",
      body: "If Chongqing has no protected priority, compare the dated Chengdu–Zhangjiajie through journey or connection in 12306 and use Chongqing only as part of the transfer when needed. Keep a Chongqing night only when it protects a real visit or makes the complete journey safer.",
    },
    {
      id: "switch-heading",
      type: "heading",
      level: 2,
      text: "Conditions that change the route order",
    },
    {
      id: "switch-table",
      type: "table",
      caption: "Change the plan when a real dependency changes",
      columns: ["Condition", "Route response", "What not to do"],
      rows: [
        [
          "Better gateway at Zhangjiajie or farther east",
          "Reverse the chain and finish in Chengdu if the outbound ticket supports it.",
          "Keep the original direction merely because it is the first version you saw.",
        ],
        [
          "Chongqing loses its protected priority",
          "Remove the Chongqing hotel stay and compare a dated through journey or transfer between Chengdu and Zhangjiajie.",
          "Keep a hotel night merely so the itinerary still names all three cities.",
        ],
        [
          "Zhangjiajie weather or outdoor margin is too weak",
          "Add a protected day or remove Zhangjiajie from this trip.",
          "Treat an arrival afternoon as a substitute for full outdoor days.",
        ],
        [
          "Same-city international round trip",
          "Price and schedule the return sector, then cut a city if the ledger fails.",
          "Hide the return inside the final sightseeing day.",
        ],
        [
          "Energy or mobility is lower than expected",
          "Protect the booked hotel, reduce priorities and keep recovery space.",
          "Compensate with consecutive early starts.",
        ],
      ],
    },
    {
      id: "booking-order-heading",
      type: "heading",
      level: 2,
      text: "Complete each route check in the right order",
    },
    {
      id: "booking-order",
      type: "list",
      ordered: true,
      items: [
        "Choose whether the trip contains two or three cities and fix the international gateways.",
        "Assign protected sightseeing days and recovery; only then commit to the night distribution.",
        "For Chengdu–Chongqing, verify the exact dated stations and the complete hotel-to-hotel chain.",
        "For Chongqing–Zhangjiajie, verify that corridor and the arrival handoff to the booked Zhangjiajie base.",
        "Recheck all dated transport in 12306 and the relevant operators before purchase and again shortly before travel.",
      ],
    },
    {
      id: "dynamic-boundary",
      type: "callout",
      tone: "warning",
      title: "Do not copy operational details from an old plan",
      body: "Train patterns, stations, inventory and travel conditions can change. Do not preserve a train number, time, fare or universal station pair in the plan. Decide the cities and protected days first, then verify each corridor for the exact date.",
    },
    {
      id: "editorial-judgment",
      type: "callout",
      tone: "neutral",
      title: "Why the planning baseline is conservative",
      body: "The night ranges and zero-first half-day ledger are conservative planning rules, not railway promises or universal packages. Their purpose is to expose the city that has not earned enough time before bookings make the route expensive to change.",
    },
    {
      id: "help-cta",
      type: "callout",
      tone: "decision",
      title: "Want the weak city identified before booking?",
      body: "Share the dates, traveller count, pace, arrival and departure gateways, and one non-negotiable priority in each city. Homeground can test which city should be shortened or removed before the corridor details are locked.",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Take the next planning step",
      items: [
        {
          label: "Plan the Chengdu stay",
          href: "/destinations/chengdu/",
          description:
            "Choose Chengdu's role, protected priorities and onward direction.",
        },
        {
          label: "Plan the Chongqing stay",
          href: "/destinations/chongqing/",
          description:
            "Decide whether Chongqing deserves a stay rather than a transfer label.",
        },
        {
          label: "Plan the Zhangjiajie stay",
          href: "/destinations/zhangjiajie/",
          description:
            "Set the outdoor priorities and realistic time before fixing the route.",
        },
        {
          label: "Choose the Chengdu–Chongqing station pair",
          href: "/guides/chengdu-chongqing-station-pair/",
          description:
            "After the order is fixed, verify the two station names shown for the travel date and both hotel transfers.",
        },
        {
          label: "Plan the Chongqing–Zhangjiajie rail leg",
          href: "/guides/chongqing-zhangjiajie-transport-route/",
          description:
            "Check the second rail leg and the transfer to the chosen hotel.",
        },
        {
          label: "Choose Zhangjiajie City or Wulingyuan",
          href: "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          description:
            "Let the sightseeing order determine the booked arrival base.",
        },
        {
          label: "Check whether the itinerary is too rushed",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description:
            "Audit the full trip for transfers, fixed visits and recovery.",
        },
        {
          label: "Browse China planning guides",
          href: "/plan/",
          description:
            "Return to the planning collection for the next decision.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        {
          label: "China Railway ticket and station search",
          url: "https://www.12306.cn/en/index.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-09-01",
        },
        {
          label: "Chongqing railway timetable adjustment from 26 January 2026",
          url: "https://www.cq.gov.cn/ywdt/jrcq/202601/t20260122_15343341.html",
          publisher: "Chongqing Municipal People's Government",
          reviewedAt: "2026-09-01",
        },
        {
          label: "Temporary train notice for 11 July–14 August 2026",
          url: "https://kyfw.12306.cn/mormhweb/zxdt_news/202607/t20260710_46062.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-09-01",
        },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
