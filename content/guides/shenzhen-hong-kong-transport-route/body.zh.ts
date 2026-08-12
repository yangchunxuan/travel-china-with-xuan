import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "decision-lead", type: "lead", text: "地图上最快的口岸，不一定对应最快的深港门到门行程。先看两端真实区域、口岸运行时间、过关步骤、行李和出关后的接驳，再决定走哪一处。" },
    { id: "quick-answer", type: "callout", title: "先把两扇门写清楚", tone: "decision", body: "深圳北或福田往九龙、香港市区，可先比较高铁；Luohu与港铁东铁线顺路时先看Luohu口岸；福田一带连接东铁线时先看福田口岸；南山、深圳西部或香港公路终点更合适时先看深圳湾。航班、酒店位置和出发时间都可能推翻这个初步答案。" },
    { id: "matrix-heading", type: "heading", level: 2, text: "同一对城市，对应的是几条完全不同的过关链" },
    { id: "decision-matrix", type: "table", caption: "比较完整链条，而不是只看跨境一段", columns: ["口岸或方式", "通常适合先比较的情况", "容易漏算的摩擦", "不能默认"], rows: [
      ["高铁：香港西九龙 ↔ 深圳北或福田", "定时车次合适，且九龙、香港市区、福田或深圳北与两端行程匹配", "到站、安检、过关、大站通道和固定车次", "每班车都停两座深圳车站，或车程短就等于门到门短"],
      ["Luohu ↔ Lo Wu", "深圳Luohu或香港东铁线本来就在动线上", "两套轨道网络、过关排队和提着行李走完整个口岸", "Luohu和落马洲是同一站"],
      ["福田口岸 ↔ 落马洲支线", "深圳福田地铁和香港东铁线能自然衔接", "这里不是Huanggang对应的落马洲公路管制站", "只写“福田”就能找到正确终点"],
      ["深圳湾", "南山、深圳西部或公路接驳比轨道更合理", "两侧公交或车辆接驳，以及完整边检流程", "普通出租车无需安排就能直接跨境"],
      ["Huanggang或其他公路口岸", "已确认某条跨境巴士、车辆路线或深夜方案", "中英文近似地名和会变化的公共交通", "旧攻略写的通宵或节假日延时永久有效"],
    ]},
    { id: "names-warning", type: "callout", title: "“落马洲”可能指两处不同终点", tone: "warning", body: "落马洲支线口岸是连接福田口岸的轨道口岸；落马洲公路管制站连接Huanggang口岸。保存完整中英文名称，不能只写“落马洲”或“福田”。" },
    { id: "door-heading", type: "heading", level: 2, text: "从一扇真实门算到另一扇真实门" },
    { id: "door-steps", type: "list", ordered: true, items: ["标出深圳侧准确的酒店入口、机场航站楼或铁路站。", "标出香港侧准确终点和真正有用的港铁站或公路落客点。", "把口岸前接驳、口岸名称、边检海关和口岸后接驳分开记录。", "核对口岸运行窗口，以及两侧最后一班可用接驳。", "加入站内步行、排队、洗手间、取票和恢复余量。"] },
    { id: "rail-heading", type: "heading", level: 2, text: "只有站点组合合适，高铁才真正占优" },
    { id: "rail-copy", type: "paragraph", text: "西九龙高铁把铁路与过关集中在一座枢纽里，但仍然是选定车次的城际旅程，不是随到随走的地铁。应按日期分别查询福田和深圳北。福田可能更适合深圳中心区，深圳北则可能有不同车次和换乘网络。比较酒店到站台、抵达大厅到酒店两段，不能只看列车运行时间。" },
    { id: "people-heading", type: "heading", level: 2, text: "行李和同行人群会改变最佳口岸" },
    { id: "people-comparison", type: "comparison", title: "常见条件如何改变答案", columns: [
      { heading: "轻装、时间灵活", items: ["可以优先比较轨道口岸", "一次地铁换乘通常可接受", "保留另一个开放口岸作为恢复方案"] },
      { heading: "家庭或父母同行", items: ["减少电梯、排队和换乘次数", "边检时不要让队伍分散", "证件跟随需要协助的旅客"] },
      { heading: "多个大箱子", items: ["计算每条通道与检查环节", "直达跨境巴士可能优于多次轨道换乘", "确认车辆真的服务准确终点"] },
    ]},
    { id: "late-heading", type: "heading", level: 2, text: "深夜出行先判断口岸时间，再判断路线" },
    { id: "late-table", type: "table", caption: "清晨、深夜或中断时核对什么", columns: ["情况", "先核对", "恢复办法"], rows: [
      ["航班深夜抵达深圳", "真实出机场时间、口岸开放时间和香港侧末班接驳", "住机场附近或使用已确认的公路口岸，不要赶往已关闭轨道口岸"],
      ["可能赶不上香港末班车", "口岸和本地接驳是否都仍运行", "若口岸后链条已失效，先不要过关"],
      ["节假日或大型活动", "官方临时开放时间和交通通告", "只有两侧接驳都成立，才换到较远口岸"],
      ["轨道中断", "港铁、高铁和口岸官方通知", "从当前位置重算；换口岸可能比等待更慢"],
    ]},
    { id: "recovery-heading", type: "heading", level: 2, text: "走到错误口岸后的处理顺序" },
    { id: "recovery-list", type: "list", ordered: true, items: ["进入限制区域或边检队列前停下，确认口岸全名。", "核对当前旅客、证件和行李是否能从这里通行。", "比较继续过关与返回最近换乘点，不要只因名称相似就换口岸。", "重新核对出关后的香港或深圳接驳。", "若剩余链条已经不安全，先处理酒店、航班或车票，再尝试其他口岸。"] },
    { id: "fact-check", type: "callout", title: "动态交通信息核验于2026年8月12日", tone: "neutral", body: "香港官方目前把西九龙高铁、Luohu和落马洲支线列为铁路客运口岸，并另列深圳湾、落马洲／Huanggang等公路口岸。车次、票价、口岸开放时间、节假日延时、巴士站点和入境要求均按日期变化，出发前须向对应运营方复核。" },
    { id: "help-callout", type: "callout", title: "需要人工检查整条过关链？", tone: "decision", body: "提交日期、深圳和香港两端准确地点、人数、行李和固定航班或车次。Homeground可以指出哪一段换乘或口岸假设需要核查；实时服务和入境许可仍须按日期确认。" },
    { id: "internal-links", type: "internal-links", title: "继续处理本页之外的问题", items: [
      { label: "第一次乘坐中国高铁", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "确定高铁后，再处理购票、证件、安检、席别与乘车。" },
      { label: "检查行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "把口岸排队和车站交接算进真实行程。" },
      { label: "保护国际航班前最后一晚", href: "/zh/guides/china-last-night-before-international-flight/", description: "离境前不要依赖没有保护的跨境链。" },
      { label: "准备中国境内支付恢复方案", href: "/zh/guides/how-to-pay-in-china-as-a-tourist/", description: "为内地交通准备不止一种支付方式。" },
    ]},
    { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
      { label: "口岸系统与名称", url: "https://www.sb.gov.hk/eng/special/bound/control.html", publisher: "香港保安局", reviewedAt: "2026-08-12" },
      { label: "陆路跨境交通", url: "https://www.td.gov.hk/en/transport_in_hong_kong/land_based_cross_boundary_transport/index_t.html", publisher: "香港运输署", reviewedAt: "2026-08-12" },
      { label: "高铁行程查询方法", url: "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html", publisher: "香港铁路有限公司", reviewedAt: "2026-08-12" },
      { label: "Hero：Baycrest拍摄的落马洲支线，CC BY-SA 2.5，已裁切", url: "https://commons.wikimedia.org/wiki/File:Lok_Ma_Chau_Spur_Line_02.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    ]},
  ],
} as const satisfies StructuredPageBody;

export default body;
