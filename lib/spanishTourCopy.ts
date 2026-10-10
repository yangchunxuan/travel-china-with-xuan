// @ts-ignore Source-TypeScript tests require the explicit extension.
import { beijingHighlights5DayCopy } from "./spanish-tours/beijing-highlights-5-day.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { beijingXianChengduGuilinShanghai14DayCopy } from "./spanish-tours/beijing-xian-chengdu-guilin-shanghai-14-day.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { beijingXianGuilinShanghai10DayCopy } from "./spanish-tours/beijing-xian-guilin-shanghai-10-day.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { beijingXianShanghai8DayCopy } from "./spanish-tours/beijing-xian-shanghai-8-day.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { beijingXianZhangjiajieGuilinShanghai14DayCopy } from "./spanish-tours/beijing-xian-zhangjiajie-guilin-shanghai-14-day.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { chengduPandasSanxingdui5DayCopy } from "./spanish-tours/chengdu-pandas-sanxingdui-5-day.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { guilinYangshuo5DayCopy } from "./spanish-tours/guilin-yangshuo-5-day.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { xianTerracottaWarriors5DayCopy } from "./spanish-tours/xian-terracotta-warriors-5-day.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { zhangjiajieForest4DayCopy } from "./spanish-tours/zhangjiajie-forest-4-day.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { zhangjiajieFurongFenghuang7DayCopy } from "./spanish-tours/zhangjiajie-furong-fenghuang-7-day.ts";

/**
 * Spanish text for one tour page. Days, photographs and service options
 * follow the source product one for one; prices are never written here.
 */
export interface SpanishTourCopy {
  readonly title: string;
  readonly metadataTitle: string;
  readonly metadataDescription: string;
  readonly eyebrow: string;
  readonly lede: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly itinerary: readonly { readonly title: string; readonly description: string }[];
  readonly hotelNote: string;
  readonly serviceNote: string;
  readonly exclusions: readonly string[];
  readonly bookingNote: string;
  readonly faq?: readonly { readonly question: string; readonly answer: string }[];
  readonly heroImage: { readonly alt: string; readonly caption: string };
  readonly gallery: readonly { readonly alt: string; readonly caption: string }[];
  readonly routeMedia: readonly {
    readonly day: number;
    readonly variants: readonly { readonly label: string; readonly alt: string; readonly caption: string }[];
  }[];
  readonly packages: readonly { readonly id: string; readonly label: string; readonly summary: string }[];
}

/** Tours with a Spanish page, in the order the Spanish tours page lists them. */
const spanishTourCopyBySlug: Readonly<Record<string, SpanishTourCopy>> = Object.freeze({
  // Several cities, shortest first.
  "beijing-xian-shanghai-8-day-private-tour": beijingXianShanghai8DayCopy,
  "beijing-xian-guilin-shanghai-10-day-private-tour": beijingXianGuilinShanghai10DayCopy,
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour": beijingXianZhangjiajieGuilinShanghai14DayCopy,
  "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour": beijingXianChengduGuilinShanghai14DayCopy,
  // One region each.
  "zhangjiajie-forest-4-day-private-tour": zhangjiajieForest4DayCopy,
  "zhangjiajie-furong-fenghuang-7-day-private-tour": zhangjiajieFurongFenghuang7DayCopy,
  "guilin-yangshuo-5-day-private-tour": guilinYangshuo5DayCopy,
  "beijing-highlights-5-day-private-tour": beijingHighlights5DayCopy,
  "xian-terracotta-warriors-5-day-private-tour": xianTerracottaWarriors5DayCopy,
  "chengdu-pandas-sanxingdui-5-day-private-tour": chengduPandasSanxingdui5DayCopy,
});

export const spanishTourSlugs: readonly string[] = Object.freeze(Object.keys(spanishTourCopyBySlug));

export function hasSpanishTourPage(slug: string): boolean {
  return Object.hasOwn(spanishTourCopyBySlug, slug);
}

export function getSpanishTourCopy(slug: string): SpanishTourCopy | undefined {
  return hasSpanishTourPage(slug) ? spanishTourCopyBySlug[slug] : undefined;
}

export function spanishTourPath(slug: string): string {
  return `/es/tours/${slug}/`;
}
