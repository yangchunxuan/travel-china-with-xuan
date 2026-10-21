import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";
const bj5 = "beijing-highlights-5-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "lead", type: "lead", text: "第一次来中国一周，最好的安排是两座城市，不是四座：北京住三晚，看故宫和长城；上海住三晚，看外滩、老弄堂，想去的话再加一天苏州。这样有四个完整的游览日、一个坐高铁的转场日，也不赶。比起上海的天际线，你更想看兵马俑的话，就把上海换成西安。不管选哪两座城市，这一周都绕着两件等不起的预订转：故宫，和两座城市之间的火车。"},
    {
      "id": "time-heading",
      "type": "heading",
      "level": 2,
      "text": "七天究竟有多少游览时间"
    },
    {
      "id": "time-count",
      "type": "callout",
      "tone": "decision",
      "title": "北京3晚＋上海3晚",
      "body": "示例从第1天抵达北京开始，到第7天从上海离开结束。第1—3晚住北京，第4—6晚住上海；第4天用于城际转场，第2、3、5、6天才是四个完整游览日。"
    },
    {
      "id": "time-2",
      "type": "paragraph",
      "text": "国际航班可能占用额外的、尚未抵达中国或已经离开中国的日历日。如果整个假期从离家到回家只有一周，请先算实际能在中国待几天。深夜抵达仍占第1天，清晨返程仍占第7天。"
    },
    {id: "traps-heading", type: "heading", level: 2, text: "会打乱一周中国行的六件事"},
    {id: "traps-list", type: "list", ordered: true, items: ["星期一落地，星期二去故宫却没订票。故宫通常周一闭馆，当天不卖票，参观前 7 天北京时间 20:00 放票，每人用自己的护照实名预约。", "把飞行的日子也算成游玩日。晚上到也占掉第 1 天，一早的回程航班也占掉第 7 天。", "到了北京才订火车票。车票提前 15 天开售（含乘车当天），热门日期想坐的车次可能已经没票。", "把开车时间当成截止时间。检票口会在开车前 2 到 12 分钟关闭，看车站。", "以为长城门票什么都包。八达岭、慕田峪的门票、交通和缆车都是分开的。", "从另一座城市飞回国。如果国际航班从北京起飞，行程要再加一个转场日，或者在上海少玩一天。"]},
    {
      "id": "itinerary-heading",
      "type": "heading",
      "level": 2,
      "text": "七天逐日安排"
    },
    {
      "id": "day-1-heading",
      "type": "heading",
      "level": 3,
      "text": "第1天：抵达北京，安顿下来"
    },
    {
      "id": "day-1-1",
      "type": "paragraph",
      "text": "先到酒店，把接下来三晚要用的行李放好，再在附近找一顿轻松的晚饭。如果抵达早、精神也好，可以在周边短暂走走，熟悉环境。第一晚尽量安排在酒店附近：明天要走不少路，而刚抵达时的兴奋过去后，时差带来的疲劳才可能出现。住北京，第1晚，共3晚。"
    },
    {
      "id": "day-2-heading",
      "type": "heading",
      "level": 3,
      "text": "第2天：把时间留给故宫"
    },
    {
      "id": "day-2-1",
      "type": "paragraph",
      "text": "以故宫博物院为当天的主要游览。走过开阔院落后，慢下来看看彩绘梁枋、门洞与较小的空间，不必只在几个拍照点之间赶路。按由南向北的参观方向前进，并根据实际离开的出口安排下一段交通。"
    },
    {
      "id": "day-2-2",
      "type": "paragraph",
      "text": "这一天以预约成功为前提。故宫通常周一闭馆，法定节假日有例外，也不售当日票。可以在日期与预约允许时对调第2、3天。如果还想去天安门广场，先单独核对广场当下的入场安排。住北京，第2晚，共3晚。"
    },
    {
      "id": "day-3-heading",
      "type": "heading",
      "level": 3,
      "text": "第3天：留出一天看长城"
    },
    {
      "id": "day-3-1",
      "type": "paragraph",
      "text": "示例选择八达岭，把酒店往返交通一并算进这一天。到了现场，看清台阶、天气和同行人的状态，再决定走多远。选一段适合自己的路线，有余裕停下来看看山脊，往往比追着最远的敌楼走更舒服。"
    },
    {
      "id": "day-3-2",
      "type": "paragraph",
      "text": "提前安排去程与返程，并核对适合一行人的入口和可选上山方式。付款前看清订单只含景区门票，还是也包含交通和缆车。回北京吃晚饭，再整理第二天转场所需的行李。住北京，第3晚，共3晚。"
    },
    {
    "id": "sightseeing-execution-links",
    "type": "internal-links",
    "title": "把这几天的游览接好",
    "items": [
      {
        "label": "八达岭：交通与入园衔接",
        "href": "/zh/guides/beijing-to-badaling-great-wall-transfer/"
      }
    ]
  },
    {
      "id": "day-4-heading",
      "type": "heading",
      "level": 3,
      "text": "第4天：从北京去上海"
    },
    {
      "id": "day-4-1",
      "type": "paragraph",
      "text": "可以先比较北京南到上海虹桥的可售日间列车，买票前确认准确车站、乘车日期与抵达时间。如果航班的酒店到酒店总行程更合适，也可以飞行，但比较时要包含去机场、办理手续和取行李所需的时间。"
    },
    {
      "id": "day-4-2",
      "type": "paragraph",
      "text": "把退房、旅途与到达下一间酒店作为当天的主安排。在北京住满三晚后，这也是整条主线唯一一次更换住宿城市。到了上海，在酒店附近吃饭即可，把第一次正式城市漫步留给明天。住上海，第1晚，共3晚。"
    },
    {
      "id": "day-5-heading",
      "type": "heading",
      "level": 3,
      "text": "第5天：从江边与街道认识上海"
    },
    {
      "id": "day-5-1",
      "type": "paragraph",
      "text": "从外滩江边开始：回头看看老建筑，再望向黄浦江对岸的浦东天际线。给步行、坐一坐和午饭留出时间，不必拍完一张照片就离开。"
    },
    {
      "id": "day-5-2",
      "type": "paragraph",
      "text": "下午只选一个重点。如果想近看高楼，就过江去浦东；如果更喜欢街道、商店和咖啡馆，就留在西岸慢慢逛。若某个付费观景台是你特别想去的地方，订票前核对入场条件与天气。住上海，第2晚，共3晚。"
    },
    {
      "id": "day-6-heading",
      "type": "heading",
      "level": 3,
      "text": "第6天：继续上海，或用苏州替换这一天"
    },
    {
      "id": "day-6-1",
      "type": "paragraph",
      "text": "轻松的默认选择是再留一天上海。逛武康路及周围街巷，看看建筑、小店，再好好吃一顿午饭。选一个紧凑的步行区域，比反复横穿全城更自在。这一天也能容纳下雨、走累了，或补看前一天错过的地方。"
    },
    {
      "id": "day-6-2",
      "type": "paragraph",
      "text": "如果古典园林与河边街巷更吸引你，可以把上海安排换成苏州一日游。选择一座园林，例如拙政园，再逛平江路一带。决定前核对园林入场、往返火车、具体车站及当地接驳。保留同一间上海酒店，把大件行李留在那里。新增往返会占用原本在上海游览的时间；当晚回上海，住第3晚，共3晚。"
    },
    {
      "id": "day-7-heading",
      "type": "heading",
      "level": 3,
      "text": "第7天：从上海离开"
    },
    {
      "id": "day-7-1",
      "type": "paragraph",
      "text": "根据已确认的航班及出发机场安排上午。较晚的航班也许允许在附近吃早餐或短暂散步，但这一天仍按离开日计算。如果国际机票要求回北京出境，就要明确加上上海回北京这一段：它会占用游览时间，或需要另加一天。本示例没有第7晚住宿。"
    },
    {
      "id": "stay-heading",
      "type": "heading",
      "level": 2,
      "text": "选择让这一周更省心的酒店"
    },
    {
      "id": "stay-1",
      "type": "paragraph",
      "text": "每座城市都连续三晚住同一间酒店。北京可根据抵达与游览安排比较王府井、前门和胡同片区；上海可比较外滩、人民广场和原法租界一带。确认具体酒店到车站的交通，以及电梯、行李安排。连住三晚时，适合日常出行的街区往往比紧挨只用一次的车站更重要。"
    },
    {
      "id": "stay-links",
      "type": "internal-links",
      "title": "选择住宿片区与园林",
      "items": [
        {
          "label": "第一次去北京住哪里",
          "href": "/zh/guides/beijing-where-to-stay-first-trip/"
        },
        {
          "label": "第一次去上海住哪里",
          "href": "/zh/guides/shanghai-where-to-stay-first-trip/"
        },
        {
          "label": "怎样选择苏州园林",
          "href": "/zh/guides/how-to-read-a-suzhou-garden/"
        }
      ]
    },
    {
      "id": "booking-heading",
      "type": "heading",
      "level": 2,
      "text": "先订妥关键环节，再填入零散活动"
    },
    {
      "id": "booking-1",
      "type": "paragraph",
      "text": "先确认国际航班的抵达与离开城市，再确认六晚酒店及第4天交通。通过故宫的官方参观与购票页面预约，并准确填写每位旅客的证件资料。阅读中国铁路购票说明，乘车时携带购票所用的同一本护照。八达岭的景区门票与选定的前往方式分别核对。这几部分能衔接后，再考虑可选的晚间活动。"
    },
    {
      "id": "booking-links",
      "type": "sources",
      "title": "官方预约入口与资料来源",
      "items": [
        {label: "火车提前几分钟停止检票？（来源：中国铁路）", url: "https://m.gmw.cn/toutiao/2023-04/06/content_1303333333.htm", publisher: "中国青年报，光明网转载", reviewedAt: "2026-10-20"},
        {label: "铁路车票 15 天预售期（含乘车当天）", url: "https://www.12306.cn/mormhweb/zxdt/202205/t20220531_37508.html", publisher: "中国铁路 12306", reviewedAt: "2026-08-10"},
        {label: "故宫博物院票务：放票时间与实名规则", url: "https://www.dpm.org.cn/subject_booking/", publisher: "故宫博物院", reviewedAt: "2026-08-22"},
        {label: "2025 年国庆假期首日，故宫 10 月 2 日至 7 日门票已约满", url: "https://www.yicai.com/news/102851899.html", publisher: "第一财经", reviewedAt: "2026-10-19"},
        {
          "label": "官方参观与购票页面",
          "url": "https://intl.dpm.org.cn/visit.html"
        },
        {
          "label": "中国铁路购票说明",
          "url": "https://www.12306.cn/en/faq.html?item=2"
        }
      ]
    },
    {
      "id": "alternative-heading",
      "type": "heading",
      "level": 2,
      "text": "更想去西安？仍然只安排两座城市"
    },
    {
      "id": "alternative-1",
      "type": "paragraph",
      "text": "第1—3天保留北京，第4天去西安，第4—6晚都住西安。第5天留给兵马俑及往返交通，第6天安排城墙一带、吃饭和老城街巷。第7天从西安离开，前提是能安排合适的后续航班。这个选择用更多古代历史体验，换掉上海的江景与现代城市生活。决定前确认北京到西安的交通和离开西安的衔接。"
    },
    {id: "help-heading", type: "heading", level: 2, text: "一周行程，一次订好"},
    {id: "help-1", type: "paragraph", text: "一周的行程，没有多出来的一天去补错过的预约。故宫当天不卖票：参观前 7 天北京时间 20:00 放票，每人用自己的护照实名预约；2025 年国庆假期第一天（10 月 1 日），故宫预约页面就已显示 10 月 2 日至 7 日全部约满。参观前至少 8 天交给我们、付款并提供每位游客的护照信息，就在预约保证范围内：约不上，服务费和门票钱全额退还；只剩不到 8 天，这份保证就用不上了。"},
    { id: "handoff-options", type: "comparison", title: "这些可以交给我们", columns: [
      { heading: `整趟行程：每人${bodyTourPrice(tour8, 6, "zh")}起`, body: `北京、西安、上海 8 天私家团，2 人出行每人${bodyTourPrice(tour8, 2, "zh")}，6 人每人${bodyTourPrice(tour8, 6, "zh")}。加上桂林的 10 天路线，2 人每人${bodyTourPrice(tour10, 2, "zh")}。`, items: ["含早餐的四星酒店、游览日的私人导游和专车、全部接送、城市之间的火车和航班，以及行程里的实名门票。", "如果我们订不到故宫或天安门，退还你已付的全部费用，前提是故宫参观前至少 8 天把护照信息发给我们。"] },
      { heading: `只玩北京 5 天：每人${bodyTourPrice(bj5, 6, "zh", "english-guided")}起`, body: `2 人出行每人${bodyTourPrice(bj5, 2, "zh", "english-guided")}，第 2 到第 4 天有英文导游；北京含早餐的四星酒店住 4 晚，含故宫和长城。`, items: ["机场或车站专车接送、游览日的专车；不进购物店。", "如果我们订不到故宫或天安门，退还你已付的全部费用，前提是故宫参观前至少 8 天把护照信息发给我们。"] },
      { heading: `私人导游：每天${bodyGuideRate("xian", "zh")}起`, body: `持证英文导游，最多 8 小时：西安、张家界${bodyGuideRate("xian", "zh")}起，北京、上海${bodyGuideRate("beijing", "zh")}起，旺季日期更高。需要中文导游也可以安排，价格在报价里确认。`, items: ["按整天预订，按每位导游计价，不是按人头。", "交通、门票和餐食另行报价。"] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "交给我们安排", items: [{label: "查看北京、西安、上海 8 天路线", href: "/zh/tours/beijing-xian-shanghai-8-day-private-tour/", description: "每日安排、酒店和公开价格表。"}, {label: "查看可以代预约的景点", href: "/zh/services/china-attraction-reservations/", description: "每个景点的放票时间、价格和预约保证。"}, {label: "请一位导游陪一天", href: "/zh/services/private-english-speaking-guides/", description: "北京、上海、西安、张家界的价格。"}, {label: "预约接机、接站或包车", href: "/zh/services/private-car-and-driver/", description: "中国大陆任何城市。告诉我们路线、日期和行李。"}, {label: "让规划师安排整趟行程", href: "/zh/services/full-trip-support/", description: "告诉我们日期和预算，提交行程需求免费。"}]},
    {id: "how-to-book", type: "callout", tone: "decision", title: "怎么预订", body: "在上面任何一个页面，通过 WhatsApp 或邮件告诉我们日期、人数和想看的地方。规划师 12 小时内回复，付款前你会先收到书面报价；从第一次回复到你旅行的最后一天，都是同一位规划师跟进。预订时用 VBill 刷卡链接付 30% 定金，余款到了中国再付。Homeground China 是持证旅行社（许可证 L-BJ10587），导游和司机都是我们自己的，行程不进购物店。"},
    {
    "id": "faq",
    "type": "faq",
    "title": "七天路线常见问题",
    "items": [
      {
        "question": "七天里真正能游览的有几天？",
        "answer": "四天。示例从第1天抵达北京开始，到第7天从上海离开结束；第4天用于城际转场，所以第2、3、5、6天才是四个完整游览日。第1—3晚住北京，第4—6晚住上海，只换一次住宿城市。"
      },
      {
        "question": "故宫周一闭馆吗？",
        "answer": "通常周一闭馆，法定节假日有例外，而且不售当日票，所以第2天能否成行要看预约是否成功。如果日期和预约情况允许，可以把第2天和第3天对调，先去长城。还想去天安门广场的话，要另外核对广场当下的入场安排。"
      },
      {
        "question": "第4天从北京去上海，坐高铁还是坐飞机？",
        "answer": "先比较北京南到上海虹桥的日间列车，买票前确认准确车站、乘车日期和抵达时间。如果航班的酒店到酒店总行程更合适，也可以坐飞机，但比较时要把去机场、办手续和取行李的时间算进去。这一天的主安排就是退房、赶路和到达下一间酒店。"
      },
      {
        "question": "可以加一天苏州吗？",
        "answer": "可以，把第6天的上海安排换成苏州一日游。选一座园林，例如拙政园，再逛逛平江路一带；决定前先核对园林入场、往返火车、具体车站和当地接驳。新增的往返会占用原本在上海游览的时间，记得保留同一间上海酒店，大件行李留在那里，当晚回上海住第3晚。"
      },
      {
        "question": "国际机票要求回北京出境，这条路线还走得通吗？",
        "answer": "走得通，但要把上海回北京这一段明确加进去。这段回程会占用游览时间，或者需要另加一天，所以第7天要按已确认的航班和出发机场来安排。航班较晚时可以在附近吃个早餐或散散步，但这一天仍按离开日计算，本示例也没有第7晚住宿。"
      },
      {
        "question": "可以把上海换成西安吗？",
        "answer": "换成西安也可以，仍然只安排两座城市。第1—3天保留北京，第4天去西安，第4—6晚都住西安。第5天留给兵马俑及往返交通，第6天安排城墙一带、吃饭和老城街巷；第7天从西安离开，前提是能安排合适的后续航班。决定前确认北京到西安的交通和离开西安的衔接。"
      }, {question: "有可以直接订的 7 天中国游吗？", answer: "我们已发布、最接近的是北京、西安、上海 8 天私家团：北京 3 晚、西安 2 晚、上海 2 晚，含酒店、导游和专车、接送、城市之间的火车和航班，以及实名门票。想按上面的北京、上海一周走，我们另行书面报价，付款前确认。"}, {question: "一周的行程，故宫什么时候订？", answer: "故宫参观前 7 天北京时间 20:00 放票，当天不售票。交给我们，并在参观前至少 8 天付款、提供每位游客的护照信息，就在预约保证范围内：约不上，服务费和票款全额退还。"}]
  },
    {
      "id": "help-links",
      "type": "internal-links",
      "title": "继续安排这次旅行",
      "items": [
        {label: "冬季去哪：冰雪、城市或海滨", href: "/zh/guides/china-in-winter/"},
        {label: "整理中国旅行行李清单", href: "/zh/guides/china-packing-list/"},
        {
          "label": "中国私人旅行路线与价格",
          "href": "/zh/#travel-products"
        },
        {
          "label": "中国旅行规划顾问",
          "href": "/zh/#planner-contact"
        },
        {
          "label": "比较中国十天路线",
          "href": "/zh/guides/china-10-day-itinerary/"
        }
      ]
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
