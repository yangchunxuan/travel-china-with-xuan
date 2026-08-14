import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "청명상하원(Qingming Riverside Landscape Garden)은 청명상하도를 걸으며 체험하는 연출 공간과 공연을 원한다면 입장료를 낼 가치가 있습니다. 다만 북송 카이펑이 그대로 남은 곳은 아닙니다. 그림은 화가가 선별한 이동과 상업 활동을 기록하고, 현대 공원은 그 모티프를 오락 공간으로 바꾸며, 저우차오(州桥)는 역사적 교차점의 물질적 증거를 제공합니다. 세 가지를 함께 읽되 서로의 증거로 대신 쓰지 마세요. 이 글은 3~4시간 공원 동선, 물질 증거 중심 대안, 공연이나 유적 공개가 바뀔 때의 대체 동선을 제시합니다.",
    },
    {
      id: "names-heading",
      type: "heading",
      level: 2,
      text: "Millennium City Park는 그림 속 송대 도시인가요?",
    },
    {
      id: "names-paragraph",
      type: "paragraph",
      text:
        "아닙니다. Qingming Riverside Landscape Garden, Millennium City Park, Qingming Shanghe Garden은 모두 카이펑의 같은 명소, 중국어 청명상하원(Qingming Shanghe Yuan)을 가리킵니다. 1998년 개장한 이곳은 장쩌돤의 《청명상하도》(영문명 Along the River During the Qingming Festival)에서 영감을 받은 현대 테마파크입니다. 건축물은 온전히 보존된 북송 구역이 아니며 그림도 시공 도면이 아닙니다. 공원의 가치는 물길, 다리, 성문, 거리의 규모를 걸으며 이해하는 데 있습니다. 현존 유적이 아니라 현대의 해석 공간으로 보세요.",
    },
    {
      id: "evidence-layers",
      type: "table",
      caption: "카이펑을 둘러볼 때 분리해 두어야 할 네 가지 층위",
      columns: ["층위", "확인할 수 있는 것", "확인할 수 없는 것"],
      rows: [
        [
          "역사와 고고학",
          "저우차오의 원래 위치, 재료, 축조 단계, 지하 도시 관계.",
          "완전한 거리 풍경이나 사라진 모든 건물.",
        ],
        [
          "미술 작품으로서의 그림",
          "장쩌돤이 긴 두루마리에서 선택하고 배열한 것.",
          "필지별 측량도나 모든 건물의 논쟁 없는 좌표.",
        ],
        [
          "현대 관광 연출",
          "공원이 모티프를 공간·공연·서비스로 바꾸는 방식.",
          "테마 건축물이 현존 원물이거나 인증된 일대일 복원이라는 주장.",
        ],
        [
          "Homeground의 여행 계획 판단",
          "어떤 순서가 질문에 답하고 변화가 생기면 어떻게 조정할지.",
          "새로운 역사 사실이나 개방 보장.",
        ],
      ],
    },
    {
      id: "short-answer",
      type: "callout",
      title: "바로 답하면",
      body:
        "공간형 스토리텔링, 공연, 가족 친화적 해석을 원하면 공원을 선택하세요. 원래 위치, 지층, 유물이 더 중요하면 공개가 확인된 저우차오나 카이펑박물관을 선택하세요. 시간이 충분하다면 공원에서 질문을 얻고 물질적 증거로 역사적 주장의 범위를 제한하세요.",
      tone: "decision",
    },
    {
      id: "scroll-heading",
      type: "heading",
      level: 2,
      text: "《청명상하도》가 실제로 증명할 수 있는 것은 무엇인가요?",
    },
    {
      id: "scroll-object",
      type: "paragraph",
      text:
        "고궁박물원은 이 작품을 북송 화가 장쩌돤이 비단에 그린 가로 두루마리로 기록하며, 크기는 24.8×528센티미터입니다. 공식 설명은 교외에서 변하(汴河)와 홍교를 지나 성문과 거리로 이어집니다. 배, 짐꾼, 수레, 동물, 상점은 화가가 선택한 장면을 기록합니다. 그러나 두루마리에는 하나의 고정 시점이 없습니다. 시선을 연속되고 압축된 장면으로 이끕니다. 고궁박물원 연구자 위후이는 화가가 카이펑의 여러 건축 유형과 사회생활을 종합하고 집중적으로 추려 구성했다고 설명합니다. 이는 출처가 있는 해석이지, 모든 세부를 상상으로 치부해도 된다는 뜻은 아닙니다.",
    },
    {
      id: "scroll-observation",
      type: "list",
      items: [
        "교외 풍경, 강과 다리, 성문과 빽빽한 거리 순으로 보세요. 현대 주소 하나를 찾는 것보다 유용합니다.",
        "그림 속 홍교에서 내려가는 돛대, 다리 군중, 위아래 교통을 보세요. 다리 초상이 아니라 도시 시스템입니다.",
        "직업, 운송 수단, 간판은 선택된 회화적 세부입니다. 모든 공원 의상이나 상점이 정확하다는 증거는 아닙니다.",
        "원본은 고궁박물원 소장품이지만 여행 날짜에 전시된다고 보장되지 않습니다. 공원 부조는 현대 복제품입니다.",
      ],
    },
    {
      id: "park-relief-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/park-scroll-relief-1280.webp",
      alt: "청명상하원에 있는 현대 부조에 그림 속 붐비는 홍교 장면이 표현된 모습.",
      width: 1280,
      height: 853,
      caption:
        "공원 부조는 두루마리의 다리 장면을 확대해 여러 사람이 볼 수 있게 합니다. 방향을 잡는 데는 유용하지만, 북송 유물도 고궁박물원 원본도 아닙니다. 사진: Gary Todd / Wikimedia Commons, CC0 1.0. 크기를 조정하고 WebP로 변환했습니다.",
    },
    {
      id: "scroll-boundary",
      type: "callout",
      title: "가로 두루마리를 지적도로 바꾸지 마세요",
      body:
        "연구자들은 작품의 장소, 계절, 목적을 두고 논의합니다. 신중하게 말할 수 있는 범위는 더 좁습니다. 구체적인 도시 관찰이 예술적 선택으로 배열됐다는 것입니다. 이동과 교역에 관한 질문은 던질 수 있지만, 그림 하나로 건물을 한 채씩 복원할 수는 없습니다.",
      tone: "warning",
    },
    {
      id: "bridges-heading",
      type: "heading",
      level: 2,
      text: "그림 속 홍교, 공원의 홍교, 저우차오는 왜 서로 다른 세 다리인가요?",
    },
    {
      id: "bridges-table",
      type: "table",
      caption: "세 다리, 세 종류의 증거",
      columns: ["다리", "무엇인가", "무엇을 물어볼 것인가"],
      rows: [
        [
          "그림 속 홍교",
          "장쩌돤의 구성 중심에 놓인 목조 아치형 다리. 고궁박물원은 상토교(上土桥)라고도 부릅니다.",
          "배, 내려진 돛대, 군중을 어떻게 조직했는가?",
        ],
        [
          "공원의 홍교",
          "그림 모티프를 방문객 동선으로 바꾼 현대 다리.",
          "오늘날 사람을 건너게 하고 장면을 입체화하는 방식은 무엇인가?",
        ],
        [
          "저우차오(州桥)",
          "어가(御街)와 변하가 만나는 지점의 교량 유적. 오늘날 중산로·자유로 교차로 남쪽에 있습니다.",
          "어떤 재료와 지층이 어느 시대에 속하는가?",
        ],
      ],
    },
    {
      id: "modern-hongqiao-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/modern-hongqiao-1280.webp",
      alt: "청명상하원 안의 물길을 가로지르는 현대식 붉은 홍교.",
      width: 1280,
      height: 853,
      caption:
        "공원의 홍교는 현대 방문객용 구조물입니다. 물 위로 사람을 건너게 하는 방식을 비교하되, 살아남은 북송 다리나 저우차오라고 설명해서는 안 됩니다. 사진: Windmemories / Wikimedia Commons, CC BY-SA 4.0. 크기를 조정하고 WebP로 변환한 파생물도 CC BY-SA 4.0입니다.",
    },
    {
      id: "bridge-reading",
      type: "paragraph",
      text:
        "두 기관 설명은 차이를 분명히 보여 줍니다. 고궁박물원은 그림의 다리를 홍교 또는 상토교라고 부르고, 허난성 고고학 기관은 저우차오를 어가 교차점에 놓습니다. 공원은 세 번째인 현대 홍교를 더합니다. 이는 공식 증거에 따른 편집적 판단이며 그림의 지리 논쟁이 모두 끝났다는 뜻은 아닙니다.",
    },
    {
      id: "zhouqiao-heading",
      type: "heading",
      level: 2,
      text: "저우차오 고고학은 공원이 줄 수 없는 무엇을 더하나요?",
    },
    {
      id: "zhouqiao-evidence",
      type: "paragraph",
      text:
        "저우차오는 원래 자리와 지층 관계를 보여 줍니다. 고고학자들은 어가와 변하의 교차점에 다리가 있었고, 여러 왕조에 걸쳐 사용되거나 다시 지어진 뒤 1642년 홍수 퇴적물에 묻혔다고 기록합니다. 2018년 이후 발굴로 하천, 교량, 호안 유구가 드러났습니다. 허난성 문물고고연구원은 북송 다리를 기둥과 보를 쓴 평교로 추정하지만 본체는 남아 있지 않습니다. 발굴된 주요 아치는 송대 기초 위에 세운 명 초기 구조입니다. 북송 석축 호안에는 파도 속 전설상의 해마·학·상서로운 구름이 새겨져 있습니다. 모든 것을 완전한 송대 다리라고 부르기보다 ‘어느 지층인가?’라고 물으세요.",
    },
    {
      id: "zhouqiao-observation",
      type: "list",
      items: [
        "남북 어가와 동서 변하가 만나는 지점을 찾으세요. 그림 속 홍교와 닮았는지보다 도시 위치가 중요합니다.",
        "안내판에서 시대와 재료를 확인하세요. 송대 기초 위의 명대 아치와 송대 호안은 관련됐지만 서로 다릅니다.",
        "강폭, 제방, 홍수 퇴적층을 보세요. 고고학은 여러 층을 통해 변화를 복원합니다.",
        "조각이 보이면 원래 자리에 있는 유물·이전된 유물·복제품 중 무엇인지, 보존 때문에 관람 거리가 제한되는지 확인하세요.",
      ],
    },
    {
      id: "zhouqiao-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/zhouqiao-excavation-1400.webp",
      alt: "보호 지붕 아래 드러난 카이펑 저우차오의 석조·벽돌 교량 유구, 운하 벽과 퇴적층.",
      width: 1400,
      height: 1050,
      caption:
        "노출된 교량 구조, 운하 벽과 퇴적층은 고고학 증거입니다. 눈에 보이는 다리는 송대 기초 위에 세운 명 초기 구조로, 사라진 북송 원래 다리가 아닙니다. 그림 속 홍교의 위치나 공원 다리의 정확성도 입증하지 못합니다. 2025년 사진 역시 현재 공개를 보장하지 않습니다. 사진: Yumeto / Wikimedia Commons, CC BY-SA 4.0. 크기를 조정하고 WebP로 변환한 파생물도 CC BY-SA 4.0입니다.",
    },
    {
      id: "zhouqiao-dynamic",
      type: "callout",
      title: "고고학 유적 관람이 보장된다고 생각하지 마세요",
      body:
        "발굴 보고서는 저우차오의 중요성을 입증하지만, 일반 입장·예약·티켓·외국 여권 처리에 관한 신뢰할 만한 2026년 절차는 확인되지 않았습니다. 운영·보호 기관에 문의하세요. 입장할 수 없으면 합법적인 공공 공간에 머물고 카이펑박물관에서 더 폭넓은 물질문화사를 보완하세요. 통제선을 넘지 마세요.",
      tone: "warning",
    },
    {
      id: "park-heading",
      type: "heading",
      level: 2,
      text: "현대 공원은 실제로 무엇을 지었나요?",
    },
    {
      id: "park-history",
      type: "paragraph",
      text:
        "룽팅구 정부 기록에 따르면 공원은 1998년 개장했고, 2005년 두 번째 단계에서 거리 경관이 내성·황실 정원 테마로 확장됐으며, 2023년 세 번째 단계에는 현대 놀이기구가 추가됐습니다. 이 역사는 두루마리를 한 번에 완전 복제한 공간이 아님을 보여 줍니다. 정부와 운영자가 쓰는 ‘1:1 복원’은 사업 소개 문구이지, 모든 평면·재료·입면이 그림과 같다는 고고학적 인증이 아닙니다.",
    },
    {
      id: "park-growth",
      type: "list",
      items: [
        "그림 유래: 부조, 홍교라는 이름, 두루마리에서 알아볼 수 있는 모티프.",
        "확장된 송대 도시 테마: 성문, 거리, 전각이 두루마리 하나를 넘어 연속성을 만듭니다.",
        "황실·오락 테마: 후속 단계의 궁궐 이미지, 놀이기구, 야간 상품은 테마파크 콘텐츠이지만 송대 원물은 아닙니다.",
        "운영: 상점, 무대, 서비스 동선은 오늘날 안전과 수용 규모를 위한 것이며 역사 증거가 아닙니다.",
      ],
    },
    {
      id: "linshui-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/linshui-hall-1280.webp",
      alt: "청명상하원 안 현대 임수대전 단지의 정면과 나란히 배치된 전각들.",
      width: 1280,
      height: 960,
      caption:
        "임수대전은 공원이 확장한 테마 경관에 속합니다. 이곳에서 명소가 두루마리 범위를 어떻게 넘어서는지 보되, 살아남은 송대 건축이나 그림 속 대상의 정확한 대응물이라고 주장하면 안 됩니다. 사진: Yumeto / Wikimedia Commons, CC BY-SA 4.0. 크기를 조정하고 WebP로 변환한 파생물도 CC BY-SA 4.0입니다.",
    },
    {
      id: "park-onsite-heading",
      type: "heading",
      level: 2,
      text: "모든 볼거리를 좇지 않고 현장에서 공원을 읽는 방법은 무엇인가요?",
    },
    {
      id: "park-route-intro",
      type: "paragraph",
      text:
        "공연 일정이 바뀌어도 유지되는 증거 동선을 쓰세요. 부조, 현대 홍교, 성문과 거리, 확장된 궁궐풍 경관 순입니다. 이차원 작품에서 걸을 수 있는 해석 공간을 거쳐 후대에 더해진 구역으로 이동합니다. 각 지점의 근거가 그림·다른 자료·현대 설계·운영 중 무엇인지 물으세요. 건물 이름만으로 복원 근거가 생기지는 않습니다.",
    },
    {
      id: "relief-stop-heading",
      type: "heading",
      level: 3,
      text: "첫 번째 지점: 공원 부조를 시각적 색인으로 활용하기",
    },
    {
      id: "relief-stop",
      type: "paragraph",
      text:
        "15~20분 동안 교외, 강, 도시, 중심 다리를 찾으세요. 가까이에서 차례로 펼쳐 보는 가로 두루마리가 공공 부조가 되면 함께 보기 쉬워지지만 순서·표면·펼쳐 보는 경험은 달라집니다. 내려진 돛대와 다리 군중처럼 세부 두 가지를 골라 나중에 추적하세요. 부조를 고궁박물원 원본이라고 표기하지 마세요.",
    },
    {
      id: "bridge-stop-heading",
      type: "heading",
      level: 3,
      text: "두 번째 지점: 현대 홍교에서 움직임 비교하기",
    },
    {
      id: "bridge-stop",
      type: "paragraph",
      text:
        "25~35분 동안 사람이 건너고 멈추는 모습을 본 뒤 물 쪽을 보세요. 그림은 충돌할 듯한 배, 눕혀지는 돛대와 구경꾼을 압축하지만 현대 다리는 안전한 통행을 관리합니다. 각각이 움직임을 조직하는 방식을 비교할 뿐, 윤곽으로 구조적 정확성을 증명하지 마세요. 붐비면 멈추지 말고 건넌 뒤 관람이 허용된 강변에서 보세요.",
    },
    {
      id: "gate-stop-heading",
      type: "heading",
      level: 3,
      text: "세 번째 지점: 상선문에서 명칭을 검증하기",
    },
    {
      id: "gate-stop",
      type: "paragraph",
      text:
        "고궁박물원 소장품 기록은 그림 속 성문을 동각자문(東角子門)이라 하고, 공원 건축물은 상선문(上善門)이라 합니다. 강에서 도시로 넘어가는 비슷한 기능이 둘을 동일하게 만들지는 않습니다. 안내된 근거를 읽고 입면과 상점이 오늘날 군중을 유도하는 방식을 보세요. ‘송대 양식’은 양식적 참조일 수 있으며, 현존하는 송대 목구조나 고고학적 복원과 같지 않습니다. 목구조 가이드를 이용하면 외형으로 연대를 추측하지 않고 구조를 물을 수 있습니다.",
    },
    {
      id: "shangshan-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/shangshan-gate-1280.webp",
      alt: "청명상하원 안 현대 상선문과 방문객 동선.",
      width: 1280,
      height: 853,
      caption:
        "상선문은 공원이 테마 도시 안쪽으로 넘어가는 전환을 만드는 데 쓰입니다. 그림 속 동각자문으로 이름을 바꾸거나 살아남은 북송 성문으로 소개해서는 안 됩니다. 사진: Windmemories / Wikimedia Commons, CC BY-SA 4.0. 크기를 조정하고 WebP로 변환한 파생물도 CC BY-SA 4.0입니다.",
    },
    {
      id: "extension-stop-heading",
      type: "heading",
      level: 3,
      text: "네 번째 지점: 공원이 의도적으로 그림 너머로 가는 곳 알아보기",
    },
    {
      id: "extension-stop",
      type: "paragraph",
      text:
        "궁궐풍·오락 구역이 궁금할 때만 약 30분을 쓰세요. 전각, 정원, 놀이기구는 공원이 더 넓은 ‘송대 수도’ 이야기로 확장됐음을 보여 줍니다. 모든 건물을 그림과 맞추지 말고 안내판의 출처와 오늘날 공연·통행을 위한 설계를 구분하세요. 그림 중심 여행자는 성문과 거리 뒤에 돌아가도 됩니다.",
    },
    {
      id: "performance-heading",
      type: "heading",
      level: 2,
      text: "공원 공연은 무엇을 가르칠 수 있고, 무엇을 절대 증명할 수 없나요?",
    },
    {
      id: "performance-paragraph",
      type: "paragraph",
      text:
        "공연은 갈등, 의상, 몸짓을 기억하게 하고 공원의 우선순위를 드러냅니다. 현 프로그램은 역사 인물 장면, 곡예, 무협, 첨단 기술 연출, 놀이기구, 야간 상품을 섞습니다. 현대 오락 시스템이지 북송 생활의 기록이 아닙니다. 관심 있는 형식 하나를 고르고, 현대 관객을 위해 무엇을 각색하거나 창작했는지, 공식 소개가 출처를 밝히는지 물으세요.",
    },
    {
      id: "performance-check",
      type: "list",
      items: [
        "오래된 블로그 시간표가 아니라 운영자의 최신 프로그램을 확인하세요.",
        "당일 공연장과 포함 여부를 확인하세요. 2026년 모든 티켓에 공통인 포함 규정은 확인되지 않았습니다.",
        "안내판이 근거를 제시하지 않으면 의상과 극 중 장면은 무대 해석으로 보세요.",
        "촬영 안내를 따르세요. 공개 공연이라고 해서 인물 클로즈업을 게시할 권한까지 생기는 것은 아닙니다.",
      ],
    },
    {
      id: "performance-dynamic",
      type: "callout",
      title: "공연이 취소돼도 작동하는 동선을 만드세요",
      body:
        "운영자는 날씨나 기타 상황으로 공연이 변경·취소될 수 있다고 알립니다. 선택한 공연이 취소돼도 부조—홍교—성문—확장 경관 순서를 계속하세요. 공간 비교에는 출연진이나 고정 시각이 필요하지 않습니다.",
      tone: "warning",
    },
    {
      id: "decision-heading",
      type: "heading",
      level: 2,
      text: "3~4시간 동선을 어떻게 짜고, 입장권은 누구에게 맞을까요?",
    },
    {
      id: "sequence",
      type: "list",
      ordered: true,
      items: [
        "방향 잡기, 15~20분: 그림의 흐름을 찾고 추적할 세부 두 가지를 고릅니다.",
        "홍교, 25~35분: 다리와 물의 움직임을 비교하고, 멈추면 방해될 때 강둑에서 봅니다.",
        "성문과 거리, 40~50분: 명칭을 검증하고 테마 상업 공간과 원래 유구 주장을 분리합니다.",
        "일정에 맞는 공연 1편: 당일 길이·장소·포함 여부를 확인하고 변경되면 건너뜁니다.",
        "확장 구역, 약 30분: 공원이 그림을 넘어서는 지점을 찾고 피곤하면 먼저 단축합니다.",
        "여유 시간, 30~45분: 줄, 날씨, 휴식에 대비합니다. 정말 원하는 최신 야간 상품이 있을 때만 밤까지 머뭅니다.",
      ],
    },
    {
      id: "visitor-scenarios",
      type: "comparison",
      title: "장소가 답해 주길 바라는 질문에 따라 선택하세요",
      columns: [
        {
          heading: "공원 우선 여행자",
          items: [
            "걸어서 이해하는 입문을 원하거나 어린이와 함께 여행합니다.",
            "무대형 상호작용을 즐기되 분위기와 증거를 분리합니다.",
            "공원 뒤에 박물관이나 공개가 확인된 저우차오를 더해 물질 증거로 해석을 보완하세요.",
          ],
        },
        {
          heading: "물질적 증거 우선 여행자",
          items: [
            "원래 위치, 유물, 건설 단계, 지층이 주된 관심사입니다.",
            "테마 건축과 큰 음향, 과장된 연출이 흥미를 낮춥니다.",
            "저우차오를 확인하거나 카이펑박물관에서 시작하세요. 공원을 건너뛰어도 송대 역사 전체를 놓치는 것은 아닙니다.",
          ],
        },
        {
          heading: "시간이 짧은 여행자",
          items: [
            "하나만 고르세요. 해석은 공원, 증거는 확인된 저우차오나 박물관입니다.",
            "세 곳을 모두 봤다는 표시를 남기려고 급하게 오가지 마세요.",
            "공개가 불확실하면 박물관 예약과 전시를 다시 확인해 대체 후보로 둡니다.",
          ],
        },
      ],
    },
    {
      id: "ticket-decision",
      type: "callout",
      title: "공원 입장권의 가치가 분명한 경우",
      body:
        "그림을 대규모 공간으로 옮긴 방식, 가족 친화적 공간, 공연을 원하는 사람에게 맞습니다. 원래 송대 물질만 찾거나 테마파크 소리와 상호작용을 피한다면 적합도가 낮습니다. 확인 가능한 2026년 공식 자료만으로는 하나의 신뢰할 만한 현재 가격, 외국 여권 처리 절차, 티켓별 포함 내역이나 주간·야간 상품 관계를 확인할 수 없었습니다. 결제 전 운영자의 최신 판매 채널을 확인하세요.",
      tone: "decision",
    },
    {
      id: "mistakes-heading",
      type: "heading",
      level: 2,
      text: "이 방문을 통해 절대 단정하면 안 되는 것은 무엇인가요?",
    },
    {
      id: "mistakes",
      type: "list",
      items: [
        "공원 건물은 이 자리에 북송 때부터 남아 있던 원물이 아닙니다.",
        "그림을 현재 공원과 건물별로 대응할 수 없습니다.",
        "그림 속 홍교, 공원의 현대 홍교, 저우차오는 서로 다른 세 다리입니다.",
        "송대 기초 위에 놓인 명 초기 아치는 온전한 송대 다리가 아닙니다. 추정되는 송대 교량 본체는 남아 있지 않습니다.",
        "공연은 북송 생활의 직접 증거가 아닙니다.",
        "카이펑에서 원작을 볼 수 있다고 기대하거나 고궁박물원에 현재 전시 중이라고 단정하지 마세요.",
      ],
    },
    {
      id: "photography-rights",
      type: "paragraph",
      text:
        "촬영 허가와 공개 게시 허가는 다릅니다. 현재 안내를 따르고 식별 가능한 출연자나 어린이를 주요 피사체로 삼기 전에 동의를 구하세요. 고궁박물원 웹 이미지는 공개 게시가 자동으로 허가되지 않으므로 이 글에는 해당 이미지를 싣지 않습니다. 직접 찍은 사진에는 날짜와 장소를 남기고 부조·복제품·후대 다리를 원물로 표기하지 마세요.",
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "공연이 취소되거나 저우차오를 볼 수 없거나 시간이 줄면 어떻게 하나요?",
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "변수가 생겨도 핵심 과업을 유지하는 대안",
      columns: ["변수", "대안", "하지 말아야 할 주장"],
      rows: [
        [
          "선택한 공연의 시간·장소가 바뀌거나 취소됨",
          "부조, 홍교, 성문·거리, 확장 구역 동선을 완성하고 다른 공연은 유용할 때만 고릅니다.",
          "공연 하나가 빠져도 공원의 해석 가치가 사라지지는 않습니다.",
        ],
        [
          "저우차오가 일반 관람객에게 공개되지 않음",
          "통제선 밖에 머물고, 합법적인 도시 맥락과 다시 확인한 카이펑박물관으로 더 넓은 역사를 봅니다.",
          "공원은 고고학을 대신하지 않으며 어떤 박물관 전시실도 보장되지 않습니다.",
        ],
        [
          "공원 홍교가 혼잡함",
          "멈추지 말고 건너 허용된 강둑에서 본 뒤 통행이 나아지면 돌아옵니다.",
          "사진을 위해 다리를 막거나 올라가지 마세요.",
        ],
        [
          "두 시간도 없음",
          "부조—홍교—성문 또는 공개가 확인된 증거 우선 장소 하나를 고릅니다.",
          "서로 다른 증거 유형 사이를 급히 오가지 마세요.",
        ],
        [
          "비나 더위로 체력이 떨어짐",
          "부조와 다리를 우선하고 허용된 곳에서 쉬며 후기 구역을 줄입니다.",
          "당일 운영·공연 공지를 따르세요.",
        ],
      ],
    },
    {
      id: "final-checklist",
      type: "list",
      items: [
        "결제 전: 공식 상품, 여권 처리, 포함 항목, 별도 야간 상품을 확인합니다.",
        "저우차오 방문 확정 전: 일반 공개, 예약, 관람 범위, 신분증을 확인합니다.",
        "출발 전: 당일 프로그램과 날씨 변동을 다시 보고 공연 없는 동선을 저장합니다.",
        "각 대상 앞에서: 고고학·미술 작품·관광 연출·여행 계획 판단 중 어느 층위인지 분류합니다.",
        "공유 전: 이미지 대상, 날짜, 장소, 허가를 확인합니다.",
      ],
    },
    {
      id: "consultation",
      type: "callout",
      title: "이 증거 중심 관람을 더 넓은 중국 여행에 넣고 싶나요?",
      body:
        "Homeground는 카이펑의 공원, 고고학 유적, 박물관이 여행 동선에 맞는지 판단하고 출발 직전에 변동 정보를 확인하도록 도울 수 있습니다. 상담은 미리 정한 상품이 아니라 관심사, 속도, 제약 조건에서 시작합니다.",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Homeground에서 계획을 이어가세요",
      items: [
        {
          label: "중국 성벽·성문과 도시 질서 읽기",
          href: "/ko/guides/chinese-city-walls-gates-and-urban-order/",
          description: "또 다른 도시 유적에서 물질적 증거, 복원, 도시 계획을 서로 다른 층위로 구분하세요.",
        },
        {
          label: "더우궁과 중국 목구조 읽는 법",
          href: "/ko/guides/dougong-and-chinese-timber-frame-reading/",
          description: "건물의 윤곽만 보고 연대를 정하지 않으면서 구조적 질문을 해 보세요.",
        },
        {
          label: "일상 도시사로 이해하는 대운하",
          href: "/ko/guides/grand-canal-everyday-urban-history/",
          description: "장식적인 운하 이미지보다 수로와 도시 시스템을 먼저 살펴보세요.",
        },
        {
          label: "중국 공휴일 여행 달력 확인하기",
          href: "/ko/guides/china-public-holidays-travel-calendar/",
          description: "연휴 전후의 혼잡과 명소 운영 변동을 다시 확인하세요.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "이 가이드를 위해 검토한 핵심 출처와 이미지 라이선스 기록",
      items: [
        {
          label: "장쩌돤 《청명상하도》 소장품 기록",
          url: "https://www.dpm.org.cn/collection/paint/228226.html",
          publisher: "고궁박물원",
          reviewedAt: "2026-08-14",
        },
        {
          label: "《청명상하도》 해석에 관한 고궁박물원 강연",
          url: "https://www.dpm.org.cn/forum_detail/99722.html",
          publisher: "고궁박물원",
          reviewedAt: "2026-08-14",
        },
        {
          label: "두루마리 그림의 미해결 쟁점에 관한 연구 논의",
          url: "https://www.dpm.org.cn/study_detail/100187.html",
          publisher: "고궁박물원",
          reviewedAt: "2026-08-14",
        },
        {
          label: "카이펑 저우차오 고고학 프로젝트 개요",
          url: "https://www.hnswwkgyjy.cn/NewsView.php?News_ID=1985",
          publisher: "허난성문물고고연구원",
          reviewedAt: "2026-08-14",
        },
        {
          label: "2020년 저우차오 발굴 기록",
          url: "https://hnswwkgyjy.cn/NewsView.php?News_ID=2051",
          publisher: "허난성문물고고연구원",
          reviewedAt: "2026-08-14",
        },
        {
          label: "카이펑 도시고고학의 진전과 시사점",
          url: "https://doi.org/10.1080/00438243.2024.2304336",
          publisher: "World Archaeology / Taylor & Francis",
          reviewedAt: "2026-08-14",
        },
        {
          label: "청명상하원 개발 개요",
          url: "http://www.longting.gov.cn/ltq/c00044/pc/content/content_2003660780649967616.html",
          publisher: "룽팅구 인민정부",
          reviewedAt: "2026-08-14",
        },
        {
          label: "현재 공원 건축물 안내",
          url: "https://www.qmsyun.com/Mobile_page/q_building.php",
          publisher: "청명상하원",
          reviewedAt: "2026-08-14",
        },
        {
          label: "현재 공원 프로그램과 변경 공지",
          url: "https://www.qmsyun.com/Mobile_page/o_program.php",
          publisher: "청명상하원",
          reviewedAt: "2026-08-14",
        },
        {
          label: "카이펑박물관 2026년 예약 시스템 변경 공지",
          url: "https://www.sina.cn/news/detail/5291280644969326.html",
          publisher: "카이펑박물관 인증 계정 / Sina",
          reviewedAt: "2026-08-14",
        },
        {
          label: "고궁박물원 이미지 이용 허가 신청",
          url: "https://digicol.dpm.org.cn/page/applyimage",
          publisher: "고궁박물원 디지털 컬렉션",
          reviewedAt: "2026-08-14",
        },
        {
          label: "고궁박물원 웹사이트 이용 약관",
          url: "https://www.dpm.org.cn/bottom/privacy/254.html",
          publisher: "고궁박물원",
          reviewedAt: "2026-08-14",
        },
        {
          label: "Millennium City Park 공식 영문 명칭 기록",
          url: "https://english.henan.gov.cn/2025/04-01/3143768.html",
          publisher: "허난성 인민정부",
          reviewedAt: "2026-08-14",
        },
        {
          label: "대표 이미지 출처와 CC0 기록",
          url: "https://commons.wikimedia.org/wiki/File:2014_Millennium_City_Park_with_Kaifeng_in_Background.jpg",
          publisher: "Gary Todd / Wikimedia Commons",
          reviewedAt: "2026-08-14",
        },
        {
          label: "공원 부조 사진 출처와 CC0 기록",
          url: "https://commons.wikimedia.org/wiki/File:2008_Zhang_Zeduan_Painting_Carved_in_Stone_a.jpg",
          publisher: "Gary Todd / Wikimedia Commons",
          reviewedAt: "2026-08-14",
        },
        {
          label: "공원 현대 홍교 사진과 라이선스 기록",
          url: "https://commons.wikimedia.org/wiki/File:Rainbow_Bridge_in_Millennium_City_Park_20180120.jpg",
          publisher: "Windmemories / Wikimedia Commons",
          reviewedAt: "2026-08-14",
        },
        {
          label: "저우차오 사진과 라이선스 기록",
          url: "https://commons.wikimedia.org/wiki/File:20250531_Zhou_Qiao.jpg",
          publisher: "Yumeto / Wikimedia Commons",
          reviewedAt: "2026-08-14",
        },
        {
          label: "임수대전 사진과 라이선스 기록",
          url: "https://commons.wikimedia.org/wiki/File:20250531_Linshui_Dadian.jpg",
          publisher: "Yumeto / Wikimedia Commons",
          reviewedAt: "2026-08-14",
        },
        {
          label: "상선문 사진과 라이선스 기록",
          url: "https://commons.wikimedia.org/wiki/File:Shangshan_Gate_20180120.jpg",
          publisher: "Windmemories / Wikimedia Commons",
          reviewedAt: "2026-08-14",
        },
        {
          label: "CC0 1.0 보편적 퍼블릭 도메인 기증",
          url: "https://creativecommons.org/publicdomain/zero/1.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-14",
        },
        {
          label: "Creative Commons 저작자표시-동일조건변경허락 4.0 국제 라이선스",
          url: "https://creativecommons.org/licenses/by-sa/4.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-14",
        },
      ],
    },
  ],
};

export default body;
