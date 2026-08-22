import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "西湖是一组需要分段阅读的山水关系，不是沿地图蓝色边缘完成的体能测试。湖岸、堤、岛、山和城市边缘各自不同。第一次游览应选步行、游船或骑行中的一种作为主方式，第二种只做连接；目标是有头有尾且能退出的半天，不是完整绕湖。" },
  { id: "answer", type: "callout", title: "直接结论", tone: "decision", body: "重视故事、园林和湖岸细节时以步行为主；重视水面视角或岛屿时，在核对当天官方运营后坐船；自行车只在允许道路上做短连接，不作为贴湖完整环线。大多数第一次来的人适合一段重点步行加一次游船或公交退出，而不是把三种方式都拉满。" },
  { id: "mode-heading", type: "heading", level: 2, text: "三种方式解决三种问题" },
  { id: "mode", type: "table", caption: "选择主方式", columns: ["方式", "能看见什么", "隐藏成本"], rows: [["步行", "堤岸尺度、园林、桥、题刻及湖山关系变化", "距离累积，地图不显示炎热、拥挤和绕行"], ["游船", "水面视角、上岛及不同湖岸间的清晰转换", "线路、码头、天气、排队和末班均动态"], ["骑行", "选定陆地区段间快速连接", "禁骑区、停车点、车流和账号支付会中断"]] },
  { id: "anchor-heading", type: "heading", level: 2, text: "只选一个湖岸故事" },
  { id: "anchors", type: "comparison", title: "第一次游览的三个锚点", columns: [{ heading: "城市边缘与断桥", body: "快速看杭州中心、湖面与白堤/孤山关系，易于缩短但经常拥挤。" }, { heading: "苏堤与西岸", body: "适合长湖山视线、园林停靠和慢山水日，实际距离比明信片大。" }, { heading: "南岸与雷峰塔一带", body: "适合以雷峰塔、晚光或南湖路线为核心；一个收费景点可能吃掉整段湖岸时间。" }] },
  { id: "walk-heading", type: "heading", level: 2, text: "步行路线必须先有停止规则" },
  { id: "walk", type: "paragraph", text: "在两个强退出点之间做单向步行，例如从城市边缘走向孤山后离开，或只走苏堤一段再乘公交/车退出。不要在还不知道温度、人流和每座园林会停多久时，先承诺绕完整湖。" },
  { id: "boat-heading", type: "heading", level: 2, text: "游船要改变路线，而不是装饰路线" },
  { id: "boat", type: "paragraph", text: "只有当游船提供有意义的水面视角、抵达命名岛屿或把你送到下一任务所需湖岸时才加入。当天确认运营方、具体码头、线路、票务条件和末班。小船、观光船和上岛线路可能有不同上下船逻辑，不能假设都绕圈或通票。" },
  { id: "bike-heading", type: "heading", level: 2, text: "骑行是有法律断点的连接方式" },
  { id: "bike", type: "callout", title: "不要沿水边直接画一圈自行车线", tone: "warning", body: "步行区、景区管控、拥挤堤道、停车规则和城市车流会切断贴湖环线。只在标志允许处骑行，拥挤或禁骑区下车，在规定区域还车，并为App/还车失败准备公交备选。" },
  { id: "plans-heading", type: "heading", level: 2, text: "三个实用半日方案" },
  { id: "plans", type: "table", caption: "三选一，不要全部合并", columns: ["方案", "顺序", "适合"], rows: [["经典初见", "城市边缘湖景→白堤/孤山步行→公交退出", "第一次来且不想绕湖"], ["水面与园林", "西/南岸园林锚点→若运营则坐官方船→短对岸步行", "重视山水构图和坐下恢复"], ["快速连接", "一段重点步行→合法骑行或地铁公交→最后一个视点", "重游者或另有定时景点"]] },
  { id: "exit-heading", type: "heading", level: 2, text: "开始前先设计退出" },
  { id: "exit", type: "list", items: ["保存两个中文公交或合法接送退出点。", "第一条堤或第一个景点后设置天气与体力复盘。", "坐船前确认它实际到哪一岸哪个码头。", "骑行前确认进入禁骑区前可在哪里合法还车。", "把吃饭、厕所和一次坐下停留放进路线。"] },
  { id: "weather", type: "table", caption: "天气会改变最佳方式", columns: ["情况", "更好处理"], rows: [["闷热", "短而有荫的步行、早晚时段和坐式换乘"], ["下雨", "防滑鞋、缩短暴露堤段并重查船运"], ["大风或暴雨预警", "服从景区/运营关闭，改做杭州室内计划"], ["客流高峰", "选较松的一段湖岸，乘公共交通绕开瓶颈"]] },
  { id: "recovery", type: "callout", title: "当天已经出错时，不要再增加交通方式", tone: "decision", body: "游船停运、共享单车账号失败或脚已疼时，不要用另一条野心环线补偿。保住最近最强的湖岸故事，乘公交或合法接送离开，保护下一餐、火车或酒店入住。" },
  { id: "boundary", type: "callout", title: "本页不负责西湖每个景点", tone: "neutral", body: "它只负责步行/坐船/骑行及退出逻辑。博物馆、塔、寺院、演出和季节活动各自遵循实时规则；白蛇传指南负责传说及杭州—镇江文化语境。" },
  { id: "links", type: "internal-links", title: "继续规划杭州", items: [{ label: "杭州城市Hub", href: "/zh/destinations/hangzhou/", description: "选择夜数、区域和其他城市任务。" }, { label: "白蛇传", href: "/zh/guides/white-snake-legend-hangzhou-zhenjiang/", description: "理解湖边地点为何不只是景色。" }, { label: "上海到杭州交通", href: "/zh/guides/shanghai-hangzhou-transport-route/", description: "把湖区与跨城换乘分开。" }, { label: "沪苏杭宁顺序", href: "/zh/guides/shanghai-suzhou-hangzhou-nanjing-route-order/", description: "在江南路线中正确安排杭州。" }, { label: "行程是不是太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "诚实计算步行、退出和景点深度。" }] },
  { id: "sources", type: "sources", title: "一手来源与图片署名", items: [{ label: "杭州西湖景区官方信息门户", url: "https://westlake.hangzhou.gov.cn/", publisher: "杭州西湖风景名胜区管理委员会", reviewedAt: "2026-08-22" }, { label: "杭州西湖文化景观", url: "https://whc.unesco.org/en/list/1334", publisher: "联合国教科文组织世界遗产中心", reviewedAt: "2026-08-22" }, { label: "头图：Windmemories拍摄西湖与杭州天际线，CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:20260424_West_Lake_and_Hangzhou_Skyline.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }] }
] } as const satisfies StructuredPageBody;
export default body;
