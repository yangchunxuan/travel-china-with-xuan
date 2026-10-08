import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "direct-answer",
      "type": "lead",
      "text": "中国不少热门景点实行预约制，出发前分清哪些要提前订，能省下很多麻烦。故宫在参观日前7天北京时间20:00开放预约，不售当日票；国家博物馆免费，但须实名预约；天门山要按日期选择线路和入场时段。也有简单的：上海博物馆东馆普通个人入馆无需预约。"
    },
    {
      "id": "party-scenario",
      "type": "paragraph",
      "text": "热门景点的预约，很少只影响一个景点。它决定车几点来接、住哪片区域最方便、当天还能安排什么。先挑出全组最不想错过的地方，再围绕确认下来的入场时间安排行程。"
    },
    {
      "id": "priority-heading",
      "type": "heading",
      "level": 2,
      "text": "先安排哪些景点？"
    },
    {
      "id": "priority-intro",
      "type": "paragraph",
      "text": "下面对比主要景点的预约规则。放票时间均为北京时间（UTC+8），换算到你所在的时区，可能是完全不同的钟点。"
    },
    {
      "id": "priority-table",
      "type": "table",
      "caption": "景点预约规则一览",
      "columns": [
        "景点",
        "预约规则",
        "行程怎么配合"
      ],
      "rows": [
        [
          "故宫",
          "须提前预约：参观日前7天20:00开放；不售当日票",
          "北京的游览日围绕确认的日期来排。"
        ],
        [
          "天安门广场",
          "免费实名预约，现行提示为提前1–7天",
          "与故宫门票分开；关联预约例外是否仍适用须另核。"
        ],
        [
          "中国国家博物馆",
          "免费实名预约，最多提前7天；每日17:00放票",
          "选定入馆时段；每位游客都要有确认的名额。"
        ],
        [
          "兵马俑",
          "每位游客实名预约预购",
          "先确认门票，再锁定西安的交通。"
        ],
        [
          "三星堆博物馆",
          "面向入境游客的官方护照预约渠道",
          "预订广汉接驳前，先按出行日期核对当前放票窗口。"
        ],
        [
          "天门山",
          "按日期选择线路、入场时段与入口",
          "线路和入口决定当天从哪里出发、怎么接送。"
        ],
        [
          "张家界国家森林公园",
          "核对具体票种",
          "入口、时间、有效期和园内交通一起核对。"
        ],
        [
          "上海博物馆东馆",
          "普通个人入馆无需预约",
          "互动展区需另约，特展按各自条款。"
        ]
      ]
    },
    {
      "id": "separate-venues",
      "type": "callout",
      "tone": "neutral",
      "title": "同一片区域，门票各不相同",
      "body": "天安门广场、天安门城楼和故宫是三项不同的参观；上海博物馆东馆和人民广场馆的规则也不一样。进山门票不一定包含索道。免费入馆也可能需要预约，而普通免预约的展厅则无需预订。"
    },
    {
      "id": "why-it-matters",
      "type": "comparison",
      "title": "为什么一项预约会牵动一整天",
      "columns": [
        {
          "heading": "入场按时间表走",
          "body": "规则最严的景点，会在参观前几天的固定北京时间放出名额，故宫当天不卖票。名额随日期和时段变化，节假日能调整的空间更小。"
        },
        {
          "heading": "每个人都要有自己的名额",
          "body": "预约按证件逐人登记，家长的预约不会自动覆盖孩子。全组每个人都确认了，这一天才算准备好。"
        },
        {
          "heading": "当天其他安排跟着时段走",
          "body": "入场时间决定接送时间、住在哪里最方便、当天还能安排什么。如果一家人只有部分约到，整天都要重新调整。"
        }
      ]
    },
    {
      "id": "prepare-heading",
      "type": "heading",
      "level": 2,
      "text": "放票之前，先准备好这些"
    },
    {
      "id": "prepare-list",
      "type": "list",
      "ordered": true,
      "items": [
        "先定一个最重要的日期，再留一个备选日。别把最难调整的参观紧接在长途航班之后。",
        "私下整理每位同行人的姓名、证件类型和护照信息，确保每个人都能预约。",
        "提前核对官方渠道、北京时间放票时刻和展览附加预约。提前准备不等于已经可以买票。",
        "确认能使用预约账号和付款方式；表单不接受某个证件字段时，先解决，再锁定当天行程。"
      ]
    },
    {
      "id": "confirmed-heading",
      "type": "heading",
      "level": 2,
      "text": "什么才算这一天准备好了？"
    },
    {
      "id": "confirmed-copy",
      "type": "paragraph",
      "text": "看到列明每位游客、正确景点、日期和入场时段的成功预约记录，才算确认。付款通知或已提交的申请都不够。离线保存确认信息，带上每个人预约时所用的护照原件。当天仍要给正确入口、安检和索道排队留出时间。"
    },
    {
      "id": "popular-dates",
      "type": "callout",
      "tone": "neutral",
      "title": "首选没有名额时",
      "body": "留一个备选日期或时段。先调整散步、用餐这类弹性安排，别把几个固定项目挤进同一个下午。订单待确认或日期显示售罄时，先向景点官方客服核实，再考虑是否另买一张票。"
    },
    {
      "id": "attraction-guides",
      "type": "internal-links",
      "title": "各景点详细预约攻略",
      "items": [
        {
          "label": "故宫与天安门",
          "href": "/zh/guides/forbidden-city-for-foreign-visitors/"
        },
        {
          "label": "中国国家博物馆",
          "href": "/zh/guides/national-museum-of-china-booking-and-route/"
        },
        {
          "label": "兵马俑",
          "href": "/zh/guides/terracotta-warriors-without-tour/"
        },
        {
          "label": "三星堆博物馆",
          "href": "/zh/guides/sanxingdui-museum-booking-and-gallery-order/"
        },
        {
          "label": "天门山",
          "href": "/zh/guides/tianmen-mountain-tickets-and-routes/"
        },
        {
          "label": "张家界国家森林公园",
          "href": "/zh/guides/zhangjiajie-national-forest-park-tickets-and-entrances/"
        },
        {
          "label": "上海博物馆东馆",
          "href": "/zh/guides/shanghai-museum-east-entry-reservations/"
        },
        {
          "label": "莫高窟：已有预约与参观攻略",
          "href": "/zh/guides/mogao-caves-independent-visit-workflow/"
        },
        {
          "label": "没有中国手机号怎么预约",
          "href": "/zh/guides/book-china-attraction-tickets-without-chinese-phone-number/"
        }
      ]
    },
    {
      "id": "support-heading",
      "type": "heading",
      "level": 2,
      "text": "Homeground能怎样帮你"
    },
    {
      "id": "support-copy",
      "type": "paragraph",
      "text": "热门景点的预约，可能会牵动整段行程。告诉我们你的出行日期、同行人数和希望参观的地方，我们会结合具体景点和服务范围，帮你协调这些安排。"
    },
    {
      "id": "support-list",
      "type": "list",
      "items": [
        "为全组安排参观日期，并逐人核对预约信息。",
        "把入场时间和接送、酒店、火车及整条路线衔接起来。",
        "说明每个景点或线路适用哪种协助方式。",
        "付款前书面确认服务范围、费用和备选方案。"
      ]
    },
    {
      "id": "reservation-service",
      "type": "callout",
      "tone": "decision",
      "title": "八个城市的景点代预约",
      "body": "我们的代预约服务覆盖北京、上海、苏州、杭州、西安、成都、桂林和丽江的部分景点：每人每景点45元，门票按官方票面价另付，不加价。国博、三星堆这类设有外籍游客官方渠道的景点，我们从官方渠道着手，付款前先确认能提供哪些协助。",
      "link": {
        "href": "https://homegroundchina.com/zh/services/china-attraction-reservations/#reservation-enquiry",
        "label": "查看景点范围、费用与预约条款"
      }
    },
    {
      "id": "support-links",
      "type": "internal-links",
      "title": "不止一个景点要安排？",
      "items": [
        {
          "label": "中国私家团",
          "href": "/zh/tours/",
          "description": "行程内景点的预约不另收服务费，并与酒店、接驳和整条路线一起安排。"
        },
        {
          "label": "张家界私人导游",
          "href": "/zh/services/private-english-speaking-guides/#zhangjiajie",
          "description": "天门山和森林公园不在八城代预约服务内，可通过张家界私家团或导游来安排；仅导游服务时，交通和门票另行报价。"
        }
      ]
    },
    {
      "id": "faq",
      "type": "faq",
      "title": "预约前常见问题",
      "items": [
        {
          "question": "中国景点应该提前多久预约？",
          "answer": "没有全国统一的规定。出发前先做好准备，再按各景点当前的放票规则办理。故宫提前7天开放预约，这是开售时间，不代表必须恰好提前7天购买。"
        },
        {
          "question": "所有博物馆都要提前预约吗？",
          "answer": "不是。上海博物馆东馆普通个人入馆无需预约，但互动展区和收费特展另有安排。请认准具体场馆和票种。"
        },
        {
          "question": "预约成功就不用排队吗？",
          "answer": "不是。安检、护照核验、限流和索道候乘仍然存在。先订好参观，再给现场流程留出时间。"
        },
        {
          "question": "Homeground能帮我预约景点吗？",
          "answer": "八个城市的部分景点可以：代预约服务费为每人每景点45元，门票按官方价格另付，付款前我们会书面确认范围和渠道。Homeground私家团行程内的景点预约不另收服务费。天门山和张家界国家森林公园，请选择张家界私家团或私人导游服务；仅导游服务时，门票和交通另行报价。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源与图片出处",
      "items": [
        {
          "label": "故宫博物院：英语参观与订票入口",
          "url": "https://intl.dpm.org.cn/visit.html",
          "publisher": "The Palace Museum",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "中国国家博物馆：现行入馆规则与英语预约入口",
          "url": "https://en.chnmuseum.cn/visit_692/",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "兵马俑：中英文购票须知",
          "url": "https://www.bmy.com.cn/jingtai/bmyweb/ticketing.html",
          "publisher": "Emperor Qinshihuang's Mausoleum Site Museum",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "上海博物馆东馆：个人入馆与专项预约",
          "url": "https://www.shanghaimuseum.cn/mu/frontend/pg/en/service/visit-east",
          "publisher": "Shanghai Museum",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "广汉市政府：入境游客护照与英语购票服务",
          "url": "https://www.guanghan.gov.cn/gk/mbjj/gjjmb/1681915.htm",
          "publisher": "Guanghan Municipal Government",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "天安门管委会：2026年9月预约提示",
          "url": "https://tamgw.beijing.gov.cn/zhengwugongkai/tzgg/202609/t20260924_4880476.html",
          "publisher": "Tiananmen Area Management Committee",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "天门山景区2026年8月31日通知，红网刊载",
          "url": "https://tour.rednet.cn/m/content/646042/75/16221781.html",
          "publisher": "Tianmen Mountain scenic area via Rednet",
          "reviewedAt": "2026-10-08"
        }
      ]
    }
  ]
};

export default body;
