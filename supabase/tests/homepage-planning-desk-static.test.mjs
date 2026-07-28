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
  ]);
  for (const id of homepagePlanningIntentIds) {
    assert.equal(isHomepagePlanningIntentId(id), true);
  }
  assert.equal(isHomepagePlanningIntentId(null), false);
  assert.equal(isHomepagePlanningIntentId("explore"), false);
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
  assert.doesNotMatch(surface, /HomepagePlanningUpgrade/u);
  assert.doesNotMatch(planningModel, /id:\s*["']explore["']/u);
});

test("English, Chinese and Korean expose the same quick contacts and three paid shortcuts", async () => {
  const localizedCopySource = await source("lib/homepagePlanningDesk.ts");
  const locales = [
    {
      locale: "en",
      patterns: [
        /Tell us the China trip you want/u,
        /Start with the easiest way to reach us\./u,
        /Talk on WhatsApp/u,
        /Open WhatsApp/u,
        /Message us on Messenger/u,
        /Leave your email/u,
        /Your email has been saved\./u,
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
        /说说你想要的中国旅行/u,
        /选择最方便的方式，先和我们聊聊。/u,
        /通过 WhatsApp 直接聊/u,
        /打开 WhatsApp/u,
        /通过 Messenger 联系/u,
        /留下你的邮箱/u,
        /邮箱已保存。/u,
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
        /가장 편한 방법으로 먼저 이야기해 보세요\./u,
        /WhatsApp으로 바로 상담하기/u,
        /WhatsApp 열기/u,
        /Messenger로 메시지 보내기/u,
        /이메일 남기기/u,
        /이메일이 저장되었습니다\./u,
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
    assert.ok(
      planningDeskCopy.contactStart.emailUse.length > 0 &&
        planningDeskCopy.contactStart.whatsappOpensExternally.length > 0 &&
        planningDeskCopy.contactStart.privacyAction.length > 0,
      `${locale} quick contacts must explain email use, outbound messaging and privacy`,
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
    assert.equal(planningDeskCopy.options.length, 4);
    assert.equal(
      planningDeskCopy.options.filter((option) => option.kind === "conversation").length,
      1,
      `${locale} must expose one free conversation path`,
    );
    assert.match(
      JSON.stringify(planningDeskCopy.conversationBrief),
      locale === "en"
        ? /planner[\s\S]*brief|brief[\s\S]*planner/iu
        : locale === "zh"
          ? /规划师[\s\S]*简报|简报[\s\S]*规划师/u
          : /플래너[\s\S]*브리프|브리프[\s\S]*플래너/u,
      `${locale} free brief must be read by a human planner`,
    );
    assert.deepEqual(
      planningDeskCopy.options
        .filter((option) => option.kind === "paid")
        .map((option) => option.id),
      [
        "itinerary-review",
        "route-build",
        "full-trip-support",
      ],
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
  for (const stalePhrase of [
    /id:\s*["']explore["']/u,
    /Free route timing check/iu,
    /automated starting point/iu,
    /No human review is included/iu,
    /免费路线(?:查找器|检查)/u,
    /自动生成的起点/u,
    /不包含人工审核/u,
    /무료 Route Finder/iu,
    /자동으로 만든 출발점/u,
    /사람이 직접 검토하는 서비스는 포함되지 않습니다/u,
  ]) {
    assert.doesNotMatch(localizedCopySource, stalePhrase);
  }
});

test("the first planning view is contact-only while paid shortcuts stay available in the planner", async () => {
  const [home, planningDesk, quickContact, styles] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomepagePlanningDesk.tsx"),
    source("components/HomepageQuickContact.tsx"),
    source("components/HomegroundHomePage.module.css"),
  ]);

  assert.doesNotMatch(home, /beijing-hero/u);
  assert.doesNotMatch(home, /heroPicture|photoCaption/u);
  assert.doesNotMatch(home, /className=\{styles\.heroFacts\}/u);
  assert.match(home, /className=\{styles\.heroLead\}/u);
  assert.match(planningDesk, /<HomepageQuickContact/u);
  assert.match(planningDesk, /contactOnly\s*\?/u);
  assert.match(
    planningDesk,
    /variant=\{contactOnly\s*\?\s*["']hero["']\s*:\s*["']default["']\}/u,
  );
  assert.match(quickContact, /defaultWhatsAppNumber = "8613174215999"/u);
  assert.match(
    quickContact,
    /defaultMessengerUrl = "https:\/\/m\.me\/61591910731724"/u,
  );
  assert.match(
    planningDesk,
    /copy\.options\.filter\([\s\S]{0,100}option\.kind === ["']paid["']/u,
  );
  assert.match(planningDesk, /className=\{styles\.intentServiceShortcut\}/u);
  assert.doesNotMatch(planningDesk, /className=\{styles\.intentFreeTool\}/u);
  assert.match(
    planningDesk,
    /onClick=\{\(\) => onContinue\(option\.id\)\}/u,
  );
  assert.match(
    styles,
    /\.quickContactGrid\s*\{[\s\S]{0,180}grid-template-columns:\s*repeat\(2,/u,
  );
  assert.match(
    styles,
    /\.quickContactHero\s+\.quickContactGrid\s*\{[\s\S]{0,180}grid-template-columns:\s*minmax\(0,\s*1fr\)/u,
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
  assert.match(planningDesk, /<HomepageQuickContact/u);
  assert.match(styles, /\.quickContactSpinner\s*\{[\s\S]{0,120}animation:/u);
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

test("conversation and all three paid paths end at the same human handoff", async () => {
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
    /const briefCopy\s*=\s*serviceInterest[\s\S]{0,100}planningCopy\.paidBriefs\[serviceInterest\.id\][\s\S]{0,100}planningCopy\.conversationBrief/u,
  );
  assert.match(finder, /data-result-mode=["']human-brief-ready["']/u);
  assert.doesNotMatch(finder, /free-route-check/u);
  const humanBriefBranchIndex = finder.indexOf("styles.paidBriefGrid");
  const humanBriefScopeIndex = finder.indexOf(
    "briefCopy.scopeLabel",
    humanBriefBranchIndex,
  );
  assert.ok(
    humanBriefBranchIndex >= 0,
    "expected the human brief branch",
  );
  assert.ok(
    humanBriefScopeIndex > humanBriefBranchIndex,
    "the human branch should present the relevant conversation or service scope",
  );
  assert.equal(home.match(/<RouteFinder\b/gu)?.length, 1);
  assert.equal(finder.match(/<form\b/gu)?.length, 1);
  assert.doesNotMatch(surface, /HomepagePlanningUpgrade/u);
  assert.doesNotMatch(surface, /planningIntent\s*===\s*["']explore["']/u);
  assert.equal(
    home.match(/<PlannerHandoff\b/gu)?.length,
    1,
    "every valid intent must share one mounted human handoff",
  );
  assert.match(home, /hidden=\{!planningIntent\}[\s\S]{0,250}<PlannerHandoff\b/u);
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
    /\.quickContactCard\s*\{[\s\S]{0,300}min-inline-size:\s*0/u,
  );
  assert.match(
    styles,
    /@media\s*\(max-width:\s*820px\)\s*\{[\s\S]{0,300}\.quickContactGrid\s*\{[\s\S]{0,120}grid-template-columns:\s*minmax\(0,\s*1fr\)/u,
  );
  assert.match(
    styles,
    /\.quickContactPrimaryLink,[\s\S]{0,120}\.quickContactEmailRow button\s*\{[\s\S]{0,300}min-block-size:\s*2\.75rem/u,
  );
  assert.match(
    styles,
    /\.quickContactCard\s*\{[\s\S]{0,300}overflow-wrap:\s*anywhere/u,
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
    /if \(nextIntent === ["']conversation["']\)[\s\S]{0,180}sessionStorage\.setItem/u,
  );
  assert.match(home, /else \{[\s\S]{0,120}sessionStorage\.removeItem\(planningIntentStorageKey\)/u);
  assert.doesNotMatch(
    home,
    /searchParams\.(?:get|has|set)\(\s*["']planner["']/u,
    "the retired planner query must not be restored",
  );
  assert.doesNotMatch(home, /storedIntent === ["']explore["']/u);
  assert.match(
    home,
    /setPlanningStarterIntent\(\s*canRestoreNonServiceFlow\s*&&[\s\S]{0,180}isHomepageStarterIntentId\(storedStarterIntent\)/u,
    "a clean homepage URL must not restore a stale starter selection",
  );
});

test("shared contact drafts survive service switches while service-only notes remain scoped", async () => {
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
  assert.match(home, /hidden=\{!planningIntent\}[\s\S]{0,250}<PlannerHandoff/u);
  assert.doesNotMatch(home, /planningIntent === ["']explore["']/u);
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

test("homepage quick contact is email-only on site and uses direct outbound messaging links", async () => {
  const [planningDesk, quickContact] = await Promise.all([
    source("components/HomepagePlanningDesk.tsx"),
    source("components/HomepageQuickContact.tsx"),
  ]);

  assert.match(planningDesk, /<HomepageQuickContact/u);
  assert.doesNotMatch(planningDesk, /id="planning-intent-note"/u);
  assert.match(
    quickContact,
    /`https:\/\/wa\.me\/\$\{whatsappNumber\}\?text=\$\{encodeURIComponent\(/u,
  );
  assert.match(
    quickContact,
    /defaultMessengerUrl = "https:\/\/m\.me\/61591910731724"/u,
  );
  assert.equal(
    quickContact.match(/target="_blank"/gu)?.length,
    2,
    "WhatsApp and Messenger must be outbound links, not in-site submissions",
  );
  assert.equal(
    quickContact.match(/rel="noopener noreferrer"/gu)?.length,
    2,
  );
  assert.doesNotMatch(
    quickContact,
    /mailto:|fallbackEmail/u,
    "homepage email must remain an on-site form in every Hero state",
  );
  assert.match(
    quickContact,
    /const buildPayload = \(\) => \(\{[\s\S]{0,500}entryPath: "homepage_email"[\s\S]{0,500}contact:\s*\{\s*channel: "email",\s*email: email\.trim\(\)/u,
  );
  assert.match(
    quickContact,
    /attribution:\s*\{\s*landingPath: inquirySubmitSurfaceByLocale\[locale\],\s*\}/u,
  );
  const payloadBuilder = quickContact.slice(
    quickContact.indexOf("const buildPayload"),
    quickContact.indexOf("const dispatch"),
  );
  for (const forbidden of [
    /\bjourney\b/u,
    /\bname\b/u,
    /\bphone(?:Raw|E164)?\b/u,
    /\bnote\b/u,
    /\butm(?:Source|Medium|Campaign)\b/u,
    /\bdepartureCountry\b/u,
    /\broughBudgetPerPerson\b/u,
  ]) {
    assert.doesNotMatch(payloadBuilder, forbidden);
  }
  assert.match(
    quickContact,
    /if \(response\.ok\) \{[\s\S]{0,300}success\?\.state === "submitted"[\s\S]{0,180}typeof success\.publicReference === "string"[\s\S]{0,220}setStatus\("success"\)/u,
    "the email card must announce success only after the API confirms a saved submission with a reference",
  );
  assert.match(
    quickContact,
    /snapshotRef\.current[\s\S]{0,220}snapshot\.body !== body[\s\S]{0,220}idempotencyKey: createUuid\(\)/u,
  );
  assert.match(
    quickContact,
    /showRetry && snapshotRef\.current[\s\S]{0,300}const snapshot = snapshotRef\.current;[\s\S]{0,120}if \(snapshot\) void dispatch\(snapshot\)/u,
    "uncertain retries must reuse the same body and idempotency key",
  );
  assert.doesNotMatch(quickContact, /sessionStorage|localStorage|dataLayer/u);
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

test("quick contacts replace the neutral starter while paid service routing stays unchanged", async () => {
  const [planningDesk, quickContact] = await Promise.all([
    source("components/HomepagePlanningDesk.tsx"),
    source("components/HomepageQuickContact.tsx"),
  ]);
  assert.match(
    planningDesk,
    /<HomepageQuickContact[\s\S]{0,120}locale=\{locale\}[\s\S]{0,120}copy=\{copy\}/u,
  );
  assert.match(
    planningDesk,
    /const paidOptions = copy\.options\.filter\([\s\S]{0,100}option\.kind === ["']paid["']/u,
  );
  assert.match(planningDesk, /onClick=\{\(\) => onContinue\(option\.id\)\}/u);
  assert.match(quickContact, /type="email"/u);
  assert.match(quickContact, /autoComplete="email"/u);
  assert.doesNotMatch(planningDesk, /planningUpgradeConversation/u);
  assert.doesNotMatch(planningDesk, /copy\.freeUpgrade/u);
  assert.doesNotMatch(planningDesk, /HomepagePlanningUpgrade/u);
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
  assert.match(copy, /conversationBrief:\s*\{/u);
  assert.match(copy, /No payment has been taken\./u);
  assert.equal(home.match(/<PlannerHandoff\b/gu)?.length, 1);
  assert.doesNotMatch(home, /freeResult(?:Label|Title)/u);
  assert.doesNotMatch(home, /HomepagePlanningUpgrade/u);
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
