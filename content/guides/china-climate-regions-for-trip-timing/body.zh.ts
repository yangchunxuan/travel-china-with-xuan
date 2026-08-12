import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "中国不存在适合所有地区的唯一“最佳天气月份”。一条路线可能同时经过湿润亚热带城市、较干燥的北方内陆和高海拔地区。先找到天气最能决定体验成败的一站，再判断其他地区在同一日期是否可以接受，而不是是否完美。"
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "看三层，不看一个平均值",
      "columns": [
        {
          "heading": "区域气候",
          "body": "纬度与季风影响热度、降水和季节转换。"
        },
        {
          "heading": "海拔",
          "body": "地图距离很短，温度与恢复需求也可能明显变化。"
        },
        {
          "heading": "旅行活动",
          "body": "博物馆路线与山地路线对天气的容忍度不同。"
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "官方气候分类支持分区判断"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "中国气象局资料说明，中国气候类型多样，受季风、纬度与地形共同影响。这些长期特征适合筛选路线，但不是天气预报；临近出行仍应查看最新官方预报。"
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "按最难妥协的暴露筛选",
      "columns": [
        "路线要素",
        "问题",
        "回应"
      ],
      "rows": [
        [
          "户外景观",
          "雨、热、冷或低能见度会否毁掉核心价值？",
          "让这一站优先决定日期窗口。"
        ],
        [
          "高海拔延伸",
          "团队能否承受更冷条件和较慢恢复？",
          "保留弹性，不紧接固定交通。"
        ],
        [
          "室内外混合大城市",
          "是否有真正有价值的室内替代？",
          "把它作为更耐天气的路线部分。"
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "气候不等于预报",
      "body": "长期规律不能承诺某一周的降雨、能见度与温度。临近旅行要重查官方预报和当地运营通知。"
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "给跨气候路线选日期"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "列出最怕天气影响的一项体验。",
        "标记每站的气候与海拔暴露。",
        "寻找能保护最难一站的时间窗。",
        "检查其他站是否仍可接受。",
        "把公众假期判断与气候判断分开。"
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "没有一个月份能兼顾全部时"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "删掉气候最离群的一站，或改变活动，而不是宣称某个月全国都理想。季节上协调的路线，不要求每一站都处在巅峰天气。"
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "不创建城市×月份索引",
      "body": "这个常青框架不生成天气预报页或城市×月份URL；具体日期必须使用最新官方数据。"
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "需要人工按气候检查路线？",
      "body": "留下日期、人数、大致预算、城市和最想保护的户外体验。"
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "判断十月具体出行时间",
          "href": "/guides/china-in-october-golden-week-or-later/",
          "description": "用专页比较国庆与十月中下旬的区域天气。"
        },
        {
          "label": "核对官方公众假期",
          "href": "/guides/china-public-holidays-travel-calendar/",
          "description": "气候合适不代表避开假期压力。"
        },
        {
          "label": "比较平季价值",
          "href": "/guides/china-shoulder-season-value-tradeoff/",
          "description": "通过气候筛选后，再加入价格、日照与营业限制。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已核对的官方来源",
      "items": [
        {
          "label": "中国气候类型及特征",
          "url": "https://www.cma.gov.cn/2011xzt/2017zt/20170720/2017072004/201707200101/202111/t20211103_4148108.html",
          "publisher": "China Meteorological Administration",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "中国气候概况",
          "url": "https://www.cma.gov.cn/2011xzt/2012zhuant/20120302/2012030205/201203020501/201103/t20110314_3096052.html",
          "publisher": "China Meteorological Administration",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
