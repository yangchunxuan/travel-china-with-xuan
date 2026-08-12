import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = { schemaVersion: "1.0.0", blocks: [
  { id: "answer-first", type: "lead", text: "모든 사람에게 가장 좋은 이화원 입구는 없습니다. 동궁문은 궁전 구역에서 장랑과 호수로 이어지는 흐름이 가장 읽기 쉽고, 북궁문은 지하철 4호선과 가깝지만 쑤저우제와 언덕을 먼저 만나며, 신건궁문은 십칠공교와 넓은 호수 풍경에 가깝습니다. 우선순위와 나갈 문을 기준으로 고르세요. 유람선은 계절·바람·비·기상 경보·대기로 운항하지 않을 수 있는 선택형 연결 수단입니다." },
  { id: "gate-heading", type: "heading", level: 2, text: "실용적인 세 입구 고르기" },
  { id: "gate-table", type: "table", caption: "첫 방문자를 위한 입구 선택", columns: ["입구", "잘 맞는 목적", "감수할 점"], rows: [
    ["동궁문 东宫门", "궁전 구역에서 장랑, 만수산, 쿤밍호로 이어지는 명확한 첫 동선.", "4호선 시위안역에서 접근 도보가 남고 같은 문으로 돌아가면 되짚는 구간이 많습니다."],
    ["북궁문 北宫门", "베이궁먼역에서 쑤저우제, 언덕 또는 우회로, 석방과 장랑으로 연결.", "언덕을 넘으면 경사와 계단이 있습니다. 이동이 가장 쉬운 문이라고 자동으로 볼 수 없습니다."],
    ["신건궁문 新建宫门", "십칠공교, 난후섬, 남동쪽 호숫가부터 보는 호수 중심 방문.", "궁전 건축의 순서는 덜 직관적이고 지하철에서 지상 이동이 필요할 수 있습니다."],
  ] },
  { id: "ticket-heading", type: "heading", level: 2, text: "기본 입장권, 통합권, 선택 추가" },
  { id: "ticket-comparison", type: "comparison", columns: [
    { heading: "기본 입장권", body: "주요 공원 구역에 들어갑니다. 장랑, 쿤밍호 호안, 다리, 산기슭과 대부분의 정원 풍경을 보는 데 충분합니다." },
    { heading: "통합권", body: "현재 불향각, 덕화원, 쑤저우제, 이화원박물관 등 공원 안의 별도 유료 구역 입장을 포함합니다." },
    { heading: "선택 구매", body: "시간·계단·관심이 전체 구역을 감당하지 못한다면 기본표에 한 곳만 더하는 편이 낫습니다. 통합권은 입장 자격이지 조기 폐장 전 전부 볼 수 있다는 약속이 아닙니다." },
  ] },
  { id: "passport", type: "callout", title: "외국인에게도 공식 온라인·현장 경로가 있습니다", body: "베이징시 공식 안내는 외국인이 이화원 위챗 계정에서 여권 또는 외국인 영구거류 신분증으로 예약할 수 있다고 설명합니다. 온라인 예약이 어렵다면 유효한 여권을 가지고 입구 서비스 창구에서 직원 도움을 받아 구매하는 공식 경로도 안내합니다. 예약에 쓴 원본을 가져가고 출발 전 실제 채널을 다시 확인하세요.", tone: "neutral" },
  { id: "routes-heading", type: "heading", level: 2, text: "하나의 체크리스트가 아닌 세 가지 동선 형태" },
  { id: "routes", type: "table", caption: "실행 가능한 이화원 동선 세 가지", columns: ["동선", "핵심 순서", "추천 대상"], rows: [
    ["궁전에서 호수로", "동궁문→인수전 일대→장랑→만수산 중심부 선택→석방 또는 호안→북궁문.", "건축과 산수의 관계를 순서대로 보고 다른 문으로 나갈 수 있는 첫 방문자."],
    ["지하철-지하철 언덕 동선", "북궁문→쑤저우제 선택→언덕 횡단 또는 완만한 우회→장랑→동궁문.", "4호선 접근이 중요한 여행자. 입장 전에 계단과 긴 우회 중 무엇이 맞는지 정하세요."],
    ["오르막 적은 호수 동선", "신건궁문→십칠공교→난후섬 선택→동쪽 호안→문창각 일대→동궁문.", "만수산 중심 건물보다 물·다리·넓은 전망을 우선하는 여행자."],
  ] },
  { id: "boat-heading", type: "heading", level: 2, text: "배는 이동을 돕는 선택지이지, 무리한 동선을 성립시키는 전제조건이 아닙니다" },
  { id: "boat-rules", type: "list", items: [
    "공식 일반 운항기는 3월 중순부터 11월 중순이며 정확한 개시·종료일은 별도 공지합니다.",
    "현재 대형 페리는 08:30~17:30 운항하지만 노선은 대부분 편도이고 원하는 모든 지점을 연결하지 않습니다.",
    "구매 전에 부두 출발지와 도착지를 읽으세요. 쑤저우제-쑤윈옌 노선은 공식적으로 돌아오는 편이 없는 편도입니다.",
    "풍력 4급 이상, 폭우, 기상 경보나 갑작스러운 악천후에는 운항을 중단합니다.",
    "주말과 공휴일에는 대기가 길 수 있습니다. 기다리는 시간이 절약 시간보다 길어지면 미리 정한 호숫가 길을 걸으세요.",
  ] },
  { id: "boat-plan-b", type: "callout", title: "모든 유람선 동선에는 도보 대안이 필요합니다", body: "입장 전에 같은 다음 목적지로 가는 호숫가 길을 찾아 두세요. 운항이 중단되면 다른 부두를 찾아 공원을 가로지르지 말고 도보 동선으로 바꾼 뒤 우선순위가 가장 낮은 유료 구역을 빼야 출구와 다음 교통을 지킬 수 있습니다.", tone: "decision" },
  { id: "hours-heading", type: "heading", level: 2, text: "공원과 내부 유료 구역은 서로 다른 시각에 닫힙니다" },
  { id: "hours", type: "paragraph", text: "현재 주요 공원은 성수기(4월 1일~10월 31일) 06:00~20:00, 입장 마감 19:00이며 비수기는 06:30~19:00, 입장 마감 18:00입니다. 내부 유료 구역은 더 일찍 닫고 지정 공휴일을 제외하면 보통 월요일 휴관입니다. 늦게 공원에 들어갈 수 있어도 불향각·박물관·쑤저우제는 놓칠 수 있습니다. 보수와 특별 공지가 출입을 좁힐 수 있으므로 당일 공식 페이지를 확인하세요." },
  { id: "final-check", type: "list", items: ["입구와 다른 출구를 중국어·영어로 저장합니다.", "포괄적이라는 이유만으로 통합권을 사지 말고 실제 동선에 맞춰 입장권을 고릅니다.", "가장 일찍 닫는 내부 구역부터 확인합니다.", "정확한 부두 쌍으로 배 한 노선과 도보 대안을 저장합니다.", "날씨, 운항 공지, 마지막 귀환 교통편을 다시 봅니다."] },
  { id: "internal-links", type: "internal-links", title: "베이징의 나머지 계획", items: [
    { label: "첫 베이징 여행 숙소 지역", href: "/ko/guides/beijing-where-to-stay-first-trip/", description: "입구·출구와 다른 베이징 일정에 맞춰 숙소를 비교합니다." },
    { label: "외국인을 위한 자금성 방문", href: "/ko/guides/forbidden-city-for-foreign-visitors/", description: "고궁박물원은 별도의 남문 입장·북문 퇴장 과정으로 준비합니다." },
    { label: "부모님과 함께하는 중국 여행", href: "/ko/guides/china-itinerary-with-older-parents/", description: "경사·계단·다른 문 퇴장이 가족의 실제 속도에 맞는지 판단합니다." },
  ] },
  { id: "consultation", type: "callout", title: "실제 하루에 맞는 입구가 필요하신가요?", body: "Homeground 여행 상담가는 숙소, 보행 제한, 계절, 다음 시간 지정 일정에 맞춰 동선을 점검할 수 있습니다. 보고 싶은 장소, 입장 시각, 이동 제한, 유람선이 필수인지 선택 사항인지 알려 주세요.", tone: "neutral" },
  { id: "sources", type: "sources", title: "확인한 공식·이미지 출처", items: [
    { label: "운영시간, 요금, 현재 유람선 노선", url: "https://summerpalace.net.cn/en/index.html?_isa=1", publisher: "Summer Palace", reviewedAt: "2026-08-12" },
    { label: "외국인 여권 예약, 교통과 공식 동선 예시", url: "https://english.beijing.gov.cn/specials/parktours/guidevisitors/summerpalace/", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "입구 서비스 창구를 포함한 공식 표 안내", url: "https://english.beijing.gov.cn/specials/ticketing/parks/202407/t20240719_3753037.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "대표 사진: Regina800809의 여름 쿤밍호, CC BY-SA 3.0, 크롭 및 WebP 변환", url: "https://commons.wikimedia.org/wiki/File:Kunming_Lake_(Summer_Palace,_Beijing)_in_summer.JPG", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ] },
] };
export default body;
