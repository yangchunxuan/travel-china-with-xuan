import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Chinese New Year can be a wonderful time to visit China, but it rewards a different traveller from an ordinary first trip. You may find a commuter district strangely still at breakfast and a temple fair packed by lunch; a family restaurant may be dark while the mall across the road runs a full holiday programme. Spring Festival is not one national shutdown. It is family reunion, a long transport operation and an enormous domestic travel season happening at once."
    },
    {
      id: "direct-answer",
      type: "callout",
      tone: "decision",
      title: "Should you go?",
      body: "Go if the festival itself matters, you can keep intercity moves to a minimum, and you are happy to build each day around one confirmed public event plus a flexible fallback. Choose another period if your first trip depends on a tightly timed multi-city route, a long list of small independent restaurants, or several must-see venues with no published holiday hours. Spring Festival does not make China inaccessible; it makes weak assumptions expensive."
    },
    {
      id: "next-date",
      type: "callout",
      tone: "warning",
      title: "Next festival date known; mainland holiday arrangement not yet published",
      body: "Reviewed 22 August 2026: Lunar New Year's Day falls on Saturday, 6 February 2027, as shown by the Hong Kong Observatory's official calendar and Hong Kong's gazetted holiday list. That establishes the lunar date only. Mainland China's 2027 days off, compensatory workdays and Chunyun period had not yet been published at review time. Do not copy Hong Kong's holiday arrangement or the 2026 mainland break into a 2027 China itinerary. Use the Homeground public-holiday calendar when the State Council publishes the annual arrangement."
    },
    {
      id: "pressure-heading",
      type: "heading",
      level: 2,
      text: "The dates that affect a trip are wider than New Year's Day"
    },
    {
      id: "pressure-map",
      type: "figure",
      src: "/images/guides/lunar-new-year-customs-for-visitors/spring-festival-pressure-en-1440.webp",
      alt: "Spring Festival travel pressure chart showing pre-holiday departure demand, reunion days, holiday sightseeing and the return wave as separate phases.",
      width: 1440,
      height: 900,
      caption: "A planning pattern, not the 2027 official calendar. The State Council, transport authorities and each venue publish the dates that govern a particular trip."
    },
    {
      id: "pressure-table",
      type: "table",
      caption: "Four pressure phases; exact boundaries change every year",
      columns: ["Phase", "What a visitor may notice", "What to protect"],
      rows: [
        ["Before the official holiday", "Homebound demand builds on rail, air and roads while most city businesses may still be open", "Necessary intercity seats and a recoverable hotel plan"],
        ["New Year's Eve and early reunion days", "Some office and neighbourhood streets quieten; family-run businesses may close; family time is most private", "A confirmed meal, hotel operation and one public activity"],
        ["Middle of the holiday", "Domestic sightseeing accelerates; major attractions, resorts, fairs and shopping districts can be intensely busy", "Dated admission, crowd tolerance and a nearby fallback"],
        ["End of the break and return wave", "Railways, airports and expressways carry people back to work and study; large cities receive heavy inflows", "The final necessary transfer and margin before an international flight"]
      ]
    },
    {
      id: "four-clocks",
      type: "callout",
      tone: "neutral",
      title: "Plan with four clocks, not one festival date",
      body: "The lunar date tells you when New Year's Day falls. The State Council arrangement tells you mainland days off and compensatory workdays. The annual Chunyun plan describes a longer transport period. A venue or business publishes its own opening. These clocks overlap but are not interchangeable. A blank field means ‘not announced’—never ‘same as last year’."
    },
    {
      id: "city-heading",
      type: "heading",
      level: 2,
      text: "How can a city feel empty and crowded at the same time?"
    },
    {
      id: "city-copy",
      type: "paragraph",
      text: "Because people and activity redistribute. Some workers and students leave their usual city; some relatives travel in the opposite direction; residents take domestic holidays; and public programmes pull visitors towards a smaller number of attractions and commercial districts. The result is spatial contrast, not a national pause. An office street can be quiet, a transport hub under pressure, a famous temple full and an ordinary residential restaurant closed—all on the same day. Academic research on reverse reunion also warns against the simple story that every large city empties."
    },
    {
      id: "city-evidence",
      type: "callout",
      tone: "neutral",
      title: "2026 evidence: quiet-city stories did not mean quiet attractions",
      body: "Shanghai reported 21.67 million tourist visits and more than 2,570 cultural and tourism activities during its nine-day 2026 Spring Festival holiday. Nationally, the Ministry of Culture and Tourism reported 596 million domestic trips. Those are visit/trip measures, not unique-person counts, and they do not forecast another year. They do show why ‘everyone has gone home, so sightseeing will be empty’ is a poor plan."
    },
    {
      id: "where-heading",
      type: "heading",
      level: 2,
      text: "Pick a base with fallbacks, not the most ‘authentic’ promise"
    },
    {
      id: "where-table",
      type: "table",
      caption: "Base choice changes the risk more than a generic city ranking",
      columns: ["Base", "Why it can work", "What can disappoint"],
      rows: [
        ["Large city centre", "Major hotels, metro, malls and official programmes offer more replacement options", "Famous attractions and festive districts may be extremely busy; small local businesses still vary"],
        ["Historic city with a public festival programme", "A named temple fair, lantern show or museum programme gives the trip a clear purpose", "The event may be ticketed, capacity-controlled or limited to only a few dates"],
        ["Scenic resort", "Accommodation and holiday activities may be packaged in one place", "Holiday pricing, traffic and domestic demand can be high; the resort is not quiet countryside"],
        ["Small town or village without a host", "Ordinary streets may be calm", "Public activities, transport and food choices can be limited; family customs are not automatically open to visitors"]
      ]
    },
    {
      id: "transport-heading",
      type: "heading",
      level: 2,
      text: "Transport: reduce moves before trying to outsmart Chunyun"
    },
    {
      id: "transport-copy",
      type: "paragraph",
      text: "Chunyun is a separately announced, multimode transport operation that begins before the statutory break and ends after it. In 2026 it ran for 40 days, while the mainland public holiday lasted nine days. The lesson is structural, not a reusable 2027 date range: the difficult ticket may sit outside the holiday box on your calendar. Search the exact station or airport pair when the official operator opens inventory, and do not let a waitlist carry non-refundable hotels and timed attractions that have no fallback."
    },
    {
      id: "transport-actions",
      type: "list",
      ordered: true,
      items: [
        "Delete optional backtracking and one-night city changes before booking anything.",
        "Protect the journey into China, the one necessary intercity move and the final night before the flight home.",
        "Use the official railway or airline record; copy the complete station or airport name in Chinese.",
        "Treat a 12306 waitlist as attempted fulfilment, not as a held seat. Keep a route that works if it never clears.",
        "Do not connect a long-distance arrival directly to a scarce festival event. Make the first activity replaceable.",
        "Recheck local metro, bus and taxi access; a confirmed train does not guarantee the last kilometre."
      ]
    },
    {
      id: "business-heading",
      type: "heading",
      level: 2,
      text: "What closes? There is no useful national list"
    },
    {
      id: "business-copy",
      type: "paragraph",
      text: "Government offices follow the published holiday and workday arrangement, but restaurants, shops, museums and attractions make separate decisions. Large hotels, transport facilities, malls and chain businesses often maintain some holiday service; many public attractions publish special hours or programmes. A small family-run restaurant, laundry, workshop or guesthouse may close, shorten hours or reopen later than the formal holiday. None of those patterns proves what one named place will do."
    },
    {
      id: "verification-ladder",
      type: "table",
      caption: "Verify the places that can break your day",
      columns: ["When", "Check", "Decision"],
      rows: [
        ["When choosing the city", "Did this city publish a current festival programme and do major hotels/transport offer fallbacks?", "Keep or replace the base"],
        ["When booking", "Does the named attraction, event or restaurant accept your date and passport/contact method?", "Book only the confirmed anchor"],
        ["About one week before", "Has the organiser posted holiday hours, reservation, capacity or cancellation rules?", "Freeze one anchor and one fallback"],
        ["The day before", "Is the notice still current, and is the route operating?", "Go, move the time or replace the activity"],
        ["Same day", "Has weather, crowd control or transport changed?", "Follow the named operator; do not argue from an old screenshot"]
      ]
    },
    {
      id: "food-plan",
      type: "callout",
      tone: "decision",
      title: "The first three meals need less romance and more evidence",
      body: "Confirm the hotel's breakfast or a nearby chain/convenience option, save one simple backup meal and reserve any important dinner through the restaurant's current channel. A festive banquet marketed online is not automatically available to a solo walk-in, and an invitation to a household reunion is not a restaurant booking. Once basic meals are safe, discover the places that are genuinely open."
    },
    {
      id: "events-heading",
      type: "heading",
      level: 2,
      text: "Temple fairs and lantern shows are public programmes, not a permanent national timetable"
    },
    {
      id: "events-copy",
      type: "paragraph",
      text: "A temple fair, garden party or lantern carnival can be the best reason for a foreign visitor to come: the event is public, the organiser is named and the setting does not require access to private family life. But the label does not prove admission. Beijing's 2026 programme, for example, listed different fairs running on different subsets of the holiday, while several lantern displays continued towards the Lantern Festival. Some events were parks, some temple grounds, some commercial festivals. The next year needs a new list from the city and each organiser."
    },
    {
      id: "event-check",
      type: "list",
      ordered: false,
      items: [
        "Use a dated notice from the city, park, museum, temple or named organiser—not a copied listicle.",
        "Confirm whether it is a religious site, heritage fair, commercial carnival, performance or light display; behave for the real setting.",
        "Check ticket, reservation, passport acceptance, capacity, bag and photography rules.",
        "Write the exact entrance and time window in Chinese; the event name may cover several venues.",
        "Keep a second public activity nearby in case weather or capacity cancels the first.",
        "Do not assume an event continues through Lantern Festival merely because its decorations remain."
      ]
    },
    {
      id: "family-heading",
      type: "heading",
      level: 2,
      text: "Public celebration is not permission to enter family life"
    },
    {
      id: "family-copy",
      type: "paragraph",
      text: "UNESCO's description of Spring Festival living heritage includes preparations, reunion, greetings and public festivities. It is not a checklist followed by every household. Families differ by region, generation, work, religion, migration and preference. Some meet before the official break, order food, travel elsewhere or do very little. Respect includes letting an ordinary or changed celebration remain ordinary."
    },
    {
      id: "invitation-table",
      type: "table",
      caption: "The setting decides your position",
      columns: ["Setting", "Your role", "What permission means"],
      rows: [
        ["Official fair, museum or ticketed show", "Member of the public", "Follow current admission, conduct and photography rules"],
        ["Restaurant festive menu", "Customer", "A booking covers the meal, not access to a household tradition"],
        ["Friend's family meal", "Specifically invited guest", "Ask when to arrive, who knows you are coming, food limits, gift expectations and when to leave"],
        ["Home visit, ancestor remembrance or red-envelope exchange", "Private unless directly included", "Invitation to dinner does not transfer to companions, filming or every family activity"]
      ]
    },
    {
      id: "etiquette",
      type: "callout",
      tone: "neutral",
      title: "Simple etiquette is enough",
      body: "Use a warm ‘Happy New Year’ greeting, follow the host's lead, and ask before photographing people, offerings, children or money. A modest gift may be appropriate if the host suggests it; random red envelopes to children are not required and can be awkward. Do not demand a ritual, refuse a reasonable change of plan with drama, or publish identifiable family material without specific consent."
    },
    {
      id: "sample-heading",
      type: "heading",
      level: 2,
      text: "A festival-first trip that remains recoverable"
    },
    {
      id: "sample-plan",
      type: "list",
      ordered: true,
      items: [
        "Base in one large city for four or five nights instead of crossing the country during the highest-pressure days.",
        "Use the arrival day for the hotel area, a confirmed meal and an ordinary walk.",
        "Choose one dated public festival event as the cultural anchor.",
        "Place a major attraction on a separate reserved day, with a nearby non-ticket fallback.",
        "Keep one unscheduled neighbourhood or park day for weather, fatigue or a changed opening.",
        "Move to the next city only after checking the annual return-flow pattern and protecting the final international-flight margin."
      ]
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "When the holiday plan fails"
    },
    {
      id: "failure-table",
      type: "table",
      caption: "Recover without making the festival someone else's emergency",
      columns: ["Failure", "Do first", "Do not"],
      rows: [
        ["Preferred train remains unavailable", "Use the approved alternate date, route or mode, or remove the optional move", "Assume the waitlist must clear"],
        ["Restaurant is closed", "Use the saved meal fallback and verify another current venue", "Treat a family holiday closure as personal bad service"],
        ["Fair reaches capacity or changes", "Use the nearby public fallback", "Pressure staff or enter a controlled area"],
        ["Family invitation changes", "Thank the host and switch to a public meal or event", "Ask the family to stage a reunion for the itinerary"],
        ["A city feels quieter than expected", "Explore the open neighbourhood calmly and keep the confirmed anchor", "Assume every attraction must therefore be empty"],
        ["A popular attraction is overwhelmed", "Use the reserved time or leave for the fallback", "Add more same-day transfers chasing another famous site"]
      ]
    },
    {
      id: "final-decision-heading",
      type: "heading",
      level: 2,
      text: "Final decision: come for the festival, not despite it"
    },
    {
      id: "final-decision",
      type: "comparison",
      title: "The trip is a good fit when more of the left column is true",
      columns: [
        {
          heading: "Come during Spring Festival",
          items: [
            "One or two bases are enough",
            "Public festival culture is a main interest",
            "You can reserve anchors and release the rest",
            "A closed restaurant or changed event will not ruin the trip",
            "You accept that major domestic attractions may be busy"
          ]
        },
        {
          heading: "Choose another period",
          items: [
            "The route requires frequent intercity moves",
            "Every meal depends on a specific small venue",
            "Several must-see sites have no current holiday notice",
            "You need ordinary weekday business services",
            "The main goal is low-crowd sightseeing rather than the festival"
          ]
        }
      ]
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "What this guide owns",
      body: "This page owns the decision to visit China during Spring Festival and the interaction among transport pressure, business openings, public events and family boundaries. The public-holiday calendar owns annual mainland days off and compensatory workdays. Operators own live tickets and hours. No page can promise entry to a household celebration."
    },
    {
      id: "help-cta",
      type: "callout",
      tone: "decision",
      title: "A light human check can protect the fragile parts",
      body: "If your dates overlap Spring Festival, send the cities, necessary transfers and two or three non-negotiable experiences. Homeground can point out which assumptions need a current source and where a simple fallback is enough, without turning the holiday into a sales script."
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning",
      items: [
        { "label": "China public-holiday travel calendar", "href": "/guides/china-public-holidays-travel-calendar/", "description": "Use the annual mainland days off, compensatory workdays and crowd windows." },
        { "label": "First China trip planner", "href": "/first-trip-to-china/", "description": "Build the whole journey around a small number of sound decisions." },
        { "label": "China high-speed train for first timers", "href": "/guides/china-high-speed-train-first-time-guide/", "description": "Prepare passenger records, stations and boarding after choosing the route." },
        { "label": "Night train or daytime high-speed rail", "href": "/guides/china-night-train-or-daytime-high-speed-rail/", "description": "Reduce hotel changes and protect usable daytime." },
        { "label": "First shared meal in China", "href": "/guides/first-shared-meal-in-china/", "description": "Understand an ordinary shared restaurant meal without confusing it with a household reunion." }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources and annual evidence",
      items: [
        { "label": "2027 Gregorian–lunar calendar", "url": "https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/2027e.pdf", "publisher": "Hong Kong Observatory", "reviewedAt": "2026-08-22" },
        { "label": "2027 Lunar New Year's Day gazetted as 6 February in Hong Kong", "url": "https://www.info.gov.hk/gia/general/202605/15/P2026051400300.htm", "publisher": "Government of the Hong Kong SAR", "reviewedAt": "2026-08-22" },
        { "label": "2026 mainland public-holiday arrangement", "url": "https://www.gov.cn/gongbao/2025/issue_12406/material/gwygb202532.pdf", "publisher": "State Council of the People's Republic of China", "reviewedAt": "2026-08-22" },
        { "label": "2026 integrated Chunyun plan", "url": "https://xxgk.mot.gov.cn/2020/jigou/ysfws/202601/t20260124_4198706.html", "publisher": "Ministry of Transport of the People's Republic of China", "reviewedAt": "2026-08-22" },
        { "label": "2026 national Spring Festival tourism results", "url": "https://english.www.gov.cn/archive/statistics/202602/24/content_WS699da7c5c6d00ca5f9a09421.html", "publisher": "State Council of the People's Republic of China", "reviewedAt": "2026-08-22" },
        { "label": "2026 Shanghai Chunyun phases and peak forecast", "url": "https://english.shanghai.gov.cn/en-LatestNews/20260127/d764a117cb9748bb8ab1b29df52a70f6.html", "publisher": "Shanghai Municipal Government", "reviewedAt": "2026-08-22" },
        { "label": "2026 Shanghai Spring Festival tourism and business results", "url": "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260224/5d3c35722d5f43b0a7bdc0e16e5e513f.html", "publisher": "Shanghai Municipal Government", "reviewedAt": "2026-08-22" },
        { "label": "2026 Beijing temple fairs and public park events", "url": "https://english.beijing.gov.cn/latest/news/202602/t20260218_4524489.html", "publisher": "Beijing Municipal Government", "reviewedAt": "2026-08-22" },
        { "label": "Spring Festival social practices", "url": "https://ich.unesco.org/en/RL/spring-festival-social-practices-of-the-chinese-people-in-celebration-of-traditional-new-year-02126", "publisher": "UNESCO Intangible Cultural Heritage", "reviewedAt": "2026-08-22" },
        { "label": "China Railway waitlist FAQ", "url": "https://kyfw.12306.cn/otn/gonggao/alternate.html", "publisher": "China Railway 12306", "reviewedAt": "2026-08-22" },
        { "label": "Reverse traffic flows during the Spring Festival travel rush", "url": "https://journals.sagepub.com/doi/10.1177/0308518X19860537", "publisher": "Environment and Planning A", "reviewedAt": "2026-08-22" },
        { "label": "Hero image: Guangzhou South Chunyun waiting hall by 小溪Yang, CC BY 2.5; cropped and resized", "url": "https://commons.wikimedia.org/wiki/File:Crowded_People_during_Chunyun,_Guangzhounan_Railway_Station,_China_Railway_20200121.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-22" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
