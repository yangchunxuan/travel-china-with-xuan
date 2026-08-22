import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "春节可以是来中国旅行非常精彩的时段，但它适合的旅行者与普通首次行程不同。早上，写字楼街区可能安静得反常；中午，庙会却已经挤满人。家庭餐馆关着灯，马路对面的商场却有一整套节庆活动。春节不是全国统一停摆，而是家庭团聚、长周期交通迁徙和巨大的国内旅游季同时发生。"
    },
    {
      id: "direct-answer",
      type: "callout",
      tone: "decision",
      title: "到底值不值得来？",
      body: "如果春节本身就是旅行目的、可以减少跨城移动，并愿意每天只固定一个已确认的公共活动，再准备一个灵活替代，那么值得来。如果第一次中国行依赖紧密的多城路线、很长的小餐馆清单，或多处尚未公布假期开放的必去景点，换一个时段更合适。春节没有让中国无法旅行，只是会放大薄弱的假设。"
    },
    {
      id: "next-date",
      type: "callout",
      tone: "warning",
      title: "下一次春节日期已知，但中国内地放假安排尚未公布",
      body: "复核于2026年8月22日：香港天文台官方历法和香港政府公布的假期表均显示，2027年农历正月初一为2月6日，星期六。这只能确定农历日期。复核时，中国内地2027年的放假调休和春运周期尚未公布。不要把香港假期或中国内地2026年的安排复制到2027年行程；等国务院发布年度安排后，到Homeground中国公共假期日历查看。"
    },
    {
      id: "pressure-heading",
      type: "heading",
      level: 2,
      text: "真正影响旅行的日期，比正月初一宽得多"
    },
    {
      id: "pressure-map",
      type: "figure",
      src: "/images/guides/lunar-new-year-customs-for-visitors/spring-festival-pressure-zh-1440.webp",
      alt: "春节旅行压力图，把节前返乡、团聚日、假期旅游和返程潮分成四个不同阶段。",
      width: 1440,
      height: 900,
      caption: "这是规划规律，不是2027年官方日历。国务院、交通部门和每个场所会分别公布真正约束行程的日期。"
    },
    {
      id: "pressure-table",
      type: "table",
      caption: "四个压力阶段；准确边界每年都会变",
      columns: ["阶段", "旅行者可能看到什么", "需要保护什么"],
      rows: [
        ["正式假期之前", "铁路、航空和公路返乡需求上升，但多数城市商户可能仍在营业", "必要的跨城座位和可恢复的酒店计划"],
        ["除夕与最初几个团聚日", "部分写字楼和社区街道变安静；家庭经营商户可能歇业；家庭时间最私密", "确认过的用餐、酒店运行和一个公共活动"],
        ["假期中段", "国内旅游升温；热门景区、度假区、庙会和商业区可能非常拥挤", "有日期的门票、对人群的容忍和附近备选"],
        ["假期末与返程潮", "铁路、机场和高速承载返岗返校客流，大城市重新迎来大量流入", "最后一段必要交通以及国际航班前的余量"]
      ]
    },
    {
      id: "four-clocks",
      type: "callout",
      tone: "neutral",
      title: "用四只钟做计划，不要只看一个春节日期",
      body: "农历日期告诉你正月初一是哪天；国务院安排告诉你中国内地放假和调休；年度春运方案描述更长的交通周期；景区和商户则分别公布自己的营业。四只钟互相重叠，却不能替换。空白只能表示“尚未公布”，绝不表示“与去年相同”。"
    },
    {
      id: "city-heading",
      type: "heading",
      level: 2,
      text: "为什么一座城市可以同时显得空，又显得挤？"
    },
    {
      id: "city-copy",
      type: "paragraph",
      text: "因为人口和活动重新分布了。一些务工者和学生离开平时居住的城市，一些亲属反向进城团聚，居民也会外出度假，而公共节庆把游客集中到少数景点和商圈。结果是空间反差，不是全国暂停：同一天，办公街区可能安静，交通枢纽压力很大，著名寺庙人满为患，普通社区餐馆却关门。关于反向团聚的学术研究也提醒我们，不是每座大城市都会以同一种方式“空掉”。"
    },
    {
      id: "city-evidence",
      type: "callout",
      tone: "neutral",
      title: "2026年证据：城市变安静，不代表景区变安静",
      body: "上海公布，2026年九天春节假期接待游客2167万人次，推出超过2570项文旅活动；文化和旅游部公布全国国内出游5.96亿人次。这些是人次，不是独立人数，也不能预测下一年，但足以说明“大家都回家了，所以景区一定没人”不是可靠计划。"
    },
    {
      id: "where-heading",
      type: "heading",
      level: 2,
      text: "选择有备选的落脚地，不要追逐最“原生态”的承诺"
    },
    {
      id: "where-table",
      type: "table",
      caption: "住宿基地比泛泛的城市排名更能改变风险",
      columns: ["落脚地", "为什么可行", "可能失望在哪里"],
      rows: [
        ["大城市中心区", "大型酒店、地铁、商场和官方活动提供更多替换方案", "著名景点和节庆街区可能非常拥挤；小商户仍各不相同"],
        ["有公开节庆的历史城市", "明确的庙会、灯会或博物馆活动让旅行有主线", "活动可能售票、限流，或者只在少数日期举行"],
        ["景区度假区", "住宿和假期活动可能集中在一个区域", "节日价格、道路和国内需求可能很高；度假区不等于安静乡村"],
        ["没有当地接待者的小城或村落", "普通街道也许平静", "公共活动、交通和饮食选择可能有限；家庭习俗不会自动向游客开放"]
      ]
    },
    {
      id: "transport-heading",
      type: "heading",
      level: 2,
      text: "交通：先减少移动，再谈如何应对春运"
    },
    {
      id: "transport-copy",
      type: "paragraph",
      text: "春运是每年另行公布、覆盖多种交通方式的运行周期，开始早于法定假期，结束也更晚。2026年春运为40天，中国内地春节假期为9天。这里可沿用的是结构，不是2027年的日期：最难买的那张票可能落在日历中“假期”方框之外。等官方运营方开放销售后查询准确的车站或机场组合，也不要让候补订单拖着没有退路的酒店和定时门票一起等待。"
    },
    {
      id: "transport-actions",
      type: "list",
      ordered: true,
      items: [
        "购票前先删掉可有可无的折返和只住一晚的换城。",
        "优先保护入境交通、唯一必要的跨城移动，以及国际返程前最后一晚。",
        "使用铁路或航空官方订单，并保存车站、机场的完整中文名称。",
        "把12306候补当成继续尝试兑现，而不是已经占住的座位；准备一套即使候补最终未兑现也能成立的路线。",
        "不要让长途抵达直接衔接稀缺节庆活动，第一项活动必须可以替换。",
        "重新核验地铁、公交和出租车接驳；有火车票不等于最后一公里成立。"
      ]
    },
    {
      id: "business-heading",
      type: "heading",
      level: 2,
      text: "哪些地方关门？不存在一张真正有用的全国清单"
    },
    {
      id: "business-copy",
      type: "paragraph",
      text: "政府办事机构遵循公布的放假调休，但餐馆、商店、博物馆和景区分别决定营业。大型酒店、交通设施、商场和连锁店常会维持部分假期服务，许多公共景点也会公布特别时段或活动。家庭经营的小餐馆、洗衣店、工作室或民宿则可能歇业、缩短营业，甚至晚于正式假期才恢复。任何一种普遍规律都不能证明某一家店会怎样。"
    },
    {
      id: "verification-ladder",
      type: "table",
      caption: "只核验那些足以让一天失败的地方",
      columns: ["时间", "核验内容", "作出决定"],
      rows: [
        ["选择城市时", "当地是否公布当前节庆活动，大型酒店和交通是否有备选？", "保留或替换落脚地"],
        ["预订时", "具体景点、活动或餐馆是否接受该日期和你的护照、联系方式？", "只订已确认的主项目"],
        ["大约提前一周", "主办方是否公布假期时段、预约、限流和取消规则？", "固定一个主项目和一个备选"],
        ["前一天", "公告是否仍有效，交通是否正常？", "照常去、换时段或替换"],
        ["当天", "天气、限流或交通是否改变？", "听从当前运营方，不拿旧截图争论"]
      ]
    },
    {
      id: "food-plan",
      type: "callout",
      tone: "decision",
      title: "前3顿饭少一点浪漫，多一点证据",
      body: "确认酒店早餐，或附近可靠的连锁店、便利店；保存一顿简单备餐；重要晚餐通过餐馆当前渠道预订。网上宣传的年夜饭不一定接受单人临时到店，受邀参加家庭团聚也不是餐馆订单。先让基本吃饭有保障，再去发现真正营业的店。"
    },
    {
      id: "events-heading",
      type: "heading",
      level: 2,
      text: "庙会和灯会是公开活动，不是永久的全国时间表"
    },
    {
      id: "events-copy",
      type: "paragraph",
      text: "对外国游客而言，庙会、游园会或灯会可能正是春节值得来的最好理由：活动公开，主办方明确，也不需要进入私人家庭。但一个活动名称并不等于可以入场。以北京2026年安排为例，不同庙会只覆盖假期中的不同日期，有些灯展则延续到元宵节前后；活动场地既有公园、寺庙，也有商业嘉年华。下一年必须重新查看城市和每个主办方公布的名单。"
    },
    {
      id: "event-check",
      type: "list",
      ordered: false,
      items: [
        "使用城市、公园、博物馆、寺庙或明确主办方的有日期公告，不用转载清单。",
        "分清宗教场所、非遗庙会、商业嘉年华、演出或灯光展，并按真实场景行动。",
        "核验门票、预约、护照接纳、容量、行李和摄影规则。",
        "保存准确中文入口和时段；同一个活动名称可能覆盖多个场地。",
        "附近准备第二个公开活动，以应对天气或满额。",
        "装饰还在，不代表活动必然一直持续到元宵节。"
      ]
    },
    {
      id: "family-heading",
      type: "heading",
      level: 2,
      text: "公共庆祝不等于获准进入家庭生活"
    },
    {
      id: "family-copy",
      type: "paragraph",
      text: "联合国教科文组织对春节社会实践的描述包括节前准备、家庭团聚、拜年和公共庆祝，但它不是每个家庭都必须完成的清单。地区、代际、职业、信仰、迁徙经历和个人偏好都会带来差异。有些家庭提前相聚，有些订餐或外出旅行，也有人过得很简单。尊重春节，也包括允许普通或临时改变的团聚保持普通。"
    },
    {
      id: "invitation-table",
      type: "table",
      caption: "场景决定你的身份",
      columns: ["场景", "你的身份", "许可意味着什么"],
      rows: [
        ["官方庙会、博物馆或售票演出", "普通公众", "遵守当前入场、行为和摄影规则"],
        ["餐馆春节菜单", "顾客", "预订只覆盖用餐，不包含进入家庭传统"],
        ["朋友家的家庭聚餐", "被明确邀请的客人", "询问到达时间、家人是否知情、饮食限制、礼物和离开时间"],
        ["登门、祭祖或压岁钱交换", "除非明确邀请，否则是私人活动", "邀请吃饭不自动包括同行者、拍摄和所有家庭环节"]
      ]
    },
    {
      id: "etiquette",
      type: "callout",
      tone: "neutral",
      title: "简单礼仪已经足够",
      body: "真诚说一句“新年快乐”，跟随主人的节奏；拍摄人物、供品、儿童或钱之前先问。主人建议时，带一份小礼物可能合适；不需要随意给陌生孩子红包，反而可能尴尬。不要要求别人表演仪式，不要因合理改计划而闹情绪，也不要在未获具体同意时发布可辨认的家庭素材。"
    },
    {
      id: "sample-heading",
      type: "heading",
      level: 2,
      text: "一趟以春节为主角、又留有恢复空间的行程"
    },
    {
      id: "sample-plan",
      type: "list",
      ordered: true,
      items: [
        "压力最高的日期只在一座大城市住4至5晚，不横跨全国。",
        "抵达日只安排酒店周边、确认过的用餐和普通散步。",
        "选择一个有明确日期的公共节庆作为文化主项目。",
        "把一个重要景点放在另一个已预约的日子，并准备附近无需门票的备选。",
        "留一天不固定，用于天气、疲劳或临时改变开放。",
        "核验当年返程客流并保护国际航班前余量后，再移动到下一座城市。"
      ]
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "假期计划失败时"
    },
    {
      id: "failure-table",
      type: "table",
      caption: "恢复行程，不把节日变成别人的紧急任务",
      columns: ["失败", "先做什么", "不要做什么"],
      rows: [
        ["想要的火车一直没票", "使用已认可的替代日期、路线或交通方式，或删掉非必要移动", "认定候补一定兑现"],
        ["餐馆关门", "使用已保存的备餐，并核验另一家当前营业场所", "把家庭假期歇业当成针对你的差服务"],
        ["庙会满额或改变", "转去附近公开备选", "给工作人员施压或闯入管控区"],
        ["家庭邀请改变", "感谢主人，改去公共餐厅或活动", "要求家庭为你的行程表演团聚"],
        ["城市比预想安静", "从容走开放街区，保留已确认主项目", "由此认定所有景区也一定没人"],
        ["热门景点人满为患", "使用预约时段，或离开去备选", "当天继续跨区追另一个著名景点"]
      ]
    },
    {
      id: "final-decision-heading",
      type: "heading",
      level: 2,
      text: "最终决定：因为春节而来，不是忍着春节来"
    },
    {
      id: "final-decision",
      type: "comparison",
      title: "左栏越符合你，这趟旅行越合适",
      columns: [
        {
          heading: "春节来中国",
          items: [
            "一到两个落脚地已经足够",
            "公共节庆文化是主要兴趣",
            "可以固定主项目，放开其他时间",
            "一家餐馆关门或活动变化不会毁掉行程",
            "接受中国热门景点可能拥挤"
          ]
        },
        {
          heading: "换一个时段",
          items: [
            "路线必须频繁跨城",
            "每一餐都依赖某家小店",
            "多处必去景点没有当前假期公告",
            "需要普通工作日的商业或办事服务",
            "主要目标是低人流观光，而不是春节本身"
          ]
        }
      ]
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "这篇指南负责什么",
      body: "本页负责判断是否在春节来中国，以及交通压力、商户营业、公共活动和家庭边界如何相互作用。中国公共假期日历负责每年内地放假调休；运营方负责实时票务和时段；任何页面都不能承诺进入私人家庭庆祝。"
    },
    {
      id: "help-cta",
      type: "callout",
      tone: "decision",
      title: "轻量核对就能保护脆弱部分",
      body: "如果日期与春节重叠，可以先提供城市、必要跨城移动和两三项不能放弃的体验。首次咨询不要发送护照、付款信息、医疗信息，或行动能力方面的详细信息。Homeground可以指出哪些假设需要当前来源、哪里只要简单备选，不会把春节写成一段生硬推销。"
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "继续规划",
      items: [
        { "label": "中国公共假期旅行日历", "href": "/zh/guides/china-public-holidays-travel-calendar/", "description": "查看中国内地当年放假、调休与客流窗口。" },
        { "label": "第一次来中国旅行规划", "href": "/zh/plan/", "description": "用少量站得住脚的决定搭起整趟旅程。" },
        { "label": "第一次坐中国高铁", "href": "/zh/guides/china-high-speed-train-first-time-guide/", "description": "选好路线后准备乘车人信息、车站与进站。" },
        { "label": "夜车还是白天高铁", "href": "/zh/guides/china-night-train-or-daytime-high-speed-rail/", "description": "减少换酒店并保护真正可用的白天。" },
        { "label": "第一次在中国吃合餐", "href": "/zh/guides/first-shared-meal-in-china/", "description": "理解普通餐厅合餐，不把它与家庭团圆饭混为一谈。" }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "来源与年度依据",
      items: [
        { "label": "2027年公历与农历对照表", "url": "https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/2027e.pdf", "publisher": "香港天文台", "reviewedAt": "2026-08-22" },
        { "label": "香港政府公布2027年正月初一为2月6日", "url": "https://www.info.gov.hk/gia/general/202605/15/P2026051400300.htm", "publisher": "香港特别行政区政府", "reviewedAt": "2026-08-22" },
        { "label": "2026年中国内地放假安排", "url": "https://www.gov.cn/gongbao/2025/issue_12406/material/gwygb202532.pdf", "publisher": "中华人民共和国国务院", "reviewedAt": "2026-08-22" },
        { "label": "2026年综合运输春运方案", "url": "https://xxgk.mot.gov.cn/2020/jigou/ysfws/202601/t20260124_4198706.html", "publisher": "中华人民共和国交通运输部", "reviewedAt": "2026-08-22" },
        { "label": "2026年全国春节旅游结果", "url": "https://english.www.gov.cn/archive/statistics/202602/24/content_WS699da7c5c6d00ca5f9a09421.html", "publisher": "中华人民共和国国务院", "reviewedAt": "2026-08-22" },
        { "label": "2026年上海春运阶段与高峰预测", "url": "https://english.shanghai.gov.cn/en-LatestNews/20260127/d764a117cb9748bb8ab1b29df52a70f6.html", "publisher": "上海市人民政府", "reviewedAt": "2026-08-22" },
        { "label": "2026年上海春节旅游与商业结果", "url": "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260224/5d3c35722d5f43b0a7bdc0e16e5e513f.html", "publisher": "上海市人民政府", "reviewedAt": "2026-08-22" },
        { "label": "2026年北京庙会与公园活动", "url": "https://english.beijing.gov.cn/latest/news/202602/t20260218_4524489.html", "publisher": "北京市人民政府", "reviewedAt": "2026-08-22" },
        { "label": "春节社会实践", "url": "https://ich.unesco.org/en/RL/spring-festival-social-practices-of-the-chinese-people-in-celebration-of-traditional-new-year-02126", "publisher": "联合国教科文组织非物质文化遗产", "reviewedAt": "2026-08-22" },
        { "label": "中国铁路候补购票问答", "url": "https://kyfw.12306.cn/otn/gonggao/alternate.html", "publisher": "中国铁路12306", "reviewedAt": "2026-08-22" },
        { "label": "春节旅行中的反向流动研究", "url": "https://journals.sagepub.com/doi/10.1177/0308518X19860537", "publisher": "Environment and Planning A", "reviewedAt": "2026-08-22" },
        { "label": "头图：小溪Yang拍摄的广州南站春运候车厅，CC BY 2.5；已裁切缩放", "url": "https://commons.wikimedia.org/wiki/File:Crowded_People_during_Chunyun,_Guangzhounan_Railway_Station,_China_Railway_20200121.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-22" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
