import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Purple Mountain is not one attraction with three nearby labels. Nanjing's official operator describes a scenic system of about 31 square kilometres whose core zones include Ming Xiaoling, Dr. Sun Yat-sen's Mausoleum and Linggu. A sensible first visit therefore starts with a deletion decision. Choose two zones when time or walking capacity is limited; attempt all three only with a full day, a confirmed Mausoleum reservation and a current cross-area transfer. Move in one broad direction—west to east or east to west—rather than repeatedly returning to the same central stop." },
  { id: "answer", type: "callout", title: "The short route decision", tone: "decision", body: "For most first-time history visitors, Ming Xiaoling plus Dr. Sun Yat-sen's Mausoleum is the strongest two-zone pair: imperial landscape first, twentieth-century ceremonial architecture second. Add Linggu only if its temple-and-Republican-memorial layers are a genuine priority and the group can keep each earlier zone selective. If the Mausoleum reservation fails and a current cross-area transfer is verified, Ming Xiaoling plus Linggu remains a complete day. This is a directional strategy, not a promise that one fixed gate or shuttle line will work on every date." },

  { id: "system-heading", type: "heading", level: 2, text: "Why ‘Purple Mountain’ creates the wrong mental map" },
  { id: "system-copy", type: "paragraph", text: "Search results often compress the mountain into one pin. The official map does the opposite: it separates core scenic areas with their own entrances, internal walks, evidence and operating rules. Ming Xiaoling is a large imperial tomb landscape. The Sun Yat-sen Mausoleum is a steep, axial commemorative complex. Linggu is an eastern precinct where Buddhist, Ming and Republican-era layers overlap. Their shared forest setting does not make them interchangeable, and the time between ticket gates is not the same as the time needed inside them." },
  { id: "system-matrix", type: "table", caption: "Three zones, three different reasons to keep them", columns: ["Zone", "What you are actually choosing", "Walking commitment hidden by the name", "First reason to cut it"], rows: [
    ["Ming Xiaoling (明孝陵景区)", "A World Heritage imperial-tomb landscape: approach, Sacred Way and tomb-palace sequence", "The operator describes a complete historical line of about 2.6 km before optional branches", "Imperial funerary space is not a priority, or the group cannot sustain a long outdoor walk"],
    ["Dr. Sun Yat-sen's Mausoleum (中山陵景区)", "A twentieth-century ceremonial axis and national memorial", "The official site records 392 steps across ten platforms, with a 70-metre rise", "No valid reservation, or stairs are the decisive limitation"],
    ["Linggu (灵谷景区)", "A less axial eastern precinct with temple history, Beamless Hall, pagoda and Republican military memorials", "A separate zone after the other two, not a room attached to the Mausoleum", "Only two zones fit and the traveller's main contrast is Ming imperial versus Republican civic memorial"],
  ]},
  { id: "status-warning", type: "callout", title: "Only Ming Xiaoling is inscribed World Heritage here", tone: "warning", body: "UNESCO's serial property ‘Imperial Tombs of the Ming and Qing Dynasties’ added Ming Xiaoling in 2003. The scenic operator says the Sun Yat-sen Mausoleum and affiliated buildings entered China's World Heritage Tentative List in 2024. A Tentative List entry is not inscription, and neither status automatically extends to every attraction on Purple Mountain." },

  { id: "two-three-heading", type: "heading", level: 2, text: "Should you plan two zones or all three?" },
  { id: "two-three-copy", type: "paragraph", text: "The most useful measure is not opening-to-closing time. It is how many complete spatial stories the group can still read after transfers, queues and elevation. The planning bands below run from arrival at the first zone's entrance or document checkpoint to the planned exit from the final zone; they include internal queues and cross-area transfers, but not travel from a hotel or onward to a railway station. Two zones allow the visitor to follow at least one internal sequence rather than photographing three entrances. Three zones become defensible when Purple Mountain is the day's main task, the group accepts a selective version of each zone and there is no fixed evening booking competing with the exit." },
  { id: "time-budget", type: "table", caption: "Homeground planning bands, not walking-time guarantees", columns: ["Usable sightseeing time", "Default scope", "Condition"], rows: [
    ["About 2–3 hours", "One anchor zone", "Choose the historical question first; do not spend the visit transferring among three entrances"],
    ["About 4–6 hours", "Two zones", "Usually selective Ming Xiaoling plus the reserved Mausoleum; protect the reservation and exit"],
    ["About 7–8 hours", "Conditional three-zone day", "All three only with a confirmed slot, capable group, selective internal routes and current cross-area transport"],
    ["A summit or cableway is also essential", "A different Purple Mountain day", "Do not append the summit to the three-zone heritage plan"],
  ]},
  { id: "two-three-table", type: "table", caption: "Set the day's ambition before choosing an entrance", columns: ["Traveller situation", "Plan", "Protected experience", "Deliberate omission"], rows: [
    ["First visit, one substantial day, normal walking confidence", "Ming Xiaoling + Sun Yat-sen Mausoleum", "Two contrasting forms of commemoration with time to read each axis", "Linggu and minor branches"],
    ["Full day, strong walker, all three histories matter", "Ming Xiaoling → Mausoleum → Linggu, or reverse", "A directional three-zone survey", "Museum detours, summit, cableway and secondary scenic stops"],
    ["Older parent, child, stair concern or hot/wet weather", "One deep zone + one short confirmed zone", "Rest margin and a reliable exit", "The third zone and the longest internal branch"],
    ["Mausoleum reservation unavailable", "Ming Xiaoling + Linggu", "World Heritage landscape plus eastern temple/memorial layers", "The Mausoleum's restricted upper area; do not improvise entry"],
    ["Only half a day", "One zone chosen by historical question", "A complete approach-and-exit sequence", "The idea that three names equal three quick photo stops"],
  ]},

  { id: "ming-heading", type: "heading", level: 2, text: "How deep should you go inside Ming Xiaoling?" },
  { id: "ming-copy", type: "paragraph", text: "Ming Xiaoling is where an apparently simple attraction name hides the largest internal choice. The operator identifies Grand Golden Gate, Square City, the Sacred Way and the tomb-palace area as parts of the scenic area. A 2026 official feature describes the complete historical line from Xiama Archway to Baoding as about 2.6 kilometres. Another legitimate choice is a more direct entry near Stone Elephant Road. These are not equally deep visits, so decide whether you want the whole ceremonial approach or its most legible middle-and-tomb sequence." },
  { id: "ming-figure", type: "figure", src: "/images/guides/nanjing-purple-mountain-route/ming-xiaoling-1600.webp", alt: "Stone animal sculptures lining the Sacred Way at Ming Xiaoling in Nanjing", width: 1600, height: 1000, caption: "The stone animals are part of Ming Xiaoling's Sacred Way, not decorative sculpture shared by all of Purple Mountain. Read their paired placement and the changing direction of the approach before moving toward the tomb-palace area." },
  { id: "ming-depth", type: "table", caption: "Choose a Ming Xiaoling depth, not merely a ticket", columns: ["Version", "What to preserve", "What it costs", "When it works"], rows: [
    ["Complete historical line", "The long approach from Xiama Archway through major ceremonial components toward Baoding", "The greatest distance and least room for another deep zone", "Ming funerary landscape is the day's primary purpose"],
    ["Sacred Way + tomb-palace core", "Stone figures, directional change, water crossing and the transition into walled architecture", "Still substantial walking; some outer context is omitted", "You want the most legible spatial story before continuing east"],
    ["Short visual sample", "One clearly defined section near the current legal entry", "It cannot stand in for the complete World Heritage layout", "Mobility, weather or reservation timing forces a narrow visit"],
  ]},
  { id: "ming-watch", type: "list", items: [
    "At the approach, notice that distance and sequence are part of the monument; the tomb is not revealed from one plaza.",
    "On the Sacred Way, look for paired stone animals and human figures, then note how the route changes direction rather than following a single rigid line.",
    "At Square City and the later walled precinct, distinguish surviving masonry, repaired fabric and interpretation instead of calling every visible surface fourteenth-century original.",
    "Treat Baoding as the terminus of an above-ground ritual landscape; a visible mound is not permission to claim that the underground chamber is open.",
    "If the first half already uses the group's walking budget, shorten the next zone before fatigue turns the whole mountain into a shuttle search."
  ]},

  { id: "sun-heading", type: "heading", level: 2, text: "What does the Sun Yat-sen Mausoleum add—and what does the reservation control?" },
  { id: "sun-copy", type: "paragraph", text: "The Mausoleum changes the historical register and the body's movement. Its official page describes a 700-metre horizontal axis rising 70 metres from archway to sacrificial hall, divided into 392 steps and ten platforms. The climb is not incidental: changing views, pauses and the final approach are how the architecture constructs ceremony. That makes it a poor ‘quick stop’ when stairs are difficult, even though the reserved upper precinct itself does not require the long wandering found inside Ming Xiaoling." },
  { id: "sun-figure", type: "figure", src: "/images/guides/nanjing-purple-mountain-route/sun-yat-sen-1600.webp", alt: "Stone stairs rising to the stele pavilion at Dr. Sun Yat-sen's Mausoleum in Nanjing", width: 1600, height: 1000, caption: "This section shows how stairs, symmetry and a pavilion control the approach. It supports a stamina decision but does not show all 392 steps, the sacrificial hall, tomb gate or current access." },
  { id: "sun-observe", type: "list", ordered: true, items: [
    "Before climbing, frame the complete axis: archway, path, gates, platforms and hall belong to one composition.",
    "Use the platforms as viewing pauses. Look back to understand how the rise and expanding prospect change the visitor's position.",
    "Read dates and names on official labels before assigning a building to the wrong phase; construction began in 1926 and the main works were completed across later stages.",
    "At the restricted threshold, follow the day's access notice. Do not treat a previous visitor's tomb-chamber photograph as a current operating promise.",
    "Exit when the architectural question is answered; adding Music Stage or every affiliated structure can consume the margin reserved for Linggu."
  ]},
  { id: "passport", type: "callout", title: "Passport evidence has a limit", tone: "warning", body: "The operator's bilingual guide lists passports as valid real-name ticket documents, and a 2026 operator report says its upgraded scenic ticket system supports foreign passports for ticket purchase and document-swipe entry. Neither source documents every foreign-passport field or failure path in the separate free Mausoleum reservation. Test the current official channel before the day. If the passport cannot be entered, use the operator's visitor hotline rather than borrowing an identity number or relying on an unofficial seller." },

  { id: "linggu-heading", type: "heading", level: 2, text: "When is Linggu worth keeping?" },
  { id: "linggu-copy", type: "paragraph", text: "Keep Linggu when you want the mountain to end with accumulated layers rather than a third monumental façade. The official operator places it about one kilometre east of the Sun Yat-sen Mausoleum and lists temple history, the Beamless Hall, Linggu Pagoda, a National Revolutionary Army cemetery and other Republican memorials. The present precinct therefore cannot be reduced to ‘an old temple.’ Its value lies in reading how religious relocation, later architecture and twentieth-century commemoration occupy the same eastern ground." },
  { id: "linggu-figure", type: "figure", src: "/images/guides/nanjing-purple-mountain-route/linggu-1600.webp", alt: "A tree-lined stone approach leading to a temple hall in Linggu Scenic Area, Nanjing", width: 1600, height: 1000, caption: "The tree-lined approach identifies Linggu's temple precinct, one layer of the eastern zone. It does not show Linggu Pagoda, the Republican cemetery or the full scenic-area layout." },
  { id: "linggu-watch", type: "table", caption: "Read Linggu by layer", columns: ["What you see", "Question to ask", "Mistake to avoid"], rows: [
    ["Temple precinct and religious labels", "Which tradition or relocation phase does the current label describe?", "Calling the whole present precinct unchanged since the Six Dynasties"],
    ["Beamless Hall", "What construction and later memorial use does the interpretation identify?", "Assuming its current contents and original purpose are the same"],
    ["Cemetery, memorial arch and pagoda", "How did Republican commemoration reshape the site?", "Treating them as ancient Buddhist structures"],
    ["Woodland paths and dispersed graves", "How much of this layer can the group read before the planned exit?", "Continuing only because the zone looks quiet"],
  ]},
  { id: "linggu-cut", type: "callout", title: "The honest cut", tone: "neutral", body: "For a two-zone first visit centred on the strongest imperial-versus-modern contrast, Linggu is often the first deletion. That is Homeground planning judgment, not a ranking of historical importance. Keep Linggu instead when temple relocation, Republican military memory or a less axial eastern precinct is more valuable to you than completing both famous mausoleums." },

  { id: "direction-heading", type: "heading", level: 2, text: "Use a west–centre–east direction without inventing a universal gate sequence" },
  { id: "direction-copy", type: "paragraph", text: "On a map, Ming Xiaoling lies to the west, the Sun Yat-sen Mausoleum occupies the central-southern section and Linggu lies farther east. A west-to-east day can therefore progress from Ming Xiaoling through the Mausoleum to Linggu, while an east-to-west day reverses the logic. The direction reduces cross-area returns; it does not settle the correct entrance inside Ming Xiaoling, the day's shuttle stop or the final metro connection. Those operating details must come from the operator's current map and dated notice." },
  { id: "direction-steps", type: "list", ordered: true, items: [
    "Choose the primary zone and depth first. If Ming Xiaoling is primary, decide between its complete line and a shorter Sacred Way/core version before reserving the next zone.",
    "Place the Sun Yat-sen Mausoleum time slot so the group can reach its official checkpoint without rushing the first zone.",
    "Add Linggu only after identifying the current transfer into the eastern precinct and an official or staffed exit from it. Verify both before leaving the previous zone; if the transfer fails, stay at the staffed point, ask the operator or hotline and cut Linggu.",
    "Save the three Chinese names—明孝陵景区, 中山陵景区 and 灵谷景区—plus current gate or stop screenshots from the operator, because an English map pin may represent the wider zone.",
    "Set a deletion checkpoint after every major zone. Once the schedule slips, remove the farthest remaining zone rather than crossing the mountain twice.",
    "Keep summit, cableway, Meiling Palace, Music Stage and museums outside this three-zone plan unless one replaces—not merely joins—a core zone."
  ]},
  { id: "route-table", type: "table", caption: "Three executable shapes", columns: ["Shape", "Sequence", "Use it when", "Exit discipline"], rows: [
    ["Two-zone standard", "Selective Ming Xiaoling → reserved Mausoleum", "First-time contrast matters more than completion", "Finish near the second zone; do not travel east for a Linggu entrance photograph"],
    ["Three-zone directional day", "Selective Ming Xiaoling → reserved Mausoleum → selective Linggu", "Full day, capable walkers and verified current transfers", "Exit from the eastern side using the current plan rather than returning to the western start"],
    ["Reservation-failure day", "Ming Xiaoling → Linggu, with current cross-area transfer", "No Mausoleum slot or temporary upper-area closure", "Use the saved central time as rest/transfer margin, not as permission to add unrelated sights"],
  ]},

  { id: "traveller-heading", type: "heading", level: 2, text: "Match the route to the person who will tire first" },
  { id: "traveller-copy", type: "paragraph", text: "Purple Mountain punishes an itinerary designed around the fastest walker. The least mobile traveller determines whether the 392-step axis, the longer Ming Xiaoling line and a third eastern zone can coexist. This does not mean every older visitor should avoid the mountain. It means the route must contain a stopping point, a shared exit and an agreed deletion—not a plan where one person waits alone while the others continue without a reliable reunion place." },
  { id: "scenarios", type: "table", caption: "Two traveller scenarios and two specialist variations", columns: ["Traveller", "Start with", "Protect", "Do not assume"], rows: [
    ["A family with a parent who can walk steadily but avoids long stair climbs", "A selective Ming Xiaoling route", "Ground-level heritage reading and a current vehicle exit; view the Mausoleum axis only if the day's access and the parent's limit make sense", "That a shuttle removes the 392-step ceremonial climb"],
    ["A first-time visitor who loves architecture and has a fixed evening train", "Reserved Mausoleum first or a precisely bounded Ming Xiaoling core, depending on slot", "The fixed departure and one complete zone", "That ‘one more eastern stop’ is safe because Linggu looks close on the map"],
    ["A Ming-history specialist", "The complete Ming Xiaoling line", "Approach sequence, museum only if currently open and the tomb precinct", "That the other two zones must still fit"],
    ["A Republican-history specialist", "Mausoleum + Linggu", "Ceremonial axis, cemetery and memorial architecture", "That Ming Xiaoling is compulsory because it is the UNESCO site"],
  ]},

  { id: "operations-heading", type: "heading", level: 2, text: "Which facts must be checked again on the actual week?" },
  { id: "operations-copy", type: "paragraph", text: "The physical relationship among the three zones is durable; the operating layer is not. In 2026 the operator published different service guides for Spring Festival, Qingming/Spring Holiday and May Day, including special hours, access restrictions, traffic controls and shuttle lines. A July 2026 operator report described a 1+2+4+N shuttle layout. These sources prove that the system is actively managed, not that one captured timetable will remain valid for your date." },
  { id: "operations-table", type: "table", caption: "Durable map versus live operating screen", columns: ["Decision", "Use durable evidence for", "Recheck live for"], rows: [
    ["Zone order", "Ming Xiaoling west, Mausoleum central, Linggu east", "Open entrances, road controls and the day's legal transfer"],
    ["Mausoleum", "392-step ceremonial axis and historical role", "Reservation channel, time slot and accessible upper areas"],
    ["Ming Xiaoling", "Complete line versus selective core", "Open gates, museum status and current ticket product"],
    ["Linggu", "Its separate eastern identity and historical layers", "Open components, ticket and final shuttle/exit"],
    ["Passport", "Operator recognition of passports as real-name documents", "Whether the current interface accepts the document cleanly and how entry is verified"],
  ]},
  { id: "no-freeze", type: "callout", title: "This page deliberately does not freeze prices or last buses", tone: "neutral", body: "A copied price can become wrong; a copied last bus can strand the visitor in the wrong zone. Open the current operator notice, ticket screen and shuttle map immediately before travel. If no current official instruction answers the passport or transfer question, narrow the route instead of filling the gap with a third-party promise." },

  { id: "recovery-heading", type: "heading", level: 2, text: "How do you recover when the planned day breaks?" },
  { id: "recovery-table", type: "table", caption: "Purple Mountain failure recovery", columns: ["Failure", "Immediate edit", "Stop condition"], rows: [
    ["No Sun Yat-sen Mausoleum reservation", "Use Ming Xiaoling + Linggu, or deepen Ming Xiaoling alone", "Do not buy an unofficial identity workaround or wait at the gate without an operator-approved path"],
    ["Ming Xiaoling takes longer than planned", "Keep the Mausoleum slot and delete Linggu", "Leave the tomb zone with enough transfer margin; do not trade a valid reservation for a third checklist item"],
    ["Stairs or fatigue become limiting", "Stop the climb or use one ground-level zone; agree on a shared exit", "Pain, instability or the least mobile traveller's stated limit ends the expansion"],
    ["Rain, heat warning or poor surface conditions", "Reduce Ming Xiaoling depth and remove the third zone", "An official warning, closed path or unsafe footing overrides the itinerary"],
    ["Shuttle route changes or capacity fails", "Delete the farthest remaining zone and use the last confirmed exit", "Never walk an unknown inter-zone road simply because an old map shows a line"],
    ["An optional museum or upper room is closed", "Read the outdoor architecture and official panels; keep the core sequence", "Do not cross the whole mountain for a substitute with a different subject"],
    ["No English interpretation", "Use prepared Chinese place names and focus on the visible questions already listed for each zone", "Do not infer dates, restoration or symbolism from appearance alone"],
  ]},

  { id: "final-heading", type: "heading", level: 2, text: "The final decision: keep the contrast, not the count" },
  { id: "final-copy", type: "paragraph", text: "Ming Xiaoling, the Sun Yat-sen Mausoleum and Linggu earn their place by answering different questions. The first shows how an imperial tomb uses a long landscape sequence. The second turns a steep modern axis into public commemoration. The third collects religious relocation and Republican memory in an eastern precinct. A successful day preserves two or three of those readings in a coherent direction. It does not prove success by crossing three ticket gates." },
  { id: "fit-table", type: "table", caption: "Who should choose what", columns: ["Priority", "Best first plan", "What to skip"], rows: [
    ["Strongest first-time historical contrast", "Ming Xiaoling + Sun Yat-sen Mausoleum", "Linggu and secondary branches"],
    ["Ming imperial landscape", "Deep Ming Xiaoling, then stop or add one short reserved zone", "A rushed three-zone circuit"],
    ["Republican architecture and memory", "Mausoleum + Linggu", "Ming Xiaoling unless there is enough time for a meaningful core"],
    ["Low stair tolerance", "Selective Ming Xiaoling or Linggu after checking current surfaces", "Assuming transport removes every climb"],
    ["No interest in tombs, memorials or long outdoor walking", "Skip Purple Mountain without guilt", "A compulsory three-name checklist"],
  ]},
  { id: "facts", type: "callout", title: "Evidence boundary, reviewed 1 September 2026", tone: "neutral", body: "Official and UNESCO sources establish the zones' geography, physical dimensions, historical identities and Ming Xiaoling's World Heritage status. Dated operator notices establish that reservations, access and shuttles change. The two-zone default, west–east direction and deletion rules are Homeground planning judgments. They are not official mandated itineraries, walking-time guarantees or accessibility certifications." },
  { id: "checklist", type: "list", items: [
    "Choose two zones by default; add the third only when it contributes a specific historical layer.",
    "Select Ming Xiaoling's depth: complete 2.6-km historical line, Sacred Way/core, or a deliberately short sample.",
    "Secure and test the Sun Yat-sen Mausoleum reservation with the actual passport before the visit day.",
    "Open the latest operator notice for entrances, upper-area access, weather controls and shuttle map.",
    "Save 明孝陵景区, 中山陵景区 and 灵谷景区 plus the current entrance/stop—not only English map pins.",
    "Set a deletion checkpoint, shared exit and walking limit for the least mobile traveller.",
    "Do not add summit, cableway, Music Stage, Meiling Palace or museums unless one replaces a core zone.",
    "If the shuttle or reservation fails, use a complete two-zone or one-zone recovery rather than an unofficial workaround."
  ]},
  { id: "links", type: "internal-links", title: "Connect this mountain decision to the wider trip", items: [
    { label: "Order Shanghai, Suzhou, Hangzhou and Nanjing", href: "/guides/shanghai-suzhou-hangzhou-nanjing-route-order/", description: "Use the regional route guide to decide whether Nanjing belongs in the trip; use this page only after the city is fixed." },
    { label: "Compare Chinese city walls, gates and urban order", href: "/guides/chinese-city-walls-gates-and-urban-order/", description: "Keep Nanjing's wall evidence with its own cross-city comparison rather than adding it to Purple Mountain day." },
  ]},
  { id: "sources", type: "sources", title: "Official, heritage and image sources", items: [
    { label: "Bilingual Zhongshan Mountain visitor guide", url: "https://zschina.nanjing.gov.cn/zszx/dtxx/202506/t20250626_5593899.html", publisher: "Nanjing Zhongshan Scenic Area Administration", reviewedAt: "2026-09-01" },
    { label: "Ming Xiaoling Scenic Area", url: "https://zschina.nanjing.gov.cn/fjms/jqjd/mxljq/", publisher: "Nanjing Zhongshan Scenic Area Administration", reviewedAt: "2026-09-01" },
    { label: "Dr. Sun Yat-sen's Mausoleum Scenic Area", url: "https://zschina.nanjing.gov.cn/fjms/jqjd/zsljq/", publisher: "Nanjing Zhongshan Scenic Area Administration", reviewedAt: "2026-09-01" },
    { label: "Linggu Scenic Area", url: "https://zschina.nanjing.gov.cn/fjms/jqjd/lgjq/", publisher: "Nanjing Zhongshan Scenic Area Administration", reviewedAt: "2026-09-01" },
    { label: "Imperial Tombs of the Ming and Qing Dynasties", url: "https://whc.unesco.org/en/list/1004", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-09-01" },
    { label: "Official complete Ming Xiaoling route explanation", url: "https://zschina.nanjing.gov.cn/lyzx/202608/t20260821_5897707.html", publisher: "Nanjing Zhongshan Scenic Area Administration", reviewedAt: "2026-09-01" },
    { label: "2026 shuttle-network optimisation report", url: "https://zschina.nanjing.gov.cn/zszx/zsdt/202607/t20260706_5871550.html", publisher: "Nanjing Zhongshan Scenic Area Administration", reviewedAt: "2026-09-01" },
    { label: "Dated 2026 Spring Holiday service guide", url: "https://zschina.nanjing.gov.cn/lyzx/202604/t20260401_5816920.html", publisher: "Nanjing Zhongshan Scenic Area Administration", reviewedAt: "2026-09-01" },
    { label: "Dated 2026 Spring Festival service guide", url: "https://zschina.nanjing.gov.cn/lyzx/202602/t20260214_5794915.html", publisher: "Nanjing Zhongshan Scenic Area Administration", reviewedAt: "2026-09-01" },
    { label: "Dated 2026 May Day service guide", url: "https://zschina.nanjing.gov.cn/lyzx/202604/t20260430_5833519.html", publisher: "Nanjing Zhongshan Scenic Area Administration", reviewedAt: "2026-09-01" },
    { label: "Dated 2026 Mausoleum reservation reminder", url: "https://zschina.nanjing.gov.cn/lyzx/202606/t20260618_5862979.html", publisher: "Nanjing Zhongshan Scenic Area Administration", reviewedAt: "2026-09-01" },
    { label: "Foreign-visitor ticket-system upgrade", url: "https://zschina.nanjing.gov.cn/lyzx/202601/t20260108_5760022.html", publisher: "Nanjing Zhongshan Scenic Area Administration", reviewedAt: "2026-09-01" },
    { label: "Extreme-weather closure advisory", url: "https://zschina.nanjing.gov.cn/lyzx/202607/t20260709_5874031.html", publisher: "Nanjing Zhongshan Scenic Area Administration", reviewedAt: "2026-09-01" },
    { label: "Official overview map and virtual-tour hub", url: "https://zschina.nanjing.gov.cn/fjms/xnly/", publisher: "Nanjing Zhongshan Scenic Area Administration", reviewedAt: "2026-09-01" },
    { label: "Nanjing View by alexrudd", url: "https://commons.wikimedia.org/wiki/File:Nanjing_View.png", publisher: "Wikimedia Commons, CC BY-SA 2.0", reviewedAt: "2026-09-01" },
    { label: "Ming Xiaoling Sacred Way by Xiquinho Silva", url: "https://commons.wikimedia.org/wiki/File:Ming_Xiaoling_Mausoleum_(54438146293).jpg", publisher: "Wikimedia Commons, CC BY 2.0", reviewedAt: "2026-09-01" },
    { label: "Sun Yat-sen Mausoleum stele-pavilion stairs by Yumeto", url: "https://commons.wikimedia.org/wiki/File:20231124_Zhongshan_Ling_(084845).jpg", publisher: "Wikimedia Commons, CC BY-SA 4.0", reviewedAt: "2026-09-01" },
    { label: "Linggu Temple approach by Chainwit.", url: "https://commons.wikimedia.org/wiki/File:Linggu_Temple_(2024-Apr)_-_img_01.jpg", publisher: "Wikimedia Commons, CC BY 4.0", reviewedAt: "2026-09-01" },
    { label: "Creative Commons Attribution-ShareAlike 2.0 licence", url: "https://creativecommons.org/licenses/by-sa/2.0/", publisher: "Creative Commons", reviewedAt: "2026-09-01" },
    { label: "Creative Commons Attribution 2.0 licence", url: "https://creativecommons.org/licenses/by/2.0/", publisher: "Creative Commons", reviewedAt: "2026-09-01" },
    { label: "Creative Commons Attribution-ShareAlike 4.0 licence", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-09-01" },
    { label: "Creative Commons Attribution 4.0 licence", url: "https://creativecommons.org/licenses/by/4.0/", publisher: "Creative Commons", reviewedAt: "2026-09-01" },
  ]},
] } as const satisfies StructuredPageBody;

export default body;
