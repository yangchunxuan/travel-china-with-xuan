import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "中国高速列车不是把一只做好的车壳放到轮子上就算完成。大型铝合金型材先组成车顶、侧墙和底架，经受控焊接与尺寸检验形成车体；随后安装转向架、牵引、制动、控制、车门、线缆和内装系统，再依次完成部件、单车、实验室和线路层面的调试与试验。具体顺序和试验项目取决于车型平台及验收标准。"},
  {id: "production-chain", type: "table", caption: "从材料到验收列车", columns: ["阶段", "主要工作", "需要证明什么"], rows: [
    ["型材与板件", "准备并加工铝合金结构件。", "材料身份和尺寸符合要求。"], ["车体焊接", "用合格工艺连接侧墙、车顶、底架和端墙。", "几何尺寸、焊缝质量和变形受控。"], ["车体完工", "检查接缝、防腐、接口与排水密封。", "获得尺寸稳定、结构完整的车体。"], ["系统集成", "安装转向架、制动、牵引、电气、控制、车门和内装。", "各接口能作为整车协同工作。"], ["静态调试", "列车不运行时上电、通信并操纵各系统。", "功能与故障保护能正确响应。"], ["动态验证", "在实验室、试验线和经批准铁路上完成规定试验。", "走行、制动、受流、信号等结果满足适用方案。"]
  ]},
  {id: "aluminium", type: "heading", level: 2, text: "为什么车体从大型铝合金结构开始"},
  {id: "aluminium-copy", type: "paragraph", text: "高速车辆需要轻、刚度足且能稳定重复制造的结构。长大铝合金挤压型材可让侧墙、车顶或地板的一大部分由较少零件组成。不同接头和工厂可能采用搅拌摩擦焊、弧焊或激光相关工艺。难点并非只把焊缝焊上：热输入、夹紧方式和焊接顺序都会影响变形、残余应力以及后续装配。"},
  {id: "quality-gates", type: "comparison", title: "两类质量关口", columns: [
    {heading: "先把车体做准确", items: ["测量长宽、对角线和接口位置。", "按规定方法检验焊缝。", "在后续遮挡前检查密封和结构要求。"]}, {heading: "再让系统协同工作", items: ["验证供电、数据网络、车门、制动与报警。", "确认转向架与车体接口。", "测试正常指令、保护逻辑和规定故障工况。"]}
  ]},
  {id: "test-pyramid", type: "heading", level: 2, text: "试验轨道只是证据链的一层"},
  {id: "test-details", type: "paragraph", text: "国家铁道试验中心把实验室与 61.1 公里环形试验线结合起来，整车试验规范和项目验收方案规定需要测量的内容。试验列车也可在受控许可下进入运营线路或专用线路。于是，一段高速运行视频不能证明所有子系统、场景和运营条件都已通过；验收是一套完整证据，而不是一个速度标题。"},
  {id: "what-footage-means", type: "table", caption: "怎么看常见工厂和试验画面", columns: ["画面", "可能所处阶段", "不能直接推断"], rows: [
    ["银色裸车体", "车体制造或检验。", "牵引和乘客系统已经安装。"], ["完成外观但架在临时支撑上的车辆", "系统安装或静态调试。", "已经获准上线运营。"], ["列车在环线上运行", "某项规定的动态试验。", "画面速度就是商业运营速度。"], ["展会上的样车", "研究或工程车辆确实存在。", "已有车票或客运线路。"]
  ]},
  {id: "traveller-scenarios", type: "comparison", title: "制造流程能回答的两个旅客问题", columns: [
    {heading: "“新车型为什么要等这么久？”", body: "车体完成只是里程碑之一。系统集成、故障排查、重复试验、文件和监管验收仍在客运之前。"}, {heading: "“600 公里时速的报道就是我下一班车吗？”", body: "不是。样车下线或试验结果不等于售票运营，应核对实际铁路运营方和时刻表，不能把研究速度变成旅行承诺。"}
  ]},
  {id: "maglev-fact-check", type: "callout", title: "中国 600 公里时速磁悬浮能订票吗？不能。", body: "截至 2026 年 8 月 13 日，官方材料描述的是科研、样车、试验线和工程示范，不是面向公众的 600 公里时速客运时刻表，也没有对应线路与车票库存。新闻可能指不同车辆：中车四方常导系统于 2021 年在青岛下线，之后展出的还包括超导电动悬浮原型车；两者都不是已经售票的上海机场磁悬浮。只有运营方、商业线路和官方售票渠道同时存在，才应发布订票方法。", tone: "warning"},
  {id: "limits", type: "callout", title: "事实边界", body: "本文只解释制造与验证，不是乘车指南、工厂参观承诺，也不声称每款中国列车采用完全相同流程。工厂开放、供应商细节、试验方案和验收状态均因项目而异。资料核验于 2026 年 8 月 13 日。", tone: "warning"},
  {id: "internal-links", type: "internal-links", title: "从工程知识转到实际旅程", items: [
    {label: "第一次乘中国高铁指南", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "购票、车站与乘车流程请看已发布乘客指南。"}, {label: "夜间列车还是白天高铁", href: "/zh/guides/china-night-train-or-daytime-high-speed-rail/", description: "按旅行日代价选择，而不是只看车辆技术。"}, {label: "高铁站为什么可能远离老城", href: "/zh/guides/why-china-high-speed-stations-are-far-away/", description: "了解站址背后的规划机制。"}
  ]},
  {id: "sources", type: "sources", title: "一手与技术来源", items: [
    {label: "600 公里时速磁悬浮工程与示范路径", url: "https://www.ncsti.gov.cn/kjdt/kjrd/202603/t20260327_242172.html", publisher: "国家科技创新中心", reviewedAt: "2026-08-13"},
    {label: "600 公里时速磁悬浮系统下线", url: "https://crrcgc.cc/crrcgc/2024-09/24/article_2024092413441231508.html", publisher: "中国中车", reviewedAt: "2026-08-13"},
    {label: "高速列车制造基地与能力", url: "https://www.crrcgc.cc/sfgf/36_2205/36_2206/index.html", publisher: "中国中车", reviewedAt: "2026-08-13"}, {label: "动车组整车试验规范", url: "https://www.nra.gov.cn/xxgk/gkml/ztjg/gfzd/gfxw/202204/t20220405_289315.shtml", publisher: "国家铁路局", reviewedAt: "2026-08-13"}, {label: "国家铁道试验中心设施", url: "https://www.rails.cn/channel.php?channelid=202&page=1", publisher: "中国铁道科学研究院", reviewedAt: "2026-08-13"}, {label: "铝合金车体焊接变形研究", url: "https://umt1998.tongji.edu.cn/article/doi/10.16037/j.1007-869x.2025.02.030", publisher: "城市轨道交通研究", reviewedAt: "2026-08-13"}, {label: "高速列车铝合金焊缝残余应力研究", url: "https://xnjdxb.swjtu.edu.cn/en/article/doi/10.3969/j.issn.0258-2724.2012.04.013", publisher: "西南交通大学学报", reviewedAt: "2026-08-13"}
  ]}
]};
export default body;
