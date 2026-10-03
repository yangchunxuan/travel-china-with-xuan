import type { DestinationHubId } from "./destinationHubs";

/**
 * The city page's second version: the city opens with what to do there (its
 * must-see sights and the themes it belongs to), keeps the four city
 * decisions and deeper answers, and ends with the private tours that start
 * there and the services, as cards. It is on for Beijing first (the
 * sample); a city joins by getting an entry here once its tours are chosen.
 */
export const cityPageV2: Partial<Record<DestinationHubId, { readonly tourSlugs: readonly string[] }>> = {
  beijing: {
    tourSlugs: [
      "beijing-highlights-5-day-private-tour",
      "beijing-xian-shanghai-8-day-private-tour",
      "beijing-xian-shanghai-12-day-private-tour",
    ],
  },
};
