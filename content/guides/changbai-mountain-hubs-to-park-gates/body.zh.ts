import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "先选景区入口，再选交通枢纽。已经订北景区，最顺的链路通常是长白山站，加池北区或二道白河镇住宿；已经订西景区，则优先比较长白山西站和长白山机场，并住在池西区或松江河镇一侧。北坡和西坡不是同一个游客中心的两扇门，而是两套分开的运营区域。" },
  { id: "direct-answer", type: "callout", title: "路线以景区订单上的中文名称为准", tone: "decision", body: "订单写“北景区”，就把“长白山站”和池北区/二道白河镇作为默认组合；订单写“西景区”，就比较“长白山西站”或“长白山机场”和池西区/松江河镇。出发前还要从景区官方公告确认当天实际使用的游客中心。不要只凭地图上的“长白山”三个字订票。" },
  { id: "tree-heading", type: "heading", level: 2, text: "入口优先的决策树" },
  { id: "decision-tree", type: "list", ordered: true, items: [
    "打开有日期的景区订单，抄下“北景区”或“西景区”；一张天池照片无法说明入口在哪一侧。",
    "订单是北景区：铁路先查“长白山站”，住宿先查“二道白河镇”或“池北区”。",
    "订单是西景区：比较“长白山西站”和“长白山机场”，住宿先查“松江河镇”或“池西区”。",
    "入口尚未确认：先不要锁定不可退的火车、机票和酒店链路。",
    "出行当天：再次核对景区运营、12306或航司记录、道路天气和最后一段正规接驳的上车点。"
  ]},
  { id: "identity-matrix", type: "table", caption: "这里说明枢纽身份，不承诺某一班车", columns: ["票面枢纽", "默认适用", "主要摩擦", "付款前保护"], rows: [
    ["长白山站 · Changbaishan", "北景区；池北区/二道白河镇", "若第二天一早去西景区，就要接受较长的跨区公路移动", "确认车次确实停靠本站，并确认北景区游客中心的接驳点"],
    ["长白山西站 · Changbaishanxi", "西景区；松江河镇/池西区", "英文名相似，但它和长白山站是两座不同车站", "抄全中文站名，并让酒店确认接站区域"],
    ["长白山机场 · Changbaishan Airport", "西侧度假区或西景区链路", "航班延误和行李提取可能错过预约车辆", "确认航站楼接人点、深夜处理方式，以及车辆是否送到确切酒店"],
    ["延吉、长春等外部枢纽", "本地机票或车票时间不合适时的备选", "增加长距离铁路或公路段，也增加天气暴露", "比较完整门到门链路，并保留中途住宿，而不是只比较票价"]
  ]},
  { id: "chains-heading", type: "heading", level: 2, text: "把路线一直接到当天运营的游客中心" },
  { id: "chains", type: "comparison", title: "三条可执行链路", columns: [
    { heading: "北景区链路", items: ["火车票：长白山站", "第一晚：池北区 / 二道白河镇", "确认当前使用的北景区游客中心", "从公告指定地点进入景区正规换乘系统"] },
    { heading: "西景区铁路链路", items: ["火车票：长白山西站", "第一晚：池西区 / 松江河镇", "确认酒店或正规车辆在正确站区接人", "前往当天使用的西景区集散中心"] },
    { heading: "西景区航空链路", items: ["航班：长白山机场", "在司机等候截止前先提取行李", "确认第一站是酒店还是西景区集散中心", "晚到时保留先住酒店的方案"] }
  ]},
  { id: "scenario-heading", type: "heading", level: 2, text: "看起来相似，却需要不同枢纽的行程" },
  { id: "scenarios", type: "table", caption: "优先保护第一个真正能用的登山日", columns: ["旅客情况", "更稳妥的方案", "什么情况会改变结论"], rows: [
    ["一家人坐火车到达，第二天订了北景区", "到长白山站，在池北区或二道白河镇住一晚", "景区订单改变、车次不经长白山站，或没有确认晚到接站"],
    ["两人傍晚落地，已经订西景区", "机场接到西侧酒店，休息后再查运营信息并游览", "航班大幅延误、道路预警或景区停运时，酒店就是当天终点"],
    ["住西侧滑雪度假区，但安排一天北景区", "西侧抵达不变，北景区当天视为单独的跨区公路任务", "天气差或入园早，可能值得提前把一晚移到池北区"],
    ["有人带大箱，也有人走路较慢", "选同一侧枢纽和酒店，提前索取精确车辆会合点", "不要接受未经核实的“送到山门附近”，剩余冰雪路或台阶可能仍很长"]
  ]},
  { id: "winter-heading", type: "heading", level: 2, text: "冬季天气会改变当天的运营方案" },
  { id: "winter", type: "callout", title: "有票不等于山路和主峰段一定开放", tone: "warning", body: "景区可能因大风、降雪、结冰或能见度调整内部交通，甚至暂停部分区域。冬季安排也会随雪季变化。前一晚和离开酒店前，都要查长白山景区官方公告以及中国气象局的预报和预警。第一晚应留在正确的一侧，不要把当天到达、上主峰和长距离离开压成一条没有余量的链路。" },
  { id: "recovery-heading", type: "heading", level: 2, text: "到错坡、到错枢纽或道路中断时怎么恢复" },
  { id: "recovery", type: "table", caption: "不要为了赶当天行程而编造可行时间", columns: ["故障", "立即处理", "安全降级"], rows: [
    ["订西景区，却到了长白山站", "先留在池北一侧，核实正规跨区车辆和景区状态", "把西景区移到另一天，或改订同侧住宿；不要在时间压力下坐来源不明的车"],
    ["订北景区，却到了长白山西站或机场", "让酒店或官方交通服务点确认当天公路方案和实际抵达时间", "先住西侧，若规则允许就调整北景区订单，白天再转移"],
    ["火车或航班晚于接站时间", "离开枢纽前先联系预约司机或酒店，并使用正规出租车/网约车区域", "当天只去酒店，不追赶已经关闭的游客中心"],
    ["出现道路预警或景区停运", "服从官方公告，取消已经失去目的的车辆链路", "保留同侧酒店，等运营恢复后再安排上山"]
  ]},
  { id: "names", type: "callout", title: "把这些中文名称发给司机", tone: "neutral", body: "北侧：长白山北景区 / 长白山站 / 二道白河镇 / 池北区。西侧：长白山西景区 / 长白山西站 / 长白山机场 / 松江河镇 / 池西区。再加酒店完整中文名和电话。冬季接站不能只靠相似的英文译名。" },
  { id: "checklist-heading", type: "heading", level: 2, text: "出发前最终核验" },
  { id: "checklist", type: "list", items: [
    "景区订单上有准确的坡向和日期。",
    "车票或机票写有完整枢纽名；长白山站和长白山西站不可互换。",
    "酒店确认所在坡向、晚到入住和精确接人点。",
    "接驳方确认车型、行李容量、联系方式和天气取消处理。",
    "出行当天已查景区运营和中国气象局预警。",
    "最后一段公路或景区接驳失败时，有同侧过夜备选。"
  ]},
  { id: "help", type: "callout", title: "需要把票面、入口和酒店一起核对？", tone: "decision", body: "把日期、确认的坡向、火车或航班记录、酒店、人数、行李和步行需求发给 Homeground。我们可以指出枢纽不匹配或转乘余量不足；实时票量和景区运营仍以官方平台为准。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [
    { label: "Homeground 交通与行程指南", href: "/zh/guides/", description: "返回上级指南集合页。" },
    { label: "第一次坐中国高铁指南", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "铁路乘车流程在这篇单独处理。" },
    { label: "国际航班前最后一晚怎么安排", href: "/zh/guides/china-last-night-before-international-flight/", description: "给天气敏感的山地行程保住最终离境。" },
    { label: "你的中国行程是不是太赶？", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "检查跨坡转移是否真的留有恢复时间。" }
  ]},
  { id: "sources", type: "sources", title: "官方来源", items: [
    { label: "长白山北、西景区交通基础信息", url: "https://www.changbaishan.gov.cn/zbsly/lyzn/bpgl/202106/t20210625_210152.html", publisher: "长白山保护开发区管理委员会", reviewedAt: "2026-08-13" },
    { label: "沈白高铁各站接驳保障", url: "https://jtyst.jl.gov.cn/ygj/jtyw_5912/202509/t20250925_9327476.html", publisher: "吉林省运输管理局", reviewedAt: "2026-08-13" },
    { label: "沈白高铁开通信息", url: "https://www.jl.gov.cn/szf/zwhd/202509/t20250928_3502171.html", publisher: "吉林省人民政府", reviewedAt: "2026-08-13" },
    { label: "2025—2026雪季公共交通公告", url: "https://jtyst.jl.gov.cn/ygj/jtyw_5912/202601/t20260105_9388408.html", publisher: "吉林省运输管理局", reviewedAt: "2026-08-13" },
    { label: "长白山景区公告入口", url: "https://www.changbaishan.gov.cn/index.html", publisher: "长白山保护开发区管理委员会", reviewedAt: "2026-08-13" },
    { label: "天气预报与气象预警", url: "https://www.cma.gov.cn/", publisher: "中国气象局", reviewedAt: "2026-08-13" }
  ]}
] } as const satisfies StructuredPageBody;

export default body;
