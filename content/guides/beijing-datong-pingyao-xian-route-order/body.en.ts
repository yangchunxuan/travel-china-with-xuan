import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer", type: "lead",
      text: "Add both Datong and Pingyao only when each has a protected visit block and you actively want two different kinds of heritage. Choose Datong for the Yungang/Northern Wei role; choose Pingyao for the walled-city and commercial-history role. Keep neither when the extra bases leave only arrival evenings and departure mornings. The coherent order is normally Beijing → Datong → Pingyao → Xi'an, or the reverse, but the actual date and station chain must be verified before either optional stop is promised.",
    },
    {
      id: "four-way-choice", type: "table", caption: "The four honest answers", columns: ["Choice", "When it earns the route", "What it costs"],
      rows: [
        ["Datong only", "Yungang is a primary interest and one protected local block survives the dated transfer chain", "One additional base; any second excursion must not consume the only protected block"],
        ["Pingyao only", "The historic urban fabric and commercial history matter more than a cave-art stop", "One additional base; a late arrival plus early departure is not enough"],
        ["Both", "The two heritage roles are independently important and consecutive hotel changes still leave protected visits", "Two additional bases, three move legs between Beijing and Xi'an, and less recovery"],
        ["Neither", "Beijing and Xi'an hold the trip-defining priorities or the rail/hotel chain is weak", "Less thematic breadth, but more depth and a simpler recovery path"],
      ],
    },
    { id: "scope-boundary", type: "callout", tone: "neutral", title: "This is not an ancient-China checklist", body: "This guide helps you decide which of these four bases to keep or cut, and in what order. It does not provide live trains, a Shanxi sightseeing itinerary, attraction tickets, or the nationwide archaeology route." },
    { id: "roles-heading", type: "heading", level: 2, text: "Datong and Pingyao are not substitute versions of the same stop" },
    { id: "roles-context", type: "paragraph", text: "UNESCO describes Yungang as a major achievement of Buddhist cave art associated with the Northern Wei period. The Ancient City of Ping Yao is a separate World Heritage property valued for a traditional Han Chinese city form and its role in Chinese banking and commerce. Those statements explain why a traveller might want both; they do not prove that both fit the available nights, that every component is open, or that a package-tour sequence is operational on your date." },
    {
      id: "role-ledger", type: "table", caption: "What each optional base adds", columns: ["Question", "Datong answer", "Pingyao answer"],
      rows: [
        ["What is the non-replaceable core?", "Yungang's cave-temple art and Northern Wei context", "A protected walled-city environment and commercial/financial history"],
        ["What is not automatically included?", "Hanging Temple access, a guaranteed excursion or every cave interior", "Every ticketed courtyard, temple interior or evening programme"],
        ["What proves the trip value?", "A protected block for the core, not a station photo or late check-in", "Enough waking time to read the city fabric, not a sleep-only stop"],
        ["What makes it the first cut?", "Yungang is secondary to the traveller and the road/rail chain consumes the visit", "The traveller wants monuments rather than urban fabric, or only an arrival evening remains"],
      ],
    },
    { id: "sequence-heading", type: "heading", level: 2, text: "Treat the line as a sequence to verify, not a permanent timetable" },
    {
      id: "sequence-method", type: "list", ordered: true,
      items: [
        "Place Beijing and Xi'an first. They are the endpoints of this decision, not time borrowed to make the optional stops look viable.",
        "Test Beijing → Datong → Pingyao → Xi'an and the exact reverse in the official 12306 search for the travel dates. Copy the station names; a city label is not a station guarantee.",
        "For every leg, add checkout, luggage, hotel-to-station access, station process, arrival access and the next check-in before awarding local time.",
        "Mark Yungang and the exact Pingyao component as fixed or flexible. Do not write 'see Shanxi' as if it were one bookable object.",
        "If one leg requires an awkward change or destroys the only protected visit, remove that optional base before moving a core Beijing or Xi'an priority.",
      ],
    },
    { id: "hotel-heading", type: "heading", level: 2, text: "Make each added hotel prove what it unlocks" },
    { id: "hotel-rule", type: "callout", tone: "decision", title: "One night is not one visit", body: "An optional base fails when it contains only check-in, sleep, checkout and the next station. It stays only when the night unlocks a distinct evening or early start and a protected core visit survives on one side of it. Luggage storage may reduce friction, but it does not create sightseeing time." },
    {
      id: "hotel-audit", type: "table", caption: "Audit the added bases separately", columns: ["Test", "Pass", "Fail"],
      rows: [
        ["Protected core", "The named heritage priority has an uninterrupted verified block", "It depends on arrival punctuality or leaving luggage at an unconfirmed place"],
        ["Night value", "The overnight changes what can be seen or how safely the next day starts", "The same value is available without moving the hotel"],
        ["Recovery", "The following day does not require another fragile early start", "Two optional bases create consecutive alarm-clock travel"],
        ["Failure path", "A closure leaves another worthwhile local role without changing cities", "One unavailable attraction erases the reason for the base"],
      ],
    },
    { id: "traveller-heading", type: "heading", level: 2, text: "Choose by interest and tolerance, not by completion instinct" },
    {
      id: "traveller-choices", type: "comparison", title: "Who should choose what", columns: [
        { heading: "Choose Datong", items: ["Buddhist cave art or Northern Wei history is a primary interest.", "The verified station-to-Yungang chain leaves a protected visit.", "You are willing to drop an unconfirmed second excursion."] },
        { heading: "Choose Pingyao", items: ["Historic urban form and commercial history are the stronger interest.", "You want time to read streets, walls and courtyards rather than collect a photo stop.", "The stay remains useful even if one ticketed interior is unavailable."] },
        { heading: "Choose both", items: ["The two roles are independently trip-defining.", "Packing, stairs, early starts and three move legs are acceptable.", "Both bases pass the protected-block and fallback tests."] },
        { heading: "Choose neither", items: ["This is a first trip led by Beijing and Xi'an priorities.", "Mobility, children, jet lag or luggage raises the change cost.", "One or both optional bases would be sleep-only stops."] },
      ],
    },
    { id: "scenarios-heading", type: "heading", level: 2, text: "Two travellers can want the same places and make different cuts" },
    { id: "scenario-history", type: "callout", tone: "neutral", title: "A cave-art-led traveller", body: "The traveller names Yungang as a top-three reason for the trip, while Pingyao is general curiosity. Datong remains if a protected Yungang block survives. Pingyao is the first cut when adding it creates two consecutive hotel changes or leaves only an evening walk. The route still connects Beijing and Xi'an without pretending the deleted stop was a failure." },
    { id: "scenario-slow", type: "callout", tone: "warning", title: "A slower pair with heavy luggage", body: "The pair values both sites but dislikes early departures and repeated unpacking. Even if every rail leg exists, both stops can fail the human chain. They choose the role they value more and return the saved block to Beijing, Xi'an or recovery. Faster transport would not change the luggage and hotel evidence." },
    { id: "access-heading", type: "heading", level: 2, text: "Keep optional excursions optional until access is confirmed" },
    { id: "access-boundary", type: "paragraph", text: "Do not let the Hanging Temple silently become the proof that Datong needs another night. Its access, road conditions, capacity and temporary restrictions are dated facts. Likewise, the Pingyao World Heritage inscription does not guarantee that a particular courtyard, temple, performance or ticketed compound is open. Confirm the exact operator and date; otherwise write the route around the stable heritage role and preserve a fallback." },
    {
      id: "fallback-list", type: "list", items: [
        "If Yungang is temporarily unavailable, retain Datong only when another verified priority still justifies the base; otherwise remove the stop.",
        "If one Pingyao interior is closed, switch to an evidence-led reading of the public historic fabric only if current access allows it.",
        "If a direct-looking rail leg disappears, test a safe connection without placing a visit after it; drop the weaker stop if the chain becomes fragile.",
        "If luggage or energy changes, keep the current hotel and cancel the optional extension before changing every later booking.",
      ],
    },
    { id: "recovery-heading", type: "heading", level: 2, text: "Repair the weakest optional base first" },
    {
      id: "recovery-table", type: "table", caption: "Failure recovery order", columns: ["Failure", "First repair", "Do not do this"],
      rows: [
        ["One optional visit cannot be confirmed", "Use the named fallback or remove that base", "Steal the only protected day from Beijing or Xi'an"],
        ["A leg uses another station or connection", "Recalculate the entire hotel-to-hotel chain", "Preserve a timed visit using the old station assumption"],
        ["The first optional stop runs late", "Drop its evening and protect sleep", "Carry the delay into another early departure"],
        ["Both bases feel too similar to the traveller", "Keep the one with the clearer non-replaceable role", "Visit both merely because they appear in a tour product"],
      ],
    },
    { id: "verification-heading", type: "heading", level: 2, text: "Final verification turns the four-city idea into a real route" },
    {
      id: "verification-table", type: "table", caption: "Fields to close before non-refundable commitments", columns: ["Field", "Primary source", "Route consequence if still unknown"],
      rows: [
        ["Exact dated train and station pair for all three legs", "China Railway 12306", "Keep transfer days empty and do not promise the four-base line"],
        ["Yungang opening, reservation and temporary notice", "Yungang official channel", "Datong remains conditional"],
        ["Exact Pingyao components and current access", "Named official venue or local authority", "Promise no interior or performance"],
        ["Hotel luggage, check-in and cancellation terms", "Booked hotel", "Count the full hotel-change friction"],
        ["Public holiday and traveller pace", "Official calendar plus the travellers' constraints", "Add recovery or remove the weaker optional base"],
      ],
    },
    { id: "editorial-judgment", type: "callout", tone: "warning", title: "Homeground editorial judgment", body: "The protected-block, sleep-only-stop and weakest-base tests are conservative planning judgments. UNESCO and official operators establish heritage and current access facts; they do not certify that a four-base route suits a particular traveller." },
    { id: "help-cta", type: "callout", tone: "decision", title: "Need a human cut decision?", body: "Leave your dates, number of travellers, rough budget, luggage and the one Shanxi site you would regret missing. Homeground can help test which optional base survives without manufacturing a complete personal itinerary." },
    {
      id: "internal-links", type: "internal-links", title: "Continue planning", items: [
        { label: "First Trip to China Planner", href: "/plan/", description: "Return to the parent planning path." },
        { label: "Check whether the itinerary is too rushed", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Audit the full trip after deciding which Shanxi bases survive." },
        { label: "Choose one hub or multiple bases", href: "/guides/china-hub-and-spoke-or-multi-base-route/", description: "Compare the hotel-change architecture before ticket execution." },
        { label: "Prepare for a first high-speed train", href: "/guides/china-high-speed-train-first-time-guide/", description: "Handle passenger and station procedure after the route is fixed." },
      ],
    },
    {
      id: "sources", type: "sources", title: "Official and primary sources reviewed", items: [
        { label: "Date-specific railway search", url: "https://www.12306.cn/en/left-ticket.html", publisher: "China Railway 12306", reviewedAt: "2026-09-01" },
        { label: "Yungang Grottoes World Heritage record", url: "https://whc.unesco.org/en/list/1039/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-09-01" },
        { label: "Ancient City of Ping Yao World Heritage record", url: "https://whc.unesco.org/en/list/812/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-09-01" },
        { label: "Yungang Grottoes official visitor channel", url: "https://www.yungang.org/", publisher: "Yungang Grottoes", reviewedAt: "2026-09-01" },
        { label: "Yungang 2026 reservation notice", url: "https://www.dt.gov.cn/dt12345/rxdt1/202604/29b73c0aa08148e3baca536eb7166bb9.shtml", publisher: "Datong Municipal People's Government", reviewedAt: "2026-09-01" },
        { label: "Pingyao Ancient City official visitor portal", url: "https://pingyao888.cn/", publisher: "Pingyao Ancient City Scenic Area", reviewedAt: "2026-09-01" },
        { label: "Hanging Temple overview", url: "https://www.hunyuan.gov.cn/hyxrmzfz/sqgllssy/202307/c225082439fa4738b9b0d9e645b96483.shtml", publisher: "Hunyuan County People's Government", reviewedAt: "2026-09-01" },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
