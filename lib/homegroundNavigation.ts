import type { MouseEvent as ReactMouseEvent } from "react";

export type HomegroundHashTarget =
  | "#main-content"
  | "#route-finder"
  | "#planner-handoff"
  | "#planning-proof"
  | "#studio"
  | "#faq";

export function handleHomegroundHashClick(
  event: ReactMouseEvent<HTMLAnchorElement>,
  target: HomegroundHashTarget,
) {
  const opensSeparateContext =
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey;
  if (opensSeparateContext) return;

  const targetElement = document.querySelector<HTMLElement>(target);
  if (!targetElement) return;

  event.preventDefault();
  const nextUrl = new URL(window.location.href);
  nextUrl.hash = target.slice(1);
  window.history.replaceState(
    window.history.state,
    "",
    `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`,
  );
  targetElement.scrollIntoView({ block: "start" });
  window.dispatchEvent(new Event("hashchange"));

  const focusTargetId: Record<HomegroundHashTarget, string> = {
    "#main-content": "main-content",
    "#route-finder": "route-finder-title",
    "#planner-handoff": "planner-handoff-title",
    "#planning-proof": "planning-proof-title",
    "#studio": "studio-title",
    "#faq": "faq-title",
  };

  window.requestAnimationFrame(() => {
    document
      .getElementById(focusTargetId[target])
      ?.focus({ preventScroll: true });
  });
}
