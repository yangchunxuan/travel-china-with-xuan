import type { DestinationHubId } from "./destinationHubs";
import type { HomegroundLocale } from "./homegroundI18n";

/**
 * Travel inspiration: the second way into Destinations (the first is the city
 * index). A theme page answers "what kind of trip?" and goes straight to the
 * published tours that fit it, then to the cities and the services. Tours are
 * named here by slug only; their titles, photos, routes and "who it suits"
 * lines come from the published catalogue, so a theme never restates (or
 * drifts from) a product. A new theme is one entry here plus its copy in
 * travelInspirationI18n.ts.
 */
export const travelInspirationPath: Record<HomegroundLocale, string> = {
  en: "/inspiration/",
  zh: "/zh/inspiration/",
  ko: "/ko/inspiration/",
};

export const travelInspirationThemeIds = ["first-time-in-china"] as const;
export type TravelInspirationThemeId = (typeof travelInspirationThemeIds)[number];

export interface TravelInspirationTourGroup {
  /** Key into the theme copy's `groups`. */
  readonly id: string;
  readonly tourSlugs: readonly string[];
}

export interface TravelInspirationTheme {
  readonly id: TravelInspirationThemeId;
  /** The theme's own photo (hub card and page hero); its alt text is in the copy. */
  readonly image: { readonly src: string; readonly width: number; readonly height: number };
  readonly tourGroups: readonly TravelInspirationTourGroup[];
  readonly cityIds: readonly DestinationHubId[];
}

export const travelInspirationThemes: readonly TravelInspirationTheme[] = [
  {
    id: "first-time-in-china",
    image: { src: "/images/destinations/beijing/great-wall-1200.webp", width: 1200, height: 750 },
    // Grouped by the days a first trip usually has; each group starts with
    // the route most first-time travellers pick at that length.
    tourGroups: [
      {
        id: "week",
        tourSlugs: [
          "beijing-xian-shanghai-8-day-private-tour",
          "shanghai-suzhou-hangzhou-6-day-private-tour",
          "beijing-highlights-5-day-private-tour",
        ],
      },
      {
        id: "ten-days",
        tourSlugs: [
          "beijing-xian-guilin-shanghai-10-day-private-tour",
          "beijing-xian-guilin-hong-kong-10-day-private-tour",
        ],
      },
      {
        id: "two-weeks",
        tourSlugs: [
          "beijing-xian-shanghai-12-day-private-tour",
          "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour",
          "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
        ],
      },
    ],
    // The cities these routes pass through that have their own page.
    cityIds: ["beijing", "xian", "shanghai", "hangzhou", "chengdu", "chongqing"],
  },
];

export function travelInspirationThemePath(id: TravelInspirationThemeId, locale: HomegroundLocale) {
  return `${travelInspirationPath[locale]}${id}/`;
}

export function travelInspirationThemePaths(id: TravelInspirationThemeId): Record<HomegroundLocale, string> {
  return {
    en: travelInspirationThemePath(id, "en"),
    zh: travelInspirationThemePath(id, "zh"),
    ko: travelInspirationThemePath(id, "ko"),
  };
}

export function getTravelInspirationTheme(id: string): TravelInspirationTheme | undefined {
  return travelInspirationThemes.find((theme) => theme.id === id);
}

export function isTravelInspirationThemeId(value: string): value is TravelInspirationThemeId {
  return travelInspirationThemeIds.some((id) => id === value);
}
