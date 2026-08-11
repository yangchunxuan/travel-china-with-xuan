import { readFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const articleDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(articleDir, "../../..");
const calendar = JSON.parse(
  await readFile(path.join(articleDir, "holiday-calendar.json"), "utf8"),
);
const year = calendar.years.find((entry) => entry.year === 2026);

if (!year || year.status !== "official") {
  throw new Error("The 2026 official calendar record is missing.");
}

const monthNames = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

const formatDate = (date) => {
  const [yearValue, month, day] = date.split("-").map(Number);
  if (yearValue !== 2026) throw new Error(`Unexpected year in ${date}`);
  return `${monthNames[month - 1]} ${day}`;
};

const formatSpan = (holiday) => {
  const start = formatDate(holiday.startDate);
  const end = formatDate(holiday.endDate);
  const startMonth = holiday.startDate.slice(5, 7);
  const endMonth = holiday.endDate.slice(5, 7);
  return startMonth === endMonth
    ? `${start}–${end.split(" ")[1]}`
    : `${start}–${end}`;
};

const escape = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function renderHolidayRow(holiday, index) {
  const y = 226 + index * 88;
  const workdayLabel = holiday.compensatoryWorkdays.length
    ? holiday.compensatoryWorkdays.map(formatDate).join(" · ")
    : "NONE";
  return `
    <g aria-label="${escape(holiday.names.en)} ${formatSpan(holiday)}">
      <rect x="60" y="${y}" width="760" height="76" rx="18" fill="#fffdf8" stroke="#d6cbbd" stroke-width="2"/>
      <rect x="76" y="${y + 16}" width="16" height="44" rx="8" fill="#b74636"/>
      <text x="112" y="${y + 32}" class="holiday-name">${escape(holiday.names.en)}</text>
      <text x="112" y="${y + 58}" class="holiday-trilingual">${escape(holiday.names.zh)} · ${escape(holiday.names.ko)}</text>
      <text x="450" y="${y + 36}" class="date-span">${formatSpan(holiday)}</text>
      <rect x="638" y="${y + 14}" width="162" height="48" rx="12" fill="#f4efe5" stroke="#20373f" stroke-width="2"/>
      <path d="M 784 ${y + 14} L 800 ${y + 14} L 800 ${y + 30} Z" fill="#20373f"/>
      <text x="719" y="${y + 34}" class="work-label" text-anchor="middle">WORKDAY</text>
      <text x="719" y="${y + 53}" class="work-date" text-anchor="middle">${workdayLabel}</text>
    </g>`;
}

const holidayRows = year.holidays.map(renderHolidayRow).join("\n");
const pressure = year.documentedPressurePeriods[0];

if (!pressure) {
  throw new Error("The 2026 Spring Festival transport period is missing.");
}

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-label="China's official 2026 public holidays and compensatory workdays">
  <style>
    text { font-family: Inter, Arial, "PingFang SC", "Apple SD Gothic Neo", sans-serif; fill: #20373f; }
    .eyebrow { font-size: 21px; font-weight: 750; letter-spacing: 2px; }
    .title { font-family: Georgia, "Songti SC", serif; font-size: 60px; font-weight: 700; }
    .subtitle { font-size: 23px; fill: #53656b; }
    .status { font-size: 20px; font-weight: 750; letter-spacing: .4px; }
    .holiday-name { font-size: 28px; font-weight: 800; }
    .holiday-trilingual { font-size: 17px; fill: #667579; }
    .date-span { font-size: 34px; font-weight: 800; fill: #9d3f31; }
    .work-label { font-size: 14px; font-weight: 800; letter-spacing: 1px; }
    .work-date { font-size: 14px; font-weight: 700; }
    .panel-title { font-size: 24px; font-weight: 800; letter-spacing: 1px; }
    .panel-big { font-size: 38px; font-weight: 800; }
    .panel-copy { font-size: 21px; fill: #53656b; }
    .legend { font-size: 19px; font-weight: 700; }
    .source { font-size: 15px; fill: #68777b; }
  </style>
  <rect width="1600" height="1000" fill="#f4efe5"/>
  <rect x="0" y="0" width="18" height="1000" fill="#b74636"/>
  <text x="60" y="48" class="eyebrow">HOMEGROUND CHINA · ANNUAL PLANNING CALENDAR</text>
  <text x="60" y="116" class="title">China public holidays · 2026</text>
  <text x="60" y="158" class="subtitle">Seven official breaks and the weekend workdays connected to them</text>
  <g transform="translate(1090 44)">
    <rect width="210" height="50" rx="25" fill="#20373f"/>
    <text x="105" y="32" class="status" style="fill:#fffdf8" text-anchor="middle">2026 OFFICIAL</text>
    <rect x="225" width="265" height="50" rx="25" fill="#fffdf8" stroke="#20373f" stroke-width="2"/>
    <text x="358" y="21" class="status" text-anchor="middle">2027 NOT PUBLISHED</text>
    <text x="358" y="40" font-size="13" text-anchor="middle">尚未发布 · 아직 발표되지 않음</text>
  </g>
  <text x="60" y="205" class="eyebrow">OFFICIAL DAYS OFF</text>
  ${holidayRows}
  <g transform="translate(870 226)">
    <rect width="670" height="604" rx="24" fill="#e5ece8" stroke="#9bada7" stroke-width="2"/>
    <text x="38" y="54" class="panel-title">READ THE MARKS, NOT A CROWD SCORE</text>
    <rect x="40" y="88" width="40" height="30" rx="10" fill="#b74636"/>
    <text x="100" y="111" class="legend">Official day off</text>
    <rect x="40" y="140" width="40" height="30" rx="10" fill="#fffdf8" stroke="#20373f" stroke-width="2"/>
    <path d="M 66 140 L 80 140 L 80 154 Z" fill="#20373f"/>
    <text x="100" y="163" class="legend">Weekend designated as a workday</text>
    <line x1="40" y1="205" x2="630" y2="205" stroke="#9bada7" stroke-width="2"/>
    <text x="40" y="252" class="panel-title">SPRING FESTIVAL TRANSPORT PERIOD</text>
    <text x="40" y="305" class="panel-big">${formatDate(pressure.startDate)} — ${formatDate(pressure.endDate)}</text>
    <path d="M 42 345 H 610" stroke="#456c70" stroke-width="5" stroke-linecap="round" stroke-dasharray="12 12"/>
    <circle cx="42" cy="345" r="7" fill="#456c70"/><circle cx="610" cy="345" r="7" fill="#456c70"/>
    <text x="40" y="390" class="panel-copy">40-day transport planning window.</text>
    <text x="40" y="425" class="panel-copy">It is not a 40-day public holiday.</text>
    <line x1="40" y1="470" x2="630" y2="470" stroke="#9bada7" stroke-width="2"/>
    <text x="40" y="515" class="panel-title">PLANNING BOUNDARY</text>
    <text x="40" y="553" class="panel-copy">Check live train, venue and hotel rules.</text>
    <text x="40" y="585" class="panel-copy">The calendar does not predict crowd levels.</text>
  </g>
  <text x="60" y="890" class="source">General Office of the State Council · 国办发明电〔2025〕7号 · checked 2026-08-11</text>
  <text x="60" y="922" class="source">Spring Festival transport period: Ministry of Transport · rendered from holiday-calendar.json</text>
  <text x="60" y="965" class="source">Solid band = official days off · outlined corner badge = compensatory weekend workday · no dates are forecast</text>
</svg>`;

const outputDir = path.join(
  repoRoot,
  "public/images/guides/china-public-holidays-travel-calendar",
);
await mkdir(outputDir, { recursive: true });
await sharp(Buffer.from(svg))
  .webp({ quality: 90 })
  .toFile(path.join(outputDir, "hero-1600.webp"));

console.log("Rendered 1600×1000 holiday calendar hero from holiday-calendar.json");
