import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "충칭에 에스컬레이터, 공공 엘리베이터, 다리, 터널과 건물을 통과하는 철도가 필요한 이유는 평면 지도가 높이라는 세 번째 축을 숨기기 때문입니다. 두 지점은 가로로 가까워도 고도 차가 큰 별도 도로에 있고 직통 계단조차 없을 수 있습니다. 짧아 보이는 길도 어느 높이인지, 어느 역 출구인지, 어느 건물 입구인지부터 확인하세요."},
  {id: "three-coordinates", type: "table", caption: "충칭 목적지의 세 가지 좌표", columns: ["좌표", "확인할 것", "흔한 실패"], rows: [
    ["가로 위치", "정확한 이름, 지점, 블록.", "근처의 같은 이름 장소로 감."], ["세로 높이", "상부 도로, 하부 도로, 강변 또는 포디엄 층.", "핀이 머리 위나 발아래인데 길을 못 찾음."], ["사용 가능한 연결", "번호가 있는 역 출구, 엘리베이터, 에스컬레이터, 다리 또는 공공 계단.", "직선은 짧지만 긴 오르막이나 우회가 됨."]
  ]},
  {id: "machines-as-streets", type: "heading", level: 2, text: "기계식 이동 시설도 거리망의 일부다"},
  {id: "machines-copy", type: "paragraph", text: "황관 대형 에스컬레이터와 카이쉬안루 공공 엘리베이터는 관광물만이 아닙니다. 충칭 공식 자료는 서로 다른 도시 높이를 연결하는 교통 시설로 설명합니다. 산지 주거지 설계 지침도 엘리베이터와 에스컬레이터를 수직 이동 기반시설로 다룹니다. 경사, 절벽, 건물 포디엄 또는 끊긴 도로가 수평 연결을 막을 때 그 역할이 선명해집니다."},
  {id: "liziba", type: "heading", level: 2, text: "리지바는 우연한 충돌이 아니라 통합 설계다"},
  {id: "liziba-copy", type: "paragraph", text: "충칭시 공식 설명에 따르면 리지바역과 건물은 함께 조정해 설계됐고, 철도 구조와 건물 구조를 분리해 진동과 소음을 관리합니다. 유명한 장면은 오래된 아파트를 나중에 무리하게 관통한 결과가 아니라 제약 많은 지형과 고밀도 도시 공간에 대한 공학적 해법입니다."},
  {id: "route-method", type: "list", ordered: true, items: ["지도 핀만 저장하지 말고 목적지의 전체 중국어 이름과 필요한 입구를 저장합니다.", "역 출구 번호와 설명이 상부·하부 도로 중 어디를 가리키는지 확인합니다.", "경로에 계단, 급경사, 다리, 터널, 쇼핑몰 또는 건물 통로가 있는지 봅니다.", "짐, 휠체어 또는 천천히 걷는 동행이 있다면 호텔이나 시설에 마지막 구간을 중국어로 확인합니다.", "도착 후 긴 내리막을 시작하기 전에 도로명과 건물 입구를 대조합니다.", "엘리베이터나 통로가 닫혔다면 마지막으로 확인한 공공도로 또는 역 대합실로 돌아가 다시 계산합니다."]},
  {id: "scenarios", type: "comparison", title: "같은 지도 거리도 여행자에 따라 달라진다", columns: [
    {heading: "가벼운 당일 가방", body: "안내가 있는 계단은 효율적이고 인상적인 연결일 수 있습니다. 다음 연결이 닫힌 경우 되돌아갈 체력을 남기세요."}, {heading: "여행가방·부모님·이동 제약", body: "지도상 더 멀어도 확인된 엘리베이터, 에스컬레이터, 차량 접근 도로 또는 역 출구를 고르세요. 직선거리보다 수직 이동의 확실성이 중요합니다."}
  ]},
  {id: "wrong-level-recovery", type: "callout", title: "목적지가 바로 위나 아래처럼 보인다면", body: "표지 없는 주거 계단이나 차량용 경사로로 들어가지 마세요. 현재 도로명을 저장하고 직원이 있는 역 입구, 호텔 데스크 또는 큰 공공도로로 돌아가 지정된 상부·하부 입구를 물으세요. 택시에도 관광지 핀보다 도로 높이에 맞는 입구가 필요할 수 있습니다.", tone: "warning"},
  {id: "change-conditions", type: "table", caption: "경로 결정을 바꿔야 할 조건", columns: ["조건", "더 나은 대응"], rows: [
    ["비나 미끄러운 계단", "지붕 있는 철도, 공공 엘리베이터·에스컬레이터 또는 도로 이동을 고릅니다."], ["역 출구 임시 폐쇄", "당일 역 공지를 따르고 오래된 SNS 경로를 재사용하지 않습니다."], ["늦은 도착", "비공식 지름길보다 직원과 조명이 있는 큰길을 사용합니다."], ["큰 짐", "호텔을 나서기 전에 차량 접근 입구를 확인합니다."], ["더위나 피로", "철도역이나 공공 수직 이동 시설에서 경로를 끊고 연속 오르막을 피합니다."]
  ]},
  {id: "dynamic-boundary", type: "callout", title: "확인일: 2026년 8월 13일", body: "사례는 충칭의 도시 형태를 설명하며 모든 엘리베이터, 에스컬레이터, 출구와 통로가 항상 열린다는 약속이 아닙니다. 공사와 폐쇄는 바뀌므로 당일 충칭 철도교통과 시설 공지를 확인하세요.", tone: "neutral"},
  {id: "internal-links", type: "internal-links", title: "알맞은 숙소와 속도로 충칭 계획하기", items: [
    {label: "충칭 숙소 지역 비교", href: "/ko/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/", description: "실제 일정과 역 접근성으로 거점을 고릅니다."}, {label: "중국 지도 핀과 입구 확인", href: "/ko/guides/china-map-coordinate-offset-explained/", description: "중국어 주소와 사용 가능한 입구로 목적지를 다시 확인합니다."}, {label: "중국 휠체어 접근 가능 경로 계획", href: "/ko/guides/wheelchair-accessible-china-route-planning/", description: "접근 가능 표시 하나를 전체 경로 보장으로 보지 말고 구간별로 확인합니다."}
  ]},
  {id: "sources", type: "sources", title: "공식 및 독립 자료", items: [
    {label: "충칭 지형과 철도 공학", url: "https://www.cq.gov.cn/ywdt/jrcq/202111/t20211125_10030692.html", publisher: "충칭시 인민정부", reviewedAt: "2026-08-13"}, {label: "리지바역과 건물", url: "https://www.cq.gov.cn/zjcq/cycq/jplyxl/dsy/dsjp/202409/t20240905_13599583.html", publisher: "충칭시 인민정부", reviewedAt: "2026-08-13"}, {label: "공공 엘리베이터와 황관 에스컬레이터 안전 보고", url: "https://scjgj.cq.gov.cn/zfxxgk_225/gsgg/qtgg/202504/t20250428_14564659.html", publisher: "충칭시 시장감독관리국", reviewedAt: "2026-08-13"}, {label: "산지 주거지 수직 이동 지침", url: "https://zfcxjw.cq.gov.cn/zwgk_166/zfxxgkmls/zcwj/qtwj/202206/W020260528580878403095.pdf", publisher: "충칭시 주택도농건설위원회", reviewedAt: "2026-08-13"}, {label: "3차원 수직 도시의 보행 행동", url: "https://www.sciencedirect.com/science/article/pii/S016920462200192X", publisher: "Landscape and Urban Planning", reviewedAt: "2026-08-13"}
  ]}
]};
export default body;
