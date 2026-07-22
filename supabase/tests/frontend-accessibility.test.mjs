import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getHomegroundCopy } from "../../lib/homegroundI18n.ts";

const routeFinderPath = "components/RouteFinder.tsx";
const destinationCopyPath = "lib/destinationPlannerI18n.ts";
const plannerHandoffPath = "components/PlannerHandoff.tsx";
const plannerHandoffStylesPath = "components/PlannerHandoff.module.css";
const homegroundHeaderPath = "components/HomegroundHeader.tsx";
const homegroundPagePath = "components/HomegroundHomePage.tsx";
const homegroundPageStylesPath =
  "components/HomegroundHomePage.module.css";
const homegroundNavigationPath = "lib/homegroundNavigation.ts";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("route questions own one localized accessible validation message", async () => {
  const routeFinder = await source(routeFinderPath);
  const destinationCopy = await source(destinationCopyPath);

  assert.match(
    routeFinder,
    /<form[\s\S]{0,240}noValidate\s+onSubmit=\{handleSubmit\}/,
  );
  assert.match(routeFinder, /const validateCurrentQuestion = \(\): string/);
  assert.match(routeFinder, /setQuestionError\(error\)/);
  assert.match(routeFinder, /headingRef\.current\?\.focus\(\)/);
  assert.match(
    routeFinder,
    /questionError \? ` \$\{questionErrorId\}` : ""/,
  );
  assert.match(routeFinder, /id=\{questionErrorId\}\s+role="alert"/);
  assert.equal(routeFinder.match(/role="alert"/g)?.length, 1);

  assert.match(destinationCopy, /Choose at least one place/);
  assert.match(destinationCopy, /请至少选择一个地方/);
  assert.match(destinationCopy, /장소를 하나 이상 선택/);
  assert.match(destinationCopy, /Choose or enter a whole number/);
  assert.match(destinationCopy, /请选择或输入1至60/);
  assert.match(destinationCopy, /1박부터 60박 사이/);
});

test("planner step changes preserve the current viewport", async () => {
  const routeFinder = await source(routeFinderPath);
  const homegroundPage = await source(homegroundPagePath);

  assert.doesNotMatch(routeFinder, /target\.scrollIntoView/);
  assert.match(
    routeFinder,
    /pendingScrollPositionRef\.current = \{\s*left: window\.scrollX,\s*top: window\.scrollY,/,
  );
  assert.match(
    routeFinder,
    /window\.scrollTo\(\s*pendingScrollPosition\.left,\s*pendingScrollPosition\.top,/,
  );
  assert.match(
    routeFinder,
    /pendingHistoryFocusRef\.current = true/,
  );
  assert.match(
    routeFinder,
    /pendingStartRevealRef\.current[\s\S]{0,180}scrollIntoView\(\{ block: "start" \}\)/,
  );

  const hashEffectStart = homegroundPage.indexOf("const allowedHashes");
  const hashEffectEnd = homegroundPage.indexOf(
    "\n\n  return (\n    <div",
    hashEffectStart,
  );
  const hashEffect = homegroundPage.slice(hashEffectStart, hashEffectEnd);
  assert.match(hashEffect, /\}, \[locale\]\);/);
  assert.doesNotMatch(hashEffect, /\[locale, plannerStatus\]/);
});

test("must-see priorities cannot change while a handoff is locked", async () => {
  const routeFinder = await source(routeFinderPath);

  assert.match(
    routeFinder,
    /const updateMustSee = \(id: DestinationId\) => \{\s*if \(interactionLocked \|\| !match \|\| !journey\) return;/,
  );
  assert.match(
    routeFinder,
    /checked=\{selected\}\s*disabled=\{interactionLocked\}\s*onChange=\{\(\) => updateMustSee\(destinationId\)\}/,
  );
});

test("restart collapses one planner flow instead of adding duplicate back steps", async () => {
  const routeFinder = await source(routeFinderPath);

  assert.match(routeFinder, /homegroundPlannerFlowId/);
  assert.match(routeFinder, /homegroundPlannerDepth/);
  assert.match(
    routeFinder,
    /window\.history\.go\(-currentHistory\.homegroundPlannerDepth\)/,
  );
  assert.match(
    routeFinder,
    /pendingHistoryResetFlowIdRef\.current = nextFlowId/,
  );
  const historyReturnStart = routeFinder.indexOf(
    "const returnPlannerHistoryToStart",
  );
  const historyReturnEnd = routeFinder.indexOf(
    "const validateCurrentQuestion",
    historyReturnStart,
  );
  const historyReturn = routeFinder.slice(
    historyReturnStart,
    historyReturnEnd,
  );
  assert.match(
    historyReturn,
    /addEventListener\(\s*"popstate",[\s\S]{0,420}\{ once: true \}/,
  );
  assert.match(
    historyReturn,
    /sessionStorage\.setItem\(startFocusStorageKey, "true"\)/,
  );
  assert.match(
    routeFinder,
    /focusStartOnMountRef\.current =\s*window\.sessionStorage\.getItem\(startFocusStorageKey\) === "true"/,
  );
  assert.match(
    routeFinder,
    /if \(!focusStartOnMountRef\.current\) return;/,
  );
  assert.match(
    routeFinder,
    /headingRef\.current\?\.focus\(\{ preventScroll: true \}\);\s*focusStartOnMountRef\.current = false;\s*window\.sessionStorage\.removeItem\(startFocusStorageKey\)/,
  );
  assert.match(
    routeFinder,
    /setHistoryFocusRequest\(\(request\) => request \+ 1\)/,
  );
  assert.match(
    routeFinder,
    /\[historyFocusRequest, sessionReady, stepIndex, view\]/,
  );
  const restartStart = routeFinder.indexOf("const handleRestart");
  const restartEnd = routeFinder.indexOf(
    "const toggleDestination",
    restartStart,
  );
  const restartHandler = routeFinder.slice(restartStart, restartEnd);
  assert.match(restartHandler, /returnPlannerHistoryToStart\(\)/);
  assert.doesNotMatch(restartHandler, /history\.pushState/);
});

test("article route deep links seed their cities once, then release the URL", async () => {
  const routeFinder = await source(routeFinderPath);

  assert.match(routeFinder, /const destinationsQueryKey = "destinations"/);
  assert.match(
    routeFinder,
    /destinationIds\.filter\(\(id\) => values\.includes\(id\)\)/,
  );
  assert.match(
    routeFinder,
    /url\.searchParams\.delete\(destinationsQueryKey\)[\s\S]*window\.history\.replaceState/,
  );
  assert.doesNotMatch(
    routeFinder,
    /if \(arrivedWithDestinationQuery\) clearDestinationsQuery\(\)/,
  );
  assert.match(
    routeFinder,
    /if \(!sessionReady \|\| !hasDestinationsQuery\(\)\) return;\s*clearDestinationsQuery\(\)/,
  );
  assert.match(
    routeFinder,
    /function readStoredPlannerSession\(\)[\s\S]*JSON\.parse\(raw\)[\s\S]*catch[\s\S]*return null/,
  );
  assert.match(routeFinder, /const parsed = readStoredPlannerSession\(\)/);
  assert.match(
    routeFinder,
    /const requestedStep = arrivedWithDestinationQuery\s*\? 0/,
  );
});

test("planner CTAs preserve the result while moving to the human handoff", async () => {
  const header = await source(homegroundHeaderPath);
  const page = await source(homegroundPagePath);
  const navigation = await source(homegroundNavigationPath);

  assert.match(navigation, /event\.preventDefault\(\)/);
  assert.match(navigation, /window\.history\.replaceState/);
  assert.match(navigation, /targetElement\.scrollIntoView/);
  assert.match(
    navigation,
    /"#main-content": "main-content"/,
  );
  assert.match(
    navigation,
    /getElementById\(focusTargetId\[target\]\)[\s\S]*focus\(\{ preventScroll: true \}\)/,
  );
  assert.doesNotMatch(navigation, /window\.location\.hash\s*=/);
  assert.equal(
    header.match(/handleHomegroundHashClick\(event, plannerTarget\)/g)
      ?.length,
    2,
  );
  assert.equal(
    page.match(/handleHomegroundHashClick\(event, plannerTarget\)/g)
      ?.length,
    1,
  );
});

test("all production same-page links preserve planner history depth", async () => {
  const header = await source(homegroundHeaderPath);
  const page = await source(homegroundPagePath);
  const handoff = await source(plannerHandoffPath);
  const combined = `${header}\n${page}\n${handoff}`;

  for (const target of [
    "#main-content",
    "#route-finder",
    "#planning-proof",
    "#faq",
  ]) {
    const escaped = target.replace("-", "\\-");
    const hrefCount =
      combined.match(new RegExp(`href="${escaped}"`, "g"))?.length ?? 0;
    const handlerCount =
      combined.match(
        new RegExp(
          `handleHomegroundHashClick\\(event, "${escaped}"\\)`,
          "g",
        ),
      )?.length ?? 0;

    assert.ok(hrefCount > 0, `expected a production link to ${target}`);
    assert.equal(
      handlerCount,
      hrefCount,
      `every ${target} link should preserve the planner history entry`,
    );
  }

  assert.match(header, /const studioHref = `\$\{copy\.path\}studio\/`/);
  assert.doesNotMatch(header, /href="#studio"/);
});

test("same-page navigation moves keyboard focus to its content target", async () => {
  const page = await source(homegroundPagePath);

  assert.match(page, /<main id="main-content" tabIndex=\{-1\}>/);
  for (const headingId of [
    "planning-proof-title",
    "studio-title",
    "faq-title",
  ]) {
    assert.match(
      page,
      new RegExp(`<h2 id="${headingId}" tabIndex=\\{-1\\}>`),
    );
  }
});

test("language changes preserve a completed planner result", async () => {
  const header = await source(homegroundHeaderPath);

  assert.equal(
    header.match(
      /plannerStatus === "result"[\s\S]{0,100}\?planner=result\$\{languageHash\}/g,
    )?.length,
    2,
  );
});

test("the sticky header is opaque over mobile hero text", async () => {
  const styles = await source(homegroundPageStylesPath);
  const headerStart = styles.indexOf(".siteHeader {");
  const headerEnd = styles.indexOf("\n}", headerStart);
  const headerStyles = styles.slice(headerStart, headerEnd);

  assert.match(headerStyles, /background:\s*#faf9f5/);
  assert.doesNotMatch(headerStyles, /rgb\([^)]*\/\s*[0-9]+%/);
});

test("success keeps the full public reference as secondary three-language copy", async () => {
  const publicReference = "HG-7K4M-9Q2P-X6RT";
  const plannerHandoff = await source(plannerHandoffPath);
  const plannerStyles = await source(plannerHandoffStylesPath);

  assert.equal(
    getHomegroundCopy("en").handoff.successReference(publicReference),
    `Support reference: ${publicReference}`,
  );
  assert.equal(
    getHomegroundCopy("zh").handoff.successReference(publicReference),
    `查询参考号：${publicReference}`,
  );
  assert.equal(
    getHomegroundCopy("ko").handoff.successReference(publicReference),
    `문의 확인 번호: ${publicReference}`,
  );

  assert.match(
    plannerHandoff,
    /<p className=\{styles\.publicReference\}>/,
  );
  assert.doesNotMatch(
    plannerHandoff,
    /<strong className=\{styles\.publicReference\}>/,
  );

  const referenceStyleStart = plannerStyles.indexOf(".publicReference");
  const referenceStyleEnd = plannerStyles.indexOf(
    "\n}",
    referenceStyleStart,
  );
  const referenceStyles = plannerStyles.slice(
    referenceStyleStart,
    referenceStyleEnd,
  );
  assert.match(referenceStyles, /font-size:\s*0\.78rem/);
  assert.doesNotMatch(referenceStyles, /background|border|font-weight/);
});

test("email and WhatsApp use one accessible in-site enquiry submit", async () => {
  const plannerHandoff = await source(plannerHandoffPath);

  assert.match(
    plannerHandoff,
    /NEXT_PUBLIC_HOMEGROUND_WHATSAPP_INTAKE_ENABLED/,
  );
  assert.doesNotMatch(plannerHandoff, /DIRECT_WHATSAPP|WHATSAPP_NUMBER/);
  assert.doesNotMatch(plannerHandoff, /wa\.me|direct-whatsapp/);
  assert.match(plannerHandoff, /type="email"/);
  assert.match(plannerHandoff, /autoComplete="email"/);
  assert.match(plannerHandoff, /type="tel"/);
  assert.match(plannerHandoff, /autoComplete="tel"/);
  assert.match(plannerHandoff, /<fieldset/);
  assert.match(
    plannerHandoff,
    /copy\.handoff\.contactMethodLabel/,
  );
  assert.match(plannerHandoff, /type="radio"/);
  assert.match(plannerHandoff, /name="contactMethod"/);
  assert.match(plannerHandoff, /copy\.handoff\.emailOption/);
  assert.match(plannerHandoff, /copy\.handoff\.whatsappOption/);
  assert.doesNotMatch(plannerHandoff, /switchMethod/);
  assert.match(plannerHandoff, /autoComplete="country-name"/);
  assert.match(
    plannerHandoff,
    /<fieldset[\s\S]*copy\.handoff\.optionalDetailsLabel/,
  );
  assert.match(
    plannerHandoff,
    /<label htmlFor=\{roughBudgetId\}>[\s\S]*copy\.handoff\.roughBudgetLabel/,
  );
  assert.match(plannerHandoff, /name="roughBudgetPerPerson"/);
  assert.match(plannerHandoff, /maxLength=\{maximumRoughBudgetLength\}/);
  assert.match(plannerHandoff, /aria-invalid=\{Boolean\([\s\S]*errors\.roughBudgetPerPerson/);
  assert.match(
    plannerHandoff,
    /aria-describedby=\{`\$\{roughBudgetHintId\}\$\{[\s\S]*roughBudgetErrorId/,
  );
  assert.match(
    plannerHandoff,
    /contactMethod === "email"[\s\S]*channel: "email"[\s\S]*channel: "whatsapp"[\s\S]*phoneRaw: phone\.trim\(\)/,
  );
  assert.match(plannerHandoff, /departureCountry: departureCountry\.trim\(\) \|\| null/);
  assert.match(
    plannerHandoff,
    /roughBudgetPerPerson:\s*roughBudgetPerPerson\.trim\(\) \|\| null/,
  );
  assert.match(plannerHandoff, /note: inquiryNote/);
  assert.match(plannerHandoff, /name="tripContext"/);
  assert.match(plannerHandoff, /<label htmlFor=\{tripContextId\}>/);
  assert.match(
    plannerHandoff,
    /maxLength=\{maximumTripContextLength\}/,
  );
  assert.match(
    plannerHandoff,
    /aria-invalid=\{Boolean\(errors\.tripContext\)\}/,
  );
  assert.match(
    plannerHandoff,
    /aria-describedby=\{`\$\{tripContextHintId\}\$\{[\s\S]*tripContextErrorId/,
  );
  assert.match(plannerHandoff, /type="submit"/);

  const dirtyStart = plannerHandoff.indexOf("const formIsDirty");
  const dirtyEnd = plannerHandoff.indexOf(
    "const hasUnsavedContactDraft",
    dirtyStart,
  );
  const dirtyState = plannerHandoff.slice(dirtyStart, dirtyEnd);
  assert.match(dirtyState, /email\.trim\(\)/);
  assert.match(dirtyState, /phone\.trim\(\)/);
  assert.match(dirtyState, /departureCountry\.trim\(\)/);
  assert.match(dirtyState, /roughBudgetPerPerson\.trim\(\)/);
  assert.match(dirtyState, /tripContext\.trim\(\)/);

  const noteStart = plannerHandoff.indexOf("const inquiryNote");
  const noteEnd = plannerHandoff.indexOf("const briefLines", noteStart);
  const noteBuilder = plannerHandoff.slice(noteStart, noteEnd);
  assert.match(noteBuilder, /serviceInterest\.note/);
  assert.match(noteBuilder, /Traveller context:/);
  assert.doesNotMatch(noteBuilder, /URLSearchParams|utm_source|utm_medium|utm_campaign/);

  const briefStart = plannerHandoff.indexOf("const briefLines");
  const briefEnd = plannerHandoff.indexOf("const briefText", briefStart);
  const briefBuilder = plannerHandoff.slice(briefStart, briefEnd);
  assert.match(briefBuilder, /wishlistLabel/);
  assert.match(briefBuilder, /totalNights/);
  assert.match(briefBuilder, /partyLabels/);
  assert.match(briefBuilder, /paceLabels/);
  assert.match(briefBuilder, /timing\.status/);
  assert.match(briefBuilder, /mustSeeNames/);
  assert.match(briefBuilder, /result\.boundary/);
  assert.match(briefBuilder, /inquiryNote/);
});

test("optional service context has accessible multiline validation and server errors", async () => {
  const routeFinder = await source(routeFinderPath);
  const plannerHandoff = await source(plannerHandoffPath);
  const plannerStyles = await source(plannerHandoffStylesPath);

  assert.match(routeFinder, /serviceInterest\?: RouteServiceInterest \| null/);
  assert.match(routeFinder, /serviceInterest = null/);
  assert.match(routeFinder, /<aside[\s\S]*styles\.serviceIntent/);
  assert.match(plannerHandoff, /serviceInterest\?: RouteServiceInterest \| null/);
  assert.match(plannerHandoff, /serviceInterest = null/);
  assert.match(plannerHandoff, /const maximumTripContextLength = 1_800/);
  assert.match(
    plannerHandoff,
    /function isValidTripContext\(value: string\): boolean/,
  );
  assert.match(
    plannerHandoff,
    /Array\.from\(value\.trim\(\)\)\.length <= maximumTripContextLength/,
  );
  assert.match(
    plannerHandoff,
    /!hasUnsupportedControlCharacters\(value\)/,
  );
  assert.match(
    plannerHandoff,
    /setBlurError\(\s*"tripContext",[\s\S]*isValidTripContext\(tripContext\)/,
  );
  assert.match(
    plannerHandoff,
    /fields\.note && serviceInterest[\s\S]*nextErrors\.tripContext/,
  );
  assert.match(plannerHandoff, /tripContext:\s*tripContextId/);
  assert.match(plannerHandoff, /name="tripContext"\s+dir="auto"/);
  assert.match(plannerHandoff, /Do not include passport or ID images/);
  assert.doesNotMatch(plannerHandoff, /type="file"/);
  assert.match(plannerStyles, /\.field input,\s*\.field textarea/);
  assert.match(plannerStyles, /\.field textarea \{[\s\S]*resize: vertical/);
});

test("optional budget has accessible one-line validation and server errors", async () => {
  const plannerHandoff = await source(plannerHandoffPath);

  assert.match(plannerHandoff, /const maximumRoughBudgetLength = 100/);
  assert.match(
    plannerHandoff,
    /function isValidRoughBudget\(value: string\): boolean/,
  );
  assert.match(
    plannerHandoff,
    /Array\.from\(value\.trim\(\)\)\.length <= maximumRoughBudgetLength/,
  );
  assert.match(plannerHandoff, /!\/\[\\r\\n\\t\\u2028\\u2029\]\/u\.test\(value\)/);
  assert.match(
    plannerHandoff,
    /!hasUnsupportedControlCharacters\(value\)/,
  );
  assert.match(
    plannerHandoff,
    /setBlurError\(\s*"roughBudgetPerPerson",[\s\S]*isValidRoughBudget\(roughBudgetPerPerson\)/,
  );
  assert.match(
    plannerHandoff,
    /fields\.roughBudgetPerPerson[\s\S]*copy\.handoff\.roughBudgetError/,
  );
  assert.match(
    plannerHandoff,
    /roughBudgetPerPerson:\s*roughBudgetId/,
  );
});

test("all three locales explain reply choice and optional trip details", () => {
  const english = getHomegroundCopy("en").handoff;
  const chinese = getHomegroundCopy("zh").handoff;
  const korean = getHomegroundCopy("ko").handoff;

  assert.equal(english.contactMethodLabel, "How should we reply?");
  assert.equal(english.emailOption, "Email");
  assert.equal(english.whatsappOption, "WhatsApp");
  assert.match(english.whatsappHint, /country code/);
  assert.match(english.departureCountryLabel, /optional/);
  assert.equal(english.optionalDetailsLabel, "Helpful trip details");
  assert.match(english.roughBudgetLabel, /per person/);
  assert.match(english.roughBudgetLabel, /China trip/);
  assert.match(english.roughBudgetLabel, /optional/);
  assert.match(english.roughBudgetHint, /international flights/);
  assert.match(english.roughBudgetHint, /currency or range/);
  assert.match(english.roughBudgetHint, /not a quote/);
  assert.match(english.roughBudgetError, /100 characters/);
  assert.match(english.roughBudgetError, /one line/);

  assert.equal(chinese.contactMethodLabel, "希望我们如何回复？");
  assert.equal(chinese.emailOption, "电子邮件");
  assert.equal(chinese.whatsappOption, "WhatsApp");
  assert.match(chinese.whatsappHint, /国家或地区代码/);
  assert.match(chinese.departureCountryLabel, /选填/);
  assert.equal(chinese.optionalDetailsLabel, "有帮助的旅行信息");
  assert.match(chinese.roughBudgetLabel, /每人/);
  assert.match(chinese.roughBudgetLabel, /中国行/);
  assert.match(chinese.roughBudgetLabel, /选填/);
  assert.match(chinese.roughBudgetHint, /国际机票/);
  assert.match(chinese.roughBudgetHint, /任意币种/);
  assert.match(chinese.roughBudgetHint, /并非正式报价/);
  assert.match(chinese.roughBudgetError, /100 个字符/);
  assert.match(chinese.roughBudgetError, /单行/);

  assert.equal(korean.contactMethodLabel, "어떤 방법으로 답변드릴까요?");
  assert.equal(korean.emailOption, "이메일");
  assert.equal(korean.whatsappOption, "WhatsApp");
  assert.match(korean.whatsappHint, /국가 번호/);
  assert.match(korean.departureCountryLabel, /선택/);
  assert.equal(korean.optionalDetailsLabel, "도움이 되는 여행 정보");
  assert.match(korean.roughBudgetLabel, /1인당/);
  assert.match(korean.roughBudgetLabel, /중국 여행/);
  assert.match(korean.roughBudgetLabel, /선택/);
  assert.match(korean.roughBudgetHint, /국제선 항공권/);
  assert.match(korean.roughBudgetHint, /통화/);
  assert.match(korean.roughBudgetHint, /정식 견적이 아닙니다/);
  assert.match(korean.roughBudgetError, /100자/);
  assert.match(korean.roughBudgetError, /한 줄/);
});
