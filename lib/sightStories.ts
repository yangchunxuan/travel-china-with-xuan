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
  /**
   * The questions travellers ask search engines and AI assistants, each
   * answered in its first sentence with something concrete. Rendered as the
   * page's FAQ and as FAQPage structured data (the two always match).
   */
  readonly faq?: readonly { readonly question: string; readonly answer: string }[];
}

/**
 * Per-sight facts shared by the three languages: when the story was last
 * fact-checked, the official or reference sources shown under it, and the
 * names and identifiers that tell search engines and AI assistants which
 * place this is (TouristAttraction alternateName and sameAs).
 */
export interface SightStoryMeta {
  readonly reviewedAt: string;
  readonly sources: readonly { readonly title: string; readonly url: string }[];
  readonly alternateName: readonly string[];
  readonly sameAs: readonly string[];
}

type Stories = Partial<Record<SightId, Readonly<Record<HomegroundLocale, SightStory>>>>;

export const sightStories: Stories = {
  "forbidden-city": {
    en: {
      description: "Walk the Forbidden City gate by gate, from the great ceremonial squares to the courts where the imperial family lived, then climb Jingshan to see it all.",
      why: [
        "Pass through the towering Meridian Gate and the space opens into a vast square, golden roofs beyond, and the crowd falls quiet. For nearly five hundred years, twenty-four emperors lived behind these walls and ordinary people never got in. Now you can walk their route, one gate and one hall at a time.",
        "Heading north, the courtyards keep opening out until the great square before the Hall of Supreme Harmony, where the whole court once lined up by rank. Then you pass into the family's own quarters: smaller courtyards, trees and gardens, and the feeling changes from throne room to home. It is far too big to see in one visit, and you don't need to.",
      ],
      highlights: [
        {
          name: "The Hall of Supreme Harmony",
          body: "The largest hall in the palace, where emperors were enthroned and married. Look up at a corner of the roof: a little procession of ten guardian beasts, more than on any other building in China, and the last of them has a monkey's face and wings.",
        },
        {
          name: "The Treasure Gallery and the Nine Dragon Screen",
          body: "On the quieter east side are the courts the Qianlong Emperor rebuilt for his retirement and then never moved into. Nine glazed dragons writhe across the wall at the gate, and inside stands a jade mountain over two metres tall, the largest jade carving in the palace. The gallery has its own ticket, so decide before you book.",
        },
        {
          name: "The Imperial Garden",
          body: "Just before the north exit, centuries-old cypresses twist around rockeries and a pavilion on a little hill. After two hours of open stone courtyards, it is the first real shade under big trees.",
        },
      ],
      time: "Three hours inside covers the main route through the middle and one side. Allow extra time before that for security at the gate.",
      when: "Take a morning slot and be in the queue before the gates open, so you reach the great halls ahead of the crowd; inside, it is busiest from about ten until early afternoon. Spring and autumn are the comfortable seasons; in July and August the stone courtyards are hot and almost shadeless.",
      pair: "Leave by the north gate and cross the road to Jingshan Park. If you still have the legs, climb to the top: the golden roofs of the whole palace spread out below you, everything you just walked through in one look. Tiananmen Square lies at the south end and has its own security check, so add it before your entry time only if the morning has room.",
      skip: "Repeat visitors with no interest in the collections. If three hours on stone paving is too much for someone in your group, don't drop it. The museum has its own two-hour route. And if your date is fully booked, go up Jingshan instead; in forty minutes it shows you the shape of the whole palace.",
    },
    zh: {
      description: "北京故宫：从午门走进去，一道门接一道门，一直走到皇帝一家住过的院子。别错过的三处、留多久，出门再上景山看全景。",
      why: [
        "穿过高大的午门，眼前突然空出一大片广场，远处是金黄屋顶的大殿，人会一下子安静下来。将近五百年里，24 位皇帝住在这道宫墙里，寻常百姓一步也进不来；如今，你可以沿着他们走过的路，一道门、一座殿地往里走。",
        "一路向北，院子先是越来越开阔，到太和殿前最大，当年文武百官就在这里排队朝拜；再往里，就走进了皇帝一家生活的小院子，房子变小了，花木多了起来，一下子从“朝廷”变成了“家”。它太大了，没人一次看得完，也不必看完。",
      ],
      highlights: [
        {
          name: "太和殿",
          body: "宫里最大的一座殿，皇帝登基、大婚都在这里。抬头看屋檐的四个角，一排小神兽列队站着，一共十只，全中国只有这座殿用到这么多；排在最后的那只，长着猴脸和翅膀。",
        },
        {
          name: "珍宝馆与九龙壁",
          body: "东边人少的一片，是乾隆为自己养老改建的，可他始终没有搬进来住。门口九条彩色琉璃巨龙在墙上翻腾，里面立着一座两米多高的玉山，是故宫里最大的一件玉雕。珍宝馆要另外买票，预约前就想好去不去。",
        },
        {
          name: "御花园",
          body: "快到北门时的御花园，盘着几百年的古柏和假山。走了两个小时空旷的石头广场，到这里终于能在大树下歇一歇。",
        },
      ],
      time: "宫里留三个小时，够走完中间这条主路，再挑东边或西边逛一路。进门前的安检时间另算。",
      when: "预约上午场，开门前就排进队里，赶在人潮前面走到几座大殿；宫里大约十点到午后人最多。春秋两季最舒服；七八月，石头院子又晒又热，几乎找不到阴凉。",
      pair: "出了北门，过马路就是景山公园。还走得动的话就爬上山顶，整片金黄的宫殿屋顶都在脚下，刚走过的地方一眼看全，这是北京最值得看的一个画面。天安门广场在南头，要单独过安检，只有上午时间宽裕，才值得在进宫前先去一趟。",
      skip: "以前来过、对宫里的展览也没什么兴趣的人。同行有人走不了三个小时石板路，也不必放弃：故宫自己有一条两小时的参观路线。要是你想去的那天已经约满，景山就是最实在的替代，四十分钟就能看清整座故宫的样子。",
    },
    ko: {
      description: "베이징 자금성: 오문으로 들어가 문 하나, 전각 하나를 지나 황제 가족이 살던 안뜰까지. 놓치지 말 세 곳과 관람 시간, 나와서 경산공원에 올라 보는 전경까지.",
      why: [
        "높은 오문을 지나면 눈앞에 거대한 광장이 갑자기 열리고, 저 멀리 황금빛 지붕의 전각이 보입니다. 사람들은 저절로 말수가 줄어듭니다. 500년 가까이 24명의 황제가 이 담장 안에서 살았고, 일반 백성은 한 번도 들어올 수 없었습니다. 이제는 그들이 걷던 길을 따라 문 하나, 전각 하나씩 안으로 걸어 들어갈 수 있습니다.",
        "북쪽으로 갈수록 마당은 점점 넓어져 태화전 앞에서 가장 크게 트입니다. 신하들이 품계대로 줄지어 서던 곳입니다. 더 안으로 들어가면 황제 가족이 살던 작은 안뜰이 나오고, 건물은 작아지고 나무와 정원이 많아지면서 ‘조정’이 ‘집’으로 바뀝니다. 한 번에 다 볼 수도 없고, 다 볼 필요도 없습니다.",
      ],
      highlights: [
        {
          name: "태화전",
          body: "궁에서 가장 큰 전각으로, 황제의 즉위식과 혼례가 열리던 곳입니다. 지붕 모서리를 올려다보면 경복궁에서 보던 잡상이 여기에도 있습니다. 봉황을 탄 선인 뒤로 작은 짐승 열 개가 줄지어 서 있는데, 중국에서 이렇게 많은 건물은 이곳뿐이고, 맨 끝 녀석은 원숭이 얼굴에 날개가 달렸습니다. 선인까지 세면 열한 개로, 경회루와 같은 수입니다.",
        },
        {
          name: "진보관과 구룡벽",
          body: "한산한 동쪽 구역은 건륭제가 물러난 뒤 지내려고 고쳐 지었지만, 정작 황제 자신은 끝내 들어와 살지 않았습니다. 입구 벽에서는 색색의 유약 벽돌로 만든 용 아홉 마리가 꿈틀대고, 안에는 높이 2m가 넘는 옥산이 서 있는데 자금성에서 가장 큰 옥 조각입니다. 진보관은 입장권을 따로 사야 하니, 갈지 말지 예약 전에 정해 두세요.",
        },
        {
          name: "어화원",
          body: "북문 출구 바로 앞의 정원으로, 수백 년 된 측백나무가 가산을 휘감고 있습니다. 그늘 없는 돌마당을 두 시간 걷고 나면, 여기서 처음으로 큰 나무 그늘에 앉아 쉴 수 있습니다.",
        },
      ],
      time: "궁 안에서 3시간이면 가운데 큰길과 한쪽 구역을 둘러볼 수 있습니다. 그 전에 입구 보안 검색 시간도 넉넉히 잡으세요.",
      when: "오전 시간대로 예약하고 개장 전에 줄을 서서, 인파보다 먼저 큰 전각에 닿으세요. 궁 안은 10시쯤부터 이른 오후까지 가장 붐빕니다. 봄과 가을이 쾌적하고, 7~8월에는 돌마당이 뜨겁고 그늘이 거의 없습니다.",
      pair: "북문으로 나와 길을 건너면 경산공원입니다. 걸을 힘이 남았다면 꼭대기까지 올라가 보세요. 자금성의 노란 기와지붕이 발아래 한눈에 펼쳐지고, 방금 걸어온 길 전체가 보입니다. 톈안먼 광장은 남쪽 끝에 있고 보안 검색을 따로 거치므로, 오전 시간이 넉넉할 때만 입장 전에 들르세요.",
      skip: "전에 와 봤고 전시에도 큰 관심이 없다면 건너뛰어도 됩니다. 일행 중에 돌바닥을 3시간 걷기 힘든 분이 있어도 포기할 필요는 없습니다. 고궁박물원이 정한 2시간 관람 코스가 있습니다. 원하는 날짜의 예약이 다 찼다면 경산공원이 현실적인 대안입니다. 40분이면 궁 전체의 모습을 볼 수 있습니다.",
    },
  },
  "great-wall": {
    en: {
      description: "Stand on the Great Wall near Beijing and watch it ride the ridges to the horizon. Badaling or Mutianyu, the best season, and how to plan the day.",
      why: [
        "Climb to the first watchtower, turn round, and you will see why everyone wants to come once. The wall rides the ridgeline up, drops away, climbs the next mountain and runs on until it vanishes into the haze. The bricks underfoot have been walked for centuries, the hills fold away on both sides and the wind comes straight over the top. You have seen the photos a hundred times; standing on it is something else.",
        "The Wall was never just a wall but a whole system of defence. It joined the ridges into one line, with a tower every so often where soldiers lived, and when they saw raiders, smoke and fire carried the warning from tower to tower. The sections near Beijing were mostly built under the Ming, to keep horsemen from the northern steppe away from the capital. Count the towers into the distance and you start to see how many people it took to hold this line.",
        "Badaling is the classic. You can get there by train, and for a first trip to Beijing it is the easiest place to climb, though peak-season weekends are crowded. Mutianyu is further out but greener and quieter: the wall rises and falls through woodland, the hills turn red and gold in autumn, and early in the morning the wall is still quiet.",
      ],
      highlights: [
        {
          name: "The steep climb at Badaling",
          body: "Keep going to the highest point of Badaling's northern stretch, then turn round: the wall winds away below you along the ridge. Chinese visitors quote Mao up here: you are not a true hero until you have climbed the Great Wall.",
        },
        {
          name: "Three towers side by side at Mutianyu",
          body: "Three watchtowers stand shoulder to shoulder in one spot, a sight you will rarely find anywhere else on the Wall. Look out either way and the wall dips and climbs through green forest.",
        },
        {
          name: "A rest inside a watchtower",
          body: "When your legs need a break, duck into one of the brick towers. A few dozen soldiers once lived in each. Look out of the small windows and you see the next tower along, and the hills they watched day and night.",
        },
      ],
      time: "Most of a day from central Beijing, with two to three hours on the wall. By train, Badaling can fit into a long half-day.",
      when: "Autumn is the most beautiful season, with clear skies and the hills in red and gold. After snow the Wall looks like an ink painting, though it is windy and slippery. In any season, set off early on a weekday for the quietest wall.",
      pair: "Coming back from Badaling, stop at the Ming Tombs and walk the Sacred Way, lined with stone animals and officials. Near Mutianyu, Hongluo Temple has a bamboo grove and an old pair of ginkgo trees that turn gold in autumn.",
      skip: "If you want wild, unrestored wall, neither of these is it: both are well restored and busy. With only two days in Beijing, the Wall takes a whole one, so decide first whether it or the Forbidden City matters more to you.",
      faq: [
        {
          question: "Is the Great Wall worth visiting?",
          answer: "Yes, especially on a first trip to Beijing. However many photos you have seen, standing on the wall as it runs along the ridges to the horizon is a different thing. You don't need to be very fit: walk for an hour or two and turn back wherever you like.",
        },
        {
          question: "Badaling or Mutianyu: which section should I choose?",
          answer: "Choose Badaling for the easiest first visit: it is the classic section and you can get there by train, but it is crowded in peak season. Choose Mutianyu for greener, quieter wall and better photos: it is further from the city and usually less busy. Both are well restored and suit most visitors.",
        },
        {
          question: "How long does a Great Wall trip take?",
          answer: "Plan on most of a day from central Beijing, with two to three hours on the wall itself. Badaling by train can fit into a long half-day; Mutianyu is further out and usually takes the whole day.",
        },
        {
          question: "When is the best time to visit the Great Wall?",
          answer: "Autumn, around October, brings clear skies and red leaves on the hills, and spring is pleasant too. After snow the wall is beautiful but windy and slippery. In any season, avoid the October and May Day national holidays and set off early on a weekday.",
        },
        {
          question: "Do I need to book Great Wall tickets in advance?",
          answer: "Booking ahead is wise: peak-season weekends and holidays can sell out. At Mutianyu, the entry ticket, the shuttle bus and the cable car are bought separately. The rules change from time to time, and we can check them for your date and book for you.",
        },
      ],
    },
    zh: {
      description: "站上北京的长城，城墙顺着山脊翻山越岭，一直延伸到天边。八达岭还是慕田峪、什么季节去、这一天怎么安排。",
      why: [
        "爬上第一座烽火楼、回头的那一刻，你就会明白为什么人人都想来一次：城墙顺着山脊翻上去、落下来，再翻上下一座山，一直延伸到看不见的天边。脚下的砖被人踩了几百年，两边是层层叠叠的群山，山风从城墙上吹过。照片里看过一百次的长城，真站在上面，完全是另一回事。",
        "长城不只是一道墙，而是一整套守边的办法：城墙在山脊上连成一条线，每隔一段就有一座楼，士兵住在楼里，远远看到敌情，就用烽烟一处接一处地把消息传开。北京附近能登的这几段，大多是明朝修的，为的是挡住北方草原的骑兵、护住京城。站在楼上往远处数一数那些楼，你会明白当年为了守住这条线，花了多少人力。",
        "八达岭是最经典的一段，坐火车就能到，第一次来北京，从这里登长城最省心，只是旺季周末人多。慕田峪远一点，却更绿、更安静，城墙在山林里起起伏伏，秋天满山红黄；清晨去，城墙上还没什么人。",
      ],
      highlights: [
        {
          name: "八达岭的好汉坡",
          body: "一路爬到八达岭北段的最高处，再回头，城墙从脚下顺着山脊一路蜿蜒下去。“不到长城非好汉”，说的就是爬上来的这口气。",
        },
        {
          name: "慕田峪三楼并立",
          body: "三座烽火楼肩并肩立在一处，整条长城上都少见。从这里往两边看，城墙在绿色的山林里起伏，非常上镜。",
        },
        {
          name: "钻进烽火楼歇一歇",
          body: "走累了就钻进一座砖砌的楼里。当年这里住着几十个守城的士兵，从小小的窗口望出去，能看到下一座楼，也能看到他们日夜盯着的那片山。",
        },
      ],
      time: "从市区出发差不多一整天，在城墙上待两三个小时。八达岭坐火车去，紧凑一点大半天也能来回。",
      when: "秋天最美，天高气爽，满山红黄；冬天下过雪的长城像一幅水墨画，只是风大路滑。不管哪个季节，平日一早出发最清静。",
      pair: "从八达岭回城的路上，可以顺道去明十三陵，走一段两旁站满石像的神路；去慕田峪的话，附近的红螺寺有一片竹林和一对老银杏，秋天金黄一片。",
      skip: "想看没人修过的“野长城”的人：这两段都修得很完整，人也不少。在北京只有两天的话，长城要占掉一整天，先想好它和故宫哪个对你更重要。",
      faq: [
        {
          question: "长城值得去吗？",
          answer: "值得，尤其是第一次来北京。照片看过再多，真站在城墙上，看它顺着山脊一直延伸到天边，感受完全不同。体力一般也没关系：在城墙上走一两个小时，走到想停的地方再往回走就行。",
        },
        {
          question: "八达岭和慕田峪，选哪一段？",
          answer: "第一次来、想省心，选八达岭：最经典，坐火车就能到，缺点是旺季人多。想要更绿、更安静、照片更好看，选慕田峪：离市区远一些，人通常也少一些。两段都修缮得很完整，适合大多数人。",
        },
        {
          question: "去一趟长城要多长时间？",
          answer: "从北京市区出发，一般要一整天，其中在城墙上两到三个小时。八达岭可以坐火车去，安排紧凑的话大半天也能来回；慕田峪路程更远，通常就是一整天。",
        },
        {
          question: "什么季节去长城最好？",
          answer: "秋天最好，十月前后天高气爽，山上的红叶最漂亮；春天也很舒服。冬天下过雪的长城很美，但风大、路滑。不管哪个季节，都尽量避开国庆、五一这样的长假，挑平日一早出发。",
        },
        {
          question: "去长城要提前订票吗？",
          answer: "建议提前订好，旺季的周末和节假日可能订满。慕田峪的门票、景区摆渡车和缆车是分开买的。规则时常调整，我们可以按你的日期核实并代为预订。",
        },
      ],
    },
    ko: {
      description: "베이징 만리장성 위에 서면 성벽이 능선을 타고 하늘 끝까지 이어집니다. 팔달령과 무톈위 중 어디로, 언제, 하루를 어떻게 짜면 좋을지까지.",
      why: [
        "첫 번째 망루에 올라 뒤를 돌아보는 순간, 왜 다들 꼭 한 번은 오고 싶어 하는지 알게 됩니다. 성벽은 능선을 따라 오르고 내려가며 다음 산을 넘고, 눈이 닿지 않는 하늘 끝까지 이어집니다. 발밑의 벽돌은 수백 년 동안 사람들이 밟아 온 것이고, 양쪽으로는 산이 겹겹이 펼쳐지며, 바람이 성벽 위로 불어옵니다. 사진으로 백 번 본 만리장성도 직접 서 보면 전혀 다릅니다.",
        "만리장성은 단순한 성벽이 아니라 국경을 지키는 하나의 체계였습니다. 성벽이 능선을 이어 하나의 선을 만들고, 일정한 간격마다 병사들이 머무는 망루가 섰습니다. 적이 보이면 연기와 불로 망루에서 망루로 소식을 전했습니다. 베이징 근교의 구간은 대부분 명나라 때 북방 초원의 기병을 막아 수도를 지키려고 쌓은 것입니다. 멀리까지 늘어선 망루를 세어 보면, 이 선을 지키는 데 얼마나 많은 사람이 필요했을지 짐작하게 됩니다.",
        "팔달령은 가장 대표적인 구간으로, 기차로 갈 수 있어 베이징이 처음이라면 가장 편하게 오를 수 있습니다. 다만 성수기 주말에는 사람이 많습니다. 무톈위는 조금 더 멀지만 더 푸르고 조용합니다. 성벽이 숲속을 오르내리고, 가을이면 산이 붉고 노랗게 물듭니다. 아침 일찍 가면 성벽 위가 아직 한산합니다.",
      ],
      highlights: [
        {
          name: "팔달령의 호한파",
          body: "팔달령 북쪽 구간의 가장 높은 곳까지 올라가 뒤돌아보세요. 성벽이 발아래 능선을 따라 구불구불 이어집니다. 중국 사람들은 여기서 ‘만리장성에 오르지 않으면 대장부가 아니다’라는 마오쩌둥의 시구를 떠올립니다.",
        },
        {
          name: "무톈위의 세 망루",
          body: "망루 세 개가 어깨를 나란히 하고 선 곳으로, 장성 전체에서도 보기 드뭅니다. 여기서 양쪽을 바라보면 성벽이 푸른 숲 사이로 오르내립니다.",
        },
        {
          name: "망루 안에서 잠시 쉬기",
          body: "다리가 아프면 벽돌 망루 안으로 들어가 쉬어 가세요. 옛날에는 망루마다 병사 수십 명이 머물렀습니다. 작은 창으로 내다보면 다음 망루와, 병사들이 밤낮으로 지켜보던 산이 보입니다.",
        },
      ],
      time: "베이징 시내에서 출발하면 거의 하루가 걸리고, 성벽 위에서는 2~3시간을 보냅니다. 기차로 가는 팔달령은 빠듯하게 잡으면 반나절 남짓이면 다녀올 수 있습니다.",
      when: "가을이 가장 아름답습니다. 하늘이 높고 산이 붉고 노랗게 물듭니다. 눈 내린 뒤의 장성은 수묵화 같지만 바람이 세고 길이 미끄럽습니다. 계절과 상관없이 평일 아침 일찍 출발하면 가장 한적합니다.",
      pair: "팔달령에서 돌아오는 길에는 명십삼릉에 들러 돌짐승과 문무관 석상이 늘어선 신도를 걸어 보세요. 무톈위 근처의 홍라사에는 대나무 숲과 오래된 은행나무 한 쌍이 있어, 가을이면 금빛으로 물듭니다.",
      skip: "손대지 않은 옛 성벽을 보고 싶다면 두 곳 모두 맞지 않습니다. 잘 복원되어 있고 사람도 많습니다. 베이징에 이틀뿐이라면 장성에 하루가 통째로 들어가니, 자금성과 어느 쪽이 더 중요한지 먼저 정하세요.",
      faq: [
        {
          question: "만리장성은 가 볼 만한가요?",
          answer: "네, 특히 베이징이 처음이라면 꼭 가 볼 만합니다. 사진을 아무리 많이 봤어도, 능선을 따라 하늘 끝까지 이어지는 성벽 위에 직접 서 보는 느낌은 전혀 다릅니다. 체력이 좋지 않아도 괜찮습니다. 한두 시간 걷다가 원하는 곳에서 돌아오면 됩니다.",
        },
        {
          question: "팔달령과 무톈위 중 어디가 좋을까요?",
          answer: "처음이고 편하게 가고 싶다면 팔달령입니다. 가장 대표적인 구간이고 기차로 갈 수 있지만, 성수기에는 사람이 많습니다. 더 푸르고 조용한 성벽과 멋진 사진을 원한다면 무톈위입니다. 시내에서 조금 더 멀고 대체로 덜 붐빕니다. 두 곳 모두 잘 복원되어 있어 대부분의 여행자에게 맞습니다.",
        },
        {
          question: "만리장성에 다녀오려면 얼마나 걸리나요?",
          answer: "베이징 시내에서 출발하면 거의 하루가 걸리고, 성벽 위에서는 2~3시간을 보냅니다. 기차로 가는 팔달령은 빠듯하게 잡으면 반나절 남짓, 무톈위는 거리가 멀어 보통 하루를 다 씁니다.",
        },
        {
          question: "만리장성은 언제 가는 게 가장 좋나요?",
          answer: "10월 전후의 가을이 가장 좋습니다. 하늘이 맑고 산에 단풍이 듭니다. 봄도 쾌적합니다. 눈 내린 뒤의 장성은 아름답지만 바람이 세고 미끄럽습니다. 어느 계절이든 중국의 국경절·노동절 연휴는 피하고, 평일 아침 일찍 출발하세요.",
        },
        {
          question: "만리장성 입장권은 미리 예약해야 하나요?",
          answer: "미리 예약하는 것이 좋습니다. 성수기 주말과 연휴에는 매진될 수 있습니다. 무톈위는 입장권, 셔틀버스, 케이블카를 따로 삽니다. 규정이 종종 바뀌므로, 저희가 날짜에 맞춰 확인하고 대신 예약해 드릴 수 있습니다.",
        },
      ],
    },
  },
  "temple-of-heaven": {
    en: {
      description: "Climb the gently rising avenue to the Temple of Heaven's blue-roofed hall, then join Beijing's early risers in the cypress woods. How to visit, and when.",
      why: [
        "The long stone avenue at the Temple of Heaven rises so gently you barely notice, until you realise you have been climbing towards the sky. At the top stands the Hall of Prayer for Good Harvests, three tiers of blue roof that almost melt into a clear sky. For five centuries, Ming and Qing emperors came here every year to pray for good harvests.",
        "What makes it special now is that it belongs to Beijing again. At first light the cypress woods fill with people doing tai chi, dancing, singing opera and kicking shuttlecocks, and the long covered walkway fills with card and chess games. The emperors' altar has become the neighbourhood park, and you see the city at its most relaxed.",
      ],
      highlights: [
        {
          name: "The Hall of Prayer for Good Harvests",
          body: "Look in from the door: 28 great pillars hold up the round blue roof. The four in the middle stand for the seasons, the next twelve for the months and the outer twelve for the hours of the day as the old clock counted them. The whole year, in one hall.",
        },
        {
          name: "The Circular Mound",
          body: "An open-air altar of three white stone tiers, where emperors worshipped heaven at the winter solstice. Stand on the round stone at the very centre of the top tier and say something quietly: the stone railings throw your voice back, louder than it should be.",
        },
        {
          name: "The Long Corridor",
          body: "The covered walkway east of the hall is Beijing's open-air club for the retired: cards, chess, an erhu, old songs. Find a space on a bench for a while. It is the friendliest corner of the park.",
        },
      ],
      time: "Two to three hours for the Hall of Prayer, the Echo Wall and the Circular Mound. Come an hour earlier if you want the park at its liveliest.",
      when: "The earlier the better: the park opens well before the monuments, and the woods are liveliest first thing. On a clear autumn or winter day the blue roofs stand out against a blue sky. To try the Echo Wall, pick a quiet weekday morning, and even then it may not carry your voice.",
      pair: "From the North Gate it is a short taxi ride to Qianmen Street and the old lanes of Dashilar, good for a wander and lunch.",
      skip: "If you have only one day for Beijing's imperial sights, give it to the Forbidden City. If old buildings leave you cold, buy just the park ticket and walk the woods early in the morning. Watching Beijing start its day is worth the trip on its own.",
    },
    zh: {
      description: "北京天坛：走上南低北高的长长大道，蓝顶的祈年殿在晴空下亮得耀眼；一大早，柏树林里全是晨练的北京人。",
      why: [
        "走上那条南低北高的长石板大道，人会不知不觉地慢慢升高，像是一步步往天上走。走到头，祈年殿就在眼前：三层蓝色的圆顶，晴天里几乎和天空融成一片。五百年间，明清两代的皇帝每年都来这里祭天，祈求五谷丰登。",
        "天坛最有意思的，是它如今也属于北京人。天刚亮，柏树林里就有人打太极、跳舞、唱京剧、踢毽子，长廊下坐满了打牌下棋的老人。皇帝祭天的地方成了家门口的公园，来这里，能看到北京最松弛的一面。",
      ],
      highlights: [
        {
          name: "祈年殿",
          body: "从门口往里看，28 根大柱子撑起蓝色的圆顶：中间 4 根代表四季，往外 12 根代表十二个月，最外一圈 12 根代表一天的十二个时辰。一座殿，就是一整年。",
        },
        {
          name: "圜丘",
          body: "露天的三层白石台，皇帝冬至在这里祭天。站到最高一层正中那块圆石上，轻声说句话，声音会从四周的石栏弹回来，听着比平时响亮。",
        },
        {
          name: "七十二长廊",
          body: "祈年殿东边那条长长的走廊，是北京老人的露天俱乐部：打牌、下棋、拉二胡、唱老歌。找个空位坐一会儿，这是天坛最有人情味的地方。",
        },
      ],
      time: "两三个小时，看完祈年殿、回音壁和圜丘。想赶上公园早上最热闹的时候，就再早来一个小时。",
      when: "越早越好：公园比几座古建筑开门早得多，一早的柏树林最热闹。秋冬的晴天，蓝瓦衬着蓝天最好看。想试试回音壁的话，挑人少的平日上午；就算这样，声音也不一定传得过去。",
      pair: "从北门出来，打车一会儿就到前门大街和大栅栏的老胡同，正好接着逛、找地方吃饭。",
      skip: "如果在北京只有一天看皇家古迹，先去故宫。对古建筑没兴趣的话，只买公园门票，一早进来在柏树林里走走，看看北京人怎么过早晨，也很值得。",
    },
    ko: {
      description: "베이징 천단: 완만하게 오르는 긴 돌길 끝에 푸른 지붕의 기년전이 하늘과 맞닿고, 이른 아침 측백나무 숲은 운동하는 베이징 사람들로 가득합니다.",
      why: [
        "천단의 긴 돌길은 남쪽이 낮고 북쪽이 높아서, 걷다 보면 어느새 하늘을 향해 조금씩 올라가고 있습니다. 길 끝에 기년전이 나타납니다. 세 겹의 푸른 둥근 지붕이 맑은 날이면 하늘과 거의 하나가 됩니다. 500년 동안 명·청의 황제들이 해마다 이곳에서 하늘에 풍년을 빌었습니다.",
        "지금의 천단이 특별한 건 베이징 사람들의 공원이기도 하기 때문입니다. 날이 밝으면 측백나무 숲에 태극권을 하고, 춤추고, 경극을 부르고, 제기를 차는 사람들이 모이고, 긴 회랑 아래는 카드놀이와 장기를 두는 노인들로 붐빕니다. 황제의 제단이 동네 공원이 된 이곳에서, 베이징의 가장 느긋한 얼굴을 볼 수 있습니다.",
      ],
      highlights: [
        {
          name: "기년전",
          body: "문 앞에서 안을 들여다보세요. 큰 기둥 28개가 푸른 둥근 지붕을 받치고 있습니다. 가운데 4개는 사계절, 그다음 12개는 열두 달, 바깥 12개는 하루의 열두 시진을 뜻합니다. 전각 하나에 1년이 다 들어 있는 셈입니다.",
        },
        {
          name: "원구단",
          body: "지붕 없이 하늘로 트인 3층 흰 돌 제단으로, 황제가 동지에 하늘에 제사를 올리던 곳입니다. 맨 위층 한가운데 둥근 돌 위에 서서 작게 말해 보세요. 사방의 돌난간에서 소리가 되돌아와 평소보다 크게 울립니다. 1897년 고종이 서울 소공동에 쌓은 환구단도 이 제단과 이름의 한자가 같습니다.",
        },
        {
          name: "칠십이장랑",
          body: "기년전 동쪽의 긴 회랑은 베이징 노인들의 야외 사랑방입니다. 카드놀이, 장기, 얼후 연주, 옛 노래가 이어집니다. 빈자리에 잠시 앉아 보세요. 천단에서 가장 사람 냄새 나는 곳입니다.",
        },
      ],
      time: "기년전·회음벽·원구단을 보는 데 2~3시간이면 됩니다. 공원이 가장 활기찬 아침 풍경까지 보려면 한 시간 일찍 오세요.",
      when: "일찍 올수록 좋습니다. 공원 문은 주요 건축물보다 훨씬 먼저 열리고, 이른 아침의 숲이 가장 활기찹니다. 맑은 가을이나 겨울날에는 푸른 기와가 파란 하늘과 어우러집니다. 회음벽을 해 보고 싶다면 한산한 평일 오전을 고르세요. 그래도 소리가 잘 전해지지 않을 때가 있습니다.",
      pair: "북문에서 택시로 금방인 전문대가와 다자란 옛 골목에서 이어서 걷고 점심을 먹기 좋습니다.",
      skip: "베이징 황실 유적에 하루밖에 없다면 자금성에 쓰세요. 옛 건축물에 큰 관심이 없다면 공원 입장권만 사서 아침 일찍 숲을 걸어 보세요. 베이징 사람들이 하루를 시작하는 모습만으로도 올 만합니다.",
    },
  },
  "summer-palace": {
    en: {
      description: "Walk the Summer Palace's 728-metre painted corridor along Kunming Lake, find the marble boat, and catch the low sun through the Seventeen-Arch Bridge.",
      why: [
        "The Summer Palace brings a whole landscape of lake and hill inside the imperial walls. Kunming Lake fills three quarters of the grounds, a painted corridor runs along its shore, and the Tower of Buddhist Incense rises from Longevity Hill behind. On a summer day, with a breeze off the water and willows trailing in it, you understand why the Empress Dowager Cixi chose to spend long seasons here.",
        "It is a beautiful place with a sad history. British and French troops burned it in 1860; Cixi rebuilt it, reputedly with money taken from the navy's budget; and after his reforms failed in 1898, the young Guangxu Emperor was held prisoner in a small courtyard by the lake. Walking the shore with that in mind changes how it feels.",
      ],
      highlights: [
        {
          name: "The Long Corridor",
          body: "Walk the 728 metres of covered corridor along the lake and look up: more than 14,000 paintings on its beams, scene after scene from Romance of the Three Kingdoms and Journey to the West, like turning the pages of a picture book.",
        },
        {
          name: "The Marble Boat",
          body: "At the corridor's western end, a great boat of stone sits by the shore, going nowhere forever. The cabin on top looks like stone too, but it is wood painted to look like marble.",
        },
        {
          name: "The Hall of Jade Ripples",
          body: "A small courtyard by the lake, inside the East Palace Gate, where Guangxu was kept. Look into the side rooms: the brick walls built to shut him in are still there.",
        },
      ],
      time: "Three to four hours to walk from one gate to another. A boat across the lake saves your legs, though there may be a queue. Add the Old Summer Palace and it is a full day.",
      when: "Come in the morning and walk the lake shore while it is cool. Spring brings magnolias and peach blossom on the West Causeway, autumn turns the hill gold, and on a few clear evenings around the winter solstice the setting sun lights every arch of the Seventeen-Arch Bridge at once.",
      pair: "If you still have the legs, the Old Summer Palace is a stop or two south on Metro Line 4. The same army burned it in the same year, and only broken stone palaces remain. Standing among those ruins stays with you longer than any intact hall.",
      skip: "It is in the north-western suburbs, so even a quick visit takes half a day. If time is tight, Beihai Park beside Jingshan is a smaller imperial lake garden right in the centre. And if Hangzhou is on your route, you will see the original there: the West Lake this garden copies.",
    },
    zh: {
      description: "北京颐和园：沿着湖边 728 米的长廊慢慢走，抬头是一万四千多幅彩画，湖上是十七孔桥和夕阳。怎么逛、几点来、能不能顺路去圆明园。",
      why: [
        "颐和园把一整片湖光山色搬进了皇家园林。昆明湖占了园子的四分之三，湖边是一条画满故事的长廊，背后的万寿山上，佛香阁高高立着。夏天湖上有风，柳枝低垂，你会明白慈禧为什么愿意在这里长住。",
        "这么美的园子也有它的伤痕：1860 年被英法联军烧毁，慈禧重修时据说挪用了部分海军经费；光绪皇帝变法失败后，就被软禁在湖边的一座小院里。走在湖边想起这些往事，滋味很不一样。",
      ],
      highlights: [
        {
          name: "长廊",
          body: "沿湖岸慢慢走完这条 728 米长的长廊，抬头看梁上的一万四千多幅彩画，三国、西游记里的故事一幅接一幅，走着走着，就像在翻一本连环画。",
        },
        {
          name: "石舫",
          body: "长廊西头停着一条用石头砌的大船，永远也开不走。上面的楼舱看着像石头，其实是漆成石头模样的木头。",
        },
        {
          name: "玉澜堂",
          body: "东宫门内湖边的一座小院，光绪皇帝被软禁的地方。往两边的偏房里看，当年为了困住他而砌起的砖墙，至今还堵在那里。",
        },
      ],
      time: "从一个门进、另一个门出，走一圈要三四个小时。坐船过湖能省些脚力，但可能要排队。加上圆明园，就是一整天。",
      when: "早上来，趁凉快先逛湖边。春天玉兰和西堤的桃花开，秋天满山金黄。冬至前后的晴天傍晚，夕阳会同时照亮十七孔桥的所有桥洞，叫“金光穿洞”，一年里只有那几天能看到。",
      pair: "还走得动的话，坐地铁 4 号线往南一两站就是圆明园。它和颐和园在同一年被同一支军队烧毁，如今只剩一片残破的石头宫殿。站在那片废墟前，比看任何完好的宫殿都更让人难忘。",
      skip: "颐和园在城西北，再快也要半天。时间紧的话，市中心景山旁边的北海公园也是皇家湖景园林，小一些、近一些。行程里有杭州的话，颐和园模仿的原版西湖，到时候就能亲眼看到。",
    },
    ko: {
      description: "베이징 이화원: 곤명호를 따라 728m 이어지는 그림 회랑을 걷고, 돌로 만든 배를 찾고, 십칠공교 아래로 비치는 석양을 만나 보세요.",
      why: [
        "이화원은 호수와 산 풍경을 통째로 황실 정원 안에 들여놓은 곳입니다. 곤명호가 정원의 4분의 3을 차지하고, 호숫가로는 그림으로 가득한 장랑이 이어지며, 뒤편 만수산 위로 불향각이 높이 솟아 있습니다. 호수 바람이 불고 버드나무가 물에 드리워진 여름날이면, 서태후가 왜 이곳에 오래 머물렀는지 알 것 같습니다.",
        "아름다운 만큼 아픈 역사도 있습니다. 1860년 영국·프랑스 연합군이 불태웠고, 서태후는 해군 경비 일부를 끌어다 다시 지었다고 전해집니다. 1898년 개혁이 실패한 뒤 젊은 광서제는 호숫가의 작은 안뜰에 갇혀 지냈습니다. 이 이야기를 알고 호숫가를 걸으면 느낌이 완전히 달라집니다.",
      ],
      highlights: [
        {
          name: "장랑",
          body: "호숫가를 따라 728m 이어지는 지붕 덮인 회랑을 천천히 걸으며 고개를 들어 보세요. 들보에 그려진 1만 4천 폭이 넘는 그림 속에서 『삼국지연의』와 『서유기』 장면이 이어져, 그림책을 한 장씩 넘기는 듯합니다.",
        },
        {
          name: "석방",
          body: "장랑 서쪽 끝 호숫가에 돌로 쌓은 큰 배가 영원히 떠나지 못한 채 서 있습니다. 위쪽 선실도 돌처럼 보이지만, 사실은 대리석처럼 칠한 나무입니다.",
        },
        {
          name: "옥란당",
          body: "동궁문 안 호숫가의 작은 안뜰로, 광서제가 갇혀 지내던 곳입니다. 양쪽 곁채를 들여다보면 그를 가두려고 쌓은 벽돌 벽이 지금도 남아 있습니다.",
        },
      ],
      time: "한 문으로 들어가 다른 문으로 나오는 데 3~4시간이 걸립니다. 배로 호수를 건너면 다리가 덜 아프지만 줄을 설 수도 있습니다. 원명원까지 더하면 하루 일정입니다.",
      when: "아침에 와서 선선할 때 호숫가부터 걸으세요. 봄에는 목련과 서제의 복숭아꽃이 피고, 가을에는 산이 금빛으로 물듭니다. 동지 전후 맑은 날 해 질 녘 며칠 동안은 지는 해가 십칠공교의 다리 구멍 17개를 한꺼번에 비춥니다.",
      pair: "걸을 힘이 남았다면 지하철 4호선으로 한두 정거장 남쪽인 원명원에 가 보세요. 같은 해 같은 군대에 불타, 지금은 부서진 돌 궁전만 남았습니다. 그 폐허 앞에 서 보면 어떤 온전한 궁전보다 오래 기억에 남습니다.",
      skip: "이화원은 베이징 서북쪽 교외에 있어 짧게 봐도 반나절이 걸립니다. 시간이 빠듯하다면 도심 경산공원 옆의 북해공원도 작은 황실 호수 정원입니다. 일정에 항저우가 있다면, 이 정원이 본뜬 원조 서호를 그곳에서 보게 됩니다.",
    },
  },
  "national-museum": {
    en: {
      description: "China's whole history in one afternoon at Beijing's National Museum: the giant Houmuwu Ding, the four-ram vessel and a drummer laughing since the Han.",
      why: [
        "If you want to understand China's long history in a single afternoon, come here. The Ancient China galleries lay it out as one walk: stone tools from the earliest settlers, Shang bronzes, Han pottery figures, then Ming and Qing porcelain. Some 2,000 objects stand in order, and by the end every dynasty has fallen into place.",
        "Come before Xi'an or any other old capital on your route, and everything you see there will slot into that timeline. On a rainy, sweltering or hazy day, it is also the most comfortable place in Beijing.",
      ],
      highlights: [
        {
          name: "The Houmuwu Ding",
          body: "The heaviest bronze vessel known from ancient China, 832.84 kilograms of it; you only grasp the size standing next to it. Found in 1939, it was buried again by villagers to hide it from Japanese troops, and came out for good seven years later.",
        },
        {
          name: "The Four-Ram Square Zun",
          body: "A ram's head with curling horns juts from each corner of this wine vessel, so finely made it is hard to believe it is over three thousand years old. A wartime air raid smashed it into more than twenty pieces, which were found and put back together.",
        },
        {
          name: "The Storyteller Beating a Drum",
          body: "A bare-chested, pot-bellied Han dynasty storyteller, drum under one arm and stick raised, laughing at his own joke. It is hard to stand in front of him without smiling back.",
        },
      ],
      time: "About three hours to see Ancient China at an easy pace, with a sit-down in the middle. A whole day would not cover the building.",
      when: "Keep it for a day of rain, heat or haze. The summer school holidays are the busiest weeks and the hardest to book.",
      pair: "Tian'anmen East station on Metro Line 1 is just outside, and Wangfujing, for food and a stroll, is one stop east.",
      skip: "Anyone who is not a museum person, or who has only a day or two in Beijing with the Forbidden City still to see. If Xi'an is on your route, its Shaanxi History Museum tells the Zhou-to-Tang story close to where the objects were found.",
    },
    zh: {
      description: "北京中国国家博物馆：一个下午从远古走到明清，看看巨大的后母戊鼎、四羊方尊，还有一个笑了两千年的说唱俑。",
      why: [
        "如果只有一个下午想读懂中国历史，就来这里。“古代中国”展厅把几千年排成了一条路：远古的石器、商朝的青铜、汉代的陶俑，一路走到明清的瓷器，两千多件文物按时间排开。走一圈出来，中国的朝代就在脑子里排好了队。",
        "在去西安这样的古都之前先来这里，之后看到的每一处古迹，都能放回这条时间线上。下雨、太热或空气不好的日子，这里也是北京最舒服的去处。",
      ],
      highlights: [
        {
          name: "后母戊鼎",
          body: "已知最重的中国古代青铜器，832.84 公斤，站到它跟前才知道有多大。1939 年出土后，村民怕被日军抢走，又把它埋回了地下，七年后才重见天日。",
        },
        {
          name: "四羊方尊",
          body: "四个角上各伸出一只卷角的羊头，精巧得不像三千多年前的东西。它在抗战时被炸成二十多片，后来一片片找回来，又拼了起来。",
        },
        {
          name: "击鼓说唱俑",
          body: "一个光着膀子、腆着肚子的东汉说唱艺人，一手夹鼓、一手举槌，笑得合不拢嘴。站在他面前，很难不跟着笑。",
        },
      ],
      time: "留三个小时左右，从容看完“古代中国”，中间坐下歇一歇。整座楼一天也看不完。",
      when: "把它留给下雨、酷暑或者空气不好的日子。暑假人最多，也最难约上。",
      pair: "出门就是地铁 1 号线天安门东站，往东坐一站到王府井，吃饭、逛街都方便。",
      skip: "对博物馆兴趣不大，或者在北京只有一两天、还没去故宫的人，可以先不去。行程里有西安的话，陕西历史博物馆讲的周秦汉唐，离文物出土的地方更近。",
    },
    ko: {
      description: "베이징 중국 국가박물관에서 오후 한나절에 중국 역사 전체를 걸어 보세요. 거대한 후모무정, 네 마리 양의 사양방존, 2천 년째 웃고 있는 설창용까지.",
      why: [
        "중국의 긴 역사를 오후 한나절에 이해하고 싶다면 이곳으로 오세요. ‘고대 중국’ 전시는 역사를 한 줄의 길로 펼쳐 놓았습니다. 선사 시대 석기에서 상나라 청동기, 한나라 토용을 지나 명·청 도자기까지 유물 2천여 점이 시대순으로 이어져, 다 걷고 나면 중국 왕조가 머릿속에 차례로 정리됩니다.",
        "시안 같은 옛 도읍에 가기 전에 먼저 들르면, 그곳에서 보는 모든 것이 이 연표 위에 자리를 잡습니다. 비 오는 날이나 몹시 덥고 공기가 탁한 날에는 베이징에서 가장 쾌적한 곳이기도 합니다.",
      ],
      highlights: [
        {
          name: "후모무정",
          body: "지금까지 알려진 중국 고대 청동기 가운데 가장 무거운 832.84kg짜리 솥으로, 옆에 서 봐야 그 크기가 실감 납니다. 1939년 출토된 뒤 마을 사람들이 일본군에게 빼앗기지 않으려고 다시 땅에 묻었고, 7년 뒤에야 세상에 나왔습니다.",
        },
        {
          name: "사양방존",
          body: "네 모서리마다 뿔이 말린 양 머리가 튀어나온 술그릇으로, 3천 년도 더 된 것이라고 믿기 어려울 만큼 정교합니다. 전쟁 중 공습으로 스무 조각 넘게 부서졌다가, 조각을 하나하나 찾아 다시 맞췄습니다.",
        },
        {
          name: "북 치는 설창용",
          body: "웃통을 벗고 배를 내민 한나라 이야기꾼이 한쪽 팔에 북을 끼고 북채를 치켜든 채 자기 농담에 웃고 있습니다. 그 앞에 서면 따라 웃지 않기가 어렵습니다.",
        },
      ],
      time: "‘고대 중국’을 여유 있게 보고 중간에 앉아 쉬려면 3시간쯤 잡으세요. 하루를 다 써도 건물 전체는 볼 수 없습니다.",
      when: "비가 오거나 몹시 덥거나 공기가 탁한 날을 위해 남겨 두세요. 중국의 여름방학 기간이 가장 붐비고 예약도 가장 어렵습니다.",
      pair: "바로 앞이 지하철 1호선 톈안먼둥역이고, 동쪽으로 한 정거장 가면 식당과 상점이 모인 왕푸징입니다.",
      skip: "박물관에 큰 관심이 없거나, 베이징에 하루이틀뿐인데 아직 자금성도 못 봤다면 건너뛰어도 됩니다. 시안에 간다면 산시역사박물관에서 주·진·한·당의 유물을 출토지 가까이에서 볼 수 있습니다.",
    },
  },
  "terracotta-warriors": {
    en: {
      description: "Look down on rank after rank of life-size clay soldiers in the pits where they were buried for China's First Emperor. What to find, and how to pace it.",
      why: [
        "Step into the hall over Pit 1 and the army is suddenly below you. Rank after rank of life-size clay soldiers stand in long earth trenches, in a pit 230 metres long. Walk along the rail and look closely. Faces, hair and beards change from one soldier to the next; Yuan Zhongyi, who led the first dig, counted 24 kinds of beard alone. Some figures carry their makers' names, stamped or scratched in out-of-the-way places. Qin rules made craftsmen sign their work, so a fault could be traced back to the man who made it.",
        "Farmers digging a well found the first fragments in 1974, and the digging and restoring have hardly stopped since. The army you see is grey, but it was painted in more than a dozen colours over a coat of lacquer. Pit 1's figures lost almost all of theirs long ago, when the pit burned and then flooded. Where paint does survive, it starts to change within about 15 seconds of being uncovered and can curl and flake away within four minutes. So the excavators work slowly, and only about a fifth of Pit 1's estimated 6,000 figures and horses are out of the ground.",
        "The pits are only the outer edge of the First Emperor's tomb. His own mound rises 1.5 kilometres to the west, in Lishan Garden, and has never been opened. The historian Sima Qian wrote that its chamber held rivers and seas of mercury, and the soil over its centre does carry unusually high levels. The same ticket covers both areas. Pit 1 gives you the scale, Pit 2 the close-up detail, and Lishan Garden the bronze chariots and the mound itself.",
      ],
      highlights: [
        {
          name: "Walk Pit 1 to the far end",
          body: "At the east end the army faces you, its front ranks in battle robes without armour, the lightly armed vanguard. Keep following the rail round to the far end of the hall. There, half-reassembled soldiers stand on the pit floor among the fragments, and restorers are often at work.",
        },
        {
          name: "Meet single soldiers in Pit 2",
          body: "Archers, chariots and cavalry were buried here together in one formation. Single figures are shown up close, among them a cavalryman with his saddled horse and a mid-ranking officer. Look for the display case that shows the colours the army was painted in.",
        },
        {
          name: "Two bronze chariots, rebuilt from fragments",
          body: "In Lishan Garden's Bronze Chariots Museum, two half-size bronze chariots, each drawn by four bronze horses, are shown together. They were found beside the emperor's tomb mound in 1980, crushed into more than 3,000 pieces, and restorers spent eight years putting them back together. Look for the gold and silver fittings, 14 kilograms of them on the pair.",
        },
      ],
      time: "Most of a day from central Xi'an. The museum reckons on about an hour and a half for the pits and the same for Lishan Garden; travel, security checks and the shuttle between them come on top.",
      when: "Avoid Chinese national holidays such as May Day and National Day, when the day's tickets can sell out. The pits are under roofs, so rain matters little there, but Lishan Garden and the ground round the mound are open-air. In hot or wet weather, that is the part to shorten; spring and autumn suit it best.",
      pair: "Huaqing Palace stands beside Huaqingchi station on Metro Line 9, which the public-transport route back to Xi'an passes anyway. The Tang emperor Xuanzong and his consort Yang Guifei bathed in its hot springs, the ones Bai Juyi wrote of in his poem The Song of Everlasting Regret. In 1936 Chiang Kai-shek was seized there by his own generals, in the Xi'an Incident. Stop only if you cut Lishan Garden short and still have time.",
      skip: "If you hoped to walk among the soldiers, you will see them from walkways round the pits instead. With older parents or tired legs, see the three pits first and decide on Lishan Garden afterwards; if you go, make it the bronze chariots. With one day in Xi'an and little interest in archaeology, spend it in the walled city.",
      faq: [
        {
          question: "Are the Terracotta Warriors worth visiting?",
          answer: "Yes, for most first-time visitors to Xi'an. Pit 1 alone is 230 metres long, and the first look down at its ranks of life-size soldiers stays with you. You see them from walkways round the pits rather than walking among them. If you have only one day in Xi'an and little interest in archaeology, the walled city may suit you better.",
        },
        {
          question: "How long do you need at the Terracotta Warriors?",
          answer: "Plan on most of a day from central Xi'an. The museum reckons on about 1.5 hours for the three pits and another 1.5 hours for Lishan Garden, where the bronze chariots are. Travel out to Lintong, security and passport checks, and the shuttle between the two areas all come on top.",
        },
        {
          question: "Do I need to book Terracotta Warriors tickets in advance?",
          answer: "Yes. Each visitor needs a real-name reservation made with the passport they will carry, and the original passport is checked at entry. One ticket covers the three pits, Lishan Garden and the shuttle between them. Around national holidays the day's tickets can sell out, so book once your date is fixed; we can check and book it for you.",
        },
        {
          question: "Do I need a guide for the Terracotta Warriors?",
          answer: "No, you can visit on your own. Xi'an's metro (Lines 1 and 9) and a local bus reach the museum, and the shuttle to Lishan Garden is included in the ticket. A guide earns their fee mainly in explanation: the formations, the ranks, and how the figures were made and restored. If you mostly want to see the scale, the labels are enough.",
        },
        {
          question: "When is the best time to visit the Terracotta Warriors?",
          answer: "Spring or autumn, on an ordinary weekday. Avoid May Day and the National Day week in early October, when tickets can sell out. The pits are indoors, so rain matters little there, but Lishan Garden is open-air and hard going in summer heat. Start early so the second half of the day is not squeezed.",
        },
      ],
    },
    zh: {
      description: "西安兵马俑：站在一号坑边往下看，真人大小的陶俑一排排立在当年下葬的俑坑里。三个坑和丽山园各看什么，这一天怎么排。",
      why: [
        "走进一号坑的展厅，整支军队一下子出现在脚下。坑长 230 米，真人大小的陶俑一排接一排，立在一条条土沟里。沿着栏杆慢慢走，凑近了看，脸型、发式、胡须一个一个都不一样，当年主持发掘的袁仲一，光胡须就数出了 24 种。有些陶俑在不起眼的地方还刻着工匠的名字：秦朝规定，谁做的东西就要留下谁的名字，出了问题，可以一直追查到人。",
        "1974 年，村民打井时挖出了第一批陶俑碎片，此后的发掘和修复几乎没有停过。眼前的军阵是灰色的，可它当年通体彩绘，先刷一层生漆打底，再施十几种颜色。一号坑在很久以前遭过火烧，后来又被水泡过，陶俑身上的彩绘几乎掉光了。就算有彩绘保存下来，出土后 15 秒左右也会开始变化，4 分钟内就可能起翘、剥落。所以考古队挖得格外慢：据推算，一号坑埋有陶俑陶马约 6000 件，目前出土的只有五分之一左右。",
        "这些俑坑，其实只在秦始皇陵的外围。秦始皇自己的封土在西边 1.5 公里外的丽山园里，至今从未打开。司马迁在《史记》里说，地宫“以水银为百川江河大海”；多次勘探也发现，封土中心一带土壤的汞含量明显偏高。两处用同一张门票。一号坑看气势，二号坑看细节，丽山园看铜车马和封土本身。",
      ],
      highlights: [
        {
          name: "一号坑，一直走到头",
          body: "东端是军阵的正面，最前面几排兵俑只穿战袍、不披铠甲，是轻装的前锋。别看完正面就走，沿着栏杆绕到展厅的另一头。那里的坑底立着拼好一半的陶俑，四周散着碎片，常能看到修复人员在工作。",
        },
        {
          name: "二号坑，凑近看单个陶俑",
          body: "二号坑里，弓弩手、战车和骑兵混编成一个军阵。这里能凑近看单件陶俑，其中有牵着鞍马的骑兵，也有一位中级军官。再找找展示彩绘原貌的展柜，看看兵马俑当年是什么颜色。",
        },
        {
          name: "铜车马，从碎片拼回原样",
          body: "丽山园的铜车马博物馆里，两乘铜车马同馆展出，都按真车真马一半的大小铸造，每乘套着四匹马。1980 年它们在封土旁出土时，已被压成 3000 多块碎片，修复人员花了 8 年才拼回原样。留意车马上的金银饰件，两乘加起来有 14 公斤。",
        },
      ],
      time: "从西安市区出发，基本要一整天。按博物院的估算，俑坑区和丽山园各需一个半小时左右；来回路程、安检和两处之间的摆渡车，都要另算时间。",
      when: "避开五一、国庆这样的长假，那几天的门票可能售罄。俑坑都罩在展厅里，下雨影响不大；丽山园和封土一带是露天的，天太热或下雨时，就把这一段缩短。春秋两季最合适。",
      pair: "华清宫就在地铁 9 号线华清池站旁边，坐公共交通回西安本来就要经过这一站。白居易《长恨歌》里“春寒赐浴华清池”，写的就是唐玄宗和杨贵妃在这里泡温泉。1936 年西安事变，蒋介石也是在这里被自己手下的将领扣押的。只有丽山园逛得短、时间还有富余，才值得顺路进去。",
      skip: "想走进军阵、站在陶俑中间的人要有心理准备，游客只能在坑边的通道上往下看。同行有老人，或者自己已经走累了，就先看三个俑坑，丽山园看完再定；要去的话，就去看铜车马。如果在西安只有一天，对考古兴趣又不大，不如把这一天留给城墙里的老城。",
      faq: [
        {
          question: "兵马俑值得去吗？",
          answer: "值得，第一次来西安的人大多都该去。光一号坑就长 230 米，第一眼往下看到成排成列、真人大小的陶俑，很难忘记。游客是在坑边的通道上往下看，不能走进军阵。如果在西安只有一天，对考古又没什么兴趣，城墙里的老城可能更适合你。",
        },
        {
          question: "参观兵马俑要多长时间？",
          answer: "从西安市区出发，基本要一整天。按博物院的估算，三个俑坑约 1.5 小时，放着铜车马的丽山园再要约 1.5 小时。去临潼的路程、安检和核验证件，还有两处之间的摆渡车，都要另算。",
        },
        {
          question: "兵马俑要提前预约吗？",
          answer: "要。每位游客都要用本人当天要带的护照实名预约，入口会核验护照原件。一张门票包含三个俑坑、丽山园和两处之间的摆渡车。五一、国庆前后，当天的票可能售罄，日期一定下来就尽早订；我们也可以帮你查好、代为预订。",
        },
        {
          question: "参观兵马俑需要请导游吗？",
          answer: "不一定，自己去完全可以。从西安坐地铁 1 号线、9 号线，再换公交就能到，去丽山园的摆渡车也含在门票里。导游的价值主要在讲解：军阵怎么排、军阶怎么分、陶俑怎么做出来又怎么修复。如果主要想看那份气势，看展板就够了。",
        },
        {
          question: "什么时候去兵马俑最好？",
          answer: "春秋两季的平常工作日最好。避开五一和十月初的国庆长假，那几天门票可能售罄。俑坑在室内，下雨影响不大；丽山园是露天的，夏天顶着暑热走会很累。早点出发，下半天才不会太赶。",
        },
      ],
    },
    ko: {
      description: "시안 병마용: 1호갱 난간에서 내려다보면 실물 크기의 흙 병사들이 묻혔던 갱 안에 줄줄이 서 있습니다. 갱 세 곳과 여산원에서 볼 것, 하루 짜는 법.",
      why: [
        "1호갱 전시관에 들어서면 군대 전체가 갑자기 발아래 펼쳐집니다. 길이 230m의 갱 안, 흙으로 된 긴 고랑마다 실물 크기의 도용(흙으로 빚은 병사상)이 줄지어 서 있습니다. 난간을 따라 천천히 걸으며 가까이 들여다보세요. 얼굴형도 머리 모양도 수염도 제각각이어서, 첫 발굴을 이끈 위안중이는 수염 모양만 24가지를 헤아렸습니다. 눈에 잘 띄지 않는 곳에 만든 사람의 이름이 찍히거나 새겨진 도용도 있습니다. 진나라는 장인에게 자기 이름을 남기게 해서, 잘못이 생기면 끝까지 그 사람에게 책임을 물었습니다.",
        "1974년 우물을 파던 농민들이 첫 조각을 캐냈고, 그 뒤로 발굴과 복원은 거의 멈춘 적이 없습니다. 지금 보이는 병마용은 회색이지만, 원래는 옻칠로 바탕을 입힌 위에 열 가지가 넘는 색이 칠해져 있었습니다. 1호갱의 도용은 아주 오래전 갱이 불타고 물에 잠기면서 색이 거의 다 사라졌습니다. 색이 남아 있더라도 땅 밖으로 나오면 15초쯤 뒤부터 변하기 시작해, 4분 안에 들뜨고 떨어져 나가기도 합니다. 그래서 발굴은 아주 천천히 진행되며, 1호갱에 묻힌 것으로 추정되는 병사와 말 약 6천 점 가운데 지금까지 나온 것은 5분의 1 정도입니다.",
        "병마용갱은 진시황릉의 바깥 가장자리일 뿐입니다. 진시황의 봉분은 서쪽으로 1.5km 떨어진 여산원 안에 솟아 있고, 한 번도 열린 적이 없습니다. 사마천은 『사기』에서 그 안에 수은으로 강과 바다를 만들었다고 썼고, 실제로 봉분 중심부 흙에서는 수은 농도가 유난히 높게 나옵니다. 두 구역은 입장권 한 장으로 들어갑니다. 1호갱에서는 규모를, 2호갱에서는 가까이서 보는 세부를, 여산원에서는 청동마차와 봉분 자체를 보게 됩니다.",
      ],
      highlights: [
        {
          name: "1호갱, 맨 끝까지 걷기",
          body: "동쪽 끝에 서면 군대가 정면으로 마주 보는데, 맨 앞 몇 줄은 갑옷 없이 전투복만 입은 가벼운 차림의 선봉대입니다. 정면만 보고 돌아서지 말고 난간을 따라 전시관 반대편 끝까지 가 보세요. 갱 바닥에는 반쯤 맞춘 도용들이 흩어진 조각들 사이에 서 있고, 복원 연구원들이 일하는 모습도 자주 볼 수 있습니다.",
        },
        {
          name: "2호갱에서 병사 하나하나 가까이 보기",
          body: "2호갱에는 궁수와 전차, 기병이 한 진형 안에 섞여 묻혔습니다. 이곳에서는 도용을 한 점씩 가까이 볼 수 있는데, 안장 얹은 말을 끄는 기병과 중급 군관도 그중에 있습니다. 병마용이 원래 어떤 색으로 칠해져 있었는지 보여 주는 진열장도 찾아보세요.",
        },
        {
          name: "조각에서 되살아난 청동마차",
          body: "여산원의 청동마차박물관에는 실물의 절반 크기로 만든 마차 두 대가 함께 전시되어 있고, 각각 청동 말 네 필이 끕니다. 1980년 봉분 바로 옆에서 3천 개가 넘는 조각으로 짓눌린 채 발견되었고, 복원팀이 8년에 걸쳐 다시 맞췄습니다. 두 대에 달린 금·은 장식만 14kg이니 눈여겨보세요.",
        },
      ],
      time: "시안 시내에서 출발하면 하루를 거의 다 씁니다. 진시황제릉박물원은 병마용 구역과 여산원에 각각 1시간 30분쯤 걸린다고 보는데, 오가는 시간과 보안 검색, 두 구역 사이 셔틀 시간은 따로 잡아야 합니다.",
      when: "국경절이나 노동절 같은 중국 연휴는 피하세요. 이 기간에는 당일 입장권이 매진되기도 합니다. 갱은 모두 실내 전시관 안에 있어 비가 와도 큰 지장이 없지만, 여산원과 봉분 일대는 야외입니다. 덥거나 비가 오는 날에는 이쪽 일정을 줄이세요. 봄과 가을이 가장 알맞습니다.",
      pair: "화청지은 지하철 9호선 화청지역 바로 옆에 있어, 대중교통으로 시안에 돌아가는 길에 어차피 지나갑니다. 당 현종과 양귀비가 온천을 즐기던 곳으로, 백거이가 「장한가」에서 노래한 온천이 바로 이곳입니다. 1936년 장제스가 부하 장군들에게 붙잡힌 시안 사건의 현장이기도 합니다. 여산원을 짧게 끝내 시간이 남을 때만 들르세요.",
      skip: "병마용 사이를 걸어 보고 싶다면 기대와 다를 수 있습니다. 관람객은 갱 둘레의 통로에서 내려다봅니다. 걷기 힘든 부모님과 함께이거나 다리가 지쳤다면 갱 세 곳을 먼저 보고, 여산원은 그다음에 정하세요. 간다면 청동마차를 보세요. 시안에 하루밖에 없고 고고학에 큰 관심이 없다면, 그 하루는 성벽 안 옛 시가지에 쓰세요.",
      faq: [
        {
          question: "병마용은 가 볼 만한가요?",
          answer: "네, 시안이 처음이라면 대부분 가 볼 만합니다. 1호갱 하나만 길이가 230m이고, 실물 크기의 병사들이 줄지어 선 모습을 처음 내려다보는 순간은 쉽게 잊히지 않습니다. 병사들 사이를 걷는 것이 아니라 갱 둘레 통로에서 내려다봅니다. 시안에 하루밖에 없고 고고학에 관심이 적다면 성벽 안 옛 시가지가 더 맞을 수 있습니다.",
        },
        {
          question: "병마용 관람에는 시간이 얼마나 걸리나요?",
          answer: "시안 시내에서 출발하면 거의 하루를 잡으세요. 박물원은 갱 세 곳에 1시간 30분, 청동마차가 있는 여산원에 1시간 30분쯤 걸린다고 봅니다. 린퉁까지 오가는 시간, 보안 검색과 여권 확인, 두 구역 사이 셔틀 시간은 따로입니다.",
        },
        {
          question: "병마용은 미리 예약해야 하나요?",
          answer: "네. 관람객마다 실제로 가져갈 여권으로 실명 예약을 해야 하고, 입장할 때 여권 원본을 확인합니다. 입장권 한 장에 갱 세 곳과 여산원, 두 구역 사이 셔틀이 모두 포함됩니다. 중국 연휴 무렵에는 당일 표가 매진될 수 있으니 날짜가 정해지면 바로 예약하세요. 저희가 확인하고 대신 예약해 드릴 수도 있습니다.",
        },
        {
          question: "병마용에 가이드가 꼭 필요한가요?",
          answer: "아니요, 혼자서도 충분히 다녀올 수 있습니다. 시안에서 지하철 1호선과 9호선, 현지 버스로 박물원까지 갈 수 있고, 여산원 셔틀도 입장권에 포함됩니다. 가이드는 주로 해설에서 제값을 합니다. 병사들의 대열과 계급, 도용을 만들고 복원한 과정을 알고 싶다면 도움이 되고, 규모를 보는 것이 목적이라면 안내판으로도 충분합니다.",
        },
        {
          question: "병마용은 언제 가는 게 가장 좋나요?",
          answer: "봄이나 가을의 평일이 가장 좋습니다. 노동절 연휴와 10월 초 국경절 연휴에는 표가 매진될 수 있으니 피하세요. 갱은 실내라 비가 와도 괜찮지만, 여산원은 야외라 한여름 더위에는 걷기 힘듭니다. 아침 일찍 출발해야 오후 일정이 빠듯해지지 않습니다.",
        },
      ],
    },
  },
  "xian-city-wall": {
    en: {
      description: "Walk or cycle on top of Xi'an's city wall, nearly 14 km round, then step inside it to see a Tang gate with cart ruts still in its road.",
      why: [
        "Go up at the South Gate and the top of the wall opens out like a road, 12 to 14 metres wide. It runs straight off east and west until it narrows to a point. Bicycles rattle past over the bricks. On one side lies the old city; on the other, the moat and a strip of park that follow the wall all the way round. Every 120 metres the wall juts out into a broad platform, close enough to the next one that defenders on each could cover the ground between them.",
        "The wall's line is older than its bricks. As the Tang dynasty collapsed, its capital Chang'an was sacked again and again. In 904 the governor gave up the rest of the city and held only the walled quarter of government offices. The Ming built their wall on that line, pushed it outwards on the east and north, and finished it in 1378. In doing so they sealed up one of the old Tang gates, Hanguang Gate, which is why it survives. Yet the walled city covers only about a seventh of Tang Chang'an, which spread far beyond the wall you stand on.",
        "It nearly disappeared. In 1958, as Beijing was tearing down its walls, Xi'an decided to demolish its own. Bricks were stripped from almost all the battlements before heritage officials telegraphed the State Council, which ordered the wall protected in 1959. Most of what you walk on was repaired after 1983, and the ring has been whole again only since the mid-2000s. For a first visit, walk one stretch from the South Gate; cycle the whole loop only if the ride itself appeals.",
      ],
      highlights: [
        {
          name: "Look down into the South Gate",
          body: "Stand on the wall above the South Gate and look down into the walled courtyard where attackers who broke through the outer gate were trapped. This is the one main gate where all three towers stand again: one that worked the drawbridge, the arrow tower with rows of archers' windows, and the main tower. The arrow tower is a 2014 rebuild of one destroyed in 1926.",
        },
        {
          name: "Tang cart ruts at Hanguang Gate",
          body: "Near the west end of the south wall, a museum built into the wall shows what is left of Hanguang Gate, first built in 582. Of its three passages, the middle one was kept for the emperor, and the western one still has cart ruts in its Tang road surface. Beside it, a cut through the wall shows its layers, from Sui and Tang earth to modern repairs.",
        },
        {
          name: "Find the one round corner",
          body: "From Hanguang Gate, walk west along the top to the southwest corner, the only one of the four that curves. The usual explanation is that the Ming builders followed the rounded corner of an older wall on the same spot. Below, the moat bends with it.",
        },
      ],
      time: "An hour to an hour and a half to walk one stretch and come down again. Cycling the whole loop is an outing of its own, so keep the rest of that half-day loose.",
      when: "In warm months, go up in the late afternoon, once the bricks have started to cool. If you stay into the evening, check how late your exit gate stays open. There is almost no shade on top, so spring and autumn are the comfortable seasons. Around the Spring Festival the wall is hung with lanterns for weeks, in recent years into March.",
      pair: "From the South Gate, walk north up South Street to the Bell Tower, about 1.1 kilometres or fifteen minutes. The Drum Tower and the food lanes of the Muslim Quarter lie just beyond it. Or, inside the wall, turn east along Shuyuanmen, a street of brush, ink and calligraphy shops, to the Forest of Stone Steles Museum.",
      skip: "If you hope to find an untouched Ming wall, you will be disappointed; almost every stretch has been repaired. If your time in Xi'an is short, go up at one gate and walk one stretch, and let the whole loop wait. To see how old the wall really is, half an hour in the Hanguang Gate museum shows more than a ride round the top.",
      faq: [
        {
          question: "Is the Xi'an City Wall worth visiting?",
          answer: "Yes, even for an hour. The top is 12 to 14 metres wide, so a walk along it feels like following a road above the city. The moat and park lie on one side, the old town on the other. The full circuit is 13.74 kilometres, but one stretch from the South Gate gives you the feel. Add the Hanguang Gate museum to see a Tang gate inside the wall.",
        },
        {
          question: "Should I walk or cycle the Xi'an City Wall?",
          answer: "Walk if you have an hour or so; cycle if the ride itself appeals. Walking one stretch and coming down again takes about 60 to 90 minutes. The full loop is 13.74 kilometres of brick paving with almost no shade, so cycling it is an outing of its own. Check the bike rental terms on the day.",
        },
        {
          question: "Which gate is best for getting onto the Xi'an City Wall?",
          answer: "For a first visit, the South Gate (Yongning Gate) is the easiest. It is the one main gate with all three of its towers standing, and the Bell Tower is 1.1 kilometres north up South Street. There are 17 official points to go up and come down, so you can also choose by where you are heading next; check that gate's hours first.",
        },
        {
          question: "When is the best time to visit the Xi'an City Wall?",
          answer: "Spring and autumn, in the late afternoon. There is almost no shade on top, so in summer wait until the bricks start to cool. Around the Spring Festival the wall is hung with lanterns for weeks, in recent years from January into March. If you stay after dark, check how late your exit gate is open.",
        },
        {
          question: "Do I need to book Xi'an City Wall tickets in advance?",
          answer: "Usually not far ahead: tickets can be bought on the day. How tickets are sold and checked changes from time to time, and lantern-festival days can differ, so check for your date before you go, or let us check it for you.",
        },
      ],
    },
    zh: {
      description: "西安城墙周长近 14 公里，墙顶宽得能骑车。在上面走一段或骑车绕一圈，再进嵌在墙里的博物馆，看唐代城门道上的车辙。",
      why: [
        "从南门登上城墙，墙顶像一条宽 12 到 14 米的大路，向东、向西笔直地伸出去，远到缩成一个点。自行车在砖面上颠簸着骑过。一边是老城，另一边是护城河和沿河绕城一圈的环城公园。每隔 120 米，城墙就向外突出一座宽大的平台，相邻两座离得正好够近，两边的守军都能射到中间的空当。",
        "这道城墙的走向，比它的城砖老得多。唐朝末年，长安屡遭兵火。904 年，镇守长安的将领放弃了外城和宫城，只守官署所在的皇城。明代就沿着这条线筑城，东、北两面向外扩出，1378 年完工。筑城时，唐皇城的一座城门含光门被封进了墙里，反倒因此保存到今天。即便如此，整座城墙围起来的地方，也只有唐长安城的七分之一左右，当年的长安，远远铺展到你脚下这道墙之外。",
        "它差一点就没能留下来。1958 年，北京正在拆城墙，西安也决定跟着拆，城头外沿那道矮墙的砖几乎被扒光。几位文物工作者给国务院发了电报，1959 年，保护西安城墙的通知下达了。如今脚下的城墙，大多是 1983 年以后修整的，2005 年前后整圈才重新连通。第一次来，从南门上去走一段就好；只有想骑车兜风，才值得绕完一整圈。",
      ],
      highlights: [
        {
          name: "从南门城头往下看",
          body: "登上南门城头，往下看城门之间那方围起来的院子：攻破外门的敌人会被困在这里，成了瓮中之鳖。四座主城门里，如今只有南门的三重城楼都在，最外面一座小楼管着吊桥，中间的箭楼开着一排排射箭的小窗，最里面是正楼。箭楼原物毁于 1926 年，现在看到的是 2014 年复建的。",
        },
        {
          name: "含光门：唐代路面上的车辙",
          body: "南城墙西头有一座嵌在墙体里的博物馆，里面是始建于 582 年的隋唐皇城含光门遗址。三条门道中，中间一条是皇帝专用的，西边那条的唐代路面上至今留着车辙。旁边的城墙剖面上，从隋唐夯起的土层到近现代的修补，一层层叠在一起。",
        },
        {
          name: "找到唯一的圆角",
          body: "从含光门沿城墙往西走，到西南城角。四个城角里只有这一个是圆的，通常的解释是，明代筑城时沿用了这里原有旧城墙的圆角。墙下的护城河也跟着弯成一道弧。",
        },
      ],
      time: "在城墙上走一段再下来，一个到一个半小时。骑车绕完一整圈，就得单独安排了，那半天剩下的时间别排太满。",
      when: "天热的季节，傍晚前后再上城墙，那时墙顶的砖已经开始降温。想待到天黑，先确认打算下城的那座门开到几点。城墙顶上几乎没有遮阴，春秋两季最舒服。春节前后，城墙上会挂起花灯，一挂就是好几周，近几年都持续到三月。",
      pair: "从南门沿南大街往北走约 1.1 公里、15 分钟，就到钟楼；再往前，鼓楼和回民街的小吃巷子都在附近。或者进城后往东拐，沿着卖笔墨字画的书院门老街，一直走到碑林博物馆。",
      skip: "想看原汁原味明城墙的人，可能会失望，几乎每一段都修补过。在西安时间紧，就从一座城门上去走一段，不必非绕一整圈。想知道城墙到底有多老，在含光门遗址博物馆待半个小时，比骑一圈看得更明白。",
      faq: [
        {
          question: "西安城墙值得去吗？",
          answer: "值得，哪怕只待一个小时。墙顶宽 12 到 14 米，走在上面像走在城市上空的一条大路，一边是护城河和公园，一边是老城。整圈 13.74 公里，但从南门上去走一段，就能感受到它的分量。再去含光门遗址博物馆，能看到包在城墙里的唐代城门。",
        },
        {
          question: "西安城墙是走路好还是骑车好？",
          answer: "只有一个小时左右就走路，想骑车兜风再租车。走一段再下来，大约 60 到 90 分钟。整圈 13.74 公里全是砖面，几乎没有遮阴，骑一圈得单独安排时间。租车的价格和规则，当天到现场再确认。",
        },
        {
          question: "西安城墙从哪个门上去最好？",
          answer: "第一次去，从南门（永宁门）上最省心。四座主城门里只有它的三重城楼都在，往北沿南大街走 1.1 公里就是钟楼。城墙共有 17 处上下城的地方，也可以按下一站去哪儿来选，但要先查好那座门的开放时间。",
        },
        {
          question: "什么时候去西安城墙最好？",
          answer: "春秋两季的傍晚最好。墙顶几乎没有遮阴，夏天要等砖面凉下来再上。春节前后城墙上挂满花灯，近几年都是从一月一直挂到三月。想待到天黑，先查好打算下城的那座门开到几点。",
        },
        {
          question: "西安城墙需要提前预约吗？",
          answer: "一般不需要提前很久订，当天也能买到票。买票和入场的方式时有调整，灯会等活动期间也可能不同，出发前查一下当天的情况，或者交给我们核实。",
        },
      ],
    },
    ko: {
      description: "시안 성벽은 둘레 14km 가까이, 위에서 자전거를 탈 만큼 넓습니다. 성벽 위를 걷고, 성벽 속 박물관에서 수레바퀴 자국이 남은 당나라 성문 유적을 찾아보세요.",
      why: [
        "남문으로 성벽에 오르면 윗면이 너비 12~14m의 길처럼 펼쳐져, 동서로 곧게 뻗다가 멀리 한 점이 됩니다. 자전거들이 벽돌 바닥 위를 덜컹거리며 지나갑니다. 한쪽은 옛 시가지, 다른 쪽은 해자와 성벽을 따라 한 바퀴 이어지는 공원입니다. 120m마다 성벽 바깥으로 넓은 치(雉)가 튀어나와 있습니다. 수원 화성의 치처럼, 이웃한 두 치의 병사가 그 사이를 함께 지킬 수 있도록 간격을 맞췄습니다.",
        "성벽이 지나는 자리는 벽돌보다 훨씬 오래되었습니다. 당나라 말 장안은 거듭 약탈당했고, 904년 장안을 지키던 장수는 바깥 성곽과 궁성을 버리고 관청이 모인 황성만 지켰습니다. 명나라는 그 선 위에 성을 쌓으며 동쪽과 북쪽을 바깥으로 넓혔고, 1378년에 완공했습니다. 이때 당나라 황성의 성문인 함광문이 성벽 속에 묻혔는데, 그 덕분에 지금까지 남았습니다. 그래도 성벽 안은 당나라 장안성의 7분의 1 정도로, 옛 장안은 지금 서 있는 성벽 너머로 훨씬 멀리 펼쳐져 있었습니다.",
        "성벽은 하마터면 사라질 뻔했습니다. 1958년 베이징이 성벽을 허물던 무렵 시안도 철거를 결정했고, 성벽 위 바깥쪽 낮은 담의 벽돌은 거의 다 뜯겨 나갔습니다. 문화재 관계자들이 국무원에 전보를 보냈고, 1959년 성벽을 보호하라는 지시가 내려왔습니다. 지금 걷는 성벽은 대부분 1983년 이후 보수한 것이고, 한 바퀴가 다시 이어진 것은 2000년대 중반입니다. 처음이라면 남문에서 한 구간만 걸어도 충분하고, 자전거 일주는 달리는 것 자체가 좋을 때만 하세요.",
      ],
      highlights: [
        {
          name: "남문 옹성 내려다보기",
          body: "남문 위 성벽에 서서 성문 사이에 둘러싸인 마당, 옹성을 내려다보세요. 바깥 문을 깨고 들어온 적을 가두던 곳으로 흥인지문(동대문)이나 수원 화성 팔달문의 옹성과 같은 원리인데, 네 정문 가운데 지금 문루 세 채가 모두 선 곳은 남문뿐입니다. 해자 위 다리를 들어 올리던 바깥 문루, 활 쏘는 작은 창이 줄지어 난 전루(箭樓), 안쪽의 본 문루 순이며, 전루는 1926년에 무너진 것을 2014년에 다시 지었습니다.",
        },
        {
          name: "함광문의 당나라 수레바퀴 자국",
          body: "남쪽 성벽 서쪽 끝 가까이, 성벽 속에 들어앉은 박물관에서 582년에 처음 세운 함광문의 유적을 볼 수 있습니다. 세 통로 중 한복판의 길은 황제만 다니던 길이었고, 서쪽 통로의 당나라 노면에는 수레바퀴 자국이 아직 남아 있습니다. 옆의 성벽 단면에는 수·당 때 다진 흙부터 근현대에 보수한 층까지 켜켜이 쌓여 있습니다.",
        },
        {
          name: "하나뿐인 둥근 모서리 찾기",
          body: "함광문에서 성벽 위를 따라 서쪽으로 가면 남서쪽 모서리가 나옵니다. 네 모서리 가운데 이곳만 둥근데, 흔히 명나라가 성을 쌓을 때 이 자리에 있던 옛 성벽의 모서리 모양을 그대로 살렸기 때문이라고 설명합니다. 성벽 아래 해자도 모서리를 따라 휘어 흐릅니다.",
        },
      ],
      time: "한 구간을 걷고 내려오는 데 1시간에서 1시간 30분쯤 걸립니다. 자전거로 한 바퀴를 돌려면 따로 시간을 내야 하니, 그 반나절에는 다른 일정을 빡빡하게 넣지 마세요.",
      when: "더운 철에는 바닥 열기가 식기 시작하는 늦은 오후에 오르세요. 해가 진 뒤까지 머물 생각이라면 내려올 성문이 몇 시까지 여는지 먼저 확인하세요. 성벽 위에는 그늘이 거의 없어 봄과 가을이 가장 편합니다. 춘절 무렵에는 성벽에 등불이 몇 주씩 걸리며, 최근에는 3월까지 이어졌습니다.",
      pair: "남문에서 남대가(南大街)를 따라 북쪽으로 1.1km, 15분쯤 걸으면 종루가 나오고, 고루와 그 뒤 회족거리(회민가)의 먹자골목도 가깝습니다. 아니면 성 안에서 동쪽으로 꺾어, 서울 인사동처럼 붓·먹·서화 가게가 늘어선 서원문 거리를 따라 비림박물관까지 걸어 보세요.",
      skip: "손대지 않은 명나라 성벽을 기대한다면 실망할 수 있습니다. 거의 모든 구간이 보수를 거쳤습니다. 시안 일정이 짧다면 한 성문으로 올라가 한 구간만 걸어도 충분합니다. 성벽의 진짜 나이가 궁금하다면 자전거로 한 바퀴 도는 것보다 함광문 유적 박물관에서 30분을 보내는 편이 낫습니다.",
      faq: [
        {
          question: "시안 성벽은 가 볼 만한가요?",
          answer: "네, 한 시간만 있어도 가 볼 만합니다. 성벽 윗면은 너비가 12~14m라, 걷다 보면 도시 위에 놓인 큰길을 따라가는 느낌입니다. 한쪽은 해자와 공원, 다른 쪽은 옛 시가지입니다. 한 바퀴는 13.74km지만 남문에서 한 구간만 걸어도 분위기를 충분히 느낄 수 있고, 함광문 유적 박물관에서는 성벽 속에 남은 당나라 성문을 볼 수 있습니다.",
        },
        {
          question: "시안 성벽은 걷는 게 좋을까요, 자전거가 좋을까요?",
          answer: "한 시간 남짓이라면 걷고, 달리는 것 자체를 즐기고 싶다면 자전거를 타세요. 한 구간을 걷고 내려오는 데 60~90분쯤 걸립니다. 한 바퀴 13.74km는 그늘이 거의 없는 벽돌길이라, 자전거로 돌려면 따로 시간을 내야 합니다. 자전거 대여 조건은 당일 현장에서 확인하세요.",
        },
        {
          question: "시안 성벽은 어느 문으로 올라가는 게 좋나요?",
          answer: "처음이라면 남문(영녕문)이 가장 편합니다. 네 정문 가운데 문루 세 채가 모두 선 유일한 문이고, 남대가를 따라 북쪽으로 1.1km 가면 종루입니다. 성벽에 오르내릴 수 있는 곳이 17곳이라 다음 목적지에 맞춰 골라도 되지만, 그 문의 운영 시간은 미리 확인하세요.",
        },
        {
          question: "시안 성벽은 언제 가는 게 가장 좋나요?",
          answer: "봄과 가을의 늦은 오후가 가장 좋습니다. 성벽 위에는 그늘이 거의 없어, 여름에는 벽돌이 식을 때까지 기다리세요. 춘절 무렵에는 성벽에 등불이 걸리는데, 최근에는 1월부터 3월까지 이어졌습니다. 해가 진 뒤까지 있을 생각이라면 내려올 성문의 운영 시간을 확인하세요.",
        },
        {
          question: "시안 성벽은 미리 예약해야 하나요?",
          answer: "보통은 오래전부터 예약할 필요가 없고, 당일에도 표를 살 수 있습니다. 표를 사고 입장하는 방식은 종종 바뀌고, 등불 축제 같은 행사 기간에는 다를 수 있으니 가기 전에 날짜별로 확인하거나 저희에게 맡겨 주세요.",
        },
      ],
    },
  },
  "shaanxi-history-museum": {
    en: {
      description: "At Xi'an's Shaanxi History Museum, find a land deal cast in bronze, a band riding a Tang camel and an envoy from Korea in a prince's tomb mural.",
      why: [
        "Around Xi'an, emperors lie under man-made mounds and whole hillsides, and the Tang capital is buried beneath the modern city. This museum is where you see what came out of that ground. Shaanxi was home to the capitals of the Zhou, Qin, Han and Tang. About 3,000 objects take you through their story in three halls, from the first humans here to 1840. Walk it once in order, and the tombs and ruins you visit afterwards each find their place in time.",
        "The most unusual collection is downstairs. Nearly 600 murals, over 1,000 square metres in all, were taken from the walls of more than 20 Tang tombs, among them those of princes and a princess. In them, Tang court life comes back in colour: hunting parties setting out, palace women, musicians and dancers. Painted on earth walls, they flake easily, so they are kept in a gallery of their own, in sealed cases that hold temperature and humidity steady.",
        "The museum has two sites. This page is about the Main Building in central Xi'an; the newer Qin-Han Gallery is a separate venue out in Xixian New Area. You will know the Main Building by its shape. The architect Zhang Jinqiu designed it as a pared-down Tang palace, a central hall with a tower at each corner. She dressed it in grey, white and black instead of imperial red and yellow. Basic entry is free with a reservation. The mural gallery costs extra, and it is the part to add if Tang life is what you came for.",
      ],
      highlights: [
        {
          name: "A land deal cast in bronze",
          body: "In the first hall stands a plain bronze cauldron, the Wusi Wei ding, with 207 characters cast inside. They record how, nearly 3,000 years ago, a man named Qiu Wei swapped fields with a neighbouring lord, and the king's ministers sent officials to mark the new boundaries. Its exact date, the fifth year of King Gong of Zhou, makes it a yardstick for dating other bronzes of its time.",
        },
        {
          name: "A band riding a camel",
          body: "In the third hall, a Tang three-colour camel carries a whole band on its back: seven seated men with foreign instruments, and a woman standing in the middle, singing. Nearby, a Five Dynasties green-glazed ewer from the Yaozhou kilns has a lid that never opens and a nursing lioness for a spout. It was filled through a plum-blossom hole in its base and does not leak when set upright.",
        },
        {
          name: "Envoys and polo in the mural gallery",
          body: "In the mural Reception of Envoys, from Prince Zhanghuai's tomb, three Tang officials receive three foreign envoys. The one in the middle, with two feathers in his cap, is most often read as an envoy from Silla in Korea, though some scholars say Goguryeo. From the same tomb comes a polo match more than six metres long, with some twenty riders chasing the ball at full gallop.",
        },
      ],
      time: "Ninety minutes takes you once through the three halls in order; two to three hours lets you read as you go. The mural gallery needs its own paid ticket; give it about an hour more.",
      when: "If you can, come before the Terracotta Warriors, so the Qin section gives you the background for the pits. The summer holidays, the Spring Festival and the national holidays are the hardest dates to book.",
      pair: "The Giant Wild Goose Pagoda is about two kilometres south-east, half an hour on foot or a short taxi ride. It was built in 652 to hold the scriptures the monk Xuanzang brought back from India. Keep the Terracotta Warriors for another day; both in one morning means rushing each.",
      skip: "If museums tire you, or your Xi'an days are already full with the Terracotta Warriors and the wall, leave it out. For Tang Chang'an in a smaller dose, the Hanguang Gate museum in the city wall shows a Tang gate on the spot where it stood.",
      faq: [
        {
          question: "Is the Shaanxi History Museum worth visiting?",
          answer: "Yes, especially before you see Xi'an's tombs and ruins. About 3,000 objects in three halls take you from the region's first humans to 1840, with the weight on the Zhou, Qin, Han and Tang, whose capitals were here. Basic entry is free with a reservation, and 90 minutes covers the main story.",
        },
        {
          question: "How long do you need at the Shaanxi History Museum?",
          answer: "About 90 minutes to walk the three halls once in order, or two to three hours to read as you go. Add about an hour for the Tang mural gallery, which has its own ticket. Arrive well before your time slot, because the queue, security and passport check take time.",
        },
        {
          question: "Do I need to book the Shaanxi History Museum in advance?",
          answer: "Yes. The main museum is free, but every visitor needs a real-name booking with the passport they will carry that day. Summer holidays and national holidays are the hardest to get, so book as soon as your date is fixed; we can also book it for you with your own passport.",
        },
        {
          question: "Is the Tang mural gallery worth the extra ticket?",
          answer: "Yes, if Tang life is what interests you. The museum holds nearly 600 murals from more than 20 Tang tombs, over 1,000 square metres in all, shown in sealed, climate-controlled cases. Look for the polo match, more than six metres long, and the foreign envoys, one of them most often read as an envoy from Silla in Korea. Give it about an hour on top of the main halls.",
        },
        {
          question: "Should I see the Shaanxi History Museum before the Terracotta Warriors?",
          answer: "Yes, if your days allow it. The museum's Qin section gives you the background for the pits, and its three halls place the First Emperor among the dynasties before and after him. Keep the two on separate days, because the Warriors take most of a day on their own, with about three hours on site.",
        },
      ],
    },
    zh: {
      description: "西安陕西历史博物馆：去找铸着西周一桩换地交易的青铜鼎、驼背上的唐代乐队，还有唐墓壁画里来自朝鲜半岛的使节。",
      why: [
        "在西安，帝王们长眠在人工堆起的封土和整座山下，唐长安城则埋在今天的城市底下。这座博物馆，把从这片土地下挖出来的东西，按时代顺序摆在你眼前。周、秦、汉、唐都在陕西建过都。三个展厅里的三千余件文物，从这里最早的古人类一直讲到 1840 年。按顺序走一遍，之后再去看的陵墓和遗址，都能在时间线上找到位置。",
        "最特别的收藏在地下一层。馆里藏有 20 多座唐墓的壁画近 600 幅，共 1000 多平方米，其中有太子墓，也有公主墓。壁画里，唐代宫廷的生活重新有了颜色：出行打猎的队伍、宫女、乐手和舞者。这些壁画原本绘在土墙上，容易掉色掉渣，所以单独建了一座展馆，放在恒温恒湿的密封展柜里。",
        "陕历博现在有两处场馆，这里说的是西安市区的本馆；新开的秦汉馆在西咸新区，是另一处。本馆很好认：建筑师张锦秋把它设计成一座简化了的唐代宫殿，中间一座主殿，四个角上各有一座高楼，外观用黑、白、灰，而不用皇家建筑惯用的红墙黄瓦。基本陈列免费，但要预约；壁画馆另外收费，如果你是冲着唐代生活来的，就值得加上。",
      ],
      highlights: [
        {
          name: "一桩铸在青铜里的土地交易",
          body: "第一展厅有一件造型朴素的青铜鼎，叫五祀卫鼎，内壁铸着 207 个字。记的是近三千年前，一个叫裘卫的人和邻近的一位贵族换地，朝中大臣派官员到现场，划定了新的地界。铭文写明了年份，是西周共王五年，学者因此拿它来推定同时期其他青铜器的年代。",
        },
        {
          name: "驼背上的乐队",
          body: "第三展厅里，一峰唐三彩骆驼背上驮着整整一支乐队：七个男乐手拿着胡人的乐器盘腿坐着，中间站着一位唱歌的女子。附近还有一件五代耀州窑的青釉倒灌壶，壶盖是假的，打不开；盖和壶身相接的地方，塑着一只正给小狮子喂奶的母狮，它张开的嘴就是壶嘴。酒要从壶底的梅花孔灌进去，把壶放正也不会漏。",
        },
        {
          name: "壁画馆里的使节与马球",
          body: "章怀太子墓的《客使图》里，三位唐朝官员正在接待三位外国使节。使节中间那位冠上插着两根羽毛，一般认为是新罗使节，也有学者主张来自高句丽。同一座墓里还出土了《马球图》，画面长 6 米多，二十多骑人马正策马争球。",
        },
      ],
      time: "按顺序走完三个展厅，一个半小时；边走边细看，要两三个小时。壁画馆要另外买票，再加一个小时左右。",
      when: "能安排的话，放在兵马俑之前。先在秦代展区补补课，再去看俑坑，会明白得多。暑假、春节和国庆、五一这样的长假最难约。",
      pair: "大雁塔在博物馆东南约 2 公里，步行半小时左右，打车只是一小段路。塔建于 652 年，用来存放玄奘从印度带回的经卷。别把兵马俑和这里塞进同一个上午，两处都会看得很赶。",
      skip: "对博物馆兴趣不大，或者在西安的几天已经被兵马俑和城墙排满的人，可以不来。想用更少的时间感受唐长安，可以去嵌在城墙里的含光门遗址博物馆，唐代城门的遗址就在原地。",
      faq: [
        {
          question: "陕西历史博物馆值得去吗？",
          answer: "值得，尤其是在去看西安的陵墓和遗址之前。三个展厅里的三千余件文物，从这里最早的古人类一直讲到 1840 年，重点是在陕西建都的周、秦、汉、唐。基本陈列免费，但要预约；一个半小时就能把主线走完。",
        },
        {
          question: "参观陕西历史博物馆要多长时间？",
          answer: "按顺序走完三个展厅大约一个半小时，边看边读要两三个小时。唐代壁画珍品馆另外买票，再加一个小时左右。排队、安检和核验护照都要时间，最好比预约的时段早些到。",
        },
        {
          question: "陕西历史博物馆需要提前预约吗？",
          answer: "需要。本馆免费，但每位游客都要用自己当天要带的护照实名预约，暑假和节假日最难约，日期一定就尽早约；我们也可以用你本人的护照帮你预约。",
        },
        {
          question: "唐代壁画馆值得另外买票吗？",
          answer: "如果你对唐代生活感兴趣，值得。馆里藏有 20 多座唐墓的壁画近 600 幅，共 1000 多平方米，放在恒温恒湿的密封展柜里。别错过 6 米多长的《马球图》，还有画着外国使节的《客使图》，其中一位一般认为是新罗使节。在基本陈列之外，再留一个小时左右。",
        },
        {
          question: "陕西历史博物馆和兵马俑，先去哪个？",
          answer: "日程允许的话，先来博物馆。秦代展区能给俑坑补上背景，三个展厅也能让你看清秦始皇前后各朝的位置。两处最好分在不同的日子：兵马俑单独就要大半天，光在景区里就得三个小时左右。",
        },
      ],
    },
    ko: {
      description: "시안 산시역사박물관에서 서주 시대 토지 거래를 기록한 청동 솥, 낙타 등에 올라탄 당나라 악단, 왕자 무덤 벽화 속 조우관을 쓴 사신을 찾아보세요.",
      why: [
        "시안 일대의 황제들은 사람이 쌓은 봉분이나 산 하나를 통째로 무덤으로 삼았고, 당나라 장안성은 지금의 도시 아래에 묻혀 있습니다. 이 박물관에서는 그 땅속에서 나온 것들을 시대순으로 볼 수 있습니다. 산시는 주·진·한·당이 도읍을 두었던 곳으로, 세 전시실의 유물 3천여 점이 이 땅의 첫 인류부터 1840년까지 이어집니다. 한 번 순서대로 걷고 나면, 그다음에 가는 무덤과 유적이 연표 어디쯤에 놓이는지 보입니다.",
        "가장 특별한 소장품은 지하에 있습니다. 당나라 무덤 20여 기의 벽에서 떼어 온 벽화가 600점 가까이 있고, 모두 합치면 1,000㎡가 넘습니다. 그 무덤 가운데에는 태자와 공주의 무덤도 있습니다. 벽화 속에서는 사냥 길에 나서는 행렬, 궁녀, 악사와 무희가 당나라 궁정의 삶을 색으로 되살립니다. 흙벽에 그린 그림이라 쉽게 바래고 부스러지기 때문에, 전용 전시관의 밀폐 진열장에 담아 온도와 습도를 일정하게 지킵니다.",
        "박물관은 지금 두 곳이며, 이 페이지는 시안 도심의 본관을 다룹니다. 새로 문을 연 진한관은 시셴신구에 있는 별도의 시설입니다. 본관은 생김새로 알아볼 수 있습니다. 건축가 장진추의 작품으로 당나라 궁전을 간결하게 압축한 모습인데, 가운데 큰 전각을 두고 네 모서리에 누각을 세웠으며, 황실 건축의 붉은 벽과 노란 기와 대신 검정·흰색·회색을 썼습니다. 기본 관람은 예약하면 무료이고, 벽화관은 따로 돈을 내야 하지만 당나라 사람들의 삶이 궁금해서 왔다면 꼭 더할 만합니다.",
      ],
      highlights: [
        {
          name: "청동 솥에 남은 토지 거래",
          body: "제1전시실의 수수한 청동 솥 오사위정(五祀衛鼎) 안쪽에는 글자 207자가 주조되어 있습니다. 3천 년 가까이 전, 구위(裘衛)라는 사람이 이웃 귀족과 땅을 바꾸자 조정 대신들이 관리를 보내 새 경계를 정했다는 기록입니다. 서주 공왕 5년이라는 연도가 분명해서, 같은 시기 다른 청동기의 연대를 가늠하는 기준이 됩니다.",
        },
        {
          name: "낙타 등에 올라탄 악단",
          body: "제3전시실의 당삼채 낙타는 등에 악단 하나를 통째로 싣고 있는데, 서역 악기를 든 남자 악사 일곱 명이 둘러앉고 가운데에 여자 한 명이 서서 노래합니다. 근처의 오대(五代) 요주요(耀州窯) 청자 주전자는 뚜껑이 열리지 않는 가짜이고, 새끼에게 젖을 먹이는 어미 사자의 벌린 입이 주둥이입니다. 바닥의 매화 모양 구멍으로 술을 채우는데, 바로 세워도 새지 않습니다.",
        },
        {
          name: "벽화관의 사신과 격구",
          body: "장회태자 묘의 ‘예빈도(禮賓圖)’에서는 당나라 관리 셋이 외국 사신 셋을 맞습니다. 가운데 사신은 새 깃털 두 개를 꽂은 조우관(鳥羽冠)을 썼는데, 흔히 신라 사신으로 보며 고구려 사신이라는 견해도 있습니다. 같은 무덤의 ‘마구도(馬毬圖)’에서는 6m가 넘는 화면에서 기수 20여 명이 말을 달리며 공을 다투는데, 고려와 조선 초에 성행한 격구와 같은 계통의 경기입니다.",
        },
      ],
      time: "세 전시실을 순서대로 한 번 둘러보는 데 1시간 30분, 설명을 읽으며 천천히 보려면 2~3시간입니다. 당대(唐代) 벽화관은 입장권을 따로 사야 하며, 1시간쯤 더 잡으세요.",
      when: "가능하면 병마용보다 먼저 오세요. 진나라 전시를 보고 가면 병마용갱이 훨씬 잘 이해됩니다. 여름방학과 춘절, 국경절·노동절 연휴에는 예약이 가장 어렵습니다.",
      pair: "대안탑은 박물관에서 남동쪽으로 약 2km, 걸어서 30분쯤이고 택시로도 금방입니다. 현장 법사가 인도에서 가져온 경전을 보관하려고 652년에 세운 탑입니다. 병마용과 같은 오전에 몰아넣으면 두 곳 다 서둘러 보게 되니 다른 날로 나누세요.",
      skip: "박물관에 큰 흥미가 없거나, 시안 일정이 병마용과 성벽으로 이미 꽉 찼다면 건너뛰어도 됩니다. 당나라 장안을 짧게 맛보고 싶다면 성벽 속에 들어앉은 함광문 유적 박물관에서 제자리에 남은 당나라 성문 유적을 볼 수 있습니다.",
      faq: [
        {
          question: "산시역사박물관은 가 볼 만한가요?",
          answer: "네, 특히 시안의 무덤과 유적을 보러 가기 전이라면 꼭 가 볼 만합니다. 세 전시실의 유물 3천여 점이 이 땅의 첫 인류부터 1840년까지 이어지며, 이곳에 도읍을 두었던 주·진·한·당에 무게를 둡니다. 기본 관람은 예약하면 무료이고, 1시간 30분이면 큰 줄기를 볼 수 있습니다.",
        },
        {
          question: "산시역사박물관 관람에는 시간이 얼마나 걸리나요?",
          answer: "세 전시실을 순서대로 한 번 보는 데 1시간 30분, 설명을 읽으며 보려면 2~3시간입니다. 입장권을 따로 사야 하는 당대 벽화관은 1시간쯤 더 잡으세요. 줄서기와 보안 검색, 여권 확인에도 시간이 걸리니 예약한 시간대보다 일찍 도착하세요.",
        },
        {
          question: "산시역사박물관은 미리 예약해야 하나요?",
          answer: "네. 본관은 무료지만, 관람객마다 당일 가져갈 본인 여권으로 실명 예약을 해야 합니다. 여름방학과 연휴에 가장 예약하기 어려우니 날짜가 정해지면 바로 예약하세요. 본인 여권으로 저희가 대신 예약해 드릴 수도 있습니다.",
        },
        {
          question: "당대 벽화관은 따로 표를 살 만한가요?",
          answer: "당나라 사람들의 삶에 관심이 있다면 그렇습니다. 당나라 무덤 20여 기에서 옮겨 온 벽화 600점 가까이, 모두 1,000㎡가 넘는 그림을 온도와 습도를 지키는 밀폐 진열장에 담아 보여 줍니다. 6m가 넘는 ‘마구도’와, 흔히 신라 사신으로 보는 인물이 나오는 ‘예빈도’를 놓치지 마세요. 본관 관람에 1시간쯤 더 잡으면 됩니다.",
        },
        {
          question: "산시역사박물관과 병마용, 어디부터 가야 하나요?",
          answer: "일정이 된다면 박물관을 먼저 보세요. 진나라 전시가 병마용갱을 볼 배경이 되어 주고, 세 전시실을 지나며 진시황이 앞뒤 왕조 사이 어디에 놓이는지 알게 됩니다. 두 곳은 다른 날로 나누세요. 병마용은 현장에서만 3시간쯤 걸려, 그것만으로도 하루가 거의 다 갑니다.",
        },
      ],
    },
  },
  "west-lake": {
    en: {
      description: "Hangzhou's West Lake at dawn: mist on the Su Causeway, willows trailing in still water, no ticket, no gate. Three places to find, and how to add Lingyin.",
      why: [
        "At six or seven in the morning, mist still hangs over the Su Causeway, willow branches trail in the water and the hills fade layer by layer into the distance, like an ink painting not quite dry. The poet Su Dongpo wrote that West Lake is lovely whether lightly or richly made up, and this is the face he meant.",
        "There is no ticket and no gate: the whole shore, about 15 kilometres round, is open park, day and night. The lake was shaped by people over a thousand years. Su Dongpo had mud dug from its bed and piled into the causeway that bears his name, and the Qianlong Emperor loved it so much he modelled a causeway at the Summer Palace in Beijing on it.",
      ],
      highlights: [
        {
          name: "The Su Causeway",
          body: "Almost three kilometres of willows and peach trees from the south shore to the north, broken by six arched stone bridges. Stop on one and look both ways: the quiet inner lake and the hills to the west, open water and the city to the east.",
        },
        {
          name: "Three Pools Mirroring the Moon",
          body: "Take a boat to the island in the middle of the lake. The three little stone pagodas standing in the water are the picture on the back of the one-yuan note.",
        },
        {
          name: "Leifeng Pagoda",
          body: "The pagoda of the Lady White Snake legend, where a monk imprisoned the snake spirit. Climb to the top for the whole lake spread out below, or watch it from the north shore at dusk, when the evening glow catches it: one of the lake's ten classic views.",
        },
      ],
      time: "Half a day for a boat to the island, the Su Causeway on foot and one pagoda. A full day if you add Lingyin Temple on the west side.",
      when: "Early morning, before eight, when the causeway is still quiet. Spring brings fresh willows and peach blossom on the Su Causeway; summer brings lotus, roughly late June to August. Avoid the May Day holiday and the first week of October, when the whole shore fills.",
      pair: "Lingyin Temple and the Buddhist rock carvings of Feilai Peak are about half an hour west by car. The Longjing tea villages lie in the hills south of the temple, on a back road to the lake, so they make an easy stop on the way back.",
      skip: "Anyone after drama: the hills are low, and on a hazy day they vanish altogether. With only an hour or two, take a boat to the island rather than trying to walk the shore.",
    },
    zh: {
      description: "杭州西湖：清晨苏堤上的薄雾和垂柳，不要门票，绕湖一圈就是一整座公园。别错过的三处，以及怎样和灵隐寺排在同一天。",
      why: [
        "清晨六七点，苏堤上的薄雾还没散，柳枝垂到水面，远处的山一层比一层淡，像一幅还没干透的水墨画。苏东坡写西湖“淡妆浓抹总相宜”，说的就是这副样子。",
        "西湖不要门票，环湖一圈约 15 公里，日夜开放，没有大门。这片湖是一千多年里一代代人修出来的：苏东坡把湖底挖出的泥堆成了今天的苏堤，乾隆喜欢得不得了，还在北京颐和园照着修了一道。",
      ],
      highlights: [
        {
          name: "苏堤",
          body: "近 3 公里的长堤从南岸通到北岸，一株杨柳一株桃，中间隔着六座石拱桥。站在桥上两头看：一边是安静的里湖和远山，一边是开阔的湖面和城市。",
        },
        {
          name: "三潭印月",
          body: "坐船到湖中的小岛，三座小石塔立在水里，就是一元人民币背面的那幅画。",
        },
        {
          name: "雷峰塔",
          body: "《白蛇传》里压住白娘子的那座塔。登上顶层，整个西湖都在眼前；傍晚从北岸看过去，晚霞映着塔身，就是西湖十景里的“雷峰夕照”。",
        },
      ],
      time: "半天：坐船上岛，走完苏堤，再登一座塔。加上西边的灵隐寺，就是一整天。",
      when: "最好清晨八点前到，苏堤上还很安静。春天看新柳和苏堤桃花；夏天看荷花，大约六月下旬到八月。避开五一和国庆黄金周，那几天整个湖边都挤满了人。",
      pair: "灵隐寺和刻满佛像的飞来峰在西边，开车约半小时。龙井村的茶园在灵隐寺南边的山里，那里有条小路直通湖边，返程正好顺路停一下。",
      skip: "只想看壮观风景的人：这里的山不高，赶上灰蒙蒙的天，远山干脆整个看不见。只有一两个小时的话，坐船上岛，比沿着湖岸走更值得。",
    },
    ko: {
      description: "항저우 서호: 이른 아침 소제 위의 물안개와 버드나무, 입장료도 문도 없이 호수 전체가 공원입니다. 꼭 볼 세 곳과 영은사와 함께 도는 하루까지.",
      why: [
        "아침 6~7시, 소제 위로 물안개가 아직 걷히지 않았고, 버드나무 가지가 수면까지 늘어지며, 먼 산은 겹겹이 옅어져 마르지 않은 수묵화 같습니다. 소동파가 서호를 ‘옅은 화장도 짙은 화장도 다 어울린다’고 읊은 게 바로 이런 모습입니다.",
        "서호에는 입장료도 문도 없습니다. 둘레 약 15km의 호숫가 전체가 밤낮으로 열려 있는 공원입니다. 이 호수는 천 년 넘게 사람들이 가꿔 온 풍경입니다. 동파육으로도 이름이 익숙한 소동파가 호수 바닥의 진흙을 퍼 올려 지금의 소제를 쌓았고, 건륭제는 이 풍경을 너무 좋아한 나머지 베이징 이화원에도 이를 본뜬 둑길을 만들었습니다.",
      ],
      highlights: [
        {
          name: "소제",
          body: "남쪽 호숫가에서 북쪽 호숫가까지 이어지는 3km 가까운 둑길로, 버드나무와 복숭아나무가 번갈아 늘어서 있고 아치형 돌다리 여섯 개가 놓여 있습니다. 다리 위에서 양쪽을 둘러보세요. 한쪽은 고요한 안쪽 호수와 산, 다른 쪽은 탁 트인 호수와 도시입니다.",
        },
        {
          name: "삼담인월",
          body: "배를 타고 호수 가운데 섬으로 가 보세요. 물 위에 선 작은 돌탑 세 개가 바로 1위안 지폐 뒷면의 그 그림입니다.",
        },
        {
          name: "뇌봉탑",
          body: "중국 4대 민간 전설 가운데 하나인 백사전(백낭자와 허선의 사랑 이야기)에서 스님이 백낭자를 가둔 탑입니다. 꼭대기에 오르면 서호 전체가 내려다보이고, 해 질 녘 북쪽 호숫가에서 바라보면 노을에 물든 탑이 서호십경의 하나인 ‘뇌봉석조’입니다.",
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
      description: "Hongyadong after dark: eleven storeys of stilt houses glow gold on a cliff above the Jialing. Where to see it from, and the walk from top floor to river.",
      why: [
        "As darkness falls, eleven storeys of stilt-house-style buildings light up level by level along a cliff above the Jialing River, their gold reflected in the water, like a town out of a Miyazaki film. See it from the bridge or the far bank and you understand why Chongqing is nicknamed the 8D city.",
        "Going inside is a trick of its own: you walk in from a city street on the top floor and come out at the bottom, on the river road. Chongqing is built on slopes so steep that the ground floor depends on which side you arrive from.",
        "It looks old but opened in 2006, copying the stilt houses that once lined both rivers, and inside it is a vertical mall of snack stalls and souvenir shops, packed on a busy evening. You come for the moment the lights come on.",
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
      description: "重庆洪崖洞：天一黑，十一层吊脚楼沿着嘉陵江边的悬崖亮起金光，像动画里走出来的城。从哪看最美，怎么从顶楼一路走到江边。",
      why: [
        "天一黑，十一层吊脚楼沿着嘉陵江边的悬崖一层层亮起来，金光倒映在江面上，像宫崎骏动画里走出来的城。站在桥上或对岸看它，你会明白重庆为什么被叫作“8D 魔幻城市”。",
        "走进去更好玩：从城里一条马路进门，那是顶楼 11 楼；一路往下走到底，出来已经是江边的马路。重庆就是这样一座建在山上的城市，“一楼”在哪，要看你从哪边进来。",
        "它看着古老，其实是 2006 年照着老重庆吊脚楼的样子新建的，里面一层层都是小吃和纪念品店，晚上人挤人。来这里，是为了看它亮灯的那一眼。",
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
      description: "충칭 홍야동: 해가 지면 11층 조각루가 자링강 절벽을 따라 금빛으로 빛나, 애니메이션 속 마을 같습니다. 가장 잘 보이는 자리와 꼭대기 층에서 강변까지 걷는 길.",
      why: [
        "해가 지면 11층짜리 조각루(비탈에 기둥을 세워 지은 전통 가옥) 양식 건물이 자링강 절벽을 따라 한 층씩 불을 밝히고, 금빛이 강물에 비칩니다. 미야자키 하야오의 애니메이션 속 마을 같습니다. 다리 위나 강 건너편에서 바라보면 충칭을 왜 ‘8D 도시’라고 부르는지 알게 됩니다.",
        "안으로 들어가 보면 더 재미있습니다. 시내 도로에서 걸어 들어가면 그곳이 꼭대기 11층이고, 계속 내려와 맨 아래층으로 나가면 강변 도로입니다. 충칭은 이렇게 산 위에 세운 도시라, 어느 쪽으로 들어오느냐에 따라 ‘1층’이 달라집니다.",
        "오래된 건물 같지만 2006년에 옛 충칭의 조각루를 본떠 새로 지었고, 안은 층마다 먹거리 노점과 기념품 가게로 가득해 저녁이면 사람으로 북적입니다. 이곳에 오는 이유는 불이 켜지는 그 순간을 보기 위해서입니다.",
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

export const sightStoryMeta: Partial<Record<SightId, SightStoryMeta>> = {
  "great-wall": {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "UNESCO World Heritage Centre: The Great Wall", url: "https://whc.unesco.org/en/list/438/" },
      { title: "Beijing government: Badaling Great Wall", url: "https://english.beijing.gov.cn/travellinginbeijing/attractions/202603/t20260320_4562521.html" },
      { title: "Beijing government: Mutianyu Great Wall", url: "https://english.beijing.gov.cn/travellinginbeijing/attractions/202603/t20260325_4566115.html" },
      { title: "Mutianyu Great Wall official site", url: "https://en.mutianyugreatwall.com/" },
      { title: "Visit Beijing: 八达岭长城", url: "https://s.visitbeijing.com.cn/attraction/101406" },
    ],
    alternateName: ["Great Wall of China", "长城", "万里长城", "만리장성", "Badaling Great Wall", "八达岭长城", "Mutianyu Great Wall", "慕田峪长城"],
    sameAs: ["https://en.wikipedia.org/wiki/Great_Wall_of_China", "https://www.wikidata.org/wiki/Q12501", "https://whc.unesco.org/en/list/438/"],
  },
  "terracotta-warriors": {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "UNESCO World Heritage Centre: Mausoleum of the First Qin Emperor", url: "https://whc.unesco.org/en/list/441/" },
      { title: "Emperor Qinshihuang's Mausoleum Site Museum: Pit 1", url: "https://www.bmy.com.cn/pitone.html" },
      { title: "Emperor Qinshihuang's Mausoleum Site Museum: Pit 2", url: "https://www.bmy.com.cn/pittwo.html" },
      { title: "Emperor Qinshihuang's Mausoleum Site Museum: the bronze chariots", url: "https://www.bmy.com.cn/pithorse.html" },
      { title: "Xinhua: 50 years since the Terracotta Warriors were found (2024)", url: "https://www.news.cn/politics/20240909/39a50eca54654ada85168f8ddae2e8e4/c.html" },
    ],
    alternateName: ["Terracotta Army", "Terracotta Warriors and Horses", "兵马俑", "秦始皇兵马俑", "병마용", "Bingmayong", "Emperor Qinshihuang's Mausoleum Site Museum", "秦始皇帝陵博物院", "진시황제릉박물원"],
    sameAs: ["https://en.wikipedia.org/wiki/Terracotta_Army", "https://www.wikidata.org/wiki/Q47672", "https://whc.unesco.org/en/list/441/"],
  },
  "xian-city-wall": {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "Qujiang New District Management Committee: the wall's 13.74 km circuit (2026)", url: "https://qjxq.xa.gov.cn/xwzx/xwdt/2032394805232328706.html" },
      { title: "Qujiang New District Management Committee: the wall's 17 access points (2025)", url: "https://qjxq.xa.gov.cn/xwzx/xwdt/1949774484239577090.html" },
      { title: "China News Service: how the Xi'an City Wall was saved in 1959 (2015)", url: "https://www.chinanews.com.cn/m/gn/2015/03-06/7108190.shtml" },
      { title: "China News Service: Hanguang Gate site museum opens (2008)", url: "https://www.chinanews.com/cul/news/2008/09-27/1396235.shtml" },
    ],
    alternateName: ["Xi'an City Wall", "Fortifications of Xi'an", "Xi'an Ming City Wall", "西安城墙", "西安明城墙", "시안 성벽", "Xi'an Chengqiang"],
    sameAs: ["https://en.wikipedia.org/wiki/Fortifications_of_Xi%27an", "https://www.wikidata.org/wiki/Q1334336"],
  },
  "shaanxi-history-museum": {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "Shaanxi History Museum: about the museum", url: "https://www.sxhm.com/about.html" },
      { title: "Shaanxi History Museum: the basic exhibition, Ancient Civilization of Shaanxi", url: "https://www.sxhm.com/basic_display.html" },
      { title: "Shaanxi History Museum: Tang Dynasty Mural Treasures Gallery", url: "https://www.sxhm.com/tang_mural.html" },
      { title: "Shaanxi History Museum: the Wusi Wei ding", url: "https://www.sxhm.com/collections/detail/511.html" },
      { title: "Shaanxi History Museum: visiting the Main Building (English)", url: "https://en.sxhm.com/en/new/visit.html" },
    ],
    alternateName: ["Shaanxi History Museum", "陕西历史博物馆", "陕历博", "산시역사박물관", "섬서역사박물관", "Shaanxi Lishi Bowuguan"],
    sameAs: ["https://en.wikipedia.org/wiki/Shaanxi_History_Museum", "https://www.wikidata.org/wiki/Q1151210"],
  },
};

export function getSightStoryMeta(id: SightId): SightStoryMeta | null {
  return sightStoryMeta[id] ?? null;
}

export function getSightStory(id: SightId, locale: HomegroundLocale): SightStory | null {
  return sightStories[id]?.[locale] ?? null;
}
