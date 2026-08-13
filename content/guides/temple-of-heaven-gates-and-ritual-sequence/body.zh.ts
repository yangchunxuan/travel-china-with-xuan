import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = { schemaVersion: "1.0.0", blocks: [
  { id: "answer-first", type: "lead", text: "第一次参观天坛，最清晰的方式是从南门进入，依次走圜丘、皇穹宇与回音壁、丹陛桥，最后到祈年殿。这条路从南侧祭坛走向北侧祈谷建筑，能读懂空间逻辑。若更重视地铁5号线的便利，就从东门进，先看祈年殿，再沿中轴反向走到南门。无论哪条线，第一次参观都要买到三个核心收费景点的权限；单独公园门票并不包含它们。" },
  { id: "ticket-heading", type: "heading", level: 2, text: "公园门票与核心坛庙不是一张权限" },
  { id: "tickets", type: "comparison", columns: [
    { heading: "公园门票", body: "进入面积很大的外坛公园、古树与公共园林空间，但不单独包含祈年殿、回音壁和圜丘。" },
    { heading: "联票", body: "包含公园门票及三个主要收费景点。第一次来且重点是著名祭天建筑时，通常应选这类票。" },
    { heading: "核心景点票", body: "官方也列出三个景点的单独门票。应看实际购票页面或综合服务窗口说明，避免与公园门票重复购买。" },
  ] },
  { id: "foreign-booking", type: "callout", title: "支持护照预约，但手机验证仍是实际门槛", body: "北京市2026年官方指南说明，外籍游客可通过“天坛”微信公众号预约，并在入园时出示电子票二维码及对应护照等证件；“畅游公园”官方渠道也支持护照购票。若境外手机号无法完成实名验证，应持护照原件到综合服务窗口办理，而不是找未经授权的代购。", tone: "neutral" },
  { id: "gate-heading", type: "heading", level: 2, text: "入口决定路线方向" },
  { id: "gates", type: "table", caption: "天坛起点选择", columns: ["起点", "路线逻辑", "交通与代价"], rows: [
    ["南门", "圜丘→回音壁/皇穹宇→丹陛桥→祈年殿→东门或北门离开。", "地铁8号线天桥站是实用入口。叙事最清楚，但从地铁到核心起点不一定最短。"],
    ["东门", "长廊→祈年殿→丹陛桥→回音壁→圜丘→南门。", "地铁5号线天坛东门站非常方便，但中央仪式顺序反向。"],
    ["西门", "先走较安静的园林，可选神乐署或斋宫，再接入中轴。", "适合真正重视次要建筑的人；若只看三个核心景点，短时初访效率较低。"],
  ] },
  { id: "sequence-heading", type: "heading", level: 2, text: "每一站在顺序中做什么" },
  { id: "sequence", type: "list", items: [
    "在圜丘先看露天圆形石构和它在南侧的位置，不要只把它当成测试中心回声的装置。",
    "到皇穹宇院落时，先理解回音壁围合的是具体祭祀空间；声学效果受现场条件与其他游客影响，不是保证演出。",
    "把丹陛桥当作连接轴线。天坛官方说明它从南向北逐渐升高，连接圜丘坛与祈谷坛。",
    "南进北出时，以祈年殿收尾；尺度、色彩和抬高台基共同形成视觉高潮。",
    "只有在独立开放时间、票务和体力都允许时，再增加斋宫或神乐署。",
  ] },
  { id: "hours-heading", type: "heading", level: 2, text: "公园关得晚，不等于坛庙也开到晚上" },
  { id: "hours", type: "paragraph", text: "外坛公园现行关闭时间为22:00，21:00停止入园。三个收费核心景点周二至周日开放：4月1日至10月31日08:00—18:00、17:30停止进入；11月1日至3月31日08:00—17:00、16:30停止进入。通常周一关闭，法定节假日除外。因此，晚上逛公园与完成一次核心建筑初访是两件不同的事。" },
  { id: "pace", type: "callout", title: "Homeground规划判断：留两到三小时", body: "两小时可按直线异门路线看完三个核心点；三小时可以放慢中轴步行、真正休息，并增加一个次要空间。安检、客流、拍照和绕行都会改变节奏，这不是官方规定时长。", tone: "decision" },
  { id: "mistakes-heading", type: "heading", level: 2, text: "常见路线失误" },
  { id: "mistakes", type: "list", items: ["只买公园票，进园后才发现三处著名建筑另需权限。", "为了地铁方便从东门进，却计划走到最南端后再回东门。", "看到公园22:00关闭就晚到，结果核心景点已经关门。", "把繁忙公共空间中的回音壁效果当作保证。", "旅客真正需要坐下休息时，仍强塞斋宫和神乐署。"] },
  { id: "internal-links", type: "internal-links", title: "安排现实的北京停留", items: [
    { label: "第一次去北京住哪里", href: "/zh/guides/beijing-where-to-stay-first-trip/", description: "把5号线、8号线和其他北京日程一起比较。" },
    { label: "国博预约与精简路线", href: "/zh/guides/national-museum-of-china-booking-and-route/", description: "另一处北京重头景点应使用独立预约和室内路线。" },
    { label: "带父母去中国旅行", href: "/zh/guides/china-itinerary-with-older-parents/", description: "地图上的直中轴仍包含很长的公园步行。" },
    { label: "读懂一段中国城墙", href: "/zh/guides/chinese-city-walls-gates-and-urban-order/", description: "分清原存、保护性修缮、复建与考古遗存，再把城门和街道放回完整的城市系统中理解。" },
  ] },
  { id: "consultation", type: "callout", title: "需要与另一项北京预约衔接？", body: "Homeground 真人旅行顾问可以按酒店和当天其他固定时段匹配入口、方向与节奏。请提供日期、出发偏好、行动限制，以及你更重视三个核心景点还是大公园本身。", tone: "neutral" },
  { id: "sources", type: "sources", title: "已核验的官方与图片来源", items: [
    { label: "官方开放时间、三景点联票与服务", url: "https://www.tiantanpark.cn/index.html", publisher: "天坛公园", reviewedAt: "2026-08-12" },
    { label: "2026年外籍护照预约、现行票价与核验规则", url: "https://english.beijing.gov.cn/travellinginbeijing/parks/202603/t20260320_4562532.html", publisher: "北京市人民政府", reviewedAt: "2026-08-12" },
    { label: "官方公园路线、地铁与票务范围", url: "https://english.beijing.gov.cn/specials/parktours/guidevisitors/templeofheaven/", publisher: "北京市人民政府", reviewedAt: "2026-08-12" },
    { label: "丹陛桥官方说明", url: "https://www.tiantanpark.cn/en/Scenic/detail/1389.html", publisher: "天坛公园", reviewedAt: "2026-08-12" },
    { label: "首图：Maros Mraz拍摄的天坛，CC BY-SA 3.0；经裁切并转为WebP", url: "https://commons.wikimedia.org/wiki/File:Temple_of_Heaven,_Beijing,_China_-_009.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ] },
] };
export default body;
