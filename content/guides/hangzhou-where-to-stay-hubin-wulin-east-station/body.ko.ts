import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "서호 가장자리가 아침과 저녁 모두의 일부라면 후빈, 호수에 덜 의존하며 여러 도심 일정을 균형 있게 처리하려면 우린을 고릅니다. 늦은 도착, 이른 출발, 당일 철도 연결이나 반복 승차가 매일 도심을 오가는 비용보다 중요할 때만 항저우동역 주변에 묵으세요."
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "짧은 결론",
      "tone": "decision",
      "body": "2~3박 첫 관광에서 아침 식사 전이나 저녁 식사 후 서호를 실제로 쓸 계획이면 후빈이 기본값입니다. 일정이 북·남·동쪽으로 퍼지면 우린이 안정적인 절충안입니다. 동역은 물류 거점이지 일반 관광 추천이 아닙니다. 도착 한 번과 출발 한 번만으로는 역 주변 전 일정 숙박을 정당화하지 못하며, 시각·짐·연결 위험이 숙박 전체를 좌우할 때만 예외입니다."
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "숙박 지역만 선택합니다. 호텔, 호수 전망, 열차 시간표, 객실 요금이나 현재 서호 도로 접근을 보장하지 않습니다. ‘항저우동역 근처’도 정확한 역 방향과 로비 문을 확인해야 합니다."
    },
    {
      "id": "decision-matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "보호하고 싶은 시간을 먼저 정하세요"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "호수 시간, 도심 균형, 철도 위험은 서로 다른 구매입니다",
      "columns": [
        "우선순위",
        "후빈",
        "우린",
        "동역",
        "결제 전 확인"
      ],
      "rows": [
        [
          "첫 관광",
          "서호 중심 짧은 숙박에 최적",
          "가장 균형 잡힌 대안",
          "철도가 지배하지 않으면 약함",
          "숙박 수와 반복 경로"
        ],
        [
          "이른·늦은 서호",
          "호숫가에서 하루 시작·종료",
          "짧은 이동 필요",
          "도심 이동 한 번 추가",
          "원하는 호수 구간까지 실제 도보"
        ],
        [
          "혼합 도심 일정",
          "남중부 관광 거점",
          "북중부 균형",
          "반복 역주행 가능",
          "비서호 일정 두 번의 종료점"
        ],
        [
          "늦은 열차 도착",
          "프런트·이동 확인 때 가능",
          "도착 위험이 낮으면 균형",
          "첫날 밤 보호에 가장 강함",
          "표의 역·출구 시간·프런트"
        ],
        [
          "이른 열차 출발",
          "충분한 여유와 현행 경로 필요",
          "계획하면 대체로 가능",
          "실제로 이른 열차면 유리",
          "출발홀·역 방향·대안"
        ],
        [
          "도로 관리",
          "서호 관리가 접근을 바꿀 수 있음",
          "호숫가 영향이 덜함",
          "역세권 자체도 복잡",
          "현재 공지와 호텔 입구"
        ]
      ]
    },
    {
      "id": "option-1-heading",
      "type": "heading",
      "level": 2,
      "text": "후빈: 실제로 쓸 호숫가 시간에 투자"
    },
    {
      "id": "option-1-analysis",
      "type": "paragraph",
      "text": "후빈의 가치는 ‘서호’라는 단어가 아니라 시간입니다. 방문객이 늘기 전 걷고, 저녁에 다시 호숫가를 찾거나 쉬었다가 재출발해야 하루 두 번 위치를 씁니다. 숙소가 여러 블록 안쪽이고 닫히는 쇼핑몰 통로에 의존하거나 원하는 호수 구간과 멀다면 효과가 없습니다. 교통관리 중에도 쓸 수 있는 로비 문과 도로를 물으세요."
    },
    {
      "id": "option-2-heading",
      "type": "heading",
      "level": 2,
      "text": "우린: ‘저렴한 후빈’이 아니라 균형"
    },
    {
      "id": "option-2-analysis",
      "type": "paragraph",
      "text": "서호와 함께 운하, 북쪽 도심, 업무나 여러 지하철 방향을 묶을 때 맞습니다. 호숫가 거리를 모든 객실의 기준으로 삼지 않고도 중심 거점을 유지합니다. 그래도 여러 역 출구와 타워 입구를 포함하는 넓은 이름입니다. 실제 호수 구간, 늦은 저녁과 출발 연결을 비교하지 않으면 중앙의 한 점이 평범하지만 반복되는 이동을 세 번 만들 수 있습니다."
    },
    {
      "id": "option-3-heading",
      "type": "heading",
      "level": 2,
      "text": "동역: 어려운 철도 하룻밤만 해결"
    },
    {
      "id": "option-3-analysis",
      "type": "paragraph",
      "text": "늦게 도착해 다음 날 일찍 출발하거나, 1박 경유, 큰 짐을 두 번 도심 횡단시키지 않으려 할 때 옳습니다. 여러 관광일 동안 단지 열차가 이 역에 도착한다는 이유로 머무는 것은 대체로 틀립니다. 필요하면 위험한 한 밤을 보호한 뒤 낮에 한 번 이동하세요. 호텔 변경 한 번을 피하려다 매 서호 일정을 통근으로 만들지 마세요."
    },
    {
      "id": "trip-pivot",
      "type": "callout",
      "title": "도착 밤과 관광 거점을 분리하세요",
      "tone": "neutral",
      "body": "여기서는 정말 어려운 열차 때문에 분할 숙박이 정당화될 수 있습니다. 동역 1박 뒤 후빈이나 우린으로 옮기면 위험을 줄일 수 있습니다. 평범한 낮 열차를 두고 두 번 이동하면 절약보다 짐 인계가 늘어납니다."
    },
    {
      "id": "execution-heading",
      "type": "heading",
      "level": 2,
      "text": "기차표 순서로 항저우 숙소 고르기"
    },
    {
      "id": "execution-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "발권된 모든 표의 전체 역명과 시각을 읽습니다.",
        "짐, 출구와 프런트를 포함해 첫날 플랫폼부터 로비까지 계산합니다.",
        "서호가 보호할 시간대 두 곳에 들어가는지 판단하고 아니면 후빈 필수 가정을 지웁니다.",
        "현재 운영사 경로로 후빈·우린에서 중요한 비서호 일정 두 곳을 비교합니다.",
        "최종 숙소에 쓸 역 출구, 차량 입구, 야간 출입, 객실 방향과 짐 보관을 묻습니다.",
        "실제 날짜의 서호 교통관리 공지를 보고 오래된 여행기로 차량 접근을 추론하지 않습니다.",
        "위험한 철도 구간을 없앨 때만 분할하고 조용한 낮에 한 번 이동합니다."
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "숙소가 잘못된 문제를 해결했을 때"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "고정 연결을 먼저 보호한 뒤 숙박 가치를 회복합니다",
      "columns": [
        "불일치",
        "즉시 조치",
        "구조적 수정"
      ],
      "rows": [
        [
          "후빈 숙소가 원하는 호수 구간과 멂",
          "정확한 호수 입구와 로비 지도화",
          "호수 시간이 반복되고 차이가 클 때만 이동"
        ],
        [
          "서호 차량 접근 변경",
          "현재 공식 환승과 숙소 안내 준수",
          "짐이 안전하게 못 가면 도로변 가장자리로 변경"
        ],
        [
          "우린 숙소가 큰 교차로 반대편",
          "쓸 출구와 열린 건물 경로 요청",
          "검증된 횡단이 더 단순한 곳 선택"
        ],
        [
          "열차가 더 일찍 변경",
          "표 기준 문에서 게이트까지 여유 재계산",
          "위험이 실제가 될 때만 동역 마지막 밤 추가"
        ],
        [
          "늦은 도착에 프런트 미확인",
          "역을 떠나기 전 숙소 연락",
          "잠긴 문 대신 유인 역세권 첫날 숙소 사용"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "전망·열차·도로를 보장하지 않습니다",
      "tone": "warning",
      "body": "후빈은 호수 전망, 우린은 모든 구역까지 동일한 접근, 동역은 올바른 출발홀까지 짧은 도보를 보장하지 않습니다. 도로 통제, 역 출구, 열차 시각, 짐 보관, 객실 배정, 요금·재고와 등록은 모두 현행 확인이 필요합니다."
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "다음 단계: 아침 하나와 연결 하나 보호",
      "tone": "decision",
      "body": "원하는 정확한 호숫가 시간과 놓치면 안 되는 열차 연결을 적으세요. 후빈·우린으로 앞의 목표를 비교하고 동역이 뒤의 위험을 실질적으로 줄이는지 시험합니다. 불필요한 이동 없이 도착과 출발이 명확한 조합을 고릅니다."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "항저우 계획 이어가기",
      "items": [
        {
          "label": "중국 숙소 결정 모아보기",
          "href": "/ko/stay/",
          "description": "호텔 순위가 아닌 숙소 의사결정 모음으로 돌아갑니다."
        },
        {
          "label": "항저우 전체 일정 계획",
          "href": "/ko/destinations/hangzhou/",
          "description": "숙박 일수와 서호·운하·차·유산 일정을 먼저 묶습니다."
        },
        {
          "label": "상하이–항저우 이동 계획",
          "href": "/ko/guides/shanghai-hangzhou-transport-route/",
          "description": "표의 역과 현재 철도 기록으로 도시 간 이동을 정합니다."
        },
        {
          "label": "‘지하철 근처’의 실제 동선 확인",
          "href": "/ko/guides/china-hotel-near-metro/",
          "description": "후빈·우린·동역을 비교할 때 도착에 쓸 역 출구와 호텔의 실제 도로 입구를 연결해 확인하세요."
        },
        {
          "label": "접근 가능한 객실 검증하기",
          "href": "/ko/guides/china-accessible-hotel-room-verification/",
          "description": "하차 지점부터 객실·욕실까지 이어지는 동선을 검증합니다."
        },
        {
          "label": "외국인 숙박 등록 확인",
          "href": "/ko/guides/foreigners-china-hotel/",
          "description": "호숫가 소형 숙소나 항저우 동역 늦은 체크인을 고르기 전 전국 숙박 등록·입실 거절 가이드를 확인하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 도시·지하철·교통·이미지 출처",
      "items": [
        {
          "label": "항저우시 상업 보행거리 공식 안내",
          "url": "https://www.hangzhou.gov.cn/art/2022/2/16/art_812262_59050058.html",
          "publisher": "항저우시 인민정부",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "항저우 지하철 우린광장역 안내",
          "url": "https://www.hzmetro.com/service_1.aspx?Line1=14&Site1=268",
          "publisher": "항저우 메트로",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "항저우 지하철 룽샹차오역 상세",
          "url": "https://wx.hzmetro.com/index/index/details.html?id=18",
          "publisher": "항저우 메트로",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "서호 관광지 시간대별 교통관리 공고",
          "url": "https://zfgb.hangzhou.gov.cn/11/105220253/t117220253054/518894.shtml",
          "publisher": "항저우시 교통운수국 등",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "대표 이미지: CatOnMars의 후빈·서호 사진, CC BY 4.0",
          "url": "https://commons.wikimedia.org/wiki/File:Huanglong_%26_Broken_Bridge_-_Hangzhou_City_%26_Outer_West_Lake_in_Hubin.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
