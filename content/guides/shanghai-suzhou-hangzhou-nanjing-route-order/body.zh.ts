import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "航班允许使用不同口岸时，实用的四城顺序是南京→苏州→上海→杭州，或反向。长途往返都用上海时，不要强行追求“单向”：可以以上海为一个基地，加一个战略性第二基地；也可以在比较完整的门到门时间后接受折返。答案取决于机场、准确铁路车站，以及每座城市必须完成什么。" },
  { id: "quick-choice", type: "comparison", title: "先选择路线结构", columns: [
    { heading: "单向走廊", body: "南京和杭州能靠近不同口岸，且每次换酒店都服务真实本地重点时最好。" },
    { heading: "上海基地", body: "酒店稳定很重要、周边访问集中，且重复进站仍可接受时最好。" },
    { heading: "双基地混合", body: "一次移动能消除最长折返，又不制造四次入住时往往最强。" }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "车站地理可以推翻路线" },
  { id: "official", type: "paragraph", text: "上海市政府指南列出分布在全市的多个主要和较小铁路车站，并提醒旅客出发前核对准确车站。苏州市交通运输局记录苏州南站与盛泽站随沪苏湖高铁启用，增加了传统苏州站、苏州北站之外的路线可能。正因如此，只写城市到城市不够；应按出行日期在12306搜索准确车次和车站。" },
  { id: "roles-heading", type: "heading", level: 2, text: "给每座城市不同角色" },
  { id: "roles", type: "table", caption: "城市通过活动赢得基地，不靠知名度", columns: ["城市", "可能路线角色", "什么时候不增加酒店"], rows: [
    ["上海", "国际口岸、内容深度高的城市基地和交通节点", "只为转机住一晚，却没有可用城市时间"],
    ["苏州", "在紧凑计划中完成园林、运河、工艺或博物馆重点", "从其他基地集中访问即可，携带行李反而增加摩擦"],
    ["杭州", "西湖、茶区或更广城市重点，需要本地清晨与晚间", "只有一个中心项目，集中访问即可"],
    ["南京", "历史、博物馆、城墙等分散重点，适合本地基地", "仅因为铁路区段看起来短而加入"]
  ] },
  { id: "gateway-heading", type: "heading", level: 2, text: "从机场和准确车站开始" },
  { id: "gateway", type: "table", caption: "分配夜数前测试这些形状", columns: ["口岸模式", "先测试结构", "主要隐藏成本"], rows: [
    ["上海抵达，杭州或南京离境", "向离境方向单向前移", "沿途出现过多一晚基地"],
    ["往返都用上海", "上海基地或双基地混合", "重复铁路通勤，或最后折返机场"],
    ["虹桥机场配虹桥铁路", "把相连区段放在抵达或离境附近", "以为所有需要的列车都使用虹桥"],
    ["浦东机场", "保护更长市内转移与最后一晚", "把上海机场接驳算进铁路运行时间"]
  ] },
  { id: "suzhou-heading", type: "heading", level: 2, text: "苏州：集中访问还是住一晚？" },
  { id: "suzhou", type: "list", ordered: false, items: [
    "重点集中、实际车站匹配活动区域，且固定返程不会过早截断访问时，选择集中访问。",
    "本地清晨或晚间很重要、重点跨越多个区域，或下一段前移能消除返回上海时，选择住宿。",
    "在酒店和活动旁写下准确苏州车站；苏州站、苏州北站与新南部走廊车站不能互换。",
    "带行李访问时，应向具体服务方确认寄存，不要围绕想象中的储物柜搭路线。",
    "不要因为苏州有名就自动住宿；先决定到底看什么、需要多久。"
  ] },
  { id: "workflow-heading", type: "heading", level: 2, text: "用八个决定搭四城路线" },
  { id: "workflow", type: "list", ordered: true, items: [
    "决定方向前，确定真实抵达和离境机场。",
    "每座城市给一个不可替代目的，只为凑齐而保留的删除。",
    "在12306搜索准确车站组合，记录车站名而不只是城市名。",
    "按酒店门到活动门的时间，比较每座城市做基地还是集中访问。",
    "统计每次退房、行李移动、寄存空档和重复进站。",
    "用同一套门到门计算测试单向走廊、上海基地和双基地混合。",
    "转场抵达后不安排不可替代定时重点。",
    "选择强制折返和弱酒店移动更少的结构，再分配夜数。"
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "规划示例：四个名字，两个基地" },
  { id: "example", type: "callout", tone: "neutral", title: "这是示例，不是规定行程", body: "旅客往返上海，想集中看一次苏州园林、在上海有多个完整重点，也想在杭州保留一个本地清晨，而南京只有一个可选博物馆。以上海与杭州为双基地、苏州集中访问，可能比四家酒店更强，南京则是第一个删减项。若南京变成核心历史站，且可使用不同离境口岸，单向走廊会更合理。" },
  { id: "failure-heading", type: "heading", level: 2, text: "失败与恢复" },
  { id: "failure", type: "table", caption: "修复路线结构，而不只是换一趟车", columns: ["失败", "立即处理", "下次结构调整"], rows: [
    ["去错上海或苏州车站", "重算当地交通，优先保护下一固定离境", "每一行行程都记录准确车站"],
    ["集中访问一半时间花在进站", "只保留最高优先级并安全返回", "使用本地基地或删除访问"],
    ["四家酒店制造三个入住空档", "只有寄存已确认时使用，并删除转场日可选活动", "重建为两个基地"],
    ["最后返回上海很脆弱", "更早返回并保护航班", "比较开口程或最后一晚住上海"],
    ["建设或运行图更新改变车站", "遵循当前运营方指引", "出发前重新搜索准确12306"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "什么时候改用另一种形状" },
  { id: "switch-rule", type: "paragraph", text: "口岸布局能消除折返，且每座城市都值得本地时间时，用单向走廊。同一房间的稳定性大于往返通勤的总成本时，用上海基地。一次移动就能获得大部分地理收益时，用双基地。删除独特目的最弱的城市；不要为了保住四个名字，把每城都缩成抵达晚间和仓促早晨。" },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "真实机场和准确铁路车站已经进入路线。",
    "每座城市都有经受删减的不同目的。",
    "苏州集中访问还是住宿，按活动和车站地理决定。",
    "所有酒店移动与重复进站都按门到门计算。",
    "当前12306服务和具体交通公告已复核。"
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "网络仍在变化", body: "车站使用、建设、列车运行和机场连接都会变化。用12306和当地官方公告核对准确日期与车站。本文不承诺实时车次、运行时间或统一的一日游规则。" },
  { id: "scope", type: "callout", tone: "neutral", title: "本文范围", body: "本文只负责四城顺序，以及单向走廊、上海基地、双基地混合之间的选择。城市交通指南负责具体方式；苏州园林指南负责访问本身；机场指南负责浦东与虹桥。" },
  { id: "help-cta", type: "callout", tone: "decision", title: "需要检查长三角路线？", body: "请提供抵达和离境机场、日期、酒店偏好、行李和每城一个重点。有效审核应找出最弱酒店，以及耗时最长的酒店到车站完整转移。" },
  { id: "more-planning", type: "internal-links", title: "继续规划", items: [ { label: "上海城市总览", href: "/zh/destinations/shanghai/", description: "在敲定这类细节之前，先决定几个完整游览日、住哪一岸和走哪个门户。" },
    { label: "规划上海—杭州交通", href: "/zh/guides/shanghai-hangzhou-transport-route/", description: "城市顺序确定后再选车站。" },
    { label: "读懂一次苏州园林访问", href: "/zh/guides/how-to-read-a-suzhou-garden/", description: "增加酒店前先给苏州明确目的。" },
    { label: "选择浦东还是虹桥", href: "/zh/guides/shanghai-pudong-or-hongqiao-airport/", description: "航班机场可能推翻最佳路线。" },
    { label: "理解今天的大运河", href: "/zh/guides/grand-canal-everyday-urban-history/", description: "分清世界遗产、仍在运行的水道与今天的街区生活，再选择能看见三者关系的公共河段。" },
    { label: "选择黄海湿地基地", href: "/zh/guides/northern-jiangsu-yellow-sea-wetland-coast/", description: "分清盐城黄海湿地的分散区域，按东台、大丰或盐城市区选择基地，并准备即使没见到鸟也成立的替代安排。" },
  ] },
  { id: "sources", type: "sources", title: "已复核的官方来源", items: [
    { label: "上海铁路车站指南", url: "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html", publisher: "上海市人民政府", reviewedAt: "2026-08-12" },
    { label: "苏州南站与盛泽站启用", url: "https://jtj.suzhou.gov.cn/szjt/tjgl/202501/4cbd95cd41d747d98bc277a1916c1ad7.shtml", publisher: "苏州市交通运输局", reviewedAt: "2026-08-12" },
    { label: "中国铁路旅客服务", url: "https://www.12306.cn/en/index.html", publisher: "中国铁路12306", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
