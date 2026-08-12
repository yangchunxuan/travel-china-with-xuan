import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "桂林与阳朔不是两个单一定位。桂林有机场和多个火车站；阳朔站是交通枢纽，不能代替阳朔酒店。水路又有自己的码头和行李链。" },
  { id: "answer", type: "callout", title: "按两端地址与当天任务选择", tone: "decision", body: "机场或酒店门口与行李最重要时比较公路接驳；准确车站与后续车辆能组成清楚链路时比较火车；漓江游船应当作改变交通安排的观光日，而不是普通快速接驳。" },
  { id: "matrix-heading", type: "heading", level: 2, text: "三种产品不能只按一个时长排名" },
  { id: "matrix", type: "table", caption: "每个方案从不同地点开始和结束", columns: ["方案", "适合", "缺少的一段", "核对"], rows: [
    ["阳朔站火车", "直通列车或合适桂林车站能衔接", "阳朔一侧的车站到酒店公路接驳", "准确站名、当天列车与确认接车"],
    ["预订车辆或当天可核实的班线", "机场/酒店两端、家庭或多个行李箱", "道路、准确上车点与多个可能下车点", "当前运营方、两端定位、行李与最晚入住"],
    ["漓江观光游船", "希望把漓江本身作为当天体验", "桂林侧码头交通、单程游船不提供行李寄存，以及下船后的酒店接驳", "磨盘山或竹江出发、龙头山到达、日期与运营通知"],
  ]},
  { id: "warning", type: "callout", title: "阳朔站位于兴坪，不在你的酒店门口", tone: "warning", body: "购票前分别定位火车站与住宿。若桂林出发站或阳朔公路接驳选错，一段很短的火车也可能失去优势。" },
  { id: "direction-heading", type: "heading", level: 2, text: "水路观光日要考虑方向" },
  { id: "direction", type: "paragraph", text: "漓江景区官方把精华游写为约60公里、约4小时的单程行程：三星船从磨盘山客运港出发，四星船从竹江客运港出发，均在阳朔龙头山码头下船。两座桂林出发港并非同一地点，这也不是可以原路复制的往返交通。" },
  { id: "groups", type: "comparison", title: "让链路符合旅客", columns: [
    { heading: "机场抵达", items: ["保护航班晚点缓冲", "公路可能减少两次交接", "晚到时通知酒店"] },
    { heading: "铁路通行", items: ["搜索准确阳朔站停靠", "确认车站接车", "没有理由就不绕桂林市区"] },
    { heading: "重视风景、时间宽松", items: ["把水路当成当天目的", "不要默认码头可以寄存行李", "保留天气与水位变化的备选"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "两端不匹配时" },
  { id: "recovery", type: "list", ordered: true, items: ["读取预订中的完整车站、码头或站点。", "把酒店准确定位发给授权运营方。", "换方式前先保护入住与下一班固定列车。", "实时变化只看铁路与当地交通官方通知。", "不要因为路边车辆写着阳朔就乘坐不明车。"] },
  { id: "facts", type: "callout", title: "动态交通信息核验于2026年8月12日", tone: "neutral", body: "漓江景区官方资料把精华游写为约60公里、约4小时的单程行程，三星船与四星船使用不同出发港，均到阳朔龙头山码头。官网采用预售，仅保留少量当日票，并持续发布因水位封航与复航的通知；列车须按日期查12306。未找到可验证的阳朔站至县城当前官方旅客班线时刻，因此这一段必须另行确认，不能引用旧票价或旧时刻。" },
  { id: "help", type: "callout", title: "需要比较两端？", tone: "decision", body: "提供日期、桂林抵达点、阳朔酒店、人数、行李，以及水路是交通还是体验。Homeground可标出交接与需重查的事实。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "第一次坐中国高铁", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "选定车站后再准备乘车。" },
    { label: "你的行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "给水路或公路日足够空间。" },
    { label: "外国游客如何在中国付款", href: "/zh/guides/how-to-pay-in-china-as-a-tourist/", description: "为最后一段保留付款备选。" },
    { label: "中国酒店靠近地铁是否重要", href: "/zh/guides/china-hotel-near-metro/", description: "理解车站标签何时真正帮助住宿。" },
  ]},
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
    { label: "漓江游船官方端点与交通指引", url: "https://en.liriver.com.cn/page/article/lyfw.jtcx", publisher: "桂林漓江风景名胜区", reviewedAt: "2026-08-12" },
    { label: "游船官方运营通知", url: "https://www.liriver.com.cn/mobile/article/zxlj.tzgg", publisher: "桂林漓江风景名胜区", reviewedAt: "2026-08-12" },
    { label: "官方提示：实名、单程及无行李寄存", url: "https://www.liriver.com.cn/page/article/zxlj.jqdt/126", publisher: "桂林漓江风景名胜区", reviewedAt: "2026-08-12" },
    { label: "广西当前铁路运输信息", url: "https://jtt.gxzf.gov.cn/xwdt/zwxmtxx/t27417062.shtml", publisher: "广西交通运输厅", reviewedAt: "2026-08-12" },
    { label: "阳朔站位于兴坪镇", url: "https://m.qlgl.gov.cn/article-3-43849-1.html", publisher: "桂林市纪委监委", reviewedAt: "2026-08-12" },
    { label: "铁路官方售票渠道", url: "https://www.12306.cn/en/index.html", publisher: "中国铁路12306", reviewedAt: "2026-08-12" },
    { label: "首图：Rat2拍摄阳朔站，CC BY-SA 4.0，已裁切并转为WebP", url: "https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "首图衍生文件许可证：CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
