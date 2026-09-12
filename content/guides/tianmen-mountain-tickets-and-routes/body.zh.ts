import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "买天门山门票，先选上下山交通、入园地点和时段。A、B、C线是游览同一座山的不同交通组合。索道改造期间，A线需要在中站换车，不能从市区直接坐索道到山顶。付款前比较完整套票总价，再保存与本人证件、实际入口对应的使用说明。" },
    { id: "price-heading", type: "comparison", title: "天门山门票多少钱？", columns: [
      { heading: "72元：景区门票", body: "2025年8月1日起执行的门票政府指导价。", items: ["湖南省发改委通知规定的是门票项目，不是含索道、游览车和扶梯的全程报价。"] },
      { heading: "285元：公告所列成人套票", body: "同程所载施工期公告列明，A、B、C线普通成人套票执行价为285元。", items: ["资料复核日期为2026年9月13日。请向卖家核对出行日期、附加项目及最终支付金额。"] }
    ] },
    { id: "price-copy", type: "paragraph", text: "线上渠道的零售价或促销价可能不同。比较时要对齐出行日期、年龄类别和包含项目，不能只看最低的页面价格。门票有优惠，也不代表交通全部免费。带儿童、长者或学生出游，应先确认具体商品适用的票种，以及办理优惠需要哪些证件。" },
    { id: "included-heading", type: "heading", level: 2, text: "施工期间的套票包含什么？" },
    { id: "included-copy", type: "paragraph", text: "同程公告中的A、B线套票包含景区门票、大索道下段单程、中站至天门洞的景区游览车单程、天门洞快线索道单程，以及天门洞与山顶之间7级穿山扶梯往返。C线则往返均乘快线索道，再通过天门洞与山顶之间的扶梯连接游览。" },
    { id: "escalator-callout", type: "callout", tone: "neutral", title: "两段扶梯不是同一个项目", body: "套票中的7级穿山扶梯连接天门洞后方与山顶。天门洞前999级台阶旁的是“登天门扶梯”，也叫下段扶梯。公告所述施工安排中，下段扶梯下行免费，上行仍另收费。山顶观光小缆车、玻璃栈道服务费等可选项目，也应另行核对。" },
    { id: "routes-heading", type: "heading", level: 2, text: "A、B、C线怎么选？" },
    { id: "routes-date", type: "paragraph", text: "以下按红网刊载、2026年8月31日起执行的景区公告说明，资料于9月13日复核。大索道中站至山顶上站段仍停运；公告开放双程索道A、B、C线，单程索道1、2线继续暂停。" },
    { id: "tianmen-route-cards", type: "comparison", title: "先看从哪里开始、最后回到哪里", columns: [
      { heading: "A线：从市区索道下站开始", body: "市区下站乘大索道到中站，再换景区游览车到天门洞。", items: ["乘7级穿山扶梯上山顶，游览后乘同段扶梯返回天门洞。", "乘快线索道下至山门；公告路线随后乘摆渡车返回市区索道下站。"] },
      { heading: "B线：从山门开始", body: "在山门检票，乘快线索道到天门洞。", items: ["乘7级穿山扶梯上山顶，游览后乘同段扶梯返回天门洞。", "在天门洞广场乘景区车到索道中站，再乘大索道下段返回市区。"] },
      { heading: "C线：快线索道往返", body: "在山门检票，乘快线索道到天门洞。", items: ["乘7级穿山扶梯上山顶，游览后乘同段扶梯返回天门洞。", "乘快线索道返回山门，不经过大索道下段。"] }
    ] },
    { id: "route-choice", type: "paragraph", text: "想从市区索道站出发、上山时体验仍在运营的大索道下段，可选A线。想先坐快线上山，再坐大索道回市区，可选B线。若希望避开中站至天门洞的盘山车程，可考虑C线。C线仍需要乘索道和步行，不是全程地面交通，也不能保证排队更短。" },
    { id: "route-change", type: "paragraph", text: "公告允许B线游客返程时改乘快线索道到山门，不走景区车加大索道。冰雪、大雾、暴雨等导致盘山路不能安全通行时，A、B线也可能临时改走C线交通。返程接车地点应跟随实际出口，离开酒店前再看一次当天公告。" },
    { id: "office-heading", type: "heading", level: 2, text: "该去哪个售票处或入口？" },
    { id: "office-copy", type: "paragraph", text: "A线对应“天门山索道下站”，即市区的大索道下站；B、C线从“天门山国家森林公园山门”开始检票。卖家还可能要求先去另一个取票或集合地点，如有此要求，两处信息都要保存。售票处地址不一定就是第一段索道的排队入口，安排车辆时应一并提供已确认线路和入口中文名。" },
    { id: "hours-copy", type: "paragraph", text: "8月31日公告的售票时间为7:30—16:00，运营自8:00开始；同程公告另列16:00停止检票。请按已订时段抵达。预约不等于到场立即上索道，16:00也不是保证完成游览的时间。天门山当天尽量不要紧接时间很赶的火车或航班。" },
    { id: "booking-heading", type: "heading", level: 2, text: "外国护照能提前网上买票吗？" },
    { id: "booking-copy", type: "paragraph", text: "线上渠道出售指定日期和线路的天门山门票，但护照办理方式取决于渠道和具体商品。先看可订日期及时段，再在付款前核对以下事项。页面有“立即预订”按钮，并不能证明它接受你的证件或境外手机号。" },
    { id: "booking-list", type: "list", ordered: true, items: [
      "确认商品是“天门山国家森林公园”，以及正确日期、A/B/C线路和入园时段。张家界国家森林公园、大峡谷玻璃桥另有各自门票。",
      "确认可选护照证件，以及每位旅客的姓、名、护照号码应怎样填写。表单不接受真实资料时，先找卖家处理，不能换填身份证号码或他人信息。",
      "核对手机号国家区号、确认信息接收方式和可用支付方式。付款后应能取得实际门票或入园码，不能只保存支付收据。",
      "读清总额、可选加购项目和对应日期的退票截止时间。询问改期是否需要先退再买；原订单状态未确定前，不急着重复购票。"
    ] },
    { id: "entry-copy", type: "paragraph", text: "出行时带上预约使用的护照原件，并离线保存门票。同程所载公告将护照列为人工核验身份的证件之一，同时需出示电子或纸质门票。请以自己订单的取票和检票说明为准：需要换票的，提前确认位置，不要默认所有外籍护照订单都去同一个窗口。" },
    { id: "next-links", type: "internal-links", title: "把天门山放进张家界行程", items: [
      { label: "安排张家界游览天数", href: "/zh/guides/zhangjiajie-itinerary/" },
      { label: "森林公园门票与入口", href: "/zh/guides/zhangjiajie-national-forest-park-tickets-and-entrances/" },
      { label: "住张家界市区还是武陵源？", href: "/zh/guides/zhangjiajie-city-or-wulingyuan-hotel-base/" }
    ] },
    { id: "sources", type: "sources", title: "票价与路线参考", items: [
      { label: "天门山门票价格通知：2025年8月1日起执行", url: "https://fgw.hunan.gov.cn/fgw/xxgk_70899/tzgg/202508/t20250825_33782047.html", publisher: "湖南省发展和改革委员会", reviewedAt: "2026-09-13" },
      { label: "2026年8月31日景区运营与路线公告", url: "https://tour.rednet.cn/m/content/646042/75/16221781.html", publisher: "红网；来源：张家界天门山景区", reviewedAt: "2026-09-13" },
      { label: "套票构成、价格及入园公告", url: "https://www.ly.com/scenery/BookSceneryTicket_922.html", publisher: "同程旅行", reviewedAt: "2026-09-13" }
    ] }
  ]
} satisfies StructuredPageBody;

export default body;
