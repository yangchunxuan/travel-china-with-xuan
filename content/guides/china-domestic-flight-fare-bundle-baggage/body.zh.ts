import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "国内航班搜索页上最便宜的价格，不一定是你真正能用的最低成本机票。应以同一组旅客比较最终付款总额、托运和随身行李、真正需要的座位、退改条件，以及晚到会让后续预订损失多少。只有结算页把这五项都说清楚，才适合付款。" },
  { id: "quick-choice", type: "comparison", title: "哪类票价更适合这次旅行？", columns: [
    { heading: "精简票价", body: "所有人都轻装、日期确定，而且抵达后没有昂贵固定项目时，可以考虑。" },
    { heading: "含行李票价", body: "多人需要托运行李，附加费用会吃掉低价优势时，往往更清楚。" },
    { heading: "更灵活票价", body: "航班关系到国际离境、固定火车、活动或不可退酒店时，值得认真比较。" }
  ] },
  { id: "official-rules-heading", type: "heading", level: 2, text: "为什么必须看具体产品条件" },
  { id: "official-rules", type: "paragraph", text: "民航局旅客服务规定要求销售方说明多个航班是否属于联程、适用票价及客票使用条件，并告知行李尺寸、重量和免费额度等信息。这些规定并没有给所有航空公司、所有票价设定统一行李额或统一退改费。因此，比较依据必须是承运人当前运输总条件，以及结算页上这张票对应的具体规则。" },
  { id: "basket-heading", type: "heading", level: 2, text: "建立一个可公平比较的购物篮" },
  { id: "basket", type: "table", caption: "每个选项都记录相同项目", columns: ["项目", "需要记录", "常见错误"], rows: [
    ["机票总额", "同一币种下的票价、税费和无法避免的支付费用", "拿搜索卡片价和另一个方案的结算价比较"],
    ["托运行李", "每位旅客、每个方向的件数、重量、尺寸和价格", "以为一件附加行李能覆盖全组或往返"],
    ["随身行李", "具体票价对应的件数、尺寸与重量限制", "把随身和托运行李额混为一谈"],
    ["座位需求", "只记录能解决真实需求的座位，例如照护者与儿童同行", "不加判断地购买所有可选服务"],
    ["退改条件", "手续费、票价差额、时间档、误机处理和办理渠道", "把“可改”理解成“免费改”"],
    ["抵达后的依赖", "后续固定项目的替换成本或损失价值", "两张票价差不多，就忽略了抵达风险完全不同"]
  ] },
  { id: "checkout-heading", type: "heading", level: 2, text: "付款前的七步核对" },
  { id: "checkout", type: "list", ordered: true, items: [
    "先填入所有旅客和往返方向。一张单程引流价不能代表完整行程成本。",
    "确认机场、航站楼、实际承运人和日期。相似的城市名、机场名不可互换。",
    "打开即将购买产品的票价条件，记录实际可能用到的时间档下，自愿改签与退票如何计算。",
    "加入全组真正要带的行李，同时检查随身和托运行李，不要仅凭舱位名称推断额度。",
    "只添加必要座位和服务；若某项服务很重要，应确认已经落实，而不是仅提交了申请。",
    "多个航班一起显示时，确认销售方是否明确标为联程；若不是，付款前必须另做自转机风险评估。",
    "购票后保存确认信息、票号和带日期的适用条件。搜索截图不能证明最终签订了什么。"
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "规划示例：低价航班后接固定火车" },
  { id: "example", type: "callout", tone: "neutral", title: "比较后果，不虚构价格", body: "假设票价 A 不含托运行李，自愿改签限制较多；票价 B 含行李，退改条件更实用。若抵达后只是可替换的酒店晚间，补齐附加项后 A 仍可能划算。若航班后接固定火车，错过火车还会损失首晚酒店，B 的灵活性就有实际价值。必须使用你出行日期显示的价格和规则计算；这个示例不表示某种产品永远更便宜。" },
  { id: "risk-heading", type: "heading", level: 2, text: "哪些情况值得购买更多保护" },
  { id: "risk", type: "list", ordered: false, items: [
    "这是国际离境前最后一段国内航班。",
    "同一天还要接一张独立出票的航班或固定火车。",
    "不可退款的活动、许可、邮轮或限时景区依赖准时抵达。",
    "护照、签证、工作安排或健康决定未落实，日期可能变化。",
    "全组有多件托运行李、儿童、行动不便者，或其他让临时改订更困难的情况。"
  ] },
  { id: "disruption-heading", type: "heading", level: 2, text: "航班调整或取消时怎么办" },
  { id: "disruption", type: "list", ordered: true, items: [
    "先阅读承运人通知，并通过航空公司或机场核验状态，不要仅凭陌生人转发的截图操作。",
    "判断属于自愿还是非自愿变更。民航规定区分两类情形，可用方案也可能不同。",
    "接受替代航班前，重新检查抵达机场、航站楼和所有后续预订。",
    "按订单注明的渠道联系销售方或承运人，保留订单号和书面通知。",
    "新抵达时间若破坏另一份独立合同下的火车、酒店或航班，也要联系该供应方；一家承运人的处理不会自动改写另一份合同。",
    "若准备向责任方或保险申请处理，保存收据与记录；未阅读条款前不要假定一定赔付。"
  ] },
  { id: "failure-table", type: "table", caption: "出现这些信号应暂停付款", columns: ["信号", "为什么重要", "更好做法"], rows: [
    ["行李规则只出现在通用帮助页", "具体票价可能不同", "打开产品对应规则，或付款前询问销售方"],
    ["两个航班一起展示，但没有确认是联程", "前段异常时，后段票可能完全不变", "进行自转机测试，并比较受保护联程"],
    ["机场代码或航站楼与计划不同", "地面转移可能吃掉全部节省", "重新按门到门成本计算"],
    ["写着可改，但费用不清楚", "仍可能收取票价差额或时间档手续费", "记录实际公式，或选择规则更清晰的产品"],
    ["抵达后很快有昂贵固定项目", "最低票价已经变成单点故障", "移动后续项目、提前一天到达或购买合适保护"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "什么时候应该选另一个方案" },
  { id: "switch-rule", type: "paragraph", text: "补齐所有项目后，精简票价仍较低且行程能承受变化，可以选它。附加项缩小价差，或异常造成的损失明显更大时，应选包含更多服务或更灵活的票价。如果任何票价都无法给出安全的抵达方案，应改变出行日或交通结构，而不是从一个产品名称里购买虚假的确定性。" },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "票价产品会变化", body: "结算时重新核对具体承运人、销售方、航班和日期。行李限制、费用、退改规则及可选服务价格都可能变化，因此本文不制作永久航空公司对比表。" },
  { id: "scope", type: "callout", tone: "neutral", title: "本文范围", body: "本文只负责国内航班票价组合比较，不做航空公司排名、不报价实时票价、不承诺行李额度，也不替代机场接驳或自转机风险指南。" },
  { id: "help-cta", type: "callout", tone: "decision", title: "需要比较两组票价？", body: "请提供去除个人信息后的结算条件、日期、人数、真实行李和下一项固定预订。不要发送姓名、护照号、票号或付款信息。" },
  { id: "more-planning", type: "internal-links", title: "继续规划", items: [
    { label: "检查独立机票自转机风险", href: "/zh/guides/china-separate-flight-tickets-self-transfer-risk/", description: "便宜的票价组合仍可能让后续行程承担风险。" },
    { label: "了解中国旅行整体费用", href: "/zh/guides/how-much-does-a-china-trip-cost/", description: "把航班决策放回完整预算。" },
    { label: "比较开口程航班对路线的价值", href: "/zh/guides/china-open-jaw-flights-route-planning/", description: "更高的机票价格可能省掉一次昂贵折返。" },
    { label: "分清文昌航天空间", href: "/zh/guides/wenchang-commercial-space-city/", description: "分清文昌国家发射场、海南商业航天发射场与航天城开发，并对任何公众访问安排重新核实。" },
  ] },
  { id: "sources", type: "sources", title: "已复核的官方来源", items: [
    { label: "公共航空运输旅客服务管理规定", url: "https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html", publisher: "中国民用航空局", reviewedAt: "2026-08-12" },
    { label: "航空旅行客票常识", url: "https://www.caac.gov.cn/INDEX/HLFW/HKLXCS/", publisher: "中国民用航空局", reviewedAt: "2026-08-12" },
    { label: "2026年7月1日起施行的中华人民共和国民用航空法", url: "https://www.caac.gov.cn/XXGK/XXGK/FLFG/202512/t20251227_229597.html", publisher: "中国民用航空局", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
