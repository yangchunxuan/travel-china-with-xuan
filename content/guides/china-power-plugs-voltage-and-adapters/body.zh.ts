import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "lead", type: "lead", text: "中国内地电压 220 伏、频率 50 赫兹，插座可插 A 型（两个扁脚）、C 型（两个圆脚）和 I 型（三个斜扁脚）插头。大多数手机、平板、相机和笔记本电脑的充电器标着 100–240 伏，脚型不合时只需要转换插头。只标 110 伏或 120 伏的电器，比如很多美国、日本的吹风机和直发器，需要变压器或换一台：转换插头只改插头形状，不改电压。从英国、新加坡、马来西亚或香港来的（G 型插头），要带转换插头。"},
    { id: "answer", type: "callout", title: "30 秒判断法", tone: "decision", body: "逐个查看充电器上的 INPUT（输入）。范围包含 220V 和 50Hz，就只处理插头形状；不包含 220V，绝不能直接接电；标签看不清，就查该型号的制造商规格或不带，别靠猜。" },
    { id: "two-questions-heading", type: "heading", level: 2, text: "转换插头和变压器解决的是两件事" },
    { id: "two-questions-table", type: "table", caption: "看设备标签做决定，不要只看出发国家", columns: ["标签内容", "代表什么", "该带什么"], rows: [
    ["INPUT 100–240V, 50/60Hz", "电源适配器兼容中国的电压与频率", "插脚不合时带转换插头；不需要变压器"],
    ["INPUT 220–240V, 50Hz", "电气规格与中国大陆供电兼容", "需要时只解决插头形状"],
    ["仅写 INPUT 110V 或 120V", "不能直接使用 220V 供电", "额定规格合适的变压器，或更换电器"],
    ["电器有 220/240V 手动拨档", "可能是双电压设备，但要手动设置", "断电时调到正确档位，再配合合适插头"],
    ["标签缺失、磨损或表述不清", "无法确认兼容性", "向制造商确认，或换设备"]
  ] },
    { id: "socket-heading", type: "heading", level: 2, text: "常见 A、C、I 型，但不能赌酒店一定有某一种插座" },
    { id: "socket-copy", type: "paragraph", text: "上海市政府的出行资料列出 A、C、I 型插头，民航局访客指南则介绍了平行两扁脚和斜三脚插座。实际酒店、交通枢纽可能安装万能插座、USB 插座或不同组合。北美、日本常见的 A 型两扁脚即使能插进去，也不代表电压兼容；欧洲 C 型充电器通常较省事，但较重的插头可能在磨损的万能插座里松动；澳大利亚、新西兰的 I 型外形相近，但有接地需求的电器仍须确保接触牢固、额定规格正确。" },
    {
    "id": "singapore-malaysia-plug-heading",
    "type": "heading",
    "level": 2,
    "text": "从新加坡或马来西亚带英标G型插头来怎么办？"
  },
    {
    "id": "singapore-malaysia-plug-answer",
    "type": "paragraph",
    "text": "带一个能接住三根矩形G型插脚、另一端适合中国大陆实际插座的转换头，不要依赖每家酒店都有万能插座。再看充电器本身：INPUT写100–240V、50/60Hz，就涵盖中国的供电范围，这类兼容充电器只需要转换插头形状。出发国家或看起来熟悉的插头，不能证明所有电器都兼容。需要接地的电器要保留接地，负载不超过转换头额定值，也不要硬插。"
  },
    { id: "socket-warning", type: "callout", title: "万能插座不等于万能安全", tone: "warning", body: "如果转换头向外滑、金属脚外露，或者出现火花、异响、焦味、明显发热，应立即停用，换插座并请住宿方检查。不要掰插脚、塞纸固定，也不要叠接多个松动的转换头。" },
    {id: "traps-heading", type: "heading", level: 2, text: "在中国充电，最常犯的五个错"},
    {id: "traps-list", type: "list", ordered: true, items: ["带了 110 伏的美发电器。很多美国、日本的吹风机和直发器只支持 110–120 伏，插上 220 伏几秒钟就可能烧坏。看清标签，或者用酒店的。", "看了输出（OUTPUT）而不是输入（INPUT）。输出那一行说的是送给手机的电，只有输入那一行才说明充电器能不能接 220 伏。", "相信磨损的万能插座。酒店的多用插座常常松，沉一点的 G 型转换插头过一夜就掉下来。用房间里最紧的那个插座。", "给充电宝充满了电，却没检查它本身。2025 年 6 月 28 日起，没有 3C 标识或标识不清、被召回型号批次的充电宝不能带上中国境内航班；在国外买的充电宝往往根本没有 3C 标识。", "落地时手机没电。在中国，手机就是钱包、地图和预约凭证：没电就不能扫码付款，在机场也叫不了网约车。"]},
    { id: "label-heading", type: "heading", level: 2, text: "看懂充电器标签：别把 INPUT 和 OUTPUT 混为一谈" },
    { id: "label-list", type: "list", ordered: true, items: [
    "拔掉电源，在电源砖、充电底座或电器铭牌上找 INPUT。OUTPUT 是充电器输给手机或电脑的参数，不能证明充电器本身能承受 220V。",
    "读完整范围。100–240V 中的横线表示整个区间都可用；只写 120V 就不是同一回事。",
    "频率也要看。50/60Hz 覆盖中国的 50Hz；带电机、计时器或依赖频率工作的设备，即使电压解决了也应向制造商确认。",
    "核对电器功率或电流，以及每个转换头、变压器、延长线的最高额定值；整条连接链以最低额定值为上限。",
    "双层方框只表示双重绝缘。需要接地的三脚电器，不能靠两脚转换头把接地要求‘变没’。"
  ] },
    { id: "device-heading", type: "heading", level: 2, text: "设备类型不同，风险也不同" },
    { id: "device-table", type: "table", caption: "按设备选择实用方案", columns: ["设备", "通常怎么准备", "还要检查什么"], rows: [
    ["手机、平板、相机或电脑充电器", "多数现代型号支持宽电压，但仍要看印刷标签", "使用原装或可靠充电器，多口充电器周围要留散热空间"],
    ["USB-C 多口充电器", "一只兼容充电器可减少转换头叠接", "总功率必须覆盖同时连接的设备"],
    ["吹风机、直发器、卷发棒或烧水壶", "优先选择已确认的双电压型号，或使用酒店/本地电器", "发热电器功率高，许多小型旅行变压器并不适用"],
    ["电动剃须刀或牙刷", "同时查看充电底座和手柄规格", "标注仅供剃须刀使用的浴室插座可能有用途或功率限制"],
    ["呼吸机、医疗或专业设备", "取得制造商书面输入规格，并向住宿方确认", "准备备用转换头和停电预案，不能临时改接地"]
  ] },
    { id: "converter-heading", type: "heading", level: 2, text: "确实需要变压器时，要匹配的不只是电压" },
    { id: "converter-copy", type: "paragraph", text: "变压设备必须能接收约 220V 输入，并输出电器所需电压；其连续功率额定值要高于电器实际功耗，启动电流较大的设备还须留出余量。有些旅行变压器只适用于特定发热设备和短时间使用，变压器式产品则往往较重。两者都不一定能把 50Hz 变成 60Hz。应以电器和变压器制造商的具体说明做匹配，而不是只看商品图片上的插头。" },
    { id: "converter-decision", type: "callout", title: "只为一次旅行，换电器通常更省事", tone: "decision", body: "若唯一不兼容的是大功率美发工具或烧水壶，使用酒店提供或本地额定电压的设备，往往能一次避开变压、功率和过热问题。只有设备不可替代、且制造商确认组合可行时，才值得携带变压器。" },
    { id: "room-heading", type: "heading", level: 2, text: "在房间里建立一个稳定的充电点" },
    { id: "room-list", type: "list", items: [
    "带一只来源可靠、额定规格充足的转换插头，不要带一堆来路不明的小方块。设备多时，选能同时供电的宽电压多口 USB 充电器。",
    "把转换头和充电器放在坚硬、无遮挡的位置，避免床品、窗帘和水源。",
    "不要把旅行转换头、插线板和变压器层层串接；每个接口都会增加松动、发热和超额定值的风险。",
    "若携带延长线，确认至少支持 220V 和所需电流；设备需要接地时，整条线路都必须保留接地。",
    "转换头和至少一根充电线放在随身行李中。托运行李延误时，手机、验证码和交通订单仍要有电。"
  ] },
    { id: "failure-heading", type: "heading", level: 2, text: "抵达后充不上电，按症状排查" },
    { id: "failure-table", type: "table", caption: "先保设备，再找故障", columns: ["症状", "安全处理", "不要这样做"], rows: [
    ["完全没反应", "断开连接，请酒店人员或用已知正常的低功率宽电压充电器测试插座，再单独测试转换头", "强行插入或反复开关可疑插座"],
    ["转换头或充电器异常烫", "立即拔下，放在不易燃表面冷却", "盖住继续用、通宵充电或把高温当正常"],
    ["插头松动", "换插座或换尺寸正确、能牢固连接的转换头", "用胶带、家具或其他物品顶住"],
    ["跳闸", "断开整条连接，请住宿方处理", "反复合闸或再次接上同一大功率负载"],
    ["充电速度很慢", "确认输入兼容后，再检查充电器输出、线材和多口功率分配", "把 USB 功率分配问题误判成需要变压器"]
  ] },
    { id: "pack-heading", type: "heading", level: 2, text: "出发前最后核对" },
    { id: "pack-list", type: "list", ordered: true, items: [
    "拍下每台设备的输入标签，并离线保存准确型号规格。",
    "把宽电压充电器和单电压电器分开处理。",
    "转换头既要匹配插脚，也要保留必要接地，额定值还要高于负载。",
    "用电不可中断时，提前向第一家酒店确认插座或医疗设备支持。",
    "准备一根备用线；同行多人时分开保管关键充电设备，但都不要托运。",
    "使用变压器前再次读说明，发现损坏或过热立即停用。"
  ] },
    {id: "sale-heading", type: "heading", level: 2, text: "落地之前，先把第一个小时安排好"},
    {id: "sale-copy", type: "paragraph", text: "手机最容易没电的，偏偏是抵达那天：长途飞行、新换的 SIM 卡或 eSIM、还没试过的支付 App。有司机在到达口等你，这些都不用操心。行程里那些有截止时间的事也一样。故宫当天不卖票：参观前 7 天北京时间 20:00 放票，每人用自己的护照实名预约；2025 年国庆假期第一天（10 月 1 日），故宫预约页面就已显示 10 月 2 日至 7 日全部约满。参观前至少 8 天交给我们并付款，就在预约保证范围内：约不上，服务费和门票钱全额退还；只剩不到 8 天，这份保证就用不上了。"},
    { id: "handoff-options", type: "comparison", title: "这些可以交给我们", columns: [
      { heading: "专车和司机", body: "出了到达口，司机就在那里：送你到酒店的专车，中国大陆任何城市都能安排，不需要 App，也不需要手机有电。", items: ["司机是我们自己的。", "付款前书面确认价格。"] },
      { heading: `私人导游：每天${bodyGuideRate("xian", "zh")}起`, body: `持证英文导游，最多 8 小时：西安、张家界${bodyGuideRate("xian", "zh")}起，北京、上海${bodyGuideRate("beijing", "zh")}起，旺季日期更高。需要中文导游也可以安排，价格在报价里确认。`, items: ["按整天预订，按每位导游计价，不是按人头。", "交通、门票和餐食另行报价。"] },
      { heading: `整趟行程：每人${bodyTourPrice(tour8, 6, "zh")}起`, body: `北京、西安、上海 8 天私家团，2 人出行每人${bodyTourPrice(tour8, 2, "zh")}，6 人每人${bodyTourPrice(tour8, 6, "zh")}。加上桂林的 10 天路线，2 人每人${bodyTourPrice(tour10, 2, "zh")}。`, items: ["含早餐的四星酒店、游览日的私人导游和专车、全部接送、城市之间的火车和航班，以及行程里的实名门票。", "如果我们订不到故宫或天安门，退还你已付的全部费用，前提是故宫参观前至少 8 天把护照信息发给我们。"] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "交给我们安排", items: [{label: "预约接机、接站或包车", href: "/zh/services/private-car-and-driver/", description: "中国大陆任何城市。告诉我们路线、日期和行李。"}, {label: "查看北京、西安、上海 8 天路线", href: "/zh/tours/beijing-xian-shanghai-8-day-private-tour/", description: "每日安排、酒店和公开价格表。"}, {label: "请一位导游陪一天", href: "/zh/services/private-english-speaking-guides/", description: "北京、上海、西安、张家界的价格。"}, {label: "让规划师安排整趟行程", href: "/zh/services/full-trip-support/", description: "告诉我们日期和预算，提交行程需求免费。"}]},
    {id: "how-to-book", type: "callout", tone: "decision", title: "怎么预订", body: "在上面任何一个页面，通过 WhatsApp 或邮件告诉我们日期、人数和想看的地方。规划师 12 小时内回复，付款前你会先收到书面报价；从第一次回复到你旅行的最后一天，都是同一位规划师跟进。预订时用支付宝或 VBill 付 30% 定金，余款到了中国再付，我们不另收手续费。Homeground China 是持证旅行社（许可证 L-BJ10587），导游和司机都是我们自己的，行程不进购物店。"},
    { id: "scope", type: "callout", title: "范围与动态事实边界", tone: "neutral", body: "下列官方页面支持中国大陆 220V/50Hz 供电和常见插头类型，复核日期为 2026 年 8 月 12 日；它们不为某个房间插座、转换头或电器背书。本文只讨论普通旅行电子设备，不替代建筑电气、固定设备或医疗设备风险评估。设备与转换头规格以制造商为准，现场安装情况以住宿方为准。" },
    { id: "faq", type: "faq", title: "插头与电压常见问题", items: [
    { question: "中国用什么电压和插头？", answer: "中国大陆为 220V、50Hz。上海政府指南列出 A、C、I 型插头，酒店常见多功能插座或 USB 插座，但不要赌某家酒店一定有某一种插座。" },
    { question: "去中国需要变压器吗？", answer: "只有 INPUT 标签只写 110V 或 120V 的设备才需要。标着 100–240V、50/60Hz 的充电器可以直接接受中国电压，只需转换插头形状；转换插头本身不会降低电压。" },
    { question: "我的手机或笔记本充电器在中国能用吗？", answer: "大多数现代手机、平板、相机和笔记本充电器都是宽电压（100–240V），配转换插头即可使用。请逐个查看 INPUT 一行确认；没有可读标签时，向厂家核实准确型号，不要猜。" },
    { question: "从新加坡或马来西亚带英标 G 型插头怎么办？", answer: "可以，准备一个能接三个方形 G 型插脚、又适配你将使用的大陆插座的转换头。充电器 INPUT 覆盖 220V 就只需要换形状；保留必要的接地，别超过转换头额定功率，也不要硬插。" },
    { question: "吹风机或直发器能在中国用吗？", answer: "优先用确认过的双电压型号或酒店提供的电器。只支持 110V 的大功率工具需要额定功率高于实际功耗的变压器；只出行一次时，换一台本地兼容的电器往往比带变压器更省事。" },, {question: "到了中国手机没电怎么办？", answer: "充上电之前，你没法扫码付款，也叫不了网约车，所以随身包里放一个有 3C 标识、充满电的充电宝和一些现金。不想靠手机的话，就订专车：中国大陆任何城市，司机都在到达口等你，付款前书面确认价格。"}] },
    { id: "links", type: "internal-links", title: "继续完成设备准备", items: [
    { label: "充电宝乘机与乘火车规则", href: "/zh/guides/china-power-bank-rules-flights-trains/", description: "把电池运输规则与插头、电压问题分开核对。" },
    { label: "中国 eSIM 还是本地 SIM 卡", href: "/zh/guides/china-esim-vs-local-sim/", description: "准备一套落地后就能使用的手机方案。" },
    { label: "国际航班前最后一晚", href: "/zh/guides/china-last-night-before-international-flight/", description: "把关键充电器和转换头重新放回随身行李。" }
  ] },
    { id: "sources", type: "sources", title: "已复核的官方来源", items: [
        {label: "民航局：2025 年 6 月 28 日起境内航班充电宝须有 3C 标识", url: "https://www.caac.gov.cn/English/News/202507/t20250709_227894.html", publisher: "中国民用航空局", reviewedAt: "2026-09-10"},
        {label: "故宫博物院票务：放票时间与实名规则", url: "https://www.dpm.org.cn/subject_booking/", publisher: "故宫博物院", reviewedAt: "2026-08-22"},
        {label: "2025 年国庆假期首日，故宫 10 月 2 日至 7 日门票已约满", url: "https://www.yicai.com/news/102851899.html", publisher: "第一财经", reviewedAt: "2026-10-19"},
    { label: "中国用电说明", url: "https://www.caac.gov.cn/ZTZL/RDZT/YTHYWZ/CHRY/SHZN/Electricity/index.html", publisher: "中国民用航空局", reviewedAt: "2026-08-12" },
    { label: "北京出发前旅行提示", url: "https://english.beijing.gov.cn/travellinginbeijing/quickguideontravelservices/traveltips/202108/t20210811_2466837.html", publisher: "北京市人民政府", reviewedAt: "2026-08-12" },
    { label: "列出 A、C、I 型插头的上海打包指南", url: "https://english.shanghai.gov.cn/en-FAQs-StudyinShanghai/20250924/e961a223e45a4adca7969b3f7691132b.html", publisher: "上海市人民政府", reviewedAt: "2026-08-12" }
  ] },
  ],
} as const satisfies StructuredPageBody;

export default body;
