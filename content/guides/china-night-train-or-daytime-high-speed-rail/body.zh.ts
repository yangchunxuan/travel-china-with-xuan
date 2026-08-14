import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "一趟夜间卧铺，理论上可以同时替代白天转场和一晚酒店；它也可能让你几乎没睡、没洗漱，清晨六点拖着行李等几个小时才能进下一间客房。真正要比较的不是“两张火车票”，而是从前一晚到第二天早上的完整成本与可用时间。",
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
      text: "只有在出行日期确实有合适铺位、车程覆盖正常睡眠时段、到站后能顺利衔接酒店或活动，而且同行人能承受共享车厢的一晚时，夜间卧铺才更值得。若所谓夜车只有座位、到站时间尴尬、需要明显绕路，或它的“省钱”建立在睡眠和恢复不值钱的假设上，就选白天高铁加酒店。",
    },
    {
      id: "decision-rule",
      type: "callout",
      title: "判断原则",
      body: "夜间卧铺必须同时保护预算和第二天，才算真正胜出。如果它省下一晚房费，却让第二天大部分时间消耗在疲劳、等待或恢复上，它只是把成本挪了位置，并没有消灭成本。",
      tone: "decision",
    },
    {
      id: "verify-product",
      type: "heading",
      level: 2,
      text: "门槛一：先确认这趟车到底卖什么",
    },
    {
      id: "product-table",
      type: "table",
      caption: "三种不同产品，经常都被笼统叫作“夜车”",
      columns: ["产品", "你实际购买的是什么", "对规划的影响"],
      rows: [
        ["普速夜间卧铺", "较慢普速列车上的铺位，隐私和布局取决于席别与实际车体", "可能形成合适的睡眠窗口，但要比较具体车站和总时长"],
        ["高铁动卧", "在该车次、该日期确实出售卧铺库存时，购买夜间动车组铺位", "速度较快不等于到处都有；必须在 12306 核对具体车次"],
        ["深夜或通宵座席", "一趟恰好在夜间运行的列车座位", "对多数旅客来说不能替代酒店，即使车次以 D 或 G 开头"],
      ],
    },
    {
      id: "product-reality",
      type: "paragraph",
      text: "中国铁路订票界面会把硬卧、软卧、动卧等铺位与各种座席分开显示，官方列车布局页也说明不同卧铺动车组的结构并不相同。博客、视频或旧时刻表提到的列车，可能只在部分日期开行，也可能更换车体，或在你需要的日期只卖座位。先用官方 12306 查询准确出发站、到达站和日期，再决定是否围绕它设计路线。",
    },
    {
      id: "schedule-checks",
      type: "list",
      items: [
        "使用准确车站名，不要只输入城市名；普速卧铺和白天高铁可能使用不同车站。",
        "确认库存明确写着卧铺或铺位，而不是二等座、硬座或无座。",
        "零点以后的车次要看清日期。00:30 发车属于新的日历日期，即使你在前一天晚上离开酒店。",
        "付款前再次核对车次和铺位类型；如果时刻变化，还要重新确认。",
      ],
    },
    {
      id: "not-every-night-train",
      type: "callout",
      title: "夜间运行不代表一定有床",
      body: "客流高峰期间，铁路可能临时增加深夜高铁。这些列车可能全部是座席。不要从发车时间或 D/G 字头推断它是卧铺；订单里真正显示的席位或铺位类型才算数。",
      tone: "warning",
    },
    {
      id: "true-cost",
      type: "heading",
      level: 2,
      text: "门槛二：计算完整的一晚，而不是少付的一张房费",
    },
    {
      id: "true-cost-intro",
      type: "paragraph",
      text: "请在相同日期、相同人数下查询两种方案，再加入它们不同时间轴制造的成本。卧铺可能省掉房间，却增加行李寄存、付费休息空间、提前入住、额外餐食，或地铁停运后的出租车；白天高铁需要一晚酒店，却能保住睡眠和更可预测的早晨。",
    },
    {
      id: "cost-ledger",
      type: "table",
      caption: "夜间卧铺与白天高铁的完整成本表",
      columns: ["成本或价值", "夜间卧铺", "白天高铁＋酒店"],
      rows: [
        ["火车票", "每位旅客真正需要的铺位票价", "每位旅客实际可选的座席票价"],
        ["酒店", "只减去确实不再需要的那一晚", "出发地或到达地的一晚房费"],
        ["车站接驳", "按夜间出发与清晨到达的实际时段计算", "通常在公共交通正常运行时段接驳"],
        ["行李", "上车前或清晨到站后、酒店无法接收时的寄存成本", "一般使用酒店寄存或已经进入客房"],
        ["餐食和洗漱", "晚餐、早餐，以及洗漱换衣所需的付费空间", "正常使用酒店的夜间与早晨设施"],
        ["可用时间", "只有真正睡着、到站后能行动，才算保住白天", "白天用于转场，但第二天通常更有精神"],
        ["恢复风险", "若睡眠失败，需要放慢第二天的代价", "通常较低，但白天转场仍会占用计划时段"],
      ],
    },
    {
      id: "hotel-saving-trap",
      type: "callout",
      title: "“省一晚酒店”的陷阱",
      body: "酒店提供的不只是一张床，还包括独立洗手间、可控灯光、安全放置行李、稳定叫醒，以及等到早晨的室内空间。确认夜车和到站方案仍能解决哪些功能后，才能把整晚房费从成本中扣除。",
      tone: "neutral",
    },
    {
      id: "sleep-gate",
      type: "heading",
      level: 2,
      text: "门槛三：同行人真的睡得着吗？",
    },
    {
      id: "sleep-comparison",
      type: "comparison",
      title: "同一个铺位，对一位旅客很高效，对另一位可能很昂贵",
      columns: [
        {
          heading: "更可能适合卧铺",
          items: [
            "你通常能在晃动、微光和有人同行的环境里入睡。",
            "车程覆盖大部分正常睡眠时间，而不是只占半夜的一段。",
            "到站后没有马上开始、无法替代的高强度预约。",
            "行李足够精简，能在铺位附近和车站接驳时轻松处理。",
          ],
        },
        {
          heading: "白天高铁更能保护节奏",
          items: [
            "你睡眠很浅，或需要稳定的隐私、温度和洗手间条件。",
            "上车或到站时间会打断睡眠最深的时段。",
            "一晚没睡好会毁掉全程最重要的一天。",
            "有人无法安全爬铺、搬行李或使用分配到的铺位。",
          ],
        },
      ],
    },
    {
      id: "berth-labels",
      type: "heading",
      level: 2,
      text: "不要只根据“硬卧”和“软卧”两个词决定",
    },
    {
      id: "berth-table",
      type: "table",
      caption: "看到不同库存名称时应该继续核对什么",
      columns: ["库存名称", "常见取舍", "付款前核对"],
      rows: [
        ["硬卧", "通常是价格最低的真正铺位，隐私也最少", "开放或封闭布局、上中下铺、行李空间和实际车体"],
        ["软卧", "通常每个隔间铺位更少、隐私更高，票价也更高", "是否有门、隔间布局、铺位分配、设施，以及溢价是否仍低于酒店方案"],
        ["动卧或高铁卧铺", "专为夜间运行设计的动车组铺位，不同车体布局会变化", "准确车次、可查到的官方布局、铺位方向、开行日期与当前库存"],
        ["座席或无座", "票价可能较低，但没有真正睡眠平面", "把它当夜间交通，不要当成与卧铺或酒店等价的产品"],
      ],
    },
    {
      id: "facilities-warning",
      type: "paragraph",
      text: "不要预设列车一定有淋浴、独立洗手间、大行李间、每个铺位都有充电口，或像酒店一样隔音。设施取决于实际车体和席别。有官方布局时先查看；除非运营方明确确认更多设施，否则按基础洗漱条件准备。",
    },
    {
      id: "arrival-gate",
      type: "heading",
      level: 2,
      text: "门槛四：把到站早晨做一次门到门测试",
    },
    {
      id: "arrival-table",
      type: "table",
      caption: "只有城市已经准备好接住你，清晨到站才有价值",
      columns: ["检查项", "要回答的问题"],
      rows: [
        ["到达车站", "是不是你以为的那座车站？距离下一家酒店或活动多远？"],
        ["市内交通", "那个时间有地铁、公交或可实际使用的出租车吗？"],
        ["酒店条件", "酒店能否寄存行李、提供洗漱空间或付费提前入住？"],
        ["早餐与等待", "房间未准备好时，全体同行人能在哪里吃饭和等待？"],
        ["第一个预约", "如果列车晚点或大家都没睡好，会发生什么？"],
      ],
    },
    {
      id: "arrival-warning",
      type: "callout",
      title: "把零点前后放在同一条时间线上",
      body: "交通主管部门专门提醒夜间列车旅客看清零点后的发车日期，并核对深夜到站后的公共交通。请把酒店退房、到站候车、列车发车、目的地到达，以及第一个可以正常使用的室内空间写在一条时间线上。",
      tone: "warning",
    },
    {
      id: "traveller-limits",
      type: "heading",
      level: 2,
      text: "门槛五：让最不能将就的人决定",
    },
    {
      id: "traveller-comparison",
      type: "comparison",
      columns: [
        {
          heading: "夜间出行可能减负",
          items: [
            "家庭省掉一次白天长距离转场和一次酒店更换。",
            "团队能订到合适铺位，并主动把第二天早晨放轻。",
            "旅客更看重体验与保住白天，而不是独立客房的舒适。",
          ],
        },
        {
          heading: "夜间出行可能失败",
          items: [
            "老人或儿童无法舒适使用上铺。",
            "同行人需要相邻铺位，但现有库存无法满足。",
            "行动辅助设备、大件行李、用药规律或隐私需求，需要更可控的一晚。",
          ],
        },
      ],
    },
    {
      id: "children-rule",
      type: "paragraph",
      text: "带儿童时，不要把“免费儿童”理解为免费独立床位。中国铁路规则会区分不单独占用席位、购买儿童票以及购买独立铺位；当前动车组儿童优惠还会随席别变化。请在 12306 按正确年龄和证件录入每位儿童，计算真正需要的铺位价格。除非经过整晚体验的认真判断，不要默认成人和儿童共享一个铺位。",
    },
    {
      id: "comparison-method",
      type: "heading",
      level: 2,
      text: "做一次条件一致的比较",
    },
    {
      id: "comparison-steps",
      type: "list",
      ordered: true,
      items: [
        "固定准确车站、日期、乘客年龄和行李需求。",
        "在官方 12306 查询，只记录该日期真正出售的铺位。",
        "选择一趟实际合理的白天高铁，不要故意拿最贵或最差时刻来陪衬。",
        "把酒店、接驳、寄存、提前入住和餐食分别加入两边。",
        "从前一家酒店退房，一直画到进入下一间客房或开始第一个预约。",
        "询问最不能将就的同行人：一晚没睡好会怎样影响第二天？",
        "如果结论依赖未确认的铺位、设施或接驳，就淘汰卧铺方案。",
      ],
    },
    {
      id: "when-to-choose",
      type: "heading",
      level: 2,
      text: "一个实用的停止规则",
    },
    {
      id: "choose-comparison",
      type: "comparison",
      columns: [
        {
          heading: "保留夜间卧铺",
          items: [
            "现在就能订到合适铺位。",
            "时刻覆盖有效睡眠窗口，到站早晨也能衔接。",
            "加入全部夜间成本后，节省仍然有意义。",
            "必要时，第二天可以接受慢一点开始。",
          ],
        },
        {
          heading: "改选白天高铁",
          items: [
            "只剩座位或不合适的铺位。",
            "车程过短、过长，或时刻不适合完成一晚睡眠。",
            "清晨到站反而制造数小时付费等待，甚至仍要加房间。",
            "一晚没睡好会伤害一项固定、昂贵或体力要求高的安排。",
          ],
        },
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
        "这张票是铺位吗？准确铺位类型是什么？",
        "车站名称、日历日期和零点后时刻是否正确？",
        "每位旅客都能使用分配的铺位并处理自己的行李吗？",
        "哪一晚酒店真的被省掉了？",
        "到站后在哪里洗漱、寄存行李、吃饭和等待？",
        "出发和到达时段有哪些市内交通仍在运行？",
        "若计划变化，改签和退票条件能接受吗？",
        "如果没睡好，第二天的备用安排是什么？",
      ],
    },
    {
      id: "human-help",
      type: "heading",
      level: 2,
      text: "如果两边算出来很接近",
    },
    {
      id: "human-help-text",
      type: "paragraph",
      text: "留下旅行日期、人数与年龄、需要连接的两座城市或区域，以及大致总预算。Homeground 的人工旅行规划师可以帮你比较真正可行的出行窗口，而不是把随时会变的铁路时刻表包装成一份公开的固定私人行程。",
    },
    {
      id: "related-guides",
      type: "internal-links",
      title: "继续规划",
      items: [
        { label: "春节出行时重新核验铁路方案", href: "/zh/guides/lunar-new-year-customs-for-visitors/", description: "春运需求和临时调整会改变夜车与日间高铁的取舍；核对当日车次、铺位和备选。" },
        { label: "检查你的中国行程是不是太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "为了多保住一个观光日之前，先计算转场负担和恢复时间。" },
        {
          label: "第一次坐高铁，查看购票与进站指南",
          href: "/zh/guides/china-high-speed-train-first-time-guide/",
          description: "把购票、车站、行李和上车流程，与本文的夜间卧铺或白天高铁选择分开处理。",
        },
        {
          label: "规划与年长父母同行的中国旅行",
          href: "/zh/guides/china-itinerary-with-older-parents/",
          description: "为多代同行调整交通与恢复时间的假设。",
        },
        { label: "了解中国公益性慢火车", href: "/zh/guides/china-public-welfare-slow-trains/", description: "了解公益性慢火车为何仍在运行、日常乘客是谁，以及普通旅行者如何尊重地使用这项公共服务。" },
        { label: "了解高速列车如何制造", href: "/zh/guides/how-china-builds-high-speed-trains/", description: "以代表性的铝合金车体动车组为例，从车体制造到系统集成、静态调试、实验室和线路试验，看懂制造链。" },
        { label: "规划山东半岛铁路弧线", href: "/zh/guides/shandong-peninsula-coastal-city-rail-arc/", description: "先想清楚青岛、烟台、威海各自增加什么，再核对准确车站；若海滨体验重复，就有依据地少去一城。" },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "核查来源",
      items: [
        {
          label: "中国铁路官方路线与车票查询",
          url: "https://www.12306.cn/en/left-ticket.html?linktypeid=dc",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-08-11",
        },
        {
          label: "改签、铺位与儿童乘车常见问题",
          url: "https://www.12306.cn/en/faq.html?item=1",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-08-11",
        },
        {
          label: "官方购票渠道、儿童票、无障碍与行李常见问题",
          url: "https://www.12306.cn/en/faq.html?item=2",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-08-11",
        },
        {
          label: "官方列车与卧铺动车组布局参考",
          url: "https://www.12306.cn/index/view/station/train_intro.html",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-08-11",
        },
        {
          label: "现行动车组儿童优惠票价调整",
          url: "https://www.ln.gov.cn/web/ywdt/rdgz/2025090608541837883/index.shtml",
          publisher: "辽宁省人民政府／新华社",
          reviewedAt: "2026-08-11",
        },
        {
          label: "夜间列车日期、换乘与到站交通提醒",
          url: "https://www.mot.gov.cn/zhuanti/2025chunyun/chunyunbaodao/202502/t20250207_4163813.html",
          publisher: "中华人民共和国交通运输部",
          reviewedAt: "2026-08-11",
        },
        {
          label: "头图：野田オリックス拍摄的 CRH2 卧铺车厢内景（已裁切；CC BY-SA 3.0）",
          url: "https://commons.wikimedia.org/wiki/File:CRH2_sleeping_car_interior.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-11",
        },
        {
          label: "头图裁切版本适用的 CC BY-SA 3.0 许可",
          url: "https://creativecommons.org/licenses/by-sa/3.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-11",
        },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
