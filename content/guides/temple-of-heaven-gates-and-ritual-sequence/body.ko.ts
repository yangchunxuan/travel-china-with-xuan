import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = { schemaVersion: "1.0.0", blocks: [
  { id: "answer-first", type: "lead", text: "천단을 처음 본다면 남문으로 들어가 원구단, 황궁우와 회음벽, 단폐교, 기년전 순서로 북쪽을 향해 걷는 동선이 가장 명확합니다. 남쪽 제단에서 북쪽 기곡 건축군으로 이어지는 공간 논리를 따릅니다. 지하철 5호선 편의가 더 중요하면 동문으로 들어가 기년전을 먼저 보고 중심축을 거꾸로 내려가 남문으로 나가세요. 어느 방향이든 세 핵심 유료 구역이 포함된 표가 필요하며 공원 입장권만으로는 들어갈 수 없습니다." },
  { id: "ticket-heading", type: "heading", level: 2, text: "공원표와 핵심 제례 구역은 다릅니다" },
  { id: "tickets", type: "comparison", columns: [
    { heading: "공원 입장권", body: "넓은 외부 공원과 고목, 공공 녹지에 들어가지만 기년전·회음벽·원구단 입장은 포함하지 않습니다." },
    { heading: "통합권", body: "공원 입장과 세 주요 유료 명소를 포함합니다. 유명 제례 건축이 중심인 첫 방문에는 일반적으로 이 표가 맞습니다." },
    { heading: "핵심 구역 별도표", body: "운영자는 세 명소 표도 별도로 안내합니다. 실제 구매 화면이나 서비스 창구 설명을 읽어 공원 입장을 중복 결제하지 마세요." },
  ] },
  { id: "foreign-booking", type: "callout", title: "여권 예약은 가능하지만 휴대전화 인증이 변수입니다", body: "베이징시의 2026년 공식 안내에 따르면 외국인은 천단 위챗 계정에서 예약하고 전자표 QR과 예약에 쓴 여권 등 신분증을 함께 제시할 수 있습니다. 시립공원 공식 채널도 여권 구매를 지원합니다. 해외 전화번호로 실명 인증이 막히면 비공식 대행이 아니라 여권 원본을 가지고 종합 서비스 창구를 이용하세요.", tone: "neutral" },
  { id: "gate-heading", type: "heading", level: 2, text: "입구가 동선 방향을 결정합니다" },
  { id: "gates", type: "table", caption: "천단공원 출발 입구 선택", columns: ["출발", "동선 논리", "교통과 조건"], rows: [
    ["남문", "원구단→회음벽/황궁우→단폐교→기년전→동문 또는 북문.", "8호선 톈차오역이 유용합니다. 이야기 흐름은 가장 좋지만 지하철에서 핵심 시작점까지 최단은 아닐 수 있습니다."],
    ["동문", "장랑→기년전→단폐교→회음벽→원구단→남문.", "5호선 톈탄둥먼역 접근이 편합니다. 다만 중심 의례 순서는 반대입니다."],
    ["서문", "조용한 녹지와 신악서 또는 재궁을 선택한 뒤 중심축에 합류.", "보조 유적이 중요한 여행자에게 맞지만 세 핵심만 보는 짧은 첫 방문에는 덜 효율적입니다."],
  ] },
  { id: "sequence-heading", type: "heading", level: 2, text: "각 정거장이 순서에 더하는 것" },
  { id: "sequence", type: "list", items: [
    "원구단에서는 노출된 원형 석조와 남쪽 위치를 먼저 보세요. 중앙의 음향 효과만 시험하는 장소로 줄이지 마세요.",
    "황궁우 뜰에서 회음벽이 둘러싼 제례 공간을 이해하세요. 음향은 현장 조건과 다른 관람객의 영향을 받아 보장되지 않습니다.",
    "단폐교를 연결축으로 걸으세요. 공식 설명은 이 길이 남쪽에서 북쪽으로 점차 높아지며 두 제단 구역을 잇는다고 밝힙니다.",
    "남북 동선의 끝을 기년전에 두면 규모·색채·높은 기단이 시각적 결말이 됩니다.",
    "별도 운영시간과 표, 체력이 허용할 때만 재궁이나 신악서를 더하세요.",
  ] },
  { id: "hours-heading", type: "heading", level: 2, text: "공원이 늦게 닫혀도 기념 건축은 일찍 닫힙니다" },
  { id: "hours", type: "paragraph", text: "외부 공원은 현재 22:00 폐장, 21:00 입장 마감입니다. 세 유료 핵심 구역은 화~일요일에 운영하며 4월 1일~10월 31일 08:00~18:00(17:30 입장 마감), 11월 1일~3월 31일 08:00~17:00(16:30 입장 마감)입니다. 법정 공휴일을 제외하면 보통 월요일 문을 닫습니다. 저녁 공원 산책과 핵심 건축을 모두 보는 첫 방문은 다른 일정입니다." },
  { id: "pace", type: "callout", title: "Homeground의 계획 판단: 2~3시간", body: "2시간이면 직선형 다른 문 퇴장 동선으로 세 핵심을 볼 수 있습니다. 3시간이면 축을 천천히 걷고 쉬며 보조 공간 하나를 더할 수 있습니다. 보안, 혼잡, 사진, 우회가 속도를 바꾸므로 공식 소요시간은 아닙니다.", tone: "decision" },
  { id: "mistakes-heading", type: "heading", level: 2, text: "자주 생기는 동선 실패" },
  { id: "mistakes", type: "list", items: ["공원표만 사고 세 유명 건축에 추가 입장이 필요하다는 사실을 뒤늦게 압니다.", "지하철 때문에 동문으로 들어가 남쪽 끝까지 걸은 뒤 다시 동문으로 돌아가려 합니다.", "공원이 22시에 닫힌다는 이유로 늦게 와 핵심 구역을 놓칩니다.", "붐비는 공공 공간에서 회음벽 음향을 보장된 체험으로 기대합니다.", "앉아 쉬어야 할 때 보조 건축 두 곳을 모두 추가합니다."] },
  { id: "internal-links", type: "internal-links", title: "현실적인 베이징 일정 만들기", items: [
    { label: "첫 베이징 여행 숙소 지역", href: "/ko/guides/beijing-where-to-stay-first-trip/", description: "5호선·8호선 접근을 다른 일정과 함께 비교합니다." },
    { label: "중국국가박물관 예약과 핵심 동선", href: "/ko/guides/national-museum-of-china-booking-and-route/", description: "또 다른 주요 명소는 별도 예약과 실내 동선으로 준비합니다." },
    { label: "부모님과 함께하는 중국 여행", href: "/ko/guides/china-itinerary-with-older-parents/", description: "지도상 단순한 중심축도 실제로는 긴 공원 도보입니다." },
  ] },
  { id: "consultation", type: "callout", title: "다른 베이징 예약과 이어야 하나요?", body: "Homeground 여행 상담가는 숙소와 다른 고정 시간에 맞춰 입구·방향·속도를 조정할 수 있습니다. 날짜, 시작 선호, 이동 제한, 세 핵심과 넓은 공원 중 무엇이 더 중요한지 알려 주세요.", tone: "neutral" },
  { id: "sources", type: "sources", title: "확인한 공식·이미지 출처", items: [
    { label: "공식 운영시간, 세 명소 통합권과 서비스", url: "https://www.tiantanpark.cn/en/index.html", publisher: "Temple of Heaven", reviewedAt: "2026-08-12" },
    { label: "2026년 외국인 여권 예약, 현행 요금과 확인 규정", url: "https://english.beijing.gov.cn/travellinginbeijing/parks/202603/t20260320_4562532.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "공식 공원 동선, 지하철 접근과 표 범위", url: "https://english.beijing.gov.cn/specials/parktours/guidevisitors/templeofheaven/", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "단폐교 공식 설명", url: "https://www.tiantanpark.cn/en/Scenic/detail/1389.html", publisher: "Temple of Heaven", reviewedAt: "2026-08-12" },
    { label: "대표 사진: Maros Mraz의 천단, CC BY-SA 3.0, 크롭 및 WebP 변환", url: "https://commons.wikimedia.org/wiki/File:Temple_of_Heaven,_Beijing,_China_-_009.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ] },
] };
export default body;
