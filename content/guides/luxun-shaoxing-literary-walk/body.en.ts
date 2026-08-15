import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "The most useful way to walk Lu Xun's Shaoxing is not to ask whether everything came from one book. Zhou Family New Taimen is tied to his birth and youth; Sanwei Study is a documented education site; Zhou Family Old Taimen explains the wider family and social setting. Baicao Garden is a real place later shaped into a retrospective essay, not a botanical inventory written on the spot. Kong Yiji, by contrast, is fictional, and the present Xianheng Hotel belongs chiefly to the story's reception and today's visitor economy. Follow the evidence in that order—family, school, home, remembered garden, museum, then fiction and commerce—and allow the duration to expand or contract. No current official route reviewed through 14 August 2026 supports a guaranteed two-to-three-hour circuit for every visitor."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "The four labels to carry through every doorway",
      body: "Lived or studied here: a documented life site. Remembered this: a real place reworked in memoir. Invented this: a literary character or setting. Staged this later: a museum, restoration, statue, shop or tourism scene. A single compound can contain more than one label, so read the object caption before deciding what is original.",
      tone: "decision"
    },
    {
      id: "layers-heading",
      type: "heading",
      level: 2,
      text: "What is history, memoir, fiction or modern presentation?"
    },
    {
      id: "layers-table",
      type: "table",
      caption: "Four evidence layers for the walk",
      columns: ["Layer", "What it can support", "What it cannot support"],
      rows: [
        ["History", "Lu Xun's documented residence and education; protected buildings; dated conservation and museum history", "That every furnishing, wall surface or room arrangement is untouched from his childhood"],
        ["Literature", "The remembered Baicao–Sanwei sequence in an essay; Kong Yiji and Lu Town in fiction", "A real-time diary, a census of historical residents or a literal street map"],
        ["Tourism presentation", "Exhibitions, restored settings, a Kong Yiji statue, themed shops and the current Xianheng visitor scene", "Direct evidence for late-Qing life or the original condition of a fictional tavern"],
        ["Editorial judgment", "Homeground's life → memory → museum → fiction walking order", "An official one-way route or a universal visit duration"]
      ]
    },
    {
      id: "layers-method",
      type: "paragraph",
      text: "This is not an ‘authentic old city’ versus ‘fake modern site’ test. A restored room can clarify scale; a new museum may hold better documentary evidence than an old bedroom; a commercial statue can show how fiction entered public memory. Ask who made each claim, when, and about which material. Cultural-relics plaques, conservation labels, museum captions, literary texts and tourism slogans carry different evidentiary weight."
    },
    {
      id: "sequence-heading",
      type: "heading",
      level: 2,
      text: "Which sequence gives the clearest first visit?"
    },
    {
      id: "sequence-comparison",
      type: "comparison",
      title: "Choose a core, then add the interpretation layers",
      columns: [
        {
          heading: "Evidence-first core",
          items: [
            "Orient at the current map and entrance signs.",
            "Read Old Taimen as family context.",
            "Use Sanwei Study for education evidence.",
            "Separate surviving and restored parts at New Taimen."
          ]
        },
        {
          heading: "Memory and museum core",
          items: [
            "Read Baicao Garden as place plus later memoir.",
            "Use the memorial museum for chronology, editions and documentary objects.",
            "Let current labels, not a remembered textbook illustration, identify details."
          ]
        },
        {
          heading: "Optional reception ending",
          items: [
            "Move to Xianheng only after the life sites.",
            "Treat Kong Yiji as fiction, not a local biography.",
            "Read shops and statues as dated modern interpretations.",
            "Skip this ending if crowds or access consume your time."
          ]
        }
      ]
    },
    {
      id: "sequence-note",
      type: "paragraph",
      text: "Controlled entrances, construction or room closures can change the physical order. Preserve the intellectual order instead. If staff send you to Baicao Garden before Sanwei Study, label it as remembered place, then return to school evidence when accessible. Photograph the current plan where permitted; dated online maps are not a live 2026 circulation guarantee."
    },
    {
      id: "old-taimen-heading",
      type: "heading",
      level: 2,
      text: "What does Zhou Family Old Taimen explain—and what does it not?"
    },
    {
      id: "old-taimen-text",
      type: "paragraph",
      text: "Zhou Family Old Taimen (周家老台门) is the family's ancestral and social frame. It shows that Lu Xun, born Zhou Shuren in 1881, belonged to a larger lineage and household world, not an isolated ‘writer's room.’ Do not present it as the site of every childhood or school episode. Read the entrance identity, protected-site information and room-function labels. Treat interiors explaining ancestor worship, household hierarchy or local domestic life as current interpretation unless a label gives dated use and material history."
    },
    {
      id: "old-taimen-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/zhou-family-old-taimen-1600.webp",
      alt: "Entrance to Zhou Family Old Taimen in Shaoxing, identified as Lu Xun's ancestral residence.",
      width: 1600,
      height: 1067,
      caption: "Old Taimen supplies family and social context; its sign does not turn every room inside into Lu Xun's personal living space."
    },
    {
      id: "old-taimen-checklist",
      type: "list",
      items: [
        "Look for the site's formal name before reading decorative room settings.",
        "Notice courtyard-to-room relationships, but do not assign a late-Qing function without a label.",
        "Record words such as preserved, repaired, restored, reconstructed or exhibition setting exactly.",
        "If the room status is unclear, say only that it is displayed within the ancestral compound."
      ]
    },
    {
      id: "sanwei-heading",
      type: "heading",
      level: 2,
      text: "Why is Sanwei Study a life site even when one desk needs caution?"
    },
    {
      id: "sanwei-text",
      type: "paragraph",
      text: "Sanwei Study (三味书屋) stood in the Shou family compound and is documented by Shaoxing's official account as the private school Lu Xun entered at about twelve, studying there for roughly five years. That relationship is stronger than a movie set or a generalized ‘old classroom’: the room belongs to his education history. Begin with its modest scale, the relationship between teacher and pupils' desks, the nameboard and the institutional labels. Those spatial facts help explain the contrast Lu Xun later constructed between garden attention and school routines without requiring the room to perform a scene for visitors."
    },
    {
      id: "sanwei-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/sanwei-study-1600.webp",
      alt: "Interior of Sanwei Study with desks, nameboard and the museum label identifying Lu Xun's seat.",
      width: 1600,
      height: 1067,
      caption: "The room is a documented education site; object-level stories still depend on the current museum label and provenance."
    },
    {
      id: "sanwei-caution",
      type: "paragraph",
      text: "The famous ‘早’—‘early’—desk story requires an extra step. A 2024 Zhejiang culture report and a museum-staff interview said the institutionally attributed original had been withdrawn from Sanwei Study for conservation, stored and then displayed in the memorial museum. Later descriptions do not consistently distinguish the status of a desk shown at Sanwei. The current object, label and location therefore still need checking. If a desk is present, read the exact wording and photograph the full caption where allowed. If the attributed original has rotated out, the schoolroom remains meaningful; do not substitute another desk or turn the anecdote into provenance certainty."
    },
    {
      id: "new-taimen-heading",
      type: "heading",
      level: 2,
      text: "What survives at Zhou Family New Taimen?"
    },
    {
      id: "new-taimen-text",
      type: "paragraph",
      text: "Zhou Family New Taimen (周家新台门) is the documented residence associated with Lu Xun's birth and youth. Yet ‘former residence’ does not mean the whole compound reached the present unchanged. A Shaoxing CPPCC historical account records the family's 1918 sale and extensive redevelopment in 1920–1922, while identifying specified residential rooms and the kitchen as surviving. A later institutional history describes a 2003 intervention that removed an older exhibition hall, restored the New Taimen environment and created a new memorial museum. The useful story is therefore continuity through partial survival, alteration, conservation and interpretation—not a sealed childhood house."
    },
    {
      id: "new-taimen-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/zhou-family-new-taimen-1600.webp",
      alt: "A building on the west axis of Zhou Family New Taimen, Lu Xun's documented former residence in Shaoxing.",
      width: 1600,
      height: 1067,
      caption: "New Taimen combines a documented life-site relationship with a history of sale, redevelopment, surviving rooms and later restoration."
    },
    {
      id: "new-taimen-method",
      type: "list",
      ordered: true,
      items: [
        "Confirm the building or room name; ‘Lu Xun Native Place’ is a visitor-area name, not one construction date.",
        "Read any protection or conservation panel before the furnished interior.",
        "Separate structural fabric from furniture, photographs and later explanatory installations.",
        "Use the narrowest supported verb: survived, was repaired, was restored, was reconstructed, or is now displayed.",
        "If no intervention history is posted, do not decide age by dark timber, roof tiles or atmosphere."
      ]
    },
    {
      id: "baicao-heading",
      type: "heading",
      level: 2,
      text: "Is Baicao Garden a real place or a literary memory?"
    },
    {
      id: "baicao-text",
      type: "paragraph",
      text: "It is both, in different senses. Baicao Garden (百草园) belongs to the family-site landscape behind the former residence. ‘From Baicao Garden to Sanwei Study’ (《从百草园到三味书屋》), however, is a retrospective essay in *Dawn Blossoms Plucked at Dusk* (《朝花夕拾》), written in 1926 by an adult author shaping childhood attention through prose. It is not a novel, but neither is it a contemporaneous diary or a conservation survey. Memory selects: plants, games, fear, storytelling and school acquire pattern because the writer has arranged them."
    },
    {
      id: "baicao-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/baicao-garden-1600.webp",
      alt: "Gateway marked Baicao Garden within the Lu Xun former-residence visitor group in Shaoxing.",
      width: 1600,
      height: 1067,
      caption: "The name panel identifies the real garden remembered in prose; it does not date the gateway or reconstruct Lu Xun's childhood view."
    },
    {
      id: "baicao-method",
      type: "paragraph",
      text: "On site, resist the urge to make every current plant illustrate a sentence. Use two material anchors instead: the garden's relationship to New Taimen, and any labelled detail such as the low wall or stone well rim. For each, ask whether the label identifies age, repair or association. Then compare what the essay makes emotionally prominent with what the institution can document materially. If the garden is crowded, this two-anchor method is more honest—and more memorable—than waiting for an empty photograph that pretends the present landscape is the writer's childhood view."
    },
    {
      id: "museum-heading",
      type: "heading",
      level: 2,
      text: "What did the 1953 memorial museum add to the old rooms?"
    },
    {
      id: "museum-text",
      type: "paragraph",
      text: "Shaoxing Lu Xun Memorial Museum dates its founding to 1953, a chronology also supported by the National Development and Reform Commission's site profile. Treat that date as institutional history, not the age of every current gallery. The museum's value is precisely that it can do work a former residence cannot: establish a life chronology, identify editions and photographs, explain movements between cities, and show how Lu Xun's writing was published and received. A manuscript facsimile or edition needs its own caption and rights status; the old rooms do not certify it merely by proximity."
    },
    {
      id: "museum-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/lu-xun-memorial-museum-1600.webp",
      alt: "Modern Lu Xun Memorial Museum building beside the protected sites in Shaoxing.",
      width: 1600,
      height: 1067,
      caption: "The museum is a memorial and evidence-interpretation institution founded in 1953, not another childhood residence."
    },
    {
      id: "museum-method",
      type: "paragraph",
      text: "Use the museum to correct impressions formed in scenic rooms. Look for dates on documents, first editions, family photographs and conservation phases. Separate originals from facsimiles and exhibition quotations from the sites they describe. If galleries are crowded or an object has rotated out, choose one biography timeline and one clearly captioned publication object. That pairing connects person and writing without pretending a missing exhibit was seen."
    },
    {
      id: "fiction-heading",
      type: "heading",
      level: 2,
      text: "Where does fiction begin, and what does Xianheng Hotel prove today?"
    },
    {
      id: "fiction-text",
      type: "paragraph",
      text: "Kong Yiji (《孔乙己》), first published in 1919, is a short story. Its shabby scholar, narrator and Lu Town tavern belong to fiction even though Lu Xun drew social material from the world he knew. Later attempts to nominate a single ‘prototype’ do not turn Kong Yiji into a documented Shaoxing resident. This distinction matters because the character is now physically visible in signs, statues and food-and-drink settings. Those objects prove the strength of literary reception. They do not convert the story into local biography."
    },
    {
      id: "xianheng-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/xianheng-hotel-1600.webp",
      alt: "Present-day Xianheng Hotel frontage in Shaoxing with a Kong Yiji statue beside the entrance.",
      width: 1600,
      height: 1067,
      caption: "The present hotel and statue are part of modern literary reception and commerce; they are not an unchanged tavern scene from the story."
    },
    {
      id: "fiction-boundary",
      type: "paragraph",
      text: "Current Shaoxing tourism material promotes Xianheng Hotel through the Kong Yiji association, while the hotel's own 2025 chronology says it reopened in 1981 and that later redevelopment retained what it calls the ‘堂吃’ dining area while other parts were demolished and rebuilt. Treat that as operator self-history, not an independent conservation survey, but it is enough to reject an unchanged late-Qing complex. A 2025 Zhejiang culture report also documents newer literary-IP shops and constructed scenes nearby. Inspect creation dates and explanations; do not call the present interior the original fictional tavern or a statue a portrait. If the hotel is closed or busy, skipping it leaves the life-and-writing route intact."
    },
    {
      id: "walk-heading",
      type: "heading",
      level: 2,
      text: "How can you walk the route when entrances, queues or rooms change?"
    },
    {
      id: "walk-sequence",
      type: "list",
      ordered: true,
      items: [
        "At arrival, use the current official map, reservation notice, entry point and photography signs. Do not rely on a screenshot of the operator's old one-, two- or three-hour route page as a live schedule.",
        "Start with Old Taimen if the circulation allows. Give it one job: establishing family and social context. If it is closed, keep that context for the museum rather than assigning it to New Taimen.",
        "At Sanwei Study, read room scale and labels before searching for the ‘早’ desk. If the attributed object is absent, record the room as the education site and move on.",
        "At New Taimen, choose one surviving/restored-status label and one room-function label. This prevents furnished displays from blending into one unsupported claim of originality.",
        "In Baicao Garden, use the two-anchor method: relationship to the residence plus one labelled material detail. The visit still works when seasonal planting differs from the essay.",
        "Use the memorial museum to establish dates, works and later conservation. If time contracts, one strong timeline and one publication object are better than rushing every gallery.",
        "End at Xianheng and the newer literary streets only if you want to study reception. It is an optional modern coda, not evidence required to understand Lu Xun's childhood sites."
      ]
    },
    {
      id: "walk-recovery",
      type: "list",
      items: [
        "Reservation unavailable: do not claim exterior viewing equals the core visit; use the public street context and seek a later official slot.",
        "Room closed: use its dated institutional description or museum chronology, and do not invent interior observations.",
        "Construction changes the path: keep the evidence sequence in your notes even if your feet follow a different order.",
        "Crowding at Baicao Garden: choose labelled details instead of trying to reproduce an empty textbook image.",
        "Mobility barrier: ask staff for the current step-free route; if none covers the whole group, prioritize the museum and one confirmed accessible life site.",
        "Photography prohibited: record the object title, issuing institution and label date in writing. Do not use flash, tripods or close-up photography unless current signs permit them."
      ]
    },
    {
      id: "fit-heading",
      type: "heading",
      level: 2,
      text: "Who should do this walk, and what must everyone recheck?"
    },
    {
      id: "fit-comparison",
      type: "comparison",
      title: "Match the depth to your question",
      columns: [
        {
          heading: "Read Lu Xun already",
          body: "Do the full evidence sequence and compare the essay's remembered structure with the site's material labels. Add Xianheng only if reception interests you."
        },
        {
          heading: "First encounter",
          body: "Prioritize New Taimen, Sanwei Study and the memorial museum; read one short essay before or after. Skip quotation hunting and long biography detours."
        },
        {
          heading: "Architecture or conservation",
          body: "Prioritize Old and New Taimen, intervention wording and the museum's 2003 history. Treat furnishings and atmosphere as questions, not dates."
        },
        {
          heading: "Only want a food/photo stop",
          body: "Visit Xianheng separately if you wish. The deeper walk can be skipped, but the commercial scene should not be used as a summary of Lu Xun's Shaoxing."
        }
      ]
    },
    {
      id: "dont-mistake",
      type: "callout",
      title: "Do not mistake these six pairs",
      body: "A memoir is not a real-time diary. A fictional character is not a historical resident. A protected site is not every surface untouched. An attributed desk is not automatically proven or permanently displayed. A restored environment is not a complete surviving compound. The present Xianheng Hotel is not the unchanged condition of a fictional tavern.",
      tone: "warning"
    },
    {
      id: "dynamic-note",
      type: "paragraph",
      text: "Before travel, recheck regular opening hours, free or paid components, reservation and foreign-passport handling, construction closures, one-way circulation, step-free access, object rotation and interior photography with the direct operator. The only current 2026 notice located during research concerned specific holiday adjustments; it cannot establish normal daily rules. If direct confirmation is unavailable, keep the plan flexible, carry passport identification, arrive with time for a staffed-counter question, and regard Xianheng as optional. Do not let a dynamic failure erase the evidence boundaries."
    },
    {
      id: "local-review",
      type: "callout",
      title: "What this guide does not certify",
      body: "Homeground's central desk review checked the three-language structure, names, source boundaries and image attribution on 14 August 2026. It was not an onsite inspection or an endorsement by a named Shaoxing or Lu Xun specialist. Treat the walking order as editorial logic, and let the current map, room labels and staff instructions govern what is open and how an object is attributed on the day.",
      tone: "neutral"
    },
    {
      id: "links",
      type: "internal-links",
      title: "Continue the evidence-first trip",
      items: [
        {
          label: "Choose a woodblock or movable-type printing visit",
          href: "/guides/woodblock-and-movable-type-printing-decisions/",
          description: "Use the same object-and-process discipline when reading printed editions and workshop demonstrations."
        },
        {
          label: "Plan around China's public holidays",
          href: "/guides/china-public-holidays-travel-calendar/",
          description: "Check crowd pressure and special opening notices separately from this literary interpretation."
        },
        {
          label: "Verify official and reseller ticket channels",
          href: "/guides/official-or-reseller-china-tickets/",
          description: "Use a current operator source if the heritage area requires a reservation."
        },
        {
          label: "Separate the layers behind Liaozhai in Zibo",
          href: "/guides/liaozhai-zibo-former-residence-liqu-liaozhai-city/",
          description: "Compare another writer-and-place visit by keeping the former residence, literature, living performance and modern scenic interpretation distinct."
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources and image credits reviewed through 14 August 2026",
      items: [
        {"label": "Lu Xun Native Place site composition and 1953 museum founding", "url": "https://www.ndrc.gov.cn/xwdt/ztzl/qghsly/202105/t20210524_1301639.html", "publisher": "National Development and Reform Commission", "reviewedAt": "2026-08-13"},
        {"label": "Documented New Taimen and Sanwei Study relationships", "url": "https://sxlz.sx.gov.cn/art/2022/2/14/art_1483623_58923289.html", "publisher": "Shaoxing official local-history platform", "reviewedAt": "2026-08-13"},
        {"label": "Shaoxing Lu Xun Memorial Museum institutional profile", "url": "https://sxlz.sx.gov.cn/art/2022/11/14/art_1229701440_58924111.html", "publisher": "Shaoxing official local-history platform", "reviewedAt": "2026-08-13"},
        {"label": "New Taimen sale, redevelopment and surviving portions", "url": "https://sxzx.sx.gov.cn/art/2011/7/13/art_1486822_17724937.html", "publisher": "Shaoxing CPPCC", "reviewedAt": "2026-08-13"},
        {"label": "2003 conservation and museum project history", "url": "https://www.zjds.org.cn/sx/37464.jhtml", "publisher": "Zhejiang Party History and Literature Research Institute", "reviewedAt": "2026-08-13"},
        {"label": "Barrier changes and attributed desk display", "url": "https://ct.zj.gov.cn/art/2024/3/20/art_1652992_59019865.html", "publisher": "Zhejiang Department of Culture, Radio, Television and Tourism", "reviewedAt": "2026-08-13"},
        {"label": "Museum-staff account of the attributed ‘早’ desk's conservation and 2024 display", "url": "https://www.chinanews.com.cn/sh/2024/04-10/10196078.shtml", "publisher": "China News Service", "reviewedAt": "2026-08-14"},
        {"label": "From Baicao Garden to Sanwei Study", "url": "https://www.chinawriter.com.cn/news/2013/2013-02-06/153980.html", "publisher": "China Writers Association", "reviewedAt": "2026-08-13"},
        {"label": "Dawn Blossoms Plucked at Dusk as crafted recollection", "url": "https://www.chinawriter.com.cn/n1/2022/0428/c419384-32410615.html", "publisher": "China Writers Association", "reviewedAt": "2026-08-13"},
        {"label": "Kong Yiji text and publication context", "url": "https://www.chinawriter.com.cn/n1/2021/0907/c440988-32220179.html", "publisher": "China Writers Association", "reviewedAt": "2026-08-13"},
        {"label": "Current Xianheng tourism presentation", "url": "https://sxwg.sx.gov.cn/art/2024/9/3/art_1644765_59016443.html", "publisher": "Shaoxing Culture and Tourism authority", "reviewedAt": "2026-08-13"},
        {"label": "Xianheng Hotel operator chronology: 1981 reopening and later partial retention and rebuilding", "url": "https://www.xianheng.com/index.php?a=show&c=index&catid=151&id=1&m=content", "publisher": "Xianheng Hotel", "reviewedAt": "2026-08-14"},
        {"label": "2025 literary-IP district presentation", "url": "https://ct.zj.gov.cn/art/2025/10/14/art_1673778_59028174.html", "publisher": "Zhejiang Department of Culture, Radio, Television and Tourism", "reviewedAt": "2026-08-14"},
        {"label": "Official one-, two- and three-hour route page; dated orientation, not a current timetable", "url": "https://sxlxmuseum.com/gcyx.htm", "publisher": "Shaoxing Lu Xun Native Place and Shen Garden Scenic Area", "reviewedAt": "2026-08-14"},
        {"label": "February 2026 special-hours and reservation notice for named holiday dates", "url": "https://www.thepaper.cn/newsDetail_forward_32587318", "publisher": "The Paper, carrying the venue notice", "reviewedAt": "2026-08-13"},
        {"label": "Hero: New Taimen small reception room by Yumeto; cropped, CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:20250717_Small_reception_room_of_the_former_residence_of_Lu_Xun.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "Old Taimen entrance by Gisling; cropped, CC BY 3.0", "url": "https://commons.wikimedia.org/wiki/File:Ancestral_home_of_Luxun.JPG", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "Sanwei Study by Yumeto; cropped, CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:20250717_Sanwei_Shuwu.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "New Taimen west-axis building by 猫猫的日记本; cropped, CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:Former_Residence_of_Lu_Xun_in_Shaoxing_01_2018-09.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "Baicao Garden gateway by Yiwen122; people-free crop, CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:Baicao_garden.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "Shaoxing Lu Xun Memorial Museum by Huanokinhejo; cropped, CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:Lu_Xun_memorial,_Shaoxing.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "Xianheng Hotel by Amarespeco; cropped, CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:%E5%92%B8%E4%BA%A8%E9%85%92%E5%BA%972017.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "CC BY-SA 4.0 licence for the cropped derivatives", "url": "https://creativecommons.org/licenses/by-sa/4.0/", "publisher": "Creative Commons", "reviewedAt": "2026-08-13"},
        {"label": "CC BY 3.0 licence for the cropped Old Taimen derivative", "url": "https://creativecommons.org/licenses/by/3.0/", "publisher": "Creative Commons", "reviewedAt": "2026-08-13"}
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
