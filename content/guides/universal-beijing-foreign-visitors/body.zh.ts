import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "北京环球度假区不是七个主题区任意排列就能“刷完”的清单。外国游客先要建立干净一致的护照实名订单；进入乐园后，天气、项目状态、演出、身高限制和排队才成为实时事实。用优先级和空间组织一天，并把恢复能力写进计划。" },
  { id: "answer", type: "callout", title: "直接结论", tone: "decision", body: "从北京环球度假区或北京市政府列明的渠道购票，逐字输入护照信息并携带护照原件。提前安装官方App。选一个不可替代的主题区、一个主项目和一个演出或全组体验；入园后先看实时地图，按相邻片区完成，不根据旧排队预测横穿乐园。每个区域都准备一个替代项。" },
  { id: "identity-heading", type: "heading", level: 2, text: "让护照、订单和App一致" },
  { id: "identity", type: "table", caption: "入园前链条", columns: ["项目", "核对", "失败边界"], rows: [["购票订单", "日期、产品、人数和官方/授权卖家", "平台截图不等于入园记录"], ["护照", "姓名和号码与订单一致", "不可编造中国身份证或接手他人实名票"], ["官方App/小程序", "版本、登录和实时地图正常", "按钮与绑定流程会改变"], ["证件原件", "由游客携带而不是留在酒店", "护照照片只是备份，不是承诺可替代"]] },
  { id: "official-buy", type: "paragraph", text: "北京市政府英文服务页说明，外国游客可通过北京环球度假区App、官方飞猪旗舰店或联系中心购票，并须提供护照资料。度假区官网提供当前票务、App和联系方式。境外支付或账号流程失败时，应联系官方渠道，不要反复向相似网站提交身份信息。" },
  { id: "privacy", type: "callout", title: "人脸验证须阅读实时隐私说明", tone: "neutral", body: "度假区介绍了用于入园等场景的照片验证，也说明游客可以联系员工、到游客服务选择退出或了解详情。预先上传照片前阅读当前通知。本页不教人绕过验证，也不保证某一种方式届时可用。" },
  { id: "app-heading", type: "heading", level: 2, text: "把官方App当作当天控制台" },
  { id: "app-list", type: "list", items: ["当天核对开放日历、项目状态、演出和地图。", "逐个查看适合本人的项目限制。", "提前找到游客服务、医疗、储物柜和行李寄存。", "准备第二部有电设备或纸面订单资料。", "把优速通视为有实时条款的可选产品，不当作保证。"] },
  { id: "route-heading", type: "heading", level: 2, text: "围绕一个主主题区建立路线" },
  { id: "route", type: "comparison", title: "三种诚实的一日方式", columns: [{ heading: "首次抽样", body: "选一个主主题区、另一处主项目和一场演出，其余时间就近体验。适合同行者喜好不同。" }, { heading: "刺激项目主导", body: "保住两三项适合自己的高强度项目并读清安全限制，接受主题区深度、购物和角色体验减少。" }, { heading: "亲子或混合组", body: "以全组项目、演出、吃饭和坐下恢复为核心；只有成人、证件、手机和集合点独立时才短时分组。" }] },
  { id: "geography", type: "paragraph", text: "不要因为等待数字降了几分钟就来回横穿。走过去时数字还会变。先完成主主题区的必做与附近备选，再移动一次。城市大道位于门票任务之外；不要把最好的运营时段花在可稍后解决的购物和餐厅上。" },
  { id: "day", type: "table", caption: "可恢复的一天节奏", columns: ["时段", "决定", "避免"], rows: [["入园前", "核对证件、实时信息和第一个主区", "在闸机重新设计全天"], ["第一时段", "完成主区或附近替代项", "追逐暂停项目"], ["中午", "吃饭补水并观察最疲弱成员", "把疲劳当作浪费"], ["下午", "第二片区加一项全组目标", "重新塞回所有错过项目"], ["最后", "回到剩余优先项或享受氛围", "依赖最后一分钟重开"]] },
  { id: "weather", type: "callout", title: "天气不仅影响舒适度", tone: "warning", body: "高温、雷电、大风、降雨、结冰或空气状况都可能改变室外项目和演出。准备合法的室内/坐下备选，穿合适衣物并听从员工指令。门票和优速通都不能要求运营方在不安全时运行。" },
  { id: "failure-heading", type: "heading", level: 2, text: "恢复时不要把问题放大" },
  { id: "failure", type: "table", caption: "问题与恢复", columns: ["问题", "处理"], rows: [["护照信息错误", "出发前联系官方卖家或度假区，不建立第二套冲突身份"], ["App/小程序失效", "保留护照与订单，使用官网、联系中心或游客服务"], ["主项目停运", "先去附近替代项，稍后再查并保住全组体验"], ["同行失散", "按预先约定的实体集合点和时间重聚"], ["行李过大", "只使用当前官方寄存，并现场读尺寸、费用与关闭条件"]] },
  { id: "return", type: "paragraph", text: "给回北京市区留出余量。保存中文的官方公共交通或接送点，设最晚离园时间，不在乐园后紧接不可错过的航班或火车。闭园时间不等于末班地铁、短出租队或畅通道路的保证。" },
  { id: "check", type: "list", items: ["每位游客订单与护照原件一致。", "官方App、地图和联系入口在有电设备上正常。", "营业时间、天气、限制和演出已重查。", "已选主主题区、主项目、全组目标与附近替代。", "返程路线和最晚离园决定已保存。"] },
  { id: "links", type: "internal-links", title: "继续规划北京", items: [{ label: "北京城市Hub", href: "/zh/destinations/beijing/", description: "安排夜数及乐园与首次北京行关系。" }, { label: "北京住哪里", href: "/zh/guides/beijing-where-to-stay-first-trip/", description: "选择也适合其他北京任务的区域。" }, { label: "北京哪个火车站", href: "/zh/guides/which-beijing-railway-station/", description: "让已出票车站与返程一致。" }, { label: "中国公共假期", href: "/zh/guides/china-public-holidays-travel-calendar/", description: "购票前检查高压日期。" }, { label: "中国充电宝规则", href: "/zh/guides/china-power-bank-rules-flights-trains/", description: "保持App电量且符合交通要求。" }, { label: "行程是不是太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "不要把乐园贴在脆弱的跨城换乘上。" }] },
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [{ label: "外国游客购票与护照要求", url: "https://english.beijing.gov.cn/consuminginbeijing/faq/202306/t20230630_3151223.html", publisher: "北京市人民政府", reviewedAt: "2026-08-22" }, { label: "游客服务、App与寄存", url: "https://www.universalbeijingresort.com/en/ubrbasepage/youkefuwu", publisher: "北京环球度假区", reviewedAt: "2026-08-22" }, { label: "官方联系中心", url: "https://www.universalbeijingresort.com/en/contact/contactus", publisher: "北京环球度假区", reviewedAt: "2026-08-22" }, { label: "照片验证与退出说明", url: "https://www.universalbeijingresort.com/en/photo-validation-system-introduction", publisher: "北京环球度假区", reviewedAt: "2026-08-22" }, { label: "头图：Hhhh2拍摄的北京环球度假区，CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Universal_Beijing_Resort.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }] }
] } as const satisfies StructuredPageBody;
export default body;
