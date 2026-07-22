import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

import { getHomegroundCopy } from "../../lib/homegroundI18n.ts";
import {
  getHomepagePlanningDeskCopy,
  homepagePlanningIntentIds,
  isHomepagePlanningIntentId,
} from "../../lib/homepagePlanningDesk.ts";
import {
  getRouteServiceInterest,
  routeServiceIds,
  routeServiceQueryKey,
} from "../../lib/routeServiceInterest.ts";

const repositoryRoot = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, repositoryRoot), "utf8");
}

async function resolveRelativeImport(from, specifier) {
  const base = new URL(specifier, from);
  const candidates = specifier.match(/\.[a-z]+$/iu)
    ? [base]
    : [
        base,
        new URL(`${base.href}.ts`),
        new URL(`${base.href}.tsx`),
        new URL(`${base.href}.css`),
        new URL(`${base.href}/index.ts`),
        new URL(`${base.href}/index.tsx`),
      ];

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next supported local module suffix.
    }
  }

  return null;
}

async function dependencyGraph(entryPath) {
  const queue = [new URL(entryPath, repositoryRoot)];
  const modules = new Map();

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || modules.has(current.href)) continue;

    const contents = await readFile(current, "utf8");
    modules.set(current.href, contents);

    const imports = contents.matchAll(
      /(?:from\s+|import\s*)["'](\.{1,2}\/[^"']+)["']/gu,
    );
    for (const match of imports) {
      const resolved = await resolveRelativeImport(current, match[1]);
      if (resolved && !modules.has(resolved.href)) queue.push(resolved);
    }
  }

  return modules;
}

function combinedSource(modules, extensionPattern = /./u) {
  return [...modules]
    .filter(([url]) => extensionPattern.test(new URL(url).pathname))
    .map(([, contents]) => contents)
    .join("\n");
}

test("the homepage starts with no intent and only allow-listed paid queries may preselect", async () => {
  const [home, planningModel, planningDesk, modules] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("lib/homepagePlanningDesk.ts"),
    source("components/HomepagePlanningDesk.tsx"),
    dependencyGraph("components/HomegroundHomePage.tsx"),
  ]);
  const surface = `${home}\n${planningModel}\n${planningDesk}\n${combinedSource(
    modules,
    /\.(?:ts|tsx)$/u,
  )}`;
  assert.deepEqual(homepagePlanningIntentIds, [
    "itinerary-review",
    "route-build",
    "full-trip-support",
    "explore",
  ]);
  for (const id of homepagePlanningIntentIds) {
    assert.equal(isHomepagePlanningIntentId(id), true);
  }
  assert.equal(isHomepagePlanningIntentId(null), false);
  assert.equal(isHomepagePlanningIntentId("unknown"), false);
  assert.match(planningModel, /type HomepagePlanningIntentId/u);
  assert.match(planningModel, /Record<RouteServiceId, PaidBriefReadyCopy>/u);
  assert.match(
    surface,
    /useState<[^>\n]*Intent[^>\n]*>\(\s*null\s*\)/u,
    "the no-query homepage must not silently choose a free or paid path",
  );
  assert.doesNotMatch(
    surface,
    /useState<[^>\n]*Intent[^>\n]*>\(\s*["'](?:explore|itinerary-review|route-build|full-trip-support)["']\s*\)/u,
  );

  assert.equal(routeServiceQueryKey, "service");
  assert.deepEqual(routeServiceIds, [
    "itinerary-review",
    "route-build",
    "full-trip-support",
  ]);
  for (const id of routeServiceIds) {
    assert.equal(getRouteServiceInterest(id)?.id, id);
  }
  assert.equal(getRouteServiceInterest("explore"), null);
  assert.equal(getRouteServiceInterest("unknown"), null);
  assert.equal(getRouteServiceInterest("<script>"), null);

  assert.match(
    home,
    /searchParams\.get\(\s*routeServiceQueryKey\s*\)/u,
  );
  assert.match(home, /getRouteServiceInterest\([^,\n]+,\s*locale\)/u);
  assert.match(home, /planningIntent=\{[^}]+\}/u);
  assert.match(home, /onPlanningIntentChange=\{[^}]+\}/u);
  assert.match(
    home,
    /["']explore["'][\s\S]{0,600}searchParams\.delete\(\s*routeServiceQueryKey\s*\)/u,
  );
  assert.match(
    home,
    /searchParams\.set\(\s*routeServiceQueryKey\s*,\s*(?:intent|nextIntent)\s*\)/u,
  );
  assert.match(home, /window\.history\.replaceState/u);
  assert.match(
    planningDesk,
    /value:\s*HomepagePlanningIntentId\s*\|\s*null/u,
  );
  assert.match(
    planningDesk,
    /onContinue:\s*\(intent:\s*HomepagePlanningIntentId\)\s*=>\s*void/u,
  );
  assert.doesNotMatch(surface, /service=explore/u);
});

test("English, Chinese and Korean all expose the same four planning choices and honest boundary", async () => {
  const localizedCopySource = await source("lib/homepagePlanningDesk.ts");
  const locales = [
    {
      locale: "en",
      patterns: [
        /Tell us where your China trip stands\./u,
        /What do you have so far\?/u,
        /I already have a usable day-by-day route\./u,
        /I have dates and priorities, but no usable route\./u,
        /I want help with the full trip/u,
        /I(?:'|’|\\u2019)m still exploring\./u,
        /Review My Route/u,
        /Build My Route/u,
        /Full Trip Planning & Ground Support/u,
        /free route timing check/iu,
        /No payment or file upload happens here\./u,
      ],
    },
    {
      locale: "zh",
      patterns: [
        /先告诉我们，你的中国旅行准备到哪一步了。/u,
        /你现在已经准备到哪一步？/u,
        /我已经有一份可用的逐日路线。/u,
        /我有日期和重点，但还没有可用路线。/u,
        /我希望有人协助整趟旅行/u,
        /我还在找方向。/u,
        /审核我的路线/u,
        /为我规划路线/u,
        /全程规划与落地支持/u,
        /免费初步路线检查/u,
        /这里也不会付款或上传文件/u,
      ],
    },
    {
      locale: "ko",
      patterns: [
        /중국 여행 준비, 어디까지 하셨나요\?/u,
        /지금 어느 단계인가요\?/u,
        /이미 일자별 일정이 있어요\./u,
        /날짜와 우선순위는 정했지만/u,
        /일부 예약 준비나 현지 조율까지/u,
        /아직 아이디어를 정리하는 단계예요\./u,
        /내 일정 검토/u,
        /내 동선 설계/u,
        /전체 여행 설계 및 현지 지원/u,
        /무료 초기 동선 점검/u,
        /결제나 파일 업로드가 진행되지 않습니다/u,
      ],
    },
  ];

  for (const { locale, patterns } of locales) {
    const localizedCopy = JSON.stringify({
      home: getHomegroundCopy(locale),
      planningDesk: getHomepagePlanningDeskCopy(locale),
    });
    for (const pattern of patterns) {
      assert.match(
        localizedCopy,
        pattern,
        `${locale} homepage copy is missing ${pattern}`,
      );
    }
    assert.match(localizedCopy, /US\$69/u);
    assert.match(localizedCopy, /US\$129/u);
  }
  assert.match(
    localizedCopySource,
    /Record<\s*HomegroundLocale,[\s\S]{0,200}HomepagePlanningDeskCopy/u,
  );
});

test("paid briefs end at a human handoff while explore alone renders the free result", async () => {
  const [
    home,
    finder,
    plannerHandoff,
    planningCopy,
    handoffCopy,
    modules,
  ] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/RouteFinder.tsx"),
    source("components/PlannerHandoff.tsx"),
    source("lib/homepagePlanningDesk.ts"),
    source("lib/homegroundI18n.ts"),
    dependencyGraph("components/HomegroundHomePage.tsx"),
  ]);
  const surface = combinedSource(modules, /\.(?:ts|tsx)$/u);
  const completionStart = finder.indexOf("const showResult");
  const completionEnd = finder.indexOf("const handleBack", completionStart);
  const completion = finder.slice(completionStart, completionEnd);

  assert.ok(completionStart >= 0 && completionEnd > completionStart);
  assert.match(finder, /planningIntent\??:\s*HomepagePlanningIntent(?:Id)?/u);
  assert.match(
    finder,
    /onPlanningIntentChange\??:\s*\(intent:\s*HomepagePlanningIntent(?:Id)?\)\s*=>\s*void/u,
  );
  assert.match(surface, /paid-brief-ready/u);
  assert.match(
    finder,
    /const paidBriefCopy\s*=\s*serviceInterest\s*\?[\s\S]{0,200}planningCopy\.paidBriefs\[serviceInterest\.id\][\s\S]{0,100}:\s*null/u,
  );
  assert.match(
    finder,
    /paidBriefCopy\s*\?\s*["']paid-brief-ready["']\s*:\s*["']free-route-check["']/u,
  );
  const paidBranchIndex = finder.indexOf("{paidBriefCopy ? (");
  const paidScopeIndex = finder.indexOf(
    "paidBriefCopy.scopeLabel",
    paidBranchIndex,
  );
  const freeTimingIndex = finder.indexOf(
    "copy.result.timingTitle",
    paidBranchIndex,
  );
  assert.ok(paidBranchIndex >= 0, "expected a guarded paid brief branch");
  assert.ok(
    paidScopeIndex > paidBranchIndex,
    "the paid branch should present the requested human-service scope",
  );
  assert.ok(
    freeTimingIndex > paidScopeIndex,
    "the free timing result must be the alternative to the paid brief",
  );
  assert.equal(home.match(/<RouteFinder\b/gu)?.length, 1);
  assert.equal(finder.match(/<form\b/gu)?.length, 1);
  assert.match(
    home,
    /planningIntent\s*===\s*["']explore["'][\s\S]{0,1500}<HomepagePlanningUpgrade\b/u,
  );
  assert.match(
    home,
    /activeRouteServiceInterest[\s\S]{0,1500}<PlannerHandoff\b/u,
  );
  assert.match(plannerHandoff, /getHomepagePlanningDeskCopy\(locale\)/u);
  assert.match(
    plannerHandoff,
    /planning(?:Desk)?Copy\.paidBriefs\[serviceInterest\.id\]/u,
  );
  assert.match(
    plannerHandoff,
    /paidBriefCopy\?\.successTitle\s*\?\?\s*copy\.handoff\.successTitle/u,
  );
  assert.match(
    plannerHandoff,
    /paidBriefCopy\?\.successBody\s*\?\?\s*copy\.handoff\.successBody/u,
  );
  assert.match(
    plannerHandoff,
    /paidBriefCopy\?\.submitLabel\s*\?\?\s*copy\.handoff\.submit/u,
  );
  const serviceResetStart = plannerHandoff.indexOf(
    "const nextServiceId = serviceInterest?.id ?? null",
  );
  const serviceResetEnd = plannerHandoff.indexOf(
    "}, [serviceContextRevision, serviceInterest?.id]);",
    serviceResetStart,
  );
  const serviceReset = plannerHandoff.slice(
    serviceResetStart,
    serviceResetEnd,
  );
  assert.ok(serviceResetStart >= 0 && serviceResetEnd > serviceResetStart);
  assert.match(serviceReset, /setTripContext\(["']{2}\)/u);
  assert.doesNotMatch(
    serviceReset,
    /set(?:Email|Phone|DepartureCountry|RoughBudgetPerPerson)\(/u,
    "changing service should clear only service-specific context",
  );
  assert.match(
    plannerHandoff,
    /configurationReady\s*&&\s*whatsappIntakeEnabled\s*&&\s*!serviceInterest/u,
    "paid requests should leave a working email for the payment follow-up",
  );

  const allLocalizedCopy = `${planningCopy}\n${handoffCopy}`;
  const postSubmitCopy = [
    {
      locale: "en",
      patterns: [
        /No payment has been taken\./u,
        /confirmed scope/u,
        /delivery tim(?:e|ing)/u,
        /payment instructions/u,
        /email/iu,
      ],
    },
    {
      locale: "zh",
      patterns: [
        /(?:尚未|没有|不会)收取(?:任何)?(?:付款|款项)|未付款/u,
        /确认.*范围/u,
        /交付时间/u,
        /付款/u,
        /邮件|电子邮件/u,
      ],
    },
    {
      locale: "ko",
      patterns: [
        /결제(?:된 금액은 없습니다|(?:는|가).*?(?:진행|청구|완료)되지)/u,
        /범위/u,
        /(?:납품|완료).*?(?:일정|예정일)/u,
        /결제/u,
        /이메일/u,
      ],
    },
  ];

  for (const { locale, patterns } of postSubmitCopy) {
    const localizedCopy = JSON.stringify(
      getHomepagePlanningDeskCopy(locale),
    );
    for (const pattern of patterns) {
      assert.match(
        `${localizedCopy}\n${allLocalizedCopy}`,
        pattern,
        `${locale} paid-request follow-up is missing ${pattern}`,
      );
    }
  }
});

test("the homepage request flow does not collect files or take payment", async () => {
  const [modules, packageJson] = await Promise.all([
    dependencyGraph("components/HomegroundHomePage.tsx"),
    source("package.json"),
  ]);
  const surface = combinedSource(modules, /\.(?:ts|tsx)$/u);

  assert.doesNotMatch(surface, /type=["']file["']/iu);
  assert.doesNotMatch(
    surface,
    />\s*(?:Buy now|Book now|Checkout|Add to cart|Pay now)\s*</iu,
  );
  assert.doesNotMatch(
    surface,
    /(?:href|action)=["'][^"']*(?:checkout|payment|cart)[^"']*["']/iu,
  );
  assert.doesNotMatch(
    packageJson,
    /"(?:@stripe\/[^"\s]+|stripe|@paypal\/[^"\s]+|paypal)"\s*:/iu,
  );
  assert.match(surface, /type=["']email["']/u);
  assert.match(surface, /autoComplete=["']email["']/u);
});

test("intent selection is a keyboard-operable labelled choice with announced state changes", async () => {
  const [planningDesk, finder, modules] = await Promise.all([
    source("components/HomepagePlanningDesk.tsx"),
    source("components/RouteFinder.tsx"),
    dependencyGraph("components/HomegroundHomePage.tsx"),
  ]);
  const selector = `${planningDesk}\n${finder}`;
  const allComponents = combinedSource(modules, /\.(?:ts|tsx)$/u);
  const allStyles = combinedSource(modules, /\.css$/u);

  assert.ok(selector.length > 0, "expected a dedicated intent selector surface");
  assert.match(selector, /<fieldset/u);
  assert.match(selector, /<legend/u);
  assert.match(
    selector,
    /type=["']radio["']|<button[\s\S]{0,300}aria-pressed=/u,
  );
  assert.match(selector, /aria-live=["']polite["']/u);
  assert.match(selector, /(?:copy|planningCopy)\.selectedAnnouncement/u);
  assert.match(selector, /tabIndex=\{-1\}/u);
  assert.match(selector, /\.focus\(\{\s*preventScroll:\s*true\s*\}\)/u);
  assert.match(
    planningDesk,
    /<button[\s\S]{0,180}type=["']button["'][\s\S]{0,180}onClick=\{onChange\}[\s\S]{0,200}<\/button>/iu,
    "changing the selected path must use a real button",
  );
  assert.doesNotMatch(allComponents, /tabIndex=\{?[1-9][0-9]*\}?/u);
  assert.match(allStyles, /:focus-visible/u);
});

test("the planning desk has 320px reflow and minimum touch-target safeguards", async () => {
  const modules = await dependencyGraph("components/HomepagePlanningDesk.tsx");
  const styles = combinedSource(modules, /\.css$/u);
  const components = combinedSource(modules, /\.tsx$/u);

  assert.match(
    styles,
    /@media\s*\(max-width:\s*(?:3[2-9][0-9]|4[0-8][0-9])px\)/u,
    "a narrow-screen rule should cover a 320px viewport",
  );
  assert.match(styles, /grid-template-columns:\s*(?:minmax\(0,\s*)?1fr\)?/u);
  assert.match(styles, /min-width:\s*0/u);
  assert.match(styles, /overflow-wrap:\s*(?:anywhere|break-word)/u);
  assert.match(styles, /min-height:\s*(?:44px|2\.75rem)/u);
  assert.match(
    styles,
    /\.intentOption\s*\{[\s\S]{0,700}min-inline-size:\s*0/u,
  );
  assert.match(
    styles,
    /@media\s*\(max-width:\s*820px\)\s*\{[\s\S]{0,300}\.intentPaidGrid,[\s\S]{0,250}grid-template-columns:\s*minmax\(0,\s*1fr\)/u,
  );
  assert.match(
    styles,
    /\.intentSecondaryButton,[\s\S]{0,200}\.planningUpgradeOptions button\s*\{[\s\S]{0,350}min-block-size:\s*2\.75rem/u,
  );
  assert.match(
    styles,
    /\.intentSummary,[\s\S]{0,100}\.intentScope\s*\{[\s\S]{0,100}overflow-wrap:\s*anywhere/u,
  );
  assert.doesNotMatch(
    components,
    /style=\{\{[^}]*\b(?:minWidth|width):\s*["']?[3-9][0-9]{2}px/iu,
  );
});

test("one selected service stays authoritative across planner history and clean URLs", async () => {
  const home = await source("components/HomegroundHomePage.tsx");

  assert.match(home, /isCurrentPlannerFlow[\s\S]{0,900}planningIntentRef\.current/u);
  assert.match(
    home,
    /url\.searchParams\.set\([\s\S]{0,160}planningIntentRef\.current/u,
    "older question history entries must be canonicalized to the selected service",
  );
  assert.match(home, /nextIntent === ["']explore["'][\s\S]{0,220}sessionStorage\.setItem/u);
  assert.match(home, /else \{[\s\S]{0,120}sessionStorage\.removeItem\(planningIntentStorageKey\)/u);
  assert.match(home, /url\.searchParams\.has\(["']planner["']\)[\s\S]{0,80}storedIntent === ["']explore["']/u);
});

test("paid contact drafts survive the free branch while service-only notes remain scoped", async () => {
  const [home, handoff] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/PlannerHandoff.tsx"),
  ]);

  assert.match(home, /retainedRouteServiceInterest/u);
  assert.match(home, /<div hidden=\{!activeRouteServiceInterest\}>[\s\S]{0,500}<PlannerHandoff/u);
  assert.match(home, /serviceContextRevision/u);
  assert.match(handoff, /previousServiceContextRevisionRef/u);
  assert.match(handoff, /routeNeedsScopeConfirmation/u);
  assert.match(handoff, /outsideStandardScope\.note/u);
});

test("standard scope, payment boundary and out-of-scope pricing remain explicit", async () => {
  const [desk, finder, copy, home] = await Promise.all([
    source("components/HomepagePlanningDesk.tsx"),
    source("components/RouteFinder.tsx"),
    source("lib/homepagePlanningDesk.ts"),
    source("components/HomegroundHomePage.tsx"),
  ]);

  assert.match(desk, /compact \? styles\.intentScopeCompact/u);
  assert.match(desk, /selectedIntentBoundary/u);
  assert.match(copy, /routeNeedsScopeConfirmation/u);
  assert.match(finder, /data-standard-scope-status/u);
  assert.match(finder, /outsideStandardScope\.scopeLabel/u);
  assert.match(home, /freeResultLabel/u);
  assert.match(home, /freeResultTitle/u);
});
