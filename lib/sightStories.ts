import type { HomegroundLocale } from "./homegroundI18n";
import type { SightId } from "./sights";

/**
 * A sight's own writing: why it is worth the trip, what not to miss, and how
 * it fits a day. It owns what the Travel Advice guide leaves out on purpose
 * (the guides own gates, booking, routes and exits; the reservation rules
 * own release times and prices), so nothing here restates them and nothing
 * here dates quickly: no opening hours, prices or booking steps.
 *
 * Every fact is checked against an official or reference source, logged in
 * docs/homeground-sight-stories-sources.md. Judgments ("go early", "skip the
 * inside") are ours and read as ours.
 *
 * A sight turns `ready` (indexed) only once its story is in all three
 * languages and the owner has read it.
 */
export interface SightStory {
  /** One or two sentences for search results and link previews. */
  readonly description: string;
  /** Why it is worth the trip: two or three short paragraphs. */
  readonly why: readonly string[];
  /** Three things not to miss: a name and a sentence or two. */
  readonly highlights: readonly { readonly name: string; readonly body: string }[];
  /** How long to give it. */
  readonly time: string;
  /** Time of day and season. */
  readonly when: string;
  /** What fits around it the same day. */
  readonly pair: string;
  /** Who can leave it out, said plainly. */
  readonly skip: string;
}

type Stories = Partial<Record<SightId, Readonly<Record<HomegroundLocale, SightStory>>>>;

export const sightStories: Stories = {
  "forbidden-city": {
    en: {
      description:
        "Walk the Forbidden City south to north and watch its courts open out, then close in. Find the one roof in China with ten beasts, and know when to go.",
      why: [
        "Twenty-four emperors, fourteen Ming and ten Qing, ruled China from inside these walls between 1420 and 1912, and ordinary people never got in. The Chinese name, Zijincheng, means the Purple Forbidden City: purple for the Pole Star, seat of the emperor of heaven. The last emperor, Puyi, stayed on in the inner courts until he was evicted in 1924. A year later the palace opened as a museum.",
        "The plan is the sight. You come in through the Meridian Gate and walk north along one straight line. At first the courtyards open out, up to the great square below the Hall of Supreme Harmony, where the court once lined up in rows by rank. Past the Gate of Heavenly Purity they close in again, into the smaller courts where the imperial family lived.",
        "It is huge: 72 hectares and close to 9,000 rooms. Nobody sees all of it in one visit, and you don't need to.",
      ],
      highlights: [
        {
          name: "The Hall of Supreme Harmony",
          body: "The largest hall in the palace, where emperors were enthroned and married. Look up at a corner of the roof: behind the man riding a phoenix walks a line of ten beasts. The last, a winged, monkey-faced figure called hangshi, appears on no other building in China.",
        },
        {
          name: "The Treasure Gallery and the Nine Dragon Screen",
          body: "On the quieter east side are the courts the Qianlong Emperor rebuilt for his retirement and then never moved into. They now hold the Treasure Gallery. The Nine Dragon Screen, 29 metres of glazed tile, stands at the gate. Inside, the Hall of Joyful Longevity holds the largest jade carving in the palace, a jade mountain over two metres tall showing Yu the Great taming the floods. The gallery has its own ticket, so decide before you book.",
        },
        {
          name: "The Imperial Garden",
          body: "Just before the north exit: old, twisted cypresses, rockeries, and a pavilion on top of an artificial hill. After the bare stone courtyards of the central axis, these are the first big trees you walk under.",
        },
      ],
      time: "Three hours inside covers the central axis and one side section. Allow extra time before that for security at the gate.",
      when: "Take a morning slot and be in the queue before the gates open, so you reach the great halls ahead of the crowd; inside, it is busiest from about ten until early afternoon. Spring and autumn are the comfortable seasons; in July and August the stone courtyards are hot and almost shadeless.",
      pair: "Tiananmen Square lies at the south end and has its own security check, so add it before your entry time only if the morning has room. Afterwards, if you still have the legs, leave by the north gate and cross the road to Jingshan Park. From the pavilion on top, the palace roofs fill the view, everything you just walked through in one look.",
      skip: "Repeat visitors with no interest in the collections. If three hours on stone paving is too much for someone in your group, don't drop it. The museum has its own two-hour route. And if your date is fully booked, go up Jingshan instead; in forty minutes it shows you the shape of the whole palace.",
    },
    zh: {
      description: "北京故宫真正值得看的，是整座宫城从南到北的布局。全国唯一有十只脊兽的屋顶、乾隆修好却始终没住进去的宫殿，还有从景山顶回看故宫的那一眼。",
      why: [
        "从 1420 年建成，到 1912 年清帝退位，明清两朝 24 位皇帝在这道宫墙里坐朝理政，寻常百姓一步也进不来。它的旧名叫紫禁城：“紫”指天上的紫微星，象征天帝的居所；“禁”，就是外人不得入内。退位后的末代皇帝溥仪并没有马上离开，在内廷一直住到 1924 年才被逐出；第二年，这里成了故宫博物院。",
        "费这么大劲来一趟，最值得看的是整座宫城的布局。从午门进去，沿着一条笔直的中轴线一路向北。院落先是越走越开阔，到太和殿前的广场最大，约有三万平方米，当年文武百官就在这里按品级列队；过了乾清门，空间才收窄，进入皇帝一家起居的内廷。",
        "它确实大：占地 72 万平方米，房屋近九千间。没人一次看得完，也不必看完。",
      ],
      highlights: [
        {
          name: "太和殿",
          body: "宫里最大的一座殿，皇帝登基、大婚都在这里举行。抬头看殿顶四角的檐脊：骑凤仙人后面跟着一排小兽，一共十只。排在最后的叫“行什”，猴脸、背生双翼，全国古建筑里只有这一座殿上有它。",
        },
        {
          name: "珍宝馆与九龙壁",
          body: "东侧的宁寿宫一带人少一些，是乾隆为自己当太上皇养老改建的，可他始终没有搬进来住。如今这里是珍宝馆：门前是长 29 米、彩色琉璃砖拼成的九龙壁；里面的乐寿堂立着一座两米多高、五吨多重的“大禹治水”玉山，是故宫里最大的一件玉雕。珍宝馆要另外买票，预约前就想好去不去。",
        },
        {
          name: "御花园",
          body: "就在北门出口前：盘曲的古柏、假山，假山顶上还有一座亭子。走完中轴线上空旷的石头院子，这是第一处能在大树下歇脚的地方。",
        },
      ],
      time: "宫里留三个小时，够走完中轴线，再挑东边或西边逛一路。进门前的安检时间另算。",
      when: "预约上午场，开门前就排进队里，赶在人潮前面走到几座大殿；宫里大约十点到午后人最多。春秋两季最舒服；七八月，石头院子又晒又热，几乎找不到阴凉。",
      pair: "天安门广场在南头，要单独过安检；只有上午时间宽裕，才值得在进宫前先去一趟。出了北门神武门，过马路就是景山公园；如果还走得动，就爬上去看看。站在山顶的万春亭上，整片金黄的宫殿屋顶都在眼前，刚走过的地方一眼看全。",
      skip: "以前来过、对宫里的展览也没什么兴趣的人。同行有人走不了三个小时石板路，也不必放弃：故宫自己有一条两小时的参观路线。要是你想去的那天已经约满，景山就是最实在的替代，四十分钟就能把整座宫城的格局看清。",
    },
    ko: {
      description: "베이징 자금성의 진짜 볼거리는 남북으로 이어진 궁 전체의 배치입니다. 잡상 열 개를 올린 중국 유일의 지붕, 건륭제가 짓고도 살지 않은 궁, 경산공원 전망까지.",
      why: [
        "1420년 완공부터 1912년까지 명나라 14명, 청나라 10명, 모두 24명의 황제가 이 담장 안에서 중국을 다스렸고, 일반 백성은 한 번도 들어올 수 없었습니다. 자금성의 ‘자’는 하늘의 황제가 산다는 북극성을 가리키고, ‘금’은 출입을 금한다는 뜻입니다. 마지막 황제 푸이는 퇴위한 뒤에도 1924년 쫓겨날 때까지 내정에 머물렀고, 이듬해 이곳은 고궁박물원으로 문을 열었습니다.",
        "줄을 서서라도 볼 만한 건 궁 전체의 배치입니다. 오문으로 들어가 곧은 중심축을 따라 북쪽으로 걷습니다. 마당은 갈수록 넓어지다가, 신하들이 품계대로 줄지어 서던 태화전 앞 광장(약 3만㎡)에서 가장 크게 트입니다. 건청문을 지나면 공간이 좁아지며 황제 가족이 살던 훨씬 아담한 내정으로 이어집니다.",
        "규모도 큽니다. 면적 72만㎡, 축구장 100개쯤 되는 넓이에 방이 9천 칸 가까이 됩니다. 한 번에 다 볼 수도 없고, 다 볼 필요도 없습니다.",
      ],
      highlights: [
        {
          name: "태화전",
          body: "궁에서 가장 큰 전각으로, 황제의 즉위식과 혼례가 열리던 곳입니다. 지붕 모서리를 올려다보면 경복궁 추녀마루에서 보던 잡상이 여기에도 보입니다. 봉황을 탄 선인 뒤로 짐승 열 개가 줄지어 있고, 맨 끝은 날개 달린 원숭이 얼굴의 ‘행십’입니다. 행십은 중국에서 이 지붕에만 있습니다. 선인까지 세면 열한 개로, 경회루와 같은 수입니다.",
        },
        {
          name: "진보관과 구룡벽",
          body: "비교적 한산한 동쪽의 영수궁 일대는 건륭제가 황위를 물려준 뒤 지내려고 고쳐 지었지만, 정작 황제 자신은 이곳에 들어와 살지 않았습니다. 지금은 진보관으로 쓰입니다. 입구 앞에는 색색의 유약 벽돌로 쌓은 길이 29m의 구룡벽이 있습니다. 안쪽 낙수당에는 옥을 산 모양으로 조각한 높이 2m 남짓의 옥산이 있는데, 자금성에 있는 옥 조각 가운데 가장 큽니다. 진보관은 입장권을 따로 사야 하니, 갈지 말지 예약 전에 정해 두세요.",
        },
        {
          name: "어화원",
          body: "북문 출구 바로 앞의 정원입니다. 구불구불한 오래된 측백나무와 가산이 있고, 가산 꼭대기에 정자가 하나 있습니다. 중심축의 그늘 없는 돌마당을 지나 처음으로 큰 나무 아래에서 쉴 수 있는 곳입니다.",
        },
      ],
      time: "궁 안에서 3시간이면 남북으로 이어진 중심축과 한쪽 구역을 둘러볼 수 있습니다. 그 전에 입구 보안 검색 시간도 넉넉히 잡으세요.",
      when: "오전 시간대로 예약하고 개장 전에 줄을 서서, 인파보다 먼저 큰 전각에 닿으세요. 궁 안은 10시쯤부터 이른 오후까지 가장 붐빕니다. 봄과 가을이 쾌적하고, 7~8월에는 돌마당이 뜨겁고 그늘이 거의 없습니다.",
      pair: "톈안먼 광장은 남쪽 끝에 있고 보안 검색을 따로 거치므로, 오전 시간이 넉넉할 때만 입장 전에 들르세요. 관람을 마치고도 걸을 힘이 남았다면 북문인 신무문으로 나와 길 건너 경산공원에 오르세요. 꼭대기 만춘정에서 보면 자금성의 노란 기와지붕이 한눈에 펼쳐져, 방금 걸어온 길 전체를 되짚어 볼 수 있습니다.",
      skip: "전에 와 봤고 전시에도 큰 관심이 없다면 건너뛰어도 됩니다. 일행 중에 돌바닥을 3시간 걷기 힘든 분이 있어도 포기할 필요는 없습니다. 고궁박물원이 정한 2시간 관람 코스가 있습니다. 원하는 날짜의 예약이 다 찼다면 경산공원이 현실적인 대안입니다. 40분이면 궁 전체의 모습을 볼 수 있습니다.",
    },
  },
  "great-wall": {
    en: {
      description:
        "Badaling's west gate has read ‘Key to the Northern Gate’ since 1582. What to find there and at Mutianyu, and how a day on the Wall fits a Beijing trip.",
      why: [
        "Most of the wall you can walk near Beijing was built or rebuilt under the Ming dynasty, to keep horsemen from the northern steppe away from the capital. From the late 1560s the generals Tan Lun and Qi Jiguang pushed through a programme of hollow brick watchtowers. By 1572 there were 1,206 new ones on the frontier north and east of the city. Despite the old claim, you cannot pick the Wall out from orbit with the naked eye. China's first astronaut, Yang Liwei, looked in 2003 and did not see it.",
        "Badaling is the classic. Its pass fort dates from 1505 and closed the mountain road from the north to Beijing and the Ming tombs. An old saying holds that the strength of the Juyong Pass lay not in the pass itself but up here at Badaling. It was the first stretch of the Wall opened to visitors, in the 1950s. Since 1954 more than 540 foreign heads of state and government have climbed it, Richard Nixon in 1972 among them.",
        "Mutianyu, opened only in 1988, is the greener of the two. Vegetation covers more than 96 per cent of the land around it, and the wall climbs and dips through woods. Early in the Ming, the general Xu Da built it on the remains of a 6th-century wall, and Qi Jiguang strengthened it two centuries later. The restored stretch runs about two and a quarter kilometres along the ridge, with watchtowers close together.",
      ],
      highlights: [
        {
          name: "Badaling's pass fort",
          body: "Walk through the small fort at the foot of the wall. The inscription over its east gate, ‘Outer Garrison of Juyong’, was carved in 1539; the one over the west gate, ‘Key to the Northern Gate’, in 1582.",
        },
        {
          name: "Zhengguantai at Mutianyu",
          body: "Three watchtowers standing side by side on one platform, a layout rarely found anywhere else on the Wall. On the way there, look at the parapets. At Mutianyu both sides of the walkway are crenellated; most stretches have battlements on the outer side only.",
        },
        {
          name: "Inside a watchtower",
          body: "At either section, duck into one of the brick towers. Qi Jiguang's plan was for each to sleep a hundred men with their armour, weapons and food. In practice a tower was usually manned by thirty to fifty. Stand at an arrow window and follow the ridge with your eye to the next tower.",
        },
      ],
      time: "Most of a day from central Beijing, with two to three hours on the wall itself. Badaling by train can fit a long half-day; Mutianyu's longer road journey usually takes the whole day.",
      when: "An ordinary weekday outside the national holidays, with an early start, gives you the best chance of space on the wall. Autumn usually brings clear air and colour on the ridges, though no date is certain. Winter is sharp and bare, but windy and often icy underfoot.",
      pair: "From Badaling, stop at the Ming Tombs in Changping on the way back and walk the Sacred Way between its pairs of stone animals and officials. From Mutianyu, Hongluo Temple, founded in 338, is about 17 kilometres away. Its ‘three marvels’ are a bamboo grove, a male and a female ginkgo, and a wisteria climbing a pine. Add either only if the group still has energy.",
      skip: "Anyone after solitude or untouched wall: both sections are heavily restored and busy at popular times. For a long walk, our section guide covers Jinshanling, which is further out and makes a longer day. If you have two days or less in Beijing, a day on the Wall may cost you the Forbidden City or the Temple of Heaven, so decide which matters more.",
    },
    zh: {
      description: "北京八达岭关城西门上的“北门锁钥”，刻于 1582 年。八达岭和慕田峪各有什么值得找，去长城的一天怎么安排。",
      why: [
        "北京附近能登上去的长城，大多是明朝修筑或重修的，为的是挡住北方草原的骑兵，护住京城。隆庆年间，谭纶、戚继光力主在京城以北、以东的防线上修建空心敌楼，到 1572 年，新建的敌楼已有 1206 座。常听人说在太空能用肉眼看见长城，其实不然。2003 年，中国首位航天员杨利伟在太空中找过，没有看到。",
        "八达岭是最经典的一段。关城建于 1505 年，扼守着从北方通往京城和明十三陵的山路。古人说：“居庸之险不在关，而在八达岭。”二十世纪五十年代，这里成了长城上最早向游人开放的地段。1954 年以来，已有 540 多位外国元首和政府首脑登上八达岭，1972 年访华的尼克松也在其中。",
        "慕田峪 1988 年才正式开放，比八达岭更绿。周围植被覆盖率超过 96%，城墙在林子里起起伏伏。明初大将徐达在北齐长城的旧址上督建了这段城墙，两百年后戚继光又重修过。如今修缮开放的一段沿山脊长约 2.25 公里，敌楼一座挨着一座。",
      ],
      highlights: [
        {
          name: "八达岭关城",
          body: "从城墙脚下的小关城穿过去。东门门额上的“居庸外镇”刻于 1539 年，西门的“北门锁钥”刻于 1582 年。",
        },
        {
          name: "慕田峪正关台",
          body: "三座敌楼并排立在同一座台上，这种形制在长城上很少见。一路上留意两侧的垛口：慕田峪的城墙内外两边都有，而多数地段只在外侧筑垛口。",
        },
        {
          name: "走进敌楼",
          body: "不管去哪一段，都钻进一座砖砌的敌楼看看。按戚继光的设想，每座楼能住一百人，盔甲、兵器、干粮一应俱全；实际驻守的，通常是三五十人。站在箭窗前，顺着山脊望向下一座敌楼。",
        },
      ],
      time: "从北京市区出发，这一趟基本要占掉一天，城墙上留两三个小时。坐火车去八达岭，安排紧凑的话大半天就能来回；慕田峪路远，通常要花一整天。",
      when: "挑节假日以外的平日，尽早出发，城墙上才可能人少一些。秋天常常天高气爽，山上有红叶，但哪天最好说不准。冬天草木落尽，山脊线条格外分明，只是风大，脚下还可能结冰。",
      pair: "去八达岭的话，回程可以在昌平的明十三陵停一下，走一走神路，两旁立着成对的石兽和文武官员石像。去慕田峪的话，约 17 公里外有红螺寺，始建于东晋咸康四年（338 年），以“红螺三绝”出名，即御竹林、雌雄银杏和紫藤寄松。这两处都只在大家还有余力时再加。",
      skip: "想要清静、想看原汁原味城墙的人：这两段都修缮得很彻底，旺季游客也多。想多走些路，可以看我们长城选段攻略里的金山岭，离市区更远，一天也更长。如果在北京只有两天甚至更少，去一天长城，可能就得舍掉故宫或天坛，先想好哪个对你更要紧。",
    },
    ko: {
      description: "베이징 만리장성 팔달령의 관성 서문에는 1582년에 새긴 ‘북문쇄약’ 네 글자가 있습니다. 팔달령과 무톈위에서 찾아볼 것, 장성 하루를 일정에 넣는 법까지.",
      why: [
        "베이징 근교에서 오를 수 있는 만리장성은 대부분 명나라 때 쌓거나 고쳐 쌓은 것으로, 북방 초원의 기병을 막아 수도를 지키려던 성벽입니다. 1560년대 말부터 담륜과 척계광이 앞장서 공심적대(空心敵臺, 안이 비어 군사가 머물 수 있는 벽돌 적루)를 짓게 했고, 1572년까지 베이징 북쪽과 동쪽 방어선에 새 적루 1,206개가 들어섰습니다. 우주에서 맨눈으로 장성이 보인다는 말은 사실이 아닙니다. 중국 첫 우주비행사 양리웨이는 2003년 궤도에서 직접 찾아보았지만 보지 못했다고 말했습니다.",
        "팔달령은 가장 대표적인 구간입니다. 관성(關城, 관문을 지키는 작은 성)은 1505년에 세워져 북쪽에서 베이징과 명십삼릉으로 들어오는 산길을 막았고, 옛사람들은 ‘거용관의 험준함은 관문이 아니라 팔달령에 있다’고 했습니다. 만리장성에서 가장 먼저 관광객을 받은 곳으로, 1950년대에 개방되었습니다. 1954년 이후 외국 정상 540여 명이 이곳에 올랐고, 1972년 중국을 찾은 닉슨 미국 대통령도 그중 한 명입니다.",
        "1988년에야 정식으로 개방된 무톈위는 팔달령보다 더 푸릅니다. 주변 산의 96% 이상이 숲과 풀로 덮여 있고, 성벽이 숲속을 오르내립니다. 명나라 초 장수 서달이 6세기 북제 장성 터 위에 쌓았고, 200년 뒤 척계광이 고쳐 쌓았습니다. 복원된 구간은 능선을 따라 약 2.25km 이어지며, 적루가 촘촘히 늘어서 있습니다.",
      ],
      highlights: [
        {
          name: "팔달령 관성",
          body: "성벽 아래 작은 관성 안을 걸어서 통과해 보세요. 동문 위의 ‘거용외진(居庸外鎭, 거용관 바깥을 지키는 진)’은 1539년에, 서문 위의 ‘북문쇄약(北門鎖鑰, 북쪽 관문을 지키는 열쇠라는 뜻)’은 1582년에 새긴 글씨입니다.",
        },
        {
          name: "무톈위 정관대",
          body: "적루 세 채가 하나의 대(臺) 위에 나란히 선 모습으로, 만리장성에서 보기 드문 형태입니다. 가는 길에 성가퀴도 눈여겨보세요. 대부분의 구간은 바깥쪽에만 성가퀴가 있지만, 무톈위는 성벽 위 길 양쪽에 모두 있습니다.",
        },
        {
          name: "적루 내부",
          body: "팔달령이든 무톈위든 벽돌 적루 안에 한 번 들어가 보세요. 척계광은 왜구와 싸우며 병서 『기효신서』를 엮은 장수로, 이 책은 임진왜란 때 조선에 전해져 훈련도감의 교범이 되었습니다. 그는 적루 하나에 군사 100명이 갑옷과 무기, 식량을 갖추고 머물도록 계획했지만, 실제로는 보통 30~50명이 지켰습니다. 활을 쏘던 창문 앞에 서서 능선을 따라 다음 적루까지 눈으로 좇아가 보세요.",
        },
      ],
      time: "베이징 시내에서 출발하면 하루의 대부분을 쓰고, 성벽 위에서는 2~3시간을 보냅니다. 기차로 가는 팔달령은 빠듯하게 잡으면 반나절 남짓이면 다녀올 수 있지만, 길이 먼 무톈위는 대개 하루를 다 씁니다.",
      when: "중국 연휴를 피해 평일에 일찍 출발해야 성벽 위가 그나마 여유롭습니다. 가을은 대체로 공기가 맑고 능선에 단풍이 들지만, 어느 날이 가장 좋을지는 장담할 수 없습니다. 겨울에는 잎이 다 져서 능선이 또렷하지만, 바람이 세고 길이 얼어 미끄러울 때가 많습니다.",
      pair: "팔달령에 간다면 돌아오는 길에 창핑의 명십삼릉에 들러, 돌짐승과 문무관 석상이 짝지어 늘어선 신도(神道, 능으로 들어가는 길)를 걸어 보세요. 무톈위에 간다면 약 17km 떨어진 곳에 홍라사가 있습니다. 동진 때인 338년에 세운 절로, 대나무 숲과 암수 한 쌍의 은행나무, 소나무를 타고 오른 등나무가 ‘홍라사의 세 가지 명물’로 꼽힙니다. 두 곳 모두 일행에게 아직 힘이 남아 있을 때만 일정에 넣으세요.",
      skip: "한적한 곳이나 손대지 않은 옛 성벽을 원한다면 두 곳 모두 맞지 않습니다. 많이 복원되었고 성수기에는 붐빕니다. 오래 걷고 싶다면 장성 구간 선택 가이드에서 진산링을 참고하세요. 시내에서 더 멀어 하루가 더 길어집니다. 베이징에 이틀 이하로 머문다면 장성에 하루를 쓰는 만큼 자금성이나 천단을 빼야 할 수 있으니, 무엇이 더 중요한지 먼저 정하세요.",
    },
  },
  "temple-of-heaven": {
    en: {
      description:
        "Beijing's Temple of Heaven is built on circles and squares. Find the hall of 28 pillars, the altar paved in rings of nine and the card players' corridor.",
      why: [
        "For almost five centuries this was where China's emperors made their sacrifices to heaven. The Yongle Emperor, builder of the Forbidden City, founded it in 1420. The open-air Circular Mound in the south was added in 1530, and from then on the emperor worshipped heaven there each winter solstice. Early in the lunar new year he came back to pray for the harvest in the round hall to the north. The last man to perform the rite here was Yuan Shikai, in 1914, while he was preparing to make himself emperor. On New Year's Day 1918 the grounds opened as a public park.",
        "The whole site follows the old idea that heaven is round and the earth square. The outer wall curves along the north side and runs square along the south. The Circular Mound sits inside a round low wall, which sits inside a square one, and its stones are counted in nines, the number that belonged to heaven. Between altar and hall runs the Danbi Bridge, a raised walkway 360 metres long. It starts about a metre above the ground and ends about three metres up, so you climb without noticing the slope.",
        "The park covers 273 hectares, close to four times the size of the Forbidden City, and holds some 3,500 old trees, most of them cypresses. Much of that space is Beijing's own back garden. From early morning the woods fill with people doing tai chi, dancing, singing and playing cards, and the park has added ramps and coat racks beside its exercise spots.",
      ],
      highlights: [
        {
          name: "The Hall of Prayer for Good Harvests",
          body: "Until the 1750s the round hall's three roofs were blue, yellow and green; the Qianlong Emperor had them all tiled blue. Look in at the 28 pillars: the inner four stand for the seasons, the next twelve for the months and the outer twelve for the day's two-hour watches. Lightning burned the hall in 1889, and it was rebuilt to the old design by 1896.",
        },
        {
          name: "The Circular Mound Altar",
          body: "Three tiers of stone open to the sky, where the winter-solstice rite took place. On the top tier the round stone in the middle is ringed by nine slabs, the next ring by eighteen, and so on out to eighty-one in the ninth. Count the balustrade panels too. Across the three tiers they add up to 360.",
        },
        {
          name: "The Long Corridor",
          body: "An L-shaped covered gallery of 72 bays east of the Hall of Prayer. It was built as a closed passage, so that offerings could be carried under cover from the slaughterhouse and kitchens to the altar. It was opened up as a walkway in 1937, and its benches are where Beijing's retirees now gather for cards and chess.",
        },
      ],
      time: "Two to three hours for the Hall of Prayer, the Echo Wall, the Circular Mound and the walk between them. Come an hour earlier if you want the park's morning life as well.",
      when: "Early. The park gates open well before the monuments, and the woods are at their liveliest in the first hours. A clear autumn or winter day sets the blue roofs against a blue sky. To try the Echo Wall, go on a weekday morning. It needs a quiet courtyard, and even then it may not carry your voice.",
      pair: "Qianmen Street and the Dashilar lanes are two stops north of Tianqiao on Metro Line 8, or a short taxi ride from the North Gate.",
      skip: "If you have only one day for Beijing's imperial sights, give it to the Forbidden City. If formal monuments leave you cold, skip the three and just walk the woods early in the morning. The park ticket is enough for that, and you see how Beijing spends its mornings.",
    },
    zh: {
      description: "北京天坛处处讲“天圆地方”，数字离不开九。去找 28 根柱子的祈年殿、石板按九的倍数铺成的圜丘，还有坐满牌友棋友的七十二长廊。",
      why: [
        "近五百年里，这里是皇帝祭告上天的地方。天坛始建于 1420 年，和紫禁城一样，是永乐皇帝下令修建的。1530 年，南边加建了露天的圜丘，此后每年冬至，皇帝都到这里祭天；正月里，再到北边那座圆形大殿祈求五谷丰登。最后一个在这里祭天的是袁世凯，那是 1914 年，他正一步步筹划称帝。1918 年元旦，天坛辟为公园，向公众开放。",
        "整座天坛都按“天圆地方”的观念布局。外坛墙北圆南方；圜丘外面围着两道矮墙，里圆外方；坛上的石板、栏板，数目都是九或九的倍数。九是阳数之极，象征天。圜丘和祈年殿之间是丹陛桥，一条长 360 米的砖石甬道，南端只高出地面约 1 米，北端约 3 米。顺着它往北走，几乎觉不出坡度，人却在慢慢升高。",
        "天坛占地 273 万平方米，将近故宫的四倍，园里有 3500 多株古树，大多是柏树。这片园子有很大一部分，其实是北京人自家的后花园。天一亮，柏树林里就有人打太极、跳舞、唱歌、打牌，公园还在晨练的地方加了坡道和挂衣架。",
      ],
      highlights: [
        {
          name: "祈年殿",
          body: "这座圆殿的三重檐原本是上青、中黄、下绿，十八世纪五十年代乾隆下令改建，才统一换成青色琉璃瓦。从门口往里看那 28 根柱子：中间 4 根象征四季，往外 12 根象征十二个月，最外圈 12 根象征一天的十二个时辰。1889 年大殿遭雷火焚毁，1896 年按原样重建完工。",
        },
        {
          name: "圜丘",
          body: "三层露天的石台，冬至祭天就在这里举行。上层正中是一块圆形的天心石，往外第一圈石板 9 块，第二圈 18 块，依次递增，到第九圈正好 81 块。再数数栏板，三层加起来一共 360 块。",
        },
        {
          name: "七十二长廊",
          body: "祈年殿东边一条曲尺形的长廊，共 72 间。它原本是封闭的通道，祭祀时，供品从宰牲亭、神厨经这里送上祭坛，不受风雨。1937 年改成敞开的游廊，如今廊下的长椅上，常常坐满打牌下棋的老人。",
        },
      ],
      time: "两三个小时，看完祈年殿、回音壁和圜丘，再走一走中间的丹陛桥。想赶上公园早上的热闹，就再早来一个小时。",
      when: "早点来。公园比几处古建筑开门早得多，一早正是柏树林里最热闹的时候。秋冬的晴天，蓝瓦衬着蓝天最好看。想试试回音壁，就挑平日上午。院子里得足够安静，即便这样，声音也不一定传得过去。",
      pair: "从地铁 8 号线天桥站往北坐两站就到前门，前门大街和大栅栏的胡同都在那一带；从北门打车过去也不远。",
      skip: "如果只有一天看北京的皇家古迹，先去故宫。对礼制建筑没兴趣的人，祈年殿、回音壁和圜丘都可以不看，一早进公园，在柏树林里走走就好。买公园门票就够了，还能看看北京人怎么过早晨。",
    },
    ko: {
      description: "베이징 천단은 둥근 하늘과 네모난 땅을 본떠 지었습니다. 기둥 28개의 기년전, 9의 배수로 돌을 깐 원구단, 노인들이 카드놀이와 장기를 즐기는 칠십이장랑까지.",
      why: [
        "500년 가까이 중국 황제가 하늘에 제사를 올리던 곳입니다. 자금성을 지은 영락제가 1420년에 세웠습니다. 남쪽의 야외 제단 원구단은 1530년에 더해졌고, 그 뒤로 황제는 해마다 동지에 이곳에서 하늘에 제사를 지냈습니다. 음력 정월에는 북쪽의 둥근 전각에서 풍년을 빌었습니다. 이곳에서 마지막으로 하늘에 제사를 올린 사람은 위안스카이입니다. 1882년 임오군란 직후 조선에 들어와 1894년까지 내정에 간섭하던 바로 그 인물로, 1914년 이곳에서 제사를 올릴 때 그는 스스로 황제가 될 준비를 하고 있었습니다. 1918년 1월 1일, 천단은 공원으로 문을 열었습니다.",
        "천단 전체가 ‘하늘은 둥글고 땅은 네모나다’는 천원지방(天圓地方) 사상에 따라 배치되어 있습니다. 바깥 담장은 북쪽이 둥글고 남쪽이 네모납니다. 원구단은 안쪽의 둥근 낮은 담과 바깥쪽의 네모난 담에 둘러싸여 있고, 돌판과 난간 수는 모두 9의 배수입니다. 9는 한 자리 홀수 가운데 가장 큰 수로, 양(陽)의 극치이자 하늘을 상징합니다. 원구단과 기년전 사이에는 길이 360m의 단폐교(높이 돋운 돌길)가 놓여 있는데, 남쪽 끝은 지면보다 1m쯤, 북쪽 끝은 3m쯤 높습니다. 북쪽으로 걷는 동안 경사를 거의 느끼지 못한 채 조금씩 올라갑니다.",
        "면적은 273만㎡로 자금성의 네 배 가까이 되고, 고목이 3,500그루 넘게 자라는데 대부분 측백나무입니다. 이 넓은 공원의 상당 부분은 베이징 사람들의 차지입니다. 이른 아침이면 숲은 태극권을 하고, 춤추고, 노래하고, 카드놀이를 하는 사람들로 붐빕니다. 공원은 운동하는 곳 곁에 경사로와 옷걸이까지 마련해 두었습니다.",
      ],
      highlights: [
        {
          name: "기년전",
          body: "1750년대 건륭제가 모두 푸른 기와로 바꾸기 전까지, 이 둥근 전각의 세 겹 지붕은 위부터 파랑·노랑·초록이었습니다. 문 앞에서 기둥 28개를 들여다보세요. 가운데 4개는 사계절, 그다음 12개는 열두 달, 바깥 12개는 하루의 열두 시진(두 시간씩 나눈 옛 시각)을 뜻합니다. 1889년 벼락으로 불탄 뒤 1896년 옛 모습대로 다시 지었습니다.",
        },
        {
          name: "원구단",
          body: "지붕 없이 하늘로 트인 3층 돌 제단으로, 동지 제사를 올리던 곳입니다. 맨 위층 한가운데 둥근 천심석을 첫째 고리의 돌판 9장이 둘러싸고, 둘째 고리는 18장, 이렇게 늘어나 아홉째 고리는 81장입니다. 난간 판석도 세 층을 합치면 360장입니다. 하늘 제사는 황제만 지낼 수 있었기에, 1897년 대한제국 황제에 오른 고종은 서울 소공동에 한자가 같은 환구단(圜丘壇, ‘원구단’으로도 읽습니다)을 쌓고 그곳에서 하늘에 제사를 올렸습니다.",
        },
        {
          name: "칠십이장랑",
          body: "기년전 동쪽으로 ㄱ자로 꺾여 이어지는 72칸짜리 회랑입니다. 원래는 막힌 통로로, 제사 때 짐승을 잡고 음식을 장만하던 건물에서 제단까지 비바람을 피해 제물을 나르던 길이었습니다. 1937년 트인 회랑으로 바뀌었고, 지금은 긴 의자에 노인들이 모여 카드놀이를 하고 장기를 둡니다.",
        },
      ],
      time: "기년전·회음벽·원구단 세 곳과 그 사이를 걷는 데 2~3시간이면 됩니다. 공원의 아침 풍경까지 보고 싶다면 한 시간 일찍 오세요.",
      when: "일찍 오세요. 공원 문은 주요 건축물보다 훨씬 먼저 열리고, 숲은 이른 시간에 가장 활기찹니다. 맑은 가을이나 겨울날에는 푸른 기와가 파란 하늘과 어우러집니다. 회음벽(벽에 대고 말하면 소리가 둥근 담을 타고 건너편까지 전해진다는 담장)을 직접 해 보고 싶다면 평일 오전을 고르세요. 마당이 충분히 조용해야 하고, 조용해도 소리가 잘 전해지지 않을 때가 있습니다.",
      pair: "지하철 8호선 톈차오역에서 북쪽으로 두 정거장 가면 전문대가와 다자란(大柵欄) 골목이 나옵니다. 북문에서 택시로 가도 금방입니다.",
      skip: "베이징 황실 유적에 하루밖에 쓸 수 없다면 자금성에 쓰세요. 제사용 건축물에 별 관심이 없다면 세 건축물은 건너뛰고, 아침 일찍 공원 숲만 걸어도 됩니다. 공원 입장권으로 충분하고, 베이징 사람들이 아침을 어떻게 보내는지 가까이서 볼 수 있습니다.",
    },
  },
  "summer-palace": {
    en: {
      description:
        "Beijing's Summer Palace grew around a reservoir; Cixi rebuilt it in the 1880s. Find the painted corridor, the stone boat and the bricked-up passages.",
      why: [
        "The Summer Palace began as a waterworks. In 1749 and 1750 the Qianlong Emperor had an old lake in the north-western suburbs dredged to twice its old size and depth, as a reservoir for the imperial gardens. He named it Kunming Lake and renamed the hill above it Longevity Hill, for his mother's sixtieth birthday. Around both he laid out a garden, Qingyiyuan. Water still makes up about three quarters of the grounds.",
        "British and French troops burned it in 1860. The Empress Dowager Cixi rebuilt it from the 1880s, gave it its present name, Yiheyuan, in 1888, and spent long stretches of each year here. Some of the money came out of the Admiralty's funds; how much is still argued over. Foreign troops damaged it again in 1900, and it was repaired within two years.",
        "Much of the garden plays at being somewhere else. The West Causeway copies the Su Causeway in Hangzhou, and behind Longevity Hill, Suzhou Street imitates a canal town in the south. When the court came by, eunuchs and palace maids staffed its shops so that the imperial family could go shopping. The street burned in 1860 too, and what you walk today is a modern rebuild.",
      ],
      highlights: [
        {
          name: "The Long Corridor",
          body: "Some 728 metres of covered walkway along the lake shore, with more than 14,000 paintings on its beams. Look up for story scenes from Romance of the Three Kingdoms, Journey to the West and the other classic novels.",
        },
        {
          name: "The Hall of Jade Ripples",
          body: "A small lakeside courtyard near the East Palace Gate, where the Guangxu Emperor stayed when the court was here. After his reforms collapsed in 1898, Cixi kept him here under guard, and the passages through the side halls were walled up with brick. Look into the two side halls: the brick walls are still there.",
        },
        {
          name: "The Marble Boat",
          body: "A 36-metre hull of stone, moored by the shore at the western end of the Long Corridor since 1755. Its wooden cabin burned in 1860, and in 1893 Cixi had it rebuilt in Western style, with paddle wheels carved on the sides. The cabin only looks like stone; it is painted wood. A year later came the war with Japan in which China's Beiyang Fleet was destroyed.",
        },
      ],
      time: "Three to four hours to walk one route from one gate to another. A boat across the lake saves legs but can add waiting. Make it a full day if you add the Old Summer Palace.",
      when: "The park opens early, so a morning start gives you the lake shore while it is cool. In spring, magnolias flower in the courtyard of Cixi's Hall of Happiness and Longevity. The old one by the Yaoyue Gate is the only survivor of the fire of 1860, regrown from a burned trunk. Peach trees bloom along the West Causeway. On clear evenings for a few days around the winter solstice, the setting sun lines up with the Seventeen-Arch Bridge. It lights all seventeen arches at once, the ‘golden light through the arches’.",
      pair: "If you still have the legs, the Old Summer Palace is on Metro Line 4, one stop south of Xiyuan or two from Beigongmen. The same British and French troops burned it in 1860. Jesuit missionaries had designed its European-style palaces for Qianlong, and their carved stone ruins are still there in pieces.",
      skip: "It sits in the north-western suburbs, so even a short visit takes half a day. If time is tight, Beihai Park, next to Jingshan in the centre, is a smaller imperial lake garden with a white dagoba on its island. If Hangzhou is on your route, you will see the original there, the West Lake this garden copies.",
    },
    zh: {
      description: "北京颐和园的昆明湖，起初是乾隆拓宽的一座水库。长廊彩画、石舫，还有光绪被软禁时用砖墙堵死的通道，都值得去找。",
      why: [
        "颐和园的来历，要从一项水利工程说起。1749 年冬到 1750 年初，乾隆命人疏浚京城西北郊的瓮山泊，把湖面拓宽一倍、湖底挖深一倍，用来给西郊的皇家园林供水。他把这片湖命名为昆明湖，又为母亲六十大寿，把湖边的瓮山改名万寿山，围着山水修起了清漪园。直到今天，园子里大约四分之三还是水面。",
        "1860 年，英法联军一把火烧了清漪园。十九世纪八十年代起，慈禧动工重修，1888 年改名颐和园，此后每年都要在这里住上很长一段时间。重修的钱，有一部分是从海军衙门的经费里挪来的；究竟挪了多少，史学界至今还有争论。1900 年八国联军进京，园子再遭破坏，两年后修复。",
        "园里不少景致，仿的都是别处。西堤仿的是杭州西湖的苏堤；万寿山后面的苏州街，仿的是江南水乡的街市。皇帝和后妃来逛的时候，太监、宫女就扮成店伙计，陪着做买卖。苏州街 1860 年也被烧毁，今天走的这条街是近几十年复建的。",
      ],
      highlights: [
        {
          name: "长廊",
          body: "长廊沿湖岸绵延 728 米，梁枋上绘有一万四千多幅彩画。抬头找找《三国演义》《西游记》等名著里的故事。",
        },
        {
          name: "玉澜堂",
          body: "东宫门内、昆明湖边的一座小院，是光绪皇帝在园里的寝宫。1898 年戊戌变法失败后，每逢慈禧住进颐和园，就把他软禁在这里，两侧配殿里通往仁寿殿和湖岸的通道都用砖墙堵死了。往霞芬室和藕香榭里看看，那两道砖墙至今还在。",
        },
        {
          name: "石舫",
          body: "又叫清晏舫，36 米长的船身用石头砌成，1755 年起就停在长廊西头的湖边。上面的木舱楼 1860 年被烧，1893 年慈禧把它重建成西洋式样，船身两侧还刻上了明轮。舱楼看着像石头，其实是木结构，漆成了石头的样子。第二年，甲午战争爆发，北洋水师最终全军覆没。",
        },
      ],
      time: "从一个门进、另一个门出，走一条路线要三到四个小时。坐船过湖能省些脚力，但可能要排队。加上圆明园，就是一整天。",
      when: "公园开门很早，早上来，可以趁凉快先逛湖边。春天，慈禧住过的乐寿堂院里玉兰盛开，邀月门旁那株老玉兰，是 1860 年大火后唯一留下的一株，烧过的主干又长出了新叶；西堤上的桃花也开了。冬至前后几天，赶上晴天的傍晚，夕阳正对着十七孔桥，把十七个桥洞同时照亮，这就是“金光穿洞”。",
      pair: "如果还走得动，坐地铁 4 号线往南，从西苑站一站、从北宫门站两站，就到圆明园。它也是 1860 年被同一批英法联军焚毁的。园里的西洋楼是耶稣会传教士为乾隆设计的，如今只剩一片残破的雕花石构件。",
      skip: "颐和园在西北郊，就算只是匆匆看看，也得花上半天。时间紧的话，可以去市中心景山旁边的北海公园。它同样是皇家湖景园林，规模小一些，湖中琼华岛上立着一座白塔。要是行程里还有杭州，颐和园模仿的原版西湖，到那儿就能亲眼看到。",
    },
    ko: {
      description: "베이징 이화원의 곤명호는 원래 건륭제가 넓혀 만든 저수지였습니다. 그림으로 가득한 장랑, 돌로 만든 배, 광서제를 가두며 벽돌로 막은 통로를 찾아보세요.",
      why: [
        "이화원은 저수지 공사에서 시작되었습니다. 1749년 겨울부터 이듬해 초까지 건륭제는 베이징 서북쪽 교외의 옛 호수를 준설해 넓이와 깊이를 두 배로 늘리고, 서쪽 교외의 황실 정원들에 물을 대는 저수지로 삼았습니다. 호수에는 곤명호(쿤밍호)라는 이름을 붙이고, 옆 산의 이름은 어머니의 60세 생신을 기려 만수산으로 고친 뒤, 그 둘레에 청의원이라는 정원을 지었습니다. 지금도 이화원 면적의 약 4분의 3이 물입니다.",
        "1860년 영국·프랑스 연합군이 이곳을 불태웠습니다. 서태후는 1880년대부터 다시 지어 1888년 이화원이라는 이름을 붙였고, 해마다 긴 기간을 이곳에서 지냈습니다. 공사비 일부는 청나라 해군 관청인 해군아문의 경비에서 끌어다 썼는데, 얼마를 썼는지는 지금도 의견이 갈립니다. 1900년 8개국 연합군에 다시 훼손되었다가 2년 뒤 복구되었습니다.",
        "정원 곳곳이 다른 지방의 이름난 풍경을 옮겨 왔습니다. 서제는 항저우 서호의 소제를 본떴고, 만수산 뒤편의 쑤저우제는 강남 수향(물길을 낀 마을)의 운하 거리를 옮겨 놓았습니다. 황제 일가가 들르면 환관과 궁녀가 상인으로 분장해 가게를 지켰습니다. 쑤저우제도 1860년에 불탔고, 지금 걷는 거리는 근래에 다시 지은 것입니다.",
      ],
      highlights: [
        {
          name: "장랑",
          body: "호숫가를 따라 728m 이어지는 지붕 덮인 회랑으로, 들보에 채색화가 1만 4천 폭 넘게 있습니다. 고개를 들어 『삼국지연의』, 『서유기』 같은 고전 소설의 장면을 찾아보세요.",
        },
        {
          name: "옥란당",
          body: "동궁문 가까운 호숫가의 작은 안뜰로, 궁정이 이화원에 오면 광서제가 머물던 곳입니다. 1898년 무술변법이 실패한 뒤 서태후는 이화원에 머물 때마다 광서제를 이곳에 가두었고, 양쪽 곁채 안에 벽돌 벽을 쌓아 인수전과 호숫가로 통하던 길을 막았습니다. 하분실과 우향사 안을 들여다보면 그때 쌓은 벽이 아직 남아 있습니다.",
        },
        {
          name: "석방",
          body: "청안방(淸晏舫)이라고도 하는 돌배로, 길이 36m의 선체를 돌로 쌓았고 1755년부터 장랑 서쪽 끝 호숫가에 놓여 있습니다. 위의 나무 선실은 1860년에 불탔고, 1893년 서태후가 서양식으로 다시 지으면서 선체 양옆에 외륜(배를 움직이는 물레바퀴)까지 새겼습니다. 선실은 돌처럼 보이지만 칠을 한 나무입니다. 이듬해 조선을 둘러싸고 청일전쟁이 일어났고, 청의 북양함대는 결국 전멸했습니다.",
        },
      ],
      time: "한 문으로 들어가 다른 문으로 나오는 동선 하나에 3~4시간이 걸립니다. 배로 호수를 건너면 다리는 덜 아프지만 줄을 서야 할 수도 있습니다. 원명원까지 더하면 하루 일정입니다.",
      when: "공원은 일찍 문을 여니, 아침에 와서 선선할 때 호숫가부터 걸으세요. 봄에는 서태후가 살던 낙수당 안뜰에 목련이 피는데, 요월문 옆의 늙은 목련은 1860년의 불길에서 유일하게 살아남아, 불탄 줄기에서 다시 잎을 틔웠습니다. 서제에는 복숭아꽃도 핍니다. 동지 전후 며칠, 맑은 날 해 질 녘에는 지는 해가 십칠공교와 일직선이 되어 다리 구멍 17개가 한꺼번에 금빛으로 물듭니다. 이를 ‘금광천동(金光穿洞)’이라고 부릅니다.",
      pair: "걸을 힘이 남았다면 지하철 4호선으로 시위안역에서 한 정거장, 베이궁먼역에서 두 정거장 가면 원명원입니다. 1860년 같은 영국·프랑스 연합군에 불탄 곳으로, 예수회 선교사들이 건륭제를 위해 설계한 서양식 궁전의 조각된 석재가 부서진 채 남아 있습니다.",
      skip: "이화원은 베이징 서북쪽 교외에 있어 짧게 둘러봐도 반나절이 걸립니다. 시간이 빠듯하다면 도심 경산공원 옆의 북해공원에 가 보세요. 이화원보다 작지만, 호수 가운데 섬에 백탑이 선 황실 정원입니다. 일정에 항저우가 있다면, 이 정원이 본뜬 원조 서호를 그곳에서 직접 보게 됩니다.",
    },
  },
  "national-museum": {
    en: {
      description:
        "Villagers hid ancient China's heaviest known bronze vessel from Japanese troops in 1939. Three finds at Beijing's National Museum, and how to pace it.",
      why: [
        "The museum began with the republic. In 1912, the year the last emperor abdicated, the educator Cai Yuanpei and the writer Lu Xun pushed for a national history museum. Its present building on the east side of Tiananmen Square went up as one of ten landmark buildings for the People's Republic's tenth anniversary in 1959. The building housed two museums, of Chinese history and of the revolution, and in 2003 they merged as the National Museum of China.",
        "The reason to come is its basic exhibition, Ancient China. About 2,000 objects, 521 of them graded first-class, fill eight sections, one for each era from the earliest humans to the Ming and Qing. One walk gives you the whole run of dynasties in order. That makes it a good grounding before Xi'an or any other old capital on your route.",
        "A rebuilding completed in 2012 brought the floor area to nearly 200,000 square metres, with 48 galleries. The museum calls it the largest single museum building in the world. Its collection runs to more than 1.43 million objects. A second permanent exhibition, The Road of Rejuvenation, tells China's story from the Opium War of 1840 onwards.",
      ],
      highlights: [
        {
          name: "The Houmuwu Ding",
          body: "A late Shang bronze cauldron 133 centimetres tall and 832.84 kilograms in weight, the heaviest bronze vessel known from ancient China. Villagers in Anyang dug it up in 1939, buried it again to keep it from Japanese troops, and brought it out for good in 1946. Older books call it the Simuwu Ding; the museum changed the reading in 2011.",
        },
        {
          name: "The Four-Ram Square Zun",
          body: "A Shang wine vessel about 58 centimetres tall, with a curly-horned ram's head jutting from each corner. Found in Hunan in 1938, it was blown into more than twenty pieces in a wartime air raid, and the fragments were found and pieced together in 1952.",
        },
        {
          name: "The Storyteller Beating a Drum",
          body: "An Eastern Han pottery figure, 56 centimetres tall, from a tomb at Tianhuishan in Chengdu. Bare-chested and pot-bellied, he tucks a drum under one arm, raises the stick and laughs. Han storytellers drummed and sang their tales, and he has been mid-joke for nearly two thousand years.",
        },
      ],
      time: "About three hours buys you Ancient China at a steady pace and a sit-down in the middle. A whole day would not cover the building.",
      when: "Keep it for a day of rain, heat or haze, when the outdoor sights lose their appeal. The summer school holidays are the busiest weeks and the hardest to book.",
      pair: "Tian'anmen East station on Metro Line 1 is by the museum's north side, and Wangfujing, for food and a stroll, is one stop east. Qianmen Street lies south of the square. Tiananmen Square has its own entry rules and security check, so plan it separately.",
      skip: "Anyone who is not a museum person, or who has a day or two in Beijing with the Forbidden City still to see. If Xi'an is on your route, its Shaanxi History Museum covers the Zhou to Tang centuries close to where the objects were found.",
    },
    zh: {
      description: "后母戊鼎是已知最重的中国古代青铜礼器，1939 年出土后，安阳村民怕它落入日军之手，又埋回地下。北京中国国家博物馆先看哪三件、留多少时间。",
      why: [
        "国博的源头可以追到 1912 年。就在清帝退位那一年，蔡元培、鲁迅等人奔走推动，成立了国立历史博物馆筹备处。天安门广场东侧的这座大楼，是 1959 年为国庆十周年建成的“十大建筑”之一；2003 年，中国历史博物馆和中国革命博物馆合并，成了今天的中国国家博物馆。",
        "来这里，最值得看的是基本陈列“古代中国”。两千多件文物，其中一级文物 521 件，分成八个部分，从远古一路排到明清。要去西安或别的古都，先在这里走一遍，心里就有了一条时间线。",
        "2012 年改扩建完成后，国博的建筑面积近 20 万平方米，有 48 个展厅，馆方称这是世界上单体建筑面积最大的博物馆。藏品有 143 万余件。除了“古代中国”，另一个基本陈列“复兴之路”讲的是 1840 年鸦片战争以来的中国。",
      ],
      highlights: [
        {
          name: "后母戊鼎",
          body: "商代晚期的青铜方鼎，高 133 厘米，重 832.84 公斤，是目前已知最重的中国古代青铜礼器。1939 年在河南安阳出土后，村民怕被日军抢走，又把它埋回地下，直到 1946 年才重见天日。老书里叫它“司母戊鼎”，2011 年国博改用了现在的名字。",
        },
        {
          name: "四羊方尊",
          body: "商代的青铜酒器，高 58 厘米有余，四个角上各伸出一只卷角的羊头。1938 年在湖南宁乡出土，抗战时在一次空袭中被炸成二十多片，直到 1952 年才找回碎片，拼合修复。",
        },
        {
          name: "击鼓说唱俑",
          body: "成都天回山一座东汉墓里出土的陶俑，高 56 厘米。他光着膀子、腆着肚子，一手夹着小鼓，一手举起鼓槌，咧嘴大笑。汉代的说唱艺人就是这样边击鼓边说唱的，这个笑话他已经讲了快两千年。",
        },
      ],
      time: "留三个小时左右，从容看完“古代中国”，中间坐下来歇一歇。就算待一整天，也看不完整座楼。",
      when: "下雨、酷暑或者雾霾天，户外景点不好逛，正适合来这里。暑假人最多，也最难约上。",
      pair: "博物馆北边就是地铁 1 号线天安门东站，往东坐一站到王府井，吃饭、逛街都方便。天安门广场南边是前门大街；广场另有入场规定和安检，要单独安排。",
      skip: "对博物馆兴趣不大的人，或者在北京只有一两天、还没去故宫的人。行程里有西安的话，陕西历史博物馆讲的是周秦汉唐那一段，离文物出土的地方也更近。",
    },
    ko: {
      description: "중국 고대 청동 그릇 가운데 가장 무겁다고 알려진 후모무정은 1939년 일본군의 눈을 피해 다시 땅에 묻혔습니다. 베이징 중국 국가박물관에서 볼 세 점과 관람 시간까지.",
      why: [
        "국가박물관의 뿌리는 청나라 황제가 물러난 1912년으로 거슬러 올라갑니다. 그해 교육가 차이위안페이와 작가 루쉰 등이 앞장서 국립역사박물관 설립 준비 기구를 세웠습니다. 톈안먼 광장 동쪽의 지금 건물은 1959년 중화인민공화국 건국 10주년을 맞아 지은 ‘10대 건축’ 가운데 하나입니다. 2003년 중국역사박물관과 중국혁명박물관이 통합되어 지금의 중국 국가박물관이 되었습니다.",
        "가장 볼 만한 것은 상설 전시 ‘고대 중국’입니다. 국가 1급 문물 521점을 포함한 유물 2천여 점이 여덟 부분으로 나뉘어, 선사 시대부터 명·청까지 시대순으로 이어집니다. 시안 같은 옛 도읍에 가기 전에 이곳을 먼저 보면 머릿속에 연표가 하나 생깁니다.",
        "2012년 증·개축을 마친 뒤 연면적은 20만㎡ 가까이, 전시실은 48개가 되었습니다. 박물관 측은 단일 건물로는 세계에서 가장 큰 박물관이라고 소개합니다. 소장품은 143만 점이 넘습니다. 또 다른 상설 전시 ‘부흥의 길’은 1840년 아편전쟁 이후의 중국을 다룹니다.",
      ],
      highlights: [
        {
          name: "후모무정",
          body: "상나라 후기의 네모난 청동 솥으로, 높이 133㎝, 무게 832.84㎏이며, 지금까지 알려진 중국 고대 청동 그릇 가운데 가장 무겁습니다. 1939년 안양에서 출토된 뒤 마을 사람들이 일본군에게 빼앗길까 봐 도로 묻었고, 1946년에야 세상에 나왔습니다. 예전 책에는 ‘사모무정’으로 실려 있으며, 2011년 박물관이 지금 이름으로 바꿨습니다.",
        },
        {
          name: "사양방존",
          body: "상나라의 청동 술그릇으로, 높이 58㎝ 남짓에 네 모서리마다 뿔이 말린 양 머리가 튀어나와 있습니다. 1938년 후난성 닝샹에서 출토되었고, 중일전쟁 중 공습으로 스무 개 넘는 파편으로 부서졌다가 1952년 파편을 되찾아 복원했습니다.",
        },
        {
          name: "북 치는 설창용",
          body: "쓰촨성 청두 톈후이산의 후한(동한) 시대 무덤에서 나온 높이 56㎝의 토용입니다. 웃통을 벗고 배를 내민 채 한쪽 팔에 작은 북을 끼고, 다른 손으로 북채를 치켜들며 입을 크게 벌리고 웃습니다. 한나라의 설창(이야기와 노래를 섞은 공연) 예인은 이렇게 북을 치며 이야기를 들려주었고, 이 토용은 2천 년 가까이 같은 농담을 이어 가고 있습니다.",
        },
      ],
      time: "3시간쯤 잡으세요. ‘고대 중국’을 여유 있게 보고 중간에 앉아서 쉴 수 있습니다. 하루를 다 써도 건물 전체는 볼 수 없습니다.",
      when: "비가 오거나 몹시 덥거나 미세먼지가 심한 날, 야외 명소 대신 가기 좋습니다. 중국의 여름방학 기간이 가장 붐비고 예약도 가장 어렵습니다.",
      pair: "박물관 북쪽이 지하철 1호선 톈안먼둥역이고, 동쪽으로 한 정거장 가면 식당과 상점이 모인 왕푸징입니다. 톈안먼 광장 남쪽은 전문대가입니다. 광장은 입장 규정과 보안 검색이 따로 있으니 별도로 계획하세요.",
      skip: "박물관에 큰 관심이 없거나, 베이징에 하루이틀밖에 없는데 아직 자금성도 못 봤다면 건너뛰어도 됩니다. 시안에 간다면 산시역사박물관에서 주·진·한·당의 유물을 그것이 출토된 땅 가까이에서 볼 수 있습니다.",
    },
  },
  "west-lake": {
    en: {
      description:
        "Hangzhou pulled down West Lake's park fences in 2002; the shore has been free ever since. What to see, the quiet hours, and how to add Lingyin Temple.",
      why: [
        "West Lake is a made landscape. Two of Hangzhou's governors were famous poets. Bai Juyi built a dyke here in the 820s; it has long gone, and the Bai Causeway that bears his name was there before him. In 1090 Su Dongpo had the lake dredged and the mud piled into the causeway named after him. The ten classic views were named in the 13th century, and most of those names are still in use. The Qianlong Emperor modelled a causeway at the Summer Palace in Beijing on Su's, and UNESCO, listing West Lake in 2011, credits it with influencing gardens in Japan and Korea too.",
        "It is free, by choice. In 2002 Hangzhou began taking down the fences around its lakeside parks and stopped charging for them; today the whole shore, about 15 kilometres round, is open park with no gate, day and night. You pay only for extras such as a boat to the islands or Leifeng Pagoda.",
        "The scenery is gentle: willows, lotus, low hills on three sides and a pagoda on the skyline. The fourth side is the modern city; for the old view, stand with your back to it.",
      ],
      highlights: [
        {
          name: "The Su Causeway",
          body: "Almost three kilometres of willows and peach trees from the south shore to the north, broken by six arched stone bridges. Stop on one and look both ways: the inner lake and the hills to the west, open water and the city to the east.",
        },
        {
          name: "Three Pools Mirroring the Moon",
          body: "Three small stone pagodas standing in the water off an island you can only reach by boat. If you get a one-yuan note in change, turn it over: this is the picture on the back.",
        },
        {
          name: "Leifeng Pagoda",
          body: "The pagoda of the Lady White Snake legend, in which a monk imprisons the snake spirit beneath it. The original, finished in 977, fell in 1924, partly because people had been prising out its bricks as lucky charms. The new one, finished in 2002, stands over the ruined base, which you can still see inside, and its top floor looks north over the whole lake.",
        },
      ],
      time: "Half a day for a boat to the island, the Su Causeway on foot and one pagoda. A full day if you add Lingyin Temple on the west side.",
      when: "Early morning, before eight, when the causeway is still quiet. Spring brings fresh willows and peach blossom on the Su Causeway; summer brings lotus, roughly late June to August. Avoid the May Day holiday and the first week of October, when the whole shore fills.",
      pair: "Lingyin Temple and the Buddhist rock carvings of Feilai Peak are about half an hour west by car. The Longjing tea villages lie in the hills south of the temple, on a back road to the lake, so they make an easy stop on the way back.",
      skip: "Anyone after drama: the hills are low, and on a hazy day they vanish altogether. With only an hour or two, take a boat to the island rather than trying to walk the shore.",
    },
    zh: {
      description: "杭州西湖从 2002 年起拆掉围栏，不再收门票。苏东坡用湖泥筑起的苏堤、别错过的三处、人少的时段，以及怎样和灵隐寺排进同一天。",
      why: [
        "西湖是一代代人修出来的风景。在杭州做过地方官的人里，有两位本身就是大诗人：唐代白居易任杭州刺史时在这里筑过堤，那道堤早已不在，今天的白堤其实在他之前就有了；1090 年，苏东坡主持疏浚西湖，把挖出的淤泥堆成了今天以他命名的长堤。到了南宋，“西湖十景”有了名字，大多一直沿用到今天。西湖也成了别处造园的样板：乾隆照着苏堤，在北京颐和园的昆明湖上修了一道西堤；2011 年列入世界遗产时，联合国教科文组织也写明，它影响了日本和朝鲜半岛的园林。",
        "它不收门票，是有意为之。2002 年起，杭州陆续拆掉湖边公园的围栏、取消收费；如今环湖一圈约 15 公里，整片湖岸就是一座日夜开放、没有大门的公园。要花钱的，只有坐船上岛、登雷峰塔这些项目。",
        "西湖的风景偏秀气：垂柳、荷花，低低的山，天边一座塔。人们常说西湖“三面云山一面城”，那一面城如今是现代都市；想看老画里的西湖，就背对着它看。",
      ],
      highlights: [
        {
          name: "苏堤",
          body: "近 3 公里的长堤从南岸一直通到北岸，一株杨柳一株桃，中间隔着六座石拱桥。站在桥上两头看：西边是西里湖和远山，东边是开阔的外湖和城市。",
        },
        {
          name: "三潭印月",
          body: "三座小石塔立在水中，旁边的小岛只能坐船上去。手里要是有一张一元的人民币，翻过来看看：背面印的就是这里。",
        },
        {
          name: "雷峰塔",
          body: "《白蛇传》里镇压白娘子的那座塔。原塔建于 977 年，1924 年倒塌，原因之一是多年来人们把塔砖一块块偷挖回家当护身符。今天的新塔 2002 年落成，就建在旧址上，里面还能看到老塔的塔基；登上顶层向北看，整个西湖尽在眼前。",
        },
      ],
      time: "半天：坐船上岛，走完苏堤，再登一座塔。加上西边的灵隐寺，就是一整天。",
      when: "最好清晨八点前到，苏堤上还很安静。春天看新柳和苏堤桃花；夏天看荷花，大约六月下旬到八月。避开五一和国庆黄金周，那几天整个湖边都挤满了人。",
      pair: "灵隐寺和刻满佛像的飞来峰在西边，开车约半小时。龙井村的茶园在灵隐寺南边的山里，那里有条小路直通湖边，返程正好顺路停一下。",
      skip: "只想看壮观风景的人：这里的山不高，赶上灰蒙蒙的天，远山干脆整个看不见。只有一两个小时的话，坐船上岛，比沿着湖岸走更值得。",
    },
    ko: {
      description: "항저우 서호는 2002년부터 울타리를 걷어내고 입장료를 받지 않습니다. 소동파가 쌓은 소제, 꼭 볼 세 곳, 한산한 시간, 영은사와 함께 도는 하루 동선까지.",
      why: [
        "서호는 사람이 대를 이어 만든 풍경입니다. 항저우를 다스린 관리 가운데 두 사람은 이름난 시인이기도 했습니다. 당나라 때 백거이가 이곳에 둑을 쌓았고, 1090년에는 동파육으로도 이름이 익숙한 소동파가 호수 바닥을 준설해 나온 진흙으로 지금의 소제를 만들었습니다. 남송 때 붙은 ‘서호십경’의 이름은 대부분 지금까지 쓰입니다. 서호는 다른 정원의 본보기가 되었습니다. 건륭제는 소제를 본떠 베이징 이화원 곤명호에도 둑길을 냈고, 2011년 서호를 세계유산에 올린 유네스코도 일본과 한국의 정원에 영향을 주었다고 적었습니다.",
        "입장료가 없는 것도 일부러 정한 일입니다. 항저우는 2002년부터 호숫가 공원의 울타리를 걷어내고 요금을 없앴습니다. 지금은 둘레 약 15km의 호숫가 전체가 문도 없이 밤낮으로 열려 있는 공원입니다. 돈이 드는 건 섬으로 가는 유람선이나 뇌봉탑 입장 정도입니다.",
        "풍경은 잔잔합니다. 버드나무와 연꽃, 삼면을 두른 낮은 산, 산등성이 위로 솟은 탑 하나. 나머지 한 면은 현대 도시이니, 옛 그림 속 서호를 보려면 도시를 등지고 서 보세요.",
      ],
      highlights: [
        {
          name: "소제",
          body: "남쪽 호숫가에서 북쪽 호숫가까지 이어지는 3km 가까운 둑길로, 버드나무와 복숭아나무가 번갈아 늘어서 있고 아치형 돌다리 여섯 개가 놓여 있습니다. 다리 위에 서서 양쪽을 둘러보세요. 서쪽으로는 안쪽 호수와 산이, 동쪽으로는 탁 트인 호수와 도시가 보입니다.",
        },
        {
          name: "삼담인월",
          body: "물 위에 작은 돌탑 세 개가 서 있고, 옆의 작은 섬은 배로만 갈 수 있습니다. 1위안 지폐를 거스름돈으로 받으면 뒤집어 보세요. 뒷면 그림이 바로 이곳입니다.",
        },
        {
          name: "뇌봉탑",
          body: "중국 4대 민간 전설 가운데 하나인 백사전(백낭자와 허선의 사랑 이야기)에서 스님이 백낭자를 가둔 탑입니다. 977년에 세운 원래 탑은 1924년에 무너졌는데, 사람들이 부적으로 쓰려고 오랫동안 벽돌을 빼 간 것도 한 원인이었습니다. 지금의 탑은 2002년 그 터 위에 다시 세워졌고, 탑 안에서 옛 탑의 기단을 볼 수 있습니다. 꼭대기 층에서는 북쪽으로 호수 전체가 내려다보입니다.",
        },
      ],
      time: "반나절이면 배로 섬에 들르고, 소제를 걷고, 탑 하나에 오를 수 있습니다. 서쪽의 영은사까지 더하면 하루 일정입니다.",
      when: "아침 8시 전, 소제가 아직 한산할 때가 좋습니다. 버드나무 잎이 돋고 소제에 복숭아꽃이 피는 봄, 연꽃이 피는 여름(대략 6월 하순~8월)이 대표적인 계절입니다. 5월 초 노동절 연휴와 10월 첫 주 국경절 연휴는 피하세요. 호숫가 전체가 사람으로 가득합니다.",
      pair: "영은사와 불상이 새겨진 비래봉은 서쪽으로 차로 30분 정도입니다. 용정차 마을은 영은사 남쪽 산속, 호수로 돌아오는 길목에 있어 잠깐 들르기 좋습니다.",
      skip: "웅장한 풍경을 기대한다면 굳이 가지 않아도 됩니다. 산은 나지막하고, 하늘이 뿌연 날에는 그마저 아예 보이지 않습니다. 한두 시간밖에 없다면 호숫가를 걷기보다 배를 타고 섬에 들르세요.",
    },
  },
  hongyadong: {
    en: {
      description:
        "Hongyadong looks old but opened in 2006. Where to see it lit, how to walk in at the top floor and out by the river, and who can skip the inside.",
      why: [
        "Hongyadong is the Chongqing of postcards and phone screens: eleven storeys of stilt-house-style buildings climbing a cliff above the Jialing River, every eave outlined in golden light after dark. It looks old. It opened in 2006, on the site of an old riverside quarter, and copies the stilt houses that once lined both rivers. The name comes from a cave in this cliff.",
        "Go for the outside, and for one very Chongqing trick: you walk in from a city street on the top floor and come out at the bottom, on the river road. The city is built on slopes so steep that the ground floor depends on which side you arrive from.",
        "Inside, it is a vertical mall of snack stalls, souvenir shops and bars, shoulder to shoulder on a busy evening.",
      ],
      highlights: [
        {
          name: "Qiansimen Bridge",
          body: "Walk out along the footpath of the bridge right beside it and turn round about halfway across. The whole building is lit in front of you, with the towers of the Yuzhong peninsula behind.",
        },
        {
          name: "The riverside road",
          body: "Leave by the bottom floor, cross to the river side of the road and look up. This is the angle people compare with the bathhouse in the Miyazaki film Spirited Away.",
        },
        {
          name: "The north bank",
          body: "Carry on to the far end of Qiansimen Bridge (the whole crossing is about 800 metres) and go down to the riverside at Jiangbeizui. From there, the lit building, the bridge and the skyline of the peninsula fit in one frame.",
        },
      ],
      time: "An hour or two in the evening.",
      when: "Be there before the lights come on and stay until it is fully dark. The lights follow a fixed evening schedule rather than sunset, later in summer than in winter, so check the time for your date. Weekday evenings are busy; on long national holidays, just getting in can take an hour.",
      pair: "Jiefangbei, the pedestrian heart of the city centre, is about fifteen minutes' walk uphill. The other way, about twenty minutes along the river, is Chaotianmen, where the night river cruises leave and the Jialing meets the Yangtze, usually the clearer river against the muddier one.",
      skip: "If you came for old Chongqing, this is not it: the building dates from 2006. If you dislike crowds, skip the inside and look at it from across the river; all you lose is the walk from the top floor down to the river.",
    },
    zh: {
      description: "重庆洪崖洞是 2006 年照老吊脚楼的样子建的新楼。从哪看亮灯最好、怎样从顶楼一路走到江边，以及同一个晚上还能顺路去哪。",
      why: [
        "明信片和手机屏幕上的重庆，多半就是洪崖洞：十一层吊脚楼式的建筑贴着嘉陵江边的崖壁往上叠，入夜后，每一道屋檐都勾着金色的灯。它看着很老，其实 2006 年才建成。这里原是一片临江的老街区，新楼仿的是当年两江沿岸成片的吊脚楼；名字来自这段崖壁上的洪崖洞。",
        "值得看的是外观，还有一件很“重庆”的事：从城里一条马路走进去，是顶楼 11 楼；一路往下走到底，出来已经是江边的马路。难怪重庆被叫作“8D 魔幻城市”：“一楼”在哪，要看你从哪边进来。",
        "说实话，里面就是一座竖起来的商场：小吃、纪念品、酒吧一层叠一层，人多的晚上挤得肩挨着肩。",
      ],
      highlights: [
        {
          name: "千厮门大桥",
          body: "走上洪崖洞旁边千厮门大桥的人行道，到桥中间一带回头看：亮灯的整栋洪崖洞，连同背后渝中半岛的高楼，一眼都能看全。",
        },
        {
          name: "江边的马路",
          body: "从底层出口出来，过到马路靠江的一侧，再抬头看。大家说洪崖洞像《千与千寻》里的汤屋，说的就是这个角度。",
        },
        {
          name: "嘉陵江北岸",
          body: "走到千厮门大桥的另一头（整座桥约 800 米），下到对岸江北嘴的江边回望，亮灯的洪崖洞、大桥和渝中半岛的天际线，能同时收进一个画面。",
        },
      ],
      time: "傍晚以后，一到两个小时。",
      when: "亮灯前到，一直待到天全黑。灯按固定的时间表开，不跟着日落走，夏天比冬天晚，出发前查一下当天的时间。就连平日晚上人也不少；国庆、春节这样的长假，光排队进去就可能要一个小时。",
      pair: "往坡上走十几分钟就是解放碑步行街。往另一头，沿江走二十来分钟到朝天门：两江在那里交汇，平时嘉陵江清一些、长江黄一些，两江夜游的船也从那里出发。",
      skip: "想看老重庆的人：这栋楼是 2006 年建的。怕挤的话，可以不进去，到对岸远远地看；错过的，只是从顶楼一路走到江边的那一段。",
    },
    ko: {
      description: "충칭 홍야동은 옛 조각루를 본떠 2006년에 지은 건물입니다. 야경이 가장 잘 보이는 자리, 꼭대기 층에서 강변까지 내려가는 길, 같은 저녁에 들르기 좋은 곳까지.",
      why: [
        "엽서와 휴대폰 화면 속 충칭은 대개 홍야동입니다. 11층짜리 조각루(비탈에 기둥을 세워 지은 전통 가옥) 양식 건물이 자링강변 절벽을 따라 층층이 올라가고, 밤이 되면 처마마다 금빛 조명이 켜집니다. 오래된 건물 같지만 2006년에 문을 열었습니다. 옛 강변 마을 자리에 두 강가를 따라 늘어서 있던 조각루를 본떠 지었고, 이름은 이 절벽의 동굴 홍야동에서 따왔습니다.",
        "볼거리는 바깥 모습, 그리고 아주 충칭다운 경험 하나입니다. 시내 도로에서 걸어 들어가면 그곳이 꼭대기 11층이고, 계속 내려와 맨 아래층으로 나가면 강변 도로입니다. 괜히 ‘8D 도시’라고 부르는 게 아닙니다. 어느 쪽으로 들어오느냐에 따라 ‘1층’이 달라집니다.",
        "안쪽은 솔직히 말해 세로로 세운 쇼핑몰입니다. 먹거리 노점, 기념품 가게, 술집이 층마다 이어지고, 붐비는 저녁에는 어깨를 부딪칠 만큼 사람이 많습니다.",
      ],
      highlights: [
        {
          name: "천사문대교",
          body: "바로 옆 천사문대교의 보행로를 따라 다리 중간쯤까지 걸어간 뒤 뒤돌아보세요. 불이 켜진 건물 전체와 그 뒤 위중반도의 빌딩숲이 한눈에 들어옵니다.",
        },
        {
          name: "강변 도로",
          body: "맨 아래층 출구로 나와 길을 건너 강 쪽에서 올려다보세요. 영화 ‘센과 치히로의 행방불명’의 온천장과 자주 비교되는 바로 그 각도입니다.",
        },
        {
          name: "자링강 건너편",
          body: "천사문대교를 끝까지 건너(다리 전체 약 800m) 맞은편 강변으로 내려가 보세요. 불 켜진 홍야동, 다리, 위중반도의 스카이라인이 한 프레임에 담깁니다.",
        },
      ],
      time: "저녁에 1~2시간.",
      when: "조명이 켜지기 전에 도착해 완전히 어두워질 때까지 머무르세요. 점등 시각은 일몰이 아니라 정해진 시간표를 따르며, 여름이 겨울보다 늦습니다. 당일 시간을 확인하세요. 평일 저녁에도 사람이 많고, 국경절이나 춘절 같은 긴 연휴에는 들어가는 데만 한 시간이 걸릴 수 있습니다.",
      pair: "해방비 보행거리는 언덕길로 15분쯤 걸어 올라가면 나옵니다. 반대쪽으로는 강을 따라 20분 남짓 걸으면 조천문입니다. 두 강이 만나는 곳으로, 보통은 자링강이 더 맑고 장강이 더 누렇습니다. 양강 야경 유람선도 여기서 출발합니다.",
      skip: "옛 충칭을 보러 왔다면 이곳은 아닙니다. 2006년에 지은 건물입니다. 사람 많은 곳이 싫다면 안에 들어가지 말고 강 건너편에서 바라보세요. 놓치는 건 꼭대기 층에서 강변까지 걸어 내려가는 경험 하나뿐입니다.",
    },
  },
};

export function getSightStory(id: SightId, locale: HomegroundLocale): SightStory | null {
  return sightStories[id]?.[locale] ?? null;
}
