import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "公益性慢火车是保留下来的普通旅客列车，用来连接高速铁路和公路尚未完全覆盖的小城镇与乡村。同一列车可能载着上学的孩子、赶集的商贩、务工者、就医者和探亲乘客。它不是摆拍的怀旧列车，更不是展示乡村困境的观光项目。"},
  {id: "function-table", type: "table", caption: "这类列车的不同之处", columns: ["特点", "公共功能", "旅行者应怎样理解"], rows: [
    ["停靠许多小站", "连接快速列车越过的居民点。", "旅程较长，确认时刻比追求速度重要。"], ["低成本定位", "让基本出行更可负担。", "旧报道中的票价不是当前报价。"], ["兼顾乘客与生计", "服务上学、工作、赶集和探亲。", "篮筐和农产品是日常生活，不是布景。"], ["部分车辆调整空间", "有些线路设置货品或学习区域。", "设施因线路和日期而异。"], ["铁路公共服务", "在人流不足以支持快车的地方维持连接。", "不是所有慢车车次都属于公益性慢火车。"]
  ]},
  {id: "not-nostalgia", type: "heading", level: 2, text: "高铁时代为什么还需要慢火车"},
  {id: "not-nostalgia-copy", type: "paragraph", text: "高速铁路解决大城市和区域中心之间的移动，公益性慢火车解决小站与县城、区域中心之间的可达性。国家铁路局资料记录了上学、赶集和基本出行功能，学术研究也把它视为乡村公共交通的补充。它的价值在于能停靠、能抵达、能持续服务，而不是与高铁比速度。"},
  {id: "dated-number", type: "callout", title: "一份有日期的全国快照", body: "国家铁路局在 2024 年 3 月报道全国有 81 对公益性慢火车。这个数字说明当时的项目规模，不是 2026 年实时清单。线路、车次、停站和售票状态都应在铁路官方渠道重新核验。", tone: "warning"},
  {id: "ordinary-passenger", type: "heading", level: 2, text: "普通旅行者能不能乘坐"},
  {id: "ordinary-passenger-copy", type: "paragraph", text: "如果铁路官方系统向你显示某个车次可售，并接受你的证件预订，它就是普通旅客列车，不是只给当地居民看的展品。但小站和部分车次不一定能通过笼统搜索轻易找到。必须核对具体车次、日期、乘降站和售票入口，不要因为多年前纪录片提到某条线就直接去站台。"},
  {id: "two-scenarios", type: "comparison", title: "两种负责任的决定", columns: [
    {heading: "列车确实服务你的行程", body: "当已确认车次连接你真正要去的两地，且完整旅行日可行时再乘坐。像对待任何通勤列车一样克制地就座和拍摄。"}, {heading: "只是把列车当奇观", body: "不要挤占座位、堵住货品区域，也不要把孩子和商贩拍成“苦难叙事”。如果交通本身没有行程意义，选择别的文化体验。"}
  ]},
  {id: "respect-checklist", type: "list", ordered: true, items: ["在铁路官方系统确认准确车次、日期、出发站和到达站。", "确认所选小站确实办理该车次乘降。", "按已核实的旅程准备饮食、饮水和电源；车上设施并不统一。", "不要堵塞过道、车门、学习区或指定货品空间。", "拍摄他人尤其是儿童前先征得同意，并尊重拒绝。", "不要把旧票价、旧时刻或某条线的社会功能写成全国永久规则。"]},
  {id: "failure-recovery", type: "callout", title: "如果无法确认这班车", body: "不要围绕它安排一整天。向车站或铁路官方服务渠道询问具体车次和日期，再比较普通旅客列车或公路接驳。政府报道只能证明报道时服务存在，不能为你的日期预留座位。", tone: "decision"},
  {id: "internal-links", type: "internal-links", title: "为实际旅程选择正确铁路指南", items: [
    {label: "第一次乘中国高铁指南", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "全国购票和乘车流程留在对应 canonical 指南。"}, {label: "夜间列车还是白天高铁", href: "/zh/guides/china-night-train-or-daytime-high-speed-rail/", description: "比较时间、睡眠和抵达，而不是浪漫标签。"}, {label: "设计全程铁路中国路线", href: "/zh/guides/china-rail-only-route/", description: "确认每一段是否真的适合铁路。"}
  ]},
  {id: "sources", type: "sources", title: "官方与独立来源", items: [
    {label: "公益性慢火车全国报道", url: "https://www.nra.gov.cn/xwzx/tpsp/tpxx/202403/t20240321_344881.shtml", publisher: "国家铁路局", reviewedAt: "2026-08-13"}, {label: "铁路运输服务质量监督管理办法", url: "https://www.nra.gov.cn/xxgk/gkml/ztjg/gfzd/bmgz/202305/t20230519_341667.shtml", publisher: "国家铁路局", reviewedAt: "2026-08-13"}, {label: "大凉山公益性慢火车动态", url: "https://www.nra.gov.cn/tlfc/yxfc/202506/t20250623_349047.shtml", publisher: "国家铁路局", reviewedAt: "2026-08-13"}, {label: "7272 次列车高校田野调查", url: "https://stte.csu.edu.cn/info/1047/4083.htm", publisher: "中南大学", reviewedAt: "2026-08-13"}, {label: "乡村机动性与补充公共交通研究", url: "https://ir.pku.edu.cn/handle/20.500.11897/610349", publisher: "北京大学机构知识库", reviewedAt: "2026-08-13"}
  ]}
]}; export default body;
