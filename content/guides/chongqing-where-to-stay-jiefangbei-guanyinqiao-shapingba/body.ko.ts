import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "충칭에서는 ‘명소와 가깝다’는 말만으로 부족합니다. 평면 지도에서 가까운 두 호텔도 경사로, 계단, 엘리베이터, 서로 다른 도로 층으로 갈릴 수 있습니다. 명소 수가 아니라 매일 반복할 이동을 줄이는 곳을 고르세요." },
  { id: "answer", type: "callout", title: "빠른 선택", tone: "decision", body: "첫 방문이 짧고 위중 반도의 밀집 명소와 야경이 중심이면 제팡베이가 편합니다. 현대적인 상업 중심지의 식사·쇼핑·저녁 시간을 중시하면 관인차오를 비교하세요. 서역이나 서쪽 일정이 실제로 중요할 때만 사핑바가 강해집니다. 단순히 관광객이 적어 보인다는 이유만으로 고를 곳은 아닙니다." },
  { id: "matrix-heading", type: "heading", level: 2, text: "세 거점이 하루를 바꾸는 방식" },
  { id: "matrix", type: "table", caption: "지역 평판보다 매일의 이동 사슬을 비교하세요", columns: ["거점", "잘 맞는 여행", "감수할 점", "예약 전 확인"], rows: [
    ["제팡베이·위중 중심", "첫 방문, 짧은 체류, 훙야둥·차오톈먼·반도 야간 일정", "인파, 교통 체증, 착각하기 쉬운 입체 보행", "호텔 입구 층, 실제 쓸 역 출구, 차량 하차 지점"],
    ["관인차오", "음식·쇼핑·현대 상권의 저녁", "위중의 대표 명소까지 이동 필요", "넓은 상권 중 호텔이 정확히 어느 쪽인지"],
    ["사핑바", "충칭서역, 츠치커우, 서쪽 일정", "위중에서 늦게 돌아올 때 긴 이동", "정확한 역과 철도 연결; 구 전체를 한 지점처럼 보지 않기"]
  ]},
  { id: "terrain", type: "callout", title: "지도상 600m가 쉬운 600m는 아닙니다", tone: "warning", body: "중심부에서는 거리와 함께 높이 차를 보세요. 숙소에 중국어 입구명, 차량 하차 지점, 짐이 있을 때 권하는 지하철 출구를 물어보는 것이 좋습니다. 지하철 아이콘 하나로 계단·경사·건물 입구를 알 수는 없습니다." },
  { id: "fit-heading", type: "heading", level: 2, text: "반복할 여정으로 고르기" },
  { id: "fit", type: "comparison", title: "대표적인 세 일정", columns: [
    { heading: "2~3박 첫 여행", items: ["제팡베이에 무게", "저녁 산책을 숙소 주변에", "인파를 감수하고 야간 환승 감소"] },
    { heading: "음식과 도시 생활", items: ["관인차오 비교", "정확한 블록 확인", "위중 관광일 이동시간 반영"] },
    { heading: "서쪽 도착·관광", items: ["실제 역으로 사핑바 적합성 확인", "츠치커우와 서쪽 일정 묶기", "매일 위중에서 늦게 귀가하지 않기"] }
  ]},
  { id: "luggage-heading", type: "heading", level: 2, text: "짐과 늦은 도착이 답을 바꿉니다" },
  { id: "luggage", type: "paragraph", text: "아이·고령자·큰 여행가방이 있다면 확인된 차량 입구가 겉보기 중심 위치보다 중요할 수 있습니다. 호텔 중국어 이름과 주소를 저장하고 도착 수단을 알린 뒤, 차량이 프런트와 같은 층에 설 수 있는지 물으세요. 늦은 밤에는 완벽한 관광 위치보다 마지막 인계를 단순하게 만드는 편이 낫습니다." },
  { id: "facts", type: "callout", title: "변동 정보 확인일: 2026년 8월 12일", tone: "neutral", body: "충칭시 공식 영문 자료는 위중의 쿠이싱러우 일대를 다층 지형 사례로 소개하고, 츠치커우를 사핑바에 두며, 제팡베이를 활발한 야간 지역으로 안내합니다. 이는 지리적 사실이고 위 선택은 Homeground의 편집 판단입니다. 실제 날짜의 지하철 운행, 출구, 차량 진입과 공사는 공식 채널과 숙소에 다시 확인하세요." },
  { id: "checklist", type: "list", ordered: true, items: ["고정된 도착·출발 지점을 모두 표시합니다.", "가장 자주 반복할 두 이동을 셉니다.", "높이 차와 정확한 입구를 확인합니다.", "현실적인 야간 귀가 한 번을 점검합니다.", "무료 취소 기한 전에 차량 접근과 숙박 등록을 확인합니다."] },
  { id: "help", type: "callout", title: "위치 판단이 필요하신가요?", tone: "decision", body: "날짜, 인원, 도착지, 예정 명소와 대략적인 예산을 보내면 Homeground가 지역을 비교하고 숙소에 다시 물어볼 위치 조건을 정리해 드릴 수 있습니다." },
  { id: "links", type: "internal-links", title: "계속 계획하기", items: [
    { label: "상업형 아파트호텔과 주거용 단기 임대", href: "/ko/guides/commercial-aparthotel-or-residential-rental-china/", description: "넓은 방을 고르기 전 운영 형태를 확인하세요." },
    { label: "상하이 첫 여행 숙소 지역", href: "/ko/guides/shanghai-where-to-stay-first-trip/", description: "같은 반복 이동 기준을 상하이에 적용합니다." },
    { label: "중국 호텔의 ‘지하철 근처’ 판단법", href: "/ko/guides/china-hotel-near-metro/", description: "표시가 아니라 마지막 도보를 점검하세요." }
  ]},
  { id: "sources", type: "sources", title: "공식 출처와 이미지 크레디트", items: [
    { label: "충칭 위중의 다층 지형 공식 소개", url: "https://english.cq.gov.cn/latestnews/Editor/202606/t20260608_15735957.html", publisher: "충칭시 인민정부", reviewedAt: "2026-08-12" },
    { label: "사핑바 츠치커우 공식 방문 정보", url: "https://english.cq.gov.cn/latestnews/activities/202606/t20260608_15735764.html", publisher: "충칭시 인민정부", reviewedAt: "2026-08-12" },
    { label: "제팡베이를 포함한 2026년 공식 야간 활동 안내", url: "https://english.cq.gov.cn/latestnews/activities/202607/t20260714_15821893.html", publisher: "충칭시 인민정부", reviewedAt: "2026-08-12" },
    { label: "대표 이미지: Baycrest의 제팡베이 야경, CC BY-SA 2.5, 크롭·WebP 변환", url: "https://commons.wikimedia.org/wiki/File:Jiefangbei_night.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "대표 이미지 2차 저작물 라이선스: CC BY-SA 2.5", url: "https://creativecommons.org/licenses/by-sa/2.5/", publisher: "Creative Commons", reviewedAt: "2026-08-12" }
  ]}
] } as const satisfies StructuredPageBody;
export default body;
