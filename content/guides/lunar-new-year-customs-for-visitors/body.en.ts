import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Spring Festival is simultaneously a family season, a public cultural season and a national transport operation. Chunyun—the separately announced Spring Festival travel period—starts before the public-holiday break and continues after it. Travellers therefore need two plans: one for moving through a high-demand transport system, and one for participating respectfully in customs that may be public, communal, invitation-only or entirely private."
    },
    {
      id: "direct-answer",
      type: "callout",
      tone: "decision",
      title: "The visitor’s short answer",
      body: "Use the annual public-holiday calendar for official dates and compensatory workdays; verify current Chunyun transport and venue notices separately. Attend clearly public programmes without pretending they reproduce a household celebration. Treat reunion meals, home visits, ancestor remembrance and red-envelope exchanges as family practices unless a host explicitly includes you. A festival can be culturally important without being a tourist product."
    },
    {
      id: "two-systems-heading",
      type: "heading",
      level: 2,
      text: "Do not collapse Chunyun and Spring Festival into one thing"
    },
    {
      id: "two-systems",
      type: "table",
      caption: "Two overlapping systems create different planning questions",
      columns: ["Layer", "What it is", "What a visitor must decide"],
      rows: [
        ["Chunyun", "A government-coordinated transport period covering road, rail, civil aviation and water transport around Spring Festival", "Whether the intercity move is necessary, bookable and recoverable"],
        ["Spring Festival customs", "Living practices expressed through families, communities, institutions and public programmes", "Whether an activity is public, hosted or private—and what permission is needed"],
        ["Public-holiday arrangement", "Official days off and any compensatory workdays announced for that calendar year", "Which dates may change transport, crowds, offices and opening patterns"],
        ["Household schedule", "A family’s own reunion, visits, work, travel and rest", "Whether an invitation includes the guest, which part of the day and what expectations apply"]
      ]
    },
    {
      id: "calendar-owner",
      type: "callout",
      tone: "warning",
      title: "The dates live on one annual owner page",
      body: "This guide deliberately does not repeat a 2026 holiday table or predict a future year. Official holiday dates, compensatory workdays and the current crowd calendar belong to the China public-holidays guide. Until the State Council and relevant transport authorities publish the next arrangements, those details are not yet published—not an invitation to copy last year."
    },
    {
      id: "four-clocks-heading",
      type: "heading",
      level: 2,
      text: "Plan against four clocks"
    },
    {
      id: "four-clocks",
      type: "table",
      caption: "A date can be ordinary on one clock and fragile on another",
      columns: ["Clock", "Authoritative check", "Planning consequence"],
      rows: [
        ["Official holiday", "The annual State Council arrangement", "Public offices, domestic travel demand and venue patterns may change"],
        ["Chunyun", "That year’s transport-authority plan and operator notices", "Demand and operating measures can extend beyond the holiday itself"],
        ["Venue or business", "The named organiser, museum, temple fair, market or restaurant", "A public event or meal service may run on only selected dates and times"],
        ["Family", "The host, not a generic etiquette article", "Reunion time, gifts, food, photography and overnight arrangements vary by household"]
      ]
    },
    {
      id: "flow-heading",
      type: "heading",
      level: 2,
      text: "Return-home travel is central, but the flow is not one-way"
    },
    {
      id: "flow-patterns",
      type: "paragraph",
      text: "The familiar pattern is movement from places of work or study towards hometowns before the festival, followed by a return. It is not the only pattern. Peer-reviewed research documents reverse reunion, in which relatives travel to the migrant’s city, and official transport reporting also distinguishes family visits, tourism, self-driving and other flows. Do not assume every large city empties, every rural destination fills in the same way or every traveller is going home. Test the exact corridor and date."
    },
    {
      id: "count-boundary",
      type: "callout",
      tone: "warning",
      title: "A movement count is not a headcount—or an absolute world record",
      body: "Official Spring Festival transport statistics may report cross-regional movements, passenger journeys or vehicle movements across multiple modes. One person can generate several counted legs. Academic writers often describe Chunyun as one of the world’s largest recurring seasonal mobility events, but comparisons depend on definitions and datasets. This page does not turn a journey total into a count of unique people or claim an uncontested global record."
    },
    {
      id: "scenario-one-heading",
      type: "heading",
      level: 2,
      text: "Scenario 1: travelling during Chunyun without a family invitation"
    },
    {
      id: "scenario-one",
      type: "callout",
      tone: "neutral",
      title: "Protect the journey; choose public culture",
      body: "Two first-time visitors need one intercity rail trip near Spring Festival. They have no local family host. They reduce the route to the necessary move, check the official railway channel when sales and current services are available, and keep a later or alternative connection that still preserves their hotel. For culture, they select an officially announced museum programme or community performance. They do not buy an invented ‘authentic family reunion’ or ask a guide to obtain access to a private home."
    },
    {
      id: "mobility-planning",
      type: "list",
      ordered: true,
      items: [
        "Check the annual holiday owner page, then the separately announced Chunyun period; do not assume their boundaries match.",
        "Remove optional hotel changes and backtracking before competing for scarce transport. The easiest recovery is a move the route no longer needs.",
        "Search the exact station or airport pair and passenger-document rules through the official operator close to booking.",
        "Keep the first post-arrival activity replaceable. A transport arrival during a high-demand period is not a guaranteed sightseeing half-day.",
        "Save the booking record, Chinese station or airport name, hotel address and a lawful last-mile fallback offline.",
        "Recheck weather, operator notices and local transport before departure; a confirmed long-distance ticket does not guarantee the last connection."
      ]
    },
    {
      id: "rail-waitlist",
      type: "paragraph",
      text: "China Railway’s official waitlist is a real fulfilment mechanism, not a reserved seat. The system continues trying until the selected cutoff; an unfulfilled or ended request is refunded under the published process. Keep the route viable if it never clears. Do not let a waitlist request silently carry a non-refundable hotel, timed attraction and onward flight."
    },
    {
      id: "family-boundary-heading",
      type: "heading",
      level: 2,
      text: "Separate public celebration from family permission"
    },
    {
      id: "public-private",
      type: "table",
      caption: "The setting—not the label ‘Spring Festival’—decides access",
      columns: ["Setting", "Visitor position", "Evidence before joining"],
      rows: [
        ["Official museum, fair or ticketed performance", "Member of the public under the organiser’s rules", "Current notice, admission, hours, capacity and photography policy"],
        ["Community activity open to visitors", "Guest in a living local setting", "Named organiser, public invitation and conduct rules"],
        ["Restaurant’s public festive menu", "Customer, not participant in a household reunion", "Current booking, dietary fit, portion and service time"],
        ["Friend’s or partner’s family meal", "Invited guest whose access has limits", "Direct host invitation, timing, who knows you are coming and whether photos are welcome"],
        ["Home visit, ancestor remembrance or kin gift exchange", "Private unless the family says otherwise", "Specific permission from the people involved; silence is not consent"]
      ]
    },
    {
      id: "custom-variation",
      type: "paragraph",
      text: "UNESCO’s heritage description names widespread practices such as preparing homes and food, reunion dining, greetings and public festivities. It is a description of living heritage, not a compulsory national checklist. Customs differ by region, generation, religion, migration history and household circumstance. Some families work, travel, order food, meet on another day or do not perform a practice at all. Respecting Spring Festival includes allowing that variation."
    },
    {
      id: "scenario-two",
      type: "callout",
      tone: "neutral",
      title: "Scenario 2: invited to a friend’s family home",
      body: "A solo visitor receives a genuine invitation. They ask the host—not the internet—when to arrive, whether the invitation includes dinner and overnight stay, whether a small gift is appropriate, what food restrictions can realistically be handled and whether anyone objects to photographs. They do not film children, money or ancestor-related practices by default. If the family plan changes, the visitor accepts a public meal or event instead of asking the host to recreate the ritual."
    },
    {
      id: "invited-questions",
      type: "list",
      ordered: false,
      items: [
        "What time should I arrive and leave, and who in the household has agreed to the visit?",
        "Is this an invitation to one meal, a longer visit or an overnight stay?",
        "Would a modest gift help, and are there food, alcohol or household preferences to avoid?",
        "Should I prepare my dietary restriction in Chinese, and is a separate backup meal kinder to the host?",
        "May I photograph people, food or decorations? Ask again before recording a prayer, offering, child or red-envelope exchange.",
        "If plans change, what nearby public meeting point lets everyone exit without embarrassment?"
      ]
    },
    {
      id: "consent-boundary",
      type: "callout",
      tone: "decision",
      title: "Invitation is specific, not transferable",
      body: "An invitation from one friend does not automatically include companions, a camera, social-media publication or every family activity. Ask before bringing another person and before publishing identifiable material. The respectful fallback is smaller participation, not a demand for more ‘authentic’ access."
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "Recover without turning pressure into someone else’s problem"
    },
    {
      id: "failure-table",
      type: "table",
      caption: "Common failure and a respectful recovery",
      columns: ["Failure", "Do first", "Do not do"],
      rows: [
        ["Preferred train remains unavailable", "Use the pre-approved alternative date, route or mode—or cut the optional move", "Assume a waitlist must clear or buy an unsafe unofficial promise"],
        ["Public event changes or reaches capacity", "Use another officially open public programme or an ordinary flexible day", "Pressure staff or enter a controlled area"],
        ["Restaurant or small business closes", "Use the saved simple meal and verify another current venue", "Treat family-owned holiday closure as poor service"],
        ["Family invitation changes", "Thank the host and move to the public fallback", "Ask for a staged meal because travel plans were built around it"],
        ["The visitor is unsure whether a moment is private", "Put the phone away and ask quietly later", "Record first and seek permission afterwards"]
      ]
    },
    {
      id: "final-verify-heading",
      type: "heading",
      level: 2,
      text: "Final verification"
    },
    {
      id: "final-verification",
      type: "list",
      ordered: false,
      items: [
        "Official holiday dates and compensatory workdays come from the current annual owner page.",
        "The current Chunyun period and any special transport measures come from transport authorities or the named operator.",
        "Every necessary intercity move has a viable failure path; waitlist fulfilment is not assumed.",
        "Every public event has a named organiser, current date, access rule and cancellation check.",
        "Every family activity rests on a direct, specific invitation rather than a tour label or cultural stereotype.",
        "Photography, companions, food needs and departure time have been discussed with the host.",
        "No passenger-journey statistic is described as a unique-person count or uncontested global record."
      ]
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "What this guide owns",
      body: "This page explains how Chunyun mobility and Spring Festival’s public and family layers interact. It does not own annual holiday dates, compensatory workdays, a live ticket forecast, a national custom checklist or access to a private family celebration."
    },
    {
      id: "help-cta",
      type: "callout",
      tone: "decision",
      title: "Need a human check?",
      body: "Send your dates, group size and approximate budget. Homeground can help identify which moves need current verification and which festival plans need a public fallback."
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning",
      items: [
        { "label": "Browse China culture guides", "href": "/culture/", "description": "Keep living practices connected to their communities and current settings." },
        { "label": "Check China’s public-holiday travel calendar", "href": "/guides/china-public-holidays-travel-calendar/", "description": "Use the official annual dates and compensatory workdays owner." },
        { "label": "Prepare for a first high-speed train", "href": "/guides/china-high-speed-train-first-time-guide/", "description": "Handle passenger records, stations and boarding after choosing the route." },
        { "label": "Prepare for a first shared meal", "href": "/guides/first-shared-meal-in-china/", "description": "Understand ordinary ordering and sharing without treating a family reunion as a restaurant experience." }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources and evidence",
      items: [
        { "label": "Spring Festival social practices", "url": "https://ich.unesco.org/en/RL/spring-festival-social-practices-of-the-chinese-people-in-celebration-of-traditional-new-year-02126", "publisher": "UNESCO Intangible Cultural Heritage", "reviewedAt": "2026-08-13" },
        { "label": "2026 integrated Chunyun plan", "url": "https://xxgk.mot.gov.cn/2020/jigou/ysfws/202601/t20260124_4198706.html", "publisher": "Ministry of Transport of the People’s Republic of China", "reviewedAt": "2026-08-13" },
        { "label": "China Railway waitlist FAQ", "url": "https://kyfw.12306.cn/otn/gonggao/alternate.html", "publisher": "China Railway 12306", "reviewedAt": "2026-08-13" },
        { "label": "Maintaining Ties and Reaffirming Unity: Family Rituals in the Age of Migration", "url": "https://www.tandfonline.com/doi/full/10.1080/15267431.2018.1475391", "publisher": "Journal of Family Communication", "reviewedAt": "2026-08-13" },
        { "label": "Reverse traffic flows during the Spring Festival travel rush", "url": "https://journals.sagepub.com/doi/10.1177/0308518X19860537", "publisher": "Environment and Planning A", "reviewedAt": "2026-08-13" },
        { "label": "Hero image: Guangzhou South Chunyun waiting hall by 小溪Yang, CC BY 2.5; cropped and resized", "url": "https://commons.wikimedia.org/wiki/File:Crowded_People_during_Chunyun,_Guangzhounan_Railway_Station,_China_Railway_20200121.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
