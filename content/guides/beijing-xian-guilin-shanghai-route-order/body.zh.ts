import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer", type: "lead",
      text: "只有在桂林—阳朔山水模块通过三道检验时，才值得把它加入路线：喀斯特与江河景观确实是本次旅行的重要目标；扣除前后两次长距离转场后，仍保有完整的体验时段；即使水上项目延误或取消，也不会危及国际航班。若从北京入境、上海离境，先检验北京 → 西安 → 桂林/阳朔 → 上海；国际门户相反时，就反转整条路线。如果必须把抵达和离开的零碎时间也算成游览日，这个模块就不该加入。",
    },
    {
      id: "three-gate-answer", type: "table", caption: "第四站只有通过全部检验，才算值得加入", columns: ["检验", "通过", "不通过"],
      rows: [
        ["独特价值", "桂林喀斯特与江河景观改变了这趟旅行的体验构成", "它只是夹在北京、西安、上海更重要目标之间的一张可选照片"],
        ["可用时段", "完成进入、落脚和离开衔接后，仍有一段受到保护的本地体验时间", "只剩一次深夜抵达、一个容易受影响的活动和一次清早离开"],
        ["可恢复离开", "运营变化只会牺牲一个灵活区块，不会波及国际航班", "路线依赖水上活动、道路转运和另一程航班在同一天全部顺利"],
      ],
    },
    {
      id: "scope-boundary", type: "callout", tone: "neutral", title: "这是一个宏观取舍，不是一份四城行程单",
      body: "本页只判断桂林/阳朔模块是否应该加入已经选定的北京—西安—上海主轴，以及它应放在哪一段。它不安排桂林、阳朔和龙脊的内部顺序，不替你选择具体江河产品或阳朔酒店，也不发布实时航班、车次、价格、耗时或逐日行程。",
    },
    { id: "module-heading", type: "heading", level: 2, text: "把桂林和阳朔视为一个区域模块，而不是第四个站名" },
    {
      id: "module-value", type: "paragraph",
      text: "这个增项的意义，在于它能改变整趟旅行的体验组合。UNESCO 将桂林喀斯特列为“中国南方喀斯特”系列遗产的一部分，特点包括峰林、峰丛与河流景观。北京和西安可以承载帝都、国家历史与考古主题，上海则可以承担当代都市、建筑或国际门户角色。当旅客确实追求这种山水反差时，桂林/阳朔才值得增加前后两次衔接。世界遗产身份能证明这里拥有独特景观，却不能证明每一次初访中国都必须加入它。",
    },
    {
      id: "role-comparison", type: "comparison", title: "问清楚：删掉一部分后，真正消失的是什么", columns: [
        { heading: "保留三城主轴", items: ["最重要的需求是历史、城市生活和已经确定的国际门户。", "删掉桂林，可以释放两次长距离转场和一条区域落脚链。", "即使没有自然景观模块，这趟旅行仍有完整而清楚的主题。"] },
        { heading: "加入山水模块", items: ["峰林、江河景观和节奏更慢的乡野观察，是本次旅行最重要的目标之一。", "删掉它，会让整趟旅程过度偏向城市或名胜古迹。", "旅客接受天气和水域运营情况可能改变所选体验。"] },
        { heading: "用替换，不要只追加", items: ["总行程无法同时保护新增模块和原有三城的核心角色。", "只考虑替换主题最弱、且不承担固定门户或固定预约的城市。", "诚实的答案是改成另一条三段式路线，而不是压缩出四个地名。"] },
      ],
    },
    { id: "tax-heading", type: "heading", level: 2, text: "先算区域转场成本，再计算山水体验" },
    {
      id: "tax-ledger", type: "table", caption: "这个模块由一整条依赖链构成", columns: ["环节", "必须明确的内容", "未知时的保守处理"],
      rows: [
        ["进入区域", "实际航班或列车、桂林区域的确切门户、行李和第一晚有人员接待的住宿", "按转场区块处理；不安排固定参观"],
        ["抵达体验地点", "酒店、码头、车站或合规道路接送点，以及当期产品方向", "不要把抵达车站算作江河或乡野体验"],
        ["移动或保留基地", "由桂林市区、阳朔县城、兴坪或另一处已核实住宿中的哪一个承担过夜", "把内部顺序交给对应页面，不预设必须换酒店"],
        ["运行山水区块", "明确漓江、遇龙河或陆地体验重点，并核实当前限制", "保留一个仍能证明该区域值得前往的替代方案"],
        ["离开区域", "确切车站或机场、行李衔接、下一城住宿与固定承诺", "在国际航班前保留有人员接待的城市缓冲"],
      ],
    },
    {
      id: "guilin-station-figure", type: "figure", src: "/images/guides/guilin-airport-or-railway-station-arrival-guide/hero-1600.webp", width: 1600, height: 1000,
      alt: "桂林站站房外观与站前区域。",
      caption: "桂林站只是一个有明确名称的门户。这张授权照片不能证明读者将乘坐哪趟列车、如何前往酒店，或未来日期应该选哪座车站。",
    },
    {
      id: "zero-visit-rule", type: "callout", tone: "warning", title: "每条跨城边都从零游览额度开始",
      body: "先把西安—桂林区域和桂林区域—上海两条边的可用参观时间都记为零。只有当指定日期的票、确切场站、行李、道路衔接、入住，以及一段可替换的本地活动共同留下真正连续的时间窗，才可以给这条边增加游览额度。搜索结果里交通工具看起来很快，并不会让换酒店的一天变成完整的山水游览日。",
    },
    { id: "gates-heading", type: "heading", level: 2, text: "按顺序通过三道检验，不要把它们平均成一个分数" },
    {
      id: "gate-method", type: "list", ordered: true,
      items: [
        "用一句话写明山水模块的目的。“看看桂林”不合格；“观察三城主轴中缺少的峰林与江河景观”才是可检验的目的。",
        "先不填时间，画出完整的进入与离开链：包括票面机场或车站、道路衔接、行李、第一晚和最后一晚住宿，以及下一项固定承诺。",
        "只把明确的山水目标放进受到保护的完整区块。未经核实的抵达、离开或换酒店时间，不得借来充数。",
        "在失败演练中删掉首选水上活动。如果该区域因此不再值得承担前后两条跨城边，说明模块过度依赖天气，应在预订前删掉或重新设计。",
        "第二次演练则推迟区域离开时间。如果国际航班变成恢复方案，就把模块前移或直接删掉。",
      ],
    },
    {
      id: "gate-outcomes", type: "table", caption: "每道检验都对应决策，不采用积分", columns: ["结果", "含义", "下一步"],
      rows: [
        ["三项全部通过", "山水模块改变旅行内容、拥有真实时间，并且可以安全离开", "继续核实区域门户和内部顺序"],
        ["价值通过，可用时段不通过", "兴趣真实存在，但这次旅行保护不了它", "替换一座较弱的城市、真正增加时间，或把桂林留到下次"],
        ["价值和时间通过，恢复不通过", "路线只有在所有环节准点时才成立", "把模块移离离境日，或将其删除"],
        ["价值不通过", "第四站只是集邮，不是旅行目的", "保留三城主轴"],
      ],
    },
    { id: "placement-heading", type: "heading", level: 2, text: "根据固定国际门户放置模块，而不是套用所谓最佳路线" },
    {
      id: "placement-table", type: "table", caption: "国际机票确定后的宏观位置", columns: ["已确认的门户组合", "首先检验的宏观顺序", "可能推翻它的条件"],
      rows: [
        ["北京入境；上海离境", "北京 → 西安 → 桂林/阳朔 → 上海", "指定日期的某条模块边不可接受，或上海缓冲消失"],
        ["上海入境；北京离境", "上海 → 桂林/阳朔 → 西安 → 北京", "反向的指定日期衔接，或北京离境链更弱"],
        ["上海往返", "让桂林远离出境航班，并明确返沪段", "折返吃掉模块唯一的完整区块"],
        ["北京往返", "在分配游览前，同时列出南下模块和返京段", "返程挤占北京、西安或山水体验中一个受保护的重点"],
        ["国际航班尚未出票", "比较两个开放式进出方向，以及诚实计算过的同城往返", "行李、票规、分开出票风险或机场通达性改变结论"],
      ],
    },
    {
      id: "last-water-warning", type: "callout", tone: "decision", title: "不要让最后一项水上活动控制国际离境",
      body: "2026 年官方通告显示，当条件变化时，漓江不同河段可能在不同时间停航与复航。这能支持一条恢复规则，却不能用来预测未来。最后一个依赖水域运营的区块之后，应安排已核实的离开链和城市航班缓冲；游船、竹筏、道路接驳和一张独立国际机票，绝不能组成一条缺一不可的强制链。",
    },
    { id: "nodes-heading", type: "heading", level: 2, text: "宏观上保留一个模块，执行时则要点名每个真实节点" },
    {
      id: "node-identities", type: "paragraph",
      text: "当前景区官方交通资料将桂林站、桂林北站、桂林西站和阳朔站区分开来，还分别列出高铁站至兴坪码头的接驳，以及通往阳朔县城的公路班线。因此，站名不等于已经抵达阳朔酒店；桂林两江国际机场则是另一个独立节点。这些身份会改变转场账本，但只有当模块通过检验后，才应交给现有门户与交通指南选择。本页绝不会因为它们都带有“桂林”二字，就把不同场站当成可以互换的终点。",
    },
    {
      id: "yangshuo-station-figure", type: "figure", src: "/images/guides/guilin-yangshuo-transport-route/hero-1600.webp", width: 1600, height: 1000,
      alt: "阳朔站站房外观。",
      caption: "“阳朔站”这个名称可能掩盖后续还需一段道路衔接。这张授权图片只证明拍摄日期时的车站身份，不能证明当前车次、接驳、酒店路线或已经抵达县城。",
    },
    {
      id: "regional-owner-handoff", type: "callout", tone: "neutral", title: "宏观文章应在区域边界处停笔",
      body: "桂林/阳朔证明自己值得加入后，再使用独立的桂林门户指南和桂林—阳朔交通页面。只有确切端点、住宿基地和当前运营都已明确，才决定区域内部顺序；这些执行选择不属于本文的宏观判断范围。",
    },
    { id: "travellers-heading", type: "heading", level: 2, text: "三类旅客，会让同一个第四站呈现不同结论" },
    {
      id: "traveller-landscape", type: "callout", tone: "neutral", title: "旅客 A：山水是来华最重要的两个理由之一",
      body: "旅客从北京入境、上海离境，并且会觉得整条路线只有城市很可惜。这个模块通过价值检验，但只有在指定日期的两条跨城边、确切的区域落脚链和一段完整喀斯特/江河体验都受到保护后，才能保留。即使水上产品发生变化，预先选好的陆地山水重点仍使这一区域值得停留；上海继续保有离境缓冲。",
    },
    {
      id: "traveller-history", type: "callout", tone: "warning", title: "旅客 B：三座城市已经用完所有受保护区块",
      body: "旅客的不可妥协项包括分散在北京各处的参观、西安考古，以及上海的一项固定安排。加入桂林后，只剩一次深夜抵达、一项依赖运营的活动和一次清早离开。山水很吸引人，但可用时段检验不通过。答案是保留三城路线，或替换其中一城，而不是把四段转场碎片算作四个目的地。",
    },
    {
      id: "traveller-constraints", type: "callout", tone: "neutral", title: "旅客 C：首选竹筏项目的准入与护照规则尚未解决",
      body: "同行者中有人可能因年龄、身高、健康或行动能力与某个指定遇龙河产品的规则冲突，而当前官方页面也没有完整说明外国护照预订流程。团队不会自行假设可以参加。只有在另行核实的合适陆地或水上替代方案仍能保留山水目的时，才保留模块；否则，即使山水价值依然真实，这个团队的可用时段检验仍然不通过。",
    },
    { id: "recovery-heading", type: "heading", level: 2, text: "恢复时牺牲灵活层，不要牺牲路线的固定两端" },
    {
      id: "recovery-table", type: "table", caption: "针对山水模块的失败恢复", columns: ["故障", "首个安全应对", "对宏观路线的影响"],
      rows: [
        ["看似直达的航班或列车不可用", "用 12306 或实际承运航空公司，按真实日期和确切场站重新搜索", "只有两条门到门衔接仍可接受时才保留桂林，否则删除"],
        ["抵达被分配到另一座桂林车站", "重建车站到住宿及行李衔接", "先删除抵达日活动，不急着改变整条路线"],
        ["漓江某河段或所选水上产品暂停", "遵循对应运营方通告，改用已经核实的非水上替代", "若模块失去独特目的，就释放住宿并删除模块"],
        ["遇龙河产品限制排除某位旅客", "不要拆散团队，也不要绕开规则临时尝试", "改用经另行核实且全员适用的替代方案，或删除模块"],
        ["区域离开延误", "保护下一处有人员接待的住宿，放弃灵活的城市活动", "使用上海/北京缓冲，绝不压缩国际航班链"],
      ],
    },
    { id: "booking-heading", type: "heading", level: 2, text: "按依赖关系预订这个模块" },
    {
      id: "booking-order", type: "list", ordered: true,
      items: [
        "确认国际门户城市、实际机场、行李安排和机票改签条件。",
        "写下桂林不能悄悄挤掉的三城核心重点。",
        "明确区域目的，并准备一个不依赖特定水域运营也能满足该目的的替代方案。",
        "开放查询后，用确切日期、机场或车站及真实住宿终点，核实两条跨城边。",
        "把区域顺序交给现有门户、交通、住宿和龙脊页面；只要还有节点未知，就保持预订可更改。",
        "在首次免费取消截止时间，以及临近出发时，重新核查指定河段/产品、参与规则、天气和运营通告。",
      ],
    },
    { id: "final-heading", type: "heading", level: 2, text: "只有所有证据能装进同一张账本，第四模块才算准备好" },
    {
      id: "final-ledger", type: "table", caption: "决定保留前的最终证据", columns: ["决策项", "必需证据", "缺失时"],
      rows: [
        ["宏观方向", "已出票或真正可比的国际门户", "正向和反向均保持暂定"],
        ["模块进入", "指定日期的票、确切门户、行李和第一晚住宿", "抵达日不计山水游览额度"],
        ["独特体验", "明确的山水目的，以及合适的当前产品或陆地替代", "不要加入模块"],
        ["模块离开", "确切场站、最后一晚住宿、行李和下一项固定承诺", "增加恢复空间或删除桂林"],
        ["失败状态", "可删除一项活动，并有已核实的区域离开链和城市缓冲共同保护国际航班", "路线尚未准备好"],
      ],
    },
    {
      id: "editorial-judgment", type: "callout", tone: "warning", title: "Homeground 编辑判断",
      body: "三道检验、未经核实的跨城边一律记零游览额度，以及禁止水上活动直接衔接国际航班，都是保守的规划判断。官方来源能够证明节点身份、遗产价值、产品差异和实际停航事件，却不能保证这个模块适合某位旅客或某个具体日期。",
    },
    {
      id: "help-cta", type: "callout", tone: "decision", title: "想请人工检验第四站是否值得吗？",
      body: "请留下旅行日期、人数、大致预算、实际抵达与离境机场、行李情况，以及桂林山水是否属于最高优先级。Homeground 可以指出最薄弱的衔接和首先该删的部分，不会编造实时班次，也不会公开一份完整私人行程。",
    },
    {
      id: "internal-links", type: "internal-links", title: "继续规划", items: [
        { label: "规划第一次中国之旅", href: "/zh/plan/", description: "判断第四模块是否成立后，返回上层规划路径。" },
        { label: "安排北京、西安、上海的顺序", href: "/zh/guides/beijing-xian-shanghai-route-order/", description: "先确定三城主轴和国际门户，再检验桂林。" },
        { label: "选择真正的桂林抵达门户", href: "/zh/guides/guilin-airport-or-railway-station-arrival-guide/", description: "模块证明值得加入后，再比较 KWL、桂林站、桂林北站和桂林西站。" },
        { label: "比较桂林与阳朔之间的交通", href: "/zh/guides/guilin-yangshuo-transport-route/", description: "把区域内列车、公路和江河终点的选择交给对应页面。" },
        { label: "比较开放式进出与同城往返航班", href: "/zh/guides/china-open-jaw-flights-route-planning/", description: "确定宏观方向前，先检验国际门户结构。" },
        { label: "检查整趟行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "完成这个具体模块的取舍后，再审视整条路线。" },
      ],
    },
    {
      id: "sources", type: "sources", title: "已复核的官方、一手与图片来源", items: [
        { label: "外国护照铁路旅客常见问题", url: "https://www.12306.cn/en/faq.html", publisher: "China Railway 12306", reviewedAt: "2026-09-01" },
        { label: "民用航空机场名录", url: "https://www.caac.gov.cn/GYMH/MHGK/MYJC/index_6.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-09-01" },
        { label: "桂林两江国际机场", url: "https://gl.airport.gx.cn/", publisher: "Guangxi Airport Management Group", reviewedAt: "2026-09-01" },
        { label: "桂林机场地面交通渠道", url: "https://gl.airport.gx.cn/html/jiaotongxinxi/jiaotonggongju/snjcdb/73.html", publisher: "Guilin Liangjiang International Airport", reviewedAt: "2026-09-01" },
        { label: "当前桂林区域车站与地面交通节点", url: "https://www.lijiangriver.com.cn/page/article/lyfw.jtcx", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "中国南方喀斯特世界遗产记录", url: "https://whc.unesco.org/en/list/1248", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-09-01" },
        { label: "漓江排筏河段分段解封通知", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/246", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "漓江精华游船线路", url: "https://www.lijiangriver.cn/page/article/ylxl.ljjhy", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "漓江竹筏线路目录", url: "https://www.lijiangriver.cn/page/article/ylxl.ljpfy", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "漓江官方票务渠道", url: "https://www.lijiangriver.cn/page/article/lyfw.pwxx", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "有明确日期的漓江停航通告", url: "https://www.liriver.com.cn/mobile/article/zxlj.tzgg/191", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "有明确日期的河段复航通告", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/252", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "遇龙河运营公司", url: "https://www.ysylh.cn/about/", publisher: "Yangshuo Yulong River Scenic Area Tourism Development Co.", reviewedAt: "2026-09-01" },
        { label: "遇龙河产品限制", url: "https://www.ysylh.cn/matou/2024/6a7d914728304f999d023243c40b8680.shtml", publisher: "Yangshuo Yulong River Scenic Area Tourism Development Co.", reviewedAt: "2026-09-01" },
        { label: "桂林与阳朔天气入口", url: "https://gx.weather.com.cn/guilin/index.shtml", publisher: "China Weather", reviewedAt: "2026-09-01" },
        { label: "Rat2 拍摄的桂林站，CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Guilin_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-01" },
        { label: "Rat2 拍摄的阳朔站，CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-01" },
        { label: "知识共享署名—相同方式共享 4.0 许可", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-09-01" },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
