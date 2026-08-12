import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "飞机和火车不是一套可以互换的规则。自 2025 年 6 月 28 日起，境内航班禁止携带没有清晰标识、没有 CCC 认证标志或属于召回型号的充电宝；航空同时执行随身携带和额定能量限制。铁路规则要求标志清晰且额定能量不超过 100Wh。"
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "飞机与火车对照",
      "columns": [
        "情况",
        "选择",
        "行动"
      ],
      "rows": [
        [
          "中国境内航班",
          "仅随身；容量清晰且有 CCC 标志",
          "不超过 100Wh 通常无需批准；100–160Wh 需航司批准且最多两块。"
        ],
        [
          "从中国出发的国际航班",
          "锂电池规则加航司、机场检查",
          "确认 2025 年境内航班 CCC 通知是否适用于准确航段。"
        ],
        [
          "高铁或普通列车",
          "标志清晰，额定能量不超过 100Wh",
          "保护电极，设备保持完好。"
        ],
        [
          "标识不清、损坏或已召回",
          "不要携带",
          "更换设备；无法靠解释代替可读标签。"
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "看 Wh，不只看 mAh"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "优先使用标签上的瓦时数。只有电压和安时时可用 Wh = V × Ah；10,000mAh 是 10Ah，但仍需准确额定电压。",
        "乘机时充电宝放在手提行李，不可托运；防止短路，按民航局指引飞行中不得使用。",
        "CE、FCC 等标志不等于中国 CCC 标志，不要自行制作或补贴标签。",
        "航司、安检和召回公告可严于一般阈值，最终运输决定由现场按实时规则作出。"
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "打包检查"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "在光线充足处拍摄充电宝两面，确认品牌、型号、Wh 和标志可读。",
        "查询制造商与监管机构的型号召回信息。",
        "乘中国境内航班时确认真实 CCC 标志；没有或看不清就换设备。",
        "放入随身行李，保护电极并避免误启动。",
        "只乘火车时确认额定能量不超过 100Wh 且标注清晰。"
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "安检不允许携带时",
      "body": "不要用网上摘要争执，也不要偷偷放入托运行李。询问是否有官方放弃、返回值机区或其他合规处理方式；智能配件注意个人数据，有凭证时索取凭证，只按安检正式流程继续。",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "适用边界与实时规则",
      "body": "100Wh 与 160Wh 是民航一般阈值；2025 年 CCC 通知明确针对中国境内航班。国际航段、联程、航司和召回必须在旅行当周核查。铁路工作人员按实时目录和实际设备状态执行。",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "电源插头、电压与转换器",
          "href": "/zh/guides/china-power-plugs-voltage-and-adapters/",
          "description": "确认如何为合规设备充电。"
        },
        {
          "label": "第一次坐中国高铁",
          "href": "/zh/guides/china-high-speed-train-first-time-guide/",
          "description": "准备车站安检和上车。"
        },
        {
          "label": "国际航班前最后一晚",
          "href": "/zh/guides/china-last-night-before-international-flight/",
          "description": "重新打包前做标签检查。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已复核的官方来源",
      "items": [
        {
          "label": "CAAC notice on CCC-marked power banks (2025)",
          "url": "https://www.caac.gov.cn/English/News/202507/t20250709_227894.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "CAAC lithium battery and power bank limits",
          "url": "https://www.caac.gov.cn/big5/www.caac.gov.cn/XXGK/XXGK/TZTG/201511/t20151105_11173.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Railway passenger prohibited and restricted items catalogue",
          "url": "https://big5.www.gov.cn/gate/big5/www.gov.cn/zhengce/zhengceku/2022-05/31/content_5693212.htm",
          "publisher": "National Railway Administration / Ministry of Public Security",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
