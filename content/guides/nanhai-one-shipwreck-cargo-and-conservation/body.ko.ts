import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "난하이 1호는 난파선 유적이자 화물·선상생활의 조합이며 계속되는 보존 사업입니다. ‘보물 개수’는 역사 증거의 관계를 가립니다."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "숫자보다 관계 읽기",
      "body": "발견과 일괄 인양을 선체 위치, 화물군, 개인 물품, 보존 과정과 연결하고 모든 총계에 날짜를 붙입니다.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "숫자보다 관계 읽기",
      "columns": [
        "층위",
        "질문",
        "추론 금지"
      ],
      "rows": [
        [
          "선체",
          "어떤 구조·공간 관계가 남았나?",
          "완전한 배가 멈춰 있음"
        ],
        [
          "화물",
          "도자·금속·물자가 어떻게 함께 있나?",
          "목적지가 모두 같음"
        ],
        [
          "사람",
          "생활·작업 물품은 무엇인가?",
          "근거 없이 신원 확인"
        ],
        [
          "보존",
          "지금 무엇을 처리·관찰하나?",
          "상태가 영구 고정"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "현재 전시 공지를 읽습니다.",
        "선체와 보존 공간을 찾습니다.",
        "화물을 위치로 비교합니다.",
        "교역품·장비·개인품을 구분합니다.",
        "총계의 발표일을 확인합니다."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "보존은 동적입니다",
      "body": "발굴, 탈염, 안정화, 연구, 전시는 변합니다. 2019년 수치는 역사 기록이지 현재 총계가 아닙니다.",
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
          "label": "Nanhai No. 1 Maritime Silk Road Museum",
          "url": "https://www.yangjiang.gov.cn/yjsywb/tourism/nanhaino1maritimesilkroadmuseum/",
          "publisher": "Yangjiang Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Nanhai No. 1 exhibition and research",
          "url": "https://www.gdmuseum.com/cn/col48/15353",
          "publisher": "Guangdong Museum",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Maritime Silk Road Museum by WKDx417, CC BY-SA 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Maritime_Silk_Road_Museum_of_Guangdong.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

