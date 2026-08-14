import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {schemaVersion:"1.0.0",blocks:[
  {id:"lead",type:"lead",text:"大运河不是一条封存起来的古河，也不只有帝国工程这一层历史。在漫长水系沿线，受保护的船闸与桥梁、仍在运行的航道、更新后的滨水空间、住宅和店铺同时存在。旅行时最值得做的，是先分清眼前属于遗产、运行系统还是当代街区，再观察水路如何继续影响城市生活；不要把每一段热闹河岸都当成未经改变的历史。"},
  {id:"answer",type:"callout",title:"同时读三条运河",body:"第一，确认有文献支持的遗产构件；第二，判断水道现在是否仍承担运输、排水或城市通行功能；第三，离开景观带一条街，看住宅入口、买菜、上学、维修、送货和晚间锻炼。好的观察能连接三层，差的观察只把仿古铺装当成历史延续。",tone:"decision"},
  {id:"layers-heading",type:"heading",level:2,text:"“大运河”这个名称包含三种不同证据"},
  {id:"layers",type:"table",caption:"先分层，再建立联系",columns:["层次","什么才算证据","可以说明什么","不能证明什么"],rows:[
    ["世界遗产","UNESCO 系列遗产中有名称的河段、水工设施或关联城市设施","历史线路、工程、管理制度及部分城市关系","附近所有看起来古老的巷子都属于遗产或确为古迹"],
    ["仍在运行的水道","由当前运营方或主管部门记录的货运、船闸、码头、维护、水务或客运活动","历史走廊如何被改造为今天的物流与城市系统","现代运行延续了同样的货物、劳作和社会秩序"],
    ["当代水岸生活","在地点明确的街区观察到的公共步道、住宅街、店铺、服务和日常活动","今天居民怎样使用临水空间","一次到访能代表所有居民、季节或整条运河"]
  ]},
  {id:"system-heading",type:"heading",level:2,text:"运河通过“移动—储存—交换”的链条塑造城市"},
  {id:"system",type:"paragraph",text:"UNESCO 将大运河描述为连接重要流域、运输粮食和战略物资的内陆交通骨架。因此，仓储、税收和运输管理、码头、桥梁与市场街道原本属于同一套运行链。独立城市史研究也指出，运河城市形成了不同的空间形态，并不存在一种统一的“水乡模板”。苏北宽阔的货运河段、杭州密集的桥边街区和北京的都市休闲河岸，都可能属于运河故事，但呈现的功能完全不同。"},
  {id:"change-heading",type:"heading",level:2,text:"“延续”不等于什么都没有改变"},
  {id:"change",type:"comparison",title:"保留下来的逻辑与变化后的表达",columns:[
    {heading:"历史运行逻辑",items:["水路适合大宗运输","仓储和交易在交通节点附近聚集","桥与关口集中人流","维护依赖有组织的劳作和管理"]},
    {heading:"今天的表达",items:["部分河段仍承担大规模货运","旧工业水岸可能转为博物馆、住宅或步道","公路、铁路和数字物流与水路交汇","公共空间更新改善可达性，也可能改变使用者和使用方式"]}
  ]},
  {id:"places-heading",type:"heading",level:2,text:"按想看的关系选择河段"},
  {id:"places",type:"table",caption:"四种观察角度，不是景点排名",columns:["角度与可能基地","看什么","为什么有用","边界"],rows:[
    ["仍在运行的航运——苏北运河城市","商船、船闸、等待区，以及作业岸线与公共岸线的分隔","交通运输部资料表明苏北运河仍是重要货运走廊","只能在合法公共区域观察；作业码头不是景点"],
    ["桥边街区——杭州拱宸桥及周边","过桥动线、垂直通向水边的巷子、住宅、社区服务和改造后的工业建筑","步行即可读出空间关系，不必声称每个立面都是原物","博物馆和商户营业会变；居民巷道不是布景"],
    ["都市水岸——北京通州运河区域","大尺度公共河岸、新公共设施、休闲活动，以及它与历史漕运角色的反差","展示运河如何转化为都市基础设施和休闲空间","整治后的河岸证明的是当代规划，不自动证明古代肌理"],
    ["小城交换网络——经证实的运河镇或市场街","上岸点、桥、街、店铺和住宅之间的短距离关系","更容易看清运输如何连接市场","必须核实河道和街区确实属于或关联大运河系统"]
  ]},
  {id:"walk-heading",type:"heading",level:2,text:"两小时现场方法：水—桥—街—市场"},
  {id:"walk",type:"list",ordered:true,items:["从官方遗产或交通资料能够核对名称的河段、桥梁、船闸或码头开始。","先读水面十分钟：水流、船型、岸线处理、闸门、安全隔离，以及它属于作业区还是休闲区。","走一次合法过河通道，看它服务行人、自行车、送货、公交还是主要服务游客。","不要一直停在景观步道，沿一两条垂直于河道的街走进街区。","找到菜店、维修店、便利店或社区服务等普通交换节点；不要侵扰性拍摄居民。","从平行街道返回，对比商业界面、住宅和到水边的通道。","分别写下一句：文献确认的遗产、今天仍在运行的系统、当天现场观察。不要把三句话合成一个未经支持的结论。"]},
  {id:"scenarios-heading",type:"heading",level:2,text:"两类旅客应该选择不同证据"},
  {id:"scenarios",type:"comparison",title:"让问题决定地点",columns:[
    {heading:"关注城市史的人",body:"选择有明确遗产地图、侧巷和公共文化机构的桥边街区。少收集水岸地标，多追踪桥、仓库和街道网之间的关系。"},
    {heading:"关注当代中国的人",body:"选择能合法观察运行河段的公共点位，或经过更新的都市河岸。比较货运、维护、锻炼和消费，同时注明观察只对应当天。"}
  ]},
  {id:"staged-heading",type:"heading",level:2,text:"避免把“遗产布景”当成日常生活"},
  {id:"staged",type:"list",items:["仿古招牌只是视觉包装，除非保护资料确认建筑或街道身份。","热闹小吃街只能证明今天有商业，不能证明它延续了古代市场。","博物馆解释的是被选择的证据，不会让周边街区自动保持原状。","居民使用步道说明今天有公共生活，但一个晚上不能代表普遍习惯。","工作中的货船是当代运输证据；先确认河段和来源，再描述货物或线路。","更新可以同时包含保护、替换与重新解释。描述眼前所见，并为文献结论提供来源。"]},
  {id:"recovery-heading",type:"heading",level:2,text:"河岸封闭、没有船或太商业化时怎么办"},
  {id:"recovery",type:"table",caption:"恢复信息任务，不要强行制造场景",columns:["问题","替代动作","仍能理解什么"],rows:[
    ["防洪、施工或活动封闭河岸","改走最近的合法桥梁与平行街，并查看官方地图或博物馆","即使不能贴水行走，也能看懂街区连接方式"],
    ["现场没有船","观察船闸、系泊设施并查官方航运资料；不要承诺看到船","在没有编造即时活动的前提下理解运行设计"],
    ["水岸过度商业化","退入普通服务街，或换到另一处有证据的河段","旅游和更新如何改变人与运河的关系"],
    ["雨热不适合长走","选择一座博物馆加一小段公共河岸","用物证和城市形态完成理解，不把体力当成洞察"]
  ]},
  {id:"check-heading",type:"heading",level:2,text:"最终核验清单"},
  {id:"check",type:"list",items:["河段或遗产构件的准确中文名与地图点位","它是正式遗产构件、缓冲或关联区域，还是仅仅在附近","当前公共开放、施工、防洪和活动公告","博物馆、游船或场馆时间以运营方渠道复核","观察船闸、港口或货运河段的合法公共点位","无船或雨天替代方案","近距离拍摄居民和工作人员时的同意与隐私边界"]},
  {id:"help",type:"callout",title:"想把合适的运河河段放进现有行程？",body:"告诉 Homeground 你已经会去哪些城市，以及你更关心工程、城市史、运行中的运输还是当代街区生活。真人规划师可以帮你选择合法且有信息价值的河段，并复核当下开放情况，而不是把大运河写成水乡打卡清单。",tone:"neutral"},
  {id:"links",type:"internal-links",title:"继续建立背景",items:[
    {label:"安排上海—苏州—杭州—南京顺序",href:"/zh/guides/shanghai-suzhou-hangzhou-nanjing-route-order/",description:"先决定哪些长三角城市值得保留，再叠加运河主题。"},
    {label:"从斗拱读懂中国木构",href:"/zh/guides/dougong-and-chinese-timber-frame-reading/",description:"用结构证据替代“看起来很古老”的气氛判断。"},
    {label:"比较雕版与活字印刷",href:"/zh/guides/woodblock-and-movable-type-printing-decisions/",description:"理解物质生产系统如何与城市交换发生关系。"},
    { label: "沿着雨水路径读懂中国海绵城市", href: "/zh/guides/how-to-read-a-chinese-sponge-city/", description: "先追踪进水、蓄存、溢流、维护和受纳水体，再判断一处景观设施是否构成有效系统。" }
  ]},
  {id:"sources",type:"sources",title:"官方与独立来源",items:[
    {label:"头图——2023-11-22拍摄的拱宸桥、大运河水面与滨水公共空间；不能证明当前活动或通行状态",url:"https://commons.wikimedia.org/wiki/File:20231122_Gongchen_Bridge_01.jpg",publisher:"Windmemories — CC BY-SA 4.0；仅作署名，不代表作者认可Homeground",reviewedAt:"2026-08-13"},
    {label:"头图许可——CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/",publisher:"Creative Commons",reviewedAt:"2026-08-13"},
    {label:"大运河世界遗产",url:"https://whc.unesco.org/en/list/1443/",publisher:"UNESCO 世界遗产中心",reviewedAt:"2026-08-13"},
    {label:"苏北运河现代货运走廊",url:"https://www.mot.gov.cn/xinwen/jiaotongyaowen/202601/t20260113_4197211.html",publisher:"中华人民共和国交通运输部",reviewedAt:"2026-08-13"},
    {label:"杭州市大运河核心监控区国土空间管控细则",url:"https://www.hangzhou.gov.cn/art/2023/2/6/art_1229063387_1829308.html",publisher:"杭州市人民政府",reviewedAt:"2026-08-13"},
    {label:"运河城市的区位、城市肌理与交通研究",url:"https://www.taylorfrancis.com/chapters/edit/10.4324/9780429244605-38/location-urban-fabric-transportation-fang-wang-bingyu-lin-qingyin-liu",publisher:"Routledge",reviewedAt:"2026-08-13"},
    {label:"杭州大运河遗产化与日常生活研究",url:"https://escholarship.org/uc/item/7jj0h5hn",publisher:"University of California eScholarship",reviewedAt:"2026-08-13"}
  ]}
]} as const satisfies StructuredPageBody;

export default body;
