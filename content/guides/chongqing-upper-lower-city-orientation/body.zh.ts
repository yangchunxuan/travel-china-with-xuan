import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "重庆需要扶梯、公共电梯、桥梁、隧道和穿楼轨道，是因为平面地图隐藏了第三个维度。两个地点横向很近，却可能位于高差很大的两条道路上，中间还没有直达楼梯。看到“步行几分钟”时，先问三个问题：在哪一层、从哪个车站出口、进入哪个建筑入口？"},
  {id: "three-coordinates", type: "table", caption: "重庆目的地有三组坐标", columns: ["坐标", "需要核对", "常见失败"], rows: [
    ["平面位置", "正确名称、分店和街区。", "到达附近同名地点。"], ["垂直高度", "上层道路、下层道路、江边或裙楼层。", "地点就在头顶或脚下，却找不到路。"], ["可用连接", "指定车站出口、电梯、扶梯、桥或公共楼梯。", "直线很短，实际变成长爬坡或绕行。"]
  ]},
  {id: "machines-as-streets", type: "heading", level: 2, text: "这些机械设施本来就是街道网络的一部分"},
  {id: "machines-copy", type: "paragraph", text: "皇冠大扶梯和凯旋路公共电梯不只是景点，重庆官方资料把它们描述为连接城市高差的交通设施。山地社区设计指引同样把电梯和扶梯视为垂直出行基础设施。当坡地、悬崖边缘、建筑裙楼或中断的道路阻挡水平通行时，它们的功能最容易被理解。"},
  {id: "liziba", type: "heading", level: 2, text: "李子坝是协同设计，不是列车意外撞进楼里"},
  {id: "liziba-copy", type: "paragraph", text: "重庆官方介绍明确，李子坝站和楼房是同步协调设计，轨道结构与楼体结构相互分离，以控制振动和噪声。这个著名画面是复杂地形和高密度城市中的工程回应，而不是后来随意把旧住宅打穿。"},
  {id: "route-method", type: "list", ordered: true, items: ["保存目的地完整中文名和所需入口，不只保存地图点。", "核对轨道站出口编号，以及出口说明是否对应上层或下层道路。", "查看路线中是否有台阶、陡坡、桥、隧道、商场或穿楼通道。", "若带行李、轮椅或慢行家人，请酒店或场馆用中文确认最后一段。", "到达后先对照路名和建筑入口，再决定是否开始长距离下坡。", "电梯、扶梯或通道关闭时，退回最近一个有明确名称的公共道路或车站站厅重新规划。"]},
  {id: "scenarios", type: "comparison", title: "同样的地图距离，对不同旅客完全不同", columns: [
    {heading: "只背轻便日用包", body: "有标识的楼梯可能既高效又有城市体验，但仍要保留原路返回的体力，以防下一段关闭。"}, {heading: "行李箱、父母或行动不便", body: "即使地图更远，也优先选已确认的电梯、扶梯、可停车道路或合适车站出口。垂直路线确定性比直线距离更重要。"}
  ]},
  {id: "wrong-level-recovery", type: "callout", title: "目的地就在正上方或正下方怎么办", body: "不要钻进没有标识的住宅楼梯，也不要走机动车坡道。保存当前路名，退回有工作人员的车站入口、酒店前台或主干道路，询问指定的上层或下层入口。打车时也可能需要提供道路层入口，而不是景点中心点。", tone: "warning"},
  {id: "change-conditions", type: "table", caption: "哪些条件会改变路线选择", columns: ["条件", "更稳妥的应对"], rows: [
    ["下雨或台阶湿滑", "优先选有遮蔽的轨道、公共电梯/扶梯或道路接驳。"], ["车站出口临时关闭", "看当天轨道交通通知，不照搬旧社交媒体路线。"], ["深夜抵达", "选择有人值守、照明好的主路，不走非正式捷径。"], ["大件行李", "离开酒店前确认车辆可以停靠的入口。"], ["炎热或疲劳", "在轨道站或公共垂直交通处拆分路线，不连续叠加爬坡。"]
  ]},
  {id: "dynamic-boundary", type: "callout", title: "核验日期：2026 年 8 月 13 日", body: "这些实物案例用于解释重庆城市形态，并不承诺每部电梯、扶梯、出口或通道始终开放。施工和临时关闭会变化，出行当天应查看重庆轨道交通和场馆通知。", tone: "neutral"},
  {id: "internal-links", type: "internal-links", title: "用合适住宿地和节奏规划重庆", items: [
    {label: "重庆住解放碑、观音桥还是沙坪坝", href: "/zh/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/", description: "按实际行程与车站连接选住宿地。"}, {label: "确认中国地图地点标记和入口", href: "/zh/guides/china-map-coordinate-offset-explained/", description: "用中文地址和可用入口重新确认目的地。"}, {label: "中国无障碍路线规划", href: "/zh/guides/wheelchair-accessible-china-route-planning/", description: "逐段核对无障碍连接，不把一个标签当作全程保证。"}
  ]},
  {id: "sources", type: "sources", title: "官方与独立来源", items: [
    {label: "重庆地形与轨道工程", url: "https://www.cq.gov.cn/ywdt/jrcq/202111/t20211125_10030692.html", publisher: "重庆市人民政府", reviewedAt: "2026-08-13"}, {label: "李子坝站与楼房", url: "https://www.cq.gov.cn/zjcq/cycq/jplyxl/dsy/dsjp/202409/t20240905_13599583.html", publisher: "重庆市人民政府", reviewedAt: "2026-08-13"}, {label: "公共电梯与皇冠大扶梯安全报告", url: "https://scjgj.cq.gov.cn/zfxxgk_225/gsgg/qtgg/202504/t20250428_14564659.html", publisher: "重庆市市场监督管理局", reviewedAt: "2026-08-13"}, {label: "山地社区垂直出行指引", url: "https://zfcxjw.cq.gov.cn/zwgk_166/zfxxgkmls/zcwj/qtwj/202206/W020260528580878403095.pdf", publisher: "重庆市住房和城乡建设委员会", reviewedAt: "2026-08-13"}, {label: "三维垂直城市中的步行行为研究", url: "https://www.sciencedirect.com/science/article/pii/S016920462200192X", publisher: "Landscape and Urban Planning", reviewedAt: "2026-08-13"}
  ]}
]};
export default body;
