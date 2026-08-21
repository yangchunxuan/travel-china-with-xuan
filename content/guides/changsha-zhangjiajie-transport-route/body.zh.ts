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
      "title": "本页负责什么",
      "tone": "neutral",
      "body": "本页负责双向长沙—张家界走廊、准确铁路节点，以及交接到已经选定的基地。它不选择市区还是武陵源，不决定森林公园入口，不重复门票和游览路线，也不固化车次或旅游巴士。"
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "截图并离线保存准确长沙/长沙南—张家界西实时车次；不要用地图简称替换。",
        "把第一扇门写成长沙酒店与票面出发站，把最后一扇门写成已选市区/永定或武陵源住宿。",
        "标出硬截止：进站、酒店前台与任何定时景区入口，并写出最晚安全放弃点。",
        "逐段计算大行李、山地天气与张家界西后的道路，不要只抄主行程时长。",
        "保存12306、湖南交通公告与准确张家界酒店的当前核验入口，以及失效时的有人值守的张家界市区夜或移动景区预订。"
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "比较完整旅程，不要只看城市名"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "实时票面和准确目的地始终高于任何经验规则",
      "columns": [
        "节点或接驳链",
        "什么情况下值得比较",
        "真正决定答案的问题",
        "必须避免的错误"
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
      "title": "不要把今天的运营方式写成永久规律",
      "tone": "warning",
      "body": "只承认12306可售出发站，规划中或施工中的长沙节点不能使用。张家界西是火车站，不是景区入口；最后道路交接必须按季节、天气与所选基地复核。"
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "三条旅程，答案可能完全不同"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "从旅客真实的第一扇门和最后一扇门出发",
      "columns": [
        "旅客链条",
        "可执行的判断方法",
        "必须防住的失败"
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
      "text": "把门到门旅程拆完整"
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
            "不得用城市级地图定位替换有效票面。"
          ]
        },
        {
          "heading": "完成到已选市区/永定或武陵源住宿的交接",
          "items": [
            "使用当前有标识出口、合法上车点或已核实本地接驳。",
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
      "text": "行李、晚到和行动不便会改变答案"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "保护最脆弱的交接点，而不是地图上最短的线",
      "columns": [
        "限制条件",
        "更稳妥的工作方案",
        "不要想当然"
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
          "在进站、酒店前台与任何定时景区入口之前加入准确出口、本地交接与办理时间；余量不足就调整预订。",
          "写在同一行程单上就能让下一运营方保障准确长沙/长沙南—张家界西实时车次。"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "走错节点后，按这个顺序补救"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "停止移动，重开准确长沙/长沙南—张家界西实时车次，与眼前标识逐字比较。",
        "向12306、湖南交通公告与准确张家界酒店确认错误属于入口、本地支线还是完全不同节点。",
        "跨区域付费前，查询与准确长沙/长沙南—张家界西实时车次对应的实时改签、退票或重订路径，不承诺结果。",
        "若转场仍合理，导航到已选市区/永定或武陵源住宿，把可验证到达与进站、酒店前台与任何定时景区入口比较。",
        "向目的地说明长沙酒店与票面出发站发生的具体情况、现在会到的节点及需要调整的预订。",
        "余量消失时让同行人和行李保持一起，并在工作人员帮助下使用有人值守的张家界市区夜或移动景区预订。"
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "出现这些情况，答案会反转"
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
      "text": "最终订票与发布日复核清单"
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
      "title": "继续解决下一步真实问题",
      "items": [
        {
          "label": "先看张家界城市指南",
          "href": "/destinations/zhangjiajie/",
          "description": "把走廊放进完整停留。"
        },
        {
          "label": "选择市区或武陵源基地",
          "href": "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          "description": "由基地owner定义最后一扇门。"
        },
        {
          "label": "选择正确森林公园入口",
          "href": "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/",
          "description": "把入口与景区内执行和城市走廊分开。"
        },
        {
          "label": "比较夜车与白天高铁",
          "href": "/guides/china-night-train-or-daytime-high-speed-rail/",
          "description": "选择实时走廊车次前先使用方式owner。"
        },
        {
          "label": "准备第一次中国铁路行程",
          "href": "/guides/china-high-speed-train-first-time-guide/",
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
