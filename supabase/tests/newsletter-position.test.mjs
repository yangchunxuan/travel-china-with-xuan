import assert from "node:assert/strict";
import { test } from "node:test";
import {
  clampNewsletterPoint, moveNewsletterPosition, newsletterCardPlacement,
  newsletterDefaultPosition, newsletterDragStarted, newsletterLauncherBounds,
  newsletterPointForPosition, newsletterPositionForPoint, newsletterPositionStorageKey,
  newsletterLegacyPositionStorageKey, newsletterSafeArea, newsletterSideForPosition,
  parseNewsletterPosition, readNewsletterPosition, snapNewsletterPosition, writeNewsletterPosition,
} from "../../lib/newsletterPosition.ts";

const launcher = { width: 56, height: 56 };
const padding = { left: 16, right: 16, top: 16, bottom: 16 };
const viewport = { left: 0, top: 0, width: 320, height: 640 };
const area = newsletterSafeArea(viewport, padding, launcher, 68);
const bounds = newsletterLauncherBounds(area, launcher);
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} !== ${expected}`);
const nearPoint = (actual, expected) => { near(actual.x, expected.x); near(actual.y, expected.y); };

test("a fresh 320px viewport starts at bottom right and respects the header", () => {
  assert.deepEqual(bounds, { minX: 16, maxX: 248, minY: 76, maxY: 568 });
  assert.deepEqual(newsletterPointForPosition(newsletterDefaultPosition, bounds), { x: 248, y: 568 });
  assert.deepEqual(clampNewsletterPoint({ x: -800, y: -800 }, bounds), { x: 16, y: 76 });
  assert.deepEqual(clampNewsletterPoint({ x: 800, y: 800 }, bounds), { x: 248, y: 568 });
});

test("dragging follows the pointer, then release snaps to the nearest edge without changing height", () => {
  for (const [point, edge] of [[{ x: 216, y: 550 }, 248], [{ x: 40, y: 300 }, 16], [{ x: 132, y: 322 }, 248]]) {
    const position = newsletterPositionForPoint(point, bounds);
    nearPoint(newsletterPointForPosition(position, bounds), point);
    assert.ok(position.x > 0 && position.x < 1);
    const stopped = snapNewsletterPosition(position);
    nearPoint(newsletterPointForPosition(stopped, bounds), { x: edge, y: point.y });
    assert.ok(stopped.x === 0 || stopped.x === 1);
  }
  assert.equal(newsletterSideForPosition({ x: 0.49, y: 0.5 }), "left");
  assert.equal(newsletterSideForPosition({ x: 0.51, y: 0.5 }), "right");
  assert.equal(newsletterPointForPosition({ x: 0.5, y: 0.5 }, bounds).x, 132);
});

test("the same free preference survives resize, rotation, and visual viewport offsets", () => {
  const saved = { x: 0.42, y: 0.37 };
  for (const nextViewport of [viewport, { left: 0, top: 0, width: 1440, height: 900 },
    { left: 12, top: 240, width: 320, height: 230 }, { left: 0, top: 0, width: 640, height: 320 }]) {
    const nextArea = newsletterSafeArea(nextViewport, padding, launcher, 68);
    const nextBounds = newsletterLauncherBounds(nextArea, launcher);
    const point = newsletterPointForPosition(saved, nextBounds);
    assert.ok(point.x >= nextViewport.left && point.x + launcher.width <= nextViewport.left + nextViewport.width);
    assert.ok(point.y >= nextViewport.top && point.y + launcher.height <= nextViewport.top + nextViewport.height);
    nearPoint(newsletterPositionForPoint(point, nextBounds), saved);
  }
  assert.deepEqual(saved, { x: 0.42, y: 0.37 });
});

test("a short viewport keeps the launcher visible even when a top overlay is too tall", () => {
  const shortArea = newsletterSafeArea({ left: 0, top: 0, width: 320, height: 130 }, padding, launcher, 160);
  const shortBounds = newsletterLauncherBounds(shortArea, launcher);
  assert.deepEqual(shortBounds, { minX: 16, maxX: 248, minY: 58, maxY: 58 });
  assert.deepEqual(newsletterPointForPosition({ x: 1, y: 0.1 }, shortBounds), { x: 248, y: 58 });
  assert.deepEqual(newsletterSafeArea({ left: 0, top: 0, width: 64, height: 64 }, padding, launcher, 0),
    { left: 4, top: 4, right: 60, bottom: 60 });
});

test("card expansion stays inside 320px bounds and shares the launcher origin", () => {
  for (const position of [{ x: 1, y: 1 }, { x: 0.34, y: 0.57 }, { x: 0, y: 0 }]) {
    const point = newsletterPointForPosition(position, bounds);
    const card = newsletterCardPlacement(area, position, launcher, { width: 344, height: 360 });
    assert.equal(card.width, 288);
    assert.equal(card.left, 16);
    assert.ok(card.top >= area.top && card.top + card.height <= area.bottom);
    near(card.left + card.originX, point.x + 28);
    near(card.top + card.originY, point.y + 28);
  }
});

test("a dragged card snaps its own visible edge, preserving release height through minimize and reopen", () => {
  const desktopArea = newsletterSafeArea({ left: 0, top: 0, width: 1280, height: 900 }, padding, launcher, 68);
  const cardSize = { width: 344, height: 330 };
  const initial = newsletterCardPlacement(desktopArea, newsletterDefaultPosition, launcher, cardSize);
  for (const release of [{ x: 700, y: 460 }, { x: 370, y: 230 }, { x: 60, y: 100 }]) {
    const position = snapNewsletterPosition(newsletterPositionForPoint(release, initial.bounds));
    const stopped = newsletterCardPlacement(desktopArea, position, launcher, cardSize);
    const expected = { x: release.x < (initial.bounds.minX + initial.bounds.maxX) / 2 ? initial.bounds.minX : initial.bounds.maxX, y: release.y };
    nearPoint({ x: stopped.left, y: stopped.top }, expected);
    assert.ok(position.x === 0 || position.x === 1);
    const icon = newsletterPointForPosition(position, newsletterLauncherBounds(desktopArea, launcher));
    assert.ok(icon.x >= stopped.left && icon.x + launcher.width <= stopped.left + stopped.width);
    assert.ok(icon.y >= stopped.top && icon.y + launcher.height <= stopped.top + stopped.height);
    const restored = parseNewsletterPosition(JSON.stringify(position));
    const reopened = newsletterCardPlacement(desktopArea, restored, launcher, cardSize);
    nearPoint({ x: reopened.left, y: reopened.top }, expected);
  }
});

test("crossing the midpoint keeps drag motion continuous and switches the eventual snap edge", () => {
  const desktopArea = newsletterSafeArea({ left: 0, top: 0, width: 1280, height: 900 }, padding, launcher, 68);
  const before = newsletterCardPlacement(desktopArea, { x: 0.499, y: 0.5 }, launcher, { width: 344, height: 330 });
  const after = newsletterCardPlacement(desktopArea, { x: 0.501, y: 0.5 }, launcher, { width: 344, height: 330 });
  assert.ok(after.left > before.left && after.left - before.left < 2);
  assert.equal(after.top, before.top);
  const leftDock = newsletterCardPlacement(desktopArea, snapNewsletterPosition({ x: 0.499, y: 0.5 }), launcher, { width: 344, height: 330 });
  const rightDock = newsletterCardPlacement(desktopArea, snapNewsletterPosition({ x: 0.501, y: 0.5 }), launcher, { width: 344, height: 330 });
  assert.equal(leftDock.left, desktopArea.left);
  assert.equal(rightDock.left + rightDock.width, desktopArea.right);
  assert.equal(leftDock.top, before.top);
  assert.equal(rightDock.top, after.top);
});

test("a full-width or full-height card preserves the unavailable axis preference", () => {
  const saved = { x: 0.23, y: 0.47 };
  const card = newsletterCardPlacement(area, saved, launcher, { width: 344, height: 360 });
  const moved = newsletterPositionForPoint({ x: card.left, y: card.top + 20 }, card.bounds, saved);
  assert.equal(moved.x, saved.x);
  assert.ok(moved.y > saved.y);
  const shortArea = newsletterSafeArea({ left: 0, top: 0, width: 320, height: 220 }, padding, launcher, 68);
  const shortCard = newsletterCardPlacement(shortArea, saved, launcher, { width: 344, height: 500 });
  assert.equal(shortCard.maxHeight, 128);
  assert.equal(shortCard.top, 76);
  assert.equal(shortCard.top + shortCard.height, 204);
  assert.deepEqual(newsletterPositionForPoint({ x: shortCard.left, y: shortCard.top }, shortCard.bounds, saved), saved);
});

test("left/right keys dock to that side, up/down move 32px, and Home restores bottom right", () => {
  const left = moveNewsletterPosition(newsletterDefaultPosition, "left", bounds);
  nearPoint(newsletterPointForPosition(left, bounds), { x: 16, y: 568 });
  const up = moveNewsletterPosition(left, "up", bounds);
  nearPoint(newsletterPointForPosition(up, bounds), { x: 16, y: 536 });
  nearPoint(moveNewsletterPosition(up, "down", bounds), left);
  assert.deepEqual(moveNewsletterPosition(left, "right", bounds), newsletterDefaultPosition);
  assert.deepEqual(moveNewsletterPosition(left, "down", bounds), left);
  assert.deepEqual(moveNewsletterPosition(up, "reset", bounds), newsletterDefaultPosition);
  assert.deepEqual(moveNewsletterPosition({ x: 0, y: 0 }, "up", bounds), { x: 0, y: 0 });
});

test("cancelled drags and old free positions converge to an edge without changing their safe height", () => {
  for (const position of [{ x: 0.2, y: 0.3 }, { x: 0.8, y: 0.6 }, { x: 0.5, y: 0.4 }]) {
    const docked = snapNewsletterPosition(position);
    assert.equal(docked.x, position.x < 0.5 ? 0 : 1);
    assert.equal(docked.y, position.y);
    assert.deepEqual(snapNewsletterPosition(docked), docked);
    const values = new Map();
    const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
    assert.equal(writeNewsletterPosition(docked, storage), true);
    assert.deepEqual(readNewsletterPosition(storage), docked);
    assert.ok(JSON.parse(values.get(newsletterPositionStorageKey)).x === 0 || JSON.parse(values.get(newsletterPositionStorageKey)).x === 1);
  }
});

test("interrupting a snap can resume from the currently painted point before choosing a new edge", () => {
  const visible = { x: 190, y: 350 };
  const held = newsletterPositionForPoint(visible, bounds);
  nearPoint(newsletterPointForPosition(held, bounds), visible);
  assert.equal(newsletterDragStarted(4, 2), false);
  // No re-snap occurs while held below the threshold; a subsequent drag can
  // cross the center and its eventual release chooses the opposite edge.
  nearPoint(newsletterPointForPosition(held, bounds), visible);
  const nextPoint = clampNewsletterPoint({ x: visible.x - 110, y: visible.y + 20 }, bounds);
  const released = snapNewsletterPosition(newsletterPositionForPoint(nextPoint, bounds));
  nearPoint(newsletterPointForPosition(released, bounds), { x: 16, y: 370 });
});

test("small hand motion remains a click; dragging requires more than eight pixels", () => {
  assert.equal(newsletterDragStarted(8, 0), false);
  assert.equal(newsletterDragStarted(0, -8), false);
  assert.equal(newsletterDragStarted(3, 4), false);
  assert.equal(newsletterDragStarted(8.01, 0), true);
  assert.equal(newsletterDragStarted(6, 6), true);
});

test("storage round-trips only x/y layout fields and leaves unrelated entries alone", () => {
  const values = new Map([["other.preference", "untouched"]]);
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  assert.equal(writeNewsletterPosition({ x: 0.28, y: 0.25, email: "should-not-be-saved@example.com", pointerId: 19 }, storage), true);
  assert.deepEqual(JSON.parse(values.get(newsletterPositionStorageKey)), { x: 0.28, y: 0.25 });
  assert.deepEqual(readNewsletterPosition(storage), { x: 0.28, y: 0.25 });
  assert.equal(values.get("other.preference"), "untouched");
  assert.deepEqual(readNewsletterPosition({ getItem: () => null }), newsletterDefaultPosition);
});

test("legacy side/fraction preferences migrate into free x/y positions", () => {
  for (const [side, x] of [["left", 0], ["right", 1]]) {
    const values = new Map([[newsletterLegacyPositionStorageKey, JSON.stringify({ side, fraction: 0.35 })]]);
    const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
    assert.deepEqual(readNewsletterPosition(storage), { x, y: 0.35 });
    assert.deepEqual(JSON.parse(values.get(newsletterPositionStorageKey)), { x, y: 0.35 });
    values.set(newsletterPositionStorageKey, JSON.stringify({ x: 0.42, y: 0.66 }));
    assert.deepEqual(readNewsletterPosition(storage), { x: 0.42, y: 0.66 });
  }
  const readOnly = { getItem: key => key === newsletterLegacyPositionStorageKey ? '{"side":"left","fraction":0.3}' : null,
    setItem() { throw new Error("read only"); } };
  assert.deepEqual(readNewsletterPosition(readOnly), { x: 0, y: 0.3 });
});

test("invalid or unavailable storage safely restores the default without throwing", () => {
  for (const raw of [null, "", "bad json", "null", "[]", "1", '{}',
    '{"x":0.5,"y":"0.5"}', '{"x":-0.1,"y":0.5}', '{"x":1.1,"y":0.5}',
    '{"x":0.5,"y":null}', '{"x":0.5,"y":1e999}', '{"x":0.5,"y":-0.1}',
    '{"x":0.5,"y":0.5,"extra":true}', '{"side":"top","fraction":0.5}',
    '{"side":"left","fraction":-0.1}', '{"side":"left","fraction":1.1}']) {
    assert.equal(parseNewsletterPosition(raw), null, String(raw));
    assert.deepEqual(readNewsletterPosition({ getItem: () => raw }), newsletterDefaultPosition);
  }
  const blocked = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("quota"); } };
  assert.deepEqual(readNewsletterPosition(blocked), newsletterDefaultPosition);
  assert.equal(writeNewsletterPosition(newsletterDefaultPosition, blocked), false);
  assert.equal(writeNewsletterPosition({ x: NaN, y: 0.5 }, blocked), false);
  assert.equal(writeNewsletterPosition(newsletterDefaultPosition, null), false);
});
