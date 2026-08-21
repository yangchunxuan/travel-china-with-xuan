import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");
const owners = [
  "chongqing-upper-lower-city-orientation",
  "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba",
  "china-tiankeng-sinkholes-explained",
  "sichuan-opera-face-changing-with-context",
  "chongqing-railway-station-selector",
];
const copy = {
  en: {
    label: "Start with the Chongqing city guide",
    description: "Choose nights, accommodation base, gateway and whether Wulong or Dazu belongs before using this specialist guide.",
  },
  zh: {
    label: "先从重庆城市旅行指南开始",
    description: "进入本专题前，先决定住几晚、住宿基地、交通门户，以及是否加入武隆或大足。",
  },
  ko: {
    label: "충칭 도시 가이드부터 시작하세요",
    description: "이 전문 가이드에 들어가기 전에 숙박 일수, 숙소 거점, 교통 관문과 우룽·다쭈 포함 여부를 정하세요.",
  },
};

for (const owner of owners) {
  for (const locale of ["en", "zh", "ko"]) {
    const path = resolve(repositoryRoot, "content/guides", owner, `body.${locale}.ts`);
    let source = await readFile(path, "utf8");
    const href = `${locale === "en" ? "" : `/${locale}`}/destinations/chongqing/`;
    const itemCore = `{ label: ${JSON.stringify(copy[locale].label)}, href: ${JSON.stringify(href)}, description: ${JSON.stringify(copy[locale].description)} }`;
    if (source.includes(`href: "${href}"`)) {
      const normalized = source.replace(`${itemCore}, `, `${itemCore},`);
      if (normalized !== source) await writeFile(path, normalized, "utf8");
      continue;
    }

    const blockMatch = /type\s*:\s*"internal-links"/u.exec(source);
    const blockStart = blockMatch?.index ?? -1;
    if (blockStart === -1) throw new Error(`Internal-links block missing: ${owner}/${locale}`);
    const itemsMatch = /items\s*:/u.exec(source.slice(blockStart));
    const itemsStart = itemsMatch ? blockStart + itemsMatch.index : -1;
    const bracket = itemsStart === -1 ? -1 : source.indexOf("[", itemsStart);
    if (itemsStart === -1 || bracket === -1) {
      throw new Error(`Internal-links items missing: ${owner}/${locale}`);
    }
    const item = `${itemCore},`;
    source = `${source.slice(0, bracket + 1)}${item}${source.slice(bracket + 1)}`;
    await writeFile(path, source, "utf8");
  }
}

process.stdout.write("Added reciprocal Chongqing Hub links to five owners in three locales.\n");
