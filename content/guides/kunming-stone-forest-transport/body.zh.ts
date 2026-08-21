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
      "title": "本页负责昆明到石林的转运选择",
      "tone": "neutral",
      "body": "本页负责双向昆明—石林交通链与正确游客中心交接。它不讲阿诗玛故事，不选择云南多城顺序，不卖票或车，不排名供应商，也不固化火车、巴士、票价、停车和开放时间。"
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "记录准确昆明出发点及石林官方游客中心或停车交接；石林西只是铁路终点。",
        "把第一扇门写成昆明南、当前巴士站或合法车辆上车点，把最后一扇门写成石林西加本地转运，或明确游客中心/停车点。",
        "标出硬截止：入园办理与可验证昆明返程，并写出最晚安全放弃点。",
        "把石林西等待、家庭行李、景区交通管制和炎热或降雨放在标示行车时间之外测算。",
        "保存12306、石林景区管理与云南当前交通的当前核验入口，以及失效时的返回石林县城/车站或保护有人值守的昆明过夜。"
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "通过正确游客中心比较火车、客车与包车"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "石林西站是铁路节点，不是石林景区入口",
      "columns": [
        "石林路线",
        "这种方式何时合适",
        "游客中心核验",
        "必须防住的终点错误"
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
      "title": "必须重查石林西末段与官方游客中心接驳",
      "tone": "warning",
      "body": "石林西不是景区入口，历史巴士信息也会快速过期。发布前重开12306与石林交通、票务页，核实合法下车点和返程，不沿用旧车站、票价或接驳承诺。"
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "昆明南、市中心与车辆出发需要不同石林方案"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "从昆明起点量到景区标识入园流程",
      "columns": [
        "石林出行模式",
        "核验路线的方法",
        "必须防住的游客中心失败"
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
      "text": "把昆明、石林西或公路下客点接到游客中心"
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
            "计划中必须同时写清昆明起点与官方石林游客中心交接；“石林”定位不是入口。"
          ]
        },
        {
          "heading": "完成到石林西加本地转运，或明确游客中心/停车点的交接",
          "items": [
            "到石林西后走当前标识出口与已核实本地接驳；公路方式则确认官方游客中心或停车下客点。",
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
      "text": "石林西末段可能比最快铁路段更影响选择"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "先保护游客中心接驳，再比较票面旅行时间",
      "columns": [
        "石林限制",
        "更稳妥的入园方案",
        "应拒绝的石林捷径"
      ],
      "rows": [
        [
          "最后一程等待、家庭行李、景区交通管制与炎热/降雨",
          "家庭旅客应比较石林西等待换车与合法直达车辆，并加入炎热、降雨和景区入口需要携带的物品。",
          "交通图标能够证明到石林西加本地转运，或明确游客中心/停车点全程无障碍。"
        ],
        [
          "抵达时间威胁入园办理与可验证昆明返程",
          "通知目的地并咨询12306、石林景区管理与云南当前交通；最后交接无法核实时切换到返回石林县城/车站或保护有人值守的昆明过夜。",
          "白天前往石林西加本地转运，或明确游客中心/停车点的接驳会在延误后继续运行。"
        ],
        [
          "石林西加本地转运，或明确游客中心/停车点之后还有独立预订",
          "返程必须独立保护：加入离开景区、回到石林西或客车点及最后班次自身的登乘流程。",
          "写在同一行程单上就能让下一运营方保障准确昆明出发点与石林官方游客中心交接。"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "到错石林终点时，返回官方有人值守交接点"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "先判断同行人位于石林西、石林县城还是非官方道路定位，并向人员出示铁路或车辆记录。",
        "向景区管理确认官方游客办理地点，再向本地交通人员询问从当前位置出发的线路。",
        "购买替代末段前检查有效铁路或客车订单，任何调整以对应运营方当前条款为准。",
        "只有工作人员能说清接驳，且入园与可信昆明返程都仍开放时才继续。",
        "告诉昆明酒店实际使用哪一趟返程，并取消在其他终点等待的车辆。",
        "景区日已无法补救时，全组留在石林有人值守交通节点，乘已核实服务返回昆明。"
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "这些变化需要改选石林路线"
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
      "text": "石林游客中心与末段核验"
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
      "title": "确认石林入园接驳后继续规划",
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
