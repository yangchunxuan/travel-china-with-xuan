import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "北京两座主要机场方向不同。从北京南站接航班，要先读机场代码与航站楼，再从航班截止倒减铁路出站、市内接驳、机场步行与航空公司手续。" },
  { id: "answer", type: "callout", title: "PEK与PKX不能互换", tone: "decision", body: "去PKX可比较地铁接到草桥大兴机场线与公路车辆；去PEK可比较当前北京南站机场巴士、地铁/机场线与公路车辆。准确时间、行李、人数和中断缓冲会改变答案。" },
  { id: "matrix-heading", type: "heading", level: 2, text: "先选机场，再选方式" },
  { id: "matrix", type: "table", caption: "所有方案都从真正走出火车后开始", columns: ["链路", "合适", "摩擦", "核对"], rows: [
    ["北京南→地铁→大兴机场线→PKX", "白天、行李可控且铁路在运营", "站内通道、换乘、单独机场线与航站楼步行", "当前地铁路线、末班与航站楼"],
    ["北京南→当前机场巴士→PEK", "当天发车合适且站点清楚", "候车、道路、中途站与航站楼顺序", "官方平台、上车点、发车与服务航站楼"],
    ["北京南→地铁/机场线→PEK", "铁路运营且换乘适合同伴", "跨城换乘与提行李穿站", "实时路线、运营时段与航站楼"],
    ["合规出租车/网约车→任一机场", "多人、大件行李或铁路关闭", "道路波动、上车区和道路费用", "机场代码、航站楼、合规上车与缓冲"],
  ]},
  { id: "warning", type: "callout", title: "不要只跟着“北京机场”走", tone: "warning", body: "给司机看PEK或PKX以及航站楼。大兴不是首都机场的新航站楼，首都也不是大兴的一座航站楼。去错机场会变成跨机场恢复，不是小绕路。" },
  { id: "clock-heading", type: "heading", level: 2, text: "从航空公司截止倒推" },
  { id: "clock", type: "list", ordered: true, items: ["值机/托运行李与登机截止。", "正确航站楼步行和安检/出境。", "道路或铁路行程与中断缓冲。", "北京南站站台到出口与上车/换乘。", "火车晚点余量与放弃原方案的决策点。"] },
  { id: "groups", type: "comparison", title: "旅客条件如何改变方案", columns: [
    { heading: "轻装、白天", items: ["铁路结构较可预测", "保存每个换乘名", "仍核对末班"] },
    { heading: "家庭或多个箱子", items: ["计算电梯与通道", "直接公路车辆可能更简单", "明确儿童座椅需求"] },
    { heading: "晚到或国际航班", items: ["使用更大缓冲", "知道实时巴士/铁路截止", "机场附近过夜可能更安全"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "去错机场或衔接失败" },
  { id: "recovery", type: "table", caption: "先保护航班，再保护原计划", columns: ["问题", "应对"], rows: [
    ["火车晚到", "按航空公司截止重算，只换到已确认更快的链路"],
    ["到了错误机场", "立刻联系航空公司，再用当前官方跨机场或公路方案"],
    ["旧攻略写北京南直达大兴巴士", "不要依赖：北京南至大兴夜间2线自2026年4月7日起暂停"],
    ["错过末班铁路", "使用官方机场巴士平台或合法出租车队列，不跟大厅人员走"],
  ]},
  { id: "facts", type: "callout", title: "动态交通信息核验于2026年8月12日", tone: "neutral", body: "北京2026年4月通知保留并调整首都机场至北京南巴士，同时暂停大兴机场至北京南夜间2线；7月通知延长首都机场线路进城晚间服务。地铁、机场线、巴士、站点与时刻仍按日期变化。" },
  { id: "help", type: "callout", title: "需要压力测试空铁衔接？", tone: "decision", body: "提供日期、车次/到达时间、机场代码与航站楼、航班时间、人数和行李。Homeground可找出决策截止与备选，实时服务由航空公司和运营方决定。" },
  { id: "links", type: "internal-links", title: "保护完整行程", items: [
    { label: "北京应该选哪个火车站", href: "/zh/guides/which-beijing-railway-station/", description: "确认火车真的到北京南。" },
    { label: "第一次坐中国高铁", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "在机场交接前准备铁路段。" },
    { label: "国际航班前最后一晚", href: "/zh/guides/china-last-night-before-international-flight/", description: "判断何时不应同日接驳。" },
    { label: "第一次去北京住哪里", href: "/zh/guides/beijing-where-to-stay-first-trip/", description: "接驳不可靠时安排一晚酒店。" },
  ]},
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
    { label: "2026年4月机场巴士调整", url: "https://english.beijing.gov.cn/latest/news/202603/t20260330_4569792.html", publisher: "北京市政府", reviewedAt: "2026-08-12" },
    { label: "2026年7月机场巴士更新", url: "https://english.beijing.gov.cn/livinginbeijing/transportation/bus/202607/t20260727_4792045.html", publisher: "北京市政府", reviewedAt: "2026-08-12" },
    { label: "七座火车站与两座机场接入轨道", url: "https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202412/t20241216_3966828.html", publisher: "北京市政府", reviewedAt: "2026-08-12" },
    { label: "首图：N509FZ拍摄北京南站，CC BY-SA 4.0，已裁切", url: "https://commons.wikimedia.org/wiki/File:North_square_of_Beijing_South_Railway_Station_(20180722170459).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
