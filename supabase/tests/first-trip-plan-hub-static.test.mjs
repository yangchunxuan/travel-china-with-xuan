import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import {
  firstTripPlanOwnerPaths,
  firstTripPlanStepIds,
  getFirstTripPlanHubCopy,
  getFirstTripPlanOwnerPath,
} from "../../lib/firstTripPlanHubI18n.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) =>
  readFile(path.join(projectRoot, relativePath), "utf8");

const locales = ["en", "zh", "ko"];

test("the first-trip hub keeps one eight-step decision sequence in all locales", () => {
  for (const locale of locales) {
    const copy = getFirstTripPlanHubCopy(locale);
    assert.deepEqual(
      copy.steps.map((step) => step.id),
      firstTripPlanStepIds,
      locale,
    );
    assert.equal(copy.steps.length, 8, locale);
    assert.equal(copy.boundary.items.length, 3, locale);
    assert.equal(copy.boundary.items[0].ownerId, undefined, locale);
    assert.equal(copy.boundary.items[1].ownerId, "paceDiagnostic", locale);
    assert.equal(copy.boundary.items[2].ownerId, "humanReview", locale);
    for (const step of copy.steps) {
      assert.ok(step.title.length > 0, `${locale}/${step.id}/title`);
      assert.ok(step.task.length > 0, `${locale}/${step.id}/task`);
      assert.ok(step.doneWhen.length > 0, `${locale}/${step.id}/doneWhen`);
      assert.ok(step.links.length > 0, `${locale}/${step.id}/links`);
    }
  }
});

test("the Chinese sequence copy stays natural and keeps its fixed phrase together", async () => {
  const [hub, styles] = await Promise.all([
    source("components/SearchPlatformHubPage.tsx"),
    source("components/SearchPlatformHubPage.module.css"),
  ]);
  const copy = getFirstTripPlanHubCopy("zh");

  assert.equal(copy.title, "按正确顺序，一步步规划好行程。");
  assert.equal(copy.titleNoWrap, "一步步");
  assert.equal(
    copy.introduction,
    "先确认限制条件，再选择城市并安排预订。每一步都会带你进入 Homeground 现有的对应页面，不必再从零散的搜索结果中拼凑第一次来中国的完整行程。",
  );
  assert.equal(
    copy.steps[0].task,
    "预订不可退改的机票或火车票前，先核对护照、来华目的、路线和停留时间。",
  );
  assert.match(hub, /styles\.keepTogether/);
  assert.match(styles, /\.keepTogether\s*\{[^}]*white-space:\s*nowrap/s);
  assert.match(styles, /scroll-margin-top:\s*6\.5rem/);
});

test("all first-trip links resolve to the existing locale path, not a synonym page", () => {
  for (const [ownerId, ownerPath] of Object.entries(firstTripPlanOwnerPaths)) {
    assert.equal(getFirstTripPlanOwnerPath(ownerId, "en"), ownerPath);
    assert.equal(getFirstTripPlanOwnerPath(ownerId, "zh"), `/zh${ownerPath}`);
    assert.equal(getFirstTripPlanOwnerPath(ownerId, "ko"), `/ko${ownerPath}`);
  }

  assert.equal(firstTripPlanOwnerPaths.paceDiagnostic, "/guides/is-your-china-itinerary-too-rushed/");
  assert.equal(firstTripPlanOwnerPaths.humanReview, "/china-itinerary-review/");
});

test("independent guide owners expose the same three canonical locale paths", async () => {
  const guideOwners = {
    payment: "how-to-pay-in-china-as-a-tourist",
    connectivity: "china-esim-vs-local-sim",
    routeShape: "china-hub-and-spoke-or-multi-base-route",
    openJaw: "china-open-jaw-flights-route-planning",
    highSpeedRail: "china-high-speed-train-first-time-guide",
    hotelNearMetro: "china-hotel-near-metro",
    tickets: "official-or-reseller-china-tickets",
    arrivalBuffer: "china-arrival-day-booked-anchor-or-flexible-block",
    departureBuffer: "china-last-night-before-international-flight",
  };

  for (const [ownerId, guideId] of Object.entries(guideOwners)) {
    const metadata = JSON.parse(
      await source(`content/guides/${guideId}/metadata.json`),
    );
    for (const locale of locales) {
      assert.equal(
        metadata.locales[locale].path,
        getFirstTripPlanOwnerPath(ownerId, locale),
        `${ownerId}/${locale}`,
      );
    }
  }
});

test("plan routes remain thin and render the shared hub without adding a new URL", async () => {
  const [hub, platformCopy] = await Promise.all([
    source("components/SearchPlatformHubPage.tsx"),
    source("lib/searchPlatformI18n.ts"),
  ]);

  assert.match(hub, /section === "plan" \? <FirstTripPlanSequence locale=\{locale\} \/>/);
  assert.match(hub, /getFirstTripPlanOwnerPath/);
  assert.match(platformCopy, /First Trip to China Planner/);
  assert.match(platformCopy, /第一次去中国/);
  assert.match(platformCopy, /첫 중국 여행 플래너/);
  assert.doesNotMatch(hub, /Route Reality/);

  for (const route of [
    "app/(default)/plan/page.tsx",
    "app/(localized)/[locale]/plan/page.tsx",
  ]) {
    assert.equal((await stat(path.join(projectRoot, route))).isFile(), true, route);
  }
});
