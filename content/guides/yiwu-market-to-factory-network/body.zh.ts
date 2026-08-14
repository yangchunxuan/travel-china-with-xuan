import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {schemaVersion:"1.0.0",blocks:[
  {id:"lead",type:"lead",text:"义乌常被概括成庞大的批发市场，接着又被简化成“商位直连工厂”。真正重要的是网络：密集商品展示、贸易知识、近处或外地的制造、集货、物流、翻译、金融和数字服务共同工作。一个商位可能属于制造商、工厂的销售公司、贸易公司或其他中介。负责任的访问应追问产品怎样经过这套系统，而不是寻找所谓“最佳供应商”。"},
  {id:"answer",type:"callout",title:"直接答案",body:"进场前只选一个产品类别，并向市场运营方或有人值守的官方服务点确认当天所在楼栋和楼层；不要默认缓存目录仍然有效。然后沿一条证据链观察：陈列 → 经营主体 → 生产声明 → 样品或过程证据 → 物流路径。本文只说明应调查什么，不证明任何经营者的实际网络，也不推荐供应商、不替人尽调或保证批发结果。",tone:"decision"},
  {id:"chain-heading",type:"heading",level:2,text:"市场到工厂的链条可能有多个主体"},
  {id:"chain",type:"table",caption:"一个陈列商品背后可能出现的角色",columns:["节点","可能承担什么","要找的证据","常见错误捷径"],rows:[
    ["市场商位","陈列产品、讨论规格、接收询盘。","注册企业名称、目录、发票或合同主体。","陈列规模大就证明自有工厂。"],
    ["贸易公司","组合产品、语言、单证、质量协调或出口服务。","清楚的法律交易方，以及自营和外包边界。","中介一定欺骗或完全没有价值。"],
    ["制造商或作坊","生产全部或部分产品，也可能服务多个销售公司。","匹配的经营范围、地址、工艺记录、产能证据，必要时授权参访。","一段工厂视频证明卖家拥有现场。"],
    ["集货与物流服务","收货、包装、仓储，并衔接国内或国际运输。","仓库名称、交接记录、货责和书面路线条款。","“义乌发货”是一种统一标准服务。"],
    ["市场与数字服务层","提供目录、贸易支持、支付、翻译或线上匹配。","当前官方服务点和书面服务边界。","服务机构为交易对手的表现担保。"]
  ]},
  {id:"city-heading",type:"heading",level:2,text:"义乌是一座协调城市，不是一栋楼"},
  {id:"city",type:"paragraph",text:"官方市场体系由多个大型区块和商品分类构成，新的数字贸易设施又增加一层。铁路站、城区市场、仓库、物流园和工厂并不在一片步行园区里。生产可能在义乌，也可能在金华、浙江其他地方甚至外省。市场优势不能证明每道工序都在本地；它的价值是让碎片化的产品和服务可搜索、可比较、可流动。"},
  {id:"scope-heading",type:"heading",level:2,text:"入场前先定义学习范围"},
  {id:"scope",type:"comparison",title:"两种正当访问方式",columns:[
    {heading:"好奇的普通旅行者",items:["问题: 全球小商品城市怎样组织品类与流动？","方法: 一个品类、公共通道、官方解释与城市物流语境。","边界: 不要假装下单来占用经营者时间。"]},
    {heading:"专业买家或研究者",items:["问题: 一个明确产品由哪些主体承担交易和生产环节？","方法: 预约、法律主体、书面规格、样品与独立尽调。","边界: 不要把城市编辑指南当成采购、法律、质量或合规意见。"]}
  ]},
  {id:"prepare-heading",type:"heading",level:2,text:"准备一个产品问题"},
  {id:"prepare",type:"list",items:["选足够窄的产品类别，例如“纽扣”而非“时尚”、“台灯”而非“电子产品”。这是观察工具，不是采购推荐。","向市场运营方或有人值守的官方服务点确认当天区块和楼层。网络目录或旧楼层图只能作为线索，不能证明今天的位置。","写下三个中性问题：这家企业做什么、这件商品在哪里生产、哪些步骤由别处完成？","确认后再保存准确市场建筑和入口中文名，庞大市场不能只靠一个总目的地地图点。","设定时间上限和出口。看清一个品类比奔跑多个区更有信息。","若确有商务交流，提前安排翻译和预约，不在入口临时招募不明身份的协助者。"]},
  {id:"field-heading",type:"heading",level:2,text:"两小时公共现场路线"},
  {id:"field",type:"list",items:["从有人值守的官方信息或服务点开始，请对方确认当天品类位置。","第一遍不驻足，观察商品怎样分组、样品怎样陈列、附近有哪些服务。","第二遍比较同品类三个商位：产品深度、定制语言和各自声明的经营角色。","拍商品、人物、价目表或名片前先获同意；公共通道不等于商业信息可任意发布。","把一笔假设订单追到商位之外：样品、生产、检验、集货、国内移动与出口交接；所有未核联系都标成“声明”。","离开市场后从合法公共位置观察一个交通或物流接口，不经授权不进入仓库和装卸区。","把运营方确认、经营者声明和自己的解释分栏记录。"]},
  {id:"evidence-heading",type:"heading",level:2,text:"“厂家”声明需要证据阶梯"},
  {id:"evidence",type:"table",caption:"从弱信号到较强核验",columns:["证据层级","能够说明","不能说明"],rows:[
    ["招牌、目录或口头说法","企业怎样展示自己。","所有权、产能、劳动条件或当前生产。"],
    ["工商登记和匹配的合同主体","谁是法律交易方，以及登记范围和地址。","全部生产都在该地址或符合特定标准。"],
    ["近期工艺、样品和追溯记录","规格与生产之间有合理联系。","不核来源即可形成独立确认。"],
    ["授权工厂访问加文件","访问日确有该物理现场和工序。","未来表现、独占所有权或核验范围外的合规。"],
    ["独立审计或专业尽调","针对明确质量、法律或社会标准的证据。","普遍保证或为全部产品背书。"]
  ]},
  {id:"conversation-heading",type:"heading",level:2,text:"不索取商业秘密也能看清网络的问题"},
  {id:"conversation",type:"list",items:["法律卖方是商位企业、另一家贸易公司，还是制造商？","哪些工序由本组织完成，哪些外包？","这件商品的工厂地址是否固定，能否预约核验？","下单后样品、模具和规格分别归谁？","在哪里检验，谁记录不合格？","在哪里集货，货物责任何时转移？","哪些声明能用书面材料支持？不要索取保密客户名单或拍摄屏幕。"]},
  {id:"scenarios-heading",type:"heading",level:2,text:"两类旅客会用同一条通道做不同的事"},
  {id:"scenarios",type:"comparison",title:"观察与商业核验",columns:[
    {heading:"只有半天的设计学生",items:["有效结果: 理解品类、陈列和聚集怎样降低搜索成本。","证据: 官方区位图、现场笔记和获准照片。","停止规则: 观察开始重复或干扰交易就离开。"]},
    {heading:"已有明确产品的小企业经营者",items:["有效结果: 列出可能的交易对手和仍需完成的核验工作。","证据: 法律名称、书面规格、样品和独立检查的文件。","停止规则: 不能因为城市指南解释了网络就付款或承诺。"]}
  ]},
  {id:"ethics-heading",type:"heading",level:2,text:"商业与社会边界"},
  {id:"ethics",type:"list",items:["诚实说明自己是在观察、研究还是考虑商务。","不公布个人联系方式，也不制造 Homeground 背书印象。","不凭短暂访问给供应商排名，不把未经核实的销售说法当事实转述。","工厂的劳动、安全和环境状况需要专业证据，整洁展厅不是替代指标。","接受样品或礼物不等于获得员工、生产过程或文件的拍摄许可。","合同、海关、产品安全、制裁、知识产权、税务和合规问题使用合资格专业人士。"]},
  {id:"failure-heading",type:"heading",level:2,text:"当网络无法确认时"},
  {id:"failure",type:"table",caption:"当网络无法确认",columns:["问题","恢复动作","编辑结论"],rows:[
    ["品类搬迁或区块关闭","请市场运营方或有人值守的官方服务点确认；只有相邻品类能回答同一问题时才替换。","记录确认日期与来源，不发布过时楼层指引。"],
    ["经营者不说明角色","礼貌结束并转向下一家，不推断欺骗。","角色仍然未知。"],
    ["现场立即邀请参观工厂","接受前核实接待方、地址、授权、交通和目的；普通旅行者可以拒绝。","邀请不能证明所有权或安全。"],
    ["物流解释彼此冲突","列清每一方责任，获取书面条款或独立专业意见。","不把一家说法写成“义乌物流就是这样”。"]
  ]},
  {id:"verify-heading",type:"heading",level:2,text:"最终核验清单"},
  {id:"verify",type:"list",items:["市场运营方或有人值守的服务点确认当天区块、品类与公众准入","准确中文入口与现实可行的离场时间","所有被引用企业自述的角色","法律主体与品牌、商位名分开","生产地点在独立核实前注明为声明","每张近景商品或文件照片已获许可","没有供应商排名、获客承诺或暗示背书","任何真实交易另做专业尽调"]},
  {id:"help",type:"callout",title:"想理解义乌，而不是把旅行变成追销？",body:"告诉 Homeground 你关心哪种产品系统或城市问题。真人规划师可以帮助安排尊重经营秩序的市场访问、普通交通，并判断哪里需要专业翻译，但不会推荐供应商或保证商业结果。",tone:"neutral"},
  {id:"links",type:"internal-links",title:"准备更完整的旅程",items:[
    {label:"第一次坐中国高铁",href:"/zh/guides/china-high-speed-train-first-time-guide/",description:"先处理车站和乘车步骤，再专注义乌市场空间。"},
    {label:"安排上海—杭州交通",href:"/zh/guides/shanghai-hangzhou-transport-route/",description:"理解长三角交通，但不要默认义乌只是上海一日游。"},
    {label:"理解中国地图坐标偏移",href:"/zh/guides/china-map-coordinate-offset-explained/",description:"保存市场入口和产业地址时避免地图点错位。"},
    {label:"看懂洋山自动化港口如何转运集装箱",href:"/zh/guides/yangshan-automated-port-explained/",description:"从市场—工厂关系继续理解边界清楚的港口系统，不把一座码头当成完整出口链。"},
    { label: "把青岛品牌读成工业城市的不同层次", href: "/zh/guides/qingdao-brands-built-an-industrial-city/", description: "追踪博物馆叙事、生产证据、城市空间和当前准入，不用一个品牌代替整座城市。" },
    { label: "追踪深圳低空基础设施背后的配送链", href: "/zh/guides/shenzhen-low-altitude-city-infrastructure/", description: "沿着商户、起降节点、控制层和人工交接追踪，不把看到一架无人机等同于全城服务。" }
  ]},
  {id:"sources",type:"sources",title:"官方与独立来源",items:[
    {label:"头图——2014-08-01拍摄的义乌国际商贸城内商品陈列；不能证明当前市场区、商位或布局",url:"https://commons.wikimedia.org/wiki/File:Tourist_goods_in_Yiwu_International_Trade_Mart.jpg",publisher:"iamdanw — CC BY 2.0；仅作署名，不代表作者认可Homeground",reviewedAt:"2026-08-13"},
    {label:"头图许可——CC BY 2.0",url:"https://creativecommons.org/licenses/by/2.0/",publisher:"Creative Commons",reviewedAt:"2026-08-13"},
    {label:"义乌市场体系与当前市场主体",url:"https://www.yw.gov.cn/art/2025/1/27/art_1229138370_59518545.html",publisher:"义乌市人民政府",reviewedAt:"2026-08-13"},
    {label:"国际商贸城二区品类",url:"https://www.ezhejiang.gov.cn/eyiwu/2020-02/19/c_332513.htm",publisher:"浙江省人民政府新闻办公室",reviewedAt:"2026-08-13"},
    {label:"义乌国际贸易服务中心",url:"https://www.ezhejiang.gov.cn/jinhua/2026-05/06/c_1180478.htm",publisher:"浙江省人民政府新闻办公室",reviewedAt:"2026-08-13"},
    {label:"义乌全球市场与地方生产网络",url:"https://journals.sagepub.com/doi/10.1068/c11254b",publisher:"Environment and Planning C",reviewedAt:"2026-08-13"},
    {label:"义乌的商品链与城市",url:"https://journals.sagepub.com/doi/10.1177/02632764251343305",publisher:"Theory, Culture & Society",reviewedAt:"2026-08-13"}
  ]}
]} as const satisfies StructuredPageBody;

export default body;
