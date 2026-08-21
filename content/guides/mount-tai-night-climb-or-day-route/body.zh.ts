import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "泰山日出把夜爬变成愿望清单画面，但黑暗会拿走构成泰山文化价值的大部分沿途信息。红门历史步道、天外村乘车线和山顶索道是三种不同体验。选择时先问想理解什么、如何下山，不要只看最戏剧化的社交照片。" },
  { id: "answer", type: "callout", title: "直接结论", tone: "decision", body: "重视题刻、山门、寺院和历史登山过程，且膝盖能承受大量台阶时，选红门白天徒步。重视登顶或步行能力有限，选官方巴士加索道链。只有路线当天开放、天气适合、照明保暖、同伴和安全下山方案都具备时才夜爬，并接受看不到日出。" },
  { id: "routes-heading", type: "heading", level: 2, text: "三条路线是三种泰山" },
  { id: "routes", type: "table", caption: "路线身份", columns: ["路线", "核心体验", "主要风险"], rows: [["红门白天徒步", "沿山门、碑刻和寺院体验传统文化登山", "台阶量大，下山更伤膝"], ["天外村巴士+可选索道", "更快到中天门和山顶区", "排队、车辆/索道停运，错过较多历史路径"], ["红门夜爬", "夜间上行和可能的山顶日出", "黑暗、寒冷、拥挤、疲劳且无日出保证"]] },
  { id: "heritage-heading", type: "heading", level: 2, text: "白天徒步才看得到山为何重要" },
  { id: "heritage", type: "paragraph", text: "泰山管理方把岱庙—红门—山顶描述为传统帝王登山线，沿石阶分布寺院、山门、碑刻和摩崖石刻。UNESCO把泰山视为数千年祭祀、帝王礼仪、艺术与自然共同形成的文化和自然遗产。白天每道门都在改变山的象征和空间秩序。" },
  { id: "day-hike", type: "list", ordered: true, items: ["确认红门线开放、当前入口和最晚登顶/下撤选择。", "尽早开始，留时间读中低山而不是冲刺。", "中天门重新评估膝盖、天气和日照。", "索道只有运行且排队能帮助计划时才用。", "疲劳替你决定前，先决定下山方式。"] },
  { id: "bus-heading", type: "heading", level: 2, text: "乘车登顶是合法路线，不是全遗产捷径" },
  { id: "bus", type: "paragraph", text: "官方景区资料介绍天外村景区车辆到中天门，再可乘索道上山。山路由景区车辆控制，不允许私家车通行。这适合登顶优先、时间有限或减少台阶，但不会复制红门历史序列。" },
  { id: "night-heading", type: "heading", level: 2, text: "夜爬有五个一票否决" },
  { id: "night", type: "table", caption: "任一项都可取消夜爬", columns: ["否决项", "原因"], rows: [["路线未正式开放", "旧的24小时信息不能压过当前关闭"], ["雷雨、结冰、大风或危险低温", "暴露山顶和湿滑台阶不安全"], ["无可靠照明或保暖层", "手机手电和不确定的租大衣不是安全系统"], ["独行且无联系集合计划", "疲劳、跌倒和手机故障更难恢复"], ["没有下山方案", "疲惫看完日出只完成一半"]] },
  { id: "sunrise", type: "callout", title: "日出是天气可能，不是门票权益", tone: "warning", body: "云、雾、雨和季节条件都可能遮挡。不可绕过关闭、离开标记路线或为等照片超过安全下撤时间。即使天空全灰，夜爬也应仍有合理价值。" },
  { id: "descent-heading", type: "heading", level: 2, text: "上山前先规划下山" },
  { id: "descent", type: "comparison", title: "三种下撤", columns: [{ heading: "全程步行", body: "保留路径体验但膝盖负荷和疲劳翻倍，只适合体力、日照和天气仍强。" }, { heading: "索道+景区车", body: "运行时减少台阶，但可能排队或停运，须确认最后车辆连接。" }, { heading: "混合下撤", body: "走一段有意义路段，其余用官方交通；在疲惫前决定交接点。" }] },
  { id: "failure", type: "table", caption: "问题与恢复", columns: ["问题", "处理"], rows: [["索道停运", "听从工作人员，缩短山顶并走安全开放路线"], ["天气恶化", "路线变难前折返或用官方系统下山"], ["中天门膝痛", "停止台阶目标，若可用则改官方交通或安全下撤"], ["夜间同伴失散", "在约定有人地标集合，不离开标记路搜索"], ["日出被遮", "按计划下山，不在寒冷拥挤中无限等待"]] },
  { id: "what-to-pack", type: "list", items: ["离线保存官方路线与天气。", "防滑鞋、分层衣物、防雨、水和食物。", "夜间使用真正头灯和备用电，释放双手。", "保存入口、中天门、山顶和下撤点中文名。", "设最晚折返和能承受延误的酒店/后续计划。"] },
  { id: "boundary", type: "callout", title: "本页不承诺营业时间或装备租赁", tone: "neutral", body: "路线时间、票务、景区车、索道、天气管控和山顶设施均动态。当天重开泰山管理方公告。本页负责路线和风险，不写死运营表。" },
  { id: "links", type: "internal-links", title: "连接泰山", items: [{ label: "山东半岛沿海铁路弧", href: "/zh/guides/shandong-peninsula-coastal-city-rail-arc/", description: "泰安山地停留与半岛路线分开。" }, { label: "中国高铁新手指南", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "处理铁路抵达和护照乘车。" }, { label: "带父母游中国", href: "/zh/guides/china-itinerary-with-older-parents/", description: "选择山地替代和恢复日。" }, { label: "中国公共假期", href: "/zh/guides/china-public-holidays-travel-calendar/", description: "别把山顶拥挤叠在脆弱路线。" }, { label: "行程是不是太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "计算上山、下山和次日恢复。" }] },
  { id: "sources", type: "sources", title: "一手来源与图片署名", items: [{ label: "泰山官方路线与景区信息", url: "https://tsgw.taian.gov.cn/col/col204913/index.html", publisher: "泰山风景名胜区管理委员会", reviewedAt: "2026-08-22" }, { label: "泰山世界遗产说明", url: "https://whc.unesco.org/en/list/437", publisher: "联合国教科文组织世界遗产中心", reviewedAt: "2026-08-22" }, { label: "头图：泰山玉皇顶，CC0", url: "https://commons.wikimedia.org/wiki/File:Jade_Emperor_Peak_of_Mount_Tai_%E6%B3%B0%E5%B1%B1%E7%8E%89%E7%9A%87%E9%A1%B6_2007_075.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }] }
] } as const satisfies StructuredPageBody;
export default body;
