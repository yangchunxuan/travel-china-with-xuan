import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "八达岭有多种公共交通，但它们从北京不同枢纽出发，到达点也不完全相同。先比较酒店到枢纽的首段与回程余量，不要只看最短车上时间。" },
  { id: "answer", type: "callout", title: "线路名称只回答了一半", tone: "decision", body: "酒店去清河或北京北站方便、当天有合适列车时先查高铁；S2市郊铁路使用自己的当前始发站；德胜门顺路时877路值得比较；机场直达线路只有机场确实是起点或终点时才相关，不能拿来当市区捷径。" },
  { id: "matrix-heading", type: "heading", level: 2, text: "四条路线，四种首段" },
  { id: "matrix", type: "table", caption: "按出发日期核对每个完整站名", columns: ["路线", "较好的出发条件", "摩擦", "不要假设"], rows: [
    ["高铁", "清河或北京北站顺路且有合适车次", "预约车次、安检、大站与较长出站系统", "所有车都从同一北京站出发"],
    ["S2市郊铁路", "当前北京端车站和时刻合适", "独立站点、有限班次和排队", "旧文章所写始发站仍然有效"],
    ["877路公交", "德胜门方便且能接受道路波动", "寻找官方站点、排队、拥堵与回程截止", "附近标志相似的车都是官方线路"],
    ["机场直达巴士", "首都机场是真实起点或终点", "日期时刻、航站楼和景区运营日", "永久每日运行或服务大兴机场"],
  ]},
  { id: "names", type: "callout", title: "保存完整名称", tone: "warning", body: "八达岭长城站、S2八达岭站与公路巴士到达点不能当作同一名称。北京端把清河、北京北、黄土店和德胜门连同所选路线一起保存，并在当天确认。" },
  { id: "clock-heading", type: "heading", level: 2, text: "往返都要计算" },
  { id: "clock", type: "list", ordered: true, items: ["酒店或机场到正确枢纽。", "候车、安检或排队缓冲。", "计划车程与延误风险。", "到达点到所选入口及上坡移动。", "下山、集合与最后一条安全回程。"] },
  { id: "groups", type: "comparison", title: "哪一种摩擦最重要？", columns: [
    { heading: "轻装、灵活", items: ["比较所有当前公共路线", "保留第二种回程", "携带中文名称"] },
    { heading: "家庭或父母", items: ["减少枢纽不确定性", "考虑陡坡与电梯", "不要等最后一班"] },
    { heading: "衔接机场或火车", items: ["只用日期明确的官方线路", "保护行李与值机时间", "避免同日脆弱接驳"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "错枢纽或错过班次" },
  { id: "recovery", type: "table", caption: "继续移动前先恢复", columns: ["问题", "动作"], rows: [
    ["到了错误北京火车站", "查官方退改与当前位置的路线，不凭猜测穿城赶站"],
    ["S2时刻不合适", "从当前位置比较877路与当天高铁余票"],
    ["公交站不清楚", "询问工作人员，并核对完整线路与中文终点"],
    ["回程即将失败", "离开景区，锁定下一班已确认服务并通知酒店或承运方"],
  ]},
  { id: "facts", type: "callout", title: "动态交通信息核验于2026年8月12日", tone: "neutral", body: "北京官方信息目前把877路、S2市郊铁路和高铁列为不同路线；2026年另公布了首都机场至八达岭的日期型服务。车站、班次、票价、景区接驳与运营日均可能改变，出发前重查。" },
  { id: "help", type: "callout", title: "需要按酒店核对路线？", tone: "decision", body: "提供日期、北京酒店或机场航站楼、人数、行动需求和晚间固定安排。Homeground可比较完整链路与恢复点，但不保证实时余票。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "北京应该选哪个火车站", href: "/zh/guides/which-beijing-railway-station/", description: "识别清河、北京北和其他主要枢纽。" },
    { label: "第一次去北京住哪里", href: "/zh/guides/beijing-where-to-stay-first-trip/", description: "住宿区域会改变首段。" },
    { label: "北京到慕田峪", href: "/zh/guides/beijing-to-mutianyu-great-wall-transfer/", description: "确定去慕田峪后再使用。" },
    { label: "你的行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "保护长距离接驳的一天。" },
  ]},
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
    { label: "八达岭公共交通路线", url: "https://english.beijing.gov.cn/latest/news/202406/t20240624_3725018.html", publisher: "北京市政府", reviewedAt: "2026-08-12" },
    { label: "877路游客指引", url: "https://english.beijing.gov.cn/latest/news/202407/t20240728_3760871.html", publisher: "北京市政府", reviewedAt: "2026-08-12" },
    { label: "2026首都机场直达服务", url: "https://english.beijing.gov.cn/livinginbeijing/transportation/bus/202602/t20260211_4507827.html", publisher: "北京市政府", reviewedAt: "2026-08-12" },
    { label: "首图：N509FZ拍摄八达岭站，CC BY-SA 4.0，已裁切", url: "https://commons.wikimedia.org/wiki/File:Exterior_of_Badaling_Great_Wall_Railway_Station_(20220109161541).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
