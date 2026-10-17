import { readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { parse } from "parse5";

// UI choices are deliberately independent of head hreflang alternates: a
// homepage fallback is a way into an edition, not a translated version.
const editions = [
  { lang: "en", label: "English" },
  { lang: "zh-Hans", label: "中文" },
  { lang: "ko", label: "한국어" },
  { lang: "ja", label: "日本語" },
  { lang: "es", label: "Español" },
  { lang: "fr", label: "Français" },
  { lang: "de", label: "Deutsch" },
  { lang: "ar", label: "العربية" },
];
const origin = "https://homegroundchina.com";
const output = resolve(process.argv[2] ?? "out");
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const attr = (node, name) => node?.attrs?.find((entry) => entry.name === name)?.value;
const hasClass = (node, name) => (attr(node, "class") ?? "").split(/\s+/u).some((value) => value.startsWith(`HomegroundHeader_${name}__`));
const normalizeLanguage = (language) => language?.toLowerCase().startsWith("zh") ? "zh-Hans" : language?.toLowerCase().split("-")[0];
const isSiteHeader = (node) => node.tagName === "header" && (hasClass(node, "siteHeader") || attr(node, "data-homeground-header-locale") !== undefined);

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.name.endsWith(".html") ? [file] : [];
  });
}

function elements(node, predicate) {
  const matches = [];
  if (!node) return matches;
  function visit(current) {
    if (predicate(current)) matches.push(current);
    for (const child of current.childNodes ?? []) visit(child);
  }
  visit(node);
  return matches;
}

function visibleText(node) {
  if (hasClass(node, "languageChoiceShort") || attr(node, "aria-hidden") === "true" || attr(node, "hidden") !== undefined) return "";
  return node.value ?? (node.childNodes ?? []).map(visibleText).join("");
}

function explicitlyHidden(node, header) {
  for (let current = node; current; current = current.parentNode) {
    if (attr(current, "hidden") !== undefined || attr(current, "inert") !== undefined || attr(current, "aria-hidden") === "true" || /(?:display\s*:\s*none|visibility\s*:\s*hidden)/iu.test(attr(current, "style") ?? "")) return true;
    if (current === header) break;
  }
  return false;
}

function exportedTarget(href, route, exportedFiles) {
  const url = new URL(href, `${origin}${route}`);
  if (url.origin !== origin) return undefined;
  const target = resolve(output, `.${decodeURIComponent(url.pathname)}`);
  if (target !== output && !target.startsWith(`${output}${sep}`)) return undefined;
  // URL.pathname intentionally omits selections and fragment destinations.
  return [target, join(target, "index.html"), `${target}.html`].find((file) => exportedFiles.has(file));
}

function streamedSegment(header, boundaries) {
  for (let current = header.parentNode; current; current = current.parentNode) {
    const id = attr(current, "id");
    if (attr(current, "hidden") !== undefined && /^S:/u.test(id ?? "") && boundaries.has(`B:${id.slice(2)}`)) return current;
  }
  return undefined;
}

function fallbackHeaders(template) {
  const siblings = template.parentNode.childNodes;
  const headers = [];
  let nestedBoundaries = 0;
  for (let index = siblings.indexOf(template) + 1; index < siblings.length; index++) {
    const sibling = siblings[index];
    if (sibling.nodeName === "#comment") {
      if (sibling.data === "/$") {
        if (!nestedBoundaries) break;
        nestedBoundaries--;
      } else if (/^\$(?:[?!])?$/u.test(sibling.data)) nestedBoundaries++;
    }
    headers.push(...elements(sibling, isSiteHeader));
  }
  return headers;
}

const files = htmlFiles(output);
const exportedFiles = new Set(files);
let checkedPages = 0;
let checkedHeaders = 0;
let checkedLinks = 0;
for (const file of files) {
  const html = readFileSync(file, "utf8");
  if (!html.includes("HomegroundHeader_siteHeader__") && !html.includes("data-homeground-header-locale")) continue;
  const doc = parse(html);
  const headers = elements(doc, isSiteHeader);
  if (!headers.length) continue;
  checkedPages++;
  const fileRoute = `/${relative(output, file).split(sep).join("/")}`;
  const route = fileRoute.endsWith("/index.html") ? fileRoute.slice(0, -"index.html".length) : fileRoute;
  const htmlLanguage = normalizeLanguage(attr(elements(doc, (node) => node.tagName === "html")[0], "lang"));
  check(editions.some(({ lang }) => lang === htmlLanguage), `${route}: supported html language`);
  // Next Suspense exports both the initial fallback and its resolved header
  // in a hidden S:n segment. The browser swaps that segment into B:n; these
  // are alternative rendered candidates, rather than duplicate site headers.
  const boundaries = new Map(elements(doc, (node) => node.tagName === "template" && /^B:/u.test(attr(node, "id") ?? "")).map((node) => [attr(node, "id"), node]));
  const initialHeaders = headers.filter((header) => !streamedSegment(header, boundaries));
  check(initialHeaders.length === 1, `${route}: expected one initial shared site header, found ${initialHeaders.length}`);
  const segments = new Set(headers.map((header) => streamedSegment(header, boundaries)).filter(Boolean));
  for (const segment of segments) {
    const segmentId = attr(segment, "id");
    check(elements(segment, isSiteHeader).length === 1, `${route}: ${segmentId} must contain one resolved site header`);
    check(fallbackHeaders(boundaries.get(`B:${segmentId.slice(2)}`)).length === 1, `${route}: ${segmentId} must replace one fallback site header`);
  }
  for (const header of headers) {
    checkedHeaders++;
    const desktopNav = elements(header, (node) => node.tagName === "nav" && hasClass(node, "desktopNav"))[0];
    const corporateRoot = "/corporate-travel/";
    const corporatePurposePaths = ["company-trips", "incentive-travel", "meetings-retreats"].map((id) => `${corporateRoot}#${id}`);
    const desktopCompanyLinks = elements(desktopNav, (node) => node.tagName === "a" && attr(node, "href") === corporateRoot);
    check(desktopCompanyLinks.length === 1, `${route}: one independent desktop company-travel entrance`);
    const desktopPurposes = elements(desktopNav, (node) => node.tagName === "a" && corporatePurposePaths.includes(attr(node, "href"))).map((node) => attr(node, "href"));
    check(JSON.stringify(desktopPurposes) === JSON.stringify(corporatePurposePaths), `${route}: desktop company menu must list all three purposes in order`);
    const mobileCompany = elements(header, (node) => attr(node, "data-section") === "corporate");
    check(mobileCompany.length === 1, `${route}: one independent mobile company-travel section`);
    const mobileCompanyLinks = mobileCompany.flatMap((section) => elements(section, (node) => node.tagName === "a").map((node) => attr(node, "href")));
    check(JSON.stringify(mobileCompanyLinks) === JSON.stringify([corporateRoot, ...corporatePurposePaths]), `${route}: mobile company overview and three purposes`);
    const mobileServices = elements(header, (node) => attr(node, "data-menu") === "services");
    check(mobileServices.every((section) => elements(section, (node) => node.tagName === "a").every((node) => !attr(node, "href")?.startsWith(corporateRoot))), `${route}: company travel must not be nested inside services`);
    check(normalizeLanguage(attr(header, "data-homeground-header-locale")) === htmlLanguage, `${route}: header locale must match html language ${htmlLanguage}`);
    const navs = elements(header, (node) => node.tagName === "nav" && hasClass(node, "languageNav"));
    check(navs.length === 1, `${route}: expected one desktop language nav, found ${navs.length}`);
    for (const nav of navs) {
      check(!explicitlyHidden(nav, header), `${route}: desktop language nav must not be explicitly hidden`);
      const links = elements(nav, (node) => node.tagName === "a");
      check(links.length === editions.length, `${route}: expected eight language choices, found ${links.length}`);
      const current = links.filter((node) => attr(node, "aria-current") !== undefined && attr(node, "aria-current") !== "false");
      check(current.length === 1, `${route}: expected one current language, found ${current.length}`);
      if (current.length === 1) check(normalizeLanguage(attr(current[0], "lang")) === htmlLanguage, `${route}: current language must be ${htmlLanguage}`);
      for (const [index, link] of links.entries()) {
        const edition = editions[index];
        const language = normalizeLanguage(attr(link, "lang"));
        check(language === edition?.lang, `${route}: language choice ${index + 1} must be ${edition?.lang ?? "absent"}, found ${language}`);
        check(normalizeLanguage(attr(link, "hreflang")) === language, `${route}: ${language} link lang and hreflang must match`);
        check(visibleText(link).replace(/\s+/gu, " ").trim() === edition?.label, `${route}: ${language} must use its endonym ${edition?.label}`);
        const href = attr(link, "href");
        let target;
        try { target = href ? exportedTarget(href, route, exportedFiles) : undefined; } catch { /* Report malformed URLs alongside broken paths. */ }
        check(Boolean(target), `${route}: ${language} language href does not resolve to exported HTML: ${href ?? "missing"}`);
        checkedLinks++;
      }
      const triggers = elements(nav, (node) => node.tagName === "button" && hasClass(node, "languageMenuButton"));
      check(triggers.length === 1, `${route}: expected one language disclosure trigger, found ${triggers.length}`);
      if (triggers.length === 1) {
        const edition = editions.find(({ lang }) => lang === htmlLanguage);
        check(normalizeLanguage(attr(triggers[0], "lang")) === htmlLanguage, `${route}: language trigger must use ${htmlLanguage}`);
        check(visibleText(triggers[0]).replace(/\s+/gu, " ").trim() === edition?.label, `${route}: language trigger must label the current edition ${edition?.label}`);
      }
    }
  }
}
check(checkedPages > 0, "No shared Homeground headers found in exported HTML");
if (errors.length) {
  console.error(`Header language export failed (${errors.length} issues across ${checkedPages} pages):\n${errors.slice(0, 40).join("\n")}${errors.length > 40 ? `\n... ${errors.length - 40} further issues` : ""}`);
  process.exitCode = 1;
} else {
  console.log(`Header language export: ${checkedPages} pages, ${checkedHeaders} rendered header candidates and ${checkedLinks} language links checked; all eight editions, current labels, exported destinations and independent company menus are valid.`);
}
