import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "Use the official Suzhou Gardens WeChat channel (苏州园林旅游) to arrange a real-name, timed ticket for Humble Administrator's Garden 1–7 days before visiting; the published adult price is ¥80 in peak months and ¥70 in off-peak months. Keep the original document used for the booking and follow your confirmed entry slot, because this garden's ticket does not reserve nearby Suzhou Museum." },
    { id: "booking-heading", type: "heading", level: 2, text: "Book the garden's own date and time slot" },
    { id: "booking-rules", type: "table", caption: "Official Suzhou notices and bureau price list checked 26 September 2026", columns: ["Item", "Published rule", "Planning step"], rows: [
      ["Channel", "Suzhou Gardens' official WeChat services publish ticket and opening notices; the garden uses real-name timed admission.", "Use the official 苏州园林旅游 account's ticket entry, and keep the successful order."],
      ["Window", "The 2026 city notice describes online booking 1–7 days before visiting.", "Choose the date and slot early; the official sources reviewed did not confirm a daily release clock or same-day supply."],
      ["Adult price", "¥80 in April, May and July–October; ¥70 in January–March, June and November–December.", "Check the official checkout again before paying, especially for a later-year visit."],
      ["ID and concessions", "The garden uses real-name ticketing. Official policy lists age and other concessions with qualifying documents.", "Use the document shown on your order. Passport holders should confirm booking steps and concession eligibility with the operator."],
      ["Changes or refunds", "A current official refund deadline was not verified from the sources reviewed.", "Read the terms on the actual booking screen before payment."],
    ] },
    { id: "mistakes", type: "callout", title: "Keep three bookings separate", body: "The garden ticket is for a named visitor, date and time slot; a Suzhou Museum reservation is separate. The museum's 08:00 release time is not a verified release time for the garden. The 06:45 opening announced for part of 2026 is a dated opening-time change, not evidence of a separate early-entry ticket.", tone: "warning" },
    { id: "options-heading", type: "heading", level: 2, text: "What should share this Suzhou day?" },
    { id: "options", type: "comparison", columns: [
      { heading: "Garden as the main stop", body: "Choose a garden slot first, then leave flexible time for its East, Middle and West sections. Use the current onsite map for the actual route rather than assuming a fixed gate or visit length." },
      { heading: "Garden plus Suzhou Museum", body: "Reserve the museum's main building independently if it is part of your plan. Its booking calendar, entry document and opening hours belong to the museum, not to the garden ticket." },
      { heading: "Garden on a Shanghai–Suzhou trip", body: "Set the Suzhou date and garden slot before finalising rail or transfer timing. Homeground's published Shanghai–Suzhou routes include the garden, subject to the confirmed itinerary and ticket availability." },
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "A visit sequence without a guessed entrance" },
    { id: "route-list", type: "list", items: [
      "Before travelling, save the confirmed garden order showing each visitor's name, date and entry window.",
      "Navigate to the official address, 178 Dongbei Street, and follow current signs and the booking instructions to the visitor entrance.",
      "After entry, look at the current map. The garden has East, Middle and West sections; choose an order that fits onsite access and your available time.",
      "If also visiting Suzhou Museum, keep its separate confirmation and entry window; do not assume one ticket covers both places.",
    ] },
    { id: "hours-heading", type: "heading", level: 2, text: "Standard hours and the 2026 early opening" },
    { id: "hours", type: "paragraph", text: "The Suzhou bureau's standard table lists March–October 07:30–17:30 (last ticket check 17:00) and November–February 07:30–17:00 (last check 16:30). A Suzhou city notice announced 06:45 opening from 19 June through 7 October 2026. The bureau also lists later closing on Qingming, May Day, Mid-Autumn and National Day holidays. Check 苏州园林旅游 for the notice applying to your exact date; do not extend the 2026 early opening into 2027 by assumption." },
    { id: "practical-heading", type: "heading", level: 2, text: "Documents and details that can trip up a visit" },
    { id: "practical", type: "list", items: [
      "Enter every visitor's name and document details as required by the official booking screen, then carry the original booked document.",
      "Suzhou reported passport ticketing and onsite help for foreign visitors in 2024, but current step-by-step passport booking and concession rules were not confirmed; ask the garden service channel before relying on them.",
      "Check the correct seasonal adult price: ¥80 in April, May and July–October; ¥70 in the other listed months.",
      "Do not borrow Suzhou Museum's 08:00 ticket release or its same-day rule for the garden.",
      "If plans may change, read the refund and no-show terms on the garden's actual order before purchase.",
    ] },
    { id: "final-check", type: "callout", title: "The day-before check", body: "Confirm each name, original document, garden date and time slot, the latest opening notice, and any separate Suzhou Museum booking. If the reservation is still only in a basket or message draft, it is not a confirmed garden ticket.", tone: "decision" },
    { id: "faq", type: "faq", title: "Humble Administrator's Garden questions", items: [
      { question: "How early should I book Humble Administrator's Garden?", answer: "The Suzhou city notice describes real-name, timed online booking 1–7 days before a Humble Administrator's Garden visit. The official sources checked on 26 September 2026 did not give a daily release clock or guarantee same-day availability." },
      { question: "How much is Humble Administrator's Garden admission?", answer: "The bureau lists adult admission at ¥80 in April, May and July–October, and ¥70 in January–March, June and November–December. Recheck checkout for the actual date; the list was published in 2024." },
      { question: "Can I book Humble Administrator's Garden with a passport?", answer: "Suzhou reported passport ticketing and onsite help for foreign visitors in 2024, but the current steps inside the official booking service were not verified. Contact that service before assuming a passport option or an onsite ticket will work on your date." },
      { question: "Does Humble Administrator's Garden have a 06:45 ticket?", answer: "A city notice announced a 06:45 opening from 19 June to 7 October 2026. It described an opening-time change, not a separately priced early-entry product. Check the official notice for later dates." },
      { question: "Does a Humble Administrator's Garden ticket include Suzhou Museum?", answer: "No. Humble Administrator's Garden and the main Suzhou Museum building use separate reservations. The museum's 08:00 new-date release belongs to the museum and should not be used as a garden booking time." },
      { question: "What should I show at Humble Administrator's Garden entry?", answer: "Humble Administrator's Garden, at 178 Dongbei Street, uses real-name ticketing for a selected date and time slot. Keep the successful order and carry the original identity document used to book; follow the entry instructions on that order." },
    ] },
    { id: "internal-links", type: "internal-links", title: "Fit the garden into Suzhou", items: [
      { label: "How to read a Suzhou garden", href: "/guides/how-to-read-a-suzhou-garden/", description: "Choose a garden and understand its spaces; this page handles Humble Administrator's Garden entry." },
      { label: "Shanghai to Suzhou day trip", href: "/guides/shanghai-to-suzhou-day-trip/", description: "Plan train stations and the return around your confirmed garden slot." },
      { label: "Shanghai–Suzhou–Hangzhou six-day private tour", href: "/tours/shanghai-suzhou-hangzhou-6-day-private-tour/", description: "A published route that includes Humble Administrator's Garden; confirm the final date and ticket." },
      { label: "Shanghai–Suzhou five-day private tour", href: "/tours/shanghai-suzhou-5-day-private-tour/", description: "Another published route with a garden stop; inspect the day-by-day plan." },
    ] },
    { id: "consultation", type: "callout", title: "Need the garden fitted around a Suzhou day?", body: "Share your travel date, party size and any confirmed train or museum times. A Homeground travel consultant can review the order and booking needs for the published routes; a garden ticket is secured only after the actual booking is confirmed.", tone: "neutral" },
    { id: "sources", type: "sources", title: "Official sources checked 26 September 2026", items: [
      { label: "Official WeChat booking channels and real-name sites (23 September 2025)", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202509/2dea3bc5843d4030a65e8a30c391282a.shtml", publisher: "Suzhou Municipal Government", reviewedAt: "2026-09-26" },
      { label: "Garden adult prices and peak/off-peak months (11 July 2024)", url: "https://ylj.suzhou.gov.cn/szsylj/mpjg/wztt.shtml", publisher: "Suzhou Landscape and Greening Bureau", reviewedAt: "2026-09-26" },
      { label: "Garden standard hours and official notice channel (9 January 2025)", url: "https://ylj.suzhou.gov.cn/szsylj/kfsj/wztt.shtml", publisher: "Suzhou Landscape and Greening Bureau", reviewedAt: "2026-09-26" },
      { label: "Real-name tickets and seven-day advance purchase (7 January 2025)", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202501/c4064030b80e4b2a8913d7120e147302.shtml", publisher: "Suzhou Municipal Government", reviewedAt: "2026-09-26" },
      { label: "Timed booking 1–7 days ahead and 2026 early opening (19 June 2026)", url: "https://www.suzhou.gov.cn/szsrmzf/dstx/202606/b12c95b19bd14f499300f2324c9aa7dd.shtml", publisher: "Suzhou Municipal Government", reviewedAt: "2026-09-26" },
      { label: "Passport ticketing and onsite foreign-visitor help reported in 2024", url: "https://www.suzhou.gov.cn/szsrmzf/szyw/202407/b9adeadc7d134766a4654cff216dfcf1.shtml", publisher: "Suzhou Municipal Government", reviewedAt: "2026-09-26" },
      { label: "Suzhou Museum's separate main-building reservation rules", url: "https://www.szmuseum.com/Other/ReservationTip", publisher: "Suzhou Museum", reviewedAt: "2026-09-26" },
      { label: "Garden address and East, Middle and West sections", url: "https://ylj.suzhou.gov.cn/szsylj/sjyc/201905/c1df393edc8745abb20e8a9bd5525782.shtml", publisher: "Suzhou Landscape and Greening Bureau", reviewedAt: "2026-09-26" },
    ] },
  ],
};

export default body;
