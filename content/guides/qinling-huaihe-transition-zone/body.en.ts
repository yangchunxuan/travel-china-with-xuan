import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "The Qinling–Huaihe line is a useful shorthand for China's north–south geographic transition, but there is no painted border where every climate, forest, field and river changes at once. Travel across it as a transect: collect several indicators over distance, compare the mountain west with the lowland east, and expect a belt of overlap rather than one decisive crossing point.",
    },
    {
      id: "direct-answer",
      type: "callout",
      tone: "decision",
      title: "What a traveller should look for",
      body: "Watch how terrain, winter conditions, moisture, vegetation, water management and cultivated land change together. One riverbank, one crop or one day's weather is weak evidence. A repeated pattern across a north–south journey is stronger—and even then it describes a transition, not a wall separating two uniform Chinas.",
    },
    {
      id: "scope-heading",
      type: "heading",
      level: 2,
      text: "The familiar line is better understood as a wide zone",
    },
    {
      id: "scope",
      type: "paragraph",
      text: "Textbook summaries often place the January 0°C isotherm, roughly 800 millimetres of annual precipitation, the warm-temperate/subtropical divide and humid/semi-humid transition near Qinling–Huaihe. These are long-term statistical or ecological indicators, not survey marks, and they do not lie exactly on top of one another. Recent Chinese Academy of Sciences work models a north–south transition zone about 1,750 kilometres long and, on average, 400 kilometres wide. Those dimensions describe one research framework, not a legal boundary or a promise that every journey will reveal the whole belt.",
    },
    {
      id: "west-east-heading",
      type: "heading",
      level: 2,
      text: "The western and eastern sections do not look alike",
    },
    {
      id: "west-east",
      type: "table",
      caption: "Two landscape mechanisms inside one geographic shorthand",
      columns: ["Section", "Physical form", "What may be visible", "Why the crossing is hard to pin"],
      rows: [
        ["Qinling and Qinling–Daba mountain west", "High, complex east–west mountain systems, ridges, basins and steep elevation changes", "Slope exposure, elevation belts, watershed direction, forest composition and a sharper change between the Guanzhong and Han River sides", "Tunnels hide the ridge; altitude can reproduce “northern” vegetation on a southern slope; researchers debate which ridge or slope best represents a boundary"],
        ["Huai and Jianghuai lowland east", "River, plains, low hills, canals, lakes and heavily managed farmland", "Gradual differences in moisture, drainage, winter field use, crop mosaics and water networks", "The river is easy to map, but many ecological and climatic transitions spread across the surrounding plains rather than switching at the bank"],
      ],
    },
    {
      id: "not-wall",
      type: "callout",
      tone: "warning",
      title: "Do not hunt for a single “north/south” photograph",
      body: "A map line is a teaching device. Temperature, precipitation, species ranges, soils, cropping systems and administrative practices each have their own scale and history. This page owns observable physical and agricultural landscape change; it does not use the separate central-heating policy boundary as proof of nature.",
    },
    {
      id: "lenses-heading",
      type: "heading",
      level: 2,
      text: "Use six lenses, not one stereotype",
    },
    {
      id: "lenses",
      type: "table",
      caption: "Evidence a traveller can collect without pretending to conduct a scientific survey",
      columns: ["Lens", "Broad tendency across the zone", "Useful observation", "Main confounder"],
      rows: [
        ["Winter climate", "Winters generally become milder southward, but cold-air outbreaks still cross the zone", "Leaf state, frost persistence and local long-term climate displays", "One anomalously warm or cold day"],
        ["Moisture", "Humid influence generally strengthens southward; seasonality and year-to-year rainfall remain important", "Drainage, standing water, irrigation works and moisture-loving vegetation", "Recent rain, reservoir operations or urban landscaping"],
        ["Vegetation", "Temperate and subtropical plant elements interlace; evergreen presence tends to increase southward", "Repeated roadside or trail observations at comparable elevations", "Ornamental planting, plantations and vertical zonation"],
        ["Agricultural landscape", "Dry-field and wheat-associated landscapes are more common northward; paddy and rice-associated landscapes become more common southward", "Field form, irrigation, crop stage and local farm interpretation", "Modern irrigation, crop switching, greenhouses and market demand"],
        ["Water", "The Qinling section is a major watershed; the eastern section is expressed through river-and-plain systems", "Flow direction, valleys, canals, levees, ponds and floodplain management", "Engineered diversions and seasonal water levels"],
        ["Terrain", "The west can change abruptly with altitude; the east is lower and more gradual", "Slope, relief, tunnel sequence and the time spent on plains", "A high-speed corridor may hide or compress the view"],
      ],
    },
    {
      id: "ecology-heading",
      type: "heading",
      level: 2,
      text: "Ecology overlaps before it separates",
    },
    {
      id: "ecology",
      type: "paragraph",
      text: "Field research in the eastern Qinling–Daba Mountains finds mixtures of northern and southern plant components and ongoing debate over whether the main ridge, north foot, south slope or even the Daba Mountains best represents a climatic boundary. A separate study using 144 weather stations found that climate trends since 1961 differed among the eastern, central and western parts of the wider demarcation zone. For a visitor, mixed forest or a change that appears in one section but not another is not a failed boundary; it is evidence that this is a transition zone.",
    },
    {
      id: "agriculture-heading",
      type: "heading",
      level: 2,
      text: "Read fields as land use, not as a food itinerary",
    },
    {
      id: "agriculture",
      type: "paragraph",
      text: "The familiar wheat-north and rice-south contrast is a broad historical landscape tendency, not a rule for every field or meal. Irrigation can support rice north of a simplified line; dry fields can occur to the south; orchards, rapeseed, maize, tea, vegetables and urban expansion complicate the view. Record field shape, water infrastructure, crop stage and what a local agricultural source says. Do not infer regional identity from one restaurant dish or build a restaurant route from this page.",
    },
    {
      id: "transect-heading",
      type: "heading",
      level: 2,
      text: "Build a traveller's transect before departure",
    },
    {
      id: "transect",
      type: "list",
      ordered: true,
      items: [
        "Choose a genuinely north–south segment; an east–west journey parallel to the zone may reveal longitude more than the divide.",
        "Mark three observation windows: north of the zone, inside the broad transition and south of it. Do not add a fake exact crossing time.",
        "Keep altitude comparable where possible. A mountain summit and low plain cannot isolate latitude.",
        "Record at least three lenses—such as vegetation, cultivated land and water—at each window.",
        "Use local museum, park, meteorological or agricultural interpretation to test what you think you saw.",
        "Write the conclusion as a pattern with exceptions, not “north ended here.”",
      ],
    },
    {
      id: "season-heading",
      type: "heading",
      level: 2,
      text: "Season changes what is legible",
    },
    {
      id: "season",
      type: "comparison",
      columns: [
        {
          heading: "Leaf-on or wet-season travel",
          items: [
            "Vegetation is easier to see but evergreen/deciduous differences may be less obvious at speed.",
            "Recent rain can make both sides look unusually lush.",
            "Agricultural water and crop stages are visible, but flood or heat conditions may constrain stops.",
          ],
        },
        {
          heading: "Leaf-off or colder-season travel",
          items: [
            "Leaf persistence, frost and winter field use may become more legible.",
            "One cold-air event can temporarily flatten the north–south contrast.",
            "Bare fields reveal form and drainage but not the full growing-season crop mosaic.",
          ],
        },
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two crossing scenarios",
    },
    {
      id: "scenarios",
      type: "comparison",
      columns: [
        {
          heading: "Scenario 1: Xi'an toward Hanzhong through Qinling",
          items: [
            "The traveller expects one panoramic ridge crossing, but long tunnels interrupt the view.",
            "They compare the Guanzhong approach, mountain windows and Han River side instead of timestamping a border inside a tunnel.",
            "If visibility is poor, a named nature museum or park interpretation becomes the evidence anchor; no unsafe roadside stop is added.",
          ],
        },
        {
          heading: "Scenario 2: north–south across the Huai plain",
          items: [
            "The river crossing itself looks less dramatic than expected.",
            "The traveller records drainage, canals, field water, crop mosaics and settlement landscape over several windows on both sides.",
            "The conclusion is gradual lowland transition. The lack of a cinematic riverbank contrast is not evidence that the geographic concept is false.",
          ],
        },
      ],
    },
    {
      id: "conditions-heading",
      type: "heading",
      level: 2,
      text: "Conditions that can change your conclusion",
    },
    {
      id: "conditions",
      type: "list",
      items: [
        "A route shifted east or west may cross a different terrain mechanism and climate history.",
        "A change of elevation can outweigh a modest change of latitude.",
        "Season, recent weather and climate trends can move or mask the indicators being observed.",
        "Cities, plantations, reservoirs and irrigation can overwrite surrounding natural or agricultural signals.",
        "Fast trains and tunnels can reduce a broad landscape transition to a few unreliable glimpses.",
      ],
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "Recover when the landscape refuses to perform",
    },
    {
      id: "failure",
      type: "table",
      caption: "Common field-reading failures and defensible recovery",
      columns: ["Failure", "Bad response", "Recovery"],
      rows: [
        ["Tunnel or night hides the mountain section", "Claim the exact divide passed at an invented minute", "Use pre- and post-mountain observations plus an institutional map or section"],
        ["Urban development hides fields and vegetation", "Treat ornamental trees as regional ecology", "Move the evidence window to a documented park, rural edge or museum display"],
        ["One crop appears on the “wrong” side", "Declare the textbook contrast false", "Ask about irrigation, variety, rotation and local land use; keep the exception"],
        ["Weather is similar on both sides", "Use a single day as climate evidence", "Separate weather from long-term climate and compare durable landscape indicators"],
        ["A map shows different lines", "Choose the neatest one as final", "Name the indicator each line represents and state that they do not fully coincide"],
      ],
    },
    {
      id: "final-check",
      type: "callout",
      tone: "neutral",
      title: "Final verification",
      body: "Before travel, check current weather, park or museum access, safe observation points and any seasonal agricultural restrictions. Dynamic conditions were reviewed on 13 August 2026, but no live transport view, crop stage or access promise is embedded here. After the trip, keep exact locations and dates with every photograph so a landscape claim can be audited.",
    },
    {
      id: "human-help",
      type: "callout",
      tone: "decision",
      title: "Want a human to shape a readable crossing?",
      body: "Leave your travel dates, party size and rough budget. A Homeground planner can help choose a practical north–south segment and observation stops without turning the journey into a geography checklist.",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning the journey",
      items: [
        { "label": "Explore China through place and context", "href": "/explore/", "description": "Return to the published culture and experience collection." },
        { "label": "Check whether the itinerary is too rushed", "href": "/guides/is-your-china-itinerary-too-rushed/", "description": "A useful transect needs observation windows, not another overloaded transfer day." },
        { "label": "Decide whether you need a tour guide", "href": "/guides/do-you-need-a-tour-guide-in-china/", "description": "Compare independent observation with local geographic interpretation." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and academic sources",
      items: [
        { "label": "Geographic structure and extent of China's north–south transition zone", "url": "https://igsnrr.cas.cn/sourcedb/zw/lw/202504/t20250409_7591749.html", "publisher": "Institute of Geographic Sciences and Natural Resources Research, CAS", "reviewedAt": "2026-08-13" },
        { "label": "Loess on one side, Hanzhong basin on the other", "url": "https://www.cma.gov.cn/kppd/kppdqxsj/kppdtqqh/202111/t20211103_4159392.html", "publisher": "China Meteorological Administration", "reviewedAt": "2026-08-13" },
        { "label": "Shaanxi Qinling ecological-environment protection master plan", "url": "https://www.shaanxi.gov.cn/zfxxgk/zfgb/2020/d17q/202009/t20200921_1728563.html", "publisher": "People's Government of Shaanxi Province", "reviewedAt": "2026-08-13" },
        { "label": "Ten major scientific issues concerning China's north–south transitional zone", "url": "https://www.progressingeography.com/EN/abstract/article/1007-6301/42562", "publisher": "Progress in Geography", "reviewedAt": "2026-08-13" },
        { "label": "North–south vegetation transition in the eastern Qinling–Daba Mountains", "url": "https://www.geogsci.com/EN/abstract/article/1009-637X/49343", "publisher": "Journal of Geographical Sciences", "reviewedAt": "2026-08-13" },
        { "label": "Climate variation in the Qinling–Huaihe demarcation zone since 1961", "url": "https://www.sciencedirect.com/science/article/pii/S1470160X23014875", "publisher": "Ecological Indicators", "reviewedAt": "2026-08-13" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
