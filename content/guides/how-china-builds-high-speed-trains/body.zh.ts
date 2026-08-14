import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "本文跟随的是一条具有代表性的中国铝合金车体高速动车组生产链，不是所有列车的统一配方。在这条生产链中，大型铝合金型材先变成车顶、侧墙和底架结构，经受控焊接与尺寸检验组成车体；随后集成转向架、牵引、制动、控制、车门、线缆和内装，再完成多层调试与试验。其他车型平台、材料和工序顺序可能不同。"},
  {id: "production-chain", type: "table", caption: "代表性铝合金车体列车：从材料到验证", columns: ["阶段", "主要工作", "必须证明什么"], rows: [
    ["型材与板件", "准备并加工铝合金结构件。", "材料标识和尺寸符合要求。"],
    ["车体焊接", "用合格工艺连接侧墙、车顶、底架和端墙。", "几何尺寸、焊缝质量与变形受控。"],
    ["车体完工", "检查接缝、防腐、接口和水密路径。", "车体结构完整，尺寸受到控制。"],
    ["系统集成", "安装转向架、制动、牵引、电气、控制、车门和内装系统。", "所有接口能作为一辆完整车辆协同工作。"],
    ["静态调试", "列车静止时上电、建立通信并操纵各系统。", "各项功能和故障保护能正确响应。"],
    ["动态验证", "按方案在实验室、试验轨道和经批准的铁路线路上测试。", "走行、制动、受流、信号等验收结果满足适用要求。"]
  ]},
  {id: "aluminium", type: "heading", level: 2, text: "为什么这条代表性车体流程从大型铝合金结构开始"},
  {id: "aluminium-copy", type: "paragraph", text: "对许多采用铝合金车体的高速车辆而言，长大铝合金挤压型材可以用较少零件形成侧墙、车顶或地板的大面积结构，同时满足轻量、刚度和稳定重复制造的要求。不同接头和工厂可能采用搅拌摩擦焊、弧焊或激光相关工艺；热输入、夹紧方式和焊接顺序都会影响变形、残余应力及最终装配精度。这不代表所有中国列车平台都使用铝合金或完全相同的焊接顺序。"},
  {id: "quality-gates", type: "comparison", title: "两类质量关口", columns: [
    {heading: "车体本身必须准确", items: ["测量长宽、对角线和各接口位置。", "按规定方法检查焊缝。", "在后续部件遮挡之前检查密封和结构要求。"]},
    {heading: "各系统必须协同工作", items: ["验证供电与数据网络、车门、制动和报警。", "确认转向架与车体接口。", "测试正常指令、保护逻辑和规定的故障工况。"]}
  ]},
  {id: "test-pyramid", type: "heading", level: 2, text: "试验轨道只是证据链的一层"},
  {id: "test-details", type: "paragraph", text: "国家铁道试验中心结合实验室与专用轨道试验。本文引用的一份 2008 年整车试验规范只能说明历史上规定测量项目的广度，不能当作 2026 年现行验收法律依据；每个平台仍须确认适用的现行标准和具体项目验收方案。因此，一段高速运行画面不能证明所有子系统、场景和运营条件均已通过，验收依赖整套证据，而不是一个速度标题。"},
  {id: "what-footage-means", type: "table", caption: "怎样读懂常见的工厂和试验画面", columns: ["画面", "可能所处阶段", "不能据此认定"], rows: [
    ["银色裸车体", "车体制造或检验。", "牵引和乘客系统已经安装。"],
    ["完整车辆放在临时支撑上", "系统安装或静态调试。", "已经获准上线运营。"],
    ["列车在环形轨道上运行", "某一项规定的动态试验。", "画面中的速度就是商业运营速度。"],
    ["展会上的原型车", "研究或工程车辆实体已经存在。", "已有公众客运线路或车票。"]
  ]},
  {id: "traveller-scenarios", type: "table", caption: "新闻标题常把四个里程碑混成一件事", columns: ["里程碑", "它能证明什么", "它不能证明什么"], rows: [
    ["车体完成", "主体结构车壳已制造，并通过这一阶段的检查。", "已经是一辆完整、可载客的动力车辆。"],
    ["整列车下线", "实体列车达到一个工厂里程碑。", "已通过监管验收或已有公众开行日期。"],
    ["完成一次试验运行", "在说明的条件下取得了规定测量结果。", "所有试验都已通过，或该速度会用于商业运营。"],
    ["开始商业运营", "具名运营方按照正式时刻表和售票渠道运营具名线路。", "每趟车都使用全部研究功能或最高试验速度。"]
  ]},
  {id: "why-tests-repeat", type: "paragraph", text: "试验需要反复进行，因为列车是彼此耦合的系统。车门、制动控制器或软件的一项改动，可能影响其他接口；动态试验发现的问题也会让列车返回调整，再按规定重新测试。工厂完工、工程验证，以及获准或验收用于载客，是不同的里程碑，并非一次“下线仪式”就能同时完成。"},
  {id: "maglev-fact-check", type: "callout", title: "误区核对：600 公里时速磁悬浮目前不是可订票服务", body: "截至 2026 年 8 月 13 日，官方资料描述的是研究、工程车辆和未来示范路径，并未给出具名公众线路、时刻表或票务产品。不要把这些项目与已经商业运营的上海机场磁悬浮混为一谈。", tone: "warning"},
  {id: "limits", type: "callout", title: "本文的事实边界", body: "这是一篇制造与验证流程说明，不是乘车指南、工厂参观承诺，也不声称每一种中国列车都采用完全相同的工艺。工厂开放、供应商细节、试验计划和验收状态均因项目而异。资料核验于 2026 年 8 月 13 日。", tone: "warning"},
  {id: "help", type: "callout", title: "一则技术新闻会不会影响你的行程？", body: "把报道、发布日期和你计划乘坐的线路发给 Homeground。我们可以先分清它说的是零部件、原型车、试验车辆还是商业运营，以免误改行程；实时列车和票务仍须由具名运营方确认。", tone: "neutral"},
  {id: "internal-links", type: "internal-links", title: "从工程知识回到真实旅程", items: [
    {label: "第一次乘中国高铁指南", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "购票、车站与乘车流程请使用已发布的乘客指南。"},
    {label: "夜间列车还是白天高铁", href: "/zh/guides/china-night-train-or-daytime-high-speed-rail/", description: "比较整个旅行日的得失，而不是只看车辆技术。"},
    {label: "高铁站为什么可能远离老城", href: "/zh/guides/why-china-high-speed-stations-are-far-away/", description: "理解车站选址背后的规划机制。"},
    { label: "把青岛轨道制造与其他产业放在一起比较", href: "/zh/guides/qingdao-brands-built-an-industrial-city/", description: "用同一证据边界核验工厂、企业博物馆和公共观察点；工业遗产展陈不证明当前生产。" },
    { label: "把洋山读成一套自动化运输系统", href: "/zh/guides/yangshan-automated-port-explained/", description: "把规划、控制、机器运动和人的工作与轨道制造对照，同时让准入和运营结论保持在具体场所范围内。" }
  ]},
  {id: "sources", type: "sources", title: "一手与技术来源", items: [
    {label: "600 公里时速磁悬浮工程与示范路径", url: "https://www.ncsti.gov.cn/kjdt/kjrd/202603/t20260327_242172.html", publisher: "国家科技创新中心", reviewedAt: "2026-08-13"},
    {label: "600 公里时速磁悬浮系统下线", url: "https://crrcgc.cc/crrcgc/2024-09/24/article_2024092413441231508.html", publisher: "中国中车", reviewedAt: "2026-08-13"},
    {label: "上海机场磁悬浮当前商业运营信息", url: "https://english.shanghai.gov.cn/en-Transportation/20240102/44f499a17b324b25996f2d58fcbf5f23.html", publisher: "上海市人民政府", reviewedAt: "2026-08-13"},
    {label: "超导工程样车及商业化边界", url: "https://jtj.wuhan.gov.cn/jtzx/zwdt/202507/t20250714_2619883.shtml", publisher: "武汉市交通运输局", reviewedAt: "2026-08-13"},
    {label: "高速列车制造基地与制造能力", url: "https://www.crrcgc.cc/sfgf/36_2205/36_2206/index.html", publisher: "中国中车", reviewedAt: "2026-08-13"},
    {label: "历史整车试验规范（2008 年）", url: "https://www.nra.gov.cn/xxgk/gkml/ztjg/gfzd/gfxw/202204/t20220405_289315.shtml", publisher: "国家铁路局", reviewedAt: "2026-08-13"},
    {label: "国家铁道试验中心设施", url: "https://www.rails.cn/channel.php?channelid=202&page=1", publisher: "中国铁道科学研究院", reviewedAt: "2026-08-13"},
    {label: "铝合金车体焊接变形研究", url: "https://umt1998.tongji.edu.cn/article/doi/10.16037/j.1007-869x.2025.02.030", publisher: "城市轨道交通研究", reviewedAt: "2026-08-13"},
    {label: "高速列车铝合金焊缝残余应力研究", url: "https://xnjdxb.swjtu.edu.cn/en/article/doi/10.3969/j.issn.0258-2724.2012.04.013", publisher: "西南交通大学学报", reviewedAt: "2026-08-13"},
    {label: "封面照片：N509FZ 于 2019 年 10 月 3 日拍摄的中车青岛四方 CRH6 列车车体转运（已裁切）", url: "https://commons.wikimedia.org/wiki/File:Truck_transporting_CRH6_at_CRRC_Qingdao_Sifang_(20191003131702).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13"},
    {label: "裁切后封面照片的 CC BY-SA 4.0 许可证", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
