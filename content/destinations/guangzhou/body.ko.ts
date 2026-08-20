import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "광저우는 세 가지를 동시에 합니다. 주요 국제선 도착 도시이자 링난 도시 문화의 역사적 중심이며, 주장 삼각주와 홍콩·마카오 방향을 잇는 철도 결절점입니다. 첫 결정은 어디를 볼지가 아니라, 이 도시가 자기 몫의 밤을 받을지 아니면 비행기가 내리는 곳으로만 남을지입니다.",
    },
    {
      id: "decision-heading",
      type: "heading",
      level: 2,
      text: "광저우에 묵을 것인가, 환승만 할 것인가",
    },
    {
      id: "decision-1",
      type: "paragraph",
      text: "광둥 음식 문화, 강을 통한 교역, 종족 건축, 동네 생활, 그리고 오래된 상업 도시와 현대 지역 중심 사이의 대비가 실제로 보고 싶은 것이라면 밤을 주세요. 선전·홍콩·마카오로 이어지는 본토 쪽 시작점이나 종점으로 쓰기에도 좋습니다. 항공권이 싸다는 이유뿐이고 연결 시간이 공항과 철도 회랑 밖으로 나갈 여유를 주지 않는다면 따로 묵을 필요는 없습니다.",
    },
    {
      id: "decision-2",
      type: "paragraph",
      text: "2박이면 탄탄한 옛 도심 하루를 살 수 있고, 3박이면 링난 광저우와 새로운 주장 축이 서로를 밀어내지 않고 함께 들어갑니다. 판위의 침롱은 독립된 하루이고, 포산이나 순더는 광저우의 또 다른 동네가 아니라 시간을 추가로 쓰는 연장입니다.",
    },
    {
      id: "nights-table",
      type: "table",
      caption: "체류 길이별로 정직하게 담기는 것",
      columns: ["광저우 체류", "현실적으로 담기는 것", "빼야 할 것", "동선에서의 역할"],
      rows: [
        [
          "1박",
          "도착, 잘 고른 저녁 한 번, 그리고 압축된 오전 권역 하나",
          "옛 도심과 광저우타워, 파저우, 침롱을 한 번에",
          "이후 열차나 항공편 전의 관문 정차",
        ],
        [
          "2박",
          "온전한 옛 도심 하루에 주장 축 또는 실질적인 도착 완충 하나",
          "거의 모든 것을 포기하지 않는 한 온전한 침롱 하루",
          "더 큰 중국 여행 안에서의 의미 있는 도입",
        ],
        [
          "3박",
          "리완, 베이징루와 웨슈, 새 축, 그리고 얌차가 일정 전체를 삼키지 않는 시간",
          "포산·순더·침롱은 여전히 같은 시간을 두고 경쟁",
          "그 자체로 목적지가 되는 광저우",
        ],
        [
          "3박 + 침롱",
          "도심 이틀과 보호된 판위 파크 하루, 흔히 하룻밤 추가",
          "호텔 하나를 지키려고 이른 개장에 맞춰 도시를 가로지르는 것",
          "가족 중심의 광저우 정차",
        ],
        [
          "4박 이상 + 포산 또는 순더",
          "광저우 핵심에 이유가 분명한 지역 연장 하나",
          "삼각주의 모든 도시를 광저우 당일치기라고 부르는 것",
          "지역 거점 또는 더 느린 화난 체류",
        ],
      ],
    },
    {
      id: "nights-note",
      type: "paragraph",
      text: "‘이틀’이라는 라벨이 아니라 쓸 수 있는 시간을 세세요. 오후 중반 도착에 수하물과 체크인을 더하면 그것은 오후가 아니고, 아침에 광저우남역에서 떠나는 날은 열차가 출발하기 훨씬 전부터 시간을 씁니다.",
    },
    {
      id: "stay-heading",
      type: "heading",
      level: 2,
      text: "숙소: 구역의 평판이 아니라 맡길 일로 고르세요",
    },
    {
      id: "stay-table",
      type: "table",
      caption: "광저우 거점 다섯 곳을 ‘맡길 일’로 비교",
      columns: ["지역", "가장 알맞은 경우", "쉬워지는 것", "어려워지는 것"],
      rows: [
        [
          "리완 / 사몐",
          "첫 문화 방문, 옛 거리, 느린 저녁",
          "천가사·융칭팡·사몐을 한 동선으로; 얌차 문화",
          "톈허의 업무 주소, 파저우 행사, 이른 판위 출발",
        ],
        [
          "베이징루 / 웨슈",
          "도심 접근성이 균형 잡힌 첫 체류",
          "베이징루의 발굴된 옛 노면, 웨슈 명소, 박물관, 도시 횡단 지하철",
          "광저우남역과도 공항과도 가깝지 않고, 일부 호텔은 붐비는 보행 거리에 있음",
        ],
        [
          "톈허 / 주장신청",
          "업무 연장과 현대 도시",
          "새 중앙축, 화청광장, 국제 체인 호텔",
          "리완의 옛 결이 저녁 산책이 아니라 계획된 이동이 됨",
        ],
        [
          "하이주 / 파저우",
          "광교회나 일정이 빡빡한 전시 방문",
          "전시장과 파저우에서의 미팅",
          "여가 저녁에는 이동이 필요하고, 박람회 기간에는 가격과 객실이 크게 흔들림",
        ],
        [
          "판위",
          "침롱 또는 광저우남역 연결",
          "이른 입장과 남쪽 출발",
          "역사 도심과 강변이 가깝지 않고, ‘광저우 호텔’이 긴 횡단을 감출 수 있음",
        ],
      ],
    },
    {
      id: "stay-1",
      type: "paragraph",
      text: "리완과 사몐은 관련이 있지만 같지 않습니다. 사몐은 작고 압축된 역사 섬이고 리완은 훨씬 큰 생활 구역입니다. 구역 이름이 아니라 호텔의 실제 지하철 출입구와 도보 경로를 확인하세요. 베이징루와 웨슈는 드러난 옛 노면, 도시사, 공원과 박물관을 갖춘 실용적인 중심을 이룹니다.",
    },
    {
      id: "shamian-figure",
      type: "figure",
      src: "/images/destinations/guangzhou/shamian-1200.webp",
      alt: "광저우 사몐섬의 20세기 초 양옥과 조용한 거리에 늘어선 큰 반얀나무.",
      width: 1200,
      height: 750,
      caption:
        "사몐은 자기만의 규모와 고요를 가진 작은 섬입니다. 이곳을 리완 전체로 여기는 순간, 서쪽 옛 도심에 필요한 시간을 가장 빠르게 잘못 계산하게 됩니다.",
    },
    {
      id: "stay-2",
      type: "paragraph",
      text: "톈허와 주장신청은 업무와 새 축에 효율적이지만 옛 도심을 대체하지는 못하므로, 리완이나 웨슈 블록을 의도적으로 지켜 두세요. 파저우는 목적 전용입니다. 반복 참관이 아니라면 전시장 옆에 묵을 이유가 없습니다. 판위는 침롱이나 광저우남역이 축일 때 합리적이지만, 숙소를 나누면 체크아웃과 수하물, 재체크인이 추가됩니다.",
    },
    {
      id: "stay-network-links",
      type: "internal-links",
      title: "광저우 거점을 고른 뒤 숙소를 검증하세요",
      items: [
        {
          label: "호텔이 정말 지하철역과 가까운가?",
          href: "/ko/guides/china-hotel-near-metro/",
          description: "지도상 반경이 아니라 실제 출구, 보행자 거리 동선, 횡단로와 로비를 확인합니다.",
        },
        {
          label: "실제로 이용 가능한 장애인 객실 확인",
          href: "/ko/guides/china-accessible-hotel-room-verification/",
          description: "도로에서 객실까지 이어지는 전 구간에 대해 해당 객실 유형의 치수와 증거를 요청합니다.",
        },
        {
          label: "외국인 예약·숙박 등록·입실 거절 대처",
          href: "/ko/guides/foreigners-china-hotel/",
          description: "전국 규정, 플랫폼 표시와 해당 숙소 프런트가 실제로 처리할 수 있는 일을 구분합니다.",
        },
        {
          label: "국제선 출발 전 마지막 밤 정하기",
          href: "/ko/guides/china-last-night-before-international-flight/",
          description: "정확한 터미널과 대체 이동 수단을 기준으로 광저우 도심과 바이윈공항 인근 완충 숙박을 비교합니다.",
        },
      ],
    },
    {
      id: "stay-quote-handoff",
      type: "callout",
      title: "숙박 지역과 객실 조건을 사람이 확인해 드릴까요?",
      tone: "decision",
      body: "현재 일반 플래너 창구는 첫 연락에만 이용하세요. 초기 양식에는 여행 날짜, 비교할 도시나 지역, 여행자 수와 객실 수, 필요하다면 대략적인 숙박 예산만 적으세요. 가족 또는 접근성 준비를 나중에 상의하고 싶다고 표시할 수는 있지만, 어린이의 구체적인 나이, 이동·의료·접근성 세부 정보, 여권이나 기타 신분증 정보, 예약·결제 기록, 호텔·DMC 등 공급업체에 전달하려는 식별 가능한 자료는 제출하지 마세요. 플래너가 별도의 후속 상담을 안내하며, 이런 세부 정보는 필요한 경우 적절한 동의를 받은 뒤에만 논의합니다. 별도의 목적별 동의 없이는 공급업체와 자료를 공유하지 않으며, 이 창구는 실시간 재고가 아니므로 가격·객실 가능 여부·외국인 투숙·객실 유형·접근성을 보장하지 않습니다.",
    },
    {
      id: "airport-heading",
      type: "heading",
      level: 2,
      text: "바이윈공항: T1이 닫혔고, 그래서 지상 계획이 달라집니다",
    },
    {
      id: "airport-1",
      type: "paragraph",
      text: "오래된 광저우 정보에서 가장 빨리 낡는 항목입니다. 2026년 5월 7일부터 바이윈의 국내 항공사 11곳이 제1터미널에서 제3터미널로 옮겼고, 약 22년간 운영된 T1은 개보수를 위해 여객 운영을 중단했습니다. 2026년 7월에 개보수 설계안이 선정되었지만 재개장 일자는 발표되지 않았으므로 재개장을 전제로 계획할 수 없습니다. 동시에 T1과 연결된 지하철 공항남역과 도시간철도 바이윈공항남역도 여객 취급을 멈췄습니다.",
    },
    {
      id: "airport-table",
      type: "table",
      caption: "2026년 5월 변경 이후 바이윈 터미널과 철도 접근",
      columns: ["터미널", "여객 역할", "비교할 철도 접근", "계획 규칙"],
      rows: [
        [
          "T1",
          "2026년 5월 7일부터 여객 운영 중단, 개보수 중",
          "공항남역 지하철과 바이윈공항남역 도시간철도는 여객을 취급하지 않음",
          "오래된 지도, 저장된 위치, 5월 이전 안내를 따라 T1로 가지 말 것",
        ],
        [
          "T2",
          "운영 중인 여객 터미널",
          "지하철 3호선 공항북역, 광둥 도시간철도 바이윈공항북역",
          "운항 항공사를 확인한 뒤 호텔 기준으로 지하철·도시간철도·도로 중 선택",
        ],
        [
          "T3",
          "운영 중인 국내·국제·지역 터미널",
          "광둥 도시간철도 바이윈공항동역; 직결 지하철역 없음",
          "공항 자체 안내는 지하철 3호선 또는 9호선으로 가오정역, 이후 공항 셔틀버스",
        ],
      ],
    },
    {
      id: "airport-2",
      type: "paragraph",
      text: "코드셰어라면 먼저 실제 운항 항공사를 확인하고, 최신 일정표에서 T2인지 T3인지 읽은 뒤, 출발 당일 다시 확인하고 중국어 터미널명을 저장하세요. 짐이 여러 개인 가족은 철도 방안이 있어도 가오정 환승보다 공식 택시를 선호할 수 있습니다.",
    },
    {
      id: "airport-links",
      type: "internal-links",
      title: "터미널 결정은 담당 가이드로",
      items: [
        {
          label: "광저우 바이윈공항: T2인가 T3인가",
          href: "/ko/guides/guangzhou-baiyun-airport-t2-t3/",
          description: "항공사 배정, 상세 지상 교통, 잘못된 터미널에 도착했을 때의 복구.",
        },
      ],
    },
    {
      id: "stations-heading",
      type: "heading",
      level: 2,
      text: "기차역 다섯 곳, 그중 하나는 2026년 1월에 역할이 바뀌었습니다",
    },
    {
      id: "stations-1",
      type: "paragraph",
      text: "동선에 ‘광저우’라고만 적혀 있으면 부족합니다. 표정 운행 시간은 효율적으로 보여도 호텔에서 역까지의 이동이 전체를 망칠 수 있습니다. 2026년 1월 운행도 개정은 두 역 사이의 역할까지 바꿔 놓았기 때문에, 오래된 안내가 자신 있게 틀릴 수 있습니다.",
    },
    {
      id: "stations-table",
      type: "table",
      caption: "광저우 주요 역과 각각의 용도",
      columns: ["역", "역할", "먼저 확인할 방향", "흔한 실수"],
      rows: [
        [
          "광저우남역",
          "역사 도심 남쪽 판위의 대형 고속철도 허브",
          "홍콩 웨스트카오룽, 선전, 창사남, 주하이 등 전국 노선",
          "도심으로 여기고 접근 시간과 역 내부 이동 시간을 너무 적게 잡는 것",
        ],
        [
          "광저우동역",
          "톈허 쪽 허브로 도심 접근이 좋음",
          "선전, 그리고 날짜에 따라 존재하는 홍콩·동쪽 방면 열차",
          "홍콩이나 선전행이 모두 남역을 쓴다고 가정하는 것",
        ],
        [
          "광저우역",
          "2026년 1월 26일부터 일반열차 시종착을 중단하고 징광 고속철도를 넘겨받은 도심 역",
          "징광·구이광·난광·광산 방면 고속철도",
          "아직도 일반열차 종착역으로 설명하는 오래된 안내를 쓰는 것",
        ],
        [
          "광저우바이윈역",
          "이제 일반열차와 광잔 고속철도, 새로 들어온 성간 동차에 집중하는 바이윈 허브",
          "일반 장거리 노선과 남서 방면",
          "바이윈공항과 혼동하거나, 광저우역으로 옮겨간 징광 고속철도를 여기서 기대하는 것",
        ],
        [
          "광저우북역",
          "도심 북쪽 화두구의 역",
          "해당 열차가 맞을 때의 일부 북행 노선",
          "‘북’이라는 이름이 편해 보인다는 이유로 긴 도심 이동을 확인하지 않고 예약",
        ],
      ],
    },
    {
      id: "stations-2",
      type: "paragraph",
      text: "홍콩은 광저우남역을 먼저 검색하고, 해당 날짜의 광저우동역을 따로 확인하세요. 선전은 습관이 아니라 선전 쪽 도착지에 맞춰 광저우 쪽 역을 고르세요. 여권과 수하물, 승차 절차는 고속철도 가이드의 몫이고, 이 페이지는 역 개요만 담당합니다.",
    },
    {
      id: "station-links",
      type: "internal-links",
      title: "교통은 담당 가이드로 이어가세요",
      items: [
        {
          label: "중국 고속철도 처음 타기",
          href: "/ko/guides/china-high-speed-train-first-time-guide/",
          description: "12306, 여권, 좌석 등급, 수하물, 보안 검색과 승차.",
        },
        {
          label: "광저우에서 홍콩 가는 법",
          href: "/ko/guides/guangzhou-hong-kong-transport-route/",
          description: "역 선택, 출입경 절차, 정직한 도어투도어 비교.",
        },
        {
          label: "광저우에서 마카오 가는 법",
          href: "/ko/guides/guangzhou-macau-transport-route/",
          description: "주하이·궁베이와 헝친 두 경로의 비교.",
        },
      ],
    },
    {
      id: "clusters-heading",
      type: "heading",
      level: 2,
      text: "서쪽의 옛 도심과 동쪽의 새 축으로 읽기",
    },
    {
      id: "cluster-1-heading",
      type: "heading",
      level: 3,
      text: "천가사, 융칭팡, 사몐",
    },
    {
      id: "cluster-1",
      type: "paragraph",
      text: "세 곳은 광저우 서부를 공유하지만 하나의 연속된 명소가 아닙니다. 천가사는 집중해서 보는 건축 방문, 융칭팡은 재생된 역사 동네, 사몐은 별개의 강 안 섬입니다. 개방 시간 제약이 가장 단단한 곳부터 시작해 리완을 동네 속도로 지나고, 사몐은 하루의 뒤쪽에 두세요.",
    },
    {
      id: "cluster-2-heading",
      type: "heading",
      level: 3,
      text: "베이징루와 웨슈",
    },
    {
      id: "cluster-2",
      type: "paragraph",
      text: "베이징루는 발굴된 옛 노면 위에서 지금도 영업하는 상업 거리이고, 웨슈가 더 큰 도시사와 공공의 맥락을 제공합니다. 이 거리를 쇼핑 목록이 아니라 증거로 읽고, 곧장 도시를 가로지르는 대신 웨슈의 박물관이나 공원과 짝지으세요.",
    },
    {
      id: "cluster-3-heading",
      type: "heading",
      level: 3,
      text: "주장신청과 광저우타워",
    },
    {
      id: "cluster-3",
      type: "paragraph",
      text: "주장신청은 현대 축의 북안에, 광저우타워는 강 건너 하이주에 있습니다. 둘은 새 중심을 반대편에서 설명합니다. 전망대 티켓은 선택 사항입니다. 유료 고층 조망이 강변 자체보다 더 주는지 판단하세요. 여기서의 가치는 높이가 아니라 리완·웨슈와의 대비입니다.",
    },
    {
      id: "zjnt-figure",
      type: "figure",
      src: "/images/destinations/guangzhou/zhujiang-new-town-1200.webp",
      alt: "주장강 건너로 보이는 광저우 주장신청 스카이라인과 강변을 따라 늘어선 고층 건물들.",
      width: 1200,
      height: 750,
      caption:
        "새 축은 맞은편 강안에서 가장 잘 이해됩니다. 한쪽은 조망을 주고 다른 쪽은 그 안에 서게 합니다. 핵심은 양쪽을 다 보는 것이지 전망대 티켓이 아닙니다.",
    },
    {
      id: "cluster-4-heading",
      type: "heading",
      level: 3,
      text: "파저우, 그리고 별도 구역인 침롱",
    },
    {
      id: "cluster-4",
      type: "paragraph",
      text: "파저우는 하이주 동쪽에 있고 회의와 전시를 중심으로 돌아갑니다. 행사가 없으면 첫 방문의 당연한 우선순위가 아니고, 행사가 있으면 도시 전체의 호텔 가격과 교통 수요를 바꿉니다. 침롱은 도심 남쪽 판위의 가족 구역으로, 옛 도심 오전과 톈허 저녁 사이의 틈이 아니라 온전한 하루가 필요합니다.",
    },
    {
      id: "extensions-heading",
      type: "heading",
      level: 2,
      text: "포산, 순더, 선전, 홍콩, 마카오",
    },
    {
      id: "extensions-table",
      type: "table",
      caption: "당일 연장인가, 다음 도시인가",
      columns: ["장소", "당일 연장이 되는 경우", "다음 도시가 나은 경우", "분명히 해 둘 경계"],
      rows: [
        [
          "포산",
          "링난 문화 유적 한두 곳이 목적 전부일 때",
          "여러 구역이나 광둥 서부로 이어 갈 때",
          "포산은 독립된 도시이지 광저우의 동네가 아님",
        ],
        [
          "순더",
          "지리적으로 절제된 계획의 음식 중심 하루",
          "음식 문화가 여행의 주제이고 저녁이 중요할 때",
          "순더는 포산의 한 구이며, 음식 명성이 가게들을 가깝게 만들지는 않음",
        ],
        [
          "선전",
          "특정 활동 하나가 이동 부담을 정당화할 때",
          "현대 도시나 업무에 실제 시간이 필요할 때",
          "홍콩 가는 길목이라는 이유만으로 선전 호텔을 추가하지 말 것",
        ],
        [
          "홍콩",
          "드물게만 — 출입경이 많은 당일 여가는 좋은 선택이 아님",
          "목적지나 관문으로 최소 1박을 줄 때",
          "자체 입경 절차를 가진 특별행정구이지 일반 광둥 도시가 아님",
        ],
        [
          "마카오",
          "넉넉한 하루와 신중히 고른 국경 경로가 있을 때만",
          "역사 지구, 코타이, 또는 이후 항공편이 1박을 정당화할 때",
          "광저우에서 산 기차표가 국경을 대신 넘어 주지 않음",
        ],
      ],
    },
    {
      id: "extension-links",
      type: "internal-links",
      title: "지역 순서는 담당 가이드로",
      items: [
        {
          label: "광저우·선전·홍콩 동선 순서",
          href: "/ko/guides/guangzhou-shenzhen-hong-kong-route-order/",
          description: "선전이 호텔을 받을 자격이 있는지, 아니라면 어느 경로로 건널지.",
        },
        {
          label: "광저우 얌차는 이렇게 돌아갑니다",
          href: "/ko/guides/how-guangzhou-morning-tea-works/",
          description: "주문, 나눔, 차 요금, 그리고 그 식사 뒤의 사회 문화.",
        },
        {
          label: "지하철 공사가 고고학과 만날 때",
          href: "/ko/guides/when-metro-construction-meets-archaeology/",
          description: "베이징루의 드러난 옛 노면 같은 현장을 읽는 증거 틀.",
        },
      ],
    },
    {
      id: "recheck-heading",
      type: "heading",
      level: 2,
      text: "출발 직전에 다시 확인할 것",
    },
    {
      id: "recheck-list",
      type: "list",
      items: [
        "모든 바이윈 구간의 운항 항공사와 터미널 — T1이 닫혔고 T2와 T3의 철도 접근이 다릅니다.",
        "T3의 ‘철도 + 셔틀’ 경로가 여전히 공항의 현재 안내와 맞는지, 그리고 큰 짐이 있을 때 어떤 의미인지.",
        "각 티켓의 정확한 기차역 — 광저우역과 광저우바이윈역은 2026년 1월에 역할을 맞바꿨습니다.",
        "여행이 광교회 시기와 겹친다면 공식 회기 — 호텔 가격과 교통 수요가 도시 전체에서 달라집니다.",
        "홍콩이나 마카오의 입경 자격과 출입경 절차 — 본토 이동과는 별개입니다.",
      ],
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "자주 묻는 질문",
    },
    {
      id: "faq-1-heading",
      type: "heading",
      level: 3,
      text: "광저우에 따로 묵을 가치가 있나요, 환승만 할까요?",
    },
    {
      id: "faq-1",
      type: "paragraph",
      text: "광둥 음식 문화, 링난 도시사, 또는 화난 동선이 중요하다면 묵으세요. 2박이면 탄탄한 도시 하루가 생기고, 3박이면 옛 도심과 주장 축이 함께 들어갑니다. 전체 동선이 이미 꽉 찼을 때만 환승으로 끝내세요.",
    },
    {
      id: "faq-2-heading",
      type: "heading",
      level: 3,
      text: "바이윈공항에서 어느 터미널을 쓰나요?",
    },
    {
      id: "faq-2",
      type: "paragraph",
      text: "해당 항공편에 배정된 곳이며 T2 또는 T3입니다. T1은 2026년 5월 7일부터 여객이 중단되었고 재개장 일자는 발표되지 않았습니다. T2에는 직결 지하철과 도시간철도역이 있고, T3에는 도시간철도역은 있지만 직결 지하철이 없어 공항은 3호선이나 9호선으로 가오정역까지 간 뒤 셔틀을 권합니다.",
    },
    {
      id: "faq-3-heading",
      type: "heading",
      level: 3,
      text: "홍콩에 가려면 어느 광저우 역인가요?",
    },
    {
      id: "faq-3",
      type: "paragraph",
      text: "홍콩 웨스트카오룽은 광저우남역을 먼저 검색하고, 해당 날짜의 광저우동역을 따로 확인하세요. 그런 다음 호텔에서 역까지를 비교하세요. 정답은 실제로 존재하면서 전체 여정을 가장 낫게 만드는 열차입니다.",
    },
    {
      id: "faq-4-heading",
      type: "heading",
      level: 3,
      text: "광저우역이 바뀌었나요?",
    },
    {
      id: "faq-4",
      type: "paragraph",
      text: "네. 2026년 1월 26일부터 일반열차 시종착을 중단하고, 이전에 광저우바이윈역에서 출발하던 징광 고속철도를 넘겨받았습니다. 광저우바이윈역은 일반열차와 다른 고속철도 방면에 집중합니다. 오래된 설명이 아니라 현재 운행도로 예약하세요.",
    },
    {
      id: "faq-5-heading",
      type: "heading",
      level: 3,
      text: "침롱에 가려면 숙소를 따로 잡아야 하나요?",
    },
    {
      id: "faq-5",
      type: "paragraph",
      text: "항상 그렇지는 않습니다. 판위 1박은 이른 입장이나 다음 날 광저우남역 열차를 지켜 주지만 짐을 한 번 더 옮기게 합니다. 아낀 이동이 체크아웃과 체크인을 넘어설 때만 나누세요. 어느 쪽이든 침롱은 독립된 하루입니다.",
    },
    {
      id: "faq-6-heading",
      type: "heading",
      level: 3,
      text: "일반 여행자는 광교회를 어떻게 다뤄야 하나요?",
    },
    {
      id: "faq-6",
      type: "paragraph",
      text: "더 일찍 예약하고 취소 조건을 유연하게 두며, 파저우와 업무 지구 주변 수요가 강해질 것을 예상하세요. 반복 참관이 아니라면 전시장 근처에 묵지 말고, 숙소를 관광 동선에 맞추고 공식 회기를 확인하세요.",
    },
    {
      id: "faq-7-heading",
      type: "heading",
      level: 3,
      text: "광저우 마지막 밤은 바이윈공항 호텔로 옮겨야 하나요?",
    },
    {
      id: "faq-7",
      type: "paragraph",
      text: "먼저 항공편이 T2인지 T3인지 확인하고 체크인 마감, 도심 호텔 출발 동선과 대체 수단을 점검하세요. 이 동선이 불안정하고 특히 이른 국제선, 어린이·고령자 또는 많은 짐이 있다면 공항 인근 숙박이 유리합니다. 당일 이동을 충분히 검증했고 마지막 광저우 저녁이 중요하다면 도심 호텔을 유지해도 됩니다. 위의 전국 마지막 밤 가이드 방식을 적용하고 ‘공항 지역’ 표시만으로 터미널 이동이 쉽다고 보지 마세요.",
    },
    {
      id: "cta-heading",
      type: "heading",
      level: 2,
      text: "광저우 선택을 동선으로 되돌리기",
    },
    {
      id: "cta-1",
      type: "paragraph",
      text: "아직 도시 목록만 있다면 지금 가진 숙박 일수가 어떤 순서를 담아내는지 시험해 보세요. 항공편과 날짜별 계획이 있다면 더 나은 질문은 터미널과 역, 호텔을 하나의 사슬로 함께 골랐는가입니다.",
    },
    {
      id: "cta-links",
      type: "internal-links",
      title: "이어가는 두 가지 방법",
      items: [
        {
          label: "무료 사람 검토",
          href: "/ko/#planner-contact",
          description: "동선과 숙박 조건을 보내 무료로 먼저 검토받으세요. 유료 서비스는 미리 선택되지 않습니다.",
        },
        {
          label: "중국 일정 리뷰",
          href: "/ko/china-itinerary-review/",
          description: "이미 만든 날짜별 동선을 보내고 약한 고리를 점검받으세요.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "공식 출처와 확인 기록",
      items: [
        {
          label:
            "바이윈 T1 항공사의 T3 이전과, T1 연결 철도역의 2026년 5월 7일 여객 중단",
          url: "https://www.eguangzhou.gov.cn/gzlatest/content/post_42957.html",
          publisher: "광저우시 인민정부 외사판공실",
          reviewedAt: "2026-08-17",
        },
        {
          label:
            "T1 운영 중단; T3에는 직결 지하철이 없어 3호선 또는 9호선 가오정역 후 셔틀 이용 권고",
          url: "https://www.eguangzhou.gov.cn/gzlatest/content/post_43024.html",
          publisher: "광저우시 인민정부 외사판공실",
          reviewedAt: "2026-08-17",
        },
        {
          label: "2026년 1월 26일부터 광저우역은 일반열차 시종착을 취급하지 않음",
          url: "https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10648700.html",
          publisher: "광저우시 인민정부",
          reviewedAt: "2026-08-17",
        },
        {
          label: "광저우역의 고속철도 전환과 광저우바이윈역의 일반열차 인수",
          url: "https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10675644.html",
          publisher: "광저우시 인민정부",
          reviewedAt: "2026-08-17",
        },
        {
          label: "중국철도 12306 — 예약 전 정확한 역 조합 확인",
          url: "https://www.12306.cn/en/index.html",
          publisher: "중국철도 12306",
          reviewedAt: "2026-08-17",
        },
        {
          label: "대표 이미지: 천가사, 촬영 Shujianyang, CC BY-SA 4.0; 자르기 및 변환",
          url: "https://commons.wikimedia.org/wiki/File:Chen_Clan_Ancestral_Hall_2025.06_01.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-17",
        },
        {
          label: "사몐 사진, 촬영 xiquinhosilva, CC BY 2.0; 자르기 및 변환",
          url: "https://commons.wikimedia.org/wiki/File:Shamian_Island_03111-Guangzhou_(32831146512).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-17",
        },
        {
          label: "주장신청 사진, 촬영 Nissangeniss, CC BY-SA 4.0; 자르기 및 변환",
          url: "https://commons.wikimedia.org/wiki/File:The_architectural_complex_of_the_Zhujiang_New_Town_in_2017_12(2).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-17",
        },
        {
          label: "라이선스: CC BY-SA 4.0",
          url: "https://creativecommons.org/licenses/by-sa/4.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-17",
        },
        {
          label: "라이선스: CC BY 2.0",
          url: "https://creativecommons.org/licenses/by/2.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-17",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
