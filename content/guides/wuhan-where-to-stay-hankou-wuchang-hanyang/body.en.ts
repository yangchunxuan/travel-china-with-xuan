import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Pick the bank you will spend most of your days on, then pick the side your hardest departure leaves from — and accept that those two answers sometimes conflict, in which case the departure wins. Wuhan is not a city where any one area suits everyone. Two rivers cut it into three parts, the three main railway stations sit on different sides, and one of the most common combinations still has no direct metro between the stations at all. That geography, not a district's reputation, is what should choose your hotel." },

  { id: "answer", type: "callout", title: "The question is which crossings you are buying", tone: "decision", body: "Write down four things before you look at a single property: the station or terminal you arrive at, the station or terminal you leave from, which side of the Yangtze your two or three main days sit on, and what time your earliest departure is. If arrival and departure are on the same side and your days are too, that side is your answer. If they conflict, stay near the departure node and cross the river during the day, when crossing is cheap and frequent. Crossing at 06:00 with luggage is a different problem from crossing at 14:00 without it." },

  { id: "names-heading", type: "heading", level: 2, text: "Hankou, Wuchang and Hanyang are not districts, and the station names are a third system again" },
  { id: "names-copy", type: "paragraph", text: "The single most useful correction for a first-time visitor is that the three names everybody uses are not administrative units. Wuhan's own municipal records describe the Yangtze and the Han crossing through the urban area to form the tripartite pattern of Wuchang, Hankou and Hanyang, known collectively as Wuhan's three towns. Separately, the city is divided into thirteen administrative districts, of which seven are central: Jiang'an, Jianghan, Qiaokou, Hanyang, Wuchang, Qingshan and Hongshan. Read those two lists side by side and the trap is obvious. Hanyang and Wuchang appear in both. Hankou does not appear in the district list at all — the area people mean by Hankou is covered by Jiang'an, Jianghan and Qiaokou. And the railway station names are a third system that matches neither." },
  { id: "names-table", type: "table", caption: "Three overlapping naming systems, checked against Wuhan municipal sources and China Railway's 12306 station dictionary on 22 August 2026", columns: ["Name you will see", "What kind of name it is", "What it actually refers to"], rows: [
    ["Hankou 汉口", "A historic town, not a district", "The north-west bank, spanning the Jiang'an, Jianghan and Qiaokou districts"],
    ["Wuchang 武昌", "Both a town name and a district name", "The south-east bank as a whole; also one specific central district on that bank"],
    ["Hanyang 汉阳", "Both a town name and a district name", "The bank between the Han and the Yangtze, opposite Wuchang"],
    ["Hankou Station 汉口站", "A railway station", "On the Hankou side"],
    ["Wuchang Station 武昌站", "A railway station", "On the Wuchang side, and not the same building as the one below"],
    ["Wuhan Station 武汉站", "A railway station", "Also on the Wuchang side of the river, but a separate hub well to the east"],
    ["Wuhan 武汉", "A city name that is also a station name", "A ticket reading Wuhan means Wuhan Station specifically, not the city generally"],
  ]},
  { id: "names-warning", type: "callout", title: "\"Wuhan\" on a ticket is a station, not a city", tone: "warning", body: "China Railway's station dictionary lists Wuhan, Hankou, Wuchang and Wuhan East as four separately ticketable stations, all registered under the city of Wuhan. A booking that says Wuhan will land you at Wuhan Station. Read the full Chinese name on the confirmed order before you choose a hotel, and again before you call a car on departure day." },

  { id: "river-heading", type: "heading", level: 2, text: "The river is a constraint, not a view" },
  { id: "river-copy", type: "paragraph", text: "Travellers tend to treat the Yangtze as scenery and then discover it is a schedule. Crossing is easy in the middle of the day and awkward at the edges of it, and the awkwardness compounds with luggage. The metro is the backbone: as of the city's own 2025 reporting, the lines running in tunnels under the Yangtze are Lines 2, 4, 7 and 8, with Line 12, Line 11's fourth phase and the Xingang line western extension all under construction. That is a genuinely good network — but it does not connect every pair of places you might want connected." },
  { id: "river-callout", type: "callout", title: "The gap that catches people: Hankou Station to Wuhan Station", tone: "warning", body: "In January 2025 the Wuhan Municipal Transport Bureau stated plainly that there is no direct metro between Hankou Station and Wuhan Station, that a passenger must change lines, and that the minimum journey is 55 minutes. The Xingang line western extension is being built specifically to bring that under 25 minutes, but it is not open. If you arrive at one of those two stations and depart from the other, that hour is a real cost in your itinerary, and it lands on the day you are least able to absorb it." },
  { id: "river-list", type: "list", ordered: false, items: [
    "Metro lines under the Yangtze in operation, per the city's 2025 statement: 2, 4, 7 and 8.",
    "Wuhan Station is served by Lines 4 and 5; Hankou Station by Line 2; Wuchang Station by Lines 4 and 7 — the 2022 municipal briefing that lists these also lists further lines as planned or under construction.",
    "Tianhe Airport, Wuhan Station, Hankou Station and Wuchang Station are interconnected through Lines 2, 4 and 11 among others.",
    "The ferry is a real crossing, not a tourist boat: the standard Yangtze crossing fare is 1.5 yuan and the trip takes roughly fifteen minutes, but since the 2024 flood season the upper deck has been closed for safety, so treat it as transport rather than as a viewing platform.",
  ]},

  { id: "matrix-heading", type: "heading", level: 2, text: "Choose from your arrival node, your days and your departure node" },
  { id: "matrix-copy", type: "paragraph", text: "This is the table to actually use. Find the row that matches your arrival, read across to what your days look like, and take the departure column seriously — it is the one people ignore and then regret at 05:30. None of these is a claim that one bank is safer, nicer or more convenient in general; they are statements about which crossings each combination forces you to make." },
  { id: "matrix-table", type: "table", caption: "Arrival node x daily activity x departure node", columns: ["You arrive at", "Your days are mostly", "Your departure is from", "Base to check first"], rows: [
    ["Hankou Station", "The Hankou riverfront and former concession streets", "Hankou Station or Tianhe Airport", "Hankou. Every leg stays on one bank"],
    ["Hankou Station", "Wuchang: the riverside heights, the lake, the university belt", "Wuchang Station or Wuhan Station", "Wuchang. Cross once on arrival with luggage rather than daily"],
    ["Wuhan Station", "Wuchang and the eastern lake district", "Wuhan Station", "Wuchang, on the eastern side. Do not book Hankou for this shape"],
    ["Wuhan Station", "Hankou", "Hankou Station or Tianhe Airport", "Hankou, and budget the arrival transfer honestly — this is the 55-minute pairing"],
    ["Wuchang Station", "A mix of both banks", "Wuchang Station", "Wuchang, near a line that crosses the river"],
    ["Tianhe Airport", "Hankou, one or two nights only", "Tianhe Airport", "Hankou, near Line 2 or near Hankou Station"],
    ["Tianhe Airport", "Wuchang", "Wuhan Station", "Wuchang. Accept one long arrival transfer to protect every other day"],
    ["Any node, and you want the quietest logistics", "Anything", "Anything", "The side your departure leaves from, with day trips across the river"],
  ]},
  { id: "matrix-copy2", type: "paragraph", text: "Hanyang deserves a specific note, because it is the option most often dismissed by default. It sits between the two rivers, it is genuinely well placed for the Han-mouth area and the Tortoise Hill side of the first bridge, and it is smaller and quieter than either of the other two. It is a reasonable base if your days point that way and your departure is from Hankou or Wuchang Station. It is a poor base if your departure is Wuhan Station, because you are then crossing the whole city on your hardest morning." },

  { id: "scenarios-heading", type: "heading", level: 2, text: "Three travellers, three different right answers" },
  { id: "scenarios-comparison", type: "comparison", title: "Same city, same three options, different constraints", columns: [
    { heading: "Two nights, first visit", items: ["Arriving and leaving from the same node is doing most of the work", "Stay on that node's bank and cross once, in daylight, without luggage", "Do not try to split two nights across two banks", "Hankou usually wins here simply because more arrivals land there"] },
    { heading: "Early departure the next morning", items: ["The departure node decides, and nothing else gets a vote", "Check the first train on the metro line you would use, not the timetable of your train", "If the first metro is later than you need, you are booking a taxi in the dark across a river", "Being ten minutes further from your sights is a good trade for this"] },
    { heading: "Here for the historic streets, the riverfront or the university quarter", items: ["These pull in different directions: concession-era streets sit in Hankou, the lake and university belt in Wuchang", "Pick the one you actually care about most and base there", "Give the other one a half day and one crossing, not a daily commute", "The bridge and the Tortoise Hill side make Hanyang a real third option for the river itself"] },
  ]},

  { id: "friction-heading", type: "heading", level: 2, text: "Luggage, late returns and rain change the answer" },
  { id: "friction-copy", type: "paragraph", text: "Every crossing is easy until one of these three things is true. With luggage, a metro change that involves stairs and a long interchange corridor stops being trivial, which is why the advice above is to cross once on arrival rather than daily. Late at night, the question is not whether the metro exists but whether it is still running when you finish, and that is a per-line answer you have to check for the specific line and date rather than assume. In rain — and Wuhan gets serious summer rain — a plan built on walking between a metro exit and a hotel entrance becomes a plan built on a taxi queue at the moment everyone else wants one too." },
  { id: "friction-list", type: "list", ordered: true, items: [
    "Count the interchanges, not the stations. A single change with luggage is worth more than four extra stops on one line.",
    "Look at the exit, not the station. A large Wuhan interchange can put you a long walk from your hotel even when the dot on the map looks adjacent.",
    "Check the last service on your line for your date before you plan an evening on the other bank.",
    "Assume one wet day and ask whether your base still works when walking is unpleasant.",
    "If you have an early flight or train, walk the route on a map the night before and know where the taxi pick-up is.",
  ]},

  { id: "verify-heading", type: "heading", level: 2, text: "Check the property, not the district" },
  { id: "verify-copy", type: "paragraph", text: "Once you have chosen a bank, the remaining risk is property-level and has nothing to do with geography. Confirm these directly with the property before you commit, because none of them is reliably visible on a listing." },
  { id: "verify-checklist", type: "list", ordered: false, items: [
    "Which metro station and which numbered exit the property is actually reached from.",
    "Whether that exit has a lift or escalator, if you are carrying anything heavy.",
    "The real walking route from the exit at night, not the straight-line distance.",
    "Whether reception is staffed at the hour you will arrive, and at the hour you will leave.",
    "Whether the property can register your specific travel document — this varies property by property and is not a district-level fact.",
    "Where luggage can be left on your departure day if your room must be vacated before your train.",
  ]},
  { id: "verify-callout", type: "callout", title: "One thing this page will not tell you", tone: "neutral", body: "There is no bank of the river that is uniformly safe, uniformly convenient or uniformly good value, and any guide that says otherwise is describing a mood rather than a map. What is true is that some combinations of arrival, activity and departure force more river crossings than others, and crossings are the thing that costs you time. Everything above is an argument about crossings." },

  { id: "recovery-heading", type: "heading", level: 2, text: "If you have already booked the wrong side" },
  { id: "recovery-table", type: "table", caption: "Repair the itinerary before you repair the booking", columns: ["The problem", "What to do first"], rows: [
    ["You are in Hankou and departing from Wuhan Station early", "Treat the transfer as its own leg with its own margin; check the first metro on your line and have a car plan as the fallback"],
    ["You are in Wuchang and your days turned out to be in Hankou", "Keep the room and cross once each morning on a line that runs under the river, rather than rebooking mid-trip"],
    ["Your booking is far from any river crossing line", "Change the property before you change the itinerary; a base that forces a bus-plus-metro chain on every crossing will cost more than the room saved"],
    ["You arrived at a different station from the one you expected", "Do not start the hotel journey until you have read the full station name and found the correct exit; Wuhan's stations are large and the wrong exit is a long correction"],
    ["Rain has closed your walking route", "Move the day to the bank you are already on rather than crossing twice in bad weather"],
  ]},

  { id: "facts", type: "callout", title: "Reviewed 22 August 2026", tone: "neutral", body: "Administrative divisions and the three-towns description come from Wuhan municipal sources current at that date; the district count was 13 with 7 central districts. Station identities come from China Railway's live 12306 dictionary. Metro line assignments to the three stations are as stated in a 2022 municipal briefing, which also listed further lines as planned or under construction, so the network has grown since. The absence of a direct Hankou Station to Wuhan Station metro, and the 55-minute minimum, are as stated by the Wuhan Municipal Transport Bureau in January 2025 and will change when the Xingang line western extension opens. The 1.5 yuan ferry fare and the closed upper deck are as reported by the same bureau in October 2024. No first or last train time, fare or journey time in this guide should be treated as current for your date." },

  { id: "help", type: "callout", title: "Want your arrival, days and departure checked against a specific address?", tone: "decision", body: "Send the station or terminal you arrive at, the one you leave from, what you want to do on each day, your departure time and how much luggage you have. Homeground can tell you which bank that combination actually points to and where it breaks. Live metro times stay with the operator and live rail inventory stays with 12306." },

  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "Wuhan breakfast: hot dry noodles, doupi and where they sit", href: "/guides/wuhan-breakfast-hot-dry-noodles-doupi-route/", description: "What the morning looks like once you have chosen a bank." },
    { label: "Choosing a China hotel near the metro", href: "/guides/china-hotel-near-metro/", description: "The exit-level checks that decide whether a base actually works." },
    { label: "Foreign guests and Chinese hotels", href: "/guides/foreigners-china-hotel/", description: "Why document handling is a property-level question, not a district one." },
    { label: "Hotel fire and emergency exit checks", href: "/guides/china-hotel-emergency-exit-fire-safety-check/", description: "What to look at in the first five minutes of any check-in." },
    { label: "Why China's high-speed stations are so far out", href: "/guides/why-china-high-speed-stations-are-far-away/", description: "Why Wuhan Station sits where it does." },
    { label: "How to pay in China as a tourist", href: "/guides/how-to-pay-in-china-as-a-tourist/", description: "Including the ferry and the metro." },
    { label: "Reading Chinese city walls, gates and urban order", href: "/guides/chinese-city-walls-gates-and-urban-order/", description: "How to read why a Chinese city is shaped the way it is." },
    { label: "Why your map app is offset in China", href: "/guides/china-map-coordinate-offset-explained/", description: "Worth knowing before you trust a pin on the wrong bank." },
  ]},

  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Wuhan city profile: the three towns and the thirteen districts", url: "https://dfz.wuhan.gov.cn/sqgk/whsq/", publisher: "Wuhan Municipal Local Chronicles Office", reviewedAt: "2026-08-22" },
    { label: "What is the current administrative division of Wuhan? (seven central districts named)", url: "https://www.wuhan.gov.cn/zwgk/xxgk/zcwd/202111/t20211123_1857620.shtml", publisher: "Wuhan Municipal Civil Affairs Bureau, via the Wuhan Municipal Government portal", reviewedAt: "2026-08-22" },
    { label: "Fourteen rail transit lines planned to connect Wuhan's three main railway stations", url: "https://www.wuhan.gov.cn/sy/whyw/202203/t20220323_1944411.shtml", publisher: "Wuhan Municipal People's Government", reviewedAt: "2026-08-22" },
    { label: "Wuhan Station to Hankou Station in 25 minutes: an eighth cross-Yangtze metro tunnel", url: "https://jtj.wuhan.gov.cn/jtzx/zwdt/202501/t20250110_2516199.shtml", publisher: "Wuhan Municipal Transport Bureau", reviewedAt: "2026-08-22" },
    { label: "Hankou Station to Tianhe Airport in 12 minutes, with the metro comparison and gate-closing rule", url: "https://jtj.wuhan.gov.cn/jtzx/zwdt/202311/t20231109_2298362.shtml", publisher: "Wuhan Municipal Transport Bureau", reviewedAt: "2026-08-22" },
    { label: "The 1.5 yuan Yangtze ferry and the closure of the upper deck", url: "https://jtj.wuhan.gov.cn/jtzx/zwdt/202410/t20241023_2472496.shtml", publisher: "Wuhan Municipal Transport Bureau", reviewedAt: "2026-08-22" },
    { label: "12306 station dictionary used by the official booking site", url: "https://kyfw.12306.cn/otn/resources/js/framework/station_name.js", publisher: "China Railway 12306", reviewedAt: "2026-08-22" },
    { label: "Official railway ticket channel", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-22" },
    { label: "Hero: Wuhan Yangtze River Bridge in 2020 by Zheng Zhou, CC BY-SA 4.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Wuhan_Yangtze_River_Bridge_in_2020.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" },
    { label: "Hero derivative licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-22" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
