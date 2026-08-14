import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "小石林里的阿诗玛石，让同一根石柱同时面对两个问题。地质学要解释碳酸盐岩如何经由裂隙与溶蚀，形成眼前的形态；撒尼彝族口述传统、整理文本、1964年电影和景区命名，则解释人们为何会从中看见阿诗玛。这两种阅读并不互相排斥，却不能互相充当证据：传说不能解释喀斯特，人形轮廓也不能证明阿诗玛是有文献可考的历史人物。比较稳妥的看法，是先在石柱更密集的大石林读懂岩石，再到小石林检验视角、故事和命名如何共同造就一处文化地标。",
    },
    {
      id: "evidence-layers-heading",
      type: "heading",
      level: 2,
      text: "寻找阿诗玛之前，先分清四类证据",
    },
    {
      id: "evidence-layers",
      type: "table",
      caption: "不能混成一层的四类证据",
      columns: ["层次", "它能够证明什么", "它不能证明什么"],
      rows: [
        [
          "地质与物质证据",
          "石柱的物质组成、裂隙、溶蚀和形体演化。",
          "不能把一根石柱认定为某个人，也不能证实一个故事确实发生过。",
        ],
        [
          "活态口述传统",
          "阿诗玛属于撒尼彝族的叙事传统，并以讲述、吟诵和演唱等方式流传，存在不同版本。",
          "它不是能证明某一位可辨识历史女性的户籍或民政记录。",
        ],
        [
          "整理文学与电影",
          "整理者和电影创作者作出的选择，使阿诗玛的形象传播到石林以外。",
          "一份印刷文本或一部电影的情节不能代表所有口传版本。",
        ],
        [
          "旅游呈现",
          "名称、标牌、雕塑和展陈说明今天的景区如何呈现阿诗玛。",
          "现代命名或演出不能证明地质成因，也不能证明传统从未变化。",
        ],
      ],
    },
    {
      id: "two-readings",
      type: "callout",
      title: "两种读法都要保留，但不能让一方替另一方作证",
      body:
        "石柱作为物质实体真实存在，它与阿诗玛之间的文化联系，也真实存在于故事传播和形象辨认的历史中。错误在于宣称传说造出了喀斯特，或反过来以岩石相似的轮廓证明传说曾按字面发生。Homeground的规划判断是：带着两个问题到现场，并把两套答案分开，反而更容易看懂石林。",
      tone: "decision",
    },
    {
      id: "geology-heading",
      type: "heading",
      level: 2,
      text: "石林由什么塑造，又不是由什么塑造？",
    },
    {
      id: "geology-explanation",
      type: "paragraph",
      text:
        "最容易理解的顺序是物质、构造和水。UNESCO的说明指出，这里的碳酸盐岩沉积于浅海环境，后来抬升并经历了长期风化与溶蚀。石林运营机构的地质说明进一步解释，裂隙如何分割岩体，水又如何沿裂隙继续溶蚀，在漫长、多阶段的过程中扩大岩体之间的分隔，由此形成石柱、溶沟、裂隙和空隙。这套解释并不能为阿诗玛石的具体轮廓指定一个诞生日，也不能完整复原这一根石柱的独立演化史。“姑娘变成石头”属于叙事，不属于物理成因。",
    },
    {
      id: "geology-onsite",
      type: "paragraph",
      text:
        "进入大石林后，先不要急着追逐有名字的造型。观察反复出现的特征：把整块岩体分开的垂直节理、被加深的沟槽、近于水平的层理，以及改变相邻石柱视觉尺度的缝隙。先看一个较宽的整体，再从公共步道允许的位置近看。多块岩石重复出现的构造，比某一块像人或动物的轮廓更能说明地质过程。",
    },
    {
      id: "geology-observation",
      type: "list",
      items: [
        "把一组密集石柱与一根相对孤立的石柱作比较，想一想哪些物质被溶解、哪些间隔被扩大了。",
        "在步道上观察边缘、溶沟和裂隙；比起剪影，表面纹理往往更能帮助理解溶蚀。",
        "如果现场有当期可读的地质解说牌，先核对它给出的证据，再回头看岩石。身份或称号标志只说明地点属性，并不解释形成过程。",
      ],
    },
    {
      id: "major-stone-forest-figure",
      type: "figure",
      src: "/images/guides/shilin-ashima-landscape-story/major-stone-forest-karst-1400.webp",
      alt: "云南石林景区的石灰岩石柱、树木与公共步道。",
      width: 1400,
      height: 1050,
      caption:
        "这幅石林广角有助于比较石柱间距、形态与公共步道尺度，却不能证明故事创造了岩石。",
    },
    {
      id: "unesco-boundary-warning",
      type: "callout",
      title: "不要擅自放大UNESCO称号的范围",
      body:
        "石林世界地质公园提供的是整体地质框架。“中国南方喀斯特”世界遗产则是另一个由多处组成、边界已经制图的系列遗产，其中石林范围内的组成部分包括乃古石林和所各邑。不能因此假定每一处有名字的岩石——尤其是阿诗玛石——都单独属于世界遗产组成部分。",
      tone: "warning",
    },
    {
      id: "geopark-sign-figure",
      type: "figure",
      src: "/images/guides/shilin-ashima-landscape-story/geopark-designation-sign-1400.webp",
      alt: "石林景区内的国家地质公园和国家级风景名胜区认定标志。",
      width: 1400,
      height: 1050,
      caption:
        "这是认定标志，不是解释岩石形成过程的地质牌。阅读每一枚官方标志时，只把它对应到实际标明的身份。",
    },
    {
      id: "oral-tradition-heading",
      type: "heading",
      level: 2,
      text: "如果阿诗玛不是有文献可考的历史人物，她是谁？",
    },
    {
      id: "oral-tradition-explanation",
      type: "paragraph",
      text:
        "国家级非物质文化遗产项目资料把《阿诗玛》认定为撒尼人的叙事传统；撒尼是与石林密切相关的彝族支系。这一传统以撒尼语创作，并通过口头讲述和演唱传承。人们熟悉的讲法通常让名叫阿诗玛的年轻女性面对强迫婚姻和有权势的对手，离别、营救未果、失去，以及化身或回声等母题可以组织故事。但这份轮廓只是入口，并不是唯一获得授权的剧本。人物关系、情节、结局和表演语境都可能不同。",
    },
    {
      id: "oral-tradition-meaning",
      type: "paragraph",
      text:
        "口述传统并不是一本残缺、只等最后定稿的书。讲述者、社群、语言、场合和听众都可能改变叙述重点。研究者还讨论了现代整理之前，口头讲述与毕摩经书之间的互动。非遗认定关注的是仍在延续的传统；它不会把某一个情节转化成目击式传记，也不能据此证明撒尼人在当地居住了某个精确年数。",
    },
    {
      id: "oral-tradition-caution",
      type: "callout",
      title: "说“一个版本”，不要说“唯一原版故事”",
      body:
        "如果标牌、导游或展陈只给出一套情节，应把它当作该处正在呈现的版本。它可以很有用，资料也可能整理得很认真，但这并不取消其他讲法。可以追问：解释由谁制作，概括的是哪一种媒介，文字是否承认版本差异。",
      tone: "neutral",
    },
    {
      id: "ashima-script-figure",
      type: "figure",
      src: "/images/guides/shilin-ashima-landscape-story/ashima-sani-script-1400.webp",
      alt: "用撒尼彝文书写的“阿诗玛”之名。",
      width: 1400,
      height: 438,
      caption:
        "撒尼彝文名称提示了一段远比最知名的汉语情节和电影形象更宽广的传承史。",
    },
    {
      id: "ashima-manuscript-figure",
      type: "figure",
      src: "/images/guides/shilin-ashima-landscape-story/ashima-manuscript-display-1050.webp",
      alt: "云南民族博物馆展柜中标注为《阿诗玛的故事》、来源石林县的彝文典籍。",
      width: 1050,
      height: 1400,
      caption:
        "2011年的展签把左侧文献标为石林县彝文典籍《阿诗玛的故事》。它显示阿诗玛传统进入文字记录和博物馆呈现的一层，并不证明这是原稿、唯一权威版本，也不保证该件目前仍在展。照片：Daderot / Wikimedia Commons，公有领域；经缩放并转换为WebP。",
    },
    {
      id: "adaptation-heading",
      type: "heading",
      level: 2,
      text: "整理诗本和电影为什么会讲出不同的故事？",
    },
    {
      id: "adaptation-explanation",
      type: "paragraph",
      text:
        "《阿诗玛》的汉语搜集和整理出版始于20世纪50年代初。印刷扩大了传播范围，但取舍、排序、翻译和编辑本身就是介入，并不是把每一种地方异文原样录下。1964年电影又进行了一次改编。一项学术比较记录了一个重大变化：其抽样的代表性口传文本和整理文本把阿黑写作阿诗玛的哥哥，电影则把他改成恋人。香港电影资料馆的节目资料可独立确认1964年影片信息及银幕爱情情节。同一项研究也显示，具有代表性的口传、整理和电影形态之间存在不同结局。",
    },
    {
      id: "adaptation-meaning",
      type: "paragraph",
      text:
        "电影仍然十分重要：它让阿诗玛广为人知，也加强了这个人物与云南景观之间的联结。但影响力不等于历史上的优先地位。在石林，如果记忆中的爱情关系、服装或化身来自电影或后来的旅游呈现，就应明确标出这一层，不要倒推成唯一的撒尼讲法。这篇指南既不需要电影截图，也没有取得使用电影画面的授权。",
    },
    {
      id: "adaptation-test",
      type: "comparison",
      title: "检验标牌或展陈的两个快速问题",
      columns: [
        {
          heading: "当它在介绍口述传统",
          body:
            "问清它概括的是谁的版本或哪一种表演语境，使用什么语言或文本形态，以及措辞是否承认存在异文。",
        },
        {
          heading: "当它在介绍电影",
          body:
            "除非另有来源能独立证明某个细节属于特定撒尼版本，否则应把爱情关系、服装、歌曲编排、场景和结局理解为电影创作选择。",
        },
      ],
    },
    {
      id: "ashima-rock-heading",
      type: "heading",
      level: 2,
      text: "到了阿诗玛石，究竟该怎么看？",
    },
    {
      id: "ashima-rock-explanation",
      type: "paragraph",
      text:
        "景区机构把阿诗玛石的位置标在小石林。它是天然岩体，不是人工雕像。辨认它依赖公共步道上的有利观看角度：站在一个位置，上部轮廓可能让人联想到侧脸、头饰、身体姿态和背负物；换一个位置，它又会变回众多岩石之间形态不规则的一根石柱。这种变化不是景点“失效”，反而揭示了辨认机制——地质形态、观看角度、被提示的名字，以及观看者心中已有的故事共同发挥作用。",
    },
    {
      id: "ashima-looking-method",
      type: "list",
      ordered: true,
      items: [
        "先站在允许通行的步道上，把整根石柱连同相邻岩体、植被和空隙一起看。",
        "比较两个安全视角，找出人形轮廓最清楚的位置。",
        "把眼睛看到的部分与名称提供的意义分开。“侧脸”“肩部”或“姿态”可以是观察；“这就是阿诗玛”则是文化辨认。",
        "查看当期标牌究竟在讲地质、故事、改编，还是只提供一个景观名称。",
        "拍特写之前先留下一张带环境的照片，以免后来把这处天然岩体误认成人工雕刻的纪念物。",
      ],
    },
    {
      id: "ashima-rock-figure",
      type: "figure",
      src: "/images/guides/shilin-ashima-landscape-story/ashima-rock-portrait-1200.webp",
      alt: "从小石林公共步道的有利观看角度所见阿诗玛石及周围石柱。",
      width: 803,
      height: 1200,
      caption:
        "有利角度让轮廓更容易辨认，却不会把石柱变成人工雕刻，也不会让叙事成为地质解释。",
    },
    {
      id: "viewing-angle-warning",
      type: "callout",
      title: "“有利观看角度”不能证明现场设有标定点",
      body:
        "两张已获再利用许可的实拍照片显示，人形轮廓会在某些位置更容易辨认；但它们都不能证明现场目前设有官方标定点。应遵循现场路线和围栏。图片说明或替代文本应写“从公共步道的有利观看角度所见”，而不是“从标示观看角度所见”。",
      tone: "warning",
    },
    {
      id: "field-route-heading",
      type: "heading",
      level: 2,
      text: "从大石林到小石林的一套现场阅读顺序",
    },
    {
      id: "field-route-intro",
      type: "paragraph",
      text:
        "下面是一套理解顺序，不是入口地图。即使当期路线、关闭情况或工作人员指引改变了次序，或让某个预定观察无法完成，也应以现场安排为准。目的在于带着物质证据抵达阿诗玛石，而不是先找人形剪影，再把每一块岩石都变成故事角色。对大多数游客来说，不额外安排博物馆、表演或长篇讲解，也能完成这项观察。",
    },
    {
      id: "field-route",
      type: "list",
      ordered: true,
      items: [
        "在大石林选择一组石柱，在阅读景观名称之前先看节理、溶沟、空隙和尺度。用自己的话复述过程：碳酸盐岩、断裂、水、溶蚀、分隔。",
        "如果有地质解说牌就加以利用。把形成过程说明与方向标志、身份认定分开；只有当期规则允许时才拍摄和翻译。",
        "在阿诗玛以外另选一处有名字的岩体，从两个角度比较。先让“命名如何发生”变得可见，再去看最熟悉的故事形象。",
        "进入小石林后，把岩体间距、背景和视线与较密集的大石林作比较，不要只下结论说哪一处更美。",
        "在阿诗玛石前使用上面的观看方法，对周围地质环境和人物侧影给予同等注意。",
        "如果确认有文化展陈当时开放，检查它是否把口述传统、整理文本、电影和旅游呈现分开。可以记下混用的措辞，但不要自行把它改写成历史事实。",
      ],
    },
    {
      id: "route-limit",
      type: "callout",
      title: "即使没有展览或表演，这条阅读路线也必须成立",
      body:
        "UNESCO当前资料提到世界地质公园博物馆内设有阿诗玛非遗展厅，却没有提供可用于当期出行的地址、开放时间或进入条件。不要围绕这处可选场馆安排当天行程。岩体、观看角度和对标牌措辞的细读，已经足以承担核心任务。",
      tone: "warning",
    },
    {
      id: "sani-embroidery-figure",
      type: "figure",
      src: "/images/guides/shilin-ashima-landscape-story/shilin-sani-embroidery-1400.webp",
      alt: "在石林县拍摄的一件撒尼刺绣织物细节。",
      width: 1400,
      height: 1053,
      caption:
        "这件拍摄地点明确的石林撒尼刺绣不能代表所有制作者、年代或用途，也不能证明故事中的某段情节。",
    },
    {
      id: "traveler-choice-heading",
      type: "heading",
      level: 2,
      text: "哪些人适合为故事多留时间，哪些人可以简略了解？",
    },
    {
      id: "traveler-choice",
      type: "comparison",
      columns: [
        {
          heading: "你主要为地质而来",
          body:
            "把大石林放在优先位置，再用阿诗玛石检验人们如何为地貌命名。理解文化层不需要看一场表演，也不需要记住冗长的情节梗概。",
        },
        {
          heading: "你看过电影，或关注口述传统",
          body:
            "多花一些时间读标牌和展陈措辞。逐项追问它属于撒尼口传、20世纪整理文本、1964年电影，还是今天的景区呈现。",
        },
        {
          heading: "你的时间、体力或行动能力有限",
          body:
            "与其收集每一处命名岩体，不如保留一组地质比较和阿诗玛观看点。无障碍或省力路线应向运营方确认当期状况；本文不承诺全程无台阶。",
        },
      ],
    },
    {
      id: "traveler-scenarios",
      type: "paragraph",
      text:
        "家庭游客可以把“找人脸”变成有用的观察游戏：先说轮廓让人联想到什么，再找一条需要用地质解释的裂缝或溶沟。熟悉电影的游客可以记下一组印象深刻的人物关系或结局，再看现场文字把它归为电影、整理文本还是口传。只想快速拍照的人可以缩短这项练习；期待获得经证实的个人传记或保证有演出的人，则需要先调整预期。",
    },
    {
      id: "misunderstanding-heading",
      type: "heading",
      level: 2,
      text: "哪些事不要想当然、摆拍或随意拍摄？",
    },
    {
      id: "misunderstandings",
      type: "list",
      items: [
        "不要把阿诗玛写成已经得到独立证据证实的历史人物；应称她为撒尼彝族口述传统中的人物。",
        "不要用洪水或化身等情节解释喀斯特。",
        "不要把某一份印刷文本或电影里的人物关系说成唯一的口传版本。",
        "不要把服装、纪念品、雕塑或游客演出当成撒尼生活的完整记录。",
        "不要为了照片攀爬、触摸岩体或离开参观路线；遵守当期告示。",
        "不要假定公开演出就允许拍摄人物或录像；应先获得同意，并尊重限制拍摄的语境。",
      ],
    },
    {
      id: "respect-callout",
      type: "callout",
      title: "理解文化，不等于获得拍摄许可",
      body:
        "知道阿诗玛属于活态文化遗产，并不意味着社群成员、表演者或文化物件可以随意充当摄影道具。无法确认个人同意或发表权利时，优先拍摄景观、标牌和获准公开的展陈。不要请别人为解释照片摆出仪式动作，也不要让对方扮演“阿诗玛”。",
      tone: "warning",
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "展馆、演出或观看点没有按预想实现怎么办？",
    },
    {
      id: "failure-recovery",
      type: "table",
      caption: "条件改变时，仍然保留核心理解任务",
      columns: ["问题", "替代办法"],
      rows: [
        [
          "某个有名称的展陈空间关闭，或无法确信它到底是哪一处。",
          "不要拿名称相近的展馆替代。把注意力放回岩体、标牌措辞和观看角度。",
        ],
        [
          "当天没有演出。",
          "核心任务并未失败。比较非遗项目资料、景观命名和现代呈现即可。",
        ],
        [
          "有利观看位置很拥挤。",
          "在狭窄人流之外等候，或先用另一处岩体检验角度和命名。只有路线允许时再回来。",
        ],
        [
          "雨、雾或平淡的光线让人形轮廓不清楚。",
          "改看裂隙、溶沟和相邻岩体，不要为了更清楚的轮廓离开步道。",
        ],
        [
          "某条路线或某片区域临时关闭。",
          "采用官方替代路线。成功的标准是保留证据分层，而不是抵达所有预设点位。",
        ],
      ],
    },
    {
      id: "final-checklist",
      type: "list",
      items: [
        "我能否不借助传说，把石柱的地质形成讲清楚？",
        "我能否描述阿诗玛，同时不声称她有已经证实的历史传记？",
        "我是否知道一个细节来自口述传统、整理文学、电影，还是旅游呈现？",
        "我是否比较了不止一个安全观看角度，并保留岩体周边环境？",
        "我是否向运营方核对了当期路线、可选展陈和现场规则，而不是只依靠这篇常青型文化解读？",
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "继续安排云南与景观阅读",
      items: [
        {
          label: "把昆明和石林放进更完整的云南路线",
          href: "/zh/guides/kunming-dali-lijiang-shangri-la-route-order/",
          description:
            "判断这一文化观察点适合放在路线的哪一段，同时不把本文变成从车站到景区入口的交通指南。",
        },
        {
          label: "比较中国另一类喀斯特地貌",
          href: "/zh/guides/china-tiankeng-sinkholes-explained/",
          description:
            "为天坑建立另一套观察证据，不把巨型塌陷漏斗与石林峰丛当成同一种地貌。",
        },
        {
          label: "在另一处云南景观中保留对活态文化的关注",
          href: "/zh/guides/yuanyang-rice-terraces-viewpoint-and-village-route/",
          description:
            "用元阳指南平衡观景点选择、农业遗产与居民空间，不把当地人当成风景的一部分。",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "官方、遗产、学术及图片来源（2026年8月14日复核）",
      items: [
        {
          label: "石林世界地质公园——地质与当前机构说明",
          url: "https://www.unesco.org/en/iggp/shilin-unesco-global-geopark",
          publisher: "联合国教科文组织（UNESCO）",
          reviewedAt: "2026-08-14",
        },
        {
          label: "中国南方喀斯特——系列世界遗产及其制图组成部分",
          url: "https://whc.unesco.org/en/list/1248",
          publisher: "联合国教科文组织世界遗产中心",
          reviewedAt: "2026-08-14",
        },
        {
          label: "阿诗玛——国家级非物质文化遗产项目资料",
          url: "https://www.ihchina.cn/project_details/12241.html",
          publisher: "中国非物质文化遗产网·中国非物质文化遗产数字博物馆",
          reviewedAt: "2026-08-14",
        },
        {
          label: "《阿诗玛》的传承与文本形态",
          url: "https://www.cssn.cn/wx/wx_mzwx/202208/t20220802_5443066.shtml",
          publisher: "中国社会科学网",
          reviewedAt: "2026-08-14",
        },
        {
          label: "阿诗玛传统的表演语境与版本差异",
          url: "https://chinafolklore.org/web/?NewsID=4176",
          publisher: "中国民俗学会",
          reviewedAt: "2026-08-14",
        },
        {
          label: "阿诗玛口传、整理和电影版本比较",
          url: "https://xb.ynau.edu.cn/jwk_sk/cn/article/pdf/preview/10.3969/j.issn.1004-390X%28s%29.2018.01.018.pdf",
          publisher: "《云南农业大学学报（社会科学）》",
          reviewedAt: "2026-08-14",
        },
        {
          label: "《阿诗玛》（1964）——电影资料馆影片资料",
          url: "https://www.filmarchive.gov.hk/en/web/hkfa/2025/sh/pe-event-2025-sh-fs-film01.html",
          publisher: "香港电影资料馆",
          reviewedAt: "2026-08-14",
        },
        {
          label: "大石林与小石林——当前面向游客的景观说明",
          url: "https://shilingeopark.com/public/park/en-US/detail-447-28203.html",
          publisher: "石林世界地质公园",
          reviewedAt: "2026-08-14",
        },
        {
          label: "石林的形成——裂隙、溶蚀与多阶段演化",
          url: "https://www.chinastoneforest.com/public/protal/zh-CHS/detail-67-31433.html",
          publisher: "石林旅游官方机构",
          reviewedAt: "2026-08-14",
        },
        {
          label: "阿诗玛石主图：LHOON，CC BY-SA 2.0；经裁切并转换为WebP",
          url: "https://commons.wikimedia.org/wiki/File:Ashima_rock_2.jpg",
          publisher: "维基共享资源",
          reviewedAt: "2026-08-14",
        },
        {
          label: "石林广角实景：Ngguls，CC BY-SA 4.0；经缩放并转换为WebP",
          url: "https://commons.wikimedia.org/wiki/File:20260222_Stone_Forest,_Shilin_01.jpg",
          publisher: "维基共享资源",
          reviewedAt: "2026-08-14",
        },
        {
          label: "石林国家地质公园与国家级风景名胜区标识碑：Ngguls，CC BY-SA 4.0；经缩放并转换为WebP",
          url: "https://commons.wikimedia.org/wiki/File:20260222_Yunnan_Stone_Forest_Scenic_Area_National_Geological_Park.jpg",
          publisher: "维基共享资源",
          reviewedAt: "2026-08-14",
        },
        {
          label: "撒尼彝文“阿诗玛”：瑞丽江的河水，CC BY-SA 4.0；经缩放并转换为WebP",
          url: "https://commons.wikimedia.org/wiki/File:%E9%98%BF%E8%AF%97%E7%8E%9B%E5%BD%9D%E6%96%87.png",
          publisher: "维基共享资源",
          reviewedAt: "2026-08-14",
        },
        {
          label: "阿诗玛石竖幅实景：Cs california，CC BY 3.0；经缩放并转换为WebP",
          url: "https://commons.wikimedia.org/wiki/File:Ashima_tourist_attraction.JPG",
          publisher: "维基共享资源",
          reviewedAt: "2026-08-14",
        },
        {
          label: "石林撒尼刺绣：瑞丽江的河水，CC BY-SA 4.0；经裁切并转换为WebP",
          url: "https://commons.wikimedia.org/wiki/File:%E7%9F%B3%E6%9E%97%E6%92%92%E5%B0%BC%E5%88%BA%E7%BB%A3.jpg",
          publisher: "维基共享资源",
          reviewedAt: "2026-08-14",
        },
        {
          label: "彝文《阿诗玛的故事》展陈：Daderot，公有领域；经缩放并转换为WebP",
          url: "https://commons.wikimedia.org/wiki/File:Manuscripts_in_the_Yunnan_Nationalities_Museum_-_DSC03920.JPG",
          publisher: "维基共享资源",
          reviewedAt: "2026-08-14",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
