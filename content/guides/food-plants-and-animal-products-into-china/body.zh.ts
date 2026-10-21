import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";
const tour8 = "beijing-xian-shanghai-8-day-private-tour";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "大多不能带。中国官方的禁止携带、寄递进境名录里有：肉类（生熟都算，牛肉干、萨拉米、火腿也在内）、动物源性乳及乳制品（奶酪、黄油、酸奶）、蛋及其制品（包括咸蛋黄）、新鲜水果蔬菜、种子和土壤。行李和邮寄一样适用。真空包装、免税店的袋子、“只是一点小礼物”，都改变不了结果。饼干、咖啡、茶叶、果干这类包装好的植物性零食不在名录里，但仍要看实际成分，装箱前把配料表读完。拿不准的，申报并走红色通道。" },
  { id: "answer", type: "callout", title: "大多数行李，一条规则就能判断", tone: "decision", body: "看东西里面是什么，不看包装。含肉、动物奶或蛋的，或者是新鲜果蔬、种子、土壤，就留在家里。看不出里面是什么的，也留在家里。" },
  { id: "quick-heading", type: "heading", level: 2, text: "奶酪、牛肉干、水果和零食，能带进中国吗？" },
  { id: "quick-table", type: "table", caption: "常见食品对照中国禁止携带名录（第 470 号公告）", columns: ["食品", "能不能装进行李", "原因"], rows: [
    ["各种奶酪，包括硬奶酪、真空包装或免税店买的", "不能", "动物源性乳及乳制品在名录里，奶酪是点名列出的"],
    ["牛肉干、萨拉米、火腿、香肠、肉松", "不能", "生熟肉类及其制品都在名录里，风干、腌制都不例外"],
    ["肉罐头、罐装或常温奶", "不能", "罐头不是例外：肉罐头还是肉，罐装奶还是乳制品"],
    ["鸡蛋、咸蛋黄零食、蛋黄酱", "不能", "名录点名列出鲜蛋、咸蛋、皮蛋、蛋液和蛋黄酱"],
    ["新鲜水果蔬菜，包括飞机上发的水果", "不能", "新鲜水果、蔬菜在名录里"],
    ["果干、番石榴膏（goiabada）、果酱", "通常可以，先检查", "加工过的水果不是新鲜水果，但有繁殖能力的种子在名录里，也要看有没有动物成分"],
    ["饼干、巧克力、咖啡、茶叶、方便面", "通常可以，先检查", "名录没有点名；看配料表和调料包里有没有肉、蛋、奶"],
    ["虾米、鱼干零食、虾酱、鱼露", "通常可以，先检查", "鲜活、冰鲜冷冻的水产品不能带；名录把干制、熟制，以及发酵后制成的食用酱汁类水生动物产品列为例外。海关仍会现场检疫，濒危物种照样禁止，数量也要是自用合理的"],
    ["燕窝", "只有经商业无菌处理的罐头装燕窝可以", "名录只排除这一种；散装或干燕窝仍然禁止"]
  ] },
  { id: "quick-note", type: "paragraph", text: "托运行李、手提行李和邮寄包裹，适用同一份名录。把奶酪从托运箱挪到随身包里，或者寄到酒店，都不会因此变成可以带。" },
  { id: "traps-heading", type: "heading", level: 2, text: "很多人到了海关才知道的八件事" },
  { id: "traps-list", type: "list", ordered: true, items: [
    "免税不等于能带。飞中国途中在机场免税区买的奶酪或火腿，和别的奶酪火腿一样，都在名录里。",
    "餐盘上的水果也算。新鲜水果不管从哪来都在名录里，在飞机上吃掉，或者留在餐盘上。",
    "咸蛋黄月饼和咸蛋黄零食属于蛋制品。名录点名列出咸蛋，要看馅料，不能只看盒子。",
    "方便面调料包常含牛肉、鸡肉或蛋。要看调料包，不能只看外包装正面。",
    "中药材也可能在名录里。名录点名列出动物源性中药材，拱北海关的答疑也明确，这类药材禁止携带进境。",
    "种子会藏在纪念品里。种子手串、种子包，凡是还有繁殖能力的，都算繁殖材料。",
    "烟叶在名录里，鲜切花、土壤也在，包括植物根部带的土。",
    "申报不会让禁止物品变成可以带。2025 年 4 月 1 日起施行的行李申报规定（海关总署 2025 年第 43 号公告）要求，携带动植物及其产品入境必须申报；按《进出境动植物检疫法》第二十九条，名录所列物品作退回或者销毁处理。照样要申报：不申报本身就是违规。"
  ] },
  { id: "special-heading", type: "heading", level: 2, text: "宠物、药品，和别人帮你装的礼物" },
  { id: "special-list", type: "list", items: [
    "猫、犬入境必须有输出国家或地区官方出具的动物检疫证书和疫苗接种证书，每人限一只。这是正式手续，不是行李问题。",
    "药品和传统药方可能含动物、植物或濒危物种成分。检疫只是其中一层，药品和野生动植物的规定也可能适用。",
    "亲友帮你装的礼盒要打开，问清每样馅料是什么。东西在你包里，申报的人就是你。",
    "任何获批的例外，都要在出发前拿到审批许可和官方检疫证书。商店标签或卖家邮件不是许可。"
  ] },
  { id: "arrival-heading", type: "heading", level: 2, text: "在飞机上和在海关大厅" },
  { id: "arrival-table", type: "table", caption: "走绿色通道之前，先把拿不准的东西处理好", columns: ["时间点", "这样做", "别这样做"], rows: [
    ["落地前", "吃完或交回机上发的水果和食物", "放进口袋，打算之后再说"],
    ["选通道之前", "把每个包过一遍，包括别人帮你装的礼物", "以为托运行李不会被查"],
    ["东西属于禁止类，或者拿不准", "申报，走红色通道", "觉得量少就走绿色通道"],
    ["关员要求检查", "如实出示物品和标签", "藏起一部分，或交给同行的人"],
    ["物品不准入境", "按关员指示处理，保留海关给你的处理单据", "争辩说自己已经申报了"]
  ] },
  { id: "after-customs-heading", type: "heading", level: 2, text: "海关是一道关，景点还有一道，要在出发前办" },
  { id: "tickets-urgency", type: "paragraph", text: "打包可以拖到起飞前一晚，故宫门票不行。故宫当天不卖票，参观前 7 天北京时间 20:00 放票，每人用自己的护照实名预约。2025 年国庆假期第一天（10 月 1 日），故宫预约页面就已显示 10 月 2 日至 7 日全部约满。参观前至少 8 天把需求交给我们并付款，就在预约保证范围内：约不上，服务费和门票钱全额退还。等到只剩不到 8 天再找我们，这份保证就用不上了。" },
  { id: "before-list", type: "list", ordered: true, items: [
    "对照上面的表检查每样食品、礼物和纪念品，拿不准的拿出来。",
    "机票和第一晚酒店订好后，在网上免费填好入境卡。",
    "预约那些只提前几天放票的景点；行程有北京，就先订故宫。",
    "安排好从机场到酒店怎么走，落地前就把在中国的第一个小时定下来。"
  ] },
  { id: "handoff-options", type: "comparison", title: "这些事可以交给我们", columns: [
    { heading: "到达口有司机等你", body: "走出海关大厅，司机就在到达口等你：送你到酒店的专车，中国大陆任何城市都能安排。", items: ["司机是我们自己的，你出到达口时就在。", "按你的航班报价，付款前书面确认。"] },
    { heading: `私人导游：每天${bodyGuideRate("xian", "zh")}起`, body: `持证英文导游，最多 8 小时：西安、张家界${bodyGuideRate("xian", "zh")}起，北京、上海${bodyGuideRate("beijing", "zh")}起，旺季日期更高。按每位导游计价，不是按人头。需要中文导游也可以安排，价格在报价里确认。`, items: ["按整天预订，不按小时。", "交通、门票和餐食另行报价。"] },
    { heading: `整趟行程：每人${bodyTourPrice(tour8, 6, "zh")}起`, body: `北京、西安、上海 8 天私家团，2 人出行每人${bodyTourPrice(tour8, 2, "zh")}，6 人每人${bodyTourPrice(tour8, 6, "zh")}；加上成都和桂林的 14 天路线，2 人每人${bodyTourPrice(tour14, 2, "zh")}。`, items: ["含早餐的四星酒店、游览日的私人导游和专车、全部接送、城市之间的火车和航班，以及行程里的实名门票。", "如果我们订不到故宫或天安门，退还你已付的全部费用，前提是故宫参观前至少 8 天把护照信息发给我们。"] }
  ] },
  { id: "handoff-links", type: "internal-links", title: "交给我们安排", items: [
    { label: "预约接机", href: "/zh/services/private-car-and-driver/", description: "中国大陆任何城市。告诉我们航班号和行李件数。" },
    { label: "查看北京、西安、上海 8 天路线", href: "/zh/tours/beijing-xian-shanghai-8-day-private-tour/", description: "每日安排、酒店和公开价格表。" },
    { label: "请一位导游陪一天", href: "/zh/services/private-english-speaking-guides/", description: "北京、上海、西安、张家界的价格。" },
    { label: "让规划师安排整趟行程", href: "/zh/services/full-trip-support/", description: "告诉我们日期和预算，提交行程需求免费。" }
  ] },
  { id: "how-to-book", type: "callout", tone: "decision", title: "怎么预订", body: "在上面任何一个页面，通过 WhatsApp 或邮件告诉我们日期、人数和想看的地方。规划师 12 小时内回复，付款前你会先收到书面报价；从第一次回复到你旅行的最后一天，都是同一位规划师跟进。预订时用支付宝或 VBill 付 30% 定金，余款到了中国再付，我们不另收手续费。Homeground China 是持证旅行社（许可证 L-BJ10587），导游和司机都是我们自己的，行程不进购物店。" },
  { id: "faq", type: "faq", title: "打包前常见的问题", items: [
    { question: "奶酪能带进中国吗？", answer: "不能。动物源性乳及乳制品在中国的禁止携带名录里，奶酪是点名列出的。硬奶酪、软奶酪、真空包装、免税店买的都算，托运和手提一样。" },
    { question: "牛肉干、萨拉米或其他肉制品能带进中国吗？", answer: "不能。名录覆盖生熟肉类及其制品，不论包装。风干、腌制或商业密封都不会产生例外。" },
    { question: "零食、巧克力、方便面能带吗？", answer: "不含肉、蛋、奶的包装零食不在名录里，通常没问题。把配料表读完，包括调料包，拿不准的就申报。" },
    { question: "飞机上发的水果能带出机场吗？", answer: "不能。新鲜水果蔬菜不管从哪来都在名录里。在飞机上吃掉，或者交给乘务员。" },
    { question: "海关查到不该带的食品会怎样？", answer: "不论有没有申报，禁止物品都可以按关员指示退回或销毁。申报了，事情简单；不申报，又多出一个问题。" },
    { question: "Homeground 能来机场接我们吗？", answer: "能。中国大陆任何城市，我们都可以派自己的司机和专车在到达口接你。告诉我们航班号、人数和行李件数，付款前书面确认价格，12 小时内回复。" }
  ] },
  { id: "links", type: "internal-links", title: "把入境检查做完", items: [
    { label: "中国海关红绿通道", href: "/zh/guides/china-customs-red-green-channels/", description: "检查完行李，再选对通道。" },
    { label: "中国网上入境卡", href: "/zh/guides/china-online-arrival-card/", description: "落地前在官方渠道免费填好。" },
    { label: "充电宝坐飞机和高铁的规定", href: "/zh/guides/china-power-bank-rules-flights-trains/", description: "另一项常让人卡住的行李检查。" },
    { label: "在中国吃素", href: "/zh/guides/vegetarian-vegan-china-travel/", description: "菜里藏着什么，用餐怎么安排。" }
  ] },
  { id: "sources", type: "sources", title: "已核对的官方来源", items: [
        {"label": "海关答疑：干制水产品、鱼胶、海参与动物药材能否携带进境", "url": "https://paper.people.com.cn/hwbwap/html/2024-08/24/content_26076641.htm", "publisher": "拱北海关，人民日报海外版", "reviewedAt": "2026-10-20"},
        {"label": "《中华人民共和国进出境动植物检疫法》第二十九条：名录所列物品作退回或者销毁处理", "url": "https://fgw.sh.gov.cn/cmsres/3f/3f141f71412c4c20a1eb2eadf1ef57c3/ac1a1bae6b10b9bbc58b67c4df2e3bd8.pdf", "publisher": "上海市发展和改革委员会公布的法律文本", "reviewedAt": "2026-10-20"},
    { label: "第 470 号公告：中华人民共和国禁止携带、寄递进境的动植物及其产品和其他检疫物名录", url: "https://npc.chinaport.gov.cn/npcdeclhome/home/pages/notice/%E7%AE%A1%E9%99%90%E7%9B%AE%E5%BD%95.html", publisher: "中国电子口岸 / 海关总署", reviewedAt: "2026-10-20" },
    { label: "第 470 号公告：适用范围（携带、托运和寄递）与动态调整", url: "https://xmsyj.moa.gov.cn/gjjlhz/202111/t20211102_6381054.htm", publisher: "农业农村部 / 海关总署", reviewedAt: "2026-09-09" },
    { label: "海关总署 2025 年第 43 号公告：进出境旅客行李物品申报", url: "https://app.www.gov.cn/govdata/gov/202504/05/526129/article.html", publisher: "海关总署", reviewedAt: "2026-09-09" },
    { label: "故宫博物院票务：放票时间与实名规则", url: "https://www.dpm.org.cn/subject_booking/", publisher: "故宫博物院", reviewedAt: "2026-08-22" },
    { label: "2025 年国庆假期首日，故宫 10 月 2 日至 7 日门票已约满", url: "https://www.yicai.com/news/102851899.html", publisher: "第一财经", reviewedAt: "2026-10-19" }
  ] }
] } as const satisfies StructuredPageBody;

export default body;
