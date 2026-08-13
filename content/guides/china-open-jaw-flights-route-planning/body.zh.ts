import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "所谓开口程，是从中国的一座城市入境、从另一座城市离境，中间一段由旅客自己完成。对于一路向前的中国行程，它往往比同城往返更顺；但真正的判断顺序应该是：先核对入境资格，再看具体机场、票规，以及它究竟省掉了多少回头路成本。",
    },
    {
      id: "quick-answer",
      type: "heading",
      level: 2,
      text: "先说结论",
    },
    {
      id: "quick-answer-text",
      type: "paragraph",
      text: "如果你想去的地方大致连成一条线，回到第一座城市会多出一段长距离转场，甚至要为国际航班提前住一晚，就应该先查开口程。反过来，如果同城往返有明显更好的直飞和时刻、票规更稳，或节省的金额高于完整的回头路成本，同城往返仍可能更合适。这里说的“完整成本”不只是一张高铁票或国内机票。",
    },
    {
      id: "decision-rule",
      type: "callout",
      title: "判断公式",
      body: "只有当开口程增加的国际机票成本，低于它省掉的返程交通、接驳、可能增加的酒店、可用时间和中断风险时，才选开口程。入境资格是必须先通过的门槛，不能折算成价格。",
      tone: "decision",
    },
    {
      id: "what-to-compare",
      type: "heading",
      level: 2,
      text: "第一步：比较三种真正不同的订法",
    },
    {
      id: "booking-types",
      type: "table",
      caption: "搜索页面看起来相近，责任和风险却不同",
      columns: ["订票结构", "包含什么", "需要核对什么"],
      rows: [
        ["通过“多城市”搜索开口程", "家乡飞中国 A 城，再从中国 B 城飞回家；A 到 B 的地面段自行安排", "是否按同一张票或同一订单出票，以及改签、退票、行李和衔接规则"],
        ["两张独立国际单程票", "一张飞入 A，另一张从 B 飞出", "总价和行李之外，还要接受两张无关机票通常不会互相保护，且各自票规不同"],
        ["同城往返", "家乡往返 A 城，旅程结束时再从最后一站回到 A", "国内返程、两端接驳、安全缓冲、可能多住的一晚，以及被占用的可用时间"],
      ],
    },
    {
      id: "open-jaw-term",
      type: "paragraph",
      text: "中文常把这种结构称为开口程或缺口程，航空公司网站通常把入口放在“多城市”搜索里。IATA 也把 open jaw 视为正式的票价结构，但搜索按钮的名称并不能证明两份报价具有相同的出票主体和保障。付款前仍要看完整行程和票价条件。",
    },
    {
      id: "entry-gate",
      type: "heading",
      level: 2,
      text: "门槛一：你的入境依据允许这条路线吗？",
    },
    {
      id: "entry-general",
      type: "paragraph",
      text: "中国出境入境管理法要求旅客经对外国人开放的口岸出入境并接受边防检查；这部一般法律本身并没有规定普通访客必须从入境机场原路离境。但这不代表可以忽略某一种签证、免签政策或口岸签发证件的具体条件。真正决定路线能否成立的，始终是你本人使用的入境依据。",
    },
    {
      id: "entry-checks",
      type: "list",
      items: [
        "普通签证或覆盖范围较广的免签入境：核对有效期、入境次数、停留期限，以及证件批注或官方政策中的区域限制。",
        "240 小时过境免签：它是过境政策，不是普通往返旅行的替代品。官方条件包括符合资格的旅客、适用口岸、已确认的前往第三国（地区）安排，以及在允许区域内活动。",
        "口岸签证或特殊区域许可：文件可能限定入境口岸、停留区域或离境口岸；口岸签证持有人通常需要从签发机关所在地口岸入境。",
        "任何不确定情况：购买不可退机票前，向国家移民管理局或有管辖权的中国驻外使领馆确认。",
      ],
    },
    {
      id: "transit-warning",
      type: "callout",
      title: "常见的过境误区",
      body: "“本国 → 中国 → 本国”不符合 240 小时过境免签所要求的第三国（地区）逻辑。把中国境内的入境城市和离境城市改成不同地点，也不能修复这个问题。香港、澳门在过境路线中可按不同地区理解，但适用口岸、联程安排和允许停留区域仍要逐项核对。",
      tone: "warning",
    },
    {
      id: "route-shape",
      type: "heading",
      level: 2,
      text: "门槛二：路线真的接近一条直线吗？",
    },
    {
      id: "route-shape-comparison",
      type: "comparison",
      title: "开口程最适合线性路线，但不是多城市旅行的默认答案",
      columns: [
        {
          heading: "明显偏向开口程",
          items: [
            "旅程大体朝同一个方向推进。",
            "最后一站本身就是国际门户，或很容易到达一座国际门户。",
            "回到起点会重复一段很长的路。",
            "为了回到起点，原本还要多一次转场或多住一晚。",
          ],
        },
        {
          heading: "同城往返可能更强",
          items: [
            "路线本来就会绕回起始门户附近。",
            "只有一座门户对你的出发地有合理的直飞或低风险时刻。",
            "第二座门户会制造脆弱的自行转机或跨机场衔接。",
            "算完所有回头路成本后，开口程仍明显更贵。",
          ],
        },
      ],
    },
    {
      id: "route-shape-text",
      type: "paragraph",
      text: "先不要排每日行程，只画节点和箭头：入境门户 → 想去的区域 → 离境门户。如果最后一根箭头只是因为国际机票而横跨整条路线返回起点，就应该查开口程；如果地理上本来就会回到起点附近，同城往返并不等于浪费。",
    },
    {
      id: "true-cost",
      type: "heading",
      level: 2,
      text: "门槛三：把回头路的真实成本算全",
    },
    {
      id: "true-cost-intro",
      type: "paragraph",
      text: "一张便宜的高铁票或国内机票，仍可能消耗昂贵的一天。请用相同日期、乘客构成、舱等和行李额度做实时比价。铁路班次以 12306 当前查询为准，航班和航站楼以实际承运人与机场信息为准，不要拿旧攻略里的时刻表当固定事实。",
    },
    {
      id: "cost-table",
      type: "table",
      caption: "两边都要纳入的成本和限制",
      columns: ["成本或限制", "开口程", "同城往返"],
      rows: [
        ["国际航班", "含税和行李的多城市总价", "相同日期与票规下的往返总价"],
        ["国内回程", "通常被省掉", "从最后一站回到原国际门户的高铁或航班"],
        ["市内接驳", "最后一座城市到离境机场", "末站接驳、国内抵达后的接驳，再加一次去国际机场的接驳"],
        ["酒店", "只有离境时刻需要时才增加", "如果当天返回再接国际航班过于脆弱，需增加最后一晚酒店"],
        ["可用时间", "抵达第二座离境门户所需时间", "门到门回程、值机、等待、行李和恢复时间"],
        ["风险", "第二座门户的时刻可靠性与票规", "国内段延误影响另一张国际机票的风险"],
      ],
    },
    {
      id: "time-value",
      type: "callout",
      title: "不要套用统一的“每小时价值”",
      body: "先把回头路标成四分之一天、半天或一整天的可用时间，再由同行人决定这段损失值多少。带着多件行李的家庭，与节奏宽松的独自旅行者，对同一次转场会有完全不同的评价。",
      tone: "neutral",
    },
    {
      id: "airport-codes",
      type: "heading",
      level: 2,
      text: "门槛四：比较具体机场，不只比较城市名",
    },
    {
      id: "airport-codes-text",
      type: "paragraph",
      text: "中国一些门户城市有不止一座机场：北京可能显示 PEK 或 PKX，上海可能是 PVG 或 SHA，成都可能是 CTU 或 TFU。最低票价有时对应更难到达的机场、更差的出发时刻，甚至需要跨机场转移。上海机场自己的旅客信息也把浦东与虹桥作为两座不同机场，并提供地面连接信息。付款前必须逐段读清机场代码和航站楼。",
    },
    {
      id: "airport-code-checks",
      type: "list",
      items: [
        "搜索机票上显示的具体机场代码，不要只搜城市名。",
        "按实际出发时段估算酒店到航站楼的时间，并加入值机截止时间。",
        "若行程涉及跨机场，除非航空公司针对该行程明确确认，否则按需要提取并重新托运行李准备。",
        "两张独立机票之间的自行转机，除非书面票规另有说明，否则默认由旅客自己承担风险。",
      ],
    },
    {
      id: "city-order",
      type: "heading",
      level: 2,
      text: "用航班决定方向，而不是相信“某城必须先去”",
    },
    {
      id: "city-order-text",
      type: "paragraph",
      text: "没有哪一座中国城市天然应该永远放在开头或结尾。两个方向都要测试。地理上很顺的路线，也可能因为深夜落地后紧接固定早班活动，或最后一座门户只能用紧张的自行转机衔接长途航班，而变得不可靠。",
    },
    {
      id: "direction-table",
      type: "table",
      caption: "一座门户适合放在开头或结尾的条件",
      columns: ["适合放在开头", "适合放在结尾"],
      rows: [
        ["落地时刻可承受，前往第一晚酒店的接驳简单", "最后一晚酒店到具体离境机场的路径稳定"],
        ["为入境、取行李和时差保留宽松的第一天", "独立定位航班或高铁之前有足够缓冲"],
        ["晚到之后不会马上接不可替代的固定预约", "长途航班时刻和票规适合全体同行人"],
        ["离开第一个区域时有顺手的下一段交通", "不会为了最低显示价而平白增加一次跨机场"],
      ],
    },
    {
      id: "traveller-limits",
      type: "heading",
      level: 2,
      text: "同行人的限制可能让答案反转",
    },
    {
      id: "traveller-comparison",
      type: "comparison",
      columns: [
        {
          heading: "开口程通常能减负",
          items: [
            "老人或家庭不必拖着行李重复一段长距离转场。",
            "更短的最后一个旅行日，为回程航班留出恢复余量。",
            "减少重复里程，更容易保护慢节奏。",
          ],
        },
        {
          heading: "开口程也可能增加摩擦",
          items: [
            "第二座机场的接驳更困难，无障碍服务也更弱。",
            "两张单程票让同一团队面对不同的行李和改签条件。",
            "轮椅、婴儿、大团或特殊服务需求，往往在同一承运人和同一订单下更容易管理。",
          ],
        },
      ],
    },
    {
      id: "quote-method",
      type: "heading",
      level: 2,
      text: "做一次干净的报价比较",
    },
    {
      id: "quote-steps",
      type: "list",
      ordered: true,
      items: [
        "先固定国际旅行日期、乘客年龄、舱等和托运行李需求。",
        "查一组同城往返，保存具体航班时刻和票规。",
        "通过“多城市”搜索分别查两个开口方向：A 进 B 出，再查 B 进 A 出。",
        "如有必要，再分别查询两张单程票；但要把它标成独立机票风险，不能当成完全等价的产品。",
        "把回到起点的全部交通、接驳、酒店和安全缓冲加入同城往返一侧。",
        "先剔除不符合入境规则或同行人限制的选项，再比较剩余总成本。",
      ],
    },
    {
      id: "before-paying",
      type: "heading",
      level: 2,
      text: "付款前回答这八个问题",
    },
    {
      id: "paying-checklist",
      type: "list",
      items: [
        "每位旅客具体使用哪一种签证或免签依据？",
        "路线是否满足所有适用的口岸、第三国（地区）和允许活动区域条件？",
        "入境和离境机场代码是不是你真正想订的机场？",
        "路线是一条线、一个环，还是被国际机票强行折回的线？",
        "回头路从门到门要多少钱，并需要多少安全缓冲？",
        "行李、选座、改签和退票条件是否真正可比？",
        "谁要照顾行李、需要行动辅助、带儿童，或承受不了自行转机失败？",
        "把方向反过来，是否能得到更轻松的抵达日或更稳的离境日？",
      ],
    },
    {
      id: "human-help",
      type: "heading",
      level: 2,
      text: "如果两边总成本很接近",
    },
    {
      id: "human-help-text",
      type: "paragraph",
      text: "留下旅行日期、人数、正在考虑的城市，以及大致总预算。Homeground 的人工旅行规划师可以帮你比较真正可行的路线结构，而不是假设一种机场组合适合所有中国旅行。",
    },
    {
      id: "related-guides",
      type: "internal-links",
      title: "继续规划",
      items: [
        {
          label: "检查你的中国行程是不是太赶",
          href: "/zh/guides/is-your-china-itinerary-too-rushed/",
          description: "增加下一站之前，先检查转场负担和真正可用的时间。",
        },
        {
          label: "估算一次中国旅行的完整预算",
          href: "/zh/guides/how-much-does-a-china-trip-cost/",
          description: "把交通选择放回整趟旅行的总预算里判断。",
        },
        {
          label: "检查 240 小时过境免签路线是否合格",
          href: "/zh/guides/china-240-hour-visa-free-transit-route-check/",
          description: "把第三国（地区）、适用口岸和允许区域条件，与路线是否方便分开判断。",
        },
        { label: "安排好抵达第一天", href: "/zh/guides/china-arrival-day-booked-anchor-or-flexible-block/", description: "从入境、行李、进城、酒店衔接和迟到规则判断，抵达日能否稳妥安排有入场时段的预约。" },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "核查来源",
      items: [
        {
          label: "《中华人民共和国出境入境管理法》英文版",
          url: "https://en.nia.gov.cn/n147418/n147458/c155978/content.html",
          publisher: "国家移民管理局",
          reviewedAt: "2026-08-11",
        },
        {
          label: "240 小时过境免签适用条件和口岸",
          url: "https://en.nia.gov.cn/n147418/n147468/c187308/content.html",
          publisher: "国家移民管理局",
          reviewedAt: "2026-08-11",
        },
        {
          label: "口岸签证申请与签发规则",
          url: "https://en.nia.gov.cn/n147423/n147478/n147715/c158232/content.html",
          publisher: "国家移民管理局",
          reviewedAt: "2026-08-11",
        },
        {
          label: "普通票价开口程业务定义",
          url: "https://airtechzone.iata.org/aidm_model/21.3/EARoot/EA4/EA1/EA2/EA6310.htm",
          publisher: "国际航空运输协会",
          reviewedAt: "2026-08-11",
        },
        {
          label: "NDC@Scale 多城市与开口程搜索能力说明",
          url: "https://www.iata.org/contentassets/a00d606cc0614ffb81f3ddf5c547cb2e/ndcscale-capabilities-definitions.pdf",
          publisher: "国际航空运输协会",
          reviewedAt: "2026-08-11",
        },
        {
          label: "中国国际航空多城市订票搜索",
          url: "https://m.airchina.com.cn/ac/c/invoke/qryFlights%40pg?transfer=flight%7CPEK%7C%7C1%7C0%7C0%7CEconomy%7C",
          publisher: "中国国际航空",
          reviewedAt: "2026-08-11",
        },
        {
          label: "中国铁路 12306 官方路线查询",
          url: "https://www.12306.cn/en/left-ticket.html?linktypeid=dc",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-08-11",
        },
        {
          label: "浦东与虹桥机场旅客信息",
          url: "https://www.shairport.com/enpd/",
          publisher: "上海机场（集团）有限公司",
          reviewedAt: "2026-08-11",
        },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
