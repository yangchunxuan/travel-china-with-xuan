import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "景德镇不是一座博物馆外加纪念品店。陶瓷故事有明确空间：陶阳里与御窑把考古、宫廷生产和老街巷放在历史中心；陶溪川把二十世纪瓷厂转成工业遗产与当代创意区；三宝把工作室、驻地和乡村创意空间散布在山谷。先选想认识哪一座“陶瓷城市”。" },
  { id: "answer", type: "callout", title: "直接结论", tone: "decision", body: "只有一天，把陶阳里/御窑和陶溪川相连：先读老城生产史，再看工业遗产如何承载今天的创作。只有另有半天、已确认工作室预约或明确想看山谷创意生态时才加三宝。考古是主兴趣时，保护御窑片区深度，并用独立御窑文章理解博物馆，不要赶三片区。" },
  { id: "matrix-heading", type: "heading", level: 2, text: "三片区是三层陶瓷史" },
  { id: "matrix", type: "table", caption: "按任务选片区", columns: ["片区", "主要任务", "常见误解"], rows: [["陶阳里/御窑", "读御窑考古、博物馆建筑与旧生产街区", "把新博物馆当完整遗址，或认为每条老巷都原封不动"], ["陶溪川", "理解工业遗产、当代设计、集市和旧瓷厂再利用", "把它说成古窑区或假设每天有集市"], ["三宝", "接触分散工作室、驻地与乡村创意生态", "把“三宝”当一个可快速走完的封闭景点"]] },
  { id: "imperial-heading", type: "heading", level: 2, text: "陶阳里：从考古与老城开始" },
  { id: "imperial", type: "paragraph", text: "景德镇市政府把陶阳里描述为约3.2平方公里历史文化旅游区，核心包括全国重点文保御窑厂遗址、御窑博物馆、里弄、会馆瓷行、窑作群落和工业遗产。空间课题是连续与变化：宫廷生产、城市生活、考古、修复重建和当代展示共处，但年代不同。" },
  { id: "imperial-route", type: "list", ordered: true, items: ["注意力最好时先看考古与博物馆层。", "借展陈区分出土物、重建部分与新设计。", "只走一组有边界的周边里弄。", "笔记中区分器物、窑址、现代解释和商业作坊。", "在第二座博物馆破坏与陶溪川对比前离开。"] },
  { id: "taoxichuan-heading", type: "heading", level: 2, text: "陶溪川：先读工厂，再逛集市" },
  { id: "taoxichuan", type: "paragraph", text: "市政府说明，陶溪川一期以原宇宙瓷厂为核心，通过陶瓷工业遗产保护利用形成。先看厂房尺度、烟囱、生产建筑，以及画廊、店铺和工作室如何进入其中。创意集市能连接当代创作者，但日期、摊主和天气动态，不能把整趟旅行押在社交平台日历上。" },
  { id: "sanbao-heading", type: "heading", level: 2, text: "三宝：山谷计划，不是最后顺路一站" },
  { id: "sanbao", type: "callout", title: "带着具体地点去三宝", tone: "decision", body: "市政府把三宝描述为国际瓷谷及文化、设计、工作室和住宿集群，它们分散存在。出发前选一两家确认接待的工作室、机构或公共空间，保存完整中文地址。不要只让司机送到“三宝”，期待一个完整步行景区。" },
  { id: "day-heading", type: "heading", level: 2, text: "按时代而不是热度排一天" },
  { id: "day", type: "table", caption: "一日顺序", columns: ["时段", "问题", "删减"], rows: [["陶阳里/御窑", "宫廷生产如何塑造老城，今天如何呈现考古？", "一条馆址路线加有限里弄"], ["换乘与午餐", "真实城市交通下片区相隔多远？", "无预约不要插远端工作室"], ["陶溪川", "现代瓷厂如何成为当代创意基础设施？", "一条工业/画廊线，集市只是加分"], ["晚间", "当天节目是否增加真正不同层？", "未核实或只重复购物就离开"]] },
  { id: "two-day", type: "comparison", title: "有第二天时", columns: [{ heading: "工作室与创作者", body: "用确认预约、三宝或另一生产群，留谈话时间；拍人、工艺与设计前先获同意。" }, { heading: "博物馆与考古深度", body: "重回御窑解释，加一座互补收藏，按材料、烧成与用途读瓷。" }, { heading: "有证据的购物", body: "为具体工艺选创作者/市场，问作者、烧制与包装；价格不证明年代和真伪。" }] },
  { id: "buying", type: "callout", title: "漂亮不等于古董、本地或手工", tone: "warning", body: "询问谁制作、哪里烧制、使用贴花还是手绘以及如何包装。出口或文物建议不能只听销售话术。本页不鉴定器物、不排名卖家，也不保证工作室接待散客。" },
  { id: "failure", type: "table", caption: "失败与恢复", columns: ["问题", "处理"], rows: [["博物馆或集市关闭", "保住片区空间故事，选一处官方替代，不绕锁门"], ["三宝地图点太模糊", "停止，联系具体场所并用准确地址；无确认就回城"], ["下雨", "保住室内博物馆/工业遗产，工作室只有确认才去"], ["购物吃掉路线", "设置购买时段并回到历史问题"], ["“古董”说法冲突", "不要在催促下购买，寻求独立专业证据"]] },
  { id: "boundary", type: "callout", title: "与御窑文章的canonical边界", tone: "neutral", body: "本页拥有陶阳里/御窑、陶溪川和三宝的空间选择；独立御窑文章拥有考古、博物馆解释和深入读址。两页都不会为每个市场、巷子或工作室建薄页。" },
  { id: "links", type: "internal-links", title: "继续陶瓷路线", items: [{ label: "中国高铁新手指南", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "先处理铁路抵达再选片区。" }, { label: "夜车还是白天高铁", href: "/zh/guides/china-night-train-or-daytime-high-speed-rail/", description: "选择能保住景德镇首个可用白天的换乘方式。" }, { label: "开口航班路线规划", href: "/zh/guides/china-open-jaw-flights-route-planning/", description: "避免为了往返同一城市挤压陶瓷城市停留。" }, { label: "中国公共假期", href: "/zh/guides/china-public-holidays-travel-calendar/", description: "一日路线依赖场馆前先检查闭馆与客流压力。" }, { label: "行程是不是太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "测试乡村工作室日是否容得下。" }] },
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [{ label: "陶阳里御窑景区", url: "https://www.jdz.gov.cn/zjcd/mljdz/sj/t932856.shtml", publisher: "景德镇市人民政府", reviewedAt: "2026-08-22" }, { label: "陶溪川文创街区", url: "https://www.jdz.gov.cn/zjcd/mljdz/sj/t932854.shtml", publisher: "景德镇市人民政府", reviewedAt: "2026-08-22" }, { label: "三宝与城市陶瓷片区", url: "https://jdz.gov.cn/zwzx/jrcd/t1092010.shtml", publisher: "景德镇市人民政府", reviewedAt: "2026-08-22" }, { label: "头图：Zhu Pei拍摄御窑博物馆，CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:01-Jingdezhen_Imperial_Kiln_Museum.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }] }
] } as const satisfies StructuredPageBody;
export default body;
