import type { TenDayGuideCopy } from "./tenDayGuideCopy.types";

export const tenDayGuideEnglish: TenDayGuideCopy = {
  htmlLang: "en",
  brandAriaLabel: "Homeground China home",
  brandTagline: "China, shaped around you",
  skipLink: "Skip to the guide",
  navigation: {
    primaryLabel: "Primary navigation",
    languageLabel: "Choose language",
    planning: "How planning works",
    studio: "About Homeground",
    questions: "Questions",
    cta: "Check my route",
  },
  breadcrumb: {
    label: "Breadcrumb",
    home: "Home",
    current: "10-day route check",
  },
  hero: {
    eyebrow: "Whole-route decision guide",
    title: "Beijing–Zhangjiajie–Shanghai in 10 Days:",
    accent: " Is It Actually Realistic?",
    lead:
      "The route can fit. Your exact trip may not. The answer changes with what “10 days” means, when you land, where you sleep and what your group is willing to leave out.",
    quickLabel: "Quick answer",
    quickTitle: "Yes—but as a compact highlights trip.",
    hotelNights: "hotel nights",
    fullSightseeingDays: "full sightseeing days",
    quickBody:
      "A workable split is 3 days in Beijing, 2 in Zhangjiajie and 2 in Shanghai, with both intercity movements treated as transfer days—not bonus sightseeing days.",
    routeLabel: "Route overview",
    places: ["Beijing", "Zhangjiajie", "Shanghai"],
    editorialNote:
      "Homeground planning framework · not a fixed tour product · live transport and entry conditions checked again for your dates",
  },
  definition: {
    label: "The first hidden problem",
    title: "“10 days” can mean three different trips.",
    intro:
      "Before discussing attractions, count the nights and protect the full days. Otherwise two travellers can agree on “10 days” while imagining itineraries four days apart.",
    counts: [
      {
        number: "6",
        title: "10 calendar days",
        detail: "Arrive on Day 1, leave on Day 10—usually 9 hotel nights.",
        note: "About six full sightseeing days",
        featured: false,
      },
      {
        number: "7",
        title: "10 hotel nights",
        detail: "Arrive on Day 1, leave on Day 11. This is the version used below.",
        note: "About seven full sightseeing days",
        featured: true,
      },
      {
        number: "10",
        title: "10 full sightseeing days",
        detail: "Arrival, departure and both intercity transfers sit outside the count.",
        note: "Roughly 13 nights / 14 calendar days",
        featured: false,
      },
    ],
    planningRule:
      "A flight or train day does not become a full sightseeing day just because dinner or an evening walk may still fit.",
  },
  length: {
    label: "Choose the kind of trip",
    title: "The extra nights buy choices—not just more attractions.",
    intro:
      "These are planning judgements, not packages. Actual transport, arrival times and traveller pace can move a day from one city to another.",
    recommendTag: "Homeground default",
    options: [
      {
        nights: "10 nights",
        days: "7 full days",
        split: "Beijing 3 · Zhangjiajie 2 · Shanghai 2",
        verdict: "A compact highlights trip",
        detail:
          "It works only when the flights, pace and priorities cooperate. There is almost no recovery or weather margin.",
        recommended: false,
      },
      {
        nights: "12 nights",
        days: "9 full days",
        split: "Beijing 3 · Zhangjiajie 3 · Shanghai 3",
        verdict: "The balanced first-visit default",
        detail:
          "The third Zhangjiajie day removes the hardest compromise; Shanghai can breathe or hold one day trip.",
        recommended: true,
      },
      {
        nights: "14 nights",
        days: "11 full days",
        split: "Beijing 4 · Zhangjiajie 4 · Shanghai 3",
        verdict: "The comfortable version",
        detail:
          "Best for a slower pace, families, mobility limits or travellers who want one disruption not to damage the route.",
        recommended: false,
      },
    ],
  },
  calendar: {
    label: "The 10-night calendar",
    title: "Seven full days is the real inventory.",
    intro:
      "The itinerary is not eleven equally usable calendar boxes. It is seven sightseeing days protected by four arrival, departure and transfer days.",
    items: [
      { day: "Day 1", place: "Beijing", itemLabel: "Arrive", kind: "edge" },
      { day: "Days 2–4", place: "Beijing", itemLabel: "3 full days", kind: "full" },
      { day: "Day 5", place: "Beijing → Zhangjiajie", itemLabel: "Transfer day", kind: "transfer" },
      { day: "Days 6–7", place: "Zhangjiajie", itemLabel: "2 full days", kind: "full" },
      { day: "Day 8", place: "Zhangjiajie → Shanghai", itemLabel: "Transfer day", kind: "transfer" },
      { day: "Days 9–10", place: "Shanghai", itemLabel: "2 full days", kind: "full" },
      { day: "Day 11", place: "Shanghai", itemLabel: "Depart", kind: "edge" },
    ],
    summary: [
      { number: "7", label: "full sightseeing days" },
      { number: "2", label: "transfer days" },
      { number: "2", label: "arrival / departure days" },
    ],
  },
  tradeoffs: {
    label: "What seven full days can buy",
    title: "Every city gets a clear promise—and a clear sacrifice.",
    intro:
      "A credible itinerary says what will be left out. “Everything is possible” is not flexibility; it is a refusal to make the plan.",
    fullDays: "full days",
    cities: [
      {
        number: "03",
        city: "Beijing",
        promise: "Protect the imperial core, a Great Wall day and one additional city day.",
        cost: "Not every palace, museum, neighbourhood and theme park.",
      },
      {
        number: "02",
        city: "Zhangjiajie",
        promise: "Choose park depth, or one compact park day plus Tianmen Mountain.",
        cost: "No reliable way to add every headline attraction—and no weather buffer.",
      },
      {
        number: "02",
        city: "Shanghai",
        promise: "Cover the central city at a useful pace.",
        cost: "Suzhou or Hangzhou replaces a Shanghai day; it is not an extra day.",
      },
    ],
    zhangjiajieLink: "See what actually fits in 2, 3 or 4 full Zhangjiajie days",
  },
  diagnostic: {
    label: "Why your version may change",
    title: "This is not one itinerary. It is six linked decisions.",
    intro:
      "Each answer can change the next one. That is why copying a day list before checking the real journey often produces a plan that looks tidy but fails door to door.",
    imageAlt:
      "Zhangjiajie city buildings beside a river, with mountains rising behind them",
    imageLabel: "Hotel-base decision",
    imageCaption:
      "A real Zhangjiajie stay includes the city base and the next morning’s ground journey—not only the scenic-area wishlist.",
    decisions: [
      {
        title: "Your flight times, not just your dates",
        question: "Do you land early enough to recover, and leave late enough to protect the last day?",
        consequence:
          "A late arrival and early departure can turn ten hotel nights into only five or six genuinely usable days.",
      },
      {
        title: "The useful service on your exact day",
        question:
          "Is the workable option nonstop, which airport or station does it use, and when does it arrive?",
        consequence:
          "The shortest scheduled journey is not always the option that protects the most useful time.",
      },
      {
        title: "Where you sleep in Zhangjiajie",
        question: "Does the hotel base support the next day—or add another ground transfer with luggage?",
        consequence:
          "Wulingyuan and downtown Zhangjiajie serve different sightseeing days. The wrong base spends time twice.",
      },
      {
        title: "The pace your group can actually sustain",
        question:
          "How much walking, stairs, queueing and early starts are realistic after long-haul travel?",
        consequence:
          "A timetable can be technically possible and still be a poor physical fit for your group.",
      },
      {
        title: "Weather, entry times and closures",
        question: "What happens if the mountain day with the best views cannot run as planned?",
        consequence:
          "Two Zhangjiajie days leave no replacement day. A tightly assigned plan has almost no resilience.",
      },
      {
        title: "Everything you want to add",
        question: "Is Xi’an, Fenghuang, Suzhou or Hangzhou an addition—or a substitution?",
        consequence:
          "A fourth place may fit on paper only by spending the buffer that made the route enjoyable.",
      },
    ],
  },
  transfer: {
    label: "The transfer-day test",
    title: "A 2½-hour flight is not a 2½-hour travel day.",
    intro:
      "Compare hotel to hotel, not runway to runway. The correct transport choice can still consume the day.",
    imageAlt: "Aircraft, terminal bridges and a control tower seen through an airport window",
    imageLabel: "Transfer-day evidence",
    imageCaption:
      "The scheduled flight time is one line inside a longer hotel-to-hotel movement.",
    formulaLabel: "Count the complete movement",
    steps: [
      "Hotel checkout",
      "Airport or station transfer",
      "Check-in and buffer",
      "Flight or train",
      "Baggage and exit",
      "Transfer to next hotel",
      "Check-in",
    ],
    directionTitle: "Beijing first or Shanghai first?",
    directionBody:
      "Either direction can work. Compare the international flight times and the useful domestic service in the correct direction; schedules are not perfectly symmetrical.",
    plannerLink: "Ask Homeground to compare the real train and flight time",
  },
  fit: {
    label: "An honest fit test",
    title: "Ten nights is reasonable for some travellers—not all.",
    worksHeading: "Keep 10 nights when…",
    longerHeading: "Choose 12+ nights when…",
    worksWhen: [
      "You arrive early and depart late enough to protect the full days.",
      "A useful nonstop flight or direct train exists on the exact dates.",
      "Your group moves comfortably with normal luggage.",
      "You accept that each city must be edited.",
      "Zhangjiajie has one clear two-day priority.",
    ],
    chooseLongerWhen: [
      "You are travelling with young children, older parents or limited mobility.",
      "You want meaningful weather protection in Zhangjiajie.",
      "Your arrival is late, departure is early or jet lag usually hits hard.",
      "You want Shanghai plus multiple day trips.",
      "You do not want one delay to damage the rest of the journey.",
    ],
  },
  questions: {
    label: "Before booking anything",
    title: "Answer these six questions with real information.",
    intro:
      "If several answers are still unknown, you do not yet have a finished itinerary. You have a promising route idea that still needs checking.",
    items: [
      {
        question: "What are the local landing and departure times?",
        detail: "Include the airport, immigration, baggage and hotel transfer—not only the date.",
      },
      {
        question: "Which domestic service is useful on those exact dates?",
        detail: "Check the direction, airport or station, nonstop status and hotel arrival time.",
      },
      {
        question: "Where will you sleep before each Zhangjiajie day?",
        detail:
          "The base should follow the sightseeing logic, not simply the cheapest available hotel.",
      },
      {
        question: "What is genuinely non-negotiable?",
        detail:
          "Name the must-sees—and the places you would drop if the timetable does not cooperate.",
      },
      {
        question: "What pace is realistic for this group?",
        detail:
          "Include ages, children, mobility, walking tolerance, luggage and recovery needs.",
      },
      {
        question: "Where is the route allowed to flex?",
        detail:
          "Decide which day can absorb weather, a poor transport time or a changed entry slot.",
      },
    ],
  },
  trust: {
    label: "What Homeground would check",
    title: "The calendar first. The quote later.",
    intro:
      "We would not start by forcing your dates into a fixed package. We would first test whether the route protects what matters to your group—and tell you where it does not.",
    imageAlt:
      "Illustration of a folded route map, calendar, travel ticket, luggage tag and pencil",
    imageCaption: "Illustration: how Homeground stress-tests a route before pricing.",
    methods: [
      {
        title: "Count",
        detail: "Turn dates and flight times into genuine full sightseeing days.",
      },
      {
        title: "Check",
        detail: "Match the useful train or flight to the correct direction and hotel base.",
      },
      {
        title: "Stress-test",
        detail: "Add luggage, pace, weather exposure, tickets and the group’s must-sees.",
      },
      {
        title: "Edit",
        detail: "Show what fits, what must move and what should be removed before pricing.",
      },
    ],
    boundary:
      "The fixed arithmetic is shown on this page. Live schedules and access conditions are rechecked for the traveller’s dates. The final route recommendation remains a planning judgement—not a promise that disruption cannot happen.",
  },
  faq: {
    label: "Short answers",
    title: "Questions travellers usually ask next",
    items: [
      {
        question: "Is 10 days enough for Beijing, Zhangjiajie and Shanghai?",
        answer:
          "Ten calendar days is very tight and normally gives about six full sightseeing days. Ten hotel nights can work as a compact route with about seven full sightseeing days. Twelve nights is the safer general recommendation.",
      },
      {
        question: "How many full days should Zhangjiajie receive?",
        answer:
          "Two full days requires a choice between park depth and variety. Three full days is the stronger first-visit allocation; a fourth can add depth or weather flexibility.",
      },
      {
        question: "Does flying save a full day?",
        answer:
          "Not automatically. Airport access, advance check-in, baggage and the next hotel transfer can still consume most of the day. The departure slot matters as much as the flight duration.",
      },
      {
        question: "Can I add Xi’an, Suzhou or Hangzhou?",
        answer:
          "Xi’an changes this into a compressed four-city route. Suzhou or Hangzhou can work only by replacing a Shanghai day. An addition on the map is usually a subtraction somewhere else.",
      },
    ],
  },
  cta: {
    label: "Check the trip you actually have",
    title: "Start with your route—not just the number “10.”",
    intro:
      "Start with the cities and number of nights. In the first reply, a Homeground planner will ask for your exact arrival and departure times, group profile and must-see list, then recount the full sightseeing days and timing conflicts before a quote is prepared.",
    button: "Start my route check",
    note: "No instant package. No obligation to keep every city.",
  },
  source: {
    summary: "Editorial method and source boundary",
    intro:
      "This guide separates visible calendar arithmetic, live transport or operating information, and Homeground planning judgement. Timetables are examples of scale, not permanent service promises.",
    links: [
      "China Railway 12306 English FAQ",
      "Beijing municipal airport transport guidance",
      "Shanghai Airport ground transport",
      "Hunan government Zhangjiajie reservation and weather notice",
    ],
    releaseNote:
      "Published after a pre-release sample check. Live transport, opening and access conditions are checked again for the traveller’s dates.",
  },
  footer: {
    navigationLabel: "Footer navigation",
    zhangjiajieGuide: "Zhangjiajie guide",
    privacy: "Privacy",
    cta: "Check my route",
    copyright: (year) => `© ${year} Homeground China. Private China trip planning.`,
  },
};
