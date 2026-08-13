import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "Qingming Riverside Landscape Garden is worth its ticket when you want a walkable, theatrical interpretation of the Qingming scroll—not surviving Northern Song Kaifeng. The scroll records selected movement and commerce; the modern park turns motifs into entertainment space; Zhouqiao supplies material evidence at an original crossing. Read all three, but never use one as proof for another. This guide provides a 3–4-hour park route, a material-evidence alternative and recovery when shows or archaeological access change.",
    },
    {
      id: "names-heading",
      type: "heading",
      level: 2,
      text: "Is Millennium City Park the Song city shown in the scroll?",
    },
    {
      id: "names-paragraph",
      type: "paragraph",
      text:
        "No. Qingming Riverside Landscape Garden, Millennium City Park and Qingming Shanghe Garden name the same Kaifeng attraction, Qingming Shanghe Yuan in Chinese. Opened in 1998, it is a modern theme park inspired by Zhang Zeduan's Qingming Shanghe Tu (Along the River During the Qingming Festival). Its buildings are not an intact Northern Song district and the scroll is not a construction drawing. The park's value is different: it gives walkable scale to water, bridges, gates and streets when treated as interpretation rather than recovered fabric.",
    },
    {
      id: "evidence-layers",
      type: "table",
      caption: "Four layers to keep separate while visiting Kaifeng",
      columns: ["Layer", "What it can establish", "What it cannot establish"],
      rows: [
        [
          "History and archaeology",
          "Original location, materials, phases and buried urban relationships at Zhouqiao.",
          "A complete street scene or every lost building.",
        ],
        [
          "The painting as an artwork",
          "What Zhang Zeduan selected and arranged in a long handscroll.",
          "A parcel survey or undisputed coordinate for every structure.",
        ],
        [
          "Modern tourism presentation",
          "How the park converts motifs into spaces, performances and services.",
          "That themed buildings are originals or certified one-to-one reconstructions.",
        ],
        [
          "Homeground planning judgment",
          "Which sequence answers your question and how to recover from change.",
          "New historical facts or guaranteed opening.",
        ],
      ],
    },
    {
      id: "short-answer",
      type: "callout",
      title: "The direct answer",
      body:
        "Choose the park for spatial storytelling, performances and family-friendly interpretation. Choose confirmed Zhouqiao access or Kaifeng Museum when location, layers and artefacts matter more. With enough time, let the park pose questions and material evidence limit the historical claims.",
      tone: "decision",
    },
    {
      id: "scroll-heading",
      type: "heading",
      level: 2,
      text: "What can the Qingming scroll actually prove?",
    },
    {
      id: "scroll-object",
      type: "paragraph",
      text:
        "The Palace Museum identifies a Northern Song handscroll by Zhang Zeduan, silk, 24.8 by 528 centimetres. Its description moves through countryside, the Bian River and Hongqiao, then a gate and streets. Boats, porters, carts, animals and shops record what the artist selected. But a handscroll has no single fixed viewpoint: it guides the eye through successive, compressed scenes. Palace Museum scholar Yu Hui calls this real conditions rather than one literal scene—an attributed interpretation, not permission to dismiss every detail as imaginary.",
    },
    {
      id: "scroll-observation",
      type: "list",
      items: [
        "Follow outer landscape, river and bridge, then gate and denser streets; this is more useful than hunting for one modern address.",
        "At the painted Hongqiao, notice a lowering mast, the bridge crowd and traffic above and below: an urban system, not only a bridge portrait.",
        "Treat occupations, vehicles and signs as selected pictorial detail, not proof that every park costume or storefront is exact.",
        "The Palace Museum holds the original but does not guarantee it is displayed on your dates. A park relief is a modern copy.",
      ],
    },
    {
      id: "park-relief-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/park-scroll-relief-1280.webp",
      alt: "A modern relief in Qingming Riverside Landscape Garden showing the crowded painted Hongqiao scene.",
      width: 1280,
      height: 853,
      caption:
        "This park relief enlarges the scroll's bridge scene for public viewing. It is useful as an orientation device, not as a Northern Song artefact or the Palace Museum original.",
    },
    {
      id: "scroll-boundary",
      type: "callout",
      title: "Do not turn a handscroll into a cadastral map",
      body:
        "Researchers debate the work's geography, season and purpose. The safe conclusion is narrower: concrete urban observations were arranged through artistic choices. The scroll prompts questions about movement and trade, but cannot authorize a building-by-building reconstruction by itself.",
      tone: "warning",
    },
    {
      id: "bridges-heading",
      type: "heading",
      level: 2,
      text: "Why are the painted Hongqiao, park Hongqiao and Zhouqiao three different bridges?",
    },
    {
      id: "bridges-table",
      type: "table",
      caption: "Three bridges, three kinds of evidence",
      columns: ["Bridge", "What it is", "What to ask"],
      rows: [
        [
          "Hongqiao in the scroll",
          "The central wooden arch in Zhang Zeduan's composition, also named Shangtu Bridge by the Palace Museum.",
          "How are boats, a lowered mast and crowds organized?",
        ],
        [
          "Hongqiao in the park",
          "A modern bridge turning the painted motif into a visitor route.",
          "How does it carry today's visitors and make the scene three-dimensional?",
        ],
        [
          "Zhouqiao",
          "The archaeological site at the imperial street–Bian River crossing, south of today's Zhongshan–Ziyou junction.",
          "Which materials and layers belong to which period?",
        ],
      ],
    },
    {
      id: "modern-hongqiao-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/modern-hongqiao-1280.webp",
      alt: "The modern red Hongqiao bridge crossing a waterway inside Qingming Riverside Landscape Garden.",
      width: 1280,
      height: 853,
      caption:
        "The park's Hongqiao is a modern visitor structure. Compare how it carries people across water; do not caption it as the surviving Northern Song bridge or Zhouqiao. Photo: Windmemories / Wikimedia Commons, CC BY-SA 4.0; resized.",
    },
    {
      id: "bridge-reading",
      type: "paragraph",
      text:
        "Two institutional descriptions establish the distinction: the Palace Museum names the painted bridge Hongqiao or Shangtu Bridge, while Henan archaeologists locate Zhouqiao at the imperial-street crossing. The park adds a third, modern Hongqiao. This is an editorial inference from official evidence, not a claim that every debate over the scroll's geography is settled.",
    },
    {
      id: "zhouqiao-heading",
      type: "heading",
      level: 2,
      text: "What does Zhouqiao archaeology add that the park cannot?",
    },
    {
      id: "zhouqiao-evidence",
      type: "paragraph",
      text:
        "Zhouqiao adds an original coordinate and stratigraphy. Archaeologists record a bridge at the imperial street–Bian River intersection, used or rebuilt across dynasties before flood sediment buried it in 1642. Excavation since 2018 has exposed river, bridge and bank remains. The institute infers a Northern Song column-and-beam flat bridge whose body no longer survives; the main excavated arch is early Ming on Song foundations. Northern Song stone banks carry mythical sea-horses amid waves, cranes and auspicious clouds. Ask “Which layer?” rather than calling everything a complete Song bridge.",
    },
    {
      id: "zhouqiao-observation",
      type: "list",
      items: [
        "Locate the north–south imperial route meeting the east–west Bian River; urban position matters more than resemblance to the painted Hongqiao.",
        "Read labels for date and material. A Ming arch on Song foundations and a Song revetment are related but distinct.",
        "Look for river width, banks and flood deposits: archaeology reconstructs change through layers.",
        "If carving is visible, check whether it is original, relocated or reproduced and whether conservation limits distance.",
      ],
    },
    {
      id: "zhouqiao-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/zhouqiao-site-exterior-1280.webp",
      alt: "Street-side enclosure and protective structure around the Zhouqiao archaeological area in Kaifeng in 2021.",
      width: 1280,
      height: 853,
      caption:
        "This 2021 photograph shows the archaeological area's exterior, not exposed bridge remains and not proof of current public access. Confirm the present viewing arrangement before building a visit around it. Photo: Windmemories / Wikimedia Commons, CC BY-SA 4.0; resized.",
    },
    {
      id: "zhouqiao-dynamic",
      type: "callout",
      title: "Do not treat archaeological access as guaranteed",
      body:
        "Archaeological reports establish Zhouqiao's significance, but not a complete 2026 chain for ordinary admission, booking, tickets or foreign-passport handling. Confirm with the operating or protection unit. If entry is unavailable, stay in lawful public space and use Kaifeng Museum for broader material history; never cross barriers.",
      tone: "warning",
    },
    {
      id: "park-heading",
      type: "heading",
      level: 2,
      text: "What did the modern park actually build?",
    },
    {
      id: "park-history",
      type: "paragraph",
      text:
        "The district government records an opening in 1998, a 2005 second phase extending street imagery toward inner-city and imperial-garden themes, and a 2023 phase adding contemporary rides. This history disproves the idea of a sealed copy of the scroll. Government and operator descriptions sometimes say “1:1 reproduction”; that is project-positioning language, not archaeological certification that each footprint, material or elevation matches the painting.",
    },
    {
      id: "park-growth",
      type: "list",
      items: [
        "Paint-derived: relief, named Hongqiao and motifs recognizable from the scroll.",
        "Broader Song-city theme: gates, streets and halls create continuity beyond one handscroll.",
        "Royal and entertainment theme: later phases add palace imagery, rides and night products—valid theme-park content, not original fabric.",
        "Operations: shops, stages and service routes answer today's safety and capacity, not historical evidence.",
      ],
    },
    {
      id: "linshui-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/linshui-hall-1280.webp",
      alt: "The façade and paired halls of the modern Linshui Hall complex inside Qingming Riverside Landscape Garden.",
      width: 1280,
      height: 960,
      caption:
        "Linshui Hall belongs to the park's expanded themed landscape. Use it to see how the attraction moves beyond the scroll, not to claim a surviving Song building or an exact painted counterpart. Photo: Yumeto / Wikimedia Commons, CC BY-SA 4.0.",
    },
    {
      id: "park-onsite-heading",
      type: "heading",
      level: 2,
      text: "How should you read the park on site instead of chasing every attraction?",
    },
    {
      id: "park-route-intro",
      type: "paragraph",
      text:
        "Use one evidence route despite schedule changes: relief, modern Hongqiao, gate and street, then the expanded palace-style landscape. It moves from two-dimensional artwork to walkable interpretation and later additions. At each stop ask whether the basis is the painting, another source, modern design or operations. A building name alone supplies no reconstruction evidence.",
    },
    {
      id: "relief-stop-heading",
      type: "heading",
      level: 3,
      text: "Stop 1: use the park relief as a visual index",
    },
    {
      id: "relief-stop",
      type: "paragraph",
      text:
        "Spend 15–20 minutes finding countryside, river, city and the central bridge. An intimate handscroll has become a public relief: easier to share, but different in sequence, surface and handling. Pick two details, such as the lowered mast and bridge crowd, to track later. Never label the relief as the Palace Museum original.",
    },
    {
      id: "bridge-stop-heading",
      type: "heading",
      level: 3,
      text: "Stop 2: compare movement at the modern Hongqiao",
    },
    {
      id: "bridge-stop",
      type: "paragraph",
      text:
        "Give the bridge 25–35 minutes. Watch visitors cross and stop, then look toward the water. The scroll compresses a near-collision, lowering mast and audience; the modern bridge manages safe circulation. Compare how each organizes movement, not whether their silhouettes prove structural accuracy. When congested, cross without stopping and observe from a permitted bank.",
    },
    {
      id: "gate-stop-heading",
      type: "heading",
      level: 3,
      text: "Stop 3: let Shangshan Gate test your labels",
    },
    {
      id: "gate-stop",
      type: "paragraph",
      text:
        "The museum description calls the painted gate East Corner Gate; the park calls its structure Shangshan Gate. Similar river-to-city functions do not make them identical. Read the stated basis, then see how façades and shops direct today's crowd. “Song style” may mean stylistic reference, not surviving timber or archaeological reconstruction. Our timber-frame guide helps ask structural questions without guessing age from appearance.",
    },
    {
      id: "shangshan-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/shangshan-gate-1280.webp",
      alt: "The modern Shangshan Gate and visitor route inside Qingming Riverside Landscape Garden.",
      width: 1280,
      height: 853,
      caption:
        "Shangshan Gate helps the park create a transition into its themed city. It should not be renamed as the scroll's East Corner Gate or presented as a surviving Northern Song gate. Photo: Windmemories / Wikimedia Commons, CC BY-SA 4.0; resized.",
    },
    {
      id: "extension-stop-heading",
      type: "heading",
      level: 3,
      text: "Stop 4: recognize where the park deliberately goes beyond the scroll",
    },
    {
      id: "extension-stop",
      type: "paragraph",
      text:
        "Spend about 30 minutes in later palace-style or entertainment areas only if they interest you. Halls, gardens and rides expand toward a broader “Song capital” story. Stop matching every building to the scroll; instead note the source named on signs and what serves present-day spectacle or circulation. Scroll-focused visitors can turn back after the gate and street.",
    },
    {
      id: "performance-heading",
      type: "heading",
      level: 2,
      text: "What can a park performance teach—and what can it never prove?",
    },
    {
      id: "performance-paragraph",
      type: "paragraph",
      text:
        "A performance can make conflict, costume and gesture memorable while revealing the park's priorities. The current programme mixes historical-personality scenes, acrobatics, wuxia, technology, rides and night products: a contemporary entertainment system, not recorded Northern Song life. Choose one form that interests you. Ask what was adapted or invented for modern audiences and whether an official introduction names its sources.",
    },
    {
      id: "performance-check",
      type: "list",
      items: [
        "Check the current operator programme, not an old blog timetable.",
        "Confirm venue and inclusion on the day; no universal 2026 ticket-inclusion rule was verified.",
        "Treat costumes and episodes as staged interpretation unless a label supplies evidence.",
        "Follow photography signs; a public show does not grant publication rights for close-ups.",
      ],
    },
    {
      id: "performance-dynamic",
      type: "callout",
      title: "Build a route that survives a cancelled show",
      body:
        "The operator warns that weather or other conditions can change or cancel performances. If your choice disappears, continue the relief–Hongqiao–gate–expanded-landscape sequence. Its spatial comparison needs no cast or fixed time.",
      tone: "warning",
    },
    {
      id: "decision-heading",
      type: "heading",
      level: 2,
      text: "How do you turn this into a 3–4-hour visit—and is the ticket right for you?",
    },
    {
      id: "sequence",
      type: "list",
      ordered: true,
      items: [
        "Orientation, 15–20 minutes: locate the scroll's sequence and select two details to track.",
        "Hongqiao, 25–35 minutes: compare bridge and water movement; observe from the bank if stopping obstructs others.",
        "Gate and street, 40–50 minutes: test names and separate themed commerce from claims about original fabric.",
        "One flexible show block: check that day's duration, venue and inclusion; skip it if changed.",
        "Expanded area, about 30 minutes: identify where the park exceeds the scroll; shorten this first when tired.",
        "Flexible margin, 30–45 minutes: absorb queues, weather and rest. Stay into night only for a current night product you genuinely want.",
      ],
    },
    {
      id: "visitor-scenarios",
      type: "comparison",
      title: "Choose by the question you want the place to answer",
      columns: [
        {
          heading: "Park-first traveller",
          items: [
            "You want a walkable introduction or travel with children.",
            "You enjoy staged interaction but separate atmosphere from evidence.",
            "Use the route, then add a museum or confirmed Zhouqiao visit for material correction.",
          ],
        },
        {
          heading: "Material-evidence-first traveller",
          items: [
            "You want original location, artefacts, phases or stratigraphy.",
            "Theme architecture and amplified shows reduce your interest.",
            "Verify Zhouqiao or start at Kaifeng Museum; skipping the park is not skipping all Song history.",
          ],
        },
        {
          heading: "Time-short traveller",
          items: [
            "Choose one: park for interpretation; confirmed Zhouqiao or museum for evidence.",
            "Do not race among all three to mark them complete.",
            "When access is uncertain, recheck the museum's reservation and exhibitions as a recovery candidate.",
          ],
        },
      ],
    },
    {
      id: "ticket-decision",
      type: "callout",
      title: "When the park ticket has clear value",
      body:
        "The park fits visitors wanting a large-scale scroll translation, family-accessible space or performance. It is weak for those seeking only original Song material or avoiding theme-park sound and interaction. Accessible 2026 official material did not close current price, passport handling, inclusions or day/night product relationships; verify the current operator sales channel before paying.",
      tone: "decision",
    },
    {
      id: "mistakes-heading",
      type: "heading",
      level: 2,
      text: "What should you never assume from this visit?",
    },
    {
      id: "mistakes",
      type: "list",
      items: [
        "Park buildings are not Northern Song originals surviving on site.",
        "The scroll cannot be matched building by building to the park.",
        "Painted Hongqiao, modern park Hongqiao and Zhouqiao are three bridges.",
        "The excavated early-Ming arch on Song foundations is not an intact Song bridge; the inferred Song bridge body is gone.",
        "A performance is not direct proof of Northern Song life.",
        "Do not expect Zhang Zeduan's original in Kaifeng or assume it is on view at the Palace Museum.",
      ],
    },
    {
      id: "photography-rights",
      type: "paragraph",
      text:
        "Photography and publication permission differ. Follow current signs and ask before featuring identifiable performers or children. This page excludes the Palace Museum scroll because its web image is not automatically cleared for publication. Caption your own images with date and place; never label a park relief, replica or later bridge as an original.",
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "What if a show is cancelled, Zhouqiao is unavailable or you lose time?",
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "Failure-recovery choices that preserve the article's core task",
      columns: ["Change", "Recovery", "What not to claim"],
      rows: [
        [
          "Chosen show is moved or cancelled",
          "Complete the relief, Hongqiao, gate/street and expansion route; choose another show only if useful.",
          "One missing programme does not erase the park's interpretive value.",
        ],
        [
          "Zhouqiao is not open to ordinary visitors",
          "Stay outside barriers; use lawful city context and rechecked Kaifeng Museum for broader history.",
          "The park does not replace archaeology; no museum gallery is guaranteed.",
        ],
        [
          "Park is crowded at Hongqiao",
          "Cross without stopping and observe from a permitted bank; return if circulation eases.",
          "Do not block the bridge or climb for a photograph.",
        ],
        [
          "You have less than two hours",
          "Choose relief–Hongqiao–gate or one confirmed evidence-first stop.",
          "Do not race between unrelated evidence types.",
        ],
        [
          "Rain or heat reduces stamina",
          "Prioritize the relief and bridge, use permitted shelter and shorten later areas.",
          "Follow same-day operating and performance notices.",
        ],
      ],
    },
    {
      id: "final-checklist",
      type: "list",
      items: [
        "Before paying: confirm official product, passport handling, inclusions and separate night items.",
        "Before fixing Zhouqiao: confirm ordinary access, booking, viewing scope and documents.",
        "Before departure: recheck same-day programmes and weather changes; save the no-show route.",
        "At each object: name its layer—archaeology, artwork, tourism presentation or planning judgment.",
        "Before sharing: verify image subject, date, place and permissions.",
      ],
    },
    {
      id: "consultation",
      type: "callout",
      title: "Need to fit this evidence-first visit into a wider China trip?",
      body:
        "Homeground can help decide whether Kaifeng's park, archaeology and museum fit your route, then check dynamic handoffs close to travel. Consultation starts with your interests, pace and constraints—not a preselected package.",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning with Homeground",
      items: [
        {
          label: "Read Chinese city walls, gates and urban order",
          href: "/guides/chinese-city-walls-gates-and-urban-order/",
          description: "Use material evidence, reconstruction and city planning as separate layers at another kind of urban site.",
        },
        {
          label: "Learn to read dougong and timber frames",
          href: "/guides/dougong-and-chinese-timber-frame-reading/",
          description: "Ask structural questions without deciding a building's age from its silhouette.",
        },
        {
          label: "Understand the Grand Canal through everyday urban history",
          href: "/guides/grand-canal-everyday-urban-history/",
          description: "Place waterways and urban systems ahead of decorative canal imagery.",
        },
        {
          label: "Check China's public-holiday travel calendar",
          href: "/guides/china-public-holidays-travel-calendar/",
          description: "Recheck crowd pressure and dynamic attraction operations around holiday dates.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Core sources reviewed for this guide",
      items: [
        {
          label: "Zhang Zeduan's Qingming Shanghe Tu collection record",
          url: "https://www.dpm.org.cn/collection/paint/228226.html",
          publisher: "The Palace Museum",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Palace Museum lecture on interpreting the Qingming scroll",
          url: "https://www.dpm.org.cn/forum_detail/99722.html",
          publisher: "The Palace Museum",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Research discussion of the scroll's open questions",
          url: "https://www.dpm.org.cn/study_detail/100187.html",
          publisher: "The Palace Museum",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Kaifeng Zhouqiao archaeological project overview",
          url: "https://www.hnswwkgyjy.cn/NewsView.php?News_ID=1985",
          publisher: "Henan Provincial Institute of Cultural Heritage and Archaeology",
          reviewedAt: "2026-08-13",
        },
        {
          label: "2020 Zhouqiao excavation record",
          url: "https://hnswwkgyjy.cn/NewsView.php?News_ID=2051",
          publisher: "Henan Provincial Institute of Cultural Heritage and Archaeology",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Urban archaeology in Kaifeng: progress and insights",
          url: "https://discovery.ucl.ac.uk/10183429/1/Manuscript_with_author_details_revised.pdf",
          publisher: "Archaeological Research in Asia / UCL Discovery",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Qingming Shanghe Garden development overview",
          url: "https://www.longting.gov.cn/ltq/c00044/pc/content/content_2003660780649967616.html",
          publisher: "Longting District People's Government",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Current park building directory",
          url: "https://www.qmsyun.com/Mobile_page/q_building.php",
          publisher: "Qingming Riverside Landscape Garden",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Current park programme and change notice",
          url: "https://www.qmsyun.com/Mobile_page/o_program.php",
          publisher: "Qingming Riverside Landscape Garden",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Kaifeng Museum reservation-channel statement",
          url: "https://www.kaifeng.gov.cn/kfsrmzfwz/whty/pc/content/content_1873557496836997120.html",
          publisher: "Kaifeng Municipal People's Government / Kaifeng Museum",
          reviewedAt: "2026-08-13",
        },
      ],
    },
  ],
};

export default body;
