import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer",
      type: "lead",
      text: "For six calendar days from Xiamen, use five hotel nights: Xiamen on the first and last nights, then one night each in Nanjing County, Anxi and Quanzhou. Visit Yongding's Chengqi Lou area on the way to Nanjing and Tianluokeng the following day. That is the point of the route: the two tulou areas are separate days, not a hurried single stop labelled ‘Fujian Tulou’."
    },
    { id: "night-heading", type: "heading", level: 2, text: "Put each hotel where the next day starts" },
    {
      id: "nights",
      type: "table",
      caption: "Five nights in the published six-day Xiamen–tulou–Anxi–Quanzhou route",
      columns: ["Night", "Sleep in", "Why this base matters"],
      rows: [
        ["1", "Xiamen", "Arrive and settle in. Gulangyu works only if your arrival and a confirmed ferry leave enough time."],
        ["2", "Nanjing County", "The Yongding visit is one day; sleep nearer the Nanjing tulou area for the next."],
        ["3", "Anxi", "See Tianluokeng, then continue for the tea visit without driving back to Xiamen."],
        ["4", "Quanzhou", "Give the old city its own evening and a museum visit the following day."],
        ["5", "Xiamen", "Return after Quanzhou so your departure starts from the city of your flight."]
      ]
    },
    {
      id: "day-one-heading", type: "heading", level: 2, text: "Do not make the arrival-day ferry a race" },
    {
      id: "day-one", type: "paragraph",
      text: "The published tour goes to Gulangyu after the Xiamen airport pickup. That is reasonable with an early arrival and a suitable reserved boat, but not an unconditional promise for a late flight. Check the actual landing time, airport exit, pier and ferry before fixing the first day. If they do not fit, discuss a revised island visit or a lighter Xiamen arrival; changing the order may mean removing something else. The separate ferry guide handles tickets and terminals."
    },
    { id: "cut-heading", type: "heading", level: 2, text: "If you have fewer than six days, choose a priority" },
    {
      id: "cut-options", type: "list", items: [
        "Want tulou architecture most? Keep either Yongding or Nanjing as a proper visit. Do not claim you have seen both by adding two distant photo stops to one driving day.",
        "Want tea and the old port city? Keep Anxi and Quanzhou, but reduce the tulou leg to one area and ask for a newly costed route.",
        "Dislike changing hotels? A Xiamen-base trip is possible to discuss, but it means more return driving and is a different itinerary from the published five-night loop.",
        "Flying home from Xiamen? Protect the final Xiamen night. A rushed return from Quanzhou on departure morning buys little sightseeing and makes the flight day less forgiving."
      ]
    },
    {
      id: "fit", type: "callout", tone: "decision", title: "Who this loop suits",
      body: "Choose the six-day loop if you want island lanes, two distinct tulou areas, tea and Quanzhou—and are comfortable changing hotel bases. If your party needs a slower pace or easier walking, start with the least mobile traveller's day and ask us to reduce the route before a price is agreed. A shortened version is a custom quote, not the same package with a day removed."
    },
    {
      id: "faq", type: "faq", title: "Questions before you book", items: [
        { question: "Can I use Xiamen as my hotel base for all five nights?", answer: "You can request a different Xiamen-base plan, but the published six-day tour stays in Xiamen twice and in Nanjing, Anxi and Quanzhou once each. Returning to Xiamen every night adds road time and changes the quote." },
        { question: "Are Yongding and Nanjing tulou done in one day?", answer: "No. The published route visits the Chengqi Lou area in Yongding on Day 2 and Tianluokeng in Nanjing on Day 3. The separate tulou guide helps you choose a single area if you have only one day." },
        { question: "Is Gulangyu guaranteed on arrival day?", answer: "No. The day depends on your actual Xiamen arrival, the confirmed ferry and any operating change. Agree the sequence in writing before booking rather than counting a late-arrival day as a full island visit." }
      ]
    },
    {
      id: "links", type: "internal-links", title: "Make the next decision", items: [
        { label: "Six-day Xiamen, Tulou, Anxi and Quanzhou private tour", href: "/tours/xiamen-tulou-quanzhou-6-day-private-tour/", description: "Read the actual nights, inclusions and enquiry options." },
        { label: "Which Fujian tulou cluster should you visit?", href: "/guides/fujian-tulou-cluster-selection/", description: "Choose a cluster when the tulou part is only one day." },
        { label: "Xiamen arrival to Gulangyu ferry", href: "/guides/xiamen-hubs-to-gulangyu-ferry-terminal/", description: "Check the pier and booking workflow once you know your arrival." }
      ]
    },
    {
      id: "sources", type: "sources", title: "Route and official sources", items: [
        { label: "Fujian Tulou World Heritage property", url: "https://whc.unesco.org/en/list/1113/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-09-26" },
        { label: "Quanzhou World Heritage property", url: "https://whc.unesco.org/en/list/1561/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-09-26" },
        { label: "Xiamen ferry operating notices", url: "https://www.xmferry.com/", publisher: "Xiamen Ferry", reviewedAt: "2026-09-26" },
        { label: "Hero photograph: Gulangyu by Jakob Montrasio, CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Gulangyu.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-26" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
