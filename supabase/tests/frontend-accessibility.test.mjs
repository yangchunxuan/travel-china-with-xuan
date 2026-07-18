import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getHomegroundCopy } from "../../lib/homegroundI18n.ts";

const routeFinderPath = "components/RouteFinder.tsx";
const plannerHandoffPath = "components/PlannerHandoff.tsx";
const plannerHandoffStylesPath = "components/PlannerHandoff.module.css";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("route questions own one localized accessible validation message", async () => {
  const routeFinder = await source(routeFinderPath);

  assert.match(routeFinder, /<form noValidate onSubmit=\{handleSubmit\}>/);
  assert.match(routeFinder, /setQuestionError\(question\.key\)/);
  assert.match(routeFinder, /headingRef\.current\?\.focus\(\)/);
  assert.match(routeFinder, /aria-invalid=\{hasQuestionError\}/);
  assert.match(
    routeFinder,
    /aria-describedby=\{\s*hasQuestionError \? questionErrorId : undefined\s*\}/,
  );
  assert.match(routeFinder, /\{copy\.finder\.answerRequired\}/);
  assert.equal(routeFinder.match(/role="alert"/g)?.length, 1);

  assert.equal(
    getHomegroundCopy("en").finder.answerRequired,
    "Choose one answer to continue.",
  );
  assert.equal(
    getHomegroundCopy("zh").finder.answerRequired,
    "请选择一个答案后继续。",
  );
  assert.equal(
    getHomegroundCopy("ko").finder.answerRequired,
    "계속하려면 답변 하나를 선택해 주세요.",
  );
});

test("success keeps the full public reference as secondary three-language copy", async () => {
  const publicReference = "HG-7K4M-9Q2P-X6RT";
  const plannerHandoff = await source(plannerHandoffPath);
  const plannerStyles = await source(plannerHandoffStylesPath);

  assert.equal(
    getHomegroundCopy("en").handoff.successReference(publicReference),
    `Reference number (only needed when contacting the studio): ${publicReference}`,
  );
  assert.equal(
    getHomegroundCopy("zh").handoff.successReference(publicReference),
    `参考号（仅联系工作室时需要）：${publicReference}`,
  );
  assert.equal(
    getHomegroundCopy("ko").handoff.successReference(publicReference),
    `참조 번호(스튜디오에 문의할 때만 필요): ${publicReference}`,
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
