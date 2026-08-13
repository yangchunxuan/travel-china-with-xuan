import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "上海到杭州的列车可以很多、很快，但错误车站组合仍会让全程很慢。票面要同时适合上海机场或酒店、正确上海车站、正确杭州车站与最终酒店。" },
  { id: "answer", type: "callout", title: "搜索多个车站组合，再比较两端地址", tone: "decision", body: "从虹桥机场或上海西侧出发，通常先查上海虹桥；其他市区地址若有合适直达车，上海站或上海南站可能更好。杭州端应按准确日期分别查询杭州东、杭州站、杭州南和杭州西，再只比较12306当天实际提供的站点组合。" },
  { id: "matrix-heading", type: "heading", level: 2, text: "路线是一对车站，不是两个城市名" },
  { id: "matrix", type: "table", caption: "最短列车可能带来最长首尾接驳", columns: ["车站选择", "合适", "实际不便", "核对"], rows: [
    ["上海虹桥", "虹桥机场、上海西侧或较多高铁余票", "大型空铁枢纽，以及从部分区域前往较远", "票面写上海虹桥且入口正确"],
    ["上海站", "市中心/北部区域且当天有直达车", "余票模式不同，并容易把城市名当车站名", "完整站名、发车与地铁运营时段"],
    ["上海南站", "上海西南部且有匹配车次", "不能与虹桥或上海站混淆", "准确日期车次与变化后的设施"],
    ["杭州东、杭州站、杭州南或杭州西", "其中一站到酒店/景点最后一段更好且当天有合适车次", "大站出口、不同市内位置与按日期变化的余票", "完整到达站、出口、当前市内接驳与酒店路线"],
  ]},
  { id: "warning", type: "callout", title: "搜索结果里的“上海”不等于核对车站", tone: "warning", body: "上海官方指引列出分布在全市的多个主要与小型客站，并明确提醒确认站名。叫车前从车票读取完整中英文车站名。" },
  { id: "clock-heading", type: "heading", level: 2, text: "计算完整行程时间" },
  { id: "clock", type: "list", ordered: true, items: ["上海酒店或机场到正确车站入口。", "安检、步行与乘车提前量。", "已购列车，不是搜索摘要。", "杭州到达大厅到正确出口。", "地铁/出租到准确酒店，以及晚班备选。"] },
  { id: "groups", type: "comparison", title: "什么会改变胜出的组合", columns: [
    { heading: "衔接虹桥航班", items: ["虹桥火车站可减少首段", "仍保护行李与航站楼变化", "不安排很紧的空铁票"] },
    { heading: "住上海市中心", items: ["比较上海站余票", "稍长车程可能节省市内交通", "看完整站名"] },
    { heading: "很晚到杭州", items: ["按酒店最后一段选择", "单独核对末班地铁", "保留合法出租与酒店接待备选"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "到了错误车站" },
  { id: "recovery", type: "table", caption: "不要立刻穿城赶站", columns: ["问题", "应对"], rows: [
    ["错上海车站", "先用官方渠道查退改/余票，再与穿城时间比较"],
    ["搜索不到原车次", "按日期和车站组合查12306；运行图会调整"],
    ["到了意外杭州车站", "离站前读取出口图并重算酒店路线"],
    ["错过末班地铁", "使用官方出租车队列并通知酒店，不跟随大厅人员"],
  ]},
  { id: "facts", type: "callout", title: "动态交通信息核验于2026年8月13日", tone: "neutral", body: "上海官方指引区分上海站、上海南、上海虹桥及其他车站，各自地铁接入不同。杭州当前铁路信息把杭州站、杭州东、杭州南和杭州西列为不同客站，并提醒在12306确认票面车站与车次。余票、票价与市内末班均按日期变化。" },
  { id: "help", type: "callout", title: "需要按两家酒店核对车站组合？", tone: "decision", body: "提供日期、上海起点、杭州地址、人数、行李和固定航班或活动。Homeground可比较完整行程与备选方案，实时铁路余票仍以12306为准。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "上海浦东还是虹桥机场", href: "/zh/guides/shanghai-pudong-or-hongqiao-airport/", description: "依赖空铁衔接前先选机场。" },
    { label: "第一次坐中国高铁", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "选好车站组合后准备票与乘车。" },
    { label: "夜车还是白天高铁", href: "/zh/guides/china-night-train-or-daytime-high-speed-rail/", description: "为更远后续交通比较时间表形状。" },
    { label: "你的行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "计算大城市首尾接驳。" },
    { label: "按证据读杭州与镇江的《白蛇传》地点", href: "/zh/guides/white-snake-legend-hangzhou-zhenjiang/", description: "解决车站组合后，再判断这则传说是否值得增加一个文化停留城市。" },
  ]},
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
    { label: "上海火车站指引", url: "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html", publisher: "上海市政府", reviewedAt: "2026-08-12" },
    { label: "2026年1月长三角运行图调整", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260120/4fefd5c7bcfd4ec0a45f6c882cfbbd9e.html", publisher: "上海市政府", reviewedAt: "2026-08-12" },
    { label: "杭州当前客站与接驳信息", url: "https://hznews.hangzhou.com.cn/chengshi/content/2026-04/29/content_9214782.htm", publisher: "杭州网／铁路杭州站信息", reviewedAt: "2026-08-12" },
    { label: "铁路官方售票渠道", url: "https://www.12306.cn/en/index.html", publisher: "中国铁路12306", reviewedAt: "2026-08-12" },
    { label: "首图：Staeiou拍摄杭州东站，CC BY-SA 4.0，已裁切并转为WebP", url: "https://commons.wikimedia.org/wiki/File:Hangzhou_East_railway_station_interior.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "首图衍生文件许可证：CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
