import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Homeground 的中国亲子团是私家团：每个城市一位英语导游、一辆车，只服务你们一家，线路和节奏围绕孩子来定。公布价是成人参考价：8天北京、西安、上海线，6位成人同行、两人一间双床房，每位成人¥7,730起；8至12人的团每人更低，按整团报价。儿童按年龄另行报价，付款前你会先拿到完整行程和全家总价的书面确认。国际机票不含在内。" },
    { id: "routes-heading", type: "heading", level: 2, text: "家庭最常问的五条线路" },
    { id: "routes-intro", type: "paragraph", text: "五条线路的基础相同：含早餐的四星标准酒店、每个城市的专属导游和车辆，以及城市之间的火车或航班。不同的是能看多少地方、每天留多少余地。想留一天休息的话，14天线比8天和10天线更有余地。" },
    { id: "family-routes-table", type: "table", caption: "适合家庭的私家团线路与每位成人价格（含英语导游）", columns: ["线路", "天数", "适合谁、节奏如何", "6位成人同行·每位成人"], rows: [
      ["北京、西安、上海", "8", "时间不多时的第一次中国行：慕田峪长城、故宫和兵马俑，西安到上海坐飞机，不用坐六小时火车。节奏紧凑，行程里没有休息日。", "¥7,730"],
      ["北京、西安、桂林、上海", "10", "多了漓江游船到阳朔，在几座大城市之后换个节奏。", "¥10,850"],
      ["北京、杭州、苏州、上海", "11", "适合不想坐境内航班的家庭：只坐火车和专车。西湖游船、茶村、一座苏州园林和一座水乡古镇。", "¥10,010"],
      ["北京、西安、成都、桂林、上海", "14", "熊猫线：开园不久就到成都大熊猫基地，这时熊猫通常比较活跃；还有漓江游船，水位和运营方允许时乘遇龙河竹筏。", "¥15,340"],
      ["北京、西安、张家界、桂林、上海", "14", "适合大一些、愿意走路的孩子：张家界的阿凡达山峰和天门山。即使坐电梯和索道，也要在步道和台阶上走几个小时。", "¥15,790"]
    ], rowLinks: [
      "/zh/tours/beijing-xian-shanghai-8-day-private-tour/",
      "/zh/tours/beijing-xian-guilin-shanghai-10-day-private-tour/",
      "/zh/tours/beijing-hangzhou-suzhou-shanghai-11-day-private-tour/",
      "/zh/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/",
      "/zh/tours/beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour/"
    ] },
    { id: "prices-heading", type: "heading", level: 2, text: "价格怎么算" },
    { id: "prices-copy", type: "paragraph", text: "表中每个价格都是每位成人的价格，不是一家人的价格；6位成人同行、两人一间双床房是主要参考。整团费用按成人人数相乘，儿童另外报价。书面报价会列出全家总价，具体取决于出行日期、所选酒店和孩子的年龄。" },
    { id: "family-price-table", type: "table", caption: "按同行人数看价格怎么定（以8天线为例）", columns: ["同行人", "怎么计价", "8天线"], rows: [
      ["6位成人，两人一间双床房", "主要参考：上表中的每位成人价", "每位成人¥7,730；6人共¥46,380"],
      ["4位成人，两人一间双床房", "4人同行的每位成人公布价", "每位成人¥8,510；4人共¥34,040"],
      ["8至12人，例如两家人同行", "补充参考：每人比6人同行更低，按整团报价", "整团书面报价"],
      ["儿童", "按每个孩子的年龄和用房、用床需求逐一报价", "计入全家总价"],
      ["两位成人带孩子，或其他人数", "没有公布价档位：成人和儿童一起报价", "付款前给全家书面报价"]
    ] },
    { id: "included-heading", type: "heading", level: 2, text: "线路价格包含什么" },
    { id: "family-included-comparison", type: "comparison", columns: [
      { heading: "五条线路都包含", items: [
        "含早餐的酒店住宿，四星标准、两人一间双床房。酒店名称、房型和儿童用床在付款前书面确认。",
        "游览日的英语地陪导游和车辆只服务你们一家；坐火车或飞机时，出发有司机送，到达有司机接。",
        "行程中城市之间的火车和境内航班。11天线只坐火车。",
        "线路写明的首道门票；行程内景点的预约不另收服务费。"
      ] },
      { heading: "不包含", items: [
        "往返中国的国际航班",
        "午餐、晚餐和饮料",
        "旅行保险、签证、小费及个人消费",
        "房型升级、法定节假日附加费和单房差"
      ] }
    ] },
    { id: "limits", type: "callout", tone: "neutral", title: "询价前先了解", body: "导游是每个城市各一位，不是全程跟团；预订前可以和我们商量休息点和优先想看的地方。主要景点要走路、爬台阶，长城和张家界尤其如此，请告诉我们每位同行人能轻松走多久。" },
    { id: "booking-heading", type: "heading", level: 2, text: "怎么拿到全家报价" },
    { id: "booking-list", type: "list", ordered: true, items: [
      "告诉我们出行月份、想走的线路或大概天数、每位同行人的年龄和需要的房间。",
      "规划师按你的日期核对酒店、导游和门票，然后发来列明全家总价的书面方案。",
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
      { question: "中国亲子私家团多少钱？", answer: "Homeground 的私家团公布价按每位成人计算：6位成人同行、两人一间双床房时，8天北京、西安、上海线每位成人¥7,730起；含成都熊猫的14天线每位成人¥15,340。4位成人同行、两人一间双床房时，这两条线路的公布价分别是每位成人¥8,510和¥17,030。8至12人的团每人更低，另行报价。儿童单独报价，带儿童的家庭会按孩子年龄和用房需求拿到一份全家书面总价。价格包含每晚含早酒店、游览日的专属导游和车辆、写明的门票，以及城市之间的火车和航班；国际机票不含在内。" },
      { question: "带孩子去中国，走哪条线最好？", answer: "看你们有几天、孩子多大。有14天的话，北京、西安、成都、桂林、上海线多了熊猫基地和一天游船。只有8天，北京、西安、上海线能看到长城、故宫和兵马俑。不想坐境内航班，可以选11天的北京、杭州、苏州、上海线，全程只有火车和专车。" },
      { question: "儿童参加私家团有优惠吗？", answer: "公布价里没有固定的儿童价。每个孩子按年龄和行程中的实际需要单独报价，所以询价时请附上年龄，书面报价会覆盖全家。" },
      { question: "带孩子，私家团比拼团更好吗？", answer: "私家团的导游和车辆只服务你们一家，节奏、停留和出发时间都由你们定。如果更看重预算，其中两条14天线路也有小团出发，每人¥17,220起。" },
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
