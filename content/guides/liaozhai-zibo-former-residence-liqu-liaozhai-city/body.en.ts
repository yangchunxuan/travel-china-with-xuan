import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "A Liaozhai visit in Zibo becomes clearer as soon as you stop treating one name as one attraction. Pu Songling's former residence is a protected physical site; the memorial museum is the institution and exhibition setting built around that core; Liaozhai Zhiyi is literature; Liaozhai liqu is a living music-and-story tradition; and Liaozhai City is a modern scenic presentation. If you have one cultural priority, begin with the former residence and museum core. Add a Liaozhai liqu performance only when an official host confirms a specific event, and choose Liaozhai City because you want to see contemporary interpretation—not because its scenery proves Qing-period life or a scene from the stories."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "The short answer",
      body: "Use four evidence labels: protected place, literary work, living practice and tourism presentation. They can meet in the same village and still answer different questions. Homeground's editorial order is former residence and museum first, Liaozhai liqu when a dated programme exists, and Liaozhai City as an optional modern layer.",
      tone: "decision"
    },
    {
      id: "layers-heading",
      type: "heading",
      level: 2,
      text: "What are the four Liaozhai layers in Zibo?"
    },
    {
      id: "layers-table",
      type: "table",
      caption: "Four related layers that should not be collapsed",
      columns: ["Layer", "What the evidence supports", "What it cannot prove"],
      rows: [
        ["Protected place and museum", "Pu Songling's former residence in Pujiazhuang, repaired in 1954 and later used as the core of a memorial museum established in 1980", "That every visible beam, furnishing, portrait or display case belonged to Pu Songling"],
        ["Literary work", "Liaozhai Zhiyi, commonly translated as Strange Tales from a Chinese Studio, as Pu Songling's literary construction", "That its fox spirits, ghosts or named characters were historical residents of Zibo"],
        ["Living practice", "Liaozhai liqu as a nationally listed traditional-music project combining Pu's narrative texts with locally transmitted tunes and performance", "That a performance happens every day, at a particular venue or as part of a standard ticket"],
        ["Tourism presentation", "Liaozhai City scenic area as a currently listed attraction that develops modern themed spaces and experiences around the Liaozhai cultural name", "That themed architecture reconstructs Qing daily life or authenticates a fictional episode"]
      ]
    },
    {
      id: "one-name-heading",
      type: "heading",
      level: 2,
      text: "Why does the word “Liaozhai” point to several different things?"
    },
    {
      id: "one-name-explained",
      type: "paragraph",
      text: "Liaozhai began as the name associated with Pu Songling's studio and became inseparable from the title Liaozhai Zhiyi. The same cultural name later travelled into Liaozhai liqu and into the branding of Liaozhai City. That continuity is meaningful, but it is not an identity certificate. A room, a book, a sung narrative and a themed scenic area have different makers, dates and evidence. When a sign uses “Liaozhai,” ask for the noun that follows it—and for the institution making the claim."
    },
    {
      id: "former-residence-heading",
      type: "heading",
      level: 2,
      text: "How are the former residence and the memorial museum related?"
    },
    {
      id: "former-residence-facts",
      type: "paragraph",
      text: "Zibo's official account places Pu Songling's former residence in Pujiazhuang, Hongshan Town, Zichuan District. It says the residence was restored to its former appearance in 1954 and expanded into the Pu Songling Memorial Museum in 1980. A separate municipal culture-bureau introduction describes the museum as having been established on the basis of the former residence and identifies the protected property, Liuquan (柳泉) and Pu Songling's cemetery as related sites. This supports an integrated heritage-and-museum core. It also tells you why “former residence” and “museum” should not be used as perfect synonyms: one names the protected place, while the other names the institution, collections and later exhibition spaces around it."
    },
    {
      id: "liaozhai-room-figure",
      type: "figure",
      src: "/images/guides/liaozhai-zibo-former-residence-liqu-liaozhai-city/liaozhai-room-1200.webp",
      alt: "A room identified as Liaozhai in Pu Songling's former-residence compound, with a portrait display, furniture and viewing barrier.",
      width: 1200,
      height: 1600,
      caption: "A 2008 photograph of a museum-style room presentation, not proof that every visible object was used by Pu Songling. Photo: Finblanco, CC BY-SA 3.0; resized by Homeground."
    },
    {
      id: "room-boundary",
      type: "paragraph",
      text: "The photograph is useful precisely because it shows several evidence types in one frame: architecture, a room name, a portrait, furniture and an exhibition barrier. Their physical proximity does not give them one date or provenance. On site, read the room label and the object caption separately. If a caption says replica, reproduction, restoration or scene setting, keep that term. If there is no component-level date, describe the object you can see without promoting it into an original possession."
    },
    {
      id: "museum-reading-sequence",
      type: "list",
      ordered: true,
      items: [
        "Begin with the full protection or institution sign. Record the issuing body and the exact property name before interpreting an individual room.",
        "Separate building fabric from the exhibition inside it. A protected site can contain repaired materials, later furnishings and modern display equipment.",
        "Read the object label before the visual resemblance. A portrait of Pu is evidence of museum interpretation unless its provenance label establishes more.",
        "Use the narrowest date supplied. A 1954 repair and a 1980 museum establishment do not assign those dates to every wall or object.",
        "Keep Liuquan and the cemetery as related protected-site context, not guaranteed add-ons; this guide does not verify their current entrances or visitor conditions."
      ]
    },
    {
      id: "literature-heading",
      type: "heading",
      level: 2,
      text: "What does Liaozhai Zhiyi contribute—and what remains fictional?"
    },
    {
      id: "literature-context",
      type: "paragraph",
      text: "The National Museum of China's 2026 exhibition brings together manuscripts, illustrated editions and research to present Pu's life and Liaozhai Zhiyi. Its curatorial text emphasizes that the strange figures and extraordinary plots carry attention to human feeling, social life and moral choice. That is a better reading key than treating Zibo as a catalogue of haunted coordinates. The work can illuminate how a writer transformed local language, stories and experience into literature. It cannot establish that a fox spirit occupied a room, that a modern garden reproduces a story's exact landscape or that every local legend belongs to the written collection."
    },
    {
      id: "fiction-boundary",
      type: "callout",
      title: "Literary meaning is not weak evidence—it is a different kind of evidence",
      body: "A story can be historically important without being a site report. Read plot, voice and social observation as literature. Use plaques, conservation records and object labels for claims about material age, provenance and location.",
      tone: "neutral"
    },
    {
      id: "liqu-heading",
      type: "heading",
      level: 2,
      text: "Why is Liaozhai liqu more than background music?"
    },
    {
      id: "liqu-identity",
      type: "paragraph",
      text: "China's national intangible-cultural-heritage catalogue lists Liaozhai liqu as project II-22 in the traditional-music category, included in the first national list in 2006, with Zibo as the reporting area and the Zichuan District Liaozhai Liqu Art Troupe as the safeguarding unit. The catalogue describes Pu Songling's narrative texts joined to popular tunes current in his period and records a mainly Zibo transmission context. A Zibo government explanation adds an important listening cue: the form can combine singing, recitation, spoken passages and performance. It is therefore a narrative practice with words, local speech and embodied delivery—not an atmospheric soundtrack for a “ghost town.”"
    },
    {
      id: "liqu-current-evidence",
      type: "paragraph",
      text: "A dated example proves continuity without becoming a schedule. At the National Museum of China's exhibition opening on 28 May 2026, national-level representative inheritor Pu Zhangjun and his disciple Zhang Haiying performed a Liaozhai liqu excerpt. The museum reported that event; it did not announce a recurring Zibo show. Use such records to understand who is transmitting the practice and in what institutional setting. For an actual visit, require a fresh notice from the named organiser rather than turning one ceremony into a daily promise."
    },
    {
      id: "liqu-listening-table",
      type: "table",
      caption: "Listen for the practice instead of a supernatural mood",
      columns: ["Listen or look for", "Why it matters", "Do not infer"],
      rows: [
        ["A named piece, tune or text", "It connects the performance to a documented corpus rather than generic folk entertainment", "That any song marketed with Liaozhai imagery is Liaozhai liqu"],
        ["Singing, spoken narration, recitation and gesture", "Their combination helps explain the music-literature form described by official sources", "That one performance uses every element in the same proportion"],
        ["Named performer and safeguarding unit", "Attribution shows a transmission relationship and lets you verify the event", "That costume alone certifies lineage or project identity"],
        ["Event date and host", "Living heritage appears in specific social and institutional occasions", "That the same programme repeats tomorrow or is included in scenic-area admission"]
      ]
    },
    {
      id: "city-heading",
      type: "heading",
      level: 2,
      text: "What is modern Liaozhai City evidence of?"
    },
    {
      id: "city-identity",
      type: "paragraph",
      text: "The Zibo Culture and Tourism Bureau's list current through April 2026 includes Liaozhai City Scenic Area as a 4A attraction in Zichuan District. A 2024 bureau response is more revealing about its role: it describes the memorial museum and Liaozhai Garden as two cores in a wider cultural-tourism project, with upgraded infrastructure, themed experiences and immersive products. That makes the scenic area valuable evidence for how Liaozhai is being interpreted and commercialised now. It is not a second historical source for Pu's domestic life and should not be used to date old-looking gates, halls or story scenes."
    },
    {
      id: "city-dynamic-warning",
      type: "callout",
      title: "A current attraction identity is not a current operating map",
      body: "The official 4A list confirms the named attraction, not which zones are open, what a ticket covers or whether a performance will run. Construction and visitor products can change. Check the direct operator on the visit date and describe any themed area as modern presentation unless a component-level heritage label says otherwise.",
      tone: "warning"
    },
    {
      id: "evidence-heading",
      type: "heading",
      level: 2,
      text: "Which source should answer which question?"
    },
    {
      id: "evidence-ladder",
      type: "table",
      caption: "Match the claim to the authority that can support it",
      columns: ["Question", "Best first evidence", "Common category error"],
      rows: [
        ["What property is protected?", "The protection plaque and cultural-relics or government record", "Using a tourism map to certify the age of a building"],
        ["What is this room or object?", "The full museum caption, including provenance and display status", "Assuming proximity to the former residence means personal ownership"],
        ["What does the story mean?", "The literary text and accountable scholarship or curatorial interpretation", "Treating a fictional episode as a local historical incident"],
        ["Is this Liaozhai liqu?", "The national ICH record, safeguarding unit and a named event or performer", "Identifying the practice from costume, stage design or ghost imagery alone"],
        ["What is open or performing today?", "A date-stamped notice from the museum, scenic operator or event host", "Reusing an old festival report as a standing schedule"],
        ["Is a scenic structure historic?", "A component-level heritage or construction label", "Calling themed architecture Qing-period because it looks old"]
      ]
    },
    {
      id: "field-method",
      type: "list",
      ordered: true,
      items: [
        "Name the object precisely: residence, museum room, manuscript, sung work, scenic building or performance.",
        "Name the claimant: cultural-relics authority, museum, ICH safeguarding body, event host, operator or Homeground editorial judgment.",
        "Find the date attached to that claim. A historical date, restoration date, exhibition date and event date are not interchangeable.",
        "Write the narrowest supported sentence. “Displayed here” is safer than “used by Pu”; “theme setting” is safer than “reconstructed Qing life.”",
        "If the evidence is missing, keep the question open and move to the next verifiable layer. Uncertainty is better than turning atmosphere into provenance."
      ]
    },
    {
      id: "choice-heading",
      type: "heading",
      level: 2,
      text: "Which Liaozhai layer should you choose?"
    },
    {
      id: "choice-comparison",
      type: "comparison",
      title: "Choose by cultural question, not by a promised duration",
      columns: [
        {
          heading: "Former residence and museum core",
          items: [
            "Choose this first for Pu Songling's documented place, biography, manuscripts and museum interpretation.",
            "Read building, room and object labels separately.",
            "Best single choice when historical evidence matters most."
          ]
        },
        {
          heading: "Liaozhai liqu",
          items: [
            "Choose a named, dated event for living language, music and narrative transmission.",
            "Verify host, performer and programme rather than relying on scenic marketing.",
            "Treat absence of a current notice as no performance promise."
          ]
        },
        {
          heading: "Liaozhai City",
          items: [
            "Choose it for contemporary scenic storytelling, adaptation and cultural-tourism design.",
            "Keep old-looking scenery in the modern-presentation layer unless labelled otherwise.",
            "Recheck zones, ticket boundary and events directly on the day."
          ]
        }
      ]
    },
    {
      id: "no-duration-promise",
      type: "paragraph",
      text: "This is deliberately not a half-day itinerary. The available official sources do not establish current entrances, walking surfaces, transfer times, accessibility, visitor-room sequence or the relationship between separate ticket boundaries. Estimate duration only after the museum and scenic-area operator identify what is actually available on your date. The cultural decision remains useful even if the practical order changes."
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "What should you do when evidence or access is missing?"
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "Recovery by missing evidence, not by guesswork",
      columns: ["Problem", "Useful next check", "Do not substitute"],
      rows: [
        ["The former-residence or museum route is unavailable", "Read the exterior institution and protection information, then use the museum or municipal cultural source", "A generic old courtyard described as Pu's domestic life"],
        ["An object has no clear provenance label", "Record the display title and ask museum staff for the catalogue or curatorial reference", "Visual age, placement in the room or a tour-guide anecdote"],
        ["No Liaozhai liqu performance is announced", "Use the national ICH record and wait for a dated safeguarding-unit or host notice", "Any folk song, recorded ambience or costume show"],
        ["Liaozhai City zones or shows are unclear", "Ask the direct operator what is open and included that day", "A 2024 development plan, an old festival article or a third-party ticket page"],
        ["Photography rules are unclear", "Ask before photographing each interior, object or performance", "The existence of visitor images online as permission"],
        ["A label mixes legend and history", "Separate the quoted tradition from the material claim and look for the issuing body", "A blended sentence that presents commemorative lore as proven biography"]
      ]
    },
    {
      id: "operations-exclusion",
      type: "callout",
      title: "Deliberate exclusions",
      body: "No fixed opening hours, foreign-passport reservation guarantee, walk-in promise, photography permission, recurring performance, named open-zone list or untested visit duration is published here. Those details require a current direct-operator check and, where relevant, an on-site rule.",
      tone: "warning"
    },
    {
      id: "terms-heading",
      type: "heading",
      level: 2,
      text: "A small Liaozhai vocabulary for labels and conversations"
    },
    {
      id: "terms-table",
      type: "table",
      caption: "Keep the nouns distinct when searching or asking locally",
      columns: ["Term", "Use it for", "Safe English shorthand"],
      rows: [
        ["蒲松龄故居", "The former residence as a protected physical place", "Pu Songling's former residence"],
        ["蒲松龄纪念馆", "The memorial-museum institution and its exhibitions", "Pu Songling Memorial Museum"],
        ["《聊斋志异》", "Pu Songling's literary collection", "Liaozhai Zhiyi / Strange Tales from a Chinese Studio"],
        ["聊斋俚曲", "The nationally listed music-and-narrative practice", "Liaozhai liqu"],
        ["聊斋城景区", "The named modern scenic attraction", "Liaozhai City Scenic Area"],
        ["修复 / 展陈 / 复原场景", "Different intervention or display claims that need their own dates", "repair / exhibition installation / recreated scene"]
      ]
    },
    {
      id: "image-boundary-heading",
      type: "heading",
      level: 2,
      text: "What do the photographs establish?"
    },
    {
      id: "image-boundary",
      type: "paragraph",
      text: "Both photographs in this guide were taken by Finblanco at Pu Songling's former-residence compound on 29 July 2008 and published on Wikimedia Commons under CC BY-SA 3.0. The gate image has been cropped and resized; the room image has only been resized. They establish the identity and visual context of the former-residence core at that date. They do not establish 2026 access, current display status, component age, photography permission or the appearance of Liaozhai City and a Liaozhai liqu performance. No government publicity photograph, manuscript image, performance image, film still or AI-generated substitute is used."
    },
    {
      id: "visual-gap",
      type: "callout",
      title: "Why there is no generic ghost image",
      body: "No commercially reusable, location-verified photograph reviewed on 15 August 2026 safely documented the current Liaozhai liqu practice or Liaozhai City's current operating zones. The gap remains visible. A wrong performance, a film still or an unrelated “ancient town” would make the comparison less accurate, not more complete.",
      tone: "neutral"
    },
    {
      id: "fit-heading",
      type: "heading",
      level: 2,
      text: "Who will get the most from this visit?"
    },
    {
      id: "fit-list",
      type: "list",
      items: [
        "Choose the former-residence and museum core if you want documented literary biography and are willing to read labels rather than hunt for supernatural scenery.",
        "Seek a Liaozhai liqu event if living language, sung narrative and transmission matter more than a guaranteed attraction checklist.",
        "Add Liaozhai City if you enjoy seeing how a classical work becomes contemporary tourism and can keep themed scenery separate from heritage fabric.",
        "Skip the expanded Liaozhai layer if your priority is only a general Zibo route, transport or accommodation; this page does not own those decisions.",
        "Before travel, verify access, reservation identity fields, photography, accessibility, ticket boundaries and performances directly with the responsible institution."
      ]
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue with another evidence-led cultural visit",
      items: [
        {
          label: "Plan a literary walk in Lu Xun's Shaoxing",
          href: "/guides/luxun-shaoxing-literary-walk/",
          description: "Use another author-and-place guide that separates biography, literature and later memorial presentation."
        },
        {
          label: "Learn how to read an archaeological-site museum",
          href: "/guides/how-to-visit-an-archaeological-site-museum/",
          description: "Carry the same object-label and evidence-boundary method into a different kind of museum."
        }
      ]
    },
    {
      id: "closing-note",
      type: "paragraph",
      text: "If you ask Homeground to include Liaozhai in a Zibo plan, name the layer you actually want: author history, literary interpretation, living music or modern scenic adaptation. A responsible planner can then verify the current operator details without pretending that one “Liaozhai” label answers every cultural question."
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources and image credits reviewed on 15 August 2026",
      items: [
        {
          label: "Pu Songling Memorial Museum and former-residence history",
          url: "https://www.zibo.gov.cn/art/2023/7/18/art_18392_2726636.html",
          publisher: "Zibo Municipal People's Government",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Pu Songling Memorial Museum institutional introduction",
          url: "https://wh.zibo.gov.cn/art/2017/9/18/art_4110_670826.html",
          publisher: "Zibo Culture and Tourism Bureau",
          reviewedAt: "2026-08-15"
        },
        {
          label: "National Museum exhibition on Pu Songling and Liaozhai Zhiyi",
          url: "https://www.chnmuseum.cn/zl/lszl/lswh/202605/t20260528_279094.shtml",
          publisher: "National Museum of China",
          reviewedAt: "2026-08-15"
        },
        {
          label: "2026 exhibition opening and dated Liaozhai liqu performance",
          url: "https://www.chnmuseum.cn/zx/gbxw/202606/t20260601_279107.shtml",
          publisher: "National Museum of China",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Liaozhai liqu national intangible-cultural-heritage record",
          url: "https://www.ihchina.cn/project_details/12448.html",
          publisher: "China Intangible Cultural Heritage Network / China National Center for Safeguarding Intangible Cultural Heritage",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Zibo government explanation of Liaozhai liqu performance form",
          url: "https://www.zibo.gov.cn/art/2023/8/3/art_19724_2744411.html",
          publisher: "Zibo Municipal People's Government",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Zibo A-level attraction list current through April 2026",
          url: "https://wh.zibo.gov.cn/gongkai/channel_c_5f9fa491ab327f36e4c13060_n_1605682609.0203/doc_69ddd50b1aa498f7fce04d2c.html",
          publisher: "Zibo Culture and Tourism Bureau",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Official response describing the museum-and-garden two-core development",
          url: "https://wh.zibo.gov.cn/gongkai/channel_c_5f9fa491ab327f36e4c13060_n_1605682638.9267/doc_6708e7f1a671cb1cd04b3f9b.html",
          publisher: "Zibo Culture and Tourism Bureau",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Gate of Pu Songling's former residence — Finblanco, CC BY-SA 3.0",
          url: "https://commons.wikimedia.org/wiki/File:Gate_of_pusongling%27s_house.JPG",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Liaozhai room at the former residence — Finblanco, CC BY-SA 3.0",
          url: "https://commons.wikimedia.org/wiki/File:Liaozhai.JPG",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-15"
        },
        {
          label: "CC BY-SA 3.0 license used for both former-residence photographs",
          url: "https://creativecommons.org/licenses/by-sa/3.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-15"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
