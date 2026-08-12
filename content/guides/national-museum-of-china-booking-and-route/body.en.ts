import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "Treat the National Museum of China as a booked museum visit, not as a casual add-on to Tiananmen Square. Reserve the free basic admission with the identity document you will carry, arrive for the selected window, and use the North Gate visitor entrance. Inside, choose one anchor exhibition and at most one second theme. The building is too large for a useful ‘see everything’ plan, and a confirmed museum reservation does not automatically create a reservation for every separately managed site around Tiananmen Square." },
    { id: "booking-heading", type: "heading", level: 2, text: "Book the museum itself" },
    { id: "booking-rules", type: "table", caption: "Current National Museum rules checked on 12 August 2026", columns: ["Step", "Official rule", "Planning consequence"], rows: [
      ["Reservation", "Free basic admission can be reserved through the museum's official website and official WeChat channels within seven days of the visit.", "Use the museum's own English reservation page rather than a search advertisement or an unrelated Tiananmen service."],
      ["Release", "New inventory is released daily at 17:00 Beijing time; the museum divides entry into three time windows.", "For a fixed Beijing day, be ready at release rather than assuming same-day entry."],
      ["Identity", "A valid identity document is required for real-name booking and the original booked document must be shown at entry.", "Enter passport details exactly as printed and carry that same original passport."],
      ["Entrance", "Booked visitors enter through the North Gate visitor entrance during their reserved window.", "Do not navigate to the ceremonial west facade shown in many photographs as if it were the public entrance."],
      ["Weekly closure", "The museum normally closes on Mondays, except when an official national-holiday notice says otherwise.", "A holiday Monday is not a guess: read the dated museum notice for that week."],
    ] },
    { id: "separate-systems", type: "callout", title: "Do not merge the museum and Tiananmen into one booking", body: "The National Museum controls its own reservation and North Gate entry. Tiananmen Square and nearby monuments can use separate access rules and security arrangements. A museum confirmation proves only the museum booking stated on it. Check any other place on its own official channel and allow for security routing around the square.", tone: "warning" },
    { id: "time-heading", type: "heading", level: 2, text: "Choose the visit length before choosing galleries" },
    { id: "time-options", type: "comparison", columns: [
      { heading: "About two hours", body: "Choose one anchor: the Ancient China basic exhibition or a current special exhibition that matters more to you. Add time for security, orientation and the walk back to the exit; do not bolt on another major museum." },
      { heading: "About three hours", body: "Use one long anchor exhibition, a real break, then one compact second section. This is the most balanced first-visit plan for travellers who also have a Beijing afternoon or evening commitment." },
      { heading: "Four hours or more", body: "Add a second substantial theme only if museum time is a priority. Fatigue and distance inside the building, not just closing time, become the constraint." },
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "A route that works without pretending the building is small" },
    { id: "route-list", type: "list", items: [
      "After security, orient yourself with the current floor plan before walking toward a famous object seen online. Temporary exhibitions and room access change.",
      "For a chronological foundation, make the Ancient China basic exhibition your anchor. Read the introduction and period transitions; do not try to study every case.",
      "Choose three object stops in advance—one early-civilisation object, one imperial-period group and one item connected to a city already on your itinerary.",
      "Take a seated break before the second theme. A ten-minute reset usually protects more attention than another rushed gallery.",
      "Use the remaining time for one current exhibition or one modern-history section, then start the exit walk with a buffer rather than at the published closing minute.",
    ] },
    { id: "paid-exhibitions", type: "callout", title: "Free museum entry and paid exhibitions are not the same product", body: "The basic visit is free with reservation, but a current special exhibition may have its own price and purchase rules. Read the specific exhibition notice. Never assume a paid exhibition ticket is required for the basic museum, or that a basic reservation includes every temporary show.", tone: "neutral" },
    { id: "hours-heading", type: "heading", level: 2, text: "What changes with season and special dates" },
    { id: "hours", type: "paragraph", text: "The standing rule is 09:00–17:00 with last admission at 16:00. From 1 June to 31 October, the museum currently extends closing to 17:30 and last admission to 16:30. A dated notice can override the Monday closure or adjust a holiday day. Those are 2026 facts checked for this draft, not a guarantee for a later trip; reopen the official Visit page and latest notices before relying on them." },
    { id: "practical-heading", type: "heading", level: 2, text: "Small decisions that prevent a wasted reservation" },
    { id: "practical", type: "list", items: [
      "Save the successful reservation message offline and keep every traveller's original booked document accessible.",
      "Use the reserved time window as the arrival instruction, not the time to leave the hotel.",
      "Pack lightly. Security and the cloakroom are operational steps, and the museum restricts items such as selfie sticks and tripods in exhibition areas.",
      "If travelling with someone aged 60 or above, the official priority lane still requires a reservation, the booked original document and proof of eligibility.",
      "Cancel by the official deadline when plans change. The museum limits booking frequency and applies restrictions after repeated no-shows.",
    ] },
    { id: "final-check", type: "callout", title: "The night-before check", body: "Confirm the reservation date and window, passport spelling, North Gate, current opening notice and the one anchor exhibition you will actually prioritise. If those five items are clear, the museum becomes manageable; if they are not, adding more gallery names will not fix the day.", tone: "decision" },
    { id: "internal-links", type: "internal-links", title: "Fit the museum into Beijing", items: [
      { label: "Where to stay in Beijing on a first trip", href: "/guides/beijing-where-to-stay-first-trip/", description: "Choose a hotel area by the rest of the itinerary rather than by one landmark alone." },
      { label: "Forbidden City for foreign visitors", href: "/guides/forbidden-city-for-foreign-visitors/", description: "Keep the Palace Museum's ticket and entrance workflow separate from the National Museum booking." },
      { label: "China with older parents", href: "/guides/china-itinerary-with-older-parents/", description: "Balance a large indoor museum with realistic walking and recovery time." },
      { label: "Is your China itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Protect attention instead of stacking major Beijing sights into one exhausted day." },
    ] },
    { id: "consultation", type: "callout", title: "Need a Beijing day checked as one sequence?", body: "If the museum must sit beside another timed booking, an older traveller's pace or a same-day station transfer, a Homeground travel consultant can review the actual order and buffers. Bring the confirmed booking windows and hotel area; the useful answer depends on them.", tone: "neutral" },
    { id: "sources", type: "sources", title: "Official and image sources reviewed", items: [
      { label: "Visit: opening hours, reservation windows, North Gate and entry rules", url: "https://en.chnmuseum.cn/visit_692/", publisher: "National Museum of China", reviewedAt: "2026-08-12" },
      { label: "Official English reservation system", url: "https://pcticket.chnmuseum.cn/museum-en/", publisher: "National Museum of China", reviewedAt: "2026-08-12" },
      { label: "Temporary opening notice showing how dated notices override the standing calendar", url: "https://en.chnmuseum.cn/home_527/news/202607/t20260723_280196.html", publisher: "National Museum of China", reviewedAt: "2026-08-12" },
      { label: "Hero: National Museum west facade by Daniel Case, CC BY-SA 3.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:National_Museum_of_China_west_facade,_straight_view.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    ] },
  ],
};

export default body;
