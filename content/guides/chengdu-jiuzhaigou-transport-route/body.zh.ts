import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "成都出发的火车能减少大量公路时间，却不会把旅客直接送到九寨沟景区。真正的产品是火车、明确的站到景区接驳，以及当天仍能运行的回程。" },
  { id: "answer", type: "callout", title: "把接驳和回程当作路线的一部分", tone: "decision", body: "先查黄龙九寨站的火车，再找官方或名称明确的后续接驳。只有当天有可确认的景区连接时，才把Songpan站当作备选。若航班或全程车辆更符合人数、天气缓冲与成都两端位置，再纳入比较。" },
  { id: "matrix-heading", type: "heading", level: 2, text: "交通方式其实是一条链" },
  { id: "matrix", type: "table", caption: "缺少九寨沟最后一段，任何方案都不完整", columns: ["链路", "较合适", "隐藏摩擦", "核对"], rows: [
    ["成都火车→黄龙九寨→景区", "同日火车和车站接驳能衔接", "正确成都车站、山路末段和定时接驳", "车次、车站、合规接驳、下车点与回程"],
    ["成都火车→Songpan→景区", "有合适余票与已确认后续服务", "不同车站和公路接驳，不能自动替换", "准确上车点与是否送到住宿"],
    ["航班→机场接驳", "航班与机场两端确实缩短全程", "机场交通、天气、行李与剩余公路段", "机场、航班、接机与中断条款"],
    ["全程公路车辆", "多人重视一次上车并能接受公路日", "山区公路、司机休息与天气", "合规车辆、司机、停车、安全带与取消"],
  ]},
  { id: "warning", type: "callout", title: "黄龙九寨是火车站，不是景区门口", tone: "warning", body: "保存三个定位：火车站、九寨沟住宿和将使用的景区入口。到达其中一个地点的接驳票，不一定能到另外两个。" },
  { id: "steps-heading", type: "heading", level: 2, text: "按这个顺序建立预订" },
  { id: "steps", type: "list", ordered: true, items: ["先选九寨沟住宿与到店截止。", "找日期明确且下车点精确的车站或机场接驳。", "选择留有安全换乘时间的火车或航班。", "确认去程前先反向建立回程。", "加入山区天气与服务中断恢复。"] },
  { id: "groups", type: "comparison", title: "什么会改变答案", columns: [
    { heading: "轻装独立", items: ["火车加巴士可以清楚", "保存中文上车细节", "带食物和电量"] },
    { heading: "家庭或父母", items: ["减少路边换乘", "为海拔与休息留空间，不做医疗判断", "确认酒店接待时间"] },
    { heading: "寒冷季节或固定航班", items: ["增加中断缓冲", "避免分开的无保护票", "保留成都或当地过夜备选"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "一段失败时" },
  { id: "recovery", type: "table", caption: "先保护下一个安全地点", columns: ["失败", "恢复"], rows: [
    ["火车晚点影响接驳", "到站前联系指定接驳方并要求书面规则"],
    ["到了错误车站", "停下，读取票面站名并从当前位置查官方余票"],
    ["山路中断", "依照交通、文旅与运营方通知，不坐未经确认的路边车辆"],
    ["回程余票消失", "先保护住宿和下一班航班，再建立新链路"],
  ]},
  { id: "facts", type: "callout", title: "动态交通信息核验于2026年8月12日", tone: "neutral", body: "四川官方来源说明黄龙九寨站至九寨沟的客运接驳，并在后续信息中涉及黄龙九寨与Songpan的运力安排。火车余票、接驳发车、道路、航班与景区进入均按日期变化；本文不承诺时刻或票价。" },
  { id: "help", type: "callout", title: "需要核对铁路与公路交接？", tone: "decision", body: "提供日期、成都酒店、九寨沟酒店、人数、行李和固定航班。Homeground可标出交接点与保守缓冲，实时运营仍以承运方为准。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "第一次坐中国高铁", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "选定准确站点后再使用。" },
    { label: "夜车还是白天高铁", href: "/zh/guides/china-night-train-or-daytime-high-speed-rail/", description: "比较时间表形状，不只看时长。" },
    { label: "你的行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "给山区接驳真实缓冲。" },
    { label: "外国游客如何在中国付款", href: "/zh/guides/how-to-pay-in-china-as-a-tourist/", description: "为每一段准备付款恢复。" },
  ]},
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
    { label: "黄龙九寨站接驳安排", url: "https://wlt.sc.gov.cn/scwlt/hydt/2024/8/30/5008ba73ea8b45b6bf1d9fedf998f465.shtml", publisher: "四川省文化和旅游厅", reviewedAt: "2026-08-12" },
    { label: "黄龙九寨与Songpan运力更新", url: "https://gzw.sc.gov.cn/scsgzw/CU230505/2025/10/23/f65a8a3aaf9948b9908811db46f92f8b.shtml", publisher: "四川省国资委", reviewedAt: "2026-08-12" },
    { label: "铁路官方售票渠道", url: "https://www.12306.cn/en/index.html", publisher: "中国铁路12306", reviewedAt: "2026-08-12" },
    { label: "首图：Chensiyuan拍摄九寨沟，CC BY-SA 4.0，已裁切", url: "https://commons.wikimedia.org/wiki/File:1_jiuzhaigou_valley_wu_hua_hai_2011b.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
