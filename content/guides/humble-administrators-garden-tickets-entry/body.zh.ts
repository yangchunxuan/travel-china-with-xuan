import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "拙政园实行实名分时段购票，可通过「苏州园林旅游」等园林官方微信渠道提前 1–7 天安排；成人票公布价为旺季 80 元、淡季 70 元。入园带上购票时使用的证件原件，按订单时段前往；拙政园门票不包含旁边的苏州博物馆预约。" },
    { id: "booking-heading", type: "heading", level: 2, text: "先订好拙政园自己的日期和时段" },
    { id: "booking-rules", type: "table", caption: "2026 年 9 月 26 日核对的苏州官方公告及园林局价格表", columns: ["事项", "官方已公布", "怎么处理"], rows: [
      ["渠道", "园林官方微信渠道提供票务与开放通知；拙政园实行实名分时段入园。", "从「苏州园林旅游」公众号票务入口进入，保存成功订单。"],
      ["提前多久", "2026 年市政府信息写明提前 1–7 天线上实名预约。", "尽早选日期和时段；查到的官方材料没有公布每日放票时刻，也未保证当天有票。"],
      ["成人票价", "4、5、7–10 月 80 元；1–3 月、6 月、11–12 月 70 元。", "支付前再核对订单价格，跨年行程尤其要重新查。"],
      ["证件与优惠", "实名购票；官方列有儿童、长者等符合条件者的优惠。", "带订单所用证件原件。境外护照的具体操作和优惠适用资格，先向园方核实。"],
      ["退改", "本次核对的官方材料未确认现行退票截止时间。", "付款前阅读实际订票页上的退改条款。"],
    ] },
    { id: "mistakes", type: "callout", title: "三件事别串台", body: "拙政园是实名、分时段的园林门票，苏州博物馆本馆要另约。苏博每天 08:00 放新日期的规则，不能当作拙政园的放票时间。2026 年部分日期 06:45 开园是开放时间调整，不是已证实的单独早鸟票。", tone: "warning" },
    { id: "options-heading", type: "heading", level: 2, text: "这一天还要去哪里？" },
    { id: "options", type: "comparison", columns: [
      { heading: "拙政园为主", body: "先锁定园林时段，再为东、中、西三部分留出弹性时间。实际走法看现场导览，不预设未经官方确认的固定入口或游览时长。" },
      { heading: "拙政园加苏博", body: "如果要进苏州博物馆本馆，单独完成该馆预约。苏博放票、证件与开放时间是另一套规定。" },
      { heading: "上海往返或串游苏州", body: "先定苏州日期与园林时段，再安排火车或接送。Homeground 已公开的上海—苏州相关行程含拙政园，最终以确认的行程和票务为准。" },
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "不靠猜入口的到访顺序" },
    { id: "route-list", type: "list", items: [
      "出发前保存成功订单，核对每位游客的姓名、日期和入园时段。",
      "导航至官方地址「苏州市东北街 178 号」，再按订单说明和现场指示找游客入口。",
      "进园后看当日导览。拙政园分东、中、西三部分，按现场开放情况和自己的时间决定顺序。",
      "若还去苏州博物馆，另存该馆预约凭证，并给两个时段之间留出余量。",
    ] },
    { id: "hours-heading", type: "heading", level: 2, text: "常规开放时间和 2026 年提早开园" },
    { id: "hours", type: "paragraph", text: "苏州园林局常规表列明：3–10 月 07:30–17:30，17:00 停止检票；11 月至次年 2 月 07:30–17:00，16:30 停止检票。苏州市 2026 年公告另称，6 月 19 日至 10 月 7 日提前至 06:45 开园；清明、五一、中秋、国庆的关园时间也可能延后。具体日期以「苏州园林旅游」当期通知为准，不把 2026 年调整直接推到 2027 年。" },
    { id: "practical-heading", type: "heading", level: 2, text: "证件和票务小细节" },
    { id: "practical", type: "list", items: [
      "按官方订票页要求填写每位游客的实名资料，并带购票所用证件原件。",
      "苏州 2024 年官方消息提到护照购票与境外游客现场协助，但未核实现在的完整操作步骤；别把现场协助当成免预约入园保证。",
      "成人票按月份分旺淡季：4、5、7–10 月 80 元，其余列明月份 70 元。",
      "苏博 08:00 放票和当日余票规则属于苏博，不能套用到拙政园。",
      "行程可能变动时，付款前读清订单的退票和爽约规定。",
    ] },
    { id: "final-check", type: "callout", title: "前一天核对", body: "逐人检查姓名、证件原件、拙政园日期与时段、当期开放通知，以及苏博是否另约成功。购物车或聊天记录里的意向，不等于已确认门票。", tone: "decision" },
    { id: "faq", type: "faq", title: "拙政园门票常见问题", items: [
      { question: "拙政园要提前几天买票？", answer: "苏州市 2026 年信息写明，拙政园采用提前 1–7 天的实名分时段线上预约。2026 年 9 月 26 日核对的官方材料未给出每日固定放票时刻，也没有保证当天余票。" },
      { question: "拙政园门票多少钱？", answer: "园林局成人票表列明：4、5、7–10 月旺季 80 元；1–3 月、6 月、11–12 月淡季 70 元。该价格表发布于 2024 年，付款前再看实际订单。" },
      { question: "境外护照可以预约拙政园吗？", answer: "苏州 2024 年官方报道提到护照购票和现场协助，但本次未核实官方订票页中现行的护照操作步骤。出发前向园林官方渠道问清，不要预设现场一定有票。" },
      { question: "拙政园 06:45 开园要买特殊票吗？", answer: "苏州 2026 年公告把 6 月 19 日至 10 月 7 日 06:45 作为开园时间调整，没有公布单独的早入园票。其他日期先查当期官方通知。" },
      { question: "拙政园门票包含苏州博物馆吗？", answer: "不包含。拙政园门票和苏州博物馆本馆预约彼此独立。苏博每天 08:00 开放新日期的时间，也不是已证实的拙政园放票时间。" },
      { question: "拙政园入园要带什么？", answer: "东北街 178 号的拙政园实行实名分时段购票，入园要按成功订单上的日期和时段，带上购票所用的证件原件；具体检票方式以订单和现场指示为准。" },
    ] },
    { id: "internal-links", type: "internal-links", title: "把拙政园放进苏州行程", items: [
      { label: "怎么看懂苏州园林", href: "/zh/guides/how-to-read-a-suzhou-garden/", description: "帮你选园林、看空间；本页专门说拙政园买票和入园。" },
      { label: "上海到苏州一日游", href: "/zh/guides/shanghai-to-suzhou-day-trip/", description: "按园林时段安排车站和返程。" },
      { label: "上海—苏州—杭州 6 天私人游", href: "/zh/tours/shanghai-suzhou-hangzhou-6-day-private-tour/", description: "公开行程含拙政园；最终日期与票务以确认结果为准。" },
      { label: "上海—苏州 5 天私人游", href: "/zh/tours/shanghai-suzhou-5-day-private-tour/", description: "另一条含拙政园的公开行程，可查看每天安排。" },
    ] },
    { id: "consultation", type: "callout", title: "想把园林时段和苏州其他行程接好？", body: "告诉 Homeground 顾问日期、人数，以及已定的火车或苏博时间，我们可以一起检查行程和各自的预约要求。拙政园门票以实际订票成功为准。", tone: "neutral" },
    { id: "sources", type: "sources", title: "官方来源（2026 年 9 月 26 日核对）", items: [
      { label: "官方微信购票渠道及实名预约景点（2025 年 9 月 23 日）", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202509/2dea3bc5843d4030a65e8a30c391282a.shtml", publisher: "苏州市人民政府", reviewedAt: "2026-09-26" },
      { label: "拙政园旺淡季成人票价（2024 年 7 月 11 日）", url: "https://ylj.suzhou.gov.cn/szsylj/mpjg/wztt.shtml", publisher: "苏州市园林和绿化管理局", reviewedAt: "2026-09-26" },
      { label: "常规开放时间及官方通知渠道（2025 年 1 月 9 日）", url: "https://ylj.suzhou.gov.cn/szsylj/kfsj/wztt.shtml", publisher: "苏州市园林和绿化管理局", reviewedAt: "2026-09-26" },
      { label: "实名制与提前七天购票（2025 年 1 月 7 日）", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202501/c4064030b80e4b2a8913d7120e147302.shtml", publisher: "苏州市人民政府", reviewedAt: "2026-09-26" },
      { label: "提前 1–7 天分时段预约及 2026 年提早开园（2026 年 6 月 19 日）", url: "https://www.suzhou.gov.cn/szsrmzf/dstx/202606/b12c95b19bd14f499300f2324c9aa7dd.shtml", publisher: "苏州市人民政府", reviewedAt: "2026-09-26" },
      { label: "护照购票及境外游客现场协助的 2024 年报道", url: "https://www.suzhou.gov.cn/szsrmzf/szyw/202407/b9adeadc7d134766a4654cff216dfcf1.shtml", publisher: "苏州市人民政府", reviewedAt: "2026-09-26" },
      { label: "苏博本馆另行预约规则", url: "https://www.szmuseum.com/Other/ReservationTip", publisher: "苏州博物馆", reviewedAt: "2026-09-26" },
      { label: "拙政园地址及东、中、西三部分", url: "https://ylj.suzhou.gov.cn/szsylj/sjyc/201905/c1df393edc8745abb20e8a9bd5525782.shtml", publisher: "苏州市园林和绿化管理局", reviewedAt: "2026-09-26" },
    ] },
  ],
};

export default body;
