import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";
const group14 = "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "lead-answer", type: "lead", text: "2026 年中国法定假期：元旦 1 月 1 日至 3 日，春节 2 月 15 日至 23 日，清明 4 月 4 日至 6 日，劳动节 5 月 1 日至 5 日，端午 6 月 19 日至 21 日，中秋 9 月 25 日至 27 日，国庆 10 月 1 日至 7 日，另有六个周末调成工作日。2027年的法定节假日日期由法规确定，春节为 2 月 5 日至 8 日，国庆为 10 月 1 日至 3 日，但调休和连休安排尚未发布。放假日期只是第一层：大假期里，限时门票会约满，热门景点排队能排上几个小时，下文有带日期的实例。定日期之前，先看日历。"},
    {
      id: "status-summary",
      type: "comparison",
      title: "日历状态（核对日期：2026年9月18日）",
      columns: [
        {
          heading: "2026年——已正式发布",
          body: "国务院办公厅通知列出七段假期和六个调休工作日，完整日期见下表。",
        },
        {
          heading: "2027年——仅法定日期",
          body: "修订后的《全国年节及纪念日放假办法》规定了13天法定假日，见下表。国务院办公厅通常在11月至12月发布次年通知，届时才会明确调休和连休安排，本页不做推测。",
        },
      ],
    },
    {
      id: "calendar-heading",
      type: "heading",
      level: 2,
      text: "2026年中国官方公众假期",
    },
    {
      id: "calendar-intro",
      type: "paragraph",
      text: "以下为《国务院办公厅关于2026年部分节假日安排的通知》（国办发明电〔2025〕7号）公布的全国安排。“调休工作日”是被安排为上班日的周六或周日，不是额外增加的假期。",
    },
    {
      id: "official-calendar",
      type: "table",
      caption: "2026年官方放假日期与调休工作日",
      columns: ["节日", "官方放假日期", "天数", "调休工作日"],
      rows: [
        ["元旦", "1月1日至3日", "3天", "1月4日（星期日）"],
        ["春节", "2月15日至23日", "9天", "2月14日（星期六）、2月28日（星期六）"],
        ["清明节", "4月4日至6日", "3天", "无"],
        ["劳动节", "5月1日至5日", "5天", "5月9日（星期六）"],
        ["端午节", "6月19日至21日", "3天", "无"],
        ["中秋节", "9月25日至27日", "3天", "无"],
        ["国庆节", "10月1日至7日", "7天", "9月20日（星期日）、10月10日（星期六）"],
      ],
    },
    {
      id: "official-not-operator",
      type: "callout",
      tone: "warning",
      title: "官方放假不等于全国统一营业时间",
      body: "国务院办公厅日历说明全国放假日期和调休工作日，但它不会保证某家博物馆开放、某家餐厅停业、某家酒店有房，或某趟列车有票。这些都属于不同运营方的单独决定。",
    },
    {
      id: "statutory-2027-heading",
      type: "heading",
      level: 2,
      text: "2027年法定节假日：调休安排尚未发布",
    },
    {
      id: "statutory-2027-intro",
      type: "paragraph",
      text: "以上是修订后《全国年节及纪念日放假办法》规定的法定假日，农历日期已对照香港特区政府公布的2027年公众假期表核对。《放假办法》允许把法定节假日统一调休形成较长假期，但具体的调休工作日和连休日期，只有在国务院办公厅通知发布后才会确定。在此之前，2027年的每一个长假都应视为未确认。",
    },
    {
      id: "statutory-2027-calendar",
      type: "table",
      caption: "2027年法定节假日（调休安排待国务院通知）",
      columns: ["节日", "法定放假日期", "天数", "调休与连休"],
      rows: [
        ["元旦", "1月1日（星期五）", "1天", "待国务院通知"],
        ["春节", "2月5日至8日（除夕至正月初三）", "4天", "待通知"],
        ["清明节", "4月5日（星期一）", "1天", "待通知"],
        ["劳动节", "5月1日至2日", "2天", "待通知"],
        ["端午节", "6月9日（星期三）", "1天", "待通知"],
        ["中秋节", "9月15日（星期三）", "1天", "待通知"],
        ["国庆节", "10月1日至3日", "3天", "待通知"],
      ],
    },
    {
      id: "different-effects-heading",
      type: "heading",
      level: 2,
      text: "不同假期对旅行的影响并不相同",
    },
    {
      id: "holiday-effects",
      type: "table",
      caption: "每个假期为什么是不同的规划问题",
      columns: ["假期", "这个假期有什么不同", "行程里要检查什么"],
      rows: [
        ["元旦", "三天短假，之后的星期日调整为工作日。", "关注短途休闲出行和1月4日工作日，不要把它当成缩小版春节。"],
        ["春节", "九天公众假期位于另行公布的40天春运期内。", "探亲流向、长途票、商户停业安排和抵达后的恢复时间。"],
        ["清明节", "三天内同时有祭扫与休闲出行；官方交通信息特别关注墓区和景区周边道路。", "短途公路、当地交通，以及具体景区或祭扫区域通知。"],
        ["劳动节", "五天休闲出行集中，交通运输部会针对公路、铁路和民航综合准备。", "跨城备选、可取消住宿和限时入场容量。"],
        ["端午节", "2026年为三天假期，未列调休工作日。", "类似周末的区域短途出行、活动专属规则，以及那次紧凑换乘是否必要。"],
        ["中秋节", "三天家庭与休闲假期，2026年与国庆假期分开。", "核对九月对应周末和当地活动，不要直接套用十月判断。"],
        ["国庆节", "七天官方假期加两个调休工作日，适合形成全国性长线休闲出行。", "是否在一地停留、把跨城移动后移，以及如何保护依赖预约的日程。"],
      ],
    },
    {
      id: "no-ranking",
      type: "callout",
      tone: "neutral",
      title: "这不是“拥挤排行榜”",
      body: "一张全国日历无法负责任地给每座城市、每条线路和每个时段打同一个分数。实际判断取决于节日、出行方向、具体运营方、普通周末、当地活动，以及你的行程能否承受连接失败。",
    },
    {
      id: "spring-heading",
      type: "heading",
      level: 2,
      text: "春节：放假九天，但春运持续40天",
    },
    {
      id: "spring-detail",
      type: "paragraph",
      text: "根据国家发展改革委发布的全国春运会议通知，2026年春运期为2月2日至3月13日。它远长于2月15日至23日的公众假期，因为探亲出行会分散在正式假期前后。这说明长途交通需要扩大核查日期范围，但不代表每条线路在40天里都同样繁忙。",
    },
    {
      id: "spring-checks",
      type: "list",
      items: [
        "逐段核对长途火车或航班的方向和日期，不要只看它是否落在2月15日至23日内。",
        "直接确认小型商户、餐厅和旅游服务的营业日期；家庭经营者可能自行安排春节休息。",
        "不要把不可退的景点预约紧接在不确定的长途抵达之后。",
        "长途夜航或大型探亲换乘后，要留出恢复时间。",
      ],
    },
    {
      id: "labour-national-heading",
      type: "heading",
      level: 2,
      text: "劳动节与国庆节：保护行程结构，不预测统一价格",
    },
    {
      id: "labour-national-detail",
      type: "paragraph",
      text: "劳动节五天、国庆节七天，让长线休闲出行更容易形成。多城市旅客应当预期热门日期下舒适备选会减少，但这不能推出全国统一的酒店涨幅，也不能承诺假期后第一天一定清静。位置、线路、房型、取消规则和当地活动仍会改变结果。",
    },
    {
      id: "october-owner",
      type: "callout",
      tone: "decision",
      title: "准备十月出行？看十月专题",
      body: "那篇文章比较国庆假期和十月中下旬，包括路线安排和各地天气；全年官方放假日期以本页为准。",
    },
    {id: "peak-heading", type: "heading", level: 2, text: "假期高峰，到了景区门口是什么样"},
    {id: "peak-copy", type: "paragraph", text: "以下是近几个假期的报道实例，都注明了日期和来源。这是高峰日，不是天天如此，但能看出全国一起放假时会发生什么。"},
    {id: "peak-list", type: "list", items: ["故宫，2025 年国庆：10 月 1 日，故宫预约页面就已显示 10 月 2 日至 7 日全部约满。故宫提前 7 天北京时间 20:00 放票，当天不售票。", "张家界，2025 年五一：武陵源区公开发文，承认 5 月 2 日电梯、索道和环保车排队时间较长，当晚直到 21:53 才把滞留游客全部送完。那个周末有游客排了约两小时百龙天梯、一个半小时天子山索道。", "玉龙雪山，2025 年春节：2 月 2 日大雪，游客从下午约两点排到六点才坐上缆车下山；2 月 4 日中午起限流，当天索道票全部约满。", "成都大熊猫基地，2024 年寒假：据中国青年报 2 月 2 日报道，某天早上 7:40，看“花花”的队伍已排出 500 米，现场牌子提示还要排两个小时以上。"]},
    {id: "peak-plan", type: "paragraph", text: "这种日子靠的不是运气，是顺序：门票提前订好，选最早的入园时间，导游知道往哪个方向走，用车不用跟着假期排出租车。人不会因此变少，但你在人群里的一天会好过很多。"},
    { id: "handoff-options", type: "comparison", title: "假期出行？先订这几样", columns: [
      { heading: `景点预约：每人${bodyReservationFee("zh")}`, body: "每个景点收一次，门票按票面价另付，按每位旅客本人的护照实名预约，从故宫到兵马俑、成都大熊猫基地都可以。", items: ["参观前至少 8 天提交需求、付款并提供每位游客的护照信息，就在预约保证范围内：约不上，服务费和票款全额退还。", "只剩不到 8 天再找我们，这份保证就用不上了。"] },
      { heading: `私人导游：每天${bodyGuideRate("zhangjiajie", "zh")}起`, body: `持证英文导游，最多 8 小时：张家界、西安${bodyGuideRate("zhangjiajie", "zh")}起，北京、上海${bodyGuideRate("beijing", "zh")}起，旺季日期更高。需要中文导游也可以安排，价格在报价里确认。`, items: ["导游排好入园时间和游览方向。", "按整天预订，按每位导游计价，不是按人头。"] },
      { heading: `两周行程一次订好：每人${bodyTourPrice(group14, 2, "zh")}起`, body: `北京、西安、成都、桂林、上海 14 天小团，两人同住每人${bodyTourPrice(group14, 2, "zh")}，2027 年 4 月 10 日、5 月 8 日、9 月 11 日、10 月 9 日出发。5 月和 10 月这两团都在劳动节（5 月 1 日至 2 日）、国庆节（10 月 1 日至 3 日）法定假日之后出发；2027 年完整的放假调休安排尚未公布。同一路线的私家团，2 人出行每人${bodyTourPrice(tour14, 2, "zh")}，6 人每人${bodyTourPrice(tour14, 6, "zh")}。`, items: ["含早餐的酒店、导游和专车、全部接送、城市之间的火车和航班，以及行程里的实名门票。", "如果我们订不到故宫或天安门，退还你已付的全部费用，前提是故宫参观前至少 8 天把护照信息发给我们。"] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "交给我们安排", items: [{label: "查看可以代预约的景点和放票时间", href: "/zh/services/china-attraction-reservations/", description: "每个景点的放票时间、价格和预约保证。"}, {label: "查看 14 天小团", href: "/zh/tours/beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour/", description: "固定出发日期、每日安排和价格。"}, {label: "查看 14 天私家团", href: "/zh/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/", description: "日期自己定；2 人、4 人、6 人的价格。"}, {label: "请一位导游陪一天", href: "/zh/services/private-english-speaking-guides/", description: "北京、上海、西安、张家界的价格。"}]},
    {
      id: "system-effects-heading",
      type: "heading",
      level: 2,
      text: "假期会怎样影响四类预订系统",
    },
    {
      id: "system-effects",
      type: "table",
      caption: "按预订系统拆分的旅行影响",
      columns: ["系统", "假期日历能告诉你什么", "它不能告诉你什么", "必须另行核对"],
      rows: [
        ["跨城交通", "哪些日期需要更早准备备选，并减少前后相互依赖的换乘。", "实时余票、价格、航班准点情况，或某个方向的具体压力。", "官方12306或航空公司库存，以及当期车站、机场指引。"],
        ["景区与场馆", "哪些日期更需要关注假期通知和限时预约。", "某个场馆究竟开放、闭馆、延长时间还是更换入口。", "该场馆官方预约渠道和当期假期公告。"],
        ["酒店", "哪些日期应在决策中更重视位置和可取消性。", "全国统一涨价幅度、实际房量，或某个房型是否适合。", "具体酒店、分店、房型配置和取消条款。"],
        ["商户与旅游服务", "哪些日期可能不再符合普通工作日习惯，春节前后尤其如此。", "适用于所有私营商户的全国统一营业安排。", "临近出行时向运营方直接确认。"],
      ],
    },
    {
      id: "rail-heading",
      type: "heading",
      level: 3,
      text: "铁路：当前预售期不等于有票保证",
    },
    {
      id: "rail-detail",
      type: "paragraph",
      text: "中国铁路现行规则以乘车日期计算，标准预售期为15天（含当天），并说明铁路可调整预售期并另行公告。应从实际乘车日倒推，在官方12306核对发售详情，同时准备可接受的替代车次。本页不读取实时库存。",
    },
    {
      id: "attraction-heading",
      type: "heading",
      level: 3,
      text: "景点：国家放假日期与场馆开放时间是两套数据",
    },
    {
      id: "attraction-detail",
      type: "paragraph",
      text: "故宫博物院可以说明这条边界。其2026年春节公告明确2月16日全天闭馆，并公布其余假期日期的开放安排；劳动节公告则明确5月1日至5日开放并列出时间。同一场馆在两个假期采用不同规则，不能把它复制到其他博物馆或其他年份。",
    },
    {
      id: "comp-workdays-heading",
      type: "heading",
      level: 2,
      text: "不要漏看调休工作日",
    },
    {
      id: "comp-workdays-detail",
      type: "paragraph",
      text: "中国每年的放假通知可以把普通周末调整为工作日。2026年共有1月4日、2月14日、2月28日、5月9日、9月20日和10月10日六天。星期日上班可能影响通勤、办公和当地生活节奏，但不代表所有景点或私营商户必须采用相同营业安排。",
    },
    {
      id: "route-method-heading",
      type: "heading",
      level: 2,
      text: "把日历变成路线判断",
    },
    {
      id: "route-method",
      type: "list",
      ordered: true,
      items: [
        "把入境、每次跨城移动和国际离境日逐一对照官方假期与调休工作日。",
        "如果春节出行，再把长途交通与另行公布的春运期对照。",
        "标出会破坏下一项预订的环节：指定车次、航班、一晚酒店和限时入场景点。",
        "没有可行备选时，删掉或后移一次换城市；一地住宿比连续一晚一城更容易恢复。",
        "进入真实预订窗口后，再核对官方交通库存、场馆公告和酒店条款。",
        "重新检查国际离境前的最后一晚，不要依赖当天长距离国内接驳。",
      ],
    },
    {
      id: "route-pattern",
      type: "comparison",
      title: "同一假期日期下的两种路线结构",
      columns: [
        {
          heading: "更有恢复空间",
          items: [
            "集中假期内保持同一家酒店作为基地。",
            "每天只排一个要预约的重点景点，附近另有备选。",
            "可取消房间，并接受两种跨城班次。",
            "国际航班前一晚已住在离境城市。",
          ],
        },
        {
          heading: "更容易连锁失效",
          items: [
            "每一两晚就换城市或酒店。",
            "长途移动后立刻安排固定入场景点。",
            "只接受一个座位、一个房型和一次连接，没有备选。",
            "国际航班当天才长距离抵达出发城市。",
          ],
        },
      ],
    },
    {
      id: "future-heading",
      type: "heading",
      level: 2,
      text: "旅行年份尚未公布怎么办？",
    },
    {
      id: "future-boundary",
      type: "callout",
      tone: "warning",
      title: "2027年：法定日期已定，调休安排待发布",
      body: "2026年9月18日复核：2027年法定节假日来自修订后的《全国年节及纪念日放假办法》，农历日期已对照香港特区政府公布的2027年公众假期表。国务院办公厅的调休安排、调休工作日和春运日期尚未发布。不要按猜测的长假订票；官方通知发布后本页会更新。",
    },
    {
      id: "update-mechanism",
      type: "paragraph",
      text: "国务院办公厅发布下一年度通知后（通常在 11 月或 12 月），本页会随之更新。在此之前，凡是依赖 2027 年长假的预订，尽量选可取消的。",
    },
    {id: "help-cta", type: "callout", tone: "decision", title: "怎么预订", body: "在上面任何一个页面，通过 WhatsApp 或邮件告诉我们日期、人数和想去的城市。规划师 12 小时内回复，付款前你会先收到书面报价；从第一次回复到你旅行的最后一天，都是同一位规划师跟进。预订时用 VBill 刷卡链接付 30% 定金，余款到了中国再付。Homeground China 是持证旅行社（许可证 L-BJ10587），导游和司机都是我们自己的，行程不进购物店。"},
    {
      id: "faq",
      type: "faq",
      title: "假期日历常见问题",
      items: [
        {
          question: "2026年春节什么时候？放几天假？",
          answer: "2月15日至23日，共9天。同一份国务院办公厅通知还把2月14日和2月28日两个星期六定为调休工作日，也就是把周末安排成上班日，并不是额外增加的假期。清明节、端午节、中秋节各放3天，劳动节5天，国庆节7天。",
        },
        {
          question: "现在能按2027年的假期安排订行程吗？",
          answer: "只能按法定日期。2026年9月18日复核时，2027年的法定节假日已由修订后的《全国年节及纪念日放假办法》确定，例如春节2月5日至8日、国庆节10月1日至3日；但国务院办公厅的调休工作日和连休安排尚未发布，所以2027年的每一个长假都应视为未确认。",
        },
        {
          question: "假期出行的火车票最早能提前多久买？",
          answer: "提前15天，含乘车当天。中国铁路现行规则以乘车日期计算预售期，并说明铁路可以调整预售期并另行公告。要从实际乘车日往前推算，在官方12306核对发售详情，同时准备可接受的替代车次。本页不读取实时库存。",
        },
        {
          question: "春节假期故宫博物院开放吗？",
          answer: "要看具体日期和当年公告。故宫博物院2026年春节公告明确2月16日全天闭馆，同时公布其余假期日期的开放安排；劳动节公告则明确5月1日至5日开放并列出时间。同一场馆在两个假期用的是两套规则，所以要按自己的日期查该场馆自己的公告。",
        },
        {
          question: "劳动节和国庆节期间酒店会更贵吗？",
          answer: "假期日历回答不了这个问题。劳动节五天、国庆节七天，让长线休闲出行更容易形成，多城市旅客应当预期热门日期的舒适备选会减少。但这既推不出全国统一的酒店涨幅，也不能承诺假期后第一天一定清静；位置、线路、房型、取消规则和当地活动仍会改变结果。",
        },
        {
          question: "春运40天是不是都要避开？",
          answer: "不必全避开。2026年春运期为2月2日至3月13日，远长于2月15日至23日的公众假期，因为探亲出行会分散在正式假期前后。这说明长途交通要扩大核查的日期范围，但不代表每条线路在40天里都同样繁忙。",
        }, {question: "国庆黄金周去中国旅游合适吗？", answer: "这是大景点的高峰期：2025 年国庆假期第一天（10 月 1 日），故宫 10 月 2 日至 7 日就已全部约满。黄金周照样可以出行，但每张限时门票都要在放票后尽早订，每天早出门，住处尽量不换。日期能调的话，可以看我们的十月专题，比较国庆和十月中下旬。"}, {question: "Homeground 能帮我订假期里的故宫门票吗？", answer: "能。故宫参观前 7 天北京时间 20:00 放票，我们按每位旅客本人的护照实名预约。参观前至少 8 天提交需求、付款并提供每位游客的护照信息，就在预约保证范围内：约不上，服务费和票款全额退还。"}],
    },
    {
      id: "more-planning",
      type: "internal-links",
      title: "继续规划",
      items: [
        {
          label: "比较国庆假期与十月中下旬",
          href: "/zh/guides/china-in-october-golden-week-or-later/",
          description: "十月文章负责该月内的日期选择、路线结构和天气差异。",
        },
        {
          label: "第一次乘坐中国高铁",
          href: "/zh/guides/china-high-speed-train-first-time-guide/",
          description: "确认假期敏感的铁路段后，再了解护照、车票和车站流程。",
        },
        {
          label: "检查中国行程是否太赶",
          href: "/zh/guides/is-your-china-itinerary-too-rushed/",
          description: "减少相互依赖的换城环节，让假期变化更容易被吸收。",
        },
        {
          label: "国际航班前最后一晚住在哪里",
          href: "/zh/guides/china-last-night-before-international-flight/",
          description: "不要让当天的长途国内接驳威胁国际离境。",
        },
        { label: "分清节气、法定节假日与出行高峰", href: "/zh/guides/china-24-solar-terms-weather-food-daily-life/", description: "把节气当作文化与季节语境；法定休假、调休工作日和客流压力要查当年官方日历。" },
        { label: "了解中国旅行费用由什么决定", href: "/zh/guides/how-much-does-a-china-trip-cost/", description: "比较位置、灵活性和预订条款，而不是套用全国统一假期涨幅。" },
        { label: "沿绿道读懂成都", href: "/zh/guides/chengdu-greenway-city-ring/", description: "选择一段长度合适的成都环城绿道，连接公共交通与社区，并提前安排途中退出点。" },
        { label: "用四套时间表规划春节", href: "/zh/guides/lunar-new-year-customs-for-visitors/", description: "预订前分开农历日期、法定休假、交通需求以及每个家庭或场所自己的安排。" },
        { label: "自助参观莫高窟", href: "/zh/guides/mogao-caves-independent-visit-workflow/", description: "使用外籍护照官方入口，分清正常与应急参观，到对的起点报到，并为天气停开保留调整空间。" },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "已核对的官方来源",
      items: [
        {label: "2025 年国庆假期首日，故宫 10 月 2 日至 7 日门票已约满", url: "https://www.yicai.com/news/102851899.html", publisher: "第一财经", reviewedAt: "2026-10-19"},
        {label: "武陵源区就 2025 年 5 月 2 日电梯、索道、环保车排队较长发布说明", url: "https://m.gmw.cn/2025-05/04/content_1304029265.htm", publisher: "光明网，转武陵源区融媒体中心", reviewedAt: "2026-10-19"},
        {label: "2025 年五一张家界亲历：百龙天梯、天子山索道和环保车排队时间", url: "https://www.36kr.com/p/3280487039377538", publisher: "36Kr", reviewedAt: "2026-10-19"},
        {label: "玉龙雪山：2025 年 2 月 2 日排队约四小时坐缆车下山，2 月 4 日限流", url: "https://www.peopleapp.com/column/30048174845-500006077194", publisher: "封面新闻，人民日报网站", reviewedAt: "2026-10-19"},
        {label: "成都大熊猫基地：早上 7:40 排队已排出 500 米（2024 年 2 月 2 日报道）", url: "https://www.chinanews.com.cn/sh/2024/02-02/10157284.shtml", publisher: "中国青年报，中新网转载", reviewedAt: "2026-10-19"},
        { label: "2026年部分节假日安排", url: "https://www.gov.cn/zhengce/zhengceku/202511/content_7047091.htm", publisher: "国务院办公厅", reviewedAt: "2026-08-11" },
        { label: "2026年全国春运电视电话会议", url: "https://www.ndrc.gov.cn/fzggw/wld/lichunlin/zyhd/202601/t20260121_1403377.html", publisher: "国家发展改革委", reviewedAt: "2026-08-31" },
        { label: "2026年清明假期交通回顾", url: "https://www.mot.gov.cn/xinwen/jiaotongyaowen/202604/t20260407_4203180.html", publisher: "交通运输部", reviewedAt: "2026-08-11" },
        { label: "2026年劳动节交通新闻发布会", url: "https://www.mot.gov.cn/xinwen/xinwenfabuhui/202604/t20260424_4204258.html", publisher: "交通运输部", reviewedAt: "2026-08-11" },
        { label: "现行铁路售票规则", url: "https://kyfw.12306.cn/otn/gonggao/saleTicketMeans.html?linktypeid=means2", publisher: "中国铁路12306", reviewedAt: "2026-08-11" },
        { label: "故宫博物院2026年春节开放公告", url: "https://www.dpm.org.cn/announce_detail/378505.html", publisher: "故宫博物院", reviewedAt: "2026-08-11" },
        { label: "故宫博物院2026年劳动节开放公告", url: "https://www.dpm.org.cn/announce_detail/378865.html", publisher: "故宫博物院", reviewedAt: "2026-08-11" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
