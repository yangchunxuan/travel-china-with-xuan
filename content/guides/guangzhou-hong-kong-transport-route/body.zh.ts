import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "decision-lead", type: "lead", text: "广州和香港距离不远，高铁看起来像唯一答案。真正要比较的是：广州住处是否适合票面出发站，完成乘车和过关后，香港西九龙是否适合最终地址。" },
    { id: "quick-answer", type: "callout", title: "先比较，不先下结论", tone: "decision", body: "广州南与香港西九龙都顺路时，先查直达高铁；同时按出发日期查询离住处更合适的广州车站有没有直达车。只有已确认的跨境巴士上下车点能明显减少接驳时，才把公路方案放入决赛。" },
    { id: "matrix-heading", type: "heading", level: 2, text: "选择能接上两扇门的完整链路" },
    { id: "decision-matrix", type: "table", caption: "车上时间短，不代表旅行日短", columns: ["方案", "较合适的情形", "容易漏算的摩擦", "购票前核对"], rows: [
      ["广州南出发的高铁", "番禺、广州南部、接续铁路，或香港终点适合西九龙", "到大站、安检、出入境和香港最后一段", "具体车次、出发站和到达时间"],
      ["其他广州车站的直达列车", "当天确有直达车，并能省下一次跨城接驳", "班次较少或时间不合适", "票面写明该站与香港西九龙"],
      ["跨境巴士", "有日期明确、持牌且上下车点实用的服务", "道路拥堵、口岸、行李和运营商站点", "运营商、口岸、两端站点与退改规则"],
      ["先到深圳再过关", "直达票不可用，或深圳本来就是行程一站", "第二张票、换站或换口岸及更多失败点", "整条链仍优于等下一班直达"],
    ]},
    { id: "station-warning", type: "callout", title: "广州南不是“广州”的统称", tone: "warning", body: "广州有多个客运站。只写“广州”的搜索结果可能隐藏一次很长的首段接驳。先把票面完整站名与酒店位置对应，再比较车程。" },
    { id: "time-heading", type: "heading", level: 2, text: "建立一只门到门时钟" },
    { id: "time-steps", type: "list", ordered: true, items: ["酒店退房到正确车站入口或巴士站。", "站内步行、安检与运营方要求的提前量。", "列车或公路时间，不能把它当成全程。", "指定车站或口岸的出入境步骤。", "到达大厅到香港最终地址的一段交通。", "保护下一个固定预订的延误缓冲。"] },
    { id: "west-kowloon-heading", type: "heading", level: 2, text: "不同香港住处，对西九龙的评价不同" },
    { id: "west-kowloon-copy", type: "paragraph", text: "西九龙对九龙一带很实用，也能接入香港市内网络，但大型站房和后续步行并不是零。前往中环、铜锣湾、机场方向或新界，都要另算最后一段。不能把列车到达时间直接当作酒店入住时间。" },
    { id: "people-heading", type: "heading", level: 2, text: "同行人会放大每次换乘的成本" },
    { id: "people-comparison", type: "comparison", title: "何时便利比最短车程更重要", columns: [
      { heading: "独行、轻装", items: ["可比较更多车站", "地铁换乘通常可接受", "保留一班直达备选"] },
      { heading: "家庭或父母同行", items: ["优先一个明确车站和较少楼层变化", "给洗手间与重新集合留时间", "证件不要分散在不同箱包"] },
      { heading: "大件行李或固定活动", items: ["计算站内通道和过关搬运", "保护固定入住或航班", "选择容易恢复的方案"] },
    ]},
    { id: "late-heading", type: "heading", level: 2, text: "晚班车还需要一份到站后的计划" },
    { id: "late-table", type: "table", caption: "还要核对下一项服务", columns: ["风险", "先问什么", "稳妥做法"], rows: [
      ["晚到西九龙", "过关后最后一段公共交通是否仍在运行", "出发前确认合法出租车上车点和预算"],
      ["巴士延误", "预订是否保护后续服务", "不要紧接航班或不可退活动"],
      ["到了错误广州车站", "发车前是否还能官方改签", "停止继续去错站并使用官方渠道"],
      ["直达票售罄", "换广州出发站是否真能节省门到门时间", "比较稍晚直达与深圳中转的全部风险"],
    ]},
    { id: "recovery-heading", type: "heading", level: 2, text: "计划断开时怎么恢复" },
    { id: "recovery-list", type: "list", ordered: true, items: ["从订单读取完整站名或巴士站名，不凭印象。", "先保护最贵的固定项目：航班、入住截止或活动。", "只用铁路或巴士运营方官方渠道看实时余票和变更。", "若经深圳，先选定一个口岸并核对两侧再出发。", "预计晚到时尽早通知住宿方。"] },
    { id: "fact-check", type: "callout", title: "动态交通信息核验于2026年8月12日", tone: "neutral", body: "港铁高铁行程规划目前以香港西九龙为香港端点，并按日期和内地车站分别查询。直达车、票价、停站、巴士站点、口岸时间和入境要求都可能改变；本文不发布永久时刻表或固定票价。" },
    { id: "help-callout", type: "callout", title: "想让人工核对两扇门？", tone: "decision", body: "提供日期、广州与香港的准确地址、人数、行李和下一个固定预订。Homeground可比较接驳链并指出需复核的事实，但不代替实时售票或保证运营。" },
    { id: "internal-links", type: "internal-links", title: "继续解决真正需要的下一步", items: [
      { label: "第一次坐中国高铁", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "选好路线后再看票、证件、安检与乘车。" },
      { label: "选择深圳到香港的口岸", href: "/zh/guides/shenzhen-hong-kong-transport-route/", description: "只有深圳成为真实中转点时才使用。" },
      { label: "你的中国行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "把口岸和大站的真实耗时放回行程。" },
      { label: "国际航班前最后一晚", href: "/zh/guides/china-last-night-before-international-flight/", description: "避免跨境延误伤及最终离境。" },
    ]},
    { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
      { label: "高铁行程规划方法", url: "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html", publisher: "港铁公司", reviewedAt: "2026-08-12" },
      { label: "口岸名称与类型", url: "https://www.sb.gov.hk/eng/special/bound/control.html", publisher: "香港保安局", reviewedAt: "2026-08-12" },
      { label: "持牌跨境巴士查询", url: "https://www.td.gov.hk/en/transport_in_hong_kong/land_based_cross_boundary_transport/enquiries/index.html", publisher: "香港运输署", reviewedAt: "2026-08-12" },
      { label: "首图：Rc1959拍摄广州南站，CC BY-SA 4.0，已裁切", url: "https://commons.wikimedia.org/wiki/File:Guangzhou_South_railway_station_(85213).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    ]},
  ],
} as const satisfies StructuredPageBody;

export default body;
