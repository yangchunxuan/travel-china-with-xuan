import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "草方格、防护林和光伏场都可能出现在中国干旱区，但它们做的不是同一件事。草方格增加地表粗糙度、减弱风沙流；林草带保护明确的边界或设施；光伏阵列负责发电，在配套治理措施下也会改变遮阴、风场和水分分布。先看保护对象、作用机制、水源、维护和进入边界，再决定能否称为生态修复。更绿不一定更健康，能源和科研作业区也不天然对游客开放。"
    },
    {
      id: "terms-heading",
      type: "heading",
      level: 2,
      text: "先分清三个动词"
    },
    {
      id: "terms-comparison",
      type: "comparison",
      columns: [
        {
          heading: "治理",
          body: "减少铁路、公路、农田、聚落或工程周边的流沙、风蚀和掩埋风险。地表稳定下来就可能完成任务，不必变成森林。"
        },
        {
          heading: "修复",
          body: "让已经退化的土地恢复生态功能，或回到适合当地的植物—土壤群落。它需要基线、目标和长期监测。"
        },
        {
          heading: "保护",
          body: "避免天然荒漠植被、生物土壤结皮或脆弱过渡带继续受扰。有时更合理的做法是少进入、少种植。"
        }
      ]
    },
    {
      id: "desert-boundary",
      type: "callout",
      tone: "warning",
      title: "天然荒漠不是失败的土地",
      body: "全国防沙治沙规划根据区域条件和水资源承载能力，区分预防、保护、修复与适度利用。不要把每片看似裸露的沙丘都当成必须变绿的退化地。天然干旱区生态系统、流动沙丘和稀疏本土植被同样有生态价值；真正要问的是土地是否在退化，以及治理针对什么风险。"
    },
    {
      id: "three-systems-heading",
      type: "heading",
      level: 2,
      text: "把三种最显眼的系统分别读"
    },
    {
      id: "three-systems-table",
      type: "table",
      caption: "旅客看得到什么，又有什么仍未被证明",
      columns: ["系统", "可见机制", "条件与局限"],
      rows: [
        [
          "草方格",
          "半埋的秸秆组成重复网格，增加地表粗糙度，打乱近地气流，让流沙在管理带内沉降。",
          "格子尺寸、高度、坡位、风况、材料衰变和补修都会改变效果。它先稳定沙面，植被恢复是另一项更慢的结果。"
        ],
        [
          "防护林带",
          "草、灌、乔构成的行列或网格降低受保护边缘的风速，在风沙到达农田、道路或聚落前拦截一部分物质。",
          "物种、疏透度、方向、存活和耗水决定作用。高密度、需水量大的乔木墙不是干旱区通用答案。"
        ],
        [
          "光伏场",
          "阵列发电，也改变遮阴、地表粗糙度、近地风和雨水到达土壤的方式；板间与板下可能另设沙障或植被。",
          "施工扰动、土壤压实、清洗或灌溉用水、放牧、植被管理和原始地况都会改变生态结果。仅有光伏板不能证明已经修复。"
        ]
      ]
    },
    {
      id: "checkerboard-heading",
      type: "heading",
      level: 2,
      text: "草方格是一条链的起点，不是完成后的生态系统"
    },
    {
      id: "checkerboard-chain",
      type: "list",
      ordered: true,
      items: [
        "先确定保护对象与沙源。铁路防护带、路旁流动沙丘和退化牧地不能共用一个成功标准。",
        "再按当地风向和地形铺设沙障。露出地表的秸秆让近地气流减速、转向，侵蚀和沉积逐渐重塑格内沙面。",
        "在水分和保护条件允许时，让更稳定的沙面支持适生植物或生物结皮。方格本身不会制造水和成熟土壤。",
        "最后持续检查和更新。秸秆会腐朽，格子可能被埋或被掏蚀，植物会死亡，踩踏也会破坏正在形成的表层。"
      ]
    },
    {
      id: "shapotou-case",
      type: "callout",
      tone: "neutral",
      title: "沙坡头的 1 m × 1 m 方格为什么只是案例，不是全国配方",
      body: "中国科学院介绍，沙坡头长期试验为当地铁路防护体系优化出半隐蔽式 1 m × 1 m 草方格。同行评审的风沙研究进一步解释了方格如何改变湍流、侵蚀与沉积。两类证据相互印证了这个场景中的机制，却不能证明同一尺寸适合所有沙丘、材料、风场和维护条件。"
    },
    {
      id: "shelterbelt-heading",
      type: "heading",
      level: 2,
      text: "判断防护林，先看它在保护哪条边界"
    },
    {
      id: "shelterbelt-conditions",
      type: "table",
      caption: "一排植被背后的关键问题",
      columns: ["现场问题", "为什么会改变判断"],
      rows: [
        [
          "下风向是什么？",
          "农田林网、绿洲边缘、交通廊道和天然荒漠边界，需要的带状布局与成效并不相同。"
        ],
        [
          "种了什么，密度多大？",
          "本土适生的草和灌木可能比高大乔木更适合干旱地。保持一定透风性，有时比一堵密墙更有效。"
        ],
        [
          "水从哪里来？",
          "雨养、地下水、地表引水和灌溉的生态成本不同。依靠外部输水存活，不等于已经自我维持。"
        ],
        [
          "成活之后能留下什么？",
          "缺口、死株、病虫、火险、放牧压力与补植，决定防护功能能否延续。一个绿色季节不是长期趋势。"
        ]
      ]
    },
    {
      id: "water-tradeoff",
      type: "callout",
      tone: "decision",
      title: "水是不能回避的约束",
      body: "关于中国干旱区的同行评审综述指出，保护和修复能带来收益，大规模造林也可能施加显著水压力。全国规划同样依据水资源承载能力区分优先任务。必须把物种、密度和水源一起读，不能只按树冠覆盖率打分。"
    },
    {
      id: "pv-heading",
      type: "heading",
      level: 2,
      text: "光伏板会改变场地，但不会独自完成修复"
    },
    {
      id: "pv-explanation",
      type: "paragraph",
      text: "2024 年国家能源局和国家林草局通知要求，光伏治沙项目同步规划治理、管理设施、定期巡检，循环利用生产用水，并保障必要生态用水。这样的政策表述很重要：发电与治沙是两项需要耦合的任务。中国西部的现场研究发现板下土壤温度和水分会变化，更大范围调查则表明结果随地点和生态施工而变。遮阴、减风和雨水重分配可能帮助部分植被；场平、道路、打桩、扬尘、压实、清洗用水和新增灌溉也会带来影响。先把光伏板与周围措施和投入拆开，再谈因果。"
    },
    {
      id: "pv-effects",
      type: "comparison",
      columns: [
        {
          heading: "可能的正向路径",
          body: "遮阴和减风可降低部分地表胁迫，板边会重分配降雨，配套植被或沙障在合适场地可能受益。"
        },
        {
          heading: "可能的负担",
          body: "施工会扰动结皮与土壤，检修路会切割地表，清洗和新植被还可能增加耗水与维护投入。"
        },
        {
          heading: "需要什么证据",
          body: "治理前基线、对照区域、水量平衡、植被与土壤监测、施工记录，以及足够长的时间来区分天气和工程影响。"
        }
      ]
    },
    {
      id: "access-boundary",
      type: "callout",
      tone: "warning",
      title: "光伏场、防护带和科研样地都不是天然景点",
      body: "只有运营方或地方主管部门明确设置游客路线时才能进入。围栏、闸门、警示牌和工作人员指令就是访问终点。不要在高速路肩停车，不要越过铁路边界、放无人机、踩上沙障，也不要把远远看见当成获准进入。"
    },
    {
      id: "traveller-protocol-heading",
      type: "heading",
      level: 2,
      text: "旅客现场解读六步法"
    },
    {
      id: "traveller-protocol",
      type: "list",
      ordered: true,
      items: [
        "出发前确认公共观景点、开放状态和运营主体；把景区与保护区核心区、科研站和工业设施分开。",
        "弄清项目声称解决的问题：流沙、风蚀、设施防护、植被退化、能源生产，还是几项并行任务。",
        "追踪格网方向、林带位置、组件间距和下风向保护边界。作用机制必须能连回治理目标。",
        "寻找投入与维护线索：灌溉管、补扎沙障、检修路、死株、禁牧措施和监测设备。",
        "记录看不到的部分：地下水使用、成活率、土壤变化、生态基线、长期维护和场外影响。",
        "保持地表完整。只走标记路线，远离设备和野生动物，不把植物、结皮或秸秆带走当纪念品。"
      ]
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "两个负责任的旅客情境"
    },
    {
      id: "scenarios-table",
      type: "table",
      caption: "在不把作业区变成景点的前提下观察",
      columns: ["情境", "有用的读法", "访问不清晰时如何恢复"],
      rows: [
        [
          "合法进入沙坡头游客区域",
          "在标记清楚的公共视点，把草方格与包兰铁路防护史联系起来，再区分机械固沙、后续植被和结皮发育。",
          "若路线接近铁路用地、保护区边界或科研样地，立即折返。改看公众解说中心或官方展陈，不去寻找仍在工作的防护带。"
        ],
        [
          "远距离看见荒漠光伏阵列",
          "先把它当能源基础设施。从指定视点观察独立沙障、管理植被、水系统和检修路，再讨论生态影响。",
          "如果没有公布游客路线，就不要自行开辟。只把阵列作为合法交通途中看到的景观背景，改去公共博物馆、观景点或另一站。"
        ]
      ]
    },
    {
      id: "misreadings-heading",
      type: "heading",
      level: 2,
      text: "常见误读与更好的问题"
    },
    {
      id: "misreadings-table",
      type: "table",
      caption: "用可检验的问题替换口号",
      columns: ["误读", "更好的问题"],
      rows: [
        ["越绿就修复得越好", "改善的是哪项本土生态功能或保护目标，水成本是多少？"],
        ["草方格就是种树苗床", "它的首要任务是否为减弱风沙流，后续到底监测了什么过程？"],
        ["光伏板治好了沙漠", "哪些结果来自组件，哪些来自沙障、种植、禁牧、灌溉或维护？"],
        ["围栏挡住了最佳机位", "围栏是在保护游客、设施、科研有效性还是脆弱恢复表层？请使用获准的替代位置。"]
      ]
    },
    {
      id: "final-check-heading",
      type: "heading",
      level: 2,
      text: "描述所见之前，再核对一次"
    },
    {
      id: "final-check",
      type: "list",
      ordered: false,
      items: [
        "说清干预类型与保护对象，不把每个干旱区项目都叫生态修复。",
        "列出关键场地条件：风、地形、降雨、土壤、水源和维护。",
        "把观察到的格局与测量过的生态结果分开。",
        "既承认可能收益，也说明水资源与施工取舍。",
        "确认每张照片和每项观察都来自合法公共位置，而不是作业区、铁路用地、保护区或科研样地。"
      ]
    },
    {
      id: "help-cta",
      type: "callout",
      tone: "decision",
      title: "想负责任地安排一处干旱区景观吗？",
      body: "留下日期、人数和大致预算，人工规划师可以核对路线中是否有合规公共观察点，同时不承诺进入运营或保护区域。"
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "继续探索",
      items: [
        {
          label: "探索中国",
          href: "/zh/explore/",
          description: "回到目的地与景观集合页。"
        },
        {
          label: "通过公共门户访问祁连山",
          href: "/zh/guides/qilian-mountains-public-gateways-and-access/",
          description: "把同样的访问边界意识用在另一处生态敏感区域。"
        },
        {
          label: "读懂宁夏西夏文化背景",
          href: "/zh/guides/xixia-script-and-imperial-tombs-context/",
          description: "把干旱区景观观察与有明确资料的文化景观访问平衡起来。"
        },
        {
          label: "按中国气候区规划时间",
          href: "/zh/guides/china-climate-regions-for-trip-timing/",
          description: "加入干旱区停留前，先筛查高温、寒冷、风和暴露时长。"
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "已核对的官方与研究来源",
      items: [
        {
          label: "全国防沙治沙规划（2021–2030 年）",
          url: "https://www.forestry.gov.cn/c/www/lczc/521554.jhtml",
          publisher: "国家林业和草原局（规划正式发布页）",
          reviewedAt: "2026-08-13"
        },
        {
          label: "中国如何防治荒漠化",
          url: "https://www.forestry.gov.cn/c/www/zhzs/571450.jhtml",
          publisher: "国家林业和草原局",
          reviewedAt: "2026-08-13"
        },
        {
          label: "沙坡头治沙科研史与草方格机制",
          url: "https://www.cas.cn/zt/kjzt/kjzlzqzl/kjzlzq/202405/t20240531_5016345.shtml",
          publisher: "中国科学院",
          reviewedAt: "2026-08-13"
        },
        {
          label: "有序推进光伏治沙项目开发建设通知",
          url: "https://zfxxgk.nea.gov.cn/2024-05/17/c_1310776162.htm",
          publisher: "国家能源局、国家林业和草原局",
          reviewedAt: "2026-08-13"
        },
        {
          label: "为什么光伏板本身不能完成治沙",
          url: "https://www.forestry.gov.cn/lyj/1/zhzs/20260417/655639.html",
          publisher: "国家林业和草原局",
          reviewedAt: "2026-08-13"
        },
        {
          label: "中国干旱区变化的驱动与影响",
          url: "https://www.nature.com/articles/s43017-021-00226-z",
          publisher: "Nature Reviews Earth & Environment",
          reviewedAt: "2026-08-13"
        },
        {
          label: "草方格上方湍流风沙运动研究",
          url: "https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2017JD027786",
          publisher: "Journal of Geophysical Research: Atmospheres",
          reviewedAt: "2026-08-13"
        },
        {
          label: "光伏板对荒漠土壤温度和水分的影响",
          url: "https://pubmed.ncbi.nlm.nih.gov/33400111/",
          publisher: "Environmental Science and Pollution Research",
          reviewedAt: "2026-08-13"
        },
        {
          label: "中国荒漠光伏电站生态建设状况调查",
          url: "https://www.frontiersin.org/journals/environmental-science/articles/10.3389/fenvs.2024.1406546/full",
          publisher: "Frontiers in Environmental Science",
          reviewedAt: "2026-08-13"
        },
        {
          label: "首图卫星影像：NASA地球观测站使用USGS Landsat数据制作的库布其沙漠影像；公有领域，已裁切缩放",
          url: "https://earthobservatory.nasa.gov/images/153759/building-a-great-solar-wall-in-china",
          publisher: "NASA地球观测站／美国地质调查局",
          reviewedAt: "2026-08-13"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
