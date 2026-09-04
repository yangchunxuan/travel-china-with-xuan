import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer", type: "lead",
      text: "구이린·양숴는 다음 세 조건을 모두 충족할 때만 추가하세요. 카르스트와 강 풍경이 이번 여행에서 정말 중요한 목표여야 하고, 두 번의 장거리 이동을 빼고도 온전히 체험할 시간이 남아야 하며, 수상 활동이 지연되거나 취소되어도 국제선 출국에 영향이 없어야 합니다. 베이징으로 입국해 상하이에서 출국한다면 베이징 → 시안 → 구이린·양숴 → 상하이 순서를 먼저 검토하고, 국제선 관문이 반대라면 전체 순서도 뒤집어 검토합니다. 도착·출발일의 자투리 시간을 관광일로 계산해야만 성립하는 일정이라면 구이린은 빼는 편이 낫습니다.",
    },
    {
      id: "three-gate-answer", type: "table", caption: "네 번째 목적지는 세 관문을 모두 통과해야 제 몫을 합니다", columns: ["관문", "통과", "탈락"],
      rows: [
        ["고유한 가치", "구이린의 카르스트·강 풍경이 여행의 성격을 실제로 바꾼다", "베이징·시안·상하이라는 더 중요한 목표 사이에 사진 한 장을 위해 끼워 넣는 선택이다"],
        ["쓸 수 있는 시간", "진입, 숙박 거점 이동, 이탈을 제외한 뒤에도 보호된 현지 체험 구간이 남는다", "늦은 도착, 변수에 취약한 활동 하나, 이른 출발만 남는다"],
        ["복구 가능한 출발", "운영 변경이 생겨도 유연한 활동만 빠지고 국제선에는 영향이 없다", "수상 활동, 도로 이동, 별도 항공편이 같은 날 모두 정상 작동해야만 한다"],
      ],
    },
    {
      id: "scope-boundary", type: "callout", tone: "neutral", title: "네 도시 일정표가 아니라 하나의 거시적 결정",
      body: "이 글은 이미 선택한 베이징–시안–상하이 축에 구이린·양숴 구간을 넣을지, 넣는다면 어느 위치에 둘지만 판단합니다. 구이린·양숴·룽지 내부 순서, 강 상품 선택, 양숴 호텔, 실시간 항공편·열차·가격·소요 시간이나 날짜별 일정은 다루지 않습니다.",
    },
    { id: "module-heading", type: "heading", level: 2, text: "구이린과 양숴를 네 번째 역명이 아닌 하나의 지역 구간으로 보세요" },
    {
      id: "module-value", type: "paragraph",
      text: "이 구간은 여행의 경험 구성을 바꾼다는 점에서 의미가 있을 수 있습니다. 유네스코는 구이린 카르스트를 중국 남방 카르스트 연속유산의 일부로 설명하며, 탑 모양·원뿔 모양 카르스트와 강을 따라 펼쳐지는 경관을 특징으로 듭니다. 베이징과 시안은 제국사, 국가사, 고고학적 관심을 충족할 수 있고, 상하이는 현대 도시, 건축 또는 국제선 관문 역할을 맡을 수 있습니다. 여행자가 이와 대비되는 풍경을 적극적으로 원할 때 구이린·양숴는 추가 이동을 감수할 가치를 얻습니다. 세계유산 등재는 풍경이 고유하다는 근거이지, 모든 첫 중국 여행에 반드시 넣어야 한다는 뜻은 아닙니다.",
    },
    {
      id: "role-comparison", type: "comparison", title: "구성 하나를 제외했을 때 무엇이 사라지는지 물어보세요", columns: [
        { heading: "세 도시 축 유지", items: ["가장 중요한 목표가 역사, 도시 생활, 확정된 국제선 관문이다.", "구이린을 빼면 두 번의 장거리 이동과 지역 내 숙박 거점 연결이 사라진다.", "자연 구간이 없어도 여행의 목적이 일관되게 남는다."] },
        { heading: "산수 구간 추가", items: ["탑 카르스트, 강 풍경, 느린 농촌 관찰이 여행의 최우선 목표에 속한다.", "이 구간을 빼면 일정이 도시나 기념물 중심으로 지나치게 치우친다.", "날씨와 수상 운항에 따라 선택한 체험이 바뀔 수 있음을 받아들인다."] },
        { heading: "덧붙이지 말고 교체", items: ["전체 여행에서 추가 구간과 기존 세 도시의 역할을 모두 지킬 수 없다.", "주제가 가장 약하면서 확정 관문이나 고정 예약을 맡지 않는 도시만 교체 대상으로 검토한다.", "정직한 선택은 네 지명을 압축하는 것이 아니라 다른 세 구간 여행을 만드는 것이다."] },
      ],
    },
    { id: "tax-heading", type: "heading", level: 2, text: "풍경을 세기 전에 지역 이동 부담부터 계산하세요" },
    {
      id: "tax-ledger", type: "table", caption: "이 구간은 여러 의존 관계가 이어진 사슬입니다", columns: ["단계", "반드시 특정할 것", "모를 때의 보수적 처리"],
      rows: [
        ["지역 진입", "실제 항공편 또는 열차, 정확한 구이린 지역 관문, 수하물, 늦은 도착에도 프런트 대응이 가능한 첫 숙소", "이동 구간으로 처리하고 고정 관광은 넣지 않는다"],
        ["체험 지점 도달", "호텔, 선착장, 역 또는 합법적인 차량 픽업과 현재 상품의 진행 방향", "역 도착을 강이나 농촌 체험으로 계산하지 않는다"],
        ["거점 이동 또는 유지", "구이린 시내, 양숴 중심부, 싱핑 또는 확인된 다른 숙소 중 어디서 그날 밤을 보낼지", "내부 순서는 해당 가이드에 맡기고 호텔 이동을 지레 가정하지 않는다"],
        ["산수 구간 운영", "이강, 위룽허 또는 육상 체험 중 이름을 특정한 우선순위와 현재 제한", "지역을 선택할 이유가 유지되는 대안을 마련한다"],
        ["지역 이탈", "정확한 역 또는 공항, 수하물 연결, 다음 도시 숙소와 고정 일정", "국제선 전에 프런트 대응이 가능한 도시 숙소를 완충지로 확보한다"],
      ],
    },
    {
      id: "guilin-station-figure", type: "figure", src: "/images/guides/guilin-airport-or-railway-station-arrival-guide/hero-1600.webp", width: 1600, height: 1000,
      alt: "구이린역 건물 외부와 역 앞 광장.",
      caption: "구이린역은 이름이 정해진 관문 중 하나입니다. 이 허가된 사진만으로 독자의 열차, 호텔 이동 또는 미래 날짜에 맞는 역을 판단할 수는 없습니다.",
    },
    {
      id: "zero-visit-rule", type: "callout", tone: "warning", title: "모든 도시 간 이동은 관광 시간 0에서 시작하세요",
      body: "시안–구이린 지역 구간과 구이린 지역–상하이 구간 모두 처음에는 쓸 수 있는 관광 시간이 0이라고 봅니다. 날짜가 정해진 표, 정확한 터미널, 수하물, 차량 연결, 체크인, 교체 가능한 현지 활동을 모두 넣고도 방해받지 않는 시간이 실제로 남을 때만 상향 조정하세요. 검색 결과에 빠른 이동수단이 나온다고 해서 호텔을 옮기는 날이 온전한 산수 관광일이 되지는 않습니다.",
    },
    { id: "gates-heading", type: "heading", level: 2, text: "세 관문은 순서대로 적용하고 점수 하나로 평균 내지 마세요" },
    {
      id: "gate-method", type: "list", ordered: true,
      items: [
        "산수 구간의 목적을 한 문장으로 쓰세요. ‘구이린 보기’는 탈락입니다. ‘세 도시 축에는 없는 탑 카르스트의 강 경관을 관찰한다’처럼 검증 가능한 목적이어야 합니다.",
        "시간을 적지 않은 채 진입과 이탈의 전체 사슬을 그리세요. 발권 대상 공항·역, 도로 연결, 수하물, 첫 숙소와 마지막 숙소, 그다음 고정 일정을 모두 포함합니다.",
        "이름을 특정한 산수 목표는 보호된 시간 안에만 배치하세요. 확인되지 않은 도착일, 출발일 또는 호텔 이동 시간에서 시간을 빌리지 않습니다.",
        "실패 상황을 가정해 선호한 수상 활동을 삭제해 보세요. 그 결과 지역의 가치가 양쪽 장거리 이동을 정당화하지 못한다면 날씨 변수에 지나치게 취약한 구간입니다. 예약 전에 빼거나 다시 설계해야 합니다.",
        "두 번째 모의 상황에서는 지역 출발을 지연시켜 보세요. 국제선이 복구 수단이 되어 버린다면 이 구간을 더 앞에 두거나 삭제합니다.",
      ],
    },
    {
      id: "gate-outcomes", type: "table", caption: "관문에는 점수가 아니라 결정이 있습니다", columns: ["결과", "의미", "다음 행동"],
      rows: [
        ["세 조건 모두 통과", "산수 구간이 여행을 바꾸고, 실제 시간을 확보하며, 안전하게 이탈할 수 있다", "지역 관문 및 내부 순서를 담당하는 가이드로 넘어간다"],
        ["가치는 통과, 시간은 탈락", "관심은 진짜지만 이번 여행에서는 보호할 수 없다", "우선순위가 낮은 도시를 교체하거나 실제 시간을 늘리거나 구이린을 다음 여행으로 미룬다"],
        ["가치와 시간은 통과, 복구는 탈락", "모든 운항이 정시에 진행되어야만 노선이 성립한다", "이 구간을 출국일에서 멀리 옮기거나 뺀다"],
        ["가치 탈락", "네 번째 목적지는 여행 목적이 아니라 지명 수집이다", "세 도시 축을 유지한다"],
      ],
    },
    { id: "placement-heading", type: "heading", level: 2, text: "보편적인 최적 경로가 아니라 고정된 국제선 관문에서 위치를 정하세요" },
    {
      id: "placement-table", type: "table", caption: "국제선 항공권이 확정된 뒤 검토할 거시적 배치", columns: ["확정된 관문 형태", "먼저 검토할 전체 순서", "결론을 뒤집을 수 있는 조건"],
      rows: [
        ["베이징 입국, 상하이 출국", "베이징 → 시안 → 구이린·양숴 → 상하이", "날짜별 이동 한쪽이 받아들이기 어렵거나 상하이 완충 시간이 사라진다"],
        ["상하이 입국, 베이징 출국", "상하이 → 구이린·양숴 → 시안 → 베이징", "반대 방향의 날짜별 이동이나 베이징 출국 연결이 더 불리하다"],
        ["상하이 왕복", "구이린을 출국편에서 떨어뜨리고 상하이로 돌아오는 구간을 표시한다", "되돌아오는 이동이 구이린의 유일한 온전한 체험 시간을 없앤다"],
        ["베이징 왕복", "관광 시간을 배분하기 전에 남쪽 산수 구간과 베이징 귀환을 모두 표시한다", "귀환 때문에 베이징·시안 또는 산수 구간의 보호된 우선순위가 사라진다"],
        ["항공권 미발권", "두 오픈조 방향과 같은 도시 왕복안을 정직하게 비교한다", "수하물, 운임 조건, 분리 발권 위험 또는 공항 접근이 결론을 바꾼다"],
      ],
    },
    {
      id: "last-water-warning", type: "callout", tone: "decision", title: "마지막 수상 활동이 국제선 출국을 좌우하게 두지 마세요",
      body: "2026년 공식 공지에는 상황 변화에 따라 이강의 구간별 운항 중단과 재개 시점이 달랐던 사례가 있습니다. 이는 미래를 예측하는 자료가 아니라 복구 원칙의 근거입니다. 마지막 수상 활동 뒤에는 확인된 지역 이탈 수단과 도시 내 국제선 완충 시간이 있어야 합니다. 유람선, 뗏목, 도로 이동, 별도 발권 국제선을 하나의 필수 사슬로 연결해서는 안 됩니다.",
    },
    { id: "nodes-heading", type: "heading", level: 2, text: "지역 구간은 하나로 보되 실제 관문은 각각 이름을 밝히세요" },
    {
      id: "node-identities", type: "paragraph",
      text: "현재 관광지 공식 교통 안내는 구이린역, 구이린북역, 구이린서역, 양숴역을 서로 구분합니다. 고속철도역에서 싱핑 선착장으로 가는 별도 셔틀과 양숴 중심부로 가는 도로 노선도 따로 안내하므로, 역 이름만으로 양숴 호텔에 도착했다고 볼 수 없습니다. 구이린 량장 국제공항도 별개의 관문입니다. 이 구분은 이동 원장에 중요하지만, 실제 관문 선택은 산수 구간이 통과된 뒤 최신 관문·교통 가이드가 담당합니다. 이 글에서는 ‘구이린’이라는 공통 지명을 서로 바꿔 쓸 수 있는 터미널로 처리하지 않습니다.",
    },
    {
      id: "yangshuo-station-figure", type: "figure", src: "/images/guides/guilin-yangshuo-transport-route/hero-1600.webp", width: 1600, height: 1000,
      alt: "양숴역의 외관.",
      caption: "양숴역이라는 이름 뒤에는 추가 도로 이동이 숨어 있을 수 있습니다. 이 허가된 사진은 촬영일 당시의 역을 확인할 뿐, 현재 운행 열차, 셔틀, 호텔 이동 또는 양숴 중심부 도착을 입증하지 않습니다.",
    },
    {
      id: "regional-owner-handoff", type: "callout", tone: "neutral", title: "거시적 판단은 지역 경계에서 멈추세요",
      body: "구이린·양숴가 일정에 들어갈 자격을 얻었다면 별도의 구이린 관문 가이드와 구이린–양숴 교통 가이드를 이용하세요. 정확한 출발·도착 지점, 숙박 거점, 현재 운영 상태를 확인한 뒤에만 지역 내부 순서를 정합니다. 그런 실행 선택은 이 글의 전체 동선 판단 범위에 포함되지 않습니다.",
    },
    { id: "travellers-heading", type: "heading", level: 2, text: "세 여행자를 보면 같은 네 번째 목적지의 지위가 어떻게 달라지는지 알 수 있습니다" },
    {
      id: "traveller-landscape", type: "callout", tone: "neutral", title: "여행자 A: 풍경이 중국에 오는 가장 중요한 두 이유 중 하나",
      body: "베이징으로 입국해 상하이에서 출국하며 도시만 보는 노선을 후회할 여행자입니다. 산수 구간은 가치 관문을 통과합니다. 다만 날짜가 정해진 두 도시 간 이동, 정확한 지역 숙박 거점 연결, 온전한 카르스트·강 체험 구간을 확보한 뒤에만 유지합니다. 수상 상품이 변경되어도 미리 고른 육상 풍경 목표가 지역 방문의 가치를 보존하며, 상하이 출국 완충 시간도 남습니다.",
    },
    {
      id: "traveller-history", type: "callout", tone: "warning", title: "여행자 B: 세 도시가 이미 모든 보호된 시간을 사용",
      body: "양보할 수 없는 목표가 베이징 곳곳의 명소, 시안 고고학, 상하이의 고정 일정으로 흩어져 있습니다. 구이린에는 늦은 도착, 운영 변수에 민감한 활동 하나, 이른 출발만 남습니다. 풍경은 매력적이지만 쓸 수 있는 시간 관문에서 탈락합니다. 정답은 네 번의 이동 조각을 네 목적지로 세는 것이 아니라, 세 도시 노선을 유지하거나 도시 하나를 교체하는 것입니다.",
    },
    {
      id: "traveller-constraints", type: "callout", tone: "neutral", title: "여행자 C: 선호한 뗏목 상품의 이용·여권 규정이 미확인",
      body: "일행 중 한 명의 연령, 신장, 건강 또는 이동 능력이 특정 위룽허 상품의 조건과 맞지 않을 수 있고, 현재 공식 페이지에서도 외국 여권 예약 절차가 완전히 확인되지 않았습니다. 일행은 이용 가능하다고 가정하지 않습니다. 별도로 확인한 적합한 육상 또는 수상 대안이 산수 목적을 지킬 때만 이 구간을 유지합니다. 그렇지 않다면 산수의 가치는 여전히 분명해도 이 일행에게는 쓸 수 있는 시간 관문을 통과하지 못합니다.",
    },
    { id: "recovery-heading", type: "heading", level: 2, text: "노선의 고정된 양끝이 아니라 유연한 층을 포기해 복구하세요" },
    {
      id: "recovery-table", type: "table", caption: "산수 구간에서 생길 수 있는 문제와 복구", columns: ["문제", "첫 번째 안전 대응", "전체 노선에 미치는 결과"],
      rows: [
        ["직항처럼 보이던 항공편이나 열차를 이용할 수 없음", "실제 날짜와 정확한 터미널로 12306 또는 운항 항공사에서 검색한다", "양쪽 문전 연결이 모두 받아들일 만할 때만 구이린을 유지하고, 아니면 뺀다"],
        ["도착역이 다른 구이린 지역 역으로 배정됨", "역–숙소 이동과 수하물 연결을 다시 만든다", "전체 노선을 바꾸기 전에 도착일 활동부터 삭제한다"],
        ["이강 특정 구간 또는 선택한 수상 상품이 중단됨", "해당 운영자 공지를 따르고 검증된 비수상 대안을 이용한다", "구이린 구간의 고유한 목적이 사라지면 호텔을 취소하고 일정에서 뺀다"],
        ["위룽허 상품 제한으로 일행 중 한 명이 이용 불가", "일행을 나누거나 규정을 피해 즉흥적으로 진행하지 않는다", "별도로 확인해 일행 모두에게 적합한 대안을 택하거나 산수 구간을 뺀다"],
        ["지역 출발 지연", "다음 예약 숙소와 입실 가능 여부를 지키고 유연한 도시 활동을 포기한다", "상하이·베이징 완충 시간을 사용하되 국제선 연결은 절대 압축하지 않는다"],
      ],
    },
    { id: "booking-heading", type: "heading", level: 2, text: "의존 관계 순서에 따라 산수 구간을 예약하세요" },
    {
      id: "booking-order", type: "list", ordered: true,
      items: [
        "국제선 관문 도시, 실제 공항, 수하물 처리 방식, 항공권 변경 조건을 확인합니다.",
        "구이린이 조용히 밀어내서는 안 되는 세 도시의 우선순위를 적습니다.",
        "특정 수상 운항을 전제로 하지 않고도 성립하는 지역 목적과 대안을 정합니다.",
        "검색 가능한 시점이 되면 정확한 날짜, 공항·역, 실제 숙소 위치를 사용해 양쪽 도시 간 이동을 확인합니다.",
        "지역 순서는 기존 관문·교통·숙박·룽지 가이드에 맡기고, 관문 하나라도 미확인이라면 예약을 변경 가능하게 유지합니다.",
        "첫 취소 기한과 출발 직전에 해당 강 구간·상품, 참가 조건, 날씨, 운영 공지를 다시 확인합니다.",
      ],
    },
    { id: "final-heading", type: "heading", level: 2, text: "네 번째 구간의 근거가 원장 하나에 들어가야 준비가 끝납니다" },
    {
      id: "final-ledger", type: "table", caption: "유지 결정 전에 필요한 최종 근거", columns: ["결정", "필요한 근거", "없을 때"],
      rows: [
        ["전체 방향", "발권했거나 실질적으로 비교 가능한 국제선 관문", "정방향과 역방향을 모두 잠정안으로 둔다"],
        ["산수 구간 진입", "날짜가 있는 표, 정확한 관문, 수하물, 첫 숙소", "도착일 산수 관광 시간을 인정하지 않는다"],
        ["고유한 체험", "이름을 특정한 풍경 목표와 적합한 현재 상품 또는 육상 대안", "산수 구간을 추가하지 않는다"],
        ["산수 구간 이탈", "정확한 터미널, 마지막 숙소, 수하물, 다음 고정 일정", "복구 여지를 추가하거나 구이린을 뺀다"],
        ["실패 상태", "삭제 가능한 활동 하나, 확인된 지역 이탈 연결, 도시 완충 시간이 함께 국제선을 보호한다", "노선이 아직 준비되지 않았다"],
      ],
    },
    {
      id: "editorial-judgment", type: "callout", tone: "warning", title: "Homeground 편집 판단",
      body: "세 관문 검사, 미확인 이동 구간에 관광 시간 0을 부여하는 원칙, 수상 활동과 국제선을 하나의 연쇄로 묶지 않는 규칙은 보수적인 여행 설계 판단입니다. 공식 자료는 관문 명칭, 유산 가치, 상품 구분, 실제 운항 중단 사례를 확인하지만, 특정 여행자나 날짜에 이 구간이 맞는다고 보장하지는 않습니다.",
    },
    {
      id: "help-cta", type: "callout", tone: "decision", title: "네 번째 목적지 결정을 사람이 직접 검토해 드릴까요?",
      body: "여행 날짜, 인원, 대략적인 예산, 실제 도착·출발 공항, 수하물, 구이린 풍경의 우선순위를 남겨 주세요. Homeground가 실시간 시간표를 꾸며 내거나 완전한 개인 일정을 공개하지 않고도 가장 취약한 이동 구간과 먼저 뺄 항목을 찾아드릴 수 있습니다.",
    },
    {
      id: "internal-links", type: "internal-links", title: "다음 계획으로 이어가기", items: [
        { label: "첫 중국 여행 계획하기", href: "/ko/plan/", description: "네 번째 구간 유지 여부를 정한 뒤 상위 여행 계획 경로로 돌아갑니다." },
        { label: "베이징·시안·상하이 순서 정하기", href: "/ko/guides/beijing-xian-shanghai-route-order/", description: "구이린을 검토하기 전에 세 도시 축과 국제선 관문을 확정합니다." },
        { label: "실제 구이린 도착 관문 선택하기", href: "/ko/guides/guilin-airport-or-railway-station-arrival-guide/", description: "산수 구간이 통과한 뒤 KWL, 구이린역, 구이린북역, 구이린서역을 비교합니다." },
        { label: "구이린–양숴 교통 비교하기", href: "/ko/guides/guilin-yangshuo-transport-route/", description: "지역 내 열차, 도로, 강의 도착 지점 결정을 해당 가이드에 맡깁니다." },
        { label: "오픈조와 왕복 항공편 비교하기", href: "/ko/guides/china-open-jaw-flights-route-planning/", description: "전체 방향을 고정하기 전에 국제선 관문 구조를 검토합니다." },
        { label: "전체 일정이 너무 빠듯한지 확인하기", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "이름을 특정한 산수 구간 결정을 마친 뒤 전체 노선을 점검합니다." },
      ],
    },
    {
      id: "sources", type: "sources", title: "검토한 공식·1차·이미지 자료", items: [
        { label: "외국 여권 철도 승객 FAQ", url: "https://www.12306.cn/en/faq.html", publisher: "China Railway 12306", reviewedAt: "2026-09-01" },
        { label: "민간항공 공항 목록", url: "https://www.caac.gov.cn/GYMH/MHGK/MYJC/index_6.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-09-01" },
        { label: "구이린 량장 국제공항", url: "https://gl.airport.gx.cn/", publisher: "Guangxi Airport Management Group", reviewedAt: "2026-09-01" },
        { label: "구이린 공항 지상교통 안내", url: "https://gl.airport.gx.cn/html/jiaotongxinxi/jiaotonggongju/snjcdb/73.html", publisher: "Guilin Liangjiang International Airport", reviewedAt: "2026-09-01" },
        { label: "현재 구이린 지역 역·지상교통 노드", url: "https://www.lijiangriver.com.cn/page/article/lyfw.jtcx", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "중국 남방 카르스트 세계유산 기록", url: "https://whc.unesco.org/en/list/1248", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-09-01" },
        { label: "이강 뗏목 구간 재개 공지", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/246", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "이강 핵심 유람선 노선", url: "https://www.lijiangriver.cn/page/article/ylxl.ljjhy", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "이강 뗏목 노선 목록", url: "https://www.lijiangriver.cn/page/article/ylxl.ljpfy", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "이강 공식 발권 채널", url: "https://www.lijiangriver.cn/page/article/lyfw.pwxx", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "날짜가 명시된 이강 운항 중단 공지", url: "https://www.liriver.com.cn/mobile/article/zxlj.tzgg/191", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "날짜가 명시된 구간 재개 공지", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/252", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-01" },
        { label: "위룽허 운영사", url: "https://www.ysylh.cn/about/", publisher: "Yangshuo Yulong River Scenic Area Tourism Development Co.", reviewedAt: "2026-09-01" },
        { label: "위룽허 상품 이용 제한", url: "https://www.ysylh.cn/matou/2024/6a7d914728304f999d023243c40b8680.shtml", publisher: "Yangshuo Yulong River Scenic Area Tourism Development Co.", reviewedAt: "2026-09-01" },
        { label: "구이린·양숴 기상 포털", url: "https://gx.weather.com.cn/guilin/index.shtml", publisher: "China Weather", reviewedAt: "2026-09-01" },
        { label: "Rat2의 구이린역 사진, CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Guilin_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-01" },
        { label: "Rat2의 양숴역 사진, CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-01" },
        { label: "크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 라이선스", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-09-01" },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
