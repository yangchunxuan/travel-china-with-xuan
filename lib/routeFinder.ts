import {
  getHomegroundCopy,
  localizedRouteVariantText,
  type HomegroundLocale,
} from "./homegroundI18n";
import {
  computeRoutePlan,
  getStandardRouteCityNights,
  type CityNights,
  type RouteAnswers,
  type RouteFamilyId,
  type RouteProfile,
  type TravelPartyId,
  type TravelStyleId,
  type TripNightsId,
  type TripPaceId,
} from "./routeRules";

export { routeRuleVersion } from "./routeRules";
export type {
  CityNights,
  RouteFamilyId,
  RouteProfile,
  TravelPartyId,
  TravelStyleId,
  TripNightsId,
  TripPaceId,
} from "./routeRules";

export interface ChoiceOption<Id extends string> {
  id: Id;
  label: string;
  description: string;
}

export type RouteFinderAnswers = RouteAnswers;

export interface RouteMatch {
  routeId: string;
  ruleVersion: string;
  familyId: RouteFamilyId;
  profile: RouteProfile;
  title: string;
  cityNights: readonly CityNights[];
  totalNights: number;
  betweenCityMoves: number;
  summary: string;
  reasons: readonly [string, string];
  tradeoff: string;
  assumptions: readonly string[];
  answers: RouteFinderAnswers;
}

interface RouteVariant {
  title: string;
  summary: string;
  routeReason: string;
  tradeoff: string;
}

interface RouteFamily {
  id: RouteFamilyId;
  variants: Record<TripNightsId, RouteVariant>;
}

export const travelStyleOptions: readonly ChoiceOption<TravelStyleId>[] = [
  {
    id: "classic",
    label: "China’s essential first chapter",
    description:
      "Famous history, major landmarks and a clear first-time route.",
  },
  {
    id: "landscape",
    label: "Mountains and dramatic landscapes",
    description:
      "Big landscapes, quieter mornings and less time in major cities.",
  },
  {
    id: "food",
    label: "Food and city energy",
    description:
      "Neighbourhoods, night views and the kind of meals worth travelling for.",
  },
  {
    id: "slow",
    label: "Slower, softer China",
    description: "Lakes, gardens, local craft and fewer hotel changes.",
  },
  {
    id: "unsure",
    label: "I honestly don’t know yet",
    description:
      "Use my time, travel party and preferred pace to narrow it down.",
  },
];

export const travelPartyOptions: readonly ChoiceOption<TravelPartyId>[] = [
  {
    id: "couple",
    label: "Two adults",
    description: "A trip for a couple or two travelling companions.",
  },
  {
    id: "family",
    label: "Family with children",
    description: "A route that leaves room for younger travellers.",
  },
  {
    id: "parents",
    label: "Parents or older travellers",
    description: "Comfort, walking and recovery time matter.",
  },
  {
    id: "friends",
    label: "Friends",
    description: "Shared experiences with some room for different interests.",
  },
  {
    id: "solo",
    label: "Solo",
    description: "A clear route for one independent traveller.",
  },
];

export const tripNightsOptions: readonly ChoiceOption<TripNightsId>[] = [
  {
    id: "7",
    label: "7 nights",
    description: "One focused region or two well-connected bases.",
  },
  {
    id: "10",
    label: "10 nights",
    description: "Enough time for a clear route with two or three bases.",
  },
  {
    id: "14",
    label: "14 nights",
    description: "A broader first journey with meaningful stays in each city.",
  },
  {
    id: "18",
    label: "18 nights",
    description: "More contrast, with room to slow down between chapters.",
  },
];

export const tripPaceOptions: readonly ChoiceOption<TripPaceId>[] = [
  {
    id: "gentle",
    label: "Gentle",
    description: "More breathing room, fewer early starts and lighter days.",
  },
  {
    id: "balanced",
    label: "Balanced",
    description: "One main experience, with unplanned time around it.",
  },
  {
    id: "full",
    label: "Full",
    description: "I am comfortable fitting more into most days.",
  },
];

const routeFamilies: readonly RouteFamily[] = [
  {
    id: "classic",
    variants: {
      "7": {
        title: "The China essentials, kept realistic",
        summary:
          "A focused first chapter that pairs imperial history with a modern-city finish.",
        routeReason:
          "Four nights in Beijing and three in Shanghai make better use of a seven-night trip than squeezing in a third city.",
        tradeoff:
          "Xi’an is deliberately omitted; adding it would create three short stays and two transfers.",
      },
      "10": {
        title: "The first-time classic, paced properly",
        summary:
          "China’s clearest historical arc, connected by a simple eastbound route.",
        routeReason:
          "The ten nights divide into three substantial chapters without a one-night stop.",
        tradeoff:
          "Mountains and smaller towns are omitted so the historical route does not become a checklist.",
      },
      "14": {
        title: "The classic route with a food chapter",
        summary:
          "The first-time landmarks, with Chengdu adding food, teahouses and a softer city rhythm.",
        routeReason:
          "Fourteen nights support four distinct bases while keeping at least three nights in each.",
        tradeoff:
          "Zhangjiajie is omitted; including it would add a fourth transfer or shorten every city.",
      },
      "18": {
        title: "A broad first journey with room to breathe",
        summary:
          "History, food and a slower lakeside chapter before a modern-city finish.",
        routeReason:
          "Eighteen nights support five contrasting bases without relying on one- or two-night stops.",
        tradeoff:
          "This is a broad introduction; Zhangjiajie and Yunnan are omitted to protect the pace.",
      },
    },
  },
  {
    id: "landscape",
    variants: {
      "7": {
        title: "Zhangjiajie without the rush",
        summary:
          "One mountain region and one riverside old town, instead of a hurried national checklist.",
        routeReason:
          "A four-night mountain stay and three-night old-town stay protect time for the landscape.",
        tradeoff:
          "Beijing, Xi’an and Shanghai are omitted; the trip chooses one region over a national checklist.",
      },
      "10": {
        title: "Two city chapters and one big landscape",
        summary:
          "A first-China route built around the contrast between the capital, sandstone peaks and Shanghai.",
        routeReason:
          "Four nights are reserved for the landscape, while Beijing and Shanghai give the route a clear beginning and finish.",
        tradeoff:
          "Xi’an is omitted because Zhangjiajie already adds a longer connection and a second transfer.",
      },
      "14": {
        title: "The icons, plus Zhangjiajie",
        summary:
          "Major history and a dramatic landscape chapter in one clear first journey.",
        routeReason:
          "Fourteen nights give the two deeper chapters four nights each and the supporting cities three.",
        tradeoff:
          "Chengdu is omitted; adding it would create four transfers and reduce recovery time.",
      },
      "18": {
        title: "China’s history, food and sandstone peaks",
        summary:
          "A high-contrast journey from imperial history to food culture, mountains and the coast.",
        routeReason:
          "Eighteen nights make room for five bases while preserving four nights in Zhangjiajie.",
        tradeoff:
          "Hangzhou and smaller eastern towns are omitted; five bases already create four major transfers.",
      },
    },
  },
  {
    id: "food",
    variants: {
      "7": {
        title: "Food and after-dark energy",
        summary:
          "Two neighbouring city personalities, built around neighbourhoods, meals and evenings.",
        routeReason:
          "A compact two-city route protects substantial time for neighbourhoods and meals.",
        tradeoff:
          "Beijing and Shanghai are omitted; this route prioritises regional city life over headline monuments.",
      },
      "10": {
        title: "Ancient streets, teahouses and vertical city life",
        summary:
          "A western-China route linking history, food culture and Chongqing’s dramatic urban landscape.",
        routeReason:
          "Ten nights support three complementary western cities without crossing the whole country.",
        tradeoff:
          "Beijing and Shanghai are omitted so more time stays with food culture and local streets.",
      },
      "14": {
        title: "The big story, told through food and cities",
        summary:
          "A history-and-food route with extra weight given to Chengdu and Chongqing.",
        routeReason:
          "Fourteen nights support four cities and reserve eight nights for the two main food chapters.",
        tradeoff:
          "Shanghai is omitted; adding it would create a fourth transfer and shorten the western stays.",
      },
      "18": {
        title: "A long-form journey through China’s city cultures",
        summary:
          "History, regional food, neighbourhood life and a modern coastal finish.",
        routeReason:
          "The route uses eighteen nights to show how five Chinese cities feel, not only what they contain.",
        tradeoff:
          "Hangzhou and the major nature regions are omitted; city culture remains the focus.",
      },
    },
  },
  {
    id: "slow",
    variants: {
      "7": {
        title: "A softer first week in China",
        summary:
          "One energetic city and one calmer lakeside base, with minimal hotel changes.",
        routeReason:
          "Only one major transfer leaves more of the seven nights for later mornings and unplanned time.",
        tradeoff:
          "Beijing and Xi’an are omitted; this route trades imperial history for a softer rhythm.",
      },
      "10": {
        title: "Water, gardens and local craft",
        summary:
          "A quieter eastern-China route shaped around atmosphere, water and making traditions.",
        routeReason:
          "Three stays divide ten nights cleanly while giving Hangzhou the longest, slowest chapter.",
        tradeoff:
          "Beijing and Xi’an are omitted, and the Jingdezhen connection still needs practical checking.",
      },
      "14": {
        title: "The capital, followed by a slower eastern China",
        summary:
          "A measured route pairing one major historical chapter with lakes, craft and a coastal finish.",
        routeReason:
          "Fourteen nights preserve four-night anchors in Beijing and Hangzhou, with no stay shorter than three nights.",
        tradeoff:
          "Xi’an is omitted to avoid turning a slower journey into a five-city checklist.",
      },
      "18": {
        title: "China’s history at a slower rhythm",
        summary:
          "The essential historical chapters, softened by lakeside time and a craft-focused stay.",
        routeReason:
          "Eighteen nights let the historical chapters coexist with two quieter eastern stays.",
        tradeoff:
          "Zhangjiajie and Chengdu are omitted; adding either would undermine the slower rhythm.",
      },
    },
  },
];

export function findStartingRoute(
  answers: RouteFinderAnswers,
  locale: HomegroundLocale = "en",
): RouteMatch {
  const copy = getHomegroundCopy(locale);
  const plan = computeRoutePlan(answers);
  const family = routeFamilies.find(
    (candidate) => candidate.id === plan.familyId,
  );

  if (!family) {
    throw new Error(`Missing route copy for family: ${plan.familyId}.`);
  }

  const variant = family.variants[answers.nights];
  const variantText =
    localizedRouteVariantText[locale]?.[family.id]?.[answers.nights] ??
    variant;
  const selectedNights = Number(answers.nights);
  const paceLabel = getAnswerLabels(answers, locale).pace;
  const shortestStay = Math.min(
    ...plan.cityNights.map((stop) => stop.nights),
  );
  const omittedForProfile = getStandardRouteCityNights(
    plan.familyId,
    answers.nights,
  )
    .map((stop) => stop.city)
    .filter(
      (city) => !plan.cityNights.some((stop) => stop.city === city),
    );
  const omittedCityNames = omittedForProfile.map(
    (city) => copy.route.cityNames[city] ?? city,
  );

  return {
    ...plan,
    title:
      plan.profile === "lower-move"
        ? copy.route.lowerMoveTitle(copy.route.familyLabels[family.id])
        : variantText.title,
    summary:
      plan.profile === "lower-move"
        ? copy.route.lowerMoveSummary(selectedNights)
        : variantText.summary,
    reasons: [
      plan.profile === "lower-move"
        ? copy.route.lowerMoveReason(
            plan.cityNights.length,
            plan.betweenCityMoves,
          )
        : variantText.routeReason,
      copy.route.secondReason(
        copy.route.partyPhrases[answers.party],
        shortestStay,
        paceLabel,
      ),
    ],
    tradeoff:
      plan.profile === "lower-move" && omittedForProfile.length > 0
        ? copy.route.lowerMoveTradeoff(omittedCityNames)
        : variantText.tradeoff,
    assumptions: [
      ...copy.route.commonAssumptions,
      copy.route.partyAssumptions[answers.party],
    ],
  };
}

function labelFor<Id extends string>(
  options: readonly ChoiceOption<Id>[],
  id: Id,
): string {
  return options.find((option) => option.id === id)?.label ?? id;
}

export function getAnswerLabels(
  answers: RouteFinderAnswers,
  locale: HomegroundLocale = "en",
) {
  const options = getHomegroundCopy(locale).finder.options;
  return {
    party: labelFor(
      options.party as readonly ChoiceOption<TravelPartyId>[],
      answers.party,
    ),
    travelStyle: labelFor(
      options.travelStyle as readonly ChoiceOption<TravelStyleId>[],
      answers.travelStyle,
    ),
    nights: labelFor(
      options.nights as readonly ChoiceOption<TripNightsId>[],
      answers.nights,
    ),
    pace: labelFor(
      options.pace as readonly ChoiceOption<TripPaceId>[],
      answers.pace,
    ),
  };
}

export function getCityName(
  city: string,
  locale: HomegroundLocale = "en",
): string {
  return getHomegroundCopy(locale).route.cityNames[city] ?? city;
}
