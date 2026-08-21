import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "九寨沟不是一条沿湖步道。景区主线像一个Y字：树正沟是下方主干，日则沟和则查洼沟是两条上支。一天游览时，观光车负责跨越长距离和海拔，步行负责看细节。真正可行的目标不是把每个海子都打勾，而是保住一段最有层次的景观、一段高山支沟和从容返回沟口的时间。" },
  { id: "answer", type: "callout", title: "直接结论", tone: "decision", body: "尽早入园，先听当天调度去其中一条上支；长距离坐观光车，只在工作人员确认相连且开放的栈道间步行。若五花海、珍珠滩和林水变化是重点，把最多时间给日则沟；则查洼沟以长海和五彩池为精简组合；最后选树正沟两三个不同类型的停靠点。行程延误时，先删重复景观和远距离步行，不能删安全返程余量。" },
  { id: "shape-heading", type: "heading", level: 2, text: "先读懂Y形结构，再选景点" },
  { id: "shape", type: "table", caption: "三条沟承担三种任务", columns: ["沟谷", "第一次游览的作用", "不能想当然"], rows: [["日则沟（右支）", "林、水、彩池、滩瀑最密集，通常值得最长时段", "上端每个站点和栈道当天都开放"], ["则查洼沟（左支）", "以长海和五彩池为核心的高海拔短支线", "季节海值得长走；官方说明观光车不停且步行过远"], ["树正沟（主干）", "返程中的瀑布、湖群、寨子和栈道选择", "把整条沟拖到最后几分钟仍能看好"]] },
  { id: "bus-heading", type: "heading", level: 2, text: "把观光车当作当天的调度系统" },
  { id: "bus-copy", type: "paragraph", text: "九寨沟官方资料说明了三沟结构和统一观光车管理。实际运行会随客流、天气、维护和管控调整先去哪条沟、哪里能下车。上一季的地图不能压过眼前司机、电子屏和工作人员的指令。" },
  { id: "boarding", type: "list", ordered: true, items: ["入园后拍下当天地图，只标正在运行的站点。", "第一次上车前问清车辆开往哪条支沟。", "下车时确认下一合法上车点及栈道方向。", "离线保存沟口名称和返程方案。", "午后立即重算时间，不要到最后一条沟才发现系统收班。"] },
  { id: "three-plans-heading", type: "heading", level: 2, text: "诚实选择一种一天形状" },
  { id: "plans", type: "comparison", title: "优先级决定删什么", columns: [{ heading: "水景与森林优先", body: "日则沟保留最长连续时段，则查洼沟精简处理，树正沟只选两三站。适合第一次来、核心目标是彩池与瀑布的人。" }, { heading: "少走路版本", body: "在确认站点之间坐车，只保留短观景段。仍要考虑海拔、台阶和站立排队，不能把观光车等同无障碍。" }, { heading: "摄影慢游", body: "少选地点、多留时间，接受云、风与倒影变化。不得为了空镜离开开放路线或占住栈道。" }] },
  { id: "rize-heading", type: "heading", level: 2, text: "日则沟：保住一段连贯变化" },
  { id: "rize", type: "paragraph", text: "五花海是明显锚点，但日则沟真正精彩的是水体、森林、钙华和落差在相邻路段间如何变化。若当天栈道相通，选择一段湖—滩—瀑的连续步行，比为相邻地图点频繁上下车更有收获。熊猫海、五花海、珍珠滩和镜海不必平均分配。" },
  { id: "zechawa-heading", type: "heading", level: 2, text: "则查洼沟：让一次高海拔上行有意义" },
  { id: "zechawa", type: "paragraph", text: "长海与五彩池形成清楚对比：一个狭长高山湖，一个小尺度彩池。官方游玩说明明确指出上下季节海具有季节性、观光车不停且步行距离太远。跳过它们是合理取舍，不是漏掉九寨沟。" },
  { id: "shuzheng-heading", type: "heading", level: 2, text: "树正沟：用剩余时间主动选择" },
  { id: "shuzheng", type: "table", caption: "临近返程的选择", columns: ["剩余时间", "保留", "删除"], rows: [["充足", "一处瀑布或滩、一组湖和一段确认开放的栈道", "重复打卡式停靠"], ["较短", "最清楚、返程连接最直接的一站", "长距离寨子绕行或不确定的下游步行"], ["很少", "留在返程系统内，从合法站点或车上看景", "依赖最后一班未核实车辆的计划"]] },
  { id: "cuts", type: "callout", title: "优先删什么", tone: "warning", body: "先删作用相似的第二个湖、观光车不停靠的长走段、可以出园再买的东西，以及工作人员判断当天难以安全完成的上支。不能删返程余量、吃喝、保暖防雨和理解临时换乘指令所需的时间。" },
  { id: "failure-heading", type: "heading", level: 2, text: "景区不按截图运行时怎么恢复" },
  { id: "failure", type: "table", caption: "常见失败与处理", columns: ["问题", "处理"], rows: [["车辆先去另一支沟", "反转支沟顺序，保留原来的优先级和删减表"], ["栈道或站点关闭", "留在运行中的车辆网络，选最近且不重复的景观"], ["云雨雪影响视野", "看近处林水、减少湿滑步行并服从天气管控"], ["客流吃掉上午", "减少一条支沟的深度，不靠奔跑或不吃饭追回时间"], ["出现高反或明显不适", "停止上行，立即找工作人员或医疗帮助"]] },
  { id: "not-transport", type: "callout", title: "本页从景区检票后开始", tone: "neutral", body: "成都到九寨沟的铁路、公路、航班、酒店和沟口接送由独立交通指南负责。晚到景区不能靠压缩完整游览日来补救。" },
  { id: "checklist", type: "list", items: ["出发前重开九寨沟官方公告与购票渠道。", "核对天气、海拔服装和临时关闭。", "准备水、简单午餐与离线中文地名。", "设午间复盘点和离开上支的最晚时间。", "只走开放栈道并遵循当天观光车指令。"] },
  { id: "links", type: "internal-links", title: "连接九寨沟行程", items: [{ label: "成都到九寨沟交通", href: "/zh/guides/chengdu-jiuzhaigou-transport-route/", description: "选择城市到沟口路线，并保护抵达当晚。" }, { label: "放射式还是多基地路线", href: "/zh/guides/china-hub-and-spoke-or-multi-base-route/", description: "判断川北是否值得拥有独立过夜基地。" }, { label: "行程是不是太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "把换乘与恢复时间也算进去。" }, { label: "带父母游中国", href: "/zh/guides/china-itinerary-with-older-parents/", description: "调整海拔、步行和恢复日。" }, { label: "中国公共假期", href: "/zh/guides/china-public-holidays-travel-calendar/", description: "定景区日之前检查客流高压日期。" }] },
  { id: "sources", type: "sources", title: "复核来源", items: [{ label: "九寨沟官方游玩方式与三沟结构", url: "https://www.jiuzhai.com/intelligent-service/way-of-play", publisher: "九寨沟风景名胜区管理局", reviewedAt: "2026-08-22" }, { label: "九寨沟世界遗产说明与管理", url: "https://whc.unesco.org/en/list/637", publisher: "联合国教科文组织世界遗产中心", reviewedAt: "2026-08-22" }, { label: "观光车管理与保护实践", url: "https://whc.unesco.org/en/list/637/bestpractice", publisher: "联合国教科文组织世界遗产中心", reviewedAt: "2026-08-22" }, { label: "头图：Chensiyuan拍摄的五花海，CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:1_jiuzhaigou_valley_wu_hua_hai_2011b.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }] }
] } as const satisfies StructuredPageBody;
export default body;
