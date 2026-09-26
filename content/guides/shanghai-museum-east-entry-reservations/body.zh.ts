import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "上海博物馆东馆目前对散客试行普通入馆免费免预约，带有效身份证件原件，从 B1 层东门安检、刷证入馆。想去古代文明探索宫或数字馆，则要在上博东馆预约页面选择「专项预约」。" },
    { id: "booking-heading", type: "heading", level: 2, text: "先分清普通入馆和专项预约" },
    { id: "booking-rules", type: "table", caption: "2026 年 9 月 26 日核对的上博官方规定", columns: ["事项", "目前规定", "怎么做"], rows: [
      ["东馆普通入馆", "散客免费免预约，没有普通入馆的放票时间。", "带有效身份证件原件，到 B1 层东门。"],
      ["两个体验区域", "古代文明探索宫、数字馆需提前专项预约。", "到上博东馆预约页面选「专项预约」。"],
      ["境外护照", "上海市英文游客指南把护照列为有效证件，但上博现行东馆页没有写明境外护照的刷证流程。", "以护照入馆前先向馆方确认具体步骤：(021)60226699。"],
      ["收费特展", "如举办收费特展，可能需要另行购票。", "看具体展览公告；不要把特展票当成普通入馆门票。"],
    ] },
    { id: "mistakes", type: "callout", title: "最容易弄混的三件事", body: "「免预约」只说东馆普通入馆，古代文明探索宫和数字馆仍要另约。东馆常规闭馆日是周二，不是周一。人民广场馆目前的收费特展规定也不能套到东馆。", tone: "warning" },
    { id: "options-heading", type: "heading", level: 2, text: "东馆和人民广场馆，先选哪个？" },
    { id: "options", type: "comparison", columns: [
      { heading: "上海博物馆东馆", body: "适合想看东馆常规展览的人。普通入馆免费免预约；如果要进两个专项体验区域，提前另约。" },
      { heading: "上海博物馆人民广场馆", body: "馆方公告写明，2026 年 7 月 9 日至 2027 年 11 月 14 日，这里仅举办美洲古代文明特展，普通观众须预约购票。票价、免票资格和当日规则看该馆最新公告，东馆免预约政策不适用。" },
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "东馆到访顺序" },
    { id: "route-list", type: "list", items: [
      "先在上博官方页面确认目的地是东馆，再决定是否需要预约古代文明探索宫或数字馆。",
      "到馆后按现场指示前往 B1 层东门；留出安检和刷证时间。",
      "进馆后看当日导览图，先选一个想看的常设展或当前展览，再决定是否加第二处；展厅开放情况以现场为准。",
      "如果已约专项区域，按确认信息上的时间安排，不要把普通入馆等同于专项区域的预约凭证。",
    ] },
    { id: "hours-heading", type: "heading", level: 2, text: "开放时间与闭馆日" },
    { id: "hours", type: "paragraph", text: "东馆常规开放时间为 10:00–18:00，17:00 停止入场；周二闭馆，国定节假日除外。这是截至 2026 年 9 月 26 日的官方信息；节假日前再看上博当期通知。" },
    { id: "practical-heading", type: "heading", level: 2, text: "出门前再确认" },
    { id: "practical", type: "list", items: [
      "带身份证件原件；官方要求的不是证件照片。",
      "上海市游客指南明确提及护照，但仍要向馆方确认当前刷证手续。",
      "免预约不等于免排队；客流达到限额时，馆方会限流。",
      "如果目标是收费特展或两个专项区域，分别核对自己的购票或预约状态。",
    ] },
    { id: "final-check", type: "callout", title: "前一天核对四件事", body: "目的地确实是东馆、当天按最新公告开放、身份证件原件已备好、专项区域预约已确认。持境外护照的话，还要提前问清馆方的证件入馆流程。", tone: "decision" },
    { id: "faq", type: "faq", title: "上海博物馆东馆常见问题", items: [
      { question: "上海博物馆东馆需要预约吗？", answer: "截至 2026 年 9 月，上海博物馆东馆的散客普通入馆免费免预约；但古代文明探索宫和数字馆这两个区域需要另做专项预约。" },
      { question: "上海博物馆东馆从哪个门进？", answer: "馆方要求带有效身份证件原件，从东馆 B1 层东门经过安检后刷证入馆；到现场后按当日指示走。" },
      { question: "持护照能进上海博物馆东馆吗？", answer: "上海市英文游客指南把护照列为东馆可用的有效证件。上博现行东馆页只写「有效身份证件原件」，未解释境外护照如何刷证；可拨打 (021)60226699 确认当前手续。" },
      { question: "上海博物馆东馆周几闭馆？", answer: "上海博物馆东馆常规周二闭馆，国定节假日除外；开放时间为 10:00–18:00，17:00 停止入场。出行前再看对应日期的公告。" },
      { question: "东馆免预约，人民广场馆也免预约吗？", answer: "不是。馆方公告称 2026 年 7 月 9 日至 2027 年 11 月 14 日，人民广场馆只展出需预约购票的特展；票价及免票资格要另查。东馆普通入馆则是免费免预约。" },
      { question: "Homeground 上海—苏州 5 天行程包含东馆吗？", answer: "不包含。现公开的 5 天行程写的是人民广场馆相关选项，不是上海博物馆东馆。想去东馆，可以在确定日期前提出定制需求，再看是否能安排。" },
    ] },
    { id: "internal-links", type: "internal-links", title: "把上博放进上海行程", items: [
      { label: "上海—苏州 5 天私人游", href: "/zh/tours/shanghai-suzhou-5-day-private-tour/", description: "公开行程有人民广场馆相关选项，未包含东馆；东馆可另谈定制。" },
      { label: "核对中国景点门票", href: "/zh/guides/official-or-reseller-china-tickets/", description: "看清官方渠道、票种和实际预约状态。" },
    ] },
    { id: "consultation", type: "callout", title: "想把东馆加入上海的一天？", body: "告诉 Homeground 顾问你的日期和其他已定时间点，我们可以一起检查路线及东馆当期规则。现售上海—苏州 5 天产品不包含东馆；如需前往，请先讨论定制安排。", tone: "neutral" },
    { id: "sources", type: "sources", title: "官方来源（2026 年 9 月 26 日核对）", items: [
      { label: "东馆开放信息：B1 东门、周二闭馆及专项预约", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/service/visit-east", publisher: "上海博物馆", reviewedAt: "2026-09-26" },
      { label: "人民广场馆特展时间和购票规定", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/service/visit-west", publisher: "上海博物馆", reviewedAt: "2026-09-26" },
      { label: "上海市英文游客指南：护照属于东馆有效证件示例", url: "https://english.shanghai.gov.cn/en-MuseumsGalleries/20241205/756c96bd7dd940378b9ac056f11429e2.html", publisher: "上海市人民政府", reviewedAt: "2026-09-26" },
      { label: "上海博物馆官网：基本陈列免费开放", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/index", publisher: "上海博物馆", reviewedAt: "2026-09-26" },
    ] },
  ],
};

export default body;
