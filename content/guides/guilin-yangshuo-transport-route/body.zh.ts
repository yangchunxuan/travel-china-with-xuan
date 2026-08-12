import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "桂林与阳朔不是两个单一定位。桂林有机场和多个火车站；阳朔站是交通枢纽，不能代替阳朔酒店。水路又有自己的码头和行李链。" },
  { id: "answer", type: "callout", title: "按两端地址与当天任务选择", tone: "decision", body: "机场或酒店门口与行李最重要时比较公路接驳；准确车站与后续车辆能组成清楚链路时比较火车；漓江游船应当作改变交通安排的观光日，而不是普通快速接驳。" },
  { id: "matrix-heading", type: "heading", level: 2, text: "三种产品不能只按一个时长排名" },
  { id: "matrix", type: "table", caption: "每个方案从不同地点开始和结束", columns: ["方案", "适合", "缺少的一段", "核对"], rows: [
    ["阳朔站火车", "直通列车或合适桂林车站能衔接", "阳朔一侧的车站到酒店公路接驳", "准确站名、当天列车与确认接车"],
    ["公路巴士或车辆", "机场/酒店两端、家庭或多个行李箱", "道路、准确上车点与多个可能下车点", "合规运营方、两端定位、行李与最晚入住"],
    ["漓江游船", "水上旅程是计划体验且方向合适", "码头交通、行李、天气水情与酒店接驳", "官方或授权产品、码头、日期、行李规则与到达点"],
  ]},
  { id: "warning", type: "callout", title: "到阳朔站不等于到西街", tone: "warning", body: "购票前分别定位火车站与住宿。若桂林出发站或阳朔公路接驳选错，一段很短的火车也可能失去优势。" },
  { id: "direction-heading", type: "heading", level: 2, text: "水路观光日要考虑方向" },
  { id: "direction", type: "paragraph", text: "不要假设观光游船是对称的往返交通。核对出发码头、到达码头、运营日期、行李处理和到酒店的后续交通。返程应单独建立，不能把去程反过来复制。" },
  { id: "groups", type: "comparison", title: "让链路符合旅客", columns: [
    { heading: "机场抵达", items: ["保护航班晚点缓冲", "公路可能减少两次交接", "晚到时通知酒店"] },
    { heading: "铁路通行", items: ["搜索准确阳朔站停靠", "确认车站接车", "没有理由就不绕桂林市区"] },
    { heading: "重视风景、时间宽松", items: ["把水路当成当天目的", "有计划地移动或寄存行李", "保留天气恢复"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "两端不匹配时" },
  { id: "recovery", type: "list", ordered: true, items: ["读取预订中的完整车站、码头或站点。", "把酒店准确定位发给授权运营方。", "换方式前先保护入住与下一班固定列车。", "实时变化只看铁路与当地交通官方通知。", "不要因为路边车辆写着阳朔就乘坐不明车。"] },
  { id: "facts", type: "callout", title: "动态交通信息核验于2026年8月12日", tone: "neutral", body: "广西官方规划把机场、火车站、公路交通和重点景区视为不同节点，并要求协调最后一公里。列车、公路巴士、游船、码头、票价、行李与天气运营均按日期变化；本文不发布固定时刻表。" },
  { id: "help", type: "callout", title: "需要比较两端？", tone: "decision", body: "提供日期、桂林抵达点、阳朔酒店、人数、行李，以及水路是交通还是体验。Homeground可标出交接与需重查的事实。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "第一次坐中国高铁", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "选定车站后再准备乘车。" },
    { label: "你的行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "给水路或公路日足够空间。" },
    { label: "外国游客如何在中国付款", href: "/zh/guides/how-to-pay-in-china-as-a-tourist/", description: "为最后一段保留付款备选。" },
    { label: "中国酒店靠近地铁是否重要", href: "/zh/guides/china-hotel-near-metro/", description: "理解车站标签何时真正帮助住宿。" },
  ]},
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
    { label: "桂林交通与最后一公里政策", url: "https://fgw.gxzf.gov.cn/zfxxgkzl/wjzx/tzgg/t2196037.shtml", publisher: "广西发展改革委", reviewedAt: "2026-08-12" },
    { label: "铁路运营变动提示", url: "https://jtt.gxzf.gov.cn/xwdt/tpxw/t8700434.shtml", publisher: "广西交通运输厅", reviewedAt: "2026-08-12" },
    { label: "铁路官方售票渠道", url: "https://www.12306.cn/en/index.html", publisher: "中国铁路12306", reviewedAt: "2026-08-12" },
    { label: "首图：Rat2拍摄阳朔站，CC BY-SA 4.0，已裁切", url: "https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
