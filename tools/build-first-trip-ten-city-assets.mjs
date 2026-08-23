import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const downloadsRoot = path.join(projectRoot, "public", "downloads");
const imageRoot = path.join(
  projectRoot,
  "public",
  "images",
  "guides",
  "first-trip-china-airport-station-stay-map",
);
const sourceDataPath = path.join(
  projectRoot,
  "content",
  "guides",
  "first-trip-china-airport-station-stay-map",
  "asset-data.en.json",
);
const localizedCopyPaths = {
  zh: path.join(
    projectRoot,
    "content",
    "guides",
    "first-trip-china-airport-station-stay-map",
    "asset-copy.zh.json",
  ),
  ko: path.join(
    projectRoot,
    "content",
    "guides",
    "first-trip-china-airport-station-stay-map",
    "asset-copy.ko.json",
  ),
};
const filePrefix = "homeground-china-10-city-arrival-stay-departure-v1";
const guideUrl =
  "https://homegroundchina.com/guides/first-trip-china-airport-station-stay-map/";
const licenceUrl = "https://creativecommons.org/licenses/by/4.0/";
const licenceLegalCodeUrl =
  "https://creativecommons.org/licenses/by/4.0/legalcode";
const licensor =
  "张家界市永定区本境文化交流工作室（个体工商户）, operating as Homeground China";
const creditText =
  "Homeground China, First Trip to China: 10-City Airport, Station and Stay Map, CC BY 4.0.";
const copyrightNotice = `© 2026 ${licensor}.`;
const originalCityCards = new Set(["beijing", "shanghai", "zhangjiajie"]);

await Promise.all([
  mkdir(downloadsRoot, { recursive: true }),
  mkdir(imageRoot, { recursive: true }),
]);

const assetData = JSON.parse(await readFile(sourceDataPath, "utf8"));
const localizedCopies = Object.fromEntries(
  await Promise.all(
    Object.entries(localizedCopyPaths).map(async ([locale, filePath]) => [
      locale,
      JSON.parse(await readFile(filePath, "utf8")),
    ]),
  ),
);
const reviewMatch = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(assetData.reviewedAt);
if (!reviewMatch) {
  throw new Error(`Invalid reviewedAt date: ${assetData.reviewedAt}`);
}
const [, reviewYearText, reviewMonthText, reviewDayText] = reviewMatch;
const reviewYear = Number(reviewYearText);
const reviewMonth = Number(reviewMonthText);
const reviewDay = Number(reviewDayText);
const reviewDate = new Date(Date.UTC(reviewYear, reviewMonth - 1, reviewDay));
if (reviewDate.toISOString().slice(0, 10) !== assetData.reviewedAt) {
  throw new Error(`Non-calendar reviewedAt date: ${assetData.reviewedAt}`);
}
const reviewMonthLabel =
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
    reviewMonth - 1
  ];
const reviewLabel = `${reviewDay} ${reviewMonthLabel} ${reviewYear}`;

if (assetData.cities.length !== 10) {
  throw new Error(`Expected 10 cities, found ${assetData.cities.length}`);
}
for (const city of assetData.cities) {
  if (!/^[a-z0-9-]+$/u.test(city.id)) {
    throw new Error(`Invalid city id: ${city.id}`);
  }
}

function normalizeLf(value) {
  return String(value).replace(/\r\n?/gu, "\n");
}

const stableTextSources = [
  `${filePrefix}.svg`,
  `${filePrefix}.csv`,
  ...[...originalCityCards].map(
    (city) => `homeground-china-${city}-arrive-stay-depart-v1.svg`,
  ),
];
for (const name of stableTextSources) {
  const sourcePath = path.join(downloadsRoot, name);
  let sourceText = normalizeLf(await readFile(sourcePath, "utf8"));
  if (name.endsWith(".svg")) {
    sourceText = sourceText
      .replace(/Version [^ ·<]+/gu, `Version ${assetData.version}`)
      .replace(/Facts reviewed \d{1,2} [A-Z][a-z]{2} \d{4}/gu, `Facts reviewed ${reviewLabel}`)
      .replace(/Reviewed \d{1,2} [A-Z][a-z]{2} \d{4}/gu, `Reviewed ${reviewLabel}`);
    const stableCityId = [...originalCityCards].find(
      (cityId) => name === `homeground-china-${cityId}-arrive-stay-depart-v1.svg`,
    );
    if (stableCityId) {
      const cityIndex = assetData.cities.findIndex((city) => city.id === stableCityId);
      if (cityIndex < 0) {
        throw new Error(`Stable city card is missing from asset data: ${stableCityId}`);
      }
      const cityCardNumber = String(cityIndex + 1).padStart(2, "0");
      if (!/CITY CARD \d{2}/u.test(sourceText)) {
        throw new Error(`Missing CITY CARD number in ${name}`);
      }
      sourceText = sourceText.replace(/CITY CARD \d{2}/gu, `CITY CARD ${cityCardNumber}`);
    }
    if (!sourceText.includes("CC BY 4.0")) {
      throw new Error(`Missing CC BY 4.0 mark in ${name}`);
    }
  }
  await writeFile(sourcePath, sourceText, "utf8");
}

const csvRows = normalizeLf(
  await readFile(path.join(downloadsRoot, `${filePrefix}.csv`), "utf8"),
)
  .trimEnd()
  .split("\n");
if (csvRows.length !== assetData.cities.length + 1) {
  throw new Error(`Expected ${assetData.cities.length} CSV data rows, found ${csvRows.length - 1}`);
}
for (const row of csvRows.slice(1)) {
  if (!row.includes(`,${assetData.reviewedAt},`)) {
    throw new Error(`CSV source review date does not match ${assetData.reviewedAt}`);
  }
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapWords(value, limit, maxLines) {
  const words = String(value).trim().split(/\s+/u);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= limit || current.length === 0) {
      current = candidate;
      continue;
    }
    lines.push(current);
    current = word;
  }
  if (current) lines.push(current);

  if (lines.length > maxLines) {
    throw new Error(`Card copy exceeds ${maxLines} lines: ${value}`);
  }
  return lines;
}

function svgTextLines(lines, x, firstY, lineHeight) {
  return lines
    .map(
      (line, index) =>
        `<tspan x="${x}" y="${firstY + index * lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("");
}

function generatedCityCard(city, index) {
  const combinedTitleLength = `${city.name} · ${city.nameZh}`.length;
  const titleSize = combinedTitleLength > 27 ? 38 : city.name.length > 15 ? 44 : 52;
  const gatewayLines = wrapWords(city.gatewaySummary, 22, 5);
  const stayLines = wrapWords(city.stayDefault, 22, 5);
  const moveLines = wrapWords(city.oneMoveRule, 22, 5);
  const warningLines = wrapWords(city.warning, 91, 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(city.name)} arrive, stay and depart decision card</title>
  <desc id="desc">A Homeground China schematic card comparing the named gateways, first-trip stay default and wrong-node warning for ${escapeXml(city.name)}.</desc>
  <rect width="1200" height="675" fill="#faf9f5"/><rect width="1200" height="12" fill="#a74731"/>
  <text x="64" y="72" fill="#7f2e1d" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2">HOMEGROUND CHINA · CITY CARD ${String(index + 1).padStart(2, "0")}</text>
  <text x="64" y="136" fill="#141413" font-family="Georgia, serif" font-size="${titleSize}">${escapeXml(city.name)} · ${escapeXml(city.nameZh)}</text>
  <text x="64" y="174" fill="#5f5f5a" font-family="Arial, sans-serif" font-size="21">Confirm the named gateway before choosing the stay area.</text>
  <g font-family="Arial, sans-serif">
    <rect x="64" y="218" width="330" height="238" rx="8" fill="#fff" stroke="#d8d8d1"/>
    <text x="92" y="260" fill="#a74731" font-size="17" font-weight="700" letter-spacing="2">ARRIVE / DEPART</text>
    <text fill="#141413" font-size="20" font-weight="700">${svgTextLines(gatewayLines, 92, 304, 28)}</text>
    <rect x="435" y="218" width="330" height="238" rx="8" fill="#141413"/>
    <text x="463" y="260" fill="#b0aea5" font-size="17" font-weight="700" letter-spacing="2">START WITH</text>
    <text fill="#faf9f5" font-size="20" font-weight="700">${svgTextLines(stayLines, 463, 304, 28)}</text>
    <rect x="806" y="218" width="330" height="238" rx="8" fill="#fff" stroke="#d8d8d1"/>
    <text x="834" y="260" fill="#a74731" font-size="17" font-weight="700" letter-spacing="2">ONE-MOVE RULE</text>
    <text fill="#141413" font-size="20" font-weight="700">${svgTextLines(moveLines, 834, 304, 28)}</text>
  </g>
  <rect x="64" y="492" width="1072" height="96" rx="8" fill="#f2e7de"/>
  <text x="92" y="528" fill="#7f2e1d" font-family="Arial, sans-serif" font-size="17" font-weight="700">WRONG-NODE WARNING</text>
  <text fill="#141413" font-family="Arial, sans-serif" font-size="18">${svgTextLines(warningLines, 92, 558, 24)}</text>
  <text x="64" y="635" fill="#5f5f5a" font-family="Arial, sans-serif" font-size="16">Schematic, not to scale · Version ${escapeXml(assetData.version)} · CC BY 4.0 · Reviewed ${escapeXml(reviewLabel)} · homegroundchina.com</text>
</svg>
`;
}

for (const [index, city] of assetData.cities.entries()) {
  if (originalCityCards.has(city.id)) continue;
  await writeFile(
    path.join(
      downloadsRoot,
      `homeground-china-${city.id}-arrive-stay-depart-v1.svg`,
    ),
    generatedCityCard(city, index),
    "utf8",
  );
}

const nationalSource = path.join(downloadsRoot, `${filePrefix}.svg`);

await Promise.all([
  sharp(nationalSource, { density: 144 })
    .resize(1600, 1000)
    .png({ compressionLevel: 9 })
    .toFile(path.join(downloadsRoot, `${filePrefix}.png`)),
  sharp(nationalSource, { density: 288 })
    .resize(3200, 2000)
    .png({ compressionLevel: 9 })
    .toFile(path.join(downloadsRoot, `${filePrefix}@2x.png`)),
  sharp(nationalSource, { density: 144 })
    .resize(1600, 1000)
    .webp({ quality: 88, smartSubsample: true })
    .toFile(path.join(imageRoot, "hero-1600.webp")),
]);

for (const city of assetData.cities) {
  const source = path.join(
    downloadsRoot,
    `homeground-china-${city.id}-arrive-stay-depart-v1.svg`,
  );
  await Promise.all([
    sharp(source, { density: 144 })
      .resize(1200, 675)
      .png({ compressionLevel: 9 })
      .toFile(
        path.join(
          downloadsRoot,
          `homeground-china-${city.id}-arrive-stay-depart-v1.png`,
        ),
      ),
    sharp(source, { density: 144 })
      .resize(1200, 675)
      .webp({ quality: 88, smartSubsample: true })
      .toFile(path.join(imageRoot, `${city.id}-card-1200.webp`)),
  ]);
}

function localizedReviewLabel(locale) {
  if (locale === "zh") return `${reviewYear}年${reviewMonth}月${reviewDay}日`;
  return `${reviewYear}년 ${reviewMonth}월 ${reviewDay}일`;
}

function localizedFontFamilies(locale) {
  return locale === "zh"
    ? {
        sans: "Microsoft YaHei, Noto Sans CJK SC, Arial, sans-serif",
        serif: "Noto Serif SC, SimSun, serif",
      }
    : {
        sans: "Malgun Gothic, Noto Sans CJK KR, Arial, sans-serif",
        serif: "Noto Serif KR, Batang, serif",
      };
}

function localizedNationalMap(copy, locale) {
  const fonts = localizedFontFamilies(locale);
  const cityById = new Map(copy.cities.map((city) => [city.id, city]));
  const city = (id) => cityById.get(id);
  const title = locale === "zh" ? "Homeground China 10城抵达、住宿与出发地图" : "Homeground China 10개 도시 도착·숙박·출발 지도";
  const description = locale === "zh"
    ? "连接中国10座门户城市与抵达、住宿、出发判断顺序的中文示意图；不是地理比例图或实时交通图。"
    : "중국의 주요 10개 도시와 도착, 숙박, 출발 판단 순서를 연결한 한국어 도식이며 지리 축척 지도나 실시간 교통 지도가 아닙니다.";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)}</title><desc id="desc">${escapeXml(description)}</desc>
  <defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#a74731"/></marker><filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#141413" flood-opacity="0.08"/></filter></defs>
  <rect width="1600" height="1000" fill="#faf9f5"/><rect x="0" y="0" width="18" height="1000" fill="#a74731"/>
  <text x="84" y="82" fill="#7f2e1d" font-family="${fonts.sans}" font-size="22" font-weight="700" letter-spacing="2">${escapeXml(copy.graphic.assetLabel)}</text>
  <text x="84" y="172" fill="#141413" font-family="${fonts.serif}" font-size="68">${escapeXml(copy.graphic.title)}</text>
  <text x="84" y="226" fill="#5f5f5a" font-family="${fonts.sans}" font-size="28">${escapeXml(copy.graphic.subtitle)}</text>
  <rect x="84" y="292" width="610" height="420" rx="8" fill="#ffffff" stroke="#d8d8d1" filter="url(#shadow)"/>
  <text x="124" y="350" fill="#141413" font-family="${fonts.serif}" font-size="38">${escapeXml(copy.graphic.decisionChain)}</text>
  ${copy.graphic.steps.map((step, index) => {
    const centerY = 420 + index * 110;
    const descriptionY = centerY + 26;
    const descriptionLines = wrapLocalizedText(
      step.description,
      locale,
      29,
      2,
    );
    const connector = index < 2
      ? `<line x1="150" y1="${centerY + 34}" x2="150" y2="${centerY + 75}" stroke="#a74731" stroke-width="3" marker-end="url(#arrow)"/>`
      : "";
    return `<circle cx="150" cy="${centerY}" r="26" fill="#a74731"/><text x="150" y="${centerY + 9}" text-anchor="middle" fill="#faf9f5" font-family="${fonts.sans}" font-size="24" font-weight="700">${index + 1}</text><text x="198" y="${centerY - 7}" fill="#141413" font-family="${fonts.sans}" font-size="24" font-weight="700">${escapeXml(step.label)}</text><text fill="#5f5f5a" font-family="${fonts.sans}" font-size="18">${svgTextLines(descriptionLines, 198, descriptionY, 22)}</text>${connector}`;
  }).join("")}
  <rect x="84" y="742" width="610" height="126" rx="8" fill="#141413"/><text x="124" y="793" fill="#faf9f5" font-family="${fonts.serif}" font-size="28">${escapeXml(copy.graphic.mismatchHeadline)}</text><text x="124" y="832" fill="#b0aea5" font-family="${fonts.sans}" font-size="20">PEK ≠ PKX · PVG ≠ SHA · CTU ≠ TFU</text>
  <text x="790" y="82" fill="#5f5f5a" font-family="${fonts.sans}" font-size="18" font-weight="700" letter-spacing="1">${escapeXml(copy.graphic.corridorLabel)}</text>
  <g fill="none" stroke="#d8d8d1" stroke-width="5" stroke-linecap="round"><path d="M1185 190 L990 365 L820 530 L940 620 L1080 680 L1060 805 L1220 825 L1325 900"/><path d="M1185 190 L1390 425 L1300 550 L1080 680"/><path d="M990 365 L1390 425"/><path d="M820 530 L1060 805"/><path d="M1300 550 L1220 825"/></g>
  <g font-family="${fonts.sans}">
    <g transform="translate(1185 190)"><circle r="17" fill="#a74731"/><circle r="7" fill="#faf9f5"/><rect x="24" y="-34" width="204" height="68" rx="8" fill="#fff" stroke="#d8d8d1"/><text x="42" y="-5" fill="#141413" font-size="22" font-weight="700">${escapeXml(city("beijing").name)}</text><text x="42" y="20" fill="#5f5f5a" font-size="16">${escapeXml(city("beijing").graphicSummary)}</text></g>
    <g transform="translate(990 365)"><circle r="17" fill="#141413"/><circle r="7" fill="#faf9f5"/><rect x="-210" y="-34" width="184" height="68" rx="8" fill="#fff" stroke="#d8d8d1"/><text x="-190" y="-5" fill="#141413" font-size="22" font-weight="700">${escapeXml(city("xian").name)}</text><text x="-190" y="20" fill="#5f5f5a" font-size="16">${escapeXml(city("xian").graphicSummary)}</text></g>
    <g transform="translate(1390 425)"><circle r="17" fill="#a74731"/><circle r="7" fill="#faf9f5"/><rect x="-8" y="-94" width="170" height="68" rx="8" fill="#fff" stroke="#d8d8d1"/><text x="10" y="-65" fill="#141413" font-size="22" font-weight="700">${escapeXml(city("shanghai").name)}</text><text x="10" y="-40" fill="#5f5f5a" font-size="16">${escapeXml(city("shanghai").graphicSummary)}</text></g>
    <g transform="translate(820 530)"><circle r="17" fill="#141413"/><circle r="7" fill="#faf9f5"/><rect x="-20" y="-96" width="188" height="68" rx="8" fill="#fff" stroke="#d8d8d1"/><text x="0" y="-67" fill="#141413" font-size="22" font-weight="700">${escapeXml(city("chengdu").name)}</text><text x="0" y="-42" fill="#5f5f5a" font-size="16">${escapeXml(city("chengdu").graphicSummary)}</text></g>
    <g transform="translate(1300 550)"><circle r="17" fill="#141413"/><circle r="7" fill="#faf9f5"/><rect x="26" y="-14" width="188" height="68" rx="8" fill="#fff" stroke="#d8d8d1"/><text x="44" y="15" fill="#141413" font-size="22" font-weight="700">${escapeXml(city("hangzhou").name)}</text><text x="44" y="40" fill="#5f5f5a" font-size="16">${escapeXml(city("hangzhou").graphicSummary)}</text></g>
    <g transform="translate(940 620)"><circle r="17" fill="#141413"/><circle r="7" fill="#faf9f5"/><rect x="-206" y="-10" width="178" height="68" rx="8" fill="#fff" stroke="#d8d8d1"/><text x="-188" y="19" fill="#141413" font-size="22" font-weight="700">${escapeXml(city("chongqing").name)}</text><text x="-188" y="44" fill="#5f5f5a" font-size="16">${escapeXml(city("chongqing").graphicSummary)}</text></g>
    <g transform="translate(1080 680)"><circle r="17" fill="#a74731"/><circle r="7" fill="#faf9f5"/><rect x="26" y="-8" width="210" height="68" rx="8" fill="#fff" stroke="#d8d8d1"/><text x="44" y="21" fill="#141413" font-size="22" font-weight="700">${escapeXml(city("zhangjiajie").name)}</text><text x="44" y="46" fill="#5f5f5a" font-size="16">${escapeXml(city("zhangjiajie").graphicSummary)}</text></g>
    <g transform="translate(1060 805)"><circle r="17" fill="#141413"/><circle r="7" fill="#faf9f5"/><rect x="-250" y="-6" width="218" height="68" rx="8" fill="#fff" stroke="#d8d8d1"/><text x="-232" y="23" fill="#141413" font-size="22" font-weight="700">${escapeXml(city("guilin-yangshuo").name)}</text><text x="-232" y="48" fill="#5f5f5a" font-size="16">${escapeXml(city("guilin-yangshuo").graphicSummary)}</text></g>
    <g transform="translate(1220 825)"><circle r="17" fill="#141413"/><circle r="7" fill="#faf9f5"/><rect x="20" y="-6" width="190" height="68" rx="8" fill="#fff" stroke="#d8d8d1"/><text x="38" y="23" fill="#141413" font-size="22" font-weight="700">${escapeXml(city("guangzhou").name)}</text><text x="38" y="48" fill="#5f5f5a" font-size="16">${escapeXml(city("guangzhou").graphicSummary)}</text></g>
    <g transform="translate(1325 900)"><circle r="17" fill="#a74731"/><circle r="7" fill="#faf9f5"/><rect x="-236" y="22" width="226" height="54" rx="8" fill="#fff" stroke="#d8d8d1"/><text x="-216" y="55" fill="#141413" font-size="20" font-weight="700">${escapeXml(`${city("shenzhen").name} · ${city("shenzhen").graphicSummary}`)}</text></g>
  </g>
  <line x1="84" y1="920" x2="694" y2="920" stroke="#d8d8d1"/><text x="84" y="954" fill="#5f5f5a" font-family="${fonts.sans}" font-size="17">${escapeXml(`${copy.graphic.versionLabel} ${assetData.version} · ${copy.graphic.reviewedLabel} ${localizedReviewLabel(locale)} · CC BY 4.0 · homegroundchina.com`)}</text>
</svg>`;
}

function wrapLocalizedText(value, locale, limit, maxLines) {
  const segments = [...new Intl.Segmenter(locale, { granularity: "word" }).segment(value)]
    .map((part) => part.segment);
  const lines = [];
  let current = "";
  const units = (text) => [...text].reduce(
    (total, character) => total + (/^[\u0000-\u007f]$/u.test(character) ? 0.58 : 1),
    0,
  );
  for (const segment of segments) {
    const candidate = `${current}${segment}`;
    if (!current || units(candidate) <= limit) current = candidate;
    else {
      lines.push(current.trim());
      current = segment.trimStart();
    }
  }
  if (current) lines.push(current.trim());
  if (lines.length > maxLines) {
    throw new Error(`Localized card copy exceeds ${maxLines} lines (${locale}): ${value}`);
  }
  return lines;
}

function localizedCityCard(city, index, copy, locale) {
  const fonts = localizedFontFamilies(locale);
  const cardLineLimit = locale === "zh" ? 13 : 14;
  const gatewayLines = wrapLocalizedText(city.gatewaySummary, locale, cardLineLimit, 5);
  const stayLines = wrapLocalizedText(city.stayDefault, locale, cardLineLimit, 5);
  const moveLines = wrapLocalizedText(city.oneMoveRule, locale, cardLineLimit, 5);
  const warningLines = wrapLocalizedText(city.warning, locale, 48, 2);
  const title = `${city.name} · ${city.secondaryName}`;
  const titleSize = title.length > 18 ? 40 : 50;
  const accessibleTitle = locale === "zh" ? `${city.name}抵达、住宿与出发判断卡` : `${city.name} 도착·숙박·출발 판단 카드`;
  const accessibleDescription = locale === "zh"
    ? `比较${city.name}的主要门户、初次到访住宿起点和错站提醒。`
    : `${city.name}의 주요 관문, 첫 여행 숙박 시작점과 다른 관문 주의 사항을 비교합니다.`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(accessibleTitle)}</title><desc id="desc">${escapeXml(accessibleDescription)}</desc><rect width="1200" height="675" fill="#faf9f5"/><rect width="1200" height="12" fill="#a74731"/><text x="64" y="72" fill="#7f2e1d" font-family="${fonts.sans}" font-size="18" font-weight="700" letter-spacing="1">HOMEGROUND CHINA · ${escapeXml(copy.graphic.cityCardLabel)} ${String(index + 1).padStart(2, "0")}</text><text x="64" y="136" fill="#141413" font-family="${fonts.serif}" font-size="${titleSize}">${escapeXml(title)}</text><text x="64" y="174" fill="#5f5f5a" font-family="${fonts.sans}" font-size="21">${escapeXml(copy.graphic.confirmGateway)}</text><g font-family="${fonts.sans}"><rect x="64" y="218" width="330" height="238" rx="8" fill="#fff" stroke="#d8d8d1"/><text x="92" y="260" fill="#a74731" font-size="17" font-weight="700" letter-spacing="1">${escapeXml(copy.graphic.arriveDepart)}</text><text fill="#141413" font-size="20" font-weight="700">${svgTextLines(gatewayLines, 92, 304, 28)}</text><rect x="435" y="218" width="330" height="238" rx="8" fill="#141413"/><text x="463" y="260" fill="#b0aea5" font-size="17" font-weight="700" letter-spacing="1">${escapeXml(copy.graphic.startWith)}</text><text fill="#faf9f5" font-size="20" font-weight="700">${svgTextLines(stayLines, 463, 304, 28)}</text><rect x="806" y="218" width="330" height="238" rx="8" fill="#fff" stroke="#d8d8d1"/><text x="834" y="260" fill="#a74731" font-size="17" font-weight="700" letter-spacing="1">${escapeXml(copy.graphic.oneMoveRule)}</text><text fill="#141413" font-size="20" font-weight="700">${svgTextLines(moveLines, 834, 304, 28)}</text></g><rect x="64" y="492" width="1072" height="96" rx="8" fill="#f2e7de"/><text x="92" y="528" fill="#7f2e1d" font-family="${fonts.sans}" font-size="17" font-weight="700">${escapeXml(copy.graphic.wrongNodeWarning)}</text><text fill="#141413" font-family="${fonts.sans}" font-size="18">${svgTextLines(warningLines, 92, 558, 24)}</text><text x="64" y="635" fill="#5f5f5a" font-family="${fonts.sans}" font-size="16">${escapeXml(`${copy.graphic.schematicLabel} · ${copy.graphic.versionLabel} ${assetData.version} · CC BY 4.0 · ${copy.graphic.reviewedLabel} ${localizedReviewLabel(locale)} · homegroundchina.com`)}</text></svg>`;
}

for (const [locale, copy] of Object.entries(localizedCopies)) {
  const cityById = new Map(copy.cities.map((city) => [city.id, city]));
  await sharp(Buffer.from(localizedNationalMap(copy, locale)), { density: 144 })
    .resize(1600, 1000)
    .webp({ quality: 88, smartSubsample: true })
    .toFile(path.join(imageRoot, `hero-1600.${locale}.webp`));

  for (const cityId of originalCityCards) {
    const city = cityById.get(cityId);
    const index = assetData.cities.findIndex((candidate) => candidate.id === cityId);
    if (!city || index < 0) throw new Error(`Missing localized ${locale} city card: ${cityId}`);
    await sharp(Buffer.from(localizedCityCard(city, index, copy, locale)), { density: 144 })
      .resize(1200, 675)
      .webp({ quality: 88, smartSubsample: true })
      .toFile(path.join(imageRoot, `${cityId}-card-1200.${locale}.webp`));
  }
}

const jsonName = `${filePrefix}.json`;
const readmeName = `${filePrefix}-README.txt`;
const licenceName = `${filePrefix}-LICENSE.txt`;
const attributionName = `${filePrefix}-ATTRIBUTION-AND-EMBED.txt`;
const sourcesName = `${filePrefix}-SOURCES.txt`;
const checksumsName = `${filePrefix}-SHA256SUMS.txt`;

const readme = `Homeground China 10-city arrival, stay and departure asset pack
Version: ${assetData.version}
Facts reviewed: ${assetData.reviewedAt}
Source page: ${guideUrl}

Purpose
This editorial reference helps a first-time traveller distinguish named airport,
railway-station and port nodes, choose a provisional stay area, and protect the
next departure. It is a schematic, not a geographic map, timetable, transfer
guarantee or live navigation product.

Contents
- National schematic: SVG, PNG and high-density PNG
- Ten city decision cards: SVG and PNG
- Compiled source data: CSV and JSON
- Reuse terms, suggested attribution, source list and SHA-256 checksums

Current-use warning
Gateway operations can change. Confirm the exact ticketed terminal, station or
port with the current operator before booking. Stay defaults and move rules are
Homeground editorial judgements, not official recommendations.

Licence
See ${licenceName}. Original Homeground graphics, layout, annotations and the
compiled dataset are offered under CC BY 4.0. Third-party source facts and names
remain subject to their own terms.

Rights holder
${licensor}
`;

const licence = `HOMEGROUND CHINA TEN-CITY MAP ASSET LICENCE

Asset: First Trip to China: 10-City Airport, Station and Stay Map
Version: ${assetData.version}
Canonical source: ${guideUrl}
Licence: Creative Commons Attribution 4.0 International (CC BY 4.0)
Licence summary/deed: ${licenceUrl}
Legal code: ${licenceLegalCodeUrl}
Licensor: ${licensor}

You may share and adapt the original Homeground map graphics, city cards,
layout, annotations and compiled data for any purpose, including commercially,
provided that you:

1. credit Homeground China;
2. link to the canonical source page and the CC BY 4.0 licence where practical;
3. state whether you changed the material; and
4. do not imply that Homeground China endorses you or your use.

Suggested credit:
Homeground China, "First Trip to China: 10-City Airport, Station and Stay Map,"
version ${assetData.version}, ${guideUrl}, CC BY 4.0.

Scope and exclusions
- The licence covers Homeground's original expression and any database rights
  Homeground may hold in the compiled dataset. Facts themselves may not be
  protected by copyright.
- It does not relicense third-party names, source pages, trademarks or facts.
- "Homeground China" remains a source identifier and brand name, not a licence
  for misleading endorsement or a standalone logo/trademark use.
- No warranty is given that a gateway, route or operating condition remains
  current. Verify decision-critical facts before use.

CC BY 4.0 is the governing licence. This summary does not replace its legal
code and does not add restrictions beyond that licence.
`;

const attribution = `SUGGESTED ATTRIBUTION AND EMBED

Plain text
Homeground China, "First Trip to China: 10-City Airport, Station and Stay Map,"
version ${assetData.version}, ${guideUrl}, CC BY 4.0.

Rights holder
${licensor}

HTML
<a href="${guideUrl}">Homeground China 10-city airport, station and stay map</a>,
version ${assetData.version}, licensed under
<a href="${licenceUrl}">CC BY 4.0</a>.

If modified, add: "Adapted from the Homeground China map; changes were made."

Accessibility
When embedding a graphic, keep useful alt text. Suggested national-map alt:
"Schematic connecting ten China gateway cities with arrive, stay and depart decisions."
`;

const sources = `SOURCE AND METHOD INDEX

Canonical method and live source ledger: ${guideUrl}#sources
Facts reviewed: ${assetData.reviewedAt}

${assetData.sources
  .map(
    (source, index) =>
      `${String(index + 1).padStart(2, "0")}. ${source.publisher} — ${source.label}\n    ${source.url}`,
  )
  .join("\n")}
`;

const portableJson = {
  ...assetData,
  canonicalUrl: guideUrl,
  license: licenceUrl,
  creditText,
  copyrightNotice,
};

await Promise.all([
  writeFile(path.join(downloadsRoot, jsonName), `${JSON.stringify(portableJson, null, 2)}\n`),
  writeFile(path.join(downloadsRoot, readmeName), readme, "utf8"),
  writeFile(path.join(downloadsRoot, licenceName), licence, "utf8"),
  writeFile(path.join(downloadsRoot, attributionName), attribution, "utf8"),
  writeFile(path.join(downloadsRoot, sourcesName), sources, "utf8"),
]);

const packageNames = [
  `${filePrefix}.svg`,
  `${filePrefix}.png`,
  `${filePrefix}@2x.png`,
  `${filePrefix}.csv`,
  jsonName,
  ...assetData.cities.flatMap((city) => [
    `homeground-china-${city.id}-arrive-stay-depart-v1.svg`,
    `homeground-china-${city.id}-arrive-stay-depart-v1.png`,
  ]),
  readmeName,
  licenceName,
  attributionName,
  sourcesName,
].sort();

const packageEntries = await Promise.all(
  packageNames.map(async (name) => ({
    name,
    data: await readFile(path.join(downloadsRoot, name)),
  })),
);
const checksumText = `${packageEntries
  .map(
    ({ name, data }) =>
      `${createHash("sha256").update(data).digest("hex")}  ${name}`,
  )
  .join("\n")}\n`;
await writeFile(path.join(downloadsRoot, checksumsName), checksumText, "utf8");
packageEntries.push({
  name: checksumsName,
  data: Buffer.from(checksumText, "utf8"),
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function storedZip(entries) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  const dosTime = 0;
  const dosDate = ((reviewYear - 1980) << 9) | (reviewMonth << 5) | reviewDay;

  for (const entry of entries) {
    const name = Buffer.from(entry.name, "utf8");
    const checksum = crc32(entry.data);
    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0x0800, 6);
    localHeader.writeUInt16LE(0, 8);
    localHeader.writeUInt16LE(dosTime, 10);
    localHeader.writeUInt16LE(dosDate, 12);
    localHeader.writeUInt32LE(checksum, 14);
    localHeader.writeUInt32LE(entry.data.length, 18);
    localHeader.writeUInt32LE(entry.data.length, 22);
    localHeader.writeUInt16LE(name.length, 26);
    localHeader.writeUInt16LE(0, 28);
    localParts.push(localHeader, name, entry.data);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0x0800, 8);
    centralHeader.writeUInt16LE(0, 10);
    centralHeader.writeUInt16LE(dosTime, 12);
    centralHeader.writeUInt16LE(dosDate, 14);
    centralHeader.writeUInt32LE(checksum, 16);
    centralHeader.writeUInt32LE(entry.data.length, 20);
    centralHeader.writeUInt32LE(entry.data.length, 24);
    centralHeader.writeUInt16LE(name.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);
    centralParts.push(centralHeader, name);

    offset += localHeader.length + name.length + entry.data.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...localParts, centralDirectory, end]);
}

await writeFile(
  path.join(downloadsRoot, `${filePrefix}.zip`),
  storedZip(packageEntries),
);

process.stdout.write(
  `Built national map derivatives, ${assetData.cities.length} city cards and ${filePrefix}.zip.\n`,
);
