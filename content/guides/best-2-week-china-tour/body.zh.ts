import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "Homeground 四条 14 天中国私家线，2 人同行、两人一间，每人 ¥24,630–25,930，国际机票另算。四条都先走北京和西安。第一次来，我们会先推成都加漓江的经典线。张家界要多走台阶，云南要适应海拔，黄山线则用一段长高铁换来园林和西湖。"
    },
    {
      "id": "compare-heading",
      "type": "heading",
      "level": 2,
      "text": "四条线路对比"
    },
    {
      "id": "compare",
      "type": "table",
      "caption": "每条 14 天 13 晚；每人价格，两人一间，不含国际机票",
      "columns": [
        "路线",
        "北京、西安之后",
        "主要交通",
        "步行与海拔",
        "最佳月份",
        "2 人同行每人起价"
      ],
      "rows": [
        [
          "北京·西安·成都·桂林·上海",
          "成都、桂林/阳朔、上海",
          "2 段高铁，2 段航班",
          "轻松到中等",
          "4–5 月、9–10 月",
          "¥25,930"
        ],
        [
          "北京·西安·张家界·桂林·上海",
          "张家界、桂林/阳朔、上海",
          "2 段高铁（含一段约 7 小时），2 段航班",
          "中等：张家界台阶多",
          "4–5 月、9–10 月",
          "¥25,280"
        ],
        [
          "北京·西安·大理·丽江·香格里拉",
          "昆明、大理、丽江、香格里拉",
          "4 段火车，2 段航班，1 段长途车",
          "中等；香格里拉住宿地约 3,300 米，上山索道若开放可能更高",
          "3–5 月、9–11 月",
          "¥25,280"
        ],
        [
          "北京·西安·黄山·杭州·苏州·上海",
          "黄山、杭州、苏州、上海",
          "4 段高铁（含一段约 7 小时），日期合适才坐飞机",
          "中等：黄山登顶台阶多",
          "4–5 月、9–11 月",
          "¥24,630"
        ]
      ]
    },
    {
      "id": "classic-heading",
      "type": "heading",
      "level": 2,
      "text": "北京·西安·成都·桂林·上海 14 天 13 晚私家团"
    },
    {
      "id": "classic",
      "type": "paragraph",
      "text": "第一次来中国，我们会先推北京、西安、成都、桂林、上海这条线。长城和兵马俑之后看大熊猫、坐漓江游船，不用安排很长的登山日。2 人同行每人 ¥25,930，6 人每人 ¥20,730。"
    },
    {
      "id": "landscapes-heading",
      "type": "heading",
      "level": 2,
      "text": "北京·西安·张家界·桂林·上海 14 天 13 晚私家团"
    },
    {
      "id": "landscapes",
      "type": "paragraph",
      "text": "张家界线在张家界国家森林公园和天门山附近住三晚，再去漓江。它把成都大熊猫换成砂岩峰林，台阶多一些，张家界到桂林的直达高铁也要约 7 小时。2 人同行每人 ¥25,280 起，6 人每人 ¥20,080。"
    },
    {
      "id": "yunnan-heading",
      "type": "heading",
      "level": 2,
      "text": "北京·西安·云南 14 天 13 晚私家团"
    },
    {
      "id": "yunnan",
      "type": "paragraph",
      "text": "云南线从大理、丽江走到香格里拉，适合更想看古城和山的人。经虎跳峡去香格里拉那天，连停留约坐车 5–6 小时，终点海拔约 3,300 米，得把适应海拔算进去。14 天行程 2 人同行每人 ¥25,280，6 人每人 ¥20,080。"
    },
    {
      "id": "huangshan-heading",
      "type": "heading",
      "level": 2,
      "text": "北京·西安·黄山·杭州·上海 14 天 13 晚私家团"
    },
    {
      "id": "huangshan",
      "type": "paragraph",
      "text": "黄山线留一整天上山，再慢慢走西湖、苏州，最后在上海住三晚。西安到黄山的高铁约 7 小时，只有日期碰得上航班才改坐飞机。2 人同行每人 ¥24,630，6 人每人 ¥19,430，是四条里价格最低的。"
    },
    {
      "id": "length-heading",
      "type": "heading",
      "level": 2,
      "text": "更短或更长的行程"
    },
    {
      "id": "length",
      "type": "list",
      "items": [
        "北京·西安·桂林·上海 10 天 9 晚私家团: 2 人同行每人 ¥19,430 起",
        "北京·杭州·苏州·上海 11 天 10 晚私家团: 2 人同行每人 ¥17,480 起",
        "上海·张家界·凤凰·桂林 13 天 12 晚私家团: 2 人同行每人 ¥23,330 起",
        "北京·西安·丝绸之路 15 天 14 晚私家团: 2 人同行每人 ¥29,830 起",
        "北京·西安·成都·长江游轮·上海 17 天 16 晚私家团: 2 人同行每人 ¥30,480 起",
        "中国全景：含张家界与长江游轮 21 天 20 晚私家团: 2 人同行每人 ¥38,280 起"
      ]
    },
    {
      "id": "small-group",
      "type": "paragraph",
      "text": "北京、西安、成都、桂林、上海经典线和张家界线，2027 年也有固定日期的 8–12 人小团。两条里较低的团费是每人 ¥18,130，两人一间。先看看出发日期，能配合的团期可能比路线喜好更影响选择。"
    },
    {
      "id": "faq",
      "type": "faq",
      "title": "选 14 天线路的常见问题",
      "items": [
        {
          "question": "第一次去中国，哪条 14 天线最好？",
          "answer": "第一次来，我们会推荐 Homeground 北京、西安、成都、桂林、上海 14 天私家线。长城、兵马俑、大熊猫和漓江都能走到，少了张家界那种长时间爬台阶的日子。2 人同行、两人一间，每人 ¥25,930，国际机票另算。"
        },
        {
          "question": "哪条线路上时间最少？",
          "answer": "Homeground 四条 14 天私家线里，北京、西安、成都、桂林、上海这条长途转场日最少。主要高铁是北京到西安、西安到成都。张家界到桂林、西安到黄山各约坐 7 小时高铁，云南线坐车时间更长。"
        },
        {
          "question": "哪条线路走路最少？",
          "answer": "四条 14 天私家线里，北京、西安、成都、桂林、上海经典线走路最轻松。张家界国家森林公园和黄山有长段石阶，云南还要考虑海拔。若有人行动不便，订行程前告诉我们，我们可以缩短步行日。"
        },
        {
          "question": "可以把两条线合在一起吗？",
          "answer": "Homeground 的 21 天中国全景私家线已把经典城市、张家界和三晚长江游轮接在一起。2 人同行、两人一间，每人 ¥38,280 起，国际机票另算。想换别的组合，我们会另给书面报价。"
        }
      ]
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "查看线路",
      "items": [
        {
          "label": "北京·西安·成都·桂林·上海 14 天 13 晚私家团",
          "href": "/zh/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/"
        },
        {
          "label": "北京·西安·张家界·桂林·上海 14 天 13 晚私家团",
          "href": "/zh/tours/beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour/"
        },
        {
          "label": "北京·西安·云南 14 天 13 晚私家团",
          "href": "/zh/tours/beijing-xian-yunnan-14-day-private-tour/"
        },
        {
          "label": "北京·西安·黄山·杭州·上海 14 天 13 晚私家团",
          "href": "/zh/tours/beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour/"
        },
        {
          "label": "自己安排中国 14 天行程",
          "href": "/zh/guides/china-14-day-itinerary/"
        },
        {
          "label": "中国两周游要多少钱",
          "href": "/zh/guides/china-2-week-tour-cost/"
        },
        {
          "label": "2027 年中国小团：日期与价格",
          "href": "/zh/guides/china-small-group-tours-2027/"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "行程资料来源",
      "items": [
        {
          "label": "按出行日期查询列车时刻",
          "url": "https://kyfw.12306.cn/index",
          "publisher": "中国铁路 12306",
          "reviewedAt": "2026-09-25"
        },
        {
          "label": "香格里拉建塘镇海拔约 3,300 米",
          "url": "https://www.xianggelila.gov.cn/zfxxgk_xglls/fdzdgknr/gzdt/202508/20250801_231010.html",
          "publisher": "香格里拉市人民政府",
          "reviewedAt": "2026-09-25"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
