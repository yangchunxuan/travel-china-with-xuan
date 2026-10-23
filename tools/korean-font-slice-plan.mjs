// Shared rules for the unicode-range slices of the two Korean fonts.
//
// Each family has a primary slice, 00. app/globals.css declares it with no
// unicode-range, like the single file it replaces, so it stays the family's
// primary font (metrics, spaces, Latin, punctuation) and catch-all; Korean
// pages preload both primary slices, and they are the only Korean font files
// that can take part in the first render. Every other slice lists its own
// Hangul in unicode-range, in one stylesheet that
// components/HomegroundKoreanFontSlices.tsx adds only after the page has loaded
// and both primary slices are in. See public/fonts/README.md.
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { contentHash, parseFontFaces, routeCodePoint, unicodeRange } from "./serif-sc-slice-plan.mjs";

export { contentHash, routeCodePoint };

// The unsliced subsets written by tools/rebuild-locale-fonts.mjs. They are the
// slicing sources and are never published.
export const koreanFonts = [
  {
    key: "pretendard",
    family: "Homeground Pretendard",
    stem: "homeground-pretendard-ko",
    sourcePath: "tools/fonts/homeground-pretendard-ko.woff2",
    weight: "400 920",
    format: "woff2-variations",
    // What components/HomegroundKoreanFontSlices.tsx waits for.
    primaryFace: '400 1em "Homeground Pretendard"',
  },
  {
    key: "maruburi",
    family: "Homeground MaruBuri",
    stem: "homeground-maruburi-ko",
    sourcePath: "tools/fonts/homeground-maruburi-ko.woff2",
    weight: "400",
    format: "woff2",
    primaryFace: '400 1em "Homeground MaruBuri"',
  },
];
export const koreanPlanPath = "tools/fonts/homeground-korean-font-slices.json";
// Declares slice 00 of each family; tools/slice-korean-fonts.mjs rewrites the urls.
export const koreanGlobalsPath = "app/globals.css";
// Written by tools/slice-korean-fonts.mjs.
export const koreanFilesModulePath = "lib/homegroundKoreanFontFiles.ts";

export const koreanSliceFile = (stem, index, hash) => `${stem}-${String(index).padStart(2, "0")}.${hash}.woff2`;
export const koreanStylesheetFile = (hash) => `homeground-korean-slices.${hash}.css`;
// Every Korean font file or slice stylesheet this tooling has ever written,
// versioned or not, including the retired unsliced files.
export const koreanFontFilePattern = /^homeground-(pretendard|maruburi)-ko(-\d{2}\.[0-9a-f]{8})?\.woff2$/;
export const koreanStylesheetFilePattern = /^homeground-korean-slices(\.[0-9a-f]{8})?\.css$/;
export const retiredKoreanFiles = ["homeground-pretendard-ko.woff2", "homeground-maruburi-ko.woff2"];

// Pages that must render completely in the primary slices: the Korean
// homepage, the tour and guide indexes, every tour page, and the guides the
// homepage and the first guide-index page link to.
const indexPaths = new Set(["/ko/", "/ko/tours/", "/ko/guides/"]);
export function isPriorityPath(path, featuredGuidePaths = []) {
  return indexPaths.has(path) || /^\/ko\/tours\/[^/]+\/$/.test(path) || featuredGuidePaths.includes(path);
}
export function featuredGuidePaths(koreanExportDirectory) {
  const linked = new Set();
  for (const page of ["index.html", "guides/index.html"]) {
    const file = resolve(koreanExportDirectory, page);
    if (!existsSync(file)) continue;
    for (const [, slug] of readFileSync(file, "utf8").matchAll(/href="\/ko\/guides\/([a-z0-9-]+)\/"/g)) {
      if (slug !== "page") linked.add(`/ko/guides/${slug}/`);
    }
  }
  return [...linked].sort();
}

export const isHangulCodePoint = (codePoint) => /\p{Script=Hangul}/u.test(String.fromCodePoint(codePoint));

// Target Hangul per on-demand slice.
const laidOutSliceCharacters = 160;
const unusedSliceCharacters = 320;

const byCodePoint = (left, right) => left - right;
const toText = (codePoints) =>
  [...codePoints].sort(byCodePoint).map((codePoint) => String.fromCodePoint(codePoint)).join("");

function evenChunks(list, targetSize) {
  if (list.length === 0) return [];
  const count = Math.ceil(list.length / targetSize);
  const size = Math.ceil(list.length / count);
  const chunks = [];
  for (let start = 0; start < list.length; start += size) chunks.push(list.slice(start, start + size));
  return chunks;
}

// usage: output of tools/measure-korean-font-usage.mjs for one family.
// lateText: text of that family that appears only after a delay or a click,
// which the measurement cannot see (the newsletter card); it goes into slice 00.
export function planFromUsage(usage, family, fontCodePoints, lateText = "") {
  const fontHangul = fontCodePoints.filter(isHangulCodePoint).sort(byCodePoint);
  const inFont = new Set(fontHangul);
  const hangulIn = (text = "") =>
    new Set([...text].map((character) => character.codePointAt(0)).filter((codePoint) => inFont.has(codePoint)));
  const featured = usage.featuredGuides ?? [];
  const primary = new Set(hangulIn(lateText));
  const laidOutPages = new Map();
  for (const page of usage.pages) {
    const measured = page.families[family] ?? { laidOut: "", firstViewport: "", hidden: "" };
    // Every page's first viewport, and all text of the priority pages (hidden
    // text included: the menus and panels every page shares), so later slices
    // cannot change what these show.
    for (const codePoint of hangulIn(measured.firstViewport)) primary.add(codePoint);
    if (isPriorityPath(page.path, featured)) {
      for (const codePoint of hangulIn(measured.laidOut)) primary.add(codePoint);
      for (const codePoint of hangulIn(measured.hidden)) primary.add(codePoint);
    }
    for (const codePoint of hangulIn(measured.laidOut)) laidOutPages.set(codePoint, (laidOutPages.get(codePoint) ?? 0) + 1);
  }

  const laidOut = fontHangul
    .filter((codePoint) => !primary.has(codePoint) && laidOutPages.has(codePoint))
    .sort((left, right) => laidOutPages.get(right) - laidOutPages.get(left) || left - right);
  const unused = fontHangul.filter((codePoint) => !primary.has(codePoint) && !laidOutPages.has(codePoint));
  return [
    {
      note: "Primary slice, preloaded: the first viewport of every measured page, all text of /ko/, /ko/tours/, /ko/guides/, every tour page and the featured guides (hidden text included), and the newsletter card.",
      hangul: toText(primary),
    },
    ...evenChunks(laidOut, laidOutSliceCharacters).map((chunk) => ({
      note: `Laid out on ${laidOutPages.get(chunk[0])}-${laidOutPages.get(chunk.at(-1))} measured pages.`,
      hangul: toText(chunk),
    })),
    ...evenChunks(unused, unusedSliceCharacters).map((chunk) => ({
      note: "Not laid out in this family on any measured page (the font still covers every Hangul character in the site sources).",
      hangul: toText(chunk),
    })),
  ];
}

// Returns the code points of every slice of one family in emission order.
export function assignSlices(slicePlan, fontCodePoints) {
  const inFont = new Set(fontCodePoints);
  const planned = new Set();
  const slices = slicePlan.map((slice, index) =>
    [...slice.hangul]
      .map((character) => {
        const codePoint = character.codePointAt(0);
        if (!isHangulCodePoint(codePoint)) {
          throw new Error(`Slice ${index} of the Korean plan lists non-Hangul ${character}; non-Hangul characters always live in slice 00.`);
        }
        if (planned.has(codePoint)) throw new Error(`${character} is listed in more than one slice.`);
        planned.add(codePoint);
        return codePoint;
      })
      .filter((codePoint) => inFont.has(codePoint)),
  );
  slices[0] = [...fontCodePoints.filter((codePoint) => !isHangulCodePoint(codePoint)), ...slices[0]];
  const unplanned = fontCodePoints.filter((codePoint) => isHangulCodePoint(codePoint) && !planned.has(codePoint));
  if (unplanned.length > 0) slices.push(unplanned);
  return {
    slices: slices.filter((slice, index) => index === 0 || slice.length > 0).map((slice) => [...slice].sort(byCodePoint)),
    unplanned,
    notInFont: [...planned].filter((codePoint) => !inFont.has(codePoint)),
  };
}

// One @font-face rule; slice 00 has no unicode-range.
export function fontFaceRule(font, url, codePoints = null) {
  return [
    "@font-face {",
    `  font-family: "${font.family}";`,
    "  font-display: swap;",
    "  font-style: normal;",
    `  font-weight: ${font.weight};`,
    `  src: url("${url}") format("${font.format}");`,
    ...(codePoints ? [`  unicode-range: ${unicodeRange(codePoints)};`] : []),
    "}",
  ].join("\n");
}

// The stylesheet for slices 01..n of both families.
export function renderStylesheet(families) {
  const rules = families.flatMap(({ font, slices, urls }) =>
    slices.slice(1).map((codePoints, offset) => fontFaceRule(font, urls[offset + 1], codePoints)),
  );
  return `/* Generated by tools/slice-korean-fonts.mjs; do not edit. Slice 00 of each family is declared in ${koreanGlobalsPath}. */\n${rules.join("\n")}\n`;
}

// Points the one @font-face rule of a family in app/globals.css at its slice 00.
export function rewritePrimaryFontFace(css, font, url) {
  let rules = 0;
  const rewritten = css.replace(/@font-face\s*\{[^}]*\}/g, (rule) => {
    if (rule.match(/font-family:\s*"([^"]+)"/)?.[1] !== font.family) return rule;
    rules += 1;
    if (/unicode-range/.test(rule)) throw new Error(`The ${font.family} rule in ${koreanGlobalsPath} must not have a unicode-range`);
    return rule.replace(/src:\s*url\("[^"]+"\)/, `src: url("${url}")`);
  });
  if (rules !== 1) throw new Error(`${koreanGlobalsPath} must declare ${font.family} exactly once (found ${rules})`);
  return rewritten;
}

export function renderFilesModule(pretendardUrl, maruBuriUrl, stylesheetUrl) {
  return [
    "// Generated by tools/slice-korean-fonts.mjs from the Korean subsets in tools/fonts",
    `// and ${koreanPlanPath}; do not edit.`,
    `export const homegroundPretendardPrimaryFontUrl = ${JSON.stringify(pretendardUrl)};`,
    `export const homegroundMaruBuriPrimaryFontUrl = ${JSON.stringify(maruBuriUrl)};`,
    `export const homegroundKoreanSlicesStylesheetUrl = ${JSON.stringify(stylesheetUrl)};`,
    "",
  ].join("\n");
}

export function parseFilesModule(source) {
  const pretendard = source.match(/homegroundPretendardPrimaryFontUrl = "([^"]+)"/)?.[1];
  const maruburi = source.match(/homegroundMaruBuriPrimaryFontUrl = "([^"]+)"/)?.[1];
  const stylesheet = source.match(/homegroundKoreanSlicesStylesheetUrl = "([^"]+)"/)?.[1];
  if (!pretendard || !maruburi || !stylesheet) throw new Error(`${koreanFilesModulePath} does not name all three Korean font files`);
  return { primary: { pretendard, maruburi }, stylesheet };
}

// Every face of each family in declaration order: slice 00 from
// app/globals.css, then the faces of the slice stylesheet.
export function readKoreanFaces(projectRoot, fontDirectory = "public/fonts") {
  const files = parseFilesModule(readFileSync(resolve(projectRoot, koreanFilesModulePath), "utf8"));
  const globals = readFileSync(resolve(projectRoot, koreanGlobalsPath), "utf8");
  const stylesheetPath = resolve(projectRoot, fontDirectory, files.stylesheet.replace(/^\/fonts\//, ""));
  const stylesheet = existsSync(stylesheetPath) ? readFileSync(stylesheetPath, "utf8") : null;
  return {
    files,
    stylesheetFound: stylesheet !== null,
    families: koreanFonts.map((font) => {
      const globalsFaces = parseFontFaces(globals, font.family);
      return {
        font,
        globalsFaces,
        faces: [...globalsFaces, ...(stylesheet ? parseFontFaces(stylesheet, font.family) : [])],
      };
    }),
  };
}
