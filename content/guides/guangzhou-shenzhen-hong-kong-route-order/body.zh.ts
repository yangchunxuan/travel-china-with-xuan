import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const gzTour = "guangzhou-shunde-foshan-5-day-private-tour";
const szTour = "shenzhen-family-tech-4-day-private-tour";
const hkTour = "beijing-xian-guilin-hong-kong-10-day-private-tour";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "在地图上，三座城市大致南北一线：广州在北，深圳在边境上，香港在南；广州南站到香港西九龙的高铁就穿过深圳。所以从广州进、香港出，就按广州→深圳→香港走；航班反过来，路线也反过来，没有理由别过两次关。深圳要有你想看的地方，才值得住一晚。之后再按两头酒店的位置和行李，选从哪里过关去香港，给过关留够时间。" },
  { id: "quick-choice", type: "comparison", title: "选择路线形状", columns: [
    { heading: "三个基地", body: "每座城市至少有一个完整本地重点，且口岸两侧酒店都适合所选过境方式时使用。" },
    { heading: "广州＋香港", body: "深圳没有必须保护的核心项目时使用；可过境或集中访问，不必增加酒店。" },
    { heading: "深圳＋香港", body: "广州不是核心，而深圳重点在地理上相对集中时使用。" }
  ] },
  { id: "traps-heading", type: "heading", level: 2, text: "到了边境才发现的 7 个珠三角路线坑" },
  { id: "traps-list", type: "list", ordered: true, items: [
    "去了香港，内地这一次入境就用掉了。按内地出入境管理，从内地去香港算离境，从香港回来是一次新的入境，当天往返也一样；单次入境签证离境后不会恢复（外交部领事司、国家移民管理局）。「广州→香港→深圳」这样走，签证或免签要能覆盖两次入境。",
    "240 小时过境免签里，香港算单独的地区。符合条件的护照持有人，从一个国家或地区入境、去往另一个国家或地区，最长可停留 10 天；以国家移民管理局规定和边检当场决定为准。",
    "西九龙有 30 分钟截止。从香港回内地，港铁在开车前 30 分钟停止实名查验、安检和出入境手续，两地出入境都在站内办。",
    "陆路口岸会关门。深圳市口岸办公布：福田口岸 6:30—22:30，罗湖口岸 6:30—24:00；晚上才到深圳，可能赶到时口岸已经关了。",
    "「广州」不是一个站。12306 的跨境产品把广州南站（在番禺）和广州东站分开列；去错一个，上车前还要再横穿一次城。",
    "广交会期间不是平常的日子。第 140 届广交会分三期：2026 年 10 月 15—19 日、10 月 23—27 日、10 月 31 日—11 月 4 日（商务部），全届约 34 万境外采购商到会（新华社）。",
    "内地的车到边境为止。我们的车和内地任何包车一样，只能送到口岸的深圳一侧或火车站，从那里过关。",
  ] },
  { id: "traps-sales", type: "paragraph", text: "第 4、5、7 个坑都出在去边境的路上，这一段正好交给包车：我们自己的司机可以带着你和行李，从广州的酒店送到深圳的酒店，再送到福田或罗湖口岸的深圳一侧，或者直接送到广州南站坐去香港的高铁。把酒店、日期和过关方式发给我们，12 小时内回复；付款前书面确认你这个时间有车、车型和总价。中国大陆任何城市都能派车（不含港澳）。咨询广州—深圳包车。", link: { label: "咨询广州—深圳包车", href: "/zh/services/private-car-and-driver/#car-enquiry" } },
  { id: "official-heading", type: "heading", level: 2, text: "口岸是一套流程，不是铁路图上的一条线" },
  { id: "official", type: "paragraph", text: "香港保安局列出多个陆路管制站，包括铁路和公路口岸，各自有不同交通与运营信息。港铁高速铁路提供香港西九龙跨境出行的官方规划资料。这些来源证明存在多种选择，不表示有一个对所有人最好的口岸。护照、入境资格、两侧酒店、行李和后续安排共同决定真正有用的选择；临近出行必须查询官方要求。" },
  { id: "gateway-heading", type: "heading", level: 2, text: "让真实口岸决定方向" },
  { id: "gateway", type: "table", caption: "先放入抵离，再安排城市", columns: ["口岸模式", "可能顺序", "什么问题会推翻它"], rows: [
    ["广州地区抵达，香港离境", "广州→深圳→香港", "深圳是否值得住一晚？"],
    ["香港抵达，广州地区离境", "香港→深圳→广州", "哪个口岸适合香港酒店？"],
    ["国际往返都用香港", "香港位于一端或两端，避免不必要的重复过境", "先完成内地段、最后一晚回香港是否更稳？"],
    ["国际往返都用内地口岸", "把香港作为有意识的延伸，不当成默认过境", "这本护照的入境和再次入境资格是否确认？"]
  ] },
  { id: "shenzhen-test-heading", type: "heading", level: 2, text: "深圳住宿测试" },
  { id: "shenzhen-test", type: "list", ordered: false, items: [
    "写下路线缩减时仍会保留的深圳体验。“刚好顺路”不是体验。",
    "检查这个重点是否靠近深圳酒店和下一口岸；一个离两者都远的著名区域会增加两次市内转移。",
    "确认行李寄存后，判断不换酒店的集中访问能否提供同样价值。",
    "统计退房、行李、过境和新入住；一晚住宿必须创造足够本地可用时间才能偿还这些成本。",
    "如果深圳一晚迫使第二次过境，或削弱最后国际离境，应优先删除。"
  ] },
  { id: "one-base-heading", type: "heading", level: 2, text: "保留广州同一家酒店，还是在深圳过夜？" },
  { id: "one-base-choice", type: "list", ordered: false, items: [
    "如果深圳是临时决定的日游，而且最希望避免再次退房，就保留广州酒店，把主要行李留在那里。但若接着去香港，也要算上当天返回广州，以及第二天从酒店再去车站的额外路程。",
    "如果深圳游览与之后的香港段一起规划，可以在深圳过夜。广州→深圳、住一晚→香港，能省去中间折返广州的一段。比较增加一次酒店和行李搬运，与省下交通的得失；深圳住宿区应围绕实际游览地点和所选口岸决定。",
    "如果香港需要玩几天，就比较住在香港与从内地酒店反复往返香港日游的总成本。预算要计入过关手续和交通，并在预订前确认每次再次进入内地的资格。只看房价较低，不能说明整趟旅行更便宜或更轻松。"
  ] },
  { id: "crossing-heading", type: "heading", level: 2, text: "从两边酒店门口选择口岸" },
  { id: "crossing", type: "table", caption: "城市顺序确定后再执行交通方式", columns: ["因素", "比较内容", "不要假设"], rows: [
    ["香港一侧", "酒店到西九龙或对应管制站", "香港所有区域距离相同"],
    ["内地一侧", "抵达点到深圳或广州酒店", "地理最近的口岸门到门最快"],
    ["证件", "当前资格、所需证件原件和票务资料", "过去入境过就等于现在符合"],
    ["行李", "楼梯、步行、安检和谁拿每件行李", "快车会消除搬运"],
    ["运营信息", "当前官方开放、列车及服务公告", "旧时间或博客截图仍有效"]
  ] },
  {
    "id": "hong-kong-return-heading",
    "type": "heading",
    "level": 2,
    "text": "西九龙返程：提前多久到站？"
  },
  {
    "id": "hong-kong-return",
    "type": "paragraph",
    "text": "从香港西九龙返内地，登车前还要实名核验、安检及两地出入境手续。港铁给出的通常手续时间约为30–45分钟，护照旅客、繁忙日期或末班车乘客应再多留时间。最早可在发车前90分钟开始办理；实名与车票核验在发车前30分钟截止，登车闸门在前5分钟关闭。三者不是同一个时间点，还须另加去车站和排队的余量。"
  },
  {
    "id": "hong-kong-return-official",
    "type": "sources",
    "title": "西九龙官方乘车流程",
    "items": [
      {
        "label": "港铁：办理流程及截止时间",
        "url": "https://www.highspeed.mtr.com.hk/en/guide/process-departure.html"
      }
    ]
  },
  { id: "workflow-heading", type: "heading", level: 2, text: "用七个决定搭路线" },
  { id: "workflow", type: "list", ordered: true, items: [
    "分配住宿夜数前，先确定国际抵达与离境机场。",
    "向责任机关确认每位旅客的中国内地和香港入境要求，不用路线逻辑推断资格。",
    "分别给广州、深圳、香港一个不可替代理由，没有核心目的的城市直接删除。",
    "选择不重复同一跨境段的单向顺序。",
    "按两侧酒店、行李和当天后续安排选择口岸，而不只比较列车分钟数。",
    "过境后不立即安排不可替代定时活动，并准备晚到酒店方案。",
    "最后才通过点名官方来源查询当前票务和运营公告。"
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "规划示例：不住深圳也能访问" },
  { id: "example", type: "callout", tone: "neutral", title: "这是示例，不是规定行程", body: "旅客在广州有明确的美食和历史重点，在香港有数个完整旅行日，但深圳只有一个建筑项目。单独住深圳会增加两次入住，并让行李多经过一个阶段。若当前交通和寄存支持集中访问，保留广州与香港两个基地，可能以更少摩擦完成深圳重点。若深圳活动需要晚间，或分布在第二个区域，住宿才可能真正有价值。" },
  { id: "failure-heading", type: "heading", level: 2, text: "过境日失败与恢复" },
  { id: "failure", type: "table", caption: "优先保护后续安排", columns: ["失败", "立即处理", "结构教训"], rows: [
    ["所选口岸不适合酒店", "按当前官方交通重算，不追赶不现实路线", "订票前从两边门口判断"],
    ["列车或口岸延误", "通知酒店，放弃可选晚间项目", "过境后不放定时重点"],
    ["证件问题", "按官方边检或承运人指示处理，不自行猜测资格", "不可退订前核实每位旅客"],
    ["深圳住宿只留下几小时", "只保留最强活动，其余删除", "下一版取消深圳住宿"],
    ["香港国际离境变脆弱", "更早进入香港并保护航班", "最后跨境不要放在飞行日"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "什么时候应选更短路线" },
  { id: "switch-rule", type: "paragraph", text: "只有三座城市各有稳定目的，而且过境日可恢复时才使用三个基地。深圳主要为了凑齐城市清单时，取消住宿。广州重点相对额外内地移动太弱时，删除广州。香港只有在既不是目的地也不是口岸时才删除，不能因为地图把过境手续画得看不见就忽略它。" },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "每本护照的入境与再次入境资格已确认。",
    "方向跟随真实航班口岸，且不重复过境。",
    "深圳有足以支撑酒店的明确重点，否则不增加酒店。",
    "所选管制站适合两侧酒店和真实行李。",
    "已复核当前运营信息，过境日留有应变余量。"
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "口岸信息会变化", body: "管制站开放时间、交通、票务和入境要求会变化。临近出行查询香港与内地责任机关及具体运营方。本文不判断签证或入境资格。" },
  { id: "scope", type: "callout", tone: "neutral", title: "本文范围", body: "本文只负责三城顺序和深圳是否值得住一晚。广州—香港与深圳—香港指南分别负责准确交通方式、车站与口岸执行。" },
  { id: "help-cta", type: "callout", tone: "decision", title: "需要检查受口岸影响的路线？", body: "通过 WhatsApp 或邮件发来航班进出口岸、护照国籍、酒店区域、行李和每座城市最想做的一件事，12 小时内回复。这一步先别发护照号码或证件照片。" },
  { id: "sales-heading", type: "heading", level: 2, text: "三座城市之间，交给我们接起来" },
  { id: "gz-tour-offer", type: "paragraph", text: `从广州开始？我们的「广州·顺德·佛山 5 天 4 晚私家团」含机场或车站接送，广州同一家酒店住四晚含早餐，一辆专车走老广州和新广州、顺德和佛山，不进购物店；第 5 天司机可以把你送到确认好的车站，接着往南走。2 人出行每人 ${bodyTourPrice(gzTour, 2, "zh")} 起，4 人每人 ${bodyTourPrice(gzTour, 4, "zh")}，6 人每人 ${bodyTourPrice(gzTour, 6, "zh")}。查看广州 5 天行程。`, link: { label: "查看广州 5 天行程", href: "/zh/tours/guangzhou-shunde-foshan-5-day-private-tour/" } },
  { id: "sz-tour-offer", type: "paragraph", text: `想在深圳多待几天？我们的「深圳亲子科技 4 天 3 晚私家团」深圳同一家酒店住三晚含早餐，两天私人导游、司机和专车（中文客人可以安排中文导游），第 1、4 天在确认好的深圳机场或车站接送：2 人出行每人 ${bodyTourPrice(szTour, 2, "zh")} 起，6 人每人 ${bodyTourPrice(szTour, 6, "zh")}。查看深圳 4 天行程。`, link: { label: "查看深圳 4 天行程", href: "/zh/tours/shenzhen-family-tech-4-day-private-tour/" } },
  { id: "hk-tour-offer", type: "paragraph", text: `中国行最后一站是香港？我们的「北京·西安·桂林·香港 10 天私家团」北京开始、香港结束，不含国际机票：含桂林到西九龙的高铁，以及团内安排的西九龙到香港酒店、再到机场的接送。护照信息在参观故宫前至少 8 天交给我们，故宫、天安门约不上，你付的所有费用全额退还。2 人出行每人 ${bodyTourPrice(hkTour, 2, "zh")} 起，6 人每人 ${bodyTourPrice(hkTour, 6, "zh")}。查看 10 天行程。`, link: { label: "查看 10 天行程", href: "/zh/tours/beijing-xian-guilin-hong-kong-10-day-private-tour/" } },
  { id: "order-copy", type: "paragraph", text: "想把顺序、过关方式和酒店一起排好？从第一次回复到旅程最后一天，都是同一位规划师跟进，按你的航班和火车排好内地段。通过 WhatsApp 或邮件把进出口岸、日期和每座城市最想做的一件事发给我们，12 小时内回复。支付宝或 VBill 付 30% 定金，尾款到了当地再付，不另收手续费。我们是持证旅行社（许可证 L-BJ10587），不进购物店。说说你的整趟行程。", link: { label: "说说你的整趟行程", href: "/zh/services/full-trip-support/" } },
  { id: "faq", type: "faq", title: "三城路线常见问题", items: [
    { question: "广州、深圳、香港在地图上是什么位置？", answer: "大致南北一线：广州在北，深圳在边境上，香港在南。广州南站到香港西九龙的高铁穿过深圳，所以不管往哪个方向，单向走都不用走回头路。" },
    { question: "你们的车能从广州送我们到香港吗？", answer: "只能送到边境。我们自己的司机在中国大陆任何城市服务，不进香港、澳门；可以从广州或深圳送你到福田、罗湖口岸的深圳一侧，或者送到火车站坐去香港的高铁，价格付款前书面确认。" },
    { question: "广州、深圳、香港应该按什么顺序玩？", answer: "按航班单向走：广州进、香港出就是广州→深圳→香港，航班反过来就反向。避免重复走同一段跨境路程。" },
    { question: "广州和香港之间值得在深圳住一晚吗？", answer: "只有当一个具体的深圳重点经得起删减时才值得，“顺路”不是体验。要算上退房、行李、口岸流程和再次入住；如果这一晚迫使你二次过境或削弱最后的国际航班衔接，就把它去掉。" },
    { question: "不换酒店也能去深圳吗？", answer: "可以。如果深圳只是一次有重点的一日游、而且最在意少一次退房，就保留广州酒店，并确认行李寄存。只有把深圳的参观和接下来的香港段一起规划时，才在深圳过夜。" },
    { question: "在香港西九龙坐高铁要提前多久到站？", answer: "港铁给出证件核查、安检和两地边检的通常处理时间约 30–45 分钟；手续最早可在开车前 90 分钟开始，身份与车票核查在开车前 30 分钟截止，登车闸口在开车前 5 分钟关闭。持护照旅客、繁忙日或末班车旅客需要更多时间。" },
    { question: "该走哪个香港口岸？", answer: "从两边酒店门口出发来选，不要只看铁路分钟数：比较香港酒店到西九龙或相关口岸、内地抵达点到深圳或广州酒店、现行证件要求，以及每件行李由谁拿。香港保安局列出多个陆路口岸，各有自己的交通和运营信息。" },
  ] },
  { id: "more-planning", type: "internal-links", title: "继续规划", items: [ { label: "广州城市总览", href: "/zh/destinations/guangzhou/", description: "先决定要不要住，再把航站楼、车站和住宿区当成一条链一起选。" },
    { label: "比较广州—香港交通", href: "/zh/guides/guangzhou-hong-kong-transport-route/", description: "路线顺序确定后再选择车站和方式。" },
    { label: "选择深圳—香港口岸", href: "/zh/guides/shenzhen-hong-kong-transport-route/", description: "按两侧酒店和后续安排匹配管制站。" },
    { label: "测试开口程航班", href: "/zh/guides/china-open-jaw-flights-route-planning/", description: "查看不同抵离城市能否消除折返。" },
    { label: "比较深圳住宿区", href: "/zh/guides/shenzhen-where-to-stay-futian-luohu-nanshan/", description: "从抵达枢纽、香港过关、商务地址、景点、夜间活动和行李比较福田、罗湖与南山。" },
  ] },
  { id: "sources", type: "sources", title: "已复核的官方来源", items: [
    { label: "跨境高速铁路行程规划", url: "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html", publisher: "港铁高速铁路", reviewedAt: "2026-08-12" },
    { label: "香港陆路管制站资料", url: "https://www.sb.gov.hk/eng/special/bound/control.html", publisher: "香港特别行政区政府保安局", reviewedAt: "2026-08-12" },
    { label: "中国签证类型与入境次数", url: "https://cs.mfa.gov.cn/wgrlh/lhqz/", publisher: "外交部领事司", reviewedAt: "2026-08-13" },
    { label: "中华人民共和国出境入境管理法", url: "https://en.nia.gov.cn/n147418/n147458/c155978/content.html", publisher: "国家移民管理局", reviewedAt: "2026-08-13" },
    { label: "240 小时过境免签政策解读", url: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html", publisher: "国家移民管理局", reviewedAt: "2026-08-13" },
    { label: "福田口岸运行时间与落马洲接驳", url: "https://ka.sz.gov.cn/bmfw/katgfw/ftkazt/index.html", publisher: "深圳市人民政府口岸办公室", reviewedAt: "2026-10-20" },
    { label: "罗湖口岸运行时间与罗湖站接驳", url: "https://ka.sz.gov.cn/bmfw/katgfw/lhkazt/index.html", publisher: "深圳市人民政府口岸办公室", reviewedAt: "2026-10-20" },
    { label: "12306 跨境产品车站列表", url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/newTicketRule/newTicketRule-GuangShenGangThirtyDay.html", publisher: "中国铁路 12306", reviewedAt: "2026-08-12" },
    { label: "第 140 届广交会三期日期（2026 年 7 月 24 日）", url: "https://www.mofcom.gov.cn/zwjg/jmxw/md/art/2026/art_784ba2c67efa4c66b430a26ad084ade8.html", publisher: "商务部网站", reviewedAt: "2026-10-19" },
    { label: "第 140 届广交会开幕，全届约 34 万境外采购商到会（2026 年 10 月 15 日）", url: "https://www.news.cn/fortune/20261015/ccf371df7833412893f6f6c3cad031c3/c.html", publisher: "新华社", reviewedAt: "2026-10-19" }
  ] }
]} satisfies StructuredPageBody;
export default body;
