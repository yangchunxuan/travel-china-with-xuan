import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuidePeakRate, bodyGuideRate, bodyReservationFee, bodyReservationLeadDays, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const sh5 = "shanghai-suzhou-5-day-private-tour";
const sh6 = "shanghai-suzhou-hangzhou-6-day-private-tour";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "航班允许从不同城市进出，最顺的顺序是南京→苏州→上海→杭州，或者反过来：每一段都是短途高铁，不走回头路。长途往返都在上海，就别硬走单线：以上海为一个落脚点，再加一个，通常是杭州，苏州当一日游去。只有五六天的，多数人先舍南京。答案看你从哪个机场进出、具体哪个火车站，以及每座城市要给你什么。" },
  { id: "quick-choice", type: "comparison", title: "先选择路线结构", columns: [
    { heading: "单向走廊", body: "南京和杭州能靠近不同口岸，且每次换酒店都服务真实本地重点时最好。" },
    { heading: "上海基地", body: "酒店稳定很重要、周边访问集中，且重复进站仍可接受时最好。" },
    { heading: "双基地混合", body: "一次移动能消除最长折返，又不制造四次入住时往往最强。" }
  ] },

  { id: "traps-heading", type: "heading", level: 2, text: "当天才会撞上的 6 个江南路线坑" },
  { id: "traps-list", type: "list", ordered: true, items: [
    "「上海」「苏州」都不止一个站。上海市政府的指南列了分布在全城的大小车站，提醒旅客出发前确认具体哪一站；苏州市交通运输局记录，随沪苏湖铁路开通了苏州南站和盛泽站，再加上苏州站、苏州北站。酒店离其中一个近，不等于离另外几个近。",
    "苏州最有名的园林不能临时进。拙政园是实名门票，要指定日期和入园时段，参观前 1—7 天才能订；苏州博物馆需另行预约（2026 年 9 月 26 日核对）。",
    "杭州灵隐寺不能当天约。每位游客都要实名分时预约（护照可以用），现场登记已于 2026 年 2 月 1 日取消（2026 年 9 月 26 日核对）。",
    "多数车票提前 15 天开售，含乘车当天（12306）。四个城市的安排要在开售之前想好，不然买到哪站就只能是哪站。",
    "误了车要花钱。按 12306 的退改规则（在 12306 买的票），开车前不足 24 小时退票收票价 20% 的退票费（24—48 小时收 10%，48 小时以上至 8 天收 5%）；开车后只能改签当天其他车次，而且要有余票（2026 年 10 月 20 日核对）。",
    "每换一次酒店，就是半天。退房、去车站、坐车、到了再入住，都排在那天下午你计划做的事前面；住四家酒店，就有三个这样的半天。",
  ] },
  { id: "traps-sales", type: "paragraph", text: `第 2、3 个坑都是要提前约的门票，这正是我们能帮上的：拙政园、灵隐寺与飞来峰、西湖游船或上海中心观光厅，我们用每位客人自己的名字预约，每人每个景点服务费 ${bodyReservationFee("zh")}，门票按票面价另付。参观前至少 ${bodyReservationLeadDays} 天提出并付款，就保证订到；万一没订上，服务费和票款全额退回。把日期和人数通过 WhatsApp 或邮件发给我们，12 小时内回复。让我们代订江南门票。`, link: { label: "让我们代订江南门票", href: "/zh/services/china-attraction-reservations/#reservation-enquiry" } },
  {"id": "short-trip-heading", "type": "heading", "level": 2, "text": "只有五六天，先决定舍掉什么"},
  {"id": "short-trip-routes", "type": "table", "caption": "用两条现有私人路线看清取舍", "columns": ["路线", "住宿与实际游览时间", "这项选择带来什么"], "rows": [["上海·苏州5天4晚", "上海同一家酒店4晚；到离日之间有3个完整游览日", "苏州当天往返，另含朱家角与上海中心118层。适合上海往返、不想搬酒店；这条路线不含杭州。"], ["上海·苏州·杭州6天5晚", "上海2晚、苏州1晚、杭州2晚；4个导游游览日，其中两天含跨城", "多一些苏州时间，加杭州的西湖、寺院与茶文化，代价是两次换酒店，并在杭州结束。不含朱家角与上海中心登塔。"]]},
  {"id": "short-trip-choice", "type": "paragraph", "text": `更在意同一家酒店，就先看五日线；杭州是必去，而且能在杭州结束，就先看六日线。六日线是另一套行程，不是五日线再加一天。两条都不含南京；增加第四城、反向走或从杭州返回上海，需要另行确认路线。5 天线 2 人出行每人 ${bodyTourPrice(sh5, 2, "zh")} 起，4 人每人 ${bodyTourPrice(sh5, 4, "zh")}，6 人每人 ${bodyTourPrice(sh5, 6, "zh")}；6 天线 2 人每人 ${bodyTourPrice(sh6, 2, "zh")} 起，4 人每人 ${bodyTourPrice(sh6, 4, "zh")}，6 人每人 ${bodyTourPrice(sh6, 6, "zh")}。`},
  {"id": "family-transfer-check", "type": "paragraph", "text": "带需要回房午睡的孩子走六日线，要特别看第 3、4 天：两天都要退房并去下一座城，不能默认中午回原房间休息。先告诉我们孩子的午睡时间和最愿意删掉哪个景点；我们可以核对放慢的安排，并在预订前书面确认差价。如果住同一家酒店比去杭州更重要，五日上海—苏州线在上海连住四晚。"},
  { id: "group-size-heading", type: "heading", level: 3, text: "四人或六人同行，还要算房间和行李" },
  { id: "group-size", type: "table", caption: "公开起价对应的基础安排；付款前按实际日期和人数核对", columns: ["要确认的事", "五天：上海—苏州", "六天：上海—苏州—杭州"], rows: [
    ["房间", "四人两间、六人三间，四晚都在上海同一家酒店。", "四人每地两间、六人每地三间；从上海换到苏州，再换到杭州，共搬两次酒店。"],
    ["行李与跨城", "去苏州的大件行李留在上海酒店。四人和六人仍乘高铁二等座往返，两端有私车接驳。", "行李随团转城。四至九人通常安排门到门车辆，但要按实际行李数量核对车型和装载。"],
    ["核价前", "确认每个人的年龄、床型需求、苏州车次及实际全团总价。", "确认三地酒店、车辆装载、上海抵达与杭州离开的安排及全团总价。返沪另做方案。"],
  ] },
  { id: "sales-heading", type: "heading", level: 2, text: "四城之间的事，交给我们" },
  { id: "car-offer", type: "paragraph", text: "拖着行李换城市？包车可以门到门，比如从苏州的酒店直接到杭州的酒店，或者从浦东机场直接到苏州，两头都不用进火车站。我们自己的司机在中国大陆任何城市都能派；路线、车型和总价付款前书面确认，12 小时内回复。确认后先付 30% 定金，支付宝或 VBill 都可以，尾款到了当地再付，不另收手续费。咨询城际包车。", link: { label: "咨询城际包车", href: "/zh/services/private-car-and-driver/#car-enquiry" } },
  { id: "guide-offer", type: "paragraph", text: `行程自己排？我们自己的英语导游在上海按整天服务：每位导游每天${bodyGuideRate("shanghai", "zh")}，最多 8 小时（高峰日${bodyGuidePeakRate("shanghai", "zh")}），按导游算、不按人头；交通、门票和餐费另算。中文客人可以安排中文导游，价格询价时确认。把日期和人数通过 WhatsApp 或邮件发给我们，12 小时内回复。预约上海导游。`, link: { label: "预约上海导游", href: "/zh/services/private-english-speaking-guides/#shanghai" } },
  { id: "order-copy", type: "paragraph", text: "想让人把整个顺序排好？从第一次回复到旅程最后一天，都是同一位规划师跟进：路线按你的航班和火车来排，酒店、接送、导游和景点预约都由我们接起来。我们是持证旅行社（许可证 L-BJ10587），不进购物店。说说你的整趟行程。", link: { label: "说说你的整趟行程", href: "/zh/services/full-trip-support/" } },
  {"id":"faq","type":"faq","title":"路线顺序常见问题","items":[{"question":"你们能帮我们约拙政园或灵隐寺吗？","answer":"能。我们用每位客人自己的名字预约，每人每个景点服务费 ¥45，门票按票面价另付；参观前至少 8 天提出并付款，就保证订到，没订上服务费和票款全额退回。拙政园要指定日期和入园时段，参观前 1—7 天才开放预订；灵隐寺不能当天约。"},{"question":"南京、苏州、上海、杭州该按什么顺序走？","answer":"航班允许使用不同口岸时，南京→苏州→上海→杭州或反向最实用。长途往返都用上海时，不要硬追“单向”：可以以上海为一个基地，再加一个战略性第二基地；也可以在比较完整的门到门时间之后接受折返。真正决定顺序的是机场、准确铁路车站，以及每座城市要完成什么。"},{"question":"苏州应该集中访问还是住一晚？","answer":"重点集中、实际用得上的车站与活动片区匹配，而且固定返程不会过早截断访问时，选择集中访问。本地清晨或晚间很重要、重点跨越多个片区，或者下一段前移能省掉返回上海时，选择住宿。不要因为苏州有名就自动住一晚，先决定看什么、需要多久。"},{"question":"必须少去一座城市时，删哪一座？","answer":"删掉独特目的最弱的那一座。只因为铁路区段看起来短而加进来的南京，通常是第一个删减项。不要为了保住四个名字，把每座城市都缩成抵达的晚上加一个仓促的早晨；留下的城市，各自都要有一个经受删减的目的。"},{"question":"苏州只有一个车站吗？","answer":"不是。苏州站、苏州北站和新的南部走廊车站不能互换。苏州市交通运输局记录苏州南站与盛泽站随沪苏湖高铁启用，在传统的苏州站、苏州北站之外多了新的路线可能。在酒店和活动旁写下准确车站，再按出行日期在12306搜索这一组站对。"},{"question":"往返机票都在上海，就一定要折返吗？","answer":"不一定。先用同一套门到门计算测试上海基地和双基地混合，再决定要不要接受重复的铁路通勤或最后折返机场。双基地往往一次移动就能拿到大部分地理收益，又不制造四次入住。最后返回上海很脆弱时，可以比较开口程，或者把最后一晚放在上海。"},{"question":"转场那天的下午，可以订定时门票吗？","answer":"转场抵达的那一天，不要安排不可替代的定时重点。退房、行李移动、进站和可能的延误都排在它前面；当天访问一旦有一半时间花在进站上，就只能保住最高优先级那一项。把定时票放在不用赶火车的那一天。"}]},
  {"id": "short-trip-products", "type": "internal-links", "title": "比较两种路线安排", "items": [{"label": "住在上海：5天4晚私人游", "href": "/zh/tours/shanghai-suzhou-5-day-private-tour/", "description": "同一家酒店，苏州高铁当天往返。"}, {"label": "继续到杭州：6天5晚私人游", "href": "/zh/tours/shanghai-suzhou-hangzhou-6-day-private-tour/", "description": "三城住宿，在确认的杭州机场或车站结束。"}]},
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
  {"id": "jiangnan-12-day-route-option", "type": "internal-links", "title": "多留一些时间，在水乡住一晚", "items": [{"label": "比较江南 12 天私家路线", "href": "/zh/tours/suzhou-tongli-hangzhou-shanghai-12-day-private-tour/", "description": "苏州 → 同里 → 杭州 → 上海，分别住 3、1、2、5 晚。这条区域长线安排了一晚水乡住宿；公布的路线不包含南京。"}]},
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "真实机场和准确铁路车站已经进入路线。",
    "每座城市都有经受删减的不同目的。",
    "苏州集中访问还是住宿，按活动和车站地理决定。",
    "所有酒店移动与重复进站都按门到门计算。",
    "当前12306服务和具体交通公告已复核。"
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "网络仍在变化", body: "车站使用、建设、列车运行和机场连接都会变化。用12306和当地官方公告核对准确日期与车站。本文不承诺实时车次、运行时间或统一的一日游规则。" },
  { id: "scope", type: "callout", tone: "neutral", title: "本文范围", body: "本文只负责四城顺序，以及单向走廊、上海基地、双基地混合之间的选择。城市交通指南负责具体方式；苏州园林指南负责访问本身；机场指南负责浦东与虹桥。" },
  { id: "help-cta", type: "callout", tone: "decision", title: "拿不准四个城市的顺序？", body: "通过 WhatsApp 或邮件发来进出的机场、日期、酒店偏好、行李，以及每座城市最想做的一件事。我们 12 小时内回复，告诉你哪一次换酒店最不划算、哪一段转场最长。" },
  { id: "more-planning", type: "internal-links", title: "继续规划", items: [ { label: "上海城市总览", href: "/zh/destinations/shanghai/", description: "在敲定这类细节之前，先决定几个完整游览日、住哪一岸和走哪个门户。" },
    { label: "查看上海—苏州—杭州 6 天私家路线", href: "/zh/tours/shanghai-suzhou-hangzhou-6-day-private-tour/", description: "如果三座城市都需要完整本地时间，可比较这条单向推进的产品路线。" },
    { label: "规划上海—杭州交通", href: "/zh/guides/shanghai-hangzhou-transport-route/", description: "城市顺序确定后再选车站。" },
    { label: "读懂一次苏州园林访问", href: "/zh/guides/how-to-read-a-suzhou-garden/", description: "增加酒店前先给苏州明确目的。" },
    { label: "选择浦东还是虹桥", href: "/zh/guides/shanghai-pudong-or-hongqiao-airport/", description: "航班机场可能推翻最佳路线。" },
    { label: "理解今天的大运河", href: "/zh/guides/grand-canal-everyday-urban-history/", description: "分清世界遗产、仍在运行的水道与今天的街区生活，再选择能看见三者关系的公共河段。" },
    { label: "选择黄海湿地基地", href: "/zh/guides/northern-jiangsu-yellow-sea-wetland-coast/", description: "分清盐城黄海湿地的分散区域，按东台、大丰或盐城市区选择基地，并准备即使没见到鸟也成立的替代安排。" },
    { label: "杭州西湖攻略：看什么、游船、玩多久", href: "/zh/guides/west-lake-hangzhou/", description: "哪些免费、上岛的游船、雷峰塔和一天的走法。" },
  ] },
  { id: "sources", type: "sources", title: "已复核的官方来源", items: [
    { label: "上海铁路车站指南", url: "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html", publisher: "上海市人民政府", reviewedAt: "2026-08-12" },
    { label: "苏州南站与盛泽站启用", url: "https://jtj.suzhou.gov.cn/szjt/tjgl/202501/4cbd95cd41d747d98bc277a1916c1ad7.shtml", publisher: "苏州市交通运输局", reviewedAt: "2026-08-12" },
    { label: "中国铁路旅客服务", url: "https://www.12306.cn/en/index.html", publisher: "中国铁路12306", reviewedAt: "2026-08-12" },
    { label: "车票提前 15 天开售（含乘车当日）", url: "https://www.12306.cn/mormhweb/zxdt/202205/t20220531_37508.html", publisher: "中国铁路 12306", reviewedAt: "2026-08-10" },
    { label: "铁路退票、改签规则", url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/info/orderWarmTips.html", publisher: "中国铁路 12306", reviewedAt: "2026-10-20" }
  ] }
]} satisfies StructuredPageBody;
export default body;
