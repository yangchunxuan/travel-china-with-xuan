import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "“城墙内”范围太大，不能直接选择西安酒店。钟楼是一个具体中心节点，城墙内外的其他城门会呈现完全不同的交通，大雁塔则是拥有独立文化和夜间组团的城南基地。应选择普通夜晚在哪里结束，以及会跨城多少次。" },
  { id: "answer", type: "callout", title: "先给结论", tone: "decision", body: "首次短停围绕古城核心和中心夜晚，选钟楼；只有某座具体城门真正匹配铁路抵达、计划景点或车辆可达的安静街巷，才选城墙内其他位置；大雁塔、城南博物馆、演出／夜间区域或城南安排反复出现，且重要性超过每晚返回古城，选大雁塔。" },
  { id: "boundary", type: "paragraph", text: "本文只在三种位置模式中选择，不做酒店排名，也不把城墙内所有地址当成一个基地；也不决定兵马俑交通。那段郊外行程和真实出发点应另行决定，不能让临时旅游车集合点控制每一晚酒店。" },
  { id: "matrix", type: "table", caption: "三个标签对应三种住宿决定", columns: ["基地", "最适合", "主要牺牲", "核验"], rows: [["钟楼", "首次古城核心、中心餐饮与夜间步行", "人流、交通，部分地址车辆难到", "准确入口、钟楼站路线和安静侧房"], ["其他城门", "具体城门、铁路连接或安静古城街道", "“城内”仍可能有很长跨城步行", "具名城门、穿墙路线、车站和下客"], ["大雁塔／城南", "大雁塔、城南博物馆和反复南侧夜晚", "古城夜晚后返回更长", "准确车站、活动人流和最后步行"]] },
  { id: "trip-fit", type: "table", caption: "让反复日程选择", columns: ["行程模式", "先测试", "原因"], rows: [["两三晚首次到访、古城中心", "钟楼", "让最多普通夜晚留在中心"], ["多晚大雁塔和城南文化", "大雁塔", "避免每天中心早晨后再返回城南"], ["某座城门酒店明显更安静或好进入", "那座具体城门", "物业进入可胜过知名节点"], ["只去一次大雁塔夜晚，其他都在古城", "钟楼", "一次例外不应决定每晚"], ["老人、婴儿车或多个箱子", "下客—电梯—客房最简单的物业", "历史位置不能压过进入"]] },
  { id: "bell", type: "heading", level: 2, text: "钟楼：有用的中心，不是整座古城" },
  { id: "bell-copy", type: "paragraph", text: "西安市政府访客信息把钟楼列在古城四条大街交会处，并注明地铁2号线钟楼站，因此它是清楚的导航和夜间锚点。但使用“钟楼”命名的酒店不一定就在站旁或适合车辆进入。要从大堂测量，确认正确出口，并询问带行李如何穿过周边道路。" },
  { id: "inside", type: "heading", level: 2, text: "城墙内：比较前先说出城门名称" },
  { id: "inside-copy", type: "paragraph", text: "永宁门、火车站一侧、西侧城门或城内小巷附近的物业会制造不同日程。询问最近的具名城门，路线是从城墙上方、下方还是门洞穿过。小巷夜晚更安静，却可能增加到车辆停点的距离；地图上靠墙的地址，也可能在过墙点不便的一侧。" },
  { id: "dayanta", type: "heading", level: 2, text: "大雁塔：选择城南夜间基地" },
  { id: "dayanta-copy", type: "paragraph", text: "西安官方信息把大雁塔列于大雁塔站，市政府资料也介绍4号线连接主要景点与铁路交通。大雁塔、城南博物馆或城南夜晚反复，区域才发挥作用。该组团仍很大，要确认酒店准确位置；活动人流、宽阔道路和从具名车站的长步行会吃掉表面便利。" },
  { id: "evening", type: "callout", title: "21:30疲惫时你会在哪里？", tone: "decision", body: "这个答案比白天景点清单更重要。多晚在钟楼及回民街方向结束，中心胜出；多晚在大雁塔和城南文化区结束，就住城南。一次例外夜晚打车，通常比每晚跨城返回简单。" },
  { id: "arrival", type: "heading", level: 2, text: "让票面完整车站名匹配酒店" },
  { id: "arrival-copy", type: "paragraph", text: "西安各铁路站不能互换。搜索票面完整站名，带全组行李实时比较门到门。直达地铁仍可能有安检、长通道、换乘或困难过街。晚班火车后优先选择有人值守、道路可达的入住；只有剩余多晚明显获益，第二天再搬。" },
  { id: "terracotta", type: "heading", level: 2, text: "不要让兵马俑集合点决定全部住宿" },
  { id: "terracotta-copy", type: "paragraph", text: "兵马俑位于西安中心之外，可用公共、私人或团队等不同方式。先确定方法和真实出发点。当前旅游车集合点不是永久 canonical 理由，不能因此自动住钟楼或大雁塔。即使集合点改变，酒店也应适合行程其余部分。" },
  { id: "last-mile", type: "heading", level: 2, text: "历史街道让最后几百米成为关键" },
  { id: "last-mile-list", type: "list", items: ["索要酒店中文入口和车辆下客点，不只要街道地址。", "确认正确地铁出口，以及电梯和过街是否适合全组。", "核对步行巷、地下通道或城门是否属于路线。", "夜市或演出区附近客房，要已核实的安静侧并询问当前施工。", "带孩子或老人，要计算走完城墙、博物馆或塔区后还剩多少步行。"] },
  { id: "room", type: "table", caption: "把区域承诺变成物业证据", columns: ["承诺", "询问", "避免失败"], rows: [["“城墙内”", "具名城门、距离和穿墙路线", "标签中心但每日长走"], ["“钟楼景观”", "分配客房方向和噪音", "为吵闹的一角景观付费而非交通"], ["“靠近大雁塔”", "准确出口和过街", "大区域标签隐藏长步行"], ["“传统风格酒店”", "电梯、卫浴、冷暖和护照流程", "氛围代替基本房间事实"], ["“铁路方便”", "完整车站和实际时段", "按错误西安车站规划"]] },
  { id: "mobility", type: "callout", title: "先选入口，再选氛围", tone: "warning", body: "轮椅、婴儿车、膝痛或大行李要核验下客、门、升降梯、淋浴和可用地铁出口。酒店观光位置可以很好，却在首尾200米失效。物业无法说明全路线，就选道路可达的常规酒店，不带行李逛街巷。" },
  { id: "failure", type: "table", caption: "区域不如预期时补救", columns: ["问题", "立即处理", "方案变化"], rows: [["出租车进不了巷", "只到约定合规下客点并请物业协助", "反复发生则换道路可达酒店"], ["房间面对严重夜间噪音", "要求已确认安静侧房间", "先换物业，不一定换区"], ["误判铁路站", "按票面全名重算", "离开夜移到可行交通链"], ["每天南北往返占满时间", "按区域重组日程", "剩余多天可白天搬一次"], ["活动人流改变进入", "按官方通知走其他有人值守入口", "保留道路接驳备选"]] },
  { id: "registration", type: "paragraph", text: "旅馆为外国住客登记。请具体物业确认所报抵达时段的护照入住和前台，尤其是巷内小型传统风格物业。" },
  { id: "dynamic", type: "paragraph", text: "西安市访客与地铁资料复核于2026年8月12日。景点运营、活动、地铁进入和物业入口会变；按旅行日期重查官方渠道与酒店。建议基于稳定地理作编辑判断，不承诺固定车程。" },
  { id: "links", type: "internal-links", title: "继续规划", items: [{ label: "不跟团游兵马俑", href: "/zh/guides/terracotta-warriors-without-tour/", description: "选择并保护真实郊外日程。" }, { label: "如何判断靠近地铁", href: "/zh/guides/china-hotel-near-metro/", description: "核对出口与最后步行。" }, { label: "民宿、homestay还是酒店", href: "/zh/guides/minsu-homestay-or-hotel-china/", description: "核验传统风格物业运营。" }, { label: "读懂一段中国城墙", href: "/zh/guides/chinese-city-walls-gates-and-urban-order/", description: "分清原存、保护性修缮、复建与考古遗存，再把城门和街道放回完整的城市系统中理解。" }, { label: "规划陕西历史博物馆", href: "/zh/guides/shaanxi-history-museum-booking-and-collection-plan/", description: "用外籍护照预约，分清小寨本馆与秦汉馆，并按 90 分钟或深度版本安排西安馆藏参观。" }] },
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [{ label: "西安钟鼓楼访客信息", url: "https://en.xa.gov.cn/CultureTravel/Attractions/1691691501245550594.html", publisher: "西安市人民政府", reviewedAt: "2026-08-12" }, { label: "大雁塔访客信息", url: "https://en.xa.gov.cn/CultureTravel/Attractions/1691691504798126082.html", publisher: "西安市人民政府", reviewedAt: "2026-08-12" }, { label: "地铁4号线城市连接官方资料", url: "https://en.xa.gov.cn/MediaCenter/News/1691691435210428418.html", publisher: "西安市人民政府", reviewedAt: "2026-08-12" }, { label: "首图：TarnishedPath拍摄钟楼，CC BY-SA 4.0，已裁切转换", url: "https://commons.wikimedia.org/wiki/File:Bell_Tower_of_Xi%27an_at_night.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" }] }
] } as const satisfies StructuredPageBody;
export default body;
