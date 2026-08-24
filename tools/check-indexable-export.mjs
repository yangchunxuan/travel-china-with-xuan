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
  olderParents: {
    en: `${siteUrl}/guides/china-itinerary-with-older-parents/`,
    "zh-Hans": `${siteUrl}/zh/guides/china-itinerary-with-older-parents/`,
    ko: `${siteUrl}/ko/guides/china-itinerary-with-older-parents/`,
    "x-default": `${siteUrl}/guides/china-itinerary-with-older-parents/`,
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
    mustContain: "Do Singaporeans Need a Visa for China? The 30-Day Rule",
  },
  {
    route: "zh/guides/do-singaporeans-need-visa-china/",
    canonical: languageUrls.singaporeVisa["zh-Hans"],
    htmlLang: "zh-Hans",
    alternates: languageUrls.singaporeVisa,
    linkedFrom: "zh/guides/index.html",
    mustContain: "新加坡护照去中国需要签证吗？30 天互免签证规则",
    mustNotContain:
      "Do Singaporeans Need a Visa for China? The 30-Day Rule",
  },
  {
    route: "ko/guides/do-singaporeans-need-visa-china/",
    canonical: languageUrls.singaporeVisa.ko,
    htmlLang: "ko",
    alternates: languageUrls.singaporeVisa,
    linkedFrom: "ko/guides/index.html",
    mustContain:
      "싱가포르 여권으로 중국 비자가 필요할까? 30일 무비자 규정",
    mustNotContain:
      "Do Singaporeans Need a Visa for China? The 30-Day Rule",
  },
  {
    route: "guides/china-itinerary-with-older-parents/",
    canonical: languageUrls.olderParents.en,
    htmlLang: "en",
    alternates: languageUrls.olderParents,
    linkedFrom: "guides/index.html",
    mustContain:
      "Taking Your Parents to China? Build the Route Around Energy, Not Just Cities",
  },
  {
    route: "zh/guides/china-itinerary-with-older-parents/",
    canonical: languageUrls.olderParents["zh-Hans"],
    htmlLang: "zh-Hans",
    alternates: languageUrls.olderParents,
    linkedFrom: "zh/guides/index.html",
    mustContain: "带父母来中国，不要只按城市数量排路线",
  },
  {
    route: "ko/guides/china-itinerary-with-older-parents/",
    canonical: languageUrls.olderParents.ko,
    htmlLang: "ko",
    alternates: languageUrls.olderParents,
    linkedFrom: "ko/guides/index.html",
    mustContain:
      "부모님과 중국을 여행한다면 도시 수보다 체력을 기준으로 일정을 짜세요",
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

async function assertCrawlableInternalLink(check) {
  const targetHref = `href="${routePathFromCanonical(check.canonical)}"`;
  const sourcePath = path.join(outputRoot, check.linkedFrom);
  const sourcePage = await readFile(sourcePath, "utf8");

  if (sourcePage.includes(targetHref)) return;

  const isGuideHub = /^(?:zh\/|ko\/)?guides\/index\.html$/.test(
    check.linkedFrom,
  );
  if (!isGuideHub) {
    assertIncludes(sourcePage, targetHref, `${check.route} internal link`);
    return;
  }

  const paginationPaths = [
    ...sourcePage.matchAll(
      /href="(\/(?:zh\/|ko\/)?guides\/page\/\d+\/)"/g,
    ),
  ].map((match) => match[1]);

  for (const paginationPath of new Set(paginationPaths)) {
    const paginationPage = await readFile(
      path.join(outputRoot, paginationPath, "index.html"),
      "utf8",
    );
    if (paginationPage.includes(targetHref)) return;
  }

  throw new Error(
    `${check.route} internal link: not found on ${check.linkedFrom} or any pagination page linked from it`,
  );
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

  await assertCrawlableInternalLink(check);

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
