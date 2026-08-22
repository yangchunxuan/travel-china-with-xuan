import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const en = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Shenyang Imperial Palace is often introduced as a smaller alternative to Beijing's Forbidden City. That comparison hides its best clue: the palace is three adjacent routes shaped for different court needs and at different times. Dazheng Hall and the Ten Kings Pavilions, the central ceremonial-residential sequence, and the later west-route library do not describe one frozen moment. Walk east → central → west and let the court change as you move." },
    { id: "answer", type: "callout", title: "The direct answer", body: "Use the east route to read an early assembly court, the central route to read formal rule and residence, and the west route to read a later imperial collecting project. The museum dates the complex from the 1620s into the eighteenth century and counts 114 buildings. Do not caption the whole palace “built in 1625.”", tone: "decision" },
    { id: "map-h", type: "heading", level: 2, text: "The map is a timeline disguised as a plan" },
    { id: "map-table", type: "table", caption: "Three routes, three questions", columns: ["Route", "Anchor", "Question"], rows: [["East", "Dazheng Hall and Ten Kings Pavilions", "How did an early court assemble and distribute positions?"], ["Central", "Chongzheng Hall and the residential sequence", "How were rule, audience and household arranged?"], ["West", "Wensu Pavilion and associated library spaces", "How did a later court add collection and cultural authority?"]] },
    { id: "map-p", type: "paragraph", text: "On the official map, mark the boundaries and the passages between routes. They are analytical zones, not three museums sealed from one another. Buildings were repaired and uses changed. A route date is an orientation; the label of each hall determines its own construction, alteration and display history." },
    { id: "east-h", type: "heading", level: 2, text: "East route: read an assembly as a spatial diagram" },
    { id: "east-p1", type: "paragraph", text: "Dazheng Hall stands as an octagonal focal point, with the Ten Kings Pavilions extending the assembly arrangement. Step back far enough to see the relation rather than photographing the hall alone. The useful question is where authority, participants and movement were positioned—not whether the roof looks “more northern” than Beijing." },
    { id: "east-p2", type: "paragraph", text: "The pavilions make a distributed political-military organisation visible, but their current labels should guide exact office and use. Do not assign a named person to a pavilion from memory or costume display. Note repairs and replacement materials separately from the early spatial concept." },
    { id: "central-h", type: "heading", level: 2, text: "Central route: follow the shift from public rule to protected residence" },
    { id: "central-p1", type: "paragraph", text: "At Chongzheng Hall, identify the formal governing/audience role given by the museum, then continue toward the higher residential platform and named living spaces. Changes in elevation, gates and screens help separate outward court business from more restricted household areas. A visitor route may reverse or bypass part of this sequence, so reconstruct it from the plan." },
    { id: "central-p2", type: "paragraph", text: "Avoid reading furnished rooms as untouched snapshots. Textiles, thrones, utensils and figures can be original collection objects, later furnishings, replicas or display aids. Read every case. Architecture can establish a room's documented function; a staged bed cannot establish exactly how one historical night looked." },
    { id: "west-h", type: "heading", level: 2, text: "West route: a library changes the palace's chronology" },
    { id: "west-p1", type: "paragraph", text: "Wensu Pavilion belongs to a later eighteenth-century phase associated with housing a copy of the Siku Quanshu. Its presence turns the palace into more than the remains of an early capital: later emperors used the Shenyang complex as a site of memory, travel and imperial collection." },
    { id: "west-p2", type: "paragraph", text: "Do not use Wensu Pavilion to illustrate the original 1620s plan. Read its fire-conscious library design and secluded setting through the museum's specific explanation. The Siku Quanshu story concerns a vast compilation and multiple purpose-built repositories; the building is one local chapter, not proof that the whole collection is on view." },
    { id: "details-h", type: "heading", level: 2, text: "Four architectural details that make the routes legible" },
    { id: "details-list", type: "list", ordered: true, items: ["Plan shape: Dazheng Hall's focal geometry versus the central route's axial courtyards.", "Repetition: the Ten Kings Pavilions as a ranked ensemble, not decorative twins.", "Elevation: the central residential platform as a controlled transition.", "Roof and enclosure: Wensu Pavilion's library identity and later western setting."] },
    { id: "details-p", type: "paragraph", text: "Use these as observation prompts, not ethnic shortcuts. Architectural forms can circulate, combine and acquire new meanings. If a label names a tradition, patron or technical source, record it precisely; do not claim a roof proves the character of an entire people." },
    { id: "objects-h", type: "heading", level: 2, text: "Let collections answer building questions, not replace them" },
    { id: "objects-p1", type: "paragraph", text: "The museum holds court objects, paintings, documents and later imperial collections. Choose one object per route that clarifies a function: assembly or command in the east, audience/household in the centre, books or collecting in the west. Record provenance and display status. A Qing object in the palace is not automatically original to that room." },
    { id: "objects-p2", type: "paragraph", text: "Temporary exhibitions and room closures change. If the expected object is absent, keep the functional question and find another labelled example. Never use a souvenir label or costumed performance to establish court history." },
    { id: "route-h", type: "heading", level: 2, text: "A three-route walk that works without fixed minutes" },
    { id: "route-table", type: "table", caption: "Use one anchor and one transition per route", columns: ["Stage", "Anchor", "Transition to record", "Fallback"], rows: [["East", "Dazheng Hall", "Hall to pavilion ensemble", "Exterior view if rooms close"], ["Central", "Chongzheng Hall", "Public court to raised residence", "Use map and named gates"], ["West", "Wensu Pavilion", "Residence/court to later library", "Read exterior and library label"], ["Synthesis", "Official chronology", "Which route changed your idea of the palace?", "Compare three map notes outdoors"]] },
    { id: "misread-h", type: "heading", level: 2, text: "Do not call it a miniature Forbidden City" },
    { id: "misread-list", type: "list", ordered: false, items: ["The phrase makes Beijing the standard and erases Shenyang's own court sequence.", "Not all routes were built at the same time.", "Later additions are historical evidence, not contamination of an “original” palace.", "World Heritage status does not make every furnishing original to its room.", "Present room names and functions require museum evidence, not resemblance."] },
    { id: "who-h", type: "heading", level: 2, text: "Who should prioritise Shenyang Imperial Palace?" },
    { id: "who-p", type: "paragraph", text: "Choose it if you want to see institutions change through architecture, or if Beijing has made “imperial palace” feel visually predictable. It rewards map readers more than checklist visitors. Travelers with limited walking can select one route after asking for the current accessible path. Check official notices for tickets, ID, one-way flow, room openings and photography immediately before travel." },
    { id: "links", type: "internal-links", title: "Continue reading palace and heritage layers", items: [{ label: "Read heritage interventions in China", href: "/guides/how-to-read-heritage-sites-in-china/", description: "Separate early layout, later addition and conservation work." }, { label: "How to visit an archaeological site museum", href: "/guides/how-to-visit-an-archaeological-site-museum/", description: "Use plans, labels and objects to reconstruct absent functions." }, { label: "Visit Beijing's Forbidden City as a foreign traveler", href: "/guides/forbidden-city-for-foreign-visitors/", description: "Compare booking and visitor flow without treating Beijing as Shenyang's template." }, { label: "Read dougong and Chinese timber frames", href: "/guides/dougong-and-chinese-timber-frame-reading/", description: "Move from route chronology to close structural observation." }, { label: "Plan a National Museum of China route", href: "/guides/national-museum-of-china-booking-and-route/", description: "Use another collection-rich institution to practise choosing evidence instead of checking every room." }] },
    { id: "sources", type: "sources", title: "Core museum and heritage sources reviewed", items: [{ label: "Shenyang Imperial Palace visitor guide", url: "https://www.sypm.org.cn/daolan_1/11.html", publisher: "Shenyang Imperial Palace Museum", reviewedAt: "2026-08-20" }, { label: "Museum history", url: "https://www.sypm.org.cn/aboutus/7.html", publisher: "Shenyang Imperial Palace Museum", reviewedAt: "2026-08-20" }, { label: "Imperial Palaces of the Ming and Qing Dynasties", url: "https://whc.unesco.org/en/list/439", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-20" }, { label: "Museum architectural research", url: "https://www.sypm.org.cn/xsyj_3/1155833823390224384.html", publisher: "Shenyang Imperial Palace Museum", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

const zh = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "沈阳故宫常被介绍成“缩小版北京故宫”，这会遮住最关键的线索：它由相邻三路组成，为不同宫廷需求、在不同阶段形成。大政殿与十王亭、中路礼政和居住序列、后建西路藏书空间，不是同一时刻的凝固画面。按东—中—西前进，让宫廷随着脚步发生变化。" },
    { id: "answer", type: "callout", title: "直接答案", body: "东路读早期议政集会，中路读正式统治与居住，西路读后期皇家藏书工程。馆方把建筑群年代从1620年代延续到十八世纪，并统计114座建筑。因此不能把整座故宫统一写成“1625年建”。", tone: "decision" },
    { id: "map-h", type: "heading", level: 2, text: "地图是一条伪装成平面的时间线" },
    { id: "map-table", type: "table", caption: "三路回答三种问题", columns: ["路线", "锚点", "问题"], rows: [["东路", "大政殿与十王亭", "早期宫廷怎样集会并分配位置？"], ["中路", "崇政殿与居住序列", "统治、朝见和家庭怎样安排？"], ["西路", "文溯阁及藏书空间", "后期宫廷怎样加入收藏与文化权威？"]] },
    { id: "map-p", type: "paragraph", text: "在官方图上标出三路边界与相互通道。它们是分析区，不是三座完全封闭的博物馆。建筑会维修、用途也会改变；路线年代只用于定向，每座殿的建造、变更和陈列史仍由自身标签决定。" },
    { id: "east-h", type: "heading", level: 2, text: "东路：把集会读成一张空间图" },
    { id: "east-p1", type: "paragraph", text: "大政殿以八角形成为焦点，十王亭向外展开集会格局。退后到能同时看关系的位置，不只拍一座殿。真正问题是权力、参与者与移动被放在哪里，而不是屋顶是否比北京“更北方”。" },
    { id: "east-p2", type: "paragraph", text: "十王亭把一种分布式组织变得可见，但具体职位和使用要跟随馆方标签。不要凭记忆或古装展示给某亭安排人物。早期空间概念、后期维修与替换材料应分别记录。" },
    { id: "central-h", type: "heading", level: 2, text: "中路：跟着公开统治转入受保护居所" },
    { id: "central-p1", type: "paragraph", text: "到崇政殿，先确认馆方所述的理政或朝见功能，再向较高的居住台地和具名生活空间前进。高差、门与屏障把对外宫务和更受限制的家庭区分开。当天游线可能逆行或绕开部分区域，要靠平面重建顺序。" },
    { id: "central-p2", type: "paragraph", text: "不要把布置房间当成未经改变的快照。织物、宝座、器具和人物可能是馆藏原物、后配、复制或辅助展示，逐项看标签。建筑记录可说明房间功能；一张布景床不能证明某个历史夜晚的精确样子。" },
    { id: "west-h", type: "heading", level: 2, text: "西路：一座藏书楼改变宫殿年代" },
    { id: "west-p1", type: "paragraph", text: "文溯阁属于十八世纪后期，用于收藏《四库全书》副本。它使沈阳故宫不只保留早期都城宫廷：后来的皇帝也把这里作为记忆、巡幸和皇家收藏的场所。" },
    { id: "west-p2", type: "paragraph", text: "不能用文溯阁说明1620年代原始布局。按馆方资料读其藏书、防火和相对独立的位置。《四库全书》涉及大规模编纂和多处专门藏书楼，文溯阁是其中一章，不代表全部书册当天展示。" },
    { id: "details-h", type: "heading", level: 2, text: "让三路清楚的四个建筑细节" },
    { id: "details-list", type: "list", ordered: true, items: ["平面：大政殿聚焦几何与中路轴线院落。", "重复：十王亭是有等级的组合，不是装饰性双胞胎。", "高差：中路居住台地形成受控转换。", "屋顶与围合：文溯阁表现藏书身份和后期西路位置。"] },
    { id: "details-p", type: "paragraph", text: "这些是观察提示，不是民族性格捷径。建筑形式会流动、组合并获得新意义。标签若点名某种传统、主持者或技术来源，就精确记录；不能凭屋顶推导整个群体的性格。" },
    { id: "objects-h", type: "heading", level: 2, text: "让藏品回答建筑问题，不要取代建筑" },
    { id: "objects-p1", type: "paragraph", text: "馆藏包括宫廷器物、书画、文献和后期皇家收藏。每路选一件能说明功能的对象：东路集会或指挥，中路朝见或生活，西路书籍或收藏。记录来源和陈列状态。清代器物出现在宫里，不自动等于原属这间房。" },
    { id: "objects-p2", type: "paragraph", text: "临展和闭室会变化。预期对象不在时，保留功能问题，另找标签清楚的例子。不能用纪念品说明或古装演出证明宫廷史。" },
    { id: "route-h", type: "heading", level: 2, text: "不写死分钟的三路走法" },
    { id: "route-table", type: "table", caption: "每路只抓一个锚点与一个转换", columns: ["阶段", "锚点", "要记录的转换", "不可用时"], rows: [["东", "大政殿", "殿与亭群关系", "室内关闭看外部"], ["中", "崇政殿", "公开宫务到高台居所", "用地图和具名门"], ["西", "文溯阁", "宫廷/居住到后期藏书", "读外观与藏书标签"], ["综合", "官方年代线", "哪一路改变了你的宫殿印象？", "在室外比较三条笔记"]] },
    { id: "misread-h", type: "heading", level: 2, text: "不要称它为“迷你故宫”" },
    { id: "misread-list", type: "list", ordered: false, items: ["这种说法以北京为唯一标准，抹掉沈阳自身序列。", "三路并非同一时期建成。", "后期增加是历史证据，不是对“原宫殿”的污染。", "世界遗产不代表每件家具原属本房。", "房名和功能要靠馆方证据，不靠相似外观。"] },
    { id: "who-h", type: "heading", level: 2, text: "谁应该优先看沈阳故宫？" },
    { id: "who-p", type: "paragraph", text: "若想从建筑看制度变化，或北京让“皇家宫殿”显得过于熟悉，这里值得优先。它更奖励会读地图的人，而非打卡者。步行有限可询问当前无障碍后只选一路。门票、证件、单向游线、开室与摄影，临行前查官方通知。" },
    { id: "links", type: "internal-links", title: "继续读宫殿与遗产层", items: [{ label: "看懂中国遗产干预", href: "/zh/guides/how-to-read-heritage-sites-in-china/", description: "分开早期布局、后期增加和保护工作。" }, { label: "怎样参观考古遗址博物馆", href: "/zh/guides/how-to-visit-an-archaeological-site-museum/", description: "用地图、标签和对象恢复缺失功能。" }, { label: "外国游客怎样参观北京故宫", href: "/zh/guides/forbidden-city-for-foreign-visitors/", description: "比较预约与游线，但不把北京当成沈阳的建筑模板。" }, { label: "读懂斗拱与中国木构", href: "/zh/guides/dougong-and-chinese-timber-frame-reading/", description: "从三路年代继续进入结构细节观察。" }, { label: "安排中国国家博物馆参观路线", href: "/zh/guides/national-museum-of-china-booking-and-route/", description: "在另一座馆藏丰富的机构练习选择证据，而不是打卡所有展厅。" }] },
    { id: "sources", type: "sources", title: "已核对的博物馆与遗产来源", items: [{ label: "沈阳故宫导览", url: "https://www.sypm.org.cn/daolan_1/11.html", publisher: "沈阳故宫博物院", reviewedAt: "2026-08-20" }, { label: "沈阳故宫沿革", url: "https://www.sypm.org.cn/aboutus/7.html", publisher: "沈阳故宫博物院", reviewedAt: "2026-08-20" }, { label: "明清皇家宫殿世界遗产", url: "https://whc.unesco.org/en/list/439", publisher: "UNESCO世界遗产中心", reviewedAt: "2026-08-20" }, { label: "沈阳故宫建筑研究", url: "https://www.sypm.org.cn/xsyj_3/1155833823390224384.html", publisher: "沈阳故宫博物院", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

const ko = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "선양고궁은 흔히 베이징 자금성의 작은 대안으로 소개되지만 이 비교는 최고의 단서를 가립니다. 궁은 서로 다른 필요와 시기에 형성된 동·중·서 세 길입니다. 다정뎬과 십왕정, 중앙 의례·거주 축, 후대 서로 도서관은 한 순간의 모습이 아닙니다. 동→중→서로 걸으며 궁정이 변하게 하세요." },
    { id: "answer", type: "callout", title: "바로 답하면", body: "동로에서는 초기 집회 궁정, 중로에서는 공식 통치와 거주, 서로에서는 후대 황실 수장 사업을 읽습니다. 박물관은 1620년대부터 18세기까지 114채를 설명합니다. 궁 전체를 ‘1625년 건립’이라고 쓰지 마세요.", tone: "decision" },
    { id: "map-h", type: "heading", level: 2, text: "지도는 평면으로 위장한 시간선입니다" },
    { id: "map-table", type: "table", caption: "세 길, 세 질문", columns: ["길", "기준점", "질문"], rows: [["동로", "다정뎬·십왕정", "초기 궁정은 어떻게 모이고 자리를 분배했나?"], ["중로", "충정뎬·거주 축", "통치·알현·가정은 어떻게 배치됐나?"], ["서로", "원쑤거·도서 공간", "후대 궁정은 수장과 문화 권위를 어떻게 더했나?"]] },
    { id: "map-p", type: "paragraph", text: "공식 지도에 경계와 연결 통로를 표시하세요. 분석 구역이지 밀폐된 세 박물관은 아닙니다. 건물은 보수되고 용도가 변했습니다. 길의 연대는 방향이며 전각마다 건립·변경·전시 이력을 확인합니다." },
    { id: "east-h", type: "heading", level: 2, text: "동로: 집회를 공간 도표로 읽으세요" },
    { id: "east-p1", type: "paragraph", text: "팔각형 다정뎬이 초점이고 십왕정이 집회 배열을 펼칩니다. 전각 하나만 찍지 말고 관계가 보이게 물러나세요. 권한·참가자·이동이 어디에 배치됐는지가 질문이며 지붕이 베이징보다 ‘북방적’인지가 아닙니다." },
    { id: "east-p2", type: "paragraph", text: "정군은 분산된 조직을 보여 주지만 정확한 직책·사용은 라벨을 따릅니다. 기억·의상 전시만으로 특정 인물을 정에 배정하지 마세요. 초기 공간 개념과 후대 보수·교체 재료를 분리합니다." },
    { id: "central-h", type: "heading", level: 2, text: "중로: 공개 통치에서 보호된 거주로 이동하세요" },
    { id: "central-p1", type: "paragraph", text: "충정뎬의 공식 통치·알현 기능을 확인한 뒤 높은 거주대와 생활 공간으로 갑니다. 높이·문·가림이 외부 궁무와 제한된 가정을 나눕니다. 오늘 동선이 역행·우회하면 지도에서 순서를 복원하세요." },
    { id: "central-p2", type: "paragraph", text: "꾸민 방을 변하지 않은 사진으로 보지 마세요. 직물·옥좌·도구·인물은 원수장품·후대 가구·복제·해설물일 수 있습니다. 건축은 기록된 기능을 말하지만 연출된 침대는 어느 역사적 밤의 모습이 아닙니다." },
    { id: "west-h", type: "heading", level: 2, text: "서로: 도서관이 궁의 연대를 바꿉니다" },
    { id: "west-p1", type: "paragraph", text: "원쑤거는 《사고전서》 한 질을 보관한 18세기 후반 단계입니다. 선양고궁이 초기 수도의 잔존물만이 아니라 후대 황제가 기억·순행·황실 수장의 장소로 쓴 곳임을 보여 줍니다." },
    { id: "west-p2", type: "paragraph", text: "원쑤거로 1620년대 원배치를 설명하지 마세요. 구체적 설명을 따라 방화·장서 설계와 독립된 위치를 봅니다. 《사고전서》는 대편찬과 여러 전용 서고의 이야기이며 이 건물 하나가 전질 상설 전시를 뜻하지 않습니다." },
    { id: "details-h", type: "heading", level: 2, text: "세 길을 보이게 하는 건축 세부 네 가지" },
    { id: "details-list", type: "list", ordered: true, items: ["평면: 다정뎬 초점 기하와 중로 축선 중정.", "반복: 십왕정은 위계 앙상블이지 장식 쌍둥이가 아님.", "높이: 중로 거주대가 통제 전환을 만듦.", "지붕·울타리: 원쑤거의 도서관 성격과 후대 서로 위치."] },
    { id: "details-p", type: "paragraph", text: "관찰 단서이지 민족적 지름길이 아닙니다. 건축 형식은 이동·결합하며 새 의미를 얻습니다. 라벨이 전통·후원자·기술 출처를 밝힐 때 정확히 쓰고 지붕으로 집단 성격을 말하지 않습니다." },
    { id: "objects-h", type: "heading", level: 2, text: "수장품은 건물 질문에 답하게 하세요" },
    { id: "objects-p1", type: "paragraph", text: "궁정 물건·회화·문서·후대 황실 수장이 있습니다. 길마다 기능을 밝히는 하나를 고르세요. 동로 집회/명령, 중로 알현/가정, 서로 책/수장입니다. 출처·전시 상태를 적고 청대 물건이 그 방 원가구라고 가정하지 않습니다." },
    { id: "objects-p2", type: "paragraph", text: "특별전·폐실은 변합니다. 기대 대상이 없으면 기능 질문을 유지해 다른 라벨을 찾습니다. 기념품 설명·의상 공연으로 궁정사를 입증하지 마세요." },
    { id: "route-h", type: "heading", level: 2, text: "고정 시간 없는 세 길 걷기" },
    { id: "route-table", type: "table", caption: "각 길에서 기준점과 전환 하나", columns: ["단계", "기준점", "전환", "대안"], rows: [["동", "다정뎬", "전각과 정군", "실내 닫히면 외관"], ["중", "충정뎬", "공개 궁무→높은 거주", "지도·명명된 문"], ["서", "원쑤거", "궁정/거주→후대 도서관", "외관·서고 라벨"], ["종합", "공식 연표", "어느 길이 궁 인식을 바꿨나?", "밖에서 세 메모 비교"]] },
    { id: "misread-h", type: "heading", level: 2, text: "‘미니 자금성’이라고 하지 마세요" },
    { id: "misread-list", type: "list", ordered: false, items: ["베이징을 기준으로 선양의 자체 축을 지웁니다.", "세 길은 같은 시기에 짓지 않았습니다.", "후대 추가는 ‘원형’ 오염이 아니라 역사 증거입니다.", "세계유산이 모든 가구의 방 원속성을 뜻하지 않습니다.", "방 이름·기능은 닮은 외관이 아니라 박물관 근거가 필요합니다."] },
    { id: "who-h", type: "heading", level: 2, text: "누가 선양고궁을 우선해야 할까요?" },
    { id: "who-p", type: "paragraph", text: "건축으로 제도 변화를 보거나 베이징 때문에 황궁이 익숙해졌다면 선택하세요. 체크리스트보다 지도 독자에게 보답합니다. 보행이 제한되면 현행 무장애를 묻고 한 길만 골라도 됩니다. 티켓·신분증·일방 동선·개방실·촬영은 출발 직전 확인합니다." },
    { id: "links", type: "internal-links", title: "궁궐·유산 층 계속 읽기", items: [{ label: "중국 유산 개입 읽기", href: "/ko/guides/how-to-read-heritage-sites-in-china/", description: "초기 배치·후대 추가·보존 작업을 분리합니다." }, { label: "고고유적 박물관 방문법", href: "/ko/guides/how-to-visit-an-archaeological-site-museum/", description: "지도·라벨·물건으로 사라진 기능을 복원합니다." }, { label: "외국인 여행자의 베이징 자금성 방문법", href: "/ko/guides/forbidden-city-for-foreign-visitors/", description: "예약과 관람 흐름을 비교하되 베이징을 선양의 건축 기준으로 삼지 않습니다." }, { label: "두공과 중국 목구조 읽기", href: "/ko/guides/dougong-and-chinese-timber-frame-reading/", description: "세 노선의 연대에서 구조 세부 관찰로 들어갑니다." }, { label: "중국국가박물관 관람 동선 짜기", href: "/ko/guides/national-museum-of-china-booking-and-route/", description: "소장품이 많은 다른 기관에서 모든 방을 체크하기보다 증거를 고르는 법을 연습합니다." }] },
    { id: "sources", type: "sources", title: "검토한 박물관·유산 자료", items: [{ label: "선양고궁 관람 안내", url: "https://www.sypm.org.cn/daolan_1/11.html", publisher: "선양고궁박물원", reviewedAt: "2026-08-20" }, { label: "박물관 역사", url: "https://www.sypm.org.cn/aboutus/7.html", publisher: "선양고궁박물원", reviewedAt: "2026-08-20" }, { label: "명·청 황궁 세계유산", url: "https://whc.unesco.org/en/list/439", publisher: "UNESCO 세계유산센터", reviewedAt: "2026-08-20" }, { label: "궁 건축 연구", url: "https://www.sypm.org.cn/xsyj_3/1155833823390224384.html", publisher: "선양고궁박물원", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

export const bodies = { en, zh, ko };
