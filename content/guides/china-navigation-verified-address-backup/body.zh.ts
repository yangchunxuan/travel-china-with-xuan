import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "不存在适合所有旅客、设备和中国城市的唯一“最佳地图”。你可以把手机上能稳定使用的地图当作工作层，但目的地必须独立于某个 App：保存官方中文名、城市、区县、完整地址、分店或航站楼、实际可用入口、公开电话和附近地标，再在接收方地图里重新搜索，并把文字离线保存。这样即使链接失效、换了 App 或蓝点漂移，目的地仍可核实。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "先选对目的地，再选地图",
      "body": "对已在中国设置好的 iPhone，Apple 地图可能是方便的前端；Apple 说明其中国地图服务使用高德地图服务。高德和百度也可能提供较完整的本地地点数据，但品牌本身不能证明某个搜索结果就是正确分店或开放入口。先核实地点身份，再准备同日第二条路线或有人值守的地标。本页是核实流程，不是 App 排行。",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "按这个矩阵确认"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "最薄弱的一项决定现在能否安全出发",
      "columns": [
        "你现在拥有",
        "可以确认",
        "仍然缺少",
        "决定"
      ],
      "rows": [
        [
          "酒店或景点英文名",
          "品牌或大致地点",
          "中文分店、区县、门牌号和入口",
          "先不要出发，补齐中文目的地卡。"
        ],
        [
          "从另一个 App 分享来的地图点",
          "发送者当时选中的一个点",
          "接收 App 如何解释以及入口是否仍开放",
          "用附带的中文文字在自己的地图内重搜。"
        ],
        [
          "中文名和完整地址",
          "街道与建筑层面的地点身份",
          "符合交通方式或门票要求的入口",
          "联系场地方确认实际可用入口。"
        ],
        [
          "两处来源的地址、分店、入口和电话一致",
          "可辩护的目的地身份",
          "实时封路、上客限制和定位状态",
          "带离线截图与备用地标出发。"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "离开 Wi-Fi 前建立目的地卡"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "打开场地方官网、官方账号、已出票订单或直接消息，原样复制中文名称，包括分店、楼栋、航站楼或门号后缀。",
        "分别记录城市和区县。同名酒店、医院、车站或餐馆可能分布在不同区，甚至不同城市。",
        "复制完整中文街道地址和公开电话。目的地卡里不要放护照号、订单号、房号或付款截图。",
        "询问抵达时段实际开放的步行入口、车辆门或上客点。建筑中心点不等于可通行入口。",
        "在你真正要使用的地图中搜索中文文字；类别、区县、地址和电话都一致后才选中结果。",
        "用第二个本地地图交叉核对，或请场地方发同一 App 的链接。地点身份一致比坐标看起来相同更重要。",
        "离线保存文字、一张去除隐私的截图、场地联系方式和有人值守的附近地标；出行当天再查入口。"
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "把三层证据分开"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "正确行程需要地点、入口和实时定位三类证据",
      "columns": [
        {
          "heading": "地点身份",
          "items": [
            "官方中文名与分店",
            "城市、区县、街道和建筑",
            "公开电话或官方联系渠道"
          ]
        },
        {
          "heading": "实际入口",
          "items": [
            "指定门、航站楼、楼层或上客区",
            "该时段的门票与车辆通行规则",
            "可向工作人员求助的明显地标"
          ]
        },
        {
          "heading": "实时导航",
          "items": [
            "当前路线与道路状态",
            "设备权限和信号质量",
            "第二条路线或有人值守的备选"
          ]
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "按看得见的症状诊断"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "地点身份尚未确认时，不要自行发明坐标修正",
      "columns": [
        "症状",
        "可能问题",
        "安全恢复"
      ],
      "rows": [
        [
          "两个 App 把同一链接落在大型场所两侧",
          "建筑中心与入口不同，或跨 App 交接失真",
          "分别搜索指定门，并请场地方确认。"
        ],
        [
          "路线正在驶向另一个区",
          "选中了同名错误分店",
          "安全停车后核对区县和电话，再用中文文字重建目的地。"
        ],
        [
          "固定目的地正确，但自己的蓝点跳动",
          "室内信号或定位问题",
          "按标识到开阔、已知地标重新定位，不要拖动目的地点。"
        ],
        [
          "计划中的门关闭",
          "保存 POI 后通行规则变化",
          "查看场地方当天通知或前往有人值守的主入口，并更新所有共享记录。"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "避免把一个错误地图点扩散成多个"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "先停在安全公共区域，不为追地图点跨越隔离带、快速路、施工区或私人车道。",
        "向工作人员展示目的地卡，重点核对中文名、区县和分店。",
        "请场地方用司机或旅客正在使用的同一地图发送当前入口。",
        "车辆已行驶时，先请司机合法靠边，再修改目的地，避免分散驾驶注意力。",
        "手机或网络失效时，先到离线保存的有人值守地标，再借助现场人员完成最后一段。",
        "抵达后在所有同行人的共享笔记中替换失败的地图点，防止下一位重复错误。"
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "本页不能承诺什么",
      "body": "本页不能保证高德、Apple 地图或百度地图在特定设备和日期都可用、翻译一致、数据同样新或结果准确；也不做 App 排名、不教坐标换算或绕过地图规则。道路、POI、入口和产品功能都会变化，应以场地方当前官方地址与有人值守的实际确认为准，绝不能因地图指示进入限制或危险区域。",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "出发前最后核对"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "中文名和分店来自当前一手记录",
        "城市、区县、街道、建筑与公开电话全部一致",
        "已确认抵达时段的步行或车辆入口",
        "已在实际使用的地图中重搜目的地",
        "第二来源或场地方确认地点身份",
        "文字、截图和有人值守的备用地标已离线保存",
        "共享目的地卡不含私人资料"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "常见导航问题"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "高德一定比 Apple 地图或百度地图好吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "不一定。设备支持、语言、城市数据和个人操作方式不同。耐用的选择是能确认中文地址与入口的地图，并配有离线备份。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "可以在不同地图之间直接复制坐标吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "不要把坐标作为主要交接方式。复制中文地点字段，在接收 App 中重搜；单独坐标无法说明分店、入口或数据解释方式。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "给出租车司机看什么最有效？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "展示中文目的地卡和司机地图内的结果，指出区县、分店和入口，并准备场地方公开电话。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "把抵达系统的其他环节接好",
      "items": [
        {
          "label": "理解中国地图位置差异",
          "href": "/zh/guides/china-map-coordinate-offset-explained/",
          "description": "不自行换算坐标，按症状诊断跨 App 地图点。"
        },
        {
          "label": "选择 eSIM 或本地 SIM",
          "href": "/zh/guides/china-esim-vs-local-sim/",
          "description": "准备已测试的数据连接和无网备选。"
        },
        {
          "label": "选择靠近正确地铁站的酒店",
          "href": "/zh/guides/china-hotel-near-metro/",
          "description": "同时核对准确地铁出口和酒店入口。"
        },
        {
          "label": "比较包车与公共交通",
          "href": "/zh/guides/china-private-transfer-or-public-transport/",
          "description": "先确定上客点和最终入口，再选交通方式。"
        },
        {
          "label": "在中国丢失手机后的数字恢复",
          "href": "/zh/guides/lost-phone-in-china-digital-recovery/",
          "description": "主设备丢失时仍能取回地址。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方地图与地址来源",
      "items": [
        {
          "label": "面向国际旅客的数字地图服务",
          "url": "https://english.shanghai.gov.cn/en-EasyShanghai/20260713/379bcea6e1bd4defaa7db2451d68d3dd.html",
          "publisher": "上海市政府国际服务门户",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Apple 地图与隐私——中国地图服务",
          "url": "https://www.apple.com/legal/privacy/data/en/apple-maps/",
          "publisher": "Apple",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "地理编码与逆地理编码",
          "url": "https://lbs.amap.com/api/webservice/guide/api/georegeo/",
          "publisher": "高德开放平台",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "地点检索 3.0",
          "url": "https://lbsyun.baidu.com/docs/webapi?title=placev3%2Fguide%2Fwebservice-placeapiV3%2FinterfaceDocumentV3",
          "publisher": "百度地图开放平台",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "GB/T 39609-2020 地址地理编码规则",
          "url": "https://std.samr.gov.cn/gb/search/gbDetailed?id=TFB%2FwAU5XAs%3D&mode=p",
          "publisher": "全国标准信息公共服务平台",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
