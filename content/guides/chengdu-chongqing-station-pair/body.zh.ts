import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "成都—重庆票据不只是两城之间的一段快线，而是一组准确中文站名连接两扇酒店门。先在12306查询真实日期，再比较酒店到站、铁路段、出站以及重庆立体城市的最后接驳。无论正向还是反向，出票后以票面组合为准。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "选对组合，比主行程最快更重要",
      "tone": "decision",
      "body": "成都东和重庆北是常见搜索锚点，但不是永久通用答案。某个真实日期，成都南或西、重庆西、沙坪坝或已运营的重庆东，可能形成更好的门到门链条。由实时库存和两端地址共同决定，不能仅凭城市名猜车站。"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "本页负责什么",
      "tone": "neutral",
      "body": "本页负责双向成都—重庆车站组合和酒店到酒店交接。它不重新定义重庆各站，不重复全国购票流程，不决定两城住宿区域，不固化车次，也不建立反向镜像页。"
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "截图并离线保存12306实时显示的成都—重庆票面组合；不要用地图简称替换。",
        "把第一扇门写成成都酒店入口与准确出发站入口，把最后一扇门写成重庆出站广场与立体城市中的最后酒店门。",
        "标出硬截止：进站、酒店前台与下一项独立预订，并写出最晚安全放弃点。",
        "逐段计算两端车站选择、重庆坡度与行李，不要只抄主行程时长。",
        "保存12306与票面两站工作人员的当前核验入口，以及失效时的跨越任一城市前调整车站组合，或保护抵达夜。"
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
          "成都东 ↔ 重庆北",
          "实时车次使用此组合，且两端酒店接驳都清晰。",
          "重庆北具体广场、入口和最后酒店分店是哪一个？",
          "不要只凭名气订票；另一实时组合可能省掉跨城接驳。"
        ],
        [
          "成都东、南或西 ↔ 重庆西",
          "真实车次与南侧或西侧地址让全程更优。",
          "节省的市内时间是否大于增加的铁路时间和换乘风险？",
          "不要因“西”字就假设靠近所有西侧景点或酒店。"
        ],
        [
          "其他实时组合：沙坪坝或重庆东",
          "12306在真实日期售票，且该站能明显改善最终地址链条。",
          "该站当前是否承运此车次，旅客能否到达准确入口？",
          "不要把新开或被讨论的车站当作承运所有走廊车次。"
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "不要把今天的运营方式写成永久规律",
      "tone": "warning",
      "body": "成渝车次正在纳入不断变化的重要节点，包括重庆东。必须查询真实日期，不固化一组最快组合，不假设所有车都停新站，也不建立反向镜像。"
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
          "成都中心酒店到解放碑",
          "比较退房到站台及重庆出站到前台，包含正确广场、坡度和行李。稍慢车次若省掉一段长市内接驳，可能反而更优。",
          "最快列车抵达酒店相反一侧，晚间定时预订被打乱。"
        ],
        [
          "携行李家庭前往西侧或南侧",
          "计算合法打车、电梯、站内步行和减少一次换乘的价值，不要把短铁路变成楼梯接力。",
          "便宜组合制造两次困难换乘，并让团队在大站走散。"
        ],
        [
          "晚到并有独立晚间预订",
          "核实当前本地交通窗口、酒店前台和放弃点；不要把夜晚押在最后一段无保障接驳上。",
          "列车小幅延误就使计划中的末班地铁或入住窗口消失。"
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
      "title": "12306实时显示的成都—重庆票面组合只是旅程中段",
      "columns": [
        {
          "heading": "从成都酒店入口与准确出发站入口出发",
          "items": [
            "离开成都酒店入口与准确出发站入口前确认退房或抵达状态。",
            "沿合法、有标识的路径处理两端车站选择、重庆坡度与行李。",
            "提前到达票面节点，保护进站、酒店前台与下一项独立预订。"
          ]
        },
        {
          "heading": "逐字读取12306实时显示的成都—重庆票面组合",
          "items": [
            "连同订单实时状态保存12306实时显示的成都—重庆票面组合。",
            "向12306与票面两站工作人员询问实时例外，不凭记忆套规律。",
            "不得用城市级地图定位替换有效票面。"
          ]
        },
        {
          "heading": "完成到重庆出站广场与立体城市中的最后酒店门的交接",
          "items": [
            "使用当前有标识出口、合法上车点或已核实本地接驳。",
            "确认带着行李和剩余余量仍能到达重庆出站广场与立体城市中的最后酒店门。",
            "交接失败时使用跨越任一城市前调整车站组合，或保护抵达夜，不要临时冒险。"
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
          "两端车站选择、重庆坡度与行李",
          "逐项计算成都酒店入口与准确出发站入口到重庆出站广场与立体城市中的最后酒店门之间的排队、电梯、换车和最后步行，优先减少不确定交接。",
          "交通图标能够证明到重庆出站广场与立体城市中的最后酒店门全程无障碍。"
        ],
        [
          "抵达时间威胁进站、酒店前台与下一项独立预订",
          "通知目的地并咨询12306与票面两站工作人员；最后交接无法核实时切换到跨越任一城市前调整车站组合，或保护抵达夜。",
          "白天前往重庆出站广场与立体城市中的最后酒店门的接驳会在延误后继续运行。"
        ],
        [
          "重庆出站广场与立体城市中的最后酒店门之后还有独立预订",
          "在进站、酒店前台与下一项独立预订之前加入准确出口、本地交接与办理时间；余量不足就调整预订。",
          "写在同一行程单上就能让下一运营方保障12306实时显示的成都—重庆票面组合。"
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
        "停止移动，重开12306实时显示的成都—重庆票面组合，与眼前标识逐字比较。",
        "向12306与票面两站工作人员确认错误属于入口、本地支线还是完全不同节点。",
        "跨区域付费前，查询与12306实时显示的成都—重庆票面组合对应的实时改签、退票或重订路径，不承诺结果。",
        "若转场仍合理，导航到重庆出站广场与立体城市中的最后酒店门，把可验证到达与进站、酒店前台与下一项独立预订比较。",
        "向目的地说明成都酒店入口与准确出发站入口发生的具体情况、现在会到的节点及需要调整的预订。",
        "余量消失时让同行人和行李保持一起，并在工作人员帮助下使用跨越任一城市前调整车站组合，或保护抵达夜。"
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
        "12306改变实时车站组合或库存。",
        "成都或重庆酒店分店变化。",
        "车站入口、广场或本地交通运营变化。",
        "行李、行动条件或晚到使换乘变脆弱。",
        "分开票据截止比主行程速度更重要。"
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
        "按旅客真实日期重查12306实时显示的成都—重庆票面组合。",
        "保存成都酒店入口与准确出发站入口到重庆出站广场与立体城市中的最后酒店门之间所需准确中文名。",
        "记录重庆出站广场与立体城市中的最后酒店门的联系方式和可用窗口。",
        "通过12306与票面两站工作人员确认当前合法接驳。",
        "按本团队重新计算两端车站选择、重庆坡度与行李，不使用平均旅客假设。",
        "在进站、酒店前台与下一项独立预订之前写明放弃点。",
        "发布周重开官方来源；链条失效时改用跨越任一城市前调整车站组合，或保护抵达夜。"
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
      "text": "成都东到重庆北永远最好吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "不是。这是常见组合，但实时车次和两端准确地址可能让另一组合更优。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "应该只选铁路时间最短的吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "比较退房到前台总时长、换乘、行李和可补救性；铁路最短可能全程最长。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "重庆到成都也用本页吗？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "是。本页双向合并：反转两端地址链条，再核实真实票面组合。"
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "到了错误的重庆站怎么办？"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "读取有效票据，向工作人员确认具体错误，长距离转场前查询改退，并通知酒店或下一预订。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续解决下一步真实问题",
      "items": [
        {
          "label": "规划成都一侧",
          "href": "/destinations/chengdu/",
          "description": "把车站放进完整成都停留。"
        },
        {
          "label": "规划重庆一侧",
          "href": "/destinations/chongqing/",
          "description": "把抵达站匹配到真实区域和立体城市路线。"
        },
        {
          "label": "理解重庆各火车站",
          "href": "/guides/chongqing-railway-station-selector/",
          "description": "车站身份不清时交给节点owner。"
        },
        {
          "label": "理解重庆上下城",
          "href": "/guides/chongqing-upper-lower-city-orientation/",
          "description": "最后一公里可能包含真实垂直移动。"
        },
        {
          "label": "准备第一次乘中国高铁",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "全国购票与乘车流程留给原owner。"
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
          "label": "2026年成都车站运营公告",
          "url": "https://www.12306.cn/mormhweb/zxdt_news/202606/t20260615_45967.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "成渝铁路走廊背景",
          "url": "https://www.sc.gov.cn/10462/10464/10465/10595/2025/1/15/ca1e3502e04f4e3d9f072d46e471a05b.shtml",
          "publisher": "Sichuan Provincial Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "重庆东站当前背景",
          "url": "https://www.cq.gov.cn/ywdt/jrcq/202606/t20260626_15778151.html",
          "publisher": "Chongqing Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "重庆铁路与本地交接背景",
          "url": "https://jtysw.cq.gov.cn/sy_240/bmdt/202602/t20260224_15449936.html",
          "publisher": "Chongqing Transport Bureau",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "题图：成都东站",
          "url": "https://commons.wikimedia.org/wiki/File%3AChengdu_East_Railway_Station.JPG",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
