import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "픽업 지점은 항공권이나 열차표에 적힌 정확한 공항·역과 맞아야 합니다. 장자제 삼림공원 4일 일정은 장자제 허화 국제공항(DYG) 또는 장자제서역에서 시작하고 끝납니다. 7일 일정은 허화공항이나 최종 확인서에 적힌 장자제 기차역에서 시작할 수 있으며, 기본 종료점은 펑황고성역입니다. 최종 일정에 종료점이 적히기 전에는 변경 불가 항공권이나 열차표를 사지 마세요."
    },
    {
      "id": "names-heading",
      "type": "heading",
      "level": 2,
      "text": "예약 전에 정확히 확인해야 할 네 가지 명칭"
    },
    {
      "id": "names-table",
      "type": "table",
      "caption": "공식 교통 거점, 용도와 도착 후 남은 이동",
      "columns": [
        "거점",
        "용도",
        "도착 후 남은 이동"
      ],
      "rows": [
        [
          "장자제 허화 국제공항(DYG)",
          "항공편으로 장자제 도착",
          "확정된 시내 또는 우링위안 호텔까지 도로 이동."
        ],
        [
          "장자제서역",
          "이 일정에서 흔히 쓰는 고속철도 도착역",
          "도로 이동이 남습니다. 장자제역과 다른 역이며 공원 입구도 아닙니다."
        ],
        [
          "푸룽전역",
          "철도로 푸룽전 지역 도착",
          "역은 관광지에서 약 2.5km 떨어져 있어 지상 이동이 남습니다."
        ],
        [
          "펑황고성역",
          "펑황 도착 및 7일 일정 기본 종료점",
          "역은 고성 보행 구역 밖에 있어 현지 이동이 남습니다."
        ]
      ]
    },
    {
      "id": "name-warning",
      "type": "callout",
      "title": "12306에서는 중국어 역명으로 검색하세요",
      "body": "최종 승차권은 张家界西, 芙蓉镇, 凤凰古城으로 검색하세요. 장자제역과 장자제서역은 서로 다른 역입니다. 일정에 “장자제 기차역”만 적혀 있다면 아직 예약할 단계가 아닙니다.",
      "tone": "warning"
    },
    {
      "id": "arrival-heading",
      "type": "heading",
      "level": 2,
      "text": "공항과 장자제서역 모두 호텔 이동이 남습니다"
    },
    {
      "id": "arrival-copy",
      "type": "paragraph",
      "text": "모두에게 더 좋은 도착지를 찾는 것이 핵심은 아닙니다. 어느 항공편이나 열차가 적절한 시간에 도착하고, 확정된 호텔까지 전체 도로 이동 시간을 남겨 주는지가 중요합니다. 우링위안 숙박은 공원 일정을 지켜 주지만 공항이나 고속철도역 바로 옆이 아닙니다. 픽업 확정 전 편명·열차번호, 날짜, 도착 시각과 수하물 수량을 알려 주세요."
    },
    {
      "id": "arrival-figure",
      "type": "figure",
      "src": "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/zhangjiajie-hehua-airport-1600.webp",
      "alt": "터미널 뒤로 톈먼산이 보이는 장자제 허화 국제공항",
      "width": 1600,
      "height": 1000,
      "caption": "공항은 도착 거점이며, 숙박지까지 이동은 별도 구간입니다."
    },
    {
      "id": "route-heading",
      "type": "heading",
      "level": 2,
      "text": "4일 일정과 7일 일정은 종료점이 다릅니다"
    },
    {
      "id": "route-compare",
      "type": "comparison",
      "columns": [
        {
          "heading": "장자제 중심 일정",
          "body": "포함된 마지막 이동은 장자제 허화 국제공항 또는 장자제서역까지입니다. 다른 출발 지점은 별도 서면 확인이 필요합니다."
        },
        {
          "heading": "장자제–푸룽전–펑황 일정",
          "body": "기본 일정은 남쪽으로 이동해 펑황고성역에서 끝납니다. 장자제 귀환은 추가 도로 이동과 요금을 미리 확정한 경우에만 가능합니다."
        }
      ]
    },
    {
      "id": "furong-heading",
      "type": "heading",
      "level": 2,
      "text": "역 이름은 호텔이나 관광지 입구가 아닙니다"
    },
    {
      "id": "last-mile-copy",
      "type": "paragraph",
      "text": "후난성 정부 자료는 푸룽전역이 관광지에서 약 2.5km, 펑황고성역이 주요 고성 지역에서 약 10km 떨어져 있다고 설명합니다. 그래서 “직통 열차”만으로 전체 이동이 끝나지 않습니다. 거리를 고정 소요 시간으로 바꾸지 마세요. 교통, 실제 호텔, 보행 구역 통제, 당일 연결 교통과 수하물이 마지막 구간을 바꿉니다."
    },
    {
      "id": "booking-heading",
      "type": "heading",
      "level": 2,
      "text": "마지막 교통편을 예약하기 전에 확인할 5가지"
    },
    {
      "id": "booking-list",
      "type": "list",
      "ordered": true,
      "items": [
        "항공편은 공식 공항명과 IATA 코드, 열차는 정확한 중국어 역명.",
        "열차번호 또는 항공편명, 날짜와 예정 출발 시각.",
        "호텔 주소와 차량이 합법적으로 정차할 수 있는 위치.",
        "가방 수와 크기, 이동 보조기구 여부.",
        "최종 서면 일정이 펑황에서 끝나는지 장자제로 돌아가는지."
      ]
    },
    {
      "id": "dynamic-note",
      "type": "callout",
      "title": "시간표는 날짜별로 확인해야 합니다",
      "body": "열차 운행, 정차역, 요금과 좌석은 운행표와 여행 날짜에 따라 달라집니다. 실제 날짜를 중국철도 12306에서 확인하세요. Homeground는 최종 서면 일정에 픽업과 하차 지점을 명시합니다.",
      "tone": "neutral"
    },
    {
      "id": "faq",
      "type": "faq",
      "title": "기차역 자주 묻는 질문",
      "items": [
        {
          "question": "장자제서역과 장자제역은 같은 역인가요?",
          "answer": "아닙니다. 서로 다른 역입니다. 차량을 배정하기 전에 승차권의 중국어 역명을 확인하세요."
        },
        {
          "question": "공항이나 장자제서역 어디서든 픽업할 수 있나요?",
          "answer": "장자제 삼림공원 4일 일정은 허화공항 또는 장자제서역 픽업을 포함합니다. 7일 일정은 허화공항이나 최종 확인서에 적힌 장자제 기차역에서 시작할 수 있습니다. 다른 픽업 지점은 별도 확인이 필요하며 도착편과 수하물 정보도 알려 주세요."
        },
        {
          "question": "7일 투어는 D7에 장자제로 돌아가나요?",
          "answer": "기본 일정은 돌아가지 않습니다. 표준 종료점은 펑황고성역입니다. 장자제 귀환은 결제 전에 다른 이동 계획과 요금을 확정해야 합니다."
        },
        {
          "question": "견적을 받기 전에 항공권이나 열차표를 사야 하나요?",
          "answer": "예정 항공편이나 열차를 먼저 알려 주되, 여행 순서와 이동 지점을 확인하기 전에는 변경 불가 표를 사지 않는 편이 좋습니다. 마지막 교통편이 마지막 숙박과 D7 이동을 바꿀 수 있습니다."
        }
      ]
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "시작과 종료를 정한 뒤 일정을 고르세요",
      "items": [
        {
          "label": "장자제·푸룽전·펑황 6박 7일 프라이빗 투어",
          "href": "/ko/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/",
          "description": "기본 일정은 장자제에서 시작해 펑황고성역에서 끝납니다."
        },
        {
          "label": "장자제 삼림공원 3박 4일 프라이빗 투어",
          "href": "/ko/tours/zhangjiajie-forest-4-day-private-tour/",
          "description": "포함된 도착·출발 이동은 허화공항 또는 장자제서역을 이용합니다."
        },
        {
          "label": "7일 일정을 이 순서로 짜는 이유",
          "href": "/ko/guides/zhangjiajie-furong-fenghuang-route-order/",
          "description": "3+1+2박, 수하물과 되돌아가지 않는 순서를 확인하세요."
        },
        {
          "label": "장자제 시내 또는 우링위안 숙박지 선택",
          "href": "/ko/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          "description": "역 지도만 보지 말고 완전한 공원 일정을 먼저 지키세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 교통 자료",
      "items": [
        {
          "label": "중국철도 12306 현행 역명 데이터",
          "url": "https://kyfw.12306.cn/otn/resources/js/framework/station_name.js",
          "publisher": "중국철도 12306",
          "reviewedAt": "2026-09-20"
        },
        {
          "label": "장자제–지서우–화이화 고속철도 공식 역 순서",
          "url": "https://www.mct.gov.cn/whzx/qgwhxxlb/hn_7731/202112/t20211207_929617.htm",
          "publisher": "중화인민공화국 문화여유부",
          "reviewedAt": "2026-09-20"
        },
        {
          "label": "후난성 철도역 및 정부 영문 표기",
          "url": "https://www.enghunan.gov.cn/hneng/Services/Live/Transportation/RailwayStations/202607/t20260703_34019377.html",
          "publisher": "후난성 인민정부",
          "reviewedAt": "2026-09-20"
        },
        {
          "label": "장자제 허화 국제공항",
          "url": "https://enghunan.gov.cn/hneng/Services/Live/Transportation/Airports/202606/t20260604_33993921.html",
          "publisher": "후난성 인민정부",
          "reviewedAt": "2026-09-20"
        },
        {
          "label": "펑황고성역 연결 교통과 철도 노선",
          "url": "https://www.hunan.gov.cn/hnszf/hnyw/zwdt/202112/t20211206_21247807.html",
          "publisher": "후난성 인민정부",
          "reviewedAt": "2026-09-20"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
