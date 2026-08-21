import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "外滩和陆家嘴不是同一观景台的两个版本。外滩在浦西，身后是近代商业建筑，隔黄浦江看现代天际线；陆家嘴在浦东，你站在高楼之间，回望外滩。先决定想看的画面，再只过一次江。" },
  { id: "answer", type: "callout", title: "直接结论", tone: "decision", body: "第一次傍晚可在最佳光线前先到外滩，走一段有边界的滨水线，再乘当天确认运行的轮渡或地铁到陆家嘴，看近距离高楼。若有定时观景台、博物馆或浦东预约，则反向安排。只有一小时时留在外滩，它无需第二次交通任务就能看清两岸关系。" },
  { id: "difference-heading", type: "heading", level: 2, text: "两岸回答不同问题" },
  { id: "difference", type: "table", caption: "按体验选择", columns: ["一侧", "最适合", "代价"], rows: [["外滩/浦西", "历史建筑、完整陆家嘴天际线、长滨水步道和两岸对照", "只是在看高楼，热门时段拥挤"], ["陆家嘴/浦东", "体验高楼尺度、观景台、商场博物馆及回望外滩", "地面视线被楼体切割，部分位置看外滩不完整"], ["两岸", "把上海读成两个相连的城市故事", "过江耗时，没计划会浪费最佳光线"]] },
  { id: "bund-heading", type: "heading", level: 2, text: "在外滩要同时看江对面和身后" },
  { id: "bund", type: "paragraph", text: "上海市政府把外滩描述为约1.5公里的历史保护滨水区，西侧有52幢哥特式、巴洛克式等建筑。真正游览不是只拍一次天际线：走一段合适距离，转身观察立面和入口，再回到江边理解旧金融贸易岸线如何面对后来出现的浦东。" },
  { id: "lujiazui-heading", type: "heading", level: 2, text: "到陆家嘴只选一种地面或垂直体验" },
  { id: "lujiazui", type: "comparison", title: "不要把所有浦东项目叠在一起", columns: [{ heading: "地面滨江", body: "体验东岸步道和一处高楼近景，适合重视过江与城市尺度、不想买观景台的人。" }, { heading: "一个观景台", body: "按实时开放、天气、能见度和入口选择一栋。预约时段可能决定先去哪岸，本页不做商业排名。" }, { heading: "博物馆或室内锚点", body: "用一个场馆/商场作天气备选，再保留短室外段。规则仍由各场馆负责。" }] },
  { id: "light-heading", type: "heading", level: 2, text: "保护从白天到夜晚的过渡" },
  { id: "light", type: "table", caption: "一次过江顺序", columns: ["时段", "动作", "原因"], rows: [["下午稍晚", "有日光时读外滩建筑", "天黑后立面故事会被天际线抢走"], ["暮色", "守住一个浦西视点，不要不断换位置", "天空变化比另一个地图点更重要"], ["亮灯后", "乘已确认的轮渡或地铁过江一次", "两岸构图已经完成"], ["夜间", "在陆家嘴选一个滨江或高楼体验", "近距离城市尺度成为第二故事"]] },
  { id: "crossing-heading", type: "heading", level: 2, text: "按当天真实运营选择过江方式" },
  { id: "crossing", type: "comparison", title: "轮渡、地铁或观光隧道", columns: [{ heading: "公共轮渡", body: "过江本身就是体验。航线和时间属于运营事实，上海官方指南要求在“上海轮渡”渠道重查。" }, { heading: "地铁", body: "恶劣天气更稳，起终点靠近车站时更实用；它没有江面景观，站内外步行仍要算。" }, { heading: "观光隧道", body: "这是江下的独立付费项目，不替代两岸选择。只有它本身是目标时才在核对运营后使用。" }] },
  { id: "ferry", type: "callout", title: "不要把轮渡时刻写死", tone: "warning", body: "上海当前游客指南介绍东金线连接东金陵路和东昌路，并要求通过“上海轮渡”微信渠道查看更新。天气、维护或线路调整都可能介入。走向码头前核对完整名称和运营，并保存地铁备选。" },
  { id: "short-plans-heading", type: "heading", level: 2, text: "按真实可用时间安排" },
  { id: "short-plans", type: "table", caption: "时间对应方案", columns: ["时间", "方案", "删除"], rows: [["约一小时", "外滩一段步行与陆家嘴天际线", "过江和观景台"], ["两三小时", "外滩细节、暮色视点、一次过江和短浦东滨江", "多个观景台、商场和博物馆"], ["半天", "再加一个适合天气的室内或垂直锚点", "功能重复的第二个商业视点"]] },
  { id: "recovery", type: "table", caption: "计划失败时", columns: ["问题", "恢复"], rows: [["雾雨看不到天际线", "读外滩建筑并选浦东室内项目，不盲买观景票"], ["轮渡停运", "改用已保存地铁，保持单向路线"], ["人群堵住栏杆", "走向较松的合法区段，不进入车道或推挤"], ["预约观景台延误", "只有新顺序仍保护预约时才反转两岸"]] },
  { id: "boundary", type: "callout", title: "本页不是上海景点百科", tone: "neutral", body: "它只负责两岸选择、光线顺序和过江逻辑；不排名所有高楼、游船、餐厅和博物馆，也不重复机场交通或把每幢外滩建筑拆成薄页。" },
  { id: "links", type: "internal-links", title: "继续规划上海", items: [{ label: "上海城市Hub", href: "/zh/destinations/shanghai/", description: "把两岸放入完整市区路线。" }, { label: "上海住哪里", href: "/zh/guides/shanghai-where-to-stay-first-trip/", description: "按反复任务而不是一晚夜景选区域。" }, { label: "浦东还是虹桥机场", href: "/zh/guides/shanghai-pudong-or-hongqiao-airport/", description: "机场选择与浦东观光分开。" }, { label: "上海出发选择水乡", href: "/zh/guides/shanghai-water-town-zhujiajiao-tongli-wuzhen/", description: "比较江南一日游，不把它和上海滨水日混在一起。" }, { label: "上海到杭州交通", href: "/zh/guides/shanghai-hangzhou-transport-route/", description: "下一城车票对应正确端点。" }] },
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [{ label: "外滩历史街区与滨水区", url: "https://english.shanghai.gov.cn/en-ScenicSpots/20231205/584672cc6d044eabb5f7f6fc9049a19f.html", publisher: "上海市人民政府", reviewedAt: "2026-08-22" }, { label: "上海官方轮渡和黄浦江过江指南", url: "https://english.shanghai.gov.cn/en-Transportation/20250910/65267b72530645bdacc119d56380d363.html", publisher: "上海市人民政府", reviewedAt: "2026-08-22" }, { label: "头图：Kallerna从外滩拍摄陆家嘴，CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Lujiazui_from_The_Bund.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }] }
] } as const satisfies StructuredPageBody;
export default body;
