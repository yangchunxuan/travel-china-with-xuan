import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {schemaVersion:"1.0.0",blocks:[
  {id:"lead",type:"lead",text:"中国壮观的喀斯特负地形在网络上常被统称为“天坑”。地质学对这个词的使用比旅行图注更严格。经科学确认的天坑不会自动成为公众景点；旅游经营者使用“天坑”命名，也不能自动证明其地质分类。真正的旅行任务要依次通过三道门：地貌正确、游客身份合法、当前有人管理的准入成立。"},
  {id:"answer",type:"callout",title:"直接答案",body:"只访问正式景区，或当前属地政府/运营方明确公布合法公共路线的场所。始终停留在平台、阶梯和标识路径上。野外凹地的坐标、航拍视频或探险帖子都不是自行下降的许可。科学名称、运营方、入口和当前通行四项不能同时核实时，只把它当研究背景，不列为目的地。",tone:"decision"},
  {id:"definition-heading",type:"heading",level:2,text:"第一道门：它在地质意义上是天坑吗？"},
  {id:"definition",type:"paragraph",text:"中国地质资料和国际洞穴科学通常把天坑描述为规模、深度和体积异常巨大、侧壁陡峭的喀斯特负地形，通常与地下水系相连，由溶蚀和坍塌过程形成。发表的分类依靠可测量形态，而不只是“一个壮观大洞”。定义和阈值也随研究发展，所以本文不会根据照片给任何无名凹地自行认定“天坑”。"},
  {id:"terms",type:"table",caption:"相关词不能互换",columns:["术语","有用含义","游客含义"],rows:[
    ["落水洞／漏斗（sinkhole/doline）","涵盖多种尺度和成因的封闭喀斯特凹地。","大多数落水洞不是天坑；科学价值不代表公共准入。"],
    ["天坑（tiankeng）","符合专业形态语境的极大、极深、陡壁喀斯特凹地。","名称应由地质调查、同行评审资料或权威地质公园解释支持。"],
    ["洞穴或地下河","可能与天坑相连的地下通道和排水系统。","可能有独立路线、装备和关闭规则；观景票不授权探洞。"],
    ["景区名中的“天坑”","可能指一个综合景观的游客或营销名称。","要核实具体解释哪处地貌、门票实际涵盖哪条路线。"]
  ]},
  {id:"status-heading",type:"heading",level:2,text:"第二道门：这个地点是什么游客状态？"},
  {id:"status",type:"table",caption:"四种准入类别",columns:["类别","所需证据","旅客可做什么","危险信号"],rows:[
    ["正式景区","当前政府/运营页面、明确入口、管理路线和公开安全规则。","按当前条件使用售票或公共路线。","关闭或改造后，转售商仍复制旧开放时间。"],
    ["地质公园或保护地解释点","管理方公布的当前公共边界、入口和步道通知。","只走明确命名的公共步道或观景点。","一个中心开放，就假定整个保护区或地质公园开放。"],
    ["科研／发现点","地质调查或论文确认地貌，但不存在当前公共运营路线。","通过资料了解，不把科学坐标转成行程。","把考察队媒体画面变成徒步指南。"],
    ["未核实“野生天坑”","只有社交帖、地图标签、地方俗名或坐标，没有主管方/运营证据。","不访问、不发布路线。","“秘境”“免费”“免票”或自行下降的承诺。"]
  ]},
  {id:"examples-heading",type:"heading",level:2,text:"用例子理解类别，不收集天坑"},
  {id:"examples",type:"comparison",title:"两个知名公共语境",leftTitle:"重庆奉节小寨天坑",rightTitle:"广西乐业—凤山喀斯特",rows:[
    {label:"为什么重要",left:"有官方属地/景区规划和公众解释语境的重要命名天坑。",right:"包含多个巨型凹地、洞穴和保护地/地质公园语境的广域喀斯特区。"},
    {label:"规划启示",left:"核准确切景区入口和当期运营路线；地质实体不等于周边每个开发项目。",right:"选择有名称的正式景区和运营路线，不假定所有报道天坑可串联公开访问。"},
    {label:"不能推断",left:"规划征求意见证明新设施或路线已经开放。",right:"“天坑群”可按坐标自行穿越。"}
  ]},
  {id:"choose-heading",type:"heading",level:2,text:"五问选点过滤器"},
  {id:"choose",type:"list",items:["分类：哪一份地质调查、同行评审资料或权威地质公园解释认定该地貌？","运营：今天由哪个明确主管部门或景区运营方管理确切入口？","路线：是否公布当前平台、阶梯、步道、接驳或带领路线，而不只有目的地宣传？","条件：当期通知怎样说明天气、维修、落石、积水、火险或容量控制？","恢复：云雾、降雨、关闭或行动能力影响主视角时，有没有仍然有用的地面或室内备选？"]},
  {id:"effort-heading",type:"heading",level:2,text:"坑口、下降与洞穴是三种体力任务"},
  {id:"effort",type:"table",caption:"让路线层匹配旅客",columns:["路线层","常见要求","要核实","停止规则"],rows:[
    ["授权坑口观景点","路程可能较短，但有暴露平台、阶梯和长距离接驳。","无障碍声明、栏杆、天气关闭和离交通点真实距离。","雷电、危险大风或运营关闭时不上暴露平台。"],
    ["管理阶梯下降","持续上下、湿度与艰难回升。","台阶/高差、扶手、休息点、单向规则和最晚入场。","膝盖、炎热或时间恶化时在第一个官方折返点返回。"],
    ["管理洞穴／地下路线","湿滑、黑暗、温差，有时需要独立交通或装备。","独立票线、当前洪水关闭、鞋具和向导要求。","不越过关闭点，不离开照明路线。"],
    ["技术探险","绳索、洞穴救援和科学/探险能力。","正式授权、合资格团队和救援计划。","不属于散客旅游范围。"]
  ]},
  {id:"scenarios-heading",type:"heading",level:2,text:"两类旅客应做不同选择"},
  {id:"scenarios",type:"comparison",title:"匹配地点，不匹配名气",leftTitle:"第一次看天坑的地质爱好者",rightTitle:"与长辈同行的子女",rows:[
    {label:"优先",left:"清楚解释，加一处能显示尺度与形态的管理观景点。",right:"已核验准入、栏杆、休息、卫生间和地面恢复方案。"},
    {label:"方案",left:"一处正式地点，留时间读图并比较坑口与地下排水。",right:"先用坑口或游客中心层；核对阶梯和返程体力后才下降。"},
    {label:"拒绝",left:"唯一价值是稀有的偏远坐标。",right:"只用“轻松”描述而没有可测准入证据的路线。"}
  ]},
  {id:"ecology-heading",type:"heading",level:2,text:"天坑是生境，不是冒险布景"},
  {id:"ecology",type:"list",items:["深凹地可形成独特湿度、光照和温度梯度，支持特殊植物群落；UNESCO 概述强调其生态研究价值。","停留在栏杆后和管理路径上，不踩踏脆弱土壤、植被与洞口。","不投物、不用巨响测试回声、不喂动物、不带走岩石植物。","不为缺乏保护的敏感地点添加精确地理标签；曝光会增加干扰，却不会创造救援或管理能力。","长距离进入偏远地区前使用卫生间，所有垃圾带走。","摄影不能成为探身越栏、攀爬制造比例或放无人机进入凹地的理由。"]},
  {id:"weather-heading",type:"heading",level:2,text:"喀斯特天气改变路线，不只改变照片"},
  {id:"weather",type:"paragraph",text:"降雨会增加湿滑、径流、落石和地下洪水风险；雾会抹去支撑长途接驳的尺度视角；炎热和湿度会放大回程爬升。这些是条件风险，不是对每个景区的天气保证。采用运营方当日通知与地方预警，并保留可取消方案。“开放”也不证明每条支路或下层路线安全。"},
  {id:"failure-heading",type:"heading",level:2,text:"失败恢复"},
  {id:"failure",type:"table",caption:"准入失败时保留地质任务",columns:["失败","恢复动作","有用结果"],rows:[
    ["雾遮住凹地","使用游客中心、地质剖面、模型和坑口植被，只在交通余量内等待。","不用虚构视野也能理解形成与生境。"],
    ["雨后下层路线关闭","只留在明确开放的地面路线或离开，不跟脚印绕过围挡。","理解排水与坍塌地形为何需要管理。"],
    ["旅客无法走阶梯","使用已核验坑口/中心层，或换有明确准入证据的正式喀斯特地点。","不超越身体边界也能获得地质解释。"],
    ["找不到当前运营信息","删除这个目的地，只保留为阅读/研究背景。","准确状态比危险坐标更有用。"]
  ]},
  {id:"verify-heading",type:"heading",level:2,text:"最终核验清单"},
  {id:"verify",type:"list",items:["天坑名称有科学或权威依据","准确当前主管方/运营方和中文入口","当前公共路线而非科研坐标","运营方开放、门票/预约和最晚入场信息","天气、维修、洪水、落石和火险通知","可测台阶、高差和无障碍信息，而非“轻松”","返程交通和较早地面退出点","不野外下降、不飞无人机、不越栏、不标注敏感点"]},
  {id:"help",type:"callout",title:"需要一处有意义又可承受的喀斯特地点？",body:"告诉 Homeground 行程已有地区、行动能力边界，以及最关心地质、尺度还是摄影。真人规划师可以帮助选择正式公共场所并复核当期路线，而不是把你送到未经核实的坐标。",tone:"neutral"},
  {id:"links",type:"internal-links",title:"负责任地安排自然准入",items:[
    {label:"选择祁连山公共入口",href:"/zh/guides/qilian-mountains-public-gateways-and-access/",description:"在大型保护景观中使用同样严格的边界方法。"},
    {label:"理解中国气候区",href:"/zh/guides/china-climate-regions-for-trip-timing/",description:"不要把一个地区的天气结论套到所有喀斯特区域。"},
    {label:"规划中国轮椅可达路线",href:"/zh/guides/wheelchair-accessible-china-route-planning/",description:"用可测路线证据替换模糊无障碍标签。"}
  ]},
  {id:"sources",type:"sources",title:"官方与独立来源",items:[
    {label:"天坑地质调查报道",url:"https://www.cgs.gov.cn/ywdt/dwdt/202205/t20220513_834899.html",publisher:"中国地质调查局",reviewedAt:"2026-08-13"},
    {label:"天坑发现与喀斯特背景",url:"https://www.cgs.gov.cn/ywdt/dwdt/201612/t20161209_827370.html",publisher:"中国地质调查局",reviewedAt:"2026-08-13"},
    {label:"中国天坑的生态与研究",url:"https://www.unesco.org/en/articles/chinas-heavenly-pits-dive-unknown",publisher:"UNESCO",reviewedAt:"2026-08-13"},
    {label:"广西正式景区分类",url:"https://wlt.gxzf.gov.cn/zfxxgk/wjzl/btjzcwj/t19719409.shtml",publisher:"广西壮族自治区文化和旅游厅",reviewedAt:"2026-08-13"},
    {label:"洞穴科学中的天坑术语",url:"https://bcra.org.uk/pub/candks.oldformat/v32_2.html",publisher:"British Cave Research Association",reviewedAt:"2026-08-13"}
  ]}
]} as const satisfies StructuredPageBody;

export default body;
