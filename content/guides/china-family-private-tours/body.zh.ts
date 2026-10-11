import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Homeground 的中国亲子团是私家团：每个城市一位英语导游、一辆车，只服务你们一家，线路和节奏围绕孩子来定。公布价从8天北京、西安、上海线起，6人同行每人¥7,730。8至12人的团每人会低不少，按整团报价。儿童单独报价，把孩子的年龄告诉我们，付款前你会先拿到完整行程和全家总价的书面确认。" },
    { id: "included-heading", type: "heading", level: 2, text: "一家人能得到什么" },
    { id: "included-list", type: "list", items: [
      "专属导游和专车。游览日的英语地陪导游和车辆只服务你们一家，预订前可以和我们商量休息点和优先想看的地方。",
      "每晚酒店含早餐。房型和儿童用床在付款前书面确认。",
      "城市之间的长途交通已订好。高铁和境内航班都含在价格里，出发有司机送，到达有司机接。",
      "门票不用操心。线路写明的首道门票已含，行程内景点的预约不另收服务费。",
      "先给书面方案。线路、酒店和总价你先看到，再决定。"
    ] },
    { id: "limits", type: "callout", tone: "neutral", title: "询价前先了解", body: "导游是每个城市各一位，不是全程跟团。公布价按2人、4人或6人成人、两人一间计算。7至12人的团、一家3口或5口，以及每个孩子，都另行报价。主要景点要走路、爬台阶，长城和张家界尤其如此，请告诉我们每位同行人能轻松走多久。" },
    { id: "routes-heading", type: "heading", level: 2, text: "家庭最常问的五条线路" },
    { id: "routes-table", type: "table", caption: "适合家庭的私家团线路与每人价格（含英语导游）", columns: ["线路", "天数", "为什么适合家庭", "6人同行"], rows: [
      ["北京、西安、上海", "8", "用最短的时间看慕田峪长城、故宫和兵马俑，西安到上海坐飞机，不用坐六小时火车。行程里没有休息日。", "¥7,730"],
      ["北京、西安、桂林、上海", "10", "多了漓江游船到阳朔，在几座大城市之后换个节奏。", "¥10,850"],
      ["北京、杭州、苏州、上海", "11", "没有境内航班，只坐火车和专车。西湖游船、茶村、一座苏州园林和一座水乡古镇。", "¥10,010"],
      ["北京、西安、成都、桂林、上海", "14", "熊猫线：开园不久就到成都大熊猫基地，这时熊猫通常比较活跃；还有漓江游船和遇龙河竹筏。", "¥15,340"],
      ["北京、西安、张家界、桂林、上海", "14", "适合大一些的孩子：张家界的阿凡达山峰和天门山。即使坐电梯和索道，也要在步道和台阶上走几个小时。", "¥15,790"]
    ] },
    { id: "routes-copy", type: "paragraph", text: "以上是6人同行的公布价。两家人一起走，或8至12人的团，每人会低不少，告诉我们人数，我们按整团报价。一家4口每人会高一些，例如8天线每人¥8,510。想留一天休息的话，14天线比8天和10天线更有余地。你的报价取决于出行日期、所选酒店和孩子的年龄。" },
    { id: "children-heading", type: "heading", level: 2, text: "带孩子怎么计价" },
    { id: "children-copy", type: "paragraph", text: "儿童没有固定的价目表。每个孩子按年龄和行程中的实际需要单独报价；人数不是2人、4人或6人的家庭也会单独报价。询价时请把孩子的年龄和用房需求一起发来，这样书面报价覆盖的是全家，而不只是成人。" },
    { id: "booking-heading", type: "heading", level: 2, text: "怎么预订" },
    { id: "booking-list", type: "list", ordered: true, items: [
      "告诉我们出行月份、孩子的年龄，以及想走的线路或大概天数。",
      "规划师按你的日期核对酒店、导游和门票，然后发来带总价的书面方案。",
      "由你决定。拿到写明包含项目的书面确认之后才付款。"
    ] },
    { id: "tours", type: "internal-links", title: "查看线路详情", items: [
      { label: "北京、西安、上海8天私家团", href: "/zh/tours/beijing-xian-shanghai-8-day-private-tour/" },
      { label: "北京、西安、桂林、上海10天私家团", href: "/zh/tours/beijing-xian-guilin-shanghai-10-day-private-tour/" },
      { label: "北京、杭州、苏州、上海11天私家团", href: "/zh/tours/beijing-hangzhou-suzhou-shanghai-11-day-private-tour/" },
      { label: "北京、西安、成都、桂林、上海14天私家团", href: "/zh/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/" },
      { label: "北京、西安、张家界、桂林、上海14天私家团", href: "/zh/tours/beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour/" },
      { label: "带年幼孩子怎么规划中国行程", href: "/zh/guides/china-itinerary-with-young-children/" },
      { label: "全部私家团公布价", href: "/zh/guides/china-private-tour-prices/" }
    ] },
    { id: "faq", type: "faq", title: "家庭常问的问题", items: [
      { question: "中国亲子私家团多少钱？", answer: "Homeground 的私家团公布价：8天北京、西安、上海线6人同行每人¥7,730起；含成都熊猫的14天线6人同行每人¥15,340。一家4口在这两条线上每人分别是¥8,510和¥17,030。8至12人的团每人更低，另行报价。价格包含每晚含早酒店、游览日的专属导游和车辆、写明的门票，以及城市之间的火车和航班。儿童单独报价。" },
      { question: "带孩子去中国，走哪条线最好？", answer: "看你们有几天、孩子多大。有14天的话，北京、西安、成都、桂林、上海线多了熊猫基地和一天游船。只有8天，北京、西安、上海线能看到长城、故宫和兵马俑。不想坐境内航班，可以选11天的北京、杭州、苏州、上海线，全程只有火车和专车。" },
      { question: "儿童参加私家团有优惠吗？", answer: "公布价里没有固定的儿童价。每个孩子按年龄和行程中的实际需要单独报价，所以询价时请附上年龄，书面报价会覆盖全家。" },
      { question: "带孩子，私家团比拼团更好吗？", answer: "私家团的导游和车辆只服务你们一家，节奏、停留和出发时间都由你们定。如果更看重预算，其中两条14天线路也有小团出发，每人¥13,910起。" },
      { question: "一家人去中国需要几天？", answer: "走北京、西安、上海最短的公布线路是8天，没有休息日。带孩子的话10到14天更从容：14天线更容易留出一天休息，还能加上熊猫或漓江。" },
      { question: "祖父母可以一起去吗？", answer: "可以。请告诉我们同行人的年龄、需要的房间，以及每位同行人能轻松走多久。园林、寺庙、长城和张家界都有台阶和不平的路面，预订前我们会按这些情况核对方案。" },
      { question: "亲子团的景点门票由你们订吗？", answer: "是的。每条线路写明的首道门票已含在价格里，行程内景点的预约由我们来做，不另收服务费。" },
    ] },
    { id: "sources", type: "sources", title: "价格、包含项目与图片", items: [
      { label: "公布价与包含项目：北京、西安、上海8天私家团", url: "https://homegroundchina.com/zh/tours/beijing-xian-shanghai-8-day-private-tour/", publisher: "Homeground China", reviewedAt: "2026-10-11" },
      { label: "公布价与包含项目：含成都的14天私家团", url: "https://homegroundchina.com/zh/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/", publisher: "Homeground China", reviewedAt: "2026-10-11" },
      { label: "全部私家团公布价", url: "https://homegroundchina.com/zh/guides/china-private-tour-prices/", publisher: "Homeground China", reviewedAt: "2026-10-11" },
      { label: "首图：George Lu 拍摄的成都大熊猫基地熊猫，CC BY 2.0，已缩小", url: "https://commons.wikimedia.org/wiki/File:Panda_in_Chengdu_Research_Base_of_Giant_Panda_Breeding_-_7708872342.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-10-11" },
      { label: "首图许可证：CC BY 2.0", url: "https://creativecommons.org/licenses/by/2.0/", publisher: "Creative Commons", reviewedAt: "2026-10-11" }
    ] }
  ]
} satisfies StructuredPageBody;

export default body;
