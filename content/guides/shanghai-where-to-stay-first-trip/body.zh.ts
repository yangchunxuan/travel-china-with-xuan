import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body={schemaVersion:"1.0.0",blocks:[
{id:"lead",type:"lead",text:"上海的著名地名覆盖范围很大，不等于酒店入口。第一次来，应该让最重要的两个游览日和夜间活动更顺，而不是只追求一个热门名称。"},
{id:"answer",type:"callout",title:"先给结论",tone:"decision",body:"行程混合、重视整体轨道连接，优先比较人民广场；外滩夜景与南京东路夜间步行是核心，且能接受人流和到实用地铁口的一段步行，可住外滩／南京东路；更重视林荫街道、咖啡馆和社区散步，可选原法租界片区。"},
{id:"matrix",type:"table",caption:"三种首次住宿逻辑",columns:["区域","更适合","取舍","核对"],rows:[["人民广场","混合景点与轨道连接","繁忙，门外氛围未必细腻","广场哪一侧与准确出口"],["外滩／南京东路东段","天际线、滨江与中心夜游","周末人流；滨江定位未必靠实用出口","地铁步行与车辆进入"],["原法租界片区","街区生活、咖啡馆与慢早晨","去部分经典景点和枢纽更远","用准确车站判断，不看大区标签"]]},
{id:"split",type:"callout",title:"不要把原法租界当成一个点",tone:"warning",body:"它跨越多个街区和车站服务范围。不同边缘的酒店会形成完全不同的日程，必须用准确地址对照第一站与最后一站。"},
{id:"fit",type:"comparison",title:"按旅程匹配",columns:[{heading:"48小时经典路线",items:["人民广场或南京东路", "保留一个可步行滨江夜晚","接受较繁忙住宿区"]},{heading:"餐饮与社区节奏",items:["选择原法租界片区","单独安排外滩","确认晚归方式"]},{heading:"家庭或大件行李",items:["优先电梯与车辆入口","减少大型车站穿行","确认房间与入口细节"]}]},
{id:"facts",type:"callout",title:"动态信息核验于2026年8月12日",tone:"neutral",body:"上海市政府资料将人民广场列为重要交通位置，并说明轨道交通1、2、8号线；官方也曾在繁忙周末对南京东路东段和外滩周边采取客流措施。这些事实支持取舍，区域建议属于Homeground编辑判断。具体日期仍须核对轨道、封闭和道路进入。"},
{id:"check",type:"list",ordered:true,items:["定位酒店入口而非区域名。","模拟一次白天与一次晚归。","核对正确出口与电梯路线。","比较抵达日的行李交接。","免费取消前确认物业细节。"]},
{id:"help",type:"callout",title:"需要比较两个地址？",tone:"decision",body:"提供日期、人数、抵达机场或车站、重点景点和大致预算，Homeground可以比较真实定位与需复核的取舍。"},
{id:"links",type:"internal-links",title:"继续规划",items:[{label:"服务式公寓还是酒店",href:"/zh/guides/serviced-apartment-or-hotel-china/",description:"为长住选择合适运营模式。"},{label:"重庆住宿区域",href:"/zh/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/",description:"看看地形如何改变同类决策。"},{label:"如何判断靠近地铁",href:"/zh/guides/china-hotel-near-metro/",description:"检验最后一段步行。"}]},
{id:"sources",type:"sources",title:"官方来源与图片署名",items:[{label:"人民广场及中心区周末交通信息",url:"https://english.shanghai.gov.cn/en-Latest-WhatsNew/20240910/db6a0546907e44409a328e389d2ef969.html",publisher:"上海市人民政府",reviewedAt:"2026-08-12"},{label:"中心区域与轨道1、2、8号线官方资料",url:"https://english.shanghai.gov.cn/en-TaxRefundandDutyFree/20251111/07617954a5814e939172eba7136936ae.html",publisher:"上海市人民政府",reviewedAt:"2026-08-12"},{label:"首图：EditQ拍摄南京东路夜景，CC BY-SA 4.0，已裁切转换",url:"https://commons.wikimedia.org/wiki/File:East_Nanjing_Road_at_night,_Shanghai.jpg",publisher:"Wikimedia Commons",reviewedAt:"2026-08-12"},{label:"CC BY-SA 4.0许可证",url:"https://creativecommons.org/licenses/by-sa/4.0/",publisher:"Creative Commons",reviewedAt:"2026-08-12"}]}
]} as const satisfies StructuredPageBody; export default body;
