import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "A Suzhou garden is designed to resist the single glance. Walls conceal, openings crop, corridors turn and water makes a small distance feel larger. Rocks stand in for mountains; a pond can suggest a lake or river; a plaque can connect one view to a poem. The useful first-visit question is therefore not “How many famous objects did I see?” but “What did the garden allow me to see next?” Learn that sequence and one carefully chosen garden can explain more than a rushed checklist of three.",
    },
    {
      id: "not-flower-garden-heading",
      type: "heading",
      level: 2,
      text: "First, stop treating it as a flower garden",
    },
    {
      id: "three-ideas",
      type: "comparison",
      columns: [
        {
          heading: "A landscape in miniature",
          body:
            "Stone, water and planting do not merely decorate the buildings. Together they evoke mountains, valleys, forests, rivers and changing weather inside an urban enclosure.",
        },
        {
          heading: "A landscape in time",
          body:
            "The whole composition is rarely exposed at once. A dark passage, a turn, a lattice window or a bridge edits the view, so walking is part of the design rather than dead time between highlights.",
        },
        {
          heading: "A cultural living space",
          body:
            "Many celebrated Suzhou gardens belonged to residences. Rooms, studies, gathering places, calligraphy, poetry and views were composed together; this was not a modern public park designed only for sightseeing.",
        },
      ],
    },
    {
      id: "scope-warning",
      type: "callout",
      title: "Do not turn Suzhou into a rule for every Chinese garden",
      body:
        "This guide concerns the classical gardens associated with Suzhou and the Jiangnan region, especially compact residential gardens shaped between the Song and Qing periods. Imperial parks in Beijing, temple gardens, modern city parks and regional traditions elsewhere in China work at different scales and for different purposes.",
      tone: "neutral",
    },
    {
      id: "unesco-heading",
      type: "heading",
      level: 2,
      text: "What the UNESCO name actually covers",
    },
    {
      id: "unesco-summary",
      type: "paragraph",
      text:
        "“Classical Gardens of Suzhou” is one serial World Heritage property, not the name of a single attraction. Four gardens were inscribed in 1997 and five were added in 2000. The nine components are the Humble Administrator's Garden, Lingering Garden, Master-of-Nets Garden, Mountain Villa with Embracing Beauty, Canglang Pavilion, Lion Forest Garden, Garden of Cultivation, Couple's Retreat and Retreat & Reflection Garden. UNESCO uses them to represent East Yangtze Delta garden culture from the eleventh to nineteenth centuries.",
    },
    {
      id: "unesco-meaning",
      type: "paragraph",
      text:
        "The listing describes miniature worlds made from water, rocks, plants and buildings, but it also names calligraphy, furniture, plaques, couplets and decorative art. In other words, the heritage value lies in a designed relationship among landscape, architecture, literature, craft and residential life—not in a collection of pretty ponds.",
    },
    {
      id: "evidence-levels",
      type: "callout",
      title: "How this guide separates evidence",
      body:
        "World Heritage status, component names, dates and measured areas come from UNESCO or Suzhou government records. The reading of sequence, miniature landscape and borrowed scenery comes from museum and academic scholarship. Garden-name stories are used only when an institutional source records them. The advice to visit fewer gardens more slowly is Homeground's editorial judgment, not an ancient rule.",
      tone: "decision",
    },
    {
      id: "grammar-heading",
      type: "heading",
      level: 2,
      text: "Six things to read before you chase a famous pavilion",
    },
    {
      id: "garden-grammar",
      type: "table",
      caption: "A working vocabulary for a Suzhou garden",
      columns: ["Element", "What it is doing", "What to notice"],
      rows: [
        [
          "Rock and rockery — 山石／假山",
          "A built terrain that can evoke peaks, ravines, caves and paths. It connects garden craft with the long artistic tradition of representing mountains.",
          "Look for silhouette, holes, rough texture, shadow and the way a path makes the rock feel larger than its footprint. Treat it as terrain, not a pile of props.",
        ],
        [
          "Water — 水",
          "A pond or channel holds reflection, separates near from far and links several structures to one visual centre. Its edge can disappear behind planting or architecture and then return.",
          "Follow one shoreline. Notice which pavilion faces it, which bridge crosses it and how reflection doubles a roof, tree or rock.",
        ],
        [
          "Walls, doors and windows — 墙、门、窗",
          "They hide as actively as they reveal. An opening can crop a scene like a painting, while a solid wall delays the next view.",
          "Stand squarely before one opening, then step sideways. Watch how foreground, middle ground and background enter or leave the frame.",
        ],
        [
          "Corridors and paths — 廊、径",
          "They control pace, angle and light. A narrow or dim approach can make the following courtyard or water surface feel unexpectedly open.",
          "Compare the view immediately before and after a turn. The contrast is often more important than the turn itself.",
        ],
        [
          "Plants, weather and sound — 花木、时令、声息",
          "Bamboo, lotus, old trees, rain, wind and seasonal light change the same composition. The garden is not finished in one ideal month.",
          "Listen as well as look. Rain on leaves, water movement, shade and reflected light may be part of the experience even when flowers are absent.",
        ],
        [
          "Names, plaques and couplets — 题名、匾额、楹联",
          "Words can connect a room or view to literature, biography and an owner's cultivated identity. They guide interpretation without turning every object into a fixed symbol.",
          "Translate one name well rather than guessing at ten. Ask what the words direct you to notice in the space in front of them.",
        ],
      ],
    },
    {
      id: "rocks-heading",
      type: "heading",
      level: 2,
      text: "Why the rocks are meant to feel bigger than rocks",
    },
    {
      id: "rocks-explanation",
      type: "paragraph",
      text:
        "The Metropolitan Museum of Art describes the Chinese garden as a microcosm: rock compositions become mountain ranges, small ponds become great waters and miniature trees suggest forests. It also records long-standing preferences for stones that appear lean, perforated and richly textured. Those qualities make a stone visually unstable and full of imagined passages. A rockery is therefore both physical craft and an invitation to project a much larger landscape into a small site.",
    },
    {
      id: "rocks-caution",
      type: "callout",
      title: "Artificial does not mean culturally fake",
      body:
        "A deliberately assembled rock mountain is not pretending to be untouched geology. Its workmanship is part of the point. The useful question is how convincingly it creates mass, depth, route and changing viewpoint—not whether nature placed every stone there unaided.",
      tone: "neutral",
    },
    {
      id: "borrowed-heading",
      type: "heading",
      level: 2,
      text: "Borrowed scenery is useful—and often oversimplified",
    },
    {
      id: "borrowed-explanation",
      type: "paragraph",
      text:
        "Jiejing, 借景, is commonly translated as “borrowed scenery.” A clear example is an element beyond the garden boundary—a distant pagoda, a neighbouring tree line, sky or sound—made to participate in the composition inside. The term appears in the final chapter of Ji Cheng's seventeenth-century garden treatise Yuanye. Landscape historian Wybe Kuitert argues that Ji Cheng's idea is broader than one visual trick: it concludes a philosophy in which the garden maker responds to the site and to changing nature rather than simply importing a distant object.",
    },
    {
      id: "three-view-techniques",
      type: "comparison",
      title: "Three related effects that should not be collapsed into one",
      columns: [
        {
          heading: "Framed view — 框景",
          body:
            "A doorway, window or pair of columns crops what you see. The framed subject may be entirely inside the garden, so a frame is not automatically borrowed scenery.",
        },
        {
          heading: "Borrowed scenery — 借景",
          body:
            "Something beyond the immediate designed enclosure contributes to the scene. Scholars debate how broadly to read the term; use it as more than a social-media label for every round window.",
        },
        {
          heading: "Sequential reveal",
          body:
            "Walls, planting and turns conceal one scene and release another as you move. “Changing views with each step” is a helpful modern summary, but the actual sequence differs from garden to garden.",
        },
      ],
    },
    {
      id: "four-gardens-heading",
      type: "heading",
      level: 2,
      text: "Four gardens, four different spatial grammars",
    },
    {
      id: "four-gardens",
      type: "table",
      caption: "Choose by the design question you want to understand",
      columns: ["Garden", "Documented feature", "A useful way to read it"],
      rows: [
        [
          "Humble Administrator's Garden — 拙政园",
          "Suzhou's official account calls water the garden's soul and says water occupies roughly one third of its large, three-part site.",
          "Choose it to study broad water composition: how shores, islands, bridges and pavilions divide a large surface into changing distances.",
        ],
        [
          "Lingering Garden — 留园",
          "The city highlights its architectural space and long turning corridor, which links distinct parts and repeatedly presents new views.",
          "Choose it to study compression and release: corridor versus courtyard, wall versus opening, interior room versus outdoor scene.",
        ],
        [
          "Master-of-Nets Garden — 网师园",
          "At about 0.6 hectare, it is a compact garden-residence ensemble. A courtyard and studio there inspired the Astor Court and Ming Room at The Met.",
          "Choose it to see how domestic rooms and a small central landscape can feel complete without monumental scale.",
        ],
        [
          "Lion Forest Garden — 狮子林",
          "Founded in 1342 with a Buddhist context, it is known for a layered limestone rockery with caves and winding routes.",
          "Choose it to experience the rockery as navigable mountain terrain rather than as a distant ornament.",
        ],
      ],
    },
    {
      id: "not-ranking",
      type: "callout",
      title: "These are signatures, not a ranking",
      body:
        "The largest or most photographed garden is not automatically the best match. Current crowd levels, conservation work, entry arrangements, weather and mobility needs can alter a visit. Check the garden authority's current information, then choose the spatial question that interests you most.",
      tone: "decision",
    },
    {
      id: "walking-heading",
      type: "heading",
      level: 2,
      text: "A seven-stop reading exercise inside any garden",
    },
    {
      id: "walking-exercise",
      type: "list",
      ordered: true,
      items: [
        "Pause at the first threshold. Before finding the map, note how much of the garden remains hidden and what the entrance lets you see.",
        "Choose one doorway or window. Identify foreground, middle ground and background, then move half a step and watch the composition change.",
        "Follow one edge of water. Record where it opens, disappears, reflects a structure and draws your eye toward another space.",
        "Stop immediately before and after a corridor turn. Compare width, light, sound and the apparent distance to the next object.",
        "Read one rockery as terrain. Find an imagined peak, ravine, cave or path; do not climb where visitor rules prohibit it.",
        "Translate one plaque, room name or couplet through a reliable guide or museum note. Test whether the words change what you notice.",
        "Look back. The reverse view is often a different composition, which is why tracing a route matters more than collecting front-facing photographs.",
      ],
    },
    {
      id: "history-layers-heading",
      type: "heading",
      level: 2,
      text: "What history can tell you—and what it cannot",
    },
    {
      id: "history-layers",
      type: "table",
      caption: "Keep five kinds of statement separate",
      columns: ["Layer", "Example", "How to use it"],
      rows: [
        [
          "Documented fact",
          "The nine World Heritage components, inscription dates, mapped areas and official records of a garden's layout.",
          "State these directly and cite the institution.",
        ],
        [
          "Scholarly interpretation",
          "A garden as microcosm, a walking sequence, or jiejing as a broad relationship between maker, site and changing landscape.",
          "Name the interpretation and leave room for debate rather than presenting one reading as physical fact.",
        ],
        [
          "Recorded name story or local legend",
          "A garden name may be connected to a poem, owner, Buddhist reference or later retelling.",
          "Ask whether the link appears in a record. Do not upgrade a guide's colourful story into a proven origin.",
        ],
        [
          "Contemporary observation",
          "Crowds, one-way visitor flows, seasonal displays, repairs and night programmes affect how a garden feels now.",
          "Date the observation and do not use it to describe every historical period or every future visit.",
        ],
        [
          "Homeground editorial judgment",
          "For a first visit, understanding one garden slowly is usually more valuable than racing through several famous names.",
          "Treat it as planning advice that can change with the traveller, not as a cultural rule.",
        ],
      ],
    },
    {
      id: "elite-context",
      type: "callout",
      title: "The literati ideal is not the whole social history",
      body:
        "UNESCO and museum sources explain the gardens through elite residences, cultivated owners, literature and retreat. That is essential context, but it does not mean every Suzhou resident lived this way. Making and maintaining the gardens also required designers, craftsmen and other workers. Read them as surviving elite cultural spaces, not as a model home for “the Chinese people.”",
      tone: "warning",
    },
    {
      id: "mistakes-heading",
      type: "heading",
      level: 2,
      text: "Six mistakes that make the gardens blur together",
    },
    {
      id: "mistakes",
      type: "list",
      items: [
        "Scheduling several major gardens back-to-back without deciding what will make each one different.",
        "Calling every round doorway or lattice window “borrowed scenery.”",
        "Judging the garden only by how many flowers are blooming that week.",
        "Dismissing a constructed rockery because it is not untouched nature.",
        "Assigning one fixed symbolic meaning to every plant, stone and building without a source.",
        "Using an undated blog for current tickets, opening hours or reservation rules instead of checking the operator.",
      ],
    },
    {
      id: "final-connection",
      type: "callout",
      title: "Use one garden to understand Suzhou",
      body:
        "A well-chosen garden can connect Suzhou's water, architecture, craft, painting, literature and urban life in one walk. If you want human help choosing which garden fits your interests and placing it within a wider Suzhou or China route, Homeground can discuss the context and logistics; current admission and opening details should still be confirmed with the garden operator.",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Keep planning the visit",
      items: [
        {
          label: "Explore China by destination",
          href: "/explore/",
          description: "Place Suzhou within a wider route without treating every city as the same kind of stop.",
        },
        {
          label: "Check whether your China itinerary is too rushed",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description: "Protect enough time to read one garden slowly instead of collecting several hurried entries.",
        },
        {
          label: "Decide whether you need a tour guide in China",
          href: "/guides/do-you-need-a-tour-guide-in-china/",
          description: "Use human interpretation where it adds context, not as a default for every stop.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official, museum, academic and image sources checked in August 2026",
      items: [
        {
          label: "Classical Gardens of Suzhou — World Heritage property, criteria and conservation summary",
          url: "https://whc.unesco.org/en/list/813/",
          publisher: "UNESCO World Heritage Centre",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Classical Gardens of Suzhou — nine component gardens and mapped areas",
          url: "https://whc.unesco.org/en/list/813/maps/",
          publisher: "UNESCO World Heritage Centre",
          reviewedAt: "2026-08-10",
        },
        {
          label: "1997 ICOMOS advisory-body evaluation for the Classical Gardens of Suzhou",
          url: "https://whc.unesco.org/document/154344",
          publisher: "ICOMOS via UNESCO World Heritage Centre",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Chinese Gardens and Collectors' Rocks",
          url: "https://www.metmuseum.org/essays/chinese-gardens-and-collectors-rocks",
          publisher: "Department of Asian Art, The Metropolitan Museum of Art",
          reviewedAt: "2026-08-10",
        },
        {
          label: "The Humble Administrator's Garden — history, layout and water composition",
          url: "https://english.suzhou.gov.cn/szsenglish/szyllm/201611/33c53150ce8949d290a5092266502da4.shtml",
          publisher: "Suzhou Municipal People's Government",
          reviewedAt: "2026-08-10",
        },
        {
          label: "The Lingering Garden — architectural space and corridor sequence",
          url: "https://english.suzhou.gov.cn/szsenglish/szyllm/201611/6a6c8bf51df742b4b3a1a56307437b21.shtml",
          publisher: "Suzhou Municipal People's Government",
          reviewedAt: "2026-08-10",
        },
        {
          label: "The Master-of-Nets Garden — compact garden-residence ensemble",
          url: "https://english.suzhou.gov.cn/szsenglish/sz4ajjq/201611/4fe3b02dec384dceb6789d453befe57f.shtml",
          publisher: "Suzhou Municipal People's Government",
          reviewedAt: "2026-08-10",
        },
        {
          label: "The Lion Forest Garden — Buddhist origin and limestone rockery",
          url: "https://english.suzhou.gov.cn/szsenglish/sz4ajjq/201611/51cf06c8ac2243309f07adcfa7992624.shtml",
          publisher: "Suzhou Municipal People's Government",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Kuitert — Borrowing scenery and the landscape that lends: the final chapter of Yuanye",
          url: "https://doi.org/10.1080/18626033.2015.1058570",
          publisher: "Journal of Landscape Architecture",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Exploring the correlation of space creation in Suzhou classical gardens and Yan Zhenqing's three manuscripts",
          url: "https://doi.org/10.1080/13467581.2024.2358202",
          publisher: "Journal of Asian Architecture and Building Engineering",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Hero image: Lingering Garden by kevinmcgill, CC BY-SA 2.0; cropped and converted to WebP",
          url: "https://commons.wikimedia.org/wiki/File:Lingering_Garden,_Suzhou.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-11",
        },
      ],
    },
  ],
};

export default body;
