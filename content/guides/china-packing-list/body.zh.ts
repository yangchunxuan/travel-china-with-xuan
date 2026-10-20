import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "lead", type: "lead", text: "在中国玩 7 到 14 天，带大约五天的衣服，每三四天洗一次；一个主行李箱加一个随身小包就够。穿舒服、随意的叠穿衣服和已经穿惯的步行鞋：中国城市的穿着很随意，大多数游览日都要走很多路、爬不少台阶。其余按行程里最冷、最湿的那一站来准备，而不是按“中国”来准备。护照、药品和充电用品放在随身的包里。挑行李箱之前，先看下面高铁的尺寸限制。"},
    {
      "id": "bag-choice",
      "type": "callout",
      "tone": "decision",
      "title": "一件主行李＋一个日用小包",
      "body": "选择自己能在车站顺利推行、遇到几级台阶也能搬动的主行李；需要协助就提前安排。符合航空公司重量限制，不代表适合频繁换酒店的路线。小包也要计入实际机票允许的手提行李件数和重量，不能默认多带一件免费。"
    },
    {
      "id": "carry-heading",
      "type": "heading",
      "level": 2,
      "text": "这些东西放进随身包"
    },
    {
      "id": "carry-list",
      "type": "list",
      "items": [
        "水瓶空着过安检，进去再接水；液体要放托运行李的，先查航空公司的规定。",
        "预订时使用的护照原件或其他获认可的证件，以及本次路线要求的签证、入境和转机材料。备份另存，不能代替原件。",
        "离线保存的航班、车次信息，首家酒店的中文名称和地址，保险信息，以及手机连接出问题时能联系到的人。",
        "手机、充电线、适配的充电器和转换插头。充电宝先核对机身标签、型号及每一段交通的规定，再决定是否携带。",
        "已核实可入境、可携带的常用药，保留标签包装及相关处方或医疗说明。眼镜和其他难以临时替代的必需品也放这里。",
        "一张支付卡和适量现金，与手机分开放。移动支付账户在出发前准备好。",
        "一套替换内衣、一件轻便上衣，以及抵达时要穿的外层衣物。即使托运行李晚到，也能给手机充电并换上干净衣服。",
        "纸巾、少量洗漱用品和空水瓶。液体、凝胶、喷雾装进随身包前，按出发机场的手提行李规则检查。"
      ]
    },
    {
      "id": "documents-links",
      "type": "internal-links",
      "title": "先准备好这些关键事项",
      "items": [
        {
          "label": "护照有效期与空白页怎么核对",
          "href": "/zh/guides/china-passport-validity-and-blank-pages/"
        },
        {
          "label": "来中国前准备支付方式",
          "href": "/zh/guides/how-to-pay-in-china-as-a-tourist/"
        },
        {
          "label": "选择eSIM、本地SIM卡或漫游",
          "href": "/zh/guides/china-esim-vs-local-sim/"
        }
      ]
    },
    {id: "traps-heading", type: "heading", level: 2, text: "在中国打包，常让人意外的五件事"},
    {id: "traps-list", type: "list", ordered: true, items: ["大行李箱可能上不了高铁。中国铁路规定成人免费携带品 20 千克，乘坐动车组列车时，每件物品长、宽、高之和不超过 130 厘米。常见的大号托运箱都超过这个尺寸，不少中号箱也超：65 × 45 × 27 厘米的箱子，加起来就是 137 厘米。行程坐火车的，装箱前先量一下尺寸。", "酒店房间里可能没有牙刷。按国家的塑料污染治理要求，2025 年底起所有宾馆、酒店、民宿都不再主动提供一次性塑料用品。需要就到前台要，或者自己带牙刷、剃须刀和梳子。", "坐国际航班带进来的充电宝，坐国内航班不一定能带。2025 年 6 月 28 日起，没有 3C 标识或标识不清、被召回型号批次的充电宝，不能带上中国境内航班。在国外买的充电宝可能根本没有 3C 标识，先看机身标签。", "插头插得进，电器不一定扛得住。中国内地插座是 220 伏、50 赫兹；看每个充电器上的输入（INPUT）范围，转换插头只改插头形状，不改电压。", "食品礼物是海关的问题，不只是打包的问题。奶酪、肉类、蛋制品和新鲜水果，不论怎么包装，都在中国的禁止携带名录里；装箱前先查清楚。"]},
    {
      "id": "clothes-heading",
      "type": "heading",
      "level": 2,
      "text": "7–14天旅行的基础衣物清单"
    },
    {
      "id": "clothes-intro",
      "type": "paragraph",
      "text": "下面按一位成人、城市游为主、每隔几天洗一次衣服来列基础数量，已经包含坐飞机时穿在身上的那套。尽量选能互相搭配的衣物，再补上路线所需的季节装备。"
    },
    {
      "id": "clothes-table",
      "type": "comparison",
      "title": "可轮换穿着的基础衣物，含出发当天所穿",
      "columns": [
        {
          "heading": "日常上衣",
          "body": "基础数量: 4–5件",
          "items": [
            "好洗、适合走路，其中一件可以兼顾稍正式的晚餐。"
          ]
        },
        {
          "heading": "长裤、裙子等下装",
          "body": "基础数量: 2件",
          "items": [
            "能搭配多件上衣；用途相同的厚重裤子不用带两条。"
          ]
        },
        {
          "heading": "内衣",
          "body": "基础数量: 5–7套替换量",
          "items": [
            "洗衣时间不确定时，按较多的数量准备。"
          ]
        },
        {
          "heading": "袜子",
          "body": "基础数量: 4–5双",
          "items": [
            "与步行鞋搭配；活动量很大时可再加一双。"
          ]
        },
        {
          "heading": "睡衣",
          "body": "基础数量: 1套",
          "items": [
            "轻便即可，与外出衣物分开放。"
          ]
        },
        {
          "heading": "轻薄保暖层",
          "body": "基础数量: 1件",
          "items": [
            "用于偏凉的夜晚或空调较强的室内。"
          ]
        },
        {
          "heading": "防雨用品",
          "body": "基础数量: 1件轻便雨衣或折叠伞",
          "items": [
            "按路线选择；走台阶时，雨衣能腾出双手。"
          ]
        },
        {
          "heading": "鞋",
          "body": "基础数量: 1双穿习惯的步行鞋",
          "items": [
            "转场时穿在脚上。确有海边、泳池等用途，再加一双轻便鞋。"
          ]
        }
      ]
    },
    {
      "id": "case-extras",
      "type": "paragraph",
      "text": "再放牙刷、日常护肤品、止汗用品等个人洗漱物品，按旅行天数带适量，并做好防漏。带一个小洗衣袋和一个可折叠袋，分装脏衣或湿物。有游泳安排再带泳衣。吹风机可先问酒店是否提供，减少功能重复的小电器。"
    },
    {
      "id": "laundry-heading",
      "type": "heading",
      "level": 2,
      "text": "用途中洗衣减轻两周行李"
    },
    {
      "id": "laundry-list",
      "type": "list",
      "items": [
        "7天旅行可在第3或第4天洗一次；14天可安排两到三次，大致每4天一次，再按活动量和天气调整。",
        "把洗衣放在连住至少两晚的酒店。提前确认有自助洗衣机、烘干机还是收费送洗，使用时间和取衣时间分别是什么。",
        "不要等最后一套干净衣服穿完才洗。给第二天留一套干衣服，并在换酒店前取回全部衣物。",
        "不要指望厚棉上衣或牛仔裤挂在浴室里一夜就干。没有可靠烘干条件时，选较轻薄的面料，或适当增加衣物。",
        "不打算洗衣，就按天数增加内衣与上衣，装好称重后再决定箱子大小。两周每天一整套新搭配会增加行李，但不是旅行的必需条件。"
      ]
    },
    {
      "id": "day-heading",
      "type": "heading",
      "level": 2,
      "text": "每天出门，小包里装什么"
    },
    {
      "id": "day-copy",
      "type": "paragraph",
      "text": "游览时把大箱子留在住处。小包放当天需要核验的预订证件、手机、备用支付方式、饮用水、纸巾、当天必要药品，以及这次出行需要的防雨或保暖层。户外暴露时间较长时，再加帽子和防晒用品。备用鞋、整瓶洗漱用品和一周衣物留在酒店。"
    },
    {
      "id": "summer-heading",
      "type": "heading",
      "level": 2,
      "text": "夏季增量：防晒、防雨与换洗"
    },
    {
      "id": "summer-copy",
      "type": "paragraph",
      "text": "夏季城市游优先选轻薄、方便清洗的上衣和舒适下装。加上遮阳帽、太阳镜、防晒用品和轻便雨具，薄外套仍然保留。如果走路出汗后想换衣服，可以多带一件上衣和一套内衣，或增加洗衣次数。凉鞋可以作为第二双鞋，但不要让一双没穿习惯的凉鞋承担所有长时间步行。"
    },
    {
      "id": "winter-heading",
      "type": "heading",
      "level": 2,
      "text": "冬季增量：按最冷的一站准备"
    },
    {
      "id": "winter-copy",
      "type": "paragraph",
      "text": "去寒冷的北方城市，可增加保暖内层、中间保温层、厚外套、帽子、手套和围巾或脖套。鞋底要有合适的抓地力，鞋内也要留出穿合适厚袜子的空间。转场时方便的话把厚外套穿在身上；离开抵达航站楼前，要能随手拿到。"
    },
    {
      "id": "winter-variation",
      "type": "paragraph",
      "text": "哈尔滨的冰雪游览比短时间城市散步更需要完整的防寒准备：保暖鞋、暖袜，以及多次户外活动后可替换的干燥衣物。海南度假的行李则不同，其他站点不需要时，不必带整套冰雪装备。按具体地点与临近预报选衣服，不能只看“中国冬天”四个字。"
    },
    {
      "id": "mountain-heading",
      "type": "heading",
      "level": 2,
      "text": "山地增量：把保暖层带上山"
    },
    {
      "id": "mountain-copy",
      "type": "paragraph",
      "text": "有山地步行的观光路线，可增加防风防雨外层、保暖衣，以及放在防水袋里的备用袜子。穿已经走习惯、鞋底适合湿滑或不平台阶的鞋。查看山上本身的情况，不只看住宿城市的天气。出酒店前就把这些衣物放进日用小包，外套留在行李箱里，到观景台时用不上。多日徒步需要另外准备专门的装备清单。"
    },
    {
      "id": "season-link",
      "type": "internal-links",
      "title": "先看路线，再决定穿什么",
      "items": [
        {
          "label": "中国不同气候区如何影响旅行安排",
          "href": "/zh/guides/china-climate-regions-for-trip-timing/"
        }
      ]
    },
    {
      "id": "market-heading",
      "type": "heading",
      "level": 2,
      "text": "从澳大利亚、新加坡或马来西亚出发"
    },
    {
      "id": "market-season",
      "type": "paragraph",
      "text": "澳大利亚与中国分处南北半球：12月离开澳大利亚的夏天，可能直接抵达中国北方的冬天；6月则是相反的季节转换。从新加坡或马来西亚出发，也要按目的地预报准备，不能照家里的天气装箱。抵达后要穿的外层放进随身包，尤其是深夜才能到酒店的行程。"
    },
    {
      "id": "market-plugs",
      "type": "paragraph",
      "text": "新加坡、马来西亚设备如果使用三根矩形插脚的G型插头，要带能接住该插头、也适合中国大陆插座的转换头。澳大利亚I型插脚与中国常见斜脚形式相似，但仍要看实际接触、接地和设备额定参数，不能默认每个插座都适用。逐个看充电器的INPUT输入标签，范围应覆盖220V和50Hz；改变插脚形状的转换头不会改变电压。一个兼容的多口充电器，可以减少随身充电器的数量。"
    },
    {
      "id": "power-link",
      "type": "internal-links",
      "title": "选择合适的转换插头",
      "items": [
        {
          "label": "中国插头、电压与设备标签",
          "href": "/zh/guides/china-power-plugs-voltage-and-adapters/"
        }
      ]
    },
    {
      "id": "rules-heading",
      "type": "heading",
      "level": 2,
      "text": "合上箱子前，处理好这几类物品"
    },
    {
      "id": "baggage-copy",
      "type": "paragraph",
      "text": "逐张看机票上的手提与托运行李额度，单独购买的中国国内航班也要算进去。有些国际机票不含免费托运行李。装好后分别称箱子与随身包，不要按一个想当然的“中国航班额度”选箱子。乘火车时，还要考虑自己怎么搬、上车后怎么放。"
    },
    {
      "id": "battery-copy",
      "type": "paragraph",
      "text": "允许携带的充电宝放在机舱随身行李中，便于检查。自2025年6月28日起，中国国内航班禁止携带没有清晰CCC标识的充电宝，以及属于召回型号或批次的充电宝。国际行程也可能包含国内航段。核对具体设备与当前承运航司要求；铁路限制另行判断。"
    },
    {
      "id": "restricted-copy",
      "type": "paragraph",
      "text": "食品伴手礼、补充剂和药品先单独放一堆，核清楚再装箱。保留完整配料或有效成分名称与原标签，按具体产品核对入境要求。密封包装、自用或有处方，都不代表任何物品都能入境。食品可从下方指南及其海关来源查具体类别；药品状态不清楚时，先查相关官方药品携带指引。"
    },
    {
      "id": "rules-links",
      "type": "internal-links",
      "title": "有疑问的物品，装箱前查清楚",
      "items": [
        {
          "label": "飞机与火车的充电宝规则",
          "href": "/zh/guides/china-power-bank-rules-flights-trains/"
        },
        {
          "label": "食品、植物与动物产品入境",
          "href": "/zh/guides/food-plants-and-animal-products-into-china/"
        },
        {
          "label": "海关红色与绿色通道怎么选",
          "href": "/zh/guides/china-customs-red-green-channels/"
        },
        {
          "label": "第一次在中国乘高铁",
          "href": "/zh/guides/china-high-speed-train-first-time-guide/"
        }
      ]
    },
    {
      "id": "last-heading",
      "type": "heading",
      "level": 2,
      "text": "出门前的五分钟检查"
    },
    {
      "id": "last-list",
      "type": "list",
      "ordered": true,
      "items": [
        "预订证件原件、手机、药品和抵达后要穿的外层，放进一直随身的包。",
        "设备充好电，首家酒店的中文地址离线保存，确认能收到需要的账户验证码。",
        "翻一遍箱子的每个口袋，找出遗忘的电池、液体、食品，以及需要调整放置或核对入境要求的物品。",
        "按实际机票额度逐件称重，并试着带全部行李走一段。少一双重复的鞋或一套厚重衣服，可能就能轻松不少。",
        "确认第一次洗衣安排在哪一晚，并给途中购物留一点空间。"
      ]
    },
    {id: "lighter-heading", type: "heading", level: 2, text: "少搬几次，行李就轻了"},
    {id: "lighter-copy", type: "paragraph", text: "行李最好管的时候，是有人替你搬。我们的多城市私家团，每个转场日都有司机把你和行李从酒店送到车站或机场，另一位司机在目的地接你；14 天路线坐漓江游船那天，行李另外运送，不用跟着上船。上火车时还是要自己把箱子提上去，所以上面 130 厘米的规定照样适用。行程本身也有截止时间。故宫只提前 7 天北京时间 20:00 放票，当天不卖；2025 年国庆假期第一天（10 月 1 日），故宫预约页面就已显示 10 月 2 日至 7 日全部约满。我们代约的服务费是每人每个景点¥45，门票按票面价另付。参观前至少 8 天交给我们并付款，就在预约保证范围内：约不上，服务费和门票钱全额退还；只剩不到 8 天，这份保证就用不上了。"},
    { id: "handoff-options", type: "comparison", title: "这些可以交给我们", columns: [
      { heading: "车站、机场接送", body: "酒店和车站、机场之间的专车，中国大陆任何城市都能安排，行李放得下。", items: ["司机是我们自己的。", "付款前书面确认价格。"] },
      { heading: `私人导游：每天${bodyGuideRate("xian", "zh")}起`, body: `持证英文导游，最多 8 小时：西安、张家界${bodyGuideRate("xian", "zh")}起，北京、上海${bodyGuideRate("beijing", "zh")}起，旺季日期更高。按每位导游计价，不是按人头。需要中文导游也可以安排，价格在报价里确认。`, items: ["按整天预订，不按小时。", "交通、门票和餐食另行报价。"] },
      { heading: `整趟行程：每人${bodyTourPrice(tour8, 6, "zh")}起`, body: `北京、西安、上海 8 天私家团，2 人出行每人${bodyTourPrice(tour8, 2, "zh")}，6 人每人${bodyTourPrice(tour8, 6, "zh")}；加上成都和桂林的 14 天路线，2 人每人${bodyTourPrice(tour14, 2, "zh")}。`, items: ["含早餐的四星酒店、游览日的私人导游和专车、全部接送、城市之间的火车和航班，以及行程里的实名门票。", "如果我们订不到故宫或天安门，退还你已付的全部费用，前提是故宫参观前至少 8 天把护照信息发给我们。"] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "交给我们安排", items: [{label: "查看可以代预约的景点", href: "/zh/services/china-attraction-reservations/", description: "每个景点的放票时间、价格和预约保证。"}, {label: "预约车站或机场接送", href: "/zh/services/private-car-and-driver/", description: "中国大陆任何城市。告诉我们路线、日期和行李。"}, {label: "查看北京、西安、上海 8 天路线", href: "/zh/tours/beijing-xian-shanghai-8-day-private-tour/", description: "每日安排、酒店和公开价格表。"}, {label: "让规划师安排整趟行程", href: "/zh/services/full-trip-support/", description: "告诉我们日期和预算，提交行程需求免费。"}]},
    {id: "how-to-book", type: "callout", tone: "decision", title: "怎么预订", body: "在上面任何一个页面，通过 WhatsApp 或邮件告诉我们日期、人数和想看的地方。规划师 12 小时内回复，付款前你会先收到书面报价；从第一次回复到你旅行的最后一天，都是同一位规划师跟进。预订时用支付宝或 VBill 付 30% 定金，余款到了中国再付，我们不另收手续费。Homeground China 是持证旅行社（许可证 L-BJ10587），导游和司机都是我们自己的，行程不进购物店。"},
    {
      "id": "faq",
      "type": "faq",
      "title": "行李打包常见问题",
      "items": [
        {
          "question": "两周的中国旅行，衣服要带多少？",
          "answer": "先按约 5 天的衣物收拾，再安排途中洗衣。一位成人以城市游为主时，基础数量是日常上衣 4–5 件、下装 2 件、内衣 5–7 套替换量、袜子 4–5 双、睡衣 1 套，已包含坐飞机时穿在身上的那套。14 天可安排两到三次洗衣，大致每 4 天一次。"
        },
        {
          "question": "充电宝能带上中国国内航班吗？",
          "answer": "允许携带的充电宝要放在机舱随身行李里，便于检查。自 2025 年 6 月 28 日起，中国国内航班禁止携带没有清晰 CCC 标识的充电宝，以及属于召回型号或批次的充电宝。国际行程里也可能夹着国内航段，请按具体设备和当前承运航司的要求核对；铁路限制另行判断。"
        },
        {
          "question": "新加坡或澳大利亚的插头能插中国插座吗？",
          "answer": "要看实际是否插得上，还要看设备标签，不能只看插脚形状。三根矩形插脚的 G 型插头，要带能接住它、也适合中国大陆插座的转换头；澳大利亚 I 型插脚与中国常见的斜脚形式相似，但仍要确认接触、接地和设备额定参数。充电器的 INPUT 范围要覆盖 220V 和 50Hz，转换头不会改变电压。"
        },
        {
          "question": "托运行李晚到时，随身包里该有什么？",
          "answer": "一套替换内衣、一件轻便上衣，以及抵达时要穿的外层衣物。再放预订时使用的护照原件、手机、充电线和适配的充电器、一张与手机分开放的支付卡和适量现金，以及已核实可携带、保留标签包装的常用药。这样即使托运行李晚到，也能给手机充电并换上干净衣服。"
        },
        {
          "question": "食品伴手礼、补充剂和药品能带进中国吗？",
          "answer": "装箱前先把它们单独放一堆，核清楚再决定。保留完整的配料或有效成分名称和原标签，按具体产品核对入境要求。密封包装、自用或有处方，都不代表任何物品都能入境。药品状态不清楚时，先查相关官方药品携带指引。"
        },
        {
          "question": "随身小包能不能免费多带一件？",
          "answer": "不能默认。小包也要计入机票实际允许的手提行李件数和重量。逐张看机票上的手提与托运额度，单独购买的中国国内航班也要算进去；有些国际机票不含免费托运行李。装好后分别称一下箱子和随身包，不要凭想当然的“中国航班额度”选箱子。"
        }, {question: "去中国穿什么？", answer: "舒服、随意的叠穿衣服，加上已经穿惯的步行鞋。中国城市穿着很随意，游览日要走很多路、爬不少台阶。夏天加上防晒和防雨用品，去北方过冬就带够保暖层。"}, {question: "多大的行李箱能上中国高铁？", answer: "中国铁路规定成人免费携带品 20 千克，乘坐动车组列车时，每件物品长、宽、高之和不超过 130 厘米。买箱子前先量：65 × 45 × 27 厘米的中号箱加起来就是 137 厘米，已经超了；登机箱大小的一般在限内。"}]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方出行信息",
      "items": [
        {label: "2025 年国庆假期首日，故宫 10 月 2 日至 7 日门票已约满", url: "https://www.yicai.com/news/102851899.html", publisher: "第一财经", reviewedAt: "2026-10-19"},
        {label: "免费携带品：成人 20 千克；动车组每件长宽高之和不超过 130 厘米，其他列车 160 厘米", url: "https://www.12306.cn/en/faq.html?item=2", publisher: "中国铁路 12306", reviewedAt: "2026-10-20"},
        {label: "《关于进一步加强塑料污染治理的意见》：宾馆、酒店不再主动提供一次性塑料用品（2025 年底扩大至所有宾馆、酒店、民宿）", url: "https://www.mee.gov.cn/xxgk2018/xxgk/xxgk10/202001/t20200120_760495.html", publisher: "国家发展改革委 / 生态环境部", reviewedAt: "2026-10-20"},
        {label: "故宫博物院票务：放票时间与实名规则", url: "https://www.dpm.org.cn/subject_booking/", publisher: "故宫博物院", reviewedAt: "2026-08-22"},
        {
          "label": "麻醉药品和精神类药品携带官方说明",
          "url": "https://english.shanghai.gov.cn/en-ImmigrationCustoms/20240516/632357dc3fbe483c923a5c296795b618.html",
          "publisher": "Shanghai Customs",
          "reviewedAt": "2026-09-10"
        },
        {
          "label": "铁路预订与乘车证件",
          "url": "https://www.12306.cn/en/faq.html?item=2",
          "publisher": "中国铁路12306",
          "reviewedAt": "2026-09-10"
        },
        {
          "label": "国际航班票种与行李差异",
          "url": "https://webresource.airchina.com.cn/en-US/content/c/2024-02-09/16521.shtml",
          "publisher": "中国国际航空",
          "reviewedAt": "2026-09-10"
        },
        {
          "label": "国内航班充电宝通知",
          "url": "https://www.caac.gov.cn/English/News/202507/t20250709_227894.html",
          "publisher": "中国民用航空局",
          "reviewedAt": "2026-09-10"
        },
        {
          "label": "中国用电信息",
          "url": "https://www.caac.gov.cn/ZTZL/RDZT/YTHYWZ/CHRY/SHZN/Electricity/index.html",
          "publisher": "中国民用航空局",
          "reviewedAt": "2026-09-10"
        }
      ]
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
