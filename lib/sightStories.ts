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
};

export function getSightStoryMeta(id: SightId): SightStoryMeta | null {
  return sightStoryMeta[id] ?? null;
}

export function getSightStory(id: SightId, locale: HomegroundLocale): SightStory | null {
  return sightStories[id]?.[locale] ?? null;
}
