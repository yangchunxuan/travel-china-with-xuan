import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "direct-answer",
      "type": "lead",
      "text": "中国旅行中，有些最期待的一天，要先从出发前的预约安排开始。故宫不售当日票，国博需要免费实名预约，天门山要选对日期、线路和入场时段；上海博物馆东馆普通个人游客则无需提前预约。先找出全家最不想错过的景点，再围绕已确认的名额安排行程。"
    },
    {
      "id": "party-scenario",
      "type": "paragraph",
      "text": "假设一家人只有两个北京游览日，其中一座博物馆是必去项目：如果只有部分同行人约到，整天安排仍要调整。假期或固定离境日期会压缩改期空间。出发前，值得先准备同行名单、看准中国时间的放票窗口。"
    },
    {
      "id": "early-support",
      "type": "callout",
      "tone": "decision",
      "title": "把预约安排放进行程里",
      "body": "把必看景点的日期、全组人数和接送需求告诉Homeground。我们可帮你核对预约与当天行程如何衔接，以及理想时段没有名额时的替代安排。服务页面列出景点范围、费用和条款，适配范围与渠道会在付款前书面确认。",
      "link": {
        "href": "https://homegroundchina.com/zh/services/china-attraction-reservations/#reservation-enquiry",
        "label": "查看适配的预约支持"
      }
    },
    {
      "id": "priority-heading",
      "type": "heading",
      "level": 2,
      "text": "哪些景点应该先关注预约？"
    },
    {
      "id": "priority-table",
      "type": "table",
      "caption": "中国旅行预约重点清单；放票时间均为中国时间（UTC+8）",
      "columns": [
        "景点",
        "预约优先级",
        "关键判断"
      ],
      "rows": [
        [
          "故宫",
          "必须提前预约",
          "提前7天20:00开放；不售当日票。"
        ],
        [
          "天安门广场",
          "免费，但须提前预约",
          "现行提示为提前1–7天；关联预约例外须另核。"
        ],
        [
          "中国国家博物馆",
          "免费实名预约",
          "最多提前7天，每日17:00放票；选择入馆时段。"
        ],
        [
          "兵马俑",
          "实名预约预购",
          "逐人预约预购，锁定交通前先确认当前名额。"
        ],
        [
          "三星堆博物馆",
          "先准备官方护照预约渠道",
          "已有英语护照购票服务依据；当前放票窗口需确认。"
        ],
        [
          "天门山",
          "选择日期、线路与时段",
          "核对出行日期、在售线路、入场时段与入口。"
        ],
        [
          "张家界国家森林公园",
          "核对具体票种",
          "一起核对入口、时间、有效期与交通包含项。"
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
      "type": "paragraph",
      "text": "先认准具体场馆。天安门广场、城楼和故宫是不同参观项目，上海东馆与人民广场馆规则不同，进山票也可能不含索道。免费入馆仍可能需要预约，普通免预约展厅则没有需要代订的内容。"
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
      "items": [
        "定一个必去日期和可行备选日；抵达日保留弹性，别把最难调整的预约紧接航班安排。",
        "私下整理姓名、证件类型和人数；逐人核对，家长的预约不会自动覆盖孩子。",
        "放票前核对官方渠道、中国时间和展览附加预约；提前准备不等于已经可以买票。",
        "确保带上预约所用护照原件，并能使用预约账号和付款方式；证件字段不通过时，先处理再锁定当天行程。"
      ]
    },
    {
      "id": "popular-dates-heading",
      "type": "heading",
      "level": 2,
      "text": "热门日期，更需要留出调整空间"
    },
    {
      "id": "popular-dates",
      "type": "paragraph",
      "text": "放票窗口让你有机会争取名额，不代表全组已经有票。保留一个备选日期或时段。重点预约没有合适名额时，先调整散步或餐食等弹性部分，不要把多个固定项目硬塞进同一下午。即使门票已经确认，也要给正确入口、安检和索道候乘留出时间。"
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
      "text": "逐一确认预约成功记录上的游客、景点、日期和时段。付款通知或已提交需求都不足以确认入场。带上对应证件原件，离线保存确认信息。日期售罄或订单待确认时，先通过景点官方支持和对应攻略核实，别再买第二张状态不明的票。"
    },
    {
      "id": "attraction-guides",
      "type": "internal-links",
      "title": "具体景点，接着看对应攻略",
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
      "text": "按真正需要的协助方式来选"
    },
    {
      "id": "support-copy",
      "type": "paragraph",
      "text": "只协调一张票，可以先看适配的预约支持；如果还涉及多城、酒店和固定离境安排，就需要整体行程方案。Homeground私团行程内的景点预约不另收代预约服务费。张家界不在独立代预约八城目录中，可选择已有私团或导游服务来协调山景游览日。国博与三星堆先从官方渠道开始，外部预约协助须按景点另行确认。"
    },
    {
      "id": "support-links",
      "type": "internal-links",
      "title": "选择适配的旅行服务",
      "items": [
        {
          "label": "中国私家团",
          "href": "/zh/tours/",
          "description": "把预约、酒店、接驳和整条路线一起协调。"
        },
        {
          "label": "张家界私人导游",
          "href": "/zh/services/private-english-speaking-guides/#zhangjiajie",
          "description": "仅导游服务；交通和门票另行报价。"
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
          "answer": "没有全国统一窗口。出发前先准备，再按具体景点当前放票规则办理。故宫提前7天开放，是销售窗口，不代表必须恰好提前7天买。"
        },
        {
          "question": "所有博物馆都要提前预约吗？",
          "answer": "不是。上海博物馆东馆普通个人入馆无需预约，互动展区和收费特展另按具体安排；认准场馆和项目。"
        },
        {
          "question": "预约成功就不用排队吗？",
          "answer": "仍可能需要安检、护照核验、限流和索道候乘。先落实预约，再给现场流程留出时间。"
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
