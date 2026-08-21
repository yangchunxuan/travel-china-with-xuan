import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "가파른 지형에 건물이 밀집한 충칭은 입체적인 도시입니다. 평면 지도에서 가까운 두 길도 높이가 수십 미터 차이 날 수 있고, 그 사이에 곧바로 이어지는 계단이 없을 수도 있습니다. 에스컬레이터, 공공 엘리베이터, 다리, 터널과 건물에 결합된 철도는 서로 다른 높이를 연결합니다. 이 글에서 ‘위·아래’는 길을 찾을 때 확인해야 하는 도로 높이와 실제 입구를 뜻하며, 위중구의 역사적 ‘상반성·하반성’을 해설하는 글은 아닙니다."},
  {id: "three-coordinates", type: "table", caption: "충칭 목적지에는 세 가지 좌표가 있다", columns: ["좌표", "확인할 것", "흔한 실패"], rows: [
    ["가로 위치", "정확한 장소명, 지점과 블록.", "근처의 같은 이름을 가진 다른 장소에 도착함."],
    ["세로 높이", "상부 도로, 하부 도로, 강변 또는 건물 저층부·데크 층.", "지도 핀이 머리 위나 발아래에 있는데 연결 길이 보이지 않음."],
    ["이용 가능한 연결로", "번호가 있는 역 출구, 엘리베이터, 에스컬레이터, 다리 또는 공공 계단.", "짧은 직선거리가 긴 오르막이나 우회로 바뀜."]
  ]},
  {id: "machines-as-streets", type: "heading", level: 2, text: "엘리베이터와 에스컬레이터도 보행망의 일부다"},
  {id: "machines-copy", type: "paragraph", text: "충칭시 공식 자료는 카이쉬안루 공공 엘리베이터를 중국 최초의 도시 수직 대중교통 시설로 소개하고, 황관 대형 에스컬레이터의 수직 상승 높이를 52.5m로 기록하며 충칭의 특색 있는 대중교통에 포함합니다. 산지 주거지 설계 지침도 엘리베이터와 에스컬레이터를 수직 이동 기반시설로 다룹니다. 이런 사례는 도시 구조를 설명하지만 특정 시설이 오늘 열려 있거나 현재 경로에 적합하다는 증거는 아닙니다."},
  {id: "liziba", type: "heading", level: 2, text: "리지바는 우연히 건물을 뚫은 역이 아니라 통합 설계다"},
  {id: "liziba-copy", type: "paragraph", text: "충칭시 공식 설명에 따르면 리지바역과 건물은 서로 조율해 설계됐습니다. 철도 구조와 건물 구조를 분리해 진동과 소음을 관리합니다. 유명한 장면은 나중에 낡은 아파트를 무심코 관통한 결과가 아니라, 제약이 큰 지형과 고밀도 시가지에 대응한 공학적 해법입니다."},
  {id: "liziba-works-2026", type: "callout", title: "리지바를 당일 다시 확인해야 하는 현실적인 이유", body: "2026년 6월 13일 충칭시 공식 공지는 리지바역 다음 공사 단계에서 대합실·승강장·1번과 2번 출입구를 단계적으로 폐쇄하며 2026년 12월 30일 완공할 예정이라고 밝혔습니다. 이는 날짜가 있는 공사 공지이지 영구 폐쇄 설명이 아닙니다. 역을 이용하거나 전망 동선을 계획하기 전에 충칭 철도교통의 최신 안내를 다시 확인하세요.", tone: "warning"},
  {id: "route-heading", type: "heading", level: 2, text: "충칭의 짧은 도보 구간을 계획하는 법"},
  {id: "route-method", type: "list", ordered: true, items: [
    "지도 핀만 저장하지 말고 목적지의 전체 중국어 이름과 필요한 입구를 저장합니다.",
    "역 출구 번호를 확인하고 출구 설명이 상부 도로와 하부 도로 중 어느 쪽을 가리키는지 봅니다.",
    "경로에 계단, 급한 등고선, 다리, 터널, 쇼핑몰이나 건물 통로가 있는지 살펴봅니다.",
    "짐, 휠체어 또는 보행이 느린 동행이 있다면 호텔이나 방문 시설에 마지막 접근로를 중국어로 확인해 달라고 요청합니다.",
    "도착한 뒤에는 긴 내리막을 시작하기 전에 도로명과 건물 입구를 다시 대조합니다.",
    "엘리베이터, 에스컬레이터나 통로가 닫혀 있으면 마지막으로 확인한 공공도로 또는 역 대합실로 돌아가 그 지점부터 경로를 다시 찾습니다."
  ]},
  {id: "destination-card", type: "table", caption: "어려운 마지막 1km를 걷기 전에 만드는 목적지 카드", columns: ["항목", "기록할 내용"], rows: [
    ["장소", "전체 중국어 이름과 정확한 지점."],
    ["도로 높이", "상부 도로, 하부 도로, 강변, 건물 저층부·데크 또는 층."],
    ["철도 출구", "노선, 역과 정확한 출구 번호."],
    ["계단 없는 연결", "이름이 있는 엘리베이터·에스컬레이터 또는 차량 접근 도로와 현재 폐쇄 여부."],
    ["택시 하차 지점", "관광지 중심 핀이 아니라 차량이 닿는 도로 높이의 입구."],
    ["되돌아갈 곳", "직원이 있는 역 입구, 호텔 데스크 또는 이름이 있는 큰길."]
  ]},
  {id: "scenarios", type: "comparison", title: "같은 지도 거리도 조건에 따라 달라진다", columns: [
    {heading: "가벼운 당일 가방", body: "표지가 잘 된 계단은 빠르고 기억에 남는 연결로가 될 수 있습니다. 다음 연결이 닫혔을 때 되돌아 올라올 체력도 남겨 두세요."},
    {heading: "여행가방·부모님·이동 제약", body: "지도상 조금 더 멀더라도 확인된 엘리베이터, 에스컬레이터, 차량 접근 도로 또는 역 출구를 고르세요. 직선거리보다 높이 이동을 확실히 해결하는 것이 중요합니다."}
  ]},
  {id: "step-free-boundary", type: "callout", title: "엘리베이터 하나가 전체 경로를 무단차로 만들지는 않는다", body: "엘리베이터나 에스컬레이터는 오르막 하나를 없앨 뿐, 출발지부터 목적지까지 모두 접근 가능하다는 뜻은 아닙니다. 역의 각 출구, 연석, 통로와 목적지 입구를 구간마다 확인하고, 하나라도 확인할 수 없다면 도로 높이에서 이용할 수 있는 차량 이동을 대안으로 남겨 두세요.", tone: "warning"},
  {id: "wrong-level-recovery", type: "callout", title: "목적지가 바로 위나 아래에 있는 것처럼 보인다면", body: "표지 없는 주거용 계단으로 들어가거나 차량용 경사로를 걸어 올라가지 마세요. 현재 도로명을 촬영하거나 저장한 뒤 직원이 있는 역 입구, 호텔 데스크 또는 큰 공공도로로 돌아가 이름이 명시된 상부·하부 입구를 물어보세요. 택시에도 관광지 중심 핀이 아니라 해당 도로 높이의 입구를 알려 줘야 할 수 있습니다.", tone: "warning"},
  {id: "change-conditions", type: "table", caption: "경로 선택을 바꿔야 하는 조건", columns: ["조건", "더 나은 대응"], rows: [
    ["비 또는 미끄러운 계단", "지붕이 있는 철도 구간, 공공 엘리베이터·에스컬레이터 또는 도로 이동을 우선합니다."],
    ["역 출구 임시 폐쇄", "현재 역 공지를 따르고 오래된 소셜미디어 경로를 그대로 쓰지 않습니다."],
    ["늦은 시각 도착", "확인된 조명 있는 도로 높이 입구를 이용합니다. 운영 여부를 확인하지 않은 쇼핑몰, 건물 통로, 엘리베이터나 에스컬레이터에 기대지 않습니다."],
    ["큰 짐", "호텔을 나서기 전에 차량이 접근할 수 있는 입구를 확인합니다."],
    ["더위 또는 피로", "철도역이나 공공 수직 이동 시설에서 구간을 나눠 연속된 오르막을 피합니다."]
  ]},
  {id: "dynamic-boundary", type: "callout", title: "확인일: 2026년 8월 13일", body: "여기에 든 물리적 사례는 충칭의 도시 형태를 설명할 뿐, 모든 엘리베이터·에스컬레이터·출구·통로가 열려 있다는 약속이 아닙니다. 2026년 리지바 공사처럼 공사와 폐쇄 상태는 바뀝니다. 당일 충칭 철도교통과 해당 시설의 최신 공지를 확인하세요.", tone: "neutral"},
  {id: "help", type: "callout", title: "충칭의 한 경로를 입체적으로 확인해야 하나요?", body: "날짜, 호텔과 목적지의 정확한 입구, 인원, 짐, 걸을 수 있는 범위와 도착 예정 시각을 Homeground에 보내 주세요. 어느 높이, 출구와 수직 연결 시설을 확인해야 하는지 표시해 드릴 수 있습니다. 다만 엘리베이터, 에스컬레이터나 통로가 계속 열려 있을 것이라고 약속할 수는 없습니다.", tone: "decision"},
  {id: "internal-links", type: "internal-links", title: "알맞은 숙소와 속도로 충칭 계획하기", items: [{ label: "충칭 도시 가이드부터 시작하세요", href: "/ko/destinations/chongqing/", description: "이 전문 가이드에 들어가기 전에 숙박 일수, 숙소 거점, 교통 관문과 우룽·다쭈 포함 여부를 정하세요." },
    {label: "충칭에서 머물 지역 고르기", href: "/ko/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/", description: "실제 일정과 역 접근성을 기준으로 거점을 고릅니다."},
    {label: "중국 지도 좌표와 실제 입구 확인", href: "/ko/guides/china-map-coordinate-offset-explained/", description: "중국어 주소와 이용 가능한 입구로 목적지를 다시 확인합니다."},
    {label: "중국 휠체어 접근 가능 경로 계획", href: "/ko/guides/wheelchair-accessible-china-route-planning/", description: "접근 가능 표시 하나가 전체 경로를 보장한다고 가정하지 말고 구간별로 확인합니다."}
  ]},
  {id: "sources", type: "sources", title: "공식 및 독립 자료", items: [
    {label: "충칭의 지형과 철도 공학", url: "https://www.cq.gov.cn/ywdt/jrcq/202111/t20211125_10030692.html", publisher: "충칭시 인민정부", reviewedAt: "2026-08-13"},
    {label: "리지바역과 건물", url: "https://www.cq.gov.cn/zjcq/cycq/jplyxl/dsy/dsjp/202409/t20240905_13599583.html", publisher: "충칭시 인민정부", reviewedAt: "2026-08-13"},
    {label: "카이쉬안루 엘리베이터와 황관 에스컬레이터의 대중교통 사실", url: "https://www.cq.gov.cn/ywdt/zwhd/bmdt/202504/t20250414_14519112_wap.html", publisher: "충칭시 인민정부", reviewedAt: "2026-08-13"},
    {label: "황관 에스컬레이터를 충칭 특색 대중교통으로 소개한 자료", url: "https://jtj.cq.gov.cn/sy_240/bmdt/201910/t20191010_4370661.html", publisher: "충칭시 교통운수위원회", reviewedAt: "2026-08-13"},
    {label: "리지바 공사와 단계적 폐쇄 공지", url: "https://www.cq.gov.cn/ywdt/jrcq/202606/t20260613_15751500_app.html", publisher: "충칭시 인민정부", reviewedAt: "2026-08-13"},
    {label: "산지 주거지의 수직 이동 지침", url: "https://zfcxjw.cq.gov.cn/zwgk_166/zfxxgkmls/zcwj/qtwj/202206/W020260528580878403095.pdf", publisher: "충칭시 주택도농건설위원회", reviewedAt: "2026-08-13"},
    {label: "역 출구와 에스컬레이터 폐쇄의 최신 사례", url: "https://cq.gov.cn/ywdt/bmts/202606/t20260630_15787973.html", publisher: "충칭시 인민정부", reviewedAt: "2026-08-13"},
    {label: "충칭 철도교통 최신 운행 정보", url: "https://www.cqmetro.cn/smbsj.html", publisher: "충칭 철도교통", reviewedAt: "2026-08-13"},
    {label: "입체 수직도시의 보행 행동", url: "https://www.sciencedirect.com/science/article/pii/S016920462200192X", publisher: "Landscape and Urban Planning", reviewedAt: "2026-08-13"},
    {label: "대표 사진: Siyuwj가 2017년 9월 21일 촬영한 충칭 황관 대형 에스컬레이터 내부(크롭)", url: "https://commons.wikimedia.org/wiki/File:Crown_Escalator,_Chongqing,_2017-09-21.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13"},
    {label: "크롭한 대표 사진의 CC BY-SA 3.0 라이선스", url: "https://creativecommons.org/licenses/by-sa/3.0/", publisher: "Creative Commons", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
