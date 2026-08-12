import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "不要只对司机说“大理古城”。火车到站前，先问住宿方离酒店最近、车辆可以到达的城门或路边会合点。南门、东侧洱海门、西侧苍山门/西门和北门，会留下完全不同的最后步行。真正有用的链路是“大理站→已确认城门→酒店可达入口”，不是“大理站→大理古城这个模糊定位”。" },
  { id: "answer", type: "callout", title: "下车点由酒店位置决定", tone: "decision", body: "把到达时间和行李情况发给酒店，书面询问：“出租车最接近酒店可以到哪个城门或路边点？”保存酒店的中文回复。到大理站后，再比较当天官方公交/直通服务与出租车或正规接站车，目的地都必须是这个准确落点。历史线路号可以帮助理解方向，但只有当天官方页面或站牌能证明是否运营。" },
  { id: "before-heading", type: "heading", level: 2, text: "火车到大理之前" },
  { id: "before", type: "list", ordered: true, items: [
    "离线保存酒店完整中文名、电话和地图定位。",
    "询问离酒店最近的车辆可达城门，而不是步行地图上最近的景点。",
    "问清最后一段是否有石板路、台阶、步行区限制或酒店行李车。",
    "告诉酒店有几只多大的箱子，以及是否有儿童、年长者或走得慢的人。",
    "截屏约定会合点，并另存一个古城管制道路外的备用点。"
  ]},
  { id: "card-heading", type: "heading", level: 2, text: "中文目的地卡" },
  { id: "card", type: "callout", title: "把这个格式给司机看", tone: "neutral", body: "目的地：〔酒店完整中文名〕 / 下车点：〔大理古城南门游客中心、洱海门、苍山门/大理古城西门，或大理古城北门〕 / 联系电话：〔酒店电话〕 / 备注：我们有〔行李数量〕件行李，请送到车辆可以到达、离酒店最近的位置。务必保留酒店自己的表述，不要在没有确认时从这份清单里随便选一个门。" },
  { id: "gate-heading", type: "heading", level: 2, text: "把城门当作最后一公里走廊" },
  { id: "gate-matrix", type: "table", caption: "只说明方向；当天能否通车仍要问酒店", columns: ["下车走廊", "通常适合附近住宿", "官方交通背景", "最后一段风险"], rows: [
    ["大理古城南门游客中心", "复兴路南段/文献路一带", "大理官方资料曾把火车站游客服务引向南门区域", "游客中心不等于每家南侧酒店，仍可能要步行"],
    ["洱海门 · 东侧", "人民路东段或玉洱路东段", "大理官方资料曾把 8 路走廊指向洱海门附近", "旧线路说明不是实时班次，东侧不同巷道车辆权限不同"],
    ["苍山门 / 大理古城西门", "古城西侧或苍山方向", "交通主管部门的线路说明曾包含西门走廊", "在错误一侧下车，可能要拖箱横穿很长石板路"],
    ["大理古城北门", "古城北侧地址", "官方目的地资料曾说明市区公交通往北门一带", "公交终点和酒店入口可能不同，当天仍须核实"]
  ]},
  { id: "station-heading", type: "heading", level: 2, text: "从站台走到正确车辆" },
  { id: "station-steps", type: "list", ordered: true, items: [
    "沿车站出站指示走，所有行李拿齐前让同行者保持在一起。",
    "在中文目的地卡和车辆身份明确前，不接受主动招揽的“古城”用车。",
    "坐公共交通时，查看当天站牌或官方渠道是否到指定城门；不要只因为车上写“古城”就上车。",
    "坐出租车/网约车时，去正规上车区，装行李前先把目的地卡发给司机。",
    "把车辆信息发给酒店，让酒店按约定落点等待或跟进。",
    "到城门后，如果街道、标志或剩余步行与截屏不符，先联系酒店再卸箱。"
  ]},
  { id: "travellers-heading", type: "heading", level: 2, text: "不同旅客需要不同的最后一公里" },
  { id: "travellers", type: "comparison", title: "行李和步行能力会改变交通方式", columns: [
    { heading: "轻装、白天到达", items: ["当天仍运营的公共交通可能高效", "当天核实城门站点", "只接受已知的最后步行"] },
    { heading: "家庭或多只大箱", items: ["选择容量已经确认的车辆", "询问酒店一侧最可达点", "到达前安排酒店协助"] },
    { heading: "晚到或走路较慢", items: ["选择不确定交接最少的一条", "确认入住和电话畅通", "不要尝试一个离酒店很远的城门"] }
  ]},
  { id: "dynamic", type: "callout", title: "线路号属于动态运营事实", tone: "warning", body: "大理和云南交通主管部门曾公布车站到古城服务，以及南门、西门和洱海门方向，并会在高峰增加运力。这些资料不能保证未来某一班、票价、站点或运营时间。出行当天要看车站显示、官方公交渠道或人工服务台。" },
  { id: "recovery-heading", type: "heading", level: 2, text: "下错点后怎么恢复" },
  { id: "recovery", type: "table", caption: "不要默认拖箱横穿古城", columns: ["问题", "立即处理", "恢复"], rows: [
    ["出发前司机说的是另一个门", "先别装行李，给司机看酒店消息", "让酒店与司机通话，或在平台内改目的地"],
    ["已经在错误城门下车", "留在有灯光、可识别的路边点并联系酒店", "在正规出租车/网约车点重新去正确城门，并保存新车记录"],
    ["车辆无法进入巷道", "卸箱前确认这里就是约定的车辆可达点", "叫酒店行李车/工作人员来接；否则转到已保存的备用点"],
    ["公共交通已经收班或改线", "回到有人服务的车站区域或正规出租车区", "坐可核实车辆去已保存的城门，不跟非正规揽客者走"],
    ["手机或网络失效", "在人工服务点使用离线中文卡和酒店电话", "同行者保持在一起，不要分头去不同城门"]
  ]},
  { id: "verify-heading", type: "heading", level: 2, text: "离开车站前最终检查" },
  { id: "verify", type: "list", items: [
    "酒店、城门、车辆可达会合点是三个分开保存的字段。",
    "中文目的地卡和酒店电话可以离线使用。",
    "已找到当天官方交通信息或出租车上车区。",
    "车辆行李容量和无障碍需求已经确认。",
    "酒店知道到达车辆和剩余步行。",
    "道路权限变化时，有第二个城门/路边备用点。"
  ]},
  { id: "help", type: "callout", title: "需要把大理站到达与酒店城门对应起来？", tone: "decision", body: "把日期、车次、酒店、人数、行李和步行限制发给 Homeground。我们可以整理交接字段并指出不现实的下车点；实时公交、道路权限和车辆供应仍以运营方为准。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "Homeground 交通与行程指南", href: "/zh/guides/", description: "返回上级指南集合页。" },
    { label: "第一次坐中国高铁指南", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "先准备铁路到达，再完成最后一公里。" },
    { label: "昆明、大理、丽江、香格里拉顺序", href: "/zh/guides/kunming-dali-lijiang-shangri-la-route-order/", description: "把大理放进正确的云南路线顺序。" },
    { label: "中国行程用单一基地还是多地换住宿", href: "/zh/guides/china-hub-and-spoke-or-multi-base-route/", description: "判断拖行李换基地是否值得。" },
    { label: "你的中国行程是不是太赶？", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "为车站和古城交接保留时间。" }
  ]},
  { id: "sources", type: "sources", title: "官方来源", items: [
    { label: "大理古城官方交通指南", url: "https://www.dali.gov.cn/dlzrmzf/c101724/pc/content/1968887474976559104/content_1968887474976559104.html", publisher: "大理白族自治州人民政府", reviewedAt: "2026-08-13" },
    { label: "大理站到古城线路说明", url: "https://jtyst.yn.gov.cn/html/2024/12328hyb_0924/3132885.html", publisher: "云南省交通运输厅", reviewedAt: "2026-08-13" },
    { label: "2025年大理高峰客运保障", url: "https://jtyst.yn.gov.cn/html/2025/xingyexinwen_0910/3134849.html", publisher: "云南省交通运输厅", reviewedAt: "2026-08-13" },
    { label: "2026年大理站旅客提示", url: "https://www.dali.gov.cn/dlzrmzf/c101532/pc/content/2015703305571897344/content_2015703305571897344.html", publisher: "大理白族自治州人民政府", reviewedAt: "2026-08-13" },
    { label: "铁路实时查询", url: "https://www.12306.cn/en/index.html", publisher: "中国铁路12306", reviewedAt: "2026-08-13" }
  ]}
] } as const satisfies StructuredPageBody;

export default body;
