import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "带父母游苏州，别把拙政园、苏州博物馆、虎丘和去杭州硬排在同一天。Homeground 已发布的上海—苏州—杭州 6 日线把它们拆开：D3 抵达苏州后，在盘门和虎丘中选一处；D4 走拙政园、苏博（视预约情况）和平江路，再去杭州。中间在苏州住一晚，比把景点排满更能留出体力。" },
    { id: "answer", type: "callout", tone: "decision", title: "先决定需要哪种休息", body: "如果父母能接受上午游览，中午坐下来吃饭、下午少走一点，可以按已发布的转城日安排节奏。若退房后必须回酒店午休、要改 D4 所列景点或转城安排，或 D3 想把盘门和虎丘都走完，就先请旅行顾问修改书面行程并重新报价；原包含项目和价格不能直接沿用。" },
    { id: "days-heading", type: "heading", level: 2, text: "用苏州这一晚把体力分开" },
    { id: "days", type: "table", caption: "以下是已发布的 6 日线路结构，不承诺固定游览时刻", columns: ["日期", "标准行程", "该留出的余量"], rows: [
      ["D3：上海→苏州", "上海半日游后带行李去苏州；盘门或虎丘二选一，再走山塘街，住苏州。", "到苏州后看父母体力，再决定山塘街走多久；不要把盘门和虎丘都算进这一天。"],
      ["D4：苏州→杭州", "退房后，拙政园、苏博（视预约情况）和平江路按可行的顺序走，再去杭州入住。", "留一段坐着吃午饭的时间，平江路不必走成另一段长途步行。午餐不含在团费里。"],
    ] },
    { id: "booking-heading", type: "heading", level: 2, text: "先看两个独立预约，再排先后" },
    { id: "booking", type: "paragraph", text: "拙政园和苏博要分别安排。苏州市 2026 年 6 月 19 日公告说明，拙政园实行实名分时预约购票，须提前 1–7 天网上预约；苏博 2026 年 9 月 16 日公告说明，本馆实行分时全预约，可提前 7 天（含预约操作当天）预约。苏博公告里的延时开放只适用于列明的中秋、国庆日期，不是常年开馆时间。确定实际日期的预约和开馆通知后，再决定先去园林还是博物馆；发出询价不等于预约成功。" },
    { id: "transfer-heading", type: "heading", level: 2, text: "把去杭州的那一段也算进当天" },
    { id: "transfer", type: "list", ordered: true, items: [
      "苏州酒店退房前，确认行李怎么随行，以及书面确认的跨城方案是高铁加两端接送，还是门到门用车。6 日线会按同行人数和行李确定方案，不能默认全程同一辆车等候。",
      "从希望几点到杭州酒店倒推。如果乘高铁，按出行日到 12306 核对车次和完整站名，还要算上去车站、安检与上车的时间，不能只看列车运行时长。",
      "如果父母需要午饭后回酒店休息，就在付款前提出移动或删减景点、调整转城方式，或多住一晚苏州。景点、交通、住宿晚数和总价都要写进新的确认单。"
    ] },
    { id: "faq", type: "faq", title: "确认行程前常问的问题", items: [
      { question: "拙政园和苏博之后还能去虎丘吗？", answer: "这不是已发布的 6 日线顺序。D3 是盘门或虎丘二选一；D4 已安排拙政园、视预约情况参观苏博、平江路及前往杭州。如果想在 D4 加虎丘，先请旅行顾问改行程并书面报价。" },
      { question: "苏博约不到合适时段怎么办？", answer: "不要按尚未确认的入馆时间安排当天。苏博本馆和拙政园分开预约；请旅行顾问把调整后的顺序或包含项目写进确认单。" },
      { question: "转城日能回酒店睡午觉吗？", answer: "标准 D4 从苏州酒店退房，晚上入住杭州。坐下来吃午饭较容易留出时间；退房后再回房午休则需要另议酒店与游览安排，并重新书面确认。" }
    ] },
    { id: "links", type: "internal-links", title: "核对完整线路与入园规则", items: [
      { label: "上海·苏州·杭州 6 天 5 晚私家团", href: "/zh/tours/shanghai-suzhou-hangzhou-6-day-private-tour/", description: "看清 D3 二选一、D4 安排、跨城交通与书面包含项目。" },
      { label: "拙政园门票与入园", href: "/zh/guides/humble-administrators-garden-tickets-entry/", description: "单独核对拙政园的预约和证件细节。" },
      { label: "上海到苏州一日游", href: "/zh/guides/shanghai-to-suzhou-day-trip/", description: "如果当天要回上海，按另一种行程决策来安排。" }
    ] },
    { id: "sources", type: "sources", title: "按发布日期核对的官方资料", items: [
      { label: "苏博本馆预约与节假日开馆公告（2026 年 9 月 16 日）", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202609/2d1a50ec4496485d9f5c332de585dfdc.shtml", publisher: "苏州博物馆／苏州市人民政府", reviewedAt: "2026-09-26" },
      { label: "拙政园预约期及截至 2026 年 10 月 7 日的临时提前开园", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202606/face4650ec2245ce818aecc53eb4aaaa.shtml", publisher: "苏州市人民政府", reviewedAt: "2026-09-26" },
      { label: "苏州站前往老城景点的交通说明（2026 年 4 月 2 日）", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202604/568a4eac0636443c968cfc195b9a3e29.shtml", publisher: "苏州市人民政府", reviewedAt: "2026-09-26" },
      { label: "按出行日查询列车和车站", url: "https://kyfw.12306.cn/otn/view/queryPublicIndex.html", publisher: "中国铁路 12306", reviewedAt: "2026-09-26" }
    ] }
  ]
} satisfies StructuredPageBody;

export default body;
