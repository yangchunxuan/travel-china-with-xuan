import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const gzTour = "guangzhou-shunde-foshan-5-day-private-tour";
const szTour = "shenzhen-family-tech-4-day-private-tour";
const hkTour = "beijing-xian-guilin-hong-kong-10-day-private-tour";
// 第 6 个坑和广交会来源 2026 年 11 月 4 日后过期：等商务部公布下一届日期后再替换。
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "在地图上，三座城市大致排成一条从西北到东南的斜线：广州在最上面，深圳在边境上，香港紧挨在深圳南边；广州南站到香港西九龙的高铁就穿过深圳。陆路口岸过了边境会换名字：深圳的福田口岸，对面是香港的落马洲；罗湖口岸对面还叫罗湖。所以从广州进、香港出，就按广州→深圳→香港走；航班反过来，路线也反过来，没有理由别过两次关。深圳要有你想看的地方，才值得住一晚。之后再按两头酒店的位置和行李，选从哪里过关去香港，给过关留够时间。" },
  { id: "quick-choice", type: "comparison", title: "在哪几座城市过夜", columns: [
    { heading: "三个基地", body: "每座城市都有一件你不愿放弃的事，边境两边的酒店也都离要走的口岸近，就选这个。" },
    { heading: "广州＋香港", body: "深圳没有非去不可的地方：路过就好，或者当天去当天回，不换酒店。" },
    { heading: "深圳＋香港", body: "广州不是这趟的重点，而你想去的深圳景点集中在一个区。" }
  ] },
  { id: "traps-heading", type: "heading", level: 2, text: "到了边境才发现的 7 个珠三角路线坑" },
  { id: "traps-list", type: "list", ordered: true, items: [
    "去了香港，内地这一次入境就用掉了。按内地出入境管理，从内地去香港算离境，从香港回来是一次新的入境，当天往返也一样；单次入境签证离境后不会恢复（外交部领事司、国家移民管理局）。「广州→香港→深圳」这样走，签证或免签要能覆盖两次入境；拿单次签证、回程又从广州飞的话，中间去一天香港，就进不了内地赶那班飞机了。",
    "240 小时过境免签里，香港算单独的地区，这一点正反两面都有影响。从本国飞进广州、经香港离开，符合条件的护照持有人最长可免签停留 10 天；从香港飞进来，去深圳、广州转一圈再回香港离开，就不算过境，因为来处和去处是同一个地区。入境机场和出境口岸要在国家移民管理局公布的范围内，以移民局规定和边检当场决定为准。",
    "西九龙有 30 分钟截止。从香港回内地，港铁在开车前 30 分钟停止实名查验、安检和出入境手续，开车前 5 分钟关闸；手续通常要 30–45 分钟，所以至少提前 75 分钟到站（持护照的，开车前 90 分钟就去）。误了车，在 12306 买的票只能改签当天其他车次，而且要有余票（12306，2026 年 10 月 20 日核对）。",
    "陆路口岸会关门。深圳市口岸办公布：福田口岸 6:30—22:30，罗湖口岸 6:30—24:00；晚上才到深圳，可能赶到时口岸已经关了。",
    "「广州」不是一个站。12306 的跨境产品把广州南站（在番禺）和广州东站分开列；去错一个，上车前还要再横穿一次城。",
    "广交会期间不是平常的日子。第 140 届广交会分三期：2026 年 10 月 15—19 日、10 月 23—27 日、10 月 31 日—11 月 4 日（商务部），全届约 34 万境外采购商到会（新华社）。你在广州住的那几晚如果落在这几周，就是跟他们一起订酒店、订火车：先把这两样定下来，再排别的。",
    "我们的车只送到边境。我们的司机只在中国大陆服务，所以只能把你送到口岸的深圳一侧或火车站，两边的出入境大厅要你自己带着行李走过去。到了香港那边，福田口岸出来是落马洲，罗湖口岸出来还叫罗湖（深圳市口岸办）；在香港接你的人，要按这个地名来等你。",
  ] },
  { id: "traps-sales", type: "paragraph", text: "第 4、5、7 个坑都出在内地去边境的路上，晚一步、错一步都没得补：福田口岸 22:30 关，罗湖 24:00 关，去错广州的车站，上车前还要横穿一次城。这一段正好交给包车：我们自己的司机可以在广州白云机场或你的广州酒店接你，带着你和行李送到深圳酒店，再送到福田或罗湖口岸的深圳一侧，或者直接送到广州南站坐去香港的高铁，不用拖着箱子换地铁。把航班或车次、酒店、日期和过关方式发给我们，12 小时内回复；付款前书面确认你这个时间有车、车型和总价。中国大陆任何城市都能派车（不含港澳）。咨询广州—深圳包车。", link: { label: "咨询广州—深圳包车", href: "/zh/services/private-car-and-driver/#car-enquiry" } },
  { id: "official-heading", type: "heading", level: 2, text: "口岸是一套流程，不是铁路图上的一条线" },
  { id: "official", type: "paragraph", text: "香港有好几个铁路和公路陆路口岸，各有各的交通接驳和开放时间（香港保安局）；西九龙的高铁由港铁提供官方行程规划。没有哪个口岸对所有人都最好：对你最合适的，是离两边酒店都近、护照、行李和第二天的安排都走得通的那个。出发前不久再查一次官方公告。" },
  { id: "gateway-heading", type: "heading", level: 2, text: "让进出中国的城市决定方向" },
  { id: "gateway", type: "table", caption: "先定进出城市，再排中间的城市", columns: ["进出城市", "可能顺序", "什么问题会推翻它"], rows: [
    ["广州一带进，香港出", "广州→深圳→香港", "深圳有没有值得住一晚的地方？"],
    ["香港进，广州一带出", "香港→深圳→广州", "哪个口岸离你的香港酒店近？"],
    ["国际航班进出都在香港", "香港放在一头或两头，尽量少过关", "每本护照都有进内地的签证或免签资格吗？从香港进内地、再回香港出，不算 240 小时过境。"],
    ["国际航班进出都在内地城市", "想去香港玩才加，不要把它当成顺路的一站", "去过香港后，每本护照还能再进内地吗？"]
  ] },
  { id: "shenzhen-test-heading", type: "heading", level: 2, text: "深圳住宿测试" },
  { id: "shenzhen-test", type: "list", ordered: false, items: [
    "写下行程缩短时你仍会保留的那件深圳的事。「刚好顺路」不算。",
    "看看它是不是离深圳酒店和下一个口岸都近；一个离两边都远的有名街区，会多出两趟横穿市区的路。",
    "问问自己：从广州酒店当天来回，能不能得到同样的东西？行李寄存要提前确认。",
    "算一算退房、搬行李、过关、再入住要花多少工夫；住这一晚多出来的游玩时间比这些值，才值得住。",
    "如果深圳这一晚逼你多过一次关，或者让从香港回国的航班变得很赶，先把它去掉。"
  ] },
  { id: "one-base-heading", type: "heading", level: 2, text: "保留广州同一家酒店，还是在深圳过夜？" },
  { id: "one-base-choice", type: "list", ordered: false, items: [
    "如果深圳只是当天来回，你又不想再退一次房，就保留广州酒店，把大件行李留在那里。但如果接着去香港，要算上当晚回广州的路，和第二天早上去车站的路。",
    "如果深圳和接下来的香港段一起排，就在深圳住一晚。广州→深圳，住一晚，再去香港，省掉中间回广州那一趟。多一家酒店、多搬一次行李，和省下的路程比一比；深圳住哪个区，按你要去的地方和要走的口岸来定。",
    "如果想在香港玩几天，比一比住在香港和从内地酒店每天去香港来回哪个划算。每次过关的时间和车费都要算进去，订之前确认每本护照都能再进内地。只看房价便宜，说明不了整趟更省钱或更轻松。"
  ] },
  { id: "crossing-heading", type: "heading", level: 2, text: "从两边酒店门口选择口岸" },
  { id: "crossing", type: "table", caption: "定好城市顺序再选口岸", columns: ["因素", "比较内容", "不要假设"], rows: [
    ["香港一侧", "酒店到西九龙、落马洲或罗湖", "香港哪个区都一样近"],
    ["内地一侧", "抵达点到深圳或广州酒店", "地图上最近的口岸，门到门就最快"],
    ["证件", "每本护照现行的入境规定，和用这个名字买的车票", "以前进过内地，现在就一定符合"],
    ["行李", "楼梯、步行、安检和谁拿每件行李", "坐了快车就不用搬行李"],
    ["开放时间和车次", "当前官方的开放时间、时刻表和公告", "旧时间或博客截图仍有效"]
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
    "text": "从车次往回推：西九龙至少留 75 分钟，再加上从酒店过去的路程。持护照、碰上繁忙日或坐末班车的，开检时就到，也就是开车前 90 分钟（港铁）。"
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
    "先定好国际航班进出哪两座城市，再分配住几晚。",
    "向主管部门确认每位旅客进中国内地和香港的规定；能不能入境不是路线说了算。",
    "分别写下只有在广州、深圳、香港才能做的一件事；哪座城市一件都写不出，就不给它安排住宿。",
    "选一个不重复过同一段边境的单向顺序。",
    "按两边酒店、行李和当天接下来的安排选口岸，不要只比火车几分钟。",
    "过关后别马上排有固定时间的事，并跟下一家酒店说好可能晚到。",
    "最后再到下面列出的官方网站查车票和开放公告。"
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "规划示例：不住深圳也能访问" },
  { id: "example", type: "callout", tone: "neutral", title: "这是示例，不是规定行程", body: "一家人在广州想吃、想逛老街，在香港想玩几天，在深圳只想看一座建筑：他们只住两家酒店，行李留在广州，深圳当天去当天回。如果那个深圳的点要待到晚上，或者分在两个区，在深圳住一晚才值得。" },
  { id: "failure-heading", type: "heading", level: 2, text: "过关那天出了岔子怎么办" },
  { id: "failure", type: "table", caption: "优先保护后续安排", columns: ["出了什么事", "现在怎么办", "下次怎么排"], rows: [
    ["口岸离酒店太远", "按当前官方交通重新算路线，不要硬赶不现实的路线", "订票前从两边酒店门口算好"],
    ["火车或过关延误", "通知酒店，放弃可去可不去的晚间安排", "过关后不排有固定时间的事"],
    ["证件出了问题", "听边检或承运方的指示，不要自己猜能不能入境", "订不能退的东西前，先核实每位旅客"],
    ["住深圳那晚只剩几个小时能玩", "只留最想做的一件，其余删掉", "下次不住深圳"],
    ["离港航班时间太紧", "早点去香港，先保住航班", "尽量别在飞的那天过关"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "什么时候应选更短路线" },
  { id: "switch-rule", type: "paragraph", text: "只有三座城市都有砍行程也不会砍掉的理由，而且过关那天晚一点也不会打乱后面的安排，才三座城市都住。深圳那一晚只是为了凑城市数，就去掉。广州想做的事不值得多一段内地交通，就去掉广州。香港只有在你既不去玩、也不从那里飞的时候才去掉，别因为地图上看不出边境就忽略它。" },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "口岸信息会变化", body: "口岸的开放时间、交通、票务和入境规定都会变。出发前不久查一下香港和内地主管部门以及运营方的公告。本文不判断你要不要签证、能不能入境。" },
  { id: "help-cta", type: "callout", tone: "decision", title: "拿不准顺序、口岸，或者要几次入境？", body: "通过 WhatsApp 或邮件发来进出城市、护照国籍、酒店区域、行李和每座城市最想做的一件事。12 小时内回复你适合两边酒店的顺序和口岸；内地段要用车的话，价格付款前书面确认。签证和入境资格以官方为准。这一步先别发护照号码或证件照片。" },
  { id: "sales-heading", type: "heading", level: 2, text: "三座城市之间，交给我们接起来" },
  { id: "gz-tour-offer", type: "paragraph", text: `从广州开始？我们的「广州·顺德·佛山 5 天 4 晚私家团」含机场或车站接送，广州同一家酒店住四晚含早餐，一辆专车走老广州和新广州、顺德和佛山，含清晖园、佛山祖庙、南风古灶门票和所订的醒狮表演，不进购物店；第 5 天司机可以把你送到确认好的车站，接着往南走。2 人出行每人 ${bodyTourPrice(gzTour, 2, "zh")} 起，4 人每人 ${bodyTourPrice(gzTour, 4, "zh")}，6 人每人 ${bodyTourPrice(gzTour, 6, "zh")}。查看广州 5 天行程。`, link: { label: "查看广州 5 天行程", href: "/zh/tours/guangzhou-shunde-foshan-5-day-private-tour/" } },
  { id: "sz-tour-offer", type: "paragraph", text: `带着上学年龄的孩子、想在深圳多待几天？我们的「深圳亲子科技 4 天 3 晚私家团」以深圳科学技术馆和华强北为主，深圳同一家酒店住三晚含早，两天私人导游、司机、专车和所列门票（中文客人可以安排中文导游），第 1、4 天在确认好的深圳机场或车站接送：2 人出行每人 ${bodyTourPrice(szTour, 2, "zh")} 起，4 人每人 ${bodyTourPrice(szTour, 4, "zh")}，6 人每人 ${bodyTourPrice(szTour, 6, "zh")}。查看深圳 4 天行程。`, link: { label: "查看深圳 4 天行程", href: "/zh/tours/shenzhen-family-tech-4-day-private-tour/" } },
  { id: "gz-sz-combo", type: "paragraph", text: "要走完整的广州→深圳→香港？这两条团可以首尾相接：广州团第 5 天，司机送你去车站；深圳团第 1 天，司机在深圳的车站接你去酒店；深圳团第 4 天，送你到确认好的车站坐去香港的高铁，也可以另外书面报价，送到福田或罗湖口岸的深圳一侧。两城之间的火车不在两条团里；不想拖着行李上火车，可以请我们报价，从广州酒店直接开到深圳酒店。这正是本文推荐的顺序，每一笔价格都在付款前书面确认。两条团可以一起订。", link: { label: "两条团可以一起订", href: "/zh/services/full-trip-support/#trip-enquiry" } },
  { id: "hk-tour-offer", type: "paragraph", text: `中国行最后一站是香港？我们的「北京·西安·桂林·香港 10 天私家团」北京开始、香港结束，不含国际机票：含桂林到西九龙的高铁，以及团内安排的西九龙到香港酒店、再到机场的接送。内地段以这趟去香港的高铁结束，所以从第三国飞进北京、持符合条件护照的旅客，有机会用 240 小时过境免签走完，不用办旅游签证；能否免签由边检决定，我们不代办签证。护照信息在参观故宫前至少 8 天交给我们，故宫、天安门约不上，你付的所有费用全额退还。2 人出行每人 ${bodyTourPrice(hkTour, 2, "zh")} 起，4 人每人 ${bodyTourPrice(hkTour, 4, "zh")}，6 人每人 ${bodyTourPrice(hkTour, 6, "zh")}。查看 10 天行程。`, link: { label: "查看 10 天行程", href: "/zh/tours/beijing-xian-guilin-hong-kong-10-day-private-tour/" } },
  { id: "order-copy", type: "paragraph", text: "想把顺序、过关方式和酒店一起排好？从第一次回复到旅程最后一天，都是同一位规划师跟进，按你的航班和火车排好内地段。通过 WhatsApp 或邮件把进出城市、日期和每座城市最想做的一件事发给我们，12 小时内回复。用 VBill 刷卡链接付 30% 定金，尾款到了当地再付。我们是持证旅行社（许可证 L-BJ10587），不进购物店。说说你的整趟行程。", link: { label: "说说你的整趟行程", href: "/zh/services/full-trip-support/" } },
  { id: "faq", type: "faq", title: "三城路线常见问题", items: [
    { question: "广州、深圳、香港在地图上是什么位置？", answer: "大致是一条从西北到东南的斜线：广州在最上面，深圳在边境上，香港在深圳南边。广州南站到香港西九龙的高铁穿过深圳，所以不管往哪个方向，单程走都不用走回头路。在香港地图上找福田口岸，要找对面的落马洲；罗湖口岸两边都叫罗湖。" },
    { question: "广州、深圳、香港应该按什么顺序玩？", answer: "按航班单向走：广州进、香港出就是广州→深圳→香港，航班反过来就反向。同一段边境别来回过两次。" },
    { question: "广州和香港之间值得在深圳住一晚吗？", answer: "只有深圳有一件砍行程也不会砍掉的事才值得，「顺路」不算。要算上退房、行李、过关和再次入住；如果这一晚逼你多过一次关，或者让从香港回国的航班变得很赶，就把它去掉。" },
    { question: "不换酒店也能去深圳吗？", answer: "可以。如果深圳只是当天来回、你又不想再退一次房，就保留广州酒店，并确认行李寄存。只有把深圳和接下来的香港段一起排时，才在深圳住一晚。" },
    { question: "在香港西九龙坐高铁要提前多久到站？", answer: "港铁给出证件核查、安检和两地边检的通常处理时间约 30–45 分钟；手续最早可在开车前 90 分钟开始，身份与车票核查在开车前 30 分钟截止，登车闸口在开车前 5 分钟关闭。至少留 75 分钟；持护照旅客、繁忙日或末班车旅客要留得更多。" },
    { question: "你们的车能从广州送我们到香港吗？", answer: "只能送到边境。我们自己的司机在中国大陆任何城市服务，不进香港、澳门；可以从广州或深圳送你到福田、罗湖口岸的深圳一侧，或者送到火车站坐去香港的高铁，价格付款前书面确认。" },
    { question: "该走哪个香港口岸？", answer: "从两边酒店门口出发来选，不要只看火车几分钟：比较香港酒店到西九龙、落马洲或罗湖，内地抵达点到深圳或广州酒店，每本护照的入境规定，以及每件行李由谁拿。香港保安局列出好几个陆路口岸，各有各的交通接驳和开放时间。" },
  ] },
  { id: "scope", type: "callout", tone: "neutral", title: "本文范围", body: "本文只讲三座城市的顺序，以及深圳值不值得住一晚。火车、车站和口岸的细节，看下面的广州—香港和深圳—香港两篇。" },
  { id: "more-planning", type: "internal-links", title: "继续规划", items: [ { label: "广州城市总览", href: "/zh/destinations/guangzhou/", description: "先决定要不要住，再把航站楼、车站和住宿区当成一条链一起选。" },
    { label: "比较广州—香港交通", href: "/zh/guides/guangzhou-hong-kong-transport-route/", description: "路线顺序确定后再选择车站和方式。" },
    { label: "选择深圳—香港口岸", href: "/zh/guides/shenzhen-hong-kong-transport-route/", description: "按两边酒店和第二天的安排选口岸。" },
    { label: "港澳往返与内地入境次数", href: "/zh/guides/hong-kong-macau-mainland-reentry-count/", description: "单次入境签证去过香港后还能不能回内地。" },
    { label: "中国大陆任何城市的包车与司机", href: "/zh/services/private-car-and-driver/", description: "广州、深圳送站或送到口岸深圳一侧，书面报价。" },
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
    { label: "铁路退票、改签规则", url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/info/orderWarmTips.html", publisher: "中国铁路 12306", reviewedAt: "2026-10-20" },
    { label: "第 140 届广交会三期日期（2026 年 7 月 24 日）", url: "https://www.mofcom.gov.cn/zwjg/jmxw/md/art/2026/art_784ba2c67efa4c66b430a26ad084ade8.html", publisher: "商务部网站", reviewedAt: "2026-10-19" },
    { label: "第 140 届广交会开幕，全届约 34 万境外采购商到会（2026 年 10 月 15 日）", url: "https://www.news.cn/fortune/20261015/ccf371df7833412893f6f6c3cad031c3/c.html", publisher: "新华社", reviewedAt: "2026-10-19" }
  ] }
]} satisfies StructuredPageBody;
export default body;
