import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "去玉龙雪山要约两样：进山票（100 元，另加 20 元环保车），在“玉龙雪山服务”小程序；索道票，在“丽江旅游集团”小程序。冰川公园大索道（120 元）每天北京时间 20:00 放未来 7 天的票，云杉坪索道（40 元）21:00 放。索道实名、要刷脸；牦牛坪索道 2026 年 3 月 4 日起停运改建；当天刮大风、下大雪，索道也可能停。先抢索道票，再留一天备用。" },
    { id: "pressure-callout", type: "callout", tone: "warning", title: "雪山也会挤满", body: "2025 年 2 月 2 日大雪，游客从下午两点左右一直排到六点左右，才坐上下山的索道。2 月 4 日中午 12 点起景区限流，当天的索道票全部约满（封面新闻，人民日报客户端，2025 年 2 月 5 日）。这一天最紧的是索道票，天气还随时可能把它拿走。" },
    { id: "tickets-heading", type: "heading", level: 2, text: "到底要买哪几张票" },
    { id: "tickets-table", type: "table", caption: "2026 年公布的每人价格，2026 年 9 月 26 日核对", columns: ["项目", "价格", "个人购票官方渠道"], rows: [
      ["进山门票", "100 元", "“玉龙雪山服务”微信小程序，最多提前 7 天"],
      ["环保车", "20 元", "以当天的进山票产品为准"],
      ["冰川公园大索道", "120 元", "“丽江旅游集团”微信小程序，每天 20:00 放未来 7 天的票"],
      ["云杉坪索道", "40 元", "“丽江旅游集团”微信小程序，每天 21:00 放未来 7 天的票"],
    ] },
    { id: "release-heading", type: "heading", level: 2, text: "两条索道放票时间不一样" },
    { id: "release", type: "paragraph", text: "索道运营方公布的规则是：冰川公园大索道每天 20:00 放未来 7 天的票，云杉坪索道 21:00 放。进山票另外卖，也是最多提前 7 天。两样是不同小程序里的不同产品：约到了进山票，不代表有索道的位置。人在国外的，北京时间 20:00 是伦敦中午 12 点（夏令时 13 点）、纽约早上 7 点（夏令时 8 点）。" },
    { id: "mistakes", type: "callout", tone: "warning", title: "别再排牦牛坪", body: "牦牛坪索道 2026 年 3 月 4 日起停运改建。运营方预计大约 2028 年，这只是预测，不是确定的重开日期。还写着牦牛坪的旧行程和帖子，都已经过时了。" },
    { id: "choice-heading", type: "heading", level: 2, text: "冰川公园还是云杉坪" },
    { id: "choice", type: "comparison", title: "先定想要哪一天，再约对应的索道", columns: [
      { heading: "冰川公园", body: "上山的大索道，名额最紧，也最受天气影响。120 元不是这一天的全部花费：进山票、环保车，以及你那张票上写的内容都要算进去。" },
      { heading: "云杉坪", body: "另一条在下方的索道，40 元，21:00 放票。是另一种玩法，不能拿它代替冰川公园。我们的云南 8 天私家团，安排的是云杉坪和蓝月谷。" },
    ] },
    { id: "traps-heading", type: "heading", level: 2, text: "让人上不了山的坑" },
    { id: "traps-table", type: "table", caption: "哪里会出错，为什么", columns: ["坑", "实际会发生什么", "依据"], rows: [
      ["买了进山票，以为索道也含了", "进山票和每条索道是不同小程序里的不同票。", "玉龙雪山管理公告；丽江旅游集团"],
      ["按自己当地的 20:00 去抢", "放票是北京时间 20:00：伦敦是中午，纽约是清早。", "丽江旅游集团放票规则"],
      ["还想坐牦牛坪", "2026 年 3 月 4 日起停运改建。", "丽江旅游集团公告，2026 年 3 月 3 日"],
      ["帮别人代刷", "索道实名、刷脸，票上的人必须本人到场。", "丽江旅游集团"],
      ["不留备用日", "大风、大雪会让索道停运，按运营方的改签或退款规则处理，不会自动换成别的索道。", "中国旅游报转述运营方，2025 年 6 月"],
      ["大雪天去、没有备选", "2025 年 2 月 2 日，下山索道排了约四个小时；2 月 4 日限流，当天索道票全部约满。", "封面新闻（人民日报客户端），2025 年 2 月 5 日"],
    ] },
    { id: "workflow-heading", type: "heading", level: 2, text: "按这个顺序订最稳" },
    { id: "workflow", type: "list", ordered: true, items: [
      "先选冰川公园还是云杉坪，确认你那天在运营。",
      "提前 7 天，在北京时间 20:00 或 21:00 放票时，到“丽江旅游集团”约索道；要实名、刷脸。",
      "在“玉龙雪山服务”约同一天的进山票。",
      "逐个核对订单，带上预约时用的证件原件。",
      "丽江留一天机动：索道因天气停运，就按运营方对你这张订单的改签或退款说明处理。",
    ] },
    { id: "passport", type: "callout", tone: "neutral", title: "用外国护照？", body: "运营方以前的公告说，持外国护照的游客和持中国身份证的游客要分开预约索道，但没有现在的操作截图。付款前先问官方售票渠道怎么用护照预约和核验，或者交给我们先帮你确认；当天带上订单上用的那本证件原件。" },
    { id: "sales-heading", type: "heading", level: 2, text: "雪山这一天，交给我们" },
    { id: "sales-copy", type: "paragraph", text: "我们在运营方自己的系统里，按每位游客实名把进山票和索道一起约好，门票按票面价，另收每人 45 元服务费；付款前，我们先确认你们的证件怎么预约、怎么核验。参观前至少 8 天提交并付款，也就是索道放你那天的票之前一天，就保证约到；约不到，服务费和门票钱全额退。索道因天气停运，改签或退款我们帮你跟运营方处理。我们自己的司机可以从丽江酒店送你上山再接回来，行程里也可以为天气留出一天。也可以直接跟我们的云南 8 天私家团，雪山那天安排云杉坪和蓝月谷。", link: { label: "按每位游客实名把进山票和索道一起约好", href: "/zh/services/china-attraction-reservations/?attraction=jade-dragon-snow-mountain#reservation-enquiry" } },
    { id: "sales-products", type: "table", caption: "在云南，这些可以交给我们", columns: ["服务", "你得到什么", "价格"], rows: [
      ["景点代预约", "玉龙雪山进山票，加冰川公园大索道或云杉坪索道，按每位游客实名约好，每份预约记录发给你", "每人每景点 45 元服务费，门票按票面价另付；提前 8 天以上提交并付款保证约到"],
      ["包车", "我们自己的司机，从丽江酒店到雪山来回；中国大陆任何城市都能派车", "按需求书面报价，你确认之前不收任何费用"],
      ["昆明·大理·丽江 8 天 7 晚私家团", "昆明 2 晚、大理 3 晚、丽江 2 晚，雪山那天去云杉坪和蓝月谷；想去冰川公园可以单独核实和报价", "6 人每人 5,680 元起"],
    ], rowLinks: [
      "/zh/services/china-attraction-reservations/?attraction=jade-dragon-snow-mountain#reservation-enquiry",
      "/zh/services/private-car-and-driver/",
      "/zh/tours/kunming-dali-lijiang-8-day-private-tour/",
    ] },
    { id: "how-to-book", type: "callout", tone: "neutral", title: "怎么跟我们订", body: "在预约表单里填好日期、人数和想坐哪条索道，会自动打开 WhatsApp 或邮箱，内容已经替你写好。咨询不需要证件号。规划师 12 小时内回复，付款前给你书面报价，你确认之前不收任何费用。线路用支付宝或 VBill 付 30% 定金，不加收刷卡手续费，尾款等你到了再付。我们是持证旅行社（许可证 L-BJ10587），导游和司机都是自己的，不进购物店，线路可以安排中文导游。" },
    { id: "faq", type: "faq", title: "玉龙雪山预约常见问题", items: [
      { question: "冰川公园大索道票什么时候放？", answer: "每天北京时间 20:00，放未来 7 天的票，在“丽江旅游集团”小程序。当天天气仍可能影响运营。" },
      { question: "云杉坪索道票什么时候放？", answer: "每天 21:00，放未来 7 天的票，在同一个小程序。和冰川公园是两张不同的票。" },
      { question: "玉龙雪山门票多少钱？", answer: "2026 年价目：进山门票 100 元，环保车 20 元；冰川公园大索道 120 元，云杉坪索道 40 元。" },
      { question: "进山票包含索道吗？", answer: "别这么以为。进山票、环保车和每条索道都是分开标价的；买组合产品时看清包含哪几项。" },
      { question: "2026 年还能坐牦牛坪索道吗？", answer: "不能。2026 年 3 月 4 日起停运改建；大约 2028 年只是预测，不是确定日期。" },
      { question: "天气不好索道停了怎么办？", answer: "运营方公布了冰川公园受影响订单的改签规则，以及天气原因的优先改签渠道。怎么处理看你的订单和当时的公告；再买新票之前，先问官方渠道。" },
      { question: "Homeground 的云南 8 天团包含冰川公园吗？", answer: "公布的行程安排的是云杉坪和蓝月谷，不是冰川公园。冰川公园是重点的话，请我们单独核实和报价。" },
    ] },
    { id: "internal-links", type: "internal-links", title: "把雪山放进丽江行程", items: [
      { label: "昆明·大理·丽江 8 天私家团", href: "/zh/tours/kunming-dali-lijiang-8-day-private-tour/", description: "公布的行程是云杉坪和蓝月谷；冰川公园要单独核实。" },
      { label: "丽江古城：维护费、看什么、待几天", href: "/zh/guides/lijiang-old-town/", description: "三处世界遗产、50 元古城维护费和雪山。" },
      { label: "丽江和香格里拉怎么排", href: "/zh/guides/lijiang-shangri-la-transport-route/", description: "定雪山日期之前，先看整条路线。" },
    ] },
    { id: "sources", type: "sources", title: "官方与运营方资料", items: [
      { label: "2026 年门票价格", url: "https://www.lijiang.cn/article/175988.html", publisher: "玉龙雪山景区管理公告／丽江市媒体", reviewedAt: "2026-09-26" },
      { label: "现行进山小程序与 7 天预约", url: "https://www.lijiang.cn/article/181225.html", publisher: "玉龙雪山景区管理说明／丽江市媒体", reviewedAt: "2026-09-26" },
      { label: "白沙服务中心公告", url: "https://www.lijiang.cn/article/164510.html", publisher: "玉龙雪山景区管理公告／丽江市媒体", reviewedAt: "2026-09-26" },
      { label: "索道预约与天气规则", url: "https://www.ctnews.com.cn/dongtai/content/2025-06/25/content_175505.html", publisher: "中国旅游报（转述运营方）", reviewedAt: "2026-09-26" },
      { label: "运营方以前关于外国护照预约的说明", url: "https://www.lijiang.cn/article/133126.html", publisher: "丽江索道运营方／丽江市媒体", reviewedAt: "2026-09-26" },
      { label: "牦牛坪索道停运", url: "https://static.cninfo.com.cn/finalpage/2026-03-03/1224991096.PDF", publisher: "丽江旅游公司交易所公告", reviewedAt: "2026-09-26" },
      { label: "封面新闻：2025 年 2 月 2 日下山索道排队约四小时，2 月 4 日限流、索道票全部约满（2025 年 2 月 5 日）", url: "https://www.peopleapp.com/column/30048174845-500006077194", publisher: "封面新闻／人民日报客户端", reviewedAt: "2026-10-20" },
      { label: "雪山照片与 CC BY-SA 4.0 许可", url: "https://commons.wikimedia.org/wiki/File:Jade_Dragon_Snow_Mountain,_Yunnan.jpg", publisher: "Wikimedia Commons／钉钉", reviewedAt: "2026-09-26" },
    ] },
  ],
} as const satisfies StructuredPageBody;

export default body;
