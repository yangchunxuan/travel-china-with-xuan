import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "direct-answer", type: "lead", text: "Choose at most two major viewpoints and one public village experience, then leave time for the mountain road and cloud. Duoyishu is the sunrise-oriented choice; Bada is a broad, gentler-slope basin often used later in the day; Laohuzui shows a much steeper terrace form but lies on a separate road, so ask the current site management about entry and traffic before travelling. Pair one of them with a managed village visit such as Azheke or Qingkou, not with an assumption that every lane, house, irrigation channel and field ridge is public."},
  {id: "living-system", type: "callout", title: "The view is a working four-part system", body: "UNESCO describes forest, water, villages and terraces as an integrated living cultural landscape; FAO describes the wider forest–village–terrace–river agricultural system. The terraces are cultivated land and water infrastructure, not a static scenic installation. A beautiful foreground may be somebody's crop, access path or irrigation edge.", tone: "neutral"},
  {id: "matrix-heading", type: "heading", level: 2, text: "Choose the viewpoint by what it adds"},
  {id: "viewpoint-matrix", type: "table", caption: "Yuanyang viewpoint selection matrix", columns: ["Viewpoint or area", "Choose it for", "Main cost and current check"], rows: [
    ["Duoyishu", "An eastern-side sunrise attempt, steep terrace geometry and a direct relationship with nearby villages.", "Very early mountain-road travel, darkness, fog and concentrated arrival. Ask the current site management about the entrance, ticket and safe drop-off the previous day."],
    ["Bada", "A wide basin whose gentler gradients help explain scale and water-filled contour; useful as a later-day counterpoint to Duoyishu.", "Do not promise a sunset. Ask the current site management about road conditions, opening and the vehicle plan before waiting late."],
    ["Laohuzui", "The steepest of UNESCO's three representative terrace areas and a distinct southern/western road journey.", "Treat it as a deliberate alternative, not an automatic add-on. The 2025 official document records visitor-traffic management, but it does not prove today's opening; ask about entry, parking, repairs and restrictions before travel."],
    ["Qingkou public visitor area", "A managed introduction to Hani village and terrace relationships close to a recognised visitor-services context.", "A public visitor zone does not open every home, sacred space or farming path."],
    ["Azheke", "A living traditional village with a current visitor-service and resident-linked tourism model.", "Use the current village ticket, guide or marked route. Resident life is not a performance on demand."],
    ["Aichun or another roadside colour viewpoint", "A conditional extra only when current access, light and road position are safe.", "Colour depends on sky, water and season. Do not stop in the carriageway or call it guaranteed ‘blue terraces’." ]
  ]},
  {id: "base-heading", type: "heading", level: 2, text: "The expressway ends before the core mountain roads"},
  {id: "base-road", type: "paragraph", text: "The Yuanyang–Lüchun expressway opened in February 2026 and improves the regional approach to Yuanyang's Nansha area. It does not flatten the final mountain geography. Official road notices still identify bends, cliffs, slippery sections and separate roads around Duoyishu, Bada, Laohuzui, Azheke and Aichun. For an early viewpoint, a verified upper-area hotel or homestay near the chosen road can be more useful than sleeping in Nansha; confirm legal registration, vehicle access, luggage handling and the exact Chinese address before booking."},
  {id: "route-heading", type: "heading", level: 2, text: "Choose one of three ways to spend the day"},
  {id: "route-options", type: "table", caption: "Routes built around different priorities", columns: ["Priority", "Suggested order", "What to leave out"], rows: [
    ["Sunrise and living landscape", "Duoyishu sunrise attempt → breakfast and rest → Azheke or Qingkou on its current public route → stop if cloud or fatigue remains.", "Do not bolt on Laohuzui only to collect another famous name."],
    ["Village first, no pre-dawn drive", "Managed village visit in useful daylight → read forest, settlement, channels and fields → Bada if weather opens later.", "Do not enter terraces or houses to manufacture ‘authentic’ photographs."],
    ["Terrace-form comparison", "Choose Duoyishu plus Bada, or Laohuzui plus one village, after confirming which roads and entrances are in use.", "Do not attempt all three representative areas in one rushed loop."],
    ["Older parents or limited mobility", "One accessible viewpoint → seated interpretation or short village public route → return before dark.", "Remove sunrise darkness, repeated stairs and the farthest road branch first."]
  ]},
  {id: "scenarios-heading", type: "heading", level: 2, text: "The right sequence changes with the traveller"},
  {id: "scenarios", type: "table", caption: "Traveller scenarios", columns: ["Traveller", "Better selection", "Success measure"], rows: [
    ["Photographer with two mornings", "Attempt Duoyishu once, keep the second morning flexible for cloud and use only one later-day viewpoint.", "One truthful view plus landscape understanding, not six coordinates."],
    ["Family interested in agriculture and culture", "One managed village, one viewpoint and an interpretation stop.", "Understanding the forest–water–village–terrace system without intruding on work or homes."],
    ["One-night visitor arriving from Jianshui", "Check the real arrival time and darkness first; ask which nearby viewpoint is open the next morning and skip the distant branch.", "One safe mountain-road journey and one complete visit rather than a sunset chase on arrival." ]
  ]},
  {id: "village-heading", type: "heading", level: 2, text: "Read a village without treating residents as exhibits"},
  {id: "resident-boundaries", type: "list", items: [
    "Enter through the current public visitor route, ticket point or local guide system where one exists.",
    "A lane can change from public route to household space. Follow signs and accept a closed door without negotiation.",
    "Ask before photographing a person, doorway activity, ceremony, child, meal or interior; a general scenic ticket is not consent.",
    "Do not step onto narrow terrace ridges or irrigation channels for composition. They carry crops, water and workers.",
    "Do not enter forests or sacred spaces above a village without specific local permission.",
    "Buy food or crafts because you want the item and can identify the seller, not as payment for unrestricted photography.",
    "Keep drones grounded unless the current authority and site rules explicitly permit the exact flight. Privacy and agricultural work remain constraints.",
    "Let farmers, animals and local vehicles pass first on narrow roads and paths."
  ]},
  {id: "weather-heading", type: "heading", level: 2, text: "Cloud changes the day; it does not ruin the destination"},
  {id: "weather-recovery", type: "table", caption: "Better alternatives for fog and road changes", columns: ["Condition", "Better alternative", "Unsafe reaction to avoid"], rows: [
    ["Pre-dawn fog at Duoyishu", "Wait only inside the managed safe area; if visibility remains poor, return for breakfast and use a public village or interpretation visit.", "Do not race to another viewpoint on dark, wet bends."],
    ["Cloud layer moves during the day", "Keep one later viewpoint flexible and ask the current site management or your host about current road-side visibility, not a promise.", "Do not infer that another valley is clear from one phone image."],
    ["Heavy rain or landslide notice", "Cancel the exposed road branch and remain in a safe town or licensed accommodation until authorities clear travel.", "Do not ask a driver to bypass control or use an unsigned village track."],
    ["Terraces are not reflective or ‘blue’", "Read crops, channels, villages and contour; use the agricultural season actually present.", "Do not label edited colour or another season as the current view."],
    ["Viewpoint closes or parking is controlled", "Use an alternative public point named by the current site management, or remove the stop.", "Do not park on the through road or enter from farmland." ]
  ]},
  {id: "facts-judgment", type: "callout", title: "What is known, what changes and what we recommend", body: "Official fact: UNESCO's property contains representative Bada, Duoyishu and Laohuzui areas, and current county documents show continuing conservation and visitor management. Long-term pattern: cloud and mountain-road conditions vary, while farming seasons change the fields. Homeground judgment: two viewpoints plus one village are normally more coherent than chasing every named platform. None of this proves today's ticket, entrance or visibility; ask the current site management before travelling.", tone: "decision"},
  {id: "final-check", type: "list", items: [
    "Upper-area versus Nansha lodging chosen from the first viewpoint and arrival time.",
    "No more than two major viewpoints and one public village route selected.",
    "Current ticket, passport method, entrance, parking and road notice confirmed with the current site management before travel.",
    "Driver has exact Chinese points and will not stop in the carriageway.",
    "A flexible second morning or indoor/public-village alternative is kept for cloud.",
    "Private homes, sacred space, fields, ridges and channels are excluded without permission.",
    "No sunrise, reflection, colour or clear view is guaranteed.",
    "Return occurs before an unplanned dark mountain drive."
  ]},
  {id: "internal-links", type: "internal-links", title: "Connect Yuanyang to the wider route", items: [
    {label: "Explore China", href: "/explore/", description: "Compare Yuanyang's living-landscape role with another heritage stop."},
    {label: "China climate regions for trip timing", href: "/guides/china-climate-regions-for-trip-timing/", description: "Do not transfer Yunnan highland weather expectations to the rest of China—or vice versa."},
    {label: "China itinerary with older parents", href: "/guides/china-itinerary-with-older-parents/", description: "Reduce darkness, stairs and repeated road branches in the wider trip."},
    {label: "Fujian tulou cluster selection", href: "/guides/fujian-tulou-cluster-selection/", description: "Use the same principle: visit living communities with a clear, respectful purpose."},
    {label: "Read Shilin Stone Forest through the Ashima story", href: "/guides/shilin-ashima-landscape-story/", description: "Compare another Yunnan cultural landscape while keeping geology, oral tradition and modern interpretation in separate evidence layers."}
  ]},
  {id: "consultation", type: "callout", title: "Need a Yuanyang route that can handle cloud?", body: "A Homeground travel consultant can compare your arrival road, lodging area, viewpoint priorities, village access and cloudy-weather alternatives. Share the dates, mobility, photography priorities and whether you have one or two mornings.", tone: "neutral"},
  {id: "sources", type: "sources", title: "Official sources reviewed on 13 August 2026", items: [
    {label: "Cultural Landscape of Honghe Hani Rice Terraces", url: "https://whc.unesco.org/en/list/1111/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-13"},
    {label: "Hani Rice Terraces agricultural heritage system", url: "https://www.fao.org/giahs/giahs-around-the-world/china-hani-rice-terraces/en", publisher: "Food and Agriculture Organization of the United Nations", reviewedAt: "2026-08-13"},
    {label: "2026 Yuanyang heritage-management programme", url: "https://www.hhyy.gov.cn/info/76021/405851.htm", publisher: "Yuanyang County People's Government", reviewedAt: "2026-08-13"},
    {label: "2025 official road hazards around terrace viewpoints", url: "https://www.hhyy.gov.cn/info/1231/390011.htm", publisher: "Yuanyang County Public Security Bureau", reviewedAt: "2026-08-13"},
    {label: "2025 Laohuzui visitor-traffic management response", url: "https://www.hhyy.gov.cn/info/3161/397061.htm", publisher: "Yuanyang County Culture and Tourism Bureau", reviewedAt: "2026-08-13"},
    {label: "2026 opening of the Yuanyang–Lüchun expressway", url: "https://jtyst.yn.gov.cn/html/2026/xingyexinwen_0214/3136521.html", publisher: "Yunnan Provincial Department of Transport", reviewedAt: "2026-08-13"},
    {label: "Hero image: Bada rice terraces, photographed by Yumeto on 18 December 2025", url: "https://commons.wikimedia.org/wiki/File:20251218_Bada_rice_terraces_(143520).jpg", publisher: "Wikimedia Commons / Yumeto", reviewedAt: "2026-08-13"},
    {label: "Hero image licence: Creative Commons Attribution-ShareAlike 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
