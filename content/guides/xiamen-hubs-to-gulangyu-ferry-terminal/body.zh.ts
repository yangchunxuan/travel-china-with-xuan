import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Xiamen到Gulangyu的交接要让四个名称一致：内地抵达枢纽、票面Xiamen码头、票面岛上码头与住宿。只解决“机场到轮渡”，仍可能坐错船。" },
  { id: "answer", type: "callout", title: "先买日期明确的船票，再连接枢纽", tone: "decision", body: "通过Xiamen轮渡官方游客购票渠道选择有余位航线，并读取两端完整码头名；之后再计算Xiamen机场、Xiamen站或Xiamen北站的接驳。不要因为旧地图上某个市区码头更近就自行替换。" },
  { id: "matrix-heading", type: "heading", level: 2, text: "不同起点改变内地接驳" },
  { id: "matrix", type: "table", caption: "船票决定码头", columns: ["起点", "主要摩擦", "保护"], rows: [
    ["Xiamen机场", "航班晚点、取行李、道路和停止办理时间", "稍晚船班或Xiamen本岛住宿备选"],
    ["Xiamen站", "出口、道路上车点与市区交通", "准确码头定位和足够办理时间"],
    ["Xiamen北站", "较长市内接驳与大型铁路枢纽", "铁路晚点缓冲和已确认直接接车"],
    ["Xiamen酒店", "地图距离短也可能有道路与人流摩擦", "看票面码头，不搜“最近轮渡”"],
  ]},
  { id: "warning", type: "callout", title: "码头名称是运营事实", tone: "warning", body: "游客航线、市民航线、日间安排和临时调整不能互换。从当前订单复制Xiamen端与Gulangyu端完整中文码头名，并把两者都给司机看。" },
  { id: "chain-heading", type: "heading", level: 2, text: "把链路建立到岛上酒店" },
  { id: "chain", type: "list", ordered: true, items: ["抵达枢纽到票面码头准确入口。", "证件/船票核验与运营方要求的提前量。", "指定航班到指定岛上码头。", "码头到住宿的步行与行李。", "返程船、内地后续交通与天气恢复。"] },
  { id: "groups", type: "comparison", title: "行李会改变岛上到达", columns: [
    { heading: "一日游、轻装", items: ["可以接受更多步行", "随时留意回程余位", "携带订单名称"] },
    { heading: "住岛上酒店", items: ["询问酒店建议哪个码头", "单独确认行李协助", "不要假设有车辆接船"] },
    { heading: "家庭或大箱子", items: ["避开最紧衔接", "每位旅客保管自己的证件", "晚到可先住Xiamen本岛"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "错码头或错过船" },
  { id: "recovery", type: "table", caption: "用运营方记录，不听街边建议", columns: ["问题", "应对"], rows: [
    ["司机到了另一个码头", "完整票面码头未匹配前不要取下行李"],
    ["航班或火车晚点", "使用轮渡官方改签渠道，并保护本岛过夜"],
    ["船票与证件不符", "找官方服务人员，不买绑定他人身份的转售票"],
    ["天气中断", "看Xiamen轮渡通知，改线前先通知岛上住宿"],
  ]},
  { id: "facts", type: "callout", title: "动态交通信息核验于2026年8月12日", tone: "neutral", body: "Xiamen轮渡运营官方游客购票渠道并发布航线/码头信息，同时提醒防范非官方转售。航线、班次、码头、办理、身份规则、票价、行李与天气运营都会变化，以出发日期票面为准。" },
  { id: "help", type: "callout", title: "需要匹配枢纽和船票？", tone: "decision", body: "提供日期、航班或火车、票面两端码头、岛上酒店、人数和行李。Homeground可核对交接与恢复缓冲，船票余位仍以官方运营方为准。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "第一次坐中国高铁", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "在轮渡交接前准备铁路抵达。" },
    { label: "国际航班前最后一晚", href: "/zh/guides/china-last-night-before-international-flight/", description: "保护从岛上返回的接驳。" },
    { label: "你的行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "不要压缩铁路、道路和船班截止。" },
    { label: "外国游客如何在中国付款", href: "/zh/guides/how-to-pay-in-china-as-a-tourist/", description: "为内地交通保留付款备选。" },
  ]},
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
    { label: "官方游客购票与航线", url: "https://xmferry.com/wybm/wshlk/xchgpp/index.htm", publisher: "Xiamen轮渡有限公司", reviewedAt: "2026-08-12" },
    { label: "官方码头航线指引", url: "https://www.xmferry.com/xwzx/zxgg/25004.htm", publisher: "Xiamen轮渡有限公司", reviewedAt: "2026-08-12" },
    { label: "官方防转售提醒", url: "https://www.xmferry.com/xwzx/zxgg/22943.htm", publisher: "Xiamen轮渡有限公司", reviewedAt: "2026-08-12" },
    { label: "首图：HualinXMN拍摄邮轮中心公交区域，CC BY 4.0，已裁切", url: "https://commons.wikimedia.org/wiki/File:Cruise_Center_Bus_Station(Xiamen)._20190203.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
