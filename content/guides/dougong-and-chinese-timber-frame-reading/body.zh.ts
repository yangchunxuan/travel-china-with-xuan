import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {"id":"lead","type":"lead","text":"斗拱是中国不少木构建筑在重要节点使用的层叠构件，帮助连接柱、梁与承托屋顶的构件。但斗拱不等于整套木构体系，也不能单独证明建筑年代久远、未经维修或“绝对抗震”。最有用的观看方法，是先追踪一条完整的受力路径，再问眼前这座建筑究竟保留了哪些可核实的证据。"},
    {"id":"answer","type":"callout","title":"简要答案：从地面向屋顶读","body":"先找台基和柱网，沿一根柱向上看到梁架与斗拱层，再继续看到檩、椽和屋顶。比较明间或次间与转角，因为转角处屋面改变方向。最后再近看雕刻和彩画。这个顺序能把结构位置与装饰外观分开，也不会让一组抢眼的斗拱代替整座建筑。","tone":"decision"},
    {"id":"scope-heading","type":"heading","level":2,"text":"斗拱是什么，以及本文不做什么判断"},
    {"id":"scope","type":"paragraph","text":"联合国教科文组织对中国传统木结构营造技艺的说明，把柱、梁、檩、枋和斗拱列为通过榫卯等方式连接的构件。斗拱属于这套更大的营造体系。它的形制、间距和结构作用，会随时代、建筑等级、地域与维修史改变，所以殿堂、宫门、木塔和现代仿古亭不能套用同一个永恒公式。本文教的是现场观察，不负责鉴定年代、判定结构安全，也不能替代古建勘察报告。"},
    {"id":"frame-heading","type":"heading","level":2,"text":"先找到建筑的结构语法"},
    {"id":"frame","type":"table","caption":"从台基到屋顶的观察顺序","columns":["部位","看什么","可以回答","不能证明"],"rows":[["台基与柱网","柱列、开间宽度和转角位置","主体框架从哪里开始、空间如何分格","所有墙体都不承重"],["梁与联系构件","跨越或连接柱子的横向构件","各开间怎样横向联系","每根可见木构都是原件"],["斗拱层","柱头或梁枋间的斗、拱及出跳构件","这个节点怎样承接、传递或外挑荷载","所有彩绘构件都承担同样作用"],["檩与椽","沿屋面延伸的支承构件与坡度","屋顶怎样在斗拱以上继续传力","仅靠斗拱就能托住整座屋顶"],["装修与围护","门、窗、隔扇及柱间墙体","使用空间如何被围合","所有围护都与结构无关"],["屋顶与檐口","出檐、翼角、瓦面重量与排水","为何转角和中间开间构造不同","夸张的曲线能精确断代"]]},
    {"id":"position-heading","type":"heading","level":2,"text":"柱头、补间与转角的位置不同，先别只比大小"},
    {"id":"position","type":"paragraph","text":"观察斗拱时先记录位置：是在柱头上、柱间梁枋上，还是在构件改变方向的转角。转角同时处理两个方向的出檐，视觉上往往更密。可以数可见的出跳层次作为描述，但不要据此自行套用专业分级；准确分类还需要时代术语、隐藏节点和测绘信息。现场若有剖面图、修缮图或模型，它们比从立面猜内部构造可靠得多。"},
    {"id":"field-heading","type":"heading","level":2,"text":"十分钟现场观察法"},
    {"id":"workflow","type":"list","ordered":true,"items":["先读说明牌里的始建年代、重要维修、重建情况和参观限制，再谈年代。","退到能拍下台基、柱列、开间和檐口的距离，先记录完整立面。","选一个中间开间，从台基沿一根柱向屋顶追踪，记下每个构件怎样衔接。","在转角重复一次，比较方向、出挑和构件密度的变化。","走近后分清榫接关系、附加彩画、雕刻和明显更换件。","寻找剖面图、模型或能看到背面的展陈，以补足檐下遮挡。","明确记录不确定性：原件、修补、更换、复建、被遮挡或现场未说明。"]},
    {"id":"evidence-heading","type":"heading","level":2,"text":"把肉眼观察、机构说明与解释分开"},
    {"id":"evidence","type":"comparison","title":"三层可信度","columns":[{"heading":"可见事实","items":["某组斗拱位于柱头上","转角有更多交会构件","不同部位彩画颜色或保存状态不同"]},{"heading":"机构证据","items":["说明牌标明某次建造或维修年代","保护展示指出哪些构件被替换","测绘图给出构件名称和关系"]},{"heading":"需要解释","items":["为何选择某种形制","等级或礼制怎样影响设计","某节点在一次历史地震中贡献了多少"]}]},
    {"id":"case-heading","type":"heading","level":2,"text":"把应县木塔当案例，不要当全国模板"},
    {"id":"case","type":"paragraph","text":"应县佛宫寺释迦塔建于1056年，是中国提交的辽代木构建筑世界遗产预备名单组成部分。申报文本描述了八角、多层、内外槽结合且斗拱类型丰富的结构，因此很适合比较不同层次与转角。但这不代表所有中国木构都复制木塔体系；列入预备名单也不等于已成为世界遗产。应把该页面理解为申报国提出的有文件依据的价值论证，把现场理解为一座特殊个案。"},
    {"id":"myths-heading","type":"heading","level":2,"text":"四个常见误读"},
    {"id":"myths","type":"list","items":["“一颗钉子都不用”不足以解释木构。传统榫卯很重要，但现实建筑可能包含铁件、后加固和修补构件。","层数更多不自动等于更早、更强或等级更高；必须结合年代、建筑类型和地方证据。","彩画鲜艳不代表结构更重要；装饰会跨越承重与非承重表面，也可能是后世重绘。","经历地震仍保存不能只归因于斗拱；整体几何、榫卯、材料状态、基础、维护、旧损伤与具体震动都有关。"]},
    {"id":"warning","type":"callout","title":"不要把遗产解读变成安全鉴定","body":"联合国教科文组织说明的是整套木构技艺具有柔性和抗震特点，这可以用来解释系统，却不能证明某一座建筑今天处于安全状态。不要倚靠、攀爬或试探任何构件，即使节点看似触手可及，也要遵守围栏。","tone":"warning"},
    {"id":"fit-heading","type":"heading","level":2,"text":"什么时候适合使用这套方法"},
    {"id":"fit","type":"paragraph","text":"当历史殿堂、木塔、门楼或建筑博物馆能看到多个结构层次，或提供模型时，这套方法最有效。若现代仿古立面把混凝土结构藏在里面，展品大幅复建却没有说明，或现场只能看到屋脊轮廓，就应把注意力放在机构明确标注的内容上，不要从外观倒推看不见的构造。"},
    {"id":"checklist-heading","type":"heading","level":2,"text":"离开前留下五条站得住的记录"},
    {"id":"checklist","type":"list","items":["你观察的建筑、构件和确切站位。","现场注明的建造阶段与维修史。","一条从柱经斗拱到屋顶构件的路径。","中间开间与转角的一处差异。","一个现有可见证据无法回答的问题。"]},
    {"id":"help","type":"callout","title":"Homeground","body":"告诉我们路线中有哪些古建筑，以及你想看懂什么。当地规划人员可以核查当前开放情况，优先安排有剖面模型或清楚说明的场馆，把一个真正有观察价值的木构点放入行程，而不会承诺每个屋檐都提供同样证据。","tone":"decision"},
    {"id":"links","type":"internal-links","title":"继续读懂建筑遗产","items":[{"label":"苏州园林应该怎么看","href":"/zh/guides/how-to-read-a-suzhou-garden/","description":"用游览顺序、框景与借景读园林，而不是只数亭台。"},{"label":"兵马俑自由行指南","href":"/zh/guides/terracotta-warriors-without-tour/","description":"把大型考古遗址的解释和交通安排分开处理。"},{"label":"中国旅行需要导游吗","href":"/zh/guides/do-you-need-a-tour-guide-in-china/","description":"判断哪些地方值得请人讲解，哪些适合自行参观。"}]},
    {"id":"sources","type":"sources","title":"机构来源与图片署名","items":[{"label":"中国传统木结构营造技艺","url":"https://ich.unesco.org/en/RL/chinese-traditional-architectural-craftsmanship-for-timber-framed-structures-00223?RL=00223","publisher":"联合国教科文组织非物质文化遗产","reviewedAt":"2026-08-12"},{"label":"辽代木构建筑世界遗产预备名单页面","url":"https://whc.unesco.org/en/tentativelists/5803/","publisher":"联合国教科文组织世界遗产中心","reviewedAt":"2026-08-12"},{"label":"题图：Gisling 拍摄的佛宫寺木塔转角斗拱，CC BY 3.0；已裁切","url":"https://commons.wikimedia.org/wiki/File:Fogong_temple_corner_dougong.JPG","publisher":"Wikimedia Commons","reviewedAt":"2026-08-12"}]}
  ]
} as const satisfies StructuredPageBody;
export default body;
