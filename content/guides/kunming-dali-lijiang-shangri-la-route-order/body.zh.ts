import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "云南路线最清楚的默认形状，是昆明→大理→丽江→香格里拉的单向走廊；航班与同行者状态合适时也可反向。这能减少地理折返，却不表示四座城市都必须进入同一次旅行。每一站都要承担不同作用，高海拔延伸单独测试；路线过满时先删除整站，不要把每个地方都压成仓促入住。" },
  { id: "quick-choice", type: "comparison", title: "选择路线形状", columns: [
    { heading: "向北走廊", body: "昆明是抵达口岸，而且可从北端离开或继续前进、不必折返时实用。" },
    { heading: "向南走廊", body: "先到香格里拉本身可行，且全组能给最初高海拔阶段足够余量时实用。" },
    { heading: "更短三站路线", body: "往返必须使用同一口岸，或某一站没有不可替代目的时通常更强。" }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "铁路改善连续性，不会替旅客完成恢复" },
  { id: "official", type: "paragraph", text: "国家铁路局记录丽江至香格里拉铁路于2023年11月开通，建立两地直达铁路，也形成昆明—大理—丽江—香格里拉连续通道。云南省交通运输厅资料说明，线路从海拔约2400米的丽江站上升到约3274米的香格里拉站。这些事实让走廊更容易连接，却不能预测个人对更高海拔的反应，也不能保证当前时刻表。" },
  { id: "roles-heading", type: "heading", level: 2, text: "分配夜数前先给每一站工作" },
  { id: "roles", type: "table", caption: "只为不可替代的贡献保留一站", columns: ["地点", "可能角色", "删除理由"], rows: [
    ["昆明", "航空铁路口岸，加上自己的城市或周边重点", "只是被迫出现的机场名，且无需仓促住宿也能继续"],
    ["大理", "为湖区、古城和周边重点提供较慢基地", "计划体验与丽江重复，没有独特项目能经受删减"],
    ["丽江", "住宿区域选择、区域基地和北段通道", "只作为换乘保留，实际重点都在别处"],
    ["香格里拉", "有意识的高海拔景观与文化延伸", "只是著名的第四个名字，没有恢复、合适活动或稳健离开方案"]
  ] },
  { id: "direction-heading", type: "heading", level: 2, text: "方向由口岸与恢复共同决定" },
  { id: "direction", type: "table", caption: "比较整条路线，不只比较名字顺序", columns: ["方向", "可能优势", "规划代价"], rows: [
    ["昆明向北", "口岸起点简单，并沿走廊逐步前移", "因为每站都在前方，就把所有地点都加进来"],
    ["香格里拉向南", "北端开始后一路下降", "全组尚不知道自身反应，就先进入最高海拔阶段"],
    ["返回昆明", "可能匹配明显更好的同城国际航班", "重复走廊的一部分，必须有足够时间抵偿"],
    ["开口程端点", "可消除沿原路返回", "要把机票、行李和可靠性作为完整组合比较"]
  ] },
  { id: "altitude-heading", type: "heading", level: 2, text: "规划高海拔延伸，但不作医疗承诺" },
  { id: "altitude", type: "list", ordered: false, items: [
    "香格里拉第一天保持弹性，不把不可替代项目接在抵达后。",
    "不要用一位旅客过去的反应，预测另一位旅客的体验。",
    "锁定北段不可退预订前，先找到低海拔备用方案和可信离开方式。",
    "有健康顾虑的旅客应寻求适当专业建议；路线顺序不等于医疗许可。",
    "寒冷、天气与交通异常是海拔之外的独立问题，仍要做当前官方核对。"
  ] },
  { id: "workflow-heading", type: "heading", level: 2, text: "用八个决定搭走廊" },
  { id: "workflow", type: "list", ordered: true, items: [
    "确定实际抵达和离境机场，包括返回同一口岸的完整成本。",
    "为四站各写一个不可替代理由，只因名气或顺路而保留的直接删除。",
    "按真实活动比较大理与丽江，不把两地都当成笼统古城住宿。",
    "把香格里拉当作独立延伸测试：恢复、天气、行李和离开方案都要成立。",
    "根据口岸和全组状态，在向北、向南与更短路线之间选择。",
    "把每段铁路或公路都按完整门到门行程计算，转场日晚间保持弹性。",
    "结构通过后，再查询当前12306、航班条件和具体景区公告。",
    "路线过满时删除最弱一站，不同时缩短四站。"
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "规划示例：昆明是口岸，不是强制住宿" },
  { id: "example", type: "callout", tone: "neutral", title: "这是示例，不是住宿夜数方案", body: "旅客抵达昆明，但没有昆明重点；大理和丽江各有不同活动，香格里拉是核心景观延伸。若当前交通允许从容继续，昆明可以只做口岸，不必成为仓促的一晚观光站。若国际航班很晚，或全组需要恢复，昆明一晚即使没有完整城市游览安排，也有实际作用。" },
  { id: "failure-heading", type: "heading", level: 2, text: "常见失败与恢复" },
  { id: "failure", type: "table", caption: "修复走廊，不强行保留四个名字", columns: ["失败", "立即处理", "下次结构调整"], rows: [
    ["晚到让第一站失去目的", "把这一晚用于恢复，删除可选观光", "不要把抵达晚间算成完整目的地日"],
    ["大理与丽江计划重复", "只保留更强本地重点", "删除一个基地，或给两地不同角色"],
    ["全组无法适应北段", "停止增加活动，并遵循适当当地与医疗建议", "使用低海拔备用方案并缩短路线"],
    ["天气或交通阻断北端离开", "保护住宿和下一项已确认交通", "国际航班前保留恢复夜"],
    ["返回昆明吃掉完整最后一天", "先保护航班，删除之前最弱一站", "预订前比较开口程口岸"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "应该先删哪一站？" },
  { id: "switch-rule", type: "paragraph", text: "删除没有不同目的的一站，不自动删除最小或最不著名的城市。昆明可以只转场；大理或丽江若计划体验重叠，可以删除其一；香格里拉延伸没有余量或稳健离开方案时应删除。只有四站各自提供不可替代贡献，且路线仍有恢复空间时才全部保留。" },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "城市夜数之前已确定抵达和离境口岸。",
    "每一站都有不可替代目的。",
    "大理与丽江按真实活动区分。",
    "香格里拉有弹性第一天、低海拔备用和离开方案。",
    "临近出行重新核对当前交通与天气信息。"
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "核对当前铁路与环境", body: "铁路连接已经建立，但时刻、票务、天气和地方运营会变化。在12306搜索准确日期，并查询点名机关。本文不是医疗建议，也不承诺任何旅客的海拔反应。" },
  { id: "scope", type: "callout", tone: "neutral", title: "本文范围", body: "本文只负责昆明、大理、丽江、香格里拉的顺序与删减逻辑，不分配夜数、不规定景点、不选择丽江住宿区域，也不替代实时交通或专业健康建议。" },
  { id: "help-cta", type: "callout", tone: "decision", title: "需要检查云南走廊？", body: "请提供口岸、日期、重点、行李，以及愿意披露的健康相关限制。规划师可以测试最弱一环，但不能提供医疗许可。" },
  { id: "more-planning", type: "internal-links", title: "继续规划", items: [
    { label: "选择丽江古城还是束河", href: "/zh/guides/lijiang-old-town-or-shuhe-where-to-stay/", description: "确定丽江角色后再选酒店。" },
    { label: "准备中国铁路旅行", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "把旅客流程与路线设计分开核对。" },
    { label: "测试路线是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "转场与恢复后再计算可用日。" },
    { label: "选择正确的大理古城下车点", href: "/zh/guides/dali-station-to-old-town/", description: "按住宿位置选择南门、洱海门、苍山门或北门下车点，保存中文目的地卡，避免下错地点后拖着行李横穿古城。" },
    { label: "安排铁路、住宿基地与第一晚", href: "/zh/guides/lijiang-shangri-la-transport-route/", description: "比较丽江到香格里拉的铁路和公路交通，安排车站到住宿点的接驳，并为海拔上升后的第一晚留出休息时间。" },
    { label: "把可追溯的云南咖啡体验放进行程", href: "/zh/guides/yunnan-coffee-from-cherry-to-cup/", description: "核验具体生产者或咖啡馆、当前准入和批次身份，不添加泛泛的“咖啡绕行”。" },
    { label: "判断石林是否值得占用昆明一侧的一天", href: "/zh/guides/shilin-ashima-landscape-story/", description: "用阿诗玛的证据层判断石林是否提供独立目的，而不是把它当成泛泛拍照点。" }
  ] },
  { id: "sources", type: "sources", title: "已复核的官方来源", items: [
    { label: "丽江至香格里拉铁路开通运营", url: "https://www.nra.gov.cn/xwzx/xwxx/xwlb/202311/t20231127_343786.shtml", publisher: "国家铁路局", reviewedAt: "2026-08-12" },
    { label: "云南省交通运输厅丽香铁路概览", url: "https://jtyst.yn.gov.cn/html/2023/xingyexinwen_1127/130663.html", publisher: "云南省交通运输厅", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
