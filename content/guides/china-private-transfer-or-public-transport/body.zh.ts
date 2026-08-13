import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "私人接送值得付费的前提，是它能消除一个已经核实、而且失败后果明显的弱环节：反复搬运行李、无法完成的最后一段、行动限制、公共交通运营缺口，或代价很高的误接。若公共交通是一程直达、仍在运营，而且每位旅客都能完成首末两段，它通常更简洁。反过来，上车点、容量、等待和取消条款都不明确的车，也不算省事。"
    },
    {
      id: "single-segment",
      type: "callout",
      tone: "decision",
      title: "判断一个地面段，不要判断“中国交通”",
      body: "写清一个起点和一个终点，例如实际抵达航站楼到酒店车行入口，或酒店入口到正确火车站安检区。这个地面段的好答案，不会自动变成整趟旅程的通用规则。"
    },
    { id: "chain-heading", type: "heading", level: 2, text: "比较完整的接驳链" },
    {
      id: "friction-chain",
      type: "table",
      caption: "坐车或乘轨道的那一段，只是链条中间",
      columns: ["环节", "公共交通需要的证据", "私人接送需要的证据"],
      rows: [
        ["起点", "正确航站楼或车站出口，以及走到站台的路线", "明确的上车区、停车楼或楼层，不能只写“到达层”"],
        ["运营时段", "当前首末班和任何检修公告", "司机是否覆盖实际落地或出发时段"],
        ["搬运", "电梯、楼梯、闸机数量以及每件行李要搬几次", "确认车型、可用行李空间以及谁负责装车"],
        ["乘坐", "直达还是具体换乘，以及车票和支付方式", "包含的路线、过路费、停车费、夜间费和停靠"],
        ["最后一段", "可用出口、路面、天气暴露和酒店入口", "车辆可合法停在哪里，离前台还有多远"],
        ["失败", "下一班可用服务，以及官方出租车或酒店备选", "等待起算、航班追踪、爽约、取消和替代流程"]
      ]
    },
    { id: "exclusion-heading", type: "heading", level: 2, text: "先排除不可用方案，再比较舒适度" },
    {
      id: "exclusion-gates",
      type: "list",
      ordered: true,
      items: [
        "若无法为实际旅客核实公共路线的运营时间、电梯楼梯链或最后一段，就先排除它。",
        "若无法识别经营者或订单相对方，无法核验当地要求的经营资质，或上车点、车型和行李容量不清楚，就排除私人服务。",
        "若等待从何时起算不清楚，或缺少航班延误、航站楼变化、取消与退款条款，也排除私人服务。",
        "若抵达后没有经过检验的恢复空间，却紧接一张另行购买的火车票、机票或定时活动，两种方案都应排除。",
        "若两者都不可用，应重新设计：换酒店、增加缓冲夜，或在机场/车站酒店把链条拆开。"
      ]
    },
    { id: "decision-heading", type: "heading", level: 2, text: "用条件判断，不制造“便利指数”" },
    {
      id: "decision-table",
      type: "table",
      caption: "同一个明确地面段的条件式决策表",
      columns: ["条件", "倾向", "原因"],
      rows: [
        ["一程直达公共交通；行李轻且可控；最后步行可用；后面没有立即发生的定时连接", "公共交通", "预约车辆消除不了多少实际麻烦，反而增加会合点依赖"],
        ["多次换乘；行李超过全队空闲双手的处理能力；车辆确实解决酒店最后一段", "私人接送", "它消除了反复搬运和已确认的薄弱末段"],
        ["机场线或铁路骨干很强，但最后一站到酒店很差", "混合方案", "保留可靠骨干，只购买困难的末段"],
        ["抵达较晚，接近公共交通收班；司机条款和备用官方出租车点均已确认", "私人接送或官方出租车", "运营时间缺口比笼统的“更快”更有决定性"],
        ["轮椅或其他行动需求", "选择可以直接确认的完整链", "私人车不自动等于无障碍，一个电梯标志也不证明公共链完整"],
        ["后面很快衔接一张独立火车票或机票", "先重做结构", "买一辆车不能把没有保护的独立联程变成保证衔接"]
      ]
    },
    {
      id: "official-example",
      type: "paragraph",
      text: "机场官方页面说明了为什么标签不够。北京首都国际机场按航站楼和停车楼层公布网约车上车点，所以“司机在到达口接我”不是安全假设；机场快轨页面则给出有明确车站和运营时段的公共骨干。上海官方机场交通信息列出多种方式，同时提示具体服务可能调整。这些都是需要核验的实例，不是全国承诺。"
    },
    { id: "travellers-heading", type: "heading", level: 2, text: "三类旅客暴露三种不同弱环节" },
    {
      id: "traveller-cases",
      type: "table",
      caption: "案例演示方法，不指定供应商或具体路线",
      columns: ["旅客", "决定因素", "可能答案"],
      rows: [
        ["独行、一个能自行提起的行李箱，酒店就在直达机场线车站旁，没有定时预约", "站台和最终出口可用，也没有需要花钱消除的行李交接或误接后果", "通常公共交通胜出，并把官方出租车点存作备选"],
        ["带幼儿的家庭，有推车和多件行李，晚上抵达，酒店最后一段复杂", "空闲双手、电梯链、运营时段、儿童设备、车辆容量和酒店车行入口都重要", "只有车型、儿童安排、等待和入口全部确认后，私人接送才可能值得"],
        ["轮椅旅客", "要把公共交通电梯和站务协助，与车门宽度、轮椅尺寸、是否需转移、固定装置和司机协助逐项比较", "选运营方能端到端确认的那条链，不默认私人车无障碍"]
      ]
    },
    { id: "quote-heading", type: "heading", level: 2, text: "付款前，把“有辆车”变成书面服务" },
    {
      id: "private-questions",
      type: "list",
      ordered: false,
      items: [
        "签约经营者是谁，什么订单记录或票据可以识别它？",
        "具体在第几航站楼、哪个出口、哪座停车楼、哪一层会合？落地后谁联系谁？",
        "承诺什么车型，实际乘客和行李是否装得下，轮椅或儿童安排是否得到直接确认？",
        "包含的等待从何时开始：计划到达、实际到达、落地、行李送出还是联系司机？",
        "航班延误、航站楼改变、行李延误、漏接电话、司机未出现或会合点错误时怎么处理？",
        "报价包含哪些过路、停车、夜间、加停和超时费用，取消与退款条件是什么？"
      ]
    },
    {
      id: "consumer-boundary",
      type: "callout",
      tone: "neutral",
      title: "保留证据，但别把监管规定当服务保证",
      body: "中国官方规定要求网约车明码标价；市场监管投诉处理也需要可识别的经营者、事实依据和具体请求。Homeground 的规划推论是保留经营者身份、书面报价、路线、车型、等待条款、沟通和付款记录。这些材料并不证明车辆适合你，也不保证接车成功。"
    },
    { id: "recovery-heading", type: "heading", level: 2, text: "备选必须从一个官方节点开始" },
    {
      id: "failure-recovery",
      type: "table",
      caption: "这个明确地面段的故障恢复",
      columns: ["故障", "现在做什么", "不要做什么"],
      rows: [
        ["航班延误", "落地前更新预订方，并把延误与书面等待条款比较", "假定航班追踪等于无限免费等待"],
        ["司机没出现或去了别的航站楼", "留在官方上车区，保存订单记录，转到机场官方出租车或网约车点", "跟随陌生揽客者离开有标识的交通区域"],
        ["托运行李延误", "先取得航司行李事故记录，约定领取或送达，再决定车是否继续等", "为了保住用车订单，在没有书面行李流程时离开"],
        ["公共交通已停运", "改用当前官方巴士、出租车或机场酒店，并删除后续非必要活动", "临时拼接多条即将收班的路线"],
        ["网络或支付失败", "前往有人值守的交通服务台或官方出租车队列，出示离线中文酒店地址", "因为 App 失效就坐进未经核实的车"]
      ]
    },
    { id: "change-heading", type: "heading", level: 2, text: "以下任何条件变化，都要重算" },
    {
      id: "change-conditions",
      type: "comparison",
      columns: [
        { heading: "车辆更有价值", body: "增加行李或同行者；儿童、行动能力或天气让反复搬运更难；抵达移出公共交通有效时段；最后一段变得不可用；或错过下一节点的后果明显加重。" },
        { heading: "公共交通更有价值", body: "酒店移到直达线旁；行李减少；抵达落在从容运营时段；私人上车点需要在停车楼内走很远；或司机和等待条款仍含糊。" }
      ]
    },
    { id: "verification-heading", type: "heading", level: 2, text: "出行当天的最终核验" },
    {
      id: "final-verification",
      type: "list",
      ordered: false,
      items: [
        "实际机场航站楼或火车站，以及正确出口或安检区。",
        "公共交通运营时间、检修公告、换乘、电梯楼梯路线和最后步行。",
        "酒店车行入口、前台时段，以及可离线显示的中文地址和地图点。",
        "签约经营者、司机联系方式、车牌、车型、乘客与行李容量，以及行动或儿童设备。",
        "接车标识、会合点、等待起算、航班追踪、包含费用、取消与退款条款。",
        "一个官方备选节点，以及错过下一张票或预约的实际后果。"
      ]
    },
    {
      id: "scope",
      type: "callout",
      tone: "warning",
      title: "本指南不声称什么",
      body: "它不做供应商排名，不发布全国价格表，不保证哪种方式最快，也不替代具体机场路线页。它只判断：对于一个衔接复杂的抵达或离开段，花钱买帮助能否消除足够多的已核实风险，从而值得该次书面报价。"
    },
    {
      id: "help",
      type: "callout",
      tone: "decision",
      title: "想让真人比较你的这一段？",
      body: "请留下日期、人数、实际行李、行动需求、抵达或离开节点、酒店区域和大致预算。我们可以比较完整的公共、私人和混合链，而不是从一张泛化供应商榜单里替你选。"
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续规划",
      items: [
        { label: "规划你的中国旅行", href: "/zh/plan/", description: "返回旅行规划集合页。" },
        { label: "选择浦东还是虹桥机场", href: "/zh/guides/shanghai-pudong-or-hongqiao-airport/", description: "机场选对了，可能直接消除困难地面段。" },
        { label: "连接北京南站与首都或大兴机场", href: "/zh/guides/beijing-south-station-to-capital-or-daxing-airport/", description: "具体路线执行交给这篇走廊指南。" },
        { label: "检验酒店是否真的靠近地铁", href: "/zh/guides/china-hotel-near-metro/", description: "检查正确出口和最后一段。" },
        { label: "规划轮椅可行的中国路线", href: "/zh/guides/wheelchair-accessible-china-route-planning/", description: "为轮椅旅客核实完整的车站、车辆、酒店和景点链。" },
        { label: "保护国际航班前一晚", href: "/zh/guides/china-last-night-before-international-flight/", description: "不要指望地面接驳拯救脆弱的离境链。" }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "已核验的官方来源",
      items: [
        { label: "网约车上车点", url: "https://www.bcia.com.cn/jcwyc.html", publisher: "北京首都国际机场", reviewedAt: "2026-08-13" },
        { label: "机场快轨信息", url: "https://www.bcia.com.cn/dtjcx.html", publisher: "北京首都国际机场", reviewedAt: "2026-08-13" },
        { label: "上海机场交通概览", url: "https://english.shanghai.gov.cn/en-Transportation/20231214/649e06ea38f74aaeb573fa2debbe97d3.html", publisher: "上海市人民政府", reviewedAt: "2026-08-13" },
        { label: "铁路进站、购票和改签常见问题", url: "https://www.12306.cn/en/faq.html?item=2", publisher: "中国铁路 12306", reviewedAt: "2026-08-13" },
        { label: "公共航空运输旅客服务管理规定", url: "https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html", publisher: "中国民用航空局", reviewedAt: "2026-08-13" },
        { label: "网络预约出租汽车经营服务管理暂行办法", url: "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2023/art_1f0d6bf9e2e6476aa22af1d17f38e1ef.html", publisher: "国家市场监督管理总局", reviewedAt: "2026-08-13" },
        { label: "市场监督管理投诉举报处理办法", url: "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2026/art_e4d03a20c0fd49769e408c7bf3791ff5.html", publisher: "国家市场监督管理总局", reviewedAt: "2026-08-13" }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
