import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "长白山在吉林，是中国和朝鲜边界上的一座休眠火山，山顶的火山口里就是天池。中国一侧分北、西、南三个景区，分开售票：每个景区门票 105 元，加环保车 85 元；北坡上主峰的车另收 80 元。门票实名、分时段预约，最多提前 7 天。能不能看到天池要看当天的天气，有条件就多留一天。"
    },
    {
      "id": "what-heading",
      "type": "heading",
      "level": 2,
      "text": "长白山是什么地方？"
    },
    {
      "id": "what-copy",
      "type": "paragraph",
      "text": "这座山是一个火山锥，锥顶的火山口积水成湖，是中国较大的火山口湖之一。山顶的观景点海拔超过 2400 米；往下有天池出水口形成的 68 米瀑布、雪地里冒着热气的温泉、峡谷和森林。两个小镇是游览的落脚点：北坡住二道白河，西坡住松江河。两镇之间车程两个多小时，所以先定去哪个坡，再订酒店和火车票。"
    },
    {
      "id": "slope-heading",
      "type": "heading",
      "level": 2,
      "text": "北坡、西坡还是南坡？"
    },
    {
      "id": "slope-table",
      "type": "table",
      "caption": "中国一侧的三个景区",
      "columns": [
        "景区",
        "怎么上去看天池",
        "还有什么",
        "适合谁"
      ],
      "rows": [
        [
          "北景区（北坡）",
          "先坐环保车到换乘中心，再换乘上主峰的倒站车：面包车沿盘山路约 20 分钟上去。下车后步行约 10 分钟到山顶",
          "长白瀑布、聚龙温泉、小天池、绿渊潭和谷底林海",
          "第一次来、想看的景点最多，或者想少走路。这里游客也最多"
        ],
        [
          "西景区（西坡）",
          "环保车约 45 分钟，再走约 1440 级台阶到观景台，20 至 30 分钟",
          "山顶的界碑、锦江大峡谷，以及七八月开花的高山花园",
          "想看更开阔的天池、想避开人群，而且爬台阶没问题"
        ],
        [
          "南景区（南坡）",
          "乘环保车。只在暖季开放，大约 5 月中旬起",
          "开发最少的一面，有鸭绿江大峡谷，可以远眺对岸的朝鲜",
          "夏天再来一次的时候"
        ]
      ]
    },
    {
      "id": "waterfall-figure",
      "type": "figure",
      "src": "/images/guides/changbai-mountain-heaven-lake/waterfall-1600.webp",
      "alt": "长白瀑布从火山口的缺口分成两股落进乱石谷地，崖壁上有一条带顶的栈道",
      "width": 1600,
      "height": 1000,
      "caption": "北坡的长白瀑布，2025 年 7 月。摄影：Liuxingy，CC BY-SA 4.0，来自维基共享资源"
    },
    {
      "id": "price-heading",
      "type": "heading",
      "level": 2,
      "text": "门票和车票价格"
    },
    {
      "id": "price-table",
      "type": "table",
      "caption": "2025 年 8 月官方公布的价格（每人）",
      "columns": [
        "项目",
        "北景区",
        "西景区",
        "南景区"
      ],
      "rows": [
        [
          "门票",
          "105 元",
          "105 元",
          "105 元"
        ],
        [
          "环保车（往返）",
          "85 元",
          "85 元",
          "85 元"
        ],
        [
          "天池主峰车（往返）",
          "80 元",
          "不需要；冬季上主峰的雪地摩托 165 元",
          "不需要"
        ],
        [
          "游客中心到山门的旅游班线（往返）",
          "35 元",
          "19 元或 14 元，按出发的游客中心不同",
          "未列出"
        ]
      ]
    },
    {
      "id": "price-notes",
      "type": "list",
      "items": [
        "北坡含上主峰，成人合计 270 元，游客中心到山门的班线另算。后来有报道说班线票价下调了，订票时再看班线价格。",
        "半价：全日制本科及以下学生、7 至 17 岁、60 至 64 岁。免票：7 岁以下或 1.2 米及以下儿童。车票的优惠另有规定。"
      ]
    },
    {
      "id": "booking-heading",
      "type": "heading",
      "level": 2,
      "text": "怎么预约"
    },
    {
      "id": "booking-list",
      "type": "list",
      "items": [
        "官方渠道：微信公众号“长白山”，小程序“长白山”和“长白山一机游”。景区说明，在其他渠道买的票不由景区负责。",
        "实名制、分时段预约，入园时刷脸检票。门票最多提前 7 天开售，每天 18:00 放出新的名额。",
        "持护照的游客购票后会拿到一个电子二维码，入园时和护照一起出示。不能早于预约时段入园。",
        "未使用的门票，在预订日期当天 24 点前可以免手续费退票。",
        "停止入园的时间很早。2026 年 10 月 11 日所列：北景区 07:30–18:00，13:30 停止入园；西景区 07:30–17:00，13:30 停止入园。上午就进山。"
      ]
    },
    {
      "id": "winter-heading",
      "type": "heading",
      "level": 2,
      "text": "冬天的长白山"
    },
    {
      "id": "winter-list",
      "type": "list",
      "items": [
        "北景区和西景区全年开放，南景区冬季不开。",
        "上主峰的路要看风雪。天气不好时，山下的景点照常开放，天池却上不去，所以把登顶看天池当作“有机会”，别当成一定能看到。",
        "冬天多出来的看点：北坡雪地里热气腾腾的温泉、西坡的雪地摩托，以及松江河附近的滑雪场。",
        "出发前就想好替代安排。我们的冬季团在北坡这一天会事先约定好备选方案，以防封路。"
      ]
    },
    {
      "id": "getting-there-heading",
      "type": "heading",
      "level": 2,
      "text": "怎么去"
    },
    {
      "id": "getting-there-list",
      "type": "list",
      "items": [
        "去北坡，到长白山站，住二道白河；去西坡，到长白山西站或长白山机场，住松江河。",
        "两个站都在 2025 年 9 月 28 日开通的沈白高铁上。车次请按日期在 12306 上查。",
        "不要只按地图上“长白山”三个字来订。我们的交通攻略把每个山门对应的车站、机场和小镇都列出来了。"
      ]
    },
    {
      "id": "days-heading",
      "type": "heading",
      "level": 2,
      "text": "安排几天"
    },
    {
      "id": "days-list",
      "type": "list",
      "items": [
        "一个坡要一天。在二道白河住两晚，可以看北坡，并留出一个上午再试一次天池。",
        "北坡西坡都去，要住三晚，中间一天在两个小镇之间转移。",
        "冬天可以再加几天滑雪，或者去延吉——那里是朝鲜族聚居的城市。"
      ]
    },
    {
      "id": "tours",
      "type": "internal-links",
      "title": "规划长白山",
      "items": [
        {
          "label": "长白山度假区·北坡·延吉 6 天冬季私家团",
          "href": "/zh/tours/changbaishan-yanji-winter-6-day-private-tour/",
          "description": "一节滑雪入门课，天气允许时上北坡，然后去延吉，全程冬季装备的专车。"
        },
        {
          "label": "哈尔滨·亚布力·雪乡·长白山·延吉 8 天冬季私家团",
          "href": "/zh/tours/harbin-snow-town-changbaishan-yanji-8-day-private-tour/",
          "description": "先看冰雪之城，再上长白山。"
        },
        {
          "label": "长白山：每个山门对应的车站、机场和小镇",
          "href": "/zh/guides/changbai-mountain-hubs-to-park-gates/",
          "description": "先定山门，再定交通枢纽。"
        },
        {
          "label": "哈尔滨冰雪节：时间、门票和穿什么",
          "href": "/zh/guides/harbin-ice-festival/",
          "description": "东北冬季的另一个大站。"
        },
        {
          "label": "冬天去中国：哪些地方合适",
          "href": "/zh/guides/china-in-winter/",
          "description": "寒冷和温暖两类目的地放在一起比较。"
        }
      ]
    },
    {
      "id": "faq",
      "type": "faq",
      "title": "长白山常见问题",
      "items": [
        {
          "question": "长白山在哪里？",
          "answer": "在中国东北的吉林省东南部，中国和朝鲜的边界上。"
        },
        {
          "question": "长白山和白头山是同一座山吗？",
          "answer": "是的。同一座山，中文叫长白山，朝鲜语叫白头山。从中国一侧进山，是在中国境内的山顶看天池。"
        },
        {
          "question": "北坡和西坡哪个好？",
          "answer": "北坡景点多，有车几乎开到山顶。西坡要走约 1440 级台阶，天池视野更开阔，游客也少。第一次来选北坡。"
        },
        {
          "question": "长白山门票多少钱？",
          "answer": "每个景区门票 105 元、环保车 85 元。北坡上主峰的车再加 80 元，合计 270 元。"
        },
        {
          "question": "外国游客可以订票吗？",
          "answer": "可以。官方说明里包括护照购票：购票后会拿到电子二维码，入园时和护照一起出示。官方微信渠道提前 7 天开放预约。"
        },
        {
          "question": "去了一定能看到天池吗？",
          "answer": "不一定。云、风和雪都可能遮住天池，或者让上主峰的路关闭。多留一天，机会更大。"
        },
        {
          "question": "长白山冬天开放吗？",
          "answer": "北景区和西景区全年开放，南景区冬季关闭。能不能上主峰要看每天的天气。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "资料来源",
      "items": [
        {
          "label": "长白山景区购票服务与帮助（2025 年 8 月 12 日）",
          "url": "https://www.peopleapp.com/rmharticle/30049944334",
          "publisher": "吉林省文化和旅游厅（人民日报人民号）",
          "reviewedAt": "2026-10-10"
        },
        {
          "label": "长白山景区：三大景区、天池与两个小镇",
          "url": "https://you.ctrip.com/sight/changbaishan268/136031.html",
          "publisher": "携程",
          "reviewedAt": "2026-10-10"
        },
        {
          "label": "长白山北景区：游览路线、瀑布与开放时间",
          "url": "https://you.ctrip.com/sight/changbaishan268/136032.html",
          "publisher": "携程",
          "reviewedAt": "2026-10-10"
        },
        {
          "label": "长白山西景区：台阶、峡谷与开放时间",
          "url": "https://you.ctrip.com/sight/changbaishan268/136039.html",
          "publisher": "携程",
          "reviewedAt": "2026-10-10"
        },
        {
          "label": "沈白高铁开通运营（2025 年 9 月 28 日）",
          "url": "https://www.jl.gov.cn/szf/zwhd/202509/t20250928_3502171.html",
          "publisher": "吉林省人民政府",
          "reviewedAt": "2026-08-13"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
