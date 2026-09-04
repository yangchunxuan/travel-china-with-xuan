import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "A tea-hill visit in Hangzhou is not one interchangeable ‘Longjing experience.’ Longjing Village is a residential settlement folded into steep tea slopes. Meijiawu is another working village and an official starting point for a longer hill route when you choose to walk it. China National Tea Museum is one institution with two separate campuses, each offering a different kind of evidence. Choosing among them first prevents a half-day from dissolving into traffic, sales invitations and a hike you never intended to take." },
  { id: "answer", type: "callout", title: "The short answer", tone: "decision", body: "Choose Longjing Village when the relationship between houses, public lanes and hillside tea plots is your priority; keep it compact by defining a village-edge observation rather than an open-ended hill walk. Choose Meijiawu when you intend to enter the official hill-route concept for a longer field-and-village walk and can manage the return without treating every tea shop as an attraction. Choose the museum when you need labels, objects and historical context—or when weather makes a field day poor. For a first tea-focused half-day, pair one village with one museum campus; do not collect both villages and both campuses merely because every name contains ‘tea.’" },

  { id: "decision-heading", type: "heading", level: 2, text: "Choose the evidence you want before choosing the name" },
  { id: "decision-matrix", type: "table", caption: "The three-way Hangzhou tea decision", columns: ["What you want", "Best first choice", "What it gives you", "What it does not guarantee"], rows: [
    ["See a village embedded in famous tea hills", "Longjing Village", "A homes–public lanes–slopes relationship that can be kept compact by setting a clear boundary", "Harvest work, a public route through every plot or trustworthy tea sales"],
    ["Enter the official hill-route concept for a longer walk", "Meijiawu", "A starting point for making the tea landscape itself the visit", "A quieter day, a free tasting or permission to enter working rows"],
    ["Understand tea through objects and explanations", "China National Tea Museum, usually Shuangfeng first", "Structured context for Chinese tea and West Lake Longjing", "That both campuses are open or that an activity is running"],
    ["Compare tea beyond Hangzhou", "Museum Longjing campus", "World-tea and intangible-heritage themes in a hill setting", "That it is the same building as Shuangfeng or next door to it"],
    ["Keep a rain or heat fallback", "One museum campus", "A visit that is not entirely dependent on exposed field paths", "A fully indoor, step-free or reservation-free experience"],
    ["Buy tea with confidence", "None of these choices alone", "Place context only", "Product origin, grade, price fairness or shipping compliance"],
  ]},
  { id: "name-warning", type: "callout", title: "Three names hide four places", tone: "warning", body: "The museum has two separate destinations: 中国茶叶博物馆双峰馆区（龙井路88号） and 中国茶叶博物馆龙井馆区（翁家山268号）. They are not two entrances to one compound. For the villages, save 龙井村 and 梅家坞茶文化村 as place names, but confirm the current legal drop-off and pickup rather than treating the map pin as permission to enter a field." },

  { id: "longjing-heading", type: "heading", level: 2, text: "When Longjing Village is the right first stop" },
  { id: "longjing-copy", type: "paragraph", text: "Longjing works best when you want to see how a recognised tea landscape and a lived-in settlement occupy the same hills. The useful view is not only a close-up of trimmed bushes. Look across the slope: houses sit below and between cultivated terraces; roads, drainage, forest edges and tea rows divide the terrain. A 2025 Hangzhou municipal news item reported that Dianping's seasonal list placed Longjing Village in its rural-scenery category. That media report is not a government access classification and is not an invitation into every field or courtyard." },
  { id: "longjing-watch", type: "list", items: [
    "Start with the large spatial relationship: village floor, rising tea rows and the forested ridge above them.",
    "Notice where a public lane clearly continues and where a narrow path becomes part of a working plot.",
    "Treat picking baskets, fresh leaves and pan-firing as work or a named activity, not as scenery arranged for every visitor.",
    "If a tea invitation becomes a sales conversation, ask for the menu, price and product information before sitting down; leaving politely is a complete response.",
    "Do not use a green hillside as proof that the tea offered later came from the visible plot."
  ]},
  { id: "longjing-fit", type: "callout", title: "Good fit: one bounded landscape question", tone: "neutral", body: "Longjing can be a sensible short choice when a visitor saves 龙井村 as the place name, deliberately keeps to obvious public village lanes around the confirmed arrival point and turns back when the public route becomes unclear. The name itself does not make every visit compact. It is a poor choice if the plan depends on witnessing harvest work, entering private tea rows or obtaining a bargain from the first seller encountered." },

  { id: "meijiawu-heading", type: "heading", level: 2, text: "Choose Meijiawu when the walk matters more than the label" },
  { id: "meijiawu-copy", type: "paragraph", text: "Official Hangzhou material places Meijiawu at the start of a hill-route concept that continues through Shililangdang and Longjing Village toward the museum area. Meijiawu becomes the longer walking choice only when you intentionally enter that route; an ordinary village visit is not automatically longer than Longjing. The official concept is not a guarantee that the whole connection is an always-open urban promenade. Weather, trail works, road traffic and the group's fitness still decide how far the walk should go." },
  { id: "meijiawu-figure", type: "figure", src: "/images/guides/hangzhou-tea-villages-and-museum-selector/meijiawu-1600.webp", alt: "A narrow paved path between tea rows under a broad tree canopy in a Homeground photograph labelled Meijiawu", width: 1600, height: 1000, caption: "A Homeground library photograph labelled Meijiawu shows tea rows, a narrow paved path and large-tree cover. The photographer and capture date were not separately recorded; the image does not establish current public access, tea origin or season." },
  { id: "meijiawu-check", type: "table", caption: "Before turning Meijiawu into a walking day", columns: ["Check", "A usable answer", "If the answer is unclear"], rows: [
    ["The exact start and finish", "Use 梅家坞茶文化村 as the named start; continue toward 十里琅珰 only after confirming the current entrance, path and exit", "Make a public-lane village out-and-back rather than an open-ended traverse"],
    ["Surface and elevation", "Current route description that matches the least mobile traveller", "Keep to public village lanes and a short field-edge view"],
    ["Weather and daylight", "Enough margin to return before wet or dark paths become the main problem", "Choose the museum or one compact village stop"],
    ["Commercial stop", "Named venue, activity, duration and price agreed before arrival", "Treat tasting or roasting as unavailable"],
    ["Return", "A confirmed legal pickup point and backup", "Do not walk deeper merely because the vehicle cannot reach you"],
  ]},

  { id: "museum-heading", type: "heading", level: 2, text: "The Tea Museum is two different choices, not one pin" },
  { id: "museum-copy", type: "paragraph", text: "The museum's own introduction describes one institution across Shuangfeng and Longjing. Shuangfeng opened first and is the clearer default for a visitor who wants a structured foundation: the official exhibition index includes Chinese tea culture, a West Lake Longjing exhibition and donated tea ware. The Longjing campus, opened later near Wengjiashan, adds world-tea and tea-heritage themes in a more pronounced hill landscape. Neither campus should be selected only because a map result says ‘Tea Museum.’" },
  { id: "museum-table", type: "table", caption: "Choose the museum campus by question", columns: ["Campus", "Use it to answer", "Best pairing", "Verify before going"], rows: [
    ["Shuangfeng", "How Chinese tea developed, how West Lake Longjing is interpreted and how objects support the story", "One nearby village landscape when time and weather permit", "Latest opening notice, gallery access and exact entrance"],
    ["Longjing", "How tea practices extend beyond one local product and how a museum sits within tea hills", "Longjing Village only if the group still wants additional outdoor movement", "Latest opening notice, hill walking, campus-specific exhibitions and pickup point"],
  ]},
  { id: "museum-garden-figure", type: "figure", src: "/images/guides/hangzhou-tea-villages-and-museum-selector/tea-museum-1600.webp", alt: "A garden path and dense planting at the China National Tea Museum in Hangzhou", width: 1600, height: 1000, caption: "Fredlyfish4's 2016 China National Tea Museum photograph, cropped and resized by Homeground under CC BY-SA 4.0, shows landscaped outdoor space. It does not identify a currently open gallery or establish a step-free route." },
  { id: "museum-exhibit-figure", type: "figure", src: "/images/guides/hangzhou-tea-villages-and-museum-selector/museum-exhibit-1600.webp", alt: "A four-barrel wooden tea-rolling machine displayed at the museum's Shuangfeng campus", width: 1600, height: 1067, caption: "Siyuwj's 2022 photograph, resized and converted by Homeground under CC BY-SA 4.0, identifies a labelled four-barrel tea-rolling machine at the Shuangfeng campus. It is not a live demonstration and does not represent every tea-making method." },
  { id: "closure-conflict", type: "callout", title: "Use the museum's live visitor page, then check for newer notices", tone: "warning", body: "When checked on 1 September 2026, the museum's live visitor guide listed Tuesday closure and 09:00–16:30 opening, while an older 2025 Zhejiang travel booklet still listed Monday. The museum operator's live guidance is the fresher operating evidence, but this article does not freeze those hours permanently. Check that page and any newer dated campus notice before building the day around it." },

  { id: "pair-heading", type: "heading", level: 2, text: "Build one complete tea half-day instead of four partial stops" },
  { id: "pair-scenarios", type: "table", caption: "Five useful trip shapes", columns: ["Traveller situation", "Recommended shape", "What to leave out"], rows: [
    ["First visit, curious about tea but not a specialist", "Shuangfeng campus plus either Longjing Village or a short Meijiawu visit", "The second museum campus and a through-hike"],
    ["Landscape walker with a full, dry day", "Meijiawu as the primary landscape, with a verified hill connection or one museum campus as the finish", "Longjing as a duplicate photo stop if the walk already supplies the village-and-fields relationship"],
    ["Older parent, young child or heat-sensitive traveller", "Shuangfeng for context plus a short village-edge stop with a currently confirmed legal drop-off, pickup and public walking surface", "A long ridge crossing and any activity that lacks a confirmed seat, shade or return"],
    ["Tea scholar or repeat Hangzhou visitor", "Choose the museum campus by exhibition question, then add one landscape for contrast", "A generic tasting sold as historical evidence"],
    ["Rain, poor visibility or museum-only interest", "One museum campus, with the second only if the transfer adds real content", "Both villages merely to say they were visited"],
  ]},
  { id: "halfday-route", type: "list", ordered: true, items: [
    "Name the primary question: village geography, longer landscape walking or evidence-led tea history.",
    "Choose one primary place and save its exact Chinese string: 龙井村, 梅家坞茶文化村, 中国茶叶博物馆双峰馆区 or 中国茶叶博物馆龙井馆区. Confirm the current entrance or legal arrival point separately.",
    "Add one secondary place only if it supplies a different evidence type—for example, a museum after a village rather than a second near-identical photo stop.",
    "Set a turnaround before entering the hills. The return begins where the public walk ends, not when the vehicle finally appears.",
    "Keep any tasting, picking, roasting or guide activity separate unless its operator, price, language, duration and cancellation rule are confirmed.",
    "If the first place already answers the trip's question, finish there and protect the rest of the Hangzhou day."
  ]},

  { id: "walking-heading", type: "heading", level: 2, text: "Do not confuse a green map line with an easy public walk" },
  { id: "walking-copy", type: "paragraph", text: "Hangzhou's official visitor material presents a Meijiawu–Shililangdang–Longjing–museum route concept. That is evidence that the places can form a walking landscape, not a current guarantee about every junction, surface or access point. Before a complete walk, check elevation, heat, surfaces, road crossings and the return plan. If someone in the group cannot comfortably climb or descend, the correct edit is to shorten the route—not to send the person alone in a vehicle while the rest continue without a meeting plan." },
  { id: "walking-matrix", type: "table", caption: "Match ambition to the group", columns: ["Plan", "Physical demand", "Decision rule"], rows: [
    ["One village-edge view and public lanes", "Lowest of the four, but still may include slopes and uneven paving", "Use when the place relationship matters more than distance"],
    ["Village plus one museum campus", "Mixed walking plus a vehicle transfer", "Use when the two stops answer different questions"],
    ["Meijiawu–Longjing hill connection", "Sustained outdoor route with elevation and navigation", "Attempt only with current path evidence, suitable weather and a firm cutoff"],
    ["Both villages plus both campuses", "Repeated transfers and more walking than the labels suggest", "Do not use as a default; it usually turns four identities into fragments"],
  ]},

  { id: "season-heading", type: "heading", level: 2, text: "A tea landscape is agricultural, not a scheduled stage set" },
  { id: "season-copy", type: "paragraph", text: "Harvest activity varies by date, weather and production conditions. An official announcement that picking began on a particular date in one year is not a promise for your date. Outside visible picking periods, the hills still explain contour, settlement and cultivation; the museum still explains objects and practices. Decide whether those durable reasons are enough before making the journey." },
  { id: "season-table", type: "table", caption: "Use what the day actually offers", columns: ["What you find", "Keep the visit useful", "Do not infer"], rows: [
    ["Active picking", "Stay on a public path, give workers room and photograph only within current rules", "That participation is included or that every basket is the same grade"],
    ["No visible harvest", "Read field shape, access, water and village relationship; use museum context", "That the visit has failed"],
    ["Rain or heavy heat", "Reduce the outdoor leg and move the evidence task indoors", "That one village will be cooler or dry"],
    ["A tasting invitation", "Confirm price and purpose before accepting", "That hospitality means free service or proves origin"],
    ["A closed gallery or campus", "Use the open campus only if it answers the same question, otherwise choose a village or another Hangzhou day", "That ‘same museum’ means the exhibits are interchangeable"],
  ]},

  { id: "commerce-heading", type: "heading", level: 2, text: "Separate learning about tea from buying tea" },
  { id: "commerce-copy", type: "paragraph", text: "A farm-style dining room, a village household, a tea space and a museum activity can all be legitimate experiences, but their labels do not verify a product. This article does not rank sellers. If buying matters, record the exact product name, claimed origin, harvest/production information, net weight, price, seller and receipt before payment. Decide in advance whether tasting is the goal or whether you are willing to buy; ambiguity is where a relaxed visit can become an uncomfortable negotiation." },
  { id: "commerce-list", type: "list", items: [
    "Ask whether sitting down creates a minimum spend or tasting charge.",
    "Do not accept ‘from this hill’ as traceability evidence without product records.",
    "Keep shipping, customs and food-import questions separate from the scenic visit.",
    "Photograph labels and receipts, not private people or work areas without permission.",
    "A polite refusal does not make the village visit incomplete."
  ]},

  { id: "recovery-heading", type: "heading", level: 2, text: "Recover the day when the original plan stops working" },
  { id: "recovery-table", type: "table", caption: "Tea-hill failure recovery", columns: ["Problem", "First response", "Stop condition"], rows: [
    ["Museum campus is closed", "Do not assume the other campus is an equivalent substitute; check its open exhibitions, then choose it or one village", "Stop campus-hopping when the transfer costs more time than the remaining content"],
    ["Rain or heat makes the hill route unsafe", "Cancel the traverse and use one museum campus or a short village edge", "An official warning, closed path or the least mobile traveller's discomfort ends the walk"],
    ["Vehicle cannot reach the planned pickup", "Return to the last confirmed legal point while there is daylight", "Do not deepen the walk to search for reception"],
    ["Commercial pressure replaces the visit", "Decline, leave and return to a public lane or museum", "Do not pay merely to avoid embarrassment"],
    ["No English material", "Use the museum's object labels and a prepared bilingual list of place names; narrow the goal to three observations", "Do not invent an explanation from appearance"],
    ["The first stop takes longer", "Delete the second village or campus", "Protect a fixed onward booking and a safe return before preserving the checklist"],
  ]},

  { id: "final-heading", type: "heading", level: 2, text: "Who should choose what—and who can skip the tea hills" },
  { id: "fit-table", type: "table", caption: "Final fit test", columns: ["Traveller", "Best decision", "Reason"], rows: [
    ["First-time visitor with only two or three hours", "Shuangfeng or Longjing Village, not both by default", "One clear evidence type fits the time better than a transfer-heavy sampler"],
    ["Visitor interested in cultivation and walking", "Meijiawu with a current, bounded route", "The landscape supplies the main value"],
    ["Visitor interested in objects, history and reliable interpretation", "Choose the museum campus by exhibition", "Labels and collections answer questions that a hillside cannot"],
    ["Traveller expecting guaranteed picking and free tasting", "Book a named current activity or skip", "A place name alone cannot deliver those products"],
    ["Traveller with no interest in tea, villages or hill walking", "Skip without guilt", "West Lake and Hangzhou have other complete days; this is not a compulsory city sight"],
  ]},
  { id: "facts", type: "callout", title: "Evidence boundary, reviewed 1 September 2026", tone: "neutral", body: "Official sources establish the museum's two campuses, their exhibition roles and the geographic relationship among Meijiawu, Longjing and the tea hills. The museum's live visitor page was the fresher operating source at review time; an older provincial booklet disagreed. No source establishes a permanent closure rule, current path condition, tasting, harvest, price, quietness or product origin. The selection and pairing advice is Homeground planning judgment built on those verified place roles. Recheck the museum, scenic-area notices and any named activity immediately before travel." },
  { id: "checklist", type: "list", items: [
    "One primary question: village landscape, longer walk or museum evidence.",
    "One copy-ready Chinese place string—龙井村, 梅家坞茶文化村 or the full museum campus name—plus its current legal arrival point or entrance.",
    "A second place only if it adds a different kind of evidence.",
    "Latest official museum closure and gallery notice, not a copied weekday rule.",
    "Current path, weather, daylight, pickup and least-mobile-traveller check.",
    "No assumed picking, roasting, tasting, English support or free hospitality.",
    "Clear commercial boundaries and a receipt if buying tea.",
    "Respect for residents, workers, private plots and photography restrictions."
  ]},
  { id: "links", type: "internal-links", title: "Connect this decision to the wider trip", items: [
    { label: "Tea landscapes across China", href: "/guides/tea-landscape-regions-of-china/", description: "Use the national comparison guide for regional tea landscapes and cultural context, not for this Hangzhou site choice." },
    { label: "Shanghai to Hangzhou transport", href: "/guides/shanghai-hangzhou-transport-route/", description: "Keep the city-to-city rail and station task with the transport guide." },
    { label: "Liangzhu Museum and Ruins Park sequence", href: "/guides/liangzhu-ruins-park-and-museum-sequence/", description: "Plan a different Hangzhou heritage day where museum evidence and outdoor landscape also play distinct roles." },
  ]},
  { id: "sources", type: "sources", title: "Official sources and image records", items: [
    { label: "China National Tea Museum: two-campus introduction", url: "https://www.teamuseum.cn/english/basicInfo/basicIntroduction.htm", publisher: "China National Tea Museum", reviewedAt: "2026-09-01" },
    { label: "China National Tea Museum: exhibitions and visitor information", url: "https://www.teamuseum.cn/english/index.html", publisher: "China National Tea Museum", reviewedAt: "2026-09-01" },
    { label: "China National Tea Museum: live visitor guide", url: "https://www.teamuseum.cn/mobile/basicIntroduction.htm", publisher: "China National Tea Museum", reviewedAt: "2026-09-01" },
    { label: "Official Hangzhou tea-garden walking route", url: "https://wgly.hangzhou.gov.cn/attach/538/2307051510367229.pdf", publisher: "Hangzhou Municipal Bureau of Culture, Radio, TV and Tourism", reviewedAt: "2026-09-01" },
    { label: "Older official Zhejiang guide retained for closure-source comparison", url: "https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web3039/site/attach/0/2506131246078428.pdf", publisher: "Zhejiang Provincial Department of Culture, Radio, Television and Tourism", reviewedAt: "2026-09-01" },
    { label: "Hangzhou municipal news report on Longjing Village's seasonal-list placement", url: "https://eng.hangzhou.gov.cn/art/2025/3/12/art_811217_58876493.html", publisher: "Hangzhou Municipal Government", reviewedAt: "2026-09-01" },
    { label: "Traditional tea processing and associated social practices", url: "https://ich.unesco.org/en/RL/traditional-tea-processing-techniques-and-associated-social-practices-in-china-01884", publisher: "UNESCO Intangible Cultural Heritage", reviewedAt: "2026-09-01" },
    { label: "Hero: Longjing tea district photograph by Niklas Dougherty", url: "https://commons.wikimedia.org/wiki/File:Longjing_tea_village_Hangzhou.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-01" },
    { label: "China National Tea Museum photograph by Fredlyfish4", url: "https://commons.wikimedia.org/wiki/File:China_National_Tea_Museum_5.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-01" },
    { label: "Shuangfeng tea-rolling-machine photograph by Siyuwj", url: "https://commons.wikimedia.org/wiki/File:中国茶叶博物馆双峰馆区,_2022-05-01_10.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-01" },
    { label: "CC BY-SA 4.0 licence for the two museum-image derivatives", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-09-01" },
  ]},
] } as const satisfies StructuredPageBody;

export default body;
