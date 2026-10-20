import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";
const sh5 = "shanghai-suzhou-5-day-private-tour";
const sh6 = "shanghai-suzhou-hangzhou-6-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "lead", type: "lead", text: "第一次去上海，住这三个区域之一。人民广场是最均衡的落脚点：1、2、8 号线在这里交会，大多数景点一趟地铁就到。外滩和南京东路把江景和天际线放在门口，代价是人多、吵。前法租界一带适合梧桐街道、咖啡馆和邻里的夜晚，范围很大，要看准具体地铁站。不管选哪里，都按酒店的具体入口、到地铁的步行和从机场过来的路线来判断，而不是看区域名字。"},
    { id: "answer", type: "callout", title: "先给结论", tone: "decision", body: "首次混合观光、希望最均衡交通基地，选人民广场；外滩天际线和南京东路的早晚活动反复出现，且能接受人流和可能不便的步行最后一程，选外滩／南京东路；林荫街、咖啡馆和社区夜晚比住在外滩旁更重要，选原法租界范围内的准确地址，但必须先核对真实车站和抵达路线。" },
    { id: "boundary", type: "paragraph", text: "本文比较三个宽泛基地，不做酒店排名，也不把“原法租界”当成一个单一区域。这个旅行标签覆盖许多街道和多个地铁站；常熟路附近与新天地或交通大学附近的住宿表现不同。所有标签最终都要缩小到具体大堂。" },
    { id: "matrix", type: "table", caption: "三个好基地，获得三种不同优势", columns: ["基地", "改善什么", "牺牲什么", "核验"], rows: [["人民广场", "1、2、8号线的均衡连接与中心灵活性", "门外氛围不如江边或街巷鲜明", "正确出口、过街和大堂步行"], ["外滩／南京东路", "反复天际线、步行街和中心夜晚", "繁忙时人流、噪音和道路／步行管控", "车辆下客、行李路线与安静侧客房"], ["原法租界范围", "街区散步、咖啡馆和慢节奏早晚", "宽泛标签可能隐藏额外换乘", "准确可用车站、夜间路线和机场／铁路接驳"]] },
    { id: "trip-fit", type: "table", caption: "把酒店给重复出现的模式", columns: ["行程模式", "先测试", "决定核验"], rows: [["三四晚、第一次、经典景点混合", "人民广场", "真的靠近可用1／2／8号线入口"], ["外滩日出／日落和南京东路出现在多天", "外滩／南京东路", "房间和入口通过人流与噪音检查"], ["餐饮、设计、咖啡和街区散步是核心", "原法租界内准确地址", "具体街道、车站也匹配其他固定日程"], ["老人、婴儿车或多件行李", "下客到房间最简单的物业", "不要让区域标签压过无障碍"], ["晚到或早出", "保护这段交通的酒店", "实际运营时段和有人值守抵达"]] },
    {id: "traps-heading", type: "heading", level: 2, text: "第一次在上海订酒店，最容易踩的五个坑"},
    {id: "traps-list", type: "list", ordered: true, items: ["“外滩景观房”不等于“走路到外滩”的酒店。一个隔着大马路看天际线，另一个可能看不到江景，走五分钟就到。想清楚你花钱买的是哪一样。", "“前法租界”是个说法，不是一个区。它覆盖好几个地铁站，住常熟路附近和住新天地附近，每天的走法完全不同。", "周末和节假日的外滩一带不一样。上海官方报道显示南京东路周末客流非常大，活动期间车站也可能调整运营；2026 年九天春节假期里，上海接待游客 2,167 万人次。", "“靠近地铁”也可能要走很远。人民广场是全网最繁忙的车站之一；问清哪个出口离酒店近、拖着行李要过几条马路。", "深夜抵达要有人在前台。每位外国住客入住时都要凭护照登记，确认你到的时候有人值班。"]},
    {id: "regional-stay-heading", type: "heading", level: 2, text: "去苏州或杭州，要不要搬酒店？"},
    {id: "regional-stay-choice", type: "paragraph", text: "只去苏州集中玩一天，保留上海房间就少一次打包和入住。Homeground 上海·苏州5日线的4晚都住同一家上海酒店，苏州高铁当天往返。如果西湖、茶文化和寺院是重点，6日线则住上海2晚、苏州1晚、杭州2晚，用两次换酒店换来三城的本地时间。两条都含早餐及携程4钻酒店；携程钻级不等于国际四星认证。具体酒店、房型和区域在预订前确认，不能从“上海住宿”推定外滩地址或江景房。"},
    {id: "regional-stay-products", type: "internal-links", title: "先比较住宿方式", items: [{label: "上海·苏州5天4晚私人游", href: "/zh/tours/shanghai-suzhou-5-day-private-tour/", description: "上海同一家酒店住4晚，苏州当天往返。"}, {label: "上海·苏州·杭州6天5晚私人游", href: "/zh/tours/shanghai-suzhou-hangzhou-6-day-private-tour/", description: "上海住2晚，再经苏州前往杭州。"}]},
    { id: "peoples-square", type: "heading", level: 2, text: "人民广场：均衡交通答案" },
    { id: "peoples-square-copy", type: "paragraph", text: "上海市政府访客资料列出人民广场站1、2、8号线，官方地铁报道也显示它是全网最繁忙车站之一。这种组合适合第一次旅行，但大站会增加站内步行，“人民广场”区域也不只一个出口。询问酒店对应哪个出口、该出口是否适合全组，以及还需过几条道路。" },
    { id: "bund", type: "heading", level: 2, text: "外滩和南京东路：先选择体验，再管理人流" },
    { id: "bund-copy", type: "paragraph", text: "只有会在清晨、夜间或多次使用江边和南京东路，这个基地才真正值钱。上海官方报道显示南京东路站在周末可能承受很大客流，节假日通知也可能改变车站运营。这不代表区域不适合住，而是大堂入口、道路接送和返回路线必须与景观同样认真核对。" },
    { id: "bund-warning", type: "callout", title: "“外滩景观”和“步行到外滩”是两个产品", tone: "warning", body: "房间可能看得到天际线，却隔着主干道或位于数个街区之外；另一家没有景观，街面路线反而直接。先决定目标是房内景观还是反复步行进入，再从准确入口核验。不要在想象里为两项同时付款。" },
    { id: "ffc", type: "heading", level: 2, text: "原法租界：把宽泛标签变成准确地址" },
    { id: "ffc-copy", type: "paragraph", text: "它提供另一种上海节奏：住宅街、咖啡馆、小店，以及不依赖抵达江边的夜晚。但预订平台使用这个标签很宽。标出真的会去的三处地点，再选靠近有用车站的酒店，不要选标签的几何中心。核对夜间照明、步道、车辆下客，以及观光返回后想要的街区生活是否仍在附近。" },
    { id: "arrival", type: "heading", level: 2, text: "让具名机场或火车站影响首尾夜" },
    { id: "arrival-copy", type: "paragraph", text: "使用完整航站楼或铁路站名，以及真正离开枢纽的时刻。人民广场对部分旅程有直达线路，但大行李、长站内通道和运营时段可能让道路接驳更简单；外滩酒店可能增加步行最后一程，街巷酒店可能多一次换乘。比较完整枢纽到大堂，不比较区域名气。" },
    { id: "last-mile", type: "list", items: ["索要大堂点位和中文道路入口，不只保存酒店名。", "确认可用地铁出口，以及全程是否无台阶。", "询问步行街、人流隔离或楼栋是否改变出租车停点。", "确认商场或室内路线会不会在返回前关门。", "大行李即使地铁直达，也保留道路接驳备用。"] },
    { id: "evenings", type: "heading", level: 2, text: "选择普通夜晚在哪里结束" },
    { id: "evenings-copy", type: "paragraph", text: "一次外滩夜晚不需要在外滩旁住四晚，一次咖啡馆早晨也不值得搬去西侧。写下每晚最可能的终点。大多数夜晚在中心观光后结束，人民广场或外滩组团更省事；夜晚本身就是社区用餐和散步，街巷基地才真正发挥作用。用重复行为，不用最上镜的一小时决定。" },
    { id: "room", type: "table", caption: "各基地物业核验", columns: ["基地", "询问", "隐藏失败"], rows: [["人民广场", "准确出口、电梯路线和客房朝向", "写着靠近车站却要走很长地下／过街"], ["外滩／南京东路", "安静侧、人流时入口与下客点", "景观房承受严重交通或夜生活噪音"], ["原法租界", "准确车站、电梯、街巷进入和当前施工", "地址漂亮但行李与每日交通困难"], ["任何区域", "实际抵达时有人处理护照", "位置很好却无人有权让全组入住"]] },
    { id: "failure", type: "table", caption: "上海比预期更繁忙时如何补救", columns: ["问题", "立即动作", "更好方案"], rows: [["出口／运营变化", "按运营方官方通知改走有人值守出口", "道路接驳到大堂"], ["人流阻断常规接送", "只移动到物业约定的合规会合点", "预先选离步行管控清楚的停点"], ["房间太吵", "要求已核实的安静侧房间", "连续睡眠受损则一晚后搬"], ["街巷带行李困难", "使用道路入口或行李支持", "首尾夜留在易进入基地"], ["区域导致每日额外换乘", "按城市一侧重排观光", "剩余多天可白天搬一次"]] },
    { id: "registration", type: "paragraph", text: "旅馆为外国住客办理登记。请具体物业确认实际抵达时段的值班与护照处理；住在知名区域不等于晚到一定轻松。" },
    { id: "dynamic", type: "paragraph", text: "上海市地铁与访客资料复核于2026年8月12日。节假日或活动会改变客流管控、车站运营和物业进入。抵达前重查上海地铁官方渠道和酒店；本文不假设任何固定关闭或客流。" },
    {id: "sale-heading", type: "heading", level: 2, text: "到了、住下、看上海，都不用摸索"},
    {id: "sale-copy", type: "paragraph", text: "酒店是第一个决定，怎么过去、住下以后怎么玩是接下来的两个。机场有司机接你，直接送到酒店的正确入口；请一位导游陪一天，把外滩、豫园和弄堂串成一条按你节奏走的路线。如果上海只是长线中的一站，别忘了北京：故宫当天不卖票：参观前 7 天北京时间 20:00 放票，每人用自己的护照实名预约；2025 年国庆假期第一天（10 月 1 日），故宫预约页面就已显示 10 月 2 日至 7 日全部约满。参观前至少 8 天交给我们并付款，就在预约保证范围内：约不上，服务费和门票钱全额退还；只剩不到 8 天，这份保证就用不上了。"},
    { id: "handoff-options", type: "comparison", title: "这些可以交给我们", columns: [
      { heading: "专车和司机", body: "从浦东或虹桥机场、上海各火车站送到酒店的准确入口；询价时告诉我们抵达时间。", items: ["司机是我们自己的。", "付款前书面确认价格。"] },
      { heading: `私人导游：每天${bodyGuideRate("shanghai", "zh")}起`, body: `持证英文导游，最多 8 小时：西安、张家界${bodyGuideRate("xian", "zh")}起，北京、上海${bodyGuideRate("beijing", "zh")}起，旺季日期更高。需要中文导游也可以安排，价格在报价里确认。`, items: ["在上海最多 8 小时：外滩、豫园或你选的街区。", "按整天预订，按每位导游计价，不是按人头。", "交通、门票和餐食另行报价。"] },
      { heading: `上海、苏州 5 天：每人${bodyTourPrice(sh5, 6, "zh")}起`, body: `2 人出行每人${bodyTourPrice(sh5, 2, "zh")}；上海同一家酒店住 4 晚含早，坐高铁去苏州玩一天。加上杭州的 6 天路线，2 人每人${bodyTourPrice(sh6, 2, "zh")}。`, items: ["酒店由我们挑选，付款前书面写明酒店名称和房型。", "游览日有私人导游和专车。"] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "交给我们安排", items: [{label: "预约接机、接站或包车", href: "/zh/services/private-car-and-driver/", description: "中国大陆任何城市。告诉我们路线、日期和行李。"}, {label: "请一位导游陪一天", href: "/zh/services/private-english-speaking-guides/", description: "北京、上海、西安、张家界的价格。"}, {label: "让规划师安排整趟行程", href: "/zh/services/full-trip-support/", description: "告诉我们日期和预算，提交行程需求免费。"}]},
    {id: "how-to-book", type: "callout", tone: "decision", title: "怎么预订", body: "在上面任何一个页面，通过 WhatsApp 或邮件告诉我们日期、人数和想看的地方。规划师 12 小时内回复，付款前你会先收到书面报价；从第一次回复到你旅行的最后一天，都是同一位规划师跟进。预订时用支付宝或 VBill 付 30% 定金，余款到了中国再付，我们不另收手续费。Homeground China 是持证旅行社（许可证 L-BJ10587），导游和司机都是我们自己的，行程不进购物店。"},
    { id: "stay-quote-handoff", type: "callout", title: "先请求人工沟通住宿适配", tone: "neutral", body: "现有通用规划入口只用于初次联系。初始表单仅填写旅行日期、准备比较的城市或区域、旅客与房间数量，以及必要时的大致住宿预算。可以说明希望稍后讨论家庭或无障碍安排，但不要提交儿童具体年龄、行动、医疗或无障碍细节、护照或其他证件资料、订单或付款记录，或任何准备转交酒店、地接等供应商的可识别资料。规划师会另行安排人工跟进；这些细节只在确有需要并取得适当同意后讨论。未经另行、针对明确目的的同意，Homeground 不会把资料分享给供应商；这里也不是实时库存系统，不保证价格、房态、外宾接待、房型或无障碍适用性。" },
    { id: "faq", type: "faq", title: "上海住宿常见问题", items: [
    { question: "第一次来上海应该住哪里？", answer: "人民广场是第一次来上海、混合观光时最均衡的交通基地。外滩或南京东路适合把天际线散步和市中心游客氛围当作反复重点、并能接受人流的人；原法租界区域的准确地址适合把林荫街道、咖啡馆和社区早晚当作住宿目的的人。" },
    { question: "住外滩合适吗？", answer: "合适，前提是你会在清晨、深夜或多次使用江边和南京东路。上海官方报道显示南京东路周末客流可能非常大，所以要核实下车点、行李路线和安静一侧的房间，并记住“外滩景观房”和“步行到外滩的酒店”是两种不同产品。" },
    { question: "原法租界是一个区吗？", answer: "不是。预订平台把这个标签用于很宽的一片街道和多个地铁站；常熟路附近的酒店和新天地或交通大学附近的酒店表现完全不同。先标出你在那里要去的三个地点，再选一家有准确可用车站的酒店。" },
    { question: "人民广场站有哪几条地铁线？", answer: "上海政府游客信息写明人民广场站有 1、2、8 号线，官方地铁报道把它列为全网最繁忙的车站之一。要问清哪个出口通往酒店、这个出口对你的同行者是否无障碍，以及还要过几个路口。" },
    { question: "上海酒店会为外国客人办理登记吗？", answer: "会。请直接向准确的那家酒店确认你实际抵达时段的人员和护照办理安排，因为地段有名并不等于深夜入住一定顺畅。" },, {question: "第一次去上海住浦东还是浦西？", answer: "多数第一次去的，住浦西：人民广场、外滩和前法租界都在浦西，大部分要走的景点也在这边。浦东适合以陆家嘴高楼为主的行程，或者要从浦东机场赶早班机的。"}, {question: "Homeground 能在上海机场接我们吗？", answer: "能。我们自己的司机在浦东或虹桥机场、上海各火车站接你，送到酒店门口；付款前书面确认价格，12 小时内回复。"}] },
    { id: "links", type: "internal-links", title: "继续规划", items: [ { label: "上海城市总览", href: "/zh/destinations/shanghai/", description: "在敲定这类细节之前，先决定几个完整游览日、住哪一岸和走哪个门户。" },{ label: "如何判断靠近地铁", href: "/zh/guides/china-hotel-near-metro/", description: "核对准确出口和大堂步行。" }, { label: "核验真正可用的无障碍酒店房", href: "/zh/guides/china-accessible-hotel-room-verification/", description: "核对从路缘到房间的完整通路，不把无障碍标签当作保证。" }, { label: "外国旅客能住中国任何酒店吗？", href: "/zh/guides/foreigners-china-hotel/", description: "分开法律规则、平台显示和物业当前的入住执行。" }, { label: "上海选浦东机场还是虹桥机场", href: "/zh/guides/shanghai-pudong-or-hongqiao-airport/", description: "让酒店匹配正确机场接驳。" }, { label: "国际航班前中国最后一晚", href: "/zh/guides/china-last-night-before-international-flight/", description: "保护离境夜，又不浪费整天。" }, { label: "核验上海二十四小时公园", href: "/zh/guides/shanghai-24-hour-parks-reality-check/", description: "只有在核对准确区域、入口、设施和返程后，才把深夜公共空间加入行程。" }] },
    { id: "sources", type: "sources", title: "官方来源与图片署名", items: [
        {label: "2026 年上海春节假期旅游成绩：接待游客 2,167 万人次", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260224/5d3c35722d5f43b0a7bdc0e16e5e513f.html", publisher: "上海市人民政府", reviewedAt: "2026-08-22"},
        {label: "故宫博物院票务：放票时间与实名规则", url: "https://www.dpm.org.cn/subject_booking/", publisher: "故宫博物院", reviewedAt: "2026-08-22"},
        {label: "2025 年国庆假期首日，故宫 10 月 2 日至 7 日门票已约满", url: "https://www.yicai.com/news/102851899.html", publisher: "第一财经", reviewedAt: "2026-10-19"},{ label: "上海地铁客流官方报道", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20240910/db6a0546907e44409a328e389d2ef969.html", publisher: "上海市人民政府", reviewedAt: "2026-08-12" }, { label: "人民广场1、2、8号线官方参考", url: "https://english.shanghai.gov.cn/en-MuseumsGalleries/20240527/3937ac13043a44f39c2a27506a3d7539.html", publisher: "上海市人民政府", reviewedAt: "2026-08-12" }, { label: "活动期间车站调整官方示例", url: "https://english.shanghai.gov.cn/en-LatestNews/20251231/1b54690a4747486caee0b9d845156187.html", publisher: "上海市人民政府", reviewedAt: "2026-08-12" }, { label: "首图：EditQ拍摄南京东路夜景，CC BY-SA 4.0，已裁切转换", url: "https://commons.wikimedia.org/wiki/File:East_Nanjing_Road_at_night,_Shanghai.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" }] },
  ],
} as const satisfies StructuredPageBody;

export default body;
