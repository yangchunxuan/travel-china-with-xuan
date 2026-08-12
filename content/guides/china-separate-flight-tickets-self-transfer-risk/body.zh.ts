import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "除非销售方和承运人明确确认这是受保护的联程，否则应把分开出票的航班视为两段独立旅行。第一段调整后，第二张票可能完全不变，却已经无法使用。不要用一个通用的“最短转机时间”填补合同缺口；应消除同日依赖、建立真正可恢复的余量，或购买明确保护接续的行程。" },
  { id: "quick-choice", type: "comparison", title: "选择接续结构", columns: [
    { heading: "受保护联程", body: "错过后段会危及国际离境、活动或昂贵不可退项目时优先。" },
    { heading: "独立机票加一晚", body: "首站本身值得停留，且次日航班留有恢复空间时通常可行。" },
    { heading: "同日自转机", body: "只有核对行李、手续、机场位置、最后可行备选和失败成本后才考虑。" }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "“一起卖”不能证明是同一份运输合同" },
  { id: "official", type: "paragraph", text: "民航局提示：同一客票号码上的两个及以上航班属于联程，销售多个航程时也应明确告知是否为联程。非联程航班通常独立出票、对应不同运输合同；一段发生异常不会自动改变另一张票，每张票分别适用各自承运人条件。付款前应书面确认票务结构；单一结算页面或一个代理订单号本身不足以证明联程。" },
  { id: "contract-check-heading", type: "heading", level: 2, text: "确认自己到底买了什么" },
  { id: "contract-check", type: "list", ordered: true, items: [
    "询问销售方这些航班是否为联程，而不只是组合搜索结果或自转机产品。",
    "核对票号和实际承运人，保存书面产品说明与适用的退改条件。",
    "询问托运行李是否能直接到最终目的地，不要根据联盟、共同品牌或机场布局推断。",
    "询问第一段延误或取消、导致错过后段时，销售方或承运人具体如何处理。",
    "答案带条件或不清楚时，就按独立合同计价，并假设需要提取行李后重新托运。"
  ] },
  { id: "risk-map-heading", type: "heading", level: 2, text: "画出完整自转机流程" },
  { id: "risk-map", type: "table", caption: "接续是一串关口，不是一个时间差", columns: ["阶段", "需要核对", "失败后果"], rows: [
    ["首段抵达", "抵达机场、航站楼和实际延误风险", "尚未进入航站楼，可用时间已经缩短"],
    ["入境手续", "按本人行程和证件是否需要边检、海关或安检", "排队或证件问题中断接续"],
    ["行李", "是否直挂；若不直挂，提取与再次托运截止时间", "无法进入后续流程或赶不上托运截止"],
    ["地面转移", "同航站楼、换航站楼还是换机场，以及现实交通方式", "堵车或走错航站楼吃掉余量"],
    ["第二次值机", "承运人当前值机、托运和登机口要求", "机票仍有效，但超过截止时间无法使用"],
    ["恢复", "最后可行后续航班、住宿、入境资格和支持渠道", "失败变成非计划过夜或失去整段后续行程"]
  ] },
  { id: "buffer-heading", type: "heading", level: 2, text: "按失败后果建立余量，不使用统一数字" },
  { id: "buffer", type: "list", ordered: false, items: [
    "先加入所有强制流程：下机、手续、行李、转移、值机、安检与到达登机口。",
    "根据路线和季节，用当前机场及承运人信息加入运营不确定性。",
    "后续可用航班稀少时加入恢复时间。名义间隔很长但没有后续选择，仍然脆弱。",
    "有托运行李、换机场、儿童、行动需求或需要人工处理证件时，提高保护程度。",
    "若失败会危及最终国际离境，应把首段移到前一天，而不是争论多留几十分钟。"
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "规划示例：同一城市的两个机场" },
  { id: "example", type: "callout", tone: "neutral", title: "这是示例，不是安全接续承诺", body: "搜索结果在一个代理订单里组合了国内抵达和国际离境，但两段票号不同，且使用同城不同机场。页面显示的间隔并不是转机时间：还要承担抵达、行李、地面交通、重新值机、安检和第二家承运人的截止时间。若错过国际航班损失很大，稳健答案通常是住在离境机场附近一晚，或购买受保护联程，而不是把出租车计划压得更紧。" },
  { id: "failure-heading", type: "heading", level: 2, text: "第一段出现异常时" },
  { id: "failure", type: "list", ordered: true, items: [
    "向首段承运人核实状态，并按该张票条件判断是自愿还是非自愿变更。",
    "在第二段值机截止前联系其承运人或销售方，明确说明分开出票，询问付费或酌情方案，不声称自动受保护。",
    "比较当天最后可行备选，以及住宿一晚、次日出发。优先保护价值最高的后续承诺，而不是不惜代价维持原顺序。",
    "代理平台若宣传特定自转机保障，行动前阅读准确适用条件、通知时限和证据要求。",
    "保存承运人消息、收据和原始产品说明，用于向销售方、保险或责任供应方申请；是否覆盖由各自条款决定。"
  ] },
  { id: "red-flags-heading", type: "heading", level: 2, text: "这些红旗应直接改变计划" },
  { id: "red-flags", type: "table", caption: "不要让低价隐藏脆弱接续", columns: ["红旗", "为什么重要", "更好方案"], rows: [
    ["销售方无法明确回答是否联程", "异常时责任不清", "购买明确保护，或按独立票处理"],
    ["换航站楼或换机场", "地面交通在两张票之外增加一套失败系统", "住宿一晚或使用同一机场"],
    ["托运行李加紧张同日间隔", "提取和重托制造硬截止时间", "行李直挂的受保护联程，或大幅加宽方案"],
    ["当天末班后段", "延误后没有同日恢复", "选择更早后段或住宿一晚"],
    ["接续后是国际离境", "一次国内异常可能损失最贵的票", "前一天抵达离境城市"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "什么情况下独立机票仍合理" },
  { id: "switch-rule", type: "paragraph", text: "价格或路线优势真实、旅客理解合同，而且行程包含一晚或多个可行恢复选项时，独立机票可以合理。失败后果难以承受、涉及行李或换机场，或旅客无法自信完成所有手续时，应购买受保护联程。这个决定衡量的是可恢复性，不是胆量。" },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "销售方已书面确认联程或非联程状态。",
    "票号、机场、航站楼、实际承运人和行李处理方式都已明确。",
    "所有手续和承运人截止时间能进入保守的转机计划。",
    "已识别最后可行备选和大致失败成本。",
    "最终国际离境不依赖脆弱的同日自转机。"
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "逐一复核具体运营方", body: "航空公司条件、航站楼安排、机场流程和销售方保障都会变化。临近出行核对准确票务和日期。本文不提供通用安全转机时间，也不构成法律意见。" },
  { id: "scope", type: "callout", tone: "neutral", title: "本文范围", body: "本文只负责分开出票的合同和恢复风险。具体机场指南负责地面转移；票价组合指南负责行李和灵活性定价；末晚指南负责国际离境前的定位。" },
  { id: "help-cta", type: "callout", tone: "decision", title: "需要自转机压力测试？", body: "请提供去除个人信息后的日期、机场、航站楼、票务结构、行李和后续承诺。不要发送姓名、护照号、票号或付款资料。" },
  { id: "more-planning", type: "internal-links", title: "继续规划", items: [
    { label: "保护国际离境前最后一晚", href: "/zh/guides/china-last-night-before-international-flight/", description: "不要让自转机成为最终单点故障。" },
    { label: "核对准确的上海机场", href: "/zh/guides/shanghai-pudong-or-hongqiao-airport/", description: "换机场不等于转机。" },
    { label: "比较国内航班票价组合", href: "/zh/guides/china-domestic-flight-fare-bundle-baggage/", description: "先计入行李与退改条件，再判断机票是否便宜。" }
  ] },
  { id: "sources", type: "sources", title: "已复核的官方来源", items: [
    { label: "民航局关于联程与非联程航班的提示", url: "https://www.caac.gov.cn/INDEX/HLFW/HKLXCS/202303/t20230316_217590.html", publisher: "中国民用航空局", reviewedAt: "2026-08-12" },
    { label: "公共航空运输旅客服务管理规定", url: "https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html", publisher: "中国民用航空局", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
