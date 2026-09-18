import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Checks the reader-visible production export, not just the six hand-reviewed
 * plans. Every published guide in every available locale must contain exactly
 * one inline card, with a target that agrees with its declared kind.
 */
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = resolve(repoRoot, process.argv[2] ?? "out");
const locales = ["en", "zh", "ko"];
const prefix = { en: "", zh: "/zh", ko: "/ko" };

const plannerPattern = /^(?:\/(?:zh|ko))?\/(?:\?[^#]*)?#planner-contact$/u;
const productLinkPattern = /^(?:\/(?:zh|ko))?\/tours\/([a-z0-9-]+)\/$/u;
const collectionLinkPattern = /^(?:\/(?:zh|ko))?\/tours\/$/u;

const explicitPlans = {
  "zhangjiajie-older-travellers": {
    kind: "private-tour-product",
    ctaId: "zhangjiajie-4-day-private-tour",
  },
  "china-itinerary-with-older-parents": {
    kind: "private-tour-collection",
    ctaId: "private-tours",
  },
  "china-itinerary-with-young-children": {
    kind: "private-tour-collection",
    ctaId: "private-tours",
  },
  "do-singaporeans-need-visa-china": {
    kind: "private-tour-collection",
    ctaId: "private-tours",
    noZhangjiajieProducts: true,
  },
  "wheelchair-accessible-china-route-planning": {
    kind: "trip-consultation",
    ctaId: "full-trip-support",
    noProducts: true,
  },
  "china-accessible-hotel-room-verification": {
    kind: "trip-consultation",
    ctaId: "full-trip-support",
    noProducts: true,
  },
};

function quotedIds(source, expression) {
  const block = source.match(expression);
  if (!block) throw new Error(`Guide id source did not match ${expression}`);
  return [...block[1].matchAll(/"([a-z0-9-]+)"/gu)].map((match) => match[1]);
}

const [legacySource, generatedSource] = await Promise.all([
  readFile(resolve(repoRoot, "lib/guideRegistry.ts"), "utf8"),
  readFile(resolve(repoRoot, "lib/generated/guideRegistry.generated.ts"), "utf8"),
]);
const guideIds = [
  ...quotedIds(legacySource, /legacyGuideIds = \[([\s\S]*?)\] as const/u),
  ...quotedIds(generatedSource, /generatedGuideIds = \[([\s\S]*?)\] as const/u),
];
if (new Set(guideIds).size !== guideIds.length) throw new Error("Duplicate guide ids in registry sources");

function decode(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"');
}

function anchors(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/gu)].map((match) => decode(match[1]));
}

function expectedHref(kind, ctaId, locale) {
  if (kind === "private-tour-product") return `${prefix[locale]}/tours/${ctaId}/`;
  if (kind === "private-tour-collection") return `${prefix[locale]}/tours/`;
  return `${prefix[locale]}/?service=${ctaId}#planner-contact`;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

const failures = [];
let checked = 0;
const checkedGuideIds = new Set();

for (const guideId of guideIds) {
  let availableLocales = 0;
  for (const locale of locales) {
    const path = resolve(outRoot, prefix[locale].slice(1), "guides", guideId, "index.html");
    if (!(await exists(path))) continue;
    availableLocales += 1;
    checkedGuideIds.add(guideId);
    checked += 1;
    const where = `${locale}/${guideId}`;
    const html = await readFile(path, "utf8");
    const mainStart = html.indexOf("<main");
    const mainEnd = html.indexOf("</main>", mainStart);
    if (mainStart < 0 || mainEnd < 0) {
      failures.push(`${where}: no <main> element`);
      continue;
    }
    const main = html.slice(mainStart, mainEnd).replace(/<script\b[\s\S]*?<\/script>/gu, "");
    const cards = [...main.matchAll(/<aside\b[^>]*\bdata-guide-tour-card="([^"]+)"[^>]*>([\s\S]*?)<\/aside>/gu)];
    if (cards.length !== 1) {
      failures.push(`${where}: expected 1 sales card, found ${cards.length}`);
      continue;
    }

    const [cardHtml, ctaId, cardInner] = cards[0];
    const kind = cardHtml.match(/\bdata-guide-cta-kind="([^"]+)"/u)?.[1];
    const cardLinks = anchors(cardInner);
    const href = cardLinks[0];
    if (cardLinks.length !== 1) failures.push(`${where}: expected 1 card link, found ${cardLinks.length}`);
    if (!["private-tour-product", "private-tour-collection", "trip-consultation"].includes(kind)) {
      failures.push(`${where}: unknown card kind ${kind}`);
      continue;
    }
    if (href !== expectedHref(kind, ctaId, locale)) {
      failures.push(`${where}: ${kind}/${ctaId} points to ${href}`);
    }
    if (kind === "private-tour-product" && productLinkPattern.exec(href)?.[1] !== ctaId) {
      failures.push(`${where}: product id and href disagree`);
    }
    if (kind === "private-tour-collection" && (ctaId !== "private-tours" || !collectionLinkPattern.test(href))) {
      failures.push(`${where}: collection target is not the localized tours hub`);
    }
    if (kind === "trip-consultation" && !plannerPattern.test(href)) {
      failures.push(`${where}: consultation target is not the planner`);
    }
    if (/Matching private tour|对应的私家团|관련 프라이빗 투어/u.test(cardInner)) {
      failures.push(`${where}: deprecated matching claim rendered`);
    }

    const explicit = explicitPlans[guideId];
    if (explicit && (kind !== explicit.kind || ctaId !== explicit.ctaId)) {
      failures.push(`${where}: explicit plan drifted to ${kind}/${ctaId}`);
    }
    if (explicit?.noProducts) {
      const products = anchors(main).filter((candidate) => productLinkPattern.test(candidate));
      if (products.length > 0) failures.push(`${where}: product links on an access page: ${products.join(", ")}`);
    }
    if (explicit?.noZhangjiajieProducts) {
      const zjj = anchors(main).filter((candidate) => /\/tours\/zhangjiajie-/u.test(candidate));
      if (zjj.length > 0) failures.push(`${where}: Zhangjiajie product links: ${zjj.join(", ")}`);
    }
  }
  if (availableLocales === 0) failures.push(`${guideId}: no exported locale found`);
}

if (checkedGuideIds.size !== guideIds.length) {
  failures.push(`registry coverage ${checkedGuideIds.size}/${guideIds.length}`);
}
if (failures.length > 0) {
  process.stderr.write(`Guide sales card export check failed:\n- ${failures.join("\n- ")}\n`);
  process.exit(1);
}
process.stdout.write(
  `✓ ${checked} localized exports across ${guideIds.length} guides each carry exactly one valid inline sales card.\n`,
);
