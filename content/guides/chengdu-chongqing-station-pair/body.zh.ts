import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "decision-lead",
      type: "lead",
      text: "成都—重庆票据不只是两城之间的一段快线，而是一组准确中文站名连接两扇酒店门。先在12306查询真实日期，再比较酒店到站、铁路段、出站以及重庆立体城市的最后接驳。无论正向还是反向，出票后以票面组合为准。",
    },
    {
      id: "quick-answer",
      type: "callout",
      title: "选对组合，比主行程最快更重要",
      tone: "decision",
      body: "成都东和重庆北是常见搜索锚点，但不是永久通用答案。按真实日期和方向查看12306实时结果；只有同一车次同时显示的两个端点才构成已核实站对，再由两端酒店地址判断它是否合适。",
    },
    {
      id: "scope-boundary",
      type: "callout",
      title: "本页负责成都与重庆的站对选择",
      tone: "neutral",
      body: "本页只负责双向成都—重庆车站组合和酒店到酒店的衔接。是否三城都去、重庆各站怎么选、全国购票流程、两城住哪里，以及重庆—张家界铁路段，都由各自页面负责。",
    },
    {
      id: "before-booking",
      type: "list",
      ordered: true,
      items: [
        "保存12306当日订单的两端中文站名；成都东—重庆北与其他站对不是同一条路线的简称。",
        "把第一扇门写成成都酒店入口与准确出发站入口，把最后一扇门写成重庆出站广场与立体城市中的最后酒店门。",
        "标出硬截止：进站、酒店前台与下一项独立预订，并写出最晚安全放弃点。",
        "把成都与重庆两端市内接驳、重庆高差和搬运行李放在车程之外比较。",
        "如果原组合已经不稳，在开始跨城转站前改选可售站对；晚到风险无法消除时，先保住一个有人值守的抵达夜。",
      ],
    },
    {
      id: "matrix-heading",
      type: "heading",
      level: 2,
      text: "先核实一个实时车次，再把两个站名视为站对",
    },
    {
      id: "decision-matrix",
      type: "table",
      caption: "不固化默认站对，按真实日期和两端酒店地址完成核对",
      columns: ["出票前核对", "在12306怎么核实", "通过标准", "必须排除的捷径"],
      rows: [
        [
          "找到一个可售车次",
          "按真实日期和方向查询，打开一个车次结果，并保存同一结果中的两端完整中文站名。",
          "两个端点出现在同一车次中，而且真实出行日仍可购买座位。",
          "不要因为两个站名分别出现在不同搜索中，就自行把它们拼成站对。",
        ],
        [
          "核对两端酒店接驳",
          "只用该车次显示的两端，计算成都酒店到出发入口，以及重庆出站口到准确酒店门。",
          "即使铁路段稍长，只要减少很长的市内接驳或困难换乘，门到门仍可能更省力。",
          "不要因东、西、南、北等站名后缀，就假设它靠近所有同方向酒店或景点。",
        ],
        [
          "购买前与出行前复查",
          "确认同一日期的该车次仍同时显示已保存的两端；任一端变化，都要重新计算门到门链条。",
          "当前车次仍停靠已保存的两端，而且两个准确入口都能按计划使用。",
          "不要镜像推断反向车次、保留旧站对，或仅凭两个站名推断存在直达服务。",
        ],
      ],
    },
    {
      id: "dynamic-warning",
      type: "callout",
      title: "实时停靠会改变最佳成渝站对",
      tone: "warning",
      body: "车次与停靠安排可能变化。必须按真实日期和方向查询，不固化一组最快组合，不凭站名推断存在直达，也不假设返程仍使用相同端点。",
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "三种行程，适合的站对并不相同",
    },
    {
      id: "scenario-table",
      type: "table",
      caption: "从成都门口量到重庆门口",
      columns: ["成渝旅程", "核验站对的方法", "必须保护的双城接驳"],
      rows: [
        [
          "成都中心酒店到解放碑",
          "比较退房到站台及重庆出站到前台，包含正确广场、坡度和行李。稍慢车次若省掉一段长市内接驳，可能反而更优。",
          "最快列车抵达酒店相反一侧，晚间定时预订被打乱。",
        ],
        [
          "携行李家庭前往西侧或南侧",
          "计算合法打车、电梯、站内步行和减少一次换乘的价值，不要把短铁路变成楼梯接力。",
          "便宜组合制造两次困难换乘，并让团队在大站走散。",
        ],
        [
          "晚到并有独立晚间预订",
          "核实当前本地交通窗口、酒店前台和放弃点；不要把夜晚押在最后一段无保障接驳上。",
          "列车小幅延误就使计划中的末班地铁或入住窗口消失。",
        ],
      ],
    },
    {
      id: "chain-heading",
      type: "heading",
      level: 2,
      text: "连起成都出发门、两座车站与重庆地址",
    },
    {
      id: "door-to-door-chain",
      type: "comparison",
      title: "票面站对只是旅程中段，酒店到酒店才是全程",
      columns: [
        {
          heading: "从成都酒店入口与准确出发站入口出发",
          items: [
            "出发前确认退房时间，并向酒店核实带行李前往票面成都站的实际入口。",
            "比较道路拥堵、地铁换乘、站内步行和同行人的行李，不只看地图直线距离。",
            "按正常安检和候车流程留余量，不把下一项独立预订贴在列车到达时间后面。",
          ],
        },
        {
          heading: "逐字读取12306实时显示的成都—重庆票面组合",
          items: [
            "把车次、两端完整中文站名和订单状态保存在一起。",
            "车次或站点有变化时，以12306当前订单和车站工作人员解释为准，不凭上次经验套用。",
            "12306订单必须保留两端完整中文站名；只写城市的定位会抹掉决定走廊效率的接驳。",
          ],
        },
        {
          heading: "完成到重庆出站广场与立体城市中的最后酒店门的交接",
          items: [
            "从票面重庆车站的标识出口离开，再走已核实的接驳到山城最终地址。",
            "把正确出站口、道路可达一侧、酒店前台时间和行李一起核对。",
            "末段无法确认时，在出发前换一组可售站对，或把抵达夜安排得更简单。",
          ],
        },
      ],
    },
    {
      id: "late-heading",
      type: "heading",
      level: 2,
      text: "行李与重庆立体末段可能击败最快车次",
    },
    {
      id: "late-table",
      type: "table",
      caption: "先保护两端站场接驳，再节省铁路段分钟数",
      columns: ["成渝限制", "更抗风险的站对", "应排除的双城捷径"],
      rows: [
        [
          "两端车站选择、重庆坡度与行李",
          "逐项计算成都酒店到出发站、重庆出站到酒店之间的排队、电梯、换车和最后步行，优先减少不确定交接。",
          "不要把地图上的换乘图标当成全程无台阶、无坡度的证明。",
        ],
        [
          "抵达时间威胁进站、酒店前台与下一项独立预订",
          "先在12306查询后续选择，再确认酒店还能接待哪个重庆抵达站，然后在改选前重算完整门到门链条。",
          "不要假设白天可用的地铁、车辆入口或酒店接待会在晚到后原样保留。",
        ],
        [
          "抵达重庆后还有另一张独立票或定时预约",
          "购买前把出站、山城道路接驳和下一节点重新进场的全过程算进去。",
          "写在同一份行程单上，不会自动变成受保障的联程。",
        ],
      ],
    },
    {
      id: "corridor-mismatch",
      type: "callout",
      title: "票面站对与计划不一致时，先停下，不要立刻跨城转站",
      tone: "warning",
      body: "重庆车站选择或走错站补救，请使用下方对应中文的重庆火车站选择指南；本页只重算成都—重庆的门到门链条。",
    },
    {
      id: "changes-heading",
      type: "heading",
      level: 2,
      text: "这些变化需要更换成渝站对",
    },
    {
      id: "answer-changes",
      type: "list",
      ordered: false,
      items: [
        "12306改变实时车站组合或库存。",
        "成都或重庆酒店分店变化。",
        "车站入口、广场或本地交通运营变化。",
        "行李、行动条件或晚到使换乘变脆弱。",
        "分开票据截止比主行程速度更重要。",
      ],
    },
    {
      id: "checklist-heading",
      type: "heading",
      level: 2,
      text: "成渝双城站对出发前核验",
    },
    {
      id: "final-checklist",
      type: "list",
      ordered: false,
      items: [
        "按旅客真实日期重查12306实时显示的成都—重庆票面组合。",
        "分别保存成都酒店、票面成都站入口、票面重庆站出站口和重庆酒店的准确中文名。",
        "记录重庆酒店联系方式、前台时间和车辆可达一侧。",
        "以12306当前订单确认站对；本地接驳则以运营信息、现场标识和酒店核实为准。",
        "按本团队重新计算两端车站选择、重庆坡度与行李，不使用平均旅客假设。",
        "在进站、酒店前台与下一项独立预订之前写明放弃点。",
        "发布周和出发前重查；任一端接驳失效时，改选可售站对或简化抵达夜。",
      ],
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "常见问题",
    },
    {
      id: "faq-1-question",
      type: "heading",
      level: 3,
      text: "成都东到重庆北永远最好吗？",
    },
    {
      id: "faq-1-answer",
      type: "paragraph",
      text: "不是。这是常见组合，但实时车次和两端准确地址可能让另一组合更优。",
    },
    {
      id: "faq-2-question",
      type: "heading",
      level: 3,
      text: "应该只选铁路时间最短的吗？",
    },
    {
      id: "faq-2-answer",
      type: "paragraph",
      text: "比较退房到前台总时长、换乘、行李和可补救性；铁路最短可能全程最长。",
    },
    {
      id: "faq-3-question",
      type: "heading",
      level: 3,
      text: "重庆到成都也用本页吗？",
    },
    {
      id: "faq-3-answer",
      type: "paragraph",
      text: "是。把出发酒店和到达酒店对调，再按真实日期和方向核实票面上的两个车站。",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "锁定成渝站对后继续规划",
      items: [
        {
          label: "先判断成都、重庆、张家界是否都要去",
          href: "/zh/guides/chengdu-chongqing-zhangjiajie-route-order/",
          description: "先决定三城顺序、夜数分配，以及时间不够时删去哪一城。",
        },
        {
          label: "规划成都一侧",
          href: "/zh/destinations/chengdu/",
          description: "把车站放进完整成都停留。",
        },
        {
          label: "继续规划重庆到张家界",
          href: "/zh/guides/chongqing-zhangjiajie-transport-route/",
          description: "成渝站对确定后，再规划下一段铁路和张家界酒店接驳。",
        },
        {
          label: "规划重庆一侧",
          href: "/zh/destinations/chongqing/",
          description: "把抵达站匹配到真实区域和立体城市路线。",
        },
        {
          label: "理解重庆各火车站",
          href: "/zh/guides/chongqing-railway-station-selector/",
          description: "车站名称或位置不清时，先比较重庆各站。",
        },
        {
          label: "理解重庆上下城",
          href: "/zh/guides/chongqing-upper-lower-city-orientation/",
          description: "最后一公里可能包含真实垂直移动。",
        },
        {
          label: "准备第一次乘中国高铁",
          href: "/zh/guides/china-high-speed-train-first-time-guide/",
          description: "查看全国通用的购票、进站、检票与乘车流程。",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "官方来源与图片署名",
      items: [
        {
          label: "12306官方实时查询",
          url: "https://www.12306.cn/en/index.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-09-01",
        },
        {
          label:
            "2026年8月28日至30日成都东—重庆北临时加开（整份公告覆盖2026年8月26日至9月30日）",
          url: "https://www.12306.cn/mormhweb/zxdt_news/202608/t20260825_46254.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-09-01",
        },
        {
          label: "2026年7月11日至8月14日成都、重庆临时列车公告",
          url: "https://www.12306.cn/mormhweb/zxdt_news/202607/t20260710_46062.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-09-01",
        },
        {
          label: "重庆铁路2026年1月26日起运行图调整",
          url: "https://www.cq.gov.cn/ywdt/jrcq/202601/t20260122_15343341.html",
          publisher: "Chongqing Municipal Government",
          reviewedAt: "2026-09-01",
        },
        {
          label: "题图：成都东站",
          url: "https://commons.wikimedia.org/wiki/File%3AChengdu_East_Railway_Station.JPG",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-09-01",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
