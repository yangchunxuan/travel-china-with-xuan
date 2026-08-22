import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "여러 방향을 보는 첫 다리 여행에는 다리고성이 가장 안정적입니다. 늦은 열차, 이른 출발, 도시 서비스나 얼하이 남쪽 일정이 반복되면 샤관이 낫습니다. 느린 호숫가 아침과 저녁 자체가 여행의 핵심일 때만 정확한 마을 이름과 도로 접근을 기준으로 얼하이 마을을 고르세요."
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "짧은 결론",
      "tone": "decision",
      "body": "창산, 고성 저녁과 여러 방향의 당일 일정이 있는 짧은 첫 여행에는 고성, 철도·도시 인계나 실용적인 업무가 이틀 이상 영향을 주면 샤관에 묵습니다. 숙소와 마을 자체가 휴가이고 식사와 이동이 해결되며 즉흥 선택이 적어도 괜찮다면 이름 있는 얼하이 마을을 고릅니다. ‘얼하이 오션뷰’ 문구만 보고 결제하지 마세요."
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "마을 순위, 호텔 목록, 유람선 가이드가 아니며 호수 전망을 보장하지 않습니다. 도로 접근, 생태회랑 규칙, 호출차 공급, 가격·재고도 고정하지 않습니다. 고성, 샤관과 동·서·북안의 여러 마을은 서로 바꿔 쓸 수 없는 다른 장소입니다."
    },
    {
      "id": "decision-matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "숙박의 두 부분을 개선하는 거점을 고르세요"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "경관 주소는 마지막 이동 비용을 두 번 이상 보상해야 합니다",
      "columns": [
        "판단 입력",
        "고성",
        "샤관",
        "정확한 얼하이 마을",
        "필요한 증거"
      ],
      "rows": [
        [
          "첫 혼합 여행",
          "가장 강한 기본값",
          "실용적이나 유산 중심은 약함",
          "호숫가 체류가 주목적일 때",
          "반복 이점 두 가지"
        ],
        [
          "철도 도착·출발",
          "도시에서 고성 이동 추가",
          "도시 인계를 가장 잘 보호",
          "농촌 구간 추가",
          "표·프런트·짐 인계"
        ],
        [
          "창산·고성 저녁",
          "가장 자연스러움",
          "왕복 필요",
          "마을이 어느 호안인지에 크게 좌우",
          "실제 출발·귀환 지점"
        ],
        [
          "느린 호수 시간",
          "호숫가 이동 필요",
          "얼하이공원·남쪽 접근 가능",
          "문 앞 경험 확인 시 가장 강함",
          "실제 전망·공공 경로·우천 계획"
        ],
        [
          "식사·계획 변경",
          "즉흥 대안 가장 넓음",
          "도시 대안 강함",
          "숙소 의존 가능",
          "아침·저녁·유인 시간·합법 차량"
        ],
        [
          "이동·짐",
          "고성 포장·골목이 다름",
          "도로변 도시 숙소가 단순할 수 있음",
          "마지막 구간이 전부를 지배",
          "차량부터 객실까지 사진·치수"
        ]
      ]
    },
    {
      "id": "option-1-heading",
      "type": "heading",
      "level": 2,
      "text": "고성: 오래 버티는 첫 여행 거점"
    },
    {
      "id": "option-1-analysis",
      "type": "paragraph",
      "text": "당일 여행 뒤에도 다리다운 저녁을 이어 가고 여러 방향의 일정에 대응하기 좋습니다. 한 장의 호수 사진 때문에 먼 호안에 묵는 것보다 안정적입니다. 하지만 보행로, 포장, 중정 문턱과 위층 객실 때문에 중심 숙소가 어려울 수 있습니다. 조용한 도로 가장자리를 우선 보고 차량 하차와 투숙객 입구를 따로 확인하세요."
    },
    {
      "id": "option-2-heading",
      "type": "heading",
      "level": 2,
      "text": "샤관: 도시 기능을 장점으로 사용"
    },
    {
      "id": "option-2-analysis",
      "type": "paragraph",
      "text": "다리의 실용적인 도시 쪽이자 철도 도착 맥락입니다. 짧은 업무, 병원·행정, 남쪽 호수 일정, 위험한 열차 연결이나 유인 서비스를 중시한다면 타협이 아니라 완전한 거점이 됩니다. 얼하이공원처럼 호수와 도시 물류가 공존하기도 합니다. 모든 관광일이 고성에서 시작한다면 북쪽이나 서쪽으로 반복 이동하는 비용이 생깁니다."
    },
    {
      "id": "option-3-heading",
      "type": "heading",
      "level": 2,
      "text": "얼하이 마을: 마을 이름이 곧 결정"
    },
    {
      "id": "option-3-analysis",
      "type": "paragraph",
      "text": "룽칸, 차이춘, 시저우 인근, 솽랑, 와써와 하이둥은 마지막 구간과 고성 관계가 서로 다릅니다. 호숫가라는 표기는 일정과 반대 호안, 차량이 문까지 못 가는 길, 해진 뒤 저녁이 없는 숙소를 숨길 수 있습니다. 중국어 마을명, 입구, 공공 경로, 차량, 식사, 계단과 악천후 하루가 함께 맞아야 합니다."
    },
    {
      "id": "trip-pivot",
      "type": "callout",
      "title": "‘얼하이 옆’은 풍경이지 통근 설명이 아닙니다",
      "tone": "neutral",
      "body": "호수는 크고 각 호안의 역할이 다릅니다. 정확한 숙소 문에서 반복 장소 두 곳까지 측정하세요. 이점이 일출 한 번이나 카페 하나뿐이면 방문만 하고, 아침·휴식·저녁이 모두 좋아질 때 숙박합니다."
    },
    {
      "id": "execution-heading",
      "type": "heading",
      "level": 2,
      "text": "지역명을 다리 도착 동선으로 바꾸기"
    },
    {
      "id": "execution-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "모든 예약 도착·출발의 전체 역·공항명과 예상 출구 시간을 적습니다.",
        "고성 저녁, 창산 출발, 도시 약속, 호수 아침 중 반복 경험 두 개를 고릅니다.",
        "마을 후보는 중국어 마을명, 호안, 핀과 차량 입구를 기록합니다.",
        "일반 합법 차량이 문까지 가는지, 짐 인계와 밤·비 상황을 묻습니다.",
        "프런트, 아침·저녁 식사, 계단·엘리베이터, 욕실, 냉난방과 객실 전망을 따로 확인합니다.",
        "농촌 동선 확인 전까지 취소 조건과 고성·샤관 도로변 대안을 유지합니다.",
        "여행 직전 공식 도로·생태 공지와 숙소 인계를 다시 확인합니다."
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "다리 지리가 한 핀으로 압축됐을 때"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "잘못된 호안 하나가 하루를 먹지 않게 합니다",
      "columns": [
        "문제",
        "즉시 대응",
        "다음 결정"
      ],
      "rows": [
        [
          "얼하이 마을이 일정 반대 호안",
          "전체 중국어 주소로 예약 활동 재배치",
          "이틀 이상 손해면 낮에 한 번 이동"
        ],
        [
          "차량이 숙소 전에 멈춤",
          "안전한 이름 있는 지점에서 합의한 인계 요청",
          "짐을 안전하게 못 넘기면 도로변 변경"
        ],
        [
          "고성 숙소가 보행 골목 깊숙함",
          "숙소가 안내한 하차·짐 도움 사용",
          "전체 동선 불가면 외곽 입구로 변경"
        ],
        [
          "늦은 열차로 농촌 도착 불확실",
          "첫날은 샤관 유인 숙소",
          "낮에 마을 이동"
        ],
        [
          "비로 마을의 유일한 목적 소멸",
          "확인된 실내·식사 계획 사용",
          "숙소 자체가 하루를 못 받치면 고성·샤관 복귀"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "얼하이 주변에서 보장할 수 없는 것",
      "tone": "warning",
      "body": "마을 라벨은 공공 호숫가, 막힘없는 전망, 차량 접근, 호출차, 생태회랑 진입, 자전거, 식사, 정숙, 난방, 무단차, 외국인 등록, 가격·재고를 보장하지 않습니다. 오래된 경로 글보다 현재 당국과 숙소 확인이 우선입니다."
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "다음 단계: 마을을 한 줄로 쓰기",
      "tone": "decision",
      "body": "정확한 마을·호안·도착 문·저녁·악천후 계획을 한 줄로 설명할 수 없다면 고성이나 샤관을 고르세요. 설명할 수 있고 아침·휴식·저녁이 모두 좋아지면 마을 후보를 남겨 서면 확인합니다."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "다리 계획 이어가기",
      "items": [
        {
          "label": "중국 숙소 결정 모아보기",
          "href": "/ko/stay/",
          "description": "호텔 순위가 아닌 숙소 의사결정 모음으로 돌아갑니다."
        },
        {
          "label": "다리역–고성 이동",
          "href": "/ko/guides/dali-station-to-old-town/",
          "description": "숙박 거점을 고른 뒤 도착 이동을 실행합니다."
        },
        {
          "label": "윈난 노선 순서 정하기",
          "href": "/ko/guides/kunming-dali-lijiang-shangri-la-route-order/",
          "description": "전체 윈난 여행에서 다리의 위치를 먼저 정합니다."
        },
        {
          "label": "민수·홈스테이·호텔 고르기",
          "href": "/ko/guides/minsu-homestay-or-hotel-china/",
          "description": "숙소 형태와 동네·경관 거점 선택을 분리합니다."
        },
        {
          "label": "접근 가능한 객실 검증하기",
          "href": "/ko/guides/china-accessible-hotel-room-verification/",
          "description": "하차 지점부터 객실·욕실까지 이어지는 동선을 검증합니다."
        },
        {
          "label": "외국인 숙박 등록 확인",
          "href": "/ko/guides/foreigners-china-hotel/",
          "description": "고성 골목이나 얼하이 마을 게스트하우스를 예약하기 전 여권 등록과 입실 거절 복구를 따로 확인하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "다리 공식·유산·이미지 출처",
      "items": [
        {
          "label": "다리주 정부 얼하이 안내",
          "url": "https://www.dali.gov.cn/dlzrmzf/c101724/pc/content/1968886945315655680/content_1968886945315655680.html",
          "publisher": "다리바이족자치주 인민정부",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "다리고성 공식 교통 안내",
          "url": "https://www.dali.gov.cn/dlzrmzf/c101724/pc/content/1968887474976559104/content_1968887474976559104.html",
          "publisher": "다리바이족자치주 인민정부",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "다리시 제14차 5개년 발전계획",
          "url": "https://www.dali.gov.cn/dlzrmzf/c108766/1970410101620707328/mMMWXstz.pdf",
          "publisher": "다리시 인민정부",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "창산·얼하이 세계유산 잠정목록 자료",
          "url": "https://whc.unesco.org/en/tentativelists/1634/",
          "publisher": "유네스코 세계유산센터",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "대표 이미지: Ngguls의 얼하이공원 사진, CC BY-SA 4.0",
          "url": "https://commons.wikimedia.org/wiki/File:20260223_Erhai_Park_in_Dali,_Yunnan.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
