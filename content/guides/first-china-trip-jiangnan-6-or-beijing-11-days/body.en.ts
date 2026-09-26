import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Choose the six-day Shanghai–Suzhou–Hangzhou route if those three cities are the reason for your first China trip and you can depart from Hangzhou. Choose the eleven-day Beijing–Hangzhou–Suzhou–Shanghai route if the Forbidden City and Great Wall belong on that first trip and you can arrive in Beijing and leave from Shanghai. The longer tour gives Beijing four hotel nights, but it also adds a long train day and another hotel change."
    },
    {
      id: "decision",
      type: "callout",
      tone: "decision",
      title: "The deciding question",
      body: "Would you regret missing Beijing more than spending five extra calendar days and making a Beijing-to-Hangzhou rail journey? If yes, examine the eleven-day route. If your priority is the three Jiangnan cities, the six-day route already includes a proper Hangzhou touring day; you do not need Beijing to make that trip complete."
    },
    { id: "compare-heading", type: "heading", level: 2, text: "Two published routes, side by side" },
    {
      id: "compare",
      type: "table",
      caption: "Calendar days include arrival, departure and travel between cities",
      columns: ["Decision", "6 days: Shanghai–Suzhou–Hangzhou", "11 days: Beijing–Hangzhou–Suzhou–Shanghai"],
      rows: [
        ["Start and finish", "Arrive Shanghai; depart Hangzhou", "Arrive Beijing; depart Shanghai"],
        ["Hotel nights", "Shanghai 2, Suzhou 1, Hangzhou 2; two hotel changes", "Beijing 4, Hangzhou 2, Suzhou 1, Shanghai 3; three hotel changes"],
        ["Main reason to choose it", "Four guided touring days focused on Shanghai, Suzhou and Hangzhou", "Forbidden City and Mutianyu Great Wall before a longer eastern-China journey"],
        ["Travel between cities", "Shanghai–Suzhou–Hangzhou by the rail/private-transfer or vehicle plan confirmed for your party", "Second-class trains Beijing–Hangzhou and Hangzhou–Suzhou; private vehicle Suzhou–Shanghai; no domestic flight"],
        ["A distinct stop", "Lingyin–Feilai Peak and temple, a tea stop and West Lake cruise on the Hangzhou day", "A confirmed water town on the way from Suzhou to Shanghai, plus a West Lake boat"]
      ]
    },
    { id: "five-days-heading", type: "heading", level: 2, text: "What the extra five days actually change" },
    {
      id: "five-days",
      type: "paragraph",
      text: "On the eleven-day route, Days 2–4 are for Beijing: the Forbidden City, Mutianyu Great Wall, Temple of Heaven and Summer Palace. Day 5 is the train to Hangzhou, not another full sightseeing day. You then have two nights in Hangzhou, one in Suzhou and three in Shanghai. That gives the route space for a Suzhou garden, a water town and Shanghai time after Beijing. The six-day tour instead starts with Shanghai and moves forward to Suzhou and Hangzhou; its four guided touring days are Days 2–5."
    },
    {
      id: "different-sights",
      type: "callout",
      tone: "neutral",
      title: "The eleven-day tour is a different route, not the six-day tour plus Beijing",
      body: "The six-day plan lists Suzhou Museum subject to reservations and a Hangzhou day with Lingyin–Feilai Peak, a tea stop and a West Lake cruise. The eleven-day plan lists one Suzhou garden, a canal town and a West Lake boat. Lingyin Temple can replace the tea village if a visit slot is available. The scenic area currently has free admission but requires a real-name timed reservation; confirm the change for your dates before paying. Check the included stops on both product pages before comparing price."
    },
    { id: "effort-heading", type: "heading", level: 2, text: "Count the effort as well as the days" },
    {
      id: "effort",
      type: "list",
      ordered: false,
      items: [
        "Six days means three hotels and two changes. Days 3 and 4 combine sightseeing with a move to the next city. Arrival and departure are not full touring days.",
        "Eleven days means four hotels and three changes. The Beijing–Hangzhou train takes much of Day 5; Day 7 includes another train, and Day 8 moves to Shanghai by vehicle after the water-town stop. Day 10 leaves the afternoon free.",
        "The six-day standard route ends in Hangzhou. A flight home from Shanghai needs a separately planned return and possibly another night. The eleven-day standard route ends in Shanghai, but it requires an arrival into Beijing."
      ]
    },
    {
      id: "price-scope",
      type: "paragraph",
      text: "Compare the same party size on the current product pages, then compare what each package includes. The eleven-day route has five more hotel nights, Beijing admissions and two specified second-class rail journeys; the six-day route has its own listed sights and group-dependent intercity plan. International flights and lunch and dinner are separate on both published packages. Dates, rooms, transport and the final total need written confirmation before payment."
    },
    { id: "choose-heading", type: "heading", level: 2, text: "Which one should you choose?" },
    {
      id: "choose",
      type: "list",
      ordered: false,
      items: [
        "Choose six days when you have about a week in China, want the Shanghai skyline, Suzhou gardens and West Lake, and can finish the tour in Hangzhou. Ask about the separate Shanghai return if your flight requires it.",
        "Choose eleven days when Beijing's imperial sights and Great Wall matter to you, you can spare the extra five calendar days, and a Beijing arrival with Shanghai departure works for your international flights.",
        "If Xi'an's Terracotta Warriors or a full Huangshan mountain day are essential too, neither compared route includes them. A fourteen-day Beijing–Xi'an–Huangshan–Hangzhou–Shanghai tour is a separate longer option."
      ]
    },
    {
      id: "faq",
      type: "faq",
      title: "Questions before choosing",
      items: [
        {
          question: "Is the eleven-day tour just the six-day tour with five Beijing days added?",
          answer: "No. The six-day tour runs Shanghai → Suzhou → Hangzhou and ends there. The eleven-day tour runs Beijing → Hangzhou → Suzhou → Shanghai, with two specified second-class trains and a Suzhou-to-Shanghai private vehicle. Their Jiangnan sights and service lists also differ."
        },
        {
          question: "My flight home is from Shanghai. Can I still choose the six-day route?",
          answer: "The published six-day package ends at a Hangzhou airport or station. Share your Shanghai flight details before booking; the return transfer, its timing and any extra night need a separate plan and quote. Do not assume that return is included."
        },
        {
          question: "Do either of these routes include Xi'an?",
          answer: "No. The six-day route stays in Shanghai, Suzhou and Hangzhou; the eleven-day route adds Beijing but deliberately skips Xi'an. If Terracotta Warriors and Huangshan are priorities, review the separate fourteen-day route linked below."
        },
        {
          question: "Are the trains, hotels and attraction tickets secured when I send an inquiry?",
          answer: "An inquiry does not secure them. For the six-day route, the actual intercity mode depends on the party plan and Suzhou Museum is subject to reservations. For the eleven-day route, the named trains, hotels and admissions are confirmed for your dates in writing before payment."
        }
      ]
    },
    {
      id: "products",
      type: "internal-links",
      title: "Read the full routes before enquiring",
      items: [
        { label: "Shanghai, Suzhou & Hangzhou: 6-day private tour", href: "/tours/shanghai-suzhou-hangzhou-6-day-private-tour/", description: "Shanghai arrival, Hangzhou departure and four guided touring days." },
        { label: "Beijing, Hangzhou, Suzhou & Shanghai: 11-day private tour", href: "/tours/beijing-hangzhou-suzhou-shanghai-11-day-private-tour/", description: "Beijing arrival, Shanghai departure, two second-class trains and no domestic flight." },
        { label: "Beijing, Xi'an, Huangshan, Hangzhou & Shanghai: 14-day private tour", href: "/tours/beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour/", description: "A separate extension if Xi'an and Huangshan are also priorities." },
        { label: "Plan the Shanghai, Suzhou and Hangzhou city order", href: "/guides/shanghai-suzhou-hangzhou-nanjing-route-order/", description: "For the regional route-order decision, including Shanghai round trips." }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Current Lingyin visiting rule",
      items: [
        { label: "Lingyin–Feilai Peak free admission and timed reservation notice", url: "https://en.lingyinsi.org/detail_15105.html", publisher: "Hangzhou Lingyin Temple / scenic area", reviewedAt: "2026-09-26" }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
