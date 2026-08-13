import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "中国并不存在一种可以代表全国的“茶乡”。杭州龙井的茶园紧靠大城市，手工炒制能解释绿茶如何形成；武夷的坑涧、岩体、村落茶园与反复焙火共同解释乌龙茶；普洱景迈山的古茶林、防护林和村寨组成文化景观；安化则要把茶园、黑茶作坊、紧压茶和运输路径连起来看。真正有用的问题不是“哪里的茶最好”，而是你想看懂哪一种关系。",
    },
    {
      id: "direct-answer",
      type: "callout",
      tone: "decision",
      title: "先选景观，再选茶席",
      body: "想从杭州轻松完成第一次茶产地参观，选龙井；更看重地形与较长加工链，选武夷；想读懂森林、村寨与土地利用，选景迈；对紧压黑茶、作坊和贸易路径感兴趣，选安化。无论去哪，都不能保证当天有采摘、生产或可信演示；出发前须核对具体茶园或生产者、活动和进入规则。",
    },
    { id: "choice-heading", type: "heading", level: 2, text: "四个地区，回答四个不同问题" },
    {
      id: "choice-table",
      type: "table",
      caption: "按现场能看见的关系选择，而不是给名茶排名",
      columns: ["地区", "景观最适合解释什么", "最值得确认的现场内容", "不能想当然"],
      rows: [
        ["杭州龙井", "西湖以西丘陵、生产村落与城市如何相接", "真实生产中的鲜叶分拣与手工炒制", "店里所有“龙井”都是西湖龙井，或春季每天都有生产"],
        ["福建武夷", "坡向、坑涧、岩体、茶园位置与加工如何相连", "萎凋、做青与后续焙火之间的关系", "世界遗产认证茶叶，或短体验等于完整工艺"],
        ["云南普洱景迈山", "古茶林、防护林、村寨和社区规则如何组成系统", "茶林垂直层次及其与村落的关系", "所有普洱都来自景迈，或“古树”足以证明产品来源"],
        ["湖南安化", "种植、加工、紧压、储存和运输如何形成产品", "千两茶装篓、踩压，或有记录的厂区与茶路解说", "安化黑茶等于普洱茶，或仿古建筑都是真遗存"],
      ],
    },
    { id: "longjing-heading", type: "heading", level: 2, text: "龙井：最清楚的城市—茶园过渡" },
    {
      id: "longjing-landscape",
      type: "paragraph",
      text: "龙井最容易纳入普通的杭州初次行程。从密集城区到丘陵、茶园和生产村落，可以在同一天完成。这种接近本身就是证据：这里不是与城市隔绝的种植园，而是长期与西湖、寺院、城市消费者和来访者相连的生产区域。应观察街巷、村落、坡地茶园与城市如何衔接，而不能把任何绿色山坡都当作特定产地证明。",
    },
    {
      id: "longjing-work",
      type: "paragraph",
      text: "现场真正值得看的是嫩叶如何在炒制中受热、受压并定形，而不是一套泡茶仪式。机构资料记录了摊放以及不止一次加热、整形的过程，但公开资料对细分步骤的归纳并不完全相同。应问清眼前是哪一步、鲜叶来自哪里、是在制作可销售的一批茶，还是用练习材料演示。春季生产受品种、海拔与天气影响，茶农不会为了游客保证开工。",
    },
    { id: "wuyi-heading", type: "heading", level: 2, text: "武夷：把山场和焙火放在同一条线上" },
    {
      id: "wuyi-landscape",
      type: "paragraph",
      text: "武夷的视觉逻辑不同。武夷山世界遗产包含生态、景观、考古和思想史等多重价值，并不是茶叶品质证书。茶要放回丹霞岩体、坑涧、水系、森林、村落和茶园位置中理解。身份明确的茶园能说明地方关系；只有一张壮观岩壁照片，不能证明杯中茶叶的来源。",
    },
    {
      id: "wuyi-work",
      type: "paragraph",
      text: "国家级非遗资料把萎凋、反复做青、炒制、揉捻和焙火描述为相互关联的乌龙茶工序，制茶者还须根据鲜叶和天气调整判断。摇几分钟竹筛只能认识一个动作，不能代表完整制作。最好把身份明确的茶园与能够解释前后工序的加工空间连起来；当天没有焙火，可比较毛茶、成品或查看有日期的工序记录。",
    },
    { id: "jingmai-heading", type: "heading", level: 2, text: "景迈：把茶读成森林、村寨与治理系统" },
    {
      id: "jingmai-system",
      type: "paragraph",
      text: "普洱是一个很大的产区，景迈山只是其中一个边界明确的世界遗产文化景观。联合国教科文组织把古茶林、分隔防护林、传统村寨和茶园记录为相互连接的要素。茶树生长在较高林冠之下，而不是整齐暴露的单一作物；布朗族、傣族社区的知识、规则与信仰也是景观的一部分。粮农组织另从垂直植被、生物多样性与过度利用风险进行交叉说明。",
    },
    {
      id: "jingmai-boundary",
      type: "paragraph",
      text: "先在遗产地图上分清森林、古茶林、村寨和较新茶园，再观察林冠、茶树层、地被、道路与聚落。铭牌可以证明所在位置，却不能替无关商家出售的茶饼背书；“古树茶”也不是完整溯源。文献中属于特定景迈社区的信仰不能扩写成云南或中国人的共同信仰。进入生产茶林、拍摄居民或记录仪式前，应先取得许可。",
    },
    { id: "anhua-heading", type: "heading", level: 2, text: "安化：沿着茶从山里变成可运输产品的路径阅读" },
    {
      id: "anhua-chain",
      type: "paragraph",
      text: "安化最适合按生产链来读：茶园提供原料，初制形成黑毛茶，后续工序制成千两茶等产品，紧压与储存又把产品连接到茶厂、商号、集市、山路和旧码头。中国农业文化遗产资料把生产和运输遗存放进同一系统，但这不等于当前允许参观，也不能证明每座仿古建筑的年代。",
    },
    {
      id: "anhua-work",
      type: "paragraph",
      text: "国家级非遗记录区分黑毛茶初制与后续筛分、拼配、软化、装篓、踩压或紧压、扎箍、锁口、冷却和较长时间干燥。游客通常只能看到其中一段，要问原料是否在当地初制、眼前是哪一步、成品前还需完成什么。安化不能被简化成“另一种普洱”：二者的原料、产品、工艺史与景观不同，也不应附加保健功效或“古道从未改变”之类说法。",
    },
    { id: "sequence-heading", type: "heading", level: 2, text: "到任何茶乡，都按同一顺序核验" },
    {
      id: "sequence",
      type: "list",
      ordered: true,
      items: [
        "地图：确认具体产区或遗产边界，城市名本身不够精确。",
        "茶树：只有生产者或铭牌说明时才记录品种，同时观察遮阴、坡度、株距与周边植被。",
        "工序：说出眼前的具体步骤，问清前后环节，并分清生产与演示。",
        "茶杯：把味道当作某位生产者的一批茶，不要概括成整个地区的标准味。",
        "标签：购买前记录生产者、产品名、年份或季节、产地说明与批次信息。",
      ],
    },
    {
      id: "sales-recovery",
      type: "callout",
      tone: "warning",
      title: "如果参观突然变成纯销售",
      body: "回到五步核验，追问茶园身份与具体工序。答不上来时，仍可把品饮当作招待，但不要把销售话术当作溯源证据。靠近遗产地的一杯茶，不会自动获得遗产产地证明。",
    },
    { id: "scenarios-heading", type: "heading", level: 2, text: "两种合理的第一次选择" },
    {
      id: "scenarios",
      type: "comparison",
      title: "让旅行任务决定产地",
      columns: [
        { heading: "杭州多出一天", body: "选龙井，看紧凑的城市—茶园变化。提前确认一家机构或生产者，并保留西湖或博物馆作为不生产时的备选。即使不买茶，这一天也应成立。" },
        { heading: "专门做茶文化旅行", body: "不要匆忙集齐四地，而应选两个反差大的系统。武夷加景迈比较精细加工与森林土地利用；龙井加安化比较近城绿茶与紧压黑茶、运输设施。" },
      ],
    },
    { id: "recognition-heading", type: "heading", level: 2, text: "官方名录能说明什么，也不能说明什么" },
    {
      id: "recognition",
      type: "paragraph",
      text: "联合国教科文组织的中国茶项目确认种植、采摘、加工、饮用与分享是一套活态知识，却不会认证每家体验课。景迈的世界遗产身份属于完整文化景观；武夷山的世界遗产价值也远不止茶。农业文化遗产和非遗记录能够确认系统与技艺，不能替零售产品排名。一次好的参观，应让你把可见景观与一个明确工序相连，并说清哪些内容仍未核实。",
    },
    {
      id: "help",
      type: "callout",
      tone: "neutral",
      title: "需要核对当期可访问的茶乡体验？",
      body: "把路线、月份以及更看重景观、工艺还是品饮告诉 Homeground，真人策划者可复核当期机构或生产者，同时避免把整天变成强制购物。采摘、演示、进入规则与价格于 2026 年 8 月 13 日复核，仍须按旅行日期再次确认。",
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续规划路线与饮食文化",
      items: [
        { label: "规划一条中国地方饮食路线", href: "/zh/guides/china-regional-food-route/", description: "判断茶乡是否值得在整段旅程中占据更大的角色。" },
        { label: "理解广州早茶怎么运作", href: "/zh/guides/how-guangzhou-morning-tea-works/", description: "从茶叶生产景观转向城市里的饮茶与共享饮食方式。" },
        { label: "安排上海、苏州、杭州与南京的顺序", href: "/zh/guides/shanghai-suzhou-hangzhou-nanjing-route-order/", description: "把龙井参观放进现实的江南行程。" },
        { label: "从天气与饮食读懂二十四节气", href: "/zh/guides/china-24-solar-terms-weather-food-daily-life/", description: "理解另一套季节知识，但不要把它当成全国固定天气表。" },
        { label: "跟着云南咖啡从鲜果走到杯中", href: "/zh/guides/yunnan-coffee-from-cherry-to-cup/", description: "比较一种较新的作物与加工景观，同时保留茶与咖啡各自的历史。" },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "官方与机构来源",
      items: [
        { label: "中国传统制茶技艺及其相关习俗", url: "https://ich.unesco.org/en/RL/traditional-tea-processing-techniques-and-associated-social-practices-in-china-01884?RL=01884", publisher: "联合国教科文组织非物质文化遗产", reviewedAt: "2026-08-13" },
        { label: "普洱景迈山古茶林文化景观", url: "https://whc.unesco.org/en/list/1665/", publisher: "联合国教科文组织世界遗产中心", reviewedAt: "2026-08-13" },
        { label: "普洱传统茶农业系统", url: "https://www.fao.org/giahs/giahs-around-the-world/china-puer-traditional-tea-agrosystem/en", publisher: "联合国粮农组织全球重要农业文化遗产", reviewedAt: "2026-08-13" },
        { label: "武夷山世界遗产", url: "https://whc.unesco.org/en/list/911/", publisher: "联合国教科文组织世界遗产中心", reviewedAt: "2026-08-13" },
        { label: "西湖龙井茶文化系统——农业部认定名录", url: "https://www.moa.gov.cn/nybgb/2014/dliuq/201712/P020220424745802769272.pdf", publisher: "中华人民共和国农业部", reviewedAt: "2026-08-13" },
        { label: "绿茶制作技艺（西湖龙井）", url: "https://www.ihchina.cn/project_details/14605.html", publisher: "中国非物质文化遗产网", reviewedAt: "2026-08-13" },
        { label: "武夷岩茶制作技艺", url: "https://www.ihchina.cn/art/detail/id/14373.html", publisher: "中国非物质文化遗产网", reviewedAt: "2026-08-13" },
        { label: "武夷传统村落茶文化景观", url: "https://zjt.fujian.gov.cn/xxgk/gzdt/bmdt/202607/t20260715_7178552.htm", publisher: "福建省住房和城乡建设厅", reviewedAt: "2026-08-13" },
        { label: "安化黑茶文化系统——农业农村部预备名录通知", url: "https://www.agri.cn/zx/hxgg/202501/t20250124_8708188.htm", publisher: "中华人民共和国农业农村部", reviewedAt: "2026-08-13" },
        { label: "安化渠江茶园的村落、茶园与古道遗存", url: "https://wwj.hunan.gov.cn/c100310/c100311/202007/t20200727_13078842.html", publisher: "湖南省文物局", reviewedAt: "2026-08-13" },
        { label: "千两茶制作技艺", url: "https://www.ihchina.cn/project_details/14624.html", publisher: "中国非物质文化遗产网", reviewedAt: "2026-08-13" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
