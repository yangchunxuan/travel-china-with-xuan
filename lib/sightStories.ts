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
