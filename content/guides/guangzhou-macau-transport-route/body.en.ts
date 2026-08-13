import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Choose the border route from both ends. Zhuhai Railway Station plus Gongbei usually suits a Macau Peninsula address and travellers who value more rail choices. Hengqin Railway Station plus Hengqin Port is often more direct for Cotai or a hotel with a confirmed connection from Macau's Hengqin LRT station. A Guangzhou hotel far from Guangzhou South, large luggage, a late arrival or current construction can still change the answer." },
  { id: "answer", type: "callout", title: "Compare the whole journey, not only the train", tone: "decision", body: "Time each part: Guangzhou address → Guangzhou South → train → border approach → immigration with your own bags → Macau transport → exact hotel. Search 12306 for both 珠海站 and 横琴站 on the travel date. Then compare the full journey and check the port's current official status." },
  { id: "chain-heading", type: "heading", level: 2, text: "The two main routes" },
  { id: "chain-matrix", type: "table", caption: "The Macau hotel location often decides between similar train times", columns: ["Route", "Usually strongest for", "Extra steps", "Do not assume"], rows: [
    ["Guangzhou South → 珠海站 → 拱北口岸 → 關閘", "Northern or central Macau Peninsula, or the rail option that best fits the date", "Exit the rail station, move to Gongbei, complete mainland and Macau immigration, then board Macau transport", "The Border Gate is close to every Macau hotel or open all night"],
    ["Guangzhou South → 横琴站 → 横琴口岸 → 橫琴口岸澳門口岸區", "Cotai, Taipa or a hotel with a verified Hengqin/LRT connection", "Navigate the integrated hub, immigration and then LRT/bus/taxi/hotel pickup", "A 24-hour port means the train, LRT and hotel shuttle also run 24 hours"],
    ["Guangzhou address → direct licensed road service → a named port", "A group whose Guangzhou start makes Guangzhou South a major detour", "Operator check-in, luggage loading, road traffic and the same immigration process", "A through vehicle removes immigration, entry eligibility or border queues"]
  ]},
  { id: "origin-heading", type: "heading", level: 2, text: "Start with the real Guangzhou address" },
  { id: "origin", type: "comparison", title: "Getting to the train can dominate the choice", columns: [
    { heading: "Near Guangzhou South", items: ["Rail is the clean default", "Compare both destination stations in 12306", "Keep station-entry and baggage margin"] },
    { heading: "Tianhe or central Guangzhou", items: ["Add the metro or taxi trip to Guangzhou South", "Allow for peak traffic and station walking", "A slightly later direct train can be safer than a tight connection"] },
    { heading: "Family or many cases", items: ["Count every lift, curb and queue", "Reserve enough vehicle capacity", "Avoid the route with an unnecessary station or port change"] }
  ]},
  { id: "baggage-heading", type: "heading", level: 2, text: "Your bag crosses every boundary with you" },
  { id: "baggage", type: "list", ordered: true, items: [
    "Leave the Guangzhou hotel with the passport, entry documents and rail record accessible—not buried in a suitcase.",
    "Unload at the correct Guangzhou South entrance and keep the group together through security and boarding.",
    "At Zhuhai or Hengqin, confirm the Chinese port name before following a driver or sign; the rail ticket is not a cross-border ticket.",
    "Carry and supervise luggage through mainland exit and Macau entry checks unless an official service explicitly says otherwise.",
    "After immigration, identify the Macau-side taxi, public transport, LRT or named hotel pickup before leaving the staffed arrival area.",
    "Ask the Macau hotel whether a shuttle accepts non-guests, large cases, late arrivals and the exact terminal zone; never infer this from an old timetable."
  ]},
  { id: "hours", type: "callout", title: "Port hours and onward transport are separate facts", tone: "warning", body: "When checked on August 13, 2026, Macau Customs listed the Border Gate/Gongbei passenger crossing as 06:00–01:00 and the Hengqin Macau Port Area as open 24 hours. Eligibility, mainland-side arrangements and temporary controls still require a fresh official check. Hengqin's passenger hall was also under phased construction in 2026, and officials advised travellers to check current congestion. Do not plan to reach a closing port in its final minutes." },
  { id: "scenarios-heading", type: "heading", level: 2, text: "Three realistic traveller decisions" },
  { id: "scenarios", type: "table", caption: "The shortest rail leg is not always the shortest trip", columns: ["Situation", "Working choice", "Why"], rows: [
    ["Couple near Guangzhou South staying by Senado Square", "Start with trains to Zhuhai Station, then continue through Gongbei and the Border Gate", "The Macau-side arrival is in the north of the peninsula; a good dated rail option may minimise the full trip"],
    ["Family with cases staying in Cotai", "Compare a direct dated train to Hengqin and the Hengqin Port/LRT or confirmed hotel pickup", "It can remove the need to cross Macau from the Border Gate, but only if the post-border connection is verified"],
    ["Late departure from a Tianhe hotel", "Choose the route with the largest combined margin, not automatically the 24-hour port", "The trip to Guangzhou South, last useful train and Macau onward service can end before immigration hours do"],
    ["One traveller cannot manage repeated lifting", "Book a vehicle with known luggage capacity at both city ends and choose fewer curbs/changes", "Station and border proximity on a map does not show vertical circulation or queues"]
  ]},
  { id: "eligibility-heading", type: "heading", level: 2, text: "Confirm that every traveller can complete both immigration checks" },
  { id: "eligibility", type: "callout", title: "This page does not decide immigration eligibility", tone: "neutral", body: "Check each passport, Macau admission basis and any mainland re-entry needed later against current official rules. The National Immigration Administration advises checking document and visa validity and provides the 12367 service line. A foreign passport holder should not copy a resident-only e-channel instruction. Keep enough time for staffed inspection." },
  { id: "recovery-heading", type: "heading", level: 2, text: "What to do when the chosen route no longer works" },
  { id: "recovery", type: "table", caption: "Stop at the last staffed, identifiable point", columns: ["Problem", "Response", "Do not do"], rows: [
    ["No suitable train to Hengqin", "Use 12306 to compare a dated train to Zhuhai, then assess Gongbei and the Macau-side transfer", "Assume an old advertised through service still runs"],
    ["Hengqin hall congestion or works", "Check the official live crossing platform, keep water and document access, and tell the hotel before the pickup window", "Switch ports mid-journey without checking the replacement port’s hours and road time"],
    ["Arrival near Gongbei after its useful window", "Ask official station or port staff about current options and be prepared to stay in Zhuhai", "Pay an unverified intermediary to bypass a closed or closing immigration point"],
    ["Hotel shuttle is missed after Macau entry", "Use the marked Macau taxi/public-transport area or LRT if operating and suitable for the address", "Accept an unsolicited ride without a clear destination and price method"],
    ["Passport or entry issue", "Stay with immigration officers, use official assistance and call 12367 when applicable", "Leave the immigration area or let the group split without a contact plan"]
  ]},
  { id: "verify-heading", type: "heading", level: 2, text: "Final checks on the travel date" },
  { id: "verify", type: "list", items: [
    "12306 shows the chosen train, exact destination station and current ticket record.",
    "The Chinese station and port names are saved offline.",
    "Every traveller’s passport and admission/re-entry documents are valid for the intended crossings.",
    "The official port page shows current hours, works and crowd notices.",
    "The Macau hotel has confirmed the exact post-border transport and late-arrival limit.",
    "Luggage capacity and step-free needs are confirmed, not assumed.",
    "A Zhuhai or Guangzhou hotel is available if the last useful connection is missed."
  ]},
  { id: "help", type: "callout", title: "Need the Guangzhou address and Macau hotel matched?", tone: "decision", body: "Send Homeground the date, Guangzhou pickup area, Macau hotel, group size, luggage and any mobility limit. We can compare the number of transfers and the spare time required; rail inventory, immigration decisions and port operations remain with the official authorities." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "Homeground transport and planning guides", href: "/guides/", description: "Return to the parent guide collection." },
    { label: "Guangzhou to Hong Kong transport", href: "/guides/guangzhou-hong-kong-transport-route/", description: "Plan the separate Guangzhou-to-Hong Kong border journey." },
    { label: "Hong Kong and Macau transport", href: "/guides/hong-kong-macau-transport-route/", description: "Compare ferry and bridge choices when Hong Kong is the actual origin." },
    { label: "Hong Kong–Macau–mainland re-entry count", href: "/guides/hong-kong-macau-mainland-reentry-count/", description: "Check the separate re-entry question before a multi-border itinerary." },
    { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Prepare for the rail process without duplicating it here." }
  ]},
  { id: "sources", type: "sources", title: "Official sources", items: [
    { label: "Hengqin Port current transport guide", url: "https://www.hengqin.gov.cn/macao_zh_hans/ztjh/qyh/mlhq/content/post_3825001.html", publisher: "Hengqin Guangdong–Macao In-Depth Cooperation Zone", reviewedAt: "2026-08-13" },
    { label: "July 2026 Hengqin passenger-hall works and live-status notice", url: "https://www.hengqin.gov.cn/macao_zh_hans/zwgk/tzgg/gg/content/post_3925145.html", publisher: "Hengqin Cooperation Zone", reviewedAt: "2026-08-13" },
    { label: "Macau passenger port operating hours", url: "https://www.customs.gov.mo/cn/notice_passengers_item4.html", publisher: "Macao Customs Service", reviewedAt: "2026-08-13" },
    { label: "Macau official arrival and port guidance", url: "https://www.macaotourism.gov.mo/zh-hant/article/before-you-travel/travelling-to-macao", publisher: "Macao Government Tourism Office", reviewedAt: "2026-08-13" },
    { label: "National Immigration Administration holiday document guidance", url: "https://www.nia.gov.cn/n897453/c1782642/content.html", publisher: "National Immigration Administration", reviewedAt: "2026-08-13" },
    { label: "China Railway live journey search", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-13" },
    { label: "Hero photograph: Hengqin Port exterior — Charlie fong (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:Hengqin_Port2021.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13" },
    { label: "Hero photograph licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0", publisher: "Creative Commons", reviewedAt: "2026-08-13" }
  ]}
] } as const satisfies StructuredPageBody;

export default body;
