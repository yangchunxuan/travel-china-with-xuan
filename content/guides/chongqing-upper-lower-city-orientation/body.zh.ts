import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "陡峭地形和密集建设让重庆成为一座三维城市：平面地图上相邻的两条街，实际可能相差数十米高度，中间还没有直达楼梯。扶梯、公共电梯、桥梁、隧道以及与建筑结合的轨道交通，共同连接这些街道层级。本文所说的“上、下”是你这段路线所需的道路层级和可用入口，并不是对渝中历史上、下半城的完整介绍。"},
  {id: "three-coordinates", type: "table", caption: "一个重庆目的地有三组坐标", columns: ["坐标", "需要核对什么", "常见失败"], rows: [
    ["平面位置", "正确名称、分店和街区。", "走到附近另一处同名地点。"],
    ["垂直层级", "上层道路、下层道路、江边或裙楼层。", "地图点就在头顶或脚下，却看不到通路。"],
    ["可用连接", "有名称的车站出口、电梯、扶梯、桥或公共楼梯。", "一条很短的直线变成长爬坡或大绕行。"]
  ]},
  {id: "machines-as-streets", type: "heading", level: 2, text: "这些机械设施本身就是街道网络的一部分"},
  {id: "machines-copy", type: "paragraph", text: "重庆官方资料把凯旋路公共电梯称为城市垂直交通，也记录了皇冠大扶梯的规模及连接作用；山地社区设计指引同样把电梯和扶梯视为垂直出行基础设施。这些案例用于解释城市形态，不能证明某一设施今天一定开放，也不能证明它适合你的具体路线。"},
  {id: "liziba", type: "heading", level: 2, text: "李子坝是协同设计的车站，不是列车意外撞进楼里"},
  {id: "liziba-copy", type: "paragraph", text: "重庆官方资料介绍，李子坝站与楼房采用协同设计，轨道结构和楼体结构彼此分离，以控制振动和噪声。这个著名画面是工程师面对受限地形与密集城市空间的解决办法，而不是后来随意把一栋旧住宅打穿。"},
  {id: "route-heading", type: "heading", level: 2, text: "怎样规划一段重庆短途步行"},
  {id: "route-method", type: "list", ordered: true, items: [
    "保存目的地完整中文名称和你真正需要的入口，不要只保存地图点。",
    "核对轨道站出口编号，并查看出口说明是否写明上层或下层道路。",
    "检查路线中有没有台阶、密集等高线、桥梁、隧道、商场或穿楼通道。",
    "如果同行者带行李、使用轮椅或走路较慢，请酒店或场馆用中文确认最后一段。",
    "到达后先核对路名和建筑入口，再决定是否开始一段长下坡。",
    "电梯、扶梯或通道关闭时，退回最近一个有明确名称的公共道路或车站站厅，再重新规划。"
  ]},
  {id: "destination-card", type: "table", caption: "在困难的最后一公里之前，先做一张目的地卡", columns: ["项目", "需要记录什么"], rows: [
    ["地点", "完整中文名称和具体分店。"],
    ["道路层级", "上层道路、下层道路、江边、裙楼或楼层。"],
    ["轨道出口", "线路、车站和准确出口编号。"],
    ["少台阶连接", "有名称的电梯、扶梯或车辆可达道路，并核对当前关闭信息。"],
    ["出租车位置", "道路层面的下车入口，而不是景点中心点。"],
    ["回退点", "可返回的有人值守车站入口、酒店前台或有名称的主路。"]
  ]},
  {id: "scenarios", type: "comparison", title: "同样的地图距离，条件不同走法就不同", columns: [
    {heading: "只带轻便日用包", body: "有标识的楼梯可能既高效又有城市体验，但要保留原路爬回的体力，以防下一段连接关闭。"},
    {heading: "行李箱、父母同行或行动受限", body: "即使地图路线更长，也应优先选择已确认的电梯、扶梯、车辆可达道路或车站出口。垂直路线的确定性比直线距离更重要。"}
  ]},
  {id: "step-free-boundary", type: "callout", title: "有一部电梯，不等于全程无台阶", body: "电梯或扶梯只能消除其中一段爬升，不能证明整条路线都可无障碍通行。应逐一确认车站出口、路缘、通道和目的地入口；只要有一段无法确认，就保留道路层面的车辆备选。", tone: "warning"},
  {id: "wrong-level-recovery", type: "callout", title: "目的地看起来就在正上方或正下方时", body: "不要进入没有标识的住宅楼梯，也不要沿机动车坡道步行。拍下或保存当前路名，退回有人值守的车站入口、酒店前台或公共主路，再询问指定的上层或下层入口。出租车同样可能需要道路层面的入口，而不是景点中心点。", tone: "warning"},
  {id: "change-conditions", type: "table", caption: "哪些情况会改变路线选择", columns: ["情况", "更稳妥的应对"], rows: [
    ["下雨或台阶湿滑", "优先选择有遮蔽的轨道交通、公共电梯/扶梯或道路接驳。"],
    ["车站出口临时关闭", "按当天车站通知绕行，不要照搬旧社交媒体路线。"],
    ["深夜抵达", "使用已经确认、照明良好的道路层入口；没有确认开放时，不要依赖夜间商场、楼内通道、电梯或扶梯。"],
    ["大件行李", "离开酒店前先确认车辆可以到达的入口。"],
    ["炎热或疲劳", "在轨道站或公共垂直连接处分段，不要连续叠加爬升。"]
  ]},
  {id: "dynamic-boundary", type: "callout", title: "核验日期：2026 年 8 月 13 日", body: "文中的实物案例用于解释重庆城市形态，并不承诺每部电梯、扶梯、出口或通道始终开放。施工和临时关闭会变化，请在出行当天查看重庆轨道交通及场馆的现行通知。", tone: "neutral"},
  {id: "help", type: "callout", title: "需要把一条重庆路线按三维空间核对吗？", body: "把日期、酒店与目的地的准确入口、人数、行李、步行限制和计划抵达时间发给 Homeground。我们可以标出需要确认的道路层级、出口和垂直连接，但不会承诺某部电梯、扶梯或通道届时一定开放。", tone: "decision"},
  {id: "internal-links", type: "internal-links", title: "用合适住宿地和步行节奏规划重庆", items: [
    {label: "重庆住解放碑、观音桥还是沙坪坝", href: "/zh/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/", description: "根据实际行程和车站连接选择住宿地。"},
    {label: "确认中国地图地点标记与入口", href: "/zh/guides/china-map-coordinate-offset-explained/", description: "用中文地址和真正可用的入口重建目的地。"},
    {label: "中国轮椅无障碍路线规划", href: "/zh/guides/wheelchair-accessible-china-route-planning/", description: "逐段确认行动连接，不要把一个无障碍标签理解为全程保证。"}
  ]},
  {id: "sources", type: "sources", title: "官方与独立来源", items: [
    {label: "重庆地形与轨道工程", url: "https://www.cq.gov.cn/ywdt/jrcq/202111/t20211125_10030692.html", publisher: "重庆市人民政府", reviewedAt: "2026-08-13"},
    {label: "李子坝站与楼房", url: "https://www.cq.gov.cn/zjcq/cycq/jplyxl/dsy/dsjp/202409/t20240905_13599583.html", publisher: "重庆市人民政府", reviewedAt: "2026-08-13"},
    {label: "公共电梯与皇冠大扶梯安全报告", url: "https://scjgj.cq.gov.cn/zfxxgk_225/gsgg/qtgg/202504/t20250428_14564659.html", publisher: "重庆市市场监督管理局", reviewedAt: "2026-08-13"},
    {label: "山地社区垂直出行指引", url: "https://zfcxjw.cq.gov.cn/zwgk_166/zfxxgkmls/zcwj/qtwj/202206/W020260528580878403095.pdf", publisher: "重庆市住房和城乡建设委员会", reviewedAt: "2026-08-13"},
    {label: "车站出口及扶梯临时关闭案例", url: "https://cq.gov.cn/ywdt/bmts/202606/t20260630_15787973.html", publisher: "重庆市人民政府", reviewedAt: "2026-08-13"},
    {label: "重庆轨道交通当前运营信息", url: "https://www.cqmetro.cn/smbsj.html", publisher: "重庆轨道交通", reviewedAt: "2026-08-13"},
    {label: "三维垂直城市中的步行行为研究", url: "https://www.sciencedirect.com/science/article/pii/S016920462200192X", publisher: "Landscape and Urban Planning", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
