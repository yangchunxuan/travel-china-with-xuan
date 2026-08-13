import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "중국 고속열차는 완성된 껍데기를 바퀴 위에 얹는 방식으로 만들어지지 않습니다. 대형 알루미늄 압출재가 지붕·측벽·하부 구조가 되고, 관리된 용접과 치수 검사로 차체를 만듭니다. 이후 대차, 견인, 제동, 제어, 출입문, 배선과 실내 설비를 통합하고 부품·차량·실험실·선로 단계의 시운전과 시험을 거칩니다. 세부 순서와 시험 항목은 차량 플랫폼과 적용되는 인수 기준에 따라 달라집니다."},
  {id: "production-chain", type: "table", caption: "재료에서 인수 차량까지", columns: ["단계", "작업", "입증할 내용"], rows: [
    ["압출재와 패널", "알루미늄 구조 부품을 준비하고 가공합니다.", "재료 식별과 치수가 맞아야 합니다."], ["차체 용접", "승인된 공정으로 측벽·지붕·하부·끝 구조를 연결합니다.", "형상, 용접 품질, 변형을 관리해야 합니다."], ["차체 완성", "이음부, 부식 방지, 인터페이스와 물길을 검사합니다.", "건전하고 치수가 관리된 차체가 되어야 합니다."], ["시스템 통합", "대차, 제동, 견인, 전기, 제어, 출입문과 실내를 설치합니다.", "모든 인터페이스가 한 차량으로 작동해야 합니다."], ["정적 시운전", "정지 상태에서 전원을 넣고 통신·기능을 작동합니다.", "기능과 고장 보호가 올바르게 반응해야 합니다."], ["동적 검증", "실험실, 시험선과 승인된 철도에서 규정 시험을 합니다.", "주행·제동·집전·신호 등이 적용 프로그램을 충족해야 합니다."]
  ]},
  {id: "aluminium", type: "heading", level: 2, text: "차체가 대형 알루미늄 구조로 시작하는 이유"},
  {id: "aluminium-copy", type: "paragraph", text: "고속 차량에는 가볍고 강성이 높으며 반복 생산이 가능한 구조가 필요합니다. 긴 알루미늄 합금 압출재를 쓰면 측벽, 지붕, 바닥의 큰 부분을 적은 부품으로 만들 수 있습니다. 접합부와 공장에 따라 마찰교반용접, 아크용접, 레이저 관련 공정이 사용될 수 있습니다. 핵심은 이음선을 만드는 데 그치지 않습니다. 열, 고정 방식, 용접 순서가 변형과 잔류응력, 최종 조립 정확도에 영향을 줍니다."},
  {id: "quality-gates", type: "comparison", title: "두 종류의 품질 관문", columns: [
    {heading: "차체를 정확하게 만들기", items: ["길이·너비·대각선과 인터페이스 위치를 측정합니다.", "규정된 방법으로 용접부를 검사합니다.", "접근이 어려워지기 전에 밀폐와 구조 요구를 확인합니다."]}, {heading: "시스템을 함께 작동시키기", items: ["전원, 데이터망, 출입문, 제동과 경보를 검증합니다.", "대차와 차체 인터페이스를 확인합니다.", "정상 명령, 보호 논리와 정해진 고장 조건을 시험합니다."]}
  ]},
  {id: "test-pyramid", type: "heading", level: 2, text: "시험선은 전체 증거 중 한 층일 뿐이다"},
  {id: "test-details", type: "paragraph", text: "중국 국가철도시험센터는 실험실과 61.1km 순환 시험선을 함께 운영합니다. 완성차 시험 규격과 프로젝트별 인수 계획이 측정 항목을 정하며, 시험열차는 통제된 승인 아래 영업선이나 전용선에서도 달릴 수 있습니다. 한 번의 고속 주행 영상만으로 모든 하위 시스템과 운행 조건이 통과했다고 볼 수 없습니다. 인수는 속도 한 줄이 아니라 증거 묶음입니다."},
  {id: "what-footage-means", type: "table", caption: "공장·시험 영상을 읽는 법", columns: ["화면", "가능한 단계", "단정하면 안 되는 것"], rows: [
    ["은색의 빈 차체", "차체 제작 또는 검사.", "견인 장치와 승객 설비 설치 완료."], ["임시 받침대 위 완성 차량", "시스템 설치 또는 정적 시운전.", "철도 운행 승인 완료."], ["순환선 위 주행 열차", "정의된 동적 시험 한 항목.", "영상 속 속도가 상업 운행 속도."], ["전시회의 시제품", "연구·공학 차량이 실제 존재함.", "승차권이나 여객 노선이 존재함."]
  ]},
  {id: "traveller-scenarios", type: "comparison", title: "여행자의 두 질문에 답하기", columns: [
    {heading: "“새 모델은 왜 오래 걸리나요?”", body: "차체 완성은 하나의 이정표일 뿐입니다. 시스템 통합, 결함 수정, 반복 시험, 문서와 규제 인수가 여객 운행 전에 남아 있습니다."}, {heading: "“시속 600km 보도가 다음 열차인가요?”", body: "아닙니다. 시제품 출고나 시험 결과는 표를 파는 서비스가 아닙니다. 연구 속도를 여행 약속으로 바꾸지 말고 실제 운영사와 시간표를 확인해야 합니다."}
  ]},
  {id: "limits", type: "callout", title: "사실 범위", body: "이 글은 제작과 검증을 설명하며 승객 안내, 공장 견학 약속, 모든 중국 열차가 같은 공정을 쓴다는 주장이 아닙니다. 공장 출입, 공급사, 시험 계획과 인수 상태는 프로젝트별로 다릅니다. 자료 확인일은 2026년 8월 13일입니다.", tone: "warning"},
  {id: "internal-links", type: "internal-links", title: "공학에서 실제 여행으로", items: [
    {label: "중국 고속철도 첫 이용 가이드", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "승차권, 역, 탑승 절차는 승객용 가이드에서 확인하세요."}, {label: "야간열차와 주간 고속철도 비교", href: "/ko/guides/china-night-train-or-daytime-high-speed-rail/", description: "차량 기술보다 여행일의 손실을 비교합니다."}, {label: "고속철도역이 구도심에서 먼 이유", href: "/ko/guides/why-china-high-speed-stations-are-far-away/", description: "역 위치를 정하는 계획 논리를 이해합니다."}
  ]},
  {id: "sources", type: "sources", title: "1차 및 기술 자료", items: [
    {label: "고속열차 제작 기지와 역량", url: "https://www.crrcgc.cc/sfgf/36_2205/36_2206/index.html", publisher: "CRRC", reviewedAt: "2026-08-13"}, {label: "고속열차 완성차 시험 규격", url: "https://www.nra.gov.cn/xxgk/gkml/ztjg/gfzd/gfxw/202204/t20220405_289315.shtml", publisher: "중국 국가철도국", reviewedAt: "2026-08-13"}, {label: "국가철도시험센터 시설", url: "https://www.rails.cn/channel.php?channelid=202&page=1", publisher: "중국철도과학연구원", reviewedAt: "2026-08-13"}, {label: "알루미늄 합금 차체 용접 변형 연구", url: "https://umt1998.tongji.edu.cn/article/doi/10.16037/j.1007-869x.2025.02.030", publisher: "Urban Mass Transit", reviewedAt: "2026-08-13"}, {label: "고속열차 알루미늄 용접부 잔류응력 연구", url: "https://xnjdxb.swjtu.edu.cn/en/article/doi/10.3969/j.issn.0258-2724.2012.04.013", publisher: "Journal of Southwest Jiaotong University", reviewedAt: "2026-08-13"}
  ]}
]};
export default body;
