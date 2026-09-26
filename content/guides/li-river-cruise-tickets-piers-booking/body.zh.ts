import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "桂林到阳朔的漓江游船，先看景区公布的官方微信服务号「漓江售票处」。2026 年 8 月票价表中的三星船成人票为 215 元、四星船为 360 元；两种船在桂林从不同码头出发，订车前要先确定船型。普通日期统一提前几天、几点放票，目前没有查到可靠的官方规则。" },
    { id: "booking-heading", type: "heading", level: 2, text: "船型和上船码头要一起确认" },
    { id: "booking-rules", type: "table", caption: "截至 2026 年 9 月 26 日核对的成人票价与码头", columns: ["船型", "公布的成人票价", "桂林上船", "阳朔下船"], rows: [
      ["三星船", "215 元", "磨盘山客运港", "龙头山码头"],
      ["四星船", "360 元", "竹江码头", "龙头山码头"]
    ] },
    { id: "release", type: "paragraph", text: "景区的 2026 年国庆公告写的是：桂林到阳朔的精华段游船提前 15 天预售，每天 11:00、16:00 更新余票信息。这个提前天数只针对该次假期，两个时间点也不是普通日期的统一开票时间。出发日不同，先查对应的新公告，不要照搬社交平台上的「提前五天早上九点抢票」。" },
    { id: "mistakes", type: "callout", tone: "warning", title: "最容易弄错的三件事", body: "买了三星船却把车开到竹江；把余票更新时间当成固定开票时间；在第三方买票后，想用订单短信直接到景区自助机取票。按你实际下单渠道给的取票规则走，并让司机看清订单上的中文码头名。" },
    { id: "options-heading", type: "heading", level: 2, text: "三星和四星船，差价花在哪里？" },
    { id: "options", type: "comparison", title: "先比较同一天的产品", columns: [
      { heading: "三星船：215 元", body: "景区公布的桂林到阳朔成人票价较低。景区码头说明对应磨盘山上船；座位、餐食按实际日期的产品页核对。" },
      { heading: "四星船：360 元", body: "另一种船型，从竹江码头上船，终点仍在阳朔。两者成人票价相差 145 元；先看当日船舱、座位和餐食内容，再决定值不值得加。" }
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "按「桂林上船、阳朔下船」安排这一天" },
    { id: "route-list", type: "list", ordered: true, items: [
      "付款后核对日期、星级、上船码头与出航时间。磨盘山和竹江不能只凭「漓江码头」四个字互换。",
      "从桂林出发给车程、实名核验和取票留出时间。景区介绍这段船程约四小时，实际仍以订单时间及当天运营通知为准。",
      "在阳朔按订单标明的码头下船，继续去阳朔酒店；行李和接车都不要留在桂林的上船码头。",
      "雨季留一手安排。2026 年汛期景区曾临时停航，不能把游船当成完全不受天气影响的交通。"
    ] },
    { id: "hours-heading", type: "heading", level: 2, text: "几点到码头才合适？" },
    { id: "hours", type: "paragraph", text: "按成功订单上的开航、取票和检票说明倒推，不要拿网上某一张旧船票的时间套到自己身上。景区没有给所有船型、所有日期公布一张永远适用的时刻表。桂林市区到码头的路程、排队和实名核验都要计算进去。" },
    { id: "practical-heading", type: "heading", level: 2, text: "用外国护照订票，先确认能否填证件" },
    { id: "practical", type: "list", items: [
      "景区要求实名购票，票、本人和登记证件要对应。每位同行者的信息都按购票渠道实际接受的证件填写。",
      "官方页面没有给出「漓江售票处」使用外国护照的完整操作步骤。付款前先向官方售票渠道确认护照能否下单、成功后在哪取票。",
      "带上订单中使用的证件原件，离线保存成功订单。只有付款截图，不等于已经拿到可以上船的票。",
      "景区门票部分的减免，不代表整张游船票都减同样金额；优惠类别与材料以所选产品当期说明为准。"
    ] },
    { id: "final-check", type: "callout", tone: "decision", title: "出酒店前再看一次", body: "把日期、三星或四星、中文码头名、开航时间和取票方式放在一起核对。留意景区是否发布水位或天气调整，再把订单上的码头名发给司机。" },
    { id: "faq", type: "faq", title: "漓江游船订票常见问题", items: [
      { question: "漓江游船官方渠道是哪一个？", answer: "漓江景区 2026 年 9 月公告列出的官方预约渠道是微信服务号「漓江售票处」。实名选定日期和船型后，检查是否真正下单成功，以及订单写的上船码头、取票方式。" },
      { question: "漓江游船都是提前五天、早上九点放票吗？", answer: "没有查到适用于所有日期的官方规则。2026 年国庆的精华段游船提前 15 天预售，11:00 和 16:00 是余票信息更新时间；其他假期使用过不同提前天数。请按自己出发日期的新公告判断。" },
      { question: "漓江三星船和四星船多少钱、从哪里上？", answer: "景区 2026 年 8 月公布的成人票价是三星 215 元、四星 360 元。景区码头说明分别指向磨盘山客运港和竹江码头，两者都在阳朔下船；当天餐食和座位内容另看具体产品。" },
      { question: "用外国护照能在「漓江售票处」买票吗？", answer: "景区已明确实名购票，但没有公布外国护照在该微信渠道里的完整下单步骤。付款前先问官方渠道能否使用你的护照，以及订单如何取票；成功后带订单所用证件原件。" },
      { question: "坐完漓江游船会返回桂林吗？", answer: "这里说的精华段常规路线是桂林一侧上船、阳朔下船。酒店、行李和下船接车按阳朔来安排；若要另外买返航产品，必须核对独立的日期、班次与票。" }
    ] },
    { id: "internal-links", type: "internal-links", title: "把游船接进整段桂林行程", items: [
      { label: "桂林阳朔五日私家团", href: "/zh/tours/guilin-yangshuo-5-day-private-tour/", description: "看游船日如何和酒店、专车衔接。" },
      { label: "桂林到阳朔选游船、汽车还是火车", href: "/zh/guides/guilin-yangshuo-transport-route/", description: "先决定两地交通，再确定码头接送。" },
      { label: "阳朔住县城还是遇龙河", href: "/zh/guides/yangshuo-town-or-yulong-river-where-to-stay/", description: "按下船后的活动来定酒店位置。" }
    ] },
    { id: "consultation", type: "callout", tone: "neutral", title: "不想自己拆开订船和接送？", body: "告诉我们出行日期与人数，Homeground 可以把桂林接车、确认后的游船类别和阳朔接送放到同一份行程里。船票是否有位、包含什么，报价前按实际日期核对清楚。" },
    { id: "sources", type: "sources", title: "漓江景区官方资料", items: [
      { label: "2026 年国庆游船预售公告", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/264", publisher: "桂林漓江景区", reviewedAt: "2026-09-26" },
      { label: "景区游船票价表", url: "https://www.liriver.com.cn/page/article/lyfw.pwxx", publisher: "桂林漓江景区", reviewedAt: "2026-09-26" },
      { label: "码头与路线说明", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/130", publisher: "桂林漓江景区", reviewedAt: "2026-09-26" },
      { label: "取票及第三方订单说明", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/128", publisher: "桂林漓江景区", reviewedAt: "2026-09-26" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
