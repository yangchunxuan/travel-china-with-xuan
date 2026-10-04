import type { DestinationHubId } from "./destinationHubs";
import type { DestinationOverviewSignalId } from "./destinationOverviewProjection";
import type { HomegroundLocale } from "./homegroundI18n";

/**
 * The four city decisions, written by hand: a one-line answer a traveller can
 * act on, then the reason in plain words. A city listed here shows these
 * instead of the cards projected from its research body; the facts must
 * agree with that body (content/destinations/<city>/body.*.ts).
 */
export interface CityOverviewCard {
  readonly answer: string;
  readonly detail: string;
}

/** Why the city belongs on a first trip, shown under the map in place of the research body's opening. */
export interface CityOpening {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

type CityOverview = Readonly<
  Record<HomegroundLocale, Readonly<Record<DestinationOverviewSignalId, CityOverviewCard>>>
>;

export const cityOverviewCards: Partial<Record<DestinationHubId, CityOverview>> = {
  beijing: {
    en: {
      nights: {
        answer: "Four or five nights give you three or four full days.",
        detail:
          "Arrival and departure days mostly go to travel. Three nights still cover the Forbidden City and the Great Wall, but the Summer Palace usually drops out, and if a booking falls through there is no spare day to move it to.",
      },
      stay: {
        answer: "First time? Stay around Wangfujing or Dongdan.",
        detail:
          "The Forbidden City is close, subway lines run in every direction and dinner is easy to find. For a courtyard hotel in the hutongs, look around Gulou and Shichahai, but ask first about lifts and whether a car can reach the door.",
      },
      gateway: {
        answer: "Check which airport and station your tickets name, then book the hotel.",
        detail:
          "Beijing has two airports, Capital and Daxing, and eight major railway stations, all far apart. Landing late at Capital? Spend the first night near Dongzhimen. Trains to Shanghai often leave from Beijing South, trains to Xi'an often from Beijing West. Keep the day you leave free of big sights.",
      },
      next: {
        answer: "Xi'an follows most naturally; Shanghai is the biggest contrast.",
        detail:
          "A high-speed train takes you on to Xi'an for the Terracotta Warriors and the old city wall. Shanghai swaps the old capital for skyscrapers. With enough time, Beijing, Xi'an and Shanghai link up in one line by high-speed rail.",
      },
    },
    zh: {
      nights: {
        answer: "住四到五晚，能玩满三四天。",
        detail:
          "到达和离开那两天，基本都花在路上。只住三晚也能走完故宫和长城，但颐和园多半要放弃；预约一旦没约上，也没有空出来的一天可以挪。",
      },
      stay: {
        answer: "第一次来，住王府井或东单。",
        detail:
          "离故宫不远，地铁往哪个方向都方便，晚上出门吃饭也好找。想住胡同里的四合院，就选鼓楼、什刹海一带，但先问清楚有没有电梯、车能不能开到门口。",
      },
      gateway: {
        answer: "先看票上写的机场和车站，再订酒店。",
        detail:
          "北京有首都、大兴两座机场和八座主要火车站，彼此离得很远。晚上落地首都机场，第一晚住东直门一带最省事；去上海的高铁常从北京南站走，去西安的常从北京西站走。离开那天，别再排大景点。",
      },
      next: {
        answer: "西安最顺路，上海反差最大。",
        detail:
          "坐高铁去西安，接着看兵马俑、走古城墙；去上海，则是从古都一下跳进摩天大楼。时间够的话，北京—西安—上海一路坐高铁就能连起来。",
      },
    },
    ko: {
      nights: {
        answer: "4~5박이면 3~4일을 온전히 즐길 수 있습니다.",
        detail:
          "도착하는 날과 떠나는 날은 대부분 이동에 씁니다. 3박으로도 자금성과 만리장성은 볼 수 있지만 이화원은 보통 빠지고, 예약이 어긋나면 옮길 하루가 남지 않습니다.",
      },
      stay: {
        answer: "처음이라면 왕푸징이나 둥단에 묵으세요.",
        detail:
          "자금성과 가깝고 지하철로 어느 방향이든 다니기 편하며, 저녁 먹을 곳도 많습니다. 후퉁의 사합원 숙소를 원한다면 구러우·스차하이 일대를 고르되, 엘리베이터가 있는지, 차가 문 앞까지 들어가는지 먼저 물어보세요.",
      },
      gateway: {
        answer: "표에 적힌 공항과 역부터 확인하고 숙소를 정하세요.",
        detail:
          "베이징에는 서우두·다싱 두 공항과 주요 기차역 여덟 곳이 있고, 서로 멀리 떨어져 있습니다. 밤늦게 서우두공항에 내리면 첫날은 둥즈먼 근처가 편합니다. 상하이행 고속열차는 베이징남역, 시안행은 베이징서역에서 출발하는 경우가 많습니다. 떠나는 날에는 큰 명소를 넣지 마세요.",
      },
      next: {
        answer: "시안이 가장 자연스럽고, 상하이는 대비가 가장 큽니다.",
        detail:
          "고속열차로 시안에 가서 병마용과 옛 성벽을 보고, 상하이에서는 옛 수도에서 단숨에 고층 빌딩 숲으로 넘어갑니다. 시간이 넉넉하다면 베이징–시안–상하이를 고속열차로 한 번에 이을 수 있습니다.",
      },
    },
  },
  shanghai: {
    en: {
      nights: {
        answer: "Four nights give you three full days.",
        detail:
          "Arrival and departure days mostly go to travel. Three nights still leave two full days: one for the Bund, the Old City and Yu Garden, one for People's Square with Jing'an or Lujiazui. Disneyland or a Suzhou trip takes a whole day, so add a night if you still want three days in the city.",
      },
      stay: {
        answer: "First time? Stay in central Puxi, around People's Square.",
        detail:
          "Metro lines meet here, and East Nanjing Road leads you on foot to the Bund. For tree-lined streets and dinners out, try Jing'an or the Former French Concession, but check which metro stop is really nearby. Cross the river for Lujiazui's towers; most first-trip days are spent in Puxi.",
      },
      gateway: {
        answer: "Check your tickets: Pudong and Hongqiao are at opposite ends of town.",
        detail:
          "Most long-haul flights land at Pudong (PVG), east of the centre. Far west, Hongqiao has the second airport (SHA) and the main high-speed station, though some trains use Shanghai Railway Station, nearer People's Square. After a long flight with heavy bags, a taxi is often easier than Metro Line 2.",
      },
      next: {
        answer: "Hangzhou is the natural next stop; Suzhou works as a day trip.",
        detail:
          "Hangzhou's West Lake, tea hills and Lingyin Temple are spread out, and the lake is worth seeing early and late, so stay at least a night. Suzhou's highlights sit closer together, and one garden plus the old streets make a good day out from Shanghai. If Nanjing is on your list, give it its own stay.",
      },
    },
    zh: {
      nights: {
        answer: "住四晚，能玩满三天。",
        detail:
          "到达和离开那两天，基本花在路上。只住三晚，也能玩满两天：一天给外滩、老城厢和豫园，一天给人民广场，再加静安或陆家嘴。迪士尼或去苏州都要占一整天，还想在市区玩满三天，就再加一晚。",
      },
      stay: {
        answer: "第一次来，住浦西人民广场一带。",
        detail:
          "这里是地铁换乘站，去浦西各处都方便，顺着南京东路步行街就能走到外滩。想住在林荫道边、晚上出门吃饭方便，就看静安或原法租界一带，但要查清酒店到底离哪个地铁站近。陆家嘴的高楼过江去看就好，第一次来，多数日子都在浦西。",
      },
      gateway: {
        answer: "先看票：浦东机场和虹桥在城市两头。",
        detail:
          "远程国际航班大多落在城东的浦东机场。虹桥远在城西，有虹桥机场和主要的高铁站；也有些车从离人民广场更近的上海站发车，买票前看清站名。地铁 2 号线能从浦东机场进城，但长途飞行后带着大行李，打车往往更省力。",
      },
      next: {
        answer: "下一站去杭州，苏州可以当天往返。",
        detail:
          "杭州的西湖、茶山和灵隐寺分得比较散，清早和傍晚的湖边也值得待一待，至少住一晚。苏州第一次去要看的地方比较集中，挑一座园林加老街，从上海去一天就够。南京如果想去，最好也单独住下。",
      },
    },
    ko: {
      nights: {
        answer: "4박이면 3일을 온전히 즐길 수 있습니다.",
        detail:
          "도착하는 날과 떠나는 날은 대부분 이동에 씁니다. 3박으로도 온전한 이틀이 남아, 하루는 와이탄·구시가·예원을, 하루는 인민광장과 징안 또는 루자쭈이를 볼 수 있습니다. 디즈니랜드나 쑤저우는 하루를 통째로 쓰니, 시내에서 3일을 보내고 싶다면 하룻밤을 더하세요.",
      },
      stay: {
        answer: "처음이라면 푸시의 인민광장 근처에 묵으세요.",
        detail:
          "여러 지하철 노선이 만나 푸시 어디로든 다니기 편하고, 난징둥루를 따라 걸으면 와이탄에 닿습니다. 가로수길과 저녁 식사를 가까이 두고 싶다면 징안이나 옛 프랑스 조계도 좋지만, 호텔이 실제로 어느 지하철역에 가까운지 먼저 확인하세요. 루자쭈이 빌딩 숲은 강을 건너가 보면 되고, 첫 여행은 대부분 푸시에서 보냅니다.",
      },
      gateway: {
        answer: "푸둥공항과 홍차오는 도시 양 끝에 있으니 표부터 확인하세요.",
        detail:
          "장거리 국제선은 대부분 도심 동쪽의 푸둥공항(PVG)에 내립니다. 먼 서쪽 홍차오에는 홍차오공항(SHA)과 주요 고속철도역이 있고, 일부 열차는 인민광장과 가까운 상하이역에서 출발하니 역 이름을 꼭 확인하세요. 지하철 2호선으로도 시내에 가지만, 긴 비행 뒤 짐이 무겁다면 택시가 편할 때가 많습니다.",
      },
      next: {
        answer: "다음은 항저우가 자연스럽고, 쑤저우는 당일치기로 좋습니다.",
        detail:
          "항저우의 서호와 차밭, 영은사는 서로 떨어져 있고 서호의 이른 아침과 저녁 분위기도 놓치기 아까우니 하룻밤은 묵으세요. 쑤저우는 볼거리가 모여 있어 정원 하나와 옛 거리를 골라 상하이에서 하루 다녀오면 됩니다. 난징까지 넣는다면 따로 묵으세요.",
      },
    },
  },
  xian: {
    en: {
      nights: {
        answer: "Three nights give you a full day for the warriors and one for the city.",
        detail:
          "Arrival and departure days mostly go to travel. With two nights, most people spend their one full day on the Terracotta Warriors; a third night gives the city a day of its own. Adding Mount Hua? It needs another whole day, so make it four nights.",
      },
      stay: {
        answer: "First time? Stay near the Bell Tower, inside the city wall.",
        detail:
          "The Drum Tower and the food lanes of the Muslim Quarter are a short walk away, so dinner is easy. It gets crowded and noisy; ask for a quiet-side room and check that a car can reach the door. If the museum and the Giant Wild Goose Pagoda are what you came for, stay at Dayanta or Xiaozhai instead.",
      },
      gateway: {
        answer: "Check which of Xi'an's three main stations your ticket names.",
        detail:
          "Xi'an North, the main high-speed station, is a ride from the Bell Tower, not a walk. Xi'an Railway Station sits just north of the old city wall, and Xi'an East opened in June 2026, so older guides may leave it out. Flying? XIY is northwest, towards Xianyang; go to the terminal your airline names.",
      },
      next: {
        answer: "Go on to Chengdu or Beijing; Xi'an sits on the line between them.",
        detail:
          "Beijing, Xi'an and Chengdu make one line, in either direction. Chengdu swaps clay soldiers and city walls for Sichuan food and neighbourhood life; Beijing jumps ahead to the capital of China's later emperors. Reaching Chengdu late? Keep the next morning free of timed visits.",
      },
    },
    zh: {
      nights: {
        answer: "住三晚，兵马俑一天，城里一天。",
        detail:
          "到达和离开那两天，基本都花在路上。只住两晚，唯一完整的一天多半给了兵马俑；多住一晚，才轮得到西安城里。想去华山，还得再留一整天，那就住四晚。",
      },
      stay: {
        answer: "第一次来，住城墙内的钟楼一带。",
        detail:
          "走几步就是鼓楼和回民街的小吃巷子，晚上出门吃饭很方便。这一带人多、吵，订房时请酒店安排安静一侧的房间，再问清车能不能开到门口。如果是冲着陕西历史博物馆和大雁塔来的，就住大雁塔、小寨一带。",
      },
      gateway: {
        answer: "西安有三个大站，先看票上是哪个。",
        detail:
          "西安北站是主要的高铁站，在城北，到钟楼得坐车，走不过去；西安站就在老城墙北边；西安东站 2026 年 6 月才启用，旧攻略里可能根本没有。坐飞机的话，咸阳机场在城西北的咸阳一侧，去哪个航站楼，以航空公司通知为准。",
      },
      next: {
        answer: "接着去成都或北京，西安正夹在中间。",
        detail:
          "北京、西安、成都连成一条线，正着走、倒着走都顺。去成都，从兵马俑和城墙换成川菜和街巷生活；去北京，则从早期的帝王陵墓，走进后来皇帝的都城。晚上才到成都的话，第二天上午别排约好时间的景点。",
      },
    },
    ko: {
      nights: {
        answer: "3박이면 병마용에 하루, 시내에 하루를 쓸 수 있습니다.",
        detail:
          "도착하는 날과 떠나는 날은 대부분 이동에 씁니다. 2박이면 하나뿐인 온전한 하루를 대개 병마용에 쓰게 되고, 하룻밤을 더해야 시내에도 하루를 줄 수 있습니다. 화산까지 넣으려면 하루가 더 필요하니 4박으로 잡으세요.",
      },
      stay: {
        answer: "처음이라면 성벽 안 종루 근처에 묵으세요.",
        detail:
          "고루와 회족거리 먹자골목이 가까워 저녁 먹으러 나가기 편합니다. 사람이 많고 시끄러울 수 있으니 조용한 쪽 객실을 부탁하고, 차가 문 앞까지 들어가는지도 물어보세요. 산시역사박물관과 대안탑을 보러 왔다면 대안탑·샤오자이 일대가 낫습니다.",
      },
      gateway: {
        answer: "시안의 주요 기차역은 세 곳, 표에 적힌 역부터 확인하세요.",
        detail:
          "주요 고속철도역인 시안북역은 도심 북쪽에 있어 종루까지 걸어갈 거리가 아닙니다. 시안역은 옛 성벽 바로 북쪽이고, 시안동역은 2026년 6월에 문을 열어 예전 정보에는 없기도 합니다. 비행기라면 XIY 공항은 북서쪽 셴양 방면이니, 항공사가 안내한 터미널로 가세요.",
      },
      next: {
        answer: "청두나 베이징으로 이어 가는 게 가장 자연스럽습니다.",
        detail:
          "베이징–시안–청두는 어느 방향으로든 한 줄로 이어집니다. 청두에서는 병마용과 성벽 대신 쓰촨 음식과 동네 생활을, 베이징에서는 후대 황제들의 도읍을 만납니다. 청두에 밤늦게 도착한다면 다음 날 오전에는 입장 시간을 예약한 명소를 넣지 마세요.",
      },
    },
  },
  chengdu: {
    en: {
      nights: {
        answer: "Three nights give you two full days in the city.",
        detail:
          "Land in the evening and the first day is just dinner. Three nights give the pandas a morning of their own, and tea in People's Park and Wuhou Shrine another day. Add Sichuan opera after dark if you still have the energy. A fourth night adds one day out, to Sanxingdui, Dujiangyan or Leshan.",
      },
      stay: {
        answer: "First time? Stay around Chunxi Road and Taikoo Li.",
        detail:
          "Dinner and evening streets are on your doorstep, Daci Temple is close and the metro runs in several directions. A hotel “near Taikoo Li” can open deep inside a mall, so check the walk from the metro and where a car can stop. For slow tea-house mornings, look at Kuanzhai Alleys or People's Park.",
      },
      gateway: {
        answer: "Check whether your ticket says Tianfu or Shuangliu, then plan the ride.",
        detail:
          "Tianfu lies far to the south-east, a long ride in even with Metro Line 18; Shuangliu, to the south-west, is usually closer to the centre. Flights move between the two, so check again shortly before you fly. Many high-speed trains use Chengdu East, but South and West are separate stations.",
      },
      next: {
        answer: "Chongqing is the natural next stop, steeper and faster than Chengdu.",
        detail:
          "After slow days of tea houses and long meals, the contrast is the reason to go. To see more of Sichuan instead, sleep a night at Leshan or Dujiangyan so the day out is not a race. Jiuzhaigou, in the mountains far to the north, needs several days and beds of its own.",
      },
    },
    zh: {
      nights: {
        answer: "住三晚，能玩满两天。",
        detail:
          "晚上落地，第一天只够吃顿晚饭。住三晚，熊猫能单独占一个上午，人民公园喝茶和武侯祠另排一天，有力气的话晚上再看场川剧。多住一晚，可以再去三星堆、都江堰或乐山其中一处。",
      },
      stay: {
        answer: "第一次来，住春熙路、太古里一带。",
        detail:
          "出门就有吃饭、晚上逛街的地方，离大慈寺近，地铁往几个方向都方便。“太古里附近”的酒店，入口可能藏在商场深处，先问清从地铁站怎么走、车停在哪里。想早上慢慢喝茶，就看宽窄巷子、人民公园一带。",
      },
      gateway: {
        answer: "先看机票上写的是天府还是双流。",
        detail:
          "天府机场在东南边，离市区远，坐地铁 18 号线也要不少时间；双流在西南，通常离市中心更近。航班会在两座机场之间调换，临走前再确认一次。很多高铁从成都东站走，但南站、西站是另外的车站，以车票为准。",
      },
      next: {
        answer: "下一站去重庆，坡更陡，节奏更快。",
        detail:
          "在成都慢慢喝茶、慢慢吃饭过了几天，再去重庆，一慢一快，反差正好。想多看看四川，就在乐山或都江堰住一晚，不用当天赶回。九寨沟远在北边的山里，要单独留出好几天，在那里住下。",
      },
    },
    ko: {
      nights: {
        answer: "3박이면 이틀을 온전히 즐길 수 있습니다.",
        detail:
          "저녁에 도착하면 첫날은 저녁 식사가 전부입니다. 3박이면 판다기지에 오전 하나를 따로 주고, 인민공원 찻집과 무후사에 또 하루를 줄 수 있으며, 힘이 남으면 저녁에 천극 공연도 볼 수 있습니다. 하루 더 묵으면 싼싱두이·도강언·낙산 중 한 곳을 다녀올 수 있습니다.",
      },
      stay: {
        answer: "처음이라면 춘시루·타이쿠리 일대에 묵으세요.",
        detail:
          "문만 나서면 식당과 밤거리가 있고, 다츠사도 가까우며 지하철로 여러 방향에 가기 편합니다. ‘타이쿠리 근처’ 호텔은 입구가 쇼핑몰 깊숙이 있을 수 있으니, 지하철역에서 걷는 길과 차를 대는 곳을 먼저 확인하세요. 느긋한 찻집 아침을 원하면 관착항자·인민공원 쪽을 보세요.",
      },
      gateway: {
        answer: "항공권에 톈푸인지 솽류인지부터 확인하세요.",
        detail:
          "톈푸공항은 남동쪽으로 멀어 지하철 18호선을 타도 오래 걸리고, 남서쪽 솽류공항은 대체로 도심에 더 가깝습니다. 두 공항 사이에 노선이 옮겨 다니니 출발 전에 다시 확인하세요. 고속열차는 청두동역을 많이 쓰지만, 남역과 서역은 별개의 역이니 표에 적힌 역을 따르세요.",
      },
      next: {
        answer: "다음 도시로는 더 가파르고 빠른 충칭이 자연스럽습니다.",
        detail:
          "찻집과 느긋한 식사로 며칠을 보낸 뒤라면, 확 바뀌는 속도 자체가 즐거움입니다. 쓰촨을 더 보고 싶다면 낙산이나 도강언에서 하룻밤 묵어 당일 일정에 쫓기지 마세요. 북쪽 멀리 산속에 있는 구채구는 며칠과 숙소를 따로 잡아야 합니다.",
      },
    },
  },
  guangzhou: {
    en: {
      nights: {
        answer: "Three nights give you two full days in the city.",
        detail:
          "Two nights give you one good day in the old west, plus the new city by the river or an unhurried arrival, not both. Chimelong takes a whole day of its own, so families often add a night for it. A food day in Shunde or a trip to Foshan needs one more.",
      },
      stay: {
        answer: "First time? Stay in Liwan, or around Beijing Road in Yuexiu.",
        detail:
          "In Liwan, morning tea is close at hand, the Chen Clan Ancestral Hall, Yongqingfang and Shamian make one easy day on foot, and evenings are slow. Beijing Road is more central, with museums nearby and metro lines across the city. Check the real walk from hotel to metro, not just the district.",
      },
      gateway: {
        answer: "Check your airport terminal and train station, then book the hotel.",
        detail:
          "Baiyun Airport now uses only T2 and T3; T1 has been closed to passengers since May 2026. T3 has no metro station of its own, so take Line 3 or 9 to Gaozeng and the airport bus, or a taxi with heavy bags. For Hong Kong, look first at Guangzhou South, out in Panyu, and allow time to get there.",
      },
      next: {
        answer: "Hong Kong is the natural next stop; give it at least one night.",
        detail:
          "High-speed trains run from Guangzhou South to Hong Kong West Kowloon, but Hong Kong has its own entry process, so it makes a poor day trip. For a day out, choose Foshan or Shunde, and Shunde if food is the point. Shenzhen lies on the way; stay there only for something you really want to do.",
      },
    },
    zh: {
      nights: {
        answer: "住三晚，能在城里玩满两天。",
        detail:
          "只住两晚，能好好逛一天西边老城，再看江边新城，或让到达那天松快些，两样只能选一样。长隆要单独玩一整天，带孩子的常为它多住一晚；想去顺德吃一天或去佛山看看，还得再加一晚。",
      },
      stay: {
        answer: "第一次来，住荔湾或北京路一带。",
        detail:
          "住荔湾，饮早茶方便，陈家祠、永庆坊和沙面走路一天就能慢慢逛完，晚上也清静。越秀的北京路更居中，附近有博物馆，坐地铁去哪儿都方便。订房前看清酒店到地铁口的实际路线，别只看区名。",
      },
      gateway: {
        answer: "先看航站楼和火车站，再订酒店。",
        detail:
          "白云机场现在只用 T2 和 T3，T1 从 2026 年 5 月起停止客运。T3 没有直达的地铁站，可坐 3 号线或 9 号线到高增站换机场巴士，行李多就打车。去香港先查广州南站，它在番禺，要留足去车站的时间。",
      },
      next: {
        answer: "下一站去香港，至少住上一晚。",
        detail:
          "广州南站有高铁直达香港西九龙，但去香港要过关入境，当天来回很折腾。想出城玩一天，佛山、顺德更合适，专门去吃就选顺德。深圳在去香港的路上，没有特别想做的事，就不必为它多住一晚。",
      },
    },
    ko: {
      nights: {
        answer: "3박이면 시내에서 이틀을 온전히 보낼 수 있습니다.",
        detail:
          "2박이면 서쪽 옛 도심을 하루 제대로 보고, 강변 새 도심과 여유로운 도착일 중 하나만 고를 수 있습니다. 침롱은 하루가 통째로 필요해 가족 여행이면 흔히 1박을 더하고, 순더에서 먹으러 다니는 하루나 포산 나들이에는 1박을 더 잡으세요.",
      },
      stay: {
        answer: "처음이라면 리완이나 베이징루 일대에 묵으세요.",
        detail:
          "리완은 얌차를 즐기기 좋고, 진가사·융칭팡·사면도를 하루에 걸어서 느긋하게 돌 수 있으며 저녁도 한가롭습니다. 웨슈의 베이징루는 더 중심이라 박물관이 가깝고 지하철로 어디든 가기 편합니다. 구역 이름보다 호텔에서 지하철까지 걷는 길을 확인하세요.",
      },
      gateway: {
        answer: "공항 터미널과 기차역부터 확인하고 숙소를 정하세요.",
        detail:
          "바이윈공항은 이제 T2와 T3만 쓰고, T1은 2026년 5월부터 여객 운영을 멈췄습니다. T3에는 바로 닿는 지하철역이 없어 3호선이나 9호선으로 가오정역에 가서 공항 셔틀버스를 타고, 짐이 많으면 택시가 편합니다. 홍콩행은 판위의 광저우남역부터 찾아보고, 역까지 갈 시간을 넉넉히 잡으세요.",
      },
      next: {
        answer: "다음은 홍콩으로 이어 가고, 1박 이상은 머무세요.",
        detail:
          "광저우남역에서 홍콩 웨스트카오룽까지 고속열차가 다니지만 홍콩은 입경 절차가 따로 있어 당일치기로는 번거롭습니다. 하루 나들이라면 포산이나 순더가 낫고, 음식이 목적이면 순더입니다. 선전은 가는 길목이지만 꼭 하고 싶은 일이 없다면 따로 묵지 마세요.",
      },
    },
  },
  hangzhou: {
    en: {
      nights: {
        answer: "Two nights give you the lake at dusk and dawn, plus the western hills.",
        detail:
          "A day trip from Shanghai fits one stretch of the lake, one more stop and the train back. Two nights let you walk the shore in the evening and again early next morning, with time left for Lingyin or the Longjing tea villages. Add a third night only if Liangzhu or the Grand Canal is why you came.",
      },
      stay: {
        answer: "First time? Stay on the east shore of West Lake, around Hubin.",
        detail:
          "This is where the city meets the lake, so hotels, shops and dinner are close and the shore is right there for an evening stroll. It is also the busiest side, and lake-view rooms are often poor value. For quiet, look at the Lingyin and Longjing side, but expect fewer metro links and busy hill roads.",
      },
      gateway: {
        answer: "Check the station on your ticket; Hangzhou West is not by the lake.",
        detail:
          "Hangzhou has Xiaoshan Airport (HGH) and four main railway stations: Hangzhou, East, West and South. East often has the most trains, many of them to Shanghai, but from there it is a ride across town to the lake. On a day trip from Shanghai, choose your train back before you book the one out.",
      },
      next: {
        answer: "Shanghai is the natural partner; go to Suzhou for gardens and canals.",
        detail:
          "Fast trains link the two cities, and Shanghai is where many trips to this part of China begin and end. Suzhou is a separate city, worth its own stop for gardens and canals. Flying home from Shanghai? Check whether it is Pudong or Hongqiao, because the journey from Hangzhou is different for each.",
      },
    },
    zh: {
      nights: {
        answer: "住两晚，湖边早晚和山里都顾得上。",
        detail:
          "从上海一日往返，只够看湖的一段、再去一个地方，就得赶车回去。住两晚，傍晚和第二天清晨都能在湖边走走，灵隐或龙井村也不用赶。只有专程为良渚或大运河而来，才值得加第三晚。",
      },
      stay: {
        answer: "第一次来，住西湖东岸的湖滨一带。",
        detail:
          "这里是城区和西湖相接的地方，酒店、商店、饭馆都多，吃完晚饭就能去湖边散步。这一侧游人也最多，湖景房常常不值那份差价。想清静，可以住灵隐、龙井一侧，只是地铁不太方便，山路也容易堵。",
      },
      gateway: {
        answer: "看清票上的车站，杭州西站不在西湖边。",
        detail:
          "杭州有萧山机场（HGH），还有杭州站、杭州东站、杭州西站、杭州南站四座主要火车站。东站车次通常最多，去上海的也多，但从东站到湖边还要穿过城区。从上海一日往返，先定好回程车次，再买去程。",
      },
      next: {
        answer: "上海最顺路，想看园林就去苏州。",
        detail:
          "两座城市之间坐高铁来往方便，来这一带的旅程也常从上海进出。苏州是另一座城市，冲着园林和运河去，值得专门停一站。要从上海坐飞机走，先看清是浦东还是虹桥，从杭州过去的路不一样。",
      },
    },
    ko: {
      nights: {
        answer: "2박이면 서호의 저녁과 아침, 서쪽 산까지 누립니다.",
        detail:
          "상하이 당일치기로는 호수 한 구간과 한 곳을 더 본 뒤 돌아가는 열차를 타야 합니다. 2박을 하면 저녁과 다음 날 이른 아침에 호숫가를 걷고, 영은사나 용정차 마을도 서두르지 않고 볼 수 있습니다. 3박째는 량주나 대운하가 여행의 목적일 때만 더하세요.",
      },
      stay: {
        answer: "처음이라면 서호 동쪽 물가, 후빈 일대에 묵으세요.",
        detail:
          "도시와 호수가 만나는 곳이라 호텔과 상점, 식당이 많고, 저녁을 먹고 호숫가를 산책하기 좋습니다. 다만 사람이 가장 많고, 호수 전망 객실은 추가 요금만큼의 가치가 없는 경우가 많습니다. 조용한 곳을 원하면 영은사·용정 쪽도 좋지만 지하철이 불편하고 산길이 막히기 쉽습니다.",
      },
      gateway: {
        answer: "항저우서역은 서호 옆이 아니니 표의 역부터 확인하세요.",
        detail:
          "항저우에는 샤오산공항(HGH)과 항저우역·항저우동역·항저우서역·항저우남역, 네 개의 주요 기차역이 있습니다. 동역은 대개 열차가 가장 많고 상하이행도 많지만, 호숫가까지는 시내를 가로질러 가야 합니다. 상하이 당일치기라면 돌아오는 열차부터 정하고 가는 표를 사세요.",
      },
      next: {
        answer: "상하이가 가장 자연스럽고, 정원을 보려면 쑤저우로 가세요.",
        detail:
          "두 도시는 고속열차로 쉽게 오가고, 이 지역 여행은 상하이로 들어오고 나가는 경우가 많습니다. 쑤저우는 정원과 운하를 보러 따로 들를 만한 별개의 도시입니다. 상하이에서 비행기로 떠난다면 푸둥인지 홍차오인지 먼저 확인하세요. 항저우에서 가는 길이 서로 다릅니다.",
      },
    },
  },
  zhangjiajie: {
    en: {
      nights: {
        answer: "Four or five nights give you three or four full days.",
        detail:
          "Arrival and departure days mostly go to travel. Three full days give the Forest Park two and Tianmen Mountain one; with only two, either the park shrinks to a day or Tianmen drops out. A fourth day lets you wait out fog, slow down or see the glass bridge at the Grand Canyon.",
      },
      stay: {
        answer: "Stay in Wulingyuan, just outside the Forest Park's East Gate.",
        detail:
          "You wake up beside the park and can be through the gate early on both park days. The airport, the station and Tianmen are all by the city, so sleep there after a late arrival, before an early departure or for your Tianmen day. Switch hotels only when the drive you save is worth packing up again.",
      },
      gateway: {
        answer: "Both DYG airport and Zhangjiajie West station are by the city.",
        detail:
          "Neither is at the park, so once you land or step off the train there is still a drive out to Wulingyuan. Arriving late? Sleep in the city and go out in the morning. Have your hotel's name and address in Chinese ready, and ride only in a licensed car.",
      },
      next: {
        answer: "After the mountains, spend a night in Fenghuang's old town.",
        detail:
          "Getting there is a journey of its own, so it won't work as a quick evening trip. Arrive for the evening, stay the night and walk the old town again the next morning. Heading to Beijing or Shanghai instead? Compare flights and trains by the whole door-to-door journey.",
      },
    },
    zh: {
      nights: {
        answer: "住四到五晚，能玩满三四天。",
        detail:
          "到达和离开那两天，基本都花在路上。三天正好排森林公园两天、天门山一天；只有两天的话，要么公园只看一天，要么放弃天门山。第四天可以等雾散、放慢脚步，或者去大峡谷走玻璃桥。",
      },
      stay: {
        answer: "住武陵源，就在森林公园东门外。",
        detail:
          "住这里一出门就是公园，逛公园的两天都能早早进园。机场、高铁站和天门山都在市区那边，晚到、早走或者上天门山那天，住市区更顺。换酒店得重新收拾行李，路上省下的时间够多才值得换。",
      },
      gateway: {
        answer: "荷花机场、张家界西站都在市区那边。",
        detail:
          "两处都不在公园门口，下了飞机或火车，还要坐一段车才到武陵源。夜里才到的话，第一晚就住市区，第二天早上再过去。提前备好酒店的中文名和地址，只坐正规的车。",
      },
      next: {
        answer: "看完山，去凤凰古城住一晚。",
        detail:
          "去凤凰要专门走一趟，不是傍晚顺便逛逛就能回来的。傍晚到，住一晚，第二天早上再到古城里走走。要是直接去北京或上海，就把飞机和高铁门到门的总时间比一比。",
      },
    },
    ko: {
      nights: {
        answer: "4~5박이면 3~4일을 온전히 즐길 수 있습니다.",
        detail:
          "도착하는 날과 떠나는 날은 대부분 이동에 씁니다. 사흘이면 삼림공원에 이틀, 천문산에 하루를 쓰고, 이틀뿐이면 공원을 하루로 줄이거나 천문산을 빼야 합니다. 나흘째에는 안개가 걷히길 기다리거나, 천천히 다니거나, 대협곡 유리다리를 더하세요.",
      },
      stay: {
        answer: "삼림공원 동문 바로 앞, 무릉원에 묵으세요.",
        detail:
          "아침에 나서면 바로 공원이라 공원에 가는 이틀 모두 일찍 들어갈 수 있습니다. 공항과 기차역, 천문산은 모두 시내 쪽이니 밤늦게 도착하는 날, 일찍 떠나는 날, 천문산 가는 날은 시내가 편합니다. 숙소는 아끼는 이동 시간이 짐을 다시 싸는 수고보다 클 때만 옮기세요.",
      },
      gateway: {
        answer: "DYG 허화공항과 장가계서역은 모두 시내 쪽에 있습니다.",
        detail:
          "둘 다 공원 입구에 있지 않아, 내린 뒤에도 무릉원 숙소까지 차로 더 가야 합니다. 밤늦게 도착한다면 첫날은 시내에 묵고 다음 날 아침에 무릉원으로 가세요. 숙소 이름과 주소를 중국어로 준비하고, 허가받은 차량만 타세요.",
      },
      next: {
        answer: "산을 본 뒤에는 봉황고성에서 하룻밤 묵으세요.",
        detail:
          "따로 이동해야 하는 곳이라 저녁에 잠깐 들렀다 오기는 어렵습니다. 저녁에 도착해 하룻밤 묵고, 다음 날 아침에도 고성을 걸어 보세요. 베이징이나 상하이로 바로 간다면 비행기와 고속열차를 문에서 문까지 걸리는 시간으로 비교하세요.",
      },
    },
  },
  chongqing: {
    en: {
      nights: {
        answer: "Three nights give you two full days in the city.",
        detail:
          "Arrival and departure days mostly go to travel, and two nights leave a single day, enough for Yuzhong alone. Wulong's stone bridges and Dazu's carvings each take a whole day, so add at least one night for either. On the evening you arrive, find your hotel entrance and eat nearby.",
      },
      stay: {
        answer: "First time? Stay around Jiefangbei.",
        detail:
          "Hongyadong is about fifteen minutes' walk downhill, and Shibati and Chaotianmen are within easy reach. Guanyinqiao, across the river, suits late dinners and shopping, but most mornings then start with a crossing. Streets sit on several levels, so ask which floor the lobby is on and where cars stop.",
      },
      gateway: {
        answer: "Check which of Chongqing's four main railway stations is on your ticket.",
        detail:
          "Chongqing North, West, Shapingba and East are separate stations, and high-speed trains to Wulong leave from Chongqing East on the south bank. Flights land at Jiangbei Airport, north of the centre. Landing late or carrying big suitcases? Take a car to the hotel's vehicle entrance, not the metro.",
      },
      next: {
        answer: "Chengdu is the natural partner, with frequent trains between the two.",
        detail:
          "Chengdu is flatter, with pandas and teahouses; Chongqing is steep and shaped by its rivers. Start with three nights in each, then give an extra night to Chongqing for Wulong, Dazu or a Yangtze cruise, or to Chengdu for more pandas and trips around Sichuan.",
      },
    },
    zh: {
      nights: {
        answer: "住三晚，能玩满两天。",
        detail:
          "到达和离开那两天基本都花在路上，住两晚就只够逛渝中一天。武隆天生三桥、大足石刻各要一整天，想去哪个，至少再加一晚。到的那晚先找准酒店入口，在附近吃顿饭就好。",
      },
      stay: {
        answer: "第一次来，住解放碑一带。",
        detail:
          "往坡下走十几分钟就到洪崖洞，十八梯、朝天门也都不远。更看重晚上吃饭逛街，可以住江对岸的观音桥，只是多数早上得先过江。这里街道高低错落，订房前问清大堂在几楼、车停在哪个入口。",
      },
      gateway: {
        answer: "四个主要火车站，先看票上是哪个。",
        detail:
          "重庆北、重庆西、沙坪坝、重庆东是四个不同的车站，去武隆的高铁从南岸的重庆东站走。飞机落在城北的江北机场；晚上落地或行李多，就直接坐车到酒店的车辆入口，不必挤轨道交通。",
      },
      next: {
        answer: "成都最顺路，两城之间火车多。",
        detail:
          "成都更平坦，看熊猫、泡茶馆；重庆坡陡，被两条江分开，两座城味道完全不同。先各住三晚；想去武隆、大足或坐长江游轮，就给重庆加一晚；想多看熊猫、去四川周边，就给成都加一晚。",
      },
    },
    ko: {
      nights: {
        answer: "3박이면 시내에서 온전한 이틀을 보낼 수 있습니다.",
        detail:
          "도착하는 날과 떠나는 날은 대부분 이동에 쓰고, 2박이면 위중을 둘러볼 하루뿐입니다. 우롱 천생삼교와 대족석각은 각각 하루가 통째로 필요하니, 가려면 최소 1박을 더하세요. 도착한 저녁에는 호텔 입구부터 찾고 근처에서 식사하세요.",
      },
      stay: {
        answer: "처음이라면 해방비 일대에 묵으세요.",
        detail:
          "언덕길로 15분쯤 걸어 내려가면 홍야동이고, 스바티와 조천문도 가깝습니다. 늦은 저녁과 쇼핑을 원하면 강 건너 관인차오도 좋지만, 대개 아침마다 강을 건너야 합니다. 길이 여러 높이로 겹쳐 있으니 예약 전에 로비가 몇 층인지, 차가 어느 입구에 서는지 물어보세요.",
      },
      gateway: {
        answer: "충칭의 주요 기차역은 네 곳, 표에 적힌 역부터 확인하세요.",
        detail:
          "충칭북역, 충칭서역, 사핑바역, 충칭동역은 서로 다른 역이고, 우롱행 고속열차는 난안의 충칭동역에서 출발합니다. 비행기는 도심 북쪽 장베이 국제공항(CKG)에 내립니다. 밤늦게 도착하거나 짐이 크면 지하철 대신 차를 타고 호텔 차량 입구까지 가세요.",
      },
      next: {
        answer: "청두가 가장 자연스럽고, 두 도시 사이 열차도 많습니다.",
        detail:
          "청두는 비교적 평탄하고 판다와 찻집을 즐기러 많이 가는 도시이며, 충칭은 가파른 비탈과 두 강이 도시의 얼굴을 만듭니다. 각각 3박부터 시작해, 우롱·대족·장강 크루즈를 넣으면 충칭에, 판다와 쓰촨 근교를 더 보려면 청두에 1박을 더하세요.",
      },
    },
  },
};

export const cityOpenings: Partial<Record<DestinationHubId, Readonly<Record<HomegroundLocale, CityOpening>>>> = {
  beijing: {
    en: {
      heading: "Why so many first trips to China start in Beijing",
      paragraphs: [
        "One city holds an imperial palace, the Great Wall, hutong lanes and glass towers. You can spend the morning in the courtyards where emperors lived, eat dinner in a hutong, and finish the evening around Guomao or Sanlitun in today's Beijing.",
        "Starting here has another advantage. A few days in one hotel let you get over jet lag and learn how China works on the ground: booking sights with your passport, riding the subway, and how far you walk inside the big sites. Every city after that feels easier. If Beijing comes last instead, don't chain arriving from another city, a Great Wall day and an early international flight back to back; one delay and everything after it falls apart.",
      ],
    },
    zh: {
      heading: "为什么第一次来中国，常从北京开始",
      paragraphs: [
        "北京一座城里，就有皇宫、长城、胡同和摩天楼。上午在故宫走皇帝住过的院子，傍晚钻进胡同吃饭，晚上再到国贸、三里屯一带，看看今天的北京。",
        "从北京开始还有一个好处：先在一家酒店住几天，倒好时差，顺便熟悉用护照预约景点、坐地铁，还有大景区里要走多少路，后面的城市就轻松多了。如果北京排在最后，就别把从外地赶到北京、去长城、第二天一早坐国际航班排得紧紧相连，任何一环晚点，后面全乱。",
      ],
    },
    ko: {
      heading: "중국 첫 여행을 베이징에서 시작하는 이유",
      paragraphs: [
        "한 도시 안에 황궁, 만리장성, 후퉁 골목, 고층 빌딩이 모두 있습니다. 오전에는 황제가 살던 자금성의 마당을 걷고, 저녁은 후퉁에서 먹고, 밤에는 궈마오나 싼리툰 일대에서 오늘의 베이징을 만날 수 있습니다.",
        "베이징에서 시작하면 좋은 점이 또 있습니다. 한 숙소에 며칠 머물며 시차를 풀고, 여권으로 명소를 예약하는 법, 지하철 타는 법, 큰 명소 안에서 얼마나 걷는지를 미리 익혀 두면 다음 도시가 훨씬 편해집니다. 베이징을 마지막에 둔다면 다른 도시에서 도착하는 날, 만리장성 가는 날, 이른 아침 국제선 출발을 빈틈없이 붙이지 마세요. 한 곳만 늦어져도 뒤 일정이 모두 흔들립니다.",
      ],
    },
  },
  shanghai: {
    en: {
      heading: "Why a China trip needs a few days in Shanghai",
      paragraphs: [
        "Shanghai's old and new stand face to face across the Huangpu. Most of the Bund's stone banks and hotels went up about a century ago, and every tower on the far bank has risen since 1990. Ride the public ferry over with commuters, turn round on deck, and the whole Bund spreads out behind you. Then take the lift up the Shanghai Tower, 546 metres in under a minute, and even the other skyscrapers sit below your feet.",
        "Shanghai works at either end of a China trip. Most long-haul flights into the city land at Pudong, and a few nights in one hotel let you find your feet before a high-speed train takes you on to Hangzhou or Suzhou. Put it last and you have plenty of flights home to choose from. Where you can, fly into one city and home from another, Beijing and Shanghai for instance, so you don't have to double back.",
      ],
    },
    zh: {
      heading: "为什么中国之行要给上海留几天",
      paragraphs: [
        "上海的老与新，隔着黄浦江面对面。外滩边的石头银行和饭店，大多建于约一百年前；对岸的高楼，全是 1990 年以后才盖起来的。跟上下班的本地人一起坐轮渡过江，在甲板上回头，整条外滩就在身后铺开；坐电梯上上海中心，不到一分钟就到 546 米，连旁边的摩天楼都在脚下。",
        "上海放在行程开头或结尾都合适。飞上海的远程国际航班大多落在浦东，先在一家酒店住几天，缓过劲来，再坐高铁去杭州、苏州；放在最后，回国的航班也好选。能从一座城市进、另一座城市出最好，比如北京进、上海出，或者反过来，就不用走回头路。",
      ],
    },
    ko: {
      heading: "중국 여행에서 상하이에 며칠은 머물러야 하는 이유",
      paragraphs: [
        "상하이의 옛것과 새것은 황푸강을 사이에 두고 마주 봅니다. 와이탄의 석조 은행과 호텔은 대부분 100년쯤 전에 지어졌고, 강 건너 빌딩은 모두 1990년 이후에 올라갔습니다. 출퇴근하는 현지 사람들과 공공 페리로 강을 건너며 갑판에서 뒤돌아보면 와이탄 전체가 펼쳐집니다. 상하이 타워 엘리베이터를 타면 1분도 안 돼 546m 높이에 닿고, 다른 고층 빌딩들까지 발아래 놓입니다.",
        "상하이는 중국 여행의 처음이나 마지막 어디에 두어도 좋습니다. 상하이로 오는 장거리 국제선은 대부분 푸둥에 내리니, 한 숙소에서 며칠 지내며 적응한 뒤 고속열차로 항저우나 쑤저우로 넘어가면 됩니다. 마지막에 두면 귀국 항공편을 고르기 쉽습니다. 할 수 있다면 베이징으로 들어와 상하이에서 나가거나 그 반대로 짜세요. 왔던 길을 되돌아가지 않아도 됩니다.",
      ],
    },
  },
  xian: {
    en: {
      heading: "Why so many first trips to China pass through Xi'an",
      paragraphs: [
        "Xi'an takes you further back in time than Beijing. Up on the city wall, the old town below is only about a seventh of Chang'an, the Tang capital; the rest lies under the modern city beyond. In the Shaanxi History Museum, Tang tomb murals bring that court back in colour: polo players at full gallop, musicians, dancers and foreign envoys, one of them from Korea. A short ride away stands the Giant Wild Goose Pagoda, first built to hold the scriptures the monk Xuanzang carried back from India.",
        "Xi'an sits between Beijing and Chengdu on major rail lines, so you can add it to a first trip without a detour. What it asks in return is time. Give it at least one full day that is neither an arrival nor a departure day. Arrive late and leave early the next morning, and you will see your hotel and very little of Xi'an.",
      ],
    },
    zh: {
      heading: "为什么第一次来中国，常会经过西安",
      paragraphs: [
        "在西安，能看到比北京更早的中国。站上城墙，墙里的老城只有唐长安城的七分之一左右，其余埋在今天的城市底下。陕西历史博物馆的唐墓壁画里，宫廷生活又有了颜色：策马争球的骑手、乐手和舞者，还有来自朝鲜半岛的使节。不远处的大雁塔，最早是为存放玄奘从印度带回的经卷而建。",
        "西安夹在北京和成都之间，又在几条主要铁路线上，排进第一次的中国行程，不用绕路。但它要你留出时间：至少给它一个完整的日子，既不是到达日，也不是离开日。晚上才到、第二天一早又走，你见到的只有酒店，几乎看不到西安。",
      ],
    },
    ko: {
      heading: "중국 첫 여행에 시안이 자주 들어가는 이유",
      paragraphs: [
        "시안에서는 베이징보다 더 오래된 중국을 만납니다. 성벽 안 옛 시가지는 당나라 장안성의 7분의 1 정도이고, 나머지는 성벽 너머 지금의 도시 아래 묻혀 있습니다. 산시역사박물관의 당나라 무덤 벽화에서는 말을 달리며 공을 다투는 기수들, 악사와 무희, 한반도에서 온 사신이 색을 입고 되살아납니다. 조금만 이동하면 현장 법사가 인도에서 가져온 경전을 보관하려고 처음 세운 대안탑이 나옵니다.",
        "시안은 베이징과 청두 사이, 주요 철도 노선 위에 있어 멀리 돌아가지 않고도 첫 중국 여행에 넣을 수 있습니다. 대신 시간이 필요합니다. 도착일도 출발일도 아닌 온전한 하루를 적어도 한 번은 비워 두세요. 밤늦게 도착해 다음 날 아침 일찍 떠나면 호텔만 보고 시안은 거의 보지 못합니다.",
      ],
    },
  },
  chengdu: {
    en: {
      heading: "Why Chengdu is where a China trip slows down",
      paragraphs: [
        "Chengdu is a huge city that still lets you take your time. Tea in People's Park can take up a late morning, and a long lunch can stretch into the afternoon. Around Daci Temple, an old temple sits among today's shops, and at Wuhou Shrine you can follow the Three Kingdoms story. At dusk, walk to a covered bridge over the Jin River, watch the office towers mirrored in the water, and let a hotpot dinner carry you through the evening.",
        "After Beijing or Xi'an, Chengdu turns the trip towards everyday life, Sichuan cooking and the landscapes beyond the city. Give it at least three nights, so the pandas and the tea houses each get a day. Squeeze it into a tight Beijing, Xi'an and Shanghai trip just for a panda photo, and it can become an expensive detour.",
      ],
    },
    zh: {
      heading: "为什么中国之行，要在成都慢下来",
      paragraphs: [
        "成都是座大城市，日子却可以过得很慢。在人民公园的茶馆泡一杯茶，大半个上午就过去了；一顿午饭，也能慢慢吃到下午。大慈寺一带，老寺庙就在今天的商场中间；到武侯祠，可以听三国故事。傍晚走到锦江上的廊桥，看写字楼倒映在水里，再吃一顿火锅，慢慢吃上一整晚。",
        "北京、西安之后来到成都，旅行的重心就转到街头日常、川菜和城外四川的山水上。至少留出三晚，熊猫和茶馆才能各占一天。如果只是为了一张熊猫照片，把它硬塞进很紧的北京—西安—上海路线，它就可能成了一次昂贵的绕路。",
      ],
    },
    ko: {
      heading: "중국 여행에서 청두가 쉼표가 되는 이유",
      paragraphs: [
        "청두는 아주 큰 도시지만 천천히 지내도 되는 곳입니다. 인민공원 찻집에서 차 한 잔이면 늦은 오전이 지나가고, 점심은 오후까지 느긋하게 이어집니다. 다츠사 일대에는 오래된 절이 오늘의 상점가 사이에 있고, 무후사에서는 삼국지 이야기를 따라갈 수 있습니다. 해 질 무렵 도심을 흐르는 진장으로 걸어가 지붕 덮인 다리와 물에 비친 빌딩을 바라보고, 저녁은 훠궈로 길게 즐기세요.",
        "베이징이나 시안 다음에 청두에 오면, 여행의 결이 일상과 쓰촨 음식, 그리고 도시 밖의 자연으로 바뀝니다. 적어도 3박은 잡아야 판다와 찻집에 하루씩 줄 수 있습니다. 판다 사진 한 장을 위해 빡빡한 베이징–시안–상하이 일정에 끼워 넣으면 값비싼 우회가 되기 쉽습니다.",
      ],
    },
  },
  guangzhou: {
    en: {
      heading: "Why Guangzhou is worth more than a stopover",
      paragraphs: [
        "Cantonese food is reason enough to stay, and each day can begin with it: tea poured round a big table, baskets of dim sum shared out. Beijing Road is a busy shopping street laid over older roads, dug up and left on view. Cross a little bridge onto Shamian, where iron gates were once shut at night, and the traffic noise falls away. After dark, walk the curving Haixin Bridge to the north bank and turn round. Canton Tower glows above the Pearl River, its reflection beneath it.",
        "Many trips pass through Guangzhou anyway. It is a major international arrival city, with trains running on toward Hong Kong and Macao, so it makes an easy first or last stop on the mainland. Count real hours, though. Land mid-afternoon, collect your bags and check in, and the afternoon has gone. Leave on a morning train from Guangzhou South and much of the morning goes before the train does.",
      ],
    },
    zh: {
      heading: "为什么值得在广州住下来",
      paragraphs: [
        "光为粤菜就值得住下来。每天都能从早茶开始：一张圆桌，一壶茶，几笼点心大家分着吃。北京路是热闹的商业街，脚下露着发掘出来的旧路面。走过小桥上沙面，车声一下子远了；当年桥头装着铁闸，夜里关上。天黑后走海心桥到珠江北岸，回头看，亮灯的广州塔立在对岸，倒影落在江里。",
        "很多行程本来就要经过广州。它是重要的国际到达城市，铁路还能接着通往港澳，做内地的第一站或最后一站都很顺。只是要按实际能用的钟点算：午后落地，取完行李、办完入住，下午就没了；早上从广州南站坐车，发车前很久就得出门。",
      ],
    },
    ko: {
      heading: "광저우를 환승지로만 두기 아까운 이유",
      paragraphs: [
        "광둥 요리만으로도 묵어 갈 이유는 충분합니다. 하루는 둥근 식탁에 둘러앉아 차를 따르고 딤섬을 나눠 먹으며 시작합니다. 붐비는 상점가 베이징루의 발밑에는 발굴된 옛 노면이 드러나 있습니다. 작은 다리를 건너 사면도에 들어서면 차 소리가 멀어집니다. 예전에는 이 다리의 철문이 밤마다 닫혔습니다. 밤에는 하이신교를 건너 주강 북쪽 강변에서 뒤돌아보세요. 불 켜진 광저우 타워가 강물에 비칩니다.",
        "광저우는 주요 국제선 도착 도시이고 홍콩·마카오 방향으로 철도가 이어져, 중국 본토 여행의 첫 도시나 마지막 도시로 두기 좋습니다. 다만 날짜가 아니라 실제로 쓸 수 있는 시간을 세세요. 오후 중반에 내려 짐을 찾고 체크인하면 오후는 사라지고, 아침에 광저우남역에서 떠나는 날은 열차 시간보다 훨씬 일찍 나서야 합니다.",
      ],
    },
  },
  hangzhou: {
    en: {
      heading: "Why Hangzhou deserves more than a day from Shanghai",
      paragraphs: [
        "In Hangzhou the city runs right down to the water. West Lake has no ticket and no gate, and its whole shore, about 15 kilometres round, is open day and night. The poet Su Dongpo had mud dug from the lake bed and piled into the causeway of willows and peach trees that bears his name. The hills are low and the scenery gentle, and that calm is the point. Head west into those hills and incense drifts over Lingyin's courtyards, while tea grows on the slopes around Longjing.",
        "The fast train from Shanghai makes Hangzhou look like an easy day out. Yet the ride is only part of the day, because you still have to get from the station to the lake, and back in time for your train. If West Lake is all you want, a day will do. Stay, and you can walk the shore in the evening and again early next morning. And if a flight from Hangzhou's own airport suits your route, you need not go back to Shanghai at all.",
      ],
    },
    zh: {
      heading: "为什么杭州不该只去一天",
      paragraphs: [
        "在杭州，城区一直连到湖边。西湖不要门票，也没有大门，环湖一圈约 15 公里，日夜开放。苏东坡把湖底挖出的泥堆成长堤，就是今天一株杨柳一株桃的苏堤。这里山不高，景色秀气，图的就是这份安静。往西进了山，灵隐寺的院子里香烟袅袅，龙井村四周的山坡上种满了茶。",
        "上海坐高铁过来很快，杭州看上去像一次轻松的一日游。可坐车只是这一天的一部分，还得从车站赶到湖边，再赶回去坐返程的车。只想看西湖，一天也够；住下来，傍晚和第二天清晨都能在湖边走走。要是能从杭州萧山机场直接飞走，连上海都不用再回。",
      ],
    },
    ko: {
      heading: "항저우를 당일치기로 끝내기 아까운 이유",
      paragraphs: [
        "항저우는 도시가 호숫가까지 이어집니다. 서호에는 입장료도 문도 없고, 둘레 약 15km의 호숫가가 밤낮으로 열려 있습니다. 소동파가 호수 바닥의 진흙을 퍼 올려 쌓은 둑이 지금 버드나무와 복숭아나무가 늘어선 소제입니다. 산은 나지막하고 풍경은 소박하지만, 그 고요함이 서호의 매력입니다. 서쪽 산으로 들어가면 영은사 마당에 향 연기가 떠돌고, 용정차 마을 둘레 비탈에는 차밭이 펼쳐집니다.",
        "상하이에서 고속열차로 금방이라 항저우는 가벼운 당일치기처럼 보입니다. 하지만 열차는 하루의 일부일 뿐이고, 역에서 호숫가까지 가는 길과 돌아가는 열차 시간까지 챙겨야 합니다. 서호만 보면 된다면 하루로도 충분합니다. 머물면 저녁과 다음 날 이른 아침에도 호숫가를 걸을 수 있습니다. 항저우 공항에서 바로 떠나는 항공편이 일정에 맞는다면 상하이로 돌아갈 필요도 없습니다.",
      ],
    },
  },
  zhangjiajie: {
    en: {
      heading: "Why Zhangjiajie looks like nowhere else in China",
      paragraphs: [
        "Zhangjiajie is a forest made of stone. Thousands of sandstone pillars rise from wooded valleys, many of them taller than a 60-storey tower. You can walk across a natural stone bridge more than 300 metres above the valley, and on a misty day see why one pillar was renamed after the film Avatar. Around early November the slopes of Tianzi Mountain usually turn red and gold. On damp days, cloud drifts into the great arch on Tianmen Mountain and pours out of the far side.",
        "Zhangjiajie is a long way from Beijing or Shanghai, by air or by rail, so give it time. If you are fitting it in between the two, count only the days you will spend in the mountains. The flight or train in, the drive out to Wulingyuan and any change of hotel come on top. On a very short China trip, come only if these pillars are what you most want to see. Keep a spare day if you can, so one foggy day doesn't cost you the views.",
      ],
    },
    zh: {
      heading: "为什么张家界跟别处都不一样",
      paragraphs: [
        "张家界是一片石头的森林。几千根砂岩石柱从山谷的树林里拔地而起，不少比六十层楼还高。你可以走过离谷底三百多米的天然石桥；起雾时，就能明白一根石柱为什么以电影《阿凡达》命名。十一月初前后，天子山通常满山红黄；水汽重的日子，云雾会飘进天门洞，再从另一头涌出去。",
        "张家界离北京、上海都远，飞机、高铁都要花不少时间，得给它留足日子。夹在京沪之间走的话，只数真正待在山里的天数，坐飞机或火车进来、开车去武陵源、中途换酒店都另算。中国行程很短的话，只有这些石柱是你最想看的，才值得专门来。能多留一天就多留，碰上大雾也不至于白跑。",
      ],
    },
    ko: {
      heading: "장가계 풍경이 다른 곳과 다른 이유",
      paragraphs: [
        "장가계는 돌로 된 숲입니다. 골짜기에서 사암 봉우리 수천 개가 솟아 있고, 상당수는 60층 빌딩보다 높습니다. 계곡 위 300m 넘는 높이에 걸린 천연 돌다리를 걸어서 건널 수 있고, 안개 낀 날에는 한 봉우리에 왜 영화 ‘아바타’의 이름이 붙었는지 알게 됩니다. 보통 11월 초 무렵이면 천자산 비탈이 붉고 노랗게 물들고, 습한 날에는 천문동으로 구름이 흘러들었다가 반대편으로 쏟아집니다.",
        "장가계는 베이징에서도 상하이에서도 멀어 비행기든 기차든 시간이 걸리니, 날짜를 넉넉히 잡으세요. 두 도시 사이에 넣는다면 들어오는 비행기나 기차, 무릉원까지 가는 차, 숙소 이동에 드는 시간은 빼고 산에서 실제로 보내는 날만 세세요. 중국 일정이 아주 짧다면 이 봉우리들이 가장 보고 싶은 풍경일 때만 오세요. 하루 여유를 두면 안개 낀 날이 있어도 걷히기를 기다릴 수 있습니다.",
      ],
    },
  },
  chongqing: {
    en: {
      heading: "Why Chongqing is worth the climb",
      paragraphs: [
        "Chongqing climbs the steep banks where the Yangtze and the Jialing meet, and the whole city is stacked in layers. Roads pass beneath other streets, and at Liziba a train runs straight through a building. At Hongyadong you walk in from a city street on the top floor and come out at the bottom, on the river road. No wonder people call it the 8D city. Evenings run late, with dinner by the water, busy streets and the skyline lit up across the river.",
        "Chongqing is also a natural place to start or end a longer journey. Chengdu is an easy train ride away, the main Yangtze cruise route runs between here and Yichang, and Chongqing East has trains to Wulong and some to Zhangjiajie. If you are boarding a cruise straight after a long flight or train ride, sleep at least one night in Chongqing first. That gives you room if anything runs late, and time for the final pier details to reach you.",
      ],
    },
    zh: {
      heading: "重庆为什么值得你爬这些坡",
      paragraphs: [
        "重庆建在长江和嘉陵江交汇处的陡岸上，整座城一层叠着一层。马路从另一条街底下钻过去，李子坝的列车直接从楼里穿过；走进洪崖洞，进门是顶楼，一路往下走，出来已是江边马路，难怪被叫作“8D 魔幻城市”。到了晚上，江边吃饭的人多，街上热闹到很晚，隔江望去满城灯火。",
        "重庆也适合做长途旅程的起点或终点：坐火车去成都很方便；长江游轮的主线往返于重庆和宜昌之间；重庆东站有开往武隆的列车，也有部分开往张家界。如果下了国际航班或长途火车就要上游轮，先在重庆住一晚，路上晚点也有余地，最终码头通知也有时间送到。",
      ],
    },
    ko: {
      heading: "계단을 오를 가치가 있는 도시, 충칭",
      paragraphs: [
        "충칭은 장강과 자링강이 만나는 가파른 강기슭에 층층이 쌓아 올린 도시입니다. 도로가 다른 도로 아래로 지나가고, 리쯔바에서는 열차가 건물을 통과합니다. 홍야동은 시내 도로에서 들어가면 꼭대기 층이고, 계속 내려가 나오면 강변 도로입니다. ‘8D 도시’라는 별명이 붙은 이유입니다. 밤에는 늦게까지 강가 식당과 거리가 붐비고, 강 건너 스카이라인이 불을 밝힙니다.",
        "충칭은 긴 여행을 시작하거나 마무리하기에도 좋은 곳입니다. 청두까지는 열차로 쉽게 이어지고, 장강 크루즈의 주요 노선이 충칭과 이창 사이를 오가며, 충칭동역에서는 우롱행 열차와 일부 장가계행 열차가 출발합니다. 국제선이나 장거리 열차에서 내리자마자 크루즈를 탄다면 충칭에서 최소 1박을 하세요. 비행기나 열차가 늦어져도 여유가 있고, 최종 부두 안내를 받을 시간도 생깁니다.",
      ],
    },
  },
};

export function getCityOpening(hubId: DestinationHubId, locale: HomegroundLocale) {
  return cityOpenings[hubId]?.[locale];
}

export function getCityOverviewCards(hubId: DestinationHubId, locale: HomegroundLocale) {
  return cityOverviewCards[hubId]?.[locale];
}
