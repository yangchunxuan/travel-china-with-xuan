import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "A straw checkerboard, shelterbelt and photovoltaic field do different work. The grid roughens the surface and reduces wind-blown sand; vegetation protects a defined edge; solar arrays generate power and may change shade, wind and water distribution alongside separate control measures. Read the target, mechanism, water source, maintenance and access boundary before calling any of them restoration. Greener is not automatically healthier, and work zones are not automatically open to visitors."
    },
    {
      id: "terms-heading",
      type: "heading",
      level: 2,
      text: "Begin with three different verbs"
    },
    {
      id: "terms-comparison",
      type: "comparison",
      columns: [
        {
          heading: "Control",
          body: "Reduce moving sand, wind erosion or burial risk around an asset. A stable surface can meet this task without becoming a forest."
        },
        {
          heading: "Restore",
          body: "Recover ecological functions or a locally appropriate plant–soil community on degraded land, using a baseline, target and monitoring."
        },
        {
          heading: "Protect",
          body: "Keep natural vegetation, biological soil crust or a fragile transition zone from further disturbance. Sometimes less access and planting is better."
        }
      ]
    },
    {
      id: "desert-boundary",
      type: "callout",
      tone: "warning",
      title: "A natural desert is not failed land",
      body: "China's national plan distinguishes prevention, protection, restoration and appropriate use by region and water capacity. Do not treat every bare-looking dune as land that should be made green. Natural drylands, mobile dunes and sparse native vegetation can have ecological value; ask whether land is degrading and what risk is being managed."
    },
    {
      id: "three-systems-heading",
      type: "heading",
      level: 2,
      text: "Read the three most visible systems separately"
    },
    {
      id: "three-systems-table",
      type: "table",
      caption: "What a traveller can observe—and what remains unproven",
      columns: ["System", "Visible mechanism", "Conditions and limit"],
      rows: [
        [
          "Straw checkerboards",
          "Partly buried straw forms cells that roughen the surface, disrupt near-ground airflow and encourage moving sand to settle.",
          "Size, height, slope, wind, material decay and repairs matter. Sand stabilization comes first; vegetation recovery is separate and slower."
        ],
        [
          "Shelterbelts",
          "Grasses, shrubs and trees reduce wind across a protected edge and intercept material before it reaches an asset.",
          "Species, porosity, orientation, survival and water demand matter. A dense wall of thirsty trees is not a universal solution."
        ],
        [
          "Photovoltaic fields",
          "Arrays generate electricity and alter shade, roughness, near-ground wind and rainfall distribution; barriers or vegetation may be added around panels.",
          "Construction, compaction, water, grazing, vegetation management and prior land condition change the result. Panels alone do not prove restoration."
        ]
      ]
    },
    {
      id: "checkerboard-heading",
      type: "heading",
      level: 2,
      text: "A straw grid is the start of a chain, not the finished ecosystem"
    },
    {
      id: "checkerboard-chain",
      type: "list",
      ordered: true,
      items: [
        "Define the asset and sand source. Railway protection, a road-edge dune and degraded grazing land need different success measures.",
        "Place the barrier for local wind and terrain. Straw redirects near-surface flow; erosion and deposition reshape each cell.",
        "Let suitable plants or biological crust establish where moisture and protection permit. The grid does not manufacture water or mature soil.",
        "Inspect and renew it. Straw decays, cells bury or scour, plants die, and trampling breaks the developing surface."
      ]
    },
    {
      id: "shapotou-case",
      type: "callout",
      tone: "neutral",
      title: "Why Shapotou's 1 m × 1 m grid is a case, not a universal recipe",
      body: "The Chinese Academy of Sciences reports that long-term work near Shapotou optimized a partly buried 1 m × 1 m straw grid for the local railway-protection system. Peer-reviewed wind research explains how checkerboards change turbulence, erosion and deposition. That cross-check supports the mechanism at this setting; it does not make one cell size best for every dune, material, wind field or maintenance regime."
    },
    {
      id: "shelterbelt-heading",
      type: "heading",
      level: 2,
      text: "A shelterbelt should be judged by the edge it protects"
    },
    {
      id: "shelterbelt-conditions",
      type: "table",
      caption: "Questions behind a line of vegetation",
      columns: ["Field question", "Why it changes the judgment"],
      rows: [
        [
          "What is on the downwind side?",
          "A farm network, oasis margin, transport corridor and natural-desert boundary require different belt layouts and outcomes."
        ],
        [
          "Which plants and how dense?",
          "Locally adapted grasses and shrubs may fit a dry site better than tall trees. Some airflow through a belt can be more useful than a solid wall."
        ],
        [
          "Where does water come from?",
          "Rain-fed planting, groundwater, surface diversion and irrigation have different ecological costs. Survival supported by imported water is not self-sustaining recovery."
        ],
        [
          "What persists after establishment?",
          "Gaps, dead stems, pests, fire, grazing pressure and replacement work reveal whether the protective function can continue. One green season is not a trend."
        ]
      ]
    },
    {
      id: "water-tradeoff",
      type: "callout",
      tone: "decision",
      title: "Water is the non-negotiable constraint",
      body: "A peer-reviewed synthesis of China's drylands finds that conservation and restoration can deliver benefits while afforestation can also impose substantial water pressure. The national plan likewise uses water-resource capacity to separate priorities. Read species, density and water source together; do not score a project by canopy cover alone."
    },
    {
      id: "pv-heading",
      type: "heading",
      level: 2,
      text: "Solar panels change the site, but they do not perform restoration by themselves"
    },
    {
      id: "pv-explanation",
      type: "paragraph",
      text: "China's 2024 energy and forestry notice requires photovoltaic desert-control projects to plan control work, inspect facilities, recycle production water and protect necessary ecological water. It treats power generation and sand control as coupled tasks. Western China field studies find soil moisture and temperature changes beneath panels, while surveys show effects vary by site and ecological construction. Shade, reduced wind and redistributed rain may help vegetation; grading, roads, compaction, cleaning water and irrigation create other effects. Separate panels from companion measures and inputs before assigning causation."
    },
    {
      id: "pv-effects",
      type: "comparison",
      columns: [
        {
          heading: "Potential pathway",
          body: "Shade and wind reduction can lower some surface stress; panel edges redistribute rainfall; managed vegetation or sand barriers may benefit in a suitable site."
        },
        {
          heading: "Potential burden",
          body: "Construction can disturb crusts and soil, service roads fragment ground, and cleaning or planted cover can add water demand and maintenance inputs."
        },
        {
          heading: "What evidence is needed",
          body: "A baseline, comparison area, water budget, vegetation and soil monitoring, construction record and enough time to separate weather from intervention."
        }
      ]
    },
    {
      id: "access-boundary",
      type: "callout",
      tone: "warning",
      title: "A power field, protection belt or research plot is not a public attraction",
      body: "Enter only through an operator or local authority's designated visitor route. A fence, gate, warning sign or staff instruction ends the visit. Do not stop on a highway shoulder, cross a railway boundary, fly a drone, climb a dune control grid or assume that a distant view authorizes access."
    },
    {
      id: "traveller-protocol-heading",
      type: "heading",
      level: 2,
      text: "A six-step traveller reading protocol"
    },
    {
      id: "traveller-protocol",
      type: "list",
      ordered: true,
      items: [
        "Confirm the public viewpoint, opening and operator; distinguish it from a reserve core, research station or industrial site.",
        "Identify the problem: moving sand, wind erosion, infrastructure protection, degraded vegetation, energy generation or combined tasks.",
        "Trace grid orientation, belt position, panel spacing and the protected downwind edge. Connect the mechanism to its target.",
        "Look for irrigation, replacement grids, access tracks, dead plants, grazing control and monitoring equipment.",
        "Record invisible factors: groundwater use, survival, soil change, baseline, long-term maintenance and off-site effects.",
        "Leave the surface intact. Stay on marked routes and never collect plants, crust or straw."
      ]
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two responsible traveller scenarios"
    },
    {
      id: "scenarios-table",
      type: "table",
      caption: "Observation without turning work sites into attractions",
      columns: ["Situation", "Useful reading", "Recovery if access is unclear"],
      rows: [
        [
          "A legal public visit in the Shapotou visitor area",
          "Use marked public viewpoints to connect checkerboards with the history of protecting the Baotou–Lanzhou railway, then distinguish mechanical stabilization from later vegetation and crust development.",
          "If a route approaches railway land, a reserve boundary or a research plot, turn back. Use the public interpretation centre or official display instead of seeking the working belt."
        ],
        [
          "A distant view of a desert photovoltaic array",
          "Read it first as energy infrastructure. From a designated viewpoint, look for separate sand barriers, managed groundcover, water systems and service roads before discussing ecological effects.",
          "If no visitor route is published, do not improvise one. Keep the array as a landscape context seen from lawful transport and choose a public museum, viewpoint or different stop."
        ]
      ]
    },
    {
      id: "misreadings-heading",
      type: "heading",
      level: 2,
      text: "Common misreadings and better questions"
    },
    {
      id: "misreadings-table",
      type: "table",
      caption: "Replace the slogan with a testable question",
      columns: ["Misreading", "Better question"],
      rows: [
        ["More green means more restored", "Which native function or protection target improved, and at what water cost?"],
        ["The straw grid is a tree-planting nursery", "Was its first task to reduce wind-blown sand, and what later process is actually monitored?"],
        ["Solar panels fixed the desert", "Which result comes from the array, and which comes from barriers, planting, grazing control, irrigation or maintenance?"],
        ["A fence hides the best viewpoint", "Is the fence protecting visitors, infrastructure, research validity or a fragile recovering surface? Use the authorized alternative."]
      ]
    },
    {
      id: "final-check-heading",
      type: "heading",
      level: 2,
      text: "Before you describe what you saw"
    },
    {
      id: "final-check",
      type: "list",
      ordered: false,
      items: [
        "Name the intervention and its protected target without calling every dryland project restoration.",
        "State the site conditions that matter: wind, terrain, rainfall, soil, water source and maintenance.",
        "Separate an observed pattern from a measured ecological outcome.",
        "Acknowledge water and construction trade-offs as well as possible benefits.",
        "Confirm that every photograph and observation came from a legal public position, not a work, rail, reserve or research zone."
      ]
    },
    {
      id: "help-cta",
      type: "callout",
      tone: "decision",
      title: "Want to place a dryland landscape stop responsibly?",
      body: "Send your dates, traveller count and rough budget. A human planner can check whether a legitimate public observation point fits the route without promising access to an operating or protected zone."
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue exploring",
      items: [
        {
          label: "Explore China",
          href: "/explore/",
          description: "Return to the destination and landscape collection."
        },
        {
          label: "Use public gateways for the Qilian Mountains",
          href: "/guides/qilian-mountains-public-gateways-and-access/",
          description: "Apply the same access discipline to another ecologically sensitive region."
        },
        {
          label: "Read the Western Xia context in Ningxia",
          href: "/guides/xixia-script-and-imperial-tombs-context/",
          description: "Balance a dryland reading stop with a documented cultural-landscape visit."
        },
        {
          label: "Plan around China's climate regions",
          href: "/guides/china-climate-regions-for-trip-timing/",
          description: "Screen heat, cold, wind and exposure before adding a dryland stop."
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and research sources reviewed",
      items: [
        {
          label: "National Desertification Prevention and Control Plan (2021–2030)",
          url: "https://www.forestry.gov.cn/c/www/lczc/521554.jhtml",
          publisher: "National Forestry and Grassland Administration (official plan publication)",
          reviewedAt: "2026-08-13"
        },
        {
          label: "How China prevents and controls desertification",
          url: "https://www.forestry.gov.cn/c/www/zhzs/571450.jhtml",
          publisher: "National Forestry and Grassland Administration",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Shapotou's sand-control research history and checkerboard mechanism",
          url: "https://www.cas.cn/zt/kjzt/kjzlzqzl/kjzlzq/202405/t20240531_5016345.shtml",
          publisher: "Chinese Academy of Sciences",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Notice on orderly photovoltaic desert-control development",
          url: "https://zfxxgk.nea.gov.cn/2024-05/17/c_1310776162.htm",
          publisher: "National Energy Administration and National Forestry and Grassland Administration",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Why photovoltaic panels alone do not control desertification",
          url: "https://www.forestry.gov.cn/lyj/1/zhzs/20260417/655639.html",
          publisher: "National Forestry and Grassland Administration",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Drivers and impacts of changes in China's drylands",
          url: "https://www.nature.com/articles/s43017-021-00226-z",
          publisher: "Nature Reviews Earth & Environment",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Turbulent aeolian sand movement over straw checkerboard barriers",
          url: "https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2017JD027786",
          publisher: "Journal of Geophysical Research: Atmospheres",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Effects of photovoltaic panels on desert soil temperature and moisture",
          url: "https://pubmed.ncbi.nlm.nih.gov/33400111/",
          publisher: "Environmental Science and Pollution Research",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Ecological construction status of photovoltaic plants in Chinese deserts",
          url: "https://www.frontiersin.org/journals/environmental-science/articles/10.3389/fenvs.2024.1406546/full",
          publisher: "Frontiers in Environmental Science",
          reviewedAt: "2026-08-13"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
