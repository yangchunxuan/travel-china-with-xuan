import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "일부 중국 고속철도역이 구도심에서 먼 이유는 철도, 역, 미래 도시지구가 빠른 통과 선형, 토지·건설비, 승강장 용량, 환승 계획, 철거 한계와 지역 개발 목표를 동시에 만족해야 하기 때문입니다. 모든 고속철도역이 외곽에 있는 것도 아니고 먼 역이 자동으로 성공적인 계획인 것도 아닙니다. 여행자는 정확한 역에서 호텔까지 전체 연결을 비교해야 합니다."},
  {id: "forces", type: "table", caption: "역을 구도심 밖으로 옮기는 힘", columns: ["요인", "외곽 부지의 장점", "대가"], rows: [
    ["철도 선형", "밀집 시가지 밖에서 곧은 진입과 통과 운행이 쉬울 수 있습니다.", "도시 안 이동이 길어집니다."], ["토지와 철거", "큰 역과 선로에는 연속된 공간이 필요합니다.", "싼 땅만으로 승객 접근성이 생기지 않습니다."], ["용량", "더 많은 승강장과 확장 공간을 마련할 수 있습니다.", "큰 대합실은 보행과 출구 탐색 시간을 늘립니다."], ["환승", "지하철, 버스, 지역철도를 묶은 새 허브를 계획할 수 있습니다.", "연결망이 늦게 열리거나 계획보다 불편할 수 있습니다."], ["도시 개발", "새 역이 신도시의 중심이 될 수 있습니다.", "개발이 늦으면 역 주변이 고립됩니다."], ["기존 철도", "도심역 재사용은 접근성을 지킵니다.", "기존 진입선이 속도·용량·공사를 제한할 수 있습니다."]
  ]},
  {id: "not-one-actor", type: "heading", level: 2, text: "역 위치는 철도만 정하지 않는다"},
  {id: "not-one-actor-copy", type: "paragraph", text: "중국 역 입지 연구는 철도 목표, 승객 수요와 지방 개발 이해관계의 협상을 설명합니다. 국가 지침은 역 주변 토지 이용을 조정하고 기존 시가지 및 다른 허브와 빠르게 연결하라고 요구합니다. 즉 외곽 입지 자체가 충분한 것이 아니라 지역 연결이 역의 효용을 완성합니다."},
  {id: "suffix-rule", type: "callout", title: "방향 접미어도 승차권 역명의 일부다", body: "동·서·남·북·신은 느슨한 동네 표현이 아니라 서로 다른 역입니다. 승차권, 호텔 경로와 택시 목적지에 전체 한중문 역명을 맞추세요. 역이 여러 개인 도시에서 도시명으로 줄이면 안 됩니다.", tone: "warning"},
  {id: "door-to-door", type: "list", ordered: true, items: ["실제 열차 검색 결과에서 출발역과 도착역 전체 이름을 복사합니다.", "역 중심 핀이 아니라 호텔 입구에서 올바른 역 입구까지 지도에서 확인합니다.", "체크아웃, 도로·지하철, 역 진입과 보안, 대합실 보행, 현실적인 여유 시간을 더합니다.", "도착 뒤 승강장 출구, 짐 이동, 환승 대기와 호텔까지 이동을 더합니다.", "다른 역을 이용하는 대체 열차도 다시 계산합니다. 열차 시간이 길어도 호텔에는 먼저 도착할 수 있습니다.", "결제 전과 여행 당일 지하철, 버스, 역 공지를 다시 확인합니다."]},
  {id: "scenarios", type: "comparison", title: "같은 열차 시간, 다른 전체 여정", columns: [
    {heading: "지하철 직결 호텔·가벼운 짐", body: "한 노선으로 호텔까지 가고 막차가 도착 시간을 충분히 받쳐 주면 외곽역도 효율적입니다."}, {heading: "구도심 호텔·가족 짐·늦은 도착", body: "도심역이나 더 느린 열차가 전체 시간에서 이길 수 있습니다. 환승, 엘리베이터와 야간 도로 이동이 열차 선택의 일부입니다."}
  ]},
  {id: "change-table", type: "table", caption: "답을 바꾸는 새 정보", columns: ["조건", "다시 계산할 것"], rows: [
    ["대중교통 일반 운행 후 도착", "확인된 심야 연결 또는 도로 이동 비용."], ["지하철 긴 환승 두 번", "더 중심 역이나 직행 차량."], ["호텔 변경", "새 입구부터 재계산; ‘도심’은 너무 넓습니다."], ["고령 동행 또는 큰 짐", "엘리베이터, 보행, 승강장과 차량 사이 이동."], ["별도 발권 연결", "역 사이 이동과 놓칠 위험을 위한 여유."]
  ]},
  {id: "recovery", type: "callout", title: "불편한 역으로 이미 예약했다면", body: "같은 도시의 다른 역에서 같은 표를 쓸 수 있다고 가정하지 마세요. 공식 철도 채널에서 변경·환불 가능 여부를 먼저 확인합니다. 표를 유지해야 한다면 정확한 역까지 이동을 확정하고 호텔에서 더 일찍 출발하세요. 도착 표라면 역 전체 이름과 예정 시간을 호텔에 전달한 뒤 마지막 교통을 정합니다.", tone: "decision"},
  {id: "internal-links", type: "internal-links", title: "실제 여행에 적용하기", items: [
    {label: "베이징의 어느 기차역을 고를까", href: "/ko/guides/which-beijing-railway-station/", description: "베이징의 다섯 역을 의사결정 표로 비교합니다."}, {label: "중국 고속철도 첫 이용 가이드", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "승차권, 신분증과 탑승 절차는 전국 가이드에서 확인합니다."}, {label: "중국 전용 차량과 대중교통 비교", href: "/ko/guides/china-private-transfer-or-public-transport/", description: "인원과 짐으로 마지막 이동을 고릅니다."}
  ]},
  {id: "sources", type: "sources", title: "공식 및 독립 자료", items: [
    {label: "철도 여객역 주변 계획 지침", url: "https://www.ndrc.gov.cn/xxgk/zcfb/tz/201805/t20180507_962719.html", publisher: "중국 국가발전개혁위원회", reviewedAt: "2026-08-13"}, {label: "종합교통허브 계획 지침", url: "https://www.ndrc.gov.cn/xxgk/zcfb/tz/201605/W020190905516928367231.pdf", publisher: "중국 국가발전개혁위원회", reviewedAt: "2026-08-13"}, {label: "다중 행위자 고속철도역 입지 연구", url: "https://ir.pku.edu.cn/handle/20.500.11897/620610", publisher: "베이징대학교 기관 리포지터리", reviewedAt: "2026-08-13"}, {label: "역 거리와 도시 영향 연구", url: "https://ces.xmu.edu.cn/CN/abstract/abstract802.shtml", publisher: "China Economic Studies", reviewedAt: "2026-08-13"}, {label: "기존 역과 새 역의 선택", url: "https://www.ort.shu.edu.cn/CN/10.15960/j.cnki.issn.1007-6093.2023.02.005", publisher: "Operations Research and Management Science", reviewedAt: "2026-08-13"}
  ]}
]}; export default body;
