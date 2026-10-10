import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "阳朔在桂林南面，是漓江边喀斯特山峰之间的一座小县城，漓江游船的终点就在这里。西街、遇龙河两岸和兴坪古镇都可以免费逛；要花钱的是竹筏、夜间演出《印象·刘三姐》和相公山这样的观景点。叫“阳朔站”的火车站在兴坪，不在县城。住两晚：一天看遇龙河乡间，一天去兴坪和漓江。"
    },
    {
      "id": "what-heading",
      "type": "heading",
      "level": 2,
      "text": "阳朔是什么地方？"
    },
    {
      "id": "what-copy",
      "type": "paragraph",
      "text": "阳朔是桂林之行里“乡间”的那一半。县城不大：主街西街有一千四百多年历史，沿街建筑保留着桂北明清风格，一直通到漓江边。真正让人专程来的在城外：稻田里拔地而起的石灰岩山峰、水流平缓的遇龙河，以及兴坪附近印在 20 元人民币背面的那段漓江。"
    },
    {
      "id": "see-heading",
      "type": "heading",
      "level": 2,
      "text": "看什么、要不要钱"
    },
    {
      "id": "see-table",
      "type": "table",
      "caption": "阳朔的主要看点",
      "columns": [
        "看点",
        "是什么",
        "费用和时间"
      ],
      "rows": [
        [
          "西街",
          "县城的老步行街：咖啡馆、酒吧和卖啤酒鱼的餐馆，白天安静，晚上热闹。街的尽头就是漓江",
          "免费；全天开放"
        ],
        [
          "遇龙河",
          "漓江的支流，长四十多公里，人称“小漓江”。船工撑着竹筏冲过一道道小水坝；沿河可以骑车，会经过明代的遇龙桥和富里桥",
          "两岸免费；竹筏每筏（两人）200–320 元（2026 年 6 月攻略）"
        ],
        [
          "兴坪",
          "阳朔北面漓江边的古镇，有一千七百多年历史。从镇上的码头坐竹筏可以到黄布倒影，也就是 20 元人民币背面的那幅画面",
          "古镇免费；漓江竹筏标价 90 元起，约 09:00–16:30"
        ],
        [
          "相公山",
          "兴坪镇境内漓江西岸的山顶观景点，脚下是漓江的一个大弯。台阶比较陡，约 20 分钟登顶。摄影的人来这里拍日出和云雾",
          "要门票；04:30–19:00"
        ],
        [
          "《印象·刘三姐》",
          "在漓江水面上、以山峰为背景的夜间实景演出，由张艺谋、王潮歌、樊跃导演。没有连贯的故事，山歌也不翻译，看的是场面",
          "标价 238 元起；晚间演出，场次不固定"
        ]
      ]
    },
    {
      "id": "li-river-figure",
      "type": "figure",
      "src": "/images/guides/yangshuo-china/li-river-1600.webp",
      "alt": "从山顶俯瞰漓江的一道弯，两岸是喀斯特山峰和村庄田地",
      "width": 1600,
      "height": 1000,
      "caption": "阳朔北面的漓江。摄影：Homeground China"
    },
    {
      "id": "raft-heading",
      "type": "heading",
      "level": 2,
      "text": "遇龙河竹筏：分段和价格"
    },
    {
      "id": "raft-copy",
      "type": "paragraph",
      "text": "竹筏按码头分段运营，订的是其中一段，不是整条河。上游金龙桥到旧县这段更清静；下游几段的终点靠近可以骑车的十里画廊。下表是 2026 年 6 月一篇中文攻略列出的情况。"
    },
    {
      "id": "raft-table",
      "type": "table",
      "caption": "遇龙河竹筏分段（2026 年 6 月攻略）",
      "columns": [
        "航段",
        "时长",
        "所列价格",
        "说明"
      ],
      "rows": [
        [
          "金龙桥—旧县",
          "约 90 分钟",
          "每筏（两人）320 元",
          "9 道水坝；经过明代的遇龙桥"
        ],
        [
          "骥马—工农桥",
          "约 90 分钟",
          "每筏（两人）320 元",
          "9 道水坝；沿岸村落更多"
        ],
        [
          "水厄底—综合码头",
          "约 40 分钟",
          "每筏（两人）200 元",
          "4 道水坝；旺季排队久"
        ],
        [
          "富里桥码头",
          "约 40 分钟",
          "每筏（四人）280 元",
          "不过水坝；水面平静"
        ],
        [
          "万景码头",
          "约 30 分钟",
          "八人筏，每人 45 元",
          "不过水坝；唯一允许 1 米以下儿童和 70 岁以上老人乘坐的航段"
        ]
      ]
    },
    {
      "id": "raft-notes",
      "type": "list",
      "items": [
        "1 米以下儿童、70 岁以上老人、孕妇和心脏病患者不能坐双人筏。",
        "官方订票渠道是微信小程序“遇龙河景区”和“i游阳朔”。同一篇攻略说，次日的票每晚 20:00 放出，热门码头很快售完。",
        "价格和航段会调整，订票当天再核对，上面的数字只用来了解大致水平。",
        "不想坐竹筏，就沿河边小路骑车，看到的是同样的风景，也不用订票。"
      ]
    },
    {
      "id": "raft-figure",
      "type": "figure",
      "src": "/images/guides/yangshuo-china/raft-1600.webp",
      "alt": "阳朔一条平静的绿色河面上，竹筏的筏头正对着岸边的竹丛和远处的喀斯特山峰",
      "width": 1600,
      "height": 1000,
      "caption": "阳朔的竹筏上。摄影：Homeground China"
    },
    {
      "id": "notes-heading",
      "type": "heading",
      "level": 2,
      "text": "门票和实用提示"
    },
    {
      "id": "notes-list",
      "type": "list",
      "items": [
        "相公山所列优惠：6 岁及以下或 1.2 米及以下儿童免票；6–18 岁和学生半价；60–64 岁半价；65 岁及以上免票。外国游客请先问清护照能否作为年龄证明。",
        "《印象·刘三姐》是露天演出，下雨会影响当晚安排。1.2 米以下儿童所列为免票。",
        "西街很晚都吵。想早睡就住遇龙河边，进城吃晚饭。",
        "当地的招牌菜是啤酒鱼，用啤酒、番茄和辣椒烧的河鱼。"
      ]
    },
    {
      "id": "getting-there-heading",
      "type": "heading",
      "level": 2,
      "text": "怎么去、怎么走"
    },
    {
      "id": "getting-there-list",
      "type": "list",
      "items": [
        "最经典的走法是从桂林坐漓江游船，终点就是阳朔。行李要另外走公路，游船那天之前先安排好。",
        "阳朔站在兴坪，不在县城的酒店旁边。安排接送时，把车站和酒店当成两个地方来算。",
        "县城里靠步行。去遇龙河要骑自行车、电动车或坐车；去兴坪和相公山要坐车。"
      ]
    },
    {
      "id": "days-heading",
      "type": "heading",
      "level": 2,
      "text": "阳朔玩几天"
    },
    {
      "id": "days-list",
      "type": "list",
      "items": [
        "抵达当天：坐漓江游船进阳朔，入住后晚上逛西街。",
        "第一个整天：骑车或坐竹筏看遇龙河乡间，节奏放慢。",
        "如果还有第二个整天：去兴坪看 20 元人民币上的风景，相公山要趁早上的光线。夜间演出放在哪天晚上都可以。",
        "至少住两晚，才值得从桂林专程过来。只住一晚，就只剩一个晚上。"
      ]
    },
    {
      "id": "tours",
      "type": "internal-links",
      "title": "规划阳朔",
      "items": [
        {
          "label": "桂林·阳朔 5 天私家团",
          "href": "/zh/tours/guilin-yangshuo-5-day-private-tour/",
          "description": "坐漓江游船进阳朔，连住两晚，安排一天遇龙河乡间；游船当天行李另走公路。"
        },
        {
          "label": "阳朔住哪里：县城还是遇龙河",
          "href": "/zh/guides/yangshuo-town-or-yulong-river-where-to-stay/",
          "description": "西街的夜晚，还是河边的清静。"
        },
        {
          "label": "漓江游船：船票、码头和预订",
          "href": "/zh/guides/li-river-cruise-tickets-piers-booking/",
          "description": "坐哪种船、从哪个码头上、行李怎么办。"
        },
        {
          "label": "桂林到阳朔：交通怎么选",
          "href": "/zh/guides/guilin-yangshuo-transport-route/",
          "description": "公路、到兴坪的铁路，还是水路。"
        },
        {
          "label": "桂林、阳朔、龙脊：先后顺序",
          "href": "/zh/guides/guilin-yangshuo-longji-route-order/",
          "description": "加上梯田又不走回头路的排法。"
        }
      ]
    },
    {
      "id": "faq",
      "type": "faq",
      "title": "阳朔常见问题",
      "items": [
        {
          "question": "阳朔在哪里？",
          "answer": "在中国南方的广西，是桂林下辖的一个县，位于桂林市区以南的漓江边，也是漓江游船的终点。"
        },
        {
          "question": "阳朔玩几天合适？",
          "answer": "住两晚：抵达当晚加一个整天看遇龙河乡间。想去兴坪和相公山，再加一晚。"
        },
        {
          "question": "阳朔西街要门票吗？",
          "answer": "不要。西街是公共街道，全天开放，没有门票。"
        },
        {
          "question": "遇龙河竹筏多少钱？",
          "answer": "2026 年 6 月的攻略显示：两段约 90 分钟的航段每筏（两人）320 元，约 40 分钟的航段 200 元，较短的万景码头航段每人 45 元。订票时再核对。"
        },
        {
          "question": "20 元人民币背面的风景在哪里？",
          "answer": "在阳朔县城北面的兴坪，漓江边。从兴坪码头坐竹筏可以到画面所在的黄布倒影。"
        },
        {
          "question": "从桂林怎么去阳朔？",
          "answer": "坐漓江游船、走公路，或者坐火车到阳朔站；阳朔站在兴坪，到县城还要再坐车。"
        },
        {
          "question": "住桂林还是住阳朔？",
          "answer": "可以的话两边都住。桂林是抵达城市和游船起点，乡间风光在阳朔。我们的五天路线两地各住两晚。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "资料来源",
      "items": [
        {
          "label": "阳朔景点列表：2026 年 10 月 10 日的标价",
          "url": "https://you.ctrip.com/sight/yangshuo702.html",
          "publisher": "携程",
          "reviewedAt": "2026-10-10"
        },
        {
          "label": "阳朔西街：历史与开放时间",
          "url": "https://you.ctrip.com/sight/yangshuo702/22079.html",
          "publisher": "携程",
          "reviewedAt": "2026-10-10"
        },
        {
          "label": "遇龙河景区：长度、竹筏分段与古桥",
          "url": "https://you.ctrip.com/sight/yangshuo702/22081.html",
          "publisher": "携程",
          "reviewedAt": "2026-10-10"
        },
        {
          "label": "遇龙河竹筏票怎么在官方小程序预约（2026 年 6 月 26 日）",
          "url": "https://travel.sina.cn/2026-06-26/detail-inietfxy1990740.d.html",
          "publisher": "新浪文旅指南",
          "reviewedAt": "2026-10-10"
        },
        {
          "label": "兴坪古镇：历史、码头与 20 元人民币取景地",
          "url": "https://you.ctrip.com/sight/yangshuo702/26887.html",
          "publisher": "携程",
          "reviewedAt": "2026-10-10"
        },
        {
          "label": "相公山景区：位置、开放时间与优待政策",
          "url": "https://you.ctrip.com/sight/yangshuo702/1417461.html",
          "publisher": "携程",
          "reviewedAt": "2026-10-10"
        },
        {
          "label": "《印象刘三姐》山水实景演出：演出介绍与导演",
          "url": "https://you.ctrip.com/sight/yangshuo702/22077.html",
          "publisher": "携程",
          "reviewedAt": "2026-10-10"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
