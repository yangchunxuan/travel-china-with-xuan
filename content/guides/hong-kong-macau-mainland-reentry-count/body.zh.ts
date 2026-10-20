import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";
const tourHK = "beijing-xian-guilin-hong-kong-10-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "answer-first", type: "lead", text: "算。从中国内地去香港或澳门，这次内地停留就结束了；回来再过内地边检，就是一次新的入境，当天往返也一样。用的是一次入境签证的话，这次入境就用掉了。用的是中国 30 天免签政策的话，入境次数不受限，回来就是一次新的免签入境，重新计 30 天，前提是入境时你仍符合条件；对多数国家，这项政策目前施行至 2026 年 12 月 31 日。香港和澳门按各自的规定另行查验。"},
    {
      id: "jurisdiction-heading",
      type: "heading",
      level: 2,
      text: "把大陆、香港和澳门视为三套入境检查",
    },
    {
      id: "jurisdiction-explainer",
      type: "paragraph",
      text: "三地都属于中国，但并不共用一套访客入境记录。经过大陆与香港或澳门之间的边界时，需要办理大陆的出入境边检及相应特别行政区的入境手续。中国大陆签证本身不能让你进入香港或澳门，获准进入港澳也不等于可以进入大陆。",
    },
    {
      id: "crossing-map",
      type: "table",
      caption: "不同直达路线如何影响大陆入境次数",
      columns: ["实际移动", "大陆次数", "需要核对什么"],
      rows: [
        ["大陆 → 香港", "一次大陆离境", "你的护照或旅行证件能否进入香港"],
        ["香港 → 大陆", "一次新的大陆入境", "未使用且未过期的大陆入境依据"],
        ["大陆 → 澳门 → 大陆", "一次离境加一次新入境", "澳门准入及再次进入大陆的许可"],
        ["香港 → 澳门直达船或港珠澳大桥穿梭巴士", "不进入大陆", "香港离境和澳门入境分别适用的要求"],
        ["香港 → 深圳 → 珠海 → 澳门", "一次大陆入境和一次大陆离境", "中间陆路段必须具备大陆入境许可"],
        ["全程不办理大陆入境的国际空侧转机", "通常不算大陆入境", "确认机场和联程允许留在国际中转区"],
      ],
    },
    {
      id: "route-line-heading",
      type: "heading",
      level: 2,
      text: "按管辖区画路线，不按住宿晚数计算",
    },
    {
      id: "route-line-explainer",
      type: "paragraph",
      text: "依次写下每个地点，并在出入境管辖发生变化处画一条竖线。“上海 → 香港 → 深圳”包含两段大陆停留：第一段在前往香港时结束，第二段在深圳边检获准入境后开始。在香港住几晚、乘什么交通工具，以及两个大陆城市是否属于同一次旅行，都不会把这两段停留合并。",
    },
    {
      id: "route-examples",
      type: "table",
      caption: "常见路线如何计算",
      columns: ["行程", "需要说明依据的大陆入境", "规划结果"],
      rows: [
        ["出发地 → 北京 → 香港 → 回国", "一次", "到香港后不再进入大陆"],
        ["出发地 → 北京 → 香港 → 上海 → 回国", "两次", "仅凭单次签证不能覆盖两段大陆停留"],
        ["出发地 → 香港 → 深圳 → 澳门 → 回国", "一次", "香港、大陆和澳门要分别核对准入"],
        ["出发地 → 上海 → 澳门 → 珠海 → 香港 → 回国", "两次", "澳门前往珠海会开始第二段大陆停留"],
        ["香港 → 澳门直达 → 香港", "零次", "路线始终不经过大陆边检，就不会进入大陆"],
      ],
    },
    {
      id: "entry-basis-heading",
      type: "heading",
      level: 2,
      text: "为每次抵达大陆匹配一项有效入境依据",
    },
    {
      id: "entry-basis-table",
      type: "table",
      caption: "常见证件和政策能覆盖什么",
      columns: ["入境依据", "如何计算", "出发前的关键核对"],
      rows: [
        ["单次中国大陆签证", "进入大陆时使用这一次许可", "离开大陆后，已用次数不会重新变为可用"],
        ["两次中国大陆签证", "签证有效期内最多进入大陆两次", "确认第二次尚未使用，并在最晚入境日期前完成"],
        ["多次中国大陆签证", "在签证注明的有效期和条件内多次入境", "仍要核对有效期、护照信息及每次停留期限"],
        ["有效的外国人居留证件", "可能允许多次进出大陆而无需另办签证", "确认返回时证件及与其关联的护照信息仍然有效"],
        ["免签入境", "每次抵达都要按当次情况判断资格", "每次计划入境都重新核对护照、目的、停留期限和现行政策"],
        ["过境免签", "是一项有条件的过境准入，不是备用旅游入境次数", "国籍、口岸、允许区域及前往第三国或地区的确认行程都必须符合要求"],
      ],
    },
    {
      id: "visa-fields-heading",
      type: "heading",
      level: 2,
      text: "不要混淆入境次数、入境有效期和停留期限",
    },
    {
      id: "visa-fields-explainer",
      type: "paragraph",
      text: "签证的入境次数决定它能支持多少次大陆入境；入境有效期决定未使用次数可在什么时候使用；停留期限则限制每次入境后的停留时间。因此，即使签证上印的到期日尚未来临，也可能因为次数已用完而失效；反过来，即使看起来还有未使用次数，入境有效期结束后也不能再用。",
    },
    {
      id: "single-entry-warning",
      type: "callout",
      title: "支线旅行不会暂停单次签证的停留",
      body: "如果你持单次签证进入大陆，随后通过大陆离境边检前往香港或澳门，这段大陆停留已经结束。上一段尚未用完的停留天数不是返程许可，已使用的入境次数也不会在返回时恢复。",
      tone: "warning",
    },
    {id: "visa-free-heading", type: "heading", level: 2, text: "免签入境的旅客：去趟港澳，30 天怎么算"},
    {id: "visa-free-list", type: "list", items: ["按中国的单方面免签政策，入境次数和累计停留天数都不受限，每次停留从入境次日起算 30 天。所以去一趟香港或澳门，这次免签停留就结束了，回来重新开始一次，前提是入境时你仍符合条件。", "马来西亚旅客适用的是两国互免签证协定，多一条上限：任意 180 天内在中国累计不超过 90 天。", "对多数免签国家，这项政策目前施行至 2026 年 12 月 31 日。行程在 2027 年入境或停留跨入 2027 年的，付定金前先查最新官方通知，并和航空公司确认。", "每次入境仍由边检决定，来华目的也要在经商、旅游观光、探亲访友、交流访问或过境范围内。"]},
    {
      id: "separate-admission-heading",
      type: "heading",
      level: 2,
      text: "分别核对香港和澳门的准入",
    },
    {
      id: "separate-admission-explainer",
      type: "paragraph",
      text: "香港是否要求访客签证或进入许可，取决于国籍和旅行证件种类。澳门也有自己的护照有效期、签证或逗留许可、续程票和入境规定。大陆签证、大陆免签政策或联程票都不能替代港澳的检查。购买不可退交通票前，应按准确护照查询香港入境事务处和澳门特别行政区政府的现行页面。",
    },
    {
      id: "sar-checklist",
      type: "list",
      items: [
        "核对准确的护照或旅行证件，而不只是居住国家或地区。",
        "确认到访目的和允许停留时间，包括是否要求预先登记或办理签证。",
        "核对护照有效期、续程或返程证明，以及相关部门要求的资金证明。",
        "如果行程同时包括香港和澳门，要为第二个特别行政区再做一次完整检查。",
        "满足公开条件并不排除入境人员作出最终准入决定。",
      ],
    },
    {
      id: "transit-heading",
      type: "heading",
      level: 2,
      text: "只有真正符合条件的路线才能使用过境免签",
    },
    {
      id: "transit-explainer",
      type: "paragraph",
      text: "中国的过境政策要求经大陆前往第三国或地区，并对护照、口岸、客票和允许活动区域设置实时条件。在合格行程中，香港或澳门可以作为后续地区，但这不代表所有“大陆—港澳—大陆”往返都属于过境。例如“香港 → 大陆 → 香港”并没有显示前往另一个第三国或地区的后续行程。",
    },
    {
      id: "transit-checklist",
      type: "list",
      items: [
        "按票面写清出发地、大陆入境口岸、大陆离境口岸和后续国家或地区。",
        "确认护照国籍以及两个大陆口岸都在现行政策范围内。",
        "确认所有大陆段都不超出政策允许的区域和时限。",
        "准备包含所需座位与出发信息的确认续程交通；未核实时不要假定分开出票一定会被接受。",
        "路线特殊或证件无法清楚呈现完整过境链时，向实际承运人和相关边检机关确认。",
      ],
    },
    {
      id: "booking-workflow-heading",
      type: "heading",
      level: 2,
      text: "付款前完成六步核对",
    },
    {
      id: "booking-workflow",
      type: "list",
      ordered: true,
      items: [
        "画出完整路线，包括每段实际使用的陆路、铁路、船运和机场转机。",
        "标记每次大陆入境与离境，不要合并两段不同的大陆停留。",
        "为每次抵达大陆写明准确的法律依据及其实时条件。",
        "用同一本护照分别检查香港和澳门的准入。",
        "核对承运人、口岸和换乘方式，尤其注意是否必须办理入境及重新托运行李。",
        "全部成立后再买固定行程票，并保存用来作决定的官方政策页面和确认记录。",
      ],
    },
    {
      id: "document-pack-heading",
      type: "heading",
      level: 2,
      text: "随身准备一份路线证明包",
    },
    {
      id: "document-pack",
      type: "list",
      items: [
        "护照原件，以及所依赖的有效大陆签证、居留证件或其他入境文件。",
        "能显示日期、口岸和下一国家或地区的确认续程票。",
        "每个管辖区的住宿资料及相关承运人联系方式。",
        "有关官方政策页面的离线副本，以及官方服务渠道提供的任何书面答复。",
        "一行式行程表，让自己以及需要核验的承运人能看清管辖区顺序。",
      ],
    },
    {
      id: "common-errors-heading",
      type: "heading",
      level: 2,
      text: "常见的次数计算错误",
    },
    {
      id: "common-errors",
      type: "list",
      items: [
        "把一次旅行当作一次入境，却忽略其中包含两段分开的大陆停留。",
        "只看签证到期日，没有确认允许的入境次数是否已经用完。",
        "认为当天往返香港或澳门不构成大陆离境。",
        "把多次签证理解为无限制使用，没有核对有效期、关联护照和每次停留期限。",
        "地图上画的是香港—澳门直达，实际却订了经深圳或珠海的大陆陆路换乘。",
        "把任何短暂进入大陆都称为过境，却没有满足前往第三国或地区的路线条件。",
        "只检查大陆许可，临出发才发现香港或澳门要求单独的预先准入。",
      ],
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "发现路线需要一项自己没有的入境许可时",
    },
    {
      id: "recovery-explainer",
      type: "paragraph",
      text: "先改路线，不要先去碰边境。如果你仍在大陆合法停留，风险较低的方案可能是把香港或澳门移到最后，并从当地直接离境回国，或取消支线。如果已经在港澳，不要假定可以很快在当地办出大陆签证；先确认合法停留期限，联系负责的中国签证机关，并考虑直接从所在特别行政区离境，而不是尝试进入大陆。",
    },
    {
      id: "recovery-steps",
      type: "list",
      ordered: true,
      items: [
        "停止新增不可退款预订，并保留当前合法准入和允许停留期限的证明。",
        "大陆政策问题可拨打中国移民管理服务平台 12367，或联系相关大陆出入境管理机关。",
        "关于继续在港澳停留或调整当地行程的问题，分别联系香港入境事务处或澳门治安警察局出入境部门。",
        "询问实际运营的航司、铁路或船公司，哪些改道方案真正可以出票和承运。",
        "如需新办大陆签证或护照个案意见，使用负责的中国使领馆或签证服务渠道，并为拒签和办理时间留出余地。",
        "选择一个即使期望中的新许可没有签发也能保持合法的备用路线。",
      ],
    },
    {
      id: "border-warning",
      type: "callout",
      title: "不要用“先出去试试能否回来”检验资格",
      body: "尝试过关不是没有后果的资格查询。承运人可能拒绝承运，边检机关也拥有最终准入决定权。应在仍有合法备用路线时，通过负责机关解决不明确之处。",
      tone: "warning",
    },
    {id: "sale-heading", type: "heading", level: 2, text: "行程在香港结束，就没有再入境要算"},
    {id: "sale-copy", type: "paragraph", text: "想去香港，最省事的办法是在香港收尾。我们的 10 天私家团飞抵北京，经西安、桂林，第 9 天坐高铁到香港，全程只有一次内地入境、一次出境；美国等符合条件国家、从其他国家飞抵的旅客，持确认的续程车票，可能可以用 240 小时过境免签，而不必办旅游签证；能否准入由边检当场决定。行程跨到 2027 年的，现行免签政策施行到 2026 年 12 月 31 日，付定金前先核对。沿途的景点照样有截止时间。故宫当天不卖票：参观前 7 天北京时间 20:00 放票，每人用自己的护照实名预约；2025 年国庆假期第一天（10 月 1 日），故宫预约页面就已显示 10 月 2 日至 7 日全部约满。参观前至少 8 天交给我们并付款，就在预约保证范围内：约不上，服务费和门票钱全额退还；只剩不到 8 天，这份保证就用不上了。"},
    { id: "handoff-options", type: "comparison", title: "这些可以交给我们", columns: [
      { heading: `北京到香港 10 天：每人${bodyTourPrice(tourHK, 6, "zh")}起`, body: `2 人出行每人${bodyTourPrice(tourHK, 2, "zh")}，6 人每人${bodyTourPrice(tourHK, 6, "zh")}。北京 3 晚、西安 2 晚、桂林和阳朔 3 晚、香港 1 晚。`, items: ["含早餐的四星酒店、内地各城市游览日的私人导游和专车、桂林到香港的火车，以及全部接送，包括西九龙站到香港酒店、再到机场。", "如果我们订不到故宫或天安门，退还你已付的全部费用，前提是故宫参观前至少 8 天把护照信息发给我们。"] },
      { heading: "中国大陆专车和司机", body: "往返深圳或珠海口岸的专车，或中国大陆其他任何地方（不含香港、澳门境内）。", items: ["司机是我们自己的。", "付款前书面确认价格。"] },
      { heading: `景点预约：每人${bodyReservationFee("zh")}`, body: "每个景点收一次，门票按票面价另付，按每位旅客本人的护照实名预约：故宫、兵马俑、成都大熊猫基地等都可以。", items: ["参观前至少 8 天提交需求并付款，就在预约保证范围内：约不上，服务费和票款全额退还。", "只剩不到 8 天，这份保证就用不上了。"] }
    ] },
    {id: "visa-papers", type: "callout", tone: "decision", title: "需要签证？跟我们订行程，材料一起出", body: "跟我们订行程，我们提供签证申请用的每日行程单、酒店预订单和旅行社邀请函。付了 30% 定金后如果被拒签，定金全额退还。"},
    {id: "handoff-links", type: "internal-links", title: "交给我们安排", items: [{label: "查看北京、西安、桂林、香港 10 天路线", href: "/zh/tours/beijing-xian-guilin-hong-kong-10-day-private-tour/", description: "每日安排、酒店和公开价格表。"}, {label: "预约接机、接站或包车", href: "/zh/services/private-car-and-driver/", description: "中国大陆任何城市。告诉我们路线、日期和行李。"}, {label: "查看可以代预约的景点", href: "/zh/services/china-attraction-reservations/", description: "每个景点的放票时间、价格和预约保证。"}, {label: "让规划师安排整趟行程", href: "/zh/services/full-trip-support/", description: "告诉我们日期和预算，提交行程需求免费。"}]},
    {id: "how-to-book", type: "callout", tone: "decision", title: "怎么预订", body: "在上面任何一个页面，通过 WhatsApp 或邮件告诉我们日期、人数和想看的地方。规划师 12 小时内回复，付款前你会先收到书面报价；从第一次回复到你旅行的最后一天，都是同一位规划师跟进。预订时用支付宝或 VBill 付 30% 定金，余款到了中国再付，我们不另收手续费。Homeground China 是持证旅行社（许可证 L-BJ10587），导游和司机都是我们自己的，行程不进购物店。"},
    {
      id: "scope-boundary",
      type: "callout",
      title: "本文适用范围",
      body: "本文说明如何计算管辖区，以及哪些问题必须获得官方答案；不判断特定国籍、免签政策、居留身份或口岸的个案资格。临行前应按准确护照、证件、日期、口岸和续程路线再次核对现行官方规则。",
      tone: "neutral",
    },
    {
      id: "faq",
      type: "faq",
      title: "港澳往返入境次数常见问题",
      items: [
        {
          question: "去香港或澳门一日游会用掉我的中国签证入境次数吗？",
          answer: "在大陆出入境管理上，离开大陆前往香港或澳门就结束了当次大陆停留，再经大陆边检返回就是一次新的大陆入境，当天往返也一样。持单次入境签证时，已用掉的入境次数不会在返回时恢复。",
        },
        {
          question: "持单次签证能从香港回到中国大陆吗？",
          answer: "不能沿用同一次入境。一旦为前往香港或澳门办理了大陆出境检查，那次停留就已结束，之前剩余的停留天数不是回程票。新的大陆入境需要一项有效依据，例如另一次签证入境次数或符合条件的免签政策。",
        },
        {
          question: "中国大陆签证能用来进入香港或澳门吗？",
          answer: "不能。大陆、香港和澳门不共用一套访客准入记录。香港的签证或进入许可要求取决于国籍和旅行证件类型，澳门也有自己的护照有效期、签证、续程机票和准入规定；同一本护照要分别核对。",
        },
        {
          question: "北京→香港→上海这样的路线怎么计算大陆入境次数？",
          answer: "两次。第一次大陆停留在你离开去香港时结束，第二次从上海边检开始。把每个地点按顺序写下来，在出入境管辖变化的地方做标记；香港与澳门之间的直达渡轮或大桥穿梭巴士不增加大陆入境。",
        },
        {
          question: "能用中国 240 小时过境免签去香港做短途往返吗？",
          answer: "只有路线真正符合条件时才可以。过境政策要求经大陆前往第三国或地区，并对护照、口岸、机票和允许活动区域设有实时条件；香港或澳门可以作为符合条件行程中的续程地区，但这不等于任何大陆短访都算过境。路线不常见时，向承运方和边检机关确认。",
        }, {question: "去一趟香港，中国 30 天免签会重新计算吗？", answer: "从香港或澳门回来是一次新的内地入境。单方面免签政策不限入境次数和累计天数，每次停留从入境次日起算 30 天，所以入境时仍符合条件的话，回来就重新开始 30 天。马来西亚旅客有任意 180 天内累计 90 天的上限，每次入境都由边检决定。"}],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "继续规划",
      items: [
        {
          label: "深圳—香港交通",
          href: "/zh/guides/shenzhen-hong-kong-transport-route/",
          description: "确认大陆和香港入境资格后再选择口岸。",
        },
        {
          label: "香港—澳门交通",
          href: "/zh/guides/hong-kong-macau-transport-route/",
          description: "比较不会进入大陆的直达路线。",
        },
        {
          label: "中国各类预订中的护照姓名",
          href: "/zh/guides/passport-name-across-china-bookings/",
          description: "让每一段都使用同一套旅行证件身份。",
        },
        {
          label: "在中国丢失护照后的恢复步骤",
          href: "/zh/guides/lost-passport-in-china-exit-recovery/",
          description: "证件在途中发生变化时保护离境计划。",
        },
        { label: "比较经珠海和经横琴去澳门", href: "/zh/guides/guangzhou-macau-transport-route/", description: "比较广州南到珠海站/拱北和横琴站/横琴口岸的完整门到门行程，并把口岸时间、行李和晚到后的住宿备选一起算进去。" },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "已复核的官方来源",
      items: [
        {label: "单方面免签政策常见问题解答：入境次日起算 30 天、不限入境次数和累计天数、政策截止日期", url: "https://www.shanghai.gov.cn/nw17239/20251110/8bf34bf9718842f3ac32d6ea8fa5d9e5.html", publisher: "上海市人民政府外事办公室", reviewedAt: "2026-10-20"},
        {label: "外交部领事司通知（2025 年 11 月 3 日）：单方面免签政策延期至 2026 年 12 月 31 日", url: "https://bio.visaforchina.cn/BRN4_EN/tongzhigonggao/552376639691034668.html", publisher: "中国签证申请服务中心转载外交部通知", reviewedAt: "2026-10-20"},
        {label: "中马互免签证协定问答：每次 30 天，任意 180 天内累计 90 天", url: "https://my.china-embassy.gov.cn/eng/fwzc/lsyw/qz/202508/t20250801_11681401.htm", publisher: "中国驻马来西亚大使馆", reviewedAt: "2026-09-24"},
        {label: "故宫博物院票务：放票时间与实名规则", url: "https://www.dpm.org.cn/subject_booking/", publisher: "故宫博物院", reviewedAt: "2026-08-22"},
        {label: "2025 年国庆假期首日，故宫 10 月 2 日至 7 日门票已约满", url: "https://www.yicai.com/news/102851899.html", publisher: "第一财经", reviewedAt: "2026-10-19"},
        {
          label: "来华签证术语、入境次数与居留证件说明",
          url: "https://cs.mfa.gov.cn/wgrlh/lhqz/",
          publisher: "中华人民共和国外交部领事司",
          reviewedAt: "2026-08-13",
        },
        {
          label: "《中华人民共和国出境入境管理法》",
          url: "https://en.nia.gov.cn/n147418/n147458/c155978/content.html",
          publisher: "国家移民管理局",
          reviewedAt: "2026-08-13",
        },
        {
          label: "240 小时过境免签政策解读",
          url: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
          publisher: "国家移民管理局",
          reviewedAt: "2026-08-13",
        },
        {
          label: "中国移民管理服务平台 12367",
          url: "https://en.nia.gov.cn/n147413/c194788/content.html",
          publisher: "国家移民管理局",
          reviewedAt: "2026-08-13",
        },
        {
          label: "香港旅游签证和进入许可规例",
          url: "https://www.immd.gov.hk/eng/services/visas/visit-transit/visit-visa-entry-permit.html",
          publisher: "香港入境事务处",
          reviewedAt: "2026-08-13",
        },
        {
          label: "澳门非居民出入境检查规定",
          url: "https://www.gov.mo/en/services/ps-1474/ps-1474b/",
          publisher: "澳门特别行政区政府",
          reviewedAt: "2026-08-13",
        },
        {
          label: "港澳及香港—珠海大桥穿梭巴士路线",
          url: "https://www.hzmb.gov.hk/en/cross-boundary.html",
          publisher: "港珠澳大桥香港口岸",
          reviewedAt: "2026-08-13",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
