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
};

export function getCityOpening(hubId: DestinationHubId, locale: HomegroundLocale) {
  return cityOpenings[hubId]?.[locale];
}

export function getCityOverviewCards(hubId: DestinationHubId, locale: HomegroundLocale) {
  return cityOverviewCards[hubId]?.[locale];
}
