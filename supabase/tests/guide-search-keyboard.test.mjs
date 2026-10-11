import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { componentHarness, elements, loadComponent } from "./helpers/component-hooks.mjs";

test("ArrowDown then Escape restores input focus and dismisses suggestions after the synchronous focus event", t => {
  const previous = new Map(["document", "window", "CSS"].map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  const harness = componentHarness();
  let links = [];
  Object.defineProperty(globalThis, "document", { configurable: true, value: { activeElement: null, querySelectorAll: () => links } });
  Object.defineProperty(globalThis, "window", { configurable: true, value: { requestAnimationFrame: callback => { callback(); return 1; }, cancelAnimationFrame() {} } });
  Object.defineProperty(globalThis, "CSS", { configurable: true, value: { escape: value => value } });
  t.after(() => { harness.unmount(); for (const [name, descriptor] of previous) descriptor ? Object.defineProperty(globalThis, name, descriptor) : delete globalThis[name]; });
  const { GuideSearchForm } = loadComponent(fileURLToPath(new URL("../../components/GuideSearchForm.tsx", import.meta.url)), {
    react: harness.hooks, "../lib/analytics": { trackEvent() {} },
  });
  const docs = [{ contentId: "guide-zhangjiajie", guideId: "zhangjiajie", locale: "zh", path: "/zh/guides/zhangjiajie/", title: "张家界旅行", h1: "张家界旅行", description: "张家界旅行攻略", searchTerms: ["张家界"], entityTerms: [], collectionLabel: "", section: "plan", dateModified: null }];
  harness.render(GuideSearchForm, { documents: docs, locale: "zh", surface: "guides_hub", initialQuery: "张家界" });
  harness.onFocus = () => harness.tree.props.onFocusCapture();
  const input = [...elements(harness.tree)].find(node => node.type === "input").props.ref.current;
  const suggestions = () => [...elements(harness.tree)].filter(node => node.type === "div" && node.props.className === "suggestions");
  input.focus(); harness.render();
  assert.equal(suggestions().length, 1);
  const link = { focus() { document.activeElement = this; harness.tree.props.onFocusCapture(); } };
  links = [link];
  const press = (key, target) => { let prevented = false; harness.tree.props.onKeyDownCapture({ key, target, preventDefault() { prevented = true; } }); harness.render(); return prevented; };
  assert.equal(press("ArrowDown", input), true);
  assert.equal(document.activeElement, link);
  assert.equal(press("Escape", link), true);
  assert.equal(document.activeElement, input);
  assert.equal(suggestions().length, 0, "focus restoration must not reopen the list");
  const searchInput = [...elements(harness.tree)].find(node => node.type === "input");
  searchInput.props.onChange({ target: { value: "张家界旅行" } }); harness.render();
  assert.equal(suggestions().length, 1, "typing again can reopen matching suggestions");
  assert.equal(press("Escape", input), true);
  assert.equal(suggestions().length, 0);
});
