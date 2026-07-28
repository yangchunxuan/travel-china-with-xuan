import { readFile } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.join(process.cwd(), "out");
const siteUrl = "https://homegroundchina.com";

const languageUrls = {
  home: {
    en: `${siteUrl}/`,
    "zh-Hans": `${siteUrl}/zh/`,
    ko: `${siteUrl}/ko/`,
    "x-default": `${siteUrl}/`,
  },
  transport: {
    en: `${siteUrl}/guides/beijing-zhangjiajie-shanghai-transport/`,
    "zh-Hans": `${siteUrl}/zh/guides/beijing-zhangjiajie-shanghai-transport/`,
    ko: `${siteUrl}/ko/guides/beijing-zhangjiajie-shanghai-transport/`,
    "x-default": `${siteUrl}/guides/beijing-zhangjiajie-shanghai-transport/`,
  },
  usVisa: {
    en: `${siteUrl}/guides/do-us-citizens-need-visa-china-2026/`,
    "zh-Hans": `${siteUrl}/zh/guides/do-us-citizens-need-visa-china-2026/`,
    ko: `${siteUrl}/ko/guides/do-us-citizens-need-visa-china-2026/`,
    "x-default": `${siteUrl}/guides/do-us-citizens-need-visa-china-2026/`,
  },
  singaporeVisa: {
    en: `${siteUrl}/guides/do-singaporeans-need-visa-china/`,
    "zh-Hans": `${siteUrl}/zh/guides/do-singaporeans-need-visa-china/`,
    ko: `${siteUrl}/ko/guides/do-singaporeans-need-visa-china/`,
    "x-default": `${siteUrl}/guides/do-singaporeans-need-visa-china/`,
  },
};

const checks = [
  {
    route: "ko/",
    canonical: languageUrls.home.ko,
    htmlLang: "ko",
    alternates: languageUrls.home,
    linkedFrom: "index.html",
  },
  {
    route: "zh/guides/beijing-zhangjiajie-shanghai-transport/",
    canonical: languageUrls.transport["zh-Hans"],
    htmlLang: "zh-Hans",
    alternates: languageUrls.transport,
    linkedFrom: "zh/guides/index.html",
  },
  {
    route: "guides/do-us-citizens-need-visa-china-2026/",
    canonical: languageUrls.usVisa.en,
    htmlLang: "en",
    alternates: languageUrls.usVisa,
    linkedFrom: "guides/index.html",
  },
  {
    route: "zh/guides/do-us-citizens-need-visa-china-2026/",
    canonical: languageUrls.usVisa["zh-Hans"],
    htmlLang: "zh-Hans",
    alternates: languageUrls.usVisa,
    linkedFrom: "zh/guides/index.html",
  },
  {
    route: "ko/guides/do-us-citizens-need-visa-china-2026/",
    canonical: languageUrls.usVisa.ko,
    htmlLang: "ko",
    alternates: languageUrls.usVisa,
    linkedFrom: "ko/guides/index.html",
  },
  {
    route: "guides/china-visa-free-canadian-citizens-2026/",
    canonical: `${siteUrl}/guides/china-visa-free-canadian-citizens-2026/`,
    htmlLang: "en",
    alternates: {
      en: `${siteUrl}/guides/china-visa-free-canadian-citizens-2026/`,
      "x-default": `${siteUrl}/guides/china-visa-free-canadian-citizens-2026/`,
    },
    linkedFrom: "guides/china-entry-requirements/index.html",
  },
  {
    route: "guides/do-singaporeans-need-visa-china/",
    canonical: languageUrls.singaporeVisa.en,
    htmlLang: "en",
    alternates: languageUrls.singaporeVisa,
    linkedFrom: "guides/index.html",
    mustContain: "You Don&#x27;t Need a China Visa. Here&#x27;s the Harder Question.",
  },
  {
    route: "zh/guides/do-singaporeans-need-visa-china/",
    canonical: languageUrls.singaporeVisa["zh-Hans"],
    htmlLang: "zh-Hans",
    alternates: languageUrls.singaporeVisa,
    linkedFrom: "zh/guides/index.html",
    mustContain: "去中国不需要签证。更难的问题在这里。",
    mustNotContain:
      "You Don&#x27;t Need a China Visa. Here&#x27;s the Harder Question.",
  },
  {
    route: "ko/guides/do-singaporeans-need-visa-china/",
    canonical: languageUrls.singaporeVisa.ko,
    htmlLang: "ko",
    alternates: languageUrls.singaporeVisa,
    linkedFrom: "ko/guides/index.html",
    mustContain:
      "중국 비자는 필요 없습니다. 더 어려운 질문은 따로 있습니다.",
    mustNotContain:
      "You Don&#x27;t Need a China Visa. Here&#x27;s the Harder Question.",
  },
];

function routeToIndexPath(route) {
  return path.join(outputRoot, route, "index.html");
}

function routePathFromCanonical(canonical) {
  return new URL(canonical).pathname;
}

function assertIncludes(source, needle, context) {
  if (!source.includes(needle)) {
    throw new Error(`${context}: missing ${needle}`);
  }
}

const sitemap = await readFile(path.join(outputRoot, "sitemap.xml"), "utf8");

for (const check of checks) {
  const html = await readFile(routeToIndexPath(check.route), "utf8");

  assertIncludes(
    html,
    `<link rel="canonical" href="${check.canonical}"/>`,
    check.route,
  );
  assertIncludes(html, `<html lang="${check.htmlLang}"`, check.route);
  assertIncludes(sitemap, `<loc>${check.canonical}</loc>`, check.route);

  if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) {
    throw new Error(`${check.route}: exported page contains noindex`);
  }

  for (const [language, url] of Object.entries(check.alternates)) {
    assertIncludes(
      html,
      `<link rel="alternate" hrefLang="${language}" href="${url}"/>`,
      check.route,
    );
  }

  const sourcePage = await readFile(
    path.join(outputRoot, check.linkedFrom),
    "utf8",
  );
  assertIncludes(
    sourcePage,
    `href="${routePathFromCanonical(check.canonical)}"`,
    `${check.route} internal link`,
  );

  if (check.mustContain) {
    assertIncludes(html, check.mustContain, check.route);
  }

  if (check.mustNotContain && html.includes(check.mustNotContain)) {
    throw new Error(
      `${check.route}: contains the English duplicate instead of localized copy`,
    );
  }
}

console.log(
  `✓ ${checks.length} priority index targets have self-canonicals, hreflang, sitemap entries, crawlable output and static internal links.`,
);
