import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const en = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "At Xi'an Beilin, a single black-and-white rubbing can make four different things look identical: an old text, a calligrapher's writing, a carver's work and a later paper impression. They are related, but they may have different makers and dates. The museum becomes readable when you stop asking only “How old is this?” and reconstruct the chain from words to writing, stone and rubbing." },
    { id: "answer", type: "callout", title: "The direct answer", body: "For every stele, record four fields: what text it carries; whose handwriting or model it follows; when and by whom the stone was carved; and when, where and from which surface a rubbing was taken. If the label does not answer one field, leave it unknown.", tone: "decision" },
    { id: "four-h", type: "heading", level: 2, text: "One inscription can have four material lives" },
    { id: "four-table", type: "table", caption: "Do not collapse these objects", columns: ["Object", "What it is", "Typical mistake"], rows: [["Text", "The wording and its textual tradition", "Assuming the words were composed when this stone was carved"], ["Calligraphy", "A handwriting model, style or signed hand", "Assuming the named calligrapher cut the stone"], ["Stele", "The inscribed stone made and installed at a particular time", "Assuming it is the first physical carrier of the text"], ["Rubbing", "Ink-on-paper transfer taken from a surface", "Calling it the original manuscript or the stone itself"]] },
    { id: "label-h", type: "heading", level: 2, text: "Read the label in a fixed order" },
    { id: "label-list", type: "list", ordered: true, items: ["Title and text: is this a classic, edict, epitaph, record, image or later copy?", "Text date: when were the words first composed or compiled?", "Writing: is a calligrapher named, copied, attributed or represented by a later model?", "Engraving: when was this particular stone cut, and is a carver or patron named?", "Object history: where did the stone stand, move, break, weather or enter Beilin?", "Display status: original stone, recut version, cast, facsimile or digital reproduction?"] },
    { id: "label-p", type: "paragraph", text: "Photograph the label with the object number before making a close-up. Do not publish a full modern translation panel merely because photography is allowed; translation copyright and museum reproduction conditions are separate from the age of the classical text." },
    { id: "classics-h", type: "heading", level: 2, text: "The Kaicheng Stone Classics make the text–stone difference visible" },
    { id: "classics-p1", type: "paragraph", text: "Beilin's institutional account describes the Kaicheng Stone Classics as 114 stones with 228 inscribed faces. They monumentalised a canon in the Tang period, but the intellectual texts they transmit are older than the engraving project. The number is memorable because it forces a scale change: a “book” can become architecture and public reference when copied across stone surfaces." },
    { id: "classics-p2", type: "paragraph", text: "Do not treat the stones as a pristine frozen edition. Texts have transmission histories; stones weather, break, move and receive conservation. Select one labelled face. Find the reading direction, column organisation, missing areas and repairs. What is legible to you, what depends on a transcription, and what has the museum supplied as modern interpretation?" },
    { id: "strokes-h", type: "heading", level: 2, text: "Look at a stroke as writing and as carving" },
    { id: "strokes-p1", type: "paragraph", text: "From a respectful distance, compare changes in thickness, turn, balance and spacing. Those are calligraphic qualities. Then notice cut edges, chipped corners, surface wear and tool translation. Those belong to the stone and the process of engraving. A carved line preserves a model through another craft; it is not ink left by the calligrapher's brush." },
    { id: "strokes-p2", type: "paragraph", text: "This distinction prevents a common superlative: “the master's original handwriting.” A stele may preserve a highly valued calligraphic model while the physical stone was cut later, copied from another carrier or recut. Use the museum's exact wording—written by, attributed to, copied after, engraved in—rather than upgrading the claim." },
    { id: "rubbing-h", type: "heading", level: 2, text: "A rubbing is a record with its own date and distortions" },
    { id: "rubbing-p1", type: "paragraph", text: "Traditional rubbing places paper against the surface and applies ink so recessed and raised areas become a high-contrast image. Technique, paper, ink, pressure, stone condition and later mounting affect the result. A rubbing can preserve details later lost from a stone, but it can also crop, flatten or emphasise them." },
    { id: "rubbing-p2", type: "paragraph", text: "When viewing or buying one, ask: which exact stone or face, when taken, by whom or which institution, whether it is an authorised new impression, reproduction of an older rubbing, or digital print. Never rub a protected surface yourself. The absence of a demonstration on your visit is not a failure; the object chain is the real task." },
    { id: "route-h", type: "heading", level: 2, text: "Use the historic precinct and 2025 extension for different jobs" },
    { id: "route-p1", type: "paragraph", text: "The museum fully opened its expanded configuration in 2025, combining the historic Beilin courtyards with a north extension. Use the old precinct to feel the density, scale, light and long-term housing of stone. Use the newer galleries for thematic comparison, controlled display and clearer object context. “New building” does not mean secondary evidence; it may make the label chain easier to read." },
    { id: "route-table", type: "table", caption: "A four-object route", columns: ["Stop", "Task", "Fallback"], rows: [["Orientation map", "Separate historic precinct and north extension", "Ask staff which galleries are open"], ["Kaicheng Classics", "Separate text date from engraving date", "Choose another labelled canonical-stone display"], ["Calligraphy stele", "Separate brush model from carved line", "Use a label that names both writing and engraving"], ["Rubbing display", "Record source stone and impression/reproduction date", "Use the museum explanation without buying or touching"], ["New gallery", "Compare original, recut, rubbing and digital aid", "Choose any display with four clear statuses"]] },
    { id: "misread-h", type: "heading", level: 2, text: "Four phrases to remove from your captions" },
    { id: "misread-list", type: "list", ordered: false, items: ["“The calligrapher carved this stone,” unless the label says so.", "“Original manuscript,” when the object is a stele or rubbing.", "“Tang text,” when only the present engraving is Tang and the text is older.", "“Ancient rubbing,” without an impression date and source surface."] },
    { id: "who-h", type: "heading", level: 2, text: "Who will enjoy Beilin most?" },
    { id: "who-p", type: "paragraph", text: "Prioritise Beilin if you enjoy close looking, writing systems, book history or the movement of texts between materials. You do not need to read classical Chinese; a rigorous label workflow is enough. Shorten the visit if rows of inscriptions fatigue you: one classic, one calligraphy stele and one rubbing can carry the method. Recheck the official museum for ID, booking, open galleries, accessible route and photography rules." },
    { id: "links", type: "internal-links", title: "Continue reading evidence in Xi'an", items: [{ label: "Visit the Terracotta Warriors without a tour", href: "/guides/terracotta-warriors-without-tour/", description: "Apply label discipline to archaeological objects and pits." }, { label: "How to visit an archaeological site museum", href: "/guides/how-to-visit-an-archaeological-site-museum/", description: "Connect find context, object status and modern display." }] },
    { id: "sources", type: "sources", title: "Core institutional sources reviewed", items: [{ label: "Xi'an Beilin Museum", url: "https://www.beilin-museum.com/", publisher: "Xi'an Beilin Museum", reviewedAt: "2026-08-20" }, { label: "Full opening of the expanded museum", url: "https://www.beilin-museum.com/index.php?a=index&aid=4382&c=View&m=home", publisher: "Xi'an Beilin Museum", reviewedAt: "2026-08-20" }, { label: "Kaicheng Stone Classics", url: "https://beilin-museum.com/index.php?a=index&aid=2583&c=View&m=home", publisher: "Xi'an Beilin Museum", reviewedAt: "2026-08-20" }, { label: "Official visitor information", url: "https://www.beilin-museum.com/index.php?a=index&aid=4627&c=View&m=home", publisher: "Xi'an Beilin Museum", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

const zh = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "在西安碑林，一张黑白拓片会让四种不同对象看起来像同一件事：古代文本、书家的书写、刻工转到石头上的线条，以及后来从石面取得的纸本印痕。它们彼此相关，却可能有不同作者与年代。参观的关键，不只问“多古老”，而是重建从文字、书写到刻石和拓片的链条。" },
    { id: "answer", type: "callout", title: "直接答案", body: "每看一碑，记录四栏：写的是什么文本；依据谁的书迹或范本；这块石头何时、由谁刻成；拓片又在何时、何地、从哪个石面取得。标签未回答的一栏，就保留未知。", tone: "decision" },
    { id: "four-h", type: "heading", level: 2, text: "一份碑文可以有四种物质生命" },
    { id: "four-table", type: "table", caption: "不要把四种对象合并", columns: ["对象", "它是什么", "常见误解"], rows: [["文本", "文字内容及其传承", "以为文字初作时间等于刻石时间"], ["书法", "书写范本、风格或署名笔迹", "以为书家本人也负责刻石"], ["碑石", "在具体时期刻成并安置的石质载体", "以为它一定是文本最早的物质版本"], ["拓片", "从表面取得的纸墨转印", "称为原稿，或把纸本当成石头本身"]] },
    { id: "label-h", type: "heading", level: 2, text: "用固定顺序读标签" },
    { id: "label-list", type: "list", ordered: true, items: ["题名与内容：经书、诏令、墓志、记事、图像，还是后世摹刻？", "文本年代：这些文字最初何时创作或编定？", "书写：标签写“书”“传”“集字”“摹”还是“托名”？", "刻制：眼前这块石头何时刻成，是否有刻工或主持者？", "对象经历：原来立在哪里，怎样迁移、损坏、风化并进入碑林？", "展示状态：原石、重刻、翻模、复制，还是数字图像？"] },
    { id: "label-p", type: "paragraph", text: "先把对象编号和标签一起拍下，再拍局部。允许摄影不等于允许公开完整现代译文；译者版权和博物馆复制条件，与古典原文年代是两回事。" },
    { id: "classics-h", type: "heading", level: 2, text: "开成石经把“文本不等于石头”变得可见" },
    { id: "classics-p1", type: "paragraph", text: "碑林馆方把开成石经介绍为114石、228面。唐代刻石把经典转化成巨大的公共参照，但它承载的思想文本比这次刻制更早。这个数字值得记住，因为它改变尺度：一本“书”可以被复制到大量石面，成为空间与制度。" },
    { id: "classics-p2", type: "paragraph", text: "也不要把石经想成冻结不变的完美版本。文本有传承史，石面会风化、断裂、迁移和接受保护。选一个有标签的石面，看行列方向、缺失和维修；再分清你能直接读出的内容、需要释文才能读出的内容，以及博物馆后来补充的解释。" },
    { id: "strokes-h", type: "heading", level: 2, text: "同一笔画，要同时看书写与刻制" },
    { id: "strokes-p1", type: "paragraph", text: "保持距离，先比较粗细、转折、重心和字距，这是书法层；再看切口边缘、崩损、磨蚀和工具转译，这是石质与刻制层。刻线通过另一门工艺保存书写范本，并不是书家毛笔留下的墨迹。" },
    { id: "strokes-p2", type: "paragraph", text: "这样就能避免“某大师真迹”式升级。碑石可以保存高度珍视的书法范本，而物质石头可能后刻、摹自另一载体或重新刻制。沿用馆方精确动词：书、传、摹、集字、刻，不替它扩大。" },
    { id: "rubbing-h", type: "heading", level: 2, text: "拓片也有自己的年代和失真" },
    { id: "rubbing-p1", type: "paragraph", text: "传统传拓把纸贴合表面，再施墨形成高对比图像。技法、纸墨、力度、石面状态和后期装裱都会改变结果。早期拓片可能保存石面后来失去的细节，也可能裁切、压平或强调某些特征。" },
    { id: "rubbing-p2", type: "paragraph", text: "观看或购买时要问：来自哪一块碑、哪一面，何时拓，由谁或哪家机构制作，是获准的新拓、旧拓复制，还是数字印刷。绝不能自行在保护碑石上拓印。当天没有表演并不影响参观，真正任务是看懂对象链。" },
    { id: "route-h", type: "heading", level: 2, text: "历史院落和2025年扩展馆区分别完成不同任务" },
    { id: "route-p1", type: "paragraph", text: "碑林博物馆在2025年实现扩展后整体开放，把历史院落和北侧新馆区连起来。旧院落适合感受碑石密度、尺度、光线与长期安置；新展厅更利于主题比较、稳定环境和清晰语境。“新建筑”不等于证据次要，它往往让标签链更容易读。" },
    { id: "route-table", type: "table", caption: "四种对象的参观顺序", columns: ["停点", "任务", "不可用时"], rows: [["导览图", "分清历史院落与北扩展", "询问当天开放展厅"], ["开成石经", "分开文本和刻石年代", "改看另一组有标签的经典刻石"], ["书法碑", "分开笔墨范本和刻线", "选同时标明书写与刻制的碑"], ["拓片展", "记录来源碑与传拓/复制年代", "只读馆方解释，不必购买或触摸"], ["新展厅", "比较原石、重刻、拓片和数字辅助", "选任何状态标得清楚的展项"]] },
    { id: "misread-h", type: "heading", level: 2, text: "从图片说明中删掉这四种说法" },
    { id: "misread-list", type: "list", ordered: false, items: ["标签没写时，不说“书家亲手刻石”。", "对象是碑或拓片时，不说“原始手稿”。", "只有刻石属唐时，不笼统说“唐代文本”。", "没有传拓年代和来源石面，不说“古拓”。"] },
    { id: "who-h", type: "heading", level: 2, text: "谁会最喜欢碑林？" },
    { id: "who-p", type: "paragraph", text: "喜欢细看、文字系统、书籍史，或文本怎样跨材料传播的人应优先。不懂文言文也能参观，严谨读标签即可。若连续碑刻让你疲劳，缩为一组经典、一方书法碑和一件拓片。证件、预约、开放展厅、无障碍与摄影规则，临行前查馆方。" },
    { id: "links", type: "internal-links", title: "继续在西安按证据参观", items: [{ label: "不跟团参观兵马俑", href: "/zh/guides/terracotta-warriors-without-tour/", description: "把同样的标签纪律用于考古坑与器物。" }, { label: "怎样参观考古遗址博物馆", href: "/zh/guides/how-to-visit-an-archaeological-site-museum/", description: "连接出土语境、对象状态和现代展示。" }] },
    { id: "sources", type: "sources", title: "已核对的核心机构来源", items: [{ label: "西安碑林博物馆", url: "https://www.beilin-museum.com/", publisher: "西安碑林博物馆", reviewedAt: "2026-08-20" }, { label: "扩建后全面开放", url: "https://www.beilin-museum.com/index.php?a=index&aid=4382&c=View&m=home", publisher: "西安碑林博物馆", reviewedAt: "2026-08-20" }, { label: "开成石经资料", url: "https://beilin-museum.com/index.php?a=index&aid=2583&c=View&m=home", publisher: "西安碑林博物馆", reviewedAt: "2026-08-20" }, { label: "官方参观信息", url: "https://www.beilin-museum.com/index.php?a=index&aid=4627&c=View&m=home", publisher: "西安碑林博物馆", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

const ko = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "시안 비림의 흑백 탁본 한 장은 네 대상을 하나처럼 보이게 합니다. 오래된 텍스트, 서예가의 글씨, 각공이 돌에 옮긴 선, 후대에 종이로 떠낸 인상입니다. 서로 연결되지만 제작자와 연대가 다를 수 있습니다. ‘얼마나 오래됐나’만 묻지 않고 말→글씨→돌→탁본의 사슬을 복원할 때 박물관이 읽힙니다." },
    { id: "answer", type: "callout", title: "바로 답하면", body: "비석마다 네 칸을 적으세요. 어떤 텍스트인지, 누구의 필적·본을 따랐는지, 이 돌을 언제 누가 새겼는지, 탁본은 언제 어디서 어느 면으로 만들었는지입니다. 라벨이 답하지 않는 칸은 모른다고 남깁니다.", tone: "decision" },
    { id: "four-h", type: "heading", level: 2, text: "하나의 비문에는 네 가지 물질적 삶이 있습니다" },
    { id: "four-table", type: "table", caption: "네 대상을 합치지 마세요", columns: ["대상", "정의", "흔한 오류"], rows: [["텍스트", "글의 내용과 전승", "글이 처음 만들어진 때와 각석 시기를 같게 봄"], ["서예", "필적 본·스타일·서명된 글씨", "서예가가 직접 돌도 새겼다고 봄"], ["비석", "특정 시기에 새기고 세운 돌", "텍스트의 최초 물질 매체라고 봄"], ["탁본", "표면에서 얻은 종이·먹 전사", "원고 또는 돌 자체라고 부름"]] },
    { id: "label-h", type: "heading", level: 2, text: "라벨을 항상 같은 순서로 읽으세요" },
    { id: "label-list", type: "list", ordered: true, items: ["제목과 내용: 경전·조서·묘지명·기록·그림·후대 모각 중 무엇인가?", "텍스트 연대: 말이 처음 만들어지거나 편정된 때는 언제인가?", "글씨: 서예가가 지목·전승·귀속되었나, 후대 본인가?", "새김: 이 돌은 언제 새겼고 각공·후원자는 누구인가?", "이력: 어디에 서고 이동·파손·풍화되어 비림에 들어왔나?", "전시 상태: 원석·재각·주조·복제·디지털 재현 중 무엇인가?"] },
    { id: "label-p", type: "paragraph", text: "부분 사진 전에 대상 번호와 라벨을 함께 찍으세요. 촬영 가능이 현대 번역 패널 전체를 공개할 권리는 아닙니다. 번역 저작권과 박물관 복제 조건은 고전 원문의 연대와 별개입니다." },
    { id: "classics-h", type: "heading", level: 2, text: "개성석경은 텍스트와 돌의 차이를 보여 줍니다" },
    { id: "classics-p1", type: "paragraph", text: "비림 기관 자료는 개성석경을 114석 228면으로 설명합니다. 당대 각석 사업이 경전을 거대한 공적 기준으로 만들었지만 실린 사상 텍스트는 그보다 오래되었습니다. 한 권의 ‘책’이 수많은 돌면에 복제되어 건축과 제도가 된다는 규모 변화가 핵심입니다." },
    { id: "classics-p2", type: "paragraph", text: "완벽히 얼어붙은 판본으로 보지 마세요. 텍스트는 전승되고 돌은 풍화·파손·이동·보존됩니다. 라벨 있는 한 면에서 읽는 방향, 행 구성, 결손과 보수를 찾으세요. 직접 읽는 부분, 석문이 필요한 부분, 박물관의 현대 해설을 나눕니다." },
    { id: "strokes-h", type: "heading", level: 2, text: "한 획을 글씨와 새김으로 동시에 보세요" },
    { id: "strokes-p1", type: "paragraph", text: "거리를 지키며 굵기, 방향 전환, 균형, 글자 간격을 비교하면 서예 층입니다. 절단면, 모서리 파손, 표면 마모, 도구의 번역을 보면 돌과 새김의 층입니다. 새긴 선은 다른 공예를 통해 본을 보존한 것이지 붓의 먹이 남은 것이 아닙니다." },
    { id: "strokes-p2", type: "paragraph", text: "이 구분으로 ‘대가의 친필 원본’이라는 과장을 피합니다. 비석은 귀한 필적 본을 전하면서 물질 돌은 후대에 새겼거나 다른 매체에서 베꼈거나 재각했을 수 있습니다. 박물관의 동사—씀, 전함, 본뜸, 집자, 새김—를 그대로 쓰세요." },
    { id: "rubbing-h", type: "heading", level: 2, text: "탁본에도 고유 연대와 왜곡이 있습니다" },
    { id: "rubbing-p1", type: "paragraph", text: "전통 탁본은 종이를 표면에 밀착하고 먹을 올려 요철을 대비로 바꿉니다. 기술·종이·먹·압력·석면 상태·장황이 결과에 영향을 줍니다. 이른 탁본은 후에 사라진 세부를 남길 수 있지만 잘라내고 평면화하거나 일부를 강조할 수도 있습니다." },
    { id: "rubbing-p2", type: "paragraph", text: "보거나 살 때 어느 비석 어느 면인지, 언제 누가 떴는지, 허가된 신탁인지 옛 탁본 복제인지 디지털 출력인지 묻습니다. 보호 표면을 직접 탁본해서는 안 됩니다. 시연이 없는 날도 실패가 아닙니다. 대상 사슬이 진짜 과제입니다." },
    { id: "route-h", type: "heading", level: 2, text: "역사 경내와 2025년 확장 구역에 다른 일을 맡기세요" },
    { id: "route-p1", type: "paragraph", text: "박물관은 2025년 역사 경내와 북측 확장을 결합해 전면 개방했습니다. 옛 경내에서는 돌의 밀도·크기·빛·장기 안치를 느끼고, 새 전시실에서는 주제 비교·안정된 전시·명확한 맥락을 봅니다. 새 건물이라고 증거가 약한 것은 아니며 라벨 사슬을 더 분명히 보여 줄 수 있습니다." },
    { id: "route-table", type: "table", caption: "네 대상 관람 순서", columns: ["지점", "과제", "대안"], rows: [["안내도", "역사 경내와 북측 확장 구분", "당일 개방관 문의"], ["개성석경", "텍스트와 각석 연대 분리", "다른 라벨 있는 경전 각석"], ["서예비", "붓의 본과 새긴 선 분리", "글씨·새김을 함께 밝힌 라벨"], ["탁본 전시", "원석과 인출/복제 연대 기록", "구매·접촉 없이 설명 읽기"], ["신관", "원석·재각·탁본·디지털 비교", "상태 네 가지가 분명한 전시 선택"]] },
    { id: "misread-h", type: "heading", level: 2, text: "캡션에서 이 네 표현을 빼세요" },
    { id: "misread-list", type: "list", ordered: false, items: ["라벨이 말하지 않으면 “서예가가 직접 새겼다.”", "비석·탁본을 “원고”라고 부르기.", "각석만 당대인데 모든 것을 “당대 텍스트”라고 하기.", "인출 연대와 원석 없이 “고탁본”이라고 하기."] },
    { id: "who-h", type: "heading", level: 2, text: "누가 비림을 가장 즐길까요?" },
    { id: "who-p", type: "paragraph", text: "세밀하게 보기, 문자 체계, 책의 역사, 매체 사이를 이동한 텍스트에 관심 있다면 우선하세요. 한문을 읽지 못해도 엄격한 라벨 순서면 충분합니다. 피로하면 경전 하나, 서예비 하나, 탁본 하나로 줄이세요. 신분증·예약·개방관·무장애·촬영은 공식 공지를 확인합니다." },
    { id: "links", type: "internal-links", title: "시안에서 증거 읽기 계속하기", items: [{ label: "투어 없이 병마용 관람하기", href: "/ko/guides/terracotta-warriors-without-tour/", description: "라벨 읽기를 고고학 유물과 갱에 적용합니다." }, { label: "고고유적 박물관 방문법", href: "/ko/guides/how-to-visit-an-archaeological-site-museum/", description: "출토 맥락, 대상 상태, 현대 전시를 연결합니다." }] },
    { id: "sources", type: "sources", title: "검토한 핵심 기관 자료", items: [{ label: "시안 비림박물원", url: "https://www.beilin-museum.com/", publisher: "시안 비림박물원", reviewedAt: "2026-08-20" }, { label: "확장 후 전면 개관", url: "https://www.beilin-museum.com/index.php?a=index&aid=4382&c=View&m=home", publisher: "시안 비림박물원", reviewedAt: "2026-08-20" }, { label: "개성석경 자료", url: "https://beilin-museum.com/index.php?a=index&aid=2583&c=View&m=home", publisher: "시안 비림박물원", reviewedAt: "2026-08-20" }, { label: "공식 관람 정보", url: "https://www.beilin-museum.com/index.php?a=index&aid=4627&c=View&m=home", publisher: "시안 비림박물원", reviewedAt: "2026-08-20" }] }
  ]
} satisfies StructuredPageBody;

export const bodies = { en, zh, ko };
