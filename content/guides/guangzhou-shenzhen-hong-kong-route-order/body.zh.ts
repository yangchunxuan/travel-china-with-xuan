import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "大多数第一次旅行，应根据真实国际口岸，把广州、深圳、香港排成单向路线：广州→深圳→香港，或反向。不要因为深圳位于两地之间，就自动住一晚。只有存在一个具体深圳重点，足以抵偿多一家酒店和一次受口岸影响的转场时，深圳才值得成为基地。" },
  { id: "quick-choice", type: "comparison", title: "选择路线形状", columns: [
    { heading: "三个基地", body: "每座城市至少有一个完整本地重点，且口岸两侧酒店都适合所选过境方式时使用。" },
    { heading: "广州＋香港", body: "深圳没有必须保护的核心项目时使用；可过境或集中访问，不必增加酒店。" },
    { heading: "深圳＋香港", body: "广州不是核心，而深圳重点在地理上相对集中时使用。" }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "口岸是一套流程，不是铁路图上的一条线" },
  { id: "official", type: "paragraph", text: "香港保安局列出多个陆路管制站，包括铁路和公路口岸，各自有不同交通与运营信息。港铁高速铁路提供香港西九龙跨境出行的官方规划资料。这些来源证明存在多种选择，不表示有一个对所有人最好的口岸。护照、入境资格、两侧酒店、行李和后续安排共同决定真正有用的选择；临近出行必须查询官方要求。" },
  { id: "gateway-heading", type: "heading", level: 2, text: "让真实口岸决定方向" },
  { id: "gateway", type: "table", caption: "先放入抵离，再安排城市", columns: ["口岸模式", "可能顺序", "什么问题会推翻它"], rows: [
    ["广州地区抵达，香港离境", "广州→深圳→香港", "深圳是否值得住一晚？"],
    ["香港抵达，广州地区离境", "香港→深圳→广州", "哪个口岸适合香港酒店？"],
    ["国际往返都用香港", "香港位于一端或两端，避免不必要的重复过境", "先完成内地段、最后一晚回香港是否更稳？"],
    ["国际往返都用内地口岸", "把香港作为有意识的延伸，不当成默认过境", "这本护照的入境和再次入境资格是否确认？"]
  ] },
  { id: "shenzhen-test-heading", type: "heading", level: 2, text: "深圳住宿测试" },
  { id: "shenzhen-test", type: "list", ordered: false, items: [
    "写下路线缩减时仍会保留的深圳体验。“刚好顺路”不是体验。",
    "检查这个重点是否靠近深圳酒店和下一口岸；一个离两者都远的著名区域会增加两次市内转移。",
    "确认行李寄存后，判断不换酒店的集中访问能否提供同样价值。",
    "统计退房、行李、过境和新入住；一晚住宿必须创造足够本地可用时间才能偿还这些成本。",
    "如果深圳一晚迫使第二次过境，或削弱最后国际离境，应优先删除。"
  ] },
  { id: "crossing-heading", type: "heading", level: 2, text: "从两边酒店门口选择口岸" },
  { id: "crossing", type: "table", caption: "城市顺序确定后再执行交通方式", columns: ["因素", "比较内容", "不要假设"], rows: [
    ["香港一侧", "酒店到西九龙或对应管制站", "香港所有区域距离相同"],
    ["内地一侧", "抵达点到深圳或广州酒店", "地理最近的口岸门到门最快"],
    ["证件", "当前资格、所需证件原件和票务资料", "过去入境过就等于现在符合"],
    ["行李", "楼梯、步行、安检和谁拿每件行李", "快车会消除搬运"],
    ["运营信息", "当前官方开放、列车及服务公告", "旧时间或博客截图仍有效"]
  ] },
  { id: "workflow-heading", type: "heading", level: 2, text: "用七个决定搭路线" },
  { id: "workflow", type: "list", ordered: true, items: [
    "分配住宿夜数前，先确定国际抵达与离境机场。",
    "向责任机关确认每位旅客的中国内地和香港入境要求，不用路线逻辑推断资格。",
    "分别给广州、深圳、香港一个不可替代理由，没有核心目的的城市直接删除。",
    "选择不重复同一跨境段的单向顺序。",
    "按两侧酒店、行李和当天后续安排选择口岸，而不只比较列车分钟数。",
    "过境后不立即安排不可替代定时活动，并准备晚到酒店方案。",
    "最后才通过点名官方来源查询当前票务和运营公告。"
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "规划示例：不住深圳也能访问" },
  { id: "example", type: "callout", tone: "neutral", title: "这是示例，不是规定行程", body: "旅客在广州有明确的美食和历史重点，在香港有数个完整旅行日，但深圳只有一个建筑项目。单独住深圳会增加两次入住，并让行李多经过一个阶段。若当前交通和寄存支持集中访问，保留广州与香港两个基地，可能以更少摩擦完成深圳重点。若深圳活动需要晚间，或分布在第二个区域，住宿才可能真正有价值。" },
  { id: "failure-heading", type: "heading", level: 2, text: "过境日失败与恢复" },
  { id: "failure", type: "table", caption: "优先保护后续安排", columns: ["失败", "立即处理", "结构教训"], rows: [
    ["所选口岸不适合酒店", "按当前官方交通重算，不追赶不现实路线", "订票前从两边门口判断"],
    ["列车或口岸延误", "通知酒店，放弃可选晚间项目", "过境后不放定时重点"],
    ["证件问题", "按官方边检或承运人指示处理，不自行猜测资格", "不可退订前核实每位旅客"],
    ["深圳住宿只留下几小时", "只保留最强活动，其余删除", "下一版取消深圳住宿"],
    ["香港国际离境变脆弱", "更早进入香港并保护航班", "最后跨境不要放在飞行日"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "什么时候应选更短路线" },
  { id: "switch-rule", type: "paragraph", text: "只有三座城市各有稳定目的，而且过境日可恢复时才使用三个基地。深圳主要为了凑齐城市清单时，取消住宿。广州重点相对额外内地移动太弱时，删除广州。香港只有在既不是目的地也不是口岸时才删除，不能因为地图把过境手续画得看不见就忽略它。" },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "每本护照的入境与再次入境资格已确认。",
    "方向跟随真实航班口岸，且不重复过境。",
    "深圳有足以支撑酒店的明确重点，否则不增加酒店。",
    "所选管制站适合两侧酒店和真实行李。",
    "已复核当前运营信息，过境日留有应变余量。"
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "口岸信息会变化", body: "管制站开放时间、交通、票务和入境要求会变化。临近出行查询香港与内地责任机关及具体运营方。本文不判断签证或入境资格。" },
  { id: "scope", type: "callout", tone: "neutral", title: "本文范围", body: "本文只负责三城顺序和深圳是否值得住一晚。广州—香港与深圳—香港指南分别负责准确交通方式、车站与口岸执行。" },
  { id: "help-cta", type: "callout", tone: "decision", title: "需要检查受口岸影响的路线？", body: "请提供航班口岸、护照国籍、酒店区域、行李和每城一个重点。不要发送护照号码或证件图片。" },
  { id: "more-planning", type: "internal-links", title: "继续规划", items: [
    { label: "比较广州—香港交通", href: "/zh/guides/guangzhou-hong-kong-transport-route/", description: "路线顺序确定后再选择车站和方式。" },
    { label: "选择深圳—香港口岸", href: "/zh/guides/shenzhen-hong-kong-transport-route/", description: "按两侧酒店和后续安排匹配管制站。" },
    { label: "测试开口程航班", href: "/zh/guides/china-open-jaw-flights-route-planning/", description: "查看不同抵离城市能否消除折返。" },
    { label: "比较深圳住宿区", href: "/zh/guides/shenzhen-where-to-stay-futian-luohu-nanshan/", description: "从抵达枢纽、香港过关、商务地址、景点、夜间活动和行李比较福田、罗湖与南山。" },
  ] },
  { id: "sources", type: "sources", title: "已复核的官方来源", items: [
    { label: "跨境高速铁路行程规划", url: "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html", publisher: "港铁高速铁路", reviewedAt: "2026-08-12" },
    { label: "香港陆路管制站资料", url: "https://www.sb.gov.hk/eng/special/bound/control.html", publisher: "香港特别行政区政府保安局", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
