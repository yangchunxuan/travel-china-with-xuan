import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text:
        "A heritage site in China can be materially old, repaired, rebuilt from records, moved, or newly made to look historical—and several conditions may share one view. Do not reduce the visit to “real or fake.” Identify the component, intervention and evidence. Yinxu, Jiankou Great Wall and Yongdingmen show why buried remains, repaired fabric and a documented reconstruction require different questions.",
    },
    {
      id: "answer",
      type: "callout",
      title: "The direct answer",
      body:
        "Old material is not the only carrier of authenticity, and repair does not make a place false. Ask what value is expressed; whether the evidence concerns material, design, use, technique, location or setting; what changed; and who documented it. World Heritage inscription recognizes a property and stated values, not every stone, roof tile or visible building as ancient.",
      tone: "decision",
    },
    {
      id: "question-heading",
      type: "heading",
      level: 2,
      text: "Use seven Homeground working labels instead of one authenticity question",
    },
    {
      id: "labels",
      type: "table",
      caption: "Seven Homeground working labels for what is physically in front of you",
      columns: ["Label", "Working meaning", "Evidence to seek", "What appearance cannot prove"],
      rows: [
        [
          "Surviving historic fabric (原构 / 原物质)",
          "Historic material, structure or archaeological layer that remains, though it may have been maintained or locally replaced.",
          "Component survey, archaeological record, material analysis or a precise official label.",
          "That every adjoining piece has the same date or was never repaired.",
        ],
        [
          "Conserved in place (原址保留)",
          "A remain kept at its historical location, whether exposed, covered or protectively backfilled.",
          "Excavation plan, backfill record and an on-site explanation of the surface treatment.",
          "That a hedge, outline or paving on the surface is itself ancient material.",
        ],
        [
          "Conservation repair (保护性修缮)",
          "Work that stabilizes, drains, supports or slows deterioration, sometimes with compatible new material.",
          "Condition survey, approved method, before-and-after record and completion or acceptance record.",
          "That repair means replacement, or that “old-looking” work used no new pieces.",
        ],
        [
          "Restoration (复原)",
          "Evidence-led work returning a component toward a known earlier state, with additions and removals identified.",
          "Target date, documentary basis and a list of what was removed, retained and added.",
          "That “historic appearance restored” identifies one exact period or material ratio.",
        ],
        [
          "Reconstruction (重建 / 复建)",
          "A substantially lost building or structure made again, predominantly with new fabric.",
          "Loss record, design basis, archaeology, construction date and material statement.",
          "That an old outline, original location or traditional craft makes the fabric ancient.",
        ],
        [
          "Relocation (迁建)",
          "A structure dismantled or moved and assembled at a new site, usually with both retained and replacement parts.",
          "Old/new-site surveys, component numbering, dismantling log and replacement schedule.",
          "That “moved as a whole” means no components or setting changed.",
        ],
        [
          "Modern historicizing construction (现代仿古)",
          "New architecture made for display, commerce or scenery without rebuilding one documented lost heritage object.",
          "Planning approval, operator identity and design brief.",
          "That a tiled roof, plaque or weathered finish belongs to an old monument.",
        ],
      ],
    },
    {
      id: "nara-heading",
      type: "heading",
      level: 2,
      text: "What the Nara Document actually says",
    },
    {
      id: "nara-p1",
      type: "paragraph",
      text:
        "The Nara Document on Authenticity is not a law declaring which buildings are “real.” Its reliable UNESCO archive identity is information note WHC-94/CONF.003/INF.008, dated 21 November 1994 for the World Heritage Committee's eighteenth session. It reports the expert meeting held in Nara from 1 to 6 November 1994 and says the document builds on the 1964 Venice Charter. A separate UNESCO catalogue entry, document 116018, is genuine, but the committee information note is the safer source for the meeting identity and date.",
    },
    {
      id: "nara-p2",
      type: "paragraph",
      text:
        "The useful principle is contextual: heritage values and the credibility of information sources must be understood within the relevant culture. Current World Heritage Operational Guidelines translate that into a range of possible attributes—form and design; materials and substance; use and function; traditions, techniques and management; location and setting; language and intangible heritage; and spirit and feeling. They also set a high bar for reconstruction: archaeological remains, historic buildings or districts should be reconstructed only in exceptional circumstances, from complete and detailed documentation, not conjecture.",
    },
    {
      id: "nara-callout",
      type: "callout",
      title: "Nara does not mean “anything can be authentic”",
      body:
        "Cultural context broadens the evidence; it does not remove the need for credible sources. Traditional craft can be an important attribute while the resulting fabric remains new. Original location can matter while a surface marker remains modern. Good interpretation states which value and attribute each claim concerns.",
      tone: "warning",
    },
    {
      id: "field-heading",
      type: "heading",
      level: 2,
      text: "Use a four-question field test before judging the view",
    },
    {
      id: "field-p1",
      type: "paragraph",
      text:
        "Begin with the smallest object you can name accurately. “Yongdingmen gate tower,” “royal grave M1400 surface presentation” and “Jiankou phase-five wall segment” are useful units; “ancient China” is not. Photograph the site name and intervention label before the picturesque angle. If the caption uses only a dynasty and superlative, keep looking for a conservation or archaeological panel.",
    },
    {
      id: "field",
      type: "list",
      ordered: true,
      items: [
        "Value: what is important here—material evidence, an urban alignment, a building form, use, craft practice, setting, or several of these?",
        "Component: exactly which layer, building, object or surface is the claim about? Separate a foundation from a model, a gate platform from its tower, and an original plaque from a copy.",
        "Intervention: was it exposed, backfilled, stabilized, partly restored, reconstructed, relocated or newly added? Record start, completion and acceptance as different milestones.",
        "Information source: is the claim supported by archaeology, a project record, a component label, archival drawings, an oral tradition, or only tourism copy? Record uncertainty instead of guessing.",
      ],
    },
    {
      id: "yinxu-heading",
      type: "heading",
      level: 2,
      text: "At Yinxu, what matters may be protected underground",
    },
    {
      id: "yinxu-p1",
      type: "paragraph",
      text:
        "Yinxu in Anyang overturns the expectation that an authentic capital must present complete standing palaces. UNESCO describes a late Shang capital whose evidence includes building foundations, royal tombs, archaeological deposits, oracle-bone inscriptions and excavated objects. Its authenticity statement says remains and excavated relics are conserved in situ as far as possible; after excavation, sites may be backfilled for protection and represented with vegetation at ground level, while important objects receive museum care. Protection can therefore make evidence less visually dramatic rather than less real.",
    },
    {
      id: "yinxu-marker-figure",
      type: "figure",
      src: "/images/guides/how-to-read-heritage-sites-in-china/yinxu-world-heritage-marker-1400.webp",
      alt: "World Cultural Heritage marker carved with the name Yinxu",
      width: 1400,
      height: 900,
      caption:
        "World Heritage marker at Yinxu, photographed on 15 September 2019 by xiquinhosilva; cropped and resized from the CC BY 2.0 source. It confirms the photographed property's identity, not the age of any archaeological layer.",
    },
    {
      id: "yinxu-p2",
      type: "paragraph",
      text:
        "On site, separate three viewing modes. An exposed remain lets you see material in place, but only a label can identify the feature and conservation treatment. A backfilled remain preserves archaeology below; a hedge or outline may communicate footprint, yet the surface display is not Shang fabric. A museum object may be original and archaeologically provenanced while no longer occupying its findspot. Read the object label for excavation location, object number, original/facsimile status and any uncertainty. Do not call every depression a tomb or every ground line a palace plan.",
    },
    {
      id: "yinxu-museum-figure",
      type: "figure",
      src: "/images/guides/how-to-read-heritage-sites-in-china/yinxu-museum-1200.webp",
      alt: "Modern dark-green facade and reflecting pool of Yin Xu Museum",
      width: 1200,
      height: 900,
      caption:
        "Yin Xu Museum, photographed on 24 November 2024 by 유신예; cropped and resized from the CC BY-SA 4.0 source. The modern museum is a conservation and interpretation layer, not a reconstruction of a Shang palace.",
    },
    {
      id: "yinxu-field",
      type: "callout",
      title: "Yinxu field move",
      body:
        "For each stop, write three lines: visible surface, protected evidence, interpretation method. If the remain has been reburied, do not treat “nothing visible” as failure. Ask whether a plan, label, object provenance or museum section reconnects the protected layer to the larger capital.",
      tone: "decision",
    },
    {
      id: "jiankou-heading",
      type: "heading",
      level: 2,
      text: "At Jiankou, repair is a sequence of documented choices",
    },
    {
      id: "jiankou-p1",
      type: "paragraph",
      text:
        "Jiankou Great Wall is useful because official records describe changing conservation decisions rather than one timeless formula. Systematic work began in 2016. Earlier phases moved from emergency stabilization toward lower use of new material and increasingly limited clearance. A 2025 Beijing government account says phase five covers about 915 metres between Niujiaobian and Zhengbeilou, with six towers and five wall segments; archaeology and repair proceed together, digital recording continues, old bricks are cleaned and reused, and compatible additions may be placed where needed. None of this proves every brick is old.",
    },
    {
      id: "jiankou-figure",
      type: "figure",
      src: "/images/guides/how-to-read-heritage-sites-in-china/jiankou-before-phase-five-1400.webp",
      alt: "A damaged tower and descending wall amid vegetation at Jiankou Great Wall in 2017",
      width: 1400,
      height: 1050,
      caption:
        "Jiankou Great Wall on 4 October 2017, photographed by Sindarus; resized from the CC BY-SA 4.0 source. This predates phase five and supplies place context only—it does not identify towers 117–122 or document later repair materials.",
    },
    {
      id: "jiankou-p2",
      type: "paragraph",
      text:
        "“Minimum intervention” is not a promise to do nothing. At a wall it may mean stabilizing a dangerous collapse, restoring drainage, retaining uneven surfaces, limiting the width cleared for safe maintenance, and reusing sound material where technically possible. Traditional workmanship can help compatible repair and preserve knowledge, but it is not a time machine. The strongest evidence is a chain: recorded condition, archaeological finding, approved action, material log and completion record. A polished after-photo without that chain says little about authenticity.",
    },
    {
      id: "jiankou-field",
      type: "callout",
      title: "Jiankou field move",
      body:
        "Do not enter a work zone to inspect masonry. Look for the named phase, tower numbers, project date and management body in an authorized display or report. Ask what problem was treated—collapse, drainage, unstable masonry or access—not whether the finished wall looks “wild enough.”",
      tone: "decision",
    },
    {
      id: "jiankou-warning",
      type: "callout",
      title: "Current status checked 15 August 2026",
      body:
        "A Huairou government report dated 27 April 2026 says phases one to four were complete, phase five remained in progress with completion planned for the end of 2026, and phase-six design had begun. No formal phase-five completion and acceptance notice was found by the review date. Construction status is not visitor access: use an officially open Great Wall section for ordinary sightseeing and treat Jiankou here as a conservation case, not a route recommendation.",
      tone: "warning",
    },
    {
      id: "yong-heading",
      type: "heading",
      level: 2,
      text: "At Yongdingmen, a reconstruction can acquire its own repair history",
    },
    {
      id: "yong-p1",
      type: "paragraph",
      text:
        "The historic Yongdingmen complex at the southern end of Beijing's Central Axis was dismantled in the 1950s; UNESCO and ICOMOS records commonly use 1957 for the gate's demolition. The present tower was reconstructed in the twenty-first century, using archival surveys, photographs, archaeological work and traditional construction references. Project dates describe different stages: reconstruction formally began in 2004; Dongcheng District records completion in October 2005; and supplementary information submitted by the State Party and hosted by UNESCO records that completion-acceptance filing began on 15 June 2007. The visible upper structure is not a surviving 1553 building.",
    },
    {
      id: "yong-figure",
      type: "figure",
      src: "/images/guides/how-to-read-heritage-sites-in-china/yongdingmen-reconstruction-2024-1400.webp",
      alt: "Front view of the reconstructed Yongdingmen gate tower under a blue sky in October 2024",
      width: 1400,
      height: 788,
      caption:
        "The twenty-first-century Yongdingmen reconstruction, photographed on 11 October 2024 by xiquinhosilva; cropped and resized from the CC BY 4.0 source. The image predates the 2026 systematic repair and does not show ancient tower fabric. Distant people are incidental and not identifiable.",
    },
    {
      id: "yong-p2",
      type: "paragraph",
      text:
        "Yongdingmen also demonstrates why “rebuilt” is not the end of a biography. Dongcheng District reported in March 2026 that the 2005 reconstruction had begun its first systematic repair because of cracked components, roof leakage and ageing electrical systems. The works covered roof, timber structure, walls, finishes, fire safety and monitoring. A July report still referred to the repair construction site, and no completion notice was found by 15 August. This is conservation of a modern reconstruction. It should not be captioned as repairing original Ming tower fabric.",
    },
    {
      id: "yong-field",
      type: "callout",
      title: "Yongdingmen field move",
      body:
        "Build a four-date note: historic construction, loss, reconstruction, latest repair. Then separate values. The tower's form, southern-axis location, documentary basis and revived urban marker may be meaningful; its material date remains modern. Beijing heritage information also distinguishes the original stone plaque, held by the Capital Museum, from the copy installed at the tower.",
      tone: "decision",
    },
    {
      id: "wh-heading",
      type: "heading",
      level: 2,
      text: "A World Heritage label belongs to a stated property and set of values",
    },
    {
      id: "wh-p1",
      type: "paragraph",
      text:
        "Beijing Central Axis was inscribed as an ensemble in 2024. The Committee's decision grounds authenticity in the Axis's continuity, location, layout, urban characteristics, techniques and continuing functions, while acknowledging that some elements underwent demolition, reconstruction and remodelling. ICOMOS's component-level assessment was more critical of Yongdingmen: it judged the 2005 reconstruction outside the exceptional circumstances contemplated by Operational Guidelines paragraph 86 and considered the component's authenticity compromised, even while accepting authenticity of the nominated property as a whole. Those positions are not mutually exclusive because they evaluate different scales.",
    },
    {
      id: "wh-table",
      type: "table",
      caption: "Do not move a conclusion between scales without evidence",
      columns: ["Claim scale", "What it can establish", "What it cannot automatically establish"],
      rows: [
        [
          "World Heritage property",
          "Recognized Outstanding Universal Value, boundaries, attributes and an overall integrity/authenticity assessment.",
          "The age or material status of every building and visitor feature within the boundary.",
        ],
        [
          "Named component",
          "A gate, tomb, wall segment or museum object with its own documented history.",
          "The status of adjoining components or the whole property.",
        ],
        [
          "Individual material or surface",
          "Age, source or intervention only when a survey, label or material record identifies it.",
          "A dynasty inferred from colour, wear, craft style or location alone.",
        ],
      ],
    },
    {
      id: "scenario-heading",
      type: "heading",
      level: 2,
      text: "Choose the right next check when the site is unclear",
    },
    {
      id: "scenario-table",
      type: "table",
      caption: "Unclear evidence and the next check in the field",
      columns: ["What goes wrong", "Next check", "Safe conclusion"],
      rows: [
        [
          "The archaeological feature is backfilled or invisible.",
          "Find the excavation plan, surface-display key and object provenance; ask which layer is protected below.",
          "The absence of exposed masonry can be a conservation decision, not absence of evidence.",
        ],
        [
          "A sign says “restored to its former appearance.”",
          "Look for target period, design basis, retained components and completion report.",
          "The wording alone cannot distinguish partial restoration from reconstruction or historicizing design.",
        ],
        [
          "Old and new masonry look indistinguishable.",
          "Check a component drawing, material schedule or management explanation; never sort by colour alone.",
          "Record “material boundary unconfirmed” until evidence identifies it.",
        ],
        [
          "The famous place is under repair or closed.",
          "Use the management notice and museum/interpretation alternative; do not cross barriers for proof.",
          "An in-progress project is neither completed nor accepted nor open by default.",
        ],
        [
          "A replica, digital model or themed street is visually persuasive.",
          "Find its maker, date, evidence base and purpose; compare it with original records separately.",
          "It can explain an interpretation without becoming the lost original.",
        ],
      ],
    },
    {
      id: "scenario-recovery",
      type: "callout",
      title: "Two traveller scenarios",
      body:
        "If you have one museum hour at Yinxu, prioritize labels connecting findspot, original object and protected site instead of chasing a complete palace image. If you are comparing Badaling with a photograph of Jiankou, do not rank authenticity by smoothness or ruin. Compare named interventions and access status; use the officially open section for the walk and Jiankou's documented project for conservation context.",
      tone: "decision",
    },
    {
      id: "photo-heading",
      type: "heading",
      level: 2,
      text: "Leave the site with an auditable evidence note",
    },
    {
      id: "photo-list",
      type: "list",
      ordered: true,
      items: [
        "Capture the full place name, component name, issuing authority and revision or project date.",
        "Record the photograph date and viewpoint; note whether construction, scaffolding or temporary closure changes the scene.",
        "Write the material-status label and its source separately. Do not let the photograph prove more than it shows.",
        "For museum objects, retain the object number, findspot, original/facsimile label and current display status.",
        "For a reconstruction or relocation, record both the lost/old site and the new work/site, plus retained and replacement parts if published.",
        "Before sharing a portrait, ritual, interior, map or project document, check copyright, venue rules and participant consent as separate permissions.",
      ],
    },
    {
      id: "dynamic",
      type: "callout",
      title: "Dynamic facts reviewed 15 August 2026",
      body:
        "Jiankou phase five was still officially described as in progress in April 2026, with completion planned for year-end. Yongdingmen's 2026 repair was still referred to as a construction site in July. No later formal completion notices were found by this review. Open areas, scaffolding, museum displays and visitor photography rules can change; verify them with the named management body before travel.",
      tone: "warning",
    },
    {
      id: "evidence",
      type: "callout",
      title: "How this guide separates fact from editorial method",
      body:
        "Document identity, World Heritage assessments and case histories come from UNESCO, ICOMOS and Chinese government or heritage records. The seven-label vocabulary, four-question field test, visitor scenarios and evidence-note workflow are Homeground editorial tools. Image captions identify exact objects and dates but deliberately do not infer material age from appearance.",
      tone: "neutral",
    },
    {
      id: "links",
      type: "internal-links",
      title: "Continue with a site-specific reading method",
      items: [
        {
          label: "Read gates, defense and urban order in a Chinese city wall",
          href: "/guides/chinese-city-walls-gates-and-urban-order/",
          description: "Move from material status to the wall, gate and street as an urban system.",
        },
        {
          label: "Visit an archaeological site museum",
          href: "/guides/how-to-visit-an-archaeological-site-museum/",
          description: "Connect in-situ remains, findspots, displayed objects and conservation decisions.",
        },
        {
          label: "See what happens when metro construction meets archaeology",
          href: "/guides/when-metro-construction-meets-archaeology/",
          description: "Follow discovery, protection, excavation, design response and public display without assuming every find remains visible.",
        },
        {
          label: "Read the Meizhou Mazu Ancestral Temple by evidence layer",
          href: "/guides/meizhou-mazu-ancestral-temple-reading-guide/",
          description: "Separate institutional continuity, rebuilt architecture, living belief, traditional narrative and modern visitor presentation.",
        },
      ],
    },
    {
      id: "consultation",
      type: "callout",
      title: "Need a heritage route with the evidence layers kept clear?",
      body:
        "Tell Homeground which sites you are considering and whether you care most about archaeology, architecture or conservation practice. A human planner can connect current access with the right museum or interpretation stop without calling reconstructed fabric ancient.",
      tone: "neutral",
    },
    {
      id: "sources",
      type: "sources",
      title: "Official, heritage and image sources reviewed",
      items: [
        {
          label: "Nara Document on Authenticity — WHC-94/CONF.003/INF.008",
          url: "https://whc.unesco.org/archive/nara94.htm",
          publisher: "UNESCO World Heritage Centre",
          reviewedAt: "2026-08-15",
        },
        {
          label: "UNESCO catalogue record 116018 — The Nara Document on Authenticity",
          url: "https://whc.unesco.org/en/documents/116018",
          publisher: "UNESCO World Heritage Centre",
          reviewedAt: "2026-08-15",
        },
        {
          label: "2025 Operational Guidelines, paragraphs 79–86 and Annex 4",
          url: "https://whc.unesco.org/document/222376",
          publisher: "UNESCO World Heritage Centre",
          reviewedAt: "2026-08-15",
        },
        {
          label: "Yin Xu — Outstanding Universal Value and authenticity statement",
          url: "https://whc.unesco.org/en/list/1114",
          publisher: "UNESCO World Heritage Centre",
          reviewedAt: "2026-08-15",
        },
        {
          label: "Jiankou phase-five archaeology and conservation, 2024",
          url: "https://www.beijing.gov.cn/ywdt/gqrd/202410/t20241016_3921803.html",
          publisher: "Beijing Municipal Government",
          reviewedAt: "2026-08-15",
        },
        {
          label: "Jiankou phase-five methods and scope, 2025",
          url: "https://www.beijing.gov.cn/ywdt/gzdt/202505/t20250514_4088536.html",
          publisher: "Beijing Municipal Government",
          reviewedAt: "2026-08-15",
        },
        {
          label: "Jiankou current project status, 27 April 2026",
          url: "https://www.bjhr.gov.cn/ywdt/rdgz/202604/t20260427_4615576.html",
          publisher: "Huairou District Government",
          reviewedAt: "2026-08-15",
        },
        {
          label: "State Party supplementary information — Yongdingmen reconstruction chronology",
          url: "https://whc.unesco.org/document/204904",
          publisher: "China State Party submission hosted by UNESCO World Heritage Centre",
          reviewedAt: "2026-08-15",
        },
        {
          label: "ICOMOS evaluation of Beijing Central Axis",
          url: "https://whc.unesco.org/document/208501",
          publisher: "ICOMOS / UNESCO World Heritage Centre",
          reviewedAt: "2026-08-15",
        },
        {
          label: "Decision 46 COM 8B.15 — Beijing Central Axis",
          url: "https://whc.unesco.org/en/decisions/8607",
          publisher: "World Heritage Committee",
          reviewedAt: "2026-08-15",
        },
        {
          label: "Yongdingmen demolition, reconstruction and plaque record",
          url: "https://wwj.beijing.gov.cn/bjww/362760/362767/bjzzxwhycccycxds/dsxw/11156748/",
          publisher: "Beijing Municipal Cultural Heritage Bureau",
          reviewedAt: "2026-08-15",
        },
        {
          label: "Yongdingmen's first systematic repair after reconstruction",
          url: "https://www.bjdch.gov.cn/ywdt/dcyw/202603/t20260320_4562576.html",
          publisher: "Dongcheng District Government",
          reviewedAt: "2026-08-15",
        },
        {
          label: "Yongdingmen repair-site status, 10 July 2026",
          url: "https://www.bjdch.gov.cn/ywdt/dcyw/202607/t20260710_4756233.html",
          publisher: "Dongcheng District Government",
          reviewedAt: "2026-08-15",
        },
        {
          label: "Image: Yinxu royal grave M1400",
          url: "https://commons.wikimedia.org/wiki/File:Yinxu_-_%E6%AE%B7%E5%A2%9F_(5067245178).jpg",
          publisher: "Wikimedia Commons — tak.wing, CC BY-SA 2.0",
          reviewedAt: "2026-08-15",
        },
        {
          label: "Image: Yinxu World Heritage marker",
          url: "https://commons.wikimedia.org/wiki/File:Yinxu_Royal_Tombs_(53565240593).jpg",
          publisher: "Wikimedia Commons — xiquinhosilva, CC BY 2.0",
          reviewedAt: "2026-08-15",
        },
        {
          label: "Image: Yin Xu Museum",
          url: "https://commons.wikimedia.org/wiki/File:Yin_Xu_Museum.jpg",
          publisher: "Wikimedia Commons — 유신예, CC BY-SA 4.0",
          reviewedAt: "2026-08-15",
        },
        {
          label: "Image: Jiankou Great Wall in 2017",
          url: "https://commons.wikimedia.org/wiki/File:Tower_and_path_in_disrepair_-_Great_Wall_of_China_at_Jiankou.jpg",
          publisher: "Wikimedia Commons — Sindarus, CC BY-SA 4.0",
          reviewedAt: "2026-08-15",
        },
        {
          label: "Image: Yongdingmen in 2024",
          url: "https://commons.wikimedia.org/wiki/File:%E6%B0%B8%E5%AE%9A%E9%97%A8_2024-10-11.jpg",
          publisher: "Wikimedia Commons — xiquinhosilva, CC BY 4.0",
          reviewedAt: "2026-08-15",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
