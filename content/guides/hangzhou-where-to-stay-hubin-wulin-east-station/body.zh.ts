import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "西湖边既属于你的清晨也属于你的晚上，选湖滨；想把不同方向的城市日程放在一个不过度依赖湖边的位置，选武林；只有晚到、早走、同日换乘或多次乘火车的重要性足以压过每天回城的成本，才住杭州东站。"
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "先给结论",
      "tone": "decision",
      "body": "两三晚第一次休闲游，真的会在早餐前或晚饭后使用西湖，湖滨是默认项；行程向北、南、东分散，武林是更稳的折中。东站是物流基地，不是通用观光推荐。一次抵达加一次离开，并不足以让全程住车站，除非时刻、行李或衔接风险支配了整段住宿。"
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "本文只选住宿区域，不选酒店、不承诺湖景、不发布列车时刻、不报房价，也不保证西湖周边当前车辆通行。“杭州东站附近”仍须落到正确站侧与大堂门。"
    },
    {
      "id": "decision-matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "先决定要保护哪几个小时"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "湖边时光、城市平衡与铁路风险是三种不同购买",
      "columns": [
        "优先项",
        "湖滨",
        "武林",
        "杭州东站",
        "付款前核验"
      ],
      "rows": [
        [
          "第一次休闲游",
          "西湖主线短住最强",
          "最平衡的替代项",
          "除非火车主导，否则较弱",
          "夜数与重复路线"
        ],
        [
          "早晚西湖",
          "湖边可直接开始或结束一天",
          "仍需短途前往",
          "多一段进城",
          "到目标湖段的真实步行"
        ],
        [
          "混合城市行程",
          "偏南中心的休闲基地",
          "北中心更均衡",
          "容易反复折返",
          "两个非西湖日在哪里结束"
        ],
        [
          "晚到列车",
          "前台与接驳清楚才可",
          "到达不脆弱时可平衡",
          "保护第一晚最强",
          "票面车站、出站时间、前台"
        ],
        [
          "早班列车",
          "要留足余量并看实时路线",
          "规划后通常可控",
          "真正很早时有利",
          "出发大厅、站侧与备选"
        ],
        [
          "节假日道路",
          "西湖管理可能改变进出方式",
          "较少受湖边路权影响",
          "站区也有自身复杂性",
          "当前公告与酒店入口"
        ]
      ]
    },
    {
      "id": "option-1-heading",
      "type": "heading",
      "level": 2,
      "text": "湖滨：为真正可用的湖边时段付费"
    },
    {
      "id": "option-1-analysis",
      "type": "paragraph",
      "text": "湖滨的价值是时间，不是“西湖”两个字。早餐前沿湖走一段、傍晚再回湖边，或午休后随时二次出门，才能每天使用位置两次。若房间其实在内街数个街区外、依赖会关闭的商场通道，或离你想去的湖段很远，就没有买到这份收益。要确认交通管理时仍可使用的大堂门与街道。"
    },
    {
      "id": "option-2-heading",
      "type": "heading",
      "level": 2,
      "text": "武林：为平衡选择，不是“便宜版湖滨”"
    },
    {
      "id": "option-2-analysis",
      "type": "paragraph",
      "text": "西湖之外还要去运河、城北、商务地点或多个地铁方向，武林更适合。它保留中心位置，却不用把每个房间都拿湖岸距离来评判。区域仍跨多个出口与塔楼入口。比较到你真正要去的湖段、最晚晚餐和离店连接，否则一个看似居中的定位仍会制造三段普通却重复的换乘。"
    },
    {
      "id": "option-3-heading",
      "type": "heading",
      "level": 2,
      "text": "东站：只解决一个困难铁路夜"
    },
    {
      "id": "option-3-analysis",
      "type": "paragraph",
      "text": "晚到后次日早班、仅停一夜或不想让大行李两次跨城，东站往往是正确答案。若住几晚观光，仅因列车在此抵达就全程住站区，通常是错误答案。必要时保护一个困难夜，然后白天换一次；不要为了躲避一次有计划的换酒店，把每个西湖日变成通勤。"
    },
    {
      "id": "trip-pivot",
      "type": "callout",
      "title": "把抵达夜与观光基地分开判断",
      "tone": "neutral",
      "body": "这里比一般市中心比较更可能值得拆住，但必须由真正困难的列车证明。东站一晚加湖滨或武林，可能显著降低风险；围绕普通白天列车换两次酒店，只会增加搬运行李。"
    },
    {
      "id": "execution-heading",
      "type": "heading",
      "level": 2,
      "text": "按票面顺序选杭州住宿"
    },
    {
      "id": "execution-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "读取每张已出票车票的完整车站名与时刻。",
        "把行李、出站与前台加入第一晚的站台到大堂链。",
        "判断西湖是否占据两个受保护时段；若没有，去掉“必须湖滨”的假设。",
        "用当前运营方路线比较湖滨和武林到两个最重要非西湖日。",
        "向最后两家询问可用出口、车行入口、晚间进入、房间朝向与行李寄存。",
        "按出行日期查当前西湖交通管理，不从旧游记推断车辆到达。",
        "只有能去掉脆弱铁路段才拆住，并在平静白天只搬一次。"
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "住宿基地解决错问题时"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "先保护固定连接，再恢复住宿价值",
      "columns": [
        "错位",
        "马上处理",
        "结构性修复"
      ],
      "rows": [
        [
          "“湖滨”离计划湖段不近",
          "标出精确湖岸入口与大堂",
          "只有湖边时段反复且差距显著才搬"
        ],
        [
          "西湖车辆进出方式改变",
          "服从当前官方换乘与物业指引",
          "行李无法安全到达就住临路外缘"
        ],
        [
          "武林物业在大型路口错误一侧",
          "索要可用出口与开放建筑通道",
          "选核验后过街更简单的一家"
        ],
        [
          "列车改成更早时刻",
          "按票面重算门到检票口余量",
          "风险变真才增加东站最后一晚"
        ],
        [
          "晚到后前台未确认",
          "离开车站前联系物业",
          "用有人值守的站边第一晚，别去锁门地址"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "不承诺湖景、列车与道路",
      "tone": "warning",
      "body": "湖滨不保证湖景，武林不保证到每个片区都等距，东站不保证步行即达正确候车厅。道路管理、地铁口、列车时刻、寄存、房间分配、价格房态与外宾登记都要重新核验。"
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "下一步：保护一个清晨与一个交接",
      "tone": "decision",
      "body": "写出你真正想保留的湖边时段，以及绝不能错过的列车交接。用湖滨和武林解决前者，再测试东站是否实质保护后者。选择到达清楚、离开清楚且无多余换住的组合。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划杭州",
      "items": [
        {
          "label": "返回中国住宿决策",
          "href": "/zh/stay/",
          "description": "回到不含酒店榜单的住宿决策入口。"
        },
        {
          "label": "规划完整杭州行程",
          "href": "/zh/destinations/hangzhou/",
          "description": "先确定夜数，并组合西湖、运河、茶与遗产日。"
        },
        {
          "label": "规划上海—杭州交通",
          "href": "/zh/guides/shanghai-hangzhou-transport-route/",
          "description": "按票面车站与当前铁路记录完成城际链条。"
        },
        {
          "label": "核验“地铁附近”到底多近",
          "href": "/zh/guides/china-hotel-near-metro/",
          "description": "比较湖滨、武林与杭州东站时，把抵达所用站口与酒店真实街面入口连起来核验。"
        },
        {
          "label": "核验无障碍客房",
          "href": "/zh/guides/china-accessible-hotel-room-verification/",
          "description": "核对下客点、房门与卫生间的连续动线。"
        },
        {
          "label": "核验外宾住宿登记",
          "href": "/zh/guides/foreigners-china-hotel/",
          "description": "选择湖边小型住宿或杭州东站晚到方案前，先查全国住宿登记与拒住处理专题。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方城市、地铁、交通与图片来源",
      "items": [
        {
          "label": "杭州市商业步行街官方说明",
          "url": "https://www.hangzhou.gov.cn/art/2022/2/16/art_812262_59050058.html",
          "publisher": "杭州市人民政府",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "杭州地铁武林广场站介绍",
          "url": "https://www.hzmetro.com/service_1.aspx?Line1=14&Site1=268",
          "publisher": "杭州地铁",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "杭州地铁龙翔桥站点详情",
          "url": "https://wx.hzmetro.com/index/index/details.html?id=18",
          "publisher": "杭州地铁",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "西湖景区分时段交通管理通告",
          "url": "https://zfgb.hangzhou.gov.cn/11/105220253/t117220253054/518894.shtml",
          "publisher": "杭州市交通运输局等",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "首图：CatOnMars 拍摄湖滨与西湖，CC BY 4.0",
          "url": "https://commons.wikimedia.org/wiki/File:Huanglong_%26_Broken_Bridge_-_Hangzhou_City_%26_Outer_West_Lake_in_Hubin.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
