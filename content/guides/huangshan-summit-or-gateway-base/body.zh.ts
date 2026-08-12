import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "“黄山”可能指山顶酒店、南大门换乘中心旁的汤口、景区温泉区，或屯溪／铁路所在的城市基地。它们完成不同任务。应按第二天最先要到的入口，以及之后必须保护的火车、航班或休息时间来选择这一晚。" },
  { id: "answer", type: "callout", title: "先给结论", tone: "decision", body: "只有日出日落位置和把登山拆成两段，值得承担有限房量、较高价格、天气不确定与轻装上山时，才住山顶；南大门前后实用的一晚住汤口；明确想在景区内温泉区休息且当前内部交通已确认，才住温泉区；晚班铁路抵达、早班后续列车或屯溪夜晚住黄山市区，但不能把市区当山门。" },
  { id: "boundary", type: "paragraph", text: "本文选择住宿基地，不规划登山路线，也不做酒店排名；不会承诺日出可见、索道运行或固定换乘时间。先按景区现时公告确定开放入口和路线，再使用本文选择住宿。" },
  { id: "matrix", type: "table", caption: "四个基地完成四件事", columns: ["基地", "最佳任务", "代价", "核验"], rows: [["山顶", "日出日落位置与拆分山路", "房量少、天气、携带必需品、灵活性低", "营业酒店、准确路线、索道／步道和餐食"], ["汤口／南大门", "进山前后高效换乘夜", "不适合为了城市夜生活久住", "距换乘中心、接送和寄存"], ["温泉区", "有意安排景区内休息", "多一段内部接驳", "当前车辆、营业物业和后续连接"], ["黄山市区／屯溪", "铁路缓冲、机场／城市事务和屯溪夜晚", "进山前仍需道路换乘", "准确车站、次日出发和山门"]] },
  { id: "pattern", type: "table", caption: "按游山方式选择", columns: ["计划", "最佳起点", "原因"], rows: [["从南大门一日完整游山", "前一晚汤口", "保护景区首班接驳，又不必支付山顶房"], ["两段游山，日出日落优先", "路线与房间确认后住山顶", "无需两段之间下山"], ["晚到黄山北站或其他具名车站", "城市／铁路可达基地或已确认晚间接驳", "不能假设深夜仍能到山门"], ["游山后赶早班后续列车", "下山住进准确铁路链", "隔离天气和景区交通对离开的影响"], ["老人或步行能力不确定", "汤口，或核实准确路线后选无障碍景区酒店", "山顶房并不能消除台阶与山路"]] },
  { id: "summit", type: "heading", level: 2, text: "山顶一晚买到的是位置，不是日出" },
  { id: "summit-copy", type: "paragraph", text: "山顶住宿能免去当天下山，也能让你在一日客流前就在山中；但无法控制云、雨、风和能见度。即使看不到日出，这条路线仍有价值，才应预订。问酒店从当前开放的哪条步道、索道／步行组合进入，还要走多久，早晚餐如何解决，以及天气或运营通知改变进路时怎么办。" },
  { id: "luggage", type: "heading", level: 2, text: "进入景区前先拆分行李" },
  { id: "luggage-copy", type: "paragraph", text: "只带山顶一晚必需品、药物、防雨保暖、电源和贵重物品。书面确认大箱放哪里、何时能取，不要假设门户酒店会为不连续订单寄存。下一班火车证件和关键药品必须随身。索道能减少爬升，但不会把整个换乘变成下客到房间。" },
  { id: "tangkou", type: "heading", level: 2, text: "汤口是换乘基地，应按交接效率评价" },
  { id: "tangkou-copy", type: "paragraph", text: "黄山官方资料列出南大门换乘体系及温泉、慈光阁、云谷寺等后续节点。汤口酒店只有在缩短酒店到换乘中心的链条时才有价值。问带行李能否步行、物业是否合规接送、早餐从几点开始、退房后如何寄存。“靠近黄山”范围太大，不能用于预订。" },
  { id: "hotspring", type: "heading", level: 2, text: "温泉区是有意安排的住宿，不是另一个汤口名称" },
  { id: "hotspring-copy", type: "paragraph", text: "温泉区处在景区内部交通逻辑中，适合慢一点的景区住宿，但会增加一段必须与当前车辆、物业入口和路线配合的交接。确认物业是否营业、带行李如何进入、怎样到计划中的步道／索道，以及末班内部交通结束后怎么办。不能只因地图点位看着更靠近山峰就订。" },
  { id: "city", type: "heading", level: 2, text: "黄山市区和屯溪保护铁路与城市时间" },
  { id: "city-copy", type: "paragraph", text: "屯溪夜晚、晚班抵达、早班后续列车或下山恢复，适合城市基地；它不是汤口的同义词。按票面搜索完整车站，并把道路接驳接到所选入口。晚到必须书面确认最后接驳，否则住进铁路链，第二天早上再进山。" },
  { id: "weather", type: "callout", title: "不要把脆弱环节压成一条链", tone: "warning", body: "不要无缓冲叠加晚班火车、未核实道路接驳、景区换乘、索道和长距离上山。即使城际列车准时，天气和运营通知也会改变山中部分。把住宿放在不确定性的正确一侧，保护游山早晨或后续列车。" },
  { id: "mobility", type: "heading", level: 2, text: "有索道不等于无障碍" },
  { id: "mobility-copy", type: "paragraph", text: "每个基地都要核对完整路线：车辆换乘、排队、索道轿厢进入、石阶、坡度和到客房步行。向景区和物业询问这个旅客走的具体线路，不要只问“黄山有没有缆车”。家庭还要在疲劳变成安全问题前确认儿童抱行、厕所、餐食和折返点。" },
  { id: "verify", type: "list", items: ["使用哪座具名景区入口和换乘中心？", "计划路线预计开放哪条索道或步道？", "从交通下客点到实际酒店入口还要走多远？", "大件行李存在哪里、什么时段能取？", "山顶夜的晚餐、早餐和饮水是否确认？", "天气／关闭备用是什么，哪一班后续火车绝不能冒险？"] },
  { id: "failure", type: "table", caption: "条件变化时怎么做", columns: ["变化", "立即决定", "更安全备选"], rows: [["山顶能见度预报变差", "只有拆分路线仍有价值才保留房间", "汤口基地加一日路线"], ["索道或区段关闭", "按官方通知重画路线", "不要超出能力自行发明步道替代"], ["晚到错过已确认接驳", "住有人值守的铁路／城市物业", "次日从已核实入口进入"], ["旅客提前疲劳", "使用预先约定折返点", "不要只为山顶订单勉强继续"], ["下山延误", "联系后续酒店／交通", "牺牲灵活城市安排，不牺牲固定车次／航班"]] },
  { id: "registration", type: "paragraph", text: "无论山顶、门户还是市区，都应确认护照入住流程和实际前台时段。位置偏远不会取消正常住宿登记义务。" },
  { id: "dynamic", type: "paragraph", text: "黄山风景区管委会服务、换乘与住宿资料复核于2026年8月12日。开放区、索道、车辆和物业会因检修与天气变化；出发前须查看官方现时公告，实时通知优先于本文框架。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [{ label: "民宿、homestay还是酒店", href: "/zh/guides/minsu-homestay-or-hotel-china/", description: "核验山门物业服务与登记。" }, { label: "中国平季旅行值不值", href: "/zh/guides/china-shoulder-season-value-tradeoff/", description: "保护受天气影响的游山体验。" }, { label: "中国全铁路行程规划", href: "/zh/guides/china-rail-only-route/", description: "判断道路最后一程是否破坏铁路计划。" }] },
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [{ label: "黄山风景区管委会", url: "https://hsgwh.huangshan.gov.cn/", publisher: "黄山风景区管理委员会", reviewedAt: "2026-08-12" }, { label: "景区换乘官方信息", url: "https://hsgwh.huangshan.gov.cn/lyfw/lyfw/jqhc/9197913.html", publisher: "黄山风景区管理委员会", reviewedAt: "2026-08-12" }, { label: "住宿与禁止露营官方问答", url: "https://hsgwh.huangshan.gov.cn/zwgk/public/6617641/11062588.html", publisher: "黄山风景区管理委员会", reviewedAt: "2026-08-12" }, { label: "首图：Politizer拍摄黄山日出，CC BY 3.0，已裁切转换", url: "https://commons.wikimedia.org/wiki/File:Huangshan_sunrise.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" }] }
] } as const satisfies StructuredPageBody;
export default body;
