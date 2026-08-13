import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "如果中国 ATM 没有出钞，但手机银行显示一笔取款，不要马上再试一次。先留在机器旁，记录 ATM 所属银行、机器编号、位置、准确时间、申请金额、实际结果以及凭条或错误信息。通过核验过的官方号码联系 ATM 所属行，取得设备事件编号；随后联系自己的发卡行，确认该记录是待处理还是已入账，并按“未收到现金”类别正式立案。保存两边案件编号；手机提醒和机器状态都不能单独保证最终结果。",
    },
    {
      id: "five-minute-heading",
      type: "heading",
      level: 2,
      text: "在 ATM 现场的头五分钟",
    },
    {
      id: "five-minute-steps",
      type: "list",
      ordered: true,
      items: [
        "让本次交易流程完全结束，阅读最终屏幕，不用力地查看出钞口，并短暂等待后续提示。不要敲打、拆开或干预机器。",
        "不要再次发起同样的取款。第二次尝试可能产生另一笔授权或扣账，也会让两笔证据更难区分。",
        "保留纸质凭条，即使上面写着失败也不要丢。安全时拍下 ATM 所属银行、机器或终端编号、网点或场所，以及屏幕错误。",
        "记录当地日期时间、申请金额和币种、实际收到金额、卡号末四位，并写清手机银行将记录标为待处理、处理中还是已入账。",
        "使用银行官网、官方 App 或经核验网点号码确认客服电话。机器原有告示上被覆盖的新贴纸可能并非银行张贴。",
        "致电 ATM 所属行，请其登记零出钞或部分出钞事件。离开前取得案件编号，并问清还要提供什么证据或是否需要去网点。",
      ],
    },
    {
      id: "repeat-warning",
      type: "callout",
      title: "扣款提醒不一定等于最终入账",
      body: "准确描述账户显示的是待处理授权、处理中记录还是已入账取款。不要承诺它一定自动冲正，也不要把待处理项目直接称为已经结算的损失。先保全第一笔交易，等待发卡行说明是否及怎样发起争议，同时改用其他付款方式。",
      tone: "warning",
    },
    {
      id: "evidence-heading",
      type: "heading",
      level: 2,
      text: "在细节消失前建立一份证据包",
    },
    {
      id: "evidence-table",
      type: "table",
      caption: "让两家银行能够识别同一笔交易的字段",
      columns: ["证据字段", "要保存什么", "隐私控制"],
      rows: [
        ["ATM 身份", "所属银行、机器或终端 ID、网点或场所、街道地址和位置全景", "不要拍到其他客户或安保流程。"],
        ["交易时间", "当地日期、准确时间、已知时区，以及各项提醒出现的先后顺序", "尽量保留原始截图的时间元数据。"],
        ["现金结果", "申请金额和币种、实际收到金额，由此计算准确缺失金额", "私下清点部分出钞，不要公开展示现金。"],
        ["卡与账户", "卡组织、发卡行、账户截图，工作文件中只留卡号末四位", "遮盖完整卡号、余额、CVV、密码和一次性验证码。"],
        ["机器输出", "凭条、错误文字、交易或序号，以及机器是否显示完成", "不要把未打码凭条发到社交媒体。"],
        ["联系轨迹", "ATM 所属行案件号、发卡行案件号、联系时间、人员或渠道和后续要求", "文件只走官方安全上传渠道。"],
      ],
    },
    {
      id: "lanes-heading",
      type: "heading",
      level: 2,
      text: "建立两条互相关联的案件，而不是一条模糊投诉",
    },
    {
      id: "lanes-comparison",
      type: "comparison",
      title: "机器端和账户端由不同机构负责",
      columns: [
        {
          heading: "ATM 所属行",
          items: [
            "负责受理端的终端、设备日志和实物现金对账。",
            "可以登记机器事件，并通过机器 ID、位置和时间锁定准确 ATM。",
            "可能要求去网点或提交凭条；结束联系前取得案件编号。",
            "不要假定它能直接给境外发行卡入账，或替发卡行决定争议。",
          ],
        },
        {
          heading: "你的发卡行",
          items: [
            "管理持卡人账户，并能解释记录是待处理还是已入账。",
            "按其自身和卡组织流程受理持卡人的正式主张。",
            "准确选择类别：未收到现金、部分现金、ATM 重复扣账或吞卡。",
            "询问申报截止时间、安全提交渠道、案件编号和查询方法；这些因发卡行而异。",
          ],
        },
        {
          heading: "卡组织支持",
          items: [
            "可按卡片和地区资格提供网络支持或紧急服务转介。",
            "Visa 和 Mastercard 都要求交易争议联系发卡金融机构。",
            "银联针对其所述场景的 FAQ 流程同样从发卡行开始。",
            "联系卡组织客服不能替代让发卡行正式登记争议。",
          ],
        },
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "准确命名故障",
    },
    {
      id: "scenario-table",
      type: "table",
      caption: "事实不同，争议和恢复路径也会改变",
      columns: ["发生了什么", "怎样报告", "立即恢复"],
      rows: [
        ["没有现金，账户项目待处理", "说明没有收到现金且项目仍待处理，提供准确时间和金额，并询问发卡行如何处理该授权。", "登记 ATM 事件、保存证据、停止重试，改用其他付款方式。"],
        ["没有现金，取款已入账", "要求发卡行按其流程建立正式的未收到现金争议，并提供 ATM 所属行案件号。", "只通过发卡行核验过的渠道提交材料，同时追踪两边编号。"],
        ["只拿到部分现金", "分别说明申请金额、收到金额和缺失金额。Visa 与 Mastercard 材料都承认部分现金问题。", "在私密处清点一次，保留钞票和凭条；除非发卡行另有指示，只申报缺失部分。"],
        ["银行卡也被吞", "向 ATM 所属行报告吞卡，并告诉发卡行卡片已不在本人控制中。", "按发卡行指示锁卡或换卡，不接受陌生人代取。"],
        ["第二次尝试又产生一笔记录", "把每笔时间、金额和参考号分别列出，不要合成一个数字。", "停止继续尝试，请发卡行判断是重复、两笔待处理授权，还是两笔已入账取款。"],
        ["这笔取款不是本人操作", "按未授权交易报告，不要归为未收到现金，并立即执行发卡行账户安全措施。", "保护银行卡和账户，单独保存证据，不要与本人发起但失败的取款混在一起。"],
      ],
    },
    {
      id: "waiting-heading",
      type: "heading",
      level: 2,
      text: "用现金备选应急，不要扩大争议",
    },
    {
      id: "waiting-list",
      type: "list",
      items: [
        "使用已经设置并测试过的移动支付；事故发生时不要在未知网络上重新配置敏感账户。",
        "必要的小额付款可用另一张实体卡。确实需要现金时，先完整记录第一笔故障，再选择有工作人员的银行网点或另一台明确支持的 ATM。",
        "可在带官方兑换标识的商业银行、合规兑换点或自助兑换机兑换外币现金；可受理币种和营业时间因地点而异。",
        "请可信同行代付，并记录双方金额。不要让陌生人代收转账，也不要在公开帖子中暴露账户资料。",
        "争议款不可用期间，为交通、餐饮和住宿保留足够资金。案件编号不能当作可支配余额。",
      ],
    },
    {
      id: "privacy-warning",
      type: "callout",
      title: "提交证据，不提交安全凭证",
      body: "银行可能需要通过官方流程核验身份，但拍摄 ATM 故障不需要向任何人提供密码、CVV 或一次性验证码。完整卡号和未打码账单不得通过普通邮件、群聊或社交媒体发送。独立核验每个号码和上传链接，并把原始文件保存在私密位置。",
      tone: "warning",
    },
    {
      id: "final-heading",
      type: "heading",
      level: 2,
      text: "追踪到案件状态与账户记录完全一致",
    },
    {
      id: "final-steps",
      type: "list",
      ordered: true,
      items: [
        "确认 ATM 所属行登记了正确终端、时间、申请金额以及零出钞或部分出钞结果。",
        "确认发卡行登记了正确类别，并写清项目是待处理还是已入账；询问何种状态变化需要重新申报。",
        "仅按要求通过安全渠道提交文件，保存提交证明和两边案件编号。",
        "检查账户是否出现冲正、正式入账、重复记录、费用或补件要求。提醒消失不代表案件已经结案。",
        "任一机构关闭案件时，索取可长期保存的处理结果和理由；不同意时使用该机构正式投诉或复核渠道。",
        "在余额、账单和案件状态三者一致前保留完整证据包。投诉答复期限不等于跨境取款款项返还期限。",
      ],
    },
    {
      id: "scope-boundary",
      type: "callout",
      title: "金融责任与时间边界",
      body: "官方材料复核于 2026 年 8 月 13 日。本指南不判断责任，也不承诺冲正、临时入账、退款金额或完成日期。待处理与已入账、零出钞与部分出钞、发卡行、卡组织、卡产品、ATM 记录、发行国家和适用法律都会改变路径。银行投诉规则说明投诉处理，不等于保证资金在某日返还。必须遵循发卡行最新的申报期限和证据要求。",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "让其余付款方案继续可用",
      items: [
        { "label": "中国旅行实用信息", "href": "/zh/essentials/", "description": "返回父集合页，继续准备付款、通信与故障恢复。" },
        { "label": "外国游客如何在中国付款", "href": "/zh/guides/how-to-pay-in-china-as-a-tourist/", "description": "建立移动支付、银行卡和现金互为备选的组合。" },
        { "label": "选择中国旅行 eSIM 或当地 SIM", "href": "/zh/guides/china-esim-vs-local-sim/", "description": "保留可用网络，用于拨打核验过的银行电话和安全上传证据。" },
        { "label": "在中国丢失手机后的数字恢复", "href": "/zh/guides/lost-phone-in-china-digital-recovery/", "description": "手机也遗失时保护付款权限和账户恢复。" },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "已复核银行、卡组织与政府官方来源",
      items: [
        { "label": "境外用卡常见问题", "url": "https://www.unionpayintl.com/cn/serviceCenter/questionAnswer/", "publisher": "银联国际", "reviewedAt": "2026-08-13" },
        { "label": "工银信用卡使用指南", "url": "https://big5.icbc.com.cn/page/721854095303671836.html", "publisher": "中国工商银行", "reviewedAt": "2026-08-13" },
        { "label": "中国银行信用卡使用指南", "url": "https://www.boc.cn/bcservice/bc3/bc31/201106/t20110607_1414163.html", "publisher": "中国银行", "reviewedAt": "2026-08-13" },
        { "label": "Visa 消费者支持", "url": "https://usa.visa.com/support.html", "publisher": "Visa", "reviewedAt": "2026-08-13" },
        { "label": "Visa 商户争议管理指南", "url": "https://by.visa.com/dam/VCOM/global/support-legal/documents/merchants-dispute-management-guidelines.pdf", "publisher": "Visa", "reviewedAt": "2026-08-13" },
        { "label": "拒付指南商户版（2026 年 5 月 19 日）", "url": "https://www.mastercard.com/content/dam/mccom/shared/business/support/rules-pdfs/chargeback-guide.pdf", "publisher": "Mastercard", "reviewedAt": "2026-08-13" },
        { "label": "Mastercard 常见问题", "url": "https://www.mastercard.com/us/en/personal/get-support/frequently-asked-questions.html", "publisher": "Mastercard", "reviewedAt": "2026-08-13" },
        { "label": "在华支付指南", "url": "https://www.mct.gov.cn/whzx/ggtz/202505/t20250520_960129.htm", "publisher": "中国人民银行、文化和旅游部", "reviewedAt": "2026-08-13" },
        { "label": "外国商务人士在华工作生活指引（2025 年版）", "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025", "publisher": "中国政府网", "reviewedAt": "2026-08-13" },
      ],
    },
  ],
};

export default body;
