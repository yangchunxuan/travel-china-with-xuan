/** Observe the current visible surface, never replay activity while it was hidden. */
export function observeAnalyticsVisibility(element: HTMLElement, onVisible: () => void) {
  const inspect = () => {
    if (document.visibilityState !== "visible" || element.closest("[hidden], [aria-hidden='true']")) return;
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    if (style.visibility === "hidden" || style.display === "none" || rect.width <= 0 || rect.height <= 0) return;
    if (rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth) onVisible();
  };
  const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(inspect);
  observer?.observe(element);
  // A mounted handoff can become visible through an ancestor's hidden attribute.
  const mutations = new MutationObserver(inspect);
  let ancestor: HTMLElement | null = element;
  while (ancestor) {
    mutations.observe(ancestor, { attributes: true, attributeFilter: ["hidden", "aria-hidden", "class", "style"] });
    ancestor = ancestor.parentElement;
  }
  window.addEventListener("scroll", inspect, { passive: true });
  window.addEventListener("resize", inspect);
  document.addEventListener("visibilitychange", inspect);
  inspect();
  return { inspect, disconnect: () => {
    observer?.disconnect();
    mutations.disconnect();
    window.removeEventListener("scroll", inspect);
    window.removeEventListener("resize", inspect);
    document.removeEventListener("visibilitychange", inspect);
  } };
}
