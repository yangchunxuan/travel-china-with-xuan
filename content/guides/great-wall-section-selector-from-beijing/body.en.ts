import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "The question is not which Great Wall section is objectively best. It is whether you want the easiest independent journey, a balanced first visit, a long ridge walk or a night on the wall. Badaling, Mutianyu, Jinshanling and Simatai can all produce an excellent day, but they ask for different transport, different legs and different margins for failure. Choose the shape of the day before choosing the photograph."
    },
    {
      id: "quick-answer",
      type: "callout",
      tone: "decision",
      title: "The 20-second answer",
      body: "Choose Badaling when simple public transport and extensive visitor infrastructure matter most. Choose Mutianyu for the strongest all-round first visit, especially when a cable car can protect the group's energy. Choose Jinshanling when the walk and the ridge landscape are the point of the day. Choose Simatai when an overnight at Gubei Water Town or a dated night visit is part of the plan. If you are still undecided, Mutianyu is the safest default—not because it is universally quiet, but because it balances scenery, restored walking, uphill options and a manageable Beijing day."
    },
    {
      id: "decision-matrix-heading",
      type: "heading",
      level: 2,
      text: "Four sections, four different promises"
    },
    {
      id: "decision-matrix",
      type: "table",
      caption: "Choose by the experience you need, then verify the dated operation",
      columns: ["Section", "Best fit", "Effort and logistics", "Main compromise"],
      rows: [
        ["Badaling", "First-time visitors prioritising the clearest independent public route; mixed-age groups that value infrastructure", "Many transport choices; restored wall; walking can still be steep and the rail station itself involves substantial vertical movement", "The most famous choice can also feel the most processed and crowded at popular times"],
        ["Mutianyu", "Most first trips; families; couples; visitors who want scenery with cable-car choices", "Longer road journey; public transport normally includes a Huairou handoff; cable car or chairlift can reduce the ascent", "‘Quieter than Badaling’ is not a promise on weekends or holidays"],
        ["Jinshanling", "Strong walkers, photographers and travellers willing to stay nearby", "Farthest and least forgiving as a casual day trip; longer exposed walking; return transport needs to be arranged before the hike", "A beautiful hike can become a transport problem if treated like a simple city excursion"],
        ["Simatai", "Night-view seekers and travellers pairing the wall with Gubei Water Town or an overnight", "Steep terrain; ticket and access arrangements are tied to a named day/night product and the resort system", "It is a different trip shape, not a quieter substitute for Mutianyu" ]
      ]
    },
    {
      id: "decision-figure",
      type: "figure",
      src: "/images/guides/great-wall-section-selector-from-beijing/section-decision-en-1440.webp",
      alt: "Decision chart pointing to Badaling for easier public access, Mutianyu for a balanced first visit, Jinshanling for hiking and Simatai for a night or overnight trip.",
      width: 1440,
      height: 900,
      caption: "A decision chart, not a geographic map or a promise of current opening. Verify the selected section's official notice for your date."
    },
    {
      id: "badaling-heading",
      type: "heading",
      level: 2,
      text: "Badaling: choose it for access, not because you have failed to be adventurous"
    },
    {
      id: "badaling-copy",
      type: "paragraph",
      text: "Badaling is the pragmatic answer when the group needs a recognisable, heavily serviced attraction and a public journey that can be planned from several Beijing hubs. The official visitor page places it about 60 kilometres from central Beijing; the separate Homeground transfer guide compares current high-speed rail, S2 and bus routes. That range of options is real value for an independent visitor. It also concentrates demand. Arriving early on an ordinary weekday can improve the experience, but no editor can guarantee an empty wall."
    },
    {
      id: "badaling-fit",
      type: "comparison",
      title: "Badaling works when the infrastructure solves a real problem",
      columns: [
        {
          heading: "Good match",
          items: [
            "Your hotel connects cleanly to the correct rail or bus hub",
            "The group values signed facilities and several uphill/downhill options",
            "You need a straightforward half- or full-day attraction rather than a remote hike"
          ]
        },
        {
          heading: "Think again",
          items: [
            "Your only goal is solitude",
            "You are adding it before a tight evening flight or long-distance train",
            "You assume cable access removes all slopes, queues and station walking"
          ]
        }
      ]
    },
    {
      id: "mutianyu-heading",
      type: "heading",
      level: 2,
      text: "Mutianyu: the best-balanced first visit for most groups"
    },
    {
      id: "mutianyu-copy",
      type: "paragraph",
      text: "Mutianyu earns its default status by making several kinds of day possible. The restored wall runs through wooded ridges; the attraction publishes cable-car and alpine-slide facilities; and a visitor can choose a short scenic circuit or protect enough energy for a longer walk. The trade-off sits below the wall. Independent public transport normally requires a transfer in Huairou, while direct tourist buses and pre-arranged vehicles have their own fixed pickup and return conditions. The section is not ‘easy’ until the complete hotel-to-wall-to-hotel chain works."
    },
    {
      id: "mutianyu-route",
      type: "callout",
      tone: "neutral",
      title: "Do not buy the slide before choosing the walking direction",
      body: "Mutianyu has more than one uphill system and more than one attractive wall segment. Decide where the group intends to start, how far the least mobile traveller should walk, and whether the descent must return to the same lower area. A cable-car ticket, chairlift or toboggan is a tool inside that route—not the route itself. Current operation can change with weather and maintenance."
    },
    {
      id: "jinshanling-heading",
      type: "heading",
      level: 2,
      text: "Jinshanling: go because you want to walk"
    },
    {
      id: "jinshanling-copy",
      type: "paragraph",
      text: "Jinshanling sits roughly 130 kilometres from central Beijing on the Hebei side of the municipal boundary. Its appeal is not a single viewpoint: it is the rhythm of watchtowers, restored and less-restored surfaces, repeated climbs and long views along the ridge. Recent 2026 visitor reports praise the space and walking, while also describing cold fingers at an early ticket gate and complicated independent logistics. Those reports are useful texture, not an operating notice. Treat Jinshanling as a hiking day with a fixed return or as an overnight photography plan, not as a spontaneous add-on after breakfast in central Beijing."
    },
    {
      id: "jinshanling-boundary",
      type: "callout",
      tone: "warning",
      title: "A line on an old hiking map may not be an open through-route",
      body: "Do not assume you can walk continuously from Gubeikou through Jinshanling to Simatai because an old blog describes it. Gates, conservation controls, temporary damage and open sections change. Use the current scenic-area entrance, stay on the marked public route and ask the named operator which exit is available that day. A remote wall is cultural heritage, not an unrestricted trail network."
    },
    {
      id: "simatai-heading",
      type: "heading",
      level: 2,
      text: "Simatai: choose the night-and-overnight trip, not just the wall"
    },
    {
      id: "simatai-copy",
      type: "paragraph",
      text: "Simatai is the clearest choice when the wall after dark is the central memory and Gubei Water Town is an intentional part of the stay. Beijing's official material describes steep, rugged terrain and a long-running night programme; the resort publishes separate day, night, cable-car and combination products. That packaging matters. A night ticket may require resort access, and the open wall segment at night is limited. Verify the exact product, check-in window and final descent rather than assuming that a daytime wall ticket becomes a sunset ticket."
    },
    {
      id: "simatai-fit",
      type: "table",
      caption: "Simatai becomes easier when the itinerary admits what it is",
      columns: ["Plan", "Why it can work", "What must be fixed"],
      rows: [
        ["Beijing day return", "Possible with a dated outbound and return", "Do not combine an ambitious daytime hike, Water Town and night wall without checking every closing and departure"],
        ["One night near the wall", "Removes the late race back to central Beijing", "Confirm hotel location, resort admission, luggage handling and the next day's return"],
        ["Night wall only", "A focused evening experience", "Buy the exact current night product and verify whether Water Town entry and cable car are included or required"]
      ]
    },
    {
      id: "mobility-heading",
      type: "heading",
      level: 2,
      text: "Cable cars reduce climbing; they do not create a flat attraction"
    },
    {
      id: "mobility-copy",
      type: "paragraph",
      text: "Every section involves some combination of approach walking, steps, uneven paving, gradients, queues and exposure. A cable car can remove a large ascent but usually cannot remove the distance from the drop-off, the attraction's internal shuttle, the queue, the platform or the wall itself. ‘Senior-friendly’ and ‘wheelchair-accessible’ are not safe conclusions from the presence of a lift. Ask the attraction about the exact route needed by the least mobile traveller, then shorten the wall plan before shortening the safety margin."
    },
    {
      id: "group-selector",
      type: "table",
      caption: "Start with the least flexible person in the group",
      columns: ["Traveller", "First section to test", "Question that decides"],
      rows: [
        ["First-time couple or friends", "Mutianyu", "Does the full road transfer and return fit the hotel?"],
        ["Family with young children", "Mutianyu or Badaling", "Can the group reach, ascend, regroup and descend without relying on a tired child walking farther?"],
        ["Older parent with limited stamina", "Badaling or Mutianyu", "What exact step-free or reduced-climb route is open on the date?"],
        ["Serious walker", "Jinshanling", "Is the selected gate, exit and return transport confirmed?"],
        ["Photographer", "Jinshanling overnight", "Is lawful early access current, and is bad-weather time replaceable?"],
        ["Night-experience traveller", "Simatai; or a dated Badaling/Mutianyu event", "Is the night programme running on this exact date and what wall segment is open?"]
      ]
    },
    {
      id: "crowds-heading",
      type: "heading",
      level: 2,
      text: "Crowds belong to a date and an entrance, not permanently to a section"
    },
    {
      id: "crowds-copy",
      type: "paragraph",
      text: "Badaling attracts the heaviest reputation for crowds, while Mutianyu is often sold as the quiet alternative and Jinshanling as empty. Those labels are too neat. A Golden Week morning, a school-holiday weekend, a closed cable line, a group arrival or a popular autumn ridge can change the distribution. The useful levers are a non-holiday weekday, the first workable entry, a route that moves beyond the initial cluster, and enough time to pause without blocking a narrow passage. Never step onto battlements or closed fabric for a clean photograph."
    },
    {
      id: "season-heading",
      type: "heading",
      level: 2,
      text: "Season changes the same wall more than the marketing photograph suggests"
    },
    {
      id: "season-table",
      type: "table",
      caption: "Build a weather version of the day",
      columns: ["Season", "What improves", "What can fail", "Better decision"],
      rows: [
        ["Spring", "Cooler walking and new foliage", "Wind, variable visibility and holiday peaks", "Carry a layer and do not promise blossom timing"],
        ["Summer", "Long daylight and green ridges", "Heat, humidity, thunderstorms and sudden safety closures", "Start early, carry water and keep the day replaceable"],
        ["Autumn", "Clearer air and strong colour when conditions align", "Peak demand and no guaranteed foliage date", "Choose a weekday and treat colour as a bonus"],
        ["Winter", "Sharper silhouettes and sometimes lighter demand", "Exposed cold, wind, ice and reduced operations", "Use footwear with grip and accept a shorter route or closure"]
      ]
    },
    {
      id: "weather-proof",
      type: "callout",
      tone: "warning",
      title: "A paid transfer does not prove the wall is open",
      body: "In August 2026 Mutianyu posted a temporary closure during a red rainstorm warning and a separate reopening notice. The lesson is wider than one section: check the attraction's own notice after severe weather and again before departure. A driver, hotel or reseller may still have a valid transport booking when the heritage site has stopped admission."
    },
    {
      id: "night-heading",
      type: "heading",
      level: 2,
      text: "Night tours are events, not permanent opening hours"
    },
    {
      id: "night-copy",
      type: "paragraph",
      text: "In 2026, Badaling published a seasonal night programme through early October, Mutianyu published separate short-holiday and summer night dates, and Simatai continued to sell a defined night product through Gubei Water Town. These are evidence that several sections can open after dark—not permission to reuse 2026 dates next year. Night access may cover only a small section of wall and may depend on a specific cable car or check-in gate. Verify the current notice, lighting time, last admission, descent and return to the hotel as one chain."
    },
    {
      id: "transport-heading",
      type: "heading",
      level: 2,
      text: "Choose the section with the hotel door included"
    },
    {
      id: "transport-copy",
      type: "paragraph",
      text: "A route labelled ‘90 minutes from Beijing’ usually starts somewhere more convenient than your hotel and stops before the wall. Compare the actual morning trip to the departure hub, security or waiting, the intercity leg, internal shuttle, uphill access, descent and last safe return. Badaling has the strongest independent public network. Mutianyu is manageable when its Huairou transfer or a dated direct bus is understood. Jinshanling needs a controlled return. Simatai makes most sense when the resort and overnight are treated as part of the route."
    },
    {
      id: "two-plans",
      type: "comparison",
      title: "Two defensible first-trip shapes",
      columns: [
        {
          heading: "Balanced day: Mutianyu",
          items: [
            "Leave Beijing with the return already selected",
            "Use uphill assistance to preserve energy where it helps",
            "Walk one coherent section rather than chasing every tower",
            "Return to Beijing without a fixed evening flight or railway gamble"
          ]
        },
        {
          heading: "Walking trip: Jinshanling overnight",
          items: [
            "Travel out the previous afternoon",
            "Confirm the current gate and lawful early-access rules",
            "Walk only the open route with weather margin",
            "Keep the departure transport independent of a perfect sunset or sunrise"
          ]
        }
      ]
    },
    {
      id: "final-check-heading",
      type: "heading",
      level: 2,
      text: "The night-before check"
    },
    {
      id: "final-check",
      type: "list",
      ordered: true,
      items: [
        "Open the chosen section's official notice and confirm it is admitting visitors on your date.",
        "Match the passport name and document type required by the current ticket channel.",
        "Write the exact Beijing departure point and the wall entrance in Chinese.",
        "Confirm which uphill system is operating and which wall route the group will actually walk.",
        "Set a leave-the-wall time that protects one verified return—not merely closing time.",
        "Check rain, lightning, snow, ice, wind and heat warnings; make the day replaceable.",
        "If a night visit is planned, verify the dated product, open towers, final descent and hotel return separately."
      ]
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "What this page owns",
      body: "This guide owns the choice among Badaling, Mutianyu, Jinshanling and Simatai. It does not own live ticket inventory, permanent opening hours, a guarantee of crowd levels, illegal wild-wall access or the detailed transport workflow to every section. Once you choose Badaling or Mutianyu, use the dedicated transfer guide for that journey."
    },
    {
      id: "help",
      type: "callout",
      tone: "decision",
      title: "One practical check can be enough",
      body: "If the section is chosen but the day still feels fragile, send the date, approximate Beijing stay area, group size and any fixed evening plan. For a first enquiry, do not send passport, payment, medical or detailed mobility information. Homeground can flag the transfer and recheck points without promising weather, live inventory or an empty wall."
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue the Beijing plan",
      items: [
        { "label": "Beijing destination guide", "href": "/destinations/beijing/", "description": "Fit the Great Wall into the right number of Beijing nights." },
        { "label": "Beijing to Badaling", "href": "/guides/beijing-to-badaling-great-wall-transfer/", "description": "Compare the current rail and bus departure hubs after choosing Badaling." },
        { "label": "Beijing to Mutianyu", "href": "/guides/beijing-to-mutianyu-great-wall-transfer/", "description": "Build the complete road transfer and return after choosing Mutianyu." },
        { "label": "Where to stay in Beijing", "href": "/guides/beijing-where-to-stay-first-trip/", "description": "The hotel district changes the first and last leg." },
        { "label": "Is your China itinerary too rushed?", "href": "/guides/is-your-china-itinerary-too-rushed/", "description": "Protect a major day trip from a fragile evening connection." }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources and current operating evidence",
      items: [
        { "label": "The Great Wall World Heritage listing", "url": "https://whc.unesco.org/en/list/438/", "publisher": "UNESCO World Heritage Centre", "reviewedAt": "2026-08-22" },
        { "label": "Badaling visitor information and seasonal hours", "url": "https://english.beijing.gov.cn/travellinginbeijing/attractions/202603/t20260320_4562521.html", "publisher": "Beijing Municipal Government", "reviewedAt": "2026-08-22" },
        { "label": "Mutianyu official visitor information and live notices", "url": "https://en.mutianyugreatwall.com/", "publisher": "Mutianyu Great Wall Tourism Service Co., Ltd.", "reviewedAt": "2026-08-22" },
        { "label": "2026 Mutianyu summer night-tour notice", "url": "https://english.beijing.gov.cn/latest/news/202606/t20260630_4738683.html", "publisher": "Beijing Municipal Government", "reviewedAt": "2026-08-22" },
        { "label": "2026 Badaling seasonal night-tour notice", "url": "https://english.beijing.gov.cn/travellinginbeijing/events/202604/t20260424_4608135.html", "publisher": "Beijing Municipal Government", "reviewedAt": "2026-08-22" },
        { "label": "Jinshanling attraction profile", "url": "https://s.visitbeijing.com.cn/attraction/118029", "publisher": "Beijing Municipal Culture and Tourism Bureau visitor portal", "reviewedAt": "2026-08-22" },
        { "label": "2026 Jinshanling peak-season operating notice", "url": "https://finance.sina.com.cn/jjxw/2026-04-01/doc-inhsyskz8529136.shtml", "publisher": "Chengde Fabu notice republished by Sina", "reviewedAt": "2026-08-22" },
        { "label": "Gubei Water Town and Simatai ticket products", "url": "https://www.gubeiwatertown.com/Basic%20information/entrance-fees", "publisher": "Gubei Water Town", "reviewedAt": "2026-08-22" },
        { "label": "Simatai and Gubei Water Town visitor information", "url": "https://english.beijing.gov.cn/specials/ticketing/attractions/202407/t20240717_3751547.html", "publisher": "Beijing Municipal Government", "reviewedAt": "2026-08-22" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
