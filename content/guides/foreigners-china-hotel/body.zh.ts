import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "answer-first", type: "lead", text: "可以，外国人在中国可以住普通酒店，不需要去找有特殊“涉外许可”的酒店。2024 年起的国家措施明确，不应以资质要求限制住宿经营者接待境外人员，旅馆也不得仅以“没有涉外资质”为由拒绝接待。入住时，每位外国住客（包括孩子）都要出示护照原件，酒店会替你向公安办理住宿登记。真正容易出问题的是具体门店：前台没给外国护照办过登记、自助公寓只发一个门锁密码，或者深夜抵达时前台没人。"},
    {
      id: "three-layers",
      type: "comparison",
      title: "把三类记录分开判断",
      columns: [
        {
          heading: "官方规则",
          body: "酒店查验证件、登记住客，并报送旅馆住宿信息。规则里没有要求旅客寻找某种特殊“涉外许可证”。",
          items: ["因“没有涉外资质”被拒时，使用官方政策沟通。", "官方规则不能证明某间客房仍然有库存。"],
        },
        {
          heading: "平台记录",
          body: "房源页面、住客政策标签、付款、确认单和聊天记录说明交易时展示或承诺了什么，但它们不是法律。",
          items: ["保存具体门店和实际条款。", "平台标签可能过时或标错门店。"],
        },
        {
          heading: "前台执行",
          body: "当班员工必须找到订单、查验证件并使用登记系统。培训不足或系统操作不熟，仍可能导致现场失败。",
          items: ["提前书面确认抵达时有人值班。", "执行失败时冷静升级处理。"],
        },
      ],
    },
    {
      id: "answer-boundaries",
      type: "table",
      caption: "被卡住的原因不同，处理方法也不同",
      columns: ["无法入住的原因", "意味着什么", "第一步"],
      rows: [
        ["“没有涉外接待资质”", "这一说法与现行国家政策冲突。", "请值班经理核对官方通知和住宿登记流程。"],
        ["门店、日期或姓名不对，或酒店无房", "这首先是订单或库存问题。", "请平台客服核对当前有效订单。"],
        ["证件遗失、过期或无法使用", "平台确认单不能替代身份查验。", "向12367、有关主管机关或领事机构咨询证件处理。"],
        ["普通入住条件或合法限制未满足", "国家通知不会取消所有正当入住条件。", "先要求对方说明准确规则并留下书面解释，再决定后续处理。"],
      ],
    },
    {
      id: "before-booking-heading",
      type: "heading",
      level: 2,
      text: "抵达前核验具体门店",
    },
    {
      id: "prebooking-checklist",
      type: "list",
      items: [
        "保存酒店中文名称、具体门店、完整地址、地图定位和前台电话。",
        "说明每位境外旅客都会携带护照原件或其他可接受的有效旅行证件。",
        "告知抵达日期和时间，确认届时有人值班，晚于常规时间抵达时仍会保留房间。",
        "询问这家具体门店是否会在入住时办理旅馆住宿登记。",
        "尽量让酒店在平台订单聊天中回复，并保存带门店名称和时间的离线截图。",
        "查看取消和未到店条款；不要默认被拒后一定自动退款、补差价或报销交通。",
      ],
    },
    {
      id: "confirmation-messages",
      type: "table",
      caption: "用三条短消息建立可用记录",
      columns: ["用途", "可发送的英文", "给酒店看的中文"],
      rows: [
        ["护照和登记", "I will arrive with a [country] passport. Can this exact branch complete hotel accommodation registration?", "我将持[国家]护照入住。请确认这家具体门店可以为我办理旅馆住宿登记。"],
        ["较晚抵达", "Will reception be staffed at [time], and will you hold my confirmed room?", "请确认[时间]前台有人值班，并会保留我已确认的房间。"],
        ["锁定门店", "Please reply in this booking chat and include the full branch name.", "请在订单聊天中书面回复，并写明完整门店名称。"],
      ],
    },
    {
      id: "registration-heading",
      type: "heading",
      level: 2,
      text: "旅馆住宿登记会怎样进行",
    },
    {
      id: "desk-materials",
      type: "list",
      ordered: true,
      items: [
        "到达订单上的准确门店，出示预订姓名和确认单。",
        "每位境外住客出示有效护照原件或其他可接受的国际旅行证件。",
        "让前台查验证件，并采集旅馆住宿登记所需信息。",
        "如果平台曾采集姓名或证件资料，核对拼写和号码没有指向另一位住客。",
        "前台若把旅馆登记与私人住所的登记流程混为一谈，请值班经理复核。",
      ],
    },
    {
      id: "hotel-nonhotel",
      type: "table",
      caption: "住宿形式决定由谁办理登记",
      columns: ["住宿形式", "登记责任", "旅客需要核验"],
      rows: [
        ["旅馆住宿", "酒店为住客办理登记并报送旅馆住宿信息。", "携带证件原件，并确认抵达时有前台。"],
        ["私人住宅或其他非旅馆住所", "外国人本人或留宿人在入住后24小时内办理登记。", "询问当地现行线上或现场办理方式。"],
        ["经营形式不清的公寓、客栈或民宿", "先确认它究竟按旅馆还是非旅馆住宿运营。", "不要以为门锁密码或平台标签已经完成登记。"],
      ],
    },
    {id: "nonhotel-pilot", type: "callout", tone: "decision", title: "住朋友家或私人公寓？24 小时内要登记", body: "住酒店以外的地方，本人或留宿人要在入住后 24 小时内向当地公安机关办理住宿登记。2026 年 9 月 21 日起，全国都可以网上办理：国家移民管理局政务服务网站、“移民局12367”App，或它在微信、支付宝里的小程序，与到派出所现场办理效力相同；现场办理照样保留。这不能代替酒店自己的登记。"},
    {id: "traps-heading", type: "heading", level: 2, text: "外国游客在酒店常遇到的六个意外"},
    {id: "traps-list", type: "list", ordered: true, items: ["“我们不接待外国人。”国家措施明确，旅馆不得仅以“没有涉外资质”为由拒绝接待。请值班经理说明具体原因。", "只给护照照片不行。每位外国住客，包括孩子，都要在前台出示护照原件。", "门锁密码不等于登记。住自助公寓，预订前先问由谁办理住宿登记；说不清楚的，就改住有前台的。", "过了午夜前台没人。书面确认你抵达时前台有人值班、房间会保留。", "没算进预算的押金。酒店入住时通常要冻结押金；用额度够的实体卡付。", "住朋友家却没登记。住酒店以外的地方，24 小时内登记是本人或留宿人的事，不归酒店管。"]},
    {
      id: "refusal-heading",
      type: "heading",
      level: 2,
      text: "确认订单被拒时，按顺序恢复",
    },
    {
      id: "recovery-order",
      type: "list",
      ordered: true,
      items: [
        "只核对一次门店、日期、预订姓名、房间状态和证件原件。",
        "请值班经理说明准确原因，不要只接受“系统问题”或“政策规定”这种笼统说法。",
        "如果唯一理由是“没有涉外资质”，出示官方中文通知，请经理核对现行登记流程。",
        "从仍然有效的订单进入平台客服，请客服致电门店，并把酒店给出的原因写入记录。",
        "要求酒店和平台不要标记为客人未到店。平台未书面说明费用处理前，不要自行取消。",
        "给现场处理设一个较短时限；超过时限，就转移到已经确认你的证件和抵达时间、并且有人值班的替代住宿。",
        "保持原纠纷工单开放，并保存替代房费和交通凭证，供后续审核。",
      ],
    },
    {
      id: "frontdesk-script",
      type: "table",
      caption: "在前台可以平静使用的句子",
      columns: ["任务", "中文", "表达重点"],
      rows: [
        ["确认原因", "请问无法入住的具体原因是什么？是订单、证件，还是登记流程问题？", "把问题限定为订单、证件或登记流程。"],
        ["要求升级", "请联系值班经理，并核对现行的境外人员住宿规定。", "请当班负责人核查当前规则。"],
        ["保护订单", "请在订单中注明酒店无法办理入住，不要标记为客人未到店。", "记录酒店无法办理，不要写成住客未出现。"],
        ["寻找替代", "请联系预订平台，协助安排已书面确认可以办理入住的替代住宿。", "请酒店与平台协助寻找已经确认的替代房。"],
      ],
    },
    {
      id: "midnight-scenario",
      type: "callout",
      title: "情境：半夜被拒，同行有儿童或老人",
      body: "先保证同行者安全，不要在前台把整场纠纷争完。记录问题尚未解决，取得平台工单号，确认一家有前台值守且已同意办理入住的替代住宿后立即转移。退款或投诉可以到新酒店后继续。",
      tone: "decision",
    },
    {
      id: "platform-heading",
      type: "heading",
      level: 2,
      text: "要求平台给出书面、可执行的答案",
    },
    {
      id: "platform-asks",
      type: "list",
      items: [
        "针对当前有效订单建立客服工单，并提供编号。",
        "致电准确门店，查明原因是库存、订单、证件还是登记。",
        "把门店答复写入订单记录，并避免把住客标记为未到店。",
        "按本订单实时条款解释可选方案：门店解决、换订、无罚取消或退款审核。",
        "明确替代住宿和交通凭证能否提交审核；没有书面批准前，不承诺一定报销。",
      ],
    },
    {
      id: "alternative-scenarios",
      type: "table",
      caption: "替代住宿要针对实际问题来选",
      columns: ["情境", "替代方案的优先项", "避免"],
      rows: [
        ["深夜被拒", "附近有前台，并书面确认旅行证件类型和抵达时间。", "再次选择远程或仅密码入住。"],
        ["家庭、行动不便或行李很多", "安全、简单的转移路线和已确认的下客点至房间通路。", "只按片区名称重新预订。"],
        ["原订单纠纷仍在进行", "另建一份清晰的新订单并保存明细凭证。", "没有书面条款就让客服取消或覆盖原记录。"],
      ],
    },
    {
      id: "evidence-heading",
      type: "heading",
      level: 2,
      text: "保存够用的证据，不收集多余个人信息",
    },
    {
      id: "evidence-table",
      type: "table",
      caption: "隐私安全的留证包",
      columns: ["记录", "用途", "隐私边界"],
      rows: [
        ["确认单和条款", "证明门店、日期、住客与交易条件。", "如需向客服以外的渠道提供，遮盖支付信息。"],
        ["带日期的房源截图", "证明预订时平台展示的文字。", "它是交易证据，不是法律。"],
        ["酒店拒绝记录或聊天", "记录时间、所述原因和经理是否复核。", "只有对方主动提供且确有必要时才记录员工姓名。"],
        ["平台工单和处理结果", "证明客服确认了什么、提出了什么方案。", "保存工单号，不公开聊天全文。"],
        ["替代房费与交通凭证", "说明为恢复行程发生的合理成本。", "只提供给平台或有权处理投诉的渠道。"],
      ],
    },
    {
      id: "channel-heading",
      type: "heading",
      level: 2,
      text: "按官方渠道的真实职责使用",
    },
    {
      id: "channels",
      type: "table",
      caption: "官方热线不会替你立即变出一间客房",
      columns: ["渠道", "适用问题", "边界"],
      rows: [
        ["12367", "移民管理和住宿登记政策咨询。", "不决定平台是否退款。"],
        ["12345", "地方政府的非紧急咨询、求助、投诉和转办。", "不是紧急报警电话。"],
        ["12315", "针对酒店或平台、已有订单等凭证的消费纠纷。", "不会立即提供房间，也不代表自动赔偿。"],
        ["110", "真实、紧迫的人身财产威胁、涉嫌犯罪或警务紧急情况。", "不要用于普通订单或退款争议。"],
      ],
    },
    {
      id: "failure-cases-heading",
      type: "heading",
      level: 2,
      text: "两类常见情境会改变结论",
    },
    {
      id: "failure-cases",
      type: "table",
      caption: "不要把所有被拒都处理成同一类纠纷",
      columns: ["情境", "判断", "恢复步骤"],
      rows: [
        ["订单和护照都有效，前台却说“没有涉外资质”。", "这是政策理解或前台执行问题。", "找经理、出示官方通知、记录平台工单，必要时咨询12367或12345。"],
        ["酒店说“没有房”或找不到订单。", "这是库存或交易失败，不等于外国护照规则。", "让平台按实时条款核单、换订或处理退款。"],
        ["自助公寓只发送门锁密码。", "经营方式和登记责任不清楚。", "询问由谁办理住宿登记；回答仍模糊就改住有前台的物业。"],
        ["护照遗失或无法使用。", "订单不能替代有效证件。", "联系12367、当地出入境管理机关和有关使领馆。"],
      ],
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "外国护照酒店入住：实用问答",
    },
    {
      id: "faq-platform-label-heading",
      type: "heading",
      level: 3,
      text: "平台写着“不接待外国人”，还可以预订吗？",
    },
    {
      id: "faq-platform-label-answer",
      type: "paragraph",
      text: "不要把平台标签当成法律，也不要直接忽略。保存页面，通过书面渠道联系准确门店，询问它能否按你的护照类型和到店时间办理旅馆住宿登记。答复不清楚时，付款前改选能明确确认流程的住宿。",
    },
    {
      id: "faq-confirmed-refusal-heading",
      type: "heading",
      level: 3,
      text: "酒店已经确认，现场仍拒绝入住怎么办？",
    },
    {
      id: "faq-confirmed-refusal-answer",
      type: "paragraph",
      text: "只核对一次门店、日期、预订姓名、房态和旅行证件，然后请值班经理说明准确原因。在不自行取消的情况下向平台开案，并要求不要记为未到店。若短时间内无法解决，尤其是深夜或与儿童、年长旅客同行时，先转移到已确认且有人值守的替代住宿。",
    },
    {
      id: "faq-registration-heading",
      type: "heading",
      level: 3,
      text: "住酒店也要由旅客本人在 24 小时内登记吗？",
    },
    {
      id: "faq-registration-answer",
      type: "paragraph",
      text: "住旅馆时，由旅馆登记住客并报送住宿信息。入住旅馆以外住所时，才由外国人本人或留宿人在入住后 24 小时内办理登记。公寓、客栈或民宿的运营类型不清楚时，应在抵达前先确认它按哪一类处理。",
    },
    {
      id: "faq-self-cancel-heading",
      type: "heading",
      level: 3,
      text: "被拒后应该自己取消订单吗？",
    },
    {
      id: "faq-self-cancel-answer",
      type: "paragraph",
      text: "不要在平台书面说明取消、费用和未到店状态如何处理前自行取消，否则可能削弱交易记录。安排安全替代住宿时，保留原客服案件，并只保存后续审核真正需要的证据。",
    },
    {
      id: "faq-channel-heading",
      type: "heading",
      level: 3,
      text: "应该拨打哪个官方号码？",
    },
    {
      id: "faq-channel-answer",
      type: "paragraph",
      text: "移民管理与住宿登记政策咨询用 12367，非紧急地方政府求助用 12345，有证据的消费纠纷用 12315。只有出现即时人身财产威胁、疑似犯罪或其他警务紧急情况时才用 110。这些渠道都不会保证当晚一定有房或自动退款。",
    },
    {
      id: "final-checklist",
      type: "callout",
      title: "只需要记住两份清单",
      body: "抵达前：准确门店、证件原件、有人值班的时间、书面登记确认和已保存条款。被拒后：准确原因、值班经理、平台工单、避免被记为未到店、已确认替代住宿和必要凭证。先确保有安全住宿，再处理退款或投诉。",
      tone: "decision",
    },
    {id: "sale-heading", type: "heading", level: 2, text: "到之前，酒店就已经为你准备好"},
    {id: "sale-copy", type: "paragraph", text: "我们的私家团，沿途酒店由我们挑选并预订，付款前书面写明酒店名称和房型；8 天路线住含早餐的四星酒店。抵达时有司机接你、送到酒店门口，航班再晚也不用摸黑找门店。这本护照还要用在行程里的实名预约上，而预约是有截止时间的。故宫当天不卖票：参观前 7 天北京时间 20:00 放票，每人用自己的护照实名预约；2025 年国庆假期第一天（10 月 1 日），故宫预约页面就已显示 10 月 2 日至 7 日全部约满。参观前至少 8 天交给我们并付款，就在预约保证范围内：约不上，服务费和门票钱全额退还；只剩不到 8 天，这份保证就用不上了。"},
    { id: "handoff-options", type: "comparison", title: "这些可以交给我们", columns: [
      { heading: `整趟行程：每人${bodyTourPrice(tour8, 6, "zh")}起`, body: `北京、西安、上海 8 天私家团，2 人出行每人${bodyTourPrice(tour8, 2, "zh")}，6 人每人${bodyTourPrice(tour8, 6, "zh")}。加上成都和桂林的 14 天路线，2 人每人${bodyTourPrice(tour14, 2, "zh")}。`, items: ["含早餐的四星酒店、游览日的私人导游和专车、全部接送、城市之间的火车和航班，以及行程里的实名门票。", "如果我们订不到故宫或天安门，退还你已付的全部费用，前提是故宫参观前至少 8 天把护照信息发给我们。"] },
      { heading: "专车和司机", body: "从机场或车站送到准确的酒店门店，中国大陆任何城市都能安排；询价时告诉我们抵达时间。", items: ["司机是我们自己的。", "付款前书面确认价格。"] },
      { heading: `景点预约：每人${bodyReservationFee("zh")}`, body: "每个景点收一次，门票按票面价另付，按每位旅客本人的护照实名预约：故宫、兵马俑、成都大熊猫基地等都可以。", items: ["参观前至少 8 天提交需求并付款，就在预约保证范围内：约不上，服务费和票款全额退还。", "只剩不到 8 天，这份保证就用不上了。"] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "交给我们安排", items: [{label: "查看北京、西安、上海 8 天路线", href: "/zh/tours/beijing-xian-shanghai-8-day-private-tour/", description: "每日安排、酒店和公开价格表。"}, {label: "让规划师安排整趟行程", href: "/zh/services/full-trip-support/", description: "告诉我们日期和预算，提交行程需求免费。"}, {label: "预约接机、接站或包车", href: "/zh/services/private-car-and-driver/", description: "中国大陆任何城市。告诉我们路线、日期和行李。"}, {label: "查看可以代预约的景点", href: "/zh/services/china-attraction-reservations/", description: "每个景点的放票时间、价格和预约保证。"}]},
    {id: "how-to-book", type: "callout", tone: "decision", title: "怎么预订", body: "在上面任何一个页面，通过 WhatsApp 或邮件告诉我们日期、人数和想看的地方。规划师 12 小时内回复，付款前你会先收到书面报价；从第一次回复到你旅行的最后一天，都是同一位规划师跟进。预订时用支付宝或 VBill 付 30% 定金，余款到了中国再付，我们不另收手续费。Homeground China 是持证旅行社（许可证 L-BJ10587），导游和司机都是我们自己的，行程不进购物店。"},
    {
      id: "light-help",
      type: "callout",
      title: "需要人工帮你核对？",
      body: "现有通用规划入口只用于初次联系。初始表单仅填写旅行日期、准备考虑的城市或区域、旅客与房间数量、必要时的大致住宿预算，以及是否需要稍后讨论较晚抵达。不要提交儿童具体年龄、行动、医疗或无障碍细节、护照或其他证件资料、订单或付款记录，或任何准备转交酒店、地接等供应商的可识别资料。规划师会另行安排人工跟进；这些细节只在确有需要并取得适当同意后讨论。未经另行、针对明确目的的同意，Homeground 不会把资料分享给供应商，也不会做酒店 App 排名。这不是实时库存系统，也不保证价格、房态、外国旅客接待、房型或无障碍适用性。",
      tone: "neutral",
    },
    {
      id: "faq",
      type: "faq",
      title: "入住前后常见问题",
      items: [
        {
          question: "在中国住酒店需要找有“涉外资质”的酒店吗？",
          answer: "不需要。现行国家政策明确，不应以资质要求限制住宿经营者接待境外人员，旅馆也不得仅以“没有涉外资质”为由拒绝接待。但这不等于任何酒店都一定能住：订单要真实有效，旅客要出示可接受的有效旅行证件并满足正常入住条件，具体门店也必须能完成住宿登记。",
        },
        {
          question: "预订前应该先问酒店什么？",
          answer: "问这家具体门店是否会在入住时办理旅馆住宿登记。说明每位境外旅客都会携带护照原件或其他可接受的有效旅行证件，告知抵达日期和时间，并确认届时有人值班、晚到仍会保留房间。尽量让酒店在平台订单聊天中回复，并保存带门店名称和时间的离线截图。",
        },
        {
          question: "前台可以只看护照照片或复印件吗？",
          answer: "不可以。每位境外住客要出示有效护照原件或其他可接受的国际旅行证件，再让前台查验证件，并采集旅馆住宿登记所需信息。如果平台曾采集姓名或证件资料，还要核对拼写和号码没有指向另一位住客；前台若把旅馆登记与私人住所的登记流程混为一谈，请值班经理复核。",
        },
        {
          question: "自助公寓只发门锁密码，有问题吗？",
          answer: "这说明经营方式和登记责任不清楚。先确认它究竟按旅馆还是非旅馆住宿运营，再问由谁办理住宿登记。不要以为门锁密码或平台标签已经完成登记；如果回答仍然模糊，就改住有前台的物业。",
        },
        {
          question: "被拒后应该保存哪些证据？",
          answer: "保存这些：确认单和条款、带日期的房源截图、写明时间与所述原因的拒绝记录或聊天、平台工单号及处理结果，以及替代房费与交通凭证的明细。向客服以外的渠道提供时遮盖支付信息，这些凭证只给平台或有权处理投诉的渠道。",
        }, {question: "酒店公寓入住要证件吗？", answer: "要。按酒店经营的，物业查验每位外国住客的护照原件并替你登记；如果是私人房屋，由本人或留宿人在 24 小时内网上或到派出所登记。预订前先问清是哪一种。"}, {question: "团队可以一起办理入住吗？", answer: "可以，但每位外国住客都要出示自己的护照原件，分别登记。提前把名单和抵达时间发给酒店，并请酒店书面确认，能否在你们抵达时为全团办好登记。"}],
    },
    {
      id: "related-guides",
      type: "internal-links",
      title: "继续完成住宿决策",
      items: [
        { label: "中国住宿", href: "/zh/stay/", description: "返回住宿决策内容集合。" },
        { label: "外国游客如何在中国付款", href: "/zh/guides/how-to-pay-in-china-as-a-tourist/", description: "为押金和临时换订准备付款备用方案。" },
        { label: "如何判断中国酒店是否真的靠近地铁", href: "/zh/guides/china-hotel-near-metro/", description: "另行核验从酒店门口到站台的可用路线。" },
        { label: "中国酒店为什么这么便宜？", href: "/zh/guides/why-are-hotels-in-china-so-cheap/", description: "比较物业类型和价值，不把价格与住宿登记混为一谈。" },
        { label: "比较国际连锁与本地酒店", href: "/zh/guides/international-chain-or-local-hotel-china/", description: "从房型、外籍住客登记、付款、实际位置和问题处理比较中国的国际连锁与本地酒店。" },
      ],
    },
    {
      id: "official-sources",
      type: "sources",
      title: "2026年8月20日复核的官方来源",
      items: [
        {label: "2026 年 9 月 21 日起在全国推广网上办理外国人旅馆以外住宿登记，现场办理继续保留", url: "https://www.nia.gov.cn/n897453/c1806111/content.html", publisher: "国家移民管理局", reviewedAt: "2026-10-20"},
        {label: "故宫博物院票务：放票时间与实名规则", url: "https://www.dpm.org.cn/subject_booking/", publisher: "故宫博物院", reviewedAt: "2026-08-22"},
        {label: "2025 年国庆假期首日，故宫 10 月 2 日至 7 日门票已约满", url: "https://www.yicai.com/news/102851899.html", publisher: "第一财经", reviewedAt: "2026-10-19"},
        { label: "便利境外人员住宿若干措施", url: "https://www.mofcom.gov.cn/zwgk/zcfb/art/2024/art_10ddb29858c24ece86b3f575bda1d9c4.html", publisher: "商务部等七部门", reviewedAt: "2026-08-20" },
        { label: "便利住宿措施英文摘要", url: "https://english.www.gov.cn/news/202407/26/content_WS66a2d827c6d0868f4e8e975c.html", publisher: "中国政府网英文版", reviewedAt: "2026-08-20" },
        { label: "政府网站转载的无涉外资质拒住政策报道", url: "https://wlt.xinjiang.gov.cn/wlt/xytx/202406/1ee6037434084d3ab23d68b7df174b4d.shtml", publisher: "新疆维吾尔自治区文化和旅游厅", reviewedAt: "2026-08-20" },
        { label: "旅馆与非旅馆住宿登记政策解读", url: "https://www.nia.gov.cn/n741440/n741577/c1771556/content.html", publisher: "国家移民管理局", reviewedAt: "2026-08-20" },
        { label: "北京市外国人住宿登记指南", url: "https://english.beijing.gov.cn/livinginbeijing/applicationfordocuments/202107/t20210719_2439278.html", publisher: "北京市人民政府", reviewedAt: "2026-08-20" },
        { label: "全国12315消费投诉渠道", url: "https://www.samr.gov.cn/hd/xfzn/art/2022/art_9d22351e9bee4da38b89c15e843207b4.html", publisher: "国家市场监督管理总局", reviewedAt: "2026-08-20" },
        { label: "12345与110职责边界", url: "https://www.beijing.gov.cn/zhengce/gwywj/202205/t20220516_2711529.html", publisher: "国务院办公厅（北京市政府转载）", reviewedAt: "2026-08-20" },
        { label: "题图：长春华天大酒店前台，N509FZ（CC BY-SA 4.0）", url: "https://commons.wikimedia.org/wiki/File:Check-in_counter_of_Changchun_Huatian_Hotel_(20260120074056).jpg", publisher: "维基共享资源", reviewedAt: "2026-08-13" }
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
