import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "중국 고속열차는 완성된 차체를 바퀴 위에 얹는 방식으로 만들어지지 않습니다. 대형 알루미늄 압출재로 지붕·측벽·하부 구조를 만들고, 관리된 용접과 치수 검사를 거쳐 차체를 완성합니다. 여기에 대차, 견인, 제동, 제어, 출입문, 배선과 실내 설비를 통합한 뒤 부품·차량·실험실·선로 단계의 시운전과 시험을 진행합니다. 세부 제작 순서와 시험 항목은 열차 플랫폼과 적용되는 인수 기준에 따라 달라집니다."},
  {id: "production-chain", type: "table", caption: "재료에서 인수 가능한 열차까지", columns: ["단계", "작업", "입증해야 할 것"], rows: [
    ["압출재와 패널", "알루미늄 구조 부품을 준비하고 가공합니다.", "재료의 식별 정보와 치수."],
    ["차체 용접", "검증된 공정으로 측벽·지붕·하부 구조와 양 끝을 연결합니다.", "형상, 용접 품질과 낮은 변형."],
    ["차체 골조 완성", "이음부, 부식 방지, 접속부와 배수 경로를 검사합니다.", "건전하고 치수가 관리된 차체."],
    ["시스템 통합", "대차, 제동, 견인, 전기, 제어, 출입문과 실내 설비를 설치합니다.", "각 접속부가 하나의 완성 차량으로 함께 작동하는지."],
    ["정적 시운전", "정차 상태에서 전원을 넣고 통신과 각 시스템을 작동시킵니다.", "기능과 고장 보호 장치가 올바르게 반응하는지."],
    ["동적 검증", "실험실, 시험선과 승인된 철도 노선에서 정해진 시험을 수행합니다.", "승차감, 제동, 집전, 신호 등 인수 결과가 적용 시험 계획을 충족하는지."]
  ]},
  {id: "aluminium", type: "heading", level: 2, text: "차체가 대형 알루미늄 구조물에서 시작하는 이유"},
  {id: "aluminium-copy", type: "paragraph", text: "고속철도 차량에는 가볍고 강성이 높으며 반복 생산이 가능한 구조가 필요합니다. 긴 알루미늄 합금 압출재를 사용하면 측벽, 지붕이나 바닥의 큰 부분을 적은 수의 부품으로 만들 수 있습니다. 접합 위치와 공장에 따라 마찰교반용접, 아크용접, 레이저 관련 공정이 쓰일 수 있습니다. 공학적 과제는 단순히 이음선을 만드는 데 있지 않습니다. 열, 고정 방식과 용접 순서가 차체 변형, 잔류응력과 최종 조립 정확도에 영향을 줍니다."},
  {id: "quality-gates", type: "comparison", title: "서로 다른 두 품질 관문", columns: [
    {heading: "차체 골조가 정확해야 한다", items: ["길이, 너비, 대각선과 접속 위치를 측정합니다.", "규정된 방법으로 용접부를 검사합니다.", "나중에 접근이 어려워지기 전에 밀폐와 구조 요건을 확인합니다."]},
    {heading: "시스템이 함께 작동해야 한다", items: ["전원·데이터망·출입문·제동·경보를 검증합니다.", "대차와 차체의 접속 상태를 확인합니다.", "정상 명령, 보호 논리와 정해진 고장 조건을 시험합니다."]}
  ]},
  {id: "test-pyramid", type: "heading", level: 2, text: "시험선은 검증 체계의 한 층일 뿐이다"},
  {id: "test-details", type: "paragraph", text: "중국 국가철도시험센터는 실험실 시험과 전용선 시험을 함께 수행합니다. 완성차 시험 규격과 프로젝트별 인수 계획이 무엇을 측정할지 정하며, 시험열차가 통제된 승인 아래 영업선이나 전용 철도에서 달리기도 합니다. 따라서 한 차례의 고속 주행 영상만으로 모든 하위 시스템, 상황과 영업 조건을 통과했다고 볼 수 없습니다. 인수는 속도 기록 하나가 아니라 여러 시험 결과를 모은 증거 체계입니다."},
  {id: "what-footage-means", type: "table", caption: "공장·시험 영상을 읽는 법", columns: ["화면", "가능성이 큰 단계", "단정하면 안 되는 것"], rows: [
    ["은색 차체 골조", "차체 제작 또는 검사.", "견인 장치나 승객 설비가 설치됐다는 것."],
    ["임시 받침대 위의 완성형 차량", "시스템 설치 또는 정적 시운전.", "철도 운행 인수가 끝났다는 것."],
    ["순환 시험선을 달리는 열차", "정해진 동적 시험 한 항목.", "영상에 나온 속도가 상업 운행 속도라는 것."],
    ["전시된 시제품", "연구 또는 공학용 실물 차량이 존재한다는 것.", "승차권이나 여객 노선이 존재한다는 것."]
  ]},
  {id: "traveller-scenarios", type: "table", caption: "기사에서 흔히 하나로 뭉뚱그리는 네 단계", columns: ["단계", "확인되는 사실", "확인되지 않는 사실"], rows: [
    ["차체 완성", "주요 구조 골조가 제작되어 해당 단계의 검사를 마쳤습니다.", "동력과 승객 설비를 갖춘 완성 차량."],
    ["열차 편성이 출고됨", "실물 편성이 공장 제작의 한 이정표에 도달했습니다.", "규제기관의 인수 또는 일반 운행 시작일."],
    ["시험 주행 완료", "명시된 조건에서 정해진 측정값을 수집했습니다.", "모든 시험이 통과됐거나 기록 속도를 영업 운행에 쓴다는 것."],
    ["상업 운행 시작", "특정 운영사가 공식 시간표와 판매 채널을 통해 특정 노선을 운행합니다.", "모든 연구 기능이나 최고 시험 속도가 매 운행에 적용된다는 것."]
  ]},
  {id: "why-tests-repeat", type: "paragraph", text: "열차는 서로 연결된 시스템이기 때문에 시험을 반복합니다. 출입문, 제동 제어기나 소프트웨어의 변경이 다른 접속부에 영향을 줄 수 있고, 동적 시험에서 발견된 결과에 따라 조정한 뒤 같은 기준의 시험을 다시 해야 할 수도 있습니다. 공장 제작 완료, 공학적 검증, 여객 운행 승인 또는 인수는 한 번의 출고 행사로 끝나는 일이 아니라 서로 다른 단계입니다."},
  {id: "maglev-fact-check", type: "callout", title: "중국의 시속 600km 자기부상열차를 예약할 수 있나요? 이번 확인에서는 예약 가능한 서비스를 찾지 못했습니다.", body: "2026년 8월 13일에 확인한 공식 자료와 승객용 판매 채널은 상전도와 초전도 공학 차량을 포함한 여러 시속 600km 연구 사업을 설명했지만, 일반 승객이 이용할 수 있는 시속 600km 노선·시간표·승차권 상품은 제시하지 않았습니다. 이 연구 차량들을 상업 운행 중인 상하이 공항 자기부상열차와 혼동해서도 안 됩니다. 실제 여행에 쓰려면 운영사, 운행 노선, 공식 판매 채널 세 가지를 모두 확인하세요.", tone: "warning"},
  {id: "limits", type: "callout", title: "사실 범위", body: "이 글은 제작과 검증 과정을 설명합니다. 승객용 이용 안내나 공장 견학 약속이 아니며, 중국의 모든 열차가 똑같은 공정을 쓴다는 뜻도 아닙니다. 공장 출입, 공급사, 시험 계획과 인수 상태는 프로젝트마다 다릅니다. 자료 확인일은 2026년 8월 13일입니다.", tone: "warning"},
  {id: "help", type: "callout", title: "기술 관련 보도가 실제 여행에 영향을 주는지 궁금한가요?", body: "기사나 보고서, 발행일과 이용하려는 노선을 Homeground에 보내 주세요. 부품, 시제품, 시험 차량과 상업 운행을 구분해 일정에 반영하기 전에 확인해 드릴 수 있습니다. 실제 열차와 승차권은 해당 운영사만 확정할 수 있습니다.", tone: "neutral"},
  {id: "internal-links", type: "internal-links", title: "기술 이야기에서 실제 여정으로", items: [
    {label: "중국 고속철도 첫 이용 가이드", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "승차권, 역과 탑승 절차는 승객용 대표 가이드에서 확인합니다."},
    {label: "야간열차와 주간 고속철도 비교", href: "/ko/guides/china-night-train-or-daytime-high-speed-rail/", description: "차량 기술보다 여행일 전체의 득실을 비교합니다."},
    {label: "고속철도역이 구도심에서 멀 수 있는 이유", href: "/ko/guides/why-china-high-speed-stations-are-far-away/", description: "역 위치를 정하는 계획 논리를 이해합니다."}
  ]},
  {id: "sources", type: "sources", title: "1차 및 기술 자료", items: [
    {label: "시속 600km 자기부상 공학·시범 단계", url: "https://www.ncsti.gov.cn/kjdt/kjrd/202603/t20260327_242172.html", publisher: "중국 국가과학기술혁신센터", reviewedAt: "2026-08-13"},
    {label: "시속 600km 자기부상 시스템 출고", url: "https://crrcgc.cc/crrcgc/2024-09/24/article_2024092413441231508.html", publisher: "CRRC", reviewedAt: "2026-08-13"},
    {label: "현재 상업 운행 중인 상하이 공항 자기부상열차", url: "https://english.shanghai.gov.cn/en-Transportation/20240102/44f499a17b324b25996f2d58fcbf5f23.html", publisher: "상하이시 인민정부", reviewedAt: "2026-08-13"},
    {label: "초전도 공학 시제품과 상용화 단계", url: "https://jtj.wuhan.gov.cn/jtzx/zwdt/202507/t20250714_2619883.shtml", publisher: "우한시 교통운수국", reviewedAt: "2026-08-13"},
    {label: "고속열차 제작 기지와 기술 역량", url: "https://www.crrcgc.cc/sfgf/36_2205/36_2206/index.html", publisher: "CRRC", reviewedAt: "2026-08-13"},
    {label: "철도차량 완성차 시험 규격", url: "https://www.nra.gov.cn/xxgk/gkml/ztjg/gfzd/gfxw/202204/t20220405_289315.shtml", publisher: "중국 국가철도국", reviewedAt: "2026-08-13"},
    {label: "국가철도시험센터 시설", url: "https://www.rails.cn/channel.php?channelid=202&page=1", publisher: "중국철도과학연구원", reviewedAt: "2026-08-13"},
    {label: "알루미늄 합금 차체의 용접 변형 연구", url: "https://umt1998.tongji.edu.cn/article/doi/10.16037/j.1007-869x.2025.02.030", publisher: "Urban Mass Transit", reviewedAt: "2026-08-13"},
    {label: "고속열차 알루미늄 용접부의 잔류응력", url: "https://xnjdxb.swjtu.edu.cn/en/article/doi/10.3969/j.issn.0258-2724.2012.04.013", publisher: "Journal of Southwest Jiaotong University", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
