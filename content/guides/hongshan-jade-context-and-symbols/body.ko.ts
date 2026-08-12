import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "훙산 옥기는 윤곽만으로 설명할 때 가장 쉽게 오해됩니다. 형태도 중요하지만 출토지, 무덤 속 위치, 공반 유물, 박물관이 표시한 확실성의 정도가 더 중요합니다."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "증거에서 바깥으로 읽기",
      "body": "라벨과 출처, 재료와 형태, 고고학적 맥락의 순서로 봅니다. ‘옥저룡’ 같은 현대 명칭과 큰 상징은 마지막에 둡니다.",
      "tone": "decision"
    },
    {
      "id": "passes-heading",
      "type": "heading",
      "level": 2,
      "text": "한 유물을 네 번 읽기"
    },
    {
      "id": "passes",
      "type": "table",
      "caption": "한 유물을 네 번 읽기",
      "columns": [
        "단계",
        "확인",
        "뒷받침 범위"
      ],
      "rows": [
        [
          "정체",
          "명칭·연대·출토지·번호",
          "기관의 귀속"
        ],
        [
          "형태",
          "구멍·곡선·연마",
          "보거나 거는 방식"
        ],
        [
          "맥락",
          "무덤·인체 위치·공반품",
          "매장과 사회 차이의 제한적 주장"
        ],
        [
          "비교",
          "출토 기록이 확실한 유사품",
          "반복 양상, 고정 의미는 아님"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "완전한 라벨을 먼저 기록합니다.",
        "발굴·수집·기증·출토지 미상 여부를 봅니다.",
        "해설 전에 보이는 특징을 적습니다.",
        "맥락이 다른 유물을 비교합니다.",
        "답 없는 질문을 남깁니다."
      ]
    },
    {
      "id": "status",
      "type": "callout",
      "title": "잠정목록은 등재가 아닙니다",
      "body": "UNESCO 페이지는 중국의 2013년 세계유산 잠정목록 제출 자료입니다. 세계유산 등재가 아니며 가치 설명은 제출국의 논증입니다.",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "박물관과 관심 분야를 Homeground에 알려 주세요. 현지 담당자가 현재 라벨이 있는 유물 중심으로 근거 있는 동선을 짭니다.",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "중국 문화를 신중하게 읽기",
      "items": [
        {
          "label": "쑤저우 정원 읽기",
          "href": "/ko/guides/how-to-read-a-suzhou-garden/"
        },
        {
          "label": "병마용 자유 관람",
          "href": "/ko/guides/terracotta-warriors-without-tour/"
        },
        {
          "label": "중국 여행에 가이드가 필요할까",
          "href": "/ko/guides/do-you-need-a-tour-guide-in-china/"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "기관 자료와 이미지 크레디트",
      "items": [
        {
          "label": "Sites of Hongshan Culture tentative-list entry",
          "url": "https://whc.unesco.org/en/tentativelists/5804/",
          "publisher": "UNESCO World Heritage Centre",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hongshan culture exhibition",
          "url": "https://en.chnmuseum.cn/exhibition/exhibition_series/temporary_exhibitions/selected_historical_artifacts_exhibitions/202010/t20201016_247873.html",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Hongshan Jade Dragon 2 by Gary Todd, CC0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Hongshan_Jade_Dragon_2.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

