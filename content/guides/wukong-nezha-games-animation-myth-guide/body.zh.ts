import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "游戏、动画电影、寺庙神像和博物馆版画都可能出现悟空或哪吒，却未必在讲同一个故事。真正有用的问题，不是“哪个形象才是唯一正宗原版”，而是现代创作者选择了哪部具名文献、哪种宗教语境、表演传统或早期图像，又保留、拼合、省略或新造了什么。这样读，既不需要剧透，也不会把现实信仰中的神祇当成电影角色，或把新游戏误读成古代信仰的纪录片。"
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "先分四层证据，再比较改编",
      "body": "先判断眼前材料属于哪一层：具名文献；有记录的宗教或地方实践；表演或视觉传统；某一部现代作品。记下年代、创作者或实践社群及出现语境，再比较一个母题、人物关系或创作选择。相似之处可以提出问题，却不能单独证明历史传承链、创作者意图或所谓全中国共同信仰。",
      "tone": "decision"
    },
    {
      "id": "layers-heading",
      "type": "heading",
      "level": 2,
      "text": "四层材料都是证据，不是通往“完美原版”的阶梯"
    },
    {
      "id": "layers",
      "type": "table",
      "caption": "给旅途中遇见的材料归类",
      "columns": ["材料层次", "要记录什么", "能支持什么", "不能证明什么"],
      "rows": [
        ["具名文献", "书名、版本或译本、大致年代及引用的具体情节", "某个母题或人物关系见于这个版本", "此前此后的所有传统都遵循它"],
        ["宗教或地方实践", "寺庙、社群、神号、仪式语境及机构当下的说明", "这一场所或社群有记录的实践与解释", "全中国共同信仰，或某个现代造型的出处"],
        ["表演或视觉传统", "剧种、剧团或艺术家、年代、作品与媒介", "某一次创作怎样让人物可见、可演", "一套从古至今从未改变的视觉密码"],
        ["现代游戏或动画", "权利方、作品名、发布版本及一手作品介绍", "这部作品自述的来源与可核验创作选择", "历史准确性、宗教权威或图片再使用许可"]
      ]
    },
    {
      "id": "original-heading",
      "type": "heading",
      "level": 2,
      "text": "为什么不应从“唯一原始神话”开始"
    },
    {
      "id": "original",
      "type": "paragraph",
      "text": "悟空和哪吒并不是从一份古代定稿直接跳进今天的屏幕。有关悟空的研究会沿着叙事、戏曲、电影、连环画和跨国改编追踪其变化；有关哪吒的研究则涉及佛教、道教、民间信仰、文学、戏剧与影视等不同语境。一部具名小说可以是关键文献，却不能抹去它之前、旁边和之后的传统。写作或讲解时应说“在这个版本中”“按这座寺庙的说明”或“在这部影片里”，不要把一项局部证据扩写成含混的“中国神话认为”。"
    },
    {
      "id": "claim-heading",
      "type": "heading",
      "level": 2,
      "text": "来源有多大，结论就写多大"
    },
    {
      "id": "claim-ladder",
      "type": "table",
      "caption": "把主张控制在证据范围内",
      "columns": ["想说明什么", "最低有效证据", "安全写法", "遇到什么应停下"],
      "rows": [
        ["现代作品借鉴某部早期文献", "权利方作品介绍，加上具名早期文献或可靠研究", "“制作方称作品受到……启发”", "只有粉丝对图或外观相似"],
        ["同一母题在版本间变化", "两个具名版本；涉及争议解释时还需学术研究", "“甲版保留了 X，乙版赋予它另一种功能”", "没有直接核对两部作品，只看了剧情摘要"],
        ["某地供奉这位神祇", "与该社群直接相关的寺庙、博物馆或学术记录", "“该机构记录的是……”", "依据只有电影、游戏或文旅口号"],
        ["创作者使用了一座真实建筑", "制作方或机构准确说明这座建筑与作品的关系", "沿用原来源动词：扫描、参考、启发或联动宣传", "想把截图对比升级成制作事实"]
      ]
    },
    {
      "id": "wukong-heading",
      "type": "heading",
      "level": 2,
      "text": "悟空：《西游记》是重要锚点，不是线索终点"
    },
    {
      "id": "wukong",
      "type": "paragraph",
      "text": "十六世纪小说《西游记》是理解孙悟空的重要文学锚点，但 Hongmei Sun 的研究把悟空放进更长的历史和更多媒介中考察。于是，同一人物可以在不同作品里成为机智的反叛者、受约束的取经者、舞台角色或现代主人公，而不必表达同一个立场。游戏科学的发布材料称《黑神话：悟空》受到《西游记》和中国神话启发。这项一手表述能够证明“启发关系”，却不能证明游戏世界、剧情与人物造型就是小说的逐项复原。"
    },
    {
      "id": "wukong-method",
      "type": "list",
      "ordered": true,
      "items": [
        "先说清讨论的是哪个悟空：小说版本、戏曲角色、动画、游戏还是馆藏器物。",
        "只选一个有限特征，例如变化术、兵器、权威关系、约束或取经，再回到该版本核对。",
        "先描述现代作品怎样处理这个特征，再讨论含义；不要把粉丝推论当成创作者意图。",
        "如果措辞来自译本，应写明译本。现代译文同样有版权，也包含译者自己的解释选择。"
      ]
    },
    {
      "id": "nezha-heading",
      "type": "heading",
      "level": 2,
      "text": "哪吒：把神祇、文学人物与动画重构分开"
    },
    {
      "id": "nezha",
      "type": "paragraph",
      "text": "Meir Shahar 的研究从印度与中国宗教史、文学叙事、信仰实践和表演追踪哪吒。《封神演义》因此是极重要的文学版本，却不能让人把所有哪吒信仰都说成小说情节。针对 1979、2019 与 2021 年动画的研究显示，创作者会面对不同时代的观众，重新安排命运、家庭、自我与人物造型。寺庙神号、古籍神像和动画儿童可以共享姓名和部分属性，但它们属于不同制度与作品，承担的意义也不同。"
    },
    {
      "id": "nezha-method",
      "type": "list",
      "ordered": true,
      "items": [
        "在寺庙里，沿用该机构提供的神号和说明，不要拿电影角色名覆盖现实信仰称谓。",
        "在博物馆或古籍中，记录器物或版本、年代、材质、来源和目录解释。",
        "讨论动画时，先锁定具体作品，只比较自己直接核过的剧情或设计选择。",
        "涉及孝道、反叛、家庭与身份的解释，应归给具名研究者，不要把一种读法写成学界共识。"
      ]
    },
    {
      "id": "adaptation-heading",
      "type": "heading",
      "level": 2,
      "text": "不用“忠实度”打分，改用五个动词"
    },
    {
      "id": "adaptation-grid",
      "type": "table",
      "caption": "一张不剧透的改编阅读表",
      "columns": ["动作", "要问的问题", "证据支持的观察", "应避免"],
      "rows": [
        ["保留", "哪些可辨认的母题、关系或器物仍在？", "现代作品留下某项具名属性，却改变了它的戏剧作用", "把“认得出来”当成准确性证明"],
        ["拼合", "是否把不同情节、传统或媒介的元素放到一起？", "作品把原本分别有记录的元素放进一个新段落", "没有来源却编造直接传承链"],
        ["省略", "哪些早期冲突、制度或后果不见了？", "省略改变了新观众被引导关注的重点", "没有证据就说成无知或审查"],
        ["新造", "哪些部分明确属于这次创作？", "新场景或新关系解决的是现代叙事任务", "因为新就判为不敬或错误"],
        ["重心转移", "哪个价值或视角被移到中央？", "熟悉人物开始承载关于家庭、能动性或权威的新问题", "断言所有观众都会接受同一种含义"]
      ]
    },
    {
      "id": "encounter-heading",
      "type": "heading",
      "level": 2,
      "text": "在中国旅行时怎样实际使用"
    },
    {
      "id": "encounters",
      "type": "table",
      "caption": "四种常见相遇场景",
      "columns": ["场景", "先问什么", "记录什么", "不要假设什么"],
      "rows": [
        ["寺庙或仪式空间", "这个社群在此怎样称呼和解释这位神祇？", "机构、神号、地方说明和拍摄规则", "电影能解释现实信仰，或这里是唯一出生地"],
        ["博物馆或历史古籍", "目录准确收录的是什么？", "器物名、年代或时期、已知作者、材质、登录号和策展措辞", "一件器物就是永恒标准造型"],
        ["戏曲、木偶或公共演出", "哪家剧团、哪部作品、哪个角色？", "节目单、剧种、日期和制作处理", "服装细节跨越所有剧种与年代都只有一种含义"],
        ["文旅活动或主题展陈", "谁组织，原文究竟声称哪种关系？", "活动日期、主办方和准确动词", "宣传能证明开发者意图、永久开放或虚构地理"]
      ]
    },
    {
      "id": "real-place",
      "type": "callout",
      "title": "真实地点不等于虚构故事发生地",
      "body": "必须分开四种主张：制作方直接确认扫描或参考某座建筑；政府或目的地机构在限时活动中把景点与作品联动；某地拥有更早的地方信仰或故事关联；网友只发现外观相似。文化和旅游部 2025 年的一篇报道能够确认山西曾开展“跟着悟空游山西”文旅活动，并把多处文物景点纳入宣传。它不能替代开发者制作清单，也不能证明一一复原、当前开放状态或哪吒路线。缺少准确的制作证据和景点管理方最新信息时，不要把地点写进旅行线路。",
      "tone": "warning"
    },
    {
      "id": "rights-heading",
      "type": "heading",
      "level": 2,
      "text": "网上看得到，不等于可以重新发布"
    },
    {
      "id": "rights",
      "type": "callout",
      "title": "没有许可，就不要把现代 IP 画面当作视觉证据",
      "body": "游戏截图、电影剧照、海报、预告片画面、标志、社交平台短片、同人图和拍摄屏幕的照片都可能包含受保护表达。官方网站是事实来源，不会自动附送图片许可。公开发布时，可以改用逐项确认公版或兼容开放许可的历史器物图、单独获得授权的纪实照片，或只依据来源事实制作原创 HTML 对照表。即使素材可用，也应记录署名、许可链接、裁切说明和它能证明到哪一步。",
      "tone": "warning"
    },
    {
      "id": "field-heading",
      "type": "heading",
      "level": 2,
      "text": "五分钟留下一份证据记录"
    },
    {
      "id": "field-record",
      "type": "list",
      "items": [
        "准确作品名、器物名、神号、节目名或活动名",
        "创作者、机构、社群或权利方",
        "年代或时期，以及你在哪里遇见它",
        "一项被保留、拼合、省略、新造或转移重心的元素",
        "哪些是直接证据，哪些属于学者解释或你的观察",
        "公开前确认图片许可、场馆规则和来源链接",
        "补一句“这项证据不能证明什么”"
      ]
    },
    {
      "id": "use-heading",
      "type": "heading",
      "level": 2,
      "text": "这篇指南能回答什么，不能承担什么"
    },
    {
      "id": "use",
      "type": "comparison",
      "title": "让页面保持实用和耐久",
      "columns": [
        {
          "heading": "适合使用",
          "items": [
            "游戏、电影、演出或博物馆参观前的无剧透文化导读",
            "区分具名早期来源与后来的创作选择",
            "为寺庙说明或文旅宣传加上证据边界"
          ]
        },
        {
          "heading": "应另找实时或专门来源",
          "items": [
            "剧情、结局、战斗、平台、发行或票房信息",
            "当前票务、开放时间、交通和场馆准入",
            "完整的《西游记》《封神演义》或中国宗教史"
          ]
        },
        {
          "heading": "应拒绝",
          "items": [
            "“最正宗改编”排行榜",
            "一条全国悟空或哪吒朝圣线路",
            "未经逐项授权重复使用现代角色画面"
          ]
        }
      ]
    },
    {
      "id": "judgment-heading",
      "type": "heading",
      "level": 2,
      "text": "证据支持的结论"
    },
    {
      "id": "judgment",
      "type": "paragraph",
      "text": "悟空和哪吒长久流传，并不要求每个形象下面都藏着一套冻结不变的神话。只要把每项来源和制度说清楚，他们的多重生命反而更容易理解。旅行结束时，如果你能说出自己遇见的是哪个版本，指出一项创作动作，并说明证据不能证明什么，就比追问唯一真脸、唯一原型地或最忠实改编走得更远。"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "本页的文化研究、版权与文旅活动来源最后复核于 2026 年 8 月 13 日，并主动排除了产品新闻和场所实时准入。如果某座博物馆、寺庙、演出或主题线路确实会影响你的行程，请提供准确中文名和日期，我们可以由本地人员核对机构身份、当日开放及原来源所用的关系措辞，再决定是否写进行程。",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "继续阅读活态文化与视觉证据",
      "items": [
        {
          "label": "看懂一场真实英歌舞",
          "href": "/zh/guides/yingge-dance-beyond-the-viral-clips/",
          "description": "把具名地方队伍和节目，与爆款短视频暗示的含义分开。"
        },
        {
          "label": "第一次看泉州提线木偶戏",
          "href": "/zh/guides/quanzhou-string-puppetry-first-audience/",
          "description": "沿着手、线、偶身与声音观看，不把一个技术数字当成整项传统。"
        },
        {
          "label": "读懂中国木构建筑",
          "href": "/zh/guides/dougong-and-chinese-timber-frame-reading/",
          "description": "先区分可见结构、文献记录与不确定性，再把相似外观写成建筑主张。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "学术、官方与版权来源",
      "items": [
        {
          "label": "《Transforming Monkey：一部中国史诗的改编与再现》",
          "url": "https://uwapress.uw.edu/book/9780295743196/transforming-monkey/",
          "publisher": "华盛顿大学出版社",
          "reviewedAt": "2026-08-13"
        },
        {
          "label": "《Transforming Monkey》学术书评",
          "url": "https://www.cambridge.org/core/journals/journal-of-asian-studies/article/transforming-monkey-adaptation-and-representation-of-a-chinese-epic-by-hongmei-sun-seattle-university-of-washington-press-2018-ix-219-pp-isbn-9780295743196-paper-also-available-in-cloth-and-as-ebook/2291EA63524DED5F0E9F0EB0142C3747",
          "publisher": "《亚洲研究期刊》／剑桥大学出版社",
          "reviewedAt": "2026-08-13"
        },
        {
          "label": "《Oedipal God：The Chinese Nezha and His Indian Origins》",
          "url": "https://www.jstor.org/stable/j.ctvvn6rd",
          "publisher": "夏威夷大学出版社／JSTOR",
          "reviewedAt": "2026-08-13"
        },
        {
          "label": "1979—2019 年中国动画中哪吒形象的转变",
          "url": "https://www.nature.com/articles/s41599-024-02802-2",
          "publisher": "Humanities and Social Sciences Communications",
          "reviewedAt": "2026-08-13"
        },
        {
          "label": "《The Demon Child and His Modern Fate》",
          "url": "https://journals.sagepub.com/doi/10.1177/17468477221114365",
          "publisher": "Animation／SAGE Journals",
          "reviewedAt": "2026-08-13"
        },
        {
          "label": "《黑神话：悟空》发布材料",
          "url": "https://www.businesswire.com/news/home/20240820013974/en/Embark-on-a-Journey-to-the-West-Like-Never-Before-in-Black-Myth-Wukong-Available-Today-on-PC-and-PlayStation",
          "publisher": "游戏科学经 Business Wire 发布",
          "reviewedAt": "2026-08-13"
        },
        {
          "label": "山西“悟空”主题文旅活动的日期化报道",
          "url": "https://www.mct.gov.cn/wlbphone/wlbydd/xxfb/qglb/sx/202501/t20250113_957810.html",
          "publisher": "中华人民共和国文化和旅游部",
          "reviewedAt": "2026-08-13"
        },
        {
          "label": "屋岛岳亭《猴王（孙悟空）》，约 1824 年",
          "url": "https://www.metmuseum.org/art/collection/search/54818",
          "publisher": "大都会艺术博物馆",
          "reviewedAt": "2026-08-13"
        },
        {
          "label": "首图所用 CC0 1.0 公有领域声明",
          "url": "https://creativecommons.org/publicdomain/zero/1.0/",
          "publisher": "Creative Commons",
          "reviewedAt": "2026-08-13"
        },
        {
          "label": "版权常见问题：受保护作品、许可与授权",
          "url": "https://www.wipo.int/en/web/copyright/faq-copyright",
          "publisher": "世界知识产权组织",
          "reviewedAt": "2026-08-13"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
