import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "当城市能连成连续走廊、每段都有实用的站到站选择，而且最长转场不会吃掉核心体验时，中国纯铁路路线才成立。不要在检查最弱一环之前，把“不坐国内航班”当成原则。路线边缘的一段航班，可能在不把整趟旅行变成机场接力的情况下，保护中间连贯的铁路主轴。" },
  { id: "quick-choice", type: "comparison", title: "选择交通结构", columns: [
    { heading: "纯铁路", body: "适合密集走廊、车站位置实用、行李可控，以及重视连续感而非最大覆盖面的旅客。" },
    { heading: "铁路主轴加一段航班", body: "一个偏远端点制造了过长铁路日，但中间顺序仍很强时适合。" },
    { heading: "更多航班", body: "路线在相距很远的集群间跳跃，且多个铁路日反复取代核心体验时考虑。" }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "用12306测试路线，而不是证明口号" },
  { id: "official", type: "paragraph", text: "中国铁路12306是查询当前车站组合、列车和旅客规则的官方渠道。现行规程把联程车票定义为分段购买、可在同一或同城铁路客运营业站接续的多段车票；这个定义并不表示所有接续都舒适。要搜索准确日期和车站，再加入市内进站、安检、候车、换乘和抵达交通。" },
  { id: "weak-link-heading", type: "heading", level: 2, text: "先找铁路路线的最弱一环" },
  { id: "weak-link", type: "table", caption: "铁路路线由最差的一段决定，而不是平均值", columns: ["测试", "适合铁路", "警告结果"], rows: [
    ["几何形状", "城市形成持续前移的走廊", "某一站需要长距离往返或斜向跳跃"],
    ["车站位置", "酒店和下一项活动到实际车站都方便", "快车在两端都使用远郊车站"],
    ["区段负担", "完整门到门行程能自然放入转场日", "占掉稀缺观光日的大部分"],
    ["行李", "全组能安全上车、存放和搬运行李", "每次换乘都依赖扶梯、紧张时间或行李多于空手"],
    ["恢复", "有后续车次或弹性晚间", "错过一段就破坏整串固定预订"],
    ["夜间旅行", "全组能接受睡眠质量和抵达安排", "纸面省一晚酒店，实际毁掉次日"]
  ] },
  { id: "workflow-heading", type: "heading", level: 2, text: "搭建可靠的铁路主轴" },
  { id: "workflow", type: "list", ordered: true, items: [
    "先放入国际抵达和离境口岸。若开口程能消除折返，不应为了“纯铁路”承诺强行回到同一城市。",
    "按地理顺序排列候选城市，标出最长或最不直接的一段，先测试它，再优化容易的部分。",
    "在12306按计划日期搜索准确车站，记录出发、抵达，以及换乘是否涉及同城换站。",
    "把每趟列车转换成完整门到门行程：退房、市内交通、车站余量、铁路、抵达交通和入住空档。",
    "保护抵达晚间，不把不可替代的定时活动接在计划列车抵达时间后。",
    "一天乘坐多趟列车时，先使用官方当前服务显示可行的接续，再按同行者情况增加个人余量。",
    "把最弱一环与航班、以及直接删除端点比较。只有连续性仍优于完整替代方案时，才保留纯铁路。",
    "购票后保存每位旅客的准确证件信息，临近出发复核运营公告。"
  ] },
  { id: "day-night-heading", type: "heading", level: 2, text: "白天高铁还是夜车是另一个决定" },
  { id: "day-night", type: "table", caption: "不要只计算省下的一晚酒店", columns: ["方案", "可能收益", "必须测试的代价"], rows: [
    ["白天高铁", "坐席旅行更可预期，抵达后更容易辨认环境", "占用日照时间，可能多住一晚"],
    ["夜间卧铺", "在原本睡眠时段移动", "铺位类型、真实睡眠、深夜上车、清早抵达和入住前行李"],
    ["中途拆分", "把一段疲惫长途变成两段可控移动", "增加基地，且中间站应有真实体验而不只是睡一晚"]
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "规划示例：一个偏远端点" },
  { id: "example", type: "callout", tone: "neutral", title: "这是结构示例，不是时刻表", body: "假设四座城市形成清晰铁路走廊，第五座却需要长距离绕行，并沿同一路线返回。因为行程被称作“纯铁路”就保留第五站，是把标签置于旅客时间之上。比较飞入或飞出该端点，或者删除它。两种选择都能保护四城铁路主轴，同时消除最弱一环。" },
  { id: "disruption-heading", type: "heading", level: 2, text: "铁路区段出现异常时" },
  { id: "disruption", type: "list", ordered: true, items: [
    "通过12306或车站工作人员确认状态，并准备好购票使用的车票和证件。",
    "先保护下一项固定离境，不能让可选观光和最后可行接续竞争。",
    "当天仍可完成时，选择官方可用的后续方案，并通知住宿方晚到。",
    "整条链无法继续时停止连锁：保留当前房间或安排一晚住宿，再按已确认的次日服务重建。",
    "按当前12306规则办理改签和退票，不要从另一种交通合同或旧博客推断处理方式。"
  ] },
  { id: "failure-heading", type: "heading", level: 2, text: "“纯铁路”正在伤害行程的信号" },
  { id: "failure", type: "list", ordered: false, items: [
    "两天以上铁路转场各自占掉大部分可用观光日。",
    "路线为了保住同一个国际口岸，反复沿相同走廊折返。",
    "把同城换站当成同站换站。",
    "明知全组在卧铺上睡不好，计划仍必须依赖夜车。",
    "每次接续后都有固定酒店、景区或后续票，完全没有恢复余量。"
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "什么时候加入航班或删除一站" },
  { id: "switch-rule", type: "paragraph", text: "一段航班能消除地理孤立端点、重复走廊，或全组无法舒适承受的长途铁路段时，就加入它。铁路和航班都无法为某站留下足够本地时间时，直接删除该站。整条门到门链仍然一致时才保留纯铁路；不是因为火车永远更好，而是这条具体路线确实能形成主轴。" },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "每段都有准确车站名和当前12306搜索结果。",
    "同城换站和当地交通已显示在行程里。",
    "最长一段已与航班、删除该站进行比较。",
    "转场日不依赖抵达后立刻参加的不可替代项目。",
    "全组能处理行李和所选白天或夜间旅行方式。"
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "时刻和规则会变化", body: "本文不提供实时车次、运行时间、余票或保证接续。请在12306核对准确日期、车站和旅客规则，并在出发前复核公告。" },
  { id: "scope", type: "callout", tone: "neutral", title: "本文范围", body: "本文只负责是否以铁路主轴搭建城际旅行。高铁新手指南负责进站流程；夜车指南负责卧铺与白天高铁；具体路线顺序页负责点名城市组合。" },
  { id: "help-cta", type: "callout", tone: "decision", title: "需要找出最弱一环？", body: "请提供城市、日期、抵离口岸、行李和固定活动。有效审核应先测试门到门耗时最长的一段，再优化容易的部分。" },
  { id: "more-planning", type: "internal-links", title: "继续规划", items: [
    { label: "第一次乘坐中国高铁", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "路线通过铁路测试后，再使用本指南。" },
    { label: "比较夜车和白天高铁", href: "/zh/guides/china-night-train-or-daytime-high-speed-rail/", description: "有意识地保护睡眠质量或一个观光日。" },
    { label: "只在路线两端使用航班", href: "/zh/guides/china-open-jaw-flights-route-planning/", description: "开口程口岸可以在不折返的情况下保留铁路主轴。" },
    { label: "了解中国公益性慢火车", href: "/zh/guides/china-public-welfare-slow-trains/", description: "了解公益性慢火车为何仍在运行、日常乘客是谁，以及普通旅行者如何尊重地使用这项公共服务。" },
    { label: "规划山东半岛铁路弧线", href: "/zh/guides/shandong-peninsula-coastal-city-rail-arc/", description: "先想清楚青岛、烟台、威海各自增加什么，再核对准确车站；若海滨体验重复，就有依据地少去一城。" },
  ] },
  { id: "sources", type: "sources", title: "已复核的官方来源", items: [
    { label: "中国铁路旅客服务", url: "https://www.12306.cn/en/index.html", publisher: "中国铁路12306", reviewedAt: "2026-08-12" },
    { label: "2026年6月1日起施行的铁路旅客运输规程", url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/info/transportationRules.html", publisher: "中国铁路12306", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
