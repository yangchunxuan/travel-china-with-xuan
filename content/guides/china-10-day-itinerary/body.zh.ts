import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "第一次来中国，只有10天，如果你最想看皇家历史、兵马俑，并以现代城市收尾，可以先考虑北京—西安—上海。想少换酒店，或把更多时间留给自然，就选两地。真正需要先决定的是舍弃什么：10天足够走一条有收获的路线，但每加一座城市，都会分走原本留给游览的时间。"
    },
    {
      "id": "choose-heading",
      "type": "heading",
      "level": 2,
      "text": "先选想要的旅行，再选车票机票"
    },
    {
      "id": "choose",
      "type": "paragraph",
      "text": "北京—西安—上海给北京3个完整游览日、西安1天、上海2天，最后一天保持灵活。去西安的明确理由是兵马俑；如果它不是重点，把这两晚留给北京或上海也很好。"
    },
    {
      "id": "count-nights",
      "type": "callout",
      "tone": "decision",
      "title": "这10天包括抵达与离开，住宿共9晚",
      "body": "第1–4晚住北京，第5–6晚住西安，第7–9晚住上海。第1天抵达，第10天离开，都不能默认当作完整游览日。国际飞行可能在中国行程前后另占日历日。如果你从出家门到回家总共只有10天，请先数清实际能在中国停留几天，再使用这份安排。"
    },
    {
      "id": "classic-heading",
      "type": "heading",
      "level": 2,
      "text": "经典10天路线：北京、西安、上海"
    },
    {
      "id": "classic-intro",
      "type": "paragraph",
      "text": "这份示例从北京入境、上海离境。先确认国际航班能否匹配，再按已确认的预约和实际日历调整游览顺序。"
    },
    {
      "id": "day-1-heading",
      "type": "heading",
      "level": 3,
      "text": "第1天：抵达北京"
    },
    {
      "id": "day-1",
      "type": "paragraph",
      "text": "给入境、前往酒店和休息留出时间。有精神就在附近吃饭、短距离散步，轻松度过第一晚。晚到也算第1天，给自己一个从容的开始。住北京，第1晚，共4晚。"
    },
    {
      "id": "day-2-heading",
      "type": "heading",
      "level": 3,
      "text": "第2天：故宫与天安门区域"
    },
    {
      "id": "day-2",
      "type": "paragraph",
      "text": "完成必要预约并确认通行安排后，游览故宫与天安门区域。故宫不售当日票，通常周一闭馆；需要时与其他北京游览日对调，并根据你的预约核对天安门当前入场规则。给这片北京历史中心留足时间。住北京。"
    },
    {
      "id": "day-3-heading",
      "type": "heading",
      "level": 3,
      "text": "第3天：八达岭长城"
    },
    {
      "id": "day-3",
      "type": "paragraph",
      "text": "把八达岭作为当天主要行程，留足往返交通时间，按同行者体力安排步行。一起决定适合的折返点，也给沿途停下来欣赏风景留些余量。户外走了一天，回北京后好好吃顿饭，轻松度过晚上。住北京。"
    },
    {
      "id": "day-4-heading",
      "type": "heading",
      "level": 3,
      "text": "第4天：天坛与胡同"
    },
    {
      "id": "day-4",
      "type": "paragraph",
      "text": "安排天坛和一片胡同街区，中间保留午饭休息及交通时间。让北京段以较慢的节奏收尾，除了地标，也看看街巷里的日常生活。下午可按体力调整，晚上收拾行李。住北京，第4晚，也是最后一晚。"
    },
    {
      "id": "day-5-heading",
      "type": "heading",
      "level": 3,
      "text": "第5天：转场西安"
    },
    {
      "id": "day-5",
      "type": "paragraph",
      "text": "这一天用于退房、去车站或机场、跨城移动以及到新酒店。比较实际可用的铁路与航班时，要看酒店到酒店的完整耗时。抵达后保持灵活：先安顿、吃饭，有兴致就在附近散散步。住西安，第1晚，共2晚。"
    },
    {
      "id": "day-6-heading",
      "type": "heading",
      "level": 3,
      "text": "第6天：兵马俑"
    },
    {
      "id": "day-6",
      "type": "paragraph",
      "text": "将当天主要时间留给兵马俑，包括往返交通。安排行程时，决定这里是否需要导游讲解。晚上以吃饭和休息为主，有余力再加城市散步。这是你在西安唯一的完整游览日。住西安，第2晚。"
    },
    {
      "id": "day-7-heading",
      "type": "heading",
      "level": 3,
      "text": "第7天：转场上海"
    },
    {
      "id": "day-7",
      "type": "paragraph",
      "text": "把这一天作为第二个完整转场日。出票前比较可用的铁路和航班，并核对具体到达车站或机场与酒店的位置。留一个轻松的晚上，慢慢进入旅程最后一座城市的节奏。住上海，第1晚，共3晚。"
    },
    {
      "id": "day-8-heading",
      "type": "heading",
      "level": 3,
      "text": "第8天：在上海街头慢慢走"
    },
    {
      "id": "day-8",
      "type": "paragraph",
      "text": "先看外滩，再选一片感兴趣的街区。如果喜欢博物馆或高楼观景，可以选其一作为另一个重点，并另行核实当时的入场安排。在景点之间留出慢慢吃饭、随意走走的时间，看看天际线之外的上海。住上海。"
    },
    {
      "id": "day-9-heading",
      "type": "heading",
      "level": 3,
      "text": "第9天：保留缓冲，或另选苏州一日"
    },
    {
      "id": "day-9",
      "type": "paragraph",
      "text": "默认留在上海，补上前面没去成的地方、放慢游览，或休息。想换个环境，也可以改为苏州一日游，另行确认往返交通、当地接驳及所选景点。保留原来的上海酒店，当晚回来住第9晚，准备次日离境。"
    },
    {
      "id": "day-10-heading",
      "type": "heading",
      "level": 3,
      "text": "第10天：离开中国"
    },
    {
      "id": "day-10",
      "type": "paragraph",
      "text": "按已确认的国际航班安排退房与去机场。晚班机可能容得下附近一顿饭，但这天仍按离境日计算。如果必须从北京飞回家，就把回北京这段明确排进去，并相应减少游览或延长旅行。"
    },
    {
      "id": "product-boundary",
      "type": "paragraph",
      "text": "这是一份规划示例，不是在售10天套餐。以下当地产品各有天数和服务范围，可供选路线时参考；组合成完整10天安排，需要单独确认行程与报价。"
    },
    {
      "id": "classic-products",
      "type": "internal-links",
      "title": "了解经典线对应的当地产品",
      "items": [
        {
          "label": "北京精华5天私人游",
          "href": "/zh/tours/beijing-highlights-5-day-private-tour/"
        },
        {
          "label": "西安与兵马俑5天私人游",
          "href": "/zh/tours/xian-terracotta-warriors-5-day-private-tour/"
        },
        {
          "label": "上海与苏州5天私人游",
          "href": "/zh/tours/shanghai-suzhou-5-day-private-tour/"
        }
      ]
    },
    {
      "id": "alternatives-heading",
      "type": "heading",
      "level": 2,
      "text": "经典线不适合你时，还有两种取舍"
    },
    {
      "id": "slow-heading",
      "type": "heading",
      "level": 3,
      "text": "两地慢游：北京5晚＋上海4晚"
    },
    {
      "id": "slow",
      "type": "paragraph",
      "text": "如果想慢慢吃饭、多逛街区或少收拾几次行李，选这条。舍去西安和兵马俑，换来全程只跨城一次。首尾两天仍留给抵达、离开，中间保留完整转场日。多出的住宿让北京更容易调整游览顺序，也让上海更灵活，不必又全部变成新的近郊一日游。"
    },
    {
      "id": "nature-heading",
      "type": "heading",
      "level": 3,
      "text": "自然优先：北京4晚＋张家界5晚"
    },
    {
      "id": "nature",
      "type": "paragraph",
      "text": "如果森林步行与山景比西安或上海更吸引你，选这条。第5天用于完整转场张家界，第6–9天分配户外游览与休息，保留按天气调整的余量。多住几晚，能让旅行节奏更贴近自然。出票前同时检查进张家界的连接和回程航班；如果离境还需多一段接驳，可能要增加一晚或减少游览。"
    },
    {
      "id": "forest-product",
      "type": "internal-links",
      "title": "了解森林路线产品",
      "items": [
        {
          "label": "张家界森林4天私人游",
          "href": "/zh/tours/zhangjiajie-forest-4-day-private-tour/",
          "description": "现有4天产品，可结合你的完整中国旅行另行讨论如何衔接。"
        }
      ]
    },
    {
      "id": "booking-heading",
      "type": "heading",
      "level": 2,
      "text": "订下路线之前"
    },
    {
      "id": "booking",
      "type": "list",
      "items": [
        "确认实际在中国的日期、入境与离境城市，以及哪9晚需要酒店。",
        "出票前查实际可用交通。比较车站或机场接驳及到酒店的时间，不只看列车或飞机运行多久。",
        "坐铁路时，用实际随身携带的护照订票，并带上该证件原件；中国铁路要求乘客使用购票证件乘车。",
        "付款前确认重要预约、步行需求与退改条件。讨论调整时，始终保留转场日和上海缓冲日。"
      ]
    },
    {
      "id": "further-reading",
      "type": "internal-links",
      "title": "选好路线后，再看细节",
      "items": [
        {
          "label": "北京—张家界—上海深度路线",
          "href": "/zh/guides/beijing-zhangjiajie-shanghai-10-days/",
          "description": "三地都不想舍弃，可读这篇详细攻略：主行程示例按11天10晚展开，也说明了更宽松的晚数选择。"
        },
        {
          "label": "外国游客游故宫",
          "href": "/zh/guides/forbidden-city-for-foreign-visitors/",
          "description": "梳理预约、入场与实际游览安排。"
        },
        {
          "label": "张家界森林公园门票与入口",
          "href": "/zh/guides/zhangjiajie-national-forest-park-tickets-and-entrances/",
          "description": "细化自然路线中的森林公园部分。"
        }
      ]
    },
    {
      "id": "help-heading",
      "type": "heading",
      "level": 2,
      "text": "把选中的路线变成可预订的安排"
    },
    {
      "id": "help",
      "type": "paragraph",
      "text": "需要协助时，请说明日期、人数、想走的路线和步行节奏，方便核对哪些当地安排适合你的旅行。"
    },
    {
      "id": "product-links",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "咨询你的中国路线",
          "href": "/zh/#planner-contact"
        },
        {
          "label": "查看全部私人游产品",
          "href": "/zh/tours/"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方资料：2026年9月8日核对",
      "items": [
        {
          "label": "铁路购票与身份证件说明",
          "url": "https://www.12306.cn/en/faq.html",
          "publisher": "中国铁路12306",
          "reviewedAt": "2026-09-08"
        },
        {
          "label": "故宫博物院参观规则",
          "url": "https://intl.dpm.org.cn/visit.html",
          "publisher": "故宫博物院",
          "reviewedAt": "2026-09-08"
        },
        {
          "label": "天安门广场参观信息",
          "url": "https://english.beijing.gov.cn/travellinginbeijing/attractions/202603/t20260325_4566110.html",
          "publisher": "北京市人民政府",
          "reviewedAt": "2026-09-08"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
