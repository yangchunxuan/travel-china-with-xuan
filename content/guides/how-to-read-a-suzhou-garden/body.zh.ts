import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "苏州园林本来就不让人一眼看完。墙先遮住一部分，门窗截出一幅画，游廊转弯后才放出下一段景；山石代替峰峦，水面拉开远近，题名又把眼前空间连到诗文。第一次参观时，与其问“打卡了多少名景”，不如问“园林下一步让我看见什么”。看懂这条展开顺序，认真走一座，往往比匆忙赶三座更有收获。",
    },
    {
      id: "not-flower-garden-heading",
      type: "heading",
      level: 2,
      text: "先别把它只当成赏花的花园",
    },
    {
      id: "three-ideas",
      type: "comparison",
      columns: [
        {
          heading: "缩小的山水",
          body:
            "山石、水体与花木不是建筑旁边的装饰。它们共同在城市围墙内模拟峰谷、林木、江湖与天气，把更大的自然压缩进有限空间。",
        },
        {
          heading: "需要时间展开的山水",
          body:
            "完整构图很少一次全部露出。暗廊、转角、漏窗与桥不断剪辑视线，所以行走本身就是设计的一部分，不是从一个景点赶到另一个景点的空白。",
        },
        {
          heading: "与生活相连的文化空间",
          body:
            "不少名园原本与宅第相连。厅堂、书斋、会客空间、书法、诗文和景物共同组成生活环境，并不是只供现代游客观光的公共公园。",
        },
      ],
    },
    {
      id: "scope-warning",
      type: "callout",
      title: "不要用苏州园林概括所有中国园林",
      body:
        "本文讨论的是苏州及江南相关的古典园林，重点是宋至清时期形成的紧凑型宅园与私家园林。北京皇家园林、寺观园林、现代城市公园，以及中国其他地区的造园传统，尺度、功能与观看方式都可能不同。",
      tone: "neutral",
    },
    {
      id: "unesco-heading",
      type: "heading",
      level: 2,
      text: "“苏州古典园林”究竟指什么",
    },
    {
      id: "unesco-summary",
      type: "paragraph",
      text:
        "“苏州古典园林”是一项由多处遗产点组成的世界遗产，不是某一个景区的名称。拙政园、留园、网师园与环秀山庄于 1997 年列入名录；沧浪亭、狮子林、艺圃、耦园与退思园于 2000 年扩展加入，共九处。UNESCO 以它们呈现 11 至 19 世纪长江下游地区的园林文化。",
    },
    {
      id: "unesco-meaning",
      type: "paragraph",
      text:
        "世界遗产说明当然提到水、山石、植物与建筑，也同时列出书法、家具、匾额、楹联与装饰艺术。遗产价值不只是几池好看的水，而是山水、建筑、文学、工艺与宅居生活怎样被组织成一个整体。",
    },
    {
      id: "evidence-levels",
      type: "callout",
      title: "本文怎样区分事实与解释",
      body:
        "世界遗产身份、组成点、年代与测绘面积来自 UNESCO 或苏州市政府；微缩山水、空间序列和借景的解释来自博物馆与学术研究；园名故事只在机构资料有记录时使用。“少看几座、慢读一座”是 Homeground 的编辑判断，不是古代定下的规矩。",
      tone: "decision",
    },
    {
      id: "grammar-heading",
      type: "heading",
      level: 2,
      text: "追名亭之前，先读懂六种空间语言",
    },
    {
      id: "garden-grammar",
      type: "table",
      caption: "看苏州园林时可以使用的六个抓手",
      columns: ["元素", "它在做什么", "现场看什么"],
      rows: [
        [
          "山石与假山",
          "把峰、谷、洞、壑和山路浓缩成可观看、甚至可穿行的地形，也把造园工艺与中国山水艺术连在一起。",
          "看轮廓、孔洞、褶皱、阴影，以及路径怎样让一组山石显得比实际占地更大。不要只把它当成布景。",
        ],
        [
          "水",
          "水面承接倒影，分开近景与远景，也让多座建筑围绕同一个视觉中心发生关系。岸线还会被花木或建筑遮住后再次出现。",
          "沿着一段岸线走：哪座亭面对它，哪座桥跨过它，屋顶、树木或山石怎样在倒影中多出一层。",
        ],
        [
          "墙、门与窗",
          "它们不仅展示，也主动遮挡。一个开口可以像画框一样截取景物，一段实墙则把下一幅景延后。",
          "正对一个门窗站定，再向旁边移半步，观察前景、中景和背景怎样进入或退出画面。",
        ],
        [
          "廊与径",
          "它们控制步速、角度与明暗。狭窄或昏暗的接近过程，会让随后的庭院或水面显得突然开阔。",
          "在转弯前后各停一次，比较宽窄、光线、声音，以及下一处景物看起来有多远。",
        ],
        [
          "花木、季节与声音",
          "竹、荷、古树、雨、风和季节光线会不断改写同一处构图。园林并不存在唯一正确的开花月份。",
          "除了看，也要听和感受：叶上雨声、水动、树荫与反光，在无花时同样构成景。",
        ],
        [
          "题名、匾额与楹联",
          "文字把厅堂或景点连到诗文、人物经历和园主的文化身份，引导理解，但不代表每件东西都有一套固定象征答案。",
          "认真弄懂一个题名，比猜十个更有用。再看这几个字把你的注意力引向眼前哪一部分。",
        ],
      ],
    },
    {
      id: "rocks-heading",
      type: "heading",
      level: 2,
      text: "为什么这些石头要让人想到山",
    },
    {
      id: "rocks-explanation",
      type: "paragraph",
      text:
        "大都会艺术博物馆把中国园林解释为一个微缩世界：叠石可指向山脉，池泉可让人联想到江河湖海，小树则能够提示更大的森林。相关审美长期重视山石瘦峭、孔洞通透与表面褶皱等特征，因为这些形态容易产生不稳定的轮廓、阴影和想象中的通道。假山既是实体工艺，也邀请观看者在小范围里想象更辽阔的地貌。",
    },
    {
      id: "rocks-caution",
      type: "callout",
      title: "人工营造不等于文化上的“假”",
      body:
        "叠出的假山并不声称自己是未经人手的地质遗迹，精心施工本来就是价值的一部分。判断它时，更有用的问题是：它是否制造了体量、深度、路径与变化的视角，而不是每块石头是否由自然自行摆放。",
      tone: "neutral",
    },
    {
      id: "borrowed-heading",
      type: "heading",
      level: 2,
      text: "借景很好用，也最容易被说得过于简单",
    },
    {
      id: "borrowed-explanation",
      type: "paragraph",
      text:
        "“借景”常被解释为把园界以外的景物纳入园内构图，例如远处的塔、邻近树梢、天空，甚至声音。明代计成《园冶》的最后一部分专门讨论借景。不过，景观史学者 Wybe Kuitert 指出，计成的意思比一种取远景的视觉技巧更广：它总结的是造园者怎样顺应场地，并与不断变化的自然建立关系。因此，看见一个圆窗，并不能自动宣布它就是借景。",
    },
    {
      id: "three-view-techniques",
      type: "comparison",
      title: "三个相关效果，不要全部叫作借景",
      columns: [
        {
          heading: "框景",
          body:
            "门洞、窗格或两根柱子像画框一样裁切视野。被框住的主体完全可能位于园内，所以有框不一定有借景。",
        },
        {
          heading: "借景",
          body:
            "园界之外或超出眼前小空间的景物进入构图。学界对这个词应当理解得多广仍有讨论，不宜把它当成所有漏窗照片的统一标签。",
        },
        {
          heading: "连续展开",
          body:
            "墙、花木与转折先藏住一景，再随行走放出下一景。“移步换景”是便于理解的现代概括，但每座园林的实际节奏并不相同。",
        },
      ],
    },
    {
      id: "four-gardens-heading",
      type: "heading",
      level: 2,
      text: "四座园林，四种不同的空间语法",
    },
    {
      id: "four-gardens",
      type: "table",
      caption: "按照想理解的设计问题来选园林",
      columns: ["园林", "有资料支持的特征", "适合怎样观看"],
      rows: [
        [
          "拙政园",
          "苏州市政府资料称水为园林的脉络与灵魂，约占这座大型三段式园林面积的三分之一。",
          "适合观察大水面的组织：岸、岛、桥与亭怎样把一片水分成不断变化的远近层次。",
        ],
        [
          "留园",
          "官方介绍突出其建筑空间和曲折长廊，长廊连接不同区域，并在行进中反复呈现新景。",
          "适合看空间怎样先收紧再放开：游廊与庭院、实墙与开口、室内厅堂与室外山水怎样成对出现。",
        ],
        [
          "网师园",
          "面积约 0.6 公顷，是紧凑的宅园组合。园内小院与书斋还成为纽约大都会艺术博物馆明轩与明式书房的参照。",
          "适合看生活空间与中央小园怎样在没有宏大尺度的情况下仍形成完整世界。",
        ],
        [
          "狮子林",
          "始建于 1342 年并有佛教背景，以分层湖石假山、洞穴和曲折路径著称。",
          "适合亲自体会假山如何成为可以行走的山地，而不只是远看的装饰。",
        ],
      ],
    },
    {
      id: "not-ranking",
      type: "callout",
      title: "这些是特征，不是排名",
      body:
        "最大、最常出现在照片里的园林，不一定最适合你。当天客流、保护维修、入园安排、天气与行动能力都会改变体验。先向运营方核对当前信息，再按照自己最想看懂的空间问题选择。",
      tone: "decision",
    },
    {
      id: "walking-heading",
      type: "heading",
      level: 2,
      text: "走进任何一座园林都能做的七次停留",
    },
    {
      id: "walking-exercise",
      type: "list",
      ordered: true,
      items: [
        "在第一道门槛停一下。先不找地图，看看园内还有多少被藏住，入口只允许你看见什么。",
        "选一扇门或窗，分出前景、中景与背景；横移半步，再看画面怎样改变。",
        "沿一段水岸行走，记录水面在哪里展开、消失、倒映建筑，又把视线引向哪里。",
        "在游廊转角前后各停一次，比较宽窄、明暗、声音，以及下一件景物的视觉距离。",
        "把一组假山当成地形，寻找想象中的峰、谷、洞或山路；游客规则禁止攀爬的地方不要上去。",
        "借助可靠导览或博物馆说明，读懂一块匾额、一个厅名或一副楹联，再看文字是否改变了你的注意点。",
        "回头看。反向视野常常是另一幅构图，这也是为什么追踪路线比只收集正面照片更重要。",
      ],
    },
    {
      id: "history-layers-heading",
      type: "heading",
      level: 2,
      text: "历史能说明什么，又不能替你证明什么",
    },
    {
      id: "history-layers",
      type: "table",
      caption: "五种说法需要分开",
      columns: ["层级", "例子", "应该怎样使用"],
      rows: [
        [
          "有记录的事实",
          "九处世界遗产组成点、列入年代、测绘面积，以及官方保存的园林格局资料。",
          "可以直接陈述，同时给出机构来源。",
        ],
        [
          "学术解释",
          "把园林理解成微缩世界、行走序列，或把借景理解为造园者、场地与变化自然之间的整体关系。",
          "说明这是某种解释，并为不同研究保留余地，不把观点写成尺寸或日期那样的物理事实。",
        ],
        [
          "有记录的园名故事或地方传说",
          "园名可能连到诗句、园主、佛教典故，也可能来自后来的讲述。",
          "先问关系是否见于文献；不要把导游讲得精彩的故事自动升级为已经证实的起源。",
        ],
        [
          "当代观察",
          "客流、单向游线、季节展陈、维修与夜游会改变今天的观看感受。",
          "给观察加上日期，不要用一次现场感受概括所有历史时期或未来每一天。",
        ],
        [
          "Homeground 编辑判断",
          "第一次参观时，慢慢看懂一座园林，通常比匆忙赶完几座名园更有价值。",
          "把它当成可随旅行者改变的规划建议，而不是文化戒律。",
        ],
      ],
    },
    {
      id: "elite-context",
      type: "callout",
      title: "文人理想不是完整的社会史",
      body:
        "UNESCO 与博物馆资料常从宅第、园主修养、诗文与退隐理想解释这些园林，这是重要背景，但不表示所有苏州居民都曾这样生活。园林的营造与维护也依赖设计者、匠人及其他劳动者。更准确的读法，是把它们看成保存下来的精英文化空间，而不是“中国人”共同的标准住宅。",
      tone: "warning",
    },
    {
      id: "mistakes-heading",
      type: "heading",
      level: 2,
      text: "让几座园林迅速混在一起的六个误区",
    },
    {
      id: "mistakes",
      type: "list",
      items: [
        "把几座名园连续排满，却没有先决定每一座要看什么不同。",
        "见到圆门或漏窗就一律称为借景。",
        "只按当周开花数量判断园林好不好看。",
        "因为假山是人工叠成的，就把它当成没有文化价值的仿造物。",
        "没有来源，便给每株植物、每块石头和每座建筑安排唯一固定的象征意义。",
        "用没有日期的博客确认当下票价、开放时间或预约规则，而不向运营方核对。",
      ],
    },
    {
      id: "final-connection",
      type: "callout",
      title: "用一座园林读懂苏州的一部分",
      body:
        "一座选得合适的园林，可以在一次行走里串起苏州的水、建筑、工艺、绘画、文学与城市生活。如果你希望有人根据兴趣帮你选择园林，并把它放进更完整的苏州或中国路线，Homeground 的真人规划师可以一起讨论背景与动线；当下入园与开放信息仍应向园林运营方确认。",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "继续规划这次参观",
      items: [
        {
          label: "按目的地探索中国",
          href: "/zh/explore/",
          description: "把苏州放进更大的路线，同时保留每座城市不同的旅行节奏。",
        },
        {
          label: "检查中国行程是否排得太赶",
          href: "/zh/guides/is-your-china-itinerary-too-rushed/",
          description: "给一座园林留出慢慢阅读的时间，而不是匆忙刷完好几座。",
        },
        {
          label: "判断中国旅行是否需要导游",
          href: "/zh/guides/do-you-need-a-tour-guide-in-china/",
          description: "只在背景讲解真正增加理解的地方安排真人协助。",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "2026 年 8 月 10 日核对的官方、博物馆与学术来源",
      items: [
        {
          label: "苏州古典园林：世界遗产说明、评定标准与保护概况",
          url: "https://whc.unesco.org/en/list/813/",
          publisher: "UNESCO 世界遗产中心",
          reviewedAt: "2026-08-10",
        },
        {
          label: "苏州古典园林：九处组成点与测绘面积",
          url: "https://whc.unesco.org/en/list/813/maps/",
          publisher: "UNESCO 世界遗产中心",
          reviewedAt: "2026-08-10",
        },
        {
          label: "1997 年苏州古典园林 ICOMOS 评估文件",
          url: "https://whc.unesco.org/document/154344",
          publisher: "ICOMOS，经 UNESCO 世界遗产中心发布",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Chinese Gardens and Collectors' Rocks：中国园林与供石",
          url: "https://www.metmuseum.org/essays/chinese-gardens-and-collectors-rocks",
          publisher: "纽约大都会艺术博物馆亚洲艺术部",
          reviewedAt: "2026-08-10",
        },
        {
          label: "拙政园：历史、格局与水面构成",
          url: "https://english.suzhou.gov.cn/szsenglish/szyllm/201611/33c53150ce8949d290a5092266502da4.shtml",
          publisher: "苏州市人民政府",
          reviewedAt: "2026-08-10",
        },
        {
          label: "留园：建筑空间与游廊序列",
          url: "https://english.suzhou.gov.cn/szsenglish/szyllm/201611/6a6c8bf51df742b4b3a1a56307437b21.shtml",
          publisher: "苏州市人民政府",
          reviewedAt: "2026-08-10",
        },
        {
          label: "网师园：紧凑的宅园组合",
          url: "https://english.suzhou.gov.cn/szsenglish/sz4ajjq/201611/4fe3b02dec384dceb6789d453befe57f.shtml",
          publisher: "苏州市人民政府",
          reviewedAt: "2026-08-10",
        },
        {
          label: "狮子林：佛教渊源与湖石假山",
          url: "https://english.suzhou.gov.cn/szsenglish/sz4ajjq/201611/51cf06c8ac2243309f07adcfa7992624.shtml",
          publisher: "苏州市人民政府",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Kuitert：Borrowing scenery and the landscape that lends——《园冶》最后一章的借景",
          url: "https://doi.org/10.1080/18626033.2015.1058570",
          publisher: "Journal of Landscape Architecture",
          reviewedAt: "2026-08-10",
        },
        {
          label: "苏州古典园林空间营造与颜真卿三稿章法关系研究",
          url: "https://doi.org/10.1080/13467581.2024.2358202",
          publisher: "Journal of Asian Architecture and Building Engineering",
          reviewedAt: "2026-08-10",
        },
      ],
    },
  ],
};

export default body;
