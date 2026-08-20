import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const en = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "The most revealing object at Jingdezhen's Imperial Kiln site may be a rejected shard. A perfect bowl tells you what reached a court collection; a warped rim, kiln prop, road surface or heap of broken porcelain can tell you how production worked and failed. The visit succeeds when you connect archaeological ground, repaired objects and the modern brick-vaulted museum without confusing one for another." },
    { id: "answer", type: "callout", title: "The direct answer", body: "Begin outside with the site and its infrastructure, then read kiln remains and sherd deposits, and only then move to reconstructed vessels and celebrated wares. The museum's arches are contemporary architecture inspired by kilns. They are not excavated imperial furnaces.", tone: "decision" },
    { id: "chain-h", type: "heading", level: 2, text: "Use a five-link evidence chain instead of looking for one masterpiece" },
    { id: "chain-table", type: "table", caption: "From production place to museum claim", columns: ["Link", "Evidence to find", "Question"], rows: [["Place", "Kiln, wall, road, well or workshop feature", "What activity could happen here?"], ["Deposit", "Sherd layer, kiln furniture, ash or waster group", "Was it discarded together and in what context?"], ["Classification", "Form, glaze, mark, firing defect or phase", "Which traits support the date and function?"], ["Reassembly", "Joined fragments and modern fills", "How much is excavated material?"], ["Interpretation", "Catalogue, comparison or digital reconstruction", "Which conclusion is evidence and which is a model?"]] },
    { id: "city-h", type: "heading", level: 2, text: "Why an imperial kiln belongs inside a working porcelain city" },
    { id: "city-p1", type: "paragraph", text: "The Imperial Kiln site is not an isolated palace workshop dropped into an empty landscape. Official descriptions identify Ming- and Qing-period kiln remains together with walls, roads, wells and dense production deposits. Those ordinary features matter because clay preparation, forming, glazing, firing, sorting and disposal needed water, movement, labour and repeated rebuilding." },
    { id: "city-p2", type: "paragraph", text: "Do not turn “imperial” into a claim that every task, worker and raw material stayed inside one boundary. Court demand shaped standards and selection, while Jingdezhen's wider craft ecology supplied skills, materials and movement. The site's value lies in showing a production node within a city, not a sealed royal factory in the modern sense." },
    { id: "kiln-h", type: "heading", level: 2, text: "At a kiln remain, read section, phase and intervention" },
    { id: "kiln-p1", type: "paragraph", text: "Find the feature number and phase before naming the kiln. Look for the firebox, firing chamber, floor, wall line and later cuts only if the official diagram identifies them. A low brick or clay outline may be original archaeological fabric, consolidated material, a protective rebuild or a graphic boundary. The conservation label decides; colour and roughness do not." },
    { id: "kiln-p2", type: "paragraph", text: "Then ask about sequence. Kilns were maintained, rebuilt and sometimes overlapped. A later wall crossing an earlier floor can be more informative than a visually complete reconstruction because it shows change. If the remain is covered or closed, use the excavation plan and section drawing rather than leaning over barriers or assigning functions to shapes yourself." },
    { id: "sherds-h", type: "heading", level: 2, text: "Why broken porcelain can be stronger evidence than a whole vase" },
    { id: "sherds-p1", type: "paragraph", text: "A sherd's value comes from context. A fragment recovered from a documented deposit can be related to a kiln phase, workshop zone and other fragments. A beautiful loose shard with no findspot has less power to explain production. Read the excavation unit, layer, date range and whether pieces were found together before using words such as “imperial reject.”" },
    { id: "sherds-list", type: "list", ordered: false, items: ["Warping, glaze faults and cracks may record failure, but the exact cause requires specialist analysis.", "Kiln furniture—saggars, setters or supports—explains firing practice even when it is not decorative.", "Stacks of similar fragments can reveal repeated forms and selection, but a display arrangement may not reproduce the excavated deposit.", "A mark can aid identification; it does not by itself prove the entire object's use, owner or find context."] },
    { id: "repair-h", type: "heading", level: 2, text: "A repaired vessel is an argument made visible" },
    { id: "repair-p1", type: "paragraph", text: "Archaeologists and conservators can join excavated fragments into a recognisable vessel. The result may combine original sherds, reversible adhesive, fills and support. Read the diagram or colour key. A vessel that looks whole across a case is not necessarily one object lifted intact from the ground." },
    { id: "repair-p2", type: "paragraph", text: "Reassembly is valuable because it tests whether fragments share form, decoration and break edges. It can recover scale and design while keeping loss visible. Your caption should say “reconstructed from excavated sherds” when that is what the label reports. Do not erase the conservator's work with the word “original,” and do not dismiss the excavated pieces because new support is present." },
    { id: "museum-h", type: "heading", level: 2, text: "What the modern museum building contributes—and what it cannot prove" },
    { id: "museum-p1", type: "paragraph", text: "The brick vaults create a physical analogy with kilns and frame views between city, site and collections. That is an architectural interpretation. Note the twenty-first-century building as a separate layer, then ask whether its route returns you to actual archaeological features or turns them into background scenery." },
    { id: "museum-p2", type: "paragraph", text: "Inside, compare three object labels rather than photographing thirty cases: one with a secure excavation context, one repaired from fragments, and one comparative piece from another collection or provenance. The comparison reveals how claims are built. If a temporary exhibition replaces a named object, keep the categories and choose substitutes by label." },
    { id: "route-h", type: "heading", level: 2, text: "A field route for first-time visitors" },
    { id: "route-table", type: "table", caption: "Follow production, failure and interpretation", columns: ["Stop", "Action", "Failure recovery"], rows: [["Site map", "Mark kilns, roads/wells, deposits and museum", "Use the official digital/printed plan"], ["Infrastructure", "Find one non-kiln production feature", "Use a labelled model if covered"], ["Kiln", "Record phase and visible intervention", "Read section drawing from the permitted path"], ["Sherd deposit", "Record context before decoration", "Use a provenanced group in a case"], ["Repaired vessel", "Separate fragments, fills and inference", "Choose another labelled reconstruction"], ["Modern museum", "Ask how architecture frames archaeology", "Step outside and compare the real site again"]] },
    { id: "misread-h", type: "heading", level: 2, text: "Do not leave with these porcelain myths" },
    { id: "misread-list", type: "list", ordered: false, items: ["“Imperial” does not mean every object here was used by an emperor.", "A waster is not worthless; it may preserve production evidence unavailable from finished wares.", "A joined vessel is not deception when repair is documented.", "The museum's kiln-shaped arches are not ancient kiln remains.", "A city famous for porcelain is not proof that an unidentified shard comes from this site."] },
    { id: "who-h", type: "heading", level: 2, text: "Who should prioritise the Imperial Kiln site?" },
    { id: "who-p", type: "paragraph", text: "Choose it if you want to understand how objects were made, selected, discarded and later reconstructed—not only admire decoration. It is a strong first stop before workshops or shops because it gives you a vocabulary for evidence. Skip or shorten it if you want only finished masterpieces. Check the museum's official notice for reservations, exposed areas, room rotation, accessible routing and photography; conservation may make the quietest remain temporarily unavailable." },
    { id: "links", type: "internal-links", title: "Continue from object to site", items: [{ label: "How to visit an archaeological site museum", href: "/guides/how-to-visit-an-archaeological-site-museum/", description: "Use findspot, layer, object and conservation as one chain." }, { label: "Read heritage interventions in China", href: "/guides/how-to-read-heritage-sites-in-china/", description: "Separate original fabric, protective work and modern reconstruction." }] },
    { id: "sources", type: "sources", title: "Core institutional sources reviewed", items: [{ label: "Jingdezhen Imperial Kiln Museum", url: "https://www.jdzyybwy.com/", publisher: "Jingdezhen Imperial Kiln Museum", reviewedAt: "2026-08-20" }, { label: "Municipal introduction to the Imperial Kiln site", url: "https://www.jdz.gov.cn/zjcd/mljdz/tscd/t995407.shtml", publisher: "Jingdezhen Municipal Government", reviewedAt: "2026-08-20" }, { label: "Imperial-kiln archaeology research", url: "https://www.dpm.org.cn/learing_detail/225939.html", publisher: "Palace Museum", reviewedAt: "2026-08-20" }, { label: "Museum research exchange", url: "https://www.pgm.org.cn/pgm/wfdt/202501/db2d0f9e08bc45a0876692857ea23efe.shtml", publisher: "Palace Museum", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

const zh = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "景德镇御窑遗址最有解释力的东西，可能是一块被淘汰的瓷片。完整名器告诉你什么进入了宫廷收藏；变形口沿、窑具、道路或碎瓷堆积，却能说明生产怎样运转、怎样失败。一次有效参观，要把考古现场、拼对修复器和现代砖拱博物馆连起来，同时不把三者混成同一层。" },
    { id: "answer", type: "callout", title: "直接答案", body: "先在室外读遗址与基础设施，再看窑炉和瓷片堆积，最后进入展厅看拼对器与精品。博物馆拱券是借鉴窑形的当代建筑，不是发掘出来的御窑。", tone: "decision" },
    { id: "chain-h", type: "heading", level: 2, text: "不要只找名器，用五段证据链读现场" },
    { id: "chain-table", type: "table", caption: "从生产地点到博物馆判断", columns: ["环节", "要找的证据", "要问的问题"], rows: [["地点", "窑炉、墙、道路、水井或作坊遗迹", "这里能进行什么活动？"], ["堆积", "瓷片层、窑具、灰烬或废品群", "是否同一语境出土？"], ["分类", "器形、釉色、款识、烧造缺陷或分期", "哪些特征支持年代和功能？"], ["拼对", "接合碎片与现代补配", "出土原片占多少？"], ["解释", "图录、比较品或数字复原", "哪些是证据，哪些是模型？"]] },
    { id: "city-h", type: "heading", level: 2, text: "为什么御窑必须放回一座生产中的瓷业城市？" },
    { id: "city-p1", type: "paragraph", text: "御窑遗址不是脱离城市的封闭宫廷作坊。官方资料除明清窑炉外，还列出墙垣、道路、水井和密集生产堆积。制泥、成型、施釉、烧成、筛选与废弃，都需要水、交通、劳动力和反复改建；这些普通设施与窑炉同样重要。" },
    { id: "city-p2", type: "paragraph", text: "也不要把“御窑”理解为所有任务、工匠和原料都封在一条边界内。宫廷需求影响标准和筛选，景德镇更广的工艺生态提供技术、材料与流动。遗址展示的是城市中的生产节点，而非现代意义的密闭皇家工厂。" },
    { id: "kiln-h", type: "heading", level: 2, text: "看窑炉先读编号、分期与保护干预" },
    { id: "kiln-p1", type: "paragraph", text: "没有遗迹编号和年代说明，不要先给窑炉命名。只有官方图示确认后，才辨认火膛、窑室、地面、墙线和后期打破关系。低矮砖土轮廓可能是考古原物、加固材料、保护性补砌或图形边界；颜色和粗糙感不能决定。" },
    { id: "kiln-p2", type: "paragraph", text: "接着看顺序。窑炉会维修、重建，也可能相互叠压。后期墙穿过早期地面，有时比完整复建更能说明变化。遗迹覆盖或关闭时，用发掘平面和剖面图，不要探身越栏或自行给形状分配功能。" },
    { id: "sherds-h", type: "heading", level: 2, text: "碎瓷为什么可能比完整花瓶更有证据力？" },
    { id: "sherds-p1", type: "paragraph", text: "瓷片的价值来自语境。出自有记录堆积的碎片，可以与窑炉分期、作坊区和同出碎片联系；没有出土位置的漂亮散片，解释生产的能力反而较弱。说“御窑落选品”前，先读探方、层位、年代范围和是否共出。" },
    { id: "sherds-list", type: "list", ordered: false, items: ["变形、缩釉和开裂可能记录失败，但确切原因需要专业分析。", "匣钵、垫具、支具等窑具即使不美观，也能解释装烧。", "大量相似碎片可以显示重复器形和筛选，但展柜排列未必复原发掘状态。", "款识有助识别，却不能单独证明器物用途、所有者和出土位置。"] },
    { id: "repair-h", type: "heading", level: 2, text: "拼对修复器，是一项可以看见的论证" },
    { id: "repair-p1", type: "paragraph", text: "考古和修复人员可把出土碎片接合成可辨器形。成品可能同时包含原瓷片、可逆黏合剂、补配和支撑。先看图示与色标；隔着展柜显得完整，不等于整器原样出土。" },
    { id: "repair-p2", type: "paragraph", text: "拼对的价值在于检验碎片的器形、纹饰和断口是否相合，并在保留缺失的同时恢复尺度。标签若写“由出土瓷片拼对”，图片说明也应如此。不要用“原件”抹掉修复工作，也不要因有新支撑就否定出土碎片。" },
    { id: "museum-h", type: "heading", level: 2, text: "现代博物馆建筑贡献了什么，又不能证明什么？" },
    { id: "museum-p1", type: "paragraph", text: "砖拱用身体尺度联想到窑炉，也组织城市、遗址和藏品之间的视线。这是建筑解释。先把它标记为21世纪一层，再看游线是否把你带回真实遗迹，还是只把遗址当作背景。" },
    { id: "museum-p2", type: "paragraph", text: "展厅不要拍三十个柜子，比较三件有不同证据结构的器物：一件出土语境清楚，一件由碎片修复，一件来自其他收藏或用于比较。若临展替换了具体器物，保留这三种类别，按标签另选。" },
    { id: "route-h", type: "heading", level: 2, text: "第一次参观可执行的现场顺序" },
    { id: "route-table", type: "table", caption: "沿生产、失败和解释前进", columns: ["停点", "动作", "恢复方案"], rows: [["遗址图", "标出窑炉、道路/水井、堆积和博物馆", "用官方纸质或数字图"], ["基础设施", "找一处非窑炉生产遗迹", "覆盖时看有标签模型"], ["窑炉", "记录分期和可见干预", "在允许路线读剖面图"], ["瓷片堆积", "先记语境，再看纹饰", "改看展柜内有来源的碎片群"], ["拼对器", "分清原片、补配和推断", "另选有说明的修复器"], ["现代博物馆", "判断建筑怎样框选遗址", "走到室外重新比较"]] },
    { id: "misread-h", type: "heading", level: 2, text: "不要带走这些瓷器神话" },
    { id: "misread-list", type: "list", ordered: false, items: ["“御用”不等于现场每件器物都由皇帝使用。", "废品并非无价值，它可能保留成品没有的生产证据。", "记录清楚的拼对修复不是欺骗。", "博物馆窑形拱券不是古窑遗迹。", "城市以瓷著名，也不能证明无来源碎片出自本遗址。"] },
    { id: "who-h", type: "heading", level: 2, text: "谁应该优先看御窑遗址？" },
    { id: "who-p", type: "paragraph", text: "若你想知道器物怎样制作、筛选、淘汰并被重新拼合，而不只欣赏纹饰，这里值得优先。先看御窑，再去作坊或商店，会拥有一套判断证据的词汇。若只想看完整名器，可缩短。预约、遗迹开放、展品轮换、无障碍和摄影，以馆方当天信息为准；保护工作可能让最安静的遗迹暂时不可见。" },
    { id: "links", type: "internal-links", title: "从器物继续读到遗址", items: [{ label: "怎样参观考古遗址博物馆", href: "/zh/guides/how-to-visit-an-archaeological-site-museum/", description: "把出土位置、层位、器物和保护连成证据链。" }, { label: "看懂中国遗产修缮与重建", href: "/zh/guides/how-to-read-heritage-sites-in-china/", description: "分清原物、保护工作和现代复建。" }] },
    { id: "sources", type: "sources", title: "已核对的核心机构来源", items: [{ label: "景德镇御窑博物院", url: "https://www.jdzyybwy.com/", publisher: "景德镇御窑博物院", reviewedAt: "2026-08-20" }, { label: "景德镇市御窑遗址介绍", url: "https://www.jdz.gov.cn/zjcd/mljdz/tscd/t995407.shtml", publisher: "景德镇市人民政府", reviewedAt: "2026-08-20" }, { label: "故宫博物院御窑考古研究", url: "https://www.dpm.org.cn/learing_detail/225939.html", publisher: "故宫博物院", reviewedAt: "2026-08-20" }, { label: "院际研究交流", url: "https://www.pgm.org.cn/pgm/wfdt/202501/db2d0f9e08bc45a0876692857ea23efe.shtml", publisher: "故宫博物院", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

const ko = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "징더전 어요 유적에서 가장 많은 것을 말해 주는 물건은 버려진 도편일 수 있습니다. 완벽한 그릇은 궁정 수장품에 들어간 결과를 보여 주지만, 휘어진 입술·가마 도구·도로·깨진 자기 퇴적은 생산과 실패를 설명합니다. 고고 현장, 접합 복원 기물, 현대 벽돌 아치 박물관을 연결하되 같은 층으로 섞지 않는 것이 관람의 핵심입니다." },
    { id: "answer", type: "callout", title: "바로 답하면", body: "야외 유적과 기반시설부터 보고, 가마와 도편 퇴적을 읽은 뒤 복원 기물과 완성품으로 이동하세요. 박물관 아치는 가마에서 착안한 현대 건축이지 발굴된 황실 가마가 아닙니다.", tone: "decision" },
    { id: "chain-h", type: "heading", level: 2, text: "명품 하나 대신 다섯 고리 증거를 찾으세요" },
    { id: "chain-table", type: "table", caption: "생산 장소에서 박물관 주장까지", columns: ["고리", "찾을 증거", "질문"], rows: [["장소", "가마·벽·길·우물·작업 유구", "어떤 활동이 가능했나?"], ["퇴적", "도편층·가마 도구·재·폐기품군", "같은 맥락에서 버려졌나?"], ["분류", "형태·유약·명문·소성 결함·시기", "연대와 기능을 무엇이 지지하나?"], ["접합", "이어 붙인 조각과 현대 보충", "발굴 재료는 얼마나 되는가?"], ["해석", "도록·비교품·디지털 복원", "무엇이 증거이고 무엇이 모델인가?"]] },
    { id: "city-h", type: "heading", level: 2, text: "어요를 살아 있는 도자 도시 안에서 봐야 하는 이유" },
    { id: "city-p1", type: "paragraph", text: "어요 유적은 빈 땅의 고립된 궁정 공방이 아닙니다. 공식 설명은 명·청대 가마와 함께 벽, 도로, 우물, 빽빽한 생산 퇴적을 확인합니다. 태토 준비·성형·시유·소성·선별·폐기에는 물, 이동, 노동과 거듭된 개조가 필요했으므로 평범한 기반시설도 중요합니다." },
    { id: "city-p2", type: "paragraph", text: "‘어요’라고 모든 작업자·원료·공정이 한 경계 안에 머물렀다고 보지 마세요. 궁정 수요는 기준과 선별에 영향을 주었고, 징더전의 더 넓은 공예 생태가 기술·재료·이동을 공급했습니다. 현장은 현대적 의미의 밀폐된 왕실 공장보다 도시 생산의 한 거점을 보여 줍니다." },
    { id: "kiln-h", type: "heading", level: 2, text: "가마 유구에서는 번호·시기·보존 개입부터 읽으세요" },
    { id: "kiln-p1", type: "paragraph", text: "유구 번호와 시기 없이 가마를 먼저 이름 붙이지 마세요. 공식 도면이 확인할 때만 화구·소성실·바닥·벽선·후대 절단을 구분합니다. 낮은 벽돌·흙 윤곽은 고고 원물, 보강 재료, 보호 재축, 표시선일 수 있습니다. 색과 거친 느낌으로 정할 수 없습니다." },
    { id: "kiln-p2", type: "paragraph", text: "다음은 순서입니다. 가마는 보수·재건되고 서로 겹치기도 했습니다. 후대 벽이 앞선 바닥을 가르는 관계는 완성형 재현보다 변화를 잘 보여 줄 수 있습니다. 유구가 덮였거나 닫혔다면 울타리를 넘지 말고 발굴 평면·단면을 읽으세요." },
    { id: "sherds-h", type: "heading", level: 2, text: "깨진 도편이 온전한 화병보다 강한 증거가 되는 이유" },
    { id: "sherds-p1", type: "paragraph", text: "도편의 힘은 맥락에서 나옵니다. 기록된 퇴적에서 나온 조각은 가마 시기, 공방 구역, 함께 나온 조각과 연결할 수 있습니다. 출토지가 없는 예쁜 조각은 생산을 설명할 힘이 약합니다. ‘어요 불합격품’이라고 부르기 전에 발굴 단위·층위·연대 범위·공반 여부를 읽으세요." },
    { id: "sherds-list", type: "list", ordered: false, items: ["뒤틀림·유약 결함·균열은 실패를 기록하지만 원인은 전문 분석이 필요합니다.", "갑발·받침·지지구 같은 가마 도구는 장식성이 없어도 소성법을 설명합니다.", "비슷한 조각 무리는 반복 형태와 선별을 보여 줄 수 있지만 전시 배열이 발굴 상태는 아닙니다.", "명문은 식별을 돕지만 용도·소유자·출토지를 혼자 증명하지 못합니다."] },
    { id: "repair-h", type: "heading", level: 2, text: "접합 복원 기물은 눈에 보이는 논증입니다" },
    { id: "repair-p1", type: "paragraph", text: "발굴 조각을 이어 그릇 형태를 회복할 때 원 도편, 가역 접착제, 보충재, 지지대가 함께 들어갈 수 있습니다. 도식과 색 범례를 보세요. 진열장 건너 온전해 보여도 한 덩어리로 출토되었다는 뜻은 아닙니다." },
    { id: "repair-p2", type: "paragraph", text: "접합은 형태·무늬·파단면의 일치를 시험하고 결손을 보이면서 규모를 되찾습니다. 라벨이 ‘출토 도편 접합’이라면 캡션도 그렇게 써야 합니다. ‘원본’이라는 한 단어로 보존 작업을 지우지 말고, 새 지지대가 있다고 발굴편을 가짜라고 하지 마세요." },
    { id: "museum-h", type: "heading", level: 2, text: "현대 박물관 건축이 주는 것과 증명하지 못하는 것" },
    { id: "museum-p1", type: "paragraph", text: "벽돌 아치는 몸의 규모로 가마를 연상시키고 도시·유적·수장품 사이의 시야를 조직합니다. 이는 건축적 해석입니다. 21세기 층으로 표시한 뒤 동선이 실제 유구로 돌아가게 하는지, 유적을 배경으로만 쓰는지 살피세요." },
    { id: "museum-p2", type: "paragraph", text: "전시실에서는 서른 장보다 세 라벨을 비교하세요. 출토 맥락이 분명한 물건, 조각으로 복원한 물건, 다른 소장처·출처의 비교품입니다. 특정 기물이 교체되어도 범주를 유지해 대체품을 고르면 됩니다." },
    { id: "route-h", type: "heading", level: 2, text: "첫 방문자를 위한 현장 순서" },
    { id: "route-table", type: "table", caption: "생산·실패·해석을 따라가기", columns: ["지점", "행동", "대안"], rows: [["유적 지도", "가마·길/우물·퇴적·박물관 표시", "공식 종이/디지털 지도"], ["기반시설", "가마 아닌 생산 유구 하나 찾기", "덮였으면 라벨 있는 모형"], ["가마", "시기와 개입 기록", "허용 동선에서 단면도 읽기"], ["도편 퇴적", "장식보다 맥락 먼저", "진열장 출처 명확한 도편군"], ["접합 기물", "원편·보충·추론 분리", "다른 라벨 있는 복원품"], ["현대 박물관", "건축이 유적을 어떻게 프레이밍하는지", "밖으로 나가 실제 현장 재비교"]] },
    { id: "misread-h", type: "heading", level: 2, text: "이 도자 신화는 남기지 마세요" },
    { id: "misread-list", type: "list", ordered: false, items: ["‘어요’가 이곳의 모든 물건을 황제가 썼다는 뜻은 아닙니다.", "폐기품은 완성품에 없는 생산 증거를 남길 수 있습니다.", "기록된 접합 복원은 속임수가 아닙니다.", "박물관의 가마형 아치는 고대 가마터가 아닙니다.", "도자 도시라는 명성은 출처 불명 도편을 이 유적으로 만들지 못합니다."] },
    { id: "who-h", type: "heading", level: 2, text: "누가 어요 유적을 우선해야 할까요?" },
    { id: "who-p", type: "paragraph", text: "무늬 감상보다 제작·선별·폐기·복원을 알고 싶다면 우선하세요. 공방이나 상점 전에 보면 증거를 판단할 어휘가 생깁니다. 완성된 명품만 원하면 짧게 보아도 됩니다. 예약·노출 유구·전시 교체·무장애·촬영은 공식 공지를 확인하세요. 보존 작업으로 조용한 유구가 잠시 닫힐 수 있습니다." },
    { id: "links", type: "internal-links", title: "물건에서 유적으로 계속 읽기", items: [{ label: "고고유적 박물관 방문법", href: "/ko/guides/how-to-visit-an-archaeological-site-museum/", description: "출토지·층위·유물·보존을 한 증거 사슬로 묶습니다." }, { label: "중국 유산 개입 읽기", href: "/ko/guides/how-to-read-heritage-sites-in-china/", description: "원형 부재·보존 작업·현대 재건을 구분합니다." }] },
    { id: "sources", type: "sources", title: "검토한 핵심 기관 자료", items: [{ label: "징더전 어요박물원", url: "https://www.jdzyybwy.com/", publisher: "징더전 어요박물원", reviewedAt: "2026-08-20" }, { label: "징더전시 어요 유적 소개", url: "https://www.jdz.gov.cn/zjcd/mljdz/tscd/t995407.shtml", publisher: "징더전시 인민정부", reviewedAt: "2026-08-20" }, { label: "고궁박물원 어요 고고 연구", url: "https://www.dpm.org.cn/learing_detail/225939.html", publisher: "고궁박물원", reviewedAt: "2026-08-20" }, { label: "박물관 연구 교류", url: "https://www.pgm.org.cn/pgm/wfdt/202501/db2d0f9e08bc45a0876692857ea23efe.shtml", publisher: "고궁박물원", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

export const bodies = { en, zh, ko };
