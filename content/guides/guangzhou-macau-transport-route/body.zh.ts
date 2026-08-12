import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "选口岸链路时要同时看两头。珠海站加拱北口岸，通常更适合住澳门半岛，或者当天到珠海的车次选择更理想的人；横琴站加横琴口岸，通常更适合住路氹、氹仔，或酒店明确能接上澳门轻轨横琴线的人。不过，广州住宿离广州南很远、行李多、到得晚，或口岸正在施工，都可能让结论反转。" },
  { id: "answer", type: "callout", title: "比较完整门到门，不只比较广州南到哪座站", tone: "decision", body: "把全程拆成六段：广州地址→广州南→铁路→口岸前移动→带着行李完成出入境→澳门侧交通→准确酒店。出行日期在 12306 同时搜索“珠海站”和“横琴站”，再比较总链路，并始终查看口岸官方实时状态。" },
  { id: "chain-heading", type: "heading", level: 2, text: "两条主要口岸链路" },
  { id: "chain-matrix", type: "table", caption: "铁路时间接近时，澳门落点常常决定胜负", columns: ["链路", "通常最适合", "额外交接", "不能想当然"], rows: [
    ["广州南→珠海站→拱北口岸→關閘", "澳门半岛北部/中部，或当天铁路选择更合适", "出站走到拱北、完成两侧查验，再坐澳门交通", "关闸离所有澳门酒店都近，或整夜开放"],
    ["广州南→横琴站→横琴口岸→橫琴口岸澳門口岸區", "路氹、氹仔，或有已核实横琴/轻轨接驳的酒店", "在综合枢纽内换层、过关，再接轻轨/巴士/出租车/酒店车", "口岸 24 小时就等于火车、轻轨和酒店接驳也 24 小时"],
    ["广州地址→正规跨城公路服务→指定口岸", "广州出发点去广州南明显绕路的多人小组", "运营方签到、装行李、道路交通，以及同样的出入境", "一辆直通车可以免除证件资格、边检或排队"]
  ]},
  { id: "origin-heading", type: "heading", level: 2, text: "先从真实的广州地址算起" },
  { id: "origin", type: "comparison", title: "到火车站这一段可能主导选择", columns: [
    { heading: "住广州南附近", items: ["铁路是最干净的默认方案", "在 12306 比较两座到达站", "保留进站和行李余量"] },
    { heading: "住天河或广州中心", items: ["加入去广州南的地铁或出租车时间", "给高峰路况和站内步行留量", "稍晚但更从容的直达车可能更好"] },
    { heading: "家庭或多只大箱", items: ["计算每一次电梯、路缘和排队", "提前确认车辆装载能力", "避免多余的车站或口岸转换"] }
  ]},
  { id: "baggage-heading", type: "heading", level: 2, text: "每一道边界都要自己带着行李通过" },
  { id: "baggage", type: "list", ordered: true, items: [
    "离开广州酒店时，把护照、入境文件和车票记录放在随手能取的位置，不要压在箱底。",
    "在广州南正确入口下车，安检、候车和上车时让全组保持联系。",
    "到珠海或横琴后，先认准中文口岸名再跟随司机或标识；火车票不是跨境票。",
    "除非官方服务明确另有安排，否则行李要由本人看管并带过内地出境和澳门入境查验。",
    "过关后，先认清澳门侧出租车、公交、轻轨或指定酒店接人点，再离开管制区域。",
    "向澳门酒店确认接驳是否接非住客、能否放大箱、是否接晚到，以及准确站区；不要根据旧时刻表推断。"
  ]},
  { id: "hours", type: "callout", title: "口岸开放时间和后续交通是两项不同事实", tone: "warning", body: "截至 2026 年 8 月 13 日，澳门海关公布关闸/拱北旅客口岸为 06:00–01:00，横琴口岸澳门口岸区为 24 小时。证件资格、内地侧安排和临时管制仍须实时确认。2026 年横琴旅检大厅还在分阶段施工，官方提醒旅客查看实时通关情况。不要把到达时间压在口岸关闭的最后一分钟。" },
  { id: "scenarios-heading", type: "heading", level: 2, text: "三个真实的选择情境" },
  { id: "scenarios", type: "table", caption: "铁路段最短，不一定全程最短", columns: ["情况", "可行选择", "原因"], rows: [
    ["两人住广州南附近，澳门住议事亭前地一带", "先查珠海站车次，走拱北/关闸链路", "澳门侧从半岛北部进入；若当天车次合适，全程通常更简洁"],
    ["一家人带大箱，澳门住路氹", "比较当天直达横琴的火车，加横琴口岸/轻轨或已确认酒店接驳", "可能省掉从关闸横穿澳门，但前提是过关后的连接已落实"],
    ["较晚才从天河酒店出发", "选总余量最大的链路，不要自动认定 24 小时口岸最好", "去广州南、最后一班有用的火车和澳门侧交通，可能比口岸时间更早失效"],
    ["有人不便反复提举行李", "两端都安排装载能力明确的车辆，选择路缘和换乘更少的一条", "地图上的站口距离不会显示垂直动线和排队"]
  ]},
  { id: "eligibility-heading", type: "heading", level: 2, text: "确认每位旅客都能完成两侧查验" },
  { id: "eligibility", type: "callout", title: "本文不替任何人判断出入境资格", tone: "neutral", body: "按当前官方规则核对每本护照、进入澳门的依据，以及后续是否需要再次进入内地。国家移民管理局提醒检查证件和签证签注有效期，并提供 12367 服务。外籍护照持有人不要照抄只适用于居民的自助通道说明，要为人工查验留时间。" },
  { id: "recovery-heading", type: "heading", level: 2, text: "链路断掉时怎么恢复" },
  { id: "recovery", type: "table", caption: "停在最后一个可控节点", columns: ["故障", "处理", "不要做"], rows: [
    ["当天没有合适的横琴车次", "用 12306 比较珠海站车次，再评估拱北和澳门侧交通", "默认旧宣传中的直达班次今天仍在"],
    ["横琴大厅施工或拥堵", "查官方实时通关平台，保留饮水和证件方便取用，并在酒店接人截止前联系", "没核对替代口岸时间和道路耗时就中途换口岸"],
    ["到拱北时已经太晚", "向车站或口岸官方人员询问当前选项，并准备在珠海过夜", "付钱给陌生中介绕过即将关闭或已经关闭的查验"],
    ["进入澳门后错过酒店接驳", "使用有标识的澳门出租车/公共交通区；轻轨仍运营且适合酒店位置时也可使用", "目的地和计价方式不清楚就接受主动揽客车辆"],
    ["护照或入境出现问题", "留在边检人员指引范围内，使用官方协助，适用时联系 12367", "擅自离开查验区域，或让同行者在没有联络方案时走散"]
  ]},
  { id: "verify-heading", type: "heading", level: 2, text: "出行当天最终检查" },
  { id: "verify", type: "list", items: [
    "12306 显示所选车次、准确到达站和当前购票记录。",
    "中文车站名和口岸名已经离线保存。",
    "所有人的护照以及入澳/再次入内地文件都适用于计划链路。",
    "口岸官方页面显示当前时间、施工和客流提示。",
    "澳门酒店确认过关后的准确交通和晚到截止。",
    "行李容量和无障碍需求已经确认，而非猜测。",
    "最后一个有效接驳失败时，有珠海或广州过夜备选。"
  ]},
  { id: "help", type: "callout", title: "需要把广州地址和澳门酒店配在一起比较？", tone: "decision", body: "把日期、广州上车区域、澳门酒店、人数、行李和行动限制发给 Homeground。我们可以比较交接次数和恢复余量；铁路票量、出入境决定和口岸运营仍以官方机构为准。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "Homeground 交通与行程指南", href: "/zh/guides/", description: "返回上级指南集合页。" },
    { label: "广州到香港怎么选交通", href: "/zh/guides/guangzhou-hong-kong-transport-route/", description: "香港方向是另一项跨境决定，不混入本文。" },
    { label: "香港和澳门之间怎么走", href: "/zh/guides/hong-kong-macau-transport-route/", description: "实际从香港出发时比较轮渡和大桥。" },
    { label: "香港、澳门与内地再入境次数", href: "/zh/guides/hong-kong-macau-mainland-reentry-count/", description: "多次跨境前先解决单独的再入境问题。" },
    { label: "第一次坐中国高铁指南", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "铁路乘车流程在这篇单独准备。" }
  ]},
  { id: "sources", type: "sources", title: "官方来源", items: [
    { label: "横琴口岸当前交通指引", url: "https://www.hengqin.gov.cn/macao_zh_hans/ztjh/qyh/mlhq/content/post_3825001.html", publisher: "横琴粤澳深度合作区", reviewedAt: "2026-08-13" },
    { label: "2026年7月横琴旅检大厅施工与实时通关提示", url: "https://www.hengqin.gov.cn/macao_zh_hans/zwgk/tzgg/gg/content/post_3925145.html", publisher: "横琴粤澳深度合作区", reviewedAt: "2026-08-13" },
    { label: "澳门旅客口岸开放时间", url: "https://www.customs.gov.mo/cn/notice_passengers_item4.html", publisher: "澳门海关", reviewedAt: "2026-08-13" },
    { label: "澳门官方入境与口岸交通", url: "https://www.macaotourism.gov.mo/zh-hant/article/before-you-travel/travelling-to-macao", publisher: "澳门特别行政区政府旅游局", reviewedAt: "2026-08-13" },
    { label: "证件检查与12367提示", url: "https://www.nia.gov.cn/n897453/c1782642/content.html", publisher: "国家移民管理局", reviewedAt: "2026-08-13" },
    { label: "铁路实时查询", url: "https://www.12306.cn/en/index.html", publisher: "中国铁路12306", reviewedAt: "2026-08-13" }
  ]}
] } as const satisfies StructuredPageBody;

export default body;
