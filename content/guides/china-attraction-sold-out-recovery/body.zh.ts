import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "官方景点渠道显示售罄时，先核对日期、时段、游客类别和入口是否正确。之后只用景点认可的方案：按官方规则等待后续放票或退票，改到其他官方日期/时段，或者换一个地方。不要购买陌生人的实名票、出借护照、向黄牛付款，也不要听从绕过实名核验的指示。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "简短答案",
      "body": "给原景点一次有时间边界的官方复查，然后保护当天行程。保存售罄证据，阅读景点官方通知中的放票/退票规则，并设定切换时点。若没有出现合法可用库存，应在交通和用餐都被一张不存在的票拖垮之前，转到有官方库存的替代项目。",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "选择合法恢复路径"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "库存既要真实，也必须能由实名游客使用。",
      "columns": [
        "查到的情况",
        "合法动作",
        "身份检查",
        "停止条件"
      ],
      "rows": [
        [
          "官方渠道有其他日期或时段",
          "围绕该官方库存重排行程",
          "按允许流程录入每位真实游客",
          "新时段破坏交通或其他固定项目时停止"
        ],
        [
          "官方规则写明退票或追加放票",
          "只在规定时间/渠道复查",
          "确认退回名额能登记到本次游客记录",
          "到计划窗口即停止，不全天刷新"
        ],
        [
          "存在官方组合票或导览产品",
          "在景点认可渠道核实并阅读包含内容",
          "确保每位游客和证件合法登记",
          "卖家声称无需实名或可走隐藏入口时拒绝"
        ],
        [
          "没有官方可用库存",
          "换到有官方库存的其他景点、街区步行或博物馆",
          "遵循替代项目自己的实名规则",
          "关闭原尝试并移动行程"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "不追逐非官方库存的恢复流程"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "确认‘售罄’对应目标景点、日期、时段、游客类别和入口。记录官方网址、查询时间与提示；只有转售页面无票不代表官方库存。",
        "阅读景点当前官方购票须知，找出指定销售渠道、提前期、实名要求、放票规律、取消/退票规则，以及是否存在当日现场票。",
        "只有官方通知支持后续或退回库存时，才设置一到两个复查时点。使用正确游客资料，不要同时发起多笔投机订单，以免锁定记录或重复扣款。",
        "在官方网站核验套餐、旅行团或联票。确认景点承认该产品、确实包含本景点入场、每位游客会实名登记，且取消条款清楚。",
        "根据当天交通设定切换时间。到时仍无官方库存，就在规则允许期内取消相关交通或用餐，并启动替代。",
        "通过替代项目自己的官方或授权渠道预订并保存确认。优先同一区域，避免为补救而仓促跨城。",
        "如已向不被认可的卖家付款，不再发送证件照片或追加付款。保存商品页、对话、收据和承诺内容，转入支付渠道或争议处理主题。"
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "用双重有效性测试"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "库存和实名都必须通过",
      "columns": [
        {
          "heading": "官方库存",
          "body": "景点或其明确认可渠道确认准确日期、时段和产品。截图或卖家消息不是实时库存。"
        },
        {
          "heading": "实名游客有效",
          "body": "真实游客及受理证件按现行规则登记。看似可转让的二维码也可能在实名核验时失败。"
        },
        {
          "heading": "整日可执行",
          "body": "交通、营业时间和其他固定预订仍能衔接。如果到达某个有效时段会毁掉全天，它也不是恢复。"
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "必须停止尝试的红旗"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "这些信号要求切换方案，不是寻找规避办法。",
      "columns": [
        "红旗",
        "为什么失败",
        "安全回应"
      ],
      "rows": [
        [
          "卖家要求借用或修改护照资料",
          "破坏实名游客记录并带来身份风险",
          "不发送证件，转官方渠道或替代方案"
        ],
        [
          "承诺侧门、内部人员或不用扫描",
          "意图绕过受控准入",
          "拒绝并保留官方售罄结果"
        ],
        [
          "只给二维码，没有游客本人名下订单",
          "二维码可能被取消、重复使用或在实名核验被拒",
          "不购买，要求官方订单验证"
        ],
        [
          "以‘马上关窗’催促再次付款",
          "稀缺压力阻断核实与争议保护",
          "暂停、独立核实，并放弃原景点"
        ],
        [
          "官方公告明确没有第三方代理",
          "景点已直接否定所谓渠道",
          "仅用公告所列渠道，必要时举报冒充"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "把售罄核心项目改成可执行的一天"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "停止围绕不存在的门票继续花钱，列出仍在免费取消期内的相关预订。",
        "按地理位置和开放确定性选择替代，而不是只看名气：同一区域、确认能入场、交通时间现实。",
        "收到替代确认后再移动弹性餐饮和交通，并在新核心项目旁留一个未预订缓冲段。",
        "明确告知同行者改变了什么、放弃了哪笔订单，避免有人继续购买重复或非官方票。",
        "原官方渠道之后若放出有效库存，先与已确认替代比较，再决定是否更换；不要制造第二次连锁故障。",
        "为相关可退预订保存售罄截图与取消记录，但售罄本身并不自动产生赔偿权。"
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "不承诺存在隐藏门票",
      "body": "本指南不能创造库存、保证退票名额、验证转售商、预留未来放票或承诺准入。绝不推荐黄牛、借用身份、虚假资料、自动化滥用排队、非官方入口或其他实名绕行。现行景点规则及其认可渠道控制入场。",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "15分钟恢复清单"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "已确认准确官方日期/时段/类别售罄",
        "已读官方放票和取消规则",
        "只设一个有限复查窗口",
        "拒绝身份或侧门绕行",
        "已选有官方库存的替代",
        "在截止前检查相关预订",
        "实际付款争议已有证据"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "景点售罄常见问题"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "官网售罄后，酒店或导游能拿到票吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "只信景点当前明确认可的产品或渠道，并确保真实游客完成登记。某个人很有把握不等于有真实库存。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "可以用别人的票或护照资料吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "不可以。不要借身份、购买陌生人实名票或修改记录，这些行为有准入和身份风险，也可能违反景点规则。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "要不要全天一直刷新？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "只有官方通知说明会继续放票或有退回库存时，才在有限时点复查；否则尽早切换，保住可用的一天。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "相关票务与行程主题",
      "items": [
        {
          "label": "官方还是转售渠道购票",
          "href": "/zh/guides/official-or-reseller-china-tickets/",
          "description": "付款或发送证件前核实销售渠道。"
        },
        {
          "label": "外国游客参观故宫",
          "href": "/zh/guides/forbidden-city-for-foreign-visitors/",
          "description": "故宫完整参观方案由该主题负责。"
        },
        {
          "label": "中国国家博物馆预约与路线",
          "href": "/zh/guides/national-museum-of-china-booking-and-route/",
          "description": "查看官方库存并规划邻近替代。"
        },
        {
          "label": "三星堆预约与展厅顺序",
          "href": "/zh/guides/sanxingdui-museum-booking-and-gallery-order/",
          "description": "该馆放票与参观流程由专页负责。"
        },
        {
          "label": "抵达日固定项目还是弹性时段",
          "href": "/zh/guides/china-arrival-day-booked-anchor-or-flexible-block/",
          "description": "避免把稀缺门票放在中断风险最高的位置。"
        },
        {
          "label": "预订争议证据包",
          "href": "/zh/guides/china-booking-dispute-evidence-pack/",
          "description": "非认可卖家收款后保存争议证据。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源",
      "items": [
        {
          "label": "故宫博物院购票须知",
          "url": "https://intl.dpm.org.cn/ticket_details.html",
          "publisher": "故宫博物院",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "中国国家博物馆非官方购票渠道警示",
          "url": "https://en.chnmuseum.cn/home_527/news/202602/t20260203_278439.html",
          "publisher": "中国国家博物馆",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "中国国家博物馆预约系统",
          "url": "https://pcticket.chnmuseum.cn/museum-en/",
          "publisher": "中国国家博物馆",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "敦煌研究院官方渠道提示",
          "url": "https://www.dha.ac.cn/info/1018/7786.htm",
          "publisher": "敦煌研究院",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "在线旅游经营服务管理暂行规定",
          "url": "https://www.mct.gov.cn/preview/whhlyqyzcxxfw/zhgl/202012/t20201222_919903.html",
          "publisher": "文化和旅游部",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
