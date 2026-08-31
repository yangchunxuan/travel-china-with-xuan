import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const repositoryRoot = new URL("../../", import.meta.url);
const source = (path) => readFile(new URL(path, repositoryRoot), "utf8");

test("compact desktop header preserves the reviewed navigation CSS contract", async () => {
  const [header, styles, guides] = await Promise.all([
    source("components/HomegroundHeader.tsx"),
    source("components/HomegroundHeader.module.css"),
    source("components/GuidesHubPage.tsx"),
  ]);

  assert.match(
    styles,
    /@media \(min-width: 1180px\) and \(max-width: 1359\.98px\)[\s\S]*?\.desktopUtilityLink \{\s*display: none;/,
  );
  assert.match(
    styles,
    /@media \(min-width: 1180px\) and \(max-width: 1359\.98px\)[\s\S]*?\.desktopNav a \{[\s\S]*?padding-inline: 0\.58rem;/,
  );
  assert.equal(
    (header.match(/state\.exact \? "page" : state\.active \? "location"/g) ?? [])
      .length,
    2,
  );
  assert.match(header, /navigationIsExact\?: boolean/);
  assert.match(header, /pageContext === "guides" && navigationIsExact/);
  assert.match(guides, /navigationIsExact=\{page === 1\}/);
});

test("mobile navigation button guarantees Enter and Space activation", async () => {
  const header = await source("components/HomegroundHeader.tsx");

  assert.match(header, /aria-expanded=\{open\}/);
  assert.match(header, /event\.key !== "Enter" && event\.key !== " "/);
  assert.match(header, /event\.preventDefault\(\);\s*setOpen\(\(current\) => !current\);/);
});

test("section hubs use local breadcrumbs and traveler questions instead of build language", async () => {
  const [hub, i18n] = await Promise.all([
    source("components/SearchPlatformHubPage.tsx"),
    source("lib/searchPlatformI18n.ts"),
  ]);

  assert.match(hub, /aria-label=\{copy\.breadcrumbLabel\}/);
  assert.doesNotMatch(hub, /aria-label=\{home\.navigation\.primaryLabel\}/);
  assert.match(hub, /copy\.questionGroupsTitle/);
  assert.match(hub, /copy\.questionGroupsIntroduction/);
  assert.doesNotMatch(
    hub,
    /platformMapIntro[\s\S]{0,180}sectionCopy\.eyebrow/,
  );
  assert.doesNotMatch(
    i18n,
    /This section will connect|New pages will join|The structure is ready|本栏目将连接|后续页面会进入|结构已经建好|이 섹션이 연결할 내용|앞으로의 페이지도|구조는 준비/,
  );
  assert.equal((i18n.match(/breadcrumbLabel:/g) ?? []).length, 4);
  assert.equal((i18n.match(/questionGroupsTitle:/g) ?? []).length, 4);
  assert.equal((i18n.match(/scopeTitle:/g) ?? []).length, 28);
});

test("Studio metadata leads with planning and Korean article parents match the main navigation", async () => {
  const [studio, navigation, ...breadcrumbSources] = await Promise.all([
    source("lib/homegroundStudioI18n.ts"),
    source("lib/homegroundNavigationModel.ts"),
    source("components/ChinaItineraryWithOlderParentsPage.tsx"),
    source("components/ChinaItineraryTooRushedPage.tsx"),
    source("components/NightShowGuidePage.tsx"),
    source("components/TenDayChinaRouteGuidePage.tsx"),
    source("components/SingaporeChinaVisaPage.tsx"),
    source("components/TransitRouteCheckPage.tsx"),
    source("components/TransportGuidePage.tsx"),
    source("components/TantanZhangjiajieStoryPage.tsx"),
    source("components/UsChinaVisaPage.tsx"),
    source("components/ZhangjiajieOlderTravellersPage.tsx"),
    source("components/ZhangjiajieGuidePage.tsx"),
    source("components/content/EditorialGuidePage.tsx"),
    source("lib/tourGuideDecisionI18n.ts"),
    source("lib/zhangjiajieFromMalaysiaGuideCopy.ko.ts"),
    source("lib/chinaTripCostI18n.ts"),
    source("lib/chinaHotelValueI18n.ts"),
    source("lib/chinaItineraryWithOlderParentsI18n.ts"),
  ]);

  assert.match(studio, /title: "How Homeground Plans China Trips"/);
  assert.match(studio, /title: "Homeground 如何规划中国旅行"/);
  assert.match(studio, /title: "Homeground의 중국 여행 설계 방식"/);
  assert.match(navigation, /label: "실용 가이드"/);

  for (const copy of breadcrumbSources) {
    assert.doesNotMatch(
      copy,
      /(?:ko|guides|breadcrumbGuides): "여행 가이드"/,
    );
  }
});
