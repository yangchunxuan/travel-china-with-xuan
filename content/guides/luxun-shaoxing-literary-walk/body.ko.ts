import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "루쉰의 사오싱을 읽는 가장 좋은 방법은 ‘이곳들이 모두 한 작품에서 나온 장소인가’를 묻는 것이 아니다. 저우자 신타이먼(周家新台門)은 그의 출생과 성장에 연결된 생활 현장이고, 싼웨이수우(三味書屋)는 기록으로 확인되는 교육 현장이다. 저우자 라오타이먼(周家老台門)은 더 넓은 가문과 사회적 배경을 보여 준다. 바이차오위안(百草園)은 실재 장소이지만, 나중에 회고 산문 속에서 다시 구성되었지 현장에서 작성한 식물 목록이 아니다. 반면 쿵이지(孔乙己)는 허구 인물이며, 오늘날 셴헝주뎬(咸亨酒店)은 주로 작품의 후대 수용과 관광 경제를 보여 준다. 가족–학교–집–기억 속 정원–기념관–소설과 상업의 순서로 읽고, 관람 시간은 상황에 맞춰 늘리거나 줄이자. 2026년 8월 14일까지 재확인한 공식 자료만으로는 누구에게나 정확히 2~3시간이 걸리는 현행 동선을 보장할 수 없다."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "문턱을 넘을 때마다 붙일 네 가지 표지",
      body: "‘여기서 살거나 공부했다’는 기록이 있는 생활 현장, ‘이곳을 기억해 썼다’는 실제 장소를 재구성한 회고, ‘작품에서 만들었다’는 허구 인물이나 공간, ‘나중에 이곳에 구현했다’는 기념관·복원 연출·조각·상점·관광 장면이다. 한 건물군 안에 여러 층위가 함께 있으므로, 원형 여부를 판단하기 전에 개별 설명문을 읽어야 한다.",
      tone: "decision"
    },
    {
      id: "layers-heading",
      type: "heading",
      level: 2,
      text: "무엇이 역사이고, 회고이며, 소설 또는 현대 연출인가?"
    },
    {
      id: "layers-table",
      type: "table",
      caption: "산책에서 분리해야 할 네 가지 증거 층위",
      columns: ["층위", "확인할 수 있는 것", "그것만으로 확인할 수 없는 것"],
      rows: [
        ["역사", "기록으로 확인되는 루쉰의 거주·교육 관계, 보호 건축, 날짜가 있는 보존·기념관 연혁", "모든 가구·벽면·방 배치가 어린 시절 그대로 남았다는 주장"],
        ["문학", "회고 산문이 구성한 바이차오위안–싼웨이수우의 흐름, 소설 속 쿵이지와 루전(鲁镇)", "실시간 일기, 실제 주민 명부 또는 그대로 따라 걸을 수 있는 지도"],
        ["관광 연출", "전시, 복원 환경, 쿵이지 조각, 테마 상점과 현재 셴헝 관람 장면", "청말 일상의 직접 증거나 허구 주점의 원래 모습"],
        ["편집 판단", "Homeground가 권하는 생활 → 기억 → 기념관 → 소설 순서", "공식 일방통행 동선이나 모든 사람에게 같은 관람 시간"]
      ]
    },
    {
      id: "layers-method",
      type: "paragraph",
      text: "이 구분은 ‘진짜 옛 도시’와 ‘가짜 현대 관광지’를 가르는 판정이 아니다. 복원된 방은 공간 규모를 이해하게 해 주고, 새 기념관에는 오래된 침실보다 더 나은 문헌 증거가 있을 수 있다. 상업 조각도 허구 인물이 공공 기억으로 들어온 방식을 보여 준다. 더 정확한 질문은 누가, 언제, 어떤 물질에 대해 무엇을 주장했는가이다. 문화재 표지, 보존 안내, 박물관 캡션, 문학 작품과 관광 문구에 서로 다른 증거 가중치를 주자."
    },
    {
      id: "sequence-heading",
      type: "heading",
      level: 2,
      text: "첫 방문에서는 어떤 순서가 가장 이해하기 쉬운가?"
    },
    {
      id: "sequence-comparison",
      type: "comparison",
      title: "핵심 현장을 먼저 보고 해석 층위를 더하자",
      columns: [
        {
          heading: "생활 증거 핵심",
          items: [
            "현재 지도와 입장 안내로 방향을 잡는다.",
            "라오타이먼은 가문 배경으로 읽는다.",
            "싼웨이수우에서 교육 증거를 본다.",
            "신타이먼에서 잔존부와 복원 연출을 분리한다."
          ]
        },
        {
          heading: "기억과 기념관 핵심",
          items: [
            "바이차오위안을 실제 장소이자 후대 회고로 읽는다.",
            "기념관에서 연표, 판본과 문헌 자료를 확인한다.",
            "기억 속 교과서 삽화가 아니라 현재 설명문으로 세부를 식별한다."
          ]
        },
        {
          heading: "선택 가능한 수용사 결말",
          items: [
            "생활 현장을 본 뒤 셴헝으로 이동한다.",
            "쿵이지를 지방 인물 전기가 아닌 소설 인물로 본다.",
            "상점과 조각은 제작 시점이 있는 현대 해석으로 읽는다.",
            "혼잡이나 폐쇄로 시간이 부족하면 생략한다."
          ]
        }
      ]
    },
    {
      id: "sequence-note",
      type: "paragraph",
      text: "통제된 출입구, 공사와 방 폐쇄 때문에 실제 보행 순서는 달라질 수 있다. 그때도 이해의 순서만은 지키면 된다. 직원 안내로 바이차오위안을 먼저 보게 되더라도 ‘장소＋회고 글쓰기’라는 표지를 붙이고, 싼웨이수우가 열렸을 때 교육 현장 증거로 돌아가자. 허용되는 곳에서는 당일 지도를 촬영해 둔다. 운영자 웹사이트의 1·2·3시간 코스에는 오래된 게시물이 섞여 있으므로 2026년 실시간 동선 보장으로 쓰면 안 된다."
    },
    {
      id: "old-taimen-heading",
      type: "heading",
      level: 2,
      text: "저우자 라오타이먼은 무엇을 설명하고, 무엇은 설명하지 못하는가?"
    },
    {
      id: "old-taimen-text",
      type: "paragraph",
      text: "저우자 라오타이먼은 루쉰 개인의 방보다 저우 가문의 조상 대대로 이어진 생활과 사회적 배경을 이해하는 데 유용하다. 1881년에 저우수런(周树人)이라는 이름으로 태어난 루쉰이 고립된 ‘작가의 방’에서 나온 것이 아니라 더 큰 친족·가정 세계에 속했다는 점을 보여 준다. 다만 이곳을 그의 모든 어린 시절과 교육 경험이 벌어진 장소라고 뭉뚱그리면 안 된다. 먼저 입구의 공식 명칭, 문화재 안내와 방 기능 설명을 읽는다. 제사, 가내 질서나 사오싱 주거 문화를 보여 주는 실내가 있더라도, 설명문이 시기와 물질 근거를 제시하지 않는다면 현재의 전시 해석으로 표현해야 한다."
    },
    {
      id: "old-taimen-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/zhou-family-old-taimen-1600.webp",
      alt: "루쉰 조거로 식별된 사오싱 저우자 라오타이먼 입구.",
      width: 1600,
      height: 1067,
      caption: "라오타이먼은 가문과 사회 배경을 제공한다. 입구 명칭이 내부의 모든 방을 루쉰 개인 생활 공간으로 만들지는 않는다."
    },
    {
      id: "old-taimen-checklist",
      type: "list",
      items: [
        "장식적 실내를 보기 전에 장소의 공식 명칭부터 확인한다.",
        "마당과 방의 관계는 보되, 설명 없이 청말의 기능을 지정하지 않는다.",
        "보존, 수리, 복원, 재건, 전시 연출 같은 표현을 현장 문구 그대로 기록한다.",
        "상태가 불분명하면 ‘조거 건물군 안에 현재 전시된다’고만 쓴다."
      ]
    },
    {
      id: "sanwei-heading",
      type: "heading",
      level: 2,
      text: "싼웨이수우는 생활 현장인데 왜 책상 하나에는 주의가 필요한가?"
    },
    {
      id: "sanwei-text",
      type: "paragraph",
      text: "싼웨이수우는 서우(寿) 가문의 저택 안에 있었고, 사오싱 공식 자료는 루쉰이 열두 살 무렵 들어가 약 5년 동안 공부한 서당으로 설명한다. 따라서 이 방과 그의 교육 이력의 관계는 영화 세트나 막연한 ‘옛 교실’보다 강하다. 방의 작은 규모, 선생과 학생 책상의 관계, 편액과 기관 설명을 먼저 본다. 이런 공간 정보만으로도 루쉰이 나중에 산문에서 정원의 관찰과 서당 생활을 어떻게 대비했는지 생각할 수 있으며, 현장에서 교과서 장면을 재연할 필요는 없다."
    },
    {
      id: "sanwei-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/sanwei-study-1600.webp",
      alt: "책상, 편액과 루쉰 좌석을 표시한 기관 안내가 보이는 싼웨이수우 내부.",
      width: 1600,
      height: 1067,
      caption: "방은 기록이 있는 교육 현장이다. 개별 물건 이야기는 현재 캡션과 출처에 달려 있다."
    },
    {
      id: "sanwei-caution",
      type: "paragraph",
      text: "유명한 ‘자오(早, 일찍)’ 글자 책상은 한 단계 더 확인해야 한다. 저장성 문화관광 당국의 2024년 보도와 기념관 직원 인터뷰는 기관이 원물로 귀속한 책상이 보존을 위해 싼웨이수우에서 철수되어 수장고를 거친 뒤 기념관에 전시됐다고 설명한다. 그러나 이후 보도는 싼웨이수우에 보이는 책상의 원물·복제품 지위를 항상 분명히 구분하지 않는다. 현재 물건, 캡션과 위치는 여전히 현장에서 확인해야 한다. 책상이 있다면 정확한 문구를 읽고 허용될 때 설명 전체를 찍자. 귀속 원물이 교체 전시로 빠졌더라도 교육 현장성은 남는다. 다른 책상을 대신 지목하지 말자."
    },
    {
      id: "new-taimen-heading",
      type: "heading",
      level: 2,
      text: "저우자 신타이먼에는 무엇이 남아 있는가?"
    },
    {
      id: "new-taimen-text",
      type: "paragraph",
      text: "저우자 신타이먼은 루쉰의 출생과 성장에 연결된 기록이 있는 거주지다. 하지만 ‘고거’라는 명칭이 전체 건물군의 무변경 보존을 뜻하지 않는다. 사오싱시 정협의 역사 자료는 저우 가문이 1918년에 재산을 매각했고 1920~1922년에 넓은 범위의 개조가 이뤄졌다고 기록하면서, 특정 거주 공간과 부엌이 남았다고 설명한다. 다른 기관 자료는 2003년에 오래된 전시관을 철거하고 신타이먼 환경을 복원하며 새 기념관을 조성한 사업을 기록한다. 따라서 이곳의 핵심은 밀봉된 어린 시절 집이 아니라 부분 잔존, 변형, 보존과 해석이 이어진 과정이다."
    },
    {
      id: "new-taimen-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/zhou-family-new-taimen-1600.webp",
      alt: "루쉰의 기록된 고거인 사오싱 저우자 신타이먼 서쪽 축의 건물.",
      width: 1600,
      height: 1067,
      caption: "신타이먼에는 생활 현장 관계와 함께 매각, 개조, 일부 잔존과 후대 복원의 역사가 있다."
    },
    {
      id: "new-taimen-method",
      type: "list",
      ordered: true,
      items: [
        "건물이나 방 이름을 확인한다. ‘루쉰 고향 관광지’는 방문 구역명이지 하나의 건축 연대가 아니다.",
        "가구 전시보다 문화재 표지나 보존 설명을 먼저 읽는다.",
        "구조 재료와 가구, 사진, 후대 해설 시설을 나눈다.",
        "남았다, 수리했다, 복원했다, 재건했다, 현재 전시한다 중 증거가 지지하는 가장 좁은 동사를 쓴다.",
        "개입 이력이 없다면 어두운 목재, 기와나 분위기로 연대를 판단하지 않는다."
      ]
    },
    {
      id: "baicao-heading",
      type: "heading",
      level: 2,
      text: "바이차오위안은 실제 장소인가, 문학적 기억인가?"
    },
    {
      id: "baicao-text",
      type: "paragraph",
      text: "서로 다른 의미에서 둘 다 맞다. 바이차오위안은 고거 뒤편의 가족 생활 경관에 속한다. 그러나 「바이차오위안에서 싼웨이수우까지」(《从百草园到三味书屋》)는 『아침 꽃을 저녁에 줍다』(《朝花夕拾》)에 실린 회고 산문이다. 루쉰은 1926년에 성인 작가의 시선으로 어린 시절의 주의를 다시 구성했다. 소설은 아니지만 당시의 일기나 보존 조사서도 아니다. 식물, 놀이, 두려움, 어른의 이야기와 서당 생활이 리듬을 이루는 것은 작가가 기억을 선택하고 배열했기 때문이다."
    },
    {
      id: "baicao-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/baicao-garden-1600.webp",
      alt: "사오싱 루쉰 고거 관람 구역 안에서 ‘바이차오위안(百草園)’ 이름이 보이는 정원 문.",
      width: 1600,
      height: 1067,
      caption: "이름 표지는 산문 속 기억과 연결된 실제 정원을 식별하지만, 문의 연대나 루쉰 어린 시절의 시야를 입증하지는 않는다."
    },
    {
      id: "baicao-method",
      type: "paragraph",
      text: "현장에서 지금 자라는 식물을 문장 하나하나와 억지로 맞추지 말자. 대신 두 가지 물질적 기준점을 고른다. 신타이먼과 정원의 위치 관계, 그리고 낮은 담이나 돌 우물 테두리처럼 설명이 붙은 세부다. 각각의 표지가 연대, 수리 또는 관련성을 밝히는지 묻고, 산문이 감정적으로 강조한 것과 기관이 물질로 입증할 수 있는 것을 비교한다. 혼잡할 때 이 두 기준점 방식은 사람이 없는 교과서 장면 사진을 기다리는 것보다 정직하고 기억에도 잘 남는다."
    },
    {
      id: "museum-heading",
      type: "heading",
      level: 2,
      text: "1953년에 세워진 기념관은 옛 방에 무엇을 더했는가?"
    },
    {
      id: "museum-text",
      type: "paragraph",
      text: "사오싱 루쉰기념관은 기관 설립 연도를 1953년으로 제시하며, 중국 국가발전개혁위원회의 장소 소개도 이 연대를 뒷받침한다. 이 날짜는 기관사이지 현재 모든 전시실의 건축 연대가 아니다. 기념관의 가치는 고거가 할 수 없는 일을 한다는 데 있다. 생애 연표를 세우고 판본과 사진을 식별하며, 도시 사이의 이동과 작품의 출판·수용을 설명한다. 원고 복제품이나 판본도 각자의 캡션과 권리 정보로 판단해야 하며, 옛집 옆에 놓였다는 이유로 원본이 되지는 않는다."
    },
    {
      id: "museum-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/lu-xun-memorial-museum-1600.webp",
      alt: "사오싱의 보호된 생활 유적 옆에 있는 현대 루쉰기념관 건물.",
      width: 1600,
      height: 1067,
      caption: "기념관은 1953년에 설립된 문헌·해석 기관이지 또 하나의 어린 시절 집이 아니다."
    },
    {
      id: "museum-method",
      type: "paragraph",
      text: "장면화된 방에서 받은 첫인상을 교정할 수 있도록 기념관에 시간을 남겨 둔다. 날짜가 붙은 문서, 초판본, 가족 사진과 보존 단계에 주목하고 원본, 복제품, 전시 인용문을 구분한다. 혼잡하거나 전시품이 교체되었다면 생애 연표 하나와 캡션이 분명한 출판물 하나를 우선한다. 기대한 물건이 없더라도 이 둘은 작가와 글을 연결하며, 보지 못한 전시품을 본 것처럼 쓸 이유가 없다."
    },
    {
      id: "fiction-heading",
      type: "heading",
      level: 2,
      text: "소설은 어디서 시작되며, 오늘의 셴헝주뎬은 무엇을 증명하는가?"
    },
    {
      id: "fiction-text",
      type: "paragraph",
      text: "1919년에 처음 발표된 「쿵이지」(《孔乙己》)는 단편소설이다. 몰락한 독서인, 화자와 루전의 주점은 루쉰이 아는 사회 세계에서 재료를 얻었더라도 허구에 속한다. 후대에 제기된 한 사람의 ‘원형’ 후보가 쿵이지를 기록된 사오싱 주민으로 바꾸지는 않는다. 오늘날 인물이 간판, 조각과 음식 공간에 매우 눈에 띄게 등장하기 때문에 이 경계가 더 중요하다. 그런 물건은 작품의 강한 후대 수용을 증명하지만 소설을 지방 인물 전기로 만들지는 않는다."
    },
    {
      id: "xianheng-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/xianheng-hotel-1600.webp",
      alt: "입구 옆 쿵이지 조각과 함께 보이는 현재 사오싱 셴헝주뎬 전면.",
      width: 1600,
      height: 1067,
      caption: "현재 호텔과 조각은 현대 문학 수용과 상업 공간이며, 소설 속 주점이 변함없이 남은 현장이 아니다."
    },
    {
      id: "fiction-boundary",
      type: "paragraph",
      text: "현재 사오싱 관광 자료는 「쿵이지」와의 연관으로 셴헝주뎬을 소개한다. 호텔이 2025년에 공개한 자체 연혁은 1981년 영업을 재개했고, 이후 확장 때 운영자가 ‘堂吃’이라고 부르는 홀 식사 구역은 남겼지만 나머지는 철거·재건했다고 적는다. 운영자 자기 서술이므로 독립적인 보존 조사로 볼 수는 없지만, 현재 단지 전체가 청말 모습 그대로라는 주장은 배제할 수 있다. 저장성 당국의 2025년 보도는 인근의 새 문학 IP 상점과 장면도 기록한다. 조성 날짜와 해설을 살피되 현재 내부를 소설 주점의 원형이나 조각을 실제 인물의 초상으로 부르지 말자. 문을 닫았거나 붐비면 건너뛰어도 앞의 생활·문학 읽기는 완결된다."
    },
    {
      id: "walk-heading",
      type: "heading",
      level: 2,
      text: "입구, 대기열이나 방 공개가 바뀌면 어떻게 걸어야 하는가?"
    },
    {
      id: "walk-sequence",
      type: "list",
      ordered: true,
      items: [
        "도착하면 당일 공식 지도, 예약 안내, 입장 지점과 촬영 표지를 확인한다. 운영자 사이트의 오래된 1·2·3시간 코스 화면을 현재 시간표로 쓰지 않는다.",
        "동선이 허용하면 라오타이먼부터 시작한다. 가문과 사회 배경이라는 한 가지 역할만 맡긴다. 닫혀 있다면 그 맥락은 기념관에서 보충하고 신타이먼에 억지로 적용하지 않는다.",
        "싼웨이수우에서는 ‘早’ 책상을 찾기 전에 방의 규모와 캡션을 읽는다. 귀속된 물건이 없다면 교육 장소라는 확인 가능한 사실만 기록한다.",
        "신타이먼에서는 잔존·복원 상태 설명 하나와 방 기능 설명 하나를 고른다. 가구가 있는 모든 방을 ‘전부 원형’으로 합치지 않게 해 준다.",
        "바이차오위안에서는 고거와의 위치 관계, 그리고 설명이 있는 물질 세부 하나라는 두 기준점을 쓴다. 계절 식재가 산문과 달라도 읽기는 성립한다.",
        "기념관에서 연대, 작품과 후대 보존을 연결한다. 시간이 줄면 믿을 만한 연표 하나와 출판물 하나가 모든 전시실을 급히 도는 것보다 낫다.",
        "후대 수용에 관심이 있을 때만 셴헝과 새 문학 거리를 마지막에 넣는다. 이는 선택 가능한 현대의 맺음말이지 어린 시절 현장의 필수 증거가 아니다."
      ]
    },
    {
      id: "walk-recovery",
      type: "list",
      items: [
        "예약 실패: 외관 관람을 핵심 관람과 같다고 하지 말고, 공공 가로 맥락을 본 뒤 공식 후속 시간대를 찾는다.",
        "방 폐쇄: 날짜가 있는 기관 설명이나 기념관 연표를 쓰고 내부 관찰을 지어내지 않는다.",
        "공사로 우회: 발로 걷는 순서는 바뀌어도 메모의 증거 순서는 섞지 않는다.",
        "바이차오위안 혼잡: 빈 교과서 장면을 재현하려 하지 말고 설명이 있는 세부 두 곳을 고른다.",
        "이동 제약: 직원에게 당일 무장애 동선을 묻는다. 전체 건물군을 잇지 못하면 기념관과 접근이 확인된 생활 현장 한 곳을 우선한다.",
        "촬영 금지: 물건명, 기관과 캡션 날짜를 적는다. 현재 표지가 허용하지 않으면 플래시, 삼각대와 근접 촬영이 가능하다고 가정하지 않는다."
      ]
    },
    {
      id: "fit-heading",
      type: "heading",
      level: 2,
      text: "누가 전체 산책을 해야 하며, 모두가 다시 확인할 것은 무엇인가?"
    },
    {
      id: "fit-comparison",
      type: "comparison",
      title: "자신이 가진 질문에 맞춰 깊이를 고르자",
      columns: [
        {
          heading: "이미 루쉰을 읽었다",
          body: "전체 증거 순서를 걷고 산문이 구성한 기억과 현장 물질 표지를 비교한다. 수용사에 관심이 있을 때만 셴헝을 더한다."
        },
        {
          heading: "루쉰을 처음 만난다",
          body: "신타이먼, 싼웨이수우와 기념관을 우선하고 전후에 짧은 글 한 편을 읽는다. 인용문 찾기나 긴 생애 강의로 만들지 않는다."
        },
        {
          heading: "건축·보존이 목적이다",
          body: "라오·신타이먼, 개입 용어와 2003년 사업사를 우선한다. 가구와 분위기는 질문으로 남기고 연대로 단정하지 않는다."
        },
        {
          heading: "식사나 사진만 원한다",
          body: "셴헝을 따로 방문해도 된다. 깊은 산책은 생략할 수 있지만 상업 장면 하나로 루쉰의 사오싱 전체를 요약해서는 안 된다."
        }
      ]
    },
    {
      id: "dont-mistake",
      type: "callout",
      title: "이 여섯 쌍을 혼동하지 말자",
      body: "회고 산문은 실시간 일기가 아니다. 허구 인물은 실제 주민이 아니다. 보호 유적은 모든 표면이 무변경이라는 뜻이 아니다. ‘早’ 이야기와 연결된 책상은 자동으로 완전히 입증되거나 영구 전시되는 물건이 아니다. 복원 환경은 온전한 원래 건물군이 아니다. 현재 셴헝주뎬은 허구 주점의 변함없는 원형이 아니다.",
      tone: "warning"
    },
    {
      id: "dynamic-note",
      type: "paragraph",
      text: "출발 전 직접 운영자에게 평상시 개방 시간, 무료·유료 범위, 예약과 외국 여권 처리, 공사 폐쇄, 일방통행, 무장애 접근, 전시 교체와 실내 촬영 규칙을 다시 확인해야 한다. 조사 중 찾은 2026년 공지는 특정 연휴 조정만 다뤘으므로 평상시 규칙의 근거가 될 수 없다. 직접 확인이 어렵다면 일정을 유연하게 두고 여권 신분증을 지참하며, 유인 창구에 질문할 시간을 남기고 셴헝은 선택 사항으로 둔다. 동적 정보가 실패해도 증거 경계까지 무너지게 해서는 안 된다."
    },
    {
      id: "local-review",
      type: "callout",
      title: "이 가이드가 보증하지 않는 것",
      body: "Homeground 중앙 편집팀은 2026년 8월 14일에 세 언어의 구조, 고유명, 출처 경계와 이미지 출처 표기를 문헌으로 검토했다. 이는 현장 조사도, 사오싱 현지인이나 루쉰 전문가의 실명 보증도 아니다. 글의 산책 순서는 편집상의 읽기 순서이며, 실제 개방 범위와 방 동선, 물건의 귀속은 당일 지도·전시 설명·직원 안내를 따른다.",
      tone: "neutral"
    },
    {
      id: "links",
      type: "internal-links",
      title: "증거를 먼저 읽는 여행을 이어 가기",
      items: [
        {
          label: "목판 인쇄와 활자 인쇄 체험 고르기",
          href: "/ko/guides/woodblock-and-movable-type-printing-decisions/",
          description: "기념관의 판본과 인쇄물을 볼 때도 물건·공정·증거를 나누는 방식을 적용합니다."
        },
        {
          label: "중국 공휴일에 맞춰 여행 계획하기",
          href: "/ko/guides/china-public-holidays-travel-calendar/",
          description: "혼잡과 특별 개방 공지를 문학 해석과 별도로 확인합니다."
        },
        {
          label: "공식·재판매 티켓 채널 확인하기",
          href: "/ko/guides/official-or-reseller-china-tickets/",
          description: "유적 구역에 예약이 필요하면 현재 운영자 출처를 사용합니다."
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "출처·이미지 표기 최종 검토일: 2026년 8월 14일",
      items: [
        {"label": "루쉰 고향 구역 구성과 1953년 기념관 설립", "url": "https://www.ndrc.gov.cn/xwdt/ztzl/qghsly/202105/t20210524_1301639.html", "publisher": "중국 국가발전개혁위원회", "reviewedAt": "2026-08-13"},
        {"label": "신타이먼과 싼웨이수우의 생활·교육 관계", "url": "https://sxlz.sx.gov.cn/art/2022/2/14/art_1483623_58923289.html", "publisher": "사오싱 공식 지역사 플랫폼", "reviewedAt": "2026-08-13"},
        {"label": "사오싱 루쉰기념관 기관 소개", "url": "https://sxlz.sx.gov.cn/art/2022/11/14/art_1229701440_58924111.html", "publisher": "사오싱 공식 지역사 플랫폼", "reviewedAt": "2026-08-13"},
        {"label": "신타이먼 매각·개조와 잔존부", "url": "https://sxzx.sx.gov.cn/art/2011/7/13/art_1486822_17724937.html", "publisher": "사오싱시 정협", "reviewedAt": "2026-08-13"},
        {"label": "2003년 보존·기념관 사업사", "url": "https://www.zjds.org.cn/sx/37464.jhtml", "publisher": "저장성 당사·문헌 연구기관", "reviewedAt": "2026-08-13"},
        {"label": "차단 시설 변경과 ‘早’ 이야기 귀속 책상 전시", "url": "https://ct.zj.gov.cn/art/2024/3/20/art_1652992_59019865.html", "publisher": "저장성 문화광전여유청", "reviewedAt": "2026-08-13"},
        {"label": "기념관 직원이 설명한 ‘早’ 책상의 보존과 2024년 전시", "url": "https://www.chinanews.com.cn/sh/2024/04-10/10196078.shtml", "publisher": "중국신문사", "reviewedAt": "2026-08-14"},
        {"label": "「바이차오위안에서 싼웨이수우까지」 원문", "url": "https://www.chinawriter.com.cn/news/2013/2013-02-06/153980.html", "publisher": "중국작가망·중국작가협회", "reviewedAt": "2026-08-13"},
        {"label": "『아침 꽃을 저녁에 줍다』의 회고 글쓰기", "url": "https://www.chinawriter.com.cn/n1/2022/0428/c419384-32410615.html", "publisher": "중국작가망·중국작가협회", "reviewedAt": "2026-08-13"},
        {"label": "「쿵이지」 원문과 발표 맥락", "url": "https://www.chinawriter.com.cn/n1/2021/0907/c440988-32220179.html", "publisher": "중국작가망·중국작가협회", "reviewedAt": "2026-08-13"},
        {"label": "현재 셴헝 관광 연출", "url": "https://sxwg.sx.gov.cn/art/2024/9/3/art_1644765_59016443.html", "publisher": "사오싱 문화관광 당국", "reviewedAt": "2026-08-13"},
        {"label": "셴헝주뎬 운영자 연혁: 1981년 재개업과 이후 일부 보존·나머지 재건", "url": "https://www.xianheng.com/index.php?a=show&c=index&catid=151&id=1&m=content", "publisher": "셴헝주뎬", "reviewedAt": "2026-08-14"},
        {"label": "2025년 문학 IP 구역 연출", "url": "https://ct.zj.gov.cn/art/2025/10/14/art_1673778_59028174.html", "publisher": "저장성 문화광전여유청", "reviewedAt": "2026-08-14"},
        {"label": "공식 1·2·3시간 코스 페이지; 현재 시간표가 아닌 날짜가 지난 방향 참고 자료", "url": "https://sxlxmuseum.com/gcyx.htm", "publisher": "사오싱 루쉰 고향·선위안 관광지", "reviewedAt": "2026-08-14"},
        {"label": "2026년 2월 특정 연휴의 개방 조정·예약 공지", "url": "https://www.thepaper.cn/newsDetail_forward_32587318", "publisher": "관광지 공지를 전재한 펑파이뉴스", "reviewedAt": "2026-08-13"},
        {"label": "대표 이미지: Yumeto의 신타이먼 작은 응접실; 크롭, CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:20250717_Small_reception_room_of_the_former_residence_of_Lu_Xun.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "본문 이미지: Gisling의 라오타이먼 입구; 크롭, CC BY 3.0", "url": "https://commons.wikimedia.org/wiki/File:Ancestral_home_of_Luxun.JPG", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "본문 이미지: Yumeto의 싼웨이수우; 크롭, CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:20250717_Sanwei_Shuwu.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "본문 이미지: 猫猫的日记本의 신타이먼 서쪽 축 건물; 크롭, CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:Former_Residence_of_Lu_Xun_in_Shaoxing_01_2018-09.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "본문 이미지: Yiwen122의 바이차오위안 정문; 인물이 없는 크롭, CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:Baicao_garden.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "본문 이미지: Huanokinhejo의 사오싱 루쉰기념관; 크롭, CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:Lu_Xun_memorial,_Shaoxing.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "본문 이미지: Amarespeco의 셴헝주뎬; 크롭, CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:%E5%92%B8%E4%BA%A8%E9%85%92%E5%BA%972017.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "크롭 편집본에 적용되는 CC BY-SA 4.0 라이선스", "url": "https://creativecommons.org/licenses/by-sa/4.0/", "publisher": "Creative Commons", "reviewedAt": "2026-08-13"},
        {"label": "라오타이먼 크롭 편집본에 적용되는 CC BY 3.0 라이선스", "url": "https://creativecommons.org/licenses/by/3.0/", "publisher": "Creative Commons", "reviewedAt": "2026-08-13"}
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
