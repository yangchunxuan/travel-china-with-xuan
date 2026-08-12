import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "기사에게 ‘다리고성’이라고만 말하지 마세요. 열차가 도착하기 전에 숙소에 차량이 가장 가까이 갈 수 있는 성문이나 도로 만남 지점을 물어야 합니다. 남문, 동쪽 얼하이문, 서쪽 창산문·서문, 북문은 마지막 보행이 전혀 다릅니다. 필요한 동선은 다리역→확인된 성문→차량이 닿는 숙소 입구이지 다리역→막연한 고성 핀이 아닙니다." },
  { id: "answer", type: "callout", title: "숙소 위치가 하차 지점을 결정합니다", tone: "decision", body: "도착 시각과 짐을 숙소에 보내고 ‘택시가 호텔에 가장 가까이 갈 수 있는 성문이나 도로 지점은 어디인가요?’라고 서면으로 물으세요. 중국어 답을 저장합니다. 다리역에서는 그 지점까지의 당일 공식 버스·직통 서비스와 택시·허가 픽업을 비교하세요. 과거 노선 번호는 방향만 알려 줄 뿐 오늘 운행은 공식 페이지나 정류장 표시로 확인해야 합니다." },
  { id: "before-heading", type: "heading", level: 2, text: "열차가 다리에 도착하기 전" },
  { id: "before", type: "list", ordered: true, items: [
    "호텔 전체 중국어명, 전화번호, 지도 핀을 오프라인 저장합니다.",
    "도보 지도에서 가까운 명소가 아니라 차량이 갈 수 있는 가장 가까운 성문을 묻습니다.",
    "마지막 구간의 돌길, 계단, 보행 구역 제한, 호텔 짐 카트 여부를 확인합니다.",
    "가방 수와 크기, 어린이, 연세 있는 동행자, 느린 보행자를 숙소에 알립니다.",
    "합의한 지점 화면과 고성 통제 도로 밖의 두 번째 대체 지점을 저장합니다."
  ]},
  { id: "card-heading", type: "heading", level: 2, text: "중국어 목적지 카드" },
  { id: "card", type: "callout", title: "기사에게 이 형식으로 보여 주세요", tone: "neutral", body: "目的地：〔酒店完整中文名〕 / 下车点：〔大理古城南门游客中心、洱海门、苍山门/大理古城西门，或大理古城北门〕 / 联系电话：〔酒店电话〕 / 备注：我们有〔行李数量〕件行李，请送到车辆可以到达、离酒店最近的位置。 호텔이 준 표현을 그대로 쓰고, 확인 없이 이 목록에서 임의로 성문을 고르지 마세요." },
  { id: "gate-heading", type: "heading", level: 2, text: "성문을 마지막 이동의 통로로 이해하세요" },
  { id: "gate-matrix", type: "table", caption: "방향 안내이며 당일 차량 접근은 숙소 확인이 필요합니다", columns: ["하차 통로", "주로 맞는 숙소 위치", "공식 교통 맥락", "마지막 구간 위험"], rows: [
    ["大理古城南门游客中心 · 남문 방문자센터", "푸싱루 남쪽·원셴루 일대", "다리 공식 안내가 역 관광 서비스를 남문 쪽으로 설명", "센터가 모든 남쪽 호텔은 아니므로 도보 구간이 남을 수 있음"],
    ["洱海门 · 얼하이문/동쪽", "런민루 동쪽·위얼루 동쪽", "다리 공식 안내가 8번 노선 통로를 얼하이문 인근으로 설명", "오래된 노선 정보는 실시간 운행이 아니며 골목마다 차량 접근이 다름"],
    ["苍山门 / 大理古城西门 · 창산문/서문", "고성 서쪽·창산 방향", "교통 당국의 노선 설명에 서문 통로 포함", "반대쪽 하차 시 돌길을 가로질러 오래 걸을 수 있음"],
    ["大理古城北门 · 북문", "고성 북쪽 주소", "공식 관광 안내가 시내버스의 북문 방향을 설명", "버스 종점과 호텔 입구는 다를 수 있어 당일 재확인"]
  ]},
  { id: "station-heading", type: "heading", level: 2, text: "승강장에서 정확한 차량까지" },
  { id: "station-steps", type: "list", ordered: true, items: [
    "역 출구 표지를 따르고 모든 짐을 찾을 때까지 일행이 함께 움직입니다.",
    "중국어 목적지 카드와 차량 신원이 명확해지기 전에 ‘고성’ 호객을 이용하지 않습니다.",
    "대중교통은 당일 정류장 표지나 공식 채널에서 지정 성문을 확인하고 古城 글자만 보고 타지 않습니다.",
    "택시·호출차는 공식 승차 구역에서 이용하고 짐을 싣기 전에 목적지 카드를 보냅니다.",
    "차량 정보를 숙소에 공유하고 합의한 도착 지점을 추적하도록 요청합니다.",
    "성문에서 거리·표지·남은 보행이 저장 화면과 다르면 짐을 내리기 전 호텔에 연락합니다."
  ]},
  { id: "travellers-heading", type: "heading", level: 2, text: "여행자에 따라 마지막 이동이 달라집니다" },
  { id: "travellers", type: "comparison", title: "짐과 보행 능력이 교통수단을 바꿉니다", columns: [
    { heading: "가벼운 짐·낮 도착", items: ["당일 대중교통이 효율적일 수 있음", "오늘의 성문 정류장 확인", "알고 있는 마지막 도보만 수용"] },
    { heading: "가족·큰 짐 여러 개", items: ["용량 확인된 차량 사용", "숙소 쪽 가장 접근 가능한 지점 문의", "도착 전 호텔 지원 예약"] },
    { heading: "늦은 도착·느린 보행", items: ["불확실한 인계가 가장 적은 방식", "체크인과 전화 연락 확인", "먼 성문을 시험하지 않음"] }
  ]},
  { id: "dynamic", type: "callout", title: "노선 번호는 변하는 운영 정보입니다", tone: "warning", body: "다리와 윈난 교통 당국은 역–고성 서비스와 남문·서문·얼하이문 방향을 안내했고 혼잡기에는 수송력을 추가합니다. 이는 미래의 특정 출발, 요금, 정류장, 운영 시간을 보장하지 않습니다. 여행일에 역 화면, 공식 대중교통 채널, 직원 안내 데스크를 확인하세요." },
  { id: "recovery-heading", type: "heading", level: 2, text: "잘못 내렸을 때 복구하기" },
  { id: "recovery", type: "table", caption: "짐을 끌고 고성을 가로지르는 것을 기본안으로 삼지 마세요", columns: ["문제", "즉시 대응", "복구"], rows: [
    ["출발 전 기사가 다른 성문을 말함", "짐을 싣지 말고 호텔 메시지를 보여 줌", "호텔이 기사와 통화하거나 앱 목적지 변경"],
    ["잘못된 성문에서 하차", "불이 밝고 식별 가능한 도로 지점에 머물며 호텔 연락", "공식 택시·호출차 지점에서 올바른 성문으로 이동하고 새 차량 기록 저장"],
    ["차량이 골목에 들어가지 못함", "짐을 내리기 전에 합의한 차량 접근 지점인지 확인", "호텔 카트·직원 안내 요청, 안 되면 저장한 대체 지점으로 재이동"],
    ["대중교통 종료 또는 변경", "직원이 있는 역 구역이나 공식 택시 구역 이용", "비공식 호객 대신 확인된 차량으로 저장한 성문 이동"],
    ["전화·데이터 장애", "직원 데스크에서 오프라인 중국어 카드와 호텔 전화 사용", "일행을 나눠 서로 다른 성문으로 보내지 않음"]
  ]},
  { id: "verify-heading", type: "heading", level: 2, text: "역을 떠나기 전 최종 확인" },
  { id: "verify", type: "list", items: [
    "호텔, 성문, 차량 접근 가능한 만남 지점을 별도 항목으로 저장했다.",
    "중국어 목적지 카드와 호텔 전화가 오프라인에서도 작동한다.",
    "오늘 공식 서비스 또는 택시 승차 구역을 확인했다.",
    "차량 짐 용량과 무장애 요구를 확인했다.",
    "호텔이 도착 차량과 남은 보행을 알고 있다.",
    "도로 접근이 바뀌면 사용할 두 번째 성문·도로 지점이 있다."
  ]},
  { id: "help", type: "callout", title: "다리역 도착과 호텔 성문을 맞춰 볼까요?", tone: "decision", body: "날짜, 열차, 호텔, 인원, 짐, 보행 제한을 Homeground에 보내 주세요. 인계 정보를 정리하고 현실적이지 않은 하차 지점을 찾을 수 있습니다. 실시간 버스, 도로 접근, 차량 공급은 운영자 안내가 기준입니다." },
  { id: "links", type: "internal-links", title: "다음 계획", items: [
    { label: "Homeground 교통·여행 가이드", href: "/ko/guides/", description: "상위 가이드 모음으로 돌아갑니다." },
    { label: "중국 고속철도 첫 이용 가이드", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "철도 도착을 준비한 뒤 마지막 이동을 진행합니다." },
    { label: "쿤밍·다리·리장·샹그릴라 순서", href: "/ko/guides/kunming-dali-lijiang-shangri-la-route-order/", description: "다리를 전체 윈난 동선에 맞게 배치합니다." },
    { label: "중국 여행의 한 거점 또는 여러 숙박 거점", href: "/ko/guides/china-hub-and-spoke-or-multi-base-route/", description: "짐을 옮겨 거점을 바꾸는 가치가 있는지 결정합니다." },
    { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "역과 고성 인계 시간을 보호합니다." }
  ]},
  { id: "sources", type: "sources", title: "공식 출처", items: [
    { label: "다리고성 공식 교통 안내", url: "https://www.dali.gov.cn/dlzrmzf/c101724/pc/content/1968887474976559104/content_1968887474976559104.html", publisher: "다리 바이족자치주 인민정부", reviewedAt: "2026-08-13" },
    { label: "다리역–고성 노선 설명", url: "https://jtyst.yn.gov.cn/html/2024/12328hyb_0924/3132885.html", publisher: "윈난성 교통운수청", reviewedAt: "2026-08-13" },
    { label: "2025년 다리 성수기 수송 대책", url: "https://jtyst.yn.gov.cn/html/2025/xingyexinwen_0910/3134849.html", publisher: "윈난성 교통운수청", reviewedAt: "2026-08-13" },
    { label: "2026년 다리역 승객 안내", url: "https://www.dali.gov.cn/dlzrmzf/c101532/pc/content/2015703305571897344/content_2015703305571897344.html", publisher: "다리 바이족자치주 인민정부", reviewedAt: "2026-08-13" },
    { label: "철도 실시간 검색", url: "https://www.12306.cn/en/index.html", publisher: "중국철도 12306", reviewedAt: "2026-08-13" }
  ]}
] } as const satisfies StructuredPageBody;

export default body;
