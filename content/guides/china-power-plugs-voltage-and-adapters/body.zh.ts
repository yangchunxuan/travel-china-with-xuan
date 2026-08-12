import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "中国大陆采用 220V、50Hz 供电。大多数手机、平板、相机和笔记本电脑充电器都能直接适配，因为输入标签写着 100–240V、50/60Hz；插脚不合时只需解决插头形状。若设备只标 110V 或 120V，情况就不同：转换插头不会降低电压，必须使用匹配的变压设备；对不少大功率电器而言，直接换成本地兼容的设备反而更稳妥。" },
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
  { id: "socket-warning", type: "callout", title: "万能插座不等于万能安全", tone: "warning", body: "如果转换头向外滑、金属脚外露，或者出现火花、异响、焦味、明显发热，应立即停用，换插座并请住宿方检查。不要掰插脚、塞纸固定，也不要叠接多个松动的转换头。" },
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
  { id: "scope", type: "callout", title: "范围与动态事实边界", tone: "neutral", body: "下列官方页面支持中国大陆 220V/50Hz 供电和常见插头类型，复核日期为 2026 年 8 月 12 日；它们不为某个房间插座、转换头或电器背书。本文只讨论普通旅行电子设备，不替代建筑电气、固定设备或医疗设备风险评估。设备与转换头规格以制造商为准，现场安装情况以住宿方为准。" },
  { id: "links", type: "internal-links", title: "继续完成设备准备", items: [
    { label: "充电宝乘机与乘火车规则", href: "/zh/guides/china-power-bank-rules-flights-trains/", description: "把电池运输规则与插头、电压问题分开核对。" },
    { label: "中国 eSIM 还是本地 SIM 卡", href: "/zh/guides/china-esim-vs-local-sim/", description: "准备一套落地后就能使用的手机方案。" },
    { label: "国际航班前最后一晚", href: "/zh/guides/china-last-night-before-international-flight/", description: "把关键充电器和转换头重新放回随身行李。" }
  ] },
  { id: "sources", type: "sources", title: "已复核的官方来源", items: [
    { label: "中国用电说明", url: "https://www.caac.gov.cn/ZTZL/RDZT/YTHYWZ/CHRY/SHZN/Electricity/index.html", publisher: "中国民用航空局", reviewedAt: "2026-08-12" },
    { label: "北京出发前旅行提示", url: "https://english.beijing.gov.cn/travellinginbeijing/quickguideontravelservices/traveltips/202108/t20210811_2466837.html", publisher: "北京市人民政府", reviewedAt: "2026-08-12" },
    { label: "列出 A、C、I 型插头的上海打包指南", url: "https://english.shanghai.gov.cn/en-FAQs-StudyinShanghai/20250924/e961a223e45a4adca7969b3f7691132b.html", publisher: "上海市人民政府", reviewedAt: "2026-08-12" }
  ] }
] } as const satisfies StructuredPageBody;

export default body;
