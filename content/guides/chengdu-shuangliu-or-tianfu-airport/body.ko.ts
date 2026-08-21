import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "발권 후 CTU와 TFU는 선호 문제가 아닙니다. 예약의 공항 코드와 터미널이 결정합니다. 예약 전에는 실제 날짜에 운항하는 항공편만 비교하고 현재 숙소나 이전 도시에서 체크인까지, 수하물 수취에서 청두 첫 숙소나 다음 연결편까지의 전체 사슬을 더하세요."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "항공편이 공항을, 전체 여정이 항공편을 고릅니다",
      "tone": "decision",
      "body": "CTU는 도심이나 서쪽 일정에서 후보가 되기 쉽고, TFU는 도시 남동쪽의 대형 공항으로 필요한 항공편을 제공할 수 있습니다. 어느 쪽도 항상 낫지 않습니다. 이른 출발, 늦은 도착, 도시 횡단 철도 환승이나 농촌 다음 구간을 더하면 더 싸거나 빠른 항공편의 장점이 사라질 수 있습니다."
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "이 글이 맡는 CTU–TFU 선택",
      "tone": "neutral",
      "body": "이 페이지는 예약 전 CTU/TFU 선택, 예약 후 코드·터미널 확인, 공항–숙소·철도 전체 이동과 잘못 간 공항 복구를 맡습니다. 항공사 순위, 고정 터미널·버스 시간표, 모든 중국 항공편의 마지막 밤이나 청두–주자이거우·판다 명소 선택은 다루지 않습니다."
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "CTU 또는 TFU, 터미널, 항공편 번호와 항공사 마감이 함께 나온 일정 화면을 저장해 픽업 기사에게 그대로 보내세요.",
        "첫 문은 정확한 청두 숙소, 기차역 또는 농촌 귀환 지점로, 마지막 문은 올바른 공항 터미널 또는 청두 첫 숙소 지점로 적으세요.",
        "항공사 체크인·탑승과 별도 철도 예약이라는 고정 마감과 가장 늦은 안전 포기 기준을 표시하세요.",
        "실제 짐을 기준으로 터미널 도보, 두 공항의 서로 다른 시내 연결과 환승 부담을 계산하세요.",
        "항공사, CTU/TFU 공항 서비스와 현재 청두 교통의 현재 확인 경로와 실패 시 항공사 재예약 또는 직원이 있는 공항 쪽 숙박을 저장하세요."
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "청두 전체 도착 과정으로 솽류와 톈푸를 비교하세요"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "실시간 예약의 공항 코드와 터미널이 도착지를 정합니다",
      "columns": [
        "청두 공항 여정",
        "CTU 또는 TFU가 맞는 때",
        "공항 선택을 가르는 실제 문",
        "피해야 할 공항 가정"
      ],
      "rows": [
        [
          "청두 솽류국제공항 / CTU",
          "실제 항공편이 이곳에서 운항하고 숙소·기차역·다음 예약까지의 도시 쪽 사슬이 더 나을 때.",
          "짧은 시내 이동이 실제 항공 시각, 터미널, 짐과 체크인 여유를 넣어도 유리한가요?",
          "CTU가 모든 국내선을 처리하거나 오래된 항공사 목록이 유효하다고 가정하지 마세요."
        ],
        [
          "청두 톈푸국제공항 / TFU",
          "필요한 항공편이 TFU에서 운항하거나 동쪽·남동쪽 사슬과 현재 지상 교통이 전체 여정을 성립시킬 때.",
          "공항을 나온 뒤 정확한 숙소·역·다음 출발지에 복구 가능한 여유로 도착할 수 있나요?",
          "TFU의 큰 노선망이 모든 청두 숙소에 가깝거나 모든 열차와 연결된다는 뜻은 아닙니다."
        ],
        [
          "CTU ↔ TFU 공항 간 복구",
          "예약 코드가 확인되고 여행자가 실제로 잘못된 공항에 있을 때만.",
          "현재 공식 도로·철도 수단이 항공사 마감 전에 충분히 안전한 여유로 올바른 터미널에 도착하나요?",
          "지도 시간은 보호 연결이 아닙니다. 공항 이동, 재예약, 숙박은 서로 다른 결정입니다."
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "CTU와 TFU의 항공사·터미널 배치는 다시 확인해야 합니다",
      "tone": "warning",
      "body": "항공사는 CTU·TFU와 터미널을 바꿀 수 있고 공항철도·버스 시간도 별도로 변합니다. 발권 후 활성 예약이 결정하며 게시 주간에 두 공항과 청두 지상 교통을 다시 확인하고 영구 항공사 목록은 게시하지 마세요."
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "서로 다른 공항이 유리한 청두 도착 세 가지"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "도착 항공편에서 실제 청두 호텔 문까지 재세요",
      "columns": [
        "청두 도착 형태",
        "CTU와 TFU 비교법",
        "보호할 공항 인계"
      ],
      "rows": [
        [
          "국제선 도착 후 청두 도심 첫 숙박",
          "입국·수하물 수취, 현재 공항 철도·도로, 정확한 호텔 지점, 마지막 도보와 프런트를 비교하세요. 항공편이 편한 공항도 도착 쪽 이동이 너무 늦으면 불리할 수 있습니다.",
          "올바른 공항에 도착했지만 마지막 확인된 연결편 이후 직원이 없는 호텔 지점에 도착하는 상황."
        ],
        [
          "판다·주자이거우 일정 뒤 이른 항공편",
          "마지막 밤 가이드가 숙박 위치를 정하고, 이 페이지는 실제 공항·터미널·체크인 마감과 지상 이동을 제공합니다. 관광 한 시간을 더 얻으려고 확인되지 않은 새벽 이동을 만들지 마세요.",
          "농촌 일정이나 늦은 귀환 뒤 새벽에 예약 공항이 청두 반대편임을 알게 되는 상황."
        ],
        [
          "항공편에서 당일 청두 열차로 연결",
          "공항 코드와 전체 중국어 기차역명을 모두 확인하고 입국·수하물, 공항 출구, 실제 도시 횡단, 역 진입과 지연 여유를 더하세요. 별도 승차권은 열차가 기다린다는 보장이 없습니다.",
          "올바른 공항에는 도착했지만 잘못된 청두 기차역으로 가 마지막 연결편을 놓치는 상황."
        ]
      ]
    },
    {
      "id": "chain-heading",
      "type": "heading",
      "level": 2,
      "text": "CTU와 TFU의 입국 심사부터 호텔까지 추적하세요"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "두 개의 완전한 공항 사슬을 비교하세요",
      "columns": [
        {
          "heading": "출발 쪽 사슬",
          "items": [
            "숙소·이전 도시에서 올바른 공항까지",
            "올바른 터미널과 항공사 마감",
            "수하물, 보안검사와 해당 출국 절차"
          ]
        },
        {
          "heading": "도착 쪽 사슬",
          "items": [
            "입국·국내선 도착과 수하물 수취",
            "현재 공항 철도·버스·합법 도로 승차 지점",
            "정확한 호텔 입구와 프런트"
          ]
        },
        {
          "heading": "연결 사슬",
          "items": [
            "전체 중국어 기차역명 또는 이름 있는 다음 거점",
            "별도 표의 지연 여유",
            "재예약 또는 직원이 있는 숙박 대안"
          ]
        }
      ]
    },
    {
      "id": "late-heading",
      "type": "heading",
      "level": 2,
      "text": "큰 짐과 늦은 착륙은 두 청두 공항의 차이를 키웁니다"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "짧아 보이는 항공편보다 마지막 청두 이동을 보호하세요",
      "columns": [
        "공항 제약",
        "더 안전한 CTU/TFU 계획",
        "버려야 할 공항 지름길"
      ],
      "rows": [
        [
          "TFU·CTU 늦은 도착",
          "수하물 수취 후 현재 공식 공항 교통을 다시 확인하세요. 표지된 택시·호출차 절차나 확인된 호텔 이동을 쓰고 정확한 지점에 알리세요.",
          "낮 지하철·버스가 지연 항공편 뒤에도 남아 있다는 가정."
        ],
        [
          "큰 짐 또는 이동 제약",
          "터미널 도보, 엘리베이터 확실성, 모든 차량 변경과 호텔 마지막 입구를 세세요. 합법적 직행 차량을 비교하되 배차나 가격을 가정하지 마세요.",
          "공항철도 아이콘이 호텔까지 무단차 이동을 증명한다는 가정."
        ],
        [
          "출발 전 잘못 간 공항",
          "코드와 터미널을 확인하고 항공사에 연락해 현재 공항 간 도착 예상과 체크인·탑승 마감을 비교한 뒤 이동, 재예약 또는 숙박을 고르세요.",
          "빠른 택시 예상이 항공사의 지각 승객 수용을 뜻한다는 가정."
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "잘못된 청두 공항에 왔다면 곧장 도시를 가로지르지 마세요"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "활성 예약을 열어 CTU·TFU, 터미널, 항공편 번호, 날짜와 항공사 마감을 읽으세요.",
        "같은 공항의 잘못된 터미널인지, 완전히 다른 공항인지 확인하세요.",
        "긴 이동 전에 항공사나 공항 서비스 지점에 연락해 가상 규칙이 아니라 현재 예약을 문의하세요.",
        "현재 공식 철도·도로의 올바른 터미널 도착 예상과 체크인·탑승 마감, 보안 시간을 비교하세요.",
        "여유가 약하면 보호되지 않은 연결을 위해 청두를 가로질러 달리지 말고 재예약하거나 숙박을 보호하세요.",
        "숙소, 철도 운영사나 다음 픽업 담당자에게 각자의 마감 전에 도착 변경을 알리세요."
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "이럴 때 솽류와 톈푸의 우선순위를 바꾸세요"
    },
    {
      "id": "answer-changes",
      "type": "list",
      "ordered": false,
      "items": [
        "실제 항공편이 다른 공항이나 터미널로 변경될 때.",
        "첫날·마지막 숙소가 청두 도심·서쪽에서 동쪽·남동쪽으로 바뀔 때.",
        "당일 열차, 주자이거우 출발이나 시간 지정 판다 방문이 고정 마감이 될 때.",
        "항공편이 확인된 지상 교통 시간 밖의 이른·늦은 시각으로 바뀔 때.",
        "짐이나 이동 요구 때문에 추가 공항–도시 환승을 감당하기 어려울 때."
      ]
    },
    {
      "id": "checklist-heading",
      "type": "heading",
      "level": 2,
      "text": "CTU/TFU 예약 및 출발 주간 확인"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "도시명이 아니라 실시간 예약에서 CTU·TFU와 터미널 확인.",
        "게시 주간에 항공사와 청두공항 조회 재확인.",
        "정확한 호텔 지점과 중국어 주소 저장.",
        "실제 시각의 공항 철도·버스·택시·호출차 승차 방식 확인.",
        "항공사 체크인·탑승 마감을 계획에 기록.",
        "별도 표의 철도·농촌 연결에 실제 대안 준비.",
        "공항 이동을 중단하고 재예약·숙박으로 바꿀 기준 설정."
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "자주 묻는 질문"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "CTU가 TFU보다 도심에 더 가깝나요?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "CTU가 남동쪽 TFU보다 도시 쪽에 있는 편이지만 거리만으로 결정할 수 없습니다. 가능한 항공편, 정확한 숙소, 터미널, 도착 시각과 다음 연결편이 실제 사슬을 정합니다."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "청두 국제선은 한 공항만 이용하나요?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "항공편 종류로 공항을 정하지 마세요. 공항·터미널 배정은 바뀌며 2026년 7월 지역 노선 조정도 그 변동성을 보여 줍니다. 활성 항공사 예약이 우선입니다."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "같은 날 CTU와 TFU 사이를 환승할 수 있나요?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "가능할 수 있지만 보호되지 않은 도시 횡단 이동입니다. 현재 공식 경로, 터미널 간 도착 예상과 두 항공사 마감을 확인하세요. 여유가 확실하지 않다면 항공편을 바꾸거나 숙박을 확보하세요."
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "주자이거우에는 어느 청두 공항이 더 좋은가요?"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "영구적인 공항 답은 없습니다. 실제 항공편을 고른 뒤 다음 이동 수단과 거점 결정은 청두–주자이거우 페이지로 넘기고 중간 숙박, 기차역이나 긴 도로 이동을 모두 계산하세요."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "청두 공항을 정한 뒤 이어서 계획하세요",
      "items": [
        {
          "label": "청두 도시 가이드부터 보기",
          "href": "/ko/destinations/chengdu/",
          "description": "공항을 첫 청두 여행 전체 계획에 넣습니다."
        },
        {
          "label": "청두에서 주자이거우로 이어가기",
          "href": "/ko/guides/chengdu-jiuzhaigou-transport-route/",
          "description": "실제 공항을 안 뒤 다음 이동 수단과 거점을 고릅니다."
        },
        {
          "label": "청두 판다 명소 고르기",
          "href": "/ko/guides/chengdu-panda-base-or-dujiangyan-panda-valley/",
          "description": "시간 지정 명소 결정을 공항 선택과 분리합니다."
        },
        {
          "label": "항공편 전 마지막 밤 보호",
          "href": "/ko/guides/china-last-night-before-international-flight/",
          "description": "실제 공항과 출발 시각이 정해진 뒤 숙박 위치를 결정합니다."
        },
        {
          "label": "전용 이동과 대중교통 비교",
          "href": "/ko/guides/china-private-transfer-or-public-transport/",
          "description": "인계, 짐, 운행 시간과 대안으로 지상 구간을 판단합니다."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 출처와 이미지 크레디트",
      "items": [
        {
          "label": "2026년 7월 30일 지역 항공편 조정",
          "url": "https://www.cdairport.com/news_detail.aspx?cid=6393&page=1&t=60",
          "publisher": "Chengdu Airports",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "청두공항 공식 지상 교통",
          "url": "https://www.cdairport.com/traffic3.aspx?t=36",
          "publisher": "Chengdu Airports",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "청두공항 공식 공지 보관함",
          "url": "https://www.cdairport.com/news_detail.aspx?cid=2507&page=4&t=60",
          "publisher": "Chengdu Airports",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "중국철도 실시간 역·열차 검색",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "대표 이미지: 청두 톈푸국제공항",
          "url": "https://commons.wikimedia.org/wiki/File%3A%E6%88%90%E9%83%BD%E5%A4%A9%E5%BA%9C%E5%9B%BD%E9%99%85%E6%9C%BA%E5%9C%BA_Chengdu_Tianfu_International_Airport_2.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
