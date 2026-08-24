const canonicalGuideCatalogPageNamePattern = /^(?:[2-9]|[1-9]\d+)$/;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function isCanonicalGuideCatalogPageName(value) {
  return canonicalGuideCatalogPageNamePattern.test(value);
}

export function getGuideCatalogRoutePattern(guideHubRoute) {
  if (!guideHubRoute.startsWith("/") || !guideHubRoute.endsWith("/")) {
    throw new TypeError("Guide catalog routes must be root-relative and slash-terminated.");
  }

  return new RegExp(
    `^${escapeRegExp(guideHubRoute)}(?:page/(?:[2-9]|[1-9]\\d+)/)?$`,
  );
}
