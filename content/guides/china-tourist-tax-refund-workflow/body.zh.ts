import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "把中国离境退税申请当成一条证据链，而不是一笔预期到账金额。付款前确认商店参加离境退税，并问清采用离境办理还是‘即买即退’；后者仍有离境义务。把符合条件的商品、护照、发票、退税申请单和支付/退款工具放在一起，并为先完成海关验核、再到代理机构办理留足时间。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "简短答案",
      "body": "商店的退税标识只是核实起点，不保证资格和最终金额。查现行规则，取得填写准确的原始单据，让商品保持可供海关查验，并根据机场或口岸要求在值机前完成相应步骤。‘即买即退’也不是在商店收款后就结束：离境验核及约定的预授权或担保仍需处理。",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "选择正确办理路径"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "以商店开具的材料和当前离境口岸流程确定路径。",
      "columns": [
        "购买情况",
        "要核实的证据",
        "离境动作",
        "避免的风险"
      ],
      "rows": [
        [
          "退税商店，常规离境退税",
          "护照、销售发票及完整退税申请单",
          "先向海关出示商品和材料，再到指定代理机构",
          "未确认海关是否查验就先托运行李"
        ],
        [
          "参加即买即退的商店",
          "即买即退协议、支付/退款工具和离境义务",
          "完成要求的海关验核以及代理/担保解除",
          "把预付退款当作无条件最终到账"
        ],
        [
          "多笔或跨地区购买",
          "每笔独立有效的材料，以及当前支持的办理方式",
          "按商店整理表单，并向离境服务点确认现行跨地区流程",
          "自行合并金额或假设所有口岸处理完全相同"
        ],
        [
          "证件、商品或单据不一致",
          "由商店更正或按官方服务台指示处理",
          "尽量在最终办理截止前解决",
          "自行修改单据或承诺工作人员会豁免缺失要求"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "从购物柜台到离境口岸"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "购物前查看国家税务总局现行资格条件，请商店确认其为离境退税商店，并问清提供常规离境办理还是即买即退。",
        "出示你离境时将使用的同一本有效护照。离柜前请商店逐项核对姓名、证件号码、发票信息和商品。",
        "收好销售发票、离境退税申请单，以及即买即退协议或授权。正反面拍照备份，但原件统一装入专用文件袋。",
        "让商品保持可识别并可供海关查看。在弄清该品类及口岸的现行资格与查验要求之前，不要使用、消耗、拆封、分散或托运。",
        "出发日前查到正确航站楼或口岸的海关验核点与退税代理机构。特别是计划托运的商品，要问清是否先验核再值机。",
        "按指示向海关出示护照、符合条件的商品、发票和申请单。海关验核与代理机构付款是两个独立步骤。",
        "拿已验核材料和要求的支付/退款工具到指定代理机构。即买即退还要完成现行流程要求的预授权或担保解除。",
        "保留盖章或电子结果、收据和交易编号，直到退款或担保状态全部核对一致；离开口岸前记下联系渠道。"
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "确认三段证据链"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "商店、海关与退税代理",
      "columns": [
        {
          "heading": "商店",
          "body": "确认参与资格，并按旅客实际护照和商品开具发票、申请单及即买即退协议。"
        },
        {
          "heading": "海关",
          "body": "完成规定的离境验核。商品须可供查看并遵守真实口岸顺序；商店表单不能替代海关环节。"
        },
        {
          "heading": "退税代理",
          "body": "按现行规则处理经验核申请或关闭即买即退授权。本页不保证方式、费用与到账。"
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "故障点与恢复"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "证据链缺一环就可能无法办理，先定位再处理。",
      "columns": [
        "问题",
        "最佳下一步",
        "不能承诺"
      ],
      "rows": [
        [
          "商店不参加",
          "不要把退税计入购买决定，按商品最终零售价比较",
          "附近另一分店或标识会让本次交易自动合格"
        ],
        [
          "姓名、护照号或发票信息错误",
          "立即返回开票商店或联系其官方服务渠道",
          "机场人员能改正商店开具的材料"
        ],
        [
          "商品已经托运",
          "如实告知海关商品位置并遵从口岸指示",
          "海关会免验或行李能及时取回"
        ],
        [
          "即买即退未完成离境验核",
          "用协议/编号联系指定机构，并保存曾尝试办理的离境证据",
          "预退金额一定保留或担保一定解除"
        ],
        [
          "退款未显示",
          "用代理交易编号和发卡/账户记录追查",
          "固定到账日、汇率、费用或最终金额"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "未能按计划完成时"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "若海关可能查验托运行李内商品，先暂停值机，向口岸官方柜台问清顺序。",
        "区分商店材料错误、海关验核问题和代理机构付款问题，三者负责人不同。",
        "要求取得拒绝、缺失材料或待处理状态的书面/电子记录，不要只接受口头说明。",
        "即买即退应尽快联系协议所列服务方，按官方更正或担保流程处理。",
        "保留发票、申请单、商品照片、登机牌、离境证据及交易编号，直到每一笔扣款和退款核对完。",
        "如错过期限或资格条件，先按没有退税调整旅行预算；金额重大且仍有争议时再寻求专业税务意见。"
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "不承诺退税金额或结果",
      "body": "本指南不判断某笔购买是否合格，也不计算或保证退税额、费用、汇率、到账时间、海关放行或即买即退担保结果。现行税务规则、参与商店、商品、材料、离境事实、海关和退税代理共同控制结果。预算时应按退款可能延迟或无法取得处理。",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "随身携带的证据包"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "离境使用的护照",
        "销售发票原件",
        "退税申请单原件",
        "如使用即买即退则带协议和相关工具",
        "保持可识别、可查验的商品",
        "正确口岸/航站楼海关位置",
        "代理机构信息与交易编号",
        "值机和安检前留足时间"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "中国离境退税常见问题"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "即买即退是否表示机场不用再办？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "不是。现行官方流程仍把预退与离境验核及相应授权或担保环节相连。阅读协议并完成口岸流程。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "退税商品能放进托运行李吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "先问离境口岸海关在哪里查验。如须在值机前看商品，就应保持行李可取用直到验核完成。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "最终能拿到多少钱？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "不要用本指南计算。请参与商店和指定代理根据本次交易给出当前计算，包括服务费和付款方式。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "相关证据与离境主题",
      "items": [
        {
          "label": "中国海关红绿通道",
          "href": "/zh/guides/china-customs-red-green-channels/",
          "description": "把申报判断与退税柜台流程分开。"
        },
        {
          "label": "国际航班前最后一晚",
          "href": "/zh/guides/china-last-night-before-international-flight/",
          "description": "为离境手续保留充足时间。"
        },
        {
          "label": "境外游客在中国如何付款",
          "href": "/zh/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "准备购物时使用的支付工具。"
        },
        {
          "label": "预订争议证据包",
          "href": "/zh/guides/china-booking-dispute-evidence-pack/",
          "description": "用同样的清晰记录方式处理未结交易。"
        },
        {
          "label": "托运行李缺失或破损",
          "href": "/zh/guides/china-airport-checked-bag-missing-damaged/",
          "description": "托运行李出现问题时知道如何留证。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源",
      "items": [
        {
          "label": "2026年7月起离境退税政策升级",
          "url": "https://www.chinatax.gov.cn/eng/c101269/c5250095/content.html",
          "publisher": "国家税务总局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "离境退税政策概览",
          "url": "https://www.chinatax.gov.cn/eng/c101276/c102444/c5240901/content.html",
          "publisher": "国家税务总局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "即买即退办理流程",
          "url": "https://www.chinatax.gov.cn/eng/c101276/c102444/c5240464/content.html",
          "publisher": "国家税务总局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "离境时退税流程",
          "url": "https://www.chinatax.gov.cn/eng/c101276/c102444/c5240906/content.html",
          "publisher": "国家税务总局",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
