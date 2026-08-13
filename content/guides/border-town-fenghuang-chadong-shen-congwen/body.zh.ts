import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "如果你想借一个现实地点理解沈从文的《边城》，茶峒是更适合文学地理阅读的选择；这只是 Homeground 的编辑判断，不等于今天的茶峒完整复制了小说。想看作者出生地、受保护的故居和后来的纪念文化，应选凤凰。只有当你愿意比较“小说如何从地方生成”和“作者后来如何被故乡纪念”时，才有必要两地都去。这个区分很重要：学术研究把小说主要的渡口空间联系到茶峒附近的碧溪岨（Bìxījū），凤凰则属于沈从文的生平与作品接受史。两地都不是从书中原封不动保存下来的实景片场。"
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "直接结论",
      body: "只能去一处、重点是小说：选茶峒。只能去一处、重点是沈从文生平：选凤凰。时间和注意力都足够，愿意看解说牌、河流关系和现代复建：两地都去。不要因为去凤凰，就预设它“就是《边城》原型”。",
      tone: "decision"
    },
    {
      id: "answer-heading",
      type: "heading",
      level: 2,
      text: "应该选茶峒、凤凰，还是两地都去？"
    },
    {
      id: "choice-matrix",
      type: "comparison",
      title: "先确定你带着什么问题到现场",
      columns: [
        {
          heading: "茶峒",
          body: "适合想看边界、河流、渡口和码头怎样组织小说空间的读者。重点是比较地理关系，而不是寻找书中每一件事物的现实对应。"
        },
        {
          heading: "凤凰",
          body: "适合想了解沈从文在哪里成长、故居怎样受到保护、城市后来怎样纪念他的读者。巷道与沱江是作者故乡背景，不是小说的逐点地图。"
        },
        {
          heading: "两地",
          body: "适合比较创作与纪念：先在茶峒对照小说的河流地理，再在凤凰阅读沈从文的生平和公共记忆。两次参观要保留不同问题。"
        }
      ]
    },
    {
      id: "choice-caution",
      type: "paragraph",
      text: "不应只按“还剩几个小时”来选。即使当天没有渡船或演出，愿意对照文本、地形和标牌的读者仍能从茶峒得到东西。凤凰的作者遗产更集中，但成熟的旅游商业也最容易让人误以为所有古色古香的街巷都属于《边城》。如果尚未读过小说，先了解翠翠、渡船家庭和边地小镇的基本关系，会让茶峒更容易看懂；这些梗概仍不能把现实小镇变成小说的证据。"
    },
    {
      id: "chadong-heading",
      type: "heading",
      level: 2,
      text: "为什么小说更指向茶峒，却又不是茶峒地图？"
    },
    {
      id: "chadong-literary-geography",
      type: "paragraph",
      text: "最关键的纠正很细小，却会改变整次参观。吉首大学发表的研究指出，小说的主要行动空间并不等同于茶峒镇街道，而是围绕碧溪岨展开；论文把它描述为茶峒河上游支流旁的石山。茶峒仍是重要的邻近城镇与地理参照，但文学空间经过作者选择和重组。本文将“碧溪岨”读作 Bìxījū，与论文使用的英文拼写 Bixiju 以及“岨”的 jū 读音相一致。这里把碧溪岨作为文学空间名称使用，不承诺它是今天已有官方标牌和准确定位的景点。"
    },
    {
      id: "fiction-transformation",
      type: "paragraph",
      text: "小说可以压缩路线、移动视角，也可以让一个渡口承担整片边地的情感重量；这不是地图画错，而是文学创作。《边城》把过河、等待、亲缘和未能按时抵达组织在一起。因此到现场应问：现实地形能否帮助自己理解这些关系？不要让一间现代店铺替人物“作证”，也不要因为景点叫“翠翠居”，就认定历史上真有一位翠翠住在那里。人物和情节属于文学，即使它们与沈从文熟悉的地方有紧密联系。"
    },
    {
      id: "rename-context",
      type: "callout",
      title: "改名能说明作品影响，却不能证明原型",
      body: "原名茶峒的行政建制镇在 2005 年改名为边城镇。这说明当地在现代公共叙事中与小说建立了强烈联系，却不能证明今天的行政边界、街道和景点与文学空间完全重合。",
      tone: "neutral"
    },
    {
      id: "fenghuang-heading",
      type: "heading",
      level: 2,
      text: "凤凰为什么仍是沈从文读者的重要地点？"
    },
    {
      id: "fenghuang-biography",
      type: "paragraph",
      text: "凤凰的核心关系属于生平和纪念。湖南省档案部门的沈从文生平资料记载，他于 1902 年出生在凤凰；湖南省文物部门将沈从文故居列为清代建筑，并收入第六批全国重点文物保护单位。由此可以确认，凤凰与作者的童年环境以及后来保护其记忆的行动有文献关系。它不能把小说中的渡口、翠翠或碧溪岨搬到凤凰。"
    },
    {
      id: "former-residence-figure",
      type: "figure",
      src: "/images/guides/border-town-fenghuang-chadong-shen-congwen/shen-congwen-former-residence-1600.webp",
      alt: "凤凰沈从文故居沿街入口，可见故居匾额和游客提示牌。",
      width: 1600,
      height: 1186,
      caption: "入口可以确认场所身份；进入后仍要用保护牌和房间说明区分历史构件与后来展陈、家具。"
    },
    {
      id: "fenghuang-rooftops-figure",
      type: "figure",
      src: "/images/guides/border-town-fenghuang-chadong-shen-congwen/fenghuang-rooftops-1600.webp",
      alt: "凤凰沱江边的屋顶、临水建筑和水车。",
      width: 1600,
      height: 1067,
      caption: "沱江沿岸可以帮助理解沈从文的故乡环境，但不能逐景对应《边城》。"
    },
    {
      id: "former-home-boundary",
      type: "paragraph",
      text: "进入故居后，应把建筑与摆进建筑的内容分开。全国重点文物保护单位身份能够支持这处历史建筑的年代与价值，却不能证明每根梁木、每件生活器具、每张照片和每个展柜都来自沈从文童年。建议依次看三类信息：官方保护牌、房间或修缮说明、展品标签。标签若写明复制、修复、复原或展陈装置，就保留这个限定；若没有具体干预记录，只描述眼前所见，不自行给构件断代。"
    },
    {
      id: "layers-heading",
      type: "heading",
      level: 2,
      text: "眼前属于历史、文学、旅游呈现，还是编辑判断？"
    },
    {
      id: "layers-table",
      type: "table",
      caption: "四个不能混在一起的层次",
      columns: ["层次", "可以放进这一层的内容", "不能据此证明"],
      rows: [
        ["历史", "沈从文有文献依据的凤凰出生地；受保护故居；有机构资料和日期的码头或题字", "小说人物曾住在这里，或眼前所有构件都是原物"],
        ["文学", "碧溪岨、翠翠、渡船家庭，以及小说重新组织的边地景观", "准确 GPS 点、真实历史居民或完整城镇规划"],
        ["旅游呈现", "人物主题复建空间、演出、标识、改名及景区讲述", "20 世纪 30 年代生活的直接证据，或作者唯一意图"],
        ["编辑判断", "Homeground 建议文学地理读者优先茶峒、生平读者优先凤凰", "学界共识，或官方对两地作出的高低排名"]
      ]
    },
    {
      id: "guangtian-figure",
      type: "figure",
      src: "/images/guides/border-town-fenghuang-chadong-shen-congwen/jiangtian-plaza-1600.webp",
      alt: "凤凰古城内写有“江天广场”的现代商业入口。",
      width: 1600,
      height: 1067,
      caption: "历史城市的参观动线也穿过现代商业空间；仿古外观本身不是年代说明。"
    },
    {
      id: "layer-method",
      type: "paragraph",
      text: "现场最快的判断方法，是先问“谁在提出这个说法”。文物保护牌可以确认保护身份；博物馆标签可以识别物件或说明展览；旅游部门资料可以证明目的地今天怎样讲述自己；小说创造意义，却不能鉴定建筑材料。Homeground 可以帮助读者做选择，但编辑建议必须明确标成编辑建议。当一座旧码头旁边出现人物主题复建屋时，不要把两者平均成一句“很真实”，而应分别记录它们属于哪一层。"
    },
    {
      id: "read-chadong-heading",
      type: "heading",
      level: 2,
      text: "到茶峒后，应该按什么顺序阅读现场？"
    },
    {
      id: "chadong-sequence",
      type: "list",
      ordered: true,
      items: [
        "先找导览图或官方地名牌。在寻找故事标识之前，确认清水江以及湘、渝、黔交界区域。现实中的边界关系，比一个主题拍照点更能帮助理解小说。",
        "再到清水江东岸的茶峒古码头。湖南文旅部门把它描述为约 100 平方米、铺有石阶的民国时期渡运设施，新中国成立后继续维护，并具有文物保护身份；它是物质遗存，不自动等于小说中的那个渡口。",
        "找一个能同时看见河岸、下水石阶和过河距离的位置。想一想渡船怎样决定谁抵达、谁等待、谁掌握通行。即使当天没有船运行，码头和河流几何关系仍足以支持这种阅读。",
        "走入老街时，对每栋建筑分别判断。聚落有历史纵深，不代表一段概括性的古镇介绍能够替每一面墙、每一根木构和每间店铺定年；优先看单体标牌。",
        "把翠翠主题空间当作解释。湖南省政府 2024 年发布的资料明确把翠翠居称为模拟小说场景的复建空间。它能说明旅游业怎样把人物变成可进入的场景，却不能让翠翠成为历史人物。",
        "把题字当成有日期的物件来读。2026 年安装在边城镇入口的题字，是依据沈从文 1981 年真迹制作的授权复制；崖壁上的红色“边城 沈从文”则由当地书法家龙清廉于 1993 年仿写。两处表面都不是沈从文原笔留下的原物。"
      ]
    },
    {
      id: "chadong-dynamic-warning",
      type: "callout",
      title: "不要把未核实的渡船或演出当作行程支点",
      body: "本文核对到的稳定官方资料，无法证明茶峒每天固定运行某班游客渡船，也无法确认长期不变的票价和演出时刻。出发当天应再看镇区或运营方通知。若不能过河，仍可用受保护的古码头、两岸关系、导览牌和复建标签完成文学阅读。",
      tone: "warning"
    },
    {
      id: "read-fenghuang-heading",
      type: "heading",
      level: 2,
      text: "在凤凰，怎样把它读成“作者之城”？"
    },
    {
      id: "fenghuang-sequence",
      type: "list",
      ordered: true,
      items: [
        "从沈从文故居开始，而不是从泛泛的“边城”招牌开始。确认保护牌，再分辨哪些是建筑构件、哪些是展览、哪些物件附有来源说明。",
        "用院落关系和居住尺度理解家庭与早年环境，但不要把所有摆设都当作生平遗物。物件与历史判断之间，需要一张可靠标签来连接。",
        "把周围巷道当作作者故乡背景。观察街宽、院落关系以及走向沱江的变化；除非有官方或学术依据，不要把巷道随意命名为小说情节现场。",
        "到沱江和虹桥时，留意长期城市地理与高度经营的游客景观如何叠在一起。两者都真实存在，但都不能证明小说渡口位于这里。",
        "若时间、兴趣和现场开放允许，可把沱江边的沈从文墓地或纪念空间作为收尾。档案生平资料支持这里作为纪念地点；它不是理解故居的必需环节，更不是小说场景。"
      ]
    },
    {
      id: "stepping-stones-figure",
      type: "figure",
      src: "/images/guides/border-town-fenghuang-chadong-shen-congwen/tuojiang-stepping-stones-1126.webp",
      alt: "游客从凤凰而非茶峒的沱江跳岩上过河，后方是沿江建筑。",
      width: 1126,
      height: 819,
      caption: "这里是凤凰沱江，不是茶峒；一处适合拍照的过河点也不是小说渡口的证据。"
    },
    {
      id: "grave-figure",
      type: "figure",
      src: "/images/guides/border-town-fenghuang-chadong-shen-congwen/shen-congwen-grave-1200.webp",
      alt: "凤凰县沈从文墓地的石质纪念物。",
      width: 1200,
      height: 1600,
      caption: "墓地属于沈从文后来的纪念地理，不属于《边城》的虚构世界。"
    },
    {
      id: "material-heading",
      type: "heading",
      level: 2,
      text: "哪些是遗存、维护过的设施或后来新造的场景？"
    },
    {
      id: "material-status-table",
      type: "table",
      caption: "只使用现有证据支持的最窄定义",
      columns: ["地点或物件", "可以确认的状态", "不要称为"],
      rows: [
        ["凤凰沈从文故居", "清代建筑、全国重点文物保护单位，处于持续保护管理中", "每一处材料和家具都未经改变的原宅"],
        ["茶峒古码头", "有保护身份的民国时期渡口、码头及石阶，新中国成立后有维护记录", "已被最终确认的小说渡口"],
        ["茶峒老街", "具有历史聚落背景，但单栋建筑需依据自己的标牌判断", "整体原封不动保存的 20 世纪 30 年代街区"],
        ["茶峒旅游呈现中的翠翠居", "为模拟小说空间而复建的场景", "翠翠的真实住宅或幸存原建筑"],
        ["2026 年安装的边城镇入口题字", "依据沈从文 1981 年真迹制作的现代授权复制", "书法原件或年代久远的城门题字"],
        ["崖壁红色题字", "当地书法家龙清廉 1993 年仿写", "沈从文亲自在崖壁书写的文字"],
        ["凤凰沱江、虹桥和巷道", "沈从文故乡及当代游客景观的真实组成", "经过认证的《边城》平面图"]
      ]
    },
    {
      id: "status-note",
      type: "paragraph",
      text: "“受保护”并不等于“全部原状”。保护可能包含修理、更换、加固和新解说。反过来，现代复建也不是毫无价值：它可以显示后来的读者怎样想象小说。真正负责任的问题，不是“看上去够不够古老”，而是物件属于哪一层、标签有没有记录材料史。允许拍摄时，应把发布机构、日期在内的完整标签拍下来，而不是只留一张好看的局部。"
    },
    {
      id: "routes-heading",
      type: "heading",
      level: 2,
      text: "时间或开放情况改变时，怎样安排仍然成立？"
    },
    {
      id: "route-scenarios",
      type: "comparison",
      title: "三条可执行的阅读路线",
      columns: [
        {
          heading: "文学优先，只去一地",
          items: [
            "选择茶峒。",
            "先定位边界与河流关系。",
            "先读古码头，再看人物主题空间。",
            "最后比较复建和不同年代的题字。"
          ]
        },
        {
          heading: "作者优先，只去一地",
          items: [
            "选择凤凰。",
            "从故居及其标签开始。",
            "沿巷道走向沱江、虹桥，把它们作为故乡背景。",
            "只有在开放和兴趣都合适时，才加入墓地。"
          ]
        },
        {
          heading: "两地比较",
          items: [
            "为两地各保留一个阅读问题。",
            "在茶峒看文学地理和旅游复建。",
            "在凤凰看作者生平、受保护遗产和纪念。",
            "不要把两地压缩成一张匆忙打卡清单。"
          ]
        }
      ]
    },
    {
      id: "recovery-list",
      type: "list",
      items: [
        "故居关闭时，先读外部保护信息，再使用文物或博物馆官方资料；不要根据旧游记推断今天能进入室内。",
        "限制摄影时，记下机构、物件名称和标签日期。不能拍照，不会降低一条被正确记录的展签作为证据的价值。",
        "茶峒渡船未运行时，比较固定的码头、两岸和过河方向；不要坐一条无关游船，再把它称为文学渡船。",
        "主题标识与文物牌发生冲突时，两种说法都记录下来，但判断历史状态时优先采用文物或学术来源。",
        "建筑没有年代或修缮标签时，只称它为今天镇上的建筑，不自行判断为原构、修复或复建。",
        "无法确认开放、票务或演出时，把动线改成外部空间优先，并在当天向直接运营方核实。"
      ]
    },
    {
      id: "choose-heading",
      type: "heading",
      level: 2,
      text: "适合谁、谁可以跳过，出发前还要核实什么？"
    },
    {
      id: "fit-list",
      type: "list",
      items: [
        "读过小说，想看的主要是景观、边界和渡口关系，而不是常规作家博物馆：选茶峒。",
        "更关心沈从文生平、受保护故居和纪念文化，而不是定位小说河流结构：选凤凰。",
        "希望理解一部作品的地理想象与作者后来的公共记忆为什么不同：两地都去。",
        "若主要需要交通、住宿或普通古镇行程，可以跳过额外的文学绕行；这些任务应由 Homeground 现有目的地指南处理。",
        "出发前只向直接运营方复核会变化的事项：故居能否进入、摄影规则、渡船是否运行、是否有演出。即使这些项目取消，也应保留一条仍能完成的基础路线。"
      ]
    },
    {
      id: "dont-mistake",
      type: "callout",
      title: "不要把“有关联”写成“完全相同”",
      body: "凤凰不能直接等同于“《边城》原型”。茶峒也不是按建筑逐一保存的小说。碧溪岨不等于一个保证能找到的现代景点定位。复建的翠翠居不是历史住宅，复制或仿写的题字也不是原件。守住这些区分，不会削弱两地，反而会让现场更值得读。",
      tone: "warning"
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续安排湘西旅行",
      items: [
        {
          label: "张家界住市区还是武陵源",
          href: "/zh/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          description: "把张家界住宿基地的选择单独处理，不把本文扩写成湘西区域行程。"
        },
        {
          label: "在湖南点一顿均衡的第一餐",
          href: "/zh/guides/hunan-cuisine-balanced-first-meal/",
          description: "从文学地理继续进入一个可执行的地方饮食选择。"
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "资料与图片署名复核至 2026 年 8 月 14 日",
      items: [
        {"label": "沈从文生平", "url": "https://sdaj.hunan.gov.cn/sdaj/wszt/xxsl/xxrw/200609/t20060928_1977903.html", "publisher": "湖南省档案馆", "reviewedAt": "2026-08-13"},
        {"label": "全国重点文物保护单位中的沈从文故居", "url": "https://wwj.hunan.gov.cn/wwj/c100314/201406/t20140613_10483053.html", "publisher": "湖南省文物局", "reviewedAt": "2026-08-13"},
        {"label": "2025 年沈从文故居保护检查", "url": "https://wwj.hunan.gov.cn/wwj/c100310/c100311/202505/t20250530_33687539.html", "publisher": "湖南省文物局", "reviewedAt": "2026-08-13"},
        {"label": "《边城》文学地理的“三位一体”观", "url": "https://skxb.jsu.edu.cn/CN/Y2010/V31/I1/50", "publisher": "吉首大学学报", "reviewedAt": "2026-08-13"},
        {"label": "茶峒古镇的空间生产", "url": "https://skxb.jsu.edu.cn/CN/Y2021/V42/I5/124", "publisher": "吉首大学学报", "reviewedAt": "2026-08-13"},
        {"label": "茶峒古码头", "url": "https://whhlyt.hunan.gov.cn/whhlyt/RedTourism/202206/t20220607_25264271.html", "publisher": "湖南省文化和旅游厅", "reviewedAt": "2026-08-13"},
        {"label": "茶峒旅游呈现与复建翠翠居", "url": "https://www.hunan.gov.cn/hnszf/hnyw/szdt/202410/t20241006_33468999.html", "publisher": "湖南省人民政府", "reviewedAt": "2026-08-13"},
        {"label": "2026 年入口题字与 1993 年崖壁题字来源", "url": "https://www.hunan.gov.cn/hnszf/hnyw/szdt/202605/t20260502_33969228.html", "publisher": "湖南省人民政府", "reviewedAt": "2026-08-13"},
        {"label": "茶峒、边城地名沿革", "url": "https://mzt.hunan.gov.cn/mzt/sxdmx/202005/t20200513_12118025.html", "publisher": "湖南省民政厅", "reviewedAt": "2026-08-13"},
        {"label": "2025 年景区运营与一次惠民演出的日期快照", "url": "https://whhlyt.hunan.gov.cn/whhlyt/cyfz/cyxm/202507/t20250711_33736998.html", "publisher": "湖南省文化和旅游厅", "reviewedAt": "2026-08-14"},
        {"label": "“岨”字标准读音表", "url": "https://language.moe.gov.tw/001/Upload/Files/wxiao89/a.pdf", "publisher": "台湾教育主管部门语言文字资料", "reviewedAt": "2026-08-13"},
        {"label": "首图：xiquinhosilva 拍摄凤凰虹桥；已裁切，CC BY 4.0", "url": "https://commons.wikimedia.org/wiki/File:%E5%87%A4%E5%87%B0%E5%8F%A4%E5%9F%8E_2024-06-22_18.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "正文图：Kurgenera 拍摄沈从文故居入口；已缩放，CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:%E6%B2%88%E4%BB%8E%E6%96%87%E6%95%85%E5%B1%85.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "正文图：xiquinhosilva 拍摄凤凰沱江屋顶；已缩放，CC BY 4.0", "url": "https://commons.wikimedia.org/wiki/File:%E5%87%A4%E5%87%B0%E5%8F%A4%E5%9F%8E_2024-06-22_01.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "正文图：xiquinhosilva 拍摄江天广场入口；已缩放，CC BY 4.0", "url": "https://commons.wikimedia.org/wiki/File:%E5%87%A4%E5%87%B0%E5%8F%A4%E5%9F%8E_2024-06-22_11.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "正文图：于回拍摄沱江跳岩；按原尺寸转制，CC BY-SA 2.0", "url": "https://commons.wikimedia.org/wiki/File:Fenghuang_Ancient_Town.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "正文图：Zhangmoon618 拍摄沈从文墓；已缩放，作者贡献至公有领域", "url": "https://commons.wikimedia.org/wiki/File:Shen_Congwen_Grave_in_Fenghuang_County.JPG", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "CC BY 4.0 许可", "url": "https://creativecommons.org/licenses/by/4.0/", "publisher": "Creative Commons", "reviewedAt": "2026-08-14"},
        {"label": "CC BY-SA 4.0 许可", "url": "https://creativecommons.org/licenses/by-sa/4.0/", "publisher": "Creative Commons", "reviewedAt": "2026-08-14"},
        {"label": "CC BY-SA 2.0 许可", "url": "https://creativecommons.org/licenses/by-sa/2.0/", "publisher": "Creative Commons", "reviewedAt": "2026-08-14"}
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
