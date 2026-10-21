import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";
const group14 = "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "lead-answer", type: "lead", text: "China's 2026 public holidays: New Year 1–3 January, Spring Festival (Chinese New Year) 15–23 February, Qingming 4–6 April, Labour Day 1–5 May, Dragon Boat 19–21 June, Mid-Autumn 25–27 September and National Day (Golden Week) 1–7 October, with six weekend days turned into workdays. For 2027, the statutory holidays are fixed by regulation, with Spring Festival on 5–8 February and National Day on 1–3 October, but the bridged days off and compensatory workdays have not yet been published. The days off are only the first layer: on the big holidays, timed tickets fill up and queues at popular sights can run for hours, as the dated examples below show. Check the calendar before you fix your dates."},
    {
      id: "status-summary",
      type: "comparison",
      title: "Calendar status checked September 18, 2026",
      columns: [
        {
          heading: "2026 — official",
          body: "The State Council notice lists seven holiday periods and six compensatory workdays. The complete dates appear below.",
        },
        {
          heading: "2027 — statutory dates only",
          body: "The amended National Holidays Regulation fixes 13 statutory days, listed below. The State Council's annual notice, usually issued in November or December, adds the bridged days off and compensatory workdays. Those are not guessed here.",
        },
      ],
    },
    {
      id: "calendar-heading",
      type: "heading",
      level: 2,
      text: "Official China public holidays in 2026",
    },
    {
      id: "calendar-intro",
      type: "paragraph",
      text: "These are the nationwide arrangements in General Office of the State Council notice 国办发明电〔2025〕7号. A compensatory workday is a Saturday or Sunday designated as a working day; it is not an extra holiday.",
    },
    {
      id: "official-calendar",
      type: "table",
      caption: "Official 2026 holiday periods and compensatory workdays",
      columns: ["Holiday", "Official days off", "Length", "Compensatory workday(s)"],
      rows: [
        ["New Year's Day", "January 1–3", "3 days", "Sunday, January 4"],
        ["Spring Festival", "February 15–23", "9 days", "Saturday, February 14; Saturday, February 28"],
        ["Qingming Festival", "April 4–6", "3 days", "None listed"],
        ["Labour Day", "May 1–5", "5 days", "Saturday, May 9"],
        ["Dragon Boat Festival", "June 19–21", "3 days", "None listed"],
        ["Mid-Autumn Festival", "September 25–27", "3 days", "None listed"],
        ["National Day", "October 1–7", "7 days", "Sunday, September 20; Saturday, October 10"],
      ],
    },
    {
      id: "official-not-operator",
      type: "callout",
      tone: "warning",
      title: "Official holiday does not mean universal opening hours",
      body: "The State Council calendar tells you the nationwide days off and compensatory workdays. It does not promise that a museum opens, a restaurant closes, a hotel has rooms or a particular train has seats. Those are separate operator decisions.",
    },
    {
      id: "statutory-2027-heading",
      type: "heading",
      level: 2,
      text: "Statutory 2027 holidays: bridging days and workdays pending",
    },
    {
      id: "statutory-2027-intro",
      type: "paragraph",
      text: "These are the days the amended National Holidays Regulation makes statutory holidays; the lunar dates are cross-checked against Hong Kong's gazetted 2027 holiday list. The Regulation allows statutory holidays to be joined into longer breaks, but the actual bridged days off and compensatory workdays exist only once the State Council notice is published. Treat every 2027 long weekend as unconfirmed until then.",
    },
    {
      id: "statutory-2027-calendar",
      type: "table",
      caption: "Statutory 2027 holidays (State Council notice pending)",
      columns: ["Holiday", "Statutory day(s) off", "Length", "Bridged days off / workdays"],
      rows: [
        ["New Year's Day", "Friday, January 1", "1 day", "Pending State Council notice"],
        ["Spring Festival", "February 5–8 (Lunar New Year's Eve to the third day)", "4 days", "Pending"],
        ["Qingming Festival", "Monday, April 5", "1 day", "Pending"],
        ["Labour Day", "May 1–2", "2 days", "Pending"],
        ["Dragon Boat Festival", "Wednesday, June 9", "1 day", "Pending"],
        ["Mid-Autumn Festival", "Wednesday, September 15", "1 day", "Pending"],
        ["National Day", "October 1–3", "3 days", "Pending"],
      ],
    },
    {
      id: "different-effects-heading",
      type: "heading",
      level: 2,
      text: "The holidays do not affect travel in the same way",
    },
    {
      id: "holiday-effects",
      type: "table",
      caption: "What makes each holiday a different planning problem",
      columns: ["Holiday", "What is different about it", "What to examine in your route"],
      rows: [
        ["New Year's Day", "A short three-day break with one following Sunday converted to a workday.", "Check short leisure trips and the January 4 workday; do not treat it as a miniature Spring Festival."],
        ["Spring Festival", "The nine-day public holiday sits inside a separate 40-day official transport season.", "Family-reunion flows, long-distance seats, business closures and recovery time on arrival."],
        ["Qingming Festival", "A three-day period combining memorial travel and leisure travel; official transport reporting highlights routes near cemeteries and scenic areas.", "Short-distance roads, local transit and the exact attraction or memorial-area notice."],
        ["Labour Day", "Five concentrated leisure days; the Ministry of Transport prepares across road, rail and civil aviation.", "Intercity alternatives, cancellable rooms and timed-entry capacity."],
        ["Dragon Boat Festival", "A three-day break without a listed compensatory workday in 2026.", "Weekend-like regional trips, event-specific access and whether one tight transfer is necessary."],
        ["Mid-Autumn Festival", "A three-day family and leisure break, separated from National Day in 2026.", "The exact September weekend and any local event rather than October assumptions."],
        ["National Day", "Seven official days off plus two compensatory workdays, supporting nationwide leisure travel.", "Whether to keep one base, move intercity later, and protect booking-dependent days."],
      ],
    },
    {
      id: "no-ranking",
      type: "callout",
      tone: "neutral",
      title: "This is not a crowd ranking",
      body: "A national calendar cannot responsibly assign one crowd score to every city, route and hour. Trip design depends on the holiday, direction of travel, exact operator, weekend, local event and your tolerance for failed connections.",
    },
    {
      id: "spring-heading",
      type: "heading",
      level: 2,
      text: "Spring Festival: nine days off, but a 40-day transport season",
    },
    {
      id: "spring-detail",
      type: "paragraph",
      text: "China's national 2026 Spring Festival transport period ran from February 2 to March 13, according to the National Development and Reform Commission's dated meeting notice. That period is much longer than the February 15–23 public holiday because family-reunion journeys spread around the official break. It is evidence to widen the transport check, not a claim that every route is equally busy for 40 days.",
    },
    {
      id: "spring-checks",
      type: "list",
      items: [
        "Check the direction and date of every long-distance train or flight, not only whether it falls inside February 15–23.",
        "Confirm small-business, restaurant and tour operating dates directly; family-run businesses may make their own Spring Festival arrangements.",
        "Do not place a non-refundable attraction immediately after an uncertain long-distance arrival.",
        "Keep recovery time after an overnight flight or a major family-travel transfer.",
      ],
    },
    {
      id: "labour-national-heading",
      type: "heading",
      level: 2,
      text: "Labour Day and National Day: protect the route, not a predicted price",
    },
    {
      id: "labour-national-detail",
      type: "paragraph",
      text: "Five days at Labour Day and seven at National Day make long leisure trips structurally easier, so a multi-city visitor should expect fewer comfortable alternatives on popular dates. That does not support a universal hotel markup or a promise that the day after a holiday will be quiet. Location, route, room type, cancellation rule and local events still matter.",
    },
    {
      id: "october-owner",
      type: "callout",
      tone: "decision",
      title: "Planning an October trip? Read the October guide",
      body: "It compares the National Day week with mid-to-late October, including route shape and regional weather. The official dates for the whole year stay on this page.",
    },
    {id: "peak-heading", type: "heading", level: 2, text: "What a holiday peak looks like at the gate"},
    {id: "peak-copy", type: "paragraph", text: "These are reported cases from recent holidays, each with its date and source. They are peak days, not every day, but they show what happens when a whole country is off work at once."},
    {id: "peak-list", type: "list", items: ["Forbidden City, National Day 2025: on 1 October, the museum's booking page already showed every day from 2 to 7 October fully booked. Tickets open 7 days ahead at 20:00 China time, and none are sold on the day.", "Zhangjiajie, May Day 2025: Wulingyuan district publicly apologised for the long queues at its lift, cable cars and shuttle buses on 2 May, when the last stranded visitors were not taken back to town until 21:53. One visitor that weekend queued about two hours for the Bailong lift and an hour and a half for the Tianzi Mountain cable car.", "Jade Dragon Snow Mountain, Spring Festival 2025: in heavy snow on 2 February, visitors queued from about 2 pm to 6 pm for the cable car down; on 4 February the scenic area limited numbers from midday, and that day's cable-car tickets were fully booked.", "Chengdu panda base, winter holidays 2024: China Youth Daily reported on 2 February that by 7:40 one morning the queue to see the panda Huahua already stretched 500 metres, with a sign warning of a wait of more than two hours."]},
    {id: "peak-plan", type: "paragraph", text: "What helps on these days is not luck but order: tickets booked in good time, the earliest entry time, a guide who knows which way round to walk, and a car that does not depend on a holiday taxi queue. None of it removes the crowd; all of it gives you a better day inside it."},
    { id: "handoff-options", type: "comparison", title: "Travelling on a holiday? Book these first", columns: [
      { heading: `Sight bookings: ${bodyReservationFee("en")} per person`, body: "Per attraction, plus the ticket at face value, booked in each traveller's own passport name, from the Forbidden City to the Terracotta Warriors and the Chengdu panda base.", items: ["Request and pay at least 8 days before your visit and our booking guarantee covers it: if the booking fails, the fee and ticket money are refunded in full.", "Leave it until you are inside those 8 days and the guarantee no longer applies."] },
      { heading: `A private guide: from ${bodyGuideRate("zhangjiajie", "en")} a day`, body: `Up to 8 hours with a licensed English-speaking guide: from ${bodyGuideRate("zhangjiajie", "en")} in Zhangjiajie and Xi'an and from ${bodyGuideRate("beijing", "en")} in Beijing and Shanghai, higher on peak dates.`, items: ["Your guide plans the entry time and the direction you walk the park.", "Booked by the full day, per guide, not per person."] },
      { heading: `Two weeks, booked end to end: from ${bodyTourPrice(group14, 2, "en")} per person`, body: `Our 14-day Beijing, Xi'an, Chengdu, Guilin and Shanghai small-group tour is ${bodyTourPrice(group14, 2, "en")} per person sharing a room, with 2027 departures on 10 April, 8 May, 11 September and 9 October. The May and October groups leave after the statutory Labour Day (1–2 May) and National Day (1–3 October) dates; the full 2027 holiday arrangement is not yet published. The same route as a private tour is ${bodyTourPrice(tour14, 2, "en")} per person for two and ${bodyTourPrice(tour14, 6, "en")} for six.`, items: ["Hotels with breakfast, guide and car, every transfer, the trains and flights between cities and the named admissions.", "If we cannot get your Forbidden City or Tiananmen booking, we refund everything you paid, provided we have your passport details at least 8 days before the Forbidden City visit."] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "Book it with us", items: [{label: "See the attractions we book and when tickets open", href: "/services/china-attraction-reservations/", description: "Release times, prices and the guarantee, attraction by attraction."}, {label: "See the 14-day small-group tour", href: "/tours/beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour/", description: "Fixed departures, the day-by-day plan and the price."}, {label: "See the 14-day private tour", href: "/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/", description: "Your own dates; prices for two, four and six travellers."}, {label: "Hire a guide for the day", href: "/services/private-english-speaking-guides/", description: "Beijing, Shanghai, Xi'an and Zhangjiajie rates."}]},
    {
      id: "system-effects-heading",
      type: "heading",
      level: 2,
      text: "How holidays affect the four systems you book",
    },
    {
      id: "system-effects",
      type: "table",
      caption: "Planning implications by booking system",
      columns: ["System", "What the holiday calendar tells you", "What it cannot tell you", "Required check"],
      rows: [
        ["Intercity transport", "Which dates deserve earlier contingency planning and fewer dependent transfers.", "Live seats, fares, flight punctuality or the pressure on one direction.", "Official 12306 or airline inventory and current station/airport guidance."],
        ["Attractions", "When holiday-specific notices and timed-entry pressure are more likely to matter.", "Whether one venue opens, closes, extends hours or changes entry gates.", "The named venue's official booking channel and current holiday notice."],
        ["Hotels", "When flexibility and location deserve more weight in the booking decision.", "A nationwide price increase, room availability or the suitability of one room type.", "The exact property, branch, room configuration and cancellation terms."],
        ["Businesses and tours", "When normal weekday assumptions may fail, especially around Spring Festival.", "A universal national opening schedule for private businesses.", "Direct confirmation from the operator close to travel."],
      ],
    },
    {
      id: "rail-heading",
      type: "heading",
      level: 3,
      text: "Rail: the current sales window is not a seat guarantee",
    },
    {
      id: "rail-detail",
      type: "paragraph",
      text: "China Railway's current standing rule uses a 15-day advance-sale period, including the travel date, and says the railway may adjust it with an announcement. Count from the actual journey date, confirm the release details in official 12306, and prepare acceptable alternatives. This page does not read live inventory.",
    },
    {
      id: "attraction-heading",
      type: "heading",
      level: 3,
      text: "Attractions: national days off and venue hours are different data",
    },
    {
      id: "attraction-detail",
      type: "paragraph",
      text: "The Palace Museum illustrates the boundary. Its 2026 Spring Festival notice closed the museum on February 16 but listed opening arrangements for other holiday dates; its Labour Day notice opened May 1–5 with stated hours. One venue issued two date-specific rules. Never copy that rule to another museum or another year.",
    },
    {
      id: "comp-workdays-heading",
      type: "heading",
      level: 2,
      text: "Do not miss the compensatory workdays",
    },
    {
      id: "comp-workdays-detail",
      type: "paragraph",
      text: "China's annual notice can move an ordinary weekend day into the working week. In 2026 those dates are January 4, February 14, February 28, May 9, September 20 and October 10. A Sunday workday may affect commuters, offices and local routines, but it does not automatically impose the same opening pattern on every attraction or private business.",
    },
    {
      id: "route-method-heading",
      type: "heading",
      level: 2,
      text: "Turn the calendar into a route decision",
    },
    {
      id: "route-method",
      type: "list",
      ordered: true,
      items: [
        "Match every China arrival, intercity move and international departure against the official holiday and compensatory-workday dates.",
        "For a Spring Festival trip, also match long-distance transport against the separately announced Spring Festival travel season.",
        "Mark bookings that can break the next booking: exact trains, flights, one-night hotels and fixed-entry attractions.",
        "Remove or delay a city change when the route has no workable alternative; one base is easier to recover than a chain of one-night stays.",
        "Check official transport inventory, venue notices and hotel terms in their real booking windows.",
        "Recheck the final international-departure buffer instead of relying on a same-day long domestic connection.",
      ],
    },
    {
      id: "route-pattern",
      type: "comparison",
      title: "Two route shapes on the same holiday dates",
      columns: [
        {
          heading: "More resilient",
          items: [
            "One hotel base through the concentrated holiday period.",
            "One booked sight per day, with nearby alternatives.",
            "Cancellable room and two acceptable intercity departures.",
            "The final night in the international departure city.",
          ],
        },
        {
          heading: "More exposed",
          items: [
            "A new city or hotel every one or two nights.",
            "A fixed attraction immediately after a long transfer.",
            "One exact seat, room type and connection with no fallback.",
            "A same-day long-distance arrival before an international flight.",
          ],
        },
      ],
    },
    {
      id: "future-heading",
      type: "heading",
      level: 2,
      text: "What if your travel year is not published yet?",
    },
    {
      id: "future-boundary",
      type: "callout",
      tone: "warning",
      title: "2027: statutory dates fixed, arrangement pending",
      body: "Reviewed 18 September 2026: the 2027 statutory holidays come from the amended National Holidays Regulation, with lunar dates checked against Hong Kong's gazetted 2027 list. The State Council's bridged days off, compensatory workdays and the Spring Festival travel season had not been published. Do not book around a guessed long weekend; this page updates when the notice appears.",
    },
    {
      id: "update-mechanism",
      type: "paragraph",
      text: "We update this page when the State Council publishes the next annual notice, usually in November or December. Until then, keep any booking that depends on a 2027 long weekend cancellable.",
    },
    {id: "help-cta", type: "callout", tone: "decision", title: "How booking works", body: "Send your dates, the number of travellers and the cities you are considering by WhatsApp or email from any page above. A planner replies within 12 hours, and you get a written quote before you pay anything; the same planner stays with you from that first reply to your last day. You pay a 30% deposit by card through a secure VBill link and the rest after you arrive. Homeground China is a licensed travel agency (L-BJ10587); the guides and drivers are our own, and we never stop at shops."},
    {
      id: "faq",
      type: "faq",
      title: "Questions about China's holiday calendar",
      items: [
        {
          question: "When is Chinese New Year 2026 and how many days off are there?",
          answer: "February 15 to 23, nine days off in the official 2026 arrangement. The same State Council notice designates Saturday, February 14 and Saturday, February 28 as compensatory workdays, which are weekend days moved into the working week rather than extra holiday. Qingming, Dragon Boat and Mid-Autumn each get three days, Labour Day five and National Day seven.",
        },
        {
          question: "Can I book around the 2027 Chinese holiday dates yet?",
          answer: "Only the statutory dates. Reviewed 18 September 2026, the 2027 statutory holidays are fixed by the amended National Holidays Regulation, including Spring Festival February 5 to 8 and National Day October 1 to 3, but the State Council's bridged days off and compensatory workdays had not been published. Treat every 2027 long weekend as unconfirmed.",
        },
        {
          question: "How far ahead can I buy China train tickets for a holiday trip?",
          answer: "Fifteen days, counting the travel date itself, under China Railway's current standing rule, which also says the railway may adjust that period with an announcement. Count back from the actual journey date rather than the booking date, confirm the release details in official 12306 and prepare acceptable alternatives. This page does not read live inventory.",
        },
        {
          question: "Is the Palace Museum open during the Spring Festival holiday?",
          answer: "It depends on the date and that year's notice. The Palace Museum's 2026 Spring Festival notice closed the museum on February 16 but listed opening arrangements for the other holiday dates, while its Labour Day notice opened May 1 to 5 with stated hours. One venue issued two date-specific rules, so read that venue's own notice for your dates.",
        },
        {
          question: "Do hotels cost more during Labour Day and National Day?",
          answer: "The calendar cannot tell you that. Five days at Labour Day and seven at National Day make long leisure trips structurally easier, so a multi-city visitor should expect fewer comfortable alternatives on popular dates. That does not support a universal hotel markup, or a promise that the day after a holiday will be quiet. Location, route, room type, cancellation rule and local events still matter.",
        },
        {
          question: "Should I avoid the whole 40-day Spring Festival travel season?",
          answer: "No. China's national 2026 Spring Festival transport period ran from February 2 to March 13, much longer than the February 15 to 23 public holiday, because family-reunion journeys spread around the official break. It is evidence to widen the dates you check for long-distance travel, not a claim that every route is equally busy for 40 days.",
        }, {question: "Is Golden Week a bad time to visit China?", answer: "It is peak time at the big sights: on 1 October 2025, the first day of the holiday, the Forbidden City was already fully booked for 2 to 7 October. You can still travel then, but book every timed ticket as early as its release allows, start each day early and keep one hotel base. If your dates are flexible, our October guide compares National Day with mid-to-late October."}, {question: "Can Homeground book Forbidden City tickets for a holiday date?", answer: "Yes. Forbidden City tickets open 7 days ahead at 20:00 China time, and we book them in each traveller's own passport name. Request and pay at least 8 days before your visit and our booking guarantee covers it: if the booking fails, the fee and ticket money are refunded in full."}],
    },
    {
      id: "more-planning",
      type: "internal-links",
      title: "Continue planning",
      items: [
        {
          label: "Compare National Day with later October",
          href: "/guides/china-in-october-golden-week-or-later/",
          description: "Use the October guide for route shape, weather and the timing choice inside that month.",
        },
        {
          label: "Take high-speed rail in China for the first time",
          href: "/guides/china-high-speed-train-first-time-guide/",
          description: "Understand passport, ticket and station steps after identifying a holiday-sensitive rail leg.",
        },
        {
          label: "Check whether your itinerary is too rushed",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description: "Reduce the dependent city changes that make holiday disruption harder to absorb.",
        },
        {
          label: "Choose the safest last night before an international flight",
          href: "/guides/china-last-night-before-international-flight/",
          description: "Protect the departure from a long same-day domestic connection.",
        },
        { label: "Separate solar terms from public holidays and travel peaks", href: "/guides/china-24-solar-terms-weather-food-daily-life/", description: "Use solar terms as cultural-seasonal context; verify statutory days off, adjusted workdays and crowd pressure on the current calendar." },
        { label: "Understand what changes the cost of a China trip", href: "/guides/how-much-does-a-china-trip-cost/", description: "Compare location, flexibility and booking terms instead of relying on a universal holiday markup." },
        { label: "Read Chengdu through its greenway", href: "/guides/chengdu-greenway-city-ring/", description: "Choose a manageable section of Chengdu's ring greenway, connect it to transit and neighbourhood life, and keep a practical exit plan." },
        { label: "Plan Lunar New Year through four different clocks", href: "/guides/lunar-new-year-customs-for-visitors/", description: "Separate lunar dates, statutory days off, transport demand and each household or venue schedule before booking." },
        { label: "Visit Mogao Caves independently", href: "/guides/mogao-caves-independent-visit-workflow/", description: "Use the official foreign-passport channel, understand normal versus emergency visits, arrive at the correct first stop and protect the day against weather changes." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        {label: "Palace Museum fully booked for 2 to 7 October on the first day of the 2025 National Day holiday", url: "https://www.yicai.com/news/102851899.html", publisher: "Yicai", reviewedAt: "2026-10-19"},
        {label: "Wulingyuan district apology for long lift, cable-car and shuttle queues on 2 May 2025", url: "https://m.gmw.cn/2025-05/04/content_1304029265.htm", publisher: "Guangming Online, from the Wulingyuan District Media Centre", reviewedAt: "2026-10-19"},
        {label: "A Zhangjiajie May Day 2025 trip: queue times at the Bailong lift, Tianzi Mountain cable car and shuttle buses", url: "https://www.36kr.com/p/3280487039377538", publisher: "36Kr", reviewedAt: "2026-10-19"},
        {label: "Jade Dragon Snow Mountain: four-hour cable-car queue on 2 February 2025 and visitor limits on 4 February", url: "https://www.peopleapp.com/column/30048174845-500006077194", publisher: "Cover News, on the People's Daily website", reviewedAt: "2026-10-19"},
        {label: "Chengdu panda base: a 500-metre queue by 7:40 a.m., reported 2 February 2024", url: "https://www.chinanews.com.cn/sh/2024/02-02/10157284.shtml", publisher: "China Youth Daily, via China News Service", reviewedAt: "2026-10-19"},
        { label: "2026 public-holiday schedule", url: "https://www.gov.cn/zhengce/zhengceku/202511/content_7047091.htm", publisher: "General Office of the State Council", reviewedAt: "2026-08-11" },
        { label: "2026 national Spring Festival transport-period meeting", url: "https://www.ndrc.gov.cn/fzggw/wld/lichunlin/zyhd/202601/t20260121_1403377.html", publisher: "National Development and Reform Commission", reviewedAt: "2026-08-31" },
        { label: "2026 Qingming transport review", url: "https://www.mot.gov.cn/xinwen/jiaotongyaowen/202604/t20260407_4203180.html", publisher: "Ministry of Transport", reviewedAt: "2026-08-11" },
        { label: "2026 Labour Day transport briefing", url: "https://www.mot.gov.cn/xinwen/xinwenfabuhui/202604/t20260424_4204258.html", publisher: "Ministry of Transport", reviewedAt: "2026-08-11" },
        { label: "Current railway ticket rules", url: "https://kyfw.12306.cn/otn/gonggao/saleTicketMeans.html?linktypeid=means2", publisher: "China Railway 12306", reviewedAt: "2026-08-11" },
        { label: "Palace Museum 2026 Spring Festival notice", url: "https://www.dpm.org.cn/announce_detail/378505.html", publisher: "Palace Museum", reviewedAt: "2026-08-11" },
        { label: "Palace Museum 2026 Labour Day notice", url: "https://www.dpm.org.cn/announce_detail/378865.html", publisher: "Palace Museum", reviewedAt: "2026-08-11" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
