import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "先从准确住宿基地出发，而不是只看“张家界”三个字。市区永定与武陵源是不同的最后一扇门；国铁车站只是抵达节点。用12306查询真实日期，读取两端完整中文名，再加入出站、当前道路交通、行李和酒店前台。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "先选基地，再判断列车",
      "tone": "decision",
      "body": "长沙站或长沙南出发到张家界西的实时车次可能很好，但不会把所有旅客直接送到景区。市区或天门山旅客与武陵源或森林公园旅客需要不同最后一程。不要按规划中或在建车站设计；以12306可售记录为准。"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "本页负责长沙到张家界的完整交接",
      "tone": "neutral",
      "body": "本页负责双向长沙—张家界走廊、准确铁路节点，以及交接到已经选定的基地。它不选择市区还是武陵源，不决定森林公园入口，不重复门票和游览路线，也不固化车次或旅游巴士。"
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "导出同时显示长沙或长沙南、张家界西和日期的订单，并与未来车站公告分开保存。",
        "把第一扇门写成长沙酒店与票面出发站，把最后一扇门写成已选市区/永定或武陵源住宿。",
        "标出硬截止：进站、酒店前台与任何定时景区入口，并写出最晚安全放弃点。",
        "时刻表之外另留大件行李、湘西天气及张家界西出站后的道路时间。",
        "保存12306、湖南交通公告与准确张家界酒店的当前核验入口，以及失效时的有人值守的张家界市区夜或移动景区预订。"
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "把长沙出发点与张家界抵达点一起选择"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "票面湖南车站必须支撑所选第一晚基地",
      "columns": [
        "湖南路线选项",
        "这条链何时可用",
        "第一晚核验",
        "必须防住的路线假设"
      ],
      "rows": [
        [
          "实时长沙站或长沙南出发",
          "12306出售真实车次，且酒店到站链条可执行。",
          "票面完整中文站名是什么，全部行李能否到达其入口？",
          "不要把长沙南替换长沙，也不要假设未来长沙西已承运。"
        ],
        [
          "张家界西 → 市区/永定",
          "已选酒店、天门山安排或下一交通位于市区侧。",
          "真实抵达时段，哪条合法出站到酒店路线仍可用？",
          "不要因张家界以景区闻名就自动继续去武陵源。"
        ],
        [
          "张家界西 → 武陵源/景区侧酒店",
          "基地owner已选择武陵源或明确景区侧住宿。",
          "当前合法接驳能否在前台和下一景区预订前到达准确酒店？",
          "不要把车站—武陵源旅程称为直达景区入口。"
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "长沙与张家界停靠必须按实时日期查询",
      "tone": "warning",
      "body": "只承认12306可售出发站，规划中或施工中的长沙节点不能使用。张家界西是火车站，不是景区入口；最后道路交接必须按季节、天气与所选基地复核。"
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "机场抵达、南站出发与景区住宿会拆出不同路线"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "从长沙起点量到市区或武陵源床位",
      "columns": [
        "湖南交通日",
        "组装路线的方法",
        "必须避免的住宿基地失败"
      ],
      "rows": [
        [
          "长沙酒店到张家界市区首晚",
          "选择可售出发站，保留进站时间，再把张家界西接到准确市区分店和前台；天门山票务留给原owner。",
          "旅客跟随景区方向接驳，结果远离已订市区酒店。"
        ],
        [
          "长沙到武陵源并携大箱",
          "比较张家界西后一次合法道路交接与多次公共交通换乘，包含装卸、排队、天气和酒店最后入口。",
          "看似便宜的方案在有效接驳窗口后把行李困在换乘点。"
        ],
        [
          "同日抵达并有定时景区预订",
          "把它视为脆弱的分开预订链条，加入列车延误、出站、道路交接、酒店行李和入口办理；余量不稳就移动景区任务。",
          "小幅铁路延误导致错过门票时段，火车票并不保障。"
        ]
      ]
    },
    {
      "id": "chain-heading",
      "type": "heading",
      "level": 2,
      "text": "把长沙出发接到张家界西和第一晚床位"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "准确长沙/长沙南—张家界西实时车次只是旅程中段",
      "columns": [
        {
          "heading": "从长沙酒店与票面出发站出发",
          "items": [
            "离开长沙酒店与票面出发站前确认退房或抵达状态。",
            "沿合法、有标识的路径处理大行李、山地天气与张家界西后的道路。",
            "提前到达票面节点，保护进站、酒店前台与任何定时景区入口。"
          ]
        },
        {
          "heading": "逐字读取准确长沙/长沙南—张家界西实时车次",
          "items": [
            "连同订单实时状态保存准确长沙/长沙南—张家界西实时车次。",
            "向12306、湖南交通公告与准确张家界酒店询问实时例外，不凭记忆套规律。",
            "实时记录要保留长沙或长沙南及张家界西；城市级定位会隐藏当天被接驳吃掉的时间。"
          ]
        },
        {
          "heading": "完成到已选市区/永定或武陵源住宿的交接",
          "items": [
            "从张家界西与酒店约定的出口离开，再执行已核实的市区或武陵源接驳。",
            "确认带着行李和剩余余量仍能到达已选市区/永定或武陵源住宿。",
            "交接失败时使用有人值守的张家界市区夜或移动景区预订，不要临时冒险。"
          ]
        }
      ]
    },
    {
      "id": "late-heading",
      "type": "heading",
      "level": 2,
      "text": "晚车与去景区的行李可能把第一晚移回市区"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "先保护张家界西到床位的交接，再选择速度",
      "columns": [
        "路线日限制",
        "更稳妥的湖南交接",
        "应拒绝的景区侧捷径"
      ],
      "rows": [
        [
          "大行李、山地天气与张家界西后的道路",
          "逐项计算长沙酒店与票面出发站到已选市区/永定或武陵源住宿之间的排队、电梯、换车和最后步行，优先减少不确定交接。",
          "交通图标能够证明到已选市区/永定或武陵源住宿全程无障碍。"
        ],
        [
          "抵达时间威胁进站、酒店前台与任何定时景区入口",
          "通知目的地并咨询12306、湖南交通公告与准确张家界酒店；最后交接无法核实时切换到有人值守的张家界市区夜或移动景区预订。",
          "白天前往已选市区/永定或武陵源住宿的接驳会在延误后继续运行。"
        ],
        [
          "已选市区/永定或武陵源住宿之后还有独立预订",
          "除非铁路抵达、张家界西接送、入住和休息各有余量，否则把定时景区项目放到次日。",
          "写在同一行程单上就能让下一运营方保障准确长沙/长沙南—张家界西实时车次。"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "走错湖南车站时，先保住张家界抵达夜"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "从有效订单读取长沙或长沙南，请车站人员确认同行人是否在票面车站。",
        "购买长沙跨站车辆前，先查看订单当前允许的票务处理。",
        "把实际会抵达张家界西的车次发给酒店，并询问接送是否仍运行。",
        "普通进站余量能够保留时才前往指定入口，否则采用铁路人员提供的改签方案。",
        "首晚转运已经无法留下休息与入住时间时，立即移动定时景区入口。",
        "没有可验证的景区侧抵达时，整组入住有人值守的张家界市区酒店，次晨再上山。"
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "这些变化需要重建长沙至张家界链条"
    },
    {
      "id": "answer-changes",
      "type": "list",
      "ordered": false,
      "items": [
        "12306改变可用长沙出发站或张家界车次。",
        "旅客在市区与武陵源基地间改变。",
        "本地道路、巴士、天气或上车运营变化。",
        "定时景区票成为分开预订的硬截止。",
        "行李或晚到使多次换乘方案失效。"
      ]
    },
    {
      "id": "checklist-heading",
      "type": "heading",
      "level": 2,
      "text": "长沙起点与张家界基地核验"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "按旅客真实日期重查准确长沙/长沙南—张家界西实时车次。",
        "保存长沙酒店与票面出发站到已选市区/永定或武陵源住宿之间所需准确中文名。",
        "记录已选市区/永定或武陵源住宿的联系方式和可用窗口。",
        "通过12306、湖南交通公告与准确张家界酒店确认当前合法接驳。",
        "按本团队重新计算大行李、山地天气与张家界西后的道路，不使用平均旅客假设。",
        "在进站、酒店前台与任何定时景区入口之前写明放弃点。",
        "发布周重开官方来源；链条失效时改用有人值守的张家界市区夜或移动景区预订。"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "常见问题"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "长沙哪个站去张家界？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "在12306查询真实日期，不替换票面长沙或长沙南，也不假设规划中车站已运营。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "张家界西站在国家森林公园里吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "不在。它是铁路抵达节点；市区与武陵源或景区侧酒店需要不同道路下一程。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "应该住市区还是武陵源？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "使用现有基地选择owner；本页在该决定后开始，执行抵达交接。"
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "抵达当天能进景区吗？"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "只有完整可验证链条留下充足余量才考虑；独立景区预订不受火车票保障。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "固定湖南交接后继续规划",
      "items": [
        {
          "label": "先看张家界城市指南",
          "href": "/zh/destinations/zhangjiajie/",
          "description": "把走廊放进完整停留。"
        },
        {
          "label": "选择市区或武陵源基地",
          "href": "/zh/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          "description": "由基地owner定义最后一扇门。"
        },
        {
          "label": "选择正确森林公园入口",
          "href": "/zh/guides/zhangjiajie-national-forest-park-tickets-and-entrances/",
          "description": "把入口与景区内执行和城市走廊分开。"
        },
        {
          "label": "比较夜车与白天高铁",
          "href": "/zh/guides/china-night-train-or-daytime-high-speed-rail/",
          "description": "选择实时走廊车次前先使用方式owner。"
        },
        {
          "label": "准备第一次中国铁路行程",
          "href": "/zh/guides/china-high-speed-train-first-time-guide/",
          "description": "购票与乘车流程留给全国owner。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源与图片署名",
      "items": [
        {
          "label": "12306官方实时查询",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "张家界西客运背景",
          "url": "https://jtt.hunan.gov.cn/jtt/xxgk/gzdt/szdt1/202602/t20260227_33922205.html",
          "publisher": "Hunan Department of Transport",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "长沙南—张家界西历史示例",
          "url": "https://jtt.hunan.gov.cn/xxgk/gzdt/szdt1/202501/t20250108_33557644.html",
          "publisher": "Hunan Department of Transport",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026年湖南假期交通证据",
          "url": "https://jtt.hunan.gov.cn/jtt/jjzdgz/2026cyzl/cyjb2026/202603/t20260325_33940867.html",
          "publisher": "Hunan Department of Transport",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "张家界国家森林公园官方入口",
          "url": "https://www.zjjpark.com/",
          "publisher": "Zhangjiajie National Forest Park",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "题图：长沙南站",
          "url": "https://commons.wikimedia.org/wiki/File%3AChangsha_South_Railway_Station.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
