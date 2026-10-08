import styles from "./JiangnanArtEditorial.module.css";

type Locale = "en" | "zh" | "ko" | "ja";

type Chapter = Readonly<{
  place: string;
  span: string;
  title: string;
  body: string;
  coda: string;
}>;

type Stay = Readonly<{
  city: string;
  nights: string;
  name: string;
  reason: string;
}>;

type EditorialCopy = Readonly<{
  storyEyebrow: string;
  storyTitle: string;
  storyIntro: string;
  chapters: readonly [Chapter, Chapter, Chapter, Chapter];
  staysEyebrow: string;
  staysTitle: string;
  staysIntro: string;
  stays: readonly [Stay, Stay, Stay, Stay];
  sourceLabel: string;
  stayNote: string;
}>;

const copy: Record<Locale, EditorialCopy> = {
  en: {
    storyEyebrow: "The journey, in four movements",
    storyTitle: "Let Jiangnan change the way you see Shanghai.",
    storyIntro:
      "The route begins with places built around water, gardens and slow observation. By the time you reach Shanghai, those same ideas have become streets, trade, architecture and a changing skyline.",
    chapters: [
      {
        place: "Suzhou",
        span: "Days 1–3 · 3 nights",
        title: "First, learn to look.",
        body:
          "In the Humble Administrator’s Garden and smaller Yipu, a path, doorway or pond changes what comes into view. Then Pingjiang Road takes you back to the living city: canalside houses, bridges and lanes rather than another garden set behind a wall.",
        coda: "Classical gardens → canalside streets",
      },
      {
        place: "Tongli",
        span: "Day 4 · 1 night",
        title: "Stay after the day visit ends.",
        body:
          "Tongli is an overnight stop, not a quick detour. A local guide connects Tuisi Garden and the Three Bridges, with a preserved old house visited if open; the unhurried time afterward is yours to experience the water town beyond the scheduled walk.",
        coda: "A water town with time to linger",
      },
      {
        place: "Hangzhou",
        span: "Days 5–6 · 2 nights",
        title: "Follow the water to the hills.",
        body:
          "The Grand Canal around Gongchen Bridge speaks to work and exchange. West Lake invites a different pace, with causeways, boats when operating and the tea-growing hills nearby. A grower visit depends on availability; the tea harvest itself is seasonal.",
        coda: "Grand Canal → West Lake → tea country",
      },
      {
        place: "Shanghai",
        span: "Days 7–12 · 5 nights",
        title: "Read a city in layers.",
        body:
          "Yu Garden and the old city lead to residential lanes, the Bund’s commercial-era buildings, Hongkou’s refugee history and Pudong’s newer skyline. The final open day leaves room for your own Shanghai, perhaps along Yangpu’s industrial waterfront.",
        coda: "Old city → Bund → Hongkou → Pudong",
      },
    ],
    staysEyebrow: "Where the route pauses",
    staysTitle: "Four stays, each chosen for its place in the story.",
    staysIntro:
      "These are the proposed bases for 11 nights with breakfast. Each gives the route a different setting; the exact property and room are confirmed for your dates.",
    stays: [
      {
        city: "Suzhou",
        nights: "3 nights",
        name: "Yihe Songmaoju · 颐和松茂居",
        reason:
          "A restored historic residence in the Pingjiang district, keeping the first three nights close to the lanes you explore on foot.",
      },
      {
        city: "Tongli",
        nights: "1 night",
        name: "Yinlu Tongli House · 隐庐同里别院",
        reason:
          "A restored former Pang family house within the old town, making the overnight stay part of the water-town experience.",
      },
      {
        city: "Hangzhou",
        nights: "2 nights",
        name: "Canopy by Hilton Hangzhou West Lake",
        reason:
          "A downtown base on Guohuo Road near West Lake, for the lake day after the Grand Canal walk.",
      },
      {
        city: "Shanghai",
        nights: "5 nights",
        name: "Atour S Hotel, Pudong Avenue, Lujiazui",
        reason:
          "A Taolin Road base in Pudong. The guided Shanghai days also cross the river to the old city, Bund and Hongkou.",
      },
    ],
    sourceLabel: "About this property",
    stayNote:
      "These hotels are candidates, not held rooms. Before payment, your written quote will confirm availability, the exact hotel, room type, rooming arrangement and rate for your dates, plus any agreed alternative.",
  },
  zh: {
    storyEyebrow: "四段风景，一条线索",
    storyTitle: "从江南出发，换一种方式读上海。",
    storyIntro:
      "前半程在水边、园林与旧街巷里慢慢学会观察；到了上海，同样的水路与人居故事，延伸为商贸、建筑和不断变化的城市天际线。",
    chapters: [
      {
        place: "苏州",
        span: "第 1–3 天 · 住 3 晚",
        title: "先学会看一座园林。",
        body:
          "拙政园与小巧的艺圃，各用路径、门洞与水面安排眼前的景。走出园门，再到平江路看桥、河与仍有人生活的街巷：这里不是另一座被围起来的园林，而是城市日常。",
        coda: "古典园林 → 临水街巷",
      },
      {
        place: "同里",
        span: "第 4 天 · 住 1 晚",
        title: "水乡值得住一晚。",
        body:
          "同里不是匆匆打卡的一站。半天由当地导游串起退思园与三桥，若有开放的旧宅也可入内；之后的时间留给你自己，在当天导览结束后慢慢感受古镇的节奏。",
        coda: "不止半天的古镇体验",
      },
      {
        place: "杭州",
        span: "第 5–6 天 · 住 2 晚",
        title: "沿着水路，走向茶山。",
        body:
          "拱宸桥一带的大运河讲述运输与商贸，西湖则适合沿堤缓行、在运营时乘船，再往附近茶山走。茶农拜访视实际安排而定；采茶更取决于季节，不作保证。",
        coda: "大运河 → 西湖 → 茶山",
      },
      {
        place: "上海",
        span: "第 7–12 天 · 住 5 晚",
        title: "看见城市一层又一层。",
        body:
          "从豫园与老城厢，到有人居住的里弄外景、外滩建筑、虹口难民史，再到浦东新城，上海不是一张天际线照片。最后留出一天自由活动，也可按兴趣自行走一段杨浦工业遗产滨江。",
        coda: "老城 → 外滩 → 虹口 → 浦东",
      },
    ],
    staysEyebrow: "沿途落脚点",
    staysTitle: "四处候选住宿，呼应一路风景。",
    staysIntro:
      "行程拟安排 11 晚含早住宿。从苏州旧宅到浦东落脚点，各有其位置与理由；具体酒店、房间仍须按出行日期确认。",
    stays: [
      {
        city: "苏州",
        nights: "3 晚",
        name: "颐和松茂居 · Yihe Songmaoju",
        reason:
          "平江历史街区内修缮活化的旧宅。连住三晚，步行探访平江街巷时也能感受同一片街区。",
      },
      {
        city: "同里",
        nights: "1 晚",
        name: "隐庐同里别院 · Yinlu Tongli House",
        reason:
          "由古镇中的庞宅修缮而来，让同里这一晚本身也成为水乡体验的一部分。",
      },
      {
        city: "杭州",
        nights: "2 晚",
        name: "杭州西湖希尔顿嘉悦里酒店 · Canopy by Hilton",
        reason:
          "位于国货路、靠近西湖。走过大运河之后，第二天从市区落脚点展开西湖行程。",
      },
      {
        city: "上海",
        nights: "5 晚",
        name: "上海陆家嘴浦东大道亚朵 S 酒店",
        reason:
          "以浦东桃林路为落脚点。上海导览日会跨江走访老城、外滩和虹口。",
      },
    ],
    sourceLabel: "了解候选酒店",
    stayNote:
      "以上均为候选酒店，网页并未预留房间。付款前的书面报价会按出行日期确认余房、实际酒店、房型、入住人数与价格，以及双方同意的替代方案。",
  },
  ko: {
    storyEyebrow: "네 도시로 이어지는 한 이야기",
    storyTitle: "강남을 지나며 상하이를 보는 시선도 달라집니다.",
    storyIntro:
      "물길과 정원, 오래된 골목에서 천천히 관찰하는 법을 배웁니다. 상하이에 이르면 그 이야기가 교역과 건축, 변화하는 도시 풍경으로 이어집니다.",
    chapters: [
      {
        place: "쑤저우",
        span: "1–3일 차 · 3박",
        title: "정원을 보는 눈을 익힙니다.",
        body:
          "졸정원과 작은 이포에서는 길과 문, 연못이 시선을 이끕니다. 정원 밖 핑장루에서는 다리와 운하, 사람이 사는 골목을 만납니다. 담장 안의 정원에서 도시의 일상으로 이어지는 시간입니다.",
        coda: "전통 정원 → 운하 골목",
      },
      {
        place: "퉁리",
        span: "4일 차 · 1박",
        title: "수향마을에서 하룻밤 머뭅니다.",
        body:
          "퉁리는 잠깐 들렀다 떠나는 곳이 아닙니다. 현지 가이드와 퇴사원, 세 다리를 살피고 개방 중이라면 오래된 주택도 방문합니다. 일정이 끝난 뒤에는 각자의 속도로 마을을 경험할 수 있습니다.",
        coda: "반나절 방문을 넘어서는 퉁리",
      },
      {
        place: "항저우",
        span: "5–6일 차 · 2박",
        title: "운하를 따라 차밭으로 갑니다.",
        body:
          "궁천교 주변 대운하는 물류와 교역의 이야기를 들려줍니다. 서호에서는 둑길을 걷고 운항 시 배를 탄 뒤 인근 차밭으로 향합니다. 차 농가 방문은 가능 여부에 따르며, 찻잎 수확은 계절에 따라 달라집니다.",
        coda: "대운하 → 서호 → 차밭",
      },
      {
        place: "상하이",
        span: "7–12일 차 · 5박",
        title: "도시의 여러 층위를 읽습니다.",
        body:
          "예원과 구시가, 사람이 사는 리룽 골목의 외관, 와이탄 건축, 훙커우의 난민 역사와 푸둥의 새로운 스카이라인을 잇습니다. 마지막 자유일에는 양푸의 산업 유산 강변길을 직접 걸어볼 수도 있습니다.",
        coda: "구시가 → 와이탄 → 훙커우 → 푸둥",
      },
    ],
    staysEyebrow: "여정의 네 숙소",
    staysTitle: "각 도시의 이야기에 어울리는 네 곳의 후보 숙소.",
    staysIntro:
      "조식이 포함된 11박 숙소의 제안입니다. 도시마다 위치와 분위기를 고려했으며 실제 호텔과 객실은 여행 날짜에 맞춰 확인합니다.",
    stays: [
      {
        city: "쑤저우",
        nights: "3박",
        name: "Yihe Songmaoju · 颐和松茂居",
        reason:
          "핑장 역사 지구의 옛 주택을 복원한 숙소로, 첫 3박 동안 걸어볼 골목과 같은 지역에 머뭅니다.",
      },
      {
        city: "퉁리",
        nights: "1박",
        name: "Yinlu Tongli House · 隐庐同里别院",
        reason:
          "옛 퉁리 마을의 팡 가문 주택을 복원한 곳으로, 숙박 자체가 수향마을 경험에 이어집니다.",
      },
      {
        city: "항저우",
        nights: "2박",
        name: "Canopy by Hilton Hangzhou West Lake",
        reason:
          "서호 인근 궈훠루의 도심 숙소입니다. 대운하를 걸은 다음 날 서호 일정을 시작하기 좋습니다.",
      },
      {
        city: "상하이",
        nights: "5박",
        name: "Atour S Hotel, Pudong Avenue, Lujiazui",
        reason:
          "푸둥 타오린루를 거점으로 머물며, 가이드 일정에는 강 건너 구시가·와이탄·훙커우를 방문합니다.",
      },
    ],
    sourceLabel: "후보 숙소 알아보기",
    stayNote:
      "모두 후보 숙소이며 현재 확보된 객실은 없습니다. 결제 전 서면 견적에서 날짜별 예약 가능 여부, 실제 호텔, 객실 유형, 투숙 인원과 요금 및 합의된 대안을 확인합니다.",
  },
  ja: {
    storyEyebrow: "四つの土地をつなぐ物語",
    storyTitle: "江南を歩くと、上海の見え方も変わる。",
    storyIntro:
      "水辺の暮らし、庭園、古い路地から旅を始めます。上海に着くころには、その水と住まいの物語が、交易や建築、新しい都市景観へと続いていきます。",
    chapters: [
      {
        place: "蘇州",
        span: "1～3日目 · 3泊",
        title: "まず、庭園の見方を知る。",
        body:
          "拙政園と小さな芸圃では、小道や門、池が眺めを変えていきます。庭園を出て平江路へ向かえば、橋と運河、今も人が暮らす路地へ。塀の中の風景と街の日常がつながります。",
        coda: "古典庭園 → 運河沿いの路地",
      },
      {
        place: "同里",
        span: "4日目 · 1泊",
        title: "水郷の町に、一晩泊まる。",
        body:
          "同里は短時間で通り過ぎません。現地ガイドと退思園、三橋を訪ね、公開中なら古い住まいも見学します。その後は予定に追われず、それぞれのペースで水郷の町に身を置けます。",
        coda: "日帰りでは見えない町の時間",
      },
      {
        place: "杭州",
        span: "5～6日目 · 2泊",
        title: "運河から湖、そして茶の丘へ。",
        body:
          "拱宸橋周辺の大運河には、物流と交易の歴史があります。西湖では堤を歩き、運航時には船に乗って、近くの茶畑へ。茶農家訪問は手配状況によって決まり、茶摘みは季節次第です。",
        coda: "大運河 → 西湖 → 茶畑",
      },
      {
        place: "上海",
        span: "7～12日目 · 5泊",
        title: "街を、幾つもの層として読む。",
        body:
          "豫園と旧市街から、人が暮らす里弄の外観、外灘の建築、虹口の難民史、浦東の新しい街並みへ。最後の自由日には、楊浦の産業遺産が残る川沿いを自分で歩くこともできます。",
        coda: "旧市街 → 外灘 → 虹口 → 浦東",
      },
    ],
    staysEyebrow: "旅の途中で泊まる場所",
    staysTitle: "四つの候補宿、それぞれに選ぶ理由があります。",
    staysIntro:
      "朝食付き11泊の候補です。各都市で旅のテーマに合う立地を考えていますが、実際の施設と客室は旅行日に合わせて確認します。",
    stays: [
      {
        city: "蘇州",
        nights: "3泊",
        name: "Yihe Songmaoju · 颐和松茂居",
        reason:
          "平江歴史街区にある古い邸宅を再生した宿。最初の3泊を、歩いて巡る路地と同じ地区で過ごします。",
      },
      {
        city: "同里",
        nights: "1泊",
        name: "Yinlu Tongli House · 隐庐同里别院",
        reason:
          "古鎮に残る旧・龐家の邸宅を修復した宿。町に泊まること自体が水郷体験の一部になります。",
      },
      {
        city: "杭州",
        nights: "2泊",
        name: "Canopy by Hilton Hangzhou West Lake",
        reason:
          "西湖に近い国貨路の市街地に立地。大運河を歩いた翌日の西湖散策の拠点です。",
      },
      {
        city: "上海",
        nights: "5泊",
        name: "Atour S Hotel, Pudong Avenue, Lujiazui",
        reason:
          "浦東・桃林路を拠点に滞在。ガイド付きの日には川を渡り、旧市街・外灘・虹口も訪ねます。",
      },
    ],
    sourceLabel: "候補宿の詳細",
    stayNote:
      "いずれも候補で、客室は確保していません。お支払い前の書面見積もりで、旅行日の空室状況、宿泊施設、客室タイプ、利用人数、料金、合意した代替案を確認します。",
  },
};

const staySources: readonly (string | null)[] = [
  "https://www.yiheresorts.com/songm/",
  "https://www.aiyems.com/index.php?a=show&c=index&catid=38&id=14&m=content",
  "https://www.hilton.com/en/hotels/hghwlpy-canopy-hangzhou-west-lake/",
  null,
];

export function JiangnanArtStory({ locale }: { locale: Locale }) {
  const content = copy[locale];
  return (
    <section className={styles.story} aria-labelledby="jiangnan-art-story-title">
      <div className={styles.inner}>
        <header className={styles.storyHeader}>
          <div className={styles.headerRule} aria-hidden="true" />
          <p className={styles.eyebrow}>{content.storyEyebrow}</p>
          <h2 id="jiangnan-art-story-title">{content.storyTitle}</h2>
          <p className={styles.storyIntro}>{content.storyIntro}</p>
        </header>
        <div className={styles.chapters}>
          {content.chapters.map((chapter, index) => (
            <article className={styles.chapter} key={chapter.place}>
              <div className={styles.chapterIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className={styles.chapterPlace}>
                <p className={styles.placeName}>{chapter.place}</p>
                <p className={styles.chapterSpan}>{chapter.span}</p>
              </div>
              <div className={styles.chapterText}>
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
                <p className={styles.coda}>{chapter.coda}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JiangnanArtStays({ locale }: { locale: Locale }) {
  const content = copy[locale];
  return (
    <section className={styles.stays} aria-labelledby="jiangnan-art-stays-title">
      <div className={styles.inner}>
        <header className={styles.staysHeader}>
          <p className={styles.eyebrow}>{content.staysEyebrow}</p>
          <h2 id="jiangnan-art-stays-title">{content.staysTitle}</h2>
          <p>{content.staysIntro}</p>
        </header>
        <div className={styles.staysGrid}>
          {content.stays.map((stay, index) => (
            <article className={styles.stayCard} key={stay.city}>
              <div className={styles.stayTop}>
                <span className={styles.stayIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.stayCity}>{stay.city}</span>
                <span className={styles.stayNights}>{stay.nights}</span>
              </div>
              <div className={styles.stayBody}>
                <h3>{stay.name}</h3>
                <p>{stay.reason}</p>
                {staySources[index] ? (
                  <a className={styles.staySource} href={staySources[index]!}>
                    {content.sourceLabel} <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <p className={styles.stayNote}>{content.stayNote}</p>
      </div>
    </section>
  );
}
