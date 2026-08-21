import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "不要只凭转机时长或国籍判断中国机场转机。先向实际承运航司和转机柜台确认：旅客在这个机场、这个航站楼是否全程留在空侧，托运行李是否直挂。若任何一步需要进入中国内地，再用国家移民管理局的现行规则并向口岸边检核实入境或过境免签资格。确认之后，才在空侧休息、陆侧酒店或受保护备选之间做选择。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "简短答案",
      "body": "把旅客路线、行李路线和隔夜路线当作三个独立确认项。有联程登机牌不必然代表行李直挂；隔夜停留也不自动带来入境资格。随身保存后续机票、行李条和官方资格材料。某一步无法确认时，选择不依赖该条件的方案。",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "先判断要走哪条确认路径"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "以本次行程真实要求为准，不套用相似行程的结果。",
      "columns": [
        "眼前情况",
        "向谁确认",
        "不能假设",
        "稳妥动作"
      ],
      "rows": [
        [
          "同一机场、有后续登机牌，行李牌写最终目的地",
          "实际承运航司与机场转机柜台",
          "所有跨航站楼路线都在空侧",
          "沿转机标识走，并在离开隔离区前确认下一登机口和航站楼"
        ],
        [
          "行李牌止于中国机场、分开出票，或航司要求提取",
          "前后两家承运航司与行李柜台",
          "无需入境就一定能重新托运",
          "确认提取是否要过边检，并为提取、海关和再托运留时间"
        ],
        [
          "换机场、陆侧换楼或入住安检区外酒店",
          "移民管理/边检、机场及航司",
          "过境政策会自动覆盖这段移动",
          "用准确口岸、路线、国籍、证件和后续目的地做官方核实"
        ],
        [
          "已确认全程空侧但需要过夜",
          "机场服务台与当日航站楼通知",
          "休息室、酒店、餐饮或安检通道整夜开放",
          "只预订明确可在空侧到达的服务，并保留登机口区域备选"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "出发前建立转机方案"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "写清完整顺序：抵达航班和航站楼、后续航班和航站楼、票号以及实际承运航司。询问交接问题时，只报代码共享的销售航司名称不够。",
        "向首段承运航司问两个明确问题：打印出的行李牌到哪里，以及旅客必须在哪个机场亲自提取和再次托运。值机后拍下行李条。",
        "确认旅客是否全程在国际转机控制区内。逐一核实跨楼巴士、轨道交通、二次安检或换机场，并问清每段属于空侧还是陆侧。",
        "如可能需要入境，查国家移民管理局最新规则，并就准确行程联系口岸边检或航司。提供国籍、护照有效期、已确认后续目的地、日期和全部机场，不要只问一句‘我能否在中国转机’。",
        "查看机场针对实际日期的最新转机页面。记录转机柜台、航司给出的衔接限制、末班内部交通，以及隔夜设施的位置与营业时间。",
        "保存离线资料包：电子客票、后续行程确认、行李条、航站楼图、航司联系方式、官方政策链接，以及仅在合法获准入境后使用的可退陆侧酒店地址。",
        "抵达后先沿转机标识走，不要径直前往边检或行李提取。若现场标识与计划冲突，向转机人员出示行程，再确认旅客和行李两条路线。"
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "三种确认不要混在一起"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "旅客、行李与隔夜路径",
      "columns": [
        {
          "heading": "旅客路线",
          "body": "确认航站楼、安检环节及是否过边检。最终入境决定属于边检机关，而不是本页。"
        },
        {
          "heading": "行李路线",
          "body": "以打印行李牌的目的地和承运航司确认结果为准。如须提取，再判断是否具备合法入境条件与再托运时间。"
        },
        {
          "heading": "隔夜路线",
          "body": "设施必须在最后一道转机/安检环节之后真实可达，营业时间已核实，并且另有不入境的备选。"
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "机场现场可能出现的故障"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "解决失效的前提，不走未经确认的捷径。",
      "columns": [
        "故障信号",
        "立即动作",
        "备选"
      ],
      "rows": [
        [
          "没有后续登机牌",
          "到航司转机柜台出示已确认客票",
          "询问能否在空侧办理；不要为了找值机柜台自行过边检"
        ],
        [
          "行李牌只到本站",
          "请行李或转机人员说明提取路线",
          "若须入境但入境未确认，要求实际承运航司给出受保护处理方案"
        ],
        [
          "跨楼路线关闭或必须走陆侧",
          "停在有工作人员的受控节点，出示两段航班",
          "按机场/航司重定向，不跟随他人穿越受控门"
        ],
        [
          "隔夜设施不可用",
          "询问当前可到达的空侧休息区",
          "在允许区域准备饮水、药物和闹钟；仅在合法获准入境后用陆侧酒店"
        ],
        [
          "边检不准入境",
          "遵照边检指示并立即联系航司",
          "要求空侧或航司保障方案；酒店订单不是入境许可"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "原转机方案失效后的恢复顺序"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "留在最后一个有工作人员且允许停留的决策点，记下航站楼、时间和柜台。",
        "联系控制受影响航段的实际承运航司，要求把可用的受保护改签写入订单或提供书面确认。",
        "出示行李条，询问行李被留在哪里或如何改挂。入境和权限未确认前，不要进入提取路线。",
        "涉及入境时，让边检根据真实证件作决定；不要拿博客截图或他人的结果争辩。",
        "知道新的合法路线后再改订住宿或地面交通；资格未决时只选可取消安排。",
        "保留新登机牌、延误通知、收据和工作人员指示，方便后续向航司或保险方说明。"
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "本指南不能承诺什么",
      "body": "本页不判断过境免签资格，也不保证准予入境、空侧通行、行李直挂、联程保障或隔夜设施可用。这些取决于现行法律、准确行程、口岸、实际承运航司和实时运行。边检机关作出入境决定；航司和机场控制运输与转机流程。",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "登上入境航班前再核对"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "已写明实际承运航司和航站楼",
        "已确认旅客路线为空侧或须入境",
        "已检查打印行李牌目的地",
        "如有陆侧步骤已查官方入境/过境免签依据",
        "已查当日转机与隔夜设施",
        "离线保存证件和联系方式",
        "备选不依赖尚未确认的入境"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "中国机场转机常见问题"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "停留时间很长，就能离开机场吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "不能这样推断。时长本身不构成入境资格。按准确行程查国家移民管理局现行规则，并由口岸边检决定。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "同一订单的托运行李一定直达最终城市吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "不要只看订单号。查看打印行李牌，并向实际承运航司确认，尤其是换航站楼、机场或航司时。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "隔夜转机要不要先订机场酒店？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "先确认酒店在空侧还是陆侧、相应时段能否到达以及取消条款，再预订；同时保留能到达的空侧备选。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "相关规划主题",
      "items": [
        {
          "label": "分开出票自助转机风险",
          "href": "/zh/guides/china-separate-flight-tickets-self-transfer-risk/",
          "description": "先确认联程保障在哪里中断。"
        },
        {
          "label": "国际航班前最后一晚",
          "href": "/zh/guides/china-last-night-before-international-flight/",
          "description": "规划最后一次进场与时间。"
        },
        {
          "label": "中国网上入境卡",
          "href": "/zh/guides/china-online-arrival-card/",
          "description": "如须入境，查看现行官方入境卡流程。"
        },
        {
          "label": "海关红绿通道",
          "href": "/zh/guides/china-customs-red-green-channels/",
          "description": "了解合法入境并提取行李后的海关环节。"
        },
        {
          "label": "国内航班票价与行李组合",
          "href": "/zh/guides/china-domestic-flight-fare-bundle-baggage/",
          "description": "确认后续航班已购买的行李额。"
        },
        {
          "label": "浦东还是虹桥机场",
          "href": "/zh/guides/shanghai-pudong-or-hongqiao-airport/",
          "description": "不要把上海两个机场当成同一转机点。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源",
      "items": [
        {
          "label": "240小时过境免签政策",
          "url": "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
          "publisher": "国家移民管理局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "国家移民管理局过境政策更新",
          "url": "https://en.nia.gov.cn/n147418/n147468/c187308/content.html",
          "publisher": "国家移民管理局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "北京首都机场转机指南",
          "url": "https://www.bcia.com.cn/lkznzj.html",
          "publisher": "北京首都国际机场",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "北京首都机场实时通知",
          "url": "https://www.bcia.com.cn/index.html",
          "publisher": "北京首都国际机场",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
