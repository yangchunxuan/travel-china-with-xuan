import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "两个人订 Homeground 的 14 天中国私家团，按两人一间算，每人准备 ¥24,630–25,930。酒店、各地导游和行程写明的境内交通在里面，国际机票要自己另买。一起走的有 6 人，14 天线最低每人 ¥19,430。能配合固定日期的话，两条 14 天小团每人 ¥18,130–18,780，每团 8–12 人。"
    },
    {
      "id": "private-heading",
      "type": "heading",
      "level": 2,
      "text": "私家团各线路价格"
    },
    {
      "id": "private-table",
      "type": "table",
      "caption": "每人起价，两人一间；国际机票另计，节假日可能有附加费",
      "columns": [
        "路线",
        "天数",
        "2 人同行",
        "4 人同行",
        "6 人同行"
      ],
      "rows": [
        [
          "北京·西安·桂林·上海",
          "10 天 9 晚",
          "¥19,430",
          "¥16,510",
          "¥15,530"
        ],
        [
          "北京·杭州·苏州·上海（不坐飞机）",
          "11 天 10 晚",
          "¥17,480",
          "¥14,880",
          "¥13,910"
        ],
        [
          "上海·张家界·凤凰·桂林",
          "13 天 12 晚",
          "¥23,330",
          "¥19,760",
          "¥18,780"
        ],
        [
          "北京·西安·黄山·杭州·苏州·上海",
          "14 天 13 晚",
          "¥24,630",
          "¥20,730",
          "¥19,430"
        ],
        [
          "北京·西安·张家界·桂林·上海",
          "14 天 13 晚",
          "¥25,280",
          "¥21,380",
          "¥20,080"
        ],
        [
          "北京·西安·大理·丽江·香格里拉",
          "14 天 13 晚",
          "¥25,280",
          "¥21,380",
          "¥20,080"
        ],
        [
          "北京·西安·成都·桂林·上海",
          "14 天 13 晚",
          "¥25,930",
          "¥22,030",
          "¥20,730"
        ],
        [
          "北京·西安·丝绸之路到乌鲁木齐",
          "15 天 14 晚",
          "¥29,830",
          "¥25,280",
          "¥23,980"
        ],
        [
          "北京·西安·成都·长江游轮·上海",
          "17 天 16 晚",
          "¥30,480",
          "¥25,930",
          "¥24,630"
        ],
        [
          "中国全景：张家界与长江游轮",
          "21 天 20 晚",
          "¥38,280",
          "¥32,430",
          "¥30,480"
        ]
      ]
    },
    {
      "id": "per-day",
      "type": "paragraph",
      "text": "2 人同行，四条 14 天线路平均下来，每人每天约 ¥1,760–1,850。北京、杭州、苏州、上海的 11 天线路每天约 ¥1,590，没有国内航班，主要坐高铁和专车。15 天丝绸之路每天约 ¥1,990。那条线距离远，用车时间也长。"
    },
    {
      "id": "group-size-heading",
      "type": "heading",
      "level": 2,
      "text": "为什么人越多每人越便宜"
    },
    {
      "id": "group-size",
      "type": "paragraph",
      "text": "导游和车是整团共用的。2 人分摊和 4 人分摊，每人负担的金额差很多。酒店、门票和车票机票仍按人收费，所以到了 6 人，每人还能省，但降幅会小一些。"
    },
    {
      "id": "small-group-heading",
      "type": "heading",
      "level": 2,
      "text": "小团价格"
    },
    {
      "id": "small-group-table",
      "type": "table",
      "caption": "2027 年 8–12 人小团，每人起价、两人一间；国际机票另计，节假日可能有附加费",
      "columns": [
        "路线",
        "天数",
        "每人",
        "单房差起价",
        "出发日期"
      ],
      "rows": [
        [
          "北京·西安·张家界·桂林·上海",
          "14 天 13 晚",
          "¥18,130",
          "¥4,490",
          "2027 年 4 月 17–30 日；2027 年 10 月 16–29 日"
        ],
        [
          "北京·西安·成都·桂林·上海",
          "14 天 13 晚",
          "¥18,780",
          "¥4,490",
          "2027 年 4 月 10–23 日；2027 年 5 月 8–21 日；2027 年 9 月 11–24 日；2027 年 10 月 9–22 日"
        ],
        [
          "北京·西安·丝绸之路到乌鲁木齐",
          "15 天 14 晚",
          "¥22,030",
          "¥4,490",
          "2027 年 6 月 12–26 日；2027 年 9 月 11–25 日"
        ],
        [
          "北京·西安·成都·长江游轮·上海",
          "17 天 16 晚",
          "¥22,680",
          "¥6,440",
          "2027 年 5 月 15–31 日；2027 年 9 月 4–20 日"
        ]
      ]
    },
    {
      "id": "includes-heading",
      "type": "heading",
      "level": 2,
      "text": "这些价格包含什么"
    },
    {
      "id": "includes",
      "type": "list",
      "items": [
        "酒店两人一间，含早餐；有条件的城市选携程 4 钻酒店，个别小城市以当地合适酒店为准",
        "每座城市游览日有当地导游和用车。私家团的导游、车只服务你们",
        "每日行程列出的景点首道门票",
        "行程列明的高铁、国内航班、游船和接送"
      ]
    },
    {
      "id": "excludes-heading",
      "type": "heading",
      "level": 2,
      "text": "不包含什么"
    },
    {
      "id": "excludes",
      "type": "list",
      "items": [
        "往返中国的国际机票",
        "游轮以外的午餐、晚餐和饮料。酒店早餐和船上餐食已含",
        "签证、旅行保险、小费和个人消费",
        "单房差、房型升级和中国节假日附加费"
      ]
    },
    {
      "id": "compare-heading",
      "type": "heading",
      "level": 2,
      "text": "私家团还是小团？"
    },
    {
      "id": "compare",
      "type": "paragraph",
      "text": "以北京、西安、成都、桂林、上海 14 天线来说，2 人私家团每人 ¥25,930，固定日期小团每人 ¥18,780。私家团的导游和车只服务你们，走快走慢都好商量。小团是 8–12 人同走一份行程。如果你们已有 8 人，也能按小团价自己定出发日。"
    },
    {
      "id": "price-note",
      "type": "callout",
      "tone": "warning",
      "title": "起价，付款前书面确认",
      "body": "付款前，先让我们把酒店、火车、航班和总价写在同一份确认里。表中只是起价，中国节假日出行可能更贵。"
    },
    {
      "id": "faq",
      "type": "faq",
      "title": "关于中国行价格的常见问题",
      "items": [
        {
          "question": "两个人去中国玩两周要多少钱？",
          "answer": "两个人走 Homeground 四条 14 天中国私家线，总价是 ¥49,260–51,860。按两人一间分摊，每人 ¥24,630–25,930。往返中国的机票和午晚餐还要另算。"
        },
        {
          "question": "私家团人多会更便宜吗？",
          "answer": "北京、西安、成都、桂林、上海 14 天私家线，每人价格随人数下降：2 人同行 ¥25,930，4 人 ¥22,030，6 人 ¥20,730。导游和车的费用由更多人分摊。"
        },
        {
          "question": "价格含国际机票吗？",
          "answer": "Homeground 公布的 10–21 天中国线路价格，从抵达中国算到离开中国。往返中国的国际机票不含。每条行程写明的国内航班、高铁和游船已含。"
        },
        {
          "question": "一个人出行要多少钱？",
          "answer": "一个人走私家团，没有现成的公布价。导游和车只服务你，我们会单独书面报价。若参加 Homeground 2027 年小团，按线路团费付，再自己住一间。单房差从 ¥4,490 起，17 天长江线从 ¥6,440 起。"
        },
        {
          "question": "为什么有些中国团便宜很多？",
          "answer": "比较中国团价格时，先看清人数、酒店等级、景点门票、高铁和国内机票有没有含，也看行程有没有购物店。Homeground 的 14 天私家团含两人一间的酒店早餐和列明的境内交通，不进购物店。各线路酒店说明会写清哪些地方能安排 4 星或携程 4 钻酒店。"
        }
      ]
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "查看这些价格对应的线路",
      "items": [
        {
          "label": "北京·西安·成都·桂林·上海 14 天 13 晚私家团",
          "href": "/zh/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/"
        },
        {
          "label": "北京·西安·成都·桂林·上海 14 天 13 晚小团",
          "href": "/zh/tours/beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour/"
        },
        {
          "label": "北京·西安·桂林·上海 10 天 9 晚私家团",
          "href": "/zh/tours/beijing-xian-guilin-shanghai-10-day-private-tour/"
        },
        {
          "label": "北京·西安·成都·长江游轮·上海 17 天 16 晚私家团",
          "href": "/zh/tours/beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour/"
        },
        {
          "label": "2027 年中国小团：日期与价格",
          "href": "/zh/guides/china-small-group-tours-2027/"
        },
        {
          "label": "中国两周游：四条 14 天线路比较",
          "href": "/zh/guides/best-2-week-china-tour/"
        },
        {
          "label": "自己安排的话，中国行要花多少钱？",
          "href": "/zh/guides/how-much-does-a-china-trip-cost/"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "公布价格来源",
      "items": [
        {
          "label": "北京·西安·黄山·杭州·上海 14 天 13 晚私家团",
          "url": "https://homegroundchina.com/zh/tours/beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour/",
          "publisher": "Homeground China",
          "reviewedAt": "2026-09-25"
        },
        {
          "label": "北京·西安·成都·桂林·上海 14 天 13 晚私家团",
          "url": "https://homegroundchina.com/zh/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/",
          "publisher": "Homeground China",
          "reviewedAt": "2026-09-25"
        },
        {
          "label": "北京·西安·张家界·桂林·上海 14 天 13 晚小团",
          "url": "https://homegroundchina.com/zh/tours/beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour/",
          "publisher": "Homeground China",
          "reviewedAt": "2026-09-25"
        },
        {
          "label": "北京·西安·成都·桂林·上海 14 天 13 晚小团",
          "url": "https://homegroundchina.com/zh/tours/beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour/",
          "publisher": "Homeground China",
          "reviewedAt": "2026-09-25"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
