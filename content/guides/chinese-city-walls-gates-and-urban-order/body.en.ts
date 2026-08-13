import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text:
        "A Chinese city wall is rarely one object with one date. A historic earth core may sit behind later brick facing, a gate tower may have been rebuilt after demolition, and a modern road or stair may cut through the ensemble. The useful first question is not simply “Is it original?” Ask which component survives, which was repaired, which was reconstructed, and what record supports each label.",
    },
    {
      id: "answer",
      type: "callout",
      title: "Read the wall in layers, then read the city through it",
      body:
        "Use five material-status labels: surviving historic fabric, conservation repair, reconstruction, archaeological trace and modern interpretive addition. Then walk from outside to inside: approach, wall face, gate sequence and street beyond. A wall can retain important historic fabric while also carrying centuries of repair; a reconstruction can clarify a lost urban line without becoming ancient material.",
      tone: "decision",
    },
    {
      id: "labels-heading",
      type: "heading",
      level: 2,
      text: "Five labels are more accurate than one dynasty",
    },
    {
      id: "labels",
      type: "table",
      caption: "A field vocabulary for material status",
      columns: ["Label", "What it means", "Evidence to seek", "Do not infer"],
      rows: [
        [
          "Surviving historic fabric",
          "Old material or structure documented as remaining physically in place, even if maintained later.",
          "A conservation survey, archaeological report or component-level heritage label.",
          "That every visible brick belongs to the same date.",
        ],
        [
          "Conservation repair",
          "Work intended to stabilise or maintain a historic structure, sometimes using compatible new material.",
          "A dated repair notice stating the problem, intervention and protected component.",
          "That repair is deception, or that all repaired surfaces are new.",
        ],
        [
          "Reconstruction",
          "A lost wall, tower or gate built again, sometimes on its former site using records.",
          "Demolition or loss history, reconstruction date, plans, photographs or archaeological basis.",
          "That the present superstructure is ancient because its outline is traditional.",
        ],
        [
          "Archaeological trace",
          "Buried, fragmentary or exposed evidence of a former wall, gate or road.",
          "Excavation records, a managed exposed site or an accurately marked outline.",
          "That a complete building once looked exactly like a modern visualization.",
        ],
        [
          "Interpretive addition",
          "Modern paving, lighting, model, lift, walkway or marker that makes evidence legible or accessible.",
          "A current site plan and clear separation from protected fabric.",
          "That a useful visitor feature is part of the historic structure.",
        ],
      ],
    },
    {
      id: "coexist",
      type: "callout",
      title: "Several labels can apply within ten metres",
      body:
        "A reconstructed tower may stand on a historic gate platform; repaired facing may protect an older core; a modern stair may lead to surviving masonry. “Ming city wall” can name a historical system or alignment without proving that every exposed component dates to the Ming dynasty. Date the component, not the postcard silhouette.",
      tone: "neutral",
    },
    {
      id: "functions-heading",
      type: "heading",
      level: 2,
      text: "Test function against evidence",
    },
    {
      id: "functions",
      type: "table",
      caption: "What visible features may explain",
      columns: ["What you see", "Function to test", "Evidence to seek", "Common overclaim"],
      rows: [
        [
          "Wall body and moat",
          "Delay approach, resist attack, manage water and mark an edge.",
          "Section drawing, material survey, hydrology or repair record.",
          "Every smooth brick face is old.",
        ],
        [
          "Projecting platform or tower",
          "Observe and defend the wall face.",
          "A site plan and the named component.",
          "Every projection carried the same weapon or use.",
        ],
        [
          "Gate passage and outer enclosure",
          "Funnel, inspect and control movement through a weak point.",
          "Historical plans, excavation and a documented gate sequence.",
          "Every city used an identical barbican arrangement.",
        ],
        [
          "Main street behind a gate",
          "Connect entry with markets, offices, temples or formal routes.",
          "Historic maps, road archaeology and urban-history research.",
          "Every straight avenue existed only for ritual.",
        ],
        [
          "Tower, parapet or ceremonial façade",
          "Defense, signalling, display or later symbolism.",
          "A construction and conservation date for that component.",
          "The current skyline proves old material.",
        ],
      ],
    },
    {
      id: "outside-heading",
      type: "heading",
      level: 2,
      text: "Begin outside: the wall was a working system",
    },
    {
      id: "outside",
      type: "paragraph",
      text:
        "Before climbing, stand where a traveller, cart or attacking force would have approached. Look for a moat, river, slope, open ground and nearby higher land. Height matters, but so do thickness, foundations, drainage and the ability to watch the base of the wall. Look along the wall for projecting platforms, parapets, drains and ramps. Identify the feature first; assign its date only after reading a management or conservation record. A grass verge, lighting scheme or unobstructed viewpoint may be modern landscape design that helps reveal the edge without being evidence of age.",
    },
    {
      id: "gate-heading",
      type: "heading",
      level: 2,
      text: "Pass through the gate slowly",
    },
    {
      id: "gate",
      type: "paragraph",
      text:
        "A gate must admit people and goods while protecting a weak point. Check whether the route turns, passes more than one door position, enters an outer enclosure or continues beneath a tower. Do not expect every element in every city: gates were widened, blocked, demolished and rebuilt as traffic and military needs changed. Research on Tang Chang’an shows that registers, opening and closing, curfew and maintenance helped regulate movement and social space there. That evidence belongs to a particular capital and period, not to every Chinese city. If a sign calls a gate “ritual,” look for a documented route to a palace, government centre, altar or formal procession; symmetry alone is not proof.",
    },
    {
      id: "streets-heading",
      type: "heading",
      level: 2,
      text: "Turn around: the street beyond the gate is evidence too",
    },
    {
      id: "streets",
      type: "paragraph",
      text:
        "Once inside, look back through the opening. Does a main road continue straight, shift off-axis or bend with terrain? Where are waterways, markets, official compounds and neighbourhood lanes? Walls bounded cities, concentrated entrances and influenced movement, but they were never complete diagrams of social life; commerce and informal routes also grew outside them. Archaeology can recover a wall–gate–road relationship even when little remains above ground. Beijing’s heritage record, for example, identifies only specific surviving Ming-wall components at Dongbianmen, Xibianmen and Zuo’anmen. An absent tower can therefore require an excavation report or historic map rather than a picturesque substitute.",
    },
    {
      id: "cases-heading",
      type: "heading",
      level: 2,
      text: "Four places show four different material histories",
    },
    {
      id: "cases",
      type: "table",
      caption: "Use each place for a different comparison",
      columns: ["Place", "What the record supports", "Accurate visitor label", "Avoid"],
      rows: [
        [
          "Nanjing",
          "China’s UNESCO Tentative List dossier records more than 25 kilometres standing and distinguishes original gates from later conserved or newly built ones. A 2025 municipal report documents minimum-intervention repair for cracking, weathering, drainage and water damage.",
          "A substantial surviving wall with continuing documented conservation.",
          "“Untouched Ming wall,” or dating a whole surface from one inscribed brick.",
        ],
        [
          "Xi’an",
          "The protection ordinance covers the Ming wall body, gates, ancillary buildings, moat and sites or remains. Official accounts describe major repairs beginning in 1983 and later preventive monitoring.",
          "A major historic wall system maintained and materially changed over time.",
          "Calling the complete circuit either fully original or entirely fake.",
        ],
        [
          "Beijing Yongdingmen",
          "The gate tower was demolished in 1957 and reconstructed on its former site in 2004 using survey drawings and photographs; it now helps explain the southern end of the Beijing Central Axis.",
          "A documented modern reconstruction of a lost component.",
          "Calling the present upper structure surviving 1553 material.",
        ],
        [
          "Datong",
          "The municipal account says a historical-city revival and protection project began in 2008; wall fronts, enclosures and towers were repaired or recreated, and the four sides were joined in 2016.",
          "A modern completed circuit that interprets a historical urban form.",
          "Treating one coherent appearance as proof of continuous Ming fabric.",
        ],
      ],
    },
    {
      id: "case-note",
      type: "callout",
      title: "These examples are not an authenticity ranking",
      body:
        "Nanjing, Xi’an, Yongdingmen and Datong answer different questions. Survival, repair and reconstruction can all carry evidence when they are labelled precisely. The comparison is useful because it replaces the visual test of “looks old” with a component-level record.",
      tone: "neutral",
    },
    {
      id: "field-heading",
      type: "heading",
      level: 2,
      text: "A seven-minute field check",
    },
    {
      id: "field",
      type: "list",
      ordered: true,
      items: [
        "Photograph the site name and management label before photographing the view.",
        "Find a plan and mark the wall, gate, moat, road and any missing section.",
        "Read from outside to inside: approach, wall face, gate sequence and street.",
        "Look for the Chinese terms 原存 or 遗存, 修缮, 复建 or 重建, and 遗址.",
        "Record the date attached to each component, not only the city’s founding date.",
        "Note modern safety paving, lifts, lighting and new openings separately.",
        "If the label is vague, caption the image as a visible wall at the named site rather than inventing a dynasty.",
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Choose a visit that answers your question",
    },
    {
      id: "scenarios",
      type: "comparison",
      title: "Two useful first-visit approaches",
      columns: [
        {
          heading: "One evening in Xi’an",
          body:
            "Walk a short outside–gate–inside sequence instead of racing the full circuit. Compare defensive form, modern access and the street behind one gate. Cycling, lighting and opening hours are current services, not historical evidence.",
        },
        {
          heading: "A material-history comparison",
          body:
            "Pair a place with substantial survival, such as Nanjing, with a clearly documented reconstruction such as Yongdingmen or Datong. Read the museum or conservation notice before assigning dates to photographs.",
        },
        {
          heading: "A city with little standing wall",
          body:
            "Use an archaeological site, mapped alignment or surviving fragment to reconstruct the former boundary. Do not substitute a nearby replica merely because it is easier to photograph.",
        },
      ],
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "Recover from the most common misreadings",
    },
    {
      id: "recovery",
      type: "table",
      caption: "When a label or image is not enough",
      columns: ["Problem", "Do now", "Evidence boundary"],
      rows: [
        [
          "The English sign says only “restored.”",
          "Check the Chinese term, component and date; then look for the conservation record.",
          "Restored may mean stabilised fabric, replaced facing, rebuilt tower or broad urban renewal.",
        ],
        [
          "Two sources disagree about originality.",
          "Prefer the heritage authority, archaeological report or conservation documentation over a ticket seller.",
          "If the component cannot be resolved, describe visible form without an authenticity claim.",
        ],
        [
          "The wall looks uniformly old or uniformly new.",
          "Check core, facing, tower, paving and openings separately.",
          "Colour, weathering and neat brickwork do not date material.",
        ],
        [
          "A reconstruction is dismissed as worthless.",
          "Ask what loss it records, what evidence guided it and what urban relationship it makes legible.",
          "Interpretive value does not turn new material into ancient fabric.",
        ],
      ],
    },
    {
      id: "evidence",
      type: "callout",
      title: "How this guide separates fact from interpretation",
      body:
        "Protected components, repair and reconstruction dates come from government, heritage and archaeological records. The role of Tang Chang’an gates comes from named scholarship and is not generalized to every city. The five-label key, walking sequence and photo-note method are Homeground editorial tools. No material date is inferred from appearance alone.",
      tone: "decision",
    },
    {
      id: "dynamic",
      type: "callout",
      title: "Recheck visitor operations for the travel date",
      body:
        "Entrances, maintenance closures, tickets, cycling, lifts, night lighting and museum displays are dynamic and were reviewed only at source level on 13 August 2026. This guide deliberately publishes no permanent opening hours or prices. Confirm current access with the named wall’s management body.",
      tone: "warning",
    },
    {
      id: "links",
      type: "internal-links",
      title: "Connect the wall to a real itinerary",
      items: [
        {
          label: "Choose where to stay in Xi’an",
          href: "/guides/xian-where-to-stay-city-wall-or-dayanta/",
          description: "Keep the city-wall interpretation separate from the practical decision about your hotel area.",
        },
        {
          label: "Order Shanghai, Suzhou, Hangzhou and Nanjing",
          href: "/guides/shanghai-suzhou-hangzhou-nanjing-route-order/",
          description: "Place a Nanjing wall visit inside a realistic East China route.",
        },
        {
          label: "Walk the Temple of Heaven ritual sequence",
          href: "/guides/temple-of-heaven-gates-and-ritual-sequence/",
          description: "Compare a documented ritual axis with the different evidence needed to interpret a city gate.",
        },
      ],
    },
    {
      id: "consultation",
      type: "callout",
      title: "Need the current entrance matched to the historical evidence?",
      body:
        "Tell Homeground the city, date, walking tolerance and whether you care most about defensive form, urban history or conservation. A local planner can check the current entrance and pair the walk with a museum or archaeological context without labelling reconstructed fabric as ancient.",
      tone: "neutral",
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and scholarly sources reviewed",
      items: [
        {
          label: "City Walls of the Ming and Qing Dynasties — Tentative List dossier",
          url: "https://whc.unesco.org/en/tentativelists/5324/",
          publisher: "UNESCO World Heritage Centre",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Nanjing City Wall protection ordinance",
          url: "https://www.nanjing.gov.cn/zdgk/201605/t20160506_1056849.html",
          publisher: "Nanjing Municipal Government",
          reviewedAt: "2026-08-13",
        },
        {
          label: "2025 conservation of the Jiefangmen–Xuanwumen wall section",
          url: "https://www.nanjing.gov.cn/njxx/202508/t20250826_5635731.html",
          publisher: "Nanjing Municipal Government",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Xi’an City Wall protection ordinance",
          url: "https://wwj.shaanxi.gov.cn/zfxxgk/fdzdgknr/flfg/fg/201704/t20170403_2131136.html",
          publisher: "Shaanxi Provincial Cultural Heritage Administration",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Xi’an City Wall repairs and preventive monitoring",
          url: "https://en.xa.gov.cn/MediaCenter/News/1738099529058168833.html",
          publisher: "Xi’an Municipal Government",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Surviving components of the Ming Beijing city wall",
          url: "https://wwj.beijing.gov.cn/bjww/362771/362779/dqpqgzdwwbhdw/523514/index.html",
          publisher: "Beijing Municipal Cultural Heritage Bureau",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Yongdingmen demolition, reconstruction and interpretation",
          url: "https://www.unesco.org/zh/articles/zhongguofujianyongdingmenyushijieyichanjiazhidechanshi",
          publisher: "UNESCO",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Datong Ancient City protection and reconstructed circuit",
          url: "https://www.dt.gov.cn/dtszf/stdt/201811/cbe3380bd8014f1cb4979371687dee29.shtml",
          publisher: "Datong Municipal Government",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Tang Chang’an gate, curfew and patrol controls",
          url: "https://www.nopss.gov.cn/n1/2019/1216/c219470-31507572.html",
          publisher: "National Office for Philosophy and Social Sciences",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Archaeological research on Han Chang’an urban form",
          url: "https://www.archaeology.sdu.edu.cn/info/1027/2884.htm",
          publisher: "Shandong University School of Archaeology",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Hero photograph: Nanjing City Wall south section, April 2024",
          url: "https://commons.wikimedia.org/wiki/File:2024Apr_-_Nanjing_City_Wall_--_south_section_-_img_01.jpg",
          publisher: "Wikimedia Commons — Chainwit.",
          reviewedAt: "2026-08-13",
        },
        {
          label: "CC BY 4.0 licence for the hero photograph",
          url: "https://creativecommons.org/licenses/by/4.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-13",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
