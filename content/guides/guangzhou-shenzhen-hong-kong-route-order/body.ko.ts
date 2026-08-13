import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "대부분의 첫 여행에서는 실제 국제선 관문을 따라 광저우→선전→홍콩 또는 반대 순서의 한 방향 동선을 만드세요. 선전이 두 도시 사이에 있다는 이유만으로 숙박하지 마세요. 숙소 하나와 출입경 영향을 받는 이동을 정당화할 구체적인 선전 우선순위가 있을 때만 거점이 됩니다." },
  { id: "quick-choice", type: "comparison", title: "동선 모양 선택", columns: [
    { heading: "세 거점", body: "각 도시에 최소 하나의 완전한 현지 우선순위가 있고 양쪽 숙소가 선택한 출입경 지점에 맞을 때 사용하세요." },
    { heading: "광저우+홍콩", body: "선전에 보호할 핵심이 없을 때 사용하고 통과 또는 집중 방문으로 숙소 추가를 피하세요." },
    { heading: "선전+홍콩", body: "광저우가 중심이 아니고 선전 우선순위가 지리적으로 일관될 때 사용하세요." }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "국경은 철도 지도 위 선이 아니라 절차입니다" },
  { id: "official", type: "paragraph", text: "홍콩 보안국은 철도와 도로를 포함한 여러 육로 출입경 통제소를 안내하며 각각 교통과 운영 정보가 다릅니다. MTR 고속철은 홍콩 서구룡을 통한 공식 국경 간 여행 계획 정보를 제공합니다. 이 출처들은 선택지를 보여 줄 뿐 모두에게 가장 좋은 통제소 하나를 정하지 않습니다. 여권, 입국 자격, 양쪽 숙소, 짐과 이후 계획이 실용적인 선택을 정하므로 여행 전 공식 요건을 확인하세요." },
  { id: "gateway-heading", type: "heading", level: 2, text: "실제 관문이 방향을 정하게 하세요" },
  { id: "gateway", type: "table", caption: "도착·출국을 먼저 놓고 도시를 맞추세요", columns: ["관문 형태", "가능한 순서", "뒤집을 질문"], rows: [
    ["광저우 권역 도착·홍콩 출국", "광저우→선전→홍콩", "선전이 1박할 만큼 가치 있나요?"],
    ["홍콩 도착·광저우 권역 출국", "홍콩→선전→광저우", "어느 지점이 홍콩 숙소에 맞나요?"],
    ["장거리 왕복 모두 홍콩", "홍콩을 한쪽 또는 양끝에 두고 불필요한 반복 출입경 방지", "중국 본토 구간 뒤 마지막 밤 홍콩이 위험을 줄이나요?"],
    ["왕복 모두 중국 본토 관문", "홍콩을 환승 가정이 아니라 의도적 연장으로", "이 여권의 입국·재입국이 확인됐나요?"]
  ] },
  { id: "shenzhen-test-heading", type: "heading", level: 2, text: "선전 숙박 검사" },
  { id: "shenzhen-test", type: "list", ordered: false, items: [
    "일정을 줄여도 남길 선전 경험을 적으세요. ‘가는 길’은 경험이 아닙니다.",
    "그 우선순위가 숙소와 다음 출입경 지점에 가까운지 확인하세요. 둘 다 먼 유명 지역은 현지 이동을 두 번 더 만듭니다.",
    "짐 보관을 확인한 뒤 숙소를 바꾸지 않는 집중 방문이 같은 가치를 내는지 물으세요.",
    "체크아웃, 짐, 출입경과 새 체크인을 세세요. 1박은 이를 갚을 충분한 현지 시간을 만들어야 합니다.",
    "선전 1박이 두 번째 출입경을 강요하거나 최종 국제선 출국을 약하게 하면 먼저 빼세요."
  ] },
  { id: "crossing-heading", type: "heading", level: 2, text: "양쪽 숙소 문에서 출입경 지점을 고르세요" },
  { id: "crossing", type: "table", caption: "도시 순서 뒤에 교통 방식과 실행을 정하세요", columns: ["요소", "비교할 내용", "가정하지 말 것"], rows: [
    ["홍콩 쪽", "숙소에서 서구룡 또는 해당 출입경 통제소", "홍콩 모든 지역이 같은 거리"],
    ["본토 쪽", "도착점에서 선전·광저우 숙소", "지도상 가까운 국경이 문간 기준 가장 빠름"],
    ["여행 서류", "현재 자격, 원본 여행 서류와 표 정보", "과거 입국이 현재 자격을 보장"],
    ["짐", "계단, 걷기, 보안과 누가 각 짐을 드는지", "고속철이 운반을 없앰"],
    ["운영 정보", "현재 공식 개방, 열차와 서비스 공지", "옛 운영시간·블로그 캡처가 유효"]
  ] },
  { id: "workflow-heading", type: "heading", level: 2, text: "일곱 단계로 동선 만들기" },
  { id: "workflow", type: "list", ordered: true, items: [
    "숙박 일수보다 국제선 도착·출국 공항을 먼저 확정하세요.",
    "각 여행자의 중국 본토·홍콩 입국 요건을 담당 기관에서 확인하고 동선 논리로 자격을 추정하지 마세요.",
    "광저우, 선전, 홍콩에 각각 대체 불가 목적을 주고 보호할 목적이 없는 도시는 빼세요.",
    "같은 국경 구간을 반복하지 않는 한 방향 순서를 고르세요.",
    "열차 분만 보지 말고 양쪽 숙소, 짐과 당일 이후 계획으로 지점을 선택하세요.",
    "국경 이동 직후 대체 불가 시간 지정 활동을 두지 말고 늦은 숙소 도착 계획을 남기세요.",
    "마지막에 이름 있는 공식 출처에서 현재 표와 운영 공지를 검색하세요."
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "계획 예시: 숙박 없는 선전 방문" },
  { id: "example", type: "callout", tone: "neutral", title: "지정 일정이 아닌 예시입니다", body: "여행자가 광저우에서 음식·유산 우선순위가 강하고 홍콩에서 며칠을 보내지만 선전에서는 건축 명소 하나만 본다고 해 보세요. 선전 숙소는 체크인을 두 번 더 만들고 짐을 한 단계 더 이동시킵니다. 현재 교통과 보관으로 집중 방문이 가능하다면 광저우와 홍콩을 두 거점으로 유지해 더 적은 마찰로 선전 목적을 달성할 수 있습니다. 선전 활동이 저녁이나 두 번째 지역까지 필요하면 숙박이 가치 있을 수 있습니다." },
  { id: "failure-heading", type: "heading", level: 2, text: "국경 이동일 실패와 복구" },
  { id: "failure", type: "table", caption: "이후 계획을 먼저 보호하세요", columns: ["실패", "즉시 대응", "설계 교훈"], rows: [
    ["숙소에 맞지 않는 출입경 통제소", "현재 공식 교통으로 재계산하고 비현실적 경로를 달리지 않음", "예약 전에 양쪽 문에서 선택"],
    ["열차·출입경 지연", "숙소에 알리고 선택 저녁 일정 취소", "국경 뒤 시간 지정 핵심 활동 금지"],
    ["여행 서류 문제", "공식 출입경·운항사 지침을 따르고 자격을 즉석 추정하지 않음", "환불 불가 예약 전 모든 여행자 확인"],
    ["선전 숙박에 몇 시간만 남음", "가장 강한 활동만 유지하고 나머지 삭제", "다음 수정에서 숙박 제거"],
    ["홍콩 국제선 출국이 취약", "더 일찍 홍콩으로 이동해 항공편 보호", "마지막 국경 이동을 출국일과 분리"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "더 짧은 동선을 선택할 때" },
  { id: "switch-rule", type: "paragraph", text: "세 도시 모두 지속적인 목적이 있고 국경 이동일이 복구 가능할 때만 세 거점을 사용하세요. 선전 숙박이 도시 목록을 채우기 위해 존재하면 빼세요. 광저우 우선순위가 추가 본토 이동보다 약하면 광저우를 빼세요. 홍콩은 목적지도 관문도 아닐 때만 빼며, 지도에서 국경 절차가 안 보인다는 이유로 무시해서는 안 됩니다." },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "모든 여권의 입국·재입국 자격을 확인했습니다.",
    "방향이 실제 항공 관문을 따르고 출입경을 반복하지 않습니다.",
    "선전에 숙소를 정당화할 목적이 있거나 숙소를 추가하지 않았습니다.",
    "선택 지점이 양쪽 숙소와 실제 짐에 맞습니다.",
    "현재 운영 정보를 확인했고 국경 이동일에 복구 공간이 있습니다."
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "국경 정보는 바뀝니다", body: "출입경 통제소 운영시간, 교통, 발권과 입국 요건은 변합니다. 여행 직전에 홍콩·중국 본토 담당 기관과 해당 운영기관을 확인하세요. 이 동선 가이드는 비자·입국 자격을 판단하지 않습니다." },
  { id: "scope", type: "callout", tone: "neutral", title: "이 글의 범위", body: "이 글은 세 도시 순서와 선전 숙박 여부만 다룹니다. 광저우–홍콩 및 선전–홍콩 가이드는 정확한 수단, 역과 출입경 통제소 이용 절차를 담당합니다." },
  { id: "help-cta", type: "callout", tone: "decision", title: "국경 민감 동선을 확인할까요?", body: "항공 관문, 여권 국적, 숙소 지역, 짐과 도시별 우선순위 하나를 알려 주세요. 여권 번호나 여행 서류 이미지는 보내지 마세요." },
  { id: "more-planning", type: "internal-links", title: "계속 계획하기", items: [
    { label: "광저우–홍콩 교통 비교", href: "/ko/guides/guangzhou-hong-kong-transport-route/", description: "도시 순서 뒤 역과 수단을 고르세요." },
    { label: "선전–홍콩 출입경 지점 선택", href: "/ko/guides/shenzhen-hong-kong-transport-route/", description: "양쪽 숙소와 이후 계획에 맞추세요." },
    { label: "오픈조 항공편 시험", href: "/ko/guides/china-open-jaw-flights-route-planning/", description: "서로 다른 도착·출국 도시가 되돌아가기를 없애는지 보세요." },
    { label: "선전 숙소 지역 비교", href: "/ko/guides/shenzhen-where-to-stay-futian-luohu-nanshan/", description: "도착 허브, 홍콩 이동, 업무 주소, 관광, 저녁과 짐을 기준으로 푸톈·뤄후·난산을 비교합니다." },
  ] },
  { id: "sources", type: "sources", title: "검토한 공식 출처", items: [
    { label: "국경 간 고속철 여행 계획", url: "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html", publisher: "MTR 고속철", reviewedAt: "2026-08-12" },
    { label: "홍콩 육로 출입경 통제소 정보", url: "https://www.sb.gov.hk/eng/special/bound/control.html", publisher: "홍콩특별행정구 정부 보안국", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
