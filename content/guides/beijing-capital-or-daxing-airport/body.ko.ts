import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "예약에 PEK나 PKX가 적히면 공항과 터미널은 고정됩니다. 예약 전에는 실제 날짜에 운항하는 항공편만 비교하고 숙소–공항 또는 공항–철도 전체 여정을 계산하세요. 두 공항은 거대한 베이징의 서로 다른 쪽에 있어 ‘도심에서 가까움’만으로 항공편을 보호할 수 없습니다."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "공항 코드를 확인한 뒤 전체 사슬을 시험하세요",
      "tone": "decision",
      "body": "PEK는 베이징 도심 북동쪽, PKX는 남쪽에 있습니다. 숙소, 베이징 기차역, 도착 시각이나 다음 도시가 겉보기 답을 뒤집을 수 있습니다. 항공사·터미널은 바뀌므로 특정 항공사를 한 공항에 영구 배정하지 말고 활성 표와 현재 공항·시 교통을 따르세요."
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "이 페이지가 맡는 범위",
      "tone": "neutral",
      "body": "이 페이지는 예약 전 PEK/PKX 선택, 예약 후 코드·터미널 확인, 숙소·철도 인계와 잘못 간 공항 복구를 맡습니다. 베이징남역–공항 좁은 과업, 베이징 8개 기차역 선택, 항공사 순위나 공항철도·버스·택시 시간표는 반복하지 않습니다."
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "활성 예약의 PEK/PKX 코드, 터미널, 항공편과 항공사 마감을 화면 캡처해 오프라인 저장하고 지도 약칭으로 바꾸지 마세요.",
        "첫 문은 정확한 베이징 숙소 또는 8개 주요 기차역 중 하나로, 마지막 문은 올바른 수도·다싱 터미널 또는 베이징 첫 숙소 지점로 적으세요.",
        "항공사 체크인·탑승과 베이징 철도 출발이라는 고정 마감과 가장 늦은 안전 포기 기준을 표시하세요.",
        "베이징 양쪽 거리, 터미널 도보와 공항 간 짐을 구간별로 세고 본선 시간만 복사하지 마세요.",
        "항공사, PEK/PKX 서비스 데스크와 현재 베이징 교통의 현재 확인 경로와 실패 시 항공사 재예약 또는 올바른 공항 쪽 직원 있는 숙박을 저장하세요."
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "도시 이름이 아니라 전체 여정을 비교하세요"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "실시간 승차권과 정확한 목적지가 어떤 요령보다 우선합니다",
      "columns": [
        "노드 또는 이동 사슬",
        "후보에 넣을 때",
        "결정을 가르는 질문",
        "막아야 할 실수"
      ],
      "rows": [
        [
          "베이징 수도국제공항 / PEK",
          "실제 항공편이 PEK를 이용하고 북동쪽·도심 숙소나 철도 사슬이 성립할 때.",
          "어느 터미널, 현재 공항 교통과 숙소·역 문이 이 시간대 여정을 완성하나요?",
          "모든 국제 항공사가 PEK를 쓰거나 터미널을 바꿀 수 있다고 가정하지 마세요."
        ],
        [
          "베이징 다싱국제공항 / PKX",
          "실제 항공편이 PKX를 이용하고 남쪽 철도·도로 사슬이 숙소, 베이징 남·서쪽이나 다음 여정에 맞을 때.",
          "특히 이른·늦은 시간에 항공편 장점이 전체 이동과 항공사 마감을 넣어도 남나요?",
          "PKX 공항선이 빠르다고 모든 베이징 주소가 짧거나 보호 연결인 것은 아닙니다."
        ],
        [
          "PEK ↔ PKX 잘못 간 공항 복구",
          "활성 코드가 확인되고 여행자가 실제로 다른 공항에 있을 때만.",
          "현재 공식 이동이 항공사 마감 전에 충분히 안전한 여유로 올바른 터미널에 도착하나요?",
          "공개 버스·지도 시간은 공항 간 연결 보장이 아닙니다."
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "오늘의 운행 형태를 영구 규칙으로 만들지 마세요",
      "tone": "warning",
      "body": "PEK와 PKX는 베이징 반대쪽에 있고 터미널, 공항버스와 철도 시간은 따로 바뀝니다. 발권 후 활성 코드가 결정합니다. 게시 전 두 공항과 베이징 교통 출처를 다시 열고 항공사를 영구 배정하지 마세요."
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "서로 다른 답이 나오는 세 가지 여정"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "여행자의 실제 첫 문과 마지막 문에서 시작합니다",
      "columns": [
        "여행 사슬",
        "실행 가능한 판단법",
        "막아야 할 실패"
      ],
      "rows": [
        [
          "베이징 도심·북동쪽 숙소 도착",
          "입국·수하물, 현재 공항 철도·도로, 정확한 호텔 지점과 늦은 프런트를 비교하세요. PEK가 시내 구간을 줄일 수 있지만 실제 PEK 항공편만 그 이점을 쓸 수 있습니다.",
          "이론상 가까운 공항을 골랐지만 실제 항공편이 PKX에서 운항하는 상황."
        ],
        [
          "베이징 남쪽 숙소에서 이른 출발",
          "공항과 체크인 마감을 안 뒤 마지막 밤 페이지가 숙박 위치를 정합니다. 낮 공항철도 약속이 아니라 확인된 새벽 접근을 비교하세요.",
          "일행이 짐을 들고 출발할 때 계획한 철도가 운행하지 않는 상황."
        ],
        [
          "항공편에서 베이징 열차로 연결",
          "공항 코드와 베이징 8개 주요 철도 노드 중 전체 중국어 역명을 확인하세요. 철도 페이지가 역을 고르고 이 페이지가 공항–역 인계와 별도 표 여유를 보호합니다.",
          "공항은 맞지만 여행자가 잘못된 베이징 기차역으로 가는 상황."
        ]
      ]
    },
    {
      "id": "chain-heading",
      "type": "heading",
      "level": 2,
      "text": "문 앞에서 문 앞까지 이동을 완성하세요"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "활성 예약의 PEK/PKX 코드, 터미널, 항공편과 항공사 마감은 여정의 중간일 뿐입니다",
      "columns": [
        {
          "heading": "정확한 베이징 숙소 또는 8개 주요 기차역 중 하나에서 출발",
          "items": [
            "정확한 베이징 숙소 또는 8개 주요 기차역 중 하나에서 이동하기 전에 체크아웃·도착 상태를 확인하세요.",
            "합법적이고 표지된 경로에서 베이징 양쪽 거리, 터미널 도보와 공항 간 짐을 처리하세요.",
            "표의 노드에 일찍 도착해 항공사 체크인·탑승과 베이징 철도 출발을 보호하세요."
          ]
        },
        {
          "heading": "활성 예약의 PEK/PKX 코드, 터미널, 항공편과 항공사 마감을 그대로 읽기",
          "items": [
            "활성 주문 상태와 함께 활성 예약의 PEK/PKX 코드, 터미널, 항공편과 항공사 마감을 저장하세요.",
            "항공사, PEK/PKX 서비스 데스크와 현재 베이징 교통에 기억한 패턴이 아닌 실시간 예외를 문의하세요.",
            "활성 기록을 도시 단위 지도 핀으로 바꾸지 마세요."
          ]
        },
        {
          "heading": "올바른 수도·다싱 터미널 또는 베이징 첫 숙소 지점에서 이동 완료",
          "items": [
            "현재 표지된 출구, 합법 승차 또는 확인된 현지 연결을 이용하세요.",
            "짐과 남은 여유로 올바른 수도·다싱 터미널 또는 베이징 첫 숙소 지점에 갈 수 있는지 확인하세요.",
            "인계가 실패하면 즉흥적으로 움직이지 말고 항공사 재예약 또는 올바른 공항 쪽 직원 있는 숙박을 사용하세요."
          ]
        }
      ]
    },
    {
      "id": "late-heading",
      "type": "heading",
      "level": 2,
      "text": "짐, 늦은 도착과 이동 제약은 답을 바꿉니다"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "지도에서 가장 짧은 선이 아니라 가장 약한 인계를 보호합니다",
      "columns": [
        "제약",
        "더 안전한 작업안",
        "가정하면 안 되는 것"
      ],
      "rows": [
        [
          "베이징 양쪽 거리, 터미널 도보와 공항 간 짐",
          "정확한 베이징 숙소 또는 8개 주요 기차역 중 하나에서 올바른 수도·다싱 터미널 또는 베이징 첫 숙소 지점까지 대기, 엘리베이터, 차량 변경과 마지막 도보를 세고 불확실한 인계를 줄이세요.",
          "교통 아이콘이 올바른 수도·다싱 터미널 또는 베이징 첫 숙소 지점까지 무단차임을 증명한다는 가정."
        ],
        [
          "도착이 항공사 체크인·탑승과 베이징 철도 출발을 위협함",
          "목적지에 알리고 항공사, PEK/PKX 서비스 데스크와 현재 베이징 교통에 문의하며 마지막 인계를 확인할 수 없으면 항공사 재예약 또는 올바른 공항 쪽 직원 있는 숙박으로 바꾸세요.",
          "낮의 올바른 수도·다싱 터미널 또는 베이징 첫 숙소 지점 연결편이 지연 뒤에도 남아 있다는 가정."
        ],
        [
          "올바른 수도·다싱 터미널 또는 베이징 첫 숙소 지점 뒤 별도 예약",
          "항공사 체크인·탑승과 베이징 철도 출발 전에 정확한 출구, 현지 인계와 처리 시간을 더하고 여유가 약하면 예약을 바꾸세요.",
          "한 일정표에 적혀 있으면 다음 운영사가 활성 예약의 PEK/PKX 코드, 터미널, 항공편과 항공사 마감을 보호한다는 가정."
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "잘못된 노드에 갔을 때의 복구 순서"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "이동을 멈추고 활성 예약의 PEK/PKX 코드, 터미널, 항공편과 항공사 마감을 다시 열어 눈앞 표지와 글자별로 비교하세요.",
        "항공사, PEK/PKX 서비스 데스크와 현재 베이징 교통에 오류가 입구, 현지 갈림 또는 완전히 다른 노드인지 확인하세요.",
        "지역을 가로지르는 비용을 내기 전에 활성 예약의 PEK/PKX 코드, 터미널, 항공편과 항공사 마감에 연결된 실시간 변경·환불·재예약을 확인하고 결과를 약속하지 마세요.",
        "이동이 아직 합리적이면 올바른 수도·다싱 터미널 또는 베이징 첫 숙소 지점로 찾아가 확인된 도착과 항공사 체크인·탑승과 베이징 철도 출발을 비교하세요.",
        "목적지에 정확한 베이징 숙소 또는 8개 주요 기차역 중 하나에서 생긴 일, 이제 도착할 노드와 바꿔야 할 예약을 정확히 알리세요.",
        "여유가 사라지면 일행과 짐을 함께 두고 직원 도움으로 항공사 재예약 또는 올바른 공항 쪽 직원 있는 숙박을 사용하세요."
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "이럴 때 답이 바뀝니다"
    },
    {
      "id": "answer-changes",
      "type": "list",
      "ordered": false,
      "items": [
        "항공사가 공항·터미널을 바꿀 때.",
        "숙소가 북동·도심·남쪽·서쪽 사이에서 바뀔 때.",
        "베이징 기차역이나 별도 표 출발이 고정 마감이 될 때.",
        "공항철도, 버스, 도로공사나 터미널 접근이 바뀔 때.",
        "이른·늦은 항공편이 확인된 대중교통 시간 밖으로 갈 때."
      ]
    },
    {
      "id": "checklist-heading",
      "type": "heading",
      "level": 2,
      "text": "최종 예약 및 게시일 재확인 목록"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "여행자의 실제 날짜로 활성 예약의 PEK/PKX 코드, 터미널, 항공편과 항공사 마감을 다시 검색.",
        "정확한 베이징 숙소 또는 8개 주요 기차역 중 하나에서 올바른 수도·다싱 터미널 또는 베이징 첫 숙소 지점까지 필요한 정확한 중국어 이름 저장.",
        "올바른 수도·다싱 터미널 또는 베이징 첫 숙소 지점의 연락처와 이용 시간 기록.",
        "항공사, PEK/PKX 서비스 데스크와 현재 베이징 교통을 통해 현재 합법 접근 확인.",
        "평균 여행자가 아니라 이 일행 기준으로 베이징 양쪽 거리, 터미널 도보와 공항 간 짐을 다시 계산.",
        "항공사 체크인·탑승과 베이징 철도 출발 전에 포기 기준 기록.",
        "게시 주간에 공식 출처를 다시 열고 사슬이 실패하면 항공사 재예약 또는 올바른 공항 쪽 직원 있는 숙박으로 변경."
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
      "text": "베이징 어느 공항이 도심에 더 가깝나요?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "PEK는 북동쪽으로 많은 도심·북동 주소에 가까운 편이고 PKX는 남쪽입니다. 거리만으로는 부족하며 실제 항공편, 터미널, 숙소와 마감이 결정합니다."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "국제선은 항상 PEK를 이용하나요?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "아닙니다. 항공편 종류나 기억한 항공사로 배정하지 말고 활성 예약의 PEK·PKX와 터미널을 읽으세요."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "PEK와 PKX 사이를 이동할 수 있나요?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "현재 도로·버스 옵션이 있을 수 있지만 긴 보호되지 않은 이동입니다. 올바른 터미널 도착과 항공사 마감을 비교하고 여유가 약하면 재예약·숙박하세요."
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "베이징남역 공항 이동 가이드를 대신하나요?"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "아닙니다. 그 페이지는 발권된 베이징남역–공항 좁은 과업을 맡고, 이 페이지는 전체 여정에서 PEK·PKX를 고른 뒤 베이징남역 사례를 넘깁니다."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "다음 실제 결정을 이어서 해결하세요",
      "items": [
        {
          "label": "베이징 도시 가이드부터 보기",
          "href": "/destinations/beijing/",
          "description": "공항을 첫 베이징 여행 전체 계획에 넣습니다."
        },
        {
          "label": "베이징 숙소 지역 고르기",
          "href": "/guides/beijing-where-to-stay-first-trip/",
          "description": "정확한 숙소를 도시 쪽 문으로 사용합니다."
        },
        {
          "label": "베이징 주요 기차역 고르기",
          "href": "/guides/which-beijing-railway-station/",
          "description": "공항 연결을 만들기 전에 철도 노드를 정합니다."
        },
        {
          "label": "베이징남역에서 PEK·PKX로 이동",
          "href": "/guides/beijing-south-station-to-capital-or-daxing-airport/",
          "description": "실제 역이 베이징남역일 때 좁은 페이지를 사용합니다."
        },
        {
          "label": "항공편 전 마지막 밤 보호",
          "href": "/guides/china-last-night-before-international-flight/",
          "description": "공항과 마감을 정한 뒤 숙박 위치를 고릅니다."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 출처와 이미지 크레디트",
      "items": [
        {
          "label": "베이징 현재 지하철·공항 접근",
          "url": "https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202607/t20260707_4750977.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "PEK 공식 지상 교통",
          "url": "https://english.beijing.gov.cn/specials/beijingservice/pek/trafficsix/",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "PKX 공식 교통·터미널 서비스",
          "url": "https://zdzqgw.beijing.gov.cn/zqfw/bjdxgjjc/",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026년 공항버스 조정",
          "url": "https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202603/t20260330_4569298.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "대표 이미지: 베이징 다싱국제공항",
          "url": "https://commons.wikimedia.org/wiki/File%3ABeijing_Daxing_International_Airport_Terminal_20191005.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
