// Shared rules for the unicode-range slices of the Chinese editorial font.
//
// Slice 0 is preloaded on every Chinese page and declares no unicode-range, so
// it stays the family's primary font (metrics, spaces, Latin, punctuation) and
// the catch-all for any character outside the other slices, exactly like the
// single file it replaces. Every other slice lists its own Han characters in
// unicode-range; the browser downloads it only when a page lays one of them out
// in the serif. See public/fonts/README.md.
export const serifScFamily = "Homeground Serif SC";
export const serifScSourcePath = "tools/fonts/homeground-serif-sc.woff2";
export const serifScPlanPath = "tools/fonts/homeground-serif-sc-slices.json";
export const serifScStylesheetFile = "homeground-serif-sc.css";
export const serifScSliceFilePattern = /^homeground-serif-sc-\d{2}\.woff2$/;
export const serifScSliceFile = (index) =>
  `homeground-serif-sc-${String(index).padStart(2, "0")}.woff2`;

// Pages whose first viewport must be complete in slice 0: the Chinese homepage,
// the tour and guide indexes, and every tour product page.
const priorityPaths = new Set(["/zh/", "/zh/tours/", "/zh/guides/"]);
export function isPriorityPath(path) {
  return priorityPaths.has(path) || /^\/zh\/tours\/[^/]+\/$/.test(path);
}

// Characters in the first viewport of at least this many pages also go to slice 0.
const sharedFirstViewportPages = 10;
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

// usage: output of tools/measure-serif-sc-usage.mjs.
export function planFromUsage(usage, fontCodePoints) {
  const fontHan = fontCodePoints.filter(isHanCodePoint).sort(byCodePoint);
  const inFont = new Set(fontHan);
  const hanIn = (text) => new Set([...text].map((character) => character.codePointAt(0)).filter((codePoint) => inFont.has(codePoint)));
  const priorityFirstViewport = new Set();
  const firstViewportPages = new Map();
  const laidOutPages = new Map();
  const priorityLaidOutPages = new Map();
  const count = (map, codePoint) => map.set(codePoint, (map.get(codePoint) ?? 0) + 1);
  for (const page of usage.pages) {
    for (const codePoint of hanIn(page.firstViewport)) {
      count(firstViewportPages, codePoint);
      if (isPriorityPath(page.path)) priorityFirstViewport.add(codePoint);
    }
    for (const codePoint of hanIn(page.laidOut)) {
      count(laidOutPages, codePoint);
      if (isPriorityPath(page.path)) count(priorityLaidOutPages, codePoint);
    }
  }

  const preloaded = new Set(fontHan.filter((codePoint) =>
    priorityFirstViewport.has(codePoint) ||
    (firstViewportPages.get(codePoint) ?? 0) >= sharedFirstViewportPages));
  // The rest of the priority pages' serif text gets its own slices, so a tour
  // page fetches a few slices instead of one from every usage band.
  const priorityRest = fontHan
    .filter((codePoint) => !preloaded.has(codePoint) && priorityLaidOutPages.has(codePoint))
    .sort((left, right) =>
      priorityLaidOutPages.get(right) - priorityLaidOutPages.get(left) ||
      laidOutPages.get(right) - laidOutPages.get(left) || left - right);
  const laidOut = fontHan
    .filter((codePoint) => !preloaded.has(codePoint) && !priorityLaidOutPages.has(codePoint) && laidOutPages.has(codePoint))
    .sort((left, right) => laidOutPages.get(right) - laidOutPages.get(left) || left - right);
  const unused = fontHan.filter((codePoint) => !preloaded.has(codePoint) && !laidOutPages.has(codePoint));

  return {
    family: serifScFamily,
    about:
      "Han characters per slice of the Chinese editorial font. Slice 0 also holds every non-Han character of the source font. Regenerate with tools/slice-serif-sc-font.mjs --plan-from-usage=<file from tools/measure-serif-sc-usage.mjs>.",
    measuredPages: usage.pages.length,
    slices: [
      {
        note: `First viewport of the Chinese homepage, tour index, guide index and every tour page, plus characters in the first viewport of at least ${sharedFirstViewportPages} pages. Preloaded.`,
        han: toText(preloaded),
      },
      ...evenChunks(priorityRest, laidOutSliceCharacters).map((chunk) => ({
        note: `Rest of the serif text on the priority pages: laid out on ${priorityLaidOutPages.get(chunk[0])}-${priorityLaidOutPages.get(chunk.at(-1))} of them.`,
        han: toText(chunk),
      })),
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

export function renderStylesheet(slices) {
  const rules = slices.map((codePoints, index) => [
    "@font-face {",
    `  font-family: "${serifScFamily}";`,
    "  font-display: swap;",
    "  font-style: normal;",
    "  font-weight: 500;",
    `  src: url("/fonts/${serifScSliceFile(index)}") format("woff2");`,
    ...(index === 0 ? [] : [`  unicode-range: ${unicodeRange(codePoints)};`]),
    "}",
  ].join("\n"));
  return `/* Generated by tools/slice-serif-sc-font.mjs from ${serifScSourcePath}; do not edit. */\n${rules.join("\n")}\n`;
}

// Parses the generated stylesheet back into { src, ranges } faces (ranges null
// when a face has no unicode-range, i.e. it covers every code point).
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

// The face a browser consults first for a code point: the last-defined face
// whose unicode-range contains it.
export function routeCodePoint(faces, codePoint) {
  for (let index = faces.length - 1; index >= 0; index -= 1) {
    const { ranges } = faces[index];
    if (!ranges || ranges.some(([start, end]) => codePoint >= start && codePoint <= end)) return index;
  }
  return -1;
}
