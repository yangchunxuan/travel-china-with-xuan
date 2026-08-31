import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "항공편이 서로 다른 관문을 허용한다면 난징→쑤저우→상하이→항저우 또는 반대가 실용적인 네 도시 순서입니다. 장거리 왕복이 모두 상하이라면 한 방향이라는 이름을 강제하지 마세요. 상하이를 거점으로 쓰거나 전략적 두 번째 거점을 두거나, 전체 문간 이동 시간을 비교한 뒤 귀환을 받아들이세요. 답은 공항, 정확한 철도역과 도시별 목적에 달려 있습니다." },
  { id: "quick-choice", type: "comparison", title: "구조부터 선택하세요", columns: [
    { heading: "한 방향 통로", body: "난징과 항저우가 서로 다른 관문 쪽에 있고 모든 숙소 이동이 실제 현지 우선순위를 지원할 때 좋습니다." },
    { heading: "상하이 거점", body: "숙소 안정이 중요하고 근교 일정이 집중되며 반복 역 접근을 감당할 때 좋습니다." },
    { heading: "두 거점 혼합형", body: "이동 한 번으로 긴 귀환을 없애면서 네 번의 체크인을 만들지 않을 때 흔히 가장 강합니다." }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "역의 위치가 동선을 뒤집을 수 있습니다" },
  { id: "official", type: "paragraph", text: "상하이시 공식 안내는 도시 전역의 여러 주요·소형 철도역을 열거하고 출발 전 정확한 역을 확인하라고 합니다. 쑤저우 교통 당국은 상하이–쑤저우–후저우 노선과 함께 쑤저우남역·성쩌역이 개통해 기존 중심역·북역 이외 가능성이 늘었다고 기록합니다. 따라서 도시 이름만으로는 부족합니다. 여행일의 정확한 열차와 역을 12306에서 검색하세요." },
  { id: "roles-heading", type: "heading", level: 2, text: "모든 도시에 다른 역할을 주세요" },
  { id: "roles", type: "table", caption: "인지도가 아니라 활동이 거점을 정당화합니다", columns: ["도시", "가능한 역할", "숙소를 더하지 않을 때"], rows: [
    ["상하이", "국제 관문, 깊은 도시 거점과 연결점", "환승 1박이 체크인만 더하고 쓸 수 있는 도시 시간이 없음"],
    ["쑤저우", "집중된 정원, 운하, 공예 또는 박물관 우선순위", "다른 거점에서 보호된 방문이 가능하고 짐이 마찰만 늘림"],
    ["항저우", "호수, 차 산지 또는 넓은 도시 우선순위에 현지 아침·저녁 필요", "중심 활동 하나만 있어 집중 방문 가능"],
    ["난징", "역사, 박물관, 성벽 등 분산된 우선순위의 현지 거점", "철도 구간이 짧아 보여서만 포함"]
  ] },
  { id: "gateway-heading", type: "heading", level: 2, text: "공항과 정확한 역부터 시작하세요" },
  { id: "gateway", type: "table", caption: "숙박 일수 전에 이 형태를 검사하세요", columns: ["관문 형태", "먼저 검사할 구조", "주요 숨은 비용"], rows: [
    ["상하이 도착, 항저우·난징 출국", "출국 쪽으로 한 방향 이동", "도중 1박 거점이 너무 많아짐"],
    ["양쪽 항공편 모두 상하이", "상하이 거점 또는 두 거점", "반복 철도 통근 또는 마지막 공항 귀환"],
    ["훙차오공항+훙차오철도", "연결 구간을 도착·출국 가까이에 배치", "원하는 모든 열차가 훙차오 사용"],
    ["푸둥공항", "긴 도시 이동과 마지막 밤 보호", "상하이 공항 접근을 철도 시간에 포함"]
  ] },
  { id: "suzhou-heading", type: "heading", level: 2, text: "쑤저우: 당일 방문 또는 1박" },
  { id: "suzhou", type: "list", ordered: false, items: [
    "우선순위가 집중되고 유용한 역이 활동 지역에 맞으며 고정 귀환이 방문을 일찍 자르지 않을 때 당일 방문을 고르세요.",
    "현지 이른 시간·저녁이 중요하고 우선순위가 여러 지역에 있거나 다음 전진 열차가 상하이 귀환을 없앨 때 숙박하세요.",
    "숙소와 활동 옆에 정확한 쑤저우역을 쓰세요. 쑤저우, 쑤저우북과 새 남부 통로 역은 서로 바꿀 수 없습니다.",
    "짐을 들고 방문한다면 이름 있는 제공업체의 보관을 확인하고 있을 것이라 가정한 사물함에 동선을 기대지 마세요.",
    "유명하다는 이유로 숙박하지 말고 실제 무엇을 보고 얼마나 걸릴지 정하세요."
  ] },
  { id: "workflow-heading", type: "heading", level: 2, text: "여덟 단계로 네 도시 동선 만들기" },
  { id: "workflow", type: "list", ordered: true, items: [
    "방향 전에 실제 도착·출국 공항을 확정하세요.",
    "모든 도시에 대체 불가 목적 하나를 주고 완성도를 위해서만 유지한 도시는 빼세요.",
    "12306에서 정확한 역 조합을 검색하고 도시명뿐 아니라 역명을 기록하세요.",
    "숙소 문에서 활동 문까지의 시간으로 각 도시의 거점과 집중 방문을 비교하세요.",
    "모든 체크아웃, 짐 이동, 보관 공백과 반복 역 접근을 세세요.",
    "같은 문간 이동 계산으로 한 방향, 상하이 거점과 두 거점 혼합을 검사하세요.",
    "이동일 도착 뒤 대체 불가 시간 지정 활동을 두지 마세요.",
    "강제 귀환과 약한 숙소 이동이 적은 구조를 고른 뒤 숙박일을 배정하세요."
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "계획 예시: 네 이름, 두 거점" },
  { id: "example", type: "callout", tone: "neutral", title: "지정 일정이 아닌 예시입니다", body: "상하이 왕복 항공편, 쑤저우 정원 집중 하루, 여러 상하이 우선순위, 현지 아침이 필요한 항저우가 있지만 난징은 선택 박물관 하나뿐이라고 해 보세요. 상하이–항저우 두 거점에 쑤저우 당일 방문을 더하는 편이 네 숙소보다 강하며 난징이 첫 삭제 대상입니다. 난징이 핵심 역사 지역이 되고 다른 출국 관문을 쓸 수 있으면 한 방향 통로가 더 타당합니다." },
  { id: "failure-heading", type: "heading", level: 2, text: "실패와 복구" },
  { id: "failure", type: "table", caption: "열차만 바꾸지 말고 구조를 고치세요", columns: ["실패", "즉시 대응", "다음 설계 변경"], rows: [
    ["상하이·쑤저우의 잘못된 역", "현지 교통을 다시 계산하고 다음 고정 출발을 보호", "모든 일정 줄에 정확한 역 기록"],
    ["당일 방문 절반을 역 접근에 사용", "가장 높은 우선순위만 유지하고 안전 귀환", "현지 거점 또는 방문 삭제"],
    ["네 숙소가 세 체크인 공백 생성", "확인된 경우에만 보관을 쓰고 이동일 선택 활동 삭제", "두 거점으로 재구축"],
    ["마지막 상하이 귀환이 취약", "더 일찍 돌아와 항공편 보호", "오픈조 관문 또는 마지막 상하이 1박 비교"],
    ["공사·운행 변경으로 역이 달라짐", "현재 운영기관 지침 따름", "출발 전 정확한 12306 재검색"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "다른 형태를 고를 때" },
  { id: "switch-rule", type: "paragraph", text: "관문 배치가 귀환을 없애고 모든 도시가 현지 시간을 받을 가치가 있을 때 한 방향을 쓰세요. 같은 방의 안정성이 왕복 통근의 총비용보다 클 때 상하이 거점을 쓰세요. 이동 한 번으로 지리 이익 대부분을 얻을 때 두 거점을 쓰세요. 고유 목적이 가장 약한 도시를 빼고 네 이름을 지키려고 모든 도시를 도착 저녁과 서두른 아침으로 줄이지 마세요." },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "실제 공항과 정확한 철도역이 동선에 있습니다.",
    "모든 도시에 삭제 후에도 남을 고유 목적이 있습니다.",
    "쑤저우 당일 방문·숙박을 활동과 역 위치로 결정했습니다.",
    "모든 숙소 이동과 반복 역 접근을 문간 기준으로 셌습니다.",
    "현재 12306 운행과 이름 있는 교통 공지를 재확인했습니다."
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "교통망은 계속 바뀝니다", body: "역 사용, 공사, 열차 패턴과 공항 연결은 변합니다. 12306과 현지 공식 공지에서 정확한 날짜와 역을 확인하세요. 이 글은 실시간 열차, 소요 시간 또는 전국 공통 당일치기 규칙을 약속하지 않습니다." },
  { id: "scope", type: "callout", tone: "neutral", title: "이 글의 범위", body: "이 글은 네 도시 순서와 한 방향, 상하이 거점, 두 거점 혼합 중 선택만 다룹니다. 도시 교통 가이드는 정확한 수단, 쑤저우 정원 글은 방문 자체, 공항 글은 푸둥과 훙차오를 담당합니다." },
  { id: "help-cta", type: "callout", tone: "decision", title: "창장삼각주 동선을 확인할까요?", body: "도착·출국 공항, 날짜, 숙소 선호, 짐과 도시별 우선순위 하나를 알려 주세요. 좋은 검토는 가장 약한 숙소와 숙소에서 역까지 가장 긴 전체 이동을 찾습니다." },
  { id: "more-planning", type: "internal-links", title: "계속 계획하기", items: [ { label: "상하이 도시 허브", href: "/ko/destinations/shanghai/", description: "이 세부 사항을 정하기 전에 온전한 일수, 어느 강안에 묵을지, 어느 관문을 쓸지 먼저 정하세요." },
    { label: "상하이–쑤저우–항저우 6일 프라이빗 코스 보기", href: "/ko/tours/shanghai-suzhou-hangzhou-6-day-private-tour/", description: "세 도시 모두 충분한 현지 시간이 필요하다면 한 방향으로 이동하는 이 상품 일정을 비교하세요." },
    { label: "상하이–항저우 교통 계획", href: "/ko/guides/shanghai-hangzhou-transport-route/", description: "도시 순서 뒤 역을 고르세요." },
    { label: "쑤저우 정원 읽기", href: "/ko/guides/how-to-read-a-suzhou-garden/", description: "숙소를 더하기 전에 쑤저우 목적을 만드세요." },
    { label: "푸둥과 훙차오 비교", href: "/ko/guides/shanghai-pudong-or-hongqiao-airport/", description: "항공 공항이 최적 동선을 뒤집을 수 있습니다." },
    { label: "오늘의 대운하 이해하기", href: "/ko/guides/grand-canal-everyday-urban-history/", description: "세계유산, 지금도 작동하는 수로와 오늘의 동네 생활을 구분하고 세 관계가 함께 보이는 공개 구간을 고릅니다." },
    { label: "황해 습지 거점 고르기", href: "/ko/guides/northern-jiangsu-yellow-sea-wetland-coast/", description: "흩어진 옌청 습지 방문 구역을 구분하고 둥타이·다펑·옌청 도심 중 거점을 선택한 뒤 새를 못 볼 때의 대안까지 준비합니다." },
  ] },
  { id: "sources", type: "sources", title: "검토한 공식 출처", items: [
    { label: "상하이 철도역 안내", url: "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html", publisher: "상하이시 인민정부", reviewedAt: "2026-08-12" },
    { label: "쑤저우남역·성쩌역 개통", url: "https://jtj.suzhou.gov.cn/szjt/tjgl/202501/4cbd95cd41d747d98bc277a1916c1ad7.shtml", publisher: "쑤저우시 교통운수국", reviewedAt: "2026-08-12" },
    { label: "중국철도 여객 서비스", url: "https://www.12306.cn/en/index.html", publisher: "중국철도 12306", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
