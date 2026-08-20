import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const en = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Qufu's “Three Confucian Sites” are not three versions of the same attraction. The Temple asks how Confucius was commemorated and ritually honoured; the Kong Family Mansion shows how his recognised descendants lived and administered lineage responsibilities; the Cemetery is a burial landscape formed over many generations. The best first-time sequence is usually Temple → Mansion → Cemetery, but only if you have the time and mobility to give the separate cemetery its own attention." },
    { id: "answer", type: "callout", title: "Choose by question", body: "Choose the Temple for monumental commemoration and architectural sequence; the Mansion for lineage administration and domestic thresholds; the Cemetery for long-duration landscape and burial memory. With limited time, Temple + Mansion is the coherent adjacent pair. This is Homeground's editorial judgment, not an official compulsory order.", tone: "decision" },
    { id: "three-h", type: "heading", level: 2, text: "Three properties, three kinds of evidence" },
    { id: "three-table", type: "table", caption: "Do not ask one site to answer another's question", columns: ["Property", "Primary reading", "Do not mistake it for"], rows: [["Temple of Confucius (孔庙)", "Commemoration, sacrifice, imperial patronage and repeated rebuilding", "Confucius's surviving school or house"], ["Kong Family Mansion (孔府)", "Residential and administrative life of the recognised Kong lineage", "Confucius's personal residence"], ["Cemetery of Confucius (孔林)", "Burial, lineage duration, inscriptions and managed woodland", "A generic scenic forest or one-period cemetery"]] },
    { id: "unesco-h", type: "heading", level: 2, text: "What World Heritage status does—and does not—tell you" },
    { id: "unesco-p1", type: "paragraph", text: "UNESCO inscribed the Temple, Cemetery and Kong Family Mansion together in 1994. The property expresses a long history of commemoration, lineage and architectural development. Joint inscription does not mean the three sites occupy one enclosure, share one function or contain material from one date." },
    { id: "unesco-p2", type: "paragraph", text: "The complexes were enlarged, rebuilt and repaired across centuries. Ask about each gate, hall, residence, stele or tomb marker individually. “World Heritage” is not a material-age label stamped on every tile. For a national vocabulary of surviving fabric and reconstruction, use Homeground's heritage-intervention guide rather than guessing by appearance." },
    { id: "temple-h", type: "heading", level: 2, text: "At the Temple, read repetition and approach" },
    { id: "temple-p1", type: "paragraph", text: "The Temple's long axial approach slows entry through named gates and courtyards before major halls such as Dacheng Hall. Count transitions rather than rushing to the largest roof. Each threshold increases formality and separates the street from the core commemorative space. Read plaques and labels for building date, repair and patronage; the sequence is historic, but no visitor should assume every visible surface belongs to Confucius's lifetime." },
    { id: "temple-p2", type: "paragraph", text: "The Temple is also a place of ritual meaning and, at times, living practice. Ordinary visitors are not required by this article to offer incense, bow or imitate participants. Stand out of processional routes, follow staff directions and never stage a ritual photograph. If an event closes a hall, read the approach, stele pavilion or exterior label instead of treating access as an entitlement." },
    { id: "mansion-h", type: "heading", level: 2, text: "At the Mansion, look for the line between office and household" },
    { id: "mansion-p1", type: "paragraph", text: "The Kong Family Mansion stood beside the Temple because recognised descendants held responsibilities that were familial, ceremonial and administrative. On site, look for the transition from public-facing offices to more restricted residential space. A threshold, screen, side passage or room label can reveal hierarchy more reliably than a furnished tableau." },
    { id: "mansion-p2", type: "paragraph", text: "Do not call it “Confucius's house.” The Mansion's history belongs to later generations and developed over time. Furniture and domestic scenes may be original, later, restored, replaced or staged; the object label must decide. If interiors are crowded or closed, use the plan and exterior ordering to reconstruct public-to-private movement without peering through barriers." },
    { id: "cemetery-h", type: "heading", level: 2, text: "At the Cemetery, change pace and visual language" },
    { id: "cemetery-p1", type: "paragraph", text: "The Cemetery is physically separate and extends the story from architecture to land, trees, paths, tombs and inscriptions. Its duration is visible in differences of marker, scale, condition and location. Do not use one ornate tomb to represent the entire lineage, and do not assume every mound or stone can be identified without a map." },
    { id: "cemetery-p2", type: "paragraph", text: "Treat it as a burial place. Keep voices and group posing restrained, do not touch offerings or markers, and avoid photographing mourners, worshippers or maintenance workers as cultural scenery. Photography of the Confucius tomb area should follow current site rules; an image that is legally possible can still be editorially disrespectful." },
    { id: "choice-h", type: "heading", level: 2, text: "Which site should you cut when time or energy is limited?" },
    { id: "choice-table", type: "table", caption: "Make one honest choice", columns: ["Traveler", "Best choice", "Why"], rows: [["First visit, one compact block", "Temple + Mansion", "Adjacent sites give commemoration and lineage administration without pretending the Cemetery is nearby"], ["Architecture-focused", "Temple first", "Strongest monumental sequence and named halls"], ["Social/family history", "Mansion, then Temple", "Start with the institution behind ritual continuity"], ["Landscape/epigraphy", "Cemetery with enough time", "Paths and inscriptions need slower, separate attention"], ["Limited walking or heat tolerance", "Short Temple route; confirm accessibility", "Cemetery distance and surfaces may add strain"], ["Repeat visitor", "Whichever property was rushed previously", "Depth is more useful than checking three boxes"]] },
    { id: "order-h", type: "heading", level: 2, text: "A full sequence that preserves the conceptual arc" },
    { id: "order-list", type: "list", ordered: true, items: ["At the Temple entrance, photograph the official map and mark the main axial thresholds.", "At Dacheng Hall, separate commemorative function, building history and any current ritual use.", "Cross to the Mansion and follow office-to-household transitions rather than every furnished room.", "Pause before transferring to the Cemetery; confirm current admission/transport instead of assuming a continuous walk.", "At the Cemetery, choose one route and three identified markers rather than chasing every mound.", "End by writing one sentence for each property: commemoration, lineage administration, burial landscape."] },
    { id: "failure-h", type: "heading", level: 2, text: "What to do when tickets, routes or ceremonies change" },
    { id: "failure-p", type: "paragraph", text: "Ticket bundles, identity checks, entrances, shuttles and event controls are dynamic. Recheck the official operator shortly before travel. If one property is unavailable, do not replace it with a claim that the other two show the same thing. State the missing function. If an active ceremony occupies a space, step back; interpretation can continue through architecture and labels without watching or recording participants." },
    { id: "misread-h", type: "heading", level: 2, text: "Do not leave Qufu with these shortcuts" },
    { id: "misread-list", type: "list", ordered: false, items: ["The Mansion is not Confucius's preserved home.", "The Temple is not a single building from 478 BCE.", "The Cemetery is not merely a park with a famous tomb.", "World Heritage status does not make every component original.", "A visitor performance or current ceremony is not a transparent replay of one ancient rite."] },
    { id: "who-h", type: "heading", level: 2, text: "Who should plan all three?" },
    { id: "who-p", type: "paragraph", text: "Plan all three if you want to understand how a person's commemoration became architecture, family administration and a multi-generational landscape. Choose one or two without guilt if time, mobility or interest is narrower. This page does not teach worship or judge belief. Current opening, passports, accessible route, photography and event restrictions belong to the official operator and on-site staff." },
    { id: "links", type: "internal-links", title: "Continue reading cultural sites carefully", items: [{ label: "Read heritage interventions in China", href: "/guides/how-to-read-heritage-sites-in-china/", description: "Avoid treating every World Heritage component as the same age." }, { label: "Visit a living Mazu belief space respectfully", href: "/guides/meizhou-mazu-ancestral-temple-reading-guide/", description: "Carry the same distinction between architecture, tradition and current practice." }] },
    { id: "sources", type: "sources", title: "Core heritage and operator sources reviewed", items: [{ label: "Temple and Cemetery of Confucius and the Kong Family Mansion", url: "https://whc.unesco.org/en/list/704/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-20" }, { label: "UNESCO property documents", url: "https://whc.unesco.org/en/list/704/documents/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-20" }, { label: "Qufu Three Confucian Sites operator", url: "https://www.qfskly.com/", publisher: "Qufu Three Confucian Sites", reviewedAt: "2026-08-20" }, { label: "Jining cultural-heritage update", url: "https://whlyj.jining.gov.cn/art/2025/1/16/art_66896_2705656.html", publisher: "Jining Culture and Tourism Bureau", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

const zh = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "曲阜“三孔”不是同一景点的三个版本。孔庙回答孔子怎样被纪念和祭祀；孔府展示孔子后裔怎样生活并承担家族、礼仪和管理职责；孔林是一片跨越多代形成的墓葬景观。第一次完整参观通常可按孔庙—孔府—孔林，但前提是时间和体力足以把位置分开的孔林认真看完。" },
    { id: "answer", type: "callout", title: "按问题选择", body: "想看纪念建筑与空间序列，选孔庙；想看宗族管理和内外门槛，选孔府；想看长期墓葬景观，选孔林。时间有限时，孔庙加孔府是相邻且逻辑完整的一组。这是Homeground编辑判断，不是官方强制顺序。", tone: "decision" },
    { id: "three-h", type: "heading", level: 2, text: "三处遗产，三种证据" },
    { id: "three-table", type: "table", caption: "不要让一处回答另一处的问题", columns: ["地点", "主要阅读任务", "不要误认成"], rows: [["孔庙", "纪念、祭祀、国家支持与历代重建", "孔子保存至今的学堂或住宅"], ["孔府", "孔氏后裔的生活与管理", "孔子个人故居"], ["孔林", "墓葬、家族延续、碑刻与经营林地", "普通风景林或单一时代墓园"]] },
    { id: "unesco-h", type: "heading", level: 2, text: "世界遗产身份能说明什么，不能说明什么？" },
    { id: "unesco-p1", type: "paragraph", text: "1994年，UNESCO把孔庙、孔林和孔府作为同一世界遗产列入名录，体现长期纪念、宗族延续和建筑发展。共同列入不代表三处位于同一围墙、功能相同或材料同龄。" },
    { id: "unesco-p2", type: "paragraph", text: "三处都经历过扩建、重建和维修。判断要落实到具体门、殿、住宅、碑或墓标。“世界遗产”不是贴在每片瓦上的材料年代标签。若要判断原构、维修与复建，应使用Homeground遗产干预指南，不凭外观。" },
    { id: "temple-h", type: "heading", level: 2, text: "在孔庙，读重复门槛与接近过程" },
    { id: "temple-p1", type: "paragraph", text: "孔庙漫长轴线通过多重门与院落，逐步接近大成殿等核心空间。不要一进门就冲向最大屋顶，先数每次转换：它怎样把街道与正式纪念空间分开。建筑年代、维修和主持者要看匾牌、说明；序列有历史，却不能把每个可见表面都推回孔子时代。" },
    { id: "temple-p2", type: "paragraph", text: "孔庙也承载礼仪意义，并可能出现活态实践。本文不要求普通游客上香、行礼或模仿参与者。避开仪式通道，听从工作人员，不为照片摆拍礼仪。活动使殿堂关闭时，可退看门序、碑亭和外部说明，不把进入视作权利。" },
    { id: "mansion-h", type: "heading", level: 2, text: "在孔府，找办公与家庭之间的线" },
    { id: "mansion-p1", type: "paragraph", text: "孔府与孔庙相邻，因为受承认的孔氏后裔同时承担家族、礼仪和管理职责。沿现场寻找从对外办公到限制更多的居住区的转换。门槛、影壁、侧路和房间标签，比布置好的家具更能说明等级。" },
    { id: "mansion-p2", type: "paragraph", text: "不要称它为“孔子故居”。孔府属于后代，并持续发展。家具和生活场景可能是原件、后添、修复、替换或布景，只能由标签判断。室内拥挤或关闭时，用平面和外部顺序恢复公私转换，不窥探围挡。" },
    { id: "cemetery-h", type: "heading", level: 2, text: "到了孔林，要改变速度和图片语言" },
    { id: "cemetery-p1", type: "paragraph", text: "孔林与前两处位置分开，把故事从建筑延伸到土地、树木、道路、墓葬和碑刻。长期性体现在墓标、尺度、保存状态和位置差异。不要用一座华丽墓碑代表整个宗族，也不要在没有地图时给每个土丘和石头命名。" },
    { id: "cemetery-p2", type: "paragraph", text: "把它当墓地。降低音量和合影表演，不触供品、碑与墓标，不把悼念者、礼拜者和维护人员拍成文化风景。孔子墓区域摄影应服从当天规定；法律上能拍的画面，也可能在编辑伦理上不适合公开。" },
    { id: "choice-h", type: "heading", level: 2, text: "时间或体力有限，应删哪一处？" },
    { id: "choice-table", type: "table", caption: "做一个诚实选择", columns: ["旅客", "最佳选择", "原因"], rows: [["初访、只够紧凑半天", "孔庙+孔府", "相邻，兼有纪念和家族管理，不假装孔林也在旁边"], ["偏建筑", "先孔庙", "纪念轴线和具名殿宇最强"], ["偏社会/家族史", "孔府，再孔庙", "从维系仪式的机构开始"], ["偏景观/碑刻", "给孔林足够时间", "道路与碑刻需要慢看"], ["步行能力或耐热有限", "孔庙短线并确认无障碍", "孔林距离与地面可能增加负担"], ["重访", "上次匆忙的一处", "深读比凑齐三处有用"]] },
    { id: "order-h", type: "heading", level: 2, text: "保持概念弧线的完整顺序" },
    { id: "order-list", type: "list", ordered: true, items: ["孔庙入口拍官方图，标出主要轴线门槛。", "到大成殿分清纪念功能、建筑沿革和当天礼仪使用。", "转孔府，沿办公到家庭的转换走，不求看完每间布景房。", "去孔林前停一下，确认当天票务和转移方式，不假定连续步行。", "孔林只选一条路和三处有身份的墓碑，不追所有土丘。", "最后给三处各写一句：纪念、家族管理、墓葬景观。"] },
    { id: "failure-h", type: "heading", level: 2, text: "票务、动线或仪式变化时怎么办？" },
    { id: "failure-p", type: "paragraph", text: "联票、证件查验、入口、接驳和活动管控都会变化，临行前查官方运营方。一处不可用时，不要说另外两处展示了相同内容，要明确缺少哪个功能。活态仪式占用空间时退开；即使不围观、不录像，也能通过建筑和标签继续理解。" },
    { id: "misread-h", type: "heading", level: 2, text: "不要带走这些曲阜捷径" },
    { id: "misread-list", type: "list", ordered: false, items: ["孔府不是孔子保存至今的住宅。", "孔庙不是一座公元前478年的单体原建筑。", "孔林不只是有名人墓的公园。", "世界遗产不等于每个构件都是原构。", "游客表演或今日仪式不是某种古礼的透明重放。"] },
    { id: "who-h", type: "heading", level: 2, text: "谁值得安排完整三孔？" },
    { id: "who-p", type: "paragraph", text: "若你想看一个人的纪念怎样变成建筑、家族管理与多代景观，安排三处。时间、体力或兴趣更窄，选一两处无需内疚。本文不教礼拜，也不评价信念。开放、护照、无障碍、摄影和活动限制，以官方运营方和现场人员为准。" },
    { id: "links", type: "internal-links", title: "继续谨慎阅读文化地点", items: [{ label: "看懂中国遗产干预", href: "/zh/guides/how-to-read-heritage-sites-in-china/", description: "避免把世界遗产所有构件写成同龄原物。" }, { label: "尊重地参观湄洲妈祖信俗空间", href: "/zh/guides/meizhou-mazu-ancestral-temple-reading-guide/", description: "继续区分建筑、传统与当代实践。" }] },
    { id: "sources", type: "sources", title: "已核对的遗产与运营来源", items: [{ label: "曲阜孔庙、孔林和孔府", url: "https://whc.unesco.org/en/list/704/", publisher: "UNESCO世界遗产中心", reviewedAt: "2026-08-20" }, { label: "UNESCO遗产档案", url: "https://whc.unesco.org/en/list/704/documents/", publisher: "UNESCO世界遗产中心", reviewedAt: "2026-08-20" }, { label: "曲阜三孔景区官方", url: "https://www.qfskly.com/", publisher: "曲阜三孔景区", reviewedAt: "2026-08-20" }, { label: "济宁文物保护资料", url: "https://whlyj.jining.gov.cn/art/2025/1/16/art_66896_2705656.html", publisher: "济宁市文化和旅游局", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

const ko = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "취푸 ‘삼공’은 같은 명소의 세 버전이 아닙니다. 공묘는 공자가 어떻게 기념·제향되었는지, 공부는 공인된 후손이 가문 책임을 관리하며 어떻게 살았는지, 공림은 여러 세대에 걸친 묘역 경관을 보여 줍니다. 첫 방문은 공묘→공부→공림이 보통 좋지만 떨어진 공림을 충분히 볼 시간과 체력이 있을 때만 그렇습니다." },
    { id: "answer", type: "callout", title: "질문으로 고르세요", body: "기념 건축·축선은 공묘, 가문 운영·생활 문턱은 공부, 장기 묘역 경관은 공림입니다. 시간이 짧으면 인접한 공묘+공부가 논리적으로 완결됩니다. Homeground 편집 판단이며 공식 강제 순서는 아닙니다.", tone: "decision" },
    { id: "three-h", type: "heading", level: 2, text: "세 유산, 세 종류의 증거" },
    { id: "three-table", type: "table", caption: "한 장소에 다른 장소의 질문을 맡기지 마세요", columns: ["유산", "핵심 읽기", "오해하지 말 것"], rows: [["공묘", "기념·제향·국가 후원·반복 재건", "공자의 남은 학교·집"], ["공부", "공씨 후손의 거주·행정", "공자 개인 주택"], ["공림", "매장·가문 지속·비문·관리된 숲", "일반 경승림·한 시기 묘지"]] },
    { id: "unesco-h", type: "heading", level: 2, text: "세계유산 지위가 말하는 것과 아닌 것" },
    { id: "unesco-p1", type: "paragraph", text: "UNESCO는 1994년 공묘·공림·공부를 함께 등재했습니다. 오랜 기념, 가문, 건축 발전을 보여 줍니다. 공동 등재가 같은 담장·기능·재료 연대를 뜻하지 않습니다." },
    { id: "unesco-p2", type: "paragraph", text: "수세기 동안 확장·재건·보수가 있었습니다. 문·전각·주택·비석·묘표마다 따로 물으세요. 세계유산은 기와마다 찍힌 연대 표지가 아닙니다. 원형·재건 판단은 외형이 아니라 유산 개입 가이드를 씁니다." },
    { id: "temple-h", type: "heading", level: 2, text: "공묘에서는 반복되는 문턱과 접근을 읽으세요" },
    { id: "temple-p1", type: "paragraph", text: "긴 축은 이름 있는 문과 중정을 거쳐 다청뎬 같은 중심으로 갑니다. 큰 지붕으로 곧장 가지 말고 거리에서 공식 기념 공간으로 격식이 높아지는 전환을 세세요. 건물 연대·보수·후원은 라벨로 확인하며 모든 표면을 공자 생전으로 돌리지 않습니다." },
    { id: "temple-p2", type: "paragraph", text: "공묘는 의례 의미와 때로 현재 실천도 있는 곳입니다. 일반 방문자에게 향·절·모방을 요구하지 않습니다. 행렬 동선을 비우고 직원 지시를 따르며 사진용 의례를 연출하지 마세요. 행사로 전각이 닫히면 문·비정·외부 라벨을 읽습니다." },
    { id: "mansion-h", type: "heading", level: 2, text: "공부에서는 업무와 가정 사이의 선을 찾으세요" },
    { id: "mansion-p1", type: "paragraph", text: "공부가 공묘 옆인 것은 공인된 후손에게 가문·의례·행정 책임이 있었기 때문입니다. 외부 업무에서 더 제한된 거주 공간으로 바뀌는 지점을 찾으세요. 문턱·영벽·옆길·방 라벨이 가구 연출보다 위계를 잘 말합니다." },
    { id: "mansion-p2", type: "paragraph", text: "‘공자의 집’이라고 하지 마세요. 공부는 후대의 역사입니다. 가구·생활 장면은 원물·후대·복원·교체·연출일 수 있어 라벨이 결정합니다. 내부가 혼잡·폐쇄되면 평면과 외부 순서로 공사 전환을 읽고 장벽 안을 들여다보지 않습니다." },
    { id: "cemetery-h", type: "heading", level: 2, text: "공림에서는 속도와 사진 언어를 바꾸세요" },
    { id: "cemetery-p1", type: "paragraph", text: "공림은 떨어져 있으며 건축에서 땅·나무·길·묘·비문으로 이야기를 확장합니다. 묘표·규모·상태·위치의 차이가 시간을 보여 줍니다. 화려한 묘 하나로 가문 전체를 대표하지 말고 지도 없이 봉분·돌에 이름을 붙이지 않습니다." },
    { id: "cemetery-p2", type: "paragraph", text: "묘지로 대하세요. 목소리·단체 포즈를 줄이고 공물·표석을 만지지 않으며 추모자·예배자·관리자를 경관으로 찍지 않습니다. 공자묘 구역 촬영은 현행 규칙을 따르고 법적으로 가능한 사진도 편집상 무례할 수 있음을 기억하세요." },
    { id: "choice-h", type: "heading", level: 2, text: "시간·체력이 짧으면 무엇을 뺄까요?" },
    { id: "choice-table", type: "table", caption: "정직한 선택 하나", columns: ["여행자", "추천", "이유"], rows: [["첫 방문, 짧은 블록", "공묘+공부", "인접해 기념·가문 운영을 잇고 공림이 옆인 척하지 않음"], ["건축 중심", "공묘 먼저", "기념 축선·명명 전각이 강함"], ["사회/가족사", "공부→공묘", "의례를 유지한 기관에서 시작"], ["경관/비문", "공림에 충분한 시간", "길과 비문은 느리게 봐야 함"], ["보행·더위 제한", "짧은 공묘+무장애 확인", "공림 거리·지면 부담"], ["재방문", "지난번 서두른 한 곳", "세 곳 체크보다 깊이가 유용"]] },
    { id: "order-h", type: "heading", level: 2, text: "개념 흐름을 지키는 전체 순서" },
    { id: "order-list", type: "list", ordered: true, items: ["공묘 입구 공식 지도를 찍고 축선 문턱을 표시합니다.", "다청뎬에서 기념 기능·건축사·현재 의례를 분리합니다.", "공부로 가 업무→가정 전환을 따르고 모든 연출 방을 보려 하지 않습니다.", "공림 이동 전 당일 입장·교통을 확인하고 연속 도보를 가정하지 않습니다.", "공림에서 한 경로·확인된 표석 세 개만 고릅니다.", "각 장소를 한 문장으로 정리: 기념, 가문 행정, 묘역 경관."] },
    { id: "failure-h", type: "heading", level: 2, text: "티켓·동선·행사가 바뀌면" },
    { id: "failure-p", type: "paragraph", text: "통합권·신분 확인·입구·셔틀·행사 통제는 변합니다. 출발 직전 운영자를 확인하세요. 한 곳이 닫히면 다른 둘이 같은 내용을 보여 준다고 하지 말고 빠진 기능을 적습니다. 살아 있는 의례가 공간을 쓰면 물러서고 참가자 관찰·촬영 없이 건축·라벨로 이해를 이어갑니다." },
    { id: "misread-h", type: "heading", level: 2, text: "취푸에서 이 지름길은 버리세요" },
    { id: "misread-list", type: "list", ordered: false, items: ["공부는 공자의 보존 주택이 아닙니다.", "공묘는 기원전 478년 단일 원건축이 아닙니다.", "공림은 유명 무덤 있는 공원이 아닙니다.", "세계유산은 모든 부재의 원형을 뜻하지 않습니다.", "관광 공연·현재 의례는 고대 의례의 투명한 재생이 아닙니다."] },
    { id: "who-h", type: "heading", level: 2, text: "누가 세 곳을 모두 봐야 할까요?" },
    { id: "who-p", type: "paragraph", text: "한 사람의 기념이 건축·가문 행정·다세대 경관이 된 과정을 알고 싶으면 모두 보세요. 시간·체력·관심이 좁다면 한두 곳으로 충분합니다. 이 글은 예배를 가르치거나 믿음을 판단하지 않습니다. 개방·여권·무장애·촬영·행사 제한은 공식 운영자와 현장 직원이 결정합니다." },
    { id: "links", type: "internal-links", title: "문화 공간 신중하게 계속 읽기", items: [{ label: "중국 유산 개입 읽기", href: "/ko/guides/how-to-read-heritage-sites-in-china/", description: "세계유산의 모든 요소를 같은 연대 원형으로 보지 않습니다." }, { label: "메이저우 마조 신앙 공간 존중 방문", href: "/ko/guides/meizhou-mazu-ancestral-temple-reading-guide/", description: "건축·전통·현재 실천을 계속 구분합니다." }] },
    { id: "sources", type: "sources", title: "검토한 유산·운영 자료", items: [{ label: "취푸 공묘·공림·공부", url: "https://whc.unesco.org/en/list/704/", publisher: "UNESCO 세계유산센터", reviewedAt: "2026-08-20" }, { label: "UNESCO 유산 문서", url: "https://whc.unesco.org/en/list/704/documents/", publisher: "UNESCO 세계유산센터", reviewedAt: "2026-08-20" }, { label: "취푸 삼공 공식 운영자", url: "https://www.qfskly.com/", publisher: "취푸 삼공", reviewedAt: "2026-08-20" }, { label: "지닝 문화유산 자료", url: "https://whlyj.jining.gov.cn/art/2025/1/16/art_66896_2705656.html", publisher: "지닝시 문화여유국", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

export const bodies = { en, zh, ko };
