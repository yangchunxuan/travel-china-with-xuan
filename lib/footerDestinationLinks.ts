import type { DestinationHubId } from "./destinationHubs";
import type { HomegroundLocale } from "./homegroundI18n";

/**
 * The eight city hubs every page's footer links to, as plain data. The footer
 * is a client component on every page, so it must not import the destination
 * catalogue (lib/destinationHubs.ts, about 90 KB) just for eight labels and
 * paths. The homepage still passes its own list; every other page falls back
 * to this one. supabase/tests/footer-destination-links.test.mjs keeps it
 * equal to the catalogue.
 */
export interface FooterDestinationLink {
  readonly id: DestinationHubId;
  readonly label: string;
  readonly href: string;
}

const cities: readonly (readonly [DestinationHubId, string, string, string])[] = [
  ["beijing", "Beijing", "北京", "베이징"],
  ["shanghai", "Shanghai", "上海", "상하이"],
  ["xian", "Xi'an", "西安", "시안"],
  ["chengdu", "Chengdu", "成都", "청두"],
  ["guangzhou", "Guangzhou", "广州", "광저우"],
  ["hangzhou", "Hangzhou", "杭州", "항저우"],
  ["zhangjiajie", "Zhangjiajie", "张家界", "장가계"],
  ["chongqing", "Chongqing", "重庆", "충칭"],
];

const prefix: Readonly<Record<HomegroundLocale, string>> = { en: "", zh: "/zh", ko: "/ko" };
const labelIndex: Readonly<Record<HomegroundLocale, 1 | 2 | 3>> = { en: 1, zh: 2, ko: 3 };

export const footerDestinationLinks: Readonly<
  Record<HomegroundLocale, readonly FooterDestinationLink[]>
> = {
  en: build("en"),
  zh: build("zh"),
  ko: build("ko"),
};

function build(locale: HomegroundLocale): readonly FooterDestinationLink[] {
  return cities.map((city) => ({
    id: city[0],
    label: city[labelIndex[locale]],
    href: `${prefix[locale]}/destinations/${city[0]}/`,
  }));
}
