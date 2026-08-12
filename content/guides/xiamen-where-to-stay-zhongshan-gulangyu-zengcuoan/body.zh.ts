import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "住鼓浪屿不只是住得更靠近厦门最知名景点，而是增加轮渡和行李交接，换取一日游客高峰前后的岛上时间。中山路让行程留在本岛，曾厝垵则把基地移向东南海岸。应选择交接方式与真实夜晚，不要只选最好看的房源图。" },
  { id: "answer", type: "callout", title: "先给结论", tone: "decision", body: "首次混合旅行、希望本岛灵活和最简单进出，选中山路；安静的岛上早晚值得预订正确轮渡、轻装步行并接受车辆受限，可在鼓浪屿住一晚；多次安排海岸散步和慢节奏街区，选曾厝垵；如果每天都从铁路枢纽、轮渡码头或岛的另一端开始，就不要住曾厝垵。" },
  { id: "boundary", type: "paragraph", text: "本文只在三个住宿基地中选择，不提供永久轮渡时刻、不排名酒店，也不把“靠海”自动理解成可游泳沙滩或海景房。轮渡码头和航线会变，旅行当天以厦门轮渡／港口官方渠道为准。" },
  { id: "matrix", type: "table", caption: "三个基地对应三种交接", columns: ["基地", "获得", "接受", "核验"], rows: [["中山路一带", "本岛中心夜晚和灵活城市日", "不是岛上或度假村住宿", "准确游客码头、道路入口和车站路线"], ["鼓浪屿过夜", "一日客流前后岛屿时间和慢游", "轮渡、步行、行李与天气", "出发码头、航班、岛上码头、台阶和酒店路线"], ["曾厝垵／东南海岸", "海岸散步和社区式住宿", "去部分枢纽和轮渡更久", "道路下客、实际海岸进入与重复日程"]] },
  { id: "trip-fit", type: "table", caption: "让重复的日子选择", columns: ["行程模式", "先测试", "原因"], rows: [["首次厦门、两至四晚、景点混合", "中山路", "轮渡和城市日保持灵活"], ["鼓浪屿氛围是核心且行李轻", "鼓浪屿一晚", "避开最繁忙时段的岛上时间值得交接"], ["海岸骑行／步行与东南岛内多次", "曾厝垵", "街区成为多天的一部分"], ["岛上夜后赶早班机／火车", "最后一晚回本岛", "从离开日移除轮渡依赖"], ["老人、婴儿车或大箱", "本岛无障碍物业", "岛路和码头到房间需要更强证据"]] },
  { id: "ferry", type: "heading", level: 2, text: "轮渡就是酒店入住的一部分" },
  { id: "ferry-copy", type: "paragraph", text: "厦门港官方航线表区分游客与居民航线、多个本岛码头和鼓浪屿码头。不要照抄本地居民路线或旧时刻表。按日期使用官方渠道，准确填写每位旅客所需证件信息，并让本岛码头、岛上码头和酒店相互匹配。买到不合适的岛上码头，会变成长距离拖箱步行。" },
  { id: "ferry-steps", type: "list", ordered: true, items: ["按日期和旅客类型选择官方游客航线。", "使用到码头时携带的同一本有效护照／旅行证件预订。", "保存本岛出发码头和鼓浪屿到达码头的中文名，相似名称不能互换。", "询问酒店哪个码头适合其入口，带行李实际步行多久。", "为证件核验、登船和天气／运营变化留余量，以实时公告取代截图时刻。"] },
  { id: "gulangyu", type: "heading", level: 2, text: "岛上一晚必须改变你使用鼓浪屿的方式" },
  { id: "gulangyu-copy", type: "paragraph", text: "会有意使用清晨散步、较安静的夜间或把参观拆成两段，才应过夜。如果午后上岛、入住吃饭、第二天一早离开，轮渡和行李可能吃掉全部优势。准备一只岛上过夜包、码头到物业路线和天气备选；确认台阶、房间进入、早餐，以及轮渡延误后第一位联系人。" },
  { id: "luggage", type: "heading", level: 2, text: "买房间前先设计行李交接" },
  { id: "luggage-copy", type: "paragraph", text: "鼓浪屿靠步行移动，不像本岛酒店区那样车辆到门。厦门官方资料提到三丘田、内厝澳码头设行李揽收点并有岛内配送点，但当前可用时段、适用对象和送达范围仍需确认。不要依赖非正式搬运。可行时把大箱留在本岛，贵重物品随身，并询问岛上物业的合规协助。" },
  { id: "zhongshan", type: "heading", level: 2, text: "中山路：灵活的本岛基地" },
  { id: "zhongshan-copy", type: "paragraph", text: "中山路的优势是城市夜晚后可以向不同方向开始第二天，无需每天过水睡觉。但它不自动靠近白天游客使用的正确码头；航线会按时段和旅客类型区分。核对酒店道路入口、所选码头和铁路／机场接驳。即使在中心，步行街地址也可能增加拖箱路。" },
  { id: "zengcuoan", type: "heading", level: 2, text: "曾厝垵：选择海岸生活，不选择模糊“靠海”承诺" },
  { id: "zengcuoan-copy", type: "paragraph", text: "东南海岸、街区小路和慢夜晚反复出现，曾厝垵才合适。从大堂问清“靠海”的真实含义：过街、公共岸线、沙地进入和可否游泳是不同问题。检查道路拥堵、下客、房间噪音，以及去轮渡、火车站和早班交通的完整旅程。" },
  { id: "arrival", type: "heading", level: 2, text: "保护第一段和最后一段交通" },
  { id: "arrival-copy", type: "paragraph", text: "厦门站和厦门北站不是同一车站。使用票面全名、航站楼和实际抵达时刻。晚班航班或铁路后，除非有效轮渡和岛上入住都已留余量确认，否则住本岛；赶早班离开时，轮渡不确定会危及火车／航班，就在前一晚搬到道路可达的本岛酒店。" },
  { id: "mobility", type: "callout", title: "地图很短，也可能是困难的岛上步行", tone: "warning", body: "轮椅、婴儿车、膝痛或大箱旅客，要问清码头路面、坡度、台阶、门宽和电梯直到房间。交通有官方优待或协助政策，不等于每家岛上酒店无障碍。物业无法说明全路线，就住本岛，带日用小包游鼓浪屿。" },
  { id: "verify", type: "table", caption: "发给最终物业的问题", columns: ["问题", "可用回答包括"], rows: [["哪条轮渡？", "日期对应游客航线、本岛码头和岛上码头"], ["行李怎样到房间？", "路面、台阶、已确认服务和寄存"], ["晚到谁接？", "与预订航班对应的值班联系人"], ["“海岸”是什么意思？", "到公共岸线真实路线，不是地图标签"], ["如何早出？", "有运营余量的道路／轮渡方案"], ["每本护照能否入住？", "所报时段的具名物业流程"]] },
  { id: "failure", type: "table", caption: "交接改变时补救", columns: ["问题", "立即动作", "更稳方案"], rows: [["预订航班变化", "按官方公告并联系酒店", "保留可取消本岛抵达夜"], ["买错码头／航线", "不要仓促跨城，按官方渠道重排", "付款前匹配物业和码头"], ["天气扰乱岛上计划", "保护固定火车／航班", "改一日游或延后岛上夜"], ["行李路线比承诺难", "使用已确认官方／物业支持", "寄存大箱只带一晚"], ["早出没有安全轮渡链", "前一天搬回本岛", "不拿固定离开冒险"]] },
  { id: "registration", type: "paragraph", text: "岛上和本岛物业都要确认护照入住与前台时段。轮渡进入和历史环境不会代替正常住宿登记义务。" },
  { id: "dynamic", type: "paragraph", text: "厦门港与轮渡资料复核于2026年8月12日。航线、码头、班次、购票渠道和行李服务会因运营与天气变化；预订交通前及出发前立即重查官方渠道。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [{ label: "厦门枢纽到鼓浪屿码头", href: "/zh/guides/xiamen-hubs-to-gulangyu-ferry-terminal/", description: "连接车站／机场与轮渡完整交接。" }, { label: "民宿、homestay还是酒店", href: "/zh/guides/minsu-homestay-or-hotel-china/", description: "核验岛上物业运营和房间。" }, { label: "国际航班前中国最后一晚", href: "/zh/guides/china-last-night-before-international-flight/", description: "从岛上基地保护早班离开。" }] },
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [{ label: "厦门港水路客运官方航线表", url: "https://port.xm.gov.cn/75549/202508/t20250807_2949332.html", publisher: "厦门港口管理局", reviewedAt: "2026-08-12" }, { label: "厦门轮渡官方渠道", url: "https://www.xmferry.com/", publisher: "厦门轮渡有限公司", reviewedAt: "2026-08-12" }, { label: "鼓浪屿游客与行李服务官方指南", url: "https://www.xm.gov.cn/jdhy/rdhy/202407/t20240722_2879674.htm", publisher: "厦门市人民政府", reviewedAt: "2026-08-12" }, { label: "首图：Mx. Granger拍摄内厝澳厦门轮渡，CC0，已裁切转换", url: "https://commons.wikimedia.org/wiki/File:Xiamen_ferry.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" }] }
] } as const satisfies StructuredPageBody;
export default body;
