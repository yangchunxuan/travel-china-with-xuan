import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "第一次来苏州做文化行程，优先住古城内或可通车的古城边缘；运河片区连续占据不止一个晚上，或古城西北与苏州站关系确实有用，再选山塘；东边商务、活动或现代城市时间反复出现，才选金鸡湖。一次天际线散步，不足以让每晚都搬到东边。"
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "先给结论",
      "tone": "decision",
      "body": "园林、街巷与短途初访，古城是默认项；山塘是专门的古城边缘基地，要为反复运河晚间和已核验行李入口而选，不为一张照片而选；金鸡湖是具体东边约会与现代晚间基地。务必识别完整火车站名、湖的哪一侧与大堂入口，“苏州市中心”不是一个点。"
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "本文只选住宿区域，不排园林、不列酒店、不声称实时湖景、不发布列车时刻，也不保证价格、房态、安静、无障碍或外宾接待。"
    },
    {
      "id": "decision-matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "比较苏州三种不同的晚上"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "每天最后两小时往往最能暴露正确基地",
      "columns": [
        "住宿模式",
        "古城",
        "山塘",
        "金鸡湖",
        "准确核验"
      ],
      "rows": [
        [
          "第一次遗产游",
          "最强默认",
          "运河片区反复时好",
          "增加东西往返",
          "哪些园林/街巷反复"
        ],
        [
          "晚间氛围",
          "社区街巷与传统核心",
          "运河灯影与历史街区",
          "湖边与现代商业城市",
          "最后一站后的返程"
        ],
        [
          "早晨进园",
          "多个中心园林最强",
          "古城西北较有利",
          "需要东到老城",
          "具体园门，不是区域中心"
        ],
        [
          "商务/活动",
          "地址在中心才好",
          "通常次要",
          "具体东边场馆反复时最强",
          "湖的哪一侧与建筑入口"
        ],
        [
          "铁路抵达",
          "取决于票面车站和时刻",
          "部分苏州站抵达可能有利",
          "部分东边站有利，不代表全部",
          "完整站名与真实候车厅"
        ],
        [
          "行李/行动",
          "铺装与保护街道各异",
          "河巷与桥可能增加困难",
          "现代道路只有直达大堂才有用",
          "路缘到房间全链"
        ]
      ]
    },
    {
      "id": "option-1-heading",
      "type": "heading",
      "level": 2,
      "text": "古城：让园林清晨承担决定"
    },
    {
      "id": "option-1-analysis",
      "type": "paragraph",
      "text": "传统核心能缩短反复前往园林、河道与街巷的路径，也让定时景点关闭后仍保留文化晚间。最实用地址可能就在保护或步行街外缘。迷人的历史建筑也可能藏着门槛、楼梯、隔音弱或车辆停得远，因此“古城”之后必须继续核验物业形态与进入方式。"
    },
    {
      "id": "option-2-heading",
      "type": "heading",
      "level": 2,
      "text": "山塘：分清来逛一次与住在旁边"
    },
    {
      "id": "option-2-analysis",
      "type": "paragraph",
      "text": "山塘提供辨识度很高的运河晚间，也位于古城西北侧。想清晨走河边、晚上再回来，或反复连接苏州这一侧，住附近才有价值。如果只安排一个热闹晚上，就住在其余行程发生处。要问物业是在可通车边缘，还是要跨铺装、桥与步行段。"
    },
    {
      "id": "option-3-heading",
      "type": "heading",
      "level": 2,
      "text": "金鸡湖：东边日程，不是通用升级"
    },
    {
      "id": "option-3-analysis",
      "type": "paragraph",
      "text": "金鸡湖代表苏州现代商务与休闲一面。会议、会展、东边餐厅与湖边晚上连续出现时，它能显著省力；对园林主线并不会自动升级。湖有多侧，开发地块很大，要记录具体场馆、真正可用地铁口与活动后的晚归路线，不把“金鸡湖畔”当成一个步行街区。"
    },
    {
      "id": "trip-pivot",
      "type": "callout",
      "title": "不要让一个车站或一个晚上决定每一晚",
      "tone": "neutral",
      "body": "苏州有多个车站，也有明显东西展开。先从车票读取完整站名，再统计后面两个清晨与晚上在哪里。困难抵达可以支持一个简单第一晚，但不能支持全程反复通勤。"
    },
    {
      "id": "execution-heading",
      "type": "heading",
      "level": 2,
      "text": "从命名入口搭建苏州住宿"
    },
    {
      "id": "execution-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "列出已固定的具体园门、会议建筑与完整火车站名。",
        "标出两个清晨和两个晚上，淘汰只出现一次优势的区域。",
        "古城与山塘分别核对车辆下客点和步行客人入口。",
        "金鸡湖要写清湖岸、街区、地铁口与活动后返程。",
        "向最终候选索要朝向、楼梯/电梯、卫生间、前台时段与行李处理。",
        "按当前运营路线与取消条件比较，不抄永久时长。",
        "出发前重确认车站名、当地进出公告与中文大堂地址。"
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "苏州东西错位时"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "纠正具体终点，不要推翻整座城市",
      "columns": [
        "失败",
        "立即处理",
        "切换门槛"
      ],
      "rows": [
        [
          "山塘定位需带行李跨桥",
          "联系物业执行临路交接",
          "无法提供安全行李链就换"
        ],
        [
          "古城建筑出现未披露楼梯",
          "未拆行李前检查分配路线",
          "必要行动条件失败就离开"
        ],
        [
          "金鸡湖酒店在活动错误湖岸",
          "重画准确入口与官方晚归路线",
          "多日重复受损才搬"
        ],
        [
          "车票实际是另一个苏州站",
          "按完整票面站名重做抵达",
          "只有衔接脆弱才用第一晚备选"
        ],
        [
          "历史街区噪声进房",
          "要求并检查已核验内向/安静房",
          "无法恢复预订条件就换"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "区域气质不是客房保证",
      "tone": "warning",
      "body": "历史巷道不保证雅致安静，现代金鸡湖不保证电梯直达或全程遮挡。地铁、街区管理、活动出口、列车时刻、湖景、房间分配、价格房态与外宾登记都保持动态或物业特定。"
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "下一步：比较一个清晨与一个晚上",
      "tone": "decision",
      "body": "为每家最终候选写出最早园林/约会的门到门路线，以及最晚晚上结束后的返程。能同时胜出且不依赖未核验桥梁、塔楼或关闭通道的，才是更好的苏州基地。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划苏州",
      "items": [
        {
          "label": "返回中国住宿决策",
          "href": "/zh/stay/",
          "description": "回到不含酒店榜单的住宿决策入口。"
        },
        {
          "label": "学会读苏州园林",
          "href": "/zh/guides/how-to-read-a-suzhou-garden/",
          "description": "住宿基地选定后，再安排园林阅读。"
        },
        {
          "label": "安排沪苏杭宁路线",
          "href": "/zh/guides/shanghai-suzhou-hangzhou-nanjing-route-order/",
          "description": "先确定苏州夜数，再优化住宿区。"
        },
        {
          "label": "核验“地铁附近”到底多近",
          "href": "/zh/guides/china-hotel-near-metro/",
          "description": "从实际会用的站口出发，核验山塘街巷、老城入口或金鸡湖街区的最后一段。"
        },
        {
          "label": "核验无障碍客房",
          "href": "/zh/guides/china-accessible-hotel-room-verification/",
          "description": "核对下客点、房门与卫生间的连续动线。"
        },
        {
          "label": "核验外宾住宿登记",
          "href": "/zh/guides/foreigners-china-hotel/",
          "description": "依赖水巷物业或非前台时段抵达前，先确认护照登记与拒住补救。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "苏州官方、运营方与图片来源",
      "items": [
        {
          "label": "苏州市服务业布局规划",
          "url": "https://www.suzhou.gov.cn/szsrmzf/gbgfxwj/202302/c24ee61035bc4234ba25160db9389bcf.shtml",
          "publisher": "苏州市人民政府",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "苏州市水务局金鸡湖简介",
          "url": "https://water.suzhou.gov.cn/slj/hhjj/202404/39396918c95d4928b9686aca2c7ee272.shtml",
          "publisher": "苏州市水务局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "苏州市政府山塘历史文化街区说明",
          "url": "https://www.suzhou.gov.cn/szsrmzf/szyw/202405/95449c8ef4354f86b5e5c85afb44797d.shtml",
          "publisher": "苏州市人民政府",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "苏州地铁官方线网图",
          "url": "https://www.sz-mtr.com/service/guide/map/index_en.html?line=4",
          "publisher": "苏州轨道交通集团",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "首图：Windmemories 拍摄山塘河，CC BY-SA 4.0",
          "url": "https://commons.wikimedia.org/wiki/File:2017-04-17_Shantang_River,_Suzhou_02.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
