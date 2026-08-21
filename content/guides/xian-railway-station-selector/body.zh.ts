import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "如果已经出票，票面目的站就是硬约束：西安、西安北和西安东是三座不同车站。尚未订票时，应先在12306查询真实日期，再比较到准确酒店或下一项预订的完整旅程。西安东站已于2026年6月30日启用，因此只列西安站和西安北站的旧地图或旧文章已经不能安全指导行程。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "出票后听票面，出票前看全程",
      "tone": "decision",
      "body": "住在城墙一带时，可以先测试是否有合适车次到西安站；西安北站是大型高铁枢纽，但北侧市内接驳必须计入；西安东站只在真实车次停靠、东侧行程更顺时有优势，启用并不等于所有线路都迁过去。不要因为英文缩写或旧题目去寻找并不存在于票面的“西安西站”。"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "本页负责什么",
      "tone": "neutral",
      "body": "本页负责真实日期下主要西安客运站的选择，并处理票面站名、酒店侧摩擦和走错站补救。它不重讲全国12306购票流程，不决定住城墙还是大雁塔，不复制兵马俑交通，也不发布永久性的“某方向固定去某站”表格。"
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "截图并离线保存票面的西安 / 西安北 / 西安东站名与日期；不要用地图简称替换。",
        "把第一扇门写成西安酒店入口或抵达接驳，把最后一扇门写成准确车站入口及下一酒店或兵马俑接送。",
        "标出硬截止：进站与下一定时出发，并写出最晚安全放弃点。",
        "逐段计算城市北侧或东侧距离、行李及可能的跨站，不要只抄主行程时长。",
        "保存12306与西安车站工作人员的当前核验入口，以及失效时的在准确车站改签或保护有人值守的西安过夜点。"
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
          "西安站",
          "有合适的实时车次停靠，且第一晚或最后一晚地址位于城墙或中心城区北侧。",
          "计入进站、路况、行李和准确酒店入口后，中心位置是否仍然省力？",
          "不要假设所有普速列车或所有搜索结果中的“西安”车次都使用这座站。"
        ],
        [
          "西安北站",
          "最佳实时高铁产品使用北站，或下一段铁路换乘使北侧大型枢纽更合理。",
          "车次优势能否抵消去城墙、大雁塔、酒店大堂或下一景点入口的接驳？",
          "“北”是票面站名的一部分，不是西安站的北入口。"
        ],
        [
          "西安东站",
          "实时车次确实使用东站，且东侧住宿、兵马俑方向或下一段链条因此受益。",
          "出行时段的市内接驳、入口和施工状态是否已经核实？",
          "2026年6月30日启用，不等于东站成为所有线路和酒店的默认站。"
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "不要把今天的运营方式写成永久规律",
      "tone": "warning",
      "body": "西安东站于2026年启用，因此旧“两站模型”已不安全。发布周必须重开12306和西安当前交通公告，不能把启用初期的车次、入口或地铁衔接写成永久分工。"
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
          "傍晚抵达城墙酒店",
          "只比较真实日期可售车次，并加入出站、合法上车点或地铁、路况、最后步行和前台时间。稍慢但到西安站的车次可能胜过更快的北站或东站车次，但必须以完整链条为准。",
          "列车虽到正确城市，但晚到后酒店入口或前台已经无法使用。"
        ],
        [
          "住大雁塔并有兵马俑限时预约",
          "住宿区域和兵马俑仍由各自页面负责。本页只选择能留下补救余地的铁路节点；之后由兵马俑页面负责预约入口、护照和时段。",
          "旅客把东站想当然当成离兵马俑最近的站，忽略真实车次和景区入口链。"
        ],
        [
          "走错站且下一程有硬截止",
          "读取有效订单上的中文站名，向铁路工作人员确认能否改签，并把到达正确入口的可验证时间与进站余量比较。余量不明显安全时，放弃跨城赶路。",
          "把打车估算当成登车保证，最终既错过列车也错过改签补救。"
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
      "title": "车站门口只是旅程中点",
      "columns": [
        {
          "heading": "上车前",
          "items": [
            "酒店退房和真实上车点",
            "带全部行李的道路或地铁接驳",
            "正确入口、安检和登车余量"
          ]
        },
        {
          "heading": "票面节点",
          "items": [
            "完整中文出发站和到达站",
            "车次、日期和当前订单状态",
            "不得因英文城市名相似而替换车站"
          ]
        },
        {
          "heading": "到站后",
          "items": [
            "出站和合法接驳或地铁",
            "准确酒店、景点或下一车站入口",
            "晚到与行李备选"
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
          "多件大行李或有长者",
          "即使铁路段不是最短，也优先减少搬抬并核实无障碍交接；确认合法车辆能到哪个入口。",
          "地图上的地铁图标可以证明有电梯、步行短或能容纳所有箱子。"
        ],
        [
          "晚于计划本地接驳抵达",
          "告诉酒店你实际所在车站，使用当前官方交通或合法车辆；最后交接无法核实时，选择有人值守的市区过夜点。",
          "白天线路、开放入口或酒店前台在午夜仍然运行。"
        ],
        [
          "在不同西安车站间短时换乘",
          "把它当成跨城换乘：出站、道路或地铁、正确入口、安检和登车时间全部计入；可验证余量不足就改签。",
          "都叫西安就可以互换。"
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
        "停下并打开有效12306订单，确认完整中文出发站、日期、时间、车次和票态。",
        "向铁路工作人员确认你只是走错入口，还是到了另一座车站；弄清前不要离开。",
        "决定跨城打车前先查询当前改签或退票选项；资格以实时订单和铁路规则为准。",
        "确需转站时，导航到正确车站入口而不是站区，并加入正常进站和行李时间。",
        "告诉酒店、景点或接送方你实际会到哪座站，并在截止前调整限时预订。",
        "原车次和安全转站都已不可行时，先保护护照、同行人和当晚住宿，再在工作人员帮助下重建路线。"
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
        "实时车次使用的车站与记忆中的线路规律不同。",
        "第一晚住宿从城墙换到大雁塔或东侧区域。",
        "兵马俑限时入园或下一趟硬约束列车成为主导截止。",
        "行李、婴儿车或无障碍不确定性使多一次换乘无法接受。",
        "发布日地铁、车站入口或施工公告改变接驳。"
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
        "在12306查询准确日期并离线保存有效订单。",
        "逐字核对西安、西安北或西安东。",
        "在地图中分别固定正确车站和正确入口。",
        "保存酒店分店、中文地址、电话和前台时间。",
        "发布周复核西安东站接驳和施工。",
        "出发前设定走错站后停止跨城赶车的截止。",
        "全国乘车流程仍查阅独立高铁新手指南。"
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
      "text": "西安北站和西安站是同一座吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "不是。西安北和西安是不同车站，后缀是票面站名的一部分；给司机或酒店时必须提供完整中文名。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "所有高铁都去西安北站吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "不要依赖这个规则。西安东站已经启用，停靠规律也会变化；应在12306按真实起终点和日期查询，以出票结果为准。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "去兵马俑一定选西安东站吗？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "不一定。只有合适车次停靠且到预约入口的完整链条可执行时，东站才进入候选；景区侧执行仍由兵马俑指南负责。"
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "已经到错西安火车站怎么办？"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "先确认有效票并向铁路工作人员询问改签或退票，再决定是否跨城；只有可验证到达正确入口后仍有明显安全余量时才转站。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续解决下一步真实问题",
      "items": [
        {
          "label": "先看西安城市指南",
          "href": "/destinations/xian/",
          "description": "把车站选择放进完整的第一次西安行程。"
        },
        {
          "label": "选择住城墙还是大雁塔",
          "href": "/guides/xian-where-to-stay-city-wall-or-dayanta/",
          "description": "让真实住宿区域决定到达侧最后一程。"
        },
        {
          "label": "不跟团去兵马俑",
          "href": "/guides/terracotta-warriors-without-tour/",
          "description": "从城市铁路节点继续处理预约景区入口。"
        },
        {
          "label": "第一次坐中国高铁",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "选定准确车站后处理护照、进站、安检和登车。"
        },
        {
          "label": "安排北京、西安、成都顺序",
          "href": "/guides/beijing-xian-chengdu-route-order/",
          "description": "把跨城顺序与西安实时车站选择分开。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源与图片署名",
      "items": [
        {
          "label": "中国铁路实时车次与车站查询",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "西安东站官方启用记录",
          "url": "https://en.xa.gov.cn/MediaCenter/News/2072253459180654594.html",
          "publisher": "Xi'an Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "西安市铁路车站信息",
          "url": "https://jtj.xa.gov.cn/zmhd/xxcx/hczxx/6502b33ff8fd1c1a7038fae1.html",
          "publisher": "Xi'an Transport Bureau",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "西安市当前交通公告入口",
          "url": "https://jtj.xa.gov.cn/",
          "publisher": "Xi'an Transport Bureau",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "题图：西安北站北站房",
          "url": "https://commons.wikimedia.org/wiki/File%3A%E8%A5%BF%E5%AE%89%E5%8C%97%E7%AB%99%E5%8C%97%E7%AB%99%E6%88%BF_02.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
