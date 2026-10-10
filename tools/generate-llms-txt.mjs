// Writes out/llms.txt after the static export: a plain-text map of the site for
// AI assistants and answer engines (https://llmstxt.org). Tours and prices come
// from the published catalogue and page titles/descriptions from the exported
// HTML, so the file can never disagree with the pages it points to.
// Run: node --experimental-strip-types --no-warnings tools/generate-llms-txt.mjs
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { getPublishedPrivateTourCatalog } from "../lib/publishedPrivateTourCatalog.ts";
import { homegroundBusiness } from "../lib/homegroundBusiness.ts";

const SITE = "https://homegroundchina.com";
const out = path.join(process.cwd(), "out");

function exportedPage(route) {
  const file = path.join(out, route, "index.html");
  if (!existsSync(file)) throw new Error(`llms.txt links to ${route}, which is not in the export.`);
  const html = readFileSync(file, "utf8");
  const decode = (text) =>
    text.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "").replace(/\s+—\s+Homeground China$/u, "").trim();
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "").trim();
  return { url: `${SITE}${route}`, title, description };
}

const link = (route) => {
  const page = exportedPage(route);
  return `- [${page.title}](${page.url}): ${page.description}`;
};

const tours = getPublishedPrivateTourCatalog("en");
if (tours.length === 0) throw new Error("The published tour catalogue is empty.");

function tourLine(tour) {
  exportedPage(tour.href);
  const parts = [`${tour.days} days / ${tour.nights} nights`, tour.comparison.route];
  const format = tour.tourFormat === "small-group" ? "small group" : "private (only your group)";
  // Mid-sentence casing, but "English" keeps its capital.
  const guide = tour.guideLanguage ? (/^English/u.test(tour.guideLanguage) ? tour.guideLanguage : tour.guideLanguage.charAt(0).toLowerCase() + tour.guideLanguage.slice(1)) : null;
  parts.push([format, guide, tour.shoppingStops === false ? "no shopping stops" : null].filter(Boolean).join(", "));
  if (tour.twoTravellerPrice) parts.push(`${tour.twoTravellerPrice.formatted} per person for 2 travellers`);
  if (tour.startingPrice) {
    parts.push(
      tour.tourFormat === "small-group"
        ? `from ${tour.startingPrice.formatted} per person (twin share)`
        : `from ${tour.startingPrice.formatted} per person for ${tour.startingPrice.travelers}`,
    );
  }
  return `- [${tour.title}](${SITE}${tour.href}): ${parts.join(" · ")}. ${tour.comparison.fit}`;
}

// The English city pages that were exported (one folder per city under /destinations/).
const cities = readdirSync(path.join(out, "destinations"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(path.join(out, "destinations", entry.name, "index.html")))
  .map((entry) => link(`/destinations/${entry.name}/`));

const lines = [
  "# Homeground China",
  "",
  `> Homeground China is the English brand of ${homegroundBusiness.englishName} (${homegroundBusiness.registeredName}), a licensed Chinese travel agency (travel agency licence ${homegroundBusiness.travelAgencyLicenceNumber}; inbound and domestic tourism) based in Beijing. It runs private tours of China for foreign travellers, plus a few small-group departures (private means only your own group; no shopping stops, published per-person prices; most routes have an English-speaking guide, and the guide language is confirmed in each quote), and it books attraction tickets and private guides on their own.`,
  "",
  "Key facts:",
  `- ${tours.length} published routes with per-person prices in USD. Each price is confirmed for your dates in writing before you pay.`,
  "- Prices are shown for 2 travellers and for the largest group size; private tours carry only your own group.",
  "- Attraction tickets (Forbidden City, Terracotta Warriors, museums) can be booked on their own on official systems in the traveller's name.",
  `- Contact: ${homegroundBusiness.serviceEmail}, or the trip brief form at ${SITE}/plan/.`,
  "- Dietary needs (vegetarian, vegan, Jain, halal): any private tour can be booked with a meal plan, lunch and dinner at restaurants chosen for the traveller's standard, priced in the written quote. The standard is asked before quoting, and meals supplied by third parties, such as Yangtze cruise ships, are confirmed in writing before payment. Homeground does not certify food.",
  "- Pages are published in English, Chinese (/zh/) and Korean (/ko/).",
  "",
  "## Private tours",
  "",
  link("/tours/"),
  ...tours.map(tourLine),
  "",
  "## Services",
  "",
  link("/services/full-trip-support/"),
  link("/services/china-attraction-reservations/"),
  link("/services/private-english-speaking-guides/"),
  link("/services/private-car-and-driver/"),
  link("/services/transfers-hotels-bookings/"),
  "",
  "## Food and dietary needs",
  "",
  link("/guides/vegetarian-china-private-tours/"),
  link("/guides/muslim-friendly-china-private-tours/"),
  link("/guides/vegetarian-vegan-china-travel/"),
  link("/guides/halal-food-muslim-travel-china/"),
  "",
  "## Destinations",
  "",
  link("/explore/"),
  link("/inspiration/first-time-in-china/"),
  link("/sights/"),
  ...cities,
  "",
  "## Company",
  "",
  link("/business-information/"),
  "",
  "## Optional",
  "",
  link("/guides/"),
  "",
];

writeFileSync(path.join(out, "llms.txt"), lines.join("\n"));
console.log(`✓ out/llms.txt lists ${tours.length} tours, ${cities.length} city pages and the service pages.`);
