import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "把渝张交通当成一条地址到地址的执行链，不是一段笼统的高铁。重庆→张家界时，从12306实时订单票面所写的准确重庆站名出发，乘车到张家界西站，再接到出发前已经选好的准确酒店地址。反向也要重新搭链并逐段复核，不能假设去程的班次形态或最后一段接驳原样倒放就成立。",
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "一个任务，三个固定端点",
      body: "本文只执行票面重庆节点、张家界西站与已选定酒店地址之间的走廊。它不决定重庆哪座站更合适，不替你选择住张家界市区还是武陵源，也不讲全国通用的铁路购票与乘车流程。",
    },
    {
      id: "before-booking-heading",
      type: "heading",
      level: 2,
      text: "先固定地址，再搭交通链",
    },
    {
      id: "first-steps",
      type: "list",
      ordered: true,
      items: [
        "先在“张家界市区还是武陵源”专门指南里选定基地，再保存酒店完整中文名、准确街道地址、地图定位与联系渠道；只有片区名还不算端点。",
        "按实际出行日期和方向查询12306实时平台，从所选车次复制完整重庆站名，并严格区分“张家界西站”和“张家界站”。",
        "按票面车站搭重庆市内段，结合实时导航，并用重庆车站选择器理解站点地理；不要凭习惯往熟悉的重庆站走。",
        "向已选酒店索取当前到店说明，包括司机应使用的地址和双方约定的会合点。酒店不提供接驳时，到站后只按车站标识或工作人员信息核实当天可用方案。",
        "出发前写好退路：找谁、在车站有工作人员的哪个区域等待，以及原定最后一段失败时，哪个可单独预订的准确地址能接待你。",
      ],
    },
    {
      id: "chain-heading",
      type: "heading",
      level: 2,
      text: "逐段搭好这条走廊",
    },
    {
      id: "chain-table",
      type: "table",
      caption: "每次交接都必须准确到什么程度",
      columns: ["阶段", "要锁定的决定", "随身证据"],
      rows: [
        [
          "重庆市内段",
          "当前有效车票所写的准确车站",
          "站名汉字、实时路线与订单信息",
        ],
        [
          "铁路交接",
          "当前日期和方向在实时系统显示的车次",
          "12306实时订单与站内显示",
        ],
        [
          "抵达张家界西",
          "站内标识指向的出口或双方约定的会合点",
          "酒店消息、如有则保存司机信息，以及地址定位",
        ],
        [
          "最后一段公路",
          "一种已经核实、能到已选酒店的方式",
          "酒店完整中文名与准确街道地址",
        ],
        [
          "酒店门口",
          "正确物业及其入住联系人，而不只是正确片区",
          "预订姓名与书面到店安排",
        ],
      ],
    },
    {
      id: "directions-heading",
      type: "heading",
      level: 2,
      text: "两个方向要分别搭链",
    },
    {
      id: "directions-table",
      type: "table",
      caption: "本文双向归一，但不假设双向运营对称",
      columns: ["方向", "链路", "不能假设"],
      rows: [
        [
          "重庆→张家界",
          "出发地址→票面重庆站→张家界西站→已选酒店地址",
          "别的日期见过的车次或最后一段方案今天仍在运行",
        ],
        [
          "张家界→重庆",
          "已选酒店地址→张家界西站→票面重庆到达站→目的地址",
          "把去程箭头倒过来，就能复刻返程时刻、接人点或重庆市内段",
        ],
      ],
    },
    {
      id: "evidence-heading",
      type: "heading",
      level: 2,
      text: "为什么本文不冻结时刻表",
    },
    {
      id: "evidence-para",
      type: "paragraph",
      text: "重庆市政府2026年1月22日的调图公告记录了当次调整新增张家界西—重庆东列车，并明确后续详情以12306为准。中国铁路2026年7月10日的公告又记录了临时加开列车，说明运行形态可能临时变化。这两份公告只能证明带日期的变化，不能证明今天的车次、票价、车站或开车时间。实际出行日期仍以12306实时结果为运营核对依据。",
    },
    {
      id: "luggage-heading",
      type: "heading",
      level: 2,
      text: "把行李写进预订条件",
    },
    {
      id: "luggage-list",
      type: "list",
      ordered: false,
      items: [
        "接受酒店或交通方接人安排前，告知真实人数与行李件数；只有车型名称不能证明装得下。",
        "护照、药品、充电工具和酒店地址随身携带，不要放进可能寄存或转运的行李。",
        "问清车辆可以合法会合的位置，以及物业入口是否还有台阶、坡道或第二段步行；确认准确入口，不要只确认片区。",
        "反向出发时，提前一天与酒店落实行李上车和出发说明，再拿它与实时车票逐项核对。",
      ],
    },
    {
      id: "late-heading",
      type: "heading",
      level: 2,
      text: "晚到与中断恢复",
    },
    {
      id: "failure-table",
      type: "table",
      caption: "恢复下一个可核实的交接点，不是不惜代价保住原计划",
      columns: ["故障", "第一步", "安全恢复边界"],
      rows: [
        [
          "脑中记错了重庆站",
          "重新读当前有效车票，把真实车站与所在位置对照",
          "登车节点已赶不到时，按铁路当前处理方式办，不要横穿全城硬冲",
        ],
        [
          "车次变更、晚点或取消",
          "只用12306与车站工作人员核对铁路实时状态",
          "重搭后续链，并在锁定公路接驳前告知酒店新的到达信息",
        ],
        [
          "找不到约定接人方",
          "回到有工作人员和清晰标识的站内区域，再联系酒店或具名服务方",
          "不要跟随身份未核实的揽客者；改用车站标示渠道或另一个独立核实的方案",
        ],
        [
          "晚到使最后一段失效",
          "确认已选物业是否还能接待、接驳是否真实运行",
          "任一答案缺失时，使用书面备用地址，之后再接回原酒店",
        ],
        [
          "行李装不进原定车辆",
          "没有具名会合方案时，不要把人与行李拆开",
          "更换车辆安排，或记录清楚第二次转运，让旅客始终带着必需品",
        ],
      ],
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "五句话恢复协议",
    },
    {
      id: "recovery-list",
      type: "list",
      ordered: true,
      items: [
        "停下来，确认最后一个已经证实的节点：票面车站、列车、张家界西站或酒店地址。",
        "铁路段只通过12306实时信息或车站工作人员核对。",
        "告诉接待酒店发生了什么，请对方给出当前、书面的到店说明。",
        "只有会合点与目的地址都清楚时，才接受下一段接驳。",
        "通知链上的下一个人；不要让无声晚点演变成入住失败或返程误车。",
      ],
    },
    {
      id: "mistakes-heading",
      type: "heading",
      level: 2,
      text: "出行日前删掉这五个错误",
    },
    {
      id: "mistakes-list",
      type: "list",
      ordered: true,
      items: [
        "只保存城市名，没有保存完整重庆站名汉字。",
        "到张家界西站时只有片区选择，没有准确酒店地址。",
        "拿旧截图、文章示例或带日期的政府公告当今天时刻表。",
        "假设去程列车或最后一段安排会在反向原样存在。",
        "把山景头图当作任何车站、公交、出租或接驳运营的证据。",
      ],
    },
    {
      id: "handoffs-heading",
      type: "heading",
      level: 2,
      text: "先完成上游选择，再执行这一段",
    },
    {
      id: "handoffs-para",
      type: "paragraph",
      text: "还在比较重庆各站时，先停在这里，去看重庆车站选择器。还没决定住张家界市区还是武陵源时，先用专门的酒店基地指南定下来，再搭最后一段。护照购票、安检、检票口与全国铁路规则属于第一次坐中国高铁指南。本文从这些决定完成后开始，到准确预订地址为止。",
    },
    {
      id: "dynamic-boundary",
      type: "callout",
      tone: "warning",
      title: "必须实时核对",
      body: "本文不冻结任何开车时间、票价、距离、车程、公路接驳时长、班车时刻、出租可用性或酒店接待规则。按实际日期和方向查询12306实时平台，并在出发前针对准确物业确认最后一段与入住安排。",
    },
    {
      id: "more-planning",
      type: "internal-links",
      title: "补齐这条走廊周围的决定",
      items: [
        {
          label: "先决定三城顺序",
          href: "/zh/guides/chengdu-chongqing-zhangjiajie-route-order/",
          description:
            "判断三城是否都值得保留，以及哪个方向更能保护有效游览日。",
        },
        {
          label: "确定成都—重庆车站组合",
          href: "/zh/guides/chengdu-chongqing-station-pair/",
          description: "行程还包括成都时，先确定上一段实际票面车站组合。",
        },
        {
          label: "选择正确的重庆火车站",
          href: "/zh/guides/chongqing-railway-station-selector/",
          description: "选定票面节点前，先比较重庆各站的地理位置。",
        },
        {
          label: "张家界住市区还是武陵源",
          href: "/zh/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          description: "先完成过夜基地决定，本文才继续搭最后一段。",
        },
        {
          label: "第一次坐中国高铁",
          href: "/zh/guides/china-high-speed-train-first-time-guide/",
          description: "查看全国通用的购票证件、进站、检票与乘车流程。",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "已复核来源",
      items: [
        {
          label: "中国铁路12306——官方实时购票与车次平台",
          url: "https://www.12306.cn/index/",
          publisher: "中国国家铁路集团",
          reviewedAt: "2026-09-01",
        },
        {
          label: "重庆2026年1月22日铁路调图公告",
          url: "https://www.cq.gov.cn/ywdt/jrcq/202601/t20260122_15343341.html",
          publisher: "重庆市人民政府",
          reviewedAt: "2026-09-01",
        },
        {
          label: "中国铁路2026年7月10日临时加开列车公告",
          url: "https://kyfw.12306.cn/mormhweb/zxdt_news/202607/t20260710_46062.html",
          publisher: "中国铁路12306",
          reviewedAt: "2026-09-01",
        },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
