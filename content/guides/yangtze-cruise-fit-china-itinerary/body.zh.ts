import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "answer", type: "lead", text: "如果你真想从江上看三峡，而且整条路线适合从重庆进、宜昌出，三晚游轮值得考虑。它占的是四个日历日，不只是三晚住宿。如果这四天会挤掉更想去的地方，就先保留陆上行程。" },
  { id: "fit", type: "comparison", title: "先做一个取舍", columns: [
    { heading: "适合加游轮", body: "江上风景是此行重点；你能从重庆登船、宜昌继续走，并能围绕确认好的船期安排前后交通。" },
    { heading: "把时间留给陆上", body: "假期很短、你对江上航行兴趣不大，或固定船期会让景点和航班、火车衔接变得太赶。" }
  ] },
  { id: "four-days-heading", type: "heading", level: 2, text: "三晚船宿，实际占四天" },
  { id: "four-days", type: "table", caption: "把完整游轮时段算进去", columns: ["日期", "要留出的时间"], rows: [
    ["登船日", "抵达重庆后，还要到确认的码头办理登船；别把这天当成完整的城市游览日。"],
    ["船上两天", "按所订船次的航行和岸上项目走，不能同时在别的城市游览。"],
    ["离船日", "留出离船、已包含项目、从实际终点去机场或车站的时间。"]
  ] },
  { id: "geometry-heading", type: "heading", level: 2, text: "先定船期，再排两端路线" },
  { id: "geometry", type: "list", ordered: true, items: [
    "先核对出行日期有没有合适的重庆至宜昌下水船次。船名、航向和运营码头都以这次预订为准。",
    "再倒排到重庆的交通。提前一晚到重庆，延误余量更大；同日乘飞机抵达，则要仔细核对落地、接送与登船之间的时间。",
    "从宜昌往后排时，先确认所订游轮的离船地点、时间和已含岸上项目，再选下一段火车或航班。",
    "最后把这四天和被替换的城市游览、休息时间放在一起比较。风景再好，也不值得把余下行程压得太紧。"
  ] },
  { id: "route-options-heading", type: "heading", level: 2, text: "现有三条线路，衔接方法不同" },
  { id: "route-options", type: "table", caption: "看路线结构，具体订单仍须分别确认", columns: ["Homeground 线路", "怎么接上游轮"], rows: [
    ["重庆与三峡 6 天", "先在重庆住两晚，再上船住三晚，最后从宜昌离开。"],
    ["北京—西安—长江—上海 12 天", "登船日从西安飞重庆，当天航班与码头接送尤其要留足余量。"],
    ["北京—西安—成都—长江—上海 17 天", "登船前在重庆住一晚，离船后从宜昌继续去上海。"]
  ] },
  { id: "service-heading", type: "heading", level: 2, text: "陆上是私家服务，不等于包下一艘船" },
  { id: "service", type: "callout", tone: "warning", title: "把陆上和船上服务分开看", body: "所链接的 Homeground 产品在列明的陆上游览日，为你们一行安排私人导游和车辆。游轮上会有其他乘客，使用船方自己的人员与活动安排；不要默认陆上导游随船，也不要默认船上有你需要的讲解语种。付款前的书面确认应写清本次船名、舱房、码头、所含餐食与岸上项目、自费项目和服务费。" },
  { id: "booking-heading", type: "heading", level: 2, text: "下单前核对这五件事" },
  { id: "booking", type: "list", items: [
    "航期、航向、船名、登船码头与最终离船地点。",
    "舱型与阳台形式；单人住一舱时另算多少。",
    "哪些餐食、岸上项目已含，哪些需自费。",
    "船上讲解语种，以及陆上私家服务在哪里交接给船方。",
    "两端交通余量、船方变更与取消规则。"
  ] },
  { id: "dynamic", type: "callout", tone: "neutral", title: "具体安排由所订船次决定", body: "这篇只帮你判断路线，不提供实时船期。天气、水位和航道运行可能影响码头、停靠点或结束时间。付款前核对船方当期安排与书面确认单，出发前再查一次。" },
  { id: "faq", type: "faq", title: "加三峡游轮前常问的问题", items: [
    { question: "三晚游轮是不是只占三天？", answer: "不是。重庆到宜昌的三晚行程占登船日、船上两天和离船日，共四个日历日。这四天不能再算作其他城市的完整游览日。" },
    { question: "订私家团，船上也有私人导游吗？", answer: "不一定，也不应这样理解。私人导游和车辆服务只适用于产品列明的陆上部分。游轮与其他乘客同船，船上人员、讲解语种、舱房和岸上项目都要按实际航次核对。" },
    { question: "离船当天能从宜昌继续坐飞机或火车吗？", answer: "有可能，但先确认这艘船的离船地点和时间、已含岸上项目，以及到正确机场或车站的接送，再选下一段交通。不要把游轮到达等同于已经到达市区车站。" },
    { question: "加了游轮，其他城市就太赶怎么办？", answer: "先不加，或为全程增加天数。只有江上体验对你比被挤掉的陆上时间更重要，这四天才值得投入。不要为了赶固定船期，把重点城市和交通都排得没有余量。" }
  ] },
  { id: "links", type: "internal-links", title: "接着看具体线路", items: [
    { label: "重庆与长江三峡 6 天私家团", href: "/zh/tours/chongqing-yangtze-cruise-6-day-private-tour/", description: "重庆住两晚，再乘三晚与其他客人同船的游轮。" },
    { label: "北京—西安—长江—上海 12 天私家团", href: "/zh/tours/beijing-xian-yangtze-cruise-shanghai-12-day-private-tour/", description: "登船日从西安飞重庆的多城市路线。" },
    { label: "北京—西安—成都—长江—上海 17 天私家团", href: "/zh/tours/beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour/", description: "登船前在重庆住一晚的较长路线。" },
    { label: "检查中国行程是不是太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "把每个跨城日的完整耗时算进去。" },
    { label: "规划中国不同城市进出的机票", href: "/zh/guides/china-open-jaw-flights-route-planning/", description: "减少旅程两端不必要的折返。" }
  ] },
  { id: "sources", type: "sources", title: "船方与图片来源", items: [
    { label: "黄金游轮经典三峡产品与运营方介绍", url: "https://www.ccqctg.com/col1916449.html", publisher: "重庆文旅集团", reviewedAt: "2026-09-26" },
    { label: "另一船方的重庆至宜昌四天三晚示例，不代表本产品确认船次", url: "https://centurycruise.com/tours/yangtze-signature-downstream-cruise-3-night", publisher: "世纪游轮", reviewedAt: "2026-09-26" },
    { label: "头图：Tan Wei Liang Byorn 拍摄的瞿塘峡，CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:Qutang_Gorge_on_Changjiang.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-26" }
  ] }
] } satisfies StructuredPageBody;

export default body;
