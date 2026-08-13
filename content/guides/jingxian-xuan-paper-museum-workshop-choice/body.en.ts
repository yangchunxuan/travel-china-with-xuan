import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Choose the museum if you want the whole process explained, a live production area if you want to watch skilled coordination, and a workshop if you mainly want to try one controlled step. Jingxian (泾县, Jīngxiàn) Xuan paper is not made in a visitor session from raw bark to finished sheet. Official descriptions divide the craft into more than one hundred operations, with raw-material preparation taking months. A short class may let you form a sheet from prepared pulp, print, make a rubbing or decorate; that is real participation in one step, not completion of the full traditional craft."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "The shortest useful answer",
      body: "For a first visit, pair the China Xuan Paper Museum with a confirmed visit to an active production area. Add a workshop only if the booking states the exact task, duration and whether you keep the result. If you have time for only one format, choose the museum for context, live production for movement and skill, or the workshop for participation.",
      tone: "decision"
    },
    {
      id: "process-place-matrix",
      type: "table",
      caption: "What each setting can honestly reveal",
      columns: ["Process stage", "Museum", "Live production", "Short workshop"],
      rows: [
        ["Blue sandalwood bark and Shatian rice straw", "Labels, samples and the Jingxian material definition", "Possibly stored or partly prepared material", "Usually pre-processed pulp; ask what arrived before class"],
        ["Weathering, soaking, steaming and repeated cleaning", "Timeline, tools and photographs", "Only selected active stages, depending on the production day", "Rarely suitable for visitors because these stages are long and labour-intensive"],
        ["Pounding and pulp preparation", "Mechanism and sequence", "Possible machinery or hand-work observation", "Often already completed before participants arrive"],
        ["Blending pulp for paper type", "Why fibre mix and sheet specification matter", "Workers may prepare a production batch", "Formula is normally fixed by the instructor"],
        ["Sheet forming with a bamboo screen", "Technique explained or reconstructed", "Watch the paired rhythm and even distribution of fibre", "The most plausible hands-on step, normally closely guided"],
        ["Pressing and drying", "Tools and quality failures", "Watch wet sheets separated, brushed and dried if that station is working", "Your sheet may be dried later, accelerated or replaced with a prepared sample"],
        ["Inspection, cutting and finished grades", "Compare sizes, surfaces and uses", "Possible finishing line", "Often becomes rubbing, printing or decoration rather than paper manufacture"]
      ]
    },
    {
      id: "read-the-process",
      type: "heading",
      level: 2,
      text: "Read the process before choosing the ticket"
    },
    {
      id: "process-objects",
      type: "list",
      ordered: true,
      items: [
        "Start with the two principal fibres: bark from Pteroceltis tatarinowii (青檀) and Shatian rice straw (沙田稻草). The official Jingxian definition also ties Xuan paper to local water, place and traditional production, so ‘Chinese handmade paper’ is not automatically Xuan paper.",
        "Treat ‘more than one hundred operations’ as a craft sequence, not a matching number of visitor stations. Official sources use different counting conventions—some say 108 and another says more than 140—while the national ICH presentation groups the work into raw-material processing, pulping, sheet forming, drying and cutting. Do not turn one count into a universal standard for every producer or paper type.",
        "Look for time stored in the material. Bark and straw are repeatedly cooked, washed, weathered and bleached; official local material says the complete production cycle can reach about two years.",
        "At the vat, watch distribution rather than speed. A production sheet requires the screen, slurry, water movement, dimensions and two workers’ coordination to agree.",
        "At drying, notice how a fragile wet sheet is separated and brushed flat. The national ICH account describes drying as a skilled sequence with risks of tearing, wrinkling or losing fibre.",
        "At finishing, compare the sheet made for a production order with the souvenir you can carry away. Similar colour does not prove the same fibre ratio, size, treatment or grade."
      ]
    },
    {
      id: "authenticity-boundary",
      type: "heading",
      level: 2,
      text: "Use precise language about authenticity"
    },
    {
      id: "claim-check",
      type: "table",
      caption: "Claims a visitor can and cannot make",
      columns: ["What happened", "Safe conclusion", "Do not claim"],
      rows: [
        ["You saw labelled historic tools", "The museum interprets tools used in the craft", "Those exact objects made the paper sold today"],
        ["You watched workers at an active vat", "You observed a live sheet-forming stage", "You saw every traditional operation"],
        ["You scooped one sheet from prepared pulp", "You participated in guided sheet forming", "You made Xuan paper from raw materials"],
        ["You printed or rubbed a design on paper", "You completed a paper-based cultural activity", "You practised paper manufacture"],
        ["The venue uses the words ‘heritage experience’", "The activity is presented in a heritage setting", "Every component or teaching method is unchanged from the past"],
        ["A shop labels a product 宣纸", "That is the seller’s product claim", "The visit alone verifies geographic origin, recipe or grade"]
      ]
    },
    {
      id: "choose-by-traveller",
      type: "heading",
      level: 2,
      text: "Two realistic traveller choices"
    },
    {
      id: "traveller-scenarios",
      type: "comparison",
      title: "Match the format to the day",
      columns: [
        {
          heading: "One afternoon, first exposure",
          body: "Begin in the museum, then use the production area to locate one or two stages you just learned. Skip a generic craft add-on unless the exact task fits your remaining time. This sequence gives context before spectacle."
        },
        {
          heading: "Craft-focused traveller or family",
          body: "Confirm a live production window and reserve a workshop with a named task. Adults can watch fibre distribution and drying quality while children participate in one safe step. Plan for wet work, waiting and a result that may need later collection."
        }
      ]
    },
    {
      id: "field-recovery",
      type: "heading",
      level: 2,
      text: "If live production or the workshop is not what you expected"
    },
    {
      id: "recovery-list",
      type: "list",
      items: [
        "If production is paused, ask which station is active later that day; do not assume the visitor route and factory rhythm are identical.",
        "If the class description only says 造纸体验, ask: 我会亲手做哪一步？—‘Which step will I do myself?’",
        "If the answer is 拓印 or 印刷, treat it as making a rubbing or printing, not sheet forming, and decide whether that still suits you.",
        "If the sheet cannot be taken immediately, ask whether it will be dried, posted, substituted or collected later before paying.",
        "If mobility, heat or humidity is a concern, use the museum as the core visit and ask about stairs, wet floors and standing time in the production area.",
        "Before travel, recheck the museum’s current notice page, same-day operating status, production-area access and reservation channel. Temporary closures and production changes are dynamic."
      ]
    },
    {
      id: "evidence-note",
      type: "callout",
      title: "Evidence boundary",
      body: "UNESCO and Chinese ICH records establish the craft, materials and transmission context. Local government and venue pages establish the current visitor formats. They do not guarantee that every production stage runs daily, that every class uses the same pulp, or that a visitor product has a certified commercial grade. Current visitor information was checked on 13 August 2026.",
      tone: "warning"
    },
    {
      id: "links",
      type: "internal-links",
      title: "Continue planning culture and craft visits",
      items: [
        {"label": "Browse Homeground’s China guides", "href": "/guides/", "description": "Return to the full guide collection."},
        {"label": "Choose a Zhoucheng tie-dye workshop", "href": "/guides/zhoucheng-bai-tie-dye-workshop-choice/", "description": "Apply the same process-first test to another living craft."},
        {"label": "Woodblock or movable type?", "href": "/guides/woodblock-and-movable-type-printing-decisions/", "description": "Separate the printed result from the process used to produce it."},
        {"label": "How to pay in China as a tourist", "href": "/guides/how-to-pay-in-china-as-a-tourist/", "description": "Prepare payment and a fallback before reserving a small-group activity."}
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources checked on 13 August 2026",
      items: [
        {"label": "Traditional handicrafts of making Xuan paper", "url": "https://ich.unesco.org/en/RL/traditional-handicrafts-of-making-xuan-paper-00201", "publisher": "UNESCO Intangible Cultural Heritage", "reviewedAt": "2026-08-13"},
        {"label": "Xuan paper traditional craft project overview", "url": "https://www.ihchina.cn/page_special.html", "publisher": "China Intangible Cultural Heritage Network", "reviewedAt": "2026-08-13"},
        {"label": "Xuan paper craft process", "url": "https://www.ihchina.cn/technology.html", "publisher": "China Intangible Cultural Heritage Network", "reviewedAt": "2026-08-13"},
        {"label": "Xuan Paper Culture Park", "url": "https://www.ahjx.gov.cn/About/show/33534.html", "publisher": "Jing County People’s Government", "reviewedAt": "2026-08-13"},
        {"label": "Xuan paper cultural ecology protection plan", "url": "https://www.xuancheng.gov.cn/OpennessContent/show/3017793.html", "publisher": "Xuancheng People’s Government", "reviewedAt": "2026-08-13"},
        {"label": "2026 venue notices and visitor information", "url": "https://bwg.hongxingxuanpaper.com.cn/", "publisher": "China Xuan Paper Museum", "reviewedAt": "2026-08-13"},
        { label: "Hero photograph: Jingxian Railway Station, N509FZ (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:Jingxian_Railway_Station_(20150807144034).JPG", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
