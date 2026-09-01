import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "只有三座城市都保留了不可替代的重点，才走成都 → 重庆 → 张家界，或完全反过来。重庆在地理上适合作为中段停留，但不是必去：如果你在重庆没有自己的游览重点，就按日期比较成都与张家界之间的贯通走法或中转方案，取消重庆住宿。先算有效游览日，再分夜数。",
    },
    {
      id: "direction-comparison",
      type: "comparison",
      title: "两种连贯方向，以及一种代价较高的走法",
      columns: [
        {
          heading: "成都 → 重庆 → 张家界",
          body: "适合从成都进入行程，并在张家界之后继续向东或向南。整条链持续向前，不必再返回西边。",
        },
        {
          heading: "张家界 → 重庆 → 成都",
          body: "如果抵达张家界一侧更顺，而国际离境或下一程更适合从成都出发，反向同样成立。",
        },
        {
          heading: "从重庆开始，再去两端",
          body: "通常会重复一部分走廊。只有重庆本身就是真实门户，或固定预约足以抵消额外移动和离境缓冲时才选。",
        },
      ],
    },
    {
      id: "scope-boundary",
      type: "callout",
      tone: "neutral",
      title: "先决定什么",
      body: "先判断三城是否都去、旅行方向、受保护的游览日、夜数重点和该删哪一城。路线决定后，再用下方对应的走廊与车站指南，核对准确车站、车次时刻、票价、购票和走错站恢复。",
    },
    {
      id: "city-test-heading",
      type: "heading",
      level: 2,
      text: "让每一城证明自己值得一次换酒店",
    },
    {
      id: "city-test-table",
      type: "table",
      caption: "城市名本身不是增加住宿点的理由",
      columns: ["城市", "什么情况下保留", "什么情况下删除或缩短"],
      rows: [
        [
          "成都",
          "它是真实进出门户，或有重庆、张家界无法替代的受保护重点。",
          "它造成向西绕行，而旅客没有任何成都专属重点。",
        ],
        [
          "重庆",
          "旅客确实需要一个受保护的城市游览区块，或有意把它作为两端之间的过夜停顿。",
          "它只是一个转场标签；可以贯通或中转时，不要把晚到包装成游览重庆。",
        ],
        [
          "张家界",
          "全程能给户外重点留出完整游览日，并在抵达后保留合理恢复空间。",
          "只剩一个仓促的抵达区块，或为了压缩的一天山景牺牲整趟中国行。",
        ],
      ],
    },
    {
      id: "time-language-heading",
      type: "heading",
      level: 2,
      text: "把住宿夜数、日历天数和有效游览日分开",
    },
    {
      id: "time-language",
      type: "paragraph",
      text: "9 晚等于 10 个日历日，却不等于 10 个游览日。国际抵达、国际离境和两次换酒店的跨城移动，都先从 0 个有效半天开始。只有退房、行李、完整跨城移动、抵达和去酒店之后仍留下稳定的本地区块，转场日才得到 1 个半天。",
    },
    {
      id: "usable-day-ledger",
      type: "table",
      caption: "分配景点之前的保守记账",
      columns: ["日历区块", "基线", "升级前必须满足什么"],
      rows: [
        [
          "国际抵达",
          "0 个有效半天",
          "完成入境、取行李和去酒店后，仍能安排附近且可替换的活动。",
        ],
        [
          "成都—重庆移动",
          "0 个有效半天",
          "这段交通按日期完成门到门核验后，仍留下一个连续的上午或下午。",
        ],
        [
          "重庆—张家界移动",
          "0 个有效半天",
          "按日期核验的交通和已预订的张家界住宿基地，在抵达后仍留下稳定区块。",
        ],
        [
          "同一住宿点的完整一天",
          "2 个有效半天",
          "没有换酒店、跨城截止点或离境缓冲切开这一天。",
        ],
        [
          "国际离境",
          "0 个有效半天",
          "只有真正较晚的离境，在全部余量后才可能留下一个受保护区块。",
        ],
      ],
    },
    {
      id: "allocation-workflow",
      type: "list",
      ordered: true,
      items: [
        "先固定真实的抵达与离境门户，再决定方向。",
        "为每座城市写下一至两个不可替代的重点；删掉在别处也能完成的泛泛愿望。",
        "先把抵达、离境和两次跨城移动按 0 放进账本，再分住宿夜数。",
        "先保护固定或受天气影响的完整游览日；只有该段交通按日期完成门到门核验后，才给转场日加半天。",
        "儿童、慢行者、大件行李、时差、户外天气和连续早起都要加入恢复空间。",
        "账本为负时，删一城或加夜数；不要把缺少的时间藏进转场日。",
      ],
    },
    {
      id: "night-range-heading",
      type: "heading",
      level: 2,
      text: "把夜数区间当预警，不要当套餐承诺",
    },
    {
      id: "night-range-comparison",
      type: "comparison",
      title: "现有夜数通常意味着什么",
      columns: [
        {
          heading: "5–6 晚",
          items: [
            "通常应做两城选择，而不是平均走三城。",
            "只有重点特别少，而且按日期核验后转场真的能挣到半天，才勉强保留三城。",
            "只在重庆睡一晚却没有游览区块，不算看过重庆。",
          ],
        },
        {
          heading: "7–9 晚",
          items: [
            "不同城市进出时，三城有机会成立。",
            "每一城仍必须有不同且受保护的保留理由。",
            "亲子或慢节奏旅客可能仍需删一站，或增加恢复。",
          ],
        },
        {
          heading: "10 晚以上",
          items: [
            "完整游览日和中断恢复空间更充足。",
            "更多夜数不能修复错误门户或重复重点。",
            "仍按受保护重点分配，不自动平均切三份。",
          ],
        },
      ],
    },
    {
      id: "worked-examples-heading",
      type: "heading",
      level: 2,
      text: "两个例子说明为什么行程名称会骗人",
    },
    {
      id: "worked-example-open-jaw",
      type: "callout",
      tone: "neutral",
      title: "例 1：两人、9 晚、异地进出",
      body: "两人从成都进入行程，在张家界之后继续下一程。10 个日历日扣除抵达、离境和两次转场区块，保守基线剩 6 个完整游览日当量。三城有可能成立，但这 6 天必须覆盖真实重点，而且两段交通都要按日期通过门到门核验。",
    },
    {
      id: "worked-example-round-trip",
      type: "callout",
      tone: "warning",
      title: "例 2：亲子、7 晚、成都往返",
      body: "8 个日历日包含抵达、离境、两次向前移动和返回成都。五个区块都先记 0，在挣到任何半天之前只剩 3 个完整游览日当量。儿童、户外天气和最后航班缓冲会让三城承诺很脆弱；删重庆或张家界，比向转场日借时间更诚实。",
    },
    {
      id: "chongqing-choice-heading",
      type: "heading",
      level: 2,
      text: "先决定重庆是要游览的一城，还是路线的一部分",
    },
    {
      id: "chongqing-choice",
      type: "comparison",
      title: "在重庆停留，还是直接衔接两端",
      columns: [
        {
          heading: "保留重庆住宿",
          items: [
            "至少一个重庆重点值得受保护的游览区块。",
            "这一晚能降低路线压力，而不是制造深夜打卡清单。",
            "进出门户仍让整条路线持续向前。",
          ],
        },
        {
          heading: "取消重庆住宿",
          items: [
            "重庆除了换乘或经过，没有自己的重点。",
            "路线决定后，可以按日期核验贯通走法或中转方案。",
            "省下的一晚放在成都、张家界或最后航班缓冲更有价值。",
          ],
        },
      ],
    },
    {
      id: "no-direct-page",
      type: "callout",
      tone: "decision",
      title: "重庆没有自己的游览重点时，就把它当作中转",
      body: "如果重庆没有受保护的游览重点，就在12306按日期比较成都—张家界的贯通走法或中转方案，需要时只在重庆完成衔接；只有重庆值得真实游览，或住宿能让全程更稳时，才保留重庆一晚。",
    },
    {
      id: "switch-heading",
      type: "heading",
      level: 2,
      text: "哪些条件会改变路线顺序",
    },
    {
      id: "switch-table",
      type: "table",
      caption: "真实依赖变化时才改计划",
      columns: ["条件", "路线调整", "不要怎么做"],
      rows: [
        [
          "张家界一侧或更东方向的门户更好",
          "把链条反过来；如果离境票支持，就在成都结束。",
          "只因最先看到的方案从成都开始，就坚持原方向。",
        ],
        [
          "重庆失去受保护重点",
          "取消重庆住宿，按日期比较成都与张家界之间的贯通走法或中转方案。",
          "只为让行程仍写着三座城市，就保留一晚酒店。",
        ],
        [
          "张家界天气或户外余量太弱",
          "增加一个受保护日，或把张家界移出本次旅行。",
          "把抵达下午当成完整户外日的替代。",
        ],
        [
          "国际机票同城往返",
          "把返程段和余量真正计价、排时；账本失败就删一城。",
          "把返程藏进最后一个游览日。",
        ],
        [
          "体力或行动能力低于预期",
          "保留已订酒店，减少重点并保留恢复。",
          "用连续早起补偿时间。",
        ],
      ],
    },
    {
      id: "booking-order-heading",
      type: "heading",
      level: 2,
      text: "按顺序完成每一项路线核验",
    },
    {
      id: "booking-order",
      type: "list",
      ordered: true,
      items: [
        "先决定走两城还是三城，并固定国际进出门户。",
        "分配受保护游览日和恢复空间，再承诺住宿夜数。",
        "成都—重庆一段，核对准确日期车站和完整酒店到酒店链条。",
        "重庆—张家界一段，核对该走廊以及抵达已预订张家界住宿基地的衔接。",
        "购买前和临近出行时，都要在 12306 与相关运营方重新核验日期信息。",
      ],
    },
    {
      id: "dynamic-boundary",
      type: "callout",
      tone: "warning",
      title: "不要从旧方案照抄运营细节",
      body: "车次结构、车站、库存和旅行条件都会变化。不要把车次、时刻、票价或通用车站组合固定在计划里。先决定城市和受保护游览日，再按准确日期核验每段走廊。",
    },
    {
      id: "editorial-judgment",
      type: "callout",
      tone: "neutral",
      title: "为什么这套规划基线从保守开始",
      body: "夜数区间和转场从 0 开始的半天账本，是保守规划规则，不是铁路承诺或通用套餐。它们的作用，是在预订让路线难以修改之前，找出没有挣到足够时间的那一城。",
    },
    {
      id: "help-cta",
      type: "callout",
      tone: "decision",
      title: "想在预订前找出最弱的一城？",
      body: "提供日期、人数、节奏、抵达与离境门户，以及每城一个不能放弃的重点。Homeground 可以在走廊细节锁定前，测试哪一城该缩短或删除。",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "继续完成下一步规划",
      items: [
        {
          label: "成都目的地总览",
          href: "/zh/destinations/chengdu/",
          description: "决定成都的角色、受保护重点和下一方向。",
        },
        {
          label: "重庆目的地总览",
          href: "/zh/destinations/chongqing/",
          description: "判断重庆是否值得停留，而不是只写成转场标签。",
        },
        {
          label: "张家界目的地总览",
          href: "/zh/destinations/zhangjiajie/",
          description: "在固定路线前，先确定户外重点和真实所需时间。",
        },
        {
          label: "选择成都—重庆车站组合",
          href: "/zh/guides/chengdu-chongqing-station-pair/",
          description:
            "顺序确定后，再核验出行日票面显示的两个站名和两端酒店接驳。",
        },
        {
          label: "规划重庆—张家界交通段",
          href: "/zh/guides/chongqing-zhangjiajie-transport-route/",
          description: "检查第二段铁路，以及抵达后到已选酒店的接驳。",
        },
        {
          label: "选择张家界市区或武陵源住宿",
          href: "/zh/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          description: "让游览顺序决定交通最终接到哪个住宿基地。",
        },
        {
          label: "检查行程是否太赶",
          href: "/zh/guides/is-your-china-itinerary-too-rushed/",
          description: "用转场、固定参观和恢复时间审核整段旅行。",
        },
        {
          label: "浏览中国旅行规划指南",
          href: "/zh/plan/",
          description: "回到旅行规划总览，继续下一项决定。",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "已核验的官方来源",
      items: [
        {
          label: "中国铁路车票与车站查询",
          url: "https://www.12306.cn/en/index.html",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-09-01",
        },
        {
          label: "2026 年 1 月 26 日起重庆铁路运行图调整",
          url: "https://www.cq.gov.cn/ywdt/jrcq/202601/t20260122_15343341.html",
          publisher: "重庆市人民政府",
          reviewedAt: "2026-09-01",
        },
        {
          label: "2026 年 7 月 11 日至 8 月 14 日部分临时列车公告",
          url: "https://kyfw.12306.cn/mormhweb/zxdt_news/202607/t20260710_46062.html",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-09-01",
        },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
