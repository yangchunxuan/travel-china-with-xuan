import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "接送点要与机票或火车票上的准确机场、车站一致。张家界4天森林路线从张家界荷花国际机场（DYG）或张家界西站接送；7天路线可从荷花机场，或最终确认方案写明的张家界车站开始，标准终点是凤凰古城站。最终方案还没写清终点前，不要先买最后一张不能改的交通票。"
    },
    {
      "id": "names-heading",
      "type": "heading",
      "level": 2,
      "text": "订票前要核对的四个正式名称"
    },
    {
      "id": "names-table",
      "type": "table",
      "caption": "正式节点、适用场景与抵达后的下一段",
      "columns": [
        "节点",
        "用来做什么",
        "抵达后还要做什么"
      ],
      "rows": [
        [
          "张家界荷花国际机场（DYG）",
          "乘飞机抵达张家界",
          "还要乘车前往已确认的市区或武陵源酒店。"
        ],
        [
          "张家界西站",
          "这些路线常用的高铁抵达站",
          "还要地面接驳；它不是张家界站，也不是景区入口。"
        ],
        [
          "芙蓉镇站",
          "乘铁路抵达芙蓉镇区域",
          "车站距景区约2.5公里，仍需地面接驳。"
        ],
        [
          "凤凰古城站",
          "抵达凤凰，也是7天路线标准终点",
          "车站不在古城步行街内，仍需当地接驳。"
        ]
      ]
    },
    {
      "id": "name-warning",
      "type": "callout",
      "title": "在12306用中文站名搜索",
      "body": "最后买票时搜索“张家界西”“芙蓉镇”或“凤凰古城”。张家界站与张家界西站是两座不同车站。方案只写“张家界火车站”，还不能拿去订票。",
      "tone": "warning"
    },
    {
      "id": "arrival-heading",
      "type": "heading",
      "level": 2,
      "text": "机场或张家界西站，都不是酒店门口"
    },
    {
      "id": "arrival-copy",
      "type": "paragraph",
      "text": "重点不是找一个对所有人都更好的抵达点，而是哪趟飞机或高铁能让全团在合适时间抵达，并留出完整地面接驳时间。住武陵源能保护森林公园游览日，但武陵源不挨着机场或高铁站。确认接站前，应提供班次、日期、到达时间和行李数量。"
    },
    {
      "id": "arrival-figure",
      "type": "figure",
      "src": "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/zhangjiajie-hehua-airport-1600.webp",
      "alt": "航站楼后方可见天门山的张家界荷花国际机场",
      "width": 1600,
      "height": 1000,
      "caption": "机场只是抵达节点；从机场到住宿地仍是一段独立行程。"
    },
    {
      "id": "route-heading",
      "type": "heading",
      "level": 2,
      "text": "4天路线和7天路线的终点不同"
    },
    {
      "id": "route-compare",
      "type": "comparison",
      "columns": [
        {
          "heading": "只游张家界",
          "body": "行程包含送往张家界荷花国际机场或张家界西站；其他离开节点须另行书面确认。"
        },
        {
          "heading": "张家界—芙蓉镇—凤凰",
          "body": "标准路线一路向南，终点为凤凰古城站。需要送回张家界时，必须提前确认额外接送和价格。"
        }
      ]
    },
    {
      "id": "furong-heading",
      "type": "heading",
      "level": 2,
      "text": "车站名不等于酒店或景区入口"
    },
    {
      "id": "last-mile-copy",
      "type": "paragraph",
      "text": "湖南省政府资料显示，芙蓉镇站距景区约2.5公里，凤凰古城站距古城主要区域约10公里。这说明“高铁直达”并不等于下车就到酒店。不要把距离换成固定车程承诺；交通、具体酒店、步行区管制、当日接驳和行李都会影响最后一段。"
    },
    {
      "id": "booking-heading",
      "type": "heading",
      "level": 2,
      "text": "买最后一张票前确认5件事"
    },
    {
      "id": "booking-list",
      "type": "list",
      "ordered": true,
      "items": [
        "乘飞机时核对正式机场名与 IATA 代码；乘高铁时核对准确中文站名。",
        "班次或航班号、日期与计划出发时间。",
        "酒店地址，以及车辆能合法停靠的位置。",
        "行李件数和尺寸，是否携带行动辅助设备。",
        "最终书面行程在凤凰结束，还是送回张家界。"
      ]
    },
    {
      "id": "dynamic-note",
      "type": "callout",
      "title": "车次必须按日期查询",
      "body": "车次、停站、票价和余票会随运行图及出行日期变化。请按实际日期在中国铁路12306查询；Homeground 会在最终书面方案中确认接送节点和时间。",
      "tone": "neutral"
    },
    {
      "id": "faq",
      "type": "faq",
      "title": "车站常见问题",
      "items": [
        {
          "question": "张家界西站和张家界站是同一个车站吗？",
          "answer": "不是。它们是两座不同车站。安排车辆前，必须按票面中文站名核对。"
        },
        {
          "question": "司机能去机场或张家界西站接我们吗？",
          "answer": "张家界4天森林路线包含荷花机场或张家界西站接客；7天路线可从荷花机场，或最终确认方案写明的张家界车站开始。其他接客点须另行确认，并提供班次与行李信息。"
        },
        {
          "question": "7天路线D7会送回张家界吗？",
          "answer": "默认不会。标准终点是凤凰古城站。送回张家界需要在付款前确认另一套接送方案和价格。"
        },
        {
          "question": "询价前要先买高铁票吗？",
          "answer": "可以先提供准备购买的班次，但在路线和接送点核对完之前，不建议购买不能改的票。最后一张票可能改变最后一晚和D7接送。"
        }
      ]
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "先定起终点，再选路线",
      "items": [
        {
          "label": "张家界、芙蓉镇与凤凰7天6晚私家团",
          "href": "/zh/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/",
          "description": "标准路线从张家界开始，在凤凰古城站结束。"
        },
        {
          "label": "张家界森林公园4天3晚私家团",
          "href": "/zh/tours/zhangjiajie-forest-4-day-private-tour/",
          "description": "行程所含抵达与离开接送使用荷花机场或张家界西站。"
        },
        {
          "label": "7天路线为什么这样排",
          "href": "/zh/guides/zhangjiajie-furong-fenghuang-route-order/",
          "description": "查看3+1+2晚、行李处理和不折返的路线逻辑。"
        },
        {
          "label": "张家界市区还是武陵源住宿",
          "href": "/zh/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          "description": "别只看车站地图，先保护完整的森林公园游览日。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方交通资料",
      "items": [
        {
          "label": "中国铁路12306现行站名数据",
          "url": "https://kyfw.12306.cn/otn/resources/js/framework/station_name.js",
          "publisher": "中国铁路12306",
          "reviewedAt": "2026-09-20"
        },
        {
          "label": "张吉怀高铁正式站序",
          "url": "https://www.mct.gov.cn/whzx/qgwhxxlb/hn_7731/202112/t20211207_929617.htm",
          "publisher": "中华人民共和国文化和旅游部",
          "reviewedAt": "2026-09-20"
        },
        {
          "label": "湖南铁路站点与官方英文名称",
          "url": "https://www.enghunan.gov.cn/hneng/Services/Live/Transportation/RailwayStations/202607/t20260703_34019377.html",
          "publisher": "湖南省人民政府",
          "reviewedAt": "2026-09-20"
        },
        {
          "label": "张家界荷花国际机场",
          "url": "https://enghunan.gov.cn/hneng/Services/Live/Transportation/Airports/202606/t20260604_33993921.html",
          "publisher": "湖南省人民政府",
          "reviewedAt": "2026-09-20"
        },
        {
          "label": "凤凰古城站接驳与张吉怀高铁沿线",
          "url": "https://www.hunan.gov.cn/hnszf/hnyw/zwdt/202112/t20211206_21247807.html",
          "publisher": "湖南省人民政府",
          "reviewedAt": "2026-09-20"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
