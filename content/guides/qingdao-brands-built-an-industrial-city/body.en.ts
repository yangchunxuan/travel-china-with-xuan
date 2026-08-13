import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Modern Qingdao is easier to read when three familiar products become city evidence. Tsingtao beer points to an early port-era factory, water and a brick site that became public heritage. Haier points to the 1980s turn from a municipal refrigerator factory toward quality management and a wider appliance cluster. CRRC Qingdao Sifang points from the railway workshops of 1900 to today's passenger-train research and manufacture. Each connects work, technology, urban land and the image Qingdao projects."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "The direct answer",
      body: "Beer, appliances and trains did not build Qingdao alone. They are three legible layers of its industrial identity: an inherited factory adapted for public memory; a local manufacturer that made quality and management part of the city's reform-era story; and a railway works that moved from repair and assembly to modern rolling-stock engineering. Read the systems around the logos, not the logos as a complete city history.",
      tone: "decision"
    },
    {
      id: "three-lens-table",
      type: "table",
      caption: "What each brand lens can reveal—and what it cannot",
      columns: ["Lens", "City evidence", "Question to ask", "Limit"],
      rows: [
        ["Tsingtao Brewery", "The 1903 brewery site on Dengzhou Road, old equipment and a museum viewing window onto a contemporary production line", "How can a factory become both production space and curated heritage?", "One brewery cannot represent all Qingdao food culture or the whole colonial period"],
        ["Haier", "A Qingdao refrigerator factory that became the base of a diversified appliance group after 1984", "How did quality, management and supplier networks change the meaning of local manufacturing?", "The company's own timeline is corporate memory, not an independent verdict on every management claim"],
        ["CRRC Qingdao Sifang", "A railway-workshop lineage beginning with the Jiaozhou–Jinan railway in 1900 and a present rolling-stock R&D and manufacturing system", "How can a repair workshop become a train-engineering base?", "Even an operator-confirmed public exhibition would not make a working factory open to casual visitors"],
        ["Urban land", "Old industrial districts, relocated production and reused brick structures", "What stayed, what moved, and what was given a new public function?", "A preserved facade does not prove an entire historic production system survives"],
        ["Skills", "Brewing, appliance engineering, testing, systems integration and workshop knowledge", "Which capabilities are carried by people and institutions rather than a product label?", "Awards and company rankings do not measure everyday working conditions or the whole local economy"],
        ["City image", "Beer souvenirs, appliance narratives and high-speed-train displays that make industry visible to non-specialists", "Who selects the story a visitor sees?", "Brand visibility is not the same as economic share, social consent or historical completeness"]
      ]
    },
    {
      id: "city-sequence-heading",
      type: "heading",
      level: 2,
      text: "Follow the shift from imported systems to locally rooted capability"
    },
    {
      id: "city-sequence",
      type: "list",
      ordered: true,
      items: [
        "Start with infrastructure. The early brewery and Sifang railway works grew within a port-and-rail city being remade at the start of the twentieth century. Buildings, wells, tracks, workshops, capital and labour had to be assembled in one place.",
        "At Dengzhou Road, separate the building from the later brand story. The official museum occupies the brewery's 1903 industrial complex and presents old motors, kettles and archival material beside a view of contemporary production. That juxtaposition is useful evidence of adaptation, but the interpretation is produced by the brewery itself.",
        "Notice how a commodity altered the city around it. Environmental historian Shen Hou shows that early beer production was tied to groundwater, industrial water use and claims about Qingdao's natural qualities. The familiar link between beer and the city therefore joins ecology, marketing and urbanization—not taste alone.",
        "Move to the appliance period. Haier's official history describes the decisive phase beginning in 1984 at the Qingdao Refrigerator General Factory and the 1991 formation of Haier Group after combining other local appliance factories. The safe inference is a shift in organization, quality strategy and scale, not that one celebrated management anecdote explains all of Qingdao's industrial change.",
        "Look beyond one headquarters. Research on Qingdao's electronics cluster finds relationships among large firms, suppliers, public institutions and partners outside the region. That is why an appliance brand can mark a city even when research, components, sales and ownership networks extend far beyond municipal boundaries.",
        "End with trains. CRRC's history dates Sifang Locomotive Works to October 1900, initially focused on repairing and assembling locomotives and rolling stock. Its current company profile describes research, testing and manufacture across high-speed, intercity and urban rail platforms. The meaningful continuity is a place-based accumulation of railway skills; the corporate entities, sites and technologies have changed."
      ]
    },
    {
      id: "visible-evidence-heading",
      type: "heading",
      level: 2,
      text: "What a visitor can actually observe"
    },
    {
      id: "visible-evidence",
      type: "table",
      caption: "Turn a brand visit into a city-reading exercise",
      columns: ["At the site", "Observe", "Ask", "Record cautiously"],
      rows: [
        ["Tsingtao Beer Museum", "Brick structure, retained machinery, archives, the boundary between exhibit and production line", "Which objects worked here, which were moved here, and which are reconstructions?", "Record the object label and gallery context; do not call every display original to 1903"],
        ["A Haier public exhibition or museum", "How domestic life is staged through successive appliances and future-home displays", "Is this a history of household technology, a company history, or a product showroom?", "Record the venue's framing; do not treat a branded exhibit as neutral market comparison"],
        ["An operator-confirmed CRRC culture or technology display", "Workshop lineage, train cross-sections, testing language and site history", "Does the exhibit distinguish the old Sifang works from current production bases?", "Do not photograph restricted operations or imply factory access"],
        ["Between sites", "Distances among old city, former industrial districts and newer coastal or suburban development", "What had to relocate as the city expanded?", "A travel route is not proof of a direct corporate relationship"]
      ]
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Choose one of two honest ways to use the story"
    },
    {
      id: "scenarios",
      type: "comparison",
      title: "Two realistic observation paths",
      columns: [
        {
          heading: "One half-day: use one deep anchor",
          body: "After confirming its live notice, use the Tsingtao Beer Museum as the best-documented public industrial anchor. Spend time separating historic building, archived object, reconstructed scene and the production area visible through the museum, noting whether it is operating. Later, identify Haier and Sifang as different industrial periods through city signage or a general museum rather than crossing Qingdao for two uncertain corporate visits."
        },
        {
          heading: "One full day: compare three curated narratives",
          body: "Confirm a brewery ticket, a currently public Haier venue and the operator's current entry channel for the CRRC Sifang culture-and-technology exhibition. Compare how each venue explains quality, workers, technology, international links and the city. Treat travel time between dispersed sites as part of the lesson: modern industrial Qingdao is not one compact heritage quarter."
        }
      ]
    },
    {
      id: "claim-boundaries-heading",
      type: "heading",
      level: 2,
      text: "Keep the city story larger than the brands"
    },
    {
      id: "claim-boundaries",
      type: "list",
      items: [
        "Do not say these are Qingdao's only defining industries. Port activity, textiles, chemicals, electronics, marine science and many smaller firms also shaped the city.",
        "Do not convert a corporate milestone into a citywide cause. A company's growth may reflect municipal policy, national reform, suppliers, workers, technology partners and markets at the same time.",
        "Do not equate an old name with an unchanged organization. Ownership, legal entities, production sites and product systems changed across all three histories.",
        "Do not use one preserved workshop to romanticize industrial labour. Public displays select objects and narratives; they rarely show every disruption, injury, conflict or routine task.",
        "Do not assume a brand museum is an advertisement with no evidence value. Its buildings, machines and archives can be primary evidence when their provenance is clear—while the interpretation still needs independent cross-checking.",
        "Do not turn current exhibition access into a permanent promise. Hours, reservation channels, language support, photography rules and production visibility can change."
      ]
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "If a venue is closed or the story feels too promotional"
    },
    {
      id: "recovery",
      type: "list",
      items: [
        "If the brewery museum is unavailable, use the exterior only from public space and do not infer what is running inside. Pair it with the official online introduction and an independent history article.",
        "If a Haier visit requires group booking, switch to a venue clearly advertised as public or skip it. A telephone number on an official tour page is a confirmation route, not a walk-in guarantee.",
        "If the CRRC exhibition has no first-party booking notice, do not rely on a reseller listing. Read the company's history and current profile, then observe trains in ordinary passenger service without claiming to identify their factory by appearance alone.",
        "If every gallery repeats superlatives, collect verifiable anchors instead: date, address, named object, manufacturing stage and source. Leave rankings and slogans out of your conclusion.",
        "If the three sites consume too much travel time, keep one physical anchor and compare the other two through sourced timelines. The task is to understand the city, not complete a brand checklist.",
        "On the day, check the venue's official notice, reservation method, accepted identity document, accessibility and photography rules. Ask staff when an exhibit label and live operation seem to conflict."
      ]
    },
    {
      id: "evidence-boundary",
      type: "callout",
      title: "Evidence and date boundary",
      body: "Company and venue pages establish their histories, current profiles and visitor propositions. Qingdao government material establishes the city's industrial-heritage framing. Independent historical and economic-geography research tests broader claims about water, urbanization and industrial networks. None proves that three brands wholly explain Qingdao. Public-visit status was reviewed on 13 August 2026 and must be checked again before travel.",
      tone: "warning"
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning Qingdao and industrial travel",
      items: [
        {"label": "Browse all Homeground China guides", "href": "/guides/", "description": "Return to the parent guide collection."},
        {"label": "Build a Shandong Peninsula coastal rail arc", "href": "/guides/shandong-peninsula-coastal-city-rail-arc/", "description": "Decide how Qingdao fits with Yantai and Weihai."},
        {"label": "Take a Chinese high-speed train for the first time", "href": "/guides/china-high-speed-train-first-time-guide/", "description": "Turn the train-manufacturing story into a prepared passenger journey."},
        {"label": "Plan a regional food route", "href": "/guides/china-regional-food-route/", "description": "Place beer and other local tastes inside a resilient regional plan."}
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and independent sources checked on 13 August 2026",
      items: [
        {"label": "Museum introduction and 1903 industrial site", "url": "https://www.tsingtaomuseum.com/category/1773519016732667906", "publisher": "Tsingtao Beer Museum", "reviewedAt": "2026-08-13"},
        {"label": "Industrial heritage reuse at Tsingtao Beer Museum", "url": "https://www.qingdao.gov.cn/ywdt/zwzl/cjzl2026/dxal2026/202607/t20260703_10650841.shtml", "publisher": "Qingdao Municipal People's Government", "reviewedAt": "2026-08-13"},
        {"label": "Haier development history", "url": "https://www.haier.com/about-haier/history/", "publisher": "Haier Group", "reviewedAt": "2026-08-13"},
        {"label": "Haier public learning and museum venues", "url": "https://www.haier.com/press-events/interview/", "publisher": "Haier Group", "reviewedAt": "2026-08-13"},
        {"label": "CRRC Qingdao Sifang company profile", "url": "https://www.crrcgc.cc/sfgf/36_2134/36_2144/index.html", "publisher": "CRRC Qingdao Sifang", "reviewedAt": "2026-08-13"},
        {"label": "CRRC Qingdao Sifang history", "url": "https://www.crrcgc.cc/sfgfen/53_3341/53_4020/index.html", "publisher": "CRRC Qingdao Sifang", "reviewedAt": "2026-08-13"},
        {"label": "Nature's Tonic: Beer, Ecology, and Urbanization in a Chinese City, 1900–50", "url": "https://www.journals.uchicago.edu/doi/full/10.1093/envhis/emy136", "publisher": "Environmental History", "reviewedAt": "2026-08-13"},
        {"label": "Formation of Foreign Direct Investment Clustering: The Case of Qingdao", "url": "https://www.tandfonline.com/doi/full/10.1080/00343400601145186", "publisher": "Regional Studies", "reviewedAt": "2026-08-13"},
        {"label": "R&D Networks in Qingdao's Consumer Electronics Industry", "url": "https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART001679817", "publisher": "Journal of the Economic Geographical Society of Korea", "reviewedAt": "2026-08-13"},
        {"label": "Hero photograph: Tsingtao Brewery Museum buildings by Lennartbj, 15 November 2017; cropped and converted to WebP", "url": "https://commons.wikimedia.org/wiki/File:Tsingtao_Brewery_in_Qingdao.jpg", "publisher": "Wikimedia Commons / Lennartbj", "reviewedAt": "2026-08-13"},
        {"label": "Hero derivative licence: CC BY-SA 4.0", "url": "https://creativecommons.org/licenses/by-sa/4.0/", "publisher": "Creative Commons", "reviewedAt": "2026-08-13"}
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
