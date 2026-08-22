import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "厦门本岛和鼓浪屿隔海相望，却不是一条连续古城步行线。厦门是正在运转的海滨城市，有街区饮食、寺院和长海岸；鼓浪屿是步行岛，价值在街巷、园林、音乐史和混合建筑。轮渡是两种体验之间有时间门槛的交接。" },
  { id: "answer", type: "callout", title: "直接结论", tone: "decision", body: "第一次只有一天，若官方游客轮渡已确认，把上午和午后前段给鼓浪屿；留够余量返回本岛，再选一个紧凑晚间区域——例如中山路/老港一带或一个独立海岸点。若轮渡未落实，不要全天追票：做好厦门城市日，把鼓浪屿移到别的日期。" },
  { id: "two-places-heading", type: "heading", level: 2, text: "让两处各承担一个任务" },
  { id: "two-places", type: "table", caption: "两次游览，不是一张清单", columns: ["地点", "保住", "不要强塞"], rows: [["鼓浪屿", "慢街巷、一处建筑/园林锚点和观察混合城市肌理的时间", "收费景点、最高点、海滩和小吃街全部一圈"], ["厦门本岛", "一个街区或海岸故事、晚餐和稳妥回酒店", "南普陀、大学区、中山路、海滩和沿海村落同晚完成"], ["轮渡交接", "正确两端、护照订单、检票余量与天气备选", "本页复制时刻表或保证返程码头"]] },
  { id: "ferry-boundary", type: "callout", title: "运营链请使用独立轮渡指南", tone: "warning", body: "本页刻意不重复售票窗口、码头名、检票截止和护照流程。它们会变，且已有唯一canonical owner。先打开厦门轮渡官方渠道和Homeground码头指南，理解去回框架后再回本页安排体验。" },
  { id: "gulangyu-heading", type: "heading", level: 2, text: "在鼓浪屿，先选主题再选路" },
  { id: "gulangyu", type: "comparison", title: "三种诚实的岛上游览", columns: [{ heading: "建筑与街巷", body: "沿一组相连历史街道和建筑，观察闽南、古典复兴、外廊殖民式和厦门装饰风格，最接近世界遗产核心。" }, { heading: "园林与视点", body: "选择一座园林、高点或海岸视点，再加附近街道；按当天门票、排队和天气决定。" }, { heading: "慢岛氛围", body: "离开最拥挤商业街，听音乐或坐庭院，接受少看命名景点，适合过夜或重游。" }] },
  { id: "heritage", type: "paragraph", text: "UNESCO把鼓浪屿描述为中外交流留下的历史国际社区，其城市肌理融合闽南传统、西方古典复兴、外廊式和厦门装饰风格。这种价值分布在街网中；只在最热门地图点间奔跑，反而可能错过让岛屿成立的空间关系。" },
  { id: "xiamen-heading", type: "heading", level: 2, text: "轮渡后只选一个厦门结尾" },
  { id: "xiamen", type: "table", caption: "晚间结尾", columns: ["结尾", "为什么选", "边界"], rows: [["老港/中山路一带", "地理上接近面对鼓浪屿的一侧，并加入饮食街巷", "不能保证每家老店或摊位固定营业"], ["一个海岸段", "用开放海岸对比密集步行岛", "只选一个合法入口，环岛路很长"], ["酒店附近吃饭休息", "适合炎热、轮渡延误、行李或长走之后", "休息是成功取舍，不是失败"]] },
  { id: "day-heading", type: "heading", level: 2, text: "现实的一日顺序" },
  { id: "day", type: "list", ordered: true, items: ["确认具体去程、两端码头、护照订单和返程框架。", "按运营方当前要求提前到达，不与紧张航班火车相连。", "鼓浪屿完成一个主题和一个弹性第二层。", "中午决定第二个岛上锚点是否仍保护返程。", "带天气和后续交通余量回到本岛。", "用一个紧凑市区、晚餐和简单回酒店收尾。"] },
  { id: "cut", type: "callout", title: "先删第二个本岛片区，不能删轮渡余量", tone: "decision", body: "岛上延误时，删掉海滩、寺院、大学区或第二市场。不要为赶进度选择未核实码头、拖行李奔跑，或把最晚返程贴着火车航班。轮渡是不可逆交接，本岛夜晚才是弹性层。" },
  { id: "who", type: "table", caption: "按同行者调整", columns: ["同行者", "更好方案"], rows: [["大行李", "核实寄存或保留本岛基地；岛上步行和台阶真实存在"], ["长者/步行有限", "一个短街区、坐下休息和早返回，逐处核对台阶"], ["儿童", "保住吃饭、厕所和遮阴，天气允许时用园林/海边作对比"], ["晚到", "留在本岛，把鼓浪屿移到完整上午"]] },
  { id: "failure", type: "table", caption: "恢复方案", columns: ["问题", "处理"], rows: [["无确认游客船票", "停止把鼓浪屿当作当天任务，改做厦门城市线"], ["码头地图点错误", "下车前与官方订单的完整中文码头名核对"], ["天气中断", "服从厦门轮渡公告，必要时留在本岛"], ["岛上步行超时", "删第二个收费景点并带余量返回"], ["返程调整", "按运营方当天指令，不能推断永久本岛码头"]] },
  { id: "overnight", type: "paragraph", text: "过夜会改变选择：早晚街道可能比日游客流更有层次，但增加行李、步行末段和轮渡依赖。只有岛上价值会重复时才住，不为增加一个酒店而住。厦门住宿区域指南负责更广的本岛与岛上基地选择。" },
  { id: "links", type: "internal-links", title: "继续规划厦门", items: [{ label: "厦门枢纽到鼓浪屿轮渡", href: "/zh/guides/xiamen-hubs-to-gulangyu-ferry-terminal/", description: "执行护照、码头与轮渡交接。" }, { label: "厦门住哪里", href: "/zh/guides/xiamen-where-to-stay-zhongshan-gulangyu-zengcuoan/", description: "比较中山路、鼓浪屿和曾厝垵。" }, { label: "放射式还是多基地路线", href: "/zh/guides/china-hub-and-spoke-or-multi-base-route/", description: "判断厦门应成为真实基地，还是被压缩的中途站。" }, { label: "中国公共假期", href: "/zh/guides/china-public-holidays-travel-calendar/", description: "上岛前检查高峰压力。" }, { label: "行程是不是太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "诚实计算轮渡与步行摩擦。" }] },
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [{ label: "鼓浪屿世界遗产说明", url: "https://whc.unesco.org/en/list/1541/", publisher: "联合国教科文组织世界遗产中心", reviewedAt: "2026-08-22" }, { label: "当前游客购票与护照FAQ", url: "https://xmferry.com/wybm/wshlk/wlgpp/index.htm", publisher: "厦门轮渡有限公司", reviewedAt: "2026-08-22" }, { label: "当前检票与返程FAQ", url: "https://xmferry.com/wybm/wshlk/chch/index.htm", publisher: "厦门轮渡有限公司", reviewedAt: "2026-08-22" }, { label: "头图：Slyronit从厦门拍摄鼓浪屿，CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Gulangyu_Island_from_Zhongshan_Road,_Xiamen.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }] }
] } as const satisfies StructuredPageBody;
export default body;
