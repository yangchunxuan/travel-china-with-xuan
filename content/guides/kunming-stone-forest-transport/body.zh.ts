import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "到石林西的火车不是开进喀斯特景区，车辆订单只写“石林”也不是完整下车点。先确定官方游客中心或票务交接，再从酒店比较全链：出发站点、主行程、本地转运、入园办理和可补救返程。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "每种方案都需要最后一次交接",
      "tone": "decision",
      "body": "实时昆明南—石林西车次合适，且到游客中心下一程已核实时，铁路可能合理。当前巴士若真实上下车点与返程可用，可能减少换乘。合法车辆能简化门和行李，但不能绕过票务、景区交通规则或准确会合点。"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "本页负责什么",
      "tone": "neutral",
      "body": "本页负责双向昆明—石林交通链与正确游客中心交接。它不讲阿诗玛故事，不选择云南多城顺序，不卖票或车，不排名供应商，也不固化火车、巴士、票价、停车和开放时间。"
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "截图并离线保存准确昆明出发点与石林官方游客中心交接；不要用地图简称替换。",
        "把第一扇门写成昆明南、当前巴士站或合法车辆上车点，把最后一扇门写成石林西加本地转运，或明确游客中心/停车点。",
        "标出硬截止：入园办理与可验证昆明返程，并写出最晚安全放弃点。",
        "逐段计算最后一程等待、家庭行李、景区交通管制与炎热/降雨，不要只抄主行程时长。",
        "保存12306、石林景区管理与云南当前交通的当前核验入口，以及失效时的返回石林县城/车站或保护有人值守的昆明过夜。"
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
          "昆明南 → 石林西 → 游客中心",
          "12306出售实时车次，且当前合法最后一程可完成准确游客中心交接。",
          "真实到达后石林西有什么接驳，它在景区哪里停？",
          "不要把石林西称为景区入口，也不要假设有车等待。"
        ],
        [
          "当前昆明道路巴士 → 游客中心",
          "官方或当前运营方确认准确出发点、终点、行李规则与可用返程。",
          "它是直达游客中心，还是到石林县城后还要换乘？",
          "不要沿用旧指南中的巴士站、时刻或票价。"
        ],
        [
          "合法包车或租车 → 明确停车场/游客中心",
          "车辆、司机或租车条件、景区交通规则和准确合法下车点均确认。",
          "游览后团队在哪里重聚，无信号备选是什么？",
          "“门到门”报价不证明车辆能越过景区交通管制。"
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "不要把今天的运营方式写成永久规律",
      "tone": "warning",
      "body": "石林西不是景区入口，历史巴士信息也会快速过期。发布前重开12306与石林交通、票务页，核实合法下车点和返程，不沿用旧车站、票价或接驳承诺。"
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
          "从昆明酒店独立一日游",
          "比较酒店到出发点、主行程、最后交接、票务和留有余量的返程；选最后接驳可核实的链条，不只选中段最快。",
          "去程可行，但旅客发现返程从另一地点或更早窗口出发。"
        ],
        [
          "携行李家庭游览后继续下一城市",
          "决定行李合法存放位置和责任人，避免拖全部箱子进景区，也不要建立无保障的石林—铁路硬衔接。",
          "车辆在游客中心更换，但行李约定只覆盖第一程。"
        ],
        [
          "抵达昆明机场后前往石林",
          "把KMG视为机场链条，不假设直达巴士。加入入境或取行李、当前机场出口、真实铁路/巴士/车辆出发点和有人值守备选，再尝试景区。",
          "航班延误使最后可验证景区交接消失，也没有可补救返程。"
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
      "title": "准确昆明出发点与石林官方游客中心交接只是旅程中段",
      "columns": [
        {
          "heading": "从昆明南、当前巴士站或合法车辆上车点出发",
          "items": [
            "离开昆明南、当前巴士站或合法车辆上车点前确认退房或抵达状态。",
            "沿合法、有标识的路径处理最后一程等待、家庭行李、景区交通管制与炎热/降雨。",
            "提前到达票面节点，保护入园办理与可验证昆明返程。"
          ]
        },
        {
          "heading": "逐字读取准确昆明出发点与石林官方游客中心交接",
          "items": [
            "连同订单实时状态保存准确昆明出发点与石林官方游客中心交接。",
            "向12306、石林景区管理与云南当前交通询问实时例外，不凭记忆套规律。",
            "不得用城市级地图定位替换有效票面。"
          ]
        },
        {
          "heading": "完成到石林西加本地转运，或明确游客中心/停车点的交接",
          "items": [
            "使用当前有标识出口、合法上车点或已核实本地接驳。",
            "确认带着行李和剩余余量仍能到达石林西加本地转运，或明确游客中心/停车点。",
            "交接失败时使用返回石林县城/车站或保护有人值守的昆明过夜，不要临时冒险。"
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
          "最后一程等待、家庭行李、景区交通管制与炎热/降雨",
          "逐项计算昆明南、当前巴士站或合法车辆上车点到石林西加本地转运，或明确游客中心/停车点之间的排队、电梯、换车和最后步行，优先减少不确定交接。",
          "交通图标能够证明到石林西加本地转运，或明确游客中心/停车点全程无障碍。"
        ],
        [
          "抵达时间威胁入园办理与可验证昆明返程",
          "通知目的地并咨询12306、石林景区管理与云南当前交通；最后交接无法核实时切换到返回石林县城/车站或保护有人值守的昆明过夜。",
          "白天前往石林西加本地转运，或明确游客中心/停车点的接驳会在延误后继续运行。"
        ],
        [
          "石林西加本地转运，或明确游客中心/停车点之后还有独立预订",
          "在入园办理与可验证昆明返程之前加入准确出口、本地交接与办理时间；余量不足就调整预订。",
          "写在同一行程单上就能让下一运营方保障准确昆明出发点与石林官方游客中心交接。"
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
        "停止移动，重开准确昆明出发点与石林官方游客中心交接，与眼前标识逐字比较。",
        "向12306、石林景区管理与云南当前交通确认错误属于入口、本地支线还是完全不同节点。",
        "跨区域付费前，查询与准确昆明出发点与石林官方游客中心交接对应的实时改签、退票或重订路径，不承诺结果。",
        "若转场仍合理，导航到石林西加本地转运，或明确游客中心/停车点，把可验证到达与入园办理与可验证昆明返程比较。",
        "向目的地说明昆明南、当前巴士站或合法车辆上车点发生的具体情况、现在会到的节点及需要调整的预订。",
        "余量消失时让同行人和行李保持一起，并在工作人员帮助下使用返回石林县城/车站或保护有人值守的昆明过夜。"
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
        "12306车次库存或昆明、石林车站分配变化。",
        "官方或当前巴士出发点、终点变化。",
        "游客中心、停车、票务或景区交通管制变化。",
        "天气、施工或客流管控影响交接。",
        "航班、铁路返程或行李要求成为硬约束。"
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
        "按旅客真实日期重查准确昆明出发点与石林官方游客中心交接。",
        "保存昆明南、当前巴士站或合法车辆上车点到石林西加本地转运，或明确游客中心/停车点之间所需准确中文名。",
        "记录石林西加本地转运，或明确游客中心/停车点的联系方式和可用窗口。",
        "通过12306、石林景区管理与云南当前交通确认当前合法接驳。",
        "按本团队重新计算最后一程等待、家庭行李、景区交通管制与炎热/降雨，不使用平均旅客假设。",
        "在入园办理与可验证昆明返程之前写明放弃点。",
        "发布周重开官方来源；链条失效时改用返回石林县城/车站或保护有人值守的昆明过夜。"
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
      "text": "火车直接到石林景区吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "不直接到。实时列车可到石林西；还需单独核实本地接驳，完成到官方游客中心或票务交接。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "巴士还是火车更快？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "没有永久赢家。比较酒店到游客中心及返程的全程与每次换乘，不只看公开主行程时间。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "包车能开进景区吗？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "不要假设可以。核实当前合法下车或停车点与景区交通规则；车辆可能停在管制区外。"
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "本页讲阿诗玛传说吗？"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "不讲。本页只负责交通；文化故事保留在独立owner，不复制进路线说明。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续解决下一步真实问题",
      "items": [
        {
          "label": "把昆明放进云南路线顺序",
          "href": "/guides/kunming-dali-lijiang-shangri-la-route-order/",
          "description": "多城顺序留给现有owner。"
        },
        {
          "label": "比较包车与公共交通",
          "href": "/guides/china-private-transfer-or-public-transport/",
          "description": "准确游客中心交接明确后再选方式。"
        },
        {
          "label": "准备第一次中国铁路行程",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "全国购票与乘车流程单独处理。"
        },
        {
          "label": "检查中国节假日客流",
          "href": "/guides/china-public-holidays-travel-calendar/",
          "description": "客流管控会改变游客中心和返程链条。"
        },
        {
          "label": "选择接驳便利的昆明酒店",
          "href": "/guides/china-hotel-near-metro/",
          "description": "使用准确出发节点，不只看笼统中心标签。"
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
          "label": "石林景区官方交通页",
          "url": "https://park.shilin.com.cn/public/park/zh-CHS/detail-427-31916.html",
          "publisher": "Stone Forest Scenic Area",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "石林官方票务与游客中心信息",
          "url": "https://park.shilin.com.cn/public/park/zh-CHS/detail-421-33417.html",
          "publisher": "Stone Forest Scenic Area",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "昆明—石林官方交通背景",
          "url": "https://jtyst.yn.gov.cn/html/2019/jiaotongyaowen_0802/98128.html",
          "publisher": "Yunnan Department of Transport",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "题图：石林西站",
          "url": "https://commons.wikimedia.org/wiki/File%3A%E7%9F%B3%E6%9E%97%E8%A5%BF%E7%AB%99.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
