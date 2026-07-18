import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getHomegroundCopy } from "../../lib/homegroundI18n.ts";

const routeFinderPath = "components/RouteFinder.tsx";
const destinationCopyPath = "lib/destinationPlannerI18n.ts";
const plannerHandoffPath = "components/PlannerHandoff.tsx";
const plannerHandoffStylesPath = "components/PlannerHandoff.module.css";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("route questions own one localized accessible validation message", async () => {
  const routeFinder = await source(routeFinderPath);
  const destinationCopy = await source(destinationCopyPath);

  assert.match(routeFinder, /<form noValidate onSubmit=\{handleSubmit\}>/);
  assert.match(routeFinder, /const validateCurrentQuestion = \(\): string/);
  assert.match(routeFinder, /setQuestionError\(error\)/);
  assert.match(routeFinder, /headingRef\.current\?\.focus\(\)/);
  assert.match(
    routeFinder,
    /questionError \? ` \$\{questionErrorId\}` : ""/,
  );
  assert.match(routeFinder, /id=\{questionErrorId\} role="alert"/);
  assert.equal(routeFinder.match(/role="alert"/g)?.length, 1);

  assert.match(destinationCopy, /Choose at least one place/);
  assert.match(destinationCopy, /请至少选择一个地方/);
  assert.match(destinationCopy, /장소를 하나 이상 선택/);
  assert.match(destinationCopy, /Choose or enter a whole number/);
  assert.match(destinationCopy, /请选择或输入1至60/);
  assert.match(destinationCopy, /1박부터 60박 사이/);
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
  const restartStart = routeFinder.indexOf("const handleRestart");
  const restartEnd = routeFinder.indexOf(
    "const toggleDestination",
    restartStart,
  );
  const restartHandler = routeFinder.slice(restartStart, restartEnd);
  assert.match(restartHandler, /returnPlannerHistoryToStart\(\)/);
  assert.doesNotMatch(restartHandler, /history\.pushState/);
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

test("direct WhatsApp is a customer-initiated external handoff, not an Inquiry submit", async () => {
  const plannerHandoff = await source(plannerHandoffPath);

  assert.match(
    plannerHandoff,
    /NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED/,
  );
  assert.match(
    plannerHandoff,
    /NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER/,
  );
  assert.match(
    plannerHandoff,
    /https:\/\/wa\.me\/\$\{whatsappNumber\}\?text=\$\{encodeURIComponent/,
  );
  assert.match(plannerHandoff, /value="direct-whatsapp"/);
  assert.match(plannerHandoff, /setWhatsappLaunchAttempted\(true\)/);
  assert.match(plannerHandoff, /rel="noopener noreferrer"/);
  assert.doesNotMatch(plannerHandoff, /phoneRaw/);
  assert.doesNotMatch(plannerHandoff, /type="tel"/);
  assert.doesNotMatch(
    plannerHandoff,
    /contact:\s*\{[\s\S]{0,120}channel:\s*"whatsapp"/,
  );
  const dirtyStart = plannerHandoff.indexOf("const formIsDirty");
  const dirtyEnd = plannerHandoff.indexOf(
    "const hasUnsavedContactDraft",
    dirtyStart,
  );
  const dirtyState = plannerHandoff.slice(dirtyStart, dirtyEnd);
  assert.match(dirtyState, /email\.trim\(\)/);
  assert.match(dirtyState, /note\.trim\(\)/);
  assert.doesNotMatch(dirtyState, /contactMethod|whatsapp/);

  const messageStart = plannerHandoff.indexOf("const whatsappMessage");
  const messageEnd = plannerHandoff.indexOf(
    "const whatsappUrl",
    messageStart,
  );
  const messageBuilder = plannerHandoff.slice(messageStart, messageEnd);
  assert.match(messageBuilder, /\.\.\.briefLines/);
  assert.doesNotMatch(
    messageBuilder,
    /routeId|routeReference|publicReference|email|utm|attribution|source/i,
  );
  const briefStart = plannerHandoff.indexOf("const briefLines");
  const briefBuilder = plannerHandoff.slice(briefStart, messageStart);
  assert.match(briefBuilder, /wishlistLabel/);
  assert.match(briefBuilder, /totalNights/);
  assert.match(briefBuilder, /partyLabels/);
  assert.match(briefBuilder, /paceLabels/);
  assert.match(briefBuilder, /timing\.status/);
  assert.match(briefBuilder, /mustSeeNames/);
  assert.match(briefBuilder, /note\.trim\(\)/);
  assert.match(briefBuilder, /result\.boundary/);
  assert.doesNotMatch(plannerHandoff, /knownAttributionSource|whatsappSource/);

  const whatsappBranchStart = plannerHandoff.indexOf(
    '{contactMethod === "direct-whatsapp" &&',
  );
  const whatsappBranch = plannerHandoff.slice(whatsappBranchStart);
  assert.ok(whatsappBranchStart >= 0);
  assert.doesNotMatch(whatsappBranch, /type="submit"/);
  assert.doesNotMatch(whatsappBranch, /setStatus\("success"\)/);
});

test("direct WhatsApp states tell all three locales that opening is not sending", () => {
  const english = getHomegroundCopy("en").handoff;
  const chinese = getHomegroundCopy("zh").handoff;
  const korean = getHomegroundCopy("ko").handoff;

  assert.equal(english.whatsappOpen, "Continue in WhatsApp");
  assert.match(english.whatsappAttemptBody, /can’t confirm/);
  assert.match(english.whatsappAttemptBody, /message was sent/);

  assert.equal(chinese.whatsappOpen, "在 WhatsApp 中继续");
  assert.match(chinese.whatsappAttemptBody, /无法确认/);
  assert.match(chinese.whatsappAttemptBody, /消息是否已经发送/);

  assert.equal(korean.whatsappOpen, "WhatsApp에서 계속하기");
  assert.match(korean.whatsappAttemptBody, /확인할 수 없습니다/);
  assert.match(korean.whatsappAttemptBody, /메시지가 전송/);
});
