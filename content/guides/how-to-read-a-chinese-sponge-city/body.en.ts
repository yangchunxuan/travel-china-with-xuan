import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "After rain, read a sponge-city space as a water route, not a collection of green objects. Find where runoff enters, where it slows or sinks, where excess water can overflow, and how the route reconnects to pipes or a receiving waterbody. A rain garden, porous path or wetland can reduce and delay runoff within its design conditions; none proves that a district is flood-safe. One visit can reveal the intended mechanism and signs of upkeep, but it cannot certify engineering performance."
    },
    {
      id: "scope-boundary",
      type: "callout",
      tone: "warning",
      title: "This is public-space interpretation, not a flood-safety test",
      body: "Use this guide from an open path after authorities say conditions are safe. Do not enter planted basins, channels, ponds, fenced equipment areas or closed river edges. Visible drainage does not replace an official warning, an engineering inspection or a site's emergency rules."
    },
    {
      id: "water-route-heading",
      type: "heading",
      level: 2,
      text: "Follow five points in the water route"
    },
    {
      id: "water-route-steps",
      type: "list",
      ordered: true,
      items: [
        "Catchment: look uphill at roofs, paths, lawns and roads. The surface feeding a facility matters more than the facility's decorative border.",
        "Inlet: find an open kerb, slot, swale or downpipe. Sediment or litter here can stop water before it reaches the green feature.",
        "Storage or infiltration: identify a lower planted bed, porous surface, pond, tank connection or wetland shelf where water can pause, soak or spread.",
        "Overflow: look for a raised grate, spillway or second channel. A designed escape route is evidence of capacity limits, not a contradiction of the sponge idea.",
        "Downstream link: ask where excess water goes next. Green measures usually work with street drains, pipes, pumps, rivers or lakes rather than replacing them."
      ]
    },
    {
      id: "mechanisms-heading",
      type: "heading",
      level: 2,
      text: "What the visible parts are trying to do"
    },
    {
      id: "mechanisms-table",
      type: "table",
      caption: "Mechanism, field clue and interpretation limit",
      columns: ["Feature", "What to look for after rain", "Mechanism and limit"],
      rows: [
        [
          "Sunken green space or rain garden",
          "A planted basin below the path, an inlet and an overflow point; shallow temporary ponding may be intentional.",
          "Soil, roots and filter media slow, store and sometimes treat runoff. One wet patch cannot reveal storage depth, underdrains or water-quality performance."
        ],
        [
          "Permeable pavement",
          "Open joints or porous material, less sheet flow, and a connection to nearby planting or drainage.",
          "Water passes into a stone or soil layer below. Fine sediment can clog the surface, and an impermeable or saturated subgrade can limit infiltration."
        ],
        [
          "Vegetated swale",
          "A broad, shallow channel with a gentle fall rather than a deep concrete ditch.",
          "It slows and conveys runoff while allowing settling or infiltration. Its job may be transport, not complete absorption."
        ],
        [
          "Wetland or detention basin",
          "A basin with changing water level, planted margins, a controlled outlet and space above the normal waterline.",
          "It stores and releases water more slowly and may support treatment processes. Capacity, residence time and water quality are not visible from a photograph."
        ],
        [
          "Grey–green chain",
          "Kerb opening to planting, overflow grate to pipe, or wetland outlet to a channel or pump system.",
          "Distributed green and blue spaces manage water before conventional drainage carries excess flow. Judging only the prettiest segment misses the system."
        ]
      ]
    },
    {
      id: "policy-target-boundary",
      type: "callout",
      tone: "neutral",
      title: "A national target is not a nationwide field result",
      body: "The 2015 State Council guidance used the sequence infiltrate, retain, store, cleanse, use and drain, and set a policy objective for 70% of rainfall to be absorbed and used locally. That is a planning direction with staged coverage goals—not proof that every city, park or storm now achieves 70%. The 2014 technical guide likewise describes design and maintenance methods; it is not a certificate for any installation you see."
    },
    {
      id: "conditions-heading",
      type: "heading",
      level: 2,
      text: "Four conditions can change the result"
    },
    {
      id: "conditions-comparison",
      type: "comparison",
      columns: [
        {
          heading: "Rainfall and prior wetness",
          body: "A short shower and a long intense storm impose different inflow. Soil and storage already wet from earlier rain have less remaining capacity."
        },
        {
          heading: "Soil and groundwater",
          body: "Permeable soil can accept water faster than compacted or clay-rich ground. High groundwater may require storage, underdrains or controlled discharge instead of deep infiltration."
        },
        {
          heading: "Maintenance",
          body: "Leaves, silt and rubbish can block inlets or pavement pores. Erosion, bare patches and damaged outlets matter; lush planting alone is not a maintenance record."
        },
        {
          heading: "The wider drainage system",
          body: "A local basin can fill correctly while a downstream pipe, pump or river is constrained. Performance depends on the whole grey–green chain and its design event."
        }
      ]
    },
    {
      id: "two-visits-heading",
      type: "heading",
      level: 2,
      text: "Two visits that should lead to different conclusions"
    },
    {
      id: "two-visits-table",
      type: "table",
      caption: "Traveller scenarios after rain",
      columns: ["Situation", "Reasonable observation", "Do not conclude"],
      rows: [
        [
          "A calm visit after a modest shower",
          "Runoff enters through open kerbs, briefly ponds in a planted basin, and reaches a visible overflow only at the higher edge. Photograph the sequence from the path and compare nearby conventional paving.",
          "That the facility will handle an extreme storm, remove specified pollutants, or perform the same way after years of sediment loading."
        ],
        [
          "A visit after prolonged or intense rain",
          "Several basins are full and water uses overflow routes. Treat barriers, warnings and fast water as the decisive evidence; leave low ground and choose an indoor alternative.",
          "That ponding proves failure—or success. Without rainfall data, design drawings, monitoring and downstream conditions, a visitor cannot diagnose the system."
        ]
      ]
    },
    {
      id: "city-case-heading",
      type: "heading",
      level: 2,
      text: "One public case: Jinxi Park in Suzhou"
    },
    {
      id: "city-case",
      type: "paragraph",
      text: "Suzhou's municipal government describes Jinxi Park in Suzhou Industrial Park as using terrain differences, rain gardens, sunken green space, permeable paving and roof-runoff planters. That makes it a useful place to look for a connected vocabulary rather than one isolated object: source surfaces, planted storage, porous paths and overflow links. The official project description explains intent. It does not supply a traveller with current monitoring data, prove today's maintenance state or turn the park into a flood refuge."
    },
    {
      id: "case-transfer-rule",
      type: "callout",
      tone: "decision",
      title: "Transfer the questions, not the verdict",
      body: "Use Jinxi Park to learn what connections can look like, then start again in the next city. Rainfall regime, soil, topography, groundwater, construction and maintenance differ, so a visible feature should never inherit another project's reported outcome."
    },
    {
      id: "safety-heading",
      type: "heading",
      level: 2,
      text: "Observe without becoming part of the runoff problem"
    },
    {
      id: "safety-list",
      type: "list",
      ordered: false,
      items: [
        "Wait until active weather warnings and site closures have ended; official safety instructions outrank an educational walk.",
        "Stay on open, firm paths. Water can hide drops, grates, unstable soil and fast flow near an outlet.",
        "Do not step into a rain garden or wetland to test depth or infiltration; trampling and compaction can damage the feature.",
        "Never lift grates, touch pumps or enter a service enclosure. Underground storage and electrical equipment are not visitor exhibits.",
        "Do not describe captured stormwater as clean or drinkable. Treatment purpose and measured water quality require evidence.",
        "If standing water persists, record time, place and a photo from a safe public position; report it to the site manager rather than attempting a diagnosis."
      ]
    },
    {
      id: "final-check-heading",
      type: "heading",
      level: 2,
      text: "The final five-question check"
    },
    {
      id: "final-check",
      type: "list",
      ordered: true,
      items: [
        "Can you identify the surface that supplies the runoff?",
        "Can you see an unobstructed inlet and a lower place for water to pause?",
        "Can you find a safe overflow route rather than assuming infinite capacity?",
        "Can you name at least one condition—rainfall, soil, prior wetness, maintenance or downstream drainage—that could change the outcome?",
        "Can you state what remains unknown without plans or monitoring? If yes, you have read the system without pretending to certify it."
      ]
    },
    {
      id: "help-cta",
      type: "callout",
      tone: "decision",
      title: "Want to add an urban-ecology stop to your route?",
      body: "Send your dates, traveller count and rough budget. A human planner can help place a responsible public-space visit inside the trip without treating it as a flood-safety promise."
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
          label: "Read a Suzhou garden",
          href: "/guides/how-to-read-a-suzhou-garden/",
          description: "Compare modern rainwater infrastructure with a different way of reading designed water and terrain."
        },
        {
          label: "Plan for China's climate regions",
          href: "/guides/china-climate-regions-for-trip-timing/",
          description: "Separate broad climate exposure from the weather on one visit."
        },
        {
          label: "Visit the northern Jiangsu Yellow Sea wetlands responsibly",
          href: "/guides/northern-jiangsu-yellow-sea-wetland-coast/",
          description: "Move from engineered urban water spaces to a protected coastal-wetland decision."
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and research sources reviewed",
      items: [
        {
          label: "State Council guidance on sponge-city construction",
          url: "https://www.mof.gov.cn/zhengwuxinxi/zhengcefabu/201510/t20151016_1507043.htm",
          publisher: "Ministry of Finance of the People's Republic of China",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Technical guide for low-impact stormwater systems",
          url: "https://www.mohurd.gov.cn/file/2022/20220801/7f6280a1-540e-4ab9-b519-ac2f9cf0b938.pdf",
          publisher: "Ministry of Housing and Urban-Rural Development",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Jinxi Park sponge-city demonstration description",
          url: "https://www.suzhou.gov.cn/szsrmzf/qxkx/202401/c078b782da5347aa85f765495191572b.shtml",
          publisher: "Suzhou Municipal People's Government",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Review of Sponge City implementation in China",
          url: "https://pubmed.ncbi.nlm.nih.gov/38017674/",
          publisher: "Water Science and Technology",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Sponge city practice: construction, assessment and maintenance review",
          url: "https://www.sciencedirect.com/science/article/pii/S0959652620350071",
          publisher: "Journal of Cleaner Production",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Permeable pavement clogging and maintenance review",
          url: "https://www.mdpi.com/2073-4441/10/3/337",
          publisher: "Water",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Systematic review of bioretention effectiveness",
          url: "https://www.mdpi.com/2073-4441/15/5/913",
          publisher: "Water",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Hero image: Rain garden in Huaxia Park by Karoke Cirno, CC BY-SA 4.0; cropped and resized",
          url: "https://commons.wikimedia.org/wiki/File:Rain_garden_in_Huaxia_Park.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-13"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
