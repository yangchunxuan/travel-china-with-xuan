import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "중국에서 로보택시 표식을 봤다고 해서 도시 어디서나 자율주행 택시를 부를 수 있다는 뜻은 아닙니다. 실제 서비스는 도시와 사업자, 운행 구역, 시간대, 차량, 자동화 수준, 시범 단계가 모두 맞아야 성립합니다. 차 안에 안전운행요원이 타는 차량도 있고 원격 감독을 받는 차량도 있습니다. 도로가 시험용으로 개방됐더라도 일반 승객 서비스는 전혀 없을 수 있습니다."},
  {id: "six-part-check", type: "table", caption: "이용 가능 여부를 결정하는 여섯 가지", columns: ["확인할 질문", "중요한 이유"], rows: [
    ["어느 도시의 어느 구역인가?", "허가는 지방 단위로 이루어지며 행정구역이나 운행 구역 경계에서 끝날 수 있습니다."],
    ["어느 사업자인가?", "같은 도시에서도 사업자마다 운행 범위와 승객 이용 조건이 다를 수 있습니다."],
    ["법적·서비스 단계는 무엇인가?", "도시마다 명칭이 다릅니다. 도로시험 허가는 여객 서비스를 뜻하지 않으며, 다른 시범 명칭이 붙어도 지금 예약할 수 있다는 증거는 아닙니다."],
    ["어느 도로에서 몇 시까지 운행하는가?", "허가가 지정 구역·노선·시간대에만 적용될 수 있습니다."],
    ["누가 안전을 감독하는가?", "승인된 운영 방식에 따라 안전 기능을 차량 안의 요원이나 원격 요원이 담당합니다."],
    ["예약을 끝까지 완료할 수 있는가?", "일반 승객도 사업자별 가입, 본인 또는 전화번호 확인, 이용 자격과 결제 절차를 통과해야 할 수 있습니다."]
  ]},
  {id: "zone-not-city", type: "heading", level: 2, text: "운행 구역은 도시 전체가 아니다"},
  {id: "zone-explanation", type: "paragraph", text: "중국 교통운수부 지침은 자율주행 여객 운송을 승인된 서비스 구역 안에서 운영하도록 요구합니다. 지방 당국은 그 안에서 더 구체적인 노선, 구역과 운행 조건을 공고하거나 승인합니다. 같은 차량이 경계 한쪽에서는 합법적으로 운행하지만 반대쪽에서는 이용할 수 없는 이유입니다. 시험 공지에 공항·기차역·테마파크 도로가 포함됐더라도, 같은 공식 자료가 여객 운행을 명시하지 않았다면 그 내용은 시험 구간에 관한 것으로만 봐야 합니다."},
  {id: "stages", type: "comparison", title: "도로 상태와 승객 이용 가능 여부를 구분하세요", columns: [
    {heading: "도로시험 또는 시범 적용", items: ["국가 규정상 지정 도로에서 이루어지는 시험 또는 시범 활동입니다.", "시범 과정에서 사람을 태울 수는 있지만, 그 명칭만으로 일반 택시처럼 누구나 이용할 수 있는 것은 아닙니다.", "실제 이용 가능 여부는 지방 규정과 사업자의 현재 승객용 앱·예약 채널이 정합니다."]},
    {heading: "지방정부가 승인한 여객 운행", items: ["도시마다 시범운행·파일럿·상업운행 등 서로 다른 용어를 쓸 수 있습니다.", "지방정부가 정한 운영 단계에서는 유료 운행이 허용될 수 있습니다.", "그래도 계정, 출발지와 목적지, 이용 시간, 결제가 모두 승인되어야 합니다."]}
  ]},
  {id: "shanghai-example", type: "callout", title: "날짜와 범위가 명확한 사례", body: "상하이시 공식 영문 포털은 2025년 8월 5일 Pony.ai와 진장택시가 진차오·화무의 지정 구역에서 일반 승객 대상 유료 무인 차량호출 서비스를 운영하며 Pony.ai 위챗 미니프로그램으로 예약할 수 있다고 보도했습니다. 같은 보도는 요금을 받을 수 없던 이전 시범 적용 허가와 이를 구분했습니다. 이는 당시의 지역 사례일 뿐 상하이 전역 또는 2026년 현재 예약 가능성을 보장하지 않습니다.", tone: "neutral"},
  {id: "safety-operator", type: "heading", level: 2, text: "운전자가 없어도 감독이 없는 것은 아니다"},
  {id: "safety-details", type: "paragraph", text: "국가 운송 안전 지침에 따르면 조건부 자율주행 또는 고도 자율주행 로보택시에는 안전운행요원 1명이 반드시 탑승해야 합니다. 완전 자율주행 로보택시는 해당 도시 정부가 지정 구역 운행을 승인한 경우에만 원격 안전운행요원으로 대체할 수 있으며, 원격 요원 1명이 동시에 맡을 수 있는 차량은 최대 3대입니다. 따라서 운전석이 비어 있다고 해서 차량이 감독받지 않는 것도, 일반 승객을 태울 수 있도록 승인된 것도 아닙니다."},
  {id: "scenario-one", type: "callout", title: "실제 교통수단으로 고려해도 되는 경우", body: "사업자의 현재 승객용 앱·예약 채널이 필요한 날짜와 시간에 정확한 출발지와 목적지를 받아들이고, 계정·연락처·결제 절차를 완료할 수 있을 때만 이용 가능한 수단으로 보세요. 호출이 취소되거나 운행 구역 경계에서 끝날 경우를 대비해 일반 택시나 지하철도 남겨 두어야 합니다. 길에서 로고가 붙은 차량을 봤다는 사실은 이 조건 가운데 어느 것도 증명하지 않습니다.", tone: "decision"},
  {id: "scenario-two", type: "callout", title: "구경거리로만 남겨 두어야 하는 경우", body: "공항 이동, 막차, 시간 지정 입장권, 심야 호텔 도착처럼 실패하면 곤란한 구간에 시범 서비스를 넣지 마세요. 어린이, 휠체어, 여러 개의 여행가방이나 언어 장벽 때문에 호출 실패 후 대처가 어려운 경우도 마찬가지입니다. 소셜미디어에 나온 공항행 로보택시는 일반 여객 운행이 아니라 도로시험, 언론 시승 또는 제한 노선일 수 있습니다.", tone: "warning"},
  {id: "if-you-ride", type: "heading", level: 2, text: "공식적으로 이용 가능한 차량에 탄다면"},
  {id: "ride-checks", type: "list", ordered: true, items: [
    "사업자의 현재 승객용 앱·예약 채널에서 사업자명, 승차 지점, 목적지, 안내된 운행 시간과 구역의 끝점을 확인합니다.",
    "출발 전에 안전 안내를 읽고 차량 안의 도움 요청 기능이나 긴급 연락 수단을 찾아 둡니다.",
    "목적지를 중국어로 저장하고 일반 택시나 지하철을 대안으로 남겨 둡니다.",
    "좌석, 안전벨트와 승하차 안내를 따르고 장비를 방해하거나 차량을 직접 조작하려 하지 않습니다.",
    "차량이 멈추거나 경로가 예기치 않게 끝나면 공식 지원 채널과 차량의 안전 안내를 따릅니다. 화재나 즉각적인 위험이 있으면 표시된 비상 탈출 안내에 따라 안전한 곳으로 이동합니다."
  ]},
  {id: "dynamic-boundary", type: "callout", title: "확인일: 2026년 8월 13일", body: "이 글은 제도의 구조를 설명하며 실시간 운행 여부를 제공하지 않습니다. 구역, 시간, 사업자, 차량 내·원격 안전요원 배치와 승객 이용 조건은 바뀔 수 있습니다. 여행 당일 해당 도시 당국과 사업자의 최신 안내를 다시 확인하세요. 계획 문서, 시험도로 목록이나 오래된 홍보 게시물은 현재 예약을 보장하지 않습니다.", tone: "warning"},
  {id: "help", type: "callout", title: "시범 서비스를 실제 일정에 넣어도 될지 판단이 필요한가요?", body: "도시, 여행 날짜, 정확한 출발지와 목적지, 도착해야 하는 시각, 인원, 짐과 이동 편의 요구를 Homeground에 보내 주세요. 확인된 일반 여객 서비스인지 시험 구역에 관한 보도인지 구분하고, 무엇을 대안으로 다시 확인해야 하는지 표시해 드릴 수 있습니다. 실시간 이용 허용 여부는 도시와 사업자가 결정합니다.", tone: "neutral"},
  {id: "internal-links", type: "internal-links", title: "나머지 이동은 확실한 수단으로 준비하기", items: [
    {label: "중국에서 전용 차량과 대중교통 고르기", href: "/ko/guides/china-private-transfer-or-public-transport/", description: "시범 서비스가 핵심 이동을 맡기 어려울 때 안정적인 대안을 고릅니다."},
    {label: "중국 지도 좌표와 실제 입구 확인", href: "/ko/guides/china-map-coordinate-offset-explained/", description: "지도 핀만 믿지 말고 정확한 승차 입구를 확인합니다."},
    {label: "중국에서 휴대전화를 잃었을 때 복구", href: "/ko/guides/lost-phone-in-china-digital-recovery/", description: "교통과 결제 수단을 계속 사용할 수 있도록 대비합니다."},
    {label: "선전의 저고도 기반시설 읽기", href: "/ko/guides/shenzhen-low-altitude-city-infrastructure/", description: "범위가 정해진 도로 시범 구역과 드론 항로·지상 거점을 비교하되 어느 쪽도 보장된 여객 교통으로 보지 마세요."}
  ]},
  {id: "sources", type: "sources", title: "공식 및 독립 자료", items: [
    {label: "자율주행차 운송 서비스 안전 지침", url: "https://xxgk.mot.gov.cn/jigou/ysfws/202312/t20231205_3962490.html", publisher: "중국 교통운수부", reviewedAt: "2026-08-13"},
    {label: "도로시험 및 시범 적용 국가 규정", url: "https://www.miit.gov.cn/jgsj/zbys/qcgy/art/2021/art_a24398849c6a4dd290328ab5d1d8af0f.html", publisher: "중국 공업정보화부", reviewedAt: "2026-08-13"},
    {label: "상하이 진차오·화무 유료 일반 승객 운행 사례", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20250805/99c935aed09f41e5bb4a6dd6fa095c96.html", publisher: "상하이시 인민정부", reviewedAt: "2026-08-13"},
    {label: "상하이 자율주행 현황", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260215/e00a579f253d4903a3bdaf6840babc9f.html", publisher: "상하이시 인민정부", reviewedAt: "2026-08-13"},
    {label: "베이징 이좡 자율주행 시범구 현황", url: "https://kfqgw.beijing.gov.cn/ywdt/dwkfgd/kfyz/202505/t20250521_4246493.html", publisher: "베이징 경제기술개발구", reviewedAt: "2026-08-13"},
    {label: "우한 지능형 커넥티드 차량 계획", url: "https://www.wuhan.gov.cn/ztzl/25zt/ltwhfjzx/zcwj/202511/t20251125_2682890.shtml", publisher: "우한시 인민정부", reviewedAt: "2026-08-13"},
    {label: "자율주행 운행 설계 조건 조사", url: "https://www.sciencedirect.com/science/article/pii/S0001457525004543", publisher: "Accident Analysis & Prevention", reviewedAt: "2026-08-13"},
    {label: "대표 사진: S5A-0043이 2025년 12월 17일 우한에서 촬영한 시험 임시번호판 Apollo Go RT6(크롭)", url: "https://commons.wikimedia.org/wiki/File:(CHN-Hubei)_Apollo_Go_Apollo_RT6_Temporary-%E9%84%82A1395%E8%AF%95_2025-12-17.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13"},
    {label: "크롭한 대표 사진의 CC BY 4.0 라이선스", url: "https://creativecommons.org/licenses/by/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
