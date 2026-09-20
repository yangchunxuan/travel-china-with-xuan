import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "7일이라면 장자제·우링위안을 먼저, 푸룽전을 두 번째, 펑황을 마지막에 두세요. 우링위안 3박은 공원 종일 일정 두 번을 지켜 줍니다. 푸룽전에서 1박하면 사진만 찍고 지나치지 않고 저녁 풍경까지 볼 수 있으며, 펑황 2박은 가이드와 도착하는 날과 자유 일정 하루를 나눠 줍니다. 마지막에는 장자제로 되돌아가지 않고 펑황고성역에서 출발합니다."
    },
    {
      "id": "order-heading",
      "type": "heading",
      "level": 2,
      "text": "왜 장자제 → 푸룽전 → 펑황 순서일까요?"
    },
    {
      "id": "order-copy",
      "type": "paragraph",
      "text": "공식 철도역 순서는 장자제서역, 푸룽전역, 펑황고성역이 후난성 서부의 같은 남북 교통축에 차례로 놓여 있음을 보여 줍니다. 그렇다고 이 여행이 열차를 이용한다는 뜻은 아닙니다. Homeground 7일 일정은 세 숙박지 사이를 전용 차량으로 이동해 수하물을 함께 싣고, 역 환승에 맞춰 하루를 다시 나누지 않습니다. 역 순서는 이 일정이 장자제로 되돌아가지 않고 남쪽으로 이어진다는 지리적 근거입니다."
    },
    {
      "id": "route-warning",
      "type": "callout",
      "title": "숙박지 사이 이동은 전용 차량입니다",
      "body": "최종 서면 일정이 특정 구간을 열차로 바꾼 경우가 아니라면 장자제–푸룽전–펑황 구간 승차권을 따로 사지 마세요. 열차 운행·정차·좌석은 날짜마다 달라지며, 공개된 7일 상품에는 일정에 적힌 전용 차량 이동이 포함됩니다.",
      "tone": "decision"
    },
    {
      "id": "nights-heading",
      "type": "heading",
      "level": 2,
      "text": "6박을 3 + 1 + 2로 나누는 이유"
    },
    {
      "id": "nights-compare",
      "type": "comparison",
      "title": "각 숙박지는 한 가지 역할을 합니다",
      "columns": [
        {
          "heading": "우링위안 · 3박",
          "body": "한 번 체크인한 뒤 두 번의 공원 종일 일정을 사이에 둡니다. 숲을 보는 날마다 체크아웃하지 않아도 됩니다."
        },
        {
          "heading": "푸룽전 · 1박",
          "body": "수하물과 함께 도착해 폭포 마을과 저녁을 봅니다. 당일 경유만 하면 여유로운 야간 시간이 사라집니다."
        },
        {
          "heading": "펑황 · 2박",
          "body": "D5에는 가이드와 도착하고 D6에는 체크아웃 없이 강변·골목·선택형 유료 장소를 자유롭게 둘러봅니다."
        }
      ]
    },
    {
      "id": "furong-figure",
      "type": "figure",
      "src": "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/furong-waterfall-1280.webp",
      "alt": "폭포와 강 옆에 자리한 푸룽전 건물",
      "width": 1280,
      "height": 742,
      "caption": "1박을 해야 푸룽전이 급한 사진 경유지가 아닌 실제 숙박지가 됩니다."
    },
    {
      "id": "days-heading",
      "type": "heading",
      "level": 2,
      "text": "7일 동안 어디까지 이동하나요?"
    },
    {
      "id": "days-table",
      "type": "table",
      "caption": "여행 순서, 숙박지와 서비스 범위",
      "columns": [
        "일자",
        "이동과 숙박",
        "제공 내용"
      ],
      "rows": [
        [
          "D1",
          "장자제 도착; 우링위안 1박째",
          "확정된 장자제 공항 또는 기차역에서 기사 픽업. 가이드는 없습니다."
        ],
        [
          "D2",
          "우링위안 2박째",
          "가이드와 확정된 국가삼림공원 산악 구간을 관광합니다."
        ],
        [
          "D3",
          "우링위안 3박째",
          "가이드와 십리화랑·금편계 확정 구간을 보고 칠십이기루 일반 야간 관람을 합니다."
        ],
        [
          "D4",
          "푸룽전 이동; 1박",
          "가이드와 전용 차량이 여행자·수하물과 함께 이동합니다."
        ],
        [
          "D5",
          "펑황 이동; 1박째",
          "가이드·전용 차량으로 도착한 뒤 공공 골목과 퉈장 강변을 둘러봅니다."
        ],
        [
          "D6",
          "펑황 2박째",
          "기본 상품에는 차량과 가이드가 없는 자유 일정입니다."
        ],
        [
          "D7",
          "펑황 출발",
          "기사만 동행하는 전용 차량으로 펑황고성역까지 이동합니다. 장자제 귀환은 사전 서면 확인이 필요합니다."
        ]
      ]
    },
    {
      "id": "luggage-heading",
      "type": "heading",
      "level": 2,
      "text": "수하물과 호텔 문 앞까지 일정에 넣으세요"
    },
    {
      "id": "luggage-copy",
      "type": "paragraph",
      "text": "여러 숙박지를 잇는 여행에서는 명소보다 체크아웃, 차량, 다음 호텔, 다음 관광 시간 사이가 더 어렵습니다. D4와 D5에는 큰 수하물을 전용 차량에 싣고 이동하세요. 결제 전에 각 숙소의 외국인 투숙 가능 여부, 객실과 침대 구성을 확인해야 합니다. 푸룽전역은 관광지 입구가 아니고 펑황고성역도 고성 보행 구역 안에 있지 않습니다. 어느 역이든 마지막 지상 이동이 남습니다."
    },
    {
      "id": "pace-heading",
      "type": "heading",
      "level": 2,
      "text": "이 7일 일정은 누구에게 맞을까요?"
    },
    {
      "id": "pace-compare",
      "type": "comparison",
      "columns": [
        {
          "heading": "잘 맞는 경우",
          "items": [
            "장자제와 두 고성을 한 번에 보되 되돌아가고 싶지 않습니다.",
            "우링위안에 종일 일정 두 번을 주고 싶습니다.",
            "호텔을 두 번 옮길 때 수하물을 전용 차량에 싣고 싶습니다.",
            "펑황에서 일정표 없는 하루가 필요합니다."
          ]
        },
        {
          "heading": "다시 짜야 하는 경우",
          "items": [
            "장자제만 보고 싶다면 4일 일정이 더 직접적입니다.",
            "동행자가 숙박지 변경을 힘들어합니다.",
            "확정된 다음 항공편이 장자제에서 출발합니다.",
            "펑황 자유일에도 가이드나 차량이 필요합니다. 서면으로 추가해야 합니다."
          ]
        }
      ]
    },
    {
      "id": "faq",
      "type": "faq",
      "title": "예약 전 자주 묻는 질문",
      "items": [
        {
          "question": "장자제에서 푸룽전과 펑황 중 어디를 먼저 가나요?",
          "answer": "푸룽전을 먼저, 펑황을 다음에 갑니다. 두 곳은 후난성 서부의 같은 교통축에 이 순서로 있어 장자제로 되돌아갈 필요가 없습니다. 이미 산 항공권이나 열차표가 최종 출발점을 바꾼다면 그 표를 기준으로 순서를 다시 짜세요."
        },
        {
          "question": "푸룽전 1박이면 충분한가요?",
          "answer": "이 일정의 목적에는 충분합니다. 수하물과 함께 도착해 기본 입장권으로 관람할 수 있는 구역을 둘러보고 저녁 시간을 보낸 뒤 다음 날 펑황으로 이동합니다. 푸룽전 자체가 핵심 관심지일 때만 1박을 더하세요."
        },
        {
          "question": "세 지역 사이를 열차로 이동하나요?",
          "answer": "공개된 Homeground 7일 일정은 열차를 이용하지 않습니다. 지역 간 이동은 전용 차량입니다. 열차로 바꾸려면 최종 일정에 명시하고 요금을 다시 확인해야 합니다."
        },
        {
          "question": "D7 이후 승차권은 어느 역으로 사야 하나요?",
          "answer": "기본 하차 지점은 펑황고성역(凤凰古城站)입니다. 최종 일정에서 역과 이동 시간을 확인한 뒤 표를 사세요. 장자제 귀환은 별도 이동과 견적입니다."
        }
      ]
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "일정을 보거나 각 결정을 더 확인하세요",
      "items": [
        {
          "label": "장자제·푸룽전·펑황 6박 7일 프라이빗 투어",
          "href": "/ko/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/",
          "description": "일자별 서비스, 숙박 구성, 포함 입장권과 공개 가격을 확인하세요."
        },
        {
          "label": "정확한 도착·출발 공항과 역 고르기",
          "href": "/ko/guides/zhangjiajie-arrival-departure-stations/",
          "description": "교통 거점, 호텔 주소와 마지막 교통편을 연결하세요."
        },
        {
          "label": "연세 있는 분과 장자제 계획하기",
          "href": "/ko/guides/zhangjiajie-older-travellers/",
          "description": "공원 일정을 확정하기 전에 도보·계단·대기·승하차를 확인하세요."
        },
        {
          "label": "『변성』 독자를 위한 펑황·차둥 선택",
          "href": "/ko/guides/border-town-fenghuang-chadong-shen-congwen/",
          "description": "펑황의 작가 생애와 차둥의 문학 지리를 구분합니다."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 여행 순서 자료",
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
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
