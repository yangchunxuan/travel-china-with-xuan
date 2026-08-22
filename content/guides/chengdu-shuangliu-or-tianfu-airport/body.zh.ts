import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "出票后，CTU或TFU不是偏好问题：订单上的机场代码和航站楼就是硬约束。出票前，只比较真实日期实际运营的航班，并把当前酒店或上一城市到值机、以及取行李后到成都第一晚住宿或下一程的完整链条算进去。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "航班决定机场，全程决定航班",
      "tone": "decision",
      "body": "CTU靠近成都中心和西侧时常进入候选；TFU位于城市东南，是重要航空门户，可能提供更合适的航班。两者没有永远的赢家。加入早班、晚到、跨城火车站换乘或乡村下一程后，更便宜或更快的航班可能失去优势。"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "本页负责双流与天府之间的选择",
      "tone": "neutral",
      "body": "本页负责出票前CTU/TFU选择、出票后代码与航站楼确认、机场到酒店或铁路的完整链条，以及走错机场补救。它不排名航司，不固化航站楼或巴士时刻，不替所有中国航班决定最后一晚，也不重复成都—九寨沟和熊猫基地页面。"
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "保存同时列出CTU或TFU、航站楼、航班号与航司截止的行程页，并把原记录发给接送司机。",
        "把第一扇门写成准确成都酒店、火车站或乡村返回点，把最后一扇门写成正确机场航站楼或成都第一晚准确分店。",
        "标出硬截止：航司值机、登机与独立铁路预订，并写出最晚安全放弃点。",
        "按照实际行李计算航站楼步行、两座机场不同的市内线路和换乘成本。",
        "保存航司、CTU/TFU机场服务与成都当前交通的当前核验入口，以及失效时的航司改签或有人值守的机场侧过夜。"
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "用完整成都抵达链比较双流和天府"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "实时订单上的机场代码与航站楼决定落地点",
      "columns": [
        "成都机场链",
        "CTU或TFU何时合适",
        "决定机场的门到门核验",
        "应拒绝的机场假设"
      ],
      "rows": [
        [
          "成都双流国际机场 / CTU",
          "实际航班在此运营，且到酒店、火车站或下一预订的城市侧链条更稳。",
          "较短市内接驳能否在真实航班时间、航站楼、行李和值机余量下仍占优势？",
          "不要假设CTU承运所有国内航班，也不要沿用旧航司列表。"
        ],
        [
          "成都天府国际机场 / TFU",
          "合适航班在TFU运营，或东侧、东南侧链条与当前地面接驳使全程更合理。",
          "出机场后，准确酒店、车站或下一程是否仍能在有补救余量下到达？",
          "TFU航线多，不等于离所有成都酒店更近，也不保证衔接每趟铁路。"
        ],
        [
          "CTU与TFU跨机场补救",
          "只在确认票面代码且旅客确实到了错误机场后。",
          "当前官方道路或轨道方案能否在航司截止前，以明显安全余量到达正确航站楼？",
          "地图时长不是受保护联程；转场、改签和过夜是三种不同决策。"
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "双流与天府的航司和航站楼分配必须重查",
      "tone": "warning",
      "body": "航司可能在CTU、TFU及航站楼间调整，机场轨道和巴士窗口也会独立变化。出票后以有效订单为准；发布周复核双机场与成都当前地面交通，不发布永久航司列表。"
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "三种成都抵达会偏向不同机场"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "从入境航班算到真实成都酒店门口",
      "columns": [
        "成都抵达方式",
        "比较CTU与TFU的方法",
        "必须保护的机场交接"
      ],
      "rows": [
        [
          "国际抵达并入住成都中心",
          "比较入境和取行李、当前机场轨道或道路、准确酒店分店、最后步行和前台时间。航班更方便的机场，若落地后接驳太晚，也可能失去优势。",
          "旅客落在正确机场，却在最后可验证接驳后到达无人值守的酒店分店。"
        ],
        [
          "熊猫或九寨沟行程后的早班机",
          "由最后一晚指南决定住哪里；本页提供真实机场、航站楼、值机截止和地面链条。不要为了多玩一小时而制造未经核实的凌晨接驳。",
          "乡村或晚归旅客凌晨才发现所订机场位于成都另一侧。"
        ],
        [
          "航班衔接同日成都铁路",
          "同时确认机场代码和完整中文火车站名，加入入境或取行李、出机场、真实跨城接驳、进站和扰动余量。分开购买的票不会保证列车等待。",
          "旅客到达正确机场，却去了错误的成都火车站，错过最后衔接。"
        ]
      ]
    },
    {
      "id": "chain-heading",
      "type": "heading",
      "level": 2,
      "text": "拆出CTU与TFU从入境到酒店的时间"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "比较两条完整机场链",
      "columns": [
        {
          "heading": "出发侧链条",
          "items": [
            "酒店或上一城市到正确机场",
            "正确航站楼和航司截止",
            "行李、安检和适用的出境流程"
          ]
        },
        {
          "heading": "到达侧链条",
          "items": [
            "入境或国内到达与取行李",
            "当前机场轨道、巴士或合法道路上车点",
            "准确酒店入口和前台"
          ]
        },
        {
          "heading": "衔接链条",
          "items": [
            "完整中文火车站或明确下一基地",
            "分开票据的扰动余量",
            "改签或有人值守过夜备选"
          ]
        }
      ]
    },
    {
      "id": "late-heading",
      "type": "heading",
      "level": 2,
      "text": "大件行李和晚落地会放大双机场差距"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "先保护成都最后接驳，不被较短航程误导",
      "columns": [
        "机场限制",
        "更稳妥的双机场方案",
        "应排除的机场捷径"
      ],
      "rows": [
        [
          "晚到TFU或CTU",
          "取行李后复核当前官方机场交通，使用有标识的出租车或网约车流程，或已核实的酒店接送，并通知准确分店。",
          "白天地铁或巴士会等延误航班。"
        ],
        [
          "大行李或行动不便",
          "计算航站楼步行、电梯确定性、每次换乘和酒店最后入口；可以比较合法直达车辆，但不假设有车或固定价格。",
          "机场轨道图标能证明全程无障碍到酒店。"
        ],
        [
          "出发前走错机场",
          "确认代码和航站楼，联系航司，把当前跨机场到达时间与值机或登机截止比较，再决定转场、改签或过夜。",
          "打车估算快，就表示航司会接收迟到旅客。"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "到错成都机场时，不要先横穿城市"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "打开有效订单，读取CTU或TFU、航站楼、航班号、日期和航司截止。",
        "确认你是同一机场走错航站楼，还是到了完全错误的机场。",
        "长距离转场前联系航司或机场服务点，询问当前订单而非泛泛规则。",
        "把当前官方轨道或道路到达正确航站楼的时间，与值机、登机截止和安检时间比较。",
        "余量不足时改签或保护过夜，不要为无保障联程横穿成都。",
        "在对方截止前通知酒店、铁路或下一接送方抵达变化。"
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "这些变化会改写双流与天府的选择"
    },
    {
      "id": "answer-changes",
      "type": "list",
      "ordered": false,
      "items": [
        "实际航班改到另一机场或航站楼。",
        "首末晚酒店从成都中心或西侧改到东侧、东南侧。",
        "同日火车、九寨沟出发或限时熊猫参观成为硬截止。",
        "航班改到可验证地面交通窗口之外的早晚时段。",
        "行李或行动需求使额外机场—城市换乘不可接受。"
      ]
    },
    {
      "id": "checklist-heading",
      "type": "heading",
      "level": 2,
      "text": "CTU与TFU订票及出发周核验"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "从实时订单读取CTU或TFU及航站楼，不只看成都。",
        "发布周重新打开航司和成都机场查询。",
        "保存准确酒店分店和中文地址。",
        "核实真实时段的机场轨道、巴士、出租车和网约车上车方式。",
        "把航司值机和登机截止写入计划。",
        "为分开票据的铁路或乡村接驳准备真实备选。",
        "设定何时停止转场并改为改签或过夜。"
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
      "text": "CTU一定比TFU离市中心近吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "相较位于东南的TFU，CTU通常更靠城市，但距离不能单独决定。可用航班、准确酒店、航站楼、抵达时段和下一程共同决定。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "成都某一个机场承运所有国际航班吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "不要使用按航班类型判断机场的经验规则。机场和航站楼分配会变化，2026年7月的地区航班调整正说明其动态性；以有效航司订单为准。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "可以同日从CTU转到TFU吗？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "可能可以，但这是无保障的跨城转场。核实当前官方路线、航站楼到航站楼的到达时间和两家航司截止；余量不明显安全就改签或过夜。"
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "去九寨沟选哪个成都机场？"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "没有永久答案。先选择真实航班，再由成都—九寨沟页面决定下一段方式和基地；两者之间的酒店过夜、火车站或长途道路都必须计入。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "确定成都机场后继续规划",
      "items": [
        {
          "label": "先看成都城市指南",
          "href": "/zh/destinations/chengdu/",
          "description": "把机场放进完整首次成都行程。"
        },
        {
          "label": "继续安排成都到九寨沟",
          "href": "/zh/guides/chengdu-jiuzhaigou-transport-route/",
          "description": "确定真实机场后，再选择下一段方式和基地。"
        },
        {
          "label": "选择成都熊猫参观地",
          "href": "/zh/guides/chengdu-panda-base-or-dujiangyan-panda-valley/",
          "description": "把限时景点决定与机场选择分开。"
        },
        {
          "label": "保护国际航班前最后一晚",
          "href": "/zh/guides/china-last-night-before-international-flight/",
          "description": "在机场和出发时刻确定后决定住哪里。"
        },
        {
          "label": "比较包车与公共交通",
          "href": "/zh/guides/china-private-transfer-or-public-transport/",
          "description": "按交接、行李、运营窗口和备选判断地面段。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源与图片署名",
      "items": [
        {
          "label": "2026年7月30日地区航班调整",
          "url": "https://www.cdairport.com/news_detail.aspx?cid=6393&page=1&t=60",
          "publisher": "Chengdu Airports",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "成都机场官方地面交通入口",
          "url": "https://www.cdairport.com/traffic3.aspx?t=36",
          "publisher": "Chengdu Airports",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "成都机场官方公告档案",
          "url": "https://www.cdairport.com/news_detail.aspx?cid=2507&page=4&t=60",
          "publisher": "Chengdu Airports",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "中国铁路实时车站与车次查询",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "题图：成都天府国际机场",
          "url": "https://commons.wikimedia.org/wiki/File%3A%E6%88%90%E9%83%BD%E5%A4%A9%E5%BA%9C%E5%9B%BD%E9%99%85%E6%9C%BA%E5%9C%BA_Chengdu_Tianfu_International_Airport_2.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
