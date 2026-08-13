import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "只有当往返支线真正做到门到门耗时短，而且固定酒店省下的精力大于重复折返时，才适合单一基地。路线持续向前、每次换酒店都能解锁多个核心项目时，适合多基地。很多中国路线的最佳答案其实是混合结构：先用一个稳定的区域基地，再有意识地移动一次进入下一个集群。" },
  { id: "quick-choice", type: "comparison", title: "快速判断", columns: [
    { heading: "单一基地", body: "周边目的地紧凑、进站方便、行李重，或同行者需要熟悉房间时选择。" },
    { heading: "多基地", body: "路线呈线性，每次前移都减少一次折返并服务不止一个重要项目时选择。" },
    { heading: "混合结构", body: "一个集群适合当天往返，但下一个集群远到不适合反复通勤时选择。" }
  ] },
  { id: "boundary-heading", type: "heading", level: 2, text: "列车运行时间不等于一日游耗时" },
  { id: "boundary", type: "paragraph", text: "日期确定后，应在中国铁路12306核对实际车站组合和当日服务。但时刻表本身不能决定路线结构。还要加入酒店退房、前往正确车站、安检与候车余量、列车、抵达后的市内交通、行李处理，以及支线行程中不可避免的返程。一段很短的铁路也可能占掉一天的两端。" },
  { id: "ledger-heading", type: "heading", level: 2, text: "比较完整的门到门时间" },
  { id: "ledger", type: "table", caption: "每一条支线和每一次换酒店都要计算", columns: ["环节", "单基地往返", "多基地前移"], rows: [
    ["早晨进站", "酒店到车站及候车余量，每次出游都重复", "退房、进站并全程携带行李"],
    ["铁路或公路", "去程和返程都占固定时间", "通常只有一段向前移动"],
    ["抵达端", "车站到景点，结束后又要返回车站", "车站到新酒店，后续从本地出发"],
    ["酒店摩擦", "较低，房间和已拆行李保持不变", "退房空档、寄存、入住和重新打包"],
    ["异常风险", "错过返程可能导致深夜抵达，但房间还在", "延误可能连锁影响酒店、接驳和后续预订"],
    ["体力成本", "反复早起和通勤", "更多搬运行李与适应新房间"]
  ] },
  { id: "variables-heading", type: "heading", level: 2, text: "比公里数更重要的五个变量" },
  { id: "variables", type: "list", ordered: false, items: [
    "车站位置：写下准确车站，而不只是城市。服务若使用远郊车站，答案可能完全反转。",
    "活动位置：景点分散在整个区域，并不表示某一个城市天然适合作基地。",
    "行李与可用双手：计算谁负责每件行李，同时还要处理护照、儿童或行动需求。",
    "入住空档：转场日可能在退房后、入住前留下数小时，要先决定行李和疲劳旅客在哪里。",
    "恢复能力：生病、坏天气或行程异常时，固定房间更容易恢复；而前移路线可能减少每天通勤。"
  ] },
  { id: "workflow-heading", type: "heading", level: 2, text: "先搭路线结构，再分配住宿夜数" },
  { id: "workflow", type: "list", ordered: true, items: [
    "把所有核心项目放在地图上，按真正共用的车站或当地交通网络分组。",
    "为每条候选支线写下保守的门到门去程总时长和最晚固定返程，不要只用宣传中的最快列车。",
    "列出每个候选基地能让哪两个以上重要项目更容易。只服务一个弱项目的基地，还不值得一次退房。",
    "分别统计单基地方案的重复进站，以及多基地方案的打包、寄存和入住空档。",
    "测试混合方案：保留最强基地，只做一次能消除最大折返的移动。",
    "购票前用12306核对当前车站组合，并确认酒店寄存政策。若实时交通推翻原结构，应改结构，而不是硬改计算。"
  ] },
  { id: "examples-heading", type: "heading", level: 2, text: "三个规划示例" },
  { id: "examples", type: "table", caption: "示例只解释方法，不是规定行程", columns: ["情况", "可能结构", "理由"], rows: [
    ["两位成人、轻装、住在车站附近，安排三个紧凑周边项目", "单一基地", "同一房间能减少摩擦，往返不会吞掉整天"],
    ["路线呈走廊状，每个城市都有多个重点，离境口岸位于另一端", "多基地", "持续前移减少折返，并换来真正的本地时间"],
    ["家庭携带行李，先有两个近距离周边项目，再前往较远集群", "混合结构", "需要稳定时保持稳定，再用一次移动避免长期通勤"]
  ] },
  { id: "failure-heading", type: "heading", level: 2, text: "失败信号与修复" },
  { id: "failure", type: "table", caption: "继续订酒店前先修路线结构", columns: ["信号", "出了什么问题", "如何修复"], rows: [
    ["每次一日游都天不亮出发、深夜返回", "基地只在铁路图上方便", "增加第二基地或删除最弱支线"],
    ["每个景点之间都出现一晚酒店", "酒店被当成路线标点", "把相邻重点合并到更少的基地"],
    ["一个基地只服务一个可选景点", "退房成本大于收益", "改成集中访问或删除"],
    ["转场日还安排不可替代的定时项目", "延误和行李没有应变余量", "把核心项目放在不转场的完整游览日"],
    ["一路向前后又折返同一国际口岸", "航班结构重新引入折返", "酒店最终确定前比较开口程"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "什么时候应该改选另一种结构" },
  { id: "switch-rule", type: "paragraph", text: "若两条以上支线各自占用大量门到门时间，或下一国际口岸自然位于前方，应放弃单一基地。若多次转场各自只解锁一个小项目、行李是真实障碍，或入住空档吃掉所谓节省，应减少基地。两个极端都不好时，保留一个基地，加一次战略移动。" },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "每段铁路旁都写有准确出发站和到达站。",
    "每条支线都包括当地交通和返程，而不只是列车分钟数。",
    "每个基地至少解锁两个重点，或消除一次重大折返。",
    "转场日有行李、入住空档方案，且抵达后没有不可替代项目。",
    "已重新核对12306当前服务和每家酒店的行李政策。"
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "结构通过后再核对实时交通", body: "列车班次、车站、票务和当地接驳都会变化。按出行日期使用12306和具体运营方资料。本文不承诺统一的一日游半径或某个固定接驳。" },
  { id: "scope", type: "callout", tone: "neutral", title: "本文范围", body: "本文只负责单基地往返、多基地前移与混合结构的选择。整体是否过度拥挤由紧凑度指南负责；准确车站与交通方式由城市交通指南负责；住宿区域由住宿指南负责。" },
  { id: "help-cta", type: "callout", tone: "decision", title: "需要计算折返吗？", body: "请提供候选基地、酒店区域、核心活动、行李，以及抵达与离境口岸。有效审核应在分配夜数前算清每次门到门移动的总时间。" },
  { id: "more-planning", type: "internal-links", title: "继续规划", items: [
    { label: "检查路线是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "用可用旅行日测试最终结构。" },
    { label: "选择真正有用的交通型酒店", href: "/zh/guides/china-hotel-near-metro/", description: "只有每天容易出发，基地才有价值。" },
    { label: "测试不同入境和离境城市", href: "/zh/guides/china-open-jaw-flights-route-planning/", description: "开口程可能把折返支线变成前移路线。" },
    { label: "选择正确的大理古城下车点", href: "/zh/guides/dali-station-to-old-town/", description: "按住宿位置选择南门、洱海门、苍山门或北门下车点，保存中文目的地卡，避免下错地点后拖着行李横穿古城。" },
    { label: "从白天走到夜晚游南明", href: "/zh/guides/guiyang-nanming-old-city-day-to-night-walk/", description: "按日光、夜景与用餐节奏，从老城街巷走到甲秀楼、南明河和青云市集，并准备下雨与疲劳分支。" },
    { label: "按景点顺序安排每一晚", href: "/zh/guides/zhangjiajie-city-or-wulingyuan-hotel-base/", description: "把每一晚放到下一项已确定的景点、抵达或离开节点附近，再判断一次换酒店是否真正减少折返。" },
  ] },
  { id: "sources", type: "sources", title: "已复核的官方来源", items: [
    { label: "中国铁路旅客服务与实时行程查询", url: "https://www.12306.cn/en/index.html", publisher: "中国铁路12306", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
