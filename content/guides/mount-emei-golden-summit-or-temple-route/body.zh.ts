import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "峨眉山有两种著名形象，却相隔很大的海拔和时间。金顶是通过长距离景区交通和最后上行抵达的高山图标；寺院与森林组成的是一张古老宗教场所、石阶和生态带网络。一天通常只能选一种；有深度地看两者是两日决定，不是一趟更快的车。" },
  { id: "answer", type: "callout", title: "直接结论", tone: "decision", body: "若高山景观、金顶宗教建筑和海拔感是来访理由，选金顶路线，使用当天官方观光车和索道并接受云雾与停运。若佛教山水、森林步行和中小寺院更重要，选中低山寺院路线。只有住一晚、分开核对运营并有删减方案时，才把两者组合。" },
  { id: "two-mountains-heading", type: "heading", level: 2, text: "规划时把峨眉山当作两座山" },
  { id: "two-mountains", type: "table", caption: "核心选择", columns: ["路线", "得到", "放弃"], rows: [["金顶优先", "高海拔氛围、金顶寺院、主要图标及可能的云海天象", "慢节奏林间寺院序列"], ["寺院森林优先", "万年寺/清音阁等遗产、渐变生态和相连步行", "金顶图标与漫长上行"], ["住一晚组合", "一条高山线加一条中低山线并有恢复", "简单日游；天气住宿进入计划"]] },
  { id: "heritage-heading", type: "heading", level: 2, text: "寺院路线不是次选" },
  { id: "heritage", type: "paragraph", text: "UNESCO把峨眉山描述为佛教在中国建立与传播的重要文化景观，三十多座寺院与山体环境融合，并明确提到万年寺、清音阁、报国寺等。植被从亚热带森林变化到亚高山林。价值在建筑、道路与生态关系，不只在山顶造像。" },
  { id: "summit-heading", type: "heading", level: 2, text: "金顶：受山地条件控制的交通链" },
  { id: "summit", type: "list", ordered: true, items: ["核对当天景区开放、观光车与索道。", "从正确游客中心出发，计算票务、排队和长距离上行。", "带保暖与防雨，沟口和山顶温度、风和能见度不同。", "把云雾当正常山地结果，不为看景走危险路线。", "设最晚下撤时间，保护索道观光车与回酒店。"] },
  { id: "summit-reality", type: "callout", title: "有索道不等于无台阶、无天气风险", tone: "warning", body: "车辆减少大段海拔，但排队、斜坡、台阶、站立和最后步行仍在；索道会因不安全天气暂停。向运营方核对无障碍条件，不能从山顶照片推断轮椅或长者能完成全链条。" },
  { id: "temple-heading", type: "heading", level: 2, text: "寺院路线：只选一段相连宗教山水" },
  { id: "temple", type: "comparison", title: "三种中低山方式", columns: [{ heading: "万年寺锚点", body: "以寺院遗产为主，再加一段确认开放的步行；适合佛教艺术和有边界的一日。" }, { heading: "清音阁与森林", body: "重视水、林和园林式寺院关系，适合更看重山水序列的步行者。" }, { heading: "山门寺院", body: "天气、晚到或行动能力打败上山计划时，使用报国寺/伏虎寺一带作短而低风险替代。" }] },
  { id: "combine-heading", type: "heading", level: 2, text: "不自欺地组合两者" },
  { id: "combine", type: "table", caption: "两日框架，不是时刻表", columns: ["日", "主任务", "删减规则"], rows: [["第一日", "一段中低山寺院森林线", "在影响入住或次日早起前结束"], ["第二日", "按当天官方交通链上金顶", "天气或运营失败时改低山遗产，不危险 improvisation"]] },
  { id: "wildlife", type: "callout", title: "猴子是野生动物，不是保证项目", tone: "warning", body: "不投喂、逗弄、触摸或展示食物；服从标志、保持距离并收好松散物品。路线不能保证遇猴，短视频也不是安全指引。" },
  { id: "failure-heading", type: "heading", level: 2, text: "面对当天真实的山恢复" },
  { id: "failure", type: "table", caption: "问题与恢复", columns: ["问题", "处理"], rows: [["金顶全是云", "判断宗教建筑与山地氛围是否仍值得，不能超过下撤余量"], ["索道/观光车停运", "服从关闭；只有当前通行和日照支持时才改中低山"], ["寺院路湿滑疲劳", "在下一个安全有人点折返，不把单向步行变比赛"], ["抵达过晚", "只看山门遗产或住一晚，不压缩金顶链"], ["高反或生病", "停止上升并求助，登顶可放弃"]] },
  { id: "leshan-boundary", type: "callout", title: "乐山是独立游览日", tone: "neutral", body: "峨眉山与乐山大佛属于同一世界遗产项目，却是两个分离景区。共同遗产身份不让赶场变合理。本页不负责乐山门票、游船或栈道。" },
  { id: "checklist", type: "list", items: ["已查景区公告、交通与索道。", "按实际海拔读取天气、温度和能见度。", "只选一种主路线，第二种是备选或次日。", "准备鞋、衣物、食物和安全下撤决定。", "山上延误后酒店与后续交通仍可行。"] },
  { id: "links", type: "internal-links", title: "连接峨眉山", items: [{ label: "成都城市Hub", href: "/zh/destinations/chengdu/", description: "判断峨眉山与成都夜数关系。" }, { label: "带父母游中国", href: "/zh/guides/china-itinerary-with-older-parents/", description: "安排恢复和山地替代。" }, { label: "行程是不是太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "把景区内部交通也算时间。" }, { label: "中国公共假期", href: "/zh/guides/china-public-holidays-travel-calendar/", description: "山日前检查客流压力。" }, { label: "中国需要导游吗", href: "/zh/guides/do-you-need-a-tour-guide-in-china/", description: "解释价值与基本交通执行分开。" }] },
  { id: "sources", type: "sources", title: "一手来源与图片署名", items: [{ label: "峨眉山—乐山大佛世界遗产说明", url: "https://whc.unesco.org/en/list/779", publisher: "联合国教科文组织世界遗产中心", reviewedAt: "2026-08-22" }, { label: "峨眉山景区官方门户", url: "https://www.ems517.com/", publisher: "峨眉山景区", reviewedAt: "2026-08-22" }, { label: "头图：George N拍摄峨眉山金顶，CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:%E5%B3%A8%E7%9C%89%E5%B1%B1%E9%A3%8E%E6%99%AF%E5%8C%BA_Mount_Emei_Scenic_Area_04.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }] }
] } as const satisfies StructuredPageBody;
export default body;
