import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "国际抵达日默认应保持弹性。只有入境手续、行李、地面交通、酒店衔接和场馆入场这几环都已核清，而且错过预约的代价可以接受，才考虑安排不易替代的限时项目。任何一个关键信息未知，都应改用可替换时段，而不是把计划落地或到站时间直接当成游览开始时间。"
    },
    {
      id: "two-blocks",
      type: "comparison",
      title: "先分清第一天放进去的是什么",
      columns: [
        { heading: "限时预约", body: "绑定姓名、日期或入场时段、不易替代的预约，并有迟到、取消或爽约后果。它不能随意往后挪两个小时。" },
        { heading: "弹性时段", body: "酒店附近的一顿饭、休息、街区散步或普通商店，可晚开始、缩短或取消，而不会伤及整趟旅行。" }
      ]
    },
    { id: "risk-heading", type: "heading", level: 2, text: "落地时间只是风险树的第一个节点" },
    {
      id: "risk-tree",
      type: "table",
      caption: "每一道门都通过，定时参观才真正可用",
      columns: ["节点", "仍可能不确定的事", "需要取得的证据"],
      rows: [
        ["抵达", "实际靠桥、开舱门或到站时间可能偏离计划", "当天的官方航班动态或 12306 状态"],
        ["入境", "外国旅客仍须提交证件并接受边防检查", "正确的入境资格、证件和当前入境卡流程"],
        ["行李", "托运行李提取需要时间，也可能延误", "行李状态和承运人的事故记录、领取或送达流程"],
        ["离开航站楼", "远机位、航站楼变化或室内长距离步行会改变起点", "实际航站楼、出口和会合点"],
        ["地面交通", "排队、运营时间和最后一段步行取决于具体路线", "机场、车站和运营方的当前官方信息"],
        ["酒店", "房间未必已好，寄存也不是自动提供", "该时段前台和寄存服务的书面确认"],
        ["场馆", "进城之后还有安检、证件匹配和最迟入场规则", "该票种、日期对应的场馆最新通知"]
      ]
    },
    {
      id: "assumptions",
      type: "callout",
      tone: "warning",
      title: "把假设摆在明面上",
      body: "本方法假设旅客具备合法入境资格、携带预约所用证件，但不假设任何环节有保证时长。我们不编造统一的入境预留时间、准点率或机场到市区时长。抵达、行李、酒店或入场信息未知时，一律按可能吞掉预约时段的保守范围处理。"
    },
    { id: "gate-heading", type: "heading", level: 2, text: "限时预约必须同时通过四道门槛" },
    {
      id: "anchor-gates",
      type: "list",
      ordered: true,
      items: [
        "抵达链可识别：机场或车站、航站楼、必要的入境步骤、行李方案和当前进城路线都明确。",
        "酒店链写清楚：行李放在哪里、前台是否有人，以及不等待入住时如何前往场馆。",
        "场馆官方确有足够晚的时段；整个方案不是只有每一环都完美运行才赶得上。",
        "损失可接受：已经理解取消、迟到和爽约规则，也预先选好了替代活动。"
      ]
    },
    { id: "ledger-heading", type: "heading", level: 2, text: "不用虚构分钟数，也能做抵达日账本" },
    {
      id: "arrival-ledger",
      type: "table",
      caption: "有确认值就记录确认值，否则写保守范围；未知绝不能记为零",
      columns: ["账本字段", "记录什么", "若未知"],
      rows: [
        ["交通抵达", "计划班次和实时状态", "保留延误范围，不要紧接着订限时项目"],
        ["入境与提取", "所需检查以及是否有托运行李", "把整个离开航站楼过程视为变量"],
        ["进城交通", "具体方式、运营时段、换乘和最后步行", "至少保留两种可行方式"],
        ["酒店交接", "前台、寄存、房态和车行或步行入口", "直接转入酒店附近的弹性时段"],
        ["场馆交接", "安检、证件、入口、最迟核验和取消规则", "不要预订难以替代的时段"],
        ["恢复能力", "替代活动、用餐和休息方案", "尚不具备安排限时预约的条件"]
      ]
    },
    { id: "branches-heading", type: "heading", level: 2, text: "三种抵达方式会得出不同答案" },
    {
      id: "arrival-branches",
      type: "comparison",
      title: "只检验你实际拥有的那条链",
      columns: [
        { heading: "国际航班", items: ["包含入境手续，离开航站楼的链通常更长", "托运行李会再增加一个独立失败分支", "即使计划很早抵达，也默认保持弹性"] },
        { heading: "国内航班", items: ["没有边检，但登机口、行李和地面交通仍会变化", "航班异常还可能改变司机等待条件", "通常用可替换的晚上，比难以替代的门票更稳妥"] },
        { heading: "国内铁路", items: ["具体车站、证件流程和出口仍然重要", "只带随身行李可删去托运行李分支", "能否安排较晚的限时参观，取决于实时 12306、酒店寄存和场馆规则"] }
      ]
    },
    {
      id: "venue-proof",
      type: "paragraph",
      text: "真实场馆能说明最后一道门为什么重要。故宫博物院公布实名、日期、时段和证件规则；中国国家博物馆要求按预约证件和时段核验，并设取消及爽约条件。它们只是“不易替代的预约”的具体例子，不代表所有博物馆规则相同。订票前和抵达当天，都要重新阅读目标场馆自己的通知。"
    },
    { id: "scenarios-heading", type: "heading", level: 2, text: "两类旅客，两种有证据的结论" },
    {
      id: "traveller-scenarios",
      type: "table",
      caption: "结论由链条得出，不由游览热情得出",
      columns: ["旅客", "链条检验", "决定"],
      rows: [
        ["下午抵达的长途国际航班、托运行李，想订当天故宫", "航班、边检、行李、进城、酒店和场馆安检是串联风险；门票无法吸收未知延误", "不要把故宫设为抵达日的限时预约。改用附近用餐、散步或休息，并把参观放在完整本地日"],
        ["上午乘国内高铁抵达、随身行李，车站附近酒店确认寄存，拟订较晚博物馆时段", "行李分支较短，酒店交接已确认；剩余风险是当天列车、车站出口和场馆迟到规则", "当天复核后才可考虑；门票应可取消或损失可接受，并保留附近替代活动"]
      ]
    },
    { id: "modules-heading", type: "heading", level: 2, text: "弹性不是空白，而是可伸缩模块" },
    {
      id: "flexible-modules",
      type: "list",
      ordered: false,
      items: [
        "只选酒店附近一个小区域，不为著名街区横穿全城。",
        "准备一个可以晚到的普通用餐选择，也准备一个精力不足时的简单备选。",
        "选择无需定时门票、出口多的街区、河边或社区短线；仍需核对当地进入限制。",
        "给联网、支付设置、补水、用药和睡眠留时间，不把这些必要事项视为“没玩到”。",
        "提前写好删除规则：酒店交接晚于预期时，先删散步，不先删休息。"
      ]
    },
    { id: "failure-heading", type: "heading", level: 2, text: "在哪个节点失败，就在那里止损" },
    {
      id: "failure-recovery",
      type: "table",
      caption: "不要用赶路把失败扩散到下一环",
      columns: ["失败", "立即动作", "第一天如何修复"],
      rows: [
        ["起飞前已明确延误", "在场馆官方截止时间前按官方渠道取消", "启用酒店周边弹性模块"],
        ["托运行李未到", "要求承运人出具行李事故记录，并依适用条款约定领取或送达", "不要带着未解决的行李问题冲向定时场馆"],
        ["铁路抵达受影响", "按当前 12306 规则和实际余票处理；改签并非保证", "没有从容的后续安排就取消限时预约"],
        ["酒店不能寄存", "要求酒店提供有记录的替代，或使用你已独立核验的有人值守寄存点", "删除跨城参观"],
        ["场馆临时闭馆或入场规则变化", "保存官方通知，并按其退款或改约流程操作", "启用预先选好的非票务模块"]
      ]
    },
    { id: "switch-heading", type: "heading", level: 2, text: "哪些条件会改变结论" },
    {
      id: "switch-conditions",
      type: "comparison",
      columns: [
        { heading: "更适合安排限时预约", body: "国际抵达改为国内抵达；托运行李改为随身行李；酒店确认立即寄存；场馆出现明显更晚的时段；或预约易取消且损失低。" },
        { heading: "更接近保持弹性", body: "班次更换航站楼或车站；新增托运或特殊行李；抵达推迟；地面交通接近运营边界；酒店寄存不确定；或场馆收紧迟到和爽约规则。" }
      ]
    },
    { id: "verify-heading", type: "heading", level: 2, text: "最终核验分两次：订票日与抵达日" },
    {
      id: "final-verification",
      type: "list",
      ordered: false,
      items: [
        "单独确认入境资格；网上填写入境卡不等于免去边检。",
        "在官方渠道核对实际承运的航班或列车、真实航站楼或车站以及行李状态。",
        "复核完整地面路线、运营时间，并保留第二种可行方式。",
        "取得酒店当前前台与寄存答复的书面记录。",
        "阅读目标场馆对证件、安检、入场时段、最迟入场、取消和爽约的准确通知。",
        "在真正离开航站楼且酒店交接顺利前，不要删除弹性模块。"
      ]
    },
    {
      id: "scope-boundary",
      type: "callout",
      tone: "neutral",
      title: "本页只拥有一个第一天决策",
      body: "本页判断抵达日能否安排不易替代的限时预约。“行程是否太赶”文章负责全程节奏与转场过载；机场和车站文章负责具体走法；离境前一晚文章负责回程保护。本页不选择地面接驳方式、不计算完整私人行程，也不承诺入境、交通或入场时间。"
    },
    {
      id: "human-help",
      type: "callout",
      tone: "decision",
      title: "想让真人帮你检验抵达链？",
      body: "请留下旅行日期、人数、抵达班次与时间、酒店区域和大致预算。我们可以找出最弱的一环，并判断第一天的预约该保留还是后移。"
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续规划",
      items: [
        { label: "规划你的中国旅行", href: "/zh/plan/", description: "返回旅行规划集合页。" },
        { label: "检查整段行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "核算全程可用天数和转场负担。" },
        { label: "选择更合理的入境与离境城市", href: "/zh/guides/china-open-jaw-flights-route-planning/", description: "固定第一晚前先检验门户结构。" },
        { label: "选择私人接送还是公共交通", href: "/zh/guides/china-private-transfer-or-public-transport/", description: "针对这一段抵达行程比较两种地面接驳方式。" },
        { label: "判断酒店是否真的靠近地铁", href: "/zh/guides/china-hotel-near-metro/", description: "核对可用入口和最后步行，而不是只看地图标签。" },
        { label: "准备外国游客的故宫参观", href: "/zh/guides/forbidden-city-for-foreign-visitors/", description: "把场馆专属的预约和入场任务放在合适的一天。" }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "已核验的官方来源",
      items: [
        { label: "外国旅客网上填写入境卡选项", url: "https://en.nia.gov.cn/n147418/n147468/c187308/content.html", publisher: "国家移民管理局", reviewedAt: "2026-08-13" },
        { label: "中华人民共和国出境入境管理法", url: "https://www.nia.gov.cn/n741440/n741547/c757592/content.html", publisher: "国家移民管理局", reviewedAt: "2026-08-13" },
        { label: "公共航空运输旅客服务管理规定", url: "https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html", publisher: "中国民用航空局", reviewedAt: "2026-08-13" },
        { label: "铁路购票、改签与退票常见问题", url: "https://www.12306.cn/en/faq.html?item=2", publisher: "中国铁路 12306", reviewedAt: "2026-08-13" },
        { label: "故宫博物院网上订票规则", url: "https://www.dpm.org.cn/subject_booking/", publisher: "故宫博物院", reviewedAt: "2026-08-13" },
        { label: "观众预约须知", url: "https://en.chnmuseum.cn/visit_692/", publisher: "中国国家博物馆", reviewedAt: "2026-08-13" }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
