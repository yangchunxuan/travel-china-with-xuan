import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "The Meizhou Mazu Ancestral Temple is simultaneously an institution, a layered building complex, a centre of living belief and a place presented to visitors. Reading all of that as one undifferentiated ‘ancient temple’ erases the most useful distinctions. This guide holds four evidence layers apart, then offers a low-interference way for a non-believer to observe without claiming access to a rite. It is not an arrival plan, opening-hours page or promise that a ceremony will occur."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "The short answer",
      body: "Ask four separate questions: what does the ancestral-temple institution say about itself; what does the documented construction chronology support; what do UNESCO and China's ICH record say about living belief and customs; and what belongs to traditional narrative or modern visitor presentation? Respectful observation begins by naming the layer before interpreting the scene.",
      tone: "decision"
    },
    {
      id: "layers-heading",
      type: "heading",
      level: 2,
      text: "What are the four cultural evidence layers?"
    },
    {
      id: "layers-table",
      type: "table",
      caption: "Related layers that should not be collapsed",
      columns: ["Layer", "What the evidence supports", "What it does not prove"],
      rows: [
        ["Institution and building history", "A named ancestral-temple institution, a nationally protected property and a documented sequence of rebuilding and expansion", "That every visible hall is an original thousand-year-old structure"],
        ["Mazu belief and customs", "A living body of oral traditions, religious ceremonies and folk practices inscribed by UNESCO in 2009", "That a rite will happen during an ordinary visit or that an observer may join it"],
        ["Traditional narrative", "Community accounts of Mazu's life, virtues, rescue and commemoration as belief tradition", "An independently verified secular biography for every narrated detail"],
        ["Modern visitor presentation", "Scenic framing, exhibition facilities, monumental spaces and interpretive language made for contemporary audiences", "The age of a structure, the authenticity of a rite or the beliefs of people in view"]
      ]
    },
    {
      id: "institution-heading",
      type: "heading",
      level: 2,
      text: "What does ‘ancestral temple’ name here?"
    },
    {
      id: "institution-context",
      type: "paragraph",
      text: "The temple's own introduction locates the complex in Gongxia Village in the north of Meizhou Island and describes both a west-axis and a south-axis group. The phrase ‘Meizhou Mazu Ancestral Temple’ therefore names more than one hall: it can refer to the institution, its worshipping community and the broader complex it manages. A sign that establishes the institution does not, by itself, date the material in the next doorway. Keep the property name, the building name and the construction claim as three separate pieces of information."
    },
    {
      id: "axis-figure",
      type: "figure",
      src: "/images/guides/meizhou-mazu-ancestral-temple-reading-guide/ancestral-temple-axis-1400.webp",
      alt: "A view down a stepped axis in the Meizhou Mazu Ancestral Temple complex, framed by two multi-storey buildings.",
      width: 1400,
      height: 1050,
      caption: "Meizhou Mazu Ancestral Temple on 23 September 2012. Photo: 江上清风1961, CC BY 3.0; resized by Homeground. The file identifies the place, not the age of the visible buildings."
    },
    {
      id: "chronology-heading",
      type: "heading",
      level: 2,
      text: "How old are the buildings visible today?"
    },
    {
      id: "chronology",
      type: "paragraph",
      text: "The institution presents a long sequence of founding, repair and enlargement in its historical account. It also gives a decisive modern boundary: the west-axis complex seen today is principally the result of rebuilding that began in the 1980s and was completed in 1994. Work on the new south-axis group began in 1998 and was completed in 2002. Those dates do not erase the site's earlier history. They explain why institutional continuity, protected heritage and the physical age of a visible structure are related but not identical claims."
    },
    {
      id: "protection-record",
      type: "paragraph",
      text: "The State Council's sixth national protected-site list records ‘Mazu Temple’ in Putian as entry III-300 and assigns the period ‘Qing’. Read that as the official designation record for the protected property, not as a blanket label for every roof, gate, stair and display now inside the visitor's field of view. If a particular component needs dating, the strongest evidence is a component-level conservation or construction label, not architectural appearance alone."
    },
    {
      id: "rebuild-warning",
      type: "callout",
      title: "Ancient origin is not the same claim as ancient visible fabric",
      body: "A place may preserve a centuries-long institutional and devotional lineage while many structures have been repaired, rebuilt or newly added. Use ‘ancestral temple with a long history’ for the institution when supported; use the 1980s–1994 and 1998–2002 chronology for the present west and south axes. Do not call the whole visible complex a surviving thousand-year-old original.",
      tone: "warning"
    },
    {
      id: "architecture-reading",
      type: "list",
      ordered: true,
      items: [
        "Read the full site or protection plaque first: record the issuer, exact property name and designated period.",
        "Then read the component label: a hall, gate, tower, platform or exhibition building may have its own date and intervention history.",
        "Separate ‘founded’, ‘rebuilt’, ‘restored’ and ‘completed’. They answer different historical questions.",
        "Treat stylistic words such as ‘Song-style’ as design descriptions unless the label explicitly identifies surviving fabric.",
        "When no component-level date is available, describe only the visible form and leave the age open."
      ]
    },
    {
      id: "drum-figure",
      type: "figure",
      src: "/images/guides/meizhou-mazu-ancestral-temple-reading-guide/drum-tower-1400.webp",
      alt: "A red-and-white tower with an orange tiled roof at the Meizhou Mazu Ancestral Temple, with the sea in the distance.",
      width: 1400,
      height: 789,
      caption: "File-identified drum tower at the Meizhou Mazu Ancestral Temple on 23 September 2012. Photo: 江上清风1961, CC BY 3.0; resized by Homeground. The image does not date the structure."
    },
    {
      id: "drum-boundary",
      type: "paragraph",
      text: "The Commons filename identifies this subject as the drum tower; the photograph and its category confirm the ancestral-temple location and 2012 capture date. Roof shape, colour and surface finish cannot establish the tower's construction date. This is exactly the point of an evidence-layer reading: file identification can name a subject, while a component-level institutional or conservation record must carry the chronology."
    },
    {
      id: "belief-heading",
      type: "heading",
      level: 2,
      text: "What does the intangible-heritage inscription recognize?"
    },
    {
      id: "belief-context",
      type: "paragraph",
      text: "UNESCO inscribed Mazu belief and customs on the Representative List of the Intangible Cultural Heritage of Humanity in 2009. Its description includes oral traditions, religious ceremonies and folk practices across coastal communities. China's national ICH page classifies the element as social practices, rituals and festive events. The protected subject is therefore not just a statue or one building. It includes knowledge, memory, relationships and actions carried by communities. A visitor sees only a particular moment within that larger living system."
    },
    {
      id: "tradition-heading",
      type: "heading",
      level: 2,
      text: "How should traditional accounts of Mazu's life be written?"
    },
    {
      id: "tradition-table",
      type: "table",
      caption: "Keep belief tradition and secular proof in their proper registers",
      columns: ["Source wording or claim", "Safe reading", "Unsafe upgrade"],
      rows: [
        ["UNESCO says Mazu is believed to have lived on Meizhou Island in the tenth century", "Report it as a belief- and community-tradition frame", "‘UNESCO proved every event in Mazu's biography’"],
        ["Chinese ICH and temple accounts narrate help, rescue, death and commemoration", "Attribute the account and explain the values it carries", "Present every narrated deed as independently verified secular history"],
        ["A dated state list records a protected property and period", "Use it for the legal heritage designation it actually gives", "Use it to authenticate every devotional narrative or visible building"],
        ["Contemporary interpretation celebrates compassion, aid and social bonds", "Read this as living meaning and public memory", "Infer that every visitor or local person holds the same belief"]
      ]
    },
    {
      id: "tradition-callout",
      type: "callout",
      title: "Attribution preserves meaning",
      body: "Phrases such as ‘believers hold’, ‘the tradition recounts’ and ‘the temple's official history says’ do not weaken the tradition. They show whose knowledge is being presented and prevent a devotional account from being mislabelled as a fully verified secular biography.",
      tone: "neutral"
    },
    {
      id: "practice-heading",
      type: "heading",
      level: 2,
      text: "What makes this living practice rather than a static display?"
    },
    {
      id: "practice-context",
      type: "paragraph",
      text: "UNESCO describes formal temple fairs, smaller worship ceremonies, offerings, processions and other community practices. These examples explain the breadth of the element; they are not a 2026 event calendar for this site. A hall can shift from visitor circulation to active devotional use, and the people present are participants before they are visual content. Do not infer belief, role, emotion or origin from clothing, an offering or proximity to a shrine. A dated organiser notice is needed before naming any specific event as available to visitors."
    },
    {
      id: "observer-heading",
      type: "heading",
      level: 2,
      text: "A low-interference framework for a non-believer"
    },
    {
      id: "observer-method",
      type: "list",
      ordered: true,
      items: [
        "Pause at the edge of an active space. Let worshippers, processions and attendants set the movement pattern before you choose where to stand.",
        "Keep routes, thresholds, offering tables and sightlines clear. A better view is not a reason to displace a participant.",
        "Observe without copying gestures or joining a sequence you do not understand. Participation should follow a clear invitation or site instruction, never imitation.",
        "Treat the camera as put away until the responsible site or event authority gives a current answer for that exact space and moment.",
        "Do not touch ritual objects, offerings or images to test their material, move them for a photograph or make the scene easier to explain.",
        "If the space becomes crowded, quiet or processional, step back. Community use takes priority over completing an editorial checklist."
      ]
    },
    {
      id: "observer-table",
      type: "table",
      caption: "Respond to the situation without claiming an official route",
      columns: ["What you notice", "Low-interference response", "Do not assume"],
      rows: [
        ["People queueing with offerings or incense", "Stay outside the line unless an attendant clearly directs you", "That the queue is a visitor attraction or open participation"],
        ["Chanting, music, bells or a moving group", "Stop crossing the flow and give the group space", "That the action is scheduled, staged or open to recording"],
        ["A barrier, closed doorway or staff redirection", "Accept the boundary and continue only where directed", "That an online photograph grants access"],
        ["An apparently quiet hall", "Read posted notices and observe from public circulation", "That quiet means photography, touching or entry is allowed"],
        ["No English explanation", "Use the exact Chinese name on the sign for later verification", "That atmosphere is enough to identify the rite or date the room"]
      ]
    },
    {
      id: "observer-boundary",
      type: "callout",
      title: "This is an editorial minimum, not an official etiquette code",
      body: "No complete, current site-specific rule for ordinary movement, interior photography, video, flash, tripods, drones or ritual observation was located in the reviewed official pages. Ask the responsible authority on the day. Silence online is not permission, and a Commons licence for an old photograph is not venue approval for a new one.",
      tone: "warning"
    },
    {
      id: "tourism-heading",
      type: "heading",
      level: 2,
      text: "Where does modern tourism presentation enter?"
    },
    {
      id: "tourism-context",
      type: "paragraph",
      text: "The official temple page presents named scenic components, large plazas, an exhibition hall, monumental sculpture and visitor viewpoints alongside the devotional complex. These are valid evidence of how the institution addresses contemporary pilgrims and tourists. They should not be used to authenticate the age of adjacent fabric or to turn living practice into a guaranteed performance. A landscaped view can be modern presentation, a protected place and a devotional setting at the same time; the correct description depends on the claim being made."
    },
    {
      id: "operations-exclusion",
      type: "callout",
      title: "Deliberate operational exclusions",
      body: "This page publishes no fixed opening hours, ferry timetable, foreign-passport booking path, step-free route, photography permission, ritual schedule, performance guarantee or tested visit duration. Each requires current evidence from the responsible operator or site. The cultural framework remains useful even when access and operations change.",
      tone: "warning"
    },
    {
      id: "photo-heading",
      type: "heading",
      level: 2,
      text: "What do these photographs establish?"
    },
    {
      id: "photo-boundary",
      type: "paragraph",
      text: "All three photographs were taken by 江上清风1961 on 23 September 2012 and are published on Wikimedia Commons under CC BY 3.0. Commons coordinates and the ‘Mazu Temple, Meizhou Island’ category support the location; the drum-tower filename supports that one subject label. Homeground used a centre crop for the hero and converted all three supplied derivatives to WebP. The images do not establish 2026 access, photography rules, ritual availability, participant identity or the age of every visible component. No AI-generated or AI-assisted image is used."
    },
    {
      id: "terms-heading",
      type: "heading",
      level: 2,
      text: "Useful terms for signs and follow-up research"
    },
    {
      id: "terms-table",
      type: "table",
      caption: "Keep the object and evidence type visible in the wording",
      columns: ["Term", "Use it for", "Evidence boundary"],
      rows: [
        ["湄洲妈祖祖庙 / Meizhou Mazu Ancestral Temple", "The named ancestral-temple institution and complex", "Not a component-level date"],
        ["西轴线 / 南轴线", "The west- and south-axis building groups in the official chronology", "Not an official visitor route"],
        ["妈祖信俗 / Mazu belief and customs", "The living belief and customs element", "Not a promise of a rite on a chosen date"],
        ["传统叙事", "Community and devotional accounts", "Not automatically a verified secular biography"],
        ["重建 / 修缮 / 新建", "Different kinds of intervention", "Do not collapse them into ‘ancient’ or ‘fake’"],
        ["旅游展示", "Contemporary scenic and interpretive presentation", "Not proof of material age or participant belief"]
      ]
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue with another evidence-led cultural guide",
      items: [
        {
          label: "Read original, repaired, rebuilt and relocated heritage correctly",
          href: "/guides/how-to-read-heritage-sites-in-china/",
          description: "Use the same intervention vocabulary at other Chinese heritage sites."
        },
        {
          label: "Visit an archaeological-site museum without collapsing site and display",
          href: "/guides/how-to-visit-an-archaeological-site-museum/",
          description: "Carry the evidence-layer method into ruins, reconstructions and object labels."
        },
        {
          label: "Understand Spring Festival customs and visitor boundaries",
          href: "/guides/lunar-new-year-customs-for-visitors/",
          description: "Separate living family and community practice from a tourist performance."
        }
      ]
    },
    {
      id: "closing-note",
      type: "paragraph",
      text: "A careful reading does not ask whether the Meizhou Mazu Ancestral Temple is ‘really ancient’ or ‘only modern’. It asks which continuity is institutional, which fabric has a documented date, which narrative belongs to belief tradition, which action is living community practice and which view is contemporary presentation. That sharper vocabulary leaves more room for both history and respect."
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources and image records reviewed on 15 August 2026",
      items: [
        {
          label: "Mazu belief and customs",
          url: "https://ich.unesco.org/en/RL/mazu-belief-and-customs-00227",
          publisher: "UNESCO Intangible Cultural Heritage",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Mazu belief and customs — China ICH directory record",
          url: "https://www.ihchina.cn/directory_details/11811",
          publisher: "China Intangible Cultural Heritage Network / China National Center for Safeguarding Intangible Cultural Heritage",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Meizhou Mazu Ancestral Temple introduction and construction chronology",
          url: "https://www.mzmz.org.cn/mzmzzm.html",
          publisher: "Meizhou Mazu Ancestral Temple",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Mazu Ancestral Temple scenic-place introduction",
          url: "https://mzd.putian.gov.cn/jggk/jdjs/202301/t20230120_1796135.htm",
          publisher: "Meizhou Island Administrative Committee",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Sixth national list of major protected historical and cultural sites",
          url: "https://zwgk.mct.gov.cn/zfxxgkml/qt/202012/t20201206_918486.html",
          publisher: "Ministry of Culture and Tourism / State Council record",
          reviewedAt: "2026-08-15"
        },
        {
          label: "古妈祖庙 - panoramio (1).jpg — 江上清风1961, CC BY 3.0",
          url: "https://commons.wikimedia.org/wiki/File:%E5%8F%A4%E5%A6%88%E7%A5%96%E5%BA%99_-_panoramio_(1).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-15"
        },
        {
          label: "古妈祖庙 - panoramio.jpg — 江上清风1961, CC BY 3.0",
          url: "https://commons.wikimedia.org/wiki/File:%E5%8F%A4%E5%A6%88%E7%A5%96%E5%BA%99_-_panoramio.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-15"
        },
        {
          label: "古妈祖鼓楼 - panoramio.jpg — 江上清风1961, CC BY 3.0",
          url: "https://commons.wikimedia.org/wiki/File:%E5%8F%A4%E5%A6%88%E7%A5%96%E9%BC%93%E6%A5%BC_-_panoramio.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-15"
        },
        {
          label: "CC BY 3.0 licence for the three Meizhou photographs",
          url: "https://creativecommons.org/licenses/by/3.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-15"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
