import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "“龙脊”不是同一扇酒店门。平安、金坑大寨和古壮寨是不同游览区，分属不同道路支线和最后步行。先选真实村寨与住宿，再比较从桂林机场、明确火车站或市区酒店出发的接驳。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "村寨名才是第一项交通决定",
      "tone": "decision",
      "body": "平安预订就接到平安，金坑大寨预订就接到相应山谷及索道侧环境，古壮寨只服务该处预订。司机、巴士或地图若只写“龙脊梯田”，信息并不完整。出行日核实景区通行规则、行李交接和准确住宿联系方式。"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "本页负责桂林到龙脊具体村寨的接驳",
      "tone": "neutral",
      "body": "本页负责双向桂林出发点到龙脊准确村寨的交通交接。它不决定一日游还是过夜，不深入比较村寨体验，不选择桂林抵达机场或车站，不卖团，也不固化巴士时刻和上车点。"
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "截图并离线保存准确桂林机场/车站/酒店出发点与龙脊村寨名；不要用地图简称替换。",
        "把第一扇门写成KWL、完整桂林站名或准确市区酒店，把最后一扇门写成平安、金坑大寨或古壮寨住宿交接点。",
        "标出硬截止：景区通行、酒店前台与任何同日返程，并写出最晚安全放弃点。",
        "逐段计算乡村道路、天气、行李搬运与村寨最后步行，不要只抄主行程时长。",
        "保存龙脊景区管理、准确住宿与当前交通运营方的当前核验入口，以及失效时的返回已确认有人值守的交接点或调整村寨预订。"
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "先选平安或大寨，再选择车辆"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "具名龙脊村寨与民宿交接控制整段转运",
      "columns": [
        "龙脊接驳链",
        "这条村寨路线何时合适",
        "住宿交接问题",
        "必须防住的村寨混淆"
      ],
      "rows": [
        [
          "平安壮族梯田观景区",
          "准确酒店或日程在平安，且当前通行支线已确认。",
          "车辆停在哪里、谁接行李、最后步行多远？",
          "不要因为都属于龙脊，就把平安预订送到大寨。"
        ],
        [
          "金坑大寨红瑶梯田观景区",
          "预订写明大寨、金坑或该山谷住宿。",
          "约定交接是停车或巴士区、索道侧位置，还是住宿指定会合点？",
          "不要把索道当成保证的酒店或行李接驳。"
        ],
        [
          "龙脊古壮寨",
          "已订体验或住宿明确写明古壮寨。",
          "当前使用哪个景区检查点和最后步行交接？",
          "不要把通用龙脊定位当成正确道路支线证明。"
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "龙脊季节道路与村寨交接必须逐次确认",
      "tone": "warning",
      "body": "平安、金坑大寨和古壮寨使用不同支线与最后步行。景区通行、拼车和道路会变化，必须复核准确住宿，不能把笼统“龙脊接送”写成服务所有山谷。"
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "机场、铁路站与桂林酒店出发会产生不同村寨转运"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "从桂林上车点量到具名梯田村寨住宿",
      "columns": [
        "桂林上车模式",
        "核实村寨交接的方法",
        "必须防住的山地转运失败"
      ],
      "rows": [
        [
          "桂林酒店到龙脊过夜住宿",
          "把中文村寨名、住宿名、联系方式和约定会合点发给司机或运营方；计算退房、道路、景区通行和最后搬运行李步行。",
          "车辆到达某个龙脊检查点，但酒店实际在另一山谷。"
        ],
        [
          "桂林机场或火车站到龙脊",
          "先使用抵达节点owner，再让乡村接驳从准确航站楼或车站出口开始；加入航班或列车延误，不承诺拼车等待。",
          "订单只写笼统“桂林站”，接车却在另一节点等待。"
        ],
        [
          "龙脊返回并衔接同日出发",
          "反向执行准确村寨链条，加入天气、道路延误和完整车站或机场办理余量；按硬预订而非地图估算留出时间。",
          "降雨或村道延误使无保障火车或航班衔接消失。"
        ]
      ]
    },
    {
      "id": "chain-heading",
      "type": "heading",
      "level": 2,
      "text": "连起桂林上车点、山路车辆与村寨住宿交接"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "准确桂林机场/车站/酒店出发点与龙脊村寨名只是旅程中段",
      "columns": [
        {
          "heading": "从KWL、完整桂林站名或准确市区酒店出发",
          "items": [
            "离开KWL、完整桂林站名或准确市区酒店前确认退房或抵达状态。",
            "沿合法、有标识的路径处理乡村道路、天气、行李搬运与村寨最后步行。",
            "提前到达票面节点，保护景区通行、酒店前台与任何同日返程。"
          ]
        },
        {
          "heading": "逐字读取准确桂林机场/车站/酒店出发点与龙脊村寨名",
          "items": [
            "连同订单实时状态保存准确桂林机场/车站/酒店出发点与龙脊村寨名。",
            "向龙脊景区管理、准确住宿与当前交通运营方询问实时例外，不凭记忆套规律。",
            "把桂林上车点与平安、金坑大寨或古壮寨写清楚；一个“龙脊”定位无法说明交接点。"
          ]
        },
        {
          "heading": "完成到平安、金坑大寨或古壮寨住宿交接点的交接",
          "items": [
            "在运营方确认的桂林出口或酒店点集合，再走住宿方认可的具名村寨交接。",
            "确认带着行李和剩余余量仍能到达平安、金坑大寨或古壮寨住宿交接点。",
            "交接失败时使用返回已确认有人值守的交接点或调整村寨预订，不要临时冒险。"
          ]
        }
      ]
    },
    {
      "id": "late-heading",
      "type": "heading",
      "level": 2,
      "text": "山路台阶、行李与天色共同决定龙脊交接是否可行"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "先保护村寨住宿交接，再追求最短车程",
      "columns": [
        "龙脊限制",
        "更稳妥的村寨安排",
        "应拒绝的山路捷径"
      ],
      "rows": [
        [
          "乡村道路、天气、行李搬运与村寨最后步行",
          "逐项计算KWL、完整桂林站名或准确市区酒店到平安、金坑大寨或古壮寨住宿交接点之间的排队、电梯、换车和最后步行，优先减少不确定交接。",
          "交通图标能够证明到平安、金坑大寨或古壮寨住宿交接点全程无障碍。"
        ],
        [
          "抵达时间威胁景区通行、酒店前台与任何同日返程",
          "通知目的地并咨询龙脊景区管理、准确住宿与当前交通运营方；最后交接无法核实时切换到返回已确认有人值守的交接点或调整村寨预订。",
          "白天前往平安、金坑大寨或古壮寨住宿交接点的接驳会在延误后继续运行。"
        ],
        [
          "平安、金坑大寨或古壮寨住宿交接点之后还有独立预订",
          "在景区通行、酒店前台与任何同日返程之前加入准确出口、本地交接与办理时间；余量不足就调整预订。",
          "写在同一行程单上就能让下一运营方保障准确桂林机场/车站/酒店出发点与龙脊村寨名。"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "到错龙脊交接点时，不要进入未核实山路"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "停止移动，重开准确桂林机场/车站/酒店出发点与龙脊村寨名，与眼前标识逐字比较。",
        "向龙脊景区管理、准确住宿与当前交通运营方确认错误属于入口、本地支线还是完全不同节点。",
        "跨区域付费前，查询与准确桂林机场/车站/酒店出发点与龙脊村寨名对应的实时改签、退票或重订路径，不承诺结果。",
        "若转场仍合理，导航到平安、金坑大寨或古壮寨住宿交接点，把可验证到达与景区通行、酒店前台与任何同日返程比较。",
        "向目的地说明KWL、完整桂林站名或准确市区酒店发生的具体情况、现在会到的节点及需要调整的预订。",
        "余量消失时让同行人和行李保持一起，并在工作人员帮助下使用返回已确认有人值守的交接点或调整村寨预订。"
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "这些变化需要更换龙脊接驳"
    },
    {
      "id": "answer-changes",
      "type": "list",
      "ordered": false,
      "items": [
        "所选村寨或住宿变化。",
        "景区通行、检查点或本地道路运营变化。",
        "天气改变乡村道路或步行交接。",
        "桂林出发点在机场、车站和酒店间改变。",
        "同日出发形成硬截止。"
      ]
    },
    {
      "id": "checklist-heading",
      "type": "heading",
      "level": 2,
      "text": "龙脊村寨与住宿交接核验"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "按旅客真实日期重查准确桂林机场/车站/酒店出发点与龙脊村寨名。",
        "保存KWL、完整桂林站名或准确市区酒店到平安、金坑大寨或古壮寨住宿交接点之间所需准确中文名。",
        "记录平安、金坑大寨或古壮寨住宿交接点的联系方式和可用窗口。",
        "通过龙脊景区管理、准确住宿与当前交通运营方确认当前合法接驳。",
        "按本团队重新计算乡村道路、天气、行李搬运与村寨最后步行，不使用平均旅客假设。",
        "在景区通行、酒店前台与任何同日返程之前写明放弃点。",
        "发布周重开官方来源；链条失效时改用返回已确认有人值守的交接点或调整村寨预订。"
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
      "text": "平安和大寨是同一个地方吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "不是。它们是龙脊不同游览区，道路支线和最后交接不同；以住宿预订名称为准。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "车辆能到所有龙脊酒店门口吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "不要假设可以。向准确住宿确认当前停车点、行李交接和最后步行。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "本页决定一日游还是过夜吗？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "不决定。先用现有停留时长owner，再回本页执行准确接驳。"
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "可以从桂林机场直接去吗？"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "合法包车或当前拼车可能可行，但必须写明KWL、准确村寨和可补救延误方案；不假设接驳等待航班。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "固定龙脊转运后继续规划",
      "items": [
        {
          "label": "先选择一日游或过夜",
          "href": "/guides/longji-rice-terraces-day-trip-or-overnight/",
          "description": "停留时长和村寨体验留给原owner。"
        },
        {
          "label": "选择桂林抵达节点",
          "href": "/guides/guilin-airport-or-railway-station-arrival-guide/",
          "description": "乡村接驳前明确KWL或准确火车站。"
        },
        {
          "label": "规划桂林—阳朔交通",
          "href": "/guides/guilin-yangshuo-transport-route/",
          "description": "独立阳朔走廊留给原owner。"
        },
        {
          "label": "比较包车与公共交通",
          "href": "/guides/china-private-transfer-or-public-transport/",
          "description": "准确村寨明确后再选方式。"
        },
        {
          "label": "理解乡村住宿为何不同",
          "href": "/guides/china-hotel-near-metro/",
          "description": "地铁距离规则无法描述梯田村寨交接。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源与图片署名",
      "items": [
        {
          "label": "龙脊梯田景区官方概览",
          "url": "https://wp.longjitour.com/index.php/about/",
          "publisher": "Longji Rice Terraces Scenic Area",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "龙脊景区开放管理公告",
          "url": "https://wp.longjitour.com/index.php/2025/07/04/%E9%BE%99%E8%84%8A%E6%A2%AF%E7%94%B0%E6%99%AF%E5%8C%BA%E5%BC%80%E6%94%BE%E7%AE%A1%E7%90%86%E6%83%85%E5%86%B5/",
          "publisher": "Longji Rice Terraces Scenic Area",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026年广西官方旅游规划",
          "url": "https://wlt.gxzf.gov.cn/zfxxgk/fdzdgknr/ghjh/zcqgh/P020260402608874093379.pdf",
          "publisher": "Guangxi Department of Culture and Tourism",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "桂林两江机场官方地面交通",
          "url": "https://gl.airport.gx.cn/html/jiaotongxinxi/jiaotonggongju/",
          "publisher": "Guilin Liangjiang International Airport",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "桂林铁路节点官方查询",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "题图：龙脊梯田索道环境",
          "url": "https://commons.wikimedia.org/wiki/File%3ACable_car_in_Longji_01.JPG",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
