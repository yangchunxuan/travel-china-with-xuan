import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "在中国看到“无人驾驶出租车”，不等于可以在全城任意地点叫车。你眼前的服务由城市、运营企业、运营区域、时段、车辆、自动驾驶等级和试点阶段共同限定。有些车内配安全员，有些由远程安全员监管；道路被列为测试道路，也不代表已经向公众提供载客服务。"},
  {id: "six-part-check", type: "table", caption: "判断一项服务要看清六件事", columns: ["问题", "为什么重要"], rows: [
    ["在哪座城市、哪个区？", "许可通常由地方管理，服务可能止于行政区或运营区边界。"], ["哪家运营企业？", "同城不同企业的覆盖范围和乘客规则也可能不同。"], ["处于什么阶段？", "道路测试、示范应用、示范运营与商业运营不能混为一谈。"], ["哪些道路、哪些时段？", "批准范围可能只涵盖指定区域、路线和时间。"], ["由谁监管？", "按照获批方案，安全员可能在车内，也可能远程监管。"], ["是否开放公众下单？", "看见车辆或开放测试道路，都不能证明游客可以叫到车。"]
  ]},
  {id: "zone-not-city", type: "heading", level: 2, text: "运营区不等于整座城市"},
  {id: "zone-explanation", type: "paragraph", text: "交通运输部的安全指南要求自动驾驶运输服务在批准的经营区域内开展，地方再细化路线、区域和运营条件。因此，同一辆车在边界一侧可能获准运营，越过边界却无法服务。若官方消息只说机场、火车站或主题乐园周边道路“开放测试”，就应先理解为测试范围；只有同一份现行材料明确写明载客运营，才能进一步判断是否可乘。"},
  {id: "stages", type: "comparison", title: "先看阶段，再看宣传用语", columns: [
    {heading: "道路测试或示范应用", items: ["主要用于验证车辆与运营系统。", "车辆可能在公共道路上被游客看见。", "本身不能证明存在可预订的公众服务。"]},
    {heading: "示范运营或商业运营", items: ["在地方批准条件下可能面向公众载客。", "获批阶段可能允许收费。", "覆盖区、时段、资格和下单入口仍以企业和区域为准。"]}
  ]},
  {id: "safety-operator", type: "heading", level: 2, text: "没有驾驶员，不等于没有监管"},
  {id: "safety-details", type: "paragraph", text: "国家指南区分有条件自动驾驶、高度自动驾驶和完全自动驾驶。前两类出租车通常配车内安全员；完全自动驾驶出租车经地方政府在指定区域批准后，可以使用远程安全员，国家指南规定一名远程安全员同时监管的车辆最多为三辆。因此，驾驶座是否有人，不能单独证明自动驾驶等级或安全监管方式。"},
  {id: "traveller-scenes", type: "table", caption: "游客常见画面能说明什么、不能说明什么", columns: ["看到的画面", "可以谨慎判断", "仍然不能证明"], rows: [
    ["带传感器和品牌标识的车辆", "它参与某项自动驾驶项目。", "它当时正在面向公众载客。"], ["驾驶座没有人", "获批方案可能采用远程监管。", "车辆没有安全员或干预机制。"], ["通知提到机场或迪士尼道路", "这些道路可能纳入测试网络。", "乘客可以叫车往返机场或迪士尼。"], ["宣传中的体验线路", "某企业在特定时期可能有受限体验。", "服务覆盖全城或长期存在。"]
  ]},
  {id: "scenario-one", type: "callout", title: "情境一：在会展区附近看到无人车", body: "把它理解为当地有项目，不要直接把它写进关键接驳。若酒店或机场转乘不能失败，除非企业当前乘客入口同时接受你的上车点、目的地、日期和时间，否则应保留已确认的普通出租车、网约车或公共交通方案。", tone: "decision"},
  {id: "scenario-two", type: "callout", title: "情境二：社交媒体出现“机场无人出租车”", body: "先核对视频说的是测试道路、示范线路、媒体体验还是正常载客运营，结论会随阶段改变。另一个区、另一家企业的消息，不能直接套用到你的行程。", tone: "warning"},
  {id: "if-you-ride", type: "heading", level: 2, text: "如果你参加官方开放的乘车体验"},
  {id: "ride-checks", type: "list", ordered: true, items: ["在企业当前乘客入口确认运营方、上车点、目的地和服务时段。", "上车前阅读安全须知，找到车内求助按钮或紧急联系方式。", "保存中文目的地，并保留普通出租车或地铁作为替代。", "遵守座位、安全带和上下车要求，不干扰设备，也不要尝试接管车辆。", "车辆停车或路线意外中止时，通过指定客服求助，并在安全位置等待指引。"]},
  {id: "dynamic-boundary", type: "callout", title: "核验日期：2026 年 8 月 13 日", body: "本文解释制度和识别方法，不提供实时可用性。运营区、时段、企业、车辆安全员配置和公众准入都可能变化，出行当天应再次查看当地主管部门与运营企业的现行信息。规划文件、测试道路清单或旧宣传帖都不是当前叫车承诺。", tone: "warning"},
  {id: "internal-links", type: "internal-links", title: "把剩余接驳安排得更稳妥", items: [
    {label: "在中国选择包车接送还是公共交通", href: "/zh/guides/china-private-transfer-or-public-transport/", description: "当试点服务不能承担关键接驳时，选择可靠替代方案。"}, {label: "确认中国地图地点标记与入口", href: "/zh/guides/china-map-coordinate-offset-explained/", description: "不要只看坐标，要确认实际可用的上车入口。"}, {label: "在中国丢失手机后的数字恢复", href: "/zh/guides/lost-phone-in-china-digital-recovery/", description: "保护交通与支付工具的使用能力。"}
  ]},
  {id: "sources", type: "sources", title: "官方与独立来源", items: [
    {label: "自动驾驶汽车运输安全服务指南", url: "https://xxgk.mot.gov.cn/jigou/ysfws/202312/t20231205_3962490.html", publisher: "交通运输部", reviewedAt: "2026-08-13"}, {label: "特定区域、特定时段商业化试点政策解读", url: "https://big5.mot.gov.cn/gate/big5/www.mot.gov.cn/gongkai/zcjd/202512/t20251226_4191175.html", publisher: "交通运输部", reviewedAt: "2026-08-13"}, {label: "上海智能驾驶发展动态", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260215/e00a579f253d4903a3bdaf6840babc9f.html", publisher: "上海市人民政府", reviewedAt: "2026-08-13"}, {label: "北京亦庄自动驾驶示范区动态", url: "https://kfqgw.beijing.gov.cn/ywdt/dwkfgd/kfyz/202505/t20250521_4246493.html", publisher: "北京经济技术开发区", reviewedAt: "2026-08-13"}, {label: "武汉智能网联汽车发展规划", url: "https://www.wuhan.gov.cn/ztzl/25zt/ltwhfjzx/zcwj/202511/t20251125_2682890.shtml", publisher: "武汉市人民政府", reviewedAt: "2026-08-13"}, {label: "自动驾驶运行设计条件综述", url: "https://www.sciencedirect.com/science/article/pii/S0001457525004543", publisher: "Accident Analysis & Prevention", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
