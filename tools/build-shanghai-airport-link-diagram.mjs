import sharp from "sharp";

const output = new URL(
  "../public/images/guides/shanghai-pudong-or-hongqiao-airport/airport-link-pvg-sha-diagram-1440.webp",
  import.meta.url,
);

const stations = [
  ["SHA", "Hongqiao T2"],
  ["", "Zhongchun Rd"],
  ["", "Jinghong Rd"],
  ["", "South Sanlin"],
  ["", "East Kangqiao"],
  ["", "Shanghai Intl Resort"],
  ["PVG", "Pudong T1 &amp; T2"],
];

const xStart = 140;
const xEnd = 1300;
const y = 350;
const gap = (xEnd - xStart) / (stations.length - 1);

const nodes = stations
  .map(([code, name], index) => {
    const x = xStart + gap * index;
    const endpoint = index === 0 || index === stations.length - 1;
    const codeLabel = code
      ? `<text x="${x}" y="${y - 92}" text-anchor="middle" class="airport-code">${code}</text>`
      : "";
    return `
      <circle cx="${x}" cy="${y}" r="${endpoint ? 23 : 12}" class="${endpoint ? "endpoint" : "station"}" />
      ${codeLabel}
      <text x="${x}" y="${y + 62}" text-anchor="middle" class="station-name">${name}</text>
    `;
  })
  .join("");

const svg = `
<svg width="1440" height="720" viewBox="0 0 1440 720" xmlns="http://www.w3.org/2000/svg">
  <rect width="1440" height="720" fill="#f4f1e8" />
  <text x="96" y="112" class="eyebrow">SHANGHAI AIRPORT LINK</text>
  <text x="96" y="178" class="title">One rail line, seven stations</text>
  <text x="96" y="224" class="subtitle">Use the airport code first. Then calculate the whole terminal-to-door journey.</text>
  <line x1="${xStart}" y1="${y}" x2="${xEnd}" y2="${y}" stroke="#b34832" stroke-width="12" stroke-linecap="round" />
  ${nodes}
  <line x1="96" y1="580" x2="1344" y2="580" stroke="#d7d1c7" stroke-width="2" />
  <text x="96" y="632" class="note">ORIENTATION DIAGRAM · NOT TO SCALE · STATIONS VERIFIED 11 AUG 2026</text>
  <style>
    .eyebrow { font-family: Arial, Helvetica, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: 4px; fill: #9f402d; }
    .title { font-family: Georgia, 'Times New Roman', serif; font-size: 54px; font-weight: 700; fill: #171716; }
    .subtitle { font-family: Arial, Helvetica, sans-serif; font-size: 24px; fill: #5e5b55; }
    .airport-code { font-family: Arial, Helvetica, sans-serif; font-size: 42px; font-weight: 800; fill: #171716; }
    .station-name { font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-weight: 650; fill: #34322f; }
    .endpoint { fill: #171716; stroke: #f4f1e8; stroke-width: 7; }
    .station { fill: #f4f1e8; stroke: #171716; stroke-width: 5; }
    .note { font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: 2px; fill: #68645d; }
  </style>
</svg>`;

await sharp(Buffer.from(svg)).webp({ quality: 92 }).toFile(output.pathname);

console.log(output.pathname);
