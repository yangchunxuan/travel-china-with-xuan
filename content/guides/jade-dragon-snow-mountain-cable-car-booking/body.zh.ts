import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "去玉龙雪山，先别把“景区门票”和“索道票”当成一张票。2026 年公布的价格是进山票每人 100 元、环保车 20 元；另选冰川公园大索道 120 元或云杉坪索道 40 元。散客进山票在“玉龙雪山服务”小程序看，索道票在“丽江旅游集团”小程序看。组合票也有，付款前要核对订单到底包含哪些项目。" },
    { id: "tickets-heading", type: "heading", level: 2, text: "先认清要买的四项" },
    { id: "tickets-table", type: "table", caption: "2026 年公布的每人价格；2026 年 9 月 26 日复核", columns: ["项目", "公布价格", "散客官方渠道"], rows: [
      ["景区进山票", "100 元", "“玉龙雪山服务”微信小程序"],
      ["环保车", "20 元", "以当期进山票产品为准"],
      ["冰川公园大索道", "120 元", "“丽江旅游集团”微信小程序"],
      ["云杉坪索道", "40 元", "“丽江旅游集团”微信小程序"]
    ] },
    { id: "release-heading", type: "heading", level: 2, text: "两条索道不是同一个时间放票" },
    { id: "release", type: "paragraph", text: "索道运营方公布的规则是：冰川公园大索道每天 20:00 开放未来 7 天的票，云杉坪索道每天 21:00 开放未来 7 天的票。进山票属于另一套购票渠道，也可提前最多 7 天购买。抢到进山票，不等于拿到了大索道票；设提醒前先看清要去的是哪一条索道，并在出行日复查公告。" },
    { id: "yak", type: "callout", tone: "warning", title: "旧攻略里写的牦牛坪索道暂时不能选", body: "运营方从 2026 年 3 月 4 日起关闭牦牛坪索道进行改建。约 2028 年恢复只是预期，不是已确定的开通日期。不要照着旧行程把它排成当天的备选。" },
    { id: "choice-heading", type: "heading", level: 2, text: "大索道与云杉坪怎么选？" },
    { id: "choice", type: "comparison", title: "选景点，也选相应的索道票", columns: [
      { heading: "冰川公园大索道", body: "上山路线不同，名额更紧，也受风和天气影响。120 元只是公布的索道价格；进山票、环保车及实际订单的项目要另核。" },
      { heading: "云杉坪索道", body: "属于另一处游览区域，公布索道价 40 元。买云杉坪票不能上冰川公园。本站现有云南 8 日产品安排的是云杉坪和蓝月谷，具体仍以书面确认的行程为准。" }
    ] },
    { id: "workflow-heading", type: "heading", level: 2, text: "下单前后按这个顺序核对" },
    { id: "workflow", type: "list", ordered: true, items: [
      "先确定你更想去冰川公园还是云杉坪，再看拟出行日是否开放；不要先把丽江整天排死。",
      "分别查看两个官方小程序的当天产品。索道散客购票实行实名与人脸核验，填资料时以官方页面实际显示为准。",
      "付款后逐项查看成功订单中的日期、索道名称、时段和证件信息，带上预订时使用的证件原件。付款截图不等于已确认座位。",
      "遇到大风或其他天气停运，看运营方对该订单的改期、退票安排；不要自行认定会自动换到另一条索道。"
    ] },
    { id: "passport", type: "callout", tone: "neutral", title: "使用外国护照的旅客", body: "较早的运营方说明写到，持外国护照的游客购买索道票时，要与使用居民身份证的游客分开预订；它没有提供现在的小程序逐步填写方法。付款前请向官方售票方确认如何录入和验票，并带上成功订单使用的证件原件。" },
    { id: "faq", type: "faq", title: "玉龙雪山购票常见问题", items: [
      { question: "冰川公园大索道几点放票？", answer: "运营方公布的时点是每天 20:00，放未来 7 天的票，使用“丽江旅游集团”小程序。天气和当日额度仍可能影响实际开放情况。" },
      { question: "云杉坪索道几点放票？", answer: "运营方公布的时点是每天 21:00，放未来 7 天的票。云杉坪与冰川公园是不同的票。" },
      { question: "买了进山票就能坐索道吗？", answer: "不能这样假设。公布的价目把进山票 100 元、环保车 20 元和索道票分开列出；有组合产品时也要核对订单项目。" },
      { question: "2026 年还能坐牦牛坪索道吗？", answer: "不能。运营方自 2026 年 3 月 4 日起关闭它进行改建，恢复时间尚无确定日期。" },
      { question: "因天气停运怎么办？", answer: "运营方公布了受影响的冰川公园订单改期与天气优先预约规则。实际处理以对应订单和当期官方公告为准，别在没确认前重复买票。" },
      { question: "你们的昆明—大理—丽江 8 日私家团含大索道吗？", answer: "现有公开行程写的是云杉坪和蓝月谷，并没有承诺冰川公园大索道。若你只想去冰川公园，请另行提出，按出行日期核票和报价。" }
    ] },
    { id: "internal-links", type: "internal-links", title: "把雪山放进丽江行程", items: [
      { label: "昆明—大理—丽江 8 日私家团", href: "/zh/tours/kunming-dali-lijiang-8-day-private-tour/", description: "查看已发布的云杉坪与蓝月谷安排；冰川公园须单独核实。" },
      { label: "丽江和香格里拉怎么安排顺序", href: "/zh/guides/lijiang-shangri-la-transport-route/", description: "先看整体线路，再固定雪山游览日。" }
    ] },
    { id: "sources", type: "sources", title: "官方与运营方资料", items: [
      { label: "2026 年景区与索道价目", url: "https://www.lijiang.cn/article/175988.html", publisher: "玉龙雪山管理机构公告／丽江网", reviewedAt: "2026-09-26" },
      { label: "当前进山票小程序及提前 7 天预约", url: "https://www.lijiang.cn/article/181225.html", publisher: "玉龙雪山管理机构说明／丽江网", reviewedAt: "2026-09-26" },
      { label: "白沙游客服务中心旧公告", url: "https://www.lijiang.cn/article/164510.html", publisher: "玉龙雪山管理机构公告／丽江网", reviewedAt: "2026-09-26" },
      { label: "索道放票及天气规则", url: "https://www.ctnews.com.cn/dongtai/content/2025-06/25/content_175505.html", publisher: "中国旅游报引述索道运营方", reviewedAt: "2026-09-26" },
      { label: "较早的外国护照预订说明", url: "https://www.lijiang.cn/article/133126.html", publisher: "丽江索道运营方／丽江网", reviewedAt: "2026-09-26" },
      { label: "牦牛坪索道停运公告", url: "https://static.cninfo.com.cn/finalpage/2026-03-03/1224991096.PDF", publisher: "丽江旅游运营方交易所公告", reviewedAt: "2026-09-26" },
      { label: "山景照片及授权", url: "https://commons.wikimedia.org/wiki/File:Jade_Dragon_Snow_Mountain,_Yunnan.jpg", publisher: "Wikimedia Commons／钉钉", reviewedAt: "2026-09-26" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
