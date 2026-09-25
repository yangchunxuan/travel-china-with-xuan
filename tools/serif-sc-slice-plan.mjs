// Shared rules for the unicode-range slices of the Chinese editorial font.
//
// Slice 0 is the primary slice. app/globals.css declares it with no
// unicode-range, like the single file it replaces, so it stays the family's
// primary font (metrics, spaces, Latin, punctuation) and catch-all; Chinese
// pages preload it, and it is the only slice that can take part in the first
// render. Every other slice lists its own Han characters in unicode-range in a
// separate stylesheet that components/HomegroundSerifScSlices.tsx adds only
// after the page has loaded and slice 0 is in. See public/fonts/README.md.
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

export const serifScFamily = "Homeground Serif SC";
export const serifScSourcePath = "tools/fonts/homeground-serif-sc.woff2";
export const serifScPlanPath = "tools/fonts/homeground-serif-sc-slices.json";
// Declares slice 0; tools/slice-serif-sc-font.mjs rewrites its url.
export const serifScGlobalsPath = "app/globals.css";
// Written by tools/slice-serif-sc-font.mjs: the URLs of slice 0 and of the
// stylesheet that declares the other slices.
export const serifScFilesModulePath = "lib/homegroundSerifScFontFiles.ts";
// The unsliced subset must never be published again.
export const retiredSerifScFile = "homeground-serif-sc.woff2";

// Published names carry a short content hash, so a cached stylesheet can never
// point at slices from another plan.
export const contentHash = (bytes) => createHash("sha256").update(bytes).digest("hex").slice(0, 8);
export const serifScSliceFile = (index, hash) =>
  `homeground-serif-sc-${String(index).padStart(2, "0")}.${hash}.woff2`;
export const serifScStylesheetFile = (hash) => `homeground-serif-sc-slices.${hash}.css`;
// Every slice or slice stylesheet this tooling has ever written, versioned or not.
export const serifScSliceFilePattern = /^homeground-serif-sc-\d{2}(\.[0-9a-f]{8})?\.woff2$/;
export const serifScStylesheetFilePattern = /^homeground-serif-sc(-slices)?(\.[0-9a-f]{8})?\.css$/;

// Pages that must render completely in slice 0: the Chinese homepage, the
// tour and guide indexes, every tour page, and the guides the homepage and the
// first guide-index page link to.
const indexPaths = new Set(["/zh/", "/zh/tours/", "/zh/guides/"]);
export function isPriorityPath(path, featuredGuidePaths = []) {
  return indexPaths.has(path) || /^\/zh\/tours\/[^/]+\/$/.test(path) || featuredGuidePaths.includes(path);
}
// Guides linked from the exported /zh/ and /zh/guides/ pages.
export function featuredGuidePaths(chineseExportDirectory) {
  const linked = new Set();
  for (const page of ["index.html", "guides/index.html"]) {
    const file = resolve(chineseExportDirectory, page);
    if (!existsSync(file)) continue;
    for (const [, slug] of readFileSync(file, "utf8").matchAll(/href="\/zh\/guides\/([a-z0-9-]+)\/"/g)) {
      if (slug !== "page") linked.add(`/zh/guides/${slug}/`);
    }
  }
  return [...linked].sort();
}

// Target characters per on-demand slice (roughly 25 KB and 50 KB of WOFF2).
const laidOutSliceCharacters = 140;
const unusedSliceCharacters = 260;

export const isHanCodePoint = (codePoint) =>
  /\p{Script=Han}/u.test(String.fromCodePoint(codePoint));

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

// usage: output of tools/measure-serif-sc-usage.mjs. lateSerifText: serif text
// that can appear on any page only after a delay or a click, which the
// measurement cannot see (the newsletter card's headings); it goes into slice 0.
export function planFromUsage(usage, fontCodePoints, lateSerifText = "") {
  const fontHan = fontCodePoints.filter(isHanCodePoint).sort(byCodePoint);
  const inFont = new Set(fontHan);
  const hanIn = (text = "") => new Set([...text].map((character) => character.codePointAt(0)).filter((codePoint) => inFont.has(codePoint)));
  const featured = usage.featuredGuides ?? [];
  const primary = new Set(hanIn(lateSerifText));
  const laidOutPages = new Map();
  for (const page of usage.pages) {
    // Every page's first viewport, and all serif text of the priority pages
    // (hidden text included), so later slices cannot change what these show.
    for (const codePoint of hanIn(page.firstViewport)) primary.add(codePoint);
    if (isPriorityPath(page.path, featured)) {
      for (const codePoint of hanIn(page.laidOut)) primary.add(codePoint);
      for (const codePoint of hanIn(page.hidden)) primary.add(codePoint);
    }
    for (const codePoint of hanIn(page.laidOut)) laidOutPages.set(codePoint, (laidOutPages.get(codePoint) ?? 0) + 1);
  }

  const laidOut = fontHan
    .filter((codePoint) => !primary.has(codePoint) && laidOutPages.has(codePoint))
    .sort((left, right) => laidOutPages.get(right) - laidOutPages.get(left) || left - right);
  const unused = fontHan.filter((codePoint) => !primary.has(codePoint) && !laidOutPages.has(codePoint));

  return {
    family: serifScFamily,
    about:
      "Han characters per slice of the Chinese editorial font. Slice 0 also holds every non-Han character of the source font. Regenerate with tools/slice-serif-sc-font.mjs --plan-from-usage=<file from tools/measure-serif-sc-usage.mjs>.",
    measuredPages: usage.pages.length,
    featuredGuides: featured,
    slices: [
      {
        note: "Primary slice, preloaded: every serif character of /zh/, /zh/tours/, /zh/guides/, every tour page and the featured guides (hidden text included), the first viewport of every measured page and the newsletter card's headings.",
        han: toText(primary),
      },
      ...evenChunks(laidOut, laidOutSliceCharacters).map((chunk) => ({
        note: `Laid out in the serif on ${laidOutPages.get(chunk[0])}-${laidOutPages.get(chunk.at(-1))} measured pages.`,
        han: toText(chunk),
      })),
      ...evenChunks(unused, unusedSliceCharacters).map((chunk) => ({
        note: "Not laid out in the serif on any measured page (the font still covers every Han character in the site sources).",
        han: toText(chunk),
      })),
    ],
  };
}

// Returns the code points of every slice in the order they are emitted.
export function assignSlices(plan, fontCodePoints) {
  const inFont = new Set(fontCodePoints);
  const planned = new Set();
  const slices = plan.slices.map((slice, index) =>
    [...slice.han].map((character) => {
      const codePoint = character.codePointAt(0);
      if (!isHanCodePoint(codePoint)) {
        throw new Error(`Slice ${index} of the plan lists non-Han ${character}; non-Han characters always live in slice 0.`);
      }
      if (planned.has(codePoint)) throw new Error(`${character} is listed in more than one slice.`);
      planned.add(codePoint);
      return codePoint;
    }).filter((codePoint) => inFont.has(codePoint)));
  slices[0] = [...fontCodePoints.filter((codePoint) => !isHanCodePoint(codePoint)), ...slices[0]];
  const unplanned = fontCodePoints.filter((codePoint) => isHanCodePoint(codePoint) && !planned.has(codePoint));
  if (unplanned.length > 0) slices.push(unplanned);
  return {
    slices: slices.filter((slice, index) => index === 0 || slice.length > 0).map((slice) => [...slice].sort(byCodePoint)),
    unplanned,
    notInFont: [...planned].filter((codePoint) => !inFont.has(codePoint)),
  };
}

const hex = (codePoint) => codePoint.toString(16).toUpperCase().padStart(4, "0");

export function unicodeRange(codePoints) {
  const sorted = [...codePoints].sort(byCodePoint);
  const ranges = [];
  for (const codePoint of sorted) {
    const last = ranges.at(-1);
    if (last && codePoint === last[1] + 1) last[1] = codePoint;
    else ranges.push([codePoint, codePoint]);
  }
  return ranges
    .map(([start, end]) => (start === end ? `U+${hex(start)}` : `U+${hex(start)}-${hex(end)}`))
    .join(",");
}

// One @font-face rule; the primary slice has no unicode-range.
export function fontFaceRule(url, codePoints = null) {
  return [
    "@font-face {",
    `  font-family: "${serifScFamily}";`,
    "  font-display: swap;",
    "  font-style: normal;",
    "  font-weight: 500;",
    `  src: url("${url}") format("woff2");`,
    ...(codePoints ? [`  unicode-range: ${unicodeRange(codePoints)};`] : []),
    "}",
  ].join("\n");
}

// The stylesheet for slices 1..n (slice 0 is declared in app/globals.css).
export function renderStylesheet(slices, urls) {
  const rules = slices.slice(1).map((codePoints, offset) => fontFaceRule(urls[offset + 1], codePoints));
  return `/* Generated by tools/slice-serif-sc-font.mjs from ${serifScSourcePath}; do not edit. Slice 0 (${urls[0]}) is declared in ${serifScGlobalsPath}. */\n${rules.join("\n")}\n`;
}

// Points the one @font-face rule of the family in app/globals.css at slice 0.
export function rewritePrimaryFontFace(css, url) {
  let rules = 0;
  const rewritten = css.replace(/@font-face\s*\{[^}]*\}/g, (rule) => {
    if (rule.match(/font-family:\s*"([^"]+)"/)?.[1] !== serifScFamily) return rule;
    rules += 1;
    if (/unicode-range/.test(rule)) {
      throw new Error(`The ${serifScFamily} rule in ${serifScGlobalsPath} must not have a unicode-range`);
    }
    return rule.replace(/src:\s*url\("[^"]+"\)/, `src: url("${url}")`);
  });
  if (rules !== 1) throw new Error(`${serifScGlobalsPath} must declare ${serifScFamily} exactly once (found ${rules})`);
  return rewritten;
}

export function renderFilesModule(primaryUrl, stylesheetUrl) {
  return [
    `// Generated by tools/slice-serif-sc-font.mjs from ${serifScSourcePath}`,
    `// and ${serifScPlanPath}; do not edit.`,
    `export const homegroundSerifScPrimaryFontUrl = ${JSON.stringify(primaryUrl)};`,
    `export const homegroundSerifScSlicesStylesheetUrl = ${JSON.stringify(stylesheetUrl)};`,
    "",
  ].join("\n");
}

export function parseFilesModule(source) {
  const primary = source.match(/homegroundSerifScPrimaryFontUrl = "([^"]+)"/)?.[1];
  const stylesheet = source.match(/homegroundSerifScSlicesStylesheetUrl = "([^"]+)"/)?.[1];
  if (!primary || !stylesheet) throw new Error(`${serifScFilesModulePath} does not name both serif files`);
  return { primary, stylesheet };
}

// Parses @font-face rules back into { src, ranges } faces (ranges null when a
// face has no unicode-range, i.e. it covers every code point).
export function parseFontFaces(css, family = serifScFamily) {
  return [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].flatMap(([, body]) => {
    const declaredFamily = body.match(/font-family:\s*"([^"]+)"/)?.[1];
    if (declaredFamily !== family) return [];
    const src = body.match(/src:\s*url\("([^"]+)"\)/)?.[1];
    if (!src) throw new Error(`@font-face for ${family} has no src url`);
    const range = body.match(/unicode-range:\s*([^;]+);/)?.[1];
    const ranges = range
      ? range.split(",").map((token) => {
          const match = token.trim().match(/^U\+([0-9A-F]{1,6})(?:-([0-9A-F]{1,6}))?$/i);
          if (!match) throw new Error(`Unsupported unicode-range token ${token} in ${src}`);
          return [parseInt(match[1], 16), parseInt(match[2] ?? match[1], 16)];
        })
      : null;
    return [{ src, ranges }];
  });
}

// Every face of the family in declaration order: the faces app/globals.css
// declares (slice 0, no range), then the faces of the slice stylesheet.
export function readSerifScFaces(projectRoot, fontDirectory = "public/fonts") {
  const files = parseFilesModule(readFileSync(resolve(projectRoot, serifScFilesModulePath), "utf8"));
  const globalsFaces = parseFontFaces(readFileSync(resolve(projectRoot, serifScGlobalsPath), "utf8"));
  const stylesheetPath = resolve(projectRoot, fontDirectory, files.stylesheet.replace(/^\/fonts\//, ""));
  const later = existsSync(stylesheetPath) ? parseFontFaces(readFileSync(stylesheetPath, "utf8")) : null;
  return {
    files,
    globalsFaces,
    stylesheetPath,
    faces: [...globalsFaces, ...(later ?? [])],
    stylesheetFound: later !== null,
  };
}

// The face a browser consults first for a code point: the last-defined face
// whose unicode-range contains it.
export function routeCodePoint(faces, codePoint) {
  for (let index = faces.length - 1; index >= 0; index -= 1) {
    const { ranges } = faces[index];
    if (!ranges || ranges.some(([start, end]) => codePoint >= start && codePoint <= end)) return index;
  }
  return -1;
}
