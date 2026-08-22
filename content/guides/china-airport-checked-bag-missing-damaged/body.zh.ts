import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "托运行李在转盘结束后仍未出现，或到达时明显破损，应在通行规则允许的情况下，离开行李提取/海关区域前到负责航司或行李服务柜台申报。带行李条、登机牌和护照，拍摄转盘/通知、行李或损坏，并在继续行程前取得书面编号。之后用承运航司案件编号追查，而不是用普通失物招领帖子，并更新可收件地址。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "简短答案",
      "body": "先分类：托运行李未到、托运行李破损，还是物品遗失在客舱/航站楼。只有前两项属于本流程。没有收据就不要交出原行李条或破损行李；承运人记录前不要修理或丢弃；紧急购买也不能破坏证据链。本指南不判断法律责任、赔偿或时限。",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "把事故交给正确负责人"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "物品最后由谁控制，决定首次申报路径。",
      "columns": [
        "事故",
        "第一负责人",
        "出示证据",
        "离开前完成"
      ],
      "rows": [
        [
          "已出托运条但行李未出现",
          "抵达段实际承运航司行李服务",
          "行李条、登机牌、护照、行李描述和完整行程",
          "取得不正常运输/查询编号和配送联系记录"
        ],
        [
          "托运行李出现撕裂、挤压、进水或外部部件缺失",
          "离开前到承运人行李服务",
          "行李、行李条、各面照片及内容物影响",
          "记录可见状态，并在应急修理前询问"
        ],
        [
          "行李在其他转盘或标签似乎不对",
          "行李厅工作人员和实际承运航司",
          "行李实体标签与领取联",
          "不拿未经核实的行李，由人员对齐号码"
        ],
        [
          "客舱物品或航站楼物品遗失",
          "航司客舱服务或机场失物招领/安保",
          "座位/区域、时间和物品描述",
          "转正确失物流程，不开托运行李报告"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "让机场报告真正可追踪"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "留在指定转盘，直到航班显示关闭或工作人员确认卸载完成。查看超规/特殊行李点和附近转盘，但不拿未经核实的行李。",
        "拍下转盘号、航班显示和服务通知。破损时在收到位置拍摄：整体、标签、损坏处、轮子/把手及受影响内容物，之后才移动或处理。",
        "到受控区内抵达段实际承运航司或其签约行李服务柜台。如海关路线影响通行，离开前向制服机场/海关人员问清在哪里申报。",
        "出示领取联原件、登机牌、护照和完整行程。按颜色、品牌、尺寸、材质和明显特征描述行李，不猜测不能核实的内容。",
        "逐行检查新建报告：旅客/联系、行李牌号、航班/日期、行李描述、未到或破损分类、配送地址。签字或离开前改正错误。",
        "取得案件编号、可读纸质/电子报告、官方查询/客服渠道，以及更新酒店或下一城市地址的方法。除非工作人员留下原件并给书面收据，否则保留原行李条。",
        "破损行李要先问承运人是否要求查验、维修估价或留存，再安排维修或丢弃包装。交出的任何物品先拍照并取得收据。",
        "离开前问清如何更新路线/地址，以及找回后配送还是领取。确认酒店接受行李，并明确使用哪个住客姓名和号码。"
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "建立可追踪事故记录"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "行李身份、状态与交接",
      "columns": [
        {
          "heading": "行李身份",
          "body": "领取联号码、实物描述、航班和旅客对齐。出发前的行李照片有助于区分。"
        },
        {
          "heading": "事故状态",
          "body": "在修理、丢弃或继续搬运改变证据前，记录未到或破损分类、时间与照片。"
        },
        {
          "heading": "恢复交接",
          "body": "确认承运人编号、查询渠道和可联系的配送/领取地址；行程移动时及时更新。"
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "首次报告不完整时"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "修复证据记录，不编造事实或法律结论。",
      "columns": [
        "问题",
        "动作",
        "继续行程备选"
      ],
      "rows": [
        [
          "柜台查不到行李牌",
          "展示登机记录和领取联照片，请抵达段承运人查收运与中转扫描",
          "记录无法建单的沟通，联系航司官方行李渠道"
        ],
        [
          "柜台关闭或已离开",
          "拍下关闭柜台/位置，立即通过官方路径联系航司/机场",
          "要求书面指示和编号，不等到旅行结束"
        ],
        [
          "配送地址将变化",
          "通过官方渠道更新案件，并确认新酒店可代收",
          "配送无法可靠接收时选择承运人处领取"
        ],
        [
          "必需药物或设备在行李中",
          "准确告知行李柜台需求，再联系药师/医疗机构或设备负责人",
          "健康或安全行动需要替代时，不等待行李"
        ],
        [
          "承运人要求留下破损行李",
          "拍照、清点交出内容并取得签字/电子收据",
          "随身保留必需品和全部材料副本"
        ],
        [
          "查询页面没有更新",
          "用案件编号要求负责承运人提供当前查询记录",
          "控制必需品预算继续行程，不承诺配送时间"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "案件处理中继续行程"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "按真实需求列24小时必需品：经适当专业人员处理的药物替代、基本洗护、一套衣物，以及必须的充电或无障碍用品。",
        "花钱前问负责航司或保险方要求什么证据和批准。把答复当办理指引，不当作一定报销的承诺。",
        "适度购买并保存逐项收据、支付记录和照片。把必需品与便利消费或高价值物品替代分开。",
        "建立联系日志：日期、时间、渠道、人员编号/姓名、案件号和事实更新。截图另存，不覆盖更早状态。",
        "更换酒店或城市前更新配送指示，写清订单住客名、日期、前台联系，以及酒店拒收时怎么办。",
        "行李送回时，接收前拍封条/状态，核对标签和内容；新增破损或缺件应尽快追加到原官方案件。",
        "实体收到且交易问题核对完后才关闭记录，并为独立航司、保险或法律流程保留副本。"
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "不判断责任、赔偿或时间",
      "body": "本实用指南不判断法律责任、适用公约、索赔期限、赔偿、报销、维修价值或配送时间。这些取决于行程、承运条款、适用法律、证据和有权决定者。相关问题应向航司及合格法律或保险专业人士咨询。本页优先帮助及时申报、保存证据、建立可追踪交接并安全继续旅行。",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "离开行李厅时应拿到"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "准确案件/查询编号",
        "报告副本",
        "原行李条或被留物品收据",
        "行李/破损与转盘照片",
        "官方查询/客服渠道",
        "可联系的配送或领取方案",
        "地址更新方法",
        "已了解必需品证据要求"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "托运行李事故常见问题"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "可以先离开行李厅，之后再报吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "受控区规则允许时应在离开前申报。柜台不可达或关闭时，记录事实并立即通过官方渠道联系负责承运人。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "机场失物招领能查托运行李吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "托运行李应先找负责的实际承运航司或其行李服务方。客舱或航站楼遗失物走不同的航司/机场失物路径。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "航司会赔购买替代用品吗？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "本页不能承诺。询问航司或保险方当前证据要求，保存逐项凭证；责任与报销必须按个案决定。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "相关行李、证据与行程恢复主题",
      "items": [
        {
          "label": "国内航班票价与行李组合",
          "href": "/zh/guides/china-domestic-flight-fare-bundle-baggage/",
          "description": "出发前确认已购买行李额。"
        },
        {
          "label": "分开出票自助转机风险",
          "href": "/zh/guides/china-separate-flight-tickets-self-transfer-risk/",
          "description": "了解自助转机交接时谁控制行李。"
        },
        {
          "label": "预订争议证据包",
          "href": "/zh/guides/china-booking-dispute-evidence-pack/",
          "description": "整理未解决航司或付款问题的记录。"
        },
        {
          "label": "中国机场转机判断",
          "href": "/zh/guides/china-airport-layover-immigration-bags-airside-overnight/",
          "description": "转机前确认行李提取与交接。"
        },
        {
          "label": "在中国护照遗失后的离境恢复",
          "href": "/zh/guides/lost-passport-in-china-exit-recovery/",
          "description": "遗失的是护照而非托运行李时使用证件主题。"
        },
        {
          "label": "国际航班前最后一晚",
          "href": "/zh/guides/china-last-night-before-international-flight/",
          "description": "让离境材料与必需品保持可取。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源",
      "items": [
        {
          "label": "中国民航旅客与行李运输规则",
          "url": "https://www.caac.gov.cn/big5/www.caac.gov.cn/English/News/202305/W020230515366504232292.pdf",
          "publisher": "中国民用航空局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "中国国际航空行李不正常运输说明",
          "url": "https://webresource.airchina.com.cn/en-US/content/c/2022-10-21/5411.shtml?hySource=airchina-pc&hyUploadType=series",
          "publisher": "中国国际航空",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "中国国际航空行李查询",
          "url": "https://www.airchina.com.cn/flight/query-services/baggage-loss-and-delay",
          "publisher": "中国国际航空",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "中国南方航空行李查询",
          "url": "https://www.csair.com/en/online/outbaggage/?orderChannel=FWDT-ZJC",
          "publisher": "中国南方航空",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
