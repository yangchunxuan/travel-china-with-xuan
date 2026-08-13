import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "선충원(沈從文)의 『변성(邊城)』을 실제 장소와 함께 읽고 싶다면 차둥(茶峒)이 문학 지리를 살피기에 더 알맞다. 다만 이는 Homeground의 편집 판단이지, 오늘날의 차둥이 작품 전체를 그대로 보존했다는 뜻은 아니다. 작가의 출생지와 국가 보호 옛집, 후대의 기념 문화를 보고 싶다면 펑황(鳳凰)을 고른다. 두 곳을 모두 갈 이유는 소설을 낳은 장소의 지리와 작가를 기억하는 고향의 방식을 비교하고 싶을 때다. 연구에서 작품의 핵심 나루 공간은 차둥 인근의 비시쥐(碧溪岨, Bìxījū)와 연결되지만, 펑황은 작가의 생애와 작품 수용사에 속한다. 어느 곳도 책 속 마을이 통째로 변하지 않은 채 남은 세트장이 아니다."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "짧은 결론",
      body: "한 곳만 가며 소설이 우선이면 차둥, 선충원의 삶이 우선이면 펑황을 고른다. 안내판과 강의 지리, 현대 복원 공간까지 비교할 시간과 여유가 있다면 두 곳을 간다. 펑황을 간다는 이유만으로 그곳을 곧바로 『변성』의 원형이라고 전제해서는 안 된다.",
      tone: "decision"
    },
    {
      id: "answer-heading",
      type: "heading",
      level: 2,
      text: "차둥, 펑황, 아니면 두 곳 모두를 골라야 할까?"
    },
    {
      id: "choice-matrix",
      type: "comparison",
      title: "현장에서 풀고 싶은 질문에 장소를 맞추기",
      columns: [
        {
          heading: "차둥",
          body: "국경 지대의 강, 나루, 선착장과 장터 마을이 작품의 공간을 어떻게 조직하는지 묻는 독자에게 알맞다. 작품 속 모든 대상을 현실에서 찾는 것이 아니라 공간 관계를 비교하는 방문이다."
        },
        {
          heading: "펑황",
          body: "선충원이 성장한 곳, 그의 옛집이 보호되는 방식, 도시가 그를 기념하는 방식을 보고 싶은 독자에게 알맞다. 골목과 퉈장(沱江)은 작가 고향의 맥락이지 소설의 일대일 지도는 아니다."
        },
        {
          heading: "두 곳",
          body: "창작과 기억을 비교하려는 독자에게 알맞다. 차둥에서는 소설과 강의 지리를 대조하고, 펑황에서는 작가의 생애와 공적 기억을 읽는다. 두 방문의 질문을 섞지 않는 것이 핵심이다."
        }
      ]
    },
    {
      id: "choice-caution",
      type: "paragraph",
      text: "남은 시간만으로 결정하지 않는 편이 좋다. 차둥은 당일 나룻배나 공연이 없어도 작품, 지형, 안내판을 함께 볼 독자에게 충분한 의미가 있다. 펑황은 작가와 문화유산을 한곳에서 보기 쉽지만, 눈에 잘 띄는 관광 상업이 오래돼 보이는 모든 골목을 『변성』의 일부로 오해하게 만들 수 있다. 작품을 읽지 않았다면 추이추이(翠翠), 나룻배 가족, 변경 마을의 기본 관계를 먼저 알아두면 차둥이 더 잘 보인다. 그래도 줄거리가 현실 마을을 작품의 증거로 바꾸지는 않는다."
    },
    {
      id: "chadong-heading",
      type: "heading",
      level: 2,
      text: "소설은 왜 차둥을 가리키면서도 차둥의 지도가 아닐까?"
    },
    {
      id: "chadong-literary-geography",
      type: "paragraph",
      text: "작지만 결정적인 교정부터 해야 한다. 지서우대학교 학술지의 연구는 소설의 주요 사건이 단순히 차둥 마을 안에서 일어나는 것이 아니라 비시쥐를 중심으로 조직된다고 설명한다. 논문은 비시쥐를 차둥강 상류 지류 곁의 바위산으로 서술한다. 차둥은 여전히 중요한 인근 마을이자 지리적 기준점이지만, 문학 공간은 작가가 선택하고 재구성한 결과다. 이 글은 논문의 영문 표기 Bixiju와 岨의 표준 독음 jū에 맞춰 碧溪岨를 Bìxījū, 비시쥐로 적는다. 여기서 비시쥐는 문학적 공간 명칭이며, 오늘날 공식 표지와 정확한 좌표가 보장된 관광지를 뜻하지 않는다."
    },
    {
      id: "fiction-transformation",
      type: "paragraph",
      text: "소설은 이동 경로를 압축하고 시점을 옮기며, 하나의 나루에 넓은 변경 지역의 정서적 무게를 실을 수 있다. 이는 지도의 오류가 아니라 문학적 구성이다. 『변성』에서는 강을 건너는 일, 기다림, 친족 관계, 제때 오지 못하는 일이 서로 얽힌다. 그러므로 현장에서는 지형이 그 관계를 이해하는 데 어떤 도움을 주는지 물어야 한다. 현대 상점이 인물의 실재를 입증한다고 보거나, ‘추이추이의 집’이라는 명칭 때문에 역사적 인물이 실제로 살았다고 생각해서는 안 된다. 지리가 선충원이 알던 장소와 긴밀히 닿아 있어도 인물과 줄거리는 문학에 속한다."
    },
    {
      id: "rename-context",
      type: "callout",
      title: "지명 변경은 작품의 영향을 보여 주지만 원형을 입증하지 않는다",
      body: "원래 차둥으로 불리던 행정 단위는 2005년에 볜청진으로 이름을 바꿨다. 이는 현대의 공공 서사에서 마을과 소설의 연관성이 강해졌음을 보여 준다. 현재의 행정 경계, 거리와 관광 공간이 문학 공간과 완전히 일치한다는 증거는 아니다.",
      tone: "neutral"
    },
    {
      id: "fenghuang-heading",
      type: "heading",
      level: 2,
      text: "그렇다면 펑황은 왜 선충원 독자에게 여전히 중요한가?"
    },
    {
      id: "fenghuang-biography",
      type: "paragraph",
      text: "펑황의 핵심 관계는 전기와 기념이다. 후난성 기록기관의 전기는 선충원이 1902년 펑황에서 태어났다고 기록한다. 후난성 문화재 당국은 그의 옛집을 청대 건축물로 분류하며 제6차 전국중점문물보호단위 목록에 올렸다. 따라서 펑황이 작가의 어린 시절 환경 및 그의 기억을 보존하는 후대 활동과 문헌상 연결된다는 점은 확인할 수 있다. 그러나 이 사실이 소설 속 나루, 추이추이, 비시쥐를 펑황으로 옮기지는 않는다."
    },
    {
      id: "former-residence-figure",
      type: "figure",
      src: "/images/guides/border-town-fenghuang-chadong-shen-congwen/shen-congwen-former-residence-1600.webp",
      alt: "옛집 현판과 관람 안내가 보이는 펑황 선충원 옛집의 길가 출입구.",
      width: 1600,
      height: 1186,
      caption: "출입구는 장소의 정체를 확인해 준다. 내부에서는 보호 표지와 방별 설명으로 역사적 건축 부재와 후대 전시·가구를 구분한다."
    },
    {
      id: "fenghuang-rooftops-figure",
      type: "figure",
      src: "/images/guides/border-town-fenghuang-chadong-shen-congwen/fenghuang-rooftops-1600.webp",
      alt: "펑황 퉈장 변의 지붕과 수변 건물, 물레방아.",
      width: 1600,
      height: 1067,
      caption: "퉈장 강변은 선충원의 고향 환경을 이해하는 데 도움이 되지만 『변성』의 장면을 일대일로 보여 주지는 않는다."
    },
    {
      id: "former-home-boundary",
      type: "paragraph",
      text: "옛집에서는 건물과 건물 안에 배치된 것을 분리해서 본다. 전국중점문물보호단위라는 지위는 문화유산 건물의 시대와 중요성을 뒷받침한다. 그러나 지금 보이는 모든 들보, 생활용품, 사진, 진열장이 선충원의 어린 시절부터 남았다는 뜻은 아니다. 공식 보호 표지, 방 또는 보존 설명, 전시품 캡션 순서로 읽어 보자. 복제품, 수리, 복원, 재현, 전시 설치라고 적혔다면 그 한정을 그대로 유지한다. 개입 이력이 없다면 보이는 상태만 묘사하고 구성 부재의 연대를 추측하지 않는다."
    },
    {
      id: "layers-heading",
      type: "heading",
      level: 2,
      text: "지금 보는 것은 역사, 문학, 관광 연출, 편집 판단 중 무엇일까?"
    },
    {
      id: "layers-table",
      type: "table",
      caption: "서로 합쳐서는 안 되는 네 층위",
      columns: ["층위", "여기에 속하는 내용", "이것만으로 입증할 수 없는 것"],
      rows: [
        ["역사", "문헌으로 확인되는 선충원의 펑황 출생, 보호 옛집, 기관 자료와 날짜가 있는 선착장 또는 글씨", "소설 인물이 그곳에 살았다는 주장, 현재 보이는 모든 부재가 원형이라는 주장"],
        ["문학", "비시쥐, 추이추이, 나룻배 가족, 작품이 재구성한 변경 풍경", "정확한 GPS 지점, 실존 주민, 완전한 도시 계획도"],
        ["관광 연출", "인물 주제의 재건 공간, 공연, 표지, 개명, 관광지의 이야기 구성", "1930년대 생활의 직접 증거 또는 작가의 유일한 의도"],
        ["편집 판단", "문학 지리 독자에게 차둥, 작가 전기 독자에게 펑황을 우선 권하는 Homeground의 선택", "학계 합의 또는 두 여행지에 대한 공식 순위"]
      ]
    },
    {
      id: "guangtian-figure",
      type: "figure",
      src: "/images/guides/border-town-fenghuang-chadong-shen-congwen/jiangtian-plaza-1600.webp",
      alt: "펑황 고성 안에 ‘장톈광장(江天廣場)’이라고 적힌 현대 상업 공간 입구.",
      width: 1600,
      height: 1067,
      caption: "역사 도시의 관람 동선도 현대 상업 공간을 지난다. 옛 모습의 디자인 자체가 연대 표시는 아니다."
    },
    {
      id: "layer-method",
      type: "paragraph",
      text: "현장에서 가장 빠른 방법은 ‘누가 이 주장을 하는가’를 묻는 것이다. 문화재 표지는 보호 지위를 확인하고, 박물관 캡션은 물건을 식별하거나 전시 해석을 제시한다. 관광 당국 자료는 목적지가 현재 자신을 어떻게 소개하는지를 입증한다. 소설은 의미를 만들지만 건축 재료를 감정하지 않는다. Homeground는 선택을 도울 수 있어도 편집 추천은 편집 판단으로 표시해야 한다. 오래된 선착장 옆에 인물 주제의 재건 건물이 있다면 둘을 뭉뚱그려 ‘진짜 같다’고 하지 말고 각각의 층위를 기록한다."
    },
    {
      id: "read-chadong-heading",
      type: "heading",
      level: 2,
      text: "차둥에서는 어떤 순서로 현장을 읽어야 할까?"
    },
    {
      id: "chadong-sequence",
      type: "list",
      ordered: true,
      items: [
        "안내 지도나 공식 지명 표지부터 찾는다. 이야기 표지보다 먼저 칭수이장(清水江)과 후난·충칭·구이저우가 만나는 지역을 확인한다. 현실의 경계 조건이 주제 사진 지점보다 작품을 이해하는 데 유용하다.",
        "칭수이장 동쪽 기슭의 차둥 옛 선착장으로 간다. 후난성 문화관광 당국은 이를 약 100㎡ 규모의 돌계단식 민국 시기 나루 시설로 설명하며, 1949년 이후에도 유지됐고 문화재 보호 지위를 갖는다고 기록한다. 물질 유산이지만 작품 속 바로 그 나루라고 자동 확정되지는 않는다.",
        "강기슭, 물로 내려가는 계단, 건너편까지의 거리를 함께 볼 수 있는 곳에 선다. 나룻배가 누가 도착하고 누가 기다리며 누가 통행을 통제하는지 결정하는 방식을 생각해 본다. 배가 운항하지 않아도 선착장과 강의 공간 관계는 그대로 읽을 수 있다.",
        "옛 마을 거리는 건물별로 조심해서 본다. 정착지의 역사가 오래됐어도 한 편의 마을 소개로 모든 외벽, 목조 부재와 상점 내부의 연대를 정할 수는 없다. 개별 표지가 있다면 그것을 우선한다.",
        "추이추이 주제 공간은 해석 장치로 본다. 후난성 정부가 2024년에 낸 자료는 추이추이의 집을 소설 장면을 모사한 재건 공간이라고 명시한다. 관광이 인물을 물리적 공간으로 만드는 방식은 보여 주지만 추이추이를 실존 인물로 만들지는 않는다.",
        "글씨도 날짜가 있는 대상으로 읽는다. 2026년 볜청진 입구에 설치된 글씨는 1981년 선충원의 진필을 바탕으로 허가를 받아 재현한 것이다. 절벽의 붉은 ‘변성 선충원’ 글씨는 현지 서예가 룽칭롄이 1993년에 모사했다. 어느 표면도 선충원의 원래 손글씨가 그 자리에 남은 것은 아니다."
      ]
    },
    {
      id: "chadong-dynamic-warning",
      type: "callout",
      title: "확인되지 않은 나룻배나 공연을 일정의 중심에 두지 말 것",
      body: "이 글에서 확인한 안정적인 공식 공지로는 관광 나룻배의 매일 운항 시간, 요금, 공연 시간을 확정할 수 없었다. 방문 당일 마을이나 직접 운영 주체의 공지를 다시 확인한다. 배를 탈 수 없어도 보호 선착장, 양안의 관계, 안내 표지, 재건 공간의 캡션으로 문학 지리 읽기는 가능하다.",
      tone: "warning"
    },
    {
      id: "read-fenghuang-heading",
      type: "heading",
      level: 2,
      text: "펑황을 ‘작가의 도시’로 읽는 순서는 무엇일까?"
    },
    {
      id: "fenghuang-sequence",
      type: "list",
      ordered: true,
      items: [
        "막연한 ‘변성’ 표지보다 선충원 옛집에서 시작한다. 보호 표지를 확인하고 건물 부재, 전시, 출처 캡션이 있는 물건을 나눠 본다.",
        "뜰의 관계와 주거 규모로 가족과 초기 환경을 생각하되, 모든 배치물을 전기 자료로 만들지는 않는다. 물건과 역사적 주장 사이에는 신뢰할 수 있는 캡션이 필요하다.",
        "주변 골목은 작가 고향의 맥락으로 걷는다. 길의 폭, 마당의 관계, 퉈장으로 이어지는 변화를 본다. 공식 또는 학술 근거가 없다면 골목을 소설 사건의 현장으로 임의 명명하지 않는다.",
        "퉈장과 훙차오(虹橋)에서는 오래 지속된 도시 지리와 집중 관리되는 관광 경관이 어떻게 겹치는지 본다. 둘 다 현실이지만 어느 쪽도 작품 속 나루가 이곳에 있었다는 증거는 아니다.",
        "시간, 접근 가능 여부와 관심이 맞으면 퉈장 변 선충원의 묘 또는 기념 공간에서 마친다. 기록기관의 전기는 이곳의 기념 성격을 뒷받침한다. 옛집을 이해하는 데 필수는 아니며 소설 장면도 아니다."
      ]
    },
    {
      id: "stepping-stones-figure",
      type: "figure",
      src: "/images/guides/border-town-fenghuang-chadong-shen-congwen/tuojiang-stepping-stones-1126.webp",
      alt: "차둥이 아닌 펑황 퉈장의 징검다리를 건너는 방문객과 뒤편의 강변 건물.",
      width: 1126,
      height: 819,
      caption: "이곳은 차둥이 아니라 펑황의 퉈장이다. 사진 찍기 좋은 건넘 지점도 소설 속 나루의 증거는 아니다."
    },
    {
      id: "grave-figure",
      type: "figure",
      src: "/images/guides/border-town-fenghuang-chadong-shen-congwen/shen-congwen-grave-1200.webp",
      alt: "펑황현 선충원 묘의 석제 기념물.",
      width: 1200,
      height: 1600,
      caption: "묘는 후대에 형성된 선충원의 기념 지리에 속하며 『변성』의 허구 세계에는 속하지 않는다."
    },
    {
      id: "material-heading",
      type: "heading",
      level: 2,
      text: "무엇이 남은 유산이고, 무엇이 유지·재현·신설된 것일까?"
    },
    {
      id: "material-status-table",
      type: "table",
      caption: "근거가 허용하는 가장 좁은 상태 표현",
      columns: ["장소 또는 대상", "확인 가능한 상태", "이렇게 부르지 말 것"],
      rows: [
        ["펑황 선충원 옛집", "지속적인 보존 관리 아래 있는 청대 건축물이며 전국중점문물보호단위", "모든 재료와 가구가 바뀌지 않은 채 남은 원형 주택"],
        ["차둥 옛 선착장", "돌계단을 갖춘 보호 대상 민국 시기 나루·선착장이며 1949년 이후 유지 기록이 있음", "최종적으로 확인된 소설 속 나루"],
        ["차둥 옛 거리", "역사적 정착지 맥락을 지니지만 개별 건물은 자체 표지로 확인해야 함", "1930년대 모습이 통째로 보존된 거리"],
        ["차둥 관광 연출의 추이추이 집", "소설 속 공간을 모사하기 위해 재건한 장면", "추이추이의 실제 집 또는 남아 있는 원건물"],
        ["2026년 설치한 볜청진 입구 글씨", "1981년 선충원 진필을 바탕으로 만든 현대의 허가된 재현", "원래 필적 자료 또는 오래된 문루 글씨"],
        ["절벽의 붉은 글씨", "현지 서예가 룽칭롄이 1993년에 만든 모사", "선충원이 절벽에 직접 쓴 글씨"],
        ["펑황의 퉈장·훙차오·골목", "선충원 고향과 현재 관광 경관의 실제 구성 요소", "공인된 『변성』 평면도"]
      ]
    },
    {
      id: "status-note",
      type: "paragraph",
      text: "‘보호 대상’과 ‘모두 원형’은 같은 말이 아니다. 보호에는 수리, 교체, 보강, 새로운 해설이 포함될 수 있다. 반대로 현대 재건도 무의미하지 않다. 후대 독자가 소설을 어떻게 상상했는지 보여 줄 수 있다. 책임 있는 질문은 모든 것이 오래돼 보이는지가 아니라, 대상이 어느 층위에 속하고 안내판이 물질 이력을 기록하는지다. 촬영이 허용되면 예쁜 세부만 남기지 말고 발행 기관과 날짜가 들어간 표지 전체를 찍는다."
    },
    {
      id: "routes-heading",
      type: "heading",
      level: 2,
      text: "시간이나 개방 상황이 달라져도 성립하는 동선은 무엇일까?"
    },
    {
      id: "route-scenarios",
      type: "comparison",
      title: "실행 가능한 세 가지 읽기 동선",
      columns: [
        {
          heading: "문학 우선, 한 곳",
          items: [
            "차둥을 고른다.",
            "경계와 강의 관계부터 파악한다.",
            "주제 공간보다 옛 선착장을 먼저 읽는다.",
            "재건과 서로 다른 시기의 글씨를 비교하며 마친다."
          ]
        },
        {
          heading: "작가 우선, 한 곳",
          items: [
            "펑황을 고른다.",
            "옛집과 그 안내판에서 시작한다.",
            "골목을 따라 퉈장과 훙차오로 가며 고향 맥락으로 읽는다.",
            "접근과 관심이 맞을 때만 묘를 더한다."
          ]
        },
        {
          heading: "두 장소 비교",
          items: [
            "각 장소에 서로 다른 질문을 남겨 둔다.",
            "차둥에서는 문학 지리와 관광 재건을 본다.",
            "펑황에서는 전기, 보호 유산과 기념을 본다.",
            "두 곳을 급한 인증 목록 하나로 압축하지 않는다."
          ]
        }
      ]
    },
    {
      id: "recovery-list",
      type: "list",
      items: [
        "옛집이 닫혔다면 외부 보호 정보를 읽고 공식 박물관 또는 문화재 자료를 이용한다. 오래된 여행 후기로 현재 내부 입장을 추정하지 않는다.",
        "촬영이 제한되면 기관, 대상 명칭, 캡션 날짜를 적는다. 촬영할 수 없어도 정확히 기록한 설명의 증거 가치는 줄지 않는다.",
        "차둥 나룻배가 운항하지 않으면 고정된 선착장, 양안, 건넘 방향을 비교한다. 무관한 유람선을 타고 문학 속 나루라고 부르지 않는다.",
        "주제 표지와 문화재 표지가 충돌하면 두 주장을 모두 기록하되, 역사적 상태는 문화재 또는 학술 출처를 우선해 판단한다.",
        "연대나 보존 표지가 없는 건물은 현재 마을에 있는 건물이라고만 부른다. 원형, 수리, 재건을 추측하지 않는다.",
        "현재 개방, 입장권, 공연을 확인할 수 없다면 외부 공간 중심 동선을 유지하고 당일 직접 운영 주체에 확인한다."
      ]
    },
    {
      id: "choose-heading",
      type: "heading",
      level: 2,
      text: "누구에게 맞고, 누가 건너뛰어도 되며, 무엇을 다시 확인해야 할까?"
    },
    {
      id: "fit-list",
      type: "list",
      items: [
        "작품을 읽었고 일반적인 작가 박물관보다 풍경, 경계와 나루의 관계를 보고 싶다면 차둥을 고른다.",
        "작품 속 강의 구조를 찾기보다 선충원의 생애, 보호 옛집과 기념 문화가 중요하다면 펑황을 고른다.",
        "작품의 지리적 상상과 작가의 후대 공적 기억이 왜 다른지를 이해하고 싶다면 두 곳을 고른다.",
        "주된 목적이 교통, 숙소 또는 일반 고성 일정이라면 추가 문학 동선은 건너뛸 수 있다. 그런 실무는 기존 Homeground 목적지 가이드가 더 잘 다룬다.",
        "출발 전에는 직접 운영 주체에 변동 사항만 다시 확인한다. 옛집 입장, 촬영 규정, 나룻배 운항, 광고된 공연이다. 이들이 취소돼도 가능한 기본 동선을 남겨 둔다."
      ]
    },
    {
      id: "dont-mistake",
      type: "callout",
      title: "연관성을 동일성으로 오해하지 말 것",
      body: "펑황은 단순히 ‘『변성』의 원형’이 아니다. 차둥도 작품이 건물별로 보존된 곳이 아니다. 비시쥐는 반드시 찾을 수 있는 현대 관광 좌표가 아니며, 재건한 추이추이 집은 역사적 주택이 아니다. 재현하거나 모사한 글씨도 원본이 아니다. 이 구분을 지키면 두 장소의 의미는 줄어드는 대신 더 선명해진다.",
      tone: "warning"
    },
    {
      id: "links",
      type: "internal-links",
      title: "후난 서부 여행 계속 준비하기",
      items: [
        {
          label: "장자제 시내와 우링위안 중 숙소 거점 고르기",
          href: "/ko/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          description: "장자제 숙소 거점 선택은 따로 해결하고 이 문학 비교를 지역 일정으로 확장하지 않는다."
        },
        {
          label: "후난에서 균형 잡힌 첫 끼 주문하기",
          href: "/ko/guides/hunan-cuisine-balanced-first-meal/",
          description: "문학 지리 다음에는 실제로 쓸 수 있는 지역 음식 선택으로 이어 간다."
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "출처·이미지 표기 최종 검토일: 2026년 8월 14일",
      items: [
        {"label": "선충원 생애", "url": "https://sdaj.hunan.gov.cn/sdaj/wszt/xxsl/xxrw/200609/t20060928_1977903.html", "publisher": "후난성 당안관", "reviewedAt": "2026-08-13"},
        {"label": "전국중점문물보호단위 목록의 선충원 옛집", "url": "https://wwj.hunan.gov.cn/wwj/c100314/201406/t20140613_10483053.html", "publisher": "후난성 문물국", "reviewedAt": "2026-08-13"},
        {"label": "2025년 선충원 옛집 보호 점검", "url": "https://wwj.hunan.gov.cn/wwj/c100310/c100311/202505/t20250530_33687539.html", "publisher": "후난성 문물국", "reviewedAt": "2026-08-13"},
        {"label": "『변성』 문학 지리의 삼위일체 관점", "url": "https://skxb.jsu.edu.cn/CN/Y2010/V31/I1/50", "publisher": "지서우대학교 학보", "reviewedAt": "2026-08-13"},
        {"label": "차둥 고진의 공간 생산", "url": "https://skxb.jsu.edu.cn/CN/Y2021/V42/I5/124", "publisher": "지서우대학교 학보", "reviewedAt": "2026-08-13"},
        {"label": "차둥 옛 선착장", "url": "https://whhlyt.hunan.gov.cn/whhlyt/RedTourism/202206/t20220607_25264271.html", "publisher": "후난성 문화여유청", "reviewedAt": "2026-08-13"},
        {"label": "차둥 관광 연출과 재건한 추이추이 집", "url": "https://www.hunan.gov.cn/hnszf/hnyw/szdt/202410/t20241006_33468999.html", "publisher": "후난성 인민정부", "reviewedAt": "2026-08-13"},
        {"label": "2026년 입구 글씨와 1993년 절벽 글씨의 내력", "url": "https://www.hunan.gov.cn/hnszf/hnyw/szdt/202605/t20260502_33969228.html", "publisher": "후난성 인민정부", "reviewedAt": "2026-08-13"},
        {"label": "차둥·볜청 지명 연혁", "url": "https://mzt.hunan.gov.cn/mzt/sxdmx/202005/t20200513_12118025.html", "publisher": "후난성 민정청", "reviewedAt": "2026-08-13"},
        {"label": "2025년 관광지 운영과 한 차례 공익 공연의 날짜별 기록", "url": "https://whhlyt.hunan.gov.cn/whhlyt/cyfz/cyxm/202507/t20250711_33736998.html", "publisher": "후난성 문화여유청", "reviewedAt": "2026-08-14"},
        {"label": "岨 표준 독음표", "url": "https://language.moe.gov.tw/001/Upload/Files/wxiao89/a.pdf", "publisher": "대만 교육부 언어 자료", "reviewedAt": "2026-08-13"},
        {"label": "대표 이미지: xiquinhosilva의 펑황 훙차오; 크롭, CC BY 4.0", "url": "https://commons.wikimedia.org/wiki/File:%E5%87%A4%E5%87%B0%E5%8F%A4%E5%9F%8E_2024-06-22_18.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "본문 이미지: Kurgenera의 선충원 옛집 입구; 크기 조정, CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:%E6%B2%88%E4%BB%8E%E6%96%87%E6%95%85%E5%B1%85.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "본문 이미지: xiquinhosilva의 펑황 퉈장 지붕 풍경; 크기 조정, CC BY 4.0", "url": "https://commons.wikimedia.org/wiki/File:%E5%87%A4%E5%87%B0%E5%8F%A4%E5%9F%8E_2024-06-22_01.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "본문 이미지: xiquinhosilva의 장톈광장 입구; 크기 조정, CC BY 4.0", "url": "https://commons.wikimedia.org/wiki/File:%E5%87%A4%E5%87%B0%E5%8F%A4%E5%9F%8E_2024-06-22_11.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "본문 이미지: Yu Hui의 퉈장 징검다리; 원본 크기 변환, CC BY-SA 2.0", "url": "https://commons.wikimedia.org/wiki/File:Fenghuang_Ancient_Town.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "본문 이미지: Zhangmoon618의 선충원 묘; 크기 조정, 퍼블릭 도메인 기증", "url": "https://commons.wikimedia.org/wiki/File:Shen_Congwen_Grave_in_Fenghuang_County.JPG", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "CC BY 4.0 라이선스", "url": "https://creativecommons.org/licenses/by/4.0/", "publisher": "Creative Commons", "reviewedAt": "2026-08-14"},
        {"label": "CC BY-SA 4.0 라이선스", "url": "https://creativecommons.org/licenses/by-sa/4.0/", "publisher": "Creative Commons", "reviewedAt": "2026-08-14"},
        {"label": "CC BY-SA 2.0 라이선스", "url": "https://creativecommons.org/licenses/by-sa/2.0/", "publisher": "Creative Commons", "reviewedAt": "2026-08-14"}
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
