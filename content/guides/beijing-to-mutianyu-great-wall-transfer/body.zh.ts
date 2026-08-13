import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "decision-lead", type: "lead", text: "慕田峪不是从每家北京酒店出发都能一车直达。有效比较要包括去出发点、怀柔换乘、景区入口，以及从长城下来后仍能接上的回程。" },
    { id: "quick-answer", type: "callout", title: "离开北京前先选回程", tone: "decision", body: "时间灵活、行李轻的独立旅行者可使用官方公交；日期明确的旅游直通车，只有上下车点和回程时间合适时才真正省事。家庭、父母同行、时间紧或当晚还要赶航班火车时，预先安排车辆带来的确定性往往比表面节省的车程更重要。" },
    { id: "matrix-heading", type: "heading", level: 2, text: "三种方式前往同一段长城" },
    { id: "decision-matrix", type: "table", caption: "比较完整接驳与最后一条安全回程", columns: ["方案", "通常适合", "实际负担", "必须核对"], rows: [
      ["公交换乘", "成年人、轻装、时间灵活且白天回程", "市区出发点、怀柔换乘、等车和站名混淆", "当前线路、运营时段和最后可用回程"],
      ["旅游直通车", "当天上下车点与游览时长正好匹配", "固定出发点与固定回程", "官方运营方、准确站点、包含项目与日期"],
      ["预先安排车辆", "家庭、父母、时间有限或后续有固定交通", "成本较高与会合安排", "合规车辆、上车定位、等待条款与儿童座椅"],
    ]},
    { id: "public-heading", type: "heading", level: 2, text: "官方公交通常需要在怀柔换乘" },
    { id: "public-copy", type: "paragraph", text: "北京官方游客信息目前写明：东直门乘916快车到怀柔北大街，再换乘开往慕田峪方向的H线公交。线路、站点和时间都会变化。保存中文站名，核对当天回程，并把怀柔换乘的较长等待视为可能发生。" },
    { id: "entrance-warning", type: "callout", title: "到达景区不等于已经登上长城", tone: "warning", body: "交通下车点、游客服务区、检票，以及可能需要的内部摆渡或上山系统是不同环节。门票和缆车不属于本交通页；先向景区核对，才能知道回程还剩多少缓冲。" },
    { id: "clock-heading", type: "heading", level: 2, text: "把一天拆成五段来计时" },
    { id: "clock-list", type: "list", ordered: true, items: ["酒店到正确的北京出发点。", "去程车辆与每次计划换乘。", "下车点到真正登城入口。", "城墙上的时间、下山与集合。", "完整的安全回程，而不只是末班车发车时间。"] },
    { id: "people-heading", type: "heading", level: 2, text: "行动能力会改变交通答案" },
    { id: "people-comparison", type: "comparison", title: "让接驳符合同行人", columns: [
      { heading: "独立成年人", items: ["公共交通可以合理", "带好电量与中文站名", "为延误预留时间"] },
      { heading: "儿童或父母", items: ["减少站立和不确定等待", "换乘时全组同行", "计划洗手间与避雨处"] },
      { heading: "行李或后续火车", items: ["不要带箱子反复换乘去景区", "出发前合规寄存", "避免同晚安排过紧的衔接"] },
    ]},
    { id: "late-heading", type: "heading", level: 2, text: "晚出发会先减少选项，不只是缩短游览" },
    { id: "late-table", type: "table", caption: "计划变化时怎么处理", columns: ["问题", "第一步", "不要"], rows: [
      ["错过直通车", "查运营方官方退改与当前公交路线", "跟随不明司机乘坐未确认车辆"],
      ["到了错误怀柔站", "向工作人员展示保存的中文目的地", "只看线路号、不确认方向就上车"],
      ["回程有风险", "离开景区并锁定下一段已确认交通", "无备选地等待最后一班"],
      ["恶劣天气或关闭", "查看景区与北京官方通知", "把交通票当成开放证明"],
    ]},
    { id: "fact-check", type: "callout", title: "动态交通信息核验于2026年8月13日", tone: "neutral", body: "北京官方游客页面目前说明东直门、怀柔与慕田峪的公共交通衔接。线路号、站点、运营时间、旅游巴士产品、景区时间和夜游日期均可能变化，出发前要重查。" },
    { id: "help-callout", type: "callout", title: "需要把接驳放进你的北京行程？", tone: "decision", body: "提供日期、酒店、人数、行动需求、行李，以及当晚固定火车或航班。Homeground可以找出可行路线与复核点，但不承诺实时路况或景区开放。" },
    { id: "internal-links", type: "internal-links", title: "让北京行程接得起来", items: [
      { label: "第一次去北京住哪里", href: "/zh/guides/beijing-where-to-stay-first-trip/", description: "住宿区域会改变第一段与最后一段。" },
      { label: "北京应该选哪个火车站", href: "/zh/guides/which-beijing-railway-station/", description: "用正确车站保护后续列车。" },
      { label: "外国游客去故宫", href: "/zh/guides/forbidden-city-for-foreign-visitors/", description: "把另一个交通和预约都较复杂的北京日单独规划。" },
      { label: "你的中国行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "不要把两个困难日塞入脆弱时间表。" },
    ]},
    { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
      { label: "慕田峪游客与公交信息", url: "https://english.beijing.gov.cn/travellinginbeijing/attractions/202603/t20260325_4566115.html", publisher: "北京市政府", reviewedAt: "2026-08-12" },
      { label: "2026年慕田峪夜游通知", url: "https://english.beijing.gov.cn/latest/news/202606/t20260630_4738683.html", publisher: "北京市政府", reviewedAt: "2026-08-12" },
      { label: "首图：Lloyd Tudor拍摄慕田峪，CC BY-SA 4.0，已裁切", url: "https://commons.wikimedia.org/wiki/File:The_Mutianyu_section_of_the_Great_Wall_of_China.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
      { label: "首图衍生文件许可证：CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
    ]},
  ],
} as const satisfies StructuredPageBody;

export default body;
