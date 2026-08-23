import type { MouseEvent as ReactMouseEvent } from "react";

export type HomegroundHashTarget =
  | "#main-content"
  | "#planner-contact"
  | "#route-finder"
  | "#planner-handoff"
  | "#destinations"
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
  const scrollTarget =
    target === "#planner-contact"
      ? document.getElementById("planning-intent-title") ?? targetElement
      : targetElement;
  scrollTarget.scrollIntoView({
    block: "start",
    behavior: "instant",
  });
  window.dispatchEvent(new Event("hashchange"));

  const focusTargetId: Record<HomegroundHashTarget, string> = {
    "#main-content": "main-content",
    "#planner-contact": "planning-intent-title",
    "#route-finder": "route-finder-title",
    "#planner-handoff": "planner-handoff-title",
    "#destinations": "homepage-city-hubs-title",
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
