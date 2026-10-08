import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "direct-answer",
      "type": "lead",
      "text": "중국의 유명 관광지 중 일부는 예약제로 운영되므로, 출발 전에 어디를 미리 예약해야 하는지 알아 두면 훨씬 수월합니다. 자금성은 방문 7일 전 중국 시간 20:00에 예약을 열고 당일권을 팔지 않습니다. 중국국가박물관은 무료지만 실명 예약이 필요하고, 천문산은 날짜별로 코스와 입장 시간대를 골라야 합니다. 상하이박물관 동관처럼 일반 개인 입장은 예약 없이 가능한 곳도 있습니다."
    },
    {
      "id": "party-scenario",
      "type": "paragraph",
      "text": "인기 관광지 예약은 한 곳의 방문으로 끝나지 않는 경우가 많습니다. 차량 픽업 시간, 묵기 편한 지역, 그날 함께 넣을 수 있는 일정이 모두 여기에 맞춰집니다. 일행이 가장 놓치고 싶지 않은 곳부터 정하고, 확정된 입장 시간을 중심으로 일정을 짜세요."
    },
    {
      "id": "priority-heading",
      "type": "heading",
      "level": 2,
      "text": "어떤 관광지부터 준비할까요?"
    },
    {
      "id": "priority-intro",
      "type": "paragraph",
      "text": "주요 관광지의 예약 규칙을 비교했습니다. 오픈 시각은 모두 중국 시간(UTC+8) 기준이라, 계시는 곳의 시간으로는 전혀 다른 시각일 수 있습니다."
    },
    {
      "id": "priority-table",
      "type": "table",
      "caption": "관광지별 예약 규칙 한눈에 보기",
      "columns": [
        "관광지",
        "예약 규칙",
        "일정에서 맞출 점"
      ],
      "rows": [
        [
          "자금성",
          "사전예약 필요: 방문 7일 전 20:00 오픈, 당일권 없음",
          "확정된 날짜를 중심으로 베이징 일정을 짜세요."
        ],
        [
          "톈안먼 광장",
          "무료 실명 예약, 현행 안내는 1~7일 전",
          "고궁박물원 입장권과 별개입니다. 연계 예약 예외가 아직 적용되는지 확인하세요."
        ],
        [
          "중국국가박물관",
          "무료 실명 예약, 최대 7일 전, 매일 17:00 오픈",
          "입장 시간대를 고르고, 방문자마다 확정된 자리가 있어야 합니다."
        ],
        [
          "병마용",
          "방문자 전원 실명 사전 구매",
          "입장권을 먼저 확인한 뒤 시안 교통을 확정하세요."
        ],
        [
          "싼싱두이박물관",
          "입경 여행객용 공식 여권 예약 경로",
          "광한 이동편을 예약하기 전에 방문 날짜의 현재 오픈 규칙을 확인하세요."
        ],
        [
          "천문산",
          "날짜별 코스·입장 시간대·입구 선택",
          "코스와 입구에 따라 하루의 출발 지점과 픽업 방식이 달라집니다."
        ],
        [
          "장가계 국가삼림공원",
          "정확한 입장권 상품 확인",
          "입구·시간·유효기간·공원 내 교통을 함께 확인하세요."
        ],
        [
          "상하이박물관 동관",
          "일반 개인 입장: 예약 불필요",
          "체험 구역은 별도 예약, 특별전은 개별 조건이 적용됩니다."
        ]
      ]
    },
    {
      "id": "separate-venues",
      "type": "callout",
      "tone": "neutral",
      "title": "같은 지역이라도 입장권은 다릅니다",
      "body": "톈안먼 광장, 톈안먼 성루, 고궁박물원은 서로 다른 방문이고, 상하이박물관 동관과 인민광장관도 규칙이 다릅니다. 산 입장권에 케이블카가 포함되지 않을 수 있습니다. 무료 입장도 예약이 필요할 수 있고, 일반 자유 입장 전시는 예약할 필요가 없습니다."
    },
    {
      "id": "why-it-matters",
      "type": "comparison",
      "title": "예약 하나가 하루 전체를 좌우하는 이유",
      "columns": [
        {
          "heading": "입장은 시간표대로 열립니다",
          "body": "규칙이 가장 엄격한 곳은 방문 며칠 전 정해진 중국 시간에 자리를 열고, 자금성은 당일권을 팔지 않습니다. 예약 가능 여부는 날짜와 시간대마다 달라 연휴에는 조정할 여지가 더 적습니다."
        },
        {
          "heading": "일행마다 각자의 자리가 필요합니다",
          "body": "예약은 신분증 기준으로 한 사람씩 등록되며, 부모의 예약이 자녀를 자동으로 포함하지 않습니다. 일행 전원이 확정되어야 그날이 준비된 것입니다."
        },
        {
          "heading": "나머지 일정은 입장 시간을 따릅니다",
          "body": "입장 시간에 따라 픽업 시간, 묵기 편한 지역, 그날 넣을 수 있는 일정이 정해집니다. 가족 중 일부만 예약되면 하루 전체를 다시 짜야 합니다."
        }
      ]
    },
    {
      "id": "prepare-heading",
      "type": "heading",
      "level": 2,
      "text": "예약이 열리기 전에 준비할 것"
    },
    {
      "id": "prepare-list",
      "type": "list",
      "ordered": true,
      "items": [
        "가장 중요한 날짜 하나와 대체 날짜 하나를 정하세요. 바꾸기 어려운 방문을 장거리 비행 직후에 넣지 마세요.",
        "일행 각자의 이름, 신분증 종류, 여권 정보를 비공개로 정리해 모두 예약할 수 있게 하세요.",
        "공식 채널, 중국 시간 기준 오픈 시각, 전시 추가 예약을 미리 확인하세요. 미리 준비한다고 이미 판매 중인 것은 아닙니다.",
        "예약 계정과 결제 수단을 쓸 수 있는지 확인하고, 신분증 입력이 거부되면 먼저 해결한 뒤 하루 일정을 확정하세요."
      ]
    },
    {
      "id": "confirmed-heading",
      "type": "heading",
      "level": 2,
      "text": "언제 그날이 확실히 준비된 걸까요?"
    },
    {
      "id": "confirmed-copy",
      "type": "paragraph",
      "text": "방문자 전원, 정확한 관광지, 날짜, 입장 시간대가 적힌 완료된 예약 기록이 있어야 합니다. 결제 알림이나 제출한 신청만으로는 부족합니다. 확인 내역을 오프라인으로 저장하고, 각자 예약에 쓴 여권 원본을 지참하세요. 당일에도 올바른 입구, 보안 검색, 케이블카 대기 시간을 넉넉히 잡으세요."
    },
    {
      "id": "popular-dates",
      "type": "callout",
      "tone": "neutral",
      "title": "원하는 날짜가 어려울 때",
      "body": "대체 날짜나 시간대를 하나 남겨 두세요. 고정 방문 여러 개를 한 오후에 몰기보다 산책이나 식사처럼 유연한 일정을 먼저 옮기세요. 주문이 대기 중이거나 매진으로 보이면, 표를 하나 더 사기 전에 관광지 공식 지원 창구에서 상태를 확인하세요."
    },
    {
      "id": "attraction-guides",
      "type": "internal-links",
      "title": "관광지별 자세한 예약 가이드",
      "items": [
        {
          "label": "자금성·톈안먼",
          "href": "/ko/guides/forbidden-city-for-foreign-visitors/"
        },
        {
          "label": "중국국가박물관",
          "href": "/ko/guides/national-museum-of-china-booking-and-route/"
        },
        {
          "label": "병마용",
          "href": "/ko/guides/terracotta-warriors-without-tour/"
        },
        {
          "label": "싼싱두이박물관",
          "href": "/ko/guides/sanxingdui-museum-booking-and-gallery-order/"
        },
        {
          "label": "천문산",
          "href": "/ko/guides/tianmen-mountain-tickets-and-routes/"
        },
        {
          "label": "장가계 국가삼림공원",
          "href": "/ko/guides/zhangjiajie-national-forest-park-tickets-and-entrances/"
        },
        {
          "label": "상하이박물관 동관",
          "href": "/ko/guides/shanghai-museum-east-entry-reservations/"
        },
        {
          "label": "막고굴: 기존 예약·관람 가이드",
          "href": "/ko/guides/mogao-caves-independent-visit-workflow/"
        },
        {
          "label": "중국 전화번호 없이 예약하기",
          "href": "/ko/guides/book-china-attraction-tickets-without-chinese-phone-number/"
        }
      ]
    },
    {
      "id": "support-heading",
      "type": "heading",
      "level": 2,
      "text": "Homeground가 도울 수 있는 일"
    },
    {
      "id": "support-copy",
      "type": "paragraph",
      "text": "인기 관광지 예약은 여행 전체 일정에 영향을 줄 수 있습니다. 여행 날짜, 일행 수, 가고 싶은 곳을 알려 주시면, 관광지별 상황과 서비스 범위에 맞춰 일정을 함께 조율해 드립니다."
    },
    {
      "id": "support-list",
      "type": "list",
      "items": [
        "일행 전원의 방문 날짜를 맞추고, 각자의 예약 정보를 확인합니다.",
        "입장 시간을 픽업, 호텔, 기차와 전체 동선에 연결합니다.",
        "관광지나 투어마다 어떤 지원이 가능한지 안내합니다.",
        "결제 전에 범위, 비용, 대안을 서면으로 확인합니다."
      ]
    },
    {
      "id": "reservation-service",
      "type": "callout",
      "tone": "decision",
      "title": "8개 도시 관광지 예약 대행",
      "body": "예약 대행 서비스는 베이징, 상하이, 쑤저우, 항저우, 시안, 청두, 구이린, 리장의 일부 관광지를 대상으로 합니다. 요금은 관광지당 1인 10,000원이고, 공식 입장료는 웃돈 없이 정가 그대로 별도로 받습니다. 중국국가박물관이나 싼싱두이처럼 외국인 공식 경로가 있는 곳은 그 경로에서 시작하고, 결제 전에 가능한 지원을 확인해 드립니다.",
      "link": {
        "href": "https://homegroundchina.com/ko/services/china-attraction-reservations/#reservation-enquiry",
        "label": "대상 관광지·요금·예약 조건 보기"
      }
    },
    {
      "id": "support-links",
      "type": "internal-links",
      "title": "여러 관광지를 함께 계획하시나요?",
      "items": [
        {
          "label": "중국 프라이빗 투어",
          "href": "/ko/tours/",
          "description": "일정에 포함된 관광지 예약은 추가 서비스 요금 없이 호텔, 이동, 전체 동선과 함께 조율합니다."
        },
        {
          "label": "장가계 프라이빗 가이드",
          "href": "/ko/services/private-english-speaking-guides/#zhangjiajie",
          "description": "천문산과 국가삼림공원은 8개 도시 예약 대행 대상이 아니므로 장가계 프라이빗 투어나 가이드로 계획하세요. 가이드만 이용하면 교통과 입장권은 별도 견적입니다."
        }
      ]
    },
    {
      "id": "faq",
      "type": "faq",
      "title": "예약 전 자주 묻는 질문",
      "items": [
        {
          "question": "중국 관광지는 얼마나 일찍 예약해야 하나요?",
          "answer": "전국 공통 규칙은 없습니다. 출발 전에 준비하고 각 관광지의 현행 오픈 규칙을 따르세요. 자금성은 7일 전에 예약을 여는데, 이는 판매가 시작되는 시점이지 정확히 7일 전에 사야 한다는 뜻은 아닙니다."
        },
        {
          "question": "모든 박물관에 사전예약이 필요한가요?",
          "answer": "아닙니다. 상하이박물관 동관의 일반 개인 입장은 예약이 필요 없지만, 체험 구역과 유료 특별전은 별도입니다. 정확한 건물과 입장권을 확인하세요."
        },
        {
          "question": "예약하면 줄을 서지 않아도 되나요?",
          "answer": "아닙니다. 보안 검색, 여권 확인, 입장 통제, 케이블카 탑승은 그대로입니다. 방문을 예약한 뒤 현장 절차에 필요한 시간을 남겨 두세요."
        },
        {
          "question": "Homeground가 관광지 예약을 대신해 줄 수 있나요?",
          "answer": "8개 도시의 일부 관광지는 가능합니다. 예약 대행 요금은 관광지당 1인 10,000원이고 공식 입장료는 별도이며, 결제 전에 범위와 채널을 서면으로 확인합니다. Homeground 프라이빗 투어 일정에 포함된 관광지 예약은 추가 서비스 요금이 없습니다. 천문산과 장가계 국가삼림공원은 장가계 프라이빗 투어나 가이드 서비스를 이용하세요. 가이드만 이용하면 입장권과 교통은 별도 견적입니다."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 자료와 사진 출처",
      "items": [
        {
          "label": "고궁박물원: 영문 관람·예매 안내",
          "url": "https://intl.dpm.org.cn/visit.html",
          "publisher": "The Palace Museum",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "중국국가박물관: 현행 입장 규칙·영문 예약 링크",
          "url": "https://en.chnmuseum.cn/visit_692/",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "병마용: 중·영문 예매 규칙",
          "url": "https://www.bmy.com.cn/jingtai/bmyweb/ticketing.html",
          "publisher": "Emperor Qinshihuang's Mausoleum Site Museum",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "상하이박물관 동관: 개인 입장·별도 예약",
          "url": "https://www.shanghaimuseum.cn/mu/frontend/pg/en/service/visit-east",
          "publisher": "Shanghai Museum",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "광한시 정부: 외국인 여권·영문 예매 서비스",
          "url": "https://www.guanghan.gov.cn/gk/mbjj/gjjmb/1681915.htm",
          "publisher": "Guanghan Municipal Government",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "톈안먼 관리위원회: 2026년 9월 예약 안내",
          "url": "https://tamgw.beijing.gov.cn/zhengwugongkai/tzgg/202609/t20260924_4880476.html",
          "publisher": "Tiananmen Area Management Committee",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "천문산 관광지 2026년 8월 31일 공지, Rednet 게재",
          "url": "https://tour.rednet.cn/m/content/646042/75/16221781.html",
          "publisher": "Tianmen Mountain scenic area via Rednet",
          "reviewedAt": "2026-10-08"
        }
      ]
    }
  ]
};

export default body;
