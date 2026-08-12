import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "리예 진간은 제국을 현 단위에서 보이게 합니다. 문서가 이동하고 곡물을 계산하며 관리가 보고합니다. 일상 기록이라 강력하지만 한 기록군이 진의 모든 지역과 시기를 대표하지 않습니다."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "제국보다 기록군 먼저",
      "body": "첸링현 문서의 유형, 발신자, 수신자, 행위를 확인한 뒤 행정 관행을 판단하고 더 큰 제도로 확장합니다.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "제국보다 기록군 먼저",
      "columns": [
        "단서",
        "행위",
        "한계"
      ],
      "rows": [
        [
          "발송 표시",
          "도착 추적",
          "한 경로가 전체망은 아님"
        ],
        [
          "장부",
          "곡물·물자 계산",
          "수치가 일부일 수 있음"
        ],
        [
          "관직·지명",
          "기관 관계",
          "명칭은 변함"
        ],
        [
          "수정",
          "실무 문서",
          "한 서리가 전부는 아님"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "유물명과 번호를 적습니다.",
        "기관 전사를 씁니다.",
        "날짜·장소·관청·동사를 찾습니다.",
        "좁은 행위만 말합니다.",
        "‘이 시기 이 장소’를 붙입니다."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "파일명이 학술 식별은 아닙니다",
      "body": "대표 이미지 파일명은 ‘Qing’이라 쓰지만 분류와 전시는 리예 진간으로 확인하며 본문은 기관 식별을 따릅니다.",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "날짜와 장소를 보내면 현지 담당자가 현재 운영·전시·프로그램을 확인합니다.",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "여행 이어가기",
      "items": [
        {
          "label": "광저우 아침 차 이해",
          "href": "/ko/guides/how-guangzhou-morning-tea-works/"
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
          "label": "Story of a Small Town: Qin bamboo slips from Liye",
          "url": "https://en.chnmuseum.cn/exhibition/traveling_exhibitions/202104/t20210429_249982.html",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Liye Qin Slips Museum context",
          "url": "https://www.enghunan.gov.cn/hneng/Services/Live/Community/LMEH/202510/t20251030_33836965.html",
          "publisher": "Hunan Provincial Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Liye Qin Slips by Ddayzzz, CC BY 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Liye_Qing_Slips,_containing_%22A_set_of_envelopes_were_delivered_from_Dongting_Commandery_to_Qianling_county%22.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

