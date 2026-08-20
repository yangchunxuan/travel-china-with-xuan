import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const en = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "The underground channel you enter in Turpan is not the karez by itself. A functioning karez is a route: recharge and groundwater near higher ground, a gently sloping gallery, vertical shafts for excavation and maintenance, a daylight channel, then storage and distribution toward fields or settlements. A museum tunnel lets you inspect one segment. Your job is to reconnect it to the invisible system without guessing the age or working status of what you see." },
    { id: "answer", type: "callout", title: "The direct answer", body: "Start with a section diagram, identify shafts on the surface, descend only through the authorised visitor route, follow the water toward daylight, and finish at distribution or storage. Turpan's karez received ICID World Heritage Irrigation Structure recognition in 2024; this is not UNESCO World Heritage inscription. UNESCO lists Karez Wells only on China's Tentative List.", tone: "decision" },
    { id: "parts-h", type: "heading", level: 2, text: "Build the whole water path before entering the tunnel" },
    { id: "parts-table", type: "table", caption: "Five connected components", columns: ["Component", "Function", "What a visitor may see"], rows: [["Recharge/source zone", "Feeds groundwater at higher elevation", "Model, map or distant landscape—not necessarily direct access"], ["Vertical shafts", "Construction spoil removal, ventilation and maintenance access", "A line of surface openings; never enter"], ["Underground gallery", "Moves water by gravity on a controlled slope", "Authorised viewing passage or interpreted channel"], ["Open canal", "Carries water after it reaches daylight", "Visible flow and branching, if operating"], ["Reservoir/distribution", "Stores or directs water to users", "Pond, gate, channel split or model"]] },
    { id: "parts-p", type: "paragraph", text: "The model is not decoration. Trace one continuous line with your finger, then test each component against labels on the real route. If the museum combines parts from different karez or uses a purpose-built viewing passage, record that. Do not turn a visitor-friendly tunnel into an untouched historic working gallery without operator confirmation." },
    { id: "gravity-h", type: "heading", level: 2, text: "Gravity is the engineering constraint that holds the story together" },
    { id: "gravity-p1", type: "paragraph", text: "Water moves because the underground gallery maintains a slight gradient from higher groundwater toward lower cultivated land. Too steep a slope can damage the channel; too flat a slope reduces flow. Keeping much of the route underground limits exposure to Turpan's heat and evaporation and protects the channel from surface disruption." },
    { id: "gravity-p2", type: "paragraph", text: "Do not upgrade that explanation to “no water loss” or “no maintenance.” Seepage, sediment, collapse and changing groundwater still matter. The most impressive achievement is not a mysterious self-running tunnel but repeated surveying, excavation, cleaning, repair and allocation. A water system is social and maintained as well as physical." },
    { id: "shafts-h", type: "heading", level: 2, text: "The line of shafts is a plan drawn on the ground" },
    { id: "shafts-p1", type: "paragraph", text: "From the surface, aligned mounds or openings can reveal the hidden direction of a gallery. Each shaft links surface work to the tunnel below. Count spacing only where the site permits and the exact karez is identified; distances vary. A round depression elsewhere in the landscape is not automatically a karez shaft." },
    { id: "shafts-p2", type: "paragraph", text: "Shafts are hazards and working infrastructure, not photo pits. Stay behind barriers, do not drop objects, and never enter an unapproved opening. A drone flight can also violate local aviation, heritage and privacy rules; absence of a visible sign is not permission." },
    { id: "tunnel-h", type: "heading", level: 2, text: "Inside the visitor route, separate water channel from access architecture" },
    { id: "tunnel-p1", type: "paragraph", text: "Look for the water line, gallery profile, tool or repair marks, lining and the visitor walkway. Which elements carry water, which protect the historic feature, and which were added for safe public access? Handrails, lights and widened passages are modern layers even when they make a real karez visible." },
    { id: "tunnel-p2", type: "paragraph", text: "Do not infer age from darkness, rough soil or dripping water. The label must identify the named karez, construction or recorded period, conservation work and whether the route is original, adapted or a demonstration. If underground access closes, use the section model and surface shaft line; the system can still be understood safely." },
    { id: "daylight-h", type: "heading", level: 2, text: "The most important transition may be where water reaches daylight" },
    { id: "daylight-p1", type: "paragraph", text: "At the outlet, the hidden engineering becomes a visible allocation problem. Follow the open canal toward a pond, gate or branch. Ask who manages the flow, how maintenance is organised, and whether the water you see belongs to the same documented system. Answers must come from site interpretation or a named management source, not assumptions about all Turpan communities." },
    { id: "daylight-p2", type: "paragraph", text: "Visible flow is dynamic evidence. Water may be seasonal, diverted, reduced or absent for maintenance. A dry display does not prove the historic system never worked; running water does not prove the channel is ancient or fully operational. Date your observation and keep the claim modest." },
    { id: "status-h", type: "heading", level: 2, text: "Use the heritage names correctly" },
    { id: "status-p1", type: "paragraph", text: "In 2024, the International Commission on Irrigation and Drainage recognised Turpan Karez as a World Heritage Irrigation Structure. WHIS is an ICID programme for historically significant irrigation structures. It is a real international recognition, but the word “World” does not make it UNESCO." },
    { id: "status-p2", type: "paragraph", text: "UNESCO's World Heritage Centre has a separate record: Karez Wells on China's Tentative List since 2008. A tentative listing is a state's possible future nomination, not inscription on the World Heritage List. Keep both statuses in captions and never merge their logos or dates." },
    { id: "route-h", type: "heading", level: 2, text: "A museum-to-water route with safe recovery options" },
    { id: "route-table", type: "table", caption: "Follow the system, not a spectacle", columns: ["Stop", "Task", "If unavailable"], rows: [["Museum model", "Trace the five components", "Use the official section graphic"], ["Surface shafts", "Find alignment without approaching openings", "Use a mapped photograph/model"], ["Authorised descent", "Separate access additions from water structure", "Stay above ground if closed"], ["Flow segment", "Record slope direction and label", "Use arrows/section, not visual guess"], ["Daylight canal", "Find transition and branching", "Use the operator's same-system map"], ["Distribution/storage", "Ask how water is allocated and maintained", "Keep the question open if no source answers"]] },
    { id: "misread-h", type: "heading", level: 2, text: "Do not turn engineering into mystery" },
    { id: "misread-list", type: "list", ordered: false, items: ["A visitor tunnel is not the complete network.", "“Ancient” needs a named karez and dated evidence, not an old-looking wall.", "Gravity flow does not mean no labour, loss or governance.", "ICID WHIS recognition is not UNESCO inscription.", "One local system cannot stand for every oasis community or every karez in Central Asia."] },
    { id: "who-h", type: "heading", level: 2, text: "Who should prioritise a karez visit?" },
    { id: "who-p", type: "paragraph", text: "Choose it if water engineering, landscape systems or the hidden infrastructure of an oasis interests you. It is less useful if you only want a cool tunnel or a single ancient object. Check the exact Karez Folk Custom Park/Museum operator for entry, underground access, accessibility and photography. Heat, stairs and enclosed passages can make the surface model the better option for some travelers; that does not reduce the intellectual task." },
    { id: "links", type: "internal-links", title: "Continue reading systems in place", items: [{ label: "How to visit an archaeological site museum", href: "/guides/how-to-visit-an-archaeological-site-museum/", description: "Separate original feature, protective access and interpretive model." }, { label: "Read heritage interventions in China", href: "/guides/how-to-read-heritage-sites-in-china/", description: "Judge repair and reconstruction component by component." }] },
    { id: "sources", type: "sources", title: "Core institutional sources reviewed", items: [{ label: "Turpan Karez — World Heritage Irrigation Structure", url: "https://icid-ciid.org/award/his_details/205", publisher: "International Commission on Irrigation and Drainage", reviewedAt: "2026-08-20" }, { label: "China government report on 2024 recognition", url: "https://english.www.gov.cn/news/202409/03/content_WS66d6a67ec6d0868f4e8ea848.html", publisher: "State Council of the People's Republic of China", reviewedAt: "2026-08-20" }, { label: "Karez Wells — Tentative List", url: "https://whc.unesco.org/en/tentativelists/5347/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-20" }, { label: "Gaochang District karez heritage report", url: "https://gcq.tlf.gov.cn/gcq/c116641/202409/35c946e60c724416b0e6ca03922410b0.shtml", publisher: "Gaochang District Government", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

const zh = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "在吐鲁番进入一段地下通道，并不等于看完坎儿井。完整坎儿井是一条路径：高处补给与地下水、缓坡暗渠、用于开挖和维护的竖井、出地后的明渠，再到涝坝或分水设施。博物馆通道让你检查其中一段；真正任务是把它重新接回看不见的系统，同时不凭外观猜年代和运行状态。" },
    { id: "answer", type: "callout", title: "直接答案", body: "先看剖面图，再在地表辨认竖井，只通过正式开放的游客路线下行，跟水走向地面，最后看储水或分配。吐鲁番坎儿井在2024年入选ICID世界灌溉工程遗产；这不是UNESCO世界遗产。UNESCO记录的是“中国预备名单上的坎儿井”。", tone: "decision" },
    { id: "parts-h", type: "heading", level: 2, text: "下洞前，先把完整水路拼出来" },
    { id: "parts-table", type: "table", caption: "相连的五个组成", columns: ["组成", "功能", "旅客可能看到什么"], rows: [["补给/水源区", "在较高位置补给地下水", "模型、地图或远景，未必能直接进入"], ["竖井", "出土、通风和维护入口", "地表成线洞口；绝不能进入"], ["地下暗渠", "沿受控缓坡靠重力输水", "正式参观通道或解释性水渠"], ["明渠", "水出地后继续输送", "运行时可见水流与分支"], ["涝坝/分水", "储存或向使用者分配", "水池、闸口、分叉或模型"]] },
    { id: "parts-p", type: "paragraph", text: "模型不是装饰。先用手指沿一条连续路径，再到真实游线逐项对照标签。若馆方把不同坎儿井组件组合展示，或游客道为方便参观而新建、改造，必须记录。没有运营方确认，不能把易走的通道写成未改动的历史工作暗渠。" },
    { id: "gravity-h", type: "heading", level: 2, text: "重力是把整个故事拴在一起的工程约束" },
    { id: "gravity-p1", type: "paragraph", text: "暗渠从较高地下水向较低农地保持轻微坡降，水因此流动。坡太陡可能冲坏渠道，太缓则流量不足。大部分路线置于地下，可减少在吐鲁番高温中的蒸发暴露，也降低地表干扰。" },
    { id: "gravity-p2", type: "paragraph", text: "不要把解释升级成“零损耗”“无需维护”。渗漏、淤积、坍塌和地下水变化仍然存在。最值得理解的不是神秘的自动水洞，而是测量、开挖、清淤、修缮与分水反复发生。一套水系既是物质工程，也是有人维护和治理的社会系统。" },
    { id: "shafts-h", type: "heading", level: 2, text: "成线竖井，是画在地面上的平面图" },
    { id: "shafts-p1", type: "paragraph", text: "地表排列的土堆或洞口，会暴露地下暗渠方向。每口竖井把地面施工与下方渠道相连。只有景区允许、且具体坎儿井身份明确时才观察间距；不同系统会变化。荒地里的圆形凹陷不自动等于坎儿井竖井。" },
    { id: "shafts-p2", type: "paragraph", text: "竖井是危险点和工作设施，不是拍照坑。留在围栏后，不投物，不进入任何未批准洞口。无人机也受空域、遗产和隐私规则约束；看不到禁止牌不等于获准。" },
    { id: "tunnel-h", type: "heading", level: 2, text: "在游客道里，分清水工结构和参观设施" },
    { id: "tunnel-p1", type: "paragraph", text: "寻找水线、渠体轮廓、工具或维修痕迹、衬砌和游客步道。哪些在输水，哪些保护历史设施，哪些为公开安全而后加？栏杆、照明和拓宽段即使让真实坎儿井可见，也属于现代层。" },
    { id: "tunnel-p2", type: "paragraph", text: "黑暗、粗糙土壁和滴水不能证明年代。标签应说明坎儿井名称、建设或记录时期、保护工作，以及通道是原渠、改造还是示范。地下关闭时，用剖面模型和地表竖井线即可安全完成系统阅读。" },
    { id: "daylight-h", type: "heading", level: 2, text: "水出地的一刻，可能是最重要的转折" },
    { id: "daylight-p1", type: "paragraph", text: "到出口，隐藏工程变成可见的分配问题。沿明渠找水池、闸门或分叉，问谁管理流量、维护怎样组织、眼前水是否属于同一套有记录的系统。答案必须来自景区解释或具名管理来源，不能把对某处的想象推广到所有吐鲁番社区。" },
    { id: "daylight-p2", type: "paragraph", text: "水流是动态证据，可能随季节、调度、维修而减少或中断。展示段干涸不能证明历史系统从未运行；有水也不能证明渠道古老且全线在用。给观察标日期，结论保持克制。" },
    { id: "status-h", type: "heading", level: 2, text: "遗产身份要用对名称" },
    { id: "status-p1", type: "paragraph", text: "2024年，国际灌排委员会（ICID）把吐鲁番坎儿井列入世界灌溉工程遗产。WHIS是ICID对历史重要灌溉工程的项目，属于真实国际认可，但名称里有“世界”不等于UNESCO。" },
    { id: "status-p2", type: "paragraph", text: "UNESCO世界遗产中心另有记录：中国自2008年把“坎儿井”列入预备名单。预备名单是国家未来可能提名的项目，不是已列入《世界遗产名录》。图片说明不要合并两种身份、标志和日期。" },
    { id: "route-h", type: "heading", level: 2, text: "从博物馆到水的安全游线" },
    { id: "route-table", type: "table", caption: "跟系统走，不跟刺激走", columns: ["停点", "任务", "不可用时"], rows: [["博物馆模型", "追踪五个组成", "用官方剖面图"], ["地表竖井", "隔离线后看排列", "看有定位的图片或模型"], ["正式下行口", "分开参观设施与水工结构", "关闭时留在地面"], ["有水段", "记录坡向和标签", "用箭头/剖面，不凭眼猜"], ["出地明渠", "找转折和分水", "看运营方同一系统图"], ["储水/分配", "询问维护与分水", "没有来源就保留问题"]] },
    { id: "misread-h", type: "heading", level: 2, text: "不要把工程写成神秘传说" },
    { id: "misread-list", type: "list", ordered: false, items: ["游客通道不是完整网络。", "“古老”要有具体坎儿井和断代证据，不靠旧墙外观。", "重力输水不等于无人劳动、没有损耗和治理。", "ICID世界灌溉工程遗产不是UNESCO世界遗产。", "一处系统不能代替所有绿洲社区或中亚坎儿井。"] },
    { id: "who-h", type: "heading", level: 2, text: "谁应该优先看坎儿井？" },
    { id: "who-p", type: "paragraph", text: "关心水利、景观系统或绿洲隐藏基础设施的人应优先。若只想进凉爽地洞或看单件古物，价值较低。以坎儿井民俗园/博物馆当日信息确认入场、地下开放、无障碍和摄影。高温、台阶与封闭空间对部分旅客不合适，改看地表模型不影响理解任务。" },
    { id: "links", type: "internal-links", title: "继续读现场系统", items: [{ label: "怎样参观考古遗址博物馆", href: "/zh/guides/how-to-visit-an-archaeological-site-museum/", description: "分清原设施、保护通道和解释模型。" }, { label: "看懂中国遗产干预", href: "/zh/guides/how-to-read-heritage-sites-in-china/", description: "逐构件判断修缮和复建。" }] },
    { id: "sources", type: "sources", title: "已核对的核心机构来源", items: [{ label: "吐鲁番坎儿井世界灌溉工程遗产", url: "https://icid-ciid.org/award/his_details/205", publisher: "国际灌排委员会", reviewedAt: "2026-08-20" }, { label: "中国政府关于2024年入选的报道", url: "https://english.www.gov.cn/news/202409/03/content_WS66d6a67ec6d0868f4e8ea848.html", publisher: "中华人民共和国国务院", reviewedAt: "2026-08-20" }, { label: "坎儿井UNESCO预备名单", url: "https://whc.unesco.org/en/tentativelists/5347/", publisher: "UNESCO世界遗产中心", reviewedAt: "2026-08-20" }, { label: "高昌区坎儿井保护资料", url: "https://gcq.tlf.gov.cn/gcq/c116641/202409/35c946e60c724416b0e6ca03922410b0.shtml", publisher: "高昌区人民政府", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

const ko = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "투루판에서 지하 통로 하나에 들어갔다고 카레즈 전체를 본 것은 아닙니다. 카레즈는 높은 곳의 지하수·함양, 완만한 지하 수로, 굴착·정비용 수직갱, 지상 개방 수로, 저수·분배로 이어지는 경로입니다. 박물관 터널은 한 구간을 보여 줍니다. 외형으로 연대·작동 상태를 추측하지 않고 보이지 않는 체계에 다시 연결하는 것이 과제입니다." },
    { id: "answer", type: "callout", title: "바로 답하면", body: "단면도부터 보고 지상 수직갱을 확인한 뒤 공식 관람 동선으로만 내려가 물이 지상으로 나오는 곳과 분배·저장까지 따라가세요. 투루판 카레즈는 2024년 ICID 세계관개시설유산으로 인정됐지만 UNESCO 세계유산 등재가 아닙니다. UNESCO에는 중국 잠정목록으로 올라 있습니다.", tone: "decision" },
    { id: "parts-h", type: "heading", level: 2, text: "터널에 들어가기 전에 전체 물길을 만드세요" },
    { id: "parts-table", type: "table", caption: "연결된 다섯 구성", columns: ["구성", "기능", "방문자가 볼 수 있는 것"], rows: [["함양/수원 구역", "높은 지대에서 지하수 공급", "모형·지도·먼 경관; 직접 접근은 아닐 수 있음"], ["수직갱", "토사 반출·환기·정비", "줄지은 지상 개구부; 절대 들어가지 않음"], ["지하 수로", "완만한 경사로 중력 송수", "공식 관람로·해석 수로"], ["개방 수로", "지상으로 나온 물 운반", "작동 시 흐름과 분기"], ["저수/분배", "저장 또는 이용자에게 배분", "못·수문·갈림·모형"]] },
    { id: "parts-p", type: "paragraph", text: "모형은 장식이 아닙니다. 한 경로를 손가락으로 잇고 실제 동선의 라벨과 대조하세요. 다른 카레즈 요소를 합쳤거나 관람 통로가 새로 만들어졌다면 기록합니다. 운영자 확인 없이 편한 터널을 손대지 않은 역사 작업 수로라고 하지 마세요." },
    { id: "gravity-h", type: "heading", level: 2, text: "중력은 이야기를 묶는 공학 제약입니다" },
    { id: "gravity-p1", type: "paragraph", text: "수로가 높은 지하수에서 낮은 경작지로 약한 경사를 유지해 물이 흐릅니다. 너무 가파르면 손상되고 너무 평평하면 흐름이 줄 수 있습니다. 대부분을 지하에 두면 투루판 열기와 증발 노출을 줄이고 지상 교란으로부터 보호합니다." },
    { id: "gravity-p2", type: "paragraph", text: "이를 ‘손실 없음’·‘정비 불필요’로 확대하지 마세요. 누수·퇴적·붕괴·지하수 변화가 있습니다. 성취는 신비한 자동 터널이 아니라 측량·굴착·청소·보수·분배의 반복입니다. 물 체계는 물질적이면서 사회적으로 유지·관리됩니다." },
    { id: "shafts-h", type: "heading", level: 2, text: "수직갱 열은 땅 위에 그린 평면도입니다" },
    { id: "shafts-p1", type: "paragraph", text: "정렬된 둔덕·구멍이 지하 수로 방향을 드러냅니다. 수직갱마다 지상 작업과 아래 수로가 연결됩니다. 정확한 카레즈가 확인되고 허용된 곳에서만 간격을 보세요. 체계마다 다르며 풍경 속 둥근 함몰이 자동으로 수직갱은 아닙니다." },
    { id: "shafts-p2", type: "paragraph", text: "수직갱은 위험 시설이지 사진 구덩이가 아닙니다. 장벽 뒤에 머물고 물건을 던지거나 비공식 개구부로 들어가지 않습니다. 드론도 공역·유산·사생활 규칙을 따르며 금지 표지 부재가 허가는 아닙니다." },
    { id: "tunnel-h", type: "heading", level: 2, text: "관람로 안에서 수로와 접근 시설을 분리하세요" },
    { id: "tunnel-p1", type: "paragraph", text: "수선·단면·도구/보수 흔적·라이닝·관람 보도를 찾으세요. 무엇이 물을 운반하고, 무엇이 역사 요소를 보호하며, 무엇이 안전 공개를 위해 추가됐습니까? 난간·조명·확폭은 실제 카레즈를 보여 줘도 현대 층입니다." },
    { id: "tunnel-p2", type: "paragraph", text: "어둠·거친 흙·물방울로 연대를 추정하지 마세요. 라벨이 이름, 건설/기록 시기, 보존 작업, 원수로·개조·시범 여부를 알려야 합니다. 지하가 닫히면 단면 모형과 지상 갱열로 안전하게 이해할 수 있습니다." },
    { id: "daylight-h", type: "heading", level: 2, text: "물이 지상에 나오는 전환이 가장 중요할 수 있습니다" },
    { id: "daylight-p1", type: "paragraph", text: "출구에서 숨은 공학은 배분 문제로 바뀝니다. 개방 수로를 따라 못·수문·갈림을 찾고 누가 흐름을 관리하고 정비하며, 같은 기록 체계의 물인지 묻습니다. 답은 현장 설명·명명된 관리 자료에서 얻고 모든 투루판 공동체에 일반화하지 않습니다." },
    { id: "daylight-p2", type: "paragraph", text: "흐르는 물은 동적 증거입니다. 계절·배분·정비로 줄거나 없을 수 있습니다. 마른 전시가 역사적 미작동을, 흐르는 물이 고대·전 구간 작동을 증명하지 않습니다. 관찰 날짜를 남기고 표현을 제한합니다." },
    { id: "status-h", type: "heading", level: 2, text: "유산 명칭을 정확히 쓰세요" },
    { id: "status-p1", type: "paragraph", text: "2024년 국제관개배수위원회(ICID)는 투루판 카레즈를 세계관개시설유산으로 인정했습니다. WHIS는 역사적으로 중요한 관개 구조를 위한 ICID 프로그램입니다. 실제 국제 인정이지만 ‘World’가 UNESCO를 뜻하지 않습니다." },
    { id: "status-p2", type: "paragraph", text: "UNESCO 세계유산센터에는 별도 기록이 있습니다. 중국의 ‘Karez Wells’는 2008년부터 잠정목록에 있습니다. 잠정목록은 향후 후보이지 세계유산목록 등재가 아닙니다. 캡션에서 두 지위·로고·날짜를 합치지 마세요." },
    { id: "route-h", type: "heading", level: 2, text: "박물관에서 물까지 안전한 복구 동선" },
    { id: "route-table", type: "table", caption: "구경거리보다 체계 따라가기", columns: ["지점", "과제", "대안"], rows: [["박물관 모형", "다섯 요소 연결", "공식 단면도"], ["지상 수직갱", "개구부에 접근하지 않고 정렬 보기", "위치 확인 사진/모형"], ["공식 하강로", "접근 추가물과 수공 구조 분리", "폐쇄 시 지상에 머물기"], ["흐름 구간", "경사 방향과 라벨 기록", "눈짐작 말고 화살표/단면"], ["지상 수로", "전환과 분기 찾기", "운영자 동일 체계 지도"], ["분배/저장", "관리·정비 질문", "출처 없으면 미답으로 두기"]] },
    { id: "misread-h", type: "heading", level: 2, text: "공학을 신비로 만들지 마세요" },
    { id: "misread-list", type: "list", ordered: false, items: ["관람 터널은 전체망이 아닙니다.", "‘고대’는 낡아 보이는 벽이 아니라 이름·연대 증거가 필요합니다.", "중력 흐름은 노동·손실·관리 없음이 아닙니다.", "ICID WHIS는 UNESCO 등재가 아닙니다.", "한 현장이 모든 오아시스 공동체·중앙아시아 카레즈를 대표하지 않습니다."] },
    { id: "who-h", type: "heading", level: 2, text: "누가 카레즈를 우선해야 할까요?" },
    { id: "who-p", type: "paragraph", text: "수공학·경관 체계·오아시스의 숨은 기반시설에 관심 있으면 선택하세요. 시원한 터널·고대 물건 하나만 원하면 약합니다. 정확한 민속원/박물관의 입장·지하 개방·무장애·촬영을 확인하세요. 더위·계단·폐쇄 공간 때문에 지상 모형이 나은 여행자도 있으며 지적 과제는 줄지 않습니다." },
    { id: "links", type: "internal-links", title: "현장 체계 계속 읽기", items: [{ label: "고고유적 박물관 방문법", href: "/ko/guides/how-to-visit-an-archaeological-site-museum/", description: "원 구조·보호 접근·해석 모형을 분리합니다." }, { label: "중국 유산 개입 읽기", href: "/ko/guides/how-to-read-heritage-sites-in-china/", description: "구성요소별로 보수·재건을 판단합니다." }] },
    { id: "sources", type: "sources", title: "검토한 핵심 기관 자료", items: [{ label: "투루판 카레즈 세계관개시설유산", url: "https://icid-ciid.org/award/his_details/205", publisher: "국제관개배수위원회", reviewedAt: "2026-08-20" }, { label: "2024년 인정 중국 정부 보도", url: "https://english.www.gov.cn/news/202409/03/content_WS66d6a67ec6d0868f4e8ea848.html", publisher: "중화인민공화국 국무원", reviewedAt: "2026-08-20" }, { label: "카레즈 UNESCO 잠정목록", url: "https://whc.unesco.org/en/tentativelists/5347/", publisher: "UNESCO 세계유산센터", reviewedAt: "2026-08-20" }, { label: "가오창구 카레즈 보호 자료", url: "https://gcq.tlf.gov.cn/gcq/c116641/202409/35c946e60c724416b0e6ca03922410b0.shtml", publisher: "가오창구 인민정부", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

export const bodies = { en, zh, ko };
