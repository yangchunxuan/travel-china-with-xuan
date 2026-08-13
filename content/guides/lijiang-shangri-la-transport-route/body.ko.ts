import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "리장에서 샹그릴라로 숙박 거점을 바로 옮길 때는 철도가 기본안입니다. 도로 노출을 줄이고 도시 간 구간을 명확하게 관리할 수 있습니다. 일부러 중간에 들르거나 정확한 호텔 위치 때문에 문에서 문까지 차량이 뚜렷하게 유리할 때는 허가된 도로 이동이 더 나을 수 있습니다. 선택은 샹그릴라역에서 끝나지 않습니다. 리장역 약 2,400m에서 샹그릴라역 약 3,274m로 올라가므로 역에서 객실까지와 첫날 밤의 속도도 교통 계획에 포함해야 합니다." },
  { id: "direct-answer", type: "callout", title: "교통수단뿐 아니라 도착 후 첫날 밤도 계획하세요", tone: "decision", body: "도시만 바로 옮긴다면 여행일의 12306에서 열차를 확인하고 호텔 픽업과 조용한 첫 저녁을 준비하세요. 실제 문전 이동이나 계획된 중간 정차의 이점이 있을 때만 도로를 고릅니다. 몸 상태, 날씨, 교통으로 원래 동선이 현실적이지 않다면 저녁 활동을 줄이고 다음 날 일정을 늦추거나 더 낮은 지역에 머무르세요. 체크리스트를 억지로 지키는 것이 목표가 아닙니다." },
  { id: "mode-heading", type: "heading", level: 2, text: "철도와 도로는 서로 다른 여행을 해결합니다" },
  { id: "mode-matrix", type: "table", caption: "실시간 운행 횟수나 고정 도로 시간을 약속하지 않습니다", columns: ["방식", "잘 맞는 경우", "주요 부담", "결론이 바뀌는 조건"], rows: [
    ["여행일 열차: 丽江站→香格里拉站", "호텔을 바로 옮기는 여행, 가족, 단순한 도시 간 이동을 원하는 여행자", "양쪽 역 접근, 짐, 빠른 고도 상승", "맞는 좌석이 없거나 큰 운행 차질, 필수 중간 정차"],
    ["허가된 전용 차량", "정확한 호텔 간 이동 또는 낮 시간에 계획된 중간 정차", "산악 도로 날씨, 교통, 기사 품질, 오래 앉아 있기", "도로 경보, 어두운 시간, 멀미, 확인되지 않은 사업자"],
    ["현재 허가된 장거리 버스", "공식 노선과 승차장이 여행일에 맞는 예산 중심 일정", "터미널 접근, 짐 처리, 운영 변경", "오래된 시간표만 근거이거나 도착 후 호텔 픽업을 놓침"],
    ["리장에 머물고 나중에 이동", "몸이 불편하거나 지치고 날씨가 막혔거나 높은 거점으로 갈 준비가 안 됨", "1박을 쓰고 표 변경 가능", "안전하게 계속 가기 어려우면 이것이 올바른 축소안"]
  ]},
  { id: "altitude-heading", type: "heading", level: 2, text: "철도 도착은 고도 변화이기도 합니다" },
  { id: "altitude", type: "comparison", title: "첫날 밤은 단순하게 보내세요", columns: [
    { heading: "탑승 전", items: ["역 고도가 2,400m에서 3,274m로 변함을 이해", "호텔 연락처와 건강 정보를 바로 꺼낼 수 있게 준비", "불필요하게 빡빡한 일정으로 출발 전부터 탈수·과로하지 않기"] },
    { heading: "도착 후", items: ["확인된 차량으로 정확한 숙소 이동", "적응하는 동안 활동량과 강도 낮추기", "중국 국가위생건강위원회 전문가 조언에 따라 보온·가벼운 식사·금주"] },
    { heading: "의료 대응", items: ["여행 글로 자가 진단하지 않기", "심한 호흡 곤란, 심한 두통, 의식 변화는 즉시 진료 필요", "의료진이 하산·경로 변경을 권하면 따르기"] }
  ]},
  { id: "base-heading", type: "heading", level: 2, text: "리장을 떠나기 전에 샹그릴라 숙박 거점을 특정하세요" },
  { id: "base", type: "table", caption: "‘샹그릴라 호텔’은 픽업 지시가 아닙니다", columns: ["거점 유형", "이동 지시", "첫날 밤 의미"], rows: [
    ["두커쭝 고성 일대", "호텔 전체 중국어명, 차가 설 수 있는 문·도로 만남 지점, 전화번호 전송", "객실에 도착하면 완료하고 저녁은 근처만 고려"],
    ["쑹잔린·도시 북부", "정확한 핀을 쓰고 차량이 합법적으로 갈 수 있는 입구 확인", "유명하다는 이유로 고성을 경유하지 않음"],
    ["도심 밖 리조트·농촌 숙소", "픽업 범위, 차량 신원, 짐 용량, 늦은 도착 규칙을 서면 확인", "마지막 도로 구간은 그날 가장 즉시 조정하기 어려울 수 있음"],
    ["다음 날 관광 출발 지점", "역 픽업 및 호텔 주소와 별개로 확인", "도착 차량이 다음 날 투어로 자동 전환된다고 가정하지 않음"]
  ]},
  { id: "chain-heading", type: "heading", level: 2, text: "이동의 각 단계를 미리 정하세요" },
  { id: "rail-chain", type: "list", ordered: true, items: [
    "12306에서 여행일 열차를 확인하고 丽江站과 香格里拉站을 복사합니다.",
    "리장 호텔에 역으로 떠날 시간을 묻고 도로 정체, 역 진입, 짐 시간을 포함합니다.",
    "샹그릴라 호텔에 열차 기록, 인원, 짐, 연락 가능한 번호를 보냅니다.",
    "샹그릴라역에서 공식 픽업·택시 구역을 이용하고 차량 확인 후 짐을 싣습니다.",
    "막연한 고성 핀이 아니라 숙소의 실제 진입구 또는 합의한 도로 지점으로 갑니다.",
    "픽업, 체크인, 휴식을 우선하고 저녁 식사와 관광은 선택으로 남깁니다."
  ]},
  { id: "scenarios-heading", type: "heading", level: 2, text: "여행자 조건에 따라 달라지는 계획" },
  { id: "scenarios", type: "table", caption: "같은 열차도 서로 다른 첫날 밤을 만듭니다", columns: ["여행자", "실행 계획", "피할 것"], rows: [
    ["첫 중국 여행이며 최근 고지대 체류 없음", "가능하면 낮 열차, 확인된 픽업, 조용한 저녁, 조정 가능한 다음 날 오전", "도착 후 긴 관광과 늦은 저녁"],
    ["연세 있는 부모님과 가족 여행", "불확실한 환승이 가장 적은 경로, 짐은 차량과 함께, 객실 접근 방법 확인", "‘고성’이면 차가 문 앞까지 가고 평탄하다고 가정"],
    ["호도협을 의도적으로 경유", "허가된 도로 동선을 별도 노선으로 짜고 날씨·일광·마지막 픽업을 지정", "즉흥적인 길가 하차를 이동상의 장점으로 포장"],
    ["리장에서 힘든 하루 뒤 늦은 열차 도착", "호텔 직행, 간단한 식사, 저녁 프로그램 없음", "철도로 번 시간을 활동으로 다시 채우기"]
  ]},
  { id: "weather", type: "callout", title: "날씨는 도로 대안과 마지막 환승을 모두 결정합니다", tone: "warning", body: "여행일에 중국기상국에서 두 도시와 도로 구간의 예보·경보를 확인하세요. 비, 눈, 결빙, 낮은 가시거리는 도로 안전과 허가 운송을 바꿀 수 있습니다. 철도도 12306에서 다시 확인해야 합니다. 며칠 전 날씨 앱 화면은 당일 운행 증거가 아닙니다." },
  { id: "downgrade-heading", type: "heading", level: 2, text: "원래 계획대로 이동하기 어려울 때의 안전한 선택" },
  { id: "downgrade", type: "list", ordered: true, items: [
    "선택적인 도착 저녁 활동을 먼저 빼고 확인된 호텔 픽업은 유지합니다.",
    "다음 날 오전 일정은 늦추고 휴식 후 다시 판단합니다.",
    "철도·도로가 끊기면 리장 객실을 유지하거나 더 낮은 지역에서 하루 더 묵습니다.",
    "우려되는 증상이 있으면 관광을 중단하고 진료를 받으며 심한 신호에는 응급 서비스를 이용합니다.",
    "의료진이 하산을 권하거나 일행이 안전하게 계속 갈 수 없으면 선결제 계획보다 낮은 곳으로 경로를 바꿉니다."
  ]},
  { id: "verify-heading", type: "heading", level: 2, text: "리장 출발 전 최종 확인" },
  { id: "verify", type: "list", items: [
    "12306 또는 현재 공식 도로 사업자가 여행일 운송을 확인한다.",
    "두 역명과 샹그릴라 숙소 주소를 중국어로 저장했다.",
    "마지막 차량, 만남 지점, 짐 용량, 늦은 도착 규칙을 확인했다.",
    "일행이 역 고도 약 2,400m에서 3,274m로 상승함을 이해한다.",
    "오늘 중국기상국 예보·경보와 도로·철도 차질을 확인했다.",
    "첫 저녁은 이동, 체크인, 식사, 휴식 외에는 모두 취소할 수 있다.",
    "계속 갈 수 없을 때 더 낮은 거점 숙박과 의료 대응 계획이 있다."
  ]},
  { id: "help", type: "callout", title: "열차, 호텔, 첫날 밤을 함께 점검할까요?", tone: "decision", body: "날짜, 리장 출발지, 샹그릴라 호텔, 인원, 짐, 대략적인 편안함 조건을 Homeground에 보내 주세요. 환승과 시간 여유를 검토할 수 있습니다. 개인 건강 조언은 의료진과 상의하고 교통·날씨 운영은 공식 사업자의 안내를 따르세요." },
  { id: "links", type: "internal-links", title: "다음 계획", items: [
    { label: "Homeground 교통·여행 가이드", href: "/ko/guides/", description: "상위 가이드 모음으로 돌아갑니다." },
    { label: "쿤밍·다리·리장·샹그릴라 순서", href: "/ko/guides/kunming-dali-lijiang-shangri-la-route-order/", description: "샹그릴라가 전체 윈난 일정에 맞는지 결정합니다." },
    { label: "리장 고성 또는 수허: 숙소 선택", href: "/ko/guides/lijiang-old-town-or-shuhe-where-to-stay/", description: "이동 전 리장 출발 거점을 고릅니다." },
    { label: "중국 야간열차 또는 주간 고속철도", href: "/ko/guides/china-night-train-or-daytime-high-speed-rail/", description: "다른 중국 구간에는 더 넓은 교통 틀을 적용합니다." },
    { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "첫날 밤에 충분한 휴식 시간을 둡니다." }
  ]},
  { id: "sources", type: "sources", title: "공식·권위 출처", items: [
    { label: "리장–샹그릴라 철도 개통과 역 고도", url: "https://jtyst.yn.gov.cn/html/2023/xingyexinwen_1127/130663.html", publisher: "윈난성 교통운수청", reviewedAt: "2026-08-13" },
    { label: "철도 운영 및 역–관광지 연결", url: "https://jtyst.yn.gov.cn/html/2024/jiaotongyaowen_1128/3133261.html", publisher: "윈난성 교통운수청", reviewedAt: "2026-08-13" },
    { label: "샹그릴라 관광 직통 서비스", url: "https://www.diqing.gov.cn/xwzx/xsqkx/202408/20240830_215419.html", publisher: "디칭 티베트족자치주 인민정부", reviewedAt: "2026-08-13" },
    { label: "고지대 여행 건강 전문가 안내", url: "https://www.nhc.gov.cn/xcs/c100122/202507/7dfe2bbc60604ed2bd15bec34f7ada64.shtml", publisher: "중국 국가위생건강위원회", reviewedAt: "2026-08-13" },
    { label: "샹그릴라 기상 예보", url: "https://www.weather.com.cn/weather/101291301.shtml", publisher: "중국기상망/중국기상국", reviewedAt: "2026-08-13" },
    { label: "철도 실시간 검색", url: "https://www.12306.cn/en/index.html", publisher: "중국철도 12306", reviewedAt: "2026-08-13" },
    { label: "대표 사진: 샹그릴라역 야경 — 祝鱼贵 (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:20260224_Shangri-La_Railway_Station_02.jpg", publisher: "위키미디어 공용", reviewedAt: "2026-08-13" },
    { label: "대표 사진 라이선스: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0", publisher: "Creative Commons", reviewedAt: "2026-08-13" }
  ]}
] } as const satisfies StructuredPageBody;

export default body;
