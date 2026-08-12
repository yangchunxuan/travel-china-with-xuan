import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "中国没有全国统一的公共 Wi-Fi 登录方式。不同场所可能使用短信、酒店住客信息、工作人员发码或护照自助终端。北京官方机场指南明确介绍了面向没有中国手机号旅客的护照扫描终端：机器会打印账号和密码；这只是特定机场流程，不能推断所有机场、车站或咖啡馆都一样。抵达前应准备独立移动数据，把场所 Wi-Fi 当作有用的备选。" },
  { id: "answer", type: "callout", title: "没有中国手机号时怎么做", tone: "decision", body: "在首都机场，核对官方网络名并找机场上网取号机。大兴机场较新的公告列出 BDIA-FREE-WIFI，可在门户拍摄护照信息页验证，也提供自助终端等方式。其他场所则询问是否支持境外号码短信、护照认证或人工发码；都不支持时停止重试，改用独立移动数据。" },
  { id: "venue-heading", type: "heading", level: 2, text: "先按场所匹配登录路线" },
  { id: "venue-table", type: "table", caption: "提交身份信息前先做判断", columns: ["场所", "可能的方式", "第一步"], rows: [
    ["北京首都机场", "中国手机号短信，或护照/证件取号机", "从当前标识确认 AIRPORT-FREE-WIFI-NEW 和机器位置"],
    ["北京大兴机场", "护照信息页门户、终端、微信或手机号认证", "从当前标识确认较新公告中的 BDIA-FREE-WIFI"],
    ["其他机场或大型车站", "该场所自己的短信、终端、小程序或服务台", "以现场最新指引为准，不套用北京流程"],
    ["酒店", "房号、姓氏、接入码或前台协助", "向前台取得准确 Wi-Fi 名称和登录信息"],
    ["咖啡馆、商场或景点", "短信、应用、消费小票码，也可能没有访客网络", "先问工作人员，别加入名称相似的网络"],
    ["门户无法认证证件", "独立移动数据", "不要反复上传护照照片，直接换连接方式"]
  ] },
  { id: "beijing-heading", type: "heading", level: 2, text: "北京两座机场公开的登录路线并不完全相同" },
  { id: "beijing-list", type: "list", ordered: true, items: [
    "首都机场官方指南列出 AIRPORT-FREE-WIFI-NEW。让登录页在普通浏览器中打开；页面接受中国手机号时可选短信认证。",
    "首都机场没有中国手机号，就寻找官方上网取号机。向工作人员可出示：请问最近的无线上网身份验证自助终端在哪里？",
    "将护照打开到照片页，只插入明确标有护照扫描口的终端；指南所述机器会打印用于门户登录的用户名和密码。",
    "大兴机场 2025 年较新公告列出 BDIA-FREE-WIFI，并说明可在门户拍摄护照信息页验证，也可选择终端、微信或手机号认证。",
    "无论哪座机场，都以现场标识为准，立即取回护照和打印纸；界面与公开流程不同时找官方服务台。"
  ] },
  { id: "beijing-boundary", type: "callout", title: "机器打印账号有使用限制", tone: "neutral", body: "北京指南写明，取号机发出的登录账号有效 5 小时，一份有效证件最多打印 3 次。这些限制只描述该取号路线，不能套用到大兴护照页面验证或写成全国规则；当天仍须以界面为准。" },
  { id: "portal-heading", type: "heading", level: 2, text: "连接后不弹登录页怎么办" },
  { id: "portal-table", type: "table", caption: "区分门户故障和身份认证故障", columns: ["现象", "只尝试一次", "然后停止并求助"], rows: [
    ["显示已连接但没有登录页", "短暂关闭移动数据，打开普通浏览器并重新查看官方说明", "忘记并重新加入已核实网络，向工作人员索取门户地址"],
    ["收不到短信", "检查国家代码，并确认页面明确支持境外号码", "切换护照/人工路线或独立数据"],
    ["护照终端扫描失败", "取下保护套，只对齐照片页，按机器提示操作", "找官方服务台，不把护照交给非工作人员"],
    ["登录后循环跳转", "忘记网络、关闭浏览器后干净重试一次", "不要重复提交，换用其他连接"],
    ["出现证书或域名警告", "立即断开", "先向场所工作人员确认网络名和门户"]
  ] },
  { id: "safety-heading", type: "heading", level: 2, text: "即使连对网络，也别把它当私人网络" },
  { id: "safety-list", type: "list", items: [
    "通过官方标识或工作人员确认完整网络名和登录步骤；不法者可以建立名称很像的热点。",
    "保持系统和浏览器更新，核对网站完整地址并使用 HTTPS。小锁只能说明到该网站的连接被加密，不代表网站本身一定真实。",
    "有自有移动数据时，不要用公共 Wi-Fi 办网银、恢复付款、重置密码、上传护照或处理保密工作。",
    "关闭不需要的文件共享、隔空投送或附近共享；普通访客 Wi-Fi 不应要求你随意安装描述文件或证书。",
    "用完后忘记该网络，并有意识地恢复自动加入设置，别在航站楼移动时持续接入。"
  ] },
  { id: "passport-heading", type: "heading", level: 2, text: "认证时保护好护照" },
  { id: "passport-copy", type: "paragraph", text: "只在标识清晰的官方终端或服务台使用实体护照。遮挡照片页，完成后立即取回，并妥善保管或销毁含账号信息的打印纸。不要拍摄显示完整护照号的终端画面，不要把护照扫描件发给陌生人，也不要在排障时把证件留在机器里。求助时可记录时间、航站楼和错误内容，但不要暴露证件号。" },
  { id: "arrival-heading", type: "heading", level: 2, text: "别让机场 Wi-Fi 承担整个落地计划" },
  { id: "arrival-list", type: "list", ordered: true, items: [
    "出发前离线保存酒店中文地址、机场接驳说明、订单号和地图截图。",
    "按说明提前准备漫游或 eSIM，同时保留接收账号恢复短信的号码。",
    "付款和交通方案不要依赖落地后通过机场 Wi-Fi 临时下载应用。",
    "同行人提前约定失联集合点，以防只有一台手机能上网。",
    "连接公共网络由机场人员协助，敏感账号设置则等有独立连接后再做。"
  ] },
  { id: "failure", type: "callout", title: "所有方式都失败时", tone: "warning", body: "到官方问讯处或服务台询问当前的外籍护照登录方式。场所没有相应服务，就使用漫游、eSIM、本地 SIM 或同行人的可信热点。不要试随机 Wi-Fi 名称，不要向陌生人购买账号，也不要在搜索结果页面输入身份信息。暂时不便上网，总比身份信息泄露安全。" },
  { id: "scope", type: "callout", title: "范围与动态服务边界", tone: "neutral", body: "机场网络名、登录限制、终端位置和证件支持都可能按航站楼调整。下列北京、上海政府页面只支持 2026 年 8 月 12 日复核到的特定机场服务，不保证所有场所都有、速度如何、能访问哪些服务或接受每本护照；FTC 来源支持通用公共 Wi-Fi 安全做法。现场应服从当前界面和官方工作人员指引。" },
  { id: "links", type: "internal-links", title: "为上网方案准备备选", items: [
    { label: "中国 eSIM 还是本地 SIM 卡", href: "/zh/guides/china-esim-vs-local-sim/", description: "抵达前选好独立移动数据路线。" },
    { label: "游客如何在中国付款", href: "/zh/guides/how-to-pay-in-china-as-a-tourist/", description: "不要依赖未知公共网络做付款设置。" },
    { label: "第一次乘中国高铁", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "进站前下载好订单和乘车信息。" }
  ] },
  { id: "sources", type: "sources", title: "已复核的官方与一手来源", items: [
    { label: "连接网络与必要应用：含北京机场 Wi-Fi 步骤", url: "https://english.beijing.gov.cn/latest/specials/essentialtipsfornewarrivals/getconnected/202408/t20240830_3785643.html", publisher: "北京市人民政府", reviewedAt: "2026-08-12" },
    { label: "北京首都机场 Wi-Fi 服务", url: "https://english.beijing.gov.cn/specials/beijingservice/pek/wifi/", publisher: "北京市人民政府", reviewedAt: "2026-08-12" },
    { label: "大兴机场护照 Wi-Fi 服务", url: "https://english.beijing.gov.cn/latest/news/202512/t20251205_4322494.html", publisher: "北京市人民政府", reviewedAt: "2026-08-12" },
    { label: "浦东机场护照 Wi-Fi 更新", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260424/88cde5e96ef242daa534102069450a03.html", publisher: "上海市人民政府", reviewedAt: "2026-08-12" },
    { label: "公共 Wi-Fi 网络安全吗？", url: "https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know", publisher: "美国联邦贸易委员会", reviewedAt: "2026-08-12" }
  ] }
] } as const satisfies StructuredPageBody;

export default body;
