import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "朱家角、同里和乌镇都有河道、石桥与江南建筑，却解决三种不同旅程。朱家角是从上海低摩擦出发的一日水乡；同里把居民水乡肌理与重要古典园林放在一起；乌镇则提供东栅、西栅和夜间运营构成的完整过夜环境。按交通承受力和整条路线缺少的体验，只选一座。" },
  { id: "answer", type: "callout", title: "直接结论", tone: "decision", body: "想从上海轻松当日往返，选朱家角；路线已有苏州，且重视退思园和较安静河网，选同里；能住一晚并重视经营完整的夜景与早晚氛围，选乌镇。除非水乡史就是旅程主轴，不必花两天收集相似桥景。" },
  { id: "matrix-heading", type: "heading", level: 2, text: "三座水乡决策矩阵" },
  { id: "matrix", type: "table", caption: "一座水乡，一个角色", columns: ["水乡", "最佳用法", "主要代价"], rows: [["朱家角", "从上海半日/一日往返，跨城摩擦最小", "日游客压力更大，通常不值得换酒店"], ["同里", "与苏州相连的一日或安静过夜，以河网和退思园为核心", "需额外上海—苏州/同里交通和实时景点复核"], ["乌镇", "专门住一晚，看西栅晚间和较大度假式水乡", "投入最高；分区票务和多段换乘不适合随便半日"]] },
  { id: "zhujiajiao-heading", type: "heading", level: 2, text: "朱家角：选择可达性与街市生活" },
  { id: "zhujiajiao", type: "paragraph", text: "上海市政府资料把朱家角定位在距中心城区约40公里的历史文化街区，拥有桥梁、河道与保存建筑。最大优势是仍在上海旅行系统内。需要水乡质感但不想加酒店或跨城铁路时最合适。走过入口最拥挤桥段，只选一处收费室内，并留充足返城时间。" },
  { id: "tongli-heading", type: "heading", level: 2, text: "同里：用一座园林锚定水乡" },
  { id: "tongli", type: "paragraph", text: "苏州市政府把同里描述为由河道分成岛屿、老桥相连的古镇。退思园属于苏州古典园林世界遗产。这使同里拥有比“看桥”更明确的任务：理解私家园林、宅院、街巷和水网如何组成生活空间。若苏州已经在路线中，同里最顺。" },
  { id: "wuzhen-heading", type: "heading", level: 2, text: "乌镇：选择从傍晚到清晨的变化" },
  { id: "wuzhen", type: "paragraph", text: "乌镇官方旅游网站区分较早开发的东栅和规模更大的西栅，并说明西栅以保护开发方式组合住宿、游船、游客服务和夜景。对一部分游客，这是完整性；对另一部分则是经营感。选择它是为了完整夜晚与清晨，不要宣称它最原始或最少商业化。" },
  { id: "what-you-miss", type: "comparison", title: "补整条路线真正缺的内容", columns: [{ heading: "没有苏州，也没空住一晚", body: "朱家角用最少路线破坏增加水乡一日。" }, { heading: "已经游苏州园林", body: "同里能延伸园林与河道主题；若第二座水乡只会重复，就跳过。" }, { heading: "需要慢过夜", body: "乌镇的昼夜变化最强，应尽早抵达并住到足以抵消换乘。" }] },
  { id: "day-overnight-heading", type: "heading", level: 2, text: "一日还是过夜" },
  { id: "day-overnight", type: "table", caption: "住宿决定", columns: ["模式", "匹配", "原因"], rows: [["上海半日", "朱家角", "晚起也可恢复且不用换酒店"], ["苏州基地一日", "同里", "城市和园林语境近"], ["专门一晚", "乌镇", "亮灯后和早街道是价值核心"], ["拖大行李的换乘日", "通常都不选", "寄存、转车和入住会淹没遗产游览"]] },
  { id: "authenticity", type: "callout", title: "不要给“原真性”打一个总分", tone: "neutral", body: "三处都是居民、保护、旅游和商业以不同比例共同塑造的活地方。乌镇公开记录规划型保护与旅游模式；同里保留居民古镇并有收费遗产；朱家角混合开放街巷和经营景点。应问哪一种帮助你理解地方，而不是哪座能假装旅游从未发生。" },
  { id: "transport", type: "list", items: ["先选镇再买交通，近名车站与景区门不等价。", "同时确认末段道路/地铁和返程，不只看跨城火车。", "去乌镇要分清东栅、西栅、游客中心和住宿入住点。", "去同里要核对计划园林和收费景点当天开放。", "去朱家角要准备能承受晚间拥挤或天气的返沪路线。"] },
  { id: "failure", type: "table", caption: "失败与恢复", columns: ["问题", "处理"], rows: [["雨天", "用有遮盖室内和短河道线，注意石面湿滑"], ["收费景点关闭", "保住古镇步行和一处替代室内，不找非官方绕行"], ["入口太挤", "离开第一座桥和入口商业群，缩短购物"], ["换乘延误", "保护酒店或末班，不为证明行程硬塞收费区"], ["已看过相似水乡", "只看独特园林/治理/历史层，否则跳过第二座"]] },
  { id: "boundary", type: "callout", title: "一张比较页拥有选择任务", tone: "decision", body: "“上海附近最佳水乡”“朱家角还是同里”“乌镇值不值得过夜”等近义任务都合并在本页。不会另建薄比较页，也不替代上海—苏州—杭州—南京的大路线顺序。" },
  { id: "links", type: "internal-links", title: "连接江南路线", items: [{ label: "上海城市Hub", href: "/zh/destinations/shanghai/", description: "判断水乡是否胜过另一个上海日。" }, { label: "沪苏杭宁路线顺序", href: "/zh/guides/shanghai-suzhou-hangzhou-nanjing-route-order/", description: "先排城市和夜数，再加古镇。" }, { label: "如何读苏州园林", href: "/zh/guides/how-to-read-a-suzhou-garden/", description: "理解让同里不同的园林语言。" }, { label: "上海到杭州交通", href: "/zh/guides/shanghai-hangzhou-transport-route/", description: "跨城端点与水乡绕行分开。" }, { label: "行程是不是太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "测试多一次换乘是否真有增量。" }] },
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [{ label: "朱家角历史文化街区", url: "https://english.shanghai.gov.cn/en-HeritageZones/20240827/66903de4b44047a5aeb1284a2148fc09.html", publisher: "上海市人民政府", reviewedAt: "2026-08-22" }, { label: "同里古镇", url: "https://english.suzhou.gov.cn/szsenglish/sz5ajjq/201911/5212c69295364f8cb2c55ee5d5f13dcc.shtml", publisher: "苏州市人民政府", reviewedAt: "2026-08-22" }, { label: "乌镇官方介绍与保护模式", url: "https://www.wuzhen.com.cn/web/introduction?id=2", publisher: "乌镇旅游", reviewedAt: "2026-08-22" }, { label: "乌镇当前游客与票务信息", url: "https://www.wuzhen.com.cn/web/traver/info", publisher: "乌镇旅游", reviewedAt: "2026-08-22" }, { label: "头图：Chensiyuan拍摄朱家角，CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:1_zhujiajiao_ancient_water_town_2023.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }] }
] } as const satisfies StructuredPageBody;
export default body;
