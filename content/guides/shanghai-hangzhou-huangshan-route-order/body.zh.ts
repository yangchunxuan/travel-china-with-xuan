import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer", type: "lead",
      text: "先锁定两件事，再决定方向：你真正能买到票的国际进出门户，以及完整可行的黄山进出区块。如果黄山之后还能安全接上后续行程，可走上海 → 杭州 → 黄山；如果国际航班从上海离境，则走黄山 → 杭州 → 上海。若国际机票是上海往返，应把黄山放在中段，并在起飞前回到上海；绝不能把下山当天当作机场接驳日。杭州只有在拥有受保护的本地参观目标时才值得停留，不能仅因铁路经过就安排一晚。",
    },
    {
      id: "three-lock-answer", type: "callout", tone: "decision", title: "三重锁定法",
      body: "先锁定航班门户，再借助现有黄山住宿决策指南，锁定黄山参观形态和落脚点，最后判断杭州究竟是有效的衔接城市、单纯经过，还是应优先删去的一站。只有这些决定站得住脚，才开始查询具体日期的交通。",
    },
    {
      id: "scope-boundary", type: "callout", tone: "neutral", title: "这里负责路线顺序，不是三座目的地的游览攻略",
      body: "本文只判断上海、杭州与黄山之间的先后顺序和恢复空间。它不负责选择上海或杭州的住宿区域，不指定黄山徒步路线，不比较山顶与汤口住宿，也不发布实时列车、航班、价格或开放时间。",
    },
    { id: "nodes-heading", type: "heading", level: 2, text: "先把三个城市名换成旅程真正会触及的节点" },
    {
      id: "node-chain", type: "table", caption: "愿望清单上的地名，掩盖了彼此不同的实际节点", columns: ["愿望清单上的名称", "必须明确的节点", "这项区别为什么会改变顺序"],
      rows: [
        ["上海", "具体机场、航站楼、酒店和车票所列火车站", "浦东、虹桥和上海各客运站并不是可以随意互换的同一个门户"],
        ["杭州", "具体火车站或机场，以及足以支撑停留的本地目标", "经过车站不等于游览西湖，也不构成换酒店的理由"],
        ["黄山", "车票所列车站、道路接驳点、当前已预约的入口、景区换乘，以及山下或山上的落脚点", "抵达黄山北站后，离真正的山岳参观仍隔着数项决定"],
        ["后续行程", "明确的机场、车站、酒店和固定安排", "下山延误会造成多大损失，取决于下一项安排有多难移动"],
      ],
    },
    {
      id: "mountain-figure", type: "figure", src: "/images/guides/huangshan-summit-or-gateway-base/hero-1600.webp", width: 1600, height: 1000,
      alt: "日出时分的黄山花岗岩峰林。",
      caption: "山顶住宿可能带来清晨或傍晚的独立观察时段，但这张已获许可的照片并不保证读者未来某天能看到日出、云海，也不代表届时天气或通行条件。",
    },
    { id: "gateway-heading", type: "heading", level: 2, text: "先锁定国际门户，再在地图上连路线" },
    {
      id: "gateway-workbook", type: "list", ordered: true,
      items: [
        "记录实际承运航空公司、抵达机场及航站楼、离境机场及航站楼、行李处理方式和改签条件。搜索结果并不等于已经出票的门户。",
        "如果入境和离境使用不同城市，检查它们是否确实位于陆路路线的两端。若开放式进出仍迫使你跨越整条路线折返，它并没有消除回头路。",
        "如果两段国际航班都使用上海，应在分配观光时间前，先把返回上海的交通和最后一晚写进路线。不要等安排完黄山才默认它们自然存在。",
        "若杭州机场看起来可用，应向实际承运航空公司和机场核实具体航班、航站楼与地面接驳。机场存在，不代表旅行日期一定有合适的国际航班。",
      ],
    },
    {
      id: "round-trip-rule", type: "callout", tone: "warning", title: "上海往返路线里，上海会出现两次，但承担不同任务",
      body: "抵达后的停留用于适应时差并开始旅程；离境前的停留，则用于吸收道路接驳延误、山岳运营调整或铁路中断对国际航班的影响。两段都叫上海，却不能互相替代。最后的缓冲并非额外观光日，也不能被悄悄塞进黄山区块。",
    },
    { id: "mountain-lock-heading", type: "heading", level: 2, text: "先搭好黄山区块，再决定杭州放在哪里" },
    {
      id: "mountain-contract", type: "list", ordered: true,
      items: [
        "先确定目标：一个完整登山日、含山顶住宿的两段式参观，或以山下住宿配合独立的徽州文化重点。不要把这些不同方案统称为模糊的“黄山一天”。",
        "使用黄山住宿决策指南，在山顶、汤口、温泉区或屯溪／黄山市区之间选择落脚点。本文承接该选择，不重复住宿判断。",
        "写明车票所列火车站和已核实的道路接驳点。2025年11月的官方交通通知只能证明黄山北站与多个景区入口是不同节点，不能证明某个班次在所有日期都会运行。",
        "依据当前预约指引和官方通知确定入口。2026年6月的一则政府通知宣布东大门和东海索道开放，说明旧有的“三个入口”概括已经过时。",
        "加入景区内部换乘，以及当前可用的索道或步道。只要其中任何一环未知，抵达仍只能算转场区块，整条路线也仍是有条件成立。",
        "保护离开黄山的链条：要让旅客有时间下山、取行李并抵达下一处有工作人员接待的落脚点，不能直接衔接国际航班或另一项无法替换的预约。",
      ],
    },
    {
      id: "base-handoff", type: "callout", tone: "neutral", title: "山顶还是门户住宿，由另一篇指南负责",
      body: "山顶房间可以支持分段游山及清晨、傍晚观察；汤口有利于保护南大门接驳；屯溪则更容易保护铁路和市区时间。这些属于住宿选择。它们在本文中只影响一件事：三地路线最早何时能安全进山，最晚何时能安全离开。",
    },
    {
      id: "station-figure", type: "figure", src: "/images/guides/shanghai-hangzhou-transport-route/hero-1600.webp", width: 1600, height: 1000,
      alt: "杭州东站内部。",
      caption: "这张已获许可的照片只能确认拍摄当日的杭州东站，不能证明读者出行日期的上海或黄山列车一定使用该站。",
    },
    { id: "hangzhou-heading", type: "heading", level: 2, text: "让杭州证明自己是有效衔接，而不只是列车之间顺手加上的地名" },
    {
      id: "hangzhou-test", type: "table", caption: "杭州可以承担的三种合理角色", columns: ["角色", "成立所需证据", "对路线的影响"],
      rows: [
        ["受保护的停留", "已为明确的西湖景观、山地、运河或另一项独立重点留出完整本地时段", "在上海与黄山之间保留杭州住宿"],
        ["仅作中转", "具体日期的车站换乘可行，但没有本地重点值得换酒店", "只有换乘链稳健时才使用车站；不要把它包装成杭州游览"],
        ["优先删减", "杭州唯一的活动依赖很晚抵达、很早离开或未经核实的行李方案", "先删杭州，而不是压缩黄山安全链或上海航班缓冲"],
      ],
    },
    { id: "route-traces-heading", type: "heading", level: 2, text: "三项锁定清楚后，再从三种路线走向中选择" },
    {
      id: "route-traces", type: "comparison", title: "顺序取决于固定的终点，而不是一条放之四海皆准的最佳方向", columns: [
        { heading: "顺向路线", items: ["上海是已经确认的抵达门户。", "杭州拥有受保护的本地作用。", "黄山之后能前往一个已核实的下一节点，且没有脆弱的当天衔接。", "路线：上海 → 杭州 → 黄山 → 后续目的地。"] },
        { heading: "反向路线", items: ["旅程从另一个已核实的节点抵达黄山。", "游山后，杭州仍然是一站真正的停留。", "上海是已经确认的国际离境门户，并留有受保护的最终缓冲。", "路线：黄山 → 杭州 → 上海。"] },
        { heading: "上海往返", items: ["两段长途机票都使用上海。", "黄山区块与离境航班之间保持距离。", "杭州只有在其目的足以承担额外酒店和铁路链时才保留。", "路线：上海抵达 → 黄山／杭州衔接顺序 → 上海航班缓冲。"] },
      ],
    },
    { id: "traveller-traces-heading", type: "heading", level: 2, text: "同样三个地名，三位旅客可能需要不同顺序" },
    {
      id: "trace-onward", type: "callout", tone: "neutral", title: "情境A：抵达上海，黄山后前往已核实的下一站",
      body: "旅客已有确认的上海抵达机票，对西湖有明确兴趣，黄山之后也有一个经过核实的后续节点。上海 → 杭州 → 黄山可以成立。不过，抵达黄山依然只是转场区块；后续固定安排必须放在受到保护的下山、道路及铁路接驳之后。如果最后一段链条无法核实，旅客应调整大路线方向或删掉较次要的一站，而不是在到达车站时就把黄山游览算作完成。",
    },
    {
      id: "trace-reverse", type: "callout", tone: "neutral", title: "情境B：从已核实的前序节点进入黄山，最后从上海离境",
      body: "旅客从已确认的前序节点抵达黄山，在杭州有一项明确的本地重点，并从上海搭乘国际航班。黄山 → 杭州 → 上海更稳妥，因为最后一座城市而不是山岳区块承担离境缓冲。如果下山或道路接驳延误，旅客删掉杭州的弹性活动或缩短停留；上海缓冲和国际航班不能被压缩。如果杭州唯一的目的经不起这条恢复规则，就把它改成中转点或直接删除。",
    },
    {
      id: "trace-roundtrip", type: "callout", tone: "warning", title: "情境C：上海往返，国际离境航班固定",
      body: "旅客想住山顶，也想去杭州，但最终从上海飞回国。以黄山收尾再赶机场的路线应直接淘汰。可以把黄山提前；若具体日期的交通链可靠，则让杭州成为风险较低的城市衔接点，最后回上海。也可以先走上海 → 杭州 → 黄山，再单独返回上海住最后一晚。胜出的版本应是日期链条和恢复能力更强的一条，而不是地图上看起来更漂亮的一条。",
    },
    { id: "failure-heading", type: "heading", level: 2, text: "哪项依赖失效，就修哪一项，不要压缩整趟旅行" },
    {
      id: "failure-recovery", type: "table", caption: "某项假设改变时的恢复顺序", columns: ["失效项", "第一步安全应对", "路线层面的决定"],
      rows: [
        ["首选列车或车站组合不可用", "在12306按真实日期查询可用的邻近车站组合", "只有整段酒店到酒店链条仍成立才保留原顺序；否则反向或删去衔接城市"],
        ["已预约入口、索道或步道有变", "遵照景区当前通知，并只在旅客能力范围内重画山内路线", "保护离开黄山的缓冲；不要凭空编造未经核实的徒步替代"],
        ["山上天气使预期景观消失", "只有在看不到该景观时，黄山体验仍有价值，才保留参观", "调整可变动的城市区块，不要移动国际航班"],
        ["下山或道路接驳延误", "联系下一家有人值守的酒店，并放弃弹性活动", "使用城市缓冲；绝不抢赶另一张独立国际机票"],
        ["杭州失去受保护的本地目的", "将其改成已核实的中转，或直接删去", "把腾出的时间还给黄山恢复空间或离境门户"],
      ],
    },
    { id: "dynamic-heading", type: "heading", level: 2, text: "把当前山岳运营状况留到最终核验层" },
    {
      id: "dynamic-checks", type: "list",
      items: [
        "在第一项可取消预订的截止日前：重新核实所选入口、住宿点、道路接驳和每一段具体日期的铁路行程。",
        "游山前约一周：查看景区通知列表，确认维修、季节性关闭和特别管控。",
        "前一天：重查官方天气和运营通知，然后保留事先商定的折返方案或山下替代。",
        "当天：以运营管理方的现场指引为准，本常青框架必须让位。天气预报从不保证日出或云海。",
      ],
    },
    { id: "final-heading", type: "heading", level: 2, text: "每一段交接都有核验方和备用方案，路线才算准备好" },
    {
      id: "final-verification", type: "table", caption: "最终按日期核验的交接项", columns: ["决定", "主要核验方", "仍无法确定时"],
      rows: [
        ["国际旅程起点与终点", "实际承运航空公司及具体机场", "两个方向都保持暂定"],
        ["上海与杭州的车站组合", "中国铁路12306及具体酒店地址", "不要承诺路线顺序，也不要承诺转场日还能游览"],
        ["黄山车站到景区入口链", "景区及客运官方渠道", "计入一个转场住宿夜，不安排登山区块"],
        ["住宿点、行李和山内路线", "具体酒店及景区当前管理方", "使用住宿决策指南中的山下备用方案"],
        ["天气、维修与离开缓冲", "景区当前通知及旅客自身限制", "把固定离境安排单独保护，并删去弹性活动"],
      ],
    },
    {
      id: "editorial-judgment", type: "callout", tone: "warning", title: "Homeground编辑判断",
      body: "先搭黄山区块再看时刻表、把杭州视为衔接点，以及拒绝下山当天直连国际航班，都是偏保守的规划判断。官方来源可以证明机场、遗产地理、交通节点和当前运营变化，却不会替某位具体旅客为整条路线背书。",
    },
    {
      id: "help-cta", type: "callout", tone: "decision", title: "需要人工帮你检验这三重锁定吗？",
      body: "请留下旅行日期、人数、大致预算、实际抵达及离境机场、行李情况，并说明日出和完整西湖时段哪一个更重要。Homeground可以帮你找出最薄弱的交接，但不会虚构实时班次，也不会免费交付一份完整私人行程。",
    },
    {
      id: "internal-links", type: "internal-links", title: "继续规划", items: [
        { label: "上海目的地规划", href: "/zh/destinations/shanghai/", description: "先确定上海作为门户的作用，再选择住宿晚数和区域。" },
        { label: "杭州目的地规划", href: "/zh/destinations/hangzhou/", description: "判断杭州是否拥有足以支撑住宿的本地目的。" },
        { label: "选择上海—杭州车站组合", href: "/zh/guides/shanghai-hangzhou-transport-route/", description: "确定路线顺序后，再执行具体日期的门到门铁路判断。" },
        { label: "选择黄山住宿基地", href: "/zh/guides/huangshan-summit-or-gateway-base/", description: "在山顶、汤口、温泉区或市区铁路基地间选择，本文不重复这项决定。" },
        { label: "比较开放式进出与同城往返门户", href: "/zh/guides/china-open-jaw-flights-route-planning/", description: "在确定路线方向前，先检验国际机票结构。" },
      ],
    },
    {
      id: "sources", type: "sources", title: "已复核的官方及一手来源", items: [
        { label: "按日期查询列车及旅客规则", url: "https://www.12306.cn/en/faq.html", publisher: "中国铁路12306", reviewedAt: "2026-09-01" },
        { label: "上海航班门户查询", url: "https://www.shairport.com/flights/index.html", publisher: "上海机场集团", reviewedAt: "2026-09-01" },
        { label: "上海铁路车站指南", url: "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html", publisher: "上海市人民政府", reviewedAt: "2026-09-01" },
        { label: "杭州机场航班查询", url: "https://www.hzairport.com/En/flight/index.html", publisher: "杭州萧山国际机场", reviewedAt: "2026-09-01" },
        { label: "杭州西湖文化景观", url: "https://whc.unesco.org/en/list/1334/", publisher: "联合国教科文组织世界遗产中心", reviewedAt: "2026-09-01" },
        { label: "黄山世界遗产记录", url: "https://whc.unesco.org/en/list/547/", publisher: "联合国教科文组织世界遗产中心", reviewedAt: "2026-09-01" },
        { label: "黄山北站至景区各入口交通通知", url: "https://hsgwh.huangshan.gov.cn/xwzx/tzgg/9308852.html", publisher: "黄山风景区管理委员会", reviewedAt: "2026-09-01" },
        { label: "景区换乘官方信息", url: "https://hsgwh.huangshan.gov.cn/lyfw/lyfw/jqhc/9197913.html", publisher: "黄山风景区管理委员会", reviewedAt: "2026-09-01" },
        { label: "东大门及东海索道开放通知", url: "https://www.huangshan.gov.cn/zwgk/public/6615714/12097855.html", publisher: "黄山市人民政府", reviewedAt: "2026-09-01" },
        { label: "黄山当前运营通知", url: "https://hsgwh.huangshan.gov.cn/xwzx/tzgg/index.html", publisher: "黄山风景区管理委员会", reviewedAt: "2026-09-01" },
        { label: "Politizer拍摄的黄山日出，CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:Huangshan_sunrise.jpg", publisher: "维基共享资源", reviewedAt: "2026-09-01" },
        { label: "知识共享署名3.0许可协议", url: "https://creativecommons.org/licenses/by/3.0/", publisher: "Creative Commons", reviewedAt: "2026-09-01" },
        { label: "Staeiou拍摄的杭州东站，CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Hangzhou_East_railway_station_interior.jpg", publisher: "维基共享资源", reviewedAt: "2026-09-01" },
        { label: "知识共享署名—相同方式共享4.0许可协议", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-09-01" },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
