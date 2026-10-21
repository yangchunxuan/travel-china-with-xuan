import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "上海博物馆东馆普通入馆不用预约：个人观众免费，带有效证件原件，从 B1 东入口进。开放时间 10:00–18:00，17:00 停止入馆，周二闭馆（国家法定节假日除外），不是周一。有两样不一样：东馆的“古代文明探索宫”和“数字馆”要分别提前预约；另一座人民广场馆，到 2027 年 11 月 14 日都只办一个收费特展。东馆也很大，最好带着计划去。" },
    { id: "booking-heading", type: "heading", level: 2, text: "上博哪些要约，哪些不用" },
    { id: "booking-rules", type: "table", caption: "上海博物馆官方公告，2026 年 9 月 26 日核对", columns: ["项目", "现行规定", "你要怎么做"], rows: [
      ["东馆普通入馆", "个人观众免费，免预约", "带有效证件原件，从 B1 东入口进"],
      ["东馆古代文明探索宫、数字馆", "两处都要单独提前预约", "在上博微信预约服务的东馆“专项预约”里约"],
      ["人民广场馆", "2026 年 7 月 9 日至 2027 年 11 月 14 日只办“世界树之巅：美洲古代文明大展”一个收费特展。日场 9:00–17:00，15:00 停止入场；日场连夜场 9:00–21:00，19:00 停止入场；周一闭馆（国定假日除外）。人民大道 201 号，从武胜路南门进", "想定好时间就在上博官方小程序提前约；东馆的免费规定在这里不适用"],
      ["外国护照", "上海市官方游客指南写明：在 B1 东入口出示护照等有效证件即可", "带护照原件；有疑问可打（021）60226699"],
      ["收费展览", "单独收费的展览可能走上博的预约系统", "看那个展览自己的公告"],
    ] },
    { id: "hours-heading", type: "heading", level: 2, text: "开放时间和闭馆日" },
    { id: "hours", type: "paragraph", text: "东馆在浦东世纪大道 1952 号，地铁 2 号线上海科技馆站 8 号口；散客从丁香路一侧的 B1 东入口进。东馆 10:00–18:00 开放，17:00 停止入馆，一般周二闭馆，国家法定节假日除外。人民广场馆的开放时间不一样，见上表。以上为 2026 年 9 月 26 日核对的规定；节假日前后，以上博最新公告为准。" },
    { id: "scale", type: "paragraph", text: "很多人低估了东馆有多大。分批开放时，上博规划的是 20 个展厅和互动空间，其中 13 个常设展厅，陈列面积约 3.36 万平方米（界面新闻，2024 年 1 月）。想全部看完要一整天，所以去之前先挑一两个主展厅。" },
    { id: "traps-heading", type: "heading", level: 2, text: "免费的博物馆，也有坑" },
    { id: "traps-table", type: "table", caption: "哪里会出错，为什么", columns: ["坑", "实际会发生什么", "依据"], rows: [
      ["排在周二", "东馆周二闭馆，不是周一，国家法定节假日除外。", "上博东馆参观须知"],
      ["以为免费入馆就能进探索宫", "古代文明探索宫和数字馆都要单独提前预约。", "上博东馆参观须知"],
      ["去人民广场馆找免费展", "到 2027 年 11 月 14 日，人民广场馆只办一个收费特展。", "上博人民广场馆参观须知"],
      ["17:15 才到", "17:00 停止入馆。", "上博东馆参观须知"],
      ["带证件照片去", "入馆要有效证件原件。", "上博东馆参观须知"],
      ["周一或周二想两馆一起看", "人民广场馆周一闭馆，东馆周二闭馆，这两天都没法两馆连看。", "上博两馆参观须知"],
      ["下午三点半才到人民广场馆", "日场 15:00 就停止入场，比闭馆早两个小时。", "上博人民广场馆参观须知"],
      ["想一下午全看完", "20 个展厅和空间、约 3.36 万平方米，一个下午看不完。", "界面新闻，2024 年 1 月"],
    ] },
    { id: "options-heading", type: "heading", level: 2, text: "去东馆还是人民广场馆" },
    { id: "options", type: "comparison", columns: [
      { heading: "东馆", body: "带证件原件从 B1 东入口免费进；想去两个体验区，另外约。" },
      { heading: "人民广场馆", body: "到 2027 年 11 月 14 日只有收费特展。票价和预约规则直接看官方；东馆的免费规定不适用。" },
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "东馆这样逛" },
    { id: "route-list", type: "list", items: [
      "先想好要不要去两个体验区，要去就先约。",
      "按指示走到 B1 东入口，给安检和刷证件留点时间。",
      "进馆后看展厅图，先定一个主展厅，再决定加不加第二个。",
      "约了体验区的，按确认信息上的时间安排。",
    ] },
    { id: "sales-heading", type: "heading", level: 2, text: "免费的博物馆，更要逛得值" },
    { id: "sales-copy", type: "paragraph", text: "东馆进门不要钱，所以真正值钱的是在馆里的那几个小时。持证导游可以按你们一行人的兴趣挑展厅，把青铜、陶瓷和书画的来龙去脉在两三个小时里讲清楚，而不是在馆里转一下午。古代文明探索宫或数字馆、人民广场馆的特展、上海中心观光厅，我们都可以按每位游客实名帮你约。来上海的人大多也会去苏州，而苏州那张票更难约：拙政园只提前 7 天放票。2026 年 9 月 30 日，10 月 2 日至 5 日已经全部约满，1 日和 6 日也只剩部分时段。参观前至少 8 天交给我们并付款，也就是拙政园放你那天票的前一天，保证约到。两边一起交给我们。也可以直接跟上海·苏州 5 天私家团：行程所列门票已经包含拙政园和上海中心观光厅。", link: { label: "两边一起交给我们", href: "/zh/services/china-attraction-reservations/#reservation-enquiry" } },
    { id: "sales-products", type: "table", caption: "在上海，这些可以交给我们", columns: ["服务", "你得到什么", "价格"], rows: [
      ["上海私人导游", "持证导游陪同最多 8 小时：上午逛博物馆，下午接着看上海；只按整天计；中文客人可以安排中文导游", "英文导游每位每天人民币 1,200 元（旺季 1,400–1,600 元）；中文导游报价时确认"],
      ["景点代预约", "古代文明探索宫和数字馆、人民广场馆特展、上海中心观光厅，以及苏州拙政园，按每位游客实名约好", "每人每景点 45 元服务费，门票按票面价另付；提前 8 天以上提交并付款保证约到"],
      ["包车", "我们自己的司机，市内包车或上海到苏州来回；中国大陆任何城市都能派车", "按需求书面报价，你确认之前不收任何费用"],
      ["上海·苏州 5 天 4 晚私家团", "上海携程四钻酒店 4 晚含早，游览日英语导游，朱家角水乡，高铁往返苏州，含行程所列成人门票（拙政园、上海中心观光厅等）；行程不含东馆，可以调整上海那天的安排", "6 人每人 4,018 元起（2 人每人 4,998 元）"],
    ], rowLinks: [
      "/zh/services/private-english-speaking-guides/#shanghai",
      "/zh/services/china-attraction-reservations/?attraction=shanghai-museum-east-experience-areas#reservation-enquiry",
      "/zh/services/private-car-and-driver/",
      "/zh/tours/shanghai-suzhou-5-day-private-tour/",
    ] },
    { id: "how-to-book", type: "callout", title: "怎么跟我们订", body: "在预约表单里填好日期和人数，会自动打开 WhatsApp 或邮箱，内容已经替你写好。咨询不需要证件号。规划师 12 小时内回复，付款前给你书面报价，你确认之前不收任何费用。线路用 VBill 刷卡链接付 30% 定金，尾款等你到了再付。我们是持证旅行社（许可证 L-BJ10587），导游和司机都是自己的，不进购物店。", tone: "neutral" },
    { id: "final-check", type: "callout", title: "出发前一天核对", body: "确认去的是东馆、那天开馆（不是周二）、证件原件带好了，约了体验区的已经确认成功。", tone: "decision" },
    { id: "faq", type: "faq", title: "上博东馆常见问题", items: [
      { question: "上海博物馆需要预约吗？", answer: "东馆个人观众普通入馆免费、免预约。东馆的古代文明探索宫和数字馆要分别提前预约；人民广场馆到 2027 年 11 月 14 日只办收费特展。" },
      { question: "上海博物馆东馆开放时间是几点？", answer: "东馆 10:00–18:00，17:00 停止入馆，周二闭馆（国家法定节假日除外）。人民广场馆日场 9:00–17:00，15:00 停止入场，周一闭馆（国定假日除外）。" },
      { question: "上博东馆门票多少钱？", answer: "普通入馆免费。两个体验区和单独收费的展览另有预约，人民广场馆的特展收费。" },
      { question: "上博东馆从哪个门进？", answer: "东馆在浦东世纪大道 1952 号，坐地铁 2 号线到上海科技馆站 8 号口；带有效证件原件，从丁香路一侧的 B1 东入口进，过安检、刷证件。" },
      { question: "外国人能用护照进上博东馆吗？", answer: "能。上海市官方游客指南写明，在 B1 东入口出示护照等有效证件即可，带护照原件。" },
      { question: "上博东馆要逛多久？", answer: "看一两个展厅两到三小时；想多看就要大半天。上博规划的东馆有 20 个展厅和空间、约 3.36 万平方米陈列面积。" },
      { question: "东馆免费，人民广场馆也免费吗？", answer: "不是。到 2027 年 11 月 14 日，人民广场馆只办一个收费特展。" },
    ] },
    { id: "internal-links", type: "internal-links", title: "规划上海其他几天", items: [
      { label: "拙政园门票怎么约", href: "/zh/guides/humble-administrators-garden-tickets-entry/", description: "苏州这张票只提前 7 天放。" },
      { label: "第一次去上海住哪里", href: "/zh/guides/shanghai-where-to-stay-first-trip/", description: "为博物馆和苏州一日游选住处。" },
      { label: "怎么辨别中国景点门票真假", href: "/zh/guides/official-or-reseller-china-tickets/", description: "付钱给转卖之前，先确认哪张预约真的成功了。" },
    ] },
    { id: "sources", type: "sources", title: "资料来源", items: [
      { label: "上博东馆参观须知：B1 东入口、开放时间、周二闭馆与体验区单独预约", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/en/service/visit-east", publisher: "上海博物馆", reviewedAt: "2026-09-26" },
      { label: "人民广场馆特展期间与收费入馆", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/service/visit-west", publisher: "上海博物馆", reviewedAt: "2026-09-26" },
      { label: "上海市游客指南：护照可作为东馆入馆有效证件", url: "https://english.shanghai.gov.cn/en-MuseumsGalleries/20241205/756c96bd7dd940378b9ac056f11429e2.html", publisher: "上海市人民政府", reviewedAt: "2026-09-26" },
      { label: "上博官网首页：常设展免费", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/index", publisher: "上海博物馆", reviewedAt: "2026-09-26" },
      { label: "界面新闻：东馆规划 20 个展厅和空间、陈列面积约 3.36 万平方米（2024 年 1 月 9 日）", url: "https://www.jiemian.com/article/10646241.html", publisher: "界面新闻", reviewedAt: "2026-10-20" },
      { label: "财联社：拙政园 2026 年 10 月 2 日至 5 日门票已约满（2026 年 9 月 30 日）", url: "https://www.cls.cn/detail/2496370", publisher: "财联社", reviewedAt: "2026-10-20" },
    ] },
  ],
};

export default body;
