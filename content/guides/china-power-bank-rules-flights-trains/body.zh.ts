import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "lead", type: "lead", text: "坐中国境内航班，充电宝必须随身携带，要标明额定能量（100 瓦时以内不需要航空公司批准），并且自 2025 年 6 月 28 日起要有清晰的 3C 标识、不属于被召回的型号批次。飞行中不得用充电宝给任何设备充电。坐中国的火车，限额是标识清晰、不超过 100 瓦时，铁路的目录里没有 3C 这一条。外国游客最容易卡在这里：3C 是中国自己的认证标志，国外买的充电宝往往没有；过得了火车站安检，不代表过得了机场安检。"},
    { id: "answer", type: "callout", title: "兼顾全程的稳妥选择", tone: "decision", body: "携带一只外观完好、标志清晰、额定能量不超过 100Wh 的充电宝；行程包含中国境内航班时还要有清晰 CCC 标志。放在容易取出的手提行李内，防止误启动和短路，并按准确型号查询最新召回信息。这是兼顾两种交通的实用方案，但不能保证航空公司、机场或安检会接受损坏或召回产品。" },
    { id: "mode-heading", type: "heading", level: 2, text: "飞机与火车检查的是两套规则" },
    { id: "mode-table", type: "table", caption: "截至 2026 年 8 月 12 日复核的核心规则", columns: ["检查项", "中国境内航班", "中国铁路旅程"], rows: [
    ["放在哪里", "随身或手提行李，严禁托运", "妥善保护并便于安检查验"],
    ["额定能量", "不超过 100Wh 无需航空公司批准；超过 100Wh 但不超过 160Wh 须经航空公司批准且每人最多两只；超过 160Wh 禁止", "标志清晰且额定能量不得超过 100Wh"],
    ["能量标志", "须直接标明，或能用机身标注的其他参数计算", "额定能量标志必须清晰"],
    ["CCC 要求", "自 2025 年 6 月 28 日起，境内航班禁止无 CCC、CCC 不清晰或属于召回型号/批次的产品", "本文引用的铁路目录规定是清晰标志和 100Wh；不要把民航 CCC 规则直接说成铁路规则"],
    ["途中使用", "飞行过程中不得用充电宝给设备充电；有开关的充电宝应全程关闭", "遵从列车安全指示；发热、鼓包、破损或有异味时立即停用"],
    ["运营方附加条件", "航空公司和具体航线的危险品条件可能更严格", "安检与铁路人员执行现行铁路规定，也可能要求现场查验"]
  ] },
    {id: "why-heading", type: "heading", level: 2, text: "为什么中国只认有 3C 标识的充电宝"},
    {id: "why-copy", type: "paragraph", text: "3C（中国强制性产品认证）是 2024 年 8 月 1 日起在中国销售的每一个充电宝都必须有的标志。民航局 2025 年 6 月推出这条乘机规定时，给出的原因是：当年充电宝等锂电池引起的起火冒烟事件增多，多家厂商因电芯安全隐患召回多个批次，市场监管总局也撤销或暂停了一些厂家的 3C 证书。CE 或 FCC 标志代表的是别国的规定，不能代替 3C。"},
    { id: "domestic-heading", type: "heading", level: 2, text: "2025 年 CCC 限制明确针对境内航班" },
    { id: "domestic-copy", type: "paragraph", text: "中国民航局公告规定，自 2025 年 6 月 28 日起，境内航班旅客不得携带没有 CCC 标志、CCC 标志不清晰或属于召回型号与批次的充电宝。CCC 是中国强制性产品认证标志，CE、FCC、航空图标或回收标志都不是同一个标志。不要给旧产品手绘 CCC，也不要使用来路不明卖家提供的贴纸；安检查的是产品原有标志，同时还要确认它不在召回范围。" },
    { id: "itinerary-boundary", type: "callout", title: "国际机票中也可能包含中国境内航段", tone: "warning", body: "逐段阅读机票。例如北京—成都再接成都—新加坡，即使开在一张国际联程票内，北京—成都仍是境内航班。另买的境内定位航班同样要检查 CCC。国际航段还应核对实际承运航空公司和出发机场，因为航空公司及当地规则可能在基础限制上增加要求。" },
    {id: "traps-heading", type: "heading", level: 2, text: "让充电宝卡在安检带上的六个错误"},
    {id: "traps-list", type: "list", ordered: true, items: ["带着家里那个就出门。在国外买的充电宝往往根本没有 3C 标识，坐境内航班光这一点就带不走。", "以为国际联程就全程按国际算。北京飞成都和成都飞新加坡在同一张机票上，北京到成都这段仍是境内航班，3C 规定照样适用。", "过了火车站安检，就以为机场也一样。铁路查的是 100 瓦时限额；机场安检还要看 3C 标识和召回名单。", "只看盒子上最大的数字。30,000 毫安时、3.7 伏，就是 111 瓦时：超过铁路 100 瓦时的限额，也落进了要航空公司批准的区间。", "放进可能被托运的包。充电宝永远不能进货舱，交出任何手提行李之前，先把它拿出来。", "在飞机上给手机充电。坐中国境内航班，即使是有 3C 标识的充电宝也不能给设备充电；登机前先充好。"]},
    { id: "label-heading", type: "heading", level: 2, text: "出门前直接读充电宝机身标志" },
    { id: "label-table", type: "table", caption: "一份可核验的充电宝身份信息", columns: ["在机身上找", "为什么重要", "危险信号"], rows: [
    ["Wh 额定能量", "安检可直接与交通方式限值比较", "缺失、磨掉、被覆盖或互相矛盾"],
    ["标称电压和容量", "两项均有标注时可按民航局公式换算 Wh", "只有营销容量，没有电压或额定能量"],
    ["制造商、型号及批次/序列信息", "用于查询召回并准确识别产品", "没有可追责制造商或型号的通用产品"],
    ["CCC 标志", "中国境内航班 2025 年新限制要求", "没有、后贴、无法辨认或与其他图标混淆"],
    ["外壳与接口", "判断电池是否完好、端子能否被保护", "鼓包、裂缝、渗漏、焦痕、松动、异常发热"]
  ] },
    { id: "math-heading", type: "heading", level: 2, text: "只能用正确的电压把 mAh 换算成 Wh" },
    { id: "math-copy", type: "paragraph", text: "民航局给出的公式是 Wh = V × Ah，且 Ah = mAh ÷ 1,000。机身若标注 20,000mAh、标称电压 3.7V，计算结果为 74Wh；30,000mAh、3.7V 则是 111Wh，超过铁路 100Wh 上限，并进入民航需要航空公司批准的区间。这只是算术例子，不是安检合格证。USB 输出电压不一定等于电芯标称电压；计算也不能弥补 CCC 缺失、标签不清、产品召回或外壳损坏。" },
    { id: "math-warning", type: "callout", title: "不要用包装盒上最大的数字计算", tone: "warning", body: "营销页面常把 mAh 放得很大，而额定能量和标称电压印在机身小字里。安检查实物，不以网店截图为准。如果充电宝本身看不清必要参数，旅行前就换掉，不要在现场拿包装争论。" },
    { id: "recall-heading", type: "heading", level: 2, text: "有 CCC 也不能抵消产品召回" },
    { id: "recall-list", type: "list", ordered: true, items: [
    "记录机身完整制造商、型号和批次或序列信息。",
    "临出发前查询制造商正式召回公告及中国市场监管部门的官方召回信息。",
    "匹配准确型号和受影响批次；品牌或容量相似并不够。",
    "确认被召回后应停止使用，按制造商官方退换或处置流程办理，不要带到机场让安检替你判断。",
    "购买与旅行间隔很久时再次查询，因为召回可能后来才发布。"
  ] },
    { id: "packing-heading", type: "heading", level: 2, text: "按全程最严格的一段打包" },
    { id: "packing-list", type: "list", ordered: true, items: [
    "按顺序列出每段飞机和火车，包括国际票中的境内航段和另买的定位航班。",
    "使用全程最严格限值。即使航空公司批准 120Wh，只要有铁路段，它仍不符合铁路不超过 100Wh 的要求。",
    "拍下标签和序列信息留档，但不要遮住实物标志。",
    "把充电宝放在不会受挤压、容易取出的手提行李中，保护裸露端子并防止按钮误触。",
    "不要放进可能在登机口被托运的包；交出任何手提包前先取出充电宝。",
    "携带完好线缆并在登机前给设备充好电，不让计划依赖飞行中使用充电宝。"
  ] },
    { id: "security-heading", type: "heading", level: 2, text: "通过机场或车站安检时" },
    { id: "security-copy", type: "paragraph", text: "让充电宝容易取出，允许工作人员查看标志和外观。超过 100Wh 的产品如被要求出示航空公司批准，订票代理的一条聊天消息不一定等于实际承运航空公司批准，应在出发前完成承运人的正式流程并保存凭证。被拒绝后不要隐瞒第二只、转交同伴或改动标签。" },
    { id: "failure-heading", type: "heading", level: 2, text: "安检拒绝充电宝时怎样避免误车误机" },
    { id: "failure-table", type: "table", caption: "按拒绝原因处理", columns: ["原因", "立即行动", "不要误以为"], rows: [
    ["境内航班无 CCC 或标志不清", "接受现场指示，询问机场是否有官方放弃或暂存渠道", "收据、网店页面或自行贴标可以修复实物标志"],
    ["额定能量缺失或无法换算", "只展示机身原有参数；信息不足就停止携带", "工作人员必须接受你自己的估算"],
    ["超过相应 Wh 限制", "只有民航规则允许且事先获得航空公司批准时才使用批准；铁路仍须不超过 100Wh", "现场一定能临时批准，或一种交通批准可用于另一种"],
    ["召回或损坏", "停止使用并按官方指示处置", "托运、随意邮寄或交给其他旅客是安全替代"],
    ["手提行李将被托运", "交包前取出充电宝并留在客舱", "登机口行李牌会改变禁止托运规则"]
  ] },
    { id: "storage-warning", type: "callout", title: "不要把机场暂存当成行程保障", tone: "warning", body: "民航局要求机场酌情设置旅客自弃或暂存区域，但具体机场是否提供、适用条件、时间、费用和领取流程都不同。应直接向指定机场核实。临近起飞时，保住航班比寻找非官方快递或把产品交给陌生人重要。" },
    { id: "onboard-heading", type: "heading", level: 2, text: "途中继续观察电池状态" },
    { id: "onboard-list", type: "list", items: [
    "飞行过程中不得使用充电宝给设备充电；有开关时应全程关闭。",
    "鼓包、开裂、渗漏、进水、异常发热或有化学异味的产品一律不要使用。",
    "机上出现发热、烟雾或异味时，立即停止处理并通知机组或列车工作人员，不要塞进包里或用衣物覆盖。",
    "不要在酒店床上或软物覆盖下无人看管充电，应使用完好线缆和稳定表面。",
    "重摔后即使指示灯还能亮，下一段出发前也要检查外壳。"
  ] },
    {id: "sale-heading", type: "heading", level: 2, text: "又坐飞机又坐火车的行程，交给我们打理"},
    {id: "sale-copy", type: "paragraph", text: "第一次来中国，行程大多两样都有：我们的 8 天路线从北京坐火车到西安，再从西安飞上海，每个车站和机场都有司机接送。行程里其他有截止时间的事，可没有安检带这么好说话。故宫当天不卖票：参观前 7 天北京时间 20:00 放票，每人用自己的护照实名预约；2025 年国庆假期第一天（10 月 1 日），故宫预约页面就已显示 10 月 2 日至 7 日全部约满。参观前至少 8 天交给我们并付款，就在预约保证范围内：约不上，服务费和门票钱全额退还；只剩不到 8 天，这份保证就用不上了。"},
    { id: "handoff-options", type: "comparison", title: "这些可以交给我们", columns: [
      { heading: `景点预约：每人${bodyReservationFee("zh")}`, body: "每个景点收一次，门票按票面价另付，按每位旅客本人的护照实名预约：故宫、兵马俑、成都大熊猫基地等都可以。", items: ["参观前至少 8 天提交需求并付款，就在预约保证范围内：约不上，服务费和票款全额退还。", "只剩不到 8 天，这份保证就用不上了。"] },
      { heading: "专车和司机", body: "机场、车站接送或包车一天，中国大陆任何城市都能安排。", items: ["司机是我们自己的。", "付款前书面确认价格。"] },
      { heading: `整趟行程：每人${bodyTourPrice(tour8, 6, "zh")}起`, body: `北京、西安、上海 8 天私家团，2 人出行每人${bodyTourPrice(tour8, 2, "zh")}，6 人每人${bodyTourPrice(tour8, 6, "zh")}。加上桂林的 10 天路线，2 人每人${bodyTourPrice(tour10, 2, "zh")}。`, items: ["含早餐的四星酒店、游览日的私人导游和专车、全部接送、城市之间的火车和航班，以及行程里的实名门票。", "如果我们订不到故宫或天安门，退还你已付的全部费用，前提是故宫参观前至少 8 天把护照信息发给我们。"] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "交给我们安排", items: [{label: "查看北京、西安、上海 8 天路线", href: "/zh/tours/beijing-xian-shanghai-8-day-private-tour/", description: "每日安排、酒店和公开价格表。"}, {label: "查看可以代预约的景点", href: "/zh/services/china-attraction-reservations/", description: "每个景点的放票时间、价格和预约保证。"}, {label: "预约接机、接站或包车", href: "/zh/services/private-car-and-driver/", description: "中国大陆任何城市。告诉我们路线、日期和行李。"}, {label: "让规划师安排整趟行程", href: "/zh/services/full-trip-support/", description: "告诉我们日期和预算，提交行程需求免费。"}]},
    {id: "how-to-book", type: "callout", tone: "decision", title: "怎么预订", body: "在上面任何一个页面，通过 WhatsApp 或邮件告诉我们日期、人数和想看的地方。规划师 12 小时内回复，付款前你会先收到书面报价；从第一次回复到你旅行的最后一天，都是同一位规划师跟进。预订时用支付宝或 VBill 付 30% 定金，余款到了中国再付，我们不另收手续费。Homeground China 是持证旅行社（许可证 L-BJ10587），导游和司机都是我们自己的，行程不进购物店。"},
    { id: "scope", type: "callout", title: "本文边界与实时规则", tone: "neutral", body: "本文只讨论普通旅客充电宝，不覆盖行动辅助设备、安装在电脑内的电池、专业电池组、货运或废弃处理法律。下方民航公告与铁路目录复核于 2026 年 8 月 12 日。临出发前仍要核对实际承运航空公司、出发机场、铁路公告和准确型号；现场由工作人员作运行决定，Homeground 不会凭照片认证产品。" },
    { id: "faq", type: "faq", title: "充电宝常见问题", items: [
    { question: "充电宝能托运吗？", answer: "不能。乘坐中国境内航班，充电宝必须随身或放在手提行李中，严禁托运。也不要放进可能在登机口被托运的包；交出任何手提包之前先取出充电宝，登机口的行李牌不会改变禁止托运的规定。" },
    { question: "机身写着 20,000mAh，超标吗？", answer: "按标称电压 3.7V 算是 74Wh，低于铁路 100Wh 上限，也在民航无需航空公司批准的范围内。民航局公式是 Wh = V × Ah，且 Ah = mAh ÷ 1,000。不过这只是算术例子，不是安检合格证：机身标志仍要清晰，产品不在召回范围，外壳也要完好。" },
    { question: "CCC 标志是什么？CE 或 FCC 一样吗？", answer: "不一样。CCC 是中国强制性产品认证标志，CE、FCC、航空图标或回收标志都不是同一个标志。自 2025 年 6 月 28 日起，境内航班禁止携带没有 CCC 标志、CCC 标志不清晰，或属于召回型号与批次的充电宝。安检看的是产品原有的标志。" },
    { question: "充电宝能带上中国的高铁吗？", answer: "可以，但机身标志要清晰，额定能量不得超过 100Wh。把它保护好并便于安检查验，遵从列车安全指示；一旦发热、鼓包、破损或有异味，立即停用。能通过火车安检，不代表能通过机场安检，境内航班还要看清晰的 CCC 标志。" },
    { question: "飞行途中可以用充电宝给手机充电吗？", answer: "飞行途中不可以。不得用充电宝给设备充电，有开关的充电宝应全程关闭。请携带完好线缆，并在登机前把设备充好电，不要让计划依赖飞行中使用充电宝。" },
    { question: "安检不让带充电宝，怎么办？", answer: "接受现场指示，并问清机场有没有官方的自弃或暂存渠道。民航局要求机场酌情设置旅客自弃或暂存区域，但具体机场是否提供，以及适用条件、时间、费用和领取流程都不一样。临近起飞时，保住航班比找非官方快递或把产品交给陌生人更重要。" }, {question: "为什么中国坐飞机只认 3C 充电宝？", answer: "3C 是中国的强制性产品认证标志，2024 年 8 月 1 日起在中国销售的充电宝都必须有。充电宝起火冒烟事件增多、电芯问题召回和证书被暂停之后，民航局从 2025 年 6 月 28 日起把它定为乘机规定。CE 或 FCC 标志不能代替。"}, {question: "去哪里买有 3C 标识的充电宝？", answer: "在中国内地销售的充电宝必须有 3C 标识，所以落地后在当地买的一般都有；第一次坐境内航班之前，检查一下机身上的 3C 标识和额定能量。"}] },
    { id: "links", type: "internal-links", title: "继续完成设备与交通检查", items: [
    { label: "中国插头、电压和转换器", href: "/zh/guides/china-power-plugs-voltage-and-adapters/", description: "把电池运输规则与充电电压、插头形状分开。" },
    { label: "中国境内航班票价组合和行李", href: "/zh/guides/china-domestic-flight-fare-bundle-baggage/", description: "到机场前核查票价与实际承运人。" },
    { label: "中国全程铁路路线规划", href: "/zh/guides/china-rail-only-route/", description: "检验所有长距离转移是否适合不用飞机。" },
    { label: "了解 12306 列车订餐配送", href: "/zh/guides/how-food-reaches-your-seat-on-china-train/", description: "看懂 12306 餐食从供餐站到车厢座位的接力流程、截止时间、座位信息和安全回退方案。" },
  ] },
    { id: "sources", type: "sources", title: "已复核的官方来源", items: [
        {label: "2024 年 8 月 1 日起，未获 CCC 认证的锂电池和移动电源不得出厂、销售", url: "https://paper.people.com.cn/zgnybwap/html/2023-07/31/content_26009869.htm", publisher: "中国能源报（人民日报）", reviewedAt: "2026-10-20"},
        {label: "民航局通知：2025 年 6 月 28 日起境内航班的 3C 规定及原因", url: "https://www.caac.gov.cn/English/News/202507/t20250709_227894.html", publisher: "中国民用航空局", reviewedAt: "2026-10-20"},
        {label: "故宫博物院票务：放票时间与实名规则", url: "https://www.dpm.org.cn/subject_booking/", publisher: "故宫博物院", reviewedAt: "2026-08-22"},
        {label: "2025 年国庆假期首日，故宫 10 月 2 日至 7 日门票已约满", url: "https://www.yicai.com/news/102851899.html", publisher: "第一财经", reviewedAt: "2026-10-19"},
    { label: "民航局关于 CCC 标志和召回充电宝的公告（2025）", url: "https://www.caac.gov.cn/English/News/202507/t20250709_227894.html", publisher: "中国民用航空局", reviewedAt: "2026-08-12" },
    { label: "民航旅客携带充电宝规定及额定能量换算", url: "https://www.caac.gov.cn/big5/www.caac.gov.cn/XXGK/XXGK/TZTG/201511/t20151105_11173.html", publisher: "中国民用航空局", reviewedAt: "2026-08-12" },
    { label: "铁路旅客禁止、限制携带和托运物品目录", url: "https://www.gov.cn/zhengce/zhengceku/2022-05/31/content_5693212.htm", publisher: "国家铁路局／公安部", reviewedAt: "2026-08-12" }
  ] },
  ],
} as const satisfies StructuredPageBody;

export default body;
