import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "There is no nationwide grace period that rescues a missed timed-entry slot in China. Every venue writes its own clock, and the differences are sharp: one palace museum lets a morning ticket die at noon, another national museum refuses entry to anyone outside their window entirely, and some venues do not publish their late-arrival rule at all. Recovery runs on two tracks. If you know in advance you will be late, act through official channels while cancellation windows are open. If the slot is already gone when you reach the gate, take your ID and order to the correct entrance's service desk, ask what same-day options exist, record the answer, and move to plan B without arguing your way into deeper trouble.",
    },
    {
      id: "first-steps-heading",
      type: "heading",
      level: 2,
      text: "Six moves that work on either track",
    },
    {
      id: "first-steps-list",
      type: "list",
      ordered: true,
      items: [
        "Open the venue's official mini-program or website and read your order's exact fields: date, time window, last admission time, holder name, document type, assigned entrance.",
        "Find that venue's own written rules on late arrivals, expired slots, refunds and no-show penalties - not a blog summary of them.",
        "If you know in advance that you will be late, run the official cancel or reschedule flow first; at several venues acting before a stated cutoff avoids penalties entirely.",
        "If you are already late, go to the correct entrance or its service desk - not just any queue - carrying the passport used for booking.",
        "Ask three precise questions: can this order still enter today; is there any same-day standby or rebooking capacity; if not, what is the official route to recover the fee.",
        "Record every answer with screenshots, names and times, then pivot to an alternative sight while there is still daylight left.",
      ],
    },
    {
      id: "path-a-heading",
      type: "heading",
      level: 2,
      text: "Path A: you know in advance that you will be late",
    },
    {
      id: "path-a-list",
      type: "list",
      ordered: true,
      items: [
        "Check whether your venue distinguishes cancelling from rescheduling. Some systems only sell and refund; rebooking means cancelling (possibly with penalty) and buying again into whatever capacity remains.",
        "Read every cutoff in the venue's rules. Penalties often flip exactly at boundaries like 'the day before', 'the same morning' or a fixed hour such as noon - the same cancellation can be free on Monday and costly on Tuesday.",
        "Cancel early where allowed: at many real-name venues an unused ticket cancelled before the deadline does not count against you, while the identical cancellation after the cutoff burns one strike toward a booking ban.",
        "If same-day refunds stay open until evening, waiting costs nothing - but set an alarm, because once that hour passes nothing is recoverable.",
        "Only after the paperwork settles should you decide whether another day here or a different sight fits the rest of your itinerary.",
      ],
    },
    {
      id: "path-b-heading",
      type: "heading",
      level: 2,
      text: "Path B: the slot is already gone when you reach the gate",
    },
    {
      id: "path-b-list",
      type: "list",
      ordered: true,
      items: [
        "Confirm you are at the right entrance for your ticket type; large museums and palace complexes route different audiences to different gates.",
        "Walk to the service desk or visitor centre rather than arguing with queue staff. Present the passport used for the reservation and show the order page with its time window.",
        "Ask the three questions from above and accept the answer you get. Desk systems can see things your phone cannot: whether the gate reads your slot as expired, whether standby lines exist, what the day's capacity looks like.",
        "If same-day recovery is refused, ask specifically how to cancel-and-rebook or refund under the venue's published rules before leaving the desk.",
        "Log the outcome: time, desk location, what was said, any reference given. This protects you if the order later shows odd states.",
        "Activate plan B while energy lasts - a nearby sight with walk-up capacity beats standing in a doorway hoping for mercy.",
      ],
    },
    {
      id: "card-heading",
      type: "heading",
      level: 2,
      text: "The venue-rule verification card",
    },
    {
      id: "card-table",
      type: "table",
      caption: "Nine fields to check before deciding anything",
      columns: ["Field", "What to confirm"],
      rows: [
        ["Visit date", "The calendar day your order covers, in venue local time."],
        ["Entry window", "Your assigned slot (morning/afternoon or hourly) exactly as booked."],
        ["Last admission", "The latest minute your slot still admits - this is the number that matters."],
        ["Reservation holder", "Name spelled exactly as on the passport used to book."],
        ["Document type", "Which ID the venue accepted at booking; bring that original document."],
        ["Correct entrance", "Large complexes assign entrances by audience type; go where YOUR order points."],
        ["Official late policy", "The venue's written rule on arriving outside your window - quote it, do not paraphrase it."],
        ["Reschedule policy", "Whether change exists at all, its cutoff, and whether it counts as a strike."],
        ["Service contact", "Official hotline or service-desk location, saved before you need it."],
      ],
    },
    {
      id: "nograce-heading",
      type: "heading",
      level: 2,
      text: "No fixed grace period exists - treat every minute as venue-specific",
    },
    {
      id: "nograce-p1",
      "type": "paragraph",
      text: "No national regulation grants visitors a universal buffer after their timed-entry slot expires. Whatever minutes you have heard about - ten, fifteen, thirty - belong to one venue's rule version at one moment in time, verified by whoever told you. Before relying on any grace figure, bind it to all four anchors: the specific venue, the specific rule document or notice, the official source URL, and the date you verified it. Rules also move: venues adjust admission windows seasonally and during peak periods, so yesterday's screenshot proves nothing about today's gate. The only safe assumptions are the ones printed by the venue itself, checked the same week you visit.",
    },
    {
      id: "nograce-callout",
      type: "callout",
      title: "What the official systems actually say",
      body: "At the Palace Museum, the gate system marks a late morning-slot holder as expired and an early afternoon-slot holder as not yet valid - the software enforces the boundary, not a guard's mood. At the National Museum, entry outside your reserved window is simply denied. At Shaanxi History Museum, both early and late arrivals outside the slot cannot enter. None of these offer a walk-up negotiation lane for foreigners or anyone else; what differs is what happens to your money afterwards.",
      tone: "warning",
    },
    {
      id: "sequence-heading",
      type: "heading",
      level: 2,
      text: "The legitimate recovery sequence",
    },
    {
      id: "sequence-list",
      type: "list",
      ordered: true,
      items: [
        "Check the official order status first - expired, unused, cancelled or refunded each lead somewhere different.",
        "Contact official customer service through the venue's own hotline or mini-program chat; save the conversation.",
        "Go to the correct entrance or service desk in person if phone channels stall - desks resolve edge cases phones cannot see.",
        "Ask about same-day standby or rebooking capacity; accept that popular venues may honestly have none.",
        "Record the outcome in writing before you leave the counter or close the chat.",
        "Start the alternative plan - another sight, another museum with walk-up capacity, or a rest afternoon that protects tomorrow's schedule.",
      ],
    },
    {
      id: "patterns-heading",
      type: "heading",
      level: 2,
      text: "Three official rule patterns (and one honest gap)",
    },
    {
      id: "patterns-table",
      type: "table",
      caption: "How differently major real-name venues treat missed windows",
      columns: ["Venue", "Published rule pattern", "Money side"],
      rows: [
        ["Palace Museum (Forbidden City)", "Two daily slots: morning tickets admit no later than 12:00; afternoon tickets from 11:00. Gate shows expired or not yet valid accordingly.", "Unused tickets refunded via original channel before previous-day midnight carry no penalty; same-day refunds until 20:00 count as one no-show strike. Three strikes within 180 days block bookings for 60 days; refunds return within five working days."],
        ["National Museum of China", "Entry requires your reserved slot; arriving outside it means denial of entry, with no grace window published.", "Same-day cancellations have an afternoon cutoff; repeated failures accumulate into temporary booking bans."],
        ["Shaanxi History Museum", "Tickets are valid only for the exact reserved session - earlier AND later arrivals are both refused entry.", "Refunds must be completed via the official platform before your session's stop-check time; missing that turns the booking into a recorded no-show with a long rebooking ban."],
        ["Terracotta Warriors Museum", "No explicit missed-window policy published in its public booking materials - punctuality advised, but the consequence of lateness is not written down.", "Refunds handled before ticket validation per general terms; treat any rumoured late-entry tolerance as unverified."],
      ],
    },
    {
      id: "patterns-callout",
      type: "callout",
      title: "Rules move; verify the same week you travel",
      body: "Every pattern above was read from the venues' official pages in August 2026. Admission windows shift between seasons and holiday periods, and venues revise notices without announcement. The numbers in this table describe how the systems behave, not entitlements you can argue at a gate. Always re-read your own order page on the morning of the visit.",
      tone: "neutral",
    },
    {
      id: "strikes-heading",
      type: "heading",
      level: 2,
      text: "When slips start to accumulate: strikes and booking bans",
    },
    {
      id: "strikes-p1",
      type: "paragraph",
      text: "Real-name venues increasingly track no-shows against your passport number, and the arithmetic can be harsher than the entry rule itself. At the Palace Museum, three no-shows within 180 days lock out bookings for the following 60 days - and because the ban binds your document number, it follows you across devices and across trips. A same-day refund that arrives late, a forgotten reservation during a rainstorm, and an expired slot you forgot to cancel can quietly become three strikes. Keep a simple note of every timed booking you hold, set alarms one hour before each cancellation deadline, and when a trip collapses, walk the cancellation list deliberately instead of letting it walk you. If you already carry strikes, prioritise venues without penalty ladders until they expire - and read each venue's ban length before assuming it matches another's. Ten careful minutes spent reading rules at booking time cost far less than one careless strike at the gate.",
    },
    {
      id: "never-heading",
      type: "heading",
      level: 2,
      text: "Five shortcuts that cost more than they save",
    },
    {
      id: "never-list",
      type: "list",
      items: [
        "Never borrow another person's ID or lend yours - real-name checks match faces, and mismatches end with confiscation and possible blacklisting.",
        "Do not climb barriers or follow strangers through exit lanes; that is trespassing, and venues prosecute it.",
        "Do not buy scalper tickets or 'guaranteed entry' offers outside official channels - many are forged orders that fail at the turnstile, and you lose the dispute trail.",
        "Do not edit screenshots of your order; altered records are fraud, and staff see them weekly.",
        "Do not harass gate staff or demand exceptions loudly - the system will not blink, and the scene costs you the goodwill that occasionally unlocks real options.",
      ],
    },
    {
      id: "boundary-heading",
      "type": "heading",
      "level": 2,
      "text": "Boundaries of this page",
    },
    {
      id: "boundary-list",
      type: "list",
      items: [
        "This page handles missed slots for valid, correctly-named bookings; wrong-name, wrong-date and closure problems live in their own guides.",
        "It is not a full museum-booking tutorial - venue-specific booking walkthroughs exist elsewhere on this site.",
        "No promise of entry, refund or same-day capacity anywhere here; outcomes depend on each venue's current rules and live capacity.",
        "All quoted minute-level rules were verified in August 2026 and must be re-checked on publication day.",
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Related booking guides",
      items: [
        { "label": "National Museum of China booking and route", "href": "/guides/national-museum-of-china-booking-and-route/", "description": "Book the museum right so the slot never slips." },
        { "label": "Shaanxi History Museum booking and collection plan", "href": "/guides/shaanxi-history-museum-booking-and-collection-plan/", "description": "Session-valid tickets deserve careful timing plans." },
        { "label": "Sanxingdui Museum booking and gallery order", "href": "/guides/sanxingdui-museum-booking-and-gallery-order/", "description": "Another timed venue with its own rhythm." },
        { "label": "Forbidden City for foreign visitors", "href": "/guides/forbidden-city-for-foreign-visitors/", "description": "Passport-based booking and entry mechanics explained." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Primary sources reviewed",
      items: [
        { "label": "Palace Museum ticketing policy: two slots, AM latest 12:00 / PM from 11:00; refund and no-show strike ladder", "url": "https://ticket.dpm.org.cn/", "publisher": "故宫博物院 (Palace Museum)", "reviewedAt": "2026-08-23" },
        { "label": "Palace Museum announcement on optimized timed-slot admission (23 Oct 2023)", "url": "https://www.dpm.org.cn/announce_detail/261778.html", "publisher": "故宫博物院 (Palace Museum)", "reviewedAt": "2026-08-23" },
        { "label": "National Museum of China reservation information pages", "url": "https://www.chnmuseum.cn/zl/ylxx/", "publisher": "中国国家博物馆 (National Museum of China)", "reviewedAt": "2026-08-22" },
        { "label": "Shaanxi History Museum visiting guide (session validity; stop-check times; no-show consequences)", "url": "https://www.sxhm.com/guide.html", "publisher": "陕西历史博物馆 (Shaanxi History Museum)", "reviewedAt": "2026-08-23" },
      ],
    },
  ],
};

export default body;


