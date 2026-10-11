import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "To walk the Zhangjiajie Grand Canyon Glass Bridge you buy route B, the bridge plus the canyon: RMB 175 for an adult on the scenic area’s own ticket shop, read on 11 October 2026. Route A is the canyon without the bridge, RMB 50. The shop’s order form lists a passport as an accepted ID. Book a date, bring the same passport, and arrange your pickup at the canyon exit, which is not where you went in." },
    { id: "price-table", type: "table", caption: "Zhangjiajie Grand Canyon ticket prices on the official shop, 11 October 2026", columns: ["Ticket", "Adult", "Ages 14–18, 60–65, full-time students", "Over 65", "Under 14"], rows: [
      ["B: Glass Bridge + canyon", "RMB 175", "RMB 88", "RMB 63", "Free"],
      ["A: canyon only, no bridge", "RMB 50", "RMB 25", "Free", "Free"]
    ] },
    { id: "price-copy", type: "paragraph", text: "These are the prices without insurance. The shop sells each ticket with or without accident insurance at RMB 3 a person; the scenic area recommends it, and visitors who decline are asked to sign a declaration at the ticket window or information desk. The form also has categories for service members, disabled visitors, journalists, firefighters, veterans and local residents. Whether a concession is honoured with a foreign passport is decided by staff, and we have not tested it." },
    { id: "old-prices", type: "callout", tone: "neutral", title: "Why other pages say RMB 219, 216 or 91", body: "Those are older list prices. The scenic area’s notice says route A’s list price is RMB 91 and that a promotional price of RMB 50, or RMB 25 with a concession, has applied since 1 January 2025. Its older website pages still show RMB 216 for route B, while the ticket shop charged RMB 175 when we read it. Trust the price on the order form for your date." },
    {
      "id": "reservation-pretrip-reminder",
      "type": "callout",
      "title": "The ticket also decides where your day ends",
      "body": "Route B starts at the visitor centre on the rim and finishes at the canyon exit on the valley floor. Fix the pickup point and the rest of the day after you know which route and date you hold.",
      "tone": "decision",
      "link": {
        "href": "https://homegroundchina.com/guides/china-attractions-advance-booking-checklist/",
        "label": "See what to arrange before your China trip"
      }
    },
    { id: "bridge-only-heading", type: "heading", level: 2, text: "Is there a ticket for the bridge only?" },
    { id: "bridge-only-copy", type: "paragraph", text: "Not on the official shop when we read it. Its notice says the scenic area is open on route A, the canyon alone, and route B, the Glass Bridge plus the canyon, and the product list has no bridge-only ticket. Some resellers and older guides describe a route C for the bridge alone. Treat that as unconfirmed unless the official shop lists it for your date." },
    { id: "routes-heading", type: "heading", level: 2, text: "Route A or B: what each one covers" },
    { id: "glass-bridge-route-cards", type: "comparison", title: "The routes the scenic area describes", columns: [
      { heading: "B: Glass Bridge + canyon", body: "About 3 hours by the shop’s notice; the scenic area’s route page gives 3.5 km and 3.5 hours.", items: ["Visitor centre → Glass Bridge → east-side experience centre → glass walkway → down into the canyon → Rainbow Square → boat on Shenquan Lake → canyon exit.", "The notice takes you down by paid rides: a zipline and slide, or a chain of three lifts. They are optional extras."] },
      { heading: "A: canyon only", body: "About 2 hours by the shop’s notice.", items: ["Visitor centre → Sky Slit (一线天) → Rainbow Square → Momo Cave → boat on Shenquan Lake → canyon exit.", "You do not cross the Glass Bridge."] },
      { heading: "B1: the short reverse route", body: "Described on the scenic area’s route page: into the canyon first, up by lifts, ending on the bridge, about 1.5 km.", items: ["It was not in the shop’s product list on 11 October 2026. Ask before planning around it."] }
    ] },
    { id: "extras-heading", type: "heading", level: 2, text: "What costs extra inside?" },
    { id: "extras-copy", type: "paragraph", text: "The rides inside are optional and paid separately. Each can be bought on the spot by scanning a code, or you can buy a bundle for RMB 120 a person. On the shop, route B with the bundle and insurance was RMB 298 for an adult." },
    { id: "extras-list", type: "list", items: [
      "The bundle covers eight items: the MR flying theatre, the zipline, the sightseeing lift, the treasure-hunt lift, the sculpture lift, the Wuwangpo slide, the Sky Slit slide and the Rainbow Lake boat.",
      "It is for one named person and cannot be shared. The notice says a visitor can fit in at least five of the eight on one route.",
      "Any item can close or turn you away because of weather, queues, maintenance, height, weight or health. The notice asks visitors to accept that.",
      "The 260-metre bungee jump is separate again: it needs a route B ticket and its own booking with Bungy China."
    ] },
    { id: "booking-heading", type: "heading", level: 2, text: "Can you book with a foreign passport?" },
    { id: "booking-copy", type: "paragraph", text: "The official order form lists six ID types: Chinese ID card, passport, the Hong Kong and Macau home-return permit, the Taiwan compatriot permit, the foreign permanent-resident card and the residence permit for Hong Kong, Macau and Taiwan residents. For each visitor it asks for a name, sex, ID type and number, and a country or region. It also asks for a mobile number and the name of the person collecting the tickets. The shop has an English option. We read the form on 11 October 2026 without placing an order, so we cannot say which payment methods it takes or whether a non-Chinese mobile number goes through." },
    { id: "booking-list", type: "list", ordered: true, items: [
      "Choose route B if you want the bridge. Route A does not include it.",
      "Pick the visit date. The notice says tickets can be booked five days ahead on the official site or through resellers; on 11 October the form offered sixteen dates, up to 26 October, with one entry window of 08:00–16:00 and a count of tickets left.",
      "Select 护照 (passport) and enter each traveller’s name and passport number exactly as printed. Tickets are real-name, so do not use someone else’s details.",
      "Decide on the RMB 3 insurance, then read the order total before paying.",
      "Know the refund rule: free if you cancel before opening time on the booked date, 10% of the order after that."
    ] },
    { id: "hours-heading", type: "heading", level: 2, text: "Opening hours and how long to allow" },
    { id: "hours-copy", type: "paragraph", text: "Both routes admit visitors from 08:00, and ticket checks stop at 16:00. Allow about three hours inside for route B and about two for route A, more with rides and queues. The Grand Canyon is in Cili County, about an hour by road from Zhangjiajie city, and Wulingyuan lies on the way. Drivers are directed from the visitor distribution centre at Shuangping up the Shuangshuang road for 5.5 km to the scenic area’s visitor centre. Do not put Tianmen Mountain on the same day." },
    { id: "not-forest-park", type: "callout", tone: "warning", title: "This is not the Forest Park, and not the Tianmen skywalk", body: "The Glass Bridge is in the Zhangjiajie Grand Canyon, a separate scenic area with its own ticket. A Zhangjiajie National Forest Park ticket does not cover it, and the glass walkways on Tianmen Mountain are a different place again." },
    { id: "faq", type: "faq", title: "Questions travellers ask before booking", items: [
      { question: "How much is a Zhangjiajie Glass Bridge ticket?", answer: "RMB 175 for an adult on the scenic area's official ticket shop, read on 11 October 2026. That is route B, which covers the Glass Bridge and the canyon below it. Accident insurance adds RMB 3. The same form showed RMB 88 for ages 14 to 18, ages 60 to 65 and full-time students, RMB 63 for visitors over 65, and free entry for children under 14." },
      { question: "Can I buy a ticket for the Glass Bridge only?", answer: "Not on the official shop when we read it on 11 October 2026. It sold route A, the canyon without the bridge, and route B, the bridge plus the canyon. Some resellers and older guides mention a bridge-only route C; check that the official shop lists it for your date before relying on it." },
      { question: "Can foreigners book Zhangjiajie Glass Bridge tickets with a passport?", answer: "The official order form lists passport among its ID types and asks for each visitor's name, passport number and country. We read the form without placing an order, so we have not tested payment or a non-Chinese mobile number. Bring the passport you booked with; tickets are real-name." },
      { question: "What is the difference between route A and route B?", answer: "Route A is the canyon only: about two hours from the visitor centre through the Sky Slit to a boat on Shenquan Lake, RMB 50 for an adult. Route B adds the Glass Bridge and the glass walkway before the canyon, takes about three hours and costs RMB 175. Both finish at the canyon exit." },
      { question: "Why do some websites say the ticket costs RMB 219?", answer: "That is an older list price for the bridge-plus-canyon ticket. The scenic area's older web pages still show RMB 216, and its notice says route A's list price is RMB 91 with a promotional RMB 50 since 1 January 2025. The official ticket shop charged RMB 175 for route B on 11 October 2026." },
      { question: "What time does the Zhangjiajie Glass Bridge open and close?", answer: "Entry starts at 08:00 and ticket checks stop at 16:00 on both routes, according to the official shop's notice and the scenic area's visitor page. Allow about three hours for route B, so do not arrive at the last minute." },
      { question: "Can I get a refund on a Glass Bridge ticket?", answer: "Yes. The official notice says a ticket cancelled before opening time on the booked date is refunded without a fee, and one cancelled after opening time is charged 10% of the order. A reseller's own terms may differ, so read them before paying." },
      { question: "Is the Glass Bridge inside Zhangjiajie National Forest Park?", answer: "No. It is at the Zhangjiajie Grand Canyon in Cili County, about an hour by road from Zhangjiajie city, with its own ticket and opening hours. A Forest Park ticket does not cover it, and the glass walkways on Tianmen Mountain are a third place." },
    ] },
    { id: "next-links", type: "internal-links", title: "Fit the Glass Bridge into your Zhangjiajie trip", items: [
      { label: "Glass Bridge or Tianmen skywalk: which is which", href: "/guides/zhangjiajie-glass-bridge-vs-skywalk/" },
      { label: "Tianmen Mountain tickets and routes", href: "/guides/tianmen-mountain-tickets-and-routes/" },
      { label: "Forest Park tickets and entrances", href: "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/" },
      { label: "Choose your Zhangjiajie sightseeing days", href: "/guides/zhangjiajie-itinerary/" }
    ] },
    { id: "sources", type: "sources", title: "Price and route references", items: [
      { label: "Official ticket shop: product list, notice and order form", url: "https://fx.zjjdaxiagu.com/html/pt/dxg/product/pub/list.html", publisher: "Zhangjiajie Grand Canyon scenic area", reviewedAt: "2026-10-11" },
      { label: "Official site: visitor guide with entry hours and routes", url: "https://zjjdaxiagu.com/guide.html", publisher: "Zhangjiajie Grand Canyon scenic area", reviewedAt: "2026-10-11" },
      { label: "Official site: ticket page with the older list prices", url: "https://zjjdaxiagu.com/ticket.html", publisher: "Zhangjiajie Grand Canyon scenic area", reviewedAt: "2026-10-11" }
    ] }
  ]
} satisfies StructuredPageBody;

export default body;
