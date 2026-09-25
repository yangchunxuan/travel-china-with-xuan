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

const productLinkPattern = /^(?:\/(?:zh|ko))?\/tours\/([a-z0-9-]+)\/$/u;

const explicitPlans = {
  "shaanxi-history-museum-booking-and-collection-plan": {
    kind: "private-tour-product",
    ctaId: "xian-terracotta-warriors-5-day-private-tour",
  },
  "national-museum-of-china-booking-and-route": {
    kind: "private-tour-product",
    ctaId: "beijing-highlights-5-day-private-tour",
  },
  "summer-palace-gates-route-and-boat-plan": {
    kind: "private-tour-product",
    ctaId: "beijing-highlights-5-day-private-tour",
  },
  "terracotta-warriors-without-tour": {
    kind: "private-tour-product",
    ctaId: "xian-terracotta-warriors-5-day-private-tour",
  },
  "zhangjiajie-national-forest-park-tickets-and-entrances": {
    kind: "private-tour-product",
    ctaId: "zhangjiajie-forest-4-day-private-tour",
  },
  "zhangjiajie-older-travellers": {
    kind: "private-tour-product",
    ctaId: "zhangjiajie-4-day-private-tour",
  },
  "china-itinerary-with-older-parents": {
    kind: "private-tour-product",
    ctaId: "shanghai-suzhou-hangzhou-6-day-private-tour",
  },
  "china-itinerary-with-young-children": {
    kind: "private-tour-product",
    ctaId: "chengdu-pandas-sanxingdui-5-day-private-tour",
  },
  "do-singaporeans-need-visa-china": {
    kind: "private-tour-product",
    ctaId: "shanghai-suzhou-hangzhou-6-day-private-tour",
  },
  "wheelchair-accessible-china-route-planning": {
    kind: "private-tour-product",
    ctaId: "shanghai-suzhou-5-day-private-tour",
  },
  "china-accessible-hotel-room-verification": {
    kind: "private-tour-product",
    ctaId: "shanghai-suzhou-5-day-private-tour",
  },
};

// These guides compare named routes. A partly related tour is useful only when
// the rendered card makes the difference clear before the reader clicks.
const reviewedRouteCards = {
  "china-7-day-itinerary": {
    ctaId: "beijing-xian-shanghai-8-day-private-tour",
    difference: { en: ["Beijing 3 nights", "Shanghai 2"], zh: ["北京 3 晚", "上海 2 晚"], ko: ["베이징 3박", "상하이 2박"] },
  },
  "china-10-day-itinerary": {
    ctaId: "beijing-xian-shanghai-8-day-private-tour",
    difference: { en: ["8 days", "10-day"], zh: ["8 天", "10 天"], ko: ["8일", "10일"] },
  },
  "china-14-day-itinerary": {
    ctaId: "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
    difference: { en: ["adds Guilin"], zh: ["多了桂林"], ko: ["구이린을 추가"] },
  },
  "beijing-zhangjiajie-shanghai-10-days": {
    ctaId: "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
    difference: { en: ["Xi'an and Guilin"], zh: ["西安和桂林"], ko: ["시안과 구이린"] },
  },
  "beijing-zhangjiajie-shanghai-transport": {
    ctaId: "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
    difference: { en: ["Xi'an and Guilin"], zh: ["西安和桂林"], ko: ["시안과 구이린"] },
  },
  "beijing-xian-chengdu-route-order": {
    ctaId: "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
    difference: { en: ["Guilin and Shanghai"], zh: ["桂林和上海"], ko: ["구이린과 상하이"] },
  },
  "chengdu-chongqing-zhangjiajie-itinerary": {
    ctaId: "chengdu-chongqing-8-day-private-tour",
    difference: { en: ["does not include Zhangjiajie"], zh: ["不含张家界"], ko: ["장가계가 없습니다"] },
  },
  "guangzhou-shenzhen-hong-kong-route-order": {
    ctaId: "guangzhou-shunde-foshan-5-day-private-tour",
    difference: { en: ["not Shenzhen or Hong Kong"], zh: ["不含深圳与香港"], ko: ["선전과 홍콩은 포함하지"] },
  },
  "guangzhou-macau-transport-route": {
    ctaId: "guangzhou-shunde-foshan-5-day-private-tour",
    difference: { en: ["does not include Macau"], zh: ["不含澳门"], ko: ["마카오가 없습니다"] },
  },
  "kunming-dali-lijiang-shangri-la-route-order": {
    ctaId: "kunming-dali-lijiang-8-day-private-tour",
    difference: { en: ["returns to Kunming", "Shangri-La"], zh: ["返回昆明", "香格里拉"], ko: ["쿤밍으로 돌아가", "샹그릴라"] },
  },
  "lijiang-shangri-la-transport-route": {
    ctaId: "kunming-dali-lijiang-8-day-private-tour",
    difference: { en: ["returns to Kunming", "does not include Shangri-La"], zh: ["返回昆明", "不含香格里拉"], ko: ["쿤밍으로 돌아가", "샹그릴라는 포함하지"] },
  },
  "shanghai-suzhou-hangzhou-nanjing-route-order": {
    ctaId: "shanghai-suzhou-hangzhou-6-day-private-tour",
    difference: { en: ["Nanjing needs extra time"], zh: ["增加南京需另排"], ko: ["난징을 더하려면"] },
  },
  "xian-lanzhou-dunhuang-silk-road-route": {
    ctaId: "beijing-xian-silk-road-15-day-private-tour",
    difference: { en: ["does not stop in Lanzhou"], zh: ["不在兰州停留"], ko: ["란저우에 머물지"] },
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
  return "";
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
  const localizedProductIds = new Set();
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
    if (kind !== "private-tour-product") {
      failures.push(`${where}: every guide must open one product, found ${kind}`);
      continue;
    }
    if (href !== expectedHref(kind, ctaId, locale)) {
      failures.push(`${where}: ${kind}/${ctaId} points to ${href}`);
    }
    if (kind === "private-tour-product" && productLinkPattern.exec(href)?.[1] !== ctaId) {
      failures.push(`${where}: product id and href disagree`);
    }
    localizedProductIds.add(ctaId);
    const productPath = resolve(outRoot, prefix[locale].slice(1), "tours", ctaId, "index.html");
    if (!(await exists(productPath))) failures.push(`${where}: product export missing for ${ctaId}`);
    if (/Matching private tour|对应的私家团|관련 프라이빗 투어/u.test(cardInner)) {
      failures.push(`${where}: deprecated matching claim rendered`);
    }

    const explicit = explicitPlans[guideId];
    if (guideId === "zhangjiajie-from-malaysia") {
      const sevenDayHref = `${prefix[locale]}/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/`;
      if (!anchors(main).includes(sevenDayHref)) {
        failures.push(`${where}: seven-day route is configured but missing from the reader-visible page`);
      }
    }
    if (explicit && (kind !== explicit.kind || ctaId !== explicit.ctaId)) {
      failures.push(`${where}: explicit plan drifted to ${kind}/${ctaId}`);
    }
    const reviewed = reviewedRouteCards[guideId];
    if (reviewed && ctaId !== reviewed.ctaId) {
      failures.push(`${where}: reviewed route card drifted to ${ctaId}`);
    }
    for (const fragment of reviewed?.difference[locale] ?? []) {
      if (!decode(cardInner).includes(fragment)) {
        failures.push(`${where}: route difference missing: ${fragment}`);
      }
    }
  }
  if (availableLocales === 0) failures.push(`${guideId}: no exported locale found`);
  if (localizedProductIds.size > 1) {
    failures.push(`${guideId}: localized cards disagree: ${[...localizedProductIds].join(", ")}`);
  }
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
