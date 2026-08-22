import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "You booked, paid, maybe reserved a time slot - and the attraction is closed. Before refunding anything or rewriting your route, confirm the closure through official channels, identify who sold you the ticket, and let each order's own terms decide refunds and rescheduling. Operator-run closures normally come with instructions (recent examples range from 'refund via your original channel' to silent reopen-later notices), platforms must assist you under China's online-travel rules, but hotels, trains and separate tickets are independent contracts that do not free-cancel just because one sight shut its gate.",
    },
    {
      id: "first-steps-heading",
      type: "heading",
      level: 2,
      text: "Six things to do in the first thirty minutes",
    },
    {
      id: "first-steps-list",
      type: "list",
      ordered: true,
      items: [
        "Confirm what is actually closed: the whole site, one peak or gallery, one cableway, or just the entrance you planned to use.",
        "Check the attraction's own announcement channels first - its website notice board and verified social account - before trusting screenshots from search results or group chats.",
        "Open your order: who is the seller (attraction direct, OTA, reseller, tour bundle), and what exactly does it promise for closure?",
        "If already en route, decide whether to continue to the gate: partial closures sometimes leave plenty worth visiting; full closures rarely reward the trip.",
        "Start the refund or reschedule flow required by that specific seller while queues are short; screenshot every step with timestamps.",
        "Only then rebuild the day around where you physically are, how much daylight remains, and what can still be booked on short notice.",
      ],
    },
    {
      id: "verify-heading",
      type: "heading",
      level: 2,
      text: "Verify before you react",
    },
    {
      id: "verify-chain",
      type: "paragraph",
      text: "Closure news travels through four layers, in descending reliability: the attraction's own announcement (website notice board or signed statement), its verified official account, your ticket channel's notification, and finally on-site boards or staff. Search results, short-video posts and group chats are leads - they are often hours stale, sometimes wrong about which entrance or which mountain closed, and occasionally fabricate entirely. When two layers disagree, the operator's own statement wins; when there is no statement at all, phone the published service line rather than believing a viral clip.",
    },
    {
      id: "types-heading",
      type: "heading",
      level: 2,
      text: "Seven closure types and what each means for your ticket",
    },
    {
      id: "types-table",
      type: "table",
      caption: "Closure taxonomy observed at Chinese attractions",
      columns: ["Type", "Typical shape", "What it usually means for orders"],
      rows: [
        ["Full-day closure", "Gates shut, all entries suspended until further notice.", "Operators typically instruct refunds via original purchase channels; reschedule only if the product offers it."],
        ["Delayed opening", "Doors open later than scheduled (weather, inspection).", "Often no automatic compensation; same-day tickets may stay valid - check the notice wording."],
        ["Partial-area closure", "One peak, valley, gallery or trail closed; rest open.", "Main ticket usually stays valid; separately reserved peaks or shows are the items to refund or rebook."],
        ["Equipment suspension", "Cableway, glass bridge or ride down for technical or wind reasons.", "Combo products may split-refund the closed component; entry-only tickets often unchanged."],
        ["Weather/safety closure", "Storm, gale, ice or air-quality shutdowns, sometimes regional.", "Refund instructions usually explicit; travel-day clusters mean nearby sights may close too."],
        ["Capacity control", "Sold-out halts or temporary entry pauses when crowds hit limits.", "Valid tickets generally honoured; future slots go back on sale after the pause."],
        ["Single-entrance closure", "Your planned gate shut; other gates open.", "No refund trigger by itself - reroute transport and timing instead."],
      ],
    },
    {
      id: "owner-heading",
      type: "heading",
      level: 2,
      text: "Who owes you what",
    },
    {
      id: "owner-comparison",
      type: "comparison",
      title: "Four sales structures, four different answers",
      columns: [
        {
          heading: "Attraction direct",
          items: [
            "The operator's own closure notice governs; recent notices have instructed refunds via original channels.",
            "Refund windows and reschedule options are printed in the booking terms you accepted.",
            "Fastest lane: the platform or counter you paid, with the operator's notice as your reference.",
          ],
        },
        {
          heading: "OTA or reseller",
          items: [
            "Two contracts stack: the seller's terms plus the operator's closure rules.",
            "Platforms must actively assist travellers under China's online-travel regulations; some publish explicit guarantees for supplier-caused failures.",
            "Ask specifically whether the closure triggers their failed-service clause, not just standard cancellation fees.",
          ],
        },
        {
          heading: "Bundles with transport or guides",
          items: [
            "A closed sight does not automatically free-cancel the bus seat, guide or show bundled around it.",
            "Each component follows its own terms; ask the seller for a written breakdown of what is refunded, held or substituted.",
            "Substitutions (another stop, another day) need your explicit agreement, not just a push notification.",
          ],
        },
        {
          heading: "Independent transport and hotels",
          items: [
            "Train, flight and hotel bookings are separate contracts; an attraction closing does not make them refundable.",
            "Check their own change rules immediately - deadlines keep running while you replan.",
            "This boundary is deliberate: no national rule converts unrelated bookings into free cancellations because one sight shut.",
          ],
        },
      ],
    },
    {
      id: "cases-heading",
      type: "heading",
      level: 2,
      text: "Four documented closures and how orders were handled",
    },
    {
      id: "cases-table",
      type: "table",
      caption: "Real cases showing how differently closures get handled",
      columns: ["Case (type)", "What happened", "Ticket-holder handling"],
      rows: [
        ["Hengshan & Hanging Temple, Apr 2025 (weather)", "Extreme-gale warning shut both sites indefinitely on 11 April.", "Operator's notice told all ticketholders to refund via original purchase channels - explicit instruction, same day."],
        ["Mount Tai, Oct 2025 (capacity)", "Near capacity cap at midday, checking paused for one hour, exit-only; afternoon tickets already sold out.", "Committee told visitors holding unused slots to refund via original platforms before their window ended; valid-window tickets kept working."],
        ["Huangshan peaks, Dec 2025 (rotation/maintenance)", "West Sea Canyon and Tiandu Peak entered annual winter maintenance; Lianhua Peak continued its multi-season rest.", "Notice gave reopening-later wording only - no refund line; separately reserved peak slots were the traveller's own rebooking task."],
        ["Zhangjiajie Grand Canyon Glass Bridge, Sep 2016 (equipment/system)", "Bridge and canyon suspended days into trial operation for internal system upgrade.", "Primary notice announced suspension without general refund terms; pre-booked groups negotiated special handling locally - dated historical example of why per-order reading matters."],
      ],
    },
    {
      id: "cases-callout",
      type: "callout",
      title: "Why old notices still matter",
      body: "These cases are dated history, presented to explain how closure handling differs - never as current open status. Open status belongs to today's official announcements, checked the day you travel. The pattern to carry away: weather closures tend to ship refund instructions; rotation and equipment closures often ship silence, leaving rescheduling to your own initiative.",
      tone: "neutral",
    },
    {
      id: "rebuild-heading",
      type: "heading",
      level: 2,
      text: "Rebuilding the day without panic",
    },
    {
      id: "rebuild-list",
      type: "list",
      ordered: true,
      items: [
        "Fix your anchor first: where are you sleeping tonight, and which fixed commitments (trains, flights) still stand?",
        "Check remaining daylight against travel time; a two-hour queue replacement beats a three-hour cross-city gamble.",
        "For any candidate replacement, verify it is actually open today AND has bookable capacity - many top sights require same-day real-name reservations that sell out early.",
        "Budget the switch honestly: new transport cost plus possible new entry fees versus simply enjoying an unplanned neighbourhood.",
        "Protect tomorrow: if today's collapse pushes your schedule, adjust hotel nights and onward tickets before they become no-shows.",
        "Keep the whole trail - screenshots, refund references, chat logs - in one folder in case a claim needs it later.",
      ],
    },
    {
      id: "timeline-heading",
      type: "heading",
      level: 2,
      text: "A closure day, hour by hour (an illustrative composite)",
    },
    {
      id: "timeline-p1",
      type: "paragraph",
      text: "To show the sequence working, here is a well-handled closure morning built from the patterns above. It is a teaching scenario - not a real booking, not any specific attraction.",
    },
    {
      id: "timeline-list",
      type: "list",
      ordered: true,
      items: [
        "07:40 - Your hotel breakfast chat group buzzes: the mountain is closed today. You do not share the screenshot; you open the operator's own account and find a signed notice from 06:55.",
        "07:50 - The notice covers your case explicitly: all ticketholders refund via original channels. You screenshot it with its publish time.",
        "08:00 - In your ticket app you find the order was sold by a reseller, not direct. Refund flow started inside the app; reference number saved.",
        "08:20 - Trains for tomorrow are checked before doing anything else - their change deadline is tonight, and replanning must not cost you that window.",
        "09:10 - Replacement chosen from the same district after confirming two things on official pages: open today, and same-day real-name slots still available at 09:00.",
        "12:30 - New sight visited; original refund shows as processing; the whole trail sits in one folder in case questions arise later.",
        "Evening - Review written only if you have something factual to add; the day ends with money moving back and a plan intact.",
      ],
    },
    {
      id: "partial-heading",
      type: "heading",
      level: 2,
      text: "Partial closures deserve a second look",
    },
    {
      id: "partial-p1",
      type: "paragraph",
      text: "The most expensive mistake on partial-closure days is treating one dark spot as total darkness. When a single peak, gallery or cableway closes, the rest of a large park often still fills a day - and multi-entrance parks may simply ask you to use another gate. Verify which areas remain open on the operator's map or notice rather than the loudest post, then re-price your day honestly: an adjusted route can beat a refund-plus-empty-afternoon, especially when separate peak reservations are the only items actually affected. Photograph the notice board at the gate too - on-site wording sometimes lists reopenings that never reached your phone.",
    },
    {
      id: "groups-heading",
      type: "heading",
      level: 3,
      text: "Group tours are a different machine",
    },
    {
      id: "groups-p1",
      type: "paragraph",
      text: "If your ticket came inside a group itinerary, the guide and agency sit between you and the operator's notice - and they often hold better same-day information than any app. Ask the guide for the plan rather than announcing yours: agencies can sometimes swap the order of days, substitute a nearby sight already on their permit list, or process a component refund through their supplier channel faster than an individual could. What to protect is the same as always: get any substitution or refund promise written into your chat with the agency, keep your payment receipts for the tour fee separate from personal spending, and remember that the attraction closure does not erase the rest of what the bundle still owes you.",
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "Three questions this page gets asked",
    },
    {
      id: "faq-list",
      type: "list",
      items: [
        "Can I claim my wasted transport costs? Only where a contract says so. Attraction tickets do not carry your taxi fare; bundled products sometimes include rearrangement or component refunds - read them, then ask the seller to state in writing what applies.",
        "The operator's notice says nothing about refunds. Now what? Silence is common for rotation and equipment closures. Go through your seller anyway: platforms must assist under China's online-travel rules, and some publish explicit failed-service guarantees. Ask which clause of YOUR order applies.",
        "Should I just rebook for tomorrow? Check three things first: does the product allow rescheduling (some are refund-only), does tomorrow have capacity for real-name slots, and does your onward itinerary tolerate the slip? A refund-and-rebook is only better when all three answers are friendly.",
      ],
    },
    {
      id: "boundary-heading",
      type: "heading",
      level: 2,
      text: "Boundaries this page keeps",
    },
    {
      id: "boundary-list",
      type: "list",
      items: [
        "This is not a live closure-news page; every case above is dated history used to teach patterns.",
        "Wrong-name, wrong-date and missed-time-slot problems belong to their own recovery guides - a valid ticket for a closed day is this page's subject.",
        "Channel authenticity and reseller verification live in the official-or-reseller guide.",
        "No refund amount or timeline is promised anywhere here - outcomes follow each order's terms, each operator's notice, and each platform's guarantee.",
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Related ticket planning",
      items: [
        { "label": "Official or reseller attraction tickets", "href": "/guides/official-or-reseller-china-tickets/", "description": "Know your true seller before trouble starts." },
        { "label": "Build a booking-dispute evidence pack", "href": "/guides/china-booking-dispute-evidence-pack/", "description": "Escalate cleanly when refund flows stall." },
        { "label": "Zhangjiajie park tickets and entrances", "href": "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/", "description": "Multi-entrance, multi-ticket parks need extra care during partial closures." },
        { "label": "National Museum of China booking and route", "href": "/guides/national-museum-of-china-booking-and-route/", "description": "Real-name timed museums fail differently from landscape parks." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Primary sources reviewed",
      items: [
        { "label": "Notice: Hengshan & Hanging Temple temporary closure, 11 Apr 2025 (extreme winds; ticketholders refund via original channels)", "url": "https://www.byhs.net.cn/culture_detial/46.html", "publisher": "恒山风景名胜区管理中心", "reviewedAt": "2026-08-23" },
        { "label": "Mount Tai routes pause entry-checking for one hour, 3 Oct 2025 (capacity control; exit-only)", "url": "https://taian.iqilu.com/taianminsheng/2025/1003/5856881.shtml", "publisher": "齐鲁网·闪电新闻 quoting 泰山景区管委会", "reviewedAt": "2026-08-23" },
        { "label": "Mount Tai sold-out emergency notice, 3 Oct 2025 (refund via original platform before window ends)", "url": "https://sd.dzwww.com/sdnews/202510/t20251003_16554923.htm", "publisher": "大众网 quoting 泰山景区管委会", "reviewedAt": "2026-08-23" },
        { "label": "West Sea Canyon & Tiandu Peak winter maintenance closure from 1 Dec 2025; Lianhua Peak rotation continues", "url": "https://www.chinanews.com.cn/sh/2025/12-01/10524548.shtml", "publisher": "中国新闻网 reporting 黄山风景区管委会公告", "reviewedAt": "2026-08-23" },
        { "label": "Glass Bridge & canyon suspension for system upgrade, 2 Sep 2016 (historical case)", "url": "http://travel.people.com.cn/n1/2016/0902/c41570-28685909.html", "publisher": "人民网旅游频道 reporting operator announcement", "reviewedAt": "2026-08-23" },
        { "label": "Interim Provisions on the Administration of Online Tourism Business Services (platform assistance duty)", "url": "https://zwgk.mct.gov.cn/zfxxgkml/zcfg/bmgz/202012/t20201204_905349.html", "publisher": "Ministry of Culture and Tourism of the PRC", "reviewedAt": "2026-08-23" },
      ],
    },
  ],
};

export default body;

