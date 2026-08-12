import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "轮渡和大桥交通并不从同一扇门开始，也不到同一扇门结束。要比较香港酒店到正确码头或香港口岸、出入境、跨越海面，以及澳门口岸或码头到酒店。" },
  { id: "answer", type: "callout", title: "让两家酒店先决定候选", tone: "decision", body: "当天船班能连接实用码头时先看轮渡；港珠澳大桥口岸巴士是口岸到口岸服务，两侧都要加本地交通；持牌直通巴士只有准确站点与日期匹配时才会减少交接。" },
  { id: "matrix-heading", type: "heading", level: 2, text: "三种不同跨境产品" },
  { id: "matrix", type: "table", caption: "跨越海面的时间不是门到门时间", columns: ["方案", "合适", "隐藏工作", "核对"], rows: [
    ["跨境轮渡", "港澳码头都符合酒店位置", "码头手续、海况、行李与后续交通", "运营方、准确码头、船班、行李与中断条款"],
    ["大桥口岸巴士", "香港口岸和澳门口岸能顺利连接", "两侧本地交通与两端通关", "口岸交通、实时运营、付款与澳门最后一段"],
    ["持牌直通巴士", "已确认站点能减少市内换乘", "运营商路线、途中程序与道路延误", "持牌方、上下车点、口岸与退改"],
  ]},
  { id: "warning", type: "callout", title: "大桥口岸巴士不会到酒店接你", tone: "warning", body: "大桥官方指引写明：先乘本地交通到香港口岸，再乘口岸巴士到澳门口岸，之后再乘本地交通去目的地。三段车辆的大桥链，不能只拿中间一段与轮渡比较。" },
  { id: "clock-heading", type: "heading", level: 2, text: "建立六段" },
  { id: "clock", type: "list", ordered: true, items: ["酒店到码头或香港口岸。", "办理手续、候车与离境。", "轮渡、口岸巴士或直通车。", "入境与提取行李。", "澳门码头或口岸到准确酒店。", "回程余量与海况/道路备选。"] },
  { id: "groups", type: "comparison", title: "什么会改变选择", columns: [
    { heading: "住香港岛", items: ["先查上环轮渡余位", "仍要比较酒店到口岸道路", "保留大桥备选"] },
    { heading: "机场或大屿山一侧", items: ["大桥香港口岸可能更合适", "不要假设空侧中转", "留出入境与行李时间"] },
    { heading: "家庭或多个箱子", items: ["较少交接可能胜出", "每段核对行李规则", "通关时全组同行"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "水路或公路失败时" },
  { id: "recovery", type: "table", caption: "从当前码头重新计算", columns: ["失败", "应对"], rows: [
    ["轮渡取消", "先看运营方通知，再计算完整大桥链的时间与成本"],
    ["到了错误码头", "先查该码头实时出发，再决定是否穿越香港"],
    ["很晚才到大桥口岸", "上车前确认澳门后续交通与酒店接待"],
    ["直通车站点改变", "联系持牌运营方，不跟随非官方替代车辆"],
  ]},
  { id: "facts", type: "callout", title: "动态交通信息核验于2026年8月12日", tone: "neutral", body: "香港海事处目前列出港澳码头与跨境轮渡运营方；大桥官方指引说明口岸巴士、跨境巴士与出租车辆。船班、大桥交通、票价、码头时间、行李与入境要求都会变化，按日期核对。" },
  { id: "help", type: "callout", title: "需要比较完整跨境链？", tone: "decision", body: "提供日期、两家酒店、人数、行李和固定航班或演出。Homeground可比较交接与恢复计划，但不保证实时口岸或承运方运营。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "选择深圳到香港口岸", href: "/zh/guides/shenzhen-hong-kong-transport-route/", description: "用于不同的内地边境决策。" },
    { label: "国际航班前最后一晚", href: "/zh/guides/china-last-night-before-international-flight/", description: "不要让跨境回程没有保护。" },
    { label: "你的行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "计算通关与码头交通。" },
    { label: "外国游客如何在中国付款", href: "/zh/guides/how-to-pay-in-china-as-a-tourist/", description: "路线延伸到内地时准备付款。" },
  ]},
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
    { label: "香港跨境客运码头", url: "https://www.mardep.gov.hk/en/public-services/port-services/terminal/index.html", publisher: "香港海事处", reviewedAt: "2026-08-12" },
    { label: "跨境轮渡服务数据", url: "https://crossboundaryferryservices.mardep.gov.hk/en/", publisher: "香港海事处", reviewedAt: "2026-08-12" },
    { label: "港珠澳大桥公共交通", url: "https://www.hzmb.gov.hk/en/transport.html", publisher: "大桥香港工程管理处", reviewedAt: "2026-08-12" },
    { label: "首图：N509FZ拍摄港珠澳大桥，CC BY-SA 4.0，已裁切", url: "https://commons.wikimedia.org/wiki/File:Hong_Kong-Zhuhai-Macau_Bridge_at_Sha_Lo_Wan_(20180918131126).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "首图衍生文件许可证：CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
