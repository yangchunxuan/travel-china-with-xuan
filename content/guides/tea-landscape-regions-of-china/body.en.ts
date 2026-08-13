import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "China does not have one representative 'tea countryside.' Around Hangzhou, tea gardens meet a major city and pan-firing helps explain a green tea. In Wuyi, gullies, rock, village gardens and repeated roasting help explain an oolong. On Jingmai Mountain, old tea forests, protective woodland and villages form one cultural landscape. In Anhua, gardens make sense together with dark-tea workshops, compressed tea and the routes used to move it. The useful question is not which tea is best, but which relationship you want to see.",
    },
    {
      id: "direct-answer",
      type: "callout",
      tone: "decision",
      title: "Choose the landscape before the tasting",
      body: "Choose Longjing for a practical first tea-origin visit from Hangzhou; Wuyi for terrain and a longer processing chain; Jingmai for a forest-and-village land-use system; or Anhua for compressed dark tea, workshops and trade routes. None guarantees a harvest, live production or an honest sales encounter on your date. Confirm the exact garden, producer, activity and access rule before travelling.",
    },
    { id: "choice-heading", type: "heading", level: 2, text: "Four regions answer four different questions" },
    {
      id: "choice-table",
      type: "table",
      caption: "Use the visible relationship—not a best-tea ranking—to choose",
      columns: ["Region", "What the landscape explains", "Most useful thing to witness", "Do not assume"],
      rows: [
        ["Longjing, Hangzhou", "How hills west of West Lake, working villages and a nearby city meet", "Fresh-leaf sorting and manual pan-firing when genuinely in production", "Every 'Longjing' on sale is West Lake Longjing, or spring work happens daily"],
        ["Wuyi, Fujian", "Why slope, gullies, rock, garden position and processing are discussed together", "Withering, leaf handling and later roasting as connected stages", "World Heritage status certifies tea, or a short activity reproduces the full craft"],
        ["Jingmai, Pu'er, Yunnan", "How old tea forests, protective forests, villages and community rules form a system", "The vertical structure of a tea forest and its relation to settlement", "All Pu'er comes from Jingmai, or an 'old tree' claim authenticates a product"],
        ["Anhua, Hunan", "How cultivation, processing, compression, storage and transport create a product", "Qianliang packing and compression, or a documented factory-and-route interpretation", "Pu'er and Anhua dark tea are interchangeable, or every old-looking building is historic"],
      ],
    },
    { id: "longjing-heading", type: "heading", level: 2, text: "Longjing: the clearest city-to-tea transition" },
    {
      id: "longjing-landscape",
      type: "paragraph",
      text: "Longjing fits most easily into a conventional first Hangzhou trip. Dense urban fabric gives way to hills, gardens and tea villages within one day. That proximity is part of the evidence: this is not an isolated plantation landscape, but a production area long connected to West Lake, religious sites, urban consumers and visitors. Read how lanes, villages, garden slopes and the city meet rather than treating any green hillside as proof of a particular origin.",
    },
    {
      id: "longjing-work",
      type: "paragraph",
      text: "The useful craft is not a pouring ceremony but the way tender leaf responds to heat, hand pressure and time during pan-firing. Institutional material documents spreading and more than one heating and shaping stage, but public summaries group those stages differently. Ask which exact stage you see, where the leaves came from and whether this is saleable production or a demonstration with practice material. Spring work depends on cultivar, elevation and weather; production takes priority over performing for visitors.",
    },
    { id: "wuyi-heading", type: "heading", level: 2, text: "Wuyi: read the garden and the roast together" },
    {
      id: "wuyi-landscape",
      type: "paragraph",
      text: "Wuyi has a different visual grammar. The wider World Heritage property carries ecological, scenic, archaeological and philosophical values; it is not a tea-quality certificate. Tea sits within red-sandstone landforms, gullies, water, forest, villages and gardens whose position is discussed with unusual precision. A clearly identified garden is evidence of place; a dramatic cliff photograph alone is not evidence for the origin of a cup.",
    },
    {
      id: "wuyi-work",
      type: "paragraph",
      text: "Official intangible-heritage material describes an interdependent oolong sequence including withering, repeated leaf handling, heating, rolling and roasting. Producers adjust decisions to leaf and weather. A few minutes of shaking a bamboo tray can introduce one movement but cannot stand for the complete craft. Pair a named landscape with a processing space that explains what happened before and after the stage on view; if roasting is not running, compare unfinished and finished leaf or dated process records.",
    },
    { id: "jingmai-heading", type: "heading", level: 2, text: "Jingmai: tea as forest, village and governance" },
    {
      id: "jingmai-system",
      type: "paragraph",
      text: "Pu'er is a large production region; Jingmai Mountain is one bounded World Heritage cultural landscape within it. UNESCO documents old tea forests, protective partition forests, traditional villages and plantations as connected elements. Tea grows beneath a taller canopy rather than in a uniformly exposed field, while Blang and Dai knowledge, rules and beliefs form part of the documented landscape. FAO separately describes layered vegetation, biodiversity and pressure from over-exploitation.",
    },
    {
      id: "jingmai-boundary",
      type: "paragraph",
      text: "Begin with the property map and distinguish forest, old tea forest, village and newer plantation. Look upward at canopy, across the tea layer and down at ground cover, paths and settlement. A heritage plaque can establish location but cannot authenticate a cake from an unrelated seller; 'ancient tree' is not a complete provenance record. Beliefs documented for specific Jingmai communities must not be generalized to Yunnan or China. Obtain permission before entering working plots or photographing people and ritual activity.",
    },
    { id: "anhua-heading", type: "heading", level: 2, text: "Anhua: follow tea from mountain material to transportable form" },
    {
      id: "anhua-chain",
      type: "paragraph",
      text: "Anhua is easiest to read as a chain. Gardens supply leaf; primary processing creates dark raw tea; further work creates forms such as Qianliang tea; compression and storage connect the product to factories, shops, markets, mountain paths and former wharves. China's agricultural-heritage record treats production and transport remains as parts of one cultural system, but it does not certify current visitor access or every old-looking structure.",
    },
    {
      id: "anhua-work",
      type: "paragraph",
      text: "The national intangible-heritage record separates preparation of dark raw tea from later screening, blending, softening, packing, treading or compression, binding, closing, cooling and extended drying. A visitor normally sees only selected steps. Ask whether the material was prepared there, which step is shown and what remains before completion. Anhua is not simply 'another Pu'er': the materials, named products, process histories and landscapes differ, and neither health claims nor romantic claims of unchanged routes belong in the evidence.",
    },
    { id: "sequence-heading", type: "heading", level: 2, text: "Use one field sequence in any tea region" },
    {
      id: "sequence",
      type: "list",
      ordered: true,
      items: [
        "Map: identify the named production or heritage boundary; a city name is too broad.",
        "Plant: record a cultivar only when the producer or label identifies it, then observe shade, slope, spacing and surrounding vegetation.",
        "Process: name the exact stage, ask what came before and next, and distinguish production from demonstration.",
        "Cup: taste one batch from one maker without turning it into a universal regional flavour.",
        "Label: before buying, record the producer, product name, date or season, origin statement and batch information.",
      ],
    },
    {
      id: "sales-recovery",
      type: "callout",
      tone: "warning",
      title: "If the visit becomes only a sales pitch",
      body: "Return to the five-step sequence and ask for the garden identity and the process stage. If staff cannot answer, enjoy the tasting as hospitality but do not use the sales language as provenance evidence. A cup beside a heritage site does not acquire heritage provenance automatically.",
    },
    { id: "scenarios-heading", type: "heading", level: 2, text: "Two sensible first-trip choices" },
    {
      id: "scenarios",
      type: "comparison",
      title: "Let the travel task determine the region",
      columns: [
        { heading: "One spare day in Hangzhou", body: "Choose Longjing for the compact city-to-garden contrast. Confirm one institution or producer and keep West Lake or a museum as a no-production fallback. The day should still work without buying tea." },
        { heading: "A tea-focused journey", body: "Choose two contrasting systems instead of rushing all four. Wuyi plus Jingmai compares intensive processing with forest land use; Longjing plus Anhua compares city-adjacent green tea with compressed dark tea and trade infrastructure." },
      ],
    },
    { id: "recognition-heading", type: "heading", level: 2, text: "What official recognition can—and cannot—tell you" },
    {
      id: "recognition",
      type: "paragraph",
      text: "UNESCO's China tea inscription confirms that planting, picking, processing, drinking and sharing form living bodies of knowledge; it does not certify every workshop. Jingmai's World Heritage status concerns a complete cultural landscape, while Mount Wuyi's values extend far beyond tea. Agricultural-heritage and intangible-heritage records identify systems and techniques, not retail rankings. A strong visit connects a visible landscape to a named piece of work and states what remains unverified.",
    },
    {
      id: "help",
      type: "callout",
      tone: "neutral",
      title: "Need a current, locally checked visit?",
      body: "Send Homeground your route, month and whether landscape, craft or tasting matters most. A human planner can recheck the current institution or producer without turning the day into a shopping obligation. Harvests, demonstrations, access and prices were reviewed on 13 August 2026 and must be confirmed for the travel date.",
    },
    {
      id: "links",
      type: "internal-links",
      title: "Continue planning and reading food culture",
      items: [
        { label: "Build a regional food route", href: "/guides/china-regional-food-route/", description: "Decide whether a tea landscape deserves a larger role in the trip." },
        { label: "Understand Guangzhou morning tea", href: "/guides/how-guangzhou-morning-tea-works/", description: "Move from producing landscapes to an urban way of sharing tea and food." },
        { label: "Order Shanghai, Suzhou, Hangzhou and Nanjing", href: "/guides/shanghai-suzhou-hangzhou-nanjing-route-order/", description: "Place a Longjing visit inside a realistic lower-Yangtze route." },
        { label: "Read China's 24 solar terms through weather and food", href: "/guides/china-24-solar-terms-weather-food-daily-life/", description: "Use another seasonal knowledge system without turning it into a fixed national weather calendar." },
        { label: "Follow Yunnan coffee from cherry to cup", href: "/guides/yunnan-coffee-from-cherry-to-cup/", description: "Compare a newer crop-and-processing landscape while keeping tea and coffee histories distinct." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and institutional sources",
      items: [
        { label: "Traditional tea processing techniques and associated social practices in China", url: "https://ich.unesco.org/en/RL/traditional-tea-processing-techniques-and-associated-social-practices-in-china-01884?RL=01884", publisher: "UNESCO Intangible Cultural Heritage", reviewedAt: "2026-08-13" },
        { label: "Cultural Landscape of Old Tea Forests of Jingmai Mountain in Pu'er", url: "https://whc.unesco.org/en/list/1665/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-13" },
        { label: "Pu'er Traditional Tea Agrosystem", url: "https://www.fao.org/giahs/giahs-around-the-world/china-puer-traditional-tea-agrosystem/en", publisher: "FAO GIAHS", reviewedAt: "2026-08-13" },
        { label: "Mount Wuyi", url: "https://whc.unesco.org/en/list/911/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-13" },
        { label: "West Lake Longjing Tea Culture System — official designation list", url: "https://www.moa.gov.cn/nybgb/2014/dliuq/201712/P020220424745802769272.pdf", publisher: "Ministry of Agriculture of China", reviewedAt: "2026-08-13" },
        { label: "West Lake Longjing green-tea processing technique", url: "https://www.ihchina.cn/project_details/14605.html", publisher: "China Intangible Cultural Heritage Network", reviewedAt: "2026-08-13" },
        { label: "Wuyi rock-tea processing technique", url: "https://www.ihchina.cn/art/detail/id/14373.html", publisher: "China Intangible Cultural Heritage Network", reviewedAt: "2026-08-13" },
        { label: "Wuyi traditional-village tea landscape", url: "https://zjt.fujian.gov.cn/xxgk/gzdt/bmdt/202607/t20260715_7178552.htm", publisher: "Fujian Department of Housing and Urban-Rural Development", reviewedAt: "2026-08-13" },
        { label: "Anhua dark-tea cultural system — official reserve-list notice", url: "https://www.agri.cn/zx/hxgg/202501/t20250124_8708188.htm", publisher: "Ministry of Agriculture and Rural Affairs of China", reviewedAt: "2026-08-13" },
        { label: "Qujiang tea garden, village and old-road heritage in Anhua", url: "https://wwj.hunan.gov.cn/c100310/c100311/202007/t20200727_13078842.html", publisher: "Hunan Provincial Cultural Heritage Bureau", reviewedAt: "2026-08-13" },
        { label: "Qianliang tea processing technique", url: "https://www.ihchina.cn/project_details/14624.html", publisher: "China Intangible Cultural Heritage Network", reviewedAt: "2026-08-13" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
