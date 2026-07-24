import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

import { getHomegroundCopy } from "../../lib/homegroundI18n.ts";
import {
  getHomepagePlanningDeskCopy,
  homepagePlanningIntentIds,
  homepageStarterIntentIds,
  isHomepagePlanningIntentId,
  isHomepageStarterIntentId,
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
    "conversation",
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
  assert.deepEqual(homepageStarterIntentIds, [
    "arrange-trip",
    "self-book-route",
    "existing-route",
    "unsure",
    "open-text",
  ]);
  for (const id of homepageStarterIntentIds) {
    assert.equal(isHomepageStarterIntentId(id), true);
  }
  assert.equal(isHomepageStarterIntentId("unknown"), false);
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
  assert.equal(getRouteServiceInterest("conversation"), null);
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
    /const nextService = getRouteServiceInterest\(nextIntent, locale\)[\s\S]{0,300}else \{[\s\S]{0,100}searchParams\.delete\(\s*routeServiceQueryKey\s*\)/u,
  );
  assert.match(
    home,
    /searchParams\.set\(\s*routeServiceQueryKey\s*,\s*nextService\.id\s*\)/u,
  );
  assert.match(home, /window\.history\.replaceState/u);
  assert.match(
    planningDesk,
    /value:\s*HomepagePlanningIntentId\s*\|\s*null/u,
  );
  assert.match(
    planningDesk,
    /onContinue:\s*\([\s\S]{0,160}intent:\s*HomepagePlanningIntentId,[\s\S]{0,120}starterIntent\?:\s*HomepageStarterIntentId,[\s\S]{0,80}\)\s*=>\s*void/u,
  );
  assert.doesNotMatch(surface, /service=explore/u);
  assert.doesNotMatch(surface, /service=conversation/u);
});

test("English, Chinese and Korean expose the same neutral conversation, paid shortcuts and honest free boundary", async () => {
  const localizedCopySource = await source("lib/homepagePlanningDesk.ts");
  const locales = [
    {
      locale: "en",
      patterns: [
        /Tell us the China trip you want/u,
        /What would you like help with\?/u,
        /Plan and help arrange the trip/u,
        /Build a route I’ll book myself/u,
        /Review a route I already have/u,
        /I’m not sure yet/u,
        /Already know what you need\?/u,
        /Review My Route/u,
        /Build My Route/u,
        /Full Trip Planning & Ground Support/u,
        /Free to enquire/u,
        /No payment is taken here/u,
      ],
    },
    {
      locale: "zh",
      patterns: [
        /先说说你想要怎样的中国旅行/u,
        /你希望 Homeground 帮你处理什么？/u,
        /帮我规划并协调整趟旅行/u,
        /为我搭建路线，预订由我自己完成/u,
        /审核我已经准备好的路线/u,
        /我还不确定/u,
        /已经知道自己需要什么？/u,
        /审核我的路线/u,
        /为我规划路线/u,
        /全程规划与落地支持/u,
        /提交需求免费/u,
        /本页不会收款/u,
      ],
    },
    {
      locale: "ko",
      patterns: [
        /원하는 중국 여행을 들려주세요/u,
        /Homeground가 어떤 부분을 도와드리면 좋을까요\?/u,
        /여행 전체 설계와 일부 예약·현지 조율이 필요해요/u,
        /예약은 직접 하고, 여행 동선만 설계받고 싶어요/u,
        /이미 준비한 일정을 검토받고 싶어요/u,
        /아직 잘 모르겠어요/u,
        /필요한 서비스를 이미 알고 있나요\?/u,
        /내 일정 검토/u,
        /내 동선 설계/u,
        /전체 여행 설계 및 현지 지원/u,
        /문의 제출 무료/u,
        /이 페이지에서는 결제가 진행되지 않습니다/u,
      ],
    },
  ];

  for (const { locale, patterns } of locales) {
    const planningDeskCopy = getHomepagePlanningDeskCopy(locale);
    const localizedCopy = JSON.stringify({
      home: getHomegroundCopy(locale),
      planningDesk: planningDeskCopy,
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
    assert.equal(planningDeskCopy.starterPrompts.length, 4);
    assert.ok(
      planningDeskCopy.starterPrompts.every(
        (prompt) => prompt.planningIntent === "conversation",
      ),
      `${locale} starter prompts must stay neutral until a planner reviews the brief`,
    );
    assert.ok(
      planningDeskCopy.noteLabel.length > 0 &&
        planningDeskCopy.noteHint.length > 0 &&
        planningDeskCopy.openStarterLabel.length > 0,
      `${locale} must offer the optional own-words note as a second start lane`,
    );
    assert.equal(
      planningDeskCopy.bookingResponsibility.options.length,
      4,
      `${locale} must ask who handles bookings with four stable answers`,
    );
    assert.deepEqual(
      planningDeskCopy.bookingResponsibility.options.map(
        (option) => option.id,
      ),
      ["traveller", "homeground-selected", "homeground-most", "unsure"],
    );
    assert.ok(
      planningDeskCopy.bookingResponsibility.error.length > 0 &&
        planningDeskCopy.bookingResponsibility.fixedScopeHint.length > 0,
      `${locale} booking-responsibility validation and scope hint must exist`,
    );
    assert.ok(
      planningDeskCopy.freeUpgrade.conversationLabel.length > 0,
      `${locale} free result must offer a planner conversation entry`,
    );
    assert.equal(
      planningDeskCopy.questionContexts["full-trip-support"].introBody,
      undefined,
      `${locale} must not restore the removed full-trip intro paragraph`,
    );
  }
  assert.match(
    localizedCopySource,
    /Record<\s*HomegroundLocale,[\s\S]{0,200}HomepagePlanningDeskCopy/u,
  );
});

test("the first planning view keeps a neutral starter and compact paid shortcuts", async () => {
  const [home, planningDesk, styles] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomepagePlanningDesk.tsx"),
    source("components/HomegroundHomePage.module.css"),
  ]);

  assert.doesNotMatch(home, /beijing-hero/u);
  assert.doesNotMatch(home, /heroPicture|photoCaption/u);
  assert.match(home, /className=\{styles\.heroFacts\}/u);
  assert.match(planningDesk, /copy\.starterPrompts\.map/u);
  assert.match(
    planningDesk,
    /copy\.options\.filter\([\s\S]{0,100}option\.kind === ["']paid["']/u,
  );
  assert.match(planningDesk, /className=\{styles\.intentServiceShortcut\}/u);
  assert.doesNotMatch(planningDesk, /className=\{styles\.intentFreeTool\}/u);
  assert.match(
    planningDesk,
    /onContinue\(selectedPrompt\.planningIntent, selectedPrompt\.id\)/u,
  );
  assert.match(
    styles,
    /\.intentStarterGrid\s*\{[\s\S]{0,180}grid-template-columns:\s*repeat\(2,/u,
  );
});

test("the planning-desk motion stays purposeful, responsive and reduced-motion safe", async () => {
  const [home, planningDesk, finder, styles, finderStyles] =
    await Promise.all([
      source("components/HomegroundHomePage.tsx"),
      source("components/HomepagePlanningDesk.tsx"),
      source("components/RouteFinder.tsx"),
      source("components/HomegroundHomePage.module.css"),
      source("components/RouteFinder.module.css"),
    ]);

  assert.doesNotMatch(
    `${home}\n${styles}`,
    /heroRouteMotif|heroRouteGhost|heroRouteInk|heroRouteStops/u,
    "the rejected decorative route line must not return",
  );
  assert.match(planningDesk, /data-has-selection=\{draft \? "true" : undefined\}/u);
  assert.match(finder, /data-planning-view=/u);
  assert.match(finder, /currentQuestionHelp\s*&&/u);
  assert.equal(
    finder.match(/aria-describedby=\{questionDescribedBy\}/gu)?.length,
    4,
  );
  assert.match(styles, /@media \(prefers-reduced-motion: no-preference\)/u);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/u);
  const reducedMotionBlock = styles.slice(
    styles.indexOf("@media (prefers-reduced-motion: reduce)"),
    styles.indexOf("@media (prefers-reduced-motion: no-preference)"),
  );
  assert.match(reducedMotionBlock, /animation:\s*none/u);
  assert.match(styles, /@media \(hover: hover\) and \(pointer: fine\)/u);
  assert.match(styles, /animation:\s*brandMarkIn\b/u);
  assert.match(styles, /animation:\s*brandDoorIn\b/u);
  assert.match(styles, /animation:\s*brandTextIn\b/u);
  assert.match(styles, /\.brand:hover\s+\.brandMark/u);
  assert.match(styles, /\.brand:focus-visible\s+\.brandMark/u);
  assert.match(reducedMotionBlock, /\.brandMark/u);
  const brandMotion = styles.slice(
    styles.indexOf(".brandMark {", styles.indexOf("prefers-reduced-motion: no-preference")),
    styles.indexOf(".hero:not(.heroResult)", styles.indexOf("prefers-reduced-motion: no-preference")),
  );
  assert.doesNotMatch(
    brandMotion,
    /\binfinite\b/u,
    "the logo signature must settle instead of looping",
  );
  assert.match(finderStyles, /planningViewIn/u);
  assert.match(finderStyles, /@media \(prefers-reduced-motion: reduce\)/u);
});

test("conversation and paid briefs end at a human handoff while explore alone renders the free result", async () => {
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
    /onPlanningIntentChange\??:\s*\([\s\S]{0,180}intent:\s*HomepagePlanningIntent(?:Id)?[\s\S]{0,180}starterIntent\?:\s*HomepageStarterIntentId/u,
  );
  assert.match(surface, /human-brief-ready/u);
  assert.match(
    finder,
    /const briefCopy\s*=\s*planningIntent === ["']conversation["'][\s\S]{0,120}planningCopy\.conversationBrief[\s\S]{0,180}planningCopy\.paidBriefs\[serviceInterest\.id\][\s\S]{0,80}:\s*null/u,
  );
  assert.match(
    finder,
    /briefCopy\s*\?\s*["']human-brief-ready["']\s*:\s*["']free-route-check["']/u,
  );
  const humanBriefBranchIndex = finder.indexOf("{briefCopy ? (");
  const humanBriefScopeIndex = finder.indexOf(
    "briefCopy.scopeLabel",
    humanBriefBranchIndex,
  );
  const freeTimingIndex = finder.indexOf(
    "copy.result.timingTitle",
    humanBriefBranchIndex,
  );
  assert.ok(
    humanBriefBranchIndex >= 0,
    "expected a guarded human brief branch",
  );
  assert.ok(
    humanBriefScopeIndex > humanBriefBranchIndex,
    "the human branch should present the relevant conversation or service scope",
  );
  assert.ok(
    freeTimingIndex > humanBriefScopeIndex,
    "the free timing result must be the alternative to every human brief",
  );
  assert.equal(home.match(/<RouteFinder\b/gu)?.length, 1);
  assert.equal(finder.match(/<form\b/gu)?.length, 1);
  assert.match(
    home,
    /planningIntent\s*===\s*["']explore["'][\s\S]{0,1500}<HomepagePlanningUpgrade\b/u,
  );
  assert.match(
    home,
    /hidden=\{[\s\S]{0,120}!planningIntent \|\| planningIntent === ["']explore["'][\s\S]{0,250}<PlannerHandoff\b/u,
  );
  assert.match(
    home,
    /<PlannerHandoff\b[\s\S]{0,300}serviceInterest=\{handoffServiceInterest\}[\s\S]{0,300}planningIntent === ["']conversation["'][\s\S]{0,120}\? planningStarterIntent/u,
  );
  assert.match(plannerHandoff, /getHomepagePlanningDeskCopy\(locale\)/u);
  assert.match(
    plannerHandoff,
    /planning(?:Desk)?Copy\.paidBriefs\[serviceInterest\.id\]/u,
  );
  assert.match(
    plannerHandoff,
    /planningCopy\.starterPrompts\.find\([\s\S]{0,120}prompt\.id === starterIntent/u,
  );
  assert.match(
    plannerHandoff,
    /Homepage starter intent:[\s\S]{0,100}starterPrompt\.label/u,
  );
  assert.match(
    plannerHandoff,
    /paidBriefCopy\?\.successTitle\s*\?\?[\s\S]{0,80}conversationBriefCopy\?\.successTitle\s*\?\?[\s\S]{0,80}copy\.handoff\.successTitle/u,
    "conversation submissions must use the dedicated free-enquiry success copy",
  );
  assert.match(
    plannerHandoff,
    /paidBriefCopy\?\.successBody\s*\?\?[\s\S]{0,80}conversationBriefCopy\?\.successBody\s*\?\?[\s\S]{0,80}copy\.handoff\.successBody/u,
  );
  assert.match(
    plannerHandoff,
    /paidBriefCopy\?\.submitLabel\s*\?\?[\s\S]{0,100}conversationBriefCopy\?\.submitLabel\s*\?\?[\s\S]{0,80}copy\.handoff\.submit/u,
  );
  assert.match(
    plannerHandoff,
    /paidBriefCopy\?\.successBackLabel\s*\?\?[\s\S]{0,80}conversationBriefCopy\?\.successBackLabel\s*\?\?[\s\S]{0,80}copy\.handoff\.backToRoute/u,
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
    /\.intentStarterOption\s*\{[\s\S]{0,700}min-inline-size:\s*0/u,
  );
  assert.match(
    styles,
    /@media\s*\(max-width:\s*820px\)\s*\{[\s\S]{0,300}\.intentStarterGrid,[\s\S]{0,250}grid-template-columns:\s*minmax\(0,\s*1fr\)/u,
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
    /const currentService = getRouteServiceInterest\([\s\S]{0,180}planningIntentRef\.current[\s\S]{0,220}url\.searchParams\.set\([\s\S]{0,100}currentService\.id/u,
    "older question history entries must be canonicalized to the selected service",
  );
  assert.match(
    home,
    /nextIntent === ["']explore["'] \|\| nextIntent === ["']conversation["'][\s\S]{0,220}sessionStorage\.setItem/u,
  );
  assert.match(home, /else \{[\s\S]{0,120}sessionStorage\.removeItem\(planningIntentStorageKey\)/u);
  assert.match(
    home,
    /url\.searchParams\.has\(["']planner["']\)[\s\S]{0,160}storedIntent === ["']conversation["'][\s\S]{0,80}storedIntent === ["']explore["']/u,
  );
  assert.match(
    home,
    /setPlanningStarterIntent\(\s*canRestoreNonServiceFlow\s*&&[\s\S]{0,180}isHomepageStarterIntentId\(storedStarterIntent\)/u,
    "a clean homepage URL must not restore a stale starter selection",
  );
});

test("paid contact drafts survive the free branch while service-only notes remain scoped", async () => {
  const [home, finder, handoff] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/RouteFinder.tsx"),
    source("components/PlannerHandoff.tsx"),
  ]);

  assert.match(home, /retainedRouteServiceInterest/u);
  assert.equal(
    home.match(/<PlannerHandoff\b/gu)?.length,
    1,
    "one mounted handoff must preserve shared contact fields across every path",
  );
  assert.match(
    home,
    /hidden=\{[\s\S]{0,120}planningIntent === ["']explore["'][\s\S]{0,250}<PlannerHandoff/u,
  );
  assert.match(home, /serviceInterest=\{handoffServiceInterest\}/u);
  assert.match(home, /serviceContextRevision/u);
  assert.match(handoff, /previousServiceContextRevisionRef/u);
  assert.match(handoff, /routeNeedsScopeConfirmation/u);
  assert.match(handoff, /outsideStandardScope\.note/u);
  assert.match(
    finder,
    /className=\{styles\.handoffSlot\}[\s\S]{0,160}hidden=\{view !== ["']result["'] \|\| !match \|\| intentPickerOpen\}[\s\S]{0,100}\{handoff\}/u,
    "browser history may hide the handoff, but must not unmount and erase its draft",
  );
  assert.match(
    finder,
    /window\.history\.replaceState\([\s\S]{0,300}plannerUrl\(historyView\)[\s\S]{0,100}window\.dispatchEvent\(new Event\(locationChangeEventName\)\)/u,
    "initial planner URL state must notify language links immediately",
  );
});

test("the open note lane starts the conversation without leaking or persisting the note", async () => {
  const [planningDesk, home, finder, handoff] = await Promise.all([
    source("components/HomepagePlanningDesk.tsx"),
    source("components/HomegroundHomePage.tsx"),
    source("components/RouteFinder.tsx"),
    source("components/PlannerHandoff.tsx"),
  ]);

  assert.match(planningDesk, /id="planning-intent-note"/u);
  assert.match(planningDesk, /<label htmlFor="planning-intent-note">/u);
  assert.match(planningDesk, /maxLength=\{maximumStarterNoteLength\}/u);
  assert.match(planningDesk, /sanitizeStarterNote\(/u);
  assert.match(
    planningDesk,
    /const hasNote = starterNote\.trim\(\)\.length > 0;\s*if \(!draft && !hasNote\) \{\s*setError\(copy\.requiredError\)/u,
    "an empty prompt and empty note must produce a visible text error",
  );
  assert.match(
    planningDesk,
    /onContinue\("conversation", "open-text"\)/u,
    "a note alone must start the neutral conversation path",
  );
  assert.doesNotMatch(
    home,
    /sessionStorage\.setItem\([^)]*[Nn]ote/u,
    "the free-text starter note must not be persisted to sessionStorage",
  );
  assert.doesNotMatch(
    home,
    /planning_starter_note|starterNote:\s*planningStarterNote[\s\S]{0,200}dataLayer/u,
    "the free-text starter note must never reach analytics",
  );
  assert.match(
    home,
    /starterNote=\{\s*planningIntent === ["']conversation["']\s*\?\s*planningStarterNote\s*:\s*null\s*\}/u,
    "the note travels only with the conversation enquiry",
  );
  assert.match(finder, /planningStarterNote = ""/u);
  assert.match(finder, /onStarterNoteChange=\{onPlanningStarterNoteChange\}/u);
  assert.match(
    handoff,
    /!serviceInterest && starterNote\?\.trim\(\)[\s\S]{0,120}Traveller note:/u,
    "the note is delivered inside the enquiry note at submit time only",
  );
  assert.match(
    finder,
    /planningStarterIntent === ["']open-text["']\s*\?\s*planningCopy\.openStarterLabel/u,
    "the own-words start must have a readable starting-point label",
  );
});

test("booking responsibility is a required, accessible signal on every human path", async () => {
  const [handoff, handoffStyles] = await Promise.all([
    source("components/PlannerHandoff.tsx"),
    source("components/PlannerHandoff.module.css"),
  ]);

  assert.match(handoff, /name="bookingResponsibility"/u);
  assert.match(
    handoff,
    /planningCopy\.bookingResponsibility\.legend/u,
  );
  assert.match(
    handoff,
    /planningCopy\.bookingResponsibility\.options\.map/u,
  );
  assert.match(
    handoff,
    /if \(!bookingResponsibility\) \{\s*nextErrors\.bookingResponsibility/u,
    "submission without a responsibility answer must fail validation",
  );
  assert.match(
    handoff,
    /bookingResponsibility:\s*`\$\{responsibilityGroupId\}-traveller`/u,
    "the error summary must link to the responsibility group",
  );
  assert.match(
    handoff,
    /Booking responsibility: \$\{bookingResponsibility\}/u,
    "the structured responsibility id must reach the enquiry note",
  );
  assert.match(
    handoff,
    /bookingResponsibility !== ""/u,
    "an answered responsibility must count as an unsaved draft",
  );
  assert.match(
    handoff,
    /const showFixedScopeHint = Boolean\(\s*serviceInterest &&\s*serviceInterest\.id !== ["']full-trip-support["'] &&\s*\(bookingResponsibility === ["']homeground-selected["'] \|\|\s*bookingResponsibility === ["']homeground-most["']\)/u,
    "fixed-price paths must hint, never force, a full-trip scope",
  );
  assert.match(
    handoff,
    /planningCopy\.bookingResponsibility\.fixedScopeHint/u,
  );
  assert.doesNotMatch(
    handoff,
    /aria-live="polite"[^>]*\n?[^>]*hidden=/u,
    "a live region must stay in the accessibility tree instead of toggling hidden",
  );
  assert.match(
    handoff,
    /<div aria-live="polite" aria-atomic="true">\s*\{showFixedScopeHint &&/u,
    "the scope hint must announce by swapping content inside a persistent live region",
  );
  assert.doesNotMatch(
    handoff,
    /setBookingResponsibility\(["']{2}\)/u,
    "switching service must keep the shared responsibility answer",
  );
  assert.match(handoffStyles, /\.responsibilityOption\s*\{[\s\S]{0,600}min-block-size:\s*2\.9rem/u);
  assert.match(handoffStyles, /\.responsibilityOption:focus-within/u);
});

test("the worst-case composed enquiry note still fits the server contract", async () => {
  const handoff = await source("components/PlannerHandoff.tsx");
  const clientLimit = Number(
    handoff
      .match(/const maximumTripContextLength = ([0-9_]+)/u)[1]
      .replaceAll("_", ""),
  );
  const serverLimit = 2_000;
  const unicodeLength = (value) => Array.from(value).length;

  for (const locale of ["en", "zh", "ko"]) {
    const planningDeskCopy = getHomepagePlanningDeskCopy(locale);
    const longestStarterLine = [
      ...planningDeskCopy.starterPrompts.map((prompt) => prompt.label),
      planningDeskCopy.openStarterLabel,
    ]
      .map(
        (label) => `Homepage starter intent: self-book-route — ${label}`,
      )
      .reduce((a, b) => (unicodeLength(a) >= unicodeLength(b) ? a : b));
    const longestResponsibilityLine = planningDeskCopy.bookingResponsibility.options
      .map((option) => `Booking responsibility: ${option.id}`)
      .reduce((a, b) => (unicodeLength(a) >= unicodeLength(b) ? a : b));

    for (const serviceId of routeServiceIds) {
      const service = getRouteServiceInterest(serviceId, locale);
      for (const serviceLine of [
        service.note,
        planningDeskCopy.outsideStandardScope.note(service.label),
      ]) {
        const composed = [
          longestStarterLine,
          serviceLine,
          longestResponsibilityLine,
          `${service.contextNoteLabel}:\n${"字".repeat(clientLimit)}`,
        ].join("\n\n");

        assert.ok(
          unicodeLength(composed) <= serverLimit,
          `${locale}/${serviceId} composes a ${unicodeLength(
            composed,
          )}-character note, above the ${serverLimit}-character contract limit`,
        );
      }
    }
  }
});

test("the free result upgrades into a planner conversation before any paid option", async () => {
  const planningDesk = await source("components/HomepagePlanningDesk.tsx");
  const conversationIndex = planningDesk.indexOf(
    "planningUpgradeConversation",
  );
  const paidOptionsIndex = planningDesk.indexOf(
    "planningUpgradeOptions",
    conversationIndex,
  );

  assert.ok(
    conversationIndex >= 0,
    "the free result must offer a conversation entry",
  );
  assert.ok(
    paidOptionsIndex > conversationIndex,
    "the conversation entry must lead the paid upgrade options",
  );
  assert.match(
    planningDesk,
    /onSelect\("conversation"\)/u,
  );
  assert.match(
    planningDesk,
    /copy\.freeUpgrade\.conversationLabel/u,
  );
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

test("the homepage planning example keeps its Hangzhou image and three-language copy aligned", async () => {
  const home = await source("components/HomegroundHomePage.tsx");
  const english = getHomegroundCopy("en").proof;
  const chinese = getHomegroundCopy("zh").proof;
  const korean = getHomegroundCopy("ko").proof;

  assert.match(home, /src="\/images\/home\/hangzhou-1600\.jpg"/u);
  assert.match(home, /width="1600"/u);
  assert.match(home, /height="1066"/u);
  assert.doesNotMatch(home, /zhangjiajie-1600\.jpg/u);

  assert.match(english.imageBadge, /Hangzhou/u);
  assert.match(english.extract[0].detail, /Shanghai → Hangzhou/u);
  assert.match(chinese.imageBadge, /杭州/u);
  assert.match(chinese.extract[0].detail, /上海 → 杭州/u);
  assert.match(korean.imageBadge, /항저우/u);
  assert.match(korean.extract[0].detail, /상하이 → 항저우/u);
});
