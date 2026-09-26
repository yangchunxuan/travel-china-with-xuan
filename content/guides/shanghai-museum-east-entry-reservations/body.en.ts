import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "Shanghai Museum East currently offers free general entry to individual visitors without an advance reservation; bring an original valid identity document to the B1 east entrance for security and ID scanning. The Curio-City (古代文明探索宫) and Digital Gallery (数字馆) need separate advance bookings through the museum's East-building Special Reservation page, so decide which visit you want before you go." },
    { id: "booking-heading", type: "heading", level: 2, text: "General entry and special areas have different rules" },
    { id: "booking-rules", type: "table", caption: "Shanghai Museum's official notices checked 26 September 2026", columns: ["Item", "Current rule", "What to do"], rows: [
      ["General entry", "Free walk-in entry for individuals at East; no advance reservation window.", "Bring the original valid identity document and use the B1 east entrance."],
      ["Two experience areas", "The Curio-City (古代文明探索宫) and Digital Gallery (数字馆) require separate advance bookings.", "Open the East building's ‘special reservation’ section in the museum's WeChat booking service."],
      ["Foreign passport", "Shanghai's visitor guide names passports as valid ID, but the museum's current East page does not explain the gate-scanning process.", "Ask the museum how to complete entry with a foreign passport: (021) 60226699."],
      ["Paid exhibitions", "A separately priced exhibition may use the museum's booking service.", "Check that exhibition's own notice; no general-entry payment is required."],
    ] },
    { id: "mistakes", type: "callout", title: "Three easy mix-ups", body: "Free, no-reservation entry covers the ordinary East visit, not the two bookable experience areas. East normally closes on Tuesday, not Monday. The People's Square building has its own paid-exhibition rule; a post about that building is not an East admission rule.", tone: "warning" },
    { id: "options-heading", type: "heading", level: 2, text: "Choose the building before planning tickets" },
    { id: "options", type: "comparison", columns: [
      { heading: "East building", body: "Choose East for a free general museum visit. Enter from B1 east with an original valid ID; reserve the two special experience areas separately if they matter to you." },
      { heading: "People's Square building", body: "From 9 July 2026 to 14 November 2027, the museum says this building hosts only its ancient American civilisations special exhibition, with ticketed entry for ordinary visitors. Check its current price, any exemption and booking terms directly; East's free-entry rule does not transfer." },
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "A simple East visit sequence" },
    { id: "route-list", type: "list", items: [
      "Choose East on the museum's official visit pages; check whether you also want either separately booked experience area.",
      "Travel to Shanghai Museum East, then follow the current signs to its B1 east visitor entrance; allow time for security and ID scanning.",
      "Inside, consult the current gallery map and choose one exhibition as your anchor before adding another. Gallery access can change.",
      "If you booked an experience area, plan around the time shown on that confirmation rather than treating ordinary walk-in entry as its ticket.",
    ] },
    { id: "hours-heading", type: "heading", level: 2, text: "Hours and closed day" },
    { id: "hours", type: "paragraph", text: "The East building's standing hours are 10:00–18:00, with last entry at 17:00. It normally closes on Tuesdays except national public holidays. These rules were checked on 26 September 2026; read the museum's latest notice for your actual date, especially around a holiday." },
    { id: "practical-heading", type: "heading", level: 2, text: "Before you leave for the museum" },
    { id: "practical", type: "list", items: [
      "Carry the original identity document; a photo of it is not what the official entry notice asks for.",
      "Shanghai's visitor guide names passports, but confirm the current gate procedure with the museum before relying on one.",
      "Capacity controls can create a queue even when advance booking is not required.",
      "Check separately for paid exhibitions and the two reservable experience areas; ordinary entry is not their confirmation.",
    ] },
    { id: "final-check", type: "callout", title: "The day-before check", body: "Confirm that your destination is East, the museum is open on your date, your original ID is ready, and any experience-area booking is actually confirmed. For a foreign passport, settle the entry-document question with the museum before travel.", tone: "decision" },
    { id: "faq", type: "faq", title: "Shanghai Museum East questions", items: [
      { question: "Do I need to reserve Shanghai Museum East?", answer: "For ordinary individual entry to Shanghai Museum East, no advance reservation is currently needed and admission is free. The Curio-City (古代文明探索宫) and Digital Gallery (数字馆) are two separately reservable areas." },
      { question: "Where is the Shanghai Museum East entrance?", answer: "The official East notice directs visitors with an original valid identity document to the B1 east entrance for security and ID scanning. Follow current onsite signs once you arrive." },
      { question: "Can I enter Shanghai Museum East with a passport?", answer: "Shanghai's municipal visitor guide lists a passport as valid ID for Shanghai Museum East. The museum's current East notice asks for an original valid document without explaining how a foreign passport is scanned; call (021) 60226699 to confirm that step." },
      { question: "Is Shanghai Museum East closed on Monday or Tuesday?", answer: "Shanghai Museum East normally closes on Tuesday, except national public holidays. Its listed hours are 10:00–18:00 with last entry at 17:00; check any dated holiday notice." },
      { question: "Does Shanghai Museum East's free entry cover People's Square?", answer: "No. From 9 July 2026 to 14 November 2027, the museum says its People's Square building shows only a ticketed special exhibition. Check the current ticket and any exemption rules; East's ordinary entry remains a separate free arrangement." },
      { question: "Is Shanghai Museum East included in Homeground's Shanghai–Suzhou five-day tour?", answer: "No. The published Shanghai–Suzhou five-day itinerary offers a choice involving the Shanghai Museum at People's Square, not the East building. Ask about East as a customisation before assuming it can fit your dates and route." },
    ] },
    { id: "internal-links", type: "internal-links", title: "Plan the rest of Shanghai", items: [
      { label: "Shanghai–Suzhou five-day private tour", href: "/tours/shanghai-suzhou-5-day-private-tour/", description: "Published route: People's Square museum option, not East. Discuss East as a customisation." },
      { label: "Verify a China attraction ticket", href: "/guides/official-or-reseller-china-tickets/", description: "Check which booking is actually confirmed before paying a reseller." },
    ] },
    { id: "consultation", type: "callout", title: "Want East fitted into a Shanghai day?", body: "A Homeground travel consultant can review your date, other timed stops and the East building's current entry rules. The published Shanghai–Suzhou five-day tour does not include East; ask us to discuss it as a customisation, subject to confirmation.", tone: "neutral" },
    { id: "sources", type: "sources", title: "Official sources checked 26 September 2026", items: [
      { label: "East visit rules: B1 East Gate, hours, Tuesday closure and separate experience reservations", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/en/service/visit-east", publisher: "Shanghai Museum", reviewedAt: "2026-09-26" },
      { label: "People's Square exhibition period and ticketed entry", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/service/visit-west", publisher: "Shanghai Museum", reviewedAt: "2026-09-26" },
      { label: "Municipal visitor guide naming passports as valid ID for East entry", url: "https://english.shanghai.gov.cn/en-MuseumsGalleries/20241205/756c96bd7dd940378b9ac056f11429e2.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-09-26" },
      { label: "Museum homepage stating that permanent galleries are free", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/index", publisher: "Shanghai Museum", reviewedAt: "2026-09-26" },
    ] },
  ],
};

export default body;
