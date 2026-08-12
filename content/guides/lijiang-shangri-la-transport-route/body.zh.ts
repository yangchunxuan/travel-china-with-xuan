import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "丽江直接换到香格里拉住宿，铁路是默认选择：公路暴露更少，城市间这一段也更容易控制。若行程本来就要停中途景点，或准确酒店位置让门到门车辆明显更顺，正规公路接驳才可能更合适。选择并没有在香格里拉站结束——丽江站约 2,400 米，香格里拉站约 3,274 米，车站到房间和第一晚节奏都属于同一个交通决定。" },
  { id: "direct-answer", type: "callout", title: "选择完整的抵达状态，不只选择交通工具", tone: "decision", body: "单纯从一座城市换到另一座城市，先在 12306 查出行日期的车次，再落实酒店接站和安静的第一晚。只有真正具有门到门或计划内中途停留优势时才选公路。若身体状态、天气或交通使原链路不再可行，就取消晚间活动、推迟第二天出发，或留在/回到较低海拔基地，不要为了完成清单硬撑。" },
  { id: "mode-heading", type: "heading", level: 2, text: "铁路和公路解决的是不同旅程" },
  { id: "mode-matrix", type: "table", caption: "本文不承诺实时班次或固定公路时长", columns: ["方式", "最适合", "主要摩擦", "什么条件会改变答案"], rows: [
    ["指定日期火车：丽江站→香格里拉站", "直接换住宿基地；家庭；希望城市间段落可控的人", "两端进出站、行李，以及较快的海拔上升", "没有合适余票、重大中断，或必须中途停留"],
    ["正规包车/专车", "准确酒店到酒店，或留有足够白天时间的计划内停留", "山区天气、路况、司机质量和久坐", "道路预警、天黑、晕车明显或运营方无法核实"],
    ["当前正规客运班线", "预算优先，且当天官方线路与上车点都合适", "去客运站、行李处理和运营变化", "唯一证据是旧时刻表，或到站后已经错过酒店接驳"],
    ["继续住丽江，稍后再走", "身体不适、很疲惫、天气受阻或尚不适合上到更高基地", "会用掉一晚，也可能要改票", "当继续前进已不现实，这是正确降级而不是失败"]
  ]},
  { id: "altitude-heading", type: "heading", level: 2, text: "铁路抵达也是一次海拔变化" },
  { id: "altitude", type: "comparison", title: "给第一晚画出保护范围", columns: [
    { heading: "上车前", items: ["了解 2,400 米到 3,274 米的车站海拔变化", "把酒店联系人和健康信息放在随手位置", "不要用可避免的紧凑安排让自己在出发前已脱水或过度疲劳"] },
    { heading: "抵达后", items: ["坐已确认的车辆去准确住宿点", "适应期间降低活动量和强度", "按国家卫健委专家建议注意保暖、饮食简单并避免饮酒"] },
    { heading: "升级处理", items: ["不要用旅游文章给自己诊断", "严重呼吸困难、剧烈头痛或意识障碍需要立即就医", "听从临床人员建议；如建议下撤或改线就执行"] }
  ]},
  { id: "base-heading", type: "heading", level: 2, text: "离开丽江前，先说清香格里拉住宿基地" },
  { id: "base", type: "table", caption: "“香格里拉酒店”不是接站指令", columns: ["基地类型", "接驳指令", "第一晚含义"], rows: [
    ["独克宗古城一带", "发送酒店完整中文名、可停车的门/路边会合点和电话；不要假设车辆能进步行巷", "到房间就算完成，当晚活动只留在附近"],
    ["松赞林寺/城北一带", "使用精确定位，并问车辆能合法到哪个入口", "不要因为古城有名就额外绕去古城"],
    ["城区外度假酒店或乡村住宿", "书面确认接站范围、车辆信息、行李容量和晚到规则", "最后一段公路可能是当天最难恢复的一段"],
    ["第二天景区出发点", "它与车站接驳和酒店地址分开确认", "不要默认抵达用车第二天会自动变成包车"]
  ]},
  { id: "chain-heading", type: "heading", level: 2, text: "用可控的交接完成全程" },
  { id: "rail-chain", type: "list", ordered: true, items: [
    "在 12306 确认出行日期的准确车次，并抄下“丽江站”和“香格里拉站”。",
    "问丽江酒店几点出发去车站，把道路交通、进站和行李时间算进去。",
    "把车次记录、人数、行李和可联络电话发给香格里拉酒店。",
    "到香格里拉站后使用正规接人/出租车区域，核对车辆后再装行李。",
    "去酒店实际可达入口或约定路边点，不要只去“古城”这个模糊定位。",
    "把接站、入住和休息设为必须完成的结果；晚餐或游览都可以取消。"
  ]},
  { id: "scenarios-heading", type: "heading", level: 2, text: "哪些同行情况会改变方案" },
  { id: "scenarios", type: "table", caption: "同一班火车也会带来不同的第一晚", columns: ["旅客", "可行方案", "避免"], rows: [
    ["第一次来中国，近期没有高海拔停留", "有票时优先白天火车、确认接站、安静晚间和可调整的第二天早上", "抵达后继续长时间游览和晚餐"],
    ["家庭带年长父母", "选不确定交接最少的一条，行李跟车，并提前确认车辆到客房之间的动线", "把“古城”理解成车辆可到门口或地面平坦"],
    ["本来就要停虎跳峡", "把正规公路链路作为独立路线，核查天气、白天时段和最后一段指定接人", "把临时路边下车包装成交通优势"],
    ["在丽江玩得很累，火车又晚到", "直接去酒店、吃简单食物、取消所有晚间活动", "把铁路省下来的时间再塞满"]
  ]},
  { id: "weather", type: "callout", title: "天气同时控制公路备选和最后接驳", tone: "warning", body: "出行当天要查中国气象局对两座城市和沿线的预报、预警。降雨、降雪、结冰或低能见度都会改变公路安全与正规客运安排；铁路也仍须在 12306 查运营。几天前保存的一张天气截图不能证明当天交通会照常。" },
  { id: "downgrade-heading", type: "heading", level: 2, text: "原计划无法执行时的降级阶梯" },
  { id: "downgrade", type: "list", ordered: true, items: [
    "先删掉抵达当晚的可选活动，但保留已确认的酒店接站。",
    "把第二天上午的出发推迟，休息后重新判断。",
    "铁路或公路中断时，保留丽江房间或另一处可控的较低海拔住宿。",
    "出现令人担心的症状时停止游览并接受医疗评估；严重信号要使用急救服务。",
    "临床人员建议下撤，或团队已无法安全继续时，改线并留在/回到低处，不为预付订单冒险。"
  ]},
  { id: "verify-heading", type: "heading", level: 2, text: "离开丽江前最终核验" },
  { id: "verify", type: "list", items: [
    "12306 或当前正规公路运营方确认出行日期的交通。",
    "两座车站名和香格里拉住宿地址都已用中文保存。",
    "末段车辆、会合点、行李容量和晚到规则已确认。",
    "同行者了解车站海拔约从 2,400 米上升到 3,274 米。",
    "今天已经查询中国气象局预报/预警和道路、铁路中断。",
    "第一晚除接站、入住、进食和休息外都可取消。",
    "无法继续时已有低海拔住宿和医疗升级方案。"
  ]},
  { id: "help", type: "callout", title: "需要把火车、酒店和第一晚一起检查？", tone: "decision", body: "把日期、丽江出发点、香格里拉酒店、人数、行李和大致舒适需求发给 Homeground。我们可以检查交接和降级余量。个体健康问题请咨询临床人员；交通与天气运营仍以官方机构为准。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "Homeground 交通与行程指南", href: "/zh/guides/", description: "返回上级指南集合页。" },
    { label: "昆明、大理、丽江、香格里拉顺序", href: "/zh/guides/kunming-dali-lijiang-shangri-la-route-order/", description: "判断香格里拉是否应该进入完整云南路线。" },
    { label: "丽江古城还是束河：住哪里", href: "/zh/guides/lijiang-old-town-or-shuhe-where-to-stay/", description: "先选好这段转移的丽江出发基地。" },
    { label: "中国夜车还是白天高铁", href: "/zh/guides/china-night-train-or-daytime-high-speed-rail/", description: "其他中国路段可使用更广的交通框架。" },
    { label: "你的中国行程是不是太赶？", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "避免把第一晚再次压满。" }
  ]},
  { id: "sources", type: "sources", title: "官方与权威来源", items: [
    { label: "丽香铁路开通与车站海拔", url: "https://jtyst.yn.gov.cn/html/2023/xingyexinwen_1127/130663.html", publisher: "云南省交通运输厅", reviewedAt: "2026-08-13" },
    { label: "丽香铁路运营与车站到景区接驳", url: "https://jtyst.yn.gov.cn/html/2024/jiaotongyaowen_1128/3133261.html", publisher: "云南省交通运输厅", reviewedAt: "2026-08-13" },
    { label: "香格里拉景区直通车官方信息", url: "https://www.diqing.gov.cn/xwzx/xsqkx/202408/20240830_215419.html", publisher: "迪庆藏族自治州人民政府", reviewedAt: "2026-08-13" },
    { label: "高原旅游健康专家建议", url: "https://www.nhc.gov.cn/xcs/c100122/202507/7dfe2bbc60604ed2bd15bec34f7ada64.shtml", publisher: "国家卫生健康委员会", reviewedAt: "2026-08-13" },
    { label: "香格里拉天气预报", url: "https://www.weather.com.cn/weather/101291301.shtml", publisher: "中国天气网/中国气象局", reviewedAt: "2026-08-13" },
    { label: "铁路实时查询", url: "https://www.12306.cn/en/index.html", publisher: "中国铁路12306", reviewedAt: "2026-08-13" }
  ]}
] } as const satisfies StructuredPageBody;

export default body;
