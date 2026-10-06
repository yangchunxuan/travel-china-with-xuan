import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("About Us opens /company/ and lists the team, licences and (Chinese only) careers", async () => {
  const [model, header, menu] = await Promise.all([
    source("lib/homegroundNavigationModel.ts"),
    source("components/HomegroundHeader.tsx"),
    source("components/HeaderNavMenu.tsx"),
  ]);
  assert.match(model, /homegroundAboutNavigationIds = \[\s*"company",\s*"planning",\s*"credentials",\s*"careers",\s*\]/);
  // The item keeps the id "studio"; its own link is now /company/.
  assert.match(model, /studio: \{\s*label: "About Us",[\s\S]{0,120}pathSegment: "company\/"/);
  assert.match(model, /studio: \{\s*label: "关于我们",[\s\S]{0,120}pathSegment: "company\/"/);
  // Careers is a row only where it is published.
  assert.equal(model.match(/pathSegment: "careers\/"/g)?.length, 1);
  assert.match(model, /careers: \{\s*label: "加入我们"/);
  assert.match(header, /const aboutIsCurrent =\s*planningIsCurrent \|\| pageContext === "company" \|\| pageContext === "careers";/);
  assert.match(header, /case "studio":\s*return \{ active: aboutIsCurrent, exact: aboutIsExact \};/);
  assert.match(menu, /company: Flag,\s*planning: Users,\s*credentials: BadgeCheck,\s*careers: Briefcase,/);
});

test("the draft company and careers pages stay out of search until approved", async () => {
  const routes = await Promise.all([
    source("app/(default)/company/page.tsx"),
    source("app/(localized)/[locale]/company/page.tsx"),
    source("app/(localized)/[locale]/careers/page.tsx"),
  ]);
  for (const route of routes) {
    assert.match(route, /robots: \{ index: false, follow: true \}/);
  }
  const sitemap = await source("app/sitemap.ts");
  assert.doesNotMatch(sitemap, /company\/|careers\//);
});

test("careers is Chinese only and applications go through WeChat", async () => {
  const [route, copy, page] = await Promise.all([
    source("app/(localized)/[locale]/careers/page.tsx"),
    source("lib/homegroundCareersCopy.ts"),
    source("components/HomegroundCareersPage.tsx"),
  ]);
  assert.match(route, /generateStaticParams\(\) \{\s*return \[\{ locale: "zh" \}\];/);
  assert.match(route, /if \(locale !== "zh"\) notFound\(\);/);
  assert.match(copy, /wechatId: "homeground101"/);
  assert.doesNotMatch(copy, /mailto:|tel:/);
  assert.match(page, /"@type": "JobPosting"/);
  // The owner removed every part-time / pay-per-group line (2026-10-05).
  assert.doesNotMatch(copy, /兼职|按团结算|按单结算|workModes/);
  assert.doesNotMatch(page, /workModes|PART_TIME|CONTRACTOR/);
});

test("the company page states only registered facts and keeps photos uncropped", async () => {
  const [copy, page] = await Promise.all([
    source("lib/homegroundCompanyI18n.ts"),
    source("components/HomegroundCompanyPage.tsx"),
  ]);
  // In travel since 2003; the licensed Beijing agency itself dates from 2025.
  assert.match(copy, /HOMEGROUND_IN_TRAVEL_SINCE = 2003;/);
  assert.match(copy, /title: "按你的方式游中国，难的部分交给我们。"/);
  assert.match(copy, /title: "有朋自远方来。"/);
  // Standalone itinerary services have ended, so the help tiers are the services still sold.
  assert.doesNotMatch(page, /china-itinerary-review/);
  assert.match(page, /services\/china-attraction-reservations\/[\s\S]*services\/private-english-speaking-guides\/[\s\S]*services\/full-trip-support\//);
  assert.match(page, /legalName: homegroundBusiness\.registeredName/);
  assert.match(page, /height=\{city\.imageHeight\}[\s\S]{0,120}width=\{city\.imageWidth\}/);
});
