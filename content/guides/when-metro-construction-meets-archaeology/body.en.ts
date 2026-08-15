import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "When a metro project enters an area where China's pre-construction archaeology rules apply, the process starts before tunnelling: identify the sensitive area, investigate it, excavate where authorised, agree protection measures, record the finds, then clear, modify or monitor the footprint. A chance discovery triggers protection and reporting. None of this proves that a whole line will be delayed, rerouted or turned into a museum."
    },
    {
      id: "three-questions-heading",
      type: "heading",
      level: 2,
      text: "Separate three questions that headlines often collapse"
    },
    {
      id: "three-questions",
      type: "comparison",
      title: "Discovery, engineering and public display are different decisions",
      columns: [
        {
          heading: "What is underground?",
          body: "Survey, trial exploration and excavation establish whether there are walls, roads, tombs, pits, artefacts or only disturbed soil in the affected footprint."
        },
        {
          heading: "What can the project do?",
          body: "Heritage and construction authorities consider protection, excavation, design adjustment, controlled removal, monitoring and the procedures needed before work continues."
        },
        {
          heading: "What will the public see?",
          body: "Objects may go through recording, conservation, research and museum allocation. In-situ display, a station exhibit or public access requires a separate decision and is never automatic."
        }
      ]
    },
    {
      id: "law-heading",
      type: "heading",
      level: 2,
      text: "The national framework starts before the dramatic discovery"
    },
    {
      id: "law-body",
      type: "paragraph",
      text: "China's Cultural Relics Protection Law, revised in 2024 and effective from 1 March 2025, puts archaeology inside development. In areas designated as potentially containing underground relics, it requires the provincial heritage authority to organise investigation and exploration before a local government transfers or allocates land. For large projects and work within protected or controlled zones that did not go through that earlier step, the developer must first ask the provincial heritage authority to organise investigation where remains may be buried. If relics are found, the provincial authority and developer agree protection measures; the developer budgets for construction archaeology."
    },
    {
      id: "workflow-table",
      type: "table",
      caption: "A practical reading of the project sequence—not a promise that every project uses every step",
      columns: ["Stage", "What happens", "What it does not yet mean"],
      rows: [
        ["Desk review and sensitivity check", "Compare plans, known sites, records and the footprint", "That remains have been found"],
        ["Field investigation or exploration", "Inspect and test selected ground under an approved programme", "That the entire rail alignment will be opened"],
        ["Approved excavation", "Record, sample and remove defined deposits or prepare protection", "That every object will be displayed nearby"],
        ["Protection decision", "Authorities and the project agree measures appropriate to the discovery", "That rerouting is the only acceptable outcome"],
        ["Construction hand-back and monitoring", "A completed area may proceed through the next construction procedures, with reporting duties still in force", "That no further discovery is possible"]
      ]
    },
    {
      id: "chance-find-stage-gates",
      type: "table",
      caption: "Chance-find stage gates — keep the heritage decision line separate from the passenger-status line",
      columns: ["Gate", "Heritage evidence to record", "Project or passenger evidence to record", "Do not infer"],
      rows: [
        ["1. Discovery located", "Issuing authority, date, exact station/exit/depot/adjacent footprint and what was found: ____", "Is this an operating line, future project or separate development? ____", "A discovery at one footprint does not describe the whole line"],
        ["2. Stop, protect and report", "Dated notice that the immediate scene was protected and reported: ____", "Any project or operator notice naming the affected work area or service: ____", "Protection of a work face is not an automatic network shutdown"],
        ["3. Archaeological opinion", "Investigation, excavation or protection decision and responsible authority: ____", "Engineering decision still pending, or named response: ____", "Excavation does not by itself mean rerouting, delay or public display"],
        ["4. Design response or hand-back", "Documented protected-in-place, removed, modified or cleared footprint: ____", "Current construction milestone or access change from the responsible project: ____", "Hand-back of one bounded area is not clearance of every footprint"],
        ["5. Passenger status", "Heritage record may remain unchanged; note its date: ____", "Metro operator's route- and date-specific opening, closure or entrance notice: ____", "Use archaeology news as context, never as a substitute for a service notice"],
        ["6. Public display", "Museum or site label states original/replica, findspot, in-situ status and interpreter: ____", "Station access and display hours from the current operator or venue: ____", "Discovery and conservation do not guarantee that passengers will see the remains"]
      ]
    },
    {
      id: "chance-find",
      type: "callout",
      tone: "warning",
      title: "A chance find changes the immediate work zone, not automatically the whole network",
      body: "Article 46 requires anyone encountering relics or suspected relics during construction to protect the scene and report immediately. The heritage authority attends and issues an opinion through the statutory process. Travellers should use the metro operator's live notice for service impacts, not infer a network delay from an excavation photograph."
    },
    {
      id: "cases-heading",
      type: "heading",
      level: 2,
      text: "Four cities show four different slices of the process"
    },
    {
      id: "guangzhou-case",
      type: "callout",
      tone: "neutral",
      title: "Guangzhou: a station-entrance excavation reaches formal completion",
      body: "At the Line 12 Hengfu Road station A entrance, a 150-square-metre excavation found five features: one Western Han tomb, three Southern Dynasties tombs and one Song ash pit, plus 24 artefacts or sets. A June 2025 letter let the excavated area proceed with other procedures while retaining the stop, protect and report duty. This bounded hand-back did not clear all of Line 12 at once."
    },
    {
      id: "beijing-case",
      type: "callout",
      tone: "neutral",
      title: "Beijing: metro and commercial works help reveal a former capital's structure",
      body: "In 2019–2020, protection of the Jin capital wall and work around Lines 14 and 16 at Lize supported excavations at four locations. Beijing's account records the outer wall, moat, inner perimeter road and a crossroads, clarifying their relationship. This city-scale result came from several footprints; it does not mean passengers can see an excavation from the platform."
    },
    {
      id: "wuhan-case",
      type: "callout",
      tone: "neutral",
      title: "Wuhan: archaeology is completed inside an opening programme",
      body: "Wuhan's archaeology institute reported that in January 2021 it completed a nationally approved, first-phase 500-square-metre area at the west entrance of Line 5's Tanhualin station. The work passed expert acceptance; its own report says this helped the line open on time. That counters 'archaeology always delays', but remains one institution's account of one phase."
    },
    {
      id: "hangzhou-case",
      type: "callout",
      tone: "neutral",
      title: "Hangzhou: a vehicle-base footprint reveals a prehistoric settlement",
      body: "Excavation for Line 15's Shushan South vehicle base covered 1,950 square metres at Zhaojiadun in 2024–2025. The city records 119 house remains, burials, pits and pottery deposits; pottery, stone and jade objects; late Majiabang material, early Liangzhu remains and a rare Houmaqiao burial. A 'metro dig' may concern a depot or entrance, not an operating tunnel below the old centre."
    },
    {
      id: "case-limit",
      type: "callout",
      tone: "decision",
      title: "Do not turn four cases into a national formula",
      body: "The relevant layer, project footprint, local rules, engineering design, authority and research question differ by city and site. One project can be cleared after documentation; another may need protection or design work. The available official records do not support a fixed delay, a standard number of finds, or a promise of a station museum."
    },
    {
      id: "engineering-heading",
      type: "heading",
      level: 2,
      text: "Archaeology is only one heritage problem around a metro"
    },
    {
      id: "engineering-body",
      type: "paragraph",
      text: "Buried remains and standing heritage beside a line require different evidence. A peer-reviewed study of Zhengzhou Metro Line 3 modelled risk to an adjacent heritage building through building, metro, soil and management factors. Visible monuments can need structural assessment even without a new artefact. Vibration monitoring, excavation and architectural conservation are not the same task."
    },
    {
      id: "scenario-heading",
      type: "heading",
      level: 2,
      text: "Two traveller scenarios"
    },
    {
      id: "scenario-one",
      type: "callout",
      tone: "decision",
      title: "Scenario 1: a discovery appears in the news before your trip",
      body: "You have a hotel and a museum booking near the reported project. First identify whether the report concerns an operating line, a future line, a station exit, depot or adjacent development. Then check the official metro operator for your travel date and the venue for its entrance. Keep a road or alternate-station route only if a current notice affects access. Archaeology news alone is not a service alert."
    },
    {
      id: "scenario-two",
      type: "callout",
      tone: "decision",
      title: "Scenario 2: a station uses archaeological imagery",
      body: "Read the label before calling the display an in-situ site. Ask four questions: was the material found here; is it original or a replica; is it still in its excavated position; and which museum or institute interpreted it? If the label is absent or ambiguous, enjoy the design as interpretation and verify the archaeological claim through the named heritage institution later."
    },
    {
      id: "visitor-workflow-heading",
      type: "heading",
      level: 2,
      text: "How to verify what you are looking at"
    },
    {
      id: "visitor-workflow",
      type: "list",
      ordered: true,
      items: [
        "Record the exact line, station, exit, depot or development named in the report; these are not interchangeable.",
        "Find the heritage authority, archaeology institute or project report, not only a reposted photograph.",
        "Separate discovery, excavation, completion and passenger-opening dates.",
        "For travel impact, check the operator's current notice and the venue's current entrance rather than an archaeology article.",
        "For public access, confirm a museum, park or formal display page; never enter a fenced construction or excavation area.",
        "At a display, read whether objects are original, relocated, reproduced or shown only through graphics.",
        "Save the Chinese place name and one official source so a hotel desk, guide or museum can help resolve ambiguity."
      ]
    },
    {
      id: "failure-recovery",
      type: "table",
      caption: "If the archaeology story does not match what you find on the ground",
      columns: ["Failure", "Likely explanation", "Recovery"],
      rows: [
        ["No excavation is visible", "The work finished, moved to another footprint or was never public", "Use the dated official report; do not search behind hoardings"],
        ["Station exit is closed", "Construction sequencing or another operational issue may have changed access", "Use the operator's live exit map and a verified alternate entrance"],
        ["The station art has no clear provenance", "It may be thematic design rather than an archaeological display", "Treat it as interpretation and check the named museum or institute"],
        ["A headline says the project was 'stopped'", "It may refer to one work face or a past reporting stage", "Match the claim to a dated authority notice before changing travel plans"]
      ]
    },
    {
      id: "final-check",
      type: "list",
      ordered: false,
      items: [
        "The claim names a precise project footprint and city.",
        "The official record distinguishes investigation, excavation, protection and construction hand-back.",
        "A live transport notice—not inference—supports any effect on passengers.",
        "A public venue confirms any promised display or access.",
        "No unpublished find, delay, reroute or opening date has been guessed."
      ]
    },
    {
      id: "dynamic-boundary",
      type: "callout",
      tone: "warning",
      title: "Dynamic facts reviewed 13 August 2026",
      body: "Construction stages, exit access, excavations, conservation work and public displays can change. The city cases above are dated records of particular work, not current visitor attractions unless a separate official venue says so. Recheck any passenger-facing fact close to travel."
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "Scope",
      body: "This guide explains an urban process for travellers. It does not give construction instructions, invite access to worksites, evaluate an unannounced discovery, or predict the legal, engineering or timetable outcome of a live project."
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Keep reading the city carefully",
      items: [
        {"label": "Visit Liangzhu Museum and Ruins Park in sequence", "href": "/guides/liangzhu-ruins-park-and-museum-sequence/", "description": "Compare a museum collection with a formally accessible archaeological landscape."},
        {"label": "Confirm a shifted map pin in China", "href": "/guides/china-map-coordinate-offset-explained/", "description": "Resolve a station, entrance or museum location with Chinese-address cross-checks."},
        {"label": "Read whether a hotel is really near the metro", "href": "/guides/china-hotel-near-metro/", "description": "Use the actual entrance and walking route rather than a station label."},
        {"label": "Read Western Xia script and tomb evidence", "href": "/guides/xixia-script-and-imperial-tombs-context/", "description": "See how archaeological evidence supports a careful historical interpretation."},
        {"label": "Compare Zhouqiao archaeology with modern themed Kaifeng", "href": "/guides/kaifeng-song-dynasty-urban-landscape/", "description": "Use one named excavation to distinguish surviving evidence, later reconstruction and visitor-oriented historical staging."},
        {"label": "Read whether heritage fabric is original, repaired or rebuilt", "href": "/guides/how-to-read-heritage-sites-in-china/", "description": "Carry the discovery process into a component-level method for identifying intervention, material status and evidence."}
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and independent sources reviewed",
      items: [
        {"label": "Cultural Relics Protection Law of the People's Republic of China (2024 revision)", "url": "https://www.npc.gov.cn/npc/c2/c30834/202411/t20241108_440882.html", "publisher": "National People's Congress of China", "reviewedAt": "2026-08-13"},
        {"label": "Completion letter for archaeological excavation at Guangzhou Metro Line 12 Hengfu Road station A entrance", "url": "https://wglj.gz.gov.cn/gkmlpt/content/10/10315/post_10315789.html", "publisher": "Guangzhou Municipal Cultural Heritage Bureau", "reviewedAt": "2026-08-13"},
        {"label": "Beijing archaeology during the 14th Five-Year Plan, including Lines 14 and 16 at Lize", "url": "https://www.beijing.gov.cn/renwen/sy/whkb/202104/t20210425_2368940.html", "publisher": "Beijing Municipal Government", "reviewedAt": "2026-08-13"},
        {"label": "2021 performance report of Wuhan Municipal Institute of Cultural Relics and Archaeology", "url": "https://wlj.wuhan.gov.cn/ztzl_27/zxzt/swljbmyjsjsgjfyjsxx/202210/P020221026460810686848.pdf", "publisher": "Wuhan Municipal Culture and Tourism Bureau", "reviewedAt": "2026-08-13"},
        {"label": "Zhaojiadun excavation for Hangzhou Metro Line 15 Shushan South vehicle base", "url": "https://www.hzxcw.gov.cn/content_46825.html", "publisher": "Hangzhou Publicity Office / Hangzhou Daily", "reviewedAt": "2026-08-13"},
        {"label": "Safety risk assessment of heritage buildings in metro construction: Zhengzhou case", "url": "https://www.nature.com/articles/s40494-020-00439-3", "publisher": "npj Heritage Science", "reviewedAt": "2026-08-13"},
        {"label": "Managing Cultural Heritage in China: A View from the Outside", "url": "https://www.cambridge.org/core/journals/china-quarterly/article/abs/managing-cultural-heritage-in-china-a-view-from-the-outside/C7311B0A5197F1AAA7641327BE18F8EA", "publisher": "The China Quarterly / Cambridge University Press", "reviewedAt": "2026-08-13"}
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
