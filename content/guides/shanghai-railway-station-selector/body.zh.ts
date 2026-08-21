import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "上海站、上海虹桥站、上海南站和上海松江站是四座不同的主要客运站。出票后以中文站名为硬约束；出票前比较实时车次以及到准确酒店、SHA或PVG航班、下一城市的完整链条，不沿用旧的方向规则。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "虹桥适合部分链条，不是上海默认答案",
      "tone": "decision",
      "body": "虹桥铁路—机场综合体可能减少真实SHA衔接；上海站服务中心城区；南站可能适合徐汇南侧；松江站可能改变西南或区域链条。上海官方把四站都列为主要站，但真实日期车次和最后一扇门才决定。"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "本页负责什么",
      "tone": "neutral",
      "body": "本页负责四站选择、虹桥铁路—机场交接边界和走错站补救。它不比较PVG与SHA，不重复上海—杭州走廊，不选择住宿区域，也不发布单站或方向页。"
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "截图并离线保存票面的上海、上海虹桥、上海南或上海松江站；不要用地图简称替换。",
        "把第一扇门写成上海酒店、浦东/虹桥航班或郊区地址，把最后一扇门写成正确车站入口及下一机场、酒店或城市。",
        "标出硬截止：铁路安检加机场或分开票据截止，并写出最晚安全放弃点。",
        "逐段计算虹桥综合枢纽、中心区换乘与松江距离，不要只抄主行程时长。",
        "保存12306、上海铁路与上海当前交通公告的当前核验入口，以及失效时的跨城赶站前改签，或保护机场/车站侧过夜。"
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
          "上海站",
          "实时车次与静安或附近中心酒店链使其合理。",
          "中心位置能否胜过另一车站明显更好的车次？",
          "上海站是一座特定车站，不是上海任意站。"
        ],
        [
          "上海虹桥站",
          "实时车次有优势、西侧酒店合适，或已核实SHA衔接受益于综合枢纽。",
          "旅客去的是铁路站还是机场航站楼，航站楼和截止是否核实？",
          "虹桥火车站和虹桥机场相连，但不是同一值机点。"
        ],
        [
          "上海南站",
          "真实车次使用南站，且徐汇或城市南侧、区域下一程链条可执行。",
          "南侧位置能否在不牺牲车次的前提下减少真实最后一程？",
          "南站不是上海站南入口。"
        ],
        [
          "上海松江站",
          "实时车次使用松江站，且西南侧酒店、景点或区域链条受益。",
          "旅客真实目的地在松江，还是只因车次快就选了它？",
          "大型新站不等于去外滩或中心酒店自动方便。"
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "不要把今天的运营方式写成永久规律",
      "tone": "warning",
      "body": "上海站与上海松江不可互换，虹桥铁路—机场优势也取决于真实航站楼和时段。发布前重开12306与上海运营公告，不固化按方向分站或机场线时间。"
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
          "铁路衔接虹桥航班",
          "确认SHA、航站楼、航司截止和真实火车站，加入铁路出站、步行或换乘、机场安检和扰动余量；不要把同名枢纽当成受保护联程。",
          "旅客准时到虹桥火车站，却错过机场航站楼截止。"
        ],
        [
          "晚班列车到中心酒店",
          "把真实车次与当前夜间本地交通、酒店分店和前台比较。到上海站可能减少风险；晚到虹桥、南站或松江需要可验证道路备选。",
          "规划时使用的地铁已停运，留下行李和无人协助的最后步行。"
        ],
        [
          "区域列车与上海西南任务",
          "只有车次和准确西南侧目的地同时受益时，松江或南站才进入候选；上海—杭州站对执行仍归现有页面。",
          "更快铁路段却把旅客留在远离酒店或下一出发的位置。"
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
      "title": "票面的上海、上海虹桥、上海南或上海松江站只是旅程中段",
      "columns": [
        {
          "heading": "从上海酒店、浦东/虹桥航班或郊区地址出发",
          "items": [
            "离开上海酒店、浦东/虹桥航班或郊区地址前确认退房或抵达状态。",
            "沿合法、有标识的路径处理虹桥综合枢纽、中心区换乘与松江距离。",
            "提前到达票面节点，保护铁路安检加机场或分开票据截止。"
          ]
        },
        {
          "heading": "逐字读取票面的上海、上海虹桥、上海南或上海松江站",
          "items": [
            "连同订单实时状态保存票面的上海、上海虹桥、上海南或上海松江站。",
            "向12306、上海铁路与上海当前交通公告询问实时例外，不凭记忆套规律。",
            "不得用城市级地图定位替换有效票面。"
          ]
        },
        {
          "heading": "完成到正确车站入口及下一机场、酒店或城市的交接",
          "items": [
            "使用当前有标识出口、合法上车点或已核实本地接驳。",
            "确认带着行李和剩余余量仍能到达正确车站入口及下一机场、酒店或城市。",
            "交接失败时使用跨城赶站前改签，或保护机场/车站侧过夜，不要临时冒险。"
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
          "虹桥综合枢纽、中心区换乘与松江距离",
          "逐项计算上海酒店、浦东/虹桥航班或郊区地址到正确车站入口及下一机场、酒店或城市之间的排队、电梯、换车和最后步行，优先减少不确定交接。",
          "交通图标能够证明到正确车站入口及下一机场、酒店或城市全程无障碍。"
        ],
        [
          "抵达时间威胁铁路安检加机场或分开票据截止",
          "通知目的地并咨询12306、上海铁路与上海当前交通公告；最后交接无法核实时切换到跨城赶站前改签，或保护机场/车站侧过夜。",
          "白天前往正确车站入口及下一机场、酒店或城市的接驳会在延误后继续运行。"
        ],
        [
          "正确车站入口及下一机场、酒店或城市之后还有独立预订",
          "在铁路安检加机场或分开票据截止之前加入准确出口、本地交接与办理时间；余量不足就调整预订。",
          "写在同一行程单上就能让下一运营方保障票面的上海、上海虹桥、上海南或上海松江站。"
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
        "停止移动，重开票面的上海、上海虹桥、上海南或上海松江站，与眼前标识逐字比较。",
        "向12306、上海铁路与上海当前交通公告确认错误属于入口、本地支线还是完全不同节点。",
        "跨区域付费前，查询与票面的上海、上海虹桥、上海南或上海松江站对应的实时改签、退票或重订路径，不承诺结果。",
        "若转场仍合理，导航到正确车站入口及下一机场、酒店或城市，把可验证到达与铁路安检加机场或分开票据截止比较。",
        "向目的地说明上海酒店、浦东/虹桥航班或郊区地址发生的具体情况、现在会到的节点及需要调整的预订。",
        "余量消失时让同行人和行李保持一起，并在工作人员帮助下使用跨城赶站前改签，或保护机场/车站侧过夜。"
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
        "实时车次改用四大站中的另一座。",
        "酒店在中心、西侧、南侧或松江侧之间变化。",
        "SHA或PVG航班成为主导截止。",
        "机场联络线、地铁、出租车或施工接驳变化。",
        "晚到使最后可验证本地接驳消失。"
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
        "按旅客真实日期重查票面的上海、上海虹桥、上海南或上海松江站。",
        "保存上海酒店、浦东/虹桥航班或郊区地址到正确车站入口及下一机场、酒店或城市之间所需准确中文名。",
        "记录正确车站入口及下一机场、酒店或城市的联系方式和可用窗口。",
        "通过12306、上海铁路与上海当前交通公告确认当前合法接驳。",
        "按本团队重新计算虹桥综合枢纽、中心区换乘与松江距离，不使用平均旅客假设。",
        "在铁路安检加机场或分开票据截止之前写明放弃点。",
        "发布周重开官方来源；链条失效时改用跨城赶站前改签，或保护机场/车站侧过夜。"
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
      "text": "上海站和虹桥站是同一个吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "不是。上海站和上海虹桥站位于城市不同区域。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "虹桥火车站在机场里面吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "两者构成相连枢纽，但铁路到达和机场值机是不同流程与地点。确认航站楼并留出转移、安检和航司截止。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "去上海中心城区应选松江站吗？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "只有合适车次和完整接驳胜过替代方案时才选；快到松江的车次不会消除西南到中心的最后一程。"
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "到了错误上海火车站怎么办？"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "读取完整有效票面，向铁路工作人员询问改签，并比较到正确入口的可验证时间与登车时间；余量不足就改签。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续解决下一步真实问题",
      "items": [
        {
          "label": "先看上海城市指南",
          "href": "/destinations/shanghai/",
          "description": "把车站放进完整城市行程。"
        },
        {
          "label": "选择上海住宿区域",
          "href": "/guides/shanghai-where-to-stay-first-trip/",
          "description": "让准确酒店提供最后一扇门。"
        },
        {
          "label": "选择浦东还是虹桥机场",
          "href": "/guides/shanghai-pudong-or-hongqiao-airport/",
          "description": "把机场选择与火车站选择分开。"
        },
        {
          "label": "安排上海与杭州交通",
          "href": "/guides/shanghai-hangzhou-transport-route/",
          "description": "该走廊使用现有双向站对页面。"
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
          "label": "实时车次与车站查询",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "上海官方铁路车站指南",
          "url": "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026年四大铁路枢纽证据",
          "url": "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260214/9d1620c5ff0841b881409229fd1ec219.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026年站区接驳检查",
          "url": "https://www.shanghai.gov.cn/nw31406/20260224/bf18a9f6bfa9420f89b83b44c4a3b043.html",
          "publisher": "Shanghai Transport Commission",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "题图：上海虹桥站站台",
          "url": "https://commons.wikimedia.org/wiki/File%3AShanghai_Hongqiao_Station-20150519-RM-110424.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
