import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "No, you do not need to book general entry to Shanghai Museum East: individual visitors currently walk in free, with an original valid ID, through the B1 east entrance. Two parts of the museum are different. The Curio-City (古代文明探索宫) and the Digital Gallery (数字馆) each need their own advance booking, and the museum's other building, at People's Square, is showing a single ticketed special exhibition until 14 November 2027. East opens 10:00–18:00, last entry 17:00, and closes on Tuesdays, not Mondays. It is also very large, so arrive with a plan." },
    { id: "booking-heading", type: "heading", level: 2, text: "What needs booking at Shanghai Museum, and what does not" },
    { id: "booking-rules", type: "table", caption: "Shanghai Museum's official notices, checked 26 September 2026", columns: ["Item", "Current rule", "What to do"], rows: [
      ["East: general entry", "Free walk-in entry for individuals, without an advance reservation", "Bring the original valid ID and use the B1 east entrance"],
      ["East: Curio-City and Digital Gallery", "Each needs a separate advance booking", "Book in the East building's special-reservation section of the museum's WeChat booking service"],
      ["People's Square building", "9 July 2026 – 14 November 2027: one ticketed exhibition only, on ancient American civilisations. Day session 09:00–17:00, last entry 15:00; day-and-evening session to 21:00, last entry 19:00; closed Mondays except national holidays; 201 Renmin Avenue, south gate on Wusheng Road", "Book ahead on the museum's mini-program if you want a set time; East's free entry does not apply"],
      ["Foreign passport", "Shanghai's official visitor guide says to show a valid ID, such as a passport, at the B1 East Gate", "Carry the original passport; the museum's number is (021) 60226699 if anything is unclear"],
      ["Paid exhibitions", "A separately priced exhibition may use the museum's booking service", "Check that exhibition's own notice"],
    ] },
    { id: "hours-heading", type: "heading", level: 2, text: "Opening hours and the closing day" },
    { id: "hours", type: "paragraph", text: "East is at 1952 Century Avenue, Pudong. Take Metro Line 2 to Shanghai Science and Technology Museum, Exit 8; individual visitors enter at the B1 East Gate near Dingxiang Road. East opens 10:00–18:00, with last entry at 17:00, and normally closes on Tuesdays, except national public holidays. These rules were checked on 26 September 2026; read the museum's latest notice for your date, especially around a holiday." },
    { id: "scale", type: "paragraph", text: "The scale catches people out. When the building opened in stages, the museum's plans described 20 galleries and interactive spaces, including 13 permanent galleries, in about 33,600 square metres of exhibition space (Jiemian, January 2024). That is a full day if you try to see everything, so choose one or two galleries as your anchor before you arrive." },
    { id: "traps-heading", type: "heading", level: 2, text: "Traps that spoil a free museum day" },
    { id: "traps-table", type: "table", caption: "What goes wrong, and why", columns: ["Trap", "What actually happens", "Where this comes from"], rows: [
      ["Planning it for a Tuesday", "East is closed on Tuesdays, not Mondays, except national public holidays.", "Shanghai Museum East visit page"],
      ["Assuming free entry covers the Curio-City", "The Curio-City and the Digital Gallery each need their own advance booking.", "Shanghai Museum East visit page"],
      ["Going to People's Square for the free museum", "Until 14 November 2027 that building shows one ticketed special exhibition.", "Shanghai Museum People's Square visit page"],
      ["Arriving at 17:15", "Last entry is 17:00.", "Shanghai Museum East visit page"],
      ["Bringing a photo of your ID", "The entry notice asks for the original valid document.", "Shanghai Museum East visit page"],
      ["Doing both buildings on a Monday or Tuesday", "People's Square closes on Mondays and East on Tuesdays, so neither day gets you both.", "Shanghai Museum visit pages"],
      ["Reaching People's Square at 15:30", "On a day-session ticket, entry stops at 15:00, two hours before closing.", "Shanghai Museum People's Square visit page"],
      ["Trying to see it all", "Twenty galleries and spaces over about 33,600 square metres will not fit into an afternoon.", "Jiemian, January 2024"],
    ] },
    { id: "options-heading", type: "heading", level: 2, text: "East or People's Square?" },
    { id: "options", type: "comparison", columns: [
      { heading: "East building", body: "Free general entry from B1 east with an original ID; book the two experience areas separately if you want them." },
      { heading: "People's Square building", body: "Until 14 November 2027, only the ticketed special exhibition. Check its price and booking terms directly; East's free-entry rule does not transfer." },
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "A simple East visit" },
    { id: "route-list", type: "list", items: [
      "Decide whether you also want either of the two bookable experience areas, and book them first.",
      "Follow the signs to the B1 east visitor entrance; allow time for security and the ID scan.",
      "Inside, check the gallery map and choose one gallery as your anchor before adding another.",
      "If you booked an experience area, plan around the time on that confirmation.",
    ] },
    { id: "sales-heading", type: "heading", level: 2, text: "Make the most of a free museum" },
    { id: "sales-copy", type: "paragraph", text: "East costs nothing to enter, which is exactly why the time inside is what matters. A licensed English-speaking guide can pick the galleries that suit your group and tell the story of bronzes, ceramics and painting in two or three hours instead of a lost afternoon. We can book the Curio-City or the Digital Gallery, the People's Square exhibition and the Shanghai Tower observation deck in each traveller's name. Most Shanghai visitors also go to Suzhou, and that booking is harder: Humble Administrator's Garden opens only 7 days ahead, and on 30 September 2026 it was already fully booked for 2 to 5 October, with only some time slots left on 1 and 6 October. Request and pay through us at least 8 days before your garden day, the day before it even opens, and the booking is guaranteed. Hand us both, or take our Shanghai & Suzhou five-day tour: its listed tickets already include Humble Administrator's Garden and the Shanghai Tower deck.", link: { label: "Hand us both", href: "/services/china-attraction-reservations/#reservation-enquiry" } },
    { id: "sales-products", type: "table", caption: "What we can take off your hands in Shanghai", columns: ["Service", "What you get", "Price"], rows: [
      ["Private guide in Shanghai", "A licensed English-speaking guide for up to 8 hours: the museum in the morning and the rest of Shanghai after; priced by the full day only", "CNY 1,200 per guide per day (CNY 1,400–1,600 in peak season)"],
      ["Attraction bookings", "The Curio-City and Digital Gallery, the People's Square exhibition, the Shanghai Tower and Humble Administrator's Garden in Suzhou, each booked in every traveller's name", "USD 7 per person per attraction, plus any ticket at face value; guaranteed when you request and pay 8 or more days ahead"],
      ["Car and driver", "Our own driver around Shanghai, or from Shanghai to Suzhou and back; any city in mainland China", "Quoted in writing before you pay; nothing charged until you accept"],
      ["Shanghai & Suzhou: 5-day private tour", "4 nights in a Ctrip 4-Diamond Shanghai hotel with breakfast, an English-speaking guide on the touring days, Zhujiajiao water town, second-class rail to Suzhou and listed adult tickets including Humble Administrator's Garden and the Shanghai Tower deck; East is not on the route, but we can adjust a Shanghai day", "From USD 620 per person for 6 travellers (USD 769 for 2)"],
    ], rowLinks: [
      "/services/private-english-speaking-guides/#shanghai",
      "/services/china-attraction-reservations/?attraction=shanghai-museum-east-experience-areas#reservation-enquiry",
      "/services/private-car-and-driver/",
      "/tours/shanghai-suzhou-5-day-private-tour/",
    ] },
    { id: "how-to-book", type: "callout", title: "How to book with us", body: "Send your dates and group size from our booking form, which opens WhatsApp or your email with the details filled in. No passport number is needed to ask. A planner replies within 12 hours, you get a written quote before you pay, and nothing is charged until you accept it. Tours are secured with a 30% deposit paid by card through a secure VBill link, and the balance is paid when you arrive. We are a licensed travel agency (licence L-BJ10587); our guides and drivers are our own, and there are no shopping stops.", tone: "neutral" },
    { id: "final-check", type: "callout", title: "The day-before check", body: "Confirm that you are going to East, that it is open on your date (not a Tuesday), that your original ID is ready, and that any experience-area booking is confirmed.", tone: "decision" },
    { id: "faq", type: "faq", title: "Shanghai Museum East questions", items: [
      { question: "Do I need to reserve Shanghai Museum East?", answer: "Not for ordinary individual entry, which is currently free without a booking. The Curio-City (古代文明探索宫) and the Digital Gallery (数字馆) each need their own advance booking." },
      { question: "Are Shanghai Museum East tickets free?", answer: "General entry is free. The two experience areas and any separately priced exhibition have their own booking, and the People's Square building is ticketed until 14 November 2027." },
      { question: "Where is the Shanghai Museum East entrance?", answer: "East is at 1952 Century Avenue, Pudong: take Metro Line 2 to Shanghai Science and Technology Museum, Exit 8. Visitors with an original valid ID enter through the B1 East Gate near Dingxiang Road." },
      { question: "Can I enter Shanghai Museum East with a passport?", answer: "Yes. Shanghai's official visitor guide says to show a valid ID, such as a passport, at the B1 East Gate. Carry the original passport." },
      { question: "Is Shanghai Museum East closed on Monday or Tuesday?", answer: "Tuesday, except national public holidays. Hours are 10:00–18:00, with last entry at 17:00." },
      { question: "How long do I need at Shanghai Museum East?", answer: "Two to three hours for one or two galleries; most of a day to see more. The museum's plans described 20 galleries and spaces in about 33,600 square metres of exhibition space." },
      { question: "Does East's free entry cover People's Square?", answer: "No. Until 14 November 2027, the People's Square building shows only a ticketed special exhibition. Its day session runs 09:00–17:00 with last entry at 15:00, and it closes on Mondays." },
    ] },
    { id: "internal-links", type: "internal-links", title: "Plan the rest of Shanghai", items: [
      { label: "Humble Administrator's Garden tickets", href: "/guides/humble-administrators-garden-tickets-entry/", description: "The Suzhou booking that opens only 7 days ahead." },
      { label: "Where to stay in Shanghai", href: "/guides/shanghai-where-to-stay-first-trip/", description: "Choose a base for the museum days and the Suzhou trip." },
      { label: "Verify a China attraction ticket", href: "/guides/official-or-reseller-china-tickets/", description: "Check which booking is actually confirmed before paying a reseller." },
    ] },
    { id: "sources", type: "sources", title: "Sources", items: [
      { label: "East visit rules: B1 east entrance, hours, Tuesday closure and separate experience reservations", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/en/service/visit-east", publisher: "Shanghai Museum", reviewedAt: "2026-09-26" },
      { label: "People's Square exhibition period and ticketed entry", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/service/visit-west", publisher: "Shanghai Museum", reviewedAt: "2026-09-26" },
      { label: "Municipal visitor guide naming passports as valid ID for East entry", url: "https://english.shanghai.gov.cn/en-MuseumsGalleries/20241205/756c96bd7dd940378b9ac056f11429e2.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-09-26" },
      { label: "Museum homepage stating that permanent galleries are free", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/index", publisher: "Shanghai Museum", reviewedAt: "2026-09-26" },
      { label: "Jiemian: East's planned 20 galleries and spaces and 33,600 m² of exhibition space (9 January 2024)", url: "https://www.jiemian.com/article/10646241.html", publisher: "Jiemian", reviewedAt: "2026-10-20" },
      { label: "Cailian Press: Humble Administrator's Garden fully booked for 2–5 October 2026 (30 September 2026)", url: "https://www.cls.cn/detail/2496370", publisher: "Cailian Press", reviewedAt: "2026-10-20" },
    ] },
  ],
};

export default body;
