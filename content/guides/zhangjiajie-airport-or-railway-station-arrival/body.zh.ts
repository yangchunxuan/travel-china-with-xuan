import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "DYG、张家界站和张家界西是不同抵达记录。预订后以代码或完整中文站名为准；预订前只比较真实运营的航班或车次，并补全到准确市区或武陵源酒店、已订景区入口的旅程，而不是只到名为“张家界”的地图点。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "票面之后看住宿基地与预约入口",
      "tone": "decision",
      "body": "DYG和张家界站位于市区、天门山一侧；张家界西站是另一座当前高铁节点。它们都不是森林公园入口，也不自动等于武陵源。先由住宿页面决定市区还是武陵源，再由本页把票面节点连接到准确住宿。"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "本页负责什么",
      "tone": "neutral",
      "body": "本页负责DYG、张家界站和张家界西站身份，以及与既定住宿基地的交接、晚到行李和走错节点补救。它不决定住市区还是武陵源，不重复森林公园票务与入口流程，也不固化航班、车次、旅游客运或打车时间。"
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "截图并离线保存票面的DYG、张家界站或张家界西抵达节点；不要用地图简称替换。",
        "把第一扇门写成抵达航班或列车及其真实出口，把最后一扇门写成已订市区/永定或武陵源酒店分店。",
        "标出硬截止：酒店前台、天门山预订或森林公园入场，并写出最晚安全放弃点。",
        "逐段计算山地天气、道路交接、行李与不同基地，不要只抄主行程时长。",
        "保存实时航司/12306记录、张家界交通与准确酒店的当前核验入口，以及失效时的有人值守的市区过夜或调整景区侧预订。"
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
          "张家界荷花国际机场 / DYG",
          "实际航班使用DYG，且落地时段机场到住宿的完整链条可执行。",
          "取行李后，当前合法交通能否到达准确酒店、前台和下一预订？",
          "航班落地不等于抵达武陵源或景区入口。"
        ],
        [
          "张家界站",
          "实时车次使用市区车站，且市区、天门山或中心客运区域链条受益。",
          "真实车次能否抵消其运营方式以及之后去住宿基地的移动？",
          "不要把所有张家界铁路抵达都称为张家界站。"
        ],
        [
          "张家界西站",
          "实时高铁使用西站，且去真实市区或武陵源住宿的道路链已核实。",
          "哪一个有标识上车点、公共服务或住宿接送能完成最后一段，尤其在天黑后？",
          "西站不是武陵源，也不能与市区张家界站互换。"
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "不要把今天的运营方式写成永久规律",
      "tone": "warning",
      "body": "DYG、张家界站和张家界西对应不同第一段道路，旅游交通还会随季节、天气和客流管控变化。核实实时抵达与酒店侧交接，绝不能把火车站写成森林公园入口。"
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
          "傍晚DYG抵达并住武陵源",
          "确认酒店分店和前台、当前机场上车点、完整道路段，并设定长距离交接失败后住市区的截止。不要用未经核实的深夜车辆去赌次日景区时段。",
          "航班落地，但武陵源住宿已无法接待团队。"
        ],
        [
          "西站抵达并安排市区或天门山",
          "向酒店或合法接送方明确发送“张家界西”，加入出站和道路时间；天门山票务与路线仍由景点页面负责。住市区可作为合理交接，不表示西站车次选错。",
          "接送在张家界站等待，旅客却从张家界西出站。"
        ],
        [
          "晚班火车后次日早场景区",
          "先保护睡眠和既定基地，再考虑脆弱的深夜转运。景区页面负责入口与时段；本页判断抵达侧交接是否仍可验证，或应改为有人值守的市区过夜。",
          "错过夜间客运后既冒险乘坐路边车辆，又错过次日入园。"
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
      "title": "票面的DYG、张家界站或张家界西抵达节点只是旅程中段",
      "columns": [
        {
          "heading": "从抵达航班或列车及其真实出口出发",
          "items": [
            "离开抵达航班或列车及其真实出口前确认退房或抵达状态。",
            "沿合法、有标识的路径处理山地天气、道路交接、行李与不同基地。",
            "提前到达票面节点，保护酒店前台、天门山预订或森林公园入场。"
          ]
        },
        {
          "heading": "逐字读取票面的DYG、张家界站或张家界西抵达节点",
          "items": [
            "连同订单实时状态保存票面的DYG、张家界站或张家界西抵达节点。",
            "向实时航司/12306记录、张家界交通与准确酒店询问实时例外，不凭记忆套规律。",
            "不得用城市级地图定位替换有效票面。"
          ]
        },
        {
          "heading": "完成到已订市区/永定或武陵源酒店分店的交接",
          "items": [
            "使用当前有标识出口、合法上车点或已核实本地接驳。",
            "确认带着行李和剩余余量仍能到达已订市区/永定或武陵源酒店分店。",
            "交接失败时使用有人值守的市区过夜或调整景区侧预订，不要临时冒险。"
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
          "山地天气、道路交接、行李与不同基地",
          "逐项计算抵达航班或列车及其真实出口到已订市区/永定或武陵源酒店分店之间的排队、电梯、换车和最后步行，优先减少不确定交接。",
          "交通图标能够证明到已订市区/永定或武陵源酒店分店全程无障碍。"
        ],
        [
          "抵达时间威胁酒店前台、天门山预订或森林公园入场",
          "通知目的地并咨询实时航司/12306记录、张家界交通与准确酒店；最后交接无法核实时切换到有人值守的市区过夜或调整景区侧预订。",
          "白天前往已订市区/永定或武陵源酒店分店的接驳会在延误后继续运行。"
        ],
        [
          "已订市区/永定或武陵源酒店分店之后还有独立预订",
          "在酒店前台、天门山预订或森林公园入场之前加入准确出口、本地交接与办理时间；余量不足就调整预订。",
          "写在同一行程单上就能让下一运营方保障票面的DYG、张家界站或张家界西抵达节点。"
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
        "停止移动，重开票面的DYG、张家界站或张家界西抵达节点，与眼前标识逐字比较。",
        "向实时航司/12306记录、张家界交通与准确酒店确认错误属于入口、本地支线还是完全不同节点。",
        "跨区域付费前，查询与票面的DYG、张家界站或张家界西抵达节点对应的实时改签、退票或重订路径，不承诺结果。",
        "若转场仍合理，导航到已订市区/永定或武陵源酒店分店，把可验证到达与酒店前台、天门山预订或森林公园入场比较。",
        "向目的地说明抵达航班或列车及其真实出口发生的具体情况、现在会到的节点及需要调整的预订。",
        "余量消失时让同行人和行李保持一起，并在工作人员帮助下使用有人值守的市区过夜或调整景区侧预订。"
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
        "实时票面在DYG、张家界站和张家界西之间变化。",
        "住宿基地在市区和武陵源之间变化。",
        "景区入口、时段或首个景点成为主导截止。",
        "天气、道路或旅游客运运营变化。",
        "晚到或行李使最后可验证交接消失。"
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
        "按旅客真实日期重查票面的DYG、张家界站或张家界西抵达节点。",
        "保存抵达航班或列车及其真实出口到已订市区/永定或武陵源酒店分店之间所需准确中文名。",
        "记录已订市区/永定或武陵源酒店分店的联系方式和可用窗口。",
        "通过实时航司/12306记录、张家界交通与准确酒店确认当前合法接驳。",
        "按本团队重新计算山地天气、道路交接、行李与不同基地，不使用平均旅客假设。",
        "在酒店前台、天门山预订或森林公园入场之前写明放弃点。",
        "发布周重开官方来源；链条失效时改用有人值守的市区过夜或调整景区侧预订。"
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
      "text": "张家界西站在武陵源吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "不在。它是独立铁路节点，到准确武陵源住宿或景区侧目的地仍需道路链。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "DYG就在森林公园入口旁吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "不是。机场在市区、天门山一侧；去森林公园仍需住宿基地和准确入口链。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "住市区选哪个抵达点最好？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "先看实时航班或车次，再比较完整接驳。DYG或张家界站可能减少市区移动，但西站明显更好的车次仍可能胜出。"
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "司机到了错误张家界车站怎么办？"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "发送完整中文站名和实时到达更新，使用当前有标识交通或重新安排接送；不要靠陌生路边车辆补救。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续解决下一步真实问题",
      "items": [
        {
          "label": "先看张家界城市指南",
          "href": "/destinations/zhangjiajie/",
          "description": "把抵达节点放进完整目的地计划。"
        },
        {
          "label": "选择住市区还是武陵源",
          "href": "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          "description": "先定住宿基地，再补全抵达链。"
        },
        {
          "label": "确认森林公园票务与入口",
          "href": "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/",
          "description": "景区侧时段和入口交给现有页面。"
        },
        {
          "label": "比较夜车与白天高铁",
          "href": "/guides/china-night-train-or-daytime-high-speed-rail/",
          "description": "匹配张家界抵达节点前先选择更大的铁路方式。"
        },
        {
          "label": "第一次坐中国高铁",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "继续处理护照、进站和登车。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源与图片署名",
      "items": [
        {
          "label": "张家界荷花国际机场官方页面",
          "url": "https://www.hunanairport.cn/content/zjjAirPort.html",
          "publisher": "Hunan Airport Group",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "实时铁路车次与车站查询",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026年张家界西站客运记录",
          "url": "https://jtt.hunan.gov.cn/jtt/xxgk/gzdt/szdt1/202602/t20260227_33922205.html",
          "publisher": "Hunan Department of Transportation",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "市区到景区客运联系",
          "url": "https://jtt.hunan.gov.cn/xxgk/gzdt/szdt1/202506/t20250610_33706126.html",
          "publisher": "Hunan Department of Transportation",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "景区官方票务与入口复核",
          "url": "https://www.hnzjj.com/index.php/Ticket/show/2.html",
          "publisher": "Zhangjiajie Scenic Area",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "题图：张家界荷花国际机场",
          "url": "https://commons.wikimedia.org/wiki/File%3AZhangjiajie_Airport_(27796134377).jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
