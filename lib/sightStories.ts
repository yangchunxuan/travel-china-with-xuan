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
        "Beyond the main route, choose one side; trying to see both wears most people out before they reach the garden. Go east for treasure, from the jewels and jade of the Treasure Gallery to a hall of old clocks, most from England and some made in China. Each gallery has its own ticket. Go west for the small courtyards of the empresses and consorts. Cixi lived in one, the Palace of Gathered Elegance, as a young consort and gave birth to the future Tongzhi Emperor there. Decades later she moved back to celebrate her fiftieth birthday, and the bronze dragons and deer in the courtyard were cast for the occasion. Her rooms are still set out as they were then.",
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
      faq: [
        {
          question: "Is the Forbidden City worth visiting?",
          answer: "Yes, and on a first trip to Beijing it is the sight to put first. For nearly five hundred years 24 emperors lived here and ordinary people could not get in. Now you walk their route gate by gate, from the great squares to the family's own garden. You don't need to see it all: three hours for the main route and one side is plenty.",
        },
        {
          question: "How long do you need at the Forbidden City?",
          answer: "Plan on three hours inside for the main route through the middle and one side, plus time before that for security at the gate. If someone in your group tires easily, the museum's own two-hour route covers the essentials. If you still have the legs afterwards, climbing Jingshan for the view over the roofs takes about forty minutes more.",
        },
        {
          question: "Do I need to book Forbidden City tickets in advance?",
          answer: "Yes. No tickets are sold on the day, and each visitor books in their own name with the passport they will bring to the gate. Summer and holiday dates sell out fast, so be ready the moment tickets for your date are released. The rules change from time to time, and we can check them for your date and book for you.",
        },
        {
          question: "What is the best time to visit the Forbidden City?",
          answer: "A weekday morning in spring or autumn, roughly April to May and September to October. Be in the queue before the gates open so you reach the great halls ahead of the crowd; inside, it is busiest from about ten until early afternoon. Avoid the May Day holiday and the first week of October, and expect hot, shadeless courtyards in July and August.",
        },
        {
          question: "Why is it called the Forbidden City?",
          answer: "Because for nearly five centuries ordinary people were forbidden to enter. Its Chinese name, Zijincheng, means the Purple Forbidden City. Purple stood for the Pole Star, where the emperor of heaven was believed to live, and this was the home of his son on earth. Since 1925 it has been the Palace Museum, the name you will see on tickets and signs.",
        },
      ],
    },
    zh: {
      description: "北京故宫：从午门走进去，一道门接一道门，一直走到皇帝一家住过的院子。别错过的三处、留多久，出门再上景山看全景。",
      why: [
        "穿过高大的午门，眼前突然空出一大片广场，远处是金黄屋顶的大殿，人会一下子安静下来。将近五百年里，24 位皇帝住在这道宫墙里，寻常百姓一步也进不来；如今，你可以沿着他们走过的路，一道门、一座殿地往里走。",
        "一路向北，院子先是越来越开阔，到太和殿前最大，当年文武百官就在这里排队朝拜；再往里，就走进了皇帝一家生活的小院子，房子变小了，花木多了起来，一下子从“朝廷”变成了“家”。它太大了，没人一次看得完，也不必看完。",
        "除了中间这条主路，东西两边只挑一边逛；两边都想看，多半还没走到御花园就没力气了。往东看宝贝，有珍宝馆里的金银珠玉，也有一座摆满老钟表的展馆，钟大多是英国造的，少数是中国自己做的。这两个馆都要另外买票。往西走，看的是皇后、妃嫔们怎么过日子。慈禧年轻时就住在这边的储秀宫，在这里生下了后来的同治皇帝；几十年后，她为过五十大寿又搬了回来。屋里的摆设至今还是那时的样子，院子里那对铜龙和铜鹿，也是为那次大寿铸的。",
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
      faq: [
        {
          question: "北京故宫值得去吗？",
          answer: "值得，第一次来北京，最该先去的就是这里。这座宫城住过 24 位皇帝，将近五百年不许百姓进门；如今你可以穿过午门，一道门一道门往北走，直到皇帝一家的后花园。不必全部看完，中间的主路加上一边，三个小时就够了。",
        },
        {
          question: "逛故宫需要多长时间？",
          answer: "宫里留三个小时左右，走完中间的主路，再挑东边或西边逛一路；进门前的安检时间另算。同行有人体力一般的话，就走故宫自己推荐的两小时路线，主要的地方也都能看到。出来要是还走得动，再爬景山看全景，大约多留四十分钟。",
        },
        {
          question: "故宫门票要提前预约吗？",
          answer: "一定要，故宫不卖当天的票。每个人都要用自己的护照实名预约，入宫时带上预约用的那本护照。暑假和节假日的票很快约满，放票的时候就要准备好。规则时常调整，我们可以按你的日期核实并代为预约。",
        },
        {
          question: "什么时候去故宫最好？",
          answer: "春秋两季的平日上午最好，大约是四五月和九、十月。开门前就排进队里，赶在人潮前面走到几座大殿；宫里大约十点到午后人最多。避开五一和国庆黄金周；七八月，石头院子又晒又热，几乎找不到阴凉。",
        },
        {
          question: "故宫为什么叫“紫禁城”？",
          answer: "因为将近五百年里，这里是寻常百姓不许进入的禁地。“紫”来自紫微星，也就是北极星，古人相信天帝就住在那里；皇帝是“天子”，他在人间的家，就叫紫禁城。1925 年起，这里改成了博物馆，门票和指示牌上写的都是“故宫博物院”。",
        },
      ],
    },
    ko: {
      description: "베이징 자금성: 오문으로 들어가 문 하나, 전각 하나를 지나 황제 가족이 살던 안뜰까지. 놓치지 말 세 곳과 관람 시간, 나와서 경산공원에 올라 보는 전경까지.",
      why: [
        "높은 오문을 지나면 눈앞에 거대한 광장이 갑자기 열리고, 저 멀리 황금빛 지붕의 전각이 보입니다. 사람들은 저절로 말수가 줄어듭니다. 500년 가까이 24명의 황제가 이 담장 안에서 살았고, 일반 백성은 한 번도 들어올 수 없었습니다. 이제는 그들이 걷던 길을 따라 문 하나, 전각 하나씩 안으로 걸어 들어갈 수 있습니다.",
        "북쪽으로 갈수록 마당은 점점 넓어져 태화전 앞에서 가장 크게 트입니다. 신하들이 품계대로 줄지어 서던 곳입니다. 더 안으로 들어가면 황제 가족이 살던 작은 안뜰이 나오고, 건물은 작아지고 나무와 정원이 많아지면서 ‘조정’이 ‘집’으로 바뀝니다. 한 번에 다 볼 수도 없고, 다 볼 필요도 없습니다.",
        "가운데 큰길 외에는 동쪽과 서쪽 중 한쪽만 고르세요. 양쪽을 다 보려다가는 어화원에 닿기도 전에 지치기 쉽습니다. 동쪽은 보물을 보는 쪽입니다. 진보관의 금은보화와 옥, 그리고 옛 시계로 가득한 전시관이 있는데, 시계는 대부분 영국에서 왔고 중국에서 만든 것도 있습니다. 두 전시관 모두 입장권을 따로 사야 합니다. 서쪽에서는 황후와 후궁들이 어떻게 살았는지 볼 수 있습니다. 서태후는 젊은 후궁 시절 이쪽의 저수궁에 살며 훗날의 동치제를 낳았고, 수십 년 뒤 쉰 번째 생일을 맞아 다시 돌아왔습니다. 방 안은 지금도 그때 모습 그대로 꾸며져 있고, 앞뜰의 청동 용과 사슴도 그 생일을 위해 만든 것입니다.",
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
      faq: [
        {
          question: "베이징 자금성은 가 볼 만한가요?",
          answer: "네, 베이징이 처음이라면 가장 먼저 가야 할 곳입니다. 500년 가까이 24명의 황제가 이 담장 안에서 살았고, 일반 백성은 들어올 수 없었습니다. 이제는 그들이 걷던 길을 따라 문을 하나하나 지나, 거대한 광장에서 황제 가족의 정원까지 걸어 들어갈 수 있습니다. 다 볼 필요는 없고, 가운데 큰길과 한쪽 구역이면 3시간으로 충분합니다.",
        },
        {
          question: "자금성 관람에는 시간이 얼마나 걸리나요?",
          answer: "궁 안에서 3시간이면 가운데 큰길과 한쪽 구역을 둘러볼 수 있고, 그 전에 입구 보안 검색 시간을 따로 잡아야 합니다. 일행 중에 쉽게 지치는 분이 있다면 고궁박물원이 정한 2시간 코스로도 핵심은 다 봅니다. 나와서 걸을 힘이 남았다면 경산공원에 올라 지붕들을 내려다보세요. 40분쯤 더 잡으면 됩니다.",
        },
        {
          question: "자금성 입장권은 미리 예약해야 하나요?",
          answer: "네, 반드시 예약해야 합니다. 당일 표는 팔지 않습니다. 방문자마다 본인 여권 실명으로 예약하고, 입장할 때 그 여권을 지참해야 합니다. 중국의 여름방학과 연휴 날짜는 금방 매진되니 해당 날짜의 표가 풀리는 시점에 맞춰 준비하세요. 규정이 종종 바뀌므로, 저희가 날짜에 맞춰 확인하고 대신 예약해 드릴 수 있습니다.",
        },
        {
          question: "자금성은 언제 가는 게 가장 좋나요?",
          answer: "봄과 가을, 대략 4~5월과 9~10월의 평일 오전이 가장 좋습니다. 개장 전에 줄을 서야 인파보다 먼저 큰 전각에 닿을 수 있고, 궁 안은 10시쯤부터 이른 오후까지 가장 붐빕니다. 5월 초 노동절 연휴와 10월 첫 주 국경절 연휴는 피하세요. 7~8월에는 돌마당이 뜨겁고 그늘이 거의 없습니다.",
        },
        {
          question: "왜 ‘자금성’이라고 부르나요?",
          answer: "500년 가까이 일반 백성의 출입이 금지된 곳이었기 때문입니다. ‘자(紫)’는 북극성을 가리킵니다. 옛사람들은 하늘의 황제가 그곳에 산다고 믿었고, 하늘의 아들인 황제가 땅에서 사는 집이라 ‘자’를, 아무나 들어올 수 없는 곳이라 ‘금(禁)’을 붙였습니다. 1925년부터는 고궁박물원이 되어, 입장권과 안내판에는 ‘고궁박물원’이라는 이름이 쓰입니다.",
        },
      ],
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
        "The whole place is built on an old belief that heaven is round and the earth is square, and once you know it, you see it everywhere. On a map, the park's outer wall curves round the north side and runs straight along the south. The open-air altar, the Circular Mound, sits inside a round low wall inside a square one. Climb to its top and look down at the paving: nine stones ring the centre, then eighteen, all the way to eighty-one, because nine was heaven's number. Even the roofs play their part. The Qianlong Emperor had all three tiers of the Hall of Prayer's roof covered in blue tiles, the colour of the sky.",
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
      faq: [
        {
          question: "Is the Temple of Heaven worth visiting?",
          answer: "Yes, especially early in the morning. The blue-roofed Hall of Prayer for Good Harvests is one of Beijing's great sights. The park around it, close to four times the size of the Forbidden City, fills at first light with people doing tai chi, dancing and playing cards. Two to three hours is enough.",
        },
        {
          question: "How long do you need at the Temple of Heaven?",
          answer: "Two to three hours for the Hall of Prayer, the Echo Wall and the Circular Mound. They lie on one line, joined in the middle by a raised stone avenue 360 metres long. The park around them is huge, so wear comfortable shoes. Come an hour earlier if you want the morning park life too.",
        },
        {
          question: "What is the best time to visit the Temple of Heaven?",
          answer: "Early morning, in any season. The park gates open well before the monuments, and the cypress woods are liveliest at first light. For photos, wait for a clear autumn or winter day, when the blue roofs stand out against a blue sky. Avoid the May Day holiday and the first week of October.",
        },
        {
          question: "Which Temple of Heaven ticket should I buy?",
          answer: "Buy the combined ticket on a first visit. The park-only ticket gets you into the park but not into the Hall of Prayer, the Echo Wall or the Circular Mound, the three sights most people come for. Tickets are booked in each visitor's own name with a passport, and we can check the rules for your date and book for you.",
        },
        {
          question: "Temple of Heaven or Summer Palace: which should I choose?",
          answer: "Choose the Temple of Heaven if you have two or three hours: it is close to the centre, and that is enough for the main sights. Choose the Summer Palace if you have half a day or more and want a lake and hills. It lies about 15 kilometres north-west of the centre, and the garden alone takes three to four hours. In winter, the Temple of Heaven's corridor of card players is the livelier choice.",
        },
      ],
    },
    zh: {
      description: "北京天坛：走上南低北高的长长大道，蓝顶的祈年殿在晴空下亮得耀眼；一大早，柏树林里全是晨练的北京人。",
      why: [
        "走上那条南低北高的长石板大道，人会不知不觉地慢慢升高，像是一步步往天上走。走到头，祈年殿就在眼前：三层蓝色的圆顶，晴天里几乎和天空融成一片。五百年间，明清两代的皇帝每年都来这里祭天，祈求五谷丰登。",
        "天坛最有意思的，是它如今也属于北京人。天刚亮，柏树林里就有人打太极、跳舞、唱京剧、踢毽子，长廊下坐满了打牌下棋的老人。皇帝祭天的地方成了家门口的公园，来这里，能看到北京最松弛的一面。",
        "整座天坛，都是照着“天圆地方”的老说法修的，知道了这一点，处处都能看出来。在地图上看，最外面那圈围墙北边是圆的，南边是方的。露天的圜丘外面套着两道矮墙，里面一道圆，外面一道方。登上圜丘顶层，低头看脚下：围着中心那块圆石，第一圈铺了 9 块石板，第二圈 18 块，一直铺到第九圈 81 块，因为古人把九看作天的数字。连屋顶的颜色也有讲究，乾隆把祈年殿三层屋顶全换成了蓝瓦，取的就是天的颜色。",
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
      faq: [
        {
          question: "北京天坛值得去吗？",
          answer: "值得，尤其是一大早去。蓝顶的祈年殿，在北京的古建筑里数一数二；四周的公园将近故宫的四倍大，天刚亮，柏树林里就满是打太极、跳舞、打牌的北京人。留两三个小时就够了。",
        },
        {
          question: "逛天坛需要多长时间？",
          answer: "留两三个小时，就能看完祈年殿、回音壁和圜丘。三处连成一条线，中间是一条 360 米长、高出地面的石板大道；四周的公园很大，最好穿双好走的鞋。想看公园早上最热闹的样子，就再早来一个小时。",
        },
        {
          question: "什么时候去天坛最好？",
          answer: "不论哪个季节，都是一大早最好。公园比几座古建筑开门早得多，天刚亮时柏树林里最热闹。想拍照，就等秋冬的晴天，蓝瓦衬着蓝天最好看。五一和国庆长假人最多，尽量避开。",
        },
        {
          question: "天坛要买联票，还是只买公园门票？",
          answer: "第一次来，买联票。只买公园门票，进得了园子，却进不了祈年殿、回音壁和圜丘，而这三处正是大多数人专程来看的。门票要用护照实名预约，我们可以按你的日期核实规则并代为预约。",
        },
        {
          question: "天坛和颐和园，选哪个？",
          answer: "只有两三个小时，就选天坛，它离市中心近，看完主要的几处正好。能留出半天以上、想看湖和山，就选颐和园，它在城西北约 15 公里，光园里就要逛三四个小时。到了冬天，天坛长廊里坐满打牌下棋的老人，更有北京味儿。",
        },
      ],
    },
    ko: {
      description: "베이징 천단: 완만하게 오르는 긴 돌길 끝에 푸른 지붕의 기년전이 하늘과 맞닿고, 이른 아침 측백나무 숲은 운동하는 베이징 사람들로 가득합니다.",
      why: [
        "천단의 긴 돌길은 남쪽이 낮고 북쪽이 높아서, 걷다 보면 어느새 하늘을 향해 조금씩 올라가고 있습니다. 길 끝에 기년전이 나타납니다. 세 겹의 푸른 둥근 지붕이 맑은 날이면 하늘과 거의 하나가 됩니다. 500년 동안 명·청의 황제들이 해마다 이곳에서 하늘에 풍년을 빌었습니다.",
        "지금의 천단이 특별한 건 베이징 사람들의 공원이기도 하기 때문입니다. 날이 밝으면 측백나무 숲에 태극권을 하고, 춤추고, 경극을 부르고, 제기를 차는 사람들이 모이고, 긴 회랑 아래는 카드놀이를 하고 장기를 두는 노인들로 붐빕니다. 황제의 제단이 동네 공원이 된 이곳에서, 베이징의 가장 느긋한 얼굴을 볼 수 있습니다.",
        "천단 전체가 ‘하늘은 둥글고 땅은 네모나다’는 옛 생각에 따라 지어졌고, 이를 알고 나면 곳곳에서 그 모습이 보입니다. 지도로 보면 공원 바깥 담장은 북쪽이 둥글고 남쪽이 네모납니다. 하늘로 트인 원구단은 낮은 담이 두 겹으로 둘러싸고 있는데, 안쪽 담은 둥글고 바깥쪽 담은 네모납니다. 원구단 맨 위층에 올라 발밑을 보세요. 가운데 둥근 돌을 첫 바퀴에 돌판 9장이 두르고, 다음 바퀴는 18장, 그렇게 아홉째 바퀴 81장까지 이어집니다. 옛사람들이 9를 하늘의 수로 여겼기 때문입니다. 지붕 색에도 뜻이 있습니다. 건륭제는 기년전의 세 겹 지붕을 모두 하늘빛 푸른 기와로 바꿨습니다.",
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
      faq: [
        {
          question: "베이징 천단은 가 볼 만한가요?",
          answer: "네, 특히 이른 아침에 가 볼 만합니다. 푸른 지붕의 기년전은 베이징에서 손꼽히는 풍경이고, 자금성의 네 배 가까이 되는 공원은 날이 밝자마자 태극권, 춤, 카드놀이를 하는 사람들로 가득합니다. 2~3시간이면 충분합니다.",
        },
        {
          question: "천단 관람에는 시간이 얼마나 걸리나요?",
          answer: "기년전, 회음벽, 원구단을 보는 데 2~3시간이면 됩니다. 세 곳은 한 줄로 늘어서 있고, 가운데를 길이 360m의 높은 돌길이 잇습니다. 둘레의 공원이 워낙 넓으니 편한 신발을 신으세요. 아침 공원의 활기찬 풍경까지 보려면 한 시간 일찍 오세요.",
        },
        {
          question: "천단은 언제 가는 게 가장 좋나요?",
          answer: "계절과 상관없이 이른 아침이 가장 좋습니다. 공원 문은 주요 건축물보다 훨씬 먼저 열리고, 날이 밝을 무렵 측백나무 숲이 가장 활기찹니다. 사진을 찍으려면 맑은 가을이나 겨울날을 고르세요. 푸른 기와가 파란 하늘과 어우러집니다. 5월 초 노동절 연휴와 10월 초 국경절 연휴는 피하는 것이 좋습니다.",
        },
        {
          question: "천단 입장권은 어떤 것을 사야 하나요?",
          answer: "처음 간다면 통합권을 사세요. 공원 입장권만으로는 공원 안을 걸을 수는 있어도, 대부분의 여행자가 보러 오는 기년전, 회음벽, 원구단에는 들어갈 수 없습니다. 입장권은 여권으로 실명 예약하며, 저희가 날짜에 맞춰 규정을 확인하고 대신 예약해 드릴 수 있습니다.",
        },
        {
          question: "천단과 이화원 중 어디가 좋을까요?",
          answer: "두세 시간뿐이라면 천단입니다. 도심에서 가깝고, 주요 명소를 보기에 딱 맞는 시간입니다. 반나절 이상 낼 수 있고 호수와 산을 보고 싶다면 이화원입니다. 도심에서 서북쪽으로 약 15km 떨어져 있고, 정원 안에서만 3~4시간이 걸립니다. 겨울이라면 카드놀이를 하고 장기를 두는 노인들로 가득한 천단의 회랑이 더 베이징답습니다.",
        },
      ],
    },
  },
  "summer-palace": {
    en: {
      description: "Walk the Summer Palace's 728-metre painted corridor along Kunming Lake, find the marble boat, and catch the low sun through the Seventeen-Arch Bridge.",
      why: [
        "The Summer Palace brings a whole landscape of lake and hill inside the imperial walls. Kunming Lake fills three quarters of the grounds, a painted corridor runs along its shore, and the Tower of Buddhist Incense rises from Longevity Hill behind. On a summer day, with a breeze off the water and willows trailing in it, you understand why the Empress Dowager Cixi chose to spend long seasons here.",
        "It is a beautiful place with a sad history. British and French troops burned it in 1860; Cixi rebuilt it, reputedly with money taken from the navy's budget; and after his reforms failed in 1898, the young Guangxu Emperor was held prisoner in a small courtyard by the lake. Walking the shore with that in mind changes how it feels.",
        "Even the lake was shaped by hand. In 1749 and 1750 the Qianlong Emperor had the old lake here widened and deepened to twice its size. It became a reservoir for the imperial gardens west of the city, and he laid out a new garden around it, so every view here was planned. It is too big to see in one go, so choose a side. The front of Longevity Hill, with the corridor, the tower and the Marble Boat, is the classic walk and the busiest. Behind the hill, Suzhou Street is a rebuilt canal street where eunuchs and palace maids once played shopkeepers for the court. For the least climbing, follow the east shore to the Seventeen-Arch Bridge.",
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
      faq: [
        {
          question: "Is the Summer Palace worth visiting?",
          answer: "Yes, if you have half a day. It is Beijing's great lake garden: water covers about three quarters of the grounds, a 728-metre painted corridor follows the shore and a tower rises from the hill behind. On a fine day, with a breeze off the lake, it is the most relaxing of the imperial sights.",
        },
        {
          question: "How long do you need at the Summer Palace?",
          answer: "Three to four hours to walk in at one gate and out at another. It lies about 15 kilometres north-west of the centre, so even a quick visit takes half a day. A boat across the lake saves your legs, and adding the Old Summer Palace makes it a full day.",
        },
        {
          question: "What is the best time to visit the Summer Palace?",
          answer: "Morning, while the lake shore is cool. Spring, around April, brings magnolias and peach blossom, and autumn turns the hill gold. On a few clear evenings around the winter solstice in late December, the setting sun lights all 17 arches of the Seventeen-Arch Bridge at once.",
        },
        {
          question: "What is the difference between the Summer Palace and the Old Summer Palace?",
          answer: "The Summer Palace is a complete garden; the Old Summer Palace is a ruin. British and French troops burned both in 1860, and only the Summer Palace was rebuilt, so its halls, corridor and lake are all there. At the Old Summer Palace, a stop or two south on Metro Line 4, you walk among the broken stone of its European-style palaces. Seeing both in one day tells the whole story.",
        },
        {
          question: "Do I need to book Summer Palace tickets in advance?",
          answer: "Booking ahead is wise, especially at weekends and on holidays, and tickets are in each visitor's own name with a passport. The basic ticket covers the corridor, the lake shore and the bridges. A few places inside, such as the Tower of Buddhist Incense and Suzhou Street, have their own tickets, or you can buy the combined ticket that covers them all. We can check the rules for your date and book for you.",
        },
      ],
    },
    zh: {
      description: "北京颐和园：沿着湖边 728 米的长廊慢慢走，抬头是一万四千多幅彩画，湖上是十七孔桥和夕阳。怎么逛、几点来、能不能顺路去圆明园。",
      why: [
        "颐和园把一整片湖光山色搬进了皇家园林。昆明湖占了园子的四分之三，湖边是一条画满故事的长廊，背后的万寿山上，佛香阁高高立着。夏天湖上有风，柳枝低垂，你会明白慈禧为什么愿意在这里长住。",
        "这么美的园子也有它的伤痕：1860 年被英法联军烧毁，慈禧重修时据说挪用了部分海军经费；光绪皇帝变法失败后，就被软禁在湖边的一座小院里。走在湖边想起这些往事，滋味很不一样。",
        "连这片湖，都是人工挖大的。1749 到 1750 年，乾隆命人把这里原有的湖拓宽一倍、挖深一倍，给西郊的皇家园林当水库，又围着湖修起了园子；你眼前这片山水，处处都是设计好的。园子太大，一次逛不完，挑一边就好。万寿山前，长廊、佛香阁和石舫一路排开，最经典，人也最多；山后的苏州街，是复建的江南水乡街市，当年太监、宫女在这里扮成店伙计，陪皇帝和后妃们逛街买东西；想少爬坡，就沿着东岸一路走到十七孔桥。",
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
      faq: [
        {
          question: "北京颐和园值得去吗？",
          answer: "值得，前提是能留出半天。这是一座以湖为主的皇家园林：水面约占四分之三，728 米的彩画长廊沿着湖岸伸展，背后的山上立着佛香阁。天气好、湖上有风的日子，在北京的皇家古迹里，数它最让人放松。",
        },
        {
          question: "逛颐和园需要多长时间？",
          answer: "从一个门进、另一个门出，要三四个小时。颐和园在城西北，离市中心约 15 公里，再快也要半天。坐船过湖能省些脚力；再加上圆明园，就是一整天。",
        },
        {
          question: "什么时候去颐和园最好？",
          answer: "早上去，趁凉快先逛湖边。四月前后玉兰和桃花开，秋天满山金黄。冬至前后，也就是十二月下旬，只有少数几个晴天的傍晚，夕阳会同时照亮十七孔桥的 17 个桥洞，这就是“金光穿洞”。",
        },
        {
          question: "颐和园和圆明园有什么区别？",
          answer: "颐和园是完整的园子，圆明园是一片废墟。1860 年，英法联军把两处一起烧了：颐和园后来重修，殿堂、长廊和湖都还在；圆明园再没有重建，如今只能在西洋楼的残石之间走一走。两处坐地铁 4 号线只隔一两站，一天看完，前后的故事就连起来了。",
        },
        {
          question: "颐和园门票要提前预约吗？",
          answer: "最好提前订，尤其是周末和节假日；门票用护照实名预约。普通门票就能逛长廊、湖边和各座桥；园里几处单独收费的地方，比如佛香阁、苏州街，可以一处处单买，也可以买一张全包的联票。规则时常调整，我们可以按你的日期核实并代为预约。",
        },
      ],
    },
    ko: {
      description: "베이징 이화원: 곤명호를 따라 728m 이어지는 그림 회랑을 걷고, 돌로 만든 배를 찾고, 십칠공교 아래로 비치는 석양을 만나 보세요.",
      why: [
        "이화원은 호수와 산 풍경을 통째로 황실 정원 안에 들여놓은 곳입니다. 곤명호가 정원의 4분의 3을 차지하고, 호숫가로는 그림으로 가득한 장랑이 이어지며, 뒤편 만수산 위로 불향각이 높이 솟아 있습니다. 호수 바람이 불고 버드나무가 물에 드리워진 여름날이면, 서태후가 왜 이곳에 오래 머물렀는지 알 것 같습니다.",
        "아름다운 만큼 아픈 역사도 있습니다. 1860년 영국·프랑스 연합군이 불태웠고, 서태후는 해군 경비 일부를 끌어다 다시 지었다고 전해집니다. 1898년 개혁이 실패한 뒤 젊은 광서제는 호숫가의 작은 안뜰에 갇혀 지냈습니다. 이 이야기를 알고 호숫가를 걸으면 느낌이 완전히 달라집니다.",
        "호수마저 사람 손으로 넓힌 것입니다. 1749년부터 이듬해까지 건륭제는 이곳에 있던 옛 호수를 두 배로 넓히고 두 배로 깊게 파서, 서쪽 교외 황실 정원들에 물을 대는 저수지로 삼고 그 둘레에 정원을 꾸몄습니다. 눈앞의 산과 물은 모두 계획해서 만든 풍경입니다. 한 번에 다 보기에는 너무 넓으니 한쪽을 고르세요. 만수산 앞쪽은 장랑, 불향각, 석방이 이어지는 가장 대표적인 길이자 가장 붐비는 곳입니다. 산 뒤편의 소주가(쑤저우 거리)는 물길을 따라 가게가 늘어선 남방 물의 마을을 본떠 다시 지은 거리입니다. 옛날 환관과 궁녀가 이곳에서 가게 주인으로 분장해, 황제와 후궁들이 장 보는 기분을 내게 해 주었습니다. 오르막을 피하고 싶다면 동쪽 호숫가를 따라 십칠공교까지 걸으세요.",
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
      faq: [
        {
          question: "베이징 이화원은 가 볼 만한가요?",
          answer: "네, 반나절을 낼 수 있다면 가 볼 만합니다. 호수가 정원의 약 4분의 3을 차지하고, 그림으로 가득한 728m의 장랑이 호숫가를 따라 이어지며, 뒤편 산 위로 불향각이 솟아 있습니다. 호수 바람이 부는 맑은 날이면 베이징 황실 유적 가운데 가장 느긋하게 즐길 수 있는 곳입니다.",
        },
        {
          question: "이화원 관람에는 시간이 얼마나 걸리나요?",
          answer: "한 문으로 들어가 다른 문으로 나오는 데 3~4시간이 걸립니다. 도심에서 서북쪽으로 약 15km 떨어져 있어 짧게 봐도 반나절이 필요합니다. 배로 호수를 건너면 다리가 덜 아프고, 원명원까지 더하면 하루 일정입니다.",
        },
        {
          question: "이화원은 언제 가는 게 가장 좋나요?",
          answer: "아침이 가장 좋습니다. 선선할 때 호숫가부터 걸으세요. 4월 전후에는 목련과 복숭아꽃이 피고, 가을에는 산이 금빛으로 물듭니다. 동지 전후인 12월 하순, 맑은 날 해 질 녘 며칠 동안은 지는 해가 십칠공교의 다리 구멍 17개를 한꺼번에 비춥니다.",
        },
        {
          question: "이화원과 원명원은 무엇이 다른가요?",
          answer: "이화원은 온전한 정원이고, 원명원은 폐허입니다. 1860년 영국·프랑스 연합군이 두 곳을 함께 불태웠는데, 이화원은 뒤에 다시 지어져 전각과 회랑, 호수가 그대로 남아 있습니다. 원명원은 끝내 다시 짓지 못해, 지금은 서양식 궁전의 부서진 돌 사이를 걷게 됩니다. 지하철 4호선으로 한두 정거장 거리라, 하루에 둘 다 보면 이야기 전체가 이어집니다.",
        },
        {
          question: "이화원 입장권은 미리 예약해야 하나요?",
          answer: "미리 예약하는 것이 좋고, 주말과 연휴에는 특히 그렇습니다. 입장권은 여권으로 실명 예약합니다. 기본 입장권으로 장랑, 호숫가, 다리를 모두 볼 수 있고, 불향각이나 소주가처럼 따로 요금을 받는 몇 곳은 입장권을 하나씩 따로 사도 되고, 모두 포함된 통합권을 사도 됩니다. 저희가 날짜에 맞춰 규정을 확인하고 대신 예약해 드릴 수 있습니다.",
        },
      ],
    },
  },
  "national-museum": {
    en: {
      description: "China's whole history in one afternoon at Beijing's National Museum: the giant Houmuwu Ding, the four-ram vessel and a drummer laughing since the Han.",
      why: [
        "If you want to understand China's long history in a single afternoon, come here. The Ancient China galleries lay it out as one walk: stone tools from the earliest settlers, Shang bronzes, Han pottery figures, then Ming and Qing porcelain. Some 2,000 objects stand in order, and by the end every dynasty has fallen into place.",
        "Come before Xi'an or any other old capital on your route, and everything you see there will slot into that timeline. On a rainy, sweltering or hazy day, it is also the most comfortable place in Beijing.",
        "Many of these pieces are old friends to Chinese visitors. The giant bronze cauldron and the four-ram vessel are pictured in the national history textbook for the first year of secondary school. In the summer holidays you share them with families who have come to see the real thing. Follow that crowd. Where people press closest to the glass, you are standing in front of the treasures China itself values most.",
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
      faq: [
        {
          question: "Is the National Museum of China worth visiting?",
          answer: "Yes, if you want China's whole story in one place. The Ancient China galleries take you past about 2,000 objects, from the first settlers to the Ming and Qing, in a single walk of about three hours. If you have only a day or two in Beijing and haven't seen the Forbidden City yet, go there first.",
        },
        {
          question: "Is the National Museum of China free, and do I need to book?",
          answer: "Entry to the permanent galleries is free, but you must book a place ahead in your own passport name and bring that passport. In China's summer school holidays places are often gone days ahead, so book as soon as your date opens. Some special exhibitions charge separately, and we can check the rules for your date and book for you.",
        },
        {
          question: "How long do you need at the National Museum of China?",
          answer: "About three hours to see Ancient China at an easy pace, with a sit-down in the middle; two hours if you go straight to the best-known pieces. Don't try to see the whole building. It has 48 galleries, and a whole day would not cover them.",
        },
        {
          question: "What should I not miss at the National Museum of China?",
          answer: "Don't miss the Houmuwu Ding, the Four-Ram Square Zun and the laughing Han storyteller, all in the Ancient China galleries. The Houmuwu Ding weighs 832.84 kilograms, the heaviest bronze vessel known from ancient China; the four-ram vessel has a curly-horned ram at each corner; and the storyteller laughs as he beats his drum. The gallery around them is laid out as one walk through China's history, so give it time too.",
        },
        {
          question: "Can I visit the National Museum and the Forbidden City on the same day?",
          answer: "You can, but most people enjoy both more on separate days. Each needs about three hours, each has its own booking and security check, and the palace lets you out only by its north or east gate, both a long walk from the museum. If it has to be one day, do the Forbidden City in the morning and keep the museum for a slow afternoon.",
        },
      ],
    },
    zh: {
      description: "北京中国国家博物馆：一个下午从远古走到明清，看看巨大的后母戊鼎、四羊方尊，还有一个笑了两千年的说唱俑。",
      why: [
        "如果只有一个下午想读懂中国历史，就来这里。“古代中国”展厅把几千年排成了一条路：远古的石器、商朝的青铜、汉代的陶俑，一路走到明清的瓷器，两千多件文物按时间排开。走一圈出来，中国的朝代就在脑子里排好了队。",
        "在去西安这样的古都之前先来这里，之后看到的每一处古迹，都能放回这条时间线上。下雨、太热或空气不好的日子，这里也是北京最舒服的去处。",
        "对中国人来说，这里不少文物都是“老熟人”。后母戊鼎、四羊方尊都印在初中一年级的历史课本上，所以一到暑假，展柜前常常挤满了带孩子来看“真东西”的一家人。跟着人群走准没错，围得最紧的那几件，正是中国人自己最看重的国宝。",
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
      faq: [
        {
          question: "中国国家博物馆值得去吗？",
          answer: "值得，尤其适合想一次看懂中国历史的人。“古代中国”展厅里有两千多件文物，从远古一路排到明清，走一圈大约三个小时。要是在北京只有一两天，又还没去故宫，就先去故宫。",
        },
        {
          question: "国家博物馆免费吗？要预约吗？",
          answer: "常设展览免费，但要用本人护照提前实名预约，入馆时带上同一本护照。暑假期间，名额常常提前几天就约满了，一放出你那天的名额就赶紧约；部分特展另外收费。规则时常调整，我们可以按你的日期核实并代为预约。",
        },
        {
          question: "逛国家博物馆需要多长时间？",
          answer: "从容看完“古代中国”，中间坐下歇一歇，留三个小时左右；只看几件最有名的国宝，两个小时也够。别想着把整座楼看完，国博有 48 个展厅，一天也走不完。",
        },
        {
          question: "国家博物馆必看的文物有哪些？",
          answer: "“古代中国”展厅里的后母戊鼎、四羊方尊和东汉击鼓说唱俑，一定要看。后母戊鼎重 832.84 公斤，是已知最重的中国古代青铜器；四羊方尊四个角上各伸出一只卷角羊头；说唱俑敲着鼓，笑得合不拢嘴。展厅其余部分也值得慢慢走，它本身就是一条贯穿中国历史的路。",
        },
        {
          question: "国家博物馆和故宫能安排在同一天吗？",
          answer: "可以，但分开两天去，两处都能看得更尽兴。每处都要三个小时左右，各自要预约、各自过安检；而且故宫只能从北门或东华门出来，走到国博都要绕一大段路。非要放在一天，就上午去故宫，下午慢慢逛国博。",
        },
      ],
    },
    ko: {
      description: "베이징 중국 국가박물관에서 오후 한나절에 중국 역사 전체를 걸어 보세요. 거대한 후모무정, 네 마리 양의 사양방존, 2천 년째 웃고 있는 설창용까지.",
      why: [
        "중국의 긴 역사를 오후 한나절에 이해하고 싶다면 이곳으로 오세요. ‘고대 중국’ 전시는 역사를 한 줄의 길로 펼쳐 놓았습니다. 선사 시대 석기에서 상나라 청동기, 한나라 토용을 지나 명·청 도자기까지 유물 2천여 점이 시대순으로 이어져, 다 걷고 나면 중국 왕조가 머릿속에 차례로 정리됩니다.",
        "시안 같은 옛 도읍에 가기 전에 먼저 들르면, 그곳에서 보는 모든 것이 이 연표 위에 자리를 잡습니다. 비 오는 날이나 몹시 덥고 공기가 탁한 날에는 베이징에서 가장 쾌적한 곳이기도 합니다.",
        "중국 사람들에게 이곳 유물 상당수는 학창 시절부터 봐 온 낯익은 얼굴입니다. 후모무정과 사양방존은 중국 중학교 1학년 역사 교과서에 실려 있어, 여름방학이면 진품을 보러 온 가족들이 진열장 앞에 모여듭니다. 그 사람들을 따라가 보세요. 사람이 가장 많이 몰린 진열장 안에, 중국인이 가장 아끼는 국보가 있습니다.",
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
      faq: [
        {
          question: "중국 국가박물관은 가 볼 만한가요?",
          answer: "네, 중국 역사를 한곳에서 한 번에 보고 싶다면 가 볼 만합니다. ‘고대 중국’ 전시는 유물 2천여 점으로 선사 시대부터 명·청까지를 한 줄로 이어 보여 주고, 다 보는 데 3시간쯤 걸립니다. 베이징에 하루이틀뿐인데 아직 자금성을 못 봤다면 자금성부터 가세요.",
        },
        {
          question: "중국 국가박물관은 무료인가요? 예약이 필요한가요?",
          answer: "상설 전시는 무료지만, 본인 여권으로 미리 실명 예약을 하고 입장할 때 그 여권을 지참해야 합니다. 중국의 여름방학에는 며칠 전에 자리가 다 차는 경우가 많으니, 원하는 날짜가 열리는 대로 바로 예약하세요. 일부 특별전은 따로 요금을 받습니다. 저희가 날짜에 맞춰 규정을 확인하고 대신 예약해 드릴 수 있습니다.",
        },
        {
          question: "중국 국가박물관 관람에는 시간이 얼마나 걸리나요?",
          answer: "‘고대 중국’을 여유 있게 보고 중간에 앉아 쉬려면 3시간쯤, 가장 유명한 유물만 골라 보면 2시간이면 됩니다. 건물 전체를 다 보려고 하지는 마세요. 전시실이 48개나 되어 하루를 다 써도 다 볼 수 없습니다.",
        },
        {
          question: "중국 국가박물관에서 꼭 봐야 할 유물은 무엇인가요?",
          answer: "‘고대 중국’ 전시의 후모무정, 사양방존, 그리고 북 치는 한나라 설창용은 꼭 보세요. 후모무정은 832.84kg으로 지금까지 알려진 중국 고대 청동 그릇 가운데 가장 무겁고, 사양방존은 네 모서리마다 뿔이 말린 양 머리가 튀어나와 있으며, 설창용은 북을 끼고 웃음을 터뜨립니다. 전시실의 나머지도 천천히 걸어 보세요. 전시 자체가 중국 역사를 한 줄로 잇는 길입니다.",
        },
        {
          question: "국가박물관과 자금성을 하루에 볼 수 있나요?",
          answer: "가능은 하지만, 날을 나누어야 두 곳 모두 더 즐겁게 볼 수 있습니다. 각각 3시간쯤 걸리고, 예약과 보안 검색도 따로 거쳐야 합니다. 게다가 자금성은 북문이나 동화문으로만 나올 수 있어, 어느 쪽이든 박물관까지 한참 걸어야 합니다. 꼭 하루에 봐야 한다면 오전에 자금성, 오후에 박물관을 여유 있게 보세요.",
        },
      ],
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
  "the-bund": {
    en: {
      description: "At dusk on Shanghai's Bund, century-old stone banks and Pudong's glass towers light up on opposite sides of the river. When to come, and where to stand.",
      why: [
        "Come as the light fades and stand on the raised walk above the river. Behind you runs a row of grand stone banks and hotels, with domes, columns and a clock tower. Across the Huangpu, the glass towers of Pudong rise from the far bank. Then the lights come on along both shores. The old stone fronts turn gold, the towers glow and flicker, and lit-up boats slide past below.",
        "Most of these buildings went up about a century ago, when foreigners ran this part of Shanghai. This riverfront was where their banks, trading firms and clubs showed off to every ship coming up the river. The far bank was another world. Until the government opened Pudong for development in 1990, Lujiazui was crowded ferry landings, narrow lanes and makeshift houses, and every tower you see there has gone up since. So you stand between two skylines, one about a hundred years old and the other little more than thirty.",
        "It is free, with no gate to pass, so come twice if you can, once by day and once after dark. Each bank is best seen from the other. From the Bund you look across at Pudong's towers; to see the old stone row itself lit up, cross the river and look back from the Pudong riverside. On a first evening, walk the Bund south from Waibaidu Bridge past the old banks and hotels. Then take the Metro one stop under the river from East Nanjing Road for the view back.",
      ],
      highlights: [
        {
          name: "Look along the river from Waibaidu Bridge",
          body: "At the north end, an old steel bridge crosses Suzhou Creek just before it flows into the Huangpu. Stop in the middle and look south: the whole row of old buildings curves away along the river, with Pudong's towers rising on the left.",
        },
        {
          name: "Look up inside an old bank",
          body: "Inside No. 12, the former HSBC building, look up at the dome of the eight-sided entrance hall. Its mosaics of the zodiac and of eight cities where the bank had branches, from London to Calcutta, were plastered over in the 1950s and uncovered only in the late 1990s. Visits are free but have to be booked ahead through the bank, so check the current arrangement before you go.",
        },
        {
          name: "Cross the river by ferry",
          body: "From the Jinling Road East pier at the south end, the public ferry crosses the Huangpu in a few minutes, alongside commuters. Turn round on deck and the whole Bund spreads out behind you. It lands at Dongchang Road on the Pudong side.",
        },
      ],
      time: "An hour or two to walk the Bund from end to end and back, longer if you wait for the lights. Crossing to Pudong for the view back adds about an hour.",
      when: "Arrive before dusk and stay until it is fully dark. The city switches the lights on and off on a fixed schedule rather than at sunset, and keeps them on longer on some public holidays, so check the time for your date. From Friday to Sunday and on public holidays, the lights may add colour and slow movement. For a quiet walk, come in the hour after sunrise, when the sun comes up behind the Pudong towers. Avoid public holiday evenings if you can. On the first day of the October holiday in 2024, more than 460,000 people came and police ran one-way routes.",
      pair: "Nanjing Road East, Shanghai's best-known shopping street, runs inland from the Bund towards People's Square. For Pudong, take Metro Line 2 one stop from East Nanjing Road to Lujiazui; the Shanghai Tower is about ten minutes' walk from there. Yu Garden and the old town are a short taxi ride south.",
      skip: "If you want the Shanghai of lanes and neighbourhoods, the Bund is the city's grand front, not where people lived. Give the time to the old lanes of the former French Concession instead. If crowds wear you out, skip the evening and come at sunrise. Short of time? A Huangpu river cruise shows you both banks in one go.",
      faq: [
        {
          question: "Is the Bund worth visiting?",
          answer: "Yes, especially from dusk into dark. On the riverside walk you have a row of century-old stone banks behind you and Pudong's glass towers across the water, and then both banks light up. It costs nothing. Give it an hour or two, and walk the full 1.5 kilometres from Waibaidu Bridge if you can.",
        },
        {
          question: "What is the best time to visit the Bund?",
          answer: "From just before dusk until fully dark, for the lights. For a quiet walk, come in the hour after sunrise, when the sun rises behind Pudong. The lights follow a fixed city schedule rather than sunset, so check the time for your date. Avoid holiday evenings if you can: more than 460,000 people came on the first day of the October holiday in 2024.",
        },
        {
          question: "Is the Bund free?",
          answer: "Yes. The Bund is an open riverside walk with no ticket and no gate, by day or night. You pay only for extras such as a river cruise or the public ferry to Pudong. Some old bank halls can be visited free too, some with a sign-in at the door and some by booking; the arrangements change, so check before you go.",
        },
        {
          question: "When do the Bund lights come on?",
          answer: "In the early evening, at a time set by the city rather than at sunset. The Bund and Lujiazui light up together and switch off later the same evening, and on some public holidays they stay on longer. From Friday to Sunday and on public holidays, the display may add colour and slow movement. The times change with the season, so check them for your date and be in place a little early.",
        },
        {
          question: "Where is the best view of the Bund?",
          answer: "From the opposite bank, because each side is best seen from the other. From the Bund you see Pudong's towers; from the Pudong riverside you see the old stone row lit up. The two are one stop apart on Metro Line 2, or a few minutes by public ferry. For the view along the whole curve, stand on Waibaidu Bridge at the north end.",
        },
      ],
    },
    zh: {
      description: "黄昏的上海外滩，江这边的百年石头老楼和对岸浦东的玻璃高楼一起亮灯。什么时候来，站在哪里看。",
      why: [
        "天色暗下来时，站到江边比马路高出一截的观景平台上。身后是一整排厚重的石头老楼，银行、饭店，有圆顶，有廊柱，还有钟楼；黄浦江对岸，浦东的玻璃高楼拔地而起。接着，两岸的灯一起亮了。老楼的石墙被照成金黄，对岸的高楼一闪一闪，亮着灯的游船从脚下慢慢开过。",
        "这些老楼大多建于大约一百年前。那时外滩一带是租界，洋行、银行和俱乐部都把楼修在江边，要让每一条开进黄浦江的船看见它们的气派。对岸当年完全是另一个世界。1990 年浦东开发开放以前，陆家嘴还是挤满人的渡口、窄窄的弄堂和简陋的棚户，你现在看到的每一栋高楼，都是那以后才盖起来的。站在这里，一边是百年的老上海，一边是三十来年长出来的新上海。",
        "外滩不要门票，也没有大门，能来两次最好，白天一次，天黑后一次。两岸的景，都要站到对面才看得全。在外滩看的是浦东的高楼；想看外滩这排老楼亮灯，得过江到浦东滨江回头看。第一次来的晚上，可以从北头的外白渡桥沿着老楼往南走，再到南京东路站坐一站地铁，从江底过去，回头看一眼。",
      ],
      highlights: [
        {
          name: "站上外白渡桥",
          body: "外滩北头，一座老钢桥横跨苏州河，河水在桥下不远处汇入黄浦江。走到桥中间往南看，外滩这排老楼顺着江岸弯过去，左手边就是浦东的高楼。",
        },
        {
          name: "走进老银行，抬头看",
          body: "外滩 12 号原是汇丰银行大楼，走进八角形的门厅，抬头看穹顶。马赛克拼出十二星座，下面一圈是汇丰当年设有分行的八座城市，从伦敦一直到加尔各答；这些壁画上世纪 50 年代被厚厚的石膏盖住，直到 90 年代末修缮时才重见天日。参观免费，但要提前通过银行预约，出发前先确认当时的安排。",
        },
        {
          name: "坐轮渡过江",
          body: "从外滩南头的金陵东路渡口上船，跟上下班的本地人一起，几分钟就到对岸。站在甲板上回头，整条外滩在身后铺开。船在浦东的东昌路渡口靠岸。",
        },
      ],
      time: "从头走到尾再走回来，一到两个小时；要等亮灯，就再多留一会儿。过江到浦东回头看，大约再加一个小时。",
      when: "天黑前到，一直待到天全黑。灯由城市按固定时间开关，不跟着日落走，有些节假日会关得更晚，出发前查一下当天的时间。周五到周日和法定节假日，灯光可能加上彩色、缓缓变化的光。想清清静静走一走，就在日出后一小时内来，太阳正从浦东的高楼后面升起。节假日晚上尽量别来：2024 年国庆第一天，外滩滨水区客流超过 46 万人次，警方实行了单向通行。",
      pair: "南京东路步行街从外滩往城里一直通到人民广场。去浦东就坐地铁 2 号线，从南京东路站坐一站到陆家嘴，再步行十分钟左右到上海中心。豫园和老城厢在南边，打车很近。",
      skip: "想看弄堂里过日子的老上海，外滩不是那个地方。它是上海的门面，不是居民区，不如把时间留给原法租界一带的老街。怕挤的话，就别赶晚上，改在日出时来。时间实在紧，坐一趟黄浦江游船，两岸一次都能看到。",
      faq: [
        {
          question: "上海外滩值得去吗？",
          answer: "值得，尤其是傍晚到天黑这段时间。站在江边，身后是一整排百年石头老楼，对岸是浦东的玻璃高楼，接着两岸一起亮灯。外滩不收门票。留一到两个小时，走得动的话，就从外白渡桥把 1.5 公里走完。",
        },
        {
          question: "什么时候去外滩最好？",
          answer: "天黑前到、待到天全黑，看亮灯；想清静，就在日出后一小时内来，太阳从浦东那边升起。灯按城市定的时间开关，不跟着日落走，出发前查一下当天的时间。节假日晚上尽量避开，2024 年国庆第一天，外滩滨水区客流超过 46 万人次。",
        },
        {
          question: "外滩要门票吗？",
          answer: "不要。外滩是一条开放的滨江步道，白天晚上都没有门票，也没有大门。另外花钱的只有游船、过江轮渡这类项目。有些老楼也能免费进去看，有的在门口登记就行，有的要提前预约，安排时常调整，出发前查一下。",
        },
        {
          question: "外滩什么时候亮灯？",
          answer: "傍晚亮灯，时间由城市统一安排，不跟着日落走。外滩和陆家嘴一起亮，当晚稍晚再一起关，有些节假日会开得更久。周五到周日和法定节假日，灯光可能加上彩色、缓缓变化的光。具体时间随季节调整，出发前查一下当天的安排，早一点到。",
        },
        {
          question: "外滩夜景在哪里看最好？",
          answer: "在对岸看。两岸的景，都要站到对面才看得全：在外滩看浦东的高楼，到浦东滨江看外滩老楼亮灯。两边坐地铁 2 号线只隔一站，坐轮渡也就几分钟。想看整条外滩的弧线，就站到北头的外白渡桥上。",
        },
      ],
    },
    ko: {
      description: "해 질 녘 상하이 와이탄에서는 강을 사이에 두고 백 년 된 석조 건물과 푸둥의 유리 빌딩에 함께 불이 켜집니다. 언제 와서 어디에 서면 좋을지.",
      why: [
        "해가 질 무렵, 도로보다 높이 올린 강변 산책로에 서 보세요. 등 뒤로는 돔과 기둥, 시계탑을 얹은 묵직한 석조 은행과 호텔이 줄지어 있고, 황푸강 건너편에는 푸둥의 유리 빌딩들이 솟아 있습니다. 이윽고 양쪽 강변에 한꺼번에 불이 들어옵니다. 오래된 석조 건물은 금빛으로 물들고, 건너편 빌딩들은 반짝이며, 불 밝힌 유람선이 발아래로 천천히 지나갑니다.",
        "주윤발이 주연한 홍콩 드라마 ‘상해탄’의 영어 제목이 바로 이곳의 이름, ‘The Bund’입니다. 이 건물들은 대부분 100년쯤 전, 외국인들이 이 일대를 다스리던 조계 시절에 지어졌습니다. 외국 은행과 무역회사, 사교 클럽이 황푸강을 거슬러 오는 배마다 위세를 보여 주려고 이 강변에 세운 것입니다. 강 건너는 전혀 다른 세상이었습니다. 1990년 푸둥 개발이 시작되기 전까지 루자쭈이는 붐비는 나루터와 좁은 골목, 허름한 판잣집뿐이었고, 지금 보이는 빌딩은 모두 그 뒤에 올라갔습니다. 한쪽은 백 년 된 스카이라인, 다른 쪽은 서른 해 남짓 된 스카이라인입니다.",
        "입장료도 문도 없으니, 할 수 있다면 낮에 한 번, 해가 진 뒤에 한 번 오세요. 양쪽 강변은 서로 맞은편에서 봐야 제대로 보입니다. 와이탄에서는 푸둥의 빌딩을 바라보고, 불 켜진 와이탄의 석조 건물을 보려면 강을 건너 푸둥 강변에서 돌아봐야 합니다. 처음 오는 저녁이라면 북쪽 끝 와이바이두교에서 옛 건물들을 따라 남쪽으로 걸은 뒤, 난징둥루역에서 지하철로 한 정거장 강 밑을 건너 반대편에서 바라보세요.",
      ],
      highlights: [
        {
          name: "와이바이두교에서 강 따라 바라보기",
          body: "와이탄 북쪽 끝, 쑤저우강이 황푸강으로 흘러들기 직전에 오래된 철교가 놓여 있습니다. 다리 가운데서 남쪽을 보면 옛 건물들이 강을 따라 휘어지며 늘어서 있고, 왼편으로 푸둥의 빌딩들이 솟아 있습니다.",
        },
        {
          name: "옛 은행 천장 올려다보기",
          body: "와이탄 12호, 옛 HSBC(홍콩상하이은행) 건물의 팔각형 홀에 들어서서 천장 돔을 올려다보세요. 열두 별자리와, 이 은행이 지점을 두었던 런던부터 캘커타(지금의 콜카타)까지 여덟 도시를 그린 모자이크는 1950년대에 두꺼운 회반죽으로 덮였다가 1990년대 말 보수 공사 때에야 다시 드러났습니다. 관람은 무료지만 은행을 통해 미리 예약해야 하니, 출발 전에 현재 운영 방식을 확인하세요.",
        },
        {
          name: "페리로 황푸강 건너기",
          body: "와이탄 남쪽 진링둥루 선착장에서 공공 페리를 타면 출퇴근하는 현지 사람들과 함께 몇 분 만에 강을 건넙니다. 갑판에서 뒤돌아보면 와이탄 전체가 등 뒤로 펼쳐집니다. 배는 푸둥 쪽 둥창루 선착장에 닿습니다.",
        },
      ],
      time: "끝에서 끝까지 걸었다가 돌아오는 데 1~2시간, 조명을 기다린다면 조금 더 잡으세요. 강을 건너 푸둥에서 돌아보려면 한 시간쯤 더 듭니다.",
      when: "해 지기 전에 도착해 완전히 어두워질 때까지 머무르세요. 조명은 일몰이 아니라 시에서 정한 시간표에 따라 켜지고 꺼지며, 공휴일에는 더 늦게까지 켜 둘 때도 있으니 당일 시간을 확인하세요. 금요일부터 일요일까지와 공휴일에는 조명에 색이 더해지고 빛이 천천히 움직이기도 합니다. 한적하게 걷고 싶다면 해 뜬 뒤 한 시간 안에 오세요. 푸둥 빌딩들 뒤로 해가 떠오릅니다. 연휴 저녁은 되도록 피하세요. 2024년 국경절 연휴 첫날에는 46만 명이 넘게 몰려 경찰이 한 방향 통행을 실시했습니다.",
      pair: "난징둥루 보행가는 와이탄에서 안쪽으로 인민광장 쪽까지 이어집니다. 푸둥으로 가려면 지하철 2호선을 타고 난징둥루역에서 한 정거장 가면 루자쭈이역이고, 거기서 상하이 타워까지 걸어서 10분쯤입니다. 예원과 옛 성곽 안 마을은 남쪽으로 택시를 타면 금방입니다.",
      skip: "골목 속 상하이 사람들의 삶을 보고 싶다면 와이탄은 맞지 않습니다. 이곳은 사람이 살던 동네가 아니라 도시의 얼굴이니, 그 시간은 옛 프랑스 조계 일대의 골목에 쓰세요. 인파가 힘들다면 저녁 대신 해 뜰 무렵에 오세요. 시간이 정말 없다면 황푸강 유람선 한 번으로 양쪽 강변을 모두 볼 수 있습니다.",
      faq: [
        {
          question: "상하이 와이탄은 가 볼 만한가요?",
          answer: "네, 특히 해 질 녘부터 밤까지 가 볼 만합니다. 강변 산책로에 서면 등 뒤로 백 년 된 석조 건물이, 강 건너로 푸둥의 유리 빌딩이 보이고, 이어 양쪽 강변에 불이 들어옵니다. 입장료는 없습니다. 1~2시간을 잡고, 힘이 남으면 와이바이두교부터 1.5km를 끝까지 걸어 보세요.",
        },
        {
          question: "와이탄은 언제 가는 게 가장 좋나요?",
          answer: "해 지기 직전에 도착해 완전히 어두워질 때까지 머무르면 조명을 볼 수 있습니다. 한적하게 걷고 싶다면 해 뜬 뒤 한 시간 안에 오세요. 푸둥 쪽에서 해가 떠오릅니다. 조명은 일몰이 아니라 시의 시간표를 따르니 당일 시간을 확인하세요. 연휴 저녁은 되도록 피하세요. 2024년 국경절 연휴 첫날에는 46만 명이 넘게 다녀갔습니다.",
        },
        {
          question: "와이탄은 입장료가 있나요?",
          answer: "없습니다. 와이탄은 입장권도 문도 없는 열린 강변 산책로로, 낮이든 밤이든 자유롭게 걸을 수 있습니다. 유람선이나 푸둥으로 건너가는 공공 페리 같은 것만 따로 요금을 냅니다. 일부 옛 은행 건물도 무료로 들어가 볼 수 있습니다. 입구에서 이름만 적으면 되는 곳도 있고 미리 예약해야 하는 곳도 있으며, 운영 방식이 바뀌기도 하니 가기 전에 확인하세요.",
        },
        {
          question: "와이탄 야경 조명은 언제 켜지나요?",
          answer: "이른 저녁, 일몰이 아니라 시에서 정한 시각에 켜집니다. 와이탄과 루자쭈이가 함께 불을 밝혔다가 그날 밤 함께 꺼지고, 일부 공휴일에는 더 오래 켜 둡니다. 금요일부터 일요일까지와 공휴일에는 조명에 색이 더해지고 빛이 천천히 움직이기도 합니다. 계절마다 시간이 바뀌니 당일 시간을 확인하고 조금 일찍 자리를 잡으세요.",
        },
        {
          question: "와이탄 야경은 어디서 봐야 가장 멋진가요?",
          answer: "맞은편 강변입니다. 양쪽 풍경은 서로 건너편에서 봐야 제대로 보입니다. 와이탄에서는 푸둥의 빌딩을, 푸둥 강변에서는 불 켜진 와이탄의 석조 건물을 봅니다. 두 곳은 지하철 2호선으로 한 정거장, 공공 페리로 몇 분 거리입니다. 와이탄 전체가 휘어지는 모습을 보려면 북쪽 끝 와이바이두교 위에 서 보세요.",
        },
      ],
    },
  },
  "shanghai-tower": {
    en: {
      description: "From Shanghai Tower's 118th-floor deck, 546 metres up, you look down on Pudong's other skyscrapers. Which day to go up, and which deck to choose.",
      why: [
        "The lift doors close in the basement, and less than a minute later they open on the 118th floor, 546 metres up. Walk to the glass and Shanghai lies spread out below you. Skyscrapers that made you crane your neck in the street now sit beneath your feet. The Huangpu loops round the Lujiazui bend and the Bund shrinks to a line of small stone fronts on the far bank. Beyond, the city runs on in every direction as far as you can see.",
        "Take a good look at the tower from outside before you go up. Its glass skin turns about a third of a circle from bottom to top, so the whole building seems to twist as it climbs. The twist also eases the push of strong winds on it. Chinese internet users call the three tall neighbours the kitchen set. The Jin Mao is the syringe, the World Financial Center the bottle opener, and this twisted one the egg whisk. Learn the names in the street, then find all three again from the top.",
        "Lujiazui has four towers you can go up. Shanghai Tower is the highest, and from it the others look small. The World Financial Center's deck, on its 100th floor at 474 metres, has see-through glass strips in the floor to stand on. The Jin Mao's deck, on the 88th floor at about 340 metres, is lower still. The Oriental Pearl, the TV tower by the river, works better as something to photograph from the Bund. If you go up only one, choose by the sky. On a clear day go highest; on a murky one, skip the decks and look at the towers from the river.",
      ],
      highlights: [
        {
          name: "The 55-second ride",
          body: "The ride from the basement to the 118th floor takes about 55 seconds. Stand still and you feel the push as the lift speeds away, and your ears may pop on the way up.",
        },
        {
          name: "Look down on the neighbours",
          body: "Find the World Financial Center, with the open slot at its top that earned it the bottle-opener name, and the stepped spire of the Jin Mao, both well below you. Further down, by the river, are the pink spheres of the Oriental Pearl Tower.",
        },
        {
          name: "Stay from sunset into dark",
          body: "Come up about an hour before sunset and find a place at the west-facing glass. The sun goes down over Puxi, the older half of the city across the river, and then the lights come on along both banks below you.",
        },
      ],
      time: "About an hour and a half, including security, the ride up and time at the glass. Allow longer if you stay from sunset into dark.",
      when: "Pick the clearest day of your stay and check the visibility that morning: in low cloud or haze you may see little but grey. To see the city by day and by night in one visit, arrive about an hour before sunset. Weekdays are calmer than weekends and public holidays.",
      pair: "Go up first, then cross to the Bund after dark, so you see Pudong from above and then from the far bank. Metro Line 2 runs one stop from Lujiazui to East Nanjing Road. Three stops the other way, at Shanghai Science and Technology Museum station, is Shanghai Museum East, so the museum by day and the tower at sunset make one easy day.",
      skip: "If heights or packed lifts bother you, stay on the ground and look at the towers from the Bund, which costs nothing. On a hazy or rainy day, save your money, because you will see little. And if you have already been up one of Lujiazui's towers, a second brings less of a thrill.",
      faq: [
        {
          question: "Is the Shanghai Tower observation deck worth it?",
          answer: "Yes, on a clear day. From the 118th floor, 546 metres up, even Pudong's other skyscrapers sit below you, and the river and the city spread out on every side. The lift takes about 55 seconds. On a hazy or rainy day, skip it and look at the towers from the Bund instead.",
        },
        {
          question: "Shanghai Tower or the World Financial Center: which deck should I choose?",
          answer: "Choose Shanghai Tower for the highest view: its 118th-floor deck is 546 metres up and looks down on the others. Choose the World Financial Center if you want to stand on glass: its 100th-floor deck, at 474 metres, has see-through strips in the floor. They stand side by side, so one deck is enough for most visitors.",
        },
        {
          question: "When is the best time to go up the Shanghai Tower?",
          answer: "On the clearest day of your stay, arriving about an hour before sunset, so you see the city in daylight and then lit up. Check the visibility that morning, because low cloud or haze can leave you looking at grey. Weekdays are calmer than weekends and public holidays.",
        },
        {
          question: "How long do you need at the Shanghai Tower?",
          answer: "About an hour and a half, including security, the ride up and time at the glass, and longer if you wait from sunset into dark. The Bund is one Metro stop away on Line 2, so the tower and an evening walk there fit easily into one afternoon and evening.",
        },
        {
          question: "Do I need to book Shanghai Tower tickets in advance?",
          answer: "Booking ahead is wise, especially for a sunset visit or a public holiday. Tickets are sold in each visitor's own name, so foreign visitors use their passport. The rules change from time to time, and we can check them for your date and book for you.",
        },
      ],
    },
    zh: {
      description: "上海中心大厦 118 层观光厅离地 546 米，连陆家嘴其他摩天楼都在脚下。什么时候上去，选哪个观光厅。",
      why: [
        "电梯门在地下关上，不到一分钟，就在 118 层打开，这里离地 546 米。走到玻璃前，整个上海铺在脚下；在街上要仰着头看的那些摩天楼，这会儿都矮了一截。黄浦江绕着陆家嘴拐了个大弯，对岸的外滩缩成一排小小的石头房子，城市朝四面八方铺开，一眼望不到头。",
        "上去之前，先在外面抬头好好看看它。整栋楼的玻璃外墙从下到上转了大约三分之一圈，看上去像是一边往上长、一边拧着身子；这一拧，也让大风推在楼上的力小了不少。网友给陆家嘴挨在一起的三栋高楼起了个外号，叫“厨房三件套”：金茂大厦是注射器，环球金融中心是开瓶器，拧着身子的上海中心是打蛋器。在街上认准了它们，上到顶层再一栋栋找出来。",
        "陆家嘴能登高看风景的楼和塔一共有四座。上海中心最高，站在上面，其他几座都在脚下。环球金融中心的观光厅在 100 层，离地 474 米，地上有几条透明玻璃，可以站上去往下看。金茂大厦的观光厅在 88 层，离地约 340 米，又低一些；江边的东方明珠电视塔，更适合在外滩当背景拍照。只上一个的话，看天挑。天晴就去最高的；天灰蒙蒙的就别上了，到江边看楼更值。",
      ],
      highlights: [
        {
          name: "55 秒直上 118 层",
          body: "从地下到 118 层，大约 55 秒。站稳了，能感觉到电梯起步时往上一送，耳朵也可能有点发胀。",
        },
        {
          name: "低头找邻居",
          body: "找到环球金融中心顶上那个镂空的“开瓶器”口，再找金茂大厦一层层收上去的尖顶，两栋都在你脚下。再往下，江边是东方明珠那几颗粉色的圆球。",
        },
        {
          name: "从日落待到天黑",
          body: "日落前一小时左右上来，在朝西的玻璃前找个位置。太阳落到江对岸的浦西后面，接着，脚下两岸的灯亮了起来。",
        },
      ],
      time: "连安检、坐电梯和在观光厅里看，一个半小时左右；想从日落待到天黑，就再多留些时间。",
      when: "挑在上海那几天里最晴的一天，当天早上看一下能见度，碰上低云或雾霾，可能只看得到一片灰。想一次看到白天和夜景，日落前一小时左右到。平日比周末和节假日人少。",
      pair: "先上楼，天黑后再去外滩，从高处看完浦东，再从对岸看一遍。地铁 2 号线从陆家嘴坐一站就到南京东路。往另一个方向坐三站是上海科技馆站，上海博物馆东馆就在旁边，白天看博物馆、傍晚上上海中心，正好排成一天。",
      skip: "怕高或者怕挤电梯的人，就别上去了，在外滩看陆家嘴的楼，不花钱也好看。阴天下雨也不值得花这个钱，上去看不到什么。已经上过陆家嘴别的高楼，再上一栋，新鲜感就不多了。",
      faq: [
        {
          question: "上海中心观光厅值得上去吗？",
          answer: "值得，前提是天晴。118 层离地 546 米，连浦东其他摩天楼都在脚下，江和整座城市在四周铺开。电梯大约 55 秒到顶。碰上雾霾或下雨，就别上去了，改去外滩看楼。",
        },
        {
          question: "上海中心和环球金融中心，选哪个观光厅？",
          answer: "想看最高的风景，选上海中心：118 层观光厅离地 546 米，能俯瞰周围的高楼。想站在玻璃上往下看，选环球金融中心：100 层观光厅离地 474 米，地上有透明玻璃。两栋楼挨在一起，大多数人上一个就够了。",
        },
        {
          question: "什么时候上上海中心最好？",
          answer: "挑在上海最晴的一天，日落前一小时左右到，先看白天的城市，再看亮灯。当天早上查一下能见度，碰上低云或雾霾，可能只看得到一片灰。平日比周末和节假日人少。",
        },
        {
          question: "上海中心观光要多长时间？",
          answer: "一个半小时左右，包括安检、坐电梯上楼和在观光厅里看；想从日落待到天黑就再久一点。外滩只隔一站地铁 2 号线，上海中心加外滩夜景，一个下午加晚上就能轻松排下。",
        },
        {
          question: "上海中心观光厅要提前买票吗？",
          answer: "建议提前买，尤其是想看日落或者赶上节假日。门票实名，外国游客用护照购票。规则时常调整，我们可以按你的日期核实并代为预订。",
        },
      ],
    },
    ko: {
      description: "상하이 타워 118층 전망대는 지상 546m에 있어 루자쭈이의 다른 고층 빌딩들도 발아래로 보입니다. 언제 오를지, 어느 전망대를 고를지.",
      why: [
        "지하에서 엘리베이터 문이 닫히고 1분도 안 돼 118층, 지상 546m에서 문이 열립니다. 유리창 앞에 서면 상하이가 발아래 펼쳐지고, 거리에서 고개를 한껏 젖혀야 보이던 고층 빌딩들이 이제 내려다보입니다. 황푸강은 루자쭈이를 감싸며 크게 굽이치고, 강 건너 와이탄은 작은 석조 건물 한 줄로 줄어들며, 도시는 사방으로 아득히 이어집니다. 같은 118층이지만 롯데월드타워 서울스카이의 스카이데크(478m)보다 70m쯤 더 높습니다.",
        "올라가기 전에 먼저 밖에서 이 빌딩을 찬찬히 올려다보세요. 유리 외벽이 아래에서 위로 3분의 1바퀴쯤 돌아가 있어, 건물 전체가 몸을 비틀며 솟아오르는 것처럼 보입니다. 이 비틀림 덕분에 건물이 강풍에 받는 힘도 한결 줄어듭니다. 중국 네티즌들은 나란히 선 세 빌딩을 ‘주방 3종 세트’라고 부릅니다. 진마오 타워는 주사기, 세계금융센터는 병따개, 몸을 비튼 상하이 타워는 거품기입니다. 거리에서 이름을 익혀 두었다가 꼭대기에서 셋을 다시 찾아보세요.",
        "루자쭈이에는 올라가 볼 수 있는 빌딩과 탑이 네 곳 있습니다. 상하이 타워가 가장 높아 나머지를 모두 내려다봅니다. 세계금융센터의 전망대는 100층, 474m에 있고 바닥에 투명 유리 구간이 있어 그 위에 서 볼 수 있습니다. 진마오 타워의 전망대는 88층, 약 340m로 그보다 낮고, 강가의 방송탑 동방명주는 올라가기보다 와이탄에서 사진 배경으로 담기에 더 좋습니다. 한 곳만 오른다면 하늘을 보고 고르세요. 맑은 날에는 가장 높은 곳으로, 뿌연 날에는 전망대 대신 강가에서 빌딩을 바라보는 편이 낫습니다.",
      ],
      highlights: [
        {
          name: "55초 만에 118층까지",
          body: "지하에서 118층까지 55초쯤 걸립니다. 가만히 서 있으면 출발할 때 몸이 위로 밀리는 느낌이 들고, 올라가는 동안 귀가 먹먹해질 수도 있습니다.",
        },
        {
          name: "이웃 빌딩 내려다보기",
          body: "꼭대기에 뚫린 구멍 때문에 ‘병따개’라는 별명이 붙은 세계금융센터와, 층층이 좁아지는 진마오 타워의 뾰족한 꼭대기를 찾아보세요. 둘 다 한참 발아래 있습니다. 더 아래 강가에는 동방명주의 분홍빛 구슬이 보입니다.",
        },
        {
          name: "해 질 녘부터 밤까지",
          body: "일몰 한 시간쯤 전에 올라가 서쪽 창가에 자리를 잡으세요. 강 건너 오래된 시가지인 푸시(浦西) 쪽으로 해가 지고 나면, 발아래 양쪽 강변에 불이 들어옵니다.",
        },
      ],
      time: "보안 검색과 엘리베이터, 전망대 관람까지 1시간 30분 정도입니다. 일몰부터 밤까지 머문다면 더 잡으세요.",
      when: "머무는 동안 가장 맑은 날을 고르고, 그날 아침 시정을 확인하세요. 낮은 구름이나 스모그가 끼면 회색빛만 보일 수 있습니다. 낮과 밤을 한 번에 보려면 일몰 한 시간쯤 전에 도착하세요. 평일이 주말이나 공휴일보다 한산합니다.",
      pair: "먼저 전망대에 오르고 해가 진 뒤 와이탄으로 건너가면, 푸둥을 위에서 한 번, 강 건너에서 한 번 보게 됩니다. 지하철 2호선으로 루자쭈이역에서 난징둥루역까지 한 정거장입니다. 반대 방향으로 세 정거장 가면 상하이과학기술관역이고 바로 옆이 상하이박물관 동관이라, 낮에는 박물관, 해 질 녘에는 타워로 하루를 짜기 좋습니다.",
      skip: "높은 곳이나 붐비는 엘리베이터가 힘들다면 올라가지 말고, 무료로 볼 수 있는 와이탄에서 빌딩 풍경을 바라보세요. 뿌옇거나 비 오는 날에는 돈을 아끼세요. 올라가도 보이는 게 별로 없습니다. 루자쭈이의 다른 전망대에 이미 올라 봤다면, 하나 더 오르는 설렘은 크지 않습니다.",
      faq: [
        {
          question: "상하이 타워 전망대는 가 볼 만한가요?",
          answer: "네, 맑은 날이라면 가 볼 만합니다. 지상 546m의 118층에서는 푸둥의 다른 고층 빌딩들까지 발아래 있고, 강과 도시가 사방으로 펼쳐집니다. 엘리베이터로 55초쯤 걸립니다. 뿌옇거나 비 오는 날에는 오르지 말고 와이탄에서 빌딩을 바라보세요.",
        },
        {
          question: "상하이 타워와 세계금융센터 중 어느 전망대가 좋을까요?",
          answer: "가장 높은 전망을 원한다면 상하이 타워입니다. 118층 전망대가 546m 높이에 있어 다른 빌딩들을 내려다봅니다. 유리 바닥 위에 서 보고 싶다면 세계금융센터입니다. 474m 높이의 100층 전망대 바닥에 투명 유리 구간이 있습니다. 두 빌딩이 나란히 있어 대부분은 한 곳이면 충분합니다.",
        },
        {
          question: "상하이 타워는 언제 오르는 게 가장 좋나요?",
          answer: "머무는 동안 가장 맑은 날, 일몰 한 시간쯤 전에 오르면 낮의 도시와 불 켜진 도시를 모두 볼 수 있습니다. 그날 아침 시정을 확인하세요. 낮은 구름이나 스모그가 끼면 회색빛만 보일 수 있습니다. 평일이 주말이나 공휴일보다 한산합니다.",
        },
        {
          question: "상하이 타워 관람에는 시간이 얼마나 걸리나요?",
          answer: "보안 검색과 엘리베이터, 전망대 관람까지 1시간 30분 정도이고, 일몰부터 밤까지 머문다면 더 걸립니다. 와이탄은 지하철 2호선으로 한 정거장이라, 타워와 와이탄 야경 산책을 오후부터 저녁까지 한 번에 묶기 좋습니다.",
        },
        {
          question: "상하이 타워 입장권은 미리 예약해야 하나요?",
          answer: "미리 사 두는 것이 좋습니다. 일몰 시간대나 공휴일이라면 더욱 그렇습니다. 입장권은 방문자 본인 실명으로 사며, 외국인은 여권을 씁니다. 규정이 종종 바뀌므로, 저희가 날짜에 맞춰 확인하고 대신 예약해 드릴 수 있습니다.",
        },
      ],
    },
  },
  "shanghai-museum-east": {
    en: {
      description: "In Pudong, Shanghai Museum East shows a bronze cauldron once buried to hide it from soldiers, scrolls that change every six months and a roof garden.",
      why: [
        "From the basement entrance, an escalator carries you up under a round skylight into a bright hall, where people sit on wide steps with a coffee. The galleries off it are hushed and softly lit. Here are bronze vessels three thousand years old, Buddhist figures carved in white stone and a Song dynasty dish the blue-green of the sky after rain. Every floor has tall windows or a terrace to rest your eyes, and chairs line the corridors, so a long day never turns into a march.",
        "Its best-known treasure comes with a war story. The Da Ke Ding, a great bronze cauldron, belonged to the Pan family of Suzhou, who also owned another giant, the Da Yu Ding. In 1937 Pan Dayu, the woman who ran the household, had both buried. After the city fell, Japanese soldiers searched the house several times and never found them, and in 1951 she gave both to the state. Upstairs, the paintings and calligraphy keep their own rhythm. Too fragile to stay out, they change about every six months, and when a famous scroll goes back into storage, people queue for a last look.",
        "East now holds the museum's permanent collection, in thirteen galleries from bronze and jade to porcelain, coins, seals, painting and calligraphy. Seeing them all properly would take at least seven hours, so choose two or three and take your time. Bronze plus painting and calligraphy makes a strong first visit; add ceramics if you love porcelain. The older building at People's Square is a separate visit until November 2027, given over to a single ticketed exhibition, so be sure which building you are heading for.",
      ],
      highlights: [
        {
          name: "The Da Ke Ding",
          body: "It stands in the bronze gallery on the ground floor, almost a metre tall and about 75 centimetres across the mouth, and it weighs about 200 kilograms. One broad wave pattern runs right round its belly, and a beast face stares out from the top of each of its three legs. Inside, 290 characters cast into the bronze record a king's gifts to a man named Ke, who made the cauldron to praise the king and honour his grandfather.",
        },
        {
          name: "A kilometre of scrolls",
          body: "On the second floor, the calligraphy and painting rooms run together as one route about a kilometre long, with small garden scenes and Chinese-style benches along the way. The scrolls change about every six months, so check what is on show before you go; the most famous pieces may be out for only a few months.",
        },
        {
          name: "The garden on the roof",
          body: "Follow the spiral walkway up to the fifth floor and into Yunlin, the Cloud Forest, a new roof garden built like the old gardens of the Yangtze delta, Suzhou's among them. On the west side are little bridges, running water and pavilions; on the east, an open courtyard ends at an old-style opera stage. Check that it is open on your day.",
        },
      ],
      time: "Three hours covers two or three galleries and the roof garden. Seeing every room properly would take at least seven.",
      when: "Weekday mornings are calmest. Numbers inside are capped, so at weekends and on holidays you may queue at the door even though no booking is needed. The museum closes one weekday each week, which our guide covers, so check it before you fix a date. It also makes a good plan for a rainy day.",
      pair: "The museum stands beside Shanghai Science and Technology Museum station on Metro Line 2, three stops east of Lujiazui. That makes an easy day: the museum in the morning, the Shanghai Tower at sunset. Century Park is one stop further east if you want a walk under the trees afterwards.",
      skip: "If ancient Chinese art leaves you cold, give it an hour for the bronze gallery and the roof garden, then move on. With only a day or two in Shanghai, the Bund and the old lanes will tell you more about the city itself.",
      faq: [
        {
          question: "Is Shanghai Museum East worth visiting?",
          answer: "Yes, if you have half a day for Chinese art. It holds the Shanghai Museum's permanent collection in 13 galleries, from 3,000-year-old bronzes to Song porcelain and famous scrolls, in a bright new building with a garden on the roof. Ordinary entry is free. Choose two or three galleries and give them about three hours.",
        },
        {
          question: "Shanghai Museum East or People's Square: which should I visit?",
          answer: "Choose East for the permanent collection: its 13 galleries hold the bronzes, ceramics, jade, painting and calligraphy. Until November 2027, the People's Square building shows a single ticketed special exhibition, so go there only if that exhibition appeals. The two buildings have separate rules, so check the right one before you go.",
        },
        {
          question: "How long do you need at Shanghai Museum East?",
          answer: "About three hours for two or three galleries and the roof garden. Seeing every gallery properly would take at least seven hours, more than most visitors want. Chairs along the corridors and a café in the main hall make a long visit easier.",
        },
        {
          question: "Do I need to book Shanghai Museum East?",
          answer: "No, not for ordinary entry: individual visitors walk in free with an original ID document, and our guide explains what to check if yours is a foreign passport. Two hands-on areas, the Curio-City and the Digital Gallery, need separate bookings in advance. Numbers inside are capped, so expect a queue at busy times, and check the weekly closing day before you go.",
        },
        {
          question: "How do I get to Shanghai Museum East?",
          answer: "Take Metro Line 2 to Shanghai Science and Technology Museum station, three stops east of Lujiazui; Shanghai's visitor guide points to Exit 8. Individual visitors use the east entrance on the basement level, so follow the signs once you arrive. The Shanghai Tower is on the same line, so the two fit into one day.",
        },
      ],
    },
    zh: {
      description: "浦东的上海博物馆东馆里，有战时埋进地下、躲过搜查的大克鼎，有每半年换一轮的古书画，楼顶还有一座园林。",
      why: [
        "从地下一层的入口进来，坐扶梯往上，头顶是一圈圆形的天窗；上到一座明亮的大厅，有人坐在宽宽的台阶上喝咖啡。大厅四周的展厅安安静静，灯光柔和，有三千年前的青铜器，有白石雕成的佛像，还有一只宋代瓷盘，颜色正是雨过天青。每层都有落地窗或露台，看累了可以望望窗外；走廊边一路摆着椅子，逛一整天也不至于走成急行军。",
        "最有名的那件宝贝，背后有一段战时的故事。大克鼎原是苏州潘家的藏品，潘家还藏着另一只大鼎，叫大盂鼎。1937 年，主持家事的潘达于把两只鼎埋进了地下；苏州沦陷后，日军几次闯进潘家搜查，始终没有找到。1951 年，潘达于把两只鼎都捐给了国家。楼上的书画，则有自己的节奏。古书画太娇贵，不能一直展着，大约每半年换一轮；名作撤下来之前，常有人排长队，只为再看一眼。",
        "如今上博的常设展都在东馆，一共 13 个展厅，从青铜、玉器到陶瓷、钱币、印章、书画。真要一间间看完，至少得七个小时，所以挑两三个，慢慢看。第一次来，青铜加书画就很扎实；喜欢瓷器，再加陶瓷馆。人民广场那座老馆到 2027 年 11 月为止只办一个另外售票的特展，跟东馆是两回事，出发前先想清楚去哪一座。",
      ],
      highlights: [
        {
          name: "大克鼎",
          body: "大克鼎在一楼青铜馆，高将近一米，口径 75 厘米左右，重约 200 公斤。鼎的肚子上绕着一整圈宽宽的波浪纹，三条腿的上端各凸出一张兽面。内壁铸着 290 个字，记下周王给克的封赏；克铸了这只鼎，歌颂周王，也祭祀祖父。",
        },
        {
          name: "一公里书画长廊",
          body: "二楼的书法馆和绘画馆连成一条约一公里长的看展路线，沿途布置了几处园林小景和中式座椅。书画大约每半年换一轮，出发前先查一下眼下展的是什么；最有名的几件，可能只展出几个月。",
        },
        {
          name: "楼顶园林“云林”",
          body: "顺着螺旋形步道上到五楼，就走进了屋顶上新造的一座江南园林“云林”。西边是小桥流水和亭台，东边是一个开阔的院子，尽头立着一座仿古戏台。去之前确认一下当天是否开放。",
        },
      ],
      time: "挑两三个展厅、再上楼顶园林，三个小时左右。每个展厅都认真看完，至少要七个小时。",
      when: "平日上午人最少。馆内限流，周末和节假日即使不用预约，门口也可能要排队。东馆每周有一个工作日闭馆，我们的攻略里写着是哪天，定日期前先看一下。下雨天来这里正合适。",
      pair: "上博东馆就在地铁 2 号线上海科技馆站旁边，从陆家嘴往东坐三站。可以这样排一天：上午看博物馆，傍晚去上海中心看日落。想在树下走走，再往东坐一站就是世纪公园。",
      skip: "对中国古代艺术没什么兴趣的话，留一个小时，看完青铜馆、再上楼顶园林就够了。在上海只有一两天，外滩和老弄堂更能让你认识这座城市本身。",
      faq: [
        {
          question: "上海博物馆东馆值得去吗？",
          answer: "值得，前提是你愿意花半天看中国艺术。上博的常设展都在这里，13 个展厅，从三千年前的青铜器到宋代瓷器、传世书画，楼顶还有一座园林。普通入馆免费。挑两三个展厅，留三个小时左右。",
        },
        {
          question: "上博东馆和人民广场馆，去哪个？",
          answer: "想看常设展，就去东馆：青铜、陶瓷、玉器、书画这些展厅都在那里。人民广场馆到 2027 年 11 月为止只办一个售票特展，对那个展感兴趣再去。两座馆规则各不相同，出发前查清楚去的是哪一座。",
        },
        {
          question: "逛上博东馆需要多长时间？",
          answer: "挑两三个展厅、再上楼顶园林，三个小时左右。每个展厅都认真看完至少要七个小时，大多数人用不着。走廊边有椅子，大厅里有咖啡，逛久了也不太累。",
        },
        {
          question: "上博东馆要预约吗？",
          answer: "普通入馆不用：个人观众带有效证件原件，免费入馆；用外国护照入馆要注意什么，我们的攻略里有说明。古代文明探索宫和数字馆这两个互动区，要另外提前预约。馆内限流，人多时门口可能排队，出发前也确认一下每周的闭馆日。",
        },
        {
          question: "怎么去上海博物馆东馆？",
          answer: "坐地铁 2 号线到上海科技馆站，从陆家嘴往东三站；上海市政府的游客指南建议走 8 号口。个人观众从地下一层的东门进馆，到了跟着指示牌走。上海中心在同一条线上，两处正好排在一天。",
        },
      ],
    },
    ko: {
      description: "푸둥의 상하이박물관 동관에는 전쟁 때 땅에 묻어 수색을 피한 청동솥, 반년마다 바뀌는 옛 서화, 옥상 정원이 있습니다.",
      why: [
        "지하 입구로 들어서면 둥근 천창 아래로 에스컬레이터가 올라가고, 그 위 밝은 중앙 홀에서는 넓은 계단에 앉아 커피를 마시는 사람들이 보입니다. 홀 옆 전시실들은 조용하고 조명이 부드럽습니다. 3,000년 전 청동기와 흰 돌로 새긴 불교 조각, 비 갠 뒤의 하늘처럼 푸른 송나라 자기 접시가 이곳에 있습니다. 층마다 큰 창이나 테라스가 있어 눈을 쉴 수 있고, 복도 곳곳에 의자가 있어 하루 종일 있어도 강행군이 되지 않습니다.",
        "가장 유명한 보물에는 전쟁 이야기가 얽혀 있습니다. 거대한 청동솥 대극정(大克鼎)은 쑤저우 판(潘)씨 집안의 소장품이었고, 이 집안에는 또 하나의 큰 솥 대우정도 있었습니다. 1937년 집안을 이끌던 판다위(潘達于)가 두 솥을 땅에 묻었고, 쑤저우가 함락된 뒤 일본군이 여러 차례 집을 뒤졌지만 끝내 찾지 못했습니다. 1951년 판다위는 두 솥을 모두 나라에 기증했습니다. 위층 서화실은 사정이 다릅니다. 옛 그림과 글씨는 쉽게 상해서 계속 걸어 둘 수 없으니 반년쯤마다 작품을 바꾸고, 유명한 작품이 내려가기 전에는 마지막으로 보려는 사람들이 길게 줄을 섭니다.",
        "지금 상하이박물관의 상설 전시는 동관에 있습니다. 청동기와 옥기부터 도자기, 화폐, 인장, 서화까지 전시실이 13곳입니다. 모두 제대로 보려면 적어도 7시간이 걸리니 두세 곳을 골라 여유 있게 보세요. 처음이라면 청동기와 서화가 든든한 조합이고, 도자기를 좋아한다면 도자기실을 더하세요. 인민광장의 옛 건물은 2027년 11월까지 별도 입장권이 필요한 특별전 하나만 엽니다. 동관과는 전혀 다른 관람이니 어느 건물로 가는지 먼저 확인하세요.",
      ],
      highlights: [
        {
          name: "대극정 앞에 서기",
          body: "1층 청동기실에 있으며, 높이는 1m 가까이, 솥 입구 지름은 75cm쯤, 무게는 200kg쯤 됩니다. 몸통에는 굵은 물결무늬가 한 바퀴 빙 둘러 있고, 세 다리 윗부분에는 짐승 얼굴이 하나씩 불룩하게 도드라져 있습니다. 안쪽 벽에 주조된 290자에는 주나라 왕이 극(克)에게 상을 내린 일이 적혀 있고, 극은 왕을 기리고 할아버지께 제사를 올리려고 이 솥을 만들었습니다.",
        },
        {
          name: "1km 서화 길",
          body: "2층의 서예실과 회화실은 약 1km의 관람 동선으로 이어지고, 길 곳곳에 작은 정원 풍경과 중국식 의자가 놓여 있습니다. 작품이 반년쯤마다 바뀌니 지금 무엇이 걸려 있는지 미리 확인하세요. 가장 유명한 작품은 몇 달만 나오기도 합니다.",
        },
        {
          name: "옥상 정원 ‘운림’",
          body: "나선형 산책로를 따라 5층에 오르면 쑤저우를 비롯한 장강 하류 지역의 옛 정원처럼 새로 꾸민 옥상 정원 ‘운림(雲林)’이 나옵니다. 서쪽에는 작은 다리와 물길, 정자가 있고, 동쪽은 탁 트인 마당 끝에 옛 양식의 공연 무대가 서 있습니다. 방문하는 날 열려 있는지 확인하세요.",
        },
      ],
      time: "전시실 두세 곳과 옥상 정원이면 3시간 정도입니다. 모든 전시실을 제대로 보려면 적어도 7시간이 걸립니다.",
      when: "평일 오전이 가장 한산합니다. 관내 인원을 제한하기 때문에 주말과 연휴에는 예약이 필요 없어도 입구에서 줄을 설 수 있습니다. 매주 평일 하루는 휴관하며 저희 가이드 글에 요일이 있으니, 날짜를 정하기 전에 확인하세요. 비 오는 날 일정으로도 좋습니다.",
      pair: "박물관은 지하철 2호선 상하이과학기술관역 바로 옆으로, 루자쭈이역에서 동쪽으로 세 정거장입니다. 오전에는 박물관, 해 질 녘에는 상하이 타워로 하루를 짜기 좋습니다. 나무 그늘 아래를 걷고 싶다면 한 정거장 더 가서 세기공원에 들르세요.",
      skip: "중국 고대 미술에 큰 관심이 없다면 한 시간만 잡아 청동기실과 옥상 정원만 보고 나와도 됩니다. 상하이에 하루이틀뿐이라면 와이탄과 옛 골목이 이 도시를 더 잘 보여 줍니다.",
      faq: [
        {
          question: "상하이박물관 동관은 가 볼 만한가요?",
          answer: "네, 중국 미술에 반나절을 쓸 수 있다면 가 볼 만합니다. 상하이박물관의 상설 전시가 모두 이곳 13개 전시실에 있습니다. 3,000년 전 청동기부터 송나라 자기와 이름난 서화까지 있고, 옥상에는 정원도 있습니다. 일반 입장은 무료입니다. 두세 곳을 골라 3시간쯤 잡으세요.",
        },
        {
          question: "상하이박물관 동관과 인민광장관 중 어디로 가야 하나요?",
          answer: "상설 전시를 보려면 동관입니다. 청동기, 도자기, 옥기, 서화 전시실이 모두 동관에 있습니다. 인민광장관은 2027년 11월까지 유료 특별전 하나만 열고 있으니, 그 전시에 관심이 있을 때만 가세요. 두 건물은 규정이 서로 다르니 어느 쪽인지 먼저 확인하세요.",
        },
        {
          question: "상하이박물관 동관 관람에는 시간이 얼마나 걸리나요?",
          answer: "전시실 두세 곳과 옥상 정원이면 3시간 정도입니다. 모든 전시실을 제대로 보려면 적어도 7시간이 걸리는데, 대부분은 그럴 필요가 없습니다. 복도 곳곳의 의자와 중앙 홀의 카페 덕분에 오래 머물러도 덜 지칩니다.",
        },
        {
          question: "상하이박물관 동관은 예약해야 하나요?",
          answer: "일반 입장은 예약이 필요 없습니다. 개인 방문객은 신분증 원본을 지참하면 무료로 들어갈 수 있고, 외국 여권이라면 무엇을 확인해야 하는지 저희 가이드 글에 정리해 두었습니다. 다만 체험 공간인 고대문명탐색궁과 디지털관은 따로 미리 예약해야 합니다. 관내 인원을 제한하므로 붐빌 때는 줄을 설 수 있고, 매주 휴관일도 미리 확인하세요.",
        },
        {
          question: "상하이박물관 동관은 어떻게 가나요?",
          answer: "지하철 2호선 상하이과학기술관역에서 내리면 되고, 루자쭈이역에서 동쪽으로 세 정거장입니다. 상하이시 방문 안내는 8번 출구를 안내합니다. 개인 방문객은 지하 1층 동쪽 입구로 들어가니 도착하면 표지판을 따라가세요. 상하이 타워가 같은 노선에 있어 하루에 함께 묶기 좋습니다.",
        },
      ],
    },
  },
  "humble-administrators-garden": {
    en: {
      description: "Suzhou's Humble Administrator's Garden: willows over still ponds, and a pagoda outside the walls that looks like part of the view. What to find, and when.",
      why: [
        "Step in from the street and the noise falls away behind the walls. A path winds past rocks and through doorways. Then the big pond of the Middle Garden opens in front of you. Willows lean over the water, stone bridges zigzag across it and pavilions lift their roof corners; in summer, lotus leaves spread across the pond. Every window and round doorway seems placed to frame a picture. Walk slowly and stop often. The garden shows itself one view at a time, the way a long painted scroll unrolls.",
        "It was begun about five hundred years ago by Wang Xianchen, an official who gave up his post and came home to Suzhou. He took its name from the third-century writer Pan Yue, who called watering his garden and selling his vegetables a clumsy man's way of governing. The painter Wen Zhengming is said to have helped plan the garden, and he painted its views. Later owners left their own marks. In the West Garden, a nineteenth-century merchant set the windows of his hall with blue glass, said to have come from Europe; look out through it at the pond.",
        "At about five hectares it is the largest of Suzhou's classic gardens, and it is built around water. Choose it for wide ponds and long views; for winding corridors and courtyards, Lingering Garden suits better, and Master-of-Nets is small and intimate. The Middle Garden is the heart of it, so give that part the most time. Its fame brings crowds. In July 2023 it averaged more than 20,000 visitors a day, so book the earliest entry slot you can get.",
      ],
      highlights: [
        {
          name: "The pagoda across the water",
          body: "At the east end of the big pond, stand by the Leaning Rainbow Pavilion and look west, over the bridges and trees, to the North Temple Pagoda. It stands about a kilometre away, outside the garden, yet on a still day it shows in the pond as if it belonged here. No building in between may rise higher than the pagoda, so the view stays open.",
        },
        {
          name: "The Hall of Distant Fragrance",
          body: "The Middle Garden's main hall has tall windows on all four sides, so from inside you see water, rocks and pavilions all round. In summer the pond in front fills with lotus. The hall is named for it, after the Song writer Zhou Dunyi's line that the lotus's fragrance grows purer the further it carries.",
        },
        {
          name: "A pavilion shaped like a fan",
          body: "In the West Garden, a small pavilion by the water is fan-shaped down to its doors, windows, table and stools. It is said to recall the owner's family fan business. Its name asks ‘With whom shall I sit?’, a line from the poet Su Dongpo, whose answer is the bright moon, the fresh breeze and me.",
        },
      ],
      time: "Two to two and a half hours for the East, Middle and West gardens at an easy pace.",
      when: "Book the earliest entry slot you can; the ponds are calmest before the crowds build. Azaleas fill the garden in spring, from about April into May, and lotus spreads across parts of the pond from about June, at its fullest in high summer. Around the May Day and National Day holidays, tickets can sell out.",
      pair: "Suzhou Museum, designed by the architect I. M. Pei, is next door and needs its own booking. A wisteria said to have been planted by Wen Zhengming grows in the courtyard of the old mansion that is now part of the museum. In early April it spills purple over the wall, and you can see it from the street. Lion Forest Garden, with its maze of rocks, is about 500 metres' walk away. Pingjiang Road, a lane of old houses along a canal, starts about ten minutes' walk away.",
      skip: "If crowds spoil a garden for you, choose a smaller one on a quiet morning, such as Master-of-Nets or the Couple's Retreat Garden. If you have time for just one garden and love water, keep this one. And if gardens leave you cold, give the morning to Suzhou's canals and Pingjiang Road instead.",
      faq: [
        {
          question: "Is the Humble Administrator's Garden worth visiting?",
          answer: "Yes, especially if you have time for only one Suzhou garden. At about five hectares it is the largest of the city's classic gardens, laid out round a big pond with willows, stone bridges and pavilions. Even a pagoda outside the walls seems part of the view. Give it two to two and a half hours and take an early slot.",
        },
        {
          question: "How long do you need at the Humble Administrator's Garden?",
          answer: "Two to two and a half hours covers the East, Middle and West gardens at an easy pace. Allow longer if you like to sit and look, which is what the garden was made for. Suzhou Museum next door needs its own booking, so plan its time separately.",
        },
        {
          question: "Humble Administrator's Garden or Lingering Garden: which should I choose?",
          answer: "Choose the Humble Administrator's Garden for wide water and long views; at about five hectares it is Suzhou's largest classic garden. Choose Lingering Garden for winding corridors, courtyards and framed views. If you dislike crowds, Master-of-Nets is smaller and more intimate. With a whole day, see two that feel different.",
        },
        {
          question: "What is the best time to visit the Humble Administrator's Garden?",
          answer: "An early entry slot, ideally on a weekday in spring or summer. Azaleas bloom from about April into May, and lotus spreads across the pond from about June, fullest in high summer. Expect company: in July 2023 it averaged more than 20,000 visitors a day, and tickets can sell out around the May Day and National Day holidays.",
        },
        {
          question: "Do I need to book the Humble Administrator's Garden in advance?",
          answer: "Yes. Tickets are real-name and timed, for a set date and entry slot, and can be booked one to seven days ahead through the official Suzhou Gardens service. Holiday dates can sell out. Booking with a passport is not always straightforward, and we can check the rules for your date and book for you.",
        },
      ],
    },
    zh: {
      description: "苏州拙政园：一池静水，满岸垂柳，连园外的一座古塔都成了园中一景。去看哪三处，什么时候去。",
      why: [
        "从街上走进园门，墙一隔，外面的嘈杂就没了。顺着小路绕过假山、穿过门洞，中部那一大片水忽然在眼前铺开：柳枝垂在水面上，石桥曲曲折折，亭子的屋角高高翘起；到了夏天，池里一片片都是荷叶。每一扇窗、每一个圆门洞，都像是专为框一幅画留的。慢慢走，多停一停。这座园子要一景一景地看，像慢慢展开一幅长卷。",
        "约五百年前，官员王献臣辞官回到苏州，修起了这座园子。园名取自西晋潘岳的《闲居赋》：浇浇园子、卖卖菜，“是亦拙者之为政也”，这也算是笨人的为政之道。据说画家文徵明帮着出过主意，他还画过园中景致。后来的园主也各自留下了印记。西园里，清末一位商人修了一座厅，窗上嵌着蓝色玻璃，相传是从欧洲买来的。不妨隔着这层蓝玻璃，看一看外面的池水。",
        "拙政园占地约 5 公顷，是苏州古典园林里最大的一座，全园以水为主。想看开阔的水面和远景，就来这里；想看曲折的回廊和小院，留园更合适；网师园则小巧精致。中部是全园的精华，时间多留给那里。名气大，人也多。2023 年 7 月，这里平均每天接待游客超过 2 万人次，能约到最早的入园时段，就约最早的。",
      ],
      highlights: [
        {
          name: "隔水看塔",
          body: "走到中部大水池的东头，在倚虹亭边往西望，越过曲桥和树梢，就是北寺塔。塔在园外约 1 公里，水面平静时，塔影还会倒映在池里，像是园中一景。拙政园和北寺塔之间的楼房，都不许高过这座塔，所以这一眼到今天还看得到。",
        },
        {
          name: "远香堂",
          body: "中部的主厅，四面都是落地长窗，坐在里面，水、石、亭子一圈都看得到。夏天堂前满池荷花，堂名也从荷花来，取自周敦颐《爱莲说》里的“香远益清”。",
        },
        {
          name: "扇形的与谁同坐轩",
          body: "西园水边一座小亭，门、窗，连桌子凳子都是扇形的，据说是园主为纪念祖上做扇子起家而建。亭名出自苏轼的词：“与谁同坐？明月，清风，我。”",
        },
      ],
      time: "东、中、西三部分从容走一遍，两到两个半小时。",
      when: "能约最早的时段就约最早的，趁人潮上来之前，水边最安静。春天四五月间看杜鹃；夏天从六月起，池里陆续开出荷花，盛夏最旺。五一、国庆前后，门票可能约满。",
      pair: "隔壁就是贝聿铭设计的苏州博物馆，要另外预约。博物馆里的忠王府院中，有一株相传是文徵明亲手种下的紫藤，四月初开花时，一大片紫色从墙头垂下来，在街上就看得到。狮子林和它的假山迷宫，步行约 500 米；沿河的老街平江路，北头离这里步行十分钟左右。",
      skip: "怕挤的人，不如挑个清静的早上，去小一些的园子，比如网师园或耦园。只有时间看一座园子、又喜欢水的人，就留着拙政园。对园林本来就没兴趣，把这个上午留给苏州的河道和平江路吧。",
      faq: [
        {
          question: "苏州拙政园值得去吗？",
          answer: "值得，尤其是只有时间看一座苏州园林的话。它占地约 5 公顷，是苏州古典园林里最大的一座，围着一大片水池，有垂柳、石桥和亭子，连园外的一座塔都像园里的景。留两到两个半小时，约早一点的时段。",
        },
        {
          question: "逛拙政园要多长时间？",
          answer: "东、中、西三部分从容走一遍，两到两个半小时。喜欢坐下来慢慢看，就多留一些，这座园子本来就是让人这样看的。隔壁的苏州博物馆要另外预约，时间也要另算。",
        },
        {
          question: "拙政园和留园，选哪个？",
          answer: "想看开阔的水面和远景，选拙政园，它占地约 5 公顷，是苏州最大的古典园林。想看曲折的回廊、小院和一扇扇窗里的景，选留园。怕挤的话，网师园小巧精致。有一整天，就挑两座风格不同的。",
        },
        {
          question: "什么时候去拙政园最好？",
          answer: "约早一点的入园时段，最好是春夏的平日。四五月间杜鹃开，六月起池里陆续开荷花，盛夏最旺。人一定不会少：2023 年 7 月，这里平均每天接待游客超过 2 万人次，五一、国庆前后门票可能约满。",
        },
        {
          question: "拙政园要提前预约吗？",
          answer: "要。门票实名、分时段，对应日期和入园时段，可以提前一到七天在苏州园林官方渠道预约。节假日可能很快约满。用护照预约的步骤不一定顺利，我们可以按你的日期核实规则并代为预约。",
        },
      ],
    },
    ko: {
      description: "쑤저우 졸정원: 고요한 연못에 늘어진 버드나무, 담장 밖 옛 탑까지 정원의 풍경이 됩니다. 꼭 찾아볼 세 곳과 가기 좋은 때.",
      why: [
        "길에서 문 안으로 들어서면 담장 하나로 바깥 소음이 사라집니다. 바위를 쌓은 가산을 돌고 문을 지나면 중원(中園)의 큰 연못이 눈앞에 펼쳐집니다. 버드나무가 물 위로 늘어지고, 돌다리가 지그재그로 이어지며, 정자의 처마 끝이 하늘로 들려 있습니다. 여름이면 연잎이 연못 곳곳을 덮습니다. 창 하나, 둥근 문 하나도 그림 한 폭을 담으려고 낸 것 같습니다. 천천히 걷고 자주 멈추세요. 이 정원은 긴 두루마리 그림을 펼치듯 한 장면씩 모습을 드러냅니다.",
        "약 500년 전, 왕헌신이라는 관리가 벼슬을 내려놓고 고향 쑤저우로 돌아와 지은 정원입니다. 조선의 양산보가 스승 조광조를 잃고 낙향해 담양에 소쇄원을 지은 것도 비슷한 무렵입니다. 이름은 서진의 문인 반악의 글에서 따왔습니다. 텃밭에 물을 주고 채소를 내다 파는 일을 두고 ‘이 또한 못난 사람이 하는 정치(拙者之爲政)’라고 한 구절입니다. 화가 문징명이 설계를 도왔다고 전하며, 그는 정원 풍경을 그림으로도 남겼습니다. 뒤의 주인들도 저마다 흔적을 남겼습니다. 서원(西園)에는 19세기의 한 상인이 지은 건물이 있는데, 유럽에서 들여왔다는 파란 유리가 창에 끼워져 있습니다. 그 유리 너머로 연못을 내다보세요.",
        "약 5ha로 쑤저우 고전 정원 가운데 가장 크고, 물을 중심으로 꾸몄습니다. 탁 트인 연못과 먼 풍경을 원한다면 이곳이고, 굽이진 회랑과 작은 마당을 원한다면 유원이 더 맞으며, 망사원은 작고 아기자기합니다. 중원이 정원의 핵심이니 그곳에 시간을 가장 많이 쓰세요. 이름난 만큼 사람도 많습니다. 2023년 7월에는 하루 평균 2만 명 넘게 다녀갔으니, 잡을 수 있는 가장 이른 입장 시간대를 예약하세요.",
      ],
      highlights: [
        {
          name: "물 건너 탑 바라보기",
          body: "큰 연못 동쪽 끝 의홍정(倚虹亭) 옆에서 서쪽을 바라보면, 돌다리와 나무 너머로 북사탑이 보입니다. 정원 밖 1km쯤 떨어져 있지만, 물결이 잔잔한 날에는 탑이 연못에 비쳐 정원의 일부처럼 보입니다. 정원과 탑 사이의 건물은 탑보다 높게 지을 수 없어, 이 풍경이 지금도 가려지지 않고 그대로 남아 있습니다.",
        },
        {
          name: "원향당",
          body: "중원의 중심 건물로, 사방이 바닥까지 내려오는 긴 창이라 안에 앉으면 물과 돌, 정자가 빙 둘러 보입니다. 여름에는 앞 연못에 연꽃이 가득한데, 이름도 연꽃에서 왔습니다. 송나라 주돈이의 「애련설」 중 ‘향기는 멀리 갈수록 더 맑다(香遠益淸)’는 구절입니다.",
        },
        {
          name: "부채꼴 정자 여수동좌헌",
          body: "서원의 물가에 있는 작은 정자로, 문과 창, 탁자와 걸상까지 부채꼴이며, 주인이 부채로 일어선 집안의 가업을 기리려고 지었다고 전합니다. 이름은 ‘누구와 함께 앉을까(與誰同坐)’로, 소동파의 노랫말에서 왔습니다. 그의 대답은 ‘밝은 달, 맑은 바람, 그리고 나’입니다.",
        },
      ],
      time: "동원, 중원, 서원을 여유 있게 둘러보면 2시간에서 2시간 30분 걸립니다.",
      when: "잡을 수 있는 가장 이른 입장 시간대를 고르세요. 사람이 몰리기 전의 물가가 가장 고요합니다. 봄에는 4~5월 무렵 철쭉이 피고, 여름에는 6월부터 연꽃이 피기 시작해 한여름에 가장 무성합니다. 노동절과 국경절 연휴 무렵에는 입장권이 매진될 수 있습니다.",
      pair: "바로 옆 쑤저우박물관은 건축가 I. M. 페이(貝聿銘)의 작품이며 따로 예약해야 합니다. 박물관에 속한 옛 저택 충왕부의 마당에는 문징명이 직접 심었다고 전하는 등나무가 있어, 4월 초 꽃이 피면 보랏빛이 담장 위로 넘쳐흘러 길에서도 보입니다. 바위 미로로 유명한 사자림은 걸어서 500m쯤, 운하를 따라 옛집이 늘어선 핑장루는 북쪽 입구까지 걸어서 10분쯤입니다.",
      skip: "인파 때문에 정원을 제대로 즐기기 어렵다면, 한적한 아침에 망사원이나 우원 같은 작은 정원을 고르세요. 정원을 하나만 볼 시간이 있고 물가 풍경을 좋아한다면 졸정원을 남겨 두세요. 정원 자체에 관심이 없다면 그 오전은 쑤저우의 운하와 핑장루에 쓰세요.",
      faq: [
        {
          question: "쑤저우 졸정원은 가 볼 만한가요?",
          answer: "네, 특히 쑤저우 정원을 하나만 볼 시간이 있다면 가 볼 만합니다. 약 5ha로 쑤저우 고전 정원 가운데 가장 크고, 큰 연못을 중심으로 버드나무와 돌다리, 정자가 이어지며, 담장 밖의 탑까지 정원 풍경의 일부처럼 보입니다. 2시간에서 2시간 30분을 잡고 이른 시간대를 예약하세요.",
        },
        {
          question: "졸정원 관람에는 시간이 얼마나 걸리나요?",
          answer: "동원, 중원, 서원을 여유 있게 둘러보면 2시간에서 2시간 30분 걸립니다. 앉아서 천천히 바라보는 것을 좋아한다면 더 잡으세요. 이 정원은 원래 그렇게 보라고 만든 곳입니다. 바로 옆 쑤저우박물관은 따로 예약해야 하니 시간도 따로 잡으세요.",
        },
        {
          question: "졸정원과 유원 중 어디가 좋을까요?",
          answer: "탁 트인 물과 먼 풍경을 원한다면 졸정원입니다. 약 5ha로 쑤저우에서 가장 큰 고전 정원입니다. 굽이진 회랑과 작은 마당, 창마다 담긴 풍경을 원한다면 유원입니다. 인파가 싫다면 작고 아기자기한 망사원도 좋습니다. 하루를 다 쓸 수 있다면 분위기가 다른 두 곳을 보세요.",
        },
        {
          question: "졸정원은 언제 가는 게 가장 좋나요?",
          answer: "이른 입장 시간대, 되도록 봄이나 여름의 평일이 좋습니다. 4~5월 무렵 철쭉이 피고, 6월부터 연꽃이 피기 시작해 한여름에 가장 무성합니다. 사람은 많습니다. 2023년 7월에는 하루 평균 2만 명 넘게 다녀갔고, 노동절과 국경절 연휴 무렵에는 입장권이 매진될 수 있습니다.",
        },
        {
          question: "졸정원은 미리 예약해야 하나요?",
          answer: "네. 입장권은 실명제이고 날짜와 입장 시간대가 정해지며, 쑤저우 정원 공식 서비스에서 방문 1~7일 전에 예약할 수 있습니다. 연휴 날짜는 금방 매진될 수 있습니다. 여권으로 예약하는 절차가 늘 순조롭지는 않으니, 저희가 날짜에 맞춰 규정을 확인하고 대신 예약해 드릴 수 있습니다.",
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
        "For a first visit, walk the Su Causeway and take a boat to the island. Beyond them, each shore has its own mood. The north shore, the busiest, has the Bai Causeway and the Broken Bridge, where the lovers of the Lady White Snake legend meet in the rain. The east shore is where the city meets the lake, lined with hotels and shops. For quiet, head west to the foot of the hills. Cars run along the Yanggong Causeway there, but step off it into the backwaters and woods of Maojiabu and the crowds fall away.",
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
      faq: [
        {
          question: "Is West Lake worth visiting?",
          answer: "Yes, especially early in the morning, when mist hangs over the Su Causeway and willows trail in still water. Walk the causeway, almost 3 kilometres across the lake, then take a boat to the island, and you have one of the most peaceful half-days you can spend in China. The hills are low and the scenery gentle, and that calm is the point.",
        },
        {
          question: "Is West Lake free to visit?",
          answer: "Yes. The whole shore, about 15 kilometres round, the causeways and the lakeside parks are open day and night, with no ticket and no gate. You pay only for a few things on and around the lake, such as the boats, the trip to the island of Three Pools Mirroring the Moon and Leifeng Pagoda.",
        },
        {
          question: "How long does it take to walk around West Lake?",
          answer: "About four hours of steady walking for the full 15-kilometre loop, and most of a day with stops. Most visitors walk only part of it, and the Su Causeway, almost 3 kilometres from shore to shore, is the stretch not to miss. To see more without tiring, mix walking with a boat.",
        },
        {
          question: "What is the best time to visit West Lake?",
          answer: "Early morning, before eight, when the causeways are still quiet. From late March to mid-April the Su Causeway has peach blossom and fresh willows, and lotus covers parts of the lake from roughly late June to August. Avoid the May Day holiday and the first week of October, when the whole shore fills.",
        },
        {
          question: "Should I take a boat on West Lake?",
          answer: "Yes, at least once: a boat is the most relaxing way to see the lake and the only way to reach the island of Three Pools Mirroring the Moon. You can stay on the island as long as you like, and a boat brings you back. For a quieter ride, take a small boat rowed by a boatman, which seats up to six. Queues build on holidays, and we can book a boat for your date.",
        },
      ],
    },
    zh: {
      description: "杭州西湖：清晨苏堤上的薄雾和垂柳，不要门票，绕湖一圈就是一整座公园。别错过的三处，以及怎样和灵隐寺排在同一天。",
      why: [
        "清晨六七点，苏堤上的薄雾还没散，柳枝垂到水面，远处的山一层比一层淡，像一幅还没干透的水墨画。苏东坡写西湖“淡妆浓抹总相宜”，说的就是这副样子。",
        "西湖不要门票，环湖一圈约 15 公里，日夜开放，没有大门。这片湖是一千多年里一代代人修出来的：苏东坡把湖底挖出的泥堆成了今天的苏堤，乾隆喜欢得不得了，还在北京颐和园照着修了一道。",
        "第一次来，走苏堤、坐船上岛，就是最好的开头。湖的四周，每一边都有自己的味道。北边是白堤和断桥，《白蛇传》里白娘子和许仙就在断桥边雨中相遇，这一带游人最多；东边挨着城区，酒店、商店都在这一侧；想清静，就往西走到山脚下。那里的杨公堤上跑着汽车，拐进旁边茅家埠一带的水湾和树林，人就少多了。",
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
      faq: [
        {
          question: "杭州西湖值得去吗？",
          answer: "值得，尤其是清晨去：苏堤上薄雾未散，柳枝垂到平静的水面上。沿着近 3 公里的长堤横穿湖面，再坐船上岛，这半天会过得格外舒坦。这里山不高，景色也秀气，图的就是这份安静。",
        },
        {
          question: "西湖要门票吗？",
          answer: "不要。环湖一圈约 15 公里，湖岸、长堤和沿湖的公园都日夜开放，没有门票，也没有大门。只有少数几样另外收费，比如游船、坐船上三潭印月的小岛，还有雷峰塔。",
        },
        {
          question: "西湖走一圈要多久？",
          answer: "环湖 15 公里，不停地走大约四个小时，边走边玩就要大半天。多数人只走其中一段，从南岸通到北岸、近 3 公里的苏堤是最不该错过的。想多看又不想太累，就走一段、坐一段船。",
        },
        {
          question: "什么时候去西湖最好？",
          answer: "清晨八点前最好，几条长堤上还很安静。三月下旬到四月中旬，苏堤上桃花开、新柳绿；大约六月下旬到八月，湖里一片片都是荷花。避开五一和国庆黄金周，那几天整个湖边都挤满了人。",
        },
        {
          question: "游西湖要坐船吗？",
          answer: "值得坐一次。坐船看西湖最省力，也只有坐船才能上三潭印月的小岛；上了岛，想待多久都行，玩够了再坐船回来。想更安静，就坐船夫划的手划船，一条最多坐六人。节假日排队很长，我们可以按你的日期代订游船。",
        },
      ],
    },
    ko: {
      description: "항저우 서호: 이른 아침 소제 위의 물안개와 버드나무, 입장료도 문도 없이 호수 전체가 공원입니다. 꼭 볼 세 곳과 영은사와 함께 도는 하루까지.",
      why: [
        "아침 6~7시, 소제 위로 물안개가 아직 걷히지 않았고, 버드나무 가지가 수면까지 늘어지며, 먼 산은 겹겹이 옅어져 마르지 않은 수묵화 같습니다. 소동파가 서호를 ‘옅은 화장도 짙은 화장도 다 어울린다’고 읊은 게 바로 이런 모습입니다.",
        "서호에는 입장료도 문도 없습니다. 둘레 약 15km의 호숫가 전체가 밤낮으로 열려 있는 공원입니다. 이 호수는 천 년 넘게 사람들이 가꿔 온 풍경입니다. 동파육으로도 이름이 익숙한 소동파가 호수 바닥의 진흙을 퍼 올려 지금의 소제를 쌓았고, 건륭제는 이 풍경을 너무 좋아한 나머지 베이징 이화원에도 이를 본뜬 둑길을 만들었습니다.",
        "처음이라면 소제를 걷고 배로 섬에 들르는 것이 가장 좋은 시작입니다. 그 밖의 호숫가는 방향마다 분위기가 다릅니다. 북쪽에는 백제(白堤)라는 둑길과 단교가 있습니다. 단교는 백사전(백낭자와 허선의 사랑 이야기)에서 두 사람이 빗속에 만나는 다리이고, 이 일대가 호숫가에서 가장 붐빕니다. 동쪽은 호텔과 상점이 늘어선 도시 쪽입니다. 조용한 곳을 원한다면 산자락이 닿는 서쪽으로 가세요. 그쪽 양공제는 차가 다니는 길이지만, 마오자부(茅家埠) 일대의 물굽이와 숲으로 들어서면 사람이 훨씬 적습니다.",
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
          body: "중국 4대 민간 전설 가운데 하나인 백사전에서 스님이 백낭자를 가둔 탑입니다. 꼭대기에 오르면 서호 전체가 내려다보이고, 해 질 녘 북쪽 호숫가에서 바라보면 노을에 물든 탑이 서호십경의 하나인 ‘뇌봉석조’입니다.",
        },
      ],
      time: "반나절이면 배로 섬에 들르고, 소제를 걷고, 탑 하나에 오를 수 있습니다. 서쪽의 영은사까지 더하면 하루 일정입니다.",
      when: "아침 8시 전, 소제가 아직 한산할 때가 좋습니다. 버드나무 잎이 돋고 소제에 복숭아꽃이 피는 봄, 연꽃이 피는 여름(대략 6월 하순~8월)이 대표적인 계절입니다. 5월 초 노동절 연휴와 10월 첫 주 국경절 연휴는 피하세요. 호숫가 전체가 사람으로 가득합니다.",
      pair: "영은사와 불상이 새겨진 비래봉은 서쪽으로 차로 30분 정도입니다. 용정차 마을은 영은사 남쪽 산속, 호수로 돌아오는 길목에 있어 잠깐 들르기 좋습니다.",
      skip: "웅장한 풍경을 기대한다면 굳이 가지 않아도 됩니다. 산은 나지막하고, 하늘이 뿌연 날에는 그마저 아예 보이지 않습니다. 한두 시간밖에 없다면 호숫가를 걷기보다 배를 타고 섬에 들르세요.",
      faq: [
        {
          question: "항저우 서호는 가 볼 만한가요?",
          answer: "네, 특히 이른 아침에 가 볼 만합니다. 소제 위로 아직 물안개가 깔려 있고, 버드나무 가지가 잔잔한 수면까지 늘어집니다. 3km 가까운 둑길을 걸어 호수를 가로지르고 배로 섬에 들르는 반나절은 중국 여행에서 손꼽을 만큼 평온합니다. 산은 나지막하고 풍경도 소박하지만, 바로 그 고요함이 서호의 매력입니다.",
        },
        {
          question: "서호는 입장료가 있나요?",
          answer: "없습니다. 둘레 약 15km의 호숫가와 둑길, 호반 공원이 밤낮으로 열려 있고, 입장권도 문도 없습니다. 유람선, 삼담인월 섬에 들어가는 배, 뇌봉탑처럼 몇 가지만 따로 요금을 받습니다.",
        },
        {
          question: "서호를 한 바퀴 걸으면 얼마나 걸리나요?",
          answer: "15km를 쉬지 않고 걸으면 4시간쯤, 구경하며 걸으면 거의 하루가 걸립니다. 대부분의 여행자는 일부 구간만 걷는데, 남쪽 호숫가에서 북쪽 호숫가까지 3km 가까이 이어지는 소제가 놓치면 안 될 구간입니다. 덜 지치면서 더 보고 싶다면 걷기와 배를 섞으세요.",
        },
        {
          question: "서호는 언제 가는 게 가장 좋나요?",
          answer: "둑길이 아직 한산한 아침 8시 전이 가장 좋습니다. 3월 하순부터 4월 중순까지는 소제에 복숭아꽃이 피고 버드나무 잎이 돋으며, 대략 6월 하순부터 8월까지는 호수 곳곳에 연꽃이 핍니다. 5월 초 노동절 연휴와 10월 첫 주 국경절 연휴는 피하세요. 호숫가 전체가 사람으로 가득합니다.",
        },
        {
          question: "서호에서 배를 꼭 타 봐야 하나요?",
          answer: "한 번은 타 볼 만합니다. 배를 타면 가장 편하게 호수를 둘러볼 수 있고, 삼담인월 섬에는 배로만 갈 수 있습니다. 섬에서는 원하는 만큼 머물다가 배로 돌아오면 됩니다. 더 조용히 즐기고 싶다면 뱃사공이 노를 젓는 6인승 작은 배를 타세요. 연휴에는 줄이 길어지니, 저희가 날짜에 맞춰 배를 예약해 드릴 수 있습니다.",
        },
      ],
    },
  },
  lingyin: {
    en: {
      description: "Hundreds of Buddhas carved into Hangzhou's Feilai Peak beside a shaded stream, then incense smoke at Lingyin Temple. Plan it with West Lake.",
      why: [
        "Inside the gate, the path follows a clear stream under a cliff of grey, pitted rock, and the rock is full of Buddhas. Some sit in little hollows, some are the size of a person, and one fat, laughing Buddha grins at you across the water. Cool air breathes out of the caves, even in summer. Further on, past the yellow walls, incense smoke drifts over the temple courtyards. In the main hall sits a gilded Buddha nearly 25 metres tall, throne included.",
        "The peak's name is a question. About 1,700 years ago, an Indian monk called Huili looked at it and declared it a small hill from Vulture Peak in India, where the Buddha taught. When, he asked, did it fly here? So it became Feilai Feng, the Peak That Flew Here, and he founded the temple facing it. Unlike the hills around it, the peak is limestone, worn into odd shapes and caves. Over four centuries, starting about a thousand years ago, carvers cut hundreds of Buddhas into it. The Ming painter Dong Qichang put the question again in two lines for the pavilion by the spring: since when has the spring been cold, and from where did the peak fly?",
        "Lingyin is a working temple, so its halls are for worship first, and you share them with monks and people bowing with incense. Give the peak as much time as the halls, because the carvings are the heart of the visit. Fans of Chinese folk tales can look for Jigong, the scruffy ‘mad monk’ who loved wine and meat. He became a monk here, and a hall beside the Medicine Buddha Hall tells his life in eighteen murals. For a quieter hour or two, walk about a kilometre uphill beyond the temple, on stone steps through the woods, to the small hillside temples of Yongfu and Taoguang.",
      ],
      highlights: [
        {
          name: "The laughing Buddha by the stream",
          body: "He sits in the rock beside the stream, facing the path to the temple, leaning back with his belly bare and one hand on a big cloth sack. He laughs so hard his eyes have become two crescent moons, and eighteen of the Buddha's disciples crowd round him. Carved about eight hundred years ago, this is the largest group on the peak, and almost everyone stops here for a photo.",
        },
        {
          name: "A thread of sky in Longhong Cave",
          body: "Step into Longhong Cave and daylight falls through an opening in the roof like the mouth of a well. Climb the steps nearby to a smaller chamber, look up, and on a bright day a tiny round hole in the rock lets in a single thread of sky. The seven-storey stone pagoda at the cave mouth honours Huili, the monk who named the peak.",
        },
        {
          name: "Behind the great Buddha",
          body: "In the main hall, walk round behind the gilded Buddha. The whole back wall is a mountain of some 150 clay figures, more than 20 metres high, telling of a boy's journey to 53 teachers in search of wisdom. Guanyin, the goddess of mercy, rides a great sea creature at the bottom centre, with the boy himself beside her, palms together, in a little red bib.",
        },
      ],
      time: "Two to three hours for Feilai Peak and the temple's main halls. Allow half a day if you walk on uphill to Yongfu and Taoguang.",
      when: "Go on a weekday if you can, because weekends draw far more visitors. If West Lake is on the same day, take the morning slot. In summer the shaded stream path and the cool caves make this one of the easier places in Hangzhou on a hot day. Avoid the Spring Festival, the May Day holiday and the first week of October.",
      pair: "West Lake is about half an hour east by car. Come back through the Longjing tea villages in the hills south of the temple, and stop for a cup of the green tea grown on those slopes. Lingyin in the morning, tea at midday and a boat on the lake in the afternoon make a classic Hangzhou day.",
      skip: "With only a few hours in Hangzhou, give them to West Lake. If big temples leave you cold, skip the halls and spend your time on the Feilai Peak path. Entry needs a reservation, so if your date is full, spend the morning in the Longjing tea villages instead.",
      faq: [
        {
          question: "Is Lingyin Temple worth visiting?",
          answer: "Yes, above all for Feilai Peak opposite the temple, where hundreds of Buddhas were carved into the limestone, mostly between the 10th and 14th centuries. Lingyin itself is one of China's best-known Buddhist temples, founded about 1,700 years ago and still busy with worshippers. Two to three hours covers the peak and the main halls.",
        },
        {
          question: "Do I need to book Lingyin Temple, and is it free?",
          answer: "Yes, you need to book, and entry is currently free. Every visitor needs a booking in their own name for a morning or afternoon slot, made at least a day ahead, and a passport is accepted. One booking covers Feilai Peak, Lingyin Temple and the hillside temples of Yongfu and Taoguang. The rules change from time to time, and we can check them for your date and book for you.",
        },
        {
          question: "How long do you need at Lingyin Temple and Feilai Peak?",
          answer: "Plan on two to three hours: about an hour on the Feilai Peak path and in its caves, and the rest in the temple's main halls. Add an hour or two if you climb the stone steps to the Yongfu and Taoguang temples on the slope above. If West Lake is on the same day, keep Lingyin to the morning.",
        },
        {
          question: "What is the best time to visit Lingyin Temple?",
          answer: "A weekday, ideally in spring or autumn. From mid-May to mid-June 2026, about 26,000 people booked a visit on an average weekday and about 45,000 at weekends, so weekdays are noticeably calmer. In summer the shaded path and cool caves make it a good hot-day choice. Avoid the Spring Festival, the May Day holiday and the first week of October.",
        },
        {
          question: "Can you visit Lingyin Temple and West Lake in one day?",
          answer: "Yes, and it makes one of the best days in Hangzhou. Lingyin is about half an hour west of the lake by car. See the temple and Feilai Peak in the morning, stop in the Longjing tea villages on the way back, and spend the afternoon on the lake. Book Lingyin's morning slot ahead.",
        },
      ],
    },
    zh: {
      description: "杭州灵隐寺对面的飞来峰，溪边石壁上刻着几百尊佛像；再往里走，寺里香烟袅袅。上午来这里，下午去西湖。",
      why: [
        "进了大门，小路沿着一条清亮的溪水走，一边是灰白色、满是孔洞的石壁，上面到处是佛像：有的坐在凿出来的小洞里，有的跟真人一般大，还有一尊大肚弥勒隔着溪水冲你哈哈大笑。山洞里吹出来的风，大夏天也是凉的。再往前，穿过黄墙进了寺，香烟在院子里飘着，大雄宝殿里坐着一尊贴金的大佛，连莲花座将近 25 米高。",
        "这座山的名字，本身就是一句问话。大约一千七百年前，印度僧人慧理来到这里，说这本是佛陀说法的天竺灵鹫山上的一座小岭，还问：“不知何代飞来？”山从此叫作飞来峰，他在峰前建起了灵隐寺。和周围的山不同，飞来峰是石灰岩，石头奇形怪状，山洞一个连着一个，正所谓“无石不奇，无树不古，无洞不幽”。大约从一千年前起，前后四百来年，工匠们在山石上刻下了几百尊佛像。明代书画家董其昌给溪边的冷泉亭写过一副对联，把这个问题又问了一遍：“泉自几时冷起，峰从何处飞来。”",
        "灵隐寺至今香火旺盛，殿堂首先是拜佛的地方，你会和僧人、举香礼拜的信众走在一起。给飞来峰留的时间，要和寺里一样多，那些石刻才是这一趟的重头戏。济公就是在灵隐寺出家的，药师殿右侧有一座济公殿，四面墙上十八幅壁画，画的就是他的一生。想走得清静些，就过了灵隐寺继续往山上走，沿着林间的石阶走一公里左右，到山腰上的永福寺和韬光寺。",
      ],
      highlights: [
        {
          name: "溪边的大肚弥勒",
          body: "他刻在溪边的石壁上，正对着去灵隐寺的路。他斜靠着山岩，袒胸露腹，右手搭在一只大布袋上，笑得眼睛弯成了两道月牙，身边围着十八罗汉。这组石像刻于约八百年前的南宋，是飞来峰上最大的一组，几乎人人都要在这里停下来拍张照。",
        },
        {
          name: "龙泓洞里的一线天",
          body: "走进龙泓洞，洞顶有个像井口一样的开口，天光从上面漏下来。旁边有石阶通到一间小石室，天气晴朗时抬头看，岩顶一个小圆孔会透进一线天光，这就是大家要找的“一线天”。洞口那座七层的石塔叫理公塔，纪念的就是给飞来峰起名的慧理。",
        },
        {
          name: "大佛背后",
          body: "进了大雄宝殿，别只看前面的大佛，绕到佛像背后看看。整面后墙是一座二十多米高的泥塑，大大小小约 150 尊像，讲的是善财童子一路拜访五十三位老师、求取智慧的故事。最下层正中是脚踩鳌鱼的观音，她身旁那个双手合十、穿红肚兜的小孩，就是善财。",
        },
      ],
      time: "飞来峰加上寺里几座主要的殿，两到三个小时。再往山上走到永福寺、韬光寺，就要留半天。",
      when: "能挑平日就挑平日，周末来的人要多得多。同一天还要去西湖的话，就约上午场。夏天飞来峰下的溪边小路有树荫，山洞里凉快，是杭州大热天里比较舒服的去处。春节、五一和国庆长假，能避开就避开。",
      pair: "西湖在东边，开车约半小时。回程可以走灵隐寺南边山里的小路，穿过龙井村回到湖边，在村里停下来，喝一杯就长在这片山坡上的龙井茶。上午灵隐寺，中午龙井村喝茶，下午西湖坐船，就是杭州最经典的一天。",
      skip: "在杭州只有几个小时的话，先留给西湖。对大寺院没什么兴趣的，可以不进殿，把时间都花在飞来峰那条路上。没有预约进不去；要是你那天已经约满，就把上午留给龙井村。",
      faq: [
        {
          question: "杭州灵隐寺值得去吗？",
          answer: "值得，最值得看的是寺对面的飞来峰：石灰岩上刻了几百尊佛像，大多是五代到元朝、也就是 10 到 14 世纪留下的。灵隐寺本身是国内最有名的佛寺之一，建寺已有约一千七百年，至今香火旺盛。飞来峰加主要殿堂，两到三个小时就够。",
        },
        {
          question: "灵隐寺要预约吗？要门票吗？",
          answer: "要预约，目前不收门票。每位游客都要用本人证件实名预约上午场或下午场，至少提前一天，护照也可以用。一次预约就包括飞来峰、灵隐寺，以及山上的永福寺和韬光寺。规则时常调整，我们可以按你的日期核实并代为预约。",
        },
        {
          question: "逛灵隐寺和飞来峰要多长时间？",
          answer: "两到三个小时：飞来峰的小路和山洞大约一个小时，其余时间留给寺里的几座主殿。要是再沿石阶爬到山上的永福寺、韬光寺，就多留一两个小时。同一天还要去西湖的话，灵隐寺就安排在上午。",
        },
        {
          question: "什么时候去灵隐寺最好？",
          answer: "平日最好，春秋两季最舒服。2026 年 5 月中到 6 月中，平日每天约有 2.6 万人预约，周末约 4.5 万人，平日明显清静。夏天溪边有树荫，山洞里凉快，大热天来也不错。尽量避开春节、五一和国庆黄金周。",
        },
        {
          question: "灵隐寺和西湖能安排在一天吗？",
          answer: "能，这是杭州最好的一种走法。灵隐寺在西湖西边，开车约半小时：上午看灵隐寺和飞来峰，回程在龙井村停一停，下午留给西湖。记得提前约好灵隐寺的上午场。",
        },
      ],
    },
    ko: {
      description: "항저우 영은사 맞은편 비래봉, 개울가 바위에 불상 수백 구가 새겨져 있고 절에는 향 연기가 피어오릅니다. 오전에 보고 오후에는 서호로.",
      why: [
        "입구를 지나면 맑은 개울을 따라 길이 이어지고, 한쪽에는 구멍이 숭숭 뚫린 잿빛 바위 절벽이 서 있습니다. 그 바위 곳곳에 불상이 있습니다. 작은 홈 안에 앉은 것도 있고 사람만 한 것도 있으며, 뚱뚱한 불상 하나는 개울 건너에서 이쪽을 보며 껄껄 웃습니다. 동굴에서는 한여름에도 서늘한 바람이 흘러나옵니다. 조금 더 가서 노란 담장을 지나면 절 마당에 향 연기가 떠돌고, 대웅보전에는 연꽃 받침까지 높이 25m 가까운 금빛 불상이 앉아 있습니다.",
        "이 봉우리의 이름은 그 자체가 질문입니다. 약 1,700년 전, 인도에서 온 승려 혜리가 이 봉우리를 보고 석가모니가 설법하던 인도 영축산의 작은 봉우리라며 ‘언제 날아왔는가’ 하고 물었습니다. 그래서 ‘날아온 봉우리’ 비래봉이 되었고, 그는 그 앞에 영은사를 세웠습니다. 비래봉의 다른 이름인 영축봉(靈鷲峰)도 양산 통도사의 영축산처럼 그 인도의 산에서 온 이름입니다. 주변 산과 달리 석회암이라 바위가 기묘하고 동굴이 많으며, 약 천 년 전부터 400년에 걸쳐 사람들이 이 바위에 불상 수백 구를 새겼습니다. 명나라 서화가 동기창(董其昌)은 개울가 냉천정에 두 줄의 글귀를 지어 그 질문을 다시 던졌습니다. ‘샘은 언제부터 차가워졌고, 봉우리는 어디서 날아왔는가.’",
        "영은사는 지금도 예불이 이어지는 절이라, 전각은 무엇보다 기도하는 곳입니다. 스님들, 향을 들고 절하는 사람들과 함께 둘러보게 됩니다. 비래봉에는 전각만큼 시간을 들이세요. 이 바위의 불상들이야말로 이곳에서 가장 볼 만한 것입니다. 술과 고기를 즐긴 괴짜 스님으로 중국 민간 이야기에 자주 나오는 제공(濟公)도 이 절에서 출가했고, 약사전 오른편의 제공전에는 그의 일생을 그린 벽화 18폭이 있습니다. 조금 더 조용히 걷고 싶다면 절을 지나 숲속 돌계단을 따라 1km쯤 올라가, 산 중턱의 작은 절인 영복사와 도광사까지 가 보세요.",
      ],
      highlights: [
        {
          name: "개울가의 포대화상",
          body: "개울 옆 바위벽에 영은사로 가는 길을 마주 보고 새겨져 있습니다. 배를 드러낸 채 바위에 비스듬히 기대어 오른손을 커다란 자루에 얹었고, 얼마나 크게 웃는지 눈이 초승달처럼 휘었습니다. 둘레에는 18나한이 모여 있습니다. 약 800년 전 남송 때 새긴 것으로 비래봉에서 가장 큰 조각 무리이며, 거의 모두가 여기서 걸음을 멈추고 사진을 찍습니다.",
        },
        {
          name: "용홍동의 한 줄기 하늘",
          body: "용홍동에 들어서면 천장에 우물 입구처럼 뚫린 구멍으로 햇빛이 떨어집니다. 근처 돌계단을 올라 작은 석실에서 위를 보면, 맑은 날에는 바위의 작은 둥근 구멍으로 하늘빛이 한 줄기 새어 듭니다. 중국 사람들이 ‘일선천(一線天)’이라 부르며 찾는 곳입니다. 동굴 입구의 7층 돌탑은 이 봉우리에 이름을 붙인 혜리를 기리는 이공탑입니다.",
        },
        {
          name: "대불 뒤편",
          body: "대웅보전에 들어가면 금빛 대불 뒤로 돌아가 보세요. 뒷벽 전체가 높이 20m가 넘는 흙으로 빚은 산 같은 조각으로, 크고 작은 인물 약 150구가 한 소년이 지혜를 구해 스승 53명을 찾아가는 이야기를 펼칩니다. 맨 아래 단 한가운데에는 커다란 바다 짐승을 밟고 선 관음보살이 있고, 그 곁에 빨간 배두렁이를 두르고 두 손을 모은 소년이 바로 그 주인공 선재동자입니다.",
        },
      ],
      time: "비래봉과 절의 주요 전각까지 2~3시간입니다. 위쪽의 영복사와 도광사까지 걸어 올라가면 반나절을 잡으세요.",
      when: "가능하면 평일에 가세요. 주말에는 사람이 훨씬 많습니다. 같은 날 서호도 간다면 오전 시간대를 예약하세요. 여름에는 그늘진 개울길과 서늘한 동굴 덕분에 항저우에서 더위를 피하기 좋은 곳입니다. 춘절과 5월 초 노동절, 10월 첫 주 국경절 연휴는 피하세요.",
      pair: "서호는 동쪽으로 차로 30분쯤입니다. 돌아올 때는 영은사 남쪽 산속 뒷길로 용정차 마을을 지나 호수로 나오세요. 오전에 영은사, 한낮에는 마을 비탈에서 자란 용정차 한 잔, 오후에는 서호 유람선이면 항저우의 대표적인 하루가 됩니다.",
      skip: "항저우에 몇 시간밖에 없다면 서호에 쓰세요. 큰 절에 별 관심이 없다면 전각은 건너뛰고 비래봉 길만 천천히 걸어도 됩니다. 예약 없이는 들어갈 수 없으니, 원하는 날짜가 다 찼다면 그 오전은 용정차 마을에서 보내세요.",
      faq: [
        {
          question: "항저우 영은사는 가 볼 만한가요?",
          answer: "네, 무엇보다 절 맞은편의 비래봉 때문에 가 볼 만합니다. 석회암 바위에 불상 수백 구가 새겨져 있고, 대부분 10~14세기의 것입니다. 영은사 자체도 중국에서 가장 이름난 불교 사찰 가운데 하나로, 약 1,700년 전에 세워져 지금도 참배객이 끊이지 않습니다. 비래봉과 주요 전각은 2~3시간이면 충분합니다.",
        },
        {
          question: "영은사는 예약해야 하나요? 입장료가 있나요?",
          answer: "예약은 필요하고, 입장료는 현재 무료입니다. 방문자마다 본인 명의로 오전 또는 오후 시간대를 예약해야 하고, 예약은 적어도 하루 전까지 해야 합니다. 여권으로도 예약할 수 있습니다. 예약 한 번으로 비래봉, 영은사, 그리고 산 위의 영복사와 도광사까지 들어갈 수 있습니다. 규정이 종종 바뀌므로, 저희가 날짜에 맞춰 확인하고 대신 예약해 드릴 수 있습니다.",
        },
        {
          question: "영은사와 비래봉을 보려면 시간이 얼마나 걸리나요?",
          answer: "2~3시간을 잡으세요. 비래봉 산책로와 동굴에 1시간쯤, 나머지는 절의 주요 전각에 씁니다. 돌계단을 올라 위쪽의 영복사와 도광사까지 가려면 1~2시간을 더하세요. 같은 날 서호도 간다면 영은사는 오전에 두세요.",
        },
        {
          question: "영은사는 언제 가는 게 가장 좋나요?",
          answer: "평일, 계절로는 봄과 가을이 가장 좋습니다. 2026년 5월 중순부터 6월 중순까지 평일에는 하루 평균 약 2만 6천 명, 주말에는 약 4만 5천 명이 예약했으니 평일이 확실히 한산합니다. 여름에는 그늘진 길과 서늘한 동굴 덕분에 더운 날 가기에도 좋습니다. 춘절과 5월 초 노동절, 10월 첫 주 국경절 연휴는 피하세요.",
        },
        {
          question: "영은사와 서호를 하루에 볼 수 있나요?",
          answer: "네, 항저우에서 가장 알찬 하루 코스 가운데 하나입니다. 영은사는 서호에서 서쪽으로 차로 30분쯤이니, 오전에 영은사와 비래봉을 보고 돌아오는 길에 용정차 마을에 들른 뒤 오후는 서호에서 보내세요. 영은사 오전 시간대는 미리 예약해 두세요.",
        },
      ],
    },
  },
  liangzhu: {
    en: {
      description: "Near Hangzhou, a 5,000-year-old water city survives as grassy banks in the rice fields. See the museum first, then climb its palace mound.",
      why: [
        "Cross the park past rice fields and ponds, and now and then an egret lifts out of the trees. Climb onto the great raised platform at its heart, and the wind blows in over open country. Long, low grassy banks run across the fields below. Those banks are the walls of a city built about five thousand years ago. The ground under your feet, some 670 metres long, was heaped up by hand, partly over a natural hill, to raise the palaces more than ten metres above the plain. The whole city is still here, drawn in earth and grass, and you are standing at its centre.",
        "Chinese people often speak of five thousand years of civilisation, and at Liangzhu you can stand in a city that old. It was a water city. Eight of its nine gates were for boats, and people got about by dugout canoe and bamboo raft, so picture the fields around you laced with waterways. The walled inner city alone is about four times the size of Beijing's Forbidden City. Floods poured off the hills, so the builders dammed the valleys to the north-west. Their dams are among the oldest known anywhere, built from mud wrapped in reeds and grass and stacked crosswise like sandbags.",
        "Split the day in two, and start at the museum. Its long, pale stone buildings sit on a lake, with quiet courtyards between the galleries. Inside are the jades, the pottery and a huge model of the city. Once you have seen them, the park's open fields start to read as palaces, riverside houses and landing stages. Without the museum, the park can feel like a pleasant meadow. Photographers and repeat visitors can reverse the order and catch the morning light in the park.",
      ],
      highlights: [
        {
          name: "On top of the palace platform",
          body: "Climb Da Mojiaoshan, the highest of the three mounds that held the palaces, and turn slowly. From up here you can trace the city in rings: the palace area at the centre, the walls around it, and beyond them the raised ground where villagers lived.",
        },
        {
          name: "The wall cut open",
          body: "Walk to the south wall through fountain grass, and the wall comes and goes between the stems. Here a stretch has been cut open, the only place in the park where you can see inside a real five-thousand-year-old wall. Its base is stone laid in strips, each about what a few boats or rafts could carry, and each a little different, because the stone came from different hills.",
        },
        {
          name: "The little god in the jade",
          body: "In the museum's jade gallery, lean in close to the square jade tubes, round on the inside, that the Chinese call cong. Many carry the same tiny figure: someone in a feathered headdress above a beast with huge round eyes and bared fangs. Archaeologists see it as the god the people of Liangzhu shared, and it was carved five thousand years ago, without metal tools.",
        },
      ],
      time: "A full day: the museum in the morning, lunch and the drive across, then the ruins park in the afternoon. With half a day, see the museum and one part of the park; the museum alone takes about two hours.",
      when: "Spring and autumn. From March to April, rapeseed flowers turn stretches of the old city gold and cherry trees bloom by the west water gate; in autumn the rice ripens. The park is open ground with little shade, so summer afternoons are hard going, and heavy rain or typhoon warnings can close it at short notice. Check the latest notice the day before.",
      pair: "Liangzhu lies about 25 kilometres north-west of central Hangzhou, so give it a day of its own. If the water story grips you, go to Laohuling, in the hills north-west of the old city. There you can stand by the cut face of a dam about 15 metres high and see the bundles of grass-wrapped mud stacked inside it. The Yaoshan altar, laid out in three colours of earth, is about 5 kilometres north-east of the city. Check that each is open before you go. The most celebrated Liangzhu jade, the King of Cong from the Fanshan royal tombs, is kept in Hangzhou at the Zhejiang Provincial Museum's Zhijiang branch, not at Liangzhu.",
      skip: "If you need standing ruins to feel the past, this is not it: Liangzhu is earth mounds, grass and water, and most walls are only about two metres high. With two days in Hangzhou, give them to West Lake and Lingyin. If you are curious but short of time, the museum alone tells most of the story in about two hours.",
      faq: [
        {
          question: "Is Liangzhu worth visiting?",
          answer: "Yes, if you want to see one of the places where Chinese civilisation took shape. About 5,000 years ago Liangzhu was a planned water city, with palaces on a raised platform, walls, rice fields and some of the oldest known dams in the world. UNESCO listed it in 2019. The city survives as earth and grass, so see the museum first and give the two a full day.",
        },
        {
          question: "What will I actually see at the Liangzhu ruins park?",
          answer: "Mostly open country: rice fields, reeds and water, crossed by long grassy banks that were the city walls, broad but mostly only about two metres high. At the centre is the raised platform where the palaces stood, about 670 by 450 metres, and you can climb it. At the south wall one stretch is cut open to show how the wall was built, and the museum's model of the city helps you read the rest.",
        },
        {
          question: "Should I visit Liangzhu Museum or the ruins park first?",
          answer: "The museum first, for most first-time visitors. Its jades, pottery and huge model of the city show you what the park's fields once held, so the mounds and grassy banks make sense when you reach them. Going to the park first suits photographers, landscape lovers and repeat visitors who want the morning light. The two are run separately, so check each one's admission for your date.",
        },
        {
          question: "How long do you need for Liangzhu?",
          answer: "A full day for the museum and the ruins park: the museum in the morning, the park in the afternoon. Liangzhu is about 25 kilometres north-west of central Hangzhou, so allow for the road there and back. With half a day, see the museum, which takes about two hours, and one part of the park.",
        },
        {
          question: "When is the best time to visit Liangzhu?",
          answer: "Spring and autumn. From March to April rapeseed flowers turn parts of the old city gold and cherry trees bloom by the west water gate, and in autumn the rice ripens. Summer is hot on open ground with little shade, and heavy rain or typhoon warnings can close the park at short notice, so keep the museum as your fallback.",
        },
      ],
    },
    zh: {
      description: "杭州良渚古城遗址，五千年前的一座水城，如今城墙化作稻田间一道道草坡。先去博物院，再登上宫殿大土台。",
      why: [
        "穿过遗址公园，稻田和池塘边的树林里不时飞起白鹭。登上正中那座大土台，旷野上的风迎面吹来，一道道又长又矮的草坡横在田野里，那就是五千年前的城墙。脚下这座土台东西约 670 米长，一部分借了天然的小山，其余全靠人力堆筑，把宫殿托到了十几米高。整座城其实都还在，只是化作了泥土和草坡，而你正站在它的正中央。",
        "我们常说中华文明“上下五千年”，在良渚，你可以亲眼看到一座五千年前的城。这是一座水城：九座城门里有八座是水门，人们划着独木舟、撑着竹筏在城里来往，眼前这片田野，当年河道纵横。光是城墙围起来的内城，就有大约四个北京故宫那么大。山洪会从西北的山上冲下来，良渚人就在那边的山谷里筑坝。这是世界上已知最早的堤坝系统之一，坝体用芦荻、茅草把泥土裹成一个个“草裹泥”，再像沙袋一样横竖交错垒起来。",
        "这一天最好分成两半，先去博物院：几座浅色石材的长条形建筑立在湖上，展厅之间是安静的庭院。里面有玉器、陶器，还有一座巨大的古城沙盘；看过这些，再到遗址公园，眼前的田野才会变成宫殿、临河的房屋和码头。不先看博物院，遗址公园很容易只像一片好看的草地。爱拍照、或者不是第一次来的人，也可以反过来，先去遗址公园赶早上的光线。",
      ],
      highlights: [
        {
          name: "登上大莫角山",
          body: "大莫角山是宫殿区三座土台里最高的一座。站上去慢慢转一圈，古城一圈套一圈的样子就看出来了：正中是宫殿区，外面一圈是城墙，再往外，是当年村民垫高了住的土地。",
        },
        {
          name: "剖开的南城墙",
          body: "沿着步道走向南城墙，城墙在狼尾草丛中若隐若现。这里剖开了一段，是遗址公园里唯一能看到五千年前城墙真实剖面的地方。最底下的石头一条一条铺开，每一条大约是几条船或竹筏运一趟的量；石头取自不同的山，所以每条都略有不同。",
        },
        {
          name: "玉琮上的小神像",
          body: "在博物院的玉器展厅，凑近看看那些外方内圆的玉琮。很多上面都刻着同一个小小的图案：上方是头戴羽冠的神人，下方是圆睁大眼、露出獠牙的神兽。考古学者认为，这是良渚人共同信奉的神，刻于还没有金属工具的五千年前。",
        },
      ],
      time: "一整天：上午看博物院，吃过午饭开车过去，下午逛遗址公园。只有半天的话，看博物院，再挑遗址公园的一段；光看博物院大约两个小时。",
      when: "春秋两季最好。三四月，古城里成片的油菜花开得金黄，西水城门一带樱花盛开；秋天，稻子熟了。遗址公园是一片开阔地，几乎没有遮阴，夏天的下午很难熬；遇上暴雨或台风预警，还可能临时闭园，出发前一天看一下最新公告。",
      pair: "良渚在杭州市区西北约 25 公里，自成一天，不适合和西湖排在同一天。对那段治水的故事感兴趣，可以去古城西北山里的老虎岭遗址公园：站在约 15 米高的水坝剖面前，能看清里面一层层横竖交错的“草裹泥”。瑶山遗址在古城东北约 5 公里，祭坛用三种颜色的土筑成。这两处都要先单独确认开放。被誉为“天下第一琮”的“琮王”出自反山王陵，收藏在杭州的浙江省博物馆之江馆，不在良渚。",
      skip: "想看矗立的古建筑废墟，这里不合适：良渚只有土台、草坡和水，城墙大多只有两米来高。在杭州只有两天，先留给西湖和灵隐寺。好奇但时间紧，只看博物院，两个小时左右就能看懂大半个故事。",
      faq: [
        {
          question: "杭州良渚古城遗址值得去吗？",
          answer: "值得，如果你想亲眼看看中华文明的源头之一。五千年前，良渚是一座规划过的水城，有建在高台上的宫殿、城墙、稻田，还有世界上已知最早的一批水坝；2019 年列入世界遗产。整座城如今只剩泥土和草坡，所以先看博物院，两处加起来留一整天。",
        },
        {
          question: "良渚古城遗址公园里能看到什么？",
          answer: "主要是一片开阔的田野：稻田、芦苇和水面之间，横着一道道长长的草坡，那就是当年的城墙，很宽，但大多只有两米来高。正中是当年建宫殿的大土台，东西约 670 米、南北约 450 米，可以走上去。南城墙有一段剖开展示，能看到城墙是怎么筑起来的；其余部分，靠博物院的古城沙盘帮你看懂。",
        },
        {
          question: "良渚博物院和遗址公园，先去哪个？",
          answer: "第一次来的话，大多数人适合先去博物院。看过玉器、陶器和巨大的古城沙盘，知道那片田野当年是什么样子，到了遗址公园，那些土台和草坡才看得明白。爱拍照、喜欢看风景、或者不是第一次来，想赶早上的光线，可以先去遗址公园。两处分开管理，要按你的日期分别确认入园要求。",
        },
        {
          question: "游良渚需要多长时间？",
          answer: "博物院加遗址公园要一整天：上午博物院，下午遗址公园。良渚在杭州市区西北约 25 公里，来回路上的时间也要算进去。只有半天的话，看博物院，大约两个小时，再挑遗址公园的一段。",
        },
        {
          question: "什么时候去良渚最好？",
          answer: "春秋两季最好。三四月，古城里的油菜花开得金黄，西水城门一带樱花盛开；秋天稻子熟了。夏天开阔地上几乎没有遮阴，很晒；遇上暴雨或台风预警，遗址公园可能临时闭园，所以把博物院当作备选。",
        },
      ],
    },
    ko: {
      description: "항저우 량주 고성 유적, 5천 년 전 물의 도시가 논 사이 풀 덮인 둑으로 남아 있습니다. 박물관을 먼저 보고 궁전 터 흙 대지에 올라 보세요.",
      why: [
        "공원을 지나다 보면 논과 연못가 숲에서 이따금 백로가 날아오릅니다. 한가운데의 커다란 흙 대지에 오르면 탁 트인 들판에서 바람이 불어오고, 길고 나지막한 풀 덮인 둑이 들판을 가로지릅니다. 그 둑이 바로 5천 년 전에 쌓은 성벽입니다. 발밑의 대지는 길이 약 670m로, 일부는 자연 언덕에 기대고 나머지는 사람 손으로 흙을 쌓아 궁전을 10여 m 높이로 들어 올렸습니다. 도시 전체가 흙과 풀의 모습으로 아직 여기 있고, 여러분은 그 한가운데에 서 있습니다.",
        "중국 사람들은 흔히 ‘5천 년 문명’을 말하는데, 량주에서는 정말 5천 년 된 도시 안에 서 볼 수 있습니다. 이곳은 물의 도시였습니다. 성문 아홉 개 가운데 여덟 개가 배가 드나드는 수문이었고, 사람들은 통나무배와 대나무 뗏목을 타고 오갔습니다. 눈앞의 들판에 물길이 얽혀 있던 모습을 떠올려 보세요. 성벽으로 둘러싸인 내성만 해도 베이징 자금성의 약 네 배입니다. 북서쪽 산에서 홍수가 쏟아져 내려오자 사람들은 그 골짜기에 댐을 쌓았습니다. 지금까지 알려진 세계에서 가장 오래된 댐 체계 가운데 하나로, 갈대와 띠풀로 진흙을 감싼 덩이를 모래주머니처럼 가로세로 엇갈려 쌓아 만들었습니다.",
        "하루를 둘로 나누고, 박물관부터 가세요. 호수 위에 연한 빛깔의 돌로 감싼 길쭉한 건물들이 놓여 있고, 전시실 사이사이에 조용한 안뜰이 있습니다. 안에는 옥기와 토기, 거대한 도시 모형이 있어서, 이것을 보고 나면 공원의 빈 들판이 궁전과 물가의 집, 나루터로 읽히기 시작합니다. 박물관을 건너뛰면 공원은 그저 보기 좋은 풀밭처럼 느껴질 수 있습니다. 사진을 찍으려는 분이나 다시 찾은 분이라면 순서를 바꿔, 아침 빛이 좋을 때 공원부터 가도 좋습니다.",
      ],
      highlights: [
        {
          name: "궁전 대지 위에 서기",
          body: "궁전이 섰던 세 흙 대지 가운데 가장 높은 다모자오산(大莫角山)에 올라 천천히 한 바퀴 돌아보세요. 도시가 겹겹의 고리로 보입니다. 한가운데에 궁전 구역, 그 둘레에 성벽, 그 바깥으로 마을 사람들이 살던 돋운 땅이 이어집니다.",
        },
        {
          name: "속을 드러낸 남쪽 성벽",
          body: "산책로를 따라 남쪽 성벽으로 가면 수크령 풀숲 사이로 성벽이 보일 듯 말 듯합니다. 이곳은 한 구간을 잘라 놓아, 공원에서 5천 년 전 성벽의 실제 단면을 볼 수 있는 유일한 곳입니다. 맨 아래 돌은 줄지어 깔려 있는데, 한 줄이 배나 대나무 뗏목 몇 척이 한 번에 실어 나를 만한 양이고, 돌을 서로 다른 산에서 가져와 줄마다 조금씩 다릅니다.",
        },
        {
          name: "옥종 속의 작은 신",
          body: "박물관의 옥기 전시실에서 겉은 네모나고 속은 둥글게 뚫린 옥종에 바짝 다가가 보세요. 많은 옥종에 같은 작은 형상이 새겨져 있습니다. 위에는 깃털 관을 쓴 사람, 아래에는 눈을 둥글게 부릅뜨고 송곳니를 드러낸 짐승입니다. 고고학자들은 이것을 량주 사람들이 함께 믿던 신으로 봅니다. 금속 도구도 없던 5천 년 전에 새긴 것입니다.",
        },
      ],
      time: "하루 종일 잡으세요. 오전에 박물관, 점심을 먹고 차로 이동해 오후에 유적공원을 봅니다. 반나절뿐이라면 박물관과 공원의 한 구역만 보세요. 박물관만 보는 데는 2시간쯤 걸립니다.",
      when: "봄과 가을이 좋습니다. 3~4월에는 옛 도시 곳곳에 유채꽃이 노랗게 피고 서쪽 수문 근처에 벚꽃이 피며, 가을에는 벼가 익습니다. 공원은 그늘이 거의 없는 너른 들판이라 여름 오후에는 힘들고, 폭우나 태풍 특보가 내리면 갑자기 문을 닫기도 합니다. 전날 최신 공지를 확인하세요.",
      pair: "량주는 항저우 시내에서 북서쪽으로 약 25km 떨어져 있으니 하루를 따로 잡으세요. 물을 다스린 이야기에 끌린다면 고성 북서쪽 산속의 라오후링 유적공원에 가 보세요. 높이 약 15m인 5천 년 전 댐의 단면 앞에 서면, 그 안에 가로세로 엇갈려 쌓은 ‘풀로 감싼 진흙’ 덩이가 보입니다. 세 가지 색 흙으로 쌓은 야오산 제단은 고성에서 북동쪽으로 약 5km입니다. 두 곳 모두 개방 여부를 먼저 따로 확인하세요. ‘천하제일 옥종’으로 불리는 반산 왕릉 출토 ‘종왕(琮王)’은 량주가 아니라 항저우의 저장성박물관 즈장관에 있습니다.",
      skip: "우뚝 선 옛 건물 유적을 봐야 과거가 느껴진다면 이곳은 맞지 않습니다. 량주에는 흙 대지와 풀밭, 물뿐이고 성벽도 대부분 2m 남짓입니다. 항저우에 이틀뿐이라면 서호와 영은사에 쓰세요. 궁금하지만 시간이 빠듯하다면 박물관만 2시간쯤 봐도 이야기의 대부분을 알 수 있습니다.",
      faq: [
        {
          question: "항저우 량주 고성 유적은 가 볼 만한가요?",
          answer: "네, 중국 문명이 처음 모습을 갖춘 곳 가운데 하나를 직접 보고 싶다면 가 볼 만합니다. 5천 년 전 량주는 계획적으로 세운 물의 도시로, 높은 대지 위의 궁전과 성벽, 논, 그리고 세계에서 가장 오래된 축에 드는 댐들이 있었습니다. 2019년 세계유산에 올랐습니다. 도시는 이제 흙과 풀로만 남아 있으니 박물관을 먼저 보고, 두 곳에 하루를 다 쓰세요.",
        },
        {
          question: "량주 고성 유적공원에서는 무엇을 볼 수 있나요?",
          answer: "대부분 탁 트인 들판입니다. 논과 갈대, 물 사이로 옛 성벽인 긴 풀 둑이 이어지는데, 폭은 넓지만 높이는 대부분 2m 남짓입니다. 한가운데에는 궁전이 섰던 동서 약 670m, 남북 약 450m의 큰 흙 대지가 있고, 직접 올라가 볼 수 있습니다. 남쪽 성벽에는 단면을 드러낸 구간이 있어 어떻게 쌓았는지 볼 수 있고, 나머지는 박물관의 도시 모형이 읽는 법을 알려 줍니다.",
        },
        {
          question: "량주박물관과 유적공원 중 어디를 먼저 가야 하나요?",
          answer: "처음이라면 대부분 박물관부터 가는 편이 좋습니다. 옥기와 토기, 거대한 도시 모형을 보고 그 들판에 무엇이 있었는지 알고 가야, 공원의 흙 대지와 풀 둑이 눈에 들어옵니다. 사진을 찍거나 풍경을 즐기려는 분, 다시 찾은 분이라면 아침 빛을 위해 공원을 먼저 가도 좋습니다. 두 곳은 따로 운영되니 날짜에 맞춰 각각 입장 조건을 확인하세요.",
        },
        {
          question: "량주를 보려면 시간이 얼마나 걸리나요?",
          answer: "박물관과 유적공원을 함께 보려면 하루가 걸립니다. 오전에 박물관, 오후에 유적공원을 보세요. 량주는 항저우 시내에서 북서쪽으로 약 25km라 오가는 시간도 넉넉히 잡아야 합니다. 반나절뿐이라면 2시간쯤 걸리는 박물관과 공원의 한 구역만 보세요.",
        },
        {
          question: "량주는 언제 가는 게 가장 좋나요?",
          answer: "봄과 가을이 가장 좋습니다. 3~4월에는 옛 도시 곳곳에 유채꽃이 노랗게 피고 서쪽 수문 근처에 벚꽃이 피며, 가을에는 벼가 익습니다. 여름에는 그늘 없는 들판이 무척 덥고, 폭우나 태풍 특보로 공원이 갑자기 문을 닫을 수 있으니 박물관을 대안으로 남겨 두세요.",
        },
      ],
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
      faq: [
        {
          question: "Is Hongyadong worth visiting?",
          answer: "Yes, for the view at night. When eleven storeys of stilt-house-style buildings light up gold above the Jialing River, you are looking at Chongqing's best-known night scene. Give it an hour or two in the evening. If you want old buildings, look elsewhere: it was built in 2006.",
        },
        {
          question: "When is the best time to see Hongyadong?",
          answer: "In the evening: arrive before the lights come on and stay until it is fully dark. The lights come on at a set time each evening, later in summer than in winter, so check it for your date. If you can, avoid the National Day holiday in early October and the Spring Festival holiday, when just getting in can take an hour.",
        },
        {
          question: "Where is the best view of Hongyadong?",
          answer: "From the middle of Qiansimen Bridge, right beside it. Turn round about halfway across and the whole lit building is in front of you. The riverside road below gives the angle people compare with Spirited Away. From the north bank, about 800 metres across the bridge, the building, the bridge and the skyline fit in one frame.",
        },
        {
          question: "Do you need a ticket for Hongyadong?",
          answer: "No, it is free. Entry may need a free online booking, and on public holidays numbers are capped, so book ahead for a holiday evening. Watching from the bridge or across the river needs no booking at all, and we can check the current rule for your date.",
        },
        {
          question: "Was Spirited Away based on Hongyadong?",
          answer: "No. The Miyazaki film Spirited Away came out in 2001, five years before Hongyadong opened, and the building is modelled on the stilt houses that once lined Chongqing's two rivers. The comparison with the film's bathhouse caught on through short videos online from around 2016. Stand on the riverside road at night and look up, and you will see why.",
        },
      ],
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
      faq: [
        {
          question: "重庆洪崖洞值得去吗？",
          answer: "值得，冲着夜景去。天黑后，十一层吊脚楼在嘉陵江边一层层亮起金光，这就是重庆最有名的那幅画面。傍晚来，留一两个小时就够；想看老房子就别来了，它是 2006 年才建的。",
        },
        {
          question: "什么时候去洪崖洞最好？",
          answer: "傍晚，亮灯前到，一直待到天全黑。灯每天按固定的时间开，夏天比冬天晚，出发前查一下当天的时间。能避开国庆和春节就尽量避开，那几天光排队进去就可能要一个小时。",
        },
        {
          question: "洪崖洞夜景在哪里看最好？",
          answer: "就在旁边的千厮门大桥上，走到桥中间一带回头，亮灯的整栋洪崖洞就在眼前。楼下江边的马路，是大家说像《千与千寻》的那个角度；过桥约 800 米到对岸江北嘴的江边，能把洪崖洞、大桥和天际线收进同一个画面。",
        },
        {
          question: "去洪崖洞要门票吗？",
          answer: "不要，洪崖洞不收门票。进去可能要先在网上免费预约；节假日会限流，那几天晚上去最好提前约好。只在桥上或对岸看夜景，不用预约；我们可以按你的日期帮你核实最新规定。",
        },
        {
          question: "洪崖洞是《千与千寻》的原型吗？",
          answer: "不是。宫崎骏的《千与千寻》2001 年就在日本上映了，比洪崖洞 2006 年建成还早五年；洪崖洞是照着当年沿两江随处可见的老吊脚楼新建的。说它像电影里的汤屋，是 2016 年前后在网上短视频里传开的说法；晚上站在江边马路上抬头看，你就明白为什么。",
        },
      ],
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
      faq: [
        {
          question: "충칭 홍야동은 가 볼 만한가요?",
          answer: "네, 야경을 보러 갈 만합니다. 해가 지면 11층 조각루 양식 건물이 자링강 절벽을 따라 금빛으로 빛나는데, 이것이 바로 충칭을 대표하는 풍경입니다. 저녁에 1~2시간을 잡으세요. 다만 옛 건물을 보고 싶다면 맞지 않습니다. 2006년에 지은 건물입니다.",
        },
        {
          question: "홍야동은 언제 가는 게 가장 좋나요?",
          answer: "저녁입니다. 조명이 켜지기 전에 도착해 완전히 어두워질 때까지 머무르세요. 조명은 매일 정해진 시각에 켜지고 여름이 겨울보다 늦으니, 당일 시간을 확인하세요. 국경절과 춘절 연휴는 가능하면 피하세요. 들어가는 데만 한 시간이 걸릴 수 있습니다.",
        },
        {
          question: "홍야동 야경은 어디서 봐야 가장 멋진가요?",
          answer: "바로 옆 천사문대교 위입니다. 다리 중간쯤에서 뒤돌아보면 불 켜진 건물 전체가 눈앞에 펼쳐집니다. 아래 강변 도로에서 올려다보면 ‘센과 치히로의 행방불명’ 속 온천장과 비교되는 바로 그 모습이고, 다리를 약 800m 건너 맞은편 강변으로 내려가면 홍야동, 다리, 스카이라인이 한 프레임에 담깁니다.",
        },
        {
          question: "홍야동은 입장료가 있나요?",
          answer: "아니요, 입장료는 없습니다. 다만 입장할 때 무료 온라인 예약이 필요할 수 있고, 연휴에는 인원을 제한하니 연휴 저녁이라면 미리 예약하세요. 다리 위나 강 건너편에서 바라보는 데는 예약이 필요 없고, 저희가 날짜에 맞춰 최신 규정을 확인해 드릴 수 있습니다.",
        },
        {
          question: "홍야동이 ‘센과 치히로의 행방불명’의 배경인가요?",
          answer: "아닙니다. 미야자키 하야오의 ‘센과 치히로의 행방불명’은 2001년 일본에서 개봉해, 홍야동이 문을 연 2006년보다 5년 앞섭니다. 홍야동은 예전에 충칭의 두 강을 따라 늘어서 있던 조각루를 본떠 새로 지은 건물입니다. 영화 속 온천장과 닮았다는 이야기는 2016년 무렵부터 짧은 동영상을 타고 널리 퍼졌고, 밤에 강변 도로에서 올려다보면 그 이유를 알 수 있습니다.",
        },
      ],
    },
  },
};

export const sightStoryMeta: Partial<Record<SightId, SightStoryMeta>> = {
  "forbidden-city": {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "UNESCO World Heritage Centre: Imperial Palaces of the Ming and Qing Dynasties in Beijing and Shenyang", url: "https://whc.unesco.org/en/list/439/" },
      { title: "The Palace Museum: Visit", url: "https://intl.dpm.org.cn/visit.html" },
      { title: "The Palace Museum: 储秀宫 (Palace of Gathered Elegance)", url: "https://www.dpm.org.cn/explore/building/236486.html" },
      { title: "The Palace Museum: 钟表馆 (Clock Gallery)", url: "https://www.dpm.org.cn/pavilion/225322.html" },
      { title: "Beijing government: Palace Museum", url: "https://english.beijing.gov.cn/travellinginbeijing/mustvisitsites/202306/t20230608_3127526.html" },
    ],
    alternateName: ["Forbidden City", "Palace Museum", "故宫", "故宫博物院", "紫禁城", "北京故宫", "자금성", "고궁박물원", "Gugong", "Zijincheng"],
    sameAs: ["https://en.wikipedia.org/wiki/Forbidden_City", "https://www.wikidata.org/wiki/Q80290", "https://whc.unesco.org/en/list/439/"],
  },
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
  "temple-of-heaven": {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "UNESCO World Heritage Centre: Temple of Heaven, an Imperial Sacrificial Altar in Beijing", url: "https://whc.unesco.org/en/list/881/" },
      { title: "Temple of Heaven official site", url: "https://www.tiantanpark.cn/en/index.html" },
      { title: "Beijing government: Temple of Heaven", url: "https://english.beijing.gov.cn/travellinginbeijing/parks/202603/t20260320_4562532.html" },
      { title: "Beijing Park Management Centre: 祈年殿 (Hall of Prayer for Good Harvests)", url: "https://gygl.beijing.gov.cn/mlgy/mlgy_gyjg01/201912/t20191211_1048233.html" },
      { title: "Beijing Park Management Centre: 丹陛桥 (Danbi Bridge)", url: "https://gygl.beijing.gov.cn/whgy/whgy_wsgc/201912/t20191206_885539.html" },
    ],
    alternateName: ["Temple of Heaven", "天坛", "天坛公园", "北京天坛", "천단", "천단공원", "Tiantan", "Tiantan Park"],
    sameAs: ["https://en.wikipedia.org/wiki/Temple_of_Heaven", "https://www.wikidata.org/wiki/Q125445", "https://whc.unesco.org/en/list/881/"],
  },
  "summer-palace": {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "UNESCO World Heritage Centre: Summer Palace, an Imperial Garden in Beijing", url: "https://whc.unesco.org/en/list/880/" },
      { title: "Summer Palace official site", url: "https://summerpalace.net.cn/en/index.html" },
      { title: "Beijing government: Summer Palace", url: "https://english.beijing.gov.cn/beijinginfo/culture/culturaltreasures/sevenculture/202401/t20240111_3532659.html" },
      { title: "Visit Beijing: 颐和园长廊 (the Long Corridor)", url: "https://www.visitbeijing.com.cn/article/47Qs87fyYVC" },
      { title: "Beijing Municipal Forestry and Parks Bureau: 宜芸馆 and the Hall of Jade Ripples", url: "https://yllhj.beijing.gov.cn/ztxx/lhysh/sh/202104/t20210423_2366890.shtml" },
    ],
    alternateName: ["Summer Palace", "Beijing Summer Palace", "颐和园", "北京颐和园", "이화원", "Yiheyuan"],
    sameAs: ["https://en.wikipedia.org/wiki/Summer_Palace", "https://www.wikidata.org/wiki/Q4132", "https://whc.unesco.org/en/list/880/"],
  },
  "national-museum": {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "National Museum of China: Visit", url: "https://en.chnmuseum.cn/visit_692/" },
      { title: "National Museum of China: 国博简介 (about the museum)", url: "https://www.chnmuseum.cn/gbgk/gbjj/" },
      { title: "National Museum of China: Ancient China, Shang and Zhou", url: "https://www.chnmuseum.cn/portals/0/web/zt/gudai/en/detail2.html" },
      { title: "National Museum of China: Houmuwu Ding", url: "https://en.chnmuseum.cn/collections_577/collection_highlights_608/archaeological_discoveries_609/202109/t20210902_251133.html" },
      { title: "National Museum of China: Pottery Storyteller Beating a Drum", url: "https://en.chnmuseum.cn/collections_577/collection_highlights_608/archaeological_discoveries_609/202008/t20200831_247541.html" },
    ],
    alternateName: ["National Museum of China", "中国国家博物馆", "国家博物馆", "国博", "중국 국가박물관", "중국국가박물관", "Zhongguo Guojia Bowuguan"],
    sameAs: ["https://en.wikipedia.org/wiki/National_Museum_of_China", "https://www.wikidata.org/wiki/Q1074318"],
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
  "the-bund": {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "Shanghai Landscaping and City Appearance Administrative Bureau: Bund and Lujiazui lighting schedule (2024)", url: "https://lhsr.sh.gov.cn/gggs/20240429/f77bff8b7a1843d1a360eec8133fab44.html" },
      { title: "Meet in Shanghai (Shanghai tourism): Huangpu ferry piers at Jinling Road East and Dongchang Road", url: "https://www.meet-in-shanghai.net/cn/traffic/dock-112479/" },
      { title: "Cailian Press: 462,000 visitors on the Bund waterfront, 1 October 2024", url: "https://www.cls.cn/detail/1815574" },
      { title: "The Paper: the Customs House at 90 and its clock (2017)", url: "https://www.thepaper.cn/newsDetail_forward_1918168" },
      { title: "The Paper: what Lujiazui looked like before 1990 (2015)", url: "https://www.thepaper.cn/newsDetail_forward_1321191" },
    ],
    alternateName: ["The Bund", "Shanghai Bund", "Waitan", "外滩", "上海外滩", "와이탄", "상하이 와이탄"],
    sameAs: ["https://en.wikipedia.org/wiki/The_Bund", "https://www.wikidata.org/wiki/Q125474"],
  },
  "shanghai-tower": {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "Shanghai Tower official site: Top of Shanghai Observatory", url: "https://www.shanghaitower.com/shagnhai.html" },
      { title: "Shanghai government: Shanghai Tower", url: "https://english.shanghai.gov.cn/en-ScenicSpots/20240507/f3ce9cade30f4ff2a0bad6293626a232.html" },
      { title: "CNR: the 118th-floor observatory opens, 55 seconds to 546 metres (2017)", url: "https://www.cnr.cn/shanghai/tt/20170426/t20170426_523727308.shtml" },
      { title: "China News Service: Lujiazui's ‘kitchen set’ nickname (2013)", url: "https://www.chinanews.com.cn/house/2013/08-06/5127927.shtml" },
      { title: "China News Service: the World Financial Center's 474-metre deck (2008)", url: "https://www.chinanews.com/sh/news/2008/08-19/1352663.shtml" },
    ],
    alternateName: ["Shanghai Tower", "Top of Shanghai Observatory", "上海中心大厦", "上海中心", "上海之巅观光厅", "상하이 타워", "Shanghai Zhongxin Dasha"],
    sameAs: ["https://en.wikipedia.org/wiki/Shanghai_Tower", "https://www.wikidata.org/wiki/Q18547"],
  },
  "shanghai-museum-east": {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "Shanghai Museum: visiting the East building", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/en/service/visit-east" },
      { title: "Shanghai Municipal Administration of Culture and Tourism: Shanghai Museum East fully opens (2024)", url: "https://whlyj.sh.gov.cn/wlyw/20241203/a4f01fa0d284419090dd69ac3f747f52.html" },
      { title: "Shanghai Municipal Administration of Culture and Tourism: the painting and calligraphy galleries change their display (2025)", url: "https://whlyj.sh.gov.cn/wbzx/20250225/c206279ec7064a4d9140e78b7b435e27.html" },
      { title: "Shanghai government: Shanghai Museum East visitor guide", url: "https://english.shanghai.gov.cn/en-MuseumsGalleries/20241205/756c96bd7dd940378b9ac056f11429e2.html" },
      { title: "National Museum of China: the Da Yu Ding, the Da Ke Ding and the Pan family", url: "https://www.chnmuseum.cn/portals/0/web/zt/202106dayuding/" },
    ],
    alternateName: ["Shanghai Museum East", "Shanghai Museum East Branch", "上海博物馆东馆", "上博东馆", "상하이박물관 동관", "Shanghai Bowuguan Dongguan"],
    sameAs: ["https://en.wikipedia.org/wiki/Shanghai_Museum_East", "https://www.wikidata.org/wiki/Q124211936"],
  },
  "humble-administrators-garden": {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "UNESCO World Heritage Centre: Classical Gardens of Suzhou", url: "https://whc.unesco.org/en/list/813/" },
      { title: "Suzhou Landscape and Greening Bureau: 拙政园 (Humble Administrator's Garden)", url: "https://ylj.suzhou.gov.cn/szsylj/sjyc/201905/c1df393edc8745abb20e8a9bd5525782.shtml" },
      { title: "Suzhou Landscape and Greening Bureau: 与谁同坐轩 (the fan-shaped pavilion)", url: "https://ylj.suzhou.gov.cn/szsylj/ylwh/201604/2bf2a231928b4ed9840d69893a7ae240.shtml" },
      { title: "Shanghai Landscaping and City Appearance Administrative Bureau: the garden's view of the North Temple Pagoda", url: "https://lhsr.sh.gov.cn/jnylwh/20200824/7cc5e5102094470b94a8f771808c1f53.html" },
      { title: "Suzhou Museum: Prince Zhong's Mansion and the garden's history", url: "https://www.szmuseum.com/News/Details/tptgzwf" },
    ],
    alternateName: ["Humble Administrator's Garden", "Zhuozheng Garden", "拙政园", "苏州拙政园", "졸정원", "쑤저우 졸정원", "Zhuozheng Yuan"],
    sameAs: ["https://en.wikipedia.org/wiki/Humble_Administrator%27s_Garden", "https://www.wikidata.org/wiki/Q1076650", "https://whc.unesco.org/en/list/813/"],
  },
  "west-lake": {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "UNESCO World Heritage Centre: West Lake Cultural Landscape of Hangzhou", url: "https://whc.unesco.org/en/list/1334/" },
      { title: "UNESCO / ICOMOS evaluation: West Lake Cultural Landscape of Hangzhou", url: "https://whc.unesco.org/document/152404" },
      { title: "West Lake Scenic Area Administration: 苏轼筑堤 (the Su Causeway)", url: "https://westlake.hangzhou.gov.cn/art/2022/7/8/art_1639430_59037825.html" },
      { title: "Hangzhou government: West Lake (2025)", url: "https://www.hangzhou.gov.cn/art/2025/6/24/art_812270_59114316.html" },
    ],
    alternateName: ["West Lake", "Hangzhou West Lake", "西湖", "杭州西湖", "서호", "항저우 서호", "Xihu"],
    sameAs: ["https://en.wikipedia.org/wiki/West_Lake", "https://www.wikidata.org/wiki/Q502371", "https://whc.unesco.org/en/list/1334/"],
  },
  lingyin: {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "Lingyin Temple: 千年古寺 大慈灵隐 (the temple's founding, halls and great Buddha)", url: "https://www.lingyinsi.com/detail_44_7946.html" },
      { title: "Lingyin Temple: 鹫峰从天竺飞来 (Huili and the name of Feilai Peak)", url: "https://lingyinsi.org/detail_14040.html" },
      { title: "Lingyin Temple: 布袋和尚与弥勒佛造像 (the laughing Buddha of Feilai Peak)", url: "https://lingyinsi.org/detail_1694.html" },
      { title: "Lingyin Temple: 龙泓洞 (Longhong Cave and its skylight)", url: "https://www.lingyinsi.com/detail_46_19385.html" },
      { title: "Lingyin Feilai Peak Scenic Area: free admission and timed reservation notice", url: "https://en.lingyinsi.org/detail_15105.html" },
    ],
    alternateName: ["Lingyin Temple", "Lingyin Si", "Yunlin Chan Temple", "Feilai Peak", "Feilai Feng", "灵隐寺", "云林禅寺", "杭州灵隐寺", "飞来峰", "영은사", "링인쓰", "비래봉"],
    sameAs: ["https://en.wikipedia.org/wiki/Lingyin_Temple", "https://www.wikidata.org/wiki/Q1070228"],
  },
  liangzhu: {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "UNESCO World Heritage Centre: Archaeological Ruins of Liangzhu City", url: "https://whc.unesco.org/en/list/1592/" },
      { title: "Liangzhu Museum: about the museum", url: "https://www.lzmuseum.cn/BoWuYuanJianJie/index.html" },
      { title: "Liangzhu Museum: the ancient city's palace platform, walls, gates and granary (2024)", url: "https://www.lzmuseum.cn/LiangBoXinWen/20246438161.html" },
      { title: "Liangzhu Museum: how Liangzhu was built, from water gates to grass-wrapped mud (2024)", url: "https://www.lzmuseum.cn/LiangBoXinWen/2024304471300.html" },
      { title: "Liangzhu Museum: 48 hours at the Liangzhu sites, from the museum to the Laohuling dam (2025)", url: "https://www.lzmuseum.cn/LiangBoXinWen/2025724933723.html" },
    ],
    alternateName: ["Archaeological Ruins of Liangzhu City", "Liangzhu Ancient City", "Liangzhu site", "良渚古城遗址", "良渚遗址", "良渚古城", "량주 고성 유적", "량주 유적", "Liangzhu Gucheng Yizhi"],
    sameAs: ["https://en.wikipedia.org/wiki/Archaeological_ruins_of_Liangzhu_City", "https://www.wikidata.org/wiki/Q15904183", "https://whc.unesco.org/en/list/1592/"],
  },
  hongyadong: {
    reviewedAt: "2026-10-04",
    sources: [
      { title: "Yuzhong District government: 洪崖洞 (Hongyadong)", url: "https://www.cqyz.gov.cn/zjyz/lyyz/rmdkd/202305/t20230530_12012596.html" },
      { title: "Chongqing Housing and Urban-Rural Development Commission: Hongyadong (2025)", url: "https://zfcxjw.cq.gov.cn/cqcjdag/csjy/202504/t20250416_14526589.html" },
      { title: "Chongqing Civil Affairs Bureau: the Hongya cave and its name (2024)", url: "https://mzj.cq.gov.cn/sy_218/bmdt/mzyw/202401/t20240119_12841031.html" },
      { title: "Chongqing government: the riverside path to Chaotianmen (2025)", url: "https://www.cq.gov.cn/zt/yyztls/lsjcx/202512/t20251205_15213290.html" },
    ],
    alternateName: ["Hongyadong", "Hongya Cave", "Hongya Dong", "洪崖洞", "洪崖洞民俗风貌区", "重庆洪崖洞", "홍야동", "훙야둥", "홍애동"],
    sameAs: ["https://en.wikipedia.org/wiki/Hongya_Cave", "https://www.wikidata.org/wiki/Q32171478"],
  },
};

export function getSightStoryMeta(id: SightId): SightStoryMeta | null {
  return sightStoryMeta[id] ?? null;
}

export function getSightStory(id: SightId, locale: HomegroundLocale): SightStory | null {
  return sightStories[id]?.[locale] ?? null;
}
