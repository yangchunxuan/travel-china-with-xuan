import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "중국 전체에 하나뿐인 최적 날씨의 달은 없습니다. 한 여행에서 습한 아열대 도시, 건조한 북부 내륙과 고지대를 모두 지날 수 있습니다. 날씨가 경험을 가장 크게 제한하는 곳을 먼저 정하고 나머지가 같은 날짜에 완벽한지가 아니라 받아들일 만한지 확인하세요."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "평균 하나가 아닌 세 층",
      "columns": [
        {
          "heading": "지역 기후",
          "body": "위도와 계절풍이 더위, 비와 계절 전환을 만듭니다."
        },
        {
          "heading": "고도",
          "body": "지도상 가까워도 온도와 회복 요구가 달라집니다."
        },
        {
          "heading": "여행 활동",
          "body": "박물관과 산악 여행은 날씨 허용 범위가 다릅니다."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "공식 기후 분류는 지역별 계획을 뒷받침합니다"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "중국기상국 자료는 계절풍, 위도와 지형으로 다양한 기후가 형성된다고 설명합니다. 장기 기후는 동선 검사에 유용하지만 예보가 아닙니다. 여행 직전 공식 예보를 확인하세요."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "가장 민감한 노출로 검사",
      "columns": [
        "요소",
        "질문",
        "대응"
      ],
      "rows": [
        [
          "야외 경관",
          "비, 더위, 추위, 시야가 핵심 가치를 없애는가?",
          "이곳에 날짜 우선권을 줍니다."
        ],
        [
          "고지대 연장",
          "추위와 느린 회복을 감당할 수 있는가?",
          "유연성을 지키고 고정 이동을 겹치지 않습니다."
        ],
        [
          "대도시 혼합 활동",
          "가치 있는 실내 대안이 있는가?",
          "날씨에 강한 구간으로 둡니다."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "기후는 예보가 아닙니다",
      "body": "장기 패턴은 특정 주의 비, 시야, 온도를 보장하지 않습니다. 출발 전 공식 예보와 운영 공지를 다시 보세요."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "혼합 동선 날짜 고르기"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "날씨에 가장 취약한 경험을 적습니다.",
        "각 장소의 기후와 고도를 표시합니다.",
        "가장 어려운 곳을 지키는 기간을 찾습니다.",
        "다른 곳이 받아들일 만한지 봅니다.",
        "공휴일과 기후 결정을 분리합니다."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "모든 곳에 맞는 달이 없을 때"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "전국적으로 완벽한 달을 주장하기보다 기후가 가장 다른 곳을 빼거나 활동을 바꾸세요. 모든 장소가 절정일 필요는 없습니다."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "도시×월 색인을 만들지 않습니다",
      "body": "예보 페이지나 도시×월 URL을 만들지 않습니다. 특정 날짜는 최신 공식 자료가 필요합니다."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "기후로 동선을 검토받고 싶나요?",
      "body": "날짜, 인원, 예산, 도시와 가장 지키고 싶은 야외 경험을 남겨 주세요."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "다음 계획",
      "items": [
        {
          "label": "10월 시기 결정",
          "href": "/ko/guides/china-in-october-golden-week-or-later/",
          "description": "국경절과 10월 중하순의 지역 날씨를 비교하세요."
        },
        {
          "label": "공식 공휴일 달력 확인",
          "href": "/ko/guides/china-public-holidays-travel-calendar/",
          "description": "기후가 좋아도 공휴일 영향은 남습니다."
        },
        {
          "label": "숄더 시즌 가치 비교",
          "href": "/ko/guides/china-shoulder-season-value-tradeoff/",
          "description": "기후 검사 뒤 가격, 일조, 운영 제한을 더하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "중국 기후 유형과 특징",
          "url": "https://www.cma.gov.cn/2011xzt/2017zt/20170720/2017072004/201707200101/202111/t20211103_4148108.html",
          "publisher": "China Meteorological Administration",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "중국 기후 개요",
          "url": "https://www.cma.gov.cn/2011xzt/2012zhuant/20120302/2012030205/201203020501/201103/t20110314_3096052.html",
          "publisher": "China Meteorological Administration",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
