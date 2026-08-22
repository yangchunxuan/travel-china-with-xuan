import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Enter through Guangji Gate, walk the river wall first, then turn inland and come back along the arch street — and treat the bridge as something you look at before you decide whether you can cross it. Chaozhou's old city has an unusually legible shape: one surviving stretch of wall along the Han River with four gates in a row, one long north-south street through the middle, and a dense grid of lanes between them. Walk it in that order and you never double back. Walk it as a list of sights and you will cross the same street six times." },

  { id: "answer", type: "callout", title: "The shape in one paragraph", tone: "decision", body: "The old city sits with its back to the hills and its face to the river. Only the east wall survives, running from Jinshan at the north end down to the South Gate, where it joins the river dyke. Four gates pierce it. Taiping Road runs north to south through the middle as the old central axis, carrying the memorial arches. Between the wall and that axis lies the lane grid where people still live. Guangji Bridge starts outside the middle gate and crosses to the far bank. That is the whole map, and every route decision below is about the order you take those four elements in." },

  { id: "geography-heading", type: "heading", level: 2, text: "One wall, four gates, one axis, and a grid" },
  { id: "geography-copy", type: "paragraph", text: "It helps to know why the city looks like this. Guangdong's own provincial and municipal chroniclers describe a wall circuit reaching back at least to the Tang as rammed earth, rebuilt in brick from the Song, standing at around 5.3 kilometres by the Southern Song with as many as eleven gates, faced in stone under the Ming and repaired again under the Qing. The extent barely changed from Song to Qing. Then, in the early Republic, the south, west and north walls came down to make roads and other municipal works — and the riverside wall was kept. It was kept because it was useful: it is also a flood dyke." },
  { id: "geography-copy2", type: "paragraph", text: "That single decision produced the shape you walk today. The wall you can climb is an east-facing embankment with the Han River on one side and the living city on the other, and the four gates in it are not decorative. The chroniclers record that when the river rises, boards are dropped into the gate openings and sandbags are stacked behind them, so the defensive wall becomes a barrier against water. They note that this city-wall-as-dyke survives in only a handful of places nationally, with Chaozhou as the type example, and that it still performs the job. Of the four, Guangji Gate — the East Gate, directly facing the bridge — is the grandest: three storeys, five bays wide, one of the few Ming gate towers left standing." },
  { id: "geography-table", type: "table", caption: "The four elements, and what each one is actually for", columns: ["Element", "What it is", "What it gives you on foot"], rows: [
    ["The east wall", "The only surviving stretch, from Jinshan in the north to the South Gate, doubling as a flood dyke", "A raised, uninterrupted walking line with the river on one side and roof lines on the other"],
    ["The four gates", "Shangshuimen, Zhumumen, Guangjimen and Xiashuimen, set in that wall", "Four fixed points where you can drop off the wall into the city, or climb back onto it"],
    ["Taiping Road", "The old north-south central axis through the middle of the city, carrying twenty-three stone memorial arches", "A single spine you can follow end to end without a map"],
    ["The lanes", "The grid between the axis and the wall, including the ten named lanes local people still recite", "Where the city is actually lived in, and where you slow down"],
  ]},
  { id: "geography-callout", type: "callout", title: "The gate names tell you what the river did", tone: "neutral", body: "Read them in river order and the old economy appears. The upper and lower water gates sit upstream and downstream; the bamboo-and-timber gate is named for what came down the river to be traded there. Goods arriving from upstream — mountain produce, bamboo and timber — and from downstream — seafood, salt, dried fish — were traded around those gates, and the streets behind them became the city's commercial quarter. That is why the east side of the old city is the busy side and the north was the administrative one." },

  { id: "route-heading", type: "heading", level: 2, text: "The main route, in the order that avoids backtracking" },
  { id: "route-copy", type: "paragraph", text: "This is one continuous loop of roughly half a day at an unhurried pace, longer if you stop for tea, which you will be invited to do. It is written from the north because the wall is easier to read walking downstream, with the river on your left and the city falling away on your right." },
  { id: "route-list", type: "list", ordered: true, items: [
    "Start at the northern end of the wall, where it begins under Jinshan, and get up onto the walking surface rather than following the road below it.",
    "Walk south along the wall past the upper water gate, keeping the river on your left. This is the quietest stretch and the best place to understand that you are standing on a dyke.",
    "Come down at the bamboo-and-timber gate and look inland: the streets behind it are the old trading quarter, and their width and orientation are the reason.",
    "Rejoin the wall and continue to Guangji Gate. Stop here. This is the pivot of the whole walk, and the point at which you decide about the bridge — see the next section before you commit.",
    "Whether or not you cross, come back through Guangji Gate into the city and pick up Taiping Road, which runs away from the gate through the middle of the old city.",
    "Walk the arch street north to south, or south to north, but walk it in one direction. Twenty-three stone arches stand along it; reading their inscriptions is the point, not photographing all of them.",
    "Turn off the axis into the lanes at two or three points, not at every junction. Go in a few dozen metres, look, and come back out. This is the part of the walk people rush and then say the old city was crowded.",
    "Finish by returning to the wall at the lower water gate, at the southern end, where the wall runs on toward the South Gate and the dyke.",
  ]},
  { id: "route-callout", type: "callout", title: "Why this direction", tone: "decision", body: "Walking the wall first fixes the geography in your head before you are inside the grid, so the lanes stop being a maze. Doing the arch street second means you meet it with the river already behind you, which is the order the city itself was built in. And leaving the lanes to the end means you enter them at walking pace rather than at sightseeing pace, which matters, because people live there." },

  { id: "bridge-heading", type: "heading", level: 2, text: "The bridge is sometimes not a bridge" },
  { id: "bridge-copy", type: "paragraph", text: "Guangji Bridge is the reason most people come, and the single most common way a Chaozhou walking plan fails is assuming it is a fixed crossing. It is not. Provincial reporting citing the city's own ancient-city heritage management centre describes a structure that combines three bridge types — beam, arch and pontoon. Stone piers carry beam spans from each bank toward the middle, and the middle itself is a pontoon of eighteen linked boats. That pontoon closes in the morning and opens in the evening. When it is open, the two halves of the bridge are two piers with water between them." },
  { id: "bridge-copy2", type: "paragraph", text: "The history explains the design. The first version, from 1171, was a single stone pier with boats chained across the rest of the river. Later officials extended piers outward from both banks and reduced the number of boats, until a sixteenth-century reduction to eighteen produced the configuration a local rhyme still names. The moving section was never decoration: it let shipping through and let floodwater pass. A twentieth-century restoration completed in 2007 rebuilt the Ming appearance and settled the bridge's modern role as a pedestrian sightseeing bridge rather than a road." },
  { id: "bridge-table", type: "table", caption: "What to do at Guangji Gate, depending on what the bridge is doing", columns: ["What you find", "What it means", "How the route changes"], rows: [
    ["The pontoon is closed and the bridge is walkable", "You can cross to the far bank and come back", "Add the crossing here, then return through the same gate and continue with Taiping Road"],
    ["The pontoon is open and the middle is water", "You can walk out along one half and back, but not across", "Walk out as far as it goes, come back, and treat the far bank as a separate trip"],
    ["The bridge is closed altogether", "Weather, water level, maintenance or an event", "Do the wall and the arch street as planned; the walk stands on its own without the bridge"],
    ["You want to see it from outside", "The best view of the structure is from the bank, not from on it", "Walk the wall stretch beside it instead, which costs nothing and is always available"],
  ]},
  { id: "bridge-warning", type: "callout", title: "Check the state of the bridge before you build a day around it", tone: "warning", body: "This page owns the walking sequence, not the bridge's opening times, ticketing or event calendar, and it deliberately publishes none of them — they change, and they are the operator's to state. Treat the bridge as a variable in your plan rather than a fixture. If crossing matters to you, confirm on the day, and go early rather than at dusk." },

  { id: "lanes-heading", type: "heading", level: 2, text: "The lanes, and how to be a decent guest in them" },
  { id: "lanes-copy", type: "paragraph", text: "The lane grid is what makes Chaozhou unusual among Chinese old cities, and it is also the part most easily got wrong. Provincial reporting quotes a scholar describing Chaozhou as a living old city, one that has not turned into a museum or a shopping set, and whose most vivid feature is the ordinary, unhurried life of the people who still live in it. Older residents recite ten lane names in a set order the way you might recite a rhyme; those lanes hold the best-preserved traditional courtyard houses, and many of them still have families inside, with clan inscriptions above the doorways." },
  { id: "lanes-list", type: "list", ordered: false, items: [
    "Go in from the arch street, look, and come back out. Do not use the lanes as a through route to save two minutes.",
    "A doorway that is open is not an invitation. Photograph the street, the roofline and the carved door frames; do not photograph into courtyards or through windows.",
    "Some passages narrow to shoulder width and are private access rather than public street. If it feels like someone's hallway, it probably is. Turn round.",
    "If you are offered tea, that is genuine, and accepting it is the most Chaozhou thing you can do. Sitting down for twenty minutes will teach you more about the city than the next three lanes would.",
    "Keep your voice down in the early morning and after dark. The lanes carry sound and the walls are thin.",
  ]},
  { id: "lanes-callout", type: "callout", title: "Reading a lane instead of collecting it", tone: "neutral", body: "Look at where a lane meets the axis, and at how the doorways sit relative to the street. The old city's quarters were laid out on a deliberate scheme — the administrative district in the north, residential in the south, commercial in the east toward the water gates, and craft and common housing in the west — and the lanes still carry that logic in their width, their surfaces and what is on the ground floor. Two lanes read properly are worth a dozen walked through." },

  { id: "short-heading", type: "heading", level: 2, text: "The shortened route, for bad weather or half a day" },
  { id: "short-copy", type: "paragraph", text: "Chaozhou is hot for much of the year and gets serious rain, and the wall has almost no shade. A shortened version exists and it is not a lesser walk — it simply drops the exposed sections." },
  { id: "short-comparison", type: "comparison", title: "Three versions of the same walk", columns: [
    { heading: "Full loop", items: ["Wall from the north end to the lower water gate", "Guangji Gate and the bridge decision", "Taiping Road end to end", "Two or three lanes, entered and left"] },
    { heading: "Short version, ninety minutes", items: ["Enter at Guangji Gate", "Ten minutes on the wall in each direction, for the view and the dyke", "Taiping Road in one direction only", "One lane"] },
    { heading: "Rain version", items: ["Skip the wall, which is exposed and slippery", "Use the arcaded frontages along the arch street, which are covered", "Lanes only where they are paved and lit", "Sit out the worst of it over tea; this is normal here, not a failure"] },
  ]},

  { id: "names-heading", type: "heading", level: 2, text: "Chinese name card and the places people get wrong" },
  { id: "names-copy", type: "paragraph", text: "Signage is good but taxi and ride-hailing pickups are easier with the characters. The confusions below are the ones that actually send people to the wrong side of the city." },
  { id: "names-table", type: "table", caption: "Show the characters, and know what is easy to confuse", columns: ["English", "Chinese", "What it is", "Easy mistake"], rows: [
    ["Chaozhou Ancient City", "潮州古城", "The walled old city area as a whole", "Assuming it is a ticketed enclosure; it is a living district"],
    ["Guangji Gate tower", "广济门城楼", "The east gate and the pivot of this walk", "Confusing the gate tower with the bridge that starts outside it"],
    ["Guangji Bridge", "广济桥", "The bridge across the Han River", "Also called Xiangzi Bridge locally, so both names appear"],
    ["Paifang Street", "牌坊街", "The arch street along the central axis", "Looking for a separate street; it is Taiping Road"],
    ["Taiping Road", "太平路", "The old north-south axis itself", "Older residents may call it simply the main street"],
    ["Upper water gate", "上水门", "The northernmost of the four gates", "Mixing it up with the lower water gate at the other end"],
    ["Lower water gate", "下水门", "The southernmost of the four", "As above; the names differ by one character"],
    ["Bamboo and timber gate", "竹木门", "The gate of the old trading quarter", "Reading it as a decorative name rather than a functional one"],
    ["Han River", "韩江", "The river the wall faces", "Confusing the river with Hanshan, the hill on the far bank"],
  ]},

  { id: "fallback-heading", type: "heading", level: 2, text: "When something is shut" },
  { id: "fallback-table", type: "table", caption: "Nothing here requires the plan to be abandoned", columns: ["What has gone wrong", "What to do instead"], rows: [
    ["The bridge is open, closed or unavailable", "Do the wall and the arch street; view the bridge from the bank, which is where its shape actually reads"],
    ["A gate or a stretch of wall is closed", "Drop into the city at the previous gate and rejoin further along; the axis runs parallel to the wall"],
    ["You came in at the wrong end of the city", "Reverse the whole sequence rather than crossing to the start; the loop works in either direction"],
    ["Heavy rain", "Use the covered frontages of the arch street and postpone the wall; do not walk a wet wall in a hurry"],
    ["The lanes feel too busy", "Go two streets further along the axis and enter there; the crowding is very local and does not extend far"],
    ["You have less time than you thought", "Cut the lanes, not the wall. The wall is what explains the city; the lanes are what reward a second visit"],
  ]},

  { id: "facts", type: "callout", title: "Reviewed 22 August 2026", tone: "neutral", body: "The wall's history, its surviving extent, its role as a flood dyke and the four gates are as recorded by Guangdong's provincial local-chronicles office together with Chaozhou's municipal chronicles office. The bridge's structure, its three combined bridge types, the eighteen-boat pontoon that closes in the morning and opens in the evening, and its modern role as a pedestrian bridge are as reported by Guangdong provincial sources citing the city's ancient-city heritage management centre. The central axis, the twenty-three arches, the quarter layout and the ten named lanes come from the same provincial reporting. **Chaozhou's own municipal and district government sites could not be opened from the network used for this research**, so nothing here rests on a page that was not read in full; see the source log for exactly which two gate names are corroborated rather than directly verified. No opening time, ticket, price or event date appears anywhere on this page, because all of those belong to the operators and all of them change." },

  { id: "help", type: "callout", title: "Want the walk fitted around your arrival and the light?", tone: "decision", body: "Tell us when you arrive, how long you have, and whether crossing the bridge matters to you. Homeground can order the loop around your actual hours and tell you what to drop if the bridge is not available. Current bridge and gate status stays with the operators, and we will not pretend to know it in advance." },

  { id: "links", type: "internal-links", title: "Continue reading", items: [
    { label: "Reading Chinese city walls, gates and urban order", href: "/guides/chinese-city-walls-gates-and-urban-order/", description: "Why a Chinese city has the shape it has, and what a gate was for." },
    { label: "Qiaopi letters, remittances and migration", href: "/guides/qiaopi-letters-remittances-and-migration/", description: "The Chaoshan network that built many of the houses in these lanes." },
    { label: "Yingge dance beyond the viral clips", href: "/guides/yingge-dance-beyond-the-viral-clips/", description: "The regional performance tradition, with its own guide rather than a paragraph here." },
    { label: "The Grand Canal as everyday urban history", href: "/guides/grand-canal-everyday-urban-history/", description: "Another case of reading a waterway as the reason a city is shaped that way." },
    { label: "How to read a Suzhou garden", href: "/guides/how-to-read-a-suzhou-garden/", description: "The same habit of looking, applied to a very different kind of enclosure." },
    { label: "Dougong and reading a Chinese timber frame", href: "/guides/dougong-and-chinese-timber-frame-reading/", description: "Useful before you look up at a gate tower or an arch." },
    { label: "How Guangzhou morning tea works", href: "/guides/how-guangzhou-morning-tea-works/", description: "A different Guangdong tea culture, and not the same thing as what you will be offered here." },
  ]},

  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Poetic Chaozhou: the ancient city wall — history, surviving extent, the four east gates and the wall as flood dyke", url: "http://dfz.gd.gov.cn/zjgd/content/post_3058024.html", publisher: "Guangdong Provincial People's Government Local Chronicles Office and Chaozhou Municipal Local Chronicles Compilation Committee Office", reviewedAt: "2026-08-22" },
    { label: "Chaozhou's Guangji Bridge: structure, the eighteen-boat pontoon, its morning closing and evening opening, and the 2003-2007 restoration", url: "http://www.qb.gd.gov.cn/jrqx/content/post_1250040.html", publisher: "Overseas Chinese Affairs Office of the People's Government of Guangdong Province", reviewedAt: "2026-08-22" },
    { label: "Chaozhou Ancient City: the Song street pattern, the quarter layout, Taiping Road as the axis, the twenty-three arches and the ten named lanes", url: "http://www.qb.gd.gov.cn/mlgd/content/post_981941.html", publisher: "Overseas Chinese Affairs Office of the People's Government of Guangdong Province", reviewedAt: "2026-08-22" },
    { label: "Hero: Guangji Bridge with the pontoon section opened, by Windmemories, CC BY-SA 4.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:20230206_Guangji_Bridge_01.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" },
    { label: "Hero derivative licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-22" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
