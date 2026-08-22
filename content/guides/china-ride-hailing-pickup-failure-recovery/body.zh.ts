import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "网约车已经指派但接驾失败时，不要追着移动的地图图标走。先站在安全、允许停靠且容易辨认的位置，对照应用定位点与现场上车区名称，再通过订单渠道发送一条准确地标信息。只有车牌和主要车辆/司机信息与指派记录一致才上车；短时间内无法对齐就保存错位证据，用平台取消/客服流程，并改乘有人值守或官方交通备选。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "简短答案",
      "body": "做三方匹配：指派车辆、应用上车点、眼前实体地标。司机说‘上车’不等于匹配。不要进入不同车牌车辆、跨越交通护栏、走到机动车道，也不要为解决接驾而提供支付或护照凭证。本页从订单已存在后开始，不做应用排名，也不讲如何叫车。",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "诊断会合点为什么失败"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "一次只改变一个变量，避免司机和乘客继续绕圈。",
      "columns": [
        "信号",
        "可能错位",
        "一条有效消息",
        "决定"
      ],
      "rows": [
        [
          "司机图标很近但看不到车",
          "不同道路层级、门口或隔离道路另一侧",
          "发送入口/楼层、地标名和不含人脸的现场照片",
          "原地等待司机确认同一地标"
        ],
        [
          "定位点在建筑内或禁停路段",
          "GPS漂移或不允许上车",
          "选择平台/场馆指定上车区，或问工作人员网约车在哪里上客",
          "只沿安全步行路线移动，再通知司机"
        ],
        [
          "车辆到达但车牌/信息不符",
          "错误车辆或未经核实替换",
          "明确指出与指派信息不一致",
          "不上车，联系应用内安全/客服"
        ],
        [
          "联系不上且等待/取消提示增加",
          "司机无法进入或订单卡住",
          "在订单聊天发送最后一条精确位置",
          "截图留证，通过平台取消/客服后切换"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "用短控制循环恢复接驾"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "停止移动。站到照明良好、有工作人员或指定候车区，远离车道、出口和安保隔离；同行者、儿童和行李保持在一起。",
        "查看订单，不理会主动招呼的陌生车：核对指派车牌、显示的车型/颜色、司机标识及订单内联系方式。截图保存并带上当前定位点。",
        "用场馆语言说清实体位置：航站楼和楼层、车站出口号、酒店入口、商场门或网约车上客区。仅发蓝点截图无法告诉司机道路层级。",
        "比较应用定位与实体位置。定位错误时，只选平台或场馆提供的合法上车点；不要把定位拖过护栏放到禁停区。",
        "发送一条简短信息，包括可见地标、道路侧/楼层，以及你愿意提供的衣服或行李颜色。用应用内翻译或保存的中文句子，并留在订单渠道沟通。",
        "车辆到达先读车牌再靠近，核对其余指派信息。请司机在应用内确认目的地，不透露无关个人资料。",
        "车不匹配、车门状态让人不安、司机要求脱离平台或上车要跨越危险区域时，不要上车；回到安全有人处并用客服。",
        "根据行程设一个时间边界。到时保存联系尝试、定位与车辆证据，选择真实取消原因，并启动地铁、正规出租车站、酒店前台或另一笔已核实订单。"
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "上车三角核验"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "车辆、地点与订单",
      "columns": [
        {
          "heading": "车辆",
          "body": "实体车牌和显示的车辆信息与指派记录一致。记录不符时，不接受口头替换。"
        },
        {
          "heading": "地点",
          "body": "双方说的是同一合法上车区、入口、楼层和道路侧；实体标识用于消除地图歧义。"
        },
        {
          "heading": "订单",
          "body": "应用内订单、目的地和支持的沟通仍有效。要求先取消并私下交易会破坏证据链。"
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "接驾故障与安全退出"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "目标是核实后上车，而不是随便进入一辆车。",
      "columns": [
        "故障",
        "立即做",
        "退出路径"
      ],
      "rows": [
        [
          "到达车辆车牌不同",
          "保持距离，说明与指派车牌不符",
          "通过平台安全/客服报告，在有人处等待"
        ],
        [
          "司机要求线下现金或上车前取消",
          "订单不变并询问客服",
          "拒绝私下乘车，转正规出租车站或新核实订单"
        ],
        [
          "定位点在另一楼层",
          "发送准确楼层/门口并沿官方步行标识",
          "问机场/车站/商场人员指定网约车区"
        ],
        [
          "司机让乘客走上车道",
          "不进入机动车道、不跨护栏",
          "选择合法上客区或按位置证据取消"
        ],
        [
          "手机或网络失效",
          "留在最后的安全点，使用场馆网络/电话或人工帮助",
          "改用正规出租车队列，或入口已实体确认的公共交通"
        ],
        [
          "乘客感到威胁",
          "走向人群、工作人员或安保，不与车辆发生冲突",
          "根据现场情况使用本地紧急求助和平台安全渠道"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "关闭一笔失败订单后再下新单"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "订单仍可见时，保存地图定位、上车点名称、指派车牌、司机消息/通话和时间。",
        "选择能真实描述通行、司机或接驾故障的取消原因，不虚构理由来规避费用。",
        "如产生费用，用平台订单记录和证据申请复核。费用问题与人身安全和下一程分开处理。",
        "先移动到备选上车点再重新下单，让新定位从稳定合法位置开始。",
        "转正规出租车时进入标记队列并乘坐调度车辆；转地铁或公交则实体核实入口和末班限制。",
        "告诉同伴或酒店前台新的交通方式与目的地。首单最终状态稍后核对，不站在路边争论。"
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "本恢复流程不能保证什么",
      "body": "本指南不保证车辆身份、司机行为、上车权限、取消费退回、到达时间、路线或安全。平台、场馆、司机和实时道路规则控制行程。绝不进入车牌不符车辆、绕过交通隔离、脱离平台交易，也不透露无关护照、银行或验证码。",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "走向车辆前"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "候车点安全且合法",
        "实体上车区名称与应用一致",
        "车牌完全匹配",
        "车辆/司机信息一致",
        "目的地仍在有效订单内",
        "沟通留在订单渠道",
        "已知切换阈值和备选地点"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "网约车接驾常见问题"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "要不要朝移动的司机图标走？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "通常不要。先确定安全实体地标并让司机确认。图标可能在另一道路层级，也可能延迟。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "司机说应用里的车牌错了怎么办？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "不要进入车牌不符车辆。留在安全位置，通过平台安全/客服核实或取消。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "指派后还能移动定位点吗？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "只用平台支持的修改和场馆合法上车区，告诉司机实体地标，不要为保住订单走进车流。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "相关地图、支付与恢复主题",
      "items": [
        {
          "label": "地址核实与导航备份",
          "href": "/zh/guides/china-navigation-verified-address-backup/",
          "description": "准备接驾所需中文地标与地图证据。"
        },
        {
          "label": "包车接送还是公共交通",
          "href": "/zh/guides/china-private-transfer-or-public-transport/",
          "description": "订单不可行时选择备选交通。"
        },
        {
          "label": "境外游客在中国如何付款",
          "href": "/zh/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "把支付设置与接驾安全分开。"
        },
        {
          "label": "手机遗失后的数字恢复",
          "href": "/zh/guides/lost-phone-in-china-digital-recovery/",
          "description": "下单设备遗失时转到数字恢复。"
        },
        {
          "label": "选择地铁附近酒店",
          "href": "/zh/guides/china-hotel-near-metro/",
          "description": "让酒店附近始终有独立公共交通。"
        },
        {
          "label": "中国自动驾驶出租车运营区",
          "href": "/zh/guides/china-robotaxi-zones-explained/",
          "description": "运营范围与服务边界由该主题负责。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源",
      "items": [
        {
          "label": "上海 Didi 出行使用指南",
          "url": "https://english.shanghai.gov.cn/en-UsefulApps/20240206/976515bc601f4803b9ce2f64ae9f0cd3.html",
          "publisher": "上海市人民政府",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2025在中国工作生活指南",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "中国国务院",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Didi 安全说明",
          "url": "https://www.didiglobal.com/science/security",
          "publisher": "Didi 全球",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "北京交通出行指南",
          "url": "https://english.beijing.gov.cn/travellinginbeijing/transportation/202006/t20200623_1931439.html",
          "publisher": "北京市人民政府",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
