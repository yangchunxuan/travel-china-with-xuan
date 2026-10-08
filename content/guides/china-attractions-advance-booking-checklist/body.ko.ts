import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "direct-answer",
      "type": "lead",
      "text": "중국 여행에서 가장 기대하는 하루는 출발 전 예약 결정에서 시작되기도 합니다. 자금성은 당일 입장권을 팔지 않고, 중국국가박물관은 무료 실명 예약이 필요하며, 천문산은 날짜·코스·입장 시간대를 맞춰야 합니다. 상하이박물관 동관의 일반 전시는 개인 방문객이 사전예약 없이 입장할 수 있습니다. 일행이 가장 놓치고 싶지 않은 곳부터 정하고, 확인된 예약에 맞춰 일정을 구성하세요."
    },
    {
      "id": "party-scenario",
      "type": "paragraph",
      "text": "베이징 관광일이 이틀뿐이고 한 박물관이 꼭 가고 싶은 곳인 가족을 가정해 보세요. 일부 일행만 예약되면 함께 보내려던 하루를 다시 조정해야 합니다. 휴일이나 확정된 출국일은 날짜 변경의 여지를 줄입니다. 출발 전에 일행 명단과 중국 시간 기준 오픈 시각부터 챙기세요."
    },
    {
      "id": "early-support",
      "type": "callout",
      "tone": "decision",
      "title": "예약 계획을 하루 일정에 반영하세요",
      "body": "꼭 방문할 날짜·일행 전체 인원·픽업 필요 사항을 Homeground에 알려 주세요. 예약과 하루 동선이 어떻게 맞는지, 원하는 시간대가 어려우면 어떤 대안이 가능한지 확인해 드릴 수 있습니다. 서비스 페이지의 대상 관광지·요금·약관을 참고하고, 결제 전에 가능한 범위와 채널을 서면으로 확인합니다.",
      "link": {
        "href": "https://homegroundchina.com/ko/services/china-attraction-reservations/#reservation-enquiry",
        "label": "내 일정에 맞는 예약 지원 보기"
      }
    },
    {
      "id": "priority-heading",
      "type": "heading",
      "level": 2,
      "text": "어떤 곳의 예약을 먼저 확인할까요?"
    },
    {
      "id": "priority-table",
      "type": "table",
      "caption": "중국 여행 예약 우선 목록. 오픈 시각은 중국 시간(UTC+8)입니다.",
      "columns": [
        "관광지",
        "예약 우선순위",
        "핵심 확인"
      ],
      "rows": [
        [
          "자금성",
          "사전예약 필요",
          "7일 전 20:00 오픈. 당일권 없음."
        ],
        [
          "톈안먼 광장",
          "무료, 사전예약 필요",
          "현행 안내는 1~7일 전 예약. 연계 예약 예외는 따로 확인."
        ],
        [
          "중국국가박물관",
          "무료 실명 예약",
          "최대 7일 전, 매일 17:00 오픈. 입장 시간대 선택."
        ],
        [
          "병마용",
          "실명 예약·사전 구매",
          "전원 사전 구매. 교통 확정 전에 현재 예약 가능 여부 확인."
        ],
        [
          "싼싱두이박물관",
          "공식 여권 예약 경로 준비",
          "영문 여권 예매 서비스는 확인됨. 현재 오픈 규칙 확인 필요."
        ],
        [
          "천문산",
          "날짜·코스·시간대 선택",
          "방문 날짜·운행 코스·입장 시간대·입구를 함께 확인."
        ],
        [
          "장가계 국가삼림공원",
          "정확한 상품 확인",
          "입구·시간·유효기간·교통 포함 범위를 함께 확인."
        ],
        [
          "상하이박물관 동관",
          "일반 개인 입장: 예약 불필요",
          "체험 구역은 별도 예약, 특별전은 개별 조건 적용."
        ]
      ]
    },
    {
      "id": "separate-venues",
      "type": "paragraph",
      "text": "정확한 장소를 구분하세요. 톈안먼 광장·성루·고궁박물원은 서로 다른 방문이고, 상하이 동관과 인민광장관의 규칙도 다릅니다. 산 입장권만으로 케이블카가 예약되지는 않을 수 있습니다. 무료 입장도 예약이 필요할 수 있고, 일반 자유 입장 전시는 예약할 것이 없을 수 있습니다."
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
      "items": [
        "꼭 가고 싶은 날짜와 가능한 대체 날짜를 정하세요. 도착일은 유연하게 두고, 변경이 어려운 예약을 항공편 직후에 붙이지 마세요.",
        "이름·신분증 종류·인원을 비공개로 준비하세요. 동행자마다 맞는 예약이 필요하며 부모 예약이 자녀를 자동으로 포함하지는 않습니다.",
        "오픈 전에 공식 채널·중국 시간·전시 추가 예약을 확인하세요. 미리 준비하는 것과 이미 판매 중인 것은 다릅니다.",
        "예약에 사용할 여권 원본과 계정·결제 수단을 확보하세요. 신분증 입력이 거부되면 그 문제를 먼저 해결한 뒤 하루 일정을 확정하세요."
      ]
    },
    {
      "id": "popular-dates-heading",
      "type": "heading",
      "level": 2,
      "text": "인기 날짜에는 일정 유연성이 필요합니다"
    },
    {
      "id": "popular-dates",
      "type": "paragraph",
      "text": "예약 오픈은 가능한 시간대를 신청할 기회이며 일행 전체 자리를 미리 확보해 주지는 않습니다. 대체 날짜나 시간대 하나를 남겨 두세요. 우선 예약이 어렵다면 여러 고정 방문을 한 오후에 몰기보다 산책·식사 같은 유연한 부분을 옮기세요. 입장권이 확인되어도 올바른 입구·보안 검색·케이블카 탑승 시간을 확보하세요."
    },
    {
      "id": "confirmed-heading",
      "type": "heading",
      "level": 2,
      "text": "어떤 상태여야 하루 일정이 준비된 걸까요?"
    },
    {
      "id": "confirmed-copy",
      "type": "paragraph",
      "text": "방문자 전원·관광지·날짜·입장 시간대가 맞는 완료된 예약 기록을 확인하세요. 결제 알림이나 요청 제출만으로는 충분하지 않습니다. 해당 신분증 원본을 지참하고 확인 내역을 오프라인으로 저장하세요. 매진 또는 대기 상태라면 불확실한 표를 또 사기 전에 관광지 공식 지원과 아래 가이드로 상태를 확인하세요."
    },
    {
      "id": "attraction-guides",
      "type": "internal-links",
      "title": "관광지별 자세한 가이드",
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
      "text": "필요한 일에 맞춰 지원을 선택하세요"
    },
    {
      "id": "support-copy",
      "type": "paragraph",
      "text": "입장권 한 건은 예약 지원이 맞을 수 있지만 여러 도시·호텔·확정 출국 일정은 전체 여행 계획이 필요합니다. Homeground 프라이빗 투어는 일정 내 관광지 예약에 별도 대행 수수료를 받지 않습니다. 장가계는 독립 예약 대행 8개 도시 목록에 없으므로 기존 프라이빗 투어나 가이드 서비스로 산 관광일을 조율하세요. 중국국가박물관과 싼싱두이는 공식 경로부터 시작하고, 외부 예약 지원은 관광지별로 확인해야 합니다."
    },
    {
      "id": "support-links",
      "type": "internal-links",
      "title": "여행에 맞는 서비스",
      "items": [
        {
          "label": "중국 프라이빗 투어",
          "href": "/ko/tours/",
          "description": "예약·호텔·이동·전체 동선을 함께 조율합니다."
        },
        {
          "label": "장가계 프라이빗 가이드",
          "href": "/ko/services/private-english-speaking-guides/#zhangjiajie",
          "description": "가이드만 제공하며 교통·입장권은 별도 견적입니다."
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
          "answer": "전국 공통 기간은 없습니다. 출발 전에 준비하고 각 관광지의 현행 오픈 규칙을 따르세요. 자금성의 7일 전 오픈은 판매 기간이며 정확히 7일 전에 사야 한다는 뜻은 아닙니다."
        },
        {
          "question": "모든 박물관에 사전예약이 필요한가요?",
          "answer": "아닙니다. 상하이박물관 동관의 일반 개인 입장은 예약이 필요 없습니다. 체험 구역과 유료 특별전은 별도이며 정확한 건물·상품을 확인하세요."
        },
        {
          "question": "예약하면 줄을 서지 않아도 되나요?",
          "answer": "보안 검색·여권 확인·입장 통제·케이블카 탑승은 별개입니다. 예약 후에도 현장 절차에 필요한 시간을 남겨 두세요."
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
