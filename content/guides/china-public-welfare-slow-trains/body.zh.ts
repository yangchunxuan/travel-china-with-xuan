import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "中国的公益性慢火车是普通旅客列车，之所以保留，是为了连接高速铁路和公路尚未完全替代当地出行的小型社区。同一列车可能同时服务上学、赶集、务工、就医和探亲的乘客。它不是怀旧表演，也不是供游客观看乡村困境的项目。"},
  {id: "function-table", type: "table", caption: "这类列车的不同之处", columns: ["特点", "公共功能", "旅行者应怎样理解"], rows: [
    ["停靠许多小站", "连接快速列车越过的居民点。", "旅程较长，准确时刻比速度更重要。"],
    ["低价公共服务定位", "让基本出行更容易负担。", "旧报道中的票价不是今天的报价。"],
    ["兼顾客运与生计", "服务上学、工作、赶集和探亲。", "篮筐和当地货品可能只是日常生活的一部分，不是摄影布景。"],
    ["调整部分车内空间", "某些线路会为赶集货品或学习安排空间。", "具体设施会随线路和日期变化。"],
    ["铁路公共服务角色", "在乡村和交通受限地区，用既有普速铁路提供低价、多站停靠的客运连接。", "不能把所有车速较慢或车次较小的列车都称为公益性慢火车。"]
  ]},
  {id: "not-nostalgia", type: "heading", level: 2, text: "高铁时代为什么仍然需要慢火车"},
  {id: "not-nostalgia-copy", type: "paragraph", text: "高铁主要解决大型中心之间的快速移动，公益性慢火车解决的则是小站与县城或区域中心之间的可达性。国家铁路局资料记录了这些线路在上学、赶集和基本出行中的作用；针对具体车次的高校实地记录也呈现了普通客运功能。它们的价值在于让人能从小站出发、稳定抵达，而不是与高铁竞争速度。"},
  {id: "dated-number", type: "callout", title: "一份有日期的全国快照", body: "国家铁路局在 2024 年 3 月报道，全国当时开行 81 对公益性慢火车。这个数字说明该项目在当时的规模，不是 2026 年实时清单。线路、车次、停站和售票状态都必须在中国铁路官方渠道重新核验。", tone: "warning"},
  {id: "ordinary-passenger", type: "heading", level: 2, text: "普通旅行者能不能乘坐？"},
  {id: "ordinary-passenger-copy", type: "paragraph", text: "先在 12306 核对准确车次、日期和乘车区间。如果某段行程没有显示可售，既不要推断列车已经停运，也不要认为可以直接上车。部分非长途公益性慢火车和小站可能采用线路自己的办理方式，其中也有公开规定的实名制例外；出发前仍须向 12306 或车站确认，而不能凭旧报道行动。"},
  {id: "recognition-test", type: "table", caption: "把一班车当作可用的公益性慢火车之前，先做四项核对", columns: ["核对项", "应使用的证据", "遇到这种情况就停止推断"], rows: [
    ["公共服务身份", "当前铁路或政府来源明确指出该线路或车次。", "只有转载文章或旅行视频使用了“公益慢火车”这个称呼。"],
    ["当前是否开行", "官方铁路系统或车站确认准确车次和日期。", "只有旧报道提供车次；但一次在线搜索没有结果，也不能证明已经停运。"],
    ["你的乘车区间", "所选两站都为该车办理你需要的乘降。", "列车经过当地，却不在你需要的站办理客运停靠。"],
    ["尊重普通乘客", "你持有所需车票或车站确认，并且不会妨碍他人正常工作和出行。", "这趟旅行的主要目的，是拍摄可识别的乘客。"]
  ]},
  {id: "two-scenarios", type: "comparison", title: "两种负责任的选择", columns: [
    {heading: "列车确实适合一段真实行程", body: "在准确车次连接你确实需要前往的两地，而且完整旅行日安排可行时乘坐。像使用任何通勤列车一样乘车、就座，并克制拍摄。"},
    {heading: "好奇心也是乘坐原因之一", body: "好奇并不等于不能乘坐，但仍应把它当普通公共交通：持有规定车票，不占用工作空间，也不要把可识别的乘客，尤其是儿童，当成旅程主题。如果拍人本身才是主要目的，就不要去。"}
  ]},
  {id: "respect-checklist", type: "list", ordered: true, items: [
    "在铁路官方系统确认准确车次、日期、出发站和到达站。",
    "确认所选车站确实为该车办理旅客乘车。",
    "按照已核实的旅程准备饮食、饮水和电源；车上设施因线路而异。",
    "不要占用过道、车门、学习区或指定货品空间。",
    "拍摄他人，尤其是儿童之前先征得同意，并直接接受拒绝。",
    "不要把旧票价、旧时刻或某一条线路的社会功能写成全国永久规则。"
  ]},
  {id: "failure-recovery", type: "callout", title: "如果无法确认这班列车", body: "不要围绕它安排整天行程。向车站或中国铁路官方服务渠道询问准确车次和日期，再比较普通旅客列车或公路接驳。政府报道只能证明服务在报道时存在，不能为你的日期预留座位。", tone: "decision"},
  {id: "help", type: "callout", title: "需要判断某班慢火车是否适合真实路线？", body: "把出行日期、准确乘车区间、已经找到的车次、人数、行李和后续必须衔接的安排发给 Homeground。我们可以把公益性故事与当前可执行的客运行程分开，并指出仍须向官方确认的连接。", tone: "neutral"},
  {id: "internal-links", type: "internal-links", title: "为真实行程使用合适的铁路指南", items: [
    {label: "第一次乘中国高铁指南", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "全国通用的购票和乘车步骤，请参考这篇首次乘车指南。"},
    {label: "夜间列车还是白天高铁", href: "/zh/guides/china-night-train-or-daytime-high-speed-rail/", description: "比较时间、睡眠和抵达，而不是浪漫化的标签。"},
    {label: "设计全程铁路中国路线", href: "/zh/guides/china-rail-only-route/", description: "逐段判断铁路是否真正适合。"}
  ]},
  {id: "sources", type: "sources", title: "官方与独立来源", items: [
    {label: "公益性慢火车全国专题", url: "https://www.nra.gov.cn/xwzx/tpsp/tpxx/202403/t20240321_344881.shtml", publisher: "国家铁路局", reviewedAt: "2026-08-13"},
    {label: "铁路运输服务质量监督管理办法", url: "https://www.nra.gov.cn/xxgk/gkml/ztjg/gfzd/bmgz/202305/t20230519_341667.shtml", publisher: "国家铁路局", reviewedAt: "2026-08-13"},
    {label: "铁路旅客车票实名制管理办法及慢火车例外", url: "https://www.nra.gov.cn/xxgk/gkml/ztjg/gfzd/bmgz/202211/t20221125_339122.shtml", publisher: "国家铁路局", reviewedAt: "2026-08-13"},
    {label: "大凉山公益性慢火车动态", url: "https://www.nra.gov.cn/tlfc/yxfc/202506/t20250623_349047.shtml", publisher: "国家铁路局", reviewedAt: "2026-08-13"},
    {label: "7272 次列车学生实地调研记录", url: "https://stte.csu.edu.cn/info/1047/4083.htm", publisher: "中南大学", reviewedAt: "2026-08-13"},
    {label: "公益性铁路运输理论研究", url: "https://journal.bjut.edu.cn/bjgydxxbskb/article/doi/10.3969/j.issn.1671-0398.2015.05.005", publisher: "北京工业大学学报（社会科学版）", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
