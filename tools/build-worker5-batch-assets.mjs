import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = process.cwd();

const photos = [
  {
    slug: "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba",
    url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Jiefangbei_night.jpg",
  },
  {
    slug: "shanghai-where-to-stay-first-trip",
    url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/East_Nanjing_Road_at_night,_Shanghai.jpg",
  },
  {
    slug: "shenzhen-where-to-stay-futian-luohu-nanshan",
    url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/SZ_深圳市_Shenzhen_福田區_Futian_市民中心_Civic_Center_Shennan_Road_outdoor_square_October_2019_SS2.jpg",
  },
  {
    slug: "xian-where-to-stay-city-wall-or-dayanta",
    url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bell_Tower_of_Xi'an_at_night.jpg",
  },
  {
    slug: "xiamen-where-to-stay-zhongshan-gulangyu-zengcuoan",
    url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Xiamen_ferry.jpg",
  },
  {
    slug: "huangshan-summit-or-gateway-base",
    url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Huangshan_sunrise.jpg",
  },
];

const diagrams = [
  { slug: "commercial-aparthotel-or-residential-rental-china", variant: "aparthotel", accent: "#b86449" },
  { slug: "minsu-homestay-or-hotel-china", variant: "doors", accent: "#3f705f" },
  { slug: "serviced-apartment-or-hotel-china", variant: "calendar", accent: "#9b7653" },
  { slug: "beijing-courtyard-hotel-or-modern-hotel", variant: "courtyard", accent: "#7a5146" },
];

const photoSvgOverlay = Buffer.from(`
  <svg width="1600" height="1000" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="45%" stop-color="#10231b" stop-opacity="0"/><stop offset="100%" stop-color="#10231b" stop-opacity=".4"/></linearGradient></defs>
    <rect width="1600" height="1000" fill="url(#g)"/>
  </svg>`);

function diagramSvg(variant, accent) {
  const shared = `<rect width="1600" height="1000" fill="#f5efe5"/><rect x="56" y="56" width="1488" height="888" rx="38" fill="#fffaf2" stroke="#173d32" stroke-width="8"/><path d="M110 850 C380 785 550 900 810 825 S1250 770 1490 835" fill="none" stroke="#d8cfc1" stroke-width="18"/>`;
  const footer = `<circle cx="133" cy="865" r="16" fill="#173d32"/><circle cx="182" cy="865" r="16" fill="${accent}"/><circle cx="231" cy="865" r="16" fill="#d8a18b"/>`;
  let art = "";
  if (variant === "aparthotel") art = `
    <g stroke="#173d32" stroke-width="12" stroke-linejoin="round"><path d="M205 685V305h410v380" fill="#ead7c3"/><path d="M985 685V205h360v480" fill="#dce7e1"/><path d="M150 685h520M930 685h470"/><rect x="355" y="520" width="110" height="165" fill="#fffaf2"/><rect x="1110" y="520" width="110" height="165" fill="#fffaf2"/></g>
    <g fill="${accent}"><circle cx="300" cy="390" r="35"/><circle cx="520" cy="390" r="35"/><rect x="1045" y="300" width="90" height="65" rx="12"/><rect x="1200" y="300" width="90" height="65" rx="12"/></g>
    <path d="M690 495h205" stroke="#173d32" stroke-width="12" stroke-dasharray="22 22"/><path d="M840 455l55 40-55 40" fill="none" stroke="#173d32" stroke-width="12"/>`;
  if (variant === "doors") art = `
    <g stroke="#173d32" stroke-width="12"><path d="M165 700V290h330v410M635 700V235h330v465M1105 700V330h330v370" fill="#ead7c3"/><rect x="280" y="445" width="105" height="255" fill="#fffaf2"/><rect x="750" y="390" width="105" height="310" fill="#fffaf2"/><rect x="1220" y="485" width="105" height="215" fill="#fffaf2"/></g>
    <g fill="${accent}"><circle cx="360" cy="570" r="12"/><circle cx="830" cy="545" r="12"/><circle cx="1300" cy="590" r="12"/></g><path d="M215 340h225M685 285h225M1155 380h225" stroke="#d8a18b" stroke-width="24"/>`;
  if (variant === "calendar") art = `
    <rect x="175" y="205" width="600" height="530" rx="28" fill="#e7d8c5" stroke="#173d32" stroke-width="12"/><path d="M175 340h600M300 170v100M650 170v100" stroke="#173d32" stroke-width="20" stroke-linecap="round"/><g fill="${accent}"><circle cx="305" cy="445" r="34"/><circle cx="475" cy="445" r="34"/><circle cx="645" cy="445" r="34"/><circle cx="305" cy="585" r="34"/><circle cx="475" cy="585" r="34"/></g>
    <path d="M960 680V325h390v355" fill="#dce7e1" stroke="#173d32" stroke-width="12"/><path d="M1030 415h250M1030 505h250" stroke="#173d32" stroke-width="12"/><circle cx="1155" cy="595" r="42" fill="#fffaf2" stroke="#173d32" stroke-width="12"/>`;
  if (variant === "courtyard") art = `
    <g stroke="#173d32" stroke-width="12" stroke-linejoin="round"><path d="M145 455l325-225 325 225" fill="#d8a18b"/><path d="M210 430v285h520V430" fill="#ead7c3"/><rect x="410" y="500" width="120" height="215" fill="#fffaf2"/><path d="M940 715V250h380v465" fill="#dce7e1"/><rect x="1070" y="500" width="120" height="215" fill="#fffaf2"/></g><g fill="${accent}"><rect x="1010" y="335" width="80" height="70" rx="10"/><rect x="1170" y="335" width="80" height="70" rx="10"/></g><path d="M795 575h145" stroke="#173d32" stroke-width="12" stroke-dasharray="20 18"/>`;
  return `<svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">${shared}${art}${footer}</svg>`;
}

async function outputPath(slug) {
  const dir = path.join(root, "public", "images", "guides", slug);
  await mkdir(dir, { recursive: true });
  return path.join(dir, "hero-1600.webp");
}

for (const photo of photos) {
  let response = await fetch(photo.url, { headers: { "user-agent": "Homeground editorial asset builder/1.0 (editorial@homegroundchina.com)" } });
  if (response.status === 429) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    response = await fetch(photo.url, { headers: { "user-agent": "Homeground editorial asset builder/1.0 (editorial@homegroundchina.com)" } });
  }
  if (!response.ok) throw new Error(`${photo.slug}: ${response.status}`);
  const input = Buffer.from(await response.arrayBuffer());
  const output = await outputPath(photo.slug);
  await sharp(input).rotate().resize(1600, 1000, { fit: "cover", position: "centre" }).composite([{ input: photoSvgOverlay }]).webp({ quality: 82, effort: 6 }).toFile(output);
  await new Promise((resolve) => setTimeout(resolve, 1500));
}

for (const diagram of diagrams) {
  const output = await outputPath(diagram.slug);
  await sharp(Buffer.from(diagramSvg(diagram.variant, diagram.accent))).webp({ quality: 88, effort: 6 }).toFile(output);
}

for (const entry of [...photos, ...diagrams]) {
  const output = await outputPath(entry.slug);
  const data = await sharp(output).toBuffer();
  const metadata = await sharp(data).metadata();
  const sha = createHash("sha256").update(data).digest("hex");
  console.log(`${entry.slug}\t${metadata.width}x${metadata.height}\t${data.length}\t${sha}`);
}
