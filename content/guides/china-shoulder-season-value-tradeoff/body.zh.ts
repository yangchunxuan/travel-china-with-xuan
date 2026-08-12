import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "中国的平季不是一个全国通用的低价窗口。只有路线核心体验仍然成立、法定假期压力可接受、日照与交通合适，而且真实的弹性预订组合比旺季方案更好——不只是更便宜——这个日期才有价值。要比较具体地区和日期，而不是购买“春季”或“秋季”标签。" },
  { id: "quick-choice", type: "comparison", title: "你到底在交换什么？", columns: [
    { heading: "旺季条件", body: "季节性景观或活动就是旅行核心时，可以多付成本或接受需求压力。" },
    { heading: "平季平衡", body: "能接受适度不确定性，且弹性预订能保留收益时选择。" },
    { heading: "深淡季", body: "只有确认营业、交通、天气耐受度，以及更短或更安静旅行日的真实价值后再选。" }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "比较价格前先做两项官方核对" },
  { id: "official", type: "paragraph", text: "中国气象局说明，中国气候受到纬度、海陆位置、季风和地形影响，因此一个“平季”标签不能描述所有路线。国务院每年公布法定节假日安排；2026年通知列出了主要节假日及调休工作日。必须核对当年日历，因为看似安静的一周，可能紧邻集中出行期。" },
  { id: "value-heading", type: "heading", level: 2, text: "为这次旅行定义“价值”" },
  { id: "value", type: "table", caption: "只有体验仍成立，低价才有意义", columns: ["变量", "问题", "需要收集的证据"], rows: [
    ["核心体验", "活动是否仍运营、仍值得专程前往？", "具体景区或运营方公告"],
    ["气候暴露", "降雨、高温、寒冷、大风或低能见度会不会毁掉目的？", "官方气候背景，临近出行再查预报"],
    ["假期压力", "日期是否与大规模出行期重合或相邻？", "当年国务院节假日日历及运营方公告"],
    ["日照与节奏", "户外日能否完成，不需要仓促早出晚归？", "具体日期的日出日落和营业时间"],
    ["交通", "实用服务是否在合适时段运行？", "当前12306、承运人或当地运营方查询"],
    ["预订组合", "加入灵活性、行李和坏天气替代后总成本如何？", "同条件结算价，而非标题价格"]
  ] },
  { id: "route-screen-heading", type: "heading", level: 2, text: "逐站筛选，不给整条路线贴标签" },
  { id: "route-screen", type: "list", ordered: true, items: [
    "为每一站写一个不可替代理由。理由含糊的地点不应控制日期。",
    "把每站标为天气决定型、运营季节决定型或大体容忍型。",
    "对最难一站，根据可靠气候与运营资料找出旺季窗口和相邻两个候选窗口。",
    "检查其他地区在每个候选窗口是否仍可接受；跨区域路线可能有不同平季。",
    "叠加当年法定节假日日历，以及有可靠一手来源的重大地方活动。",
    "比较剩余日期的完整预订组合，包括取消条件和备用日成本。",
    "选择能保护体验最好的日期，而不是折扣宣称最大的日期。"
  ] },
  { id: "examples-heading", type: "heading", level: 2, text: "三种诚实的平季结果" },
  { id: "examples", type: "table", caption: "示例用于解释判断，不声称实时价格或天气", columns: ["旅行目的", "可能结果", "理由"], rows: [
    ["博物馆、街区和美食路线", "平季可能很强", "室内内容和弹性日期能吸收更多天气变化"],
    ["依赖能见度的山地旅行", "旺季或可灵活调整的平季", "低能见度毁掉核心体验时，节省价值下降"],
    ["包含高原延伸的跨区域路线", "拆分路线或改变日期", "全国单一标签可能隐藏不相容的气候与恢复需求"]
  ] },
  { id: "booking-heading", type: "heading", level: 2, text: "按不可逆程度安排预订顺序" },
  { id: "booking", type: "list", ordered: true, items: [
    "先确认护照、假期日期和官方节假日日历。",
    "确认核心季节体验与路线可行，但不要把历史规律当成天气预报。",
    "锁定内部酒店前，先比较口岸和可退改国际交通。",
    "在理解条件后预订稀缺核心项目，再围绕它安排弹性住宿。",
    "天气敏感日保持可移动，在可行情况下延后预订不可退款的次要活动。",
    "临近出发，用官方预报、运营公告和当前交通查询替换假设。"
  ] },
  { id: "failure-heading", type: "heading", level: 2, text: "虚假节省与修复" },
  { id: "failure", type: "table", caption: "便宜也可能是低价值", columns: ["虚假节省", "隐藏成本", "修复"], rows: [
    ["最低房价远离有用交通", "每天打车或地铁时间吃掉差价", "比较酒店门到门价值"],
    ["天气波动期选择不可退房价", "闭园或低能见度日无法移动", "给灵活性定价，并保持核心日可调"],
    ["安静日期紧邻大假期", "交通压力可能早于或晚于官方放假日", "查看运营方公告并增加余量"],
    ["淡季仍保留季节性地点", "为缩水体验支付交通和酒店", "替换活动或删除该站"],
    ["低价航班附带行李和严格退改", "完整组合超过表面节省", "比较同条件票价产品"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "何时为旺季付费，何时选择更安静" },
  { id: "switch-rule", type: "paragraph", text: "某个季节性活动就是旅行的核心理由，失败会让整趟旅行失去意义时，选择旺季。路线有替代、全组能承受不确定性、弹性预订能限制最坏情况下的损失时，选择平季。现有日期会破坏核心体验时，改选地区；没有折扣能修复一条已无法完成旅行目的的路线。" },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "核心体验和导致其失败的条件已经明确。",
    "每个地区单独筛选，没有继承同一个季节标签。",
    "当年官方节假日日历已叠加到候选日期。",
    "营业时间和交通来自具体一手来源。",
    "价格比较包含灵活性、行李、位置和备用方案成本。"
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "重新核对年份与路线", body: "节假日、运营时刻、票价和预报都会变化。本文不承诺折扣、客流或天气。预订前重新核对当年官方日历和每个具体运营方。" },
  { id: "scope", type: "callout", tone: "neutral", title: "本文范围", body: "本文只负责旺季、平季和深淡季之间的价值取舍。气候分区指南负责跨区域天气筛选；节假日日历负责年度明确日期；目的地指南负责地方季节体验。" },
  { id: "help-cta", type: "callout", tone: "decision", title: "需要比较两个日期窗口？", body: "请提供候选日期、地区、核心体验，以及弹性与不可退预订选项。有效比较应说明保护了什么价值、接受了什么风险。" },
  { id: "more-planning", type: "internal-links", title: "继续规划", items: [
    { label: "按气候分区筛选路线", href: "/zh/guides/china-climate-regions-for-trip-timing/", description: "检查一个日期窗口能否保护最难一站。" },
    { label: "核对中国法定节假日", href: "/zh/guides/china-public-holidays-travel-calendar/", description: "全国性假期可能推翻淡季标签。" },
    { label: "把时间选择放回总预算", href: "/zh/guides/how-much-does-a-china-trip-cost/", description: "同时比较交通、酒店与灵活性。" }
  ] },
  { id: "sources", type: "sources", title: "已复核的官方来源", items: [
    { label: "我国气候的主要特征", url: "https://www.cma.gov.cn/2011xzt/2012zhuant/20120302/2012030205/201203020501/201103/t20110314_3096052.html", publisher: "中国气象局", reviewedAt: "2026-08-12" },
    { label: "2026年部分节假日安排", url: "https://www.gov.cn/zhengce/zhengceku/202511/content_7047091.htm", publisher: "中华人民共和国国务院", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
