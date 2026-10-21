// Checks the exported tour pages' price markup in every maintained language:
// each tour with a published price has an Offer with its price, currency and
// page URL, and each quote-only tour has none. Japanese is not maintained.
// Run after the export: node --experimental-strip-types --no-warnings tools/check-tour-offer-export.mjs
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { getPublishedPrivateTourCatalog } from "../lib/publishedPrivateTourCatalog.ts";
import { tourOfferProblems } from "./lib/tour-offer-check.mjs";

const SITE = "https://homegroundchina.com";
const out = path.join(process.cwd(), "out");
const prefixes = ["", "/zh", "/ko", "/es", "/fr", "/de", "/ar"];

const tours = getPublishedPrivateTourCatalog("en");
const problems = [];
for (const prefix of prefixes) {
  for (const tour of tours) {
    const route = `${prefix}${tour.href}`;
    const file = path.join(out, route, "index.html");
    if (!existsSync(file)) {
      problems.push(`${route} is not in the export`);
      continue;
    }
    problems.push(...tourOfferProblems(readFileSync(file, "utf8"), { priced: tour.startingPrice !== null, url: `${SITE}${route}` }));
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
const quoteOnly = tours.filter((tour) => tour.startingPrice === null).map((tour) => tour.slug);
console.log(`✓ ${tours.length - quoteOnly.length} priced tours carry Offer data in ${prefixes.length} languages; ${quoteOnly.length} quote-only tours carry none (${quoteOnly.join(", ")}).`);
