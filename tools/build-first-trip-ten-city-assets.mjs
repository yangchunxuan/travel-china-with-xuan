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
