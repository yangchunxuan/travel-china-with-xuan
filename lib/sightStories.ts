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
        "Why the Forbidden City is worth the queue, the three things not to miss inside, how long to give it, and the view from Jingshan that most visitors walk past.",
      why: [
        "For almost five hundred years this was the address that mattered most in China. From 1420, when it was finished, until the last emperor gave up the throne in 1912, twenty-four emperors, fourteen Ming and ten Qing, ruled from inside these walls. Ordinary people were kept out the whole time; the name says as much.",
        "What makes it worth the queue is the plan, not any single hall. You come in through the Meridian Gate and keep walking north, through one gate and courtyard after another, each a little higher and more enclosed than the last, until the open halls of state give way to the smaller courts where the imperial family lived. Walked in that order, the palace explains how imperial China saw itself better than any label can.",
        "It is also big: 72 hectares and close to 9,000 rooms. Nobody sees all of it, and you don't need to.",
      ],
      highlights: [
        {
          name: "The Hall of Supreme Harmony",
          body: "The largest hall in the palace, where emperors were enthroned and married. Look up at a corner of the roof: behind the small figure riding a phoenix stand ten guardian beasts. It is the only building in China with that many.",
        },
        {
          name: "The Treasure Gallery and the Nine Dragon Screen",
          body: "On the quieter east side, the courts the Qianlong Emperor rebuilt for his retirement now hold the Treasure Gallery. At its entrance stands the Nine Dragon Screen, a wall of glazed tiles 29 metres long. The gallery is ticketed separately.",
        },
        {
          name: "The Imperial Garden",
          body: "Just before the north exit: old twisted cypresses, rockeries and a pavilion on an artificial hill. After two hours of open stone courtyards, it is the first shade you will find.",
        },
      ],
      time: "Three hours inside covers the central line and one side. Allow extra time for security at the gate.",
      when: "Book the morning session and go in when it opens: tour groups build up after ten. Spring and autumn are kindest. In July and August there is almost no shade between the halls.",
      pair: "Leave by the north gate and cross the road to Jingshan Park. From the pavilion on top, the palace roofs fill the view: the best way to see the whole of what you just walked through. Tiananmen Square is at the other end; see it before you go in.",
      skip: "If you have been before and the galleries don't interest you, or someone in your group can't manage three hours on stone paving. Jingshan alone shows you the shape of the palace in forty minutes.",
    },
    zh: {
      description: "故宫值得排队的理由、宫里别错过的三处、该留多长时间，以及多数人路过却没上去的景山。",
      why: [
        "将近五百年里，这里是全中国最要紧的地址。从 1420 年建成，到 1912 年末代皇帝退位，明清两朝 24 位皇帝在这道宫墙里统治天下，寻常百姓一步也进不来，宫名里那个“禁”字，说的就是这个。",
        "值得排队的不是哪一座殿，而是整座宫城的布局。从午门进去一路向北，一道门、一进院子接着一进，地势一层层抬高，空间一层层收紧，从举行大典的外朝，走到皇帝一家起居的内廷。按这个顺序走一遍，比读多少说明牌都更能看懂帝制中国怎样看待自己。",
        "它也确实大：占地 72 万平方米，房屋近九千间。没人看得完，也不必看完。",
      ],
      highlights: [
        {
          name: "太和殿",
          body: "宫里最大的一座殿，皇帝登基、大婚都在这里。抬头看屋脊的一角：骑凤仙人身后排着十只脊兽，全中国只有这一座建筑用到十只。",
        },
        {
          name: "珍宝馆与九龙壁",
          body: "东侧人少一些的宁寿宫一带，是乾隆为自己退位养老改建的，如今是珍宝馆。入口前的九龙壁长 29 米，由彩色釉砖拼成。珍宝馆另外购票。",
        },
        {
          name: "御花园",
          body: "就在北门出口前：盘曲的老树、假山，假山顶上还有一座亭子。在没有树荫的石头院子里走了两个小时，这是你遇到的第一片阴凉。",
        },
      ],
      time: "宫里留三个小时，够走中轴线外加一侧。进门前的安检时间另算。",
      when: "约上午场，开门就进；十点以后团队越来越多。春秋两季最舒服，七八月殿与殿之间几乎没有遮阴。",
      pair: "从北门神武门出来，过马路就是景山公园。登上山顶的万春亭，整片宫殿屋顶都在眼前，是回看故宫最好的位置。天安门广场在另一头，进宫之前去看。",
      skip: "以前来过、对珍宝馆也没兴趣的人；或者同行有人走不动三个小时的石板地。那就只上景山，四十分钟就能看清整座宫城的样子。",
    },
    ko: {
      description: "자금성이 줄을 설 만한 이유, 안에서 놓치지 말아야 할 세 곳, 필요한 시간, 그리고 많은 사람이 그냥 지나치는 경산공원 전망까지.",
      why: [
        "약 500년 동안 중국에서 가장 중요한 주소였습니다. 1420년 완공부터 1912년 마지막 황제가 물러날 때까지 명나라 14명, 청나라 10명, 모두 24명의 황제가 이 성벽 안에서 나라를 다스렸고, 일반 백성은 한 번도 들어갈 수 없었습니다. '금지된 성'이라는 이름 그대로입니다.",
        "줄을 설 가치가 있는 건 전각 하나가 아니라 궁 전체의 설계입니다. 오문으로 들어가 북쪽으로 문과 마당을 하나씩 지날 때마다 바닥은 조금씩 높아지고 공간은 조금씩 좁아집니다. 나라의 의식을 치르던 넓은 외조를 지나면 황제 가족이 살던 작은 내정이 나옵니다. 이 순서대로 걸으면, 황제의 중국이 스스로를 어떻게 보았는지 어떤 안내판보다 잘 보입니다.",
        "넓기도 합니다. 면적 72만 ㎡, 방이 9천 칸 가까이 됩니다. 다 볼 수도 없고, 다 볼 필요도 없습니다.",
      ],
      highlights: [
        {
          name: "태화전",
          body: "궁에서 가장 큰 전각으로, 황제의 즉위식과 혼례가 열리던 곳입니다. 지붕 모서리를 올려다보세요. 경복궁 지붕에서 보던 잡상이 여기에도 있는데, 봉황을 탄 선인 뒤로 열 개가 줄지어 있습니다. 중국에서 열 개를 올린 건물은 이곳뿐입니다.",
        },
        {
          name: "진보관과 구룡벽",
          body: "비교적 한산한 동쪽의 영수궁 일대는 건륭제가 퇴위 후를 위해 고쳐 지은 곳으로, 지금은 진보관입니다. 입구 앞의 구룡벽은 색 유약을 입힌 타일로 만든 길이 29m의 벽입니다. 진보관은 입장권을 따로 삽니다.",
        },
        {
          name: "어화원",
          body: "북문 출구 바로 앞의 정원입니다. 구불구불한 오래된 측백나무와 가산이 있고, 가산 꼭대기에 정자가 하나 있습니다. 그늘 없는 돌마당을 두 시간 걷고 나면 처음 만나는 그늘입니다.",
        },
      ],
      time: "궁 안에서 3시간이면 중축선과 한쪽 구역을 볼 수 있습니다. 입구 보안 검색 시간은 따로 잡으세요.",
      when: "오전 시간대로 예약하고 개장하자마자 들어가세요. 10시가 넘으면 단체 관광객이 늘어납니다. 봄·가을이 가장 좋고, 7~8월에는 전각 사이에 그늘이 거의 없습니다.",
      pair: "북문인 신무문으로 나와 길을 건너면 경산공원입니다. 꼭대기 만춘정에 오르면 궁의 지붕이 한눈에 들어오는데, 방금 걸은 곳 전체를 보기에 가장 좋은 자리입니다. 톈안먼 광장은 반대편 끝에 있으니 들어가기 전에 보세요.",
      skip: "전에 와 봤고 진보관에도 관심이 없거나, 일행 중에 돌바닥 3시간을 걷기 어려운 분이 있다면요. 그럴 때는 경산공원만 올라도 40분이면 자금성 전체의 모습을 볼 수 있습니다.",
    },
  },
  "west-lake": {
    en: {
      description:
        "Why West Lake is free, what shaped it, the three places not to miss, the best hours and seasons, and how to fit it with Lingyin Temple in one day.",
      why: [
        "West Lake is less a sight than the reason Hangzhou looks the way it does. For more than a thousand years, poets and governors reshaped it: dredging the lake, building causeways from the mud, naming its views, until the lake itself became a picture that gardens across China, Japan and Korea copied. That is why UNESCO listed it as a cultural landscape in 2011.",
        "It is also free. The shore is an open park about 15 kilometres around, with no gate and no ticket, open all day. What you pay for is a boat, a pagoda, and your time.",
        "Come for softness, not drama: willows, low hills, mist, a pagoda on the skyline. On a grey spring morning it looks like the ink paintings it inspired.",
      ],
      highlights: [
        {
          name: "The Su Causeway",
          body: "Almost three kilometres of willows and peach trees straight across the lake, built in 1090 from dredged mud when the poet Su Dongpo governed Hangzhou. Six arched bridges break it up. Walk it early, before the tour groups.",
        },
        {
          name: "Three Pools Mirroring the Moon",
          body: "Three small stone pagodas standing in the water beside an island you can only reach by boat. You may have seen them already: they are on the back of the one-yuan note.",
        },
        {
          name: "Leifeng Pagoda",
          body: "The pagoda of the White Snake legend. The original, from 977, collapsed in 1924; the one standing now was finished in 2002 over its ruins, which you can still see inside. The top floor looks back across the whole lake.",
        },
      ],
      time: "Half a day for a boat to the island, the Su Causeway on foot and one pagoda. A full day if you add Lingyin Temple on the west side.",
      when: "Early morning, before eight, when the causeway is still quiet. Spring (willows, and peach blossom on the Su Causeway) and summer lotus, roughly late June to August, are the classic seasons. Avoid the May Day holiday and the first week of October, when the whole shore fills.",
      pair: "Lingyin Temple and Feilai Peak are about half an hour west by car, and the Longjing tea villages are in the hills nearby.",
      skip: "Anyone who wants dramatic scenery. West Lake is gentle, and on a hazy day the hills disappear altogether. It is a place for a long walk and a slow boat.",
    },
    zh: {
      description: "西湖为什么不收门票、它是怎样被一代代人造出来的、别错过的三处、最好的时段与季节，以及怎样和灵隐寺排在同一天。",
      why: [
        "与其说西湖是一个景点，不如说它是杭州之所以是杭州的原因。一千多年里，诗人和地方官不断改造它：清理湖底的泥，用挖出的泥筑堤，给景致题名，直到湖本身成了一幅画，被中国各地乃至日本、朝鲜半岛的园林模仿。2011 年它以“文化景观”列入世界遗产，看重的正是这一点。",
        "它也不收门票。环湖约 15 公里，是全天开放的公园，没有大门，也没有检票口。真正要花的，是游船、塔，还有时间。",
        "来这里要的是柔和，不是震撼：垂柳、低低的山、薄雾，天边一座塔。春天阴天的早晨，它就像那些受它启发的水墨画。",
      ],
      highlights: [
        {
          name: "苏堤",
          body: "近 3 公里的长堤纵贯湖面，两旁是柳树和桃树。1090 年苏东坡任杭州知州，清理西湖时用挖出的湖泥筑成，堤上有六座拱桥。趁旅行团到来之前，早上去走。",
        },
        {
          name: "三潭印月",
          body: "三座小石塔立在水中，旁边的小岛只能坐船上去。你很可能早就见过它们：一元纸币背面印的就是。",
        },
        {
          name: "雷峰塔",
          body: "白蛇传里的那座塔。原塔建于 977 年，1924 年倒塌；现在的塔 2002 年落成，建在旧塔遗址上，塔里还能看到旧塔的塔基。登上顶层，可以回望整个湖面。",
        },
      ],
      time: "半天：坐船上岛，步行走完苏堤，再登一座塔。加上西边的灵隐寺，就是一整天。",
      when: "清晨八点前，苏堤还很安静。春天看柳、看苏堤桃花，夏天看荷花（大约六月下旬到八月），是最经典的季节。避开五一和国庆黄金周，那时整个湖边都挤满了人。",
      pair: "灵隐寺和飞来峰在西边，开车约半小时；龙井茶村就在附近的山里。",
      skip: "想看壮观风景的人。西湖是温和的，天气灰蒙蒙时，远山会整个消失。来这里，是为了长长地走一段路，慢慢地坐一趟船。",
    },
    ko: {
      description: "서호가 무료인 이유, 호수를 만든 사람들, 놓치지 말아야 할 세 곳, 좋은 시간대와 계절, 영은사와 하루에 묶는 법까지.",
      why: [
        "서호는 관광지라기보다 항저우가 지금 모습이 된 이유입니다. 천 년이 넘는 동안 시인과 관리들이 호수를 가꿨습니다. 바닥의 진흙을 퍼내 그 흙으로 제방을 쌓고, 풍경마다 이름을 붙였습니다. 그러다 호수 자체가 한 폭의 그림이 되었고, 중국 각지는 물론 일본과 한국의 정원도 이를 본보기로 삼았습니다. 2011년 '문화경관'으로 세계유산에 오른 이유도 바로 여기에 있습니다.",
        "입장료도 없습니다. 둘레 약 15km의 호숫가는 문도 매표소도 없이 하루 종일 열려 있는 공원입니다. 돈이 드는 건 유람선과 탑, 그리고 시간입니다.",
        "웅장함보다는 부드러움을 보러 오는 곳입니다. 버드나무, 낮은 산, 물안개, 하늘선 위의 탑 하나. 흐린 봄날 아침이면 이 호수에서 영감을 받은 수묵화처럼 보입니다.",
      ],
      highlights: [
        {
          name: "소제",
          body: "호수를 가로지르는 3km 가까운 제방으로, 버드나무와 복숭아나무가 늘어서 있습니다. 1090년 소동파가 항저우를 다스릴 때 호수를 준설하며 나온 진흙으로 쌓았고, 아치형 다리 여섯 개가 놓여 있습니다. 단체 관광객이 오기 전, 아침에 걸어 보세요.",
        },
        {
          name: "삼담인월",
          body: "물 위에 작은 돌탑 세 개가 서 있고, 옆의 작은 섬은 배로만 갈 수 있습니다. 이미 본 적이 있을지도 모릅니다. 1위안 지폐 뒷면의 그림이 바로 이곳입니다.",
        },
        {
          name: "뇌봉탑",
          body: "백사전 이야기에 나오는 탑입니다. 977년에 세운 원래 탑은 1924년에 무너졌고, 지금의 탑은 2002년 그 터 위에 완공했습니다. 탑 안에서 옛 탑의 기단을 볼 수 있고, 꼭대기 층에서는 호수 전체가 내려다보입니다.",
        },
      ],
      time: "반나절이면 배로 섬에 들르고, 소제를 걷고, 탑 하나에 오를 수 있습니다. 서쪽의 영은사까지 더하면 하루 일정입니다.",
      when: "아침 8시 전, 소제가 아직 한산할 때가 좋습니다. 버드나무와 소제의 복숭아꽃이 피는 봄, 연꽃이 피는 여름(대략 6월 하순~8월)이 대표적인 계절입니다. 노동절 연휴와 10월 첫 주 국경절 연휴에는 호숫가 전체가 사람으로 가득합니다.",
      pair: "영은사와 비래봉은 서쪽으로 차로 30분 정도, 용정 차 마을은 그 근처 산속에 있습니다.",
      skip: "웅장한 풍경을 기대하는 분이라면요. 서호는 잔잔하고, 날이 뿌연 날에는 먼 산이 아예 보이지 않습니다. 오래 걷고 천천히 배를 타러 오는 곳입니다.",
    },
  },
  hongyadong: {
    en: {
      description:
        "What Hongyadong really is, the three places to see it from, when to arrive for the lights, and what to pair it with on the same evening in Chongqing.",
      why: [
        "Hongyadong is the picture most people have of Chongqing: eleven storeys of stilt-house-style buildings climbing a cliff above the Jialing River, every eave outlined in golden light after dark. It looks old. It was built in 2006, on the site of the cave and the old riverside quarter it is named after, in the style of the stilt houses that once lined both rivers here.",
        "Go for the outside, and for one very Chongqing trick: you walk in from a city street on the top floor and come out eleven floors down on the river road. The city is built on slopes so steep that the ground floor depends on which side you arrive from.",
        "Be clear about the inside: it is a vertical mall of snack stalls, souvenir shops and bars, and on holiday evenings the crowd can only move one way. The view is the point.",
      ],
      highlights: [
        {
          name: "Qiansimen Bridge",
          body: "Walk out along the footpath of the bridge right beside it. From about halfway across, you see the whole building lit, with the towers of the Yuzhong peninsula behind it.",
        },
        {
          name: "The riverside road",
          body: "Leave by the bottom floor, cross to the river side of the road and look up. This is the angle people compare with the bathhouse in Spirited Away.",
        },
        {
          name: "The north bank",
          body: "Across the Jialing River, the lit building, Qiansimen Bridge and the skyline of the peninsula all fit in one frame.",
        },
      ],
      time: "An hour or two, around dusk.",
      when: "Arrive just before the lights come on and stay into the evening. Weekday evenings are busy; during long national holidays, getting in alone can take an hour.",
      pair: "Jiefangbei, the pedestrian heart of the city centre, is about fifteen minutes' walk uphill. The other way, Chaotianmen, where the Jialing meets the Yangtze, is a short walk, and the night river cruises leave from there.",
      skip: "If you dislike crowds, don't go inside at all: see it from the bridge and you miss nothing.",
    },
    zh: {
      description: "洪崖洞到底是什么、从哪三个位置看它最好、几点到才赶得上亮灯，以及同一个晚上在重庆还能顺路去哪里。",
      why: [
        "多数人心里的重庆，就是洪崖洞这幅画面：十一层吊脚楼式的建筑贴着嘉陵江边的崖壁往上叠，入夜后每一道屋檐都勾着金色的灯。它看起来很老，其实建于 2006 年，建在同名的洪崖洞和老江边街区的原址上，仿的是当年两江沿岸成片的吊脚楼。",
        "值得看的是外观，还有一件很“重庆”的事：从城里一条马路走进去，是顶楼 11 楼；一路往下走到 1 楼，出来已经是江边的马路。这座城市建在陡坡上，“一楼”在哪，要看你从哪边进来。",
        "里面得说实话：是一座竖起来的商场，小吃、纪念品和酒吧，节假日晚上人流只能单向走。来看的，是它的样子。",
      ],
      highlights: [
        {
          name: "旁边的大桥上",
          body: "沿洪崖洞旁边那座大桥的人行道，走到桥中间一带，亮灯后的整栋建筑，连同背后渝中半岛的高楼，都在眼前。",
        },
        {
          name: "江边的马路",
          body: "从底层出口出来，走到马路靠江的一侧抬头看。这就是常被拿来和《千与千寻》里汤屋对比的角度。",
        },
        {
          name: "嘉陵江北岸",
          body: "过江到北岸，亮灯的洪崖洞、那座大桥和渝中半岛的天际线能放进同一个画面。",
        },
      ],
      time: "一到两个小时，赶在傍晚。",
      when: "赶在亮灯前到，留到晚上。平日晚上人也不少；国庆、春节这样的长假，光排队进去就可能要一个小时。",
      pair: "往坡上走十几分钟就是解放碑步行街。另一头步行不远是朝天门，嘉陵江在那里汇入长江，夜游两江的船也从那里开。",
      skip: "怕挤的人可以不进去，在桥上看就够了，什么都不会错过。",
    },
    ko: {
      description: "홍야동이 실제로 어떤 곳인지, 가장 잘 보이는 세 자리, 조명에 맞춰 도착하는 시간, 같은 날 저녁 충칭에서 함께 들르기 좋은 곳까지.",
      why: [
        "많은 사람이 떠올리는 충칭의 모습이 바로 홍야동입니다. 11층짜리 조각루 양식 건물이 자링강 절벽을 따라 층층이 올라가고, 밤이 되면 처마마다 금빛 조명이 켜집니다. 오래된 건물 같지만 2006년에 지었습니다. 같은 이름의 동굴과 옛 강변 마을 자리에, 예전 두 강가를 따라 늘어서 있던 조각루를 본떠 세웠습니다.",
        "볼거리는 바깥 모습, 그리고 아주 충칭다운 경험 하나입니다. 시내 도로에서 걸어 들어가면 그곳이 꼭대기 11층이고, 계속 내려와 1층으로 나가면 강변 도로입니다. 언덕이 워낙 가파른 도시라, '1층'이 어디인지는 어느 쪽으로 들어오느냐에 달렸습니다.",
        "안쪽은 솔직히 말해 세로로 세운 쇼핑몰입니다. 먹거리 노점, 기념품 가게, 바가 이어지고, 연휴 저녁에는 한 방향으로만 걸을 수 있을 만큼 붐빕니다. 보러 가는 건 건물의 겉모습입니다.",
      ],
      highlights: [
        {
          name: "천사문대교",
          body: "바로 옆 천사문대교의 보행로를 따라 다리 중간쯤까지 걸어가 보세요. 불이 켜진 건물 전체와 그 뒤 위중 반도의 빌딩숲이 한눈에 들어옵니다.",
        },
        {
          name: "강변 도로",
          body: "1층 출구로 나와 도로의 강 쪽으로 건너가서 올려다보세요. 영화 '센과 치히로의 행방불명'의 온천장과 자주 비교되는 바로 그 각도입니다.",
        },
        {
          name: "자링강 북쪽 강변",
          body: "강을 건너 북쪽 강변에서 보면 불 켜진 홍야동, 천사문대교, 위중 반도의 스카이라인이 한 화면에 담깁니다.",
        },
      ],
      time: "해 질 무렵 1~2시간.",
      when: "조명이 켜지기 직전에 도착해 밤까지 머무르세요. 평일 저녁에도 사람이 많고, 국경절이나 춘절 같은 긴 연휴에는 들어가는 데만 한 시간이 걸릴 수 있습니다.",
      pair: "해방비 보행가는 언덕길로 15분쯤 걸으면 나옵니다. 반대쪽으로 조금 걸으면 자링강이 장강과 만나는 조천문이 있고, 밤 유람선도 여기서 출발합니다.",
      skip: "사람 많은 곳이 싫다면 안에 들어가지 말고 다리 위에서만 보셔도 됩니다. 놓치는 건 없습니다.",
    },
  },
};

export function getSightStory(id: SightId, locale: HomegroundLocale): SightStory | null {
  return sightStories[id]?.[locale] ?? null;
}
