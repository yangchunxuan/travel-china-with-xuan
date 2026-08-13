import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "在中国看到无人驾驶出租车的标志，不等于可以在全城任意地点叫车。你实际面对的是一个由城市、运营企业、运营区、服务时段、车辆、自动驾驶等级和试点阶段共同限定的地方项目。有些车内配有安全员，有些由远程安全员监管；一条道路获准测试，也完全可能没有面向公众的载客服务。"},
  {id: "six-part-check", type: "table", caption: "眼前这项服务由六件事共同决定", columns: ["要问什么", "为什么重要"], rows: [
    ["哪座城市、哪个区？", "许可由地方管理，服务可能止于行政区或运营区边界。"],
    ["哪家运营企业？", "同一座城市里的不同企业，也可能有不同覆盖范围和乘客规则。"],
    ["法律和服务状态是什么？", "各地用语并不完全一致。道路测试许可绝不等于载客服务；其他试点名称也仍不能证明现在可以下单。"],
    ["哪些道路、哪些时段？", "批准范围可能只包含指定区域、路线和时间。"],
    ["由谁负责安全监管？", "根据获批方案，安全员可能在车内，也可能远程监管。"],
    ["你本人能否完成下单？", "即使向公众开放，也可能要求通过该企业的注册、身份或手机验证、乘客资格和支付步骤。"]
  ]},
  {id: "zone-not-city", type: "heading", level: 2, text: "运营区不是整座城市"},
  {id: "zone-explanation", type: "paragraph", text: "交通运输部要求自动驾驶客运在获批的服务区域内开展，地方主管部门再具体批准路线、区域和运营条件。因此，同一辆车在边界一侧可以合法服务，越过边界却可能无法接单。官方通知若只提到机场、火车站或主题乐园周边道路，应先理解为测试范围；除非同一份现行材料明确确认载客运营，否则不能把这些地名当成乘客可用的上下车点。"},
  {id: "stages", type: "comparison", title: "把道路状态和乘客准入分开看", columns: [
    {heading: "道路测试或示范应用", items: ["国家规则把它们定义为在指定道路开展的测试或试用活动。", "示范活动可能载人，但这个名称本身不等于普通公众出租车服务。", "能否参与仍由当地规则和运营企业当前入口决定。"]},
    {heading: "地方批准的载客运营", items: ["城市可能使用自己的示范、试点或商业运营用语。", "某些地方运营阶段可以获准收费。", "你的账户、上下车点、时间和支付方式仍须全部被系统接受。"]}
  ]},
  {id: "safety-operator", type: "heading", level: 2, text: "驾驶座无人，不等于车辆无人监管"},
  {id: "safety-details", type: "paragraph", text: "按照国家运输安全指南，有条件自动驾驶或高度自动驾驶出租车必须随车配备一名安全员。完全自动驾驶出租车只有在相关城市政府批准其于指定区域运营后，才可以改用远程安全员，而且每名远程安全员同时监管的车辆不得超过三辆。因此，驾驶座空着既不代表车辆没有监管，也不能证明它获准接你。"},
  {id: "scenario-one", type: "callout", title: "什么情况下可以把它当作真实交通选项", body: "只有当运营企业当前的乘客入口接受你在所需日期和时段的准确上车点与目的地，你能完成账户、联系方式和支付步骤，而且服务取消或在运营区边界结束时仍有普通出租车或地铁可用，才适合纳入行程。街上看到企业标志，不能证明这些条件中的任何一项。", tone: "decision"},
  {id: "scenario-two", type: "callout", title: "什么情况下只把它当作技术体验", body: "不要让试点服务承担去机场、赶末班车、赴定时预约或深夜回酒店的关键一程。儿童、轮椅、多件行李或语言沟通困难会让叫车失败更难恢复时，也应采取同样的保守判断。社交媒体上的“机场无人车”可能只是道路测试、媒体体验或受限线路，并非普通载客运营。", tone: "warning"},
  {id: "if-you-ride", type: "heading", level: 2, text: "如果你参加已正式开放的乘车服务"},
  {id: "ride-checks", type: "list", ordered: true, items: [
    "在运营企业当前乘客入口确认企业名称、准确上车点、目的地、服务时段和运营区终点。",
    "出发前阅读安全须知，找到车内求助方式或紧急联系方式。",
    "保存中文目的地，同时保留普通出租车或地铁备选。",
    "遵守座位、安全带及上下车要求，不干扰设备，也不要尝试接管车辆。",
    "车辆意外停车或路线中止时，使用指定求助渠道并遵循车内安全提示；如遇火灾或迫在眉睫的危险，按标示的紧急逃生方法离开并转移到安全地点。"
  ]},
  {id: "dynamic-boundary", type: "callout", title: "核验日期：2026 年 8 月 13 日", body: "本文解释政策结构，不提供实时可用性。运营区、时段、企业、车辆安全员配置和乘客准入都可能变化，出行当天应再次查看当地主管部门和运营企业的现行信息。规划文件、测试道路清单或旧宣传帖都不是当前可下单的承诺。", tone: "warning"},
  {id: "help", type: "callout", title: "不确定这项试点能否放进真实行程？", body: "把城市、出行日期、准确起终点、必须抵达的时间、人数、行李和行动需求发给 Homeground。我们可以帮你区分有文件依据的公众服务与测试区新闻，并标出仍需确认的备选方案；实时乘客准入最终由城市和运营企业决定。", tone: "neutral"},
  {id: "internal-links", type: "internal-links", title: "把其余接驳安排得更稳妥", items: [
    {label: "在中国选择包车接送还是公共交通", href: "/zh/guides/china-private-transfer-or-public-transport/", description: "试点服务不能承担关键接驳时，选择更可靠的交通方案。"},
    {label: "确认中国地图地点标记与入口", href: "/zh/guides/china-map-coordinate-offset-explained/", description: "不要只看一个坐标点，还要确认实际可用的上车入口。"},
    {label: "在中国丢失手机后的数字恢复", href: "/zh/guides/lost-phone-in-china-digital-recovery/", description: "保护交通和支付工具的使用能力。"}
  ]},
  {id: "sources", type: "sources", title: "官方与独立来源", items: [
    {label: "自动驾驶汽车运输安全服务指南", url: "https://xxgk.mot.gov.cn/jigou/ysfws/202312/t20231205_3962490.html", publisher: "交通运输部", reviewedAt: "2026-08-13"},
    {label: "智能网联汽车道路测试与示范应用管理规范", url: "https://www.miit.gov.cn/jgsj/zbys/qcgy/art/2021/art_a24398849c6a4dd290328ab5d1d8af0f.html", publisher: "工业和信息化部", reviewedAt: "2026-08-13"},
    {label: "特定区域和时段商业化试点政策解读", url: "https://big5.mot.gov.cn/gate/big5/www.mot.gov.cn/gongkai/zcjd/202512/t20251226_4191175.html", publisher: "交通运输部", reviewedAt: "2026-08-13"},
    {label: "上海智能驾驶发展动态", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260215/e00a579f253d4903a3bdaf6840babc9f.html", publisher: "上海市人民政府", reviewedAt: "2026-08-13"},
    {label: "北京亦庄自动驾驶示范区动态", url: "https://kfqgw.beijing.gov.cn/ywdt/dwkfgd/kfyz/202505/t20250521_4246493.html", publisher: "北京经济技术开发区", reviewedAt: "2026-08-13"},
    {label: "武汉智能网联汽车发展规划", url: "https://www.wuhan.gov.cn/ztzl/25zt/ltwhfjzx/zcwj/202511/t20251125_2682890.shtml", publisher: "武汉市人民政府", reviewedAt: "2026-08-13"},
    {label: "自动驾驶运行设计条件综述", url: "https://www.sciencedirect.com/science/article/pii/S0001457525004543", publisher: "Accident Analysis & Prevention", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
