import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "大多数第一次到广州的休闲行程，北京路是最稳的综合基地：老城景点、晚间吃饭与多方向出行能在一个紧凑生活圈交汇。选荔湾前，要先说清想反复的是西关、永庆坊、沙面还是荔湾湖一带；只有商务、珠江新城、广州东部约会或现代都市夜晚连续占据两天以上，天河才明显占优。"
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "先给结论",
      "tone": "decision",
      "body": "短途初访、主打老广州又想保留晚间弹性，住北京路；想把广式社区清晨与西边文化生活本身当作主线，而不是半日游，住具体的荔湾片区；工作、会展、现代购物或东中心连接反复出现，住天河。夏季闷热或大雨时，五分钟有遮挡的路线可能胜过十五分钟名气更大的步行，所以必须核验真实地铁口到大堂。"
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "本文只比较三个广义住宿基地，明确不做酒店榜单、不报价格房态、不声称外宾接待。“荔湾”和“天河”都太大，不能直接当酒店地址；最终选择必须落到一个命名地铁口、一条街和一扇大堂门。"
    },
    {
      "id": "decision-matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "用反复日程匹配广州的多个中心"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "区域优势至少出现两次才值得决定住宿",
      "columns": [
        "行程模式",
        "北京路",
        "荔湾",
        "天河",
        "决定性核验"
      ],
      "rows": [
        [
          "两到四晚休闲初访",
          "混合老城日的首选默认",
          "刻意做西边慢住才选",
          "现代/东边反复才选",
          "两个晚上在哪里结束"
        ],
        [
          "广式清晨",
          "选择多，但商业中心感更强",
          "西关街巷与社区节奏最强",
          "实用但不是文化优先",
          "目标地点是否真在酒店附近"
        ],
        [
          "商务或活动",
          "中心混合行程可用",
          "地址在西边才占优",
          "具体天河场馆反复时最强",
          "逐个落点，天河不是一个街区"
        ],
        [
          "闷热和暴雨",
          "替代选择密集，步行段仍会淋雨",
          "部分骑楼有利，路线差异很大",
          "真正连通的现代综合体可减少暴露",
          "遮挡长度、积水点与建筑开放时段"
        ],
        [
          "机场/火车交接",
          "须按具体航站或车站判断",
          "可能增加西边一段",
          "部分东边抵达有利，不代表广州南站",
          "使用票面完整站名/航站楼"
        ],
        [
          "安静与行李",
          "避开最吵的步行正面",
          "老街巷可能难下客",
          "大塔楼可能把大堂藏很远",
          "车行入口、塔楼、楼层、朝向"
        ]
      ]
    },
    {
      "id": "option-1-heading",
      "type": "heading",
      "level": 2,
      "text": "北京路：第一次行程的铰链"
    },
    {
      "id": "option-1-analysis",
      "type": "paragraph",
      "text": "北京路能把越秀历史、吃饭与热闹夜晚放在一起，不必让全程只服从某个文化片区或商务中心。团队换餐厅、下雨取消步行时，它也更容易恢复。陷阱恰恰是步行核心：预订定位可能是店面、商场或塔楼，不是汽车入口。位置可以近，但必须确认安静朝向与合法行李下客点。"
    },
    {
      "id": "option-2-heading",
      "type": "heading",
      "level": 2,
      "text": "荔湾：先说出社区名，再选住宿"
    },
    {
      "id": "option-2-analysis",
      "type": "paragraph",
      "text": "荔湾不是一个统一的“老广州酒店区”。永庆坊与恩宁路、荔湾湖、陈家祠周边、沙面一侧，各有不同清晨与后续路线。只有当西关饮食、骑楼、河涌与老社区生活要反复体验，荔湾才值得成为基地。若其余每天都在天河或越秀结束，单独去一次西边胜过搬动每晚住宿。"
    },
    {
      "id": "option-3-heading",
      "type": "heading",
      "level": 2,
      "text": "天河：让固定约会证明它值得住"
    },
    {
      "id": "option-3-analysis",
      "type": "paragraph",
      "text": "具体办公室、展会、活动、珠江新城场馆或东中心晚餐反复出现时，天河最实用。现代综合体可能缩短闷热雨天的暴露，但前提是酒店真的连到可用路线。“天河CBD”仍可能隔着长街、地下通道或塔楼转换；要画出每个固定地点到大堂的最后步行与最晚返程。"
    },
    {
      "id": "trip-pivot",
      "type": "callout",
      "title": "广州有多个中心，不只有一个游客中心",
      "tone": "neutral",
      "body": "不要按到“市中心”定位点的距离打分。把老城日、最晚晚餐、雨天备选与所有固定约会放在一张图上。能缩短反复闷热或淋雨路段的，才是胜出基地；名气最大的区域未必胜出。"
    },
    {
      "id": "execution-heading",
      "type": "heading",
      "level": 2,
      "text": "从固定锚点倒推住宿"
    },
    {
      "id": "execution-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "用完整中文名列出所有固定地址，尤其车站、展馆、办公室、码头或口岸连接。",
        "标出早餐和最晚两个晚上可能结束的位置，让反复东行或西行显现。",
        "在北京路、荔湾或天河内部选一个具体片区，不要搜索整个行政区。",
        "按下雨场景走查可用地铁口到大堂：台阶、地道、骑楼、商场时段、过街和排水。",
        "向物业确认车行入口、塔楼、大堂楼层、房间朝向与真实到达时刻的前台。",
        "固定约会与到达票尚会变化时，保留可取消备选。",
        "出发前重查天气、地铁公告与场馆说明，离线保存中文地址。"
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "区域标签遮住真实路线时"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "用一个准确地点和一个切换时限恢复",
      "columns": [
        "失败",
        "马上恢复",
        "预订怎么变"
      ],
      "rows": [
        [
          "“荔湾”离想去的西关清晨很远",
          "用命名街道重画重复日路线",
          "错位连续影响两天才换"
        ],
        [
          "北京路车辆停在步行核心外",
          "联系物业执行其说明的行李交接",
          "安全现实的最后搬运行不通就换"
        ],
        [
          "天河塔楼入口隔着大型综合体",
          "索要正确地下或路面入口与开放路线",
          "晚间必须依赖关闭建筑就换"
        ],
        [
          "暴雨让步行计划不安全",
          "服从官方预警，去最近安全且有人员的地点",
          "先保护安全和下一段固定连接"
        ],
        [
          "房间正对深夜商业街",
          "未拆行李前查看安静朝向替代房",
          "承诺的必要睡眠条件无法恢复就离开"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "区域不是服务保证",
      "tone": "warning",
      "body": "本文不保证当前地铁、全程遮雨、网约车供给、道路不积水、活动入场、酒店安静、无障碍入口、房态价格或护照登记。“CBD”“老城”“地铁直达”等宣传词，只有与具体门口和时刻匹配后才成立。"
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "下一步：做一次雨天路线测试",
      "tone": "decision",
      "body": "拿最后两家物业，从真正可用的地铁口出发，假设天黑、下雨、闷热且带行李，画到各自大堂。向两家发同一组入口问题。优先选暴露路段更短、恢复方案更清楚的一家。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划广州",
      "items": [
        {
          "label": "返回中国住宿决策",
          "href": "/zh/stay/",
          "description": "回到不含酒店榜单的住宿决策入口。"
        },
        {
          "label": "规划完整广州行程",
          "href": "/zh/destinations/guangzhou/",
          "description": "先确定夜数、美食、老城与大湾区优先级。"
        },
        {
          "label": "看懂广州早茶流程",
          "href": "/zh/guides/how-guangzhou-morning-tea-works/",
          "description": "先懂早茶流程，不让一家餐厅决定整个住宿区。"
        },
        {
          "label": "核验“地铁附近”到底多近",
          "href": "/zh/guides/china-hotel-near-metro/",
          "description": "比较北京路、荔湾与天河时，核对晚餐后会用的站口和最后到大堂的路。"
        },
        {
          "label": "核验无障碍客房",
          "href": "/zh/guides/china-accessible-hotel-room-verification/",
          "description": "核对下客点、房门与卫生间的连续动线。"
        },
        {
          "label": "核验外宾住宿登记",
          "href": "/zh/guides/foreigners-china-hotel/",
          "description": "依赖荔湾小型物业或天河深夜抵达前，先按全国专题核实登记与拒住应对。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方城市、运营方与图片来源",
      "items": [
        {
          "label": "广州市A级景区名录（2026年6月）",
          "url": "https://wglj.gz.gov.cn/ggfw/lyl/lydwcx/content/post_10878689.html",
          "publisher": "广州市文化广电旅游局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "广州市文化和旅游发展“十四五”规划",
          "url": "https://www.gz.gov.cn/zwgk/ghjh/fzgh/ssw/content/mpost_7845329.html",
          "publisher": "广州市人民政府",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "广州市政府西关与永庆坊导览",
          "url": "https://www.gz.gov.cn/zt/jrshts/2026n/nwzgz/nwgz/content/post_10686807.html",
          "publisher": "广州市人民政府",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "广州地铁官方服务入口",
          "url": "https://www.gzmtr.com/",
          "publisher": "广州地铁",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "首图：Windmemories 拍摄北京路，CC BY-SA 4.0",
          "url": "https://commons.wikimedia.org/wiki/File:20250222_Street_scene_of_Beijing_Road_03.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
