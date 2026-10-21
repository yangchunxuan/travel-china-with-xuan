import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "quick-answer-lead", type: "lead", text: "可以，外国人用护照就能坐中国高铁：在 12306 用护照姓名购票，进站时刷同一本护照，不用取纸质车票。大多数车票提前 15 天开售（含乘车当天）。检票在开车前几分钟停止，具体时间由各站自定：多数车站是开车前 2、3、5 或 7 分钟，八达岭长城站是 12 分钟。真正容易出事的，是在有好几个火车站的城市去错站、购票填的护照信息和护照不一致，以及行李箱超过高铁的尺寸限制。"},
    {
      id: "quick-answer",
      type: "callout",
      title: "快速答案",
      tone: "decision",
      body: "先确认完整的出发站与到达站名称，按护照信息购票，乘车时带上同一本有效护照，并为进站留出合理余量。大多数情况下，电子客票加购票所用护照即可乘车，不需要纸质车票；护照无法被闸机识读时，应走人工通道。各站检查顺序可能不同，跟随现场指示与工作人员即可。",
    },
    {
      id: "before-booking",
      type: "heading",
      level: 2,
      text: "订票前：先确定路线、车站与护照信息",
    },
    {
      id: "station-name-warning",
      type: "callout",
      title: "只有城市名还不够",
      tone: "warning",
      body: "同一座城市的主站、南站、西站、东站和北站，可能相隔很远。付款前，请同时核对中英文完整站名、酒店到出发口的路线，以及到达站到下一家酒店的路线。",
    },
    {
      id: "passport-details",
      type: "paragraph",
      text: "中国铁路实行实名制。使用外国护照时，应按当前 12306 的外国护照录入规则填写姓名与护照号码，并检查国籍、有效期等信息。身份核验完成后再依赖这次预订。官方现行指南支持系统自动核验、上传护照资料页人工核验，或持护照到车站窗口核验。最好提前处理，处于待核验或核验未通过状态时，可能无法购票。",
    },
    {
      id: "passport-original",
      type: "paragraph",
      text: "乘车时要带上购票所用的同一本有效护照原件。订单截图、行程信息提示和报销凭证可以辅助查找信息，但不能替代进站乘车所需的身份证件。如果订票后更换了护照，不要默认新号码可以自动匹配，应在出发前向 12306 或车站确认处理方式。",
    },
    {
      id: "ticket-windows",
      type: "paragraph",
      text: "普通车票的预售期通常为 15 天，并把乘车当天计入。按日历计算，比如 8 月 15 日乘车，通常从 8 月 1 日按出发站的起售时刻开售；车站可能调整起售时间，应在 12306 查询当前安排。",
    },
    {
      id: "beijing-shanghai-reservation-pilot",
      type: "paragraph",
      text: "2026 年，京沪高铁和京沪铁路超过 200 趟符合条件的列车试行提前预约。截至 2026 年 8 月 10 日，试点仍在过渡期：7 月 20 日至 8 月 29 日只能申请 9 月 15 日及以后出发的行程。8 月 30 日起，旅客可在铁路 12306 App 内于开车前第 60 天至第 17 天提交申请，系统在开车前第 20 天至第 16 天尝试兑现。申请兑现成功后，须在当天 23:00 前付款才会出票；逾期未支付会自动取消。这是范围有限的试点，不是全国统一的“提前 60 天售票”，提交申请也不保证兑现。",
    },
    {
      id: "booking-channels",
      type: "heading",
      level: 2,
      text: "从哪里买：官方渠道、车站窗口与第三方",
    },
    {
      id: "booking-channel-table",
      type: "table",
      caption: "外国游客常用购票渠道对比",
      columns: ["渠道", "适合谁", "需要注意"],
      rows: [
        ["铁路 12306 网站或 App", "希望直接使用官方票源、候补、改签和退票工具的旅客", "注册与护照核验需要提前准备，并确认使用的是真正的铁路 12306 平台"],
        ["火车站人工售票窗口", "需要现场身份核验协助，或已经到达正确车站的旅客", "排队时间与外语服务因站而异；带护照原件，热门车次不要拖到最后一刻"],
        ["成熟的第三方平台或票务代理", "更看重熟悉语言、支付流程或额外客服的旅客", "可能收取服务费，或只在铁路正式起售后代为提交；中国铁路不处理其他网站造成的购票问题"],
      ],
    },
    {
      id: "booking-confirmation",
      type: "paragraph",
      text: "无论使用哪种渠道，都不要把预约、预订申请或候补误认为已经出票。请确认车次、乘车日期、完整发到站、席别、车厢与座位、旅客姓名、护照号码，以及订单已经支付并显示出票成功。",
    },
    {
      id: "seat-class",
      type: "heading",
      level: 2,
      text: "二等座、一等座还是商务座？",
    },
    {
      id: "seat-class-table",
      type: "table",
      caption: "中国大陆高铁常见席别",
      columns: ["席别", "常见布局", "更适合的情况"],
      rows: [
        ["二等座", "通常每排 3+2", "注重性价比，普通对号入座即可满足需要"],
        ["一等座", "通常每排 2+2，个人空间更大", "车程较长、体型较大，或愿意为更方便起身活动增加预算"],
        ["商务座", "通常每排 2+1 或 1+1，空间明显更大；服务随车型而异", "更重视私密、休息或行动便利，而且预算合适"],
      ],
    },
    {
      id: "seat-variation",
      type: "paragraph",
      text: "这些只是常见布局，并非每一种动车组都完全相同。优选一等座、动卧等产品只出现在部分车次。应比较具体车次与票价，不必默认越贵越适合；对很多游客来说，二等座就是最实用的标准选择。",
    },
    {
      id: "station-process",
      type: "heading",
      level: 2,
      text: "从到达车站到坐上座位",
    },
    {
      id: "station-flow",
      type: "list",
      ordered: true,
      items: [
        "到站：抵达完整站名对应的车站，找到铁路出发进站口，而不是只到某个地铁出口或出租车下客点。",
        "安检：把行李放入 X 光机，并完成进入车站所需的人身检查。",
        "身份与车票核验：出示购票使用的护照原件。优先尝试标明可识读护照的闸机；无法读取时走人工通道。",
        "候车：用车次与开车时间核对大屏，前往对应候车区域或检票口。站台可能稍后才公布。",
        "检票：开始检票后，再次使用护照通过自动或人工检票口，按照站台与车厢指示前进。",
        "登车：在对应车厢地标附近等候，先下后上，进入正确车厢，并把行李放好，不堵住过道和车门。",
      ],
    },
    {
      id: "flow-variation",
      type: "paragraph",
      text: "有些车站会合并或调整进站、安检和身份核验的顺序，不同车站和证件的自动识读情况也不完全一样。真正可靠的依据是护照原件、车次、时间、检票口和现场指示，而不是其他车站的一张流程截图。",
    },
    {id: "arrival-time", type: "callout", tone: "decision", title: "应该提前多久到站？", body: "要比停止检票早。中国铁路 2023 年解释，各站根据检票口到站台的距离自定停检时间：郑州东站开车前 3 分钟停检，新乡站部分站台 7 分钟，八达岭长城站 12 分钟。始发站一般在开车前约 20 分钟开始检票，中国铁路建议至少提前 25 到 30 分钟到站。第一次坐车，到达正确的站房后预留约 45 到 60 分钟；车站很大、节假日人多、要走人工通道核验护照、带孩子或大件行李的，再多留一些。"},
    {id: "traps-heading", type: "heading", level: 2, text: "第一次坐高铁，最容易误车的七个错"},
    {id: "traps-list", type: "list", ordered: true, items: ["去错车站。北京、上海、西安都有好几个火车站，往往隔得很远。核对订单上的完整站名，再核对酒店和去车站的路线。", "护照信息填得不一样。车票绑定护照姓名和号码；拼写、姓名顺序或号码差一位，都可能在闸机前被拦下。严格按 12306 的护照录入规则填写。", "身份核验拖到最后一天。12306 对外国护照可以自动核验、上传资料页人工核验，或到车站售票窗口核验。官方没有公布人工核验要多久，所以注册后马上办。", "把开车时间当成截止时间。检票口会提前 2 到 12 分钟关闭，看车站。", "行李箱超过 130 厘米。坐动车组列车，每件物品长、宽、高之和不超过 130 厘米，成人免费携带 20 千克。", "订票后换了护照。车票仍绑在旧护照号上，出发前先问 12306 或车站。", "节假日的票等着买。车票提前 15 天开售（含乘车当天）：节假日出行，从乘车日往前数，开售第一天就订。"]},
    {
      id: "on-platform",
      type: "paragraph",
      text: "列车停靠中途站时，登车窗口可能很短。护照与订单信息要放在容易取用的位置，以车次而不只是终点站判断列车，并在车到前走到对应车厢地标。上车后按订单上的车厢与座位入座；眼前的空位不代表全程无人乘坐。",
    },
    {
      id: "luggage-security",
      type: "heading",
      level: 2,
      text: "行李与安检：符合尺寸，不等于好搬",
    },
    {
      id: "luggage-rule",
      type: "paragraph",
      text: "按中国铁路现行指引，多数旅客免费随身携带品总重上限为 20 千克，儿童为 10 千克；乘坐动车组列车时，每件物品长、宽、高之和不超过 130 厘米，单件重量不超过 20 千克。残疾旅客使用的折叠轮椅另行处理。如果接近上限，或需要托运、行李接送服务，应核对具体车次和最新规定。",
    },
    {
      id: "luggage-reality",
      type: "paragraph",
      text: "一只箱子即使符合书面限制，也可能很难处理。通常需要旅客自己把它搬过安检、长距离候车大厅、扶梯或电梯、站台缝隙和车厢。较小箱包适合行李架，大件行李区容量有限且车型不同。护照、药物、贵重物品和简单的到达用品应随身保管；行李不能堵住过道或车门。",
    },
    {
      id: "restricted-items",
      type: "callout",
      title: "离开酒店前，检查喷雾与充电宝",
      tone: "warning",
      body: "现行国家目录禁止携带枪支、爆炸物及多种易燃、有毒和腐蚀性物品，也限制常见日用品。截至 2026 年 8 月 10 日核查的例子包括：标志清晰的充电宝或锂电池，单块不超过 100Wh；指甲油、去光剂合计不超过 50 毫升；含易燃成分的非自喷压力容器香水、喷雾或凝胶，单体不超过 100 毫升、每种限 1 件；发胶等自喷压力容器单体不超过 150 毫升、每种限 1 件、累计不超过 600 毫升。特殊时期可能提高查控标准，请查最新官方目录，不要照搬旧攻略。",
    },
    {
      id: "changes",
      type: "heading",
      level: 2,
      text: "改签、退票与误车",
    },
    {
      id: "changes-principles",
      type: "list",
      items: [
        "一般情况下，一张车票可改签一次，并且必须有余票。具体能改哪些项目，取决于路线、时间和车票状态。",
        "退票费按时间分档。截至 2026 年 8 月 10 日核查，普通预售票在开车前 8 天及以上退票不收费，之后随临近开车依次为 5%、10% 或 20%。京沪提前预约试点是明确例外：预约兑现并付款后，在开车前 8 至 20 天退票收取票面价格的 5%；少于 8 天时按现有预售票规则办理。改签票和其他特殊车票还可能有附加条件。",
        "网络购票、现金支付、已打印报销凭证和第三方订单，即使适用同一铁路规则，实际办理入口也可能不同。",
        "如果是铁路调整或取消车次，应按官方通知办理；铁路责任造成的安排与旅客主动变更不同。",
      ],
    },
    {
      id: "missed-train",
      type: "callout",
      title: "列车已经开走怎么办",
      tone: "warning",
      body: "立即前往铁路服务台或改签窗口。按现行规则，如有余票，仍可能改乘其他车次，但不会自动完成，改签至后续日期还可能收费。在弄清原票状态前，不要急着再买一张；也不要假设开车后改签过的车票仍可退票。",
    },
    {
      id: "families-mobility",
      type: "heading",
      level: 2,
      text: "带儿童、父母或大件行李时",
    },
    {
      id: "children",
      type: "paragraph",
      text: "铁路儿童票按乘车当天年龄计算。年满 6 周岁且未满 14 周岁购买儿童优惠票；年满 14 周岁购买全价票。每名持票成年人可申报携带 1 名未满 6 周岁且不单独占座的儿童免费乘车；超过 1 名，或未满 6 周岁儿童需要单独座位时，应购买儿童优惠票。免费乘车儿童也要在购票时申报，并携带申报所用的有效身份证件原件。",
    },
    {
      id: "mobility-planning",
      type: "paragraph",
      text: "带年长旅客或行动不便者时，要用步行、找电梯、候车和如厕条件衡量转场，而不只看列车运行时间。现行规章要求为需要帮助的旅客提供优先和必要人工服务，部分大型车站也有服务台或轮椅，但设施与预约方式因站而异。请提前向 12306 或具体车站核实，并把全组人的车次信息整理在一起。",
    },
    {
      id: "group-luggage",
      type: "paragraph",
      text: "如果一名成年人要同时照顾两个孩子和几只大箱子，即使每张票都有效，这段交通也可能不合理。可以减少行李、提前分配搬运责任、避免极短换乘，并在到站前安排好去酒店的交通。一等座能改善座位空间，但不保证有无限的大件行李位置，也不会消除车站内的长距离步行。",
    },
    {
      id: "train-or-flight",
      type: "heading",
      level: 2,
      text: "什么时候高铁更合适，什么时候考虑飞机",
    },
    {
      id: "mode-comparison",
      type: "comparison",
      title: "比较完整的转场日",
      columns: [
        {
          heading: "高铁往往更合适",
          items: [
            "前后两家酒店到高铁站都方便",
            "有时间合适的直达或简单换乘车次",
            "重视市区到达，并希望行李始终在身边",
            "车程较短或适中，不会吞掉整天",
          ],
        },
        {
          heading: "飞机或其他方式可能更合适",
          items: [
            "铁路耗时很长、需要复杂换乘或时刻很差",
            "机场离真正的起点或终点明显更近",
            "直飞可以避开困难的铁路换乘",
            "行动能力、行李或深夜抵达使包车接送更现实",
          ],
        },
      ],
    },
    {
      id: "door-to-door",
      type: "paragraph",
      text: "应比较酒店门到酒店门：市内接驳、预留时间、安检与候车、计划运行时间、到站出站、乘飞机时的取行李，以及最后一段去酒店的交通。高铁并不永远更快，飞行时间短也不代表完整转场日一定更短。",
    },
    {
      id: "checklist",
      type: "heading",
      level: 2,
      text: "出发前检查清单",
    },
    {
      id: "departure-checklist",
      type: "list",
      items: [
        "已在地图上核对完整出发站与到达站名称",
        "订单已经出票，而不只是预约、候补或待支付",
        "旅客姓名与护照号码已对照原件检查",
        "护照原件放在容易拿取的位置",
        "已保存车次、日期、时间、车厢、座位与候车或检票信息",
        "已确认前往正确进站口的路线和现实用时",
        "同行者能够搬动行李，且行李符合现行限制",
        "充电宝、喷雾、液体等疑问物品已按最新官方目录核查",
        "儿童优惠票或免费乘车儿童申报及证件均已确认",
        "到站接送、酒店地址与可离线查看的备用联系方式已经准备",
      ],
    },
    {id: "sale-heading", type: "heading", level: 2, text: "其他都安排好了，坐高铁就是最轻松的一段"},
    {id: "sale-copy", type: "paragraph", text: "我们的多城市私家团包含长途火车：8 天路线从北京到西安坐二等座，每个车站都有司机送你、到站有司机接你。每一站的景点，放票比火车还晚。故宫当天不卖票：参观前 7 天北京时间 20:00 放票，每人用自己的护照实名预约；2025 年国庆假期第一天（10 月 1 日），故宫预约页面就已显示 10 月 2 日至 7 日全部约满。参观前至少 8 天交给我们并付款，就在预约保证范围内：约不上，服务费和门票钱全额退还；只剩不到 8 天，这份保证就用不上了。"},
    { id: "handoff-options", type: "comparison", title: "这些可以交给我们", columns: [
      { heading: "专车和司机", body: "酒店和你车票上那个车站之间的专车，北京、上海、西安或中国大陆其他任何城市都能安排。", items: ["司机是我们自己的。", "付款前书面确认价格。"] },
      { heading: `景点预约：每人${bodyReservationFee("zh")}`, body: "每个景点收一次，门票按票面价另付，按每位旅客本人的护照实名预约：故宫、兵马俑、成都大熊猫基地等都可以。", items: ["参观前至少 8 天提交需求并付款，就在预约保证范围内：约不上，服务费和票款全额退还。", "只剩不到 8 天，这份保证就用不上了。"] },
      { heading: `整趟行程：每人${bodyTourPrice(tour8, 6, "zh")}起`, body: `北京、西安、上海 8 天私家团，2 人出行每人${bodyTourPrice(tour8, 2, "zh")}，6 人每人${bodyTourPrice(tour8, 6, "zh")}。加上成都和桂林的 14 天路线，2 人每人${bodyTourPrice(tour14, 2, "zh")}。`, items: ["含早餐的四星酒店、游览日的私人导游和专车、全部接送、城市之间的火车和航班，以及行程里的实名门票。", "如果我们订不到故宫或天安门，退还你已付的全部费用，前提是故宫参观前至少 8 天把护照信息发给我们。"] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "交给我们安排", items: [{label: "查看北京、西安、上海 8 天路线", href: "/zh/tours/beijing-xian-shanghai-8-day-private-tour/", description: "每日安排、酒店和公开价格表。"}, {label: "预约接机、接站或包车", href: "/zh/services/private-car-and-driver/", description: "中国大陆任何城市。告诉我们路线、日期和行李。"}, {label: "查看可以代预约的景点", href: "/zh/services/china-attraction-reservations/", description: "每个景点的放票时间、价格和预约保证。"}, {label: "让规划师安排整趟行程", href: "/zh/services/full-trip-support/", description: "告诉我们日期和预算，提交行程需求免费。"}]},
    {id: "contact-homeground", type: "callout", tone: "decision", title: "怎么预订", body: "在上面任何一个页面，通过 WhatsApp 或邮件告诉我们日期、人数和想看的地方。规划师 12 小时内回复，付款前你会先收到书面报价；从第一次回复到你旅行的最后一天，都是同一位规划师跟进。预订时用 VBill 刷卡链接付 30% 定金，余款到了中国再付。Homeground China 是持证旅行社（许可证 L-BJ10587），导游和司机都是我们自己的，行程不进购物店。"},
    {
      id: "faq",
      type: "faq",
      title: "高铁乘车常见问题",
      items: [
        {
          question: "中国高铁票能提前多久买？",
          answer: "大多数国内车票采用含发车当日在内的 15 天预售期，例如 8 月 15 日的车票通常在 8 月 1 日按出发站的起售时间开售。2026 年京沪通道有一项单独试点，可在铁路 12306 App 提前 17–60 天提交需求，但兑现的需求在付款前不算车票。",
        },
        {
          question: "在中国坐火车需要纸质车票吗？",
          answer: "通常不需要。电子购票记录加上购票时用的同一本护照原件即可代替纸质乘车票，不过护照可能需要走人工检票通道。订单截图或报销凭证只是参考，不是乘车证件。",
        },
        {
          question: "去中国火车站要提前多久到？",
          answer: "中国铁路建议至少提前 25 到 30 分钟到站。始发站一般在开车前约 20 分钟开始检票，停止检票按车站不同，在开车前 2 到 12 分钟。第一次坐车，到达正确的站房后预留约 45 到 60 分钟；车站巨大且陌生、节假日人多、需要护照人工核验、带小孩、长辈或大件行李时要留更多。",
        },
        {
          question: "中国高铁的行李限额是多少？",
          answer: "按中国铁路现行规定，大多数旅客可免费携带 20 千克行李，儿童 10 千克；动车组列车上每件行李长宽高之和不超过 130 厘米，单件不超过 20 千克。行李通常要自己搬过安检、候车大厅和车厢。",
        },
        {
          question: "在中国儿童坐火车要买票吗？",
          answer: "看乘车当天的年龄：年满 6 周岁不满 14 周岁需购买儿童优惠票，年满 14 周岁需购买全价票。每名持票成人可申报一名不满 6 周岁的儿童免费乘车、不单独占座；多出的不满 6 周岁儿童或任何需要座位的儿童都要购买儿童票。",
        },
        {
          question: "中国火车票退票手续费是多少？",
          answer: "手续费按时间计算。按 2026 年 8 月 10 日核对的规则，普通预售车票在发车前 8 天及以上退票不收费，越接近发车分别按 5%、10% 或 20% 收取。车票通常可以改签一次，以有座位为前提。",
        }, {question: "高铁开车前多久停止检票？", answer: "各站根据检票口到站台的距离自定：多数车站是开车前 2、3、5 或 7 分钟，八达岭长城站是 12 分钟。中国铁路建议至少提前 25 到 30 分钟到站；第一次坐车，留 45 到 60 分钟。安检在检票口之前，所以要在停检之前过完安检。"}, {question: "12306 外国人身份待核验要多久？", answer: "12306 没有公布处理时间。能自动核验时会自动完成，也可以上传护照资料页照片；一直显示待核验的话，带护照到车站售票窗口当场核验。最好在买票之前办好。"}],
    },
    {
      id: "related-guides",
      type: "internal-links",
      title: "围绕列车安排整趟行程",
      items: [
        {
          label: "比较三城路线中高铁与飞机的真实时间",
          href: "/zh/guides/beijing-zhangjiajie-shanghai-transport/",
          description: "看看为什么票面运行时间只是转场日的一部分。",
        },
        {
          label: "检查你的中国行程是不是太赶",
          href: "/zh/guides/is-your-china-itinerary-too-rushed/",
          description: "把换酒店、恢复时间和门到门交通放在一起测试。",
        },
        {
          label: "判断什么时候需要导游或落地支持",
          href: "/zh/guides/do-you-need-a-tour-guide-in-china/",
          description: "分清可以自己完成的旅行日，以及真正值得有人协助的环节。",
        },
        { label: "把到达枢纽与北坡或西坡入口对应起来", href: "/zh/guides/changbai-mountain-hubs-to-park-gates/", description: "按已确认的北景区或西景区入口，选择长白山站、长白山西站或长白山机场，并为道路接驳、到错一侧和天气变化准备备选方案。" },
        { label: "规划适合孩子的路线", href: "/zh/guides/china-itinerary-with-young-children/", description: "从睡眠、饮食、如厕、照顾孩子的负担、酒店稳定性和儿童票规则设计中国亲子路线。" },
        { label: "比较桂林到阳朔", href: "/zh/guides/guilin-yangshuo-transport-route/", description: "按车站、机场、酒店、行李、方向和回程，比较桂林与阳朔之间的火车、公路接驳和水路体验。" },
      ],
    },
    {
      id: "official-sources",
      type: "sources",
      title: "官方来源与核查日期",
      items: [
        {label: "火车提前几分钟停止检票？（来源：中国铁路）", url: "https://m.gmw.cn/toutiao/2023-04/06/content_1303333333.htm", publisher: "中国青年报，光明网转载", reviewedAt: "2026-10-20"},
        {label: "故宫博物院票务：放票时间与实名规则", url: "https://www.dpm.org.cn/subject_booking/", publisher: "故宫博物院", reviewedAt: "2026-08-22"},
        {label: "2025 年国庆假期首日，故宫 10 月 2 日至 7 日门票已约满", url: "https://www.yicai.com/news/102851899.html", publisher: "第一财经", reviewedAt: "2026-10-19"},
        {
          label: "中国铁路 12306 英文版购票、改签、退票、儿童与行李常见问题",
          url: "https://www.12306.cn/en/faq.html?item=2",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "外国旅客购票、身份核验与进出站正式指南",
          url: "https://www.enghunan.gov.cn/hneng/Services/Live/Transportation/RailwayStations/202505/t20250529_33680117.html",
          publisher: "湖南省人民政府；来源：中华人民共和国商务部",
          reviewedAt: "2026-08-10",
        },
        {
          label: "外国护照姓名及号码录入规则说明",
          url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/passportInstruction/passport-entry-instructions.html",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "铁路车票 15 天预售期（含乘车当天）官方公告",
          url: "https://www.12306.cn/mormhweb/zxdt/202205/t20220531_37508.html",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "车站车票起售时间官方查询",
          url: "https://www.12306.cn/index/view/infos/sale_time.html",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "现行车票退票与改签说明",
          url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/info/orderWarmTips.html?hiddenNav=true&tabIndex=6",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "现行儿童票规则",
          url: "https://kyfw.12306.cn/otn/gonggao/children.html",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "铁路旅客禁止、限制携带和托运物品目录",
          url: "https://www.nra.gov.cn/xxgk/gkml/ztjg/gfzd/gfxw/202205/t20220527_326566.shtml",
          publisher: "国家铁路局、公安部",
          reviewedAt: "2026-08-10",
        },
        {
          label: "2026 年京沪铁路提前预约购票试点",
          url: "https://english.beijing.gov.cn/travellinginbeijing/transportation/railway/202607/t20260720_4772390.html",
          publisher: "北京市政府国际版门户网站；来源：中国铁路",
          reviewedAt: "2026-08-10",
        },
        {
          label: "高铁常见座位布局官方说明",
          url: "https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202507/t20250721_4153521.html",
          publisher: "北京市政府国际版门户网站；来源：中国铁路",
          reviewedAt: "2026-08-10",
        },
        {
          label: "关于优先服务和必要人工服务的铁路旅客运输规程",
          url: "https://xxgk.mot.gov.cn/jigou/fgs/202211/t20221117_3710710.html",
          publisher: "中华人民共和国交通运输部",
          reviewedAt: "2026-08-10",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
