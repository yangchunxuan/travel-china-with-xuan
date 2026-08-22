import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "订单一旦写明PEK或PKX，机场和航站楼就是硬约束。出票前只比较真实日期运营航班，并计算酒店—机场或机场—铁路的完整旅程。北京双机场位于大城市不同侧，仅看“离市中心近”无法保护航班。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "先认机场代码，再测试全程",
      "tone": "decision",
      "body": "PEK位于北京中心东北，PKX位于南侧。酒店、北京火车站、抵达时段或下一城市会反转看似明显的答案。航司与航站楼会变化，不要把某航司永久绑定到一座机场；以有效票面和当前机场、市政接驳为准。"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "本页负责首都与大兴机场的选择",
      "tone": "neutral",
      "body": "本页负责出票前PEK/PKX选择、出票后代码与航站楼确认、酒店或铁路交接和走错机场补救。它不重复北京南站—机场窄任务，不选择北京八座火车站，不排名航司，也不固化机场轨道、巴士和打车时间。"
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "保留写明PEK或PKX、实际航站楼与航班号的行程页，并把中文机场名告知车辆调度。",
        "把第一扇门写成准确北京酒店或八大主要火车站之一，把最后一扇门写成正确首都/大兴航站楼或北京首晚准确分店。",
        "标出硬截止：航司值机、登机与北京铁路出发，并写出最晚安全放弃点。",
        "把北京东北侧或南侧接驳、航站楼内部移动和搬运行李拆成独立耗时。",
        "保存航司、PEK/PKX服务台与北京当前交通的当前核验入口，以及失效时的航司改签或正确机场侧有人值守的过夜。"
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "从完整北京旅程比较首都机场与大兴机场"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "实时行程中的PEK或PKX决定机场",
      "columns": [
        "北京机场链",
        "PEK或PKX何时合适",
        "航站楼到门口的核验",
        "必须避免的机场代码错误"
      ],
      "rows": [
        [
          "北京首都国际机场 / PEK",
          "真实航班使用PEK，且东北侧或中心酒店、铁路链条可执行。",
          "哪个航站楼、当前机场接驳和酒店或车站入口能在此时段完成旅程？",
          "不要假设所有国际航司都用PEK，也不要把航站楼互换。"
        ],
        [
          "北京大兴国际机场 / PKX",
          "真实航班使用PKX，且南侧轨道或道路链适合酒店、北京南或西侧及下一程。",
          "航班优势能否在完整接驳和航司截止下仍成立，尤其早晚时段？",
          "大兴机场线快，不等于所有北京地址接驳都短或有保障。"
        ],
        [
          "PEK与PKX走错机场补救",
          "只在确认有效代码且旅客确实到了另一机场后。",
          "当前官方转场能否在航司截止前，以明显安全余量到达正确航站楼？",
          "公开巴士或地图时长不是跨机场联程保证。"
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "PEK与PKX的航司和航站楼安排可能调整",
      "tone": "warning",
      "body": "PEK和PKX位于北京不同侧，航站楼、机场巴士和轨道时间会独立变化。出票后以有效代码为准；发布前重开双机场和北京交通来源，不永久绑定航司。"
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "使馆区、北京南部和同日转机需要不同机场逻辑"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "从实时航站楼量到真实北京门口",
      "columns": [
        "北京航班链",
        "比较PEK与PKX的方法",
        "必须控制的航站楼失败"
      ],
      "rows": [
        [
          "抵达北京中心或东北侧酒店",
          "比较入境或取行李、当前机场轨道或道路、准确酒店分店和晚间前台。PEK可能减少市内段，但只有真实PEK航班才能使用这个优势。",
          "旅客理论上选了更近机场，但真实航班在PKX运营。"
        ],
        [
          "从北京南侧酒店赶早班机",
          "在机场和值机截止明确后，由最后一晚页面决定住哪里；比较可验证的凌晨接驳，不使用白天机场线承诺。",
          "团队带行李出发时，计划中的轨道交通尚未运营。"
        ],
        [
          "航班衔接北京铁路出发",
          "同时确认机场代码和北京八大铁路节点中的完整中文站名。铁路页面选择车站；本页保护机场—车站交接和分开票据余量。",
          "机场正确，但旅客导航到错误北京火车站。"
        ]
      ]
    },
    {
      "id": "chain-heading",
      "type": "heading",
      "level": 2,
      "text": "拆出航站楼、市内接驳与北京酒店门口"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "有效订单的PEK/PKX代码、航站楼、航班与航司截止只是旅程中段",
      "columns": [
        {
          "heading": "从准确北京酒店或八大主要火车站之一出发",
          "items": [
            "离开准确北京酒店或八大主要火车站之一前确认退房或抵达状态。",
            "沿合法、有标识的路径处理北京两侧距离、航站楼步行与跨机场行李。",
            "提前到达票面节点，保护航司值机、登机与北京铁路出发。"
          ]
        },
        {
          "heading": "逐字读取有效订单的PEK/PKX代码、航站楼、航班与航司截止",
          "items": [
            "连同订单实时状态保存有效订单的PEK/PKX代码、航站楼、航班与航司截止。",
            "向航司、PEK/PKX服务台与北京当前交通询问实时例外，不凭记忆套规律。",
            "工作记录必须保留PEK或PKX及实时航站楼；泛化的“北京机场”定位不够准确。"
          ]
        },
        {
          "heading": "完成到正确首都/大兴航站楼或北京首晚准确分店的交接",
          "items": [
            "按实时航站楼标识前往对应机场线或本航班已核实的合法接送点。",
            "确认带着行李和剩余余量仍能到达正确首都/大兴航站楼或北京首晚准确分店。",
            "交接失败时使用航司改签或正确机场侧有人值守的过夜，不要临时冒险。"
          ]
        }
      ]
    },
    {
      "id": "late-heading",
      "type": "heading",
      "level": 2,
      "text": "入境、行李与晚落地会重算PEK和PKX"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "先保护航站楼到酒店余量，再比较票面价格",
      "columns": [
        "北京机场限制",
        "更稳妥的航站楼方案",
        "应拒绝的双机场假设"
      ],
      "rows": [
        [
          "北京两侧距离、航站楼步行与跨机场行李",
          "带行李或行动受限时，分别计算酒店到机场线、铁路换乘及航站楼步行；少一次北京换乘可能比低票价更重要。",
          "交通图标能够证明到正确首都/大兴航站楼或北京首晚准确分店全程无障碍。"
        ],
        [
          "抵达时间威胁航司值机、登机与北京铁路出发",
          "通知目的地并咨询航司、PEK/PKX服务台与北京当前交通；最后交接无法核实时切换到航司改签或正确机场侧有人值守的过夜。",
          "白天前往正确首都/大兴航站楼或北京首晚准确分店的接驳会在延误后继续运行。"
        ],
        [
          "正确首都/大兴航站楼或北京首晚准确分店之后还有独立预订",
          "航班接铁路时，先加入入境、取行李、离开航站楼及具名北京车站的重新进站，再决定是否购买火车票。",
          "写在同一行程单上就能让下一运营方保障有效订单的PEK/PKX代码、航站楼、航班与航司截止。"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "到错北京机场时，先联系航司再跨城"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "从航司行程读取PEK或PKX及航站楼，并在当前机场的服务台出示。",
        "先确认只是航站楼调整，还是人在完全不同机场；两种补救不可混用。",
        "购买首都机场与大兴之间的车辆前，让航司说明当前航班可执行的处理。",
        "只有可验证抵达正确航站楼明显早于行李托运截止时，才尝试跨机场。",
        "告知酒店或北京铁路衔接最终使用哪座机场，并取消已无法保住的截止。",
        "当天航班无法恢复时，带着行李留在正确机场，安排有人值守的过夜。"
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "这些变化会重新计算PEK与PKX"
    },
    {
      "id": "answer-changes",
      "type": "list",
      "ordered": false,
      "items": [
        "航司调整机场或航站楼。",
        "酒店在东北、中心、南侧或西侧之间变化。",
        "北京火车站或分开票据出发成为硬截止。",
        "机场轨道、巴士、道路施工或航站楼接驳变化。",
        "早晚航班移出已核实公共交通窗口。"
      ]
    },
    {
      "id": "checklist-heading",
      "type": "heading",
      "level": 2,
      "text": "PEK与PKX航站楼及接驳核验"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "按旅客真实日期重查有效订单的PEK/PKX代码、航站楼、航班与航司截止。",
        "保存准确北京酒店或八大主要火车站之一到正确首都/大兴航站楼或北京首晚准确分店之间所需准确中文名。",
        "记录正确首都/大兴航站楼或北京首晚准确分店的联系方式和可用窗口。",
        "通过航司、PEK/PKX服务台与北京当前交通确认当前合法接驳。",
        "按本团队重新计算北京两侧距离、航站楼步行与跨机场行李，不使用平均旅客假设。",
        "在航司值机、登机与北京铁路出发之前写明放弃点。",
        "发布周重开官方来源；链条失效时改用航司改签或正确机场侧有人值守的过夜。"
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
      "text": "北京哪个机场离市中心近？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "PEK通常位于东北，更靠近许多中心或东北地址；PKX在南侧。但距离不能单独选航班，真实服务、航站楼、酒店和截止共同决定。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "国际航班都使用PEK吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "不是。不要按航班类型或航司记忆分配机场，直接读取有效订单上的PEK或PKX及航站楼。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "PEK和PKX之间可以转场吗？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "可能有当前道路或巴士方案，但这是长距离无保障转场。把到达正确航站楼与航司截止比较；余量不足就改签或过夜。"
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "本页替代北京南站到机场指南吗？"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "不替代。该页负责票面北京南站到机场的窄任务；本页按整段旅程选择PEK或PKX，再把北京南站案例交给窄页面。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "固定北京机场后继续规划",
      "items": [
        {
          "label": "先看北京城市指南",
          "href": "/zh/destinations/beijing/",
          "description": "把机场放进完整首次北京行程。"
        },
        {
          "label": "选择北京住宿区域",
          "href": "/zh/guides/beijing-where-to-stay-first-trip/",
          "description": "让准确酒店提供城市侧最后一扇门。"
        },
        {
          "label": "选择北京八座主要火车站",
          "href": "/zh/guides/which-beijing-railway-station/",
          "description": "建立机场衔接前先确定铁路节点。"
        },
        {
          "label": "从北京南站前往首都或大兴机场",
          "href": "/zh/guides/beijing-south-station-to-capital-or-daxing-airport/",
          "description": "真实车站为北京南时使用这一窄页面。"
        },
        {
          "label": "保护国际航班前最后一晚",
          "href": "/zh/guides/china-last-night-before-international-flight/",
          "description": "确定机场和截止后选择睡眠位置。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源与图片署名",
      "items": [
        {
          "label": "北京当前地铁与机场接驳",
          "url": "https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202607/t20260707_4750977.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "首都机场官方地面交通",
          "url": "https://english.beijing.gov.cn/specials/beijingservice/pek/trafficsix/",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "大兴机场官方交通与航站楼服务",
          "url": "https://zdzqgw.beijing.gov.cn/zqfw/bjdxgjjc/",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026年机场巴士调整",
          "url": "https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202603/t20260330_4569298.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "题图：北京大兴国际机场",
          "url": "https://commons.wikimedia.org/wiki/File%3ABeijing_Daxing_International_Airport_Terminal_20191005.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
