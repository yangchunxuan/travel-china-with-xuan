import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead-answer", type: "lead", text: "中国没有一个适合所有地区的“最佳天气月份”。跨区域旅行应先保护最容易被高温、降雨、严寒、能见度或海拔影响的核心体验，再判断其余地区在同一时段是否“可以接受”。这套方法用于选择日期窗口，不是预测你出行那几天的天气。" },
    { id: "quick-choice", type: "comparison", title: "先找出最可能让行程失效的约束", columns: [
      { heading: "以户外核心项目为先", body: "山地、长距离步行、景观观赏或水上活动，可优先决定日期窗口。" },
      { heading: "以同行者耐受度为先", body: "最不耐高温、严寒、潮湿、空气状况或快速升高海拔的人，往往决定全组的实际边界。" },
      { heading: "日期固定就改路线", body: "如果假期不能移动，应调整地区或活动组合，而不是寻找并不存在的“全国黄金时段”。" }
    ] },
    { id: "official-boundary-heading", type: "heading", level: 2, text: "官方气候资料能告诉你什么，不能告诉你什么" },
    { id: "official-boundary", type: "paragraph", text: "中国气象局资料显示，中国气候类型复杂，受到纬度、海陆位置、季风与地形共同影响。因此，北方内陆城市、湿润的南方城市和高原延伸段，不应套用一个全国平均值。但气候资料描述的是长期规律，不能保证未来某一周的降雨、气温或能见度。" },
    { id: "route-zones-heading", type: "heading", level: 2, text: "把城市清单转换成真实旅行暴露" },
    { id: "route-zones", type: "table", caption: "不要只写“南方、北方”，要写清会影响体验的条件", columns: ["暴露类型", "会改变什么", "需要问的问题"], rows: [
      ["受季风影响的湿润地区", "雨天备选、衣物晾干、高温负荷及室内替代价值", "湿热天气会不会直接毁掉此行的核心目的？"],
      ["干燥内陆或北方地区", "昼夜温差、风、日晒和季节边缘的低温", "同行者能否通过分层穿衣维持原定步行量？"],
      ["高海拔地区", "气温、天气变化和恢复余量", "第一天能否保持弹性？是否有低海拔退出方案？"],
      ["依赖山景或能见度的地区", "景观、步道开放与交通可靠性", "短期预报不佳时，能否在行程内调换日期？"],
      ["室内内容丰富的大城市", "天气变差时仍有较多替代方案", "哪些博物馆、市场或街区体验能替代暴露度高的一天？"]
    ] },
    { id: "decision-variables-heading", type: "heading", level: 2, text: "决定日期窗口的六个变量" },
    { id: "decision-variables", type: "list", ordered: false, items: [
      "不可替代性：最有名的地点不一定是天气锚点；真正的锚点是没有合格雨天替代的体验。",
      "暴露时长：户外两小时和整日徒步不应获得相同的天气权重。",
      "同行者耐受度：儿童、长者，以及对热或海拔敏感的人，可能设定全组的实际上限。",
      "弹性：可前后移动两天的户外项目，比抵达后立刻开始、结束后立刻转场的项目安全得多。",
      "运营季节：如果景区、道路或服务关闭，再合适的气候也没有意义；必须另查具体运营方。",
      "假期压力：舒适天气可能和国内出行高峰重合。气候筛选完成后，还要单独核对法定节假日。"
    ] },
    { id: "workflow-heading", type: "heading", level: 2, text: "可执行的选期流程" },
    { id: "workflow", type: "list", ordered: true, items: [
      "为每一站写一句“为什么值得去”，避免用笼统气候标签取代真正的旅行目的。",
      "把核心项目标为天气决定型、天气敏感型或天气容忍型。例如山地日出可能属于决定型，城市美食路线通常只是敏感型。",
      "补上海拔和连续户外时长。快速进入高海拔应作为独立约束，而不是只写进打包清单。",
      "依据官方长期气候背景，为最难妥协的一站筛出两三个大致窗口，不要提前几个月寻找精确预报。",
      "逐一检查其他地区是否仍然可接受。只有会破坏核心体验或超过同行者耐受度时，才否决一个窗口。",
      "核对官方节假日日历和具体景区、交通运营公告，再选择严重冲突最少的时段。",
      "临近出发时，用官方天气预报和本地公告替换长期假设；先调换弹性户外日，再考虑取消整个地区。"
    ] },
    { id: "example-heading", type: "heading", level: 2, text: "规划示例：城市、山地景观与高原" },
    { id: "example", type: "callout", tone: "neutral", title: "这是方法示例，不是天气预测或推荐行程", body: "假设路线包含一个博物馆资源丰富的东部城市、一个怕降雨和低能见度的山地景观，以及一个更高海拔的延伸段。先让山地项目决定大致窗口，并在前后保留可调日期；城市作为天气容忍段。随后再判断全组是否适合高原条件和恢复节奏。若不适合，应删除高原延伸，而不是强迫一个日期同时满足三种不相容的暴露。" },
    { id: "failure-table", type: "table", caption: "常见失败方式与修复方法", columns: ["失败方式", "为什么不可靠", "如何恢复"], rows: [
      ["使用全国月平均值", "它抹平了旅客真正会感受到的地区和海拔差异。", "比较路线里的具体暴露与最难妥协的活动。"],
      ["把气候当成预报", "多年平均无法确认某一周的降雨或能见度。", "临近出发查官方预报，并保留可移动的日程。"],
      ["只按最暖城市打包", "最冷或最湿的一段最终会决定舒适度。", "按整条路线的极端条件准备分层与防雨方案。"],
      ["天气完美却撞上大假期", "交通和景区压力可能抵消天气优势。", "在锁定不可退订项目之前核对官方节假日。"],
      ["每个地区都舍不得删", "所有天气锚点都失去余量，最后每一站都在妥协。", "删除气候离群点，或替换其高暴露活动。"]
    ] },
    { id: "switch-heading", type: "heading", level: 2, text: "什么时候应改路线，而不是改日期" },
    { id: "switch-rule", type: "paragraph", text: "当年假、校历或活动日期固定；某一个地区制造了大部分打包和恢复负担；或同行者无法承受最难暴露时，保留日期、调整路线。若整趟旅行围绕一个季节性户外体验展开，而其他地区可以跟随，则应移动日期。两种选择都不是失败，目标是路线一致，而不是收集地区。" },
    { id: "booking-checklist-heading", type: "heading", level: 2, text: "锁定不可退订项目之前" },
    { id: "booking-checklist", type: "list", ordered: false, items: [
      "已写清天气决定型体验及一个真正可接受的替代方案。",
      "海拔和恢复时间已进入行程，而不只是出现在打包清单。",
      "每个高暴露地点都有可调日期、室内备选或弹性取消条件。",
      "已核对官方节假日日历及具体景区、交通公告。",
      "全组已针对路线极端条件准备防雨、避热、防寒和低能见度方案。"
    ] },
    { id: "dynamic-boundary", type: "callout", tone: "warning", title: "临近出发必须复核", body: "本文刻意不做“城市×月份”预报。当前预警和天气应查看中国气象局及对应地方气象部门；停运或闭园应查看具体景区、交通运营方。短期预报可能改变每日顺序，但不一定推翻区域层面的选择逻辑。" },
    { id: "scope", type: "callout", tone: "neutral", title: "本文范围", body: "本文只负责跨区域中国旅行的气候筛选方法，不替代单个城市的季节指南、实时预报、高海拔医疗评估或法定节假日日历。" },
    { id: "help-cta", type: "callout", tone: "decision", title: "需要按气候筛选路线？", body: "请提供固定或弹性日期、同行者、候选地区，以及最想保护的户外体验。有效审核应指出气候离群点和备用方案，而不是承诺完美天气。" },
    { id: "more-planning", type: "internal-links", title: "继续规划", items: [
      { label: "判断十月是黄金周还是节后出行", href: "/zh/guides/china-in-october-golden-week-or-later/", description: "结合国庆假期和区域天气做月份级判断。" },
      { label: "查看中国法定节假日日历", href: "/zh/guides/china-public-holidays-travel-calendar/", description: "气候合适并不代表没有假期压力。" },
      { label: "比较平季旅行的价值与代价", href: "/zh/guides/china-shoulder-season-value-tradeoff/", description: "完成气候筛选后，再加入价格、日照和运营限制。" },
      { label: "分清天坑与野外落水洞", href: "/zh/guides/china-tiankeng-sinkholes-explained/", description: "理解地质学中的天坑，分清正式公众景区与科研发现点，并在访问前核对当期路线和安全信息。" },
      { label: "从白天走到夜晚游南明", href: "/zh/guides/guiyang-nanming-old-city-day-to-night-walk/", description: "按日光、夜景与用餐节奏，从老城街巷走到甲秀楼、南明河和青云市集，并准备下雨与疲劳分支。" },
      { label: "分清文昌航天空间", href: "/zh/guides/wenchang-commercial-space-city/", description: "分清文昌国家发射场、海南商业航天发射场与航天城开发，并对任何公众访问安排重新核实。" },
    ] },
    { id: "sources", type: "sources", title: "已复核的官方来源", items: [
      { label: "中国气候类型", url: "https://www.cma.gov.cn/2011xzt/2017zt/20170720/2017072004/201707200101/202111/t20211103_4148108.html", publisher: "中国气象局", reviewedAt: "2026-08-12" },
      { label: "我国气候的主要特征", url: "https://www.cma.gov.cn/2011xzt/2012zhuant/20120302/2012030205/201203020501/201103/t20110314_3096052.html", publisher: "中国气象局", reviewedAt: "2026-08-12" }
    ] }
  ]
} satisfies StructuredPageBody;

export default body;
