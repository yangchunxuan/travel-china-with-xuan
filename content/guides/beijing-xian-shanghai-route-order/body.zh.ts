import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "对于大多数只涵盖这三座城市的首次旅行，建议采用北京 → 西安 → 上海，或完全相反的顺序，并从不同的城市乘国际航班抵达和离开。更合适的方向，应由实际的长途国际机票和你重视的固定参观安排决定。西安适合作为中间落脚点。经同一门户城市往返也可以安排，但返程段和最终航班前的缓冲时间都是真实的行程成本，不能把它们当作不存在的交通时间。",
    },
    {
      id: "direction-summary", type: "comparison", title: "三种路线形态，只有两种天然顺路",
      columns: [
        { heading: "北京 → 西安 → 上海", body: "当国际机票适合从北京入境、从上海离境时，采用这个方向。它能保持一路向前的行程链，并在大型国际出境门户结束旅程，无须折返北方。" },
        { heading: "上海 → 西安 → 北京", body: "如果航班、首日恢复安排或有明确日期的预约使上海更适合作为抵达城市、北京更适合作为安全的离境终点，就采用反向路线。" },
        { heading: "往返航班使用同一门户城市", body: "明确加入一段返程交通和最后一座城市的缓冲时间，再将剩余的有保障游览日与不同城市进出的机票方案比较。如果最弱的一座城市变成象征性停留，就缩短路线。" },
      ],
    },
    { id: "scope-boundary", type: "callout", tone: "neutral", title: "本指南解决什么问题", body: "本指南专门决定这三座城市的先后顺序。它不提供逐日行程、实时火车或航班信息、通用的住宿晚数，也不是 Homeground 通用“行程是否太赶”测试的另一个版本。" },
    { id: "gateway-heading", type: "heading", level: 2, text: "先选择进出门户，再决定行程方向" },
    { id: "gateway-context", type: "paragraph", text: "仅凭城市名称，还不足以计算抵达和离境动线。北京同时使用首都机场和大兴机场，上海则使用浦东机场和虹桥机场。这些城市也都有多个铁路车站。北京和上海的官方指南都提醒旅客确认实际使用的机场、航站楼和车站；2026 年西安东站投入运营后，西安的车站网络也再次发生变化。因此，稳定不变的决策应是城市顺序。在每张票都标明具体航站楼或车站之前，执行层面的计划都只能是暂定方案。" },
    {
      id: "gateway-table", type: "table", caption: "会改变路线的门户条件", columns: ["已知条件", "最佳初始假设", "必须保持开放的事项"],
      rows: [
        ["抵达北京、从上海离境", "按北京 → 西安 → 上海规划", "北京实际机场、上海实际机场及两端铁路车站"],
        ["抵达上海、从北京离境", "按上海 → 西安 → 北京规划", "首日恢复、最后一晚的住宿位置及有明确日期的场馆闭馆安排"],
        ["经北京往返", "在出境航班所需的缓冲时间前回到北京并结束行程", "上海是否仍值得为其增加一段返程交通"],
        ["经上海往返", "在出境航班所需的缓冲时间前回到上海并结束行程", "北京是否仍值得为其增加一段返程交通"],
        ["尚未购买长途国际机票", "查询价格并比较两个方向的开口程机票与真正的往返机票", "票务条件、行李、分开出票的风险及机场接驳"],
      ],
    },
    { id: "direction-heading", type: "heading", level: 2, text: "不要只看地图决定方向" },
    {
      id: "direction-method", type: "list", ordered: true,
      items: [
        "把已确认的国际抵达放在一端，出境航班放在另一端。如果两趟航班都使用同一座城市，先把返程交通段写进日历，再计算观光时间。",
        "标出决定整趟旅行的预约和常规闭馆日。故宫博物院通常在周一闭馆，法定节假日除外，而且不出售当日票；这可能改变北京哪些天可以使用，但不会自动要求把整趟行程反过来。",
        "为无法安全地安排在铁路转场前后的重点项目，在西安预留一个有保障的时段。秦始皇帝陵博物院实行实名提前预约和分时段入场，因此其特定日期的规定比通用行程模板更重要。",
        "核查具体的上海场馆，不要只写“博物馆日”。上海博物馆各馆舍的常规闭馆日不同，因此必须把具体馆舍写入依赖事项清单。",
        "完成以上步骤后，才查询实际日期的官方交通信息。搜索结果只能证明某个日期存在该选项，并不能证明永久不变的行程时间，也不承诺今后仍使用同一车站。",
      ],
    },
    { id: "usable-days-heading", type: "heading", level: 2, text: "计算有保障的游览日，不要只看旅行产品标题上写的天数" },
    { id: "zero-baseline", type: "callout", tone: "decision", title: "每次转场都先从零个游览时段算起", body: "国际抵达、国际离境以及每次酒店到酒店的跨城移动，一开始都只计为交通时间。只有当按具体日期核算的门到门链路仍留出一段完整、不被打断的时间时，才可以增加一个可灵活安排的上午或下午。在这个时段被真正挣出来之前，绝不要塞入名额稀缺且有时段限制的预约。" },
    {
      id: "usable-day-ledger", type: "table", caption: "哪些情况可以或不可以增加可用时段", columns: ["日历事件", "保守计入", "提高计入量前所需的证据"],
      rows: [
        ["国际抵达", "0", "计划抵达时间、入境和提取行李缓冲、实际机场接驳、行李安置方案，以及附近可随时替换的活动"],
        ["北京—西安或西安—上海转场", "0", "具体火车或航班、两端前往航站楼或车站的过程、退房、行李、抵达接驳及酒店入住"],
        ["国际离境", "0", "实际机场和航站楼、值机要求、行李、地面交通及应对中断的缓冲"],
        ["没有跨城或换酒店的完整一天", "2 个灵活的半日时段", "场馆规定、地理位置是否顺路，以及符合旅行者真实节奏的充分恢复时间"],
      ],
    },
    { id: "city-role-heading", type: "heading", level: 2, text: "先给每座城市明确不同的任务，再分配住宿晚数" },
    {
      id: "city-role-table", type: "table", caption: "一座城市要通过保障独特的重点项目来赢得停留时间", columns: ["停留地", "站得住脚的路线角色", "说明该角色过于单薄的警示"],
      rows: [
        ["北京", "帝王与国家历史类重点、单独安排的长城一日，或分散在全城的多项固定参观", "唯一的重点项目被安排在抵达、离境或前往西安的转场日"],
        ["西安", "帝陵遗址博物馆，以及另一项独立的城市历史或街区重点", "只被当作两座大城市之间的车站停靠点"],
        ["上海", "旅程的都市收尾、明确的博物馆或建筑兴趣，以及实用的国际交通门户", "存在的唯一理由是航班从这里出发，没有任何受保障的本地重点项目"],
      ],
    },
    { id: "city-role-note", type: "paragraph", text: "各城市住宿晚数相同并不代表公平。北京如果有多个地理位置分散的重点项目，可能需要比作为门户停留地的上海更多有保障的时段；另一位旅行者也可能因为设计、艺术、美食或会议而让这种分配完全相反。真正有用的问题是：扣除交通和恢复时间后，每座城市是否仍保留了不可替代的内容。" },
    { id: "switch-heading", type: "heading", level: 2, text: "明确什么情况应保持、反转或缩短这条路线" },
    {
      id: "switch-conditions", type: "comparison", title: "决策条件",
      columns: [
        { heading: "保持当前方向", items: ["国际进出门户消除了一段折返旅程。", "每座城市都至少保留一项有保障且独特的重点项目。", "没有任何稀缺预约依赖尚未核实的转场时段。"] },
        { heading: "反转路线", items: ["计入行李和机场交通后，反方向的长途国际机票明显更可行。", "真正决定整趟旅行的预约或闭馆安排，只有在反向顺序中才能安全放置。", "在另一座门户城市结束行程，能为出境航班创造更可靠的缓冲。"] },
        { heading: "缩短路线", items: ["同一门户往返所需的返程段，挤掉了某座城市唯一有保障的游览时段。", "某座城市除了充当交通门户外，没有任何独特的重点项目。", "行动能力、时差、儿童或连续早起需要恢复时间，但当前时段账本中并未留出。"] },
      ],
    },
    { id: "scenarios-heading", type: "heading", level: 2, text: "两项路线测试说明：同样三个地点也会得出不同答案" },
    { id: "scenario-open-jaw", type: "callout", tone: "neutral", title: "测试 A：抵达和离境城市不同", body: "一名旅行者抵达上海，已有明确的上海博物馆兴趣，想看兵马俑并完成多项北京重点安排，最后从北京飞回家。上海 → 西安 → 北京是连贯的路线。两次转场仍从零个游览时段算起，但无须增加国内折返。只有当固定参观安排落在有保障的时段，而不是抵达日或转场日时，这条路线才仍然有效。" },
    { id: "scenario-roundtrip", type: "callout", tone: "warning", title: "测试 B：愿望清单相同，经北京往返", body: "同一名旅行者现在从北京入境并从北京离境。必须明确列出从上海返回北京的一段，以及最终航班前的缓冲。如果这挤掉了上海唯一的本地游览时段，或迫使兵马俑参观落在转场日，那么仅仅因为存在快速交通班次，并不会让路线变得高效。修正方法是更换国际机票、增加住宿晚数，或删除最弱的一座城市，而不是进行乐观的时间计算。" },
    { id: "booking-heading", type: "heading", level: 2, text: "按照依赖顺序预订路线" },
    {
      id: "booking-order", type: "list", ordered: true,
      items: [
        "确认入境资格、国际机票结构、实际机场及变更条件。",
        "记录决定整趟旅行的场馆规定和闭馆规律，但不要假设未来一定有可预约名额。",
        "安排有保障的城市游览日和转场时段；转场日的活动必须可以替换。",
        "通过 12306 或实际承运航空公司查询特定日期的交通，并把确切的车站、机场和航站楼抄入旅行记录。",
        "根据这些航站楼或车站选择或复查酒店，尤其要注意清晨出发或深夜抵达是否会暴露计划的脆弱之处。",
        "在免费取消截止日期前以及临近出行时，重新核查每一项动态信息。",
      ],
    },
    { id: "recovery-heading", type: "heading", level: 2, text: "无需推倒重来，也能修复路线" },
    {
      id: "recovery-table", type: "table", caption: "小故障与相称的修复方案", columns: ["发生的变化", "立即应对", "路线层面的修复"],
      rows: [
        ["该日期的班次使用另一座车站", "重新计算两端酒店到车站的完整动线", "删除转场日活动；除非衔接本身不可行，否则保持城市顺序"],
        ["某项固定景点安排无法进行", "改用可替换的本地模块", "只有当该景点确实决定整趟旅行，而且已确认另一个日期时，才改变城市顺序"],
        ["国际抵达延误", "前往酒店并取消可选的首个时段", "把第一次重要参观安排在之后的完整一天"],
        ["实际精力低于预期", "保留酒店并取消可选的晚间活动", "把一个时段还给休息，或在移动已有预约前先删除最弱的一站"],
        ["出境机场或航站楼发生变化", "优先保障航班，并遵循实际承运航空公司的通知", "调整最后一晚的住宿地点，或减少最后一天的安排"],
      ],
    },
    { id: "verification-heading", type: "heading", level: 2, text: "最终路线是一份已核实字段清单，而不是一句口号" },
    {
      id: "verification-table", type: "table", caption: "最低限度的最终核查", columns: ["核查节点", "需要核实", "主要权威来源"],
      rows: [
        ["购买国际机票前", "抵达和离境城市、机场、机票结构、行李及变更条件", "实际承运航空公司和机场"],
        ["国内交通开放预订时", "日期、确切车站或机场、航站楼、乘客信息及票务条件", "中国铁路 12306 或实际承运航空公司"],
        ["固定参观安排前", "具体馆舍、闭馆安排、预约、持护照入场要求及临时通知", "具体博物馆或景点"],
        ["取消截止日期前", "酒店位置、行李方案及完整的门到门交通动线", "酒店及相关交通运营方"],
      ],
    },
    { id: "editorial-judgment", type: "callout", tone: "warning", title: "哪些是判断，哪些是证据", body: "官方来源用于确认车站、机场和场馆规定。Homeground 的“转场按零时段计算”基准和有保障游览日方法，是保守的编辑判断。它们有助于避免脆弱的预订方案，但不能预测延误，也不会生成官方的行程时间评分。" },
    { id: "help-cta", type: "callout", tone: "decision", title: "想请真人帮你检查路线？", body: "请留下你的日期、旅行人数、大致预算，以及实际抵达和离境机场。Homeground 可以帮你找出脆弱的转场或固定预订，但不会把未经核实的时刻表假装成已确认信息。" },
    {
      id: "internal-links", type: "internal-links", title: "继续规划",
      items: [
        { label: "第一次去中国旅行规划器", href: "/zh/plan/", description: "返回上一级规划路径，选择下一项需要决定的事项。" },
        { label: "选择开口程航班", href: "/zh/guides/china-open-jaw-flights-route-planning/", description: "比较不同进出门户，以及返回同一座城市的真实成本。" },
        { label: "检查行程是否太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "拟定这条明确的三城顺序后，再审核整趟旅行。" },
        { label: "为第一次乘坐高铁做准备", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "路线确定后，处理乘客信息和车站流程。" },
        { label: "保障国际航班前的最后一晚", href: "/zh/guides/china-last-night-before-international-flight/", description: "加强离境端的安排，不要把它变成另一个观光日。" },
      ],
    },
    {
      id: "sources", type: "sources", title: "已核查的官方来源",
      items: [
        { label: "按日期查询铁路车次", url: "https://www.12306.cn/en/left-ticket.html", publisher: "China Railway 12306", reviewedAt: "2026-09-01" },
        { label: "外籍护照铁路出行常见问题", url: "https://www.12306.cn/en/faq.html", publisher: "China Railway 12306", reviewedAt: "2026-09-01" },
        { label: "北京机场门户", url: "https://english.beijing.gov.cn/consuminginbeijing/wheretobuy/airports/", publisher: "Beijing Municipal Government", reviewedAt: "2026-09-01" },
        { label: "上海铁路车站指南", url: "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-09-01" },
        { label: "上海机场指南", url: "https://english.shanghai.gov.cn/en-Individuals-Transportation-Airplane/20260813/7366238930024ac8b22e5adf82217bd8.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-09-01" },
        { label: "西安东站开通运营", url: "https://en.xa.gov.cn/MediaCenter/News/2072253459180654594.html", publisher: "Xi'an Municipal Government", reviewedAt: "2026-09-01" },
        { label: "故宫博物院参观规定", url: "https://intl.dpm.org.cn/visit.html", publisher: "Palace Museum", reviewedAt: "2026-09-01" },
        { label: "兵马俑官方购票须知", url: "https://www.bmy.com.cn/jingtai/bmyweb/ticketing.html?pubDate=20260324", publisher: "Emperor Qinshihuang's Mausoleum Site Museum", reviewedAt: "2026-09-01" },
        { label: "上海博物馆东馆参观信息", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/en/service/visit-east", publisher: "Shanghai Museum", reviewedAt: "2026-09-01" },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
