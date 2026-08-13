import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "桂林和阳朔各有多个可能的出发点与到达点。桂林有机场和多个火车站；阳朔站位于兴坪，并不在多数阳朔酒店旁边。选择漓江游船时，还要单独安排出发码头和行李。" },
  { id: "answer", type: "callout", title: "按两端地址与当天目的选择", tone: "decision", body: "最重视门到门和行李时比较公路接驳；只有匹配准确车站并安排好阳朔最后一段车辆后再比较火车；想把漓江本身作为当天体验时选择游船，而不是把它当作地图上的快速接驳。" },
  { id: "matrix-heading", type: "heading", level: 2, text: "三种产品不能只按一个时长排名" },
  { id: "matrix", type: "table", caption: "每个方案从不同地点开始和结束", columns: ["方案", "适合", "缺少的一段", "核对"], rows: [
    ["阳朔站火车", "直通列车或合适桂林车站能衔接", "阳朔一侧的车站到酒店公路接驳", "准确站名、当天列车与确认接车"],
    ["预订车辆或当天可核实的班线", "机场/酒店两端、家庭或多个行李箱", "道路、准确上车点与多个可能下车点", "当前运营方、两端定位、行李与最晚入住"],
    ["漓江观光游船", "希望把漓江本身作为当天体验", "桂林侧码头交通、单程游船不提供行李寄存，以及下船后的酒店接驳", "磨盘山或竹江出发、龙头山到达、日期与运营通知"],
  ]},
  { id: "warning", type: "callout", title: "阳朔站不在大多数阳朔酒店旁边", tone: "warning", body: "购票前分别定位火车站与住宿。若桂林出发站或阳朔最后一段公路接驳选错，一段很短的火车也可能失去优势。" },
  { id: "direction-heading", type: "heading", level: 2, text: "水路观光日要考虑方向" },
  { id: "direction", type: "paragraph", text: "漓江景区官方把精华游写为约60公里、约4小时的单程行程：三星船从磨盘山客运港出发，四星船从竹江客运港出发，均在阳朔龙头山码头下船。两座桂林出发港并非同一地点，这也不是可以原路复制的往返交通。" },
  { id: "groups", type: "comparison", title: "让路线符合旅客", columns: [
    { heading: "机场抵达", items: ["保护航班晚点缓冲", "公路可能减少两次交接", "晚到时通知酒店"] },
    { heading: "铁路通行", items: ["搜索准确阳朔站停靠", "确认车站接车", "没有理由就不绕桂林市区"] },
    { heading: "重视风景、时间宽松", items: ["把水路当成当天目的", "不要默认码头可以寄存行李", "保留天气与水位变化的备选"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "两端不匹配时" },
  { id: "recovery", type: "list", ordered: true, items: ["读取预订中的完整车站、码头或站点。", "把酒店准确定位发给授权运营方。", "换方式前先确认酒店接待时间与下一班固定列车。", "实时变化只看铁路与当地交通官方通知。", "不要因为路边车辆写着阳朔就乘坐不明车。"] },
  { id: "facts", type: "callout", title: "动态交通信息核验于2026年8月13日", tone: "neutral", body: "漓江景区官方资料把精华游写为约60公里、约4小时的单程行程，三星船与四星船使用不同出发港，均到阳朔龙头山码头。官方提示建议旺季至少提前一天购票，并明确前往码头和从阳朔返回的交通费不包含在船票中，单程游船也不提供行李寄存。列车须按日期查12306。未找到可验证的阳朔站到住宿的当前官方固定班线时刻或票价，因此这一段必须另行确认，不能引用旧价格或旧时刻。" },
  { id: "help", type: "callout", title: "需要比较两端？", tone: "decision", body: "提供日期、桂林抵达点、阳朔酒店、人数、行李，以及水路是交通还是体验。Homeground可比较各段接驳，并列出出发前需要再次确认的信息。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "第一次坐中国高铁", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "选定车站后再准备乘车。" },
    { label: "你的行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "给水路或公路日足够空间。" },
    { label: "外国游客如何在中国付款", href: "/zh/guides/how-to-pay-in-china-as-a-tourist/", description: "为最后一段保留付款备选。" },
    { label: "中国酒店靠近地铁是否重要", href: "/zh/guides/china-hotel-near-metro/", description: "理解车站标签何时真正帮助住宿。" },
  ]},
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
    { label: "漓江官方交通与码头指引", url: "https://en.liriver.com.cn/page/article/lyfw.jtcx", publisher: "桂林漓江风景名胜区", reviewedAt: "2026-08-13" },
    { label: "漓江官方购票渠道", url: "https://en.liriver.com.cn/page/article/lyfw.pwxx", publisher: "桂林漓江风景名胜区", reviewedAt: "2026-08-13" },
    { label: "官方提示：单程、后续交通及无行李寄存", url: "https://www.liriver.com.cn/page/article/zxlj.jqdt/126", publisher: "桂林漓江风景名胜区", reviewedAt: "2026-08-13" },
    { label: "铁路官方售票渠道", url: "https://www.12306.cn/en/index.html", publisher: "中国铁路12306", reviewedAt: "2026-08-13" },
    { label: "阳朔站连接线涉及兴坪镇的官方用地公告", url: "https://dnr.gxzf.gov.cn/villageNews/show/450321?id=1240", publisher: "广西壮族自治区自然资源厅", reviewedAt: "2026-08-13" },
    { label: "首图：Rat2拍摄阳朔站，CC BY-SA 4.0，已裁切并转为WebP", url: "https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "首图衍生文件许可证：CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
