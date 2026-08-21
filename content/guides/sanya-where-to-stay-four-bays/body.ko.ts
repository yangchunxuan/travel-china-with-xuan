import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "싼야만은 공항, 도시 식사와 혼합 일정이 필요한 첫 여행에 유연합니다. 다둥하이는 해변과 도시 리듬이 가장 압축되어 있습니다. 야룽만은 숙소에서 긴 시간을 보내는 해변 리조트 중심 여행, 하이탕만은 특정 리조트·쇼핑·동쪽 명소를 계획한 체류에 맞지만 모든 외부 이동을 준비해야 합니다."
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "짧은 결론",
      "tone": "decision",
      "body": "늦은 도착, 이른 비행, 여러 도시 식사나 혼합 일정에는 싼야만, 해변·음식·도시 생활을 걸어서 오가고 싶으면 다둥하이, 숙소 자체가 하루를 채우는 휴가면 야룽만, 특정 시설·면세 쇼핑이나 동쪽 명소가 반복되면 하이탕만입니다. 수영 날씨나 수질이 보장된다는 주장으로 만을 고르지 마세요."
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "네 거점만 비교합니다. 리조트 순위, 실시간 요금·재고, 해변 접근, 수영 안전, 잔잔한 바다, 셔틀이나 외국인 투숙을 보장하지 않습니다. 같은 만 안에서도 도로, 해안 접근과 운영 형태가 다릅니다."
    },
    {
      "id": "decision-matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "네 개 만, 네 가지 복구 계획"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "해변 계획이 바뀌어도 남는 가치로 고릅니다",
      "columns": [
        "판단",
        "싼야만",
        "다둥하이",
        "야룽만",
        "하이탕만"
      ],
      "rows": [
        [
          "가장 적합",
          "공항·도시·혼합 첫 여행",
          "압축된 도시 해변 휴가",
          "해변 중심 리조트",
          "동쪽 자족형 리조트·명소"
        ],
        [
          "즉흥 식사",
          "도시 선택 가장 넓음",
          "압축된 선택 좋음",
          "리조트 중심 가능",
          "숙소·복합시설 중심 가능"
        ],
        [
          "공항 마찰",
          "먼저 시험할 지역",
          "도시 이동 추가",
          "해변 리조트 구간 추가",
          "네 선택 중 동쪽 노출 가장 큼"
        ],
        [
          "반복 해변",
          "도시 해안+생활",
          "해변·도시 전환 쉬움",
          "해변이 주 일정이면 강함",
          "모래만 아닌 숙소 조합으로 선택"
        ],
        [
          "악천후",
          "도시 대안·이동 쉬움",
          "음식·도시 대안 압축",
          "숙소가 실내 가치를 제공해야",
          "숙소·복합시설이 하루를 지탱"
        ],
        [
          "무차량 독립 여행",
          "가장 관대한 시작",
          "경로 확인 후 가능",
          "외부 이동 모두 검증",
          "중요 외출을 전부 계획"
        ],
        [
          "이른·늦은 이동",
          "공항 쪽 위험 보호",
          "도시 연결 균형",
          "합법적 이동 확인 필수",
          "가장 강한 이동 계획 필요"
        ]
      ]
    },
    {
      "id": "option-1-heading",
      "type": "heading",
      "level": 2,
      "text": "싼야만: 비행 전후의 유연성"
    },
    {
      "id": "option-1-analysis",
      "type": "paragraph",
      "text": "도시 해안, 도시 서비스와 공항 쪽 접근을 결합해 첫날·마지막 밤, 혼합 관광과 리조트 식사에 매이지 않으려는 여행자에게 맞습니다. 해안이 길어 같은 싼야만 주소도 동서 위치가 크게 다릅니다. 정확한 숙소 문, 원하는 해변 입구와 비행 경로를 찍고 전체 해안이 같다고 가정하지 마세요."
    },
    {
      "id": "option-2-heading",
      "type": "heading",
      "level": 2,
      "text": "다둥하이: 해변과 도시를 하루에"
    },
    {
      "id": "option-2-analysis",
      "type": "paragraph",
      "text": "밖에서 식사하고 몇 시간 해변을 쓰고 객실에서 쉰 뒤 도시 저녁을 보내려는 사람에게 맞습니다. 호텔 셔틀이나 예약 차량 의존도도 낮출 수 있습니다. 정숙함, 빈 모래사장이나 안전한 수영은 보장되지 않습니다. 쓸 공공 입구, 객실 방향과 폐쇄·경보 때 실내 대안을 묻습니다."
    },
    {
      "id": "option-3-heading",
      "type": "heading",
      "level": 2,
      "text": "야룽만: 리조트를 일정으로"
    },
    {
      "id": "option-3-analysis",
      "type": "paragraph",
      "text": "아침, 수영장·해변, 긴 휴식과 이른 저녁을 현지에서 해결할 때 강합니다. 매일 도시 식사, 야시장이나 먼 명소를 다니면 약해집니다. 포함 시설, 날짜별 운영, 독립 여행자의 외출 방식과 해변 없는 하루를 결제 전에 확인하세요."
    },
    {
      "id": "option-4-heading",
      "type": "heading",
      "level": 2,
      "text": "하이탕만: 동쪽 자족 생태계 선택"
    },
    {
      "id": "option-4-analysis",
      "type": "paragraph",
      "text": "특정 숙소, 쇼핑, 가족 명소나 웰니스가 반복될 때 거리가 보상됩니다. 큰 규모와 동쪽 위치 때문에 즉흥 도심 복귀는 시간·조율 비용이 큽니다. 날씨로 야외 시설이 닫히거나 식사·셔틀 예약이 필요하면 자족성이 깨집니다. 실내 하루, 명확한 이동과 출발 여유를 요구하세요."
    },
    {
      "id": "trip-pivot",
      "type": "callout",
      "title": "좋은 해변 거점은 해변이 닫혀도 작동합니다",
      "tone": "neutral",
      "body": "공식 모니터링과 임시 폐쇄는 사진이나 옛 후기가 수영을 보장하지 못함을 보여 줍니다. 수역·해양 활동·야외 시설이 하루 멈추면 무엇을 할지 물으세요. 남은 계획도 휴가 같아야 방어 가능한 선택입니다."
    },
    {
      "id": "execution-heading",
      "type": "heading",
      "level": 2,
      "text": "날씨 분기를 넣어 만 고르기"
    },
    {
      "id": "execution-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "정확한 공항 터미널, 예약 명소와 숙소 밖 식사를 현행 지도에 놓습니다.",
        "계획 방문이 아니라 문 앞 해변이 꼭 필요한 날을 셉니다.",
        "정상일 리듬이 맞는 만을 고른 뒤 그곳의 완전한 악천후 하루를 씁니다.",
        "도로 입구, 해안 접근, 식사, 실내 공간, 프런트와 시설 조건을 숙소에 묻습니다.",
        "셔틀·이동은 날짜·방향·예약·짐·대안을 확인하고 무응답은 불가로 봅니다.",
        "여행 직전과 매 해변일 공식 날씨·해변·수질 공지를 봅니다.",
        "항공편과 경보가 정당화할 때만 마지막 밤의 여유나 거점을 바꿉니다."
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "만이 원래 역할을 못 할 때"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "일행이 고립되기 전 안전한 기준에서 바꿉니다",
      "columns": [
        "실패",
        "즉시 복구",
        "이동 기준"
      ],
      "rows": [
        [
          "해변·해수욕장 폐쇄",
          "당국 지침과 미리 쓴 실내 하루 사용",
          "숙소·지역의 남은 하루가 수용 불가"
        ],
        [
          "리조트 셔틀 부재·만석",
          "확인한 합법 대안 사용, 약속 기록",
          "반복 필수 이동에 신뢰할 경로 없음"
        ],
        [
          "싼야만 주소가 해안 먼 끝",
          "정확한 문부터 공항·도시 재계산",
          "여러 고정 이동이 손해"
        ],
        [
          "야룽·하이탕 식사 계획 실패",
          "저녁 전에 안내된 현장 대안 요청",
          "식이·실용 요구를 안전하게 못 충족"
        ],
        [
          "태풍 경보가 출발에 영향",
          "공식 지침, 대피와 항공 연락 보호",
          "당국과 안전 이동 창이 지원할 때만 이동"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "영구적인 해변·날씨 보장은 없습니다",
      "tone": "warning",
      "body": "햇빛, 수영, 수질, 파도, 구조요원, 공공 접근, 시설 운영, 셔틀 좌석, 교통 시간, 객실 전망, 가격·재고나 등록을 보장하지 않습니다. 악천후 지침과 현행 운영 정보가 항상 우선합니다."
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "다음 단계: 완전한 하루 두 개 쓰기",
      "tone": "decision",
      "body": "최종 두 만에 정상 해변 하루와 해변을 전혀 못 쓰는 하루를 각각 쓰고 모든 식사·휴식·귀가를 넣습니다. 두 버전 모두 작동하며 미확인 이동이 적은 곳을 고르세요."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "싼야 숙소 계획 이어가기",
      "items": [
        {
          "label": "중국 숙소 결정 모아보기",
          "href": "/ko/stay/",
          "description": "호텔 순위가 아닌 숙소 의사결정 모음으로 돌아갑니다."
        },
        {
          "label": "국제선 전 마지막 밤 보호",
          "href": "/ko/guides/china-last-night-before-international-flight/",
          "description": "정확한 항공편과 날씨 위험이 정당화할 때만 마지막 거점을 옮깁니다."
        },
        {
          "label": "‘지하철 근처’의 실제 동선 확인",
          "href": "/ko/guides/china-hotel-near-metro/",
          "description": "리조트 셔틀·택시 하차점·숙소가 홍보한 교통 연결에도 같은 문 단위 확인을 적용하세요."
        },
        {
          "label": "접근 가능한 객실 검증하기",
          "href": "/ko/guides/china-accessible-hotel-room-verification/",
          "description": "하차 지점부터 객실·욕실까지 이어지는 동선을 검증합니다."
        },
        {
          "label": "외국인 숙박 등록 확인",
          "href": "/ko/guides/foreigners-china-hotel/",
          "description": "늦은 리조트 이동이나 베이 분할 숙박 전 전국 여권 등록과 입실 거절 복구 절차를 확인하세요."
        },
        {
          "label": "민수·홈스테이·호텔 고르기",
          "href": "/ko/guides/minsu-homestay-or-hotel-china/",
          "description": "숙소 형태와 동네·경관 거점 선택을 분리합니다."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "싼야 공식·환경·이미지 출처",
      "items": [
        {
          "label": "싼야시 정부 다둥하이 안내",
          "url": "https://english.sanya.gov.cn/syen/attractions/202505/028169f20cfd488899b76b002858ae3a.shtml",
          "publisher": "싼야시 인민정부",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "하이탕구 공식 개요",
          "url": "https://ht.sanya.gov.cn/htqsite/quqing/202603/a242509256864e8f84be07ee684c1429.shtml",
          "publisher": "싼야시 하이탕구 인민정부",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "싼야시 정부 하이탕만 리조트 안내",
          "url": "https://english.sanya.gov.cn/syen/news/202508/991449a20ef84f4b9b8a70a2212195c7.shtml",
          "publisher": "싼야시 인민정부",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "싼야시 2026년 6월 해수욕장 수질 모니터링",
          "url": "https://hbj.sanya.gov.cn/sthjsite/hjzl/202606/6e654ea5ac6f473db07a91db7ba4dc7a.shtml",
          "publisher": "싼야시 생태환경국",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "대표 이미지: Zhangmoon618의 싼야만 사진, CC BY-SA 3.0",
          "url": "https://commons.wikimedia.org/wiki/File:Sanya_Bay_01.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
