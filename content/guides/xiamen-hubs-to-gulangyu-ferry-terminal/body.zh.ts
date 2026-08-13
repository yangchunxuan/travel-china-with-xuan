import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "厦门到鼓浪屿的交接要让四个名称一致：内地抵达枢纽、票面厦门码头、票面岛上码头与住宿。只解决“机场到轮渡”，仍可能坐错船。" },
  { id: "answer", type: "callout", title: "先买日期明确的船票，再连接枢纽", tone: "decision", body: "先使用厦门轮渡当前指引的官方渠道：FAQ目前引导游客通过微信公众号 `xmferry` 或支付宝生活号“屿见厦门轮渡”购票。选到有余位的航线并读取两端完整码头名后，再计算厦门机场、厦门站或厦门北站的接驳。不要因为旧地图上某个市区码头更近就自行替换。" },
  { id: "matrix-heading", type: "heading", level: 2, text: "不同起点改变内地接驳" },
  { id: "matrix", type: "table", caption: "船票决定码头", columns: ["起点", "主要风险", "需要预留"], rows: [
    ["厦门机场", "航班晚点、取行李、道路和停止办理时间", "稍晚船班或厦门本岛住宿备选"],
    ["厦门站", "出口、道路上车点与市区交通", "准确码头定位和足够办理时间"],
    ["厦门北站", "较长市内接驳与大型铁路枢纽", "铁路晚点缓冲和已确认直接接车"],
    ["厦门酒店", "地图距离短也可能遇到绕行与拥挤", "看票面码头，不搜“最近轮渡”"],
  ]},
  { id: "warning", type: "callout", title: "码头名称是运营事实", tone: "warning", body: "游客航线、市民航线、日间安排和临时调整不能互换。从当前订单复制厦门端与鼓浪屿端完整中文码头名，并把两者都给司机看。" },
  { id: "chain-heading", type: "heading", level: 2, text: "把整段路线安排到岛上酒店" },
  { id: "chain", type: "list", ordered: true, items: ["抵达枢纽到订单所列码头的准确入口。", "证件或登船凭证核验，以及停止检票前的充足时间。", "指定船班到指定岛上码头。", "码头到住宿的实际步行与行李安排。", "返程资格、内地后续交通与天气备选。"] },
  { id: "groups", type: "comparison", title: "行李会改变岛上到达", columns: [
    { heading: "一日游、轻装", items: ["可以接受更多步行", "随时留意回程余位", "携带订单名称"] },
    { heading: "住岛上酒店", items: ["询问酒店建议哪个码头", "单独确认行李协助", "不要假设有车辆接船"] },
    { heading: "家庭或大箱子", items: ["避开最紧衔接", "每位旅客保管自己的证件", "晚到可先住厦门本岛"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "错码头或错过船" },
  { id: "recovery", type: "table", caption: "用运营方记录，不听街边建议", columns: ["问题", "应对"], rows: [
    ["司机到了另一个码头", "完整票面码头未匹配前不要取下行李"],
    ["航班或火车晚点", "使用轮渡官方改签渠道，并保护本岛过夜"],
    ["船票与证件不符", "找官方服务人员，不买绑定他人身份的转售票"],
    ["天气中断", "看厦门轮渡通知，改线前先通知岛上住宿"],
  ]},
  { id: "facts", type: "callout", title: "动态交通信息核验于2026年8月13日", tone: "neutral", body: "当前FAQ引导线上购票者使用官方微信或支付宝渠道；外国游客可用已实名认证的支付宝账号录入护照信息，部分证件仍需人工核验。预售期为15天（含乘船当日），每天9:00开放第15日船票。开航前20分钟开始检票、前10分钟停止检票。去程票通常包含20天内一次符合当期游客航线规则的免费返程，但不等于预订了固定返程船班或永久固定码头。官网同页仍有较旧说法，因此付款前应再次核对当前渠道与航线。" },
  { id: "help", type: "callout", title: "需要匹配枢纽和船票？", tone: "decision", body: "提供日期、航班或火车、票面两端码头、岛上酒店、人数和行李。Homeground可核对交接与时间缓冲，船票余位仍以官方运营方为准。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "第一次坐中国高铁", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "在轮渡交接前准备铁路抵达。" },
    { label: "国际航班前最后一晚", href: "/zh/guides/china-last-night-before-international-flight/", description: "保护从岛上返回的接驳。" },
    { label: "你的行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "不要压缩铁路、道路和船班截止。" },
    { label: "外国游客如何在中国付款", href: "/zh/guides/how-to-pay-in-china-as-a-tourist/", description: "为内地交通保留付款备选。" },
  ]},
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
    { label: "官方网络购票FAQ：当前渠道、护照与返程有效期", url: "https://xmferry.com/wybm/wshlk/wlgpp/index.htm", publisher: "厦门轮渡有限公司", reviewedAt: "2026-08-13" },
    { label: "2026年官方通知：预售期调整为15天", url: "https://www.xmferry.com/xwzx/zxgg/32338.htm", publisher: "厦门轮渡有限公司", reviewedAt: "2026-08-13" },
    { label: "官方检票与返程FAQ", url: "https://xmferry.com/wybm/wshlk/chch/index.htm", publisher: "厦门轮渡有限公司", reviewedAt: "2026-08-13" },
    { label: "首图：HualinXMN拍摄邮轮中心公交区域，CC BY 4.0，已裁切并转为WebP", url: "https://commons.wikimedia.org/wiki/File:Cruise_Center_Bus_Station(Xiamen)._20190203.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "首图衍生文件许可证：CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
