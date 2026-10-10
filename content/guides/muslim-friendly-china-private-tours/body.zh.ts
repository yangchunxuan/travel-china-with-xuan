import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "Homeground China 的穆斯林友好私家团，就是在我们已公布的线路上把餐食加进去。每天的午餐和晚餐安排在挂着“清真”标志的餐厅，导游知道它们在哪儿，当天的停留也围绕你的礼拜时间来排。它是私家团，只有你们自己一行人，不进购物店。你告诉我们守哪一种标准；付款之前，我们书面告诉你哪几天能做到、哪几天做不到。"
    },
    {
      "id": "included-heading",
      "type": "heading",
      "level": 2,
      "text": "包含什么"
    },
    {
      "id": "included-list",
      "type": "list",
      "items": [
        "一条已公布的私家团线路：该线路页面上列明的含早酒店、专车、导游和门票。",
        "餐食：游览日的午餐和晚餐，安排在清真餐厅，由导游点菜。每人的餐费写在给你的书面报价里。",
        "礼拜：当天的停留围绕你的礼拜时间安排，线路上有清真寺的地方可以安排参访。",
        "早餐按需安排：酒店早餐含在团费里，但不是清真的；有需要时，我们选能提供清真早餐的酒店，或把早餐安排在外面。",
        "付款之前：一份书面报价，写明哪一天、哪一餐在线路附近找不到清真餐厅，以及我们建议的替代办法。"
      ]
    },
    {
      "id": "limits",
      "type": "callout",
      "tone": "warning",
      "title": "我们不承诺的事",
      "body": "我们是持牌的中国旅行社，不是清真认证机构。餐食安排在挂有“清真”标志的餐厅，我们不检查、也不认证它们的厨房。景区里和长江游轮上清真餐食有限，我们会在你预订之前说明。"
    },
    {
      "id": "routes-heading",
      "type": "heading",
      "level": 2,
      "text": "适合穆斯林游客的线路"
    },
    {
      "id": "routes-table",
      "type": "table",
      "caption": "已公布的私家团线路，以及各自适合的原因",
      "columns": [
        "线路",
        "天数",
        "为什么适合"
      ],
      "rows": [
        [
          "西安与兵马俑",
          "5 天",
          "行程本身就包含化觉巷清真大寺和回民街，老城各景点步行就能到清真餐馆"
        ],
        [
          "北京精华",
          "5 天",
          "晚餐可以安排在北京的回族街区牛街，那里有约一千年历史的礼拜寺"
        ],
        [
          "北京、西安、上海",
          "8 天",
          "经典的第一次中国行。北京和西安吃清真很方便，上海需要提前安排"
        ],
        [
          "北京、西安与丝绸之路",
          "15 天",
          "西安、张掖、敦煌、吐鲁番和乌鲁木齐：清真饮食是常态的那部分中国"
        ],
        [
          "张掖、嘉峪关、敦煌",
          "7 天",
          "甘肃河西走廊，清真餐馆很常见"
        ],
        [
          "厦门、土楼、泉州",
          "6 天",
          "包含泉州建于 11 世纪的清净寺，它是世界遗产的组成部分"
        ],
        [
          "张家界",
          "4 天或 7 天",
          "可以做，但要提前安排。国家森林公园附近清真餐厅很少，所以每顿饭都在出发前定好"
        ]
      ]
    },
    {
      "id": "booking-heading",
      "type": "heading",
      "level": 2,
      "text": "怎么预订"
    },
    {
      "id": "booking-list",
      "type": "list",
      "ordered": true,
      "items": [
        "把日期、人数、看中的线路和你守的标准发给我们。",
        "我们回一份书面报价：线路、酒店、餐食安排和餐费，以及哪几天达不到你的标准。",
        "你确认报价之后才付款。",
        "行程中，导游带你们去每一家餐厅并点菜，不用自己找，也不用自己翻译。"
      ]
    },
    {
      "id": "tours",
      "type": "internal-links",
      "title": "选择线路",
      "items": [
        {
          "label": "西安兵马俑 5 天私家团",
          "href": "/zh/tours/xian-terracotta-warriors-5-day-private-tour/",
          "description": "导游带你步行走进化觉巷清真大寺和回民街。"
        },
        {
          "label": "北京精华 5 天私家团",
          "href": "/zh/tours/beijing-highlights-5-day-private-tour/",
          "description": "故宫和长城，晚餐可以安排在牛街的清真餐馆。"
        },
        {
          "label": "北京·西安·上海 8 天私家团",
          "href": "/zh/tours/beijing-xian-shanghai-8-day-private-tour/",
          "description": "经典的第一次中国行。"
        },
        {
          "label": "北京·西安·丝绸之路 15 天私家团",
          "href": "/zh/tours/beijing-xian-silk-road-15-day-private-tour/",
          "description": "向西穿过甘肃，直到新疆。"
        },
        {
          "label": "张掖·嘉峪关·敦煌 7 天私家团",
          "href": "/zh/tours/zhangye-jiayuguan-dunhuang-7-day-private-tour/",
          "description": "河西走廊：七彩丹霞、嘉峪关和莫高窟。"
        },
        {
          "label": "厦门·土楼·泉州 6 天私家团",
          "href": "/zh/tours/xiamen-tulou-quanzhou-6-day-private-tour/",
          "description": "行程包含泉州清净寺。"
        },
        {
          "label": "中国对穆斯林游客友好吗？",
          "href": "/zh/guides/halal-food-muslim-travel-china/",
          "description": "清真标志、四种标准，以及哪里方便、哪里少。"
        },
        {
          "label": "从马来西亚去张家界",
          "href": "/zh/guides/zhangjiajie-from-malaysia/",
          "description": "航班、节奏，以及景区行程的用餐标准。"
        }
      ]
    },
    {
      "id": "faq",
      "type": "faq",
      "title": "穆斯林友好私家团：常见问题",
      "items": [
        {
          "question": "你们有清真的中国旅行团吗？",
          "answer": "我们为穆斯林游客提供私家团：午餐和晚餐安排在清真餐厅并包含在内，行程按礼拜时间停留，配专属导游。我们是旅行社，不为食物做认证。"
        },
        {
          "question": "团费里含清真餐吗？",
          "answer": "选了餐食安排就包含：游览日的午餐和晚餐。每人的餐费写在书面报价里。每条线路都含酒店早餐，但酒店早餐不是清真的。"
        },
        {
          "question": "你们怎么确认一家餐厅是清真的？",
          "answer": "我们选挂有“清真”标志的餐厅；在上海等城市，使用这个标志必须持有民族事务主管部门核发的清真标志牌。我们如实告诉你每家餐厅挂了什么，但不检查、也不认证厨房。"
        },
        {
          "question": "行程可以按礼拜时间安排吗？",
          "answer": "可以。把礼拜时间告诉我们，导游会围绕它安排当天的停留。清真寺在城市里，景区里通常没有。"
        },
        {
          "question": "哪条中国线路对穆斯林游客最省心？",
          "answer": "西安和丝绸之路。西安回民街和西北到处是清真餐馆，线路上还有历史悠久的清真寺。"
        },
        {
          "question": "能安排穆斯林友好的张家界行程吗？",
          "answer": "可以，但要提前安排。国家森林公园附近清真餐厅很少，所以每顿饭都在出发前定好，并写在报价里。"
        },
        {
          "question": "这是私家团吗？",
          "answer": "是。只有你们自己一行人，配专属导游和车，不进购物店。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "资料来源",
      "items": [
        {
          "label": "上海市清真食品管理条例",
          "url": "https://mzzj.sh.gov.cn/mzfmflfg/20200608/f49a4a15d45648e7a012308daf772ab4.html",
          "publisher": "上海市民族和宗教事务局",
          "reviewedAt": "2026-10-10"
        },
        {
          "label": "2026 年全球穆斯林旅游指数：中国（英文）",
          "url": "https://crescentrating.com/insights/gmti/destinations/china",
          "publisher": "万事达卡与 CrescentRating",
          "reviewedAt": "2026-10-10"
        },
        {
          "label": "泉州：宋元中国的世界海洋商贸中心（英文，2021 年列入）",
          "url": "https://whc.unesco.org/en/list/1561/",
          "publisher": "联合国教科文组织世界遗产中心",
          "reviewedAt": "2026-10-10"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
