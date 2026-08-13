import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "중국에서 로보택시 표식을 봤다고 해서 도시 어디서나 자율주행 택시를 부를 수 있다는 뜻은 아닙니다. 실제 서비스는 도시, 사업자, 운행 구역, 시간대, 차량, 자동화 수준, 시범 단계가 함께 정합니다. 차 안에 안전요원이 있는 차량도 있고 원격 감독을 받는 차량도 있습니다. 시험도로로 개방됐다는 사실만으로 일반 승객 서비스가 제공되는 것도 아닙니다."},
  {id: "six-part-check", type: "table", caption: "눈앞의 서비스를 규정하는 여섯 가지", columns: ["확인할 질문", "중요한 이유"], rows: [
    ["어느 도시와 구인가?", "허가는 지방 단위이며 행정구역이나 운행 구역 경계에서 끝날 수 있습니다."], ["어느 사업자인가?", "같은 도시의 사업자라도 서비스 범위와 승객 규정이 다를 수 있습니다."], ["어느 단계인가?", "도로 시험, 시범 적용, 시범 운행, 상업 운행은 서로 다른 상태입니다."], ["어느 도로와 시간대인가?", "허가가 지정 구역·노선·시간에 한정될 수 있습니다."], ["누가 감독하는가?", "승인된 방식에 따라 안전요원이 차량 안에 있거나 원격으로 감독합니다."], ["일반 승객 주문이 가능한가?", "차량을 보거나 시험도로가 열려 있어도 여행자가 호출할 수 있다는 증거는 아닙니다."]
  ]},
  {id: "zone-not-city", type: "heading", level: 2, text: "운행 구역은 도시 전체가 아니다"},
  {id: "zone-explanation", type: "paragraph", text: "중국 교통운수부 지침은 자율주행 여객 운송을 승인된 서비스 구역 안에서 운영하도록 요구하고, 지방 당국이 구체적인 노선·구역·조건을 정합니다. 그래서 같은 차량도 경계 안에서는 합법적으로 운행하지만 경계를 넘으면 서비스를 중단할 수 있습니다. 공항, 기차역, 테마파크 도로가 시험 공지에 등장하더라도 같은 공식 자료가 여객 운행을 명시하지 않는 한 시험 지리로만 읽어야 합니다."},
  {id: "stages", type: "comparison", title: "홍보 문구보다 단계를 먼저 확인하세요", columns: [
    {heading: "도로 시험 또는 시범 적용", items: ["차량과 운행 시스템을 검증하는 단계입니다.", "공공도로에서 차량을 볼 수 있습니다.", "예약 가능한 승객 서비스가 있다는 뜻은 아닙니다."]}, {heading: "시범 운행 또는 상업 운행", items: ["지방 승인 조건 안에서 일반인을 태울 수 있습니다.", "승인된 단계에서는 유료 운행도 가능할 수 있습니다.", "범위·시간·자격·주문 채널은 여전히 사업자와 구역별로 다릅니다."]}
  ]},
  {id: "safety-operator", type: "heading", level: 2, text: "운전자가 없어도 감독은 존재한다"},
  {id: "safety-details", type: "paragraph", text: "국가 지침은 조건부·고도·완전 자율주행을 구분합니다. 조건부 또는 고도 자율주행 택시는 보통 차량 내 안전요원을 두고, 완전 자율주행 택시는 지방정부가 지정 구역에서 승인하면 원격 안전요원을 둘 수 있습니다. 국가 지침상 원격 안전요원 한 명이 동시에 감독할 수 있는 차량은 최대 세 대입니다. 운전석이 비어 있다는 사실만으로 자동화 수준이나 감독 체계를 판단할 수 없습니다."},
  {id: "traveller-scenes", type: "table", caption: "여행자가 보는 장면이 증명하는 것과 아닌 것", columns: ["보이는 장면", "조심스럽게 알 수 있는 것", "아직 알 수 없는 것"], rows: [
    ["센서와 브랜드 표시가 있는 차량", "자율주행 프로그램에 참여하는 차량입니다.", "현재 일반 승객을 태우고 있다는 사실."], ["빈 운전석", "승인된 체계가 원격 감독을 사용할 수 있습니다.", "안전요원이나 개입 장치가 없다는 사실."], ["공항이나 디즈니 도로가 포함된 공지", "해당 도로가 시험망에 포함될 수 있습니다.", "승객이 공항이나 디즈니행 차량을 호출할 수 있다는 사실."], ["홍보용 체험 노선", "특정 사업자와 기간에 한정 체험이 있을 수 있습니다.", "도시 전역 이용이나 영구 운영."]
  ]},
  {id: "scenario-one", type: "callout", title: "상황 1: 전시 지구 근처에서 차량을 본 경우", body: "현지에 프로그램이 있다는 신호로만 받아들이고 중요한 환승 수단으로 단정하지 마세요. 호텔이나 공항 이동이 반드시 성공해야 한다면 사업자의 현재 승객 채널이 출발지, 목적지, 날짜와 시간을 모두 받아 줄 때만 이용하고, 그렇지 않으면 확인된 일반 택시나 대중교통을 사용하세요.", tone: "decision"},
  {id: "scenario-two", type: "callout", title: "상황 2: 소셜미디어에서 공항 로보택시를 본 경우", body: "영상이 시험도로, 시범 노선, 언론 체험, 정상 여객 운행 중 무엇을 말하는지 확인하세요. 상태에 따라 결론이 달라집니다. 다른 구역이나 다른 사업자의 공지를 여행 일정에 그대로 적용할 수 없습니다.", tone: "warning"},
  {id: "if-you-ride", type: "heading", level: 2, text: "공식적으로 열린 서비스를 이용한다면"},
  {id: "ride-checks", type: "list", ordered: true, items: ["사업자의 현재 승객 채널에서 사업자, 승차 지점, 목적지와 운행 시간을 확인합니다.", "출발 전에 안전 안내를 읽고 차량 내 도움 버튼이나 긴급 연락 수단을 찾습니다.", "목적지를 중국어로 저장하고 일반 택시나 지하철 대안을 남겨 둡니다.", "좌석·안전벨트·승하차 안내를 따르고 장비를 방해하거나 차량을 직접 조작하지 않습니다.", "차량이 멈추거나 경로가 예기치 않게 끝나면 지정 지원 채널을 사용하고 안전한 위치에서 안내를 기다립니다."]},
  {id: "dynamic-boundary", type: "callout", title: "확인일: 2026년 8월 13일", body: "이 글은 제도 구조를 설명하며 실시간 이용 가능 여부를 제공하지 않습니다. 구역, 시간, 사업자, 안전요원 배치, 승객 자격은 바뀔 수 있습니다. 여행 당일 해당 지방 당국과 사업자의 현재 안내를 다시 확인하세요. 계획 문서, 시험도로 목록, 오래된 홍보 게시물은 현재 예약 보장이 아닙니다.", tone: "warning"},
  {id: "internal-links", type: "internal-links", title: "나머지 이동을 안정적으로 준비하기", items: [
    {label: "중국에서 전용 차량과 대중교통 고르기", href: "/ko/guides/china-private-transfer-or-public-transport/", description: "시범 서비스가 핵심 이동을 책임질 수 없을 때 확실한 대안을 고릅니다."}, {label: "중국 지도 핀과 입구 확인", href: "/ko/guides/china-map-coordinate-offset-explained/", description: "좌표만 믿지 말고 실제 승차 입구를 확인합니다."}, {label: "중국에서 휴대전화를 잃었을 때 복구", href: "/ko/guides/lost-phone-in-china-digital-recovery/", description: "교통과 결제 수단에 계속 접근할 수 있도록 준비합니다."}
  ]},
  {id: "sources", type: "sources", title: "공식 및 독립 자료", items: [
    {label: "자율주행차 운송 안전 서비스 지침", url: "https://xxgk.mot.gov.cn/jigou/ysfws/202312/t20231205_3962490.html", publisher: "중국 교통운수부", reviewedAt: "2026-08-13"}, {label: "특정 구역·시간대 상업 시범 정책 해설", url: "https://big5.mot.gov.cn/gate/big5/www.mot.gov.cn/gongkai/zcjd/202512/t20251226_4191175.html", publisher: "중국 교통운수부", reviewedAt: "2026-08-13"}, {label: "상하이 자율주행 발전 현황", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260215/e00a579f253d4903a3bdaf6840babc9f.html", publisher: "상하이시 인민정부", reviewedAt: "2026-08-13"}, {label: "베이징 이좡 자율주행 시범구 현황", url: "https://kfqgw.beijing.gov.cn/ywdt/dwkfgd/kfyz/202505/t20250521_4246493.html", publisher: "베이징 경제기술개발구", reviewedAt: "2026-08-13"}, {label: "우한 지능형 커넥티드 차량 계획", url: "https://www.wuhan.gov.cn/ztzl/25zt/ltwhfjzx/zcwj/202511/t20251125_2682890.shtml", publisher: "우한시 인민정부", reviewedAt: "2026-08-13"}, {label: "자율주행 운행 설계 조건 조사", url: "https://www.sciencedirect.com/science/article/pii/S0001457525004543", publisher: "Accident Analysis & Prevention", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
