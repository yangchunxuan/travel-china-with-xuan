import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "合法预订成功后，把订单绑定的那一本护照同时当作身份钥匙和恢复钥匙。保存已确认订单和旅客记录，携带有效护照原件，并为自动读取失败后的人工核验预留时间。截图可以帮助工作人员查找订单，但不能替代身份证件，也不能让无效订单变有效。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "简短答案",
      "body": "只走一条证据链：已确认订单 → 准确证件记录 → 护照原件 → 官方检查点。出发前，把订单中的证件号码、行程或参观信息与手中护照逐项核对。现场按指示尝试一次；自动闸机失败就停下，去人工通道查单，不要反复扫描、借别人的证件或尾随过闸。",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "分清每项材料能证明什么"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "不同证据解决交接中的不同问题。",
      "columns": [
        "材料",
        "能证明",
        "不能替代",
        "使用位置"
      ],
      "rows": [
        [
          "预订时使用的护照原件",
          "身份及所绑定的证件号码",
          "缺失、取消或日期错误的订单",
          "证件读取器或人工核验点"
        ],
        [
          "官方已确认订单",
          "产品、日期/时段、旅客及订单状态",
          "身份证件原件",
          "出发前核对和工作人员查单"
        ],
        [
          "截图或离线PDF",
          "断网时可读的订单编号等副本",
          "实时有效性或准入资格",
          "仅作为工作人员查找辅助"
        ],
        [
          "纸质凭证或取票通知",
          "官方出票方给出的特定渠道指示",
          "绕过实名核验的通用许可",
          "只在通知指定的取票或入口使用"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "完成从订单到检票口的交接"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "只在合法订单已由既有官方或授权渠道确认后开始。本指南不选择销售方，也不讲姓名如何填写。",
        "打开最终订单，记录运营方/场馆、日期、时刻、车次或场次、出发/入口、显示的旅客姓名、证件尾号、订单号和状态。",
        "把绑定证件与将随身携带的护照原件比较。如护照已换发、补发、挂失或号码录错，出发前联系出票方，不要期待闸机现场一定能修复。",
        "离线保存官方确认和任何换取凭证指示，并与正确车站入口、航站楼或景点入口路线放在同一行程文件夹。",
        "查看运营方当前到场和身份核验说明。为安检、人工读证和排队留时间；外国护照可能使用与居民身份证不同的通道。",
        "在检查点按指示出示护照原件。仅在工作人员要求时取下护照套，证件始终保持在视线内，不交给非官方帮手。",
        "读取失败一次后，带护照原件和订单编号到人工通道。改动任何信息前，请工作人员确认订单记录、证件类型和正确入口。",
        "成功入场或登乘后，仍保存护照与订单，以备运营方规定的车上、馆内或出口再次查验。"
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "把核验与恢复分开"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "始终对齐三条记录",
      "columns": [
        {
          "heading": "身份记录",
          "body": "护照原件及已确认订单中的准确证件条目。换证或更正应走出票方官方流程。"
        },
        {
          "heading": "权益记录",
          "body": "已确认的服务、日期/时段、旅客和订单状态。护照不能把待确认或日期错误的订单变成有效准入。"
        },
        {
          "heading": "通行指示",
          "body": "车站、机场或场馆的当前通道及人工备选。机器失败只改变通道，不取消身份要求。"
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "护照无法开闸时"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "根据症状找到相应记录负责人。",
      "columns": [
        "症状",
        "先查哪条记录",
        "恢复方法"
      ],
      "rows": [
        [
          "查不到订单",
          "订单号、日期和出票渠道",
          "在运营方人工服务点出示官方确认；若状态不是已确认则联系出票方"
        ],
        [
          "无法识别证件",
          "证件类型、号码及闸机/通道",
          "请工作人员使用支持的人工核验，不用他人证件替代"
        ],
        [
          "姓名或护照号不符",
          "已确认订单的身份记录",
          "按出票方官方更正/重发规则处理；记录不符时可能被拒绝"
        ],
        [
          "车站、入口或时段错误",
          "通行指示和当前位置",
          "问官方人员是否有合法改道或改订，不跨越受控闸口"
        ],
        [
          "护照遗失或损坏",
          "实体身份证件",
          "停止使用本流程，转到护照遗失/补发主题并遵循运营方指示"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "人工通道的清晰恢复流程"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "先离开读取器，避免反复尝试阻塞队伍或让错误状态更混乱。",
        "打开官方确认，只提出一个准确请求：‘请用这本护照核对这个订单。’",
        "让工作人员比较护照原件、证件类型、订单号、服务和日期，并记下失效的是哪个字段或入口。",
        "若运营方可人工确认，按其指定人工通道走，并保存其发出的核验结果或替代凭证。",
        "若必须由出票方更正或重发，只用其官方渠道，并在再次付款前问清原订单如何处理。",
        "若已错过时间，保存拒绝/错误记录和收据，走适用的退款或争议流程，不尝试身份绕行。"
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "护照绑定订单不能保证什么",
      "body": "本流程从合法预订完成后开始。它不验证销售方、不指导姓名录入、不保证准入或登乘，也不免除安检与身份核验，不能承诺工作人员一定能更正不匹配。现行运营规则和已确认订单控制通行。不得借用证件、修改记录或绕过受控闸口。",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "出发前五分钟检查"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "订单状态为已确认",
        "日期、时刻、服务和入口符合计划",
        "预订所用护照原件有效且在身边",
        "证件记录与护照一致",
        "官方确认已离线保存",
        "知道人工核验位置",
        "人工处理时间充足"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "护照作票常见问题"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "护照照片可以代替原件吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "不可以。照片可以辅助查单，但运营方通常要求订单绑定的身份证件原件；以现行官方说明为准。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "自动闸机读不了外国护照怎么办？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "正常尝试后停止，转到人工通道，出示护照原件和已确认订单，让工作人员使用支持的核验方式。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "旧护照预订后能直接用新护照吗？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "不要假设自动转移。出发前联系官方出票方，按其更正或重发规则处理。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "相关身份与通行主题",
      "items": [
        {
          "label": "中国预订中的护照姓名",
          "href": "/zh/guides/passport-name-across-china-bookings/",
          "description": "姓名填写与一致性问题由该主题负责。"
        },
        {
          "label": "官方还是转售渠道购票",
          "href": "/zh/guides/official-or-reseller-china-tickets/",
          "description": "在本流程开始前选择并核实购票渠道。"
        },
        {
          "label": "第一次坐中国高铁",
          "href": "/zh/guides/china-high-speed-train-first-time-guide/",
          "description": "从证件核验继续了解车站和乘车流程。"
        },
        {
          "label": "在中国护照遗失后的离境恢复",
          "href": "/zh/guides/lost-passport-in-china-exit-recovery/",
          "description": "护照原件遗失时立即转用该恢复主题。"
        },
        {
          "label": "外国游客参观故宫",
          "href": "/zh/guides/forbidden-city-for-foreign-visitors/",
          "description": "完整参观规划由景点主题负责。"
        },
        {
          "label": "预订争议证据包",
          "href": "/zh/guides/china-booking-dispute-evidence-pack/",
          "description": "准入被拒时保存交接失败证据。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源",
      "items": [
        {
          "label": "铁路12306身份证件问答",
          "url": "https://www.12306.cn/en/faq.html?item=2",
          "publisher": "中国铁路12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "铁路12306英文问答",
          "url": "https://www.12306.cn/en/faq.html",
          "publisher": "中国铁路12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2025在中国工作生活指南",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "中国国务院",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "故宫博物院购票须知",
          "url": "https://intl.dpm.org.cn/ticket_details.html",
          "publisher": "故宫博物院",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "北京首都机场旅客须知",
          "url": "https://www.bcia.com.cn/lkxz.html",
          "publisher": "北京首都国际机场",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
