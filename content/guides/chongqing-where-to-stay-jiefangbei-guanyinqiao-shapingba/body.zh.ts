import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "在重庆，“离景点近”常常不够准确。平面地图上相邻的两家酒店，可能隔着坡道、楼梯、电梯或不同街面层级。住宿应减少每天反复发生的移动，而不是追求最长的景点清单。" },
  { id: "answer", type: "callout", title: "先给结论", tone: "decision", body: "第一次来、停留短且重点在重庆中心半岛半岛密集景点与夜景，可优先解放碑；更想住在现代商业中心、重视餐饮购物与夜间活动，可比较观音桥；西站或西侧景点确实占据行程时，沙坪坝才更合理，不能只因为看起来“远离游客”就选。" },
  { id: "matrix-heading", type: "heading", level: 2, text: "三个区域分别改变什么" },
  { id: "matrix", type: "table", caption: "比较每日链路，而非区域名气", columns: ["住宿区", "更适合", "主要牺牲", "预订前核对"], rows: [
    ["解放碑／重庆中心半岛核心", "首次短停、Hongyadong—朝天门—半岛夜间活动", "人流、道路拥堵与容易误判的立体步行", "酒店入口层级、可用地铁出口与车辆下客点"],
    ["观音桥", "餐饮、购物与现代商业区夜生活", "前往重庆中心半岛经典景点通常仍需跨区", "酒店在整个商圈的准确一侧"],
    ["沙坪坝", "重庆西站逻辑、磁器口或西侧行程", "重庆中心半岛夜游后的返回更长", "准确车站与轨道连接，不把整个行政区当成一个点"]
  ]},
  { id: "terrain", type: "callout", title: "地图600米不一定是轻松步行600米", tone: "warning", body: "在重庆核心区，除了距离还要看高差。向住宿方索取中文入口名、车辆下客点，以及他们建议携带行李使用的地铁出口。一个地铁图标无法说明楼梯、坡道和最终入口。" },
  { id: "fit-heading", type: "heading", level: 2, text: "按每天会重复的路程选择" },
  { id: "fit", type: "comparison", title: "三种常见行程", columns: [
    { heading: "首次停留两三晚", items: ["倾向解放碑", "把夜间步行留在酒店附近", "用人流换取更少的晚间换乘"] },
    { heading: "重视餐饮与城市生活", items: ["比较观音桥", "确认具体街区", "为重庆中心半岛游览日计算交通"] },
    { heading: "西侧抵达或游览", items: ["用准确车站检验沙坪坝", "把磁器口与西侧景点集中安排", "不要每天都在重庆中心半岛晚归"] }
  ]},
  { id: "luggage-heading", type: "heading", level: 2, text: "行李与晚到会改变答案" },
  { id: "luggage", type: "paragraph", text: "带儿童、老人或大件行李时，已确认的车辆入口往往比看似中心的定位更重要。保存酒店中文名与地址，告知抵达方式，并询问车辆能否停在前台同一层。深夜抵达时，应先保护最后一段交接，而不是强求最理想的观光区域。" },
  { id: "facts", type: "callout", title: "动态信息核验于2026年8月12日", tone: "neutral", body: "重庆市政府英文信息仍以重庆中心半岛Kuixing Tower周边说明城市多层地形，将磁器口列于沙坪坝，并将解放碑列为活跃夜间区域。这些是地理事实；上面的住宿取舍属于Homeground编辑判断。出发前仍须用官方渠道和住宿方核对实时轨道运营、出口、道路进入与施工。" },
  { id: "checklist", type: "list", ordered: true, items: ["标出所有固定抵达与离开地点。", "找出每天最常重复的两段路。", "检查高差与酒店准确入口。", "模拟一次真实的夜间返回。", "在免费取消截止前确认车辆进入与住宿登记。"] },
  { id: "help", type: "callout", title: "需要判断酒店位置？", tone: "decision", body: "提供日期、人数、抵达点、计划景点与大致预算，Homeground可以比较区域，并标出仍须向住宿方确认的位置细节。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "商业公寓酒店还是住宅短租", href: "/zh/guides/commercial-aparthotel-or-residential-rental-china/", description: "为了空间下单前，先核对运营模式。" },
    { label: "上海第一次住宿区域", href: "/zh/guides/shanghai-where-to-stay-first-trip/", description: "把重复路程方法用于上海。" },
    { label: "酒店“靠近地铁”应如何判断", href: "/zh/guides/china-hotel-near-metro/", description: "检验最后一段步行，而不是标签。" }
  ]},
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
    { label: "重庆重庆中心半岛立体地形官方介绍", url: "https://english.cq.gov.cn/latestnews/Editor/202606/t20260608_15735957.html", publisher: "重庆市人民政府", reviewedAt: "2026-08-12" },
    { label: "沙坪坝磁器口官方访客信息", url: "https://english.cq.gov.cn/latestnews/activities/202606/t20260608_15735764.html", publisher: "重庆市人民政府", reviewedAt: "2026-08-12" },
    { label: "含解放碑的2026年官方夜间活动介绍", url: "https://english.cq.gov.cn/latestnews/activities/202607/t20260714_15821893.html", publisher: "重庆市人民政府", reviewedAt: "2026-08-12" },
    { label: "首图：Baycrest拍摄解放碑夜景，CC BY-SA 2.5，已裁切并转为WebP", url: "https://commons.wikimedia.org/wiki/File:Jiefangbei_night.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "首图衍生文件许可证：CC BY-SA 2.5", url: "https://creativecommons.org/licenses/by-sa/2.5/", publisher: "Creative Commons", reviewedAt: "2026-08-12" }
  ]}
] } as const satisfies StructuredPageBody;
export default body;
