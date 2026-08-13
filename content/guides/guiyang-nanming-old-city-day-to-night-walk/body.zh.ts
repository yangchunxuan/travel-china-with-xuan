import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer", type: "lead", text: "趁建筑立面和历史细节还有日光，先走老城街巷；天黑前抵达甲秀楼，让南明河承接蓝调时刻，等灯光和晚餐客流成为体验后，再以青云市集收尾。一条实用顺序是：曹状元街→甲秀楼与翠微巷→选择一小段公众河岸→青云路和青云市集。这是顺序，不是对每个室内、摊位或灯光都营业的承诺。"},
  {id: "rhythm-warning", type: "callout", title: "先看当天开放情况，游览顺序仍可保留", body: "2026 年南明官方 Citywalk 线路支持这些片区连接，贵阳也报道了甲秀楼周边晚间灯光升级。但它们不能证明所有历史室内与青云商户有一个永久营业时间。当天确认甲秀楼入内、临时活动、河岸施工和市集通知。若室内关闭，保留昼夜顺序，在公众空间欣赏外观，不把外观游览写成已经入内。", tone: "warning"},
  {id: "timeline-heading", type: "heading", level: 2, text: "这条路线由光线和体力控制"},
  {id: "timeline", type: "table", caption: "南明老城由昼入夜的顺序", columns: ["阶段", "地点与体验", "移动前决定"], rows: [
    ["日光", "曹状元街和一条精简历史街巷分支：看街道尺度、遗址和当下社区使用。", "只选一个分支，不收集每一处故居或书院。"],
    ["傍晚日光", "前往甲秀楼。当前允许入内就先完成室内；否则从合法公众一侧理解桥、楼与河的关系。", "增加翠微巷前先看天空和腿力。"],
    ["黄昏／蓝调", "只走甲秀楼附近一段安全公众河岸，把光线变化本身当作活动。", "雨势增强或河岸受控时，直接转乘去青云。"],
    ["入夜", "在青云市集完成晚餐、当前文创零售与夜间氛围。", "点单前先绕一圈；商户和排队会变化。"],
    ["离场", "从市集、附近核实的上车点或公共交通站结束。", "吃饭前先保存出口，不假设同一入口到深夜仍最方便。"]
  ]},
  {id: "stage-one-heading", type: "heading", level: 2, text: "第一段——只取一小份老城样本"},
  {id: "stage-one", type: "paragraph", text: "曹状元街适合作为高效起点，因为南明官方游客资料把它定义为历史文化展示区，包含曹维城状元府原址、老南门遗址、王伯群故居与戴蕴珊别墅等。不要把这份名单变成必进清单。挑一两处当前可读的点，尊重私人或关闭的门，把街道本身作为旧城肌理、当下商铺与居民生活的连接。"},
  {id: "heritage-branches", type: "table", caption: "老城分支选择", columns: ["分支", "什么时候选", "什么时候跳过"], rows: [
    ["只走曹状元街", "日光有限，或想用最简线路去甲秀楼。", "另一个经核实的历史室内正在开放，而且时间充足。"],
    ["官方历史线延伸", "达德学校旧址等有名称的点当前开放，而且你最重视历史。", "会折返、入内未确认，或建筑已经失去日光。"],
    ["小吃街巷分支", "只需一份小吃而不是晚餐，且当前店铺符合饮食需求。", "它会取代而不是支持晚间市集。"]
  ]},
  {id: "stage-two-heading", type: "heading", level: 2, text: "第二段——让甲秀楼承接白天与夜晚，而不是成为终点"},
  {id: "stage-two", type: "list", items: [
    "在建筑仍有日光时抵达。不要发布未核实的最晚入场时间；当天看官方／场馆当前通知。",
    "在公众空间观察或拍摄，不堵桥面、门口和其他行人。",
    "翠微巷仍活跃且同行者走得动，就把它当短回环；它不是必选项。",
    "只有天气与公共空间规定允许舒适等待时，才等光线变化；2026 年 6 月报道的升级灯光以后也可能改变。",
    "不要为了倒影横穿车流或站到危险河岸。著名照片不是路线指令。"
  ]},
  {id: "river-heading", type: "heading", level: 2, text: "第三段——只用一段河岸完成过渡"},
  {id: "river", type: "paragraph", text: "南明河在纪念建筑与市集之间负责调节节奏。按现场行人导向选择河岸与过街，不按旧截图走。一小段照明良好的公众河岸，已经足够看到甲秀楼从白天变成倒影。若施工、水务管理、下雨或人流控制打断河岸，短程出租车或经核实的公共交通转到青云，仍能保住顺序，不必假装全程步行。"},
  {id: "stage-four-heading", type: "heading", level: 2, text: "第四段——等青云真正进入夜间状态再到"},
  {id: "market-workflow", type: "list", items: [
    "用青云路 83 号作为官方英文游客信息中的地址参考，再按当前现场标识找可用入口。",
    "先走一圈比较菜单、队伍、座位、通风与付款，再买多份食物。",
    "把青云理解为管理型文化、餐饮与零售街区，不要据此断言每样东西都传统或本地制造。",
    "逐道菜问辣度、过敏原和配料；“不辣”仍需明确追问辣油或点缀。",
    "分轮点单，一道不合适不会毁掉晚餐，同行者累了也能停。",
    "晚间人流密集时指定一人留意包和出口；两轮点单之间不要把付款手机留在桌上。"
  ]},
  {id: "scenarios-heading", type: "heading", level: 2, text: "不同旅客应走不同分支"},
  {id: "scenarios", type: "table", caption: "旅客情境分支", columns: ["旅客", "路线选择", "计划变化时怎么办"], rows: [
    ["遇到晴朗傍晚的摄影者", "短老城样本→天黑前甲秀楼→固定公众河岸位置→蓝调后青云。", "倒影没有出现就停止等待，把时间留给入夜后的市集。"],
    ["带长辈的家庭", "曹状元街或甲秀楼只深看一处→坐下休息→乘车去青云。", "出现疲劳就删河岸段，晚餐前安排上车点。"],
    ["晚出发、以吃为主", "先到甲秀楼外观做短过渡，再去青云。", "不要为了保留书面顺序，入夜后匆忙穿行历史街巷。"]
  ]},
  {id: "rain-fatigue", type: "callout", title: "下雨和疲劳都是路线分叉", body: "小雨且地面安全：缩短历史分支，保留甲秀楼与青云。大雨、雷电、河岸湿滑或防洪管控：删掉河边步行，用两个经核实的上下车点转移。疲劳：曹状元街与甲秀楼保留更重要的一处，坐下再乘车。这条线路靠昼夜反差成立，不靠一步不断。", tone: "decision"},
  {id: "final-check", type: "list", items: [
    "检查当日日落和天气，但不把它们写成保证。",
    "当天确认甲秀楼能否入内以及有无临时关闭。",
    "只选一个老城分支，排除私人或关闭空间。",
    "到现场确认可走河岸、过街与施工状态。",
    "保存青云当前入口、活动与离场交通。",
    "准备下雨和疲劳转乘点。",
    "准备食物过敏、辣度表达和付款备份。",
    "晚餐前保存上车点。"
  ]},
  {id: "internal-links", type: "internal-links", title: "把步行线放入更大的中国旅行", items: [
    {label: "探索中国", href: "/zh/explore/", description: "比较贵阳的城市角色与下一目的地。"},
    {label: "单一基地还是多地换酒店", href: "/zh/guides/china-hub-and-spoke-or-multi-base-route/", description: "判断贵阳是基地还是一晚中转。"},
    {label: "中国气候分区与旅行时间", href: "/zh/guides/china-climate-regions-for-trip-timing/", description: "不要把中国其他地区的天气预期套到贵阳。"},
    {label: "带长辈去中国", href: "/zh/guides/china-itinerary-with-older-parents/", description: "把坐下休息与乘车分支放进整个线路。"}
  ]},
  {id: "consultation", type: "callout", title: "需要按真实抵达时间调整？", body: "Homeground 真人旅行顾问可以按酒店和日期调整光线顺序、步行量、晚餐需求与上车点。请说明抵达时间、同行者行动能力，以及历史、摄影或食物哪项最重要。", tone: "neutral"},
  {id: "sources", type: "sources", title: "2026 年 8 月 13 日核验的官方来源", items: [
    {label: "南明七条官方 Citywalk 线路", url: "https://nanming.english.guiyang.gov.cn/2026-04/08/c_1174046.htm", publisher: "南明区／贵阳市政府", reviewedAt: "2026-08-13"},
    {label: "曹状元街、甲秀楼与青云的官方线路组合", url: "https://nanming.english.guiyang.gov.cn/2025-04/30/c_1090089.htm", publisher: "南明区／贵阳市政府", reviewedAt: "2026-08-13"},
    {label: "2026 年甲秀楼夜景灯光升级", url: "https://english.guiyang.gov.cn/2026-06/24/c_1190288.htm", publisher: "贵阳市政府", reviewedAt: "2026-08-13"},
    {label: "青云市集定位与官方地址", url: "https://nanming.english.guiyang.gov.cn/2024-03/11/c_970478.htm", publisher: "南明区／贵阳市政府", reviewedAt: "2026-08-13"},
    {label: "青云市集夜间场景", url: "https://nanming.english.guiyang.gov.cn/2025-05/30/c_1097328.htm", publisher: "南明区／贵阳市政府", reviewedAt: "2026-08-13"},
    {label: "首图：FN-082 于 2024 年 3 月 28 日拍摄的甲秀楼夜景", url: "https://commons.wikimedia.org/wiki/File:%E7%94%B2%E7%A7%80%E6%A5%BC%E5%A4%9C%E6%99%AF%EF%BC%8C%E8%B4%B5%E5%B7%9E_202403_2.jpg", publisher: "Wikimedia Commons / FN-082", reviewedAt: "2026-08-13"},
    {label: "首图许可：知识共享署名—相同方式共享 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
