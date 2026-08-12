import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "福田、罗湖和南山是三个大区，不是三个酒店点位。深圳住宿应由具名铁路站或口岸、反复出现的商务／景点地址，以及夜晚终点决定。“靠近香港”不够准确，不同口岸会把旅客送入不同的香港交通链。" },
  { id: "answer", type: "callout", title: "先给结论", tone: "decision", body: "需要均衡中心商务基地，且福田站或福田口岸确实在计划中，选福田；使用深圳站、罗湖口岸、东门／老商业城区或以东侧中心为主，选罗湖；多天日程在西侧科技／商务地址、华侨城、后海、海上世界／蛇口或深圳湾一带，并接受去东侧更久，选南山。" },
  { id: "boundary", type: "paragraph", text: "本文选择区域逻辑，不讲完整香港过关、不排名酒店，也不把一个区内所有位置视为相同。福田口岸和福田站是不同地点与交通系统；南山内部有多个相互分开的组团。选定组团后还要核验具体大堂和车站入口。" },
  { id: "matrix", type: "table", caption: "三个区对应不同交通锚点", columns: ["基地", "最适合", "主要牺牲", "准确核验"], rows: [["福田", "中心商务、福田铁路、福田／皇岗相关日程", "不自动靠近所有景点或口岸", "哪座福田车站／口岸及酒店入口"], ["罗湖", "深圳站、罗湖口岸、东门和东侧中心", "去南山西侧更久", "铁路或口岸入口、客房噪音和行李路线"], ["南山", "华侨城、后海、科技园、海上世界／蛇口等西侧", "去罗湖及部分中心／东侧更久", "南山哪个组团和真正有用的线路"]] },
  { id: "trip-fit", type: "table", caption: "让重复地址决定", columns: ["行程模式", "先测试", "原因"], rows: [["会议分布在深圳中心", "福田", "中心换乘减少反复跨城"], ["从福田坐高铁并有中心办事", "靠近可用车站入口的福田", "铁路锚点与每日基地一致"], ["罗湖过关并使用深圳站", "罗湖", "两个固定锚点位于同一东侧中心"], ["后海、华侨城、科技园或蛇口多天", "靠近重复组团的南山", "避免每天向西通勤"], ["只有一天去香港，其余都在南山", "南山", "一次过关不应决定每晚；另行选口岸"]] },
  { id: "border", type: "heading", level: 2, text: "先选择口岸，再谈“方便去香港”的酒店" },
  { id: "border-copy", type: "paragraph", text: "深圳官方口岸资料区分罗湖、福田、深圳湾等口岸，它们不会把旅客送到相同的香港铁路或道路网络。先决定香港终点、运营时段、行李和返回时间，再选口岸。住福田不代表罗湖口岸近，南山地址也不自动代表深圳湾口岸最好。" },
  { id: "border-warning", type: "callout", title: "口岸时间和流程是动态信息", tone: "warning", body: "临行前使用深圳口岸官方渠道，不要冻结博客里的过关时间，也不要假设同一口岸适合晚归。保存中文口岸名，并准备在所需时段仍然运营的备选。" },
  { id: "futian", type: "heading", level: 2, text: "福田：只有准确中心节点匹配才均衡" },
  { id: "futian-copy", type: "paragraph", text: "深圳官方交通资料把福田站列在益田路与深南大道交会处，接2、3、11号线；地铁网中的福田口岸则由4号线服务。名字相近，但解决的是不同旅程。酒店靠近真正使用的节点，而且中心会议或夜晚反复，福田才最合适。" },
  { id: "luohu", type: "heading", level: 2, text: "罗湖：为铁路、口岸和老城区组合而选" },
  { id: "luohu-copy", type: "paragraph", text: "深圳政府资料把深圳站列在罗湖并连接1、9号线，也将罗湖口岸列为主要陆路口岸。两个锚点都出现时，罗湖很实用。但“罗湖”仍很宽：东门酒店、火车站酒店和区内东侧住宅地址的最后一程不同，也要确认房间是否面对铁路、道路或夜生活噪音。" },
  { id: "nanshan", type: "heading", level: 2, text: "南山：选择西侧组团，不选择区名" },
  { id: "nanshan-copy", type: "paragraph", text: "南山包含华侨城／世界之窗、高校与科技园、后海、南头、海上世界／蛇口等不同节点。先标记反复出现的办公室或景点，再搜酒店。11号线适合部分机场和中心旅程，其他组团可能依赖1、2／8、9、12或13号线；应由最新官方线路图而不是区名决定。" },
  { id: "arrival", type: "heading", level: 2, text: "使用准确抵达枢纽" },
  { id: "arrival-copy", type: "paragraph", text: "深圳北站、福田站和深圳站是不同铁路枢纽。按票面完整名称搜索，带上行李实时比较最终两家酒店。宝安机场也要按实际时段规划航站楼到大堂。直达线仍可能包含很长站内通道或酒店步行；晚到或多箱家庭要保留合规道路接驳。" },
  { id: "business", type: "heading", level: 2, text: "商务区不是一个办公地址" },
  { id: "business-copy", type: "paragraph", text: "为每个固定会议索要中文地址和最近入口。“福田CBD、南山科技园、前海”都可能隐藏很长最后一程。连续两天以上办事，应比较对应时段从酒店到楼宇的完整抵达，不只数地铁站。会议均匀分散时，选最简单换乘并接受一天较远，不要每晚搬。" },
  { id: "last-mile", type: "list", items: ["中英文都确认准确车站／口岸名称。", "测量酒店大堂到有用入口，不测量区中心。", "行李或下雨时确认电梯、遮蔽路线和道路接送。", "路线经过园区、商场或写字楼门时，确认返回前是否关闭。", "请前台确认实际抵达时段能处理护照入住。"] },
  { id: "verify", type: "table", caption: "避免住错深圳区域的问题", columns: ["问题", "可用回答包含"], rows: [["走哪个香港口岸？", "具名口岸、香港终点和当前运营核验"], ["哪座火车站？", "票面全名，不是“深圳站”泛称"], ["区内哪一块？", "具名车站、街道或商务组团"], ["怎么到大堂？", "正确出口、道路入口、电梯和步行"], ["最晚夜晚在哪里结束？", "完整返回，不只白天方便"], ["口岸／会议改变怎么办？", "第二条可行路线或可取消酒店"]] },
  { id: "failure", type: "table", caption: "锚点改变时补救", columns: ["变化", "立即动作", "方案决定"], rows: [["车票是另一座深圳车站", "带行李重算门到门", "只有重复或抵达脆弱才换酒店"], ["所选口岸时段不合", "按香港终点选当前运营口岸", "不要为了旧口岸保留酒店"], ["办公室在另一组团", "按地理重组会议", "多天重复才白天搬一次"], ["晚间地铁不实际", "使用官方道路交通", "剩余夜晚换更有用的夜间基地"], ["酒店离声称节点很远", "记录大堂真实路线", "按取消条款换准确地址物业"]] },
  { id: "registration", type: "paragraph", text: "旅馆为外国住客登记。确认具体物业在实际抵达时段有员工能处理每本护照；混合用途大楼里有服务台本身不够证明。" },
  { id: "dynamic", type: "paragraph", text: "深圳市地铁、铁路与口岸资料复核于2026年8月13日。线路、口岸时段、流程和车站进入都会变化。临行前重查官方运营／口岸渠道及酒店；本文不承诺固定过关时长。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [{ label: "深圳到香港交通", href: "/zh/guides/shenzhen-hong-kong-transport-route/", description: "选择口岸和完整跨境旅程。" }, { label: "如何判断靠近地铁", href: "/zh/guides/china-hotel-near-metro/", description: "检验准确入口和最后步行。" }, { label: "广州、深圳、香港顺序", href: "/zh/guides/guangzhou-shenzhen-hong-kong-route-order/", description: "决定深圳是基地还是中转。" }] },
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [{ label: "深圳地铁官方线路信息", url: "https://www.sz.gov.cn/en_szgov/life/transport/metro/content/post_12870342.html", publisher: "深圳市人民政府", reviewedAt: "2026-08-13" }, { label: "深圳铁路站官方信息", url: "https://www.sz.gov.cn/en_szgov/life/transport/trains/content/post_11538776.html", publisher: "深圳市人民政府", reviewedAt: "2026-08-13" }, { label: "深港口岸官方指南", url: "https://www.sz.gov.cn/en_szgov/news/infocus/modern/news/content/post_12638271.html", publisher: "深圳市人民政府", reviewedAt: "2026-08-13" }, { label: "首图：RBWS 20 EGUOF拍摄福田市民中心，CC BY-SA 4.0，已裁切转换", url: "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3%E5%B8%82_Shenzhen_%E7%A6%8F%E7%94%B0%E5%8D%80_Futian_%E5%B8%82%E6%B0%91%E4%B8%AD%E5%BF%83_Civic_Center_Shennan_Road_outdoor_square_October_2019_SS2.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13" }] }
] } as const satisfies StructuredPageBody;
export default body;
