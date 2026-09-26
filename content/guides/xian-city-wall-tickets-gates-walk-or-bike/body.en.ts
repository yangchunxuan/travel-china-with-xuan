import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "To enter Xi'an City Wall, use the operator-listed ‘西安城墙景区’ Douyin mini-program, Meituan or a staffed ticket window; the government-set standard full ticket is CNY 54, while a fixed advance-release window has not been verified. International visitors can buy at a staffed window; if you buy online, take the document entered at booking to a window for a paper entry pass before going to the gate."
    },
    { id: "booking-heading", type: "heading", level: 2, text: "Buy the admission that matches your document and visit date" },
    {
      id: "booking-rules",
      type: "table",
      caption: "Ticket paths from the scenic area's 1 July 2026 entry notice; check the live product for your date",
      columns: ["Channel", "Foreign visitor and document", "Release timing", "Standard fare", "Concessions", "Refund"],
      rows: [
        ["‘西安城墙景区’ Douyin mini-program", "If an online order accepts your document, bring that document to a ticket window for a paper pass.", "No current release window verified.", "Government full fare: CNY 54. Check event products.", "Government half fare: CNY 27; eligibility needs checking.", "Check the selected product's terms."],
        ["Meituan app", "The operator lists this channel. Foreign-document input has not been independently checked; online buyers still exchange at a window.", "No current release window verified.", "Government full fare: CNY 54. Check event products.", "Government half fare: CNY 27; eligibility needs checking.", "Check the selected product's terms."],
        ["Staffed ticket window", "The operator says foreign visitors can register details, buy a ticket and receive a paper entry pass.", "Buy on site during that window's operating hours; check the chosen gate.", "Government full fare: CNY 54. Check event products.", "Government half fare: CNY 27; eligibility needs checking.", "Ask before paying."]
      ]
    },
    {
      id: "mistakes",
      type: "callout",
      title: "Three easy mistakes",
      body: "An online order is not a QR code you can scan directly at the gate: electronic purchase QR entry ended on 1 July 2026, and international visitors exchange their order at a window. The 17 listed access points do not all have a verified 22:00 closing time; the operator's readable 08:00–22:00 statement names South Gate only. Cycling is a real activity, but a repeated rental quote is not a confirmed current fee, duration or return rule.",
      tone: "warning"
    },
    { id: "options-heading", type: "heading", level: 2, text: "Walk one section or plan a longer ride" },
    {
      id: "options",
      type: "comparison",
      columns: [
        { heading: "Walk a section", body: "Choose this for a closer look at the walls and views without committing to the 13.74 km circuit.", items: ["Pick your starting gate and a possible exit from the operator's 17-point list.", "Check both gates' hours for your date, or return to the gate where you entered.", "A flexible 60–90 minute block is a Homeground planning allowance for a short walk, not an operator timetable."] },
        { heading: "Cycle farther", body: "The scenic-area authority identifies cycling as an on-wall experience. A full circuit measures about 13.74 km.", items: ["Choose a longer time block and allow for stops; no official lap duration was verified.", "Confirm the rental point, price, deposit, last rental and return conditions on the day.", "Choose walking if the current rental terms or weather do not suit your group."] }
      ]
    },
    { id: "route-heading", type: "heading", level: 2, text: "Choose the gate around the rest of your Xi'an day" },
    {
      id: "route-list",
      type: "list",
      ordered: true,
      items: [
        "Start with your next stop and select an ascent and descent point from the 17 official access points. Yongning (South), Changle (East), Anding (West), Anyuan (North), Hanguang, Wenchang and Wumu (Small South) are among them; Shuyuanmen does not appear on that access-point list.",
        "For a short first visit, Yongning Gate gives a simple anchor and is the only gate with 08:00–22:00 hours visible on the operator's current website. Walk a section and return there, or use another listed exit after confirming its hours.",
        "For a full-circuit ambition, treat 13.74 km as a separate activity. Check bike availability and return conditions before committing, and keep your later plans loose.",
        "On Homeground's published five-day Xi'an private tour, the City Wall is on Day 2 with the Giant Wild Goose Pagoda square and Grand Tang Mall; the Terracotta Warriors are a separate Day 3 visit. The order of Day 2 stops follows actual reservations."
      ]
    },
    { id: "hours-heading", type: "heading", level: 2, text: "Check the exact gate and date, especially for an evening visit" },
    {
      id: "hours",
      type: "paragraph",
      text: "The scenic-area website currently lists South Gate at 08:00–22:00, but its linked detailed-hours page did not return readable content when checked on 26 September 2026. No current official gate-by-gate closing or last-admission table was confirmed. Event dates can use different arrangements, so check the live ticket listing or call the scenic area on +86 29 8727 2792 before relying on a late entrance or a particular exit."
    },
    { id: "practical-heading", type: "heading", level: 2, text: "Carry the booking document and leave room for the window step" },
    {
      id: "practical",
      type: "list",
      items: [
        "If you booked online with a foreign travel document, bring that same original document to the ticket window to exchange for a paper pass before entry.",
        "The operator's entry notice describes paper-pass scanning plus face verification for international visitors. If you do not wish to use face verification, ask the ticket office for its alternative method.",
        "A September 2026 district report says nine City Wall ticket windows accept overseas bank cards, but it does not identify each window or card network. Confirm the payment method at the gate you plan to use.",
        "Dress for the actual weather and a long, exposed outdoor walk. Choose a shorter section if your group's pace, daylight or conditions make a long ride unappealing."
      ]
    },
    {
      id: "final-check",
      type: "callout",
      title: "Check again the day before",
      body: "Confirm your visit-date ticket and any event supplement; the exact opening and last-entry time at the gate you will use; whether your online channel accepts your document; time for paper-pass exchange; and bike rental terms if you plan to ride. Keep the operator's service number, +86 29 8727 2792, with your booking details.",
      tone: "decision"
    },
    {
      id: "faq",
      type: "faq",
      title: "Xi'an City Wall questions before you go",
      items: [
        { question: "How much is a Xi'an City Wall ticket?", answer: "The government's standard Xi'an City Wall tariff is CNY 54 for a full ticket and CNY 27 for a half ticket, last confirmed in its August 2025 formal reply. Check the live listing for the visit date because special-event products and concession eligibility were not confirmed by that reply." },
        { question: "Must I reserve Xi'an City Wall in advance?", answer: "The scenic area's 1 July 2026 notice lists a Douyin mini-program, Meituan and staffed ticket windows as sales channels, so a window purchase is available in principle. No current advance-release window or universal advance-reservation requirement was verified for Xi'an City Wall. Check availability for your exact date, especially an event day." },
        { question: "Can foreign visitors use a passport at Xi'an City Wall?", answer: "Xi'an City Wall's 1 July 2026 notice says international visitors can buy at a staffed window, while online buyers take the document entered at booking to a window for a paper pass. It does not confirm that every online channel accepts foreign passports. Bring the original document used for the order and allow time for the exchange." },
        { question: "Which of Xi'an City Wall's gates should I use?", answer: "A district government report lists 17 Xi'an City Wall ascent and descent points, including Yongning, Changle, Anding and Anyuan. Choose the point that fits your next stop and verify its hours. Yongning is an easy first-visit anchor, but there is no official universal ‘best gate’ rule." },
        { question: "Is Xi'an City Wall open at night?", answer: "The operator's website lists South Gate at 08:00–22:00, but no readable current timetable was confirmed for the other 16 access points or for last admission. Check the precise gate and date before building a night visit around Xi'an City Wall; event schedules may differ." },
        { question: "Should I walk or rent a bike on Xi'an City Wall?", answer: "Xi'an City Wall's 13.74 km circuit can be approached as a short walk or a longer cycling activity. A 2026 district reply confirms cycling as a visitor experience, but current rental fees, deposit, duration, collection points and return rules were not verified from an official readable source. Check them before choosing a full ride." }
      ]
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Place the wall in your Xi'an plan",
      items: [
        { label: "Xi'an destination guide", href: "/destinations/xian/", description: "Decide how many nights you have and how the old city fits the stay." },
        { label: "Xi'an and the Terracotta Warriors: five-day private tour", href: "/tours/xian-terracotta-warriors-5-day-private-tour/", description: "See the published Day 2 wall visit and separate Day 3 mausoleum day." },
        { label: "Terracotta Warriors without a tour", href: "/guides/terracotta-warriors-without-tour/", description: "Plan the separate Lintong ticket and transport task." },
        { label: "Where to stay in Xi'an", href: "/guides/xian-where-to-stay-city-wall-or-dayanta/", description: "Choose a hotel area by the actual gate and the rest of your route." },
        { label: "Read a Chinese city wall", href: "/guides/chinese-city-walls-gates-and-urban-order/", description: "See gates, repairs and street structure as parts of one city system." }
      ]
    },
    {
      id: "consultation",
      type: "callout",
      title: "Want the wall fitted to your Xi'an days?",
      body: "A Homeground travel consultant can check the gate, current admission and whether walking or cycling suits your group's pace. On our published five-day Xi'an private tour, the wall is part of Day 2; the exact stop order and entry arrangements are confirmed for your dates.",
      tone: "neutral"
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        { label: "Scenic-area website: South Gate hours and service number (undated header)", url: "http://www.chinaxiancitywall.com/", publisher: "Xi'an City Wall scenic area", reviewedAt: "2026-09-26" },
        { label: "Scenic-area 1 July 2026 entry notice, reproduced with source credit", url: "https://www.sxdaily.com.cn/2026-07/01/content_20049276.html", publisher: "Xi'an City Wall via Shaanxi Daily", reviewedAt: "2026-09-26" },
        { label: "Government-set standard full and half fare, published 16 August 2025", url: "https://qjxq.xa.gov.cn/zwgk/ndzdxxgk/jytabl/1958091978013503489.html", publisher: "Qujiang New District Management Committee", reviewedAt: "2026-09-26" },
        { label: "Seventeen ascent and descent points, published 28 July 2025", url: "https://qjxq.xa.gov.cn/xwzx/xwdt/1949774484239577090.html", publisher: "Qujiang New District Management Committee", reviewedAt: "2026-09-26" },
        { label: "Cycling project and seventeen access points, reply dated 20 July 2026", url: "https://qjxq.xa.gov.cn/zwgk/ndzdxxgk/jytabl/2079470382543396866.html", publisher: "Qujiang New District Management Committee", reviewedAt: "2026-09-26" },
        { label: "Wall circumference of 13.74 km, published 13 March 2026", url: "https://qjxq.xa.gov.cn/xwzx/xwdt/2032394805232328706.html", publisher: "Qujiang New District Management Committee", reviewedAt: "2026-09-26" },
        { label: "Overseas bank cards at nine ticket windows, published 8 September 2026", url: "https://qjxq.xa.gov.cn/xwzx/xwdt/2097259847898689538.html", publisher: "Qujiang New District Management Committee", reviewedAt: "2026-09-26" }
      ]
    }
  ]
};

export default body;
